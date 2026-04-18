# Devotional Series Schema — Design Spec

**Date:** 2026-04-17
**Branch:** `devotional-series-schema`
**Status:** Approved (pending final review)

## Problem

Selah has no way to model multi-part devotional series. A "4-night tween arc through Jonah" today has to live as four unrelated devotionals with no link between them. Users can't browse series as first-class entities, authors can't easily ensure ordering, and the app has no way to surface "Part 2 of 4" context when a user reads one.

## Decision

Add `DevotionalSeries` as a first-class entity with a dedicated table. Link devotionals to a series via an optional FK + order.

## Non-goals

- **UI work** — this branch is schema + authoring tools only. Surfacing series in Daily Bread (landing page, browse, reading view) is a follow-up branch.
- **Per-series scheduling / dayOffset** — deferred. `season` is enough for now; advent/lent scheduling UX can build on that later.
- **Cover color / icon** — deferred. Add when UI lands.
- **Tag FK on series** — rejected. Series inherit taxonomy from their children (see Architecture).

## Architecture

### New model: `DevotionalSeries`

```prisma
model DevotionalSeries {
  id          String  @id
  title       String
  description String          // non-nullable; required for UI surface
  audience    String  @default("family")
  season      String?
  sourceTier  String  @default("ai_assisted") @map("source_tier")
  sourceNotes String? @map("source_notes")
  createdAt   String  @default("") @map("created_at")

  devotionals Devotional[]

  @@map("devotional_series")
}
```

No `tagId` column. Series tags are derived at query time via the union of tags on their child devotionals. Rationale: matches the "atoms carry metadata, containers are thin" pattern used elsewhere (devotional tags already live on the atom, not on any container). Eliminates the authoring cost of keeping series tags in sync with devotional tags.

**Trade-off accepted:** series cannot have a tag that none of its devotionals carry. Considered rare; if it materializes, add a `series_tag_map` join table later without breaking existing queries.

### Modifications to `Devotional`

```prisma
model Devotional {
  // ... existing fields
  seriesId    String? @map("series_id")
  seriesOrder Int?    @map("series_order")

  series DevotionalSeries? @relation(fields: [seriesId], references: [id], onDelete: SetNull)

  @@index([seriesId, seriesOrder])
  // existing indexes retained
}
```

**FK cascade:** `onDelete: SetNull`. Devotionals are the primary entity; deleting a series should decompose it, not cascade-delete its devotionals.

**Compound index** on `[seriesId, seriesOrder]` — covers the dominant query (fetch a series in order).

### Ordering convention

`seriesOrder` uses **sparse numbering** (10, 20, 30, 40) rather than dense (1, 2, 3, 4). Insertion between Parts 2 and 3 becomes a free operation (`seriesOrder: 25`) instead of a cascade renumber. The app layer and MCP tools treat `seriesOrder` as an opaque sort key, not an index.

### Integrity constraints

Two SQL-level constraints, added via raw migration (Prisma schema doesn't model CHECK constraints):

1. **Both-or-neither CHECK**:
   ```sql
   ALTER TABLE devotionals ADD CONSTRAINT series_pairing CHECK (
     (series_id IS NULL AND series_order IS NULL)
     OR (series_id IS NOT NULL AND series_order IS NOT NULL)
   );
   ```
   Prevents "in a series but unordered" or "ordered but seriesless" states.

2. **Unique order within series** (partial unique index):
   ```sql
   CREATE UNIQUE INDEX idx_devotional_unique_series_order
     ON devotionals (series_id, series_order)
     WHERE series_id IS NOT NULL;
   ```
   Prevents duplicate Part 2s. Partial index (only enforced when `series_id` is set) leaves standalone devotionals unaffected.

Both constraints are enforceable in SQLite natively and travel with the xz-packaged DB to production.

## Authoring Surface (MCP)

Three changes to the MCP server — all land in this branch:

1. **`upsert_devotional_series`** (new tool) — create or update a series. Fields: id, title, description, audience, season. Stamps `sourceTier = AI_TIER` and builds `sourceNotes` via the existing `buildSourceNotes()` / `appendRevisionMarker()` helpers from `mcp/lib/provenance.ts`. Wrapped in `withWriteLog()`.

2. **`upsert_devotional`** (existing, extended) — add optional `seriesId` and `seriesOrder` params. Validates:
   - Both provided or neither (mirrors DB constraint; fail fast with a clear error)
   - `seriesId` exists in `devotional_series` (FK guard with friendly error)
   - `seriesOrder` doesn't collide with another devotional in the same series (unless updating the same devotional)

3. **`query_devotionals`** (existing, extended) — add `seriesId` filter. Returns results ordered by `seriesOrder` when the filter is set. No new tool needed for `query_series` — that's deferred until a UI actually needs it.

**Authoring order:** create series first, then attach devotionals. The tools enforce this via FK validation.

## Migration Plan

One Prisma migration:

1. `CREATE TABLE devotional_series (...)` with the fields above.
2. `ALTER TABLE devotionals ADD COLUMN series_id TEXT REFERENCES devotional_series(id) ON DELETE SET NULL`.
3. `ALTER TABLE devotionals ADD COLUMN series_order INTEGER`.
4. `CREATE INDEX idx_devotionals_series_order ON devotionals(series_id, series_order)`.
5. `CREATE UNIQUE INDEX idx_devotional_unique_series_order ON devotionals(series_id, series_order) WHERE series_id IS NOT NULL`.
6. `ALTER TABLE devotionals ADD CONSTRAINT series_pairing CHECK (...)`.

No data migration required — all existing devotionals have `series_id = NULL` and `series_order = NULL` (both-or-neither satisfied).

The Prisma schema is updated to reflect the new model + columns (so `prisma generate` produces correct types), and the migration itself runs as a standalone raw-SQL script under `scripts/etl/` — following the same pattern used by existing schema changes. This avoids Prisma's inability to express CHECK constraints and partial unique indexes directly. The script is idempotent and safe to re-run.

## Verification

1. **Migration applies cleanly** on `data/selah.db` and a scratch copy.
2. **Prisma client regenerates** with `DevotionalSeries` and new `Devotional` fields typed correctly.
3. **Existing devotional queries still work** — `getBrowseDevotionals`, `searchDevotionals`, `getDevotionalHistory` unchanged.
4. **Authoring flow end-to-end via MCP:**
   - Create a test series via `upsert_devotional_series`.
   - Attach an existing devotional to it via `upsert_devotional` with `seriesId + seriesOrder: 10`.
   - Verify FK + order visible via `query_devotionals({ seriesId })`.
   - Attempt to attach a second devotional at `seriesOrder: 10` — expect unique-index error.
   - Attempt to set only `seriesId` without `seriesOrder` — expect CHECK error (or MCP pre-validation error).
   - Detach by passing `seriesId: null` — both fields clear.
5. **FK SetNull behavior:** delete the test series row manually — child devotionals should have both `series_id` and `series_order` set to NULL (CHECK still satisfied).

## Open Items (deferred, not blocking)

- **`query_series` MCP tool** — defer until UI needs it.
- **Per-series `startDate` / `dayOffset`** — revisit when seasonal scheduling UI is designed.
- **Cover color / icon** — revisit with UI branch.
- **`series_tag_map` join table** — revisit only if a series needs a tag none of its devotionals carry.
