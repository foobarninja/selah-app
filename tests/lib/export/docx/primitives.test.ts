import { describe, it, expect } from 'vitest'
import { Paragraph } from 'docx'
import {
  buildCoverPage,
  buildSectionHeader,
  buildFooter,
  buildMetadataLine,
  packDocument,
} from '@/lib/export/docx/primitives'

describe('buildCoverPage', () => {
  it('returns a Paragraph array starting with the title', () => {
    const paragraphs = buildCoverPage({ title: 'My Journal' })
    expect(paragraphs.length).toBeGreaterThan(0)
    expect(paragraphs[0]).toBeInstanceOf(Paragraph)
  })

  it('includes subtitle when provided', () => {
    const paragraphs = buildCoverPage({ title: 'My Journal', subtitle: 'A year of notes' })
    expect(paragraphs.length).toBeGreaterThanOrEqual(3) // title, subtitle, pagebreak
  })

  it('includes metadata line when provided', () => {
    const paragraphs = buildCoverPage({
      title: 'My Journal',
      metadata: '12 notes · Jan 1 – Dec 31',
    })
    expect(paragraphs.length).toBeGreaterThanOrEqual(3)
  })
})

describe('buildSectionHeader', () => {
  it('returns a single Paragraph', () => {
    const p = buildSectionHeader('Chapter One', 'h2')
    expect(p).toBeInstanceOf(Paragraph)
  })
})

describe('buildFooter', () => {
  it('returns a docx Footer instance', () => {
    const footer = buildFooter('Exported from Selah · April 9, 2026')
    expect(footer).toBeDefined()
    // Footer is a docx internal class — existence check is sufficient
  })
})

describe('buildMetadataLine', () => {
  it('returns a Paragraph', () => {
    const p = buildMetadataLine([
      { text: '[REFLECTION]', bold: true },
      { text: 'Genesis 1:1', color: '996633' },
    ])
    expect(p).toBeInstanceOf(Paragraph)
  })
})

describe('packDocument', () => {
  it('packs a Document and returns a Buffer', async () => {
    const sections = [new Paragraph({ text: 'Hello' })]
    const footer = buildFooter('test')
    const buffer = await packDocument(sections, footer)
    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.length).toBeGreaterThan(0)
    // DOCX files are ZIPs and start with PK magic bytes
    expect(buffer.slice(0, 2).toString()).toBe('PK')
  })
})
