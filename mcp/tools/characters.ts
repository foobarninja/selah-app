import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { db } from "../lib/db.js";
import { registerCharacterWrites } from "./charactersWrites.js";

const queryCharactersSchema = {
  era: z.string().optional().describe('Filter by era label (e.g. "patriarchs", "united-monarchy").'),
  gender: z.string().optional(),
  bookId: z.string().optional().describe("Character appears in this book at least once (UPPERCASE code)."),
  relatedToCharacterId: z.string().optional().describe("Character has a row in character_relationships with this characterId on either side."),
  themeId: z.string().optional().describe("Character appears in any passage tagged with this theme."),
  minAppearances: z.number().int().min(0).optional(),
  sourceTier: z.string().optional(),
  limit: z.number().int().min(1).max(100).default(25),
};

const queryInteractionsSchema = {
  characterIds: z.array(z.string()).min(1).describe("One or more character ids. With 1 id: returns top co-appearing characters. With 2+: returns passages where ALL appear together."),
  bookId: z.string().optional(),
  era: z.string().optional().describe("Filter to passages in books from this era (matches characters.era through first-named character)."),
  minSharedPassages: z.number().int().min(1).default(1).describe("Minimum shared-passage count for co-appearance ranking mode."),
  limit: z.number().int().min(1).max(100).default(25),
};

const getCharacterSchema = {
  id: z.string().describe("Character id (e.g. 'moses', 'david')."),
};

export function registerCharacterTools(server: McpServer): void {
  server.registerTool(
    "query_characters",
    {
      description: "Filter-based character list. Use for browsing, audit, or shortlisting. Returns summaries with appearance/relationship counts.",
      inputSchema: queryCharactersSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      const where: string[] = [];
      const params: unknown[] = [];
      if (args.era) { where.push("c.era = ?"); params.push(args.era); }
      if (args.gender) { where.push("c.gender = ?"); params.push(args.gender); }
      if (args.sourceTier) { where.push("c.source_tier = ?"); params.push(args.sourceTier); }
      if (args.bookId) {
        where.push(`EXISTS (SELECT 1 FROM character_appearances ca WHERE ca.character_id = c.id AND ca.book_id = ?)`);
        params.push(args.bookId);
      }
      if (args.relatedToCharacterId) {
        where.push(`EXISTS (SELECT 1 FROM character_relationships cr
                           WHERE (cr.character_a = c.id AND cr.character_b = ?)
                              OR (cr.character_b = c.id AND cr.character_a = ?))`);
        params.push(args.relatedToCharacterId, args.relatedToCharacterId);
      }
      if (args.themeId) {
        where.push(`EXISTS (
          SELECT 1 FROM character_appearances ca
          JOIN passage_themes pt ON pt.book_id = ca.book_id AND pt.chapter = ca.chapter
            AND pt.verse_start <= COALESCE(ca.verse_end, ca.verse_start)
            AND COALESCE(pt.verse_end, pt.verse_start) >= ca.verse_start
          WHERE ca.character_id = c.id AND pt.theme_id = ?
        )`);
        params.push(args.themeId);
      }

      const having: string[] = [];
      if (args.minAppearances !== undefined) {
        having.push(`appearanceCount >= ?`);
        params.push(args.minAppearances);
      }

      const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
      const havingClause = having.length > 0 ? `HAVING ${having.join(" AND ")}` : "";
      const sql = `
        SELECT c.id, c.name, c.gender, c.era, c.prominence, c.source_tier,
               COALESCE(c.bio_brief, '') AS bio_brief,
               (SELECT COUNT(*) FROM character_appearances ca WHERE ca.character_id = c.id) AS appearanceCount,
               (SELECT COUNT(*) FROM character_relationships cr
                WHERE cr.character_a = c.id OR cr.character_b = c.id) AS relationshipCount
        FROM characters c
        ${whereClause}
        GROUP BY c.id
        ${havingClause}
        ORDER BY c.prominence, c.name
        LIMIT ?
      `;
      params.push(args.limit);

      const rows = db.prepare(sql).all(...params) as Array<{
        id: string; name: string; gender: string | null; era: string | null;
        prominence: string; source_tier: string; bio_brief: string;
        appearanceCount: number; relationshipCount: number;
      }>;
      const results = rows.map((r) => ({
        id: r.id,
        name: r.name,
        gender: r.gender,
        era: r.era,
        prominence: r.prominence,
        sourceTier: r.source_tier,
        bioBrief: r.bio_brief.slice(0, 240),
        appearances: r.appearanceCount,
        relationships: r.relationshipCount,
      }));
      return toolResult({ characters: results, count: results.length });
    }
  );

  server.registerTool(
    "query_character_interactions",
    {
      description: "Find passages where multiple characters appear together, or (with a single id) rank other characters by shared passages.",
      inputSchema: queryInteractionsSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async (args) => {
      if (args.characterIds.length === 1) {
        return rankCoAppearances(args.characterIds[0], args.bookId, args.minSharedPassages, args.limit);
      }
      return findSharedPassages(args.characterIds, args.bookId, args.limit);
    }
  );

  server.registerTool(
    "get_character",
    {
      description: "Full character profile: bio, appearances grouped by book, relationships grouped by type, connected themes via co-occurrence.",
      inputSchema: getCharacterSchema,
      annotations: { readOnlyHint: true, idempotentHint: true },
    },
    async ({ id }) => {
      const char = db.prepare(`SELECT * FROM characters WHERE id = ?`).get(id) as Record<string, unknown> | undefined;
      if (!char) return errorResult(`Character not found: ${id}`);

      const appearances = db.prepare(`
        SELECT book_id, chapter, verse_start, verse_end, role, emotional_state, motivation, narrative_note, source_tier
        FROM character_appearances
        WHERE character_id = ?
        ORDER BY book_id, chapter, verse_start
      `).all(id) as Array<{
        book_id: string; chapter: number; verse_start: number; verse_end: number | null;
        role: string; emotional_state: string | null; motivation: string | null;
        narrative_note: string | null; source_tier: string;
      }>;

      const appearancesByBook: Record<string, unknown[]> = {};
      for (const a of appearances) {
        const list = appearancesByBook[a.book_id] ?? [];
        list.push({
          chapter: a.chapter,
          verseStart: a.verse_start,
          verseEnd: a.verse_end,
          role: a.role,
          emotionalState: a.emotional_state,
          motivation: a.motivation,
          narrativeNote: a.narrative_note,
          sourceTier: a.source_tier,
        });
        appearancesByBook[a.book_id] = list;
      }

      const relationships = db.prepare(`
        SELECT CASE WHEN cr.character_a = ? THEN cr.character_b ELSE cr.character_a END AS other_id,
               cr.relationship, cr.description, cr.source_tier,
               c2.name AS other_name
        FROM character_relationships cr
        JOIN characters c2 ON c2.id = CASE WHEN cr.character_a = ? THEN cr.character_b ELSE cr.character_a END
        WHERE cr.character_a = ? OR cr.character_b = ?
        ORDER BY cr.relationship, c2.name
      `).all(id, id, id, id) as Array<{
        other_id: string; relationship: string; description: string | null;
        source_tier: string; other_name: string;
      }>;

      const relByType: Record<string, unknown[]> = {};
      for (const r of relationships) {
        const list = relByType[r.relationship] ?? [];
        list.push({
          otherId: r.other_id,
          otherName: r.other_name,
          description: r.description,
          sourceTier: r.source_tier,
        });
        relByType[r.relationship] = list;
      }

      const themes = db.prepare(`
        SELECT DISTINCT t.id, t.name, t.category, COUNT(*) AS sharedPassages
        FROM character_appearances ca
        JOIN passage_themes pt ON pt.book_id = ca.book_id AND pt.chapter = ca.chapter
          AND pt.verse_start <= COALESCE(ca.verse_end, ca.verse_start)
          AND COALESCE(pt.verse_end, pt.verse_start) >= ca.verse_start
        JOIN themes t ON t.id = pt.theme_id
        WHERE ca.character_id = ?
        GROUP BY t.id
        ORDER BY sharedPassages DESC, t.name
        LIMIT 15
      `).all(id) as Array<{ id: string; name: string; category: string | null; sharedPassages: number }>;

      return toolResult({
        id: char.id,
        name: char.name,
        aliases: char.aliases,
        gender: char.gender,
        era: char.era,
        approximateDates: char.approximate_dates,
        prominence: char.prominence,
        isNamed: !!char.is_named,
        bioBrief: char.bio_brief,
        bioFull: char.bio_full,
        modernParallel: char.modern_parallel,
        emotionalArc: char.emotional_arc,
        faithJourney: char.faith_journey,
        sourceTier: char.source_tier,
        appearancesByBook,
        relationshipsByType: relByType,
        connectedThemes: themes,
      });
    }
  );

  registerCharacterWrites(server);
}

function rankCoAppearances(characterId: string, bookId: string | undefined, minShared: number, limit: number) {
  const params: unknown[] = [characterId, characterId];
  let bookClause = "";
  if (bookId) {
    bookClause = " AND ca1.book_id = ? AND ca2.book_id = ?";
    params.push(bookId, bookId);
  }
  const sql = `
    SELECT ca2.character_id AS other_id, c.name AS other_name, COUNT(DISTINCT ca1.book_id || ':' || ca1.chapter || ':' || ca1.verse_start) AS shared
    FROM character_appearances ca1
    JOIN character_appearances ca2
      ON ca2.book_id = ca1.book_id AND ca2.chapter = ca1.chapter
      AND ca2.verse_start <= COALESCE(ca1.verse_end, ca1.verse_start)
      AND COALESCE(ca2.verse_end, ca2.verse_start) >= ca1.verse_start
    JOIN characters c ON c.id = ca2.character_id
    WHERE ca1.character_id = ? AND ca2.character_id <> ?${bookClause}
    GROUP BY ca2.character_id
    HAVING shared >= ?
    ORDER BY shared DESC, c.name
    LIMIT ?
  `;
  params.push(minShared, limit);
  const rows = db.prepare(sql).all(...params) as Array<{ other_id: string; other_name: string; shared: number }>;
  return toolResult({
    mode: "rank",
    anchor: characterId,
    coAppearances: rows.map((r) => ({ characterId: r.other_id, name: r.other_name, sharedPassages: r.shared })),
  });
}

function findSharedPassages(characterIds: string[], bookId: string | undefined, limit: number) {
  const n = characterIds.length;
  const params: unknown[] = [];
  const joins: string[] = [];
  for (let i = 0; i < n; i++) {
    const alias = `ca${i}`;
    if (i === 0) {
      joins.push(`FROM character_appearances ${alias}`);
      params.push(characterIds[i]);
    } else {
      joins.push(
        `JOIN character_appearances ${alias}
         ON ${alias}.book_id = ca0.book_id
        AND ${alias}.chapter = ca0.chapter
        AND ${alias}.verse_start <= COALESCE(ca0.verse_end, ca0.verse_start)
        AND COALESCE(${alias}.verse_end, ${alias}.verse_start) >= ca0.verse_start`
      );
      params.push(characterIds[i]);
    }
  }
  const charWhere = characterIds.map((_, i) => `ca${i}.character_id = ?`).join(" AND ");
  let bookClause = "";
  if (bookId) {
    bookClause = ` AND ca0.book_id = ?`;
    params.push(bookId);
  }
  params.push(limit);
  const sql = `
    SELECT DISTINCT ca0.book_id, ca0.chapter, ca0.verse_start, ca0.verse_end
    ${joins.join("\n")}
    WHERE ${charWhere}${bookClause}
    ORDER BY ca0.book_id, ca0.chapter, ca0.verse_start
    LIMIT ?
  `;
  const rows = db.prepare(sql).all(...params) as Array<{
    book_id: string; chapter: number; verse_start: number; verse_end: number | null;
  }>;
  return toolResult({
    mode: "shared",
    characterIds,
    passages: rows.map((r) => ({
      bookId: r.book_id,
      chapter: r.chapter,
      verseStart: r.verse_start,
      verseEnd: r.verse_end,
    })),
  });
}

function toolResult(payload: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }] };
}

function errorResult(msg: string) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify({ error: msg }) }],
    isError: true,
  };
}
