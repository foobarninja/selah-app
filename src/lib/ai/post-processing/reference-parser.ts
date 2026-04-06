export interface ScriptureRef {
  text: string
  bookId: string
  chapter: number
  verseStart?: number
  verseEnd?: number
  startIndex: number
  endIndex: number
}

/**
 * Map of common book name variants to canonical book IDs.
 * Uses the same IDs as the Selah database.
 */
const BOOK_ALIASES: Record<string, string> = {
  'genesis': 'GEN', 'gen': 'GEN',
  'exodus': 'EXO', 'exod': 'EXO', 'exo': 'EXO',
  'leviticus': 'LEV', 'lev': 'LEV',
  'numbers': 'NUM', 'num': 'NUM',
  'deuteronomy': 'DEU', 'deut': 'DEU', 'deu': 'DEU',
  'joshua': 'JOS', 'josh': 'JOS', 'jos': 'JOS',
  'judges': 'JDG', 'judg': 'JDG', 'jdg': 'JDG',
  'ruth': 'RUT', 'rut': 'RUT',
  '1 samuel': '1SA', '1 sam': '1SA', '1sa': '1SA',
  '2 samuel': '2SA', '2 sam': '2SA', '2sa': '2SA',
  '1 kings': '1KI', '1 kgs': '1KI', '1ki': '1KI',
  '2 kings': '2KI', '2 kgs': '2KI', '2ki': '2KI',
  '1 chronicles': '1CH', '1 chr': '1CH', '1ch': '1CH',
  '2 chronicles': '2CH', '2 chr': '2CH', '2ch': '2CH',
  'ezra': 'EZR', 'ezr': 'EZR',
  'nehemiah': 'NEH', 'neh': 'NEH',
  'esther': 'EST', 'est': 'EST',
  'job': 'JOB',
  'psalms': 'PSA', 'psalm': 'PSA', 'psa': 'PSA', 'ps': 'PSA',
  'proverbs': 'PRO', 'prov': 'PRO', 'pro': 'PRO',
  'ecclesiastes': 'ECC', 'eccl': 'ECC', 'ecc': 'ECC',
  'song of solomon': 'SNG', 'song of songs': 'SNG', 'sng': 'SNG', 'sos': 'SNG',
  'isaiah': 'ISA', 'isa': 'ISA',
  'jeremiah': 'JER', 'jer': 'JER',
  'lamentations': 'LAM', 'lam': 'LAM',
  'ezekiel': 'EZK', 'ezek': 'EZK', 'ezk': 'EZK',
  'daniel': 'DAN', 'dan': 'DAN',
  'hosea': 'HOS', 'hos': 'HOS',
  'joel': 'JOL', 'jol': 'JOL',
  'amos': 'AMO', 'amo': 'AMO',
  'obadiah': 'OBA', 'obad': 'OBA', 'oba': 'OBA',
  'jonah': 'JON', 'jon': 'JON',
  'micah': 'MIC', 'mic': 'MIC',
  'nahum': 'NAM', 'nah': 'NAM', 'nam': 'NAM',
  'habakkuk': 'HAB', 'hab': 'HAB',
  'zephaniah': 'ZEP', 'zeph': 'ZEP', 'zep': 'ZEP',
  'haggai': 'HAG', 'hag': 'HAG',
  'zechariah': 'ZEC', 'zech': 'ZEC', 'zec': 'ZEC',
  'malachi': 'MAL', 'mal': 'MAL',
  'matthew': 'MAT', 'matt': 'MAT', 'mat': 'MAT',
  'mark': 'MRK', 'mrk': 'MRK',
  'luke': 'LUK', 'luk': 'LUK',
  'john': 'JHN', 'jhn': 'JHN',
  'acts': 'ACT', 'act': 'ACT',
  'romans': 'ROM', 'rom': 'ROM',
  '1 corinthians': '1CO', '1 cor': '1CO', '1co': '1CO',
  '2 corinthians': '2CO', '2 cor': '2CO', '2co': '2CO',
  'galatians': 'GAL', 'gal': 'GAL',
  'ephesians': 'EPH', 'eph': 'EPH',
  'philippians': 'PHP', 'phil': 'PHP', 'php': 'PHP',
  'colossians': 'COL', 'col': 'COL',
  '1 thessalonians': '1TH', '1 thess': '1TH', '1th': '1TH',
  '2 thessalonians': '2TH', '2 thess': '2TH', '2th': '2TH',
  '1 timothy': '1TI', '1 tim': '1TI', '1ti': '1TI',
  '2 timothy': '2TI', '2 tim': '2TI', '2ti': '2TI',
  'titus': 'TIT', 'tit': 'TIT',
  'philemon': 'PHM', 'phlm': 'PHM', 'phm': 'PHM',
  'hebrews': 'HEB', 'heb': 'HEB',
  'james': 'JAS', 'jas': 'JAS',
  '1 peter': '1PE', '1 pet': '1PE', '1pe': '1PE',
  '2 peter': '2PE', '2 pet': '2PE', '2pe': '2PE',
  '1 john': '1JN', '1jn': '1JN',
  '2 john': '2JN', '2jn': '2JN',
  '3 john': '3JN', '3jn': '3JN',
  'jude': 'JUD', 'jud': 'JUD',
  'revelation': 'REV', 'rev': 'REV',
}

/**
 * Regex to match Scripture references like:
 * "John 3:16", "1 Corinthians 13:4-7", "Genesis 1:1", "Ps 23:1"
 */
const SCRIPTURE_REGEX = /\b((?:[123]\s)?[A-Z][a-z]+(?:\s(?:of\s)?[A-Z][a-z]+)?)\s+(\d{1,3}):(\d{1,3})(?:\s*[-–]\s*(\d{1,3}))?\b/g

/**
 * Parse Scripture references from AI response text.
 */
export function parseScriptureRefs(text: string): ScriptureRef[] {
  const refs: ScriptureRef[] = []
  let match: RegExpExecArray | null

  // Reset regex state
  SCRIPTURE_REGEX.lastIndex = 0

  while ((match = SCRIPTURE_REGEX.exec(text)) !== null) {
    const bookName = match[1].toLowerCase()
    const bookId = BOOK_ALIASES[bookName]
    if (!bookId) continue

    const chapter = parseInt(match[2], 10)
    const verseStart = parseInt(match[3], 10)
    const verseEnd = match[4] ? parseInt(match[4], 10) : undefined

    refs.push({
      text: match[0],
      bookId,
      chapter,
      verseStart,
      verseEnd,
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  return refs
}

/**
 * Match Strong's number references like H1234, G5678
 */
export interface StrongsRef {
  text: string
  number: string
  startIndex: number
  endIndex: number
}

const STRONGS_REGEX = /\b([HG]\d{1,5})\b/g

export function parseStrongsRefs(text: string): StrongsRef[] {
  const refs: StrongsRef[] = []
  let match: RegExpExecArray | null

  STRONGS_REGEX.lastIndex = 0

  while ((match = STRONGS_REGEX.exec(text)) !== null) {
    refs.push({
      text: match[0],
      number: match[1],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
    })
  }

  return refs
}
