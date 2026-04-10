(() => {
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const sendBtn = document.getElementById("sendBtn");
  const speakBtn = document.getElementById("speakBtn");
  const clearBtn = document.getElementById("clearBtn");
  const questionInput = document.getElementById("questionInput");
  const languageSelect = document.getElementById("languageSelect");
  
  function getThinkingText() {
  const lang = document.getElementById("languageSelect")?.value;

  if (lang === "tr-TR") return "Düşünüyorum...";
  if (lang === "en-US") return "Thinking...";
  if (lang === "ar-SA") return "جاري التفكير...";
  if (lang === "ku-TR") return "Ez difikirim...";

  return "Thinking...";
}
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

    if (typeof window.UIRenderer.appendUserMessage === "function") {
      window.UIRenderer.appendUserMessage(question);
    }

    window.UIRenderer.setQuestion("");

    safeSetSystemStatus("Düşünüyorum...");

    if (window.UIStatus && typeof window.UIStatus.setModeStatus === "function") {
      window.UIStatus.setModeStatus("manual");
    }

    try {
      const data = await window.AIRequest.askQuestion(question);

      if (window.AIResponse && typeof window.AIResponse.applyResponse === "function") {
        window.AIResponse.applyResponse(data);
      } else if (typeof window.UIRenderer.appendAssistantMessage === "function") {
        const answer = data && data.answer ? data.answer : "No answer";
        window.UIRenderer.appendAssistantMessage(answer);
        safeSetSystemStatus("Done");
      }
    } catch (error) {
      console.error(error);

      if (window.AIResponse && typeof window.AIResponse.applyError === "function") {
        window.AIResponse.applyError(error);
      } else if (typeof window.UIRenderer.appendAssistantMessage === "function") {
        window.UIRenderer.appendAssistantMessage("Error");
      }

      safeSetSystemStatus("Error");
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

  if (languageSelect) {
  if (window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
    window.UIStatus.setLangStatus(languageSelect.value);
  }

  languageSelect.addEventListener("change", () => {
    if (window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
      window.UIStatus.setLangStatus(languageSelect.value);
    }

    updateListeningLabel();
  });
}

updateListeningLabel(); 
  }
  function updateListeningLabel() {
  const el = document.getElementById("listeningLabel");
  const lang = document.getElementById("languageSelect")?.value;

  if (!el) return;

  if (lang === "tr-TR") el.textContent = "Dinleme Dili";
  else if (lang === "en-US") el.textContent = "Listening Language";
  else if (lang === "ar-SA") el.textContent = "لغة الاستماع";
  else if (lang === "ku-TR") el.textContent = "Zimanê Guhdarî";
  else el.textContent = "Listening Language";
}

  window.UIBindings = {
    handleStart,
    handleStop,
    handleSend,
    handleSpeak,
    handleClear
  };
})();
function updateListeningLabel() {
  const el = document.getElementById("listeningLabel");
  const lang = document.getElementById("languageSelect")?.value;

  if (!el) return;

  if (lang === "tr-TR") el.textContent = "Dinleme Dili";
  else if (lang === "en-US") el.textContent = "Listening Language";
  else if (lang === "ar-SA") el.textContent = "لغة الاستماع";
  else el.textContent = "Listening Language";
}

if (languageSelect) {
  languageSelect.addEventListener("change", updateListeningLabel);
}

updateListeningLabel();

