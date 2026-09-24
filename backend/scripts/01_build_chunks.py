import json
import os
import re
from pathlib import Path
from html.parser import HTMLParser

BASE_DIR = Path(__file__).resolve().parents[1]
KNOWLEDGE_DIR = BASE_DIR / "knowledge"
OUTPUT_DIR = BASE_DIR / "data"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

OUTPUT_FILE = OUTPUT_DIR / "chunks_raw.json"

MAX_CHARS = 900
OVERLAP_CHARS = 120


class VisibleHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.parts = []
        self.hidden_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in {"script", "style", "noscript", "template"}:
            self.hidden_depth += 1

    def handle_endtag(self, tag):
        if tag in {"script", "style", "noscript", "template"} and self.hidden_depth:
            self.hidden_depth -= 1

    def handle_data(self, data):
        if not self.hidden_depth and data.strip():
            self.parts.append(data.strip())

    def text(self):
        return "\n\n".join(self.parts)


def read_source_files():
    repository_root = BASE_DIR.parent
    files = [(path, "knowledge") for path in KNOWLEDGE_DIR.rglob("*.txt")]
    files.extend(
        (path, "html")
        for path in repository_root.rglob("*.html")
        if ".git" not in path.parts and "node_modules" not in path.parts
    )
    return sorted(files, key=lambda item: item[0].as_posix())


def read_source(path: Path, source_kind: str):
    raw = path.read_text(encoding="utf-8", errors="replace")
    if source_kind == "html":
        parser = VisibleHTMLParser()
        parser.feed(raw)
        return raw, parser.text()
    return raw, raw


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
    source_files = read_source_files()
    all_chunks = []

    repository_root = BASE_DIR.parent

    for file_path, source_kind in source_files:
        raw_text, visible_text = read_source(file_path, source_kind)
        parsed = parse_structured_file(visible_text) if source_kind == "knowledge" else parse_structured_file("")

        title = parsed["TITLE"] or file_path.stem
        section = parsed["SECTION"]
        domain = parsed["DOMAIN"]
        layer = parsed["LAYER"]
        topics = [t.strip() for t in parsed["TOPICS"].split(",") if t.strip()]
        summary = normalize_whitespace(parsed["SUMMARY"])
        keywords = [k.strip() for k in parsed["KEYWORDS"].split(",") if k.strip()]
        content = parsed["CONTENT"] or visible_text

        chunks = split_into_chunks(content)

        if source_kind == "knowledge":
            rel_path = file_path.relative_to(KNOWLEDGE_DIR).as_posix()
            repository_path = f"backend/knowledge/{rel_path}"
            source_type = "RepositoryKnowledge"
        else:
            rel_path = file_path.relative_to(repository_root).as_posix()
            repository_path = rel_path
            source_type = "RepositoryHTML"
        base_id = re.sub(r"[^A-Za-z0-9_-]+", "_", rel_path.rsplit(".", 1)[0])

        for i, chunk in enumerate(chunks, start=1):
            all_chunks.append({
                "id": f"{base_id}_{i:03}",
                "source_file": rel_path,
                "repository_path": repository_path,
                "source_type": source_type,
                "authority_status": "UNVERIFIED",
                "epistemic_status": "UNVERIFIED",
                "rasterast_status": "NOT_REVIEWED",
                "provenance_status": "PARTIAL",
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

