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
