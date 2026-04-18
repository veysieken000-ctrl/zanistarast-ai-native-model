import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TEMPLATE = """<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
body {{
    background-color: #0a0a0a;
    color: #eaeaea;
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}}

.container {{
    max-width: 900px;
    margin: auto;
    padding: 60px 20px;
}}

h1, h2, h3 {{
    text-align: center;
}}

p {{
    line-height: 1.7;
    margin: 20px 0;
}}

ul {{
    margin: 20px 0;
}}

.section {{
    background: #111;
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 25px;
}}

.back {{
    display: block;
    margin-bottom: 30px;
    color: #888;
    text-decoration: none;
}}
</style>
</head>

<body>
<div class="container">

<a class="back" href="thesis-zanabun.html">← Back to Zanabun</a>

<h1>{title}</h1>

{content}

</div>
</body>
</html>
"""

def convert_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    title_match = re.search(r"<h1>(.*?)</h1>", content)
    title = title_match.group(1) if title_match else os.path.basename(filepath)

    body_match = re.search(r"<body.*?>(.*)</body>", content, re.S)
    body = body_match.group(1) if body_match else content

    new_html = TEMPLATE.format(title=title, content=body)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_html)


def main():
    for file in os.listdir(ROOT_DIR):
        if file.endswith(".html") and file[0].isdigit():
            path = os.path.join(ROOT_DIR, file)
            print("Fixing:", file)
            convert_file(path)


if __name__ == "__main__":
    main()




