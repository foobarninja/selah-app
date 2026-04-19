// src/lib/seed/user-tables.ts
//
// Single source of truth for which tables hold user-local data (preserved
// across seed updates) vs seed-owned content (overwritten on update).
//
// Invariants:
//   - User-local tables are additive-only. Columns may be ADDED between
//     seed versions, but NEVER removed or retyped. The release preflight
//     enforces this (see scripts/release/publish-manifest.ts).
//   - New user-local tables can be introduced in a seed version; the
//     merge engine tolerates tables that exist in the new seed but not
//     in the user's old DB (see scripts/ops/apply-seed-update.ts).

/**
 * Tables whose rows belong to the user. The seed-update merge engine
 * copies these from the old DB into the new seed before atomic swap.
 *
 * Note: ai_providers and ai_models are classified as user-local because
 * self-hosters add custom providers/models here. Catalog refreshes in the
 * seed will not overwrite user additions. If this becomes a pain point,
 * we can switch to an additive merge (keep-both-on-conflict) later.
 */
export const USER_LOCAL_TABLES: readonly string[] = [
  'app_settings',
  'ai_providers',
  'ai_models',
  'journals',
  'user_notes',
  'user_note_anchors',
  'user_note_themes',
  'user_note_tags',
  'user_tags',
  'user_bookmarks',
  'user_collections',
  'user_collection_items',
  'reading_history',
  'devotional_history',
  'ai_conversations',
  'ai_messages',
  'study_projects',
  'study_assembly_items',
] as const

/**
 * Tables whose rows ship from the seed and are safe to overwrite.
 * Used by the merge engine only for a sanity check (warn on any table
 * found in the old DB that's neither content nor user-local — catches
 * the "I added a user table but forgot to register it" mistake).
 */
export const SEED_CONTENT_TABLES: readonly string[] = [
  'translations',
  'books',
  'verses',
  'footnotes',
  'strongs_entries',
  'strongs_verse_map',
  'cross_references',
  'commentary_sources',
  'commentary_entries',
  'characters',
  'character_relationships',
  'character_appearances',
  'themes',
  'passage_themes',
  'locations',
  'climate_contexts',
  'passage_climate',
  'narrative_units',
  'devotional_tags',
  'devotionals',
  'devotional_series',
  'devotional_tag_map',
] as const

export function isUserLocalTable(name: string): boolean {
  return (USER_LOCAL_TABLES as readonly string[]).includes(name)
}

export function isSeedContentTable(name: string): boolean {
  return (SEED_CONTENT_TABLES as readonly string[]).includes(name)
}

/**
 * FTS5 virtual tables and internal SQLite housekeeping — neither
 * seed content nor user data; skipped entirely by the merge engine.
 */
export function isInternalTable(name: string): boolean {
  return (
    name.startsWith('sqlite_') ||
    name.endsWith('_fts') ||
    name.endsWith('_fts_data') ||
    name.endsWith('_fts_idx') ||
    name.endsWith('_fts_content') ||
    name.endsWith('_fts_docsize') ||
    name.endsWith('_fts_config') ||
    name === '_prisma_migrations'
  )
}
