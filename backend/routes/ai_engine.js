import express from "express";
import { buildRagContext } from "../rag_search.js";

const router = express.Router();

function detectTurkish(text) {
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman)\b/.test(lower);
}

function safeLimit(value, fallback = 8) {
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  if (n < 1) return 1;
  if (n > 12) return 12;
  return n;
}

function buildInterpretPrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI operating under Mira epistemic discipline.

RULES:
1. Retrieved material is context, not proof. Retrieval score never establishes authority or truth.
2. Preserve the source status shown in the retrieved context. UNVERIFIED material must remain unverified.
3. Use domain-native scientific terminology. Do not force Hebun, Zanabun, Rasterast, Mabun, Rabun, Tek/Yek, or any fixed layer scheme onto a topic when the evidence does not support it.
4. Distinguish scientific identity from structural or functional similarity, analogy, pedagogical comparison, ontological interpretation, and research hypothesis.
5. State uncertainty, missing evidence, and relevant contradictions when material.
6. Religious, philosophical, historical, legacy, or artistic material must not be presented as empirical scientific evidence merely because it was retrieved.
7. Yek is an ontological category only; do not use it as a label for an article, topic, method, process, or arbitrary group.
8. Ehad is not a classification layer.
9. Give the direct answer first. Add structure only when it improves accuracy.

LANGUAGE:
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

QUESTION:
${question}

RETRIEVED CONTEXT WITH SOURCE STATUS:
${ragContext || "No retrieved context found."}
`.trim();
}

function buildEvaluatePrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI performing a Mira/Rasterast epistemic evaluation.

EVALUATION RULES:
1. Evaluate claim-to-evidence fit; do not manufacture a binary verdict when evidence is insufficient.
2. Preserve retrieved authority, epistemic, Rasterast, and provenance status. Similarity score is not authority.
3. Distinguish: established evidence, contradiction, uncertainty, missing evidence, research hypothesis, interpretation, analogy, and scientific identity.
4. Use the standards of the actual discipline being evaluated. Do not impose a universal fixed layer or Hebun/Zanabun/Mabun/Rabun checklist.
5. Identify counterevidence or unresolved contradiction when present.
6. Religious, philosophical, historical, legacy, and artistic sources retain their own source type and are not automatically empirical scientific evidence.
7. Yek is ontological only. Ehad is not a classification layer.
8. Rasterast verifies status and coherence; it must not turn unverified retrieval into proof.
9. End with an epistemic status and the evidence still required, not a rhetorical "final verdict".

LANGUAGE:
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

QUESTION:
${question}

RETRIEVED CONTEXT WITH SOURCE STATUS:
${ragContext || "No retrieved context found."}
`.trim();
}

async function callOpenAI(systemPrompt, userPrompt, temperature = 0.3) {
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
      temperature,
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
    const limit = safeLimit(req.body?.limit, 8);

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
    const limit = safeLimit(req.body?.limit, 8);

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, limit);

    if (!results.length) {
      return res.json({
        mode: "interpret",
        answer: detectTurkish(question)
          ? "İlgili knowledge bulunamadı. Önce knowledge tabanına bu konuya ait içerik eklenmeli."
          : "No relevant knowledge was found. Add this topic into the knowledge base first.",
        rag: {
          total: 0,
          chunks: []
        }
      });
    }

    const systemPrompt = buildInterpretPrompt(question, context);
    const ai = await callOpenAI(systemPrompt, question, 0.3);

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
    const limit = safeLimit(req.body?.limit, 8);

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, limit);

    if (!results.length) {
      return res.json({
        mode: "evaluate",
        answer: detectTurkish(question)
          ? "Değerlendirme için yeterli knowledge bulunamadı. Bu konu önce knowledge tabanında tanımlanmalı."
          : "There is not enough knowledge to evaluate this topic. Define it in the knowledge base first.",
        rag: {
          total: 0,
          chunks: []
        }
      });
    }

    const systemPrompt = buildEvaluatePrompt(question, context);
    const ai = await callOpenAI(systemPrompt, question, 0.25);

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

