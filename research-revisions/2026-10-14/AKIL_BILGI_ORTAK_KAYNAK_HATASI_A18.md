# A18 — Akıl ve Bilgi: ortak kaynak hatası ve çoklu doğrulama

Tarih: 2026-10-14. İzole matematiksel araştırma notu; kanonik eserler değiştirilmedi. **Sentetik model; gerçek ampirik doğrulama değil.**

## Kanonik kaynaklar
- Core 03, "Akıl ve Bilginin Kaynağı", `core-03.html` (blob `6895cf5e3c1ff5bc23d6c57767e9b180c5022d2b`): farklı öznelerce doğrulama ve tekrar ilkesi.
- `zanabun-17-bilginin-dogrulama-ve-test-mekanizmasi.html` (blob `1be25096d646e37f69cf915934fbbb741e279a84`): ikinci özne, çoğul doğrulama ve yanlışlanabilirlik.
- `makale-06-08-bilim-nedir.html` (blob `025ee5e3a6abfb5aec41e940f04ac39f2e69dc67`): gözlem, sınama, tekrar.
- `rasterast-06-yanlislanabilirlik.html` (blob `e9499ac14a7f790d50ff0a0ca37712606a0d8b95`): karşı örnek ve alternatif test.
- A11 Bayes testi (blob `99089c0e83d58b8a4dfa1e53e21d52278281abe6`).

## Problem ve tümdengelim
Farklı rapor sahipleri, aynı bilgi kaynağını kullanıyorsa raporların hataları bağımsız olmayabilir. İkili hipotez H için önsel P(H)=1/2, duyarlılık s=P(+|H)=4/5, yanlış pozitif f=P(+|¬H)=1/5.

Her vaka için H'den bağımsız gizli C rejimi bir kez seçilir: P(C=1)=ρ. C=1 iken bütün raporlar H'ye koşullu **tek** Bernoulli çekilişinin kopyasıdır; C=0 iken n rapor H'ye koşullu bağımsızdır. ρ∈[0,1].

E_n, n raporun hepsinin olumlu olmasıdır:
`a_n=P(E_n|H)=ρs+(1−ρ)s^n`;
`b_n=P(E_n|¬H)=ρf+(1−ρ)f^n`;
`P(H|E_n)=a_n/(a_n+b_n)` (önsel 1/2).
Bu modelde iki raporun koşullu korelasyonu `Corr(X_i,X_j|H)=ρ` ve `Corr(X_i,X_j|¬H)=ρ` (i≠j). Rejim vaka başına sabittir; n için tutarlı ortak dağılım tanımlar.

## Baseline ve matematiksel karşı örnek

| n olumlu rapor | Bağımsız (ρ=0) | Karışım (ρ=1/2) | Tam kopya (ρ=1) |
|---:|---:|---:|---:|
| 1 | 0,800000 | 0,800000 | 0,800000 |
| 2 | 0,941176 | 0,857143 | 0,800000 |
| 3 | 0,984615 | 0,863158 | 0,800000 |
| 4 | 0,996109 | 0,857143 | 0,800000 |
| 5 | 0,999024 | 0,849157 | 0,800000 |

Sabit ρ=1/2 iken oybirliği 3→4→5 rapora uzasa da posterior **0,863158→0,857143→0,849157** düşer. Böylece "her yeni olumlu rapor posterior güveni mutlaka artırır" genellemesi **bu modelde** yanlıştır. Bu, bilimsel kanıtın çoğalmasının genel olarak güveni azalttığı anlamına gelmez.

Yanlış pozitif maliyeti 9, yanlış negatif 1 varsayılırsa karar eşiği τ=0,9'dur. n=5, önsel 1/2 için `P(H|E_5)≥0,9` ancak ve ancak `ρ≤203/828≈0,245169` koşulunda sağlanır. Bu maliyetler ve parametreler **varsayımdır**.

## Test / tekrar
Yerel `test_akil_bilgi_ortak_hata_a18.py`: Python standart kütüphanesi, `python3 -m unittest -v test_akil_bilgi_ortak_hata_a18.py`. 9/9 PASS. n=1..8, ρ=0,0.1,...,1 ve q∈{0.2,0.8} için 176 ortak dağılımda bütün 2^n vektörlerin toplamı 1; 176 oybirliği formülü kontrolü; 22 koşullu korelasyon, 120 önsel/posterior ve karar eşiği sınamaları. Kod ağ/API/veri gerektirmez. **Test geçmesi ampirik gerçeklik veya bağımsız dış tekrar değildir.**

## Ampirik ve etik protokol; dergi kapısı
Doğruluk etiketleri bağımsız doğrulanmış vakalarda, kör ve ayrı kaynak kullanan değerlendiriciler ile ortak kaynak kullanan değerlendiriciler karşılaştırılmalı. Vaka temel örneklem birimi olmalı; s,f,ρ ayrı tahmin edilmeli; ortak eğitim verisi, istem, araç, kaynak zinciri ve rapor hata korelasyonu kaydedilmeli. Dış örneklem, belirsizlik aralıkları, güç analizi, ön kayıt ve bağımsız kod denetimi gerekli. İnsan değerlendirmelerinde rıza ve gizlilik korunmalı. Hedef dergi seçimi ve özgün ampirik makale hazırlığı tamamlanmadı.

**Ontolojik/teolojik yorum ≠ istatistiksel model ≠ ampirik kanıt.** Kanonik metin için önerilen ama uygulanmayan netleştirme: "Farklı öznelerin onayı, ortak kaynak ve hata bağımlılıkları denetlenmeden bağımsız kanıt sayılamaz."

Science Core v1 kapalı; 11 özgün makale ve ayrı eksik 10 numara envanteri kesinleştirilmedi. Main, kanonik/Core HTML, özgün eserler, canlı site, Render, zanistarast-takip, DOI ve dergi gönderimi değişmedi.