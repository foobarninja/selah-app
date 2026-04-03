// Themes section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'
import type { Era } from '@/components/characters/types'

/** Top-level theme category */
export type ThemeCategory = 'virtue' | 'emotion' | 'doctrine' | 'relationship' | 'condition' | 'action' | 'attribute-of-god'

// ── Browse types ──

export interface ChildTheme {
  id: string
  name: string
}

export interface ThemeSummary {
  id: string
  name: string
  modernFraming: string
  children: ChildTheme[]
}

export interface CategoryGroup {
  id: string
  label: string
  themes: ThemeSummary[]
}

export interface ThreadPrompt {
  themeId: string
  name: string
  hook: string
  category: ThemeCategory
}

// ── Profile types ──

export interface TraceSegment {
  book: string
  count: number
}

export interface ThemePassage {
  id: string
  passageRef: string
  passageTitle: string
  annotation: string
  sourceTier: SourceTier
}

export interface ConnectedCharacter {
  characterId: string
  name: string
  annotation: string
  era: Era
}

export interface RelatedTheme {
  id: string
  name: string
}

export interface ThemeProfile {
  id: string
  name: string
  modernFraming: string
  scholarlyDefinition: string
  category: ThemeCategory
  parentThemeId: string | null
  childThemes: ChildTheme[]
  relatedThemes: RelatedTheme[]
  traceSegments: TraceSegment[]
  /** Passages grouped by era key */
  passages: Record<string, ThemePassage[]>
  connectedCharacters: ConnectedCharacter[]
}

// ── Component props ──

export interface ThemesProps {
  threadPrompt: ThreadPrompt
  categories: CategoryGroup[]
  activeFilters: string[]
  searchQuery: string
  selectedProfile?: ThemeProfile

  /** Open a theme's full profile */
  onOpenProfile?: (themeId: string) => void
  /** Navigate back from profile to browser */
  onBackToBrowser?: () => void
  /** Update search query */
  onSearch?: (query: string) => void
  /** Toggle a filter value on/off */
  onToggleFilter?: (category: string, value: string) => void
  /** Clear all active filters */
  onClearFilters?: () => void
  /** Navigate to a passage in the Reader */
  onNavigatePassage?: (passageRef: string) => void
  /** Open a character's profile */
  onOpenCharacter?: (characterId: string) => void
  /** Refresh the thread prompt with a new theme */
  onRefreshThread?: () => void
}
