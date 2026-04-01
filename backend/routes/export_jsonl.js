import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.get("/export-jsonl", (_req, res) => {
  exec("python backend/scripts/02_export_jsonl.py", (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: stderr || error.message
      });
    }

    return res.json({
      success: true,
      output: stdout
    });
  });
});

export default router;
