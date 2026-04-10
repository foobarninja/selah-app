import { Paragraph, TextRun, BorderStyle } from 'docx'
import { prisma } from '@/lib/db'
import Database from 'better-sqlite3'
import { BOOK_NAMES } from '@/lib/constants'
import {
  buildCoverPage,
  buildFooter,
  packDocument,
} from '@/lib/export/docx/primitives'
import { DOCX_SIZES, DOCX_COLORS } from '@/lib/export/constants'
import { formatExportDate } from '@/lib/export/formatters'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}

interface ExportItem {
  id: number
  entityType: string
  entityId: string
  title: string
  preview: string
  sourceTier: number
  annotation: string
  sortOrder: number
}

const formatLabels: Record<string, string> = {
  sermon: 'Sermon',
  teaching: 'Teaching',
  'small-group': 'Small Group Study',
  personal: 'Personal Study',
}

export async function generateDocx(projectId: number): Promise<Buffer> {
  const project = await prisma.studyProject.findUnique({ where: { id: projectId } })
  if (!project) throw new Error('Project not found')

  const items = await prisma.studyAssemblyItem.findMany({
    where: { projectId },
    orderBy: { sortOrder: 'asc' },
  })

  const db = getDb()
  const sections: Paragraph[] = []

  // Cover page via shared primitive
  sections.push(
    ...buildCoverPage({
      title: project.topic,
      subtitle: `${formatLabels[project.format] || project.format} — Assembled with Selah`,
    }),
  )

  // Assembly items (buildItemSection is unchanged and remains in this file)
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    sections.push(...buildItemSection(db, item, i + 1))
  }

  db.close()

  return packDocument(sections, buildFooter(`Exported from Selah · ${formatExportDate()}`))
}

function buildItemSection(db: Database.Database, item: ExportItem, index: number): Paragraph[] {
  const paragraphs: Paragraph[] = []
  const typeLabel = entityTypeLabel(item.entityType)

  // Section header
  paragraphs.push(
    new Paragraph({
      spacing: { before: 400, after: 100 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: DOCX_COLORS.sectionBorder } },
      children: [
        new TextRun({ text: `${index}. `, bold: true, size: DOCX_SIZES.h3 }),
        new TextRun({ text: item.title, bold: true, size: DOCX_SIZES.h3 }),
        new TextRun({ text: `  [${typeLabel}]`, italics: true, size: DOCX_SIZES.meta, color: DOCX_COLORS.muted }),
      ],
    }),
  )

  // Scripture text for passage items
  if (item.entityType === 'passage') {
    const verseText = fetchPassageText(db, item.entityId, item.title)
    if (verseText) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 100, after: 50 },
          children: [
            new TextRun({ text: verseText, italics: true, size: DOCX_SIZES.body }),
          ],
        }),
        new Paragraph({
          spacing: { after: 100 },
          children: [
            new TextRun({ text: '— Berean Standard Bible', size: DOCX_SIZES.footnote, color: DOCX_COLORS.footnote }),
          ],
        }),
      )
    }
  }

  // Character bio for character items
  if (item.entityType === 'character') {
    const bio = fetchCharacterBio(db, item.entityId)
    if (bio) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 50, after: 100 },
          children: [new TextRun({ text: bio, size: DOCX_SIZES.body, color: '444444' })],
        }),
      )
    }
  }

  // Theme definition
  if (item.entityType === 'theme') {
    const def = fetchThemeDefinition(db, item.entityId)
    if (def) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 50, after: 100 },
          children: [new TextRun({ text: def, size: DOCX_SIZES.body, color: '444444' })],
        }),
      )
    }
  }

  // Preview text (for items without special fetching)
  if (item.preview && !['passage', 'character', 'theme'].includes(item.entityType)) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 50, after: 100 },
        children: [new TextRun({ text: item.preview, size: DOCX_SIZES.body, color: '444444' })],
      }),
    )
  }

  // User annotation
  if (item.annotation) {
    paragraphs.push(
      new Paragraph({
        spacing: { before: 100, after: 50 },
        children: [
          new TextRun({ text: 'Notes: ', bold: true, size: DOCX_SIZES.meta, color: DOCX_COLORS.accentGreen }),
          new TextRun({ text: item.annotation, size: DOCX_SIZES.meta, color: DOCX_COLORS.accentGreen }),
        ],
      }),
    )
  }

  // Commentary for passage items
  if (item.entityType === 'passage') {
    const commentary = fetchCommentary(db, item.entityId, item.title)
    if (commentary.length > 0) {
      paragraphs.push(
        new Paragraph({
          spacing: { before: 150, after: 50 },
          children: [new TextRun({ text: 'Commentary:', bold: true, size: DOCX_SIZES.meta, color: '555555' })],
        }),
      )
      for (const comm of commentary) {
        paragraphs.push(
          new Paragraph({
            spacing: { after: 80 },
            indent: { left: 360 },
            children: [
              new TextRun({ text: `${comm.author}: `, bold: true, size: DOCX_SIZES.meta, color: DOCX_COLORS.dim }),
              new TextRun({ text: comm.text, size: DOCX_SIZES.meta, color: DOCX_COLORS.dim }),
            ],
          }),
        )
      }
    }
  }

  return paragraphs
}

// Parse a passage reference from the title to fetch verse text
function parsePassageRef(title: string): { bookId: string; chapter: number; verseStart: number; verseEnd: number } | null {
  // Match patterns like "Genesis 50:15–21 — Title" or "Genesis 50:15-21"
  const match = title.match(/^(\d?\s?\w+)\s+(\d+):(\d+)[–\-](\d+)/)
  if (!match) {
    // Try "Book Chapter:Verse"
    const m2 = title.match(/^(\d?\s?\w+)\s+(\d+):(\d+)/)
    if (!m2) return null
    const bookId = findBookId(m2[1])
    if (!bookId) return null
    return { bookId, chapter: parseInt(m2[2]), verseStart: parseInt(m2[3]), verseEnd: parseInt(m2[3]) }
  }
  const bookId = findBookId(match[1])
  if (!bookId) return null
  return { bookId, chapter: parseInt(match[2]), verseStart: parseInt(match[3]), verseEnd: parseInt(match[4]) }
}

function findBookId(name: string): string | null {
  const lower = name.toLowerCase().trim()
  for (const [id, bookName] of Object.entries(BOOK_NAMES)) {
    if (bookName.toLowerCase() === lower) return id
  }
  return null
}

function fetchPassageText(db: Database.Database, entityId: string, title: string): string | null {
  const ref = parsePassageRef(title)
  if (!ref) return null

  const verses = db.prepare(`
    SELECT verse, text FROM verses
    WHERE translation_id = 'BSB' AND book_id = ? AND chapter = ?
    AND verse >= ? AND verse <= ?
    ORDER BY verse
  `).all(ref.bookId, ref.chapter, ref.verseStart, ref.verseEnd) as Array<{ verse: number; text: string }>

  if (verses.length === 0) return null
  return verses.map((v) => `[${v.verse}] ${v.text}`).join(' ')
}

function fetchCharacterBio(db: Database.Database, entityId: string): string | null {
  const row = db.prepare('SELECT bio_brief, bio_full FROM characters WHERE id = ?').get(entityId) as { bio_brief: string | null; bio_full: string | null } | undefined
  return row?.bio_full || row?.bio_brief || null
}

function fetchThemeDefinition(db: Database.Database, entityId: string): string | null {
  const row = db.prepare('SELECT definition, modern_framing FROM themes WHERE id = ?').get(entityId) as { definition: string | null; modern_framing: string | null } | undefined
  return row?.definition || row?.modern_framing || null
}

function fetchCommentary(db: Database.Database, entityId: string, title: string): Array<{ author: string; text: string }> {
  const ref = parsePassageRef(title)
  if (!ref) return []

  // Get curated commentary sources
  const curated = ['matthew-henry', 'john-gill', 'jamieson-fausset-brown', 'keil-delitzsch', 'tyndale']

  const rows = db.prepare(`
    SELECT ce.text, cs.english_name as author
    FROM commentary_entries ce
    JOIN commentary_sources cs ON cs.id = ce.source_id
    WHERE ce.book_id = ? AND ce.chapter = ?
    AND (ce.verse >= ? AND ce.verse <= ? OR ce.verse IS NULL)
    AND ce.source_id IN (${curated.map(() => '?').join(',')})
    ORDER BY ce.verse
    LIMIT 5
  `).all(ref.bookId, ref.chapter, ref.verseStart, ref.verseEnd, ...curated) as Array<{ text: string; author: string }>

  return rows.map((r) => ({
    author: r.author,
    text: r.text.length > 500 ? r.text.slice(0, 500).replace(/\s+\S*$/, '') + '...' : r.text,
  }))
}

function entityTypeLabel(type: string): string {
  switch (type) {
    case 'passage': return 'Scripture'
    case 'character': return 'Character'
    case 'theme': return 'Theme'
    case 'climate': return 'Cultural Context'
    case 'question': return 'Discussion Question'
    case 'journal': return 'Personal Note'
    default: return type
  }
}

export async function generateMarkdown(projectId: number): Promise<string> {
  const project = await prisma.studyProject.findUnique({ where: { id: projectId } })
  if (!project) throw new Error('Project not found')

  const items = await prisma.studyAssemblyItem.findMany({
    where: { projectId },
    orderBy: { sortOrder: 'asc' },
  })

  const db = getDb()
  const lines: string[] = []

  lines.push(`# ${project.topic}`)
  lines.push(`*${formatLabels[project.format] || project.format} — Assembled with Selah*`)
  lines.push('')

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const typeLabel = entityTypeLabel(item.entityType)
    lines.push(`## ${i + 1}. ${item.title} [${typeLabel}]`)
    lines.push('')

    if (item.entityType === 'passage') {
      const text = fetchPassageText(db, item.entityId, item.title)
      if (text) {
        lines.push(`> ${text}`)
        lines.push(`> — *Berean Standard Bible*`)
        lines.push('')
      }
    }

    if (item.entityType === 'character') {
      const bio = fetchCharacterBio(db, item.entityId)
      if (bio) { lines.push(bio); lines.push('') }
    }

    if (item.entityType === 'theme') {
      const def = fetchThemeDefinition(db, item.entityId)
      if (def) { lines.push(def); lines.push('') }
    }

    if (item.preview && !['passage', 'character', 'theme'].includes(item.entityType)) {
      lines.push(item.preview)
      lines.push('')
    }

    if (item.annotation) {
      lines.push(`**Notes:** ${item.annotation}`)
      lines.push('')
    }

    lines.push('---')
    lines.push('')
  }

  db.close()
  return lines.join('\n')
}
