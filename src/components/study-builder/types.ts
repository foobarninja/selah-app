// Study Builder section — TypeScript interfaces

import type { SourceTier } from '@/components/reader/types'

/** Project format — shapes the export template, not the assembly workflow */
export type ProjectFormat = 'sermon' | 'teaching' | 'small-group' | 'personal'

/** Project status */
export type ProjectStatus = 'in-progress' | 'exported' | 'archived'

/** Entity types that can be assembled */
export type AssemblyEntityType = 'passage' | 'character' | 'theme' | 'climate' | 'question' | 'journal'

/** Export format */
export type ExportFormat = 'docx' | 'markdown'

// ── Data interfaces ──

export interface ProjectSummary { id: string; topic: string; format: ProjectFormat; itemCount: number; lastEdited: string; status: ProjectStatus }
export interface ActiveProject { id: string; topic: string; format: ProjectFormat; lastSaved: string }
export interface AssemblyItem { id: string; entityType: AssemblyEntityType; entityId: string; title: string; preview: string; sourceTier: SourceTier; annotation: string }
export interface SourceItem { id: string; entityType: AssemblyEntityType; title: string; preview: string }
export interface SourceSection { id: string; label: string; items: SourceItem[] }

// ── Component props ──

export interface StudyBuilderProps {
  projects: ProjectSummary[]
  activeProject?: ActiveProject
  assemblyItems: AssemblyItem[]
  sourceSections: SourceSection[]
  searchQuery: string

  onCreateProject?: (topic: string, format: ProjectFormat) => void
  onOpenProject?: (projectId: string) => void
  onDeleteProject?: (projectId: string) => void
  onAddItem?: (sourceItemId: string) => void
  onRemoveItem?: (assemblyItemId: string) => void
  onReorderItems?: (itemIds: string[]) => void
  onUpdateAnnotation?: (assemblyItemId: string, annotation: string) => void
  onSearchSource?: (query: string) => void
  onExport?: (format: ExportFormat) => void
  onNavigatePassage?: (passageRef: string) => void
  onBackToList?: () => void
}
