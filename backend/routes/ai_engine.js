import express from "express";
import { buildRagContext } from "../rag_search.js";
import { buildMiraPrompt } from "../mira_core.js";

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

function languageRuleFor(question) {
  return detectTurkish(question) ? "Write fully in Turkish." : "Write fully in English.";
}

function buildInterpretPrompt(question, ragContext) {
  return buildMiraPrompt({
    mode: "interpret",
    question,
    ragContext,
    languageRule: languageRuleFor(question)
  });
}

function buildEvaluatePrompt(question, ragContext) {
  return buildMiraPrompt({
    mode: "evaluate",
    question,
    ragContext,
    languageRule: languageRuleFor(question)
  });
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
        summary: item.summary,
        source_type: item.authority?.source_type || "RepositoryKnowledge",
        authority_status: item.authority?.authority_status || "UNVERIFIED",
        epistemic_status: item.authority?.epistemic_status || "UNVERIFIED",
        rasterast_status: item.authority?.rasterast_status || "NOT_REVIEWED",
        provenance_status: item.authority?.provenance_status || "PARTIAL"
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
          score: item.score,
          source_type: item.authority?.source_type || "RepositoryKnowledge",
          authority_status: item.authority?.authority_status || "UNVERIFIED",
          epistemic_status: item.authority?.epistemic_status || "UNVERIFIED",
          rasterast_status: item.authority?.rasterast_status || "NOT_REVIEWED",
          provenance_status: item.authority?.provenance_status || "PARTIAL"
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
          score: item.score,
          source_type: item.authority?.source_type || "RepositoryKnowledge",
          authority_status: item.authority?.authority_status || "UNVERIFIED",
          epistemic_status: item.authority?.epistemic_status || "UNVERIFIED",
          rasterast_status: item.authority?.rasterast_status || "NOT_REVIEWED",
          provenance_status: item.authority?.provenance_status || "PARTIAL"
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

