import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { buildRagContext } from "./rag_search.js";
import aiEngineRoutes from "./routes/ai_engine.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", aiEngineRoutes);
app.get("/api/debug/version", (_req, res) => {
  res.json({
    ok: true,
    serverVersion: "server-v2",
    ragVersion: "rag-v2"
  });
});
app.get("/api/debug/knowledge-files", (_req, res) => {
  try {
    const knowledgeDir = path.join(__dirname, "knowledge");

    if (!fs.existsSync(knowledgeDir)) {
      return res.json({
        ok: false,
        message: "knowledge klasörü bulunamadı",
        knowledgeDir
      });
    }

    const files = fs.readdirSync(knowledgeDir);

    return res.json({
      ok: true,
      knowledgeDir,
      total: files.length,
      files
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

app.get("/api/debug/search", (req, res) => {
  try {
    const question = String(req.query.q || "").trim();

    if (!question) {
      return res.status(400).json({
        ok: false,
        error: "q parametresi gerekli"
      });
    }

    const { results, context } = buildRagContext(question, 8);

    return res.json({
      ok: true,
      question,
      total: results.length,
      results,
      context
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

function detectTurkish(text) {
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman|hak|batıl|doğru|yanlış)\b/.test(lower);
}

function buildTruthAnalysisPrompt() {
  return `
Analyze the user's claim using the following framework:

1. Ontological Status
- Is the claim possible?
- Does it contradict the basic structure of reality or existence?

2. Epistemic Status
- Is there evidence for it?
- Or is it only interpretation, speculation, or belief?

3. Structural Consistency
- Is the claim internally consistent?
- Do the conclusions follow logically from the premises?

4. Ethical Impact
- Does it create clarity or confusion?
- Does it contain manipulation, deception, or abuse of power?

5. Final Classification (MANDATORY DECISION)
- TRUTH
- FALSE

STRICT DECISION RULES:
- You are NOT allowed to answer "mixed", "uncertain", "unknown", "both", or similar middle positions.
- You MUST choose either TRUTH or FALSE.
- If evidence is weak, classify as FALSE.
- If the claim is mostly interpretation or speculation, classify as FALSE.
- If the claim contradicts reality, classify as FALSE.
- Only classify as TRUTH if it is strongly supported by evidence, structurally consistent, and ethically sound.

Decision formula:
Truth = Ontological coherence + Epistemic support + Structural consistency
If one of these fails strongly, the result is FALSE.

Keep the response short, clear, direct, and decisive.
`.trim();
}

function buildAskSystemPrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);
  const truthAnalysisPrompt = buildTruthAnalysisPrompt();

  return `
You are Zanistarast AI — a structural truth analysis system.

Your role is NOT to give generic explanations.
Your role is to ANALYZE the user's claim and determine its relation to truth.

${truthAnalysisPrompt}

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
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}
`.trim();
}

function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function isWeakSystemAnswer(question, answer) {
  const q = normalizeText(question);
  const a = normalizeText(answer);

  if (!a || a.length < 180) return true;

  const mustHaveTruth = [
    "ontological",
    "epistemic",
    "structural",
    "ethical",
    "classification"
  ];

  const missingTruth = mustHaveTruth.filter((x) => !a.includes(x));
  if (missingTruth.length >= 2) return true;

  if (!a.includes("truth") && !a.includes("false")) {
    return true;
  }

  if (
    q.includes("iddia") ||
    q.includes("claim") ||
    q.includes("hak") ||
    q.includes("batıl") ||
    q.includes("batil") ||
    q.includes("truth") ||
    q.includes("falsehood") ||
    q.includes("doğru") ||
    q.includes("dogru") ||
    q.includes("yanlış") ||
    q.includes("yanlis")
  ) {
    const mustHave = ["ontolojik", "epistemik", "tutarl", "etik"];
    const foundCount = mustHave.filter((x) => a.includes(x)).length;

    if (detectTurkish(question) && foundCount < 3) return true;
  }

  return false;
}

function buildRepairSystemPrompt(question, ragContext, firstAnswer) {
  const wantsTurkish = detectTurkish(question);

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
4. Final Classification MUST be either:
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
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

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
      error: "Backend is ready, but no live API key is configured yet."
    };
  }

  try {
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
  } catch (error) {
    return {
      ok: false,
      error: `Request failed: ${error.message}`
    };
  }
}

function enforceTruthFormat(answer) {
  const lower = String(answer || "").toLowerCase();

  const required = [
    "ontological",
    "epistemic",
    "structural",
    "ethical",
    "classification"
  ];

  const missing = required.filter((k) => !lower.includes(k));

  const hasTruthDecision =
    lower.includes("final classification") &&
    (lower.includes("truth") || lower.includes("false"));

  if (missing.length >= 2 || !hasTruthDecision) {
    return `
Ontological Status:
Weak

Epistemic Status:
Insufficient evidence

Structural Consistency:
Weak

Ethical Impact:
Risk of confusion

Final Classification:
FALSE
`.trim();
  }

  return answer;
}

  const missing = required.filter((k) => !lower.includes(k));

  const hasTruthDecision =
  lower.includes("final classification") &&
  (lower.includes("truth") || lower.includes("false"));

if (missing.length >= 2 || !hasTruthDecision) {

    return `
Ontological Status:
Weak

Epistemic Status:
Insufficient evidence

Structural Consistency:
Weak

Ethical Impact:
Risk of confusion

Final Classification:
FALSE
`.trim();
  }

  return answer;
}

app.post("/api/ask", async (req, res) => {
  try {
    const question = String(req.body?.question || "").trim();

    if (!question) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    const { results, context } = buildRagContext(question, 8);

    if (!results.length) {
      return res.json({
        answer: detectTurkish(question)
          ? "İlgili knowledge bulunamadı. Önce bu konu knowledge tabanına eklenmeli."
          : "No relevant knowledge was found. Add this topic into the knowledge base first.",
        meta: {
          total: 0,
          chunks: []
        }
      });
    }

    const systemPrompt = buildAskSystemPrompt(question, context);
    const firstPass = await callOpenAI(systemPrompt, question, 0.35);

    if (!firstPass.ok) {
      return res.status(500).json({
        answer: firstPass.error
      });
    }

    let answer = firstPass.answer;

    if (isWeakSystemAnswer(question, answer)) {
      const repairPrompt = buildRepairSystemPrompt(question, context, answer);
      const repairPass = await callOpenAI(repairPrompt, question, 0.2);

      if (repairPass.ok && repairPass.answer) {
        answer = repairPass.answer;
      }
    }

    const finalAnswer = enforceTruthFormat(answer);

    return res.json({
      answer: finalAnswer,
      meta: {
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
  } catch (error) {
    return res.status(500).json({
      answer: `Server error: ${error.message}`
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

