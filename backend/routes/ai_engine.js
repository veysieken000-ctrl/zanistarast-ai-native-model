import express from "express";
import { buildRagContext } from "../rag_search.js";

const router = express.Router();

function detectTurkish(text) {
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman)\b/.test(lower);
}

function buildInterpretPrompt(question, context) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI.

You are a structural reasoning engine.
You must answer from the retrieved knowledge first.

MANDATORY RULES:
1. Use retrieved knowledge as the primary source.
2. Do not replace retrieved knowledge with generic textbook explanation.
3. Build the answer structurally, not superficially.
4. If the topic is about Zanistarast, explain through Hebun, Zanabun, Rasterast, Mabun, Rabun, and civilization relation when relevant.
5. If retrieved knowledge is partial, extend carefully without inventing repository-specific claims.
6. Do not explain with random generic philosophy or standard science summaries.
7. Keep the answer layered and system-based.

OUTPUT STRUCTURE:
- Katman / Boyut
- Mekanizma
- İlişki
- Yapısal Sonuç

LANGUAGE:
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${context || "No retrieved context found."}
`.trim();
}

function buildEvaluatePrompt(question, context) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI in judge mode.

You are not only answering.
You are evaluating whether a concept, claim, or theory is structurally valid.

MANDATORY EVALUATION AXES:
1. Hebun (Ontology)
2. Zanabun (Epistemology)
3. Rasterast (Coherence)
4. Mabun (Structural-Economic / Responsibility)
5. Rabun (Governance / System Order)

RULES:
- Evaluate from the retrieved knowledge first.
- Do not give a neutral generic summary.
- Show where the structure stands or collapses.
- If the question is about a system, theory, or claim, explicitly judge its structural adequacy.
- If evidence is insufficient, say the evaluation is partial.

OUTPUT FORMAT:
1. Kısa Tanım
2. Hebun Değerlendirmesi
3. Zanabun Değerlendirmesi
4. Rasterast Değerlendirmesi
5. Mabun Değerlendirmesi
6. Rabun Değerlendirmesi
7. Nihai Hüküm
8. Çöküş Noktası / Eksik Nokta

LANGUAGE:
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${context || "No retrieved context found."}
`.trim();
}

async function callOpenAI(systemPrompt, userPrompt) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: false,
      error: "Backend is ready, but no live API key is configured yet."
    };
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    return {
      ok: false,
      error: `API error: ${errorText}`
    };
  }

  const data = await response.json();
  const answer =
    data?.choices?.[0]?.message?.content ||
    "No answer returned from API.";

  return {
    ok: true,
    answer
  };
}

router.post("/query", (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();
    const limit = Number(req.body?.limit || 8);

    if (!question) {
      return res.status(400).json({
        error: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, limit);

    return res.json({
      mode: "query",
      question,
      total: results.length,
      context,
      chunks: results.map((item) => ({
        id: item.id,
        title: item.title,
        section: item.section,
        domain: item.domain,
        layer: item.layer,
        score: item.score,
        summary: item.summary
      }))
    });
  } catch (_error) {
    return res.status(500).json({
      error: "Query route failed."
    });
  }
});

router.post("/interpret", async (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();
    const limit = Number(req.body?.limit || 8);

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, limit);
    const systemPrompt = buildInterpretPrompt(question, context);
    const ai = await callOpenAI(systemPrompt, question);

    if (!ai.ok) {
      return res.status(500).json({
        answer: ai.error
      });
    }

    return res.json({
      mode: "interpret",
      answer: ai.answer,
      rag: {
        total: results.length,
        chunks: results.map((item) => ({
          id: item.id,
          title: item.title,
          domain: item.domain,
          layer: item.layer,
          score: item.score
        }))
      }
    });
  } catch (_error) {
    return res.status(500).json({
      answer: "Interpret route failed."
    });
  }
});

router.post("/evaluate", async (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();
    const limit = Number(req.body?.limit || 8);

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, limit);
    const systemPrompt = buildEvaluatePrompt(question, context);
    const ai = await callOpenAI(systemPrompt, question);

    if (!ai.ok) {
      return res.status(500).json({
        answer: ai.error
      });
    }

    return res.json({
      mode: "evaluate",
      answer: ai.answer,
      rag: {
        total: results.length,
        chunks: results.map((item) => ({
          id: item.id,
          title: item.title,
          domain: item.domain,
          layer: item.layer,
          score: item.score
        }))
      }
    });
  } catch (_error) {
    return res.status(500).json({
      answer: "Evaluate route failed."
    });
  }
});

export default router;
