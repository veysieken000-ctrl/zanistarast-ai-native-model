import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const verificationPipeline = require("../verifier/verification_pipeline.js");
const reportGenerator = require("../verifier/report_generator.js");

const result = verificationPipeline.run({
  ontology: true,
  consistent: true,
  optimized: true,
  coordinated: true,
  text: "local structural check"
});

assert.equal(result.report.structural_checks_passed, true);
assert.equal(result.report.epistemic_status, "UNVERIFIED");
assert.equal(result.report.rasterast_status, "NOT_REVIEWED");
assert.equal(result.report.canonical_authority, false);
assert.equal(result.report.scientific_proof, false);
assert.equal(result.accepted, false);
assert.equal("verified" in result.report, false);
assert.equal("rasterast" in result.report, false);

const generated = reportGenerator.generate(result);
assert.equal(generated.status, "UNVERIFIED");
assert.equal(generated.summary.structural_checks_passed, true);
assert.equal(generated.summary.epistemic_status, "UNVERIFIED");
assert.equal(generated.summary.rasterast_status, "NOT_REVIEWED");
assert.equal(generated.summary.accepted, false);
assert.equal(generated.summary.canonical_authority, false);
assert.equal(generated.summary.scientific_proof, false);

console.log("Verifier epistemic boundary regression: OK");
