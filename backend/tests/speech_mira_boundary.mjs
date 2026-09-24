import assert from "node:assert/strict";
import fs from "node:fs";

const speech = fs.readFileSync(new URL("../../js/speech.js", import.meta.url), "utf8");
const page = fs.readFileSync(new URL("../../speech.html", import.meta.url), "utf8");
const contract = fs.readFileSync(new URL("../../schema/09_AI_Speech_Integration.md", import.meta.url), "utf8");

assert.match(speech, /api\/ask/);
assert.doesNotMatch(speech, /verifyWithZanistarast/);
assert.match(page, /api\/ask/);
assert.match(page, /authority_status/);
assert.match(page, /epistemic_status/);
assert.match(page, /rasterast_status/);
assert.match(page, /provenance_status/);
assert.match(contract, /HTML \+ knowledge RAG/);
assert.match(contract, /sabit bir ontolojik zincire zorlanmaz/);
assert.doesNotMatch(contract, /Her cevap:\s*\n\s*Hebûn/);

console.log("Speech Mira boundary: OK");
