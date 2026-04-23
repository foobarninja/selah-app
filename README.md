# Selah

*For Chris — a brother in life, a brother in Christ. Built with love, inspired by your walk.*

A self-hosted Bible study app with pre-baked contextual knowledge. Everything runs on your machine — no accounts, no cloud, no tracking.

## Features

- Scripture reader with parallel translations, Strong's numbers, and footnotes
- Five-lens context system: Scene Cast, Themes, Climate, Cross-references, and Commentary
- 250+ character profiles with emotional arcs, faith journeys, and modern parallels
- 290+ theological themes with scholarly definitions and modern framing
- Study Builder — assemble passages, characters, themes, and notes into study projects
- Journal with multi-anchor notes and a resurfacing engine that reconnects past reflections
- Daily Bread devotionals with mood-based selection and a Companion AI chat
- Multi-user profiles with PINs, Child Lock, and per-profile source-tier settings
- Companion Safety: AI replies are scanned for age-appropriateness on child-locked profiles, flagged messages land in a per-profile audit view for review
- Save-to-journal and save-to-study-collection pickers on every AI panel
- Optional AI assistant — Claude (Anthropic), OpenAI, Gemini, OpenRouter, Ollama, or any OpenAI-compatible server, with streaming, grounding controls, and tunable sampling
- Full-text search across verses, characters, themes, and narrative units
- DOCX and Markdown export for studies, journals, and AI conversations
- Automatic backup with configurable retention
- In-app update banner — Selah checks GitHub hourly and nudges you when a newer release is available
- Dark and light mode

## Quick Start

### Prerequisites

**Docker + Docker Compose** is the only requirement for the default install. Decompression and database setup happen inside the container.

- **macOS** — Install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/) (includes Compose). Apple Silicon and Intel supported.
- **Windows** — Install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) (includes Compose). Requires WSL 2.
- **Linux** — Install [Docker Engine](https://docs.docker.com/engine/install/) plus the [Compose plugin](https://docs.docker.com/compose/install/linux/) via your distro's package manager. Example (Ubuntu/Debian): `sudo apt install docker.io docker-compose-v2`.

### Install

Grab the compose file and start the container — the image pulls
multi-arch from ghcr.io, so Apple Silicon, Intel, and ARM servers all
just work. The initial seed downloads automatically on first boot.

```bash
mkdir selah && cd selah
curl -L -o docker-compose.yml https://raw.githubusercontent.com/foobarninja/selah-app/master/docker-compose.yml
docker compose up -d
```

Open [http://localhost:4610](http://localhost:4610)

**Managing the container:**

```bash
docker compose logs -f           # follow logs (watch the startup checks)
docker compose stop              # stop the app (keeps data)
docker compose down              # stop and remove the container (keeps data volume)
docker compose up -d             # start again
docker compose pull              # pull the latest image (then `up -d` to apply)
```

> **Note:** The content database is hosted on [Hugging Face Datasets](https://huggingface.co/datasets/foooobear/selah-db) (~71MB compressed). No account required. On first boot the entrypoint downloads it automatically.

### Updating Selah

Two independent update streams:

| What | How |
|---|---|
| **App code** (new features, bug fixes) | `docker compose pull && docker compose up -d` |
| **Content DB** (new devotionals, commentary, etc.) | Applied automatically on every container start. Set `SELAH_AUTO_UPDATE_SEED=0` to pin. |

When a new app version is available, the startup log shows:

```
[app-check] update available: v1.2.0 -> v1.3.0
[app-check] to update: docker compose pull && docker compose up -d
```

### Migrating from a legacy install

If you installed Selah before v0.2.0 you have a local clone with a
`build: .` compose file. Everything you care about (your DB, notes,
bookmarks, study projects) lives in Docker named volumes — they survive
the switch as long as you run the migrated compose from the same
directory.

```bash
cd selah-app                # the directory where you've been running compose
docker compose down         # stop the running container; volumes stay

# Grab the new compose file directly. Skips git entirely so you don't
# have to reason about diverged history / local commits.
cp docker-compose.yml docker-compose.yml.legacy.bak
curl -L -o docker-compose.yml \
  https://raw.githubusercontent.com/foobarninja/selah-app/master/docker-compose.yml

docker compose pull         # fetch ghcr.io/foobarninja/selah-app:latest
docker compose up -d        # start from the pulled image
docker compose logs -f --tail=30   # watch the seed auto-update flow
```

On first boot the entrypoint will auto-apply the latest content seed
(merging your local notes/bookmarks/history in) and write a timestamped
backup at `data/selah.pre-update-<ts>.db.bak`. Delete it after a day or
two once you're satisfied.

> **Recommended before migrating:** download a backup via Settings →
> Backup & Data → Download Backup. If anything goes wrong, you can
> restore from it.

### Building from source (contributors only)

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
cp docker-compose.override.yml.example docker-compose.override.yml
docker compose up -d --build
```

The override tells Compose to build locally from the working tree
instead of pulling the published image. Delete the override to switch
back to pulling.

## Manual Install (npm)

For development or running without Docker.

### Prerequisites

- Node.js 22+
- npm 10+
- **xz** to decompress the database
  - **macOS/Linux** — usually pre-installed. If not: `brew install xz` or `sudo apt install xz-utils`
  - **Windows** — [7-Zip](https://www.7-zip.org/) or [XZ Utils for Windows](https://tukaani.org/xz/)

### Steps

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
npm install
npx prisma generate
cp .env.example .env
curl -L -o data/selah.db.xz https://huggingface.co/datasets/foooobear/selah-db/resolve/main/selah-seed.db.xz
xz -d data/selah.db.xz
npm run dev -- -p 4610
```

Open [http://localhost:4610](http://localhost:4610).

> **Manual download fallback:** if `curl` fails, download `selah-seed.db.xz` from the [Hugging Face dataset page](https://huggingface.co/datasets/foooobear/selah-db/blob/main/selah-seed.db.xz) directly, save as `data/selah.db.xz`, then run `xz -d data/selah.db.xz`.

On npm, seed updates are **check-only by default** (startup logs a nudge when a newer seed is available). To actually pull one, run `npm run seed:update`. To auto-apply on every boot, set `SELAH_AUTO_UPDATE_SEED=1` in your `.env`.

## Updating the Content Database

Selah's pre-baked content (verses, commentary, characters, themes, devotionals) occasionally gets refreshed on Hugging Face. Your local progress — notes, bookmarks, study projects, completion history, AI chats, settings — lives in the same SQLite file, so updating has to *merge*, not just overwrite.

**What's preserved on update:** `user_notes`, `user_bookmarks`, `user_collections`, `journals`, `reading_history`, `devotional_history`, `ai_conversations`, `ai_messages`, `study_projects`, `app_settings`, and your custom AI providers/models. The full list lives in [`src/lib/seed/user-tables.ts`](src/lib/seed/user-tables.ts).

**What gets refreshed:** everything else — verses, commentary, characters, themes, devotionals, series.

### Docker: auto-update on startup (default)

Every `docker compose up -d` triggers the seed check. If Hugging Face
has a newer seed, the entrypoint downloads it, verifies sha256, merges
your local user tables in, atomically swaps it in with a timestamped
backup, and boots Selah. The pipeline is **fail-open** — any network,
download, or merge failure logs the error and boots on the existing DB.

Watch it happen: `docker compose logs --tail=30 selah`.

**To pin the seed** (skip auto-updates, e.g. for reproducible deployments),
set `SELAH_AUTO_UPDATE_SEED=0` in your compose env.

### npm: check-only by default

`npm run dev` / `npm run start` run a check and log the result. They do **not** auto-apply — local dev shouldn't have surprise downloads mid-workflow.

```
[seed-check] local seed v2026.04.19 is current
[seed-check] update available: v2026.04.19 -> v2026.05.10 (71.2 MB download). Run `npm run seed:update` to apply.
```

Check manually any time: `npm run seed:check`. To apply: `npm run seed:update`. To opt into auto-apply on npm boots, set `SELAH_AUTO_UPDATE_SEED=1`.

### Manual apply (both)

```bash
# npm
npm run seed:update

# Docker
docker compose run --rm selah npm run seed:update
```

Either variant downloads, verifies, merges, backs up, swaps. The previous DB is preserved at `data/selah.pre-update-<timestamp>.db.bak` — delete it once you're satisfied.

### If something goes wrong

The update is atomic: either it completes or it leaves your existing DB untouched. If the app misbehaves after an update:

1. Stop the app
2. `mv data/selah.db data/selah.bad.db && mv data/selah.pre-update-*.db.bak data/selah.db`
3. Delete `data/.seed-version` so the next check doesn't think you're still on the new version
4. Restart

Orphan rows (e.g., a completion record pointing to a devotional that was renamed) are preserved but logged during the merge. They don't break anything.

## AI Provider Setup

Selah works fully without AI. The AI assistant is optional — configure it in Settings when you're ready.

### OpenRouter (easiest)

1. Create an account at [openrouter.ai](https://openrouter.ai/)
2. Generate an API key
3. In Selah, go to Settings → AI Assistant and select **OpenRouter**
4. Paste your API key
5. Choose a model. Benchmarked picks:
   - **Claude Sonnet 4.6** — premium value, 47/50, ~$0.05/prompt
   - **Claude Haiku 4.5** — recommended daily driver, 43/50, ~$0.016/prompt, fast
   - **GPT-4.1** — budget pick, 41/50, ~$0.011/prompt
6. Click **Test Connection**

### Ollama (fully local, no API key needed)

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull a benchmarked local model (check [ollama.com/library](https://ollama.com/library) for exact tags):
   - **Gemma 4 31B** — best local large model, 36.5/50. Uses Selah's default Ollama parameters (temp 0.5, freq 0.6, pres 0.5).
   - **Qwen 3.5 9B** — best small model, 42/50 with tuned parameters. **Requires** temp 0.2, freq 0.3, pres 0.3 — above temp 0.3 it fabricates Hebrew etymologies. Set these in Settings → AI Assistant before use.
3. In Selah, go to Settings → AI Assistant and select **Ollama**
4. Set URL to `http://localhost:11434` (default)
5. Select your model from the dropdown

### Custom OpenAI-compatible server

For llama-server, vLLM, or any OpenAI-compatible endpoint:

1. Start your server
2. In Selah, go to Settings → AI Assistant and select **Custom**
3. Set the API URL (e.g., `http://192.168.1.100:8080/v1`)
4. Select your model

### Model Recommendations

See [docs/models_recommendations.md](docs/models_recommendations.md) for detailed benchmarks, parameter tuning guides, and model-specific notes.

### Using AI with Children

If a profile belongs to a child — or has Child Lock turned on — be deliberate about which model you pick. The guardrails that keep an AI out of scary, adult, or graphically violent territory are themselves a capability, and cheap models fail those tests more often.

**Recommended floor:** **Claude Haiku 4.5** or a comparable tier from another provider (GPT-4o-mini, Gemini Flash, Llama 3.1 8B-Instruct or larger for Ollama). Don't go below this for child-facing profiles.

**Always test before handing it over.** Pose the kinds of hard questions kids actually ask — death, suffering, violent passages, "why did God do that" — and confirm the answers stay age-appropriate *for your child*. Companion Safety will flag obvious problems after the fact, but your pre-check is the first line of defense. Re-test whenever you switch models.

## Configuration

| Setting | Location | Default | Description |
|---------|----------|---------|-------------|
| Primary translation | Settings → Translations | BSB | Default Bible translation for reading |
| Parallel translations | Settings → Translations | None | Up to 3 side-by-side translations |
| AI provider | Settings → AI Assistant | None | Claude, OpenAI, Gemini, OpenRouter, Ollama, or Custom |
| AI temperature | Settings → AI Assistant | 0.7 (API) / 0.5 (Ollama) | Lower = more focused, higher = more creative |
| AI frequency penalty | Settings → AI Assistant | 0.3 (API) / 0.6 (Ollama) | Reduces repetitive phrasing |
| AI presence penalty | Settings → AI Assistant | 0.3 (API) / 0.5 (Ollama) | Pushes the model toward broader source coverage |
| Commentary display | Settings → Study | Curated | Show curated commentaries or all available |
| Source tier visibility | Settings → Study | All except Conjecture | Which content tiers appear in the context drawer |
| Daily Bread audience | Settings → Study | Adults | Adjusts devotional language level |
| Theme | Settings → Study | Dark | Dark, Light, or System |
| Auto-backup | Settings → Backup | Off | Daily automatic database backup |
| Backup retention | Settings → Backup | 14 days | How long auto-backups are kept |

## Troubleshooting

### "Connection error" with Ollama

- Verify Ollama is running: `ollama list`
- Check that the URL in Settings matches Ollama's address (default: `http://localhost:11434`)
- If Ollama runs on a different machine, use that machine's IP address instead of `localhost`

### "Connection error" with a custom server

- Verify the server is running and accessible from the machine running Selah
- Include the full URL with port and `/v1` path (e.g., `http://192.168.1.100:8080/v1`)
- Check firewall rules if the server is on a different machine

### AI responses are low quality

- Adjust model parameters in Settings — try lowering temperature (0.2–0.5) and raising frequency penalty (0.3–0.6)
- See [docs/models_recommendations.md](docs/models_recommendations.md) for tested values per model
- Try a different model — quality varies significantly between models and families

### Database issues

- Download a backup: Settings → Backup & Data → Download Backup
- Restore from backup: Settings → Backup & Data → upload a `.db` file
- The database is stored at `data/selah.db`

### Seed auto-apply keeps failing

If the container log shows `[seed-check] AUTO-APPLY FAILED` on every boot but the app still runs:

- **sha256 mismatch** — Hugging Face has inconsistent artifacts (shouldn't happen now that uploads are atomic, but would recover on the next publish). App continues on your current seed; no action needed.
- **Network / 404** — intermittent HF outage. Retries on next boot.
- **Schema too new** — log says `remote seed ... requires app schemaVersion N, this app supports M`. Upgrade the app (`docker compose pull && docker compose up -d`) before the seed will apply.

All of the above are fail-open — the app boots on your current DB.

### Rolling back a seed update

If the app misbehaves after a successful seed update:

1. `docker compose down` (or stop the npm process)
2. `mv data/selah.db data/selah.bad.db && mv data/selah.pre-update-*.db.bak data/selah.db`
3. `rm data/.seed-version` so the next check doesn't think you're still on the new version
4. `docker compose up -d`

Your DB is now back to whatever it was before the update, with all user data intact.

### Docker volume issues

- Data persists in Docker volumes `selah-data` and `selah-backups`
- To reset everything: `docker compose down -v` (this deletes all data — grab a backup first)
- Always download a backup from Settings before removing volumes

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma 7](https://www.prisma.io/) + [SQLite](https://www.sqlite.org/) (via better-sqlite3)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Docker](https://www.docker.com/) (Alpine-based multi-stage build)

## Acknowledgments

Selah is built on the generosity of the open-source community and freely available biblical scholarship.

**Bible Text & Commentaries** — Translations and commentary provided by the [Free Use Bible API (HelloAO)](https://helloao.org/), including the Berean Standard Bible, World English Bible, and 1,250+ additional translations. Commentary from public domain works: Adam Clarke, Jamieson-Fausset-Brown, John Gill, Keil-Delitzsch, and Matthew Henry (CC0 1.0), plus [Tyndale Open Study Notes](https://tyndaleopenresources.com/) (CC-BY-SA 4.0). Strong's Concordance provides Hebrew and Greek lexical data.

**Open-Source Software** — Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/), and [TypeScript](https://www.typescriptlang.org/). Icons from [Lucide](https://lucide.dev/). Word export via [docx](https://github.com/dolanmiu/docx). Markdown rendering via [react-markdown](https://github.com/remarkjs/react-markdown). Containerized with [Docker](https://www.docker.com/).

**Fonts** — [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (display), [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) (body), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (mono) — all Open Font License via Google Fonts.

**AI Integration** — Optional AI chat supports [Anthropic Claude](https://www.anthropic.com/), [Google Gemini](https://ai.google.dev/), [OpenAI](https://openai.com/), [OpenRouter](https://openrouter.ai/), [Ollama](https://ollama.ai/), and any OpenAI-compatible endpoint. All AI-assisted content is clearly labeled and grounded in canonical and scholarly sources.

## License

[MIT](LICENSE)
