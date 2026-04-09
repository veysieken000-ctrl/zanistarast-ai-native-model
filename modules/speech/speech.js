// ===== SPEECH CORE =====

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let recognition = null;
let isListening = false;

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    console.log("🎤 Listening started");
    isListening = true;
  };

  recognition.onend = () => {
    console.log("⛔ Listening stopped");
    isListening = false;
  };

  recognition.onerror = (e) => {
    console.error("Speech error:", e.error);
  };
}

// ===== BUTTONS =====

if (startBtn) {
  startBtn.onclick = () => {
    if (recognition && !isListening) {
      recognition.start();
    }
  };
}

if (stopBtn) {
  stopBtn.onclick = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };
}





