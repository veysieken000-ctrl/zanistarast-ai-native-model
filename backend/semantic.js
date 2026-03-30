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
export function splitTextIntoChunks(text, maxLength = 500) {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let current = "";

  for (const paragraph of paragraphs) {
    const next = current ? `${current}\n\n${paragraph}` : paragraph;

    if (next.length <= maxLength) {
      current = next;
    } else {
      if (current) {
        chunks.push(current);
      }

      if (paragraph.length <= maxLength) {
        current = paragraph;
      } else {
        const sentences = paragraph
          .split(/(?<=[.!?])\s+/)
          .map((s) => s.trim())
          .filter(Boolean);

        let sentenceChunk = "";

        for (const sentence of sentences) {
          const candidate = sentenceChunk
            ? `${sentenceChunk} ${sentence}`
            : sentence;

          if (candidate.length <= maxLength) {
            sentenceChunk = candidate;
          } else {
            if (sentenceChunk) {
              chunks.push(sentenceChunk);
            }
            sentenceChunk = sentence;
          }
        }

        current = sentenceChunk;
      }
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}


