import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type {
  JournalEntry,
  JournalSummary,
  JournalDetail,
  JournalPickerItem,
  Collection,
  Bookmark,
  Anchor,
  NoteType,
  StudyContext,
} from '@/components/journal/types'

export type { JournalSummary, JournalDetail, JournalPickerItem }

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

export async function getJournalEntries(userId: string, opts?: {
  search?: string
  noteType?: string
  limit?: number
  journalId?: string
}): Promise<JournalEntry[]> {
  const notes = await prisma.userNote.findMany({
    where: opts?.journalId ? { userId, journalId: opts.journalId } : { userId },
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

export async function getJournalEntry(userId: string, id: number): Promise<JournalEntry | null> {
  const note = await prisma.userNote.findFirst({
    where: { id, userId },
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

export async function createNote(userId: string, data: {
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
      userId,
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
          userId,
        },
      })
    }
  }

  // Add theme tags
  if (data.themeIds?.length) {
    for (const themeId of data.themeIds) {
      await prisma.userNoteTheme.create({
        data: { noteId: note.id, themeId, userId },
      })
    }
  }

  // Add user tags
  if (data.userTags?.length) {
    for (const tagName of data.userTags) {
      const tagId = tagName.toLowerCase().replace(/\s+/g, '-')
      await prisma.userTag.upsert({
        where: { id: tagId },
        create: { id: tagId, name: tagName, userId, createdAt: now },
        update: {},
      })
      await prisma.userNoteTag.create({
        data: { noteId: note.id, tagId, userId },
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

export async function updateNote(userId: string, id: number, data: {
  content?: string
  noteType?: string
  anchors?: Array<{ type: string; bookId?: string; chapter?: number; verseStart?: number; verseEnd?: number; refId?: string }>
  themeIds?: string[]
  userTags?: string[]
}): Promise<void> {
  const now = new Date().toISOString()
  const { anchors, themeIds, userTags, ...coreFields } = data

  // Ownership probe — ensures the caller owns this note before any writes.
  const existing = await prisma.userNote.findFirst({
    where: { id, userId },
    select: { id: true },
  })
  if (!existing) throw new Error('note not found')

  const note = await prisma.userNote.update({
    where: { id },
    data: {
      ...coreFields,
      updatedAt: now,
    },
    select: { journalId: true },
  })

  // Update anchors if provided
  if (anchors !== undefined) {
    await prisma.userNoteAnchor.deleteMany({ where: { noteId: id } })
    for (const a of anchors) {
      await prisma.userNoteAnchor.create({
        data: {
          noteId: id,
          anchorType: a.type,
          bookId: a.bookId ?? null,
          chapter: a.chapter ?? null,
          verseStart: a.verseStart ?? null,
          verseEnd: a.verseEnd ?? null,
          refId: a.refId ?? null,
          isPrimary: false,
          userId,
        },
      })
    }
  }

  // Update theme tags if provided
  if (themeIds !== undefined) {
    await prisma.userNoteTheme.deleteMany({ where: { noteId: id } })
    for (const themeId of themeIds) {
      await prisma.userNoteTheme.create({
        data: { noteId: id, themeId, userId },
      })
    }
  }

  // Update user tags if provided
  if (userTags !== undefined) {
    await prisma.userNoteTag.deleteMany({ where: { noteId: id } })
    for (const tagName of userTags) {
      const tagId = tagName.toLowerCase().replace(/\s+/g, '-')
      await prisma.userTag.upsert({
        where: { id: tagId },
        create: { id: tagId, name: tagName, userId, createdAt: now },
        update: {},
      })
      await prisma.userNoteTag.create({
        data: { noteId: id, tagId, userId },
      })
    }
  }

  if (note.journalId) {
    await prisma.journal.update({
      where: { id: note.journalId },
      data: { updatedAt: now },
    }).catch(() => {})
  }
}

export async function deleteNote(userId: string, id: number): Promise<void> {
  const { count } = await prisma.userNote.deleteMany({ where: { id, userId } })
  if (count === 0) throw new Error('note not found')
}

// ── User Tags ─────────────────────────────────────────────────────────────────

export async function getUserTags(userId: string): Promise<string[]> {
  const tags = await prisma.userTag.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  })
  return tags.map((t) => t.name)
}

// ── Collections ───────────────────────────────────────────────────────────────

export async function getCollections(userId: string): Promise<Collection[]> {
  const collections = await prisma.userCollection.findMany({
    where: { userId },
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

export async function createCollection(userId: string, title: string, description: string): Promise<number> {
  const now = new Date().toISOString()
  const col = await prisma.userCollection.create({
    data: { userId, title, description, createdAt: now, updatedAt: now },
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

export async function getCollectionDetail(userId: string, id: number): Promise<CollectionDetail | null> {
  const col = await prisma.userCollection.findFirst({
    where: { id, userId },
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
  userId: string,
  collectionId: number,
  itemType: string,
  itemRef: string,
  note?: string,
): Promise<number> {
  const now = new Date().toISOString()
  // Ownership check: bump updatedAt only if the collection belongs to this user.
  const { count } = await prisma.userCollection.updateMany({
    where: { id: collectionId, userId },
    data: { updatedAt: now },
  })
  if (count === 0) throw new Error('collection not found')

  const maxOrder = await prisma.userCollectionItem.findFirst({
    where: { collectionId, userId },
    orderBy: { sortOrder: 'desc' },
    select: { sortOrder: true },
  })
  const item = await prisma.userCollectionItem.create({
    data: {
      userId,
      collectionId,
      itemType,
      itemRef,
      note: note ?? null,
      sortOrder: (maxOrder?.sortOrder ?? 0) + 1,
      createdAt: now,
    },
  })
  return item.id
}

export async function removeCollectionItem(userId: string, itemId: number): Promise<void> {
  // Silent no-op if item doesn't exist or isn't owned — preserves fire-and-forget semantics.
  await prisma.userCollectionItem.deleteMany({ where: { id: itemId, userId } })
}

export async function deleteCollection(userId: string, id: number): Promise<void> {
  const { count } = await prisma.userCollection.deleteMany({ where: { id, userId } })
  if (count === 0) throw new Error('collection not found')
}

// ── Bookmarks ─────────────────────────────────────────────────────────────────

export async function getBookmarks(userId: string): Promise<Bookmark[]> {
  const bookmarks = await prisma.userBookmark.findMany({
    where: { userId },
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

export async function createBookmark(userId: string, bookId: string, chapter: number, verse?: number): Promise<number> {
  const bm = await prisma.userBookmark.create({
    data: {
      userId,
      bookId,
      chapter,
      verse: verse ?? null,
      createdAt: new Date().toISOString(),
    },
  })
  return bm.id
}

export async function deleteBookmark(userId: string, id: number): Promise<void> {
  // Silent no-op if bookmark doesn't exist or isn't owned — preserves fire-and-forget semantics.
  await prisma.userBookmark.deleteMany({ where: { id, userId } })
}

// ── Journals ──────────────────────────────────────────────────────────────────

export async function getJournals(userId: string): Promise<JournalSummary[]> {
  const journals = await prisma.journal.findMany({
    where: { userId },
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

  return journals.map((j) => {
    const lastEntryAt = j.notes[0]?.createdAt ?? null
    return {
      id: j.id,
      name: j.name,
      description: j.description ?? '',
      coverColor: (j.coverColor as JournalSummary['coverColor']) ?? null,
      journalType: (j.journalType as JournalSummary['journalType']) ?? 'study',
      isDefault: j.isDefault,
      noteCount: j._count.notes,
      lastEntry: lastEntryAt,
      lastEntryAgo: lastEntryAt ? timeAgo(lastEntryAt) : null,
      anchorBookId: j.anchorBookId ?? null,
      anchorChapter: j.anchorChapter ?? null,
      anchorCharacterId: j.anchorCharacterId ?? null,
      anchorThemeId: j.anchorThemeId ?? null,
    }
  })
}

export async function getJournalDetail(userId: string, id: string): Promise<JournalDetail | null> {
  const j = await prisma.journal.findFirst({ where: { id, userId } })
  if (!j) return null
  return {
    id: j.id,
    name: j.name,
    description: j.description ?? '',
    coverColor: (j.coverColor as JournalDetail['coverColor']) ?? null,
    journalType: (j.journalType as JournalDetail['journalType']) ?? 'study',
    isDefault: j.isDefault,
    anchorBookId: j.anchorBookId ?? null,
    anchorChapter: j.anchorChapter ?? null,
    anchorCharacterId: j.anchorCharacterId ?? null,
    anchorThemeId: j.anchorThemeId ?? null,
  }
}

export async function createJournal(userId: string, data: {
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
      userId,
      createdAt: now,
      updatedAt: now,
    },
  })
  return j.id
}

export async function updateJournal(
  userId: string,
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
  const { count } = await prisma.journal.updateMany({
    where: { id, userId },
    data: {
      ...data,
      updatedAt: new Date().toISOString(),
    },
  })
  if (count === 0) throw new Error('journal not found')
}

export async function deleteJournal(userId: string, id: string): Promise<void> {
  const journal = await prisma.journal.findFirst({
    where: { id, userId },
    select: { isDefault: true },
  })
  if (!journal) return
  if (journal.isDefault) throw new Error('Cannot delete the default journal')

  // Move all notes to the default journal before deleting (scoped to this user)
  await prisma.userNote.updateMany({
    where: { journalId: id, userId },
    data: { journalId: 'default' },
  })
  await prisma.journal.delete({ where: { id } })
}

export async function getJournalPickerList(userId: string): Promise<JournalPickerItem[]> {
  const journals = await prisma.journal.findMany({
    where: { userId },
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
