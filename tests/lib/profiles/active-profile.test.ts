import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock next/headers' cookies() and the prisma client BEFORE importing
// the module under test.
const cookieStore = new Map<string, string>()
vi.mock('next/headers', () => ({
  cookies: async () => ({
    get: (name: string) => {
      const v = cookieStore.get(name)
      return v ? { name, value: v } : undefined
    },
    set: (arg: { name: string; value: string }) => {
      cookieStore.set(arg.name, arg.value)
    },
    delete: (name: string) => {
      cookieStore.delete(name)
    },
  }),
}))

const findUnique = vi.fn()
vi.mock('@/lib/db', () => ({
  prisma: { userProfile: { findUnique: (...args: unknown[]) => findUnique(...args) } },
}))

beforeEach(() => {
  cookieStore.clear()
  findUnique.mockReset()
})

describe('getActiveProfileId', () => {
  it('returns null when no cookie is set', async () => {
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBeNull()
  })

  it('returns null when cookie refers to a missing profile', async () => {
    cookieStore.set('selah-profile-id', 'gone')
    findUnique.mockResolvedValueOnce(null)
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBeNull()
  })

  it('returns the id when cookie matches an existing profile', async () => {
    cookieStore.set('selah-profile-id', 'profile-1')
    findUnique.mockResolvedValueOnce({ id: 'profile-1' })
    const { getActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await getActiveProfileId()).toBe('profile-1')
  })
})

describe('requireActiveProfileId', () => {
  it('throws when no active profile', async () => {
    const { requireActiveProfileId } = await import('@/lib/profiles/active-profile')
    await expect(requireActiveProfileId()).rejects.toThrow(/no active profile/i)
  })
  it('returns id when cookie is valid', async () => {
    cookieStore.set('selah-profile-id', 'ok')
    findUnique.mockResolvedValueOnce({ id: 'ok' })
    const { requireActiveProfileId } = await import('@/lib/profiles/active-profile')
    expect(await requireActiveProfileId()).toBe('ok')
  })
})
