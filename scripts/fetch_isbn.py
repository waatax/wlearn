import json
import requests
import time
import os
import re

BOOKS_JSON = 'public/books.json'
OUTPUT_JSON = 'public/isbn_results.json'

def fetch_openlibrary(title, author=None):
    if not title: return None
    url = "https://openlibrary.org/search.json"
    params = {
        'q': f'"{title}"', # Use quotes for exact match
        'limit': 5,
        'fields': 'isbn,language,title,author_name'
    }
    if author and author != 'Unknown':
        # Don't restrict to author in the main query if title is specific
        pass
    
    try:
        response = requests.get(url, params=params, timeout=10)
        if response.status_code == 200:
            return response.json()
    except: pass
    return None

# Global flag to avoid hitting Google too much
GOOGLE_SUSPEND_UNTIL = 0

def fetch_google_books(query):
    global GOOGLE_SUSPEND_UNTIL
    if time.time() < GOOGLE_SUSPEND_UNTIL:
        return None
        
    url = "https://www.googleapis.com/books/v1/volumes"
    params = {'q': query, 'maxResults': 3}
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, params=params, headers=headers, timeout=10)
        if response.status_code == 200: return response.json()
        if response.status_code == 429:
            print("  [Google Rate Limit] Suspending Google for 5 mins.")
            GOOGLE_SUSPEND_UNTIL = time.time() + 300
            return None
    except: pass
    return None

def is_western_name(name):
    if not name: return False
    latin_chars = len(re.findall(r'[a-zA-Z]', name))
    total_chars = len(name)
    return latin_chars > total_chars * 0.5

def main():
    if not os.path.exists(BOOKS_JSON): return

    with open(BOOKS_JSON, 'r', encoding='utf-8') as f:
        books = json.load(f)

    results = {}
    if os.path.exists(OUTPUT_JSON):
        with open(OUTPUT_JSON, 'r', encoding='utf-8') as f:
            try: results = json.load(f)
            except: pass

    print(f"Starting optimized ISBN fetch for {len(books)} books...")
    
    processed_count = 0
    for book in books:
        book_id = book['id']
        
        # Already done?
        if book_id in results and results[book_id].get('status') == 'success':
            if results[book_id].get('isbn_zh') or results[book_id].get('isbn_en'):
                # Check for original language consistency
                if not results[book_id].get('original_language'):
                    results[book_id]['original_language'] = 'en'
                continue

        title_cn = book.get('title_cn')
        title_en = book.get('title_en')
        author = book.get('author')
        
        print(f"[{processed_count}/{len(books)}] {book_id}: {title_cn or title_en}")
        
        info = {
            'id': book_id,
            'isbn_en': None,
            'isbn_zh': None,
            'original_language': 'en',
            'status': 'pending'
        }

        # 1. Try OpenLibrary with English Title (Best hit rate)
        if title_en:
            data = fetch_openlibrary(title_en, author)
            if data and data.get('docs'):
                for doc in data['docs']:
                    isbns = [i.replace('-','').replace(' ','') for i in doc.get('isbn', [])]
                    isbn13 = next((i for i in isbns if len(i) == 13), isbns[0] if isbns else None)
                    if isbn13:
                        if not info['isbn_en']: info['isbn_en'] = isbn13
                        break

        # 2. Try OpenLibrary with Chinese Title
        if not info['isbn_en'] and not info['isbn_zh'] and title_cn:
            data = fetch_openlibrary(title_cn, author)
            if data and data.get('docs'):
                for doc in data['docs']:
                    isbns = [i.replace('-','').replace(' ','') for i in doc.get('isbn', [])]
                    isbn13 = next((i for i in isbns if len(i) == 13), isbns[0] if isbns else None)
                    if isbn13:
                        # Heuristic: if it's found via Chinese title, it might be the Chinese edition
                        info['isbn_zh'] = isbn13
                        break

        # 3. Last Resort: Google Books (if missing and not suspended)
        if not info['isbn_en'] and not info['isbn_zh']:
            g_query = f"{title_cn or ''} {title_en or ''} {author or ''}".strip()
            g_data = fetch_google_books(g_query)
            if g_data and 'items' in g_data:
                for item in g_data['items']:
                    v = item['volumeInfo']
                    isbns = v.get('industryIdentifiers', [])
                    i13 = next((i['identifier'] for i in isbns if i['type'] == 'ISBN_13'), None)
                    if not i13: continue
                    
                    lang = v.get('language', '')
                    if lang.startswith('zh'): info['isbn_zh'] = i13
                    elif lang.startswith('en'): info['isbn_en'] = i13
                    if info['isbn_zh'] or info['isbn_en']: break

        # Deduce original language
        if not is_western_name(author):
            info['original_language'] = 'zh'
        else:
            info['original_language'] = 'en'
            
        # Refine original language if only Chinese found and author matches
        if not info['isbn_en'] and info['isbn_zh'] and not is_western_name(author):
            info['original_language'] = 'zh'

        # If it's a Chinese book, and we have one ISBN, ensure it's in isbn_zh
        if info['original_language'] == 'zh' and info['isbn_en'] and not info['isbn_zh']:
            info['isbn_zh'] = info['isbn_en']
            info['isbn_en'] = None

        info['status'] = 'success'
        results[book_id] = info
        processed_count += 1
        
        # Save every 10 books to be faster
        if processed_count % 10 == 0:
            with open(OUTPUT_JSON, 'w', encoding='utf-8') as fw:
                json.dump(results, fw, ensure_ascii=False, indent=2)
            time.sleep(0.5)

    # Final save
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as fw:
        json.dump(results, fw, ensure_ascii=False, indent=2)
    print("FINISHED ALL.")

if __name__ == "__main__":
    main()
