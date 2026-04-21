import { randomBytes, createCipheriv, createDecipheriv, createHash } from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const IV_LENGTH = 16

/**
 * Derive a stable 32-byte AES-GCM key. Prefer a dedicated ENCRYPTION_SECRET
 * env so the key is not co-located with the database connection string.
 * Fall back to DATABASE_URL for backward compatibility with installs that
 * predate the split — operators who set ENCRYPTION_SECRET after upgrading
 * will invalidate any previously-stored ciphertexts (they return unchanged
 * from decryptValue's catch-all, i.e. the operator re-enters them).
 */
function getEncryptionKey(): Buffer {
  const secret =
    process.env.ENCRYPTION_SECRET ??
    process.env.DATABASE_URL ??
    'selah-default-key-seed'
  return createHash('sha256').update(secret).digest()
}

/** Encrypt a plaintext string → JSON string with iv, authTag, encrypted */
export function encryptValue(plaintext: string): string {
  const key = getEncryptionKey()
  const iv = randomBytes(IV_LENGTH)
  const cipher = createCipheriv(ALGORITHM, key, iv)
  let encrypted = cipher.update(plaintext, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  const authTag = cipher.getAuthTag().toString('hex')
  return JSON.stringify({ iv: iv.toString('hex'), authTag, encrypted })
}

/** Decrypt a JSON string → plaintext. Returns as-is if not encrypted (migration). */
export function decryptValue(encryptedJson: string): string {
  try {
    const { iv, authTag, encrypted } = JSON.parse(encryptedJson)
    if (!iv || !authTag || !encrypted) return encryptedJson
    const key = getEncryptionKey()
    const decipher = createDecipheriv(ALGORITHM, key, Buffer.from(iv, 'hex'))
    decipher.setAuthTag(Buffer.from(authTag, 'hex'))
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch {
    return encryptedJson // plaintext fallback for pre-encryption data
  }
}

/** Check if a value looks like an encrypted JSON blob */
export function isEncrypted(value: string): boolean {
  try {
    const parsed = JSON.parse(value)
    return !!(parsed.iv && parsed.authTag && parsed.encrypted)
  } catch {
    return false
  }
}
