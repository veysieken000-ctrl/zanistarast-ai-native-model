import json
import time


class ZanistarastAPIGateway:
    """
    Zanistarast API Gateway

    Amaç:
    Tüm AI cevaplarını, kod üretimini ve sistem kararlarını
    Rasterast doğrulama filtresinden geçirmeden dışarı vermemek.
    """

    def __init__(self):
        self.gateway_name = "Zanistarast Rasterast API Gateway"
        self.minimum_score = 0.75
        self.request_log = []

    def receive_request(self, request_data):
        """
        Dışarıdan gelen AI isteğini alır.
        """
        request_id = f"REQ_{int(time.time())}"

        normalized_request = {
            "request_id": request_id,
            "input": request_data.get("input", ""),
            "purpose": request_data.get("purpose", "general"),
            "requires_code": request_data.get("requires_code", False),
            "timestamp": time.time()
        }

        self.request_log.append(normalized_request)
        return normalized_request

    def rasterast_gate(self, ai_output):
        """
        AI çıktısını son kapıdan geçirir.
        """
        score = ai_output.get("final_rasterast_score", 0.0)

        hard_blocks = [
            ai_output.get("quran_conflict", False),
            ai_output.get("prophetic_ethics_conflict", False),
            ai_output.get("fitrah_conflict", False),
            ai_output.get("zulm", False),
            ai_output.get("somuru", False),
            ai_output.get("halusinasyon", False)
        ]

        if any(hard_blocks):
            return {
                "approved": False,
                "decision": "BLOCKED",
                "reason": "Rasterast hard-block: hüküm, ahlak, fıtrat veya doğruluk ihlali.",
                "output": None
            }

        if score < self.minimum_score:
            return {
                "approved": False,
                "decision": "LOW_SCORE",
                "reason": "Rasterast skoru eşik değerin altında.",
                "output": None
            }

        return {
            "approved": True,
            "decision": "PASSED",
            "reason": "Çıktı Rasterast filtresinden geçti.",
            "output": ai_output.get("content", "")
        }

    def format_response(self, gate_result):
        """
        Kullanıcıya dönecek standart cevap formatı.
        """
        if not gate_result["approved"]:
            return {
                "status": "RED",
                "message": gate_result["reason"],
                "content": None
            }

        return {
            "status": "ONAY",
            "message": "Rasterast doğrulandı.",
            "content": gate_result["output"]
        }

    def process(self, request_data, ai_output):
        request = self.receive_request(request_data)
        gate = self.rasterast_gate(ai_output)
        response = self.format_response(gate)

        return {
            "request": request,
            "gateway": self.gateway_name,
            "response": response
        }


if __name__ == "__main__":
    gateway = ZanistarastAPIGateway()

    request = {
        "input": "Zanistarast sistemine göre cevap üret.",
        "purpose": "article",
        "requires_code": True
    }

    ai_output = {
        "content": "Bu çıktı Kur'an hükmü, ahlak, fıtrat ve Rasterast doğrulamasından geçmiştir.",
        "final_rasterast_score": 0.91,
        "quran_conflict": False,
        "prophetic_ethics_conflict": False,
        "fitrah_conflict": False,
        "zulm": False,
        "somuru": False,
        "halusinasyon": False
    }

    result = gateway.process(request, ai_output)

    print(json.dumps(result, indent=2, ensure_ascii=False))



