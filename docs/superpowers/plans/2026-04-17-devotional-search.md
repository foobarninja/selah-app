# Devotional Search & Filtering — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make devotionals discoverable via the existing universal search bar and a new search+filter UI in the Daily Bread Browse tab.

**Architecture:** Two features sharing one backend query function. Feature 1 adds a `devotionals` bucket to the existing `universalSearch()` using the same LIKE-search pattern as characters/themes. Feature 2 replaces the static `getBrowseDevotionals()` list with a filterable `searchDevotionals()` query, served via a new API route, driven by a client component with debounced fetch.

**Tech Stack:** Next.js 16, React 19, better-sqlite3 (raw SQL for search), Prisma (for existing queries), TypeScript, Tailwind-free inline styles (matching existing codebase pattern).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/lib/search/queries.ts` | Modify | Add `devotionals` bucket to `SearchResults` + search block |
| `src/lib/daily-bread/queries.ts` | Modify | Add `searchDevotionals()` + `getDevotionalBooks()` |
| `src/app/api/devotionals/search/route.ts` | Create | API route for filtered devotional search |
| `src/components/daily-bread/DevotionalBrowse.tsx` | Create | Client component: search bar + filters + results grid |
| `src/components/daily-bread/DailyBreadLanding.tsx` | Modify | Replace static browse section with `DevotionalBrowse` |
| `src/components/daily-bread/types.ts` | Modify | Add `DevotionalBook` type |
| `src/app/(shell)/daily-bread/page.tsx` | Modify | Add `getDevotionalBooks()` to data loading |
| `src/app/(shell)/daily-bread/DailyBreadClient.tsx` | Modify | Thread new props through |

---

### Task 1: Add devotionals to universal search

**Files:**
- Modify: `src/lib/search/queries.ts`

- [ ] **Step 1: Add devotionals to SearchResults interface**

In `src/lib/search/queries.ts`, add the `devotionals` field to the `SearchResults` interface (after the `narratives` field, around line 16):

```typescript
export interface SearchResults {
  verses: Array<{ id: number; bookId: string; chapter: number; verse: number; text: string; bookName: string }>
  characters: Array<{ id: string; name: string; bioBrief: string }>
  themes: Array<{ id: string; name: string; definition: string }>
  strongs: Array<{ number: string; word: string; transliteration: string; shortDefinition: string }>
  narratives: Array<{ id: string; title: string; summary: string; bookId: string }>
  devotionals: Array<{ id: string; title: string; passageRef: string; snippet: string }>
}
```

- [ ] **Step 2: Add devotional search block in universalSearch()**

In the `universalSearch()` function, after the narratives block and before the `return` statement, add the devotional search:

```typescript
    // ── Devotionals: LIKE on title, context_brief, modern_moment ──
    const rawDevotionals = searchEntities<{ id: string; title: string; book_id: string; chapter: number; verse_start: number; verse_end: number; context_brief: string; modern_moment: string }>(
      db,
      'SELECT id, title, book_id, chapter, verse_start, verse_end, COALESCE(context_brief, \'\') AS context_brief, COALESCE(modern_moment, \'\') AS modern_moment FROM devotionals',
      parsed,
      ['title', 'context_brief', 'modern_moment'],
      'title',
      limit,
    )
```

- [ ] **Step 3: Add devotionals to the return object**

In the return statement, add:

```typescript
      devotionals: rawDevotionals.map((d) => ({
        id: d.id,
        title: d.title,
        passageRef: `${BOOK_NAMES[d.book_id] ?? d.book_id} ${d.chapter}:${d.verse_start}-${d.verse_end}`,
        snippet: (d.context_brief || d.modern_moment).slice(0, 200),
      })),
```

- [ ] **Step 4: Initialize devotionals as empty in the early-return cases**

The function has two early returns (empty query, no positive terms). Add `devotionals: []` to both:

```typescript
    return { verses: [], characters: [], themes: [], strongs: [], narratives: [], devotionals: [] }
```

- [ ] **Step 5: Verify**

Run: `npm test`
Expected: All 117 tests pass (no test touches universalSearch directly — the change is additive).

Then test manually via the search API:
```
curl "http://localhost:3000/api/search?q=forgiveness&limit=5"
```
Expected: Response JSON includes a `devotionals` array with matching entries.

- [ ] **Step 6: Commit**

```bash
git add src/lib/search/queries.ts
git commit -m "feat(search): add devotionals bucket to universalSearch"
```

---

### Task 2: Add searchDevotionals() + getDevotionalBooks() backend

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`

- [ ] **Step 1: Add better-sqlite3 import and getDb helper**

At the top of `src/lib/daily-bread/queries.ts`, add the raw DB accessor (needed for LIKE queries — Prisma can't do dynamic multi-column OR-based LIKE):

```typescript
import Database from 'better-sqlite3'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}
```

- [ ] **Step 2: Add searchDevotionals function**

After `getBrowseDevotionals()`, add:

```typescript
export async function searchDevotionals(opts: {
  query?: string
  tagId?: string
  bookId?: string
  audience?: string
  limit?: number
}): Promise<DevotionalSummary[]> {
  const db = getDb()
  try {
    const where: string[] = []
    const params: unknown[] = []

    if (opts.query && opts.query.trim().length >= 2) {
      const q = `%${opts.query.trim()}%`
      where.push('(d.title LIKE ? OR d.context_brief LIKE ? OR d.modern_moment LIKE ?)')
      params.push(q, q, q)
    }
    if (opts.tagId) {
      where.push('EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = d.id AND m.tag_id = ?)')
      params.push(opts.tagId)
    }
    if (opts.bookId) {
      where.push('d.book_id = ?')
      params.push(opts.bookId)
    }
    if (opts.audience) {
      where.push('d.audience = ?')
      params.push(opts.audience)
    }

    const whereClause = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    const limit = opts.limit ?? 50

    const rows = db.prepare(`
      SELECT d.id, d.title, d.book_id, d.chapter, d.verse_start, d.verse_end,
             d.audience, d.estimated_minutes, d.season,
             (SELECT t.name FROM devotional_tag_map m JOIN devotional_tags t ON t.id = m.tag_id WHERE m.devotional_id = d.id LIMIT 1) AS situation
      FROM devotionals d
      ${whereClause}
      ORDER BY d.title
      LIMIT ?
    `).all(...params, limit) as Array<{
      id: string; title: string; book_id: string; chapter: number;
      verse_start: number; verse_end: number; audience: string;
      estimated_minutes: number; season: string | null; situation: string | null
    }>

    const { BOOK_NAMES } = await import('@/lib/constants')
    return rows.map((d) => ({
      id: d.id,
      title: d.title,
      passageRef: `${BOOK_NAMES[d.book_id] ?? d.book_id} ${d.chapter}:${d.verse_start}-${d.verse_end}`,
      audienceLevel: d.audience as DevotionalSummary['audienceLevel'],
      estimatedMinutes: d.estimated_minutes,
      seasonalSet: (d.season ?? 'ordinary') as DevotionalSummary['seasonalSet'],
      situation: d.situation ?? '',
    }))
  } finally {
    db.close()
  }
}
```

- [ ] **Step 3: Add getDevotionalBooks function**

After `searchDevotionals()`:

```typescript
export async function getDevotionalBooks(): Promise<Array<{ id: string; name: string }>> {
  const books = await prisma.book.findMany({
    where: { devotionals: { some: {} } },
    select: { id: true, name: true },
    orderBy: { bookOrder: 'asc' },
  })
  return books.map((b) => ({ id: b.id, name: b.name }))
}
```

- [ ] **Step 4: Verify**

Run: `npm test`
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/daily-bread/queries.ts
git commit -m "feat(daily-bread): add searchDevotionals + getDevotionalBooks queries"
```

---

### Task 3: Create API route

**Files:**
- Create: `src/app/api/devotionals/search/route.ts`

- [ ] **Step 1: Create the route**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { searchDevotionals } from '@/lib/daily-bread/queries'

export async function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams
  const query = sp.get('q') ?? undefined
  const tagId = sp.get('tag') ?? undefined
  const bookId = sp.get('book') ?? undefined
  const audience = sp.get('audience') ?? undefined
  const limit = parseInt(sp.get('limit') ?? '50', 10)

  const results = await searchDevotionals({ query, tagId, bookId, audience, limit })
  return NextResponse.json(results)
}
```

- [ ] **Step 2: Verify**

Start the dev server (`npm run dev`), then:
```
curl "http://localhost:3000/api/devotionals/search?q=Philemon"
```
Expected: JSON array including "Charge it to my account" devotional.

```
curl "http://localhost:3000/api/devotionals/search?book=PSA"
```
Expected: Only Psalms devotionals.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/devotionals/search/route.ts
git commit -m "feat(api): add GET /api/devotionals/search route"
```

---

### Task 4: Add DevotionalBook type

**Files:**
- Modify: `src/components/daily-bread/types.ts`

- [ ] **Step 1: Add type and extend DailyBreadProps**

Add the `DevotionalBook` interface after `CompletionState`:

```typescript
export interface DevotionalBook { id: string; name: string }
```

Add `devotionalBooks` to `DailyBreadProps`:

```typescript
export interface DailyBreadProps {
  moodTiles: MoodTile[]
  seasonalCard: SeasonalCard
  currentAudienceLevel: AudienceLevel
  selectedDevotional?: Devotional
  history: DevotionalHistory[]
  browseDevotionals: DevotionalSummary[]
  devotionalBooks: DevotionalBook[]
  activeTab: DailyBreadTab
  // ... rest unchanged
```

- [ ] **Step 2: Commit**

```bash
git add src/components/daily-bread/types.ts
git commit -m "feat(types): add DevotionalBook type + devotionalBooks prop"
```

---

### Task 5: Create DevotionalBrowse component

**Files:**
- Create: `src/components/daily-bread/DevotionalBrowse.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Clock } from 'lucide-react'
import type { DevotionalSummary, MoodTile, DevotionalBook, AudienceLevel } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const audiences: AudienceLevel[] = ['family', 'tween', 'teens', 'adults']

interface Props {
  initialData: DevotionalSummary[]
  moodTiles: MoodTile[]
  books: DevotionalBook[]
  onOpenDevotional?: (id: string) => void
}

export function DevotionalBrowse({ initialData, moodTiles, books, onOpenDevotional }: Props) {
  const [query, setQuery] = useState('')
  const [tagId, setTagId] = useState('')
  const [bookId, setBookId] = useState('')
  const [audience, setAudience] = useState('')
  const [results, setResults] = useState<DevotionalSummary[]>(initialData)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasFilters = query.length > 0 || tagId.length > 0 || bookId.length > 0 || audience.length > 0

  const fetchResults = useCallback(async (q: string, tag: string, book: string, aud: string) => {
    if (!q && !tag && !book && !aud) {
      setResults(initialData)
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
      setResults(data)
    } catch (e) {
      console.error('[DevotionalBrowse] search failed:', e)
    } finally {
      setLoading(false)
    }
  }, [initialData])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      fetchResults(query, tagId, bookId, audience)
    }, 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, tagId, bookId, audience, fetchResults])

  const clearAll = () => { setQuery(''); setTagId(''); setBookId(''); setAudience('') }

  return (
    <div className="space-y-4">
      {/* Search input */}
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
            fontFamily: font.body, fontSize: '14px',
            outline: 'none',
          }}
        />
      </div>

      {/* Filter row */}
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

      {/* Results count */}
      <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
        {loading ? 'Searching...' : `${results.length} devotional${results.length === 1 ? '' : 's'}`}
      </p>

      {/* Results grid */}
      <div className="space-y-3">
        {results.length === 0 && !loading && (
          <div className="text-center py-12">
            <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No devotionals match your filters</p>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Try adjusting your search or clearing filters.</p>
          </div>
        )}
        {results.map((dev) => (
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

- [ ] **Step 2: Commit**

```bash
git add src/components/daily-bread/DevotionalBrowse.tsx
git commit -m "feat(daily-bread): add DevotionalBrowse component with search + filters"
```

---

### Task 6: Wire everything together

**Files:**
- Modify: `src/app/(shell)/daily-bread/page.tsx`
- Modify: `src/app/(shell)/daily-bread/DailyBreadClient.tsx`
- Modify: `src/components/daily-bread/DailyBreadLanding.tsx`

- [ ] **Step 1: Update the server component to load devotionalBooks**

In `src/app/(shell)/daily-bread/page.tsx`:

```typescript
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

- [ ] **Step 2: Thread devotionalBooks through DailyBreadClient**

In `src/app/(shell)/daily-bread/DailyBreadClient.tsx`, add to the Props interface and pass through:

```typescript
import type {
  Devotional, DevotionalSummary, DevotionalHistory, MoodTile,
  AudienceLevel, DailyBreadTab, SeasonalCard, DevotionalBook,
} from '@/components/daily-bread/types'

interface Props {
  moodTiles: MoodTile[]
  browseDevotionals: DevotionalSummary[]
  history: DevotionalHistory[]
  tonightDevotional: Devotional | null
  devotionalBooks: DevotionalBook[]
}
```

Then in the JSX, add the prop to `DailyBreadLanding`:

```typescript
      onOpenDevotional={selectById}
      devotionalBooks={devotionalBooks}
    />
```

- [ ] **Step 3: Replace static browse with DevotionalBrowse in DailyBreadLanding**

In `src/components/daily-bread/DailyBreadLanding.tsx`:

Add the import at the top:
```typescript
import { DevotionalBrowse } from './DevotionalBrowse'
import type { DevotionalBook } from './types'
```

In the `DailyBreadLanding` function signature, destructure the new prop:
```typescript
export function DailyBreadLanding({
  moodTiles, seasonalCard, history, browseDevotionals,
  devotionalBooks,
  activeTab: initialTab,
  onSelectMood, onBeginSeasonal, onChangeTab, onOpenDevotional,
}: DailyBreadProps) {
```

Replace the `{activeTab === 'browse' && (...)}` block (lines 110-115) with:

```typescript
        {activeTab === 'browse' && (
          <DevotionalBrowse
            initialData={browseDevotionals}
            moodTiles={moodTiles}
            books={devotionalBooks ?? []}
            onOpenDevotional={onOpenDevotional ? (id) => onOpenDevotional(id) : undefined}
          />
        )}
```

- [ ] **Step 4: Verify end-to-end**

Run: `npm test`
Expected: All tests pass.

Start dev server: `npm run dev`
Open: `http://localhost:3000/daily-bread`

Test scenarios:
1. Browse tab shows search input + filter dropdowns + audience chips
2. Type "Philemon" → list filters to matching devotionals
3. Select "Psalms" from book dropdown → only Psalms devotionals
4. Click "tween" audience chip → tween-tagged devotionals
5. Click "Clear" → full list returns
6. Empty result → "No devotionals match your filters" message
7. Search bar in app header: type "forgiveness" → devotionals appear in results alongside verses/themes

- [ ] **Step 5: Commit**

```bash
git add src/app/\(shell\)/daily-bread/page.tsx src/app/\(shell\)/daily-bread/DailyBreadClient.tsx src/components/daily-bread/DailyBreadLanding.tsx
git commit -m "feat(daily-bread): wire search + filters into Browse tab"
```
