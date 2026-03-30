import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { systemPrompt } from "./prompt.js";
import { splitTextIntoChunks } from "./semantic.js";
import { getEmbedding, cosineSimilarity } from "./embedding.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// =======================
// KNOWLEDGE FILES
// =======================

const rawKnowledge = [
  {
    name: "hebun",
    aliases: [
      "hebun",
      "hebûn",
      "being",
      "ontology",
      "ontological",
      "varlık",
      "ontoloji",
      "gerçeklik zemini"
    ],
    text: fs.readFileSync(path.join(__dirname, "knowledge", "hebun.txt"), "utf-8")
  },
  {
    name: "zanabun",
    aliases: [
      "zanabun",
      "zanabûn",
      "knowledge",
      "epistemology",
      "epistemological",
      "bilgi",
      "epistemoloji",
      "doğrulama"
    ],
    text: fs.readFileSync(path.join(__dirname, "knowledge", "zanabun.txt"), "utf-8")
  },
  {
    name: "mabun",
    aliases: [
      "mabun",
      "mabûn",
      "economy",
      "value",
      "capitalism",
      "kapitalizm",
      "ekonomi",
      "değer"
    ],
    text: fs.readFileSync(path.join(__dirname, "knowledge", "mabun.txt"), "utf-8")
  },
  {
    name: "rasterast",
    aliases: [
      "rasterast",
      "method",
      "validation",
      "consistency",
      "yöntem",
      "metodoloji",
      "doğrulama",
      "tutarlılık"
    ],
    text: fs.readFileSync(path.join(__dirname, "knowledge", "rasterast.txt"), "utf-8")
  },
  {
    name: "zanistarast",
    aliases: [
      "zanistarast",
      "civilization",
      "medeniyet",
      "uygarlık",
      "newroza kawa",
      "newroza-kawa",
      "scientific synthesis",
      "bilimsel sentez"
    ],
    text: fs.readFileSync(path.join(__dirname, "knowledge", "zanistarast.txt"), "utf-8")
  }
];

// =======================
// CHUNKING
// =======================

const knowledge = rawKnowledge.flatMap((item) => {
  const chunks = splitTextIntoChunks(item.text);

  return chunks.map((chunk) => ({
    name: item.name,
    aliases: item.aliases,
    text: chunk
  }));
});

// =======================
// EMBEDDINGS
// =======================

let embeddedKnowledge = [];

async function buildKnowledgeEmbeddings() {
  const items = [];

  for (const item of knowledge) {
    const embedding = await getEmbedding(item.text);

    items.push({
      ...item,
      embedding
    });
  }

  embeddedKnowledge = items;
}

// =======================
// RETRIEVAL
// =======================

async function retrieveContext(question) {
  if (!embeddedKnowledge.length) {
    return "";
  }

  const lowerQuestion = question.toLowerCase();

  // 1) Strong alias match first
  const aliasMatches = embeddedKnowledge.filter((item) =>
    item.aliases.some((alias) => lowerQuestion.includes(alias))
  );

  if (aliasMatches.length) {
    return aliasMatches
      .slice(0, 3)
      .map((item) => item.text)
      .join("\n\n---\n\n");
  }

  // 2) Vector similarity fallback
  const questionEmbedding = await getEmbedding(question);

  const ranked = embeddedKnowledge
    .map((item) => ({
      ...item,
      score: cosineSimilarity(questionEmbedding, item.embedding)
    }))
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return "";
  }

  const bestScore = ranked[0].score;

  // reject weak matches
  if (bestScore < 0.2) {
    return "";
  }

  return ranked
    .slice(0, 3)
    .map((item) => item.text)
    .join("\n\n---\n\n");
}

// =======================
// ROUTES
// =======================

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "zanistarast backend is running"
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body.question;
    const history = Array.isArray(req.body.history) ? req.body.history : [];

    if (!question || !question.trim()) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        answer: "Backend is ready, but no live API key is configured yet."
      });
    }

    const context = await retrieveContext(question);

    if (!context) {
      return res.json({
        answer: "This concept is not yet defined in the Zanistarast knowledge base."
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${systemPrompt}

Use only the knowledge provided below.
Do not invent external definitions.
If the answer is not supported by the provided context, say:
"This concept is not yet defined in the Zanistarast knowledge base."

Knowledge:
${context}`
          },
          ...history,
          { role: "user", content: question }
        ],
        temperature: 0.6
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
      data.choices?.[0]?.message?.content || "No answer returned from API.";

    return res.json({ answer });
  } catch (error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

// =======================
// STARTUP
// =======================

buildKnowledgeEmbeddings()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to build knowledge embeddings:", error);
  });

