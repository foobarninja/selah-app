# Codebase Concerns

**Analysis Date:** 2026-06-06

## Security Considerations

**Backup/restore endpoints have no profile-level auth check:**
- Status: RESOLVED (2026-06-06, commit 299df5d) — both routes now require an authenticated active profile (401 otherwise) before any DB read/stream/overwrite; regression test added. Follow-up (not done): restrict these global destructive ops to an owner/admin profile — no admin role exists yet.
- Risk: Any client with a valid session cookie (any profile, not just admin/parent) can download the full SQLite database or overwrite it with an arbitrary file. The full DB contains all profiles' notes, PINs (bcrypt hashes), AI conversation history, and API keys (AES-encrypted).
- Files: `src/app/api/settings/backup/route.ts`, `src/app/api/settings/restore/route.ts`
- Current mitigation: Middleware confirms a session cookie exists, so an unauthenticated user cannot reach these routes. But any authenticated profile — including a child profile — can call them.
- Recommendation: Gate both routes on `requireActiveProfileId()` and confirm the caller is a parent/admin profile (or at minimum has a PIN set). For restore, require PIN re-verification.

**PIN brute-force: no attempt limiting on `/api/profiles/select`:**
- Status: ACCEPTED RISK (2026-06-06) — deliberately not fixed. Deployment is a single-household LAN over HTTP; the PIN guards profile *switching* (psychological privacy between family members), not a boundary against external attackers. bcrypt cost-10 throttling (~10/sec) is deemed sufficient for this threat model. Revisit if the app is ever exposed beyond the home network.
- Risk: A 4-digit numeric PIN has only 10,000 combinations. There is no lockout, rate limit, or CAPTCHA on the PIN verify endpoint. An attacker with LAN access can enumerate all PINs in seconds.
- Files: `src/app/api/profiles/select/route.ts`, `src/app/api/profiles/[id]/verify-pin/route.ts`
- Current mitigation: bcrypt cost 10 slows each attempt to ~100ms, reducing throughput to ~10 guesses/second. This is insufficient against an automated attacker.
- Recommendation: Implement attempt counting per profile in `app_settings` or an in-memory map. Lock out after 5 failed attempts for 60 seconds.

**Encryption key falls back to a static default:**
- Status: RESOLVED (2026-06-06, commit 2205846) — the hardcoded-seed branch now warns loudly and throws in production (refuses to start); env-derived branches unchanged, so existing ciphertext still decrypts (verified against live rows). Note: this install keys off `DATABASE_URL` (a predictable connection string) since `ENCRYPTION_SECRET` is unset — setting a high-entropy `ENCRYPTION_SECRET` would strengthen it, but would require re-entering stored API keys (key rotation).
- Risk: `src/lib/crypto.ts` derives the AES-256-GCM key from `ENCRYPTION_SECRET`, then `DATABASE_URL`, then the hardcoded string `'selah-default-key-seed'`. Installs that omit both env vars store API keys encrypted with a known-plaintext key, providing no real protection.
- Files: `src/lib/crypto.ts`
- Current mitigation: None — the fallback is explicit and documented in code.
- Recommendation: Warn loudly at startup if neither `ENCRYPTION_SECRET` nor `DATABASE_URL` is set. Consider refusing to start in production without a proper key.

**No HTTP security headers configured:**
- Status: RESOLVED (2026-06-06) — added a `headers()` block in `next.config.ts` applying CSP, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, and Permissions-Policy to all routes. CSP is protective on frame-ancestors/object-src/base-uri/form-action while permissive on script/style/img/font/connect so it doesn't break Next. Verified live: headers present on page + API routes, reader page still renders 200. (Note: CSP keeps 'unsafe-inline'/'unsafe-eval' for scripts — a nonce-based CSP would be stricter but needs middleware work; deferred.)
- Risk: No Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, or Referrer-Policy headers. The app serves user-generated content (notes, journal entries) which renders in the browser.
- Files: `next.config.ts` (headers key absent), `src/middleware.ts` (no header injection)
- Current mitigation: Home-LAN deployment reduces exposure, but local XSS is still possible.
- Recommendation: Add a `headers()` block in `next.config.ts` with at minimum `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and a permissive CSP.

**`first-launch` and `safe-models` endpoints unauthenticated:**
- Risk: `GET/POST /api/settings/first-launch` can be called without a session cookie (middleware allows it because it falls through to the cookie gate, but `first-launch` itself has no `requireActiveProfileId`). `safe-models` does require a parent PIN, but the profile lookup is done after an unsanitized profile-ID read.
- Files: `src/app/api/settings/first-launch/route.ts`, `src/app/api/safe-models/route.ts`
- Current mitigation: first-launch is low-risk (only reads/sets a boolean). safe-models requires parent PIN verification before any mutation.
- Recommendation: Add `requireActiveProfileId()` to first-launch to prevent state confusion on multi-profile installs.

## Tech Debt

**Dual database access pattern — Prisma + raw better-sqlite3:**
- Issue: Seven modules open raw `better-sqlite3` connections (`src/lib/resurfacing.ts`, `src/lib/search/queries.ts`, `src/lib/study-builder/queries.ts`, `src/lib/study-builder/export.ts`, `src/lib/daily-bread/queries.ts`, `src/lib/settings/queries.ts`, `src/lib/journal/migration.ts`). Each `getDb()` call opens a new connection that may not be closed on error.
- Files: All files listed above
- Impact: Two connection managers, two code patterns. FTS5 tables require raw SQLite (Prisma limitation), but some raw connections are used for non-FTS queries where Prisma could work. On errors in `src/lib/study-builder/queries.ts` (lines 46 and 185), `db.close()` is called inline rather than in a `finally` block, risking leaked handles.
- Fix approach: Wrap all raw sqlite sessions in `try/finally { db.close() }`. Consider a single shared read-only connection for FTS queries to avoid per-request open/close overhead.

**Module-level process-lifetime cache in `entity-matcher.ts` never invalidates:**
- Issue: `characterNames` and `themeNames` maps are populated once at first call and held for the process lifetime. If seed content is updated via the auto-seed-update flow while the server is running, the cache serves stale entity names until the process restarts.
- Files: `src/lib/ai/post-processing/entity-matcher.ts` (lines 4-5)
- Impact: Citations and entity links in AI responses may reference outdated character/theme IDs after a seed update without a server restart.
- Fix approach: Invalidate the cache after a seed update (emit a signal from `apply-seed-update.ts`) or convert to a time-bounded cache with a TTL of several hours.

**Prisma client only singleton-cached in development:**
- Issue: `src/lib/db.ts` caches the `PrismaClient` on `globalThis` only when `NODE_ENV !== 'production'`. In production, each HMR-equivalent module reload (rare but possible) creates a new client.
- Files: `src/lib/db.ts` (lines 20-25)
- Impact: Minor — production Next.js does not HMR, so this is a non-issue in practice, but the conditional is confusing and inverts the expected intent.
- Fix approach: Cache unconditionally on `globalThis` regardless of `NODE_ENV`, matching the standard Next.js Prisma singleton pattern.

**`eslint-disable react-hooks/exhaustive-deps` suppressions without explanation:**
- Issue: Five locations suppress the exhaustive-deps rule without a comment explaining why the dependency is intentionally omitted.
- Files: `src/app/(shell)/HomeClient.tsx:35`, `src/components/settings/ChildLockSettings.tsx:65`, `src/components/settings/ManageProfiles.tsx:57`, `src/components/settings/ProfileSettings.tsx:60`, `src/components/settings/SettingsView.tsx:186`
- Impact: Each suppression is a potential stale-closure bug. Without explanation, future maintainers cannot tell if the omission is intentional.
- Fix approach: Add inline comments explaining each suppression, or refactor to use stable `useCallback`/`useRef` patterns.

**Root-level debug scripts committed to repo:**
- Issue: Five one-off debug scripts (`check_db.js`, `query-db.js`, `query-db2.js`, `query-db3.js`, `query-db4.js`) exist at the project root. They are plain `.js` files (not `.ts`) and likely contain hardcoded paths.
- Files: `check_db.js`, `query-db.js`, `query-db2.js`, `query-db3.js`, `query-db4.js`
- Impact: Adds clutter and confusion; no automated test exercises them; they may break when the schema changes.
- Fix approach: Remove or move to `scripts/` with proper TypeScript wrappers.

## Known Issues

**`surfaceNotes` in resurfacing does not scope to the active profile:**
- Symptoms: The note-surfacing engine (`src/lib/resurfacing.ts`) queries `user_notes` without filtering by `user_id` or `profile_id`. In a single-profile install this is invisible, but in a multi-profile family install, opening a Bible passage surfaces notes written by any profile, not just the current user.
- Files: `src/lib/resurfacing.ts` (all SQL in `surfaceNotes`), `src/app/api/notes/surface/[bookId]/[chapter]/[verse]/route.ts`
- Trigger: Open a passage chapter while logged in as Profile B that Profile A has annotated.
- Workaround: None in the current code.
- Note: `user_notes.user_id` exists in the Prisma schema (`src/generated/prisma/models/UserNote.ts`). The fix is to pass `userId` into `surfaceNotes` and add `AND n.user_id = ?` to every query branch.

**`/api/settings/restore` overwrites the live database file without locking:**
- Symptoms: If a restore is triggered while active requests are reading/writing the DB (via Prisma or raw sqlite connections), the file swap (`fs.writeFileSync`) races with in-flight queries.
- Files: `src/lib/settings/queries.ts` (`restoreBackup` function, line 269)
- Trigger: Restore while another user tab is actively writing a note or completing a devotional.
- Workaround: Users are advised to restart the app after restore, but the write race exists before restart.

## Performance Bottlenecks

**Per-request raw SQLite connections for read-heavy paths:**
- Problem: `src/lib/search/queries.ts`, `src/lib/study-builder/queries.ts`, `src/lib/study-builder/export.ts`, and `src/lib/daily-bread/queries.ts` each open and close a new `better-sqlite3` connection per request. SQLite connection setup is fast but not zero-cost; for high-frequency paths like search, this adds overhead on every keystroke.
- Files: Listed above
- Cause: FTS5 requires raw SQLite; the pattern was extended to non-FTS queries for consistency.
- Improvement path: Share a single read-only `better-sqlite3` connection across all read-only modules (safe because SQLite supports concurrent readers). Alternatively, cache the connection in `globalThis` similarly to the Prisma singleton.

**`entity-matcher` performs an O(N*M) string scan on every AI response:**
- Problem: `findEntityMentions` in `src/lib/ai/post-processing/entity-matcher.ts` iterates over every character name and every theme name, scanning the full response text for each. With a large Bible character/theme DB, this is O(characters * responseLength + themes * responseLength).
- Files: `src/lib/ai/post-processing/entity-matcher.ts`
- Cause: Linear scan instead of an Aho-Corasick automaton or trie.
- Improvement path: Build a trie or use a multi-pattern regex from the cached name maps. Low priority until character/theme counts become very large.

## Fragile Areas

**Seed merge engine (`mergeUserData`) requires manual `USER_LOCAL_TABLES` maintenance:**
- Files: `src/lib/seed/user-tables.ts`, `src/lib/seed/merge-engine.ts`
- Why fragile: Adding a new user-facing table (e.g., a new `user_highlights` table) requires updating `USER_LOCAL_TABLES` manually. The merge engine does detect unknown tables and logs them, but it does not block the merge — user data in unregistered tables is silently dropped during a seed update.
- Safe modification: Always add new user-data tables to `USER_LOCAL_TABLES` before the first seed containing that table ships. The test `tests/lib/seed/merge-engine.test.ts` covers the happy path but does not enforce that all Prisma user models are registered.
- Test coverage: Happy-path merge tested; "table missing from USER_LOCAL_TABLES" scenario not tested.

**`restoreBackup` validates only the SQLite header magic bytes:**
- Files: `src/lib/settings/queries.ts` (lines 269-287)
- Why fragile: The 15-byte header check (`'SQLite format 3'`) accepts any SQLite file regardless of schema version, table structure, or whether it belongs to this application. A user could accidentally restore a different SQLite database (e.g., a Chromium profile DB) without error.
- Safe modification: After writing the file, open it with better-sqlite3 and verify that key tables (`user_profiles`, `app_settings`, `verses`) exist before committing.

**`db.ts` SCHEMA_VERSION manual bump mechanism:**
- Files: `src/lib/db.ts` (line 17)
- Why fragile: `SCHEMA_VERSION = 4` is a hand-maintained integer. Forgetting to bump it after a Prisma schema change leaves a stale cached `PrismaClient` in dev that silently serves the old schema. There is no automated check tying this version to the Prisma migration history.
- Safe modification: After any `prisma migrate dev` run, bump `SCHEMA_VERSION`. Consider replacing with a hash of the migration directory instead.

## Test Coverage Gaps

**`surfaceNotes` (resurfacing) has no tests:**
- What's not tested: The five-channel note-resurfacing engine in `src/lib/resurfacing.ts` — direct anchor match, theme overlap, character overlap, cross-reference overlap, and FTS semantic match — has no test file.
- Files: `src/lib/resurfacing.ts`
- Risk: The profile-scoping bug above would be caught immediately with a multi-profile fixture test.
- Priority: High

**No API route integration tests:**
- What's not tested: All 96 Next.js Route Handlers in `src/app/api/`. Tests exist for underlying library functions but not for the HTTP layer (auth enforcement, response shape, error codes).
- Files: `src/app/api/` (all routes)
- Risk: Auth bypasses and response-shape regressions are invisible until a manual test or user report.
- Priority: Medium

**UI component tests absent:**
- What's not tested: No component-level tests for the largest components (`src/components/reader/ReaderView.tsx` at 785 lines, `src/app/(shell)/reader/[book]/[chapter]/ReaderClient.tsx` at 763 lines, `src/components/settings/SettingsView.tsx` at 664 lines).
- Files: Listed above; only `tests/components/journal/JournalExport.test.ts` exists for components.
- Risk: UI regressions in the main reading and settings flows are undetected.
- Priority: Low

**Safety keyword taxonomy has no coverage for post-modification regressions:**
- What's not tested: `tests/safety/scan.test.ts` and `tests/safety/regression.test.ts` cover the current taxonomy, but there is no automated guard preventing a future taxonomy edit from removing a previously-passing pattern.
- Files: `src/lib/safety/keyword-taxonomy.ts`, `tests/safety/`
- Risk: A well-intentioned "cleanup" edit to the taxonomy could silently drop a critical distress-detection phrase.
- Priority: Medium

## Scaling Limits

**Single SQLite file for all data:**
- Current capacity: SQLite handles concurrent reads well. Write throughput is limited by exclusive write locks. A family of 4-5 users generating notes concurrently will see occasional lock contention but no data loss.
- Limit: If Selah were ever deployed as a shared multi-household server (outside the stated design), write contention would become noticeable above ~10 concurrent active writers.
- Scaling path: Out of scope for stated design (single-household LAN deployment). If needed, migrate to PostgreSQL via Prisma adapter swap.

## Dependencies at Risk

**`bcryptjs` (pure-JS bcrypt):**
- Risk: `bcryptjs` is the pure-JavaScript bcrypt implementation. It is significantly slower than native bindings (`bcrypt` with C++ addon) and has seen less active maintenance. At cost 10, it is adequate for the 4-digit PIN use case, but it runs on the Node.js main thread, blocking the event loop during hashing (~100ms per hash).
- Impact: Noticeable latency on profile selection when under load; negligible for single-family use.
- Migration plan: Replace with `bcrypt` (native) or use Node.js built-in `crypto.scrypt` for new installs. Existing hashes remain compatible.

---

*Concerns audit: 2026-06-06*
