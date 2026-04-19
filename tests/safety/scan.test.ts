import { describe, it, expect } from 'vitest'
import { scanMessage } from '@/lib/safety/scan'

describe('scanMessage — critical signals', () => {
  it('detects suicide ideation phrases', () => {
    expect(scanMessage('I want to die')).toBe('critical')
    expect(scanMessage("Sometimes I don't want to wake up")).toBe('critical')
    expect(scanMessage('I wish I was dead')).toBe('critical')
  })

  it('detects self-harm phrases', () => {
    expect(scanMessage('I hurt myself yesterday')).toBe('critical')
    expect(scanMessage('I cut myself sometimes')).toBe('critical')
  })

  it('detects worthlessness-to-others crisis signal', () => {
    expect(scanMessage('Nobody would miss me')).toBe('critical')
    expect(scanMessage('Everyone would be better off without me')).toBe('critical')
  })

  it('detects abuse disclosure markers', () => {
    expect(scanMessage('He touches me')).toBe('critical')
    expect(scanMessage('My uncle makes me do things')).toBe('critical')
  })
})

describe('scanMessage — concerning signals', () => {
  it('detects worthlessness language', () => {
    expect(scanMessage('I hate myself')).toBe('concerning')
    expect(scanMessage("I'm worthless")).toBe('concerning')
    expect(scanMessage('I am broken')).toBe('concerning')
  })

  it('detects isolation', () => {
    expect(scanMessage('Nobody likes me at school')).toBe('concerning')
    expect(scanMessage("I'm always alone")).toBe('concerning')
  })

  it('detects hopelessness', () => {
    expect(scanMessage("What's the point of trying")).toBe('concerning')
    expect(scanMessage('I feel numb')).toBe('concerning')
  })
})

describe('scanMessage — sensitive signals', () => {
  it('detects big emotion toward family', () => {
    expect(scanMessage('I hate my dad')).toBe('sensitive')
  })

  it('detects shame framings', () => {
    expect(scanMessage('God must hate me')).toBe('sensitive')
  })
})

describe('scanMessage — null (no match)', () => {
  it('returns null for normal questions', () => {
    expect(scanMessage('Who wrote Psalm 23?')).toBeNull()
    expect(scanMessage('What does this passage mean?')).toBeNull()
  })

  it('returns null for normal emotional content', () => {
    expect(scanMessage('I feel sad today')).toBeNull()
    expect(scanMessage('I had a bad day at school')).toBeNull()
  })

  it('is case-insensitive', () => {
    expect(scanMessage('I HATE MYSELF')).toBe('concerning')
    expect(scanMessage('i hate myself')).toBe('concerning')
    expect(scanMessage('I Hate Myself')).toBe('concerning')
  })

  it('does not false-match on substring within a word', () => {
    expect(scanMessage('I wore a hat yesterday')).toBeNull()
    expect(scanMessage('The killing of time')).toBeNull()
  })

  it('handles punctuation around phrases', () => {
    expect(scanMessage('Honestly, I hate myself.')).toBe('concerning')
    expect(scanMessage("I hate myself!")).toBe('concerning')
  })

  it('returns higher severity when multiple categories match', () => {
    expect(scanMessage('I did something bad and I hate myself')).toBe('concerning')
    expect(scanMessage('I hate myself and I want to die')).toBe('critical')
  })

  it('returns null for empty or whitespace input', () => {
    expect(scanMessage('')).toBeNull()
    expect(scanMessage('   ')).toBeNull()
  })
})

// ─────────────────────────────────────────────────────────────────────
// False-positive regression.
//
// These tests codify the maintenance rule from src/lib/safety/README.md:
// a taxonomy addition must not flag idiomatic or third-party usage.
// If adding a new keyword causes any of these to fail, the addition is
// wrong — the scanner is flagging an innocent phrase. See the README
// before tuning.
// ─────────────────────────────────────────────────────────────────────

describe('scanMessage — false-positive regression (MUST stay null)', () => {
  it('does not flag idiomatic "dying" phrases', () => {
    expect(scanMessage("I'm dying laughing at this meme")).toBeNull()
    expect(scanMessage("I'm dying for some pizza")).toBeNull()
    expect(scanMessage("That movie was dying funny")).toBeNull()
    expect(scanMessage("I nearly died of embarrassment")).toBeNull()
  })

  it('does not flag idiomatic "kill" phrases', () => {
    expect(scanMessage("She killed it at the recital")).toBeNull()
    expect(scanMessage("I could kill for some sleep")).toBeNull()
    expect(scanMessage("That joke killed")).toBeNull()
  })

  it('does not flag hate on non-self objects', () => {
    expect(scanMessage('I hate Mondays')).toBeNull()
    expect(scanMessage('I hate broccoli')).toBeNull()
    expect(scanMessage('I hate waiting in line')).toBeNull()
    expect(scanMessage('I hate this homework')).toBeNull()
  })

  it('does not flag injury to third parties or non-self objects', () => {
    expect(scanMessage('She hurt her knee at soccer')).toBeNull()
    expect(scanMessage('I hurt my friend\'s feelings')).toBeNull()
    expect(scanMessage('The cat hurt the mouse')).toBeNull()
    expect(scanMessage('That movie hurt to watch')).toBeNull()
  })

  it('does not flag non-self "nobody would" constructions', () => {
    expect(scanMessage('Nobody would notice this small change')).toBeNull()
    expect(scanMessage('Nobody would choose to do that')).toBeNull()
  })

  it('does not flag "end it" in non-crisis contexts', () => {
    expect(scanMessage('I want to end it and start a new chapter')).toBeNull()
    expect(scanMessage('We need to end it — the game is over')).toBeNull()
  })

  it('does not flag third-party abuse markers without self-reference', () => {
    expect(scanMessage('The music touches my heart')).toBeNull()
    expect(scanMessage('His speech really touched me deeply about art')).toBeNull()
  })
})
