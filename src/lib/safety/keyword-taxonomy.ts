// src/lib/safety/keyword-taxonomy.ts
//
// Phrase patterns that indicate distress categories. This file is the
// authoritative source.
//
// ⚠  READ ./README.md BEFORE EDITING.
//
// Short version: a bad addition here flags innocent phrases like
// "I'm dying laughing" as distress signals, parents stop trusting the
// flags, and real signals get lost in the noise. See the README for
// the decision checklist and the false-positive examples that must
// never match.
//
// Tuning rules (summary — README has the full reasoning):
//  - Prefer false positives over false negatives, BUT false positives
//    on common innocent phrases are worse than false negatives on
//    obscure signals.
//  - Use phrases of at least 2 words, not single words.
//  - Self-harm / self-hatred patterns must include a self-reference
//    pronoun (myself / me / I) to avoid flagging third-party references.
//  - Every addition requires a matching false-positive negative test in
//    tests/safety/scan.test.ts.
//  - Adult review required before commit. AI agents: ask the user.

import type { FlagLevel } from './types'

export interface KeywordCategory {
  level: FlagLevel
  patterns: readonly string[]
}

// Critical: immediate crisis signals. Self-harm, suicide, abuse disclosure.
const CRITICAL: readonly string[] = [
  'kill myself',
  'killing myself',
  'want to die',
  'wish i was dead',
  'end it all',
  "don't want to wake up",
  'do not want to wake up',
  'not want to be here',
  "don't want to be here",
  'hurt myself',
  'hurting myself',
  'cut myself',
  'cutting myself',
  'nobody would miss me',
  'better off without me',
  'everyone would be happier without me',
  'everyone would be better off',
  'touches me',
  'makes me do things',
  'hits me',
  'hurts me',
  'hurt me on purpose',
]

// Concerning: heavy but not immediate-crisis. Worthlessness, hopelessness, isolation.
const CONCERNING: readonly string[] = [
  'i hate myself',
  "i'm worthless",
  'i am worthless',
  "i'm broken",
  'i am broken',
  'i hate my life',
  "i'm a disappointment",
  'i am a disappointment',
  'nobody likes me',
  "i'm always alone",
  'i am always alone',
  'nobody sees me',
  "i can't do anything right",
  'i cannot do anything right',
  'i always mess up',
  'i feel numb',
  "i don't feel anything",
  'i do not feel anything',
  "what's the point",
  'what is the point',
  'nothing matters',
  "i'm a burden",
  'i am a burden',
]

// Sensitive: strong emotion worth noting but not crisis.
const SENSITIVE: readonly string[] = [
  'i hate my mom',
  'i hate my dad',
  'i hate my brother',
  'i hate my sister',
  "i'm so angry at",
  'i am so angry at',
  'got in trouble',
  'they got mad at me',
  'i did something bad',
  'god must hate me',
  'god hates me',
]

export const KEYWORD_TAXONOMY: readonly KeywordCategory[] = [
  { level: 'critical', patterns: CRITICAL },
  { level: 'concerning', patterns: CONCERNING },
  { level: 'sensitive', patterns: SENSITIVE },
]
