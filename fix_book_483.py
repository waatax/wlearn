import json
import os

files_to_update = ['public/books.json', 'public/youtube_stats.json', 'public/youtube_books_complete.json']
correct_title = "燃：最新研究，揭開身體究竟如何燃燒卡路里、減肥、保持健康！"

for fname in files_to_update:
    if os.path.exists(fname):
        with open(fname, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        updated = False
        for item in data:
            if item.get('id') == 'book_483':
                item['title_cn'] = correct_title
                updated = True
        
        if updated:
            with open(fname, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Updated {fname}")
