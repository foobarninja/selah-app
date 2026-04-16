import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";

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
}
