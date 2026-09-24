import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const formalEngine = require("../formal/formal_engine.js");
const proofVerifier = require("../formal/proof_verifier.js");
const specVerifier = require("../formal/spec_verifier.js");
const responseBuilder = require("../execution/response_builder.js");

const formal = formalEngine.verify();
assert.equal(typeof formal.formal_artifacts_complete, "boolean");
assert.equal(formal.epistemic_status, "UNVERIFIED");
assert.equal(formal.canonical_authority, false);
assert.equal(formal.scientific_proof, false);
assert.equal(Object.hasOwn(formal, "verified"), false);

const spec = specVerifier.check();
assert.equal(typeof spec.specifications_present, "boolean");
assert.equal(spec.epistemic_status, "UNVERIFIED");
assert.equal(spec.canonical_authority, false);
assert.equal(spec.scientific_proof, false);
assert.equal(Object.hasOwn(spec, "valid"), false);

const proof = proofVerifier.verify();
assert.equal(typeof proof.formal_checks_passed, "boolean");
assert.equal(proof.epistemic_status, "UNVERIFIED");
assert.equal(proof.rasterast_status, "NOT_REVIEWED");
assert.equal(proof.canonical_authority, false);
assert.equal(proof.scientific_proof, false);
assert.equal(Object.hasOwn(proof, "verified"), false);

const built = responseBuilder.build({
  success: false,
  verification: {
    epistemic_status: "UNVERIFIED",
    report: {
      structural_checks_passed: true,
      epistemic_status: "UNVERIFIED",
      rasterast_status: "NOT_REVIEWED"
    },
    context: { text: "boundary-test" }
  }
});
assert.equal(built.success, false);
assert.equal(built.verificationReport.status, "UNVERIFIED");
assert.equal(built.verificationReport.summary.accepted, false);
assert.equal(built.verificationReport.summary.scientific_proof, false);

console.log("Formal epistemic boundary: OK");
