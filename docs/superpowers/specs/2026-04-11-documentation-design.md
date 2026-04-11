# Documentation & Port Change — Design Spec

## Overview

User-facing documentation for the Selah Bible study app. Three deliverables: comprehensive README rewrite, in-app Help & About section in Settings, and port change from 3000 to 4610 (Psalm 46:10).

**Decisions:**
- Audience: end users + self-hosters
- In-app help: inside Settings as 5th section ("About Selah")
- README: comprehensive single-file (~200-300 lines)
- Tone: technical in README, pastoral in-app
- Port: 4610 (Psalm 46:10 — "Be still, and know that I am God")

---

## 1. README.md Rewrite

Full rewrite of the boilerplate `create-next-app` README. Technical tone, comprehensive single-file reference.

### Structure

```
# Selah

A self-hosted Bible study app with pre-baked contextual knowledge. Everything runs on your machine — no accounts, no cloud, no tracking.

## Features

Bullet list:
- Scripture reader with parallel translations, Strong's numbers, footnotes
- Five-lens context system (Scene Cast, Themes, Climate, Cross-references, Commentary)
- 250+ character profiles with emotional arcs and modern parallels
- 290+ theological themes with definitions and modern framing
- Study Builder — assemble passages, characters, themes into study projects, export to DOCX
- Journal with multi-anchor notes and resurfacing engine
- Daily Bread devotionals with mood-based selection
- Optional AI assistant (OpenRouter, Ollama, or any OpenAI-compatible server)
- Full-text search across verses, characters, themes, and narrative units
- Automatic backup with configurable retention
- Dark and light mode

## Quick Start

```bash
git clone <repo-url>
cd selah-app
docker compose up
```

Open http://localhost:4610

## Manual Install

### Prerequisites
- Node.js 20+
- npm 10+

### Steps
```bash
git clone <repo-url>
cd selah-app
npm install
npx prisma generate
npm run dev
```

Open http://localhost:4610

## AI Provider Setup

Selah works fully without AI. The AI assistant is optional — configure it in Settings when you're ready.

### OpenRouter (easiest)
1. Create an account at openrouter.ai
2. Generate an API key
3. In Selah Settings → AI Assistant, select "OpenRouter"
4. Paste your API key
5. Choose a model (recommended: Gemma 4 27B, DeepSeek V3.1, or Qwen 3.5)
6. Click "Test Connection"

### Ollama (fully local)
1. Install Ollama from ollama.ai
2. Pull a model: `ollama pull gemma3:27b`
3. In Selah Settings → AI Assistant, select "Ollama"
4. Set URL to http://localhost:11434 (default)
5. Select your model

### Custom OpenAI-compatible server
1. Start your server (llama-server, vLLM, etc.)
2. In Selah Settings → AI Assistant, select "Custom"
3. Set the API URL (e.g., http://192.168.1.100:8080/v1)
4. Select your model

### Model Recommendations
See docs/models_recommendations.md for detailed benchmarks, parameter tuning, and model-specific notes.

## Configuration

| Setting | Location | Default | Description |
|---------|----------|---------|-------------|
| Primary translation | Settings → Translations | BSB | Default Bible translation |
| AI provider | Settings → AI Assistant | None | OpenRouter, Ollama, or Custom |
| AI temperature | Settings → AI Assistant | 0.5 | Controls response creativity |
| Commentary display | Settings → Study | Curated | Show curated or all commentaries |
| Source tier visibility | Settings → Study | All except Conjecture | Which tiers appear in context |
| Theme | Settings → Study | Dark | Dark, Light, or System |
| Auto-backup | Settings → Backup | Off | Daily automatic database backup |
| Backup retention | Settings → Backup | 14 days | How long to keep auto-backups |

## Troubleshooting

### "Connection error" with Ollama
- Verify Ollama is running: `ollama list`
- Check the URL in Settings matches Ollama's address (default: http://localhost:11434)
- If Ollama is on a different machine, use that machine's IP address

### "Connection error" with custom server
- Verify the server is running and accessible
- Include the full URL with port and /v1 path (e.g., http://192.168.1.100:8080/v1)
- Check firewall rules if the server is on a different machine

### AI responses are low quality
- Try adjusting model parameters in Settings (temperature, frequency penalty, presence penalty)
- See docs/models_recommendations.md for tested parameter values per model
- Try a different model — quality varies significantly between models

### Database issues
- Use Settings → Backup & Data → Download Backup to save your data
- To restore: Settings → Backup & Data → Upload a backup file
- Database is stored at data/selah.db

### Docker volume issues
- Data persists in Docker volumes: `selah-data` and `selah-backups`
- To reset: `docker compose down -v` (WARNING: deletes all data)
- To back up volumes: download a backup from Settings before removing volumes

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Prisma 7 + SQLite (better-sqlite3)
- Tailwind CSS 4
- Docker (Alpine-based multi-stage build)

## Acknowledgments

Selah is built on the generosity of the open-source community and freely available biblical scholarship.

**Bible Text & Commentaries:** Translations and commentary provided by the [Free Use Bible API (HelloAO)](https://helloao.org/), including the Berean Standard Bible, World English Bible, and 1,250+ additional translations. Commentary from public domain works: Adam Clarke, Jamieson-Fausset-Brown, John Gill, Keil-Delitzsch, and Matthew Henry (CC0 1.0), plus Tyndale Open Study Notes (CC-BY-SA 4.0). Strong's Concordance provides Hebrew and Greek lexical data.

**Open-Source Software:** Built with [Next.js](https://nextjs.org/), [React](https://react.dev/), [Prisma](https://www.prisma.io/), [SQLite](https://www.sqlite.org/), and [TypeScript](https://www.typescriptlang.org/). Icons from [Lucide](https://lucide.dev/). Word export via [docx](https://github.com/dolanmiu/docx). Markdown rendering via [react-markdown](https://github.com/remarkjs/react-markdown). Containerized with [Docker](https://www.docker.com/).

**Fonts:** [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (display), [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) (body), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (mono) — all Open Font License via Google Fonts.

**AI Integration:** Optional AI chat supports [Anthropic Claude](https://www.anthropic.com/), [Google Gemini](https://ai.google.dev/), [OpenAI](https://openai.com/), [OpenRouter](https://openrouter.ai/), [Ollama](https://ollama.ai/), and any OpenAI-compatible endpoint. All AI-assisted content is clearly labeled and grounded in canonical and scholarly sources.

## License

MIT License — see LICENSE file.
```

---

## 2. In-App Help & About (Settings Section)

### Location
5th and final section in `SettingsView.tsx`, below "Backup & data."

### Section: "About Selah"

Uses the existing `SettingsSection` component pattern with `title` and `description` props.

**Title:** "About Selah"
**Description:** "Help, tips, and a little about this quiet place."

### Content Structure

#### Version & Tagline
Static block at the top of the section:
- "Selah" in display font (Cormorant Garamond), followed by version "v0.1.0"
- Tagline: "A quiet place to study Scripture."
- Quote: *"Be still, and know that I am God." — Psalm 46:10*

#### Getting Started (collapsible FAQ items)

Each item: clickable header that toggles content visibility. Uses ChevronDown/ChevronUp icon. Pastoral tone.

| Question | Answer |
|----------|--------|
| How do I start reading? | Head to the Reader from the sidebar. Choose a book and chapter — your primary translation loads by default. Tap any verse to see its context: who's there, what themes surface, and what scholars have said about it. |
| What are the five lenses? | Every passage in Selah is enriched with five layers of context: **Scene Cast** (who's present and what they're feeling), **Themes** (theological threads), **Climate** (historical and cultural setting), **Cross-references** (connected passages), and **Commentary** (curated scholarly notes). |
| How do I set up an AI assistant? | Scroll up to the AI Assistant section on this page. Selah works beautifully without it — the AI is simply an optional conversation partner for your study. |
| How do I build a study? | Open the Study Builder from the sidebar. Create a project, then assemble passages, characters, themes, and notes. You can export the whole study as a Word document when you're ready. |
| What is Daily Bread? | A devotional companion that meets you where you are. Choose what's on your mind, and Selah will offer a passage with context, conversation starters, and a moment to reflect. |

#### Troubleshooting (collapsible FAQ items)

| Question | Answer |
|----------|--------|
| The AI isn't responding | Check that your provider is configured in the AI Assistant section above. Make sure you've selected a model and that your API key is saved (look for the green checkmark). |
| Ollama won't connect | Make sure Ollama is running on your machine. The default URL is http://localhost:11434 — if Ollama is on a different device, use that device's IP address instead. |
| AI responses seem off | Every model has its own personality. Try adjusting the temperature and penalty sliders in AI settings, or switch to a different model. Our recommendations are in the model guide. |
| How do I restore a backup? | In the Backup & Data section above, click the upload area and select a .db backup file. Your current data will be replaced with the backup. |
| Where is my data stored? | Everything lives in a single file on your machine (data/selah.db). No cloud, no sync, no tracking. Your study is yours alone. |

#### Footer
"Made with care for those who study Scripture."

### Collapsible Item Component

New internal component `HelpItem` within SettingsView (not a separate file):

```tsx
function HelpItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button onClick={() => setOpen(!open)} ...>
        <span>{question}</span>
        <ChevronDown rotated={open} />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}
```

Styling:
- Question: font-body, 14px, text-1, clickable with hover state
- Answer: font-body, 13px, text-2, line-height 1.6, padding-left 12px
- Divider between items: 1px border-color
- Chevron: text-3, 14px, rotates 180deg when open

---

## 3. Port Change (3000 → 4610)

### Files to modify:

| File | Change |
|------|--------|
| `docker-compose.yml` | `"3000:3000"` → `"4610:4610"` |
| `Dockerfile` | `ENV PORT=3000` → `ENV PORT=4610`, `EXPOSE 3000` → `EXPOSE 4610`, HEALTHCHECK URL port |
| `docker-entrypoint.sh` | Check for port 3000 references, update if found |
| `README.md` | All localhost URLs use 4610 |

No source code changes — Next.js reads the PORT environment variable.

---

## Files Changed Summary

### New/Rewritten Files
| File | Purpose |
|------|---------|
| `README.md` | Complete rewrite — features, install, AI setup, troubleshooting |

### Modified Files
| File | Changes |
|------|---------|
| `src/components/settings/SettingsView.tsx` | Add "About Selah" section with HelpItem collapsibles |
| `docker-compose.yml` | Port 3000 → 4610 |
| `Dockerfile` | Port 3000 → 4610 in ENV, EXPOSE, HEALTHCHECK |
| `docker-entrypoint.sh` | Port update if referenced |

### New Files
| File | Purpose |
|------|---------|
| `LICENSE` | MIT License file |

### Implementation Order
1. Port change (Dockerfile, docker-compose.yml, entrypoint)
2. LICENSE file (MIT)
3. README.md rewrite (includes Acknowledgments section)
4. In-app Help & About section in SettingsView
