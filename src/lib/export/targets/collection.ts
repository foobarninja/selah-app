import { Paragraph, TextRun } from 'docx'
import { prisma } from '@/lib/db'
import {
  buildCoverPage,
  buildFooter,
  buildSectionHeader,
  packDocument,
} from '../docx/primitives'
import { DOCX_SIZES, DOCX_COLORS, FONT_NAMES } from '../constants'
import { formatExportDate } from '../formatters'

/**
 * Generate a DOCX export of all user collections.
 *
 * Layout:
 *   Cover (title, export date)
 *   For each collection:
 *     Heading (collection title)
 *     Description paragraph (if any)
 *     Bulleted item list with optional notes
 *   Footer
 */
export async function generateCollectionsDocx(): Promise<Buffer> {
  const collections = await prisma.userCollection.findMany({
    include: { items: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })

  const exportDate = formatExportDate()

  const sections: Paragraph[] = [
    ...buildCoverPage({
      title: 'Collections',
      subtitle: 'Study assemblies from Selah',
      metadata: exportDate,
    }),
  ]

  for (const col of collections) {
    sections.push(buildSectionHeader(col.title, 'h2'))

    if (col.description) {
      sections.push(
        new Paragraph({
          spacing: { before: 100, after: 150 },
          children: [
            new TextRun({
              text: col.description,
              italics: true,
              size: DOCX_SIZES.body,
              color: DOCX_COLORS.dim,
              font: FONT_NAMES.body,
            }),
          ],
        }),
      )
    }

    for (const item of col.items) {
      const runs: TextRun[] = [
        new TextRun({
          text: `• [${item.itemType}] `,
          bold: true,
          size: DOCX_SIZES.body,
          color: DOCX_COLORS.dim,
          font: FONT_NAMES.body,
        }),
        new TextRun({
          text: item.itemRef,
          size: DOCX_SIZES.body,
          font: FONT_NAMES.body,
        }),
      ]
      if (item.note) {
        runs.push(
          new TextRun({
            text: ` — ${item.note}`,
            italics: true,
            size: DOCX_SIZES.meta,
            color: DOCX_COLORS.muted,
            font: FONT_NAMES.body,
          }),
        )
      }
      sections.push(
        new Paragraph({
          spacing: { before: 60, after: 60 },
          indent: { left: 360 },
          children: runs,
        }),
      )
    }
  }

  return packDocument(sections, buildFooter(`Exported from Selah · ${exportDate}`))
}
