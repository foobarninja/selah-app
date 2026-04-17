# Devotional Search & Filtering

## Problem

Devotionals have no search or filtering. The Browse tab shows a flat alphabetical list via `getBrowseDevotionals(30)`. The universal search (`universalSearch()`) returns verses, characters, themes, Strong's, and narrative units — but not devotionals. As devotional content grows (currently ~160+, heading toward 365+), discovery degrades.

## Solution — Two Features

### Feature 1: Devotionals in Universal Search

Add a `devotionals` bucket to the existing `universalSearch()` function in `src/lib/search/queries.ts`.

**Query**: LIKE search across `title`, `context_brief`, `modern_moment` — same `searchEntities()` pattern used for characters/themes/Strong's.

**Return shape** (new field on `SearchResults`):
```typescript
devotionals: Array<{
  id: string
  title: string
  passageRef: string
  snippet: string
}>
```

`passageRef` is constructed as `"{BookName} {chapter}:{verseStart}-{verseEnd}"` using the joined `books.name`.

`snippet` is the first matching field truncated to 200 chars (prefer `context_brief`, fall back to `modern_moment`).

**Files changed**:
- `src/lib/search/queries.ts` — add `devotionals` to `SearchResults` interface, add devotional search block in `universalSearch()`, add `fallbackDevotionalLike()` helper

### Feature 2: Browse Tab Search + Filters

Replace the static browse list in Daily Bread with an interactive search/filter UI.

#### Backend

**New query function** in `src/lib/daily-bread/queries.ts`:
```typescript
export async function searchDevotionals(opts: {
  query?: string
  tagId?: string
  bookId?: string
  audience?: string
  limit?: number
}): Promise<DevotionalSummary[]>
```

Builds a dynamic SQL WHERE clause:
- `query` → `(title LIKE ? OR context_brief LIKE ? OR modern_moment LIKE ?)`
- `tagId` → `EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = d.id AND m.tag_id = ?)`
- `bookId` → `d.book_id = ?`
- `audience` → `d.audience = ?`
- All filters are AND-ed. Omitted filters are ignored.
- Default limit: 50.

Uses raw `better-sqlite3` (not Prisma) since the daily-bread queries module already imports it for mood tile queries that need raw SQL.

**New API route** `src/app/api/devotionals/search/route.ts`:
```
GET /api/devotionals/search?q=&tag=&book=&audience=&limit=
```
Parses query params, calls `searchDevotionals()`, returns JSON.

#### Frontend

**New client component** `src/components/daily-bread/DevotionalBrowse.tsx`:
- Search input (debounced 300ms)
- Filter row with three selectors:
  - **Tag**: `<select>` populated from the existing `moodTiles` prop (already loaded by the server component)
  - **Book**: `<select>` populated by a static query of distinct `book_id` values from devotionals (passed as prop)
  - **Audience**: chip buttons for `family`, `tween`, `teens`, `adults`
- Clear-all-filters button (visible when any filter is active)
- Results grid using existing `BrowseCard` component
- Loading state while fetching
- Empty state: "No devotionals match your filters"

**Integration**: `DailyBreadLanding.tsx` passes `browseDevotionals` as initial data. `DevotionalBrowse` shows that initial data on mount, then switches to API-driven results when any filter is activated.

**Data flow**:
1. Page server component loads `getBrowseDevotionals(50)` + `getMoodTiles()` + distinct books with devotionals
2. Passes to `DailyBreadClient` → `DailyBreadLanding` → `DevotionalBrowse`
3. On filter change: client fetches `GET /api/devotionals/search?...`
4. Results replace the grid; BrowseCard rendering is unchanged

#### Props passed from server component

The server component needs to provide filter options alongside the initial data:
- `devotionalBooks: Array<{ id: string; name: string }>` — distinct books that have ≥1 devotional
- `moodTiles` — already loaded, reused for tag filter options

## Files Changed

| File | Change |
|---|---|
| `src/lib/search/queries.ts` | Add `devotionals` bucket to `SearchResults` + search logic |
| `src/lib/daily-bread/queries.ts` | Add `searchDevotionals()` function + `getDevotionalBooks()` helper |
| `src/app/api/devotionals/search/route.ts` | New route |
| `src/components/daily-bread/DevotionalBrowse.tsx` | New client component |
| `src/components/daily-bread/DailyBreadLanding.tsx` | Replace static browse grid with `DevotionalBrowse` |
| `src/app/(shell)/daily-bread/page.tsx` | Add `getDevotionalBooks()` to Promise.all, pass as prop |
| `src/components/daily-bread/types.ts` | Extend types if needed |

## Verification

1. **Universal search**: search for "forgiveness" → devotionals appear in results alongside verses/themes
2. **Keyword search**: type "Philemon" in Browse tab → "Charge it to my account" appears
3. **Tag filter**: select "Bedtime" → only bedtime-tagged devotionals show
4. **Book filter**: select "Psalms" → only Psalms devotionals
5. **Audience filter**: click "Tween" → only tween-audience devotionals
6. **Combined**: tag=forgiveness + book=Philemon → narrows to intersection
7. **Clear**: clear all filters → full list returns
8. **Empty state**: impossible filter combo → "No devotionals match" message
9. **Existing tests pass**: `npm test` still green (117 tests)
