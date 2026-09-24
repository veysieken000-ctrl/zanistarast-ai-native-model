import assert from "node:assert/strict";
import fs from "node:fs";

const engine = fs.readFileSync(new URL("../core/zanistarast_engine.js", import.meta.url), "utf8");
const orchestrator = fs.readFileSync(new URL("../core/orchestrator.js", import.meta.url), "utf8");

assert.match(engine, /review:\s*response\.verificationReport/);
assert.doesNotMatch(engine, /verification:\s*response\.verificationReport/);
assert.match(orchestrator, /review:\s*response\.verificationReport/);
assert.doesNotMatch(orchestrator, /verification:\s*response\.verificationReport/);

console.log("Core review output boundary: OK");
