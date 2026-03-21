import json

def debug_s4(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    s4_books = [b for b in books if b.get('code', '').startswith('S4')]
    
    with open('s4_books_debug.txt', 'w', encoding='utf-8') as out:
        for b in s4_books:
            code = b.get('code')
            title_cn = b.get('title_cn')
            title_en = b.get('title_en')
            y_url = b.get('youtube_url')
            out.write(f"{code} | {title_cn} | {title_en} | {y_url}\n")

if __name__ == "__main__":
    debug_s4(r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\public\books.json')
