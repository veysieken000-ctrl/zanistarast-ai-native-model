# A26 — Core 01 atom modeli: kanıt ve karşı örnek denetimi

Tarih: 2026-10-14. Statü: Araştırma taslağı; yayıma hazır değil. Science Core v1 kapalı.

## Kanonik kaynaklar (main, salt okunur)
- core-01.html, blob SHA d5aa5208e7d1af687676af3d04b53fd74de61f18; satır 156 ve 245.
- core-03.html, blob SHA 6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b; satır 76-92.
- core-05.html, blob SHA d3180d0fe0c1b370a7122f835e35b3a8483fd775; satır 731.
- core-12-yasam-temelli-ekonomi.html, blob SHA 35211b737a12e4e97fc3efb769bf0d81bd8a7cd6; bölüm 06.

Bu dört Core HTML dosyası 11 özgün makalenin envanteri değildir. Çok sayıda makale-10-* sayfası bulunması, ayrı izlenen eksik özgün 10 numaranın tamamlandığını kanıtlamaz.

## Problem ve matematik
Core 01'de atomun proton, nötron, elektron üçlüsünün zorunlu olduğu anlatılıyor. Evrensel yorum H0: Her nötr atom için proton>0, nötron>0, elektron>0.

Atom numarası Z, kütle numarası A ve yük q için p=Z, n=A-Z, e=Z-q. Nötr atomda q=0.

NIST izotop verisindeki hidrojen-1 (1H): Z=1, A=1, q=0; p=1, n=0, e=1. Bu tek karşı örnek H0'ı çürütür. 1H, 2H, 3H, 3He, 4He, 12C olmak üzere altı seçilmiş nötr izotoptan eski üçlü koşulu 5/6 örnekte sağlar; 1H'de sağlamaz. Düzeltilmiş parçacık sayımı altısında da geçerlidir. Altı örnek temsili istatistiksel örneklem değildir.

Proton, nötron ve elektron üç farklı çekim kuvveti değil, parçacık türleridir. Bu ifade fizik terminolojisi açısından ayrıca düzeltilmelidir.

NIST: https://pml.nist.gov/cgi-bin/Compositions/stand_alone.pl
NIST hidrojen: https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl?ascii=ascii&ele=H&isotype=all
IAEA: https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1429_web.pdf

## İddia matrisi
P01 Core 01 atom üçlüsünün evrensel zorunluluğu: ÇÜRÜTÜLDÜ (1H).
P02 Core 01 parçacıkların çekim kuvveti diye adlandırılması: KATEGORİ HATASI.
P03 Core 01 her varlığın merkezi olması evrenin merkezi olmasını gerektirir: KANITLANMADI, operasyonel tanım ve fiziksel kanıt gerekir.
P04 Core 03 bilgi için aynı doğrusal düzlem zorunluluğu: ÖLÇÜLEBİLİR TANIM EKSİK.
P05 Core 05 cinsiyete göre mantıksal/duygusal zekâ genellemesi: KANITLANMADI; örneklem, ölçüm, etki büyüklüğü ve ayrımcılık riski incelenmeli.
P06 Core 12 temel yaşam hakkı: NORMATİF HEDEF; A23-A25 kaynak ve erişim modellerinin gerçek verilerle sınanması gerekir.
P07 Vahid/vahdaniyet: İNANÇ VE FELSEFİ ÇERÇEVE; fiziksel karşı örnek teolojik iddianın deneysel testi değildir.

## Gerçek test ve sınırlamalar
Yerel Python unittest: 11/11 PASS; py_compile PASS. Test altı seçilmiş izotopun NIST tablosundan elle aktarılan Z ve A değerlerine dayanır. Bağımsız laboratuvar deneyi, rastgele örneklem veya yeni fizik teoremi değildir. Test komutu: python3 -m unittest -v a26_atomic_counterexample.py. Yerel kod ve test günlüğü ayrıca saklandı. GitHub CI henüz yapılmadı.

## Cuma 16 Ekim açık işler
11 özgün makalenin SHA envanteri ve ayrı eksik 10 numara; Core 01 için fiziksel iddia düzeltme taslağı; Core 03 ölçülebilir epistemoloji modeli; Core 05 literatür ve etik; ekonomi gerçek saha verisi ve ekoloji; bağımsız tekrar, literatür yenilik analizi ve hedef dergi şartları. Tamamlanmamış makale tamamlandı sayılmaz.

Üretim, main, özgün/Core HTML, canlı site, deploy, ücretli çağrı ve DOI değiştirilmedi. Zanistarast-takip erişilmedi. Mira dış sağlayıcı başarılı çağrıları doğrulanmadı.
