import assert from "node:assert/strict";
import fs from "node:fs";

const server = fs.readFileSync(new URL("../server.js", import.meta.url), "utf8");

const match = server.match(/function deriveResponseStatus\(results\) \{([\s\S]*?)\n\}/);
assert.ok(match, "deriveResponseStatus must exist");
const body = match[1];

assert.match(body, /authority_status === "REPOSITORY_DECLARED"/);
assert.doesNotMatch(body, /CANONICAL_DECLARED/);
assert.match(body, /epistemic_status: "UNVERIFIED"/);
assert.match(body, /rasterast_status: reviewRequired \? "REVIEW_REQUIRED" : "NOT_REVIEWED"/);
assert.match(body, /provenance_status: allManifestMatched \? "MANIFEST_MATCH" : "PARTIAL"/);

console.log("API aggregate authority boundary: OK");
