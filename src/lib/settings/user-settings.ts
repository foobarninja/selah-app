// src/lib/settings/user-settings.ts
//
// Per-profile key/value accessors. Companion to app_settings (device-level).
// See docs/superpowers/specs/2026-04-19-multi-user-profiles-design.md for
// which keys live here vs in app_settings.

import { prisma } from '@/lib/db'

export async function getUserSetting(userId: string, key: string): Promise<string | null> {
  const row = await prisma.userSetting.findUnique({
    where: { userId_key: { userId, key } },
  })
  return row ? row.value : null
}

export async function setUserSetting(userId: string, key: string, value: string): Promise<void> {
  const now = new Date().toISOString()
  await prisma.userSetting.upsert({
    where: { userId_key: { userId, key } },
    create: { userId, key, value, updatedAt: now },
    update: { value, updatedAt: now },
  })
}

// Which keys belong under user_settings vs app_settings. The list here
// must match the FROZEN KEY LIST in scripts/etl/add-user-profiles-schema.ts.
export const USER_SETTING_KEYS = [
  'primary_translation',
  'parallel_translations',
  'commentary_display',
  'daily_bread_audience',
  'theme',
] as const

export type UserSettingKey = (typeof USER_SETTING_KEYS)[number]

export function isUserSettingKey(key: string): key is UserSettingKey {
  return (USER_SETTING_KEYS as readonly string[]).includes(key)
}
