// Shared database client for ETL scripts
// Uses better-sqlite3 directly for bulk operations (faster than Prisma for ETL)
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import Database from 'better-sqlite3'

const __filename = fileURLToPath(import.meta.url)
const __etlDir = dirname(__filename)
const PROJECT_ROOT = resolve(__etlDir, '..', '..')
const dbPath = resolve(PROJECT_ROOT, 'data', 'selah.db')

export const db = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

export const DATA_DIR = resolve(PROJECT_ROOT, 'data', 'sources')

export function log(msg: string): void {
  console.log(`  ${msg}`)
}

export function heading(msg: string): void {
  console.log(`\n═══ ${msg} ═══`)
}
