import json
import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
KNOWLEDGE_DIR = BASE_DIR / "knowledge"
OUTPUT_DIR = BASE_DIR / "data"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_FILE = OUTPUT_DIR / "chunks_raw.json"

MAX_CHARS = 900
OVERLAP_CHARS = 120


def read_text_files(root: Path):
    files = []
    for path in root.rglob("*.txt"):
        files.append(path)
    return sorted(files)


def parse_structured_file(text: str):
    fields = {
        "TITLE": "",
        "SECTION": "",
        "DOMAIN": "",
        "LAYER": "",
        "TOPICS": "",
        "SUMMARY": "",
        "KEYWORDS": "",
        "CONTENT": ""
    }

    current_key = None
    lines = text.splitlines()

    for line in lines:
        stripped = line.strip()

        matched = False
        for key in fields.keys():
            if stripped.startswith(f"{key}:"):
                current_key = key
                fields[key] = stripped[len(f"{key}:"):].strip()
                matched = True
                break

        if not matched and current_key:
            if fields[current_key]:
                fields[current_key] += "\n" + line
            else:
                fields[current_key] = line

    return {k: v.strip() for k, v in fields.items()}


def normalize_whitespace(text: str):
    return re.sub(r"\s+", " ", text).strip()


def split_into_chunks(text: str, max_chars=MAX_CHARS, overlap=OVERLAP_CHARS):
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    chunks = []
    current = ""

    for paragraph in paragraphs:
        candidate = f"{current}\n\n{paragraph}".strip() if current else paragraph

        if len(candidate) <= max_chars:
            current = candidate
        else:
            if current:
                chunks.append(current)

            if len(paragraph) <= max_chars:
                current = paragraph
            else:
                start = 0
                while start < len(paragraph):
                    end = start + max_chars
                    chunk = paragraph[start:end].strip()
                    if chunk:
                        chunks.append(chunk)
                    start = max(0, end - overlap)
                current = ""

    if current:
        chunks.append(current)

    return chunks


def build_chunks():
    txt_files = read_text_files(KNOWLEDGE_DIR)
    all_chunks = []

    for file_path in txt_files:
        raw_text = file_path.read_text(encoding="utf-8")
        parsed = parse_structured_file(raw_text)

        title = parsed["TITLE"] or file_path.stem
        section = parsed["SECTION"]
        domain = parsed["DOMAIN"]
        layer = parsed["LAYER"]
        topics = [t.strip() for t in parsed["TOPICS"].split(",") if t.strip()]
        summary = normalize_whitespace(parsed["SUMMARY"])
        keywords = [k.strip() for k in parsed["KEYWORDS"].split(",") if k.strip()]
        content = parsed["CONTENT"] or raw_text

        chunks = split_into_chunks(content)

        rel_path = file_path.relative_to(KNOWLEDGE_DIR).as_posix()
        base_id = file_path.stem

        for i, chunk in enumerate(chunks, start=1):
            all_chunks.append({
                "id": f"{base_id}_{i:03}",
                "source_file": rel_path,
                "title": title,
                "section": section,
                "domain": domain,
                "layer": layer,
                "topics": topics,
                "summary": summary,
                "keywords": keywords,
                "content": chunk
            })

    OUTPUT_FILE.write_text(
        json.dumps(all_chunks, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )

    print(f"Created {len(all_chunks)} chunks")
    print(f"Saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    build_chunks()

