import json

def list_s4_books(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    s4_books = [b for b in books if b.get('code', '').startswith('S4')]
    
    print(f"Total S4 books found: {len(s4_books)}")
    for b in s4_books:
        code = b.get('code')
        title_cn = b.get('title_cn')
        v_title = b.get('video_title')
        y_url = b.get('youtube_url')
        e_url = b.get('english_url')
        print(f"{code} | {title_cn} | VTitle: {v_title} | Y: {y_url} | E: {e_url}")

if __name__ == "__main__":
    list_s4_books(r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\public\books.json')
