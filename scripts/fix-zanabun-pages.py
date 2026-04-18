from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
FILES = sorted(ROOT.glob("[0-2][0-9]_*.html"))

if not FILES:
    print("No matching Zanabun HTML files found in repo root.")
    raise SystemExit(1)

STYLE_BLOCK = """
  <style>
    :root{
      --bg:#05070d;
      --bg-soft:#0c1220;
      --card:#0f1728cc;
      --text:#e6edf3;
      --muted:#aab7c7;
      --line:rgba(255,255,255,.08);
      --accent:#8ab4ff;
      --shadow:0 14px 38px rgba(0,0,0,.28);
    }
    *{box-sizing:border-box}
    html,body{margin:0;padding:0}
    body{
      background: radial-gradient(circle at top, #11182a 0%, #070b13 42%, #03050a 100%);
      color:var(--text);
      font-family:Inter,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;
      line-height:1.75;
    }
    .page{
      max-width:1100px;
      margin:0 auto;
      padding:32px 20px 80px;
    }
    .back-link{
      display:inline-block;
      margin-bottom:22px;
      color:var(--accent);
      text-decoration:none;
      font-weight:700;
    }
    .back-link:hover{text-decoration:underline}
    .hero{
      background:linear-gradient(180deg, rgba(20,30,52,.82), rgba(10,14,25,.92));
      border:1px solid var(--line);
      border-radius:24px;
      box-shadow:var(--shadow);
      padding:34px 28px;
      margin-bottom:26px;
    }
    .hero h1{
      margin:0 0 10px;
      font-size:clamp(34px,5vw,58px);
      line-height:1.06;
      letter-spacing:-.02em;
      color:#fff;
      text-align:center;
    }
    .hero p{
      margin:0;
      font-size:clamp(17px,2vw,22px);
      color:var(--muted);
      text-align:center;
    }
    .page-grid{
      display:grid;
      gap:18px;
    }
    .card{
      background:linear-gradient(180deg, rgba(19,32,58,.84), rgba(12,20,35,.9));
      border:1px solid var(--line);
      border-radius:22px;
      box-shadow:var(--shadow);
      padding:24px 22px;
    }
    .card h2{
      margin:0 0 12px;
      font-size:clamp(24px,3vw,34px);
      line-height:1.18;
      text-align:center;
      color:#fff;
    }
    .card p{
      margin:0 0 14px;
      font-size:18px;
      color:var(--text);
    }
    .card ul,.card ol{
      margin:0 0 14px 22px;
      padding:0;
    }
    .card li{
      margin:8px 0;
      font-size:18px;
      color:var(--text);
    }
    .formula{
      margin-top:10px;
      padding:14px 16px;
      border-radius:14px;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.06);
      font-weight:800;
      color:#d6e5ff;
      white-space:pre-line;
    }
    @media (max-width:640px){
      .page{padding:24px 14px 56px}
      .hero,.card{border-radius:18px}
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

def cleanup_body(html: str) -> str:
    body_match = re.search(r"<body[^>]*>(.*?)</body>", html, flags=re.S | re.I)
    body = body_match.group(1) if body_match else html

    body = re.sub(r'<a[^>]*class="back-link"[^>]*>.*?</a>', '', body, flags=re.S | re.I)
    body = re.sub(r'<a[^>]*href="[^"]*thesis-zanabun\.html"[^>]*>.*?</a>', '', body, flags=re.S | re.I)
    body = re.sub(r'<a[^>]*href="[^"]*theses\.html"[^>]*>.*?</a>', '', body, flags=re.S | re.I)

    body = re.sub(r'<main[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'</main>', '', body, flags=re.S | re.I)
    body = re.sub(r'<div[^>]*class="page"[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'<div[^>]*class="container"[^>]*>', '', body, flags=re.S | re.I)
    body = re.sub(r'</div>\s*$', '', body.strip(), flags=re.S)

    body = re.sub(r'<style.*?</style>', '', body, flags=re.S | re.I)
    body = re.sub(r'<link[^>]*stylesheet[^>]*>', '', body, flags=re.S | re.I)

    body = re.sub(r'<div[^>]*class="hero"[^>]*>.*?</div>', '', body, flags=re.S | re.I)

    body = re.sub(r'<h1>.*?</h1>', '', body, count=1, flags=re.S | re.I)

    return body.strip()

def transform_sections(body: str) -> str:
    parts = re.split(r'(<h2>.*?</h2>)', body, flags=re.S | re.I)
    if len(parts) == 1:
        content = parts[0].strip()
        return f"<section class='card'>\n{content}\n</section>" if content else ""

    rendered = []
    intro = parts[0].strip()
    if intro:
      rendered.append(f"<section class='card'>\n{intro}\n</section>")

    for i in range(1, len(parts), 2):
        heading = parts[i].strip()
        content = parts[i + 1].strip() if i + 1 < len(parts) else ""
        rendered.append(f"<section class='card'>\n{heading}\n{content}\n</section>")

    return "\n\n".join(rendered)

def rebuild_html(file_path: Path):
    original = file_path.read_text(encoding="utf-8")
    title = extract_title(original, file_path.name)
    lead = LEADS.get(file_path.name, "Zanabûn epistemolojisinin ilgili alt başlığı.")

    body = cleanup_body(original)
    content = transform_sections(body)

    new_html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Zanabûn – {title}</title>
{STYLE_BLOCK}
</head>
<body>
  <main class="page">
    <a href="thesis-zanabun.html" class="back-link">← Back to Zanabun</a>

    <section class="hero">
      <h1>{title}</h1>
      <p>{lead}</p>
    </section>

    <div class="page-grid">
      {content}
    </div>
  </main>
</body>
</html>
"""
    file_path.write_text(new_html, encoding="utf-8")
    print(f"Cleaned: {file_path.name}")

for file in FILES:
    rebuild_html(file)

print("All duplicate back links cleaned.")
