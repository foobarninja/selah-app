<!-- refreshed: 2026-06-06 -->
# Architecture

**Analysis Date:** 2026-06-06

## System Overview

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                         Browser / Client Layer                            │
│   React Server Components (RSC) + Client Components ('use client')        │
│   `src/app/(shell)/*/page.tsx`  `src/app/(public)/*/page.tsx`             │
│   `src/app/(shell)/*/[Feature]Client.tsx`                                 │
└──────────────────────────────┬────────────────────────────────────────────┘
                               │ fetch / SSR hydration / SSE
┌──────────────────────────────▼────────────────────────────────────────────┐
│                      Next.js App Router (Node.js)                         │
│                                                                           │
│  Edge Middleware    Route Handlers         RSC Data Fetching              │
│  `src/middleware.ts`  `src/app/api/**/route.ts`  page.tsx server fns     │
└──────┬────────────────────────┬──────────────────────┬────────────────────┘
       │ cookie gate            │ business logic        │ direct DB
┌──────▼──────────┐   ┌────────▼─────────────────────────────────────────┐
│  Profile Auth   │   │                 Service Layer                    │
│ `src/lib/       │   │  `src/lib/reader/`       `src/lib/ai/`           │
│  profiles/      │   │  `src/lib/settings/`     `src/lib/daily-bread/`  │
│  active-profile │   │  `src/lib/profiles/`     `src/lib/journal/`      │
│  .ts`           │   │  `src/lib/study-builder/` `src/lib/export/`      │
└─────────────────┘   │  `src/lib/safety/`        `src/lib/seed/`        │
                       │  `src/lib/audit/`         `src/lib/version/`    │
                       │  `src/lib/backup/`        `src/lib/search/`     │
                       └───────────────────────────────┬──────────────────┘
                                                       │ Prisma ORM + raw better-sqlite3
                       ┌───────────────────────────────▼──────────────────┐
                       │           SQLite Database (`data/selah.db`)       │
                       │   Scripture content (pre-baked seed via HF)       │
                       │   User-local tables (notes, bookmarks, journals)  │
                       │   App settings, AI conversations                  │
                       └──────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | Key Files |
|-----------|----------------|-----------|
| Edge Middleware | Cookie-presence gate; redirect unauthenticated requests to `/profiles` | `src/middleware.ts` |
| Profile Auth | Validate active profile from HTTP-only cookie against DB | `src/lib/profiles/active-profile.ts` |
| RSC Page Layer | Server-render data, pass to Client components; zero client JS for static data | `src/app/(shell)/*/page.tsx` |
| Client Components | Interactive UI, chat streaming, state management | `src/app/(shell)/*/[Feature]Client.tsx` |
| Route Handlers | REST + SSE API endpoints; validate profile cookie before all mutations | `src/app/api/**/route.ts` |
| Service Layer | Business logic, query composition, data transformation | `src/lib/*/queries.ts`, `src/lib/*/` |
| AI Subsystem | Provider abstraction, grounding, system prompt, citation extraction | `src/lib/ai/` |
| Safety Subsystem | Keyword scan + model marker extraction for child-lock profiles | `src/lib/safety/` |
| Seed Engine | Merge user-local tables into new content DB on update | `src/lib/seed/merge-engine.ts` |
| Prisma Client | ORM with better-sqlite3 adapter; generated types in `src/generated/prisma/` | `src/lib/db.ts` |

## Pattern Overview

**Overall:** Next.js 15 App Router with React Server Components as the primary data-fetching layer, thin REST/SSE route handlers, and a co-located service layer (`src/lib/`) per feature domain.

**Key Characteristics:**
- Server Components fetch data directly via Prisma; no API round-trip for SSR paths
- Client Components receive fully-typed props from RSC; they interact with the server only for mutations and AI streaming
- Feature domains mirror both in `src/lib/<domain>/` (server logic) and `src/components/<domain>/` (UI) and `src/app/(shell)/<domain>/` (pages)
- Single SQLite database; Prisma ORM for typed queries; raw `better-sqlite3` for performance-sensitive paths (resurfacing, seed merge, settings bootstrap)
- Profiles are the primary multi-tenant boundary: all user-local data is scoped by `userId`

## Layers

**Edge Layer:**
- Purpose: Cookie-presence gate only; cannot touch DB (edge runtime)
- Location: `src/middleware.ts`
- Contains: Allowlist check, redirect logic
- Depends on: Nothing (pure cookie inspection)
- Used by: Every request to the Next.js server

**Presentation Layer (RSC):**
- Purpose: Server-render pages, compose data from multiple service calls in parallel
- Location: `src/app/(shell)/*/page.tsx`, `src/app/(public)/*/page.tsx`
- Contains: `async` server components, `Promise.all()` data fetches, prop composition
- Depends on: Service layer (`src/lib/`), profile auth (`src/lib/profiles/active-profile.ts`)
- Used by: Browser (SSR HTML + React hydration)

**Client Component Layer:**
- Purpose: Interactivity, local state, SSE consumption, form handling
- Location: `src/app/(shell)/*/[Feature]Client.tsx`, `src/components/<domain>/`
- Contains: `'use client'` components; hook-based state
- Depends on: Props from RSC; fetch calls to Route Handlers
- Used by: RSC pages (imported as leaf components)

**Route Handler Layer:**
- Purpose: REST + SSE API surface; validates profile, delegates to service layer
- Location: `src/app/api/**/route.ts`
- Contains: `GET`/`POST`/`PATCH`/`DELETE` exports; inline request validation
- Depends on: Service layer, `requireActiveProfileId()`, `prisma`
- Used by: Client components (fetch), external tools (MCP server)

**Service Layer:**
- Purpose: Feature-scoped business logic, query functions, data transformation
- Location: `src/lib/<domain>/queries.ts` and supporting files
- Contains: Async query functions returning typed data; no HTTP concerns
- Depends on: `src/lib/db.ts` (Prisma singleton), `src/lib/constants.ts`
- Used by: RSC pages, Route Handlers

**AI Subsystem:**
- Purpose: Multi-provider LLM integration with grounding, system prompt, streaming, post-processing
- Location: `src/lib/ai/`
- Contains: Provider adapters (`providers/`), grounding context builder (`grounding/`), system prompt builder, citation extractor (`post-processing/`), streaming hook (`use-chat-stream.ts`), provider factory
- Depends on: Service layer (for grounding data), settings, profile auth
- Used by: `/api/ai/send/route.ts`, `/api/ai/companion/stream/route.ts`

**Safety Subsystem:**
- Purpose: Two-layer child safety: keyword scan (sync) + model marker extraction (post-generation)
- Location: `src/lib/safety/`
- Contains: `scan.ts` (keyword taxonomy scan), `marker.ts` (strip model safety markers), `types.ts` (FlagLevel), `keyword-taxonomy.ts`
- Depends on: Nothing external
- Used by: Companion stream route, audit queries

## Data Flow

### Primary Reader Page Request

1. Browser requests `/reader/JHN/3` → middleware checks `selah-profile-id` cookie (`src/middleware.ts`)
2. `ReaderPage` RSC calls `requireActiveProfileId()` → validates cookie against DB (`src/lib/profiles/active-profile.ts:41`)
3. `Promise.all()` fetches: `getNarrativeContext`, `getTranslations`, `getDisplaySettings`, `getTranslationConfig`, `getStudyPreferences` (`src/app/(shell)/reader/[book]/[chapter]/page.tsx:32`)
4. Second `Promise.all()`: `getChapterText`, `getPassageContext`, `surfaceNotes` (`src/app/(shell)/reader/[book]/[chapter]/page.tsx:58`)
5. RSC renders `<ReaderClient>` with all data as props; `recordReading()` fires fire-and-forget (`src/lib/reader/history.ts`)
6. `ReaderClient.tsx` hydrates in browser; user sees verse text, commentary, themes, cross-refs

### AI Chat Request (non-companion)

1. Client `useChatStream` hook POSTs to `/api/ai/send` with `{messages, grounding, contextToggles}` (`src/lib/ai/use-chat-stream.ts`)
2. Route handler calls `requireActiveProfileId()`, then `getProvider()` (`src/lib/ai/provider-factory.ts`)
3. `buildGroundingContext(grounding, userId, toggles)` dispatches to page-specific extractor, enriches from query, applies toggles, assembles within 90,000-char budget (`src/lib/ai/grounding/context-builder.ts`)
4. `buildSystemPrompt(assembled, userId)` constructs XML-structured prompt with tier labels and few-shot example (`src/lib/ai/grounding/system-prompt.ts`)
5. `provider.stream(messages, modelConfig)` yields tokens; route handler re-emits SSE `{type:'token'}` frames
6. On completion: `extractCitations(fullResponse)` parses Scripture refs, Strongs numbers, entity mentions; emits `{type:'done', citations}`
7. Client `useChatStream` calls `onToken`/`onDone`/`onError` callbacks

### Companion Stream (devotional chat, child-lock aware)

1. POST `/api/ai/companion/stream` with `{devotionalId, userMessage}` (`src/app/api/ai/companion/stream/route.ts`)
2. `requireActiveProfileId()` → `getEffectiveAIConfig(userId)` (overrides model for child-lock profiles) (`src/lib/profiles/effective-ai-config.ts`)
3. `scanMessage(userMessage)` runs keyword scan synchronously (`src/lib/safety/scan.ts`)
4. Thread resolved or created (`src/lib/ai/companion/thread-store.ts`); message appended with flag level
5. `buildCompanionGrounding(devotional)` + `buildCompanionSystemPrompt(grounding)` build prompt
6. `provider.stream()` yields tokens → SSE; on done, `extractSafetyMarker(fullResponse)` strips model marker
7. Combined flag level (keyword + model marker) persisted if `childLock && auditPolicy !== 'none'`

### Seed Update Flow

1. Docker entrypoint or `/api/settings/restore` triggers `apply-seed-update.ts` (`scripts/ops/apply-seed-update.ts`)
2. New seed DB downloaded from Hugging Face (xz archive)
3. `mergeUserData(oldDbPath, newDbPath)` copies user-local tables into new DB (`src/lib/seed/merge-engine.ts`)
4. Atomic swap; server reloads

**State Management:**
- Server state: SQLite via Prisma (source of truth)
- Client state: React `useState`/`useRef` within Client Components; no global store
- Profile context: HTTP-only cookie (`selah-profile-id`); resolved per-request server-side
- AI streaming state: `useRef` AbortController + callback pattern in `useChatStream`

## Key Abstractions

**AiProviderAdapter (`src/lib/ai/providers/base.ts`):**
- Purpose: Unified interface for all LLM backends
- Methods: `stream(messages, config): AsyncIterable<string>`, `testConnection()`, `listModels?()`
- Implementations: `src/lib/ai/providers/anthropic.ts`, `ollama.ts`, `openai.ts`, `openrouter.ts`, `google.ts`

**ContextSection (`src/lib/ai/types.ts`):**
- Purpose: Named, togglable unit of grounding context with token estimate
- Fields: `id`, `label`, `content`, `estimatedTokens`, `defaultEnabled`
- Used by: `buildGroundingContext()`, `ContextControls` UI component

**GroundingRequest (`src/lib/ai/types.ts`):**
- Purpose: Typed union describing which page and context the AI assistant is grounding on
- Pages: `'reader' | 'character' | 'theme' | 'word-study' | 'study-builder'`
- Dispatched by: `buildGroundingContext()` to page-specific extractors in `src/lib/ai/grounding/extractors/`

**Profile + Child Lock (`src/lib/profiles/`):**
- Purpose: Multi-user isolation + parental controls
- `requireActiveProfileId()`: throws if no valid cookie → used in every route handler
- `getEffectiveAIConfig(userId)`: overrides provider/model for child-lock profiles

**Source Tier System:**
- Purpose: 5-tier transparency labeling for all AI responses; drives UI filters
- Tiers: 1=Canon, 2=Scholarship, 3=Historical, 4=AI-Assisted, 5=Conjecture
- Enforced in: system prompt instructions; rendered in `src/components/reader/TierPill.tsx`

## Entry Points

**Root layout (`src/app/layout.tsx`):**
- Wraps all pages with font variables and `ThemeProvider`
- No auth logic here

**Shell layout (`src/app/(shell)/layout.tsx`):**
- Calls `requireActiveProfileId()` — throws/redirects if unauthenticated
- Fetches profile list and AI config; renders `AppShell` with nav, profile switcher

**Public layout (`src/app/(public)/profiles/`):**
- No auth required; renders profile picker
- Auto-redirects to `/api/profiles/auto-select` for single profile with no PIN

**Instrumentation (`src/instrumentation.ts`):**
- Runs once on server start (Node.js runtime only)
- Starts `startAutoBackupScheduler()` from `src/lib/backup/scheduler.ts`

**Docker entrypoint (`docker-entrypoint.sh`):**
- Applies seed updates, runs DB migrations, starts Next.js server

## Architectural Constraints

- **Runtime split:** Middleware runs on edge (no DB access, no Node.js APIs). All other code runs Node.js. Do not import Node.js modules into middleware.
- **Prisma singleton:** `src/lib/db.ts` exports a single `prisma` instance with version-keyed cache invalidation for dev hot-reload. Do not instantiate `PrismaClient` elsewhere.
- **Raw SQLite usage:** `better-sqlite3` is used directly (bypassing Prisma) in `src/lib/resurfacing.ts`, `src/lib/settings/queries.ts` (bootstrap), and `src/lib/seed/merge-engine.ts` for performance or migration reasons. Mark such usages clearly.
- **Cookie security:** `Secure` flag is derived from the actual request scheme (via `X-Forwarded-Proto`), NOT from `NODE_ENV`. LAN HTTP installs must not lose their cookie. See `src/lib/profiles/active-profile.ts:isHttpsRequest`.
- **No global client state store:** Redux/Zustand/Context are not used. State lives in RSC props (server) or component-local `useState` (client).
- **Child-lock model override:** `getEffectiveAIConfig()` must be called (not `getAIConfig()`) in any route that handles child-lock profiles (companion, study-builder AI).
- **Circular imports:** None known; feature domains import from `src/lib/` and `src/components/` but not from `src/app/api/`.

## Anti-Patterns

### Calling `getAIConfig()` directly in child-lock-aware routes

**What happens:** Some routes call `getAIConfig()` directly instead of `getEffectiveAIConfig(userId)`.
**Why it's wrong:** Child-lock profiles have a `lockedProvider`/`lockedModel` that must override device defaults. Bypassing `getEffectiveAIConfig` lets child profiles use adult-approved models.
**Do this instead:** Always call `getEffectiveAIConfig(userId)` in routes used by companion/study-builder AI (`src/lib/profiles/effective-ai-config.ts`).

### Instantiating `PrismaClient` outside `src/lib/db.ts`

**What happens:** A route or lib file creates `new PrismaClient()` inline.
**Why it's wrong:** Creates multiple connection pools; breaks the schema-version cache invalidation in dev hot-reload.
**Do this instead:** Import `prisma` from `@/lib/db`.

### Using `process.env.NODE_ENV === 'production'` to set cookie `Secure` flag

**What happens:** `Secure: true` only in production, `Secure: false` in dev.
**Why it's wrong:** Home LAN deployments run HTTP in production; `Secure` cookies are withheld by the browser on HTTP, breaking auth.
**Do this instead:** Use `isHttpsRequest(scheme, forwardedProto)` from `src/lib/profiles/active-profile.ts`.

## Error Handling

**Strategy:** Fail fast at the route handler boundary; return typed JSON errors to the client.

**Patterns:**
- Route handlers return `new Response(JSON.stringify({error}), {status})` for client errors; log to `console.error` for server errors
- RSC pages call `notFound()` from `next/navigation` for invalid URL params
- `requireActiveProfileId()` throws `Error('no active profile')` — catch at route handler level and return 401
- AI streaming errors emit `{type:'error', message}` SSE event; client surfaces inline without breaking UI
- `sanitizeProviderError(err)` (`src/lib/ai/sanitize-error.ts`) strips internal detail before sending to client

## Cross-Cutting Concerns

**Authentication:** HTTP-only cookie (`selah-profile-id`); edge middleware checks presence; `requireActiveProfileId()` validates against DB in every route handler and RSC page.

**Multi-tenancy:** All user-local queries accept `userId` parameter; `USER_LOCAL_TABLES_FOR_CASCADE` in `src/lib/profiles/queries.ts` defines cascade-delete scope.

**Child Safety:** Two-layer — keyword scan (`src/lib/safety/scan.ts`) on user input + model safety marker extraction (`src/lib/safety/marker.ts`) on output. Audit log written to DB when `childLock && auditPolicy !== 'none'`. Safe model allowlist in `src/lib/safe-models/queries.ts`.

**Logging:** `console.error` / `console.log` in route handlers; no structured logging library.

**Validation:** Inline in route handlers (manual field checks); no schema validation library (no Zod).

**Exports:** `src/lib/export/` handles DOCX and Markdown generation for journals, collections, and AI conversations.

---

*Architecture analysis: 2026-06-06*
