function speakArticle() {
  const main = document.querySelector("main");

  if (!main) {
    alert("Okunacak içerik bulunamadı.");
    return;
  }

  const text = main.innerText;

  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "tr-TR";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  speechSynthesis.speak(utterance);
}
