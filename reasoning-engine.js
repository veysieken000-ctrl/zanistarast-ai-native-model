function normalizeText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const ZANISTARAST_DOMAINS = {
  teknoloji: ["yapay zeka", "ai", "model", "algoritma", "robot", "veri", "kod"],
  saglik: ["sağlık", "hasta", "hastalık", "yaşlı", "çocuk", "bakım", "ilaç"],
  din: ["kur'an", "ayet", "hadis", "allah", "ehad", "dabbe", "ruh"],
  medeniyet: ["toplum", "medeniyet", "newroza", "kawa", "yönetim", "hukuk"],
  ontoloji: ["varlık", "hebûn", "zanabûn", "mabûn", "rabûn", "rasterast", "öz"],
  ahlak: ["ahlak", "vicdan", "merhamet", "şefkat", "adalet", "rahmet"]
};

function detectDomain(text) {
  let scores = {};

  for (const domain in ZANISTARAST_DOMAINS) {
    scores[domain] = 0;

    ZANISTARAST_DOMAINS[domain].forEach(word => {
      if (text.includes(word)) scores[domain]++;
    });
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][1] > 0 ? sorted[0][0] : "genel";
}

function detectIntent(text) {
  if (text.includes("nedir")) return "tanım";
  if (text.includes("nasıl")) return "açıklama";
  if (text.includes("neden")) return "sebep analizi";
  if (text.includes("makale") || text.includes("yazı")) return "makale";
  if (text.includes("eleştir")) return "eleştiri";
  if (text.includes("linkedin")) return "linkedin";
  if (text.includes("medium")) return "medium";
  return "analiz";
}

function classifyQuestion(question) {
  const text = normalizeText(question);

  return {
    original: question,
    clean: text,
    domain: detectDomain(text),
    intent: detectIntent(text),
    depth: text.length > 120 ? "derin" : "orta",
    zanistarastPath: []
  };
}

function hebunAnalysis(ctx) {
  return `
Hebûn yalnız ontolojik varlık sorusu gerçekten ilgiliyse ele alınır; bu durumda konunun varlık zemini araştırılır.
"${ctx.original}" sorusu yalnızca yüzeysel bir bilgi talebi değildir.
Önce bu konunun ne olduğu, hangi varlık alanına ait olduğu ve hangi bütün içinde anlam kazandığı belirlenmelidir.
`;
}

function zanabunAnalysis(ctx) {
  return `
Zanabûn, epistemik soru gerçekten ilgiliyse bu konunun nasıl bilinebileceğini araştırır.
Bilgi yalnızca veri toplamak değildir.
Bilgi; bağlamı, ilişkiyi, sebebi, sonucu ve insan üzerindeki etkisini birlikte kavramaktır.
`;
}

function mabunAnalysis(ctx) {
  return `
Mabûn yalnız ekonomi/değer/dolaşım alanı gerçekten ilgiliyse kendi alan terminolojisiyle ele alınır.
Bir bilgi insan, toplum, ahlak ve sistem içinde yerini bulmuyorsa eksik kalır.
Bu nedenle konu yalnızca teorik değil, düzen kurucu yönüyle de incelenmelidir.
`;
}

function rabunAnalysis(ctx) {
  return `
Rabûn yalnız yönetim/uygulama alanı gerçekten ilgiliyse kendi alan terminolojisiyle ele alınır.
Rabûn, Hebûn ontolojisinde zaten var olan düzenin insan dünyasında bilinçli ve yapay olarak kurulmuş hâlidir.
Bu nedenle her fikir, hayatta nasıl uygulanacağı bakımından değerlendirilmelidir.
`;
}

function rasterastValidation(ctx) {
  return `
Rasterast doğrulama metodolojisi, uygulanabildiği ölçüde şu soruları sorar:
Bu analiz açık mı?
Çelişki içeriyor mu?
Manipülasyon var mı?
İnsana, canlıya veya çevreye zarar veriyor mu?
Kanıt, karşı-delil, belirsizlik ve epistemik statü açıkça gösteriliyor mu?
`;
}

function newrozaImpact(ctx) {
  return `
Newroza Kawa bağlamı yalnız toplumsal/uygarlık etkisi gerçekten ilgiliyse ayrı bir yorum ve uygulama alanı olarak incelenir.
`;
}
function detectLengthPreference(text) {
  if (text.includes("kısa") || text.includes("özet")) return "short";
  if (text.includes("uzun") || text.includes("ayrıntılı") || text.includes("makale")) return "long";
  return "medium";
}

function extractTopic(ctx) {
  const t = ctx.clean;

  if (ctx.domain === "teknoloji") return "yapay zekâ ve teknoloji";
  if (ctx.domain === "saglik") return "sağlık ve insan bütünlüğü";
  if (ctx.domain === "din") return "Kur'an'ın katmanlı okuması";
  if (ctx.domain === "medeniyet") return "medeniyet ve toplum düzeni";
  if (ctx.domain === "ontoloji") return "varlık ve ontoloji";
  if (ctx.domain === "ahlak") return "ahlak ve vicdan";
  return t.slice(0, 80) || "genel mesele";
}

function classifyQuestion(question) {
  const text = normalizeText(question);

  const ctx = {
    original: question,
    clean: text,
    domain: detectDomain(text),
    intent: detectIntent(text),
    length: detectLengthPreference(text),
    depth: text.length > 120 ? "derin" : "orta",
    zanistarastPath: []
  };

  ctx.topic = extractTopic(ctx);
  ctx.ontology = detectOntologyNode(ctx); 
 ctx.expandedKnowledge = expandKnowledge(ctx);
  return ctx;
}
