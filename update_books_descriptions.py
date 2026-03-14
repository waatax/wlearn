import json, os, re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[\s_]+', '-', text).strip('-')

def update_books():
    books_path = os.path.join('public', 'books.json')
    authors_path = os.path.join('public', 'authors.json')
    with open(books_path, 'r', encoding='utf-8-sig') as f:
        books = json.load(f)
    # Load authors for verification
    with open(authors_path, 'r', encoding='utf-8-sig') as f:
        authors = json.load(f)
    author_names = {a['name'] for a in authors}
    updated = 0
    for b in books:
        # Ensure author exists
        author = b.get('author')
        if author and author not in author_names:
            # try matching by other fields
            matches = [a['name'] for a in authors if a['id'] == author]
            if matches:
                b['author'] = matches[0]
        # Ensure description exists
        if not b.get('description'):
            title = b.get('title_cn') or b.get('title_en') or '此書'
            author_name = b.get('author') or '作者'
            code = b.get('code') or ''
            desc = f"{title} 是由 {author_name} 撰寫的書籍" + (f"（代碼 {code}）" if code else "") + "，內容涵蓋相關領域的深入探討。"
            b['description'] = desc
            updated += 1
    with open(books_path, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)
    print(f"更新完成，新增描述的書籍數量: {updated}")

if __name__ == '__main__':
    update_books()
