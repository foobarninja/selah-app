import { prisma } from '@/lib/db'
import { BOOK_NAMES } from '@/lib/constants'
import type { ContextSection, ReaderContext } from '../../types'

/**
 * Fetch user's collection and study-project items relevant to the current page.
 * Returns a single ContextSection (or null if no items found).
 */
export async function extractCollectionContext(
  userId: string,
  ctx: ReaderContext
): Promise<ContextSection | null> {
  const bookName = BOOK_NAMES[ctx.bookId] ?? ctx.bookId
  const chapterPrefix = `${bookName} ${ctx.chapter}:`

  // 1. Collection items matching this chapter (scoped to the active profile)
  const collectionItems = await prisma.userCollectionItem.findMany({
    where: { userId, itemRef: { startsWith: chapterPrefix } },
    include: { collection: { select: { title: true } } },
    take: 20,
  })

  // 2. Study builder items matching this chapter (scoped to the active profile)
  const studyItems = await prisma.studyAssemblyItem.findMany({
    where: {
      userId,
      entityType: 'verse',
      entityId: { startsWith: chapterPrefix },
    },
    include: { project: { select: { topic: true } } },
    take: 20,
  })

  if (collectionItems.length === 0 && studyItems.length === 0) return null

  const lines: string[] = ['### Your Saved Items']

  for (const item of collectionItems) {
    const note = item.note ? ` — "${item.note}"` : ''
    lines.push(`- **${item.itemRef}** in collection "${item.collection.title}"${note}`)
  }

  for (const item of studyItems) {
    const note = item.annotation ? ` — "${item.annotation}"` : ''
    lines.push(`- **${item.entityId}** in study "${item.project.topic}"${note}`)
  }

  const content = lines.join('\n')
  return {
    id: 'collections',
    label: 'Your Saved Items',
    content,
    estimatedTokens: Math.ceil(content.length / 4),
    defaultEnabled: false,  // off by default — user opts in
  }
}
