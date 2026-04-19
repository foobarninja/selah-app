import { describe, it, expect } from 'vitest'
import { buildCompanionSystemPrompt } from '@/lib/ai/companion/system-prompt'
import type { CompanionGrounding } from '@/lib/ai/companion/types'

const grounding: CompanionGrounding = {
  devotionalId: 'romans-8-28',
  title: 'When things do not feel good',
  passageRef: 'Romans 8:28',
  passageText: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.',
  audienceLevel: 'adults',
  contextBrief: 'Paul wrote this from a Roman prison.',
  modernMoment: 'Your job loss. The diagnosis.',
  goingDeeperPrompt: 'Sit with "all things" before you leap to "for good".',
}

describe('buildCompanionSystemPrompt', () => {
  it('embeds the devotional frame block', () => {
    const out = buildCompanionSystemPrompt(grounding)
    expect(out).toContain('When things do not feel good')
    expect(out).toContain('Romans 8:28')
    expect(out).toContain('Paul wrote this from a Roman prison.')
    expect(out).toContain('Your job loss. The diagnosis.')
    expect(out).toContain('all things')
  })
  it('embeds the passage text block', () => {
    const out = buildCompanionSystemPrompt(grounding)
    expect(out).toContain('<passage>')
    expect(out).toContain('in all things God works for the good')
  })
  it('names every voice constraint explicitly (guard against regressions)', () => {
    const out = buildCompanionSystemPrompt(grounding)
    const constraints = [
      'No spiritual platitudes',
      'No sycophancy',
      'Great question',
      '"Ah,"',
      'No emoji',
      'greeting card',
      'Quote a phrase',
    ]
    for (const c of constraints) expect(out).toContain(c)
  })
  it('selects the adults/teens address block', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'adults' })
    expect(out).toMatch(/adults .* teens: address the reader directly/)
  })
  it('selects the family block for family audience', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'family' })
    expect(out).toMatch(/family .* young-children: the reader is almost certainly a parent/)
    expect(out).toContain('Help them facilitate the reflection with their child')
  })
  it('selects the family block for young-children audience', () => {
    const out = buildCompanionSystemPrompt({ ...grounding, audienceLevel: 'young-children' })
    expect(out).toMatch(/family .* young-children: the reader is almost certainly a parent/)
  })
})
