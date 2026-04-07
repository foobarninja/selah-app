import Database from 'better-sqlite3'

function getDb() {
  const dbUrl = process.env.DATABASE_URL ?? 'file:./data/selah.db'
  return new Database(dbUrl.replace('file:', ''))
}

export function runJournalMigration(): void {
  const db = getDb()
  try {
    const now = new Date().toISOString()
    const existing = db.prepare('SELECT id FROM journals WHERE id = ?').get('default')
    if (!existing) {
      db.prepare(`
        INSERT INTO journals (id, name, description, journal_type, is_default, sort_order, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `).run('default', 'Personal Study', 'Your default study journal', 'study', 1, 0, now, now)
    }
    db.prepare(`UPDATE user_notes SET journal_id = 'default' WHERE journal_id IS NULL`).run()
  } finally {
    db.close()
  }
}
