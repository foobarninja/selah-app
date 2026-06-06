# Selah User Profiles — Framework Spec

## Overview

Add multi-user profile support to Selah so that each person in a household has their own reading history, notes, journals, bookmarks, and companion chat threads. The primary motivation is **psychological safety** — companion chat conversations are deeply personal, and users need confidence that their reflections are private to their profile.

## Design Principles

- **Netflix-style profile selection** — profile picker on launch, simple and familiar
- **PIN-based privacy, not security** — 4-digit PIN per profile, locally hashed, no recovery flow. This is a family trust boundary, not a security perimeter
- **Zero impact on seed tables** — content is shared; only user-local tables get scoped
- **Transparent migration** — existing single-user data lands in a default profile automatically

---

## Data Model

### New Table: `user_profiles`

```sql
CREATE TABLE user_profiles (
  id            TEXT PRIMARY KEY,  -- nanoid or uuid
  name          TEXT NOT NULL,
  avatar_color  TEXT NOT NULL,     -- hex color for profile icon (no image uploads)
  pin_hash      TEXT,              -- bcrypt/scrypt hash of 4-digit PIN, NULL = no PIN
  is_default    BOOLEAN NOT NULL DEFAULT 0,
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Notes:**
- `is_default` marks the auto-created migration profile (exactly one row)
- `avatar_color` keeps it simple — colored initials circle, no file uploads
- `pin_hash` is nullable — profiles without a PIN just tap to enter (young kids)

### User-Local Table Migration

Every table in the user-local allowlist (`src/lib/seed/user-tables.ts`) gets:

```sql
ALTER TABLE <table> ADD COLUMN user_id TEXT REFERENCES user_profiles(id);
```

**Tables affected** (cross-reference with the seed-update allowlist):
- `devotional_history`
- `user_notes` / `user_note_tags`
- `user_bookmarks`
- `user_collections` / `user_collection_items`
- `journals`
- `reading_history`
- `ai_conversations` / `ai_messages`
- `study_projects` (and related)
- `app_settings`
- `user_tags`

**Migration strategy:**
1. Create the `user_profiles` table
2. Insert a default profile: `{ name: "Profile 1", is_default: true, pin_hash: null }`
3. For each user-local table: `ALTER TABLE ADD COLUMN user_id`; `UPDATE <table> SET user_id = <default_profile_id>`
4. After backfill, user_id should be treated as NOT NULL at the application layer (SQLite doesn't support adding NOT NULL via ALTER TABLE, enforce in queries/Prisma)

---

## Authentication & Session

### Profile Selection Flow

1. App launch → check how many profiles exist
   - **1 profile, no PIN** → auto-select, skip picker (seamless for single-user installs)
   - **1 profile, has PIN** → show PIN entry
   - **2+ profiles** → show profile picker grid (colored initials + name)
2. Tap profile → if PIN is set, show 4-digit PIN pad; if no PIN, enter immediately
3. Active profile stored in a session cookie (HTTP-only, same-site)
4. "Switch profile" accessible from Settings or a header/nav element

### Session Management

- **Cookie-based** — `selah-profile-id` cookie, HTTP-only, SameSite=Strict
- **Middleware** — Next.js middleware reads cookie, injects `userId` into request context
- **No cookie / invalid profile** → redirect to profile picker
- **Session duration** — persistent until explicit switch or cookie clear. No timeout (this is a home device, not a bank)

### PIN Handling

- 4-digit numeric only
- Hashed with bcrypt (cost factor 10 is fine for a 4-digit PIN)
- No "forgot PIN" flow — if someone forgets, the Selah admin (whoever set it up) can reset via Settings or a CLI command
- PIN is optional per profile — toggle in profile settings
- No lockout after failed attempts (family trust model)

---

## Query Scoping

### Pattern

Every user-local query gets a `WHERE user_id = ?` clause. The active `userId` flows from middleware → API route / server component → query function.

```typescript
// Before
export async function getReadingHistory() { ... }

// After
export async function getReadingHistory(userId: string) { ... }
```

### Enforcement

- All user-local query functions in `src/lib/*/queries.ts` must accept `userId` as a required parameter
- Prisma `where` clauses include `userId` on every user-local model
- **No global user-local queries** unless explicitly for admin/export purposes

### Companion Chat Scoping

Current: `contextRef = "devotional-companion:<devotional-id>"`

With profiles: `ai_conversations.user_id` handles scoping. Same `contextRef` pattern, but queries filter by `user_id`. Two family members can have independent companion threads on the same devotional — which is exactly the point.

---

## UI Components

### Profile Picker (`src/components/profiles/`)

- `ProfilePicker.tsx` — grid of profile cards (colored circle with initials + name), plus "Add Profile" card
- `PinPad.tsx` — 4-digit numeric input, backspace, submit. Subtle shake animation on wrong PIN
- `ProfileAvatar.tsx` — reusable colored-initials circle, used in picker and nav

### Profile Management (under Settings)

- `ProfileSettings.tsx` — edit name, change color, set/change/remove PIN
- `ManageProfiles.tsx` — list all profiles, add new, delete (with confirmation). Deleting a profile deletes all associated user-local data (hard delete, not recoverable — warn clearly)
- Only accessible to profiles without a PIN gate, OR after PIN entry? **Decision needed** — recommend: any profile can manage profiles (add/edit/delete), but deleting another profile requires entering that profile's PIN if one is set

### Active Profile Indicator

- Small colored dot or initials badge in the app header/nav
- Tap → quick-switch menu (list profiles, "Manage Profiles" link)

---

## Seed Update Pipeline Impact

The seed-update merge loop already has the user-local table allowlist. Changes:

- `user_profiles` must be added to the allowlist
- The merge loop handles `user_id` columns naturally — they're just another column in the intersection set
- New installs (fresh seed) should auto-create the default profile in the entrypoint/startup, not in the seed itself — profiles are runtime data, not seed data

---

## Migration Safety

### Upgrade path (existing single-user → multi-user)

1. Prisma migration adds `user_profiles` table + `user_id` columns
2. Migration script creates default profile, backfills all user-local rows
3. App boots normally — single profile, no PIN, auto-selected. **User notices nothing until they choose to add a profile**

### Rollback

- If migration fails partway: user-local tables may have a `user_id` column with NULLs. App should treat NULL `user_id` as "default profile" gracefully until migration completes
- Pre-migration backup recommended (document in release notes)

---

## Scope Boundaries

### In scope (v1)

- Profile CRUD (create, edit, delete)
- PIN set/change/remove per profile
- Profile picker on launch
- Quick-switch from nav
- All user-local tables scoped by `user_id`
- Companion chat threads private per profile
- Seed update pipeline compatibility
- Transparent migration for existing installs

### Out of scope (v1)

- Profile images / avatar uploads (colored initials only)
- Per-profile AI provider settings (all profiles share the same AI config)
- Profile-level content preferences (e.g., different audience filters per profile)
- Remote/cloud profile sync
- Profile export/import
- Admin role or profile hierarchy
- Biometric unlock (fingerprint/face)

---

## Testing

### Unit
- PIN hashing + verification
- Profile CRUD operations
- User-local query scoping (verify `WHERE user_id` is present)
- Migration script: default profile creation + backfill

### Integration
- Profile picker flow: create profile → set PIN → switch → verify data isolation
- Companion chat: two profiles, same devotional, independent threads
- Seed update: verify profiles + user data survive a seed merge
- Single-profile auto-select (no picker shown)

### Manual regression
- Existing single-user install: upgrade, verify all data appears under default profile
- Delete profile: confirm all associated data is removed
- PIN edge cases: no PIN set, wrong PIN, change PIN, remove PIN

---

## Estimated Effort

| Piece | Estimate |
|---|---|
| Schema + migration + Prisma | 0.5 day |
| Query scoping (all user-local queries) | 1 day |
| Session middleware + cookie management | 0.5 day |
| Profile picker + PIN pad UI | 1 day |
| Profile management (Settings) | 0.5 day |
| Nav integration (active indicator + quick-switch) | 0.5 day |
| Seed update pipeline allowlist update | 0.5 day |
| Testing + migration validation | 1 day |
| **Total** | **~5 days** |
