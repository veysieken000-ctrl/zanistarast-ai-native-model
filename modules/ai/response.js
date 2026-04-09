(() => {
  function applyResponse(data) {
    if (!window.UIRenderer) return;

    const answer = data && data.answer ? data.answer : "No answer";
    const classification = data && data.classification ? data.classification : null;
    const meta = data && data.meta ? data.meta : null;

    window.UIRenderer.setAnswer(answer);
    window.UIRenderer.setClassification(classification);
    window.UIRenderer.setMeta(meta);

    if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
      window.UIStatus.setSystemStatus("Done");
    }

    if (window.UIStatus && typeof window.UIStatus.setModeStatus === "function") {
      window.UIStatus.setModeStatus("manual");
    }
  }

  function applyError(error) {
    if (window.UIRenderer) {
      window.UIRenderer.setAnswer("Server error.");
      window.UIRenderer.setClassification(null);
      window.UIRenderer.setMeta(null);
    }

    if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
      const message =
        error && error.message ? error.message : "Unknown error";
      window.UIStatus.setSystemStatus("Error: " + message);
    }

    if (window.UIStatus && typeof window.UIStatus.setModeStatus === "function") {
      window.UIStatus.setModeStatus("manual");
    }
  }

  window.AIResponse = {
    applyResponse,
    applyError
  };
})();

