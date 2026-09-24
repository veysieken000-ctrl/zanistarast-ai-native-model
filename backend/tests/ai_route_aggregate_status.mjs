import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../routes/ai_engine.js", import.meta.url), "utf8");

assert.match(source, /function deriveRagStatus\(results\)/);
assert.match(source, /authority_status === "REPOSITORY_DECLARED"/);
assert.doesNotMatch(source, /CANONICAL_DECLARED/);
assert.match(source, /epistemic_status: "UNVERIFIED"/);
assert.match(source, /rasterast_status: reviewRequired \? "REVIEW_REQUIRED" : "NOT_REVIEWED"/);

const aggregateUses = source.match(/\.\.\.deriveRagStatus\(results\)/g) || [];
assert.equal(aggregateUses.length, 2, "interpret and evaluate must expose aggregate RAG status");

const emptyUnverified = source.match(/total: 0,[\s\S]{0,120}epistemic_status: "UNVERIFIED"/g) || [];
assert.equal(emptyUnverified.length, 2, "empty interpret/evaluate responses must remain UNVERIFIED");

console.log("AI route aggregate status boundary: OK");
