export function scoreSemanticMatch(question, text) {
  const q = question.toLowerCase();
  const t = text.toLowerCase();

  const tokens = q
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);

  let score = 0;

  for (const token of tokens) {
    if (t.includes(token)) {
      score += 1;
    }
  }

  return score;
}

