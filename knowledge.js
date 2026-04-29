window.KNOWLEDGE = {

  core13: {
    title: "Zanistarast Medeniyet Modeli",

    concepts: [
      "6+Tek",
      "6+Ehad",
      "medeniyet meclisleri",
      "ahlak-hüküm-ekonomi",
      "yaşam temelli ekonomi"
    ],

    summary: `
    İnsan, kâinat ve toplum arasında kurulan denge sistemidir.
    Ahlak yön verir, hüküm düzen kurar, ekonomi devam sağlar.
    `,

    links: [
      "core-13-zanistarast-medeniyet-modeli.html",
      "hebun-18-ekonomik-denge.html",
      "mabun-05-ekonominin-medeniyetsel-tanimi.html"
    ]
  },

  economy: {
    title: "Yaşam Temelli Ekonomi",

    concepts: [
      "paylaşım",
      "ihtiyaç",
      "iyilik",
      "ücretsiz temel yaşam",
      "toplumsal denge"
    ],

    summary: `
    İnsan sadece kendisi için değil başkası için çalışır.
    Herkes birbirinin ihtiyacını karşılar.
    `,

    links: [
      "hebun-18-ekonomik-denge.html",
      "mabun-03-doga-referansli-ekonomik-katman.html"
    ]
  }

};
/* ===============================
   PAPER KNOWLEDGE GRAPH — STEP 1
   Zanistarast Paper HTML Registry
================================ */

window.KNOWLEDGE = window.KNOWLEDGE || {};

window.KNOWLEDGE.paperSystem = {
  title: "Paper — Zanistarast Ana Makale Sistemi",
  type: "paper_graph",
  url: "paper.html",

  summary: `
    Paper sistemi; Zanistarast bilimsel sentezinin ana makale omurgasıdır.
    Ontoloji, Zanabûn epistemolojisi, Mabûn ekonomi, Hebûn varlık düzeni,
    Core makaleler, Theory katmanları, Thesis dizileri, Transitions ve Final Layer
    dosyalarını tek bilgi ağına bağlar.
  `,

  concepts: [
    "zanistarast",
    "paper",
    "makaleler",
    "ontoloji",
    "hebun",
    "zanabun",
    "mabun",
    "core",
    "theory",
    "thesis",
    "transition",
    "final layer",
    "medeniyet",
    "varlık",
    "bilgi",
    "ahlak",
    "hüküm",
    "ekonomi"
  ],

  groups: [

    {
      id: "paper-main",
      title: "Ana Sayfalar",
      description: "Paper, makaleler, teori, tez ve genel giriş sayfaları.",
      pages: [
        { title: "Paper", url: "paper.html" },
        { title: "Makaleler", url: "makaleler.html" },
        { title: "Theory", url: "theory.html" },
        { title: "Theses", url: "theses.html" },
        { title: "Core", url: "core.html" },
        { title: "Ontology", url: "ontology.html" },
        { title: "Manifesto", url: "manifesto.html" },
        { title: "Graph", url: "graph.html" },
        { title: "Interpretation", url: "interpretation.html" }
      ]
    },

    {
      id: "core",
      title: "Core Makaleler",
      description: "Orijinal makale çekirdeği ve yeni sistem core sayfaları.",
      pages: [
        { title: "Core 01", url: "core-01.html" },
        { title: "Core 02", url: "core-02.html" },
        { title: "Core 03", url: "core-03.html" },
        { title: "Core 04", url: "core-04.html" },
        { title: "Core 05 — Duygu", url: "core-05.html" },
        { title: "Core 06 — Bilim", url: "core-06-bilim.html" },
        { title: "Core 07 — Hukuk", url: "core-07-hukuk.html" },
        { title: "Core 08 — İnsan ve Toplum", url: "core-08-insan-ve-toplum.html" },
        { title: "Core 09 — Kürdistan, Ortadoğu ve Varlık Tarihi", url: "core-09-kurdistan-ortadogu-varlik-tarihi.html" },
        { title: "Core 10 — Estetik, Sanat ve Güzellik", url: "core-10-estetik-sanat-guzellik.html" },
        { title: "Core 11 — Zanistarast Eğitim Sistemi", url: "core-11-zanistarast-egitim-sistemi.html" },
        { title: "Core 12 — Yaşam Temelli Ekonomi", url: "core-12-yasam-temelli-ekonomi.html" },
        { title: "Core 13 — Zanistarast Medeniyet Modeli", url: "core-13-zanistarast-medeniyet-modeli.html" }
      ]
    },

    {
      id: "hebun",
      title: "Hebûn Ontology",
      description: "Varlık, merkez-çevre, zaman, ruh, insan ve ekonomik denge dizisi.",
      pages: [
        { title: "Hebûn 00 — Ontolojik Tanım", url: "hebun-00-ontolojik-tanim.html" },
        { title: "Hebûn 01 — Yer Gök Kavramı", url: "hebun-01-yer-gok-kavrami.html" },
        { title: "Hebûn 02 — Yer Katmanları", url: "hebun-02-yer-katmanlari.html" },
        { title: "Hebûn 03 — Gök Katmanları", url: "hebun-03-gok-katmanlari.html" },
        { title: "Hebûn 04 — Merkez Çevre Yasası", url: "hebun-04-merkez-cevre-yasasi.html" },
        { title: "Hebûn 05 — Arş İstiva Düzen", url: "hebun-05-ars-istiva-duzen.html" },
        { title: "Hebûn 06 — Nefs Katmanı", url: "hebun-06-nefs-katmani.html" },
        { title: "Hebûn 07 — Ruh Katmanı", url: "hebun-07-ruh-katmani.html" },
        { title: "Hebûn 08 — İnsanın Katmanlı Yapısı", url: "hebun-08-insanin-katmanli-yapisi.html" },
        { title: "Hebûn 09 — Zamanın Ontolojisi", url: "hebun-09-zamanin-ontolojisi.html" },
        { title: "Hebûn 10 — Boyutlar Modeli", url: "hebun-10-boyutlar-modeli.html" },
        { title: "Hebûn 11 — Tanıklık ve Zaman", url: "hebun-11-taniklik-ve-zaman.html" },
        { title: "Hebûn 12 — Zamanın Kapanış Modeli", url: "hebun-12-zamanin-kapanis-modeli.html" },
        { title: "Hebûn 13 — Merkez Çevre Modeli", url: "hebun-13-merkez-cevre-modeli.html" },
        { title: "Hebûn 14 — Mekân Hüküm İlişkisi", url: "hebun-14-mekan-hukum-iliskisi.html" },
        { title: "Hebûn 15 — Merkezin Kayması", url: "hebun-15-merkezin-kaymasi.html" },
        { title: "Hebûn 16 — Merkezden Çevreye Dönüş", url: "hebun-16-merkezden-cevreye-donus.html" },
        { title: "Hebûn 17 — Varlığın Dolaşımı", url: "hebun-17-varligin-dolasimi.html" },
        { title: "Hebûn 18 — Ekonomik Denge", url: "hebun-18-ekonomik-denge.html" }
      ]
    },

    {
      id: "zanabun",
      title: "Zanabûn Epistemology",
      description: "Bilgi, tanıklık, hakikat, katman, doğrulama ve epistemik düzen dizisi.",
      pages: [
        { title: "Zanabûn 00 — Bilgi Tanıklık ve Hakikat", url: "zanabun-00-bilgi-taniklik-ve-hakikat.html" },
        { title: "Zanabûn 01 — Bilginin Tanımı ve Sınıflandırılması", url: "zanabun-01-bilginin-tanimi-ve-siniflandirilmasi.html" },
        { title: "Zanabûn 02 — Bilginin Katmanları", url: "zanabun-02-bilginin-katmanlari.html" },
        { title: "Zanabûn 03 — Ahlak ve Hüküm Yasası", url: "zanabun-03-ahlak-ve-hukum-yasasi.html" },
        { title: "Zanabûn 04 — Tanıklık Yasası", url: "zanabun-04-taniklik-yasasi.html" },
        { title: "Zanabûn 05 — Bilginin Katman Modeli", url: "zanabun-05-bilginin-katman-modeli.html" },
        { title: "Zanabûn 06 — Epistemik Çöküş", url: "zanabun-06-epistemik-cokus.html" },
        { title: "Zanabûn 07 — Bilgi Güç Ayrımı", url: "zanabun-07-bilgi-guc-ayrimi.html" },
        { title: "Zanabûn 09 — Bilginin Evrensel Döngüsü", url: "zanabun-09-bilginin-evrensel-dongusu.html" },
        { title: "Zanabûn 10 — Bilgi Zaman İlişkisi", url: "zanabun-10-bilgi-zaman-iliskisi.html" },
        { title: "Zanabûn 12 — Tanıklığın Tarih Üretmesi", url: "zanabun-12-tanikligin-tarih-uretmesi.html" },
        { title: "Zanabûn 13 — Meta Science Framework", url: "zanabun-13-meta-science-framework.html" },
        { title: "Zanabûn 14 — Nihai Döngü Modeli", url: "zanabun-14-nihai-dongu-modeli.html" },
        { title: "Zanabûn 15 — Epistemolojik Aksiyomlar", url: "zanabun-15-epistemolojik-aksiyomlar.html" },
        { title: "Zanabûn 20 — Nihai Epistemolojik Sonuç", url: "zanabun-20-nihai-epistemolojik-sonuc.html" }
      ]
    },

    {
      id: "mabun",
      title: "Mabûn Economy",
      description: "Bilgi, toplum, ekonomi, doğa referansı ve medeniyet ekonomisi dizisi.",
      pages: [
        { title: "Mabûn 01 — Bilginin Toplumsal ve Ekonomik Düzeni", url: "mabun-01-bilginin-toplumsal-ve-ekonomik-duzeni.html" },
        { title: "Mabûn 02 — Mabûn’un Bilimsel Konumu", url: "mabun-02-mabunun-bilimsel-konumu.html" },
        { title: "Mabûn 03 — Doğa Referanslı Ekonomik Katman", url: "mabun-03-doga-referansli-ekonomik-katman.html" },
        { title: "Mabûn 04 — Boyutsal Yönetim Prensibi", url: "mabun-04-boyutsal-yonetim-prensibi.html" },
        { title: "Mabûn 05 — Ekonominin Medeniyetsel Tanımı", url: "mabun-05-ekonominin-medeniyetsel-tanimi.html" }
      ]
    },

    {
      id: "makale-indexes",
      title: "Makale Ana Dizileri",
      description: "Makale dizilerinin ana index sayfaları.",
      pages: [
        { title: "Makale 00 — Katmanlı Varlık Okuması", url: "makale-00-katmanli-varlik-okumasi.html" },
        { title: "Makale 01 — Ontoloji", url: "makale-01-ontoloji.html" },
        { title: "Makale 02 — Epistemoloji", url: "makale-02-epistemoloji.html" },
        { title: "Makale 03 — Aksiyoloji", url: "makale-03-aksiyoloji.html" },
        { title: "Makale 04 — Tarih", url: "makale-04-tarih.html" },
        { title: "Makale 05 — Siyaset ve Toplum", url: "makale-05-siyaset-ve-toplum.html" },
        { title: "Makale 06 — Bilim ve Bilgi", url: "makale-06-bilim-ve-bilgi.html" },
        { title: "Makale 07 — Uygarlık ve Düzen", url: "makale-07-uygarlik-ve-duzen.html" },
        { title: "Makale 08 — Yer ve Gök Düzeni", url: "makale-08-yer-ve-gok-duzeni.html" },
        { title: "Makale 09 — Hüküm, Ahlak ve Boyut Düzeni", url: "makale-09-hukum-ahlak-ve-boyut-duzeni.html" },
        { title: "Makale 10 — Paradokslar", url: "makale-10-paradokslar-ve-rasterast-cozumleri.html" },
        { title: "Makale 11 — Varlık Tarihi", url: "makale-11-varlik-tarihi.html" },
        { title: "Makale 12 — Core", url: "makale-12-core.html" },
        { title: "Makale 13 — Hüküm, Fıtrat ve Ahlak", url: "makale-13-hukum-fitrat-ve-ahlak-yeniden-baslangic.html" }
      ]
    },

    {
      id: "theory",
      title: "Theory Pages",
      description: "Zanistarast teori katmanları: zaman, boyut, zihin, ahlak ve Newroza Kawa dizileri.",
      pages: [
        { title: "Theory Framework", url: "theory-00-framework.html" },
        { title: "Global Scientific Framework", url: "theory-00-01-global-scientific-framework.html" },
        { title: "Master Science Index", url: "theory-00-02-master-science-index.html" },
        { title: "Unified Mind Theory", url: "theory-00-03-unified-mind-theory.html" },
        { title: "Final Stability Proof", url: "theory-00-04-final-theory-stability-proof.html" },
        { title: "Zanistarast History", url: "theory-01-00-zanistarast-history.html" },
        { title: "Physical Foundation", url: "theory-01-01-physical-foundation.html" },
        { title: "Boyutsal Açılım", url: "theory-01-03-boyutsal-acilim.html" },
        { title: "Jeolojik Zemin", url: "theory-02-01-jeolojik-zemin.html" },
        { title: "Biyolojik Evre", url: "theory-03-biyolojik-evre.html" },
        { title: "Zihin Boyutu", url: "theory-04-zihin-boyutu.html" },
        { title: "Collapse Reset", url: "theory-05-collapse-reset.html" },
        { title: "Ahlak Boyutu", url: "theory-06-ahlak-boyutu.html" },
        { title: "Newroza Kawa Uygarlık Teorisi", url: "theory-07-00-newroza-kawa-uygarlik-teorisi.html" },
        { title: "Newroza Kawa Medeniyet", url: "theory-07-medeniyet.html" },
        { title: "Zaman", url: "theory-08-zaman.html" }
      ]
    },

    {
      id: "theses",
      title: "Thesis Pages",
      description: "Tez dizileri ve medeniyet çerçevesi.",
      pages: [
        { title: "Civilization Thesis", url: "thesis-civilization.html" },
        { title: "Hebûn Thesis", url: "thesis-hebun.html" },
        { title: "Zanabûn Thesis", url: "thesis-zanabun.html" },
        { title: "Mabûn Thesis", url: "thesis-mabun.html" },
        { title: "Meta Science Thesis", url: "thesis-meta-science.html" },
        { title: "Final Layer Thesis", url: "thesis-final-layer.html" },
        { title: "Transitions Thesis", url: "thesis-transitions.html" },
        { title: "Ontology Core Thesis", url: "thesis-ontology-core.html" },
        { title: "Zanistarast Thesis", url: "thesis-zanistarast.html" }
      ]
    },

    {
      id: "transitions",
      title: "Transitions",
      description: "Geçiş, uyum, tanıklık, genişleme eşikleri ve Zanistarast geçiş yapısı.",
      pages: [
        { title: "Transitions 00 — Geçiş Kapısı", url: "transitions-00-gecis-kapisi.html" },
        { title: "Transitions 01 — Ontolojik Uyum", url: "transitions-01-ontolojik-uyum.html" },
        { title: "Transitions 02 — Epistemik Tutarlılık", url: "transitions-02-epistemik-tutarlilik.html" },
        { title: "Transitions 03 — Tanıklık Testi", url: "transitions-03-taniklik-testi.html" },
        { title: "Transitions 04 — Anlam ve Yön", url: "transitions-04-anlam-ve-yon.html" },
        { title: "Transitions 05 — Genişleme Eşikleri", url: "transitions-05-genisleme-esikleri.html" },
        { title: "Transitions 06 — Zanistarast Geçişi", url: "transitions-06-zanistarast-gecisi.html" }
      ]
    },

    {
      id: "final-layer",
      title: "Final Layer",
      description: "Katmanların birleşimi, nedensellik, denge, çöküş eşiği ve nihai alan.",
      pages: [
        { title: "Final 00 — Total Integration", url: "final-00-total-integration.html" },
        { title: "Final 01 — Interlayer Causality", url: "final-01-interlayer-causality.html" },
        { title: "Final 02 — Dynamic Equilibrium Field", url: "final-02-dynamic-equilibrium-field.html" },
        { title: "Final 03 — Emergent Superstructure", url: "final-03-emergent-superstructure.html" },
        { title: "Final 04 — Self Generative System", url: "final-04-self-generative-system.html" },
        { title: "Final 05 — Structural Collapse Threshold", url: "final-05-structural-collapse-threshold.html" },
        { title: "Final 06 — Zanistarast Unified Field", url: "final-06-zanistarast-unified-field.html" }
      ]
    },

    {
      id: "ontology",
      title: "Ontology Pages",
      description: "Ontoloji index ve alt ontolojik okuma sayfaları.",
      pages: [
        { title: "Ontology Index", url: "ontology-index.html" },
        { title: "Ontology", url: "ontology.html" },
        { title: "Ontology Core Law", url: "ontology-core-law.html" },
        { title: "Ontology Hebûn", url: "ontology-hebun.html" },
        { title: "Ontology Mabûn", url: "ontology-mabun.html" },
        { title: "Ontology Rasterast", url: "ontology-rasterast.html" },
        { title: "Ontology Simulation", url: "ontology-simulation.html" },
        { title: "Ontology Standard", url: "ontology-standard.html" },
        { title: "Ontology Unified", url: "ontology-unified.html" },
        { title: "Ontology Zanabûn", url: "ontology-zanabun.html" }
      ]
    }

  ]
};

/* Flat helper: bütün paper sayfalarını tek listeye indirir */
window.PAPER_PAGES = window.KNOWLEDGE.paperSystem.groups.flatMap(group =>
  group.pages.map(page => ({
    ...page,
    groupId: group.id,
    groupTitle: group.title
  }))
);

