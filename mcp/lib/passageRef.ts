const BOOK_ALIASES: Record<string, string> = {
  genesis: "GEN", gen: "GEN",
  exodus: "EXO", exod: "EXO", exo: "EXO",
  leviticus: "LEV", lev: "LEV",
  numbers: "NUM", num: "NUM",
  deuteronomy: "DEU", deut: "DEU", deu: "DEU",
  joshua: "JOS", josh: "JOS", jos: "JOS",
  judges: "JDG", judg: "JDG", jdg: "JDG",
  ruth: "RUT", rut: "RUT",
  "1 samuel": "1SA", "1 sam": "1SA", "1sa": "1SA", "1sam": "1SA",
  "2 samuel": "2SA", "2 sam": "2SA", "2sa": "2SA", "2sam": "2SA",
  "1 kings": "1KI", "1 kgs": "1KI", "1ki": "1KI",
  "2 kings": "2KI", "2 kgs": "2KI", "2ki": "2KI",
  "1 chronicles": "1CH", "1 chr": "1CH", "1ch": "1CH",
  "2 chronicles": "2CH", "2 chr": "2CH", "2ch": "2CH",
  ezra: "EZR", ezr: "EZR",
  nehemiah: "NEH", neh: "NEH",
  esther: "EST", est: "EST",
  job: "JOB",
  psalms: "PSA", psalm: "PSA", psa: "PSA", ps: "PSA",
  proverbs: "PRO", prov: "PRO", pro: "PRO",
  ecclesiastes: "ECC", eccl: "ECC", ecc: "ECC",
  "song of solomon": "SNG", "song of songs": "SNG", sng: "SNG", sos: "SNG",
  isaiah: "ISA", isa: "ISA",
  jeremiah: "JER", jer: "JER",
  lamentations: "LAM", lam: "LAM",
  ezekiel: "EZK", ezek: "EZK", ezk: "EZK",
  daniel: "DAN", dan: "DAN",
  hosea: "HOS", hos: "HOS",
  joel: "JOL", jol: "JOL",
  amos: "AMO", amo: "AMO",
  obadiah: "OBA", obad: "OBA", oba: "OBA",
  jonah: "JON", jon: "JON",
  micah: "MIC", mic: "MIC",
  nahum: "NAM", nah: "NAM", nam: "NAM",
  habakkuk: "HAB", hab: "HAB",
  zephaniah: "ZEP", zeph: "ZEP", zep: "ZEP",
  haggai: "HAG", hag: "HAG",
  zechariah: "ZEC", zech: "ZEC", zec: "ZEC",
  malachi: "MAL", mal: "MAL",
  matthew: "MAT", matt: "MAT", mat: "MAT",
  mark: "MRK", mrk: "MRK",
  luke: "LUK", luk: "LUK",
  john: "JHN", jhn: "JHN",
  acts: "ACT", act: "ACT",
  romans: "ROM", rom: "ROM",
  "1 corinthians": "1CO", "1 cor": "1CO", "1co": "1CO",
  "2 corinthians": "2CO", "2 cor": "2CO", "2co": "2CO",
  galatians: "GAL", gal: "GAL",
  ephesians: "EPH", eph: "EPH",
  philippians: "PHP", phil: "PHP", php: "PHP",
  colossians: "COL", col: "COL",
  "1 thessalonians": "1TH", "1 thess": "1TH", "1th": "1TH",
  "2 thessalonians": "2TH", "2 thess": "2TH", "2th": "2TH",
  "1 timothy": "1TI", "1 tim": "1TI", "1ti": "1TI",
  "2 timothy": "2TI", "2 tim": "2TI", "2ti": "2TI",
  titus: "TIT", tit: "TIT",
  philemon: "PHM", phlm: "PHM", phm: "PHM",
  hebrews: "HEB", heb: "HEB",
  james: "JAS", jas: "JAS",
  "1 peter": "1PE", "1 pet": "1PE", "1pe": "1PE",
  "2 peter": "2PE", "2 pet": "2PE", "2pe": "2PE",
  "1 john": "1JN", "1jn": "1JN",
  "2 john": "2JN", "2jn": "2JN",
  "3 john": "3JN", "3jn": "3JN",
  jude: "JUD", jud: "JUD",
  revelation: "REV", rev: "REV",
};

const CANONICAL_IDS: Set<string> = new Set(Object.values(BOOK_ALIASES));

export interface PassageCoords {
  bookId: string;
  chapter: number;
  verseStart?: number;
  verseEnd?: number;
}

export function normalizeBookId(input: string): string | null {
  const raw = input.trim();
  const upper = raw.toUpperCase();
  if (CANONICAL_IDS.has(upper)) return upper;
  const lower = raw.toLowerCase();
  return BOOK_ALIASES[lower] ?? null;
}

/**
 * Parse a single scripture reference like "Rom 8:28-30", "John 3:16", "1 Cor 13",
 * "psalms 119". Chapter is required; verse range is optional.
 */
export function parsePassageRef(ref: string): PassageCoords | null {
  const trimmed = ref.trim();
  if (!trimmed) return null;

  const match = trimmed.match(
    /^([1-3]?\s?[A-Za-z][A-Za-z\s.]*?)\s+(\d{1,3})(?::(\d{1,3})(?:\s*[-\u2013]\s*(\d{1,3}))?)?$/
  );
  if (!match) return null;

  const rawBook = match[1].replace(/\./g, "").replace(/\s+/g, " ").trim().toLowerCase();
  const bookId = normalizeBookId(rawBook);
  if (!bookId) return null;

  const chapter = parseInt(match[2], 10);
  const verseStart = match[3] ? parseInt(match[3], 10) : undefined;
  const verseEnd = match[4] ? parseInt(match[4], 10) : undefined;
  if (verseStart !== undefined && verseEnd !== undefined && verseEnd < verseStart) {
    return null;
  }
  return { bookId, chapter, verseStart, verseEnd };
}
