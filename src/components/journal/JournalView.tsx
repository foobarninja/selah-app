'use client'

import { useState, useMemo } from 'react'
import { Search, X, Plus, ChevronRight, Trash2 } from 'lucide-react'
import type { JournalProps, JournalEntry, Collection, Bookmark, NoteType, JournalTab, AnchorType } from './types'

const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const noteTypeColors: Record<string, { bg: string; text: string; label: string }> = {
  annotation:  { bg: 'var(--selah-sage-50, #F5F5ED)',   text: 'var(--selah-sage-600, #5A5D3C)',   label: 'Annotation' },
  reflection:  { bg: 'var(--selah-gold-50, #FBF3E0)',   text: 'var(--selah-gold-700, #7A5C1F)',   label: 'Reflection' },
  question:    { bg: 'var(--selah-teal-50, #EFF8F6)',   text: 'var(--selah-teal-600, #2B6B5A)',   label: 'Question' },
  sermon_idea: { bg: 'var(--selah-terra-50, #FDF5F3)',  text: 'var(--selah-terra-600, #8B4533)',  label: 'Sermon idea' },
  insight:     { bg: 'var(--selah-sky-50, #EEF2F7)',    text: 'var(--selah-sky-700, #4A6380)',    label: 'Insight' },
  prayer:      { bg: 'var(--selah-warmth-50, #FAF0E6)', text: 'var(--selah-warmth-700, #8B6B3E)', label: 'Prayer' },
}

const anchorColors: Record<string, string> = {
  verse: 'var(--selah-gold-500, #C6A23C)',
  character: 'var(--selah-terra-400, #C47A63)',
  theme: 'var(--selah-teal-400, #4A9E88)',
  'narrative-unit': 'var(--selah-sage-400, #8A8E64)',
}

function TypePill({ noteType }: { noteType: NoteType }) {
  const config = noteTypeColors[noteType] || noteTypeColors.reflection
  return (<span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 500, fontFamily: font.body, backgroundColor: config.bg, color: config.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{config.label}</span>)
}

function EntryCard({ entry, onOpen, onNavigateAnchor }: { entry: JournalEntry; onOpen?: () => void; onNavigateAnchor?: (type: AnchorType, id: string) => void }) {
  return (
    <button onClick={onOpen} className="block w-full text-left rounded-lg mb-3 transition-colors duration-150" style={{ padding: '16px 18px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
      <div className="flex items-center gap-2 mb-2">
        <TypePill noteType={entry.noteType} />
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{entry.timeAgo}</span>
      </div>
      <p className="line-clamp-3" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.6, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '10px' }}>{entry.content}</p>
      {entry.anchors.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-1.5">
          {entry.anchors.map((anchor, i) => (
            <span key={i} onClick={(e) => { e.stopPropagation(); onNavigateAnchor?.(anchor.type as AnchorType, anchor.entityId) }} className="transition-opacity duration-150 hover:opacity-80" style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-bg-elevated, #292524)', color: anchorColors[anchor.type] || 'var(--selah-text-2)', cursor: 'pointer' }}>{anchor.label}</span>
          ))}
        </div>
      )}
      {entry.userTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {entry.userTags.map((tag) => (<span key={tag} style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: '6px', backgroundColor: 'transparent', color: 'var(--selah-text-3, #6E695F)', border: '1px solid var(--selah-border-color, #3D3835)' }}>{tag}</span>))}
        </div>
      )}
    </button>
  )
}

function CollectionCard({ collection, onOpen }: { collection: Collection; onOpen?: () => void }) {
  return (
    <button onClick={onOpen} className="flex items-center gap-4 w-full text-left rounded-lg mb-3 transition-colors duration-150 group" style={{ padding: '16px 18px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '2px' }}>{collection.title}</p>
        <p className="line-clamp-1" style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.4, marginBottom: '4px' }}>{collection.description}</p>
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{collection.itemCount} items &middot; {collection.lastEdited}</span>
      </div>
      <ChevronRight size={16} strokeWidth={1.5} className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-text-3, #6E695F)' }} />
    </button>
  )
}

function BookmarkRow({ bookmark, onNavigate, onRemove }: { bookmark: Bookmark; onNavigate?: () => void; onRemove?: () => void }) {
  return (
    <div className="flex items-center justify-between py-2.5 group">
      <button onClick={onNavigate} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-gold-500, #C6A23C)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>{bookmark.verseRef}</button>
      <div className="flex items-center gap-3">
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{bookmark.timeAgo}</span>
        <button onClick={onRemove} className="opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}><Trash2 size={12} strokeWidth={1.5} /></button>
      </div>
    </div>
  )
}

export function JournalView({ entries, collections, bookmarks, activeTab: initialTab, activeFilters: initialFilters, searchQuery: initialSearch, onChangeTab, onSearch, onToggleFilter, onClearFilters, onOpenEntry, onCreateNote, onNavigateAnchor, onOpenCollection, onNavigateBookmark, onRemoveBookmark }: JournalProps) {
  const [activeTab, setActiveTab] = useState<JournalTab>(initialTab || 'notes')
  const [localSearch, setLocalSearch] = useState(initialSearch || '')
  const [localFilters, setLocalFilters] = useState<string[]>(initialFilters || [])

  const handleTabChange = (tab: JournalTab) => { setActiveTab(tab); onChangeTab?.(tab) }

  const filteredEntries = useMemo(() => {
    let result = entries
    if (localSearch.trim()) {
      const q = localSearch.toLowerCase()
      result = result.filter((e) => e.content.toLowerCase().includes(q) || e.anchors.some((a) => a.label.toLowerCase().includes(q)) || e.userTags.some((t) => t.toLowerCase().includes(q)))
    }
    if (localFilters.length > 0) {
      result = result.filter((e) => localFilters.some((f) => e.noteType === f || e.userTags.includes(f) || e.anchors.some((a) => a.label === f)))
    }
    return result
  }, [entries, localSearch, localFilters])

  const noteTypes: NoteType[] = ['annotation', 'reflection', 'question', 'sermon_idea', 'insight', 'prayer']
  const tabs: { id: JournalTab; label: string }[] = [{ id: 'notes', label: 'Notes' }, { id: 'collections', label: 'Collections' }, { id: 'bookmarks', label: 'Bookmarks' }]

  return (
    <div className="h-full overflow-y-auto relative" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '36px', letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '20px' }}>Journal</h1>

        <div className="flex gap-1 mb-6 rounded-lg" style={{ padding: '3px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', display: 'inline-flex' }}>
          {tabs.map((tab) => (<button key={tab.id} onClick={() => handleTabChange(tab.id)} className="transition-all duration-150" style={{ padding: '6px 16px', borderRadius: '6px', fontFamily: font.body, fontSize: '13px', fontWeight: 500, border: 'none', cursor: 'pointer', backgroundColor: activeTab === tab.id ? 'var(--selah-bg-elevated, #292524)' : 'transparent', color: activeTab === tab.id ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)' }}>{tab.label}</button>))}
        </div>

        {activeTab === 'notes' && (
          <>
            <div className="flex items-center gap-3 rounded-lg mb-4" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '10px 16px' }}>
              <Search size={16} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />
              <input type="text" value={localSearch} onChange={(e) => { setLocalSearch(e.target.value); onSearch?.(e.target.value) }} placeholder="Search your notes..." className="flex-1 outline-none" style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none' }} />
              {localSearch && (<button onClick={() => { setLocalSearch(''); onSearch?.('') }} style={{ color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={14} strokeWidth={1.5} /></button>)}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-2" style={{ scrollbarWidth: 'none' }}>
              {noteTypes.map((type) => { const config = noteTypeColors[type]; const isActive = localFilters.includes(type); return (<button key={type} onClick={() => { setLocalFilters((prev) => isActive ? prev.filter((f) => f !== type) : [...prev, type]); onToggleFilter?.(type) }} className="shrink-0 transition-all duration-150" style={{ padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 500, fontFamily: font.body, cursor: 'pointer', backgroundColor: isActive ? config.bg : 'transparent', color: isActive ? config.text : 'var(--selah-text-3, #6E695F)', border: isActive ? 'none' : '1px solid var(--selah-border-color, #3D3835)' }}>{config.label}</button>) })}
              {localFilters.length > 0 && (<button onClick={() => { setLocalFilters([]); onClearFilters?.() }} className="shrink-0" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Clear</button>)}
            </div>

            <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '12px' }}>{filteredEntries.length} note{filteredEntries.length !== 1 ? 's' : ''}{(localFilters.length > 0 || localSearch) ? ' matching' : ''}</p>

            {filteredEntries.map((entry) => (<EntryCard key={entry.id} entry={entry} onOpen={() => onOpenEntry?.(entry.id)} onNavigateAnchor={onNavigateAnchor} />))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-16">
                <p style={{ fontFamily: font.display, fontSize: '18px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>{entries.length === 0 ? 'No notes yet' : 'Nothing matched'}</p>
                <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>{entries.length === 0 ? 'Your thoughts are worth capturing.' : 'Try different terms or adjust your filters.'}</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'collections' && (
          collections.length > 0 ? collections.map((col) => (<CollectionCard key={col.id} collection={col} onOpen={() => onOpenCollection?.(col.id)} />)) : (
            <div className="text-center py-16">
              <p style={{ fontFamily: font.display, fontSize: '18px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No collections yet</p>
              <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Start building. Drag passages, characters, and insights here.</p>
            </div>
          )
        )}

        {activeTab === 'bookmarks' && (
          bookmarks.length > 0 ? (
            <div style={{ borderTop: '1px solid var(--selah-border-color, #3D3835)' }}>
              {bookmarks.map((bk) => (<BookmarkRow key={bk.id} bookmark={bk} onNavigate={() => onNavigateBookmark?.(bk.verseRef)} onRemove={() => onRemoveBookmark?.(bk.id)} />))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p style={{ fontFamily: font.display, fontSize: '18px', color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No bookmarks yet</p>
              <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Bookmark a verse in the Reader for quick retrieval.</p>
            </div>
          )
        )}
      </div>

      {activeTab === 'notes' && (
        <button onClick={onCreateNote} className="fixed bottom-6 right-6 z-30 flex items-center justify-center rounded-full shadow-lg transition-all duration-150" style={{ width: '48px', height: '48px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}><Plus size={20} strokeWidth={2} /></button>
      )}
    </div>
  )
}
