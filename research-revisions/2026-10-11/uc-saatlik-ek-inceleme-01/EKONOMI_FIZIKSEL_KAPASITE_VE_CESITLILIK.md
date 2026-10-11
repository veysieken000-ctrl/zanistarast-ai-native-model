# Yaşam Temelli Ekonomi — fiziksel kapasite ve kültürel etki denetimi

Tarih: 2026-10-11. **Statü:** Bilimsel değerlendirme için ayrı revizyon önerisi; kabul edilmiş makale, uygulanmış politika, deney veya hakem onayı değildir.

## Kaynak ve değişmezlik

- Ana kaynak: `core-12-yasam-temelli-ekonomi.html`, incelenen blob SHA: `35211b737a12e4e97fc3efb769bf0d81bd8a7cd6`, referans commit `7e78aa2529fd8dd9dca391310215c0341077c23e`.
- Karşılaştırılan mevcut taslak: `research-revisions/2026-10-11/kaynakli-inceleme/12_EKONOMI.md` (E1 ve E2, finansman ve karşılıklılık).
- Epistemik ölçüt: `backend/knowledge/H1_zanabun_epistemology.txt` (gözlem, yapısal tutarlılık ve katmanlar arası uyum).
- Bu dosya Core HTML'nin yerine geçmez; Word yüklenmesi önkoşul değildir. Özgün Word metni bu incelemede okunmadı.

## E3 — Parasal bütçe dengesi, fiziksel hizmet kapasitesi değildir

**Metin dayanağı:** `core-12-yasam-temelli-ekonomi.html:94–101` (ihtiyaca göre üretim/dağıtım), `:119–126` (garantili temel hizmetler), `:129–137` (iki alan ve üretim döngüsü).

**Sorun ve statü:** E1 bütçe maliyetini tartışıyordu; bu ek, bütçe yeterli olsa bile personel, stok, ulaşım, üretim süresi ve hizmet kalitesinin erişimi sınırlayabileceğini ayırır. Bu bir **mantıksal kaynak-kısıtı analizi**dir; belirli bir ülkenin ampirik başarısızlığı değildir.

**Önerilen ayrı ifade:** “Temel hizmet hakkı normatif bir hedeftir. Gerçekleşen erişim, yalnız finansmanla değil her hizmet için fiziksel arz, nitelikli işgücü, altyapı, süre, coğrafi ulaşım ve kalite sınırlarıyla birlikte değerlendirilir. Hak ilkesinin benimsenmesi, bu sınırların giderildiğini kanıtlamaz.”

**Basit test edilebilir çerçeve:** Aynı dönemde uygun yararlanıcı talebi `D_i`, standartlara uygun teslim edilebilir kapasite `K_i`, fiilî teslim `Q_i` ise `0 ≤ Q_i ≤ min(D_i,K_i)`; gerçekleşen kapsam `Q_i / D_i` (yalnız `D_i>0` için). Bütçe ayrı kısıttır. **Karşı örnek (tamamen varsayımsal):** `D=1000`, `K=900`, bütçe yeterli; en iyi durumda kapsam `900/1000=0,90`. Bu hesap, modelin başarısız olduğunu değil, finansmanın tek başına %100 erişim sonucunu mantıken gerektirmediğini gösterir. Hizmetler ikame edilebilir varsayılmamalı; su, sağlık ve barınma ayrı ölçülmelidir.

**Olası yanlışlayıcı/gözlemsel inceleme:** Önceden belirlenmiş hizmet standardı ve zaman penceresiyle `D,K,Q` kayıtları, karşılanmamış ihtiyaç, kalite ve bekleme süresi raporlanır. “Her koşulda tam erişim” evrensel ampirik iddiası, tanımlı bir `K<D` ve başka tedarik olanağı bulunmayan durumda karşı örnekle sınanabilir. Normatif “erişim hakkı olmalıdır” önermesi aynı yöntemle yanlışlanmaz.

## E4 — Kültürel çoğulluk savunusu ile evrensel nedensellik ayrımı

**Metin dayanağı:** `core-12-yasam-temelli-ekonomi.html:157–173` (yerel farklılaşma), `:205–220` (tek tipliğin yaratıcılığı azalttığı savı), `:227–245` (çok kültürlü model).

**Sorun ve statü:** Kültürel çeşitliliğin korunması **normatif tercih** olabilir. Ancak “tek tip düzen yaratıcılığı azaltır” ve “çok kültürlü düzen her koşulda zenginliği artırır” türü ifadeler nedensel ve genellenebilir **ampirik hipotezlerdir**; Core pasajlarında örneklem, karşılaştırma grubu, ölçüt ve kontrol değişkeni verilmemiştir. Metinlerin kesin biçimde yanlışlandığı ileri sürülmez.

**Önerilen ayrı ifade:** “Kültürel çoğulluğu korumak bu modelin normatif hedefidir. Yerel karar yetkisi, çeşitlilik, yaratıcılık ve refah arasındaki olası ilişkiler ise bağlama bağlı araştırma hipotezleri olarak sunulur; ölçülebilir göstergelerle ve alternatif açıklamalarla sınanmalıdır.”

**Araştırma önerisi:** Birim (bölge/kurum), dönem, kültürel katılım ve yaratıcı üretim göstergesi önceden tanımlanmalı; gelir, eğitim, kentleşme, kurum kapasitesi ve başlangıç düzeyi gibi karıştırıcılar dikkate alınmalıdır. Karşı örnek: kültürel çeşitlilik korunurken üretim çıktısının düşmesi mümkündür; bu, normatif çoğulluk ilkesini tek başına çürütmez ama koşulsuz “çıktı artar” iddiasını sınırlar. Bu turda veri toplama, nedensel tahmin veya dış literatür taraması yapılmadı.

## Teknik metin notu (bilimsel sonuç değil)

Core 12'nin `core12-11` sonrasında bazı bölüm başlıkları ve “HTML” sözcüğü bölüm etiketleri dışında düz metin olarak duruyor (ör. `12 — Kültürel Zenginlik\nHTML`). Bu görünüm açısından kontrol adayıdır; mevcut HTML'ye müdahale edilmedi.

## Kanıt ve sınırlar

**Gözlem:** Belirtilen Core pasajları ve indeks okundu. **Tümdengelim:** `Q≤K<D` ise `Q/D<1`. **Tümevarım:** Bu turda örneklem veya veri yok, tümevarımsal sonuç çıkarılmadı. **Hipotez:** Kurumsal tasarım ve kültürel çoğulluğun ölçülebilir etkileri açık. **Teolojik/ontolojik:** Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast zinciri korunur; Tek genel ilke, Yek tekil varlıktır; 6+Tek yedinci fiziksel boyut değildir.

**Sayım:** Kullanıcı beyanına göre 11 özgün ana makale vardır; eksik özgün 10 numara doğrulanıp eklendiğinde 12 olur. Core 12 dosya numarası özgün 12 numaralı makalenin bulunduğu anlamına gelmez. Kopyalar yeni özgün sayılmaz.

**Açık:** Hizmetlere ilişkin gerçek veri, maliyet ve kapasite eşleştirmesi; kültürel etki için tanımlı veri ve karşılaştırmalı tasarım; özgün Word ile isteğe bağlı tarihsel karşılaştırma; bağımsız alan uzmanı değerlendirmesi. Mira/hakem faaliyeti doğrulanmadı. Main, Science Core v1, özgünler, Core HTML, canlı siteler, DOI ve yayın süreçleri değiştirilmedi.
