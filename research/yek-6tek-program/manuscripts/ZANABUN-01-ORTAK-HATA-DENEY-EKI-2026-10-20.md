# ZANABUN-01: Ortak hata için sentetik deney eki (20 Ekim 2026)

**Durum:** Çekirdek epistemoloji makalesinin yöntem eki; ayrı makale değildir, saha çalışması değildir.

**Kurucu beyan (aynen):** Ehad Yek'tir ve Ehad âlemlerdeki her şeyi Yek'e göre yaratmıştır; her kar tanesi, her parmak izi dahil.

Yek insan özü, makale birleştirme işlemi veya ayrı yaratılmış katman değildir. Zanabûn'un ikinci bilen tarafından sonuç doğrulaması, tanıkların birbirini taklit etmesiyle aynı şey değildir. Bu araştırma matematiksel bir alt modelin sınırlarını inceler; teolojik/ontolojik ispat değildir.

## Araştırma kartı

- **Kaynak:** `manuscripts/ZANABUN-01-bagimsiz-taniklik-ve-ortak-hata.md`, özgün `zanistarast-ontology/papers/zanabun.md`, Core 03 ve Rasterast sabit ilkeleri.
- **Kategori:** Epistemoloji, bilim felsefesi ve matematiksel yöntem.
- **Soru:** Ortak hataya maruz kalan çok sayıda gözlemcinin mutabakatı doğruluğu garanti eder mi?
- **Özgünlük durumu:** ZANABUN-01 taslağının tekrar üretilebilir yöntem eki; yeni özgün bilimsel keşif veya yeni bağımsız makale değildir.
- **Yöntem:** W_i = theta + B + epsilon_i; B ortak hata, epsilon_i bağımsız hata. Ortalama hata varyansı tau^2 + sigma^2/n.
- **Test:** Ortak hata standart sapması tau = 0 veya 2, özel hata sigma = 1; tanık sayısı n = 1, 4, 16; her koşulda 20.000 sentetik tekrar, sabit tohum 20261020.
- **Kod:** `research/yek-6tek-program/experiments/zanabun_common_error_trial.py`.

## Yerel sentetik çalıştırma çıktısı

| tau | n | Sentetik RMSE | Analitik RMSE |
|---:|---:|---:|---:|
| 0 | 1 | 1.0038 | 1.0000 |
| 0 | 4 | 0.4996 | 0.5000 |
| 0 | 16 | 0.2495 | 0.2500 |
| 2 | 1 | 2.2445 | 2.2361 |
| 2 | 4 | 2.0482 | 2.0616 |
| 2 | 16 | 2.0069 | 2.0156 |

**Yorum:** Ortak hata yokken gözlemci sayısı arttıkça RMSE azalır. Ortak hata varsa hata sıfıra yakınsamaz. Tam mutabakatın doğru sonuca eşit olmadığı deterministik örnek: theta = 0, dört gözlem de 5, gözlemci arası varyans = 0, dış ölçüt hatası = 5.

**Karşı örnek / sınır:** Gerçek tanıklar normal dağılımlı veya birbirinden bağımsız olmak zorunda değildir. Zanabûn'daki sonuç doğrulaması salt istatistiksel uyumdan daha geniş olabilir. Dolayısıyla bu örnek kurucu epistemolojiyi çürüttüğünü iddia etmez.

**Literatür ve kanıt:** Korelasyonlu ölçümler, ortak kalibrasyon yanlılığı, uzman yargısı birleştirme ve epistemik bağımlılık literatürü doğrulanarak eklenmelidir. Buradaki rakamlar yalnızca sentetik simülasyondur; saha veya hakem onayı değildir.

**Etik:** İnsan katılımcı veya kişisel veri kullanılmadı.

**Dergiye hazırlık:** Hazır değil; literatür, karşılaştırmalı deney, gerçek ölçüm protokolü ve bağımsız değerlendirme eksik. 412 aday makale sayımına yeni benzersiz makale diye eklenmez.
