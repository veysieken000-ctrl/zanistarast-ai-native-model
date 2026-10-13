# V18 — Zaman dilimi uyumu, kapasite ve Rasterast sınaması

**Durum:** 13 Ekim 2026, izole araştırma taslağı; **ampirik kanıt değil**. Bu not, Core/Science Core v1 veya main üzerinde değişiklik değildir. Özgün 11 ana makale sayımı korunur.

## Kaynak denetimi
- `research/revision-2026-10`: `core-01.html`, `core-02.html`, `core-03.html` dosyalarının ilk 130 satırı; `backend/knowledge/C1_hebun_ontology.txt`, `H1_zanabun_epistemology.txt`, `16_boyutsal_acilim_matematiksel_model.txt` ilk 125 satırı okundu.
- `research/source-faithful-clarifications-2026-10`: `research-notes/YEK_TEK_RUH_MELEK_IKILI_UCLU_FORMAL_MODEL.md` okundu. Bu dalın revizyon dalından dört commit ilerideki önerileri **TASLAK**, kanon değildir.
- Önceki V17 yerel rapor/kod incelendi; V17 dalının V16 ile özdeş olduğu doğrulandı. V17 kodu GitHub'a commit edilmiş sayılmaz.
- Dış yöntem: Abels & Anapolska (2024), *Interval-Constrained Bipartite Matching over Time*, https://arxiv.org/abs/2402.18469 ; Google OR-Tools shift scheduling örneği, https://github.com/google/or-tools/blob/stable/examples/python/shift_scheduling_sat.py .

## Sorun ve sınır
V17'de branş bazlı **günlük toplam** kapasite, öğrencilerin ve öğretmenlerin aynı saatlerde uygun olduğu anlamına gelmez. Öğrenci hak öznesidir; programın alt bileşeni sayılmaz. İşlevsel alt parçalar oturum, saat ve yetkin/uygun personel kapasitesidir. `n+Tek=Yek`, insana özgü `6+Tek` ve kâinatın Ehad'a ontolojik bağımlılığı için ayrı `6+Ehad` optimizasyon eşitlikleri değildir; Ehad ne Tek ne yaratılmış katmandır. 4. boyutta Ruh 1. evre, melekî düzen 2. evre güncel ontolojik açıklamadır; C1'deki `D4→Law` sınıflandırmasıyla gerilim sessizce giderilmez.

## Koşullu matematiksel çözüm
Konu i, **çakışmayan** saat dilimi t ve öğretmen grubu j için talep `d[i,t]`, uygun kapasite `c[j,t]`, doğrulanmış branş uygunluğu `E`, atama `x[i,j,t]` olsun. `x=0` uygun olmayan kenarda; `sum_j x[i,j,t] <= d[i,t]`, `sum_i x[i,j,t] <= c[j,t]`; tüm atamalar tamsayı. Amaç toplam karşılanan talebi enbüyüklemek. Her sabit t ve konu altkümesi S için `sum_{i in S} d[i,t] <= sum_{j in N_t(S)} c[j,t]` bu dar modelde tam hizmet için gerekli-yeterli Hall koşuludur. **Bilinen maksimum akış teoreminin uygulamasıdır**, yeni evrensel yasa değildir.

**Sentetik karşı örnek:** Sabah Matematik 4 + Dil 6 talep, öğleden sonra talep 0. Sabah matematik-özel 4, dil-özel 2; öğleden sonra iki derse uygun 4 kapasite. Toplam 10 talep ve 10 kapasite: saatleri silen V17 tarzı hesap **10/10**, saatli hesap **6/10** karşılar. Esnek 4 kapasite gerçekten sabaha rızayla ve yetkinlikle taşınabilirse **10/10** mümkündür. Dört gün M=3..4, D=5..6 sentetik talep için sabaha erişimi olmayan düzen son bekleme **12..16**, uygun saat düzeni **0** üretir.

## Yerel sınama ve dürüst sınırlar
Ayrı yerel dosya `test_temporal_matching_v18.py` ile standart kütüphane maksimum akış hesabı, iki branş/iki grup/iki zaman dilimi için **6.561 bağımsız kapalı-form oracle karşılaştırması**, **512 dört günlük sentetik iz** ve **8 geçersiz giriş** kontrolünden geçti (**PASS**). Bu **dosya bu commit içinde değildir**; raporlanan test yerelde çalıştırılmıştır. Gerçek saha verisi, öğretmen yetkinliği/rızası, çizelge, maliyet, erişim eşitliği, öğrenme etkisi ve bağımsız kod incelemesi **YOK**. Zaman dilimleri çakışmaz; aynı kişinin çok günlük çalışma sınırı ayrıca modellenmemiştir.

## Etik pilot ve işlevsel transfer
İzinli ve anonimleştirilmiş branş+gerçek uygun saat talebi, doğrulanmış yetkinlik, gönüllü vardiya ve insan onaylı plan karşılaştırılır. Ölçütler: 7+ gün bekleyen oranı, P50/P90 bekleme, öğrenme kalitesi, maliyet, öğretmen yorgunluğu, dezavantajlı erişim farkı. Hak kaybında durdur/itiraz. Bilgi→tanıklık→ahlak→hüküm→yeni bilgi süreç benzerliğidir. Rabûn hüküm/ahlak/ekonomi meclisleri ile atom, DNA/RNA/protein, biliş, sinir sistemi ve yazılım/YZ karşılaştırmaları **işlevsel analoji**, fiziksel özdeşlik değildir; Ruh/melek–kod/işlemci analojisi deneysel kanıt değildir. Hebûn, Zanabûn, Mabûn, Rabûn, Rasterast görevleri ayrıdır.

**Koruma:** Science Core v1 kapalı. `main`, özgün/Core HTML, canlı siteler, arşivler, `zanistarast-takip` değiştirilmedi. DOI/yayın/dergi/ücretli işlem yapılmadı. Gerçek pilot ve bağımsız sınama açık.
