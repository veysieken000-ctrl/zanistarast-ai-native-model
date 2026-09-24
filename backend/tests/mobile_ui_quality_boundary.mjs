import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync(new URL("../../css/style.css", import.meta.url), "utf8");
const paper = fs.readFileSync(new URL("../../paper.html", import.meta.url), "utf8");
const theory = fs.readFileSync(new URL("../../theory.html", import.meta.url), "utf8");
const nestedTheoryFiles = [
  "../../theory-00-framework.html",
  "../../theory-01-boyutsal-acilim.html",
  "../../theory-07-newroza-kawa-civilization.html",
  "../../theory-08-zaman.html"
].map(path => fs.readFileSync(new URL(path, import.meta.url), "utf8"));

assert.match(css, /ZANISTARAST MOBILE QUALITY STANDARD/);
assert.match(css, /\.hero-card > h1:first-child/);
assert.match(css, /white-space:\s*nowrap/);
assert.match(css, /font-size:\s*clamp\(2rem, 9vw, 3rem\)/);
assert.match(css, /\.core-reading-card/);
assert.match(css, /\.sub-card/);
assert.match(css, /\.article-card/);
assert.match(css, /min-width:\s*0/);
assert.match(css, /max-width:\s*100%/);

assert.match(css, /NAVIGATION SHAPE LANGUAGE/);
assert.match(css, /\.layer-grid--primary/);
assert.match(css, /\.layer-grid--level-2/);
assert.match(css, /\.layer-grid--level-3/);
assert.match(css, /border-left:\s*4px solid/);
assert.match(css, /border-top:\s*3px solid/);
assert.match(css, /\.layer-grid--secondary/);
assert.match(paper, /layer-grid layer-grid--primary/);
assert.match(paper, /layer-grid layer-grid--secondary/);
assert.match(theory, /layer-grid layer-grid--secondary/);
for (const page of nestedTheoryFiles) {
  assert.match(page, /layer-grid--level-3/);
  assert.match(page, /data-layer-level="3"/);
}

console.log("Mobile UI quality boundary: OK");
