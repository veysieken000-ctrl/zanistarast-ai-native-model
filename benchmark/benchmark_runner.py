import json
from pathlib import Path

class RasterastBenchmark:

    def __init__(self):
        self.questions = json.loads(
            Path("benchmark/benchmark_questions.json").read_text(encoding="utf-8")
        )

        self.models = json.loads(
            Path("benchmark/models.json").read_text(encoding="utf-8")
        )

    def show_models(self):
        for model in self.models["models"]:
            print(model["name"])

    def show_questions(self):
        for q in self.questions["questions"]:
            print(q["id"], "-", q["question"])

if __name__ == "__main__":
    bench = RasterastBenchmark()
    bench.show_models()
    bench.show_questions()


