import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type {
  JournalEntry,
  Collection,
  Bookmark,
  Anchor,
  NoteType,
  StudyContext,
  JournalTab,
} from '@/components/journal/types'

// ── Journal interfaces ─────────────────────────────────────────────────────────

export interface JournalSummary {
  id: string
  name: string
  description: string | null
  coverColor: string | null
  journalType: string
  sortOrder: number
  isDefault: boolean
  noteCount: number
  lastEntryAt: string | null
  updatedAt: string
}

export interface JournalDetail {
  id: string
  name: string
  description: string | null
  coverColor: string | null
  journalType: string
  anchorBookId: string | null
  anchorChapter: number | null
  anchorVerse: number | null
  anchorCharacterId: string | null
  anchorThemeId: string | null
  sortOrder: number
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface JournalPickerItem {
  id: string
  name: string
  noteCount: number
  isDefault: boolean
}

function timeAgo(dateStr: string): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.floor(h / 24)
  if (d < 7) return `${d}d ago`
  return `${Math.floor(d / 7)}w ago`
}

// ── Notes ─────────────────────────────────────────────────────────────────────

export async function getJournalEntries(opts?: {
  search?: string
  noteType?: string
  limit?: number
  journalId?: string
}): Promise<JournalEntry[]> {
  const notes = await prisma.userNote.findMany({
    where: opts?.journalId ? { journalId: opts.journalId } : undefined,
    orderBy: { createdAt: 'desc' },
    take: opts?.limit ?? 100,
    include: {
      anchors: true,
      noteThemes: true,
      noteTags: { include: { tag: true } },
      journal: { select: { id: true, name: true } },
    },
  })

  let entries = notes.map((n) => mapEntry(n))

  if (opts?.search) {
    const q = opts.search.toLowerCase()
    entries = entries.filter((e) =>
      e.content.toLowerCase().includes(q) ||
      e.anchors.some((a) => a.label.toLowerCase().includes(q)) ||
      e.userTags.some((t) => t.toLowerCase().includes(q))
    )
  }

  if (opts?.noteType) {
    entries = entries.filter((e) => e.noteType === opts.noteType)
  }

  return entries
}

export async function getJournalEntry(id: number): Promise<JournalEntry | null> {
  const note = await prisma.userNote.findUnique({
    where: { id },
    include: {
      anchors: true,
      noteThemes: true,
      noteTags: { include: { tag: true } },
      journal: { select: { id: true, name: true } },
    },
  })
  if (!note) return null
  return mapEntry(note)
}

function mapEntry(n: {
  id: number
  title: string | null
  content: string
  noteType: string
  studyContext: string | null
  journalId: string | null
  createdAt: string
  anchors: Array<{ anchorType: string; bookId: string | null; chapter: number | null; verseStart: number | null; refId: string | null }>
  noteThemes: Array<{ themeId: string }>
  noteTags: Array<{ tag: { id: string; name: string } }>
  journal?: { id: string; name: string } | null
}): JournalEntry {
  return {
    id: String(n.id),
    noteType: n.noteType as NoteType,
    content: n.content,
    anchors: n.anchors.map((a) => {
      if (a.anchorType === 'verse' && a.bookId) {
        const bookName = BOOK_NAMES[a.bookId] ?? a.bookId
        return {
          type: 'verse' as const,
          label: `${bookName} ${a.chapter}:${a.verseStart}`,
          entityId: `${a.bookId}-${a.chapter}-${a.verseStart}`,
        }
      }
      return {
        type: a.anchorType as Anchor['type'],
        label: a.refId ?? '',
        entityId: a.refId ?? '',
      }
    }),
    themeTags: n.noteThemes.map((t) => t.themeId),
    userTags: n.noteTags.map((t) => t.tag.name),
    studyContext: (n.studyContext ?? 'freestanding') as StudyContext,
    createdAt: n.createdAt,
    timeAgo: timeAgo(n.createdAt),
    journalId: n.journalId ?? undefined,
    journalName: n.journal?.name ?? undefined,
  }
}

export async function createNote(data: {
  content: string
  noteType: string
  studyContext?: string
  journalId?: string
  anchors?: Array<{ type: string; bookId?: string; chapter?: number; verseStart?: number; verseEnd?: number; refId?: string }>
  themeIds?: string[]
  userTags?: string[]
}): Promise<number> {
  const now = new Date().toISOString()
  const journalId = data.journalId ?? 'default'
  const note = await prisma.userNote.create({
    data: {
      content: data.content,
      noteType: data.noteType,
      studyContext: data.studyContext ?? 'freestanding',
      journalId,
      createdAt: now,
      updatedAt: now,
    },
  })

  // Add anchors
  if (data.anchors?.length) {
    for (const a of data.anchors) {
      await prisma.userNoteAnchor.create({
        data: {
          noteId: note.id,
          anchorType: a.type,
          bookId: a.bookId ?? null,
          chapter: a.chapter ?? null,
          verseStart: a.verseStart ?? null,
          verseEnd: a.verseEnd ?? null,
          refId: a.refId ?? null,
          isPrimary: false,
        },
      })
    }
  }

  // Add theme tags
  if (data.themeIds?.length) {
    for (const themeId of data.themeIds) {
      await prisma.userNoteTheme.create({
        data: { noteId: note.id, themeId },
      })
    }
  }

  // Add user tags
  if (data.userTags?.length) {
    for (const tagName of data.userTags) {
      const tagId = tagName.toLowerCase().replace(/\s+/g, '-')
      await prisma.userTag.upsert({
        where: { id: tagId },
        create: { id: tagId, name: tagName, createdAt: now },
        update: {},
      })
      await prisma.userNoteTag.create({
        data: { noteId: note.id, tagId },
      })
    }
  }

  // Update journal's updatedAt to reflect new entry
  await prisma.journal.update({
    where: { id: journalId },
    data: { updatedAt: now },
  })

  return note.id
}

export async function updateNote(id: number, data: { content?: string; noteType?: string }): Promise<void> {
  await prisma.userNote.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date().toISOString(),
    },
  })
}

export async function deleteNote(id: number): Promise<void> {
  await prisma.userNote.delete({ where: { id } })
}

// ── User Tags ─────────────────────────────────────────────────────────────────

export async function getUserTags(): Promise<string[]> {
  const tags = await prisma.userTag.findMany({ orderBy: { name: 'asc' } })
  return tags.map((t) => t.name)
}

// ── Collections ───────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  const collections = await prisma.userCollection.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { _count: { select: { items: true } } },
  })

  return collections.map((c) => ({
    id: String(c.id),
    title: c.title,
    description: c.description ?? '',
    itemCount: c._count.items,
    lastEdited: timeAgo(c.updatedAt),
  }))
}

export async function createCollection(title: string, description: string): Promise<number> {
  const now = new Date().toISOString()
  const col = await prisma.userCollection.create({
    data: { title, description, createdAt: now, updatedAt: now },
  })
  return col.id
}

export interface CollectionDetail {
  id: string
  title: string
  description: string
  items: CollectionItem[]
}

export interface CollectionItem {
  id: string
  itemType: string
  itemRef: string
  note: string
  sortOrder: number
}

export async function getCollectionDetail(id: number): Promise<CollectionDetail | null> {
  const col = await prisma.userCollection.findUnique({
    where: { id },
    include: { items: { orderBy: { sortOrder: 'asc' } } },
  })
  if (!col) return null

  return {
    id: String(col.id),
    title: col.title,
    description: col.description ?? '',
    items: col.items.map((item) => ({
      id: String(item.id),
      itemType: item.itemType,
      itemRef: item.itemRef,
      note: item.note ?? '',
      sortOrder: item.sortOrder,
    })),
  }
}

export async function addCollectionItem(
  collectionId: number,
  itemType: string,
  itemRef: string,
  note?: string,
): Promise<number> {
  const now = new Date().toISOString()
  const maxOrder = await prisma.userCollectionItem.findFirst({
    where: { collectionId },
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  })
  const item = await prisma.userCollectionItem.create({
    data: {
      collectionId,
      itemType,
      itemRef,
      note: note ?? null,
      sortOrder: (maxOrder?.sortOrder ?? 0) + 1,
      createdAt: now,
    },
  })
  await prisma.userCollection.update({
    where: { id: collectionId },
    data: { updatedAt: now },
  })
  return item.id
}

export async function removeCollectionItem(itemId: number): Promise<void> {
  await prisma.userCollectionItem.delete({ where: { id: itemId } })
}

export async function deleteCollection(id: number): Promise<void> {
  await prisma.userCollection.delete({ where: { id } })
}

// ── Bookmarks ─────────────────────────────────────────────────────────────────

export async function getBookmarks(): Promise<Bookmark[]> {
  const bookmarks = await prisma.userBookmark.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return bookmarks.map((b) => {
    const bookName = BOOK_NAMES[b.bookId] ?? b.bookId
    return {
      id: String(b.id),
      verseRef: `${bookName} ${b.chapter}${b.verse ? ':' + b.verse : ''}`,
      createdAt: b.createdAt,
      timeAgo: timeAgo(b.createdAt),
    }
  })
}

export async function createBookmark(bookId: string, chapter: number, verse?: number): Promise<number> {
  const bm = await prisma.userBookmark.create({
    data: {
      bookId,
      chapter,
      verse: verse ?? null,
      createdAt: new Date().toISOString(),
    },
  })
  return bm.id
}

export async function deleteBookmark(id: number): Promise<void> {
  await prisma.userBookmark.delete({ where: { id } })
}

// ── Journals ──────────────────────────────────────────────────────────────────

export async function getJournals(): Promise<JournalSummary[]> {
  const journals = await prisma.journal.findMany({
    orderBy: [{ isDefault: 'desc' }, { updatedAt: 'desc' }],
    include: {
      _count: { select: { notes: true } },
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { createdAt: true },
      },
    },
  })

  return journals.map((j) => ({
    id: j.id,
    name: j.name,
    description: j.description,
    coverColor: j.coverColor,
    journalType: j.journalType,
    sortOrder: j.sortOrder,
    isDefault: j.isDefault,
    noteCount: j._count.notes,
    lastEntryAt: j.notes[0]?.createdAt ?? null,
    updatedAt: j.updatedAt,
  }))
}

export async function getJournalDetail(id: string): Promise<JournalDetail | null> {
  const j = await prisma.journal.findUnique({ where: { id } })
  if (!j) return null
  return {
    id: j.id,
    name: j.name,
    description: j.description,
    coverColor: j.coverColor,
    journalType: j.journalType,
    anchorBookId: j.anchorBookId,
    anchorChapter: j.anchorChapter,
    anchorVerse: j.anchorVerse,
    anchorCharacterId: j.anchorCharacterId,
    anchorThemeId: j.anchorThemeId,
    sortOrder: j.sortOrder,
    isDefault: j.isDefault,
    createdAt: j.createdAt,
    updatedAt: j.updatedAt,
  }
}

export async function createJournal(data: {
  name: string
  description?: string
  coverColor?: string
  journalType?: string
  anchorBookId?: string
  anchorChapter?: number
  anchorVerse?: number
  anchorCharacterId?: string
  anchorThemeId?: string
}): Promise<string> {
  const now = new Date().toISOString()
  const j = await prisma.journal.create({
    data: {
      name: data.name,
      description: data.description ?? null,
      coverColor: data.coverColor ?? null,
      journalType: data.journalType ?? 'study',
      anchorBookId: data.anchorBookId ?? null,
      anchorChapter: data.anchorChapter ?? null,
      anchorVerse: data.anchorVerse ?? null,
      anchorCharacterId: data.anchorCharacterId ?? null,
      anchorThemeId: data.anchorThemeId ?? null,
      isDefault: false,
      sortOrder: 0,
      createdAt: now,
      updatedAt: now,
    },
  })
  return j.id
}

export async function updateJournal(
  id: string,
  data: {
    name?: string
    description?: string | null
    coverColor?: string | null
    journalType?: string
    anchorBookId?: string | null
    anchorChapter?: number | null
    anchorVerse?: number | null
    anchorCharacterId?: string | null
    anchorThemeId?: string | null
    sortOrder?: number
  },
): Promise<void> {
  await prisma.journal.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date().toISOString(),
    },
  })
}

export async function deleteJournal(id: string): Promise<void> {
  // Move all notes to the default journal before deleting
  await prisma.userNote.updateMany({
    where: { journalId: id },
    data: { journalId: 'default' },
  })
  await prisma.journal.delete({ where: { id } })
}

export async function getJournalPickerList(): Promise<JournalPickerItem[]> {
  const journals = await prisma.journal.findMany({
    orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
    include: { _count: { select: { notes: true } } },
  })
  return journals.map((j) => ({
    id: j.id,
    name: j.name,
    noteCount: j._count.notes,
    isDefault: j.isDefault,
  }))
}
