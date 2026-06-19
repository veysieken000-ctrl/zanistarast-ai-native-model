function buildExpandedKnowledgeBlock(ctx) {
  if (!ctx.expandedKnowledge) return "";

  return `
<h3>Genişletilmiş Zanistarast Bilgi Katmanı</h3>
<ul>
  ${ctx.expandedKnowledge.map(item => `<li>${item}</li>`).join("")}
</ul>
`;
}

function buildOntologyBlock(ctx) {
  if (!ctx.ontology) return "";

  return `
<h3>Ontolojik Bağlantı</h3>
<p><strong>Tür:</strong> ${ctx.ontology.type}</p>
<p><strong>Katmanlar:</strong> ${ctx.ontology.layers.join(" → ")}</p>
<p>${ctx.ontology.description}</p>

`;
}

function getDomainIntro(ctx) {
  const intros = {
    teknoloji: `Bu soru ${ctx.topic} alanına aittir. Zanistarast açısından teknoloji yalnızca araç değildir; insanın bilgi, ahlak, yönetim ve medeniyet kurma biçimini değiştiren bir varlık alanıdır.`,

    saglik: `Bu soru ${ctx.topic} alanına aittir. Zanistarast açısından sağlık yalnızca bedenin tamiri değil; fizik, biyoloji, zihin, ruh, ahlak, akıl-duygu ve Ehad bütünlüğünün korunmasıdır.`,

    din: `Bu soru ${ctx.topic} alanına aittir. Zanistarast yaklaşımında Kur'an; varlık, bilgi, ahlak, hukuk, eğitim, toplum ve medeniyet ilkelerini çok katmanlı biçimde okuma imkânı verir.`,

    medeniyet: `Bu soru ${ctx.topic} alanına aittir. Zanistarast açısından medeniyet, doğru varlık tanımıyla başlayan ve Rasterast doğrulamasıyla korunan uzun bir inşa sürecidir.`,

    ontoloji: `Bu soru ${ctx.topic} alanına aittir. Zanistarast açısından ontoloji, her şeyin başlangıç zemini olan Hebûn'un doğru anlaşılmasıdır.`,

    ahlak: `Bu soru ${ctx.topic} alanına aittir. Zanistarast'a göre ahlak, insanın dışına eklenen bir süs değil; varlığı koruyan temel düzen katmanıdır.`,

    genel: `Bu soru genel görünse de Zanistarast açısından her mesele varlık, bilgi, düzen, eylem ve doğrulama zinciri içinde incelenmelidir.`
  };

  return intros[ctx.domain] || intros.genel;
}

function getDomainExamples(ctx) {
  const examples = {
    teknoloji: `
<p>
Yapay zekâ örneğinde Hebûn, yapay zekânın yalnızca kod mu, araç mı, ajan mı yoksa yeni bir bilgi ekosistemi mi olduğunu sorar.
Zanabûn onun nasıl bilineceğini, Mabûn hangi kurumları dönüştüreceğini, Rabûn nasıl uygulanacağını,
Rasterast ise manipülasyon ve sahte bilgi risklerini denetler.
</p>`,

    saglik: `
<p>
Sağlık örneğinde Hebûn insanın yalnızca beden olmadığını gösterir.
Zanabûn hastalığı fiziksel, psikolojik, ruhsal ve sosyal bağlamıyla anlamaya çalışır.
Mabûn sağlık kurumlarını buna göre düzenler.
Rabûn bakım, tedavi ve merhameti uygulamaya taşır.
Rasterast ise insanı araçsallaştıran her yaklaşımı durdurur.
</p>`,

    din: `
<p>
Kur'an okumalarında Hebûn ayetin varlık zeminini, Zanabûn anlam katmanını,
Mabûn toplumsal ve ahlaki düzenini, Rabûn hayata uygulanışını,
Rasterast ise yorumun hakikate uygunluğunu denetler.
</p>`,

    medeniyet: `
<p>
Medeniyet alanında Hebûn toplumu doğru tanımlar.
Zanabûn bilgi üretir.
Mabûn hukuk, eğitim, ekonomi ve ahlak düzenini kurar.
Rabûn bu düzeni uygular.
Rasterast ise sistemin zulme, manipülasyona veya çürümeye dönüşmesini engeller.
</p>`,

    ontoloji: `
<p>
Ontolojik düzeyde atomdan insana, insandan topluma kadar aynı düzen ilkesi aranır.
Proton, nötron ve elektron; DNA, RNA ve protein; duyu, işleme ve bellek gibi yapılar
Hebûn düzeninin farklı ölçeklerdeki izleridir.
</p>`,

    ahlak: `
<p>
Ahlak alanında Hebûn insanın Ehad tekilliğini tanır.
Zanabûn insanın acısını, değerini ve sorumluluğunu bilir.
Mabûn ahlaki düzeni kurar.
Rabûn merhameti eyleme dönüştürür.
Rasterast ise ahlakın gösterişe veya çıkar aracına dönüşmesini engeller.
</p>`,

    genel: `
<p>
Bu meselede temel yöntem aynıdır:
Önce konu doğru tanımlanır, sonra bilgi kurulur, sonra düzen oluşturulur,
sonra uygulama değerlendirilir ve en sonunda Rasterast doğrulaması yapılır.
</p>`
  };

  return examples[ctx.domain] || examples.genel;
}

function getLengthLimit(ctx) {
  if (ctx.length === "short") return "short";
  if (ctx.length === "long") return "long";
  return "medium";
}

function buildShortArticle(ctx, parts) {
  return `
<article class="zanistarast-answer">
  <h2>${ctx.topic.toUpperCase()} — ZANISTARAST KISA ANALİZ</h2>

  <p><strong>Soru:</strong> ${ctx.original}</p>

  <p>${getDomainIntro(ctx)}</p>

  <p>
  Zanistarast zinciri şöyledir:
  <strong>Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast → Newroza Kawa.</strong>
  </p>

  <p>
  Hebûn konunun ne olduğunu belirler.
  Zanabûn nasıl bilineceğini açıklar.
  Mabûn bilgiyi düzene bağlar.
  Rabûn bu düzeni uygulamaya taşır.
  Rasterast bütün süreci hakikat filtresinden geçirir.
  Newroza Kawa ise bu bilginin medeniyet ufkunu gösterir.
  </p>

  <p>
  Sonuç olarak bu soru kısa bir cevapla değil, varlık–bilgi–düzen–eylem–doğrulama zinciriyle anlaşılmalıdır.
  </p>
</article>`;
}

function buildMediumArticle(ctx, parts) {
  return `
<article class="zanistarast-answer">
  <h2>${ctx.topic.toUpperCase()} ÜZERİNE ZANISTARAST ANALİZİ</h2>

  <div class="answer-meta">
    <p><strong>Soru:</strong> ${ctx.original}</p>
    <p><strong>Alan:</strong> ${ctx.domain}</p>
    <p><strong>Analiz Türü:</strong> ${ctx.intent}</p>
    <p><strong>Zincir:</strong> Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast → Newroza Kawa</p>
  </div>

  <h3>Giriş</h3>
  <p>${getDomainIntro(ctx)}</p>

  ${buildOntologyBlock(ctx)}

  ${buildExpandedKnowledgeBlock(ctx)}

  ${getDomainExamples(ctx)}

  <h3>Hebûn</h3>
  <p>${parts.hebun}</p>

  <h3>Zanabûn</h3>
  <p>${parts.zanabun}</p>

  <h3>Mabûn</h3>
  <p>${parts.mabun}</p>

  <h3>Rabûn</h3>
  <p>${parts.rabun}</p>

  <h3>Rasterast</h3>
  <p>${parts.rasterast}</p>

  <h3>Newroza Kawa</h3>
  <p>${parts.newroza}</p>

  <h3>Sonuç</h3>
  <p>
  Bu analiz, konuyu tek boyutlu ele almak yerine Zanistarast zincirinden geçirir.
  Böylece cevap yalnızca bilgi vermez; varlık, bağlam, düzen, uygulama ve hakikat denetimi sunar.
  </p>
</article>`;
}

function buildLongArticle(ctx, parts) {
  return `
<article class="zanistarast-answer">
  <h2>${ctx.topic.toUpperCase()} ÜZERİNE ZANISTARAST MAKALESİ</h2>

  <div class="answer-meta">
    <p><strong>Soru:</strong> ${ctx.original}</p>
    <p><strong>Alan:</strong> ${ctx.domain}</p>
    <p><strong>Analiz Türü:</strong> ${ctx.intent}</p>
    <p><strong>Derinlik:</strong> ${ctx.depth}</p>
    <p><strong>Zincir:</strong> Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast → Newroza Kawa</p>
  </div>

  <h3>Giriş</h3>
  <p>${getDomainIntro(ctx)}</p>
  ${buildOntologyBlock(ctx)}
  <p>
  Zanistarast Bilimsel Sentezi'ne göre hiçbir mesele yalnızca görünen yüzüyle açıklanamaz.
  Her olayın bir varlık zemini, bilgi düzeni, sistemsel sonucu, uygulama biçimi ve hakikat denetimi vardır.
  Bu nedenle soru ne olursa olsun önce Hebûn ile başlar, sonra Zanabûn'a, Mabûn'a, Rabûn'a ve Rasterast doğrulamasına geçer.
  </p>

  ${getDomainExamples(ctx)}

  <h3>1. Hebûn — Varlık Zemini</h3>
  <p>${parts.hebun}</p>
  <p>
  Hebûn, konunun ne olduğunu ortaya koyar.
  Yanlış varlık tanımı bütün sistemi bozar.
  İnsan makine gibi görülürse sağlık eksilir.
  Bilgi sadece veri gibi görülürse hikmet kaybolur.
  Teknoloji yalnızca araç gibi görülürse ahlak ve toplum etkisi ihmal edilir.
  </p>

  <h3>2. Zanabûn — Bilgi Zemini</h3>
  <p>${parts.zanabun}</p>
  <p>
  Zanabûn, bilginin parçalanmadan kurulmasıdır.
  Pozitivist bilimin ürettiği veriler değerlidir; fakat bu veriler ait oldukları bütün içinde okunmadığında eksik kalır.
  Zanabûn, parçayı yok saymaz; parçayı kendi varlık zeminine yerleştirir.
  </p>

  <h3>3. Mabûn — Düzen Zemini</h3>
  <p>${parts.mabun}</p>
  <p>
  Mabûn, bilginin yapıya dönüşmesidir.
  Doğada hiçbir sağlam sistem yalnızca bilgiyle kalmaz.
  Bilgi düzene, düzen göreve, görev ilişkiye dönüşür.
  Atomda, hücrede, bedende, toplumda ve medeniyette bu ilke tekrar eder.
  </p>

  <h3>4. Rabûn — Uygulama Zemini</h3>
  <p>${parts.rabun}</p>
  <p>
  Rabûn, Hebûn ontolojisinin insan dünyasındaki yapay karşılığıdır.
  İnsan doğadaki düzeni keşfeder ve onu eğitim, hukuk, ekonomi, sağlık, yönetim ve teknoloji alanlarında yeniden kurar.
  Bu nedenle Rabûn keyfî bir yönetim değil, varlık düzeninin bilinçli uygulanışıdır.
  </p>

  <h3>5. Rasterast — Hakikat Denetimi</h3>
  <p>${parts.rasterast}</p>
  <p>
  Rasterast olmadan Rabûn bozulabilir.
  Çünkü her eylem doğru değildir.
  Her düzen adil değildir.
  Her bilgi güvenilir değildir.
  Rasterast; sahte veriyi, manipülasyonu, gizli yönlendirmeyi, insana ve çevreye zarar veren uygulamayı durdurur.
  </p>

  <h3>6. Newroza Kawa — Medeniyet Ufku</h3>
  <p>${parts.newroza}</p>
  <p>
  Newroza Kawa, Zanistarast zincirinin medeniyet ufkudur.
  Hebûn korunursa varlık doğru tanınır.
  Zanabûn kurulursa bilgi hakikate yaklaşır.
  Mabûn kurulursa düzen oluşur.
  Rabûn uygulanırsa hayat dönüşür.
  Rasterast korunursa sistem çürümez.
  </p>

  <h3>Sonuç</h3>
  <p>
  Sonuç olarak ${ctx.topic}, Zanistarast açısından tek boyutlu bir mesele değildir.
  Bu konu; varlık, bilgi, düzen, uygulama ve hakikat denetimiyle birlikte ele alınmalıdır.
  Böyle yapıldığında cevap yalnızca açıklama değil, medeniyet kurucu bir düşünce hâline gelir.
  </p>
</article>`;
}

function generateArticle(ctx, parts) {
  const length = getLengthLimit(ctx);

  if (length === "short") return buildShortArticle(ctx, parts);
  if (length === "long") return buildLongArticle(ctx, parts);
  return buildMediumArticle(ctx, parts);
}
