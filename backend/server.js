import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { systemPrompt } from "./prompt.js";
import { splitTextIntoChunks, scoreSemanticMatch } from "./semantic.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =======================
// 📚 KNOWLEDGE LOAD
// =======================

const rawKnowledge = [
  {
    name: "hebun",
    text: fs.readFileSync(path.join(__dirname, "knowledge", "hebun.txt"), "utf-8")
  },
  {
    name: "zanabun",
    text: fs.readFileSync(path.join(__dirname, "knowledge", "zanabun.txt"), "utf-8")
  },
  {
    name: "mabun",
    text: fs.readFileSync(path.join(__dirname, "knowledge", "mabun.txt"), "utf-8")
  },
  {
    name: "rasterast",
    text: fs.readFileSync(path.join(__dirname, "knowledge", "rasterast.txt"), "utf-8")
  }
];

// 🔥 chunk'a çevir
const knowledge = rawKnowledge.flatMap(item => {
  const chunks = splitTextIntoChunks(item.text);

  return chunks.map(chunk => ({
    name: item.name,
    text: chunk
  }));
});

// =======================
// 🔍 SEARCH (YENİ)
// =======================

function simpleSearch(question) {
  const results = knowledge.map((item) => {
    const score = scoreSemanticMatch(question, item.text);

    return {
      name: item.name,
      score,
      text: item.text
    };
  });

  const ranked = results
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (!ranked.length) {
    return "";
  }

  // 🔥 EN İYİ 3 PARÇA
  const topChunks = ranked.slice(0, 3).map((item) => item.text);

  return topChunks.join("\n\n---\n\n");
}

// =======================
// 🚀 SERVER
// =======================

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

    if (
      !process.env.OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY === "your_api_key_here" ||
      process.env.OPENAI_API_KEY === "PASTE_YOUR_API_KEY_HERE"
    ) {
      return res.status(500).json({
        answer: "Backend is ready, but no live API key is configured yet."
      });
    }

    // 🔥 CONTEXT BURADA
    const context = simpleSearch(question);

    if (!context) {
      return res.json({
        answer: "Bu konu Zanistarast veri tabanında henüz tanımlı değil."
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `${systemPrompt}

Aşağıdaki bilgi dışında hiçbir şey kullanma.
Eğer cevap bu bilgi içinde yoksa:
"Bu konu zanistarast veri tabanında henüz tanımlı değil." de.

Bilgi:
${context}`
          },
          ...history,
          { role: "user", content: question }
        ],
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
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content
        : "No answer returned from API.";

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






