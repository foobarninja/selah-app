import * as fs from 'fs/promises'
import * as path from 'path'

const CHECK_INTERVAL_MS = 60 * 60 * 1000 // 1 hour

/**
 * Determine the backups directory.
 * In Docker: /app/backups (mounted volume from docker-compose.yml)
 * In dev: ./backups relative to the project root
 */
function getBackupsDir(): string {
  if (process.env.BACKUPS_DIR) return process.env.BACKUPS_DIR
  // In production Docker: /app/backups (mounted volume)
  // In dev: ./backups relative to cwd
  return process.env.NODE_ENV === 'production' ? '/app/backups' : './backups'
}

/**
 * Check whether today's date differs from the last backup date.
 * Compares YYYY-MM-DD date strings in UTC.
 */
export function shouldRunBackupToday(lastBackupIso: string): boolean {
  if (!lastBackupIso) return true
  const lastDate = lastBackupIso.slice(0, 10) // YYYY-MM-DD
  const today = new Date().toISOString().slice(0, 10)
  return lastDate !== today
}

/**
 * Write a backup buffer to disk as a timestamped .db file.
 * Creates the directory if it doesn't exist.
 * Returns the full path of the written file.
 */
export async function writeBackupToDisk(buffer: Buffer, backupsDir: string): Promise<string> {
  await fs.mkdir(backupsDir, { recursive: true })
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const filename = `selah-backup-${timestamp}.db`
  const filePath = path.join(backupsDir, filename)
  await fs.writeFile(filePath, buffer)
  return filePath
}

/**
 * Delete backup files older than `retentionDays` from the backups directory.
 * Only deletes files matching the `selah-backup-YYYY-MM-DD*.db` pattern.
 * Non-backup files are left untouched.
 */
export async function pruneOldBackups(backupsDir: string, retentionDays: number): Promise<void> {
  let entries: string[]
  try {
    entries = await fs.readdir(backupsDir)
  } catch {
    return // directory doesn't exist yet — nothing to prune
  }

  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - retentionDays)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  const backupPattern = /^selah-backup-(\d{4}-\d{2}-\d{2})/

  for (const entry of entries) {
    const match = entry.match(backupPattern)
    if (!match) continue // skip non-backup files
    const fileDate = match[1]
    if (fileDate < cutoffStr) {
      await fs.unlink(path.join(backupsDir, entry)).catch(() => {})
    }
  }
}

/**
 * Check settings and run a backup if auto-backup is enabled and today's
 * backup hasn't been taken yet. Called every hour by the scheduler.
 */
async function checkAndRunAutoBackup(): Promise<void> {
  try {
    // Dynamic import to avoid circular deps at module load time
    const { getBackupInfo, createBackup } = await import('@/lib/settings/queries')

    const info = await getBackupInfo()
    // Disabled is the common case for users who turned it off — stay silent
    // instead of logging every hour.
    if (!info.autoBackupEnabled) return
    // Already backed up today is normal; log once at startup, skip quietly thereafter.
    if (!shouldRunBackupToday(info.lastBackup)) return

    console.log('[auto-backup] Starting daily backup...')
    const buffer = await createBackup()
    const backupsDir = getBackupsDir()
    const filePath = await writeBackupToDisk(buffer, backupsDir)
    console.log(`[auto-backup] Backup saved: ${filePath}`)

    await pruneOldBackups(backupsDir, info.autoBackupRetentionDays)
    console.log(`[auto-backup] Pruned backups older than ${info.autoBackupRetentionDays} days`)
  } catch (err) {
    console.error('[auto-backup] Failed:', err instanceof Error ? err.message : err)
  }
}

/**
 * HMR-safe: store the interval on globalThis so dev-server module reloads
 * don't stack multiple intervals. Without this guard, each HMR reload
 * would create a new interval while the old one kept firing.
 */
interface GlobalScheduler {
  selahBackupSchedulerInterval?: ReturnType<typeof setInterval> | null
}
const globalScheduler = globalThis as unknown as GlobalScheduler

/**
 * Start the auto-backup scheduler. Runs an immediate check, then every hour.
 * Safe to call multiple times — subsequent calls are no-ops.
 * HMR-safe in dev: the interval handle lives on globalThis so module
 * reloads don't spawn duplicate intervals.
 */
export function startAutoBackupScheduler(): void {
  if (globalScheduler.selahBackupSchedulerInterval) return // already running

  console.log('[auto-backup] Scheduler started (checking every hour)')

  // Run first check after a short delay (let the server finish starting)
  setTimeout(() => {
    checkAndRunAutoBackup()
  }, 3_000)

  const interval = setInterval(() => {
    checkAndRunAutoBackup()
  }, CHECK_INTERVAL_MS)

  // Don't block process exit
  if (interval.unref) interval.unref()

  globalScheduler.selahBackupSchedulerInterval = interval
}
