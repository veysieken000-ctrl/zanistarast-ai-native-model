import assert from "node:assert/strict";
import { scientificMediaKinds, scientificMediaRules, buildScientificMediaBrief, publishedArticleEnrichmentRules, selectScientificMedia, createPublishedEnrichmentPlan } from "../scientific_media.js";

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
assert(publishedArticleEnrichmentRules.some(rule => /DOI/.test(rule)));
assert(publishedArticleEnrichmentRules.some(rule => /site enrichment/.test(rule)));
assert(publishedArticleEnrichmentRules.some(rule => /copyright, license/.test(rule)));
assert(publishedArticleEnrichmentRules.some(rule => /corrections, retractions/.test(rule)));
const page = await (await import("node:fs/promises")).readFile("../article-system.html", "utf8");
assert.match(page, /Bilimsel Anlatım ve Zenginleştirme/);
assert.match(page, /Yayınlanmış Makalenin Zengin Web Sürümü/);
assert.match(page, /DOI \/ kaynak \/ lisans kaydedildi/);
assert.match(page, /Hakemli yayının özgün materyali/);
const schema = JSON.parse(await (await import("node:fs/promises")).readFile("../schema/scientific-media.schema.json", "utf8"));
assert(schema.required.includes("provenance"));
assert(schema.required.includes("accessibility"));
assert(schema.required.includes("publicationRelation"));
assert(schema.properties.kind.enum.includes("video"));
assert(schema.properties.epistemicStatus.enum.includes("simulation"));
assert(schema.properties.publicationRelation.enum.includes("site-enrichment"));
const selected = selectScientificMedia({
  phenomenon: { quantitativeData: true, structure: true, motion: true, videoEvidence: true },
  availableMaterial: ["chart", "video"]
});
assert(selected.some(item => item.kind === "chart"));
assert(selected.some(item => item.kind === "diagram"));
assert(selected.some(item => item.kind === "video"));
assert(!selected.some(item => item.kind === "audio"));

const blockedPlan = createPublishedEnrichmentPlan({ publication: { verified: false }, phenomenon: {} });
assert.equal(blockedPlan.state, "not-published-enrichment");

const publishedPlan = createPublishedEnrichmentPlan({
  publication: { verified: true, doi: "10.0000/example", license: "example-license" },
  phenomenon: { relationships: true, temporalSequence: true },
  availableMaterial: []
});
assert.equal(publishedPlan.state, "published-enrichment");
assert(publishedPlan.media.every(item => item.publicationRelation === "site-enrichment"));
console.log("scientific media boundary: OK");
