import json
import csv

def generate_audit_report(books_file, authors_file, output_file):
    with open(books_file, 'r', encoding='utf-8') as f:
        books = json.load(f)
    with open(authors_file, 'r', encoding='utf-8') as f:
        authors = json.load(f)
    
    author_map = {a['name']: a for a in authors}
    # Also map by name_en or other names if possible
    for a in authors:
        if 'name_en' in a and a['name_en']:
            author_map[a['name_en']] = a
        if 'name_zh' in a and a['name_zh']:
            author_map[a['name_zh']] = a

    report = []
    
    for book in books:
        code = book.get('code', 'N/A')
        title_cn = book.get('title_cn', '')
        title_en = book.get('title_en', '')
        isbn_zh = book.get('isbn_zh', '')
        isbn_en = book.get('isbn_en', '')
        yt_url = book.get('youtube_url', '')
        en_url = book.get('english_url', '')
        author_name = book.get('author', '')
        
        status = []
        if not title_cn: status.append("Missing Title CN")
        if not title_en: status.append("Missing Title EN")
        if not isbn_zh: status.append("Missing ISBN ZH")
        if not isbn_en: status.append("Missing ISBN EN")
        if not yt_url: status.append("Missing YouTube URL")
        
        # S4 specific check
        if code.startswith('S4'):
            if not en_url: status.append("Missing English URL (S4)")
            # S4 books often have English titles in title_cn
            if title_cn and any(c.isascii() for c in title_cn) and not any('\u4e00' <= c <= '\u9fff' for c in title_cn):
                 status.append("S4 Title CN is probably English")

        # Author check
        found_author = author_map.get(author_name)
        if not found_author:
            status.append(f"Author '{author_name}' not in authors.json")
        else:
            if not found_author.get('bio'):
                status.append("Author Bio Missing")
            if not found_author.get('has_detailed_bio'):
                status.append("Author Detailed Bio Missing")

        report.append({
            "Code": code,
            "Title CN": title_cn,
            "Title EN": title_en,
            "Issues": " | ".join(status) if status else "OK"
        })

    with open(output_file, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=["Code", "Title CN", "Title EN", "Issues"])
        writer.writeheader()
        writer.writerows(report)
    
    print(f"Audit report generated: {output_file}")

if __name__ == "__main__":
    generate_audit_report(
        r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\public\books.json',
        r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\public\authors.json',
        r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\data_audit.csv'
    )
