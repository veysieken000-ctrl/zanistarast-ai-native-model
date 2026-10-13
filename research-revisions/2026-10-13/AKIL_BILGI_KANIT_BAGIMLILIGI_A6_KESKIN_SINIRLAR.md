# A6 — İki olumlu raporda bilinmeyen bağımlılığın keskin Bayes sınırları

**13 Ekim 2026; güvenli izole araştırma taslağı.** Yeni ampirik veri, bilimsel keşif iddiası, hakem onayı veya yayın değildir. Core HTML, özgün Word, `main`, canlı site, Science Core v1 değiştirilmedi.

## Kaynak ve önceki çalışmadan fark
- Okunan kanonik `core-03.html` (blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`): farklı öznelerce doğrulama ve aynı şartlarda tekrar vurgusu.
- Okunan epistemik indeks `backend/knowledge/H1_zanabun_epistemology.txt` (blob `59ba787e64af01be1a894a3df5b117883192b9e1`): gözlem, yapısal tutarlılık, katman uyumu. Bunlar tek başına bağımsız deney değildir.
- Okunan ontolojik indeks `backend/knowledge/C1_hebun_ontology.txt` (blob `971e4ff02c170530b937bc2353ab4631331bfc99`): katmanlı varlık modeli; deneysel sensör bağımsızlığını varsaydırmaz.
- Önceki A5 (`research-revisions/2026-10-12/AKIL_BILGI_KANIT_BAGIMLILIGI_A5.md`, blob `3e6c51dc256bc0d1fd82704722c38fffbca698c8`) bağımsız iki rapor ile tam kopya uçlarını karşılaştırdı. **A6'nın yeni katkısı:** yalnız tekil hata oranları biliniyorken tüm olası ortak dağılımlar için *keskin ve erişilebilir* posterior sınırını çıkarmak; kopya ve bağımsızlık iki özel noktadır.

## Varsayımlar, tümdengelim ve keskin sınır
İkili hipotez `H`, önsel `P(H)=1/2`; ikili raporlar `X,Y`. Her rapor için `P(+|H)=4/5` (duyarlılık) ve `P(+|¬H)=1/5` (yanlış pozitif) kabul edilir. **Koşullu bağımsızlık kabul edilmez.** `a=P(X=+,Y=+|H)` ve `b=P(X=+,Y=+|¬H)` olsun.

İki Bernoulli marjinalinin Fréchet–Hoeffding sınırlarından:

- `max(0,2·4/5−1)=3/5 ≤ a ≤ 4/5`;
- `max(0,2·1/5−1)=0 ≤ b ≤ 1/5`.

Bayes ile iki olumlu rapor görüldüğünde `P(H|++)=a/(a+b)` (olayın olasılığı pozitifse). Bu fonksiyon `a` ile artar, `b` ile azalır. Dolayısıyla **keskin aralık** `3/4 ≤ P(H|++) ≤ 1` olur. Bu aralık yalnız verilen marjinaller ve önsel altında matematiksel olarak geçerlidir; genel bilimsel güven aralığı veya gerçek veri sonucu değildir.

**Alt sınırın erişilebilir karşı örneği:** `H` altında `(++, +−, −+, −−)=(3/5,1/5,1/5,0)`; `¬H` altında `(1/5,0,0,4/5)`. Her iki raporun marjinalleri şartları sağlar; buna rağmen iki olumlu raporun posterioru `3/4` olur. Bu değer tek olumlu raporun `4/5` posteriorundan **daha düşüktür**: ikinci olumlu raporun her modelde güveni artıracağı iddiası yanlıştır. Burada `++` olayı olasılığı `(3/5+1/5)/2=2/5` olduğundan koşullama tanımlıdır.

**Üst sınır da erişilebilir:** `H` altında `a=3/5`, `¬H` altında `b=0`; `¬H` tablosu `(0,1/5,1/5,3/5)` seçilir. İki olumlu raporun posterioru `1` olur. Bu matematiksel sıfır-olasılık örneği pratikte kesinlik ilanı değildir; sonlu örneklemde sıfır tahmini ayrı belirsizlik taşır.

**Baseline:** koşullu bağımsızlık altında `a=(4/5)^2=16/25`, `b=(1/5)^2=1/25` ve posterior `16/17≈0,941176`; birebir kopyada `a=4/5`, `b=1/5` ve posterior `4/5`. Bunların ikisi de `3/4..1` aralığındadır.

## Tekrar üretilebilir sentetik hesap (Python 3, yalnız standart kütüphane)
Bu kod hem marjinalleri hem 441 ayrık ortak-dağılım çiftini **tam rasyonel aritmetikyle** denetler; ayrık tarama tek başına sürekli aralık için ispat değildir, yukarıdaki analitik ispatı kontrol eder.
```python
from fractions import Fraction as F
p, q = F(4, 5), F(1, 5)
def joint(a, m):
    return (a, m-a, m-a, 1-2*m+a)  # ++, +-, -+, --
def posterior(a, b):
    return a/(a+b)
grid = [(F(i,100), F(j,100)) for i in range(60,81) for j in range(0,21)]
assert len(grid) == 441
for a,b in grid:
    h, nh = joint(a,p), joint(b,q)
    assert all(x >= 0 for x in h+nh)
    assert sum(h) == sum(nh) == 1
    assert h[0]+h[1] == h[0]+h[2] == p
    assert nh[0]+nh[1] == nh[0]+nh[2] == q
    assert F(3,4) <= posterior(a,b) <= 1
assert min(posterior(a,b) for a,b in grid) == F(3,4)
assert max(posterior(a,b) for a,b in grid) == 1
assert posterior(p*p,q*q) == F(16,17)
assert posterior(p,q) == F(4,5)
assert posterior(F(3,5),F(1,5)) == F(3,4)
print('PASS 441; bounds 3/4..1; independence 16/17; copy 4/5')
```

**Bu turdaki yerel sonuç:** PASS, 441/441 rasyonel dağılım çifti; alt `3/4`, üst `1`, bağımsızlık `16/17`, kopya `4/5`. Gerçek ölçüm veya Monte Carlo değildir. Test ortamı: Python standart kütüphane `fractions`; rastgele tohum gerekmez.

## Tümevarım, yanlışlayıcı veri ve uygulama
- **Tümdengelim:** Sınırlar verilen öncüllerden mantıksal olarak zorunludur. **Tümevarım:** Gerçek rapor bağımlılığını belirlemek için farklı laboratuvarlar, ortak veri/kalibrasyon, aynı katılımcılar ve kör tekrar örneklemleri gerekir; böyle veri bu turda yok.
- **Yanlışlayıcı sınama:** Önceden tanımlı örneklemde ölçülen tekil duyarlılık/yanlış-pozitifler `4/5` ve `1/5` değilse bu sayısal örnek saha modeline uygulanamaz. Ortak tablolar biliniyorsa geniş sınır yerine doğrudan ortak olabilirlik kullanılır. Eksik/selektif raporlamada ayrıca seçim modeli gerekir.
- **Etik kullanım:** Bir kişinin hak, eğitim, sağlık veya kaynak tahsisi kararında yalnız iki benzer olumlu raporu 'bağımsız kanıt' sayarak otomatik hüküm verme; belirsizlik, insan denetimi, itiraz ve ölçüm yanlılığı denetimi zorunludur.
- **Hedef dergi hazırlığı:** Teorem/varsayımlar ve deterministik kod yöntem ekine adaydır; özgün bilimsel katkı iddiası için önceki Fréchet/Bayes literatürüyle yenilik taraması, gerçek veri, önkayıtlı hipotez, uygun hedef dergi ve bağımsız hakem gerekir. Bilinen olasılık eşitsizliğinin uygulaması yeni matematiksel teorem diye sunulmaz.

## Sınıflandırma ve 16 Ekim kontrolü
- **Matematiksel model/kanıt:** yukarıdaki koşullu sonuç. **Ampirik kanıt:** yok. **Teolojik/ontolojik yorum:** Hebûn/Zanabûn çerçevesi burada matematiksel doğruluk kanıtı olarak kullanılmaz; normatif/teolojik tezler bağımsızdır.
- **Sayım:** Önceki 11 özgün ana makale korunur. Ayrı dosya adı `9-insan ve toplum.docx` kullanıcının belirttiği özgün **10 numaralı** 'Birey ve Toplumun Doğal Düzene Uyumu — İnsan ve Toplum' olarak ayrıca eşleştirilmiştir; böylece 12 kimlik adayı söz konusudur, ancak 12 belgenin bağımsız tam envanter doğrulaması henüz yoktur. Core 03/08 sayıları özgün Word sırası değildir.
- **Cuma 16 Ekim açık işleri:** (1) 12 özgün belgeyi kaynak–Core paragraf düzeyinde tek tek eşleştirme; (2) dört öncelikli makalede iddia–kanıt–karşı örnek matrisi; (3) bu model için gerçek bağımsız veri ve seçim yanlılığı protokolü; (4) kodu sürümleyip CI ve dış tekrar; (5) dergi kapsamı/etik kontrol. Hiçbiri tamamlandı diye işaretlenmedi.
- **Sınırlar:** Ücretli çağrı, deploy, yayın/DOI, canlı API müdahalesi, `zanistarast-takip` erişimi ve kanonik dosya değişikliği yapılmadı. Sağlayıcıların gerçek canlı yanıtı bu matematik testinden çıkarılamaz.
