import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "processed_knowledge.jsonl");

function parseJsonl(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function conservativeStatus(item) {
  const sourceFile = String(item.source_file || "").replace(/\\/g, "/");
  const repositoryPath =
    item.repository_path ||
    (sourceFile
      ? item.source_type === "RepositoryHTML"
        ? sourceFile
        : `backend/knowledge/${sourceFile}`
      : null);

  return {
    ...item,
    repository_path: repositoryPath,
    source_type: item.source_type || "RepositoryKnowledge",
    authority_status: item.authority_status || "UNVERIFIED",
    epistemic_status: item.epistemic_status || "UNVERIFIED",
    rasterast_status: item.rasterast_status || "NOT_REVIEWED",
    provenance_status: item.provenance_status || "PARTIAL"
  };
}

export function loadProcessedKnowledge() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return parseJsonl(raw).map(conservativeStatus);
}

export function getProcessedKnowledgeInfo() {
  const items = loadProcessedKnowledge();

  const domains = [...new Set(items.map((item) => item.domain).filter(Boolean))];
  const sections = [...new Set(items.map((item) => item.section).filter(Boolean))];

  return {
    total: items.length,
    domains,
    sections
  };
}
