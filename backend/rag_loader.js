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

export function loadProcessedKnowledge() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return parseJsonl(raw);
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
