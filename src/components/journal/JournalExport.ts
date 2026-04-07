import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  Footer,
} from 'docx'
import type { JournalEntry } from '@/components/journal/types'

const NOTE_TYPE_LABELS: Record<string, string> = {
  annotation: 'ANNOTATION',
  reflection: 'REFLECTION',
  question: 'QUESTION',
  sermon_idea: 'SERMON IDEA',
  insight: 'INSIGHT',
  prayer: 'PRAYER',
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function formatTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

function formatDateRange(entries: JournalEntry[]): string {
  if (entries.length === 0) return 'No entries'
  const sorted = [...entries].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  const first = new Date(sorted[0].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const last = new Date(sorted[sorted.length - 1].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return first === last ? first : `${first} – ${last}`
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

  const exportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // ── Cover page ──────────────────────────────────────────────────────────────
  const coverParagraphs: Paragraph[] = [
    new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: journalName,
          bold: true,
          size: 48, // 24pt
        }),
      ],
    }),
  ]

  if (description) {
    coverParagraphs.push(
      new Paragraph({
        spacing: { before: 200 },
        children: [
          new TextRun({
            text: description,
            italics: true,
            color: '888888',
            size: 24, // 12pt
          }),
        ],
      }),
    )
  }

  coverParagraphs.push(
    new Paragraph({
      spacing: { before: 400 },
      children: [
        new TextRun({
          text: formatDateRange(sorted),
          color: '666666',
          size: 22,
        }),
        new TextRun({
          text: `   ·   ${sorted.length} note${sorted.length === 1 ? '' : 's'}`,
          color: '888888',
          size: 22,
        }),
      ],
    }),
    new Paragraph({
      children: [new PageBreak()],
    }),
  )

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
            size: 28, // 14pt
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
          size: 20,
        }),
      ]
      if (passageRef) {
        metaChildren.push(
          new TextRun({
            text: `  ${passageRef}`,
            color: '996633',
            size: 20,
          }),
        )
        metaChildren.push(
          new TextRun({
            text: `  —  `,
            color: '888888',
            size: 20,
          }),
        )
      } else {
        metaChildren.push(
          new TextRun({
            text: `  `,
            size: 20,
          }),
        )
      }
      metaChildren.push(
        new TextRun({
          text: timeStr,
          color: '888888',
          size: 20,
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
                size: 22, // 11pt
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
                color: '888888',
                size: 20,
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
                color: '888888',
                size: 20,
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

  // ── Footer ───────────────────────────────────────────────────────────────────
  const footer = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `Exported from Selah · ${exportDate}`,
            color: '999999',
            size: 18, // 9pt
          }),
        ],
      }),
    ],
  })

  // ── Assemble document ────────────────────────────────────────────────────────
  const doc = new Document({
    sections: [
      {
        children: [...coverParagraphs, ...bodyParagraphs],
        footers: {
          default: footer,
        },
      },
    ],
  })

  const result = await Packer.toBuffer(doc)
  return Buffer.isBuffer(result) ? result : Buffer.from(result)
}
