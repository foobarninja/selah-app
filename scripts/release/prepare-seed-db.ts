// scripts/release/prepare-seed-db.ts
//
// Prepares data/selah-seed.db.xz for upload to Hugging Face.
//
// Steps:
//   1. Online-backup data/selah.db -> data/selah-seed.db (consistent snapshot,
//      safe even with concurrent writers; pulls in any WAL-pending pages).
//   2. VACUUM the backup to reclaim free pages.
//   3. xz -9 -T 0 --keep -> data/selah-seed.db.xz.
//   4. Print sizes and sha256 for upload verification.
//
// Usage: npx tsx scripts/release/prepare-seed-db.ts

import Database from 'better-sqlite3'
import { createHash } from 'crypto'
import { existsSync, rmSync, statSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { spawnSync } from 'child_process'

const SRC = resolve(process.cwd(), 'data/selah.db')
const DEST = resolve(process.cwd(), 'data/selah-seed.db')
const DEST_XZ = `${DEST}.xz`

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function sha256(path: string): string {
  const h = createHash('sha256')
  h.update(readFileSync(path))
  return h.digest('hex')
}

async function main() {
  if (!existsSync(SRC)) {
    console.error(`[release] source not found: ${SRC}`)
    process.exit(1)
  }

  // Clean stale artifacts.
  for (const p of [DEST, `${DEST}-wal`, `${DEST}-shm`, DEST_XZ]) {
    if (existsSync(p)) {
      console.log(`[release] removing stale ${p}`)
      rmSync(p)
    }
  }

  console.log(`[release] source: ${SRC} (${fmtMB(statSync(SRC).size)})`)
  console.log(`[release] step 1/4: online backup -> ${DEST}`)

  const src = new Database(SRC, { readonly: true, fileMustExist: true })
  try {
    await src.backup(DEST)
  } finally {
    src.close()
  }

  console.log(`[release] step 2/4: VACUUM`)
  const dst = new Database(DEST)
  try {
    dst.pragma('journal_mode = DELETE')
    dst.exec('VACUUM')
  } finally {
    dst.close()
  }
  const rawSize = statSync(DEST).size
  console.log(`[release]   uncompressed: ${fmtMB(rawSize)}`)

  console.log(`[release] step 3/4: xz -9 -T 0 --keep`)
  const xz = spawnSync('xz', ['-9', '-T', '0', '--keep', '--force', DEST], {
    stdio: 'inherit',
  })
  if (xz.status !== 0) {
    console.error('[release] xz failed')
    process.exit(1)
  }

  console.log(`[release] step 4/4: sha256`)
  const xzSize = statSync(DEST_XZ).size
  const xzHash = sha256(DEST_XZ)
  const rawHash = sha256(DEST)

  console.log('')
  console.log('── Release artifacts ──')
  console.log(`  ${DEST}`)
  console.log(`    size:   ${fmtMB(rawSize)} (${rawSize} bytes)`)
  console.log(`    sha256: ${rawHash}`)
  console.log(`  ${DEST_XZ}`)
  console.log(`    size:   ${fmtMB(xzSize)} (${xzSize} bytes)`)
  console.log(`    sha256: ${xzHash}`)
  console.log('')
  console.log('Next: upload data/selah-seed.db.xz to')
  console.log('  https://huggingface.co/datasets/foooobear/selah-db')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
