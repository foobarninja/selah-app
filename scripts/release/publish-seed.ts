// scripts/release/publish-seed.ts
//
// Publishes data/selah-seed.db.xz + data/manifest.json to the
// Hugging Face dataset, atomically enough that the sha256 in the
// manifest always matches the .xz users download.
//
// Failure modes that are now caught before the upload:
//   - missing artifacts → run seed:prepare first
//   - xz sha doesn't match manifest → run seed:prepare first (they drifted)
//   - no HF auth → print install/login instructions, exit non-zero
//
// Usage:  npm run seed:publish
// Repo:   hardcoded below to foooobear/selah-db

import { existsSync, readFileSync, statSync } from 'fs'
import { createHash } from 'crypto'
import { resolve } from 'path'
import { spawnSync } from 'child_process'
import { homedir } from 'os'
import { join } from 'path'

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

function main() {
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

  const token = findHfToken()
  if (!token) {
    bail(
      `no Hugging Face token found. Either:\n` +
      `  - set HF_TOKEN env var, or\n` +
      `  - run \`huggingface-cli login\` (stores token in ~/.cache/huggingface/token)\n` +
      `get a write-scoped token at https://huggingface.co/settings/tokens`,
    )
  }

  console.log(`[publish] repo: ${REPO_ID}`)
  console.log(`[publish] seedVersion: ${manifest.seedVersion} (schema v${manifest.schemaVersion})`)
  console.log(`[publish] sha256:      ${manifest.sha256}`)
  console.log(`[publish] size:        ${(manifest.sizeXz / 1024 / 1024).toFixed(1)} MB`)
  console.log('')

  // Upload .xz FIRST. If this fails, the manifest on HF keeps pointing at
  // the OLD .xz — bad but recoverable. If we uploaded manifest first and
  // then the .xz push failed, users would see our exact "sha mismatch"
  // bug. Order matters for fail-safety.
  upload(XZ_PATH, 'selah-seed.db.xz', token, `Publish seed ${manifest.seedVersion}`)
  upload(MANIFEST_PATH, 'manifest.json', token, `Publish manifest for seed ${manifest.seedVersion}`)

  console.log('')
  console.log(`[publish] done. Users will pick up v${manifest.seedVersion} on next container restart.`)
  console.log(`[publish] dataset: https://huggingface.co/datasets/${REPO_ID}/tree/main`)
}

function upload(localPath: string, pathInRepo: string, token: string, message: string): void {
  console.log(`[publish] uploading ${pathInRepo}...`)
  const res = spawnSync(
    'huggingface-cli',
    [
      'upload',
      '--repo-type', 'dataset',
      '--token', token,
      '--commit-message', message,
      REPO_ID,
      localPath,
      pathInRepo,
    ],
    { stdio: 'inherit' },
  )
  if (res.status !== 0) {
    bail(`huggingface-cli upload failed for ${pathInRepo} (exit ${res.status})`)
  }
}

main()
