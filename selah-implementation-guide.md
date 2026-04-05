# Selah — Implementation Guide

> **For**: Claude Code  
> **Purpose**: Build the Selah application from the completed design and data layer.  
> **State**: UI designed (design-os), data layer populated (SQLite), brand system defined. Ready to implement.

---

## What Exists

### Data Layer (COMPLETE)
The SQLite database is populated with:
- 1,256 translations, 1,163,122 verses across all translations
- 14,197 Strong's dictionary entries + verse mapping
- 344,799 scored cross-references
- Commentary sources and entries (curated Tier 1 + extended Tier 2)
- 252 character profiles (top 126 enriched with commentary)
- 294 themes in hierarchical taxonomy
- 10 climate context era profiles
- 400+ narrative units (enriched with commentary) covering Genesis through Revelation
- 66 books with canonical ordering

### Design (COMPLETE)
- Shell design from design-os with all nine screens
- Three-panel layout: sidebar nav, content pane, context drawer
- Dark mode and light mode verified
- Component patterns established (scene cast cards, source tier pills, resurfacing cards, lens tags)

### Brand System (COMPLETE)
- `BRAND.md` — Code-friendly reference with all tokens, type scale, motion specs, component patterns
- `selah-brand-tokens.css` — CSS custom properties ready for import
- `selah-brand-board.html` — Visual reference (open in browser for comparison during build)

### Source Documents (REFERENCE ONLY — do not implement from these, use this guide)
- `bible-app-prd.md` — Full PRD with feature specs and API endpoints
- `bible-app-schema.sql` — SQLite schema (the database already implements this)
- `selah-prebake-prompts.md` — Pipeline prompts (pipeline is complete, this is historical)

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Server components where appropriate |
| Language | TypeScript | Strict mode |
| ORM | Prisma | SQLite provider, type-safe queries |
| Database | SQLite | WAL mode, FTS5 for search, single file |
| Styling | CSS custom properties | Import `selah-brand-tokens.css`, no Tailwind |
| Container | Docker + Docker Compose | Single `docker compose up` deployment |
| Process Manager | None needed | Next.js serves directly |

---

## Project Structure

```
selah/
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── prisma/
│   └── schema.prisma              # Generated from existing SQLite schema
├── data/
│   └── selah.db                   # Pre-populated SQLite database (ships with image)
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout: sidebar nav, theme provider
│   │   ├── page.tsx               # Home screen
│   │   ├── reader/
│   │   │   └── [book]/[chapter]/page.tsx   # Reader with context drawer
│   │   ├── characters/
│   │   │   ├── page.tsx           # Character browser
│   │   │   └── [id]/page.tsx      # Character profile
│   │   ├── themes/
│   │   │   ├── page.tsx           # Theme browser
│   │   │   └── [id]/page.tsx      # Theme detail
│   │   ├── word-study/
│   │   │   └── [number]/page.tsx  # Strong's deep dive
│   │   ├── sermon-builder/
│   │   │   ├── page.tsx           # Builder landing
│   │   │   └── [id]/page.tsx      # Active sermon project
│   │   ├── journal/
│   │   │   └── page.tsx           # Journal, collections, bookmarks
│   │   ├── daily-bread/
│   │   │   └── page.tsx           # Devotional mood picker + display
│   │   ├── settings/
│   │   │   └── page.tsx           # All settings panels
│   │   └── api/                   # API routes (see Section: API)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx        # Nine-item nav, collapsible, Selah wordmark
│   │   │   ├── ContextDrawer.tsx  # Right-side three-lens drawer
│   │   │   └── ThemeProvider.tsx   # Dark/light/system mode
│   │   ├── reader/
│   │   │   ├── PassagePane.tsx    # Scripture text with verse numbers, Words of Jesus, Strong's links
│   │   │   ├── VerseDisplay.tsx   # Single verse rendering with gold border on active
│   │   │   ├── TranslationSelector.tsx
│   │   │   ├── ParallelView.tsx   # Side-by-side translations
│   │   │   └── ResurfacingCard.tsx # "You've been here before" card
│   │   ├── context/
│   │   │   ├── SceneCast.tsx      # Character cards with role, emotion, stakes, modern bridge
│   │   │   ├── ThemePanel.tsx     # Theme tags with passage-specific annotations
│   │   │   ├── ClimatePanel.tsx   # Political, economic, social, religious, geographic
│   │   │   ├── CrossRefPanel.tsx  # Scored cross-references with chain navigation
│   │   │   └── CommentaryPanel.tsx # Curated tier + extended toggle
│   │   ├── characters/
│   │   │   ├── CharacterCard.tsx  # Compact card for lists
│   │   │   └── CharacterProfile.tsx # Full profile with emotional arc, faith journey
│   │   ├── themes/
│   │   │   ├── ThemeCard.tsx
│   │   │   └── ThemeDetail.tsx
│   │   ├── word-study/
│   │   │   ├── StrongsPopover.tsx # Inline click-to-define
│   │   │   └── StrongsDetail.tsx  # Full word study page
│   │   ├── daily-bread/
│   │   │   ├── MoodPicker.tsx     # Visual grid of life situations
│   │   │   ├── DevotionalCard.tsx # Daily bread display
│   │   │   └── ConversationStarters.tsx
│   │   ├── sermon/
│   │   │   ├── TopicInput.tsx     # Topic/question entry
│   │   │   ├── AssembledMaterial.tsx # Reorderable collection
│   │   │   └── ExportButton.tsx   # DOCX export
│   │   ├── journal/
│   │   │   ├── NoteEditor.tsx     # Multi-anchor, type classification, tag picker
│   │   │   ├── JournalTimeline.tsx
│   │   │   ├── CollectionBuilder.tsx
│   │   │   └── BookmarkList.tsx
│   │   ├── ai/
│   │   │   ├── ChatPanel.tsx      # Slide-out AI chat (only when configured)
│   │   │   └── ProviderConfig.tsx # Provider picker, API key, test connection
│   │   ├── shared/
│   │   │   ├── SourceTierPill.tsx # Hardcoded hex — see below
│   │   │   ├── LensTag.tsx        # Terracotta/teal/sage clickable tags
│   │   │   ├── SearchBar.tsx      # Universal search
│   │   │   └── ExportMenu.tsx     # DOCX/Markdown export
│   │   └── icons/                 # Lucide or custom SVG icons
│   ├── lib/
│   │   ├── db.ts                  # Prisma client singleton
│   │   ├── ai/
│   │   │   ├── provider.ts        # Provider abstraction interface
│   │   │   ├── anthropic.ts       # Claude adapter
│   │   │   ├── google.ts          # Gemini adapter
│   │   │   ├── openai.ts          # GPT adapter
│   │   │   ├── ollama.ts          # Local model adapter
│   │   │   └── custom.ts          # OpenAI-compatible adapter
│   │   ├── search.ts              # FTS5 query helpers
│   │   ├── resurfacing.ts         # Five-channel note surfacing engine
│   │   ├── export.ts              # DOCX/Markdown generation
│   │   └── backup.ts              # Backup/restore logic
│   └── styles/
│       ├── selah-brand-tokens.css # Brand tokens (import as-is)
│       ├── globals.css            # Global styles, font imports
│       └── components.css         # Component-specific styles if needed
└── CLAUDE.md                      # Claude Code project instructions
```

---

## Implementation Phases

### Phase 1: Foundation
1. Initialize Next.js project with TypeScript
2. Set up Prisma with SQLite provider, introspect from existing database
3. Import brand tokens CSS
4. Import fonts (Cormorant Garamond, Source Sans 3, JetBrains Mono from Google Fonts)
5. Build root layout with ThemeProvider (dark/light/system using `data-theme` attribute)
6. Build Sidebar component (nine nav items, collapsible, Selah wordmark, active state with gold accent)
7. Build Docker configuration (Dockerfile + docker-compose.yml, volume mount for SQLite)
8. Verify: `docker compose up` serves a working shell at localhost:3000

### Phase 2: Reader (Core Screen)
1. Build PassagePane — renders chapter text with:
   - Verse numbers in JetBrains Mono, gold-500 color
   - Words of Jesus in terracotta (#D4836B dark, #A0523A light)
   - Strong's numbers as clickable superscripts
   - Gold left-border on active/selected verse
   - Footnote markers with expandable content
2. Build TranslationSelector — dropdown showing current translation (BSB default), switch between loaded translations
3. Build ParallelView — up to 3 parallel translations side-by-side
4. Build ContextDrawer — right-side panel with five collapsible sections:
   - Scene Cast (terracotta left-border) — character cards with role, emotional state, stakes, modern bridge italic
   - Themes (teal left-border) — theme tags with passage-specific annotations
   - Climate (sage left-border) — environmental portrait
   - Cross-references (gold left-border) — scored, sortable, with chain navigation
   - Commentary (neutral left-border) — curated tier shown, "Additional commentaries" toggle for extended
5. Build SourceTierPill — **HARDCODED HEX, NOT CSS VARIABLES**:
   - Canon: bg `#FBF3E0`, text `#7A5C1F`, dot `#C6A23C`
   - Scholarship: bg `#EFF8F6`, text `#2B6B5A`, dot `#4A9E88`
   - Historical: bg `#F5F5ED`, text `#5A5D3C`, dot `#8A8E64`
   - AI-assisted: bg `#EEF2F7`, text `#4A6380`, dot `#6B91B5`
   - Conjecture: bg `#FAF0E6`, text `#8B6B3E`, dot `#C9A96E`, border `1px dashed #C9A96E`
   - Same values in BOTH dark and light mode — small badges must pop against any surface
6. Build LensTag pills at bottom of reading pane — terracotta for characters, teal for themes, sage for climate. Clickable: character tags open character profile in drawer/page, theme tags navigate to theme detail, climate tags expand climate panel
7. Build ResurfacingCard — "YOU'VE BEEN HERE BEFORE" inline in reading flow:
   - Gold left-border (3px solid #C6A23C)
   - Header: 10px uppercase tracking, tertiary color
   - Journal text: gold-700 (#7A5C1F) in light mode, gold-100 (#F5E4B8) in dark mode
   - Entrance animation: 400ms ease-out fade + 8px upward translate
8. Build StrongsPopover — inline click-to-define when clicking a Strong's number in the text

### Phase 3: Discovery Screens
1. Build Characters page — browser with search, filterable by era/prominence. **No sort by importance** — the second lead principle means alphabetical or era-based, never ranked
2. Build Character profile page — bio, emotional arc table, faith journey, appearances list (each linking back to reader), relationship graph, modern bridge framing
3. Build Themes page — hierarchical browser, search, category filter
4. Build Theme detail page — definition, modern framing, tagged passages with relevance level and context notes
5. Build Word Study page — Strong's number, original word, transliteration, pronunciation, definition, every verse occurrence, cross-translation comparison
6. Build universal SearchBar — searches across verses (FTS5), characters, themes, narrative units, Strong's entries. Results grouped by type.

### Phase 4: Home & Daily Bread
1. Build Home page with three sections:
   - Daily Bread card (today's devotional if not completed, welcome-back if done)
   - Recent reading history (passages, characters, themes recently visited)
   - Universal search bar
2. Build MoodPicker — visual grid of tappable life situations organized by category ("what's on your mind tonight?"). NOT a dropdown. NOT a search bar. A grid of cards/pills.
3. Build DevotionalCard — passage, context_brief, modern_moment, conversation starters, going_deeper link
4. Build devotional completion flow — mark as used, optional family notes, 1-5 rating
5. Build smart surfacing logic — prioritize unused devotionals, factor in ratings, filter by audience/season

### Phase 5: Personal Tools
1. Build NoteEditor — multi-anchor support (verse + character + theme simultaneously), note_type picker (annotation, reflection, question, sermon_idea, insight, prayer), personal tag picker with autocomplete, theme tag picker from system taxonomy
2. Build JournalTimeline — chronological view of all notes, filterable by type/tag/theme/anchor
3. Build resurfacing engine (`lib/resurfacing.ts`) — five channels:
   - Direct verse anchor match
   - Theme overlap (passage themes ∩ note themes)
   - Character overlap (scene cast ∩ note character anchors)
   - Cross-reference chain (current verse → xref targets → notes anchored to those targets)
   - FTS resonance (passage text keywords → note content FTS match)
4. Build CollectionBuilder — drag/reorder items (passages, characters, themes, notes), annotate each with "why included", export to DOCX
5. Build BookmarkList — lightweight verse markers, quick retrieval
6. Build reading history tracking

### Phase 6: Sermon Builder
1. Build TopicInput — accepts a topic, question, or concept
2. Build assembly engine — queries narrative units, characters, themes, cross-references for relevant material
3. Build AssembledMaterial view — reorderable list of passages with three-lens annotations, character connections, preaching angles, key questions
4. Build annotation layer — user notes on each assembled item
5. Build DOCX export — formatted Scripture with translation attribution, annotations, commentary excerpts, user notes

### Phase 7: AI Integration (Optional Feature)
1. Build provider abstraction (`lib/ai/provider.ts`) — interface with `sendMessage(systemPrompt, userMessage): Promise<string>`
2. Build adapters for each provider — request template + response parsing per provider config in database
3. Build ProviderConfig component — provider picker dropdown, API key input, model selector, "Test Connection" button
4. Build ChatPanel — slide-out from right edge, floating trigger button (bottom-right, only visible when AI is configured)
5. Build context injection — server-side, before sending to provider: inject current passage text, relevant commentary, cross-references, user notes on the topic
6. Build "save to journal" action on AI messages — links back to conversation, lets user add anchors and tags before saving
7. **When AI is not configured**: ChatPanel trigger button does not render. No empty states. No "configure AI to unlock" messaging. The app does not acknowledge the feature exists.

### Phase 8: Settings & Infrastructure
1. Build Settings page with three sections:
   - Translation management (primary + up to 3 parallels, Strong's toggle, cross-ref toggle)
   - AI provider configuration (provider picker, key, model, test button)
   - Study preferences (commentary tier visibility, source tier filter, conjecture toggle, Daily Bread audience/season)
2. Build backup system:
   - Manual download button (exports user data tables as timestamped .db)
   - Auto-backup (daily snapshot to /backups volume, 30-day retention)
   - Restore from backup file upload
3. Build DOCX + Markdown export infrastructure (`lib/export.ts`)
4. Build first-launch experience — warm personal welcome screen, not a config wizard. Scripture in 60 seconds. Personal note from builder.

### Phase 9: Polish
1. Responsive design verification at tablet/mobile breakpoints
2. Dark mode refinement — verify all components against brand board
3. Performance optimization — SQLite query tuning, FTS ranking, lazy loading for large result sets
4. Docker image optimization (multi-stage build, minimize image size)
5. Resurfacing card contrast fix — verify gold-700 light / gold-100 dark rendering
6. Animation and transition implementation per brand spec (page: 300ms, panel: 250ms, hover: 150ms, resurface: 400ms)
7. Loading states — warm gold pulse skeleton screens, never spinners
8. Error states — warm, conversational voice per BRAND.md

---

## API Routes

All routes are internal Next.js API routes. See `bible-app-prd.md` Section 5 for the complete endpoint listing. The critical routes to implement first:

### Reader (Phase 2)
```
GET /api/read/[translationId]/[bookId]/[chapter]    — Chapter text
GET /api/verse/[bookId]/[chapter]/[verse]            — Single verse, all translations
GET /api/passage/[bookId]/[chapter]/[verse]/context  — THREE-LENS CONTEXT (the "give me everything" endpoint)
GET /api/scene/[bookId]/[chapter]/[verseStart]       — Scene cast
GET /api/xref/[bookId]/[chapter]/[verse]             — Scored cross-references
GET /api/strongs/[number]                            — Strong's entry
GET /api/commentaries/parallel/[bookId]/[chapter]/[verse] — All commentaries for a verse
```

### Discovery (Phase 3)
```
GET /api/characters                                  — List/search characters
GET /api/characters/[id]                             — Full profile
GET /api/characters/[id]/appearances                 — Scene appearances
GET /api/themes                                      — Theme taxonomy
GET /api/themes/[id]                                 — Theme detail with tagged passages
GET /api/search?q=                                   — Universal search
```

### Daily Bread (Phase 4)
```
GET /api/devotionals/tonight                         — Smart pick
GET /api/devotionals/tonight?mood=[tagId]            — Pick by situation
GET /api/devotional-tags                             — Mood picker taxonomy
POST /api/devotionals/[id]/complete                  — Mark done, rate, notes
```

### Notes (Phase 5)
```
GET/POST /api/notes                                  — List/create notes
GET /api/notes/surface/[bookId]/[chapter]/[verse]    — RESURFACING ENGINE (five channels)
POST /api/notes/[id]/anchors                         — Add anchor
POST /api/notes/[id]/themes                          — Tag with theme
```

### AI (Phase 7)
```
GET /api/ai/status                                   — Is AI configured?
POST /api/ai/chat                                    — Send message with context injection
```

---

## Critical Implementation Details

### Source Tier Pills — HARDCODED HEX
CSS variable chains break silently in cascade conflicts. Use inline hex on the component. This was validated across four design iterations. See source values above in Phase 2, step 5.

### Resurfacing Card Text Contrast
- Light mode: journal quote text = `#7A5C1F` (gold-700)
- Dark mode: journal quote text = `#F5E4B8` (gold-100)
- Do NOT use a CSS variable for this — hardcode per mode

### Words of Jesus Rendering
- Dark mode: `#D4836B`
- Light mode: `#A0523A`

### AI Panel Visibility
The AI chat trigger button renders ONLY when `app_settings.ai_enabled = 'true'` AND a valid provider/key is configured. When not configured, the button does not exist in the DOM. No placeholder. No teaser. The app is complete without it.

### Second Lead Principle in UI
The character browser NEVER sorts by prominence or importance. Default sort is alphabetical or by era. Every character card gets the same visual weight regardless of how many appearances they have. The scene cast in the context drawer lists characters by role (protagonist → deuteragonist → witness → bystander) but gives equal card size and content depth to each.

### Graph Navigation Behavior
When a user clicks a character name in the scene cast, a theme tag in the context drawer, or a cross-reference link — stay in context via inline drawers and panels. Only navigate away to a full page when the user explicitly clicks through to a deep-dive (e.g., "View full profile" link on a character card). The rabbit hole is the feature — don't break flow.

### Commentary Two-Tier Display
Curated commentaries (Matthew Henry, Pulpit, Gill, JFB, Barnes, Cambridge, Keil-Delitzsch, Bengel, Tyndale) show by default in the commentary panel. An "Additional commentaries" toggle reveals extended tier. Both tiers are Tier 2 in the source hierarchy — the display tier controls UI visibility, not trust level.

### Fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap');
```

### Docker Configuration
```yaml
# docker-compose.yml
version: '3.8'
services:
  selah:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - selah-data:/app/data
      - selah-backups:/app/backups
    environment:
      - DATABASE_URL=file:/app/data/selah.db
      - NODE_ENV=production
volumes:
  selah-data:
  selah-backups:
```

The pre-populated database ships inside the Docker image. On first run, it's copied to the volume mount so user data persists across container rebuilds. Subsequent runs use the volume copy.

---

## Files That Matter (Ignore Everything Else)

| File | Purpose | When to Reference |
|---|---|---|
| This file (`implementation-guide.md`) | Master build guide | Always — this is the source of truth |
| `BRAND.md` | Colors, typography, motion, voice, component patterns | When building any UI component |
| `selah-brand-tokens.css` | CSS custom properties | Import into project styles |
| `selah-brand-board.html` | Visual reference | Open in browser for comparison |
| `bible-app-prd.md` Section 5 | Complete API endpoint listing | When building API routes |
| `bible-app-schema.sql` | Database schema reference | When writing Prisma schema |
| Existing SQLite database | Pre-populated data | Ships with the Docker image |

All other markdown files (eval docs, pipeline prompts, design feedback, iteration notes) are historical artifacts from the design and pre-bake phases. They do not govern implementation.

---

## Done Criteria

The app is ready to ship when:
1. `docker compose up` starts cleanly on a Mac with Docker Desktop
2. All nine screens render correctly in both dark and light mode
3. The Reader displays scripture with Words of Jesus, Strong's links, and gold verse indicator
4. The context drawer shows all five sections with correct lens-colored borders
5. The resurfacing engine surfaces past notes when visiting related passages
6. The Daily Bread mood picker returns appropriate devotionals
7. The Sermon Builder assembles material from a topic query and exports to DOCX
8. The Word Study page shows full Strong's entries with verse occurrences
9. Universal search returns results across passages, characters, themes, and Strong's entries
10. AI chat works when configured and is invisible when not
11. Backup download produces a restorable .db file
12. First-launch experience feels like unwrapping a gift, not configuring software
