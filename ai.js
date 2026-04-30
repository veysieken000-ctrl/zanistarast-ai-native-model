/* ZANISTARAST AI ENGINE — CLEAN FINAL */

(function () {
  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("ğ", "g")
      .replaceAll("ü", "u")
      .replaceAll("ş", "s")
      .replaceAll("ö", "o")
      .replaceAll("ç", "c")
      .trim();
  }

  const TOPICS = {
    rabun: {
      title: "Rabûn Yönetim Modeli",
      keys: ["rabun", "yonetim", "merkez", "cevre", "bag", "olcu", "amac"],
      links: [
        ["core-02.html", "Core 02 — Varlık Yönetim Düzeni"],
        ["core-07-hukuk.html", "Core 07 — Hukuk Felsefesi"],
        ["core-08-insan-ve-toplum.html", "Core 08 — İnsan ve Toplum"]
      ],
      questions: [
        "Merkez-çevre ilişkisi nasıl kurulur?",
        "Rabûn yönetim modeli nedir?",
        "Bağ, ölçü ve amaç olmazsa sistem neden bozulur?"
      ],
      answer: `
Rabûn, Hebûn ontolojik düzeninin yönetim modelidir. Bir varlık, toplum veya sistem doğru çalışacaksa merkez, çevre, bağ, ölçü ve amaç ilişkisi kurulmalıdır.

Merkez, sistemi anlamlandıran odaktır. Çevre, merkezin varlık alanıdır. Bağ, merkez ile çevre arasındaki ilişkiyi kurar. Ölçü, bu ilişkinin bozulmasını engeller. Amaç ise sistemin yönünü belirler.

Bu yüzden merkez olmadan sistem dağılır; çevre olmadan merkez kapanır; bağ olmadan ilişki kopar; ölçü olmadan düzen bozulur; amaç olmadan sistem anlamını kaybeder.

Zanistarast bilimsel sentezine göre Rabûn yalnızca siyasal yönetim değildir. Varlığın, toplumun, bilginin, hukukun, ekonominin ve medeniyetin düzenli işlemesini sağlayan bağ modelidir.
`
    },

    zanabun: {
      title: "Zanabûn Bilgi Sistemi",
      keys: ["zanabun", "bilgi", "bilim", "dogru", "dogrulama", "hakikat", "yontem"],
      links: [
        ["core-03.html", "Core 03 — Akıl ve Bilginin Varlığı"],
        ["core-06-bilim.html", "Core 06 — Bilim"],
        ["ontology.html", "Ontology"]
      ],
      questions: [
        "Bilim neden bozulur?",
        "Doğru bilgi nasıl doğrulanır?",
        "Zanabûn bilgi sistemi nedir?"
      ],
      answer: `
Zanabûn, bilginin oluşum ve doğrulama düzenidir. Bilgi yalnızca veri değildir; varlık, tanıklık, akıl, ahlak, hüküm ve gerçeklik ilişkisi içinde anlam kazanır.

Bilim bozulduğunda bunun sebebi yalnızca yöntem eksikliği değildir. Bilgi varlıktan koparsa soyut iddiaya dönüşür. Ahlaktan koparsa araçsallaşır. Hükümden koparsa etkisiz kalır. Hakikatten koparsa ideolojiye dönüşür.

Zanistarast bilimsel sentezine göre doğru bilgi; Hebûn düzeninde konumlandırılır, Zanabûn içinde doğrulanır, Rabûn modeliyle işlev kazanır ve medeniyet düzenine katkı verir.
`
    },

    mabun: {
      title: "Mabûn / Yaşam Temelli Ekonomi",
      keys: ["mabun", "mabûn", "ekonomi", "para", "uretim", "emek", "rizik", "paylasim"],
      links: [
        ["core-12-yasam-temelli-ekonomi.html", "Core 12 — Yaşam Temelli Ekonomi"],
        ["core-13-zanistarast-medeniyet-modeli.html", "Core 13 — Zanistarast Medeniyet Modeli"],
        ["paper.html", "Paper"]
      ],
      questions: [
        "Mabûn nedir?",
        "Ekonomi neden yalnızca para değildir?",
        "Yaşam temelli ekonomi nasıl kurulur?"
      ],
      answer: `
Mabûn, Zanistarast bilimsel sentezinde yaşam temelli ekonomi anlayışıdır. Ekonomi yalnızca para, pazar, üretim veya tüketim değildir. Ekonomi; rızık, ihtiyaç, emek, paylaşım, denge ve medeniyet sürekliliğiyle ilgilidir.

Mabûn’a göre üretim yaşamdan koparsa sömürüye dönüşür. Paylaşım dengeden koparsa adaletsizlik üretir. İhtiyaç ölçüsüzleşirse israf doğar. Emek değersizleşirse toplumun varlık zemini zayıflar.

Bu yüzden Mabûn, ekonomiyi yalnızca piyasa düzeni olarak değil; insan, aile, toplum, doğa ve medeniyet arasındaki yaşam dengesi olarak okur.
`
    },

    medeniyet: {
      title: "Zanistarast Medeniyet Modeli",
      keys: ["medeniyet", "uygarlik", "toplum", "newroza", "kawa"],
      links: [
        ["core-13-zanistarast-medeniyet-modeli.html", "Core 13 — Zanistarast Medeniyet Modeli"],
        ["core-08-insan-ve-toplum.html", "Core 08 — İnsan ve Toplum"],
        ["core-12-yasam-temelli-ekonomi.html", "Core 12 — Yaşam Temelli Ekonomi"]
      ],
      questions: [
        "Medeniyet nedir?",
        "Toplum nasıl kurulur?",
        "Newroza Kawa uygarlığı hangi temele dayanır?"
      ],
      answer: `
Medeniyet, yalnızca şehir, teknoloji, devlet veya kültür değildir. Zanistarast bilimsel sentezinde medeniyet; varlık, bilgi, ahlak, hukuk, ekonomi ve yönetim düzeninin birlikte çalışmasıdır.

Sağlam medeniyet için ontolojik temel, doğru bilgi düzeni, ahlaki merkez, ekonomik denge ve yönetim modeli gerekir.

Bu nedenle medeniyet modeli, insanın Hebûn düzenine göre kendisini, ailesini, toplumunu, doğayı ve tarihi anlamlandırmasıyla kurulur.
`
    },

    hebun: {
      title: "Hebûn Ontolojik Düzeni",
      keys: ["hebun", "hebûn", "varlik", "ontoloji", "katman"],
      links: [
        ["core-01.html", "Core 01 — Varlık Sistemleri ve Boyutları"],
        ["core-02.html", "Core 02 — Varlık Yönetim Düzeni"],
        ["ontology.html", "Ontology"]
      ],
      questions: [
        "Hebûn nedir?",
        "Varlık kaç katmandır?",
        "Varlık sistemleri nasıl açıklanır?"
      ],
      answer: `
Hebûn, Zanistarast bilimsel sentezinde varlığın temel ontolojik düzenidir. Varlık yalnızca var olan şeylerin toplamı değildir; fiziksel, biyolojik, zihinsel, toplumsal, ruhsal ve üst katmanların birbirine bağlandığı düzenli bir bütündür.

Hebûn düzeninde her şey bir katman, bağ ve anlam ilişkisi içinde değerlendirilir. Bu yüzden varlık kopuk değil; merkez, çevre, bağ, ölçü ve amaç ilişkisi içinde işler.
`
    }
  };

  function detectTopic(question) {
    const q = normalizeText(question);

    const order = ["rabun", "zanabun", "mabun", "medeniyet", "hebun"];

    for (const id of order) {
      if (TOPICS[id].keys.some(key => q.includes(normalizeText(key)))) {
        return TOPICS[id];
      }
    }

    return null;
  }

  function buildLinks(topic) {
    if (!topic || !topic.links) return "";

    return `
<h3>İlgili Okuma Bağlantıları</h3>
<ul>
${topic.links.map(([url, label]) => `<li><a href="${url}">${label}</a></li>`).join("")}
</ul>`;
  }

  function buildQuestions(topic) {
    const list = topic && topic.questions ? topic.questions : [
      "Bu konu hangi varlık katmanına girer?",
      "Bu konuda bilgi nasıl doğrulanır?",
      "Bu mesele Rabûn yönetim modeliyle nasıl açıklanır?"
    ];

    return `
<h3>Önerilen Sorular</h3>
<ul>
${list.map(q => `<li><button type="button" class="ai-suggestion">${q}</button></li>`).join("")}
</ul>`;
  }

  function buildSmartSuggestions(question) {
  const q = normalizeText(question);

  let suggestions = [];

  if (q.includes("merkez") || q.includes("cevre") || q.includes("bag")) {
    suggestions = [
      ["core-02.html", "Core 02 — Varlık Yönetim Düzeni"],
      ["core-07-hukuk.html", "Core 07 — Hukuk"],
      ["core-08-insan-ve-toplum.html", "Core 08 — İnsan ve Toplum"]
    ];
  }
function buildExpansion(question, topic) {
  if (!question) return "";

  const title = topic ? topic.title : "Genel Zanistarast Analizi";

  return `
<h3>Akıllı Genişleme</h3>
<p>Bu soru doğrudan <strong>${title}</strong> alanına bağlanır. Ancak Zanistarast bilimsel sentezinde hiçbir konu tek başına kapanmaz; her mesele Hebûn ontolojik düzeni, Zanabûn bilgi sistemi ve Rabûn yönetim modeli üzerinden birlikte okunur.</p>

<p>Bu yüzden cevap yalnızca tanım düzeyinde kalmaz. Önce konunun hangi varlık katmanında durduğu belirlenir; sonra bu bilginin nasıl doğrulanacağı, hangi bağları kurduğu ve insan-toplum-medeniyet düzenine nasıl yansıdığı açıklanır.</p>

<p>Bu genişleme, soruyu daha ileri okumak için bir geçiş noktası yapar: ilgili makalelerden biri okunmalı, ardından önerilen sorularla aynı konu derinleştirilmelidir.</p>
`;
}
  return `
  <h3>Akıllı Makale Önerisi</h3>
  <ul>
    ${suggestions.map(q => `
      <li>
        <button type="button" class="ai-suggestion">${q}</button>
      </li>
    `).join("")}
  </ul>
  `;
}
  else if (q.includes("bilim") || q.includes("bilgi")) {
    suggestions = [
      ["core-06-bilim.html", "Core 06 — Bilim"],
      ["core-03.html", "Core 03 — Bilgi ve Akıl"],
      ["ontology.html", "Ontology"]
    ];
  }

  else if (q.includes("ekonomi") || q.includes("mabun")) {
    suggestions = [
      ["core-12-yasam-temelli-ekonomi.html", "Core 12 — Yaşam Temelli Ekonomi"],
      ["core-13-zanistarast-medeniyet-modeli.html", "Medeniyet Modeli"]
    ];
  }

  else if (q.includes("toplum") || q.includes("medeniyet")) {
    suggestions = [
      ["core-08-insan-ve-toplum.html", "İnsan ve Toplum"],
      ["core-13-zanistarast-medeniyet-modeli.html", "Medeniyet Modeli"]
    ];
  }

  else {
    suggestions = [
      ["core.html", "Core Makaleler"],
      ["paper.html", "Paper"]
    ];
  }

  return `
<h3>🔎 Akıllı Makale Önerisi</h3>
<ul>
${suggestions.map(([url, label]) => `<li><a href="${url}">${label}</a></li>`).join("")}
</ul>
`;
}

  function buildFrameworkAnswer(question) {
    const q = question || "";
    const topic = detectTopic(q);

    if (topic) {
      return `
<h2>${topic.title}</h2>
<p><strong>Soru:</strong> ${q}</p>

${topic.answer}
${buildExpansion(q, topic)}
<h3>Zanistarast Bilimsel Sentezine Göre Yorum</h3>
<p>Bu mesele önce Hebûn ontolojik düzeni içinde konumlandırılır. Çünkü hiçbir konu yalnız başına, kopuk veya rastgele değildir. Her konu bir varlık katmanına, bir bilgi düzenine, bir yönetim ilişkisine ve bir medeniyet sonucuna bağlıdır.</p>

<p>İkinci aşamada konu Zanabûn bilgi sistemi açısından değerlendirilir. Burada amaç yalnızca bilgi vermek değil; bilginin doğru, tutarlı, anlamlı ve varlıkla uyumlu olup olmadığını göstermektir.</p>

<p>Üçüncü aşamada konu Rabûn yönetim modeli ile açıklanır. Merkez, çevre, bağ, ölçü ve amaç kurulmadan hiçbir sistem tamamlanmış sayılmaz.</p>

${buildLinks(topic)}
${buildQuestions(topic)}
${buildSmartSuggestions(q)}
`;
    }

    return `
<h2>Zanistarast Bilimsel Analizi</h2>
<p><strong>Soru:</strong> ${q}</p>

<p>Bu konu Zanistarast bilimsel sentezinde tek başına ve parçalı biçimde ele alınmaz. Önce Hebûn ontolojik düzeninde konumlandırılır, sonra Zanabûn bilgi sistemiyle anlamı ve doğruluğu değerlendirilir, ardından Rabûn yönetim modeliyle işleyişi açıklanır.</p>

${buildLinks(null)}
${buildQuestions(null)}
`;
  }

  window.getZanistarastAnswer = function (question) {
    return buildFrameworkAnswer(question);
  };

  window.askAI = function (question) {
    const answerBox = document.getElementById("answerBox");
    const answer = buildFrameworkAnswer(question || "");

    if (answerBox) {
      answerBox.innerHTML = answer;
    }

    return answer;
  };

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".ai-suggestion");
    if (!btn) return;

    const input = document.getElementById("questionInput");
    const question = btn.textContent.trim();

    if (input) input.value = question;
    window.askAI(question);
  });

  window.ZanistarastAI = {
    ask: buildFrameworkAnswer,
    normalize: normalizeText,
    topics: TOPICS
  };

  console.log("✅ Zanistarast AI Engine loaded");
})();
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("ai-suggestion")) {
    const text = e.target.innerText;

    const input = document.querySelector("input, textarea");
    if (input) input.value = text;

    if (window.askAI) {
      window.askAI(text);
    }
  }
});

