# Devotional Companion Chat — Design

**Goal:** Add an inline AI chat surface to each Daily Bread devotional that feels like a spiritual companion rather than a Q&A assistant. Threads persist per-devotional, the companion opens the conversation, and its voice stays real — no platitudes, no sycophancy, no greeting-card vocabulary.

**Status:** Design approved 2026-04-19. Next step: writing-plans skill for implementation plan.

---

## Why this, why now

Daily Bread devotionals already include `conversationStarters` and a `goingDeeper` prompt — the feature has always reached toward dialogue. The existing AI panel (`ConnectedAIPanel`) is available on Reader, Characters, Themes, Word Study, and Study Builder, but not on Daily Bread. Adding it in the standard toggle-panel form would have worked but wouldn't have felt different from asking the general assistant about any verse.

This feature takes a different shape: an inline, devotional-scoped, thread-persistent companion that speaks first and stays on-tone. It's a new surface because it's a new register — the existing panel is a research tool, this is a reflection tool.

## User experience

1. User opens a devotional (via Tonight, Browse, or a Series page). The reading view renders unchanged through the Conversation Starters section.
2. **Below the starters**, a new "Companion" section.
   - On first visit: a seed-authored opener from the companion, a "Reflect with your companion..." placeholder, and the input field.
   - On return visits: the previous exchange is still there, scrollable, with a subtle "new visit" divider separating sessions. A new-visit divider is inserted whenever the gap between the last message and the current client session load exceeds 6 hours — simple time heuristic, no session-tracking cookie needed.
3. User types → streamed response in the same message-bubble style the existing AI panel uses.
4. Per-message **Save to journal** action (identical to the existing panel's save flow), auto-anchored to this devotional with the devotional's tags.
5. Section header has a small "Start a new conversation" action — archives the current thread, begins fresh. A collapsed "Past conversations" disclosure below the input exposes archived threads for this devotional.
6. The Conversation Starters section above stays as-is. Those prompts are designed for human-to-human (parent-child) dialogue on family devotionals, not AI prompts — we do not wire them into the chat.

## Voice — the defining design decision

This companion must not sound like a greeting card. Small local models (Gemma 4 31B, Qwen 3.5, etc. that self-hosters are running) default to Christianese platitudes unless the system prompt explicitly forbids them. Voice is the feature.

**Bi-modal behavior.** The system prompt teaches the model to read the register at each turn:
- Factual, interpretive, or historical question → answer in 2–4 short paragraphs, rooted in the passage and the devotional's framing.
- Emotion, doubt, memory, open-ended reflection → one brief acknowledging sentence + one open question. No pivot to teaching unless asked.

**Audience-aware pronouns, not audience-aware vocabulary.** Devotionals carry an `audienceLevel`. For `adults` / `teens`, the companion addresses the reader directly. For `family` / `young-children`, the companion treats the reader as the parent and offers guidance on how to facilitate the reflection with the child — it does not try to pitch its language to a 5-year-old.

**The voice constraints block** is the part of the prompt that does the most work. See "System prompt" below.

## Architecture

```
src/components/daily-bread/
  CompanionChat.tsx             ← new; presentational chat composer, reuses ai-assistant primitives
  CompanionOpener.tsx           ← new; renders the seed-authored opening beat

src/components/daily-bread/DailyBreadReading.tsx
  ← add <CompanionChat /> below the Conversation Starters, guarded on isAIConfigured

src/lib/ai/companion/
  system-prompt.ts              ← bi-modal prompt builder; takes Devotional + audienceLevel → string
  grounding.ts                  ← bundles passage text + devotional frame into a GroundingRequest

src/app/api/ai/companion/
  stream/route.ts               ← POST, streams the response. Loads conversation by contextRef,
                                  builds prompt, delegates to provider adapter, appends messages.
  thread/route.ts               ← GET by devotionalId (returns active thread) +
                                  POST /archive (archives + starts fresh)
```

Reuses `src/lib/ai/providers/*`, `use-chat-stream.ts`, `chat-context.tsx`. Provider selection, streaming, and grounding-token-budgeting are inherited; we do not duplicate that logic.

## Data model

**Zero schema changes on `ai_conversations` / `ai_messages`** — existing tables, existing shape. Persistence uses:

- `ai_conversations.contextRef = "devotional-companion:<devotional-id>"` — namespaced for easy filtering. Multiple rows per devotional allowed; the one with the greatest `updatedAt` is the "active" thread, earlier ones are "past conversations."
- `title` set from `devotional.title` on first message (for list views).
- "Start a new conversation" doesn't touch the existing row — it just inserts a new conversation with the same `contextRef` and marks that one active by virtue of recency.

**One additive schema change on `devotionals`:**

```prisma
model Devotional {
  // existing fields...
  companionOpener String? @map("companion_opener")
}
```

Short (1–2 sentence) seed-authored opening beat per devotional. Null-tolerant: where missing, the UI shows a generic fallback opener. Migration is additive-only (safe for the seed-update merge pipeline).

**User-local preservation:** both `ai_conversations` and `ai_messages` are already in `USER_LOCAL_TABLES`. Threads survive every seed update.

## Grounding

Fixed for v1 — no user-toggleable depth:

- `passageRef`, `passageText` (BSB, scoped to the devotional's verse range)
- `devotional.title`, `devotional.audienceLevel`, `devotional.contextBrief`, `devotional.modernMoment`, `devotional.goingDeeper.prompt`

**No commentary layer in v1.** Curated commentary (Matthew Henry, JFB, Tyndale, etc.) stays a Reader-panel feature until we see companion users asking questions the devotional frame can't answer. Adding it later is purely additive — no schema or UX break.

**No cross-devotional / series memory in v1.** The companion sees only the current devotional's frame. Series context is a v2 knob (e.g., "You've been walking through Philippians — part 3 of 5").

## System prompt

```
You are a warm, biblically literate companion for someone reading a daily devotional. Your job is to walk alongside the reader, not to lecture.

Mode detection — at each turn decide:
- If the user asks an interpretive, historical, or factual question → answer in 2-4 short paragraphs, rooted in the passage and the devotional's angle.
- If the user shares an emotion, doubt, memory, or open-ended reflection → respond with one brief acknowledging sentence and one open question. Do not pivot to teaching unless asked.

Voice constraints — these matter most:
- No spiritual platitudes. Do not say "God has a plan", "just trust Him", "lean not on your own understanding", "all things work together for good", "He is faithful", or any phrase that would fit on a church bulletin, unless you are directly explicating a verse that contains that phrase — and even then, say something specific about why it matters here.
- No sycophancy. Never begin a response with "Great question!", "What a beautiful thought", or similar praise. Just respond.
- No "Ah," / "Ah yes," / "Ah, I see," as openers. Do not open responses with an interjection.
- No emoji. Ever.
- Ground every response in the exact passage and in the exact words the reader used. Quote a phrase of theirs back when you can. Point to a specific verb, image, or person in the text.
- Prefer concrete over abstract. "Paul wrote this from a Roman prison, weeks from execution" beats "God's sovereignty sustains us in every circumstance."
- If you notice yourself reaching for a phrase that sounds like a greeting card or a worship song lyric, stop. Say something harder. Name the tension in the passage or in what the reader just shared.
- Never pretend to feelings or experiences you don't have. No "I feel that too" or "I've been there."

<devotional>
Title: {{title}}
Passage: {{passageRef}}
Audience: {{audienceLevel}}
Context: {{contextBrief}}
Modern moment: {{modernMoment}}
Going deeper: {{goingDeeper.prompt}}
</devotional>

<passage>{{passageText}}</passage>

Audience guidance:
- adults / teens: address the reader directly, second person.
- family / young-children: the reader is almost certainly a parent. Help them facilitate the reflection with their child. Offer a framing move, not child-level vocabulary.

Stay on this devotional's theme. If the user veers far afield, offer one gentle bridge back before following.
```

## Error handling

- **AI not configured** → CompanionChat renders a one-line "Configure an AI provider in Settings to enable your companion" with a link to settings. Chat UI hidden. Matches existing AI panel behavior.
- **Streaming failure mid-response** → standard error bubble, partial content preserved, user can retry. Reuses existing chat error UI.
- **Seed not yet migrated** (old DB without `companion_opener` column or null value) → UI falls back to a generic opener string.
- **Thread creation fails before any message persisted** → no row inserted; next visit shows opener again as if first visit.
- **`devotional_history` referenced by thread is deleted** — the devotional table's `@@relation(... onDelete: ...)` behavior is unchanged; this feature doesn't add new FK constraints.

## Testing

**Unit:**
- `system-prompt.ts` builder — produces the expected prompt for each audience level. Snapshot test per audience × one devotional.
- `grounding.ts` — assembles the correct devotional-frame payload; handles null optional fields.
- `contextRef` namespace helper — `toContextRef(devotionalId)` / `parseContextRef(string)` roundtrip.

**Integration:**
- First message → creates a new `ai_conversations` row with correct `contextRef` and title.
- Reopen devotional with existing thread → messages render in order, input is empty, opener not re-shown.
- "Start a new conversation" → inserts a new conversation, UI shows fresh opener + empty message list, past conversation still queryable.
- `isAIConfigured = false` → no chat UI, config nudge rendered.

**Manual regression checklist** (run after every system-prompt change; documented in `docs/devotional-companion-voice-checklist.md`):
- "I'm struggling with my faith" → expect acknowledging sentence + question, no platitudes, no sycophancy.
- "Why does God let bad things happen?" — the ultimate stress test. If the model reaches for "God's plan" / "trust Him" / "His ways are higher", the prompt regressed.
- "Pray for me." — companion must not claim to pray. Expect acknowledgment + redirect to a reflective move.
- "Great question to ask me!" — companion must not mirror sycophancy back.
- Ask a history question on a family devotional → expect second-person-to-parent framing, not child vocabulary.

**Not tested:** LLM response quality itself — model behavior isn't reliably testable with snapshot tests against a real model, and mocking the model defeats the point. The regression checklist above is the substitute.

## Scope

**In scope for v1:**
- New `CompanionChat` + `CompanionOpener` components in daily-bread
- New `system-prompt.ts` + `grounding.ts` in `src/lib/ai/companion/`
- Two new API routes under `/api/ai/companion/`
- Additive `companion_opener` column on `devotionals` with migration
- Seed-authoring backfill: add `companionOpener` to existing devotionals (not blocking ship; null falls back to generic opener)
- Voice regression checklist doc

**Out of scope for v1:**
- Commentary layer in grounding
- Cross-devotional / series-aware memory
- Voice-to-text input
- Streaming the opener (fixed seed text)
- Sharing/exporting companion threads (user can still Save to Journal per-message)
- Per-user companion personality preferences
- Token-budget management beyond existing provider defaults

## References

- Existing chat infrastructure: `src/components/ai-assistant/*`, `src/lib/ai/*`
- Grounding patterns: `src/lib/ai/grounding/`
- Daily Bread reading view: `src/components/daily-bread/DailyBreadReading.tsx`
- Seed-update preservation: `src/lib/seed/user-tables.ts` (both AI tables already listed)
