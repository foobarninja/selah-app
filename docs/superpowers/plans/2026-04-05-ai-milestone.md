# AI Milestone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the AI assistant backend — provider abstraction, adaptive grounding, streaming API routes, and client integration — so the existing `AIAssistantPanel` becomes fully functional across Reader, Characters, Themes, Word Study, and Study Builder pages.

**Architecture:** Unified provider adapter pattern behind a factory that reads config from the existing `AppSetting` table. A `ContextBuilder` assembles grounding from existing query functions. SSE streaming with post-processing citation extraction. Conversations are ephemeral by default, user-pinnable.

**Tech Stack:** Next.js 16 App Router, TypeScript, Prisma 7 + better-sqlite3, `@anthropic-ai/sdk`, `openai`, `@google/generative-ai`, raw fetch for Ollama.

---

## File Map

### New Files

```
src/lib/ai/
  types.ts                          — shared AI types (ChatMessage, ModelConfig, Citation, etc.)
  providers/
    base.ts                         — AiProviderAdapter interface
    anthropic.ts                    — Anthropic/Claude adapter
    openai.ts                       — OpenAI/GPT adapter
    google.ts                       — Google/Gemini adapter
    ollama.ts                       — Ollama adapter (with model discovery)
  provider-factory.ts               — resolves active provider from settings
  grounding/
    context-builder.ts              — orchestrates adaptive context assembly
    extractors/
      reader.ts                     — reader page context extractor
      character.ts                  — character page context extractor
      theme.ts                      — theme page context extractor
      word-study.ts                 — word study page context extractor
      study-builder.ts              — study builder page context extractor
    system-prompt.ts                — assembles system prompt from context + preferences
  post-processing/
    citation-extractor.ts           — orchestrates all citation extraction
    reference-parser.ts             — Scripture reference regex + normalization
    entity-matcher.ts               — cached character/theme name matching
  chat-context.tsx                  — React context provider + useChatContext hook
  use-chat-stream.ts                — SSE stream reader hook

src/app/api/ai/
  send/route.ts                     — POST streaming chat endpoint
  conversations/route.ts            — GET list saved conversations
  conversations/[id]/route.ts       — GET/DELETE a saved conversation
  conversations/[id]/save/route.ts  — POST save/pin ephemeral conversation
  ollama/models/route.ts            — GET Ollama model discovery
  test-connection/route.ts          — GET provider connection test
```

### Modified Files

```
src/components/ai-assistant/AIAssistantPanel.tsx  — wire to ChatProvider
src/components/ai-assistant/types.ts              — add streaming/citation types
src/components/reader/ReaderView.tsx               — wrap with ChatProvider
src/components/characters/CharacterProfile.tsx     — wrap with ChatProvider
src/components/themes/ThemeProfile.tsx              — wrap with ChatProvider
src/components/word-study/WordStudyProfile.tsx      — wrap with ChatProvider
src/components/study-builder/StudyWorkspace.tsx     — wrap with ChatProvider
package.json                                       — add SDK dependencies
```

---

## Task 1: Install Dependencies & Add Shared Types

**Files:**
- Modify: `package.json`
- Create: `src/lib/ai/types.ts`

- [ ] **Step 1: Install provider SDKs**

```bash
npm install @anthropic-ai/sdk openai @google/generative-ai
```

- [ ] **Step 2: Create shared AI types**

Create `src/lib/ai/types.ts`:

```typescript
import type { SourceTier } from '@/components/reader/types'

/** Message in a chat conversation */
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

/** Config passed to provider adapters */
export interface ModelConfig {
  model: string
  maxTokens?: number
  temperature?: number
}

/** Resolved provider credentials */
export interface ProviderCredentials {
  providerId: string
  apiKey: string
  model: string
  apiBaseUrl?: string
}

/** Result of a connection test */
export interface ConnectionTestResult {
  ok: boolean
  error?: string
}

/** Model info returned by Ollama discovery */
export interface OllamaModelInfo {
  name: string
  size: number
  modified: string
}

/** SSE event types sent during streaming */
export type StreamEventType = 'token' | 'done' | 'error'

export interface StreamTokenEvent {
  type: 'token'
  content: string
}

export interface StreamDoneEvent {
  type: 'done'
  citations: Citation[]
}

export interface StreamErrorEvent {
  type: 'error'
  message: string
}

export type StreamEvent = StreamTokenEvent | StreamDoneEvent | StreamErrorEvent

/** A citation extracted from an AI response */
export interface Citation {
  text: string
  tier: SourceTier
  type: 'verse' | 'character' | 'theme' | 'strongs'
  link: string
  startIndex: number
  endIndex: number
}

/** Grounding request sent from client to /api/ai/send */
export interface GroundingRequest {
  page: 'reader' | 'character' | 'theme' | 'word-study' | 'study-builder'
  context: ReaderContext | CharacterContext | ThemeContext | WordStudyContext | StudyBuilderContext
  query: string
}

export interface ReaderContext {
  bookId: string
  chapter: number
  verse?: number
  translationId?: string
}

export interface CharacterContext {
  characterId: string
}

export interface ThemeContext {
  themeId: string
}

export interface WordStudyContext {
  strongsNumber: string
}

export interface StudyBuilderContext {
  projectId: number
}

/** Request body for POST /api/ai/send */
export interface AiSendRequest {
  messages: ChatMessage[]
  grounding: GroundingRequest
  conversationId?: string
}
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json src/lib/ai/types.ts
git commit -m "feat(ai): install provider SDKs and add shared types"
```

---

## Task 2: Provider Adapter Interface & Factory

**Files:**
- Create: `src/lib/ai/providers/base.ts`
- Create: `src/lib/ai/provider-factory.ts`

- [ ] **Step 1: Create the provider adapter interface**

Create `src/lib/ai/providers/base.ts`:

```typescript
import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'

/**
 * Unified interface for all LLM providers.
 * Each adapter normalizes its SDK's streaming into AsyncIterable<string>.
 */
export interface AiProviderAdapter {
  readonly id: string

  /** Stream a chat completion, yielding text chunks */
  stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string>

  /** Test whether the provider is reachable and the API key is valid */
  testConnection(): Promise<ConnectionTestResult>

  /** Optional: discover available models (used by Ollama) */
  listModels?(): Promise<OllamaModelInfo[]>
}
```

- [ ] **Step 2: Create the provider factory**

Create `src/lib/ai/provider-factory.ts`:

```typescript
import { getAIConfig } from '@/lib/settings/queries'
import { getSetting } from '@/lib/settings/queries'
import { prisma } from '@/lib/db'
import type { AiProviderAdapter } from './providers/base'
import type { ProviderCredentials } from './types'

async function getCredentials(): Promise<ProviderCredentials | null> {
  const config = await getAIConfig()
  if (!config.isConfigured || !config.provider || !config.model) return null

  const apiKey = (await getSetting('ai_api_key')) || ''
  const provider = await prisma.aiProvider.findUnique({
    where: { id: config.provider },
  })

  return {
    providerId: config.provider,
    apiKey,
    model: config.model,
    apiBaseUrl: provider?.apiBaseUrl,
  }
}

export async function getProvider(): Promise<AiProviderAdapter | null> {
  const creds = await getCredentials()
  if (!creds) return null

  switch (creds.providerId) {
    case 'anthropic': {
      const { AnthropicAdapter } = await import('./providers/anthropic')
      return new AnthropicAdapter(creds.apiKey, creds.model)
    }
    case 'openai': {
      const { OpenAIAdapter } = await import('./providers/openai')
      return new OpenAIAdapter(creds.apiKey, creds.model)
    }
    case 'google': {
      const { GoogleAdapter } = await import('./providers/google')
      return new GoogleAdapter(creds.apiKey, creds.model)
    }
    case 'ollama': {
      const { OllamaAdapter } = await import('./providers/ollama')
      return new OllamaAdapter(creds.apiBaseUrl || 'http://localhost:11434', creds.model)
    }
    default:
      return null
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/providers/base.ts src/lib/ai/provider-factory.ts
git commit -m "feat(ai): add provider adapter interface and factory"
```

---

## Task 3: Anthropic Provider Adapter

**Files:**
- Create: `src/lib/ai/providers/anthropic.ts`

- [ ] **Step 1: Implement the Anthropic adapter**

Create `src/lib/ai/providers/anthropic.ts`:

```typescript
import Anthropic from '@anthropic-ai/sdk'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class AnthropicAdapter implements AiProviderAdapter {
  readonly id = 'anthropic'
  private client: Anthropic

  constructor(apiKey: string, private model: string) {
    this.client = new Anthropic({ apiKey })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const systemMessage = messages.find((m) => m.role === 'system')
    const chatMessages = messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

    const stream = this.client.messages.stream({
      model: config.model || this.model,
      max_tokens: config.maxTokens || 2048,
      system: systemMessage?.content,
      messages: chatMessages,
    })

    for await (const event of stream) {
      if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
        yield event.delta.text
      }
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      await this.client.messages.create({
        model: this.model,
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      })
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { ok: false, error: message }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/providers/anthropic.ts
git commit -m "feat(ai): add Anthropic/Claude provider adapter"
```

---

## Task 4: OpenAI Provider Adapter

**Files:**
- Create: `src/lib/ai/providers/openai.ts`

- [ ] **Step 1: Implement the OpenAI adapter**

Create `src/lib/ai/providers/openai.ts`:

```typescript
import OpenAI from 'openai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class OpenAIAdapter implements AiProviderAdapter {
  readonly id = 'openai'
  private client: OpenAI

  constructor(apiKey: string, private model: string) {
    this.client = new OpenAI({ apiKey })
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const openaiMessages = messages.map((m) => ({
      role: m.role as 'system' | 'user' | 'assistant',
      content: m.content,
    }))

    const stream = await this.client.chat.completions.create({
      model: config.model || this.model,
      max_tokens: config.maxTokens || 2048,
      messages: openaiMessages,
      stream: true,
    })

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content
      if (text) yield text
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      await this.client.chat.completions.create({
        model: this.model,
        max_tokens: 1,
        messages: [{ role: 'user', content: 'hi' }],
      })
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { ok: false, error: message }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/providers/openai.ts
git commit -m "feat(ai): add OpenAI/GPT provider adapter"
```

---

## Task 5: Google Gemini Provider Adapter

**Files:**
- Create: `src/lib/ai/providers/google.ts`

- [ ] **Step 1: Implement the Google adapter**

Create `src/lib/ai/providers/google.ts`:

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult } from '../types'

export class GoogleAdapter implements AiProviderAdapter {
  readonly id = 'google'
  private genAI: GoogleGenerativeAI

  constructor(apiKey: string, private model: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
  }

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const genModel = this.genAI.getGenerativeModel({
      model: config.model || this.model,
      generationConfig: { maxOutputTokens: config.maxTokens || 2048 },
    })

    const systemMessage = messages.find((m) => m.role === 'system')
    const chatMessages = messages.filter((m) => m.role !== 'system')

    // Convert to Gemini format: alternating user/model roles
    const history = chatMessages.slice(0, -1).map((m) => ({
      role: m.role === 'assistant' ? 'model' as const : 'user' as const,
      parts: [{ text: m.content }],
    }))

    const chat = genModel.startChat({
      history,
      systemInstruction: systemMessage ? { role: 'user' as const, parts: [{ text: systemMessage.content }] } : undefined,
    })

    const lastMessage = chatMessages[chatMessages.length - 1]
    const result = await chat.sendMessageStream(lastMessage.content)

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) yield text
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const genModel = this.genAI.getGenerativeModel({ model: this.model })
      await genModel.generateContent('hi')
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { ok: false, error: message }
    }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/providers/google.ts
git commit -m "feat(ai): add Google/Gemini provider adapter"
```

---

## Task 6: Ollama Provider Adapter

**Files:**
- Create: `src/lib/ai/providers/ollama.ts`

- [ ] **Step 1: Implement the Ollama adapter**

Create `src/lib/ai/providers/ollama.ts`:

```typescript
import type { AiProviderAdapter } from './base'
import type { ChatMessage, ModelConfig, ConnectionTestResult, OllamaModelInfo } from '../types'

export class OllamaAdapter implements AiProviderAdapter {
  readonly id = 'ollama'

  constructor(private baseUrl: string, private model: string) {}

  async *stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string> {
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.model || this.model,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        stream: true,
      }),
    })

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status} ${response.statusText}`)
    }

    const reader = response.body?.getReader()
    if (!reader) throw new Error('No response body from Ollama')

    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const json = JSON.parse(line)
          if (json.message?.content) {
            yield json.message.content
          }
        } catch {
          // skip malformed lines
        }
      }
    }
  }

  async testConnection(): Promise<ConnectionTestResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
      if (!response.ok) {
        return { ok: false, error: `Ollama returned ${response.status}` }
      }
      return { ok: true }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Connection failed'
      return { ok: false, error: `Ollama unreachable at ${this.baseUrl}. Is it running? (${message})` }
    }
  }

  async listModels(): Promise<OllamaModelInfo[]> {
    const response = await fetch(`${this.baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) throw new Error(`Ollama returned ${response.status}`)
    const data = await response.json()
    return (data.models || []).map((m: { name: string; size: number; modified_at: string }) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at,
    }))
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/providers/ollama.ts
git commit -m "feat(ai): add Ollama provider adapter with model discovery"
```

---

## Task 7: Entity Matcher (Cached Character & Theme Names)

**Files:**
- Create: `src/lib/ai/post-processing/entity-matcher.ts`

- [ ] **Step 1: Implement the cached entity matcher**

Create `src/lib/ai/post-processing/entity-matcher.ts`:

```typescript
import { prisma } from '@/lib/db'

/** Lazy-loaded, process-lifetime caches */
let characterNames: Map<string, string> | null = null  // lowercase name → id
let themeNames: Map<string, string> | null = null       // lowercase name → id

export async function getCharacterNames(): Promise<Map<string, string>> {
  if (!characterNames) {
    const chars = await prisma.character.findMany({
      select: { id: true, name: true },
    })
    characterNames = new Map()
    for (const c of chars) {
      characterNames.set(c.name.toLowerCase(), c.id)
    }
  }
  return characterNames
}

export async function getThemeNames(): Promise<Map<string, string>> {
  if (!themeNames) {
    const themes = await prisma.theme.findMany({
      select: { id: true, name: true },
    })
    themeNames = new Map()
    for (const t of themes) {
      themeNames.set(t.name.toLowerCase(), String(t.id))
    }
  }
  return themeNames
}

export interface EntityMatch {
  text: string
  entityId: string
  type: 'character' | 'theme'
  startIndex: number
  endIndex: number
}

/**
 * Find character and theme name mentions in text.
 * Uses case-insensitive whole-word matching against the cached name maps.
 */
export async function findEntityMentions(text: string): Promise<EntityMatch[]> {
  const [charMap, themeMap] = await Promise.all([getCharacterNames(), getThemeNames()])
  const matches: EntityMatch[] = []
  const lowerText = text.toLowerCase()

  for (const [name, id] of charMap) {
    // Skip very short names that cause false positives (e.g., "Er", "Og")
    if (name.length < 3) continue
    let searchFrom = 0
    while (true) {
      const idx = lowerText.indexOf(name, searchFrom)
      if (idx === -1) break
      // Check word boundaries
      const before = idx === 0 || /\W/.test(text[idx - 1])
      const after = idx + name.length >= text.length || /\W/.test(text[idx + name.length])
      if (before && after) {
        matches.push({
          text: text.slice(idx, idx + name.length),
          entityId: id,
          type: 'character',
          startIndex: idx,
          endIndex: idx + name.length,
        })
      }
      searchFrom = idx + name.length
    }
  }

  for (const [name, id] of themeMap) {
    if (name.length < 4) continue
    let searchFrom = 0
    while (true) {
      const idx = lowerText.indexOf(name, searchFrom)
      if (idx === -1) break
      const before = idx === 0 || /\W/.test(text[idx - 1])
      const after = idx + name.length >= text.length || /\W/.test(text[idx + name.length])
      if (before && after) {
        matches.push({
          text: text.slice(idx, idx + name.length),
          entityId: id,
          type: 'theme',
          startIndex: idx,
          endIndex: idx + name.length,
        })
      }
      searchFrom = idx + name.length
    }
  }

  // Deduplicate overlapping matches — keep the longer match
  matches.sort((a, b) => a.startIndex - b.startIndex)
  const deduped: EntityMatch[] = []
  for (const match of matches) {
    const prev = deduped[deduped.length - 1]
    if (prev && match.startIndex < prev.endIndex) {
      // Overlapping: keep the longer one
      if (match.endIndex - match.startIndex > prev.endIndex - prev.startIndex) {
        deduped[deduped.length - 1] = match
      }
    } else {
      deduped.push(match)
    }
  }

  return deduped
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/post-processing/entity-matcher.ts
git commit -m "feat(ai): add cached entity matcher for characters and themes"
```

---

## Task 8: Scripture Reference Parser

**Files:**
- Create: `src/lib/ai/post-processing/reference-parser.ts`

- [ ] **Step 1: Implement the reference parser**

Create `src/lib/ai/post-processing/reference-parser.ts`:

```typescript
export interface ScriptureRef {
  text: string
  bookId: string
  chapter: number
  verseStart?: number
  verseEnd?: number
  startIndex: number
  endIndex: number
}

/**
 * Map of common book name variants to canonical book IDs.
 * Uses the same IDs as the Selah database.
 */
const BOOK_ALIASES: Record<string, string> = {
  'genesis': 'GEN', 'gen': 'GEN',
  'exodus': 'EXO', 'exod': 'EXO', 'exo': 'EXO',
  'leviticus': 'LEV', 'lev': 'LEV',
  'numbers': 'NUM', 'num': 'NUM',
  'deuteronomy': 'DEU', 'deut': 'DEU', 'deu': 'DEU',
  'joshua': 'JOS', 'josh': 'JOS', 'jos': 'JOS',
  'judges': 'JDG', 'judg': 'JDG', 'jdg': 'JDG',
  'ruth': 'RUT', 'rut': 'RUT',
  '1 samuel': '1SA', '1 sam': '1SA', '1sa': '1SA',
  '2 samuel': '2SA', '2 sam': '2SA', '2sa': '2SA',
  '1 kings': '1KI', '1 kgs': '1KI', '1ki': '1KI',
  '2 kings': '2KI', '2 kgs': '2KI', '2ki': '2KI',
  '1 chronicles': '1CH', '1 chr': '1CH', '1ch': '1CH',
  '2 chronicles': '2CH', '2 chr': '2CH', '2ch': '2CH',
  'ezra': 'EZR', 'ezr': 'EZR',
  'nehemiah': 'NEH', 'neh': 'NEH',
  'esther': 'EST', 'est': 'EST',
  'job': 'JOB',
  'psalms': 'PSA', 'psalm': 'PSA', 'psa': 'PSA', 'ps': 'PSA',
  'proverbs': 'PRO', 'prov': 'PRO', 'pro': 'PRO',
  'ecclesiastes': 'ECC', 'eccl': 'ECC', 'ecc': 'ECC',
  'song of solomon': 'SNG', 'song of songs': 'SNG', 'sng': 'SNG', 'sos': 'SNG',
  'isaiah': 'ISA', 'isa': 'ISA',
  'jeremiah': 'JER', 'jer': 'JER',
  'lamentations': 'LAM', 'lam': 'LAM',
  'ezekiel': 'EZK', 'ezek': 'EZK', 'ezk': 'EZK',
  'daniel': 'DAN', 'dan': 'DAN',
  'hosea': 'HOS', 'hos': 'HOS',
  'joel': 'JOL', 'jol': 'JOL',
  'amos': 'AMO', 'amo': 'AMO',
  'obadiah': 'OBA', 'obad': 'OBA', 'oba': 'OBA',
  'jonah': 'JON', 'jon': 'JON',
  'micah': 'MIC', 'mic': 'MIC',
  'nahum': 'NAM', 'nah': 'NAM', 'nam': 'NAM',
  'habakkuk': 'HAB', 'hab': 'HAB',
  'zephaniah': 'ZEP', 'zeph': 'ZEP', 'zep': 'ZEP',
  'haggai': 'HAG', 'hag': 'HAG',
  'zechariah': 'ZEC', 'zech': 'ZEC', 'zec': 'ZEC',
  'malachi': 'MAL', 'mal': 'MAL',
  'matthew': 'MAT', 'matt': 'MAT', 'mat': 'MAT',
  'mark': 'MRK', 'mrk': 'MRK',
  'luke': 'LUK', 'luk': 'LUK',
  'john': 'JHN', 'jhn': 'JHN',
  'acts': 'ACT', 'act': 'ACT',
  'romans': 'ROM', 'rom': 'ROM',
  '1 corinthians': '1CO', '1 cor': '1CO', '1co': '1CO',
  '2 corinthians': '2CO', '2 cor': '2CO', '2co': '2CO',
  'galatians': 'GAL', 'gal': 'GAL',
  'ephesians': 'EPH', 'eph': 'EPH',
  'philippians': 'PHP', 'phil': 'PHP', 'php': 'PHP',
  'colossians': 'COL', 'col': 'COL',
  '1 thessalonians': '1TH', '1 thess': '1TH', '1th': '1TH',
  '2 thessalonians': '2TH', '2 thess': '2TH', '2th': '2TH',
  '1 timothy': '1TI', '1 tim': '1TI', '1ti': '1TI',
  '2 timothy': '2TI', '2 tim': '2TI', '2ti': '2TI',
  'titus': 'TIT', 'tit': 'TIT',
  'philemon': 'PHM', 'phlm': 'PHM', 'phm': 'PHM',
  'hebrews': 'HEB', 'heb': 'HEB',
  'james': 'JAS', 'jas': 'JAS',
  '1 peter': '1PE', '1 pet': '1PE', '1pe': '1PE',
  '2 peter': '2PE', '2 pet': '2PE', '2pe': '2PE',
  '1 john': '1JN', '1jn': '1JN',
  '2 john': '2JN', '2jn': '2JN',
  '3 john': '3JN', '3jn': '3JN',
  'jude': 'JUD', 'jud': 'JUD',
  'revelation': 'REV', 'rev': 'REV',
}

/**
 * Regex to match Scripture references like:
 * "John 3:16", "1 Corinthians 13:4-7", "Genesis 1:1", "Ps 23:1"
 */
const SCRIPTURE_REGEX = /\b((?:[123]\s)?[A-Z][a-z]+(?:\s(?:of\s)?[A-Z][a-z]+)?)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?\b/g

/**
 * Parse Scripture references from AI response text.
 */
export function parseScriptureRefs(text: string): ScriptureRef[] {
  const refs: ScriptureRef[] = []
  let match: RegExpExecArray | null

  // Reset regex state
  SCRIPTURE_REGEX.lastIndex = 0

  while ((match = SCRIPTURE_REGEX.exec(text)) !== null) {
    const bookName = match[1].toLowerCase()
    const bookId = BOOK_ALIASES[bookName]
    if (!bookId) continue

    const chapter = parseInt(match[2], 10)
    const verseStart = parseInt(match[3], 10)
    const verseEnd = match[4] ? parseInt(match[4], 10) : undefined

    refs.push({
      text: match[0],
      bookId,
      chapter,
      verseStart,
      verseEnd,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  return refs
}

/**
 * Match Strong's number references like H1234, G5678
 */
export interface StrongsRef {
  text: string
  number: string
  startIndex: number
  endIndex: number
}

const STRONGS_REGEX = /\b([HG]\d{1,5})\b/g

export function parseStrongsRefs(text: string): StrongsRef[] {
  const refs: StrongsRef[] = []
  let match: RegExpExecArray | null

  STRONGS_REGEX.lastIndex = 0

  while ((match = STRONGS_REGEX.exec(text)) !== null) {
    refs.push({
      text: match[0],
      number: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  return refs
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/post-processing/reference-parser.ts
git commit -m "feat(ai): add Scripture reference and Strong's number parsers"
```

---

## Task 9: Citation Extractor (Orchestrator)

**Files:**
- Create: `src/lib/ai/post-processing/citation-extractor.ts`

- [ ] **Step 1: Implement the citation extractor**

Create `src/lib/ai/post-processing/citation-extractor.ts`:

```typescript
import type { Citation } from '../types'
import type { SourceTier } from '@/components/reader/types'
import { parseScriptureRefs, parseStrongsRefs } from './reference-parser'
import { findEntityMentions } from './entity-matcher'

/**
 * Extract all citations from a completed AI response.
 * Combines Scripture references, Strong's numbers, and entity (character/theme) mentions.
 * Returns non-overlapping citations sorted by position.
 */
export async function extractCitations(text: string): Promise<Citation[]> {
  const [scriptureRefs, strongsRefs, entityMentions] = await Promise.all([
    Promise.resolve(parseScriptureRefs(text)),
    Promise.resolve(parseStrongsRefs(text)),
    findEntityMentions(text),
  ])

  const citations: Citation[] = []

  for (const ref of scriptureRefs) {
    const verseSlug = ref.verseStart ? `/${ref.verseStart}` : ''
    citations.push({
      text: ref.text,
      tier: 1 as SourceTier,
      type: 'verse',
      link: `/reader/${ref.bookId}/${ref.chapter}${verseSlug}`,
      startIndex: ref.startIndex,
      endIndex: ref.endIndex,
    })
  }

  for (const ref of strongsRefs) {
    citations.push({
      text: ref.text,
      tier: 2 as SourceTier,
      type: 'strongs',
      link: `/word-study/${ref.number}`,
      startIndex: ref.startIndex,
      endIndex: ref.endIndex,
    })
  }

  for (const entity of entityMentions) {
    citations.push({
      text: entity.text,
      tier: 2 as SourceTier,
      type: entity.type,
      link: entity.type === 'character'
        ? `/characters/${entity.entityId}`
        : `/themes/${entity.entityId}`,
      startIndex: entity.startIndex,
      endIndex: entity.endIndex,
    })
  }

  // Sort by position, remove overlaps (keep higher-priority: verse > strongs > entity)
  citations.sort((a, b) => a.startIndex - b.startIndex)
  const deduped: Citation[] = []
  for (const cit of citations) {
    const prev = deduped[deduped.length - 1]
    if (prev && cit.startIndex < prev.endIndex) continue // skip overlap
    deduped.push(cit)
  }

  return deduped
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/ai/post-processing/citation-extractor.ts
git commit -m "feat(ai): add citation extractor orchestrator"
```

---

## Task 10: Grounding Context Extractors

**Files:**
- Create: `src/lib/ai/grounding/extractors/reader.ts`
- Create: `src/lib/ai/grounding/extractors/character.ts`
- Create: `src/lib/ai/grounding/extractors/theme.ts`
- Create: `src/lib/ai/grounding/extractors/word-study.ts`
- Create: `src/lib/ai/grounding/extractors/study-builder.ts`

- [ ] **Step 1: Create reader extractor**

Create `src/lib/ai/grounding/extractors/reader.ts`:

```typescript
import { getChapterText, getPassageContext } from '@/lib/reader/queries'
import type { ReaderContext } from '../../types'

export async function extractReaderContext(ctx: ReaderContext): Promise<string> {
  const translationId = ctx.translationId || 'BSB'
  const [verses, passageCtx] = await Promise.all([
    getChapterText(translationId, ctx.bookId, ctx.chapter),
    getPassageContext(ctx.bookId, ctx.chapter).catch(() => null),
  ])

  const lines: string[] = []
  lines.push(`## Current Passage: ${ctx.bookId} ${ctx.chapter}`)

  // Include focused verses or first 15 of the chapter
  const relevantVerses = ctx.verse
    ? verses.filter((v) => Math.abs(v.verse - ctx.verse!) <= 3)
    : verses.slice(0, 15)

  for (const v of relevantVerses) {
    lines.push(`${v.verse}. ${v.text}`)
  }

  if (passageCtx) {
    if (passageCtx.characters?.length) {
      lines.push(`\n### Characters Present`)
      for (const c of passageCtx.characters.slice(0, 5)) {
        lines.push(`- ${c.name} (${c.role})`)
      }
    }
    if (passageCtx.themes?.length) {
      lines.push(`\n### Themes`)
      for (const t of passageCtx.themes.slice(0, 5)) {
        lines.push(`- ${t.name}`)
      }
    }
    if (passageCtx.crossRefs?.length) {
      lines.push(`\n### Key Cross-References`)
      for (const xr of passageCtx.crossRefs.slice(0, 5)) {
        lines.push(`- ${xr.targetRef}: ${xr.snippet || ''}`)
      }
    }
    if (passageCtx.commentaries?.length) {
      lines.push(`\n### Commentary`)
      for (const cm of passageCtx.commentaries.slice(0, 3)) {
        lines.push(`- [${cm.sourceName}] ${cm.excerpt}`)
      }
    }
  }

  return lines.join('\n')
}
```

- [ ] **Step 2: Create character extractor**

Create `src/lib/ai/grounding/extractors/character.ts`:

```typescript
import { getCharacterProfile } from '@/lib/characters/queries'
import type { CharacterContext } from '../../types'

export async function extractCharacterContext(ctx: CharacterContext): Promise<string> {
  const profile = await getCharacterProfile(ctx.characterId)
  if (!profile) return `Character ID ${ctx.characterId} not found.`

  const lines: string[] = []
  lines.push(`## Character: ${profile.name}`)
  if (profile.title) lines.push(`Title: ${profile.title}`)
  if (profile.era) lines.push(`Era: ${profile.era}`)
  if (profile.summary) lines.push(`\n${profile.summary}`)

  if (profile.relationships?.length) {
    lines.push(`\n### Relationships`)
    for (const r of profile.relationships.slice(0, 10)) {
      lines.push(`- ${r.type}: ${r.targetName}`)
    }
  }

  if (profile.appearances?.length) {
    lines.push(`\n### Key Appearances`)
    for (const a of profile.appearances.slice(0, 8)) {
      lines.push(`- ${a.passageRef}: ${a.sceneSummary || a.role}`)
    }
  }

  if (profile.connectedThemes?.length) {
    lines.push(`\n### Connected Themes`)
    for (const t of profile.connectedThemes.slice(0, 5)) {
      lines.push(`- ${t.name}`)
    }
  }

  return lines.join('\n')
}
```

- [ ] **Step 3: Create theme extractor**

Create `src/lib/ai/grounding/extractors/theme.ts`:

```typescript
import { getThemeProfile } from '@/lib/themes/queries'
import type { ThemeContext } from '../../types'

export async function extractThemeContext(ctx: ThemeContext): Promise<string> {
  const profile = await getThemeProfile(ctx.themeId)
  if (!profile) return `Theme ID ${ctx.themeId} not found.`

  const lines: string[] = []
  lines.push(`## Theme: ${profile.name}`)
  if (profile.definition) lines.push(profile.definition)
  if (profile.category) lines.push(`Category: ${profile.category}`)

  if (profile.passages?.length) {
    lines.push(`\n### Key Passages (${profile.passages.length} total)`)
    for (const p of profile.passages.slice(0, 8)) {
      lines.push(`- ${p.passageRef}${p.snippet ? ': ' + p.snippet : ''}`)
    }
  }

  if (profile.relatedThemes?.length) {
    lines.push(`\n### Related Themes`)
    for (const rt of profile.relatedThemes.slice(0, 5)) {
      lines.push(`- ${rt.name}`)
    }
  }

  return lines.join('\n')
}
```

- [ ] **Step 4: Create word study extractor**

Create `src/lib/ai/grounding/extractors/word-study.ts`:

```typescript
import { getStrongsEntry, getTranslationClusters } from '@/lib/word-study/queries'
import type { WordStudyContext } from '../../types'

export async function extractWordStudyContext(ctx: WordStudyContext): Promise<string> {
  const [entry, clusters] = await Promise.all([
    getStrongsEntry(ctx.strongsNumber),
    getTranslationClusters(ctx.strongsNumber),
  ])

  if (!entry) return `Strong's number ${ctx.strongsNumber} not found.`

  const lines: string[] = []
  lines.push(`## Word Study: ${entry.originalWord} (${ctx.strongsNumber})`)
  if (entry.transliteration) lines.push(`Transliteration: ${entry.transliteration}`)
  if (entry.definition) lines.push(`Definition: ${entry.definition}`)
  if (entry.morphology) lines.push(`Morphology: ${entry.morphology}`)

  if (clusters.length) {
    lines.push(`\n### Translation Renderings`)
    for (const c of clusters.slice(0, 8)) {
      lines.push(`- "${c.rendering}" (${c.count}x)`)
    }
  }

  return lines.join('\n')
}
```

- [ ] **Step 5: Create study builder extractor**

Create `src/lib/ai/grounding/extractors/study-builder.ts`:

```typescript
import { getProject, getProjectItems } from '@/lib/study-builder/queries'
import type { StudyBuilderContext } from '../../types'

export async function extractStudyBuilderContext(ctx: StudyBuilderContext): Promise<string> {
  const [project, items] = await Promise.all([
    getProject(ctx.projectId),
    getProjectItems(ctx.projectId),
  ])

  if (!project) return `Study project ${ctx.projectId} not found.`

  const lines: string[] = []
  lines.push(`## Study Project: ${project.topic}`)
  lines.push(`Format: ${project.format}`)

  if (items.length) {
    lines.push(`\n### Assembled Items (${items.length})`)
    for (const item of items) {
      lines.push(`- [${item.itemType}] ${item.itemRef}`)
      if (item.annotation) lines.push(`  Annotation: ${item.annotation}`)
    }
  }

  return lines.join('\n')
}
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/ai/grounding/extractors/
git commit -m "feat(ai): add grounding context extractors for all 5 pages"
```

---

## Task 11: Context Builder & System Prompt

**Files:**
- Create: `src/lib/ai/grounding/context-builder.ts`
- Create: `src/lib/ai/grounding/system-prompt.ts`

- [ ] **Step 1: Create the context builder**

Create `src/lib/ai/grounding/context-builder.ts`:

```typescript
import type { GroundingRequest, ReaderContext, CharacterContext, ThemeContext, WordStudyContext, StudyBuilderContext } from '../types'
import { extractReaderContext } from './extractors/reader'
import { extractCharacterContext } from './extractors/character'
import { extractThemeContext } from './extractors/theme'
import { extractWordStudyContext } from './extractors/word-study'
import { extractStudyBuilderContext } from './extractors/study-builder'
import { getCharacterNames, getThemeNames } from '../post-processing/entity-matcher'

const MAX_CONTEXT_CHARS = 12000 // ~4,000 tokens

/**
 * Build the grounding context for the AI system prompt.
 * Assembles primary context from the current page, then enriches
 * based on entities mentioned in the user's query.
 */
export async function buildGroundingContext(grounding: GroundingRequest): Promise<string> {
  // 1. Primary context from current page
  let primary: string
  switch (grounding.page) {
    case 'reader':
      primary = await extractReaderContext(grounding.context as ReaderContext)
      break
    case 'character':
      primary = await extractCharacterContext(grounding.context as CharacterContext)
      break
    case 'theme':
      primary = await extractThemeContext(grounding.context as ThemeContext)
      break
    case 'word-study':
      primary = await extractWordStudyContext(grounding.context as WordStudyContext)
      break
    case 'study-builder':
      primary = await extractStudyBuilderContext(grounding.context as StudyBuilderContext)
      break
    default:
      primary = ''
  }

  // 2. Query-triggered enrichment
  const enrichments: string[] = []
  const remainingBudget = MAX_CONTEXT_CHARS - primary.length

  if (remainingBudget > 500) {
    const queryLower = grounding.query.toLowerCase()

    // Check if query mentions characters not already in primary context
    if (grounding.page !== 'character') {
      const charNames = await getCharacterNames()
      for (const [name, id] of charNames) {
        if (name.length >= 3 && queryLower.includes(name)) {
          const ctx = await extractCharacterContext({ characterId: id })
          enrichments.push(ctx)
          break // one enrichment per type
        }
      }
    }

    // Check if query mentions themes not already in primary context
    if (grounding.page !== 'theme') {
      const themeNames = await getThemeNames()
      for (const [name, id] of themeNames) {
        if (name.length >= 4 && queryLower.includes(name)) {
          const ctx = await extractThemeContext({ themeId: id })
          enrichments.push(ctx)
          break
        }
      }
    }
  }

  // 3. Assemble within token budget
  let result = primary
  for (const enrichment of enrichments) {
    if (result.length + enrichment.length > MAX_CONTEXT_CHARS) break
    result += '\n\n---\n\n' + enrichment
  }

  return result
}
```

- [ ] **Step 2: Create the system prompt builder**

Create `src/lib/ai/grounding/system-prompt.ts`:

```typescript
import { getStudyPreferences } from '@/lib/settings/queries'

export async function buildSystemPrompt(groundingContext: string): Promise<string> {
  const prefs = await getStudyPreferences()

  const parts: string[] = []

  parts.push(`You are a Bible study assistant in the Selah app. You help users understand Scripture by drawing on curated scholarship, historical context, and the original languages. You are warm, thoughtful, and scholarly — like a trusted pastor-teacher who loves digging into the text.`)

  parts.push(`\n## Source Tier Guidelines
When discussing information, be transparent about its basis:
- Tier 1 (Canon): Direct Scripture quotation — always authoritative
- Tier 2 (Scholarship): Peer-reviewed biblical scholarship, lexicons, established commentaries
- Tier 3 (Historical): Archaeological, geographical, and cultural context from secular sources
- Tier 4 (AI-Assisted): Your own synthesis and analysis — mark as your understanding
- Tier 5 (Conjecture): Speculative or debated interpretations — always flag clearly

Prefer lower tiers. Ground claims in Scripture and scholarship before offering synthesis.`)

  parts.push(`\n## User Preferences
- Audience level: ${prefs.dailyBreadAudience}
- Commentary display: ${prefs.commentaryDisplay}
- Source tier visibility: ${Object.entries(prefs.sourceTierVisibility).filter(([, v]) => v).map(([k]) => k).join(', ')}`)

  if (groundingContext) {
    parts.push(`\n## Grounding Context
The user is currently viewing the following content in the app. Use this to inform your responses:\n\n${groundingContext}`)
  }

  parts.push(`\n## Response Guidelines
- Keep responses focused and concise (2-4 paragraphs unless the user asks for depth)
- When citing Scripture, use the format "Book Chapter:Verse" (e.g., John 3:16)
- When referencing Strong's numbers, use the format H1234 or G5678
- Reference characters and themes by their full names
- If unsure, say so honestly rather than guessing`)

  return parts.join('\n')
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/grounding/context-builder.ts src/lib/ai/grounding/system-prompt.ts
git commit -m "feat(ai): add context builder and system prompt assembly"
```

---

## Task 12: Streaming Chat API Route

**Files:**
- Create: `src/app/api/ai/send/route.ts`

- [ ] **Step 1: Implement the streaming endpoint**

Create `src/app/api/ai/send/route.ts`:

```typescript
import { NextRequest } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'
import { buildGroundingContext } from '@/lib/ai/grounding/context-builder'
import { buildSystemPrompt } from '@/lib/ai/grounding/system-prompt'
import { extractCitations } from '@/lib/ai/post-processing/citation-extractor'
import type { AiSendRequest, ChatMessage, StreamEvent } from '@/lib/ai/types'

const MAX_HISTORY_MESSAGES = 20
const STREAM_TIMEOUT_MS = 30000

function encodeSSE(event: StreamEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(request: NextRequest) {
  let body: AiSendRequest
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 })
  }

  const { messages, grounding } = body
  if (!messages?.length || !grounding) {
    return new Response(JSON.stringify({ error: 'Missing messages or grounding' }), { status: 400 })
  }

  const provider = await getProvider()
  if (!provider) {
    return new Response(JSON.stringify({ error: 'No AI provider configured' }), { status: 400 })
  }

  // Build grounding context and system prompt
  let systemPrompt: string
  try {
    const groundingContext = await buildGroundingContext(grounding)
    systemPrompt = await buildSystemPrompt(groundingContext)
  } catch {
    // Fallback: general prompt without grounding
    systemPrompt = await buildSystemPrompt('')
  }

  // Assemble messages with system prompt, truncate history
  const truncatedHistory = messages.slice(-MAX_HISTORY_MESSAGES)
  const fullMessages: ChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...truncatedHistory,
  ]

  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      let fullResponse = ''
      const timeout = setTimeout(() => {
        controller.enqueue(encoder.encode(encodeSSE({ type: 'error', message: 'Response timed out after 30 seconds.' })))
        controller.close()
      }, STREAM_TIMEOUT_MS)

      try {
        const config = { model: '', maxTokens: 2048 }

        for await (const chunk of provider.stream(fullMessages, config)) {
          fullResponse += chunk
          controller.enqueue(encoder.encode(encodeSSE({ type: 'token', content: chunk })))
        }

        clearTimeout(timeout)

        // Post-processing: extract citations
        const citations = await extractCitations(fullResponse)
        controller.enqueue(encoder.encode(encodeSSE({ type: 'done', citations })))
      } catch (err: unknown) {
        clearTimeout(timeout)
        const message = err instanceof Error ? err.message : 'Unknown error'

        // Classify errors
        let userMessage = message
        if (message.includes('401') || message.includes('Unauthorized') || message.includes('invalid')) {
          userMessage = 'Invalid API key. Check your settings.'
        } else if (message.includes('429') || message.includes('rate')) {
          userMessage = 'Rate limited. Try again in a moment.'
        } else if (message.includes('context_length') || message.includes('token')) {
          userMessage = 'Message too long. Try a shorter question or start a new conversation.'
        }

        controller.enqueue(encoder.encode(encodeSSE({ type: 'error', message: userMessage })))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/api/ai/send/route.ts
git commit -m "feat(ai): add streaming chat API route with SSE"
```

---

## Task 13: Conversation Persistence Routes

**Files:**
- Create: `src/app/api/ai/conversations/route.ts`
- Create: `src/app/api/ai/conversations/[id]/route.ts`
- Create: `src/app/api/ai/conversations/[id]/save/route.ts`

- [ ] **Step 1: List conversations route**

Create `src/app/api/ai/conversations/route.ts`:

```typescript
import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const conversations = await prisma.aiConversation.findMany({
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

- [ ] **Step 2: Get/delete conversation route**

Create `src/app/api/ai/conversations/[id]/route.ts`:

```typescript
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const conversation = await prisma.aiConversation.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      messages: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!conversation) {
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
  const { id } = await params
  await prisma.aiConversation.delete({
    where: { id: parseInt(id, 10) },
  })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 3: Save/pin conversation route**

Create `src/app/api/ai/conversations/[id]/save/route.ts`:

```typescript
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Save an ephemeral conversation to the database.
 * The client sends the full message history; the server persists it.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const { title, contextRef, messages } = body as {
    title?: string
    contextRef?: string
    messages: Array<{ role: string; content: string; timestamp: string }>
  }

  // If id is "new", create a new conversation; otherwise append to existing
  const now = new Date().toISOString()

  if (id === 'new') {
    const conversation = await prisma.aiConversation.create({
      data: {
        title: title || 'Saved conversation',
        contextRef: contextRef || null,
        createdAt: now,
        updatedAt: now,
        messages: {
          create: messages.map((m) => ({
            role: m.role,
            content: m.content,
            createdAt: m.timestamp || now,
          })),
        },
      },
    })
    return NextResponse.json({ id: String(conversation.id) }, { status: 201 })
  }

  // Append to existing
  const convId = parseInt(id, 10)
  await prisma.aiConversation.update({
    where: { id: convId },
    data: { updatedAt: now },
  })
  for (const m of messages) {
    await prisma.aiMessage.create({
      data: {
        conversationId: convId,
        role: m.role,
        content: m.content,
        createdAt: m.timestamp || now,
      },
    })
  }

  return NextResponse.json({ id }, { status: 200 })
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/api/ai/conversations/
git commit -m "feat(ai): add conversation persistence routes (list, get, delete, save)"
```

---

## Task 14: Ollama & Connection Test Routes

**Files:**
- Create: `src/app/api/ai/ollama/models/route.ts`
- Create: `src/app/api/ai/test-connection/route.ts`

- [ ] **Step 1: Ollama model discovery route**

Create `src/app/api/ai/ollama/models/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getSetting } from '@/lib/settings/queries'
import { prisma } from '@/lib/db'

export async function GET() {
  const provider = await prisma.aiProvider.findUnique({ where: { id: 'ollama' } })
  const baseUrl = provider?.apiBaseUrl || 'http://localhost:11434'

  try {
    const response = await fetch(`${baseUrl}/api/tags`, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) {
      return NextResponse.json({ error: `Ollama returned ${response.status}` }, { status: 502 })
    }
    const data = await response.json()
    const models = (data.models || []).map((m: { name: string; size: number; modified_at: string }) => ({
      name: m.name,
      size: m.size,
      modified: m.modified_at,
    }))
    return NextResponse.json({ models })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Connection failed'
    return NextResponse.json(
      { error: `Ollama unreachable at ${baseUrl}. Is it running? (${message})` },
      { status: 502 }
    )
  }
}
```

- [ ] **Step 2: Connection test route**

Create `src/app/api/ai/test-connection/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getProvider } from '@/lib/ai/provider-factory'

export async function GET() {
  const provider = await getProvider()
  if (!provider) {
    return NextResponse.json({ ok: false, error: 'No AI provider configured' })
  }

  const result = await provider.testConnection()
  return NextResponse.json(result)
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/ai/ollama/ src/app/api/ai/test-connection/
git commit -m "feat(ai): add Ollama model discovery and connection test routes"
```

---

## Task 15: Chat Context Provider & Stream Hook

**Files:**
- Create: `src/lib/ai/chat-context.tsx`
- Create: `src/lib/ai/use-chat-stream.ts`

- [ ] **Step 1: Create the SSE stream reader hook**

Create `src/lib/ai/use-chat-stream.ts`:

```typescript
import { useCallback, useRef } from 'react'
import type { StreamEvent, Citation, GroundingRequest, ChatMessage } from './types'

interface UseChatStreamOptions {
  onToken: (content: string) => void
  onDone: (citations: Citation[]) => void
  onError: (message: string) => void
}

export function useChatStream({ onToken, onDone, onError }: UseChatStreamOptions) {
  const abortRef = useRef<AbortController | null>(null)

  const send = useCallback(
    async (messages: ChatMessage[], grounding: GroundingRequest, conversationId?: string) => {
      // Abort any in-flight request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      try {
        const response = await fetch('/api/ai/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, grounding, conversationId }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({ error: 'Request failed' }))
          onError(errBody.error || `HTTP ${response.status}`)
          return
        }

        const reader = response.body?.getReader()
        if (!reader) {
          onError('No response stream')
          return
        }

        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() || ''

          for (const line of lines) {
            const dataLine = line.replace(/^data: /, '').trim()
            if (!dataLine) continue

            try {
              const event: StreamEvent = JSON.parse(dataLine)
              switch (event.type) {
                case 'token':
                  onToken(event.content)
                  break
                case 'done':
                  onDone(event.citations)
                  break
                case 'error':
                  onError(event.message)
                  break
              }
            } catch {
              // skip malformed events
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return
        onError(err instanceof Error ? err.message : 'Connection failed')
      }
    },
    [onToken, onDone, onError]
  )

  const abort = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return { send, abort }
}
```

- [ ] **Step 2: Create the ChatProvider context**

Create `src/lib/ai/chat-context.tsx`:

```typescript
'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'
import { useChatStream } from './use-chat-stream'
import type { ChatMessage, Citation, GroundingRequest } from './types'
import type { Message, ConversationThread, GroundingContext } from '@/components/ai-assistant/types'

interface ChatContextValue {
  messages: Message[]
  isStreaming: boolean
  citations: Citation[]
  conversationHistory: ConversationThread[]
  isPanelOpen: boolean
  groundingContext: GroundingContext

  sendMessage: (content: string) => void
  togglePanel: () => void
  closePanel: () => void
  newConversation: () => void
  openThread: (threadId: string) => void
  saveConversation: () => Promise<void>
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}

interface ChatProviderProps {
  children: ReactNode
  grounding: GroundingRequest
  groundingDisplay: GroundingContext
  isConfigured: boolean
}

export function ChatProvider({ children, grounding, groundingDisplay, isConfigured }: ChatProviderProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [citations, setCitations] = useState<Citation[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<ConversationThread[]>([])
  const [conversationId, setConversationId] = useState<string | null>(null)
  const streamingContentRef = useRef('')

  const { send, abort } = useChatStream({
    onToken: (content) => {
      streamingContentRef.current += content
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last.id === 'streaming') {
          return [...prev.slice(0, -1), { ...last, content: streamingContentRef.current }]
        }
        return prev
      })
    },
    onDone: (newCitations) => {
      setCitations(newCitations)
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        if (last?.id === 'streaming') {
          return [...prev.slice(0, -1), { ...last, id: `msg-${Date.now()}`, sourceTier: 4 as const }]
        }
        return prev
      })
      setIsStreaming(false)
    },
    onError: (errorMessage) => {
      setMessages((prev) => {
        // Remove streaming placeholder if present
        const filtered = prev.filter((m) => m.id !== 'streaming')
        return [...filtered, {
          id: `error-${Date.now()}`,
          role: 'assistant' as const,
          content: errorMessage,
          timestamp: new Date().toLocaleTimeString(),
        }]
      })
      setIsStreaming(false)
    },
  })

  const sendMessage = useCallback(
    (content: string) => {
      if (!content.trim() || isStreaming) return

      const userMsg: Message = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date().toLocaleTimeString(),
      }

      const streamingMsg: Message = {
        id: 'streaming',
        role: 'assistant',
        content: '',
        timestamp: new Date().toLocaleTimeString(),
      }

      setMessages((prev) => [...prev, userMsg, streamingMsg])
      setIsStreaming(true)
      setCitations([])
      streamingContentRef.current = ''

      // Build ChatMessage array from history
      const chatMessages: ChatMessage[] = [
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: 'user' as const, content },
      ]

      const groundingWithQuery: GroundingRequest = {
        ...grounding,
        query: content,
      }

      send(chatMessages, groundingWithQuery, conversationId || undefined)
    },
    [messages, isStreaming, grounding, conversationId, send]
  )

  const newConversation = useCallback(() => {
    abort()
    setMessages([])
    setCitations([])
    setConversationId(null)
    setIsStreaming(false)
  }, [abort])

  const openThread = useCallback(async (threadId: string) => {
    try {
      const res = await fetch(`/api/ai/conversations/${threadId}`)
      if (!res.ok) return
      const data = await res.json()
      setConversationId(threadId)
      setMessages(
        data.messages.map((m: { id: string; role: string; content: string; timestamp: string }) => ({
          id: m.id,
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString(),
          sourceTier: m.role === 'assistant' ? 4 : undefined,
        }))
      )
    } catch {
      // silently fail
    }
  }, [])

  const saveConversation = useCallback(async () => {
    if (messages.length === 0) return
    const res = await fetch('/api/ai/conversations/new/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: messages[0]?.content.slice(0, 60),
        contextRef: groundingDisplay.passageRef || groundingDisplay.characterName || groundingDisplay.themeName || null,
        messages: messages.filter((m) => m.id !== 'streaming').map((m) => ({
          role: m.role,
          content: m.content,
          timestamp: new Date().toISOString(),
        })),
      }),
    })
    if (res.ok) {
      const data = await res.json()
      setConversationId(data.id)
      // Refresh conversation history
      const historyRes = await fetch('/api/ai/conversations')
      if (historyRes.ok) {
        setConversationHistory(await historyRes.json())
      }
    }
  }, [messages, groundingDisplay])

  const togglePanel = useCallback(() => setIsPanelOpen((prev) => !prev), [])
  const closePanel = useCallback(() => { setIsPanelOpen(false); abort() }, [abort])

  // Load conversation history when panel opens
  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/ai/conversations')
      if (res.ok) setConversationHistory(await res.json())
    } catch { /* ignore */ }
  }, [])

  // Trigger history load when panel opens
  const togglePanelWithHistory = useCallback(() => {
    setIsPanelOpen((prev) => {
      if (!prev) loadHistory()
      return !prev
    })
  }, [loadHistory])

  if (!isConfigured) {
    return <>{children}</>
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        isStreaming,
        citations,
        conversationHistory,
        isPanelOpen,
        groundingContext: groundingDisplay,
        sendMessage,
        togglePanel: togglePanelWithHistory,
        closePanel,
        newConversation,
        openThread,
        saveConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/ai/chat-context.tsx src/lib/ai/use-chat-stream.ts
git commit -m "feat(ai): add ChatProvider context and SSE stream hook"
```

---

## Task 16: Wire AIAssistantPanel to ChatProvider

**Files:**
- Modify: `src/components/ai-assistant/AIAssistantPanel.tsx`
- Modify: `src/components/ai-assistant/types.ts`

- [ ] **Step 1: Add streaming indicator and save button to types**

In `src/components/ai-assistant/types.ts`, add the `isStreaming` and `onSaveConversation` props:

```typescript
// AI Assistant section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'
import type { NoteType, Anchor } from '@/components/journal/types'

/** Message sender */
export type MessageRole = 'user' | 'assistant'

/** Grounding context type */
export type GroundingType = 'passage' | 'character' | 'theme' | 'general'

// ── Data interfaces ──

export interface GroundingContext {
  type: GroundingType
  passageRef?: string
  passageTitle?: string
  characters?: string[]
  themes?: string[]
  characterName?: string
  themeName?: string
}

export interface Message { id: string; role: MessageRole; content: string; sourceTier?: SourceTier; timestamp: string }
export interface ConversationThread { id: string; groundingLabel: string; messageCount: number; date: string }
export interface SaveToJournalDraft { content: string; noteType: NoteType; anchors: Anchor[]; userTags: string[] }

// ── Component props ──

export interface AIAssistantProps {
  groundingContext: GroundingContext
  messages: Message[]
  conversationHistory: ConversationThread[]
  isConfigured: boolean
  isPanelOpen: boolean
  isStreaming?: boolean

  onSendMessage?: (content: string) => void
  onClose?: () => void
  onTogglePanel?: () => void
  onSaveToJournal?: (messageId: string, noteType: NoteType, content: string, anchors: Anchor[], tags: string[]) => void
  onOpenThread?: (threadId: string) => void
  onNewConversation?: () => void
  onSaveConversation?: () => void
}
```

- [ ] **Step 2: Update AIAssistantPanel to support streaming and ChatProvider**

Replace `src/components/ai-assistant/AIAssistantPanel.tsx`:

```typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Clock, Send, Bookmark, ChevronLeft, Save, Plus } from 'lucide-react'
import type { AIAssistantProps, Message, GroundingContext, ConversationThread } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

function AITierPill({ tier }: { tier: number }) {
  const label = tier === 5 ? 'Conjecture' : 'AI-assisted'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500, fontFamily: font.body, backgroundColor: 'var(--selah-sky-50, #EEF2F7)', color: 'var(--selah-sky-700, #4A6380)', border: tier === 5 ? '1px dashed var(--selah-warmth-400, #C9A96E)' : 'none' }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--selah-sky-400, #6B91B5)' }} />
      {label}
    </span>
  )
}

function GroundingHeader({ context }: { context: GroundingContext }) {
  if (context.type === 'general') {
    return (<div style={{ padding: '8px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}><span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>General conversation</span></div>)
  }
  return (
    <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
      <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-sky-400, #6B91B5)', marginBottom: '6px' }}>Grounded in</p>
      <div className="flex flex-wrap gap-1.5">
        {context.passageRef && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-900, #4A3711)', color: 'var(--selah-gold-300, #E8C767)' }}>{context.passageRef}</span>)}
        {context.characters?.map((c) => (<span key={c} style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)' }}>{c}</span>))}
        {context.themes?.map((t) => (<span key={t} style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-teal-800, #1A4539)', color: 'var(--selah-teal-200, #93CBBD)' }}>{t}</span>))}
        {context.characterName && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-terra-800, #5C2D21)', color: 'var(--selah-terra-200, #E2BBB0)' }}>{context.characterName}</span>)}
        {context.themeName && (<span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-teal-800, #1A4539)', color: 'var(--selah-teal-200, #93CBBD)' }}>{context.themeName}</span>)}
      </div>
    </div>
  )
}

function StreamingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: '3px', padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          backgroundColor: 'var(--selah-sky-400, #6B91B5)',
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          opacity: 0.4,
        }} />
      ))}
    </span>
  )
}

function MessageBubble({ message, isStreaming, onSave }: { message: Message; isStreaming?: boolean; onSave?: () => void }) {
  const isUser = message.role === 'user'
  const isEmpty = !message.content && isStreaming
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className="relative rounded-xl" style={{ maxWidth: '85%', padding: '12px 16px', backgroundColor: isUser ? 'var(--selah-gold-900, #4A3711)' : 'var(--selah-bg-surface, #1C1917)', border: isUser ? 'none' : '1px solid var(--selah-border-color, #3D3835)' }}>
        {isEmpty ? (
          <StreamingDots />
        ) : (
          <p style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.7, color: isUser ? 'var(--selah-gold-100, #F5E4B8)' : 'var(--selah-text-1, #E8E2D9)', whiteSpace: 'pre-wrap' }}>{message.content}</p>
        )}
        {!isUser && !isStreaming && (
          <div className="flex items-center justify-between mt-2">
            {message.sourceTier && <AITierPill tier={message.sourceTier} />}
            {onSave && (<button onClick={onSave} title="Save to journal" className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-sky-400, #6B91B5)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}><Bookmark size={14} strokeWidth={1.5} /></button>)}
          </div>
        )}
        <p style={{ fontFamily: font.body, fontSize: '10px', color: isUser ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-3, #6E695F)', marginTop: '4px', textAlign: isUser ? 'right' : 'left' }}>{message.timestamp}</p>
      </div>
    </div>
  )
}

function HistoryList({ threads, onOpen, onBack }: { threads: ConversationThread[]; onOpen?: (id: string) => void; onBack: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <button onClick={onBack} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={18} strokeWidth={1.5} /></button>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>Past conversations</span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 && (<div className="text-center py-12"><p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>No saved conversations yet.</p></div>)}
        {threads.map((thread) => (
          <button key={thread.id} onClick={() => onOpen?.(thread.id)} className="block w-full text-left transition-colors duration-150" style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            <p style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{thread.groundingLabel}</p>
            <p style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{thread.messageCount} messages &middot; {thread.date}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export function AIAssistantPanel({ groundingContext, messages, conversationHistory, isConfigured, isPanelOpen, isStreaming, onSendMessage, onClose, onSaveToJournal, onOpenThread, onNewConversation, onSaveConversation }: AIAssistantProps) {
  const [input, setInput] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages.length, messages[messages.length - 1]?.content])

  if (!isConfigured || !isPanelOpen) return null

  const handleSend = () => { if (!input.trim() || isStreaming) return; onSendMessage?.(input); setInput('') }

  if (showHistory) {
    return (
      <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
        <HistoryList threads={conversationHistory} onOpen={(id) => { onOpenThread?.(id); setShowHistory(false) }} onBack={() => setShowHistory(false)} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderLeft: '1px solid var(--selah-border-color, #3D3835)' }}>
      <div className="flex items-center justify-between shrink-0" style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
        <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-sky-400, #6B91B5)' }}>AI assistant</span>
        <div className="flex items-center gap-2">
          {messages.length > 0 && onSaveConversation && (
            <button onClick={onSaveConversation} title="Save conversation" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Save size={16} strokeWidth={1.5} /></button>
          )}
          {messages.length > 0 && (
            <button onClick={onNewConversation} title="New conversation" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Plus size={16} strokeWidth={1.5} /></button>
          )}
          <button onClick={() => setShowHistory(true)} title="Past conversations" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><Clock size={16} strokeWidth={1.5} /></button>
          <button onClick={onClose} style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={16} strokeWidth={1.5} /></button>
        </div>
      </div>

      <GroundingHeader context={groundingContext} />

      <div className="flex-1 overflow-y-auto" style={{ padding: '16px' }}>
        {messages.length === 0 && (<div className="text-center py-12"><p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Ask anything about what you&rsquo;re reading.</p></div>)}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isStreaming={msg.id === 'streaming'}
            onSave={msg.role === 'assistant' && msg.id !== 'streaming' ? () => onSaveToJournal?.(msg.id, 'insight', msg.content, [], []) : undefined}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="shrink-0" style={{ padding: '12px 16px', borderTop: '1px solid var(--selah-border-color, #3D3835)' }}>
        <div className="flex items-end gap-2 rounded-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '10px 14px' }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }} placeholder="Ask anything about what you're reading..." rows={1} className="flex-1 outline-none resize-none" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.5, color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none', maxHeight: '100px' }} disabled={isStreaming} />
          <button onClick={handleSend} className="shrink-0 rounded-lg transition-colors duration-150" style={{ padding: '6px 10px', backgroundColor: input.trim() && !isStreaming ? 'var(--selah-sky-400, #6B91B5)' : 'var(--selah-border-color, #3D3835)', color: '#fff', border: 'none', cursor: input.trim() && !isStreaming ? 'pointer' : 'default' }} disabled={isStreaming}><Send size={14} strokeWidth={2} /></button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ai-assistant/AIAssistantPanel.tsx src/components/ai-assistant/types.ts
git commit -m "feat(ai): wire AIAssistantPanel to support streaming and ChatProvider"
```

---

## Task 17: Create Connected AI Panel Wrapper

**Files:**
- Create: `src/components/ai-assistant/ConnectedAIPanel.tsx`

This component bridges the `ChatProvider` context to the existing `AIAssistantPanel` props interface, keeping the panel component pure/testable.

- [ ] **Step 1: Create the connected wrapper**

Create `src/components/ai-assistant/ConnectedAIPanel.tsx`:

```typescript
'use client'

import { useChatContext } from '@/lib/ai/chat-context'
import { AIAssistantPanel } from './AIAssistantPanel'

export function ConnectedAIPanel() {
  const {
    messages,
    isStreaming,
    conversationHistory,
    isPanelOpen,
    groundingContext,
    sendMessage,
    closePanel,
    newConversation,
    openThread,
    saveConversation,
  } = useChatContext()

  return (
    <AIAssistantPanel
      groundingContext={groundingContext}
      messages={messages}
      conversationHistory={conversationHistory}
      isConfigured={true}
      isPanelOpen={isPanelOpen}
      isStreaming={isStreaming}
      onSendMessage={sendMessage}
      onClose={closePanel}
      onSaveToJournal={(messageId, noteType, content, anchors, tags) => {
        fetch('/api/notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            noteType,
            content,
            anchors,
            tags,
            studyContext: 'ai-conversation',
          }),
        })
      }}
      onOpenThread={openThread}
      onNewConversation={newConversation}
      onSaveConversation={saveConversation}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai-assistant/ConnectedAIPanel.tsx
git commit -m "feat(ai): add ConnectedAIPanel wrapper bridging context to props"
```

---

## Task 18: Create AI Toggle Button Component

**Files:**
- Create: `src/components/ai-assistant/AIToggleButton.tsx`

- [ ] **Step 1: Create the toggle button**

Create `src/components/ai-assistant/AIToggleButton.tsx`:

```typescript
'use client'

import { MessageCircle } from 'lucide-react'
import { useChatContext } from '@/lib/ai/chat-context'

export function AIToggleButton() {
  const { togglePanel, isPanelOpen } = useChatContext()

  return (
    <button
      onClick={togglePanel}
      title="AI Assistant"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: isPanelOpen ? 'var(--selah-sky-600, #4A7A9E)' : 'var(--selah-sky-400, #6B91B5)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'background-color 150ms ease',
        zIndex: 50,
      }}
    >
      <MessageCircle size={22} strokeWidth={1.5} />
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ai-assistant/AIToggleButton.tsx
git commit -m "feat(ai): add floating AI toggle button component"
```

---

## Task 19: Integrate ChatProvider into Page Components

**Files:**
- Modify: `src/components/reader/ReaderView.tsx`
- Modify: `src/components/characters/CharacterProfile.tsx`
- Modify: `src/components/themes/ThemeProfile.tsx`
- Modify: `src/components/word-study/WordStudyProfile.tsx`
- Modify: `src/components/study-builder/StudyWorkspace.tsx`

Each page needs to:
1. Import `ChatProvider` and `ConnectedAIPanel` and `AIToggleButton`
2. Wrap its content with `ChatProvider`, passing the appropriate grounding context
3. Render `ConnectedAIPanel` and `AIToggleButton` inside the provider

- [ ] **Step 1: Read current page components to understand their structure**

Read each file to understand the existing component structure and props before modifying.

Run:
```bash
head -30 src/components/reader/ReaderView.tsx
head -30 src/components/characters/CharacterProfile.tsx
head -30 src/components/themes/ThemeProfile.tsx
head -30 src/components/word-study/WordStudyProfile.tsx
head -30 src/components/study-builder/StudyWorkspace.tsx
```

- [ ] **Step 2: Integrate into ReaderView**

At the top of `src/components/reader/ReaderView.tsx`, add imports:

```typescript
import { ChatProvider } from '@/lib/ai/chat-context'
import { ConnectedAIPanel } from '@/components/ai-assistant/ConnectedAIPanel'
import { AIToggleButton } from '@/components/ai-assistant/AIToggleButton'
```

Wrap the component's return JSX with `ChatProvider`. The `grounding` prop should use the reader's current book/chapter/verse from its existing props. The `groundingDisplay` prop builds a `GroundingContext` with type `'passage'` and the passage ref.

The exact wrapping depends on the component's current return structure — the agent implementing this task should read the full component and wrap accordingly. The pattern is:

```tsx
<ChatProvider
  grounding={{ page: 'reader', context: { bookId, chapter, verse }, query: '' }}
  groundingDisplay={{ type: 'passage', passageRef: `${bookName} ${chapter}` }}
  isConfigured={/* read from props or fetch */}
>
  {/* existing component JSX */}
  <ConnectedAIPanel />
  <AIToggleButton />
</ChatProvider>
```

- [ ] **Step 3: Integrate into CharacterProfile**

Same pattern with `page: 'character'` and `groundingDisplay: { type: 'character', characterName }`.

- [ ] **Step 4: Integrate into ThemeProfile**

Same pattern with `page: 'theme'` and `groundingDisplay: { type: 'theme', themeName }`.

- [ ] **Step 5: Integrate into WordStudyProfile**

Same pattern with `page: 'word-study'` and `groundingDisplay: { type: 'general' }` (word study doesn't have a specific grounding type in the display interface, so use general with the Strong's info in the passageRef).

- [ ] **Step 6: Integrate into StudyWorkspace**

Same pattern with `page: 'study-builder'` and `groundingDisplay: { type: 'general' }`.

- [ ] **Step 7: Commit**

```bash
git add src/components/reader/ReaderView.tsx src/components/characters/CharacterProfile.tsx src/components/themes/ThemeProfile.tsx src/components/word-study/WordStudyProfile.tsx src/components/study-builder/StudyWorkspace.tsx
git commit -m "feat(ai): integrate ChatProvider into Reader, Characters, Themes, Word Study, Study Builder"
```

---

## Task 20: Build Verification & Smoke Test

- [ ] **Step 1: Run TypeScript compilation**

```bash
npx tsc --noEmit
```

Fix any type errors.

- [ ] **Step 2: Run Next.js build**

```bash
npm run build
```

Fix any build errors.

- [ ] **Step 3: Manual smoke test checklist**

Start the dev server and verify:
- [ ] Reader page loads with AI toggle button visible (if AI is configured in settings)
- [ ] AI toggle button hidden when no AI provider configured
- [ ] Clicking toggle opens the AI panel
- [ ] Sending a message shows streaming dots then response (requires a configured provider)
- [ ] Save conversation button appears after messages
- [ ] New conversation button clears history
- [ ] Past conversations list loads
- [ ] Characters, Themes, Word Study, Study Builder pages all show AI toggle

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat(ai): AI milestone complete — provider abstraction, streaming, grounding, citations"
```
