import assert from "node:assert/strict";
import fs from "node:fs";

const bootstrap = fs.readFileSync(new URL("../bootstrap/index.js", import.meta.url), "utf8");
const bootstrapRuntime = fs.readFileSync(new URL("../bootstrap/bootstrap.js", import.meta.url), "utf8");
const gateway = fs.readFileSync(new URL("../../api/zanistarast_formal_gateway.js", import.meta.url), "utf8");
const server = fs.readFileSync(new URL("../server.js", import.meta.url), "utf8");
const workflow = fs.readFileSync(new URL("../../.github/workflows/node-runtime-smoke.yml", import.meta.url), "utf8");

assert.match(bootstrap, /reviewWithZanistarast/);
assert.match(bootstrapRuntime, /review\(input\)/);
assert.doesNotMatch(bootstrapRuntime, /verify\(input\)/);
assert.match(bootstrapRuntime, /initialized before review/);
assert.match(bootstrap, /verifyWithZanistarast: reviewWithZanistarast/);
assert.match(gateway, /reviewWithZanistarast/);
assert.match(gateway, /review\(request\)/);
assert.doesNotMatch(gateway, /verify\(request\)/);
assert.match(server, /formalGateway\.review\(req\.body\)/);
assert.match(server, /\/api\/formal\/review/);
assert.doesNotMatch(server, /\/api\/formal\/verify/);
assert.match(server, /Formal review failed/);
assert.match(workflow, /formal\/review/);
assert.doesNotMatch(workflow, /formal\/verify/);

console.log("Formal API review boundary: OK");
