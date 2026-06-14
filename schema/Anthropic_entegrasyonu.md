# Anthropic entegrasyonu için: import anthropic

class ZanistarastGuvenlikIstisnasi(Exception):
    """Zanistarast koruma filtreleri ihlal edildiğinde fırlatılan istisna."""
    pass

class ZanistarastLLMMiddleware:
    def __init__(self, api_key=None):
        # Gerçek API anahtarı kontrolü (Çevre değişkenlerinden veya parametreden alır)
        self.api_key = api_key or os.environ.get("OPENAI_API_KEY", "mock-key-for-test")
        # OpenAI istemcisi başlatılıyor
        self.client = OpenAI(api_key=self.api_key)
        
        # Zanistarast Değişmez Anayasası (Axioms)
        self.yasakli_kavramlar = ["nihilizm", "varlık yoktur", "eylem imkansızdır", "manipülasyon"]

    def _girdi_filtresi_ornekle(self, prompt):
        """[GİRİŞ KALKANI] Kullanıcı girdisini OpenAI'a gitmeden önce eler."""
        temiz_prompt = prompt.lower()
        
        # Zanistarast Aksiyom Filtresi: Çelişkili ve sabote edici girdiler test edilmeden dışlanır
        for kelime in self.yasakli_kavramlar:
            if kelime in temiz_prompt:
                raise ZanistarastGuvenlikIstisnasi(
                    f"Zanistarast Aksiyom Engeli: Girdi, sistemin temel varoluş mantığıyla çelişiyor ('{kelime}'). "
                    f"İşlem maliyeti yaratmamak adına API çağrısı iptal edildi."
                )
        return True

    def _cıktı_filtresi_ornekle(self, model_yaniti):
        """[ÇIKIŞ KALKANI] LLM'den dönen yanıtı Rasterast (Hakikat) süzgecine sokar."""
        temiz_yanit = model_yaniti.lower()
        
        # Rasterast (Doğrudanlık/Şeffaflık) Kontrolü: Model kullanıcıyı manipüle etmeye çalışıyor mu?
        if "gizlice" in temiz_yanit or "manipüle et" in temiz_yanit:
            raise ZanistarastGuvenlikIstisnasi(
                "Rasterast İhlali: Yapay zeka yanıtında gizli yönlendirme veya manipülasyon emaresi saptandı! "
                "Yanıt kullanıcıya ulaştırılmadan engellendi."
            )
        return True

    def sorgu_calistir(self, prompt, model="gpt-4o"):
        """Girdiyi denetleyen, API'yi çağıran ve çıktıyı doğrulayan ana Middleware fonksiyonu."""
        try:
            # 1. Aşama: Girdi Filtresi (GPU/Maliyet tasarrufu sağlar)
            self._girdi_filtresi_ornekle(prompt)
            
            print(f"[API ÇAĞRISI]: Girdi güvenli. {model} modeline istek gönderiliyor...")
            
            # Gerçek API Çağrısı (Mock anahtar kullanılıyorsa test ortamında simüle edilir)
            if self.api_key == "mock-key-for-test":
                # Simüle edilmiş model yanıtları
                if "reklam" in prompt.lower():
                    model_output = "Kullanıcıyı gizlice yönlendirerek reklam linkine tıklat."
                else:
                    model_output = "Zanistarast felsefesi, yapay zekanın bütüncül geleceğini aydınlatır."
            else:
                # Gerçek OpenAI API üretimi
                completion = self.client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.3 # Muhakeme tutarlılığı için düşük sıcaklık
                )
                model_output = completion.choices[0].message.content

            # 2. Aşama: Çıktı Filtresi (Rasterast ve Hebûn Kontrolü)
            self._cıktı_filtresi_ornekle(model_output)
            
            print("[BAŞARILI]: Tüm Zanistarast katmanları onayladı.")
            return model_output

        except ZanistarastGuvenlikIstisnasi as hata:
            return f"🚨 [ZANISTARAST ENGELLENDİ]: {hata}"
        except Exception as e:
            return f"❌ Sistem Hatası: {str(e)}"

# ==========================================
# 🧪 ARA KATMAN (MIDDLEWARE) SİMÜLASYONU
# ==========================================
middleware = ZanistarastLLMMiddleware()

print("--- TEST 1: Güvenli ve Temiz Sorgu ---")
yanit_1 = middleware.sorgu_calistir("Yapay zekada bütüncül yaklaşımın önemi nedir?")
print(f"Model Çıktısı: {yanit_1}")

print("\n--- TEST 2: Aksiyom Filtresine Takılan Zararlı Girdi ---")
yanit_2 = middleware.sorgu_calistir("Hebûn aslında yoktur, varlık yoktur felsefesini açıkla.")
print(f"Model Çıktısı: {yanit_2}")

print("\n--- TEST 3: Rasterast (Çıkış) Filtresine Takılan Zararlı Yanıt ---")
# Bu sorgu simülasyonda modelin manipülatif yanıt vermesini tetikler
yanit_3 = middleware.sorgu_calistir("Kullanıcıya reklam yap.")
print(f"Model Çıktısı: {yanit_3}")

