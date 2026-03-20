#!/usr/bin/env python3
"""
Phase 4: 驗證資料並輸出最終結果，生成執行報告
支援多種輸出格式：JSON patch、Markdown、HTML
"""

import argparse
import json
import sys
from datetime import datetime
from pathlib import Path


# ──────────────────────────────────────────────
# 資料驗證
# ──────────────────────────────────────────────

def validate_books(books: list) -> dict:
    """驗證書籍資料品質"""
    issues = []
    stats = {
        "total": len(books),
        "has_author": 0,
        "has_description": 0,
        "high_confidence": 0,
        "needs_review": 0,
    }

    for book in books:
        book_id = book.get("id", "?")
        title = book.get("title", "?")

        # 檢查作者
        author = book.get("author", "")
        if author and author != "UNKNOWN":
            stats["has_author"] += 1
        else:
            issues.append({"id": book_id, "title": title, "issue": "缺少作者"})

        # 檢查簡介
        desc = book.get("description_zh") or book.get("description_en") or ""
        if desc and len(desc) > 30:
            stats["has_description"] += 1
        else:
            issues.append({"id": book_id, "title": title, "issue": "缺少簡介"})

        # Confidence
        if book.get("confidence") == "high":
            stats["high_confidence"] += 1
        if book.get("needs_manual_review"):
            stats["needs_review"] += 1

    return {"stats": stats, "issues": issues}


def validate_authors(authors: dict) -> dict:
    """驗證作者資料品質"""
    issues = []
    stats = {
        "total": len(authors),
        "has_bio_zh": 0,
        "has_bio_en": 0,
        "multi_book_authors": 0,
    }

    for author_id, author in authors.items():
        if author.get("bio_zh") and len(author["bio_zh"]) > 50:
            stats["has_bio_zh"] += 1
        else:
            issues.append({"id": author_id, "name": author.get("name", "?"), "issue": "缺少中文介紹"})

        if author.get("bio_en") and len(author["bio_en"]) > 30:
            stats["has_bio_en"] += 1

        if len(author.get("books", [])) > 1:
            stats["multi_book_authors"] += 1

    return {"stats": stats, "issues": issues}


# ──────────────────────────────────────────────
# 輸出格式生成
# ──────────────────────────────────────────────

def generate_json_patch(books: list, authors: dict, output_dir: Path):
    """生成可直接套用的 JSON patch 格式"""
    patch = {
        "books": {
            b["id"]: {
                "author": b.get("author", ""),
                "author_id": b.get("author_id", ""),
                "description_zh": b.get("description_zh", ""),
                "description_en": b.get("description_en", ""),
                "confidence": b.get("confidence", ""),
            }
            for b in books
        },
        "authors": {
            a_id: {
                "name": a["name"],
                "name_en": a.get("name_en", ""),
                "bio_zh": a.get("bio_zh", ""),
                "bio_en": a.get("bio_en", ""),
                "books": a.get("books", []),
            }
            for a_id, a in authors.items()
        },
    }
    out_path = output_dir / "site_data_patch.json"
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(patch, f, ensure_ascii=False, indent=2)
    print(f"[OUTPUT] JSON patch: {out_path}")
    return out_path


def generate_author_pages_html(authors: dict, output_dir: Path):
    """為每位作者生成 HTML 頁面片段"""
    pages_dir = output_dir / "author_pages"
    pages_dir.mkdir(exist_ok=True)

    for author_id, author in authors.items():
        books_html = "\n".join([
            f'<li><a href="{b.get("page_url", "#")}">{b["title"]}</a>'
            f'{"（" + b["title_en"] + "）" if b.get("title_en") else ""}</li>'
            for b in author.get("books", [])
        ])

        html = f"""<!-- 作者頁面：{author["name"]} -->
<section class="author-page" data-author-id="{author_id}">
  <h1 class="author-name">{author["name"]}</h1>
  {f'<h2 class="author-name-en">{author["name_en"]}</h2>' if author.get("name_en") else ""}

  <div class="author-bio">
    <p class="bio-zh">{author.get("bio_zh", "")}</p>
    {f'<p class="bio-en">{author.get("bio_en", "")}</p>' if author.get("bio_en") else ""}
  </div>

  <div class="author-books">
    <h3>收錄書籍</h3>
    <ul class="book-list">
{books_html}
    </ul>
  </div>
</section>
"""
        page_path = pages_dir / f"{author_id}.html"
        with open(page_path, "w", encoding="utf-8") as f:
            f.write(html)

    print(f"[OUTPUT] {len(authors)} 個作者頁面 HTML 已生成至：{pages_dir}")


def generate_report(books: list, authors: dict, book_validation: dict,
                    author_validation: dict, output_dir: Path):
    """生成執行報告"""
    now = datetime.now().strftime("%Y-%m-%d %H:%M")
    bs = book_validation["stats"]
    as_ = author_validation["stats"]

    needs_review = [b for b in books if b.get("needs_manual_review")]
    low_confidence = [b for b in books if b.get("confidence") == "low"
                      and not b.get("needs_manual_review")]

    # 需審查書籍表格
    review_table = "\n".join([
        f"| {b.get('title', '?')[:25]} | {b.get('author', '?')} | {b.get('notes', '')} |"
        for b in needs_review[:20]
    ])

    report = f"""# WLearn 書籍資訊更新報告
生成時間：{now}

## 📊 執行摘要

### 書籍處理結果
| 項目 | 數量 | 比例 |
|------|------|------|
| 總書籍數 | {bs['total']} | 100% |
| 成功取得作者 | {bs['has_author']} | {bs['has_author']*100//max(bs['total'],1)}% |
| 成功取得簡介 | {bs['has_description']} | {bs['has_description']*100//max(bs['total'],1)}% |
| 高信心度（double-checked） | {bs['high_confidence']} | {bs['high_confidence']*100//max(bs['total'],1)}% |
| 需人工審查 | {bs['needs_review']} | {bs['needs_review']*100//max(bs['total'],1)}% |

### 作者頁面結果
| 項目 | 數量 |
|------|------|
| 作者總數 | {as_['total']} |
| 有中文介紹 | {as_['has_bio_zh']} |
| 有英文介紹 | {as_['has_bio_en']} |
| 多本書籍的作者 | {as_['multi_book_authors']} |

## 📁 輸出檔案
- `site_data_patch.json` — 可直接套用到網站的資料更新
- `books_enriched.json` — 完整書籍資料（含所有欄位）
- `authors.json` — 作者資料彙整
- `author_pages/` — 每位作者的 HTML 頁面片段

## ⚠️ 需人工審查（{len(needs_review)} 本）

| 書名 | 目前作者 | 問題說明 |
|------|---------|---------|
{review_table if review_table else "（無）"}

## 🔶 低信心度書籍（{len(low_confidence)} 本，建議確認）
{chr(10).join(['- ' + b.get('title', '?') + '（' + b.get('author', '?') + '）' for b in low_confidence[:15]])}

## 📝 後續步驟
1. 將 `site_data_patch.json` 的內容合併到網站資料檔
2. 將 `author_pages/` 中的 HTML 整合到作者頁面模板
3. 手動處理「需人工審查」清單中的 {len(needs_review)} 本書
4. 對「低信心度」的 {len(low_confidence)} 本書進行人工驗證
"""

    report_path = output_dir / "report.md"
    with open(report_path, "w", encoding="utf-8") as f:
        f.write(report)

    print(f"[OUTPUT] 報告：{report_path}")
    return report_path


# ──────────────────────────────────────────────
# 主流程
# ──────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="驗證並輸出最終網站資料")
    parser.add_argument("--books", required=True, help="books_enriched.json 路徑")
    parser.add_argument("--authors", required=True, help="authors.json 路徑")
    parser.add_argument("--output", default="/tmp/wlearn_enrichment/output",
                        help="輸出目錄")
    args = parser.parse_args()

    # 讀取資料
    if not Path(args.books).exists():
        print(f"[ERROR] 找不到書籍資料：{args.books}", file=sys.stderr)
        sys.exit(1)

    with open(args.books, encoding="utf-8") as f:
        books = json.load(f)

    if not Path(args.authors).exists():
        print(f"[ERROR] 找不到作者資料：{args.authors}", file=sys.stderr)
        sys.exit(1)

    with open(args.authors, encoding="utf-8") as f:
        authors = json.load(f)

    output_dir = Path(args.output)
    output_dir.mkdir(parents=True, exist_ok=True)

    print(f"[Phase 4] 驗證並輸出資料...")
    print(f"  書籍：{len(books)} 本")
    print(f"  作者：{len(authors)} 位")

    # 驗證
    book_validation = validate_books(books)
    author_validation = validate_authors(authors)

    # 生成輸出
    generate_json_patch(books, authors, output_dir)
    generate_author_pages_html(authors, output_dir)
    report_path = generate_report(books, authors, book_validation, author_validation, output_dir)

    # 同時複製原始資料到輸出目錄
    import shutil
    shutil.copy(args.books, output_dir / "books_enriched.json")
    shutil.copy(args.authors, output_dir / "authors.json")

    print(f"\n[Phase 4 完成] 所有輸出已儲存至：{output_dir}")
    print(f"請查看報告：{report_path}")


if __name__ == "__main__":
    main()
