import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { buildRagContext } from "./rag_search.js";
import aiEngineRoutes from "./routes/ai_engine.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", aiEngineRoutes);

function detectTurkish(text) {
  const lower = String(text || "").toLowerCase();
  return /[çğıöşü]/.test(lower) ||
    /\b(nedir|neden|nasıl|ve|ile|göre|insan|medeniyet|ahlak|varlık|zaman)\b/.test(lower);
}

function buildAskSystemPrompt(question, ragContext) {
  const wantsTurkish = detectTurkish(question);

  return `
You are Zanistarast AI.

You must answer primarily from the retrieved knowledge.

RULES:
1. Use retrieved knowledge first.
2. Do not replace repository knowledge with generic explanations.
3. Keep answers structural and layered.
4. When relevant, think through:
   Physical -> Biological -> Mind -> Ethics -> Civilization
5. If the question is about Rabun / governance, include:
   - Hukum Meclisi
   - Ahlak Meclisi
   - Ekonomi Meclisi
6. If the question is about Hebun, include:
   - layered being
   - lower / upper layer relation
   - higher layer does not violate physical law
7. If the question is about Zanabun, include:
   - validation
   - knowledge / reality relation
   - cross-layer consistency
8. If the question is about Rasterast, include:
   - consistency filter
   - elimination logic
9. Do not answer in a shallow or generic way.

OUTPUT STRUCTURE:
- Katman / Boyut
- Mekanizma
- İlişki
- Yapısal Sonuç

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

  if (!a || a.length < 220) return true;

  const mustHaveGeneral = ["katman", "mekanizma", "ilişki", "sonuç"];
  const missingGeneral = mustHaveGeneral.filter((x) => !a.includes(x));
  if (missingGeneral.length >= 2) return true;

  if (q.includes("rabun") || q.includes("rabûn") || q.includes("yönetim") || q.includes("governance")) {
    const mustHave = ["hüküm", "ahlak", "ekonomi"];
    if (mustHave.some((x) => !a.includes(x))) return true;
  }

  if (q.includes("hebun") || q.includes("hebûn")) {
    const mustHave = ["katman", "varlık", "fizik"];
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
8. Do not be vague.
9. Do not repeat empty slogans.
10. Make the answer feel like a real structural explanation.

LANGUAGE:
${wantsTurkish ? "Write fully in Turkish." : "Write fully in English."}

QUESTION:
${question}

RETRIEVED KNOWLEDGE:
${ragContext || "No retrieved context found."}

WEAK FIRST ANSWER:
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
        rag: {
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
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

