---
slug: climate-context-not-injected
status: resolved
trigger: AI chat in reader mode is not injecting climate context into the agent prompt
created: 2026-06-06
updated: 2026-06-06
---

# Debug: climate context not injected into reader AI prompt

## Symptoms
- **Expected:** When chatting with the AI in reader mode, the grounding context sent to
  the model includes the passage's climate / cultural-historical context.
- **Actual:** Climate context never appears in the prompt, even when the passage has
  climate data (`NarrativeUnit.climateNote` and `PassageClimate` rows).

## Root Cause
`extractReaderContext` (`src/lib/ai/grounding/extractors/reader.ts`) silently dropped
the climate data on two paths:

1. **Narrative block** injected `relationalNote` and `conceptualNote` but skipped the
   sibling `climateNote` field (schema: `prisma/schema.prisma:391`).
2. **Passage context** destructured `{ sceneCast, themes, crossReferences, commentaries }`
   from `getPassageContext(...)` — omitting `climateContexts`, which the query *does*
   return (`src/lib/reader/queries.ts:501`). With the variable never bound, no climate
   grounding section was ever assembled.

Net effect: the "climate" lens had data in the DB and in the query result, but the
reader extractor never carried it into the `ContextSection[]` handed to the prompt
builder.

## Fix
`src/lib/ai/grounding/extractors/reader.ts`:
- Add `climateNote` to the Narrative Context block (`**Cultural & Historical Climate:**`).
- Destructure `climateContexts` from `passageCtx`.
- Emit a dedicated `climate` section (`label: 'Climate & Culture'`, `defaultEnabled: true`)
  between the Themes and Strong's sections. `climateContexts` arrive pre-filtered by the
  caller's visible source tiers, so no extra tier filtering is needed here.

## Verification
- Added regression test `tests/lib/ai/grounding/extractors/reader.test.ts` (vitest,
  mocks `@/lib/db` + `@/lib/reader/queries` + `@/lib/settings/queries`):
  - asserts `climateNote` lands in the `narrative` section
  - asserts a `climate` section is emitted from `passageCtx.climateContexts`
- RED before fix (both assertions failed; narrative showed relational/conceptual only,
  no `climate` section). GREEN after fix (2/2 pass).
- `tsc --noEmit` clean.

## Files Changed
- `src/lib/ai/grounding/extractors/reader.ts`
- `tests/lib/ai/grounding/extractors/reader.test.ts`
