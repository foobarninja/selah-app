# Multi-User Profiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Netflix-style multi-user profiles so each person has their own reading history, notes, journals, bookmarks, study projects, and — critically — private companion chat threads.

**Architecture:** New `user_profiles` + `user_settings` tables. Every user-local table gains `user_id TEXT`. Cookie-based session (`selah-profile-id` HTTP-only, SameSite=Strict). Next.js middleware gates unprotected paths; server components read the active profile via `cookies()` directly. Every user-local query gains a required `userId` parameter. Existing single-user data transparently migrates to a default profile.

**Tech Stack:** Next.js 16, Prisma 7 + better-sqlite3, bcryptjs (new dep), React 19, vitest.

**Spec:** [`docs/superpowers/specs/2026-04-19-multi-user-profiles-design.md`](../specs/2026-04-19-multi-user-profiles-design.md)

---

## File structure

### New files

| File | Responsibility |
|---|---|
| `prisma/schema.prisma` | **Modify** — add `UserProfile` + `UserSetting` models, add `userId` optional field to every user-local model |
| `scripts/etl/add-user-profiles-schema.ts` | **Create** — idempotent migration (tables + columns + backfill + frozen-key-list move) |
| `src/lib/profiles/pin.ts` | **Create** — `hashPin(pin)` + `verifyPin(pin, hash)` via bcryptjs |
| `src/lib/profiles/active-profile.ts` | **Create** — `getActiveProfileId()` / `requireActiveProfileId()` / `setActiveProfileCookie(id)` / `clearActiveProfileCookie()` |
| `src/lib/profiles/queries.ts` | **Create** — profile CRUD + cascade-delete helper |
| `src/lib/settings/user-settings.ts` | **Create** — per-profile key/value accessors (mirrors `getSetting`/`setSetting` shape but scoped) |
| `src/middleware.ts` | **Create** — redirect-to-/profiles gate |
| `src/app/api/profiles/route.ts` | **Create** — GET list, POST create |
| `src/app/api/profiles/[id]/route.ts` | **Create** — GET one, PATCH, DELETE (with cascade) |
| `src/app/api/profiles/[id]/verify-pin/route.ts` | **Create** — POST { pin } |
| `src/app/api/profiles/select/route.ts` | **Create** — POST { id, pin? } — sets cookie |
| `src/app/(public)/profiles/page.tsx` | **Create** — profile picker page (public; middleware allows) |
| `src/app/(public)/profiles/ProfilesClient.tsx` | **Create** — client component with grid + PIN pad + add-profile |
| `src/components/profiles/ProfileAvatar.tsx` | **Create** — colored-initials circle |
| `src/components/profiles/PinPad.tsx` | **Create** — 4-digit numeric input with shake on wrong |
| `src/components/profiles/ProfilePicker.tsx` | **Create** — grid rendered inside ProfilesClient |
| `src/components/shell/ProfileSwitcher.tsx` | **Create** — header dropdown |
| `src/components/settings/ManageProfiles.tsx` | **Create** — list/add/delete with typed-name/PIN confirmation |
| `src/components/settings/ProfileSettings.tsx` | **Create** — edit name, color, PIN |
| `src/lib/seed/user-tables.ts` | **Modify** — add `user_profiles`, `user_settings` to `USER_LOCAL_TABLES` |

### Modified files (query scoping surface)

Each file listed here gains `userId: string` as a required parameter on every user-local query function and updates callers to pass the value from `requireActiveProfileId()`:

- `src/lib/ai/companion/thread-store.ts` (companion threads)
- `src/app/api/ai/companion/stream/route.ts` + `src/app/api/ai/companion/thread/route.ts`
- `src/lib/daily-bread/queries.ts` (devotional_history + anything user-scoped)
- `src/lib/reader/history.ts` (reading_history)
- `src/lib/journal/queries.ts` (journals + user_notes + user_note_* + user_tags)
- `src/lib/study-builder/queries.ts` + `src/lib/study-builder/export.ts` (study_projects + study_assembly_items)
- `src/lib/home/queries.ts`
- `src/lib/settings/queries.ts` (route the 5 per-profile keys to user_settings)
- `src/app/api/ai/conversations/route.ts` + related (general AI conversations — scope by userId)
- All server components + API routes that call these queries

---

## Task 1: Schema + idempotent migration

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `scripts/etl/add-user-profiles-schema.ts`

- [ ] **Step 1: Add Prisma models**

Add two new models in `prisma/schema.prisma` (place them near the other user-local models, e.g., after `AppSetting`):

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

model UserSetting {
  userId    String  @map("user_id")
  key       String
  value     String
  updatedAt String  @default("") @map("updated_at")

  @@id([userId, key])
  @@map("user_settings")
}
```

- [ ] **Step 2: Add `userId` optional field to every user-local model**

For each of these models in `prisma/schema.prisma`, add `userId String? @map("user_id")` as a new field. They start optional at the Prisma layer because existing rows will backfill; application code treats the field as required post-migration.

Models to modify:
- `AiConversation`
- `AiMessage`
- `DevotionalHistory`
- `UserNote`
- `UserNoteAnchor`
- `UserNoteTheme`
- `UserNoteTag`
- `UserTag`
- `UserBookmark`
- `UserCollection`
- `UserCollectionItem`
- `Journal`
- `ReadingHistory`
- `StudyProject`
- `StudyAssemblyItem`

Example for `AiConversation`:

```prisma
model AiConversation {
  id         Int     @id @default(autoincrement())
  title      String?
  contextRef String? @map("context_ref")
  userId     String? @map("user_id")   // NEW
  createdAt  String  @default("") @map("created_at")
  updatedAt  String  @default("") @map("updated_at")

  messages AiMessage[]

  @@map("ai_conversations")
}
```

Apply the equivalent for every model in the list above.

- [ ] **Step 3: Write the migration script**

Create `scripts/etl/add-user-profiles-schema.ts`:

```ts
// scripts/etl/add-user-profiles-schema.ts
//
// Idempotent migration for multi-user profiles.
//
// FROZEN KEY LIST — do not edit after release. New per-profile settings
// added in future versions should write directly to user_settings via
// application code; they don't need a migration. Editing this list
// retroactively would double-migrate on a re-run for existing installs.

import Database from 'better-sqlite3'
import { resolve } from 'path'
import { randomUUID } from 'crypto'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

const USER_LOCAL_TABLES = [
  'ai_conversations',
  'ai_messages',
  'devotional_history',
  'user_notes',
  'user_note_anchors',
  'user_note_themes',
  'user_note_tags',
  'user_tags',
  'user_bookmarks',
  'user_collections',
  'user_collection_items',
  'journals',
  'reading_history',
  'study_projects',
  'study_assembly_items',
] as const

const MIGRATE_TO_USER_SETTINGS = [
  'primary_translation',
  'parallel_translations',
  'commentary_display',
  'daily_bread_audience',
  'theme',
] as const

const DEFAULT_AVATAR_COLOR = '#C6A23C' // selah-gold-500

function tableExists(db: Database.Database, name: string): boolean {
  const row = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(name) as { name: string } | undefined
  return !!row
}

function columnExists(db: Database.Database, table: string, column: string): boolean {
  const row = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info(?) WHERE name=?`)
    .get(table, column) as { n: number }
  return row.n > 0
}

function migrate(db: Database.Database): void {
  // 1. Create user_profiles
  if (!tableExists(db, 'user_profiles')) {
    console.log('[migration] creating user_profiles...')
    db.exec(`
      CREATE TABLE user_profiles (
        id            TEXT PRIMARY KEY,
        name          TEXT NOT NULL,
        avatar_color  TEXT NOT NULL,
        pin_hash      TEXT,
        is_default    INTEGER NOT NULL DEFAULT 0,
        created_at    TEXT NOT NULL DEFAULT '',
        updated_at    TEXT NOT NULL DEFAULT ''
      );
    `)
  } else {
    console.log('[migration] user_profiles exists — skipping')
  }

  // 2. Create user_settings
  if (!tableExists(db, 'user_settings')) {
    console.log('[migration] creating user_settings...')
    db.exec(`
      CREATE TABLE user_settings (
        user_id     TEXT NOT NULL,
        key         TEXT NOT NULL,
        value       TEXT NOT NULL,
        updated_at  TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (user_id, key)
      );
    `)
  } else {
    console.log('[migration] user_settings exists — skipping')
  }

  // 3. Ensure default profile exists
  const existing = db.prepare(`SELECT id FROM user_profiles WHERE is_default = 1`).get() as { id: string } | undefined
  let defaultId: string
  if (existing) {
    defaultId = existing.id
    console.log(`[migration] default profile exists (id=${defaultId})`)
  } else {
    defaultId = randomUUID()
    const now = new Date().toISOString()
    db.prepare(`
      INSERT INTO user_profiles (id, name, avatar_color, pin_hash, is_default, created_at, updated_at)
      VALUES (?, 'Profile 1', ?, NULL, 1, ?, ?)
    `).run(defaultId, DEFAULT_AVATAR_COLOR, now, now)
    console.log(`[migration] inserted default profile (id=${defaultId})`)
  }

  // 4. Add user_id column to every user-local table, backfill to default
  for (const table of USER_LOCAL_TABLES) {
    if (!tableExists(db, table)) {
      console.log(`[migration]   ${table} doesn't exist — skipping`)
      continue
    }
    if (!columnExists(db, table, 'user_id')) {
      console.log(`[migration]   adding ${table}.user_id`)
      db.exec(`ALTER TABLE ${table} ADD COLUMN user_id TEXT`)
    }
    const updated = db
      .prepare(`UPDATE ${table} SET user_id = ? WHERE user_id IS NULL`)
      .run(defaultId)
    if (updated.changes > 0) {
      console.log(`[migration]   backfilled ${updated.changes} rows in ${table}`)
    }
  }

  // 5. Move the 5 frozen keys from app_settings to user_settings
  //    INSERT OR IGNORE so partial retries don't clobber; then delete.
  const placeholders = MIGRATE_TO_USER_SETTINGS.map(() => '?').join(',')
  const now = new Date().toISOString()
  const moved = db
    .prepare(`
      INSERT OR IGNORE INTO user_settings (user_id, key, value, updated_at)
        SELECT ?, key, value, ?
        FROM app_settings
        WHERE key IN (${placeholders})
    `)
    .run(defaultId, now, ...MIGRATE_TO_USER_SETTINGS)
  if (moved.changes > 0) {
    console.log(`[migration] moved ${moved.changes} settings to user_settings`)
  }
  const deleted = db
    .prepare(`DELETE FROM app_settings WHERE key IN (${placeholders})`)
    .run(...MIGRATE_TO_USER_SETTINGS)
  if (deleted.changes > 0) {
    console.log(`[migration] removed ${deleted.changes} moved rows from app_settings`)
  }
}

function main(): void {
  const db = new Database(DB_PATH)
  try {
    db.pragma('foreign_keys = OFF')
    db.transaction(() => migrate(db))()
    console.log('[migration] committed.')
  } finally {
    db.close()
  }
}

main()
```

- [ ] **Step 4: Run the migration against the live DB**

Run: `npx tsx scripts/etl/add-user-profiles-schema.ts`
Expected:
- First run: logs `creating user_profiles...`, `creating user_settings...`, `inserted default profile (id=<uuid>)`, backfill counts per table, and settings-move counts.
- Re-run immediately: logs `user_profiles exists — skipping`, `user_settings exists — skipping`, `default profile exists (id=<same uuid>)`, no backfill changes, no settings moved.

- [ ] **Step 5: Regenerate Prisma client**

Run: `npx prisma generate`
Expected: `Prisma Client generated successfully`.

- [ ] **Step 6: Verify migration produced the expected rows**

Run:
```bash
node -e "const d=require('better-sqlite3')('data/selah.db',{readonly:true});console.log(d.prepare('SELECT id, name, is_default FROM user_profiles').all());console.log(d.prepare('SELECT COUNT(*) n FROM user_settings').get());console.log(d.prepare(\"SELECT name FROM pragma_table_info('devotional_history') WHERE name='user_id'\").all())"
```
Expected: one profile row with `name: 'Profile 1'`, `is_default: 1`. `user_settings` count ≥ 0 (matches pre-migration per-profile keys you had set). `devotional_history.user_id` column present.

- [ ] **Step 7: Run tests**

Run: `npm test`
Expected: `Tests  187 passed (187)` (unchanged — no code depends on the new columns yet).

- [ ] **Step 8: Commit**

```bash
git add prisma/schema.prisma scripts/etl/add-user-profiles-schema.ts src/generated/prisma
git commit -m "feat(profiles): schema + migration for user_profiles + user_settings

Creates user_profiles (id, name, avatar_color, pin_hash, is_default,
timestamps) and user_settings (user_id/key/value composite key). Adds
user_id TEXT to every user-local table and backfills to a single
default profile. Moves the frozen 5-key list (primary_translation,
parallel_translations, commentary_display, daily_bread_audience,
theme) from app_settings into user_settings under the default profile.

Migration is idempotent; re-running is safe."
```

---

## Task 2: PIN hashing helpers

**Files:**
- Modify: `package.json` (add bcryptjs dep)
- Create: `src/lib/profiles/pin.ts`
- Create: `tests/lib/profiles/pin.test.ts`

- [ ] **Step 1: Add bcryptjs dependency**

Run: `npm install bcryptjs && npm install --save-dev @types/bcryptjs`
Expected: adds `bcryptjs` to `dependencies` and `@types/bcryptjs` to `devDependencies`.

- [ ] **Step 2: Write failing tests**

Create `tests/lib/profiles/pin.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { hashPin, verifyPin, isValidPinFormat } from '@/lib/profiles/pin'

describe('isValidPinFormat', () => {
  it('accepts 4 digits', () => {
    expect(isValidPinFormat('1234')).toBe(true)
    expect(isValidPinFormat('0000')).toBe(true)
  })
  it('rejects non-4-digit strings', () => {
    expect(isValidPinFormat('123')).toBe(false)
    expect(isValidPinFormat('12345')).toBe(false)
    expect(isValidPinFormat('')).toBe(false)
    expect(isValidPinFormat('12ab')).toBe(false)
    expect(isValidPinFormat('12 4')).toBe(false)
  })
})

describe('hashPin + verifyPin', () => {
  it('hashes a PIN and verifies against it', async () => {
    const hash = await hashPin('1234')
    expect(hash).not.toBe('1234')
    expect(hash.length).toBeGreaterThan(30)
    expect(await verifyPin('1234', hash)).toBe(true)
  })

  it('rejects the wrong PIN', async () => {
    const hash = await hashPin('1234')
    expect(await verifyPin('0000', hash)).toBe(false)
    expect(await verifyPin('12345', hash)).toBe(false)
    expect(await verifyPin('', hash)).toBe(false)
  })

  it('two hashes of the same PIN differ (salted)', async () => {
    const a = await hashPin('1234')
    const b = await hashPin('1234')
    expect(a).not.toBe(b)
    expect(await verifyPin('1234', a)).toBe(true)
    expect(await verifyPin('1234', b)).toBe(true)
  })

  it('hashPin throws on invalid PIN format', async () => {
    await expect(hashPin('12')).rejects.toThrow(/4 digits/i)
    await expect(hashPin('abcd')).rejects.toThrow(/4 digits/i)
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/lib/profiles/pin.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement**

Create `src/lib/profiles/pin.ts`:

```ts
// src/lib/profiles/pin.ts
//
// PIN hashing for profile gating. bcrypt with cost factor 10 — plenty
// strong for a 4-digit PIN protecting against physical access in a
// family trust context. Not a security perimeter; see the design spec
// for the threat model.

import bcrypt from 'bcryptjs'

const COST = 10

export function isValidPinFormat(pin: string): boolean {
  return /^\d{4}$/.test(pin)
}

export async function hashPin(pin: string): Promise<string> {
  if (!isValidPinFormat(pin)) {
    throw new Error('PIN must be exactly 4 digits')
  }
  return bcrypt.hash(pin, COST)
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  if (!isValidPinFormat(pin)) return false
  try {
    return await bcrypt.compare(pin, hash)
  } catch {
    return false
  }
}
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run tests/lib/profiles/pin.test.ts`
Expected: `Tests  4 passed (4)`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/lib/profiles/pin.ts tests/lib/profiles/pin.test.ts
git commit -m "feat(profiles): bcrypt PIN hashing with format validation"
```

---

## Task 3: Active profile helpers + middleware

**Files:**
- Create: `src/lib/profiles/active-profile.ts`
- Create: `tests/lib/profiles/active-profile.test.ts`
- Create: `src/middleware.ts`

- [ ] **Step 1: Write failing tests for the helpers**

Create `tests/lib/profiles/active-profile.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/headers' cookies() and the prisma client BEFORE importing
// the module under test.
const cookieStore = new Map<string, string>()
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => {
      const v = cookieStore.get(name)
      return v ? { name, value: v } : undefined
    },
    set: (arg: { name: string; value: string }) => {
      cookieStore.set(arg.name, arg.value)
    },
    delete: (name: string) => {
      cookieStore.delete(name)
    },
  }),
}))

const findUnique = vi.fn()
vi.mock('@/lib/db', () => ({
  prisma: { userProfile: { findUnique: (...args: unknown[]) => findUnique(...args) } },
}))

beforeEach(() => {
  cookieStore.clear()
  findUnique.mockReset()
})

describe('getActiveProfileId', () => {
  it('returns null when no cookie is set', async () => {
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBeNull()
  })

  it('returns null when cookie refers to a missing profile', async () => {
    cookieStore.set('selah-profile-id', 'gone')
    findUnique.mockResolvedValueOnce(null)
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBeNull()
  })

  it('returns the id when cookie matches an existing profile', async () => {
    cookieStore.set('selah-profile-id', 'profile-1')
    findUnique.mockResolvedValueOnce({ id: 'profile-1' })
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBe('profile-1')
  })
})

describe('requireActiveProfileId', () => {
  it('throws when no active profile', async () => {
    const { requireActiveProfileId } = await import('@/lib/profiles/active-profile')
    await expect(requireActiveProfileId()).rejects.toThrow(/no active profile/i)
  })
  it('returns id when cookie is valid', async () => {
    cookieStore.set('selah-profile-id', 'ok')
    findUnique.mockResolvedValueOnce({ id: 'ok' })
    const { requireActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await requireActiveProfileId()).toBe('ok')
  })
})
```

- [ ] **Step 2: Run tests to confirm fail**

Run: `npx vitest run tests/lib/profiles/active-profile.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement helpers**

Create `src/lib/profiles/active-profile.ts`:

```ts
// src/lib/profiles/active-profile.ts
//
// Resolves the active profile from the selah-profile-id HTTP-only cookie.
// Used by server components and API routes to scope user-local queries.

import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'

export const PROFILE_COOKIE_NAME = 'selah-profile-id'

export async function getActiveProfileId(): Promise<string | null> {
  const store = await cookies()
  const id = store.get(PROFILE_COOKIE_NAME)?.value
  if (!id) return null
  const row = await prisma.userProfile.findUnique({
    where: { id },
    select: { id: true },
  })
  return row ? row.id : null
}

export async function requireActiveProfileId(): Promise<string> {
  const id = await getActiveProfileId()
  if (!id) throw new Error('no active profile')
  return id
}

export async function setActiveProfileCookie(id: string): Promise<void> {
  const store = await cookies()
  store.set({
    name: PROFILE_COOKIE_NAME,
    value: id,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
  })
}

export async function clearActiveProfileCookie(): Promise<void> {
  const store = await cookies()
  store.delete(PROFILE_COOKIE_NAME)
}
```

- [ ] **Step 4: Run helper tests**

Run: `npx vitest run tests/lib/profiles/active-profile.test.ts`
Expected: `Tests  5 passed (5)`.

- [ ] **Step 5: Implement middleware**

Create `src/middleware.ts`:

```ts
// src/middleware.ts
//
// Redirects to /profiles when the selah-profile-id cookie is absent.
// Allows /profiles, /api/profiles/*, /_next, static assets, and the
// seed-update routes (they're triggered by the entrypoint, not users).
//
// The middleware runs on the edge — it CANNOT validate the cookie
// against the DB. It only checks that the cookie exists. Invalid
// cookies (e.g., pointing at a deleted profile) are caught later by
// getActiveProfileId returning null; that path is handled by server
// components and route handlers.

import { NextRequest, NextResponse } from 'next/server'

const PROFILE_COOKIE_NAME = 'selah-profile-id'

const ALLOW_PREFIXES = [
  '/profiles',
  '/api/profiles',
  '/_next',
  '/favicon',
  '/api/health',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow listed prefixes + any file with an extension (static assets).
  if (ALLOW_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }
  if (/\.[a-zA-Z0-9]{2,5}$/.test(pathname)) {
    return NextResponse.next()
  }

  const cookie = request.cookies.get(PROFILE_COOKIE_NAME)
  if (!cookie) {
    const url = request.nextUrl.clone()
    url.pathname = '/profiles'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match everything except Next internals the `ALLOW_PREFIXES` list
    // would cover anyway. The prefix check inside the function is the
    // authoritative gate.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

- [ ] **Step 6: Smoke-compile**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/profiles/active-profile.ts tests/lib/profiles/active-profile.test.ts src/middleware.ts
git commit -m "feat(profiles): active-profile helpers + middleware gate

Cookie-backed helpers resolve the active profile and set/clear the
HTTP-only SameSite=Strict cookie. Middleware redirects unauthenticated
requests to /profiles except for the picker itself, profile API routes,
Next internals, and static assets."
```

---

## Task 4: Profile CRUD API routes + cascade-delete helper

**Files:**
- Create: `src/lib/profiles/queries.ts`
- Create: `tests/lib/profiles/queries.test.ts`
- Create: `src/app/api/profiles/route.ts`
- Create: `src/app/api/profiles/[id]/route.ts`
- Create: `src/app/api/profiles/[id]/verify-pin/route.ts`
- Create: `src/app/api/profiles/select/route.ts`

- [ ] **Step 1: Write failing tests for the queries module**

Create `tests/lib/profiles/queries.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('profiles/queries', () => {
  let dir: string
  let dbPath: string

  beforeEach(async () => {
    dir = mkdtempSync(join(tmpdir(), 'selah-profiles-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE user_profiles (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, avatar_color TEXT NOT NULL,
        pin_hash TEXT, is_default INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE user_notes (id INTEGER PRIMARY KEY, user_id TEXT, body TEXT);
      CREATE TABLE journals (id TEXT PRIMARY KEY, user_id TEXT, title TEXT);
      CREATE TABLE ai_conversations (id INTEGER PRIMARY KEY, user_id TEXT, title TEXT);
    `)
    db.close()
    process.env.DATABASE_URL = `file:${dbPath}`
    // Reset Prisma global singleton (see tests/lib/ai/companion/thread-store.test.ts precedent).
    const globalForPrisma = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
    globalForPrisma.prisma = undefined
    globalForPrisma.prismaVersion = undefined
    const { vi } = await import('vitest')
    vi.resetModules()
  })

  afterEach(async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.$disconnect()
    rmSync(dir, { recursive: true, force: true })
  })

  it('createProfile inserts with defaults and returns the row', async () => {
    const { createProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Ada', avatarColor: '#ff0', pin: null })
    expect(p.id.length).toBeGreaterThan(10)
    expect(p.name).toBe('Ada')
    expect(p.avatarColor).toBe('#ff0')
    expect(p.pinHash).toBeNull()
    expect(p.isDefault).toBe(false)
  })

  it('createProfile hashes the PIN when provided', async () => {
    const { createProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Bob', avatarColor: '#0ff', pin: '1234' })
    expect(p.pinHash).not.toBeNull()
    expect(p.pinHash).not.toBe('1234')
  })

  it('listProfiles orders default first, then by createdAt', async () => {
    const { createProfile, listProfiles, markDefault } = await import('@/lib/profiles/queries')
    const a = await createProfile({ name: 'A', avatarColor: '#1', pin: null })
    const b = await createProfile({ name: 'B', avatarColor: '#2', pin: null })
    await markDefault(b.id)
    const list = await listProfiles()
    expect(list[0].id).toBe(b.id) // default first
    expect(list[1].id).toBe(a.id)
  })

  it('deleteProfile removes the profile AND its rows from user-local tables', async () => {
    const { createProfile, deleteProfile } = await import('@/lib/profiles/queries')
    const { prisma } = await import('@/lib/db')
    const p = await createProfile({ name: 'X', avatarColor: '#1', pin: null })
    // Seed one row per user-local table for this profile + one for another profile
    const other = await createProfile({ name: 'Y', avatarColor: '#2', pin: null })
    const db = new Database(dbPath)
    db.prepare(`INSERT INTO user_notes (user_id, body) VALUES (?, 'x'), (?, 'y')`).run(p.id, other.id)
    db.prepare(`INSERT INTO journals (id, user_id, title) VALUES ('j1', ?, 't'), ('j2', ?, 'u')`).run(p.id, other.id)
    db.prepare(`INSERT INTO ai_conversations (user_id, title) VALUES (?, 'c'), (?, 'd')`).run(p.id, other.id)
    db.close()

    await deleteProfile(p.id)

    // Profile gone, other profile's rows survive
    const db2 = new Database(dbPath, { readonly: true })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_profiles WHERE id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_notes WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM user_notes WHERE user_id=?`).get(other.id)).toEqual({ n: 1 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM journals WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    expect(db2.prepare(`SELECT COUNT(*) n FROM ai_conversations WHERE user_id=?`).get(p.id)).toEqual({ n: 0 })
    db2.close()
  })

  it('deleteProfile refuses to delete the last remaining profile', async () => {
    const { createProfile, deleteProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'Only', avatarColor: '#1', pin: null })
    await expect(deleteProfile(p.id)).rejects.toThrow(/last/i)
  })

  it('updateProfile changes name, color, and PIN independently', async () => {
    const { createProfile, updateProfile } = await import('@/lib/profiles/queries')
    const p = await createProfile({ name: 'X', avatarColor: '#1', pin: null })
    await updateProfile(p.id, { name: 'Renamed' })
    await updateProfile(p.id, { avatarColor: '#fff' })
    await updateProfile(p.id, { pin: '5678' })
    await updateProfile(p.id, { pin: null }) // remove PIN

    const { listProfiles } = await import('@/lib/profiles/queries')
    const list = await listProfiles()
    const updated = list.find((x) => x.id === p.id)!
    expect(updated.name).toBe('Renamed')
    expect(updated.avatarColor).toBe('#fff')
    expect(updated.pinHash).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run tests/lib/profiles/queries.test.ts`
Expected: FAIL — `@/lib/profiles/queries` not found.

- [ ] **Step 3: Implement the queries module**

Create `src/lib/profiles/queries.ts`:

```ts
// src/lib/profiles/queries.ts
//
// Profile CRUD + cascade-delete helper. The cascade is done in
// application code (not via DB FK ON DELETE CASCADE) because adding
// FK constraints to existing user-local tables would require a full
// SQLite table rebuild per table. Doing it here keeps the migration
// simple and the cascade testable.

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/db'
import { hashPin } from './pin'

export const USER_LOCAL_TABLES_FOR_CASCADE = [
  'ai_conversations',
  'ai_messages',
  'devotional_history',
  'user_notes',
  'user_note_anchors',
  'user_note_themes',
  'user_note_tags',
  'user_tags',
  'user_bookmarks',
  'user_collections',
  'user_collection_items',
  'journals',
  'reading_history',
  'study_projects',
  'study_assembly_items',
  'user_settings',
] as const

export interface ProfileRecord {
  id: string
  name: string
  avatarColor: string
  pinHash: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

function toRecord(row: {
  id: string; name: string; avatarColor: string;
  pinHash: string | null; isDefault: boolean;
  createdAt: string; updatedAt: string
}): ProfileRecord {
  return { ...row }
}

export async function listProfiles(): Promise<ProfileRecord[]> {
  const rows = await prisma.userProfile.findMany({
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
  })
  return rows.map(toRecord)
}

export async function getProfile(id: string): Promise<ProfileRecord | null> {
  const row = await prisma.userProfile.findUnique({ where: { id } })
  return row ? toRecord(row) : null
}

export async function createProfile(input: {
  name: string
  avatarColor: string
  pin: string | null
}): Promise<ProfileRecord> {
  const now = new Date().toISOString()
  const pinHash = input.pin ? await hashPin(input.pin) : null
  const row = await prisma.userProfile.create({
    data: {
      id: randomUUID(),
      name: input.name.trim().slice(0, 30),
      avatarColor: input.avatarColor,
      pinHash,
      isDefault: false,
      createdAt: now,
      updatedAt: now,
    },
  })
  return toRecord(row)
}

export async function updateProfile(id: string, input: {
  name?: string
  avatarColor?: string
  pin?: string | null // string = new PIN, null = remove PIN, undefined = untouched
}): Promise<ProfileRecord> {
  const now = new Date().toISOString()
  const data: {
    name?: string; avatarColor?: string; pinHash?: string | null; updatedAt: string
  } = { updatedAt: now }
  if (input.name !== undefined) data.name = input.name.trim().slice(0, 30)
  if (input.avatarColor !== undefined) data.avatarColor = input.avatarColor
  if (input.pin !== undefined) data.pinHash = input.pin === null ? null : await hashPin(input.pin)
  const row = await prisma.userProfile.update({ where: { id }, data })
  return toRecord(row)
}

export async function markDefault(id: string): Promise<void> {
  const now = new Date().toISOString()
  await prisma.$transaction([
    prisma.userProfile.updateMany({ where: { isDefault: true }, data: { isDefault: false, updatedAt: now } }),
    prisma.userProfile.update({ where: { id }, data: { isDefault: true, updatedAt: now } }),
  ])
}

export async function deleteProfile(id: string): Promise<void> {
  const count = await prisma.userProfile.count()
  if (count <= 1) throw new Error('Cannot delete the last profile')

  // Cascade: wipe rows from every user-local table, then delete the profile.
  // Done via $executeRawUnsafe because the table list is iterated; the table
  // names are compile-time constants from USER_LOCAL_TABLES_FOR_CASCADE so
  // there's no SQL injection surface.
  await prisma.$transaction(async (tx) => {
    for (const table of USER_LOCAL_TABLES_FOR_CASCADE) {
      await tx.$executeRawUnsafe(`DELETE FROM ${table} WHERE user_id = ?`, id)
    }
    await tx.userProfile.delete({ where: { id } })
  })
}

export async function countCascade(id: string): Promise<Record<string, number>> {
  // Returns per-table row counts so the deletion confirmation UI can
  // show concrete numbers before the user confirms.
  const counts: Record<string, number> = {}
  for (const table of USER_LOCAL_TABLES_FOR_CASCADE) {
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) AS n FROM ${table} WHERE user_id = ?`,
      id,
    )) as Array<{ n: bigint | number }>
    counts[table] = Number(rows[0].n)
  }
  return counts
}
```

- [ ] **Step 4: Run queries tests**

Run: `npx vitest run tests/lib/profiles/queries.test.ts`
Expected: `Tests  6 passed (6)`.

- [ ] **Step 5: Implement GET/POST profiles route**

Create `src/app/api/profiles/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { listProfiles, createProfile } from '@/lib/profiles/queries'
import { isValidPinFormat } from '@/lib/profiles/pin'

const MAX_PROFILES = 10

export async function GET() {
  const profiles = await listProfiles()
  // Don't leak pinHash to clients — just whether a PIN is set.
  return NextResponse.json({
    profiles: profiles.map((p) => ({
      id: p.id,
      name: p.name,
      avatarColor: p.avatarColor,
      hasPin: p.pinHash !== null,
      isDefault: p.isDefault,
    })),
  })
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { name?: string; avatarColor?: string; pin?: string | null }
  if (!body.name || !body.name.trim()) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }
  if (!body.avatarColor) {
    return NextResponse.json({ error: 'avatarColor required' }, { status: 400 })
  }
  if (body.pin != null && !isValidPinFormat(body.pin)) {
    return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
  }

  const existing = await listProfiles()
  if (existing.length >= MAX_PROFILES) {
    return NextResponse.json({ error: `Max ${MAX_PROFILES} profiles reached` }, { status: 409 })
  }

  const p = await createProfile({
    name: body.name,
    avatarColor: body.avatarColor,
    pin: body.pin ?? null,
  })
  return NextResponse.json({
    profile: { id: p.id, name: p.name, avatarColor: p.avatarColor, hasPin: p.pinHash !== null, isDefault: p.isDefault },
  })
}
```

- [ ] **Step 6: Implement [id] route (GET/PATCH/DELETE)**

Create `src/app/api/profiles/[id]/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getProfile, updateProfile, deleteProfile, countCascade } from '@/lib/profiles/queries'
import { isValidPinFormat, verifyPin } from '@/lib/profiles/pin'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({
    profile: { id: p.id, name: p.name, avatarColor: p.avatarColor, hasPin: p.pinHash !== null, isDefault: p.isDefault },
  })
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = (await request.json()) as { name?: string; avatarColor?: string; pin?: string | null }
  if (body.pin != null && !isValidPinFormat(body.pin)) {
    return NextResponse.json({ error: 'PIN must be 4 digits' }, { status: 400 })
  }
  try {
    const updated = await updateProfile(id, body)
    return NextResponse.json({
      profile: { id: updated.id, name: updated.name, avatarColor: updated.avatarColor, hasPin: updated.pinHash !== null, isDefault: updated.isDefault },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'update failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = (await request.json().catch(() => ({}))) as { pin?: string; confirmName?: string }

  const target = await getProfile(id)
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 })

  // PIN-gated delete: if the target has a PIN, require it.
  if (target.pinHash) {
    if (!body.pin || !(await verifyPin(body.pin, target.pinHash))) {
      return NextResponse.json({ error: 'PIN required' }, { status: 401 })
    }
  } else {
    // Non-PIN delete: require exact name match.
    if (body.confirmName !== target.name) {
      return NextResponse.json({ error: 'confirmName must match profile name' }, { status: 400 })
    }
  }

  try {
    await deleteProfile(id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'delete failed'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

// Separate helper endpoint for the UI to show "will delete N notes, M threads..."
// Called by ManageProfiles before showing the confirmation dialog.
// Route: GET /api/profiles/[id]?counts=1
// (We piggyback on GET to avoid another route file; see Step 5's GET implementation
// for the base shape. Add the counts branch.)
```

Update the GET handler to surface cascade counts when `?counts=1` is set:

Replace the GET in `src/app/api/profiles/[id]/route.ts` with:

```ts
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })

  const includeCounts = request.nextUrl.searchParams.get('counts') === '1'
  const body: {
    profile: { id: string; name: string; avatarColor: string; hasPin: boolean; isDefault: boolean }
    counts?: Record<string, number>
  } = {
    profile: { id: p.id, name: p.name, avatarColor: p.avatarColor, hasPin: p.pinHash !== null, isDefault: p.isDefault },
  }
  if (includeCounts) {
    body.counts = await countCascade(id)
  }
  return NextResponse.json(body)
}
```

- [ ] **Step 7: Implement verify-pin route**

Create `src/app/api/profiles/[id]/verify-pin/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getProfile } from '@/lib/profiles/queries'
import { verifyPin } from '@/lib/profiles/pin'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { pin } = (await request.json().catch(() => ({}))) as { pin?: string }
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (!p.pinHash) return NextResponse.json({ ok: true }) // no PIN set → trivially passes
  if (!pin || !(await verifyPin(pin, p.pinHash))) {
    return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 8: Implement select route**

Create `src/app/api/profiles/select/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { getProfile } from '@/lib/profiles/queries'
import { verifyPin } from '@/lib/profiles/pin'
import { setActiveProfileCookie } from '@/lib/profiles/active-profile'

export async function POST(request: NextRequest) {
  const { id, pin } = (await request.json().catch(() => ({}))) as { id?: string; pin?: string }
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })
  const p = await getProfile(id)
  if (!p) return NextResponse.json({ error: 'not found' }, { status: 404 })
  if (p.pinHash) {
    if (!pin || !(await verifyPin(pin, p.pinHash))) {
      return NextResponse.json({ error: 'invalid PIN' }, { status: 401 })
    }
  }
  await setActiveProfileCookie(id)
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 9: Verify compilation + tests**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors.

Run: `npm test`
Expected: at least 6 new profile-queries tests added; total count grows accordingly.

- [ ] **Step 10: Commit**

```bash
git add src/lib/profiles/queries.ts tests/lib/profiles/queries.test.ts src/app/api/profiles
git commit -m "feat(profiles): CRUD routes + cascade delete helper

Profile create/list/update/delete backed by a queries module. DELETE
requires PIN (for PIN'd profiles) or exact-name confirmation (for
non-PIN profiles). Cascade is done in application code across every
user-local table — no FK ON DELETE CASCADE needed. countCascade
surfaces per-table counts so the UI can show concrete numbers before
confirmation."
```

---

## Task 5: Settings split — user_settings vs app_settings

**Files:**
- Create: `src/lib/settings/user-settings.ts`
- Create: `tests/lib/settings/user-settings.test.ts`
- Modify: `src/lib/settings/queries.ts` (route the 5 frozen keys through user-settings)

- [ ] **Step 1: Write failing tests for user-settings accessors**

Create `tests/lib/settings/user-settings.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('user-settings', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-usersettings-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE user_settings (
        user_id TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (user_id, key)
      );
    `)
    db.close()
    process.env.DATABASE_URL = `file:${dbPath}`
    const g = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
    g.prisma = undefined
    g.prismaVersion = undefined
    vi.resetModules()
  })

  afterEach(async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.$disconnect()
    rmSync(dir, { recursive: true, force: true })
  })

  it('getUserSetting returns null when missing', async () => {
    const { getUserSetting } = await import('@/lib/settings/user-settings')
    expect(await getUserSetting('u1', 'theme')).toBeNull()
  })

  it('setUserSetting + getUserSetting round-trip', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    expect(await getUserSetting('u1', 'theme')).toBe('dark')
  })

  it('setUserSetting upserts', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    await setUserSetting('u1', 'theme', 'light')
    expect(await getUserSetting('u1', 'theme')).toBe('light')
  })

  it('settings are isolated between users', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    await setUserSetting('u2', 'theme', 'light')
    expect(await getUserSetting('u1', 'theme')).toBe('dark')
    expect(await getUserSetting('u2', 'theme')).toBe('light')
  })
})
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npx vitest run tests/lib/settings/user-settings.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement**

Create `src/lib/settings/user-settings.ts`:

```ts
// src/lib/settings/user-settings.ts
//
// Per-profile key/value accessors. Companion to app_settings (device-level).
// See docs/superpowers/specs/2026-04-19-multi-user-profiles-design.md for
// which keys live here vs in app_settings.

import { prisma } from '@/lib/db'

export async function getUserSetting(userId: string, key: string): Promise<string | null> {
  const row = await prisma.userSetting.findUnique({
    where: { userId_key: { userId, key } },
  })
  return row ? row.value : null
}

export async function setUserSetting(userId: string, key: string, value: string): Promise<void> {
  const now = new Date().toISOString()
  await prisma.userSetting.upsert({
    where: { userId_key: { userId, key } },
    create: { userId, key, value, updatedAt: now },
    update: { value, updatedAt: now },
  })
}

// Which keys belong under user_settings vs app_settings. The list here
// must match the FROZEN KEY LIST in scripts/etl/add-user-profiles-schema.ts.
export const USER_SETTING_KEYS = [
  'primary_translation',
  'parallel_translations',
  'commentary_display',
  'daily_bread_audience',
  'theme',
] as const

export type UserSettingKey = (typeof USER_SETTING_KEYS)[number]

export function isUserSettingKey(key: string): key is UserSettingKey {
  return (USER_SETTING_KEYS as readonly string[]).includes(key)
}
```

- [ ] **Step 4: Update `src/lib/settings/queries.ts`**

Open `src/lib/settings/queries.ts`. For each of the five accessors that touch the keys `primary_translation`, `parallel_translations`, `commentary_display`, `daily_bread_audience`, `theme`, change the read/write to go through `getUserSetting` / `setUserSetting` instead of `getSetting` / `setSetting`.

The specific functions that currently read these keys (grep-derived — verify against your current file):
- `getTranslationState()` — reads `primary_translation` + `parallel_translations`
- `getReaderSettings()` / the function around `commentary_display`
- `getDailyBreadSettings()` — reads `daily_bread_audience`
- `getGeneralSettings()` or equivalent — reads `theme`
- Any setter that writes those keys

For each, change the signature to accept `userId: string` as a required parameter, then route reads/writes to `getUserSetting(userId, key)` / `setUserSetting(userId, key, value)`.

Example before:

```ts
export async function getGeneralSettings() {
  return {
    theme: ((await getSetting('theme')) || 'dark') as ThemeMode,
  }
}
```

After:

```ts
import { getUserSetting, setUserSetting } from './user-settings'

export async function getGeneralSettings(userId: string) {
  return {
    theme: ((await getUserSetting(userId, 'theme')) || 'dark') as ThemeMode,
  }
}
```

Also add an export for the setter:

```ts
export async function setGeneralSettings(userId: string, { theme }: { theme?: ThemeMode }) {
  if (theme) await setUserSetting(userId, 'theme', theme)
}
```

Apply analogous changes for `primary_translation`, `parallel_translations`, `commentary_display`, `daily_bread_audience`.

- [ ] **Step 5: Update callers of the changed settings functions**

Grep for callers:

```bash
grep -rn "getTranslationState\|getReaderSettings\|getDailyBreadSettings\|getGeneralSettings" src --include="*.ts" --include="*.tsx"
```

For each call site, inject `userId` from `requireActiveProfileId()`. Server components do:

```ts
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export default async function Page() {
  const userId = await requireActiveProfileId()
  const settings = await getGeneralSettings(userId)
  ...
}
```

API routes do the same at the top of the handler.

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: all prior tests still pass. The new user-settings tests pass (4 tests).

- [ ] **Step 7: Commit**

```bash
git add src/lib/settings src/app tests/lib/settings/user-settings.test.ts
git commit -m "refactor(settings): route 5 per-profile keys through user_settings

primary_translation, parallel_translations, commentary_display,
daily_bread_audience, theme now live in user_settings (keyed by
userId). app_settings keeps AI config, backup infrastructure, and
device-lifecycle state. Callers pass userId from
requireActiveProfileId. No read-time fallback between the two
tables — user_settings is authoritative for its keys."
```

---

## Task 6: Scope companion thread-store + routes

**Files:**
- Modify: `src/lib/ai/companion/thread-store.ts`
- Modify: `src/app/api/ai/companion/stream/route.ts`
- Modify: `src/app/api/ai/companion/thread/route.ts`
- Modify: `tests/lib/ai/companion/thread-store.test.ts`

- [ ] **Step 1: Update thread-store signatures**

Every function gains `userId: string` as a required parameter:

```ts
export async function createThread(input: {
  devotionalId: string
  title: string
  userId: string   // NEW
}): Promise<CompanionThreadSummary> {
  const now = new Date().toISOString()
  const row = await prisma.aiConversation.create({
    data: {
      title: input.title,
      contextRef: toContextRef(input.devotionalId),
      userId: input.userId,   // NEW
      createdAt: now,
      updatedAt: now,
    },
  })
  return { id: row.id, title: row.title ?? '', createdAt: row.createdAt, updatedAt: row.updatedAt, messageCount: 0 }
}

export async function findActiveThread(devotionalId: string, userId: string): Promise<CompanionThreadSummary | null> {
  const row = await prisma.aiConversation.findFirst({
    where: { contextRef: toContextRef(devotionalId), userId },   // NEW filter
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  })
  if (!row) return null
  return {
    id: row.id,
    title: row.title ?? '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    messageCount: row._count.messages,
  }
}

export async function listThreads(devotionalId: string, userId: string): Promise<CompanionThreadSummary[]> {
  const rows = await prisma.aiConversation.findMany({
    where: { contextRef: toContextRef(devotionalId), userId },   // NEW filter
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { messages: true } } },
  })
  return rows.map((row) => ({
    id: row.id,
    title: row.title ?? '',
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    messageCount: row._count.messages,
  }))
}

export async function getThreadMessages(conversationId: number, userId: string): Promise<CompanionMessage[]> {
  const rows = await prisma.aiMessage.findMany({
    where: { conversationId, userId },   // NEW filter
    orderBy: { createdAt: 'asc' },
  })
  return rows.map((r) => ({
    id: r.id,
    role: narrowRole(r.role, r.id),
    content: r.content,
    createdAt: r.createdAt,
  }))
}

export async function appendMessage(conversationId: number, input: {
  role: 'user' | 'assistant'
  content: string
  providerId?: string | null
  modelId?: string | null
  userId: string   // NEW
}): Promise<CompanionMessage> {
  const now = new Date().toISOString()
  const [message] = await prisma.$transaction([
    prisma.aiMessage.create({
      data: {
        conversationId,
        role: input.role,
        content: input.content,
        providerId: input.providerId ?? null,
        modelId: input.modelId ?? null,
        userId: input.userId,   // NEW
        createdAt: now,
      },
    }),
    prisma.aiConversation.update({ where: { id: conversationId }, data: { updatedAt: now } }),
  ])
  return {
    id: message.id,
    role: narrowRole(message.role, message.id),
    content: message.content,
    createdAt: message.createdAt,
  }
}
```

- [ ] **Step 2: Update thread-store tests**

In `tests/lib/ai/companion/thread-store.test.ts`:
- Add `user_id TEXT` to the `ai_conversations` and `ai_messages` table DDL in `beforeEach`.
- Update every test's `createThread` call to pass `userId: 'u1'`.
- Update every `appendMessage` call to pass `userId: 'u1'`.
- Update every `findActiveThread`, `listThreads`, `getThreadMessages` call to pass `userId: 'u1'` as the second arg.
- Add a new test verifying isolation: create threads for `u1` and `u2` on the same devotional, list threads for `u1` — expect only `u1`'s threads.

```ts
it('findActiveThread isolates users — u1 does not see u2 threads', async () => {
  await createThread({ devotionalId: 'rom-8-28', title: 'a', userId: 'u1' })
  await createThread({ devotionalId: 'rom-8-28', title: 'b', userId: 'u2' })
  const a = await findActiveThread('rom-8-28', 'u1')
  const b = await findActiveThread('rom-8-28', 'u2')
  expect(a?.title).toBe('a')
  expect(b?.title).toBe('b')
})
```

- [ ] **Step 3: Update the stream route**

In `src/app/api/ai/companion/stream/route.ts`, add at the top of the POST handler:

```ts
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return jsonError('no active profile', 401)
  }

  const body = (await request.json()) as Body
  // ... rest unchanged ...
```

Pass `userId` into every thread-store call:

```ts
const t = await createThread({ devotionalId: body.devotionalId, title: devotional.title, userId })
// ...
const active = await findActiveThread(body.devotionalId, userId)
// ...
await appendMessage(conversationId, { role: 'user', content: body.userMessage, userId })
// ...
const history = await getThreadMessages(conversationId, userId)
// ...
await appendMessage(conversationId, {
  role: 'assistant',
  content: assistantText,
  providerId: aiConfig.providerId,
  modelId: aiConfig.modelId,
  userId,
})
```

- [ ] **Step 4: Update the thread GET route**

In `src/app/api/ai/companion/thread/route.ts`:

```ts
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(request: NextRequest) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const devotionalId = request.nextUrl.searchParams.get('devotionalId')
  if (!devotionalId) {
    return NextResponse.json({ error: 'devotionalId required' }, { status: 400 })
  }

  const threads = await listThreads(devotionalId, userId)   // pass userId
  if (threads.length === 0) {
    return NextResponse.json({ active: null, past: [] })
  }

  const [activeSummary, ...pastSummaries] = threads
  const activeMessages = await getThreadMessages(activeSummary.id, userId)   // pass userId
  const active: CompanionThreadDetail = { ...activeSummary, messages: activeMessages }
  const past: CompanionThreadSummary[] = pastSummaries
  return NextResponse.json({ active, past })
}
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: 1 new thread-store test passes (7 total for thread-store), all others still pass.

- [ ] **Step 6: Compile check**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/lib/ai/companion/thread-store.ts tests/lib/ai/companion/thread-store.test.ts src/app/api/ai/companion
git commit -m "feat(companion): scope thread-store by userId

All five thread-store functions now require userId. Routes derive it
from requireActiveProfileId() and pass it through. Fresh user-isolation
test added. Companion threads are now private per profile."
```

---

## Task 7: Scope daily-bread, reading-history, devotional-history queries

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`
- Modify: `src/lib/reader/history.ts`
- Modify: server components + API routes that call them

- [ ] **Step 1: Identify functions to scope**

Grep for user-local table access in these files:

```bash
grep -nE "prisma\.(devotionalHistory|readingHistory)\." src/lib/daily-bread/queries.ts src/lib/reader/history.ts
```

Typical functions:
- `getDevotionalHistory(limit)` → `getDevotionalHistory(userId, limit)`
- `completeDevotional(devotionalId, rating, familyNotes)` → `completeDevotional(userId, devotionalId, rating, familyNotes)`
- `recordReadingHistory(...)` → `recordReadingHistory(userId, ...)` and `getRecentReadingHistory()` → `getRecentReadingHistory(userId, ...)`

- [ ] **Step 2: Add `userId` parameter to each identified function**

For each function, add `userId: string` as the first parameter and include it in Prisma `where` clauses (for reads) and `data` objects (for writes).

Example — `getDevotionalHistory`:

```ts
export async function getDevotionalHistory(userId: string, limit = 20): Promise<DevotionalHistory[]> {
  const entries = await prisma.devotionalHistory.findMany({
    where: { userId },   // NEW
    orderBy: { completedAt: 'desc' },
    take: limit,
    include: { devotional: { select: { title: true, audience: true } } },
  })
  return entries.map((e) => ({ /* existing shape */ }))
}
```

Example — `completeDevotional`:

```ts
export async function completeDevotional(
  userId: string,       // NEW
  devotionalId: string,
  rating: number,
  familyNotes: string,
): Promise<void> {
  await prisma.devotionalHistory.create({
    data: {
      devotionalId,
      userId,                        // NEW
      completedAt: new Date().toISOString(),
      rating,
      familyNotes: familyNotes || null,
    },
  })
}
```

Apply the same pattern to every user-local read/write in `src/lib/reader/history.ts`.

- [ ] **Step 3: Update callers**

Grep for each modified function in the rest of the codebase:

```bash
grep -rn "getDevotionalHistory\|completeDevotional\|recordReadingHistory\|getRecentReadingHistory" src --include="*.ts" --include="*.tsx"
```

At every call site, inject `userId` from `requireActiveProfileId()` for server components, `requireActiveProfileId()` at the top of API route handlers (return 401 on rejection).

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: all existing tests continue to pass. Any daily-bread tests that construct `devotional_history` fixtures must now also set `user_id` on those rows — update the fixture setup where necessary.

- [ ] **Step 5: Compile check**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/lib/daily-bread src/lib/reader src/app tests/lib/daily-bread
git commit -m "feat(daily-bread): scope history queries by userId"
```

---

## Task 8: Scope journal, notes, tags queries

**Files:**
- Modify: `src/lib/journal/queries.ts`
- Modify: server components + routes that call journal queries

- [ ] **Step 1: Identify + scope every user-local function in journal/queries.ts**

Grep:

```bash
grep -nE "prisma\.(journal|userNote|userNoteAnchor|userNoteTheme|userNoteTag|userTag)\." src/lib/journal/queries.ts
```

For every function that reads or writes these models, add `userId: string` as a required parameter. Every Prisma `findMany` / `findUnique` gets `userId` added to `where`. Every `create` gets `userId` added to `data`.

- [ ] **Step 2: Update callers**

Grep for journal function names in the codebase:

```bash
grep -rn "getJournals\|getJournal\|createJournal\|getUserNotes\|createUserNote\|deleteUserNote\|getUserTags" src --include="*.ts" --include="*.tsx"
```

For each caller, inject `userId` from `requireActiveProfileId()`.

- [ ] **Step 3: Update test fixtures**

If any test in `tests/lib/journal/` or adjacent builds fixture rows directly, ensure the SQL/INSERT statements include `user_id`. For rows that need to belong to the default test user, use a consistent fixture id (e.g., `'test-user'`).

- [ ] **Step 4: Run tests + compile check**

Run: `npm test` then `npx tsc --noEmit 2>&1 | head -20`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/journal src/app tests/lib/journal
git commit -m "feat(journal): scope journals + notes + tags by userId"
```

---

## Task 9: Scope study-builder + general AI conversations

**Files:**
- Modify: `src/lib/study-builder/queries.ts`
- Modify: `src/lib/study-builder/export.ts` (if it reads user-local rows)
- Modify: `src/app/api/ai/conversations/route.ts`
- Modify: `src/app/api/ai/conversations/[id]/route.ts`
- Modify: `src/app/api/ai/conversations/[id]/save/route.ts`
- Modify: `src/app/api/ai/conversations/[id]/export/route.ts`
- Create: `tests/api/ai/conversations/isolation.test.ts`

**Context:** `ai_conversations` is shared between two features — the devotional companion (Task 6, `contextRef` starts with `devotional-companion:`) and the general chat panel / study-builder (this task). Companion scoping is done in Task 6. Here we close two gaps that are independent of Task 6 but live in the same table:

1. **Feature leakage** — `GET /api/ai/conversations` currently has no `contextRef` filter at all, so companion threads show up in the general chat history sidebar. `userId` scoping alone doesn't fix that; we also need to exclude companion rows.
2. **Ownership bypass** — `[id]/route.ts`, `[id]/save/route.ts`, and `[id]/export/route.ts` all look up conversations by primary key with no ownership check. A user who guesses another profile's conversation id can currently read or delete it.

Use `isCompanionContextRef` / its prefix constant from `src/lib/ai/companion/context-ref.ts` for the exclusion. Prisma's `findUnique` only accepts unique/id fields, so `(id, userId)` lookups must use `findFirst`; `delete`/`update` by composite key use `deleteMany`/`updateMany` with a `count === 0` → 404 check.

- [ ] **Step 1: Scope study-builder queries**

Grep:

```bash
grep -nE "prisma\.(studyProject|studyAssemblyItem)\." src/lib/study-builder/queries.ts src/lib/study-builder/export.ts
```

Add `userId: string` as a required parameter on every exported read/write function in those two files. `where` clauses gain `userId`; `create`/`update` `data` gains `userId`. Mechanical — same pattern as Tasks 7 and 8.

- [ ] **Step 2: Patch `src/app/api/ai/conversations/route.ts` (list)**

Replace the entire handler:

```ts
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET() {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const conversations = await prisma.aiConversation.findMany({
    where: {
      userId,
      // Exclude companion threads — they have their own UI (CompanionChat).
      // NOT startsWith keeps contextRef=NULL rows in the result.
      NOT: { contextRef: { startsWith: 'devotional-companion:' } },
    },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      contextRef: true,
      updatedAt: true,
      _count: { select: { messages: true } },
    },
  })

  return NextResponse.json(
    conversations.map((c) => ({
      id: String(c.id),
      groundingLabel: c.title || c.contextRef || 'Untitled',
      messageCount: c._count.messages,
      date: c.updatedAt,
    }))
  )
}
```

The `'devotional-companion:'` prefix is the literal value of the `PREFIX` constant in `src/lib/ai/companion/context-ref.ts`. Inline here rather than importing to keep the companion module out of this route's dependency graph.

- [ ] **Step 3: Patch `src/app/api/ai/conversations/[id]/route.ts` (get + delete)**

Replace the entire file:

```ts
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const conversationId = parseInt(id, 10)
  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  // findFirst (not findUnique) because we're filtering by a composite
  // (id, userId), not a unique key. This is the ownership check.
  const conversation = await prisma.aiConversation.findFirst({
    where: { id: conversationId, userId },
    include: { messages: { orderBy: { createdAt: 'asc' } } },
  })

  if (!conversation) {
    // Same response whether the row doesn't exist or belongs to another profile —
    // do not leak existence across profiles.
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: String(conversation.id),
    title: conversation.title,
    contextRef: conversation.contextRef,
    messages: conversation.messages.map((m) => ({
      id: String(m.id),
      role: m.role,
      content: m.content,
      timestamp: m.createdAt,
    })),
  })
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const conversationId = parseInt(id, 10)
  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  // deleteMany lets us filter by (id, userId). count === 0 means either
  // the id doesn't exist or it belongs to another profile — 404 either way.
  const { count } = await prisma.aiConversation.deleteMany({
    where: { id: conversationId, userId },
  })
  if (count === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 4: Patch `src/app/api/ai/conversations/[id]/save/route.ts`**

Replace the entire handler:

```ts
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { title, contextRef, messages } = body as {
    title?: string
    contextRef?: string
    messages: Array<{ role: string; content: string; timestamp: string }>
  }

  const now = new Date().toISOString()

  if (id === 'new') {
    const conversation = await prisma.aiConversation.create({
      data: {
        title: title || 'Saved conversation',
        contextRef: contextRef || null,
        userId,
        createdAt: now,
        updatedAt: now,
        messages: {
          create: messages.map((m) => ({
            role: m.role,
            content: m.content,
            userId,
            createdAt: m.timestamp || now,
          })),
        },
      },
    })
    return NextResponse.json({ id: String(conversation.id) }, { status: 201 })
  }

  const convId = parseInt(id, 10)
  if (isNaN(convId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  // Ownership-scoped update. If the row belongs to another profile or
  // doesn't exist, count === 0 → 404 without revealing which.
  const { count } = await prisma.aiConversation.updateMany({
    where: { id: convId, userId },
    data: { updatedAt: now },
  })
  if (count === 0) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  for (const m of messages) {
    await prisma.aiMessage.create({
      data: {
        conversationId: convId,
        role: m.role,
        content: m.content,
        userId,
        createdAt: m.timestamp || now,
      },
    })
  }

  return NextResponse.json({ id }, { status: 200 })
}
```

- [ ] **Step 5: Patch `src/app/api/ai/conversations/[id]/export/route.ts`**

Both `findUnique` sites (the markdown branch at line ~21 and the docx `exists` check at line ~37) need to become ownership-scoped `findFirst` calls. `generateConversationDocx(conversationId)` will run its own queries downstream, but the `exists` gate in front of it is what blocks cross-profile exports.

Replace the handler:

```ts
import { NextRequest, NextResponse } from 'next/server'
import { generateConversationDocx } from '@/lib/export/targets/ai-conversation'
import { renderConversationToMarkdown } from '@/lib/export/markdown/renderers'
import { prisma } from '@/lib/db'
import { requireActiveProfileId } from '@/lib/profiles/active-profile'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  let userId: string
  try {
    userId = await requireActiveProfileId()
  } catch {
    return NextResponse.json({ error: 'no active profile' }, { status: 401 })
  }

  const { id } = await params
  const conversationId = parseInt(id, 10)
  if (isNaN(conversationId)) {
    return NextResponse.json({ error: 'Invalid conversation id' }, { status: 400 })
  }

  const format = request.nextUrl.searchParams.get('format') ?? 'docx'
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)

  try {
    if (format === 'markdown' || format === 'md') {
      const conv = await prisma.aiConversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: 'asc' } } },
      })
      if (!conv) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 })
      }
      const md = renderConversationToMarkdown(conv)
      return new NextResponse(md, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="selah-conversation-${timestamp}.md"`,
        },
      })
    }

    const exists = await prisma.aiConversation.findFirst({
      where: { id: conversationId, userId },
      select: { id: true },
    })
    if (!exists) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    const buffer = await generateConversationDocx(conversationId)
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="selah-conversation-${timestamp}.docx"`,
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Export failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
```

- [ ] **Step 6: Update callers + fixtures**

The study-builder query signatures changed in Step 1. Grep the codebase:

```bash
grep -rnE "from ['\"](.*)/study-builder/(queries|export)['\"]" src --include="*.ts" --include="*.tsx"
```

For each caller, inject `userId` sourced from `requireActiveProfileId()` (server components / API routes) or from a `userId` prop / context value (client components that bubble it down — but study-builder runs server-side, so this should be rare).

- [ ] **Step 7: Add isolation regression test**

Create `tests/api/ai/conversations/isolation.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { existsSync } from 'fs'
import path from 'path'
import Database from 'better-sqlite3'

const SOURCE_DB = path.resolve(process.cwd(), 'data/selah.db')

describe.skipIf(!existsSync(SOURCE_DB))('ai_conversations cross-profile isolation', () => {
  // Setup: in-memory DB seeded with schema matching Task 1 migration,
  // two profiles (u1, u2), one general conversation per profile, one
  // companion conversation for u1.
  //
  // Verify via direct SQL:
  //   1. Listing (userId=u1, contextRef NOT LIKE 'devotional-companion:%')
  //      returns ONLY u1's general conversation — not u2's, not the companion one.
  //   2. findFirst({id: u2_conv_id, userId: u1}) returns null.
  //   3. deleteMany({id: u2_conv_id, userId: u1}) returns count=0;
  //      row still exists when queried with u2's userId.

  it('list excludes other profiles and companion threads', () => {
    // Implementation mirrors the route's where clause directly against
    // an in-memory better-sqlite3 DB. Keeps the test independent of
    // Next.js route machinery.
  })

  it('findFirst by id scoped to wrong userId returns null', () => {
    // ...
  })

  it('deleteMany by id scoped to wrong userId is a no-op', () => {
    // ...
  })
})
```

Fill in the test bodies following the pattern used by `tests/lib/ai/companion/thread-store.test.ts` (in-memory better-sqlite3, raw SQL, seeded per-test). The goal is a committed regression test that would fail today without the patches in Steps 2–5.

- [ ] **Step 8: Run tests + compile check**

Run: `npm test && npx tsc --noEmit 2>&1 | head -20`
Expected: new isolation tests pass, all existing tests still pass, no type errors.

- [ ] **Step 9: Commit**

```bash
git add src/lib/study-builder src/app/api/ai/conversations tests
git commit -m "feat(ai): scope study-builder + general AI conversations by userId

Closes two pre-existing gaps in ai_conversations routes:
- General-conversations list now excludes companion threads AND filters
  by active profile. Previously listed ALL rows across profiles.
- [id] GET/DELETE/save/export routes verify ownership via findFirst/
  deleteMany scoped to (id, userId). Previously used findUnique by PK,
  allowing cross-profile reads/deletes with a guessed id.

Isolation regression test added covering list, get-by-id, and delete."
```

---

## Task 10: Scope home, bookmarks, collections

**Files:**
- Modify: `src/lib/home/queries.ts`
- Modify: any other files touching `user_bookmarks`, `user_collections`, `user_collection_items`

- [ ] **Step 1: Grep for remaining user-local read/write sites**

Run:

```bash
grep -rnE "prisma\.(userBookmark|userCollection|userCollectionItem)\." src --include="*.ts"
grep -nE "prisma\." src/lib/home/queries.ts
```

- [ ] **Step 2: Scope every identified function**

Add `userId: string` to each function's signature and every Prisma `where`/`data`.

- [ ] **Step 3: Update callers + fixtures**

As in prior tasks.

- [ ] **Step 4: Run tests + compile check**

Run: `npm test` then `npx tsc --noEmit 2>&1 | head -20`
Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add src tests
git commit -m "feat(profiles): scope home + bookmarks + collections by userId"
```

---

## Task 11: ProfileAvatar + PinPad primitives

**Files:**
- Create: `src/components/profiles/ProfileAvatar.tsx`
- Create: `src/components/profiles/PinPad.tsx`

- [ ] **Step 1: Implement ProfileAvatar**

Create `src/components/profiles/ProfileAvatar.tsx`:

```tsx
'use client'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface ProfileAvatarProps {
  name: string
  color: string
  size?: number
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function ProfileAvatar({ name, color, size = 56 }: ProfileAvatarProps) {
  const initials = initialsOf(name)
  return (
    <div
      aria-hidden
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: color,
        color: 'var(--selah-bg-page, #0F0D0B)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: font.body,
        fontWeight: 600,
        fontSize: `${Math.round(size * 0.4)}px`,
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  )
}
```

- [ ] **Step 2: Implement PinPad**

Create `src/components/profiles/PinPad.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface PinPadProps {
  onSubmit: (pin: string) => void
  onCancel?: () => void
  error?: boolean  // trigger shake
  disabled?: boolean
}

export function PinPad({ onSubmit, onCancel, error, disabled }: PinPadProps) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (error) {
      setShake(true)
      setPin('')
      const t = setTimeout(() => setShake(false), 400)
      return () => clearTimeout(t)
    }
  }, [error])

  useEffect(() => {
    if (pin.length === 4 && !disabled) {
      onSubmit(pin)
    }
  }, [pin, onSubmit, disabled])

  const press = (d: string) => {
    if (disabled || pin.length >= 4) return
    setPin((p) => p + d)
  }

  const backspace = () => {
    if (disabled) return
    setPin((p) => p.slice(0, -1))
  }

  const digits = ['1','2','3','4','5','6','7','8','9']

  return (
    <div
      style={{
        animation: shake ? 'selahPinShake 0.4s' : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '18px' }}>
        {[0,1,2,3].map((i) => (
          <div
            key={i}
            style={{
              width: '14px', height: '14px', borderRadius: '50%',
              backgroundColor: i < pin.length ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)',
              transition: 'background 120ms',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 72px)', gap: '10px', justifyContent: 'center' }}>
        {digits.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => press(d)}
            disabled={disabled}
            style={{
              width: '72px', height: '72px', borderRadius: '50%',
              backgroundColor: 'var(--selah-bg-elevated, #292524)',
              color: 'var(--selah-text-1, #E8E2D9)',
              border: '1px solid var(--selah-border-color, #3D3835)',
              fontFamily: font.body, fontSize: '22px', fontWeight: 500,
              cursor: disabled ? 'default' : 'pointer',
            }}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          onClick={onCancel}
          disabled={disabled || !onCancel}
          aria-label="Cancel"
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3, #6E695F)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px',
            cursor: !onCancel || disabled ? 'default' : 'pointer',
            opacity: onCancel ? 1 : 0.3,
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => press('0')}
          disabled={disabled}
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'var(--selah-bg-elevated, #292524)',
            color: 'var(--selah-text-1, #E8E2D9)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '22px', fontWeight: 500,
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          0
        </button>
        <button
          type="button"
          onClick={backspace}
          disabled={disabled}
          aria-label="Backspace"
          style={{
            width: '72px', height: '72px', borderRadius: '50%',
            backgroundColor: 'transparent',
            color: 'var(--selah-text-3, #6E695F)',
            border: '1px solid var(--selah-border-color, #3D3835)',
            fontFamily: font.body, fontSize: '18px',
            cursor: disabled ? 'default' : 'pointer',
          }}
        >
          ⌫
        </button>
      </div>
      <style>{`@keyframes selahPinShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }`}</style>
    </div>
  )
}
```

- [ ] **Step 3: Compile + commit**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: no errors.

```bash
git add src/components/profiles
git commit -m "feat(profiles): ProfileAvatar + PinPad primitives"
```

---

## Task 12: /profiles picker page + ProfilePicker component

**Files:**
- Create: `src/app/(public)/profiles/page.tsx`
- Create: `src/app/(public)/profiles/ProfilesClient.tsx`
- Create: `src/components/profiles/ProfilePicker.tsx`

Note: the `(public)` route group sits outside the shell layout so the picker doesn't render the nav/header (which expects an active profile).

- [ ] **Step 1: Implement the server page**

Create `src/app/(public)/profiles/page.tsx`:

```tsx
import { listProfiles } from '@/lib/profiles/queries'
import { setActiveProfileCookie } from '@/lib/profiles/active-profile'
import { redirect } from 'next/navigation'
import { ProfilesClient } from './ProfilesClient'

export const dynamic = 'force-dynamic'

export default async function ProfilesPage() {
  const profiles = await listProfiles()

  // Single profile with no PIN → auto-select and bounce to home.
  if (profiles.length === 1 && !profiles[0].pinHash) {
    await setActiveProfileCookie(profiles[0].id)
    redirect('/')
  }

  return (
    <ProfilesClient
      profiles={profiles.map((p) => ({
        id: p.id,
        name: p.name,
        avatarColor: p.avatarColor,
        hasPin: p.pinHash !== null,
        isDefault: p.isDefault,
      }))}
    />
  )
}
```

- [ ] **Step 2: Implement the client**

Create `src/app/(public)/profiles/ProfilesClient.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProfilePicker } from '@/components/profiles/ProfilePicker'
import { PinPad } from '@/components/profiles/PinPad'

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface Props {
  profiles: ProfileSummary[]
}

export function ProfilesClient({ profiles }: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<ProfileSummary | null>(null)
  const [pinError, setPinError] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const selectProfile = async (id: string, pin?: string) => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/profiles/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pin }),
      })
      if (res.status === 401) {
        setPinError(true)
        return
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      router.push('/')
    } finally {
      setSubmitting(false)
    }
  }

  const onTap = (p: ProfileSummary) => {
    setPinError(false)
    if (p.hasPin) {
      setSelected(p)
    } else {
      selectProfile(p.id)
    }
  }

  if (selected) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
        <h1 style={{ marginBottom: '24px', fontFamily: "var(--selah-font-display)", fontSize: '28px', color: 'var(--selah-text-1)' }}>
          {selected.name}
        </h1>
        <p style={{ marginBottom: '28px', color: 'var(--selah-text-3)' }}>Enter PIN</p>
        <PinPad
          onSubmit={(pin) => selectProfile(selected.id, pin)}
          onCancel={() => { setSelected(null); setPinError(false) }}
          error={pinError}
          disabled={submitting}
        />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
      <h1 style={{ marginBottom: '40px', fontFamily: "var(--selah-font-display)", fontSize: '32px', color: 'var(--selah-text-1)' }}>
        Who's reading?
      </h1>
      <ProfilePicker profiles={profiles} onTap={onTap} />
    </div>
  )
}
```

- [ ] **Step 3: Implement ProfilePicker**

Create `src/components/profiles/ProfilePicker.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { ProfileAvatar } from './ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
}

interface ProfilePickerProps {
  profiles: ProfileSummary[]
  onTap: (p: ProfileSummary) => void
}

export function ProfilePicker({ profiles, onTap }: ProfilePickerProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 140px))', gap: '24px', justifyContent: 'center' }}>
      {profiles.map((p) => (
        <button
          key={p.id}
          onClick={() => onTap(p)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
        >
          <ProfileAvatar name={p.name} color={p.avatarColor} size={88} />
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-1)' }}>{p.name}</div>
          {p.hasPin && <div style={{ fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>PIN</div>}
        </button>
      ))}
      {profiles.length < 10 && (
        <Link
          href="/profiles/new"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '8px', textDecoration: 'none' }}
        >
          <div style={{ width: '88px', height: '88px', borderRadius: '50%', border: '2px dashed var(--selah-border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Plus size={32} color="var(--selah-text-3)" />
          </div>
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Add profile</div>
        </Link>
      )}
    </div>
  )
}
```

- [ ] **Step 4: Smoke test locally**

Run: `npm run dev`. Visit `http://localhost:4610`. Middleware should redirect to `/profiles`. Tap the default profile — redirects to `/`.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(public\)/profiles src/components/profiles/ProfilePicker.tsx
git commit -m "feat(profiles): picker page at /profiles

Server page loads profile list, auto-selects when there's only one
profile with no PIN (single-user installs see nothing). Otherwise
renders the client picker — grid of avatars, PIN pad when a PIN'd
profile is tapped, add-profile slot. Public route group sits outside
the shell so the nav isn't rendered before a profile is selected."
```

Note: the "/profiles/new" route referenced in ProfilePicker is added in Task 14 (ManageProfiles). Until then, clicking "Add profile" 404s — acceptable for mid-branch.

---

## Task 13: ProfileSwitcher in the header

**Files:**
- Create: `src/components/shell/ProfileSwitcher.tsx`
- Modify: `src/components/shell/AppShell.tsx` (or wherever the header lives — confirm by reading)

- [ ] **Step 1: Implement the switcher**

Create `src/components/shell/ProfileSwitcher.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronDown, Settings } from 'lucide-react'
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface ProfileSwitcherProps {
  current: ProfileSummary
  others: ProfileSummary[]
}

export function ProfileSwitcher({ current, others }: ProfileSwitcherProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onDocClick)
    return () => window.removeEventListener('mousedown', onDocClick)
  }, [open])

  const switchTo = async (p: ProfileSummary) => {
    if (p.hasPin) {
      router.push(`/profiles?switch=${encodeURIComponent(p.id)}`)
      return
    }
    const res = await fetch('/api/profiles/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div ref={rootRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Switch profile"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px' }}
      >
        <ProfileAvatar name={current.name} color={current.avatarColor} size={32} />
        <ChevronDown size={14} color="var(--selah-text-3)" />
      </button>
      {open && (
        <div
          role="menu"
          style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', minWidth: '220px', padding: '8px', backgroundColor: 'var(--selah-bg-surface)', border: '1px solid var(--selah-border-color)', borderRadius: '10px', zIndex: 50 }}
        >
          <div style={{ padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)' }}>
            Current
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', marginBottom: '4px' }}>
            <ProfileAvatar name={current.name} color={current.avatarColor} size={28} />
            <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>{current.name}</span>
          </div>
          {others.length > 0 && (
            <>
              <div style={{ padding: '4px 8px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3)' }}>
                Switch to
              </div>
              {others.map((p) => (
                <button
                  key={p.id}
                  role="menuitem"
                  onClick={() => switchTo(p)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <ProfileAvatar name={p.name} color={p.avatarColor} size={24} />
                  <span style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1)' }}>{p.name}</span>
                  {p.hasPin && <span style={{ marginLeft: 'auto', fontSize: '9px', color: 'var(--selah-text-3)' }}>PIN</span>}
                </button>
              ))}
            </>
          )}
          <div style={{ borderTop: '1px solid var(--selah-border-color)', marginTop: '4px', paddingTop: '4px' }}>
            <Link
              href="/settings?section=profiles"
              role="menuitem"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', color: 'var(--selah-text-2)', textDecoration: 'none', fontSize: '13px', fontFamily: font.body }}
            >
              <Settings size={14} /> Manage profiles
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Wire into AppShell**

Read `src/components/shell/AppShell.tsx`. Find the header area. Add an import + render site for `ProfileSwitcher`. You'll need to load the active profile + other profiles — do this in the shell layout (server component) and pass as props:

In `src/app/(shell)/layout.tsx`:

```tsx
import { requireActiveProfileId } from '@/lib/profiles/active-profile'
import { listProfiles } from '@/lib/profiles/queries'

export default async function ShellLayout({ children }: { children: React.ReactNode }) {
  const userId = await requireActiveProfileId()
  const profiles = await listProfiles()
  const current = profiles.find((p) => p.id === userId)!
  const others = profiles.filter((p) => p.id !== userId)
  const aiConfig = await getAIConfig()

  return (
    <ShellProviders>
      <AppShell
        user={{ name: 'Study User' }}
        isAIConfigured={aiConfig.isConfigured}
        activeProfile={{ id: current.id, name: current.name, avatarColor: current.avatarColor, hasPin: current.pinHash !== null, isDefault: current.isDefault }}
        otherProfiles={others.map((p) => ({ id: p.id, name: p.name, avatarColor: p.avatarColor, hasPin: p.pinHash !== null, isDefault: p.isDefault }))}
      >
        {children}
      </AppShell>
    </ShellProviders>
  )
}
```

Update `AppShell` props + render `<ProfileSwitcher current={activeProfile} others={otherProfiles} />` in its header.

- [ ] **Step 3: Smoke test**

Run: `npm run dev`. Verify the header now shows the current profile's avatar + chevron; dropdown lists others.

- [ ] **Step 4: Commit**

```bash
git add src/components/shell/ProfileSwitcher.tsx src/components/shell/AppShell.tsx src/app/\(shell\)/layout.tsx
git commit -m "feat(profiles): ProfileSwitcher in shell header

Active-profile avatar + dropdown of other profiles. Switching to a
non-PIN'd profile sets the cookie inline; PIN'd profiles route to
/profiles?switch=<id> to enter the PIN. Links to Settings → Manage
Profiles."
```

---

## Task 14: ManageProfiles + ProfileSettings

**Files:**
- Create: `src/components/settings/ManageProfiles.tsx`
- Create: `src/components/settings/ProfileSettings.tsx`
- Modify: `src/components/settings/SettingsView.tsx` (or the main settings component — confirm by reading)
- Create: `src/app/(public)/profiles/new/page.tsx` + client (add-profile flow, accessible from picker's "+" card)

- [ ] **Step 1: Implement the Add-Profile page**

Create `src/app/(public)/profiles/new/page.tsx`:

```tsx
import { NewProfileClient } from './NewProfileClient'

export const dynamic = 'force-dynamic'

const PALETTE = [
  '#C6A23C', // gold-500
  '#C77C5B', // terra-400
  '#4A9B8B', // teal-400
  '#8BA881', // sage-400
  '#6B91B5', // sky-400
  '#C9A96E', // warmth-400
  '#9A7C42', // muted gold
  '#A05F47', // muted terra
  '#3D6B65', // deep teal
  '#6B7A5C', // muted sage
]

export default function NewProfilePage() {
  return <NewProfileClient palette={PALETTE} />
}
```

Create `src/app/(public)/profiles/new/NewProfileClient.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface Props { palette: string[] }

export function NewProfileClient({ palette }: Props) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [color, setColor] = useState(palette[0])
  const [pin, setPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Name required')
    if (pin && !/^\d{4}$/.test(pin)) return setError('PIN must be 4 digits')
    setBusy(true)
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatarColor: color, pin: pin || null }),
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body.error || 'Create failed')
      router.push('/profiles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Create failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', gap: '20px' }}>
      <h1 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '28px', color: 'var(--selah-text-1)' }}>New profile</h1>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', width: '100%', maxWidth: '360px' }}>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={30}
          autoFocus
          style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }}
        />
      </label>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>Color</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '360px' }}>
          {palette.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c, border: color === c ? '3px solid var(--selah-text-1)' : '1px solid var(--selah-border-color)', cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', width: '100%', maxWidth: '360px' }}>
        PIN (optional — 4 digits)
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }}
        />
      </label>
      {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', fontFamily: font.body }}>{error}</div>}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button type="button" onClick={() => router.push('/profiles')} disabled={busy} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'transparent', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={busy || !name.trim()} style={{ padding: '10px 18px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Create</button>
      </div>
    </form>
  )
}
```

- [ ] **Step 2: Implement ManageProfiles**

Create `src/components/settings/ManageProfiles.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { ProfileAvatar } from '@/components/profiles/ProfileAvatar'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

interface DeleteDialogState {
  profile: ProfileSummary
  counts: Record<string, number>
  pin: string
  confirmName: string
  error: string | null
}

export function ManageProfiles() {
  const [profiles, setProfiles] = useState<ProfileSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteState, setDeleteState] = useState<DeleteDialogState | null>(null)

  const reload = async () => {
    setLoading(true)
    const res = await fetch('/api/profiles')
    const body = await res.json()
    setProfiles(body.profiles ?? [])
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const openDelete = async (p: ProfileSummary) => {
    const res = await fetch(`/api/profiles/${p.id}?counts=1`)
    const body = await res.json()
    setDeleteState({ profile: p, counts: body.counts ?? {}, pin: '', confirmName: '', error: null })
  }

  const confirmDelete = async () => {
    if (!deleteState) return
    const { profile, pin, confirmName } = deleteState
    const payload: { pin?: string; confirmName?: string } = {}
    if (profile.hasPin) payload.pin = pin
    else payload.confirmName = confirmName
    const res = await fetch(`/api/profiles/${profile.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({ error: 'Delete failed' }))
      setDeleteState({ ...deleteState, error: body.error })
      return
    }
    setDeleteState(null)
    reload()
  }

  if (loading) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading profiles...</div>

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '22px', color: 'var(--selah-text-1)', margin: 0 }}>Profiles</h2>
        <Link href="/profiles/new" style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', textDecoration: 'none', fontFamily: font.body, fontWeight: 600, fontSize: '13px' }}>
          Add profile
        </Link>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {profiles.map((p) => (
          <li key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--selah-border-color)' }}>
            <ProfileAvatar name={p.name} color={p.avatarColor} size={40} />
            <div style={{ flex: 1, fontFamily: font.body, color: 'var(--selah-text-1)' }}>
              {p.name}
              {p.hasPin && <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>PIN</span>}
              {p.isDefault && <span style={{ marginLeft: '8px', fontSize: '10px', color: 'var(--selah-text-3)', textTransform: 'uppercase', letterSpacing: '1px' }}>Default</span>}
            </div>
            <Link href={`/settings/profiles/${p.id}`} style={{ padding: '6px 10px', fontSize: '12px', color: 'var(--selah-text-2)', textDecoration: 'none' }}>Edit</Link>
            <button onClick={() => openDelete(p)} aria-label={`Delete ${p.name}`} style={{ padding: '6px', background: 'transparent', border: 'none', color: 'var(--selah-terra-400)', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
      {deleteState && (
        <DeleteDialog
          state={deleteState}
          onChange={setDeleteState}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteState(null)}
        />
      )}
    </div>
  )
}

function DeleteDialog({ state, onChange, onConfirm, onCancel }: {
  state: DeleteDialogState
  onChange: (s: DeleteDialogState) => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const { profile, counts, pin, confirmName, error } = state
  const nonZero = Object.entries(counts).filter(([, n]) => n > 0)
  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
      <div role="dialog" aria-modal="true" style={{ backgroundColor: 'var(--selah-bg-surface)', border: '1px solid var(--selah-border-color)', borderRadius: '12px', padding: '20px', maxWidth: '420px', width: '90%' }}>
        <h3 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '20px', color: 'var(--selah-text-1)', margin: '0 0 12px' }}>Delete {profile.name}?</h3>
        {nonZero.length > 0 && (
          <p style={{ fontFamily: font.body, color: 'var(--selah-text-2)', fontSize: '13px' }}>
            This will permanently delete: {nonZero.map(([t, n]) => `${n} ${t.replace(/_/g, ' ')}`).join(', ')}.
          </p>
        )}
        {profile.hasPin ? (
          <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', display: 'block', marginBottom: '10px' }}>
            Enter {profile.name}'s PIN to confirm:
            <input
              type="text"
              inputMode="numeric"
              value={pin}
              onChange={(e) => onChange({ ...state, pin: e.target.value.replace(/\D/g, '').slice(0, 4), error: null })}
              style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }}
            />
          </label>
        ) : (
          <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)', display: 'block', marginBottom: '10px' }}>
            Type <strong>{profile.name}</strong> to confirm:
            <input
              type="text"
              value={confirmName}
              onChange={(e) => onChange({ ...state, confirmName: e.target.value, error: null })}
              style={{ width: '100%', padding: '8px', marginTop: '6px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-page)', color: 'var(--selah-text-1)', fontFamily: font.body }}
            />
          </label>
        )}
        {error && <div role="alert" style={{ color: 'var(--selah-terra-400)', fontFamily: font.body, fontSize: '12px', marginBottom: '8px' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
          <button onClick={onCancel} style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid var(--selah-border-color)', backgroundColor: 'transparent', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
          <button onClick={onConfirm} style={{ padding: '8px 14px', borderRadius: '6px', backgroundColor: 'var(--selah-terra-400)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Implement ProfileSettings (edit a profile)**

Create `src/components/settings/ProfileSettings.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const font = { body: "var(--selah-font-body, 'Source Sans 3', sans-serif)" }

const PALETTE = [
  '#C6A23C', '#C77C5B', '#4A9B8B', '#8BA881', '#6B91B5',
  '#C9A96E', '#9A7C42', '#A05F47', '#3D6B65', '#6B7A5C',
]

interface ProfileSummary {
  id: string
  name: string
  avatarColor: string
  hasPin: boolean
  isDefault: boolean
}

export function ProfileSettings({ id }: { id: string }) {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileSummary | null>(null)
  const [name, setName] = useState('')
  const [color, setColor] = useState(PALETTE[0])
  const [pin, setPin] = useState('')
  const [removePin, setRemovePin] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/profiles/${id}`).then((r) => r.json()).then((b) => {
      setProfile(b.profile)
      setName(b.profile.name)
      setColor(b.profile.avatarColor)
    })
  }, [id])

  if (!profile) return <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)' }}>Loading...</div>

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const payload: Record<string, unknown> = { name, avatarColor: color }
    if (removePin) payload.pin = null
    else if (pin) payload.pin = pin
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: 'Save failed' }))
        throw new Error(body.error)
      }
      router.push('/settings?section=profiles')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '420px' }}>
      <h2 style={{ fontFamily: 'var(--selah-font-display)', fontSize: '22px', color: 'var(--selah-text-1)', margin: 0 }}>Edit profile</h2>
      <label style={{ fontFamily: font.body, color: 'var(--selah-text-2)' }}>
        Name
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={30} style={{ width: '100%', padding: '10px', marginTop: '6px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }} />
      </label>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>Color</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {PALETTE.map((c) => (
            <button key={c} type="button" onClick={() => setColor(c)} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c, border: color === c ? '3px solid var(--selah-text-1)' : '1px solid var(--selah-border-color)', cursor: 'pointer' }} />
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: font.body, color: 'var(--selah-text-2)', marginBottom: '8px' }}>PIN</div>
        {profile.hasPin && !removePin && (
          <button type="button" onClick={() => setRemovePin(true)} style={{ padding: '6px 12px', marginBottom: '8px', fontSize: '12px', backgroundColor: 'transparent', color: 'var(--selah-terra-400)', border: '1px solid var(--selah-terra-400)', borderRadius: '6px', cursor: 'pointer' }}>Remove PIN</button>
        )}
        {!removePin && (
          <input type="text" inputMode="numeric" pattern="\d*" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))} placeholder={profile.hasPin ? 'Enter new PIN to change' : 'Set a 4-digit PIN (optional)'} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--selah-border-color)', backgroundColor: 'var(--selah-bg-surface)', color: 'var(--selah-text-1)', fontFamily: font.body }} />
        )}
        {removePin && (
          <div style={{ fontFamily: font.body, color: 'var(--selah-text-3)', fontSize: '12px' }}>
            PIN will be removed on save. <button type="button" onClick={() => setRemovePin(false)} style={{ color: 'var(--selah-sky-400)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>Undo</button>
          </div>
        )}
      </div>
      {error && <div role="alert" style={{ color: 'var(--selah-terra-400)' }}>{error}</div>}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="button" onClick={() => router.push('/settings?section=profiles')} disabled={busy} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: 'transparent', border: '1px solid var(--selah-border-color)', color: 'var(--selah-text-2)', cursor: 'pointer' }}>Cancel</button>
        <button type="submit" disabled={busy} style={{ padding: '10px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500)', color: 'var(--selah-bg-page)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Save</button>
      </div>
    </form>
  )
}
```

- [ ] **Step 4: Route the edit page**

Create `src/app/(shell)/settings/profiles/[id]/page.tsx`:

```tsx
import { ProfileSettings } from '@/components/settings/ProfileSettings'

export default async function EditProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ProfileSettings id={id} />
}
```

- [ ] **Step 5: Wire ManageProfiles into the settings surface**

Read `src/components/settings/SettingsView.tsx`. Add a new section titled "Profiles" that renders `<ManageProfiles />`. If the settings page uses a sectioned layout with anchors, match that pattern.

- [ ] **Step 6: Commit**

```bash
git add src/components/settings/ManageProfiles.tsx src/components/settings/ProfileSettings.tsx src/app/\(public\)/profiles/new src/app/\(shell\)/settings/profiles src/components/settings/SettingsView.tsx
git commit -m "feat(profiles): manage profiles in Settings + new-profile flow

ManageProfiles lists, edits, and deletes profiles with count-surfaced
delete dialog (PIN required for PIN'd profiles, exact-name typing for
non-PIN profiles). ProfileSettings handles name/color/PIN changes.
Add-profile uses a curated 10-color palette."
```

---

## Task 15: Seed-update allowlist + final verification

**Files:**
- Modify: `src/lib/seed/user-tables.ts`

- [ ] **Step 1: Add the new tables to USER_LOCAL_TABLES**

Open `src/lib/seed/user-tables.ts`. In the `USER_LOCAL_TABLES` array, add `'user_profiles'` and `'user_settings'` alongside the existing entries. The merge engine will handle them naturally via the existing `tablesSkippedMissingInOld` path for fresh installs and via the additive-column path on upgrades.

- [ ] **Step 2: Run tests**

Run: `npm test`
Expected: all tests still pass. The merge-engine tests should still work because their fixtures build whichever tables they exercise — the allowlist change is additive.

- [ ] **Step 3: Smoke test a fresh seed-update locally**

With the dev server stopped, confirm the merge engine's behavior:

```bash
npx tsx scripts/ops/apply-seed-update.ts --localFreshSeedPath data/selah-seed.db
```

(or whatever the current scripted path is — the apply-seed-update script has a `localFreshSeedPath` parameter exposed for manual testing; see `scripts/ops/apply-seed-update.ts` for the exact invocation pattern.)

Expected: merge succeeds. Post-merge, verify `user_profiles` and `user_settings` rows survived the swap:

```bash
node -e "const d=require('better-sqlite3')('data/selah.db',{readonly:true});console.log(d.prepare('SELECT COUNT(*) n FROM user_profiles').get());console.log(d.prepare('SELECT COUNT(*) n FROM user_settings').get())"
```

Expected: same counts as before the merge.

- [ ] **Step 4: End-to-end manual regression**

Boot the dev server (`npm run dev`). Verify end-to-end:

1. **Single profile, no PIN:** First load → auto-redirects to `/` without showing the picker.
2. **Create a second profile via Settings → Profiles → Add.** Now two profiles exist.
3. **Log out** (clear the `selah-profile-id` cookie via browser devtools) and reload. Picker shows.
4. **Select profile B, write a companion message on a devotional, then switch to profile A.** On profile A, the same devotional shows no messages. Switch back to B — messages are there.
5. **Settings → Profiles → Edit profile A → set a 4-digit PIN.** Log out. Reload. Tap A — PIN pad appears. Wrong PIN shakes; right PIN enters.
6. **Delete profile B.** Confirmation dialog lists counts. Delete succeeds. B gone, A still works, B's notes/threads/etc. all wiped.
7. **Try to delete profile A (last remaining profile).** API returns 400 with "Cannot delete the last profile" or equivalent.

Any failure → fix before committing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/seed/user-tables.ts
git commit -m "feat(seed): add user_profiles + user_settings to user-local allowlist

Closes the seed-update hole — profiles and per-profile settings now
survive content seed refreshes like every other user-local table."
```

---

## Self-review checks (already performed by author)

**Spec coverage:** ✅
- `user_profiles` + `user_settings` schema + migration → Task 1
- `userId` on every user-local table → Task 1
- Frozen key list + idempotent move → Task 1
- PIN hashing + verification → Task 2
- Active profile helpers + middleware → Task 3
- Profile CRUD routes + cascade delete → Task 4
- Settings split (app_settings vs user_settings) → Task 5
- Companion thread scoping → Task 6
- Query scoping across daily-bread / reader history / devotional history → Task 7
- Query scoping across journal / notes / tags → Task 8
- Query scoping across study-builder / general AI conversations → Task 9
- Query scoping across home / bookmarks / collections → Task 10
- ProfileAvatar + PinPad primitives → Task 11
- Profile picker at /profiles → Task 12
- Profile switcher in shell → Task 13
- Manage profiles + edit + add-profile flow → Task 14
- Seed-update allowlist update → Task 15
- End-to-end manual regression → Task 15 Step 4

**Placeholder scan:** No "TBD" / "implement later". Query-scoping tasks 7–10 describe the mechanical process (grep → add param → update callers) in concrete terms with example before/after code, but each user-local function isn't individually enumerated — implementers must run the grep commands and apply the pattern. This is intentional: there are dozens of functions across these modules and listing each would add noise without adding clarity. The pattern is the same for every one.

**Type consistency:**
- `userId: string` used consistently across all scoping tasks.
- `ProfileRecord` defined in Task 4 is used in the API routes in the same task.
- `ProfileSummary` (id/name/avatarColor/hasPin/isDefault shape) used consistently in Tasks 11, 12, 13, 14.
- `toContextRef` and `narrowRole` references in Task 6 match existing signatures from the companion thread-store (committed in v0.2.0).
- `PROFILE_COOKIE_NAME` constant defined in Task 3 is reused in Task 3's middleware — same literal value.
- `requireActiveProfileId` signature consistent across all callers (async, returns `string`, throws on failure).
- The frozen key list appears in both Task 1's migration script (authoritative) and Task 5's user-settings module (`USER_SETTING_KEYS` export) — these MUST match; the user-settings module references the migration's list in a file-header comment.
