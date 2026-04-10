(() => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const sendBtn = document.getElementById("sendBtn");
  const speakBtn = document.getElementById("speakBtn");
  const clearBtn = document.getElementById("clearBtn");
  const questionInput = document.getElementById("questionInput");
  const languageSelect = document.getElementById("languageSelect");

  function getPack() {
    if (window.UII18n && typeof window.UII18n.getPack === "function") {
      const lang = languageSelect ? languageSelect.value : "en-US";
      return window.UII18n.getPack(lang);
    }

    return {
      empty: "Question is empty"
    };
  }

  function safeSetSystemStatus(text) {
    if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
      window.UIStatus.setSystemStatus(text);
    }
  }

  async function handleSend() {
    if (!window.UIRenderer || !window.AIRequest || !window.AIResponse) return;

    const question = window.UIRenderer.getQuestion();
    const pack = getPack();

    if (!question || !question.trim()) {
      safeSetSystemStatus(pack.empty);
      return;
    }

    if (typeof window.UIRenderer.appendUserMessage === "function") {
      window.UIRenderer.appendUserMessage(question);
    }

    window.UIRenderer.setQuestion("");
    safeSetSystemStatus(pack.thinking || "Thinking");

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

    const pack = getPack();
    safeSetSystemStatus(pack.done || "Done");
  }

  function handleSpeak() {
    if (window.SpeechOutput && typeof window.SpeechOutput.speakAnswer === "function") {
      window.SpeechOutput.speakAnswer();
    }
  }

  function handleClear() {
    if (questionInput) {
      questionInput.value = "";
    }

    if (window.UIRenderer && typeof window.UIRenderer.clearAllOutputs === "function") {
      window.UIRenderer.clearAllOutputs();
    }

    if (window.SpeechOutput && typeof window.SpeechOutput.stopSpeaking === "function") {
      window.SpeechOutput.stopSpeaking();
    }

    if (window.SpeechInput && typeof window.SpeechInput.resetInputSpeech === "function") {
      window.SpeechInput.resetInputSpeech();
    }

    const pack = getPack();

    if (window.UIStatus) {
      if (typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus(pack.ready || "Ready");
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

      if (typeof window.UIStatus.setListeningLabel === "function") {
        window.UIStatus.setListeningLabel(pack.listeningLabel || "Listening Language");
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
        event.preventDefault();
        handleSend();
      }
    });
  }

  if (languageSelect) {
    if (window.UII18n && typeof window.UII18n.applyLanguage === "function") {
      window.UII18n.applyLanguage(languageSelect.value);
    }

    if (window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
      window.UIStatus.setLangStatus(languageSelect.value);
    }

    languageSelect.addEventListener("change", () => {
      const selected = languageSelect.value;

      if (window.UII18n && typeof window.UII18n.applyLanguage === "function") {
        window.UII18n.applyLanguage(selected);
      }

      if (window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
        window.UIStatus.setLangStatus(selected);
      }
    });
  }

  window.UIBindings = {
    handleStart,
    handleStop,
    handleSend,
    handleSpeak,
    handleClear
  };
})();
 
