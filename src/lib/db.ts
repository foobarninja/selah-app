import { PrismaClient } from '@/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./data/selah.db',
  })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
  prismaVersion: number | undefined
}

// Bump this version when the schema changes to invalidate cached clients
const SCHEMA_VERSION = 2

const needsRefresh = globalForPrisma.prismaVersion !== SCHEMA_VERSION

export const prisma = (!needsRefresh && globalForPrisma.prisma) ? globalForPrisma.prisma : createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
  globalForPrisma.prismaVersion = SCHEMA_VERSION
}
