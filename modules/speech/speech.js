alert("speech.js loaded");
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
let isApplyingSpeech = false;
let typedBaseText = "";

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

  r.onerror = (event) => {
    console.error("Speech error:", event.error);
    setSystemStatus("Speech error: " + event.error);
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

  isApplyingSpeech = true;

  if (speechText) {
    questionInput.value = [typedBaseText, speechText].filter(Boolean).join(" ").trim();
  } else {
    questionInput.value = typedBaseText;
  }

  isApplyingSpeech = false;
}

    if (questionInput) {
  questionInput.addEventListener("input", () => {
    if (!isApplyingSpeech) {
      typedBaseText = questionInput.value.trim();
    }
  });
    if (!currentText) {
      questionInput.value = speechText;
    } else if (!currentText.includes(speechText)) {
      questionInput.value = (currentText + " " + speechText).trim();
    }
  }
}
  return r;
}

function startListening() {
  if (!recognition) {
    recognition = setupRecognition();
  }

  if (!recognition || isListening) return;

 finalTranscript = "";

  try {
    recognition.lang = languageSelect ? languageSelect.value : "en-US";
    setLangStatus(recognition.lang);
    recognition.start();
  } catch (error) {
    console.error("Start error:", error);
  }
}

function stopListening() {
  if (!recognition || !isListening) return;

  try {
    recognition.stop();
  } catch (error) {
    console.error("Stop error:", error);
  }
}

function clearAll() {
  if (recognition && isListening) {
    try {
      recognition.stop();
    } catch (error) {}
  }

  finalTranscript = "";
baseText = questionInput ? questionInput.value.trim() : "";
typedBaseText = baseText;

  if (questionInput) questionInput.value = "";
  if (answerOutput) answerOutput.textContent = "No answer yet.";
  if (classificationBox) classificationBox.textContent = "Classification: None";
  if (metaOutput) metaOutput.textContent = "No source metadata yet.";

  setMicState(false);
  setSystemStatus("Cleared");
  setModeStatus("Manual");
  setLangStatus(languageSelect ? languageSelect.value : "en-US");
}
const API_URL = "https://zanistarast-ai-server.onrender.com/api/ask";

async function sendQuestion() {
  if (!questionInput || !questionInput.value.trim()) {
    alert("Soru boş");
    return;
  }

  const question = questionInput.value.trim();

  const answerOutput = document.getElementById("answerOutput");
  const classificationBox = document.getElementById("classificationBox");
  const metaOutput = document.getElementById("metaOutput");

  setSystemstatus("Thinking...");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();

    if (answerOutput) answerOutput.textContent = data.answer || "No answer";
    if (classificationBox) classificationBox.textContent = "Classification: " + (data.classification || "None");
    if (metaOutput) metaOutput.textContent = data.meta || "No metadata";

    setSystemstatus("Done");
  } catch (err) {
    console.error(err);
    setSystemstatus("Error");
  }
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
setLangStatus(languageSelect ? languageSelect.value : "en-US");

const sendBtn = document.getElementById("sendBtn");
if (sendBtn) sendBtn.addEventListener("click", sendQuestion);

if (questionInput) {
  questionInput.addEventListener("input", () => {
    if (!isApplyingSpeech) {
      typedBaseText = questionInput.value.trim();
    }
  });
}
