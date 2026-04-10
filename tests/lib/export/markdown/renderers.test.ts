import { describe, it, expect } from 'vitest'
import {
  renderJournalToMarkdown,
  renderCollectionToMarkdown,
} from '@/lib/export/markdown/renderers'

const fakeNote = {
  id: 1,
  title: 'Morning reflection',
  noteType: 'reflection',
  content: 'Something about creation.',
  createdAt: '2026-04-09T08:00:00Z',
  anchors: [{ bookId: 'GEN', chapter: 1, verseStart: 1, refId: null }],
  noteThemes: [],
  noteTags: [{ tag: { name: 'morning' } }],
}

describe('renderJournalToMarkdown', () => {
  it('returns markdown with export heading', () => {
    const md = renderJournalToMarkdown([fakeNote as any])
    expect(md).toContain('# Journal Export')
  })

  it('renders notes with title and content', () => {
    const md = renderJournalToMarkdown([fakeNote as any])
    expect(md).toContain('Morning reflection')
    expect(md).toContain('Something about creation')
  })

  it('includes anchor references', () => {
    const md = renderJournalToMarkdown([fakeNote as any])
    expect(md).toContain('GEN 1:1')
  })

  it('handles empty array', () => {
    const md = renderJournalToMarkdown([])
    expect(md).toContain('# Journal Export')
  })
})

describe('renderCollectionToMarkdown', () => {
  const fakeCollection = {
    id: 1,
    title: 'Forgiveness study',
    description: 'Notes on forgiveness',
    items: [
      {
        itemType: 'passage',
        itemRef: 'Matt 18:21',
        note: 'Seventy times seven',
        sortOrder: 0,
      },
    ],
  }

  it('returns markdown with collection title', () => {
    const md = renderCollectionToMarkdown([fakeCollection as any])
    expect(md).toContain('Forgiveness study')
  })

  it('renders each item with type bracket', () => {
    const md = renderCollectionToMarkdown([fakeCollection as any])
    expect(md).toContain('[passage]')
    expect(md).toContain('Matt 18:21')
  })
})
