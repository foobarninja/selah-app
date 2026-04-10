import { describe, it, expect } from 'vitest'
import {
  formatDate,
  formatTime,
  formatVerseRef,
  formatDateRange,
} from '@/lib/export/formatters'

describe('formatDate', () => {
  it('formats ISO string as long weekday date', () => {
    const result = formatDate('2026-04-09T14:30:00Z', 'long')
    expect(result).toMatch(/Thursday.*April.*9.*2026/)
  })

  it('formats ISO string as short date', () => {
    const result = formatDate('2026-04-09T14:30:00Z', 'short')
    expect(result).toMatch(/Apr.*9.*2026/)
  })

  it('returns fallback on invalid input', () => {
    expect(formatDate('not-a-date', 'long')).toBe('not-a-date')
  })
})

describe('formatTime', () => {
  it('formats ISO string as hour:minute', () => {
    const result = formatTime('2026-04-09T14:30:00Z')
    expect(result).toMatch(/\d{1,2}:\d{2}/)
  })

  it('returns empty string on invalid input', () => {
    expect(formatTime('garbage')).toBe('')
  })
})

describe('formatVerseRef', () => {
  it('formats book + chapter + verse with full book name', () => {
    expect(formatVerseRef('GEN', 1, 1)).toBe('Genesis 1:1')
  })

  it('formats verse range when end differs from start', () => {
    expect(formatVerseRef('GEN', 1, 1, 3)).toBe('Genesis 1:1-3')
  })

  it('omits range suffix when end equals start', () => {
    expect(formatVerseRef('GEN', 1, 1, 1)).toBe('Genesis 1:1')
  })

  it('falls back to book id when unknown', () => {
    expect(formatVerseRef('XYZ', 1, 1)).toBe('XYZ 1:1')
  })
})

describe('formatDateRange', () => {
  it('returns single date when all entries share same day', () => {
    const dates = ['2026-04-09T10:00:00Z', '2026-04-09T15:00:00Z']
    const result = formatDateRange(dates)
    expect(result).not.toContain('–')
    expect(result).toMatch(/Apr.*9.*2026/)
  })

  it('returns hyphenated range when dates differ', () => {
    const dates = ['2026-04-01T10:00:00Z', '2026-04-09T10:00:00Z']
    const result = formatDateRange(dates)
    expect(result).toContain('–') // en dash
    expect(result).toContain('Apr')
  })

  it('returns "No entries" on empty array', () => {
    expect(formatDateRange([])).toBe('No entries')
  })
})
