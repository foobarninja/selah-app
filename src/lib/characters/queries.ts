import { prisma } from '@/lib/db'
import { BOOK_NAMES, toSourceTier } from '@/lib/constants'
import type {
  CharacterSummary,
  CharacterProfile,
  CharacterAppearance,
  CharacterRelationship,
  ConnectedTheme,
  Era,
  RoleType,
  SocialStatus,
  SceneRole,
  RelationshipType,
  RelationshipGroup,
} from '@/components/characters/types'

function mapEra(dbEra: string | null): Era {
  const normalized = dbEra?.replace(/\s+/g, '-').toLowerCase() ?? 'patriarchal'
  const valid: Era[] = ['patriarchal', 'exodus', 'judges', 'monarchy', 'exile', 'life-of-christ', 'early-church']
  if (valid.includes(normalized as Era)) return normalized as Era
  // Map DB variants
  if (normalized.includes('monarch')) return 'monarchy'
  if (normalized.includes('patriarch')) return 'patriarchal'
  if (normalized.includes('apostol') || normalized === 'early-church') return 'early-church'
  if (normalized.includes('christ') || normalized === 'life-of-christ') return 'life-of-christ'
  if (normalized.includes('post-exile')) return 'exile'
  return 'patriarchal'
}

function mapSocialStatus(s: string | null): SocialStatus {
  const valid: SocialStatus[] = ['royalty', 'priest', 'outcast', 'common', 'military']
  if (s && valid.includes(s as SocialStatus)) return s as SocialStatus
  return 'common'
}

function mapRelationshipType(r: string): RelationshipType {
  const valid: RelationshipType[] = ['parent', 'child', 'spouse', 'sibling', 'teacher', 'disciple', 'adversary', 'servant', 'companion', 'friend', 'ruler', 'subject', 'witness']
  if (valid.includes(r as RelationshipType)) return r as RelationshipType
  return 'companion'
}

function toRelationshipGroup(type: RelationshipType): RelationshipGroup {
  if (['parent', 'child', 'spouse', 'sibling'].includes(type)) return 'family'
  if (['adversary'].includes(type)) return 'adversaries'
  if (['teacher', 'disciple', 'companion', 'friend', 'ruler', 'servant', 'subject', 'witness'].includes(type)) return 'allies'
  return 'other'
}

export async function getCharacters(opts?: {
  search?: string
  era?: string
  limit?: number
  offset?: number
}): Promise<CharacterSummary[]> {
  const where: Record<string, unknown> = {}
  if (opts?.era) where.era = opts.era
  if (opts?.search) {
    where.OR = [
      { name: { contains: opts.search } },
      { bioBrief: { contains: opts.search } },
    ]
  }

  const characters = await prisma.character.findMany({
    where,
    orderBy: { name: 'asc' },
    take: opts?.limit ?? 100,
    skip: opts?.offset ?? 0,
    select: {
      id: true, name: true, bioBrief: true, era: true,
      gender: true, isNamed: true, socialStatus: true,
    },
  })

  return characters.map((c) => ({
    id: c.id,
    name: c.name,
    bioBrief: c.bioBrief ?? '',
    era: mapEra(c.era),
    testament: isOT(c.era) ? 'ot' as const : 'nt' as const,
    roleType: (c.isNamed ? 'named' : 'unnamed-notable') as RoleType,
    socialStatus: mapSocialStatus(c.socialStatus),
  }))
}

function isOT(era: string | null): boolean {
  const otEras = ['patriarchal', 'patriarchs', 'exodus', 'judges', 'united-monarchy', 'united monarchy', 'divided-monarchy', 'divided monarchy', 'exile', 'post-exile']
  return otEras.includes(era?.toLowerCase() ?? '')
}

export async function getCharacterProfile(id: string): Promise<CharacterProfile | null> {
  const char = await prisma.character.findUnique({ where: { id } })
  if (!char) return null

  const [appearances, relationships, themeLinks] = await Promise.all([
    getCharacterAppearances(id),
    getCharacterRelationships(id),
    getConnectedThemes(id),
  ])

  return {
    id: char.id,
    name: char.name,
    bio: char.bioFull ?? char.bioBrief ?? '',
    modernBridge: char.modernParallel ?? '',
    faithJourney: char.faithJourney
      ? { text: char.faithJourney, sourceTier: toSourceTier(char.sourceTier) }
      : undefined,
    era: mapEra(char.era),
    testament: isOT(char.era) ? 'ot' as const : 'nt' as const,
    roleType: (char.isNamed ? 'named' : 'unnamed-notable') as RoleType,
    socialStatus: mapSocialStatus(char.socialStatus),
    appearances,
    relationships,
    connectedThemes: themeLinks,
  }
}

async function getCharacterAppearances(characterId: string): Promise<CharacterAppearance[]> {
  const rows = await prisma.characterAppearance.findMany({
    where: { characterId },
    orderBy: [{ bookId: 'asc' }, { chapter: 'asc' }, { verseStart: 'asc' }],
    include: { book: { select: { name: true } } },
  })

  return rows.map((r) => {
    const bookName = BOOK_NAMES[r.bookId] ?? r.bookId
    const verseEnd = r.verseEnd ? `-${r.verseEnd}` : ''
    return {
      id: String(r.id),
      bookId: r.bookId,
      chapter: r.chapter,
      passageRef: `${bookName} ${r.chapter}:${r.verseStart}${verseEnd}`,
      passageTitle: r.narrativeNote ?? `${bookName} ${r.chapter}`,
      role: r.role as SceneRole,
      emotionalState: r.emotionalState ?? '',
      stakes: r.stakes ?? '',
      modernParallel: r.modernParallel ?? '',
      sourceTier: toSourceTier(r.sourceTier),
    }
  })
}

async function getCharacterRelationships(characterId: string): Promise<CharacterRelationship[]> {
  const rows = await prisma.characterRelationship.findMany({
    where: {
      OR: [{ characterA: characterId }, { characterB: characterId }],
    },
    include: {
      charA: { select: { name: true } },
      charB: { select: { name: true } },
    },
  })

  return rows.map((r) => {
    const isA = r.characterA === characterId
    const otherId = isA ? r.characterB : r.characterA
    const otherName = isA ? r.charB.name : r.charA.name
    const relType = mapRelationshipType(r.relationship)

    return {
      characterId: otherId,
      characterName: otherName,
      type: relType,
      group: toRelationshipGroup(relType),
    }
  })
}

async function getConnectedThemes(characterId: string): Promise<ConnectedTheme[]> {
  // Find themes connected through passages where this character appears
  const appearances = await prisma.characterAppearance.findMany({
    where: { characterId },
    select: { bookId: true, chapter: true, verseStart: true, verseEnd: true },
    take: 20,
  })

  if (appearances.length === 0) return []

  const themeMap = new Map<string, { name: string; annotation: string }>()

  for (const app of appearances) {
    const themes = await prisma.passageTheme.findMany({
      where: {
        bookId: app.bookId,
        chapter: app.chapter,
        verseStart: { lte: app.verseEnd ?? app.verseStart },
        OR: [{ verseEnd: { gte: app.verseStart } }, { verseEnd: null }],
      },
      include: { theme: { select: { name: true } } },
      take: 5,
    })

    for (const t of themes) {
      if (!themeMap.has(t.themeId)) {
        themeMap.set(t.themeId, { name: t.theme.name, annotation: t.contextNote ?? '' })
      }
    }
  }

  return Array.from(themeMap.entries()).slice(0, 10).map(([id, val]) => ({
    themeId: id,
    name: val.name,
    annotation: val.annotation,
  }))
}

export async function getCharacterEras(): Promise<string[]> {
  const rows = await prisma.character.findMany({
    distinct: ['era'],
    select: { era: true },
    orderBy: { era: 'asc' },
  })
  return rows.map((r) => r.era ?? '').filter(Boolean)
}
