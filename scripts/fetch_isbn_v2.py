import json
import requests
import time
import os
import re

BOOKS_JSON = 'public/books.json'
OUTPUT_JSON = 'public/isbn_results_v2.json'

def fetch_google_books(query):
    url = "https://www.googleapis.com/books/v1/volumes"
    params = {'q': query, 'maxResults': 3}
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        if response.status_code == 200: return response.json()
        if response.status_code == 429:
            print("  [Google Rate Limit] Sleeping 60s...")
            time.sleep(60)
            return None
    except: pass
    return None

def main():
    if not os.path.exists(BOOKS_JSON): return

    with open(BOOKS_JSON, 'r', encoding='utf-8') as f:
        books = json.load(f)

    results = {}
    if os.path.exists(OUTPUT_JSON):
        with open(OUTPUT_JSON, 'r', encoding='utf-8') as f:
            try: results = json.load(f)
            except: pass

    # Only process books that literally have NO ISBN in books.json or results
    missing_books = []
    for b in books:
        bid = b['id']
        if not b.get('isbn_en') and not b.get('isbn_zh'):
            if bid not in results or results[bid].get('status') != 'success':
                missing_books.append(b)

    print(f"Targeting {len(missing_books)} books missing ISBN.")

    for i, book in enumerate(missing_books):
        book_id = book['id']
        
        title_cn = book.get('title_cn', '')
        title_en = book.get('title_en', '')
        author = book.get('author', '')
        
        print(f"[{i}/{len(missing_books)}] {book_id}: {title_cn or title_en}")

        info = {'id': book_id, 'isbn_en': None, 'isbn_zh': None, 'original_language': 'en', 'status': 'failed'}

        # Try a combined query
        q = f'"{title_cn or title_en}" {author}'.strip()
        data = fetch_google_books(q)
        
        if data and 'items' in data:
            # Check first 3 items
            for item in data['items']:
                v = item['volumeInfo']
                isbns = v.get('industryIdentifiers', [])
                i13 = next((ii['identifier'] for ii in isbns if ii['type'] == 'ISBN_13'), None)
                if not i13: i13 = next((ii['identifier'] for ii in isbns if ii['type'] == 'ISBN_10'), None)
                
                if i13:
                    lang = v.get('language', '')
                    if lang.startswith('zh'): info['isbn_zh'] = i13
                    else: info['isbn_en'] = i13
                    
                    # Store original language if it's a strong match
                    # (Heuristic: if we found a zh title with a zh isbn first, it's likely original zh)
                    if lang.startswith('zh') and title_cn:
                        info['original_language'] = 'zh'
                    
                    info['status'] = 'success'
                    break
        
        results[book_id] = info
        
        if i % 5 == 0:
            with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
        
        time.sleep(12) # Strict delay to stay under limit

    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("DONE.")

if __name__ == "__main__":
    main()
