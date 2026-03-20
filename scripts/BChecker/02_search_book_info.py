#!/usr/bin/env python3
"""
Phase 2: 為每本書搜尋正確的作者和書籍簡介
使用 Claude API (claude-sonnet-4) 進行搜尋和改寫
支援斷點續傳，避免重複工作
"""

import argparse
import json
import re
import sys
import time
import urllib.request
import urllib.parse
from pathlib import Path


# ──────────────────────────────────────────────
# Claude API 呼叫
# ──────────────────────────────────────────────

def call_claude(messages: list, system: str = "", max_tokens: int = 1500) -> str:
    """呼叫 Claude API with web_search tool"""
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
            # 收集所有 text 類型的回應
            texts = [b["text"] for b in result.get("content", []) if b.get("type") == "text"]
            return "\n".join(texts)
    except Exception as e:
        print(f"[API ERROR] {e}", file=sys.stderr)
        return ""


# ──────────────────────────────────────────────
# 書籍資訊搜尋
# ──────────────────────────────────────────────

SYSTEM_BOOK_SEARCH = """你是一個書籍資料整理專家。
你的任務是為指定書籍搜尋正確的作者姓名和書籍簡介。

搜尋策略（依優先順序）：
1. 若有 YouTube URL，先搜尋該影片的描述（影片描述常含作者和書籍資訊）
2. 中文書：搜尋 books.com.tw、kobo.com/zh
3. 英文書：搜尋 amazon.com、kobo.com
4. 交叉驗證：至少確認 2 個來源的作者姓名一致

回傳格式必須是 JSON（只回傳 JSON，不要任何說明文字或 markdown）：
{
  "author": "確認的作者姓名",
  "author_en": "英文名（若為中文作者請翻譯或留空）",
  "description_zh": "中文書籍簡介（150-250字，自行改寫，不直接複製任何來源文字）",
  "description_en": "English description (100-180 words, paraphrased, not copied)",
  "source_urls": ["來源URL1", "來源URL2"],
  "confidence": "high | medium | low",
  "notes": "若有特殊情況說明"
}

重要規則：
- description 必須用自己的話改寫，絕對不能直接複製超過 15 個字的原文
- 若真的找不到作者，author 填 "UNKNOWN"，confidence 填 "low"
- 若為多位作者，用「、」分隔（中文）或 ", " 分隔（英文）
"""


def search_book_info(book: dict, max_retries: int = 3) -> dict:
    """為單本書搜尋作者和簡介"""
    title = book["title"]
    title_en = book.get("title_en", "")
    lang = book.get("language", "zh")
    youtube_url = book.get("youtube_url", "")
    author_raw = book.get("author_raw", "")

    # 建立搜尋 prompt
    prompt_parts = [f"請為以下書籍搜尋正確的作者和書籍簡介：\n書名：{title}"]
    if title_en:
        prompt_parts.append(f"英文書名：{title_en}")
    if author_raw and author_raw.lower() not in ("", "unknown", "null", "none"):
        prompt_parts.append(f"目前已知作者（需驗證）：{author_raw}")
    if youtube_url:
        prompt_parts.append(f"相關 YouTube 影片：{youtube_url}（請搜尋此影片的描述以獲取書籍資訊）")
    if lang == "zh":
        prompt_parts.append("此為中文書籍，請搜尋 books.com.tw 和 kobo.com/zh")
    else:
        prompt_parts.append("This is an English book, please search amazon.com and kobo.com")

    prompt = "\n".join(prompt_parts)

    for attempt in range(max_retries):
        if attempt > 0:
            time.sleep(2 ** attempt)  # 指數退避
            print(f"  [RETRY {attempt}] {title}")

        response = call_claude(
            messages=[{"role": "user", "content": prompt}],
            system=SYSTEM_BOOK_SEARCH,
            max_tokens=1200,
        )

        if not response:
            continue

        # 解析 JSON 回應
        try:
            # 清理可能的 markdown wrapper
            clean = response.strip()
            clean = re.sub(r'^```(?:json)?\s*', '', clean)
            clean = re.sub(r'\s*```$', '', clean)
            result = json.loads(clean)

            # 驗證必要欄位
            if "author" in result and "description_zh" in result:
                result["search_attempts"] = attempt + 1
                return result
        except json.JSONDecodeError:
            # 嘗試從回應中提取作者名
            author_match = re.search(r'作者[：:]\s*([^\n]+)', response)
            if author_match:
                return {
                    "author": author_match.group(1).strip(),
                    "author_en": "",
                    "description_zh": extract_description(response),
                    "description_en": "",
                    "source_urls": [],
                    "confidence": "low",
                    "notes": "JSON 解析失敗，從文字提取",
                    "search_attempts": attempt + 1,
                }

    # 所有嘗試失敗
    return {
        "author": author_raw or "UNKNOWN",
        "author_en": "",
        "description_zh": "",
        "description_en": "",
        "source_urls": [],
        "confidence": "low",
        "needs_manual_review": True,
        "notes": f"搜尋 {max_retries} 次後仍未找到完整資訊",
        "search_attempts": max_retries,
    }


def extract_description(text: str) -> str:
    """從非結構化文字中提取簡介"""
    lines = [l.strip() for l in text.split('\n') if len(l.strip()) > 30]
    return ' '.join(lines[:3])[:300] if lines else ""


# ──────────────────────────────────────────────
# 主流程
# ──────────────────────────────────────────────

def load_checkpoint(checkpoint_path: str) -> set:
    """載入已完成的書籍 ID"""
    path = Path(checkpoint_path)
    if path.exists():
        with open(path) as f:
            data = json.load(f)
        return set(data.get("completed_ids", []))
    return set()


def save_checkpoint(checkpoint_path: str, completed_ids: set, results: list):
    """儲存進度"""
    Path(checkpoint_path).parent.mkdir(parents=True, exist_ok=True)
    with open(checkpoint_path, "w") as f:
        json.dump({
            "completed_ids": list(completed_ids),
            "count": len(completed_ids),
        }, f, ensure_ascii=False, indent=2)

    # 同時儲存中間結果
    result_path = checkpoint_path.replace("checkpoint.json", "books_partial.json")
    with open(result_path, "w") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)


def process_books(input_path: str, output_path: str, checkpoint_path: str,
                  max_searches: int = 5, batch_save: int = 10):
    """處理所有書籍"""
    # 讀取書單
    with open(input_path, encoding="utf-8") as f:
        books = json.load(f)

    print(f"[Phase 2] 開始處理 {len(books)} 本書籍...")

    # 載入進度
    completed_ids = load_checkpoint(checkpoint_path)
    if completed_ids:
        print(f"[INFO] 從斷點繼續，已完成 {len(completed_ids)} 本")

    # 載入已有的部分結果
    partial_path = checkpoint_path.replace("checkpoint.json", "books_partial.json")
    results = []
    if Path(partial_path).exists():
        with open(partial_path) as f:
            results = json.load(f)

    # 建立結果索引
    results_index = {r["id"]: r for r in results}

    stats = {"success": 0, "partial": 0, "failed": 0}

    for i, book in enumerate(books, 1):
        book_id = book["id"]

        # 跳過已完成的
        if book_id in completed_ids:
            print(f"  [{i}/{len(books)}] ✓ 跳過（已完成）：{book['title'][:30]}")
            continue

        print(f"  [{i}/{len(books)}] 搜尋中：{book['title'][:40]}")

        # 搜尋書籍資訊
        info = search_book_info(book, max_retries=min(max_searches, 3))

        # 合併到書籍資料
        enriched = {**book, **info}
        enriched["id"] = book_id  # 確保 ID 不被覆蓋

        # 計算 author_id
        author_name = info.get("author", "") or book.get("author_raw", "")
        enriched["author_id"] = make_author_id(author_name)

        # 統計
        if info.get("confidence") == "high":
            stats["success"] += 1
            marker = "✓"
        elif info.get("needs_manual_review"):
            stats["failed"] += 1
            marker = "✗"
        else:
            stats["partial"] += 1
            marker = "~"

        print(f"    {marker} 作者：{info.get('author', '?')} [{info.get('confidence', '?')}]")

        # 更新結果
        results_index[book_id] = enriched
        completed_ids.add(book_id)

        # 每 N 本儲存一次
        if i % batch_save == 0:
            results = list(results_index.values())
            save_checkpoint(checkpoint_path, completed_ids, results)
            print(f"  [CHECKPOINT] 已儲存進度 ({i}/{len(books)})")

        # API 限速
        time.sleep(1)

    # 最終儲存
    results = list(results_index.values())
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    # 儲存待審查清單
    review_list = [r for r in results if r.get("needs_manual_review")]
    if review_list:
        review_path = output_path.replace(".json", "_review.json")
        with open(review_path, "w", encoding="utf-8") as f:
            json.dump(review_list, f, ensure_ascii=False, indent=2)
        print(f"\n[WARNING] {len(review_list)} 本書需人工審查，已儲存至：{review_path}")

    print(f"\n[Phase 2 完成]")
    print(f"  成功（high confidence）：{stats['success']} 本")
    print(f"  部分（medium/low）：{stats['partial']} 本")
    print(f"  需審查：{stats['failed']} 本")
    print(f"  輸出檔案：{output_path}")


def make_author_id(author_name: str) -> str:
    """將作者名轉為 slug ID"""
    if not author_name or author_name == "UNKNOWN":
        return "unknown"
    # 移除特殊字元，轉小寫
    slug = re.sub(r'[^\w\s-]', '', author_name.lower())
    slug = re.sub(r'[\s、,]+', '-', slug.strip())
    return slug[:40]


def main():
    parser = argparse.ArgumentParser(description="搜尋書籍作者和簡介")
    parser.add_argument("--input", required=True, help="books_raw.json 路徑")
    parser.add_argument("--output", required=True, help="books_enriched.json 輸出路徑")
    parser.add_argument("--checkpoint", default="/tmp/wlearn_enrichment/data/checkpoint.json",
                        help="斷點記錄檔路徑")
    parser.add_argument("--max-searches-per-book", type=int, default=5,
                        help="每本書最多搜尋次數")
    parser.add_argument("--batch-save", type=int, default=10,
                        help="每處理 N 本書儲存一次進度")
    args = parser.parse_args()

    if not Path(args.input).exists():
        print(f"[ERROR] 找不到輸入檔案：{args.input}", file=sys.stderr)
        sys.exit(1)

    process_books(
        input_path=args.input,
        output_path=args.output,
        checkpoint_path=args.checkpoint,
        max_searches=args.max_searches_per_book,
        batch_save=args.batch_save,
    )


if __name__ == "__main__":
    main()
