import { Paragraph, TextRun, HeadingLevel, PageBreak } from 'docx'
import type { JournalEntry } from '@/components/journal/types'
import { formatDate, formatTime, formatDateRange, formatExportDate } from '@/lib/export/formatters'
import { buildCoverPage, buildFooter, packDocument } from '@/lib/export/docx/primitives'
import { DOCX_SIZES, DOCX_COLORS } from '@/lib/export/constants'

const NOTE_TYPE_LABELS: Record<string, string> = {
  annotation: 'ANNOTATION',
  reflection: 'REFLECTION',
  question: 'QUESTION',
  sermon_idea: 'SERMON IDEA',
  insight: 'INSIGHT',
  prayer: 'PRAYER',
}

export async function generateJournalDocx(
  journalName: string,
  description: string,
  entries: JournalEntry[],
): Promise<Buffer> {
  // Sort chronologically (oldest first)
  const sorted = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  // Group by day (YYYY-MM-DD)
  const dayMap = new Map<string, JournalEntry[]>()
  for (const entry of sorted) {
    const day = entry.createdAt.slice(0, 10)
    if (!dayMap.has(day)) dayMap.set(day, [])
    dayMap.get(day)!.push(entry)
  }
  const days = Array.from(dayMap.entries())

  // ── Cover page ──────────────────────────────────────────────────────────────
  const dateRangeStr = formatDateRange(sorted.map((e) => e.createdAt))
  const countStr = `${sorted.length} note${sorted.length === 1 ? '' : 's'}`
  const metadata = `${dateRangeStr}   ·   ${countStr}`

  const coverParagraphs = buildCoverPage({
    title: journalName,
    subtitle: description || undefined,
    metadata,
  })

  // ── Day groups ───────────────────────────────────────────────────────────────
  const bodyParagraphs: Paragraph[] = []

  days.forEach(([dayKey, dayEntries], dayIndex) => {
    // Day header
    bodyParagraphs.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: dayIndex === 0 ? 0 : 400, after: 200 },
        children: [
          new TextRun({
            text: formatDate(dayKey),
            bold: true,
            size: DOCX_SIZES.h2,
          }),
        ],
      }),
    )

    // Entries for this day
    dayEntries.forEach((entry) => {
      const typeLabel = NOTE_TYPE_LABELS[entry.noteType] ?? entry.noteType.toUpperCase()
      const passageRef = entry.anchors.length > 0 ? entry.anchors[0].label : ''
      const timeStr = formatTime(entry.createdAt)

      // Metadata line: [TYPE] Passage Ref — Time
      const metaChildren: TextRun[] = [
        new TextRun({
          text: `[${typeLabel}]`,
          bold: true,
          size: DOCX_SIZES.meta,
        }),
      ]
      if (passageRef) {
        metaChildren.push(
          new TextRun({
            text: `  ${passageRef}`,
            color: DOCX_COLORS.refBrown,
            size: DOCX_SIZES.meta,
          }),
        )
        metaChildren.push(
          new TextRun({
            text: `  —  `,
            color: DOCX_COLORS.muted,
            size: DOCX_SIZES.meta,
          }),
        )
      } else {
        metaChildren.push(
          new TextRun({
            text: `  `,
            size: DOCX_SIZES.meta,
          }),
        )
      }
      metaChildren.push(
        new TextRun({
          text: timeStr,
          color: DOCX_COLORS.muted,
          size: DOCX_SIZES.meta,
        }),
      )

      bodyParagraphs.push(
        new Paragraph({
          spacing: { before: 240, after: 80 },
          children: metaChildren,
        }),
      )

      // Note content — split by newline into separate Paragraphs
      const contentLines = entry.content.split('\n')
      contentLines.forEach((line, i) => {
        bodyParagraphs.push(
          new Paragraph({
            spacing: { before: i === 0 ? 0 : 80, after: 80 },
            children: [
              new TextRun({
                text: line || ' ',
                size: DOCX_SIZES.body,
              }),
            ],
          }),
        )
      })

      // Anchors list
      if (entry.anchors.length > 0) {
        const anchorText = entry.anchors.map((a) => a.label).join(', ')
        bodyParagraphs.push(
          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              new TextRun({
                text: `Anchors: ${anchorText}`,
                italics: true,
                color: DOCX_COLORS.muted,
                size: DOCX_SIZES.meta,
              }),
            ],
          }),
        )
      }

      // Tags list
      const allTags = [...entry.themeTags, ...entry.userTags]
      if (allTags.length > 0) {
        bodyParagraphs.push(
          new Paragraph({
            spacing: { before: 40, after: 160 },
            children: [
              new TextRun({
                text: `Tags: ${allTags.join(', ')}`,
                color: DOCX_COLORS.muted,
                size: DOCX_SIZES.meta,
              }),
            ],
          }),
        )
      }
    })

    // Page break between day groups (but not after the last one)
    if (dayIndex < days.length - 1) {
      bodyParagraphs.push(
        new Paragraph({
          children: [new PageBreak()],
        }),
      )
    }
  })

  // ── Assemble document ────────────────────────────────────────────────────────
  return packDocument(
    [...coverParagraphs, ...bodyParagraphs],
    buildFooter(`Exported from Selah · ${formatExportDate()}`),
  )
}
