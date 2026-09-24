import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const decisionEngine = require("../algorithms/decision_engine.js");
const optimizationEngine = require("../algorithms/optimization_engine.js");

const plan = { steps: ["ontology", "formal_check", "response"] };
const decision = decisionEngine.decide(plan, {
  accepted: false,
  epistemic_status: "UNVERIFIED"
});

assert.equal(decision.accepted, false);
assert.equal(decision.operational_confidence, 0);
assert.equal(decision.epistemic_status, "UNVERIFIED");
assert.equal(decision.canonical_authority, false);
assert.equal(decision.scientific_proof, false);
assert.equal(Object.hasOwn(decision, "confidence"), false);

const optimized = optimizationEngine.optimize(plan, decision);
assert.equal(optimized.operational_confidence, 0);
assert.equal(optimized.epistemic_status, "UNVERIFIED");
assert.equal(Object.hasOwn(optimized, "confidence"), false);

console.log("Operational confidence boundary: OK");
