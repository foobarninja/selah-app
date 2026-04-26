// scripts/release/prepare-seed-db.ts
//
// Prepares data/selah-seed.db.xz and manifest.json for upload to
// Hugging Face.
//
// Steps:
//   1. Online-backup data/selah.db -> data/selah-seed.db (consistent snapshot,
//      safe even with concurrent writers; pulls in any WAL-pending pages).
//   2. VACUUM the backup to reclaim free pages.
//   3. Preflight: verify user-local tables are additive-only relative to
//      the previous published seed (checked against data/selah-seed-prev.db
//      if present; skipped otherwise).
//   4. xz -9 -T 0 --keep -> data/selah-seed.db.xz.
//   5. Write data/manifest.json with version, sha256, sizes, URL.
//
// Usage:
//   npx tsx scripts/release/prepare-seed-db.ts [seedVersion]
// Defaults seedVersion to today's date (YYYY.MM.DD) if omitted.

import Database from 'better-sqlite3'
import { createHash } from 'crypto'
import { existsSync, rmSync, statSync, readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { spawnSync } from 'child_process'
import { APP_SCHEMA_VERSION } from '../../src/lib/seed/manifest'
import { USER_LOCAL_TABLES } from '../../src/lib/seed/user-tables'

// Prefer the scrubbed copy produced by scripts/release/scrub-for-seed.ts so
// a careless invocation of seed:prepare can't ship raw user data. Fall back
// to data/selah.db only if the scrubbed copy is absent (new-repo case —
// first-ever release where USER_LOCAL_TABLES are already empty).
const SCRUBBED = resolve(process.cwd(), 'data/selah-seed-src.db')
const RAW = resolve(process.cwd(), 'data/selah.db')
const SRC = process.env.SELAH_SEED_SRC
  ? resolve(process.cwd(), process.env.SELAH_SEED_SRC)
  : (existsSync(SCRUBBED) ? SCRUBBED : RAW)
const DEST = resolve(process.cwd(), 'data/selah-seed.db')
const DEST_XZ = `${DEST}.xz`
const PREV = resolve(process.cwd(), 'data/selah-seed-prev.db')
const MANIFEST_PATH = resolve(process.cwd(), 'data/manifest.json')
const DOWNLOAD_URL = 'https://huggingface.co/datasets/foooobear/selah-db/resolve/main/selah-seed.db.xz'

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function sha256(path: string): string {
  const h = createHash('sha256')
  h.update(readFileSync(path))
  return h.digest('hex')
}

function resolveXzBinary(): string {
  // On Windows, `xz` is often not on the PowerShell PATH even when it is
  // available in Git Bash's mingw64 bundle. Prefer an explicit path when
  // we can find one so `npm run seed:prepare` works from PowerShell too.
  if (process.platform === 'win32') {
    const candidates = [
      'C:/Program Files/Git/mingw64/bin/xz.exe',
      'C:/Program Files/Git/usr/bin/xz.exe',
    ]
    for (const c of candidates) {
      if (existsSync(c)) return c
    }
  }
  return 'xz'
}

function todayVersion(): string {
  const d = new Date()
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

function preflightAdditiveOnly(): string[] {
  // Verify user-local tables have not had columns removed relative to
  // the previously published seed. Skipped if no prev snapshot is present.
  if (!existsSync(PREV)) {
    console.log(`[release] preflight: no ${PREV} baseline found — skipping additive-only check`)
    return []
  }
  const violations: string[] = []
  const db = new Database(DEST)
  try {
    db.prepare(`ATTACH DATABASE ? AS prev`).run(PREV)
    try {
      const oldTables = new Set(
        (db.prepare(`SELECT name FROM prev.sqlite_master WHERE type='table'`).all() as Array<{ name: string }>)
          .map((r) => r.name),
      )
      const newTables = new Set(
        (db.prepare(`SELECT name FROM main.sqlite_master WHERE type='table'`).all() as Array<{ name: string }>)
          .map((r) => r.name),
      )
      for (const t of USER_LOCAL_TABLES) {
        if (!oldTables.has(t)) continue
        if (!newTables.has(t)) {
          violations.push(`table "${t}" was removed`)
          continue
        }
        const prevCols = new Set(
          (db.prepare(`SELECT name FROM pragma_table_info(?, 'prev')`).all(t) as Array<{ name: string }>)
            .map((r) => r.name),
        )
        const currCols = new Set(
          (db.prepare(`SELECT name FROM pragma_table_info(?, 'main')`).all(t) as Array<{ name: string }>)
            .map((r) => r.name),
        )
        for (const c of prevCols) {
          if (!currCols.has(c)) violations.push(`column "${t}.${c}" was removed`)
        }
      }
    } finally {
      db.prepare(`DETACH DATABASE prev`).run()
    }
  } finally {
    db.close()
  }
  return violations
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`[release] source not found: ${SRC}`)
    process.exit(1)
  }

  if (SRC === RAW) {
    console.warn(`[release] WARNING: reading from ${RAW} (the raw dev DB).`)
    console.warn(`[release] Run \`npm run seed:scrub\` first to strip user-local rows`)
    console.warn(`[release] or ensure this DB has no personal data before continuing.`)
  } else {
    console.log(`[release] using scrubbed source: ${SRC}`)
  }

  const seedVersion = process.argv[2] ?? todayVersion()
  console.log(`[release] seedVersion: ${seedVersion} (schemaVersion: ${APP_SCHEMA_VERSION})`)

  // Clean stale artifacts.
  for (const p of [DEST, `${DEST}-wal`, `${DEST}-shm`, DEST_XZ, MANIFEST_PATH]) {
    if (existsSync(p)) {
      console.log(`[release] removing stale ${p}`)
      rmSync(p)
    }
  }

  console.log(`[release] source: ${SRC} (${fmtMB(statSync(SRC).size)})`)
  console.log(`[release] step 1/5: online backup -> ${DEST}`)

  const src = new Database(SRC, { readonly: true, fileMustExist: true })
  try {
    await src.backup(DEST)
  } finally {
    src.close()
  }

  console.log(`[release] step 2/5: VACUUM`)
  const dst = new Database(DEST)
  try {
    dst.pragma('journal_mode = DELETE')
    dst.exec('VACUUM')
  } finally {
    dst.close()
  }
  const rawSize = statSync(DEST).size
  console.log(`[release]   uncompressed: ${fmtMB(rawSize)}`)

  console.log(`[release] step 3/5: preflight (additive-only check)`)
  const violations = preflightAdditiveOnly()
  if (violations.length > 0) {
    console.error(`[release] PREFLIGHT FAILED — user-local tables must be additive-only:`)
    for (const v of violations) console.error(`  - ${v}`)
    console.error(`[release] Add columns/tables in a new seed, never remove. Aborting.`)
    process.exit(1)
  }

  console.log(`[release] step 4/5: xz -9 -T 0 --keep`)
  const xzBin = resolveXzBinary()
  const xz = spawnSync(xzBin, ['-9', '-T', '0', '--keep', '--force', DEST], {
    stdio: 'inherit',
  })
  if (xz.error) {
    console.error(`[release] xz failed to launch: ${xz.error.message}`)
    console.error(`[release] install xz or ensure it's on PATH; on Windows, Git Bash ships xz at`)
    console.error(`[release]   C:\\Program Files\\Git\\mingw64\\bin\\xz.exe`)
    process.exit(1)
  }
  if (xz.status !== 0) {
    console.error(`[release] xz exited with status ${xz.status}`)
    process.exit(1)
  }

  console.log(`[release] step 5/5: sha256 + manifest.json`)
  const xzSize = statSync(DEST_XZ).size
  const xzHash = sha256(DEST_XZ)
  const rawHash = sha256(DEST)

  const manifest = {
    seedVersion,
    schemaVersion: APP_SCHEMA_VERSION,
    sha256: xzHash,
    sizeXz: xzSize,
    sizeRaw: rawSize,
    releasedAt: new Date().toISOString(),
    downloadUrl: DOWNLOAD_URL,
  }
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n', 'utf8')

  console.log('')
  console.log('── Release artifacts ──')
  console.log(`  ${DEST}`)
  console.log(`    size:   ${fmtMB(rawSize)} (${rawSize} bytes)`)
  console.log(`    sha256: ${rawHash}`)
  console.log(`  ${DEST_XZ}`)
  console.log(`    size:   ${fmtMB(xzSize)} (${xzSize} bytes)`)
  console.log(`    sha256: ${xzHash}`)
  console.log(`  ${MANIFEST_PATH}`)
  console.log('')
  console.log('Next: upload BOTH files to')
  console.log('  https://huggingface.co/datasets/foooobear/selah-db')
  console.log('    - selah-seed.db.xz (the DB)')
  console.log('    - manifest.json    (the version pointer existing installs fetch)')
  console.log('')
  console.log(`Tip: keep a copy of this seed as ${PREV} before the next release —`)
  console.log(`     the preflight uses it to catch accidental column removals.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
