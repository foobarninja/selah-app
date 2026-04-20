import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { mkdtempSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'

describe('safe-models/queries', () => {
  let dir: string
  let dbPath: string

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'selah-safemodels-'))
    dbPath = join(dir, 'test.db')
    const db = new Database(dbPath)
    db.exec(`
      CREATE TABLE app_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        value_type TEXT NOT NULL DEFAULT 'string',
        category TEXT NOT NULL DEFAULT 'general',
        description TEXT,
        updated_at TEXT NOT NULL DEFAULT ''
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

  it('listKidSafeModels returns the built-in default when the setting is absent', async () => {
    const { listKidSafeModels } = await import('@/lib/safe-models/queries')
    const models = await listKidSafeModels()
    expect(models).toHaveLength(1)
    expect(models[0].provider).toBe('anthropic')
    expect(models[0].modelId).toBe('claude-haiku-4-5')
  })

  it('addKidSafeModel persists a new entry', async () => {
    const { addKidSafeModel, listKidSafeModels } = await import('@/lib/safe-models/queries')
    await addKidSafeModel({
      provider: 'openai',
      modelId: 'gpt-5-mini',
      note: 'Tested 2026-04-20',
    })
    const models = await listKidSafeModels()
    expect(models).toHaveLength(2)
    expect(models.some((m) => m.modelId === 'gpt-5-mini')).toBe(true)
  })

  it('addKidSafeModel does not duplicate an existing entry', async () => {
    const { addKidSafeModel, listKidSafeModels } = await import('@/lib/safe-models/queries')
    await addKidSafeModel({ provider: 'anthropic', modelId: 'claude-haiku-4-5', note: 'override' })
    const models = await listKidSafeModels()
    expect(models).toHaveLength(1)
  })

  it('removeKidSafeModel removes an entry by provider+modelId', async () => {
    const { addKidSafeModel, removeKidSafeModel, listKidSafeModels } = await import('@/lib/safe-models/queries')
    await addKidSafeModel({ provider: 'openai', modelId: 'gpt-5-mini', note: 'Tested 2026-04-20' })
    await removeKidSafeModel('openai', 'gpt-5-mini')
    const models = await listKidSafeModels()
    expect(models.some((m) => m.modelId === 'gpt-5-mini')).toBe(false)
  })

  it('removeKidSafeModel refuses to remove the last entry', async () => {
    const { removeKidSafeModel } = await import('@/lib/safe-models/queries')
    await expect(removeKidSafeModel('anthropic', 'claude-haiku-4-5'))
      .rejects.toThrow(/cannot remove the last/i)
  })
})
