// Journal section — TypeScript interfaces

export type NoteType = 'annotation' | 'reflection' | 'question' | 'sermon_idea' | 'insight' | 'prayer'
export type AnchorType = 'verse' | 'character' | 'theme' | 'narrative-unit'
export type StudyContext = 'reading' | 'sermon-prep' | 'devotional' | 'word-study' | 'ai-conversation' | 'freestanding'
export type JournalType = 'study' | 'collection' | 'devotional'
export type CoverColor = 'gold' | 'terracotta' | 'teal' | 'sage' | null

export interface Anchor { type: AnchorType; label: string; entityId: string }

export interface JournalEntry {
  id: string
  noteType: NoteType
  content: string
  anchors: Anchor[]
  themeTags: string[]
  userTags: string[]
  studyContext: StudyContext
  createdAt: string
  timeAgo: string
  journalId?: string
  journalName?: string
}

export interface JournalSummary {
  id: string
  name: string
  description: string
  coverColor: CoverColor
  journalType: JournalType
  isDefault: boolean
  noteCount: number
  lastEntry: string | null
  lastEntryAgo: string | null
  anchorBookId: string | null
  anchorChapter: number | null
  anchorCharacterId: string | null
  anchorThemeId: string | null
}

export interface JournalDetail {
  id: string
  name: string
  description: string
  coverColor: CoverColor
  journalType: JournalType
  isDefault: boolean
  anchorBookId: string | null
  anchorChapter: number | null
  anchorCharacterId: string | null
  anchorThemeId: string | null
}

export interface Collection { id: string; title: string; description: string; itemCount: number; lastEdited: string }
export interface Bookmark { id: string; verseRef: string; createdAt: string; timeAgo: string }

export interface JournalPickerItem {
  id: string
  name: string
  noteCount: number
  isDefault: boolean
}
