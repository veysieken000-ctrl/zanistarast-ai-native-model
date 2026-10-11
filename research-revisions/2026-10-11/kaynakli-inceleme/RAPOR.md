# Zanistarast — kaynaklı öncelik revizyonu raporu

Tarih: 2026-10-11. Durum: Kısmi bilimsel inceleme ve ayrı düzeltme taslakları; yayın, bilimsel onay veya tamamlanmış makale revizyonu değildir.

## Erişim, dal ve başlangıç commit'i

GitHub bağlantısıyla yalnız `veysieken000-ctrl/zanistarast-ai-native-model` deposu sorgulandı; okuma/yazma yetkileri doğrulandı.
Dal `research/revision-2026-10` var ve başlangıç başı `9b932b417aa0a8cebc53152c5fc0a599cdc7e379` olarak doğrulandı.
Mesaj: “docs(research): add isolated evidence-labeled revision draft for four papers”.
Zaman: 2026-10-11T16:16:23Z.
Başlangıç kök ağacı: `ffeda2db6fd357b66b3b9173b5af053676322578`.
`main` başlangıç başı: `e2699a2eea2288779796138b7b96d65a17b5aa8e`.
Yerel `/workspace` dosya araması sonuç vermedi; yerel checkout ve mevcut yerel dal yoktu. Uzaktaki dal doğrulaması yerel checkout yapılmış gibi sunulmaz.

## Okunan ve getirilen dosyalar

Aşağıdaki dosyalar sabit başlangıç commit'inden getirildi. Core metinlerinin tamamı indirildi, bilimsel okuma ilgili pasajlarla sınırlıdır; bütün paragraf eşleştirmesi yapılmadı.

| Dosya | Bu turda okuma kapsamı |
| --- | --- |
| `CONTRIBUTING.md` | Tam metin |
| `PROJECT_LOCK.md` | Tam metin |
| `core-01.html` | Hedef bilimsel pasajlar; satır dayanakları KANIT_KAYDI.json içinde |
| `core-02.html` | Başlık ve yapı; kapsam belirleme |
| `core-03.html` | Hedef bilimsel pasajlar; satır dayanakları KANIT_KAYDI.json içinde |
| `core-04.html` | Başlık ve yapı; kapsam belirleme |
| `core-05.html` | Hedef bilimsel pasajlar; satır dayanakları KANIT_KAYDI.json içinde |
| `core-12-yasam-temelli-ekonomi.html` | Hedef bilimsel pasajlar; satır dayanakları KANIT_KAYDI.json içinde |
| `research-revisions/2026-10-11/ONCELIKLI_DORT_MAKALE_ILK_REVIZYON.md` | Tam metin |
| `.github/workflows/zanistarast-autonomous_pulse.yml` | Tam metin |
| `.github/workflows/zanistarast_autonomous_pulse.yml` | Tam metin |

Depo ağacı recursive olarak sorgulandı; GitHub `truncated=false` döndürdü. Bu sürümde .doc, .docx, .odt, .rtf, .pdf veya .zip yolu bulunmadı. Bu sonuç depo dışındaki özgün belgelerin bulunmadığı anlamına gelmez. Bu turda özgün Word okunamadı ve Word–HTML karşılaştırması tamamlanmadı.

Önceki revizyon dizininde yalnız `ONCELIKLI_DORT_MAKALE_ILK_REVIZYON.md` bulundu. Diğer olası önceki çalışmaların dosya geçmişi veya depo dışı kayıtları incelenmedi. Mira veya bağımsız hakem çalışması doğrulanmadı.

## Yeni ayrı dosyalar ve düzeltmeler

- [01_VARLIK_SISTEMLERI.md](01_VARLIK_SISTEMLERI.md): H-1 karşı örneği; parçacık/kuvvet ayrımı; nükleosentez ile kimyasal birleşmenin ayrılması; ontolojik katmanların fiziksel boyut kanıtı gibi sunulmaması.
- [03_AKIL_VE_BILGI.md](03_AKIL_VE_BILGI.md): Onay ile bağımsız doğrulama ayrımı; doğal düzene uygunluğun işlem tanımı; doğrusal düzlem koşulunun kavramsal statüsü. Önceki “referans metne eşitlik” eleştirisi için Core 03'te dayanak bulunamadı; doğrulanmış bulgu olarak devralınmadı.
- [05_DUYGU.md](05_DUYGU.md): Duygunun yalnız insanda gözlendiği genellemesi; hayvanlarda öğrenme, içgüdü ve özel ahlaki akıl tanımının ayrılması. Sıçan bulgusu tüm türlere ve insanla aynı öznel deneyime genellenmedi.
- [12_EKONOMI.md](12_EKONOMI.md): Hak ilkesi ile mali uygulanabilirlik ayrımı; karşılıklılık/denetimin koşullu etkileri; veri gereksinimi ve varsayımsal bütçe duyarlılık örneği.
- [KANIT_KAYDI.json](KANIT_KAYDI.json): 11 pasajın dosya/satır/metin dayanağı, dosya blob SHA'ları, altı kaynağın okuma düzeyi ve sayım sınırları.
- Bu rapor: Kapsam, test ve eksik kaydı.

Düzeltmeler mevcut HTML veya Word'e uygulanmadı; bu yeni dosyalardaki alternatif ifadelerle sınırlıdır. Ampirik hata, yöntem eksikliği ve normatif/teolojik önerme ayrı değerlendirildi. Metnin tümünün yanlışlandığı ileri sürülmez.

## Bilimsel kaynak doğrulaması

Altı kullanılan kaynağın bağlantıları ve kapsamı ayrı taslaklarda kayıtlıdır:
NIST atomik tablo; CERN resmî parçacık/kuvvet açıklaması; NASA yıldız füzyonu açıklaması; Open Science Collaboration birincil araştırmasının PubMed özeti; Harding–Paul–Mendl birincil makalesinin üniversite üzerindeki PDF kopyası ve yazar kurumu bibliyografisi; Dünya Bankası rapor çerçeve sayfası.

Bütün kaynaklar birincil deney makalesi değildir. S4 için yalnız özet okundu; S6 için tam kitap okunmadı. S5'in yayıncı sayfası kimlik yönlendirmesiyle açılamadı, PDF kopyası okundu. CERN broşürü bağlantısı 404 verdi; yerine açılabilen resmî Standard Model sayfası kullanıldı. IMF sayfası açılmadığından kanıt olarak kullanılmadı. Ham veriler yeniden analiz edilmedi; deney veya saha uygulaması yapılmadı.

## Çalıştırılan kontroller

JavaScript ortamında GitHub'dan getirilen sabit içeriklerle yapılan kontroller:
- PASS — 11 pasajın sabit Core sürümündeki satır ve metin eşleşmesi.
- PASS — 6 kaynak kimliğinin benzersizliği ve referans bütünlüğü.
- PASS — 4 taslakta durum, gerekçe ve eksiklerin açık olması.
- PASS — Yalnız yeni izole dosya yolları.
- PASS — JSON kayıt dönüşümü.
- PASS — 11/12 sayımının kullanıcı beyanı ve Word eksikliğinin açık kaydı.
- PASS — Önceki Akıl ve Bilgi eleştirisinin doğrulanmış bulgu olarak taşınmaması.

Python aritmetik kontrolü: PASS; çıkış kodu 0.

```python
assert 1 - 1 == 0  # H-1: N=A-Z
assert 2 - 1 == 1  # H-2
cost = 1000 * 12 * 10 + 2000
stressed = 1000 * 12 * 12 + 2000
assert (cost, cost - 110000, stressed, stressed - 110000) == (
    122000, 12000, 146000, 36000
)
```

Metinsel kontrolü tekrarlamak için KANIT_KAYDI.json içindeki her `claims` kaydında:
`git show <baseline_commit>:<path>` içeriğinin belirtilen 1 tabanlı satırında `excerpt` bulunduğu kontrol edilir. Her `source_ids` kaydı kaynak listesinde bulunmalıdır. Yeni dosya yolları başlangıç ağacında bulunmamalıdır.

Commit öncesi oluşturulan ağacın bütün mevcut dosya yolları, modları ve blob SHA'ları başlangıç ağacıyla karşılaştırılacaktır; yalnız altı yeni dosya kabul edilir. Commit sonrası aynı kontrol, dal başı ve main başı yeniden okunarak doğrulanır; gerçekleşen commit numarası kullanıcı sonuç raporunda verilir. Bu rapor kendi commit SHA'sını içermez.

Uygulama kodu değişmediği için API/UI/ontoloji çalışma testleri çalıştırılmadı. İki mevcut workflow yalnız main push veya manuel tetiklemede çalışıyor; manuel workflow tetiklenmedi. Bu kontroller bilimsel doğruluk, istatistiksel yeniden analiz veya üretim sitesinin sağlığı için test değildir.

## Koruma ve sayım

Özgün Word, mevcut HTML, önceki revizyon dosyası, main ve kapalı Science Core v1 için yazma işlemi yapılmadı. Canlı siteler için yayın/deploy işlemi, DOI başvurusu veya dergi başvurusu yapılmadı. Zanistarast-takip deposuna erişilmedi.

Kullanıcı beyanı **11 özgün ana makale**; eksik özgün **10 numaralı makale** bulunduğunda **12** olacaktır. Bu turda 11 belgenin özgünlüğü bağımsız doğrulanmadı; kopyalar ayrı sayılmadı. HTML dosyalarında “10” veya “12” geçmesi özgün kayıp makalenin bulunduğunu göstermez. Özgün 10 hâlâ eksiktir.

## Açık kalan işler

1. Özgün Word belgelerine bu çalışma bağlamında erişim ve içerik/kimlik doğrulaması.
2. Word–Core HTML–önceki revizyonların paragraf düzeyinde eşleştirilmesi.
3. Bu dört metnin kalan bilimsel iddiaları için tam literatür incelemesi.
4. Eksik özgün 10'un doğrulanması ve kopyalardan ayrılması.
5. Ekonomi için gerçek ülke/kurum/dönem verileri, maliyet/finansman ve pilot etki değerlendirmesi.
6. Diğer yedi özgün ana makalenin ve destek/paradoks metinlerinin ayrı kapsamda incelemesi.
7. Bağımsız alan uzmanı değerlendirmesi ve gerekli ham veri incelemesi.

Doğrulanmamış işler tamamlanmış gösterilmedi.
