# Zanabûn epistemolojisinde tanıklık tutarlılığı, bağımsızlık ve ortak hata
**Bilimsel araştırma taslağı v0.1 — hakem incelemesinden geçmedi, yayın için hazır değil**

## 1. Çekirdek, kaynak ve iddia sınıflandırması

Kaynak çekirdek: \`veysieken000-ctrl/zanistarast-ontology/papers/zanabun.md\`.
İlgili diğer özgün ana kaynaklar: \`zanistarast-ai-native-model/core-03.html\` (Akıl ve Bilginin Kaynağı) ve Ontoloji Core 01. Yek/Ehad yaratıcı ilkesinin teolojik/ontolojik statüsü aynen korunur; bu matematik deneyinde Yek/Ehad için doğrulama iddiası yoktur.

Temel bilimsel soru: Çok sayıda tanığın aynı ölçümü bildirmesi, tanıkların hataları *birbiriyle bağımlı* olduğunda tek tanığa kıyasla daha doğru sonuç garanti eder mi?

Kaynak metindeki başlıca işlemsel öneriler: \(K=n^{-1}\sum_i W_i\) ve \(\sigma^2=n^{-1}\sum_i(W_i-K)^2\). Kullanılan uyum/dağılım ölçüsü doğrunun kendisi değildir; aşağıdaki karşı örnek, şahitlerin aynı önyargıyı taşımasının olası bir başarısızlık modu olduğunu gösterir.

## 2. Matematiksel karşı örnek: kusursuz mutabakat ve yanlış sonuç

Bilinmesi istenen gerçek fiziksel nicelik \(\theta=0\) olsun.
Dört tanığın ortak kalibrasyon hatası \(b=5\) olsun. Her tanık
\(W_i=\theta+b=5\) raporlasın.

\[
K=\frac{5+5+5+5}{4}=5,\qquad
\sigma^2=\frac{1}{4}\sum_{i=1}^{4}(W_i-5)^2=0.
\]

Tanıklar arasında varyans **sıfır** olmasına rağmen ölçüm hatası \(|K-\theta|=5\) birimdir.

Karşı örneğin sonucu: yalnızca *tanıklar arası düşük varyans* esas alınırsa 'doğruluk' veya dış gerçekliğe uygunluk garanti edilemez. Bu, Zanabûn için önerilebilecek bir **epistemik model düzeltmesidir**; tarihsel kaynakta zaten kanıtlanmış bir sonuç diye sunulmamalıdır.

## 3. Ortak gürültü modeli

Tanık ölçümlerini

\[
W_i=\theta+B+\epsilon_i
\]

olarak yazalım. Burada \(B\) sıfır ortalamalı, tüm tanıklara ortak hata; \(\epsilon_i\) birbirinden bağımsız ve sıfır ortalamalı özel hatadır. \(\operatorname{Var}(B)=\tau^2\) ve \(\operatorname{Var}(\epsilon_i)=\sigma^2\) olsun. Ayrıca \(B\) ile \(\epsilon_i\) bağımsız olsun.

Ortalama \(K=\theta+B+\frac1n\sum_i\epsilon_i\) olur ve bu varsayımlarda

\[
\operatorname{Var}(K-\theta)=\tau^2+\frac{\sigma^2}{n}.
\]

Tanık sayısı \(n\) çok büyük olsa da belirsizliğin ortak hata parçası \(\tau^2\) kaybolmaz.

Bu hesap temel varyans ve kovaryans özdeşliğinin uygulanmasıdır; **yeni matematik teoremi keşfedildiği iddiası değildir**.

## 4. Çıkarımlar ve yanlışlanabilir hipotez

- **H1 — kalibrasyon**: Aynı kalibrasyon bilgisi veya kaynağını paylaşan tanıkların doğrulukları, bağımsız kalibre edilen tanıklara göre daha çok ortak hatadan etkilenebilir.
- **H2 — bağımsızlık**: Eşit toplam kaynak maliyetinde, farklı hata kaynaklarına sahip tanıklardan oluşturulan topluluk ortalaması, ortak hata altındaki gruptan daha küçük dış ölçüt hatası verebilir.
- **H3 — mutabakatın sınırı**: Grup içi uyum, dış geçerliği ölçen altın standart olmadan hakikatin yeterli göstergesi değildir.

Bunlar test önerileridir; doğrulanmış saha bulguları değildir. H1–H3 için birlikte kullanılacak veri, referans gerçek değer, ölçüm protokolü ve alternatif açıklamalar önceden kaydedilmelidir.

## 5. Yeniden üretilebilir en küçük hesap

\`\`\`python
theta = 0.0
reports = [5.0, 5.0, 5.0, 5.0]
mean = sum(reports) / len(reports)
population_variance = sum((w - mean)**2 for w in reports) / len(reports)
absolute_error = abs(mean - theta)
assert mean == 5.0
assert population_variance == 0.0
assert absolute_error == 5.0
print({"consensus_variance": population_variance, "external_error": absolute_error})
\`\`\`

Bu örnek yerleşik matematiği doğrular; tek başına gerçek dünyadaki tanıkların davranışına ilişkin sonuç çıkarmaz.

## 6. Kanıt planı, itirazlar, sınırlar

**Literatür bağlantıları**: Bağımlı ölçüm hatası, ortak neden yanlılığı, grup düşüncesi, uzman yargılarının birleştirilmesi, korelasyonlu gözlemler ve ölçüm geçerliliği. Hakemli kaynaklar ve eser künyeleri ayrıca doğrulanmalıdır; doğrulanmamış atıf eklenmemiştir.

**İtiraz**: Orijinal kaynakta 'tutarlılık' yalnız istatistiksel düşük varyans değil, doğrulama ve tanıklık bütünlüğünü de içerebilir. Bu durumda karşı örnek, felsefi çekirdeği çürütmek yerine **belirli bir formülasyonun yetersizliğini** sınırlar. Nihai akademik yazıda kavramların kapsamı asıl yazarın tanımlarıyla karşılaştırılmalıdır.

**Etik**: Gerçek kişi verisi toplanmadı; kullanıcı hakkında kanaat, inanç veya sağlık özelliği türetilmedi.

**Yayına hazırlık eksikleri**: İlgili literatür incelemesi, önceki çalışmalarla yenilik analizi, sahici veri veya nitelikli simülasyon karşılaştırması, hata kovaryansının nasıl tahmin edileceği, deney protokolü, yöntem/baseline karşılaştırması, çalışma sınırları, bağımsız hakem okuması ve hedef dergi biçimi.

## 7. Alt çekirdek türetimleri

- **Doğrusal türeme**: Zanabûn → tanık bağımsızlığı ölçüsü → hata modelleme → dış doğrulama deneyleri.
- **Dairesel/disiplinler arası türeme**: Zanabûn × tarih → birbirini kopyalayan arşiv tanıklığı; Zanabûn × yapay zekâ → aynı modelden türeyen ajanların sahte çoğulluğu; Zanabûn × Rasterast → yönetim kararlarında kanıt çeşitliliğinin denetimi.

Bu üç yeni alan ancak birbirlerinden ayrı soru, uygun veri, literatür boşluğu ve sonuç taşırlarsa ayrı akademik makale olabilir.
