import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { buildRagContext } from "./rag_search.js";
import aiEngineRoutes from "./routes/ai_engine.js";

const requireLegacy = createRequire(import.meta.url);

const runtimeGateway =
    requireLegacy("../api/runtime_gateway");

const formalGateway =
    requireLegacy("../api/zanistarast_formal_gateway");

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", aiEngineRoutes);

app.post(
    "/api/runtime/init",
    runtimeGateway.initialize
);

app.post(
    "/api/runtime/process",
    runtimeGateway.process
);

app.get(
    "/api/runtime/health",
    runtimeGateway.health
);

app.post("/api/formal/verify", (req, res) => {

    try {

        const result =
            formalGateway.verify(req.body);

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
function buildAskSystemPrompt(question, ragContext, languageRule) {
  return `
You are Zanistarast AI. Answer from retrieved knowledge without turning uncertainty into falsehood.

EPISTEMIC RULES:
- Preserve the status of the evidence. Similarity or retrieval score is not authority.
- Distinguish established evidence, interpretation, analogy, research hypothesis, uncertainty, contradiction, and missing evidence.
- Insufficient evidence means UNVERIFIED, not FALSE.
- Use FALSE only when the available evidence actually contradicts the claim.
- Do not present religious, philosophical, artistic, historical, or legacy material as empirical scientific evidence.
- Do not treat an analogy as scientific identity.
- If repository material conflicts or is legacy, expose that limitation rather than silently promoting it.

ANSWER CONTRACT:
- Give the direct answer first.
- State epistemic status when it materially affects the answer.
- Mention uncertainty or counterevidence when present.
- Ground repository-specific claims in retrieved knowledge.
- Do not invent a mandatory layer classification when the domain does not support one.

LANGUAGE:
${languageRule}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}
`.trim();
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
      const errorText = await response.text();
      return {
        ok: false,
        error: `API error: ${errorText}`,
      };
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
      return res.status(500).json({
        answer: firstPass.error,
      });
    }

    const answer = normalizeText(firstPass.answer);

    return res.json({
      answer,
      meta: {
        total: results.length,
        epistemic_status: "UNVERIFIED",
        rasterast_status: "NOT_REVIEWED",
        provenance_status: "PARTIAL",
        notice: "Retrieval matches are context candidates; score is not authority or proof.",
        sources: results.map((item) => ({
          id: item.id,
          title: item.title,
          source_type: item.authority?.source_type || "RepositoryKnowledge",
          authority_status: item.authority?.authority_status || "UNVERIFIED",
          epistemic_status: item.authority?.epistemic_status || "UNVERIFIED",
          rasterast_status: item.authority?.rasterast_status || "NOT_REVIEWED",
          provenance_status: item.authority?.provenance_status || "PARTIAL",
          domain: item.domain,
          layer: item.layer,
          retrieval_score: item.score,
          provenance: {
            repository_path: item.repositoryPath || `backend/knowledge/${item.title}`,
            chunk_id: item.id,
            manifest_priority: item.authority?.manifest_priority || null
          }
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

