#!/usr/bin/env python3
"""Read-only Zanistarast article-source inventory across authorized public GitHub repositories.

This is a *source-file counter*, not an autonomous manuscript author or peer reviewer.
No repository content or user documents are changed by this program.
"""
from __future__ import annotations

import argparse
from collections import Counter, defaultdict
from datetime import datetime, timezone
import hashlib
import json
import os
from pathlib import Path
import re
import time
import unicodedata
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

OWNER = "veysieken000-ctrl"
PUBLIC_REPOS = (
    "zanistarast-ai-native-model",
    "The-Newroza-Kawa-Civilization-Theses",
    "zanistarast-ontology",
    "ZANISTARAST-TEORILER",
    "hebun-zanabun",
    "zanistarast-formal-foundations",
    "zanistarast-simulations",
)
ALGORITHM_VERSION = "yek-6tek-inventory-v1.0"
DOMAINS = {
    "ontoloji": ("ontolog", "varlik", "hebun", "being", "existence", "fizik", "physical"),
    "epistemoloji": ("epistem", "bilgi", "akil", "zanabun", "knowledge", "witness", "sahit"),
    "rasterast_yontem": ("rasterast", "validation", "method", "proof", "test", "dogrulama"),
    "zaman": ("zaman", "time", "entropy", "temporal"),
    "jeoloji": ("geolog", "jeolo", "geological"),
    "biyoloji": ("biyoloj", "biolog", "cell", "huc", "evolution"),
    "tarih": ("tarih", "history", "civilization", "medeniyet", "newroza"),
    "ahlak_duygu_ruh": ("ahlak", "ethic", "moral", "duygu", "emotion", "ruh", "fitrat"),
    "toplum_hukuk_ekonomi": ("toplum", "society", "hukuk", "legal", "ekonomi", "mabun"),
}
TEXT_SUFFIX = (".html", ".md", ".tex", ".docx", ".pdf", ".txt")


def is_candidate(repo: str, path: str, size: int) -> bool:
    """Deliberately conservative, filename-only *first filter*."""
    if size < 100 or path.endswith("/README.md") or "/_arsiv" in path.lower():
        return False
    p = path.lower()
    if repo == "zanistarast-ai-native-model":
        return bool(re.match(r"^makale-\d\d.*\.html$", p)
                    or re.match(r"^articles/.*\.html$", p)
                    or re.match(r"^(?:0[0-9]|1[01])_(?:time|unified_mind).*\.html$", p))
    if repo == "hebun-zanabun":
        return bool((p.startswith("makaleler/") and p.endswith(".md"))
                    or (p.startswith("articles/") and p.endswith(".md")
                        and not p.endswith("/readme.md")))
    if repo == "ZANISTARAST-TEORILER":
        return p.startswith("theories/") and p.endswith(".md")
    if repo == "The-Newroza-Kawa-Civilization-Theses":
        return bool(re.match(r"^(theories|research/history|research/case-studies)/.*\.md$", p))
    if repo == "zanistarast-ontology":
        return bool(p.startswith("papers/") and p.endswith(".md")
                    and not any(x in p for x in ("standard", "index")))
    return False


def normalize_title(path: str) -> str:
    """Name-based near-duplicate hint; never equate equal titles with equal scholarship."""
    name = Path(path).name
    name = unicodedata.normalize("NFKD", name).casefold()
    name = "".join(ch for ch in name if not unicodedata.combining(ch))
    name = name.replace("\u0131", "i")
    name = re.sub(r"\.(?:html|md|tex|docx|pdf)$", "", name)
    name = re.sub(r"^(?:makale)[-_]\d{1,2}(?:[-_]\d{1,2})?[-_]?", "", name)
    name = re.sub(r"^\d{1,2}[-_]", "", name)
    return re.sub(r"[^a-z0-9]+", "-", name).strip("-")


def detect_domains(path: str) -> list[str]:
    s = unicodedata.normalize("NFKD", path).casefold()
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = s.replace("\u0131", "i")
    result = [domain for domain, tokens in DOMAINS.items() if any(x in s for x in tokens)]
    return result or ["siniflandirilmamis"]


def fetch_tree(repo: str, token: str) -> list[dict]:
    from urllib.parse import quote
    url = f"https://api.github.com/repos/{quote(OWNER)}/{quote(repo)}/git/trees/main?recursive=1"
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "Zanistarast-read-only-inventory/1.0",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    last_error = None
    for attempt in range(3):
        try:
            with urlopen(Request(url, headers=headers), timeout=20) as response:
                data = json.load(response)
            if data.get("truncated"):
                raise RuntimeError(f"Git tree truncated for {repo}; refuse inaccurate count")
            if not isinstance(data.get("tree"), list):
                raise RuntimeError(f"No Git tree returned for {repo}")
            return [item for item in data["tree"] if item.get("type") == "blob"]
        except (HTTPError, URLError, TimeoutError, ValueError) as error:
            last_error = error
            if attempt < 2:
                time.sleep(1 + attempt)
    raise RuntimeError(f"GitHub inventory failed for {repo}: {last_error}")


def build_inventory(repo_trees: dict[str, list[dict]]) -> tuple[dict, list[dict]]:
    rows: list[dict] = []
    overview = []
    for repo in PUBLIC_REPOS:
        if repo not in repo_trees:
            raise ValueError(f"Missing repository: {repo}")
        tree = repo_trees[repo]
        raw_candidates = 0
        for item in tree:
            path = item["path"]
            size = int(item.get("size") or 0)
            if is_candidate(repo, path, size):
                raw_candidates += 1
                rows.append({
                    "repo": repo,
                    "path": path,
                    "sha": item["sha"],
                    "bytes": size,
                    "title_key": normalize_title(path),
                    "domains": detect_domains(path),
                })
        overview.append({"repo": repo, "total_files": len(tree),
                         "candidate_source_files": raw_candidates})
    exact_unique = {r["sha"] for r in rows}
    title_groups: dict[str, list[dict]] = defaultdict(list)
    for item in rows:
        if item["title_key"]:
            title_groups[item["title_key"]].append(item)
    possible_repeats = {k: v for k, v in title_groups.items() if len(v) > 1}
    domain_counts = Counter(domain for item in rows for domain in item["domains"])
    material = json.dumps(
        {"version": ALGORITHM_VERSION,
         "sources": sorted([f'{r["repo"]}/{r["path"]}:{r["sha"]}' for r in rows]),
         "repo_tree_sizes": overview},
        ensure_ascii=False, sort_keys=True).encode("utf-8")
    fingerprint = hashlib.sha256(material).hexdigest()
    result = {
        "algorithm": ALGORITHM_VERSION,
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "scope": "7 authorized public GitHub repositories, main branches",
        "repo_summary": overview,
        "total_files_scanned": sum(x["total_files"] for x in overview),
        "candidate_source_files": len(rows),
        "unique_exact_candidate_blobs": len(exact_unique),
        "same_title_hint_groups": len(possible_repeats),
        "domain_tag_counts_nonexclusive": dict(sorted(domain_counts.items())),
        "independently_verified_original_papers": None,
        "publication_ready_papers": None,
        "excluded": [
            "private repositories (access restrictions)",
            "Drive originals (not accessible by GitHub Actions)",
            "archival duplicate folders",
            "files smaller than 100 bytes",
        ],
        "fingerprint": fingerprint,
        "caveat": "Filename-filtered sources are NOT independent manuscripts, proofs, or completed peer review.",
    }
    return result, rows


def write_outputs(output_dir: Path, result: dict, rows: list[dict]) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "inventory.json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    with (output_dir / "candidate_sources.tsv").open("w", encoding="utf-8") as stream:
        stream.write("repository\tpath\tsource_blob_sha\tbytes\tpossible_title_key\ttopic_tags\n")
        for row in rows:
            stream.write("\t".join([
                row["repo"], row["path"], row["sha"], str(row["bytes"]),
                row["title_key"], ",".join(row["domains"]),
            ]) + "\n")
    lines = [
        "# Zanistarast – saatlik makale kaynak sayımı",
        "",
        f"- Kaynak deposu: {len(PUBLIC_REPOS)} kamuya açık depo",
        f"- Taranan toplam dosya: **{result['total_files_scanned']}**",
        f"- İlk filtreye uyan makale/teori kaynak metni: **{result['candidate_source_files']}**",
        f"- Birebir farklı aday içerik (Git blob SHA): **{result['unique_exact_candidate_blobs']}**",
        f"- Aynı başlığı düşündüren dosya adı grubu: **{result['same_title_hint_groups']}**",
        "- Bağımsız özgün ve hakemli yayına hazır makale sayısı: **henüz içerik denetimi yapılmadı**",
        "- Özgün Drive Word makaleleri bu GitHub sayımına eklenmedi.",
        "",
        "## Depolar",
        "",
        "| Depo | Tüm dosyalar | Aday kaynak metinler |",
        "|---|---:|---:|",
    ]
    for x in result["repo_summary"]:
        lines.append(f"| {x['repo']} | {x['total_files']} | {x['candidate_source_files']} |")
    lines += [
        "",
        "## Konu işaretleri (bir metin birden çok alana girebilir)",
        "",
        "| Konu | Metin işaretleme sayısı |", "|---|---:|",
    ]
    for k, value in result["domain_tag_counts_nonexclusive"].items():
        lines.append(f"| {k} | {value} |")
    lines += [
        "",
        "## Bilimsel sayı disiplini",
        "",
        "Bu sayılar kaynak dosya envanteridir. Ayrı makale ve özgün katkı sayısı, ",
        "tam metin, sürüm, araştırma sorusu, ilgili literatür, yöntem ve doğrulama ",
        "incelemesinden sonra belirlenebilir. Yek/Ehad yaratıcı ilkesi, bilimsel ",
        "kanıt iddiasıyla özdeşleştirilmez. Kaynak dosyalar asla değiştirilmez.",
        "",
        f"Kaynak imzası: {result['fingerprint']}",
        "",
    ]
    (output_dir / "SUMMARY.md").write_text("\n".join(lines), encoding="utf-8")
    (output_dir / "fingerprint.txt").write_text(result["fingerprint"] + "\n",
                                               encoding="ascii")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", default="hourly-inventory")
    parser.add_argument("--fixture", default="", help="Offline test fixture directory")
    args = parser.parse_args()
    if args.fixture:
        trees = {repo: json.loads((Path(args.fixture) / f"{repo}.json").read_text(encoding="utf-8"))
                 for repo in PUBLIC_REPOS}
    else:
        token = os.getenv("GH_TOKEN", "").strip()
        trees = {repo: fetch_tree(repo, token) for repo in PUBLIC_REPOS}
    report, rows = build_inventory(trees)
    write_outputs(Path(args.output_dir), report, rows)
    print(f"Files={report['total_files_scanned']}, "
          f"candidate_sources={report['candidate_source_files']}, "
          f"unique_exact_blobs={report['unique_exact_candidate_blobs']}")
    print("Independent manuscripts and publication-ready counts remain unverified.")
    output = os.getenv("GITHUB_OUTPUT")
    if output:
        with open(output, "a", encoding="utf-8") as stream:
            stream.write(f"fingerprint={report['fingerprint']}\n")
    step_summary = os.getenv("GITHUB_STEP_SUMMARY")
    if step_summary:
        with open(step_summary, "a", encoding="utf-8") as stream:
            stream.write((Path(args.output_dir) / "SUMMARY.md").read_text(encoding="utf-8"))


if __name__ == "__main__":
    main()
