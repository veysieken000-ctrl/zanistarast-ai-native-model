import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../scripts/03_build_embeddings.mjs", import.meta.url), "utf8");

assert.match(source, /OPENAI_API_KEY is required to build embeddings/);
assert.match(source, /processed_knowledge\.jsonl is missing/);
assert.match(source, /output\.push\(\{ \.\.\.item, embedding \}\)/);
assert.doesNotMatch(source, /authority_status\s*:/);
assert.doesNotMatch(source, /epistemic_status\s*:/);
assert.doesNotMatch(source, /rasterast_status\s*:/);
assert.doesNotMatch(source, /provenance_status\s*:/);

console.log("Embedding build stage structure: OK");
