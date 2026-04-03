// Home section — TypeScript interfaces

/** Entity types that appear in history and search */
export type EntityType = 'passage' | 'character' | 'theme' | 'strongs' | 'sermon'

/** Journal entry note type */
export type NoteType = 'annotation' | 'reflection' | 'question' | 'sermon_idea' | 'insight' | 'prayer'

/** Daily Bread completion status */
export type DailyBreadStatus = 'available' | 'completed' | 'hidden'

/** Audience level for Daily Bread */
export type AudienceLevel = 'young-children' | 'family' | 'teens' | 'adults'

// ── Search types ──

export interface PassageResult { id: string; ref: string; title: string; preview: string }
export interface CharacterResult { id: string; name: string; bioBrief: string }
export interface ThemeResult { id: string; name: string; modernFraming: string }
export interface StrongsResult { id: string; code: string; transliteration: string; brief: string }

export interface SearchResults {
  passages: PassageResult[]
  characters: CharacterResult[]
  themes: ThemeResult[]
  strongs: StrongsResult[]
}

// ── Daily Bread ──

export interface DailyBread {
  status: DailyBreadStatus
  title: string
  audienceLevel: AudienceLevel
  estimatedMinutes: number
  seasonalSet: string
  passageRef: string
  completedMessage: string | null
}

// ── History ──

export interface HistoryItem { id: string; type: EntityType; title: string; context: string; timeAgo: string }

// ── Recent notes ──

export interface NoteAnchor { type: 'verse' | 'character' | 'theme'; label: string }

export interface RecentNote { id: string; noteType: NoteType; snippet: string; anchors: NoteAnchor[]; timeAgo: string }

// ── Component props ──

export interface HomeProps {
  searchResults: SearchResults
  searchQuery: string
  dailyBread: DailyBread
  history: HistoryItem[]
  recentNotes: RecentNote[]
  welcomeMessage: string
  isFirstLaunch: boolean

  onSearch?: (query: string) => void
  onNavigatePassage?: (passageRef: string) => void
  onOpenCharacter?: (characterId: string) => void
  onOpenTheme?: (themeId: string) => void
  onOpenStrongs?: (code: string) => void
  onBeginDailyBread?: () => void
  onRevisitDailyBread?: () => void
  onDismissDailyBread?: () => void
  onOpenHistoryItem?: (id: string, type: EntityType) => void
  onOpenNote?: (noteId: string) => void
}
