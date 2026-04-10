import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as fs from 'fs/promises'
import * as path from 'path'
import * as os from 'os'

// Mock settings/queries before importing scheduler
vi.mock('@/lib/settings/queries', () => ({
  createBackup: vi.fn().mockResolvedValue(Buffer.from('SQLite format 3\0fake-backup-data')),
  getBackupInfo: vi.fn().mockResolvedValue({
    autoBackupEnabled: true,
    autoBackupRetentionDays: 14,
    lastBackup: '',
    lastBackupAgo: 'Never',
    estimatedSize: '10 MB',
  }),
}))

describe('writeBackupToDisk', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'selah-backup-test-'))
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
  })

  it('writes a .db file to the target directory with timestamp name', async () => {
    const { writeBackupToDisk } = await import('@/lib/backup/scheduler')
    const buffer = Buffer.from('SQLite format 3\0test-data')
    const filePath = await writeBackupToDisk(buffer, tmpDir)

    expect(filePath).toMatch(/selah-backup-\d{4}-\d{2}-\d{2}.*\.db$/)
    const written = await fs.readFile(filePath)
    expect(written.toString()).toContain('SQLite format 3')
  })

  it('creates the backups directory if it does not exist', async () => {
    const { writeBackupToDisk } = await import('@/lib/backup/scheduler')
    const nestedDir = path.join(tmpDir, 'nested', 'backups')
    const buffer = Buffer.from('SQLite format 3\0test')
    const filePath = await writeBackupToDisk(buffer, nestedDir)

    const stat = await fs.stat(filePath)
    expect(stat.isFile()).toBe(true)
  })
})

describe('pruneOldBackups', () => {
  let tmpDir: string

  beforeEach(async () => {
    tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'selah-prune-test-'))
  })

  afterEach(async () => {
    await fs.rm(tmpDir, { recursive: true, force: true })
  })

  it('deletes backup files older than retention days', async () => {
    const { pruneOldBackups } = await import('@/lib/backup/scheduler')

    // Create a "40 days old" file by using a past date in the filename
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 40)
    const oldName = `selah-backup-${oldDate.toISOString().slice(0, 10)}-120000.db`
    await fs.writeFile(path.join(tmpDir, oldName), 'old')

    // Create a "today" file
    const todayName = `selah-backup-${new Date().toISOString().slice(0, 10)}-120000.db`
    await fs.writeFile(path.join(tmpDir, todayName), 'today')

    // Create a non-backup file (should not be touched)
    await fs.writeFile(path.join(tmpDir, 'readme.txt'), 'keep me')

    await pruneOldBackups(tmpDir, 30)

    const remaining = await fs.readdir(tmpDir)
    expect(remaining).toContain(todayName)
    expect(remaining).toContain('readme.txt')
    expect(remaining).not.toContain(oldName)
  })

  it('does nothing when no files are expired', async () => {
    const { pruneOldBackups } = await import('@/lib/backup/scheduler')

    const todayName = `selah-backup-${new Date().toISOString().slice(0, 10)}-120000.db`
    await fs.writeFile(path.join(tmpDir, todayName), 'today')

    await pruneOldBackups(tmpDir, 30)

    const remaining = await fs.readdir(tmpDir)
    expect(remaining).toHaveLength(1)
    expect(remaining[0]).toBe(todayName)
  })

  it('handles empty directory gracefully', async () => {
    const { pruneOldBackups } = await import('@/lib/backup/scheduler')
    await expect(pruneOldBackups(tmpDir, 30)).resolves.not.toThrow()
  })

  it('handles non-existent directory gracefully', async () => {
    const { pruneOldBackups } = await import('@/lib/backup/scheduler')
    await expect(pruneOldBackups('/tmp/does-not-exist-selah', 30)).resolves.not.toThrow()
  })
})

describe('shouldRunBackupToday', () => {
  it('returns true when lastBackup is empty', async () => {
    const { shouldRunBackupToday } = await import('@/lib/backup/scheduler')
    expect(shouldRunBackupToday('')).toBe(true)
  })

  it('returns true when lastBackup is from yesterday', async () => {
    const { shouldRunBackupToday } = await import('@/lib/backup/scheduler')
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    expect(shouldRunBackupToday(yesterday.toISOString())).toBe(true)
  })

  it('returns false when lastBackup is from today', async () => {
    const { shouldRunBackupToday } = await import('@/lib/backup/scheduler')
    expect(shouldRunBackupToday(new Date().toISOString())).toBe(false)
  })
})
