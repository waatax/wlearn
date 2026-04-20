import json
import re

with open('public/books.json', 'r', encoding='utf-8') as f:
    books = json.load(f)

for b in books:
    is_vw = (b.get('code', '').startswith('VW') or b.get('playlist') == '2025 Winter VW')
    if is_vw:
        title_cn = b.get('title_cn', '')
        if title_cn.startswith('C '):
            b['title_cn'] = title_cn[2:]
            print(f"Fixed {b['id']} from '{title_cn}' to '{b['title_cn']}'")
        elif title_cn.startswith('C'):
            b['title_cn'] = title_cn[1:].lstrip()
            print(f"Fixed {b['id']} from '{title_cn}' to '{b['title_cn']}'")

with open('public/books.json', 'w', encoding='utf-8') as f:
    json.dump(books, f, ensure_ascii=False, indent=2)

print("Done updating VW titles.")
