// scripts/release/publish-seed.ts
//
// Publishes data/selah-seed.db.xz + data/manifest.json to the
// Hugging Face dataset, atomically enough that the sha256 in the
// manifest always matches the .xz users download.
//
// Uses @huggingface/hub (pure JS, transparent via npm install) rather
// than shelling out to huggingface-cli — no Python dependency on
// maintainer machines.
//
// Failure modes that are caught before the upload:
//   - missing artifacts → run seed:prepare first
//   - xz sha doesn't match manifest → run seed:prepare first (they drifted)
//   - no HF token → print token-creation URL and exit non-zero
//
// Usage:  HF_TOKEN=... npm run seed:publish
// Repo:   hardcoded below to foooobear/selah-db

import { existsSync, readFileSync, statSync } from 'fs'
import { createHash } from 'crypto'
import { resolve, join } from 'path'
import { homedir } from 'os'
import { uploadFiles } from '@huggingface/hub'
import { config as loadDotenv } from 'dotenv'

// Load .env BEFORE reading process.env.HF_TOKEN. Windows npm shims don't
// reliably forward exported shell env vars to child Node processes, so
// `.env` is the most portable way to make the token available.
loadDotenv({ path: resolve(process.cwd(), '.env'), quiet: true })

const REPO_ID = 'foooobear/selah-db'
const XZ_PATH = resolve(process.cwd(), 'data/selah-seed.db.xz')
const MANIFEST_PATH = resolve(process.cwd(), 'data/manifest.json')

interface Manifest {
  seedVersion: string
  schemaVersion: number
  sha256: string
  sizeXz: number
  downloadUrl: string
}

function sha256(path: string): string {
  return createHash('sha256').update(readFileSync(path)).digest('hex')
}

function findHfToken(): string | null {
  // Priority: CLI flag > env > ~/.cache/huggingface/token
  const argvIdx = process.argv.indexOf('--token')
  if (argvIdx !== -1 && process.argv[argvIdx + 1]) return process.argv[argvIdx + 1]
  if (process.env.HF_TOKEN) return process.env.HF_TOKEN
  for (const p of [
    join(homedir(), '.cache', 'huggingface', 'token'),
    join(homedir(), '.huggingface', 'token'),
    process.env.APPDATA ? join(process.env.APPDATA, 'huggingface', 'token') : '',
  ].filter(Boolean)) {
    if (existsSync(p)) {
      const t = readFileSync(p, 'utf8').trim()
      if (t.length > 0) return t
    }
  }
  return null
}

function bail(msg: string): never {
  console.error(`[publish] ${msg}`)
  process.exit(1)
}

/** Build a File-like object that streams from disk, for @huggingface/hub.
 *  Full buffering a 71 MB file is fine on a maintainer laptop but streaming
 *  is cleaner and future-proofs for larger seeds. */
function fileFromDisk(path: string, name: string): Blob {
  // Read into a single Blob. For 70-80 MB this is fine in Node. If the
  // seed ever crosses ~500 MB, switch to a lazy stream-backed blob.
  const buf = readFileSync(path)
  return new Blob([buf], { type: 'application/octet-stream' })
}

async function main() {
  if (!existsSync(XZ_PATH)) {
    bail(`missing ${XZ_PATH} — run \`npm run seed:prepare\` first`)
  }
  if (!existsSync(MANIFEST_PATH)) {
    bail(`missing ${MANIFEST_PATH} — run \`npm run seed:prepare\` first`)
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as Manifest
  const actualSha = sha256(XZ_PATH)
  if (actualSha !== manifest.sha256) {
    bail(
      `sha drift: manifest says ${manifest.sha256} but local .xz is ${actualSha}.\n` +
      `            These files were produced by different seed:prepare runs.\n` +
      `            Run \`npm run seed:prepare\` to regenerate them together, then retry.`,
    )
  }

  const actualSize = statSync(XZ_PATH).size
  if (actualSize !== manifest.sizeXz) {
    bail(`size mismatch: manifest says ${manifest.sizeXz}, local .xz is ${actualSize}`)
  }

  const accessToken = findHfToken()
  if (!accessToken) {
    bail(
      `no Hugging Face token found. Use any of:\n` +
      `  - npm run seed:publish -- --token hf_xxx   (most reliable on Windows)\n` +
      `  - HF_TOKEN=hf_xxx in a .env file at the repo root\n` +
      `  - save a token to ~/.cache/huggingface/token\n` +
      `Get a WRITE-scoped token at https://huggingface.co/settings/tokens`,
    )
  }

  console.log(`[publish] repo:        ${REPO_ID}`)
  console.log(`[publish] seedVersion: ${manifest.seedVersion} (schema v${manifest.schemaVersion})`)
  console.log(`[publish] sha256:      ${manifest.sha256}`)
  console.log(`[publish] size:        ${(manifest.sizeXz / 1024 / 1024).toFixed(1)} MB`)
  console.log('')

  // Single commit with BOTH files — atomic on HF's side, so users never
  // see a manifest pointing at a missing/stale .xz mid-upload.
  console.log('[publish] uploading selah-seed.db.xz + manifest.json (single commit)...')
  await uploadFiles({
    repo: { type: 'dataset', name: REPO_ID },
    accessToken,
    commitTitle: `Publish seed ${manifest.seedVersion}`,
    files: [
      { path: 'selah-seed.db.xz', content: fileFromDisk(XZ_PATH, 'selah-seed.db.xz') },
      { path: 'manifest.json', content: fileFromDisk(MANIFEST_PATH, 'manifest.json') },
    ],
  })

  console.log('')
  console.log(`[publish] done. Users will pick up v${manifest.seedVersion} on next container restart.`)
  console.log(`[publish] dataset: https://huggingface.co/datasets/${REPO_ID}/tree/main`)
}

main().catch((err) => {
  const msg = err instanceof Error ? err.message : String(err)
  bail(`upload failed: ${msg}`)
})
