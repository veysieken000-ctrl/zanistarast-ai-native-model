import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Zanistarast AI backend is running 🚀");
});

app.post("/ask", (req, res) => {
  const { prompt } = req.body;

  res.json({
    answer: `Zanistarast AI response to: ${prompt}`
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
