import assert from "node:assert/strict";
import fs from "node:fs";

const chunkBuilder = fs.readFileSync(new URL("../scripts/01_build_chunks.py", import.meta.url), "utf8");
const exporter = fs.readFileSync(new URL("../scripts/02_export_jsonl.py", import.meta.url), "utf8");
const loader = fs.readFileSync(new URL("../rag_loader.js", import.meta.url), "utf8");

for (const source of [chunkBuilder, exporter, loader]) {
  assert.match(source, /authority_status/);
  assert.match(source, /epistemic_status/);
  assert.match(source, /rasterast_status/);
  assert.match(source, /provenance_status/);
}
assert.match(chunkBuilder, /repository_path/);
assert.match(chunkBuilder, /rglob\("\*\.html"\)/);
assert.match(chunkBuilder, /RepositoryHTML/);
assert.match(chunkBuilder, /VisibleHTMLParser/);
assert.match(exporter, /RepositoryHTML/);
assert.match(loader, /RepositoryHTML/);
assert.match(exporter, /repository_path/);
assert.match(loader, /repository_path/);

assert.match(chunkBuilder, /"epistemic_status": "UNVERIFIED"/);
assert.match(exporter, /"epistemic_status": "UNVERIFIED"/);
assert.match(loader, /epistemic_status: item\.epistemic_status \|\| "UNVERIFIED"/);

console.log("RAG ingestion status boundary: OK");
