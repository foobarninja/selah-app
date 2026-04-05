'use client'

import { useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { TierPill } from '@/components/reader/TierPill'
import type {
  CharacterProfile as CharacterProfileType,
  CharacterAppearance,
  CharacterRelationship,
  ConnectedTheme,
  FaithJourney,
  Era,
  RelationshipGroup,
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

/* ── Relationship group config ── */
const groupConfig: Record<string, { label: string; color: string }> = {
  family: { label: 'Family', color: 'var(--selah-terra-400, #C47A63)' },
  allies: { label: 'Allies', color: 'var(--selah-teal-400, #4A9E88)' },
  adversaries: { label: 'Adversaries', color: 'var(--selah-warmth-400, #C9A96E)' },
  other: { label: 'Other', color: 'var(--selah-text-3, #6E695F)' },
}

/* ── Spiritual arc section ── */
function SpiritualArc({
  journey,
}: {
  journey: FaithJourney
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-3 w-full"
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span
          style={{
            width: '3px', height: '18px', borderRadius: '2px',
            backgroundColor: 'var(--selah-gold-500, #C6A23C)', flexShrink: 0,
          }}
        />
        <span style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)', flex: 1, textAlign: 'left' }}>
          Spiritual arc
        </span>
        {isOpen
          ? <ChevronDown size={16} style={{ color: 'var(--selah-text-3, #6E695F)' }} />
          : <ChevronRight size={16} style={{ color: 'var(--selah-text-3, #6E695F)' }} />
        }
      </button>
      {isOpen && (
        <div className="pl-4">
          <p style={{
            fontFamily: font.body, fontSize: '14px', lineHeight: 1.8,
            color: 'var(--selah-text-2, #A39E93)', marginBottom: '8px',
          }}>
            {journey.text}
          </p>
          <TierPill tier={journey.sourceTier as SourceTier} />
        </div>
      )}
    </div>
  )
}

/* ── Timeline entry ── */
function TimelineEntry({
  appearance,
  isLast,
  onNavigate,
}: {
  appearance: CharacterAppearance
  isLast: boolean
  onNavigate?: () => void
}) {
  const roleColors: Record<string, string> = {
    protagonist: 'var(--selah-gold-500, #C6A23C)',
    deuteragonist: 'var(--selah-terra-400, #C47A63)',
    witness: 'var(--selah-teal-400, #4A9E88)',
    bystander: 'var(--selah-text-3, #6E695F)',
    catalyst: 'var(--selah-sage-400, #8A8E64)',
    'referenced figure': 'var(--selah-warmth-400, #C9A96E)',
  }

  const dotColor = roleColors[appearance.role] || 'var(--selah-text-3)'

  return (
    <div
      className="relative"
      style={{
        paddingLeft: '28px',
        paddingBottom: isLast ? '0' : '24px',
        borderLeft: isLast ? '2px solid transparent' : '2px solid var(--selah-border-color, #3D3835)',
        marginLeft: '4px',
      }}
    >
      {/* Dot — positioned on the border line */}
      <div
        className="absolute rounded-full"
        style={{
          left: '-6px',
          top: '6px',
          width: '10px',
          height: '10px',
          backgroundColor: dotColor,
        }}
      />

      {/* Content */}
      <div>
        {/* Passage reference + title */}
        <div className="flex items-baseline gap-2 mb-1">
          <button
            onClick={onNavigate}
            style={{
              fontFamily: font.body, fontSize: '14px', fontWeight: 600,
              color: 'var(--selah-gold-500, #C6A23C)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              textDecoration: 'underline', textUnderlineOffset: '2px',
              textDecorationColor: 'transparent',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecorationColor = 'var(--selah-gold-500)' }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecorationColor = 'transparent' }}
          >
            {appearance.passageRef}
          </button>
          <span style={{ fontFamily: font.display, fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: 'var(--selah-text-2, #A39E93)' }}>
            {appearance.passageTitle}
          </span>
        </div>

        {/* Role badge */}
        <span
          style={{
            display: 'inline-block', marginBottom: '8px',
            fontFamily: font.body, fontSize: '10px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            color: dotColor,
          }}
        >
          {appearance.role}
        </span>

        {/* Emotional state */}
        <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', lineHeight: 1.6, marginBottom: '4px' }}>
          <span style={{ color: 'var(--selah-text-3, #6E695F)' }}>Feeling:</span> {appearance.emotionalState}
        </p>

        {/* Stakes */}
        <p style={{ fontFamily: font.body, fontSize: '13px', color: 'var(--selah-text-2, #A39E93)', lineHeight: 1.6, marginBottom: '6px' }}>
          <span style={{ color: 'var(--selah-text-3, #6E695F)' }}>Stakes:</span> {appearance.stakes}
        </p>

        {/* Modern parallel */}
        <p style={{
          fontFamily: font.body, fontSize: '12px', fontStyle: 'italic', lineHeight: 1.5,
          color: 'var(--selah-modern-bridge, var(--selah-terra-400, #C47A63))',
        }}>
          {appearance.modernParallel}
        </p>

        {/* Source tier */}
        <div className="mt-2">
          <TierPill tier={appearance.sourceTier as SourceTier} />
        </div>
      </div>
    </div>
  )
}

/* ── Relationship row ── */
function RelationshipRow({
  rel,
  onOpen,
}: {
  rel: CharacterRelationship
  onOpen?: () => void
}) {
  const config = groupConfig[rel.group] || groupConfig.other

  return (
    <div className="flex items-center gap-3 py-1.5">
      <button
        onClick={onOpen}
        style={{
          fontFamily: font.body, fontSize: '14px', fontWeight: 500,
          color: config.color,
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}
      >
        {rel.characterName}
      </button>
      <span
        style={{
          fontFamily: font.body, fontSize: '11px', fontWeight: 500,
          padding: '1px 8px', borderRadius: '8px',
          backgroundColor: 'var(--selah-bg-surface, #1C1917)',
          color: 'var(--selah-text-3, #6E695F)',
        }}
      >
        {rel.type}
      </span>
    </div>
  )
}

/* ════════════════════════════════════════════
   Main CharacterProfile Component
   ════════════════════════════════════════════ */

interface CharacterProfileComponentProps {
  profile: CharacterProfileType
  onBack?: () => void
  onNavigatePassage?: (passageRef: string) => void
  onOpenCharacter?: (characterId: string) => void
  onOpenTheme?: (themeId: string) => void
}

export function CharacterProfileView({
  profile,
  onBack,
  onNavigatePassage,
  onOpenCharacter,
  onOpenTheme,
}: CharacterProfileComponentProps) {
  // Group relationships
  const groupOrder: RelationshipGroup[] = ['family', 'allies', 'adversaries', 'other']
  const groupedRels = groupOrder
    .map((g) => ({
      group: g,
      config: groupConfig[g],
      items: profile.relationships.filter((r) => r.group === g),
    }))
    .filter((g) => g.items.length > 0)

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

        {/* ── Profile header ── */}
        <h1 style={{
          fontFamily: font.display, fontWeight: 300, fontSize: '36px',
          letterSpacing: '0.5px', color: 'var(--selah-text-1, #E8E2D9)',
          marginBottom: '4px',
        }}>
          {profile.name}
        </h1>

        {/* Era + status pills */}
        <div className="flex items-center gap-3 mb-5">
          <span style={{
            fontFamily: font.body, fontSize: '11px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '1px',
            color: 'var(--selah-terra-400, #C47A63)',
          }}>
            {eraLabels[profile.era] || profile.era}
          </span>
          <span style={{
            fontFamily: font.body, fontSize: '11px', fontWeight: 500,
            textTransform: 'uppercase', letterSpacing: '0.5px',
            color: 'var(--selah-text-3, #6E695F)',
          }}>
            {profile.socialStatus}
          </span>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: font.body, fontSize: '16px', lineHeight: 1.8,
          color: 'var(--selah-text-1, #E8E2D9)', marginBottom: '16px',
        }}>
          {profile.bio}
        </p>

        {/* Modern bridge */}
        <p style={{
          fontFamily: font.body, fontSize: '14px', fontStyle: 'italic', lineHeight: 1.7,
          color: 'var(--selah-modern-bridge, var(--selah-terra-400, #C47A63))',
          marginBottom: '28px',
        }}>
          {profile.modernBridge}
        </p>

        {/* ── Spiritual arc ── */}
        {profile.faithJourney && (
          <SpiritualArc journey={profile.faithJourney} />
        )}

        {/* ── Appearance timeline ── */}
        <div className="mb-8">
          <h2 className="flex items-center gap-2 mb-5" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
            <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-terra-400, #C47A63)' }} />
            Appearances
            <span style={{ fontFamily: font.body, fontSize: '12px', color: 'var(--selah-text-3, #6E695F)' }}>
              {profile.appearances.length}
            </span>
          </h2>
          <div className="pl-1">
            {profile.appearances.map((app, i) => (
              <TimelineEntry
                key={app.id}
                appearance={app}
                isLast={i === profile.appearances.length - 1}
                onNavigate={() => onNavigatePassage?.(app.passageRef)}
              />
            ))}
          </div>
        </div>

        {/* ── Relationships ── */}
        {groupedRels.length > 0 && (
          <div className="mb-8">
            <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-terra-400, #C47A63)' }} />
              Relationships
            </h2>
            {groupedRels.map(({ group, config, items }) => (
              <div key={group} className="mb-4">
                <p style={{
                  fontFamily: font.body, fontSize: '11px', fontWeight: 500,
                  textTransform: 'uppercase', letterSpacing: '1px',
                  color: config.color, marginBottom: '4px',
                }}>
                  {config.label}
                </p>
                {items.map((rel, idx) => (
                  <RelationshipRow
                    key={`${rel.characterId}-${rel.type}-${idx}`}
                    rel={rel}
                    onOpen={() => onOpenCharacter?.(rel.characterId)}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── Connected themes ── */}
        {profile.connectedThemes.length > 0 && (
          <div className="mb-10">
            <h2 className="flex items-center gap-2 mb-4" style={{ fontFamily: font.display, fontSize: '20px', fontWeight: 400, color: 'var(--selah-text-1, #E8E2D9)' }}>
              <span style={{ width: '3px', height: '18px', borderRadius: '2px', backgroundColor: 'var(--selah-teal-400, #4A9E88)' }} />
              Themes
            </h2>
            {profile.connectedThemes.map((theme) => (
              <div key={theme.themeId} className="mb-3">
                <button
                  onClick={() => onOpenTheme?.(theme.themeId)}
                  style={{
                    fontFamily: font.body, fontSize: '14px', fontWeight: 600,
                    color: 'var(--selah-teal-400, #4A9E88)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    marginBottom: '2px', display: 'block',
                  }}
                >
                  {theme.name}
                </button>
                <p style={{ fontFamily: font.body, fontSize: '13px', lineHeight: 1.6, color: 'var(--selah-text-2, #A39E93)' }}>
                  {theme.annotation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
