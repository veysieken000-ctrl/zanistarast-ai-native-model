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

1. Ontological status
- Is the claim possible?
- Does it contradict the basic structure of reality or existence?

2. Epistemic status
- Is there evidence for it?
- Or is it only interpretation, speculation, or belief?

3. Structural consistency
- Is the claim internally consistent?
- Do the conclusions follow logically from the premises?

4. Ethical outcome
- Could it cause harm?
- Does it contain manipulation, deception, or abuse of power?

5. Final classification
- close to truth
- mixed / uncertain
- close to falsehood

Keep the response short, clear, and direct.
`;
}

function buildAskSystemPrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);
  const truthAnalysisPrompt = buildTruthAnalysisPrompt();

 const truthAnalysisPrompt = buildTruthAnalysisPrompt();

return `
You are Zanistarast AI — a structural truth analysis system.

Your role is NOT to give generic explanations.

Your role is to ANALYZE the user's claim and determine its relation to truth.

${truthAnalysisPrompt}

CORE ANALYSIS FRAME:

1. Ontological Status
- Is the claim possible within the structure of reality?
- Does it violate physical or existential constraints?

2. Epistemic Status
- Is the claim supported by evidence?
- Or is it interpretation, belief, or speculation?

3. Structural Consistency
- Is the claim internally consistent?
- Do conclusions follow from premises?

4. Ethical Impact
- Does the claim produce clarity or confusion?
- Could it mislead or manipulate?

FINAL CLASSIFICATION (MANDATORY):
- "Closer to Truth"
- "Mixed / Uncertain"
- "Closer to Falsehood"

RULES:

1. Never give shallow answers.
2. Do not write long essays.
3. Do not repeat generic knowledge.
4. Always follow the structure strictly.
5. Be decisive in classification.

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
...

LANGUAGE:
${detectTurkish(question) ? "Write fully in Turkish." : "Write fully in English."}

RETRIEVED KNOWLEDGE:
${reqContext || "No retrieved context found."}
`.trim();


function normalizeText(value) {
  return String(value || "").toLowerCase();
}

function isWeakSystemAnswer(question, answer) {
  const q = normalizeText(question);
  const a = normalizeText(answer);

  if (!a || a.length < 230) return true;

  const mustHaveGeneral = ["katman", "mekanizma", "ilişki", "sonuç"];
  const missingGeneral = mustHaveGeneral.filter((x) => !a.includes(x));
  if (missingGeneral.length >= 2) return true;

  if (
    q.includes("rabun") ||
    q.includes("rabûn") ||
    q.includes("yönetim") ||
    q.includes("governance")
  ) {
    const mustHave = ["hüküm", "ahlak", "ekonomi"];
    if (mustHave.some((x) => !a.includes(x))) return true;
  }

  if (q.includes("hebun") || q.includes("hebûn")) {
    const mustHave = ["katman", "varlık", "fizik"];
    if (mustHave.some((x) => !a.includes(x))) return true;
  }

  if (q.includes("zanabun") || q.includes("zanabûn")) {
    const mustHave = ["doğrul", "bilgi", "gerçek"];
    if (mustHave.some((x) => !a.includes(x))) return true;
  }

  if (q.includes("rasterast")) {
    const mustHave = ["tutarl", "eleme"];
    if (mustHave.some((x) => !a.includes(x))) return true;
  }

  if (
    q.includes("fizik") ||
    q.includes("biyoloji") ||
    q.includes("zihin") ||
    q.includes("science") ||
    q.includes("bilim")
  ) {
    const mustHaveAny = [
      "proton",
      "nötron",
      "neutron",
      "elektron",
      "electron",
      "hücre",
      "cell",
      "zihin",
      "mind"
    ];
    const foundCount = mustHaveAny.filter((x) => a.includes(x)).length;
    if (foundCount < 3) return true;
  }

  if (
    q.includes("iddia") ||
    q.includes("claim") ||
    q.includes("hak") ||
    q.includes("batıl") ||
    q.includes("truth") ||
    q.includes("falsehood") ||
    q.includes("doğru") ||
    q.includes("yanlış")
  ) {
    const mustHave = [
      "ontolojik",
      "epistemik",
      "tutarl",
      "etik"
    ];
    const foundCount = mustHave.filter((x) => a.includes(x)).length;
    if (foundCount < 3) return true;
  }

  return false;
}

function buildRepairSystemPrompt(question, ragContext, firstAnswer) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI.

Your first answer was too weak, too generic, or structurally incomplete.

Rewrite it as a stronger SYSTEMIC answer.

MANDATORY REWRITE RULES:
1. Keep the answer grounded in the retrieved knowledge.
2. Remove generic phrasing.
3. Explicitly show system structure.
4. Use these sections clearly:
   - Katman / Boyut
   - Mekanizma
   - İlişki
   - Yapısal Sonuç
5. If the question is about Rabun / Rabûn, explicitly include:
   - Hüküm Meclisi
   - Ahlak Meclisi
   - Ekonomi Meclisi
6. If the question is about Hebun / Hebûn, explicitly include:
   - layered being
   - physical law is not violated
   - upper layer includes lower layer
7. If the question is about science / physics / biology / mind, explicitly include:
   - proton / neutron / electron / energy
   - cell / organism / biological order
   - perception / memory / judgement / meaning
   - transition logic between layers
8. If the question is claim-based, explicitly include:
   - Ontolojik Durum
   - Epistemik Durum
   - Yapısal Tutarlılık
   - Etik Sonuç
   - Nihai Sınıflandırma
9. Do not be vague.
10. Do not repeat empty slogans.
11. Make the answer feel like a real structural explanation.
12. If certainty is limited, state the limitation clearly.
13. Distinguish evidence, interpretation, and inference.

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

    return res.json({
      answer,
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
  } catch (_error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

