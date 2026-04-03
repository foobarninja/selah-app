'use client'

import type { SourceTier } from './types'

const tierConfig: Record<number, { bg: string; text: string; dot: string; label: string; dashed?: boolean }> = {
  1: { bg: '#FBF3E0', text: '#7A5C1F', dot: '#C6A23C', label: 'Canon' },
  2: { bg: '#EFF8F6', text: '#2B6B5A', dot: '#4A9E88', label: 'Scholarship' },
  3: { bg: '#F5F5ED', text: '#5A5D3C', dot: '#8A8E64', label: 'Historical' },
  4: { bg: '#EEF2F7', text: '#4A6380', dot: '#6B91B5', label: 'AI-assisted' },
  5: { bg: '#FAF0E6', text: '#8B6B3E', dot: '#C9A96E', label: 'Conjecture', dashed: true },
}

interface TierPillProps {
  tier: SourceTier
}

export function TierPill({ tier }: TierPillProps) {
  const config = tierConfig[tier]
  if (!config) return null

  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{
        padding: '3px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 500,
        fontFamily: "var(--selah-font-body, 'Source Sans 3', sans-serif)",
        backgroundColor: config.bg,
        color: config.text,
        border: config.dashed ? `1px dashed ${config.dot}` : 'none',
      }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: config.dot,
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  )
}
