import { loadProcessedKnowledge } from "./rag_loader.js";

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalize(text).split(" ").filter(Boolean);
}

function scoreItem(query, item) {
  const qTokens = tokenize(query);

  const title = normalize(item.title);
  const section = normalize(item.section);
  const domain = normalize(item.domain);
  const summary = normalize(item.summary);
  const content = normalize(item.content);
  const keywords = (item.keywords || []).map((k) => normalize(k));
  const topics = (item.topics || []).map((t) => normalize(t));

  let score = 0;

  for (const token of qTokens) {
    if (title.includes(token)) score += 8;
    if (section.includes(token)) score += 5;
    if (domain.includes(token)) score += 4;
    if (summary.includes(token)) score += 4;
    if (content.includes(token)) score += 2;
    if (keywords.some((k) => k.includes(token))) score += 6;
    if (topics.some((t) => t.includes(token))) score += 6;
  }

  const q = normalize(query);

  if (q.includes("hebun") && title.includes("hebun")) score += 20;
  if (q.includes("zanabun") && title.includes("zanabun")) score += 20;
  if (q.includes("mabun") && title.includes("mabun")) score += 20;
  if (q.includes("rasterast") && title.includes("rasterast")) score += 20;
  if (q.includes("rabun") && title.includes("rabun")) score += 20;
  if (q.includes("newroza") && title.includes("newroza")) score += 20;
  if (q.includes("zanistarast") && title.includes("zanistarast")) score += 20;
  if ((q.includes("jeoloji") || q.includes("geology")) && domain.includes("geology")) score += 14;
  if ((q.includes("biyoloji") || q.includes("biology")) && domain.includes("biology")) score += 14;
  if ((q.includes("zihin") || q.includes("mind")) && domain.includes("mind")) score += 14;
  if ((q.includes("etik") || q.includes("ethics") || q.includes("ahlak")) && domain.includes("ethics")) score += 14;
  if ((q.includes("tarih") || q.includes("history")) && domain.includes("history")) score += 14;
  if ((q.includes("medeniyet") || q.includes("civilization")) && domain.includes("civilization")) score += 14;

  return score;
}

export function searchKnowledge(query, limit = 5) {
  const items = loadProcessedKnowledge();

  if (!items.length) {
    return [];
  }

  return items
    .map((item) => ({
      ...item,
      score: scoreItem(query, item)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function buildRagContext(query, limit = 5) {
  const results = searchKnowledge(query, limit);

  const context = results
    .map(
      (item) =>
        `### CHUNK: ${item.id}
TITLE: ${item.title}
SECTION: ${item.section}
DOMAIN: ${item.domain}
LAYER: ${item.layer}
SUMMARY: ${item.summary}

CONTENT:
${item.content}`
    )
    .join("\n\n");

  return {
    results,
    context
  };
}
