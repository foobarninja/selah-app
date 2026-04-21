// src/lib/seed/merge-engine.ts
//
// Core logic for migrating user-local data from an old seed into a new one.
// Extracted from the CLI so it can be unit-tested against fixture DBs.

import Database from 'better-sqlite3'
import { USER_LOCAL_TABLES, isSeedContentTable, isInternalTable } from './user-tables'

export interface MergeReport {
  tablesMerged: Array<{ name: string; rowsCopied: number }>
  tablesSkippedMissingInOld: string[]
  tablesWithAddedColumns: Array<{ name: string; addedColumns: string[] }>
  unknownTablesInOld: string[]
  orphanRows: Array<{ table: string; column: string; target: string; count: number }>
  invariantViolations: string[]
}

/**
 * Copy user-local tables from oldDbPath into newDbPath in place.
 *
 * The merge runs inside a single transaction on newDb. If any invariant
 * is violated the transaction rolls back and the function throws.
 *
 * Orphan FK rows (e.g. devotional_history pointing to a devotional that
 * was renamed in the new seed) are preserved but counted in the report.
 */
export function mergeUserData(
  oldDbPath: string,
  newDbPath: string,
): MergeReport {
  const report: MergeReport = {
    tablesMerged: [],
    tablesSkippedMissingInOld: [],
    tablesWithAddedColumns: [],
    unknownTablesInOld: [],
    orphanRows: [],
    invariantViolations: [],
  }

  const db = new Database(newDbPath)
  try {
    db.pragma('foreign_keys = OFF')
    // Escape any single quotes defensively even though we control the paths.
    db.prepare(`ATTACH DATABASE ? AS oldseed`).run(oldDbPath)

    try {
      const oldTables = new Set(
        (db.prepare(`SELECT name FROM oldseed.sqlite_master WHERE type='table'`).all() as Array<{ name: string }>)
          .map((r) => r.name),
      )
      const newTables = new Set(
        (db.prepare(`SELECT name FROM main.sqlite_master WHERE type='table'`).all() as Array<{ name: string }>)
          .map((r) => r.name),
      )

      // Safety net: tables in old DB that are neither content nor user-local.
      // Almost always means a user table was added to the schema but not
      // registered in USER_LOCAL_TABLES.
      for (const t of oldTables) {
        if (isInternalTable(t)) continue
        if (isSeedContentTable(t)) continue
        if ((USER_LOCAL_TABLES as readonly string[]).includes(t)) continue
        report.unknownTablesInOld.push(t)
      }

      const tx = db.transaction(() => {
        for (const table of USER_LOCAL_TABLES) {
          const inOld = oldTables.has(table)
          const inNew = newTables.has(table)
          if (!inOld && !inNew) continue // not yet introduced in either version
          if (!inNew && inOld) {
            report.invariantViolations.push(
              `user-local table "${table}" was removed in new seed (table removal is not allowed)`,
            )
            continue
          }
          if (!inOld) {
            report.tablesSkippedMissingInOld.push(table)
            continue
          }

          const oldCols = columnsOf(db, 'oldseed', table)
          const newCols = columnsOf(db, 'main', table)
          const oldColSet = new Set(oldCols.map((c) => c.name))
          const newColSet = new Set(newCols.map((c) => c.name))

          const removed = oldCols.filter((c) => !newColSet.has(c.name)).map((c) => c.name)
          if (removed.length > 0) {
            report.invariantViolations.push(
              `user-local table "${table}" has columns removed in new seed: ${removed.join(', ')}`,
            )
            continue
          }

          const added = newCols.filter((c) => !oldColSet.has(c.name)).map((c) => c.name)
          if (added.length > 0) {
            report.tablesWithAddedColumns.push({ name: table, addedColumns: added })
          }

          const shared = oldCols.filter((c) => newColSet.has(c.name)).map((c) => c.name)
          const colList = shared.map(quoteIdent).join(', ')

          db.prepare(`DELETE FROM main.${quoteIdent(table)}`).run()
          const insertSql = `INSERT INTO main.${quoteIdent(table)} (${colList}) SELECT ${colList} FROM oldseed.${quoteIdent(table)}`
          const result = db.prepare(insertSql).run()
          report.tablesMerged.push({ name: table, rowsCopied: Number(result.changes) })
        }

        if (report.invariantViolations.length > 0) {
          throw new Error(
            `Aborting merge: ${report.invariantViolations.length} invariant violation(s)`,
          )
        }
      })

      tx()

      // Orphan FK scan — post-transaction because we need the merged data
      // to be visible. Non-fatal; just reported.
      const fkRows = db.prepare(`PRAGMA main.foreign_key_check`).all() as Array<{
        table: string; rowid: number; parent: string; fkid: number
      }>
      const orphanBuckets = new Map<string, number>()
      for (const r of fkRows) {
        const key = `${r.table}::${r.parent}::${r.fkid}`
        orphanBuckets.set(key, (orphanBuckets.get(key) ?? 0) + 1)
      }
      for (const [key, count] of orphanBuckets) {
        const [table, parent, fkid] = key.split('::')
        report.orphanRows.push({ table, column: `fk#${fkid}`, target: parent, count })
      }

      if (report.orphanRows.length > 0 && process.env.SELAH_ALLOW_ORPHAN_FKS !== '1') {
        const summary = report.orphanRows
          .map((o) => `${o.count} in ${o.table} → ${o.target}`)
          .join('; ')
        throw new Error(
          `Aborting merge: ${report.orphanRows.length} orphan FK group(s) found (${summary}). ` +
          `Set SELAH_ALLOW_ORPHAN_FKS=1 to proceed anyway — but expect runtime errors.`,
        )
      }
    } finally {
      db.prepare(`DETACH DATABASE oldseed`).run()
    }
  } finally {
    db.close()
  }

  return report
}

function quoteIdent(name: string): string {
  return `"${name.replace(/"/g, '""')}"`
}

function columnsOf(
  db: Database.Database,
  schema: 'main' | 'oldseed',
  table: string,
): Array<{ name: string; type: string }> {
  const rows = db
    .prepare(`SELECT name, type FROM pragma_table_info(?, ?)`)
    .all(table, schema) as Array<{ name: string; type: string }>
  return rows
}
