import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __libDir = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__libDir, "..", "..");
const DEFAULT_DB_PATH = path.join(PROJECT_ROOT, "data", "selah.db");

function resolveDbPath(): string {
  const env = process.env.SELAH_DB_PATH;
  return env && env.length > 0 ? path.resolve(env) : DEFAULT_DB_PATH;
}

const dbPath = resolveDbPath();
export const db = new Database(dbPath, { fileMustExist: true });
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

export function getDbPath(): string {
  return dbPath;
}

export async function closeDb(): Promise<void> {
  db.close();
}
