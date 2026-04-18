# Devotional Series UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface `DevotionalSeries` in the Daily Bread UI with a filter-aware Series section in Browse, a tappable series badge in the reading view, and a dedicated `/daily-bread/series/[id]` detail page.

**Architecture:** One data-layer extension adds `searchSeries()` and `getSeriesById()` alongside the existing devotional queries. The existing search API route returns both `{ devotionals, series }`. A new series detail API route + page route handle the standalone series view. The Browse client splits results into a Series section (rendered above the flat list, hidden when empty) and the existing devotional list. A dedicated `SeriesBadge` mounts on the reading view whenever `devotional.seriesId` is set.

**Tech Stack:** Next.js 16 (server components + client components), TypeScript, Prisma, better-sqlite3 for raw queries, vitest, existing `@/lib/daily-bread/queries` conventions.

---

## File Structure

### New files
- `src/components/daily-bread/SeriesCard.tsx` — collapsed+expanded series card for Browse
- `src/components/daily-bread/SeriesBadge.tsx` — tappable badge for reading view
- `src/components/daily-bread/SeriesDetail.tsx` — presentational detail view
- `src/app/(shell)/daily-bread/series/[id]/page.tsx` — server component fetch + render
- `src/app/(shell)/daily-bread/series/[id]/SeriesDetailClient.tsx` — client wrapper with router nav
- `src/app/api/devotionals/series/[id]/route.ts` — GET handler for series detail
- `tests/lib/daily-bread/searchSeries.test.ts` — data-layer tests for searchSeries
- `tests/lib/daily-bread/getSeriesById.test.ts` — data-layer tests for getSeriesById

### Modified files
- `src/components/daily-bread/types.ts` — add `SeriesSummary`, `SeriesDetail`, `SeriesPart`; extend `Devotional` with `seriesId` + `seriesMeta`
- `src/lib/daily-bread/queries.ts` — add `searchSeries`, `getSeriesById`; extend `mapDevotional` to populate `seriesMeta`
- `src/app/api/devotionals/search/route.ts` — return `{ devotionals, series }`
- `src/components/daily-bread/DevotionalBrowse.tsx` — render Series section + integrate filter splitting
- `src/components/daily-bread/DailyBreadReading.tsx` — mount SeriesBadge at top; add series completion copy
- `src/app/(shell)/daily-bread/DailyBreadClient.tsx` — thread any new handlers (if needed; likely minimal)

---

## Task 1: Add new types

**Files:**
- Modify: `src/components/daily-bread/types.ts`

- [ ] **Step 1: Add series types**

Open `src/components/daily-bread/types.ts`. After the existing `DevotionalBook` interface (around the interface cluster near the bottom of the ── Data interfaces ── section), add:

```ts
export interface SeriesPart {
  id: string
  seriesOrder: number
  title: string
  passageRef: string
  estimatedMinutes: number
  completedAt: string | null
}

export interface SeriesSummary {
  id: string
  title: string
  description: string
  audience: string
  season: string | null
  partCount: number
  totalEstimatedMinutes: number
  tags: string[]
  bridgePart: {
    seriesOrder: number
    title: string
    passageRef: string
    devotionalId: string
  } | null
}

export interface SeriesDetail extends SeriesSummary {
  parts: SeriesPart[]
}
```

Then modify the existing `Devotional` interface — add these two optional fields after `goingDeeper`:

```ts
  seriesId?: string | null
  seriesMeta?: { seriesOrder: number; seriesTitle: string; partCount: number } | null
```

Note: `audience` on `SeriesSummary` is `string` (not `AudienceLevel`) because the DB column permits values outside the current `AudienceLevel` enum (e.g. 'tween' if an author ever sets it there). UI code should treat `audience` as display-only.

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/daily-bread/types.ts
git commit -m "feat(types): add SeriesSummary, SeriesDetail, SeriesPart types"
```

---

## Task 2: Write failing test for searchSeries

**Files:**
- Create: `tests/lib/daily-bread/searchSeries.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/lib/daily-bread/searchSeries.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-search-series-test.db')

beforeAll(() => {
  if (!existsSync(SOURCE_DB)) throw new Error('data/selah.db missing; test requires it')
  copyFileSync(SOURCE_DB, TEST_DB)
  process.env.SELAH_DB_PATH_OVERRIDE = TEST_DB

  const db = new Database(TEST_DB)
  try {
    // Clean slate: remove any pre-existing test series.
    db.exec(`DELETE FROM devotional_series WHERE id LIKE 'test-series-%'`)

    // Insert one test series + attach 2 existing devotionals to it across two books.
    db.exec(`
      INSERT INTO devotional_series (id, title, description, audience, season, source_tier, created_at)
      VALUES ('test-series-1', 'Test Arc', 'Scratch arc for tests.', 'family', NULL, 'ai_assisted', '2026-04-17T00:00:00.000Z');
    `)

    const devs = db.prepare(`
      SELECT id, book_id FROM devotionals
      WHERE series_id IS NULL
      ORDER BY book_id
      LIMIT 10
    `).all() as Array<{ id: string; book_id: string }>

    const firstBookDev = devs[0]
    const differentBookDev = devs.find((d) => d.book_id !== firstBookDev.book_id)
    if (!differentBookDev) throw new Error('test requires devotionals from at least 2 books')

    db.prepare(`UPDATE devotionals SET series_id = 'test-series-1', series_order = 10 WHERE id = ?`).run(firstBookDev.id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-series-1', series_order = 20 WHERE id = ?`).run(differentBookDev.id)
  } finally {
    db.close()
  }
})

afterAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
  ;['-wal', '-shm'].forEach((s) => {
    const p = TEST_DB + s
    if (existsSync(p)) unlinkSync(p)
  })
  delete process.env.SELAH_DB_PATH_OVERRIDE
})

describe('searchSeries', () => {
  it('returns all series with no filters', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const results = await searchSeries({})
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.title).toBe('Test Arc')
    expect(testRow!.partCount).toBe(2)
    expect(testRow!.totalEstimatedMinutes).toBeGreaterThan(0)
    expect(testRow!.bridgePart).toBeNull()
  })

  it('populates bridgePart when a book filter matches only one child', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    // Pick the book of the second attached devotional (seriesOrder=20).
    const db = new Database(TEST_DB, { readonly: true })
    const part2 = db.prepare(`SELECT book_id, id FROM devotionals WHERE series_id = 'test-series-1' AND series_order = 20`).get() as { book_id: string; id: string }
    db.close()

    const results = await searchSeries({ bookId: part2.book_id })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.bridgePart).not.toBeNull()
    expect(testRow!.bridgePart!.seriesOrder).toBe(20)
    expect(testRow!.bridgePart!.devotionalId).toBe(part2.id)
  })

  it('populates bridgePart with the lowest seriesOrder match when multiple children match', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const db = new Database(TEST_DB, { readonly: true })
    const common = db.prepare(`SELECT book_id FROM devotionals WHERE series_id = 'test-series-1' AND series_order = 10`).get() as { book_id: string }
    db.close()

    const results = await searchSeries({ bookId: common.book_id })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow?.bridgePart?.seriesOrder).toBe(10)
  })

  it('returns null bridgePart when the series itself matches the text query', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const results = await searchSeries({ query: 'Test Arc' })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.bridgePart).toBeNull()
  })

  it('respects the audience filter on the series column', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const adults = await searchSeries({ audience: 'adults' })
    expect(adults.find((r) => r.id === 'test-series-1')).toBeUndefined()
    const family = await searchSeries({ audience: 'family' })
    expect(family.find((r) => r.id === 'test-series-1')).toBeDefined()
  })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run tests/lib/daily-bread/searchSeries.test.ts
```

Expected: FAIL with "searchSeries is not exported" or similar.

---

## Task 3: Implement searchSeries

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`

- [ ] **Step 1: Implement searchSeries**

Open `src/lib/daily-bread/queries.ts`. The file uses a raw `better-sqlite3` connection via `getDb()` for text-search queries (see existing `searchDevotionals`). Add a new `searchSeries` export using the same pattern.

Add this function alongside `searchDevotionals`:

```ts
import type { SeriesSummary } from '@/components/daily-bread/types'

export async function searchSeries(opts: {
  query?: string
  tagId?: string
  bookId?: string
  audience?: string
  limit?: number
}): Promise<SeriesSummary[]> {
  const db = getDb()
  try {
    // ── Stage 1: find matching series ids (title + filter pre-pass) ──
    const where: string[] = []
    const params: unknown[] = []

    if (opts.query && opts.query.trim().length >= 2) {
      const q = `%${opts.query.trim()}%`
      // Match series title/description OR any child's title/context_brief/modern_moment.
      where.push(`(
        s.title LIKE ? OR s.description LIKE ?
        OR EXISTS (
          SELECT 1 FROM devotionals cd WHERE cd.series_id = s.id
          AND (cd.title LIKE ? OR cd.context_brief LIKE ? OR cd.modern_moment LIKE ?)
        )
      )`)
      params.push(q, q, q, q, q)
    }
    if (opts.audience) {
      if (opts.audience === 'tween') {
        where.push(`(
          s.audience = 'tween'
          OR EXISTS (SELECT 1 FROM devotionals cd JOIN devotional_tag_map m ON m.devotional_id = cd.id
                     WHERE cd.series_id = s.id AND m.tag_id = 'tween')
        )`)
      } else {
        where.push(`s.audience = ?`)
        params.push(opts.audience)
      }
    }
    if (opts.bookId) {
      where.push(`EXISTS (SELECT 1 FROM devotionals cd WHERE cd.series_id = s.id AND cd.book_id = ?)`)
      params.push(opts.bookId)
    }
    if (opts.tagId) {
      where.push(`EXISTS (
        SELECT 1 FROM devotionals cd JOIN devotional_tag_map m ON m.devotional_id = cd.id
        WHERE cd.series_id = s.id AND m.tag_id = ?
      )`)
      params.push(opts.tagId)
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    const limit = opts.limit ?? 50

    const seriesRows = db.prepare(`
      SELECT s.id, s.title, s.description, s.audience, s.season
      FROM devotional_series s
      ${whereClause}
      ORDER BY s.created_at DESC
      LIMIT ?
    `).all(...params, limit) as Array<{
      id: string; title: string; description: string; audience: string; season: string | null
    }>

    if (seriesRows.length === 0) return []

    // ── Stage 2: per-series enrich (partCount, totalMinutes, tags, bridgePart) ──
    const result: SeriesSummary[] = []

    for (const s of seriesRows) {
      const countRow = db.prepare(`SELECT COUNT(*) n, COALESCE(SUM(estimated_minutes),0) mins FROM devotionals WHERE series_id = ?`).get(s.id) as { n: number; mins: number }

      const tagRows = db.prepare(`
        SELECT DISTINCT t.name
        FROM devotional_tag_map m
        JOIN devotionals d ON d.id = m.devotional_id
        JOIN devotional_tags t ON t.id = m.tag_id
        WHERE d.series_id = ?
        ORDER BY t.name
      `).all(s.id) as Array<{ name: string }>

      // ── Bridge logic: determine which (if any) child caused the match. ──
      let bridgePart: SeriesSummary['bridgePart'] = null

      // Does the series itself match the text query? If so, no bridge — series is the match.
      const seriesSelfMatches =
        !opts.query || opts.query.trim().length < 2 ||
        s.title.toLowerCase().includes(opts.query.trim().toLowerCase()) ||
        s.description.toLowerCase().includes(opts.query.trim().toLowerCase())

      const needsBridge = Boolean(opts.bookId || opts.tagId || (opts.query && opts.query.trim().length >= 2 && !seriesSelfMatches))

      if (needsBridge) {
        const bridgeWhere: string[] = ['cd.series_id = ?']
        const bridgeParams: unknown[] = [s.id]

        if (opts.bookId) {
          bridgeWhere.push('cd.book_id = ?')
          bridgeParams.push(opts.bookId)
        }
        if (opts.tagId) {
          bridgeWhere.push(`EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = cd.id AND m.tag_id = ?)`)
          bridgeParams.push(opts.tagId)
        }
        if (opts.query && opts.query.trim().length >= 2 && !seriesSelfMatches) {
          const q = `%${opts.query.trim()}%`
          bridgeWhere.push(`(cd.title LIKE ? OR cd.context_brief LIKE ? OR cd.modern_moment LIKE ?)`)
          bridgeParams.push(q, q, q)
        }

        const child = db.prepare(`
          SELECT cd.id, cd.series_order, cd.title, cd.book_id, cd.chapter, cd.verse_start, cd.verse_end
          FROM devotionals cd
          WHERE ${bridgeWhere.join(' AND ')}
          ORDER BY cd.series_order ASC NULLS LAST
          LIMIT 1
        `).get(...bridgeParams) as {
          id: string; series_order: number; title: string; book_id: string;
          chapter: number; verse_start: number; verse_end: number
        } | undefined

        if (child) {
          const bookName = BOOK_NAMES[child.book_id] ?? child.book_id
          bridgePart = {
            seriesOrder: child.series_order,
            title: child.title,
            passageRef: `${bookName} ${child.chapter}:${child.verse_start}-${child.verse_end}`,
            devotionalId: child.id,
          }
        }
      }

      result.push({
        id: s.id,
        title: s.title,
        description: s.description,
        audience: s.audience,
        season: s.season,
        partCount: countRow.n,
        totalEstimatedMinutes: countRow.mins,
        tags: tagRows.map((r) => r.name),
        bridgePart,
      })
    }

    return result
  } finally {
    db.close()
  }
}
```

Also update the existing `getDb` to honor `SELAH_DB_PATH_OVERRIDE` for tests. Find the existing `getDb` function (near the middle of the file). Change:

```ts
function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}
```

to:

```ts
function getDb() {
  const override = process.env.SELAH_DB_PATH_OVERRIDE
  if (override) return new Database(override, { readonly: true })
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}
```

- [ ] **Step 2: Run tests**

```bash
npx vitest run tests/lib/daily-bread/searchSeries.test.ts
```

Expected: all 5 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/daily-bread/queries.ts tests/lib/daily-bread/searchSeries.test.ts
git commit -m "feat(daily-bread): add searchSeries query with filter-bridge support"
```

---

## Task 4: Write failing test for getSeriesById

**Files:**
- Create: `tests/lib/daily-bread/getSeriesById.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/lib/daily-bread/getSeriesById.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-get-series-test.db')

beforeAll(() => {
  copyFileSync(SOURCE_DB, TEST_DB)
  process.env.SELAH_DB_PATH_OVERRIDE = TEST_DB

  const db = new Database(TEST_DB)
  try {
    db.exec(`DELETE FROM devotional_series WHERE id LIKE 'test-detail-%'`)
    db.exec(`
      INSERT INTO devotional_series (id, title, description, audience, source_tier, created_at)
      VALUES ('test-detail-1', 'Detail Arc', 'Detail test.', 'family', 'ai_assisted', '2026-04-17T00:00:00.000Z');
    `)
    const devs = db.prepare(`SELECT id FROM devotionals WHERE series_id IS NULL LIMIT 3`).all() as Array<{ id: string }>
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 10 WHERE id = ?`).run(devs[0].id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 20 WHERE id = ?`).run(devs[1].id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 30 WHERE id = ?`).run(devs[2].id)

    // Mark the middle part complete.
    db.prepare(`INSERT INTO devotional_history (devotional_id, completed_at, rating) VALUES (?, ?, ?)`).run(devs[1].id, '2026-04-16T10:00:00.000Z', 5)
  } finally {
    db.close()
  }
})

afterAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
  ;['-wal', '-shm'].forEach((s) => {
    const p = TEST_DB + s
    if (existsSync(p)) unlinkSync(p)
  })
  delete process.env.SELAH_DB_PATH_OVERRIDE
})

describe('getSeriesById', () => {
  it('returns null for a missing id', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('no-such-series')
    expect(result).toBeNull()
  })

  it('returns detail with parts in order and completedAt populated', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('test-detail-1')
    expect(result).not.toBeNull()
    expect(result!.id).toBe('test-detail-1')
    expect(result!.title).toBe('Detail Arc')
    expect(result!.parts).toHaveLength(3)
    expect(result!.parts.map((p) => p.seriesOrder)).toEqual([10, 20, 30])
    expect(result!.parts[0].completedAt).toBeNull()
    expect(result!.parts[1].completedAt).toBe('2026-04-16T10:00:00.000Z')
    expect(result!.parts[2].completedAt).toBeNull()
  })

  it('returns partCount and totalEstimatedMinutes from children', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('test-detail-1')
    expect(result!.partCount).toBe(3)
    expect(result!.totalEstimatedMinutes).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run to confirm failure**

```bash
npx vitest run tests/lib/daily-bread/getSeriesById.test.ts
```

Expected: FAIL — `getSeriesById is not exported`.

---

## Task 5: Implement getSeriesById

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`

- [ ] **Step 1: Add the function**

Add the following to `src/lib/daily-bread/queries.ts` (after `searchSeries`):

```ts
import type { SeriesDetail } from '@/components/daily-bread/types'

export async function getSeriesById(id: string): Promise<SeriesDetail | null> {
  const db = getDb()
  try {
    const s = db.prepare(`SELECT id, title, description, audience, season FROM devotional_series WHERE id = ?`).get(id) as
      | { id: string; title: string; description: string; audience: string; season: string | null }
      | undefined
    if (!s) return null

    const countRow = db.prepare(`SELECT COUNT(*) n, COALESCE(SUM(estimated_minutes),0) mins FROM devotionals WHERE series_id = ?`).get(id) as { n: number; mins: number }

    const tagRows = db.prepare(`
      SELECT DISTINCT t.name
      FROM devotional_tag_map m
      JOIN devotionals d ON d.id = m.devotional_id
      JOIN devotional_tags t ON t.id = m.tag_id
      WHERE d.series_id = ?
      ORDER BY t.name
    `).all(id) as Array<{ name: string }>

    const partRows = db.prepare(`
      SELECT d.id, d.series_order, d.title, d.book_id, d.chapter, d.verse_start, d.verse_end,
             d.estimated_minutes,
             (SELECT MAX(h.completed_at) FROM devotional_history h WHERE h.devotional_id = d.id) AS completed_at
      FROM devotionals d
      WHERE d.series_id = ?
      ORDER BY d.series_order ASC NULLS LAST
    `).all(id) as Array<{
      id: string; series_order: number; title: string; book_id: string;
      chapter: number; verse_start: number; verse_end: number;
      estimated_minutes: number; completed_at: string | null
    }>

    return {
      id: s.id,
      title: s.title,
      description: s.description,
      audience: s.audience,
      season: s.season,
      partCount: countRow.n,
      totalEstimatedMinutes: countRow.mins,
      tags: tagRows.map((r) => r.name),
      bridgePart: null,
      parts: partRows.map((p) => ({
        id: p.id,
        seriesOrder: p.series_order,
        title: p.title,
        passageRef: `${BOOK_NAMES[p.book_id] ?? p.book_id} ${p.chapter}:${p.verse_start}-${p.verse_end}`,
        estimatedMinutes: p.estimated_minutes,
        completedAt: p.completed_at,
      })),
    }
  } finally {
    db.close()
  }
}
```

- [ ] **Step 2: Run tests**

```bash
npx vitest run tests/lib/daily-bread/getSeriesById.test.ts
```

Expected: all 3 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add src/lib/daily-bread/queries.ts tests/lib/daily-bread/getSeriesById.test.ts
git commit -m "feat(daily-bread): add getSeriesById with part completion state"
```

---

## Task 6: Populate seriesMeta in mapDevotional

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`

- [ ] **Step 1: Extend mapDevotional**

Find the existing `mapDevotional` function. It accepts a raw Prisma devotional row. The function's parameter type already destructures fields; extend the type to include `seriesId` and `seriesOrder`, and add a lookup for `seriesMeta` when `seriesId` is set.

Replace the `mapDevotional` function signature and body. Change:

```ts
async function mapDevotional(dev: {
  id: string; title: string; bookId: string; chapter: number;
  verseStart: number; verseEnd: number; contextBrief: string;
  modernMoment: string; conversationStarters: string;
  goingDeeper: string | null; audience: string;
  estimatedMinutes: number; season: string | null;
  narrativeId: string | null;
}): Promise<Devotional> {
```

to:

```ts
async function mapDevotional(dev: {
  id: string; title: string; bookId: string; chapter: number;
  verseStart: number; verseEnd: number; contextBrief: string;
  modernMoment: string; conversationStarters: string;
  goingDeeper: string | null; audience: string;
  estimatedMinutes: number; season: string | null;
  narrativeId: string | null;
  seriesId?: string | null;
  seriesOrder?: number | null;
}): Promise<Devotional> {
```

Then, inside the body, just before the final `return { ... }` block, compute series metadata:

```ts
  let seriesMeta: Devotional['seriesMeta'] = null
  if (dev.seriesId) {
    const seriesRow = await prisma.devotionalSeries.findUnique({
      where: { id: dev.seriesId },
      select: { title: true, _count: { select: { devotionals: true } } },
    })
    if (seriesRow && dev.seriesOrder != null) {
      seriesMeta = {
        seriesOrder: dev.seriesOrder,
        seriesTitle: seriesRow.title,
        partCount: seriesRow._count.devotionals,
      }
    }
  }
```

In the returned object, add these two fields (after `goingDeeper`):

```ts
    seriesId: dev.seriesId ?? null,
    seriesMeta,
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Verify live fetch populates seriesMeta**

```bash
npx tsx -e "const {getDevotionalById} = require('./src/lib/daily-bread/queries'); (async () => { const d = await getDevotionalById((await require('@/lib/db').prisma.devotional.findFirst({ where: { seriesId: { not: null } } })).id); console.log('seriesId:', d?.seriesId, 'meta:', d?.seriesMeta); })()"
```

Expected: `seriesId: 'tween-friends-arc' meta: { seriesOrder: 10, seriesTitle: '...', partCount: 4 }` (or similar).

Note: this script uses path-alias `@/lib/db`, which requires `tsconfig-paths/register`. If it fails, simplify the check to a direct SQL query:

```bash
npx tsx -e "const D=require('better-sqlite3');const d=new D('data/selah.db',{readonly:true});console.log(d.prepare(\"SELECT id, series_id, series_order FROM devotionals WHERE series_id IS NOT NULL LIMIT 1\").get());d.close();"
```

Expected: one row with `series_id` + `series_order` populated.

- [ ] **Step 4: Commit**

```bash
git add src/lib/daily-bread/queries.ts
git commit -m "feat(daily-bread): populate seriesMeta in mapDevotional"
```

---

## Task 7: Extend search API route

**Files:**
- Modify: `src/app/api/devotionals/search/route.ts`

- [ ] **Step 1: Replace the GET handler**

Open `src/app/api/devotionals/search/route.ts`. Replace the entire file content with:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { searchDevotionals, searchSeries } from '@/lib/daily-bread/queries'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get('q') ?? undefined
  const tagId = sp.get('tag') ?? undefined
  const bookId = sp.get('book') ?? undefined
  const audience = sp.get('audience') ?? undefined
  const limit = parseInt(sp.get('limit') ?? '50', 10)

  const [devotionals, series] = await Promise.all([
    searchDevotionals({ query, tagId, bookId, audience, limit }),
    searchSeries({ query, tagId, bookId, audience, limit }),
  ])

  return NextResponse.json({ devotionals, series })
}
```

- [ ] **Step 2: Verify via curl / fetch**

Start the dev server if not running: `npm run dev`.

```bash
curl -s "http://localhost:3000/api/devotionals/search" | head -c 200
```

Expected: JSON starting with `{"devotionals":[...]` and including a `"series"` key.

Stop dev server after verification.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/devotionals/search/route.ts
git commit -m "feat(api): include series in devotional search response"
```

---

## Task 8: Add GET /api/devotionals/series/[id]

**Files:**
- Create: `src/app/api/devotionals/series/[id]/route.ts`

- [ ] **Step 1: Write the route**

```ts
// src/app/api/devotionals/series/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getSeriesById } from '@/lib/daily-bread/queries'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const series = await getSeriesById(id)
  if (!series) {
    return NextResponse.json({ error: 'Series not found' }, { status: 404 })
  }
  return NextResponse.json(series)
}
```

Next.js 16 makes `params` a Promise in route handlers — awaiting it is required.

- [ ] **Step 2: Verify**

Start dev server. Assuming `tween-friends-arc` exists (from the previous branch):

```bash
curl -s "http://localhost:3000/api/devotionals/series/tween-friends-arc" | head -c 300
```

Expected: JSON with `id`, `title`, `parts` (array of 4).

```bash
curl -s "http://localhost:3000/api/devotionals/series/does-not-exist" -o /dev/null -w "%{http_code}\n"
```

Expected: `404`.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/devotionals/series/[id]/route.ts
git commit -m "feat(api): add GET /api/devotionals/series/[id]"
```

---

## Task 9: Build SeriesCard component

**Files:**
- Create: `src/components/daily-bread/SeriesCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/daily-bread/SeriesCard.tsx
'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Check, Circle } from 'lucide-react'
import type { SeriesSummary, SeriesPart } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  series: SeriesSummary
  parts?: SeriesPart[] // Optional — fetched lazily on expand if not provided
  onOpenSeries: (seriesId: string) => void
  onOpenPart: (devotionalId: string) => void
}

export function SeriesCard({ series, parts, onOpenSeries, onOpenPart }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [loadedParts, setLoadedParts] = useState<SeriesPart[] | null>(parts ?? null)
  const [loading, setLoading] = useState(false)

  const toggleExpand = async () => {
    const next = !expanded
    setExpanded(next)
    if (next && loadedParts === null) {
      setLoading(true)
      try {
        const resp = await fetch(`/api/devotionals/series/${encodeURIComponent(series.id)}`)
        if (resp.ok) {
          const data = await resp.json()
          setLoadedParts(data.parts as SeriesPart[])
        }
      } catch (e) {
        console.error('[SeriesCard] failed to load parts:', e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div
      className="rounded-xl transition-all duration-200"
      style={{
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        borderLeft: '4px solid var(--selah-teal-400, #4A9E88)',
        padding: '18px 22px',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onOpenSeries(series.id)}
          className="text-left transition-colors duration-150"
          style={{
            fontFamily: font.display,
            fontSize: '20px',
            fontWeight: 500,
            color: 'var(--selah-text-1, #E8E2D9)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            lineHeight: 1.3,
          }}
        >
          {series.title}
        </button>
        <span
          style={{
            fontFamily: font.body,
            fontSize: '11px',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '3px 10px',
            borderRadius: '10px',
            backgroundColor: 'var(--selah-teal-800, #1A4539)',
            color: 'var(--selah-teal-400, #4A9E88)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          {series.partCount} parts &middot; ~{series.totalEstimatedMinutes} min
        </span>
      </div>

      <p
        className="line-clamp-2"
        style={{
          fontFamily: font.body,
          fontSize: '14px',
          color: 'var(--selah-text-2, #A39E93)',
          lineHeight: 1.5,
          marginTop: '6px',
        }}
      >
        {series.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>
          {series.audience}
        </span>
        {series.tags.map((t) => (
          <span key={t} style={{ fontFamily: font.body, fontSize: '10px', padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>
            {t}
          </span>
        ))}
      </div>

      {series.bridgePart && (
        <button
          onClick={() => onOpenPart(series.bridgePart!.devotionalId)}
          className="text-left"
          style={{
            marginTop: '10px',
            fontFamily: font.body,
            fontSize: '12px',
            color: 'var(--selah-teal-400, #4A9E88)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            textDecoration: 'underline',
            textUnderlineOffset: '3px',
          }}
        >
          Includes Part {series.bridgePart.seriesOrder}: {series.bridgePart.title} &mdash; {series.bridgePart.passageRef}
        </button>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={toggleExpand}
          aria-expanded={expanded}
          aria-label={expanded ? 'Hide parts' : 'Show parts'}
          className="flex items-center gap-1 transition-opacity duration-150 opacity-60 hover:opacity-100"
          style={{
            fontFamily: font.body,
            fontSize: '11px',
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          {expanded ? 'Hide parts' : 'Show parts'}
          {expanded ? <ChevronUp size={12} strokeWidth={1.5} /> : <ChevronDown size={12} strokeWidth={1.5} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-2" style={{ borderTop: '1px solid var(--selah-border-color, #3D3835)', paddingTop: '10px' }}>
          {loading && (
            <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>Loading parts…</p>
          )}
          {loadedParts && loadedParts.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenPart(p.id)}
              className="w-full text-left flex items-center gap-3 rounded-md transition-colors duration-100"
              style={{
                padding: '8px 6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              title={p.completedAt ? `Completed ${new Date(p.completedAt).toLocaleDateString()}` : 'Not yet read'}
            >
              {p.completedAt
                ? <Check size={14} strokeWidth={2} style={{ color: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0 }} />
                : <Circle size={14} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />}
              <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '48px', flexShrink: 0 }}>Part {p.seriesOrder}</span>
              <span style={{ fontFamily: font.display, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)', flex: 1 }}>{p.title}</span>
              <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{p.passageRef}</span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '40px', justifyContent: 'flex-end', flexShrink: 0 }}>
                <Clock size={10} strokeWidth={1.5} />{p.estimatedMinutes} min
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/daily-bread/SeriesCard.tsx
git commit -m "feat(daily-bread): add SeriesCard with collapsed/expanded + bridge line"
```

---

## Task 10: Wire SeriesCard into DevotionalBrowse

**Files:**
- Modify: `src/components/daily-bread/DevotionalBrowse.tsx`

- [ ] **Step 1: Extend state, fetch, and render**

Open `src/components/daily-bread/DevotionalBrowse.tsx`. Currently it has one `results` state of `DevotionalSummary[]`. We need two lists.

Replace the file's content with:

```tsx
// src/components/daily-bread/DevotionalBrowse.tsx
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Clock } from 'lucide-react'
import { SeriesCard } from './SeriesCard'
import type { DevotionalSummary, MoodTile, DevotionalBook, AudienceLevel, SeriesSummary } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const audiences: AudienceLevel[] = ['family', 'tween' as AudienceLevel, 'teens', 'adults']

interface Props {
  initialData: DevotionalSummary[]
  initialSeries?: SeriesSummary[]
  moodTiles: MoodTile[]
  books: DevotionalBook[]
  onOpenDevotional?: (id: string) => void
  onOpenSeries?: (id: string) => void
}

export function DevotionalBrowse({ initialData, initialSeries, moodTiles, books, onOpenDevotional, onOpenSeries }: Props) {
  const [query, setQuery] = useState('')
  const [tagId, setTagId] = useState('')
  const [bookId, setBookId] = useState('')
  const [audience, setAudience] = useState('')
  const [devotionalResults, setDevotionalResults] = useState<DevotionalSummary[]>(initialData)
  const [seriesResults, setSeriesResults] = useState<SeriesSummary[]>(initialSeries ?? [])
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasFilters = query.length > 0 || tagId.length > 0 || bookId.length > 0 || audience.length > 0

  const fetchResults = useCallback(async (q: string, tag: string, book: string, aud: string) => {
    if (!q && !tag && !book && !aud) {
      setDevotionalResults(initialData)
      setSeriesResults(initialSeries ?? [])
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (tag) params.set('tag', tag)
      if (book) params.set('book', book)
      if (aud) params.set('audience', aud)
      const resp = await fetch(`/api/devotionals/search?${params.toString()}`)
      const data = await resp.json()
      setDevotionalResults(data.devotionals ?? [])
      setSeriesResults(data.series ?? [])
    } catch (e) {
      console.error('[DevotionalBrowse] search failed:', e)
    } finally {
      setLoading(false)
    }
  }, [initialData, initialSeries])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchResults(query, tagId, bookId, audience)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, tagId, bookId, audience, fetchResults])

  const clearAll = () => { setQuery(''); setTagId(''); setBookId(''); setAudience('') }

  const showSeriesSection = seriesResults.length > 0

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={14} strokeWidth={1.5} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--selah-text-3, #6E695F)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search devotionals..."
          style={{
            width: '100%', padding: '10px 12px 10px 34px', borderRadius: '8px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: 'var(--selah-text-1, #E8E2D9)',
            fontFamily: font.body, fontSize: '14px', outline: 'none',
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          style={{
            padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: tagId ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)',
            fontFamily: font.body, cursor: 'pointer',
          }}
        >
          <option value="">All moods</option>
          {moodTiles.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
        </select>

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          style={{
            padding: '6px 10px', borderRadius: '6px', fontSize: '12px',
            backgroundColor: 'var(--selah-bg-surface, #1C1917)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            color: bookId ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)',
            fontFamily: font.body, cursor: 'pointer',
          }}
        >
          <option value="">All books</option>
          {books.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <div className="flex gap-1">
          {audiences.map((aud) => (
            <button
              key={aud}
              onClick={() => setAudience(audience === aud ? '' : aud)}
              style={{
                padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 500,
                fontFamily: font.body, cursor: 'pointer', border: 'none',
                backgroundColor: audience === aud ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-bg-surface, #1C1917)',
                color: audience === aud ? '#fff' : 'var(--selah-text-3, #6E695F)',
              }}
            >
              {aud}
            </button>
          ))}
        </div>

        {hasFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1"
            style={{
              padding: '4px 10px', borderRadius: '12px', fontSize: '11px',
              fontFamily: font.body, cursor: 'pointer', border: 'none',
              backgroundColor: 'var(--selah-terra-800, #5C2D21)',
              color: 'var(--selah-text-1, #E8E2D9)',
            }}
          >
            <X size={10} strokeWidth={2} /> Clear
          </button>
        )}
      </div>

      <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
        {loading ? 'Searching...' : `${devotionalResults.length} devotional${devotionalResults.length === 1 ? '' : 's'}${showSeriesSection ? ` · ${seriesResults.length} series` : ''}`}
      </p>

      {showSeriesSection && (
        <>
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-teal-400, #4A9E88)', marginTop: '16px', marginBottom: '8px' }}>
            Series
          </p>
          <div className="space-y-3">
            {seriesResults.map((s) => (
              <SeriesCard
                key={s.id}
                series={s}
                onOpenSeries={(id) => onOpenSeries?.(id)}
                onOpenPart={(id) => onOpenDevotional?.(id)}
              />
            ))}
          </div>
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginTop: '20px', marginBottom: '8px' }}>
            All Devotionals
          </p>
        </>
      )}

      <div className="space-y-3">
        {devotionalResults.length === 0 && !loading && (
          <div className="text-center py-12">
            <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No devotionals match your filters</p>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Try adjusting your search or clearing filters.</p>
          </div>
        )}
        {devotionalResults.map((dev) => (
          <button
            key={dev.id}
            onClick={() => onOpenDevotional?.(dev.id)}
            className="w-full text-left rounded-lg transition-colors duration-150"
            style={{
              padding: '14px 16px',
              backgroundColor: 'var(--selah-bg-surface, #1C1917)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}
          >
            <p style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '4px' }}>{dev.title}</p>
            <div className="flex items-center gap-3 flex-wrap">
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{dev.passageRef}</span>
              <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>{dev.audienceLevel}</span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}><Clock size={10} strokeWidth={1.5} />{dev.estimatedMinutes} min</span>
              {dev.situation && <span style={{ fontFamily: font.body, fontSize: '10px', padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>{dev.situation}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean. If you see a missing-prop error on `DevotionalBrowse` being rendered somewhere (e.g. `DailyBreadLanding`), don't fix it here — Task 11 threads the new props.

- [ ] **Step 3: Commit**

```bash
git add src/components/daily-bread/DevotionalBrowse.tsx
git commit -m "feat(daily-bread): render Series section in Browse with filter-aware split"
```

---

## Task 11: Thread initialSeries + onOpenSeries through Landing + Client

**Files:**
- Modify: `src/components/daily-bread/types.ts`
- Modify: `src/components/daily-bread/DailyBreadLanding.tsx`
- Modify: `src/app/(shell)/daily-bread/DailyBreadClient.tsx`
- Modify: `src/app/(shell)/daily-bread/page.tsx`

- [ ] **Step 1: Extend DailyBreadProps**

Open `src/components/daily-bread/types.ts`. Find the `DailyBreadProps` interface. Add these two optional properties (between `browseDevotionals` and `devotionalBooks`, or anywhere in the `data` cluster):

```ts
  browseSeries?: SeriesSummary[]
  onOpenSeries?: (seriesId: string) => void
```

- [ ] **Step 2: Pass through in DailyBreadLanding**

Open `src/components/daily-bread/DailyBreadLanding.tsx`. Find the destructured `DailyBreadLanding` function signature. Add `browseSeries` and `onOpenSeries` to the destructured props. Then find the `<DevotionalBrowse ... />` render and add two props:

Replace:

```tsx
<DevotionalBrowse
  initialData={browseDevotionals}
  moodTiles={moodTiles}
  books={devotionalBooks ?? []}
  onOpenDevotional={onOpenDevotional ? (id) => onOpenDevotional(id) : undefined}
/>
```

with:

```tsx
<DevotionalBrowse
  initialData={browseDevotionals}
  initialSeries={browseSeries ?? []}
  moodTiles={moodTiles}
  books={devotionalBooks ?? []}
  onOpenDevotional={onOpenDevotional ? (id) => onOpenDevotional(id) : undefined}
  onOpenSeries={onOpenSeries}
/>
```

- [ ] **Step 3: Fetch series in page.tsx + pass via client**

Open `src/app/(shell)/daily-bread/page.tsx`. Add `searchSeries` to the imports and call it in parallel:

Replace:

```tsx
import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional, getDevotionalBooks } from '@/lib/daily-bread/queries'
import DailyBreadClient from './DailyBreadClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function DailyBreadPage() {
  const [moodTiles, browseDevotionals, history, tonightDevotional, devotionalBooks] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(50),
    getDevotionalHistory(20),
    getTonightDevotional(),
    getDevotionalBooks(),
  ])

  return (
    <PageTransition>
      <DailyBreadClient
        moodTiles={moodTiles}
        browseDevotionals={browseDevotionals}
        history={history}
        tonightDevotional={tonightDevotional}
        devotionalBooks={devotionalBooks}
      />
    </PageTransition>
  )
}
```

with:

```tsx
import { getMoodTiles, getBrowseDevotionals, getDevotionalHistory, getTonightDevotional, getDevotionalBooks, searchSeries } from '@/lib/daily-bread/queries'
import DailyBreadClient from './DailyBreadClient'
import { PageTransition } from '@/components/ui/PageTransition'

export default async function DailyBreadPage() {
  const [moodTiles, browseDevotionals, history, tonightDevotional, devotionalBooks, browseSeries] = await Promise.all([
    getMoodTiles(),
    getBrowseDevotionals(50),
    getDevotionalHistory(20),
    getTonightDevotional(),
    getDevotionalBooks(),
    searchSeries({ limit: 50 }),
  ])

  return (
    <PageTransition>
      <DailyBreadClient
        moodTiles={moodTiles}
        browseDevotionals={browseDevotionals}
        browseSeries={browseSeries}
        history={history}
        tonightDevotional={tonightDevotional}
        devotionalBooks={devotionalBooks}
      />
    </PageTransition>
  )
}
```

- [ ] **Step 4: Extend DailyBreadClient**

Open `src/app/(shell)/daily-bread/DailyBreadClient.tsx`. Add `browseSeries` to the `Props` interface and destructuring; thread to `DailyBreadLanding`.

Replace:

```tsx
interface Props {
  moodTiles: MoodTile[]
  browseDevotionals: DevotionalSummary[]
  history: DevotionalHistory[]
  tonightDevotional: Devotional | null
  devotionalBooks: DevotionalBook[]
}

export default function DailyBreadClient({
  moodTiles,
  browseDevotionals,
  history,
  tonightDevotional,
  devotionalBooks,
}: Props) {
```

with:

```tsx
import type { SeriesSummary } from '@/components/daily-bread/types'

interface Props {
  moodTiles: MoodTile[]
  browseDevotionals: DevotionalSummary[]
  browseSeries: SeriesSummary[]
  history: DevotionalHistory[]
  tonightDevotional: Devotional | null
  devotionalBooks: DevotionalBook[]
}

export default function DailyBreadClient({
  moodTiles,
  browseDevotionals,
  browseSeries,
  history,
  tonightDevotional,
  devotionalBooks,
}: Props) {
```

Check the existing imports — add `SeriesSummary` to the single-line import from `@/components/daily-bread/types` if one exists, otherwise add the standalone import as shown.

Then in the returned `DailyBreadLanding` component JSX at the bottom of the file, add the two new props:

```tsx
      browseSeries={browseSeries}
      onOpenSeries={(id) => router.push(`/daily-bread/series/${id}`)}
```

- [ ] **Step 5: Typecheck + visual spot-check**

```bash
npx tsc --noEmit
```

Expected: clean.

Run dev server: `npm run dev`. Open `http://localhost:3000/daily-bread`. Switch to Browse tab. Expected:

- Series section at the top with the tween-friends arc card.
- "All Devotionals" section header below.
- Standalone devotionals as before.
- Click the series title → routes to `/daily-bread/series/tween-friends-arc` (will 404 until Task 13 — that's OK at this step).

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/components/daily-bread/types.ts \
        src/components/daily-bread/DailyBreadLanding.tsx \
        src/app/\(shell\)/daily-bread/DailyBreadClient.tsx \
        src/app/\(shell\)/daily-bread/page.tsx
git commit -m "feat(daily-bread): thread browseSeries + onOpenSeries through landing"
```

---

## Task 12: SeriesBadge + reading view integration

**Files:**
- Create: `src/components/daily-bread/SeriesBadge.tsx`
- Modify: `src/components/daily-bread/DailyBreadReading.tsx`

- [ ] **Step 1: Write SeriesBadge**

```tsx
// src/components/daily-bread/SeriesBadge.tsx
'use client'

import { ChevronLeft } from 'lucide-react'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  seriesId: string
  seriesOrder: number
  seriesTitle: string
  partCount: number
  onOpenSeries: (seriesId: string) => void
}

export function SeriesBadge({ seriesId, seriesOrder, seriesTitle, partCount, onOpenSeries }: Props) {
  return (
    <button
      onClick={() => onOpenSeries(seriesId)}
      className="inline-flex items-center gap-2 transition-colors duration-150"
      style={{
        fontFamily: font.body,
        fontSize: '12px',
        fontWeight: 500,
        padding: '5px 12px 5px 8px',
        borderRadius: '14px',
        border: '1px solid var(--selah-teal-400, #4A9E88)',
        backgroundColor: 'var(--selah-teal-800, #1A4539)',
        color: 'var(--selah-teal-400, #4A9E88)',
        cursor: 'pointer',
        marginBottom: '16px',
      }}
      aria-label={`Open series ${seriesTitle}`}
    >
      <ChevronLeft size={12} strokeWidth={2} />
      Part {seriesOrder} of {partCount} &middot; {seriesTitle}
    </button>
  )
}
```

- [ ] **Step 2: Mount SeriesBadge in DailyBreadReading**

Open `src/components/daily-bread/DailyBreadReading.tsx`. Add a new `onOpenSeries` prop and the badge import.

Add to the props interface:

```ts
  onOpenSeries?: (seriesId: string) => void
```

Add to the function signature destructure:

```ts
  onOpenSeries,
```

Add the import at the top:

```ts
import { SeriesBadge } from './SeriesBadge'
```

In the non-completed render path (the main `return` after `if (completed) { ... }`), find the line right after the back-button row but before the `<h1>` title — that's the slot for the badge. Insert:

```tsx
        {devotional.seriesId && devotional.seriesMeta && onOpenSeries && (
          <SeriesBadge
            seriesId={devotional.seriesId}
            seriesOrder={devotional.seriesMeta.seriesOrder}
            seriesTitle={devotional.seriesMeta.seriesTitle}
            partCount={devotional.seriesMeta.partCount}
            onOpenSeries={onOpenSeries}
          />
        )}
```

- [ ] **Step 3: Add the completion-flow copy line**

Still in `DailyBreadReading.tsx`, in the `if (completed) { return (...) }` block, add a second paragraph below the existing "Today's bread was broken." line when the devotional belongs to a series. Replace the inner block:

```tsx
<div className="text-center" style={{ maxWidth: '400px' }}>
  <p style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.5, marginBottom: '24px' }}>Today&rsquo;s bread was broken.</p>
  <button onClick={onBack} style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Back to Daily Bread</button>
</div>
```

with:

```tsx
<div className="text-center" style={{ maxWidth: '400px' }}>
  <p style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.5, marginBottom: '24px' }}>Today&rsquo;s bread was broken.</p>
  {devotional.seriesId && devotional.seriesMeta && (
    <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.6, marginBottom: '24px' }}>
      Part {devotional.seriesMeta.seriesOrder} of {devotional.seriesMeta.partCount}. The next one will be here when you&rsquo;re ready.
    </p>
  )}
  <button onClick={onBack} style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Back to Daily Bread</button>
</div>
```

- [ ] **Step 4: Thread onOpenSeries from DailyBreadClient**

Open `src/app/(shell)/daily-bread/DailyBreadClient.tsx`. Find the `<DailyBreadReading ... />` render. Add `onOpenSeries={(id) => router.push(\`/daily-bread/series/${id}\`)}` to the props.

- [ ] **Step 5: Typecheck + visual**

```bash
npx tsc --noEmit
```

Expected: clean.

Dev server. Navigate to any part of the tween-friends series (from Browse → expanded series → Part 2). Expected:

- Badge appears at top: `← Part 2 of 4 · The Friends You Choose, The Friend You Are`
- Tapping it attempts route to the series detail page (404 until Task 13).
- Complete the reading (fake rating + notes + submit). The completion screen shows "Part 2 of 4. The next one will be here when you're ready." below the existing "Today's bread was broken." line.

Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add src/components/daily-bread/SeriesBadge.tsx \
        src/components/daily-bread/DailyBreadReading.tsx \
        src/app/\(shell\)/daily-bread/DailyBreadClient.tsx
git commit -m "feat(daily-bread): add SeriesBadge + series-aware completion copy"
```

---

## Task 13: Build SeriesDetail component

**Files:**
- Create: `src/components/daily-bread/SeriesDetail.tsx`

- [ ] **Step 1: Write the presentational component**

```tsx
// src/components/daily-bread/SeriesDetail.tsx
'use client'

import { ArrowLeft, Check, Circle, Clock } from 'lucide-react'
import type { SeriesDetail as SeriesDetailShape } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface Props {
  series: SeriesDetailShape
  onBack: () => void
  onOpenPart: (devotionalId: string) => void
}

export function SeriesDetail({ series, onBack, onOpenPart }: Props) {
  // CTA logic: lowest-seriesOrder uncompleted part.
  const firstUncompleted = series.parts.find((p) => p.completedAt === null) ?? null
  const allCompleted = firstUncompleted === null && series.parts.length > 0

  let ctaLabel: string
  let ctaTargetId: string | null = null
  if (series.parts.length === 0) {
    ctaLabel = 'No parts available'
    ctaTargetId = null
  } else if (allCompleted) {
    ctaLabel = `Restart: Part ${series.parts[0].seriesOrder} \u2192`
    ctaTargetId = series.parts[0].id
  } else if (firstUncompleted!.seriesOrder === series.parts[0].seriesOrder && series.parts.every((p) => p.completedAt === null)) {
    ctaLabel = `Start Part ${firstUncompleted!.seriesOrder} \u2192`
    ctaTargetId = firstUncompleted!.id
  } else {
    ctaLabel = `Continue: Part ${firstUncompleted!.seriesOrder} \u2192`
    ctaTargetId = firstUncompleted!.id
  }

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6"
          style={{
            fontFamily: font.body, fontSize: '13px', fontWeight: 500,
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Daily Bread
        </button>

        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '32px', lineHeight: 1.3, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '6px' }}>
          {series.title}
        </h1>
        <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-teal-400, #4A9E88)', marginBottom: '16px' }}>
          A {series.partCount}-part arc &middot; ~{series.totalEstimatedMinutes} minutes total
        </p>
        <p style={{ fontFamily: font.body, fontSize: '16px', lineHeight: 1.6, color: 'var(--selah-text-2, #A39E93)', marginBottom: '20px' }}>
          {series.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          <span style={{ fontFamily: font.body, fontSize: '11px', padding: '2px 10px', borderRadius: '10px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>
            {series.audience}
          </span>
          {series.tags.map((t) => (
            <span key={t} style={{ fontFamily: font.body, fontSize: '11px', padding: '2px 10px', borderRadius: '10px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-text-3, #6E695F)' }}>
              {t}
            </span>
          ))}
        </div>

        {ctaTargetId && (
          <button
            onClick={() => onOpenPart(ctaTargetId!)}
            className="transition-colors duration-150"
            style={{
              fontFamily: font.body, fontSize: '15px', fontWeight: 600,
              padding: '12px 28px', borderRadius: '10px',
              backgroundColor: 'var(--selah-teal-400, #4A9E88)',
              color: '#fff', border: 'none', cursor: 'pointer',
              marginBottom: '32px',
            }}
          >
            {ctaLabel}
          </button>
        )}

        <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '12px' }}>
          Parts
        </p>
        <div className="space-y-1">
          {series.parts.map((p) => (
            <button
              key={p.id}
              onClick={() => onOpenPart(p.id)}
              className="w-full text-left flex items-center gap-4 rounded-md transition-colors duration-100"
              style={{
                padding: '12px 14px',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
              title={p.completedAt ? `Completed ${new Date(p.completedAt).toLocaleDateString()}` : 'Not yet read'}
            >
              {p.completedAt
                ? <Check size={16} strokeWidth={2} style={{ color: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0 }} />
                : <Circle size={16} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />}
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', width: '56px', flexShrink: 0 }}>
                Part {p.seriesOrder}
              </span>
              <span style={{ fontFamily: font.display, fontSize: '16px', color: 'var(--selah-text-1, #E8E2D9)', flex: 1 }}>
                {p.title}
              </span>
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
                {p.passageRef}
              </span>
              <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', width: '48px', justifyContent: 'flex-end', flexShrink: 0 }}>
                <Clock size={11} strokeWidth={1.5} /> {p.estimatedMinutes} min
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/daily-bread/SeriesDetail.tsx
git commit -m "feat(daily-bread): add SeriesDetail presentational component"
```

---

## Task 14: Wire series detail page + client wrapper

**Files:**
- Create: `src/app/(shell)/daily-bread/series/[id]/page.tsx`
- Create: `src/app/(shell)/daily-bread/series/[id]/SeriesDetailClient.tsx`

- [ ] **Step 1: Create the client wrapper**

```tsx
// src/app/(shell)/daily-bread/series/[id]/SeriesDetailClient.tsx
'use client'

import { useRouter } from 'next/navigation'
import { SeriesDetail } from '@/components/daily-bread/SeriesDetail'
import type { SeriesDetail as SeriesDetailShape } from '@/components/daily-bread/types'

export default function SeriesDetailClient({ series }: { series: SeriesDetailShape }) {
  const router = useRouter()
  return (
    <SeriesDetail
      series={series}
      onBack={() => router.push('/daily-bread')}
      onOpenPart={(devotionalId) => router.push(`/daily-bread?devotional=${encodeURIComponent(devotionalId)}`)}
    />
  )
}
```

Note: the `onOpenPart` uses a query-string route back to Daily Bread because the current devotional-reading flow is in-app state, not a dedicated URL. Passing `?devotional=<id>` is the shim. Task 14 Step 3 handles the query-param consumption in `DailyBreadClient`.

- [ ] **Step 2: Create the server page**

```tsx
// src/app/(shell)/daily-bread/series/[id]/page.tsx
import { notFound } from 'next/navigation'
import { getSeriesById } from '@/lib/daily-bread/queries'
import { PageTransition } from '@/components/ui/PageTransition'
import SeriesDetailClient from './SeriesDetailClient'

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const series = await getSeriesById(id)
  if (!series) notFound()
  return (
    <PageTransition>
      <SeriesDetailClient series={series} />
    </PageTransition>
  )
}
```

- [ ] **Step 3: Consume ?devotional=<id> in DailyBreadClient**

Open `src/app/(shell)/daily-bread/DailyBreadClient.tsx`. Add `useSearchParams` from `next/navigation` to the imports. At the top of the component, add an effect that triggers `selectById` when the query param is present:

Add to imports:

```tsx
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
```

(If `useEffect` isn't already imported from `react`, add it. Same for `useSearchParams`.)

Inside the component body, after the existing `useState`/`useCallback` calls but before `return`, add:

```tsx
  const searchParams = useSearchParams()
  useEffect(() => {
    const id = searchParams.get('devotional')
    if (id) {
      selectById(id)
      // Clean the URL so reloads don't re-trigger the fetch indefinitely.
      router.replace('/daily-bread')
    }
  }, [searchParams, selectById, router])
```

- [ ] **Step 4: Typecheck + full walkthrough**

```bash
npx tsc --noEmit
```

Expected: clean.

Start dev server. Walkthrough:

1. `/daily-bread` → Browse tab → expand tween-friends series card → tap Part 2.
2. Reading view opens; SeriesBadge shows `← Part 2 of 4 · The Friends You Choose, The Friend You Are`.
3. Tap the badge → routes to `/daily-bread/series/tween-friends-arc`.
4. Series detail page shows 4 parts, CTA should say `Start Part 1 →` (assuming nothing completed), or `Continue: Part N →` if some are marked complete.
5. Tap any part → routes to `/daily-bread?devotional=<id>` → DailyBreadClient picks up the query param, opens that part in reading view, clears the URL.
6. Tap `← Back to Daily Bread` from series detail page → routes to `/daily-bread`.
7. Rate + notes + submit on Part 2 → completion screen shows the "Part 2 of 4. The next one will be here when you're ready." line.
8. Back to series detail → Part 2 now has a checkmark. CTA now says `Continue: Part 3 →`.

Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(shell\)/daily-bread/series/ src/app/\(shell\)/daily-bread/DailyBreadClient.tsx
git commit -m "feat(daily-bread): add /daily-bread/series/[id] route with part picker"
```

---

## Task 15: Run full suite + final verification

**Files:**
- None (verification step)

- [ ] **Step 1: Run full test suite**

```bash
npx vitest run
```

Expected: all tests pass. The 2 new test files (searchSeries, getSeriesById) bring the count up from 130 to ~138+.

- [ ] **Step 2: Manual regression walkthrough**

Start dev server. Verify nothing unrelated broke:

1. Tonight tab still shows mood tiles + seasonal card (if any).
2. Browse tab with NO filters → Series section visible, All Devotionals section header appears below.
3. Browse tab with `audience=teens` filter → Series section hidden (tween-friends-arc has `audience=family` + tween-via-tag, doesn't match teens). Flat devotional list below works as before.
4. Browse tab with `book=<a book a series part is in>` → Series section visible with bridge line.
5. Standalone devotional (not in a series) opened → no badge at top. Completion screen shows only "Today's bread was broken." (no series line).
6. History tab works as before.

- [ ] **Step 3: Clean up any scratch DB files**

```bash
ls data/ | grep -E 'selah-search-series-test|selah-get-series-test'
```

If any remain, delete:

```bash
rm -f data/selah-search-series-test.db* data/selah-get-series-test.db*
```

- [ ] **Step 4: Commit the plan**

```bash
git add -f docs/superpowers/plans/2026-04-17-devotional-series-ui.md
git commit -m "docs: devotional series UI implementation plan"
```

---

## Self-Review Summary

**Spec coverage:**

| Spec section | Task |
|---|---|
| New `SeriesSummary`, `SeriesDetail`, `SeriesPart` types | Task 1 |
| `Devotional.seriesId` + `seriesMeta` | Task 1, 6 |
| `searchSeries()` query with filter-bridge | Task 2-3 |
| `getSeriesById()` with completion state | Task 4-5 |
| Extended `/api/devotionals/search` | Task 7 |
| New `/api/devotionals/series/[id]` | Task 8 |
| SeriesCard (collapsed + expanded) | Task 9 |
| Series section in Browse | Task 10-11 |
| SeriesBadge on reading view | Task 12 |
| Completion flow copy | Task 12 |
| SeriesDetail component + page route | Task 13-14 |
| CTA logic (Start/Continue/Restart) | Task 13 |
| Filter-bridge behavior (book + tag + text) | Task 2 (test) + Task 3 (impl) |
| Accessibility: aria-expanded + aria-label on badge | Task 9, 12 |
| Hide Series section when empty | Task 10 |
| Section header typography match | Task 10 |

**Placeholder scan:** no TBDs, TODOs, or handwaved steps. Every code block is complete.

**Type consistency:**
- `SeriesSummary.bridgePart.seriesOrder` / `devotionalId` / `title` / `passageRef` — consistent across query, API, and UI.
- `Devotional.seriesMeta.{seriesOrder, seriesTitle, partCount}` — consistent between `mapDevotional`, `SeriesBadge` props, and completion copy.
- `SeriesPart.completedAt: string | null` — used in DB query (raw ISO string from `MAX(completed_at)`) and UI (null check + `new Date(...)`). Consistent.

**Scope check:** one coherent feature (three UI surfaces + shared data layer). No decomposition needed.
