import { Paragraph, TextRun, HeadingLevel } from 'docx'
import { DOCX_SIZES, DOCX_COLORS, TIER_COLORS, FONT_NAMES, type SourceTier } from '../constants'
import { TIER_REGEX } from './tier-pills'

/**
 * Render a GFM-subset markdown string as a DOCX Paragraph array.
 *
 * Supported: ATX headers (#, ##, ###), bold (**text**), italic (*text*),
 * blockquotes (>), bullet lists (-, *), and plain paragraphs separated by
 * blank lines. Tier labels in parentheses — (Canon), (Scholarship),
 * (Historical), (AI-Assisted), (Conjecture) — are styled with their brand
 * hex color so they visually match the on-screen tier pills.
 *
 * This renderer is intentionally simple: it does not support nested lists,
 * ordered lists, tables, code blocks, or links. AI responses and
 * journal notes are its target input.
 */
export function renderMarkdownToParagraphs(markdown: string): Paragraph[] {
  const blocks = splitIntoBlocks(markdown)
  return blocks.flatMap(renderBlock)
}

type Block =
  | { kind: 'header'; level: 1 | 2 | 3; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'blockquote'; text: string }
  | { kind: 'list-item'; text: string }

function splitIntoBlocks(md: string): Block[] {
  const lines = md.split('\n')
  const blocks: Block[] = []
  let buffer: string[] = []
  let bufferKind: 'paragraph' | 'blockquote' | null = null

  const flushBuffer = () => {
    if (buffer.length === 0) return
    const text = buffer.join(' ').trim()
    if (text) {
      blocks.push({ kind: bufferKind ?? 'paragraph', text })
    }
    buffer = []
    bufferKind = null
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    // Blank line → flush current buffer
    if (line === '') {
      flushBuffer()
      continue
    }

    // Header
    const headerMatch = line.match(/^(#{1,3})\s+(.+)$/)
    if (headerMatch) {
      flushBuffer()
      blocks.push({
        kind: 'header',
        level: headerMatch[1].length as 1 | 2 | 3,
        text: headerMatch[2],
      })
      continue
    }

    // List item
    const listMatch = line.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushBuffer()
      blocks.push({ kind: 'list-item', text: listMatch[1] })
      continue
    }

    // Blockquote
    const quoteMatch = line.match(/^>\s*(.*)$/)
    if (quoteMatch) {
      if (bufferKind !== 'blockquote') flushBuffer()
      bufferKind = 'blockquote'
      buffer.push(quoteMatch[1])
      continue
    }

    // Regular paragraph line
    if (bufferKind === 'blockquote') flushBuffer()
    bufferKind = 'paragraph'
    buffer.push(line)
  }

  flushBuffer()
  return blocks
}

function renderBlock(block: Block): Paragraph[] {
  switch (block.kind) {
    case 'header':
      return [renderHeader(block.level, block.text)]
    case 'paragraph':
      return [renderParagraph(block.text, { italic: false, indent: 0 })]
    case 'blockquote':
      return [renderParagraph(block.text, { italic: true, indent: 360 })]
    case 'list-item':
      return [renderParagraph(`• ${block.text}`, { italic: false, indent: 360 })]
  }
}

function renderHeader(level: 1 | 2 | 3, text: string): Paragraph {
  const sizeMap = { 1: DOCX_SIZES.h1, 2: DOCX_SIZES.h2, 3: DOCX_SIZES.h3 }
  const headingMap = {
    1: HeadingLevel.HEADING_1,
    2: HeadingLevel.HEADING_2,
    3: HeadingLevel.HEADING_3,
  }
  return new Paragraph({
    heading: headingMap[level],
    spacing: { before: 300, after: 150 },
    children: [
      new TextRun({
        text,
        bold: true,
        size: sizeMap[level],
        font: FONT_NAMES.heading,
      }),
    ],
  })
}

interface RenderOptions {
  italic: boolean
  indent: number
}

function renderParagraph(text: string, options: RenderOptions): Paragraph {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    indent: options.indent ? { left: options.indent } : undefined,
    children: renderInlineRuns(text, options),
  })
}

/**
 * Split a line into TextRuns honoring **bold**, *italic*, and (Tier) labels.
 * This is a linear scan — not a full markdown AST parser. It handles the
 * subset of inline formatting that AI responses and journal notes actually
 * produce in Selah.
 */
function renderInlineRuns(text: string, options: RenderOptions): TextRun[] {
  const runs: TextRun[] = []

  // Strategy: iterate through the string, greedily consuming:
  //   **bold**  *italic*  (Canon)/(Scholarship)/etc.  plain text
  // When we hit a marker, emit the accumulated plain run, then the styled run.

  let i = 0
  let plain = ''

  const flushPlain = () => {
    if (plain.length > 0) {
      runs.push(
        new TextRun({
          text: plain,
          italics: options.italic,
          size: DOCX_SIZES.body,
          font: FONT_NAMES.body,
        }),
      )
      plain = ''
    }
  }

  while (i < text.length) {
    // Bold: **text**
    if (text.substring(i, i + 2) === '**') {
      const end = text.indexOf('**', i + 2)
      if (end !== -1) {
        flushPlain()
        runs.push(
          new TextRun({
            text: text.substring(i + 2, end),
            bold: true,
            size: DOCX_SIZES.body,
            font: FONT_NAMES.body,
          }),
        )
        i = end + 2
        continue
      }
    }

    // Italic: *text* (but not ** which was handled above)
    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1)
      if (end !== -1 && text[end + 1] !== '*') {
        flushPlain()
        runs.push(
          new TextRun({
            text: text.substring(i + 1, end),
            italics: true,
            size: DOCX_SIZES.body,
            font: FONT_NAMES.body,
          }),
        )
        i = end + 1
        continue
      }
    }

    // Tier label: (Canon) etc.
    if (text[i] === '(') {
      const rest = text.substring(i)
      const tierMatch = rest.match(TIER_REGEX)
      if (tierMatch && tierMatch.index === 0) {
        const tier = tierMatch[1] as SourceTier
        flushPlain()
        runs.push(
          new TextRun({
            text: ` (${tier})`,
            bold: true,
            size: DOCX_SIZES.meta,
            color: TIER_COLORS[tier].text,
            font: FONT_NAMES.body,
          }),
        )
        i += tierMatch[0].length
        continue
      }
    }

    plain += text[i]
    i++
  }

  flushPlain()

  // Edge case: empty input → single empty run so the Paragraph is still valid
  if (runs.length === 0) {
    runs.push(new TextRun({ text: ' ', size: DOCX_SIZES.body, font: FONT_NAMES.body }))
  }

  return runs
}
