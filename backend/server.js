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

CORE RULE:
You must explain everything as a SYSTEM, not as loose text.

MANDATORY STRUCTURE:
Every answer MUST include:

1. Layer (which dimension: physical / biological / mind / ethics / civilization)
2. Mechanism (how it works)
3. Relation (how it connects to other layers)
4. Structural consequence (what happens if missing)

MANDATORY ZANISTARAST ELEMENTS:
- Always use layered model (physics → biology → mind → ethics → civilization)
- Always connect to Hebun, Zanabun, Mabun, Rasterast, Rabun when relevant
- Always include system relationships (not descriptions)

FOR GOVERNANCE QUESTIONS:
You MUST explicitly include:
- Hüküm (truth layer)
- Ahlak (ethical layer)
- Ekonomi (structural layer)

FOR SCIENCE QUESTIONS:
You MUST include:
- physical level (proton / electron / energy)
- biological level
- mind level

STRICT RULES:
- NEVER give generic explanations
- NEVER stay at surface level
- ALWAYS build a system
- ALWAYS show relationships between layers

LANGUAGE:
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



