// src/lib/profiles/require-caller-profile.ts
//
// Authorization rule for profile mutation routes. The caller (identified by
// the active-profile cookie) may modify a target profile if and only if:
//
//   (a) the caller IS the target (self-edits), OR
//   (b) the caller is an adult profile with a PIN and no childLock — i.e.
//       the family "admin" role (parental authority).
//
// childLock profiles and no-PIN profiles cannot act on anyone else: a
// no-PIN profile is publicly-selectable and therefore not a trust root.

export interface CallerProfileLike {
  id: string
  pinHash: string | null
  childLock: boolean
}

export function canModifyProfile(
  caller: CallerProfileLike,
  target: { id: string },
): boolean {
  if (caller.id === target.id) return true
  return Boolean(caller.pinHash) && !caller.childLock
}
