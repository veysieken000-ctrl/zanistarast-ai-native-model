const ZANISTARAST_ONTOLOGY = {
  insan: {
    type: "human_ontology_legacy_model",
    layers: ["fizik", "biyoloji", "zihin", "ruh", "ahlak", "akıl-duygu"],
    description: "İnsan için fizik, biyoloji, zihin, ruh, ahlak ve akıl-duygu ilişkilerini inceleyen tarihsel/deneysel modeldir; Ehad insan katmanı veya özü değildir.",
  },

  yapayZeka: {
    type: "dijital varlık",
    layers: ["donanım", "veri", "model", "algoritma", "etkileşim", "etik filtre"],
    description: "Yapay zekâ, silikon ve maden temelli bedene, algoritmik bilgi yapısına sahip dijital sistemdir."
  },

  toplum: {
    type: "medeniyet organizması",
    layers: ["aile", "eğitim", "hukuk", "ekonomi", "ahlak", "yönetim"],
    description: "Toplum, insan katmanlarının dış dünyada kurumsallaşmış hâlidir."
  },

  saglik: {
    type: "bütüncül denge",
    layers: ["beden", "zihin", "ruh", "ahlak", "sosyal çevre"],
    description: "Sağlık için beden, zihin, ruh, ahlak ve sosyal çevre ilişkilerini birlikte ele alan tarihsel/deneysel modeldir; klinik doğrulama yerine geçmez."
  },

  kuran: {
    type: "katmanlı rehber",
    layers: ["varlık", "bilgi", "ahlak", "hukuk", "eğitim", "medeniyet"],
    description: "Kur'an, Zanistarast için varlık, bilgi, ahlak ve düzen ilkelerine ilham veren çok katmanlı kaynaktır."
  }
};

function detectOntologyNode(ctx) {
  const t = ctx.clean;

  if (t.includes("insan") || t.includes("birey")) return ZANISTARAST_ONTOLOGY.insan;
  if (t.includes("yapay zeka") || t.includes("ai")) return ZANISTARAST_ONTOLOGY.yapayZeka;
  if (t.includes("toplum") || t.includes("medeniyet")) return ZANISTARAST_ONTOLOGY.toplum;
  if (t.includes("sağlık") || t.includes("hasta")) return ZANISTARAST_ONTOLOGY.saglik;
  if (t.includes("kur'an") || t.includes("ayet")) return ZANISTARAST_ONTOLOGY.kuran;

  return null;
}
