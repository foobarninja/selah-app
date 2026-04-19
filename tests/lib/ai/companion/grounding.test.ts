import { describe, it, expect } from 'vitest'
import { buildCompanionGrounding } from '@/lib/ai/companion/grounding'
import type { Devotional } from '@/components/daily-bread/types'

const fixture: Devotional = {
  id: 'romans-8-28',
  title: 'When things do not feel good',
  bookId: 'rom',
  chapter: 8,
  passageRef: 'Romans 8:28',
  audienceLevel: 'adults',
  estimatedMinutes: 5,
  seasonalSet: 'ordinary',
  moodMatch: 'weight',
  passage: 'And we know that in all things...',
  contextBrief: 'Paul wrote this from a Roman prison.',
  modernMoment: 'Your job loss. The diagnosis.',
  conversationStarters: ['What feels out of your hands right now?'],
  goingDeeper: { narrativeUnitRef: 'nu-1', prompt: 'Sit with "all things" before you leap to "for good".' },
  companionOpener: 'What does "good" mean to you today?',
}

describe('buildCompanionGrounding', () => {
  it('packs all devotional-frame fields', () => {
    const g = buildCompanionGrounding(fixture)
    expect(g.devotionalId).toBe('romans-8-28')
    expect(g.title).toBe(fixture.title)
    expect(g.passageRef).toBe(fixture.passageRef)
    expect(g.passageText).toContain('all things')
    expect(g.audienceLevel).toBe('adults')
    expect(g.contextBrief).toBe(fixture.contextBrief)
    expect(g.modernMoment).toBe(fixture.modernMoment)
    expect(g.goingDeeperPrompt).toBe(fixture.goingDeeper.prompt)
  })
  it('survives empty optional fields', () => {
    const minimal: Devotional = { ...fixture, modernMoment: '', goingDeeper: { narrativeUnitRef: '', prompt: '' } }
    const g = buildCompanionGrounding(minimal)
    expect(g.modernMoment).toBe('')
    expect(g.goingDeeperPrompt).toBe('')
  })
})
