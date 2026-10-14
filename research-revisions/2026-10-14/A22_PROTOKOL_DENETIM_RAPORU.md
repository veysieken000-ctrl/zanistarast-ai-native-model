# A22 — Yol Sapması Protokolü için ilk otomatik denetim

Kaynak: Kanonik Core 12 (önceki A21 kaydı) ve araştırma dalındaki Temel İlkeler Protokolü V1. Bunlar normatif çerçevedir; otomatik doğruluk ispatı değildir.

Sınıf: [MODEL] / [YAZILIM TESTİ].
Hipotez: Zorunlu rapor alanları eksik veya açık yasaklı durum ifadeleri mevcutsa statik kontrol bunları işaretleyebilir.
Matematik: pass = (eksik alan sayısı = 0) ve (yasak ifade sayısı = 0). Bu yalnız sözdizimsel bir gerekli koşuldur, yeterli koşul değildir.
Karşı örnek: Bir rapor bütün başlıkları doldurup gerçekte yanlış bilimsel iddia içerebilir; statik kontrol PASS verse bile hakikat doğrulanmış olmaz.
Baseline: Denetimsiz rapor kabulünde zorunlu alanlar için otomatik tespit 0'dır. Bu denetim 10 zorunlu alanı ve 4 örnek risk ifadesini tarar.
Test: Yerel unittest 5/5 PASS. İlk koşuda 2 FAIL bulundu; boş alan ve Türkçe I/ı büyük-küçük harf hataları düzeltildi; nihai koşu PASS. Testler yerel ve sentetiktir.
Etik: Yaşam hakkı, ayrımcılık, ekoloji ve kanıt sınıfı ayrıca insan incelemesine tabidir; yazılım inanç doğruluğuna hükmetmez.
Sınırlar: Sadece Türkçe başlıklar, dört risk ifadesi; anlamsal, bilimsel, dergi ve veri doğrulaması yok. Negasyon bağlamı nedeniyle yanlış pozitif olabilir. GitHub CI entegrasyonu yapılmadı.
Cuma işleri: Gerçek makaleler üzerinde salt okunur rapor üretimi, yanlış pozitif/negatif analizi, Core 01/03/05/12 kaynak SHA envanteri, eksik özgün #10, etik ve dergi denetimi.

Science Core v1 kapalı; main, Core HTML, üretim ve canlı site değiştirilmedi. Mira dış sağlayıcı başarılı çağrıları doğrulanmadı.
