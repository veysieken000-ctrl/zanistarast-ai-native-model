> **Arşiv aktarım notu (2026-10-12):** Bu dosya daha önce yerel olarak hazırlanmıştı. Metindeki 'GitHub'a kaydedilmedi / yazma engellendi' ifadeleri **önceki oturumun tarihsel durumunu** anlatır; bu aktarımın sonucu commit ve dal kontrolüyle ayrıca belirlenir. Kaynak Core dosyaları değiştirilmemiştir.

# Zanistarast — V12: K/T kapasite eşiği için sınanabilir operasyonel örnek

**Tarih:** 12 Ekim 2026. **Hedef dal:** `research/revision-2026-10`. **Başlangıç GitHub SHA:** `2aac09564b9e3020a5bc7eb6e13478c863f11c48`.
**Durum:** Yalnız yerel ayrı bilimsel/metodolojik revizyon önerisi. GitHub yazma çağrısı güvenlik denetimi tarafından engellendi. Özgün/Core HTML veya diğer korunan kaynaklar değiştirilmedi. Bu dosya yeni deney, hakem onayı veya Mira'nın çalıştığına dair kanıt değildir.

## Kaynak ve önceki çalışma karşılaştırması

- Temel Core: `core-01.html` (blob `d5aa5208e7d1af687676af3d04b53fd74de61f18`), özellikle “Zaman Tanımı” ve boyut sınıflandırması. K/T formülü **Core 01'in doğrudan formülü değildir**.
- İzinli Hebûn: `backend/knowledge/C1_hebun_ontology.txt` (blob `971e4ff02c170530b937bc2353ab4631331bfc99`), bölüm 6: `K/T>1` ile yeni katman zorunluluğu iddiası.
- İzinli Zanabûn: `backend/knowledge/H1_zanabun_epistemology.txt` (blob `59ba787e64af01be1a894a3df5b117883192b9e1`), bölüm 3: gözlem, yapısal tutarlılık, katmanlar arası uyum.
- Yardımcı modeller: `backend/knowledge/15_boyutsal_acilim_yasasi.txt`, `16_boyutsal_acilim_matematiksel_model.txt`, `17_boyutsal_reset_mekanizmasi.txt`. Bunlar deneysel veri değildir.
- Ayrı önceki revizyonlar: `research-revisions/2026-10-11/kaynakli-inceleme/01_VARLIK_SISTEMLERI.md` (V1–V4), `research-revisions/2026-10-11/saatlik-ek-inceleme-01/VARLIK_HUCRE_KOZMOLOJI_EK_REVIZYON.md` (V5–V8), `research-revisions/2026-10-11/uc-saatlik-ek-inceleme-02/VARLIK_KARA_MADDE_VE_BIYOLOJIK_ANALOJI.md` (farklı V5–V6 kodları), 12 Ekim yerel V9–V11 taslağı. V12 önceki bulguları yeni keşif saymaz; ölçüm ve karşı-örnek protokolünü somutlaştırır.

## V12 — K/T eşik kuralının operasyonelleştirilmesi ve alternatif sonuçlar

**İddia:** Yardımcı metinlerde `S=K/T` ve `S>1` durumunda yeni boyut/katman veya çöküş anlatılır. Aynı metinlerde 'reset' bazen çöküş, bazen sadeleşerek devam olarak tanımlanır. `K`nin 'karmaşıklık' olması ile örnekte ölçülecek iş yükünün aynı şey olduğu henüz gösterilmemiştir.

**Bilimsel sorun:** K ve T birim, sistem sınırı, ölçüm zamanı ve belirsizlikle tanımlanmazsa eşik nicel olarak sınanamaz. `S>1` tek başına yeni ontolojik katman zorunluluğunu veya fiziksel boyut sayısının artışını ispatlamaz. `S≤1` de otomatik kararlılık kanıtı değildir. `T=0` için oran tanımsızdır.

**İşlemsel örnek (ontolojik kanıt değil):** Basit bir kuyruk sisteminde K = dakika başına gelen iş sayısı, T = dakika başına işleme kapasitesi; ikisi aynı birimdedir. `S=K/T` yük oranıdır. Bu örnekte K, Zanistarast'taki genel karmaşıklık değişkeninin **yalnız bir vekilidir**; bu eşleme ayrıca doğrulanmalıdır.

**Sentetik deterministik model:** `B(t+1)=max(0, B(t)+K(t)-T)`, `B(0)=0`, T=10 iş/dakika. Kaynaklara veya gerçek bir altyapıya ait ölçüm değildir. `B` bekleyen iş miktarıdır. Sonuçlar:

| Senaryo | K(t) | S>1 görüldü mü? | B(t) sonuçları | Yorum |
|---|---|---|---|---|
| Geçici yük | 12,12,12,8,8,8,8 | İlk 3 adımda evet | 2,4,6,4,2,0,0 | Kuyruk temizlendi; yeni katman veya çöküş zorunlu olmadı. |
| Sürekli aşım | 12,12,12,12,12 | Her adımda evet | 2,4,6,8,10 | Kuyruk büyüyor; sonlu gözlemde çöküş ya da katman oluşumu kanıtlanmaz. |

**Mantıksal sınır:** Bu sentetik karşı örnek, 'her tür karmaşıklık aşımı aynı sonucu doğurur' evrensel önermesini doğrudan çürütmez; çünkü iş yükü ile ontolojik karmaşıklığın özdeşliği kurulmamıştır. Buna karşılık `S>1` oranından **tek başına** yeni katman sonucunun türetilemeyeceğini gösteren açık bir model örneğidir. Bu ayrım özellikle korunmalıdır.

**Yanlışlanabilir hipotez taslağı:** Önceden seçilen bir gerçek sistem sınıfında, eşik üstü dönemlerin ardından bağımsız tanımlı yeni işlevsel örgütlenme oranı, uygun karşılaştırma dönemlerinden anlamlı ölçüde yüksek olacaktır. Karşılaştırma için sonuç kategorileri: (a) geri toparlanma, (b) kapasite artışı ama yeni katman olmaması, (c) yeni işlevsel örgütlenme, (d) kalıcı işlev kaybı. Eşik süresi, örneklem büyüklüğü, karıştırıcılar, hata payları ve ölçülebilir 'yeni katman' tanımı önceden kaydedilmelidir. Sonuçlar hipotezi desteklemezse model gözden geçirilmelidir.

**Kodla denetim:** `zanistarast_kt_synthetic_test.py` ile 3 normal oran örneği, 4 geçersiz giriş örneği, 2 kuyruk senaryosu ve 1 toparlanma koşulu kontrol edildi. Çıktı: `PASS: 3 ratio cases, 4 invalid-input cases, 2 backlog scenarios, 1 recovery assertion`. Bu, **10 yerel yazılım doğrulaması**dır; ampirik bilimsel test veya CI sonucu değildir.

## Kanıt sınıflandırması ve sınırlar

- **Ampirik:** Bu turda gerçek sistem verisi veya deney yoktur.
- **Matematiksel/mantıksal:** Birim uyumu, sıfıra bölme sınırı, basit kuyruk dinamiği, alternatif sonuçların mümkünlüğü.
- **Hipotez:** K/T eşiğinin uygun ölçümle gerçek sistemlerde öngörü gücü taşıması; henüz test edilmedi.
- **Ontolojik/teolojik/normatif:** Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast korunur. Tek genel öz/ilke, Yek belirli tekil varlıktır; **6+Tek yedinci fiziksel boyut değildir**. Ontolojik katman, fiziksel koordinat sayısı değildir.

**Dış kaynak sınırı:** BIPM SI saniye tanımı (`https://www.bipm.org/en/si-base-units/second`) ve Scheffer vd. 2009 Nature kritik geçiş derlemesi (`https://www.nature.com/articles/nature08227`) bu turun V9–V11 bağlamında kontrol edildi. Hiçbiri bu sentetik kuyruk modelini veya Zanistarast'ın ontolojik geçişini deneysel olarak doğrulamaz.

**Makale sayımı:** Kullanıcının özgün 10 numaralı *İnsan ve Toplum* belgesini tanımlamasıyla önceki 11 + 1 = **12 özgün ana makale**. Core dosya numaraları ek özgün makale değildir. Bağımsız envanter denetimi yapılmadı.

**Koruma ve açık işler:** Core HTML ve özgünler, `main`, canlı siteler, Science Core v1 değişmedi; `Zanistarast-takip` deposuna erişilmedi. Yayın, DOI, dergi başvurusu, ücretli işlem yapılmadı. Mira/hakem faaliyeti doğrulanmadı. Açık: gerçek veri, değişken tanımları, nedensellik/rakip modeller, bağımsız bilimsel değerlendirme, güvenli dala yazma yetkisi.