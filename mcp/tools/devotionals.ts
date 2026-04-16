import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";

const querySchema = {
  tagId: z.string().optional().describe("Filter to devotionals with this devotional_tag."),
  bookId: z.string().optional(),
  audience: z.string().optional().describe('e.g. "family", "youth".'),
  season: z.string().optional(),
  narrativeId: z.string().optional(),
  sourceTier: z.string().optional(),
  minFieldLength: z
    .object({
      contextBrief: z.number().int().min(0).optional(),
      modernMoment: z.number().int().min(0).optional(),
      conversationStarters: z.number().int().min(0).optional(),
    })
    .optional()
    .describe("Audit: require LENGTH(field) >= threshold. Devotionals BELOW any threshold are excluded from the main list; pass sortBy='weakness' to reverse for gap-finding."),
  missingGoingDeeper: z.boolean().optional().describe("Audit: only return devotionals with NULL/empty going_deeper."),
  tagCountMax: z.number().int().min(0).optional().describe("Audit: only return devotionals with <= N tag_map rows."),
  createdBefore: z.string().optional().describe("ISO date string; created_at < this."),
  groupBy: z.enum(["tag", "book", "audience"]).optional().describe("Aggregate mode. Returns counts per group instead of a row list."),
  sortBy: z.enum(["weakness", "created", "coverage"]).optional(),
  limit: z.number().int().min(1).max(500).default(50),
};

export function registerDevotionalTools(server: McpServer): void {
  server.registerTool(
    "query_devotionals",
    {
      description: "Dual-purpose research + audit query for devotionals. Use filters for research, audit filters (minFieldLength, missingGoingDeeper, tagCountMax) for gap-finding, groupBy for coverage aggregates.",
      inputSchema: querySchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      if (args.groupBy) {
        return handleGroupBy(args);
      }
      return handleList(args);
    }
  );

  // Write tool registered via separate module (task 10)
  registerDevotionalWrites(server);
}

import { registerDevotionalWrites } from "./devotionalsWrites.js";

function handleList(args: z.infer<z.ZodObject<typeof querySchema>> extends never ? never : Record<string, any>) {
  const where: string[] = [];
  const params: unknown[] = [];
  if (args.bookId) { where.push("d.book_id = ?"); params.push(args.bookId); }
  if (args.audience) { where.push("d.audience = ?"); params.push(args.audience); }
  if (args.season) { where.push("d.season = ?"); params.push(args.season); }
  if (args.narrativeId) { where.push("d.narrative_id = ?"); params.push(args.narrativeId); }
  if (args.sourceTier) { where.push("d.source_tier = ?"); params.push(args.sourceTier); }
  if (args.tagId) {
    where.push(`EXISTS (SELECT 1 FROM devotional_tag_map m WHERE m.devotional_id = d.id AND m.tag_id = ?)`);
    params.push(args.tagId);
  }
  if (args.createdBefore) { where.push("d.created_at < ?"); params.push(args.createdBefore); }
  if (args.missingGoingDeeper) {
    where.push("(d.going_deeper IS NULL OR TRIM(d.going_deeper) = '')");
  }
  if (args.minFieldLength?.contextBrief !== undefined) {
    where.push("LENGTH(d.context_brief) >= ?"); params.push(args.minFieldLength.contextBrief);
  }
  if (args.minFieldLength?.modernMoment !== undefined) {
    where.push("LENGTH(d.modern_moment) >= ?"); params.push(args.minFieldLength.modernMoment);
  }
  if (args.minFieldLength?.conversationStarters !== undefined) {
    where.push("LENGTH(d.conversation_starters) >= ?"); params.push(args.minFieldLength.conversationStarters);
  }
  if (args.tagCountMax !== undefined) {
    // Handled via HAVING
  }

  const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
  const weaknessExpr = `
    (MAX(0, 150 - LENGTH(COALESCE(d.context_brief,''))) +
     MAX(0, 200 - LENGTH(COALESCE(d.modern_moment,''))) +
     CASE WHEN d.going_deeper IS NULL OR TRIM(d.going_deeper) = '' THEN 50 ELSE 0 END +
     CASE WHEN (SELECT COUNT(*) FROM devotional_tag_map m WHERE m.devotional_id = d.id) = 0 THEN 100 ELSE 0 END)`;
  const orderBy =
    args.sortBy === "weakness" ? `weaknessScore DESC` :
    args.sortBy === "created" ? `d.created_at DESC` :
    args.sortBy === "coverage" ? `tagCount ASC, weaknessScore DESC` :
    `d.book_id, d.chapter, d.verse_start`;

  const havingClauses: string[] = [];
  if (args.tagCountMax !== undefined) {
    havingClauses.push(`tagCount <= ?`);
    params.push(args.tagCountMax);
  }
  const havingClause = havingClauses.length > 0 ? `HAVING ${havingClauses.join(" AND ")}` : "";

  const sql = `
    SELECT d.id, d.title, d.book_id, d.chapter, d.verse_start, d.verse_end,
           d.audience, d.season, d.source_tier, d.created_at,
           LENGTH(COALESCE(d.context_brief,'')) AS contextBriefLen,
           LENGTH(COALESCE(d.modern_moment,'')) AS modernMomentLen,
           LENGTH(COALESCE(d.conversation_starters,'')) AS conversationStartersLen,
           LENGTH(COALESCE(d.going_deeper,'')) AS goingDeeperLen,
           (SELECT COUNT(*) FROM devotional_tag_map m WHERE m.devotional_id = d.id) AS tagCount,
           ${weaknessExpr} AS weaknessScore
    FROM devotionals d
    ${whereClause}
    GROUP BY d.id
    ${havingClause}
    ORDER BY ${orderBy}
    LIMIT ?
  `;
  params.push(args.limit);

  const rows = db.prepare(sql).all(...params) as Array<Record<string, any>>;
  return toolResult({
    devotionals: rows.map((r) => ({
      id: r.id,
      title: r.title,
      bookId: r.book_id,
      chapter: r.chapter,
      verseStart: r.verse_start,
      verseEnd: r.verse_end,
      audience: r.audience,
      season: r.season,
      sourceTier: r.source_tier,
      createdAt: r.created_at,
      lengths: {
        contextBrief: r.contextBriefLen,
        modernMoment: r.modernMomentLen,
        conversationStarters: r.conversationStartersLen,
        goingDeeper: r.goingDeeperLen,
      },
      tagCount: r.tagCount,
      weaknessScore: r.weaknessScore,
    })),
    count: rows.length,
  });
}

function handleGroupBy(args: Record<string, any>) {
  let sql: string;
  if (args.groupBy === "tag") {
    sql = `
      SELECT dt.id, dt.name, dt.category,
             COUNT(DISTINCT d.id) AS devotionalCount
      FROM devotional_tags dt
      LEFT JOIN devotional_tag_map m ON m.tag_id = dt.id
      LEFT JOIN devotionals d ON d.id = m.devotional_id
      GROUP BY dt.id
      ORDER BY devotionalCount ASC, dt.name
      LIMIT ?
    `;
  } else if (args.groupBy === "book") {
    sql = `
      SELECT b.id AS book_id, b.name, b.testament, b.book_order,
             COUNT(d.id) AS devotionalCount
      FROM books b
      LEFT JOIN devotionals d ON d.book_id = b.id
      GROUP BY b.id
      ORDER BY devotionalCount ASC, b.book_order
      LIMIT ?
    `;
  } else {
    sql = `
      SELECT d.audience, COUNT(*) AS devotionalCount
      FROM devotionals d
      GROUP BY d.audience
      ORDER BY devotionalCount ASC
      LIMIT ?
    `;
  }
  const rows = db.prepare(sql).all(args.limit);
  return toolResult({ groupBy: args.groupBy, groups: rows });
}

function toolResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] };
}
