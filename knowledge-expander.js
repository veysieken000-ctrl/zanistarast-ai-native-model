function expandKnowledge(ctx) {
  const map = {
    teknoloji: [
      "Teknoloji yalnızca araç değil, insanın bilgi üretme biçimini değiştiren bir katmandır.",
      "Yapay zekâ, Hebûn açısından dijital varlık; Zanabûn açısından bilgi işleme; Rabûn açısından uygulama gücüdür.",
      "Rasterast olmadan teknoloji manipülasyon aracına dönüşebilir."
    ],

    saglik: [
      "Sağlık yalnızca bedenin tamiri değildir.",
      "İnsan 6 + Ehad yapısıyla fizik, biyoloji, zihin, ruh, ahlak, akıl-duygu ve öz bütünlüğüdür.",
      "Hasta, yaşlı ve çocuk toplumun vicdan katmanını canlı tutar."
    ],

    din: [
      "Kur'an katmanlı okunmalıdır.",
      "Ayetler yalnızca tarihsel olay değil; varlık, bilgi, ahlak ve düzen kodlarıdır.",
      "Hebûn ayetin varlık zeminini, Zanabûn bilgi katmanını, Mabûn düzenini, Rabûn uygulanışını gösterir."
    ],

    medeniyet: [
      "Medeniyet yalnızca şehir ve teknoloji değildir.",
      "Medeniyet; varlığın korunması, bilginin üretilmesi, düzenin kurulması ve eylemin doğrulanmasıdır.",
      "Newroza Kawa, Zanistarast döngüsünün medeniyet hedefidir."
    ],

    ontoloji: [
      "Ontoloji varlığın ne olduğunu sorar.",
      "Atomdan insana, insandan topluma kadar aynı düzen ilkesi farklı katmanlarda tekrar eder.",
      "Hebûn doğru kurulmadan Zanabûn, Mabûn ve Rabûn eksik kalır."
    ],

    ahlak: [
      "Ahlak insanın dışına eklenen bir süs değil, varlığın koruma katmanıdır.",
      "Merhamet, şefkat, rahmet ve vicdan bilgiyle birlikte çalışmalıdır.",
      "Rasterast ahlakın manipülasyona dönüşmesini engeller."
    ],

    genel: [
      "Her soru önce varlık zemininde anlaşılmalıdır.",
      "Bilgi bağlamından koparsa eksik kalır.",
      "Zanistarast zinciri soruyu bütüncül olarak işler."
    ]
  };

  return map[ctx.domain] || map.genel;
}
