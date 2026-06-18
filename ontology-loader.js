const ZANISTARAST_ONTOLOGY = {
  insan: {
    type: "6+Ehad",
    layers: ["fizik", "biyoloji", "zihin", "ruh", "ahlak", "akıl-duygu", "Ehad"],
    description: "İnsan, 6 katman ve tek/benzersiz Ehad özünden oluşan bütüncül varlıktır."
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
    layers: ["beden", "zihin", "ruh", "ahlak", "sosyal çevre", "Ehad"],
    description: "Sağlık, yalnızca hastalık yokluğu değil; insanın tüm katmanlarının uyumudur."
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
