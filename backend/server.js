const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { systemPrompt } = require("./prompt");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Zanistarast backend is running."
  });
});

app.post("/api/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!question || !question.trim()) {
      return res.status(400).json({
        answer: "Please enter a question."
      });
    }

    return res.json({
      answer: "Backend is ready. Live AI connection will be added in the next step.",
      system: systemPrompt
    });
  } catch (error) {
    return res.status(500).json({
      answer: "Server error. Please try again later."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
