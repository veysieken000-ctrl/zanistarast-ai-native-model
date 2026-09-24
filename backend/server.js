import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { buildRagContext, buildHybridRagContext } from "./rag_search.js";
import { buildMiraPrompt } from "./mira_core.js";
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
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) app.set("trust proxy", 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "https://zanistarast.org")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Origin not allowed by CORS"));
  }
}));
app.use(express.json({ limit: "1mb" }));

app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), geolocation=(), payment=()");
  next();
});

const askRateBuckets = new Map();
let lastRateSweep = 0;
function askRateLimit(req, res, next) {
  const now = Date.now();
  const windowMs = 60_000;
  const maxRequests = 30;
  const key = req.ip || req.socket?.remoteAddress || "unknown";

  if (now - lastRateSweep >= windowMs) {
    for (const [bucketKey, timestamps] of askRateBuckets) {
      const active = timestamps.filter(ts => now - ts < windowMs);
      if (active.length) askRateBuckets.set(bucketKey, active);
      else askRateBuckets.delete(bucketKey);
    }
    lastRateSweep = now;
  }

  const recent = (askRateBuckets.get(key) || []).filter(ts => now - ts < windowMs);
  if (recent.length >= maxRequests) {
    return res.status(429).json({ answer: "Too many requests. Please try again shortly." });
  }
  recent.push(now);
  askRateBuckets.set(key, recent);
  next();
}

function internalOnly(req, res, next) {
  if (!isProduction) return next();
  const configuredToken = process.env.INTERNAL_API_TOKEN;
  const suppliedToken = req.get("x-zanistarast-internal-token");
  if (!configuredToken || suppliedToken !== configuredToken) {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  next();
}

app.use("/api/runtime", internalOnly);
app.use("/api/formal", internalOnly);
app.use("/api/query", internalOnly);
app.use("/api/interpret", internalOnly);
app.use("/api/evaluate", internalOnly);

app.use("/api", aiEngineRoutes);

await new Promise((resolve, reject) => {
    runtimeGateway.initialize(
        { body: {} },
        {
            json: resolve,
            status: () => ({ json: (body) => reject(new Error(body?.error || "Runtime initialization failed")) })
        }
    );
});


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
            error: isProduction ? "Formal verification failed." : err.message
        });

    }

});

const debugOnly = (req, res, next) => {
  if (process.env.NODE_ENV === "production" && process.env.ENABLE_DEBUG_ROUTES !== "true") {
    return res.status(404).json({ ok: false, error: "Not found" });
  }
  next();
};

app.use("/api/debug", debugOnly);

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
  return buildMiraPrompt({
    mode: "answer",
    question,
    ragContext,
    languageRule
  });
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
function deriveResponseStatus(results) {
  const authorities = results.map((item) => item.authority || {});
  const allManifestMatched =
    authorities.length > 0 &&
    authorities.every((a) => a.provenance_status === "MANIFEST_MATCH");
  const allCanonicalDeclared =
    allManifestMatched &&
    authorities.every((a) => a.authority_status === "CANONICAL_DECLARED");
  const reviewRequired =
    authorities.some((a) => a.rasterast_status === "REVIEW_REQUIRED");

  return {
    authority_status: allCanonicalDeclared ? "REPOSITORY_DECLARED" : "UNVERIFIED",
    epistemic_status: "UNVERIFIED",
    rasterast_status: reviewRequired ? "REVIEW_REQUIRED" : "NOT_REVIEWED",
    provenance_status: allManifestMatched ? "MANIFEST_MATCH" : "PARTIAL"
  };
}

app.post("/api/ask", askRateLimit, async (req, res) => {
  try {
    const question = normalizeText(req.body?.question);
    const language = getLanguageCode(req.body?.language, question);

    if (!question) {
      return res.status(400).json({
        answer: language === "tr-TR" ? "Lütfen bir soru gir." : "Please enter a question.",
      });
    }

    const { results, context } = await buildHybridRagContext(question, 8);

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
        answer: isProduction ? "Mira provider request failed." : firstPass.error,
      });
    }

    const answer = normalizeText(firstPass.answer);
    const responseStatus = deriveResponseStatus(results);

    return res.json({
      answer,
      meta: {
        total: results.length,
        authority_status: responseStatus.authority_status,
        epistemic_status: responseStatus.epistemic_status,
        rasterast_status: responseStatus.rasterast_status,
        provenance_status: responseStatus.provenance_status,
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
          semantic_score: Number.isFinite(item.semantic_score) ? item.semantic_score : null,
          retrieval_method: Number.isFinite(item.semantic_score)
            ? (item.score > 0 ? "HYBRID" : "SEMANTIC")
            : "LEXICAL",
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
      answer: isProduction ? "Mira request failed." : `Server error: ${error.message}`,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

