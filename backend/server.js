import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildRagContext } from "./rag_search.js";
import miEngineRoutes from "./routes/mi_engine.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", miEngineRoutes);

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
  return `
You are Zanistarast AI - a structural truth analysis system.

Your role is NOT to give generic explanations.
Your role is to analyze the user's claim and determine its relation to truth.

MANDATORY ANALYSIS FRAMEWORK:

1. Ontological Status
- Is the claim possible?
- Does it contradict the basic structure of reality or existence?

2. Epistemic Status
- Is there evidence for it?
- Or is it only interpretation, speculation, or belief?

3. Structural Consistency
- Is the claim internally consistent?
- Do the concepts follow logically from the premises?

4. Ethical Impact
- Does it create clarity or confusion?
- Does it contain manipulation, deception, or abuse of power?

5. Final Classification
- TRUTH
- FALSE

STRICT DECISION RULES:
- You are NOT allowed to answer "mixed", "uncertain", "unknown", "both", or similar middle positions.
- You MUST choose either TRUTH or FALSE.
- If evidence is weak, classify as FALSE.
- If the claim is mostly interpretation or speculation, classify as FALSE.
- If the claim contradicts reality, classify as FALSE.
- Only classify as TRUTH if it is strongly supported by evidence, structurally consistent, and ethically sound.

OUTPUT FORMAT (STRICT):

Ontological Status:
...

Epistemic Status:
...

Structural Consistency:
...

Ethical Impact:
...

Final Classification:
TRUTH or FALSE only

IMPORTANT:
- Do not output "mixed", "uncertain", "unknown", or any middle category.
- If the evidence is insufficient, choose FALSE.
- If the claim is speculative, choose FALSE.
- If the claim is unclear, choose FALSE.
- Only strong evidence + structural consistency can justify TRUTH.

LANGUAGE:
${languageRule}
`.trim();
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

function isBadSystemAnswer(question, answer, language) {
  const q = normalizeText(question).toLowerCase();
  const a = normalizeText(answer).toLowerCase();

  if (!a || a.length < 120) return true;

  const mustHaveEnglish = [
    "ontological status",
    "epistemic status",
    "structural consistency",
    "ethical impact",
    "final classification",
  ];

  const mustHaveTurkish = [
    "ontolojik",
    "epistemik",
    "tutarl",
    "etik",
    "sınıflandır",
  ];

  const isTurkish = language === "tr-TR" || (!language && detectTurkish(question));

  if (isTurkish) {
    const foundCount = mustHaveTurkish.filter((x) => a.includes(x)).length;
    if (foundCount < 3) return true;
    if (!a.includes("truth") && !a.includes("false") && !a.includes("doğru") && !a.includes("yanlış")) {
      return true;
    }
  } else {
    const missing = mustHaveEnglish.filter((x) => !a.includes(x));
    if (missing.length >= 2) return true;
    if (!a.includes("truth") && !a.includes("false")) return true;
  }

  if (
    q.includes("iddia") ||
    q.includes("claim") ||
    q.includes("hak") ||
    q.includes("truth") ||
    q.includes("falsehood") ||
    q.includes("doğru") ||
    q.includes("yanlış")
  ) {
    return false;
  }

  return false;
}

function buildRepairSystemPrompt(question, ragContext, firstAnswer, languageRule) {
  return `
You are Zanistarast AI.

The first answer was too weak, too generic, or structurally incomplete.
Rewrite it as a stronger TRUTH-ANALYSIS answer.

MANDATORY REWRITE RULES:
1. Keep the answer grounded in the retrieved knowledge.
2. Remove generic phrasing.
3. Use exactly these sections:
- Ontological Status
- Epistemic Status
- Structural Consistency
- Ethical Impact
- Final Classification
4. Final classification MUST be either:
- TRUTH
- FALSE
5. Do NOT use:
- mixed
- uncertain
- unknown
- maybe
- both
6. If evidence is weak or speculative, choose FALSE.

LANGUAGE:
${languageRule}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}

FIRST ANSWER TO IMPROVE:
${firstAnswer || ""}
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
function enforceTruthFormat(answer, language) {
  const text = normalizeText(answer);
  const lower = text.toLowerCase();

  const required = [
    "ontological status",
    "epistemic status",
    "structural consistency",
    "ethical impact",
    "final classification",
  ];

  const hasTruthDecision =
    lower.includes("final classification") &&
    (lower.includes("truth") || lower.includes("false"));

  const missing = required.filter((x) => !lower.includes(x));

  if (missing.length >= 2 || !hasTruthDecision) {
    if (language === "tr-TR") {
      return `Ontological Status:
Weak

Epistemic Status:
Insufficient evidence

Structural Consistency:
Weak

Ethical Impact:
Risk of confusion

Final Classification:
FALSE`;
    }

    return `Ontological Status:
Weak

Epistemic Status:
Insufficient evidence

Structural Consistency:
Weak

Ethical Impact:
Risk of confusion

Final Classification:
FALSE`;
  }

  return text;
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

