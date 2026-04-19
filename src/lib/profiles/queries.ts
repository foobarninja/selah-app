// src/lib/profiles/queries.ts
//
// Profile CRUD + cascade-delete helper. The cascade is done in
// application code (not via DB FK ON DELETE CASCADE) because adding
// FK constraints to existing user-local tables would require a full
// SQLite table rebuild per table. Doing it here keeps the migration
// simple and the cascade testable.

import { randomUUID } from 'crypto'
import { prisma } from '@/lib/db'
import { hashPin } from './pin'

export const USER_LOCAL_TABLES_FOR_CASCADE = [
  'ai_conversations',
  'ai_messages',
  'devotional_history',
  'user_notes',
  'user_note_anchors',
  'user_note_themes',
  'user_note_tags',
  'user_tags',
  'user_bookmarks',
  'user_collections',
  'user_collection_items',
  'journals',
  'reading_history',
  'study_projects',
  'study_assembly_items',
  'user_settings',
] as const

export interface ProfileRecord {
  id: string
  name: string
  avatarColor: string
  pinHash: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

function toRecord(row: {
  id: string
  name: string
  avatarColor: string
  pinHash: string | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}): ProfileRecord {
  return { ...row }
}

export async function listProfiles(): Promise<ProfileRecord[]> {
  const rows = await prisma.userProfile.findMany({
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
  })
  return rows.map(toRecord)
}

export async function getProfile(id: string): Promise<ProfileRecord | null> {
  const row = await prisma.userProfile.findUnique({ where: { id } })
  return row ? toRecord(row) : null
}

export async function createProfile(input: {
  name: string
  avatarColor: string
  pin: string | null
}): Promise<ProfileRecord> {
  const now = new Date().toISOString()
  const pinHash = input.pin ? await hashPin(input.pin) : null
  const row = await prisma.userProfile.create({
    data: {
      id: randomUUID(),
      name: input.name.trim().slice(0, 30),
      avatarColor: input.avatarColor,
      pinHash,
      isDefault: false,
      createdAt: now,
      updatedAt: now,
    },
  })
  return toRecord(row)
}

export async function updateProfile(
  id: string,
  input: {
    name?: string
    avatarColor?: string
    pin?: string | null // string = new PIN, null = remove PIN, undefined = untouched
  },
): Promise<ProfileRecord> {
  const now = new Date().toISOString()
  const data: {
    name?: string
    avatarColor?: string
    pinHash?: string | null
    updatedAt: string
  } = { updatedAt: now }
  if (input.name !== undefined) data.name = input.name.trim().slice(0, 30)
  if (input.avatarColor !== undefined) data.avatarColor = input.avatarColor
  if (input.pin !== undefined) data.pinHash = input.pin === null ? null : await hashPin(input.pin)
  const row = await prisma.userProfile.update({ where: { id }, data })
  return toRecord(row)
}

export async function markDefault(id: string): Promise<void> {
  const now = new Date().toISOString()
  await prisma.$transaction([
    prisma.userProfile.updateMany({
      where: { isDefault: true },
      data: { isDefault: false, updatedAt: now },
    }),
    prisma.userProfile.update({
      where: { id },
      data: { isDefault: true, updatedAt: now },
    }),
  ])
}

export async function deleteProfile(id: string): Promise<void> {
  const count = await prisma.userProfile.count()
  if (count <= 1) throw new Error('Cannot delete the last profile')

  // Cascade: wipe rows from every user-local table, then delete the profile.
  // Done via $executeRawUnsafe because the table list is iterated; the table
  // names are compile-time constants from USER_LOCAL_TABLES_FOR_CASCADE so
  // there's no SQL injection surface.
  await prisma.$transaction(async (tx) => {
    for (const table of USER_LOCAL_TABLES_FOR_CASCADE) {
      await tx.$executeRawUnsafe(`DELETE FROM ${table} WHERE user_id = ?`, id)
    }
    await tx.userProfile.delete({ where: { id } })
  })
}

export async function countCascade(id: string): Promise<Record<string, number>> {
  // Returns per-table row counts so the deletion confirmation UI can
  // show concrete numbers before the user confirms.
  const counts: Record<string, number> = {}
  for (const table of USER_LOCAL_TABLES_FOR_CASCADE) {
    const rows = (await prisma.$queryRawUnsafe(
      `SELECT COUNT(*) AS n FROM ${table} WHERE user_id = ?`,
      id,
    )) as Array<{ n: bigint | number }>
    counts[table] = Number(rows[0].n)
  }
  return counts
}
