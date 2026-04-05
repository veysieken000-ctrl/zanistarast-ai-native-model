const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answerBox");
const thinkingBox = document.getElementById("thinkingBox");

function fillPrompt(text) {
  if (!questionInput) return;
  questionInput.value = text;
  questionInput.focus();
}

window.fillPrompt = fillPrompt;

function showThinking() {
  if (thinkingBox) {
    thinkingBox.style.display = "block";
  }
}

function hideThinking() {
  if (thinkingBox) {
    thinkingBox.style.display = "none";
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function buildAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("hebûn")) {
    return `
      <h3>Hebûn</h3>
      <p>Hebûn, varlığın katmanlı yapısını açıklayan ontolojik çerçevedir.</p>
      <p>Bu yaklaşımda üst katmanlar alt katmanları yok etmeden düzenler ve yapı anlatıdan önce incelenir.</p>
    `;
  }

  if (q.includes("zanabûn")) {
    return `
      <h3>Zanabûn</h3>
      <p>Zanabûn, bilginin nasıl doğrulanacağını açıklayan epistemolojik ilkedir.</p>
      <p>Gözlem, yapısal tutarlılık ve doğrulama birlikte değerlendirilir.</p>
    `;
  }

  if (q.includes("mabûn")) {
    return `
      <h3>Mabûn</h3>
      <p>Mabûn, ekonomi ile yapısal sorumluluk arasındaki dengeyi açıklayan modeldir.</p>
      <p>Ekonomi burada yalnızca üretim değil; bilgi, sorumluluk ve düzen ilişkisidir.</p>
    `;
  }

  if (q.includes("rasterast")) {
    return `
      <h3>Rasterast</h3>
      <p>Rasterast, tutarlılık filtreleme yöntemidir.</p>
      <p>Bir yapının geçerliliği ontoloji, epistemoloji, yapı ve sonuç uyumu üzerinden değerlendirilir.</p>
    `;
  }

  if (q.includes("rêbûn") || q.includes("rebûn") || q.includes("rebun")) {
    return `
      <h3>Rêbûn</h3>
      <p>Rêbûn, yönetim, adalet ve düzen ilişkisini açıklayan yapısal modeldir.</p>
      <p>Burada temel mesele gücün değil, düzenin ve adaletin yapısal yeridir.</p>
    `;
  }

  if (q.includes("newroza")) {
    return `
      <h3>Newroza Kawa</h3>
      <p>Newroza Kawa, medeniyet katmanını temsil eder.</p>
      <p>Ontoloji, bilgi, etik ve güç arasındaki uyum medeniyet istikrarı üzerinden okunur.</p>
    `;
  }

  return `
    <h3>Zanistarast AI</h3>
    <p><strong>Soru:</strong> ${escapeHtml(question)}</p>
    <p>Bu soru sistem içinde alındı. Şu an yerel cevap akışı çalışıyor.</p>
  `;
}

function askQuestion() {
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
  }, 500);
}

if (askBtn) {
  askBtn.addEventListener("click", askQuestion);
}

if (questionInput) {
  questionInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      askQuestion();
    }
  });
}
