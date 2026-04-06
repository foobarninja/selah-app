import type {
  GroundingRequest,
  ReaderContext,
  CharacterContext,
  ThemeContext,
  WordStudyContext,
  StudyBuilderContext,
} from '../types'
import { extractReaderContext } from './extractors/reader'
import { extractCharacterContext } from './extractors/character'
import { extractThemeContext } from './extractors/theme'
import { extractWordStudyContext } from './extractors/word-study'
import { extractStudyBuilderContext } from './extractors/study-builder'
import { getCharacterNames, getThemeNames } from '../post-processing/entity-matcher'

const MAX_CONTEXT_CHARS = 24000 // ~8,000 tokens — full chapter text + enrichments

export async function buildGroundingContext(grounding: GroundingRequest): Promise<string> {
  // 1. Primary context from current page
  let primary: string
  switch (grounding.page) {
    case 'reader':
      primary = await extractReaderContext(grounding.context as ReaderContext)
      break
    case 'character':
      primary = await extractCharacterContext(grounding.context as CharacterContext)
      break
    case 'theme':
      primary = await extractThemeContext(grounding.context as ThemeContext)
      break
    case 'word-study':
      primary = await extractWordStudyContext(grounding.context as WordStudyContext)
      break
    case 'study-builder':
      primary = await extractStudyBuilderContext(grounding.context as StudyBuilderContext)
      break
    default:
      primary = ''
  }

  // 2. Query-triggered enrichment (if budget allows)
  const enrichments: string[] = []
  const remainingBudget = MAX_CONTEXT_CHARS - primary.length

  if (remainingBudget > 500) {
    const queryLower = grounding.query.toLowerCase()

    if (grounding.page !== 'character') {
      const charNames = await getCharacterNames()
      for (const [name, id] of charNames) {
        if (name.length >= 3 && queryLower.includes(name)) {
          const ctx = await extractCharacterContext({ characterId: id })
          enrichments.push(ctx)
          break
        }
      }
    }

    if (grounding.page !== 'theme') {
      const themeNames = await getThemeNames()
      for (const [name, id] of themeNames) {
        if (name.length >= 4 && queryLower.includes(name)) {
          const ctx = await extractThemeContext({ themeId: id })
          enrichments.push(ctx)
          break
        }
      }
    }
  }

  // 3. Assemble within token budget
  let result = primary
  for (const enrichment of enrichments) {
    if (result.length + enrichment.length > MAX_CONTEXT_CHARS) break
    result += '\n\n---\n\n' + enrichment
  }

  return result
}
