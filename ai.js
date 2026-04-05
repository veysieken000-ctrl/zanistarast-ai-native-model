const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answerBox");
const thinkingBox = document.getElementById("thinkingBox");

fonksiyon fillPrompt(metin) {
Eğer soru girilmemişse, geri dön;
soruGirişi.değeri = metin;
soruGirişi.odak();
}
pencere.doldurma istemi = doldurma istemi;

fonksiyon showThinking() {
if (thinkingBox) thinkingBox.style.display = "block";
}

düşünmeyi gizle fonksiyonu {
if (thinkingBox) thinkingBox.style.display = "none";
}

fonksiyon escapeHtml(metin) {
const div = document.createElement("div");
div.textContent = text;
div.innerHTML'i döndür;
}
function buildAnswer(question) {
  const q = question.toLowerCase();
  const cleanQ = q
    .replaceAll("û", "u")
    .replaceAll("î", "i")
    .replaceAll("ê", "e")
    .replaceAll("â", "a");

  if (cleanQ.includes("hebun")) {
    return `
      <h3>Hebûn</h3>
      <p>Hebûn, varlığın katmanlı yapısını açıklayan ontolojik çerçevedir.</p>
      <p>Üst katmanlar alt katmanları yok etmeden düzenler. Analiz yapıdan başlar.</p>
    `;
  }

  if (cleanQ.includes("zanabun")) {
    return `
      <h3>Zanabûn</h3>
      <p>Zanabûn, bilginin nasıl doğrulandığını açıklayan epistemolojik ilkedir.</p>
      <p>Gözlem, yapısal tutarlılık ve doğrulama birlikte değerlendirilir.</p>
    `;
  }

  if (
    cleanQ.includes("mabun") ||
    cleanQ.includes("ekonomi") ||
    cleanQ.includes("ekonom")
  ) {
    return `
      <h3>Mabûn (Ekonomi Modeli)</h3>
      <p>Mabûn, ekonomi ile yapısal sorumluluk arasındaki dengeyi açıklar.</p>
      <p>Ekonomi yalnızca üretim değil; bilgi, sorumluluk ve düzen ilişkisidir.</p>
    `;
  }

  if (cleanQ.includes("rasterast")) {
    return `
      <h3>Rasterast</h3>
      <p>Rasterast, tutarlılık filtreleme yöntemidir.</p>
      <p>Bir yapının geçerliliği ontoloji, epistemoloji, yapı ve sonuç uyumuyla değerlendirilir.</p>
    `;if (cleanQ.includes("rebun")) {
    return `
      <h3>Rêbûn</h3>
      <p>Rêbûn, yönetim, adalet ve düzen ilişkisini açıklayan yapısal modeldir.</p>
      <p>Temel mesele güç değil, düzenin yapısal yeridir.</p>
    `;
  }

  if (cleanQ.includes("newroza")) {
    return `
      <h3>Newroza Kawa</h3>
      <p>Newroza Kawa medeniyet katmanını temsil eder.</p>
      <p>Ontoloji, bilgi, etik ve güç uyumu medeniyet istikrarını oluşturur.</p>
    `;
  }

  if (cleanQ.includes("ontoloji")) {
    return `
      <h3>Ontoloji</h3>
      <p>Ontoloji, varlığın ne olduğunu ve nasıl katmanlandığını inceler.</p>
    `;
  }

  if (cleanQ.includes("epistemoloji")) {
    return `
      <h3>Epistemoloji</h3>
      <p>Epistemoloji, bilginin nasıl üretildiğini ve nasıl doğrulandığını inceler.</p>
    `;
  }

  if (cleanQ.includes("felsefe")) {
    return `
      <h3>Felsefe</h3>
      <p>Felsefe, varlık, bilgi, anlam ve yöntem üzerine düşünsel çerçeve kurar.</p>
    `;
  }

  if (cleanQ.includes("zanistarast")) {
    return `
      <h3>Zanistarast</h3>
      <p>Zanistarast; ontoloji, epistemoloji, yapı ve medeniyet düzeylerini birlikte ele alan çerçevedir.</p>
      <p>Burada amaç anlatı değil, tutarlı yapı kurmaktır.</p>
    `;
  }

  return `
    <h3>Zanistarast AI</h3>
    <p><strong>Soru:</strong> ${escapeHtml(question)}</p>
    <p>Bu konu için henüz özel cevap tanımlı değil.</p>
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
Bir de ai.html içinde altta bu id’ler gerçekten böyle olmalı:
HTML
<input id="questionInput" type="text" placeholder="Sorunu yaz..." />
<button id="askBtn" type="button">Sor</button>
<div id="thinkingBox" class="thinking hidden">Düşünüyorum...</div>
<div id="answerBox" class="answer-box">Cevap burada görünecek.</div>
      
  }
  
