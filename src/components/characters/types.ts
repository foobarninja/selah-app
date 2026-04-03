// Characters section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'

/** Biblical era for filtering */
export type Era = 'patriarchal' | 'exodus' | 'judges' | 'monarchy' | 'exile' | 'life-of-christ' | 'early-church'

/** Testament */
export type Testament = 'ot' | 'nt'

/** Whether the character is named in the text */
export type RoleType = 'named' | 'unnamed-notable'

/** Social status for filtering */
export type SocialStatus = 'royalty' | 'priest' | 'outcast' | 'common' | 'military'

/** Character role within a specific scene */
export type SceneRole = 'protagonist' | 'deuteragonist' | 'witness' | 'bystander' | 'catalyst' | 'referenced figure'

/** Relationship type between two characters */
export type RelationshipType = 'parent' | 'child' | 'spouse' | 'sibling' | 'teacher' | 'disciple' | 'adversary' | 'servant' | 'companion' | 'friend' | 'ruler' | 'subject' | 'witness'

/** Relationship grouping for display */
export type RelationshipGroup = 'family' | 'allies' | 'adversaries' | 'other'

// ── Filter types ──

export interface FilterOption {
  value: string
  label: string
}

export interface Filters {
  era: FilterOption[]
  testament: FilterOption[]
  roleType: FilterOption[]
  socialStatus: FilterOption[]
}

// ── Data interfaces ──

export interface DiscoverCard {
  characterId: string
  name: string
  hook: string
  era: Era
  bioBrief: string
}

export interface CharacterSummary {
  id: string
  name: string
  bioBrief: string
  era: Era
  testament: Testament
  roleType: RoleType
  socialStatus: SocialStatus
}

export interface CharacterAppearance {
  id: string
  passageRef: string
  passageTitle: string
  role: SceneRole
  emotionalState: string
  stakes: string
  modernParallel: string
  sourceTier: SourceTier
}

export interface CharacterRelationship {
  characterId: string
  characterName: string
  type: RelationshipType
  group: RelationshipGroup
}

export interface ConnectedTheme {
  themeId: string
  name: string
  annotation: string
}

export interface FaithJourney {
  text: string
  sourceTier: SourceTier
}

export interface CharacterProfile {
  id: string
  name: string
  bio: string
  modernBridge: string
  faithJourney?: FaithJourney
  era: Era
  testament: Testament
  roleType: RoleType
  socialStatus: SocialStatus
  appearances: CharacterAppearance[]
  relationships: CharacterRelationship[]
  connectedThemes: ConnectedTheme[]
}

// ── Component props ──

export interface CharactersProps {
  discoverCard: DiscoverCard
  characters: CharacterSummary[]
  filters: Filters
  activeFilters: string[]
  searchQuery: string
  selectedProfile?: CharacterProfile

  /** Open a character's full profile */
  onOpenProfile?: (characterId: string) => void
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
  /** Open a theme's detail view */
  onOpenTheme?: (themeId: string) => void
  /** Refresh the discover card with a new character */
  onRefreshDiscover?: () => void
}
