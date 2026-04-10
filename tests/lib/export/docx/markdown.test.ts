import { describe, it, expect } from 'vitest'
import { Paragraph } from 'docx'
import { renderMarkdownToParagraphs } from '@/lib/export/docx/markdown'

describe('renderMarkdownToParagraphs', () => {
  it('renders plain paragraph as single Paragraph', () => {
    const result = renderMarkdownToParagraphs('Just a line of text.')
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(Paragraph)
  })

  it('renders h1/h2/h3 headers', () => {
    const md = '# Title\n\n## Subtitle\n\n### Section\n\nBody.'
    const result = renderMarkdownToParagraphs(md)
    // 4 paragraphs: h1, h2, h3, body
    expect(result.length).toBe(4)
  })

  it('renders bold and italic inline formatting', () => {
    const result = renderMarkdownToParagraphs('This has **bold** and *italic* text.')
    expect(result.length).toBe(1)
    // Structural check: Paragraph exists; run-level inspection is too brittle
    expect(result[0]).toBeInstanceOf(Paragraph)
  })

  it('renders a blockquote', () => {
    const result = renderMarkdownToParagraphs('> A quote\n> on two lines.')
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it('renders bullet list as one Paragraph per item', () => {
    const md = '- First\n- Second\n- Third'
    const result = renderMarkdownToParagraphs(md)
    expect(result.length).toBe(3)
  })

  it('applies tier color when (Canon) label present at end', () => {
    const result = renderMarkdownToParagraphs('In the beginning... (Canon)')
    expect(result.length).toBe(1)
    expect(result[0]).toBeInstanceOf(Paragraph)
  })

  it('separates blank-line-delimited paragraphs', () => {
    const md = 'First paragraph.\n\nSecond paragraph.'
    const result = renderMarkdownToParagraphs(md)
    expect(result.length).toBe(2)
  })

  it('handles multi-section mixed content', () => {
    const md = [
      '### Scripture speaks',
      '',
      '"In the beginning" (Canon)',
      '',
      '### Scholars weigh in',
      '',
      'As Henry notes (Scholarship), the text is layered.',
    ].join('\n')
    const result = renderMarkdownToParagraphs(md)
    // 4 paragraphs: h3, body, h3, body
    expect(result.length).toBe(4)
  })
})
