import test from "node:test";
import assert from "node:assert/strict";
import { buildRagContext } from "../rag_search.js";

test("Core HTML articles are indexed and attributed", () => {
  for (const term of ["Varlık", "Ekonomi"]) {
    const result = buildRagContext(term, 30);
    assert.ok(result.results.length > 0, `No results for ${term}`);
    assert.ok(result.results.some((r) => r.layer === "core-html"), `No Core HTML source for ${term}`);
    assert.ok(result.context.includes("core-"), "Missing source filename");
  }
});

test("Empty query returns no matches", () => {
  const result = buildRagContext("  ");
  assert.equal(result.results.length, 0);
});
