function getDomainIntro(ctx) {
  const intros = {
    teknoloji: "Bu soru teknoloji alanına ait görünse de Zanistarast açısından yalnızca teknik bir mesele değildir. Teknoloji; insan, ahlak, bilgi, toplum ve medeniyetle birlikte değerlendirilmelidir.",
    saglik: "Bu soru sağlık alanına aittir. Zanistarast açısından sağlık yalnızca bedenin tamiri değil; insanın fizik, biyoloji, zihin, ruh, ahlak, akıl-duygu ve Ehad bütünlüğü içinde korunmasıdır.",
    din: "Bu soru katmanlı okuma gerektirir. Zanistarast yaklaşımında Kur'an yalnızca tarihsel anlatı değil; varlık, bilgi, ahlak, düzen ve medeniyet ilkelerini taşıyan çok katmanlı bir rehberdir.",
    medeniyet: "Bu soru medeniyet meselesidir. Zanistarast açısından medeniyet; varlığın doğru tanınması, bilginin kurulması, düzenin inşası, eylemin uygulanması ve Rasterast ile doğrulanmasıyla oluşur.",
    ontoloji: "Bu soru varlık felsefesine aittir. Zanistarast açısından her analiz önce Hebûn ile başlar; çünkü varlığı doğru tanımlamadan bilgiye, düzene ve eyleme geçilemez.",
    ahlak: "Bu soru ahlak ve vicdan alanına aittir. Zanistarast'a göre ahlak, insanın dışına eklenen bir süs değil; varlığın düzenini koruyan temel katmandır.",
    genel: "Bu soru genel görünse de Zanistarast açısından her soru bir varlık, bilgi, düzen, eylem ve doğrulama zinciri içinde ele alınmalıdır."
  };

  return intros[ctx.domain] || intros.genel;
}

function buildExtendedBody(ctx, parts) {
  return `
<h3>Giriş</h3>
<p>${getDomainIntro(ctx)}</p>

<p>
Zanistarast Bilimsel Sentezi'ne göre hiçbir soru yalnız başına değerlendirilmez.
Her soru önce varlık zeminiyle, sonra bilgi katmanıyla, ardından düzen, uygulama ve doğrulama süreçleriyle birlikte ele alınır.
Bu nedenle cevap yalnızca "evet" veya "hayır" değildir; cevap bir analiz zinciridir.
</p>

<h3>1. Hebûn — Varlığın Doğru Tanınması</h3>
<p>${parts.hebun}</p>
<p>
Hebûn, sorunun nesnesini doğru tanımlama aşamasıdır.
Bir şeyin ne olduğu bilinmeden onun hakkında kurulan bilgi eksik kalır.
İnsan yalnızca beden değildir.
Toplum yalnızca ekonomi değildir.
Yapay zekâ yalnızca kod değildir.
Din yalnızca ritüel değildir.
Sağlık yalnızca ilaç değildir.
Her varlık kendi zemini ve bütünlüğü içinde anlaşılmalıdır.
</p>

<h3>2. Zanabûn — Bilginin Doğru Kurulması</h3>
<p>${parts.zanabun}</p>
<p>
Zanabûn, bilmenin katmanıdır.
Bilmek yalnızca veri toplamak değildir.
Bilmek; görüneni, görünmeyen ilişkileri, sebep-sonuç bağlarını, bağlamı ve insan üzerindeki etkileri birlikte kavramaktır.
Bu yüzden Zanabûn, pozitivist bilimi reddetmez; onu daha geniş bir bütün içine yerleştirir.
Parça bilgisi korunur ama bütünlük kaybedilmez.
</p>

<h3>3. Mabûn — Bilginin Düzene Dönüşmesi</h3>
<p>${parts.mabun}</p>
<p>
Mabûn, bilginin yapı kazanmasıdır.
Bir bilgi düzen kurmuyorsa eksiktir.
Doğada atomdan hücreye, hücreden bedene, bedenden topluma kadar her yerde düzen vardır.
Proton, nötron ve elektron rastgele değildir.
DNA, RNA ve protein rastgele değildir.
Duyu, işleme ve bellek rastgele değildir.
İnsan dünyasında da bilgi eğitim, hukuk, sağlık, ekonomi ve ahlak düzenine dönüşmelidir.
</p>

<h3>4. Rabûn — Düzenin Hayata Geçmesi</h3>
<p>${parts.rabun}</p>
<p>
Rabûn, Mabûn'un harekete dönüşmüş hâlidir.
Ancak Rabûn keyfî bir eylem değildir.
Rabûn, Hebûn ontolojisinde görülen doğal düzenin insan dünyasında bilinçli olarak kurulmuş yapay karşılığıdır.
Bu yüzden Rabûn yönetim, uygulama, sorumluluk ve medeniyet inşasıyla ilgilidir.
</p>

<h3>5. Rasterast — Hakikat Doğrulama Filtresi</h3>
<p>${parts.rasterast}</p>
<p>
Rasterast olmadan sistem bozulabilir.
Çünkü her bilgi doğru değildir.
Her düzen adil değildir.
Her eylem faydalı değildir.
Rasterast; manipülasyonu, çelişkiyi, sahte veriyi, zarar doğuran uygulamayı ve hakikati perdeleyen dili engeller.
Bu nedenle Rabûn bile Rasterast doğrulamasına muhtaçtır.
</p>

<h3>6. Newroza Kawa — Medeniyet Ufku</h3>
<p>${parts.newroza}</p>
<p>
Zanistarast'ın nihai hedefi yalnızca açıklama yapmak değildir.
Amaç, insanı ve toplumu daha yüksek bir bilinç, adalet, merhamet ve düzen seviyesine taşımaktır.
Hebûn korunur, Zanabûn üretilir, Mabûn kurulur, Rabûn uygulanır ve Rasterast sürekli çalışırsa,
Newroza Kawa uygarlığına giden yol açılır.
</p>
`;
}

function generateArticle(ctx, parts) {
  return `
<article class="zanistarast-answer">
  <h2>${ctx.domain.toUpperCase()} ÜZERİNE ZANISTARAST MAKALESİ</h2>

  <div class="answer-meta">
    <p><strong>Soru:</strong> ${ctx.original}</p>
    <p><strong>Analiz Türü:</strong> ${ctx.intent}</p>
    <p><strong>Derinlik:</strong> ${ctx.depth}</p>
    <p><strong>Zincir:</strong> Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast → Newroza Kawa</p>
  </div>

  ${buildExtendedBody(ctx, parts)}

  <h3>Sonuç</h3>
  <p>
  Bu analiz Zanistarast Bilimsel Sentezi'nin temel işletim zinciriyle üretilmiştir.
  Sorunun değeri yalnızca verdiği cevapta değil, açtığı düşünce yolundadır.
  Varlık doğru tanınırsa bilgi doğru kurulur.
  Bilgi doğru kurulursa düzen oluşur.
  Düzen doğru kurulursa eylem anlam kazanır.
  Eylem Rasterast'tan geçerse medeniyet doğurur.
  </p>
</article>
`;
}

