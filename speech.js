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

const micStatus = document.getElementById("micStatus");
const systemStatus = document.getElementById("systemStatus");
const langStatus = document.getElementById("langStatus");

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;
let isListening = false;
let finalTranscript = "";

// ======================
// UI HELPERS
// ======================

function setMicState(active) {
  isListening = active;
  micStatus.textContent = active ? "Açık" : "Kapalı";
  micStatus.className = "status-value " + (active ? "mic-on" : "mic-off");
}

function setSystemStatus(text) {
  systemStatus.textContent = text;
}

function setClassification(type) {
  classificationBox.className = "classification";

  if (type === "TRUTH") {
    classificationBox.classList.add("truth");
    classificationBox.textContent = "Sınıflandırma: TRUTH";
    return;
  }

  if (type === "FALSE") {
    classificationBox.classList.add("false");
    classificationBox.textContent = "Sınıflandırma: FALSE";
    return;
  }

  classificationBox.classList.add("unknown");
  classificationBox.textContent = "Sınıflandırma: Yok";
}

// ======================
// CLASSIFICATION PARSER
// ======================

function extractClassification(answer) {
  const text = String(answer || "").toUpperCase();

  if (text.includes("FINAL CLASSIFICATION:") && text.includes("TRUTH")) {
    return "TRUTH";
  }

  if (text.includes("FINAL CLASSIFICATION:") && text.includes("FALSE")) {
    return "FALSE";
  }

  if (text.includes("TRUTH")) return "TRUTH";
  if (text.includes("FALSE")) return "FALSE";

  return "";
}

// ======================
// META BUILDER
// ======================

function buildMetaText(meta) {
  if (!meta || !Array.isArray(meta.chunks)) {
    return "Kaynak meta bilgisi yok.";
  }

  return meta.chunks
    .slice(0, 3)
    .map((item, i) => {
      return `${i + 1}. ${item.title} | layer: ${item.layer} | score: ${item.score}`;
    })
    .join("\n");
}

// ======================
// API CALL
// ======================

async function askQuestion() {
  const question = questionInput.value.trim();

  if (!question) {
    setSystemStatus("Soru yok");
    return;
  }

  setSystemStatus("Gönderiliyor...");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      answerOutput.textContent = data.answer || "Hata";
      setSystemStatus("API hatası");
      return;
    }

    const answer = data.answer || "Cevap yok";

    answerOutput.textContent = answer;
    metaOutput.textContent = buildMetaText(data.meta);

    const classification = extractClassification(answer);
    setClassification(classification);

    setSystemStatus("Hazır");

  } catch (err) {
    answerOutput.textContent = "Bağlantı hatası: " + err.message;
    setSystemStatus("Bağlantı hatası");
  }
}

// ======================
// SPEECH TO TEXT
// ======================

function setupSpeechRecognition() {
  if (!SpeechRecognition) {
    setSystemStatus("Speech API desteklenmiyor");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "tr-TR";
  recognition.continuous = true;
  recognition.interimResults = true;

  langStatus.textContent = recognition.lang;

  recognition.onstart = () => {
    setMicState(true);
    setSystemStatus("Dinleniyor...");
  };

  recognition.onend = () => {
    setMicState(false);
    setSystemStatus("Durdu");
  };

  recognition.onerror = (e) => {
    setMicState(false);
    setSystemStatus("Hata: " + e.error);
  };

  recognition.onresult = (event) => {
    let interim = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const text = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += text + " ";
      } else {
        interim += text;
      }
    }

    questionInput.value = (finalTranscript + interim).trim();
  };
}

// ======================
// TEXT TO SPEECH
// ======================

function speakAnswer() {
  const text = answerOutput.textContent.trim();

  if (!text) return;

  if (!("speechSynthesis" in window)) {
    setSystemStatus("TTS desteklenmiyor");
    return;
  }

  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "tr-TR";

  utter.onstart = () => setSystemStatus("Okuyor...");
  utter.onend = () => setSystemStatus("Bitti");

  window.speechSynthesis.speak(utter);
}

// ======================
// CLEAR
// ======================

function clearAll() {
  questionInput.value = "";
  answerOutput.textContent = "";
  metaOutput.textContent = "";
  setClassification("");
  finalTranscript = "";
}

// ======================
// EVENTS
// ======================

startBtn.addEventListener("click", () => {
  if (!recognition) setupSpeechRecognition();
  if (!recognition) return;

  finalTranscript = questionInput.value + " ";

  try {
    recognition.start();
  } catch (e) {
    setSystemStatus("Zaten açık");
  }
});

stopBtn.addEventListener("click", () => {
  if (recognition && isListening) {
    recognition.stop();
  }
});

sendBtn.addEventListener("click", askQuestion);
speakBtn.addEventListener("click", speakAnswer);
clearBtn.addEventListener("click", clearAll);

// INIT
setupSpeechRecognition();
