# Documentation & Port Change Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship user-facing documentation — README rewrite, in-app Help & About, MIT license, and port change to 4610.

**Architecture:** Three independent deliverables: Docker config (port change), static files (README, LICENSE), and one Settings UI addition (Help section). No new routes or API changes.

**Tech Stack:** Next.js 16, React 19, TypeScript, Docker

**Design Spec:** `docs/superpowers/specs/2026-04-11-documentation-design.md`

---

### Task 1: Port change (3000 → 4610)

**Files:**
- Modify: `Dockerfile`
- Modify: `docker-compose.yml`

- [ ] **Step 1: Update Dockerfile**

In `Dockerfile`, make three changes:

Line 20: change `ENV PORT=3000` to `ENV PORT=4610`

Line 40: change `EXPOSE 3000` to `EXPOSE 4610`

Line 43: change `http://localhost:3000/` to `http://localhost:4610/`

- [ ] **Step 2: Update docker-compose.yml**

Line 6: change `"3000:3000"` to `"4610:4610"`

- [ ] **Step 3: Commit**

```bash
git add Dockerfile docker-compose.yml
git commit -m "config: change port from 3000 to 4610 (Psalm 46:10)"
```

---

### Task 2: Add MIT License

**Files:**
- Create: `LICENSE`

- [ ] **Step 1: Create LICENSE file**

```
MIT License

Copyright (c) 2026 Selah Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 2: Commit**

```bash
git add LICENSE
git commit -m "license: add MIT license"
```

---

### Task 3: Rewrite README.md

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace the entire README with the comprehensive version**

Complete rewrite. Technical tone. The full content follows — write it exactly as specified.

```markdown
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

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
docker compose up
```

Open [http://localhost:4610](http://localhost:4610)

## Manual Install

### Prerequisites

- Node.js 20+
- npm 10+

### Steps

```bash
git clone https://github.com/foobarninja/selah-app.git
cd selah-app
npm install
npx prisma generate
npm run dev -- -p 4610
```

Open [http://localhost:4610](http://localhost:4610)

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
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: comprehensive README rewrite with features, install, AI setup, and acknowledgments"
```

---

### Task 4: Add Help & About section to Settings

**Files:**
- Modify: `src/components/settings/SettingsView.tsx`

- [ ] **Step 1: Add the HelpItem component**

Add this internal component inside `SettingsView.tsx`, after the existing `LabelRow` component (around line 36) and before the main `SettingsView` export:

```tsx
function HelpItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-3 transition-colors duration-150"
        style={{
          fontFamily: font.body,
          fontSize: '14px',
          color: 'var(--selah-text-1, #E8E2D9)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span>{question}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          style={{
            color: 'var(--selah-text-3, #6E695F)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 150ms ease',
          }}
        />
      </button>
      {open && (
        <div
          style={{
            fontFamily: font.body,
            fontSize: '13px',
            color: 'var(--selah-text-2, #A39E93)',
            lineHeight: 1.6,
            paddingLeft: '12px',
            paddingBottom: '14px',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Add ChevronDown to the lucide-react imports**

At the top of the file, find the lucide-react import and add `ChevronDown` if it's not already there.

- [ ] **Step 3: Add the About Selah section to the end of the settings content**

Find the last `</SettingsSection>` in the return JSX (the Backup & Data section). After it but still inside the `<div style={{ maxWidth: '640px', margin: '0 auto' }}>` wrapper, add:

```tsx
        <SettingsSection title="About Selah" description="Help, tips, and a little about this quiet place.">
          {/* Version & tagline */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 300, letterSpacing: '6px', textTransform: 'uppercase' as const, color: 'var(--selah-gold-500, #C6A23C)', marginBottom: '4px' }}>
              Selah
            </div>
            <div style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>
              A quiet place to study Scripture.
            </div>
            <div style={{ fontFamily: font.display, fontStyle: 'italic', fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>
              &ldquo;Be still, and know that I am God.&rdquo; &mdash; Psalm 46:10
            </div>
          </div>

          {/* Getting started */}
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Getting Started</span>
          </div>
          <HelpItem question="How do I start reading?">
            Head to the Reader from the sidebar. Choose a book and chapter — your primary translation loads by default. Tap any verse to see its context: who&apos;s there, what themes surface, and what scholars have said about it.
          </HelpItem>
          <HelpItem question="What are the five lenses?">
            Every passage in Selah is enriched with five layers of context: <strong>Scene Cast</strong> (who&apos;s present and what they&apos;re feeling), <strong>Themes</strong> (theological threads), <strong>Climate</strong> (historical and cultural setting), <strong>Cross-references</strong> (connected passages), and <strong>Commentary</strong> (curated scholarly notes).
          </HelpItem>
          <HelpItem question="How do I set up an AI assistant?">
            Scroll up to the AI Assistant section on this page. Selah works beautifully without it — the AI is simply an optional conversation partner for your study.
          </HelpItem>
          <HelpItem question="How do I build a study?">
            Open the Study Builder from the sidebar. Create a project, then assemble passages, characters, themes, and notes. You can export the whole study as a Word document when you&apos;re ready.
          </HelpItem>
          <HelpItem question="What is Daily Bread?">
            A devotional companion that meets you where you are. Choose what&apos;s on your mind, and Selah will offer a passage with context, conversation starters, and a moment to reflect.
          </HelpItem>

          {/* Troubleshooting */}
          <div style={{ marginTop: '20px', marginBottom: '8px' }}>
            <span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Troubleshooting</span>
          </div>
          <HelpItem question="The AI isn't responding">
            Check that your provider is configured in the AI Assistant section above. Make sure you&apos;ve selected a model and that your API key is saved (look for the green checkmark).
          </HelpItem>
          <HelpItem question="Ollama won't connect">
            Make sure Ollama is running on your machine. The default URL is http://localhost:11434 — if Ollama is on a different device, use that device&apos;s IP address instead.
          </HelpItem>
          <HelpItem question="AI responses seem off">
            Every model has its own personality. Try adjusting the temperature and penalty sliders in AI settings, or switch to a different model.
          </HelpItem>
          <HelpItem question="How do I restore a backup?">
            In the Backup &amp; Data section above, click the upload area and select a .db backup file. Your current data will be replaced with the backup.
          </HelpItem>
          <HelpItem question="Where is my data stored?">
            Everything lives in a single file on your machine (data/selah.db). No cloud, no sync, no tracking. Your study is yours alone.
          </HelpItem>

          {/* Footer */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <span style={{ fontFamily: font.display, fontStyle: 'italic', fontSize: '13px', color: 'var(--selah-text-3, #6E695F)' }}>
              Made with care for those who study Scripture.
            </span>
          </div>
        </SettingsSection>
```

- [ ] **Step 4: Verify in browser**

Open Settings in the browser. Scroll to the bottom. The "About Selah" section should appear with:
- Centered Selah wordmark in gold
- Psalm 46:10 quote
- Collapsible Getting Started items (click to expand/collapse)
- Collapsible Troubleshooting items
- Footer text

Test expand/collapse on several items. Test in both dark and light mode.

- [ ] **Step 5: Commit**

```bash
git add src/components/settings/SettingsView.tsx
git commit -m "feat(settings): add Help & About section with FAQ and troubleshooting"
```

---

### Task 5: Final verification

- [ ] **Step 1: Run test suite**

```bash
npm test
```

All existing tests should still pass.

- [ ] **Step 2: Verify README renders on GitHub**

Check that the README markdown renders correctly — headings, tables, code blocks, links. The easiest way is to view it locally or push and check GitHub.

- [ ] **Step 3: Verify port change**

Check `Dockerfile` has `ENV PORT=4610`, `EXPOSE 4610`, and HEALTHCHECK uses port 4610. Check `docker-compose.yml` uses `"4610:4610"`.

- [ ] **Step 4: Verify LICENSE file exists**

```bash
cat LICENSE | head -3
```

Should show "MIT License" and copyright line.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found during documentation verification"
```
