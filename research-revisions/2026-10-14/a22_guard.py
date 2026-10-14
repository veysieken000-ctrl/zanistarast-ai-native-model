"""A22 preliminary research-report structural audit. Not a semantic or theological verifier."""
import re
import unicodedata
REQUIRED = ['Kaynak:', 'Sınıf:', 'Hipotez:', 'Matematik:', 'Karşı örnek:', 'Baseline:', 'Test:', 'Etik:', 'Sınırlar:', 'Cuma işleri:']
FORBIDDEN = ['Science Core v1 açıldı', 'main değiştirildi', 'canlı site değiştirildi', 'kanıtlanmadan ispatlandı']
def norm(s):
    return unicodedata.normalize('NFC', s.casefold().replace('ı','i').replace('i\u0307','i'))
def audit(text):
    missing = [k for k in REQUIRED if not re.search(r'(?m)^'+re.escape(k)+r'[^\S\n]*\S',text)]
    violations = [k for k in FORBIDDEN if norm(k) in norm(text)]
    return {'pass':not missing and not violations,'missing':missing,'violations':violations}
