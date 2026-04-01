import express from "express";
import { getProcessedKnowledgeInfo } from "../rag_loader.js";

const router = express.Router();

router.get("/rag-info", (_req, res) => {
  try {
    const info = getProcessedKnowledgeInfo();

    return res.json({
      success: true,
      ...info
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
