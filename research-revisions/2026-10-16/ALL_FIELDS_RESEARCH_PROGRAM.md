# Zanistarast / Newroza Kawa — bütün disiplinler bilimsel araştırma programı
**Tarih:** 16 Ekim 2026. **Durum:** kaynak dosya envanteri ve bilimsel ön-eleme planı; dergiye hazır makale envanteri DEĞİLDİR.

## 1. Kapsam ve kesin sınırlar

İlk 11 tarihî özgün Word makalesi bütün proje değildir. Çalışma, izinli yedi kamusal GitHub deposundaki tüm kaynakları, özgün Word kaynaklarını (erişildiğinde; Google Drive'daki asıl metinler burada kopyalanmaz) ve bunlardan üretilebilecek bağımsız bilimsel araştırmaları kapsar. Bu dal kanonik metinleri değiştirmez. Özel `zanistarast-papers` ve `Zanistarast-takip` depoları, önceden konmuş erişim kısıtları nedeniyle bu taramaya dahil edilmedi.

### Kaynak dosya sayıları (GitHub main ağaçları, tekil dosya yolları)
| Depo | Dosya sayısı |
|---|---:|
| `zanistarast-ai-native-model` | 742 |
| `The-Newroza-Kawa-Civilization-Theses` | 178 |
| `zanistarast-ontology` | 47 |
| `ZANISTARAST-TEORILER` | 136 |
| `hebun-zanabun` | 786 |
| `zanistarast-formal-foundations` | 163 |
| `zanistarast-simulations` | 10 |
| **Toplam** | **2062** |

Tam kaynak yol ve Git blob SHA kataloğu: `2026-10-16_ALL_PUBLIC_SOURCE_FILES.json`. Buradaki 2062 sayısı **makale sayısı değildir**; kod, arşiv, kopya, taslak ve destek dosyalarını da içerir.

Tarama sırasında bulunan daha anlamlı alt kümeler:
- `zanistarast-ai-native-model`: 134 adet `makale-*` HTML; 13 numaralı Core HTML (Core 01–13); ayrıca zaman teorisi ve Hebûn dizileri. **Kaynak metinlerinin özgünlük eşleştirmesi henüz yapılmadı.**
- `ZANISTARAST-TEORILER`: 72 teori dizisi dosyası; sekiz bölüm: boyutsal açılım, jeolojik evrim, biyoloji, zihin, çöküş/reset, ahlak/insan, Newroza Kawa uygarlığı, zaman.
- `hebun-zanabun`: 241 dosya `makaleler/` altında; bunların içinde arşiv ve çoğaltımlar bulunur. Ayrıca `academic/`, `articles/`, `hebun/` ve diğer dosyalar mevcut.
- `The-Newroza-Kawa-Civilization-Theses`: 9 kronolojik tarih çalışması ve 6 tarih/vaka çalışması.
- `zanistarast-formal-foundations`: matematik, ispat dilleri ve benchmark taslakları; mevcudiyetleri yürütülmüş teorem ispatı sayılmaz.
- `zanistarast-simulations`: senaryo/motor/test altyapısı; kaynak mevcudiyeti yeni saha sonucu değildir.

## 2. Kaynaklara sadık bilimsel çalışma hatları

**Ortak çekirdek:** Ehad → Tek → Yek → Hebûn (ontoloji) → Zanabûn (epistemoloji) → Mabûn → Rabûn → Rasterast. Bu, projenin iç kuramsal mimarisidir; ampirik fiziksel yasa olarak varsayılmaz. Ontoloji merkezli kavramsal sözlük ve epistemik/rasterast denetimi önceliklidir; aşağıdaki bağımsız çalışmalar paralel ilerleyebilir.

| Hat | Ana dayanak dosya | Önce hazırlanacak ölçülebilir çıktı | Önemli sınır |
|---|---|---|---|
| Ontoloji / fizik | `zanistarast-ai-native-model/core-01.html`, `makale-01-01-atomun-olusumu-ve-yapisal-sureklilik.html` | atomik önermeler, karşı örnek ve sınanabilir hipotez tablosu | Analojileri fiziksel özdeşlik saymama |
| Epistemoloji | `core-03.html`, `ZANISTARAST-TEORILER/docs/research_program_blueprint.md` | gözlemci uyuşması, bilgi doğrulama protokolü | Yorum ve doğrulanmış ölçümü ayırma |
| Rasterast / AI | `Reya-fem-u-ferasete-rasterast.html`, `docs/claim-test-falsification.md` | bilgi kökeni, doğruluk/yanlış-olumlu benchmarkı | Yalnız kodun varlığına başarı dememe |
| Zaman | `ZANISTARAST-TEORILER/theories/08_ZAMAN_THEORY/00_TIME_THEORY_UNIFIED_MIND.md`, `00_TIME_THEORY_UNIFIED_MIND.html` | zaman tanımları, eşdeğer ve karşıt modeller, falsifikasyon koşulları | Ontolojik zaman yorumu standart fizik zamanını kendiliğinden çürütmez |
| Jeoloji / yer tarihi | `ZANISTARAST-TEORILER/theories/02-GEOLOGICAL_EVOLUTION/00_GEOLOGICAL_EVOLUTION.md` ve `01_JEOLOJIK_CAGLAR.md` | evre zaman çizelgesi, literatür eşlemesi, bağımsız jeolojik kanıt matrisi | Yok oluşlara amaç atfedilmesi ampirik bulgu değildir |
| Biyolojik evrim | `ZANISTARAST-TEORILER/theories/03_BIOLOGICAL_PHASE_THEORY/01_BIOLOGICAL_DIMENSION_OPENING.md` | tek/çok hücreli ve duyusal geçişlerin açık hipotezleri | Nedensellik için gerçek karşılaştırma gerekir |
| Tarih | `The-Newroza-Kawa-Civilization-Theses/theories/ZANISTARAST_HISTORY_THEORY.md`, `research/history/` | tarihsel dönem kodlama, karşıt tarih okuması, kaynak güvenilirliği | Teolojik anlam ile tarihsel belgeleme ayrılır |
| Ekonomi / yaşam hakkı | `core-12-yasam-temelli-ekonomi.html` ve A67 yerel deneyi | gerçek ihtiyaç/arz/rota/ortak arıza karşılaştırması | A67 sentetik testleri gerçek saha başarısı veya yeni teorem değildir |
| Ahlak, hukuk ve eğitim | `core-05.html`, `core-07-hukuk.html`, `core-11-zanistarast-egitim-sistemi.html` | normatif tezleri operasyonel göstergelerden ayrı açıklama; gerektiğinde ampirik test | Yaşam hakkı normatif değerdir; yüzdeyle sınırlandırılamaz |
| Newroza Kawa uygarlığı | `core-13-zanistarast-medeniyet-modeli.html`, `ZANISTARAST-TEORILER/theories/07_NEWROZA_KAWA_CIVILIZATION_THEORY/` | farklı kurum tasarımlarını karşılaştıran ölçütler ve uygulama sınamaları | İdeal hedeflerin gerçekleştiği varsayılmaz |
| Formal matematik | `zanistarast-formal-foundations/` | derlenip denetlenmiş teoremler, karşı örnekler, yeniden üretilebilir testler | Dosya/sözde doğrulama gerçek formel kanıt değildir |

## 3. Dergiye dönüştürme kapıları (bütün eserlerde)
1. **Kaynak kökeni**: özgün tarihî eser / güncellenmiş çekirdek / türev teori / yeni makale / arşiv / kod ayrımı.
2. **Tekil ve özgün araştırma sorusu**: tekrar eden metinleri birleştirme; yalnız yeni literatür boşluğunda yeni başlık açma.
3. **Makale türü**: araştırma, yöntem, formel model, eleştirel literatür incelemesi veya felsefi/normatif çalışma.
4. **Yöntem ve hata sınırı**: tümdengelim, tümevarım, karşı örnek, alternatif açıklama, kontrol, simülasyon veya tarihî kaynak testi.
5. **Kanıt ve yeniden üretim**: yerel prototip/sentetik test/saha verisi/bağımsız doğrulama durumunu ayrı etiketleme.
6. **Yayın paketi**: seçilmiş hakemli derginin gerçek yönergeleri, katkı ve önceki literatür, kaynakça, etik/veri beyanı, tekrar kontrolü, başlık ve özet.
7. **İnsan onayı**: dışa gönderim, DOI veya ücretli adımlar ayrıca onay gerektirir.

## 4. Gerçekten yapılmış ilk kapsam genişletme denetimi

Dört farklı özgün kaynak metin incelendi:
- Jeoloji `00_GEOLOGICAL_EVOLUTION.md`: jeolojik evreleri daha yüksek boyutlara hazırlanma şeklinde yorumlar.
- Jeoloji `01_JEOLOJIK_CAGLAR.md`: jeolojik çağların *boyut değil, evre motoru* olduğunu söyler. İki metin arasında terminolojik gerilim var; kaynağa sadık iki ayrı sürüm olarak tutulmalı, hangisinin son/kanonik olduğu doğrulanmalı.
- Zaman `08_ZAMAN_THEORY/00_TIME_THEORY_UNIFIED_MIND.md`: zamanı etkileşim + düzen arayışı + sonuç olarak yorumlar; bu tanım ölçülebilir fizik zamanı ile bir tutulmamalı.
- Tarih `theories/ZANISTARAST_HISTORY_THEORY.md`: tarih için merkez–çevre değişimi kuramsal çerçevesi önerir; birincil tarihsel kaynakla karşılaştırma olmadan genel tarih yasası ispatlanmış sayılmaz.
- Biyoloji `03_BIOLOGICAL_PHASE_THEORY/01_BIOLOGICAL_DIMENSION_OPENING.md`: fizik–organik kimya–hücre geçişi üzerine kuramsal açıklama sunar; verilerle sınanacak önermelere ayrılmalı.

## 5. Hızlandırma ilkesi

7/24 GitHub Actions doğrulama denetimi yalnız teknik kod kontrolüdür; kendi kendine 24 makale yazan bir hakem kurulu değildir. Akademik ilerlemede tekrar test yerine, değişen kaynak/kanıt veya yeni deney hipotezi varsa yeni araştırma koşusu açılmalıdır. Bütün disiplinler aynı anda envanterlenip taslaklanabilir; gerçek saha, arşiv, disiplin literatürü ve dış replikasyon olmayan yerde bitiş iddia edilmez.

**Günlük tek sonuç raporu:** 21.00 Türkiye saati; 11 tarihî özgün eser ile tüm yeni bağımsız bilimsel adaylar ayrı sayılır. 
