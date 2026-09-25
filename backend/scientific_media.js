export const SCIENTIFIC_MEDIA_VERSION = "1.0";

export const scientificMediaKinds = Object.freeze([
  "figure", "diagram", "observation", "experiment", "chart", "table",
  "timeline", "map", "interactive", "animation", "video", "audio", "supplement"
]);

export const scientificMediaRules = Object.freeze([
  "Site media exists to describe, clarify, or make inspectable a situation, event, observation, experiment, relation, process, or scientific model; decoration alone is not a scientific reason.",
  "Choose media by explanatory need. Do not force every article to contain an image, chart, animation, audio, or video.",
  "Prefer the medium that best preserves the phenomenon: static figures for structure, charts for quantitative data, tables for comparison, timelines for temporal sequences, maps for spatial relations, interactive views for inspectable networks or models, and animation/video for change or motion that a static figure cannot adequately convey.",
  "Never invent measurements, observations, experimental results, sample sizes, uncertainty, or source material to make a visualization richer.",
  "A conceptual diagram, reconstruction, simulation, illustration, observation, and empirical result must be visibly distinguished from one another.",
  "Every scientific media item must preserve provenance: source or generating material, creator/method, relation to the article, and epistemic status when relevant.",
  "Charts and data figures must identify their underlying data. If no data exists, use a conceptual diagram rather than a quantitative-looking chart.",
  "Observation and experiment media must identify what is directly observed versus annotated, inferred, reconstructed, or simulated.",
  "Captions must explain what the reader should notice without claiming more than the evidence supports.",
  "Provide accessibility text for meaningful visual media and a textual alternative for information conveyed only through audio, video, or interaction.",
  "Interactive or animated media must have a stable static/text fallback so the scientific meaning remains available without scripts or motion.",
  "Website presentation rules are independent from journal submission rules. Journal media is selected and exported separately according to the actual target venue and scientific necessity."
]);

export const publishedArticleEnrichmentRules = Object.freeze([
  "A journal-accepted article may enter the published enrichment state only after publication is verified from a stable bibliographic record such as DOI, publisher page, or equivalent authoritative record.",
  "The published record becomes the site's primary article representation; preserve the earlier site version in version history/provenance rather than silently erasing its existence.",
  "Do not alter the claims, results, conclusions, authorship, citation, or scientific meaning of the published article when enriching its web presentation.",
  "Enrichment may add explanatory figures, diagrams, timelines, maps, interactive models, animations, audio, video, transcripts, accessible descriptions, code/data links, and supplementary explanations when they faithfully represent the published work.",
  "Clearly label material added after publication as site enrichment and distinguish it from material that was part of the peer-reviewed publication.",
  "Never describe journal acceptance as proof that every claim is true. Preserve corrections, retractions, expressions of concern, later counterevidence, and other publication-status changes when known.",
  "Respect the publisher's copyright, license, version-of-record, and reuse conditions. Link to the authoritative publication and expose DOI/citation metadata without assuming the full publisher PDF or artwork may be republished.",
  "Prefer maximum useful scientific richness, but every added medium must still have an explanatory purpose, provenance, accessibility support, and an accurate relation to the published article."
]);

export function renderPublishedArticleEnrichmentRules() {
  return publishedArticleEnrichmentRules.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
}

export function renderScientificMediaRules() {
  return scientificMediaRules.map((rule, index) => `${index + 1}. ${rule}`).join("\n");
}

export function buildScientificMediaBrief({ subject, evidenceType = "unspecified", availableMaterial = [], purpose = "explain" }) {
  return {
    subject,
    purpose,
    evidenceType,
    availableMaterial,
    allowedKinds: scientificMediaKinds,
    rule: "Use only media justified by the phenomenon and available evidence; richness means appropriate variety, not decoration or fabricated content."
  };
}


export function selectScientificMedia({ phenomenon = {}, availableMaterial = [] } = {}) {
  const selected = [];
  const add = (kind, reason) => {
    if (!selected.some(item => item.kind === kind)) selected.push({ kind, reason });
  };

  if (phenomenon.quantitativeData) add("chart", "Quantitative data can be inspected visually.");
  if (phenomenon.comparison) add("table", "Structured comparison benefits from a table.");
  if (phenomenon.structure || phenomenon.relationships) add("diagram", "Structure or relations benefit from a scientific diagram.");
  if (phenomenon.temporalSequence) add("timeline", "Temporal order is part of the explanation.");
  if (phenomenon.spatialRelation) add("map", "Spatial relation is scientifically relevant.");
  if (phenomenon.network || phenomenon.inspectableModel) add("interactive", "The model or network benefits from inspection.");
  if (phenomenon.motion || phenomenon.changeOverTime) add("animation", "Change or motion is materially clearer over time.");
  if (phenomenon.observationMedia) add("observation", "Direct observation material is available.");
  if (phenomenon.experimentMedia) add("experiment", "Experiment material is available.");
  if (phenomenon.audioPhenomenon) add("audio", "The phenomenon has scientifically relevant audio.");
  if (phenomenon.videoEvidence) add("video", "Video materially preserves the observed process.");

  const available = new Set(availableMaterial);
  return selected.filter(item =>
    available.has(item.kind) ||
    ["diagram", "table", "timeline"].includes(item.kind)
  );
}

export function createPublishedEnrichmentPlan({ publication, phenomenon, availableMaterial = [] }) {
  if (!publication?.verified || !(publication.doi || publication.publisherUrl)) {
    return { state: "not-published-enrichment", media: [], reason: "Authoritative publication record is not verified." };
  }
  return {
    state: "published-enrichment",
    anchor: {
      doi: publication.doi || null,
      publisherUrl: publication.publisherUrl || null,
      license: publication.license || "unknown"
    },
    media: selectScientificMedia({ phenomenon, availableMaterial }).map(item => ({
      ...item,
      publicationRelation: "site-enrichment"
    }))
  };
}


export function validateScientificMediaRecord(record = {}) {
  const errors = [];
  if (!record.id) errors.push("id-required");
  if (!record.article) errors.push("article-required");
  if (!scientificMediaKinds.includes(record.kind)) errors.push("unsupported-kind");
  if (!record.purpose) errors.push("purpose-required");
  if (!record.provenance?.method) errors.push("provenance-method-required");
  if (!record.accessibility?.textAlternative) errors.push("text-alternative-required");
  if (!record.publicationRelation) errors.push("publication-relation-required");

  if (record.kind === "chart" && !record.provenance?.data) errors.push("chart-data-required");
  if (["video", "audio"].includes(record.kind) && !record.accessibility?.transcript) errors.push("transcript-required");
  if (record.kind === "interactive" && !record.accessibility?.textAlternative) errors.push("interactive-fallback-required");
  if (record.publicationRelation === "peer-reviewed-original" && !record.publication?.doi && !record.publication?.publisherUrl) {
    errors.push("published-anchor-required");
  }
  return { valid: errors.length === 0, errors };
}

export function prepareScientificMediaRecord(record) {
  const validation = validateScientificMediaRecord(record);
  return { ...record, validation, displayable: validation.valid };
}
