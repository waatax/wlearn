import json
import os

def check_isbns(file_path, output_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        books = json.load(f)
    
    missing_both = []
    missing_zh = []
    missing_en = []
    
    for book in books:
        isbn_zh = book.get('isbn_zh')
        isbn_en = book.get('isbn_en')
        title_cn = book.get('title_cn', 'N/A')
        title_en = book.get('title_en', 'N/A')
        code = book.get('code', 'N/A')
        
        has_zh = bool(isbn_zh and str(isbn_zh).strip())
        has_en = bool(isbn_en and str(isbn_en).strip())
        
        if not has_zh and not has_en:
            missing_both.append(f"| {code} | {title_cn} | {title_en} |")
        elif not has_zh:
            missing_zh.append(f"| {code} | {title_cn} | {title_en} | Has EN: {isbn_en} |")
        elif not has_en:
            missing_en.append(f"| {code} | {title_cn} | {title_en} | Has ZH: {isbn_zh} |")
            
    with open(output_path, 'w', encoding='utf-8') as out:
        out.write("# ISBN 檢查報告\n\n")
        
        out.write("## 1. 完全缺少 ISBN 的書籍\n")
        out.write("| 代碼 | 中文標題 | 英文標題 |\n")
        out.write("| --- | --- | --- |\n")
        for b in missing_both:
            out.write(f"{b}\n")
        
        out.write("\n## 2. 缺少中文 ISBN (isbn_zh) 的書籍\n")
        out.write("| 代碼 | 中文標題 | 英文標題 | 現有 ISBN |\n")
        out.write("| --- | --- | --- | --- |\n")
        for b in missing_zh:
            out.write(f"{b}\n")
            
        out.write("\n## 3. 缺少英文 ISBN (isbn_en) 的書籍\n")
        out.write("| 代碼 | 中文標題 | 英文標題 | 現有 ISBN |\n")
        out.write("| --- | --- | --- | --- |\n")
        for b in missing_en:
            out.write(f"{b}\n")

if __name__ == "__main__":
    base_dir = r'c:\Users\User\OneDrive\文件\Antigravity\WeLearn'
    check_isbns(os.path.join(base_dir, 'public', 'books.json'), os.path.join(base_dir, 'isbn_report.md'))
