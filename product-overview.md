# Selah — Product Overview

## Summary

Selah is a self-hosted Bible study application that treats Scripture as a world to be explored, not text to be read. Every passage is a scene with a cast, a climate, and a set of themes — examined through three lenses (relational, conceptual, climate) with modern-bridge framing woven into the voice of the app itself.

**Core design principles:**

- **Three-lens exploration** — Every passage is examined through relational (who is present), conceptual (what themes thread through), and climate (what the world looks like) lenses, presented as layers of a single view.
- **The second lead principle** — Prominence does not determine visibility. The unnamed woman at the well gets the same contextual weight as Jesus. The character browser never sorts by importance.
- **Source tier transparency** — Every piece of content carries a visible source tier designation (Canon, Scholarship, History, AI-Assisted, Conjecture) with distinct visual treatments. Users always know what they're reading.
- **Graph navigation** — The rabbit hole is the feature. Clicking any entity opens an inline drawer or panel; the user stays in context. Only an explicit "open full profile" action navigates away.
- **Self-hosted and private** — Ships as a single Docker container. All data stays on the user's machine. Full backup and restore built in. An optional AI assistant (provider-agnostic) adds Tier 4-5 exploration but the app works completely without it.

## Planned Sections

1. **Reader** — Core reading experience with passage pane, three-lens context drawer (scene cast, themes, climate), parallel translations, cross-references, commentary, and "you've been here before" resurfacing.
2. **Characters** — Browser for biblical people governed by the second lead principle. Discover card, combinable filters, timeline-based profiles with spiritual arc, relationships, and connected themes.
3. **Themes** — Browser for conceptual threads across the canon. Clustered category map, thread prompts, theme profiles with density trace bar, era-grouped passages, and related themes.
4. **Word Study** — Deep dives into original-language words via Strong's numbers. Original script rendering, layered definitions, translation comparison clusters, curated concordance, and frequency bar.
5. **Home** — Personalized landing with universal search, Daily Bread card, reading history, and recent journal entries. First-launch welcome experience.
6. **Daily Bread** — Devotionals designed for shared reading. Life-situation mood picker, linear reading view optimized for reading aloud, four audience levels, seasonal awareness, and gentle close-out with family notes and ratings.
7. **Study Builder** — Two-panel workspace for sermon prep and teaching. Topic-driven material assembly from the knowledge layer, drag-and-drop reordering, personal annotations, and DOCX/Markdown export.
8. **Journal** — Personal study notes with polymorphic multi-anchor system, type classification, user tags, collections, and bookmarks. Source for the "you've been here before" resurfacing system.
9. **Settings** — Translation management, AI provider configuration, study preferences, source tier visibility, and backup/restore.
10. **AI Assistant** — Optional slide-out conversational companion grounded in current context. Operates at Tier 4-5 with visible source tier indicators. "Save to journal" action bridges conversation to permanent knowledge.

## Product Entities

| Entity | Description |
|--------|-------------|
| Verse | A single verse of Scripture with text across multiple translations. Carries Strong's annotations, words-of-Jesus flag, and footnotes. |
| NarrativeUnit | A scene or pericope grouping verses into a coherent story unit. Carries three-lens annotations with source tiers. |
| Character | A biblical person with profile, emotional arc, modern-bridge framing, and typed relationships. No prominence ranking. |
| CharacterAppearance | A character's presence in a specific narrative unit — role, emotional state, motivation, stakes, modern parallel. |
| Theme | A conceptual thread tracing across the canon with contextual annotations per appearance. |
| StrongsEntry | An original-language word (Hebrew/Greek) with definition, morphology, occurrences, and translation renderings. |
| CrossReference | A semantic link between two passages with relevance score (0-100) and chain navigation support. |
| Commentary | Scholar commentary excerpt with curated/extended display tier. Both tiers are Tier 2 (scholarship). |
| ClimateContext | Historical, geographical, and cultural context for a narrative unit. Tier 3 content. |
| Location | A geographic place with coordinates, modern name, and significance. |
| Devotional | A Daily Bread entry with passage focus, three-lens reflection, modern moment, and audience level. |
| DevotionalTag | Life-situation label for the mood picker (stressed, grateful, grieving, etc.). |
| DevotionalHistory | User interaction with a devotional — completion, family notes, rating. |
| Collection | User-curated group of passages, characters, themes, notes assembled for a purpose. |
| Bookmark | Lightweight verse marker for quick retrieval. |
| JournalEntry | Personal study note with polymorphic multi-anchor, type classification, and user tags. Source for resurfacing. |
| UserTag | Personal taxonomy label separate from system themes (e.g., "revisit this", "share with small group"). |
| ReadingHistory | Tracks recent visits to passages, characters, themes, and word studies. |
| StudyProject | A study project being assembled in the Study Builder with topic, format (sermon/teaching/small group/personal), and working collection. Implemented as a `user_collection` with `collection_type` matching the format — not a separate table. |
| AIConversation | Chat thread with the AI assistant, grounded in passage/study context. Messages carry source tiers. |
| Translation | A Bible translation/version (ESV, NIV, KJV, etc.) with primary and parallel designation. |

## Design System

### Colors

| Role | Token | Hex |
|------|-------|-----|
| Primary | selah-gold | #C6A23C |
| Secondary | selah-teal | #4A9E88 |
| Neutral | warm stone | Stone palette (never pure black or white) |
| Relational lens | terracotta | #D4836B (dark) / #A0523A (light) |
| Conceptual lens | teal | Uses selah-teal range |
| Climate lens | sage | Sage green range |
| AI accent | sky-blue | Sky-400 / Sky-700 |
| Words of Jesus | terracotta | #D4836B (dark) / #A0523A (light) |

### Source Tier Visual Treatments

| Tier | Label | Visual |
|------|-------|--------|
| 1 | Canon | Gold pill badge |
| 2 | Scholarship | Teal pill badge |
| 3 | History | Sage pill badge |
| 4 | AI-Assisted | Sky blue pill badge |
| 5 | Conjecture | Dashed amber border + honest framing language |

### Typography

| Role | Font | Usage |
|------|------|-------|
| Headings | Cormorant Garamond | Page titles, section headers, wordmark, passage text display |
| Body | Source Sans 3 | UI text, nav labels, body copy, descriptions |
| Code / Numbers | JetBrains Mono | Verse numbers, Strong's annotations, API keys |

### Design Token Files

- `product-plan/design-system/tokens.css` — CSS custom properties
- `product-plan/design-system/tailwind-colors.md` — Tailwind color extension
- `product-plan/design-system/fonts.md` — Font configuration
- `product-plan/branding/branding-reference.md` — Full brand reference
- `product-plan/branding/selah-brand-tokens.css` — Brand CSS tokens

## Implementation Sequence

0. **Data Foundation** — Download source data (HelloAO SQLite, Strong's JSON, cross-references), create Prisma schema, run ETL import scripts, verify row counts
1. **Shell** — Collapsible sidebar navigation, routing, user menu, AI trigger button
2. **Reader** — Core reading experience with three-lens context drawer
3. **Characters** — Character browser and profiles
4. **Themes** — Theme browser and profiles
5. **Word Study** — Strong's number deep dives
6. **Home** — Personalized landing with search, history, and Daily Bread card
7. **Daily Bread** — Devotional mood picker, reading view, and close-out
8. **Study Builder** — Two-panel assembly workspace with export
9. **Journal** — Notes timeline, collections, bookmarks
10. **Settings** — Configuration and backup
11. **AI Assistant** — Slide-out conversational panel (requires Settings AI config)
