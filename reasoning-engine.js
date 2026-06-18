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
    zanistarastPath: ["Hebûn", "Zanabûn", "Mabûn", "Rabûn", "Rasterast", "Newroza Kawa"]
  };
}

function hebunAnalysis(ctx) {
  return `
Bu sorunun Hebûn katmanı, ele alınan konunun gerçek varlık zeminini belirlemektir.
"${ctx.original}" sorusu yalnızca yüzeysel bir bilgi talebi değildir.
Önce bu konunun ne olduğu, hangi varlık alanına ait olduğu ve hangi bütün içinde anlam kazandığı belirlenmelidir.
`;
}

function zanabunAnalysis(ctx) {
  return `
Zanabûn katmanı, bu varlığın nasıl bilineceğini araştırır.
Bilgi yalnızca veri toplamak değildir.
Bilgi; bağlamı, ilişkiyi, sebebi, sonucu ve insan üzerindeki etkisini birlikte kavramaktır.
`;
}

function mabunAnalysis(ctx) {
  return `
Mabûn katmanı, bilginin düzene dönüşmesidir.
Bir bilgi insan, toplum, ahlak ve sistem içinde yerini bulmuyorsa eksik kalır.
Bu nedenle konu yalnızca teorik değil, düzen kurucu yönüyle de incelenmelidir.
`;
}

function rabunAnalysis(ctx) {
  return `
Rabûn katmanı, düzenin eyleme dönüşmesidir.
Rabûn, Hebûn ontolojisinde zaten var olan düzenin insan dünyasında bilinçli ve yapay olarak kurulmuş hâlidir.
Bu nedenle her fikir, hayatta nasıl uygulanacağı bakımından değerlendirilmelidir.
`;
}

function rasterastValidation(ctx) {
  return `
Rasterast doğrulama filtresi şu soruları sorar:
Bu analiz açık mı?
Çelişki içeriyor mu?
Manipülasyon var mı?
İnsana, canlıya veya çevreye zarar veriyor mu?
Hakikati gizliyor mu, yoksa doğrudan mı gösteriyor?
`;
}

function newrozaImpact(ctx) {
  return `
Newroza Kawa katmanı, bu bilginin medeniyet kurucu etkisini inceler.
Eğer bilgi Hebûn'u koruyor, Zanabûn'u üretiyor, Mabûn'u kuruyor, Rabûn'a dönüşüyor ve Rasterast'tan geçiyorsa,
o bilgi Newroza Kawa uygarlığına hizmet edebilir.
`;
}
