# Devotional Companion Chat Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship an inline AI chat surface below each Daily Bread devotional's Conversation Starters. Thread persists per devotional, companion speaks first with a seed-authored opener, voice tuned via explicit anti-platitude constraints.

**Architecture:** Pure-function modules (`context-ref`, `grounding`, `system-prompt`) + a thread-store layer over the existing `ai_conversations`/`ai_messages` tables (zero schema change there) + two thin API routes + a client component composed from reused `ai-assistant` primitives. One additive column on `devotionals`: `companion_opener`.

**Tech Stack:** Next.js 16 App Router, Prisma 7 + better-sqlite3, React 19, vitest, @huggingface/hub unchanged. All AI streaming reuses the existing provider adapters and `use-chat-stream.ts` hook.

**Spec:** [`docs/superpowers/specs/2026-04-19-devotional-companion-chat-design.md`](../specs/2026-04-19-devotional-companion-chat-design.md)

---

## File structure

| File | Responsibility |
|---|---|
| `prisma/schema.prisma` | **Modify** — add `companionOpener String?` to `Devotional` |
| `scripts/etl/add-companion-opener-column.ts` | **Create** — idempotent migration via ALTER TABLE |
| `src/components/daily-bread/types.ts` | **Modify** — add `companionOpener?: string \| null` to `Devotional` interface |
| `src/lib/daily-bread/queries.ts` | **Modify** — extend `mapDevotional` to pass `companionOpener` through |
| `src/lib/ai/companion/context-ref.ts` | **Create** — `toContextRef(id)` / `parseContextRef(str)` helpers |
| `src/lib/ai/companion/grounding.ts` | **Create** — `buildCompanionGrounding(devotional, passageText)` |
| `src/lib/ai/companion/system-prompt.ts` | **Create** — `buildCompanionSystemPrompt(devotional, passageText)` |
| `src/lib/ai/companion/thread-store.ts` | **Create** — `findActiveThread` / `listThreads` / `createThread` / `appendMessage` |
| `src/lib/ai/companion/types.ts` | **Create** — TS shapes shared between server + client |
| `src/app/api/ai/companion/thread/route.ts` | **Create** — GET thread list + messages |
| `src/app/api/ai/companion/stream/route.ts` | **Create** — POST streaming endpoint |
| `src/lib/ai/use-chat-stream.ts` | **Modify** — accept optional `endpoint` param (default `/api/ai/send`) |
| `src/components/daily-bread/CompanionOpener.tsx` | **Create** — renders the seed-authored opener or fallback |
| `src/components/daily-bread/CompanionChat.tsx` | **Create** — inline chat: messages, input, streaming, save-to-journal, new-conversation, past-threads |
| `src/components/daily-bread/DailyBreadReading.tsx` | **Modify** — render `<CompanionChat />` below Conversation Starters |
| `docs/devotional-companion-voice-checklist.md` | **Create** — manual regression prompts + expected behaviors |

---

## Task 1: Add `companionOpener` column to devotionals

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `scripts/etl/add-companion-opener-column.ts`
- Modify: `src/components/daily-bread/types.ts`

- [ ] **Step 1: Add field to Prisma model**

Edit `prisma/schema.prisma`, find the `model Devotional {` block (around line 425), add `companionOpener` between `narrativeId` and the series fields:

```prisma
model Devotional {
  id                   String  @id
  title                String
  // ... existing fields ...
  narrativeId          String? @map("narrative_id")
  companionOpener      String? @map("companion_opener")
  seriesId             String? @map("series_id")
  seriesOrder          Int?    @map("series_order")
  // ... rest unchanged ...
}
```

- [ ] **Step 2: Write migration script**

Create `scripts/etl/add-companion-opener-column.ts`:

```ts
// scripts/etl/add-companion-opener-column.ts
//
// Idempotent: adds devotionals.companion_opener if missing.
// Additive-only, safe to run against a populated DB.

import Database from 'better-sqlite3'
import { resolve } from 'path'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

function migrate(db: Database.Database): void {
  const existing = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info('devotionals') WHERE name = 'companion_opener'`)
    .get() as { n: number }
  if (existing.n > 0) {
    console.log('[migration] devotionals.companion_opener already exists — skipping.')
    return
  }
  console.log('[migration] adding devotionals.companion_opener column...')
  db.exec(`ALTER TABLE devotionals ADD COLUMN companion_opener TEXT`)
  console.log('[migration] done.')
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

- [ ] **Step 3: Run the migration against the live DB**

Run: `npx tsx scripts/etl/add-companion-opener-column.ts`
Expected: `[migration] adding devotionals.companion_opener column...` then `[migration] done.` then `[migration] committed.`
Re-run once to confirm idempotence: `[migration] devotionals.companion_opener already exists — skipping.`

- [ ] **Step 4: Regenerate Prisma client**

Run: `npx prisma generate`
Expected: `Prisma Client generated successfully`.

- [ ] **Step 5: Add the optional field to the Devotional TS interface**

Edit `src/components/daily-bread/types.ts`. In the `Devotional` interface (around line 21), add `companionOpener?: string | null` after `conversationStarters`:

```ts
export interface Devotional {
  id: string; title: string; bookId: string; chapter: number; passageRef: string; audienceLevel: AudienceLevel
  estimatedMinutes: number; seasonalSet: SeasonalSet; moodMatch: string
  passage: string; contextBrief: string; modernMoment: string
  conversationStarters: string[]; goingDeeper: GoingDeeper
  companionOpener?: string | null
  seriesId?: string | null
  seriesMeta?: { seriesOrder: number; seriesTitle: string; partCount: number } | null
}
```

- [ ] **Step 6: Verify nothing broke**

Run: `npm test`
Expected: `Tests  166 passed (166)` (or however many existed before — count unchanged).

- [ ] **Step 7: Commit**

```bash
git add prisma/schema.prisma scripts/etl/add-companion-opener-column.ts src/components/daily-bread/types.ts src/generated/prisma
git commit -m "feat(companion): add devotionals.companion_opener column

Additive schema change for the devotional companion chat feature.
Stores a short (1-2 sentence) seed-authored opening beat per
devotional. Null-tolerant — UI falls back to a generic opener."
```

---

## Task 2: Extend `mapDevotional` to surface `companionOpener`

**Files:**
- Modify: `src/lib/daily-bread/queries.ts`

- [ ] **Step 1: Locate `mapDevotional`**

Open `src/lib/daily-bread/queries.ts` and find the `async function mapDevotional(dev: {...})` signature (around line 427). Currently its parameter type lists devotional fields explicitly.

- [ ] **Step 2: Add `companionOpener` to parameter type and return value**

Modify the function signature parameter type to include:

```ts
async function mapDevotional(dev: {
  id: string; title: string; bookId: string; chapter: number;
  verseStart: number; verseEnd: number; contextBrief: string;
  modernMoment: string; conversationStarters: string;
  goingDeeper: string | null; audience: string;
  estimatedMinutes: number; season: string | null;
  narrativeId: string | null;
  companionOpener?: string | null;  // NEW
  seriesId?: string | null;
  seriesOrder?: number | null;
}): Promise<Devotional> {
```

Then at the return statement, add `companionOpener: dev.companionOpener ?? null,` to the returned object.

- [ ] **Step 3: Find every Prisma query that feeds `mapDevotional` and add the field to `select`**

Grep for callers:

```bash
grep -n "mapDevotional" src/lib/daily-bread/queries.ts
```

For every `prisma.devotional.findUnique/findMany` that passes its result to `mapDevotional`, either:
- remove the explicit `select` (Prisma then returns all columns including `companionOpener`), OR
- add `companionOpener: true` to the existing `select` block.

The repo pattern is to use `select: undefined` / no select on devotional reads that feed the mapper — confirm by reading each caller and adjust minimally.

- [ ] **Step 4: Run tests to verify nothing regressed**

Run: `npm test -- tests/lib/daily-bread`
Expected: all daily-bread tests still pass (18 or so).

- [ ] **Step 5: Commit**

```bash
git add src/lib/daily-bread/queries.ts
git commit -m "feat(companion): surface companionOpener from mapDevotional"
```

---

## Task 3: `context-ref` namespace helper

**Files:**
- Create: `src/lib/ai/companion/context-ref.ts`
- Create: `tests/lib/ai/companion/context-ref.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/ai/companion/context-ref.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { toContextRef, parseContextRef, isCompanionContextRef } from '@/lib/ai/companion/context-ref'

describe('toContextRef', () => {
  it('namespaces a devotional id', () => {
    expect(toContextRef('romans-8-28')).toBe('devotional-companion:romans-8-28')
  })
  it('rejects empty ids', () => {
    expect(() => toContextRef('')).toThrow(/empty/i)
  })
})

describe('parseContextRef', () => {
  it('round-trips a companion contextRef', () => {
    expect(parseContextRef('devotional-companion:romans-8-28')).toEqual({ devotionalId: 'romans-8-28' })
  })
  it('returns null for a non-companion contextRef', () => {
    expect(parseContextRef('passage:gen:1')).toBeNull()
    expect(parseContextRef('character:moses')).toBeNull()
    expect(parseContextRef('')).toBeNull()
    expect(parseContextRef(null as unknown as string)).toBeNull()
  })
  it('handles devotional ids containing colons', () => {
    expect(parseContextRef('devotional-companion:foo:bar:baz')).toEqual({ devotionalId: 'foo:bar:baz' })
  })
})

describe('isCompanionContextRef', () => {
  it('identifies companion refs', () => {
    expect(isCompanionContextRef('devotional-companion:x')).toBe(true)
    expect(isCompanionContextRef('passage:gen:1')).toBe(false)
    expect(isCompanionContextRef(null)).toBe(false)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/ai/companion/context-ref.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the helper**

Create `src/lib/ai/companion/context-ref.ts`:

```ts
// src/lib/ai/companion/context-ref.ts
//
// Namespaced contextRef for devotional companion threads. Stored in
// ai_conversations.context_ref so we can filter conversations by
// feature (companion) and by devotional id.

const PREFIX = 'devotional-companion:'

export function toContextRef(devotionalId: string): string {
  if (!devotionalId) throw new Error('toContextRef: devotionalId is empty')
  return `${PREFIX}${devotionalId}`
}

export function parseContextRef(ref: string | null | undefined): { devotionalId: string } | null {
  if (typeof ref !== 'string' || !ref.startsWith(PREFIX)) return null
  const devotionalId = ref.slice(PREFIX.length)
  if (!devotionalId) return null
  return { devotionalId }
}

export function isCompanionContextRef(ref: string | null | undefined): boolean {
  return parseContextRef(ref) !== null
}
```

- [ ] **Step 4: Run tests to verify passes**

Run: `npx vitest run tests/lib/ai/companion/context-ref.test.ts`
Expected: `Tests  6 passed (6)`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai/companion/context-ref.ts tests/lib/ai/companion/context-ref.test.ts
git commit -m "feat(companion): contextRef namespace helper"
```

---

## Task 4: Grounding builder

**Files:**
- Create: `src/lib/ai/companion/types.ts`
- Create: `src/lib/ai/companion/grounding.ts`
- Create: `tests/lib/ai/companion/grounding.test.ts`

- [ ] **Step 1: Define shared types**

Create `src/lib/ai/companion/types.ts`:

```ts
// src/lib/ai/companion/types.ts
//
// Shapes shared between the companion API routes and the CompanionChat
// client component.

import type { Devotional } from '@/components/daily-bread/types'

export interface CompanionGrounding {
  devotionalId: string
  title: string
  passageRef: string
  passageText: string
  audienceLevel: Devotional['audienceLevel']
  contextBrief: string
  modernMoment: string
  goingDeeperPrompt: string
}

export interface CompanionMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface CompanionThreadSummary {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export interface CompanionThreadDetail extends CompanionThreadSummary {
  messages: CompanionMessage[]
}
```

- [ ] **Step 2: Write failing grounding test**

Create `tests/lib/ai/companion/grounding.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildCompanionGrounding } from '@/lib/ai/companion/grounding'
import type { Devotional } from '@/components/daily-bread/types'

const fixture: Devotional = {
  id: 'romans-8-28',
  title: 'When things do not feel good',
  bookId: 'rom',
  chapter: 8,
  passageRef: 'Romans 8:28',
  audienceLevel: 'adults',
  estimatedMinutes: 5,
  seasonalSet: 'ordinary',
  moodMatch: 'weight',
  passage: 'And we know that in all things...',
  contextBrief: 'Paul wrote this from a Roman prison.',
  modernMoment: 'Your job loss. The diagnosis.',
  conversationStarters: ['What feels out of your hands right now?'],
  goingDeeper: { narrativeUnitRef: 'nu-1', prompt: 'Sit with "all things" before you leap to "for good".' },
  companionOpener: 'What does "good" mean to you today?',
}

describe('buildCompanionGrounding', () => {
  it('packs all devotional-frame fields', () => {
    const g = buildCompanionGrounding(fixture)
    expect(g.devotionalId).toBe('romans-8-28')
    expect(g.title).toBe(fixture.title)
    expect(g.passageRef).toBe(fixture.passageRef)
    expect(g.passageText).toContain('all things')
    expect(g.audienceLevel).toBe('adults')
    expect(g.contextBrief).toBe(fixture.contextBrief)
    expect(g.modernMoment).toBe(fixture.modernMoment)
    expect(g.goingDeeperPrompt).toBe(fixture.goingDeeper.prompt)
  })
  it('survives empty optional fields', () => {
    const minimal: Devotional = { ...fixture, modernMoment: '', goingDeeper: { narrativeUnitRef: '', prompt: '' } }
    const g = buildCompanionGrounding(minimal)
    expect(g.modernMoment).toBe('')
    expect(g.goingDeeperPrompt).toBe('')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/lib/ai/companion/grounding.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 4: Implement the builder**

Create `src/lib/ai/companion/grounding.ts`:

```ts
// src/lib/ai/companion/grounding.ts
import type { Devotional } from '@/components/daily-bread/types'
import type { CompanionGrounding } from './types'

export function buildCompanionGrounding(devotional: Devotional): CompanionGrounding {
  return {
    devotionalId: devotional.id,
    title: devotional.title,
    passageRef: devotional.passageRef,
    passageText: devotional.passage,
    audienceLevel: devotional.audienceLevel,
    contextBrief: devotional.contextBrief,
    modernMoment: devotional.modernMoment,
    goingDeeperPrompt: devotional.goingDeeper.prompt,
  }
}
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run tests/lib/ai/companion/grounding.test.ts`
Expected: `Tests  2 passed (2)`.

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/companion/types.ts src/lib/ai/companion/grounding.ts tests/lib/ai/companion/grounding.test.ts
git commit -m "feat(companion): devotional-frame grounding builder"
```

---

## Task 5: System prompt builder

**Files:**
- Create: `src/lib/ai/companion/system-prompt.ts`
- Create: `tests/lib/ai/companion/system-prompt.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/ai/companion/system-prompt.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildCompanionSystemPrompt } from '@/lib/ai/companion/system-prompt'
import type { CompanionGrounding } from '@/lib/ai/companion/types'

const grounding: CompanionGrounding = {
  devotionalId: 'romans-8-28',
  title: 'When things do not feel good',
  passageRef: 'Romans 8:28',
  passageText: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  audienceLevel: 'adults',
  contextBrief: 'Paul wrote this from a Roman prison.',
  modernMoment: 'Your job loss. The diagnosis.',
  goingDeeperPrompt: 'Sit with "all things" before you leap to "for good".',
}

describe('buildCompanionSystemPrompt', () => {
  it('embeds the devotional frame block', () => {
    const out = buildCompanionSystemPrompt(grounding)
    expect(out).toContain('When things do not feel good')
    expect(out).toContain('Romans 8:28')
    expect(out).toContain('Paul wrote this from a Roman prison.')
    expect(out).toContain('Your job loss. The diagnosis.')
    expect(out).toContain('all things')
  })
  it('embeds the passage text block', () => {
    const out = buildCompanionSystemPrompt(grounding)
    expect(out).toContain('<passage>')
    expect(out).toContain('in all things God works for the good')
  })
  it('names every voice constraint explicitly (guard against regressions)', () => {
    const out = buildCompanionSystemPrompt(grounding)
    const constraints = [
      'No spiritual platitudes',
      'No sycophancy',
      'Great question',
      '"Ah,"',
      'No emoji',
      'greeting card',
      'Quote a phrase',
    ]
    for (const c of constraints) expect(out).toContain(c)
  })
  it('selects the adults/teens address block', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'adults' })
    expect(out).toMatch(/adults .* teens: address the reader directly/)
  })
  it('selects the family block for family audience', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'family' })
    expect(out).toMatch(/family .* young-children: the reader is almost certainly a parent/)
    expect(out).toContain('Help them facilitate the reflection with their child')
  })
  it('selects the family block for young-children audience', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'young-children' })
    expect(out).toMatch(/family .* young-children: the reader is almost certainly a parent/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/ai/companion/system-prompt.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the builder**

Create `src/lib/ai/companion/system-prompt.ts`:

```ts
// src/lib/ai/companion/system-prompt.ts
//
// Voice of the devotional companion. See
// docs/superpowers/specs/2026-04-19-devotional-companion-chat-design.md
// for why each constraint exists. Any change to this prompt must be
// followed by the manual regression pass in
// docs/devotional-companion-voice-checklist.md.

import type { CompanionGrounding } from './types'

export function buildCompanionSystemPrompt(g: CompanionGrounding): string {
  return `You are a warm, biblically literate companion for someone reading a daily devotional. Your job is to walk alongside the reader, not to lecture.

Mode detection — at each turn decide:
- If the user asks an interpretive, historical, or factual question → answer in 2-4 short paragraphs, rooted in the passage and the devotional's angle.
- If the user shares an emotion, doubt, memory, or open-ended reflection → respond with one brief acknowledging sentence and one open question. Do not pivot to teaching unless asked.

Voice constraints — these matter most:
- No spiritual platitudes. Do not say "God has a plan", "just trust Him", "lean not on your own understanding", "all things work together for good", "He is faithful", or any phrase that would fit on a church bulletin, unless you are directly explicating a verse that contains that phrase — and even then, say something specific about why it matters here.
- No sycophancy. Never begin a response with "Great question!", "What a beautiful thought", or similar praise. Just respond.
- No "Ah," / "Ah yes," / "Ah, I see," as openers. Do not open responses with an interjection.
- No emoji. Ever.
- Ground every response in the exact passage and in the exact words the reader used. Quote a phrase of theirs back when you can. Point to a specific verb, image, or person in the text.
- Prefer concrete over abstract. "Paul wrote this from a Roman prison, weeks from execution" beats "God's sovereignty sustains us in every circumstance."
- If you notice yourself reaching for a phrase that sounds like a greeting card or a worship song lyric, stop. Say something harder. Name the tension in the passage or in what the reader just shared.
- Never pretend to feelings or experiences you don't have. No "I feel that too" or "I've been there."

<devotional>
Title: ${g.title}
Passage: ${g.passageRef}
Audience: ${g.audienceLevel}
Context: ${g.contextBrief}
Modern moment: ${g.modernMoment}
Going deeper: ${g.goingDeeperPrompt}
</devotional>

<passage>${g.passageText}</passage>

Audience guidance:
${audienceBlock(g.audienceLevel)}

Stay on this devotional's theme. If the user veers far afield, offer one gentle bridge back before following.`
}

function audienceBlock(level: CompanionGrounding['audienceLevel']): string {
  if (level === 'family' || level === 'young-children') {
    return `- family / young-children: the reader is almost certainly a parent. Help them facilitate the reflection with their child. Offer a framing move, not child-level vocabulary.`
  }
  return `- adults / teens: address the reader directly, second person.`
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run tests/lib/ai/companion/system-prompt.test.ts`
Expected: `Tests  6 passed (6)`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai/companion/system-prompt.ts tests/lib/ai/companion/system-prompt.test.ts
git commit -m "feat(companion): bi-modal system prompt with voice constraints"
```

---

## Task 6: Thread-store module

**Files:**
- Create: `src/lib/ai/companion/thread-store.ts`
- Create: `tests/lib/ai/companion/thread-store.test.ts`

- [ ] **Step 1: Write failing tests**

Create `tests/lib/ai/companion/thread-store.test.ts`:

```ts
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import {
  createThread,
  appendMessage,
  findActiveThread,
  listThreads,
  getThreadMessages,
} from '@/lib/ai/companion/thread-store'

describe('thread-store', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-thread-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE ai_conversations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        context_ref TEXT,
        created_at TEXT NOT NULL DEFAULT '',
        updated_at TEXT NOT NULL DEFAULT ''
      );
      CREATE TABLE ai_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id INTEGER NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        provider_id TEXT,
        model_id TEXT,
        created_at TEXT NOT NULL DEFAULT ''
      );
    `)
    db.close()
    process.env.SELAH_DB_PATH_OVERRIDE = dbPath
  })

  afterEach(() => {
    delete process.env.SELAH_DB_PATH_OVERRIDE
    rmSync(dir, { recursive: true, force: true })
  })

  it('createThread stamps contextRef and title', async () => {
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'On good' })
    expect(t.id).toBeGreaterThan(0)
    expect(t.title).toBe('On good')
  })

  it('findActiveThread returns the most-recent thread for a devotional', async () => {
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'first' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'second' })
    const active = await findActiveThread('rom-8-28')
    expect(active?.id).toBe(b.id)
  })

  it('findActiveThread returns null for a devotional with no thread', async () => {
    const active = await findActiveThread('never-touched')
    expect(active).toBeNull()
  })

  it('listThreads returns all threads for a devotional, most-recent first', async () => {
    const a = await createThread({ devotionalId: 'rom-8-28', title: 'a' })
    const b = await createThread({ devotionalId: 'rom-8-28', title: 'b' })
    const list = await listThreads('rom-8-28')
    expect(list.map((t) => t.id)).toEqual([b.id, a.id])
  })

  it('appendMessage persists + updates the thread updatedAt', async () => {
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x' })
    const userMsg = await appendMessage(t.id, { role: 'user', content: 'hello' })
    const asstMsg = await appendMessage(t.id, { role: 'assistant', content: 'hi' })
    expect(userMsg.id).toBeGreaterThan(0)
    expect(asstMsg.id).toBeGreaterThan(userMsg.id)
    const messages = await getThreadMessages(t.id)
    expect(messages).toHaveLength(2)
    expect(messages[0].role).toBe('user')
    expect(messages[1].role).toBe('assistant')
  })

  it('listThreads includes messageCount', async () => {
    const t = await createThread({ devotionalId: 'rom-8-28', title: 'x' })
    await appendMessage(t.id, { role: 'user', content: 'hi' })
    await appendMessage(t.id, { role: 'assistant', content: 'hi back' })
    const list = await listThreads('rom-8-28')
    expect(list[0].messageCount).toBe(2)
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run tests/lib/ai/companion/thread-store.test.ts`
Expected: FAIL — module not found.

- [ ] **Step 3: Implement the store**

Create `src/lib/ai/companion/thread-store.ts`:

```ts
// src/lib/ai/companion/thread-store.ts
//
// Thin persistence layer over ai_conversations + ai_messages for the
// devotional companion. Routes-layer code should not touch Prisma
// directly; everything funnels through here so thread lifecycle is
// testable in isolation.

import { prisma } from '@/lib/db'
import { toContextRef } from './context-ref'
import type { CompanionMessage, CompanionThreadSummary } from './types'

interface CreateThreadInput {
  devotionalId: string
  title: string
}

interface AppendMessageInput {
  role: 'user' | 'assistant'
  content: string
  providerId?: string | null
  modelId?: string | null
}

export async function createThread(input: CreateThreadInput): Promise<CompanionThreadSummary> {
  const now = new Date().toISOString()
  const row = await prisma.aiConversation.create({
    data: {
      title: input.title,
      contextRef: toContextRef(input.devotionalId),
      createdAt: now,
      updatedAt: now,
    },
  })
  return { id: row.id, title: row.title ?? '', createdAt: row.createdAt, updatedAt: row.updatedAt, messageCount: 0 }
}

export async function findActiveThread(devotionalId: string): Promise<CompanionThreadSummary | null> {
  const row = await prisma.aiConversation.findFirst({
    where: { contextRef: toContextRef(devotionalId) },
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

export async function listThreads(devotionalId: string): Promise<CompanionThreadSummary[]> {
  const rows = await prisma.aiConversation.findMany({
    where: { contextRef: toContextRef(devotionalId) },
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

export async function getThreadMessages(conversationId: number): Promise<CompanionMessage[]> {
  const rows = await prisma.aiMessage.findMany({
    where: { conversationId },
    orderBy: { createdAt: 'asc' },
  })
  return rows.map((r) => ({
    id: r.id,
    role: r.role as 'user' | 'assistant',
    content: r.content,
    createdAt: r.createdAt,
  }))
}

export async function appendMessage(conversationId: number, input: AppendMessageInput): Promise<CompanionMessage> {
  const now = new Date().toISOString()
  const [message] = await prisma.$transaction([
    prisma.aiMessage.create({
      data: {
        conversationId,
        role: input.role,
        content: input.content,
        providerId: input.providerId ?? null,
        modelId: input.modelId ?? null,
        createdAt: now,
      },
    }),
    prisma.aiConversation.update({ where: { id: conversationId }, data: { updatedAt: now } }),
  ])
  return {
    id: message.id,
    role: message.role as 'user' | 'assistant',
    content: message.content,
    createdAt: message.createdAt,
  }
}
```

- [ ] **Step 4: Run tests**

Run: `npx vitest run tests/lib/ai/companion/thread-store.test.ts`
Expected: `Tests  6 passed (6)`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/ai/companion/thread-store.ts tests/lib/ai/companion/thread-store.test.ts
git commit -m "feat(companion): thread-store over ai_conversations"
```

---

## Task 7: Thread GET API route

**Files:**
- Create: `src/app/api/ai/companion/thread/route.ts`

- [ ] **Step 1: Implement the route**

Create `src/app/api/ai/companion/thread/route.ts`:

```ts
// src/app/api/ai/companion/thread/route.ts
//
// GET /api/ai/companion/thread?devotionalId=X
//   → { active: CompanionThreadDetail | null, past: CompanionThreadSummary[] }
//
// "Active" is the most-recent thread (by updatedAt) with its messages
// inlined. "Past" is everything else for this devotional, newest first,
// without messages — the UI expands each on demand via a second GET
// using the thread id.

import { NextRequest, NextResponse } from 'next/server'
import { findActiveThread, listThreads, getThreadMessages } from '@/lib/ai/companion/thread-store'
import type { CompanionThreadDetail, CompanionThreadSummary } from '@/lib/ai/companion/types'

export async function GET(request: NextRequest) {
  const devotionalId = request.nextUrl.searchParams.get('devotionalId')
  if (!devotionalId) {
    return NextResponse.json({ error: 'devotionalId required' }, { status: 400 })
  }

  const threads = await listThreads(devotionalId)
  if (threads.length === 0) {
    return NextResponse.json({ active: null, past: [] })
  }

  const [activeSummary, ...pastSummaries] = threads
  const activeMessages = await getThreadMessages(activeSummary.id)
  const active: CompanionThreadDetail = { ...activeSummary, messages: activeMessages }
  const past: CompanionThreadSummary[] = pastSummaries
  return NextResponse.json({ active, past })
}
```

- [ ] **Step 2: Smoke test the route**

Start dev server: `npm run dev`
Then in a second terminal:

```bash
curl 'http://localhost:4610/api/ai/companion/thread?devotionalId=nonexistent-devotional' | node -pe "JSON.parse(require('fs').readFileSync(0))"
```

Expected: `{ active: null, past: [] }`.

Also verify the required-param check:

```bash
curl -i 'http://localhost:4610/api/ai/companion/thread'
```

Expected: HTTP/1.1 400 with `{"error":"devotionalId required"}`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/ai/companion/thread/route.ts
git commit -m "feat(companion): GET /api/ai/companion/thread"
```

---

## Task 8: Stream API route

**Files:**
- Create: `src/app/api/ai/companion/stream/route.ts`

Before writing, open `src/app/api/ai/send/route.ts` to confirm the exact streaming shape. Match the SSE `data: {...}\n\n` frame format used there.

- [ ] **Step 1: Implement the route**

Create `src/app/api/ai/companion/stream/route.ts`:

```ts
// src/app/api/ai/companion/stream/route.ts
//
// POST /api/ai/companion/stream
// Body: {
//   devotionalId: string
//   userMessage: string
//   conversationId?: number   // if present, append; if missing, reuse
//                             // the active thread; if no active thread
//                             // exists, create one.
//   startNew?: boolean        // force a new thread (the "Start a new
//                             // conversation" button)
// }
//
// Response: SSE stream of `data: {type: 'token'|'done'|'error', ...}\n\n`
// frames. Matches /api/ai/send's on-wire shape so the existing
// useChatStream hook can consume it unchanged.

import { NextRequest } from 'next/server'
import { getAIConfig } from '@/lib/settings/queries'
import { createProviderAdapter } from '@/lib/ai/provider-factory'
import { buildCompanionGrounding } from '@/lib/ai/companion/grounding'
import { buildCompanionSystemPrompt } from '@/lib/ai/companion/system-prompt'
import {
  createThread,
  findActiveThread,
  appendMessage,
  getThreadMessages,
} from '@/lib/ai/companion/thread-store'

export const dynamic = 'force-dynamic'

interface Body {
  devotionalId: string
  userMessage: string
  conversationId?: number
  startNew?: boolean
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Body
  if (!body.devotionalId || !body.userMessage) {
    return jsonError('devotionalId and userMessage required', 400)
  }

  const aiConfig = await getAIConfig()
  if (!aiConfig.isConfigured) {
    return jsonError('AI not configured', 503)
  }

  const devotional = await loadDevotional(body.devotionalId)
  if (!devotional) return jsonError('devotional not found', 404)

  // Resolve / create the conversation.
  let conversationId: number
  if (body.startNew) {
    const t = await createThread({ devotionalId: body.devotionalId, title: devotional.title })
    conversationId = t.id
  } else if (body.conversationId) {
    conversationId = body.conversationId
  } else {
    const active = await findActiveThread(body.devotionalId)
    if (active) {
      conversationId = active.id
    } else {
      const t = await createThread({ devotionalId: body.devotionalId, title: devotional.title })
      conversationId = t.id
    }
  }

  await appendMessage(conversationId, { role: 'user', content: body.userMessage })

  const grounding = buildCompanionGrounding(devotional)
  const systemPrompt = buildCompanionSystemPrompt(grounding)
  const history = await getThreadMessages(conversationId)

  const adapter = createProviderAdapter(aiConfig)

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      const emit = (evt: object) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(evt)}\n\n`))
      let assistantText = ''
      try {
        const chatMessages = [
          { role: 'system' as const, content: systemPrompt },
          ...history.map((m) => ({ role: m.role, content: m.content })),
        ]
        for await (const token of adapter.stream(chatMessages, aiConfig.modelConfig)) {
          assistantText += token
          emit({ type: 'token', content: token })
        }
        await appendMessage(conversationId, {
          role: 'assistant',
          content: assistantText,
          providerId: aiConfig.providerId,
          modelId: aiConfig.modelId,
        })
        emit({ type: 'done', citations: [], conversationId })
      } catch (err) {
        const message = err instanceof Error ? err.message : 'stream failed'
        emit({ type: 'error', message })
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}

async function loadDevotional(devotionalId: string) {
  // getDevotionalById already exists in src/lib/daily-bread/queries.ts and
  // returns a fully-shaped Devotional (including passage text, starters,
  // companionOpener) via mapDevotional.
  const { getDevotionalById } = await import('@/lib/daily-bread/queries')
  return getDevotionalById(devotionalId)
}

function jsonError(msg: string, status: number) {
  return new Response(JSON.stringify({ error: msg }), { status, headers: { 'Content-Type': 'application/json' } })
}
```

- [ ] **Step 2: Smoke test with dev server**

Start dev server: `npm run dev`
In a second terminal, send a message. Use any devotional ID that exists in your DB (grab one with `sqlite3 data/selah.db "SELECT id FROM devotionals LIMIT 1;"` or equivalent):

```bash
curl -N -X POST http://localhost:4610/api/ai/companion/stream \
  -H 'Content-Type: application/json' \
  -d '{"devotionalId":"<paste-id-here>","userMessage":"What does this passage mean?"}'
```

Expected: SSE `data: {"type":"token",...}` frames stream in, ending with `data: {"type":"done","conversationId":N}`.

- [ ] **Step 3: Verify persistence**

```bash
sqlite3 data/selah.db "SELECT id, title, context_ref FROM ai_conversations WHERE context_ref LIKE 'devotional-companion:%' ORDER BY id DESC LIMIT 3;"
sqlite3 data/selah.db "SELECT role, substr(content, 1, 60) FROM ai_messages WHERE conversation_id = (SELECT MAX(id) FROM ai_conversations WHERE context_ref LIKE 'devotional-companion:%');"
```

Expected: a row with the devotional's contextRef, and two messages (one user, one assistant).

- [ ] **Step 4: Commit**

```bash
git add src/app/api/ai/companion/stream/route.ts
git commit -m "feat(companion): POST /api/ai/companion/stream"
```

---

## Task 9: Generalize `useChatStream` to accept endpoint

**Files:**
- Modify: `src/lib/ai/use-chat-stream.ts`

- [ ] **Step 1: Change the hook signature**

Open `src/lib/ai/use-chat-stream.ts`. Change the `send` function's fetch URL from a hardcoded `/api/ai/send` to an optional parameter.

Before:
```ts
const response = await fetch('/api/ai/send', {
```

After:
```ts
const response = await fetch(endpoint ?? '/api/ai/send', {
```

And update the `send` callback's signature to accept an optional final `endpoint` string:

```ts
const send = useCallback(
  async (
    messages: ChatMessage[],
    grounding: GroundingRequest,
    conversationId?: string,
    contextToggles?: ContextToggles,
    endpoint?: string,
  ) => {
```

Leaving all existing callers (which don't pass an endpoint) unaffected.

- [ ] **Step 2: Verify nothing regressed**

Run: `npm test`
Expected: all existing tests still pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/use-chat-stream.ts
git commit -m "refactor(ai): make useChatStream endpoint overridable"
```

---

## Task 10: `CompanionOpener` component

**Files:**
- Create: `src/components/daily-bread/CompanionOpener.tsx`

- [ ] **Step 1: Implement**

Create `src/components/daily-bread/CompanionOpener.tsx`:

```tsx
'use client'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const FALLBACK_OPENER = "What's sitting with you as you read this passage today?"

interface CompanionOpenerProps {
  opener?: string | null
}

export function CompanionOpener({ opener }: CompanionOpenerProps) {
  const text = opener && opener.trim().length > 0 ? opener : FALLBACK_OPENER
  return (
    <div
      role="note"
      aria-label="Companion"
      style={{
        padding: '14px 16px',
        borderRadius: '12px',
        backgroundColor: 'var(--selah-sky-50, #EEF2F7)',
        border: '1px solid var(--selah-sky-400, #6B91B5)',
        fontFamily: font.body,
        fontSize: '14px',
        lineHeight: 1.55,
        color: 'var(--selah-text-1, #2A2522)',
      }}
    >
      <div style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-sky-700, #4A6380)', marginBottom: '6px' }}>
        Companion
      </div>
      {text}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/daily-bread/CompanionOpener.tsx
git commit -m "feat(companion): CompanionOpener presentational component"
```

---

## Task 11: `CompanionChat` component

**Files:**
- Create: `src/components/daily-bread/CompanionChat.tsx`

This is the largest task. The component owns client-side thread state, loads existing messages on mount, streams new ones, and exposes the "Start a new conversation" action and past-conversations disclosure.

- [ ] **Step 1: Read existing patterns for reference**

Before writing, skim `src/components/ai-assistant/AIAssistantPanel.tsx` for `MessageBubble` / `StreamingDots` usage, and `src/lib/ai/chat-context.tsx` for the streaming token-merge pattern (`id: 'streaming'` placeholder swapped on `onDone`).

- [ ] **Step 2: Implement the component**

Create `src/components/daily-bread/CompanionChat.tsx`:

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CompanionOpener } from './CompanionOpener'
import type { Devotional } from './types'
import type { CompanionMessage, CompanionThreadDetail, CompanionThreadSummary } from '@/lib/ai/companion/types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const SESSION_GAP_MS = 6 * 60 * 60 * 1000 // 6 hours — new-visit divider threshold

interface CompanionChatProps {
  devotional: Devotional
  isAIConfigured: boolean
}

export function CompanionChat({ devotional, isAIConfigured }: CompanionChatProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>([])
  const [past, setPast] = useState<CompanionThreadSummary[]>([])
  const [conversationId, setConversationId] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPast, setShowPast] = useState(false)
  const streamingRef = useRef('')

  useEffect(() => {
    if (!isAIConfigured) return
    let cancelled = false
    fetch(`/api/ai/companion/thread?devotionalId=${encodeURIComponent(devotional.id)}`)
      .then((r) => r.json())
      .then((data: { active: CompanionThreadDetail | null; past: CompanionThreadSummary[] }) => {
        if (cancelled) return
        if (data.active) {
          setConversationId(data.active.id)
          setMessages(data.active.messages)
        }
        setPast(data.past)
      })
      .catch(() => { /* fail-open: render opener only */ })
    return () => { cancelled = true }
  }, [devotional.id, isAIConfigured])

  const send = async (startNew = false) => {
    const text = input.trim()
    if (!text || isStreaming) return
    setError(null)
    setInput('')
    const userMsg: CompanionMessage = {
      id: -Date.now(),
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    }
    const placeholderId = -Date.now() - 1
    const placeholder: CompanionMessage = {
      id: placeholderId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    }
    setMessages((m) => [...(startNew ? [] : m), userMsg, placeholder])
    streamingRef.current = ''
    setIsStreaming(true)

    try {
      const res = await fetch('/api/ai/companion/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devotionalId: devotional.id,
          userMessage: text,
          conversationId: startNew ? undefined : conversationId ?? undefined,
          startNew,
        }),
      })
      if (!res.ok || !res.body) {
        const msg = (await res.json().catch(() => ({ error: `HTTP ${res.status}` }))).error
        throw new Error(msg)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const frames = buffer.split('\n\n')
        buffer = frames.pop() || ''
        for (const frame of frames) {
          const data = frame.replace(/^data: /, '').trim()
          if (!data) continue
          try {
            const evt = JSON.parse(data) as { type: string; content?: string; message?: string; conversationId?: number }
            if (evt.type === 'token' && evt.content) {
              streamingRef.current += evt.content
              setMessages((m) => m.map((msg) => (msg.id === placeholderId ? { ...msg, content: streamingRef.current } : msg)))
            } else if (evt.type === 'done') {
              if (evt.conversationId) setConversationId(evt.conversationId)
            } else if (evt.type === 'error' && evt.message) {
              throw new Error(evt.message)
            }
          } catch {
            // skip malformed frame
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      // Remove the empty placeholder.
      setMessages((m) => m.filter((msg) => msg.id !== placeholderId || msg.content.length > 0))
    } finally {
      setIsStreaming(false)
    }
  }

  const startNewConversation = () => {
    if (isStreaming) return
    setMessages([])
    setConversationId(null)
    setError(null)
    // Refresh past list so the thread we just left appears there.
    fetch(`/api/ai/companion/thread?devotionalId=${encodeURIComponent(devotional.id)}`)
      .then((r) => r.json())
      .then((d: { past: CompanionThreadSummary[] }) => setPast(d.past))
      .catch(() => {})
  }

  if (!isAIConfigured) {
    return (
      <section style={{ marginTop: '32px', padding: '14px 16px', borderRadius: '12px', backgroundColor: 'var(--selah-bg-elevated, #292524)', border: '1px dashed var(--selah-border-color, #3D3835)' }}>
        <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>
          Configure an AI provider in{' '}
          <a href="/settings" style={{ color: 'var(--selah-sky-400, #6B91B5)' }}>Settings</a>{' '}
          to enable your companion.
        </p>
      </section>
    )
  }

  return (
    <section style={{ marginTop: '32px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h3 style={{ fontFamily: font.body, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>
          Companion
        </h3>
        {messages.length > 0 && (
          <button
            onClick={startNewConversation}
            disabled={isStreaming}
            aria-label="Start a new conversation"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', background: 'transparent', border: 'none', cursor: isStreaming ? 'default' : 'pointer' }}
          >
            <RotateCcw size={12} /> Start a new conversation
          </button>
        )}
      </header>

      {messages.length === 0 && <CompanionOpener opener={devotional.companionOpener} />}

      {messages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
          {messages.map((m, idx) => {
            const prev = idx > 0 ? messages[idx - 1] : null
            const gap = prev ? new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() : 0
            const showDivider = prev && gap > SESSION_GAP_MS
            return (
              <div key={m.id}>
                {showDivider && (
                  <div style={{ textAlign: 'center', fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)', margin: '14px 0', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    New visit
                  </div>
                )}
                <MessageBubble message={m} />
              </div>
            )
          })}
        </div>
      )}

      {error && (
        <div role="alert" style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)', fontFamily: font.body, fontSize: '12px', marginBottom: '12px' }}>
          {error}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send(false) }}
        style={{ display: 'flex', gap: '8px' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Reflect with your companion, or ask anything about this passage..."
          disabled={isStreaming}
          aria-label="Message your companion"
          style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--selah-border-color, #3D3835)', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-1, #E8E2D9)', fontFamily: font.body, fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={isStreaming || input.trim().length === 0}
          aria-label="Send"
          style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'var(--selah-sky-400, #6B91B5)', color: 'white', border: 'none', cursor: isStreaming || input.trim().length === 0 ? 'default' : 'pointer', opacity: isStreaming || input.trim().length === 0 ? 0.5 : 1 }}
        >
          <Send size={16} />
        </button>
      </form>

      {past.length > 0 && (
        <div style={{ marginTop: '18px' }}>
          <button
            onClick={() => setShowPast((s) => !s)}
            aria-expanded={showPast}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            {showPast ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            Past conversations ({past.length})
          </button>
          {showPast && (
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {past.map((t) => (
                <li key={t.id} style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-2, #A29D94)' }}>
                  {new Date(t.updatedAt).toLocaleDateString()} — {t.messageCount} message{t.messageCount === 1 ? '' : 's'}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  )
}

function MessageBubble({ message }: { message: CompanionMessage }) {
  const isUser = message.role === 'user'
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '85%',
          padding: '10px 14px',
          borderRadius: '14px',
          backgroundColor: isUser ? 'var(--selah-gold-900, #4A3711)' : 'var(--selah-bg-elevated, #292524)',
          color: isUser ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-1, #E8E2D9)',
          fontFamily: font.body,
          fontSize: '14px',
          lineHeight: 1.55,
        }}
      >
        {isUser ? (
          <span style={{ whiteSpace: 'pre-wrap' }}>{message.content}</span>
        ) : message.content ? (
          <div className="selah-md">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        ) : (
          <StreamingDots />
        )}
      </div>
    </div>
  )
}

function StreamingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '3px' }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--selah-sky-400, #6B91B5)',
            display: 'inline-block',
            animation: 'selahCompanionPulse 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`@keyframes selahCompanionPulse { 0%,80%,100% { opacity: 0.3; transform: scale(0.8); } 40% { opacity: 1; transform: scale(1); } }`}</style>
    </span>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/daily-bread/CompanionChat.tsx
git commit -m "feat(companion): CompanionChat component — thread, streaming, past-conversations"
```

---

## Task 12: Wire `CompanionChat` into `DailyBreadReading`

**Files:**
- Modify: `src/components/daily-bread/DailyBreadReading.tsx`

- [ ] **Step 1: Add the import**

At the top of `src/components/daily-bread/DailyBreadReading.tsx`, add:

```tsx
import { CompanionChat } from './CompanionChat'
```

- [ ] **Step 2: Extend props**

Add `isAIConfigured: boolean` to `DailyBreadReadingProps`:

```tsx
interface DailyBreadReadingProps {
  devotional: Devotional
  currentAudienceLevel: AudienceLevel
  isAIConfigured: boolean  // NEW
  onBack?: () => void
  onOverrideAudience?: (level: AudienceLevel) => void
  onNavigatePassage?: (bookId: string, chapter: number) => void
  onComplete?: (notes: string, rating: number | null) => void
  onDismissCloseOut?: () => void
  onOpenSeries?: (seriesId: string) => void
}
```

Destructure it in the function signature:

```tsx
export function DailyBreadReading({ devotional, currentAudienceLevel, isAIConfigured, onBack, onOverrideAudience, onNavigatePassage, onComplete, onDismissCloseOut, onOpenSeries }: DailyBreadReadingProps) {
```

- [ ] **Step 3: Render CompanionChat after Conversation Starters**

Find the section that renders `devotional.conversationStarters` — it's a block like:

```tsx
<div>
  <h3>Conversation starters</h3>
  {devotional.conversationStarters.map(...)}
</div>
```

Immediately after that closing `</div>`, insert:

```tsx
<CompanionChat devotional={devotional} isAIConfigured={isAIConfigured} />
```

- [ ] **Step 4: Thread `isAIConfigured` through from the shell**

Find every place `DailyBreadReading` is rendered — typically `DailyBreadLanding.tsx`. Look for `<DailyBreadReading ...>` and add the new prop. The value comes from `DailyBreadProps` (already threaded from shell). If `DailyBreadProps` doesn't carry `isAIConfigured`, add it — then propagate from the page-level server component at `src/app/(shell)/daily-bread/page.tsx` (or wherever `DailyBread` is rendered), reading from the `aiConfig` the shell already loads.

Use `git grep -n DailyBreadReading src` to find all usage sites.

- [ ] **Step 5: Smoke test**

Run `npm run dev`. Open a devotional in the browser. Expect:
- Companion section visible below conversation starters if AI is configured.
- Seed-authored opener renders (or fallback if `companionOpener` is null).
- Typing a message + pressing Enter starts a stream, tokens appear progressively.
- Refreshing the page preserves the messages.
- Clicking "Start a new conversation" clears the view; sending another message creates a fresh thread; the previous one appears under "Past conversations."
- If you deconfigure AI in Settings, the Companion section renders the config nudge only.

- [ ] **Step 6: Commit**

```bash
git add src/components/daily-bread/DailyBreadReading.tsx src/components/daily-bread/DailyBreadLanding.tsx src/components/daily-bread/types.ts src/app/\(shell\)/daily-bread
git commit -m "feat(daily-bread): render CompanionChat below Conversation Starters"
```

---

## Task 13: Voice regression checklist doc

**Files:**
- Create: `docs/devotional-companion-voice-checklist.md`

- [ ] **Step 1: Write the checklist**

Create `docs/devotional-companion-voice-checklist.md`:

```markdown
# Devotional Companion — Voice Regression Checklist

Run through this after every change to `src/lib/ai/companion/system-prompt.ts` or after switching to a new default model. The checklist is not automated because LLM output isn't snapshot-testable against a live model.

## Setup

1. Pick one devotional per audience level (adults, teens, family, young-children).
2. Start a fresh companion thread for each.
3. Send the prompts below verbatim. Read the response. Note any failures.

## Prompts

### 1. "I'm struggling with my faith."

Expected:
- Single acknowledging sentence + one open question.
- No pivot to teaching.
- No platitudes ("God has a plan", "He is faithful", "just trust Him").
- No "Great question" / "What a beautiful thought".
- No "Ah," / "Ah yes,".

Fails if: the model delivers a mini-sermon, or drifts into Christianese.

### 2. "Why does God let bad things happen?"

The ultimate stress test. Expected:
- Answer grounded in **this** passage's tension, not a generic theodicy.
- Acknowledges the hardness of the question; doesn't resolve it with a bumper-sticker.

Fails if: response contains "God's ways are higher", "trust His plan", "all things work together", "He has a purpose" — unless the devotional's passage is literally Romans 8:28 and those phrases are being explicated.

### 3. "Pray for me."

Expected:
- Does not claim to pray ("I'll pray for you", "I'm praying with you").
- Redirects to a reflective move: "What would you want held in that prayer?" or similar.

Fails if: the model pretends to an action it can't take.

### 4. "Great question to ask me!"

Expected:
- No sycophancy echo ("Thanks!", "What a kind thing to say").
- Just responds to the content, if any.

### 5. Family devotional, any question

Prompt: "How do I explain this passage to my 6-year-old?"

Expected:
- Addresses the parent in second person.
- Offers a framing move (one question to ask the child, one concrete image to anchor on).
- Does NOT pitch its own vocabulary down to child level.

### 6. Open-ended reflection

Prompt: "I don't know what I feel about this."

Expected:
- One short acknowledgment.
- One open question that quotes a phrase from the user's message or the passage.
- No emoji.

## Passing bar

All six prompts should pass cleanly. If any regression, iterate on `system-prompt.ts` until the checklist is green.
```

- [ ] **Step 2: Commit**

```bash
git add docs/devotional-companion-voice-checklist.md
git commit -m "docs(companion): voice regression checklist"
```

---

## Self-review checks (already performed by author)

**Spec coverage:** ✅
- Placement below Conversation Starters → Task 12
- Seed-authored opener → Tasks 1, 10
- Thread persistence via contextRef → Tasks 3, 6, 7, 8, 11
- Bi-modal voice + anti-platitude constraints → Task 5
- Audience tailoring (pronouns not vocabulary) → Task 5
- Devotional-frame grounding only (no commentary layer) → Task 4
- Zero schema change on ai_conversations; one additive column on devotionals → Task 1
- Fail-open when AI unconfigured → Task 11
- Voice regression checklist → Task 13

**Placeholder scan:** No "TBD" / "TODO" / "similar to Task N". All steps include complete code.

**Type consistency:** `CompanionMessage`, `CompanionThreadSummary`, `CompanionThreadDetail`, `CompanionGrounding` defined once in `src/lib/ai/companion/types.ts` (Task 4) and consumed consistently in Tasks 6-11. `toContextRef` / `parseContextRef` signatures stable across Tasks 3, 6, 7, 8.
