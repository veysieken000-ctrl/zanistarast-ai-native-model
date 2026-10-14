# A13 — Duygu göstergesinde dağılım kayması ve dış örneklem Brier sınaması

**Tarih:** 2026-10-14. **Tür:** Sentetik matematiksel karşı örnek; gerçek insan verisi, nedensel veya ampirik doğrulama değildir.

## Kaynak ve epistemik sınır
- Değiştirilmeden okunan kanonik `core-05.html`, blob `d3180d0fe0c1b370a7122f835e35b3a8483fd775`: “Duygunun İşlevi” duyguyu fayda/zarar ve varlığı koruma ile ilişkilendirir. Bu bir ontolojik yorumdur; ölçülmüş bilimsel yasa olarak kabul edilmedi.
- Değiştirilmeden okunan `core-03.html`, blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`: aynı şartlarda tekrar ve farklı öznelerce doğrulama ilkesinin yöntemsel bağlamı.
- Önceki A9 Simpson örneği: 200 sentetik eğitim gözlemi, dört hücre. A9'un GitHub kalıcı kaydı doğrulanmamış olduğundan yerel kaynak olarak işaretlenmiştir.

## Sorun ve model
A9 yalnız eğitim üzerinde Brier raporlamıştı. **Soru:** `P(Y=1|U,E)` sabit kalırken yalnız `P(U|E)` değişirse duygu göstergesi E'ye dayalı modelin dış performansı bozulabilir mi? Y=1 olumsuz sonuç, U olay öncesi yüksek/düşük bağlam, E=1 duygu bildirimi.

| U | E | Sabit koşullu risk | Eğitim N / Y=1 | Sentetik test N / Y=1 |
|---|---:|---:|---:|---:|
| yüksek | 1 | 0,60 | 80 / 48 | 20 / 12 |
| yüksek | 0 | 0,70 | 20 / 14 | 80 / 56 |
| düşük | 1 | 0,10 | 20 / 2 | 80 / 8 |
| düşük | 0 | 0,20 | 80 / 16 | 20 / 4 |

İki popülasyonda N=200, P(U=yüksek)=P(E=1)=1/2 ve P(Y=1)=0,40 aynıdır. **Yalnız U–E ortak dağılımı değişir.** Eğitim ve test ayrı sentetik kohortlar olarak kurgulanmıştır; gerçek kişiler yoktur.

Dokuz kompozisyon için hücre N değerleri sırasıyla `(10k,100−10k,100−10k,10k)`, `k=1,...,9`; tüm hücrelerde koşullu riskler sabit kalır. Tümdengelim: `RD(k)=P(Y=1|E=1)−P(Y=1|E=0)=k/10−3/5`. Eğitim `RD(8)=+0,20`, test `RD(2)=−0,40`, her iki bağlamda koşullu risk farkı `−0,10` değişmez. Marjinal işaretin terslenmesi nedensellik kanıtı değildir.

## Eğitimde bir kez öğrenilen dört baseline ve sentetik dış test

| Model | Eğitim Brier | Test Brier |
|---|---:|---:|
| Sabit prevalans q=0,40 | 0,2400 | 0,2400 |
| Yalnız duygu q(E=1)=0,50; q(E=0)=0,30 | 0,2300 | **0,2900** |
| Yalnız bağlam q(yüksek)=0,62; q(düşük)=0,18 | 0,1916 | 0,1652 |
| Bağlam + duygu q(U,E)=gerçek hücre riski | 0,1900 | **0,1600** |

Brier: `N^-1 Σ(Y−q)^2`. Kesin ayrışım: `E[(Y−q)^2]=p(1−p)+(q−p)^2`. Eğitimde sabit baseline'ı 0,01 geçen yalnız-duygu modeli, testte aynı baseline'dan **0,05 daha kötü**. Testte E=1 için 0,50 tahmin/0,20 gerçek; E=0 için 0,30 tahmin/0,60 gerçek. Testin kendi E-grup prevalansları sonradan bilinseydi 0,20 Brier elde edilirdi; bu yalnız teorik *oracle* alt sınırdır, dış testte kullanılabilir model değildir. Testteki 0,09 fazlalık kalibrasyon kaybıdır. `k≤6` için yalnız E modelinin Brier'i `0,31−0,01k≥0,25` olur, sabit baseline'dan kötüdür.

## Test / tekrar üretilebilirlik
`test_duygu_dagilim_kaymasi_a13.py` yalnız Python 3 standart kütüphane `fractions.Fraction` kullanır; `python3 test_duygu_dagilim_kaymasi_a13.py` ile çalışır. A9 tablosunu, test tablosunu, eğitim ve test Brier skorlarını, iki marjinal risk farkını, dokuz kompozisyonu, sabit marjinalleri, koşullu risk farklarını ve Brier ayrışımını tam rasyonel aritmetikle kontrol eder. **Yerel PASS**; bağımsız GitHub CI veya gerçek veri doğrulaması değildir. Rastgelelik, ücretli API ve insan verisi kullanılmadı.

## Etik, literatür ve hedef dergi blokajları
Bu, yerleşik Simpson terslenmesi / kovaryat kayması / uygun skorlamanın Zanistarast Duygu araştırmasına uygulanmış **yöntemsel** karşı örneğidir; özgün evrensel keşif değildir. Gerçek çalışma için doğrulanmış duygu ölçeği, olay öncesi bağlam, tanımlanmış sonuç, bağımsız coğrafi/zamansal test, ön kayıt, kalibrasyon ve Brier/log-loss güven aralıkları, örneklem/güç hesabı, veri sızıntısı ve karıştırıcı denetimi, mahremiyet/etik kurul ve güncel literatür gereklidir. Kişilerin duygularından ahlaki değer veya ceza kararı türetilmemelidir. Hedef dergi yönergesi henüz doğrulanmadı; gönderim yapılmadı.

**Sınırlar:** 11 özgün makale ile ayrı eksik 10 numara birleştirilmedi. Science Core v1 kapalı. Kanonik HTML, özgün eserler, `main`, canlı site/Render, DOI ve üretim yapılandırması değiştirilmedi; `zanistarast-takip` erişimi yok. 16 Ekim Cuma hazırlık hedefi, makalelerin tamamlandığı anlamına gelmez.
