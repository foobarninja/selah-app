import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  Footer,
  Packer,
} from 'docx'
import { DOCX_SIZES, DOCX_COLORS, FONT_NAMES } from '../constants'

export interface CoverPageOptions {
  title: string
  subtitle?: string
  metadata?: string
}

/**
 * Build a title-page Paragraph array.
 * Ends with a page break so the document body starts on page 2.
 */
export function buildCoverPage(options: CoverPageOptions): Paragraph[] {
  const paragraphs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: options.title,
          bold: true,
          size: DOCX_SIZES.title,
          font: FONT_NAMES.heading,
        }),
      ],
    }),
  ]

  if (options.subtitle) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: options.subtitle,
            italics: true,
            color: DOCX_COLORS.muted,
            size: DOCX_SIZES.h3,
            font: FONT_NAMES.heading,
          }),
        ],
      }),
    )
  }

  if (options.metadata) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 400 },
        children: [
          new TextRun({
            text: options.metadata,
            color: DOCX_COLORS.dim,
            size: DOCX_SIZES.body,
            font: FONT_NAMES.body,
          }),
        ],
      }),
    )
  }

  paragraphs.push(
    new Paragraph({
      children: [new PageBreak()],
    }),
  )

  return paragraphs
}

/** Build a section header Paragraph at the specified heading level. */
export function buildSectionHeader(text: string, level: 'h1' | 'h2' | 'h3' = 'h2'): Paragraph {
  const sizeMap = { h1: DOCX_SIZES.h1, h2: DOCX_SIZES.h2, h3: DOCX_SIZES.h3 }
  const headingMap = {
    h1: HeadingLevel.HEADING_1,
    h2: HeadingLevel.HEADING_2,
    h3: HeadingLevel.HEADING_3,
  }
  return new Paragraph({
    heading: headingMap[level],
    spacing: { before: 400, after: 200 },
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

/** Build a page footer with centered text in footnote style. */
export function buildFooter(text: string): Footer {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text,
            color: DOCX_COLORS.footnote,
            size: DOCX_SIZES.footnote,
            font: FONT_NAMES.body,
          }),
        ],
      }),
    ],
  })
}

export interface MetadataLineItem {
  text: string
  bold?: boolean
  italic?: boolean
  color?: string
}

/**
 * Build a single-line metadata paragraph (e.g., "[REFLECTION]  Genesis 1:1  —  2:30 PM").
 * Each item becomes a separate TextRun with its own styling.
 */
export function buildMetadataLine(items: MetadataLineItem[]): Paragraph {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: items.map(
      (item) =>
        new TextRun({
          text: item.text,
          bold: item.bold ?? false,
          italics: item.italic ?? false,
          color: item.color ?? DOCX_COLORS.body,
          size: DOCX_SIZES.meta,
          font: FONT_NAMES.body,
        }),
    ),
  })
}

/**
 * Assemble a Document from a body paragraph array and a footer, then pack to Buffer.
 * The returned Buffer is a DOCX file (ZIP archive, starts with PK magic bytes).
 */
export async function packDocument(sections: Paragraph[], footer: Footer): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        children: sections,
        footers: {
          default: footer,
        },
      },
    ],
  })

  const result = await Packer.toBuffer(doc)
  return Buffer.isBuffer(result) ? result : Buffer.from(result)
}
