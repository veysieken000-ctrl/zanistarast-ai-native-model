# A24 — Ağ erişimi ve yaşam güvencesi (2026-10-14)

**Statü:** İzole araştırma raporu; saha kanıtı veya yeni teorem değildir. Science Core v1 kapalıdır.

**Kanonik kaynaklar (main, salt-okunur):** core.html blob 8e558e1bcef6004afeff1604b32d6fab10e0d9df; Core 01 d5aa5208e7d1af687676af3d04b53fd74de61f18; Core 03 6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b; Core 05 d3180d0fe0c1b370a7122f835e35b3a8483fd775; Core 12 35211b737a12e4e97fc3efb769bf0d81bd8a7cd6. A23 kaynak kodu ae4dd572df341f7b73ca1d69fcb0a4824c2ee517.

**Problem:** Core 12 bölümleri 04–06, yaşam ihtiyaçlarına fiilî erişim ve dağıtımı vurgular. A23 toplam stok modeli ulaşım bağlantılarını ölçmez.

**Matematiksel çözüm:** Her mal k, hane i, depo s için pozitif talep d_ik, kullanılabilir depo stoku c_sk, bağlantı kapasitesi u_sik olsun. Max-min erişim g için akışlar x_sik: sum_i x_sik <= c_sk, x_sik <= u_sik, sum_s x_sik >= g d_ik. Max-flow/min-cut gereği
g* = min(1, min_k min_{H boş değil} min_A [sum_{s A dışında} c_sk + sum_{s A içinde,i H içinde} u_sik] / sum_{i H içinde} d_ik).
Bu bilinen ağ akışı teoreminin özel uygulamasıdır; ispatı tam raporda ve yerel kodda açıklanır.

**Karşı örnek:** Tek malda d=(2,2), c=(2,2), u=[[2,0],[2,1]]. Stok-baseline g=1; ağ erişim güvencesi g=1/2. İkinci haneye en fazla 1 birim ulaşır.

**Test:** Python 3.13.5, SciPy 1.17.0; yerel altı unittest PASS; 2.916 tek-mal + 144 iki-mal = **3.060** sentetik bağımsız HiGHS LP çapraz doğrulaması PASS; py_compile PASS. Yerel dosya: a24_network_guarantee.py, SHA256 2fca0d676607fc13759201acc3035b6ae5740272ccd616bb89d030ca4b7e6f6b. **GitHub kod yüklemesi güvenlik kontrolünde engellendi; kod için GitHub commit yok, bağımsız CI yok.**

**Diğer öncelikler:** Core 01 fizik iddiaları için ölçülebilir değişken ve kanıt, Core 03 özne-nesne 'aynı doğrusal düzlem' önermesi için operasyonel tanım, Core 05 insan dışı duygu iddiası için karşı literatür ve ampirik test gerekiyor. Bu turda doğrulanmadı.

**Etik:** Vahid-vahdaniyet/Ehad, kullanıcıya ait inanç ve normatif ilkedir; ampirik ispat diye sunulmaz. Yaşam hakkı ve ekolojik sınırlar ayrımcı veya keyfî zarar gerekçesi olamaz.

**Dergi hazırlığı:** Scientific Reports yönergeleri: https://www.nature.com/srep/author-instructions/submission-guidelines ; PLOS ONE: https://journals.plos.org/plosone/s/submission-guidelines . Veri/kod/etik beyanı, yenilik karşılaştırması, gerçek veri ve bağımsız tekrar eksik; hedef dergi seçilmedi.

**Cuma 16 Ekim açık işler:** Gerçek ulaşım/temel ihtiyaç verisi, zaman ve bozulma, bölünemez mallar, ekolojik etki, Core 01/03/05 doğrulaması, 11 özgün makale ve ayrı eksik 10 numara envanteri, CI ve hedef dergi denetimi.

**Operasyon:** Core HTML/orijinal eserler/main/canlı site/deploy değiştirilmedi. Zanistarast-takip erişilmedi. Dış model sağlayıcıları için başarılı canlı yanıt kanıtı yok: doğrulanmadı.
