import assert from "node:assert/strict";
import fs from "node:fs";
import { MIRA_CORE_VERSION, miraCoreRules } from "../mira_core.js";

const manifest = JSON.parse(
  fs.readFileSync(new URL("../../structured-ingestion-manifest.json", import.meta.url), "utf8")
);

assert.equal(MIRA_CORE_VERSION, "1.1");
assert.ok(
  miraCoreRules.some((rule) => /Repository declaration is not scientific proof/i.test(rule))
);
assert.ok(Array.isArray(manifest.review_requirements));
assert.equal(Object.hasOwn(manifest, "verification_requirements"), false);
assert.ok(manifest.ai_guidance.includes("review_status_before_use"));
assert.ok(!manifest.ai_guidance.includes("verify_before_trust"));
assert.equal(manifest.ingestion_boundary.default_epistemic_status, "UNVERIFIED");
assert.equal(manifest.ingestion_boundary.manifest_membership_is_scientific_proof, false);
assert.equal(manifest.ingestion_boundary.manifest_membership_is_canonical_truth, false);

console.log("Manifest/Mira terminology boundary: OK");
