# AI Milestone — Design Spec

## Overview

Add a contextual AI assistant to Selah that adapts its grounding based on where the user is in the app. Supports four LLM providers (Anthropic, Google, OpenAI, Ollama) behind a unified abstraction. Responses stream in real-time, then are enriched with source-tier citations post-completion.

**Core principle:** Selah is 100% functional without AI. The assistant is additive — it enhances study by synthesizing the app's pre-baked knowledge (252 characters, 294 themes, 14K+ Strong's entries, 344K cross-references, 479 narratives, 389 devotionals) into conversational responses.

---

## Section 1: Provider Abstraction Layer

### File Structure

```
src/lib/ai/
  providers/
    base.ts          — AiProviderAdapter interface + shared types
    anthropic.ts     — Claude implementation
    openai.ts        — OpenAI/GPT implementation
    google.ts        — Gemini implementation
    ollama.ts        — Ollama implementation (with model discovery)
  provider-factory.ts — resolves active provider from settings
```

### Interface

```typescript
interface AiProviderAdapter {
  id: string
  stream(messages: ChatMessage[], config: ModelConfig): AsyncIterable<string>
  testConnection(): Promise<{ ok: boolean; error?: string }>
  listModels?(): Promise<ModelInfo[]>  // optional, used by Ollama
}
```

Each provider adapter wraps its respective SDK (`@anthropic-ai/sdk`, `openai`, `@google/generative-ai`, and raw `fetch` for Ollama). All return a normalized `AsyncIterable<string>` regardless of how the underlying SDK handles streaming.

`provider-factory.ts` reads the active provider/model/key from the existing `getAIConfig()` in `lib/settings/queries.ts` and returns the correct adapter instance.

### Ollama Extras

- `listModels()` calls `GET http://{ollama_host}/api/tags` to discover locally pulled models.
- `testConnection()` pings the Ollama server and returns a meaningful error if it's down.

---

## Section 2: Adaptive Grounding Context Builder

### File Structure

```
src/lib/ai/
  grounding/
    context-builder.ts   — orchestrates context assembly
    extractors/
      reader.ts          — passage text, cross-refs, footnotes, commentary
      character.ts       — character profile, relationships, appearances
      theme.ts           — theme definition, passage density, related themes
      word-study.ts      — Strong's entry, concordance, usage
      study-builder.ts   — project items, assembled passages, annotations
```

### Grounding Request

```typescript
type GroundingRequest = {
  page: 'reader' | 'character' | 'theme' | 'word-study' | 'study-builder'
  context: ReaderContext | CharacterContext | ThemeContext | WordStudyContext | StudyBuilderContext
  query: string  // user's message, used for adaptive enrichment
}
```

### Adaptive Logic

1. **Always included:** The primary context for the current page (e.g., passage text for Reader, character profile for Characters page).
2. **Query-triggered enrichment:** Simple keyword/entity detection on the user's message to pull in additional data:
   - Mentions a character name -> pull character data
   - Mentions a theme/topic -> pull matching themes
   - Asks about a Greek/Hebrew word -> pull Strong's entry
   - Asks about connections/cross-references -> pull cross-ref chain
3. **Token budget:** Cap grounding context at ~4,000 tokens. Prioritize by relevance: primary context first, then enrichments ranked by match confidence. Truncate gracefully.

### System Prompt Structure

```
[Role] You are a Bible study assistant grounded in curated scholarship.
[Source tier rules] Distinguish between canon (Tier 1), scholarship (Tier 2),
  historical (Tier 3), and your own synthesis (Tier 4). Flag conjecture (Tier 5).
[Grounding context] {assembled context from extractors}
[User preferences] {audience level, commentary display setting}
```

The extractors reuse existing query functions from `lib/reader/queries.ts`, `lib/characters/queries.ts`, etc. — no duplicate data access logic.

---

## Section 3: API Routes & Streaming

### Route Structure

```
src/app/api/ai/
  send/route.ts              — main chat endpoint (POST, streaming)
  conversations/route.ts     — list saved conversations (GET)
  conversations/[id]/route.ts — get/delete a saved conversation (GET, DELETE)
  conversations/[id]/save/route.ts — save/pin an ephemeral conversation (POST)
  ollama/models/route.ts     — Ollama model discovery (GET)
  test-connection/route.ts   — provider connection test (GET)
```

### POST /api/ai/send

```typescript
// Request body
{
  messages: ChatMessage[]        // conversation history
  grounding: GroundingRequest    // current page + context IDs
  conversationId?: string        // if continuing a saved conversation
}

// Response: streaming via Server-Sent Events
//   data: {"type":"token","content":"..."}\n\n
//   data: {"type":"done","citations":[...]}\n\n
//   data: {"type":"error","message":"..."}\n\n
```

**Flow:**

1. Validate request, load provider via `provider-factory`.
2. Build grounding context via `ContextBuilder`.
3. Assemble system prompt + message history.
4. Call `provider.stream()`, pipe tokens to response as SSE.
5. On stream completion, run post-processing: extract source-tier citations from the full response.
6. Return a final `done` event with citation metadata.
7. If `conversationId` provided, append messages to existing conversation in DB.

### Conversation Persistence

Conversations are **ephemeral by default**. Messages live only in the client's state. `POST /api/ai/conversations/[id]/save` persists a conversation when the user explicitly pins it.

### GET /api/ai/ollama/models

- Proxies to Ollama's `/api/tags` endpoint using the configured host.
- Returns `{ models: [{ name, size, modified }] }`.
- Returns `{ error: "..." }` if Ollama is unreachable.

---

## Section 4: Client-Side Integration

### State Management

No new dependencies. Conversation state lives in a React context:

```
src/lib/ai/
  chat-context.tsx    — ChatProvider + useChatContext hook
```

```typescript
type ChatState = {
  messages: ChatMessage[]
  isStreaming: boolean
  groundingContext: GroundingRequest | null
  conversationId: string | null   // null = ephemeral
  citations: Citation[]           // populated after stream completes
}
```

### Wiring AIAssistantPanel.tsx

The panel is already built with message rendering, grounding context display, and save-to-journal action. The integration work:

1. Replace sample data with `useChatContext()` hook.
2. `onSend` -> `fetch('/api/ai/send')` using an EventSource-style reader on the response body.
3. Token chunks append to a streaming message in state.
4. On `done` event -> replace streaming message with final message + citations rendered as Tier pills.
5. Grounding context auto-populates from the current page via props passed by the parent page component.

### Page Integration

The AI panel is available on 5 pages: **Reader, Characters, Themes, Word Study, and Study Builder**.

Each page wraps its content with `ChatProvider`:

```tsx
// e.g., in ReaderView.tsx
<ChatProvider grounding={{ page: 'reader', context: { bookId, chapter, verse } }}>
  <ReaderContent />
  <AIAssistantPanel />
</ChatProvider>
```

`ChatProvider` updates grounding context as the user navigates (e.g., switching chapters, clicking a character). The panel's toggle button sits in the existing context drawer area.

Pages without AI (Home, Daily Bread, Journal, Settings) do not render the panel.

### Save-to-Journal Flow

- **One-click save:** Calls `POST /api/notes` with the AI message text, auto-detected anchors from grounding context, note type `insight`, source tier 4.
- **Long-press / secondary action:** Opens a lightweight modal pre-filled with the same data, letting the user change note type, edit text, and adjust anchors before saving.

---

## Section 5: Post-Processing & Citation Extraction

### File Structure

```
src/lib/ai/
  post-processing/
    citation-extractor.ts   — parses full response, returns Citation[]
    entity-matcher.ts       — fuzzy match against characters/themes (cached)
    reference-parser.ts     — Scripture reference regex + normalization
```

### Citation Types

| Type | Detection | Links to | Tier |
|------|-----------|----------|------|
| Scripture reference | Regex (e.g., "John 3:16", "Genesis 1:1-3") | Reader | 1 |
| Character mention | Entity matcher against cached character names | Character profile | 2 |
| Theme reference | Entity matcher against cached theme names | Theme page | 2 |
| Strong's reference | Pattern match on H/G numbers (e.g., "H1234") | Word Study | 2 |

### Entity Matcher Cache

Character names (252) and theme names (294) are loaded into an in-memory `Map<string, number>` (name -> id) on first use as a lazy singleton. ~550 entries total — trivial memory footprint. No DB round-trip per message.

```typescript
let characterNames: Map<string, number> | null = null
let themeNames: Map<string, number> | null = null

async function getCharacterNames(): Promise<Map<string, number>> {
  if (!characterNames) {
    characterNames = await loadAllCharacterNames()  // single DB query
  }
  return characterNames
}
```

### Response Tier Tagging

The full response is tagged as **Tier 4 (AI-Assisted)** by default. When the AI cites specific canon text or scholarship from the grounding context, those inline citations get their own tier pills. This preserves the source-tier transparency principle.

### Citation Format

```typescript
type Citation = {
  text: string          // matched text span
  tier: 1 | 2 | 3 | 4 | 5
  type: 'verse' | 'character' | 'theme' | 'strongs'
  link: string          // app route to navigate to
  startIndex: number    // position in response text
  endIndex: number
}
```

The client renders the response with inline citation pills at the marked positions, matching the existing `TierPill` component style.

---

## Section 6: Error Handling & Edge Cases

### Provider Errors

- **Invalid/expired API key:** Return `{"type":"error","message":"Invalid API key. Check your settings."}`. Don't stream partial content.
- **Rate limiting:** Return error with retry hint ("Rate limited. Try again in a moment.").
- **Ollama server down:** `testConnection()` catches this early. If it fails mid-stream, error event with "Ollama server is unreachable. Is it running?"
- **Network timeout:** 30-second timeout on stream. Error event on expiry.

### Grounding Failures

If context extraction fails (e.g., invalid book/chapter ID), fall back to a general-purpose system prompt without grounding. Chat still works, just less contextual.

### Token Limits

- Grounding context capped at ~4,000 tokens.
- Conversation history: send last 20 messages max. If longer, truncate oldest messages (keeping system prompt and most recent context).
- If the provider returns a context-length error, retry with halved history.

### No Provider Configured

The AI panel button is hidden/disabled if `getAIConfig()` returns no active provider. A prompt directs the user to the AI configuration section in Settings.

---

## Dependencies

New npm packages required:

- `@anthropic-ai/sdk` — Anthropic/Claude
- `openai` — OpenAI/GPT
- `@google/generative-ai` — Google/Gemini
- No package for Ollama (raw `fetch` against local API)

---

## Existing Infrastructure Leveraged

| Existing | Used By |
|----------|---------|
| `AiProvider` / `AiModel` tables | Provider factory, settings |
| `AiConversation` / `AiMessage` tables | Conversation persistence |
| `getAIConfig()` / `saveAIConfig()` | Provider resolution |
| `AIAssistantPanel.tsx` | Client UI (already styled) |
| `TierPill` component | Citation rendering |
| `lib/reader/queries.ts` | Reader grounding extractor |
| `lib/characters/queries.ts` | Character grounding extractor |
| `lib/themes/queries.ts` | Theme grounding extractor |
| `lib/word-study/queries.ts` | Word Study grounding extractor |
| `lib/study-builder/queries.ts` | Study Builder grounding extractor |
| 5-tier source system | Response tagging |
| Settings UI (AI section) | Provider configuration |
