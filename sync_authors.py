import json
import os
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text).strip('-')
    return text

def update_authors_json():
    books_path = 'public/books.json'
    authors_path = 'public/authors.json'
    
    with open(books_path, 'r', encoding='utf-8-sig') as f:
        books = json.load(f)
        
    existing_authors = []
    if os.path.exists(authors_path):
        with open(authors_path, 'r', encoding='utf-8-sig') as f:
            existing_authors = json.load(f)
            
    author_map = {a['id']: a for a in existing_authors}
    name_to_id = {a['name']: a['id'] for a in existing_authors}
    
    # Aggregate all authors from books
    book_authors = {} # name -> list of books
    for b in books:
        author_name = b.get('author')
        if not author_name:
            continue
        
        # Split multiple authors if needed (commas)
        names = [n.strip() for n in re.split(r'[,&]', author_name)]
        for name in names:
            if name not in book_authors:
                book_authors[name] = []
            book_authors[name].append({
                "id": b['id'],
                "title_cn": b.get('title_cn'),
                "title_en": b.get('title_en'),
                "code": b.get('code'),
                "video_id": b.get('video_id'),
                "tags": b.get('tags', [])
            })
            
    updated_authors = []
    
    for name, books_list in book_authors.items():
        author_id = name_to_id.get(name) or slugify(name)
        
        if author_id in author_map:
            author = author_map[author_id]
            author['book_count'] = len(books_list)
            author['books'] = books_list
            # Keep existing bio, career, achievements
        else:
            # New author
            author = {
                "id": author_id,
                "name": name,
                "name_en": name,
                "name_zh": name,
                "bio": f"{name} 是多本暢銷書的作者，專注於其專業領域的研究與分享。",
                "career": "暢銷書作家 / 專業講師",
                "achievements": [],
                "book_count": len(books_list),
                "books": books_list,
                "has_detailed_bio": False,
                "avatar_initial": name[0].upper()
            }
        updated_authors.append(author)
        
    # Sort by name (Chinese character sorting or alpha)
    updated_authors.sort(key=lambda x: x['name'])
    
    with open(authors_path, 'w', encoding='utf-8') as f:
        json.dump(updated_authors, f, ensure_ascii=False, indent=2)
    
    print(f"Update completed. Total authors: {len(updated_authors)}")

if __name__ == "__main__":
    update_authors_json()
