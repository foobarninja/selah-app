---
slug: surfacenotes-profile-leak
status: resolved
trigger: surfaceNotes returns notes from all profiles — no user_id/profile filter (cross-profile data leak)
created: 2026-06-06
updated: 2026-06-06
---

# Debug: surfaceNotes cross-profile data leak

## Symptoms
- **Expected:** `surfaceNotes` returns only the *active profile's* resurfaced notes.
- **Actual:** Returns notes across **all** profiles — one profile's private notes leak into another profile's resurfacing feed.
- **Errors:** None thrown — silent data exposure (correctness/privacy bug, not a crash).
- **Timeline:** Flagged as a CRITICAL finding in `.planning/codebase/CONCERNS.md` during this session's codebase map. Likely present since multi-profile support was added.
- **Reproduction:** Call `surfaceNotes` (resurfacing feed) while authenticated as profile A after profile B has created notes → profile B's notes appear.

## Suspected location
- `src/lib/resurfacing.ts` — `surfaceNotes` query has no `user_id` / profile filter (per CONCERNS.md). Multi-profile isolation elsewhere keys on the `selah-profile-id` cookie → `userProfile.id`; the user-local table list and isolation pattern are documented in the codebase (see `tests/api/ai/conversations/isolation.test.ts` for the established WHERE-clause pattern).

## Current Focus
- hypothesis: CONFIRMED — `surfaceNotes` omitted the `userId`/profile predicate that every other user-local query applies.
- next_action: resolved.

## Evidence
- timestamp: 2026-06-06 11:49 — Read `src/lib/resurfacing.ts`. All five channels (direct-anchor, theme-overlap, character-overlap, cross-reference-chain, full-text-resonance) `SELECT ... FROM user_notes n` with NO `n.user_id` predicate. Confirms the leak across every channel.
- timestamp: 2026-06-06 11:49 — `UserNote` Prisma model (`src/generated/prisma/models/UserNote.ts`) has nullable `userId: string | null` field → `user_id` column exists; isolation pattern (`ai_conversations.user_id`) matches.
- timestamp: 2026-06-06 11:49 — Two callers: `src/app/(shell)/reader/[book]/[chapter]/page.tsx:61` (already resolves `userId = await requireActiveProfileId()` at line 30) and `src/app/api/notes/surface/[bookId]/[chapter]/[verse]/route.ts:15` (did not resolve active profile at all).
- timestamp: 2026-06-06 11:52 — New isolation test (`tests/lib/resurfacing/isolation.test.ts`, 3 tests) passes; mirrors Channel 1 WHERE clause, asserts no cross-profile leak for a shared verse anchor.
- timestamp: 2026-06-06 11:52 — `tsc --noEmit` clean after threading `userId` through both callers.

## Resolution
- root_cause: `surfaceNotes` in `src/lib/resurfacing.ts` queried `user_notes` across all five resurfacing channels with no `user_id` predicate, so it returned every profile's notes regardless of the active profile — a cross-profile privacy leak.
- fix: Added a required `userId` parameter to `surfaceNotes` and `AND n.user_id = ?` to every channel (including the FTS channel, which joins `user_notes n`). Threaded the active profile id through both callers: the reader page passes its existing `requireActiveProfileId()` result; the surface API route now resolves `requireActiveProfileId()` (401 if no active profile) and passes it in. Added regression test `tests/lib/resurfacing/isolation.test.ts`. `tsc --noEmit` and the new test both pass.
- files:
  - `src/lib/resurfacing.ts`
  - `src/app/(shell)/reader/[book]/[chapter]/page.tsx`
  - `src/app/api/notes/surface/[bookId]/[chapter]/[verse]/route.ts`
  - `tests/lib/resurfacing/isolation.test.ts`
