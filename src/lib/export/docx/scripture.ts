import { Paragraph, TextRun } from 'docx'
import { DOCX_SIZES, DOCX_COLORS, FONT_NAMES } from '../constants'

export interface ScriptureVerse {
  number: number
  text: string
}

export interface ScriptureBlockOptions {
  verses: ScriptureVerse[]
  /** Translation name for attribution (e.g., "Berean Standard Bible") */
  translationName: string
  /** Optional passage reference header (e.g., "Genesis 1:1-3") */
  passageRef?: string
}

/**
 * Build a formatted Scripture block: optional reference, verse body, translation attribution.
 *
 * Verse numbers are rendered as bold, small-scale runs (brand refBrown color);
 * verse text is italic body size; translation attribution uses muted footnote styling
 * on a separate line. Brand fonts are applied so exports match the UI.
 */
export function buildScriptureBlock(options: ScriptureBlockOptions): Paragraph[] {
  const { verses, translationName, passageRef } = options
  if (verses.length === 0) return []

  const paragraphs: Paragraph[] = []

  if (passageRef) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 100, after: 40 },
        children: [
          new TextRun({
            text: passageRef,
            bold: true,
            size: DOCX_SIZES.body,
            color: DOCX_COLORS.refBrown,
            font: FONT_NAMES.heading,
          }),
        ],
      }),
    )
  }

  // Verse body: one Paragraph, multiple TextRuns with inline verse numbers
  const verseRuns: TextRun[] = []
  for (let i = 0; i < verses.length; i++) {
    const v = verses[i]
    if (i > 0) {
      verseRuns.push(new TextRun({ text: ' ', size: DOCX_SIZES.body, font: FONT_NAMES.body }))
    }
    verseRuns.push(
      new TextRun({
        text: `${v.number} `,
        bold: true,
        size: DOCX_SIZES.meta,
        color: DOCX_COLORS.refBrown,
        font: FONT_NAMES.body,
      }),
    )
    verseRuns.push(
      new TextRun({
        text: v.text,
        italics: true,
        size: DOCX_SIZES.body,
        font: FONT_NAMES.body,
      }),
    )
  }

  paragraphs.push(
    new Paragraph({
      spacing: { before: 100, after: 50 },
      children: verseRuns,
    }),
  )

  // Translation attribution
  paragraphs.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: `— ${translationName}`,
          size: DOCX_SIZES.footnote,
          color: DOCX_COLORS.footnote,
          font: FONT_NAMES.body,
        }),
      ],
    }),
  )

  return paragraphs
}
