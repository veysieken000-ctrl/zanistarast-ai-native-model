import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { buildRagContext } from "./rag_search.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function detectTurkish(text) {
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman)\b/.test(lower);
}

function buildSystemPrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI.

Your job is to answer using the retrieved RAG knowledge first.

MANDATORY RULES:
1. Use the retrieved knowledge below as the primary source.
2. Prefer structural explanation over shallow summary.
3. If the exact concept is missing, use the nearest relevant Zanistarast concept.
4. Do NOT hallucinate specific repository claims that are not in the retrieved context.
5. If the user asks in Turkish, answer in Turkish.
6. If the user asks in English, answer in English.
7. If the question is simple, answer clearly and directly.
8. If the question asks for depth, comparison, theory, or analysis, answer in article-like structure.
9. When relevant, end with 2 or 3 short natural follow-up suggestions as plain lines, not bullets.

ZANISTARAST FRAMEWORK PRIORITY:
- Hebun = ontology / being
- Zanabun = epistemology / knowledge validation
- Mabun = structural-economy / responsibility
- Rasterast = coherence / validation method
- Rabun = governance
- Newroza Kawa = civilization model

LANGUAGE MODE:
${wantsTurkish ? "Answer in Turkish." : "Answer in English."}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}
`.trim();
}

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "zanistarast backend is running"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        answer: "Backend is ready, but no live API key is configured yet."
      });
    }

    const { results, context } = buildRagContext(question, 5);

    const systemPrompt = buildSystemPrompt(question, context);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        answer: `API error: ${errorText}`
      });
    }

    const data = await response.json();
    const answer =
      data?.choices?.[0]?.message?.content ||
      "No answer returned from API.";

    return res.json({
      answer,
      rag: {
        total: results.length,
        chunks: results.map((item) => ({
          id: item.id,
          title: item.title,
          domain: item.domain,
          score: item.score
        }))
      }
    });
  } catch (_error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



