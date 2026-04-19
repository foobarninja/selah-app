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
- Daily Bread devotionals with mood-based selection
- Optional AI assistant — OpenRouter, Ollama, or any OpenAI-compatible server
- Full-text search across verses, characters, themes, and narrative units
- DOCX and Markdown export for studies, journals, and AI conversations
- Automatic backup with configurable retention
- Dark and light mode

## Quick Start

### Prerequisites

**Docker + Docker Compose:**

- **macOS** — Install [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/) (includes Compose). Apple Silicon and Intel supported.
- **Windows** — Install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) (includes Compose). Requires WSL 2.
- **Linux** — Install [Docker Engine](https://docs.docker.com/engine/install/) plus the [Compose plugin](https://docs.docker.com/compose/install/linux/) via your distro's package manager. Example (Ubuntu/Debian): `sudo apt install docker.io docker-compose-v2`.

**xz** to decompress the database:

- **macOS/Linux** — Usually pre-installed. If not: `brew install xz` (macOS) or `sudo apt install xz-utils` (Debian/Ubuntu).
- **Windows** — Install [7-Zip](https://www.7-zip.org/) (recommended) or [XZ Utils for Windows](https://tukaani.org/xz/).

### Install

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
cp .env.example .env
curl -L -o data/selah.db.xz https://huggingface.co/datasets/foooobear/selah-db/resolve/main/selah-seed.db.xz
xz -d data/selah.db.xz
docker compose up -d
```

Open [http://localhost:4610](http://localhost:4610)

**Managing the container:**

```bash
docker compose logs -f   # follow logs
docker compose stop      # stop the app (keeps data)
docker compose down      # stop and remove the container (keeps data volume)
docker compose up -d     # start again
```

> **First build:** Expect ~15 minutes the first time you run `docker compose up -d` — `better-sqlite3` compiles native bindings from source and the dependency tree is large. Subsequent builds use the Docker layer cache and finish in seconds. The `-d` flag runs it detached so your terminal stays free.

> **Windows PowerShell:** For decompression, right-click `selah.db.xz` in File Explorer and use 7-Zip → Extract Here.

> **Note:** The database is hosted on [Hugging Face Datasets](https://huggingface.co/datasets/foooobear/selah-db) (~83MB compressed, ~500MB decompressed). No account is required to download.

## Manual Install

### Prerequisites

- Node.js 22+
- npm 10+
- [xz](https://tukaani.org/xz/) to decompress the database (see Quick Start prerequisites above)

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

Open [http://localhost:4610](http://localhost:4610)

> **Manual download:** If `curl` fails, download `selah-seed.db.xz` from the [Hugging Face dataset page](https://huggingface.co/datasets/foooobear/selah-db/blob/main/selah-seed.db.xz) directly, save it as `data/selah.db.xz`, then run `xz -d data/selah.db.xz`.

## Updating the Content Database

Selah's pre-baked content (verses, commentary, characters, themes, devotionals) occasionally gets refreshed on Hugging Face. Your local progress — notes, bookmarks, study projects, completion history, AI chats, settings — lives in the same SQLite file, so updating has to *merge*, not just overwrite.

**What's preserved on update:** `user_notes`, `user_bookmarks`, `user_collections`, `journals`, `reading_history`, `devotional_history`, `ai_conversations`, `ai_messages`, `study_projects`, `app_settings`, and your custom AI providers/models. The full list lives in [`src/lib/seed/user-tables.ts`](src/lib/seed/user-tables.ts).

**What gets refreshed:** everything else — verses, commentary, characters, themes, devotionals, series.

### Docker: auto-update on startup (default)

For Docker deployments, `docker compose up -d --build` is all you need. The entrypoint:

1. Checks Hugging Face for a newer seed
2. If newer, downloads it, verifies sha256, merges your local user tables in, and atomically swaps — creating a timestamped backup first
3. Boots Selah

You'll see the whole flow in the container log:

```bash
docker compose logs --tail=30 selah
```

The pipeline is **fail-open**: any network, download, or merge failure logs the error and boots on the existing DB. Your app never gets stuck behind a Hugging Face outage.

> **After `git pull` on an existing Docker install:** run `docker compose up -d --build` the first time — without `--build`, Compose reuses the old image and the new entrypoint isn't applied.

**To pin the seed** (skip auto-updates, e.g. for reproducible deployments), set `SELAH_AUTO_UPDATE_SEED=0` in your compose env. The container will still log when an update is available but won't apply it.

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

## Configuration

| Setting | Location | Default | Description |
|---------|----------|---------|-------------|
| Primary translation | Settings → Translations | BSB | Default Bible translation for reading |
| Parallel translations | Settings → Translations | None | Up to 3 side-by-side translations |
| AI provider | Settings → AI Assistant | None | OpenRouter, Ollama, or Custom |
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

### Docker volume issues

- Data persists in Docker volumes `selah-data` and `selah-backups`
- To reset everything: `docker compose down -v` (this deletes all data)
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
