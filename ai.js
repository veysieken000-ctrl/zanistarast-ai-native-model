const questionInput = document.getElementById("questionInput");
const askBtn = document.getElementById("askBtn");
const answerBox = document.getElementById("answerBox");
const thinkingBox = document.getElementById("thinkingBox");
const followupsWrap = document.getElementById("ai-followups");
const followupButtons = document.getElementById("ai-followup-buttons");

/* konu butonları için global fonksiyon */
function fillPrompt(text) {
  if (!questionInput) return;
  questionInput.value = text;
  questionInput.focus();
  questionInput.setSelectionRange(questionInput.value.length, questionInput.value.length);

  if (answerBox) {
    answerBox.innerHTML = "Hazır. Sor butonuna basarak devam edebilirsin.";
  }

  if (followupsWrap) {
    followupsWrap.style.display = "none";
  }
}

window.fillPrompt = fillPrompt;
function getSmartSuggestions(topic) {
  if (!window.KNOWLEDGE) return [];

  return KNOWLEDGE[topic] || [];
}

/* yardımcılar */
function showThinking() {
  if (thinkingBox) {
    thinkingBox.classList.remove("hidden");
    thinkingBox.style.display = "inline-flex";
  }
}

function hideThinking() {
  if (thinkingBox) {
    thinkingBox.classList.add("hidden");
    thinkingBox.style.display = "none";
  }
}

function setAnswer(html) {
  if (answerBox) {
    answerBox.innerHTML = html;
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderFollowups(items) {
  if (!followupButtons || !followupsWrap) return;

  followupButtons.innerHTML = "";

  if (!items || !items.length) {
    followupsWrap.style.display = "none";
    return;
  }

  items.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "followup-chip";
    btn.textContent = item;
    btn.addEventListener("click", () => {
      fillPrompt(item);
    });
    followupButtons.appendChild(btn);
  });

  followupsWrap.style.display = "block";
}

/* geçici cevap motoru */
function buildMockAnswer(question) {
  const q = question.toLowerCase();

  if (q.includes("hebûn")) {
    return {
      answer: `
        <h3>Hebûn</h3>
        <p>
          Hebûn, varlığın katmanlı yapısını açıklayan ontolojik çerçevedir.
          Temel fikir, üst katmanların alt katmanları yok etmeden düzenlemesi
          ve varlığın yalnızca maddi düzlemle sınırlı okunmamasıdır.
        </p>
        <p>
          Bu çerçevede analiz, “hangi yapı hangi düzeyi taşır?” sorusuyla ilerler.
          Yani anlatıdan önce yapı incelenir.
        </p>
      `,
      followups: [
        "Hebûn ile klasik ontoloji arasındaki fark nedir?",
        "Hebûn bilimsel olarak nasıl test edilir?",
        "Hebûn ile Zanabûn ilişkisi nedir?"
      ]
    };
  }

  if (q.includes("zanabûn")) {
    return {
      answer: `
        <h3>Zanabûn</h3>
        <p>
          Zanabûn, bilginin nasıl doğrulanacağını açıklayan epistemolojik ilkedir.
          Gözlem, yapısal tutarlılık ve katmanlar arası doğrulama birlikte ele alınır.
        </p>
        <p>
          Bu nedenle sadece bir iddia yetmez; iddianın yapı ve sonuç düzeyinde de
          tutarlı olması gerekir.
        </p>
      `,
      followups: [
        "Zanabûn ile modern bilim ilişkisi nedir?",
        "İki bilen doğrulama ilkesi nedir?",
        "Zanabûn neden sadece gözleme dayanmaz?"
      ]
    };
  }

  if (q.includes("mabûn")) {
    return {
      answer: `
        <h3>Mabûn</h3>
        <p>
          Mabûn, ekonomi ve yapısal sorumluluk arasındaki dengeyi açıklayan modeldir.
          Burada ekonomi sadece üretim değil; bilgi, sorumluluk ve düzen ilişkisidir.
        </p>
      `,
      followups: [
        "Mabûn ekonomi modeli nasıl çalışır?",
        "Mabûn ile adalet ilişkisi nedir?",
        "Mabûn güncel sisteme nasıl uygulanır?"
      ]
    };
  }

  if (q.includes("rasterast")) {
    return {
      answer: `
        <h3>Rasterast</h3>
        <p>
          Rasterast, tutarlılık filtreleme yöntemidir.
          Bir yapının geçerliliği; ontoloji, epistemoloji, yapı ve sonuç uyumu üzerinden değerlendirilir.
        </p>
        <p>
          Anlatı yapının önüne geçerse sistem reddedilir; yapı gerçekliği taşıyamazsa sistem çöker.
        </p>
      `,
      followups: [
        "Rasterast ile analiz nasıl yapılır?",
        "Tutarlılık filtreleme örneği ver",
        "Rasterast ile ideoloji nasıl ayrılır?"
      ]
    };
  }

  if (q.includes("newroza kawa")) {
    return {
      answer: `
        <h3>Newroza Kawa</h3>
        <p>
          Newroza Kawa, medeniyet katmanını temsil eder.
          Ontoloji, bilgi, etik ve güç arasındaki uyumu medeniyet istikrarı üzerinden okur.
        </p>
      `,
      followups: [
        "Newroza Kawa medeniyet modeli nedir?",
        "Medeniyet istikrarı nasıl ölçülür?",
        "Etik ve güç dengesi nasıl kurulur?"
      ]
    };
  }

  return {
    answer: `
      <h3>Soru işlendi</h3>
      <p>
        <strong>Sorun:</strong> ${escapeHtml(question)}
      </p>
      <p>
        Bu arayüz şu an yerel cevap akışıyla çalışıyor.
        Gerçek AI backend bağlandığında burada canlı model cevabı görünecek.
      </p>
    `,
    followups: [
      "Bunu daha derin açıkla",
      "Bilimsel çerçevede değerlendir",
      "Bunu modern sistemle karşılaştır"
    ]
  };
}

async function askQuestion() {
  if (!questionInput || !answerBox) return;

  const question = questionInput.value.trim();

  if (!question) {
    setAnswer("Lütfen önce bir soru yaz.");
    if (followupsWrap) followupsWrap.style.display = "none";
    return;
  }

  if (askBtn) askBtn.disabled = true;
  showThinking();
  setAnswer("Cevap hazırlanıyor...");

  try {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const result = buildMockAnswer(question);
    setAnswer(result.answer);
    renderFollowups(result.followups);
  } catch (error) {
    setAnswer("Bir hata oluştu. Lütfen tekrar dene.");
    if (followupsWrap) followupsWrap.style.display = "none";
    console.error(error);
  } finally {
    hideThinking();
    if (askBtn) askBtn.disabled = false;
  }
}

if (askBtn) {
  askBtn.addEventListener("click", askQuestion);
}

if (questionInput) {
  questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      askQuestion();
    }
  });
}
