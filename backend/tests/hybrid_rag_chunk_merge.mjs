import assert from "node:assert/strict";
import fs from "node:fs";

const source = fs.readFileSync(new URL("../rag_search.js", import.meta.url), "utf8");

assert.match(source, /new Map\(\s*lexical\.results\.map\(\(item\) => \[item\.id, item\]\)/s);
assert.match(source, /mergedById\.get\(item\.id\)/);
assert.match(source, /existing\.semantic_score = item\.semantic_score/);
assert.doesNotMatch(source, /lexicalByPath/);
assert.match(source, /\(a\.score \|\| 0\) \+ \(a\.semantic_score \|\| 0\)/);
assert.match(source, /authority_status: item\.authority_status \|\| "UNVERIFIED"/);

console.log("Hybrid RAG chunk merge regression: OK");
