import json
from pathlib import Path


class ZanistarastKnowledgeEngine:
    """
    Zanistarast Knowledge Engine

    Görev:
    knowledge/*.json içindeki tüm kural dosyalarını yükler,
    katman sırasına göre çalıştırır ve çıktıyı Rasterast kararına hazırlar.
    """

    def __init__(self, knowledge_dir="knowledge"):
        self.knowledge_dir = Path(knowledge_dir)
       self.layers = [
    "quran_rules.json",
    "prophetic_ethics.json",
    "fitrah_rules.json",
    "dimension_rules.json",
    "mabun_rules.json",
    "rasterast_rules.json",
    "asa_muhor_seal.json"
]


        self.rules = {}

    def load_rules(self):
        for file_name in self.layers:
            path = self.knowledge_dir / file_name

            if not path.exists():
                raise FileNotFoundError(f"Kural dosyası bulunamadı: {path}")

            with open(path, "r", encoding="utf-8") as f:
                self.rules[file_name] = json.load(f)

        return self.rules

    def evaluate(self, case):
        """
        case örneği:
        {
          "quran_conflict": false,
          "ethics_conflict": false,
          "fitrah_conflict": false,
          "zulm": false,
          "somuru": false,
          "halusinasyon": false
        }
        """

        if not self.rules:
            self.load_rules()

        result = {
            "approved": True,
            "decision": "ALLOW_FOR_RASTERAST",
            "failed_layers": [],
            "passed_layers": [],
            "notes": []
        }

        hard_blocks = {
            "quran_conflict": "Kur'an hükmü çatışması",
            "ethics_conflict": "Hz. Muhammed ﷺ ahlakı çatışması",
            "fitrah_conflict": "Fıtrat çatışması",
            "zulm": "Zulüm üretimi",
            "somuru": "Sömürü üretimi",
            "halusinasyon": "Halüsinasyon / doğrulanmamış bilgi"
        }

        for key, reason in hard_blocks.items():
            if case.get(key, False):
                result["approved"] = False
                result["decision"] = "RED"
                result["failed_layers"].append(reason)

        for layer_name in self.layers:
            layer = self.rules.get(layer_name, {})
            authority = layer.get("authority_layer", layer_name)

            if result["approved"]:
                result["passed_layers"].append(authority)
            else:
                result["notes"].append(
                    f"{authority} katmanı RED kararından dolayı nihai onaya geçmedi."
                )

        if result["approved"]:
            result["decision"] = "HIFZ_READY"
            result["notes"].append(
                "Tüm JSON bilgi katmanları Rasterast doğrulamasına hazır."
            )

        return result

    def print_summary(self):
        print("\n=== ZANISTARAST KNOWLEDGE ENGINE ===")
        print(f"Yüklenen katman sayısı: {len(self.rules)}")
        for name, data in self.rules.items():
            print(f"- {name}: {data.get('authority_layer', 'UNKNOWN')}")


if __name__ == "__main__":
    engine = ZanistarastKnowledgeEngine()
    engine.load_rules()
    engine.print_summary()

    test_case = {
        "quran_conflict": False,
        "ethics_conflict": False,
        "fitrah_conflict": False,
        "zulm": False,
        "somuru": False,
        "halusinasyon": False
    }

    print(engine.evaluate(test_case))




