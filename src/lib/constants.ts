import type { SourceTier } from '@/components/reader/types'

/** Book ID → display name */
export const BOOK_NAMES: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
  JOS: 'Joshua', JDG: 'Judges', RUT: 'Ruth', '1SA': '1 Samuel', '2SA': '2 Samuel',
  '1KI': '1 Kings', '2KI': '2 Kings', '1CH': '1 Chronicles', '2CH': '2 Chronicles',
  EZR: 'Ezra', NEH: 'Nehemiah', EST: 'Esther', JOB: 'Job', PSA: 'Psalms',
  PRO: 'Proverbs', ECC: 'Ecclesiastes', SNG: 'Song of Solomon', ISA: 'Isaiah',
  JER: 'Jeremiah', LAM: 'Lamentations', EZK: 'Ezekiel', DAN: 'Daniel',
  HOS: 'Hosea', JOL: 'Joel', AMO: 'Amos', OBA: 'Obadiah', JON: 'Jonah',
  MIC: 'Micah', NAM: 'Nahum', HAB: 'Habakkuk', ZEP: 'Zephaniah', HAG: 'Haggai',
  ZEC: 'Zechariah', MAL: 'Malachi', MAT: 'Matthew', MRK: 'Mark', LUK: 'Luke',
  JHN: 'John', ACT: 'Acts', ROM: 'Romans', '1CO': '1 Corinthians', '2CO': '2 Corinthians',
  GAL: 'Galatians', EPH: 'Ephesians', PHP: 'Philippians', COL: 'Colossians',
  '1TH': '1 Thessalonians', '2TH': '2 Thessalonians', '1TI': '1 Timothy', '2TI': '2 Timothy',
  TIT: 'Titus', PHM: 'Philemon', HEB: 'Hebrews', JAS: 'James', '1PE': '1 Peter',
  '2PE': '2 Peter', '1JN': '1 John', '2JN': '2 John', '3JN': '3 John', JUD: 'Jude',
  REV: 'Revelation',
}

/** Book ID → number of chapters */
export const BOOK_CHAPTERS: Record<string, number> = {
  GEN: 50, EXO: 40, LEV: 27, NUM: 36, DEU: 34, JOS: 24, JDG: 21, RUT: 4,
  '1SA': 31, '2SA': 24, '1KI': 22, '2KI': 25, '1CH': 29, '2CH': 36,
  EZR: 10, NEH: 13, EST: 10, JOB: 42, PSA: 150, PRO: 31, ECC: 12, SNG: 8,
  ISA: 66, JER: 52, LAM: 5, EZK: 48, DAN: 12, HOS: 14, JOL: 3, AMO: 9,
  OBA: 1, JON: 4, MIC: 7, NAM: 3, HAB: 3, ZEP: 3, HAG: 2, ZEC: 14, MAL: 4,
  MAT: 28, MRK: 16, LUK: 24, JHN: 21, ACT: 28, ROM: 16, '1CO': 16, '2CO': 13,
  GAL: 6, EPH: 6, PHP: 4, COL: 4, '1TH': 5, '2TH': 3, '1TI': 6, '2TI': 4,
  TIT: 3, PHM: 1, HEB: 13, JAS: 5, '1PE': 5, '2PE': 3, '1JN': 5, '2JN': 1,
  '3JN': 1, JUD: 1, REV: 22,
}

/** Canonical book order */
export const BOOK_ORDER = Object.keys(BOOK_NAMES)

/** DB source_tier string → UI SourceTier number */
export function toSourceTier(dbValue: string): SourceTier {
  switch (dbValue) {
    case 'canon':
    case 'scripture':
      return 1
    case 'scholarship':
      return 2
    case 'historical':
      return 3
    case 'ai_assisted':
      return 4
    case 'conjecture':
    case 'inferred':
      return 5
    default:
      return 4
  }
}

/** Commentary sources shown by default in the drawer */
export const CURATED_COMMENTARY_SOURCES = new Set([
  'matthew-henry',
  'john-gill',
  'jamieson-fausset-brown',
  'keil-delitzsch',
  'tyndale',
])

/** Strong's numbers to skip (high-frequency function words) */
export const STRONGS_SKIP_LIST = new Set([
  'G3588', // ho — the (article)
  'G2532', // kai — and/also
  'G1161', // de — but/and
  'G1722', // en — in
  'G4771', // sy — you
  'G1510', // eimi — I am (borderline, but extremely common)
  'G3165', // me — me
  'G1519', // eis — into
  'G3756', // ou — not
  'G846',  // autos — he/she/it
  'G3778', // houtos — this
  'G1473', // ego — I
  'G5100', // tis — someone/something
  'G4314', // pros — toward
  'G3739', // hos — who/which
  'G1063', // gar — for
  'H5921', // al — upon
  'H3605', // kol — all/every
  'H3808', // lo — not
  'H3588', // ki — that/because
  'H1961', // hayah — to be
  'H6213', // asah — to do/make
  'H1931', // hu — he/she/it
  'H5414', // natan — to give
  'H6440', // panim — face/before
  'H3117', // yom — day
  'H853',  // et — (object marker)
  'H834',  // asher — who/which/that
  'H413',  // el — to/toward
  'H5002', // neum — declares
  'H559',  // amar — to say
])
