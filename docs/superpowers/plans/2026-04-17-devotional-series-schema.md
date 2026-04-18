# Devotional Series Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `DevotionalSeries` table and link devotionals to series via `seriesId` + `seriesOrder`, with both-or-neither CHECK and partial unique constraints enforced in SQL.

**Architecture:** Raw SQL migration script (matches existing `scripts/etl/` pattern) that rebuilds the `devotionals` table to add a CHECK constraint — SQLite can't `ALTER TABLE ADD CHECK`. Prisma schema is updated to match so the generated client knows the new fields, with a comment pointing to the migration for the constraints Prisma can't express. Three MCP tool changes follow the same pattern as existing `upsert_devotional`.

**Tech Stack:** TypeScript, better-sqlite3, Prisma (schema + client generation only, no Prisma Migrate), vitest, @modelcontextprotocol/sdk.

---

## Repo Layout Note

- **selah-app repo** (current directory): schema change, migration script, Prisma schema update, tests. Tasks 1–8.
- **selah-mcp-private repo** (`mcp/` directory, separate git repo): MCP tool changes. Tasks 9–12.

Each repo commits independently. The MCP server is gitignored from selah-app.

---

## File Structure

### selah-app
- **Create** `scripts/etl/add-devotional-series-schema.ts` — idempotent raw SQL migration (table rebuild + indexes + constraints).
- **Modify** `prisma/schema.prisma` — add `DevotionalSeries` model, add `seriesId` + `seriesOrder` + relation + compound index on `Devotional`, add comment pointing to migration script.
- **Create** `tests/lib/migrations/devotional-series.test.ts` — applies migration to a temp DB copy; verifies schema, constraints, and cascade behavior.

### selah-mcp-private
- **Modify** `tools/devotionalsWrites.ts` — add `upsert_devotional_series` tool, extend `upsert_devotional` schema with `seriesId` + `seriesOrder` + validation.
- **Modify** `tools/devotionals.ts` — add `seriesId` filter to `query_devotionals`, order by `series_order` when filter is set.

---

## Task 1: Scaffold migration script

**Files:**
- Create: `scripts/etl/add-devotional-series-schema.ts`

- [ ] **Step 1: Write the script skeleton**

```typescript
// scripts/etl/add-devotional-series-schema.ts
import Database from 'better-sqlite3'
import { resolve } from 'path'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

function migrate(db: Database.Database): void {
  const hasSeriesColumn = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('devotionals') WHERE name = 'series_id'`)
    .get() as { n: number }

  if (hasSeriesColumn.n > 0) {
    console.log('[migration] devotionals.series_id already exists — skipping.')
    return
  }

  console.log('[migration] adding devotional series schema...')
  // Subsequent tasks fill this in.
}

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
try {
  migrate(db)
  console.log('[migration] done.')
} finally {
  db.close()
}
```

- [ ] **Step 2: Verify it runs on a scratch copy**

```bash
cp data/selah.db data/selah-scratch.db
SELAH_DB_PATH=$(pwd)/data/selah-scratch.db npx tsx scripts/etl/add-devotional-series-schema.ts
```

Expected output: `[migration] adding devotional series schema...` then `[migration] done.`

- [ ] **Step 3: Commit**

```bash
git add scripts/etl/add-devotional-series-schema.ts
git commit -m "chore(etl): scaffold devotional series migration script"
```

---

## Task 2: Write failing migration test

**Files:**
- Create: `tests/lib/migrations/devotional-series.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/lib/migrations/devotional-series.test.ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-migration-test.db')

function runMigration(): void {
  execSync(
    `npx tsx scripts/etl/add-devotional-series-schema.ts`,
    { env: { ...process.env, SELAH_DB_PATH: TEST_DB }, stdio: 'pipe' }
  )
}

describe('devotional series migration', () => {
  beforeEach(() => {
    if (!existsSync(SOURCE_DB)) throw new Error('data/selah.db missing; migration test requires it')
    copyFileSync(SOURCE_DB, TEST_DB)
  })

  afterEach(() => {
    if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
    ['-wal', '-shm'].forEach((suffix) => {
      const p = TEST_DB + suffix
      if (existsSync(p)) unlinkSync(p)
    })
  })

  it('creates devotional_series table', () => {
    runMigration()
    const db = new Database(TEST_DB, { readonly: true })
    try {
      const cols = db.prepare(`SELECT name FROM pragma_table_info('devotional_series')`).all() as Array<{ name: string }>
      const names = cols.map((c) => c.name).sort()
      expect(names).toEqual(
        ['audience', 'created_at', 'description', 'id', 'season', 'source_notes', 'source_tier', 'title'].sort()
      )
    } finally {
      db.close()
    }
  })

  it('adds series_id and series_order columns to devotionals', () => {
    runMigration()
    const db = new Database(TEST_DB, { readonly: true })
    try {
      const cols = db.prepare(`SELECT name FROM pragma_table_info('devotionals') WHERE name IN ('series_id', 'series_order')`).all() as Array<{ name: string }>
      expect(cols.map((c) => c.name).sort()).toEqual(['series_id', 'series_order'])
    } finally {
      db.close()
    }
  })

  it('is idempotent on re-run', () => {
    runMigration()
    expect(() => runMigration()).not.toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/lib/migrations/devotional-series.test.ts
```

Expected: FAIL — `devotional_series` table doesn't exist, columns missing.

---

## Task 3: Implement the migration body

**Files:**
- Modify: `scripts/etl/add-devotional-series-schema.ts`

- [ ] **Step 1: Fill in the migrate() function**

Replace the stub body in `migrate()` with:

```typescript
function migrate(db: Database.Database): void {
  const hasSeriesColumn = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('devotionals') WHERE name = 'series_id'`)
    .get() as { n: number }

  if (hasSeriesColumn.n > 0) {
    console.log('[migration] devotionals.series_id already exists — skipping.')
    return
  }

  console.log('[migration] adding devotional series schema...')

  db.exec(`
    CREATE TABLE IF NOT EXISTS devotional_series (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      audience TEXT NOT NULL DEFAULT 'family',
      season TEXT,
      source_tier TEXT NOT NULL DEFAULT 'ai_assisted',
      source_notes TEXT,
      created_at TEXT NOT NULL DEFAULT ''
    );
  `)

  // SQLite can't ALTER TABLE ADD CHECK — rebuild the table.
  // Foreign keys must be OFF outside a transaction to avoid cascade triggering on DROP.
  db.pragma('foreign_keys = OFF')

  const rebuild = db.transaction(() => {
    db.exec(`
      CREATE TABLE devotionals_new (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        book_id TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        verse_start INTEGER NOT NULL,
        verse_end INTEGER NOT NULL,
        context_brief TEXT NOT NULL,
        modern_moment TEXT NOT NULL,
        conversation_starters TEXT NOT NULL,
        going_deeper TEXT,
        audience TEXT NOT NULL DEFAULT 'family',
        estimated_minutes INTEGER NOT NULL DEFAULT 5,
        season TEXT,
        day_of_year INTEGER,
        narrative_id TEXT,
        source_tier TEXT NOT NULL DEFAULT 'ai_assisted',
        source_notes TEXT,
        created_at TEXT NOT NULL DEFAULT '',
        -- series_id / series_order are detached on series delete by the
        -- trg_devotional_series_detach trigger (created below). NOT by
        -- ON DELETE SET NULL — that would null only series_id, violating
        -- the pairing CHECK on the line below.
        series_id TEXT,
        series_order INTEGER,
        FOREIGN KEY (book_id) REFERENCES books(id),
        FOREIGN KEY (narrative_id) REFERENCES narrative_units(id),
        FOREIGN KEY (series_id) REFERENCES devotional_series(id),
        CHECK ((series_id IS NULL) = (series_order IS NULL))
      );
    `)

    db.exec(`
      INSERT INTO devotionals_new (
        id, title, book_id, chapter, verse_start, verse_end,
        context_brief, modern_moment, conversation_starters, going_deeper,
        audience, estimated_minutes, season, day_of_year, narrative_id,
        source_tier, source_notes, created_at, series_id, series_order
      )
      SELECT
        id, title, book_id, chapter, verse_start, verse_end,
        context_brief, modern_moment, conversation_starters, going_deeper,
        audience, estimated_minutes, season, day_of_year, narrative_id,
        source_tier, source_notes, created_at, NULL, NULL
      FROM devotionals;
    `)

    db.exec(`DROP TABLE devotionals;`)
    db.exec(`ALTER TABLE devotionals_new RENAME TO devotionals;`)

    db.exec(`CREATE INDEX idx_devotionals_book_chapter_verse ON devotionals(book_id, chapter, verse_start);`)
    db.exec(`CREATE INDEX idx_devotionals_season ON devotionals(season);`)
    db.exec(`CREATE INDEX idx_devotionals_audience ON devotionals(audience);`)
    db.exec(`CREATE INDEX idx_devotionals_series_order ON devotionals(series_id, series_order);`)
    db.exec(`
      CREATE UNIQUE INDEX idx_devotional_series_order_unique
        ON devotionals(series_id, series_order)
        WHERE series_id IS NOT NULL;
    `)

    const fkViolations = db.prepare(`PRAGMA foreign_key_check`).all() as unknown[]
    if (fkViolations.length > 0) {
      throw new Error(`foreign_key_check failed after rebuild: ${JSON.stringify(fkViolations)}`)
    }
  })

  try {
    rebuild()
  } finally {
    db.pragma('foreign_keys = ON')
  }

  console.log('[migration] done.')
}
```

- [ ] **Step 2: Run test to verify it passes**

```bash
npx vitest run tests/lib/migrations/devotional-series.test.ts
```

Expected: 3 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add scripts/etl/add-devotional-series-schema.ts tests/lib/migrations/devotional-series.test.ts
git commit -m "feat(etl): devotional series migration (rebuild + CHECK + partial unique)"
```

---

## Task 4: Add constraint behavior tests

**Files:**
- Modify: `tests/lib/migrations/devotional-series.test.ts`

- [ ] **Step 1: Add constraint tests**

Append the following to the `describe('devotional series migration', ...)` block:

```typescript
  describe('constraints', () => {
    it('CHECK rejects series_id without series_order', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s1', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_id = 's1' WHERE id = ?`).run(existing.id)
        ).toThrow(/CHECK/i)
      } finally {
        db.close()
      }
    })

    it('CHECK rejects series_order without series_id', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_order = 10 WHERE id = ?`).run(existing.id)
        ).toThrow(/CHECK/i)
      } finally {
        db.close()
      }
    })

    it('CHECK accepts both NULL and both set', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s2', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 2`).all() as Array<{ id: string }>
        db.prepare(`UPDATE devotionals SET series_id = 's2', series_order = 10 WHERE id = ?`).run(existing[0].id)
        db.prepare(`UPDATE devotionals SET series_id = NULL, series_order = NULL WHERE id = ?`).run(existing[1].id)
        const row = db.prepare(`SELECT series_id, series_order FROM devotionals WHERE id = ?`).get(existing[0].id) as any
        expect(row.series_id).toBe('s2')
        expect(row.series_order).toBe(10)
      } finally {
        db.close()
      }
    })

    it('partial unique index rejects duplicate (series_id, series_order)', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s3', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 2`).all() as Array<{ id: string }>
        db.prepare(`UPDATE devotionals SET series_id = 's3', series_order = 10 WHERE id = ?`).run(existing[0].id)
        expect(() =>
          db.prepare(`UPDATE devotionals SET series_id = 's3', series_order = 10 WHERE id = ?`).run(existing[1].id)
        ).toThrow(/UNIQUE/i)
      } finally {
        db.close()
      }
    })

    it('partial unique index allows many (NULL, NULL) rows', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        const count = db.prepare(`SELECT COUNT(*) AS n FROM devotionals WHERE series_id IS NULL`).get() as { n: number }
        expect(count.n).toBeGreaterThan(1)
      } finally {
        db.close()
      }
    })

    it('ON DELETE SET NULL nulls out both columns on series delete', () => {
      runMigration()
      const db = new Database(TEST_DB)
      try {
        db.pragma('foreign_keys = ON')
        db.exec(`INSERT INTO devotional_series (id, title, description) VALUES ('s4', 't', 'd');`)
        const existing = db.prepare(`SELECT id FROM devotionals LIMIT 1`).get() as { id: string }
        db.prepare(`UPDATE devotionals SET series_id = 's4', series_order = 10 WHERE id = ?`).run(existing.id)
        db.prepare(`DELETE FROM devotional_series WHERE id = 's4'`).run()
        const row = db.prepare(`SELECT series_id, series_order FROM devotionals WHERE id = ?`).get(existing.id) as any
        expect(row.series_id).toBeNull()
        // CHECK requires both null after cascade — this will only pass if ON DELETE SET NULL
        // also nulls series_order, which by default it does NOT. See Step 2 below if this fails.
        expect(row.series_order).toBeNull()
      } finally {
        db.close()
      }
    })
  })
```

- [ ] **Step 2: Run constraint tests — the cascade test will fail**

```bash
npx vitest run tests/lib/migrations/devotional-series.test.ts
```

Expected: 5 of 6 constraint tests PASS. The cascade test fails because nothing is nulling `series_order` when the series is deleted — the FK is declared without `ON DELETE SET NULL`, so the DELETE fails outright (child row still references the series). This is the expected discovery: we need a BEFORE-DELETE trigger that atomically nulls both columns before the delete proceeds.

- [ ] **Step 3: Add the BEFORE DELETE trigger**

Add this inside the `rebuild` transaction, after the index creation (before `PRAGMA foreign_key_check`):

```typescript
    db.exec(`
      CREATE TRIGGER trg_devotional_series_detach
      BEFORE DELETE ON devotional_series
      FOR EACH ROW
      BEGIN
        UPDATE devotionals
        SET series_id = NULL, series_order = NULL
        WHERE series_id = OLD.id;
      END;
    `)
```

The trigger nulls **both** columns in a single UPDATE — the CHECK constraint `(series_id IS NULL) = (series_order IS NULL)` evaluates at statement boundary, and since both are NULL after the update, it's satisfied. After the trigger runs, no child rows reference the soon-to-be-deleted series, so the DELETE proceeds cleanly.

Why not `ON DELETE SET NULL` on the FK? Because it would only null `series_id` — `series_order` would remain set, violating the CHECK. The all-in-one trigger is the correct approach given our integrity invariant.

- [ ] **Step 4: Re-run tests**

```bash
npx vitest run tests/lib/migrations/devotional-series.test.ts
```

Expected: all 9 tests (3 original + 6 constraint) PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/etl/add-devotional-series-schema.ts tests/lib/migrations/devotional-series.test.ts
git commit -m "feat(etl): detach devotionals from series via BEFORE DELETE trigger"
```

---

## Task 5: Apply migration to dev DB

**Files:**
- None (runtime action)

- [ ] **Step 1: Back up dev DB**

```bash
cp data/selah.db "data/selah.pre-series-$(date +%Y%m%d-%H%M%S).db.bak"
```

- [ ] **Step 2: Run migration**

```bash
npx tsx scripts/etl/add-devotional-series-schema.ts
```

Expected output: `[migration] adding devotional series schema...` then `[migration] done.`

- [ ] **Step 3: Verify schema**

```bash
sqlite3 data/selah.db ".schema devotional_series"
sqlite3 data/selah.db ".schema devotionals" | grep -E "series_id|series_order|CHECK"
sqlite3 data/selah.db "SELECT COUNT(*) FROM devotionals;"
```

Expected: `devotional_series` table shown; `devotionals` has `series_id`, `series_order`, and the CHECK clause; row count matches pre-migration.

---

## Task 6: Update Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: Add DevotionalSeries model**

Insert this model immediately after the existing `model Devotional { ... }` block (around line 454):

```prisma
// Series detachment is handled by a BEFORE DELETE trigger (trg_devotional_series_detach,
// defined in scripts/etl/add-devotional-series-schema.ts) that atomically nulls BOTH
// series_id and series_order on all child devotionals before the series row is deleted.
// The trigger — not ON DELETE SET NULL — is the correct mechanism because nulling only
// series_id would violate the pairing CHECK constraint.
//
// Additionally, Prisma cannot express:
//   - the partial unique index UNIQUE(series_id, series_order) WHERE series_id IS NOT NULL
//   - the CHECK ((series_id IS NULL) = (series_order IS NULL))
// Both live in the migration script.
model DevotionalSeries {
  id          String  @id
  title       String
  description String
  audience    String  @default("family")
  season      String?
  sourceTier  String  @default("ai_assisted") @map("source_tier")
  sourceNotes String? @map("source_notes")
  createdAt   String  @default("") @map("created_at")

  devotionals Devotional[]

  @@map("devotional_series")
}
```

- [ ] **Step 2: Extend Devotional model**

Modify the `Devotional` model. Replace its body with:

```prisma
model Devotional {
  id                   String  @id
  title                String
  bookId               String  @map("book_id")
  chapter              Int
  verseStart           Int     @map("verse_start")
  verseEnd             Int     @map("verse_end")
  contextBrief         String  @map("context_brief")
  modernMoment         String  @map("modern_moment")
  conversationStarters String  @map("conversation_starters")
  goingDeeper          String? @map("going_deeper")
  audience             String  @default("family")
  estimatedMinutes     Int     @default(5) @map("estimated_minutes")
  season               String?
  dayOfYear            Int?    @map("day_of_year")
  narrativeId          String? @map("narrative_id")
  sourceTier           String  @default("ai_assisted") @map("source_tier")
  sourceNotes          String? @map("source_notes")
  createdAt            String  @default("") @map("created_at")

  // NOTE: seriesId + seriesOrder are bound by CHECK ((series_id IS NULL) = (series_order IS NULL))
  // and a partial UNIQUE index on (series_id, series_order) WHERE series_id IS NOT NULL.
  // Both constraints live in scripts/etl/add-devotional-series-schema.ts because Prisma's schema
  // language cannot express CHECK clauses or partial unique indexes.
  seriesId    String? @map("series_id")
  seriesOrder Int?    @map("series_order")

  book          Book                @relation(fields: [bookId], references: [id])
  narrativeUnit NarrativeUnit?      @relation(fields: [narrativeId], references: [id])
  series        DevotionalSeries?   @relation(fields: [seriesId], references: [id])
  tagMaps       DevotionalTagMap[]
  history       DevotionalHistory[]

  @@index([bookId, chapter, verseStart])
  @@index([season])
  @@index([audience])
  @@index([seriesId, seriesOrder])
  @@map("devotionals")
}
```

- [ ] **Step 3: Regenerate Prisma client**

```bash
npx prisma generate
```

Expected: `✔ Generated Prisma Client` in under 10 seconds.

- [ ] **Step 4: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors, or only pre-existing unrelated errors.

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma
git commit -m "feat(schema): add DevotionalSeries model + series fields on Devotional"
```

---

## Task 7: Update spec/plan commit hygiene

**Files:**
- None (sanity checkpoint)

- [ ] **Step 1: Confirm all selah-app-side work is on the branch**

```bash
git log --oneline master..HEAD
```

Expected: commits for scaffold, migration + tests, trigger + tests, Prisma schema, design spec, plan.

- [ ] **Step 2: Run full app test suite to confirm no regressions**

```bash
npx vitest run
```

Expected: all tests pass (or only pre-existing unrelated failures).

---

## Task 8: Commit the plan doc

**Files:**
- Commit: `docs/superpowers/plans/2026-04-17-devotional-series-schema.md`

- [ ] **Step 1: Commit**

```bash
git add -f docs/superpowers/plans/2026-04-17-devotional-series-schema.md
git commit -m "docs: devotional series schema implementation plan"
```

---

## Task 9: Scaffold upsert_devotional_series MCP tool

**Working directory:** `mcp/` (selah-mcp-private repo).

**Files:**
- Modify: `mcp/tools/devotionalsWrites.ts`

- [ ] **Step 1: Add the tool registration**

Add this import and schema at the top of the file (after existing imports and `upsertSchema`):

```typescript
const seriesUpsertSchema = {
  id: z.string().describe("Stable series id, e.g. 'tween-friends-arc'."),
  title: z.string().min(1),
  description: z.string().min(1).describe("Short pitch for the series — shown on any UI surface."),
  audience: z.string().default("family"),
  season: z.string().nullable().optional(),
  model: z.string().optional().describe("Model label for sourceNotes provenance."),
}
```

- [ ] **Step 2: Register the tool inside `registerDevotionalWrites`**

Add this registration block inside the existing `registerDevotionalWrites(server)` function, after the existing `upsert_devotional` registration:

```typescript
  server.registerTool(
    "upsert_devotional_series",
    {
      description: "Create or update a DevotionalSeries row in place (same id). Stamps source_tier='ai_assisted' and appends a revision marker to sourceNotes on update.",
      inputSchema: seriesUpsertSchema,
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_devotional_series",
        args,
        () => {
          const existing = db.prepare(`SELECT * FROM devotional_series WHERE id = ?`).get(args.id) ?? null;
          return existing ? { series: existing } : null;
        },
        () => {
          const existing = db.prepare(`SELECT source_notes FROM devotional_series WHERE id = ?`).get(args.id) as { source_notes: string | null } | undefined;
          const newNotes = appendRevisionMarker(
            existing?.source_notes ?? null,
            buildSourceNotes({ model: args.model, revisionOf: existing ? args.id : null })
          );
          const nowIso = new Date().toISOString();

          if (existing) {
            db.prepare(`
              UPDATE devotional_series SET
                title=?, description=?, audience=?, season=?,
                source_tier=?, source_notes=?
              WHERE id=?
            `).run(
              args.title, args.description, args.audience, args.season ?? null,
              AI_TIER, newNotes, args.id
            );
          } else {
            db.prepare(`
              INSERT INTO devotional_series
                (id, title, description, audience, season, source_tier, source_notes, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              args.id, args.title, args.description, args.audience, args.season ?? null,
              AI_TIER, newNotes, nowIso
            );
          }
          return { created: !existing, id: args.id };
        },
        () => {
          const series = db.prepare(`SELECT * FROM devotional_series WHERE id = ?`).get(args.id);
          return { series };
        }
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
```

- [ ] **Step 3: Restart MCP server and verify**

Exit and restart Claude Desktop (or Claude Code session if wired there) so the MCP server reloads. Then from the client:

```
upsert_devotional_series({
  id: "test-series-1",
  title: "Test Series",
  description: "Scratch row for verification.",
  audience: "family",
  model: "claude-opus-4-7"
})
```

Expected: JSON response with `created: true`, `id: "test-series-1"`, a `series` object with `source_tier: 'ai_assisted'` and a `source_notes` value.

Verify directly via SQL:

```bash
sqlite3 data/selah.db "SELECT id, title, source_tier FROM devotional_series WHERE id = 'test-series-1';"
```

Expected: one row with those values.

Now verify upsert semantics on the same id — it should update in place, preserving `created_at` and appending a revision marker to `source_notes`:

```
upsert_devotional_series({
  id: "test-series-1",
  title: "Test Series (revised)",
  description: "Scratch row, second call — should UPDATE not conflict.",
  audience: "family",
  model: "claude-opus-4-7"
})
```

Expected: JSON response with `created: false`, `id: "test-series-1"`. Then verify in SQL:

```bash
sqlite3 data/selah.db "SELECT id, title, created_at, source_notes FROM devotional_series WHERE id = 'test-series-1';"
```

Expected: `title` reflects the revised value, `created_at` is unchanged from the first call, `source_notes` contains both the original provenance string and a revision marker.

Clean up:

```bash
sqlite3 data/selah.db "DELETE FROM devotional_series WHERE id = 'test-series-1';"
```

- [ ] **Step 4: Commit in MCP repo**

```bash
cd mcp && git add tools/devotionalsWrites.ts
git commit -m "feat(mcp): add upsert_devotional_series tool"
cd ..
```

---

## Task 10: Extend upsert_devotional with series params

**Working directory:** `mcp/`.

**Files:**
- Modify: `mcp/tools/devotionalsWrites.ts`

- [ ] **Step 1: Add series fields to upsertSchema**

Extend the existing `upsertSchema` object — add two lines before `tagMappings`:

```typescript
  seriesId: z.string().nullable().optional().describe("Attach to a DevotionalSeries. Must be provided together with seriesOrder."),
  seriesOrder: z.number().int().positive().nullable().optional().describe("Sort key within the series. Use sparse numbering (10, 20, 30) to allow inserts between parts. Must be provided together with seriesId."),
```

- [ ] **Step 2: Add validation + include columns in INSERT/UPDATE**

Inside the existing `upsert_devotional` handler, at the top of the `async (args) => {` function body (before the `withWriteLog` call), add validation:

```typescript
      // Validate series pairing before touching the DB — mirrors the CHECK constraint with a friendlier error.
      const sid = args.seriesId ?? null;
      const sord = args.seriesOrder ?? null;
      if ((sid === null) !== (sord === null)) {
        throw new Error(`upsert_devotional: seriesId and seriesOrder must both be provided or both omitted. Got seriesId=${JSON.stringify(sid)}, seriesOrder=${JSON.stringify(sord)}.`);
      }

      if (sid !== null) {
        const exists = db.prepare(`SELECT 1 FROM devotional_series WHERE id = ?`).get(sid);
        if (!exists) throw new Error(`upsert_devotional: seriesId '${sid}' does not exist. Call upsert_devotional_series first.`);

        // Guard against collisions (unique index would also catch, but this message is clearer).
        const collision = db
          .prepare(`SELECT id FROM devotionals WHERE series_id = ? AND series_order = ? AND id != ?`)
          .get(sid, sord, args.id) as { id: string } | undefined;
        if (collision) {
          throw new Error(`upsert_devotional: series '${sid}' already has a devotional at order ${sord} (id='${collision.id}'). Use a different seriesOrder or detach the existing devotional first.`);
        }
      }
```

- [ ] **Step 3: Update the INSERT statement to include series columns**

Inside the same handler, find the `INSERT INTO devotionals (...)` block. Replace the column list, placeholders, and `.run(...)` args with:

```typescript
              db.prepare(`
                INSERT INTO devotionals
                  (id, title, book_id, chapter, verse_start, verse_end,
                   context_brief, modern_moment, conversation_starters, going_deeper,
                   audience, estimated_minutes, season, day_of_year, narrative_id,
                   source_tier, source_notes, created_at, series_id, series_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              `).run(
                args.id, args.title, args.bookId, args.chapter, args.verseStart, args.verseEnd,
                args.contextBrief, args.modernMoment, args.conversationStarters, args.goingDeeper ?? null,
                args.audience, args.estimatedMinutes, args.season ?? null, args.dayOfYear ?? null, args.narrativeId ?? null,
                AI_TIER, newNotes, nowIso, sid, sord
              );
```

- [ ] **Step 4: Update the UPDATE statement to include series columns**

Replace the `UPDATE devotionals SET ...` block with:

```typescript
              db.prepare(`
                UPDATE devotionals SET
                  title=?, book_id=?, chapter=?, verse_start=?, verse_end=?,
                  context_brief=?, modern_moment=?, conversation_starters=?, going_deeper=?,
                  audience=?, estimated_minutes=?, season=?, day_of_year=?, narrative_id=?,
                  source_tier=?, source_notes=?, series_id=?, series_order=?
                WHERE id=?
              `).run(
                args.title, args.bookId, args.chapter, args.verseStart, args.verseEnd,
                args.contextBrief, args.modernMoment, args.conversationStarters, args.goingDeeper ?? null,
                args.audience, args.estimatedMinutes, args.season ?? null, args.dayOfYear ?? null, args.narrativeId ?? null,
                AI_TIER, newNotes, sid, sord,
                args.id
              );
```

- [ ] **Step 5: Verify via MCP client**

Restart the MCP server. Then:

```
upsert_devotional_series({
  id: "verify-series",
  title: "Verify",
  description: "Verify flow.",
  audience: "family",
  model: "claude-opus-4-7"
})

// Pick any existing devotional id for the attach.
upsert_devotional({ id: "<existing-id>", /* ...all existing fields... */, seriesId: "verify-series", seriesOrder: 10 })

// Expect: success. Now try pairing violation:
upsert_devotional({ id: "<another-id>", /* ... */, seriesId: "verify-series" /* no seriesOrder */ })
// Expect: error "seriesId and seriesOrder must both be provided..."

// Now try FK violation:
upsert_devotional({ id: "<another-id>", /* ... */, seriesId: "nope", seriesOrder: 10 })
// Expect: error "seriesId 'nope' does not exist..."

// Now try collision:
upsert_devotional({ id: "<another-id>", /* ... */, seriesId: "verify-series", seriesOrder: 10 })
// Expect: error "already has a devotional at order 10"
```

Clean up test row:

```bash
sqlite3 data/selah.db "UPDATE devotionals SET series_id=NULL, series_order=NULL WHERE series_id='verify-series'; DELETE FROM devotional_series WHERE id='verify-series';"
```

- [ ] **Step 6: Commit in MCP repo**

```bash
cd mcp && git add tools/devotionalsWrites.ts
git commit -m "feat(mcp): extend upsert_devotional with seriesId + seriesOrder + validation"
cd ..
```

---

## Task 11: Add seriesId filter to query_devotionals

**Working directory:** `mcp/`.

**Files:**
- Modify: `mcp/tools/devotionals.ts`

- [ ] **Step 1: Add seriesId to querySchema**

Insert this line into the existing `querySchema` object, after `narrativeId`:

```typescript
  seriesId: z.string().optional().describe("Filter to devotionals in a given DevotionalSeries. Results are ordered by series_order ASC when set."),
```

- [ ] **Step 2: Apply filter + reorder in handleList**

Inside `handleList`, after the `narrativeId` filter line, add:

```typescript
  if (args.seriesId) { where.push("d.series_id = ?"); params.push(args.seriesId); }
```

Then modify the `orderBy` derivation to prefer `series_order` when the filter is active. Replace:

```typescript
  const orderBy =
    args.sortBy === "weakness" ? `weaknessScore DESC` :
    args.sortBy === "created" ? `d.created_at DESC` :
    args.sortBy === "coverage" ? `tagCount ASC, weaknessScore DESC` :
    `d.book_id, d.chapter, d.verse_start`;
```

with:

```typescript
  const orderBy =
    args.sortBy === "weakness" ? `weaknessScore DESC` :
    args.sortBy === "created" ? `d.created_at DESC` :
    args.sortBy === "coverage" ? `tagCount ASC, weaknessScore DESC` :
    args.seriesId ? `d.series_order ASC NULLS LAST` :
    `d.book_id, d.chapter, d.verse_start`;
```

- [ ] **Step 3: Include series fields in the SELECT and response mapper**

In the `SELECT` clause inside `handleList`, add `d.series_id, d.series_order` to the column list. Then in the response mapper (where `rows.map` returns each devotional), add:

```typescript
      seriesId: r.series_id,
      seriesOrder: r.series_order,
```

- [ ] **Step 4: Verify via MCP client**

Restart MCP server. Create a series with two attached devotionals (reuse the pattern from Task 10), then:

```
query_devotionals({ seriesId: "<series-id>" })
```

Expected: response shows the two devotionals, sorted by `seriesOrder` ASC, each with `seriesId` and `seriesOrder` populated.

Clean up any test data.

- [ ] **Step 5: Commit in MCP repo**

```bash
cd mcp && git add tools/devotionals.ts
git commit -m "feat(mcp): add seriesId filter to query_devotionals with ordered output"
cd ..
```

---

## Task 12: End-to-end verification (manual)

**Files:**
- None (runtime verification)

- [ ] **Step 1: Author the first real series**

Using Claude Desktop or the Claude Code MCP client, author a real multi-part series (e.g., the tween-friends arc) end-to-end:

1. Call `upsert_devotional_series` to create the series row.
2. Call `upsert_devotional` four times with `seriesOrder: 10, 20, 30, 40`.
3. Call `query_devotionals({ seriesId: "<id>" })` — expect four rows ordered 10→40.

- [ ] **Step 2: Verify DB state directly**

```bash
sqlite3 data/selah.db "SELECT d.id, d.title, d.series_id, d.series_order FROM devotionals d WHERE d.series_id = '<id>' ORDER BY d.series_order;"
```

Expected: four rows, `series_id` set on all, `series_order` = 10, 20, 30, 40.

- [ ] **Step 3: Verify write-ahead log captured everything**

```bash
grep upsert_devotional mcp/logs/writes-$(date +%Y-%m-%d).jsonl | tail -5
```

Expected: five lines (1 series + 4 devotionals), each with `preImage`, `postImage`, and `status: "committed"`.

---

## Self-Review Summary

**Spec coverage:**
- `DevotionalSeries` table — Task 3.
- `seriesId` + `seriesOrder` on Devotional — Task 3 (SQL), Task 6 (Prisma schema).
- Series detachment on delete — Task 4 adds a BEFORE DELETE trigger that atomically nulls both `series_id` and `series_order` (not `ON DELETE SET NULL`, which would break the pairing CHECK).
- CHECK `(series_id IS NULL) = (series_order IS NULL)` — Task 3, verified Task 4.
- Partial unique index — Task 3, verified Task 4.
- Sparse ordering convention — documented in spec; enforced by convention, not schema.
- `upsert_devotional_series` tool — Task 9.
- `upsert_devotional` extension — Task 10.
- `query_devotionals` seriesId filter — Task 11.
- Prisma schema comments pointing to migration — Task 6.
- Both-or-neither validation at MCP layer — Task 10.
- FK pre-check at MCP layer — Task 10.
- Order collision pre-check at MCP layer — Task 10.

**Placeholder scan:** no TBDs, TODOs, or handwaved steps. Every code block is complete.

**Type consistency:** `seriesId`/`seriesOrder` (camelCase in TypeScript / Prisma) vs `series_id`/`series_order` (snake_case in SQL and better-sqlite3 row results) — consistent throughout.
