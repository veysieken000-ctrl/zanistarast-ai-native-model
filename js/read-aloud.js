let zanistarastUtterance = null;
let zanistarastText = "";

function speakArticle() {
  const main = document.querySelector("main");
  if (!main) return;

  zanistarastText = main.innerText.trim();
  if (!zanistarastText) return;

  speechSynthesis.cancel();

  zanistarastUtterance = new SpeechSynthesisUtterance(zanistarastText);
  zanistarastUtterance.lang = "tr-TR";
  zanistarastUtterance.rate = 0.95;
  zanistarastUtterance.pitch = 1;

  setTimeout(() => {
    speechSynthesis.speak(zanistarastUtterance);
  }, 250);
}

function pauseReading() {
  speechSynthesis.pause();
}

function resumeReading() {
  speechSynthesis.resume();
}

function stopReading() {
  speechSynthesis.cancel();
  zanistarastUtterance = null;
}
