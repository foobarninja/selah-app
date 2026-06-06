# Coding Conventions

**Analysis Date:** 2026-06-06

## Naming Patterns

**Files:**
- React components: PascalCase `.tsx` — `AiAssistantPanel.tsx`, `ConfirmDialog.tsx`, `JournalPicker.tsx`
- Library modules: camelCase `.ts` — `system-prompt.ts`, `active-profile.ts`, `sanitize-error.ts`
- Next.js route handlers: `route.ts` (Next.js convention, always)
- Type-only files: `types.ts` (flat, co-located with consuming code)
- Index re-export barrels: `index.ts`

**Functions:**
- camelCase for all functions: `buildCompanionSystemPrompt`, `requireActiveProfileId`, `sanitizeProviderError`
- `get*` prefix for read-only queries: `getActiveProfileId`, `getSetting`, `getJournalEntries`
- `require*` prefix for guard functions that throw on failure: `requireActiveProfileId`, `requireCallerProfile`
- `build*` prefix for pure constructors (no I/O): `buildCompanionGrounding`, `buildSystemPrompt`
- `create*` / `update*` / `delete*` / `list*` for CRUD: `createProfile`, `updateProfile`, `deleteProfile`, `listProfiles`
- `attach*` / `clear*` / `mark*` for state-mutation helpers: `attachActiveProfileCookie`, `clearActiveProfileCookie`, `markDefault`

**Variables:**
- camelCase throughout: `userId`, `dbPath`, `providerSetting`
- Constants: UPPER_SNAKE_CASE — `MAX_PROFILES`, `STREAM_TIMEOUT_MS`, `PROFILE_COOKIE_NAME`
- Exported constant arrays/objects: UPPER_SNAKE_CASE — `USER_LOCAL_TABLES_FOR_CASCADE`, `KEYWORD_TAXONOMY`

**Types & Interfaces:**
- PascalCase: `ProfileRecord`, `CallerProfileLike`, `ChatMessage`, `ModelConfig`, `StreamEvent`
- `*Like` suffix for structural duck-type shapes used in tests: `CallerProfileLike`
- Discriminated union types use `type` field: `StreamEvent`, `PendingSave`
- Export interfaces from `types.ts` co-located with their domain folder

## Code Style

**Formatting:**
- No Prettier config present; formatting follows ESLint/Next defaults
- 2-space indentation (observed throughout)
- Single quotes for imports; double quotes inside JSX string attributes

**Linting:**
- ESLint 9 via `eslint.config.mjs`
- Config: `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
- Run: `npm run lint`

**TypeScript:**
- `strict: true` in `tsconfig.json` — no `any` implicitly permitted
- `as any` is acceptable in tests for fixture/mock shorthand (documented with comment)
- `as unknown as T` used for safe runtime casts: `globalThis as unknown as { prisma?: unknown }`
- `type` imports preferred for pure type-only imports: `import type { Foo } from '...'`

## Import Organization

**Order (observed pattern):**
1. Node built-ins (`crypto`, `fs`, `os`, `path`) — `import { randomUUID } from 'crypto'`
2. Framework imports (`next/server`, `next/headers`, `react`)
3. Third-party packages (`better-sqlite3`, `docx`, `prisma`)
4. Internal absolute imports via `@/` alias (`@/lib/db`, `@/lib/profiles/queries`)
5. Relative imports (sibling `./types`, `./pin`)

**Path Aliases:**
- `@/` maps to `./src/` — use for all cross-directory imports from `src/`
- Relative imports only for co-located files in the same directory

## Error Handling

**API Routes:**
- Auth guard pattern: wrap `requireActiveProfileId()` in `try/catch`, return `401` on failure
- Input validation: manual checks on `body.*` fields, return `400` with `{ error: 'message' }` JSON
- HTTP status codes: `200` default, `201` for created, `400` bad input, `401` unauthorized, `409` conflict, `500` implicit on unhandled
- Provider errors: always funneled through `sanitizeProviderError()` before sending to client — raw error messages MUST NOT reach the client (may contain API keys)

**Library Code:**
- Pure functions: throw `Error` with descriptive message — caller decides how to surface it
- Guard functions (`require*`): throw synchronously — `throw new Error('no active profile')`
- DB queries: let Prisma errors propagate naturally; callers wrap in try/catch where needed
- Empty/null returns: `return null` for optional lookups, never throw on "not found" in `get*` helpers

**Streaming (SSE):**
- Error events serialized as `{ type: 'error', message: string }` SSE frames
- `sanitizeProviderError(err)` always applied before encoding error message
- Timeout errors handled with `clearTimeout` + close controller

## Logging

**Framework:** `console` (no structured logger)

**Patterns:**
- Errors logged with prefix bracket tag: `console.error('[ai/send] provider error:', ...)`
- Only server-side errors logged; never user data or API keys
- Log the raw `err.message` server-side; send sanitized version to client

## Comments

**When to Comment:**
- File-level header comment on every lib module explaining purpose and design rationale
- Cross-references to spec docs and test harnesses by file path in header comments
- Explain non-obvious constraints with inline comment (e.g. why Secure cookie flag is derived from scheme not NODE_ENV)
- `// NOTE:` prefix for important gotchas developers must not miss

**JSDoc/TSDoc:**
- Used sparingly for exported utility functions in `lib/export/`, `lib/ai/types.ts`
- JSDoc `/** */` on interface members when clarification needed
- Not used on React components or route handlers

**Code Markers:**
- `// ─────────────...` section dividers used in test files to separate logical blocks
- `// TODO:` / `// FIXME:` absent in main source (reserved for known issues)

## Function Design

**Size:** Functions are small and single-purpose; route handlers ≤ ~125 lines

**Parameters:**
- Prefer named object params for 3+ args: `createProfile({ name, avatarColor, pin })`
- Primitives for 1-2 args: `hashPin(pin: string)`, `canModifyProfile(caller, target)`

**Return Values:**
- Async functions return `Promise<T>` — always `await`-able
- Streaming: return `AsyncIterable<string>` from provider adapters (see `src/lib/ai/providers/base.ts`)
- Route handlers return `NextResponse.json(...)` or `new Response(stream, { headers })`

## Module Design

**Exports:**
- Named exports only — no default exports in `lib/` modules
- React components use default export (Next.js page convention) or named export from component files
- `src/components/ai-assistant/index.ts` barrel re-exports public surface

**Barrel Files:**
- Used selectively: `src/components/ai-assistant/index.ts` exists; most lib modules export directly
- Do NOT create barrel files for `src/lib/` — import from specific module paths

## Inline Styles (Components)

- Inline `style={{}}` props used heavily in complex components (`AiAssistantPanel.tsx`)
- CSS custom properties (`var(--selah-font-display)`, `var(--selah-gold-300)`) for theming
- Tailwind utility classes used alongside inline styles for layout (`flex`, `gap-1.5`)
- Design token names: `--selah-{palette}-{shade}` (e.g. `--selah-terra-800`, `--selah-sky-400`)

---

*Convention analysis: 2026-06-06*
