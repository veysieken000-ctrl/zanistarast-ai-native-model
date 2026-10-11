# Varlık Sistemleri ve Boyutları — gerekçeli düzeltmeler

Tarih: 2026-10-11. Dal: `research/revision-2026-10`.
Durum: Ayrı revizyon taslağı; özgün Word ile doğrulanmamış, bilimsel onay veya yayın değildir.
Okuma referansı: `9b932b417aa0a8cebc53152c5fc0a599cdc7e379`. Satırlar bu sabit sürüme aittir.

## Metin ve önceki revizyon karşılaştırması

Core kaynağı: [core-01.html](https://github.com/veysieken000-ctrl/zanistarast-ai-native-model/blob/9b932b417aa0a8cebc53152c5fc0a599cdc7e379/core-01.html).
Önceki `ONCELIKLI_DORT_MAKALE_ILK_REVIZYON.md` atom genellemesine işaret ediyor; burada karşı örnek ve kaynak bağlanmıştır. Özgün Word mevcut olmadığından bu ifadelerin özgün makalede aynen bulunduğu ileri sürülmez.

## V1 — Her atomda nötron bulunması

Yer: 156 ve 245–247. Üç bileşenin zorunluluğu 176–177'de de ifade edilir.
Hata türü: Ampirik genelleme.
Gerekçe: Hidrojenin atom numarası 1'dir; hidrojen-1 için A=1 ve Z=1 olduğundan nötron sayısı N=A−Z=0. NIST hidrojen-1 ve hidrojen-2 izotoplarını ayrı listeler [S1]. Bu tek karşı örnek zorunlu üçlü genellemesini geçersiz kılar.

**Yeni taslak ifade:** “Atom çekirdeği protonlardan ve izotopa bağlı sayıda nötrondan oluşur. Nötr atomda elektron sayısı proton sayısına eşittir. Hidrojen-1 çekirdeğinde bir proton bulunur, nötron bulunmaz. Bu nedenle proton–nötron–elektron üçlüsü her atom için zorunlu bir bileşim değildir.”

Denetim örnekleri: H-1: Z=1, A=1, N=0; H-2: Z=1, A=2, N=1. Sayım işlemi deney değildir.

## V2 — Parçacık ile kuvvetin karıştırılması

Yer: 245–252; elektron, proton ve nötron “üç çekim kuvveti” diye sunuluyor; ikinci atomun çekim için zorunlu olduğu söyleniyor.
Hata türü: Fiziksel kategori hatası.
Gerekçe: CERN madde parçacıkları ile etkileşimleri ayırır; dört temel etkileşim güçlü, zayıf, elektromanyetik ve kütleçekim etkileşimidir. Atom ölçeğinde kütleçekimin etkisi çok küçüktür [S2]. Parçacıkların sayısı yeni bir kuvvet veya boyut ispatlamaz. İzole hidrojen atomunun çekirdek–elektron etkileşimi ikinci atom gerektirmez; NIST'in hidrojen enerji seviyeleri ve iyonlaşma enerjisi bunun için somut bir atomik referanstır [S1].

**Yeni taslak ifade:** “Elektron, proton ve nötron kuvvet değil, parçacık türleridir. Atomik yapı elektromanyetik etkileşim ve kuantum mekaniğiyle; çekirdek yapısı ise nükleer etkileşimlerle incelenir. İkinci bir atom, bir atomun kendi çekirdeği ile elektronları arasındaki etkileşimin varlığı için gerekli değildir. Atomik ve nükleer süreçler kütleçekimle özdeşleştirilmemelidir.”

## V3 — Ağır atom oluşumunu atomların çekimine indirgeme

Yer: 251–252. Hata türü: Mekanizma açıklamasında eksiklik.
Gerekçe: NASA yıldızlarda daha hafif çekirdeklerin füzyonunu ve evreye bağlı element oluşumunu açıklar [S3]. Kimyasal birleşme ile yeni element oluşturacak çekirdek tepkimesi farklı süreçlerdir. Kaynak bütün elementlerin tek yolla oluştuğunu desteklemez.

**Yeni taslak ifade:** “Molekül oluşumu, atomların kimyasal bağlanmasıdır; yeni element oluşumu ise çekirdeği değiştiren süreçler gerektirir. Yıldızlardaki nükleer füzyon, ağır elementlerin oluşum yollarından biridir. Hangi elementin hangi süreçte oluştuğu ayrıca belirtilmelidir.”

## V4 — Boyut ispatı yerine kavramsal sınıflandırma

Yer: 150–178 ve 321–325. Hata türü: Kanıt statüsü ve tanım belirsizliği; doğrudan yanlışlanmış bir fizik kuramı olarak sınıflandırılmadı.
Gerekçe: Üç bileşen benzerliğinden yeni fiziksel koordinat veya ölçülebilir boyut çıkaran bir türetim bu pasajlarda yoktur. Bu, inceleyenin yöntem değerlendirmesidir; S2 Zanistarast sınıflandırmasını test etmiş değildir.

**Yeni taslak ifade:** “Bu çalışmadaki altı boyut, fiziksel uzay-zaman boyutlarıyla özdeş olmayan ontolojik inceleme katmanlarıdır. Katman benzerlikleri analoji olarak kullanılır; bağımsız ölçüm ve matematiksel türetim olmadan fiziksel boyut kanıtı sayılmaz. 6+Tek ifadesi yedinci fiziksel boyut olarak yorumlanmaz.”

## Kaynaklar ve sınırlar

- [S1 — NIST, Atomic Data for Hydrogen](https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable1.htm): Resmî atomik veri tablosu; açılıp okundu. İzotop ve enerji seviyesi verisi; yeni deney yapılmadı.
- [S2 — CERN, The Standard Model](https://home.web.cern.ch/science/physics/standard-model/): Resmî bilimsel açıklama; açılıp okundu. Parçacık/etkileşim ayrımı; birincil deney makalesi değildir.
- [S3 — NASA, Stars](https://science.nasa.gov/universe/stars/): Resmî bilimsel açıklama; açılıp okundu. Yıldız füzyonu bölümü; tüm nükleosentez kanallarının incelemesi değildir.

Eksikler: Özgün Word karşılaştırması; karanlık madde, hücre ve zihin iddialarının ayrı literatür incelemesi; tüm metnin paragraf eşleştirmesi; bağımsız fizik uzmanı değerlendirmesi.
