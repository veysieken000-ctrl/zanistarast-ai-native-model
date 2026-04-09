(() => {
  const languageSelect = document.getElementById("languageSelect");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;
  let baseText = "";
  let finalTranscript = "";

  function getSelectedLanguage() {
    return languageSelect ? languageSelect.value : "en-US";
  }

  function buildRecognition() {
    if (!SpeechRecognition) {
      if (window.UIStatus && typeof window.UIStatus.setSystemStatus === "function") {
        window.UIStatus.setSystemStatus("Speech not supported");
      }
      return null;
    }

    const r = new SpeechRecognition();
    r.lang = getSelectedLanguage();
    r.continuous = true;
    r.interimResults = true;

    r.onstart = () => {
      if (window.SpeechState) {
        window.SpeechState.setListening(true);
        window.SpeechState.setMode("voice");
      }

      if (window.UIStatus) {
        window.UIStatus.setSystemStatus("Listening...");
        window.UIStatus.setLangStatus(r.lang);
      }
    };

    r.onend = () => {
      if (window.SpeechState) {
        window.SpeechState.setListening(false);
        window.SpeechState.setMode("manual");
      }

      if (window.UIStatus) {
        window.UIStatus.setSystemStatus("Ready");
      }
    };

    r.onerror = (event) => {
      const code = event && event.error ? event.error : "unknown";

      if (window.SpeechState) {
        window.SpeechState.setListening(false);
        window.SpeechState.setMode("manual");
      }

      if (window.UIStatus) {
        if (code === "no-speech") {
          window.UIStatus.setSystemStatus("No speech detected");
        } else if (code === "not-allowed") {
          window.UIStatus.setSystemStatus("Microphone blocked");
        } else {
          window.UIStatus.setSystemStatus("Speech error: " + code);
        }
      }
    };

    r.onresult = (event) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += text + " ";
        } else {
          interimTranscript += text;
        }
      }

      const speechText = (finalTranscript + interimTranscript).trim();
      const combinedText = [baseText, speechText].filter(Boolean).join(" ").trim();

      if (window.UIRenderer && typeof window.UIRenderer.setQuestion === "function") {
        window.UIRenderer.setQuestion(combinedText);
      }
    };

    return r;
  }

  function startListening() {
    if (!window.UIRenderer || !window.SpeechState) return;
    if (window.SpeechState.isListening()) return;

    if (!recognition) {
      recognition = buildRecognition();
    }

    if (!recognition) return;

    baseText = window.UIRenderer.getQuestion();
    finalTranscript = "";

    try {
      recognition.lang = getSelectedLanguage();

      if (window.UIStatus) {
        window.UIStatus.setLangStatus(recognition.lang);
      }

      recognition.start();
    } catch (error) {
      console.error(error);

      if (window.UIStatus) {
        window.UIStatus.setSystemStatus("Start error");
      }
    }
  }

  function stopListening() {
    if (!recognition || !window.SpeechState || !window.SpeechState.isListening()) return;

    try {
      recognition.stop();
    } catch (error) {
      console.error(error);

      if (window.UIStatus) {
        window.UIStatus.setSystemStatus("Stop error");
      }
    }
  }

  function resetInputSpeech() {
    baseText = "";
    finalTranscript = "";

    if (recognition && window.SpeechState && window.SpeechState.isListening()) {
      try {
        recognition.stop();
      } catch (error) {
        console.error(error);
      }
    }

    if (window.SpeechState) {
      window.SpeechState.resetSpeechState();
    }
  }

  if (languageSelect) {
    languageSelect.addEventListener("change", () => {
      const selected = getSelectedLanguage();

      if (window.UIStatus) {
        window.UIStatus.setLangStatus(selected);
      }

      if (recognition && window.SpeechState && !window.SpeechState.isListening()) {
        recognition.lang = selected;
      }
    });
  }

  window.SpeechInput = {
    startListening,
    stopListening,
    resetInputSpeech
  };
})();

