# AI Context Controls Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give users visible, toggleable control over which grounding sections the AI receives, with estimated token costs, plus inject user collection/study-project items as a new grounding source.

**Architecture:** The grounding system currently builds a monolithic context string server-side. We split it into named sections with metadata (label, estimated tokens, enabled flag). The client sends a `contextToggles` map alongside the existing `grounding` request. A new `ContextControls` component in the AI panel shows toggleable pills with token estimates. A new `collections` extractor fetches saved items relevant to the current page.

**Tech Stack:** Next.js App Router, React state, Prisma, existing AI grounding pipeline.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/lib/ai/types.ts` | Add `ContextSection` type and `contextToggles` to `AiSendRequest` |
| `src/lib/ai/grounding/context-builder.ts` | Return named sections instead of a flat string; apply toggles |
| `src/lib/ai/grounding/extractors/reader.ts` | Return sections array instead of concatenated string |
| `src/lib/ai/grounding/extractors/collections.ts` | **New** — fetch user's collection/study-project items relevant to current page |
| `src/lib/ai/grounding/system-prompt.ts` | Accept sections array, only describe sections that are present |
| `src/app/api/ai/send/route.ts` | Pass `contextToggles` through to `buildGroundingContext` |
| `src/app/api/ai/context-estimate/route.ts` | **New** — returns available sections + token estimates for a given page without streaming |
| `src/components/ai-assistant/ContextControls.tsx` | **New** — toggleable pills UI with token budget bar |
| `src/components/ai-assistant/AIAssistantPanel.tsx` | Mount `ContextControls` between `GroundingHeader` and messages |
| `src/lib/ai/chat-context.tsx` | Add `contextToggles` state, pass to `send()` |

---

### Task 1: Define Section Types

**Files:**
- Modify: `src/lib/ai/types.ts`

- [ ] **Step 1: Add ContextSection type and update AiSendRequest**

```typescript
// Add after the existing Citation interface (~line 65)

/** A named section of grounding context */
export interface ContextSection {
  id: string                // e.g. 'chapter-text', 'narrative', 'strongs', 'collections'
  label: string             // Human-readable: "Chapter Text", "Strong's Hebrew/Greek"
  content: string           // The actual grounding text
  estimatedTokens: number   // Math.ceil(content.length / 4)
  defaultEnabled: boolean   // Whether this section is on by default
}

/** Map of section IDs to enabled/disabled state */
export type ContextToggles = Record<string, boolean>
```

Update `AiSendRequest` to include toggles:

```typescript
export interface AiSendRequest {
  messages: ChatMessage[]
  grounding: GroundingRequest
  conversationId?: string
  contextToggles?: ContextToggles  // <-- add this
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/types.ts
git commit -m "feat(ai): add ContextSection type and toggles to AiSendRequest"
```

---

### Task 2: Refactor Reader Extractor to Return Sections

**Files:**
- Modify: `src/lib/ai/grounding/extractors/reader.ts`

The reader extractor currently returns a single concatenated string. Refactor it to return an array of `ContextSection` objects so each section can be independently toggled.

- [ ] **Step 1: Change the return type and build sections array**

Change the function signature:

```typescript
import type { ReaderContext, ContextSection } from '../../types'

export async function extractReaderContext(ctx: ReaderContext): Promise<ContextSection[]> {
```

Replace the current `parts: string[]` accumulation pattern with building individual `ContextSection` objects. Each existing `### Section` block becomes its own section:

| Current section header | Section ID | Label | Default |
|------------------------|------------|-------|---------|
| `## Passage` + Narrative Context | `narrative` | Narrative Context | on |
| Full Text (current chapter) | `chapter-text` | Chapter Text | on |
| Full Text (adjacent chapters) | `adjacent-text` | Adjacent Chapters | on |
| Characters Present | `characters` | Characters | on |
| Themes | `themes` | Themes | on |
| Key Hebrew/Greek Words | `strongs` | Strong's Hebrew/Greek | on |
| Cross-References | `cross-refs` | Cross-References | on |
| Commentary | `commentary` | Commentary | on |
| Translation Footnotes | `footnotes` | Footnotes | off |

Build each section independently:

```typescript
const sections: ContextSection[] = []

// Narrative
if (narrativeUnit) {
  const lines: string[] = []
  lines.push(`## Passage: ${bookName} ${chapter}`)
  lines.push(`\n### Narrative Context: "${narrativeUnit.title}"`)
  if (narrativeUnit.summary) lines.push(narrativeUnit.summary)
  if (narrativeUnit.significance) lines.push(`\n**Theological Significance:** ${narrativeUnit.significance}`)
  if (narrativeUnit.relationalNote) lines.push(`\n**Relational Dynamics:** ${narrativeUnit.relationalNote}`)
  if (narrativeUnit.conceptualNote) lines.push(`\n**Conceptual Background:** ${narrativeUnit.conceptualNote}`)
  if (narrativeUnit.keyQuestions) {
    try {
      const questions = JSON.parse(narrativeUnit.keyQuestions) as string[]
      lines.push(`\n**Key Questions for Study:**`)
      for (const q of questions) lines.push(`- ${q}`)
    } catch { /* skip */ }
  }
  const content = lines.join('\n')
  sections.push({ id: 'narrative', label: 'Narrative Context', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
}

// Chapter text
if (verses.length > 0) {
  const lines = [`### Full Text: ${bookName} ${chapter}`]
  for (const v of verses) lines.push(`${v.number}. ${v.text}`)
  const content = lines.join('\n')
  sections.push({ id: 'chapter-text', label: 'Chapter Text', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
}

// Adjacent chapters
if (adjacentChapters.length > 0) {
  const lines: string[] = []
  for (const adj of adjacentChapters) {
    lines.push(`### Full Text: ${bookName} ${adj.chapter}`)
    for (const v of adj.verses) lines.push(`${v.number}. ${v.text}`)
  }
  const content = lines.join('\n')
  sections.push({ id: 'adjacent-text', label: 'Adjacent Chapters', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
}

// ... same pattern for characters, themes, strongs, cross-refs, commentary, footnotes
// (Apply the same extraction logic that already exists, just wrap each in a section object)
```

Follow the exact same pattern for the remaining sections. Keep all the existing query/formatting logic intact — just wrap each block's output in a `ContextSection` with the correct `id`, `label`, `defaultEnabled`, and token estimate.

The function returns `sections` at the end instead of `parts.join('\n\n')`.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`

This will produce errors in `context-builder.ts` (expects string, gets sections). That's expected — we fix it in Task 3.

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/grounding/extractors/reader.ts
git commit -m "refactor(ai): reader extractor returns named sections instead of flat string"
```

---

### Task 3: Create Collections Extractor

**Files:**
- Create: `src/lib/ai/grounding/extractors/collections.ts`

- [ ] **Step 1: Write the collections extractor**

```typescript
import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type { ContextSection, ReaderContext } from '../../types'

/**
 * Fetch user's collection and study-project items relevant to the current page.
 * Returns a single ContextSection (or null if no items found).
 */
export async function extractCollectionContext(
  ctx: ReaderContext
): Promise<ContextSection | null> {
  const bookName = BOOK_NAMES[ctx.bookId] ?? ctx.bookId
  const chapterPrefix = `${bookName} ${ctx.chapter}:`

  // 1. Collection items matching this chapter
  const collectionItems = await prisma.userCollectionItem.findMany({
    where: { itemRef: { startsWith: chapterPrefix } },
    include: { collection: { select: { title: true } } },
    take: 20,
  })

  // 2. Study builder items matching this chapter
  const studyItems = await prisma.studyAssemblyItem.findMany({
    where: {
      entityType: 'verse',
      entityId: { startsWith: chapterPrefix },
    },
    include: { project: { select: { topic: true } } },
    take: 20,
  })

  if (collectionItems.length === 0 && studyItems.length === 0) return null

  const lines: string[] = ['### Your Saved Items']

  for (const item of collectionItems) {
    const note = item.note ? ` — "${item.note}"` : ''
    lines.push(`- **${item.itemRef}** in collection "${item.collection.title}"${note}`)
  }

  for (const item of studyItems) {
    const note = item.annotation ? ` — "${item.annotation}"` : ''
    lines.push(`- **${item.entityId}** in study "${item.project.topic}"${note}`)
  }

  const content = lines.join('\n')
  return {
    id: 'collections',
    label: 'Your Saved Items',
    content,
    estimatedTokens: Math.ceil(content.length / 4),
    defaultEnabled: false,  // off by default — user opts in
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/grounding/extractors/collections.ts
git commit -m "feat(ai): add collections extractor for user saved items"
```

---

### Task 4: Refactor Context Builder to Use Sections and Toggles

**Files:**
- Modify: `src/lib/ai/grounding/context-builder.ts`

- [ ] **Step 1: Rewrite buildGroundingContext to return sections, accept toggles**

The function now returns `ContextSection[]` and accepts an optional toggles map. The reader extractor already returns sections (Task 2). Other extractors still return strings — wrap them in a single section for now.

```typescript
import type {
  GroundingRequest,
  ReaderContext,
  CharacterContext,
  ThemeContext,
  WordStudyContext,
  StudyBuilderContext,
  ContextSection,
  ContextToggles,
} from '../types'
import { extractReaderContext } from './extractors/reader'
import { extractCharacterContext } from './extractors/character'
import { extractThemeContext } from './extractors/theme'
import { extractWordStudyContext } from './extractors/word-study'
import { extractStudyBuilderContext } from './extractors/study-builder'
import { extractCollectionContext } from './extractors/collections'
import { getCharacterNames, getThemeNames } from '../post-processing/entity-matcher'

const MAX_CONTEXT_CHARS = 90000

export async function buildGroundingContext(
  grounding: GroundingRequest,
  toggles?: ContextToggles
): Promise<{ sections: ContextSection[]; assembled: string }> {

  // 1. Get sections from current page
  let sections: ContextSection[]

  switch (grounding.page) {
    case 'reader': {
      sections = await extractReaderContext(grounding.context as ReaderContext)
      // Also fetch collection items for this page
      const collectionSection = await extractCollectionContext(grounding.context as ReaderContext)
      if (collectionSection) sections.push(collectionSection)
      break
    }
    case 'character': {
      const content = await extractCharacterContext(grounding.context as CharacterContext)
      sections = content ? [{ id: 'character', label: 'Character Profile', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'theme': {
      const content = await extractThemeContext(grounding.context as ThemeContext)
      sections = content ? [{ id: 'theme', label: 'Theme Detail', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'word-study': {
      const content = await extractWordStudyContext(grounding.context as WordStudyContext)
      sections = content ? [{ id: 'word-study', label: 'Word Study', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'study-builder': {
      const content = await extractStudyBuilderContext(grounding.context as StudyBuilderContext)
      sections = content ? [{ id: 'study-builder', label: 'Study Project', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    default:
      sections = []
  }

  // 2. Query-triggered enrichment (same logic as before, but as sections)
  const currentLength = sections.reduce((sum, s) => sum + s.content.length, 0)
  const remainingBudget = MAX_CONTEXT_CHARS - currentLength

  if (remainingBudget > 500) {
    const queryLower = grounding.query.toLowerCase()

    if (grounding.page !== 'character') {
      const charNames = await getCharacterNames()
      for (const [name, id] of charNames) {
        if (name.length >= 3 && queryLower.includes(name)) {
          const content = await extractCharacterContext({ characterId: id })
          if (content) sections.push({ id: `enrichment-char-${id}`, label: `Character: ${name}`, content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
          break
        }
      }
    }

    if (grounding.page !== 'theme') {
      const themeNames = await getThemeNames()
      for (const [name, id] of themeNames) {
        if (name.length >= 4 && queryLower.includes(name)) {
          const content = await extractThemeContext({ themeId: id })
          if (content) sections.push({ id: `enrichment-theme-${id}`, label: `Theme: ${name}`, content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
          break
        }
      }
    }
  }

  // 3. Apply toggles — if user explicitly toggled a section, respect it
  const enabledSections = sections.filter((s) => {
    if (toggles && s.id in toggles) return toggles[s.id]
    return s.defaultEnabled
  })

  // 4. Assemble within budget
  let assembled = ''
  for (const section of enabledSections) {
    if (assembled.length + section.content.length > MAX_CONTEXT_CHARS) break
    assembled += (assembled ? '\n\n---\n\n' : '') + section.content
  }

  return { sections, assembled }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`

This will produce errors in `send/route.ts` and `system-prompt.ts` since the return type changed. Expected — fixed in next steps.

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/grounding/context-builder.ts
git commit -m "refactor(ai): context builder returns sections array with toggle support"
```

---

### Task 5: Update Send Route and System Prompt

**Files:**
- Modify: `src/app/api/ai/send/route.ts`
- Modify: `src/lib/ai/grounding/system-prompt.ts`

- [ ] **Step 1: Update send route to pass toggles and use new return shape**

In `src/app/api/ai/send/route.ts`, change the grounding call:

```typescript
// Before:
const groundingContext = await buildGroundingContext(grounding)
systemPrompt = await buildSystemPrompt(groundingContext)

// After:
const { assembled: groundingContext } = await buildGroundingContext(grounding, body.contextToggles)
systemPrompt = await buildSystemPrompt(groundingContext)
```

No other changes needed — the `assembled` string is the same format as before.

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: Clean (0 errors)

- [ ] **Step 3: Commit**

```bash
git add src/app/api/ai/send/route.ts src/lib/ai/grounding/system-prompt.ts
git commit -m "feat(ai): wire context toggles through send route"
```

---

### Task 6: Add Context Estimate Endpoint

**Files:**
- Create: `src/app/api/ai/context-estimate/route.ts`

This endpoint returns the available sections and their token estimates WITHOUT streaming. The AI panel calls this when it opens (or when the page changes) to populate the toggle UI.

- [ ] **Step 1: Create the endpoint**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import type { GroundingRequest } from '@/lib/ai/types'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const grounding: GroundingRequest = await request.json()
  const { sections } = await buildGroundingContext(grounding)

  const estimate = sections.map((s) => ({
    id: s.id,
    label: s.label,
    estimatedTokens: s.estimatedTokens,
    defaultEnabled: s.defaultEnabled,
  }))

  const totalTokens = sections
    .filter((s) => s.defaultEnabled)
    .reduce((sum, s) => sum + s.estimatedTokens, 0)

  return NextResponse.json({ sections: estimate, totalTokens })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/ai/context-estimate/route.ts
git commit -m "feat(ai): add context-estimate endpoint for section metadata"
```

---

### Task 7: Build ContextControls Component

**Files:**
- Create: `src/components/ai-assistant/ContextControls.tsx`

- [ ] **Step 1: Create the component**

```typescript
'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ContextToggles, GroundingRequest } from '@/lib/ai/types'

const font = {
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

interface SectionEstimate {
  id: string
  label: string
  estimatedTokens: number
  defaultEnabled: boolean
}

interface ContextControlsProps {
  grounding: GroundingRequest
  toggles: ContextToggles
  onToggle: (sectionId: string, enabled: boolean) => void
}

function formatTokens(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}

export function ContextControls({ grounding, toggles, onToggle }: ContextControlsProps) {
  const [sections, setSections] = useState<SectionEstimate[]>([])
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/api/ai/context-estimate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grounding),
      cache: 'no-store',
    })
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSections(data.sections ?? [])
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [grounding])

  if (sections.length === 0) return null

  const enabledTokens = sections
    .filter((s) => (s.id in toggles ? toggles[s.id] : s.defaultEnabled))
    .reduce((sum, s) => sum + s.estimatedTokens, 0)

  return (
    <div style={{
      padding: expanded ? '10px 16px 8px' : '6px 16px',
      borderBottom: '1px solid var(--selah-border-color, #3D3835)',
    }}>
      <button
        onClick={() => setExpanded((e) => !e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          fontFamily: font.body,
          fontSize: '11px',
          color: 'var(--selah-text-3, #6E695F)',
        }}
      >
        <span style={{ fontSize: '9px' }}>{expanded ? '▼' : '▶'}</span>
        <span>Context</span>
        <span style={{
          marginLeft: 'auto',
          fontVariantNumeric: 'tabular-nums',
          color: 'var(--selah-sky-400, #6B91B5)',
        }}>
          ~{formatTokens(enabledTokens)} tokens
        </span>
      </button>

      {expanded && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
          {sections.map((s) => {
            const enabled = s.id in toggles ? toggles[s.id] : s.defaultEnabled
            return (
              <button
                key={s.id}
                onClick={() => onToggle(s.id, !enabled)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontFamily: font.body,
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: enabled
                    ? 'var(--selah-sky-700, #4A6380)'
                    : 'var(--selah-border-color, #3D3835)',
                  backgroundColor: enabled
                    ? 'var(--selah-sky-900, #1A3348)'
                    : 'transparent',
                  color: enabled
                    ? 'var(--selah-sky-300, #93B5D3)'
                    : 'var(--selah-text-3, #6E695F)',
                  opacity: enabled ? 1 : 0.6,
                }}
              >
                <span>{s.label}</span>
                <span style={{
                  fontSize: '9px',
                  opacity: 0.7,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {formatTokens(s.estimatedTokens)}
                </span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai-assistant/ContextControls.tsx
git commit -m "feat(ai): add ContextControls component with toggleable section pills"
```

---

### Task 8: Wire Context Controls into AI Panel and Chat Context

**Files:**
- Modify: `src/lib/ai/chat-context.tsx`
- Modify: `src/components/ai-assistant/AIAssistantPanel.tsx`
- Modify: `src/components/ai-assistant/types.ts`

- [ ] **Step 1: Add contextToggles state to ChatProvider**

In `src/lib/ai/chat-context.tsx`:

Add to `ChatContextValue` interface:
```typescript
contextToggles: ContextToggles
setContextToggle: (sectionId: string, enabled: boolean) => void
```

Add state in `ChatProvider`:
```typescript
import type { ContextToggles } from './types'

const [contextToggles, setContextToggles] = useState<ContextToggles>({})

const setContextToggle = useCallback((sectionId: string, enabled: boolean) => {
  setContextToggles((prev) => ({ ...prev, [sectionId]: enabled }))
}, [])
```

Pass `contextToggles` in the `send()` call inside `sendMessage`:
```typescript
send(chatMessages, groundingWithQuery, conversationId || undefined, contextToggles)
```

Add both to the Provider value.

- [ ] **Step 2: Update useChatStream to accept toggles**

In `src/lib/ai/use-chat-stream.ts`, update the `send` function signature to accept `contextToggles` and include it in the POST body:

```typescript
send: (messages, grounding, conversationId, contextToggles) => {
  // ... existing abort logic ...
  body: JSON.stringify({ messages, grounding, conversationId, contextToggles })
}
```

- [ ] **Step 3: Add contextToggles and grounding to AIAssistantProps**

In `src/components/ai-assistant/types.ts`, add:
```typescript
import type { ContextToggles, GroundingRequest } from '@/lib/ai/types'

// Add to AIAssistantProps:
contextToggles?: ContextToggles
grounding?: GroundingRequest
onContextToggle?: (sectionId: string, enabled: boolean) => void
```

- [ ] **Step 4: Mount ContextControls in AIAssistantPanel**

In `src/components/ai-assistant/AIAssistantPanel.tsx`, import and render between `GroundingHeader` and the messages area:

```typescript
import { ContextControls } from './ContextControls'

// In the JSX, after <GroundingHeader ... />:
{grounding && onContextToggle && contextToggles && (
  <ContextControls
    grounding={grounding}
    toggles={contextToggles}
    onToggle={onContextToggle}
  />
)}
```

- [ ] **Step 5: Update ConnectedAIPanel to pass new props**

The `ConnectedAIPanel` bridges `useChatContext()` to `AIAssistantPanel`. Add the new props:

```typescript
contextToggles={chat.contextToggles}
grounding={/* from ChatProvider props */}
onContextToggle={chat.setContextToggle}
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit --pretty 2>&1 | head -30`
Expected: Clean

- [ ] **Step 7: Commit**

```bash
git add src/lib/ai/chat-context.tsx src/lib/ai/use-chat-stream.ts src/components/ai-assistant/types.ts src/components/ai-assistant/AIAssistantPanel.tsx src/components/ai-assistant/ConnectedAIPanel.tsx
git commit -m "feat(ai): wire context controls through chat context to AI panel"
```

---

### Task 9: Manual Integration Test

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Test context controls appear**

Navigate to Reader page (e.g., `/reader/1KI/21`). Open the AI panel. Verify:
- A collapsed "Context ~XK tokens" bar appears between the grounding header and chat area
- Clicking it expands to show toggleable pills for each section
- Token count updates when pills are toggled

- [ ] **Step 3: Test toggle affects AI response**

Toggle off "Commentary" and "Strong's Hebrew/Greek". Send a question. Verify in dev console that grounding context size is smaller. Toggle "Your Saved Items" on (if you have items for this chapter). Send a question referencing your saved items.

- [ ] **Step 4: Test collection items appear**

Add a verse to a study project from the Reader (using the Collect button). Open the AI panel, expand context controls. Verify "Your Saved Items" section appears with a token estimate. Toggle it on, ask "what have I saved from this chapter?" — verify the AI references your actual saved item.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(ai): integration test fixes for context controls"
```

---

## Summary

| Task | What it does | Estimated size |
|------|-------------|----------------|
| 1 | Types | Tiny — 2 interfaces |
| 2 | Reader extractor → sections | Medium — restructure, no logic change |
| 3 | Collections extractor | Small — new file, 2 queries |
| 4 | Context builder refactor | Medium — new return shape, toggle logic |
| 5 | Send route + system prompt | Small — plumbing |
| 6 | Context estimate endpoint | Small — new route |
| 7 | ContextControls component | Medium — new UI |
| 8 | Wire everything together | Medium — state plumbing across 5 files |
| 9 | Integration test | Manual verification |
