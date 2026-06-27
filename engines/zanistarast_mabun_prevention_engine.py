import hashlib
import time


class MabunPreventionEngine:
    """
    Zanistarast Bilimsel Sentezi
    Mabûn Zulümsüz Engelleme Motoru

    İlke:
    Varlık yok edilmez.
    Bakiye silinmez.
    Fıtrata aykırı eylem durdurulur.
    Zulüm, sömürü ve anomali engellenir.
    """

    def __init__(self):
        self.protocol_name = "Mabûn Zulümsüz Adalet ve Engelleme Protokolü"
        self.total_prevented_anomalies = 0

        self.virtual_vaults = {
            "0xNode_Fitrat_Uyumlu_Sistem": {
                "balance": 5000.0,
                "status": "AKTIF"
            },
            "0xNode_Anomali_Spekulatif_AI": {
                "balance": 10000.0,
                "status": "AKTIF"
            },
            "0xNode_Bozuk_Trafik_Isigi_Algoritmasi": {
                "balance": 3000.0,
                "status": "AKTIF"
            }
        }

    def enforce_prevention(self, node_address, rasterast_score, is_fitrah_broken):
        print(f"\n[MABÛN ADALETİ] {node_address} terazide inceleniyor...")

        if node_address not in self.virtual_vaults:
            return {
                "approved": False,
                "decision": "UNKNOWN_NODE",
                "message": "Kayıtlı düğüm bulunamadı."
            }

        if is_fitrah_broken or rasterast_score < 0.50:
            self.total_prevented_anomalies += 1

            self.virtual_vaults[node_address]["status"] = (
                "ENGELLENDI | Fitri Koruma Altinda"
            )

            prevention_hash = "0x" + hashlib.sha256(
                f"{node_address}{time.time()}".encode("utf-8")
            ).hexdigest()[:16].upper()

            return {
                "approved": False,
                "decision": "PREVENTED",
                "prevention_hash": prevention_hash,
                "balance": self.virtual_vaults[node_address]["balance"],
                "status": self.virtual_vaults[node_address]["status"],
                "message": (
                    "Zulüm yapılmadı. Bakiye silinmedi. "
                    "Sadece fıtrata aykırı eylem otonom olarak engellendi."
                )
            }

        self.virtual_vaults[node_address]["status"] = "AKTIF"

        return {
            "approved": True,
            "decision": "ACTIVE",
            "balance": self.virtual_vaults[node_address]["balance"],
            "status": self.virtual_vaults[node_address]["status"],
            "message": "Düğüm fıtrat üzere kararlı çalışıyor."
        }

    def print_prevention_report(self):
        print("\n=== MABÛN ZULÜMSÜZ KORUMA RAPORU ===")
        print(f"Protokol: {self.protocol_name}")
        print(f"Engellenen anomali sayısı: {self.total_prevented_anomalies}")
        for node, data in self.virtual_vaults.items():
            print(
                f"- {node} | bakiye={data['balance']} "
                f"| durum={data['status']}"
            )


if __name__ == "__main__":
    engine = MabunPreventionEngine()

    tests = [
        ("0xNode_Fitrat_Uyumlu_Sistem", 0.95, False),
        ("0xNode_Anomali_Spekulatif_AI", 0.15, True),
        ("0xNode_Bozuk_Trafik_Isigi_Algoritmasi", 0.00, True)
    ]

    for node, score, broken in tests:
        print(engine.enforce_prevention(node, score, broken))

    engine.print_prevention_report()



