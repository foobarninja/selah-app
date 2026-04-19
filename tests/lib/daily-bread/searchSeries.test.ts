// tests/lib/daily-bread/searchSeries.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Database from 'better-sqlite3'
import { copyFileSync, existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

const SOURCE_DB = resolve(process.cwd(), 'data/selah.db')
const TEST_DB = resolve(process.cwd(), 'data/selah-search-series-test.db')

// These tests exercise real-data behavior and need the full seed DB.
// In CI (and fresh clones), the DB isn't present — skip rather than fail.
const describeIfDb = existsSync(SOURCE_DB) ? describe : describe.skip

beforeAll(() => {
  if (!existsSync(SOURCE_DB)) return // describe.skip will short-circuit actual runs
  copyFileSync(SOURCE_DB, TEST_DB)
  process.env.SELAH_DB_PATH_OVERRIDE = TEST_DB

  const db = new Database(TEST_DB)
  try {
    // Clean slate: remove any pre-existing test series.
    db.exec(`DELETE FROM devotional_series WHERE id LIKE 'test-series-%'`)

    // Insert one test series + attach 2 existing devotionals to it across two books.
    db.exec(`
      INSERT INTO devotional_series (id, title, description, audience, season, source_tier, created_at)
      VALUES ('test-series-1', 'Test Arc', 'Scratch arc for tests.', 'family', NULL, 'ai_assisted', '2026-04-17T00:00:00.000Z');
    `)

    const devs = db.prepare(`
      SELECT id, book_id FROM devotionals
      WHERE series_id IS NULL
      ORDER BY book_id
      LIMIT 10
    `).all() as Array<{ id: string; book_id: string }>

    const firstBookDev = devs[0]
    const differentBookDev = devs.find((d) => d.book_id !== firstBookDev.book_id)
    if (!differentBookDev) throw new Error('test requires devotionals from at least 2 books')

    db.prepare(`UPDATE devotionals SET series_id = 'test-series-1', series_order = 10 WHERE id = ?`).run(firstBookDev.id)
    db.prepare(`UPDATE devotionals SET series_id = 'test-series-1', series_order = 20 WHERE id = ?`).run(differentBookDev.id)
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

describeIfDb('searchSeries', () => {
  it('returns all series with no filters', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const results = await searchSeries({})
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.title).toBe('Test Arc')
    expect(testRow!.partCount).toBe(2)
    expect(testRow!.totalEstimatedMinutes).toBeGreaterThan(0)
    expect(testRow!.bridgePart).toBeNull()
  })

  it('populates bridgePart when a book filter matches only one child', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    // Pick the book of the second attached devotional (seriesOrder=20).
    const db = new Database(TEST_DB, { readonly: true })
    const part2 = db.prepare(`SELECT book_id, id FROM devotionals WHERE series_id = 'test-series-1' AND series_order = 20`).get() as { book_id: string; id: string }
    db.close()

    const results = await searchSeries({ bookId: part2.book_id })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.bridgePart).not.toBeNull()
    expect(testRow!.bridgePart!.seriesOrder).toBe(2)
    expect(testRow!.bridgePart!.devotionalId).toBe(part2.id)
  })

  it('populates bridgePart with the lowest seriesOrder match when multiple children match', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const db = new Database(TEST_DB, { readonly: true })
    const common = db.prepare(`SELECT book_id FROM devotionals WHERE series_id = 'test-series-1' AND series_order = 10`).get() as { book_id: string }
    db.close()

    const results = await searchSeries({ bookId: common.book_id })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow?.bridgePart?.seriesOrder).toBe(1)
  })

  it('returns null bridgePart when the series itself matches the text query', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const results = await searchSeries({ query: 'Test Arc' })
    const testRow = results.find((r) => r.id === 'test-series-1')
    expect(testRow).toBeDefined()
    expect(testRow!.bridgePart).toBeNull()
  })

  it('respects the audience filter on the series column', async () => {
    const { searchSeries } = await import('@/lib/daily-bread/queries')
    const adults = await searchSeries({ audience: 'adults' })
    expect(adults.find((r) => r.id === 'test-series-1')).toBeUndefined()
    const family = await searchSeries({ audience: 'family' })
    expect(family.find((r) => r.id === 'test-series-1')).toBeDefined()
  })
})
