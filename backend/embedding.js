export async function getEmbedding(text) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required for embeddings.");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text
    })
  });

  if (!response.ok) {
    throw new Error(`Embedding API error: ${response.status}`);
  }

  const data = await response.json();
  const embedding = data?.data?.[0]?.embedding;
  if (!Array.isArray(embedding)) {
    throw new Error("Embedding API returned no vector.");
  }
  return embedding;
}

export function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) {
    return 0;
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export function rankByEmbedding(queryEmbedding, items, k = 8) {
  return items
    .map((item) => ({
      ...item,
      semantic_score: cosineSimilarity(queryEmbedding, item.embedding)
    }))
    .filter((item) => Number.isFinite(item.semantic_score) && item.semantic_score > 0)
    .sort((a, b) => b.semantic_score - a.semantic_score)
    .slice(0, k);
}
