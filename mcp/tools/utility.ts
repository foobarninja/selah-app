import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { withWriteLog } from "../lib/writeLog.js";

export function registerUtilityTools(server: McpServer): void {
  server.registerTool(
    "list_devotional_tags",
    {
      description: "Devotional tag taxonomy (tree). Use to pick valid tagId values when upserting devotionals.",
      inputSchema: { category: z.string().optional() },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ category }) => {
      const rows = category
        ? db.prepare(`SELECT id, name, category, parent_tag_id, icon, description, sort_order
                      FROM devotional_tags WHERE category = ? ORDER BY sort_order, name`).all(category)
        : db.prepare(`SELECT id, name, category, parent_tag_id, icon, description, sort_order
                      FROM devotional_tags ORDER BY category, sort_order, name`).all();
      const tags = (rows as Array<any>).map((r) => ({
        id: r.id, name: r.name, category: r.category,
        parentTagId: r.parent_tag_id, icon: r.icon, description: r.description, sortOrder: r.sort_order,
      }));
      return { content: [{ type: "text" as const, text: JSON.stringify({ tags, count: tags.length }, null, 2) }] };
    }
  );

  server.registerTool(
    "list_climate_contexts",
    {
      description: "Era/period contexts with date range and social/political/economic summary. Use for filtering in query_narrative_units.",
      inputSchema: { era: z.string().optional() },
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ era }) => {
      const rows = era
        ? db.prepare(`SELECT id, name, era, date_range, political, economic, social, religious, source_tier
                      FROM climate_contexts WHERE era = ? ORDER BY name`).all(era)
        : db.prepare(`SELECT id, name, era, date_range, political, economic, social, religious, source_tier
                      FROM climate_contexts ORDER BY era, name`).all();
      const contexts = (rows as Array<any>).map((r) => ({
        id: r.id, name: r.name, era: r.era, dateRange: r.date_range,
        political: r.political, economic: r.economic, social: r.social, religious: r.religious,
        sourceTier: r.source_tier,
      }));
      return { content: [{ type: "text" as const, text: JSON.stringify({ contexts, count: contexts.length }, null, 2) }] };
    }
  );

  server.registerTool(
    "upsert_devotional_tag",
    {
      description: "Create or update a devotional tag in the taxonomy. Use to add new audience/mood/situation/season tags. Upserts on id.",
      inputSchema: {
        id: z.string().describe("Slug id for the tag (e.g. 'tween', 'back-to-school')."),
        name: z.string().describe("Display name (e.g. 'Tween (10-15)')."),
        category: z.string().describe("One of: life-situation, emotional-state, season, family-moment, spiritual-growth, audience."),
        parentTagId: z.string().nullable().optional().describe("Parent tag id for hierarchy (e.g. 'family-audience'). Null for top-level."),
        description: z.string().nullable().optional(),
        icon: z.string().nullable().optional(),
        sortOrder: z.number().int().default(100),
      },
      annotations: { readOnlyHint: false, idempotentHint: true },
    },
    async (args) => {
      const result = await withWriteLog(
        "upsert_devotional_tag",
        args,
        () => db.prepare(`SELECT * FROM devotional_tags WHERE id = ?`).get(args.id) ?? null,
        () => {
          if (args.parentTagId) {
            const parent = db.prepare(`SELECT 1 FROM devotional_tags WHERE id = ?`).get(args.parentTagId);
            if (!parent) throw new Error(`parentTagId '${args.parentTagId}' does not exist`);
          }
          const existing = db.prepare(`SELECT id FROM devotional_tags WHERE id = ?`).get(args.id);
          if (existing) {
            db.prepare(`
              UPDATE devotional_tags SET name=?, category=?, parent_tag_id=?, description=?, icon=?, sort_order=?
              WHERE id=?
            `).run(args.name, args.category, args.parentTagId ?? null, args.description ?? null, args.icon ?? null, args.sortOrder, args.id);
            return { action: "updated", id: args.id };
          } else {
            db.prepare(`
              INSERT INTO devotional_tags (id, name, category, parent_tag_id, description, icon, sort_order)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `).run(args.id, args.name, args.category, args.parentTagId ?? null, args.description ?? null, args.icon ?? null, args.sortOrder);
            return { action: "created", id: args.id };
          }
        },
        (res) => db.prepare(`SELECT * FROM devotional_tags WHERE id = ?`).get(res.id) ?? null
      );
      return { content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }] };
    }
  );
}
