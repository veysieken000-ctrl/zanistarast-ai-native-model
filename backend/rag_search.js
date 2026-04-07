import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");

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
      chunks.push({
        id: `${file}#${index + 1}`,
        title: file,
        domain: "knowledge",
        layer: "knowledge",
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
      return `[${item.title} | ${item.id}]
${item.content}`;
    })
    .join("\n\n---\n\n");

  return {
    results: scored,
    context
  };
}


