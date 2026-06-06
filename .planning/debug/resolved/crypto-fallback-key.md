---
slug: crypto-fallback-key
status: resolved
trigger: crypto.ts silently falls back to a hardcoded encryption key when no env secret is set
created: 2026-06-06
updated: 2026-06-06
---

# Debug: crypto.ts hardcoded fallback encryption key

## Resolution
- **root_cause:** `getEncryptionKey()` used a `??` ladder ending in the hardcoded seed `'selah-default-key-seed'`, so with neither `ENCRYPTION_SECRET` nor `DATABASE_URL` set it silently encrypted secrets under a publicly-known, zero-protection key.
- **fix:** Hardened ONLY the neither-env-set branch in `src/lib/crypto.ts`: warn loudly always, and `throw` when `NODE_ENV === 'production'`; in dev/test still derive from the seed (after a loud `console.warn`) so tests/local dev don't break. The hard-fail lives inside `getEncryptionKey()` (not module top-level) so importing the module never crashes a runner lacking env vars. The `ENCRYPTION_SECRET` and `DATABASE_URL` derivation branches are byte-for-byte unchanged.
- **blast_radius_verified:** 2 encrypted rows (`ai_api_key`, `ai_api_key_openrouter`) exist in `app_settings`, encrypted under the DATABASE_URL-derived key. Confirmed both still decrypt under the unchanged DATABASE_URL key after the fix — no ciphertext regression.
- **tests:** `tests/lib/crypto.test.ts` — added 3 regression tests (dev fallback warns + round-trips, production fallback throws, production with DATABASE_URL does NOT throw and round-trips). All 7 pass. `npx tsc --noEmit` clean.

## Symptoms
- **Expected:** When neither `ENCRYPTION_SECRET` nor `DATABASE_URL` is set, the app warns loudly (and refuses to start in production) instead of silently encrypting secrets with a known key.
- **Actual:** `src/lib/crypto.ts` silently derives the AES-256-GCM key from the hardcoded string `'selah-default-key-seed'` — known-plaintext key, no real protection for stored API keys.
- **Errors:** None — silent weak-crypto, not a crash.
- **Timeline:** Flagged in `.planning/codebase/CONCERNS.md` (this session's map).
- **Reproduction:** Run with no `ENCRYPTION_SECRET` and no `DATABASE_URL` → API keys encrypt under the hardcoded seed.

## ⚠ CRITICAL CONSTRAINT — do not break existing ciphertext
The derivation chain is `ENCRYPTION_SECRET` → `DATABASE_URL` → hardcoded seed.
- **The current deployment HAS `DATABASE_URL` set** (`.env`: `DATABASE_URL="file:./data/selah.db"`), so stored API keys are currently encrypted with the **DATABASE_URL-derived key**.
- The fix MUST keep deriving from `DATABASE_URL` exactly as today for installs that have it set — otherwise every already-stored encrypted value (API keys) becomes undecryptable.
- Only the **hardcoded-fallback branch** (neither env var present) may change behavior (warn / refuse-to-start). Do NOT change the `ENCRYPTION_SECRET` or `DATABASE_URL` derivation.
- Verify whether any encrypted secrets exist in `app_settings` before/while changing, to gauge migration risk.

## Suspected location
- `src/lib/crypto.ts` — key derivation fallback ladder.

## Current Focus
- hypothesis: the hardcoded `'selah-default-key-seed'` fallback should be replaced with a loud warning + production hard-fail, leaving the env-derived paths untouched. (CONFIRMED)
- next_action: resolved — fix applied and validated.
