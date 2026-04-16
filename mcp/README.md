# Selah MCP Server

Personal authoring + research MCP server for the Selah Bible study app. Exposes the same SQLite DB that powers Selah to Claude Desktop for:

- **Research** — cross-cutting queries across scripture, characters, themes, narrative units, commentary.
- **Authoring** — audit gaps in devotionals/themes/commentary, upsert AI-authored content with `source_tier='ai_assisted'` (gated by the existing tier-visibility setting in the app).

## Setup

```bash
cd mcp
npm install
```

Then add to your Claude Desktop config (`%APPDATA%\Claude\claude_desktop_config.json` on Windows, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "selah-authoring": {
      "command": "npx",
      "args": ["tsx", "C:/dev/selah-app/mcp/server.ts"],
      "env": {
        "SELAH_DB_PATH": "C:/dev/selah-app/data/selah.db"
      }
    }
  }
}
```

For dry-runs, point `SELAH_DB_PATH` at `data/selah-test.db` instead.

Restart Claude Desktop and the 18 tools appear under `selah-authoring`.

## Tools

### Reads (12)

- `search` — unified FTS5 + LIKE text search with entity filter
- `get_passage` — BSB text + footnotes + Strong's (always) + optional includes (cross-refs, themes, characters, commentary, devotionals, narrative, parallel translations). 40k-char cap with explicit truncation priority reported via `trimmed[]`
- `query_characters`, `query_character_interactions`, `get_character`
- `query_themes`, `get_theme`
- `query_narrative_units`
- `query_devotionals` — dual-purpose: filter for research or surface gaps via `minFieldLength`/`missingGoingDeeper`/`tagCountMax`/`groupBy`
- `query_commentary` — same, plus `missingFromSource` and `onlyThinlyCovered` audit modes
- `list_devotional_tags`, `list_climate_contexts`

### Writes (6) — all wrapped by `withWriteLog`

- `upsert_devotional` — update-in-place by id, atomic tag_map replacement, preserves `devotional_history` FKs
- `upsert_theme` — null-safe backfill (omitted fields preserved)
- `tag_passage_with_theme`, `untag_passage`
- `upsert_commentary_entry` — auto-attaches to `selah-ai` source
- `ensure_ai_commentary_source` — idempotent bootstrap / self-heal

## Write-ahead log

Every mutation appends a line to `mcp/logs/writes-YYYY-MM-DD.jsonl` **before** the DB write commits. Each line:

```json
{
  "ts": "2026-04-15T22:30:00.000Z",
  "tool": "upsert_devotional",
  "args": { /* tool input */ },
  "preImage": { /* row(s) before overwrite, or null on insert */ },
  "postImage": { /* row(s) after commit, or null on rollback */ },
  "sessionId": "...",
  "status": "committed" | "failed"
}
```

The log is append-only, human-readable, gitignored.

### Rollback playbook

To reverse a bad write:

```bash
# Find the entry
grep 'upsert_devotional' mcp/logs/writes-2026-04-15.jsonl | jq '. | select(.status=="committed")' | tail -1

# Manually restore the preImage via sqlite3 — example for a devotional:
sqlite3 data/selah.db "UPDATE devotionals SET title='...', context_brief='...', source_tier='...' WHERE id='...'"

# Or delete the row if it was a create:
sqlite3 data/selah.db "DELETE FROM devotionals WHERE id='...'; DELETE FROM devotional_tag_map WHERE devotional_id='...'"
```

Log retention is up to you — rotate or archive monthly.

## Scripts

- `npm run start` — run the server (what Claude Desktop calls)
- `npm run typecheck` — `tsc --noEmit`
- `npm run inspect` — launch the MCP Inspector web UI for interactive testing

## Design notes

- Reads are unified — `query_devotionals` is both research browsing and audit gap-finding, depending on which filters you pass. No separate audit tools.
- `search` handles text. Cross-table joins (character interactions, theme traces) live in dedicated `query_*` tools.
- `get_passage`'s truncation priority (`parallelTranslations → commentary → devotionals → characters → crossRefs → themes → narrativeUnit`) is documented in its tool description so the LLM can see what got dropped and call again with narrower flags rather than reason from a partial payload.
- No Prisma — direct `better-sqlite3` like `scripts/etl/`. Matches the existing pattern and avoids module boundary friction with the Next.js app.
