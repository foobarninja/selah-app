import { describe, it, expect } from 'vitest'
import { generateJournalDocx } from '@/components/journal/JournalExport'

// Minimal fake entry — use `as any` if the JournalEntry type has fields we don't need
const fakeEntry = {
  id: '1',
  title: 'Test note',
  content: 'This is a test.',
  noteType: 'reflection',
  createdAt: '2026-04-09T10:00:00Z',
  anchors: [{ label: 'Genesis 1:1', type: 'verse', entityId: 'GEN-1-1' }],
  themeTags: ['creation'],
  userTags: ['morning'],
  studyContext: 'devotional',
  timeAgo: '1 hour ago',
}

describe('generateJournalDocx (smoke)', () => {
  it('returns a DOCX Buffer with one entry', async () => {
    const buffer = await generateJournalDocx('My Journal', 'Test description', [fakeEntry as any])
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.slice(0, 2).toString()).toBe('PK')
    expect(buffer.length).toBeGreaterThan(1000) // DOCX has minimum overhead
  })

  it('handles empty entries array', async () => {
    const buffer = await generateJournalDocx('Empty', '', [])
    expect(buffer).toBeInstanceOf(Buffer)
  })
})
