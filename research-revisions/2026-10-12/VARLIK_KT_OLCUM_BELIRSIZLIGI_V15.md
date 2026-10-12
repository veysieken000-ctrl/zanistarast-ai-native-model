> **Arşiv aktarım notu (2026-10-12):** Bu dosya daha önce yerel olarak hazırlanmıştı. Metindeki 'GitHub'a kaydedilmedi / yazma engellendi' ifadeleri **önceki oturumun tarihsel durumunu** anlatır; bu aktarımın sonucu commit ve dal kontrolüyle ayrıca belirlenir. Kaynak Core dosyaları değiştirilmemiştir.

# Zanistarast Varlık — V15: K/T eşiğinde ölçüm belirsizliği ve karar verilemezlik

**Tarih:** 12 Ekim 2026. **Hedef:** `research/revision-2026-10`. **Başlangıç HEAD (okundu):** `e41a4f54b7287f8e4b0b70e0137e475fbe14c4a4`. **Statü:** Ayrı metodolojik revizyon; Core, özgün metin, Science Core v1, `main` ve canlı site değişikliği değildir. GitHub'a kaydedildiği ileri sürülmez.

## Kaynak eşleştirmesi

- Yapılandırılmış temel: `core-01.html`, blob `d5aa5208e7d1af687676af3d04b53fd74de61f18` (varlık katmanları, sistemsel zaman). **K/T denklemi Core 01'de doğrudan bulunmaz.**
- Epistemik temel: `core-03.html`, blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b` (bilginin güvenilirliği).
- İzinli indeksler: `backend/knowledge/C1_hebun_ontology.txt` bölüm 6 (K/T>1 ve katman iddiası), blob `971e4ff02c170530b937bc2353ab4631331bfc99`; `backend/knowledge/H1_zanabun_epistemology.txt` bölüm 3 (gözlem, yapısal tutarlılık, katmanlar arası uyum), blob `59ba787e64af01be1a894a3df5b117883192b9e1`.
- Destek: `backend/knowledge/15_boyutsal_acilim_yasasi.txt` (K>T), `16_boyutsal_acilim_matematiksel_model.txt` (S=K/T, S>1), `17_boyutsal_reset_mekanizmasi.txt` (reset). Bu dosyalar deneysel doğrulama değildir.
- Önceki V9–V13 yerel taslakları ve GitHub'daki V14 zaman sırası karşı örneği kontrol edildi. V15'in yeni yönü **ölçüm aralıklarının eşik sınıflamasını belirsizleştirmesi**dir; V14'ün zaman sırası sonucu tekrar yeni bulgu sayılmaz.

## V15 — Tek nokta tahmini eşiğin hangi yanında olduğumuzu kesinleştirmeyebilir

**Gerekçe:** K ve T'nin aynı birimde ve T>0 olduğu bir gerçek sistemde bile, gözlemler genellikle hatasız tek sayı değildir. Eğer yalnızca `K ∈ [K_alt, K_üst]`, `T ∈ [T_alt, T_üst]` ve `T_alt>0` biliniyorsa, oran için matematiksel olarak geçerli en geniş basit aralık:

`S ∈ [K_alt/T_üst, K_üst/T_alt]`.

- Alt sınır `>1` ise tüm izinli ölçümlerde `S>1` (eşik üstü).
- Üst sınır `≤1` ise tüm izinli ölçümlerde `S≤1` (eşik üstü değil).
- Aralık 1'i iki yandan kapsıyorsa **karar verilemez**; ek ölçüm veya belirsizlik azaltımı gerekir.

| K aralığı | T aralığı | Olası S aralığı | Sınıf |
|---|---|---|---|
| [9,11] | [9,11] | [0,818...,1,222...] | Karar verilemez |
| [13,14] | [9,10] | [1,3,1,555...] | Eşik üstü |
| [6,7] | [9,10] | [0,6,0,777...] | Eşik üstü değil |
| [10,10] | [10,10] | [1,1] | Eşik üstü değil (eşitlik) |

**Önemli:** Bunlar sentetik aralıklar, gerçek Zanistarast karmaşıklık ve kapasite ölçümleri değildir. Bağımsız ölçüm hatalarının istatistiksel dağılımı veya K/T için güven aralığı burada hesaplanmamıştır. K ile T arasındaki korelasyon bilinmiyorsa aralık geniş olabilir; örnekler istatistiksel güven düzeyi taşımaz. `S>1` kesinleşse bile yeni ontolojik katman veya çöküş sonucu mantıksal olarak zorunlu olmaz (V10–V14 sınırları).

## Ayrı bilimsel öneri ve yanlışlanabilirlik

Belirli bir alan seçilirse (1) K ve T için birim ve veri toplama prosedürü; (2) kalibrasyon ve ölçüm hatası; (3) belirsizlik aralıklarının nasıl elde edildiği; (4) eşik sınıflamasında 'karar verilemez' kategorisi; (5) sonuç değişkeni ve rakip modeller önceden kaydedilsin. Aynı veride tek nokta S sınıflaması ile aralıklı S sınıflamasının yanlış alarm ve kaçırma oranları karşılaştırılabilir. Bu öneri henüz test edilmedi.

## Test ve kanıt statüsü

`zanistarast_kt_interval_v15.py` yerel Python ile **4 aralık örneği ve 6 geçersiz girdi** denetiminden geçti; `py_compile` başarılı. Matematiksel çıkarım ve yazılım kontrolüdür. **Ampirik kanıt yok, bağımsız hakem/Mira onayı yok, CI sonucu yok.** Dış literatürün bu turda yeniden tarandığı iddia edilmez.

Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast zinciri korunur. Tek genel öz/ilke; Yek belirli tekil varlık. **6+Tek yedinci fiziksel boyut değildir.** Önceki 11 + kullanıcı tarafından tanımlanan eksik özgün 10 (*İnsan ve Toplum*) = **12 özgün ana makale**; Core numaraları yeni özgün makale sayılmaz, envanter bağımsız denetlenmedi.

**Açık:** Gerçek K/T tanımı, belirsizlik kalibrasyonu, yeni katman gözlem ölçütü, gerçek veri, bağımsız inceleme, Mira motorunun işleyiş testi. `Zanistarast-takip` deposuna erişilmedi; yayın, DOI, dergi başvurusu veya ücretli işlem yapılmadı.