(() => {
  const questionEl = document.getElementById("questionInput");
  const answerEl = document.getElementById("answerOutput");
  const classificationEl = document.getElementById("classificationBox");
  const metaEl = document.getElementById("metaOutput");

  function getQuestion() {
    if (!questionEl) return "";
    return questionEl.value.trim();
  }

  function setQuestion(text) {
    if (!questionEl) return;
    questionEl.value = text || "";
  }

  function setAnswer(text) {
    if (!answerEl) return;
    answerEl.textContent = text || "No answer yet.";
  }

  function setClassification(text) {
    if (!classificationEl) return;
    classificationEl.textContent = "Classification: " + (text || "None");
  }

  function setMeta(value) {
    if (!metaEl) return;

    if (!value) {
      metaEl.textContent = "No source metadata yet.";
      return;
    }

    if (typeof value === "string") {
      metaEl.textContent = value;
      return;
    }

    try {
      metaEl.textContent = JSON.stringify(value, null, 2);
    } catch {
      metaEl.textContent = "Metadata available.";
    }
  }

  function clearAllOutputs() {
    setQuestion("");
    setAnswer("No answer yet.");
    setClassification(null);
    setMeta(null);
  }

  window.UIRenderer = {
    getQuestion,
    setQuestion,
    setAnswer,
    setClassification,
    setMeta,
    clearAllOutputs
  };
})();
