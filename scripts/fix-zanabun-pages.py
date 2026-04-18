from pathlib import Path
import re

ROOT = Path(".")
FILES = sorted(ROOT.glob("[0-2][0-9]_*.html"))

if not FILES:
    print("No matching Zanabun HTML files found in repo root.")
    raise SystemExit(1)

STYLE_BLOCK = """
  <link rel="stylesheet" href="style.css" />
  <style>
    body {
      background: radial-gradient(circle at top, #0b0f1a, #02040a);
      color: #e6edf3;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 0;
    }

    .page {
      max-width: 920px;
      margin: 56px auto;
      padding: 24px;
    }

    .back-link {
      display: inline-block;
      margin-bottom: 24px;
      color: #8ab4ff;
      text-decoration: none;
      font-weight: 600;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    .hero {
      margin-bottom: 28px;
    }

    .hero h1 {
      font-size: 44px;
      line-height: 1.1;
      margin: 0 0 12px;
      color: #ffffff;
    }

    .hero p {
      margin: 0;
      color: #b6c2cf;
      font-size: 18px;
      line-height: 1.7;
    }

    .card {
      background: rgba(20, 30, 50, 0.64);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 18px;
      padding: 24px;
      margin-bottom: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(8px);
    }

    .card h2 {
      margin: 0 0 14px;
      color: #ffffff;
      font-size: 30px;
      line-height: 1.2;
    }

    .card p,
    .card li {
      color: #e6edf3;
      font-size: 18px;
      line-height: 1.8;
    }

    .card ul,
    .card ol {
      margin: 12px 0 0 24px;
      padding: 0;
    }

    .formula {
      margin-top: 14px;
      padding: 14px 16px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      color: #dce8ff;
      font-weight: 700;
      white-space: pre-line;
    }
  </style>
""".strip()

LEADS = {
    "00_BILGI_TANIKLIK_VE_HAKIKAT.html": "Bilgi, tanıklık ve hakikat arasındaki temel epistemolojik bağ.",
    "01_BILGININ_TANIMI_VE_SINIFLANDIRILMASI.html": "Bilginin ana türleri, yapısı ve sınıflandırma mantığı.",
    "02_BILGININ_KATMANLARI.html": "Bilginin yüzeyden tanıklığa uzanan katmanlı yapısı.",
    "03_AHLAK_VE_HUKUM_YASASI.html": "Bilgiden ahlaka ve ahlaktan hükme giden dönüşüm yasası.",
    "04_TANIKLIK_YASASI.html": "Bilginin yük haline gelişi ve hakikatin taşıyıcısı olarak tanıklık.",
    "05_BILGININ_KATMAN_MODELI.html": "Bilginin oluşum, işlenme ve hükme dönüşme modeli.",
    "06_EPISTEMIK_COKUS.html": "Bilginin hakikatten kopuşuyla başlayan epistemolojik kriz modeli.",
    "07_BILGI_GUC_AYRIMI.html": "Bilginin hakikat üretimi ile gücün etki üretimi arasındaki ayrım.",
    "08_SEVGI_VE_FITRAT_TEMELLI_BILGI_TURLERI.html": "Akıl dışı değil, aklı tamamlayan fıtrat ve sevgi temelli bilgi biçimleri.",
    "09_BILGININ_EVRENSEL_DONGUSU.html": "Bilginin oluşup ahlak ve hüküm üzerinden yeniden bilgiye dönmesi.",
    "10_BILGI_ZAMAN_ILISKISI.html": "Bilginin zaman içinde olgunlaşması, taşınması ve tarihe dönüşmesi.",
    "11_BILGININ_MATEMATIKSEL_SOYUTLANMASI.html": "Bilginin örüntü ve formül düzeyinde soyutlanabilir yapısı.",
    "12_TANIKLIGIN_TARIH_URETMESI.html": "Tanıklığın zaman içinde yoğunlaşıp tarihe dönüşme mekanizması.",
    "13_META_SCIENCE_FRAMEWORK.html": "Bilimi inceleyen, sınırlandıran ve hakikate bağlayan üst çerçeve.",
    "14_NIHAI_DONGU_MODELI.html": "Bilgi, tanıklık, ahlak ve hükmün birleştiği nihai epistemik döngü.",
    "15_EPISTEMOLOJIK_AKSIYOMLAR.html": "Zanabûn sisteminin üzerine kurulduğu temel kurucu kabuller.",
    "16_BILGI_TURLERININ_NIHAI_KATMAN_MODELI.html": "Tüm bilgi türlerini tek hiyerarşik modelde birleştiren son yapı.",
    "17_BILGININ_DOGRULAMA_VE_TEST_MEKANIZMASI.html": "Bilginin sınanması, doğrulanması ve sahihliğinin kontrolü.",
    "18_BILGININ_MATEMATIKSEL_DONGU_MODELI.html": "Bilgi döngüsünün formel ve fonksiyonel matematiksel temsili.",
    "19_BILGININ_TOPLUMSAL_GECISI.html": "Bilginin bireyden topluma, kültüre ve medeniyete akışı.",
    "20_NIHAI_EPISTEMOLOJIK_SONUC.html": "Zanabûn epistemolojisinin bütün halkalarını birleştiren nihai sonuç.",
}

def extract_title(html: str, fallback_name: str) -> str:
    h1 = re.search(r"<h1>(.*?)</h1>", html, flags=re.S | re.I)
    if h1:
        return re.sub(r"\s+", " ", h1.group(1)).strip()
    title = re.search(r"<title>(.*?)</title>", html, flags=re.S | re.I)
    if title:
        raw = re.sub(r"\s+", " ", title.group(1)).strip()
        raw = raw.replace("Zanabûn – ", "").replace("Zanabun – ", "")
        return raw
    return fallback_name.replace(".html", "")

def cleanup_content(html: str) -> str:
    body_match = re.search(r"<body[^>]*>(.*?)</body>", html, flags=re.S | re.I)
    body = body_match.group(1) if body_match else html

    body = re.sub(r'<a[^>]*class="back-link"[^>]*>.*?</a>', '', body, flags=re.S | re.I)
    body = re.sub(r'<a[^>]*href="[^"]*theses\.html"[^>]*>.*?</a>', '', body, flags=re.S | re.I)
    body = re.sub(r'<main[^>]*class="container"[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'</main>', '', body, flags=re.S | re.I)
    body = re.sub(r'<div[^>]*class="container"[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'</div>\s*$', '', body.strip(), flags=re.S | re.I)

    body = body.strip()
    return body

def transform_sections(body: str) -> str:
    parts = re.split(r'(<h2>.*?</h2>)', body, flags=re.S | re.I)
    if len(parts) == 1:
        return f'<div class="card">\n{body}\n</div>'

    intro = parts[0].strip()
    rendered = []

    if intro:
        rendered.append(f'<div class="card">\n{intro}\n</div>')

    for i in range(1, len(parts), 2):
        heading = parts[i].strip()
        content = parts[i + 1].strip() if i + 1 < len(parts) else ""
        rendered.append(f'<div class="card">\n{heading}\n{content}\n</div>')

    return "\n\n".join(rendered)

def rebuild_html(file_path: Path):
    original = file_path.read_text(encoding="utf-8")
    page_title = extract_title(original, file_path.name)
    lead = LEADS.get(file_path.name, "Zanabûn epistemolojisinin ilgili alt başlığı.")

    body = cleanup_content(original)
    body = re.sub(r'<link[^>]*stylesheet[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S | re.I)
    body = re.sub(r'<h1>.*?</h1>', '', body, count=1, flags=re.S | re.I).strip()

    content = transform_sections(body)

    new_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zanabûn – {page_title}</title>
{STYLE_BLOCK}
</head>
<body>
  <div class="page">
    <a href="theses.html" class="back-link">← Back to Thesis</a>

    <div class="hero">
      <h1>{page_title}</h1>
      <p>{lead}</p>
    </div>

    {content}
  </div>
</body>
</html>
"""
    file_path.write_text(new_html, encoding="utf-8")
    print(f"Updated: {file_path.name}")

for file in FILES:
    rebuild_html(file)

print("All Zanabun pages updated.")

