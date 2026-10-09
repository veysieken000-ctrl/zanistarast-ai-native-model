# Mabûn Run 13 — ekolojik stok eşiği, araştırma notu (2026-10-09)

Durum: sentetik araştırma önerisi; gerçek saha doğrulaması veya Mira uygulaması değildir.

Önceki Run 12 kodunda output_max politikası dönem başına 85 birim hasat hedeflerken ihtiyaç politikası yaklaşık 50 birim hedefliyor. Lojistik yenilenme G=r*S*(1-S/K) için teorik üst sınır r*K/4. K=500 iken r=.35 ve .55 koşullarında üst sınır 43.75 ve 68.75; 85'lik hedef yenilenme kapasitesini aşıyor. Bu nedenle tükenme, bütün büyüme odaklı modellerin başarısızlığını ispatlamaz.

Yeni deney: K=500, başlangıç stoğu 320, koruma eşiği 200, dönemlik ihtiyaç 45, verim .9, 240 dönem, 300 eşleştirilmiş rastgele tohum, üç r değeri (.35,.55,.75), dört politika: needs, needs_recovery, precautionary, precautionary_recovery. Toplam 3600 sentetik koşum. İki 24-dönemlik iklim şoku kullanıldı.

r=.35 için ortalama ihtiyaç karşılama: %11.99, %16.42, %79.26, %83.51 (sırasıyla). Korumasız politikalar sıfır stokta kaldı, korumalı politikalar 200 stok eşiğini tuttu. r=.55'te hizmet oranları sırasıyla %100, %100, %99.94, %100; r=.75'te hepsi %100. Koruma kuralı her durumda ücretsiz başarı sağlamıyor; kısa dönem hak ve ihtiyaç açığı ayrı izlenmeli. Stok eşiği ampirik kalibre edilmedi.

Özgün HTML kaynakları yeniden incelendi: mabun-03-doga-referansli-ekonomi.html, mabun-05-ekonominin-medeniyetle-iliskisi.html ve rabun-18-ekonomi-meclisi-mabun.html. Doğa referanslı ekonomi ve bilgi–ahlak–hüküm ilişkisi zaten mevcut; yeniden keşif gibi sunulmamalı. Rabûn Hüküm, Ahlak, Ekonomi meclislerini ve geçici Şûra'yı koru. Bilgi, kaynak ve belirsizlik kaydı → Ekonomi ihtiyaç/stok analizi → Ahlak hak ve emanet kontrolü → Hüküm yetki/itiraz → Rasterast doğrulama önerilir.

Hebûn'dan başlayan makalelerde özgünlük, kaynak, ölçüm, yanlışlama, istatistik, teolojik/ampirik ayrımı, etik, hedef dergi ve gerçek hakemlik açık kalite kapılarıdır. Mira'nın önceki önerileri uygulamama gerekçesi bilinmiyor; mevcut genel governance/review_process.md dosyası 3 bağımsız hakem × 2 tur kanıtı değildir. ChatGPT dördüncü hakem değildir.

FAO yöntemsel kaynak: https://www.fao.org/4/w3592e/w3592e07.htm . Main, canlı site, DOI ve yayın değişmedi.