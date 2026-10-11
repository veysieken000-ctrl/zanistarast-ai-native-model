# Mira çalışma engelleri — 11 Ekim 2026

## Kanıtlı sorunlar
1. `backend/package.json` ES module modunda, `backend/server.js` doğrudan `require` çağırıyordu. İzole dalda `createRequire` eklendi.
2. `backend/server.js` mevcut dalda bulunamayan `./routes/mi_engine.js` dosyasını statik import ediyordu. İzole dalda isteğe bağlı yükleme ve açık hata kaydı eklendi.
3. `backend/rag_search.js` yalnız `knowledge/*.txt|*.md` okuyordu. İzole dalda kökteki `core-*.html` metinlerinin de alınması sağlandı.
4. `enforceTruthFormat` biçimi uymayan cevabı sahte `FALSE` yanıtına dönüştürüyordu. İzole dalda bu zorlamayı kaldırdık.

## Açık riskler
- Core HTML'den regex ile metin çıkarma ilk aşama çözümüdür; karmaşık HTML ve Türkçe karakter varlıkları için DOM tabanlı ayrıştırıcıyla test gerekir.
- `buildTruthAnalysisPrompt` ve `buildRepairSystemPrompt` hâlâ belirsizliği yasaklayan bilimsel açıdan sorunlu yönergeler içeriyor. Ana kullanıcı deneyimi kararı verilerek ayrı düzenlenmeli.
- `api/runtime_gateway.js`, `api/zanistarast_formal_gateway.js` ve alt modülleri CommonJS kullanıyor; daha derin modül sınırı ve eksik bağımlılık testi gerekir.
- Gerçek OpenAI API anahtarı, model yetkisi, maliyet ve uçtan uca soru/cevap testi doğrulanmadı. Gizli anahtarlar rapora yazılmamalı.
- Render `zanistarast-mira` statik site dağıtımı 10 Eylül başarılı; `zanistarast-ai-server` için Temmuz'da başarısız güncellemeler görüldü, son 30 günlük günlüklerde kayıt yok. Canlı çalışıyor demek için yeterli değil.
- `zanistarast-mira` ayrı `zanistarast-papers` deposundan `reference-implementation/mira-pwa` kökünden dağıtılıyor; bu dalda yapılan düzeltmeler otomatik olarak Mira PWA'sını değiştirmez. Bu depo kullanıcı talimatıyla bu denetimde değiştirilmedi.
- Mira üç hakem iki tur, ses, konuşma geçmişi, model bağlantısı, kalıcı veritabanı ve kullanıcı oturumu uçtan uca doğrulanmadı.
- Backend `/health` yalnız proses yanıtını gösterir; AI ve RAG sağlığını kanıtlamaz.

## Güvenli kabul sırası
1. İzole dalda Node syntax / modül çözümleme ve başlatma testi.
2. `/health` yanıtı ve eksik modüllerin 503 dönmesi.
3. Core HTML için en az iki özgün başlıkla kaynaklı arama testi.
4. Gerçek AI isteği ve yanlış/belirsiz ayrımı testi.
5. Mira PWA'dan aynı API'ye bağlantı, hata ve konuşma testi.
6. Üç hakem iki tur ve bilimsel denetim kayıtlarıyla doğrulama.
7. Kullanıcı onayı olmadan main merge veya canlı dağıtım yok.

Bu belge sonuç değil, doğrulanabilir iş ve risk kaydıdır.