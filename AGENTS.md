# Zanistarast AI Native Model — çalışma yönergeleri

Evrenin sistemi ve bağlı kavramları için önce
[`docs/EVRENIN_SISTEMI_KANONIK_V04_2026-11-22.md`](docs/EVRENIN_SISTEMI_KANONIK_V04_2026-11-22.md)
dosyasını oku. Ayrıntılı aktif kayıt `graph/evrenin-sistemi.json`dur. Eski
16 Ekim kanonik belge kendi tarihçesiyle korunur; güncel özel tanımlar v04'tedir.

- D1–D6 boyut, H1–H6 insan katmanı ve L1–L6 araştırma üretimi ayrı sayımlardır.
- Ehad yaratılmamış yaratıcıdır; yaratılmış boyutların toplamı değildir.
- D1 atom / yıldız ve gezegen; kara delik birinci evrede kurucu araştırma iddiasıdır.
- D6 yargılama/Haşir ve hükme bağlama/Cennet veya Cehennem'de ebedî hayattır.
- Zanabûn iki ayrı bilenin aynı sonuç ve bağlama onayını gerektirir; özdenetim
  ikinci bilen veya bağımsız bilimsel hakemlik diye sunulmaz.
- Kurucu tanım, analoji, hipotez ve deneysel dayanağı ayır. Simgeye ölçüm uydurma.

`PROJECT_LOCK.md` ve `CONTRIBUTING.md` kurallarını uygula. Çalışan site yapısını,
Genel Graph'ı, kaynak tarihçesini ve kimlikleri koru. Eski bilgiyi topluca silme.
Harita ve açıklamalar aynı sürümlü JSON'dan beslenmelidir. Özel arşiv veya
iletişim alanlarını kamuya açık dosyalara kopyalama.

Model/Graph değişirse `python3 verification/evrenin-sistemi-public.py --self-test`
ve ilgili JavaScript/önbellek kontrollerini çalıştır. İlgisiz değişiklikte bunları
yeniden çalıştırma zorunluluğu yoktur. GitHub yazımında güncel HEAD'i kontrol et,
eşzamanlı değişikliği koru ve aynı committen içerik geri okumasını doğrula.

Mira'nın AGENTS.md'yi otomatik okuduğunu varsayma. Üretim sağlayıcısına verilen
bağlam ayrı bir kod yoludur; bağlantı ve test kanıtı olmadan “Mira öğrendi” deme.
