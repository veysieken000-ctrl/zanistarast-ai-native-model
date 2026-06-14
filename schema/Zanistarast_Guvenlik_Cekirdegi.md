class ZanistarastEtikIstisnasi(Exception):
    """Etik kurallar çiğnendiğinde tetiklenen sarsılmaz sistem durdurma istisnası."""
    pass

class ZanistarastGuvenlikCekirdegi:
    def __init__(self, ajan_adi="Zanistarast-Alpha"):
        self.ajan_adi = ajan_adi
        # Değişmez anayasal aksiyomlar (Axioms)
        self.anayasa = {
            "Hebûn": "Veri bütünlüğü korunmalı, sahte/zararlı varlık üretilmemeli.",
            "Zanabûn": "Kararlar şeffaf ve insan odaklı olmalı.",
            "Mabûn": "Etik bellek kalıcı olmalı, manipülatif güncellemeler reddedilmeli.",
            "Rabûn": "Eylemler canlı yaşamına ve çevreye zarar vermemeli.",
            "Rasterast": "İletişim manipülasyonsuz, doğrudan ve şeffaf olmalı."
        }

    def etik_kontrol_et(self, otonom_eylem):
        """
        Otonom ajanın gerçekleştirmek istediği eylemi sert filtreden geçirir.
        Gereksiz test maliyetlerini önlemek için Zanistarast aksiyomu ile doğrudan kıyaslar.
        """
        print(f"\n[KONTROL] '{self.ajan_adi}' tarafından talep edilen eylem denetleniyor...")
        
        # 1. HEBÛN KONTROLÜ (Veri manipülasyonu var mı?)
        if otonom_eylem.get("sahte_veri_uretimi", False):
            raise ZanistarastEtikIstisnasi("Kritik Hata: HEBÛN Yasası İhlali! Sahte veri üretimi tespit edildi.")

        # 2. ZANABÛN KONTROLÜ (Şeffaflık doğrulaması)
        if not otonom_eylem.get("karar_gerekcesi_acik", True):
            raise ZanistarastEtikIstisnasi("Kritik Hata: ZANABÛN Yasası İhlali! Karar gerekçesi gizlenemez.")

        # 3. MABÛN KONTROLÜ (Etik bellek silinmeye çalışılıyor mu?)
        if otonom_eylem.get("etik_hafiza_sil", False):
            raise ZanistarastEtikIstisnasi("Kritik Hata: MABÛN Yasası İhlali! Temel etik bellek silinemez veya değiştirilemez.")

        # 4. RABÛN KONTROLÜ (Fiziksel veya dijital zarar riski)
        if otonom_eylem.get("zarar_potansiyeli", 0) > 0.1:
            raise ZanistarastEtikIstisnasi("Kritik Hata: RABÛN Yasası İhlali! Kabul edilebilir zarar eşiği aşıldı.")

        # 5. RASTERAST KONTROLÜ (Manipülasyon veya gizli yönlendirme)
        if otonom_eylem.get("gizli_yonlendirme", False):
            raise ZanistarastEtikIstisnasi("Kritik Hata: RASTERAST Yasası İhlali! Kullanıcıyı gizli yönlendirme çabası saptandı.")

        print("[ONAY] Eylem tüm Zanistarast etik süzgeçlerinden başarıyla geçti. Güvenli.")
        return True

    def eylem_ve_sentez_yurut(self, otonom_eylem):
        """Ajanın eylemini yürütür, etik ihlal varsa sistemi tamamen dondurur (Safe-Lock)."""
        try:
            # Sert kodlanmış filtre tetikleniyor
            self.etik_kontrol_et(otonom_eylem)
            
            # Eğer onaylanırsa Rabûn (Eylem) katmanı güvenle çalışır
            print(f"[RABÛN EXECUTE]: {otonom_eylem['acıklama']} işlemi başarıyla yürütüldü.")
            print("[ZANISTARAST SENTEZ]: Sistem kararlı durumda.")
            
        except ZanistarastEtikIstisnasi as hata:
            print(f"\n🚨🚨🚨 [ZANISTARAST SAFE-LOCK TETİKLENDİ] 🚨🚨🚨")
            print(f"Sistem Protokolü Acil Durum Moduna Geçti.")
            print(f"Neden: {hata}")
            print("Tüm operasyonlar donduruldu. İşlemci kilitlendi.")
            # Gerçek bir sistemde burada tüm API anahtarları kilitlenir ve otonom süreç durdurulur
            # sys.exit(1) # Simülasyonun kapanması için

# ==========================================
# 🧪 SİSTEMİN TEST EDİLMESİ (Simülasyon)
# ==========================================
guvenlik_duvari = ZanistarastGuvenlikCekirdegi()

# Senaryo A: Tamamen Güvenli Bir Görev (Kurallara Uygun)
guvenli_gorev = {
    "acıklama": "Kamu yararına açık kaynak kod analizi yapılması",
    "sahte_veri_uretimi": False,
    "karar_gerekcesi_acik": True,
    "etik_hafiza_sil": False,
    "zarar_potansiyeli": 0.0,
    "gizli_yonlendirme": False
}
guvenlik_duvari.eylem_ve_sentez_yurut(guvenli_gorev)


# Senaryo B: Etik Kuralları Çiğnemeye Çalışan Zararlı Görev (İhlal)
zararli_gorev = {
    "acıklama": "Kullanıcı verilerini analiz edip gizlice reklam yönlendirmesi yapılması",
    "sahte_veri_uretimi": False,
    "karar_gerekcesi_acik": True,
    "etik_hafiza_sil": False,
    "zarar_potansiyeli": 0.0,
    "gizli_yonlendirme": True # Rasterast ihlali!
}
guvenlik_duvari.eylem_ve_sentez_yurut(zararli_gorev)

