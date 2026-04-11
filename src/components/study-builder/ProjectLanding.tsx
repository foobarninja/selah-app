'use client'

import { useState } from 'react'
import { Plus, Presentation, ChevronRight, Trash2 } from 'lucide-react'
import type { StudyBuilderProps, ProjectSummary, ProjectFormat } from './types'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const formatLabels: Record<string, string> = { sermon: 'Sermon', teaching: 'Teaching', 'small-group': 'Small group', personal: 'Personal' }
const formats: ProjectFormat[] = ['sermon', 'teaching', 'small-group', 'personal']

function ProjectCard({ project, onOpen, onDelete }: { project: ProjectSummary; onOpen?: () => void; onDelete?: () => void }) {
  const [showConfirm, setShowConfirm] = useState(false)

  return (
    <div className="flex items-center gap-2 group">
      <button onClick={onOpen} className="flex items-center gap-4 flex-1 min-w-0 text-left rounded-lg transition-colors duration-150" style={{ padding: '16px 18px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
        <div className="flex items-center justify-center shrink-0 rounded-lg" style={{ width: '40px', height: '40px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: 'var(--selah-gold-500, #C6A23C)' }}>
          <Presentation size={18} strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{project.topic}</p>
          <div className="flex items-center gap-3">
            <span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>{formatLabels[project.format] || project.format}</span>
            <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{project.itemCount} items</span>
            <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{project.lastEdited}</span>
          </div>
        </div>
        <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-text-3, #6E695F)' }} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setShowConfirm(true) }}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-lg"
        title="Delete project"
        style={{ padding: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--selah-text-3, #6E695F)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#E05252' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--selah-text-3, #6E695F)' }}
      >
        <Trash2 size={15} strokeWidth={1.5} />
      </button>
      <ConfirmDialog
        open={showConfirm}
        title="Remove this study project?"
        message={`"${project.topic}" and all its assembled items will be removed. This can't be undone.`}
        confirmLabel="Remove"
        cancelLabel="Keep it"
        onConfirm={() => { setShowConfirm(false); onDelete?.() }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}

function NewProjectForm({ onCreate, onCancel }: { onCreate?: (topic: string, format: ProjectFormat) => void; onCancel: () => void }) {
  const [topic, setTopic] = useState('')
  const [format, setFormat] = useState<ProjectFormat>('sermon')

  return (
    <div className="rounded-xl" style={{ backgroundColor: 'var(--selah-bg-elevated, #292524)', padding: '28px', marginBottom: '24px' }}>
      <p style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '20px' }}>What are you studying?</p>
      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a topic, question, or concept..." className="w-full outline-none rounded-lg mb-5" style={{ fontFamily: font.body, fontSize: '16px', color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '12px 16px' }} autoFocus />
      <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '10px' }}>Format</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {formats.map((f) => (
          <button key={f} onClick={() => setFormat(f)} className="transition-all duration-150" style={{ padding: '6px 16px', borderRadius: '10px', fontFamily: font.body, fontSize: '13px', fontWeight: 500, cursor: 'pointer', backgroundColor: format === f ? 'var(--selah-gold-900, #4A3711)' : 'transparent', color: format === f ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-2, #A39E93)', border: format === f ? '1px solid var(--selah-gold-500, #C6A23C)' : '1px solid var(--selah-border-color, #3D3835)' }}>{formatLabels[f]}</button>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => { if (topic.trim()) onCreate?.(topic, format) }} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, padding: '10px 24px', borderRadius: '8px', backgroundColor: topic.trim() ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)', color: topic.trim() ? '#fff' : 'var(--selah-text-3, #6E695F)', border: 'none', cursor: topic.trim() ? 'pointer' : 'default' }}>Begin</button>
        <button onClick={onCancel} style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  )
}

export function ProjectLanding({ projects, onCreateProject, onOpenProject, onDeleteProject }: StudyBuilderProps) {
  const [showNewForm, setShowNewForm] = useState(false)

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-8">
          <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '36px', letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)' }}>Study builder</h1>
          {!showNewForm && (
            <button onClick={() => setShowNewForm(true)} className="flex items-center gap-2 transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}>
              <Plus size={14} strokeWidth={2} />New project
            </button>
          )}
        </div>
        {showNewForm && (<NewProjectForm onCreate={(topic, format) => { onCreateProject?.(topic, format); setShowNewForm(false) }} onCancel={() => setShowNewForm(false)} />)}
        {projects.length > 0 ? (
          <div className="space-y-3">{projects.map((project) => (<ProjectCard key={project.id} project={project} onOpen={() => onOpenProject?.(project.id)} onDelete={() => onDeleteProject?.(project.id)} />))}</div>
        ) : (
          <div className="text-center py-16">
            <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No projects yet</p>
            <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Start building. Your sermons, studies, and research will live here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
