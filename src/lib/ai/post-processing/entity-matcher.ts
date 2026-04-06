import { prisma } from '@/lib/db'

/** Lazy-loaded, process-lifetime caches */
let characterNames: Map<string, string> | null = null  // lowercase name → id
let themeNames: Map<string, string> | null = null       // lowercase name → id

export async function getCharacterNames(): Promise<Map<string, string>> {
  if (!characterNames) {
    const chars = await prisma.character.findMany({
      select: { id: true, name: true },
    })
    characterNames = new Map()
    for (const c of chars) {
      characterNames.set(c.name.toLowerCase(), c.id)
    }
  }
  return characterNames
}

export async function getThemeNames(): Promise<Map<string, string>> {
  if (!themeNames) {
    const themes = await prisma.theme.findMany({
      select: { id: true, name: true },
    })
    themeNames = new Map()
    for (const t of themes) {
      themeNames.set(t.name.toLowerCase(), t.id)
    }
  }
  return themeNames
}

export interface EntityMatch {
  text: string
  entityId: string
  type: 'character' | 'theme'
  startIndex: number
  endIndex: number
}

/**
 * Find character and theme name mentions in text.
 * Uses case-insensitive whole-word matching against the cached name maps.
 */
export async function findEntityMentions(text: string): Promise<EntityMatch[]> {
  const [charMap, themeMap] = await Promise.all([getCharacterNames(), getThemeNames()])
  const matches: EntityMatch[] = []
  const lowerText = text.toLowerCase()

  for (const [name, id] of charMap) {
    // Skip very short names that cause false positives (e.g., "Er", "Og")
    if (name.length < 3) continue
    let searchFrom = 0
    while (true) {
      const idx = lowerText.indexOf(name, searchFrom)
      if (idx === -1) break
      // Check word boundaries
      const before = idx === 0 || /\W/.test(text[idx - 1])
      const after = idx + name.length >= text.length || /\W/.test(text[idx + name.length])
      if (before && after) {
        matches.push({
          text: text.slice(idx, idx + name.length),
          entityId: id,
          type: 'character',
          startIndex: idx,
          endIndex: idx + name.length,
        })
      }
      searchFrom = idx + name.length
    }
  }

  for (const [name, id] of themeMap) {
    if (name.length < 4) continue
    let searchFrom = 0
    while (true) {
      const idx = lowerText.indexOf(name, searchFrom)
      if (idx === -1) break
      const before = idx === 0 || /\W/.test(text[idx - 1])
      const after = idx + name.length >= text.length || /\W/.test(text[idx + name.length])
      if (before && after) {
        matches.push({
          text: text.slice(idx, idx + name.length),
          entityId: id,
          type: 'theme',
          startIndex: idx,
          endIndex: idx + name.length,
        })
      }
      searchFrom = idx + name.length
    }
  }

  // Deduplicate overlapping matches — keep the longer match
  matches.sort((a, b) => a.startIndex - b.startIndex)
  const deduped: EntityMatch[] = []
  for (const match of matches) {
    const prev = deduped[deduped.length - 1]
    if (prev && match.startIndex < prev.endIndex) {
      // Overlapping: keep the longer one
      if (match.endIndex - match.startIndex > prev.endIndex - prev.startIndex) {
        deduped[deduped.length - 1] = match
      }
    } else {
      deduped.push(match)
    }
  }

  return deduped
}
