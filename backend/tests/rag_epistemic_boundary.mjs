import assert from "node:assert/strict";
import { buildRagContext } from "../rag_search.js";

const { results, context } = buildRagContext("Zanistarast", 8);

assert.ok(results.length > 0, "Expected repository knowledge matches for Zanistarast");

for (const item of results) {
  assert.equal(
    item.authority?.authority_status,
    "UNVERIFIED",
    "backend/knowledge must not become canonical without an explicit manifest path"
  );
  assert.equal(item.authority?.epistemic_status, "UNVERIFIED");
  assert.equal(item.authority?.rasterast_status, "NOT_REVIEWED");
  assert.equal(item.authority?.provenance_status, "PARTIAL");
  assert.ok(item.score > 0, "Retrieval score should only represent a positive lexical match");
}

assert.match(context, /AUTHORITY: UNVERIFIED/);
assert.match(context, /EPISTEMIC: UNVERIFIED/);
assert.match(context, /RASTERAST: NOT_REVIEWED/);
assert.match(context, /PROVENANCE: PARTIAL/);
assert.doesNotMatch(context, /AUTHORITY: CANONICAL_DECLARED/);

console.log("RAG epistemic boundary regression: OK");
