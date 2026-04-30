/*
  ZANISTARAST AI ENGINE — FINAL CLEAN VERSION
  Works with:
  1) paper.html answerBox
  2) speech.html getZanistarastAnswer()
*/

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

  const TOPICS = [
    {
      id: "hebul",
      keys: ["hebun", "hebin", "varlik", "ontoloji", "katman", "boyut"],
      title: "Hebûn Ontolojik Düzeni",
      links: [
        ["core-01.html", "Core 01 — Varlık Sistemleri ve Boyutları"],
        ["core-02.html", "Core 02 — Varlık Yönetim Düzeni"],
        ["ontology.html", "Ontology"]
      ],
      questions: [
        "Hebûn nedir?",
        "Varlık kaç katmandan oluşur?",
        "Merkez-çevre ilişkisi varlıkta nasıl işler?"
      ],
      answer: `
Hebûn, Zanistarast bilimsel sentezinde varlığın temel ontolojik düzenidir. Varlık yalnızca “var olan şeyler” toplamı değildir; fiziksel, biyolojik, zihinsel, toplumsal, ruhsal ve üst katmanların birbirine bağlandığı düzenli bir bütündür.

Bu bakışta varlık tek başına, kopuk veya rastgele ele alınmaz. Her varlık bir merkez, çevre, bağ, ölçü ve amaç ilişkisi içinde anlaşılır. Bu yüzden Hebûn düzeni, yalnızca ontoloji değil, aynı zamanda bilginin, ahlakın, yönetimin ve medeniyetin temel zeminidir.

Zanistarast’a göre bir konu doğru anlaşılacaksa önce hangi varlık katmanına ait olduğu belirlenmelidir. Fiziksel düzeyde işleyen bir olay, biyolojik düzeyde aynı anlama gelmez; zihinsel veya toplumsal düzeye geçtiğinde yeni anlam katmanları kazanır. Bu yüzden Hebûn, bütün sistemi taşıyan ana iskelettir.
`
    },
    {
      id: "rabun",
      keys: ["rabun", "rabûn", "yonetim", "duzen", "merkez", "cevre", "bag"],
      title: "Rabûn Yönetim Modeli",
      links: [
        ["core-02.html", "Core 02 — Varlık Yönetim Düzeni"],
        ["core-07-hukuk.html", "Core 07 — Hukuk Felsefesi"],
        ["core-13-zanistarast-medeniyet-modeli.html", "Core 13 — Medeniyet Modeli"]
      ],
      questions: [
        "Rabûn yönetim modeli nedir?",
        "Merkez, çevre ve bağ nasıl kurulur?",
        "Yönetim neden sadece iktidar değildir?"
      ],
      answer: `
Rabûn, Hebûn ontolojik düzeninin yönetim modelidir. Bir varlığın, toplumun veya sistemin doğru işlemesi için merkez, çevre, bağ, ölçü ve amaç ilişkisi kurulmalıdır.

Bu modele göre yönetim yalnızca emir vermek, kontrol etmek veya iktidar kullanmak değildir. Yönetim; varlığı koruyan, çevreyle ilişki kuran, ölçüyü bozmayan ve amacı kaybettirmeyen düzen kurma faaliyetidir.

Merkez olmazsa sistem dağılır. Çevre olmazsa merkez kapanır. Bağ olmazsa ilişki kopar. Ölçü olmazsa düzen bozulur. Amaç olmazsa sistem anlamını kaybeder. Bu yüzden Rabûn yönetim modeli, Zanistarast sisteminde hukuk, siyaset, toplum, ekonomi ve medeniyet açıklamalarının temel omurgasıdır.
`
    },
    {
      id: "zanabun",
      keys: ["zanabun", "zanabûn", "bilgi", "bilim", "hakikat", "dogruluk", "epistemoloji"],
      title: "Zanabûn Bilgi Sistemi",
      links: [
        ["core-03.html", "Core 03 — Akıl ve Bilginin Varlığı"],
        ["core-06-bilim.html", "Core 06 — Bilim"],
        ["paper.html", "Paper"]
      ],
      questions: [
        "Bilgi nasıl doğrulanır?",
        "Bilim neden bozulur?",
        "Hakikat ile veri arasındaki fark nedir?"
      ],
      answer: `
Zanabûn, Zanistarast sisteminde bilginin oluşum ve doğrulama düzenidir. Bilgi yalnızca veri değildir; varlıkla, tanıklıkla, ahlakla, hükümle ve gerçeklikle ilişkisi içinde anlam kazanır.

Bu nedenle doğru bilgi, sadece zihinsel bir kabul değil; varlık düzenine uygun, sınanabilir, tutarlı ve anlamlı bir yapıdır. Bilgi varlıktan koparsa soyut iddiaya dönüşür. Ahlaktan koparsa araçsallaşır. Hükümden koparsa etkisiz kalır. Hakikatten koparsa yanıltıcı olur.

Zanistarast bilimsel sentezi içinde bilgi, Hebûn düzeninde konumlandırılır, Zanabûn içinde doğrulanır ve Rabûn modeliyle işlevsel hale getirilir.
`
    },
    {
      id: "tarih",
      keys: ["tarih", "varlik tarihi", "kurdistan", "ortadogu", "medeniyet tarihi", "gecmis"],
      title: "Varlık Tarihi",
      links: [
        ["makale-11-varlik-tarihi.html", "Makale 11 — Varlık Tarihi"],
        ["core-09-kurdistan-ortadogu-varlik-tarihi.html", "Core 09 — Kürdistan, Ortadoğu ve Varlık Tarihi"],
        ["core-07-hukuk.html", "Core 07 — Hukuk Felsefesi"]
      ],
      questions: [
        "Tarih neden sadece olay değildir?",
        "Ahlak ile hüküm tarihi nasıl kurar?",
        "Varlık tarihi insanı nasıl açıklar?"
      ],
      answer: `
Zanistarast yaklaşımında tarih, yalnızca olayların zaman içindeki dizilişi değildir. Tarih; varlığın, bilginin, ahlakın ve hükmün insan toplulukları üzerinde görünür hale gelme sürecidir.

Bu yüzden Varlık Tarihi, “ne oldu?” sorusundan önce “hangi düzen kuruldu, hangi denge bozuldu, hangi özne ortaya çıktı?” sorusunu sorar. Tarihin merkezinde bilen özne, ahlaki sorumluluk, hüküm düzeni ve medeniyetin kurulma/çözülme ilişkisi vardır.

Bir toplumun yükselişi yalnızca güçle açıklanamaz; bilgi, ahlak, yönetim, ekonomi ve anlam düzeni birlikte çalıştığında medeniyet oluşur. Çöküş de yalnızca askeri yenilgi değildir; ahlak-hüküm-bilgi-ekonomi bağının kopmasıdır.
`
    },
    {
      id: "medeniyet",
      keys: ["medeniyet", "uygarlik", "newroz", "kawa", "toplum", "insan"],
      title: "Zanistarast Medeniyet Modeli",
      links: [
        ["core-13-zanistarast-medeniyet-modeli.html", "Core 13 — Zanistarast Medeniyet Modeli"],
        ["core-08-insan-ve-toplum.html", "Core 08 — İnsan ve Toplum"],
        ["paper.html", "Paper"]
      ],
      questions: [
        "Medeniyet nedir?",
        "Toplum nasıl kurulur?",
        "Newroza Kawa uygarlığı hangi temele dayanır?"
      ],
      answer: `
Medeniyet, Zanistarast bilimsel sentezinde yalnızca şehir, teknoloji, devlet veya kültür değildir. Medeniyet; insanın Hebûn düzenine göre kendini, ailesini, toplumunu, bilgisini, ahlakını, hukukunu ve ekonomisini bir bütün içinde kurmasıdır.

Sağlam medeniyet için ontolojik temel, doğru bilgi düzeni, ahlaki merkez, ekonomik denge ve yönetim modeli gerekir. Bunlardan biri koparsa medeniyet dışarıdan güçlü görünse bile içeriden çözülür.

Bu nedenle Zanistarast medeniyet modeli, varlık düzeni ile toplumsal düzen arasında bağ kurar. İnsan yalnızca birey değil; aile, toplum, tarih ve gelecek taşıyan bir varlık olarak ele alınır.
`
    }
  ];

  function detectTopic(question) {
    const q = normalizeText(question);
    return TOPICS.find(topic => topic.keys.some(key => q.includes(key))) || null;
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
${list.map(q => `<li>${q}</li>`).join("")}
</ul>`;
  }

  function buildFrameworkAnswer(question) {
    const topic = detectTopic(question);

    const title = topic ? topic.title : "Zanistarast Bilimsel Analizi";
    const coreAnswer = topic ? topic.answer : `
Bu konu Zanistarast bilimsel sentezinde tek başına ve parçalı biçimde ele alınmaz. Önce Hebûn ontolojik düzeninde konumlandırılır; sonra Zanabûn bilgi sistemiyle anlamı ve doğruluğu değerlendirilir; ardından Rabûn yönetim modeliyle işleyişi açıklanır.

Bu yaklaşımda her soru, varlık, bilgi, ahlak, yönetim, ekonomi ve medeniyet ilişkisi içinde okunur. Bir kavramın değeri yalnızca tanımında değil; hangi katmana ait olduğu, hangi bağları kurduğu ve hangi düzeni güçlendirdiği üzerinden anlaşılır.
`;

    return `
<h2>${title}</h2>

<p><strong>Soru:</strong> ${question}</p>

${coreAnswer}

<h3>Zanistarast Bilimsel Sentezine Göre Yorum</h3>

<p>Bu mesele önce <strong>Hebûn ontolojik düzeni</strong> içinde konumlandırılır. Çünkü hiçbir konu yalnız başına, kopuk ve rastgele değildir. Her konu bir varlık katmanına, bir bilgi düzenine, bir yönetim ilişkisine ve bir medeniyet sonucuna bağlıdır.</p>

<p>İkinci aşamada konu <strong>Zanabûn bilgi sistemi</strong> açısından değerlendirilir. Burada amaç yalnızca bilgi vermek değil; bilginin doğru, tutarlı, anlamlı ve varlıkla uyumlu olup olmadığını göstermektir.</p>

<p>Üçüncü aşamada konu <strong>Rabûn yönetim modeli</strong> ile açıklanır. Merkez, çevre, bağ, ölçü ve amaç kurulmadan hiçbir sistem tamamlanmış sayılmaz. Bu nedenle yönetim yalnızca siyaset değil; varlığı koruyan düzen kurma biçimidir.</p>

<p>Sonuç olarak bu konu; varlık, bilgi, ahlak, hüküm, ekonomi, toplum ve medeniyet bütünlüğü içinde değerlendirilmelidir. Zanistarast sistemi, parçaları ayrı ayrı değil, birbirine bağlı bir düzen halinde okur.</p>

${buildLinks(topic)}
${buildQuestions(topic)}
`;
  }
window.getZanistarastAnswer = function (question) {
  return buildFrameworkAnswer(question);
};

window.askAI = function (question) {
  const answerBox = document.getElementById("answerBox");
  const answer = buildFrameworkAnswer(question || "");

  if (answerBox) {
    const formatted = answer
      .replaceAll("\n\n", "</p><p>")
      .replaceAll("\n", "<br>");

    answerBox.innerHTML = "<p>" + formatted + "</p>";
  }

  return answer;
};

window.ZanistarastAI = {
  ask: buildFrameworkAnswer,
  normalize: normalizeText,
  topics: TOPICS
};

console.log("✅ Zanistarast AI Engine loaded");
})();

 
