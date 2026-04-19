// scripts/ops/apply-seed-update.ts
//
// Downloads the latest seed, merges user-local tables from the current DB
// into it, and atomically swaps it in. Creates a timestamped backup.
//
// Usage:
//   npx tsx scripts/ops/apply-seed-update.ts
//
// Also importable: `applySeedUpdate({ manifest })` for the auto-update path.

import { createWriteStream, existsSync, renameSync, statSync, writeFileSync, readFileSync, unlinkSync } from 'fs'
import { createHash } from 'crypto'
import { resolve } from 'path'
import { spawnSync } from 'child_process'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'
import { LOCAL_VERSION_FILE, MANIFEST_URL, writeLocalSeedState, type SeedManifest } from '../../src/lib/seed/manifest'
import { mergeUserData } from '../../src/lib/seed/merge-engine'

interface ApplyOptions {
  manifest?: SeedManifest
  /** Skip the download step and use this local .db file as the "fresh seed".
   *  Used by integration tests and for manual recovery from a local copy. */
  localFreshSeedPath?: string
}

export async function applySeedUpdate(opts: ApplyOptions = {}): Promise<void> {
  const cwd = process.cwd()
  const dbPath = resolve(cwd, 'data/selah.db')
  const versionPath = resolve(cwd, LOCAL_VERSION_FILE)

  if (!existsSync(dbPath)) {
    throw new Error(`no local database at ${dbPath}; run the initial download from the README first`)
  }

  const manifest = opts.manifest ?? (await fetchManifest())
  console.log(`[seed-update] target: v${manifest.seedVersion} (schema v${manifest.schemaVersion}, ${fmtMB(manifest.sizeXz)} .xz)`)

  // 1. Acquire a fresh seed file.
  const stagedRawPath = resolve(cwd, 'data/selah.incoming.db')
  cleanupPath(stagedRawPath)
  if (opts.localFreshSeedPath) {
    console.log(`[seed-update] using local fresh seed: ${opts.localFreshSeedPath}`)
    // Copy via streaming to handle large files.
    const buf = readFileSync(opts.localFreshSeedPath)
    writeFileSync(stagedRawPath, buf)
  } else {
    const stagedXzPath = resolve(cwd, 'data/selah.incoming.db.xz')
    cleanupPath(stagedXzPath)
    console.log(`[seed-update] downloading ${manifest.downloadUrl}`)
    await downloadTo(manifest.downloadUrl, stagedXzPath)

    const actualSize = statSync(stagedXzPath).size
    if (actualSize !== manifest.sizeXz) {
      throw new Error(`downloaded size ${actualSize} != manifest sizeXz ${manifest.sizeXz}`)
    }
    const actualSha = sha256(stagedXzPath)
    if (actualSha !== manifest.sha256) {
      throw new Error(`sha256 mismatch: expected ${manifest.sha256}, got ${actualSha}`)
    }
    console.log(`[seed-update] sha256 verified`)

    console.log(`[seed-update] decompressing`)
    const xz = spawnSync('xz', ['-d', '-f', stagedXzPath], { stdio: 'inherit' })
    if (xz.status !== 0) throw new Error('xz decompress failed')
    // xz -d removes the .xz and leaves data/selah.incoming.db
  }

  // 2. Merge user-local tables from the live DB into the staged fresh seed.
  console.log(`[seed-update] merging user-local tables`)
  const report = mergeUserData(dbPath, stagedRawPath)
  for (const t of report.tablesMerged) {
    console.log(`[seed-update]   ${t.name}: ${t.rowsCopied} rows`)
  }
  if (report.tablesSkippedMissingInOld.length > 0) {
    console.log(`[seed-update]   skipped (not in old DB): ${report.tablesSkippedMissingInOld.join(', ')}`)
  }
  if (report.tablesWithAddedColumns.length > 0) {
    for (const t of report.tablesWithAddedColumns) {
      console.log(`[seed-update]   added columns on ${t.name}: ${t.addedColumns.join(', ')}`)
    }
  }
  if (report.unknownTablesInOld.length > 0) {
    console.warn(`[seed-update] WARNING: unknown tables in old DB: ${report.unknownTablesInOld.join(', ')}`)
  }
  if (report.orphanRows.length > 0) {
    for (const o of report.orphanRows) {
      console.warn(`[seed-update] WARNING: ${o.count} orphan row(s) in ${o.table} reference missing ${o.target}`)
    }
  }

  // 3. Atomic swap with backup.
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const backupPath = resolve(cwd, `data/selah.pre-update-${stamp}.db.bak`)
  console.log(`[seed-update] backing up current DB -> ${backupPath}`)
  // Remove WAL/SHM from current DB before rename — they belong to the old file.
  for (const sidecar of ['data/selah.db-wal', 'data/selah.db-shm']) {
    const p = resolve(cwd, sidecar)
    if (existsSync(p)) unlinkSync(p)
  }
  renameSync(dbPath, backupPath)
  renameSync(stagedRawPath, dbPath)
  writeLocalSeedState(versionPath, {
    seedVersion: manifest.seedVersion,
    schemaVersion: manifest.schemaVersion,
  })

  console.log(`[seed-update] done. local version now v${manifest.seedVersion}`)
  console.log(`[seed-update] previous DB preserved at ${backupPath} — delete when you're happy`)
}

async function fetchManifest(): Promise<SeedManifest> {
  const res = await fetch(MANIFEST_URL)
  if (!res.ok) throw new Error(`manifest fetch failed: HTTP ${res.status}`)
  return (await res.json()) as SeedManifest
}

async function downloadTo(url: string, destPath: string): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`)
  if (!res.body) throw new Error(`download returned no body`)
  await pipeline(Readable.fromWeb(res.body as unknown as import('stream/web').ReadableStream), createWriteStream(destPath))
}

function sha256(path: string): string {
  const h = createHash('sha256')
  h.update(readFileSync(path))
  return h.digest('hex')
}

function cleanupPath(p: string): void {
  if (existsSync(p)) unlinkSync(p)
}

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// CLI entry
const isMain = (() => {
  try {
    return process.argv[1] && resolve(process.argv[1]) === resolve(__filename)
  } catch {
    return false
  }
})()

if (isMain) {
  applySeedUpdate().catch((err) => {
    console.error(`[seed-update] FAILED: ${err instanceof Error ? err.message : String(err)}`)
    console.error(`[seed-update] Your live DB was not modified.`)
    process.exit(1)
  })
}
