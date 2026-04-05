import { prisma } from '@/lib/db'
import Database from 'better-sqlite3'
import { BOOK_NAMES, toSourceTier } from '@/lib/constants'
import type { SourceTier } from '@/components/reader/types'
import type {
  ProjectSummary,
  ActiveProject,
  AssemblyItem,
  SourceSection,
  SourceItem,
  ProjectFormat,
  AssemblyEntityType,
} from '@/components/study-builder/types'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath, { readonly: true })
}

function getWriteDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  const dbPath = dbUrl.replace('file:', '')
  return new Database(dbPath)
}

function now() {
  return new Date().toISOString()
}

// ── Project CRUD ─────────────────────────────────────────────────────────────

export async function listProjects(): Promise<ProjectSummary[]> {
  const projects = await prisma.studyProject.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { items: { select: { id: true } } },
  })

  return projects.map((p) => ({
    id: String(p.id),
    topic: p.topic,
    format: p.format as ProjectFormat,
    itemCount: p.items.length,
    lastEdited: formatRelativeDate(p.updatedAt),
    status: p.status as ProjectSummary['status'],
  }))
}

export async function getProject(id: number): Promise<ActiveProject | null> {
  const p = await prisma.studyProject.findUnique({ where: { id } })
  if (!p) return null
  return {
    id: String(p.id),
    topic: p.topic,
    format: p.format as ProjectFormat,
    lastSaved: formatRelativeDate(p.updatedAt),
  }
}

export async function getProjectItems(projectId: number): Promise<AssemblyItem[]> {
  const items = await prisma.studyAssemblyItem.findMany({
    where: { projectId },
    orderBy: { sortOrder: 'asc' },
  })

  return items.map((item) => ({
    id: String(item.id),
    entityType: item.entityType as AssemblyEntityType,
    entityId: item.entityId,
    title: item.title,
    preview: item.preview,
    sourceTier: item.sourceTier as SourceTier,
    annotation: item.annotation,
  }))
}

export async function createProject(topic: string, format: string): Promise<number> {
  const ts = now()
  const project = await prisma.studyProject.create({
    data: { topic, format, createdAt: ts, updatedAt: ts },
  })
  return project.id
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.studyProject.delete({ where: { id } })
}

export async function updateProjectTimestamp(id: number): Promise<void> {
  await prisma.studyProject.update({ where: { id }, data: { updatedAt: now() } })
}

// ── Assembly Item CRUD ───────────────────────────────────────────────────────

export async function addAssemblyItem(
  projectId: number,
  entityType: string,
  entityId: string,
  title: string,
  preview: string,
  sourceTier: number,
): Promise<number> {
  // Get max sort order
  const maxItem = await prisma.studyAssemblyItem.findFirst({
    where: { projectId },
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  })
  const nextOrder = (maxItem?.sortOrder ?? -1) + 1

  const item = await prisma.studyAssemblyItem.create({
    data: {
      projectId,
      entityType,
      entityId,
      title,
      preview,
      sourceTier,
      sortOrder: nextOrder,
      createdAt: now(),
    },
  })

  await updateProjectTimestamp(projectId)
  return item.id
}

export async function removeAssemblyItem(itemId: number): Promise<void> {
  const item = await prisma.studyAssemblyItem.findUnique({ where: { id: itemId }, select: { projectId: true } })
  await prisma.studyAssemblyItem.delete({ where: { id: itemId } })
  if (item) await updateProjectTimestamp(item.projectId)
}

export async function updateAnnotation(itemId: number, annotation: string): Promise<void> {
  const item = await prisma.studyAssemblyItem.findUnique({ where: { id: itemId }, select: { projectId: true } })
  await prisma.studyAssemblyItem.update({ where: { id: itemId }, data: { annotation } })
  if (item) await updateProjectTimestamp(item.projectId)
}

export async function reorderItems(projectId: number, itemIds: number[]): Promise<void> {
  // Use raw SQL for batch update efficiency
  const db = getWriteDb()
  try {
    const stmt = db.prepare('UPDATE study_assembly_items SET sort_order = ? WHERE id = ? AND project_id = ?')
    const tx = db.transaction(() => {
      for (let i = 0; i < itemIds.length; i++) {
        stmt.run(i, itemIds[i], projectId)
      }
    })
    tx()
  } finally {
    db.close()
  }
  await updateProjectTimestamp(projectId)
}

// ── Assembly Engine — topic-based search ─────────────────────────────────────

function sanitizeFtsQuery(query: string): string {
  return query.replace(/[^\w\s]/g, '').trim().split(/\s+/).filter(Boolean).join(' AND ')
}

export async function assembleMaterial(topic: string): Promise<SourceSection[]> {
  const db = getDb()
  const ftsQuery = sanitizeFtsQuery(topic)
  const likeQuery = `%${topic}%`

  try {
    // 1. Narrative units matching the topic (via FTS or LIKE on title/summary/preachingAngles/keyQuestions)
    const narratives = db.prepare(`
      SELECT n.id, n.title, n.summary, n.book_id, n.chapter_start, n.verse_start,
             n.chapter_end, n.verse_end, n.preaching_angles, n.key_questions,
             n.significance, n.source_tier
      FROM narrative_fts f
      JOIN narrative_units n ON n.rowid = f.rowid
      WHERE narrative_fts MATCH ?
      ORDER BY rank
      LIMIT 12
    `).all(ftsQuery) as Array<{
      id: string; title: string; summary: string; book_id: string;
      chapter_start: number; verse_start: number; chapter_end: number | null; verse_end: number | null;
      preaching_angles: string | null; key_questions: string | null;
      significance: string | null; source_tier: string;
    }>

    const passageItems: SourceItem[] = narratives.map((n) => {
      const bookName = BOOK_NAMES[n.book_id] || n.book_id
      const ref = n.chapter_end && n.chapter_end !== n.chapter_start
        ? `${bookName} ${n.chapter_start}:${n.verse_start}–${n.chapter_end}:${n.verse_end ?? ''}`
        : `${bookName} ${n.chapter_start}:${n.verse_start}–${n.verse_end ?? ''}`
      return {
        id: `passage:${n.id}`,
        entityType: 'passage' as const,
        title: `${ref} — ${n.title}`,
        preview: truncate(n.summary || n.significance || '', 120),
      }
    })

    // 2. Characters matching the topic
    const characters = db.prepare(`
      SELECT c.id, c.name, c.bio_brief, c.source_tier
      FROM characters_fts f
      JOIN characters c ON c.rowid = f.rowid
      WHERE characters_fts MATCH ?
      ORDER BY rank
      LIMIT 8
    `).all(ftsQuery) as Array<{ id: string; name: string; bio_brief: string | null; source_tier: string }>

    const characterItems: SourceItem[] = characters.map((c) => ({
      id: `character:${c.id}`,
      entityType: 'character' as const,
      title: c.name,
      preview: truncate(c.bio_brief || '', 100),
    }))

    // 3. Themes matching the topic
    const themes = db.prepare(`
      SELECT id, name, definition, modern_framing, source_tier FROM themes
      WHERE name LIKE ? OR definition LIKE ? OR modern_framing LIKE ?
      LIMIT 8
    `).all(likeQuery, likeQuery, likeQuery) as Array<{
      id: string; name: string; definition: string | null; modern_framing: string | null; source_tier: string
    }>

    const themeItems: SourceItem[] = themes.map((t) => ({
      id: `theme:${t.id}`,
      entityType: 'theme' as const,
      title: t.name,
      preview: truncate(t.modern_framing || t.definition || '', 100),
    }))

    // 4. Climate contexts matching the topic
    const climates = db.prepare(`
      SELECT id, name, era, geographic, source_tier FROM climate_contexts
      WHERE name LIKE ? OR geographic LIKE ?
      LIMIT 6
    `).all(likeQuery, likeQuery) as Array<{
      id: string; name: string; era: string | null;
      geographic: string | null; source_tier: string
    }>

    const climateItems: SourceItem[] = climates.map((c) => ({
      id: `climate:${c.id}`,
      entityType: 'climate' as const,
      title: `${c.name}${c.era ? ` (${c.era})` : ''}`,
      preview: truncate(c.geographic || '', 100),
    }))

    // 5. Preaching angles / key questions extracted from matching narratives
    const questionItems: SourceItem[] = []
    for (const n of narratives) {
      if (n.preaching_angles) {
        for (const item of parseJsonOrLines(n.preaching_angles).slice(0, 2)) {
          const title = typeof item === 'object' && item !== null
            ? (item as Record<string, string>).angle || (item as Record<string, string>).title || JSON.stringify(item)
            : String(item).replace(/^[-•*]\s*/, '').trim()
          questionItems.push({
            id: `question:${n.id}:pa:${questionItems.length}`,
            entityType: 'question' as const,
            title,
            preview: `From ${n.title}`,
          })
        }
      }
      if (n.key_questions) {
        for (const item of parseJsonOrLines(n.key_questions).slice(0, 2)) {
          const title = typeof item === 'string'
            ? item.replace(/^[-•*\d.)\s]+/, '').trim()
            : (item as Record<string, string>).question || (item as Record<string, string>).title || JSON.stringify(item)
          questionItems.push({
            id: `question:${n.id}:kq:${questionItems.length}`,
            entityType: 'question' as const,
            title,
            preview: `From ${n.title}`,
          })
        }
      }
    }

    // 6. User notes matching the topic
    const notes = db.prepare(`
      SELECT id, title, content, note_type FROM user_notes
      WHERE content LIKE ? OR title LIKE ?
      ORDER BY updated_at DESC
      LIMIT 6
    `).all(likeQuery, likeQuery) as Array<{ id: number; title: string | null; content: string; note_type: string }>

    const noteItems: SourceItem[] = notes.map((n) => ({
      id: `journal:${n.id}`,
      entityType: 'journal' as const,
      title: n.title || `${n.note_type} note`,
      preview: truncate(n.content, 100),
    }))

    // Build sections (only include non-empty ones)
    const sections: SourceSection[] = []
    if (passageItems.length > 0) sections.push({ id: 'passages', label: 'Suggested passages', items: passageItems })
    if (characterItems.length > 0) sections.push({ id: 'characters', label: 'Characters', items: characterItems })
    if (themeItems.length > 0) sections.push({ id: 'themes', label: 'Themes', items: themeItems })
    if (climateItems.length > 0) sections.push({ id: 'climate', label: 'Climate contexts', items: climateItems })
    if (questionItems.length > 0) sections.push({ id: 'questions', label: 'Preaching angles & questions', items: questionItems.slice(0, 10) })
    if (noteItems.length > 0) sections.push({ id: 'notes', label: 'Your notes', items: noteItems })

    return sections
  } finally {
    db.close()
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseJsonOrLines(text: string): unknown[] {
  try {
    const parsed = JSON.parse(text)
    if (Array.isArray(parsed)) return parsed
    return [parsed]
  } catch {
    return text.split('\n').filter(Boolean)
  }
}

function truncate(text: string, len: number): string {
  if (text.length <= len) return text
  return text.slice(0, len).replace(/\s+\S*$/, '') + '...'
}

function formatRelativeDate(isoStr: string): string {
  if (!isoStr) return 'Just now'
  const diff = Date.now() - new Date(isoStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return `${Math.floor(days / 7)}w ago`
}
