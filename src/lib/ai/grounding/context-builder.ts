import type {
  GroundingRequest,
  ReaderContext,
  CharacterContext,
  ThemeContext,
  WordStudyContext,
  StudyBuilderContext,
  ContextSection,
  ContextToggles,
} from '../types'
import { extractReaderContext } from './extractors/reader'
import { extractCharacterContext } from './extractors/character'
import { extractThemeContext } from './extractors/theme'
import { extractWordStudyContext } from './extractors/word-study'
import { extractStudyBuilderContext } from './extractors/study-builder'
import { extractCollectionContext } from './extractors/collections'
import { getCharacterNames, getThemeNames } from '../post-processing/entity-matcher'

const MAX_CONTEXT_CHARS = 90000

export async function buildGroundingContext(
  grounding: GroundingRequest,
  userId: string,
  toggles?: ContextToggles
): Promise<{ sections: ContextSection[]; assembled: string }> {

  // 1. Get sections from current page
  let sections: ContextSection[]

  switch (grounding.page) {
    case 'reader': {
      sections = await extractReaderContext(grounding.context as ReaderContext, userId)
      // Also fetch collection items for this page
      const collectionSection = await extractCollectionContext(grounding.context as ReaderContext)
      if (collectionSection) sections.push(collectionSection)
      break
    }
    case 'character': {
      const content = await extractCharacterContext(grounding.context as CharacterContext)
      sections = content ? [{ id: 'character', label: 'Character Profile', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'theme': {
      const content = await extractThemeContext(grounding.context as ThemeContext)
      sections = content ? [{ id: 'theme', label: 'Theme Detail', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'word-study': {
      const content = await extractWordStudyContext(grounding.context as WordStudyContext)
      sections = content ? [{ id: 'word-study', label: 'Word Study', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    case 'study-builder': {
      const content = await extractStudyBuilderContext(grounding.context as StudyBuilderContext)
      sections = content ? [{ id: 'study-builder', label: 'Study Project', content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true }] : []
      break
    }
    default:
      sections = []
  }

  // 2. Query-triggered enrichment (same logic as before, but as sections)
  const currentLength = sections.reduce((sum, s) => sum + s.content.length, 0)
  const remainingBudget = MAX_CONTEXT_CHARS - currentLength

  if (remainingBudget > 500) {
    const queryLower = grounding.query.toLowerCase()

    if (grounding.page !== 'character') {
      const charNames = await getCharacterNames()
      for (const [name, id] of charNames) {
        if (name.length >= 3 && queryLower.includes(name)) {
          const content = await extractCharacterContext({ characterId: id })
          if (content) sections.push({ id: `enrichment-char-${id}`, label: `Character: ${name}`, content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
          break
        }
      }
    }

    if (grounding.page !== 'theme') {
      const themeNames = await getThemeNames()
      for (const [name, id] of themeNames) {
        if (name.length >= 4 && queryLower.includes(name)) {
          const content = await extractThemeContext({ themeId: id })
          if (content) sections.push({ id: `enrichment-theme-${id}`, label: `Theme: ${name}`, content, estimatedTokens: Math.ceil(content.length / 4), defaultEnabled: true })
          break
        }
      }
    }
  }

  // 3. Apply toggles — if user explicitly toggled a section, respect it
  const enabledSections = sections.filter((s) => {
    if (toggles && s.id in toggles) return toggles[s.id]
    return s.defaultEnabled
  })

  // 4. Assemble within budget
  let assembled = ''
  for (const section of enabledSections) {
    if (assembled.length + section.content.length > MAX_CONTEXT_CHARS) break
    assembled += (assembled ? '\n\n---\n\n' : '') + section.content
  }

  return { sections, assembled }
}
