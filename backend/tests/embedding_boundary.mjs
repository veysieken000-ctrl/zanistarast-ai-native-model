import assert from "node:assert/strict";
import { cosineSimilarity, rankByEmbedding } from "../embedding.js";

assert.equal(cosineSimilarity([1, 0], [1, 0]), 1);
assert.equal(cosineSimilarity([1, 0], [0, 1]), 0);
assert.equal(cosineSimilarity([1], [1, 0]), 0);

const source = {
  id: "source-1",
  authority_status: "UNVERIFIED",
  epistemic_status: "UNVERIFIED",
  rasterast_status: "NOT_REVIEWED",
  provenance_status: "PARTIAL",
  embedding: [1, 0]
};

const ranked = rankByEmbedding([1, 0], [
  source,
  { ...source, id: "source-2", embedding: [0.5, 0.5] }
], 2);

assert.equal(ranked.length, 2);
assert.equal(ranked[0].id, "source-1");
assert.equal(ranked[0].semantic_score, 1);

for (const item of ranked) {
  assert.equal(item.authority_status, "UNVERIFIED");
  assert.equal(item.epistemic_status, "UNVERIFIED");
  assert.equal(item.rasterast_status, "NOT_REVIEWED");
  assert.equal(item.provenance_status, "PARTIAL");
}

console.log("Embedding retrieval boundary regression: OK");
