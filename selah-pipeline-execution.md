# Selah — Phased Pipeline Execution

> **For**: Claude Code agent  
> **Purpose**: Enrich existing content and generate remaining content with commentary grounding.  
> **Reference docs**: `selah-prebake-prompts.md` (base directive + task prompts), `CLAUDE.md` (project conventions), `selah-commentary-eval.md` (eval methodology and enrichment prompt template)  
> **Pre-requisite**: Commentary entries must be populated in the database (commentary_entries > 0). Verify before starting.

---

## Pre-Flight Check

Before starting any phase, verify the data layer:

```sql
-- Commentary must be populated
SELECT source_id, COUNT(*) as entries FROM commentary_entries GROUP BY source_id;

-- Characters must be loaded
SELECT COUNT(*) FROM characters;  -- expect 252

-- Narrative units must be loaded
SELECT COUNT(*) FROM narrative_units;  -- expect 281+

-- Themes must be loaded
SELECT COUNT(*) FROM themes;  -- expect 294

-- Climate contexts must be loaded
SELECT COUNT(*) FROM climate_contexts;  -- expect 10
```

If commentary_entries is 0, STOP. Fix the import before proceeding.

---

## Phase 1: Enrich Top 126 Characters

### 1.1 Identify the Top 126

Sort characters by narrative weight. Use appearance count if character_appearances is populated, otherwise use a text-search heuristic:

```sql
-- If character_appearances exists and is populated:
SELECT c.id, c.name, COUNT(ca.id) as appearances
FROM characters c
LEFT JOIN character_appearances ca ON c.id = ca.character_id
GROUP BY c.id
ORDER BY appearances DESC
LIMIT 126;

-- If character_appearances is not yet populated, use narrative unit text search:
SELECT c.id, c.name,
  (SELECT COUNT(*) FROM narrative_units nu 
   WHERE nu.summary LIKE '%' || c.name || '%'
   OR nu.relational_note LIKE '%' || c.name || '%'
   OR nu.modern_parallel LIKE '%' || c.name || '%') as mentions
FROM characters c
ORDER BY mentions DESC
LIMIT 126;
```

Save the ranked list to `pipeline/phase1-character-list.json`.

### 1.2 Pull Commentary Data Per Character

For each character, pull commentary entries for ALL passages where they appear. The character profile lists their key references — use those to query commentary.

```sql
-- For a character like 'abraham', pull commentary for all their key passages
-- Adapt the book/chapter/verse ranges per character
SELECT 
  cs.name as source_name,
  ce.book_id,
  ce.chapter,
  ce.verse,
  ce.text
FROM commentary_entries ce
JOIN commentary_sources cs ON ce.source_id = cs.id
WHERE ce.book_id = '{BOOK_ID}'
  AND ce.chapter = {CHAPTER}
  AND ce.verse BETWEEN {VERSE_START} AND {VERSE_END}
ORDER BY cs.name, ce.chapter, ce.verse;
```

Format commentary using the standard injection format from `selah-commentary-eval.md` Section 3.

### 1.3 Enrichment Prompt for Characters

For each of the 126 characters, run this prompt. Prepend the base directive from `selah-prebake-prompts.md` Section 1.

```
TASK: Enrich an existing Selah character profile with grounded commentary data.

You are receiving:
1. An existing character profile generated WITHOUT access to scholarly commentary
2. Actual commentary excerpts from curated sources for the passages where this character appears

Your job is to ENRICH the existing profile — not replace it.

PRESERVE:
- The existing voice, tone, and modern bridge framing
- The existing emotional arc structure
- The existing faith journey narrative
- Any insight that is already correct and well-expressed
- The character's prominence classification (do not upgrade or downgrade)

ADD:
- Specific scholarly observations about this character from the commentary data
- Deeper linguistic detail (original language word meanings, name etymologies)
- Historical and cultural context the commentaries provide about the character's social position, occupation, or era
- Corrections to any claims the commentary data contradicts
- Additional emotional arc moments the commentaries identify that the original missed
- Relationship details the commentaries specify (family connections, political alliances, social dynamics)

FLAG:
- Any claim in the original that should be re-tiered
- Any place where the commentary reveals the original was wrong or incomplete

DO NOT:
- Rewrite the bio_full unless commentary reveals factual errors — the voice is already correct
- Change modern_parallel framing unless it's factually wrong — these are the profile's strongest elements
- Make the voice more academic — commentary enriches content, not tone
- Add commentary citations for the sake of density — only where they genuinely deepen understanding
- Remove or weaken the second lead principle — overlooked characters keep their full depth

OUTPUT: The enriched character profile with changes marked using [ENRICHED: ...] tags. Include an ENRICHMENT SUMMARY at the end listing: claims added, claims corrected, claims re-tiered, sections unchanged.

SECOND LEAD REMINDER: If this character is classified as 'secondary', 'minor', or 'unnamed-notable', they receive the SAME enrichment depth as a 'primary' character. Do not give less attention to less prominent figures.

INPUT — EXISTING PROFILE:
{{existing_character_profile}}

INPUT — COMMENTARY DATA:
{{commentary_excerpts_for_character_passages}}
```

### 1.4 Process and Store

After enrichment:
1. Strip `[ENRICHED: ...]` tags from the final version (tags are for review, not for the user)
2. Update the character record in the database
3. Update `source_tier` to `scholarship` for claims now grounded in commentary, `ai_assisted` for synthesis
4. Update `source_notes` to list the commentary sources consulted

### 1.5 Batch Strategy

Process characters in era groups to maintain contextual consistency:
1. Patriarchal era (Abraham, Isaac, Jacob, Joseph, etc.)
2. Exodus era (Moses, Aaron, Miriam, Pharaoh, etc.)
3. Judges era (Deborah, Gideon, Samson, Ruth, etc.)
4. United monarchy (Saul, David, Solomon, Bathsheba, etc.)
5. Divided monarchy and exile (Elijah, Elisha, Daniel, Esther, Nehemiah, etc.)
6. Life of Christ (Jesus, Mary, Peter, Judas, Pilate, Nicodemus, etc.)
7. Early church (Paul, Barnabas, Timothy, Lydia, Priscilla, etc.)

### 1.6 Quality Gate

After each era batch, spot-check 2-3 profiles:
- Did the enrichment add genuine scholarly depth?
- Was the voice preserved?
- Are source tier labels honest?
- Did the second lead principle hold for minor characters?

**STOP after Phase 1 is complete. Report character enrichment results (count completed, sample enrichment summaries, any issues) before proceeding to Phase 2.**

---

## Phase 2: Enrich Existing 281 Narrative Units

### 2.1 Preparation

Now that character profiles are enriched, narrative unit enrichment has a stronger foundation. For each narrative unit, gather:

1. The existing narrative unit from the database
2. Commentary entries for the passage range
3. The enriched character profiles for characters mentioned in the unit
4. The relevant climate context
5. The relevant theme tags

### 2.2 Pull Commentary Data Per Narrative Unit

```sql
SELECT 
  cs.name as source_name,
  ce.book_id,
  ce.chapter,
  ce.verse,
  ce.text
FROM commentary_entries ce
JOIN commentary_sources cs ON ce.source_id = cs.id
WHERE ce.book_id = '{BOOK_ID}'
  AND ce.chapter BETWEEN {CHAPTER_START} AND {CHAPTER_END}
  AND (
    (ce.chapter = {CHAPTER_START} AND ce.verse >= {VERSE_START})
    OR (ce.chapter = {CHAPTER_END} AND ce.verse <= {VERSE_END})
    OR (ce.chapter > {CHAPTER_START} AND ce.chapter < {CHAPTER_END})
  )
ORDER BY cs.name, ce.chapter, ce.verse;
```

### 2.3 Enrichment Prompt for Narrative Units

Use the enrichment prompt from `selah-commentary-eval.md` Section 2 (Group B). It has been validated across four samples and scored higher than regeneration. The prompt is reproduced here for convenience:

```
TASK: Enrich an existing Selah narrative unit with grounded commentary data.

You are receiving:
1. An existing narrative unit generated WITHOUT access to scholarly commentary
2. Actual commentary excerpts from curated sources for this passage
3. Enriched character profiles for characters present in this passage (if available)
4. Climate context for this passage's era
5. Theme tags for this passage

Your job is to ENRICH the existing unit — not replace it.

PRESERVE:
- The existing voice, tone, and modern bridge framing (these are strong — eval scored 5.0/5.0)
- The existing structure (summary, significance, relational note, conceptual note, climate note, modern parallel, key questions, preaching angles)
- Any insight that is already correct and well-expressed

ADD:
- Specific scholarly observations from the commentary data that the original missed
- Corrections to any claims that the commentary data contradicts
- Deeper linguistic, historical, or theological detail that the commentaries provide
- Attribution notes where commentary sources add meaningful grounding
- Cross-references the commentary identifies that connect to other narrative units

FLAG:
- Any claim in the original that should be re-tiered (eval found this in 3 of 4 samples — it's common)
- Any place where the commentary data reveals the original was wrong or overstated
- Any place where the enriched character profiles add context the original unit missed

DO NOT:
- Rewrite sections that are already strong (modern bridge scored 5.0 — leave it alone)
- Change the voice to sound more academic
- Add commentary references for the sake of adding them
- Remove modern bridge framing or key questions
- Lose the second lead perspective in the relational note

OUTPUT: The enriched narrative unit in full, with changes marked using [ENRICHED: ...] tags. Include an ENRICHMENT SUMMARY at the end.

INPUT — EXISTING UNIT:
{{existing_narrative_unit}}

INPUT — COMMENTARY DATA:
{{commentary_excerpts}}

INPUT — CHARACTER CONTEXT (if available):
{{enriched_character_profiles_for_characters_in_scene}}

INPUT — CLIMATE CONTEXT:
{{climate_context_for_era}}

INPUT — THEME TAGS:
{{theme_tags_for_passage}}
```

### 2.4 Process and Store

After enrichment:
1. Strip `[ENRICHED: ...]` tags from the final version
2. Update the narrative_units record in the database
3. Update `source_tier` — claims grounded in commentary become `scholarship`, synthesis stays `ai_assisted`
4. Update `source_notes` with commentary sources consulted
5. Preserve all existing cross-reference links, theme tags, and climate context associations

### 2.5 Batch Strategy

Process by canonical book order to maintain narrative flow:
1. Torah (Genesis through Deuteronomy)
2. Historical books (Joshua through Esther)
3. Wisdom and poetry (Job through Song of Solomon)
4. Major prophets (Isaiah through Daniel)
5. Minor prophets (Hosea through Malachi)
6. Gospels and Acts (Matthew through Acts)

### 2.6 Quality Gate

After each book group, spot-check 3-5 narrative units:
- Did the enrichment add genuine scholarly depth?
- Was the voice preserved (compare modern bridge sections before/after)?
- Are source tier labels honest and specific?
- Were any claims corrected? Document what was found.
- Did the relational note maintain the second lead perspective?

Track aggregate metrics across all units:
- Total claims added
- Total claims corrected
- Total claims re-tiered
- Sections most frequently unchanged (expect modern parallel and key questions)

**STOP after Phase 2 is complete. Report narrative enrichment results (count completed, aggregate metrics, any patterns in corrections) before proceeding to Phase 3.**

---

## Phase 3: Generate Remaining Narrative Units (Epistles through Revelation)

### 3.1 Define Pericope Boundaries

Before generating, define the narrative unit boundaries for each remaining book. Epistles are not narrative — they need different unit boundaries:

- **Pauline epistles**: Divide by argument unit or topic (e.g., Romans 1:18-32 "The Wrath of God", Romans 3:21-31 "Justification by Faith", Romans 7:14-25 "The Internal War")
- **General epistles**: Divide by topic or pastoral instruction block
- **Hebrews**: Divide by theological argument sections (these are well-defined and scholarly consensus is strong)
- **Revelation**: Divide by vision sequence (letters to churches, seal judgments, trumpet judgments, bowl judgments, final vision)

Save the boundary definitions to `pipeline/phase3-pericope-boundaries.json` for review before generation begins.

### 3.2 Generation Prompt

Use the standard narrative unit generation prompt from `selah-prebake-prompts.md` Section 2.5, with commentary injected from the start. Also inject enriched character profiles and relevant climate context.

```
{base_directive from selah-prebake-prompts.md Section 1}

{narrative_unit_task_prompt from selah-prebake-prompts.md Section 2.5}

ADDITIONAL SOURCE MATERIAL — SCHOLARLY COMMENTARY:

The following commentary excerpts are from curated Tier 2 sources. Use them to ground your observations, validate your claims, and enrich your analysis. When a commentary source provides a specific insight that strengthens your narrative unit, incorporate it naturally.

Where your synthesis goes beyond what these commentaries state, label it source_tier "ai_assisted." Where your observations are directly supported by commentary data, you may label them "scholarship."

{{commentary_excerpts}}

ADDITIONAL CONTEXT — ENRICHED CHARACTER PROFILES:

{{enriched_character_profiles_for_characters_in_passage}}

ADDITIONAL CONTEXT — CLIMATE:

{{climate_context_for_era}}

ADDITIONAL CONTEXT — THEME TAGS:

{{relevant_themes_from_taxonomy}}

EPISTLE ADAPTATION NOTE:

If this passage is from an epistle (letter), adapt the three-lens framework as follows:
- RELATIONAL NOTE: Focus on the relationship between the author and the recipients. Who is writing, to whom, and what is the relational dynamic? What is the author's emotional state? What crisis or question prompted this section of the letter?
- CONCEPTUAL NOTE: Focus on the theological argument being made. What claim is being advanced? What objection is being anticipated? How does this argument connect to themes elsewhere in Scripture?
- CLIMATE NOTE: Focus on the situation of the recipient community. What is the political, social, and religious context of the church being addressed? What pressures are they facing?

For Revelation, adapt similarly:
- RELATIONAL NOTE: Focus on the relationship between Christ and the churches, or between the visionary and the audience
- CONCEPTUAL NOTE: Focus on the symbolic and theological meaning of the vision
- CLIMATE NOTE: Focus on the persecution context and the political situation of late first-century Asia Minor
```

### 3.3 Books to Generate

Process in this order:

| Group | Books | Estimated Units |
|---|---|---|
| Pauline epistles (early) | Romans, 1-2 Corinthians, Galatians | 40-50 |
| Pauline epistles (prison) | Ephesians, Philippians, Colossians, Philemon | 15-20 |
| Pauline epistles (pastoral) | 1-2 Timothy, Titus | 10-15 |
| Pauline epistles (other) | 1-2 Thessalonians | 8-10 |
| General epistles | Hebrews, James, 1-2 Peter, 1-3 John, Jude | 30-40 |
| Apocalyptic | Revelation | 20-25 |

Total estimated: 123-160 new narrative units.

### 3.4 Batch Strategy

Process by book group as listed above. Within each group, process book by book in canonical order.

For each book:
1. Pull all commentary entries for the entire book
2. Pull all enriched character profiles relevant to the book
3. Pull the climate context for the era (life-of-christ or early-church for most NT books)
4. Pull relevant themes from the taxonomy
5. Generate narrative units for each defined pericope

### 3.5 Quality Gate

After each book group, spot-check 3-5 narrative units:
- Does the three-lens framework adapt properly for epistles? (The relational note should focus on author-recipient dynamics, not scene cast)
- Does the modern bridge work for theological argument passages? (This is the hardest adaptation — "Romans 3:21-31" needs a modern parallel that isn't just restating the theology)
- Are commentary sources integrated naturally, not just appended?
- Is the voice consistent with the Torah and prophets units?
- For Revelation: does the climate note ground the apocalyptic imagery in first-century persecution context?

**STOP after Phase 3 is complete. Report generation results (count per book, quality observations, any books that required prompt adaptation) before proceeding to Scene Cast and Devotionals.**

---

## Post-Phase Checklist

After all three phases are complete, verify the full dataset:

```sql
-- Total narrative units (should be 281 + ~140 = ~420+)
SELECT COUNT(*) FROM narrative_units;

-- Narrative units by source tier
SELECT source_tier, COUNT(*) FROM narrative_units GROUP BY source_tier;

-- Characters enriched
SELECT COUNT(*) FROM characters WHERE source_notes LIKE '%commentary%' OR source_notes LIKE '%enriched%';

-- Coverage check: any books without narrative units?
SELECT b.id, b.name, COUNT(nu.id) as units
FROM books b
LEFT JOIN narrative_units nu ON b.id = nu.book_id
GROUP BY b.id
ORDER BY units ASC;
```

Report the full dataset status before moving to Scene Cast (Phase 4) and Devotionals (Phase 5).

---

## Critical Reminders

1. **Base directive is non-negotiable.** Every prompt — enrichment or generation — gets the base directive prepended. No exceptions. The six core tenets (canon first, source tier honesty, second lead, modern bridge voice, non-denominational, structured output) must govern every piece of generated content.

2. **Voice preservation is paramount in enrichment.** The eval proved that enrichment outperforms regeneration specifically because it preserves voice. If you find yourself rewriting a modern parallel that already scored 5.0, stop. Add scholarly grounding, don't replace emotional resonance.

3. **Source tier labels must be earned.** "Scholarship" means a commentary source supports the claim. "AI-assisted" means you synthesized across sources. "Conjecture" means you went beyond what any source establishes. If in doubt, tier DOWN, not up. The user's trust depends on this honesty.

4. **Commentary density varies by book.** Gospels will have rich commentary for every verse. Minor prophets may have sparse coverage. Note commentary density per book — sparse commentary is itself a finding and affects what tier labels are appropriate.

5. **The second lead principle applies to enrichment too.** When enriching a narrative unit's relational note, don't let commentary pull focus back to the protagonist. If the original note highlighted an overlooked character's perspective, the enrichment should deepen that perspective, not redirect to the main character because the commentary has more to say about them.

6. **Stop between phases.** Report results before proceeding. Each phase builds on the previous one. If Phase 1 reveals issues, they need to be resolved before Phase 2 begins.
