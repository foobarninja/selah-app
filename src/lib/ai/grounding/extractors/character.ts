import { getCharacterProfile } from '@/lib/characters/queries'
import type { CharacterContext } from '../../types'

const MAX_APPEARANCES = 8
const MAX_RELATIONSHIPS = 10
const MAX_THEMES = 6

export async function extractCharacterContext(ctx: CharacterContext): Promise<string> {
  const profile = await getCharacterProfile(ctx.characterId)
  if (!profile) return ''

  const parts: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  parts.push(`## Character: ${profile.name}`)
  parts.push(`Era: ${profile.era} | Testament: ${profile.testament.toUpperCase()} | Status: ${profile.socialStatus}`)

  // ── Biography ─────────────────────────────────────────────────────────────
  if (profile.bio) {
    const bio = profile.bio.length > 600 ? profile.bio.slice(0, 600) + '...' : profile.bio
    parts.push(`\n### Biography\n${bio}`)
  }

  // ── Faith journey ─────────────────────────────────────────────────────────
  if (profile.faithJourney) {
    const fj = profile.faithJourney.text
    const excerpt = fj.length > 400 ? fj.slice(0, 400) + '...' : fj
    parts.push(`\n### Faith Journey\n${excerpt}`)
  }

  // ── Modern bridge ─────────────────────────────────────────────────────────
  if (profile.modernBridge) {
    parts.push(`\n### Modern Parallel\n${profile.modernBridge}`)
  }

  // ── Relationships ─────────────────────────────────────────────────────────
  if (profile.relationships.length > 0) {
    parts.push('\n### Key Relationships')
    const rels = profile.relationships.slice(0, MAX_RELATIONSHIPS)
    for (const r of rels) {
      parts.push(`- ${r.characterName} (${r.type}, ${r.group})`)
    }
  }

  // ── Scriptural appearances ────────────────────────────────────────────────
  if (profile.appearances.length > 0) {
    parts.push('\n### Key Appearances')
    const apps = profile.appearances.slice(0, MAX_APPEARANCES)
    for (const a of apps) {
      const detail = [a.passageRef]
      if (a.role) detail.push(`role: ${a.role}`)
      if (a.emotionalState) detail.push(`emotion: ${a.emotionalState}`)
      parts.push(`- ${detail.join(' — ')}`)
    }
    if (profile.appearances.length > MAX_APPEARANCES) {
      parts.push(`*(${profile.appearances.length - MAX_APPEARANCES} more appearances)*`)
    }
  }

  // ── Connected themes ──────────────────────────────────────────────────────
  if (profile.connectedThemes.length > 0) {
    parts.push('\n### Connected Themes')
    const themes = profile.connectedThemes.slice(0, MAX_THEMES)
    for (const t of themes) {
      const note = t.annotation ? `: ${t.annotation}` : ''
      parts.push(`- ${t.name}${note}`)
    }
  }

  return parts.join('\n')
}
