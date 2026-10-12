> **Arşiv aktarım notu (2026-10-12):** Bu dosya daha önce yerel olarak hazırlanmıştı. Metindeki 'GitHub'a kaydedilmedi / yazma engellendi' ifadeleri **önceki oturumun tarihsel durumunu** anlatır; bu aktarımın sonucu commit ve dal kontrolüyle ayrıca belirlenir. Kaynak Core dosyaları değiştirilmemiştir.

# Zanistarast — V13: K/T modelinde sonlu değer denetimi ve anlık eşik yorumunun sınırı

**Tarih:** 12 Ekim 2026. **Yalnız hedef dal:** `research/revision-2026-10`. **Başlangıç SHA:** `2aac09564b9e3020a5bc7eb6e13478c863f11c48`.

**Statü:** Core HTML'ye uygulanmış değişiklik değil; ayrı metodolojik revizyon ve sentetik yazılım kontrolüdür. Mira veya hakem doğrulaması, gerçek sistem deneyi, yayın değildir.

## İncelenen dayanaklar ve önceki çalışmalar

- `core-01.html` (blob `d5aa5208e7d1af687676af3d04b53fd74de61f18`), özellikle “Zaman Tanımı” ve biyolojik katmanların sınıflandırılması. **K/T formülü Core 01'de doğrudan yer almaz.**
- `core-03.html` (blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`), “Bilginin Güvenilirliği”: zan/kanıt ayrımının yorumsal bağlamı.
- İzinli `backend/knowledge/C1_hebun_ontology.txt` (blob `971e4ff02c170530b937bc2353ab4631331bfc99`) bölüm 6: `K/T>1 → new layer required`.
- İzinli `backend/knowledge/H1_zanabun_epistemology.txt` (blob `59ba787e64af01be1a894a3df5b117883192b9e1`) bölüm 3: gözlem, tutarlılık, katmanlar arası uyum.
- Yardımcı `backend/knowledge/15_boyutsal_acilim_yasasi.txt`, `16_boyutsal_acilim_matematiksel_model.txt` ve `17_boyutsal_reset_mekanizmasi.txt`: deneysel kanıt değil, model taslakları.
- Önceki ayrı V1–V8 revizyonları ve **henüz GitHub'a kaydedilmemiş** yerel V9–V11 ve V12 dosyaları. Önceki V12'nin kuyruk örneği temel alınmıştır; eski sonuçlar yeni bulgu olarak tekrar sayılmaz.

## V13-A — Sayısal doğrulama olmadan sentetik sonuçlar sessizce bozulabilir

Önceki yerel `zanistarast_kt_synthetic_test.py` testinde negatif değer ve sıfır kapasite reddedilirken, `NaN` ve sonsuz (`Inf`) değerleri reddedilmiyordu. Çalıştırılarak görülen örnekler: `ratio(NaN,10) → NaN`; `ratio(10,Inf) → 0.0`; `backlog([NaN],10) → [0.0]`. Sonuncu durum özellikle tehlikelidir: Python'da `max(0.0, NaN)` ifadesi 0.0 döndürdüğünden geçersiz veri **yanlışlıkla toparlanma** gibi görünebilir.

**Ayrı öneri:** Yük, kapasite, başlangıç kuyruğu ve her zaman adımındaki gelişler sonlu, sayısal ve negatif olmayan değerler olmalıdır; kapasite ayrıca sıfırdan büyük olmalıdır. Boole, metin, NaN ve Inf açıkça reddedilmelidir. Giriş kalitesi, ölçüm belirsizliği ve eksik veri raporlanmadan S oranı bilimsel kanıt diye sunulmaz.

## V13-B — Anlık `S≤1` durumu, birikmiş yükü ve kararlılığı belirlemez

`16_boyutsal_acilim_matematiksel_model.txt` bölüm 3 ve 9, `K/T≤1 → stabil sistem` ifadesini kullanır. Oysa sentetik kuyruk denkleminde `B(t+1)=max(0,B(t)+K(t)-T)` ve başlangıç kuyruğu `B(0)=7` iken, `K(t)=T=10` için her adımda `S=1` olmasına rağmen kuyruk `7,7,7` olarak sürer. `S=1` tek başına kuyruğun sıfır olduğunu, sistemin önceki aşırı yükten kurtulduğunu veya sistemin dinamik kararlılığını göstermez. Aynı şekilde kısa süreli `S>1`, zorunlu ontolojik geçiş kanıtı değildir.

**Ayrı öneri:** “`S=K/T`, aynı birimde tanımlanmış yük/kapasite oranıdır. Anlık eşik, mevcut stok, geçmiş yük, gecikme ve sistemin toparlanma hızını temsil etmez. Kararlılık iddiası için dinamik durum değişkenleri ve önceden seçilmiş sonuç ölçütleri gerekir.”

**Sınır:** Bu, gerçek Zanistarast karmaşıklığı `K` ile iş yükü arasında doğrulanmış eşleme değildir. Kuyruk örneği yalnız `K/T` mantığından otomatik çıkarım yapılamayacağını gösterir. Boyut, ontolojik katmandır; fiziksel uzay-zaman koordinatı sayısı değildir.

## Tekrarlanabilir test

Ayrı `zanistarast_kt_synthetic_test_v2.py` ile 3 oran, 12 geçersiz giriş, 3 kuyruk senaryosu ve 1 toparlanma kontrolü yerel olarak çalıştırıldı. Beklenen çıktı: `PASS: 3 ratios, 12 invalid inputs, 3 backlog scenarios, 1 recovery assertion`. Bu bir **yazılım kontrolüdür**; ampirik doğrulama veya bağımsız hakem değerlendirmesi değildir.

## Kavramsal koruma ve açık işler

Ehad → Tek → Yek → Hebûn → Zanabûn → Mabûn → Rabûn → Rasterast korunur. **Tek genel öz/ilke, Yek belirli tekil varlık** olarak kalır. **6+Tek yedinci fiziksel boyut değildir.** Ampirik veri yok; matematiksel örnek, hipotez ve ontolojik/teolojik/normatif yorum birbirine karıştırılmaz.

Özgün makale envanteri: Önceki 11 + kullanıcının özgün 10 numara olarak tanımladığı *İnsan ve Toplum* = **12 özgün ana makale**; Core numaraları yeni özgün makale değildir. Bağımsız envanter denetimi yapılmadı.

**Açık:** Gerçek bir alanda K/T ölçümünün tanımı; yeni katman için gözlemsel ölçüt; zaman bağımlı model ve hata/belirsizlik aralıkları; gerçek veri ve bağımsız bilimsel değerlendirme; V9–V12 yerel taslaklarının güvenli dala aktarımı.

**Koruma:** Özgün/Core HTML, `main`, canlı siteler, Science Core v1 değiştirilmez. `Zanistarast-takip` deposuna erişilmez. Yayın, DOI, dergi başvurusu ve ücretli işlem yapılmaz. Mira'nın bağımsız hakem faaliyeti doğrulanmış sayılmaz.