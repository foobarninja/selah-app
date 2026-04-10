import { describe, it, expect } from 'vitest'
import { Paragraph } from 'docx'
import { buildScriptureBlock } from '@/lib/export/docx/scripture'

describe('buildScriptureBlock', () => {
  it('returns Paragraph array with verse text and translation attribution', () => {
    const verses = [
      { number: 1, text: 'In the beginning God created the heavens and the earth.' },
      { number: 2, text: 'The earth was formless and void.' },
    ]
    const paragraphs = buildScriptureBlock({
      verses,
      translationName: 'Berean Standard Bible',
    })
    expect(paragraphs.length).toBeGreaterThanOrEqual(2) // body + attribution
    expect(paragraphs.every((p) => p instanceof Paragraph)).toBe(true)
  })

  it('handles single verse', () => {
    const paragraphs = buildScriptureBlock({
      verses: [{ number: 1, text: 'In the beginning.' }],
      translationName: 'BSB',
    })
    expect(paragraphs.length).toBeGreaterThanOrEqual(2)
  })

  it('returns empty array when verses empty', () => {
    const paragraphs = buildScriptureBlock({ verses: [], translationName: 'BSB' })
    expect(paragraphs).toEqual([])
  })

  it('accepts optional passage reference header', () => {
    const paragraphs = buildScriptureBlock({
      verses: [{ number: 1, text: 'text' }],
      translationName: 'BSB',
      passageRef: 'Genesis 1:1',
    })
    // ref header + body + attribution
    expect(paragraphs.length).toBeGreaterThanOrEqual(3)
  })
})
