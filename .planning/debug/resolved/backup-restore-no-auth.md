---
slug: backup-restore-no-auth
status: resolved
trigger: settings backup/restore routes have no auth — unauthenticated full-DB download/overwrite
created: 2026-06-06
updated: 2026-06-06
---

# Debug: backup/restore routes lack authentication

## Symptoms
- **Expected:** `GET/POST` on the settings backup and restore routes require an authenticated active profile; unauthenticated requests are rejected (401). Full-DB backup/restore is a privileged operation and must not be reachable without auth.
- **Actual:** No auth check at all — any request (any or no session cookie) can **download the entire SQLite DB** (backup) or **overwrite it** (restore). Full data exfiltration + destructive overwrite, unauthenticated.
- **Errors:** None — it "works," which is the problem (missing authorization, not a crash).
- **Timeline:** Flagged as a security finding in `.planning/codebase/CONCERNS.md` during this session's codebase map.
- **Reproduction:** Hit the backup route with no `selah-profile-id` cookie → receives the DB file. Hit restore with a crafted body → overwrites the DB.

## Suspected location
- `src/app/api/settings/backup/route.ts`
- `src/app/api/settings/restore/route.ts`
- Auth primitive available: `requireActiveProfileId()` / `getActiveProfileId()` in `src/lib/profiles/active-profile.ts` (used by other API routes; throws/should 401 when no active profile). The surfaceNotes fix just established the pattern of resolving the active profile + 401 guard in a route.

## Open question for the fix
- Is backup/restore meant to be **any authenticated profile** or **admin-only**? Whole-DB backup/restore is global (not per-profile) data. Minimum bar: require an authenticated active profile (401 otherwise). Investigate whether an admin/owner concept exists to gate it further; if not, require-auth is the immediate mitigation.

## Current Focus
- hypothesis: confirmed — both routes omitted any auth guard.
- next_action: none (resolved).

## Evidence
- timestamp: 2026-06-06T12:19 — `src/app/api/settings/backup/route.ts` `GET()` called `createBackup()` immediately, zero auth. `src/app/api/settings/restore/route.ts` `POST()` read formData and called `restoreBackup()`, zero auth. Both confirmed unauthenticated.
- timestamp: 2026-06-06T12:19 — No `isAdmin`/`role`/owner field on `UserProfile` (prisma schema lines 566-580). Schema `role` columns belong to `CharacterAppearance` and `AiMessage`, unrelated. The only "admin" concept is `canModifyProfile()` in `src/lib/profiles/require-caller-profile.ts` (adult profile w/ PIN and no childLock) — scoped to *profile mutation*, not global DB ops. No reusable global-admin gate exists.
- timestamp: 2026-06-06T12:20 — Established 401 guard pattern: `src/app/api/notes/surface/.../route.ts` does `try { await requireActiveProfileId() } catch { return 401 }`. Applied the identical pattern to both target routes, guard placed BEFORE any DB read/stream/write.
- timestamp: 2026-06-06T12:20 — Regression test `tests/api/settings/backup-restore-auth.test.ts`: 5/5 pass. Asserts 401 + `createBackup`/`restoreBackup` NOT called when no active profile; happy path streams/restores for authenticated profile; 400 on missing file. `npx tsc --noEmit` clean.

## Specialist Review
- Specialist dispatch hint: typescript (Next.js App Router route handlers). The Task/skill-invocation tool was unavailable in this execution context, so the typescript-expert skill could not be auto-invoked. Mitigating factors: the fix is minimal and idiomatic, mirrors the just-merged surfaceNotes 401 guard verbatim, typechecks clean, and is covered by 5 passing tests. No idiomatic concerns identified by manual review.

## Resolution
- **root_cause:** `src/app/api/settings/backup/route.ts` (`GET`) and `src/app/api/settings/restore/route.ts` (`POST`) performed full-DB read/stream and write/overwrite with no authentication guard whatsoever — any request with no `selah-profile-id` cookie could exfiltrate or overwrite the entire SQLite database.
- **fix:** Added `requireActiveProfileId()` guard at the top of both handlers, before any DB access or upload parsing — `try { await requireActiveProfileId() } catch { return NextResponse.json({ error: 'No active profile' }, { status: 401 }) }`, matching the established surfaceNotes pattern. Authenticated behavior unchanged. Added regression test `tests/api/settings/backup-restore-auth.test.ts` (5 tests, all passing); `tsc --noEmit` clean.
- **follow-up:** No global admin/owner role exists. Backup/restore is currently gated to *any* authenticated active profile, which is the correct immediate mitigation. Consider a follow-up to restrict these global, destructive operations to an admin/owner profile (e.g. extend `UserProfile` with an owner/admin flag, or reuse the adult-with-PIN-no-childLock trust root from `canModifyProfile`) rather than any selectable profile. Tracked as a hardening follow-up, not invented here.
