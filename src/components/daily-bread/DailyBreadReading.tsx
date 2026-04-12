'use client'

import { useState } from 'react'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import type { Devotional, AudienceLevel } from './types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

const audienceLabels: Record<string, string> = {
  'young-children': 'Young children',
  family: 'Family',
  teens: 'Teens',
  adults: 'Adults',
}

function AudiencePopover({ current, onSelect, onClose }: { current: AudienceLevel; onSelect: (level: AudienceLevel) => void; onClose: () => void }) {
  const levels: AudienceLevel[] = ['young-children', 'family', 'teens', 'adults']
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute z-20 rounded-lg shadow-xl" style={{ top: 'calc(100% + 4px)', left: 0, backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '4px', minWidth: '160px' }}>
        {levels.map((level) => (
          <button key={level} onClick={() => { onSelect(level); onClose() }} className="block w-full text-left rounded-md transition-colors duration-100" style={{ padding: '8px 12px', fontFamily: font.body, fontSize: '13px', fontWeight: level === current ? 600 : 400, color: level === current ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--selah-bg-elevated, #292524)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}>
            {audienceLabels[level]}
          </button>
        ))}
      </div>
    </>
  )
}

function RatingDots({ value, onChange }: { value: number | null; onChange: (rating: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} onClick={() => onChange(n)} className="rounded-full transition-all duration-150" style={{ width: '24px', height: '24px', backgroundColor: value !== null && n <= value ? 'var(--selah-gold-500, #C6A23C)' : 'var(--selah-border-color, #3D3835)', border: 'none', cursor: 'pointer' }} />
      ))}
    </div>
  )
}

interface DailyBreadReadingProps {
  devotional: Devotional
  currentAudienceLevel: AudienceLevel
  onBack?: () => void
  onOverrideAudience?: (level: AudienceLevel) => void
  onNavigatePassage?: (bookId: string, chapter: number) => void
  onComplete?: (notes: string, rating: number | null) => void
  onDismissCloseOut?: () => void
}

export function DailyBreadReading({ devotional, currentAudienceLevel, onBack, onOverrideAudience, onNavigatePassage, onComplete, onDismissCloseOut }: DailyBreadReadingProps) {
  const [showAudiencePopover, setShowAudiencePopover] = useState(false)
  const [notes, setNotes] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => { onComplete?.(notes, rating); setCompleted(true) }

  if (completed) {
    return (
      <div className="h-full flex items-center justify-center" style={{ padding: '40px 32px' }}>
        <div className="text-center" style={{ maxWidth: '400px' }}>
          <p style={{ fontFamily: font.display, fontSize: '28px', fontWeight: 300, fontStyle: 'italic', color: 'var(--selah-text-1, #E8E2D9)', lineHeight: 1.5, marginBottom: '24px' }}>Today&rsquo;s bread was broken.</p>
          <button onClick={onBack} style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Back to Daily Bread</button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '40px 32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="flex items-center gap-2 transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <ArrowLeft size={16} strokeWidth={1.5} />Back
          </button>
          <div className="relative">
            <button onClick={() => setShowAudiencePopover(!showAudiencePopover)} className="flex items-center gap-2 transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '12px', fontWeight: 500, padding: '4px 12px', borderRadius: '12px', backgroundColor: 'var(--selah-gold-50, #FBF3E0)', color: 'var(--selah-gold-700, #7A5C1F)', border: 'none', cursor: 'pointer' }}>
              {audienceLabels[currentAudienceLevel]}
              <span className="flex items-center gap-1" style={{ color: 'var(--selah-gold-500, #C6A23C)' }}>&middot; <Clock size={10} strokeWidth={1.5} /> {devotional.estimatedMinutes} min</span>
            </button>
            {showAudiencePopover && (<AudiencePopover current={currentAudienceLevel} onSelect={(level) => onOverrideAudience?.(level)} onClose={() => setShowAudiencePopover(false)} />)}
          </div>
        </div>

        <h1 style={{ fontFamily: font.display, fontWeight: 300, fontSize: '32px', lineHeight: 1.3, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '6px' }}>{devotional.title}</h1>
        <p style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 400, fontStyle: 'italic', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '36px' }}>{devotional.passageRef}</p>

        <div className="mb-10">
          <p style={{ fontFamily: font.body, fontSize: '19px', lineHeight: 2.1, color: 'var(--selah-text-1, #E8E2D9)' }}>{devotional.passage}</p>
        </div>

        <div className="mb-10">
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '10px' }}>What&rsquo;s happening here</p>
          <p style={{ fontFamily: font.body, fontSize: '16px', lineHeight: 1.8, color: 'var(--selah-text-2, #A39E93)' }}>{devotional.contextBrief}</p>
        </div>

        <div className="rounded-xl mb-10" style={{ backgroundColor: 'var(--selah-bg-elevated, #292524)', padding: '24px 28px', borderLeft: '3px solid var(--selah-gold-500, #C6A23C)' }}>
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-gold-500, #C6A23C)', marginBottom: '12px' }}>Around the table</p>
          <p style={{ fontFamily: font.display, fontSize: '18px', fontWeight: 400, lineHeight: 1.7, color: 'var(--selah-text-1, #E8E2D9)' }}>{devotional.modernMoment}</p>
        </div>

        <div className="mb-10">
          <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '12px' }}>Conversation starters</p>
          <ul className="space-y-4">
            {devotional.conversationStarters.map((q, i) => (
              <li key={i} className="flex gap-3" style={{ fontFamily: font.body, fontSize: '16px', lineHeight: 1.7, color: 'var(--selah-text-1, #E8E2D9)' }}>
                <span className="shrink-0 mt-2 rounded-full" style={{ width: '6px', height: '6px', backgroundColor: 'var(--selah-gold-500, #C6A23C)' }} />{q}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-12">
          <button onClick={() => onNavigatePassage?.(devotional.bookId, devotional.chapter)} className="flex items-center gap-3 w-full text-left rounded-lg transition-colors duration-150" style={{ padding: '14px 18px', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', cursor: 'pointer' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-gold-300, #E8C767)' }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--selah-border-color, #3D3835)' }}>
            <div className="flex-1">
              <p style={{ fontFamily: font.body, fontSize: '10px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--selah-text-3, #6E695F)', marginBottom: '4px' }}>Going deeper</p>
              <p style={{ fontFamily: font.body, fontSize: '14px', color: 'var(--selah-text-2, #A39E93)', lineHeight: 1.5 }}>{devotional.goingDeeper.prompt}</p>
            </div>
            <ChevronRight size={16} strokeWidth={1.5} style={{ color: 'var(--selah-text-3, #6E695F)', flexShrink: 0 }} />
          </button>
        </div>

        <div className="rounded-xl mb-8" style={{ backgroundColor: 'var(--selah-bg-elevated, #292524)', padding: '24px 28px' }}>
          <p style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '16px' }}>How did it go?</p>
          <div className="mb-5"><RatingDots value={rating} onChange={setRating} /></div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything worth remembering from tonight?" rows={2} className="w-full outline-none resize-none rounded-lg mb-5" style={{ fontFamily: font.body, fontSize: '14px', lineHeight: 1.6, color: 'var(--selah-text-1, #E8E2D9)', backgroundColor: 'var(--selah-bg-surface, #1C1917)', border: '1px solid var(--selah-border-color, #3D3835)', padding: '12px 14px' }} />
          <div className="flex items-center gap-4">
            <button onClick={handleComplete} className="transition-colors duration-150" style={{ fontFamily: font.body, fontSize: '14px', fontWeight: 600, padding: '8px 20px', borderRadius: '8px', backgroundColor: 'var(--selah-gold-500, #C6A23C)', color: '#fff', border: 'none', cursor: 'pointer' }}>Done</button>
            <button onClick={onDismissCloseOut} style={{ fontFamily: font.body, fontSize: '13px', fontWeight: 500, color: 'var(--selah-text-3, #6E695F)', background: 'none', border: 'none', cursor: 'pointer' }}>Skip</button>
          </div>
        </div>
      </div>
    </div>
  )
}
