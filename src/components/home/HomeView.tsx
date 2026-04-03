'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Search,
  X,
  BookOpen,
  Users,
  Sparkles,
  Languages,
  Presentation,
  Clock,
  Wheat,
} from 'lucide-react'
import type {
  HomeProps,
  SearchResults,
  DailyBread,
  HistoryItem,
  RecentNote,
} from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
  mono: "var(--selah-font-mono, 'JetBrains Mono', monospace)",
}

/* ── Entity type icons ── */
const typeIcons: Record<string, typeof BookOpen> = {
  passage: BookOpen,
  character: Users,
  theme: Sparkles,
  strongs: Languages,
  sermon: Presentation,
}

/* ── Note type colors ── */
const noteTypeColors: Record<string, { bg: string; text: string }> = {
  reflection: { bg: 'var(--selah-gold-50, #FBF3E0)', text: 'var(--selah-gold-700, #7A5C1F)' },
  question: { bg: 'var(--selah-teal-50, #EFF8F6)', text: 'var(--selah-teal-600, #2B6B5A)' },
  insight: { bg: 'var(--selah-sky-50, #EEF2F7)', text: 'var(--selah-sky-700, #4A6380)' },
  annotation: { bg: 'var(--selah-sage-50, #F5F5ED)', text: 'var(--selah-sage-600, #5A5D3C)' },
  sermon_idea: { bg: 'var(--selah-terra-50, #FDF5F3)', text: 'var(--selah-terra-600, #8B4533)' },
  prayer: { bg: 'var(--selah-warmth-50, #FAF0E6)', text: 'var(--selah-warmth-700, #8B6B3E)' },
}

/* ── Search dropdown ── */
function SearchDropdown({
  results,
  query,
  onNavigatePassage,
  onOpenCharacter,
  onOpenTheme,
  onOpenStrongs,
}: {
  results: SearchResults
  query: string
  onNavigatePassage?: (ref: string) => void
  onOpenCharacter?: (id: string) => void
  onOpenTheme?: (id: string) => void
  onOpenStrongs?: (code: string) => void
}) {
  const hasPassages = results.passages.length > 0
  const hasCharacters = results.characters.length > 0
  const hasThemes = results.themes.length > 0
  const hasStrongs = results.strongs.length > 0
  const hasAny = hasPassages || hasCharacters || hasThemes || hasStrongs

  if (!query.trim() || !hasAny) return null

  return (
    <div
      className="absolute left-0 right-0 z-20 rounded-lg shadow-xl overflow-hidden"
      style={{
        top: 'calc(100% + 4px)',
        backgroundColor: 'var(--selah-bg-surface, #1C1917)',
        border: '1px solid var(--selah-border-color, #3D3835)',
        maxHeight: '400px',
        overflowY: 'auto',
      }}
    >
      {hasPassages && (
        <div style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <BookOpen size={13} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)' }} />
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Passages</span>
          </div>
          {results.passages.map((p) => (
            <button key={p.id} onClick={() => onNavigatePassage?.(p.ref)} className="block w-full text-left px-4 py-2 transition-colors duration-100" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
              <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)' }}>{p.ref}</span>
              <span style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-3, #6E695F)', marginLeft: '8px' }}>{p.title}</span>
            </button>
          ))}
        </div>
      )}

      {hasCharacters && (
        <div style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <Users size={13} strokeWidth={1.5} style={{ color: 'var(--selah-terra-400, #C47A63)' }} />
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Characters</span>
          </div>
          {results.characters.map((c) => (
            <button key={c.id} onClick={() => onOpenCharacter?.(c.id)} className="block w-full text-left px-4 py-2 transition-colors duration-100" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
              <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)' }}>{c.name}</span>
              <span className="block" style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.4 }}>{c.bioBrief}</span>
            </button>
          ))}
        </div>
      )}

      {hasThemes && (
        <div style={{ borderBottom: '1px solid var(--selah-border-color, #3D3835)' }}>
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <Sparkles size={13} strokeWidth={1.5} style={{ color: 'var(--selah-teal-400, #4A9E88)' }} />
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Themes</span>
          </div>
          {results.themes.map((t) => (
            <button key={t.id} onClick={() => onOpenTheme?.(t.id)} className="block w-full text-left px-4 py-2 transition-colors duration-100" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
              <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)' }}>{t.name}</span>
              <span className="block" style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', fontStyle: 'italic', lineHeight: 1.4 }}>{t.modernFraming}</span>
            </button>
          ))}
        </div>
      )}

      {hasStrongs && (
        <div>
          <div className="flex items-center gap-2 px-4 pt-3 pb-1">
            <Languages size={13} strokeWidth={1.5} style={{ color: 'var(--selah-teal-600, #2B6B5A)' }} />
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)' }}>Strong&rsquo;s</span>
          </div>
          {results.strongs.map((s) => (
            <button key={s.id} onClick={() => onOpenStrongs?.(s.code)} className="block w-full text-left px-4 py-2 transition-colors duration-100" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
              <span style={{ fontFamily: font.mono, fontSize: '13px', color: 'var(--selah-teal-400, #4A9E88)' }}>{s.code}</span>
              <span style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginLeft: '8px' }}>{s.transliteration}</span>
              <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', marginLeft: '8px' }}>{s.brief}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Daily Bread card ── */
function DailyBreadCard({
  bread,
  onBegin,
  onRevisit,
  onDismiss,
}: {
  bread: DailyBread
  onBegin?: () => void
  onRevisit?: () => void
  onDismiss?: () => void
}) {
  if (bread.status === 'hidden') return null

  const isCompleted = bread.status === 'completed'

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--selah-bg-elevated, #292524)',
        padding: '20px 24px',
        marginBottom: '32px',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Wheat size={14} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)' }} />
            <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-gold-500, #C6A23C)' }}>Daily Bread</span>
          </div>

          {isCompleted ? (
            <>
              <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, fontStyle: 'italic', color: 'var(--selah-text-2, #A39E93)', lineHeight: 1.6, marginBottom: '12px' }}>
                {bread.completedMessage}
              </p>
              <button onClick={onRevisit} style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                Revisit
              </button>
            </>
          ) : (
            <>
              <p style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.4, marginBottom: '8px' }}>
                {bread.title}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontFamily: font.body, fontSize: '11px', fontWeight: 500, padding: '2px 8px', borderRadius: '10px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>
                  {bread.audienceLevel}
                </span>
                <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
                  <Clock size={12} strokeWidth={1.5} />
                  {bread.estimatedMinutes} min
                </span>
              </div>
              <button onClick={onBegin} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, padding: '8px 20px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}>
                Begin
              </button>
            </>
          )}
        </div>

        {!isCompleted && (
          <button onClick={onDismiss} title="Dismiss" className="transition-opacity duration-150 opacity-30 hover:opacity-60" style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  )
}

/* ── History card ── */
function HistoryCard({ item, onOpen }: { item: HistoryItem; onOpen?: () => void }) {
  const Icon = typeIcons[item.type] || BookOpen

  return (
    <button onClick={onOpen} className="flex items-start gap-3 w-full text-left rounded-lg transition-colors duration-150 group" style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
      <div className="flex items-center justify-center shrink-0 rounded-md mt-0.5" style={{ width: '32px', height: '32px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-3, #6E695F)' }}>
        <Icon size={16} strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>{item.title}</p>
        <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', lineHeight: 1.4 }}>{item.context}</p>
      </div>
      <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.timeAgo}</span>
    </button>
  )
}

/* ── Recent note entry ── */
function NoteEntry({ note, onOpen }: { note: RecentNote; onOpen?: () => void }) {
  const colors = noteTypeColors[note.noteType] || noteTypeColors.reflection

  return (
    <button onClick={onOpen} className="block w-full text-left rounded-lg transition-colors duration-150" style={{ padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: colors.bg, color: colors.text, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {note.noteType.replace('_', ' ')}
        </span>
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{note.timeAgo}</span>
      </div>
      <p className="line-clamp-2" style={{ fontFamily: font.body, fontSize: '13px', lineHeight: 1.6, color: 'var(--selah-text-2, #A39E93)', marginBottom: '6px' }}>
        {note.snippet}
      </p>
      {note.anchors.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {note.anchors.map((anchor, i) => (
            <span key={i} style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 6px', borderRadius: '6px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', color: 'var(--selah-text-3, #6E695F)' }}>
              {anchor.label}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}

/* ════════════════════════════════════════════
   Main HomeView Component
   ════════════════════════════════════════════ */

export function HomeView({
  searchResults,
  searchQuery,
  dailyBread,
  history,
  recentNotes,
  welcomeMessage,
  isFirstLaunch,
  onSearch,
  onNavigatePassage,
  onOpenCharacter,
  onOpenTheme,
  onOpenStrongs,
  onBeginDailyBread,
  onRevisitDailyBread,
  onDismissDailyBread,
  onOpenHistoryItem,
  onOpenNote,
}: HomeProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery || '')
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* ── Universal search ── */}
        <div ref={searchRef} className="relative mb-10">
          <div className="flex items-center gap-3 rounded-xl" style={{ backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '14px 20px' }}>
            <Search size={18} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value)
                setShowDropdown(!!e.target.value.trim())
                onSearch?.(e.target.value)
              }}
              onFocus={() => { if (localSearch.trim()) setShowDropdown(true) }}
              placeholder="Search passages, characters, themes..."
              className="flex-1 outline-none"
              style={{ fontFamily: font.body, fontSize: '16px', color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none' }}
            />
            {localSearch && (
              <button onClick={() => { setLocalSearch(''); setShowDropdown(false); onSearch?.('') }} style={{ color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>

          {showDropdown && (
            <SearchDropdown
              results={searchResults}
              query={localSearch}
              onNavigatePassage={onNavigatePassage}
              onOpenCharacter={onOpenCharacter}
              onOpenTheme={onOpenTheme}
              onOpenStrongs={onOpenStrongs}
            />
          )}
        </div>

        {/* ── Daily Bread ── */}
        <DailyBreadCard bread={dailyBread} onBegin={onBeginDailyBread} onRevisit={onRevisitDailyBread} onDismiss={onDismissDailyBread} />

        {/* ── First launch welcome OR History + Notes ── */}
        {isFirstLaunch ? (
          <div className="py-8">
            <p style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 300, color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.6, marginBottom: '16px' }}>
              Welcome to Selah
            </p>
            <p style={{ fontFamily: font.body, fontSize: '15px', lineHeight: 1.8, color: 'var(--selah-text-2, #A39E93)' }}>
              {welcomeMessage.replace('Welcome to Selah. ', '')}
            </p>
          </div>
        ) : (
          <>
            {history.length > 0 && (
              <div className="mb-8">
                <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '8px', paddingLeft: '16px' }}>
                  Pick up where you left off
                </p>
                <div>
                  {history.map((item) => (
                    <HistoryCard key={item.id} item={item} onOpen={() => onOpenHistoryItem?.(item.id, item.type)} />
                  ))}
                </div>
              </div>
            )}

            {recentNotes.length > 0 && (
              <div className="mb-8">
                <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '8px', paddingLeft: '16px' }}>
                  Your recent notes
                </p>
                <div>
                  {recentNotes.map((note) => (
                    <NoteEntry key={note.id} note={note} onOpen={() => onOpenNote?.(note.id)} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
