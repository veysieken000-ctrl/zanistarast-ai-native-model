class ZanistarastMultilingualDictionary:
    """
    Zanistarast Çoklu Dil Sözlüğü

    Amaç:
    Zanistarast kavramlarını farklı dillere taşırken
    anlam kaybını, yanlış çeviriyi ve kavram bozulmasını azaltmak.
    """

    def __init__(self):
        self.dictionary = {
            "Hebûn": {
                "tr": "Varlık, varoluş, veri bütünlüğü",
                "en": "Being, existence, data integrity",
                "ku": "Hebûn, hebûna rast, yekparetiya daneyê"
            },
            "Zanabûn": {
                "tr": "Bilme, bilinçli anlama, şeffaf karar",
                "en": "Knowing, conscious understanding, transparent decision",
                "ku": "Zanabûn, têgihiştin, biryara zelal"
            },
            "Mabûn": {
                "tr": "Ara düzen, emek-adalet dengesi, sömürüsüz sistem",
                "en": "Intermediate order, labor-justice balance, non-exploitative system",
                "ku": "Mabûn, nîzama navîn, hevsengiya ked û dadê"
            },
            "Rabûn": {
                "tr": "Yönetme, koruma, canlıya ve çevreye zarar vermeme",
                "en": "Guiding, protecting, avoiding harm to life and environment",
                "ku": "Rabûn, rêvebirin, parastin, zirar nedan li jiyanê"
            },
            "Rasterast": {
                "tr": "Doğrunun doğrulanması, şeffaf hakikat filtresi",
                "en": "Verification of truth, transparent truth filter",
                "ku": "Rastkirina rastiyê, parzûna rastiya zelal"
            },
            "Ehad": {
                "tr": "Tekillik, benzersizlik, ilahi ve varlıksal birlik",
                "en": "Singularity, uniqueness, divine and ontological unity",
                "ku": "Yekîtî, bêhempatî, yekbûna hebûnî"
            },
            "Fıtrat": {
                "tr": "Yaratılış kodu, doğal denge, bozulmamış düzen",
                "en": "Innate nature, natural balance, uncorrupted order",
                "ku": "Fitrat, xwezaya afirandinê, hevsengiya xwezayî"
            }
        }

    def get_term(self, term, language="tr"):
        item = self.dictionary.get(term)

        if not item:
            return {
                "found": False,
                "term": term,
                "message": "Kavram sözlükte bulunamadı."
            }

        return {
            "found": True,
            "term": term,
            "language": language,
            "meaning": item.get(language, item.get("tr"))
        }

    def validate_translation(self, term, translated_meaning):
        """
        Basit anlam kaybı kontrolü.
        Daha sonra Rasterast Core'a bağlanabilir.
        """
        item = self.dictionary.get(term)

        if not item:
            return {
                "valid": False,
                "reason": "Kavram bulunamadı."
            }

        core_meaning = item["tr"].lower()
        translated = translated_meaning.lower()

        required_keywords = []

        if term == "Rasterast":
            required_keywords = ["doğru", "hakikat", "şeffaf"]
        elif term == "Mabûn":
            required_keywords = ["adalet", "emek", "sömürü"]
        elif term == "Hebûn":
            required_keywords = ["varlık", "veri", "bütünlük"]
        elif term == "Rabûn":
            required_keywords = ["koruma", "zarar", "canlı"]
        elif term == "Zanabûn":
            required_keywords = ["bilme", "anlama", "şeffaf"]

        score = 0

        for keyword in required_keywords:
            if keyword in translated or keyword in core_meaning:
                score += 1

        return {
            "valid": score >= 2,
            "score": score,
            "term": term,
            "message": "Çeviri anlamı korunuyor." if score >= 2 else "Çeviride anlam kaybı var."
        }

    def print_dictionary(self):
        print("\n=== ZANISTARAST ÇOKLU DİL SÖZLÜĞÜ ===")
        for term, values in self.dictionary.items():
            print(f"\n{term}")
            for lang, meaning in values.items():
                print(f" {lang}: {meaning}")


if __name__ == "__main__":
    dictionary = ZanistarastMultilingualDictionary()

    dictionary.print_dictionary()

    print(dictionary.get_term("Rasterast", "en"))
    print(dictionary.validate_translation("Rasterast", "Doğru, hakikat ve şeffaf doğrulama filtresi"))



