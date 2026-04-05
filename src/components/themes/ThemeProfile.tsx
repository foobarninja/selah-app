'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { TierPill } from '@/components/reader/TierPill'
import type {
  ThemeProfile as ThemeProfileType,
  ThemePassage,
  ConnectedCharacter,
  RelatedTheme,
  TraceSegment,
} from './types'
import type { SourceTier } from '@/components/reader/types'

/* ── Fonts ── */
const font = {
  display: "var(--selah-font-display, 'Cormorant Garamond', serif)",
  body: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
}

/* ── Era labels ── */
const eraLabels: Record<string, string> = {
  patriarchal: 'Patriarchal',
  exodus: 'Exodus',
  judges: 'Judges',
  monarchy: 'Monarchy',
  exile: 'Exile',
  'life-of-christ': 'Life of Christ',
  'early-church': 'Early Church',
}

/* ── Trace bar: 66-book density map ── */
function TraceBar({ segments }: { segments: TraceSegment[] }) {
  const [hoveredBook, setHoveredBook] = useState<string | null>(null)
  const maxCount = Math.max(...segments.map((s) => s.count), 1)

  return (
    <div className="mb-8">
      <div
        className="flex rounded-md overflow-hidden relative"
        style={{ height: '40px', gap: '1px' }}
      >
        {segments.map((seg) => {
          const intensity = seg.count / maxCount
          let bg = 'transparent'
          if (seg.count > 0 && intensity <= 0.25) bg = 'var(--selah-teal-50, #EFF8F6)'
          else if (intensity <= 0.5) bg = 'var(--selah-teal-200, #93CBBD)'
          else if (intensity <= 0.75) bg = 'var(--selah-teal-400, #4A9E88)'
          else if (intensity > 0.75) bg = 'var(--selah-teal-800, #1A4539)'

          return (
            <div
              key={seg.book}
              className="flex-1 relative transition-opacity duration-100"
              style={{
                backgroundColor: bg,
                opacity: hoveredBook && hoveredBook !== seg.book ? 0.4 : 1,
                cursor: seg.count > 0 ? 'pointer' : 'default',
              }}
              onMouseEnter={() => setHoveredBook(seg.book)}
              onMouseLeave={() => setHoveredBook(null)}
            >
              {hoveredBook === seg.book && (
                <div
                  className="absolute z-10 rounded-md shadow-lg whitespace-nowrap pointer-events-none"
                  style={{
                    bottom: 'calc(100% + 6px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 10px',
                    backgroundColor: 'var(--selah-bg-elevated, #292524)',
                    border: '1px solid var(--selah-border-color, #3D3835)',
                    fontSize: '11px',
                    fontFamily: font.body,
                    color: 'var(--selah-text-1, #E8E2D9)',
                  }}
                >
                  {seg.book} {seg.count > 0 && `\u00b7 ${seg.count}`}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        <span style={{ fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)', letterSpacing: '0.5px' }}>Genesis</span>
        <span style={{ fontFamily: font.body, fontSize: '10px', color: 'var(--selah-text-3, #6E695F)', letterSpacing: '0.5px' }}>Revelation</span>
      </div>
    </div>
  )
}

/* ── Passage entry ── */
function PassageEntry({ passage, onNavigate }: { passage: ThemePassage; onNavigate?: () => void }) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline gap-3 mb-1">
        <button
          onClick={onNavigate}
          className="transition-colors duration-150"
          style={{
            fontFamily: font.body, fontSize: '14px', fontWeight: 600,
            color: 'var(--selah-teal-400, #4A9E88)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            textDecoration: 'underline', textUnderlineOffset: '2px',
            textDecorationColor: 'transparent',
          }}
          onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecorationColor = 'var(--selah-teal-400)' }}
          onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecorationColor = 'transparent' }}
        >
          {passage.passageRef}
        </button>
        <span style={{ fontFamily: font.display, fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: 'var(--selah-text-2, #A39E93)' }}>
          {passage.passageTitle}
        </span>
      </div>
      <p style={{ fontFamily: font.body, fontSize: '13px', lineHeight: 1.7, color: 'var(--selah-text-2, #A39E93)', marginBottom: '6px' }}>
        {passage.annotation}
      </p>
      <TierPill tier={passage.sourceTier as SourceTier} />
    </div>
  )
}

/* ── Era group ── */
function EraGroup({ era, passages, onNavigatePassage }: { era: string; passages: ThemePassage[]; onNavigatePassage?: (ref: string) => void }) {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-3"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span style={{ width: '2px', height: '14px', borderRadius: '1px', backgroundColor: 'var(--selah-teal-400, #4A9E88)', flexShrink: 0 }} />
        <span style={{ fontFamily: font.display, fontSize: '16px', fontWeight: 600, color: 'var(--selah-text-1, #E8E2D9)' }}>
          {eraLabels[era] || era}
        </span>
        <span style={{ fontFamily: font.body, fontSize: '11px', color: 'var(--selah-text-3, #6E695F)' }}>
          {passages.length}
        </span>
        {isOpen
          ? <ChevronDown size={14} style={{ color: 'var(--selah-text-3)' }} />
          : <ChevronRight size={14} style={{ color: 'var(--selah-text-3)' }} />
        }
      </button>
      {isOpen && (
        <div className="pl-4">
          {passages.map((passage) => (
            <PassageEntry
              key={passage.id}
              passage={passage}
              onNavigate={() => onNavigatePassage?.(passage.passageRef)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Connected character row ── */
function CharacterRow({ character, onOpen }: { character: ConnectedCharacter; onOpen?: () => void }) {
  return (
    <div className="mb-3">
      <div className="flex items-baseline gap-2">
        <button
          onClick={onOpen}
          className="transition-colors duration-150"
          style={{
            fontFamily: font.body, fontSize: '14px', fontWeight: 600,
            color: 'var(--selah-terra-400, #C47A63)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          {character.name}
        </button>
        <span style={{
          fontFamily: font.body, fontSize: '11px', fontWeight: 500,
          color: 'var(--selah-text-3, #6E695F)',
          textTransform: 'uppercase', letterSpacing: '0.5px',
        }}>
          {eraLabels[character.era] || character.era}
        </span>
      </div>
      <p style={{ fontFamily: font.body, fontSize: '13px', lineHeight: 1.6, color: 'var(--selah-text-2, #A39E93)' }}>
        {character.annotation}
      </p>
    </div>
  )
}

/* ── Related theme pill ── */
function RelatedPill({ theme, onOpen }: { theme: RelatedTheme; onOpen?: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="transition-opacity duration-150 hover:opacity-80"
      style={{
        display: 'inline-flex', alignItems: 'center',
        padding: '4px 14px', borderRadius: '12px',
        fontSize: '13px', fontWeight: 500, fontFamily: font.body,
        backgroundColor: 'var(--selah-teal-800, #1A4539)',
        color: 'var(--selah-teal-200, #93CBBD)',
        border: 'none', cursor: 'pointer',
      }}
    >
      {theme.name}
    </button>
  )
}

/* ════════════════════════════════════════════
   Main ThemeProfile Component
   ════════════════════════════════════════════ */

interface ThemeProfileProps {
  profile: ThemeProfileType
  onBack?: () => void
  onNavigatePassage?: (passageRef: string) => void
  onOpenCharacter?: (characterId: string) => void
  onOpenRelatedTheme?: (themeId: string) => void
}

export function ThemeProfileView({
  profile,
  onBack,
  onNavigatePassage,
  onOpenCharacter,
  onOpenRelatedTheme,
}: ThemeProfileProps) {
  const eraOrder = ['patriarchal', 'exodus', 'judges', 'monarchy', 'exile', 'life-of-christ', 'early-church']
  const passageEras = eraOrder.filter((era) => profile.passages[era]?.length > 0)

  return (
    <div className="h-full overflow-y-auto" style={{ padding: '28px 32px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-6 transition-colors duration-150"
          style={{
            fontFamily: font.body, fontSize: '13px', fontWeight: 500,
            color: 'var(--selah-text-3, #6E695F)',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back
        </button>

        {/* Name */}
        <h1 style={{
          fontFamily: font.display, fontWeight: 300, fontSize: '36px',
          letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '4px',
        }}>
          {profile.name}
        </h1>

        {/* Category */}
        <span style={{
          fontFamily: font.body, fontSize: '11px', fontWeight: 500,
          textTransform: 'uppercase', letterSpacing: '1px',
          color: 'var(--selah-teal-400, #4A9E88)',
        }}>
          {profile.category.replace(/-/g, ' ')}
        </span>

        {/* Modern framing */}
        <p style={{
          fontFamily: font.body, fontSize: '16px', lineHeight: 1.8,
          color: 'var(--selah-text-1, #E8E2D9)',
          marginTop: '20px', marginBottom: '16px',
        }}>
          {profile.modernFraming}
        </p>

        {/* Scholarly definition */}
        <p style={{
          fontFamily: font.body, fontSize: '14px', lineHeight: 1.7,
          color: 'var(--selah-text-3, #6E695F)',
          marginBottom: '28px', paddingLeft: '16px',
          borderLeft: '2px solid var(--selah-border-color, #3D3835)',
        }}>
          {profile.scholarlyDefinition}
        </p>

        {/* Trace bar */}
        <TraceBar segments={profile.traceSegments} />

        {/* Passages by era */}
        <div className="mb-10">
          <h2 className="flex items-center gap-2 mb-5" style={{
            fontFamily: font.display, fontSize: '20px', fontWeight: 400,
            color: 'var(--selah-text-1, #E8E2D9)',
          }}>
            <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-teal-400, #4A9E88)' }} />
            Passages
          </h2>
          {passageEras.map((era) => (
            <EraGroup
              key={era}
              era={era}
              passages={profile.passages[era]}
              onNavigatePassage={onNavigatePassage}
            />
          ))}
        </div>

        {/* Connected characters */}
        {profile.connectedCharacters.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-5" style={{
              fontFamily: font.display, fontSize: '20px', fontWeight: 400,
              color: 'var(--selah-text-1, #E8E2D9)',
            }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-terra-400, #C47A63)' }} />
              Who embodies this
            </h2>
            {profile.connectedCharacters.map((char) => (
              <CharacterRow
                key={char.characterId}
                character={char}
                onOpen={() => onOpenCharacter?.(char.characterId)}
              />
            ))}
          </div>
        )}

        {/* Related themes */}
        {profile.relatedThemes.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-4" style={{
              fontFamily: font.display, fontSize: '20px', fontWeight: 400,
              color: 'var(--selah-text-1, #E8E2D9)',
            }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-teal-400, #4A9E88)' }} />
              Related threads
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.relatedThemes.map((theme) => (
                <RelatedPill key={theme.id} theme={theme} onOpen={() => onOpenRelatedTheme?.(theme.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Child themes */}
        {profile.childThemes.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-4" style={{
              fontFamily: font.display, fontSize: '20px', fontWeight: 400,
              color: 'var(--selah-text-1, #E8E2D9)',
            }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-teal-400, #4A9E88)' }} />
              Sub-themes
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.childThemes.map((child) => (
                <RelatedPill key={child.id} theme={child} onOpen={() => onOpenRelatedTheme?.(child.id)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
