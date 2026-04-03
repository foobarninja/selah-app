'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectLanding, StudyWorkspace } from '@/components/study-builder'
import sampleData from './sample-data.json'
import type { ActiveProject, AssemblyItem, SourceSection } from '@/components/study-builder/types'

export default function StudyBuilderPage() {
  const router = useRouter()
  const [showWorkspace, setShowWorkspace] = useState(false)

  const data = sampleData as unknown as {
    projects: Parameters<typeof ProjectLanding>[0]['projects']
    activeProject: ActiveProject
    assemblyItems: AssemblyItem[]
    sourceSections: SourceSection[]
    searchQuery: string
  }

  if (showWorkspace) {
    return (
      <StudyWorkspace
        projects={data.projects}
        activeProject={data.activeProject}
        assemblyItems={data.assemblyItems}
        sourceSections={data.sourceSections}
        searchQuery={data.searchQuery}
        onBackToList={() => setShowWorkspace(false)}
        onAddItem={(id) => console.log('[StudyBuilder] Add item:', id)}
        onRemoveItem={(id) => console.log('[StudyBuilder] Remove item:', id)}
        onUpdateAnnotation={(id, ann) => console.log('[StudyBuilder] Update annotation:', id, ann)}
        onSearchSource={(q) => console.log('[StudyBuilder] Search source:', q)}
        onExport={(fmt) => console.log('[StudyBuilder] Export:', fmt)}
        onNavigatePassage={(ref) => { console.log('[StudyBuilder] Navigate:', ref); router.push('/reader') }}
      />
    )
  }

  return (
    <ProjectLanding
      projects={data.projects}
      assemblyItems={[]}
      sourceSections={[]}
      searchQuery=""
      onCreateProject={(topic, format) => {
        console.log('[StudyBuilder] Create project:', topic, format)
        setShowWorkspace(true)
      }}
      onOpenProject={(id) => {
        console.log('[StudyBuilder] Open project:', id)
        setShowWorkspace(true)
      }}
    />
  )
}
