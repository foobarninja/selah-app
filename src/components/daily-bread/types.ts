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
