# Testing Patterns

**Analysis Date:** 2026-06-06

## Test Framework

**Runner:**
- Vitest 4.x
- Config: `vitest.config.ts` (project root)
- Environment: `node` (no jsdom — server-focused tests)
- Path alias: `@/` → `./src/` (matches tsconfig)

**Assertion Library:**
- Vitest built-in (`expect`, matchers from `@vitest/expect`)

**Run Commands:**
```bash
npm test              # vitest run (CI / one-shot)
npm run test:watch    # vitest (interactive watch)
# No coverage script defined — no coverage threshold enforced
```

## Test File Organization

**Location:**
- Separate `tests/` tree at project root — NOT co-located with source
- Mirror the `src/` directory structure exactly:
  - `src/lib/profiles/queries.ts` → `tests/lib/profiles/queries.test.ts`
  - `src/lib/ai/companion/system-prompt.ts` → `tests/lib/ai/companion/system-prompt.test.ts`
  - `src/components/journal/JournalExport.tsx` → `tests/components/journal/JournalExport.test.ts`
- Non-src tests in flat subdirectories: `tests/api/`, `tests/safety/`, `tests/scripts/`, `tests/mcp/`
- Sanity check: `tests/sanity.test.ts`

**Naming:**
- `{ModuleName}.test.ts` for lib tests
- `{ComponentName}.test.ts` for component tests
- `{feature}.integration.test.ts` for end-to-end / integration tests (e.g. `apply-seed-update.integration.test.ts`)
- `{feature}.test.ts` for safety and script tests

**Structure:**
```
tests/
├── sanity.test.ts
├── api/
│   └── ai/conversations/isolation.test.ts
├── components/
│   └── journal/JournalExport.test.ts
├── lib/
│   ├── ai/companion/      (grounding, system-prompt, thread-store, context-ref, require-owned)
│   ├── audit/
│   ├── backup/
│   ├── export/docx/       (markdown, primitives, scripture, tier-pills)
│   ├── export/markdown/
│   ├── export/targets/
│   ├── profiles/          (active-profile, effective-ai-config, pin, queries, require-caller-profile)
│   ├── search/
│   ├── seed/              (manifest, merge-engine, merge-engine-orphan)
│   └── settings/
├── mcp/
├── safety/                (marker, regression, scan)
└── scripts/
```

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect } from 'vitest'

describe('moduleName or functionName', () => {
  describe('nested group / sub-category', () => {
    it('does X when Y', () => {
      // arrange
      // act
      // assert
    })
  })
})
```

**Patterns:**
- `beforeEach` / `afterEach` for DB fixture setup/teardown
- Temp dirs via `mkdtempSync(join(tmpdir(), 'selah-{name}-'))` — always cleaned in `afterEach`
- Setup: create in-memory SQLite schema with `better-sqlite3`, then point `DATABASE_URL` env var at temp file
- Teardown: `prisma.$disconnect()` then `rmSync(dir, { recursive: true, force: true })`
- Section dividers `// ─────────────...` separate logical test groups within a file

## Mocking

**Framework:** Vitest's built-in `vi`

**Patterns:**
```typescript
// Module-level mock — hoist before imports
vi.mock('@/lib/settings/queries', () => ({
  createBackup: vi.fn().mockResolvedValue(Buffer.from('SQLite format 3\0fake')),
  getBackupInfo: vi.fn().mockResolvedValue({ autoBackupEnabled: true, ... }),
}))

// Dynamic import after vi.resetModules() for Prisma singleton isolation
vi.resetModules()
const { createProfile } = await import('@/lib/profiles/queries')
```

**Prisma Singleton Reset Pattern (critical for DB tests):**
```typescript
// Must be done in beforeEach for any test that hits @/lib/db
process.env.DATABASE_URL = `file:${dbPath}`
const globalForPrisma = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
globalForPrisma.prisma = undefined
globalForPrisma.prismaVersion = undefined
vi.resetModules()
// Then dynamic-import the module under test:
const { myFunction } = await import('@/lib/mymodule')
```

**After each DB test:**
```typescript
afterEach(async () => {
  const { prisma } = await import('@/lib/db')
  await prisma.$disconnect()
  rmSync(dir, { recursive: true, force: true })
})
```

**What to Mock:**
- External I/O: settings queries, backup functions, network calls
- Prisma singleton when testing modules that import `@/lib/db` — use the reset pattern above
- Time-dependent operations (schedulers) — mock `Date` or settings

**What NOT to Mock:**
- Pure functions with no side effects — test them directly
- `better-sqlite3` — use real in-memory temp DBs instead
- Safety taxonomy — structural invariant tests import the real taxonomy

## Fixtures and Factories

**Test Data:**
```typescript
// Inline const fixtures — defined at module top, reused across test cases
const grounding: CompanionGrounding = {
  devotionalId: 'romans-8-28',
  title: 'When things do not feel good',
  passageRef: 'Romans 8:28',
  passageText: 'And we know that in all things...',
  audienceLevel: 'adults',
  contextBrief: 'Paul wrote this from a Roman prison.',
  modernMoment: 'Your job loss. The diagnosis.',
  goingDeeperPrompt: 'Sit with "all things" before you leap to "for good".',
}

// Spread overrides for variant cases
const minimal = { ...fixture, modernMoment: '', goingDeeper: { narrativeUnitRef: '', prompt: '' } }
```

**DB Fixture Setup (SQL inline):**
```typescript
const db = new Database(dbPath)
db.exec(`CREATE TABLE user_profiles (id TEXT PRIMARY KEY, ...)`)
db.prepare(`INSERT INTO user_profiles VALUES (?, ?, ...)`).run(args)
db.close()
```

**Location:**
- No shared fixture files — fixtures defined inline per test file
- Helper functions for DB setup defined as local `function writeLiveDb()` inside the `describe` block

## Coverage

**Requirements:** None enforced (no coverage config in `vitest.config.ts`)

**View Coverage:**
```bash
# Not configured — add --coverage flag manually if needed:
npx vitest run --coverage
```

## Test Types

**Unit Tests:**
- Pure function tests: no I/O, no mocking needed
- Files: `tests/lib/ai/sanitize-error.test.ts`, `tests/lib/search/parser.test.ts`, `tests/safety/scan.test.ts`, `tests/lib/ai/companion/system-prompt.test.ts`
- Pattern: import function, run assertions, no setup/teardown

**Integration Tests (DB-backed):**
- Spin up a real SQLite file in a temp dir, run queries against it via Prisma
- Files: `tests/lib/profiles/queries.test.ts`, `tests/lib/ai/companion/thread-store.test.ts`
- Always use the Prisma singleton reset pattern
- Label: plain `.test.ts` suffix unless they hit the network

**Integration Tests (CLI/script):**
- End-to-end test of script logic against real filesystem artifacts
- File: `tests/scripts/apply-seed-update.integration.test.ts`
- Uses `process.chdir()` to simulate CLI working directory; restores in `afterEach`

**Safety Regression Tests (conditional live AI):**
- Skipped unless `SAFETY_REGRESSION_PROVIDER`, `SAFETY_REGRESSION_MODEL`, `SAFETY_REGRESSION_API_KEY` env vars are set
- File: `tests/safety/regression.test.ts`
- Run explicitly: `SAFETY_REGRESSION_PROVIDER=anthropic ... npx vitest run tests/safety/regression.test.ts`
- Does NOT run in `npm test`

**SQL Logic Tests:**
- Validate SQL `WHERE` clause logic directly against `better-sqlite3` without Prisma
- File: `tests/api/ai/conversations/isolation.test.ts`
- Pattern: seed DB manually, run raw SQL queries, assert result shape

**Smoke Tests (component output):**
- Tests that a component produces a non-empty, structurally correct output (e.g. DOCX is a valid ZIP)
- File: `tests/components/journal/JournalExport.test.ts`
- Use `as any` for fixture types to avoid importing full type graph

## Common Patterns

**Async Testing:**
```typescript
// All DB and async tests use async/await; never callbacks
it('creates profile', async () => {
  const { createProfile } = await import('@/lib/profiles/queries')
  const p = await createProfile({ name: 'Ada', avatarColor: '#ff0', pin: null })
  expect(p.name).toBe('Ada')
})
```

**Error Testing:**
```typescript
// Use rejects.toThrow() with regex for error message assertions
await expect(deleteProfile(p.id)).rejects.toThrow(/last/i)
```

**Taxonomy/Structural Invariant Tests:**
```typescript
// Import the real module, assert structural rules hold
it('every pattern is at least 2 words', async () => {
  const { KEYWORD_TAXONOMY } = await import('@/lib/safety/keyword-taxonomy')
  for (const category of KEYWORD_TAXONOMY) {
    for (const pattern of category.patterns) {
      expect(pattern.trim().split(/\s+/).length).toBeGreaterThanOrEqual(2)
    }
  }
})
```

**String Content Assertions:**
```typescript
// Use toContain() for substring presence in generated text output
expect(out).toContain('Romans 8:28')
expect(out).toContain('<passage>')
// Use toMatch(/regex/) for flexible pattern matching
expect(out).toMatch(/adults .* teens: address the reader directly/)
```

---

*Testing analysis: 2026-06-06*
