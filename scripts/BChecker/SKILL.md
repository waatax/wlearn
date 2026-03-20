---
name: wlearn-book-enrichment
description: >
  自動搜尋並更新 WLearn 網站中每本書的作者資訊、書籍簡介，以及作者頁面的彙整。
  當使用者提到要更新 wlearn 書籍資料、搜尋書籍作者、整合作者頁面，或修正書籍介紹時，
  必須使用此 Skill。適用於 GitHub Pages 靜態網站的內容自動化更新工作流程。
compatibility:
  tools:
    - web_search
    - web_fetch
    - bash
    - create_file
    - str_replace
  requirements:
    - 能夠存取 GitHub repo (git clone 或 API)
    - Node.js 或 Python 環境（解析 HTML/JSON）
    - 網路搜尋功能
---

# WLearn 書籍資訊自動更新 Skill

## 任務總覽

本 Skill 讓 Agent 能自動為 `waatax.github.io/wlearn` 網站上的每本書：
1. 找到**正確作者姓名**
2. 撰寫**書籍簡介**（中文為主）
3. 建立/更新**作者頁面**（含該作者所有書籍連結 + 作者介紹）

---

## 架構設計

```
wlearn-book-enrichment/
├── SKILL.md                     ← 本檔案（Agent 指引）
├── scripts/
│   ├── 01_crawl_site.py         ← 爬取網站書單
│   ├── 02_search_book_info.py   ← 搜尋每本書的資訊
│   ├── 03_generate_author_pages.py  ← 生成作者頁面
│   ├── 04_update_site_data.py   ← 寫回網站資料檔
│   └── utils/
│       ├── search_sources.py    ← 各搜尋來源的抓取函式
│       └── data_schema.py       ← 資料結構定義
├── data/
│   ├── books_raw.json           ← 從網站爬取的原始書單
│   ├── books_enriched.json      ← 已補充資訊的書單
│   └── authors.json             ← 作者彙整資料
└── output/
    └── site_data_updated.json   ← 最終要寫回網站的資料
```

---

## 執行流程（Agent 必須依序完成每個階段）

### PHASE 1：網站結構偵察

**目標**：了解網站使用的資料格式與書籍清單

```bash
# 步驟 1-A：抓取主頁 HTML，找 JS bundle 或 data 來源
curl -L "https://waatax.github.io/wlearn/" -o /tmp/wlearn_index.html

# 步驟 1-B：找資料檔（可能的路徑）
for path in data.json books.json api/books.json assets/data.json _data/books.json; do
  curl -sf "https://waatax.github.io/wlearn/${path}" -o "/tmp/wlearn_${path//\//_}" && echo "FOUND: $path"
done

# 步驟 1-C：若為 React/Vue SPA，找 JS chunk 中的書單
grep -oP 'title["\s:]+\K[^"]+' /tmp/wlearn_index.html | head -50

# 步驟 1-D：若有 GitHub repo，優先直接 clone
git clone https://github.com/waatax/wlearn /tmp/wlearn_repo 2>/dev/null || echo "需要手動提供 repo 存取"
```

**Agent 注意事項**：
- 若網站是 SPA（React/Vue），書籍資料可能在 `.js` bundle 中，需用 grep 找出 JSON 結構
- 若有 `_data/` 或 `public/` 資料夾，優先讀取那裡的 JSON/YAML
- 記錄下書籍的 **唯一識別欄位**（id、slug、title）

**輸出格式** `data/books_raw.json`：
```json
[
  {
    "id": "book-slug-or-id",
    "title": "書名",
    "title_en": "English Title (若有)",
    "author_raw": "目前網站上的作者欄位（可能是空或錯誤）",
    "page_url": "https://waatax.github.io/wlearn/book/xxx",
    "youtube_url": "書籍頁面中的 YouTube 連結（若有）",
    "category": "分類",
    "language": "zh | en",
    "existing_description": "目前網站上的簡介（若有）",
    "site_data_path": "在 repo 中對應的檔案路徑或 JSON key"
  }
]
```

---

### PHASE 2：書籍資訊搜尋

**目標**：為每本書找到正確的作者 + 撰寫書籍簡介

**搜尋策略（依優先順序）**：

#### 2-A：從書籍頁面的 YouTube 連結取得資訊

```python
# 若書籍頁面有 YouTube 連結，優先抓取影片描述
def fetch_youtube_info(youtube_url):
    # 從 YouTube 頁面 meta og:description / og:title 取得書籍資訊
    # 影片描述通常包含作者、出版社、書籍重點
    video_id = extract_video_id(youtube_url)
    yt_page = fetch("https://www.youtube.com/watch?v={video_id}")
    return parse_og_tags(yt_page)
```

#### 2-B：書店搜尋（依書籍語言選擇來源）

```
中文書籍搜尋順序：
  1. books.com.tw  → 搜尋「{書名} 作者」
  2. kobo.com/zh/  → 搜尋 {書名}
  3. Google搜尋   → "{書名}" site:books.com.tw OR site:kobo.com

英文書籍搜尋順序：
  1. amazon.com    → 搜尋 {title} book author
  2. kobo.com      → 搜尋 {title}
  3. Google搜尋   → "{title}" site:amazon.com book author
```

**搜尋 Query 範本**：

```python
SEARCH_QUERIES = {
    "zh_author":      '"{book_title}" 作者 書籍',
    "zh_books_tw":    '"{book_title}" site:books.com.tw',
    "zh_kobo":        '"{book_title}" site:kobo.com/zh',
    "zh_description": '"{book_title}" {author} 書籍介紹 內容',
    "en_author":      '"{book_title_en}" book author',
    "en_amazon":      '"{book_title_en}" site:amazon.com',
    "en_kobo":        '"{book_title_en}" site:kobo.com',
    "en_description": '"{book_title_en}" {author} book summary review',
    "author_bio_zh":  '{author} 作者介紹 背景 著作',
    "author_bio_en":  '{author} author biography books',
}
```

#### 2-C：作者資訊搜尋

```python
# 確認作者後，另外搜尋作者背景
def search_author_info(author_name, lang="zh"):
    queries = [
        f"{author_name} 作者介紹" if lang=="zh" else f"{author_name} author biography",
        f"{author_name} 著作 代表作" if lang=="zh" else f"{author_name} books written",
        f"{author_name} Wikipedia",
    ]
    return aggregate_author_info(queries)
```

**重要搜尋規則**：
- 每本書至少搜尋 **3 個不同來源**，交叉驗證作者姓名
- 作者姓名若來源有衝突，優先採用：books.com.tw > amazon.com > 其他
- 若搜尋 3 次仍無結果，標記為 `needs_manual_review: true`，繼續處理下一本

**輸出格式** `data/books_enriched.json`：
```json
[
  {
    "id": "book-slug",
    "title": "書名",
    "title_en": "English Title",
    "author": "正確作者姓名（中文）",
    "author_en": "Author Name in English",
    "author_id": "author-slug（用於作者頁面）",
    "description_zh": "中文書籍簡介（150-300字，自行改寫不直接複製）",
    "description_en": "English description (100-200 words, paraphrased)",
    "source_urls": ["來源1", "來源2"],
    "youtube_url": "YouTube連結",
    "confidence": "high | medium | low",
    "needs_manual_review": false,
    "language": "zh | en"
  }
]
```

---

### PHASE 3：作者資料彙整

**目標**：建立每位作者的頁面資料，包含其所有收錄書籍

```python
def build_authors_index(books_enriched):
    authors = {}
    for book in books_enriched:
        author_id = book["author_id"]
        if author_id not in authors:
            authors[author_id] = {
                "author_id": author_id,
                "name": book["author"],
                "name_en": book["author_en"],
                "bio_zh": "",      # 待搜尋填入
                "bio_en": "",      # 待搜尋填入
                "books": [],
                "source_urls": [],
            }
        authors[author_id]["books"].append({
            "id": book["id"],
            "title": book["title"],
            "page_url": book["page_url"],
            "language": book["language"],
        })
    return authors
```

**作者介紹撰寫規範**：
- 中文：150-250 字，包含：身份背景、專業領域、代表著作、寫作風格/特色
- 英文：100-180 words，同上
- **必須改寫**，不得直接複製貼上任何來源的文字
- 若作者有多本書在網站中，在介紹末段提及「在本站收錄的著作包括...」

**輸出格式** `data/authors.json`：
```json
{
  "author-slug": {
    "author_id": "author-slug",
    "name": "作者中文姓名",
    "name_en": "Author English Name",
    "bio_zh": "作者中文介紹...",
    "bio_en": "Author English biography...",
    "books": [
      {
        "id": "book-slug",
        "title": "書名",
        "page_url": "https://waatax.github.io/wlearn/book/xxx",
        "language": "zh"
      }
    ],
    "source_urls": ["https://..."]
  }
}
```

---

### PHASE 4：寫回網站資料

**目標**：將補充好的資料，按照網站現有的資料格式寫回

**注意**：必須先確認網站資料格式，再決定寫回方式：

```bash
# Case A：若網站用 JSON 資料檔
# 直接 merge 更新對應欄位

# Case B：若網站用 Markdown Front Matter（Jekyll/Hugo）
# 更新每個 .md 檔案的 YAML header

# Case C：若網站是 React SPA，資料在 JS 中
# 找到 data 定義位置，更新 JSON 物件

# Case D：若需要透過 GitHub API 更新
curl -X PUT "https://api.github.com/repos/waatax/wlearn/contents/{path}" \
  -H "Authorization: token $GITHUB_TOKEN" \
  -d "{...}"
```

**寫回前的驗證清單**：
- [ ] 所有書籍都有 `author` 欄位（非空、非「Unknown」）
- [ ] 所有書籍都有 `description_zh` 或 `description_en`（至少一個）
- [ ] `author_id` 能對應到 `authors.json` 中的記錄
- [ ] 沒有任何欄位包含直接複製的版權文字（超過 15 字的引用）
- [ ] `needs_manual_review: true` 的書籍已記錄在 review log 中

---

## Agent 執行的完整循環

```
START
  │
  ▼
[Phase 1] 爬取網站書單
  │ 輸出：books_raw.json（N 本書）
  │
  ▼
[Phase 2] 逐書搜尋（每本書最多 5 次搜尋）
  │ 對每本書：
  │   ├─ 搜尋作者（YouTube描述 → 書店 → Google）
  │   ├─ 搜尋書籍簡介
  │   └─ 標記 confidence level
  │ 輸出：books_enriched.json
  │
  ▼
[Phase 3] 建立作者索引
  │   ├─ 合併同一作者的所有書籍
  │   └─ 搜尋每位作者的背景介紹
  │ 輸出：authors.json
  │
  ▼
[Validation] 驗證資料完整性
  │   ├─ 找出 confidence=low 的書籍 → 再搜尋一次
  │   └─ 找出 needs_manual_review → 記錄到 review_log.md
  │
  ▼
[Phase 4] 寫回網站資料
  │   ├─ 更新書籍資料（作者、簡介）
  │   └─ 更新/新增作者頁面
  │
  ▼
[Report] 輸出執行報告
  │   ├─ 成功更新：X 本書
  │   ├─ 需人工審查：Y 本書（附清單）
  │   └─ 作者頁面：Z 個
  │
  END
```

---

## 關鍵規則（Agent 必須遵守）

### 搜尋規則
1. **每本書最少搜尋 2 個不同來源**，確認作者姓名一致
2. YouTube 影片描述是最可靠的來源（因為是書籍推薦者/出版社放的）
3. 若書名有中英文版，都要搜尋
4. 不要假設作者——寧可標記為 low confidence 也不要猜測

### 內容撰寫規則
1. 書籍簡介**必須改寫**，不得直接複製任何來源文字（超過 15 字）
2. 簡介重點：本書核心主題 → 適合讀者 → 能獲得什麼
3. 作者介紹**必須改寫**，不得直接複製任何來源文字
4. 語氣客觀，不過度吹捧

### 迴圈防止卡住規則
1. 每本書的搜尋超過 **5 次**仍未找到作者 → 標記並跳過，繼續下一本
2. 某個搜尋來源連續失敗 **3 次** → 切換到下一個來源
3. 整個任務設定 **進度檢查點**：每完成 10 本書，儲存一次中間結果
4. 若 Phase 4 寫回失敗，保留 `books_enriched.json` 和 `authors.json`，人工再寫回

### 資料品質規則
```
confidence 判定標準：
  high   = 2+ 來源確認同一作者姓名
  medium = 只有 1 個來源確認
  low    = 間接推論（如從出版社頁面）
  skip   = 完全找不到 → needs_manual_review: true
```

---

## 快速啟動指令

Agent 收到任務後，依序執行：

```bash
# 1. 建立工作目錄
mkdir -p /tmp/wlearn_enrichment/{data,output,logs}

# 2. 偵察網站結構（找資料格式）
python3 scripts/01_crawl_site.py --url "https://waatax.github.io/wlearn" --output /tmp/wlearn_enrichment/data/books_raw.json

# 3. 執行書籍資訊搜尋（含斷點續傳）
python3 scripts/02_search_book_info.py \
  --input /tmp/wlearn_enrichment/data/books_raw.json \
  --output /tmp/wlearn_enrichment/data/books_enriched.json \
  --checkpoint /tmp/wlearn_enrichment/data/checkpoint.json \
  --max-searches-per-book 5

# 4. 建立作者頁面資料
python3 scripts/03_generate_author_pages.py \
  --input /tmp/wlearn_enrichment/data/books_enriched.json \
  --output /tmp/wlearn_enrichment/data/authors.json

# 5. 驗證並輸出最終資料
python3 scripts/04_update_site_data.py \
  --books /tmp/wlearn_enrichment/data/books_enriched.json \
  --authors /tmp/wlearn_enrichment/data/authors.json \
  --repo-path /tmp/wlearn_repo \
  --output /tmp/wlearn_enrichment/output/

# 6. 查看結果報告
cat /tmp/wlearn_enrichment/output/report.md
```

---

## 搜尋來源優先序（快速參考）

| 書籍語言 | 作者查詢 | 書籍簡介 | 作者介紹 |
|---------|---------|---------|---------|
| 中文    | books.com.tw > kobo.com/zh > google | books.com.tw > 博客來 > YouTube 描述 | google > wikipedia > 出版社網頁 |
| 英文    | amazon.com > kobo.com > google | amazon.com > goodreads > YouTube 描述 | google > wikipedia > 作者官網 |

---

## 常見問題排解

### Q：網站是 SPA，curl 抓不到書單
**A**：改用下面方式取得書單：
```bash
# 找 JS bundle 中的資料
curl -s "https://waatax.github.io/wlearn/" | grep -oP 'src="([^"]+\.js)"' | head -5
# 抓 JS bundle 並 grep 書名關鍵字
curl -s "{js_bundle_url}" | python3 -c "import sys,re; print(re.findall(r'title[\"\']\s*:\s*[\"\']([^\"\']+)', sys.stdin.read()))"
```

### Q：書名中英文都搜不到作者
**A**：嘗試以下備援策略：
1. 搜尋 YouTube URL 對應的頻道名稱（頻道可能就是出版社）
2. 搜尋「{書名} 推薦 誰寫的」
3. 標記 `needs_manual_review: true`，在報告中列出

### Q：同一作者的中英文名不一致
**A**：
- 中文書：以中文名為主，英文名放 `author_en`
- 英文書：以英文名為主，中文名放 `author_zh`
- author_id 使用英文 slug（`james-clear`, `yuval-harari`）統一識別

### Q：Agent 執行中途中斷
**A**：重新執行時加 `--checkpoint` 參數，從上次儲存點繼續，不重複已完成的書籍

---

## 輸出報告格式

任務完成後，產出 `report.md`：

```markdown
# WLearn 書籍更新報告

## 執行摘要
- 總書籍數：N 本
- 成功更新：X 本（作者 + 簡介齊全）
- 部分更新：Y 本（只有作者 or 只有簡介）
- 需人工審查：Z 本

## 作者頁面
- 新建作者頁面：A 個
- 更新作者頁面：B 個

## 需人工審查清單
| 書名 | 問題 | 已找到的部分資訊 |
|------|------|----------------|
| xxx  | 找不到作者 | 出版年份：2021 |

## 資料品質分佈
- Confidence High：N 本
- Confidence Medium：N 本
- Confidence Low：N 本
```
