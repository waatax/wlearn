#!/usr/bin/env python3
"""
Phase 1: 爬取 WLearn 網站書單
支援多種網站架構：靜態 HTML、SPA (React/Vue)、Jekyll/Hugo
"""

import argparse
import json
import re
import sys
import urllib.request
import urllib.error
from pathlib import Path


def fetch_url(url: str, timeout: int = 15) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="ignore")
    except urllib.error.URLError as e:
        print(f"[WARN] 無法抓取 {url}: {e}", file=sys.stderr)
        return ""


def try_json_endpoints(base_url: str) -> dict | None:
    """嘗試常見的 JSON 資料端點"""
    candidates = [
        "data.json", "books.json", "api/books.json",
        "assets/data.json", "_data/books.json",
        "public/data.json", "static/data.json",
        "content/books.json", "src/data/books.json",
    ]
    for path in candidates:
        url = f"{base_url.rstrip('/')}/{path}"
        content = fetch_url(url)
        if content:
            try:
                data = json.loads(content)
                print(f"[OK] 找到資料檔：{url}")
                return {"url": url, "data": data}
            except json.JSONDecodeError:
                pass
    return None


def extract_from_js_bundle(html: str, base_url: str) -> list[dict]:
    """從 SPA JS bundle 中提取書籍資料"""
    books = []

    # 找 JS bundle URLs
    js_urls = re.findall(r'src=["\']([^"\']*\.js(?:\?[^"\']*)?)["\']', html)
    js_urls = [u if u.startswith("http") else f"{base_url.rstrip('/')}/{u.lstrip('/')}" for u in js_urls]

    for js_url in js_urls[:5]:  # 只嘗試前 5 個
        print(f"[INFO] 嘗試 JS bundle: {js_url}")
        js_content = fetch_url(js_url)
        if not js_content or len(js_content) < 1000:
            continue

        # 嘗試找 JSON 書籍陣列
        patterns = [
            r'\{["\']?title["\']?\s*:\s*["\']([^"\']+)["\'].*?["\']?author["\']?\s*:\s*["\']([^"\']*)["\']',
            r'title\s*:\s*["\`]([^\`"\']+)["\`]',
        ]
        for pattern in patterns:
            matches = re.findall(pattern, js_content)
            if matches:
                print(f"[OK] 從 JS bundle 找到 {len(matches)} 本書")
                for m in matches:
                    if isinstance(m, tuple):
                        books.append({"title": m[0], "author_raw": m[1] if len(m) > 1 else ""})
                    else:
                        books.append({"title": m, "author_raw": ""})
                if books:
                    return books

    return books


def extract_from_html(html: str) -> list[dict]:
    """從靜態 HTML 中提取書籍資訊"""
    books = []

    # 常見書籍卡片模式
    # 找 <h2> 或 <h3> 內的書名
    title_patterns = [
        r'<h[23][^>]*class="[^"]*(?:book|title)[^"]*"[^>]*>\s*([^<]+)\s*</h[23]>',
        r'<div[^>]*class="[^"]*book-title[^"]*"[^>]*>\s*([^<]+)\s*</div>',
        r'data-title=["\']([^"\']+)["\']',
        r'"title"\s*:\s*"([^"]+)"',
    ]
    for pattern in title_patterns:
        matches = re.findall(pattern, html, re.IGNORECASE)
        if matches:
            for t in matches:
                books.append({"title": t.strip(), "author_raw": ""})

    # 找 YouTube 連結（書籍頁面特徵）
    yt_pattern = r'href=["\']https?://(?:www\.)?youtube\.com/watch\?v=([^"\'&]+)["\']'
    yt_matches = re.findall(yt_pattern, html)
    for i, vid_id in enumerate(yt_matches):
        if i < len(books):
            books[i]["youtube_url"] = f"https://www.youtube.com/watch?v={vid_id}"

    return books


def crawl_site(base_url: str) -> list[dict]:
    print(f"[Phase 1] 開始爬取：{base_url}")

    # 嘗試 1：直接找 JSON 資料檔
    json_result = try_json_endpoints(base_url)
    if json_result:
        data = json_result["data"]
        if isinstance(data, list):
            return normalize_books(data, base_url)
        if isinstance(data, dict):
            # 可能是 {books: [...]} 格式
            for key in ["books", "items", "data", "list"]:
                if key in data and isinstance(data[key], list):
                    return normalize_books(data[key], base_url)

    # 嘗試 2：抓主頁 HTML
    print("[INFO] 嘗試解析主頁 HTML...")
    html = fetch_url(base_url)
    if not html:
        print("[ERROR] 無法抓取主頁", file=sys.stderr)
        return []

    # 嘗試 3：從 HTML 內嵌 JSON
    json_in_html = re.findall(r'(?:window\.__DATA__|__NUXT__|__NEXT_DATA__)\s*=\s*(\{.+?\});', html, re.DOTALL)
    for json_str in json_in_html:
        try:
            data = json.loads(json_str)
            books = find_books_in_nested(data)
            if books:
                print(f"[OK] 從 HTML 內嵌 JSON 找到 {len(books)} 本書")
                return normalize_books(books, base_url)
        except json.JSONDecodeError:
            pass

    # 嘗試 4：從 JS bundle 提取
    books = extract_from_js_bundle(html, base_url)
    if books:
        return normalize_books(books, base_url)

    # 嘗試 5：純 HTML 解析
    books = extract_from_html(html)
    if books:
        print(f"[OK] 從 HTML 找到 {len(books)} 本書")
        return normalize_books(books, base_url)

    print("[WARN] 自動爬取失敗。請手動提供書單或 GitHub repo 路徑。", file=sys.stderr)
    return []


def find_books_in_nested(data, depth=0) -> list:
    """遞迴在巢狀資料中找書籍陣列"""
    if depth > 5:
        return []
    if isinstance(data, list) and data:
        # 判斷是否為書籍陣列
        if isinstance(data[0], dict) and any(k in data[0] for k in ["title", "name", "book"]):
            return data
    if isinstance(data, dict):
        for val in data.values():
            result = find_books_in_nested(val, depth + 1)
            if result:
                return result
    return []


def normalize_books(raw_books: list, base_url: str) -> list[dict]:
    """統一書籍資料格式"""
    normalized = []
    for i, book in enumerate(raw_books):
        if not isinstance(book, dict):
            continue

        # 找 title
        title = (book.get("title") or book.get("name") or
                 book.get("bookTitle") or book.get("book_title") or "")
        if not title:
            continue

        # 找 author
        author_raw = (book.get("author") or book.get("authors") or
                      book.get("writer") or book.get("author_name") or "")
        if isinstance(author_raw, list):
            author_raw = "、".join(author_raw)

        # 找 ID / slug
        book_id = (book.get("id") or book.get("slug") or
                   book.get("key") or slugify(title))

        # 找 URL
        page_url = book.get("url") or book.get("link") or book.get("page_url") or ""
        if page_url and not page_url.startswith("http"):
            page_url = f"{base_url.rstrip('/')}/{page_url.lstrip('/')}"

        # 找 YouTube
        youtube_url = book.get("youtube") or book.get("youtube_url") or book.get("video") or ""

        # 找語言
        lang = book.get("language") or book.get("lang") or detect_language(title)

        normalized.append({
            "id": book_id,
            "title": title,
            "title_en": book.get("title_en") or book.get("english_title") or "",
            "author_raw": str(author_raw),
            "page_url": page_url,
            "youtube_url": youtube_url,
            "category": book.get("category") or book.get("tag") or "",
            "language": lang,
            "existing_description": (book.get("description") or
                                     book.get("intro") or
                                     book.get("summary") or ""),
            "site_data_path": book.get("_path") or "",
            "_original": book,
        })

    print(f"[Phase 1 完成] 共整理 {len(normalized)} 本書")
    return normalized


def slugify(text: str) -> str:
    """將書名轉為 URL slug"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text[:50]


def detect_language(title: str) -> str:
    """簡單判斷書籍語言"""
    cjk = len(re.findall(r'[\u4e00-\u9fff\u3040-\u30ff]', title))
    return "zh" if cjk > len(title) * 0.3 else "en"


def crawl_from_repo(repo_path: str) -> list[dict]:
    """從本地 clone 的 repo 讀取書籍資料"""
    repo = Path(repo_path)
    books = []

    # 找所有可能的資料檔
    for pattern in ["**/*.json", "**/*.yaml", "**/*.yml", "**/*.md"]:
        for f in repo.glob(pattern):
            if any(skip in str(f) for skip in ["node_modules", ".git", "package"]):
                continue
            try:
                content = f.read_text(encoding="utf-8")
                if "title" in content and ("author" in content or "book" in content.lower()):
                    print(f"[INFO] 找到可能的資料檔：{f}")
                    if f.suffix == ".json":
                        data = json.loads(content)
                        found = find_books_in_nested(data)
                        if found:
                            books.extend(normalize_books(found, "https://waatax.github.io/wlearn"))
            except Exception:
                pass

    return books


def main():
    parser = argparse.ArgumentParser(description="爬取 WLearn 書單")
    parser.add_argument("--url", default="https://waatax.github.io/wlearn",
                        help="網站 URL")
    parser.add_argument("--repo", default="", help="本地 repo 路徑（優先使用）")
    parser.add_argument("--output", default="/tmp/wlearn_enrichment/data/books_raw.json",
                        help="輸出 JSON 路徑")
    args = parser.parse_args()

    # 確保輸出目錄存在
    Path(args.output).parent.mkdir(parents=True, exist_ok=True)

    if args.repo and Path(args.repo).exists():
        print(f"[INFO] 從本地 repo 讀取：{args.repo}")
        books = crawl_from_repo(args.repo)
    else:
        books = crawl_site(args.url)

    if not books:
        print("[ERROR] 未找到任何書籍資料！", file=sys.stderr)
        print("[HINT] 請確認：")
        print("  1. 提供 GitHub repo 路徑：--repo /path/to/wlearn")
        print("  2. 或手動建立 books_raw.json 後，直接執行 Phase 2")
        sys.exit(1)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(books, f, ensure_ascii=False, indent=2)

    print(f"[SUCCESS] 書單已儲存至：{args.output}")
    print(f"[INFO] 共 {len(books)} 本書待處理")


if __name__ == "__main__":
    main()
