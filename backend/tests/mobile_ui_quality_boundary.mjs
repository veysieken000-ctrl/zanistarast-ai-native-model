import assert from "node:assert/strict";
import fs from "node:fs";

const css = fs.readFileSync(new URL("../../css/style.css", import.meta.url), "utf8");

assert.match(css, /ZANISTARAST MOBILE QUALITY STANDARD/);
assert.match(css, /\.hero-card > h1:first-child/);
assert.match(css, /white-space:\s*nowrap/);
assert.match(css, /font-size:\s*clamp\(2rem, 9vw, 3rem\)/);
assert.match(css, /\.core-reading-card/);
assert.match(css, /\.sub-card/);
assert.match(css, /\.article-card/);
assert.match(css, /min-width:\s*0/);
assert.match(css, /max-width:\s*100%/);

console.log("Mobile UI quality boundary: OK");
