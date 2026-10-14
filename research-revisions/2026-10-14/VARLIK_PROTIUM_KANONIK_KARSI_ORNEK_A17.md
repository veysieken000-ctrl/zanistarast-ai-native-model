# A17 — Core 01 / Varlık Sistemleri: protium karşı örneği
Tarih: 2026-10-14. Bilimsel tutarlılık notu; kanonik eserler değiştirilmedi.

## Kanonik iddia
Core 01 ("Varlık Sistemi ve Boyutları", "Varlığın Tanımı") atomu proton, nötron ve elektrondan oluşan üç zorunlu bileşenli sistem olarak anlatıyor; üç bileşenin aynı anda var olmasının zorunlu olduğunu belirtiyor. İncelenen sürüm: `core-01.html`, blob `d5aa5208e7d1af687676af3d04b53fd74de61f18`. Bu not yalnız **literal, evrensel fizik iddiasını** sınar; ontolojik bir üçlü analojinin tamamını değil.

## Bağımsız kaynaklar
- NIST, Atomic Weights and Isotopic Compositions for Hydrogen: https://pml.nist.gov/cgi-bin/Compositions/stand_alone.pl?ele=H ; ¹H temsilî bileşim 0.999885(70), atomik kütle 1.00782503223(9) u; ²H bileşim 0.000115(70), kütle 2.01410177812(12) u.
- IAEA Human Health Series, Pub1429, s.47: https://www-pub.iaea.org/MTCD/Publications/PDF/Pub1429_web.pdf ; protium 1 protonlu kararlı izotop; döteryum 1 proton + 1 nötronlu kararlı izotop; trityum 1 proton + 2 nötronlu radyoaktif izotop.
- Kanonik metin: https://github.com/veysieken000-ctrl/zanistarast-ai-native-model/blob/research/hourly-v26-varlik-periodic-burst-2026-10-14/core-01.html

## Açık matematik / tümdengelim
Nötr atom için P=Z, N=A−Z, E=Z. Literal hipotez H3: "Her nötr atomda P≥1, N≥1, E≥1". ¹₁H (protium): Z=1, A=1, dolayısıyla (P,N,E)=(1,0,1). IAEA bunu kararlı izotop olarak tanımlar; NIST doğal bolluğunu belgeler. Böylece var olan nötr ¹H atomu, evrensel H3'ü çürütür. **Bu, bilinen atom fiziğine dayanan karşı örnektir; yeni bir fizik keşfi değildir.**

## Baseline ve kontroller
| İzotop | P | N | E (nötr) | IAEA durumu | Literal H3 |
|---|---:|---:|---:|---|---|
| ¹H | 1 | 0 | 1 | kararlı | yanlış |
| ²H | 1 | 1 | 1 | kararlı | uyumlu |
| ³H | 1 | 2 | 1 | radyoaktif | uyumlu |

B0: "Tüm atomlar üç parçacık türünü zorunlu olarak içerir" ¹H'de yanlış.
B1: "Nötr atomda P=Z, N=A−Z, E=Z" üç izotopun sayımıyla tutarlı; kararlılığı tek başına açıklamaz. Proton/nötron/elektron parçacıktır, "üç çekim kuvveti" değildir. Üç izotop örneği yeni evrensel yasa kanıtlamaz; tek karşı örnek evrensel önermeyi yanlışlar.

## Test / yeniden üretilebilirlik
`python3 -m unittest -v test_varlik_protium_a17.py`. Python >=3.9, standart kütüphane, sabit NIST/IAEA girdileri, 12 unittest; API/ağ/rastgelelik yok. Kod, kaynak değerlerini canlı çekmez; test geçmesi bağımsız laboratuvar tekrarı anlamına gelmez.

## Sınırlar, etik ve dergi hazırlığı
- Ontolojik/teolojik üçlü düzen ayrı yorumdur; fiziksel ölçüm gibi sunulmaz. "Dördüncü boyut" standart fiziksel uzay-zaman boyutuyla otomatik eşlenmez.
- Model H3 fiziksel olarak yanlışlanmıştır; başvuru verisi gerçek dünyadan derlenmiş ampirik kaynaktır, bu çalışma yeni deney değildir.
- İnsan/kişisel veri yok, ücretli işlem yok. NIST sürüm ve belirsizlikleri, IAEA kaynağı kayıtlı.
- Dergi için bu yalnız **tutarlılık düzeltme notudur**, özgün bilimsel makale değildir. Yazar onaylı, fiziksel olarak doğru yeniden ifade; yeni sınanabilir öngörü; literatür, fizik uzmanı denetimi ve bağımsız tekrar gerekir.
- Önerilen ama **uygulanmayan** düzeltme: "Nötr atomlar proton içeren bir çekirdek ve elektronlardan oluşur; nötron sayısı izotopa bağlıdır ve protiumda sıfırdır." Daha geniş ontolojik tez ayrı ve işlemsel tanımlanmalıdır.
- 11 özgün makale ve ayrı eksik 10 numara envanteri bu turda doğrulanmadı; birleştirilmedi. Science Core v1 kapalı.
- Kanonik Core HTML, özgün eserler, main, canlı site, Render, zanistarast-takip değiştirilmedi.

## 16 Ekim için kritik karar
Core 01 fiziksel terminoloji/doğruluk denetimi öncelikli; Akıl ve Bilgi, Duygu, Ekonomi için kaynak→hipotez→baseline→karşı örnek→gerçek veri→etik→hedef dergi matrisi ve bağımsız doğrulama açık.
