// scripts/ops/check-seed-update.ts
//
// Startup-time check: does Hugging Face have a newer seed than what's
// installed locally? Log-only by default. Opt-in auto-apply via env var.
//
// Usage:
//   npx tsx scripts/ops/check-seed-update.ts          # check + log
//   SELAH_AUTO_UPDATE_SEED=1 npx tsx ...              # check + apply if newer
//
// This script is wired into `npm run predev` / `npm run prestart` so it
// runs before the app boots. Network failures are non-fatal — we prefer
// starting the app offline over blocking on an HF hiccup.

import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { APP_SCHEMA_VERSION, LOCAL_VERSION_FILE, MANIFEST_URL, compareSeedVersions, type SeedManifest } from '../../src/lib/seed/manifest'

const TIMEOUT_MS = 5_000

async function main() {
  const dbPath = resolve(process.cwd(), 'data/selah.db')
  const versionPath = resolve(process.cwd(), LOCAL_VERSION_FILE)

  if (!existsSync(dbPath)) {
    console.log('[seed-check] no local database — see README for initial download')
    return
  }

  const remote = await fetchManifest()
  if (!remote) return // already logged

  const localVersion = readLocalVersion(versionPath)

  if (remote.schemaVersion > APP_SCHEMA_VERSION) {
    console.warn(
      `[seed-check] remote seed v${remote.seedVersion} requires app schemaVersion ${remote.schemaVersion}, ` +
      `this app supports ${APP_SCHEMA_VERSION}. Upgrade the app before updating the seed.`,
    )
    return
  }

  if (localVersion === null) {
    console.log(
      `[seed-check] local seed is unversioned; latest on Hugging Face is v${remote.seedVersion}. ` +
      `Run \`npm run seed:update\` to sync (user data preserved).`,
    )
  } else if (compareSeedVersions(localVersion, remote.seedVersion) >= 0) {
    console.log(`[seed-check] local seed v${localVersion} is current`)
    return
  } else {
    console.log(
      `[seed-check] update available: v${localVersion} → v${remote.seedVersion} ` +
      `(${remote.sizeXz ? fmtMB(remote.sizeXz) : '?'} download). ` +
      `Run \`npm run seed:update\` to apply.`,
    )
  }

  if (process.env.SELAH_AUTO_UPDATE_SEED === '1') {
    console.log('[seed-check] SELAH_AUTO_UPDATE_SEED=1 — applying now...')
    const { applySeedUpdate } = await import('./apply-seed-update')
    await applySeedUpdate({ manifest: remote })
  }
}

async function fetchManifest(): Promise<SeedManifest | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(MANIFEST_URL, { signal: controller.signal })
    if (!res.ok) {
      console.log(`[seed-check] manifest unavailable (HTTP ${res.status}); skipping`)
      return null
    }
    return (await res.json()) as SeedManifest
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.log(`[seed-check] manifest fetch failed (${msg}); skipping`)
    return null
  } finally {
    clearTimeout(timer)
  }
}

function readLocalVersion(path: string): string | null {
  if (!existsSync(path)) return null
  const raw = readFileSync(path, 'utf8').trim()
  return raw.length > 0 ? raw : null
}

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

main().catch((err) => {
  console.log(`[seed-check] unexpected error: ${err instanceof Error ? err.message : String(err)}`)
  // Never block app startup on check failure.
  process.exit(0)
})
