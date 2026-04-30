/* =====================================================
   ZANISTARAST AI ENGINE — STRONG VERSION
   Works with:
   1) paper.html answerBox
   2) speech.html getZanistarastAnswer()
===================================================== */

(function () {
  function normalizeText(text) {
    return String(text || "")
      .toLowerCase()
      .replaceAll("ı", "i")
      .replaceAll("î", "i")
      .replaceAll("ê", "e")
      .replaceAll("û", "u")
      .replaceAll("ü", "u")
      .replaceAll("ö", "o")
      .replaceAll("ş", "s")
      .replaceAll("ğ", "g")
      .replaceAll("ç", "c")
      .trim();
  }

  const CORE = {
    hebun: {
      title: "Hebûn Ontolojik Düzeni",
      answer: `Hebûn, Zanistarast bilimsel sentezinde varlığın ontolojik düzenidir.

Hebûn; varlığı tek tek parçalar olarak değil, katmanlı ve ilişkisel bir bütün olarak yorumlar. Fiziksel, biyolojik, zihinsel, ruhsal ve daha üst varlık katmanları birbirinden kopuk değildir.

Zanistarast’a göre Hebûn:
1. Varlığın temel düzenidir.
2. Merkez–çevre ilişkisiyle işler.
3. Alt katman üst katmanın taşıyıcısıdır.
4. İnsan, toplum ve medeniyet bu düzen içinde anlaşılır.
5. Bilgi ancak varlık düzenine bağlandığında doğru yorumlanır.`
    },

    rabun: {
      title: "Rabûn Yönetim Modeli",
      answer: `Rabûn, Hebûn ontolojik düzeninin yönetim modelidir.

Bir varlığın, toplumun veya sistemin doğru çalışması için merkez, çevre, bağ, ölçü ve amaç ilişkisi kurulmalıdır.

Rabûn’a göre yönetim:
1. Merkezsiz olamaz.
2. Çevresiz tamamlanamaz.
3. Bağ olmadan dağılır.
4. Ölçü olmadan bozulur.
5. Amaç olmadan anlamını kaybeder.`
    },

    zanabun: {
      title: "Zanabûn Bilgi Düzeni",
      answer: `Zanabûn, Zanistarast sisteminde bilginin oluşum ve doğrulama düzenidir.

Bilgi sadece veri değildir. Bilgi; varlık, tanıklık, ahlak, hüküm ve gerçeklik ilişkisi içinde anlam kazanır.

Zanabûn’a göre:
1. Bilgi varlıktan kopamaz.
2. Tanıklık bilgiyi güçlendirir.
3. Ahlak bilgiyi yönlendirir.
4. Hüküm bilgiyi sonuçlandırır.
5. Hakikat bilgiyi tamamlar.`
    },

    medeniyet: {
      title: "Medeniyet Modeli",
      answer: `Zanistarast bilimsel sentezinde medeniyet; insan, toplum, ekonomi, hukuk, ahlak ve varlık düzeninin birleşmiş üst sistemidir.

Medeniyet yalnızca şehir, teknoloji veya devlet değildir. Medeniyet; insanın Hebûn düzenine göre kendini, ailesini, toplumunu ve dünyayı düzenlemesidir.

Sağlam medeniyet için:
1. Ontolojik temel gerekir.
2. Bilgi düzeni gerekir.
3. Ahlaki merkez gerekir.
4. Ekonomik denge gerekir.
5. Yönetim modeli gerekir.`
    },

    mabun: {
      title: "Mabûn / Yaşam Temelli Ekonomi",
      answer: `Mabûn, Zanistarast bilimsel sentezinde yaşam temelli ekonomi anlayışıdır.

Ekonomi yalnızca para, pazar ve üretim değildir. Ekonomi; rızık, ihtiyaç, emek, paylaşım, denge ve medeniyet sürekliliğiyle ilgilidir.

Mabûn’a göre ekonomi:
1. Yaşamı merkeze alır.
2. İhtiyacı israftan ayırır.
3. Üretimi ahlakla bağlar.
4. Paylaşımı dengeye oturtur.
5. Toplumu sömürüden korur.`
    }
  };

  function detectTopic(q) {
    if (q.includes("hebun") || q.includes("hebûn") || q.includes("varlik")) return "hebun";
    if (q.includes("rabun") || q.includes("rabûn") || q.includes("yonetim")) return "rabun";
    if (q.includes("zanabun") || q.includes("zanabûn") || q.includes("bilgi")) return "zanabun";
    if (q.includes("medeniyet") || q.includes("uygarlik")) return "medeniyet";
    if (q.includes("mabun") || q.includes("mabûn") || q.includes("ekonomi")) return "mabun";
    return null;
  }

  function buildFrameworkAnswer(question) {
    const q = normalizeText(question);
    const topic = detectTopic(q);

    if (topic && CORE[topic]) {
      return `${CORE[topic].title}

${CORE[topic].answer}

Zanistarast yorumu:
Bu konu önce Hebûn ontolojik düzeninde konumlandırılır. Sonra merkez–çevre bağı kurulur. Ardından Rabûn yönetim modeliyle işleyişi açıklanır.`;
    }

    return `Zanistarast bilimsel sentezine göre bu soru şöyle yorumlanır:

Soru: ${question}

1. Önce konu Hebûn ontolojik düzeninde konumlandırılır.
2. Hangi katmana ait olduğu belirlenir: fiziksel, biyolojik, zihinsel, toplumsal veya ruhsal.
3. Merkez–çevre ilişkisi kurulur.
4. Rabûn yönetim modeliyle işleyişi açıklanır.
5. Zanabûn bilgi düzeniyle doğruluk ve anlam kontrol edilir.

Sonuç:
Bu konu Zanistarast sisteminde yalnız başına değil, varlık, bilgi, ahlak, yönetim ve medeniyet bütünlüğü içinde değerlendirilmelidir.`;
  }

  window.getZanistarastAnswer = function (question) {
    return buildFrameworkAnswer(question);
  };

  window.askAI = function (question) {
    const answerBox = document.getElementById("answerBox");
    const answer = buildFrameworkAnswer(question);

    if (answerBox) {
      answerBox.innerHTML = answer
        .replaceAll("\n\n", "<br><br>")
        .replaceAll("\n", "<br>");
    }

    return answer;
  };

  window.ZanistarastAI = {
    ask: buildFrameworkAnswer,
    normalize: normalizeText,
    core: CORE
  };

  console.log("✅ Zanistarast AI Engine loaded");
})();

window.askAI = function(question) {
  const answerBox = document.getElementById("answerBox");

  if (!question || !question.trim()) {
    answerBox.innerHTML = "Lütfen bir soru yaz.";
    return;
  }

  const q = question.toLowerCase();

  // === ANA ANALİZ ===
  let analysis = `
    <h3>Zanistarast Bilimsel Analizi</h3>

    <p><strong>${question}</strong> konusu Zanistarast bilimsel sentezinde parçalı değil; varlık, bilgi ve düzen bütünlüğü içinde ele alınır.</p>

    <h4>1. Hebûn Ontolojik Düzeni</h4>
    <p>Bu konu önce Hebûn ontolojik düzeninde konumlandırılır. Varlık; fiziksel, biyolojik, zihinsel ve toplumsal katmanların merkez–çevre ilişkisiyle kurduğu bir bütündür.</p>

    <h4>2. Zanabûn Bilgi Sistemi</h4>
    <p>Bilgi bu konu içinde sadece veri değil; doğrulanabilir, anlamlı ve varlıkla uyumlu bir yapı olarak değerlendirilir.</p>

    <h4>3. Rabûn Yönetim Modeli</h4>
    <p>Her yapı merkez, çevre ve bağ üzerinden işler. Bu konu da bu üçlü sistem içinde analiz edilir.</p>

    <h4>4. Medeniyet Sonucu</h4>
    <p>Bu konu insan, toplum ve medeniyet düzenine nasıl yansıdığı üzerinden tamamlanır.</p>
  `;

  // === DİNAMİK KONU TESPİTİ ===
  let links = "";
  let suggestions = "";

  // === TARİH ===
  if (q.includes("tarih")) {
    analysis += `
      <h4>Derin Yorum</h4>
      <p>Zanistarast yaklaşımında tarih, olaylar dizisi değil; varlığın, bilginin ve ahlakın insan üzerinden görünür hale gelmesidir.</p>
    `;

    links = `
      <h4>İlgili Makaleler</h4>
      <ul>
        <li><a href="core-09-kurdistan-ortadogu-varlik-tarihi.html">Varlık Tarihi</a></li>
        <li><a href="core-07-hukuk.html">Hüküm ve Ahlak</a></li>
        <li><a href="core-08-insan-ve-toplum.html">İnsan ve Toplum</a></li>
      </ul>
    `;

    suggestions = `
      <h4>Önerilen Sorular</h4>
      <ul>
        <li>Tarih neden sadece olay değildir?</li>
        <li>Ahlak ve tarih ilişkisi nedir?</li>
        <li>Medeniyetler neden çöker?</li>
      </ul>
    `;
  }

  // === BİLİM ===
  else if (q.includes("bilim")) {
    analysis += `
      <h4>Derin Yorum</h4>
      <p>Bilim, Zanistarast'a göre doğayı anlamak değil; doğaya uygun sistem kurma sürecidir.</p>
    `;

    links = `
      <h4>İlgili Makaleler</h4>
      <ul>
        <li><a href="core-06-bilim.html">Bilim</a></li>
        <li><a href="core-03.html">Bilgi ve Akıl</a></li>
      </ul>
    `;

    suggestions = `
      <h4>Önerilen Sorular</h4>
      <ul>
        <li>Bilim neden bozulur?</li>
        <li>Doğru bilgi nasıl doğrulanır?</li>
      </ul>
    `;
  }

  // === VARLIK ===
  else if (q.includes("varlık") || q.includes("hebun")) {
    analysis += `
      <h4>Derin Yorum</h4>
      <p>Varlık, Zanistarast'ta parçalı değil; katmanlı ve bütünsel bir sistemdir.</p>
    `;

    links = `
      <h4>İlgili Makaleler</h4>
      <ul>
        <li><a href="core-01.html">Varlık Sistemleri</a></li>
        <li><a href="core-02.html">Varlık Yönetimi</a></li>
      </ul>
    `;

    suggestions = `
      <h4>Önerilen Sorular</h4>
      <ul>
        <li>Hebûn nedir?</li>
        <li>Varlık kaç katmandır?</li>
      </ul>
    `;
  }

  // === DEFAULT ===
  else {
    links = `
      <h4>İlgili Makaleler</h4>
      <ul>
        <li><a href="core.html">Core Makaleler</a></li>
        <li><a href="paper.html">Paper</a></li>
      </ul>
    `;

    suggestions = `
      <h4>Önerilen Sorular</h4>
      <ul>
        <li>Bu konu hangi varlık katmanına girer?</li>
        <li>Bilgi bu konuda nasıl doğrulanır?</li>
      </ul>
    `;
  }

  answerBox.innerHTML = `
    <h3>Zanistarast Analizi</h3>
    <p>Bu konu önce Hebûn ontolojik düzeninde konumlandırılır, sonra Zanabûn bilgi sistemi ve Rabûn yönetim modeliyle yorumlanır.</p>
  `;
};


