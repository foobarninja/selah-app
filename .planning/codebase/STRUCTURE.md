# Codebase Structure

**Analysis Date:** 2026-06-06

## Directory Layout

```
selah-app/
├── src/
│   ├── app/                        # Next.js App Router root
│   │   ├── (public)/               # Routes accessible without auth cookie
│   │   │   └── profiles/           # Profile picker + new profile creation
│   │   ├── (shell)/                # Auth-gated routes (shell layout wraps all)
│   │   │   ├── layout.tsx          # Shell layout: auth gate + AppShell
│   │   │   ├── page.tsx            # Home page (RSC)
│   │   │   ├── HomeClient.tsx      # Home interactive layer
│   │   │   ├── reader/[book]/[chapter]/   # Bible reader
│   │   │   ├── daily-bread/        # Devotionals + series
│   │   │   ├── journal/[id]/       # Personal journal
│   │   │   ├── characters/[id]/    # Biblical character profiles
│   │   │   ├── themes/[id]/        # Theological themes
│   │   │   ├── word-study/[number]/# Strong's word study
│   │   │   ├── study-builder/      # Custom study project builder
│   │   │   └── settings/           # App + profile settings + audit dashboard
│   │   ├── api/                    # Route Handlers (REST + SSE)
│   │   │   ├── ai/                 # AI: send, companion/stream, conversations
│   │   │   ├── audit/              # Parent audit dashboard endpoints
│   │   │   ├── passage/            # Passage data (bookId/chapter/verse)
│   │   │   ├── read/               # Chapter text by translation
│   │   │   ├── profiles/           # Profile CRUD + auth cookie management
│   │   │   ├── settings/           # App settings, backup, export
│   │   │   ├── study-builder/      # Study project CRUD + assembly
│   │   │   ├── commentaries/       # Commentary parallel view
│   │   │   ├── devotionals/        # Devotional CRUD + search
│   │   │   ├── journals/           # Journal CRUD + export
│   │   │   ├── notes/              # User notes CRUD + surface
│   │   │   ├── characters/         # Character data
│   │   │   ├── themes/             # Theme data
│   │   │   ├── strongs/            # Strong's concordance
│   │   │   ├── xref/               # Cross-references
│   │   │   ├── search/             # Full-text search
│   │   │   ├── bookmarks/          # User bookmarks
│   │   │   ├── collections/        # User collections
│   │   │   ├── scene/              # Scene/narrative context
│   │   │   ├── safe-models/        # Kid-safe model list
│   │   │   └── version/            # App + seed version check
│   │   ├── layout.tsx              # Root layout (fonts, ThemeProvider)
│   │   ├── fonts.ts                # Font definitions (Cormorant, Source Sans, JetBrains Mono)
│   │   └── globals.css             # Global CSS (Tailwind + custom vars)
│   ├── components/                 # Shared React components
│   │   ├── ai-assistant/           # AIAssistantPanel, ContextControls, streaming UI
│   │   ├── reader/                 # ReaderView, ContextDrawer, TierPill, types.ts
│   │   ├── shell/                  # AppShell, MainNav, ProfileSwitcher, VersionBanner
│   │   ├── daily-bread/            # Devotional display components
│   │   ├── journal/                # Journal editor components
│   │   ├── characters/             # Character detail components
│   │   ├── themes/                 # Theme detail components
│   │   ├── word-study/             # Strong's word study UI
│   │   ├── study-builder/          # Study builder UI
│   │   ├── profiles/               # Profile picker + creation UI
│   │   ├── settings/               # Settings panels + types.ts
│   │   ├── home/                   # Home dashboard components
│   │   ├── ui/                     # Primitives: ToastProvider, PageTransition,
│   │   │                           #   ConfirmDialog, ResizablePanel, Skeleton
│   │   └── theme-provider.tsx      # CSS theme (dark/light) provider
│   ├── lib/                        # Server-side business logic (feature-scoped)
│   │   ├── ai/                     # AI subsystem
│   │   │   ├── providers/          # Adapters: anthropic, ollama, openai, openrouter, google
│   │   │   ├── grounding/          # context-builder, system-prompt, extractors/
│   │   │   ├── companion/          # Devotional companion: grounding, system-prompt, thread-store
│   │   │   ├── post-processing/    # citation-extractor, entity-matcher, reference-parser
│   │   │   ├── provider-factory.ts # `getProvider()` — reads settings, returns adapter
│   │   │   ├── types.ts            # Shared AI types (ChatMessage, ModelConfig, Citation, etc.)
│   │   │   ├── use-chat-stream.ts  # Client hook for SSE streaming
│   │   │   └── sanitize-error.ts   # Strips internal detail from provider errors
│   │   ├── profiles/               # Profile auth, CRUD, child-lock, PIN
│   │   │   ├── active-profile.ts   # requireActiveProfileId, cookie attach/clear
│   │   │   ├── effective-ai-config.ts # Child-lock aware AI config resolution
│   │   │   ├── queries.ts          # Profile CRUD + cascade-delete
│   │   │   └── pin.ts              # PIN hash/verify
│   │   ├── settings/               # App + user settings queries
│   │   │   ├── queries.ts          # getSetting/setSetting, getAIConfig, getStudyPreferences
│   │   │   └── user-settings.ts    # Per-user setting scope
│   │   ├── safety/                 # Child safety: keyword scan + model markers
│   │   │   ├── scan.ts             # scanMessage() — sync keyword taxonomy scan
│   │   │   ├── marker.ts           # extractSafetyMarker() — strip model [SAFETY:*] marker
│   │   │   ├── keyword-taxonomy.ts # Taxonomy of flagged patterns by FlagLevel
│   │   │   └── types.ts            # FlagLevel, FLAG_LEVEL_ORDER
│   │   ├── reader/                 # Bible reader queries
│   │   │   ├── queries.ts          # getChapterText, getPassageContext, getNarrativeContext
│   │   │   └── history.ts          # recordReading
│   │   ├── audit/                  # Parent audit dashboard queries
│   │   ├── backup/                 # Auto-backup scheduler + backup/restore logic
│   │   ├── seed/                   # Seed DB update engine
│   │   │   ├── merge-engine.ts     # mergeUserData() — user table migration into new seed
│   │   │   ├── user-tables.ts      # USER_LOCAL_TABLES, isSeedContentTable
│   │   │   └── manifest.ts         # Seed manifest parsing
│   │   ├── export/                 # DOCX + Markdown export
│   │   │   ├── docx/               # DOCX primitives, scripture, tier-pills, markdown
│   │   │   ├── markdown/           # Markdown primitives, renderers
│   │   │   ├── targets/            # ai-conversation.ts, collection.ts
│   │   │   ├── formatters.ts       # Shared formatters
│   │   │   ├── constants.ts        # Export constants
│   │   │   └── index.ts            # Re-exports all public export functions
│   │   ├── safe-models/            # Kid-safe model allowlist (queries.ts)
│   │   ├── version/                # Semver comparison (compare.ts)
│   │   ├── daily-bread/            # Devotional queries
│   │   ├── home/                   # Home page queries (recent history, notes, daily bread)
│   │   ├── journal/                # Journal CRUD queries
│   │   ├── characters/             # Character queries
│   │   ├── themes/                 # Theme queries
│   │   ├── word-study/             # Strong's queries
│   │   ├── study-builder/          # Study project queries + assembly
│   │   ├── search/                 # Full-text search queries
│   │   ├── resurfacing.ts          # surfaceNotes() — 5-channel note resurfacing engine
│   │   ├── db.ts                   # Prisma singleton (better-sqlite3 adapter)
│   │   ├── constants.ts            # BOOK_NAMES, BOOK_CHAPTERS, tier constants
│   │   └── crypto.ts               # encryptValue / decryptValue for API keys
│   ├── generated/                  # Prisma-generated client (DO NOT EDIT)
│   │   └── prisma/                 # Generated types and client code
│   ├── middleware.ts               # Edge middleware: cookie gate
│   └── instrumentation.ts          # Server startup hook: auto-backup scheduler
├── prisma/
│   └── schema.prisma               # Database schema (SQLite, better-sqlite3 adapter)
├── scripts/
│   ├── ops/                        # Operational scripts (seed update, version check)
│   │   ├── apply-seed-update.ts    # Download + merge new seed DB
│   │   ├── check-app-update.ts     # Check GitHub releases for new app version
│   │   └── check-seed-update.ts    # Check HF for new seed DB version
│   ├── release/                    # Release pipeline scripts
│   │   ├── prepare-seed-db.ts      # Build and compress seed DB for HF upload
│   │   ├── publish-seed.ts         # Upload seed DB to Hugging Face
│   │   └── scrub-for-seed.ts       # Strip user data before seed publish
│   └── etl/                        # ETL scripts for content ingestion
├── mcp/                            # MCP server (separate Node.js process)
│   ├── lib/                        # MCP server core
│   └── tools/                      # 19 MCP tool implementations
├── tests/                          # Vitest test suite
│   ├── lib/                        # Unit tests mirroring src/lib/ structure
│   ├── api/                        # API route handler tests
│   ├── components/                 # Component tests
│   ├── safety/                     # Safety scan + marker tests
│   └── scripts/                    # Script tests
├── data/                           # Runtime data (gitignored)
│   └── selah.db                    # SQLite database
├── pipeline/                       # Content pipeline (ETL orchestration)
├── eval/                           # Evaluation datasets for commentary/AI
├── docs/                           # Design docs, specs, plans
├── .planning/                      # GSD planning artifacts
│   └── codebase/                   # Codebase maps (ARCHITECTURE.md, STACK.md, etc.)
├── .github/workflows/              # CI/CD pipelines
├── docker-compose.yml              # Production deployment (port 4610)
├── Dockerfile                      # Multi-arch image build
├── docker-entrypoint.sh            # Container startup: seed update + migration + server
├── next.config.ts                  # Next.js config (standalone output, serverExternalPackages)
├── prisma.config.ts                # Prisma config
├── vitest.config.ts                # Vitest config
└── package.json                    # Dependencies and scripts
```

## Directory Purposes

**`src/app/(shell)/`:**
- Purpose: All auth-gated page routes
- Pattern: Each feature has `page.tsx` (RSC data fetch) + `[Feature]Client.tsx` (interactive layer)
- Key files: `layout.tsx` (shell auth gate), `page.tsx` (home)

**`src/app/(public)/`:**
- Purpose: Profile picker and new profile creation — accessible without auth cookie
- Key files: `profiles/page.tsx`, `profiles/ProfilesClient.tsx`, `profiles/new/`

**`src/app/api/`:**
- Purpose: All REST and SSE endpoints
- Pattern: Each directory has `route.ts` exporting HTTP method handlers
- Sub-pattern: Dynamic segments use `[param]` folder names (e.g., `[id]`, `[bookId]`, `[chapter]`)

**`src/lib/<domain>/`:**
- Purpose: Feature-scoped server logic; each domain owns its queries and helpers
- Pattern: `queries.ts` is the primary export; additional files for sub-concerns (e.g., `history.ts`, `pin.ts`)
- Rule: No HTTP imports; no `NextRequest`; pure TypeScript + Prisma

**`src/components/<domain>/`:**
- Purpose: React components scoped to a feature
- Pattern: Feature-specific components in named subdirectory; `src/components/ui/` for cross-cutting primitives

**`src/generated/prisma/`:**
- Purpose: Prisma-generated client — never edit manually
- Generated: Yes, via `prisma generate`
- Committed: Yes (for type safety without build step in CI)

**`mcp/`:**
- Purpose: Standalone MCP server for Claude Desktop integration; separate git history and node_modules
- Contains: 19 authoring + research tools; connects directly to `data/selah.db` via `better-sqlite3`

**`scripts/`:**
- Purpose: Non-web scripts (ops, release pipeline, ETL)
- Run via: `npm run` targets or directly with `tsx`

## Naming Conventions

**Files:**
- Page files: `page.tsx` (RSC), `[Feature]Client.tsx` (client component)
- Route handlers: `route.ts` in API directories
- Query modules: `queries.ts` within each lib domain
- Types: `types.ts` at domain root (both `src/lib/<domain>/` and `src/components/<domain>/`)
- Hooks: `use-<name>.ts` (kebab-case with `use-` prefix)
- Adapters/implementations: `<provider>.ts` (e.g., `anthropic.ts`, `ollama.ts`)

**Directories:**
- Route groups: `(shell)`, `(public)` — parentheses indicate layout group, not URL segment
- Dynamic segments: `[param]` — singular, lowercase (e.g., `[book]`, `[chapter]`, `[id]`)
- Feature libs: kebab-case matching route name (e.g., `daily-bread/`, `word-study/`, `study-builder/`)

**TypeScript:**
- Interfaces: PascalCase (e.g., `GroundingRequest`, `AiProviderAdapter`, `MergeReport`)
- Functions: camelCase
- Constants: SCREAMING_SNAKE_CASE (e.g., `BOOK_NAMES`, `MAX_CONTEXT_CHARS`)
- Prisma models: PascalCase in schema, accessed via `prisma.<camelCase>` (e.g., `prisma.userProfile`)

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx` — Root HTML shell, fonts, ThemeProvider
- `src/app/(shell)/layout.tsx` — Auth gate + AppShell for all protected routes
- `src/app/(public)/profiles/page.tsx` — Profile picker (unauthenticated entry)
- `src/instrumentation.ts` — Server startup hook

**Authentication:**
- `src/middleware.ts` — Edge cookie check
- `src/lib/profiles/active-profile.ts` — `requireActiveProfileId()`, cookie management

**Database:**
- `src/lib/db.ts` — Prisma singleton (import `prisma` from here)
- `prisma/schema.prisma` — Schema definition

**AI System:**
- `src/lib/ai/provider-factory.ts` — `getProvider()` entry point
- `src/lib/ai/providers/base.ts` — `AiProviderAdapter` interface
- `src/lib/ai/grounding/context-builder.ts` — `buildGroundingContext()`
- `src/lib/ai/grounding/system-prompt.ts` — `buildSystemPrompt()`
- `src/lib/ai/types.ts` — All AI-related TypeScript types
- `src/lib/ai/use-chat-stream.ts` — Client SSE streaming hook
- `src/app/api/ai/send/route.ts` — Main AI chat endpoint
- `src/app/api/ai/companion/stream/route.ts` — Companion (devotional) chat SSE

**Safety:**
- `src/lib/safety/scan.ts` — `scanMessage()` keyword scan
- `src/lib/safety/marker.ts` — `extractSafetyMarker()` model output scan
- `src/lib/profiles/effective-ai-config.ts` — Child-lock model override

**Constants:**
- `src/lib/constants.ts` — `BOOK_NAMES`, `BOOK_CHAPTERS`, `CURATED_COMMENTARY_SOURCES`, tier constants

## Where to Add New Code

**New authenticated page/feature:**
1. RSC page: `src/app/(shell)/<feature>/page.tsx`
2. Client component: `src/app/(shell)/<feature>/[Feature]Client.tsx`
3. Business logic: `src/lib/<feature>/queries.ts`
4. UI components: `src/components/<feature>/`
5. API routes: `src/app/api/<feature>/route.ts`
6. Tests: `tests/lib/<feature>/`, `tests/api/<feature>/`

**New API route:**
- `src/app/api/<domain>/[param]/route.ts`
- Export `GET`, `POST`, `PATCH`, or `DELETE`
- First line: `const userId = await requireActiveProfileId()` (or return 401)

**New AI provider:**
- `src/lib/ai/providers/<provider>.ts` implementing `AiProviderAdapter`
- Register in `src/lib/ai/provider-factory.ts` switch statement

**New grounding extractor (new page type):**
- `src/lib/ai/grounding/extractors/<page>.ts` returning `ContextSection[]`
- Register in `src/lib/ai/grounding/context-builder.ts` switch
- Add to `GroundingRequest` page union in `src/lib/ai/types.ts`

**New shared UI primitive:**
- `src/components/ui/<ComponentName>.tsx`

**New utility shared across lib domains:**
- `src/lib/constants.ts` for constants
- New file `src/lib/<util-name>.ts` for logic

**New operational script:**
- `scripts/ops/<script-name>.ts` for runtime ops (seed, update checks)
- `scripts/release/<script-name>.ts` for release pipeline steps

## Special Directories

**`data/`:**
- Purpose: Runtime SQLite database (`selah.db`) and sources
- Generated: Yes (at runtime / seed install)
- Committed: No (gitignored)

**`backups/`:**
- Purpose: Auto-backup archives created by scheduler
- Generated: Yes
- Committed: No

**`src/generated/`:**
- Purpose: Prisma-generated TypeScript client
- Generated: Yes (`prisma generate`)
- Committed: Yes

**`.planning/`:**
- Purpose: GSD planning artifacts (phase plans, codebase maps)
- Generated: By Claude Code GSD commands
- Committed: Yes

**`mcp/`:**
- Purpose: Standalone MCP authoring server; independent Node project
- Generated: No (hand-authored)
- Committed: Yes (has its own `.git` — submodule-adjacent but not a formal submodule)

**`eval/`:**
- Purpose: Evaluation datasets and commentary comparison artifacts
- Generated: Partially (eval outputs)
- Committed: Yes

---

*Structure analysis: 2026-06-06*
