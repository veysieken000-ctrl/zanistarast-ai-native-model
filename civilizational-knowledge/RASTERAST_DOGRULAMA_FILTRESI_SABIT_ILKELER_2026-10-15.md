# Rasterast Doğrulama Filtresi — Sabit İlkeler ve Uygulama Kapısı

**Tarih:** 15 Ekim 2026  
**Durum:** Proje sahibinin 15 Ekim 2026'da ayrıca önemini teyit ettiği, mevcut kaynaklara dayanan sabit doğrulama referansı.  
**Kapsam:** Zanistarast bilimsel sentezi; Hebûn, Zanabûn, Mabûn ve Rabûn; araştırma, yönetim, alt meclisler, meclis holdingleri, özel teşebbüs, eğitim, hukuk, teknoloji ve AI çıktı/kararları.  
**Değişiklik ilkesi:** Kaynak ve sürüm izlenebilirliği olmadan sessiz tanım değişikliği yapılmaz. İlke değişikliği, proje sahibinin açık talebi ve çelişki/etki analizini gerektirir.  
**Yetki sınırı:** Bu belge, önceden tanımlı doğrulama kurallarını açıklayan **sürümlü referanstır**. Mevcut anayasal, değişmez çekirdek veya Science Core v1 dosyalarını değiştirmez. Tek başına otomatik kod denetimi ya da teknik olarak değiştirilemez GitHub koruması kurmaz.

## 1. Konum ve değişmez yöntem ilkesi

**Rasterast, sonradan eklenebilecek isteğe bağlı bir süs değil; modelin bilgi, karar ve uygulama ürettiği tüm ilgili süreçlerde vazgeçilmez doğrulama filtresidir.**

- **Hebûn:** Varlık ve gerçeklikle ontolojik uyum sorusu.
- **Zanabûn:** Bilgi kaynağı, yöntem, gözlem, mantık ve bilimsel sınama sorusu.
- **Mabûn:** Kaynak, emek, ihtiyaç, dağıtım, hizmet ve ekonomik sürdürülebilirlik sorusu.
- **Rabûn:** Ahlak, hüküm, ekonomi meclislerinin kurumsal yetki ve sonuçları; alt meclis ve holding uygulamaları.
- **Rasterast:** Bu katmanların her birindeki iddialar ve aralarındaki ilişkiler için kaynak, tutarlılık, yanlışlanabilirlik, ahlak ve sonuç denetimi. Bir alanın kısmi başarısı diğer alanlardaki doğrulama eksiğini gizlemez.

**Proje ilkesi:** Akıcı anlatım, kurumsal otorite, propaganda veya ikna gücü; doğrulanmış kanıtın yerine konamaz. Herhangi bir kurulu modelin iddiaları, Rasterast sınamasından muaf değildir.

## 2. Kaynaktaki zorunlu doğrulama katmanları

[Constitution: Rasterast Verification Duty](../constitution/09-rastaras-verification-duty.md) belgesinin sekiz kontrolü aynen esas alınır:

1. Kaynak doğrulama (Source Validation)
2. Bağlam doğrulama (Context Validation)
3. Çelişki taraması (Contradiction Detection)
4. Mantıksal tutarlılık analizi (Logical Consistency Analysis)
5. Güven düzeyi değerlendirmesi (Confidence Scoring)
6. Bağımsız/çapraz kaynak karşılaştırması (Cross-Reference Verification)
7. Bütünlük incelemesi (Integrity Assessment)
8. Belirsizliğin açıkça belirtilmesi (Uncertainty Disclosure)

[Rasterast 01 — Doğrulama Filtresi](../rasterast-01-dogrulama-filtresi.html) ayrıca **gözlem → ölçüm → mantık → çelişki → sistemsel uyum → evrensel kontrol → geçici doğrulama** çizgisini tanımlar. [Rasterast 06](../rasterast-06-yanlislanabilirlik.html) bilimsel iddialar için yanlışlanabilirliğin, [Rasterast 07](../rasterast-07-epistemik-guvenlik.html) çoklu kaynak ve epistemik güvenliğin önemini açıklar.

**Sabit bilimsel sınır:** Tutarlılık, tek başına gerçek dünyadaki doğruluğun ispatı değildir. Matematiksel ispat, sentetik test, gerçek saha gözlemi, normatif değerlendirme ve metafizik yorum birbirine karıştırılamaz. Yeni ve karşıt kanıtların kabulü engellenmez; değerlendirme yeniden açılır. Bilimsel çalışma, dışarıdan bağımsız tekrar üretime ve yanlışlanmaya açık kalır.

## 3. Mevcut makine tarafından okunabilir kurallar (RR-001–RR-010)

Kaynak: [knowledge/rasterast_rules.json](../knowledge/rasterast_rules.json). **Özgün karar isimleri ve `hard_block` ayrımı korunur.**

| ID | Kural | Kaynakta `hard_block` |
|---|---|---|
| RR-001 | Çift Doğrulama (tümdengelim + tümevarım) | true |
| RR-002 | Çelişki Analizi | true |
| RR-003 | Halüsinasyon Kontrolü | true |
| RR-004 | Tutarlılık | false |
| RR-005 | Tekrarlanabilirlik | false |
| RR-006 | İzlenebilirlik | false |
| RR-007 | Hıfz: yalnız geçenlerin kalıcı doğrulanmış bilgiye alınması | true |
| RR-008 | Sürekli Öğrenme | false |
| RR-009 | Şeffaf Gerekçe | false |
| RR-010 | Nihai Hakikat Filtresi | true |

Kaynak JSON'daki `validation_order`: `Quran`, `PropheticEthics`, `Fitrah`, `Dimension`, `Mabun`, `Deduction`, `Induction`, `Consistency`, `Truth`. Bunlar projenin **iç normatif ve yöntemsel kontrol sırasıdır**. Kur'an ve peygamber ahlakına ilişkin normatif ölçüler, bilimsel ampirik hipotezlerin gözlemsel testinin yerine geçmez.

Kaynak JSON'daki karar politikası:

- Herhangi bir `hard_block` tetiklenirse: **`RED`**.
- Katmanlar arasında çelişki varsa: **`REVIEW`**.
- Bütün katmanlar geçerse: **`HIFZ`**; bu durumda kaynak JSON'u `WRITE_TO_TRUTH_LOG` adımını tanımlar.
- **Uygulama açıklaması:** Kontrol edilmemiş ve eksik kanıtlı iddialar doğrulanmış diye kaydedilmez. `HIFZ` bir iç onay statüsüdür; yayımlanmış, evrensel veya değiştirilemez bilimsel gerçek iddiası değildir.

## 4. Rabûn–Mabûn için zorunlu bağlantı

- **Ahlak Meclisi:** Yaşam hakkı, adalet, iradeli güzel ahlak ve zarar riskleriyle ilgili kararları Rasterast denetiminden ayrı tutamaz.
- **Hüküm Meclisi:** Hukuki yorum, uygulama, yetki ve adalet ilişkilerinde kaynak, gerekçe, tutarlılık ve itiraz/yeniden inceleme ihtiyaçlarını kaydeder.
- **Ekonomi Meclisi / Mabûn:** Kıtlık, ihtiyaç, fiyat/maliyet, stok, bütçe, dağıtım, emek ve ekolojik maliyetle ilgili iddiaları ölçülebilir verilerle sınar.
- **Alt meclisler ve holdingler:** Eğitim, sağlık, tarım, güvenlik, hizmet ve maaş finansmanı için sadece niyet değil, kaynak-gider, dağılım, eşit erişim, sürdürülebilirlik ve zarar göstergelerini de değerlendirir.
- **Vergisiz toplum hedefi:** Normatif ve kurumsal hedef olarak korunur; vergisiz finansmanın mümkün olduğuna ilişkin ampirik, makroekonomik ve bütçesel iddialar ayrıca doğrulanmalıdır. Mali açık ve olumsuz sonuçlar filtreden saklanamaz.
- **Özel teşebbüs:** İşletme özerkliğiyle birlikte emek hakkı, tekelleşme, hizmet, çevre ve toplumsal katkı değerlendirmesine tabidir.
- [Rabûn 35 — Rasterast Politika Kontrolü](../rabun-35-rasterast-politika-kontrolu.html): **Veri → Akıl → Ahlak → Doğrulama → Uygulama** yönü korunur. Belgede doğrulanmayan politikanın uygulanmaması esastır.
- [Rasterast 08 — Sistemsel Doğruluk](../rasterast-08-sistemsel-dogruluk.html): Rabûn kararları ve Mabûn sürdürülebilirliği kısa ve uzun vadeli etkileriyle birlikte değerlendirilir.

## 5. A49 ve bilimsel yayın kapısı

- A49 gibi modellerde test başarısı, gerçek dünya geçerliliğiyle eşitlenmez. Matematiksel doğruluk, bağımsız algoritma eşleşmesi, ölçüm verisi, etik değerlendirme ve kurumsal uygulama farklı kontrol basamaklarıdır.
- Her makale için en az kaynak/sürüm envanteri, önceki literatür, falsifiye edilebilir varsayım, matematik/kod/sentetik test ayrımı, gerçek dünya kanıtı durumu, kısıtlar, çelişkiler, etik sınırlar ve tekrarlanabilirlik açıkça yazılır.
- Kanıt yoksa **`REVIEW`/araştırma aşaması** olarak tanımlanır; sırf çerçeveyle uyumlu olduğu için `HIFZ` veya dergiye hazır ilan edilmez.
- Science Core v1 **kapalı** kalır; deneysel araştırma izole dosyalarda yürütülür. Filtre geriye dönük kanonik metinleri otomatik değiştirmez.

## 6. Gerçek otomasyon sınırı ve sonraki teknik doğrulama

Mevcut depoda [`backend/verifier/rasterast_verifier.js`](../backend/verifier/rasterast_verifier.js) ve [`verification_pipeline.js`](../backend/verifier/verification_pipeline.js) bulunmaktadır; bunlar gösterilen kodda yalnız **dört boole parametresini** kontrol eder. Bu, anayasadaki sekiz kontrolün veya RR-001–010 kurallarının üretimde bütünüyle çalıştığının **kanıtı değildir**.

İleride otomatik yaptırım için ayrı, izole ve testli bir uygulama gerekecektir: kaynak/kural eşlemesi, olumsuz örnek testleri, `RED/REVIEW/HIFZ` gerekçeleri, bağımsız testler, denetim kaydı, manuel inceleme/itiraz, kural sürümü ve gerçek entegrasyonun CI ile doğrulanması. Bu belgenin eklenmesi böyle bir entegrasyon yapıldığı anlamına gelmez.

## 7. Değişmez kalması istenen davranış standardı

1. **Önce doğrula, sonra iddia et veya uygula.**
2. **Uydurma kaynak ve yapay kesinlik üretme.**
3. **Çelişkiyi gizleme; işaretle, askıya al, incele.**
4. **Normatif uygunluk ile ampirik doğrulamayı ayrı raporla.**
5. **Bütün katmanların gerçek etkisini, yaşam hakkını ve doğayı dikkate al.**
6. **Yeni veriye, bilimsel eleştiriye, yanlışlanmaya ve düzeltmeye açık kal.**
7. **Belirsizlik, kaynak, sürüm ve karar gerekçesini saklama; izlenebilir tut.**
8. **Rabûn ve Mabûn dâhil hiçbir alt sistem veya AI çıktısı Rasterast denetiminden ilke olarak muaf olmasın.**

## 8. Kaynak zinciri

- [Constitution — Rasterast Verification Duty](../constitution/09-rastaras-verification-duty.md)
- [Core — Rasterast Hallucination Filter](../core/rasterast-hallucination-filter.md)
- [RR-001–RR-010 JSON](../knowledge/rasterast_rules.json)
- [Rasterast metodoloji (D0)](../backend/knowledge/D0_rasterast_method.txt)
- [Rasterast tutarlılık (D2)](../backend/knowledge/D2_rasterast.txt)
- [Rasterast 01 — Doğrulama](../rasterast-01-dogrulama-filtresi.html)
- [Rasterast 02 — Çelişki](../rasterast-02-celiski-analizi.html)
- [Rasterast 06 — Yanlışlanabilirlik](../rasterast-06-yanlislanabilirlik.html)
- [Rasterast 07 — Epistemik Güvenlik](../rasterast-07-epistemik-guvenlik.html)
- [Rasterast 08 — Sistemsel Doğruluk](../rasterast-08-sistemsel-dogruluk.html)
- [Rabûn 35 — Politika Kontrolü](../rabun-35-rasterast-politika-kontrolu.html)
- [Rabûn–Mabûn — Sabit İlkeler](RABUN_MABUN_SABIT_ILKELER_2026-10-15.md)
