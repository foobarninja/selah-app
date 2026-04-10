/**
 * Next.js instrumentation hook — runs once when the server starts.
 *
 * We use this to start the auto-backup scheduler so it runs as long as
 * the Next.js server process is alive. The scheduler checks every hour
 * whether a daily backup is needed.
 *
 * See: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Only run on the server, not during build or in the browser
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { startAutoBackupScheduler } = await import('@/lib/backup/scheduler')
    startAutoBackupScheduler()
  }
}
