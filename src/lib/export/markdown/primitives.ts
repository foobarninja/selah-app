import type { SourceTier } from '../constants'
import type { ScriptureVerse } from '../docx/scripture'

/**
 * Build the top-of-file frontmatter block for a Markdown export.
 * Returns a multi-line string; append with `\n` or `join('\n')`.
 */
export function buildFrontmatter(title: string, subtitle?: string): string {
  const lines = [`# ${title}`, `Exported: ${new Date().toISOString().slice(0, 10)}`]
  if (subtitle) {
    lines.splice(1, 0, `*${subtitle}*`, '')
  } else {
    lines.push('')
  }
  return lines.join('\n')
}

/**
 * Build a Scripture quote block in Markdown: blockquoted verses with
 * a translation attribution line.
 */
export function buildScriptureBlockMd(
  verses: ScriptureVerse[],
  translationName: string,
): string {
  if (verses.length === 0) return ''
  const verseLines = verses.map((v) => `> ${v.number} ${v.text}`)
  verseLines.push(`> — *${translationName}*`)
  return verseLines.join('\n')
}

/** Append a tier label to a line of text. */
export function buildTierLabeledLine(text: string, tier: SourceTier): string {
  return `${text} (${tier})`
}
