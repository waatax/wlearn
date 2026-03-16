import json
import requests
import time
import os

BOOKS_JSON = 'public/books.json'
OUTPUT_JSON = 'public/isbn_results.json'

def fetch_openlibrary(title, author=None):
    url = "https://openlibrary.org/search.json"
    params = {
        'title': title,
        'limit': 3,
        'fields': 'isbn,language,title,author_name'
    }
    if author:
        params['author'] = author
    
    try:
        response = requests.get(url, params=params, timeout=15)
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"Error fetching OL {title}: {e}")
    return None

def main():
    if not os.path.exists(BOOKS_JSON): return

    with open(BOOKS_JSON, 'r', encoding='utf-8') as f:
        books = json.load(f)

    results = {}
    if os.path.exists(OUTPUT_JSON):
        with open(OUTPUT_JSON, 'r', encoding='utf-8') as f:
            try: results = json.load(f)
            except: results = {}

    processed_count = 0

    for book in books:
        book_id = book['id']
        
        # Check if already has result (even if partial)
        if book_id in results and results[book_id].get('status') == 'success':
            if results[book_id].get('isbn_en') or results[book_id].get('isbn_zh'):
                continue
            
        title_cn = book.get('title_cn')
        title_en = book.get('title_en')
        author = book.get('author')
        
        print(f"[{processed_count}] Querying {book_id}: {title_cn or title_en}")
        
        info = results.get(book_id, {
            'id': book_id,
            'title_en_orig': title_en,
            'title_cn_orig': title_cn,
            'author_orig': author,
            'isbn_en': None,
            'isbn_zh': None,
            'original_language': 'en',
            'status': 'pending'
        })

        # Try OpenLibrary first (less rate limited)
        if not info['isbn_en'] or not info['isbn_zh']:
            q = title_en or title_cn
            data = fetch_openlibrary(q, author)
            if data and data.get('docs'):
                for doc in data['docs']:
                    isbns = doc.get('isbn', [])
                    for i in isbns:
                        clean = i.replace('-', '').replace(' ', '')
                        if len(clean) == 13:
                            if not info['isbn_en']: info['isbn_en'] = clean
                            elif not info['isbn_zh'] and any(l in doc.get('language', []) for l in ['chi', 'zho']):
                                info['isbn_zh'] = clean
                
                if data['docs'][0].get('language'):
                    info['original_language'] = data['docs'][0]['language'][0]

        # Use Google as fallback if still missing and not recently rate limited
        if not info['isbn_en'] or not info['isbn_zh']:
            # We'll skip Google for now if we want speed, or just do one query
            pass

        info['status'] = 'success'
        results[book_id] = info
        processed_count += 1
        
        if processed_count % 5 == 0:
            with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
            
        time.sleep(2) # Polite delay
    
    # Final save
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Finished processing {processed_count} books.")

if __name__ == "__main__":
    main()
