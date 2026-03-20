# WLearn 書籍資訊自動更新 Skill

自動為 `waatax.github.io/wlearn` 補充每本書的正確作者、書籍簡介，並建立作者彙整頁面。

---

## 快速開始

### 方式 A：直接執行（推薦）

```bash
# 1. 進入腳本目錄
cd scripts/

# 2. 若有 GitHub repo clone，提供路徑（最準確）
bash run_all.sh /path/to/wlearn/repo

# 3. 若只有網站 URL
bash run_all.sh
```

### 方式 B：分階段執行（方便 debug）

```bash
# Phase 1：爬取書單
python3 scripts/01_crawl_site.py \
  --url "https://waatax.github.io/wlearn" \
  --output /tmp/wlearn/data/books_raw.json

# 【可在此手動編輯 books_raw.json 補充缺漏書籍】

# Phase 2：搜尋作者和簡介（支援斷點續傳）
python3 scripts/02_search_book_info.py \
  --input /tmp/wlearn/data/books_raw.json \
  --output /tmp/wlearn/data/books_enriched.json \
  --checkpoint /tmp/wlearn/data/checkpoint.json

# Phase 3：建立作者頁面
python3 scripts/03_generate_author_pages.py \
  --input /tmp/wlearn/data/books_enriched.json \
  --output /tmp/wlearn/data/authors.json

# Phase 4：輸出最終資料
python3 scripts/04_update_site_data.py \
  --books /tmp/wlearn/data/books_enriched.json \
  --authors /tmp/wlearn/data/authors.json \
  --output /tmp/wlearn/output/
```

---

## 輸出說明

執行完成後，所有結果在 `/tmp/wlearn_enrichment/output/`：

| 檔案 | 說明 |
|------|------|
| `site_data_patch.json` | 網站資料更新（books + authors） |
| `books_enriched.json` | 完整書籍資料 |
| `authors.json` | 作者彙整資料 |
| `author_pages/*.html` | 每位作者的 HTML 頁面片段 |
| `report.md` | 執行報告（含需審查清單） |

---

## 斷點續傳

若執行中途中斷，重新執行時會自動從上次中斷點繼續：

```bash
# 直接重新執行 Phase 2，已完成的書籍不會重複處理
python3 scripts/02_search_book_info.py \
  --input /tmp/wlearn/data/books_raw.json \
  --output /tmp/wlearn/data/books_enriched.json \
  --checkpoint /tmp/wlearn/data/checkpoint.json
```

---

## 搜尋來源

| 書籍語言 | 優先搜尋來源 |
|---------|------------|
| 中文 | YouTube 描述 → books.com.tw → kobo.com/zh |
| 英文 | YouTube 描述 → amazon.com → kobo.com |

---

## 給 Agent 的指引

本 Skill 設計為 Agent 可完全自動執行。Agent 應：

1. **先確認網站資料格式**（Phase 1）再繼續
2. **每完成 10 本書儲存一次**斷點（已內建）
3. 若某本書搜尋 3 次仍失敗，**標記並跳過**，繼續下一本
4. 最後**輸出 report.md**，清楚列出需人工審查的書籍

---

## 系統需求

- Python 3.8+
- 網路存取（Claude API + 搜尋）
- Claude API（已在腳本中整合）

無需安裝額外套件（僅使用 Python 標準函式庫）。
