# A31 — Mira 27 aday belge envanteri: kimlik ve yayın hazırlığı ayrıştırması

Tarih: 2026-10-14. Durum: İzole araştırma raporu; Science Core v1 KAPALI.

Kaynak: A30 kaynak envanteri (GitHub blob 05776a80b32e4fbf6be8037e294c618dbac262e0), Mira GitHub Actions run 38532005193, artifact 11878745627, ZIP SHA-256 491a1c5ef6e6a1c79116518b1f0a9f9d0c22cb7b37870654402a93e93fec98ea. Kaynak çalıştırma commit'i e35571488bc4b02c728c9a00da7829c821e44b18 (zanistarast-papers). Core 01/03/05/12 ana depoda A30'da doğrulandı; özgün 11 makalenin yetkili kimlik eşlemesi henüz yok. Özgün #10 ayrı ve çözümlenmemiştir.

Sınıf: [YAZILIM DENETİMİ], [KANIT ENVANTERİ]. Yeni ampirik bilimsel bulgu, teorem veya doğrulanmış ontolojik iddia değildir.

Hipotez: Mira'nın 27 girdilik sezgisel envanteri, 11 özgün makalenin yayın hazırlığını ölçmek için yeterli olmayabilir. Yanlış pozitif "makale" sayımını önlemek için kimlik doğrulaması ayrı bir kapı olmalıdır.

Matematik: 27 adayın 27'si farklı yol; grup sayıları mimari 10, bilimsel platform/runtime 5, formel temeller 3, native AI 1, diğer faz belgeleri 8 (toplam 27). Heuristik kelime toplamı 34.985. Hedef dergi belirtilen 0/27; doğrulanmış kaynakça 0/27; simülasyon 0/27; matematiksel ispat 0/27. Bu yalnız 27 adayın envanter alanlarıdır. Özgün makale sayısı kullanıcının beyanıyla 11; doğrulanmış kimlik eşlemesi 0/11. Özgün 11 içinden yayın hazır sayısı için veriyle desteklenen tek aralık 0 ≤ N_hazır ≤ 11; "0 hazır" hükmü çıkarılamaz. Kimlik kapısı: G_i = kimlik_i ∧ bütünlük_i ∧ içerik_i. SHA bütünlüğü kimlik yerine geçmez.

Karşı örnek: 'docs/architecture/ZANISTARAST_MIRA_MASTER_ROADMAP.md' kendisini açıkça yayımlanmış makale olmadığını belirten mimari referans olarak tanımlar (kaynak snapshot blob d79132b8863c401fb424ed5e8bbf6a7da2cc6989). 'phase-l/11-peer-reviewed-scientific-papers.md' başlığında "11" geçmesine rağmen makale #11 değildir; bilimsel yayın iş akışı taslağıdır (blob 635d9714ef48a25ffd5ac163f81bea3c29aba4f5). Bu iki örnek, dosya adı ve başlıkla özgün makale eşleştirmenin yanlışlığını gösterir.

Baseline: Saf yaklaşım 27 aday dosyayı 27 makale sanır ve kullanıcının belirttiği 11 özgün makale sayısından 16 fazla sayar; bu 16'nın yanlış pozitif olarak kesin etiketlenmesi de mümkün değildir, çünkü gerçek kimlik etiketleri eksiktir. Güvenli yaklaşım 27 adayı kaynak türüne ayırır ve özgün makale kimliklerini "doğrulanmadı" bırakır.

Test: Yerel Python 3 standart kütüphane denetleyicisi ile gerçek ZIP baytları üzerinde 14/14 unittest PASS; SHA-256 bütünlüğü, CSV/JSON satır eşlemesi, 27 yol benzersizliği, beş kategori toplamı, sıfır doğrulanmış alanlar, #10 ayrımı ve bozulmuş ZIP reddi sınandı. GitHub Actions A31 CI çalıştırılmadı. Kodun yerel kopyası ve test günlüğü ayrıca tutuldu. Testler meta-veri tutarlılığını ölçer, bilimsel sonuçların doğruluğunu değil.

Etik: Kimliği doğrulanmamış belgeleri bilimsel yayın diye sunmamak; kişisel/özel araştırma verilerini izinsiz paylaşmamak; yaşam hakkı, adalet, ayrımcılık, ekoloji ve denek haklarını alan bazında ayrıca değerlendirmek. Teolojik/ontolojik önerme, normatif ilke, matematiksel model ve ampirik kanıt ayrıdır.

Sınırlar: 27 giriş yalnız 2026-10-14 tarihli tek workflow snapshot'ıdır. Başlık algılama sezgiseldir; 0/27 alanı ilgili içeriğin gerçekte bulunmadığını kanıtlamaz. Üç belge içerik örneklemesi bütün 27'nin manuel incelemesi değildir. Özgün 11'in yolları, imzalı kaynak eşlemesi ve #10 eksiktir. Hiçbir hedef dergi kesin seçilmedi. Dergi politikaları gönderim öncesi yeniden doğrulanmalıdır.

Cuma işleri: (1) 11 özgün makale için yetkili başlık/yol/SHA/içerik eşlemesini çıkar; #10'u ikame etme. (2) Core 01 atom iddiası için düzeltme taslağı, Core 03 işlemsel tanım, Core 05 karşı literatür ve etik, Core 12 gerçek veri/baseline denetimi. (3) Makale başına veri-kod erişimi, karşı örnek, test, negatif sonuç ve özgün katkı tablosu. (4) Yalnız eşlenmiş makaleler için hedef dergi uygunluğu: PLOS ONE yayın ölçütleri ve Scientific Reports veri erişimi, yöntem ve etik şartları. (5) Bağımsız CI, tekrar üretim ve bilimsel editör denetimi; bitmemiş makaleyi hazır ilan etme.

## Operasyonel sınır ve Mira

Science Core v1 kapalı. Main, özgün/Core HTML, canlı site, deploy, servis restart, ücretli API, DOI, dergi gönderimi değiştirilmedi; zanistarast-takip erişimi yok. 14 Ekim 18:20:55 UTC'de Render servis dağıtımı live görüldü (commit efc258a48a49d1bb8601a3b3465a5422105c67f5); bu yalnız servis dağıtım kanıtıdır. OpenAI, Gemini, Ollama, llama.cpp için güncel başarılı canlı model çağrısı: DOĞRULANMADI. Render uygulama günlükleri workspace seçimi gerektirdiğinden bu turda okunamadı. 7 Ekim geçmiş hataları güncel durum değildir.

## Resmî yayın gereklilikleri (adaylar, seçilmiş dergi değil)

- PLOS ONE: https://journals.plos.org/plosone/s/criteria-for-publication ve https://journals.plos.org/plosone/s/submission-guidelines
- Scientific Reports: https://www.nature.com/srep/author-instructions/submission-guidelines ve https://www.nature.com/srep/journal-policies/editorial-policies
