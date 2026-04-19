// src/lib/profiles/pin.ts
//
// PIN hashing for profile gating. bcrypt with cost factor 10 — plenty
// strong for a 4-digit PIN protecting against physical access in a
// family trust context. Not a security perimeter; see the design spec
// for the threat model.

import bcrypt from 'bcryptjs'

const COST = 10

export function isValidPinFormat(pin: string): boolean {
  return /^\d{4}$/.test(pin)
}

export async function hashPin(pin: string): Promise<string> {
  if (!isValidPinFormat(pin)) {
    throw new Error('PIN must be exactly 4 digits')
  }
  return bcrypt.hash(pin, COST)
}

export async function verifyPin(pin: string, hash: string): Promise<boolean> {
  if (!isValidPinFormat(pin)) return false
  try {
    return await bcrypt.compare(pin, hash)
  } catch {
    return false
  }
}
