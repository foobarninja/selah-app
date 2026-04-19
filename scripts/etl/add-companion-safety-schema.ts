// scripts/etl/add-companion-safety-schema.ts
//
// Idempotent migration for companion safety.
//
// Adds:
//   user_profiles.child_lock, .locked_provider, .locked_model, .audit_policy
//   ai_messages.flag_level, .flag_source, .flag_reviewed_at
//   ai_conversations.has_flagged_messages
// Plus two partial indexes to keep audit listing queries cheap.

import Database from 'better-sqlite3'
import { resolve } from 'path'

const DB_PATH = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')

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

function addColumn(db: Database.Database, table: string, column: string, ddl: string): void {
  if (!tableExists(db, table)) {
    console.log(`[migration]   ${table} doesn't exist — skipping`)
    return
  }
  if (columnExists(db, table, column)) {
    console.log(`[migration]   ${table}.${column} exists — skipping`)
    return
  }
  console.log(`[migration]   adding ${table}.${column}`)
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`)
}

function migrate(db: Database.Database): void {
  console.log('[migration] companion-safety schema additions')

  // user_profiles child-lock + audit columns
  addColumn(db, 'user_profiles', 'child_lock', `INTEGER NOT NULL DEFAULT 0`)
  addColumn(db, 'user_profiles', 'locked_provider', `TEXT`)
  addColumn(db, 'user_profiles', 'locked_model', `TEXT`)
  addColumn(db, 'user_profiles', 'audit_policy', `TEXT NOT NULL DEFAULT 'none'`)

  // ai_messages flag columns
  addColumn(db, 'ai_messages', 'flag_level', `TEXT`)
  addColumn(db, 'ai_messages', 'flag_source', `TEXT`)
  addColumn(db, 'ai_messages', 'flag_reviewed_at', `TEXT`)

  // ai_conversations denormalized flag
  addColumn(db, 'ai_conversations', 'has_flagged_messages', `INTEGER NOT NULL DEFAULT 0`)

  // Partial indexes for audit dashboard queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_ai_messages_flag_level ON ai_messages(flag_level) WHERE flag_level IS NOT NULL`)
  console.log('[migration] ensured idx_ai_messages_flag_level')
  db.exec(`CREATE INDEX IF NOT EXISTS idx_ai_conversations_flagged ON ai_conversations(user_id, has_flagged_messages) WHERE has_flagged_messages = 1`)
  console.log('[migration] ensured idx_ai_conversations_flagged')
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
