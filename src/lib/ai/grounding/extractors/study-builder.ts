import { getProject, getProjectItems } from '@/lib/study-builder/queries'
import type { StudyBuilderContext } from '../../types'

const MAX_ITEMS = 15

export async function extractStudyBuilderContext(ctx: StudyBuilderContext): Promise<string> {
  const { projectId } = ctx

  const [project, items] = await Promise.all([
    getProject(projectId),
    getProjectItems(projectId),
  ])

  if (!project) return ''

  const parts: string[] = []

  // ── Header ────────────────────────────────────────────────────────────────
  parts.push(`## Study Project: "${project.topic}"`)
  parts.push(`Format: ${project.format} | Last saved: ${project.lastSaved}`)

  // ── Assembly items ────────────────────────────────────────────────────────
  if (items.length === 0) {
    parts.push('\n*No items assembled yet.*')
    return parts.join('\n')
  }

  parts.push(`\n### Assembled Items (${items.length} total)`)

  const displayItems = items.slice(0, MAX_ITEMS)
  for (const item of displayItems) {
    const tierLabel = `Tier ${item.sourceTier}`
    parts.push(`\n**[${item.entityType}]** ${item.title} *(${tierLabel})*`)
    if (item.preview) {
      parts.push(`  ${item.preview}`)
    }
    if (item.annotation) {
      parts.push(`  *Note: ${item.annotation}*`)
    }
  }

  if (items.length > MAX_ITEMS) {
    parts.push(`\n*(${items.length - MAX_ITEMS} more items not shown)*`)
  }

  return parts.join('\n')
}
