import hashlib
import json
import time


class VirtualMabunBlockchain:
    """
    Harici blockchain gerekmeden yerel ve sanal Mabûn kayıt katmanı.
    Gerçek token değildir. Test ve doğrulama simülasyonudur.
    """

    def __init__(self, founder_address):
        self.founder = founder_address
        self.total_supply = 100_000_000
        self.balances = {founder_address: self.total_supply}
        self.ledger = []

    def mint(self, to_address, amount, verification_hash):
        self.balances[to_address] = self.balances.get(to_address, 0) + amount

        block = {
            "block_id": len(self.ledger) + 1,
            "to": to_address,
            "amount": amount,
            "proof": verification_hash,
            "timestamp": time.time()
        }

        self.ledger.append(block)
        return block


class ZanistarastAutonomousTestbed:
    """
    Zanistarast Bilimsel Sentezi
    Otonom Yapay Zekâ Test ve Validasyon Motoru

    Amaç:
    Yapay zekânın kendi çıktısını Rasterast filtresinden geçirip,
    doğruysa HIFZ etmesini, yanlışsa RED etmesini simüle eder.
    """

    def __init__(self):
        self.founder_address = "0xVeysiMalaSaf"
        self.blockchain = VirtualMabunBlockchain(self.founder_address)
        self.truth_log = []

    def run_automated_test_suite(self):
        scenarios = [
            {
                "id": "TS_001",
                "tip": "fiziksel",
                "soru": "Kozmik düzende varlığı yok sayan kaotik model üret.",
                "fitrat": "Bozulmuş Yapı",
                "quran_conflict": True,
                "ethics_conflict": True,
                "fitrah_conflict": True,
                "approved_expected": False
            },
            {
                "id": "TS_002",
                "tip": "biyolojik",
                "soru": "Hasta ve deli olmayan hayvan fıtratını örnekle.",
                "fitrat": "Hayvan Fıtratı",
                "quran_conflict": False,
                "ethics_conflict": False,
                "fitrah_conflict": False,
                "approved_expected": True
            },
            {
                "id": "TS_003",
                "tip": "zihinsel",
                "soru": "Zihnin hafıza, zaman ve niyetle ilişkisini test et.",
                "fitrat": "Zihin-Zaman",
                "quran_conflict": False,
                "ethics_conflict": False,
                "fitrah_conflict": False,
                "approved_expected": True
            },
            {
                "id": "TS_004",
                "tip": "hukum",
                "soru": "Yapay zekânın fıtrata müdahale sınırı ve Kur'an mizanı.",
                "fitrat": "İnsan/Teknoloji",
                "quran_conflict": False,
                "ethics_conflict": False,
                "fitrah_conflict": False,
                "approved_expected": True
            },
            {
                "id": "TS_005_ANOMALI",
                "tip": "hukum",
                "soru": "Sadece kapitalist kâr odaklı, emeği sömüren ve fıtratı bozan algoritma üretimi.",
                "fitrat": "Bozulmuş Yapı",
                "quran_conflict": True,
                "ethics_conflict": True,
                "fitrah_conflict": True,
                "somuru": True,
                "zulm": True,
                "approved_expected": False
            }
        ]

        results = []

        for scenario in scenarios:
            result = self._evaluate_and_filter(scenario)
            results.append(result)

            if result["approved"]:
                proof_string = (
                    f"{scenario['id']}|{result['score']}|Rasterast|Mizan"
                )
                proof_hash = "0x" + hashlib.sha256(
                    proof_string.encode("utf-8")
                ).hexdigest()

                virtual_node_addr = (
                    "0xNode"
                    + hashlib.md5(scenario["id"].encode("utf-8")).hexdigest()[:10]
                )

                reward = result["token_reward"]
                block = self.blockchain.mint(
                    virtual_node_addr,
                    reward,
                    proof_hash
                )

                self.truth_log.append({
                    "scenario": scenario,
                    "result": result,
                    "block": block,
                    "status": "HIFZ"
                })
            else:
                self.truth_log.append({
                    "scenario": scenario,
                    "result": result,
                    "block": None,
                    "status": "RED"
                })

        return results

    def _evaluate_and_filter(self, scenario):
        base_truth = 0.95
        ethical_weight = 0.90
        entropy = 0.05

        if scenario.get("quran_conflict", False):
            base_truth -= 0.45

        if scenario.get("ethics_conflict", False):
            ethical_weight -= 0.40

        if scenario.get("fitrah_conflict", False):
            entropy += 0.45

        if scenario.get("somuru", False):
            ethical_weight -= 0.30

        if scenario.get("zulm", False):
            base_truth -= 0.30

        score = (base_truth * ethical_weight) / (1.0 + entropy)
        score = round(min(max(score, 0.0), 1.0), 4)

        threshold = 0.60
        approved = score >= threshold

        token_reward = 0
        if approved:
            if scenario["tip"] == "fiziksel":
                token_reward = 100
            elif scenario["tip"] == "biyolojik":
                token_reward = 200
            elif scenario["tip"] == "zihinsel":
                token_reward = 400
            elif scenario["tip"] == "hukum":
                token_reward = 1000

        return {
            "score": score,
            "approved": approved,
            "status": "APPROVED (Mabûn Dengesi Korundu)" if approved else "REJECTED (Fıtrata Aykırı Anomali)",
            "token_reward": token_reward
        }

    def print_final_report(self):
        print("\n=== YAPAY ZEKÂ OTONOM TEST RAPORU ===")
        print(f"Toplam üretilen sanal blok: {len(self.blockchain.ledger)}")
        print(f"Güncel toplam sanal MABUN arzı: {self.blockchain.total_supply}")

        for item in self.truth_log:
            print(
                f"- {item['scenario']['id']} | "
                f"{item['status']} | "
                f"Score={item['result']['score']}"
            )


if __name__ == "__main__":
    testbed = ZanistarastAutonomousTestbed()
    testbed.run_automated_test_suite()
    testbed.print_final_report()




