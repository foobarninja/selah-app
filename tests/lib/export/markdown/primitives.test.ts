import { describe, it, expect } from 'vitest'
import {
  buildFrontmatter,
  buildScriptureBlockMd,
  buildTierLabeledLine,
} from '@/lib/export/markdown/primitives'

describe('buildFrontmatter', () => {
  it('returns a heading + export date line', () => {
    const md = buildFrontmatter('Journal Export')
    expect(md).toContain('# Journal Export')
    expect(md).toMatch(/Exported: \d{4}-\d{2}-\d{2}/)
  })

  it('includes optional subtitle', () => {
    const md = buildFrontmatter('Journal Export', 'A year of reflection')
    expect(md).toContain('A year of reflection')
  })
})

describe('buildScriptureBlockMd', () => {
  it('formats verses as blockquote with translation attribution', () => {
    const md = buildScriptureBlockMd(
      [{ number: 1, text: 'In the beginning.' }],
      'Berean Standard Bible',
    )
    expect(md).toContain('> 1 In the beginning.')
    expect(md).toContain('— *Berean Standard Bible*')
  })

  it('handles multiple verses in one block', () => {
    const md = buildScriptureBlockMd(
      [
        { number: 1, text: 'First.' },
        { number: 2, text: 'Second.' },
      ],
      'BSB',
    )
    expect(md).toContain('1 First.')
    expect(md).toContain('2 Second.')
  })
})

describe('buildTierLabeledLine', () => {
  it('appends (Tier) to text', () => {
    expect(buildTierLabeledLine('In the beginning.', 'Canon')).toBe('In the beginning. (Canon)')
  })
})
