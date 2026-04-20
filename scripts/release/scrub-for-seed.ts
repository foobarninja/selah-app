// scripts/release/scrub-for-seed.ts
//
// Produces a release-safe copy of data/selah.db with all user-local
// rows wiped. Runs BEFORE seed:prepare so the published artifact never
// carries a self-hoster's profiles, API keys, chats, notes, reading
// history, etc.
//
// Output: data/selah-seed-src.db
// Source: data/selah.db (read-only — not modified)
//
// Usage:
//   npx tsx scripts/release/scrub-for-seed.ts
//   SELAH_DB_PATH=some/other/selah.db npx tsx scripts/release/scrub-for-seed.ts
//
// The seed:prepare step reads from SELAH_SEED_SRC (default: selah-seed-src.db
// if present, else selah.db) so the flow is scrub → prepare → publish.

import Database from 'better-sqlite3'
import { existsSync, rmSync, statSync } from 'fs'
import { resolve } from 'path'
import { USER_LOCAL_TABLES } from '../../src/lib/seed/user-tables'

const SRC = process.env.SELAH_DB_PATH ?? resolve(process.cwd(), 'data/selah.db')
const DEST = resolve(process.cwd(), 'data/selah-seed-src.db')

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`[scrub] source not found: ${SRC}`)
    process.exit(1)
  }

  for (const p of [DEST, `${DEST}-wal`, `${DEST}-shm`]) {
    if (existsSync(p)) {
      console.log(`[scrub] removing stale ${p}`)
      rmSync(p)
    }
  }

  console.log(`[scrub] source: ${SRC} (${fmtMB(statSync(SRC).size)})`)
  console.log(`[scrub] step 1/3: online backup -> ${DEST}`)

  const src = new Database(SRC, { readonly: true, fileMustExist: true })
  try {
    await src.backup(DEST)
  } finally {
    src.close()
  }

  console.log(`[scrub] step 2/3: wipe user-local tables`)
  const dst = new Database(DEST)
  try {
    dst.pragma('journal_mode = DELETE')
    dst.pragma('foreign_keys = OFF')
    const tx = dst.transaction(() => {
      for (const table of USER_LOCAL_TABLES) {
        const exists = dst
          .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`)
          .get(table) as { name: string } | undefined
        if (!exists) {
          console.log(`[scrub]   ${table} absent — skipping`)
          continue
        }
        const before = (dst.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n
        dst.prepare(`DELETE FROM ${table}`).run()
        console.log(`[scrub]   ${table}: wiped ${before} row(s)`)
      }
    })
    tx()

    console.log(`[scrub] step 3/3: VACUUM`)
    dst.exec('VACUUM')
  } finally {
    dst.close()
  }

  console.log(`[scrub] done. ${DEST} (${fmtMB(statSync(DEST).size)})`)
  console.log(`[scrub] next: SELAH_SEED_SRC=${DEST} npm run seed:prepare`)
}

void main()
