import express from "express";
import { buildRagContext } from "../rag_search.js";

const router = express.Router();

router.get("/rag-search", (req, res) => {
  try {
    const q = req.query.q || "";

    if (!q.trim()) {
      return res.status(400).json({
        success: false,
        error: "Missing query parameter: q"
      });
    }

    const { results, context } = buildRagContext(q, 5);

    return res.json({
      success: true,
      total: results.length,
      results,
      context
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
