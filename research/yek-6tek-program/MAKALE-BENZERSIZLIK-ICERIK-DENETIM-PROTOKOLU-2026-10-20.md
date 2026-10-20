# Makale benzersizliği ve yayımlanabilirlik — içerik denetimi protokolü

**20 Ekim 2026 | Güvenli araştırma dalı | Araştırma protokolü, tamamlanmış denetim değildir.**

## Korunan kanonik beyan

“Ehad Yek'tir ve Ehad âlemlerdeki her şeyi Yek'e göre yaratmıştır; her kar tanesi, her parmak izi dahil.”

Yek insan özü, makale entegrasyon yöntemi veya yaratılmış ayrı katman değildir. Makale benzersizliği denetimi **Yek ontolojisinden türetilmiş bilimsel ispat** değildir; bağımsız bibliyografik/akademik kalite kontrolüdür.

## Ön koşul ve doğrulanamayan PR

Kullanıcı PR #67'nin açıldığını ve CI'nin henüz doğrulanmadığını bildirdi. 20 Ekim'de `zanistarast-ai-native-model` deposunda #67 için GitHub PR review/thread sorguları `NOT_FOUND` döndürdü. Bu, PR'nin başka depoda bulunabileceği veya erişim kısıtı olabileceği anlamına gelebilir; **bu depoda PR varlığı, test başarısı ve birleştirme yetkisi doğrulanmadı**. PR numarasına dayanarak merge yapılmaz. Önce gerçek repo/PR URL ve head SHA tespit edilir.

## Sayılacak farklı nesneler

1. **Kaynak dosyası**: envanter filtresinden geçen tekil dosya yolu.
2. **Birebir farklı içerik**: byte/hash bakımından farklı dosya; bilimsel katkı ölçmez.
3. **Aynı eserin sürümü**: revizyon, tercüme, format dönüşümü, özet, tekrar; tek araştırma ailesi.
4. **Bağımsız araştırma adayı**: açıkça ayrışan soru + yöntem/argüman + ilgili literatür + özgün katkı gerekçesi.
5. **Yayıma hazırlanabilir makale**: yeterli metin, kaynak, yöntem, karşı örnek, etik ve bağımsız kontrolü bulunan aday; yayımlanmış/hakemli olmakla aynı değildir.

## Denetim algoritması — öneri

- Kaynak kimliği: depo, yol, commit SHA, içerik SHA, tarih, kaynak türü, izin durumu.
- İçeriği güvenli biçimde çıkar: HTML/Markdown/TXT için metin; PDF/DOCX için uygun okuma araçları; çıkarılamayanı 'incelenemedi' diye işaretle, sıfır sayma.
- Normalizasyon: Unicode, boşluk, HTML etiketleri, tekrarlanan şablon/navigasyon; **kaynak anlamını, alıntıyı veya denklem içeriğini silme**.
- Birebir içerik eşitliği; başlık benzerliği; paragraf örtüşmesi; kaynakça/ana tez/yöntem örtüşmesi. Otomatik benzerlik yalnız inceleme önceliği verir.
- Aynı araştırma ailesine ait sürümleri birleştir; ayrı araştırma sorularını gerekçeyle ayır. İnsan/bağımsız editoryal denetim olmadan 'kesin benzersiz' hükmü verme.
- Her aday için: kategori, kaynak, soru, literatürde en yakın iş, özgün katkı, kanıt türü, test/karşı örnek, etik, eksik, yayın hazırlık durumu, dört hedef bağlantısı.
- Raporla: kaynak sayısı, tam metni okunabilen sayı, birebir içerik aileleri, sürüm aileleri, inceleme bekleyenler, **kanıtlanmış bağımsız araştırmalar**, yayıma hazırlar; belirsizlik ve erişim sınırı ayrı.

## Negatif testler (beklenen sonuç)

| Test | Girdi | Doğru davranış |
|---|---|---|
| 412 aynı başlık | 412 farklı dosya yolu, aynı başlık | 412 benzersiz makale veya 412 yayıma hazır makale **ilan etme** |
| 412 aynı içerik | 412 yol, aynı metin | Tek içerik ailesi; 412 kaynak dosyası |
| Format farkı | Aynı metin HTML/MD/PDF | Tek araştırma ailesi, format sürümleri |
| Revizyon | Aynı soru ve yöntem, düzenlenmiş metin | Aynı araştırmanın sürümleri |
| Başlık çakışması | Aynı başlık, farklı soru ve yöntem | Otomatik tekleştirme yapma; ayrı incele |
| Metin benzerliği | Yüksek benzerlik ama farklı özgün kanıt | İnsan incelemesi; gerekçeli ayrı aday olabilir |
| Eksik kaynak | Dosya okunamadı veya izin yok | 'Bilinmiyor'; özgün/yayıma hazır sayma |
| Teolojik iddia | Ontolojik beyan var, deney yok | Felsefi/teolojik makale türüne yönlendir; deneysel ispat deme |

## Öncelik ve külliyatın dört hedefi

1. Zanistarast: Ehad–Yek, Hebûn–Zanabûn, 6+Tek, akıl/ruh, Rasterast çekirdekleri.
2. Rabûn: Ahlak/Hüküm/Ekonomi meclisleri, temsil ve denetim modelleri.
3. Mabûn: yaşam temelli üretim, holding/özel teşebbüs, finansman stres testleri.
4. Newroza Kawa: tarih, sosyoloji, jeoloji, eğitim, ekoloji, hukuk, yapay zekâ ve uygarlık senaryoları.

**412 aday kaynak ve 407 birebir farklı Git blob eski başlangıç envanteridir; güncel benzersiz akademik makale sayısı değildir.**

## Güvenlik ve teslim kriteri

Bu belge tek başına yazılım testi çalıştırıldığı veya 412 metnin karşılaştırıldığı anlamına gelmez. İleride gerçek uygulama için CI test sonucu, test koşusu bağlantısı, head SHA, denetlenen kaynak kümesi ve örneklenmiş karar kayıtları gerekir. main, özgün Word/Core, Science Core v1, canlı site, dış dergi ve DOI işlemleri kapsam dışıdır.
