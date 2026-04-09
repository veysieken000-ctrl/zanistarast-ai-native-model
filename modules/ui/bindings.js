(() => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const sendBtn = document.getElementById("sendBtn");
  const speakBtn = document.getElementById("speakBtn");
  const clearBtn = document.getElementById("clearBtn");
  const questionInput = document.getElementById("questionInput");
  const languageSelect = document.getElementById("languageSelect");

  function safeSetSystemStatus(text) {
    if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
      window.UIStatus.setSystemStatus(text);
    }
  }

  async function handleSend() {
    if (!window.UIRenderer || !window.AIRequest || !window.AIResponse) return;

    const question = window.UIRenderer.getQuestion();

    if (!question) {
      safeSetSystemStatus("Question is empty");
      return;
    }

    safeSetSystemStatus("Thinking...");

    try {
      const data = await window.AIRequest.askQuestion(question);
      window.AIResponse.applyResponse(data);
    } catch (error) {
      window.AIResponse.applyError(error);
    }
  }

  function handleStart() {
    if (window.SpeechInput && typeof window.SpeechInput.startListening === "function") {
      window.SpeechInput.startListening();
    }
  }

  function handleStop() {
    if (window.SpeechInput && typeof window.SpeechInput.stopListening === "function") {
      window.SpeechInput.stopListening();
    }

    if (window.SpeechOutput && typeof window.SpeechOutput.stopSpeaking === "function") {
      window.SpeechOutput.stopSpeaking();
    }
  }

  function handleSpeak() {
    if (window.SpeechOutput && typeof window.SpeechOutput.speakAnswer === "function") {
      window.SpeechOutput.speakAnswer();
    }
  }

  function handleClear() {
    if (window.SpeechInput && typeof window.SpeechInput.resetInputSpeech === "function") {
      window.SpeechInput.resetInputSpeech();
    }

    if (window.SpeechOutput && typeof window.SpeechOutput.stopSpeaking === "function") {
      window.SpeechOutput.stopSpeaking();
    }

    if (window.UIRenderer && typeof window.UIRenderer.clearAllOutputs === "function") {
      window.UIRenderer.clearAllOutputs();
    }

    if (window.UIStatus) {
      if (typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus("Cleared");
      }

      if (typeof window.UIStatus.setModeStatus === "function") {
        window.UIStatus.setModeStatus("manual");
      }

      if (typeof window.UIStatus.setMicStatus === "function") {
        window.UIStatus.setMicStatus(false);
      }

      if (typeof window.UIStatus.setLangStatus === "function") {
        const selected = languageSelect ? languageSelect.value : "en-US";
        window.UIStatus.setLangStatus(selected);
      }
    }
  }

  if (startBtn) startBtn.addEventListener("click", handleStart);
  if (stopBtn) stopBtn.addEventListener("click", handleStop);
  if (sendBtn) sendBtn.addEventListener("click", handleSend);
  if (speakBtn) speakBtn.addEventListener("click", handleSpeak);
  if (clearBtn) clearBtn.addEventListener("click", handleClear);

  if (questionInput) {
    questionInput.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        handleSend();
      }
    });
  }

  if (languageSelect && window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
    window.UIStatus.setLangStatus(languageSelect.value);
  }

  window.UIBindings = {
    handleStart,
    handleStop,
    handleSend,
    handleSpeak,
    handleClear
  };
})();

