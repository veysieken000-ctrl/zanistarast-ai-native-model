function generateArticle(ctx, parts) {
  return `
<h2>${ctx.category.toUpperCase()} ÜZERİNE ZANISTARAST ANALİZİ</h2>

<p><strong>Soru:</strong> ${ctx.original}</p>

<h3>1. Hebûn Analizi</h3>
<p>${parts.hebun}</p>

<h3>2. Zanabûn Analizi</h3>
<p>${parts.zanabun}</p>

<h3>3. Mabûn Analizi</h3>
<p>${parts.mabun}</p>

<h3>4. Rabûn Analizi</h3>
<p>${parts.rabun}</p>

<h3>5. Rasterast Doğrulama Filtresi</h3>
<p>${parts.rasterast}</p>

<h3>6. Newroza Kawa Etkisi</h3>
<p>${parts.newroza}</p>

<h3>Sonuç</h3>
<p>
Zanistarast Bilimsel Sentezi'ne göre bu soru yalnızca kısa bir cevapla geçiştirilemez.
Önce varlık tanınmalı, sonra bilgi kurulmalı, ardından düzen oluşturulmalı,
eyleme geçirilmeli ve Rasterast doğrulama filtresinden geçirilmelidir.
Ancak bu şekilde bilgi, medeniyet kurucu bir değere dönüşür.
</p>
`;
}
