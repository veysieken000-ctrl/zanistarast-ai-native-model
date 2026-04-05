  if (!questionInput || !answerBox) return;

  const question = questionInput.value.trim();

  if (!question) {
    answerBox.innerHTML = "Lütfen önce bir soru yaz.";
    return;
  }

  if (askBtn) askBtn.disabled = true;
  showThinking();
  answerBox.innerHTML = "Cevap hazırlanıyor...";

  setTimeout(() => {
    answerBox.innerHTML = buildAnswer(question);
    hideThinking();
    if (askBtn) askBtn.disabled = false;
  }, 300);
}

if (askBtn) {
  askBtn.addEventListener("click", askQuestion);
}

if (questionInput) {
  questionInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      askQuestion();
    }
  });
}      
