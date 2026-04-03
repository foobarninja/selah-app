// Journal section — TypeScript interfaces

/** Note type classification */
export type NoteType = 'annotation' | 'reflection' | 'question' | 'sermon_idea' | 'insight' | 'prayer'

/** Anchor type — what the entry is connected to */
export type AnchorType = 'verse' | 'character' | 'theme' | 'narrative-unit'

/** Study context — what the user was doing when they wrote the entry */
export type StudyContext = 'reading' | 'sermon-prep' | 'devotional' | 'word-study' | 'ai-conversation' | 'freestanding'

/** Journal tab */
export type JournalTab = 'notes' | 'collections' | 'bookmarks'

// ── Data interfaces ──

export interface Anchor { type: AnchorType; label: string; entityId: string }

export interface JournalEntry {
  id: string; noteType: NoteType; content: string; anchors: Anchor[]
  themeTags: string[]; userTags: string[]; studyContext: StudyContext
  createdAt: string; timeAgo: string
}

export interface Collection { id: string; title: string; description: string; itemCount: number; lastEdited: string }
export interface Bookmark { id: string; verseRef: string; createdAt: string; timeAgo: string }

// ── Component props ──

export interface JournalProps {
  entries: JournalEntry[]
  collections: Collection[]
  bookmarks: Bookmark[]
  availableUserTags: string[]
  activeTab: JournalTab
  activeFilters: string[]
  searchQuery: string

  onChangeTab?: (tab: JournalTab) => void
  onSearch?: (query: string) => void
  onToggleFilter?: (filter: string) => void
  onClearFilters?: () => void
  onOpenEntry?: (entryId: string) => void
  onCreateNote?: () => void
  onNavigateAnchor?: (anchorType: AnchorType, entityId: string) => void
  onOpenCollection?: (collectionId: string) => void
  onNavigateBookmark?: (verseRef: string) => void
  onRemoveBookmark?: (bookmarkId: string) => void
  onAddAnchor?: (entryId: string, anchor: Anchor) => void
  onAddTag?: (entryId: string, tag: string) => void
}
