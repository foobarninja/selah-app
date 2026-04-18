# Devotional Series UI — Design Spec

**Date:** 2026-04-17
**Branch:** `devotional-series-ui`
**Status:** Approved (pending final review)

## Problem

The `devotional-series-schema` branch added `DevotionalSeries` as a first-class entity with full authoring support via MCP. But series are invisible in the app — a family who browses Daily Bread today has no way to discover a 4-part arc, no context while reading a part in the middle of one, and no way to see the full arc at once. Series exist in the DB but not in the UX.

This spec fills in the three user-facing surfaces the schema unlocks.

## Goals

1. **Discoverability** — when a family browses Daily Bread, series appear as a distinct commitment tier alongside standalone devotionals.
2. **In-reading context** — when reading a devotional that belongs to a series, the user sees "Part N of M · <Series Title>" and can navigate to the series page.
3. **Arc overview** — a dedicated page per series shows the full arc with per-part completion state, letting families plan or resume.

## Non-goals

- **Tonight tab integration / auto-resume.** The `getTonightDevotional()` picker stays series-oblivious. No "Continue your series" card on the landing page, no automatic Part N+1 surfacing after a 24h gap. These would reshape the Tonight tab and the series scheduler; explicit scope creep for this branch.
- **Binge-protection enforcement.** The app does not block or warn the user from reading Parts 1–4 back to back. It simply doesn't nudge them to. Formation pacing is handled by copy and navigation friction, not locks.
- **Prev/next buttons in reading view.** The reading surface stays focused on the four pedagogical pieces (contextBrief, modernMoment, conversationStarters, goingDeeper). Sibling navigation lives on the series detail page.
- **Series creation/editing UI.** Authoring stays on MCP for this branch. A future branch may add a series editor; not here.

## Architecture overview

Three UI surfaces, one new route, one data-layer extension:

1. **Browse tab** — dedicated "Series" section at the top of the Browse panel (filter-aware, hidden when empty). Series cards are collapsed by default, tap to expand part list inline.
2. **Reading view** — a tappable series badge at the top of the reading surface when the current devotional belongs to a series. Routes to the series detail page.
3. **Series detail page** — new route `/daily-bread/series/[id]`. Shows title, description, meta (part count + total minutes), tags, a "Start / Continue" CTA, and a per-part list with completion state.
4. **Completion flow** — one line added to the existing completion screen (below rating + notes form) for series parts: `"Part N of M. The next one will be here when you're ready."`

All four surfaces share a common `SeriesSummary` data shape returned from a new `searchSeries()` query and a `SeriesDetail` shape from a new `getSeriesById()` query.

## Data layer

### New types

Add to `src/components/daily-bread/types.ts`:

```ts
export interface SeriesSummary {
  id: string
  title: string
  description: string
  audience: AudienceLevel
  season: SeasonalSet | null
  partCount: number
  totalEstimatedMinutes: number
  tags: string[]                            // derived union of child tag names
  // Filter-bridge fields — populated only when this series matched via a child.
  bridgePart: {
    seriesOrder: number
    title: string
    passageRef: string
    devotionalId: string
  } | null
}

export interface SeriesDetail extends SeriesSummary {
  parts: Array<{
    id: string
    seriesOrder: number
    title: string
    passageRef: string
    estimatedMinutes: number
    completedAt: string | null              // most recent from devotional_history, null if never read
  }>
}
```

### New queries

`src/lib/daily-bread/queries.ts` gets two new functions:

**`searchSeries(opts)`** — parallels `searchDevotionals`. Accepts the same filter shape (`query`, `tagId`, `bookId`, `audience`, `limit`). Returns `SeriesSummary[]`. Matching rules:

- **No filters** → all series, ordered by `created_at DESC`.
- **Audience filter** → series where `devotional_series.audience = opts.audience`. For `tween`, route through the tween tag on children (mirror existing `searchDevotionals` logic).
- **Book filter** → series where any child devotional has `book_id = opts.bookId`. Populate `bridgePart` with the lowest-`seriesOrder` matching child.
- **Tag filter** → series where at least one child has that tag. Populate `bridgePart` with the lowest-`seriesOrder` matching child.
- **Query (text)** → match against `devotional_series.title`, `devotional_series.description`, or any child's `title` / `context_brief` / `modern_moment`. If the series itself matches (title/description), `bridgePart` is null. If only a child matches, populate `bridgePart` with the lowest-order matching child.
- `tags` field is computed via a JOIN/GROUP_CONCAT over `devotional_tag_map` → `devotional_tags`, deduped, ordered alphabetically.
- `totalEstimatedMinutes` is `SUM(estimated_minutes)` over child devotionals.

**`getSeriesById(id)`** — returns `SeriesDetail | null`. Includes the parts list (ordered by `series_order ASC NULLS LAST`) with `completedAt` derived from `MAX(devotional_history.completed_at)` per devotional.

### API routes

**Modify** `src/app/api/devotionals/search/route.ts` — extend to run both `searchDevotionals` and `searchSeries` in parallel, return `{ devotionals, series }`.

**New** `src/app/api/devotionals/series/[id]/route.ts` — GET returns `SeriesDetail` JSON. 404 if missing.

### Page route

**New** `src/app/(shell)/daily-bread/series/[id]/page.tsx` — server component. Fetches `getSeriesById(params.id)`. Renders a new `SeriesDetailClient` that handles the CTA button + back nav.

## Browse tab changes

**Modify** `src/components/daily-bread/DevotionalBrowse.tsx`:

1. Fetch logic now calls `/api/devotionals/search?…` and splits the response into `series[]` and `devotionals[]` state.
2. When `series.length > 0`, render a **Series section** above the flat devotional list:

```
───  Series  ───                      (section header; small uppercase, teal accent)
[ Series card ]
[ Series card ]
───  All Devotionals  ───             (section header only when series section is present)
[ Devotional card ]
...
```

3. Section headers use the label typography already established in the Daily Bread landing (body font, 10px, uppercase, 1.5px letter-spacing — same treatment as the seasonal card's "ADVENT · Week 2" label). The Series header uses a subtle teal accent color to differentiate it from the standalone-list header, which uses the default muted text-3 color.
4. **Hide the entire Series section when `series.length === 0`** — no empty-state label, no dead space. When Series is hidden, also suppress the "All Devotionals" header so the layout collapses back to today's flat list.

### Series card (collapsed, default state)

Larger footprint than standalone cards — reads as a distinct commitment tier:

```
The Friends You Choose, The Friend You Are         [4 parts · ~20 min]  ← prominent
A 4-night walk through what Proverbs, Jonathan,      [tween]
and Luke teach about choosing friends well.         [friendship] [wisdom]

Includes Part 2: The friend who hands you the crown — 1 Sam 18:1-4
                                                               [expand ⌄]
```

Fields, in order:
- **Title** — display font, 20px, same color as standalone title
- **Meta chip "4 parts · ~20 min"** — prominent, top-right. Treated as the defining commitment chip, not buried in the row.
- **Audience chip** — same styling as standalone audience chip
- **Description** — body font, 14px, two-line max with ellipsis
- **Tag chips** — derived from children (union)
- **Bridge line** — only rendered when `bridgePart !== null`. Body font, 12px, muted color. Tappable — click routes to `/daily-bread/[partDevotionalId]` via the existing open-devotional handler. Format: `Includes Part {order}: {title} — {passageRef}`.
- **Expand chevron** (bottom-right, subtle) — tap to expand inline.

### Series card (expanded state)

Tapping the expand chevron reveals the full part list inline, below the description:

```
  ✓  Part 1   The friend who tells you the truth        Prov 17:17    5 min
  ✓  Part 2   The friend who hands you the crown        1 Sam 18:1-4  5 min
  ○  Part 3   The people you walk with become you       Prov 13:20    5 min
  ○  Part 4   Where Jesus sat at the table              Luke 14:7-14  5 min
```

- Checkmark = completed (at least one `devotional_history` row). Empty circle = never read.
- Each row is tappable → routes to that part's reading view via `onOpenDevotional(id)`.
- Expanded state is client-local (`useState`) — doesn't persist across navigation. Collapse defaults on fresh mount.
- **Accessibility:** expand chevron is a real `<button>` with `aria-expanded`. Keyboard-reachable.
- **The whole series card header (title row)** is tappable too, but routes to the series detail page — not the expand toggle. Expand is its own element. This distinction matters: tapping the title = "tell me more about the arc"; tapping the chevron = "show me the parts without leaving Browse."

## Reading view badge

**Modify** `src/components/daily-bread/DailyBreadReading.tsx`:

When `devotional.seriesId` is set, render a badge at the top of the reading view, above the existing passage reference header:

```
[ ← Part 2 of 4 · The Friends You Choose ]
```

- **Must read as tappable** — design uses a subtle bordered pill with a left-chevron icon + underline treatment on hover. The single biggest risk is users reading this as a decorative label, not an affordance. Visual signal is non-negotiable.
- Routes to `/daily-bread/series/[seriesId]` on tap.
- "Part N of M · Series Title" — part position is the anchoring info, so it comes first.
- Badge is hidden entirely when `seriesId` is null (standalone devotional — no badge).

### Data shape change

The `Devotional` interface (`types.ts`) gains two optional fields:

```ts
export interface Devotional {
  // ...existing fields
  seriesId?: string | null
  seriesMeta?: { seriesOrder: number; seriesTitle: string; partCount: number } | null
}
```

`seriesMeta` is populated by the `mapDevotional` function in queries (when `seriesId` is set, it does a quick lookup against `devotional_series` and a `COUNT(*)` of children).

## Series detail page

**New route:** `/daily-bread/series/[id]`

**New files:**
- `src/app/(shell)/daily-bread/series/[id]/page.tsx` — server component
- `src/app/(shell)/daily-bread/series/[id]/SeriesDetailClient.tsx` — client component for the CTA
- `src/components/daily-bread/SeriesDetail.tsx` — presentational, props-driven

### Layout

```
[← Back to Daily Bread]

The Friends You Choose, The Friend You Are          ← display, 32px
A 4-part arc · ~20 minutes total                    ← subhead, 16px, muted
A 4-night walk through what Proverbs, Jonathan,
and Luke teach about choosing friends well.

[tween] [friendship] [wisdom]                       ← chips

[Start Part 1 →]                                    ← primary CTA (or "Continue: Part 3 →")

───  Parts  ───
  ✓  Part 1   The friend who tells you the truth        Prov 17:17    5 min
  ✓  Part 2   The friend who hands you the crown        1 Sam 18:1-4  5 min
  ○  Part 3   The people you walk with become you       Prov 13:20    5 min
  ○  Part 4   Where Jesus sat at the table              Luke 14:7-14  5 min
```

### CTA logic

Find the lowest `seriesOrder` part whose `completedAt` is null:

- **None found (all parts completed)** → CTA says `Restart: Part 1 →`.
- **Some found** → CTA says `Continue: Part N →` where N is that part's `seriesOrder`. Special case: if no parts are completed, CTA reads `Start Part 1 →` (cleaner copy for the fresh-start case).

Tapping the CTA routes to the reading view for that part (same handler used by Browse cards).

### Per-part list

- Clickable rows → reading view for that part.
- Completed: filled checkmark, subtle tick color (gold/teal — match existing rating dot palette).
- Uncompleted: outlined circle.
- `completedAt` date appears on hover (title attribute) — not in the main row (avoids visual clutter).

### Back navigation

`[← Back to Daily Bread]` uses `router.back()` if history exists, else `router.push('/daily-bread')`. Matches the existing back-nav pattern from the reading view.

## Completion flow change

**Modify** `src/components/daily-bread/DailyBreadReading.tsx` (the post-rating/notes "completed" state):

When `devotional.seriesId` is set, render one additional line **below** the existing rating + notes confirmation:

```
Part 2 of 4. The next one will be here when you're ready.
```

- Muted body text, same typography as the existing completion confirmation.
- No link, no button. Just copy. Visiting the series detail page requires the user to explicitly navigate back — matches the 24-hour pacing intent.
- Rendered only when `devotional.seriesId` is set AND the user has just marked the part complete (not on an already-completed re-visit).

## Testing

Tests added in `tests/lib/daily-bread/`:

1. **`searchSeries.test.ts`** — uses a temp DB copy (matches existing migration test pattern):
   - Empty DB → empty result.
   - Filter by audience=tween → matches series with audience=tween AND series where a child has the tween tag.
   - Filter by book=1sa with a 4-part arc spanning Prov/1Sam/Luke → returns 1 series with `bridgePart` set to the 1Sam part.
   - Filter by tag=friendship where the tag comes only from children → `bridgePart` populated with lowest-order matching child.
   - Text query matching only child content (not series title) → `bridgePart` populated; matching series title → `bridgePart` null.
   - `tags` field is deduped union of children's tags, alphabetically ordered.
   - `totalEstimatedMinutes` is SUM across children.
2. **`getSeriesById.test.ts`**:
   - Returns null for missing id.
   - Returns full detail with parts ordered by `series_order ASC NULLS LAST`.
   - `completedAt` reflects the MAX timestamp from `devotional_history`; null if no history exists.

Component-level tests are out of scope; visual correctness is verified via manual browser walkthrough against the tween-friends series already in the DB.

## Verification

1. **Dev server walkthrough:**
   - Daily Bread → Browse → see "Series" section at top. Tween-friends arc visible.
   - Apply audience=tween → series remains visible.
   - Apply book=1sa → series still visible with bridge line "Includes Part 2: …".
   - Apply audience=teens → series hidden (no match on its audience column or children's tween tag). "All Devotionals" header also hidden.
   - Tap series title → lands on `/daily-bread/series/tween-friends-arc` with all 4 parts listed, none checkmarked (assuming none have been read).
   - Tap `Start Part 1` → reading view. Badge at top: "← Part 1 of 4 · The Friends You Choose, The Friend You Are".
   - Rate + notes + submit → completion state shows "Part 1 of 4. The next one will be here when you're ready." below the confirmation.
   - Back to series detail page → Part 1 now has a checkmark. CTA reads `Continue: Part 2 →`.
   - Tap badge from reading view → back to series detail page.
2. **API surface:**
   - `GET /api/devotionals/search?book=1sa` returns `{ devotionals: [...], series: [{ id: 'tween-friends-arc', bridgePart: { seriesOrder: 20, ... } }] }`.
   - `GET /api/devotionals/series/tween-friends-arc` returns the detail shape with 4 parts.
   - `GET /api/devotionals/series/nope` returns 404.
3. **Regression:**
   - `/daily-bread` with no filters still works — if no series exist (empty DB), Series section is hidden and the page matches today's behavior exactly.
   - Reading a standalone devotional (no seriesId) shows no badge.
   - Existing search, audience filter, book filter still work for standalones.

## Open items (deferred, not blocking)

- **Tonight tab series card.** A future branch may add "Continue your series" to the Tonight tab, with auto-resume logic. When that ships, the completion line phrasing tightens from "will be here when you're ready" to "we'll bring back Part 3 tomorrow."
- **Series authoring UI.** Currently authored via MCP. A future branch may add an in-app editor.
- **Per-part completion on history entries.** `devotional_history` is unchanged; we don't yet show "you're on Part 3 of this arc" from the History tab. Low-value until users have multiple in-progress series.
- **Accessibility audit pass.** The badge-as-affordance risk deserves testing with VoiceOver/screen readers before the branch merges. Noted as a verification step; spec-level expectations are: `aria-expanded` on expand chevron, badge is a real `<a>` or `<button>` with visible focus state, all tappable card regions have proper roles.
