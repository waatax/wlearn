import json, os, re

def generate_description(book):
    title = book.get('title_cn') or book.get('title_en') or '此書'
    author = book.get('author') or '作者'
    code = book.get('code') or ''
    desc = f"{title} 是由 {author} 撰寫的書籍（代碼 {code}），內容涵蓋相關領域的深入探討。"
    return desc

def update_all_descriptions():
    books_path = os.path.join('public', 'books.json')
    with open(books_path, 'r', encoding='utf-8-sig') as f:
        books = json.load(f)
    updated = 0
    for b in books:
        new_desc = generate_description(b)
        if b.get('description') != new_desc:
            b['description'] = new_desc
            updated += 1
    with open(books_path, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)
    print(f"已更新 {updated} 本書的簡介。")

if __name__ == '__main__':
    update_all_descriptions()
