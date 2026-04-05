const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answerBox");
const thinkingBox = document.getElementById("thinkingBox");

/* butonlardan input doldurma */
function fillPrompt(text) {
  if (!questionInput) return;
  questionInput.value = text;
  questionInput.focus();
}
window.fillPrompt = fillPrompt;

/* loading */
function showThinking() {
  if (thinkingBox) thinkingBox.style.display = "block";
}
function hideThinking() {
  if (thinkingBox) thinkingBox.style.display = "none";
}

/* güvenli html */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ANA CEVAP MOTORU */
function buildAnswer(question) {
  const q = question.toLowerCase();

  // normalize (KRİTİK)
  const cleanQ = q
    .replaceAll("û", "u")
    .replaceAll("î", "i")
    .replaceAll("ê", "e")
    .replaceAll("â", "a");

  // HEBUN
  if (cleanQ.includes("hebun")) {
    return `
      <h3>Hebûn</h3>
      <p>Hebûn, varlığın katmanlı yapısını açıklayan ontolojik çerçevedir.</p>
      <p>Üst katmanlar alt katmanları yok etmeden düzenler. Analiz her zaman yapıdan başlar.</p>
    `;
  }

  // ZANABUN
  if (cleanQ.includes("zanabun")) {
    return `
      <h3>Zanabûn</h3>
      <p>Zanabûn, bilginin nasıl doğrulandığını açıklayan epistemolojik ilkedir.</p>
      <p>Gözlem, yapısal tutarlılık ve katmanlar arası doğrulama birlikte değerlendirilir.</p>
    `;
  }

  // MABUN
  if (cleanQ.includes("mabun")) {
    return `
      <h3>Mabûn</h3>
      <p>Mabûn, ekonomi ile yapısal sorumluluk arasındaki dengeyi açıklar.</p>
      <p>Ekonomi yalnız üretim değil; bilgi, sorumluluk ve düzen ilişkisidir.</p>
    `;
  }

  // RASTERAST
  if (cleanQ.includes("rasterast")) {
    return `
      <h3>Rasterast</h3>
      <p>Rasterast, tutarlılık filtreleme yöntemidir.</p>
      <p>Bir yapının geçerliliği ontoloji, epistemoloji ve sonuç uyumu ile ölçülür.</p>
    `;
  }

  // REBUN
  if (cleanQ.includes("rebun")) {
    return `
      <h3>Rêbûn</h3>
      <p>Rêbûn, yönetim, adalet ve düzen ilişkisini açıklar.</p>
      <p>Temel mesele güç değil; düzenin yapısal yeridir.</p>
    `;
  }

  // NEWROZA
  if (cleanQ.includes("newroza")) {
    return `
      <h3>Newroza Kawa</h3>
      <p>Medeniyet katmanını temsil eder.</p>
      <p>Ontoloji, bilgi, etik ve güç uyumu medeniyet istikrarını oluşturur.</p>
    `;
  }
if (
  cleanQ.includes("mabun") ||
  cleanQ.includes("ekonomi") ||
  cleanQ.includes("ekonom")
) {
  // DEFAULT
  return `
    <h3>Zanistarast AI</h3>
    <p><strong>Soru:</strong> ${escapeHtml(question)}</p>
    <p>Bu soru sistem içinde alındı. Ancak bu konu için henüz özel cevap tanımlı değil.</p>
  `;
}

/* SORU SOR */
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

/* EVENT */
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
