import { describe, it, expect, vi, beforeEach } from 'vitest'

// The active-profile guard is the unit under test. We mock it directly so we
// can drive the "no active profile" (throws) and "authenticated" paths, and we
// mock the settings queries to assert the DB read/write is gated behind auth.
const requireActiveProfileId = vi.fn()
vi.mock('@/lib/profiles/active-profile', () => ({
  requireActiveProfileId: (...args: unknown[]) => requireActiveProfileId(...args),
}))

const createBackup = vi.fn()
const restoreBackup = vi.fn()
vi.mock('@/lib/settings/queries', () => ({
  createBackup: (...args: unknown[]) => createBackup(...args),
  restoreBackup: (...args: unknown[]) => restoreBackup(...args),
}))

beforeEach(() => {
  requireActiveProfileId.mockReset()
  createBackup.mockReset()
  restoreBackup.mockReset()
})

describe('GET /api/settings/backup auth guard', () => {
  it('returns 401 and does NOT read the DB when there is no active profile', async () => {
    requireActiveProfileId.mockRejectedValueOnce(new Error('no active profile'))
    const { GET } = await import('@/app/api/settings/backup/route')

    const res = await GET()

    expect(res.status).toBe(401)
    await expect(res.json()).resolves.toEqual({ error: 'No active profile' })
    expect(createBackup).not.toHaveBeenCalled()
  })

  it('streams the backup for an authenticated active profile', async () => {
    requireActiveProfileId.mockResolvedValueOnce('profile-1')
    createBackup.mockResolvedValueOnce(Buffer.from('sqlite-bytes'))
    const { GET } = await import('@/app/api/settings/backup/route')

    const res = await GET()

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/x-sqlite3')
    expect(res.headers.get('Content-Disposition')).toMatch(/attachment; filename="selah-backup-.*\.db"/)
    expect(createBackup).toHaveBeenCalledTimes(1)
  })
})

describe('POST /api/settings/restore auth guard', () => {
  function makeRequest(file: File | null) {
    const formData = new FormData()
    if (file) formData.set('file', file)
    return { formData: async () => formData } as unknown as import('next/server').NextRequest
  }

  it('returns 401 and does NOT overwrite the DB when there is no active profile', async () => {
    requireActiveProfileId.mockRejectedValueOnce(new Error('no active profile'))
    const { POST } = await import('@/app/api/settings/restore/route')

    const res = await POST(makeRequest(new File(['db-bytes'], 'evil.db')))

    expect(res.status).toBe(401)
    await expect(res.json()).resolves.toEqual({ error: 'No active profile' })
    expect(restoreBackup).not.toHaveBeenCalled()
  })

  it('restores for an authenticated active profile', async () => {
    requireActiveProfileId.mockResolvedValueOnce('profile-1')
    restoreBackup.mockResolvedValueOnce(undefined)
    const { POST } = await import('@/app/api/settings/restore/route')

    const res = await POST(makeRequest(new File(['db-bytes'], 'good.db')))

    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toMatchObject({ success: true })
    expect(restoreBackup).toHaveBeenCalledTimes(1)
  })

  it('returns 400 when authenticated but no file is provided', async () => {
    requireActiveProfileId.mockResolvedValueOnce('profile-1')
    const { POST } = await import('@/app/api/settings/restore/route')

    const res = await POST(makeRequest(null))

    expect(res.status).toBe(400)
    expect(restoreBackup).not.toHaveBeenCalled()
  })
})
