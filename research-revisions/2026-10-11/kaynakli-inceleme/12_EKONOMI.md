# Ekonomi — hak ilkesi ve uygulanabilirlik sınaması

Tarih: 2026-10-11. Dal: `research/revision-2026-10`.
Durum: Ayrı revizyon taslağı; özgün Word ile doğrulanmamış, bilimsel onay veya yayın değildir.
Okuma referansı: `9b932b417aa0a8cebc53152c5fc0a599cdc7e379`. Satırlar bu sabit sürüme aittir.

## Metin ve önceki revizyon karşılaştırması

Core kaynağı: [core-12-yasam-temelli-ekonomi.html](https://github.com/veysieken000-ctrl/zanistarast-ai-native-model/blob/9b932b417aa0a8cebc53152c5fc0a599cdc7e379/core-12-yasam-temelli-ekonomi.html).
Önceki kayıt hak/görev ilkelerinden finansal uygulanabilirlik çıkarılmamasını öneriyordu. HTML'de ilkeler ve risk listesi var, ancak nicel maliyet/finansman tablosu yok. Bu eksiklik modelin imkânsız olduğunu kanıtlamaz. “Core 12” etiketi, 12 özgün ana makalenin bulunduğu anlamına gelmez.

## E1 — Erişim garantisi ile doğrulanmış sonuç ayrımı

Yer: `core12-01`, `core12-06` ve `core12-10`.
Hata türü: Normatif hedefin uygulanmış sonuç gibi okunması riski ve kanıt eksikliği.
Gerekçe: Erişim bir hak ilkesi olarak savunulabilir; gerçekleşen kapsama, kapasite ve kaynak hesabı ayrıca gerekir. Dünya Bankası'nın S6 çerçevesi kapsam, teşvikler, maliyet, finansman ve uygulama arasındaki ödünleşimleri ele alır. Kaynak UBI üzerinedir; bu metindeki ayni hizmet ve meclis modelinin birebir değerlendirmesi değildir.

**Yeni taslak ifade:** “Yaşam Temelli Ekonomi, temel ihtiyaçlara erişimi güvence altına almayı amaçlayan normatif bir öneridir. Erişim garantisinin hangi kapsam, hizmet standardı, üretim kapasitesi ve finansmanla karşılanacağı ayrı bir uygulanabilirlik çalışmasında gösterilmelidir. Bu metin, modelin uygulanmış veya mali açıdan doğrulanmış olduğunu ileri sürmez.”

## E2 — Karşılıklılıktan otomatik süreklilik çıkarılması

Yer: `core12-02` ve `core12-09`.
Hata türü: Nedensel etki ve önlem etkinliği için veri eksikliği.
Gerekçe: Karşılıklı üretim/dağıtım ile güven ve süreklilik arasında ölçülmemiş koşullar vardır. Görev takibi, erişim disiplini veya meclis denetiminin etkinliği bu metinde veriyle sınanmıyor. S6 yöntem çerçevesidir; önerilen yaptırımların işe yaradığını kanıtlamaz. Engellilik, bakım yükü ve iş yokluğu ölçülmeden katkı düşüklüğü “tembellik” diye kodlanamaz; bu sınıflama önerisi yanlış ölçümü önlemek içindir.

**Yeni taslak ifade:** “Karşılıklılık güveni ve sürekliliği destekleme hipotezidir. Bunun gerçekleşmesi üretim kapasitesi, dağıtım kaybı, erişim adaleti, katılım koşulları ve denetimin etkinliğine bağlı olarak sınanmalıdır. Katkı göstergeleri kişinin sağlık ve bakım koşullarını dikkate almalıdır; düşük katkı tek başına isteksizlik kanıtı değildir.”

## Nicel sınama taslağı — veri değil

Aynı dönem, fiyat yılı ve para birimiyle:

```text
Toplam maliyet C = Σ(N_i × q_i × c_i) + yönetim + yatırımın dönem payı
Kaynak R = net vergi + net kamu üretim geliri + diğer doğrulanmış gelir
Finansman açığı G = C − R
```

N_i: hizmet i için yararlanıcı sayısı; q_i: kişi başına dönemlik miktar; c_i: birim maliyet. Borçlanma ve hibeler varsa ayrı gösterilir; borçlanma kalıcı gelir sayılmaz. Kalemler çifte sayılmamalı; bütçe dengesi fiziksel üretim yeterliliği demek değildir.

**Tamamen varsayımsal aritmetik denetim:** Tek hizmette N=1000, q=12, c=10, yönetim=2000, yatırım payı=0, R=110000 ise C=122000 ve G=12000. Birim maliyet %20 artarsa C=146000, G=36000. Bu sayılar ülke verisi, maliyet tahmini veya model başarısı değildir.

Uygulanabilirlik için gerçek yararlanıcı ve birim maliyet verileri, vergi/üretim gelirleri, fiziksel kapasite, enflasyon ve şok senaryoları, kıyas modeli ve dağılımsal etkiler gerekir. Her veri kaynağı/yılı ve belirsizlik aralığı kaydedilmelidir.

## Kaynak ve sınırlar

[S6 — Dünya Bankası, Exploring Universal Basic Income: A Guide to Navigating Concepts, Evidence, and Practices](https://www.worldbank.org/en/topic/socialprotectionandjobs/publication/exploring-universal-basic-income-a-guide-to-navigating-concepts-evidence-and-practices): Resmî rapor tanıtım/çerçeve sayfası açılıp okundu; tam kitap ve veri setleri bu turda okunmadı. S6'nın UBI bulguları ayni hizmet modeline doğrudan aktarılmadı. IMF arama sonucu bulundu, sayfa açılamadığı için düzeltmelere kanıt yapılmadı.

Eksikler: Özgün Ekonomi Word belgesi; gerçek bütçe tablosu; ülke/kurum/dönem tanımı; saha veya pilot verisi; bağımsız mali değerlendirme.
