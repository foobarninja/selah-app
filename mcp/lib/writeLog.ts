import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { sessionId } from "./provenance.js";

const __libDir = path.dirname(fileURLToPath(import.meta.url));
const LOG_DIR = path.resolve(__libDir, "..", "logs");

function todayStamp(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function logPath(): string {
  return path.join(LOG_DIR, `writes-${todayStamp()}.jsonl`);
}

function ensureLogDir(): void {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function appendLine(obj: unknown): void {
  ensureLogDir();
  const line = JSON.stringify(obj) + "\n";
  fs.appendFileSync(logPath(), line, { encoding: "utf8" });
}

export interface WriteLogEntry<Args, Pre, Post> {
  ts: string;
  tool: string;
  args: Args;
  preImage: Pre | null;
  postImage: Post | null;
  sessionId: string;
  status: "committed" | "failed";
  error?: string;
}

/**
 * Wrap a DB mutation with a write-ahead log.
 *
 * Contract:
 *  1. Capture pre-image (rows that will be overwritten/deleted; null on pure insert).
 *  2. Append a JSONL line BEFORE the mutation runs — if the log write itself
 *     fails we throw immediately and the DB is never touched.
 *  3. Run the mutation.
 *  4. Capture post-image and append a "committed" line.
 *  5. If the mutation throws, append a "failed" line and rethrow.
 *
 * The log is append-only, human-readable. Recovery = grep for a session,
 * replay or reverse manually.
 */
export async function withWriteLog<Args, Pre, Post, R>(
  tool: string,
  args: Args,
  capturePreImage: () => Pre | null | Promise<Pre | null>,
  run: () => R | Promise<R>,
  capturePostImage: (result: R) => Post | null | Promise<Post | null>
): Promise<R> {
  const ts = new Date().toISOString();
  let preImage: Pre | null = null;
  try {
    preImage = await capturePreImage();
  } catch (err) {
    appendLine({
      ts, tool, args,
      preImage: null, postImage: null,
      sessionId: sessionId(),
      status: "failed",
      error: `preImage capture failed: ${err instanceof Error ? err.message : String(err)}`,
    } satisfies WriteLogEntry<Args, Pre, Post>);
    throw err;
  }

  // Pre-flight log line — if this throws, the DB is untouched.
  appendLine({
    ts, tool, args,
    preImage, postImage: null,
    sessionId: sessionId(),
    status: "failed",
    error: "pending",
  } satisfies WriteLogEntry<Args, Pre, Post>);

  let result: R;
  try {
    result = await run();
  } catch (err) {
    appendLine({
      ts, tool, args,
      preImage, postImage: null,
      sessionId: sessionId(),
      status: "failed",
      error: err instanceof Error ? err.message : String(err),
    } satisfies WriteLogEntry<Args, Pre, Post>);
    throw err;
  }

  const postImage = await capturePostImage(result);
  appendLine({
    ts, tool, args,
    preImage, postImage,
    sessionId: sessionId(),
    status: "committed",
  } satisfies WriteLogEntry<Args, Pre, Post>);
  return result;
}
