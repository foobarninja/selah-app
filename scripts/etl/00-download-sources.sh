#!/usr/bin/env bash
# ============================================================================
# Selah — Download Source Data
# ============================================================================
# Run this script manually in a separate terminal. The 1.5GB SQLite download
# takes time — don't burn agent context waiting on it.
#
# Usage: bash scripts/etl/00-download-sources.sh
# ============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="$SCRIPT_DIR/../../data/sources"

mkdir -p "$DATA_DIR"
cd "$DATA_DIR"

echo "═══════════════════════════════════════════"
echo "  Selah — Downloading Source Data"
echo "═══════════════════════════════════════════"
echo ""
echo "Target directory: $DATA_DIR"
echo ""

# ── 1. HelloAO English SQLite (~1.5GB) ──
if [ -f "bible.eng.db" ]; then
    echo "✓ bible.eng.db already exists ($(du -h bible.eng.db | cut -f1)), skipping download."
else
    echo "⏳ Downloading bible.eng.db (~1.5GB) — this will take a while..."
    curl -L --progress-bar -o bible.eng.db "https://bible.helloao.org/bible.eng.db"
    echo "✓ bible.eng.db downloaded ($(du -h bible.eng.db | cut -f1))"
fi
echo ""

# ── 2. Strong's Dictionaries (~5MB) ──
if [ -d "strongs" ]; then
    echo "✓ strongs/ directory already exists, skipping clone."
else
    echo "⏳ Cloning openscriptures/strongs dictionaries..."
    git clone --depth 1 https://github.com/openscriptures/strongs.git strongs
    echo "✓ strongs/ cloned"
fi
echo ""

# ── 3. HelloAO API metadata ──
echo "⏳ Fetching HelloAO API metadata..."

curl -sL -o available_translations.json "https://bible.helloao.org/api/available_translations.json"
echo "  ✓ available_translations.json"

curl -sL -o available_commentaries.json "https://bible.helloao.org/api/available_commentaries.json"
echo "  ✓ available_commentaries.json"

curl -sL -o available_datasets.json "https://bible.helloao.org/api/available_datasets.json"
echo "  ✓ available_datasets.json"

curl -sL -o tyndale_profiles.json "https://bible.helloao.org/api/c/tyndale/profiles.json"
echo "  ✓ tyndale_profiles.json"

echo ""
echo "═══════════════════════════════════════════"
echo "  Download complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "Files in $DATA_DIR:"
ls -lh "$DATA_DIR"
echo ""
echo "Next steps:"
echo "  1. Verify bible.eng.db is ~1.5GB"
echo "  2. Run the import scripts: npx tsx scripts/etl/01-import-translations.ts"
echo ""
