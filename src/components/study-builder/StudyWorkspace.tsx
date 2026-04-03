'use client'

import { useState } from 'react'
import { ArrowLeft, GripVertical, X, Plus, Search, Download, ExternalLink, BookOpen, Users, Sparkles, CloudSun, HelpCircle, PenLine, Check } from 'lucide-react'
import { TierPill } from '@/components/reader/TierPill'
import type { StudyBuilderProps, AssemblyItem, SourceSection, SourceItem } from './types'
import type { SourceTier } from '@/components/reader/types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const entityIcons: Record<string, typeof BookOpen> = { passage: BookOpen, character: Users, theme: Sparkles, climate: CloudSun, question: HelpCircle, journal: PenLine }
const formatLabels: Record<string, string> = { sermon: 'Sermon', teaching: 'Teaching', 'small-group': 'Small group', personal: 'Personal' }

function AssemblyCard({ item, onRemove, onUpdateAnnotation, onNavigate }: { item: AssemblyItem; onRemove?: () => void; onUpdateAnnotation?: (annotation: string) => void; onNavigate?: () => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [localAnnotation, setLocalAnnotation] = useState(item.annotation)
  const Icon = entityIcons[item.entityType] || BookOpen

  return (
    <div className="rounded-lg mb-2 group" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)' }}>
      <div className="flex items-start gap-2" style={{ padding: '12px 12px 0' }}>
        <div className="mt-1 cursor-grab opacity-30 group-hover:opacity-60 transition-opacity duration-150" style={{ color: 'var(--selah-text-3, #6E695F)' }}><GripVertical size={14} strokeWidth={1.5} /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0 }} />
            <span style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)' }}>{item.title}</span>
            <TierPill tier={item.sourceTier as SourceTier} />
          </div>
          <p className="line-clamp-2" style={{ fontFamily: font.body, fontSize: '12px', lineHeight: 1.5, color: 'var(--selah-text-3, #6E695F)' }}>{item.preview}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {onNavigate && (<button onClick={onNavigate} title="View in Reader" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><ExternalLink size={13} strokeWidth={1.5} /></button>)}
          <button onClick={onRemove} title="Remove" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}><X size={13} strokeWidth={1.5} /></button>
        </div>
      </div>
      <div style={{ padding: '8px 12px 12px 30px' }}>
        {isEditing ? (
          <div className="flex gap-2">
            <textarea value={localAnnotation} onChange={(e) => setLocalAnnotation(e.target.value)} rows={2} className="flex-1 outline-none resize-none rounded" style={{ fontFamily: font.body, fontSize: '12px', lineHeight: 1.5, color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'var(--selah-bg-elevated, #292524)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '6px 8px' }} autoFocus />
            <button onClick={() => { onUpdateAnnotation?.(localAnnotation); setIsEditing(false) }} style={{ color: 'var(--selah-gold-500, #C6A23C)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', alignSelf: 'flex-start' }}><Check size={14} strokeWidth={2} /></button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="block w-full text-left transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '12px', lineHeight: 1.5, color: item.annotation ? 'var(--selah-text-2, #A39E93)' : 'var(--selah-text-3, #6E695F)', fontStyle: item.annotation ? 'italic' : 'normal', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            {item.annotation || 'Add a note \u2014 why is this here?'}
          </button>
        )}
      </div>
    </div>
  )
}

function SourceRow({ item, onAdd }: { item: SourceItem; onAdd?: () => void }) {
  const Icon = entityIcons[item.entityType] || BookOpen
  return (
    <div className="flex items-start gap-3 py-2 group">
      <Icon size={14} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', marginTop: '3px', flexShrink: 0 }} />
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>{item.title}</p>
        {item.preview && (<p className="line-clamp-1" style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.4 }}>{item.preview}</p>)}
      </div>
      <button onClick={onAdd} className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-150 rounded" style={{ padding: '4px 10px', fontFamily: font.body, fontSize: '11px', fontWeight: 500, backgroundColor: 'var(--selah-gold-900, #4A3711)', color: 'var(--selah-gold-300, #E8C767)', border: 'none', cursor: 'pointer' }}>+ Add</button>
    </div>
  )
}

export function StudyWorkspace({ activeProject, assemblyItems, sourceSections, searchQuery, onAddItem, onRemoveItem, onUpdateAnnotation, onSearchSource, onExport, onNavigatePassage, onBackToList }: StudyBuilderProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [activeSourceSection, setActiveSourceSection] = useState(sourceSections[0]?.id || '')
  const [mobileSourceOpen, setMobileSourceOpen] = useState(false)

  if (!activeProject) return null
  const currentSection = sourceSections.find((s) => s.id === activeSourceSection) || sourceSections[0]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-4 shrink-0" style={{ padding: '12px 20px', borderBottom: '1px solid var(--selah-border-color, #3D3835)', backgroundColor: 'var(--selah-bg-surface, #1C1917)' }}>
        <button onClick={onBackToList} style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer' }}><ArrowLeft size={18} strokeWidth={1.5} /></button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>{activeProject.topic}</h1>
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '2px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)', textTransform: 'capitalize' }}>{formatLabels[activeProject.format] || activeProject.format}</span>
          </div>
          <p style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{assemblyItems.length} items &middot; {activeProject.lastSaved}</p>
        </div>
        <button onClick={() => onExport?.('docx')} className="flex items-center gap-2 transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}><Download size={14} strokeWidth={2} />Export</button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto" style={{ padding: '20px' }}>
          {assemblyItems.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ fontFamily: font.display, fontSize: '18px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>Your outline is empty</p>
              <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Add material from the source panel to start building.</p>
            </div>
          ) : (
            assemblyItems.map((item) => (
              <AssemblyCard key={item.id} item={item} onRemove={() => onRemoveItem?.(item.id)} onUpdateAnnotation={(ann) => onUpdateAnnotation?.(item.id, ann)} onNavigate={item.entityType === 'passage' || item.entityType === 'character' || item.entityType === 'theme' ? () => onNavigatePassage?.(item.title) : undefined} />
            ))
          )}
        </div>

        <div className="hidden md:flex flex-col shrink-0 overflow-hidden" style={{ width: '360px', borderLeft: '1px solid var(--selah-border-color, #3D3835)', backgroundColor: 'var(--selah-bg-page, #0F0D0B)' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
            <div className="flex items-center gap-2 rounded-lg" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '8px 12px' }}>
              <Search size={14} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)' }} />
              <input type="text" value={localSearch} onChange={(e) => { setLocalSearch(e.target.value); onSearchSource?.(e.target.value) }} placeholder="Search material..." className="flex-1 outline-none" style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none' }} />
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto shrink-0" style={{ padding: '8px 16px', scrollbarWidth: 'none' }}>
            {sourceSections.map((section) => (<button key={section.id} onClick={() => setActiveSourceSection(section.id)} className="shrink-0 transition-all duration-150" style={{ padding: '4px 10px', borderRadius: '10px', fontFamily: font.body, fontSize: '11px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: activeSourceSection === section.id ? 'var(--selah-gold-900, #4A3711)' : 'transparent', color: activeSourceSection === section.id ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-3, #6E695F)' }}>{section.label}</button>))}
          </div>
          <div className="flex-1 overflow-y-auto" style={{ padding: '8px 16px' }}>
            {currentSection?.items.map((item) => (<SourceRow key={item.id} item={item} onAdd={() => onAddItem?.(item.id)} />))}
            {currentSection?.items.length === 0 && (<p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)', textAlign: 'center', paddingTop: '24px' }}>No items in this category.</p>)}
          </div>
        </div>
      </div>

      <button onClick={() => setMobileSourceOpen(true)} className="md:hidden fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full shadow-lg transition-all duration-150" style={{ padding: '12px 20px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: font.body, fontSize: '14px', fontWeight: 600 }}><Plus size={16} strokeWidth={2} />Add material</button>

      {mobileSourceOpen && (
        <>
          <div className="md:hidden fixed inset-0 z-40" style={{ backgroundColor: 'rgba(15, 13, 11, 0.6)' }} onClick={() => setMobileSourceOpen(false)} />
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl overflow-hidden flex flex-col" style={{ maxHeight: '75vh', backgroundColor: 'var(--selah-bg-page, #0F0D0B)', borderTop: '1px solid var(--selah-border-color, #3D3835)' }}>
            <div className="flex justify-center py-3"><div className="rounded-full" style={{ width: '36px', height: '4px', backgroundColor: 'var(--selah-text-3, #6E695F)', opacity: 0.5 }} /></div>
            <div className="flex gap-1 overflow-x-auto px-4 pb-3" style={{ scrollbarWidth: 'none' }}>
              {sourceSections.map((section) => (<button key={section.id} onClick={() => setActiveSourceSection(section.id)} className="shrink-0" style={{ padding: '4px 10px', borderRadius: '10px', fontFamily: font.body, fontSize: '12px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: activeSourceSection === section.id ? 'var(--selah-gold-900, #4A3711)' : 'transparent', color: activeSourceSection === section.id ? 'var(--selah-gold-300, #E8C767)' : 'var(--selah-text-3, #6E695F)' }}>{section.label}</button>))}
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-6">
              {currentSection?.items.map((item) => (<SourceRow key={item.id} item={item} onAdd={() => { onAddItem?.(item.id); setMobileSourceOpen(false) }} />))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
