import assert from "node:assert/strict";
import { scientificMediaKinds, scientificMediaRules, buildScientificMediaBrief } from "../scientific_media.js";

assert(scientificMediaKinds.includes("observation"));
assert(scientificMediaKinds.includes("experiment"));
assert(scientificMediaKinds.includes("interactive"));
assert(scientificMediaKinds.includes("video"));
assert(scientificMediaRules.some(rule => /Never invent measurements/.test(rule)));
assert(scientificMediaRules.some(rule => /independent from journal submission rules/.test(rule)));
assert(scientificMediaRules.some(rule => /conceptual diagram/.test(rule) && /empirical result/.test(rule)));
const brief = buildScientificMediaBrief({ subject: "test", evidenceType: "observation" });
assert.equal(brief.evidenceType, "observation");
assert.match(brief.rule, /not decoration or fabricated content/);
console.log("scientific media boundary: OK");
