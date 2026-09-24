import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
INPUT_FILE = BASE_DIR / "data" / "chunks_raw.json"
OUTPUT_FILE = BASE_DIR / "data" / "processed_knowledge.jsonl"


def normalize_item(item):
    source_file = str(item.get("source_file") or "").replace("\\", "/")
    source_type = item.get("source_type") or "RepositoryKnowledge"
    repository_path = item.get("repository_path")
    if not repository_path and source_file:
        repository_path = (
            source_file
            if source_type == "RepositoryHTML"
            else f"backend/knowledge/{source_file}"
        )

    return {
        **item,
        "repository_path": repository_path,
        "source_type": source_type,
        "authority_status": "UNVERIFIED",
        "epistemic_status": "UNVERIFIED",
        "rasterast_status": "NOT_REVIEWED",
        "provenance_status": "PARTIAL",
    }


def export_jsonl():
    if not INPUT_FILE.exists():
        raise SystemExit(
            f"Missing {INPUT_FILE}. Run scripts/01_build_chunks.py first."
        )

    items = json.loads(INPUT_FILE.read_text(encoding="utf-8"))
    if not isinstance(items, list):
        raise SystemExit("chunks_raw.json must contain a JSON array.")

    normalized = [normalize_item(item) for item in items]

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_FILE.open("w", encoding="utf-8") as handle:
        for item in normalized:
            handle.write(json.dumps(item, ensure_ascii=False) + "\n")

    print(f"Exported {len(normalized)} chunks")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    export_jsonl()
