// Word Study section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'

/** Original language */
export type Language = 'greek' | 'hebrew'

// ── Data interfaces ──

export interface ArrivedFrom {
  passageRef: string
  passageTitle: string
}

export interface StrongsEntry {
  strongsNumber: string
  language: Language
  originalScript: string
  transliteration: string
  pronunciation: string
  shortGloss: string
  fullDefinition: string
  morphology: string
  totalOccurrences: number
}

export interface TranslationCluster {
  rendering: string
  count: number
  translations: string[]
  note?: string
}

export interface ConcordanceEntry {
  id: string
  verseRef: string
  verseText: string
  rendering: string
  curatedNote?: string
  sourceTier?: SourceTier
}

export interface FrequencySegment {
  book: string
  count: number
}

export interface RelatedWord {
  strongsNumber: string
  originalScript: string
  transliteration: string
  shortGloss: string
}

export interface NarrativeConnection {
  narrativeUnitRef: string
  title: string
  themes: string[]
}

// ── Component props ──

export interface WordStudyProps {
  arrivedFrom?: ArrivedFrom
  entry: StrongsEntry
  translationClusters: TranslationCluster[]
  curatedOccurrences: ConcordanceEntry[]
  frequencySegments: FrequencySegment[]
  relatedWords: RelatedWord[]
  narrativeConnections: NarrativeConnection[]
  searchQuery: string

  onBack?: () => void
  onSearch?: (query: string) => void
  onNavigatePassage?: (passageRef: string) => void
  onOpenEntry?: (strongsNumber: string) => void
  onOpenNarrativeUnit?: (narrativeUnitRef: string) => void
}
