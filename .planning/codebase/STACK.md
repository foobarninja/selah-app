# Technology Stack

**Analysis Date:** 2026-06-06

## Languages

**Primary:**
- TypeScript 5.x - All application code, scripts, MCP server
- TSX/JSX - React UI components (`src/components/`, `src/app/`)

**Secondary:**
- SQL - Schema defined in `bible-app-schema.sql`, migrations in `prisma/migrations/`
- CSS - Tailwind utility classes in `src/app/globals.css`

## Runtime

**Environment:**
- Node.js 22 (Alpine) — specified in `Dockerfile` (`FROM node:22-alpine`)
- Target: ES2017 (`tsconfig.json`)

**Package Manager:**
- npm
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.2.2 — App Router, standalone output, SSR + API routes
  - Config: `next.config.ts` (output: `'standalone'`, `serverExternalPackages: ['better-sqlite3']`)
- React 19.2.4 — UI rendering

**Testing:**
- Vitest 4.1.4 — test runner
  - Config: `vitest.config.ts` (node environment, `tests/**/*.test.ts`)
  - UI: `@vitest/ui` 4.1.4

**Build/Dev:**
- Tailwind CSS 4 — utility-first CSS, config via `@tailwindcss/postcss`
- PostCSS — config: `postcss.config.mjs`
- `tsx` 4.21.0 — TypeScript execution for scripts (also installed at runtime in Docker for seed scripts)
- ESLint 9 — config: `eslint.config.mjs`, extended with `eslint-config-next`

## Key Dependencies

**Database ORM:**
- `prisma` 7.6.0 + `@prisma/client` 7.6.0 — schema: `prisma/schema.prisma`, generated client: `src/generated/prisma/`
- `@prisma/adapter-better-sqlite3` 7.6.0 — SQLite adapter
- `better-sqlite3` 12.8.0 — native SQLite driver, externalized from Next.js bundler

**AI Providers (multi-adapter):**
- `@anthropic-ai/sdk` 0.82.0 — Claude API adapter (`src/lib/ai/providers/anthropic.ts`)
- `@google/generative-ai` 0.24.1 — Gemini API adapter (`src/lib/ai/providers/google.ts`)
- `openai` 6.33.0 — OpenAI + OpenRouter adapters (`src/lib/ai/providers/openai.ts`, `openrouter.ts`)
- Ollama — local LLM via raw HTTP to `/api/chat` (`src/lib/ai/providers/ollama.ts`, no SDK)

**Document Export:**
- `docx` 9.6.1 — DOCX export (`src/lib/export/docx/`)

**UI Utilities:**
- `lucide-react` 1.7.0 — icon library
- `@dnd-kit/core` 6.3.1 + `@dnd-kit/sortable` 10.0.0 + `@dnd-kit/utilities` 3.2.2 — drag-and-drop
- `react-markdown` 10.1.0 + `remark-gfm` 4.0.1 — markdown rendering in AI chat

**Security:**
- `bcryptjs` 3.0.3 — PIN hashing for user profiles
- Node `crypto` (built-in) — AES-256-GCM encryption for stored API keys (`src/lib/crypto.ts`)

**Infrastructure / Scripts:**
- `@huggingface/hub` 2.11.0 (devDep) — seed database publishing to Hugging Face (`scripts/release/publish-seed.ts`)
- `undici` 8.1.0 (devDep) — custom HTTP agent with extended timeouts for HF uploads
- `dotenv` 17.4.0 — env loading in scripts and `prisma.config.ts`

**MCP Server** (separate workspace at `mcp/`):
- `@modelcontextprotocol/sdk` 1.0.4 — MCP protocol implementation
- `better-sqlite3` 12.8.0 — direct SQLite access (no Prisma)
- `zod` 3.23.8 — input validation for MCP tools

## Configuration

**Environment:**
- `DATABASE_URL` — SQLite file path, e.g. `file:/app/data/selah.db`
- `ENCRYPTION_SECRET` — AES-256-GCM key derivation for stored API keys (falls back to `DATABASE_URL`)
- `NODE_ENV` — standard Next.js flag
- `SELAH_AUTO_UPDATE_SEED` — set to `1` to auto-apply seed updates on startup (default in Docker)
- `HF_TOKEN` — Hugging Face write token for seed publishing (release-time only)
- `APP_VERSION` — baked into Docker image at build time via `--build-arg`

**Prisma:**
- Config: `prisma.config.ts` (schema: `prisma/schema.prisma`, migrations: `prisma/migrations/`)
- Client generated to: `src/generated/prisma/`

**TypeScript:**
- Path alias: `@/*` → `./src/*` (tsconfig.json + vitest.config.ts)
- Strict mode enabled

**Build:**
- `next.config.ts` — standalone output mode (produces self-contained `./next/standalone`)
- `Dockerfile` — multi-stage: deps → builder → runner (node:22-alpine)
- `docker-compose.yml` — image: `ghcr.io/foobarninja/selah-app:latest`, port 4610

## Platform Requirements

**Development:**
- Node.js 22+
- SQLite database at `data/selah.db` (initial DB downloaded from Hugging Face)
- Optional: Ollama running locally for local LLM support

**Production:**
- Docker container (self-hosted / home LAN)
- Port 4610 exposed
- Volume mounts: `selah-data:/app/data`, `selah-backups:/app/backups`
- Registry: `ghcr.io/foobarninja/selah-app:latest`
- xz utility installed in container for seed decompression

---

*Stack analysis: 2026-06-06*
