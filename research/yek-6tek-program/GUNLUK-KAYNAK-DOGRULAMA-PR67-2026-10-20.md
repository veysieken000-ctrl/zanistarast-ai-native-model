# 20 Ekim 2026 — Kaynak öncelikli araştırma ve PR #67 durum notu

**Durum:** doğrulanmış okuma/kaynak karşılaştırması; CI ve makale sayısı henüz doğrulanmadı. **Kapsam:** yalnız güvenli araştırma dalı.

## 1. Kanonik kaynaklarda açık yanıtı bulunan noktalar

- Özgün yayımlanmış `zanistarast-ai-native-model/main/core-01.html` başlıklı **Varlık Sistemleri ve Boyutları**, 16 Ekim 2026 kurucu onaylı tabloyu içerir: Fizik (atom / yıldızlar ve gezegenler), Biyoloji (tek hücreliler / çok hücreliler), Zihin (zekâ / akıl), Ruh ve melekler (ruh / melekler), Ahlak (fıtrî / iradeli), Ahiret/hüküm (hesap/hüküm / hükmün sonucu). Aynı metin insan katmanlarının ayrı sınıflandırma olduğunu ve eşeyli/eşeysiz üremenin evre adı olmadığını açıkça belirtir. Bu konularda kurucuya tekrar soru sorma.
- `civilizational-knowledge/RASTERAST_DOGRULAMA_FILTRESI_SABIT_ILKELER_2026-10-15.md` sekiz doğrulama kontrolünü açıkça sıralar: kaynak, bağlam, çelişki, mantık, güven, çapraz kaynak, bütünlük, belirsizlik. Bu ilkeler akademik envanter ve PR değerlendirmesinde uygulanır.
- `research/yek-6tek-program/manuscripts/ZANABUN-01-bagimsiz-taniklik-ve-ortak-hata.md` taslağı: ortak hata altında sıfır tanıklar-arası varyansın doğru sonuç garantilemediğine dair açık matematiksel karşı örnek (θ=0, ortak hata 5, dört tanık 5, ortalama 5, varyans 0). Bu yeni teorem ya da saha doğrulaması değil; model için mevcut karşı örnektir.
- Kurucunun Ehad–Yek beyanı korunur; Yek makale birleştirme veya insan özü değildir. Kurucu ontolojisi ampirik ispat diye sunulmaz.

## 2. PR #67 doğru depoda bulundu

GitHub bağlı aramasıyla PR'nin **`veysieken000-ctrl/zanistarast-papers`** deposunda olduğu doğrulandı:

`https://github.com/veysieken000-ctrl/zanistarast-papers/pull/67`

Başlık: *Mira: prevent 412 file candidates from being reported as unique papers*. PR açıklaması: 412 dosya yolunu 412 bağımsız ve yayımlanabilir makale diye raporlamayı engelleyen sentetik regresyon koruması; dokuz depoluk gerçek içerik denetimi **değil**.

Bu nedenle önceki `zanistarast-ai-native-model` deposundaki PR #67 NOT_FOUND sonucu **yanlış depo sorgusundan** kaynaklanmıştı; PR yoktur şeklinde yorumlanmamalı.

`zanistarast-papers` dal araması `mira-412-candidate-audit-gate-20261020` dalını buldu. **Ancak PR'nin head dalı/commit SHA'sı ayrıca teyit edilmedi.** Bu dal ile `main` karşılaştırması **diverged**, **561 ahead / 150 behind** olarak raporlandı (büyük fark; PR'ye otomatik atfedilmemeli). Bu dal için doğrudan birleştirme yapılmamalı; PR'nin gerçek head SHA'sı, hedef dalı, dosya diff'i ve CI sonuçları doğrulanmalı.

PR review ve review thread sorguları bu doğru depoda boş liste döndürdü; bu, CI testlerinin geçtiği anlamına gelmez. **CI sonucu doğrulanamadı.** Birleştirme yapılmadı.

## 3. Gerçek makale sayımı için epistemik sınır

412 aday dosya yolu, 407 farklı Git blob önceki sınırlı envanterin sayılarıdır; ne 412 benzersiz araştırma ne de 407 yayımlanabilir makale ispatlar. Aynı başlık testi tek başına da içerik temelli deduplikasyon değildir. Sıradaki çalışma kaynak kimliği, içerik normalizasyonu, sürüm ailesi, özgün soru/yöntem ve yayın hazırlık denetimi. Bilinmeyen sayı 'bilinmiyor' kalır.

## 4. Dört hedefe bağ

Zanistarast bilimsel sentez, Rabûn kurumsal model, Mabûn ekonomi modeli, Newroza Kawa uygarlık sistemi. İlk kaynak ve çekirdek makale denetimi tamamlanmadan yeni felsefi kurucu önerme veya yayın sonucu ilan edilmez.

**Koruma:** main, özgün Word/Core, Science Core v1, canlı site değiştirilmedi; yalnız bu araştırma notu eklendi.
