import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(path.resolve("rag_search.js"), "utf8");

assert.match(source, /declared_repository_layer/);
assert.match(source, /authority_status:\s*match\.declaredRepositoryLayer\s*\?\s*"REPOSITORY_DECLARED"/);
assert.match(source, /epistemic_status:\s*"UNVERIFIED"/);
assert.doesNotMatch(source, /authority_status:\s*match\.(?:canonical|declaredRepositoryLayer)\s*\?\s*"CANONICAL_DECLARED"/);

console.log("Manifest authority boundary: OK");
