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

import { existsSync } from 'fs'
import { resolve } from 'path'
import {
  APP_MIN_SEED_SCHEMA,
  APP_SCHEMA_VERSION,
  LOCAL_VERSION_FILE,
  MANIFEST_URL,
  compareSeedVersions,
  readLocalSeedState,
  type LocalSeedState,
  type SeedManifest,
} from '../../src/lib/seed/manifest'

const TIMEOUT_MS = 5_000

async function main() {
  const dbPath = resolve(process.cwd(), 'data/selah.db')
  const versionPath = resolve(process.cwd(), LOCAL_VERSION_FILE)

  if (!existsSync(dbPath)) {
    console.log('[seed-check] no local database — see README for initial download')
    return
  }

  const local: LocalSeedState | null = readLocalSeedState(versionPath)

  // Downward compat check: is the local seed too old for this app code?
  // Runs regardless of network availability; reaches the user even if HF
  // is down. Fail-soft: log and proceed, don't block boot.
  if (local && local.schemaVersion < APP_MIN_SEED_SCHEMA) {
    console.warn(
      `[seed-check] WARNING: local seed schemaVersion ${local.schemaVersion} is below this app's minimum (${APP_MIN_SEED_SCHEMA}). ` +
      `Expect errors until you update — run \`npm run seed:update\` to sync.`,
    )
  }

  const remote = await fetchManifest()
  if (!remote) return // already logged

  if (remote.schemaVersion > APP_SCHEMA_VERSION) {
    console.warn(
      `[seed-check] remote seed v${remote.seedVersion} requires app schemaVersion ${remote.schemaVersion}, ` +
      `this app supports ${APP_SCHEMA_VERSION}. Upgrade the app before updating the seed.`,
    )
    return
  }

  if (local === null) {
    console.log(
      `[seed-check] local seed is unversioned; latest on Hugging Face is v${remote.seedVersion}. ` +
      `Run \`npm run seed:update\` to sync (user data preserved).`,
    )
  } else if (compareSeedVersions(local.seedVersion, remote.seedVersion) >= 0) {
    console.log(`[seed-check] local seed v${local.seedVersion} (schema ${local.schemaVersion}) is current`)
    return
  } else {
    console.log(
      `[seed-check] update available: v${local.seedVersion} → v${remote.seedVersion} ` +
      `(${remote.sizeXz ? fmtMB(remote.sizeXz) : '?'} download). ` +
      `Run \`npm run seed:update\` to apply.`,
    )
  }

  if (process.env.SELAH_AUTO_UPDATE_SEED === '1') {
    const shouldApply = local === null || compareSeedVersions(local.seedVersion, remote.seedVersion) < 0
    if (!shouldApply) return

    console.log('[seed-check] SELAH_AUTO_UPDATE_SEED=1 — applying now...')
    try {
      const { applySeedUpdate } = await import('./apply-seed-update')
      await applySeedUpdate({ manifest: remote })
      console.log('[seed-check] auto-apply complete')
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error(`[seed-check] AUTO-APPLY FAILED: ${msg}`)
      console.error(`[seed-check] Your live DB was not modified. Boot will continue on the existing seed.`)
    }
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

function fmtMB(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

main().catch((err) => {
  console.log(`[seed-check] unexpected error: ${err instanceof Error ? err.message : String(err)}`)
  // Never block app startup on check failure.
  process.exit(0)
})
