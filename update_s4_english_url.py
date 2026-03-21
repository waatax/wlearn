import json

def update_s4_english_urls(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    updated_count = 0
    for book in books:
        code = book.get('code', '')
        if code.startswith('S4'):
            youtube_url = book.get('youtube_url')
            english_url = book.get('english_url')
            
            # If english_url is missing or empty but youtube_url exists,
            # set english_url = youtube_url (since S4 youtube_urls ARE the English versions)
            if youtube_url and (not english_url or not str(english_url).strip()):
                book['english_url'] = youtube_url
                updated_count += 1
                print(f"Updated {code}: english_url = {youtube_url}")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)
    
    print(f"\nTotal S4 books updated with english_url: {updated_count}")

if __name__ == "__main__":
    update_s4_english_urls(r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn\public\books.json')
