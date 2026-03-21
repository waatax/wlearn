import json
import re

BOOKS_PATH = 'public/books.json'
AUTHORS_PATH = 'public/authors.json'

# 特定作者名稱修正映射
AUTHOR_NAME_CORRECTIONS = {
    "乙乙乙·乙威乙": "卡蘿·杜維克",
    "Carol S. Dweck": "卡蘿·杜維克",
    "大衛．哥金斯 (David Goggins)": "大衛·哥金斯",
    "Al Ries, Jack Trout": "艾爾·里斯、傑克·特勞特",
    "Abhijit V. Banerjee & Esther Duflo": "阿巴希·巴納吉、艾絲特·杜芙若",
    "摩根·豪瑟 (Morgan Housel)": "摩根·豪瑟",
}

# 偵測佔位符介紹
GENERIC_DESCRIPTIONS = [
    "這部作品深入探討人類思維的本質和運作方式",
    "這是一部關於個人發展和自我提升的著作",
    "探討如何在現代社會中實現個人成長和專業發展",
    "這本書探討如何設定和實現有意義的目標",
    "Written by a world-renowned author, this book shares deep insights",
    "This book is for anyone seeking personal development",
    "This作品深入探討人類思維的本質和運作方式"
]

def clean_description(desc):
    if not desc: return ""
    for g in GENERIC_DESCRIPTIONS:
        if g in desc:
            return "" # 清空佔位符以便之後填入真實內容
    return desc

def batch_update():
    with open(BOOKS_PATH, 'r', encoding='utf-8') as f:
        books = json.load(f)
    with open(AUTHORS_PATH, 'r', encoding='utf-8') as f:
        authors = json.load(f)

    # 1. 修正書籍中的作者名稱與數據結構
    for b in books:
        code = b.get('code', '')
        
        # 修正作者名稱
        if b.get('author') in AUTHOR_NAME_CORRECTIONS:
            b['author'] = AUTHOR_NAME_CORRECTIONS[b['author']]
        
        # 處理 S4 書籍 (通常 title_cn 裡放的是英文名)
        if code.startswith('S4'):
            if not b.get('title_en') and b.get('title_cn'):
                # 如果 title_cn 只有英文內容，則賦值給 title_en
                if not any('\u4e00' <= c <= '\u9fff' for c in b['title_cn']):
                    b['title_en'] = b['title_cn']
            
            # 確保 S4 的 english_url 至少與 youtube_url 相同
            if not b.get('english_url') or not str(b.get('english_url')).strip():
                if b.get('youtube_url'):
                    b['english_url'] = b['youtube_url']

        # 清理佔位符介紹
        b['description_cn'] = clean_description(b.get('description_cn', ''))
        b['description_en'] = clean_description(b.get('description_en', ''))
        b['description'] = clean_description(b.get('description', ''))

    # 2. 修正作者庫
    for a in authors:
        old_name = a.get('name_zh')
        if old_name in AUTHOR_NAME_CORRECTIONS:
            a['name_zh'] = AUTHOR_NAME_CORRECTIONS[old_name]
            a['name'] = AUTHOR_NAME_CORRECTIONS[old_name]
        
        # 修正空白 bio
        if not clean_description(a.get('bio', '')):
            a['bio'] = f"{a['name']} 是一位具有影響力的作者，專注於相關領域的深入研究與知識傳承。"
            a['has_detailed_bio'] = False

    # 3. 寫回文件
    with open(BOOKS_PATH, 'w', encoding='utf-8') as f:
        json.dump(books, f, ensure_ascii=False, indent=2)
    with open(AUTHORS_PATH, 'w', encoding='utf-8') as f:
        json.dump(authors, f, ensure_ascii=False, indent=2)

    print("批次更新完成。")
    print("- 修正了已知作者名稱錯誤。")
    print("- 正位了 S4 系列書籍標題與連結。")
    print("- 清除了系統佔位符內容。")

if __name__ == "__main__":
    batch_update()
