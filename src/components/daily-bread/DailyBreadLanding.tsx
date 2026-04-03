'use client'

import { useState } from 'react'
import { Wheat, Clock } from 'lucide-react'
import type {
  DailyBreadProps,
  MoodTile,
  SeasonalCard,
  DevotionalSummary,
  DevotionalHistory,
  DailyBreadTab,
} from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

/* ── Mood tile warm color palette ── */
const moodColors: Record<string, { bg: string; hover: string }> = {
  weight: { bg: 'var(--selah-bg-elevated, #292524)', hover: 'var(--selah-terra-800, #5C2D21)' },
  warmth: { bg: 'var(--selah-bg-elevated, #292524)', hover: 'var(--selah-gold-900, #4A3711)' },
  stillness: { bg: 'var(--selah-bg-elevated, #292524)', hover: 'var(--selah-teal-800, #1A4539)' },
}

function MoodTileButton({ tile, onSelect }: { tile: MoodTile; onSelect?: () => void }) {
  const colors = moodColors[tile.category] || moodColors.stillness
  return (
    <button onClick={onSelect} className="w-full text-left rounded-xl transition-all duration-200" style={{ padding: '18px 20px', backgroundColor: colors.bg, border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer', minHeight: '64px' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = colors.hover; (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = colors.bg; (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
      <span style={{ fontFamily: font.body, fontSize: '15px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.4 }}>{tile.label}</span>
    </button>
  )
}

function SeasonalPrompt({ card, onBegin }: { card: SeasonalCard; onBegin?: () => void }) {
  if (!card.isActive) return null
  return (
    <div className="rounded-xl overflow-hidden mb-8" style={{ backgroundColor: 'var(--selah-bg-elevated, #292524)', borderLeft: '4px solid var(--selah-gold-500, #C6A23C)', padding: '24px 28px' }}>
      <div className="flex items-center gap-2 mb-3">
        <Wheat size={14} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)' }} />
        <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-gold-500, #C6A23C)' }}>{card.season} &middot; Week {card.week}</span>
      </div>
      <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, lineHeight: 1.6, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '14px' }}>{card.message}</p>
      <button onClick={onBegin} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, padding: '8px 20px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}>Begin tonight&rsquo;s reading</button>
    </div>
  )
}

function BrowseCard({ devotional, onOpen }: { devotional: DevotionalSummary; onOpen?: () => void }) {
  return (
    <button onClick={onOpen} className="w-full text-left rounded-lg transition-colors duration-150" style={{ padding: '14px 16px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
      <p style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '4px' }}>{devotional.title}</p>
      <div className="flex items-center gap-3">
        <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>{devotional.passageRef}</span>
        <span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)' }}>{devotional.audienceLevel}</span>
        <span className="flex items-center gap-1" style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}><Clock size={10} strokeWidth={1.5} />{devotional.estimatedMinutes} min</span>
        {devotional.seasonalSet !== 'ordinary' && (<span style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, padding: '1px 8px', borderRadius: '8px', backgroundColor: 'var(--selah-warmth-50, #FAF0E6)', color: 'var(--selah-warmth-700, #8B6B3E)', textTransform: 'capitalize' }}>{devotional.seasonalSet}</span>)}
      </div>
    </button>
  )
}

function HistoryEntry({ entry, onOpen }: { entry: DevotionalHistory; onOpen?: () => void }) {
  return (
    <button onClick={onOpen} className="w-full text-left rounded-lg transition-colors duration-150" style={{ padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
      <div className="flex items-baseline justify-between mb-1">
        <p style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 500, color: 'var(--selah-text-1, #E8E2D9)' }}>{entry.title}</p>
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>{entry.date}</span>
      </div>
      <div className="flex items-center gap-1 mb-1.5">
        {[1, 2, 3, 4, 5].map((n) => (<div key={n} className="rounded-full" style={{ width: '8px', height: '8px', backgroundColor: n <= entry.rating ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)' }} />))}
      </div>
      {entry.familyNotes && (<p className="line-clamp-2" style={{ fontFamily: font.body, fontSize: '13px', lineHeight: 1.5, color: 'var(--selah-text-3, #6E695F)', fontStyle: 'italic' }}>{entry.familyNotes}</p>)}
    </button>
  )
}

export function DailyBreadLanding({
  moodTiles, seasonalCard, history, browseDevotionals,
  activeTab: initialTab,
  onSelectMood, onBeginSeasonal, onChangeTab, onOpenDevotional,
}: DailyBreadProps) {
  const [activeTab, setActiveTab] = useState<DailyBreadTab>(initialTab || 'tonight')
  const handleTabChange = (tab: DailyBreadTab) => { setActiveTab(tab); onChangeTab?.(tab) }
  const tabs: { id: DailyBreadTab; label: string }[] = [{ id: 'tonight', label: 'Tonight' }, { id: 'browse', label: 'Browse' }, { id: 'history', label: 'History' }]

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div className="flex items-center gap-3 mb-6">
          <Wheat size={24} strokeWidth={1.5} style={{ color: 'var(--selah-gold-500, #C6A23C)' }} />
          <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '36px', letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)' }}>Daily Bread</h1>
        </div>

        <div className="flex gap-1 mb-8 rounded-lg" style={{ padding: '3px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', display: 'inline-flex' }}>
          {tabs.map((tab) => (<button key={tab.id} onClick={() => handleTabChange(tab.id)} className="transition-all duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, padding: '6px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === tab.id ? 'var(--selah-bg-elevated, #292524)' : 'transparent', color: activeTab === tab.id ? 'var(--selah-text-1, #E8E2D9)' : 'var(--selah-text-3, #6E695F)' }}>{tab.label}</button>))}
        </div>

        {activeTab === 'tonight' && (
          <>
            <SeasonalPrompt card={seasonalCard} onBegin={() => onBeginSeasonal?.(seasonalCard.devotionalId)} />
            <p style={{ fontFamily: font.display, fontSize: '24px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '20px' }}>What&rsquo;s on your mind tonight?</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {moodTiles.map((tile) => (<MoodTileButton key={tile.id} tile={tile} onSelect={() => onSelectMood?.(tile.id)} />))}
            </div>
          </>
        )}

        {activeTab === 'browse' && (
          <div className="space-y-3">
            <p style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '8px' }}>{browseDevotionals.length} devotionals</p>
            {browseDevotionals.map((dev) => (<BrowseCard key={dev.id} devotional={dev} onOpen={() => onOpenDevotional?.(dev.id)} />))}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {history.length === 0 ? (
              <div className="text-center py-16">
                <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px' }}>No bread broken yet</p>
                <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-3, #6E695F)' }}>Your family&rsquo;s reading history will appear here.</p>
              </div>
            ) : (
              history.map((entry) => (<HistoryEntry key={entry.id} entry={entry} onOpen={() => onOpenDevotional?.(entry.devotionalId)} />))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
