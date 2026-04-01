import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.get("/build-chunks", (req, res) => {
  exec("python backend/scripts/01_build_chunks.py", (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        success: false,
        error: stderr || error.message
      });
    }

    res.json({
      success: true,
      output: stdout
    });
  });
});

export default router;
