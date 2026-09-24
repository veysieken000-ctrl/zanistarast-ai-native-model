import assert from "node:assert/strict";
import fs from "node:fs";
import { buildMiraPrompt, miraCoreRules } from "../mira_core.js";

assert.ok(miraCoreRules.length >= 10);
const prompt = buildMiraPrompt({
  mode: "evaluate",
  question: "test",
  ragContext: "EPISTEMIC: UNVERIFIED",
  languageRule: "Write fully in English."
});
assert.match(prompt, /Shared Mira Core/i);
assert.match(prompt, /retrieval score never establishes authority/i);
assert.match(prompt, /UNVERIFIED, not FALSE/i);
assert.match(prompt, /counterevidence/i);
assert.match(prompt, /does not self-grant scientific proof or canonical authority/i);

const server = fs.readFileSync(new URL("../server.js", import.meta.url), "utf8");
const engine = fs.readFileSync(new URL("../routes/ai_engine.js", import.meta.url), "utf8");
assert.match(server, /buildMiraPrompt/);
assert.match(engine, /buildMiraPrompt/);

console.log("Shared Mira Core contract: OK");
