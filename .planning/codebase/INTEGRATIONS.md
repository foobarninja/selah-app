# External Integrations

**Analysis Date:** 2026-06-06

## APIs & External Services

**AI Providers (user-configurable, all accessed from server-side route handlers):**

- **Anthropic Claude** — conversational AI and study assistant
  - SDK: `@anthropic-ai/sdk` 0.82.0
  - Adapter: `src/lib/ai/providers/anthropic.ts`
  - Auth: API key stored encrypted in DB (`ai_api_key_anthropic` setting), decrypted at runtime
  - Endpoint: Anthropic default (SDK-managed)
  - Note: Sampling params (temp, top_p, etc.) must be omitted for Claude 4.5+ via OpenRouter

- **Google Gemini** — conversational AI
  - SDK: `@google/generative-ai` 0.24.1
  - Adapter: `src/lib/ai/providers/google.ts`
  - Auth: API key stored encrypted in DB (`ai_api_key_google` setting)

- **OpenAI** — conversational AI (also used for custom OpenAI-compatible endpoints)
  - SDK: `openai` 6.33.0
  - Adapter: `src/lib/ai/providers/openai.ts`
  - Auth: API key stored encrypted in DB (`ai_api_key_openai` setting)
  - Custom base URL: configurable via `custom_api_url` DB setting

- **OpenRouter** — multi-model routing service
  - SDK: `openai` 6.33.0 (with `baseURL: 'https://openrouter.ai/api/v1'`)
  - Adapter: `src/lib/ai/providers/openrouter.ts`
  - Auth: API key stored encrypted in DB (`ai_api_key_openrouter` setting)
  - Headers: `HTTP-Referer: https://selah.app`, `X-Title: Selah Bible Study`
  - Endpoint: `https://openrouter.ai/api/v1`
  - Model listing: `GET https://openrouter.ai/api/v1/models`

- **Ollama** (local LLM) — self-hosted models, no cloud dependency
  - SDK: none (raw HTTP fetch)
  - Adapter: `src/lib/ai/providers/ollama.ts`
  - Endpoint: configurable via `ollama_url` DB setting (default: `http://localhost:11434`)
  - Auth: none
  - Endpoints used: `/api/chat` (streaming), `/api/tags` (model discovery + health check)

**Provider selection:** `src/lib/ai/provider-factory.ts` reads active provider/model from DB settings and lazy-imports the appropriate adapter.

**Hugging Face Datasets** — seed database distribution
  - SDK: `@huggingface/hub` 2.11.0 (devDep, release-time only)
  - Dataset: `foooobear/selah-db`
  - Auth: `HF_TOKEN` env var (write-scoped, release only; read is public)
  - Manifest URL: `https://huggingface.co/datasets/foooobear/selah-db/resolve/main/manifest.json`
  - Used by: `scripts/release/publish-seed.ts` (upload), `scripts/ops/check-seed-update.ts` (check), `scripts/ops/apply-seed-update.ts` (download + apply)
  - Transport: custom `undici` agent (45-min timeout) to handle large xz uploads via HF's xet backend

**GitHub Container Registry** — Docker image distribution
  - Image: `ghcr.io/foobarninja/selah-app:latest`
  - Used by: `docker-compose.yml` for self-hosted deployments

**GitHub Releases API** — in-app update banner
  - Endpoint: GitHub API (fetched by `src/app/api/version/check/` route)
  - Auth: none (public releases endpoint)
  - Semver comparison: `src/lib/version/compare.ts`

## Data Storage

**Databases:**
- **SQLite** (primary, sole datastore)
  - File: `data/selah.db` (dev) / `/app/data/selah.db` (Docker volume)
  - ORM: Prisma 7.6.0 with `@prisma/adapter-better-sqlite3`
  - Schema: `prisma/schema.prisma`
  - Connection: `DATABASE_URL` env var → `src/lib/db.ts` (singleton with schema-version cache-busting)
  - MCP server accesses the same file directly via `better-sqlite3` (no Prisma) from `mcp/server.ts`

**File Storage:**
- Local filesystem only
  - DB backups: `/app/backups/` (Docker volume `selah-backups`)
  - Seed artifacts: `data/selah-seed.db.xz`, `data/manifest.json` (release-time)
  - Export files: written to disk and served for download (DOCX, markdown via `src/lib/export/`)

**Caching:**
- None (no Redis, no external cache)
- In-process: Prisma client singleton reused across Next.js requests (`src/lib/db.ts`, invalidated by `SCHEMA_VERSION` constant)

## Authentication & Identity

**Auth Provider:**
- Custom — no third-party auth service
- Implementation: local user profiles with optional PIN (`bcryptjs` hashing)
  - Profile selection: `src/lib/profiles/active-profile.ts`
  - Cookie: `selah-profile-id` (HTTP-only, `sameSite: strict`)
  - `Secure` flag derived from request scheme (X-Forwarded-Proto aware), NOT from `NODE_ENV`
  - Middleware guard: `src/middleware.ts` — redirects to `/profiles` when cookie absent
  - Profile PIN: bcrypt hash stored in `user_profiles.pin_hash`

**API Key Security:**
- AI provider keys stored AES-256-GCM encrypted in the SQLite DB (`app_settings` table)
- Encryption: `src/lib/crypto.ts` — key derived from `ENCRYPTION_SECRET` env (falls back to `DATABASE_URL`)

## Monitoring & Observability

**Error Tracking:**
- None (no Sentry, Datadog, or similar)

**Logs:**
- `console.log` / `console.error` to stdout (captured by Docker logs)
- Seed check/apply operations log prefixed messages: `[seed-check]`, `[publish]`
- Backup scheduler logs to stdout from `src/lib/backup/scheduler.ts`

**Health Check:**
- Docker `HEALTHCHECK`: `wget --spider http://localhost:4610/` every 30s
- API health endpoint: `GET /api/health` (allow-listed in middleware)

## CI/CD & Deployment

**Hosting:**
- Self-hosted Docker container on home LAN
- HTTP (not HTTPS) — private IP, port 4610
- Note: Secure cookie flag intentionally scheme-derived, not NODE_ENV-derived (supports HTTP LAN + HTTPS reverse proxy)

**Docker Registry:**
- `ghcr.io/foobarninja/selah-app:latest` (multi-arch: linux/amd64, linux/arm64)
- Build override: `docker-compose.override.yml.example` for local source builds

**CI Pipeline:**
- Not detected in repo (no `.github/workflows/` visible)
- Release process documented in `RELEASING.md`

## Environment Configuration

**Required env vars (runtime):**
- `DATABASE_URL` — SQLite file path (`file:/app/data/selah.db`)
- `NODE_ENV` — `production` in Docker
- `ENCRYPTION_SECRET` — preferred; falls back to `DATABASE_URL` for key derivation

**Optional env vars (runtime):**
- `SELAH_AUTO_UPDATE_SEED` — set `1` to auto-apply seed on startup (Docker default)
- `APP_VERSION` — baked at build time; missing = `-dev` build (skips remote version check)

**Release-time only:**
- `HF_TOKEN` — Hugging Face write token for `npm run seed:publish`

**Secrets location:**
- AI API keys: encrypted in SQLite `app_settings` table (not in env)
- HF token: `.env` file or env var (release workflow only, not shipped in image)
- No `.env` file committed; Docker compose sets vars inline

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- None detected (all AI calls are request-response from user action)

## MCP Server

**Location:** `mcp/` (separate Node.js package, not part of Next.js app)
- Protocol: Model Context Protocol via `@modelcontextprotocol/sdk` 1.0.4
- Purpose: 19-tool authoring + research interface for Claude Desktop
- DB access: Direct `better-sqlite3` (same `data/selah.db` file)
- Startup: `tsx mcp/server.ts` (wired to Claude Desktop config externally)

---

*Integration audit: 2026-06-06*
