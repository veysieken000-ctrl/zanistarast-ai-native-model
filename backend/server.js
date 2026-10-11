import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildRagContext } from "./rag_search.js";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let runtimeGateway = null;
let formalGateway = null;
try {
  runtimeGateway = require("../api/runtime_gateway");
} catch (error) {
  console.error("Runtime gateway unavailable:", error.message);
}
try {
  formalGateway = require("../api/zanistarast_formal_gateway");
} catch (error) {
  console.error("Formal gateway unavailable:", error.message);
}

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Optional integration: do not prevent the main server from starting when a
// separately developed Mira route is absent from this deployment.
try {
  const { default: miEngineRoutes } = await import("./routes/mi_engine.js");
  app.use("/api", miEngineRoutes);
} catch (error) {
  console.error("Mira engine routes unavailable:", error.message);
}

app.get("/health", (_req, res) => res.json({
  ok: true,
  service: "zanistarast-ai-server",
  runtimeGatewayLoaded: Boolean(runtimeGateway),
  formalGatewayLoaded: Boolean(formalGateway),
  aiKeyConfigured: Boolean(process.env.OPENAI_API_KEY),
  // Readiness is distinct from process liveness.
  ready: Boolean(process.env.OPENAI_API_KEY) && Boolean(runtimeGateway) && Boolean(formalGateway),
  // A readiness flag does not replace a real inference smoke test.
}));

app.post(
    "/api/runtime/init",
    runtimeGateway ? runtimeGateway.initialize.bind(runtimeGateway) : (_req, res) => res.status(503).json({ success: false, error: "Runtime gateway unavailable" })
);

app.post(
    "/api/runtime/process",
    runtimeGateway ? runtimeGateway.process.bind(runtimeGateway) : (_req, res) => res.status(503).json({ success: false, error: "Runtime gateway unavailable" })
);

app.get(
    "/api/runtime/health",
    runtimeGateway ? runtimeGateway.health.bind(runtimeGateway) : (_req, res) => res.status(503).json({ success: false, error: "Runtime gateway unavailable" })
);

app.post("/api/formal/verify", (req, res) => {

    try {

        if (!formalGateway) return res.status(503).json({ success: false, error: "Formal gateway unavailable" });
        const result = formalGateway.verify(req.body);

        res.json({
            success: true,
            result
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

app.get("/api/debug/version", (_req, res) => {
  res.json({
    ok: true,
    serverVersion: "server-v3",
    ragVersion: "rag-v2",
  });
});

app.get("/api/debug/knowledge-files", (_req, res) => {
  try {
    const knowledgeDir = path.join(__dirname, "knowledge");

    if (!fs.existsSync(knowledgeDir)) {
      return res.json({
        ok: false,
        message: "knowledge directory not found",
        knowledgeDir,
      });
    }

    const files = fs.readdirSync(knowledgeDir);

    return res.json({
      ok: true,
      knowledgeDir,
      total: files.length,
      files,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

app.get("/api/debug/search", (req, res) => {
  try {
    const question = String(req.query.q || "").trim();

    if (!question) {
      return res.status(400).json({
        ok: false,
        error: "q parameter is required",
      });
    }

    const { results, context } = buildRagContext(question, 8);

    return res.json({
      ok: true,
      question,
      total: results.length,
      results,
      context,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

function normalizeText(value) {
  return String(value || "").trim();
}

function detectTurkish(text) {
  const lower = normalizeText(text).toLowerCase();
  return (
    /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ne|ile|bir|insan|medeniyet|ahlak|varlık|zihin|gerçek|doğru|yanlış)\b/.test(lower)
  );
}

function getLanguageRule(language, question) {
  const map = {
    "en-US": "Write fully in English.",
    "tr-TR": "Write fully in Turkish.",
    "ku-TR": "Write fully in Kurmanji Kurdish.",
    "ar-SA": "Write fully in Arabic.",
    "fa-IR": "Write fully in Persian.",
    "fr-FR": "Write fully in French.",
    "zh-CN": "Write fully in Chinese.",
    "ru-RU": "Write fully in Russian.",
    "es-ES": "Write fully in Spanish.",
    "sv-SE": "Write fully in Swedish.",
    "no-NO": "Write fully in Norwegian.",
    "de-DE": "Write fully in German.",
    "it-IT": "Write fully in Italian.",
    "ja-JP": "Write fully in Japanese.",
  };

  if (map[language]) return map[language];
  return detectTurkish(question) ? "Write fully in Turkish." : "Write fully in English.";
}

function getLanguageCode(language, question) {
  if (language) return language;
  return detectTurkish(question) ? "tr-TR" : "en-US";
}
function buildTruthAnalysisPrompt(languageRule) {
  return [
    "You are Zanistarast AI, a careful research assistant.",
    "Distinguish empirical findings, logical arguments, hypotheses, and theological or ethical positions.",
    "Use retrieved documents as attributed sources, not as automatic proof.",
    "If evidence is insufficient, say it is uncertain or not yet established; never invent a binary verdict.",
    "Explain what evidence would be needed to resolve uncertainty.",
    "Identify limitations and competing explanations without fabricated citations.",
    languageRule,
  ].join("\n");
}

function buildAskSystemPrompt(question, ragContext, languageRule) {
  const truthAnalysisPrompt = buildTruthAnalysisPrompt(languageRule);

  return `
${truthAnalysisPrompt}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}

RULES:
- Ground the answer in the retrieved knowledge when possible.
- Stay concise but complete.
- Avoid generic filler.
- Keep the final answer structurally clean.
`.trim();
}

function isBadSystemAnswer(_question, answer, _language) {
  return !normalizeText(answer) || normalizeText(answer).length < 40;
}

function buildRepairSystemPrompt(question, ragContext, firstAnswer, languageRule) {
  return [
    "Improve the answer's clarity, factual grounding, and source attribution.",
    "Preserve uncertainty where evidence is incomplete; do not invent conclusions.",
    languageRule,
    "QUESTION:", question,
    "RETRIEVED KNOWLEDGE:", ragContext || "No retrieved context found.",
    "FIRST ANSWER:", firstAnswer || "",
  ].join("\n");
}

async function callOpenAI(systemPrompt, userPrompt, temperature = 0.35) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ok: false,
      error: "OPENAI_API_KEY is missing",
    };
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      signal: AbortSignal.timeout(25000),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      // Do not expose upstream responses: they may contain sensitive data.
      return { ok: false, error: `AI provider returned HTTP ${response.status}` };
    }

    const data = await response.json();
    const answer =
      data?.choices?.[0]?.message?.content ||
      "No answer returned from API.";

    return {
      ok: true,
      answer,
    };
  } catch (error) {
    return {
      ok: false,
      error: `Request failed: ${error.message}`,
    };
  }
}
function enforceTruthFormat(answer, _language) {
  // Never manufacture a FALSE verdict when a model response is malformed.
  // Preserve the actual response so failures remain visible to callers.
  return normalizeText(answer) || "No model answer was returned.";
}

app.post("/api/ask", async (req, res) => {
  try {
    const question = normalizeText(req.body?.question);
    const language = getLanguageCode(req.body?.language, question);

    if (!question) {
      return res.status(400).json({
        answer: language === "tr-TR" ? "Lütfen bir soru gir." : "Please enter a question.",
      });
    }

    const { results, context } = buildRagContext(question, 8);

    if (!results.length) {
      return res.json({
        answer:
          language === "tr-TR"
            ? "İlgili knowledge bulunamadı. Önce bu konuyu knowledge tabanına eklemelisin."
            : "No relevant knowledge was found. Add this topic into the knowledge base first.",
        meta: {
          total: 0,
          chunks: [],
        },
      });
    }

    const languageRule = getLanguageRule(language, question);
    const systemPrompt = buildAskSystemPrompt(question, context, languageRule);
    const firstPass = await callOpenAI(systemPrompt, question, 0.35);

    if (!firstPass.ok) {
      return res.status(503).json({
        answer: "AI provider unavailable",
        error: firstPass.error,
      });
    }

    let answer = firstPass.answer;

    if (isBadSystemAnswer(question, answer, language)) {
      const repairPrompt = buildRepairSystemPrompt(question, context, answer, languageRule);
      const repairPass = await callOpenAI(repairPrompt, question, 0.2);

      if (repairPass.ok && repairPass.answer) {
        answer = repairPass.answer;
      }
    }

    const finalAnswer = enforceTruthFormat(answer, language);

    return res.json({
      answer: finalAnswer,
      meta: {
        total: results.length,
        chunks: results.map((item) => ({
          id: item.id,
          title: item.title,
          domain: item.domain,
          layer: item.layer,
          score: item.score,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      answer: `Server error: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

