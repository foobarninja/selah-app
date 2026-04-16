import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerSearchTools } from "./tools/search.js";
import { registerPassageTools } from "./tools/passage.js";
import { registerCharacterTools } from "./tools/characters.js";
import { registerThemeTools } from "./tools/themes.js";
import { registerNarrativeTools } from "./tools/narrative.js";
import { registerDevotionalTools } from "./tools/devotionals.js";
import { registerCommentaryTools } from "./tools/commentary.js";
import { registerUtilityTools } from "./tools/utility.js";

import { closeDb } from "./lib/db.js";

const server = new McpServer(
  { name: "selah-authoring", version: "0.1.0" },
  {
    instructions: [
      "Selah MCP exposes the Selah Bible study app DB for two modes:",
      "- Authoring: audit gaps, upsert devotionals/themes/commentary with source_tier='ai_assisted'.",
      "- Research: cross-cutting queries across scripture, characters, themes, narrative units.",
      "",
      "Before generating any new content for a passage, call get_passage with all relevant include* flags to see what already exists.",
      "When the get_passage response includes a non-empty trimmed[] array, content was dropped — call again with narrower include flags rather than reasoning from the partial payload.",
      "Book IDs are 3-letter uppercase codes (GEN, EXO, ROM, JHN, etc.).",
    ].join("\n"),
  }
);

registerSearchTools(server);
registerPassageTools(server);
registerCharacterTools(server);
registerThemeTools(server);
registerNarrativeTools(server);
registerDevotionalTools(server);
registerCommentaryTools(server);
registerUtilityTools(server);

async function shutdown(signal: string) {
  console.error(`[selah-mcp] received ${signal}, closing...`);
  await closeDb();
  process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("[selah-mcp] server ready on stdio");
