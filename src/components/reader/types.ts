// Reader section — TypeScript interfaces

/** Source tier in the canon-first priority stack (1-5) */
export type SourceTier = 1 | 2 | 3 | 4 | 5

/** Character role within a scene */
export type CharacterRole = 'protagonist' | 'deuteragonist' | 'witness' | 'bystander' | 'referenced figure'

/** Lens category for tag pills */
export type LensType = 'relational' | 'conceptual' | 'climate'

/** Journal entry classification */
export type NoteType = 'annotation' | 'reflection' | 'question' | 'sermon_idea' | 'insight' | 'prayer'

/** Resurfacing match channel */
export type MatchChannel = 'direct-anchor' | 'theme-overlap' | 'character-overlap' | 'cross-reference-chain' | 'full-text-resonance'

/** Commentary display tier (controls UI visibility, not trust level) */
export type CommentaryDisplayTier = 'curated' | 'extended'

// ── Data interfaces ──

export interface Passage {
  id: string
  book: string
  chapter: number
  verseStart: number
  verseEnd: number
  title: string
  narrativeUnitId: string
}

export interface StrongsAnnotation {
  word: string
  code: string
  transliteration: string
  brief: string
}

export interface Footnote {
  id: string
  marker: string
  text: string
}

export interface ParallelText {
  translation: string
  text: string
}

export interface Verse {
  number: number
  text: string
  wordsOfJesus: boolean
  wordsOfJesusRange?: { start: number; end: number }
  strongs: StrongsAnnotation[]
  footnotes: Footnote[]
  parallelTexts: ParallelText[]
}

export interface Translation {
  id: string
  name: string
  abbreviation: string
}

export interface CharacterAppearance {
  characterId: string
  name: string
  role: CharacterRole
  emotion: string
  motivation: string
  stakes: string
  modernParallel: string
  sourceTier: SourceTier
}

export interface ThemeAnnotation {
  themeId: string
  name: string
  annotation: string
  sourceTier: SourceTier
}

export interface ClimateContext {
  id: string
  title: string
  content: string
  sourceTier: SourceTier
}

export interface CrossReference {
  id: string
  targetPassage: string
  snippet: string
  relevanceScore: number
  sourceTier: SourceTier
}

export interface Commentary {
  id: string
  author: string
  excerpt: string
  verseRange: string
  displayTier: CommentaryDisplayTier
  sourceTier: SourceTier
}

export interface JournalAnchor {
  type: 'verse' | 'character' | 'theme'
  ref: string
}

export interface ResurfacedEntry {
  id: string
  noteType: NoteType
  content: string
  anchors: JournalAnchor[]
  tags: string[]
  createdAt: string
  matchChannel: MatchChannel
  matchScore: number
}

export interface LensTag {
  label: string
  lens: LensType
  entityId: string
}

// ── Component props ──

export interface ReaderProps {
  passage: Passage
  verses: Verse[]
  activeVerseNumber?: number

  activeTranslation: string
  availableTranslations: Translation[]
  parallelTranslations: string[]

  sceneCast: CharacterAppearance[]
  themes: ThemeAnnotation[]
  climateContexts: ClimateContext[]
  crossReferences: CrossReference[]
  commentaries: Commentary[]
  resurfacedEntries: ResurfacedEntry[]
  lensTags: LensTag[]

  /** Navigate to a different passage by narrative unit ID or passage reference */
  onNavigatePassage?: (passageRef: string) => void
  /** Move to the previous narrative unit in the current book */
  onPreviousUnit?: () => void
  /** Move to the next narrative unit in the current book */
  onNextUnit?: () => void
  /** Change the active translation */
  onChangeTranslation?: (translationId: string) => void
  /** Toggle a parallel translation on or off */
  onToggleParallelTranslation?: (translationId: string) => void
  /** Select a verse (highlights it, anchors context) */
  onSelectVerse?: (verseNumber: number) => void
  /** Open a character profile in the context drawer (deep dive) */
  onOpenCharacterProfile?: (characterId: string) => void
  /** Open a theme detail in the context drawer (deep dive) */
  onOpenThemeDetail?: (themeId: string) => void
  /** Navigate to word study for a Strong's number */
  onOpenWordStudy?: (strongsCode: string) => void
  /** Navigate to a cross-reference passage */
  onFollowCrossReference?: (crossRefId: string) => void
  /** Open a resurfaced journal entry */
  onOpenJournalEntry?: (entryId: string) => void
}
