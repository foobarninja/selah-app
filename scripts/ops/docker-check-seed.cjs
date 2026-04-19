// scripts/ops/docker-check-seed.cjs
//
// Plain-Node version of check-seed-update.ts for the Docker entrypoint.
// No TS, no tsx, no external deps beyond Node built-ins. Keep in sync
// with scripts/ops/check-seed-update.ts.
//
// Log-only. Never blocks startup. Auto-apply is not supported in this
// container path — Docker users run apply via `docker compose run`.

'use strict'

const fs = require('fs')
const path = require('path')

const MANIFEST_URL =
  'https://huggingface.co/datasets/foooobear/selah-db/resolve/main/manifest.json'
const LOCAL_VERSION_FILE = 'data/.seed-version'
const APP_SCHEMA_VERSION = 1
const TIMEOUT_MS = 5000

async function main() {
  const cwd = process.cwd()
  const dbPath = path.resolve(cwd, 'data/selah.db')
  const versionPath = path.resolve(cwd, LOCAL_VERSION_FILE)

  if (!fs.existsSync(dbPath)) return // nothing to compare yet

  const remote = await fetchManifest()
  if (!remote) return

  const local = readLocalVersion(versionPath)

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
        `See README for how to update (user data preserved).`,
    )
  } else if (local >= remote.seedVersion) {
    console.log(`[seed-check] local seed v${local} is current`)
  } else {
    console.log(
      `[seed-check] update available: v${local} -> v${remote.seedVersion} ` +
        `(${fmtMB(remote.sizeXz)} download). See README for how to update.`,
    )
  }
}

async function fetchManifest() {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(MANIFEST_URL, { signal: controller.signal })
    if (!res.ok) {
      console.log(`[seed-check] manifest unavailable (HTTP ${res.status}); skipping`)
      return null
    }
    return await res.json()
  } catch (err) {
    const msg = err && err.message ? err.message : String(err)
    console.log(`[seed-check] manifest fetch failed (${msg}); skipping`)
    return null
  } finally {
    clearTimeout(timer)
  }
}

function readLocalVersion(p) {
  if (!fs.existsSync(p)) return null
  const raw = fs.readFileSync(p, 'utf8').trim()
  return raw.length > 0 ? raw : null
}

function fmtMB(bytes) {
  if (!bytes) return '?'
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

main().catch((err) => {
  console.log(`[seed-check] unexpected error: ${err && err.message ? err.message : String(err)}`)
  // Never block container startup.
  process.exit(0)
})
