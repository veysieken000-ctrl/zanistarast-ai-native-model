/**
 * Compatibility entry point for the Shared Mira Core prompt contract.
 *
 * Keep this module for callers that still import backend/prompt.js.
 * The epistemic rules themselves live in mira_core.js so prompt behavior
 * cannot drift from /api/ask, /api/interpret, and /api/evaluate.
 */
import { buildMiraPrompt, miraCoreRules, MIRA_CORE_VERSION } from "./mira_core.js";

export { buildMiraPrompt, miraCoreRules, MIRA_CORE_VERSION };

export const systemPrompt = buildMiraPrompt({
  mode: "answer",
  question: "Use the user's question.",
  ragContext: "Use retrieved context with its source status.",
  languageRule: "Respond in the user's language."
});
