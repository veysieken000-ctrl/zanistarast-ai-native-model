# A32 — Özgün 11 makale için kanıt zinciri ve yanlış eşleme koruması
Tarih: 2026-10-14. Cuma hedefi: 2026-10-16. Durum: Araştırma kaydı; yayın hazırlığı tamamlanmadı.

Kaynak: GitHub main üzerinden Core 01, 03, 05, 12 doğrudan salt okunur yeniden açıldı; sırasıyla blob SHA d5aa5208e7d1af687676af3d04b53fd74de61f18, 6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b, d3180d0fe0c1b370a7122f835e35b3a8483fd775, 35211b737a12e4e97fc3efb769bf0d81bd8a7cd6. Dördü de A30 envanterindeki değerlerle eşleşiyor. A30 JSON blob 05776a80b32e4fbf6be8037e294c618dbac262e0; A31 JSON blob 98e6469c497cd28ab8a237c35dfafcc2da9c31fc. GitHub API blob kimliği geri okundu; bu turda baytların bağımsız yerel SHA hesabı yapılmadı.

Sınıf: [KAYNAK DOĞRULAMA] + [YAZILIM MODELİ]. Yeni ampirik veri, bilimsel teorem veya teolojik ispat değildir.

Hipotez: Dosya adı, sayı, metnin kendine verdiği "Orijinal Makale" etiketi ve Git blob SHA'sı tek başına yetkili özgün makale kimliği kuramaz. Birleşik kimlik kapısı yanlış kesinlik riskini azaltır.

Matematik: I = A ∧ C ∧ H; A=yetkili özgün makale eşlemesi, C=içerik kimliği doğrulaması, H=SHA bütünlük kontrolü. Yayın için gerekli prosedürel kapı P = I ∧ J ∧ R; J=hedef dergi şartları kontrolü, R=bağımsız yeniden üretim. P=1 editoryal kabul veya bilimsel hakikat için yeterli koşul değildir. Kimlik doğrulanmış özgün makale sayısı 0/11; bu 11 makalenin mevcut olmadığı veya yayın hazırlığının sıfır olduğu anlamına gelmez. Hazır sayısı için bilinen sınır 0 ≤ N ≤ 11.

Karşı örnek: Core 05 HTML içinde "Orijinal Makale — Ham Veri Katmanı" etiketi vardır, ancak A30'da verified_original=false olarak kayıtlıdır; bu bir çelişki değil, öz-etiket ile yetkili köken doğrulamasının ayrı olmasıdır. Core 10 ve makale-10 dosyaları özgün eksik #10 yerine otomatik geçirilemez. Core 01'de evrensel atom üçlüsü fiziksel olarak hidrojen-1 ile sınanmalıdır.

Baseline: Saf eşleme, Core 05 öz-etiketini veya core-10 adını doğrudan özgün eser sayabilir; güvenli yöntem bunları doğrulanmadı tutar. 27 aday belge = 11 özgün makale varsayımı reddedilir. Ölçülen yeni nicelik, bilimsel hazırlık oranı değil kimlik kanıtı eksikliği sayısıdır: 11/11 özgün yuva henüz yetkili eşlenmedi.

Test: Yerel Python 3 standart kütüphanesiyle 14/14 unittest PASS, py_compile PASS. Testler SHA-only, self-label, eksik yetki, eksik içerik kimliği, geçersiz SHA, #10 yanlış ikame, dergi/tekrar üretim kapıları ve 11 bilinmeyen yuva gibi sentetik durumları kapsar. Gerçek 11 makalenin dosya kimlikleri bilinmediğinden bilimsel sonuç veya özgün eser SHA doğrulaması testi değildir. GitHub CI çalıştırılmadı.

Etik: Yetkisiz özgün eser atfı ve sahte yayın hazırlığı iddiası yapılmaz. Bilimsel, normatif, ontolojik ve teolojik açıklamalar ayrı tutulur. Duygu deneyleri için denek refahı, Ekonomi için yaşam hakkı, ayrımcılık ve ekolojik etki ayrıca incelenmelidir.

Sınırlar: Bu turdaki dört Core HTML'nin kaynak SHA'sı doğrulandı; özgün 11'in yetkili listesi bulunamadı. GitHub kod araması "orijinal", "özgün makale", "manuscript" vb. sorgularda sonuç üretmedi; bu yokluk kanıtı değildir. Kodun 14 testi sentetiktir. Başarılı Render dağıtımı dış model çağrısı kanıtı değildir.

Cuma işleri: (1) Özgün 11 için yetkili başlık/yol/kimlik kanıtını bul, #10'u ayrı tut; (2) Core 01 hidrojen-1 düzeltme taslağı, Core 03 işlemsel deney, Core 05 türler arası karşı literatür, Core 12 gerçek veri + erişim + ekolojik sınır; (3) eşlenen her makalede hipotez, karşı örnek, baseline, kod/veri, bağımsız tekrar üretim, etik ve hedef dergi kontrolü; (4) hiçbirini bitmiş ilan etme.

## Mira durumu
14 Ekim 2026 saat 18:53:36 UTC'de Render zanistarast-papers servisinin deploy dep-db7su14s728c73bhaue0 kaydı live; commit eef0be7e56281977744039407537117c823f2187, takip filtresi mobil arayüz görünürlüğü. Bu üretim değişikliği tarafımızdan yapılmadı. Render uygulama günlükleri workspace seçimi gerektirdiğinden okunamadı. OpenAI, Gemini, Ollama, llama.cpp için güncel başarılı canlı model çağrısı: DOĞRULANMADI. 7 Ekim geçmiş hataları güncel kabul edilmedi.

Science Core v1 KAPALI. Main, özgün/Core HTML, canlı site, deploy ve ücretli işlemler değiştirilmedi; zanistarast-takip deposuna erişilmedi.
