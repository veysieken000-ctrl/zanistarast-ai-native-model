(() => {
  const chatThread = document.getElementById("chatThread");
  const questionInput = document.getElementById("questionInput");

  let typingTimer = null;

  function scrollToBottom() {
    if (!chatThread) return;
    chatThread.scrollTop = chatThread.scrollHeight;
  }

  function stopTyping() {
    if (typingTimer) {
      clearInterval(typingTimer);
      typingTimer = null;
    }
  }

  function createMessage(role, text = "") {
    if (!chatThread) return null;

    const msg = document.createElement("div");
    msg.className = `msg ${role}`;

    const bubble = document.createElement("div");
    bubble.className = "msg-bubble";
    bubble.textContent = text;

    msg.appendChild(bubble);
    chatThread.appendChild(msg);
    scrollToBottom();

    return bubble;
  }

  function appendUserMessage(text) {
    return createMessage("user", text || "");
  }
function processZanistarastAI(text) {

  if (!window.getZanistarastAnswer) {
    return "AI motor bulunamadı";
  }

  return window.getZanistarastAnswer(text);
}
 
  function appendAssistantMessage(text) {
    return createMessage("assistant", text || "");
  }

  function typeAssistantMessage(text, speed = 12) {
    stopTyping();

    const bubble = createMessage("assistant", "");
    if (!bubble) return;

    const fullText = String(text || "");
    let index = 0;

    bubble.classList.add("is-typing");

    typingTimer = setInterval(() => {
      bubble.textContent = fullText.slice(0, index + 1);
      index += 1;
      scrollToBottom();

      if (index >= fullText.length) {
        stopTyping();
        bubble.classList.remove("is-typing");
      }
    }, speed);
  }

  function clearAllOutputs() {
    stopTyping();

    if (chatThread) {
      chatThread.innerHTML = "";
    }

    if (questionInput) {
      questionInput.value = "";
    }
  }

  function getQuestion() {
    return questionInput ? questionInput.value.trim() : "";
  }

  function setQuestion(text) {
    if (questionInput) {
      questionInput.value = text || "";
    }
  }
document.getElementById("sendBtn")?.addEventListener("click", () => {
  const text = getQuestion();
  if (!text) return;

  appendUserMessage(text);

  try {
    const answer = processZanistarastAI(text);
    typeAssistantMessage(answer || "Cevap üretilemedi");
  } catch (e) {
    console.error(e);
    typeAssistantMessage("Sistem hatası oluştu");
  }
});
  
  window.UIRenderer = {
    appendUserMessage,
    appendAssistantMessage,
    typeAssistantMessage,
    clearAllOutputs,
    getQuestion,
    setQuestion,
    stopTyping
  };
})();
