import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('user-settings', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-usersettings-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE user_settings (
        user_id TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT '',
        PRIMARY KEY (user_id, key)
      );
    `)
    db.close()
    process.env.DATABASE_URL = `file:${dbPath}`
    const g = globalThis as unknown as { prisma?: unknown; prismaVersion?: unknown }
    g.prisma = undefined
    g.prismaVersion = undefined
    vi.resetModules()
  })

  afterEach(async () => {
    const { prisma } = await import('@/lib/db')
    await prisma.$disconnect()
    rmSync(dir, { recursive: true, force: true })
  })

  it('getUserSetting returns null when missing', async () => {
    const { getUserSetting } = await import('@/lib/settings/user-settings')
    expect(await getUserSetting('u1', 'theme')).toBeNull()
  })

  it('setUserSetting + getUserSetting round-trip', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    expect(await getUserSetting('u1', 'theme')).toBe('dark')
  })

  it('setUserSetting upserts', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    await setUserSetting('u1', 'theme', 'light')
    expect(await getUserSetting('u1', 'theme')).toBe('light')
  })

  it('settings are isolated between users', async () => {
    const { getUserSetting, setUserSetting } = await import('@/lib/settings/user-settings')
    await setUserSetting('u1', 'theme', 'dark')
    await setUserSetting('u2', 'theme', 'light')
    expect(await getUserSetting('u1', 'theme')).toBe('dark')
    expect(await getUserSetting('u2', 'theme')).toBe('light')
  })
})
