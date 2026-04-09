(() => {
  const questionEl = document.getElementById("questionInput");
  const answerEl = document.getElementById("answerOutput");
  const classificationEl = document.getElementById("classificationBox");
  const metaEl = document.getElementById("metaOutput");
  const chatThreadEl = document.getElementById("chatThread");

  function getQuestion() {
    if (!questionEl) return "";
    return questionEl.value.trim();
  }

  function setQuestion(text) {
    if (!questionEl) return;
    questionEl.value = text || "";
  }

  function ensureChatThread() {
    return chatThreadEl || null;
  }

  function scrollChatToBottom() {
    const chat = ensureChatThread();
    if (!chat) return;
    chat.scrollTop = chat.scrollHeight;
  }

  function createMessage(role, text) {
    const div = document.createElement("div");
    div.className = `msg ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text || "";

    div.appendChild(bubble);
    return div;
  }

  function appendUserMessage(text) {
    const chat = ensureChatThread();
    if (!chat || !text) return;

    chat.appendChild(createMessage("user", text));
    scrollChatToBottom();
  }

  function appendAssistantMessage(text) {
    const chat = ensureChatThread();
    if (!chat) return;

    chat.appendChild(createMessage("assistant", text || "No answer yet."));
    scrollChatToBottom();
  }

  function clearChatThread() {
    const chat = ensureChatThread();
    if (!chat) return;
    chat.innerHTML = "";
  }

  function setAnswer(text) {
    const finalText = text || "No answer yet.";

    if (answerEl) {
      answerEl.textContent = finalText;
    }

    appendAssistantMessage(finalText);
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
    if (answerEl) answerEl.textContent = "No answer yet.";
    setClassification(null);
    setMeta(null);
    clearChatThread();
  }

  window.UIRenderer = {
    getQuestion,
    setQuestion,
    setAnswer,
    setClassification,
    setMeta,
    clearAllOutputs,
    appendUserMessage,
    appendAssistantMessage,
    clearChatThread
  };
})();

