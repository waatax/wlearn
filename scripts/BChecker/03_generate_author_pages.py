#!/usr/bin/env python3
"""
Phase 3: 彙整作者資料，為每位作者生成頁面內容
包含：作者介紹、該作者在網站收錄的所有書籍連結
"""

import argparse
import json
import re
import sys
import time
import urllib.request
from pathlib import Path


# ──────────────────────────────────────────────
# Claude API
# ──────────────────────────────────────────────

def call_claude(messages: list, system: str = "", max_tokens: int = 1200) -> str:
    payload = {
        "model": "claude-sonnet-4-20250514",
        "max_tokens": max_tokens,
        "tools": [{"type": "web_search_20250305", "name": "web_search"}],
        "messages": messages,
    }
    if system:
        payload["system"] = system

    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        "https://api.anthropic.com/v1/messages",
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode("utf-8"))
            texts = [b["text"] for b in result.get("content", []) if b.get("type") == "text"]
            return "\n".join(texts)
    except Exception as e:
        print(f"[API ERROR] {e}", file=sys.stderr)
        return ""


# ──────────────────────────────────────────────
# 作者資料彙整
# ──────────────────────────────────────────────

SYSTEM_AUTHOR_BIO = """你是一個書籍作者資料整理專家。
請搜尋指定作者的背景介紹，並以指定格式回傳。

回傳格式必須是 JSON（只回傳 JSON，不要任何說明文字或 markdown）：
{
  "bio_zh": "作者中文介紹（150-250字，自行改寫，包含：身份背景、專業領域、寫作風格）",
  "bio_en": "Author English biography (100-180 words, paraphrased)",
  "notable_works": ["代表作1", "代表作2"],
  "source_urls": ["來源URL1"]
}

重要規則：
- bio 必須用自己的話改寫，絕對不能直接複製超過 15 個字的原文
- 不要在 bio 中列出書名（書籍連結會另外顯示）
- 若是中文作家，bio_zh 優先且完整；英文可以較短
- 若是英文作家，bio_en 優先且完整；中文可以較短
"""


def build_authors_index(books: list) -> dict:
    """從書籍清單建立作者索引"""
    authors = {}

    for book in books:
        author_name = book.get("author", "")
        if not author_name or author_name == "UNKNOWN":
            continue

        author_id = book.get("author_id") or make_author_id(author_name)

        if author_id not in authors:
            authors[author_id] = {
                "author_id": author_id,
                "name": author_name,
                "name_en": book.get("author_en", ""),
                "bio_zh": "",
                "bio_en": "",
                "notable_works": [],
                "books": [],
                "source_urls": [],
                "bio_fetched": False,
            }
        else:
            # 更新英文名（若之前沒有）
            if not authors[author_id]["name_en"] and book.get("author_en"):
                authors[author_id]["name_en"] = book["author_en"]

        # 加入書籍
        book_entry = {
            "id": book["id"],
            "title": book["title"],
            "title_en": book.get("title_en", ""),
            "page_url": book.get("page_url", ""),
            "language": book.get("language", "zh"),
            "description_preview": (book.get("description_zh") or
                                     book.get("description_en") or "")[:80],
        }

        # 避免重複加入
        existing_ids = [b["id"] for b in authors[author_id]["books"]]
        if book["id"] not in existing_ids:
            authors[author_id]["books"].append(book_entry)

    print(f"[Phase 3] 找到 {len(authors)} 位作者")
    for a_id, a_data in authors.items():
        print(f"  - {a_data['name']}：{len(a_data['books'])} 本書")

    return authors


def fetch_author_bio(author_name: str, author_name_en: str = "",
                     books_in_site: list = None) -> dict:
    """搜尋作者背景介紹"""
    books_titles = "、".join([b["title"] for b in (books_in_site or [])[:5]])

    prompt = f"""請搜尋以下作者的背景介紹：

作者姓名：{author_name}
{"英文名：" + author_name_en if author_name_en else ""}
{"在本站收錄的書籍：" + books_titles if books_titles else ""}

請搜尋這位作者的個人背景、專業領域、寫作風格等資訊。"""

    response = call_claude(
        messages=[{"role": "user", "content": prompt}],
        system=SYSTEM_AUTHOR_BIO,
        max_tokens=1000,
    )

    if not response:
        return {"bio_zh": "", "bio_en": "", "notable_works": [], "source_urls": []}

    try:
        clean = response.strip()
        clean = re.sub(r'^```(?:json)?\s*', '', clean)
        clean = re.sub(r'\s*```$', '', clean)
        return json.loads(clean)
    except json.JSONDecodeError:
        # 嘗試提取文字
        bio = extract_bio_text(response)
        return {
            "bio_zh": bio,
            "bio_en": "",
            "notable_works": [],
            "source_urls": [],
        }


def extract_bio_text(text: str) -> str:
    """從非結構化文字提取介紹"""
    lines = [l.strip() for l in text.split('\n')
             if len(l.strip()) > 20 and not l.strip().startswith('{')]
    return ' '.join(lines[:4])[:400]


def generate_authors_data(books_path: str, output_path: str):
    """主流程"""
    # 讀取書籍資料
    with open(books_path, encoding="utf-8") as f:
        books = json.load(f)

    # 建立作者索引
    authors = build_authors_index(books)

    # 為每位作者搜尋介紹
    total = len(authors)
    for i, (author_id, author_data) in enumerate(authors.items(), 1):
        print(f"  [{i}/{total}] 搜尋作者介紹：{author_data['name']}")

        bio_info = fetch_author_bio(
            author_name=author_data["name"],
            author_name_en=author_data.get("name_en", ""),
            books_in_site=author_data["books"],
        )

        authors[author_id]["bio_zh"] = bio_info.get("bio_zh", "")
        authors[author_id]["bio_en"] = bio_info.get("bio_en", "")
        authors[author_id]["notable_works"] = bio_info.get("notable_works", [])
        authors[author_id]["source_urls"] = bio_info.get("source_urls", [])
        authors[author_id]["bio_fetched"] = True

        time.sleep(1.5)  # API 限速

    # 儲存
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(authors, f, ensure_ascii=False, indent=2)

    print(f"\n[Phase 3 完成] 作者資料已儲存至：{output_path}")
    print(f"  共 {len(authors)} 位作者")


def make_author_id(name: str) -> str:
    slug = re.sub(r'[^\w\s-]', '', name.lower())
    slug = re.sub(r'[\s、,]+', '-', slug.strip())
    return slug[:40]


def main():
    parser = argparse.ArgumentParser(description="生成作者頁面資料")
    parser.add_argument("--input", required=True, help="books_enriched.json 路徑")
    parser.add_argument("--output", required=True, help="authors.json 輸出路徑")
    args = parser.parse_args()

    if not Path(args.input).exists():
        print(f"[ERROR] 找不到輸入檔案：{args.input}", file=sys.stderr)
        sys.exit(1)

    generate_authors_data(args.input, args.output)


if __name__ == "__main__":
    main()
