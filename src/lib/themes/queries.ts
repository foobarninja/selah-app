import { prisma } from '@/lib/db'
import { BOOK_NAMES, BOOK_ORDER, toSourceTier } from '@/lib/constants'
import type {
  CategoryGroup,
  ThemeSummary,
  ThemeProfile,
  ThemePassage,
  ConnectedCharacter,
  RelatedTheme,
  ThemeCategory,
} from '@/components/themes/types'
import type { Era } from '@/components/characters/types'

const CATEGORY_LABELS: Record<string, string> = {
  'virtue': 'Virtue',
  'emotion': 'Emotion',
  'doctrine': 'Doctrine',
  'relationship': 'Relationship',
  'condition': 'Condition',
  'action': 'Action',
  'attribute-of-god': 'Attribute of God',
}

function mapCategory(c: string | null): ThemeCategory {
  const valid: ThemeCategory[] = ['virtue', 'emotion', 'doctrine', 'relationship', 'condition', 'action', 'attribute-of-god']
  if (c && valid.includes(c as ThemeCategory)) return c as ThemeCategory
  return 'doctrine'
}

function mapEra(era: string | null): Era {
  const e = era?.replace(/\s+/g, '-').toLowerCase() ?? 'patriarchal'
  if (e.includes('patriarch')) return 'patriarchal'
  if (e.includes('exodus')) return 'exodus'
  if (e.includes('judge')) return 'judges'
  if (e.includes('monarch')) return 'monarchy'
  if (e.includes('exile')) return 'exile'
  if (e.includes('christ')) return 'life-of-christ'
  if (e.includes('church') || e.includes('apostol')) return 'early-church'
  return 'patriarchal'
}

export async function getThemesByCategory(search?: string): Promise<CategoryGroup[]> {
  const where: Record<string, unknown> = { parentThemeId: null }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { definition: { contains: search } },
    ]
    delete where.parentThemeId // search all themes, not just top-level
  }

  const themes = await prisma.theme.findMany({
    where,
    include: { children: { select: { id: true, name: true } } },
    orderBy: { name: 'asc' },
  })

  // Group by category
  const groups = new Map<string, ThemeSummary[]>()

  for (const t of themes) {
    const cat = t.category ?? 'doctrine'
    const arr = groups.get(cat) ?? []
    arr.push({
      id: t.id,
      name: t.name,
      modernFraming: t.modernFraming ?? '',
      children: t.children.map((c) => ({ id: c.id, name: c.name })),
    })
    groups.set(cat, arr)
  }

  // Build ordered category groups
  const result: CategoryGroup[] = []
  for (const [catId, label] of Object.entries(CATEGORY_LABELS)) {
    const themes = groups.get(catId)
    if (themes && themes.length > 0) {
      result.push({ id: catId, label, themes })
    }
  }

  return result
}

export async function getThemeProfile(id: string): Promise<ThemeProfile | null> {
  const theme = await prisma.theme.findUnique({
    where: { id },
    include: {
      children: { select: { id: true, name: true } },
      parent: { select: { id: true, name: true } },
    },
  })

  if (!theme) return null

  const [passages, characters, traceSegments] = await Promise.all([
    getThemePassages(id),
    getThemeCharacters(id),
    getThemeTrace(id),
  ])

  // Parse related themes from JSON
  let relatedThemes: RelatedTheme[] = []
  if (theme.relatedThemes) {
    try {
      const ids: string[] = JSON.parse(theme.relatedThemes)
      const related = await prisma.theme.findMany({
        where: { id: { in: ids } },
        select: { id: true, name: true },
      })
      relatedThemes = related
    } catch { /* ignore parse errors */ }
  }

  // Group passages by era
  const passagesByEra: Record<string, ThemePassage[]> = {}
  for (const p of passages) {
    const era = p.era
    if (!passagesByEra[era]) passagesByEra[era] = []
    passagesByEra[era].push(p)
  }

  return {
    id: theme.id,
    name: theme.name,
    modernFraming: theme.modernFraming ?? '',
    scholarlyDefinition: theme.definition ?? '',
    category: mapCategory(theme.category),
    parentThemeId: theme.parentThemeId,
    childThemes: theme.children.map((c) => ({ id: c.id, name: c.name })),
    relatedThemes,
    traceSegments,
    passages: passagesByEra,
    connectedCharacters: characters,
  }
}

interface ThemePassageWithEra extends ThemePassage {
  era: string
}

async function getThemePassages(themeId: string): Promise<ThemePassageWithEra[]> {
  const rows = await prisma.passageTheme.findMany({
    where: { themeId },
    include: { book: { select: { name: true, testament: true } } },
    orderBy: [{ bookId: 'asc' }, { chapter: 'asc' }, { verseStart: 'asc' }],
    take: 100,
  })

  return rows.map((r) => {
    const bookName = BOOK_NAMES[r.bookId] ?? r.bookId
    const verseEnd = r.verseEnd ? `-${r.verseEnd}` : ''
    // Estimate era from testament
    const era = r.book.testament === 'OT' ? 'patriarchal' : 'life-of-christ'
    return {
      id: String(r.id),
      passageRef: `${bookName} ${r.chapter}:${r.verseStart}${verseEnd}`,
      passageTitle: `${bookName} ${r.chapter}`,
      annotation: r.contextNote ?? '',
      sourceTier: toSourceTier(r.sourceTier),
      era,
    }
  })
}

async function getThemeCharacters(themeId: string): Promise<ConnectedCharacter[]> {
  // Find characters that appear in passages tagged with this theme
  const passageThemes = await prisma.passageTheme.findMany({
    where: { themeId },
    select: { bookId: true, chapter: true, verseStart: true, verseEnd: true },
    take: 30,
  })

  const charMap = new Map<string, { name: string; annotation: string; era: string }>()

  for (const pt of passageThemes) {
    const appearances = await prisma.characterAppearance.findMany({
      where: {
        bookId: pt.bookId,
        chapter: pt.chapter,
        verseStart: { lte: pt.verseEnd ?? pt.verseStart },
        OR: [{ verseEnd: { gte: pt.verseStart } }, { verseEnd: null }],
      },
      include: { character: { select: { name: true, era: true } } },
      take: 5,
    })

    for (const a of appearances) {
      if (!charMap.has(a.characterId)) {
        charMap.set(a.characterId, {
          name: a.character.name,
          annotation: a.narrativeNote ?? '',
          era: a.character.era ?? '',
        })
      }
    }
  }

  return Array.from(charMap.entries()).slice(0, 10).map(([id, val]) => ({
    characterId: id,
    name: val.name,
    annotation: val.annotation,
    era: mapEra(val.era),
  }))
}

async function getThemeTrace(themeId: string): Promise<Array<{ book: string; count: number }>> {
  // Count passages per book for this theme
  const rows = await prisma.passageTheme.groupBy({
    by: ['bookId'],
    where: { themeId },
    _count: true,
  })

  const countMap = new Map(rows.map((r) => [r.bookId, r._count]))

  return BOOK_ORDER.map((bookId) => ({
    book: bookId,
    count: countMap.get(bookId) ?? 0,
  }))
}
