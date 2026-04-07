export function buildRagContext(question, k = 5) {
  const q = String(question || "").toLowerCase();

  const keywords = q.split(/\s+/).filter(Boolean);

  const results = knowledgeChunks.map((chunk) => {
    const text = chunk.content.toLowerCase();

    let score = 0;

    for (const word of keywords) {
      if (text.includes(word)) {
        score += 1;
      }
    }

    return {
      ...chunk,
      score
    };
  });

  const filtered = results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);

  const context = filtered.map((r) => r.content).join("\n\n");

  return {
    results: filtered,
    context
  };
}


