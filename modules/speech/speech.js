(() => {
  const API_URL = "https://zanistarast-ai-server.onrender.com/api/ask";

  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const sendBtn = document.getElementById("sendBtn");
  const speakBtn = document.getElementById("speakBtn");
  const clearBtn = document.getElementById("clearBtn");

  const questionInput = document.getElementById("questionInput");
  const answerOutput = document.getElementById("answerOutput");
  const classificationBox = document.getElementById("classificationBox");
  const metaOutput = document.getElementById("metaOutput");

  const languageSelect = document.getElementById("languageSelect");

  const micStatus = document.getElementById("micStatus");
  const systemStatus = document.getElementById("systemStatus");
  const langStatus = document.getElementById("langStatus");
  const modeStatus = document.getElementById("modeStatus");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = null;
  let isListening = false;
  let finalTranscript = "";
  let baseText = "";

  function setMicState(active) {
    isListening = active;

    if (!micStatus) return;

    micStatus.textContent = active ? "On" : "Off";
    micStatus.className = "status-value " + (active ? "mic-on" : "mic-off");
  }

  function setSystemStatus(text) {
    if (systemStatus) systemStatus.textContent = text;
  }

  function setModeStatus(text) {
    if (modeStatus) modeStatus.textContent = text;
  }

  function setLangStatus(text) {
    if (langStatus) langStatus.textContent = text;
  }

  function setAnswer(text) {
    if (answerOutput) answerOutput.textContent = text || "No answer yet.";
  }

  function setClassification(value) {
    if (classificationBox) {
      classificationBox.textContent = "Classification: " + (value || "None");
    }
  }

  function setMeta(meta) {
    if (!metaOutput) return;

    if (!meta) {
      metaOutput.textContent = "No source metadata yet.";
      return;
    }

    if (typeof meta === "string") {
      metaOutput.textContent = meta;
      return;
    }

    try {
      metaOutput.textContent = JSON.stringify(meta, null, 2);
    } catch {
      metaOutput.textContent = "Metadata available.";
    }
  }

  function buildRecognition() {
    if (!SpeechRecognition) {
      setSystemStatus("Speech not supported");
      return null;
    }

    const r = new SpeechRecognition();
    r.lang = languageSelect ? languageSelect.value : "en-US";
    r.continuous = true;
    r.interimResults = true;

    r.onstart = () => {
      setMicState(true);
      setSystemStatus("Listening...");
      setModeStatus("Voice");
    };

    r.onend = () => {
      setMicState(false);
      setSystemStatus("Ready");
      setModeStatus("Manual");
    };

    r.onerror = (event) => {
      const code = event && event.error ? event.error : "unknown";
      if (code === "no-speech") {
        setSystemStatus("No speech detected");
      } else if (code === "not-allowed") {
        setSystemStatus("Microphone blocked");
      } else {
        setSystemStatus("Speech error: " + code);
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

      if (questionInput) {
        const speechText = (finalTranscript + interimTranscript).trim();
        questionInput.value = [baseText, speechText].filter(Boolean).join(" ").trim();
      }
    };

    return r;
  }

  function startListening() {
    if (!questionInput) return;

    if (!recognition) {
      recognition = buildRecognition();
    }

    if (!recognition || isListening) return;

    finalTranscript = "";
    baseText = questionInput.value.trim();

    try {
      recognition.lang = languageSelect ? languageSelect.value : "en-US";
      setLangStatus(recognition.lang);
      recognition.start();
    } catch (error) {
      console.error(error);
      setSystemStatus("Start error");
    }
  }

  function stopListening() {
    if (!recognition || !isListening) return;

    try {
      recognition.stop();
    } catch (error) {
      console.error(error);
      setSystemStatus("Stop error");
    }
  }

  async function sendQuestion() {
    if (!questionInput) return;

    const question = questionInput.value.trim();

    if (!question) {
      setSystemStatus("Question is empty");
      return;
    }

    setSystemStatus("Thinking...");
    setModeStatus("Manual");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }

      const data = await response.json();

      setAnswer(data.answer || "No answer");
      setClassification(data.classification || null);
      setMeta(data.meta || null);
      setSystemStatus("Done");
    } catch (error) {
      console.error(error);
      setAnswer("Server error.");
      setClassification(null);
      setMeta(null);
      setSystemStatus("Error");
    }
  }

  function speakAnswer() {
    if (!answerOutput) return;

    const text = answerOutput.textContent.trim();
    if (!text || text === "No answer yet." || text === "Server error.") {
      setSystemStatus("No answer to read");
      return;
    }

    if (!("speechSynthesis" in window)) {
      setSystemStatus("Speech synthesis not supported");
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect ? languageSelect.value : "en-US";

    utterance.onstart = () => {
      setSystemStatus("Speaking...");
      setModeStatus("Voice");
    };

    utterance.onend = () => {
      setSystemStatus("Ready");
      setModeStatus("Manual");
    };

    utterance.onerror = () => {
      setSystemStatus("Speak error");
      setModeStatus("Manual");
    };

    window.speechSynthesis.speak(utterance);
  }

  function clearAll() {
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch {}
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    finalTranscript = "";
    baseText = "";

    if (questionInput) questionInput.value = "";
    setAnswer("No answer yet.");
    setClassification(null);
    setMeta(null);

    setMicState(false);
    setSystemStatus("Cleared");
    setModeStatus("Manual");
    setLangStatus(languageSelect ? languageSelect.value : "en-US");
  }

  if (startBtn) startBtn.addEventListener("click", startListening);
  if (stopBtn) stopBtn.addEventListener("click", stopListening);
  if (sendBtn) sendBtn.addEventListener("click", sendQuestion);
  if (speakBtn) speakBtn.addEventListener("click", speakAnswer);
  if (clearBtn) clearBtn.addEventListener("click", clearAll);

  if (questionInput) {
    questionInput.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        sendQuestion();
      }
    });
  }

  if (languageSelect) {
    setLangStatus(languageSelect.value);

    languageSelect.addEventListener("change", () => {
      setLangStatus(languageSelect.value);

      if (recognition && !isListening) {
        recognition.lang = languageSelect.value;
      }
    });
  }

  setMicState(false);
  setSystemStatus("Ready");
  setModeStatus("Manual");
  setLangStatus(languageSelect ? languageSelect.value : "en-US");
})();





