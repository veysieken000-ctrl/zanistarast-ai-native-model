import os
import re

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def clean_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Tüm Back linklerini bul
    pattern = r'<a[^>]*>.*?Back to Zanabun.*?</a>'
    matches = re.findall(pattern, content, flags=re.IGNORECASE)

    if not matches:
        return False

    # İlkini bırak, diğerlerini sil
    first = matches[0]
    content = re.sub(pattern, '', content, flags=re.IGNORECASE)

    # İlkini en üste ekle
    content = first + "\n\n" + content

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    return True


def run():
    for filename in os.listdir(ROOT_DIR):
        if filename.endswith(".html"):
            path = os.path.join(ROOT_DIR, filename)
            if clean_file(path):
                print(f"Cleaned: {filename}")

    print("All duplicate back links cleaned.")


if __name__ == "__main__":
    run()
