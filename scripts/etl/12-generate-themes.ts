// 12-generate-themes.ts — Insert pre-baked Layer 2B theme taxonomy
import { db, heading, log } from './db'
import type { ThemeRecord } from './data/theme-types'

import { themesVirtuesEmotions } from './data/themes-virtues-emotions'
import { themesDoctrineRelationship } from './data/themes-doctrine-relationship'
import { themesConditionActionAttribute } from './data/themes-condition-action-attribute'

const ALL_THEMES: ThemeRecord[] = [
  ...themesVirtuesEmotions,
  ...themesDoctrineRelationship,
  ...themesConditionActionAttribute,
]

function main(): void {
  heading('Importing Layer 2B — Theme Taxonomy')
  log(`${ALL_THEMES.length} themes to insert`)

  const insert = db.prepare(`
    INSERT OR REPLACE INTO themes (
      id, name, category, parent_theme_id, definition,
      modern_framing, related_themes, source_tier
    ) VALUES (
      @id, @name, @category, @parentThemeId, @definition,
      @modernFraming, @relatedThemes, @sourceTier
    )
  `)

  const batchInsert = db.transaction((themes: ThemeRecord[]) => {
    for (const t of themes) {
      insert.run(t)
    }
  })

  // Check for duplicate IDs
  const ids = ALL_THEMES.map(t => t.id)
  const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
  if (dupes.length > 0) {
    log(`⚠ Duplicate IDs found: ${dupes.join(', ')}`)
    log('Aborting. Fix duplicates before importing.')
    db.close()
    process.exit(1)
  }

  // Validate parent references
  const idSet = new Set(ids)
  const badParents = ALL_THEMES.filter(t => t.parentThemeId && !idSet.has(t.parentThemeId))
  if (badParents.length > 0) {
    log(`⚠ Invalid parent references:`)
    for (const t of badParents) {
      log(`  ${t.id} -> ${t.parentThemeId}`)
    }
    log('Aborting. Fix parent references before importing.')
    db.close()
    process.exit(1)
  }

  batchInsert(ALL_THEMES)

  const count = (db.prepare('SELECT COUNT(*) as c FROM themes').get() as { c: number }).c
  log(`✓ ${count} themes now in database`)

  // Summary by category
  const byCat = db.prepare('SELECT category, COUNT(*) as c FROM themes GROUP BY category ORDER BY c DESC').all() as { category: string; c: number }[]
  for (const row of byCat) {
    log(`  ${row.category}: ${row.c}`)
  }

  // Top-level vs child
  const topLevel = (db.prepare('SELECT COUNT(*) as c FROM themes WHERE parent_theme_id IS NULL').get() as { c: number }).c
  const children = count - topLevel
  log(`  top-level: ${topLevel}, children: ${children}`)

  db.close()
}

main()
