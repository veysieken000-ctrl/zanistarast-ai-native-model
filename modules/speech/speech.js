const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const questionInput = document.getElementById("questionInput");
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

function setMicState(active) {
  isListening = active;
  if (micStatus) {
    micStatus.textContent = active ? "On" : "Off";
    micStatus.className = "status-value " + (active ? "mic-on" : "mic-off");
  }
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

function setupRecognition() {
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
    console.log("Listening started");
  };

  r.onend = () => {
    setMicState(false);
    setSystemStatus("Ready");
    setModeStatus("Manual");
    console.log("Listening stopped");
  };

  r.onerror = (e) => {
    console.error("Speech error:", e.error);
    setSystemStatus("Speech error: " + e.error);
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
      questionInput.value = (finalTranscript + interimTranscript).trim();
    }
  };

  return r;
}

function startListening() {
  if (!recognition) {
    recognition = setupRecognition();
  }

  if (!recognition || isListening) return;

  finalTranscript = questionInput ? questionInput.value.trim() + " " : "";

  try {
    recognition.lang = languageSelect ? languageSelect.value : "en-US";
    setLangStatus(recognition.lang);
    recognition.start();
  } catch (err) {
    console.error("Start error:", err);
  }
}

function stopListening() {
  if (!recognition || !isListening) return;

  try {
    recognition.stop();
  } catch (err) {
    console.error("Stop error:", err);
  }
}

function clearAll() {
  if (recognition && isListening) {
    try {
      recognition.stop();
    } catch (err) {}
  }

  finalTranscript = "";

  if (questionInput) questionInput.value = "";

  const answerOutput = document.getElementById("answerOutput");
  const classificationBox = document.getElementById("classificationBox");
  const metaOutput = document.getElementById("metaOutput");

  if (answerOutput) answerOutput.textContent = "No answer yet.";
  if (classificationBox) classificationBox.textContent = "Classification: None";
  if (metaOutput) metaOutput.textContent = "No source metadata yet.";

  setMicState(false);
  setSystemStatus("Cleared");
  setModeStatus("Manual");
  setLangStatus(languageSelect ? languageSelect.value : "en-US");
}

if (startBtn) startBtn.addEventListener("click", startListening);
if (stopBtn) stopBtn.addEventListener("click", stopListening);
if (clearBtn) clearBtn.addEventListener("click", clearAll);

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





