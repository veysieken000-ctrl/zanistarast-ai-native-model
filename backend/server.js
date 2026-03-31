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
  const filePath = path.join(KNOWLEDGE_DIR, filename);
  return fs.readFileSync(filePath, "utf-8");
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

const coreSystem = knowledge.find((item) => item.name === "00_core_system")?.text || "";

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter(Boolean);
}

function scoreMatch(question, docName, docText) {
  const qTokens = tokenize(question);
  const nameTokens = tokenize(docName);
  const textTokens = tokenize(docText).slice(0, 1200);

  let score = 0;

  for (const token of qTokens) {
    if (nameTokens.includes(token)) score += 8;
    if (textTokens.includes(token)) score += 2;
  }

  const q = normalizeText(question);

  if (q.includes("hebun") && docName.includes("hebun")) score += 20;
  if (q.includes("zanabun") && docName.includes("zanabun")) score += 20;
  if (q.includes("mabun") && docName.includes("mabun")) score += 20;
  if (q.includes("rasterast") && docName.includes("rasterast")) score += 20;
  if (q.includes("rabun") && docName.includes("rabun")) score += 20;
  if (q.includes("newroza") && docName.includes("newroza")) score += 20;
  if ((q.includes("fitrat") || q.includes("ahlak")) && docName.includes("fitrat")) score += 20;
  if ((q.includes("varlik") || q.includes("existence")) && docName.includes("varlik")) score += 12;
  if ((q.includes("tarih") || q.includes("history")) && docName.includes("tarih")) score += 12;
  if ((q.includes("gerceklik") || q.includes("reality")) && docName.includes("gerceklik")) score += 12;
  if ((q.includes("medeniyet") || q.includes("civilization")) && docName.includes("medeniyet")) score += 12;
  if ((q.includes("zanistarast") || q.includes("scientific synthesis")) && docName.includes("zanistarast")) score += 20;

  return score;
}

function getTopKnowledge(question, limit = 4) {
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
  const topDocs = getTopKnowledge(question, 4);

  const relevantDocs = topDocs.filter((doc) => doc.score > 0);

  const combined = relevantDocs
    .map(
      (doc) => `### SOURCE: ${doc.name}\n${doc.text}`
    )
    .join("\n\n");

  return {
    topDocs,
    context: combined
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

  const lines = lastAssistant.content.split("\n").map((l) => l.trim()).filter(Boolean);
  const possibleFollowup =
    lines.find((line) => line.toLowerCase().includes("explain")) ||
    lines.find((line) => line.toLowerCase().includes("compare")) ||
    lines.find((line) => line.toLowerCase().includes("deep")) ||
    lines[lines.length - 1];

  return possibleFollowup || input;
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

    const articleSystem =
      knowledge.find((item) => item.name === "_article_system")?.text || "";

    const messages = [
      {
        role: "system",
        content: `
You are Zanistarast AI.

Always think and answer through this mandatory framework first:

${coreSystem}

Use the following article generation rules when the user asks for deep explanation, comparison, or analysis:

${articleSystem}

Now use the following retrieved knowledge as the primary content base:

${finalContext}

MANDATORY RULES:
1. Always answer through Hebun, Zanabun, Mabun, and Rasterast if relevant.
2. Prefer the closest matching knowledge files.
3. If the exact concept is not found, answer from the nearest relevant Zanistarast concept instead of saying it is undefined.
4. Only say "This concept is not yet sufficiently defined in the current Zanistarast knowledge base." if there is truly no relevant match.
5. Be structurally clear, not shallow.
6. If the user asks in Turkish, answer in Turkish. If English, answer in English.
7. If the user asks a simple question, give a concise structured answer.
8. If the user asks for detail, comparison, or theory, give a deeper article-style answer.
9. End with 2–3 natural follow-up suggestions written as plain lines, not bullets, only when relevant.
        `.trim()
      },
      ...history.slice(-6),
      {
        role: "user",
        content: question
      }
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7
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
  } catch (error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

