let zanistarastUtterance = null;

function speakArticle() {
  const main = document.querySelector("main");
  if (!main) return;

  const text = main.innerText.trim();
  if (!text) return;

  speechSynthesis.cancel();

  zanistarastUtterance = new SpeechSynthesisUtterance(text);
  zanistarastUtterance.lang = "tr-TR";
  zanistarastUtterance.rate = 0.95;
  zanistarastUtterance.pitch = 1;

  setTimeout(() => {
    speechSynthesis.speak(zanistarastUtterance);
  }, 300);
}

function pauseReading() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
}

function resumeReading() {
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
  }
}

function stopReading() {
  speechSynthesis.cancel();
}
