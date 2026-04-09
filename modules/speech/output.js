(() => {
  function getLanguage() {
    const languageSelect = document.getElementById("languageSelect");
    return languageSelect ? languageSelect.value : "en-US";
  }

  function getLatestAssistantMessage() {
    const messages = document.querySelectorAll("#chatThread .msg.assistant .msg-bubble");
    if (!messages.length) return "";

    const lastMessage = messages[messages.length - 1];
    return lastMessage ? lastMessage.textContent.trim() : "";
  }

  function speakAnswer() {
    const text = getLatestAssistantMessage();

    if (!text) {
      if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus("No answer to read");
      }
      return;
    }

    if (!("speechSynthesis" in window)) {
      if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus("Speech output not supported");
      }
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getLanguage();
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      if (window.UIStatus) {
        if (typeof window.UIStatus.setSystemStatus === "function") {
          window.UIStatus.setSystemStatus("Speaking...");
        }
        if (typeof window.UIStatus.setModeStatus === "function") {
          window.UIStatus.setModeStatus("voice-output");
        }
      }
    };

    utterance.onend = () => {
      if (window.UIStatus) {
        if (typeof window.UIStatus.setSystemStatus === "function") {
          window.UIStatus.setSystemStatus("Ready");
        }
        if (typeof window.UIStatus.setModeStatus === "function") {
          window.UIStatus.setModeStatus("manual");
        }
      }
    };

    utterance.onerror = () => {
      if (window.UIStatus) {
        if (typeof window.UIStatus.setSystemStatus === "function") {
          window.UIStatus.setSystemStatus("Speak error");
        }
        if (typeof window.UIStatus.setModeStatus === "function") {
          window.UIStatus.setModeStatus("manual");
        }
      }
    };

    if (window.UIStatus && typeof window.UIStatus.setLangStatus === "function") {
      window.UIStatus.setLangStatus(utterance.lang);
    }

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (window.UIStatus) {
      if (typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus("Ready");
      }
      if (typeof window.UIStatus.setModeStatus === "function") {
        window.UIStatus.setModeStatus("manual");
      }
    }
  }

  window.SpeechOutput = {
    speakAnswer,
    stopSpeaking
  };
})();

