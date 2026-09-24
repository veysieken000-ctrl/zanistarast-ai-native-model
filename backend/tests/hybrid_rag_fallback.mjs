import assert from "node:assert/strict";
import { buildRagContext, buildHybridRagContext } from "../rag_search.js";

delete process.env.OPENAI_API_KEY;

const lexical = buildRagContext("Zanistarast", 8);
const hybrid = await buildHybridRagContext("Zanistarast", 8);

assert.deepEqual(hybrid, lexical, "Hybrid retrieval must fall back exactly to lexical without an API key");

for (const item of hybrid.results) {
  assert.equal(item.authority?.authority_status, "UNVERIFIED");
  assert.equal(item.authority?.epistemic_status, "UNVERIFIED");
  assert.equal(item.authority?.rasterast_status, "NOT_REVIEWED");
  assert.equal(item.authority?.provenance_status, "PARTIAL");
}

console.log("Hybrid RAG fallback regression: OK");
