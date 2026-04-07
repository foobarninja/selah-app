import { getThemeProfile } from '@/lib/themes/queries'
import type { ThemeContext } from '../../types'

const MAX_PASSAGES = 8
const MAX_CHARACTERS = 6
const MAX_RELATED = 6

export async function extractThemeContext(ctx: ThemeContext): Promise<string> {
  const profile = await getThemeProfile(ctx.themeId)
  if (!profile) return ''

  const parts: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  parts.push(`## Theme: ${profile.name}`)
  parts.push(`Category: ${profile.category}`)

  // ── Definitions ───────────────────────────────────────────────────────────
  if (profile.modernFraming) {
    parts.push(`\n### Modern Framing\n${profile.modernFraming}`)
  }

  if (profile.scholarlyDefinition) {
    const def = profile.scholarlyDefinition.length > 500
      ? profile.scholarlyDefinition.slice(0, 500) + '...'
      : profile.scholarlyDefinition
    parts.push(`\n### Scholarly Definition\n${def}`)
  }

  // ── Child themes ──────────────────────────────────────────────────────────
  if (profile.childThemes.length > 0) {
    const names = profile.childThemes.map((c) => c.name).join(', ')
    parts.push(`\n### Sub-Themes\n${names}`)
  }

  // ── Related themes ────────────────────────────────────────────────────────
  if (profile.relatedThemes.length > 0) {
    const related = profile.relatedThemes.slice(0, MAX_RELATED).map((t) => t.name).join(', ')
    parts.push(`\n### Related Themes\n${related}`)
  }

  // ── Key passages ──────────────────────────────────────────────────────────
  const allPassages = Object.values(profile.passages).flat()
  if (allPassages.length > 0) {
    parts.push('\n### Key Passages')
    const topPassages = allPassages.slice(0, MAX_PASSAGES)
    for (const p of topPassages) {
      const note = p.annotation ? ` — ${p.annotation}` : ''
      parts.push(`- ${p.passageRef}${note}`)
    }
    const remaining = allPassages.length - topPassages.length
    if (remaining > 0) {
      parts.push(`*(${remaining} more passages)*`)
    }
  }

  // ── Connected characters ──────────────────────────────────────────────────
  if (profile.connectedCharacters.length > 0) {
    parts.push('\n### Connected Characters')
    const chars = profile.connectedCharacters.slice(0, MAX_CHARACTERS)
    for (const c of chars) {
      const note = c.annotation ? ` — ${c.annotation}` : ''
      parts.push(`- ${c.name} (${c.era})${note}`)
    }
  }

  return parts.join('\n')
}
