#!/usr/bin/env bash
# ============================================================
# WLearn 書籍資訊自動更新 — 一鍵執行腳本
# 用法：./run_all.sh [repo_path]
# ============================================================

set -e

WORK_DIR="/tmp/wlearn_enrichment"
SITE_URL="https://waatax.github.io/wlearn"
REPO_PATH="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "============================================"
echo " WLearn 書籍資訊更新 Agent"
echo " $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================"

# 建立工作目錄
mkdir -p "$WORK_DIR"/{data,output,logs}

# ──────────────────────────────────────────
# Phase 1：爬取書單
# ──────────────────────────────────────────
echo ""
echo "[Phase 1] 爬取網站書單..."
if [ -n "$REPO_PATH" ] && [ -d "$REPO_PATH" ]; then
    python3 "$SCRIPT_DIR/01_crawl_site.py" \
        --url "$SITE_URL" \
        --repo "$REPO_PATH" \
        --output "$WORK_DIR/data/books_raw.json" \
        2>&1 | tee "$WORK_DIR/logs/phase1.log"
else
    python3 "$SCRIPT_DIR/01_crawl_site.py" \
        --url "$SITE_URL" \
        --output "$WORK_DIR/data/books_raw.json" \
        2>&1 | tee "$WORK_DIR/logs/phase1.log"
fi

# 確認 Phase 1 成功
if [ ! -f "$WORK_DIR/data/books_raw.json" ]; then
    echo "[ERROR] Phase 1 失敗：未生成書單檔案"
    echo "[HINT] 請手動建立 $WORK_DIR/data/books_raw.json"
    exit 1
fi

BOOK_COUNT=$(python3 -c "import json; d=json.load(open('$WORK_DIR/data/books_raw.json')); print(len(d))")
echo "[OK] 找到 $BOOK_COUNT 本書"

# ──────────────────────────────────────────
# Phase 2：搜尋書籍資訊（支援斷點續傳）
# ──────────────────────────────────────────
echo ""
echo "[Phase 2] 搜尋書籍作者和簡介..."
python3 "$SCRIPT_DIR/02_search_book_info.py" \
    --input "$WORK_DIR/data/books_raw.json" \
    --output "$WORK_DIR/data/books_enriched.json" \
    --checkpoint "$WORK_DIR/data/checkpoint.json" \
    --max-searches-per-book 5 \
    --batch-save 10 \
    2>&1 | tee "$WORK_DIR/logs/phase2.log"

if [ ! -f "$WORK_DIR/data/books_enriched.json" ]; then
    echo "[ERROR] Phase 2 失敗"
    exit 1
fi

# ──────────────────────────────────────────
# Phase 3：建立作者頁面
# ──────────────────────────────────────────
echo ""
echo "[Phase 3] 建立作者頁面資料..."
python3 "$SCRIPT_DIR/03_generate_author_pages.py" \
    --input "$WORK_DIR/data/books_enriched.json" \
    --output "$WORK_DIR/data/authors.json" \
    2>&1 | tee "$WORK_DIR/logs/phase3.log"

if [ ! -f "$WORK_DIR/data/authors.json" ]; then
    echo "[ERROR] Phase 3 失敗"
    exit 1
fi

# ──────────────────────────────────────────
# Phase 4：驗證並輸出
# ──────────────────────────────────────────
echo ""
echo "[Phase 4] 驗證資料並生成輸出..."
python3 "$SCRIPT_DIR/04_update_site_data.py" \
    --books "$WORK_DIR/data/books_enriched.json" \
    --authors "$WORK_DIR/data/authors.json" \
    --output "$WORK_DIR/output" \
    2>&1 | tee "$WORK_DIR/logs/phase4.log"

# ──────────────────────────────────────────
# 顯示報告摘要
# ──────────────────────────────────────────
echo ""
echo "============================================"
echo " 執行完成！"
echo "============================================"
if [ -f "$WORK_DIR/output/report.md" ]; then
    head -40 "$WORK_DIR/output/report.md"
fi
echo ""
echo "完整報告：$WORK_DIR/output/report.md"
echo "網站資料：$WORK_DIR/output/site_data_patch.json"
echo "作者頁面：$WORK_DIR/output/author_pages/"
