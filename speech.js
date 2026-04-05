const speechText = document.getElementById("speechText");
const speakBtn = document.getElementById("speakBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");
const stopBtn = document.getElementById("stopBtn");

let currentUtterance = null;

function speakText() {
  if (!speechText) return;

  const text = speechText.value.trim();
  if (!text) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "tr-TR";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function pauseSpeech() {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.pause();
  }
}

function resumeSpeech() {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
}

function stopSpeech() {
  window.speechSynthesis.cancel();
}

if (speakBtn) speakBtn.addEventListener("click", speakText);
if (pauseBtn) pauseBtn.addEventListener("click", pauseSpeech);
if (resumeBtn) resumeBtn.addEventListener("click", resumeSpeech);
if (stopBtn) stopBtn.addEventListener("click", stopSpeech);
