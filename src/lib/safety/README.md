# Selah Safety Detection — Taxonomy Maintenance Guide

This directory contains the companion safety detection system. **Read
this before proposing any change to `keyword-taxonomy.ts`, `scan.ts`,
or `marker.ts`.** The taxonomy is not an ordinary allowlist — bad
additions cause real harm.

## The core rule

The keyword taxonomy is a deterministic floor for detecting distress
signals in child-locked companion conversations. A well-tuned taxonomy
prefers false positives over false negatives — **but a poorly tuned
taxonomy causes false positives on innocent phrases, which is worse
than false negatives.**

### Why false positives on innocents are worse

If a parent sees `[concerning] I'm dying laughing at this video`
flagged every day, they stop reading flags. When a real signal fires,
it's lost in the noise. Trust in the system collapses. Kids pay the
price.

## Examples of the rule in action

| Phrase | Flag? | Why |
|---|---|---|
| `"I want to die"` | critical | Direct suicidal ideation — unambiguous |
| `"I'm dying laughing"` | never | Idiomatic; "dying" is hyperbole |
| `"I'm dying for pizza"` | never | Same — common idiomatic usage |
| `"I hate myself"` | concerning | Self-directed hatred, specific phrase |
| `"I hate Mondays"` | never | Object is an external day, not self |
| `"hurt myself"` | critical | Self-harm phrase |
| `"this hurts my feelings"` | never | Different semantic frame |
| `"nobody would miss me"` | critical | Worthlessness-to-others crisis signal |
| `"nobody would notice this change"` | never | About a work item, not self |
| `"she killed it at the recital"` | never | "Kill" is idiomatic praise |

## Decision checklist for a new keyword

Before adding a phrase to `KEYWORD_TAXONOMY`:

- [ ] **Semantic uniqueness:** Does this phrase appear in common
  innocent usage? If the same word sequence shows up in casual
  conversation, internet slang, or idioms, **do not add it**. Brainstorm
  non-distress uses before adding.
- [ ] **Minimum length:** Is the phrase at least 2 words? Single words
  are almost never safe signals.
- [ ] **Self-reference required for self-harm:** If the phrase is about
  hurting/dying/hating, does it require a self-reference pronoun
  (`myself`, `me`, `I`) as part of the pattern? If not, it will
  false-positive on third-party references.
- [ ] **Tested against `tests/safety/scan.test.ts` false-positive
  cases:** Run `npx vitest run tests/safety/scan.test.ts` after
  adding. All existing false-positive negative tests must still pass.
- [ ] **Added to the false-positive regression list:** Add a negative
  test case for a common innocent phrase that the new pattern could
  accidentally match. The test codifies the reasoning for future
  contributors.
- [ ] **Adult review required:** If you are an AI agent, ask the user
  to review the addition before committing. Never add a keyword
  unilaterally.

## Two independent detection layers

- `scan.ts` — deterministic keyword floor, runs on user messages
- `marker.ts` — parser for Haiku-emitted `[SAFETY:*]` markers on
  assistant responses

Either layer alone flags the conversation for review. Design intent:
the floor catches cases the model misses; the model catches contextual
cases the floor can't pattern-match. Never remove the floor to reduce
false positives — remove or tune individual patterns instead.

## When to revise this guide

- When Haiku (or the approved default model) changes its safety
  behavior — check `tests/safety/regression.test.ts` first.
- When you observe parents ignoring flags in production — that's a
  false-positive-rate signal that should prompt taxonomy tuning.
- When a real crisis slipped through — that's a false-negative signal.
  Add a new pattern AND a regression test that would have caught it.
