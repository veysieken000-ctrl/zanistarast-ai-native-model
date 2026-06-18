function generateArticle(ctx, parts) {
  return `
<article class="zanistarast-answer">
  <h2>${ctx.domain.toUpperCase()} ÜZERİNE ZANISTARAST ANALİZİ</h2>

  <p><strong>Soru:</strong> ${ctx.original}</p>
  <p><strong>Analiz Türü:</strong> ${ctx.intent}</p>
  <p><strong>Derinlik:</strong> ${ctx.depth}</p>

  <h3>1. Hebûn — Varlık Analizi</h3>
  <p>${parts.hebun}</p>

  <h3>2. Zanabûn — Bilgi Analizi</h3>
  <p>${parts.zanabun}</p>

  <h3>3. Mabûn — Düzen Analizi</h3>
  <p>${parts.mabun}</p>

  <h3>4. Rabûn — Uygulama Analizi</h3>
  <p>${parts.rabun}</p>

  <h3>5. Rasterast — Doğrulama Filtresi</h3>
  <p>${parts.rasterast}</p>

  <h3>6. Newroza Kawa — Medeniyet Etkisi</h3>
  <p>${parts.newroza}</p>

  <h3>Sonuç</h3>
  <p>
    Bu cevap Zanistarast zincirine göre üretilmiştir:
    Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast → Newroza Kawa.
    Amaç kısa cevap vermek değil, soruyu bütüncül biçimde analiz etmektir.
  </p>
</article>
`;
}
