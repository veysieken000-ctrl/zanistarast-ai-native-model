# 09 — AI Speech Integration

## Amaç

AI Speech, Mira için bir giriş/çıkış arayüzüdür. Sesli veya yazılı soru aynı canlı cevap hattına gider:

Kullanıcı sorusu → `/api/ask` → HTML + knowledge RAG → Shared Mira Core → cevap + kaynak/epistemik durum → ekranda gösterim / sesli okuma.

Speech katmanı kendi başına doğrulama, bilimsel kanıt veya kanonik otorite üretmez.

## Alan kullanımı

Hebûn, Zanabûn, Mabûn, Rabûn, Rasterast, Newroza Kawa ve diğer Zanistarast alanları korunur; ancak her soru sabit bir ontolojik zincire zorlanmaz. İlgili alanlar, getirilen kaynak ve sorunun bağlamı desteklediğinde kullanılır.

Retrieval skoru otorite veya kanıt değildir. Kaynakların `authority_status`, `epistemic_status`, `rasterast_status` ve `provenance_status` değerleri cevap yüzeyinde korunur.

## Cevap derinliği

Cevap uzunluğu sorunun ihtiyacına göre değişebilir: kısa cevap, açıklamalı cevap veya gerektiğinde derin analiz. Speech arayüzü her soruyu otomatik olarak makale biçimine dönüştürmez.

## Ses ilkesi

Konuşma tanıma yalnızca kullanıcı girdisini metne dönüştürür. Sesli okuma yalnızca Mira'nın ürettiği cevabı seslendirir. Epistemik değerlendirme Speech katmanında yapılmaz.

## Nihai ilke

Tek bir canlı cevap yolu korunur. Speech, metin arayüzünden farklı bir doğrulama zinciri veya paralel cevap motoru oluşturmaz.
