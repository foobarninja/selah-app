// Daily Bread section — TypeScript interfaces

/** Audience level for devotional content */
export type AudienceLevel = 'young-children' | 'family' | 'teens' | 'adults'

/** Seasonal set */
export type SeasonalSet = 'advent' | 'lent' | 'easter' | 'ordinary'

/** Mood tile emotional category (for visual grouping) */
export type MoodCategory = 'weight' | 'warmth' | 'stillness'

/** Landing page tab */
export type DailyBreadTab = 'tonight' | 'browse' | 'history'

// ── Data interfaces ──

export interface MoodTile { id: string; label: string; category: MoodCategory }
export interface SeasonalCard { isActive: boolean; season: string; week: number; message: string; devotionalId: string }
export interface GoingDeeper { narrativeUnitRef: string; prompt: string }

export interface Devotional {
  id: string; title: string; bookId: string; chapter: number; passageRef: string; audienceLevel: AudienceLevel
  estimatedMinutes: number; seasonalSet: SeasonalSet; moodMatch: string
  passage: string; contextBrief: string; modernMoment: string
  conversationStarters: string[]; goingDeeper: GoingDeeper
  seriesId?: string | null
  seriesMeta?: { seriesOrder: number; seriesTitle: string; partCount: number } | null
}

export interface DevotionalSummary {
  id: string; title: string; passageRef: string; audienceLevel: AudienceLevel
  estimatedMinutes: number; seasonalSet: SeasonalSet; situation: string
}

export interface DevotionalHistory {
  id: string; date: string; devotionalId: string; title: string
  rating: number; familyNotes: string; audienceLevel: AudienceLevel
}

export interface CompletionState { devotionalId: string; familyNotes: string; rating: number | null }
export interface DevotionalBook { id: string; name: string }

export interface SeriesPart {
  id: string
  seriesOrder: number
  title: string
  passageRef: string
  estimatedMinutes: number
  completedAt: string | null
}

export interface SeriesSummary {
  id: string
  title: string
  description: string
  audience: string
  season: string | null
  partCount: number
  totalEstimatedMinutes: number
  tags: string[]
  bridgePart: {
    seriesOrder: number
    title: string
    passageRef: string
    devotionalId: string
  } | null
}

export interface SeriesDetail extends SeriesSummary {
  parts: SeriesPart[]
}

// ── Component props ──

export interface DailyBreadProps {
  moodTiles: MoodTile[]
  seasonalCard: SeasonalCard
  currentAudienceLevel: AudienceLevel
  selectedDevotional?: Devotional
  history: DevotionalHistory[]
  browseDevotionals: DevotionalSummary[]
  devotionalBooks?: DevotionalBook[]
  activeTab: DailyBreadTab
  completionState: CompletionState | null

  onSelectMood?: (moodId: string) => void
  onBeginSeasonal?: (devotionalId: string) => void
  onChangeTab?: (tab: DailyBreadTab) => void
  onOverrideAudience?: (level: AudienceLevel) => void
  onNavigatePassage?: (bookId: string, chapter: number) => void
  onComplete?: (notes: string, rating: number | null) => void
  onOpenDevotional?: (devotionalId: string) => void
  onDismissCloseOut?: () => void
}
