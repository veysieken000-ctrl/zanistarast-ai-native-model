import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadProcessedKnowledge } from "./rag_loader.js";
import { getEmbedding, rankByEmbedding } from "./embedding.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");
const REPO_ROOT = path.resolve(__dirname, "..");
const INGESTION_MANIFEST = path.join(REPO_ROOT, "structured-ingestion-manifest.json");

function loadAuthorityManifest() {
  try {
    const raw = fs.readFileSync(INGESTION_MANIFEST, "utf8").replace(/^\s*JSON\s*/, "");
    const manifest = JSON.parse(raw);
    const rules = [];
    for (const [layer, config] of Object.entries(manifest.layers || {})) {
      for (const sourcePath of config.paths || []) {
        rules.push({
          layer,
          sourcePath: String(sourcePath).replace(/\\/g, "/"),
          canonical: config.canonical === true,
          verificationRequired: config.verification_required === true,
          priority: config.priority || null
        });
      }
    }
    return rules;
  } catch {
    return [];
  }
}

const authorityRules = loadAuthorityManifest();

function authorityForRepositoryPath(repositoryPath) {
  const normalized = String(repositoryPath || "").replace(/\\/g, "/");
  const match = authorityRules.find((rule) => {
    if (rule.sourcePath.endsWith("/")) return normalized.startsWith(rule.sourcePath);
    return normalized === rule.sourcePath;
  });

  if (!match) {
    return {
      source_type: "RepositoryKnowledge",
      authority_status: "UNVERIFIED",
      epistemic_status: "UNVERIFIED",
      rasterast_status: "NOT_REVIEWED",
      provenance_status: "PARTIAL"
    };
  }

  return {
    source_type: match.layer,
    authority_status: match.canonical ? "CANONICAL_DECLARED" : "EXPERIMENTAL",
    epistemic_status: match.verificationRequired ? "VERIFICATION_REQUIRED" : "UNVERIFIED",
    rasterast_status: match.verificationRequired ? "REVIEW_REQUIRED" : "NOT_REVIEWED",
    provenance_status: "MANIFEST_MATCH",
    manifest_priority: match.priority
  };
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 1);
}

function splitIntoChunks(text, maxLength = 700) {
  const clean = String(text || "").trim();
  if (!clean) return [];

  const paragraphs = clean
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    if ((current + "\n\n" + paragraph).length > maxLength) {
      if (current.trim()) chunks.push(current.trim());
      current = paragraph;
    } else {
      current += (current ? "\n\n" : "") + paragraph;
    }
  }

  if (current.trim()) chunks.push(current.trim());

  return chunks;
}

function loadKnowledgeChunks() {
  if (!fs.existsSync(KNOWLEDGE_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((file) => file.endsWith(".txt") || file.endsWith(".md"));

  const chunks = [];

  for (const file of files) {
    const fullPath = path.join(KNOWLEDGE_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parts = splitIntoChunks(raw);

    parts.forEach((content, index) => {
      const repositoryPath = `backend/knowledge/${file}`;
      chunks.push({
        id: `${file}#${index + 1}`,
        title: file,
        domain: "knowledge",
        layer: "knowledge",
        repositoryPath,
        authority: authorityForRepositoryPath(repositoryPath),
        content
      });
    });
  }

  return chunks;
}

function scoreChunk(question, chunk) {
  const qWords = tokenize(question);
  const text = normalizeText(chunk.content);

  let score = 0;

  for (const word of qWords) {
    if (text.includes(word)) {
      score += word.length >= 6 ? 3 : 1;
    }
  }

  const fullQuestion = normalizeText(question);
  if (fullQuestion && text.includes(fullQuestion)) {
    score += 8;
  }

  return score;
}

export function buildRagContext(question, k = 8) {
  const knowledgeChunks = loadKnowledgeChunks();
  console.log("RAG_VERSION_2_ACTIVE");
  const cleanQuestion = String(question || "").trim();

  if (!cleanQuestion || !knowledgeChunks.length) {
    return {
      results: [],
      context: ""
    };
  }

  const scored = knowledgeChunks
    .map((chunk) => ({
      ...chunk,
      score: scoreChunk(cleanQuestion, chunk)
    }))
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  const context = scored
    .map((item) => {
      const authority = item.authority || {};
      return `[SOURCE: ${item.title} | ${item.id}
AUTHORITY: ${authority.authority_status || "UNVERIFIED"}
EPISTEMIC: ${authority.epistemic_status || "UNVERIFIED"}
RASTERAST: ${authority.rasterast_status || "NOT_REVIEWED"}
PROVENANCE: ${authority.provenance_status || "PARTIAL"}]
${item.content}`;
    })
    .join("\n\n---\n\n");

  return {
    results: scored,
    context
  };
}




export async function buildHybridRagContext(question, k = 8) {
  const lexical = buildRagContext(question, k);
  if (!process.env.OPENAI_API_KEY) return lexical;

  const processed = loadProcessedKnowledge().filter(
    (item) => Array.isArray(item.embedding) && item.embedding.length > 0
  );
  if (!processed.length) return lexical;

  try {
    const queryEmbedding = await getEmbedding(String(question || "").trim());
    const semantic = rankByEmbedding(queryEmbedding, processed, k);
    if (!semantic.length) return lexical;

    const lexicalByPath = new Map(
      lexical.results.map((item) => [item.repositoryPath, item])
    );
    const merged = [...lexical.results];

    for (const item of semantic) {
      const repositoryPath = item.repository_path;
      if (lexicalByPath.has(repositoryPath)) continue;
      merged.push({
        id: item.id,
        title: item.title || item.source_file || item.id,
        domain: item.domain || "knowledge",
        layer: item.layer || "knowledge",
        repositoryPath,
        authority: {
          source_type: item.source_type || "RepositoryKnowledge",
          authority_status: item.authority_status || "UNVERIFIED",
          epistemic_status: item.epistemic_status || "UNVERIFIED",
          rasterast_status: item.rasterast_status || "NOT_REVIEWED",
          provenance_status: item.provenance_status || "PARTIAL"
        },
        content: item.content,
        score: 0,
        semantic_score: item.semantic_score
      });
    }

    const results = merged.slice(0, k);
    const context = results.map((item) => {
      const authority = item.authority || {};
      return `[SOURCE: ${item.title} | ${item.id}
AUTHORITY: ${authority.authority_status || "UNVERIFIED"}
EPISTEMIC: ${authority.epistemic_status || "UNVERIFIED"}
RASTERAST: ${authority.rasterast_status || "NOT_REVIEWED"}
PROVENANCE: ${authority.provenance_status || "PARTIAL"}]
${item.content}`;
    }).join("\n\n---\n\n");

    return { results, context };
  } catch {
    return lexical;
  }
}
