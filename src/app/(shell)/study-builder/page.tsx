'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectLanding, StudyWorkspace } from '@/components/study-builder'
import type {
  ActiveProject,
  AssemblyItem,
  SourceSection,
  ProjectSummary,
  ProjectFormat,
  ExportFormat,
  SourceItem,
} from '@/components/study-builder/types'

export default function StudyBuilderPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [activeProject, setActiveProject] = useState<ActiveProject | null>(null)
  const [assemblyItems, setAssemblyItems] = useState<AssemblyItem[]>([])
  const [sourceSections, setSourceSections] = useState<SourceSection[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  // Load project list
  const loadProjects = useCallback(async () => {
    const res = await fetch('/api/study-builder/projects')
    const data = await res.json()
    setProjects(data)
  }, [])

  useEffect(() => { loadProjects() }, [loadProjects])

  // Load project detail + run assembly
  const openProject = useCallback(async (projectId: string) => {
    const res = await fetch(`/api/study-builder/projects/${projectId}`)
    const data = await res.json()
    setActiveProject(data.project)
    setAssemblyItems(data.items)

    // Run assembly engine with the project topic
    const topic = data.project.topic
    setSearchQuery(topic)
    const sectionsRes = await fetch(`/api/study-builder/assemble?topic=${encodeURIComponent(topic)}`)
    const sections = await sectionsRes.json()
    setSourceSections(sections)
  }, [])

  // Create project
  const handleCreateProject = useCallback(async (topic: string, format: ProjectFormat) => {
    const res = await fetch('/api/study-builder/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, format }),
    })
    const { id } = await res.json()
    await openProject(String(id))
    await loadProjects()
  }, [openProject, loadProjects])

  // Delete project
  const handleDeleteProject = useCallback(async (projectId: string) => {
    await fetch(`/api/study-builder/projects/${projectId}`, { method: 'DELETE' })
    setProjects((prev) => prev.filter((p) => p.id !== projectId))
  }, [])

  // Add item from source panel
  const handleAddItem = useCallback(async (sourceItemId: string) => {
    if (!activeProject) return
    // sourceItemId format: "entityType:entityId" or "entityType:entityId:extra"
    // Find the item in source sections
    let sourceItem: SourceItem | undefined
    for (const section of sourceSections) {
      sourceItem = section.items.find((i) => i.id === sourceItemId)
      if (sourceItem) break
    }
    if (!sourceItem) return

    // Parse entityType and entityId from the source item id
    const [entityType, ...rest] = sourceItemId.split(':')
    const entityId = rest.join(':')

    const res = await fetch(`/api/study-builder/projects/${activeProject.id}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entityType: sourceItem.entityType,
        entityId,
        title: sourceItem.title,
        preview: sourceItem.preview,
        sourceTier: 2,
      }),
    })
    const { id } = await res.json()

    // Add to local state immediately
    setAssemblyItems((prev) => [
      ...prev,
      {
        id: String(id),
        entityType: sourceItem!.entityType,
        entityId,
        title: sourceItem!.title,
        preview: sourceItem!.preview,
        sourceTier: 2,
        annotation: '',
      },
    ])
  }, [activeProject, sourceSections])

  // Remove item
  const handleRemoveItem = useCallback(async (assemblyItemId: string) => {
    if (!activeProject) return
    await fetch(`/api/study-builder/projects/${activeProject.id}/items/${assemblyItemId}`, {
      method: 'DELETE',
    })
    setAssemblyItems((prev) => prev.filter((i) => i.id !== assemblyItemId))
  }, [activeProject])

  // Update annotation
  const handleUpdateAnnotation = useCallback(async (assemblyItemId: string, annotation: string) => {
    if (!activeProject) return
    await fetch(`/api/study-builder/projects/${activeProject.id}/items/${assemblyItemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ annotation }),
    })
    setAssemblyItems((prev) =>
      prev.map((i) => (i.id === assemblyItemId ? { ...i, annotation } : i)),
    )
  }, [activeProject])

  // Search source material
  const handleSearchSource = useCallback(async (query: string) => {
    setSearchQuery(query)
    if (!query || query.trim().length < 2) return
    const res = await fetch(`/api/study-builder/assemble?topic=${encodeURIComponent(query)}`)
    const sections = await res.json()
    setSourceSections(sections)
  }, [])

  // Export
  const handleExport = useCallback(async (format: ExportFormat) => {
    if (!activeProject) return
    const url = `/api/study-builder/projects/${activeProject.id}/export?format=${format}`
    // Trigger browser download
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeProject.topic}.${format === 'docx' ? 'docx' : 'md'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }, [activeProject])

  // Navigate to reader
  const handleNavigatePassage = useCallback((ref: string) => {
    // Try to parse book/chapter from the title
    const match = ref.match(/^(\d?\s?\w+)\s+(\d+)/)
    if (match) {
      const bookName = match[1].trim()
      const chapter = match[2]
      // Reverse lookup book ID
      const BOOK_NAMES: Record<string, string> = {
        Genesis: 'GEN', Exodus: 'EXO', Leviticus: 'LEV', Numbers: 'NUM', Deuteronomy: 'DEU',
        Joshua: 'JOS', Judges: 'JDG', Ruth: 'RUT', '1 Samuel': '1SA', '2 Samuel': '2SA',
        '1 Kings': '1KI', '2 Kings': '2KI', '1 Chronicles': '1CH', '2 Chronicles': '2CH',
        Ezra: 'EZR', Nehemiah: 'NEH', Esther: 'EST', Job: 'JOB', Psalms: 'PSA',
        Proverbs: 'PRO', Ecclesiastes: 'ECC', 'Song of Solomon': 'SNG', Isaiah: 'ISA',
        Jeremiah: 'JER', Lamentations: 'LAM', Ezekiel: 'EZK', Daniel: 'DAN',
        Hosea: 'HOS', Joel: 'JOL', Amos: 'AMO', Obadiah: 'OBA', Jonah: 'JON',
        Micah: 'MIC', Nahum: 'NAM', Habakkuk: 'HAB', Zephaniah: 'ZEP', Haggai: 'HAG',
        Zechariah: 'ZEC', Malachi: 'MAL', Matthew: 'MAT', Mark: 'MRK', Luke: 'LUK',
        John: 'JHN', Acts: 'ACT', Romans: 'ROM', '1 Corinthians': '1CO', '2 Corinthians': '2CO',
        Galatians: 'GAL', Ephesians: 'EPH', Philippians: 'PHP', Colossians: 'COL',
        '1 Thessalonians': '1TH', '2 Thessalonians': '2TH', '1 Timothy': '1TI', '2 Timothy': '2TI',
        Titus: 'TIT', Philemon: 'PHM', Hebrews: 'HEB', James: 'JAS', '1 Peter': '1PE',
        '2 Peter': '2PE', '1 John': '1JN', '2 John': '2JN', '3 John': '3JN', Jude: 'JUD',
        Revelation: 'REV',
      }
      const bookId = BOOK_NAMES[bookName]
      if (bookId) {
        router.push(`/reader/${bookId}/${chapter}`)
        return
      }
    }
    router.push('/reader')
  }, [router])

  // Back to list
  const handleBackToList = useCallback(() => {
    setActiveProject(null)
    setAssemblyItems([])
    setSourceSections([])
    setSearchQuery('')
    loadProjects()
  }, [loadProjects])

  if (activeProject) {
    return (
      <StudyWorkspace
        projects={projects}
        activeProject={activeProject}
        assemblyItems={assemblyItems}
        sourceSections={sourceSections}
        searchQuery={searchQuery}
        onBackToList={handleBackToList}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onReorderItems={async (itemIds) => {
          if (!activeProject) return
          await fetch(`/api/study-builder/projects/${activeProject.id}/reorder`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemIds }),
          })
          await openProject(activeProject.id)
        }}
        onUpdateAnnotation={handleUpdateAnnotation}
        onSearchSource={handleSearchSource}
        onExport={handleExport}
        onNavigatePassage={handleNavigatePassage}
      />
    )
  }

  return (
    <ProjectLanding
      projects={projects}
      assemblyItems={[]}
      sourceSections={[]}
      searchQuery=""
      onCreateProject={handleCreateProject}
      onOpenProject={openProject}
      onDeleteProject={handleDeleteProject}
    />
  )
}
