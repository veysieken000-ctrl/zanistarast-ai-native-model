# A45 — Mabûn: dönemsel likidite ve yaşam güvencesi

15 Ekim 2026. Science Core v1 KAPALI; yalnız araştırma taslağı.

Kanonik kaynaklar salt okunur: Core 12 (blob 35211b737a12e4e97fc3efb769bf0d81bd8a7cd6), Core 01 (d5aa5208e7d1af687676af3d04b53fd74de61f18), Core 03 (6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b), Core 05 (d3180d0fe0c1b370a7122f835e35b3a8483fd775). Core 12 temel ihtiyaçlara erişimi garanti etmeyi normatif hedef sayar, fakat dönemlik ödeme akışını ayrıca test etmek gerekir. Önceki Mabûn fıtrat/ahlak çerçevesi korunur.

Model: dönem t, kişi i, kaynak k için ihtiyaç d_ikt, birim maliyet c_kt, kapasite C_kt, dönem başında elde edilmiş gelir Y_t, rezerv R_0. Ortak güvence g ∈ [0,1], ayrık tahsis x_ikt=ceil(g d_ikt). Her dönemde sum_i x_ikt ≤ C_kt; R_t=R_(t−1)+Y_t−sum_ik c_kt x_ikt ≥0. Borçlanma yok. Teorem: d negatif olmayan tamsayı ise optimum g, {0,1} ve tüm j/d_ikt eşiklerinde aranarak tam bulunur; aralarda ceil sabittir.

Sentetik karşı örnek: İki hanenin her dönemde 2 su ve 2 gıda ihtiyacı, maliyetler 1 ve 3, stok 4 ve 4. g=1/2 dönemlik 8, g=1 dönemlik 16 maliyet. İki dönem toplam gelir 24 olsa bile Y=(4,20), R0=0 halinde ilk dönemde 8 ödenemediği için en yüksek ortak g=0. Aynı toplam gelirin Y=(20,4) sıralamasında g*=1/2. Y=(4,20) ve R0=4 iken g*=1/2. Toplam bütçe baseline g=1/2 için toplam 16 yeterli diyerek likidite açığını kaçırır. Su stoku 1'e düşerse 1000 gelir bile g>0 sağlamaz.

Yerel tekrar üretim: Python 3 standart kütüphane Fraction, seed=4515; 1000 rastgele senaryoda tam eşik çözücüsü ile 1/60 bağımsız tarama oracle'ı aynı sonucu verdi. Test logu ve çalıştırılabilir kod bu turda yerel dosyalarda tutuldu; bu GitHub belgesine kod yüklenmesi başarısız olursa ayrıca belirtilmelidir.

Etik: hak sahipliği aile bağına, çalışma kapasitesine veya ahlaki etiketlemeye bağlı değildir. Teolojik/ontolojik önermeler ile ölçülebilir nakit akışı sonucu ayrıdır. Ampirik veri ve bağımsız tekrar üretim henüz yoktur; makale hazır değildir. 11 özgün eser, 13 Core HTML değildir; özgün 10 numaranın kimliği açıktır. main, özgün DOCX, Core HTML, canlı site değişmedi.