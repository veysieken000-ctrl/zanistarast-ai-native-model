const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answerBox");
const thinkingBox = document.getElementById("thinkingBox");

function showThinking() {
  if (thinkingBox) thinkingBox.style.display = "block";
}

function hideThinking() {
  if (thinkingBox) thinkingBox.style.display = "none";
}

function buildMockAnswer(question) {
  return `
    <h3>Zanistarast AI</h3>
    <p><strong>Soru:</strong> ${question}</p>
    <p>
      Bu sistem şu anda yerel cevap üretim modunda çalışıyor.
      AI backend bağlandığında daha güçlü cevaplar üretilecek.
    </p>
  `;
}

function askQuestion() {
  const question = questionInput.value.trim();
  if (!question) return;

  showThinking();

  setTimeout(() => {
    const result = buildMockAnswer(question);
    answerBox.innerHTML = result;
    hideThinking();
  }, 600);
}

if (askBtn) {
  askBtn.addEventListener("click", askQuestion);
}
