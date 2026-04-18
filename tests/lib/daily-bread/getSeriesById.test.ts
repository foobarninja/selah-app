// tests/lib/daily-bread/getSeriesById.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-get-series-test.db')

beforeAll(() => {
  copyFileSync(SOURCE_DB, TEST_DB)
  process.env.SELAH_DB_PATH_OVERRIDE = TEST_DB

  const db = new Database(TEST_DB)
  try {
    db.exec(`DELETE FROM devotional_series WHERE id LIKE 'test-detail-%'`)
    db.exec(`
      INSERT INTO devotional_series (id, title, description, audience, source_tier, created_at)
      VALUES ('test-detail-1', 'Detail Arc', 'Detail test.', 'family', 'ai_assisted', '2026-04-17T00:00:00.000Z');
    `)
    const devs = db.prepare(`SELECT id FROM devotionals WHERE series_id IS NULL LIMIT 3`).all() as Array<{ id: string }>
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 10 WHERE id = ?`).run(devs[0].id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 20 WHERE id = ?`).run(devs[1].id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-detail-1', series_order = 30 WHERE id = ?`).run(devs[2].id)

    // Mark the middle part complete.
    db.prepare(`INSERT INTO devotional_history (devotional_id, completed_at, rating) VALUES (?, ?, ?)`).run(devs[1].id, '2026-04-16T10:00:00.000Z', 5)
  } finally {
    db.close()
  }
})

afterAll(() => {
  if (existsSync(TEST_DB)) unlinkSync(TEST_DB)
  ;['-wal', '-shm'].forEach((s) => {
    const p = TEST_DB + s
    if (existsSync(p)) unlinkSync(p)
  })
  delete process.env.SELAH_DB_PATH_OVERRIDE
})

describe('getSeriesById', () => {
  it('returns null for a missing id', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('no-such-series')
    expect(result).toBeNull()
  })

  it('returns detail with parts in order and completedAt populated', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('test-detail-1')
    expect(result).not.toBeNull()
    expect(result!.id).toBe('test-detail-1')
    expect(result!.title).toBe('Detail Arc')
    expect(result!.parts).toHaveLength(3)
    expect(result!.parts.map((p) => p.seriesOrder)).toEqual([1, 2, 3])
    expect(result!.parts[0].completedAt).toBeNull()
    expect(result!.parts[1].completedAt).toBe('2026-04-16T10:00:00.000Z')
    expect(result!.parts[2].completedAt).toBeNull()
  })

  it('returns partCount and totalEstimatedMinutes from children', async () => {
    const { getSeriesById } = await import('@/lib/daily-bread/queries')
    const result = await getSeriesById('test-detail-1')
    expect(result!.partCount).toBe(3)
    expect(result!.totalEstimatedMinutes).toBeGreaterThan(0)
  })
})
