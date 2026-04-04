# Commentary Enrichment Eval — Agent Steps

> **For**: Claude Code agent  
> **Purpose**: Execute the A/B/C commentary evaluation. Do each step in order. Do not skip steps. Report results after each step before proceeding.

---

## Step 1: Fix Commentary Import

1a. Check which commentary sources are registered:
```sql
SELECT id, name FROM commentary_sources;
```
Report the 6 source names.

1b. Check if `04-import-commentaries.ts` exists and examine it for errors:
```bash
find . -name "*import*commentar*" -type f
```
Read the script. Identify why it produced 0 entries.

1c. Fix and re-run the import script. If the script downloads from HelloAO's commentary API, the endpoints are:
- List commentaries: `https://bible.helloao.org/api/available_commentaries.json`
- Commentary chapter: `https://bible.helloao.org/api/c/{commentary_id}/{book}/{chapter}.json`

1d. Verify the import worked:
```sql
SELECT source_id, COUNT(*) as entries FROM commentary_entries GROUP BY source_id;
```
Report the count per source. We need entries > 0 for at least 3 sources before proceeding.

1e. Spot-check commentary data quality:
```sql
SELECT source_id, substr(text, 1, 200) FROM commentary_entries WHERE book_id='JHN' AND chapter=4 AND verse=7 LIMIT 5;
```
Report the first 200 chars from each source for John 4:7.

**STOP. Report results to the user before proceeding to Step 2.**

---

## Step 2: Pull Control Samples (Group A)

Pull the existing narrative units for these four passages exactly as they are in the database. Do not modify them.

2a. OT-1 — The Binding of Isaac:
```sql
SELECT * FROM narrative_units WHERE book_id='GEN' AND chapter_start=22;
```

2b. OT-2 — The Valley of Dry Bones:
```sql
SELECT * FROM narrative_units WHERE book_id='EZK' AND chapter_start=37;
```

2c. NT-1 — The Woman at the Well:
```sql
SELECT * FROM narrative_units WHERE book_id='JHN' AND chapter_start=4;
```

2d. NT-2 — The Road to Emmaus:
```sql
SELECT * FROM narrative_units WHERE book_id='LUK' AND chapter_start=24 AND verse_start>=13;
```

If any of these don't exist yet (especially NT-1 and NT-2 if the Gospels pipeline is still running), generate them using the standard narrative unit prompt from `selah-prebake-prompts.md` Section 2.5 WITHOUT commentary injection. This ensures a clean control.

Save each control sample to a file:
```
eval/control/OT-1-binding-of-isaac.md
eval/control/OT-2-valley-of-dry-bones.md
eval/control/NT-1-woman-at-well.md
eval/control/NT-2-road-to-emmaus.md
```

**STOP. Report to user that control samples are captured before proceeding.**

---

## Step 3: Pull Commentary Data

For each of the four passages, pull ALL commentary entries and format them for injection.

3a. For each passage, run:
```sql
SELECT 
  cs.name as source_name,
  ce.chapter,
  ce.verse,
  ce.text
FROM commentary_entries ce
JOIN commentary_sources cs ON ce.source_id = cs.id
WHERE ce.book_id = '{BOOK_ID}'
  AND ce.chapter = {CHAPTER}
  AND (ce.verse BETWEEN {VERSE_START} AND {VERSE_END} OR ce.verse IS NULL)
ORDER BY cs.name, ce.verse;
```

Passages to query:
- OT-1: book_id='GEN', chapter=22, verses 1-19
- OT-2: book_id='EZK', chapter=37, verses 1-14
- NT-1: book_id='JHN', chapter=4, verses 4-26
- NT-2: book_id='LUK', chapter=24, verses 13-35

3b. Format each passage's commentary data as:
```
=== COMMENTARY: [Source Name] ===
[Book] [Chapter]:[Verse]

[Full commentary text]

=== END [Source Name] ===
```

Concatenate all sources for each passage into a single block.

3c. Save to files:
```
eval/commentary/OT-1-commentary.md
eval/commentary/OT-2-commentary.md
eval/commentary/NT-1-commentary.md
eval/commentary/NT-2-commentary.md
```

3d. Report commentary density — how many sources and total tokens of commentary are available per passage. This matters because sparse commentary won't produce meaningful enrichment.

**STOP. Report commentary density to user before proceeding.**

---

## Step 4: Generate Group B (Enrichment)

For each of the four samples, run the enrichment prompt. Track token usage.

4a. Load the base directive from `selah-prebake-prompts.md` Section 1.

4b. For each sample, construct the prompt:

```
{base_directive}

TASK: Enrich an existing Selah narrative unit with grounded commentary data.

You are receiving:
1. An existing narrative unit generated WITHOUT access to scholarly commentary
2. Actual commentary excerpts from curated sources for this passage

Your job is to ENRICH the existing unit — not replace it. Specifically:

PRESERVE:
- The existing voice, tone, and modern bridge framing (these are strong)
- The existing structure (summary, significance, relational note, conceptual note, climate note, modern parallel, key questions)
- Any insight that is already correct and well-expressed

ADD:
- Specific scholarly observations from the commentary data that the original missed
- Corrections to any claims that the commentary data contradicts
- Deeper linguistic, historical, or theological detail that the commentaries provide
- Attribution notes where commentary sources add meaningful grounding

FLAG:
- Any claim in the original that should be re-tiered (e.g., labeled "scholarship" but actually AI synthesis)
- Any place where the commentary data reveals the original was wrong or misleading

DO NOT:
- Rewrite sections that are already strong
- Change the voice to sound more academic
- Add commentary references for the sake of adding them — only where they genuinely enhance
- Remove modern bridge framing or key questions

OUTPUT: The enriched narrative unit in full, with changes marked using [ENRICHED: ...] tags so we can identify what changed. At the end, include:

ENRICHMENT SUMMARY:
- Claims added: (list)
- Claims corrected: (list)
- Claims re-tiered: (list)
- Sections unchanged: (list)

INPUT — EXISTING UNIT:
{content of eval/control/{sample}.md}

INPUT — COMMENTARY DATA:
{content of eval/commentary/{sample}-commentary.md}
```

4c. Record for each sample:
- Input token count
- Output token count
- Total tokens
- Generation time (seconds)

4d. Save outputs:
```
eval/enriched/OT-1-binding-of-isaac.md
eval/enriched/OT-2-valley-of-dry-bones.md
eval/enriched/NT-1-woman-at-well.md
eval/enriched/NT-2-road-to-emmaus.md
```

**STOP. Report token costs and enrichment summaries to user before proceeding.**

---

## Step 5: Generate Group C (Full Regeneration)

For each of the four samples, regenerate from scratch WITH commentary injection. Track token usage.

5a. Load the base directive from `selah-prebake-prompts.md` Section 1.

5b. Pull the full passage text for each sample:
```sql
SELECT verse, text FROM verses 
WHERE translation_id='BSB' 
  AND book_id='{BOOK_ID}' 
  AND chapter={CHAPTER} 
  AND verse BETWEEN {VERSE_START} AND {VERSE_END}
ORDER BY verse;
```

5c. For each sample, construct the prompt using the standard narrative unit prompt from `selah-prebake-prompts.md` Section 2.5, with this block appended before the passage text:

```
ADDITIONAL SOURCE MATERIAL — SCHOLARLY COMMENTARY:

The following commentary excerpts are from curated Tier 2 sources. Use them to ground your observations, validate your claims, and enrich your analysis. When a commentary source provides a specific insight that strengthens your narrative unit, incorporate it naturally. You don't need to quote verbatim, but your output should reflect awareness of established scholarship.

Where your synthesis goes beyond what these commentaries state, label it source_tier "ai_assisted." Where your observations are directly supported by commentary data, you may label them "scholarship."

{content of eval/commentary/{sample}-commentary.md}
```

Then include the passage text and any existing character profiles, climate context, and theme tags relevant to the passage (query these from the database).

5d. Record for each sample:
- Input token count
- Output token count
- Total tokens
- Generation time (seconds)

5e. Save outputs:
```
eval/regen/OT-1-binding-of-isaac.md
eval/regen/OT-2-valley-of-dry-bones.md
eval/regen/NT-1-woman-at-well.md
eval/regen/NT-2-road-to-emmaus.md
```

**STOP. Report token costs to user before proceeding.**

---

## Step 6: Compile Results Package

6a. Create a results summary file at `eval/results-summary.md` with:

### Token Cost Comparison

| Sample | Group A (Control) | Group B (Enrichment) | Group C (Regeneration) |
|--------|------------------|---------------------|----------------------|
| OT-1 | N/A (sunk) | in: __ out: __ total: __ | in: __ out: __ total: __ |
| OT-2 | N/A (sunk) | in: __ out: __ total: __ | in: __ out: __ total: __ |
| NT-1 | N/A (sunk) | in: __ out: __ total: __ | in: __ out: __ total: __ |
| NT-2 | N/A (sunk) | in: __ out: __ total: __ | in: __ out: __ total: __ |
| **Average** | — | in: __ out: __ total: __ | in: __ out: __ total: __ |

### Commentary Density per Sample

| Sample | Sources Available | Total Commentary Tokens | Commentary-to-Output Ratio |
|--------|------------------|------------------------|---------------------------|
| OT-1 | | | |
| OT-2 | | | |
| NT-1 | | | |
| NT-2 | | | |

### Enrichment Change Summary (Group B)

For each sample, copy the ENRICHMENT SUMMARY from the Group B output:
- How many claims were added?
- How many were corrected?
- How many were re-tiered?
- How many sections were unchanged?

6b. Create a side-by-side comparison directory:
```
eval/side-by-side/OT-1.md   (all three versions concatenated with headers)
eval/side-by-side/OT-2.md
eval/side-by-side/NT-1.md
eval/side-by-side/NT-2.md
```

Each side-by-side file should contain:
```
# [Sample Name] — Side-by-Side Comparison

## GROUP A: Control (No Commentary)
[full control output]

---

## GROUP B: Enrichment (Commentary Added)
[full enriched output with [ENRICHED] tags visible]

---

## GROUP C: Regeneration (From Scratch with Commentary)
[full regenerated output]
```

6c. Report to user that the results package is ready for scoring.

**STOP. Deliver the eval/side-by-side/ files and eval/results-summary.md to the user. The scoring will be done externally using the rubric in selah-commentary-eval.md.**

---

## Notes for the Agent

- Use the same model for Group B and Group C generation. Do not mix models.
- If a passage has zero commentary entries even after fixing the import, note it in the results but still run the enrichment/regeneration with whatever is available. Zero commentary for a passage is itself a finding.
- Do not score the outputs yourself. The scoring will be done by the user and their review partner.
- If the Gospels+Acts pipeline is still running when you reach Step 2, wait for it to complete before pulling NT control samples. Do not interrupt a running pipeline.
- All file paths are relative to the project root.
