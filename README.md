# Selah

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

- [Docker](https://docs.docker.com/get-docker/) with [Docker Compose](https://docs.docker.com/compose/install/)
- [xz](https://tukaani.org/xz/) to decompress the database (pre-installed on Linux/macOS; on Windows use [7-Zip](https://www.7-zip.org/) or [XZ Utils for Windows](https://tukaani.org/xz/))

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
cp .env.example .env
mkdir -p data
curl -L -o data/selah.db.xz https://huggingface.co/datasets/foooobear/selah-db/resolve/main/selah.db.xz
xz -d data/selah.db.xz
docker compose up
```

Open [http://localhost:4610](http://localhost:4610)

> **Windows PowerShell:** Use `mkdir data` instead of `mkdir -p data`. For decompression, right-click `selah.db.xz` in File Explorer and use 7-Zip → Extract Here.

> **Note:** The database is hosted on [Hugging Face Datasets](https://huggingface.co/datasets/foooobear/selah-db) (~83MB compressed, ~500MB decompressed). No account is required to download.

## Manual Install

### Prerequisites

- Node.js 20+
- npm 10+
- [xz](https://tukaani.org/xz/) to decompress the database (see note above)

### Steps

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
npm install
npx prisma generate
cp .env.example .env
mkdir -p data
curl -L -o data/selah.db.xz https://huggingface.co/datasets/foooobear/selah-db/resolve/main/selah.db.xz
xz -d data/selah.db.xz
npm run dev -- -p 4610
```

Open [http://localhost:4610](http://localhost:4610)

> **Manual download:** If `curl` fails, download `selah.db.xz` from the [Hugging Face dataset page](https://huggingface.co/datasets/foooobear/selah-db/blob/main/selah.db.xz) directly and save it to `data/selah.db.xz` before running `xz -d`.

## AI Provider Setup

Selah works fully without AI. The AI assistant is optional — configure it in Settings when you're ready.

### OpenRouter (easiest)

1. Create an account at [openrouter.ai](https://openrouter.ai/)
2. Generate an API key
3. In Selah, go to Settings → AI Assistant and select **OpenRouter**
4. Paste your API key
5. Choose a model (recommended: Gemma 4 27B, DeepSeek V3.1, or Qwen 3.5)
6. Click **Test Connection**

### Ollama (fully local, no API key needed)

1. Install Ollama from [ollama.ai](https://ollama.ai/)
2. Pull a model: `ollama pull gemma3:27b`
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
| AI temperature | Settings → AI Assistant | 0.5 | Lower = more focused, higher = more creative |
| AI frequency penalty | Settings → AI Assistant | 0.6 | Reduces repetitive phrasing |
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
