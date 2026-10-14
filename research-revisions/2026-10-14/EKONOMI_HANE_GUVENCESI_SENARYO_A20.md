# A20 — Yaşam Temelli Ekonomi: senaryo belirsizliğinde hane bazlı hizmet güvencesi

Tarih: 2026-10-14. Bilimsel statü: bilinen maksimum-akış/minimum-kesit teoreminin yeni bir uygulama/karşı örnek denetimi; bağımsız evrensel teorem veya ampirik keşif iddiası yoktur. Science Core v1 kapalıdır.

## Okunan kaynak ve sınır
- Kanonik `core-12-yasam-temelli-ekonomi.html` (Git blob `35211b737a12e4e97fc3efb769bf0d81bd8a7cd6`), §04, §05, §06 ve §08: temel ihtiyaç, ulaşım ve dağıtım ilkeleri. Bunlar normatif hedeflerdir, ölçülmüş sonuç değildir.
- Kanonik `core-03.html` (blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`), `core-01.html`, `core-05.html` salt okunur incelendi.
- Önceki A15/A16 yerel araştırma raporları: tek senaryolu ve belirsizlik altındaki toplam maksimum akış. A20 bu toplamın hane düzeyinde güvence olmadığını nicel olarak ayırır.
- Makale envanteri kodu `zanistarast-papers/tools/manuscript_inventory.py` (blob `8ee6b22b4a3bf93d2f4e099a4368c240e62b10a3`) HTML uzantısını dışlıyor; 11 özgün makale ve ayrı eksik 10 numara doğrulanmış sayılmaz.

## Açık matematik ve tümdengelim
Tek mal, tek dönem, bölünebilir yük, sıfır kayıp, sabit arz `s_i>=0`, pozitif ihtiyaç `d_j>0`, senaryoya bağlı hat kapasitesi `c^k_ij>=0`, sonlu senaryo kümesi varsayılır. Dağıtım `x_ij` için depo, hat ve hane üst sınırları uygulanır.

En kötü hane karşılama oranı:
`g(c)=max_x min_j (sum_i x_ij / d_j)`.

Her haneye en az `lambda*d_j` gönderebilmeyi kaynak-depo-hane-hedef akış ağıyla test ederiz. Hane->hedef kapasitesi `lambda*d_j` seçilirse toplam `lambda*sum(d)` akışın elde edilmesi bütün hanelerin kotasının karşılanmasına denktir. Max-flow/min-cut gereği, her boş olmayan hane altkümesi H ve depo altkümesi I için:
`lambda * sum_{j in H} d_j <= sum_{i in I} s_i + sum_{i not in I, j in H} c_ij`.
Bu nedenle kesin rasyonel çözüm:
`g(c)=min(1, min_{H nonempty,I} (sum_{i in I}s_i + sum_{i not in I,j in H}c_ij)/sum_{j in H}d_j)`.

Statik senaryo-öncesi plan için `cmin_ij=min_k c^k_ij` ve `g_static=g(cmin)`; senaryo görüldükten sonra uyarlanabilir plan için `g_adapt=min_k g(c^k)`. Her statik plan bütün senaryolarda uygulanabilir olduğundan `0<=g_static<=g_adapt<=1`. Eşitlik zorunlu değildir.

## İki karşı örnek
1. Bir depo, arz 2; iki hane ihtiyaçları (2,2); hat kapasiteleri (2,2). Maksimum toplam 2'dir. Hem (2,0) hem (1,1) toplam-optimaldir; en düşük hane oranları sırasıyla 0 ve 1/2'dir. En iyi minimum hane oranı `g=1/2`. Toplam akış adaleti tek başına belirlemez.
2. İki depo arz (1,1), iki hane ihtiyaç (1,1). Senaryo 1 hatları [[1,0],[0,1]], senaryo 2 [[0,1],[1,0]]. Her senaryoda ayrı planla bütün haneler karşılanır (`g_adapt=1`); senaryo öncesi ortak plan için bütün hatların minimumu sıfırdır (`g_static=0`). Bu uyarlamanın pratikte maliyetsiz/hızlı olduğunu kanıtlamaz.

## Gerçek çalıştırılan test
Yerel Python 3 standart kütüphane testi: `test_ekonomi_hane_guvencesi_a20.py`.
- 4096/4096 tam taranmış 2x2, iki-senaryolu durum (arz ve ihtiyaçlar {1,2}, hat kapasiteleri {0,1}): `g_static<=g_adapt` PASS; 544 durumda sıkı fark.
- 512/512 sabit tohumlu (20261014) 3x3 durum: kesit formülü bağımsız, tam kesirli Edmonds–Karp akışıyla doğrulandı; optimum üzerindeki kota uygulanamaz.
- İki adlandırılmış karşı örnek ve sıfır/yarım/tam hizmet kontrolü PASS.
- 5/5 unittest PASS, Python sözdizimi PASS. Bunlar sentetik deterministik hesaplamalardır, gerçek saha verisi değildir. İspatın dayanağı max-flow/min-cut teoremidir.

## Etik, literatür ve dergi hazırlığı
Hane düzeyinde konum/ihtiyaç verisi hassas olabilir: hukuki dayanak, veri minimizasyonu, ayrımcılık denetimi ve maliyet-gecikme değerlendirmesi gerekir. Gerçek saha verisi, dış örneklem, bağımsız tekrar, hedef dergi ve güncel dergi kurallarına göre veri/kod/etik beyanları açık. Le Boudec & Radunović (2007), IEEE/ACM Transactions on Networking 15(5), DOI 10.1109/TNET.2007.896231, max-min adalet için önceki literatürdür. Scientific Reports yönergeleri yalnız olası karşılaştırma ölçütü olarak incelendi; hedef dergi seçimi değildir.

## Cuma 16 Ekim bilimsel kapısı
Varlık A17 fiziksel tutarlılık; Akıl ve Bilgi A11/A12/A18 bağımsız kaynak; Duygu A9/A13 geçerli ölçek/dış örneklem; Ekonomi A20 gerçek veri ve hane güvencesi; 11 özgün eser ile ayrı eksik 10 numara için kanonik kaynak manifesti, literatür/etik/dergi/tekrar üretilebilirlik. Cuma tarihi hiçbir bitmemiş işi tamamlanmış yapmaz.

Kanonik HTML, özgün eserler, main, canlı site, Render, Science Core v1, takip deposu, API anahtarları/kredileri, ücretli çağrı, deploy, DOI ve dergi gönderimi değiştirilmedi. Dış sağlayıcılar ancak canlı başarılı çağrı kanıtıyla doğrulanabilir.
