import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const planningEngine = require("../algorithms/planning_engine.js");
const simulationEngine = require("../algorithms/simulation_engine.js");

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

console.log("Runtime status vocabulary boundary: OK");
