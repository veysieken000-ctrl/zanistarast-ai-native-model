# Akıl ve Bilgi — A5: Bağımsız kanıt ile aynı kaynağın tekrarını ayırma

**Tarih:** 2026-10-12. **Statü:** Core metnine uygulanmamış ayrı metodolojik revizyon. Gerçek veri, deney, Mira hakemliği veya bilimsel onay değildir.

## Kaynak ve gerekçe

Esas metin `core-03.html` (blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`) aynı şartlarda tekrarlanabilir ve başka öznelerce doğrulanabilir bilgiye vurgu yapar. İzinli `backend/knowledge/H1_zanabun_epistemology.txt` (blob `59ba787e64af01be1a894a3df5b117883192b9e1`) gözlem, yapısal tutarlılık ve katman uyumunu tanımlar; `C1_hebun_ontology.txt` (blob `971e4ff02c170530b937bc2353ab4631331bfc99`) ontolojik bağlam sağlar. Önceki A1 bağımsız yeniden üretim ile onayı, A4 ise sonlu veriden kesin çıkarım sorununu incelemişti. A5, **aynı kök kaynaktan gelen olumlu raporların sayısal olarak iki kez kanıt sayılması** sorununu ayrı ele alır.

## Matematiksel karşı örnek

Varsayımsal H iddiasının önsel olasılığı 0,5 olsun. Bir ölçümün duyarlılığı 0,8 ve yanlış-pozitif olasılığı 0,2 ise pozitif olabilirlik oranı 4'tür. Tek olumlu ölçümden sonra Bayes formülüyle son olasılık 0,8 olur.

- İki ölçüm **H ve H-değil koşullarının her ikisinde de bağımsızsa**, birleşik olabilirlik oranı 16; son olasılık `16/17 ≈ 0,941176`.
- İkinci rapor ilk ölçümün **birebir kopyasıysa**, birleşik olabilirlik oranı 4; son olasılık `0,8` kalır.

Bu uç durumlar arasında basit doğrusal interpolasyon genellenemez. Bağımlılık için ortak dağılım, ortak hata kaynakları veya açık nedensel model gerekir. Sayılar sentetiktir; Zanistarast'ın başarı/doğruluk oranı değildir.

## Ayrı revizyon önerisi

Birden fazla öznenin aynı iddiayı onaylaması, otomatik olarak bağımsız ampirik kanıt değildir. Her raporda kök veri kaynağı, ölçüm aracı, örneklem örtüşmesi, ortak kalibrasyon, kullanılan analiz ve aktarım zinciri izlenmelidir. Bağımlılık bilinmiyorsa birleşik kesinlik/olabilirlik oranı üretilmemelidir. Yeni veri ve rakip modellerle önceden tanımlı bağımsız test aranmalıdır. Teolojik/felsefi tanıklık ile deneysel ölçüm ayrı kanıt türleridir.

**Başarısızlık ölçütü:** İkinci rapor aynı gözlemden türemişse veya bağımsız test rakip açıklamaları ayıramıyorsa, iki raporun bulunması 'bağımsız doğrulandı' sonucunu desteklemez.

**Dış yöntem kaynakları:** Renooij (2016), *Evidence Evaluation: a Study of Likelihoods and Independence*, https://proceedings.mlr.press/v52/renooij16.html ; Kessel & Kacker (2009), NIST, *Correlation in Uncertainty of Measurement*, https://www.nist.gov/publications/correlation-uncertainty-measurement-discussion-state-art-techniques . Bunlar Zanistarast'a özel ampirik doğrulama değildir.

**Kanıt sınıfları:** Bayes hesabı matematiksel çıkarımdır; kaynak bağımlılığı kaydının yararı test edilmesi gereken hipotezdir; yeni saha verisi yoktur. Hakikat, ahlak ve teolojik yorum ayrı normatif/felsefi düzeydedir.

**Koruma:** Ehad→Tek→Yek→Hebûn→Zanabûn→Mabûn→Rabûn→Rasterast zinciri; Tek genel öz/ilke, Yek belirli tekil varlık. 6+Tek yedinci fiziksel boyut değildir. Core/özgün HTML, main, siteler ve Science Core v1 değiştirilmez. Özgün makale sayımı kullanıcı kuralına göre 11 olarak tutulur; eksik özgün 10 numaranın teslimi bağımsız doğrulanınca 12 olur; Core numaraları yeni özgün makale sayılmaz.