import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const planningEngine = require("../algorithms/planning_engine.js");
const simulationEngine = require("../algorithms/simulation_engine.js");
const invariantChecker = require("../verifier/invariant_checker.js");
const theoremChecker = require("../verifier/theorem_checker.js");

const plan = planningEngine.create({ intent: "analysis", concepts: ["test"] });
assert.ok(plan.steps.includes("formal_artifact_check"));
assert.ok(!plan.steps.includes("formal_verification"));

const simulation = simulationEngine.simulate({
  ...plan,
  epistemic_status: "UNVERIFIED"
});
assert.equal(simulation.executed, true);
assert.equal(simulation.operational_success, true);
assert.equal(simulation.epistemic_status, "UNVERIFIED");
assert.equal(simulation.canonical_authority, false);
assert.equal(simulation.scientific_proof, false);
assert.equal(Object.hasOwn(simulation, "success"), false);

const invariantReport = invariantChecker.check({
  admissibility: true, consistency: true, review: true, traceability: true,
  determinism: true, canonicalOrder: true, yek: true
});
assert.equal(invariantReport.review, true);
assert.equal(invariantReport.structural_checks_passed, true);
assert.equal(Object.hasOwn(invariantReport, "verification"), false);
assert.equal(Object.hasOwn(invariantReport, "valid"), false);

const theoremReport = theoremChecker.check({
  soundness: true, determinism: true, termination: true, feasibility: true,
  review: true, yekPreservation: true, consistency: true
});
assert.equal(theoremReport.review, true);
assert.equal(theoremReport.structural_checks_passed, true);
assert.equal(Object.hasOwn(theoremReport, "verification"), false);
assert.equal(Object.hasOwn(theoremReport, "valid"), false);

console.log("Runtime status vocabulary boundary: OK");
