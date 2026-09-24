import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getEmbedding } from "../embedding.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "..", "data", "processed_knowledge.jsonl");

function parseJsonl(text) {
  return text.split("\n").map((line) => line.trim()).filter(Boolean).map(JSON.parse);
}

function embeddingText(item) {
  return [
    item.title,
    item.section,
    item.domain,
    item.summary,
    Array.isArray(item.keywords) ? item.keywords.join(" ") : item.keywords,
    item.content
  ].filter(Boolean).join("\n");
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required to build embeddings.");
  }
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error("processed_knowledge.jsonl is missing. Run 01_build_chunks.py and 02_export_jsonl.py first.");
  }

  const items = parseJsonl(fs.readFileSync(DATA_FILE, "utf8"));
  const output = [];

  for (const item of items) {
    const embedding = await getEmbedding(embeddingText(item));
    output.push({ ...item, embedding });
  }

  const body = output.map((item) => JSON.stringify(item)).join("\n") + (output.length ? "\n" : "");
  fs.writeFileSync(DATA_FILE, body, "utf8");
  console.log(`Embedded ${output.length} processed knowledge chunks`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
