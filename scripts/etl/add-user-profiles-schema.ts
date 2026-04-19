// scripts/etl/add-user-profiles-schema.ts
//
// Idempotent migration for multi-user profiles.
//
// FROZEN KEY LIST — do not edit after release. New per-profile settings
// added in future versions should write directly to user_settings via
// application code; they don't need a migration. Editing this list
// retroactively would double-migrate on a re-run for existing installs.

import Database from 'better-sqlite3'
import { resolve } from 'path'
import { randomUUID } from 'crypto'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

const USER_LOCAL_TABLES = [
  'ai_conversations',
  'ai_messages',
  'devotional_history',
  'user_notes',
  'user_note_anchors',
  'user_note_themes',
  'user_note_tags',
  'user_tags',
  'user_bookmarks',
  'user_collections',
  'user_collection_items',
  'journals',
  'reading_history',
  'study_projects',
  'study_assembly_items',
] as const

const MIGRATE_TO_USER_SETTINGS = [
  'primary_translation',
  'parallel_translations',
  'commentary_display',
  'daily_bread_audience',
  'theme',
] as const

const DEFAULT_AVATAR_COLOR = '#C6A23C' // selah-gold-500

function tableExists(db: Database.Database, name: string): boolean {
  const row = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`).get(name) as { name: string } | undefined
  return !!row
}

function columnExists(db: Database.Database, table: string, column: string): boolean {
  const row = db
    .prepare(`SELECT COUNT(*) AS n FROM pragma_table_info(?) WHERE name=?`)
    .get(table, column) as { n: number }
  return row.n > 0
}

function migrate(db: Database.Database): void {
  // 1. Create user_profiles
  if (!tableExists(db, 'user_profiles')) {
    console.log('[migration] creating user_profiles...')
    db.exec(`
      CREATE TABLE user_profiles (
        id            TEXT PRIMARY KEY,
        name          TEXT NOT NULL,
        avatar_color  TEXT NOT NULL,
        pin_hash      TEXT,
        is_default    INTEGER NOT NULL DEFAULT 0,
        created_at    TEXT NOT NULL DEFAULT '',
        updated_at    TEXT NOT NULL DEFAULT ''
      );
    `)
  } else {
    console.log('[migration] user_profiles exists — skipping')
  }

  // 1b. Enforce "at most one default profile" at the schema level.
  // Partial unique index: only the row with is_default=1 is unique; all
  // is_default=0 rows are free to coexist.
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_default
    ON user_profiles(is_default) WHERE is_default = 1
  `)
  console.log('[migration] ensured idx_user_profiles_default')

  // 2. Create user_settings
  if (!tableExists(db, 'user_settings')) {
    console.log('[migration] creating user_settings...')
    db.exec(`
      CREATE TABLE user_settings (
        user_id     TEXT NOT NULL,
        key         TEXT NOT NULL,
        value       TEXT NOT NULL,
        updated_at  TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (user_id, key)
      );
    `)
  } else {
    console.log('[migration] user_settings exists — skipping')
  }

  // 3. Ensure default profile exists
  const existing = db.prepare(`SELECT id FROM user_profiles WHERE is_default = 1`).get() as { id: string } | undefined
  let defaultId: string
  if (existing) {
    defaultId = existing.id
    console.log(`[migration] default profile exists (id=${defaultId})`)
  } else {
    defaultId = randomUUID()
    const now = new Date().toISOString()
    db.prepare(`
      INSERT INTO user_profiles (id, name, avatar_color, pin_hash, is_default, created_at, updated_at)
      VALUES (?, 'Profile 1', ?, NULL, 1, ?, ?)
    `).run(defaultId, DEFAULT_AVATAR_COLOR, now, now)
    console.log(`[migration] inserted default profile (id=${defaultId})`)
  }

  // 4. Add user_id column to every user-local table, backfill to default
  for (const table of USER_LOCAL_TABLES) {
    if (!tableExists(db, table)) {
      console.log(`[migration]   ${table} doesn't exist — skipping`)
      continue
    }
    if (!columnExists(db, table, 'user_id')) {
      console.log(`[migration]   adding ${table}.user_id`)
      db.exec(`ALTER TABLE ${table} ADD COLUMN user_id TEXT`)
    }
    const updated = db
      .prepare(`UPDATE ${table} SET user_id = ? WHERE user_id IS NULL`)
      .run(defaultId)
    if (updated.changes > 0) {
      console.log(`[migration]   backfilled ${updated.changes} rows in ${table}`)
    }
    // Index user_id for the per-profile WHERE filter scoping added in Tasks 6-10.
    db.exec(`CREATE INDEX IF NOT EXISTS idx_${table}_user_id ON ${table}(user_id)`)
  }

  // 5. Move the 5 frozen keys from app_settings to user_settings
  //    INSERT OR IGNORE so partial retries don't clobber; then delete.
  const placeholders = MIGRATE_TO_USER_SETTINGS.map(() => '?').join(',')
  const now = new Date().toISOString()
  const moved = db
    .prepare(`
      INSERT OR IGNORE INTO user_settings (user_id, key, value, updated_at)
        SELECT ?, key, value, ?
        FROM app_settings
        WHERE key IN (${placeholders})
    `)
    .run(defaultId, now, ...MIGRATE_TO_USER_SETTINGS)
  if (moved.changes > 0) {
    console.log(`[migration] moved ${moved.changes} settings to user_settings`)
  }
  const deleted = db
    .prepare(`DELETE FROM app_settings WHERE key IN (${placeholders})`)
    .run(...MIGRATE_TO_USER_SETTINGS)
  if (deleted.changes > 0) {
    console.log(`[migration] removed ${deleted.changes} moved rows from app_settings`)
  }
}

function main(): void {
  const db = new Database(DB_PATH)
  try {
    db.pragma('foreign_keys = OFF')
    db.transaction(() => migrate(db))()
    console.log('[migration] committed.')
  } finally {
    db.close()
  }
}

main()
