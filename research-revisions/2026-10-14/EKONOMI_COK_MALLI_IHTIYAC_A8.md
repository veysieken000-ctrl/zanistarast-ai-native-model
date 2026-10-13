# A8 — Çok mallı ihtiyaç garantisi (14 Ekim 2026)

Kaynak: kanonik `core-12-yasam-temelli-ekonomi.html`, blob `35211b737a12e4e97fc3efb769bf0d81bd8a7cd6`, Temel Yaşam Hakkı ve İşleyiş bölümleri. Core 05 Duygu blob `d3180d0fe0c1b370a7122f835e35b3a8483fd775` normatif/ontolojik yorum içerir; burada ampirik veri değildir.

İki hane, ikame edilemeyen gıda ve su: A ihtiyacı (6,4), B ihtiyacı (2,4). Toplam (8,8). Kayıpsız, taşınabilir, aynı kalite, bölünebilir mallarda tüm ihtiyaçlar ancak her malın arzı o malın toplam ihtiyacına eşit veya büyükse karşılanır. Gereklilik, arz kısıtlarının toplanmasından; yeterlilik, her haneye ihtiyacı kadar vermekten gelir.

Karşı örnek: arz (10 gıda, 6 su) toplam 16 birimdir ve toplam ihtiyaç da 16'dır; fakat su açığı en az 2'dir. Gıda fazlası su açığını kapatmaz. Arz (8,8) için ihtiyaca göre tahsis A=(6,4), B=(2,4) sıfır açık verir; eşit bölüşüm A=(4,4), B=(4,4) ise A'da 2 gıda açığı yaratır. Arz (7,8) için en iyi açık 1, eşit bölüşüm açığı 3'tür.

Matematik: U = toplam max(0, ihtiyaç - tahsis); U*(Sf,Sw)=max(0,8-Sf)+max(0,8-Sw). İspat mal bazında bağımsız toplam ihtiyaç kısıtlarıyla kurulur. Bu yalnız toplam birim açığını en aza indirir; adaletin tamamını ölçmez.

Python 3 ile 0..10 aralığında 121 arz çifti ve 4356 tam sayı tahsisi tarandı; 121/121 formül kontrolü PASS. Üç baseline: (8,8) optimum 0 / eşit 2; (10,6) optimum 2 / eşit 3; (7,8) optimum 1 / eşit 3. Test kodu ve tekrar üretim tarifi: Her Sf,Sw için xf=0..Sf, xw=0..Sw gez; B tahsisi (Sf-xf,Sw-xw); iki hanenin pozitif açıklarını topla; en küçüğü formülle karşılaştır. Rastgelelik yok, gerçek veri yok.

Dergi ve etik blokajları: kaynak tahsisi literatürü, saha verisi, lojistik/kalite/ulaşım kısıtları, dağıtım adaleti, duyarlılık ve bağımsız tekrar gerekli. Core metinleri normatif modeldir; bu sentetik test ampirik kanıt değildir. 11 özgün makale ve ayrı eksik özgün 10 numara ayrımı korunur; envanter tamamlanmadı. Science Core v1 kapalı. 16 Ekim hedefi için tamamlandı iddiası yok. Kanonik/Core, özgün eser, main, canlı servis, DOI ve dergi gönderimi değiştirilmedi.