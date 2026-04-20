// src/lib/safe-models/queries.ts
//
// Parent-extendable list of AI models approved for child-locked profiles.
// Stored as a JSON array under the app_settings key 'kid_safe_models'.
// The built-in default (hydrated when the key is absent) contains only
// Anthropic's claude-haiku-4-5 — the only model that passed the 8-prompt
// safety regression at release time.

import { prisma } from '@/lib/db'

export interface KidSafeModel {
  provider: string
  modelId: string
  note: string
  addedAt: string
}

const SETTING_KEY = 'kid_safe_models'

const BUILTIN_DEFAULT: KidSafeModel[] = [
  {
    provider: 'anthropic',
    modelId: 'claude-haiku-4-5',
    note: 'Built-in default. Passed 2026-04-19 safety regression (8 / 8 crisis prompts).',
    addedAt: '2026-04-19T00:00:00.000Z',
  },
]

async function readRaw(): Promise<KidSafeModel[]> {
  const row = await prisma.appSetting.findUnique({ where: { key: SETTING_KEY } })
  if (!row) return [...BUILTIN_DEFAULT]
  try {
    const parsed = JSON.parse(row.value)
    if (Array.isArray(parsed)) return parsed
  } catch {
    // fall through to default
  }
  return [...BUILTIN_DEFAULT]
}

async function writeRaw(models: KidSafeModel[]): Promise<void> {
  await prisma.appSetting.upsert({
    where: { key: SETTING_KEY },
    update: { value: JSON.stringify(models) },
    create: { key: SETTING_KEY, value: JSON.stringify(models), valueType: 'string', category: 'safety' },
  })
}

export async function listKidSafeModels(): Promise<KidSafeModel[]> {
  return readRaw()
}

export async function addKidSafeModel(input: { provider: string; modelId: string; note: string }): Promise<void> {
  const existing = await readRaw()
  const already = existing.some((m) => m.provider === input.provider && m.modelId === input.modelId)
  if (already) return
  existing.push({
    provider: input.provider,
    modelId: input.modelId,
    note: input.note,
    addedAt: new Date().toISOString(),
  })
  await writeRaw(existing)
}

export async function removeKidSafeModel(provider: string, modelId: string): Promise<void> {
  const existing = await readRaw()
  if (existing.length <= 1) {
    throw new Error('Cannot remove the last approved model — at least one must remain for child-locked profiles to function.')
  }
  const filtered = existing.filter((m) => !(m.provider === provider && m.modelId === modelId))
  if (filtered.length === existing.length) return
  await writeRaw(filtered)
}
