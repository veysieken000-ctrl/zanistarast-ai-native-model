import dotenv from "dotenv";
import express from "express";
import cors from "cors";
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

const KNOWLEDGE_DIR = path.join(__dirname, "knowledge");

function readTextFile(filename) {
  return fs.readFileSync(path.join(KNOWLEDGE_DIR, filename), "utf-8");
}

function loadKnowledge() {
  const files = fs
    .readdirSync(KNOWLEDGE_DIR)
    .filter((file) => file.endsWith(".txt"));

  return files.map((file) => ({
    name: file.replace(".txt", ""),
    text: readTextFile(file)
  }));
}

const knowledge = loadKnowledge();

const coreSystem =
  knowledge.find((item) => item.name === "00_core_system")?.text || "";

const articleSystem =
  knowledge.find((item) => item.name === "_article_system")?.text || "";

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text).split(" ").filter(Boolean);
}

function scoreMatch(question, docName, docText) {
  const q = normalizeText(question);
  const qTokens = tokenize(question);
  const nameTokens = tokenize(docName);
  const textTokens = tokenize(docText).slice(0, 1500);

  let score = 0;

  for (const token of qTokens) {
    if (nameTokens.includes(token)) score += 10;
    if (textTokens.includes(token)) score += 2;
  }

  if (q.includes("hebun") && docName.includes("hebun")) score += 30;
  if (q.includes("zanabun") && docName.includes("zanabun")) score += 30;
  if (q.includes("mabun") && docName.includes("mabun")) score += 30;
  if (q.includes("rasterast") && docName.includes("rasterast")) score += 30;
  if (q.includes("rabun") && docName.includes("rabun")) score += 30;
  if (q.includes("newroza") && docName.includes("newroza")) score += 30;
  if (q.includes("zanistarast") && docName.includes("zanistarast")) score += 30;
  if ((q.includes("fitrat") || q.includes("ahlak") || q.includes("ethics")) && docName.includes("fitrat")) score += 24;
  if ((q.includes("varlik") || q.includes("existence")) && docName.includes("varlik")) score += 24;
  if ((q.includes("tarih") || q.includes("history")) && docName.includes("tarih")) score += 18;
  if ((q.includes("medeniyet") || q.includes("civilization")) && docName.includes("medeniyet")) score += 20;
  if ((q.includes("gerceklik") || q.includes("reality")) && docName.includes("gerceklik")) score += 20;
  if ((q.includes("su") || q.includes("water")) && docName === "su") score += 18;
  if ((q.includes("felsefe") || q.includes("philosophy")) && docName.includes("felsefe")) score += 18;
  if ((q.includes("zaman") || q.includes("time")) && docName.includes("zaman")) score += 18;
  if ((q.includes("matematik") || q.includes("formula")) && docName.includes("matematik")) score += 18;
  if ((q.includes("jeoloji") || q.includes("geology")) && docName.includes("jeoloji")) score += 18;

  return score;
}

function getTopKnowledge(question, limit = 5) {
  return knowledge
    .filter((item) => item.name !== "00_core_system" && item.name !== "_article_system")
    .map((item) => ({
      ...item,
      score: scoreMatch(question, item.name, item.text)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function buildContext(question) {
  const topDocs = getTopKnowledge(question, 5);
  const relevantDocs = topDocs.filter((doc) => doc.score > 0);

  const context = relevantDocs
    .map((doc) => `### SOURCE: ${doc.name}\n${doc.text}`)
    .join("\n\n");

  return {
    topDocs,
    context
  };
}

function normalizeContinuation(input, history) {
  const raw = String(input || "").trim().toLowerCase();

  const continuationWords = [
    "evet",
    "başla",
    "basla",
    "devam",
    "devam et",
    "tamam",
    "olur",
    "aç",
    "ac",
    "yes",
    "start",
    "continue",
    "ok",
    "go on"
  ];

  if (!continuationWords.includes(raw)) {
    return input;
  }

  const lastAssistant = [...history].reverse().find((item) => item.role === "assistant");
  if (!lastAssistant?.content) {
    return input;
  }

  const lines = lastAssistant.content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const candidate =
    lines.find((line) => /explain|compare|deepen|clarify/i.test(line)) ||
    lines[lines.length - 1];

  return candidate || input;
}

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "zanistarast backend is running"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const incomingQuestion = req.body?.question || "";
    const history = Array.isArray(req.body?.history) ? req.body.history : [];

    const question = normalizeContinuation(incomingQuestion, history);

    if (!question || !question.trim()) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your_api_key_here" ||
      process.env.OPENAI_API_KEY === "PASTE_YOUR_API_KEY_HERE"
    ) {
      return res.status(500).json({
        answer: "Backend is ready, but no live API key is configured yet."
      });
    }

    const { topDocs, context } = buildContext(question);

    const fallbackContext = topDocs
      .map((doc) => `### SOURCE: ${doc.name}\n${doc.text}`)
      .join("\n\n");

    const finalContext = context || fallbackContext;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `
You are Zanistarast AI.

Always use this mandatory core framework first:

${coreSystem}

Use these article rules when the user asks for deep explanation, theory, analysis, or comparison:

${articleSystem}

Use the retrieved knowledge below as your main knowledge base:

${finalContext}

MANDATORY RULES:
1. Always think structurally, not narratively.
2. Use Hebun, Zanabun, Mabun, and Rasterast whenever relevant.
3. Prefer the closest matching knowledge files.
4. If the exact concept is not found, answer from the nearest relevant Zanistarast concept instead of saying it is undefined.
5. Only say "This concept is not yet sufficiently defined in the current Zanistarast knowledge base." if there is truly no relevant match.
6. If the user asks in Turkish, answer in Turkish. If the user asks in English, answer in English.
7. For simple questions, give a concise but structured answer.
8. For deep questions, comparisons, or theoretical prompts, give a fuller article-style answer.
9. When relevant, end with 2 or 3 short natural follow-up suggestions as plain lines, not bullets.
            `.trim()
          },
          ...history.slice(-6),
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({
        answer: `API error: ${errorText}`
      });
    }

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content ||
      "No answer returned from API.";

    return res.json({ answer });
  } catch (_error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

