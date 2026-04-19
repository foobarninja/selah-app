# Multi-User Profiles — Design

**Goal:** Add Netflix-style profile support so each person in a household has their own reading history, notes, bookmarks, journals, study projects, and companion chat threads. Primary motivation: the devotional companion feature (shipped v0.2.0) is deeply personal and users need confidence their reflections are private to their profile.

**Status:** Design approved 2026-04-19. Next step: writing-plans skill for implementation plan.

**Source:** Draft spec at [`docs/selah-user-profiles-spec.md`](../../selah-user-profiles-spec.md); this document supersedes it.

---

## Why this, why now

The companion feature just landed. With one shared profile, two family members reading from the same install see each other's companion conversations. That's a privacy failure for a feature specifically designed around intimate reflection. The fix is per-person scope, and the right moment to do it is before the feature has wide use — the migration is cheap now, expensive later.

The scope expands naturally: once profiles exist for companion threads, they should cover every user-local table already tracked by the seed-update pipeline. Notes, bookmarks, study projects, journals, reading history, devotional completions — all per profile.

## Design principles

- **Netflix-style picker** — profile select on launch, familiar pattern, no jargon.
- **PIN is privacy, not security** — 4-digit PIN, locally bcrypted, no lockout, no recovery. This is a family trust boundary, not a security perimeter.
- **Zero impact on seed-owned content** — only user-local tables gain `user_id`. Shared content (verses, commentary, devotionals, themes) stays exactly as-is.
- **Transparent migration** — existing single-user data lands on a default profile. Users with one profile see no picker, no friction.
- **Per-profile vs per-device scopes are explicit** — `app_settings` (device-level, shared across humans) stays. New `user_settings` (per-profile) holds things like primary translation and theme.

## Data model

### New: `user_profiles`

```prisma
model UserProfile {
  id           String   @id
  name         String
  avatarColor  String   @map("avatar_color")
  pinHash      String?  @map("pin_hash")
  isDefault    Boolean  @default(false) @map("is_default")
  createdAt    String   @default("") @map("created_at")
  updatedAt    String   @default("") @map("updated_at")

  @@map("user_profiles")
}
```

Notes:
- `is_default` marks the auto-created migration profile (exactly one row at migration time; the flag doesn't need to stay exclusive post-migration).
- `avatar_color` is a hex string chosen from a curated 10-color palette — no file uploads, no free-form picker.
- `pin_hash` nullable — profiles without a PIN tap to enter (young kids).

### New: `user_settings`

```prisma
model UserSetting {
  userId    String  @map("user_id")
  key       String
  value     String
  updatedAt String  @default("") @map("updated_at")

  @@id([userId, key])
  @@map("user_settings")
}
```

Composite primary key `(user_id, key)`. Simple key/value store for per-profile preferences. Mirrors `app_settings`'s shape but scoped.

### Keep: `app_settings`

Unchanged schema. Becomes **device-level only** post-migration. Holds AI config (keys, model, sampling params), backup infrastructure (last_backup_timestamp, auto_backup_enabled, retention_days), first_launch_complete, openrouter cost metadata.

### User-local tables: add `user_id`

Every entry in `USER_LOCAL_TABLES` (the seed-update allowlist) gains:

```sql
ALTER TABLE <table> ADD COLUMN user_id TEXT REFERENCES user_profiles(id) ON DELETE CASCADE;
```

Tables affected:

- `ai_conversations`, `ai_messages` (the companion threads)
- `devotional_history`
- `user_notes`, `user_note_anchors`, `user_note_themes`, `user_note_tags`, `user_tags`
- `user_bookmarks`
- `user_collections`, `user_collection_items`
- `journals`
- `reading_history`
- `study_projects`, `study_assembly_items`

**Not affected** (stays device-level):
- `app_settings` — device-shared AI/backup config
- `ai_providers`, `ai_models` — device-shared provider catalog

**`user_settings` is added to the user-local allowlist** (it's new but clearly user-local; the seed-update merge pipeline handles it via the existing "table missing from old DB" branch the first time an installed v0.2.0 upgrades past this release).

## Migration

### Step sequence

1. Create `user_profiles` + `user_settings` tables.
2. Insert one default profile: `{ id: nanoid(), name: 'Profile 1', avatar_color: <palette[0]>, pin_hash: null, is_default: true }`.
3. For every user-local table (see list above): `ALTER TABLE ADD COLUMN user_id TEXT`, then `UPDATE <table> SET user_id = <default_id> WHERE user_id IS NULL`.
4. Move the frozen key list below from `app_settings` to `user_settings` under the default profile's id.
5. Add FK constraints / ON DELETE CASCADE via table rebuild (SQLite can't add FKs via ALTER).

### Frozen migration key list

**Critical discipline**: this list lives as a literal array inside the migration file with a file-header comment flagging it as frozen-at-release-time. Editing it retroactively would double-migrate on a partial rerun for existing installs. New per-profile settings introduced in future versions write directly to `user_settings` via application code; they don't get a migration pass.

```ts
// scripts/etl/add-user-profiles-schema.ts
//
// FROZEN KEY LIST — do not edit after release. New per-profile settings
// added in future versions should write directly to user_settings via
// application code; they don't need a migration. Editing this list
// retroactively would double-migrate on a re-run for existing installs.
const MIGRATE_TO_USER_SETTINGS = [
  'primary_translation',
  'parallel_translations',
  'commentary_display',
  'daily_bread_audience',
  'theme',
] as const
```

Idempotent move:

```sql
INSERT OR IGNORE INTO user_settings (user_id, key, value, updated_at)
  SELECT ?, key, value, CURRENT_TIMESTAMP
  FROM app_settings
  WHERE key IN (?, ?, ?, ?, ?);

DELETE FROM app_settings WHERE key IN (?, ?, ?, ?, ?);
```

`INSERT OR IGNORE` handles the "partial prior run left a user_settings row" case. The subsequent `DELETE` guarantees a second run finds nothing to move.

### Stays in `app_settings` (device-level, confirmed by grep of current code)

| Category | Keys |
|---|---|
| AI provider config | `ai_provider`, `ai_model`, `ai_api_key`, `ai_api_key_<provider>`, `ollama_url`, `custom_api_url`, `ollama_disable_thinking`, `openrouter_disable_thinking` |
| AI sampling | `openrouter_{max_tokens,temperature,top_p,freq_penalty,pres_penalty}`, `ollama_{max_tokens,temperature,top_p,freq_penalty,pres_penalty}` |
| AI pricing metadata | `openrouter_prompt_cost`, `openrouter_completion_cost` |
| Backup | `last_backup_timestamp`, `auto_backup_enabled`, `auto_backup_retention_days` |
| Device lifecycle | `first_launch_complete` |

### No read-time fallback

Post-migration, `user_settings` owns the five migrated keys — full stop. The settings query layer will NOT fall back to `app_settings` if a key is missing from `user_settings`. Keeps the two tables cleanly separated and prevents "which one wins" ambiguity.

## Session + routing

### Middleware

New `src/middleware.ts` — reads the `selah-profile-id` cookie. On every request:

- Cookie present AND valid (exists in `user_profiles`) → allow.
- Missing or invalid → redirect to `/profiles` unless the request path is `/profiles`, `/_next/*`, `/api/profiles/*`, or static assets.

### Server components

Read the cookie directly via `cookies()` from `next/headers` — no custom header injection. A small helper:

```ts
// src/lib/profiles/active-profile.ts
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export async function getActiveProfileId(): Promise<string | null> {
  const id = (await cookies()).get('selah-profile-id')?.value
  if (!id) return null
  const exists = await prisma.userProfile.findUnique({ where: { id }, select: { id: true } })
  return exists ? id : null
}

export async function requireActiveProfileId(): Promise<string> {
  const id = await getActiveProfileId()
  if (!id) throw new Error('no active profile')
  return id
}
```

Server components and route handlers call `requireActiveProfileId()` at the top and pass the value into every user-local query.

### Query surface

Every user-local query function gains `userId: string` as a **required** parameter:

```ts
// Before
export async function getReadingHistory(limit = 20): Promise<ReadingHistory[]> { ... }

// After
export async function getReadingHistory(userId: string, limit = 20): Promise<ReadingHistory[]> { ... }
```

Prisma where clauses gain `userId`. Companion thread-store (already shipped) gets the same treatment — `createThread`, `findActiveThread`, `listThreads`, `appendMessage` all become user-scoped via an added `userId` parameter and filter.

### Cookie spec

- Name: `selah-profile-id`
- `HttpOnly`, `SameSite=Strict`, `Secure` only when behind HTTPS (Next auto-detects dev vs prod)
- No expiry (persistent until explicit switch or cookie clear)
- Path: `/`

### Profile picker flow

1. Launch → middleware checks cookie.
2. Cookie valid → app renders normally with active profile.
3. Cookie missing/invalid → redirect to `/profiles`.
4. `/profiles`:
   - 1 profile, no PIN → auto-set cookie, redirect to `/`. User never sees the picker.
   - 1 profile, has PIN → PIN pad.
   - 2+ profiles → grid of avatars + "Add profile" card.
5. Tap profile → PIN pad if applicable, submit → set cookie, redirect to `/`.

## Access control (approved direction: flat trust + speedbumps)

Any profile can create/edit/delete any other profile. Two speedbumps prevent accidents:

1. **Deleting a PIN-protected profile** — requires entering that profile's PIN.
2. **Deleting a non-PIN profile** — requires typing the profile's exact name in the confirmation dialog (case-sensitive).

The default profile has no special protection — it's just another profile after migration. Users can rename it or delete it (as long as another profile exists to become active).

### UI copy conventions

Deletion confirmation must list concrete counts: *"This will permanently delete Sarah's profile along with 42 notes, 3 companion threads, 147 reading-history entries, 5 journals, and 12 bookmarks."* Pull counts from the DB before rendering the dialog.

## UI components

| Component | Path | Responsibility |
|---|---|---|
| `ProfilePicker.tsx` | `src/components/profiles/ProfilePicker.tsx` | Grid of profile cards, "Add profile" card, PIN pad for protected profiles |
| `PinPad.tsx` | `src/components/profiles/PinPad.tsx` | 4-digit numeric input with backspace, submit, shake-on-wrong |
| `ProfileAvatar.tsx` | `src/components/profiles/ProfileAvatar.tsx` | Colored-initials circle — reused in picker + nav |
| `ProfileSwitcher.tsx` | `src/components/shell/ProfileSwitcher.tsx` | Header dropdown: current profile avatar, list of others, "Manage profiles" link |
| `ManageProfiles.tsx` | `src/components/settings/ManageProfiles.tsx` | List, add, edit, delete with typed-name / PIN confirmation |
| `ProfileSettings.tsx` | `src/components/settings/ProfileSettings.tsx` | Edit name, change color, set/change/remove PIN |

### Routes

| Route | Purpose |
|---|---|
| `/profiles` | Picker (public — middleware allows) |
| `/api/profiles` | GET list, POST create |
| `/api/profiles/[id]` | GET one, PATCH (name/color/PIN), DELETE |
| `/api/profiles/[id]/verify-pin` | POST { pin } → 200 on match, 401 on miss |
| `/api/profiles/select` | POST { id, pin? } → sets cookie, returns 200 |

## Defaults on smaller items

- **Avatar palette:** 10 curated colors drawn from Selah's design tokens (gold-500, terra-400, teal-400, sage-400, sky-400, warmth-400, plus muted variants). No free-form hex picker.
- **Name uniqueness:** Not enforced. Siblings can share names — PIN or the "type the name" speedbump disambiguates at delete time. Max length 30 characters, trimmed.
- **Profile count cap:** 10 per install. "Add profile" card hides at the cap; POST to `/api/profiles` returns 409 if bypassed.
- **PIN attempts:** No lockout, no rate limit beyond bcrypt's inherent cost. Family trust model.
- **Profile deletion cascade:** Hard delete via FK `ON DELETE CASCADE` on every user-local table. No soft-archive in v1.
- **Journal resurfacing engine:** Runs user-scoped via the same `user_id` filter. No special code path.
- **Existing companion threads:** The migration backfill handles them naturally — `ai_conversations.user_id` set to the default profile id for every existing row.
- **Single-profile case:** If only one profile exists AND it has no PIN, the picker is skipped entirely — middleware sets the cookie directly on first access to `/profiles`. Preserves the "user notices nothing" experience for upgrading single-user installs.

## Seed-update pipeline impact

Changes to `src/lib/seed/user-tables.ts`:

- Add `user_profiles` — even though it's user-owned, its lifecycle belongs with user data (survives seed updates).
- Add `user_settings`.

The existing merge engine handles the schema change naturally — the added `user_id` column lands in the `tablesWithAddedColumns` bucket on the first upgrade past this release, then is present in steady state. No changes needed to the merge engine code.

## Testing

### Unit

- Migration script: default profile creation; backfill sets `user_id` on every user-local table; the five frozen keys move from `app_settings` to `user_settings` under the default profile; idempotent re-run is a no-op.
- PIN hash + verify: bcrypt at cost factor 10, verify against matching and non-matching PINs, no timing-leak comparison path.
- `user_settings` queries: set/get round-trip per profile; two profiles' values are isolated.
- User-local query scoping: a sample of queries (companion thread-store, devotional history, notes, journals) all refuse to run without `userId` (TypeScript enforces this at call sites).
- `getActiveProfileId` / `requireActiveProfileId`: cookie absent returns null/throws; cookie with unknown id returns null/throws; cookie with valid id returns the id.

### Integration

- Profile picker happy path: create profile → set PIN → switch → verify old profile's data is not visible.
- Companion chat isolation: two profiles, same devotional, two messages from each — each profile sees only its own thread.
- Deletion cascade: create profile with notes/bookmarks/companion threads → delete profile → all rows gone from every user-local table.
- Single-profile auto-skip: fresh install with one profile / no PIN, `GET /profiles` sets the cookie and redirects to `/`.
- Seed-update survival: run the seed-update merge with a fresh seed against a DB containing profiles — verify all user-local tables including `user_profiles` and `user_settings` survive the swap.

### Manual regression

- Upgrade an existing single-user install to this release. Verify: all data appears under "Profile 1", no picker shown, companion threads still accessible and intact.
- Delete a PIN-protected profile: required PIN is enforced, correct PIN → deletes.
- Delete a non-PIN profile: required name-typing is enforced, correct name → deletes.
- Rename the default profile to something else — no special protection.
- Switch profiles mid-session: companion UI reloads with the new profile's threads, reading view shows the new profile's history.

## Error handling

- Middleware redirect on invalid cookie never loops — requests to `/profiles` are always allowed through.
- Deleting the last remaining profile is blocked at the API layer (400 with message) — the app needs at least one profile.
- A request arrives with no active profile AND hits a user-local API → 401 with `{ error: 'no active profile' }` (caught by the app shell and redirected to `/profiles`).
- A migration runs on a DB that already has `user_profiles` (partial prior run) — skip the CREATE TABLE step, verify the default profile exists, re-run the backfill with `INSERT OR IGNORE` / idempotent `UPDATE ... WHERE user_id IS NULL` so already-migrated rows aren't touched.

## Scope

### In scope (v1)

- Profile CRUD via Settings + Profile Picker
- 4-digit PIN set/change/remove per profile, bcrypt hashed
- Profile picker on launch (auto-skipped for single-profile, no-PIN installs)
- Quick-switch from a header `ProfileSwitcher`
- Every user-local table scoped by `user_id`
- Companion chat threads private per profile
- Transparent migration for existing installs
- Seed-update pipeline compatibility
- `user_settings` for per-profile preferences (translation, audience, theme, commentary display, parallel translations)

### Out of scope (v1)

- Avatar image uploads (colored initials only)
- Per-profile AI provider settings (stays device-shared)
- Remote/cloud profile sync
- Profile export/import
- Admin role / profile hierarchy
- Biometric unlock
- Per-profile seed preferences (e.g., "don't show me mature themes") — can be layered later via user_settings
- "Forgot PIN" recovery — intentional per family-trust model; any non-PIN'd profile or the owner can reset

## Effort estimate

| Piece | Estimate |
|---|---|
| Schema (user_profiles + user_settings) + migration | 1 day |
| User-local query scoping across all tables | 1.5 days |
| Middleware + cookie + server-component helpers | 0.5 day |
| Profile picker + PinPad + ProfileAvatar | 1 day |
| ProfileSwitcher (header) + ManageProfiles (settings) + ProfileSettings | 1 day |
| Seed-update pipeline allowlist update | 0.25 day |
| Testing + migration validation + manual regression | 1 day |
| **Total** | **~6 days** |

Slightly above the spec's 5-day estimate because of the `user_settings` split and the scoping audit across every user-local query surface (including the companion thread-store shipped in v0.2.0).

## References

- Draft spec: [`docs/selah-user-profiles-spec.md`](../../selah-user-profiles-spec.md)
- Companion chat spec (v0.2.0, shipped): [`docs/superpowers/specs/2026-04-19-devotional-companion-chat-design.md`](2026-04-19-devotional-companion-chat-design.md)
- Seed-update user-local allowlist: `src/lib/seed/user-tables.ts`
- Existing settings queries: `src/lib/settings/queries.ts`
