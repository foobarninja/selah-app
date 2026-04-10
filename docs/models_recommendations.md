# Selah AI Models: Recommendations, Testing Criteria, and Benchmarks

**Last validated:** 2026-04-09
**Test passage:** Judges 6 (Gideon's Call)

This document is the permanent reference for Selah's AI model selection, testing methodology, and performance benchmarks. It captures what we know about how different models perform on Selah's grounded scholarship use case and how to reproduce the evaluations.

---

## 1. Quick Recommendations

### By budget and deployment

| Tier | Primary Pick | Cost Profile | Deployment |
|---|---|---|---|
| **Premium (gold standard)** | Claude Opus 4.6 | ~$15 / $75 per M tokens | OpenRouter |
| **Premium alternative** | Grok 4.2 | varies | OpenRouter |
| **Default hosted** ⭐ | Claude Haiku 4.5 | ~$1 / $5 per M tokens | OpenRouter |
| **Mid-tier hosted** | Claude Sonnet 4.6 | ~$3 / $15 per M tokens | OpenRouter |
| **Local / Privacy** | Gemma 4 31B | free (local) | Ollama or OpenRouter |
| **Budget hosted** | DeepSeek V3.1 | very low | OpenRouter |

⭐ **Recommended default for new users on hosted plans.** Claude Haiku 4.5 offers ~95% of the quality of the top-tier models at a fraction of the cost.

### By use case

- **Serious research / academic work:** Grok 4.2 (deepest climate context sweep)
- **Thoughtful pastoral conversation:** Claude Sonnet 4.6 or Opus 4.6 (warmest prose, best philosophical voice)
- **Cost-conscious daily use:** Claude Haiku 4.5 (best cheap-tier model)
- **Privacy / local-only:** Gemma 4 31B (best open-weight)
- **Multi-provider with tight budget:** DeepSeek V3.1 (strong value, tier compliance good)

### Models to AVOID as primary production picks

- **GPT-4.1-mini** — worst tier compliance of all tested models, weak pipeline engagement
- **Gemma 3 27B** — fine but consistently a step below Gemma 4 31B
- **Qwen 122B** — capable but doesn't match top tier on grounding fidelity despite higher parameter count

---

## 2. What We're Testing For

Selah's AI output must satisfy **five dimensions** simultaneously. Any model that fails badly on one of them is not production-viable, regardless of its strength elsewhere.

### Dimension 1: Tier label compliance

Every substantive claim in the response must be labeled inline with exactly one of these markers:

- `(Canon)` — Direct Scripture text or close paraphrase (BSB translation)
- `(Scholarship)` — Named commentary excerpts or Hebrew/Greek word studies
- `(Historical)` — Archaeological, geographic, or cultural context
- `(AI-Assisted)` — Curated narrative analysis or interpretive synthesis
- `(Conjecture)` — Speculative interpretations (only when user requests)

**Acceptable variants:**
- Labels at end of sentence (preferred, matches few-shot example)
- Labels at start of paragraph (acceptable — Claude Opus and GPT-5.4 use this)

**NOT acceptable:**
- Numeric form: `(Tier 1)`, `(Tier 2)`, etc.
- Prose attribution: "the commentary notes," "the narrative context says"
- Missing labels on any paragraph
- Scripture quotes labeled as `(AI-Assisted)` instead of `(Canon)`

### Dimension 2: Pipeline fingerprints (grounding depth)

The model should surface curated data from the Selah database rather than falling back to parametric/training memory. The Gideon benchmark has a specific set of fingerprints traceable to specific DB fields:

| Fingerprint | DB Source | Required Tier |
|---|---|---|
| `"limestone bedrock"` (winepress location) | `narrative_units.climate_note` | (Historical) |
| `"painfully slow and inefficient"` (threshing) | `narrative_units.climate_note` | (Historical) or (AI-Assisted) |
| `"semi-nomadic pastoralists"` | `narrative_units.climate_note` | (Historical) |
| `"camels without number"` / camel military advantage | `narrative_units.climate_note` | (Historical) |
| `"harvest time"` raid pattern | `narrative_units.climate_note` | (Historical) |
| `"hiding food in caves and presses"` | `climate_contexts.economic` | (Historical) |
| `"locusts"` simile for Midianite incursions | `narrative_units.climate_note` | (Historical) |
| `"swarm like locusts"` | `narrative_units.climate_note` | (Historical) |
| `"divine sarcasm or divine vision"` dual reading | `narrative_units.significance` | (AI-Assisted) |
| `"radical disconnect between self-perception and divine perception"` | `narrative_units.relationalNote` | (AI-Assisted) |
| `"least member of the weakest clan"` (Judges 6:15) | Canon text | (Canon) |
| `"first genuinely theological question in Judges"` | `narrative_units.significance` | (AI-Assisted) |
| `"diminishing returns"` (fleece tests) | `narrative_units.conceptualNote` | (AI-Assisted) |
| `"doubt feeds on itself... substitute for trust"` | `narrative_units.conceptualNote` | (AI-Assisted) |
| `"honest doubt vs anxious control"` | `narrative_units.conceptualNote` | (AI-Assisted) |
| `"unlikely containers"` (God's choice pattern) | `narrative_units.significance` | (AI-Assisted) |
| `"bank account and calling / MRI results and the prayer"` | Faith vs. Sight theme definition | (AI-Assisted) |

**A+ models hit ~12-15 of these fingerprints.**
**A models hit ~8-12.**
**B models hit ~5-8.**
**C models hit <5.**

### Dimension 3: Commentary attribution

The Selah grounding context includes real scholarly commentary. The model should:

- Cite commentators **by name** (primarily John Gill for the Gideon passage)
- Use **verbatim or near-verbatim quotes** when referencing curated commentary
- **NOT fabricate** quotes or attribute claims to unnamed "scholars"

**Verification:** The Gill quote for Judges 6:7 starts with *"such was the goodness and compassion of God to them..."* and can be confirmed in `commentary_entries` via:

```bash
node -e "const db = require('better-sqlite3')('./data/selah.db'); const rows = db.prepare(\"SELECT text FROM commentary_entries WHERE text LIKE '%goodness and compassion%' LIMIT 3\").all(); rows.forEach(r => { console.log('---'); console.log(r.text.slice(0, 500)); }); db.close();"
```

### Dimension 4: Scripture quote discipline

- Direct Scripture quotes must be attributed with `(Canon)` tier
- Book:chapter:verse citation should be present when possible (e.g., "Judges 6:12")
- BSB translation is the canonical source — no other translations inside quote marks
- For verses NOT in the provided Full Text sections, use indirect speech (*"The text says that..."*) rather than guessing

### Dimension 5: Format and readability

- `###` section headers for multi-part questions
- Flowing paragraphs (not bullet lists) for theological analysis
- `**bold**` sparingly for key terms, theme names, Hebrew/Greek words
- `*italics*` for emphasis or indirect Scripture references

---

## 3. The Gideon Benchmark (Reproducible Test)

### Standard test prompt

The canonical benchmark question used to evaluate every model in this document:

> **Why does God call Gideon a 'mighty warrior' when he's hiding in a winepress? What does the fleece incident reveal about the nature of doubt?**

A three-part variant adds a modern application component:

> Why does God call Gideon a 'mighty warrior' when he's hiding in a winepress? What does the fleece incident reveal about the nature of doubt? From this experience Gideon had, how can we learn to be faithful in today's climate?

**Why this question is a good benchmark:**
1. **Multi-part** — tests whether the model structures responses with `###` headers
2. **Theologically rich** — requires engagement with narrative_units theological analysis fields
3. **Historically specific** — Judges 6 has deep climate_contexts data (Period of Judges)
4. **Has a canonical commentary citation** — Gill on Judges 6:7 is verifiable in the DB
5. **Has specific quotable Hebrew** (`gibbôr heḥayil`) for models that engage Strong's data
6. **Has a modern application section** (three-part variant) — tests whether the model can bridge curated data to contemporary life while maintaining tier discipline

**Parameters for the standard test:**

```
Temperature:       0.5
Top P:             0.85
Max tokens:        2400
Frequency penalty: 0.6
Presence penalty:  0.5
```

**Setup requirements:**
- Reader must be in Judges 6
- Grounding context should include climate toggle ON
- All commentary sources enabled

---

## 3a. Materials the Models Are Drawing From

This is the curated data that lives in the Selah database for the Gideon benchmark. When grading a response, these are the sources the model should be echoing, quoting, or paraphrasing. Content that appears in a response but is NOT in these materials is either the model's own synthesis (should be tagged `(AI-Assisted)`) or fabrication (red flag).

### Narrative Unit: "Gideon's Call"

**Table:** `narrative_units` | **ID:** `jdg-gideons-call` | **Book:** JDG | **Chapter:** 6

**`climate_note`:**
> The Midianite incursions described here follow a pattern well-attested in the ancient Near East: semi-nomadic pastoralists raiding settled agricultural communities at harvest time. The 'camels without number' are significant — the domestication of the camel for warfare gave Midianite raiders a devastating speed advantage over settled Israelite farmers. The winepress where Gideon hides would have been cut into limestone bedrock, a natural depression that offered concealment. Threshing wheat in such a confined space would have been painfully slow and inefficient — a vivid image of how occupation degrades not just safety but daily life.

**`conceptual_note`:**
> Gideon's demand for signs raises the theological question of how God communicates and how much certainty faith requires. The text's nuance is important: God gives the signs. Doubt is not punished. But the fleece tests are narrated with a sense of diminishing returns — each one is less dramatic, more controlling, more about Gideon's anxiety than God's glory. The theological principle seems to be that God meets people in their doubt, but doubt that feeds on itself eventually becomes a substitute for trust rather than a path toward it.

**Additional narrative fields a good response may draw on:** `summary`, `significance` (source of "first genuinely theological question in Judges" framing, divine sarcasm/vision dual reading, radical disconnect between self-perception and divine perception), `relational_note`, `key_questions`, `preaching_angles`.

### Climate Context: "The Period of the Judges"

**Table:** `climate_contexts` | **ID:** `judges` | **Era:** judges | **Date range:** ~1380–1050 BC

Grok 4.2 is the only model tested that consistently pulls from the individual fields of this row. Most other models only read the narrative unit's `climate_note`. Key field content:

**`economic` (excerpt):**
> Most families were essentially self-sufficient, producing their own food, making their own tools and textiles... A single bad harvest could push a family from subsistence to starvation — which is exactly the setup of the book of Ruth... **Midianite raiders in Gideon's time destroyed crops and livestock, reducing the Israelites to hiding food in caves and wine presses.** The Philistine monopoly on iron-working (1 Samuel 13:19-22)... meant that Israelite farmers had to go to Philistine smiths to sharpen their agricultural tools — a form of economic dependency that doubled as military control.

**`social` (excerpt):**
> Society during the Judges period was organized around three concentric circles: the household (bet 'av), the clan (mishpachah), and the tribe (shevet)... The book of Judges chronicles a progressive moral deterioration... The repeated refrain "in those days there was no king in Israel; everyone did what was right in their own eyes" is not celebrating individual freedom — it is describing social collapse.

**`political` content** describes decentralized tribalism, no standing army, reliance on charismatic leaders raised in crisis.

**`religious` content** describes the syncretic environment where pragmatic hedging with local deities was common.

### Commentary: John Gill on Judges 6

**Table:** `commentary_entries` | **Source:** John Gill

**Verbatim text for Judges 6:7** (verifiable via DB query):

> And it came to pass, when the children of Israel cried unto the Lord, because of the Midianites. Because of their oppressions and ill usage of them, and not because of their sins, which had brought those evils on them, of which, at present, they seemed not to be sensible; **and yet such was the goodness and compassion of God to them, that having a mind to deliver them, he immediately, on their crying to him, sends them a messenger to bring them to a sense of their sins, and prepare them for the deliverance he designed for them.**

When a model quotes any portion of the bolded text verbatim or near-verbatim, it is drawing from curated scholarship correctly. When a model attributes a different claim to Gill without a matching DB entry, flag as potential fabrication.

**DB verification query:**

```bash
node -e "const db = require('better-sqlite3')('./data/selah.db'); const rows = db.prepare(\"SELECT text FROM commentary_entries WHERE text LIKE '%goodness and compassion%' LIMIT 3\").all(); rows.forEach(r => { console.log('---'); console.log(r.text.slice(0, 500)); }); db.close();"
```

### Themes used in the Gideon benchmark

**Weakness and Power** (`themes.id = weakness-and-power`):
- **Definition:** The paradox at the heart of the gospel: God's power is made perfect in weakness. Paul boasts in his limitations because that's where God's strength shows up most clearly.
- **Modern framing:** The stuttering speaker who changes the room, the small church that feeds the whole block, the recovering addict who sponsors ten others. **God has a thing for unlikely containers.**

**Faith vs. Sight** (`themes.id = faith-vs-sight`):
- **Definition:** The tension between trusting what God has promised and relying only on what can be seen and measured. Paul writes, "We walk by faith, not by sight" (2 Corinthians 5:7).
- **Modern framing:** Faith vs. sight is the tension between your **bank account** and your **calling**, between the **MRI results** and the prayer you prayed. It's every moment where the evidence says one thing and your gut — or God — says another.

**Calling** (`themes.id = calling`):
- **Definition:** God's initiative in summoning people to particular purposes. From 'Abraham, go' to 'Samuel, Samuel' to 'Follow me,' calling in Scripture is always God's move first. It's less about finding your passion and more about **being found by a Person with a plan.**
- **Modern framing:** Calling isn't the motivational poster about following your dreams — it's the unsettling sense that you're supposed to do something specific.

**Key phrases to watch for (pipeline fingerprints):**
- "unlikely containers" → Weakness and Power
- "bank account and calling" / "MRI results and the prayer" → Faith vs. Sight
- "being found by a Person with a plan" → Calling

If a model paraphrases these exact phrases, it is drawing from the Theme definitions and should be credited accordingly.

---

## 3b. Grading Rubric (with worked examples)

### A+ (Top Tier) — 12+ pipeline fingerprints

- All paragraphs tier-labeled, correct named format
- Multiple `(Canon)` labels on properly attributed Scripture quotes
- Named commentary citation with verbatim or near-verbatim quote from the DB
- Climate fingerprints hit including the deepest ones (camels, pastoralists, caves/cisterns, or limestone bedrock)
- Multiple themes named explicitly (Weakness and Power, Faith vs. Sight, Calling)
- Strong markdown formatting with headers, bold, flowing prose
- Original synthesis clearly distinguished from curated content

### A (Production-Viable) — 8-12 pipeline fingerprints

- All paragraphs correctly labeled with named tiers
- Commentary mentioned by name even if not verbatim
- Most Scripture quotes tagged `(Canon)` correctly
- At least 2-3 climate/historical fingerprints hit (e.g., limestone + hilltop threshing contrast + "painfully slow and inefficient")
- Decent markdown formatting
- Narrative unit engagement strong (diminishing returns, doubt feeds on itself, divine vision/sarcasm)

### A− / B+ (Backup Tier) — 5-8 pipeline fingerprints

- Tier labels present but distribution off (e.g., too much `(AI-Assisted)` safe-defaulting)
- Commentary generic or unnamed
- Some Scripture quotes tagged correctly, some missed
- Surface climate engagement only (hilltop contrast but no limestone or camels)
- Some pipeline phrases appear but weak

### B or below (Not Recommended)

- Missing tier labels, numeric substitutes, or prose attribution substitutes
- Fewer than 5 fingerprints
- Commentary fabricated, unattributed, or absent entirely
- Scripture quotes mislabeled as `(AI-Assisted)` (GPT-5.4 pattern without disambiguation fix)
- Format problems or empty sections

---

## 3c. Sample Responses (from the 2026-04-09 evaluation)

These excerpts are drawn from actual responses during benchmark testing. Use them as reference examples of what A+, A, and B-tier responses look like in practice.

### A+ Sample: Claude Opus 4.6

**Why this is A+:** Every tier used appropriately, verbatim Gill quote matches DB, Hebrew etymology adds scholarly depth no other model surfaced, beautiful original prose, multiple Canon quotes, full climate fingerprint set.

Excerpt from the mighty warrior section:

> The text sets up one of the sharpest contrasts in the Old Testament. Israel has been devastated by Midianite raiders for seven years — semi-nomadic pastoralists who swept in at harvest time on camels, destroying crops and livestock, leaving Israel starving (Canon). When the angel of the LORD appears, Gideon is threshing wheat in a winepress (Canon). That detail is everything: you thresh wheat on an open hilltop where the wind can separate grain from chaff, but a winepress is a depression cut into limestone bedrock — essentially a hole in the ground (Historical). Gideon is doing the right work in the wrong place because he is afraid, and the inefficiency of the task is a vivid image of how occupation degrades not just safety but the rhythms of daily life (AI-Assisted).
>
> Into this scene comes the greeting: "The LORD is with you, mighty warrior" (Canon). The Hebrew **gibbôr heḥayil** is a term used elsewhere for elite soldiers and men of standing — it is not a casual compliment but a title of real weight (Scholarship). And it lands on a man crouching in a hole, hiding his grain from raiders. The dissonance is deliberate.
>
> [... later ...]
>
> *If it is* **vision**, *then God is naming what Gideon will become — seeing the deliverer inside the frightened farmer the way a sculptor sees the statue inside the marble.*

**Fingerprints hit in this excerpt alone:** limestone bedrock, semi-nomadic pastoralists, camels at harvest time, "painfully slow and inefficient" (paraphrased), hilltop threshing contrast, "doing the right work in the wrong place," "occupation degrades... daily life," Hebrew gibbôr heḥayil, radical disconnect between self-perception and divine perception.

### A+ Sample: Grok 4.2 (Deepest Pipeline Sweep)

**Why this is A+:** Only model that pulls from `climate_contexts.political`, `.religious`, `.economic` fields individually. Dense academic register. Multi-theme naming.

Excerpt showing the multi-field climate sweep:

> Historically, the winepress detail aligns with the limestone geology of the central hill country during the Judges period, where such depressions offered concealment from semi-nomadic raiders like the Midianites, whose camel-based mobility allowed rapid strikes at harvest time and reduced Israelite farmers to hiding grain in caves and presses, degrading daily agricultural life (Historical). The period's decentralized tribalism, with no standing army and reliance on charismatic leaders raised amid crisis, underscores why a fearful farmer might be summoned: the system expected God to equip unlikely figures when threats like these locust-like incursions overwhelmed subsistence communities (Historical).
>
> [... later, on the fleece ...]
>
> Culturally, in the Judges era's syncretic religious environment, where pragmatic hedging with local deities was common, Gideon's tests reflect a tension between trust in the invisible LORD and the visible assurances farmers sought for survival in marginal hill-country terrain (Historical).

**Fingerprints hit:** limestone, semi-nomadic raiders, camel-based mobility, harvest time, caves and presses, decentralized tribalism, charismatic leaders, locust-like incursions, subsistence communities, syncretic religious environment, marginal hill-country terrain. Pulled from FOUR different `climate_contexts` fields (political, religious, economic, geographic) plus `narrative_units.climate_note`.

### A+ Sample: Claude Sonnet 4.6 / Haiku 4.5 (Verbatim Gill)

**Why this is A+:** Verbatim commentary citation extended longer than most models caught.

Excerpt showing proper Gill attribution:

> (Scholarship) John Gill notes that when the children of Israel cried out to the LORD because of the Midianites, "such was the goodness and compassion of God to them, that having a mind to deliver them, he immediately, on their crying to him, sends them a messenger to bring them to a sense of their sins, and prepare them for the deliverance he designed for them."

**Verification:** This quote matches the DB text verbatim in `commentary_entries`. No fabrication.

### A Sample: Gemma 4 31B (Production Default)

**Why this is A:** Clean tier distribution, end-of-sentence positioning matching the few-shot, good pipeline engagement on the core fingerprints (limestone, painfully slow, occupation degraded).

Excerpt:

> When the angel of the LORD appears to Gideon, he greets him with a startling declaration: "The LORD is with you, mighty warrior" (Canon). At this moment, however, Gideon is not leading an army; he is "threshing wheat in a winepress" to hide from the Midianites (Canon). This location is highly unusual because wheat is typically threshed on a hilltop where the wind can carry away the chaff, whereas a winepress was a hole cut into the limestone bedrock (Historical). Threshing in such a confined space would have been painfully slow and inefficient, serving as a vivid image of how Midianite occupation degraded every aspect of daily life (Historical).
>
> [... later ...]
>
> John Gill notes that when Israel cried out to the Lord because of Midianite oppression, they did so because of their ill usage rather than a sense of their own sins; consequently, God sent a messenger to bring them to a sense of their sins before delivering them (Scholarship).

**Fingerprints hit:** limestone bedrock, hilltop threshing contrast, "painfully slow and inefficient" (verbatim from `climate_note`), "occupation degraded every aspect of daily life" (paraphrase), Gill named with paraphrased quote.

**Tier distribution:** Multiple `(Canon)` including close paraphrases, 2 `(Historical)`, 1 `(Scholarship)`, appropriate `(AI-Assisted)` for synthesis. Clean and balanced.

### B Sample: Gemini 2.5 Flash

**Why this is B (not production-recommended):** Strong narrative unit quoting, but zero `(Scholarship)` labels, zero climate fingerprints (misses even limestone), misses all commentary data.

Excerpt:

> The angel of the LORD greets Gideon with the words, "The LORD is with you, mighty warrior" (Canon), even though Gideon is found "threshing wheat in a winepress, hiding from the Midianites" (AI-Assisted). This greeting is striking because threshing wheat typically occurs on a hilltop to allow the wind to separate the grain from the chaff, whereas a winepress is a hole in the ground used for pressing grapes, offering concealment (Historical).
>
> [... continues with many quoted phrases from narrative_units content, all labeled (AI-Assisted) ...]

**Tier distribution:** 2 `(Canon)`, 1 `(Historical)`, **0 `(Scholarship)`**, ~15 `(AI-Assisted)`. The heavy (AI-Assisted) skew and total absence of (Scholarship) indicates the model is not reading the `commentary_entries` data at all. Limestone bedrock is also missing — it's reading `narrative_units.significance` and related fields but not `climate_note`.

### C Sample: GPT-5.4 WITHOUT the disambiguation fix

**Why this is C:** Model interpreted `(AI-Assisted)` literally ("I'm an AI, everything I write is AI-Assisted") and applied it even to direct Scripture quotes. **Zero `(Canon)` labels** despite a direct BSB quote appearing in the text.

Excerpt (showing the failure mode):

> (AI-Assisted) The text says, "The LORD is with you, mighty warrior" — a salutation that lands on a man who is literally threshing wheat in a winepress to hide from the Midianites. (AI-Assisted) This is either divine sarcasm or divine vision...

The Scripture quote should be `(Canon)`. The model mislabeled it as `(AI-Assisted)` because it interpreted the tier name as referring to its own AI identity rather than to content provenance. **This is the specific failure mode that the disambiguation block in `<source_tiers>` fixes.** After the fix was added to the system prompt, GPT-5.4 correctly labeled the same quote as `(Canon)` on re-test.

---

## 4. Detailed Model Rankings

### Top Tier (Production Recommended)

#### Claude Opus 4.6 — A+ (Gold Standard)
- **Strengths:** Perfect tier distribution, verbatim Gill quote, Hebrew etymology (`gibbôr heḥayil`), Romans 4:17 cross-reference, beautiful original metaphors ("sculptor sees the statue in the marble"), hits camels + pastoralists + harvest + limestone
- **Weaknesses:** Most expensive option
- **Best for:** Users who want the absolute best Selah experience regardless of cost

#### Grok 4.2 — A+ (Deepest Pipeline Sweep)
- **Strengths:** Only model to pull from `climate_contexts.political`, `.religious`, `.economic` fields individually (other models only read `narrative_units.climate_note`). Dense academic prose. Hits all climate fingerprints including "syncretic religious environment" and "decentralized tribalism" no other model found.
- **Weaknesses:** Academic register may feel cold for pastoral use. Long dense paragraphs, less accessible.
- **Best for:** Serious research, sermon preparation, theological depth

#### Claude Haiku 4.5 — A (Best Cost/Quality)
- **Strengths:** Near-Sonnet quality at ~1/3 the cost. Verbatim Gill citation (extended even further than Sonnet 4.6 caught). Family trait preservation — Anthropic's Constitutional AI training produces grounding fidelity at every model size.
- **Weaknesses:** Doesn't hit the deepest fingerprints (camels, cisterns) consistently. No Hebrew etymology.
- **Best for:** **Recommended production default for most hosted users.** Best cost-quality ratio in the entire lineup.

#### Claude Sonnet 4.6 — A+ (Warm Prose)
- **Strengths:** Verbatim Gill quote, deep narrative engagement, philosophical "and yet, here's the grace" rhetorical moves, first-person model voice when appropriate. Hits camels + limestone + all narrative fingerprints.
- **Weaknesses:** Mid-tier cost; slightly less depth than Opus; less cost-efficient than Haiku.
- **Best for:** Users who want warm pastoral prose at a moderate price point

#### Gemma 4 31B — A (Best Open-Weight)
- **Strengths:** Runs locally via Ollama or cheaply via OpenRouter. Consistent hits on limestone + painfully slow + occupation degraded + theme names. Always correct end-of-sentence tier positioning. Strong markdown compliance.
- **Weaknesses:** Misses camels/cisterns inconsistently. Sometimes light on (Historical) label variety.
- **Best for:** Privacy-conscious users, offline deployment, cost-free local inference

### Solid Backups

#### DeepSeek V3.1 — A (Budget Hosted)
- **Strengths:** Strong tier compliance, names commentary sources, very cheap. Fixed stream corruption via the `delta.reasoning_content` adapter fix.
- **Weaknesses:** HAD stream corruption that required fixing in `openrouter.ts`. Dense reasoning tokens can interleave if `disableThinking: true` isn't set.
- **Best for:** Budget-conscious hosted deployment; strong tier compliance at very low cost

#### GPT-4.1 — A− (Reliable but Editorial)
- **Strengths:** Consistent tier compliance, names Gill, good format, reliable availability
- **Weaknesses:** Editorial bias — rewrites curated content in own voice, loses pipeline-specific vocabulary. Misses camels, limestone, cisterns. Paraphrases rather than quotes scholarship.
- **Best for:** Users who already have OpenAI billing; reliable fallback when Anthropic is unavailable

### Specialty / Situational

#### GPT-5.4 — B+ (Requires Disambiguation Prompt)
- **Strengths:** Strong instruction following, good grasp of complex rhetorical structure
- **Weaknesses:** Initially failed to label Scripture as `(Canon)` — interpreted `(AI-Assisted)` literally ("I am an AI, so this label applies to everything I write"). Uses paragraph-start label positioning (different from few-shot example).
- **Fix required:** The disambiguation block in `<source_tiers>` section of system prompt is load-bearing for GPT-5.4. DO NOT remove.
- **Best for:** Users who specifically prefer OpenAI and want the newest model

#### Qwen 122B — A− (Capable but Inconsistent)
- **Strengths:** Produces tier labels, good narrative engagement
- **Weaknesses:** Despite 4x the parameters of Gemma 4 31B, doesn't match its pipeline depth. Capacity isn't the bottleneck — grounding instinct is.
- **Best for:** Users who already use Qwen for other purposes

#### Gemini 2.5 Flash — B (Smart Quoting, Shallow Sweep)
- **Strengths:** Smart double attribution (quotation marks + tier labels). Strong narrative-unit engagement via direct quotes.
- **Weaknesses:** Zero (Scholarship) labels — doesn't touch commentary data. Zero climate fingerprints. Misses limestone even.
- **Best for:** Not recommended as primary; use Gemma 4 for free/cheap instead

#### GPT-4.1-mini — C (Worst Performer)
- **Weaknesses:** Weakest tier compliance of all tested models. Shallow pipeline engagement. Avoid as production pick.

#### Gemma 3 27B — A− (Lighter Gemma)
- **Strengths:** Good fallback when Gemma 4 31B is unavailable
- **Weaknesses:** Lighter on (Historical) labels than Gemma 4; slightly less pipeline depth

---

## 5. Parameter Defaults

**Recommended for all providers (OpenRouter, Ollama, custom):**

```
Temperature:       0.5
Top P:             0.85
Max tokens:        2400
Frequency penalty: 0.6
Presence penalty:  0.5
```

**Rationale:**

- **Temperature 0.5** — The prompt structure handles compliance now; high temperature isn't needed. 0.5 gives natural prose variance without coherence risk.
- **Top P 0.85** — Validated across every model tested. No reason to change.
- **Max tokens 2400** — Enough for a full four-tier grounded response with all sections, but not so much that models pad with filler.
- **Frequency penalty 0.6** — Pushes models toward rare curated vocabulary (limestone bedrock, pastoralists, theme-specific phrases). Below 0.4 loses this effect; above 0.9 can cause token-doubling artifacts on DeepSeek.
- **Presence penalty 0.5** — Encourages introducing new concepts from grounding rather than circling back.

**Do NOT use these penalties for:**
- **DeepSeek V3.1** with penalties above 0.8 — risks "HistoricalHistorical)" doubling artifacts. Keep at 0.5-0.7.
- **GPT-5.4** without the disambiguation prompt — will still mislabel Scripture as (AI-Assisted) regardless of parameters.

**Special toggles:**
- **`openrouter_disable_thinking: true`** — Recommended for DeepSeek V3.1/R1, Qwen3 thinking variants, Claude 3.7+, and GPT-5. Sends `reasoning: { effort: 'none' }` to OpenRouter. Prevents reasoning tokens from bleeding into the answer channel.
- **`ollama_disable_thinking: true`** — For Qwen 3 variants with internal reasoning mode.

---

## 6. System Prompt Design Pattern

**Current location:** `src/lib/ai/grounding/system-prompt.ts`

**Structure (MUST preserve this order):**

```
[role paragraph — establishes warm pastoral identity]

<instructions_overview>
  1. <audience> — CALIBRATION
  2. <source_tiers> — CRITICAL (tier labeling rules)
  3. <accuracy_rules>
  4. <grounding_context>
  5. <output_format> — CRITICAL (format rules + few-shot example)
</instructions_overview>

<audience>
  [pitched by user preference: young-children/family/teens/adults]
</audience>

<source_tiers>
  [5 tier definitions + CRITICAL CLARIFICATION about (AI-Assisted) semantics]
</source_tiers>

<accuracy_rules>
  [Scripture quoting, Strong's, scholarly citations, cross-references]
</accuracy_rules>

<grounding_context>
  ${groundingContext}
</grounding_context>

<output_format>
  [Structure directive + tier precision rules + formatting + COMPLETE few-shot example + closing reminder]
</output_format>
```

**Why this structure works:**

1. **TOC (`<instructions_overview>`) primes the model's attention** — it sees CRITICAL flags on sections 2 and 5 before reading the content
2. **XML tags delineate sections** — Anthropic's prompt engineering research shows this improves instruction adherence, and it transfers well across all model families
3. **`<output_format>` is LAST** — recency bias puts the format directive and few-shot example closest to the model's generation step
4. **Grounding context sits BEFORE output_format** — so the format rules are the very last thing read before generation starts
5. **Few-shot example uses Luke 10 Good Samaritan** — a different passage from Gideon (the test case), preventing pattern-overfitting on the test subject

**Critical load-bearing elements — DO NOT REMOVE:**

- The **TOC with CRITICAL flags** (activates attention priority)
- The **disambiguation block** in `<source_tiers>` explaining that `(AI-Assisted)` tracks content type not author identity — without this, GPT-5.4 and similar newer models mislabel Scripture as `(AI-Assisted)`
- The **"WHY THIS MATTERS"** paragraph at the end of `<source_tiers>` — gives the model a product reason for compliance
- The **full worked example** in `<output_format>` (Luke 10 Good Samaritan paragraph)
- The **closing reminder** after the few-shot example — reinforces the label list one final time

**Do NOT add:**
- Model-specific directives targeting one provider's weakness (OpenAI-style "grounding principle" wording caused Gemma 4 regression — see Historical Context below)
- Verbose role elaboration beyond the opening paragraph
- Additional tier categories beyond the 5 defined

**Validated across (as of 2026-04-09):** Claude Opus 4.6, Claude Sonnet 4.6, Claude Haiku 4.5, Grok 4.2, Gemma 4 31B, Gemma 3 27B, GPT-4.1, GPT-5.4, DeepSeek V3.1, Qwen 122B, Gemini 2.5 Flash

---

## 7. Known Model-Specific Quirks

### Anthropic Family (Claude Haiku/Sonnet/Opus 4.5/4.6)
- **Strength:** Constitutional AI training produces grounding fidelity at every size. Even Haiku preserves Opus-like curation behavior.
- **Quirk:** Opus and Sonnet will sometimes add the model's first-person voice ("I think the stronger reading is..."). Acceptable and adds warmth.

### Grok 4.2
- **Strength:** Deepest climate_contexts field sweeps (political/religious/economic/geographic).
- **Quirk:** Dense academic paragraph style — few paragraph breaks, uses no `###` section headers even when asked. Less readable than Claude.

### Gemma Family
- **Strength:** Excellent markdown and tier format compliance. Echoes source material rather than rewriting.
- **Quirk:** Gemma 3 is a notable step below Gemma 4 — prefer Gemma 4 when available.

### DeepSeek V3.1 / R1
- **Strength:** Strong tier compliance, low cost.
- **Critical quirk:** Uses BOTH `delta.content` AND `delta.reasoning_content` fields in streaming responses. The `openrouter.ts` adapter MUST read both or answer tokens get dropped (see `src/lib/ai/providers/openrouter.ts`).
- **Additional quirk:** Frequency penalties above 0.8 cause "HistoricalHistorical)" doubling artifacts. Keep penalties ≤ 0.7.

### GPT-4.1
- **Strength:** Reliable, consistent format compliance.
- **Quirk:** "Editorial bias" — rewrites curated content in its own voice rather than quoting. Misses deep pipeline fingerprints regardless of prompt tuning. Training disposition, not prompt-fixable.

### GPT-4.1-mini
- **Warning:** Weakest tier compliance of all tested models. Not production-viable.

### GPT-5.4
- **Critical quirk:** Interprets `(AI-Assisted)` literally as "I am an AI, so everything I write gets this label." Fails to tag Scripture as `(Canon)` without the disambiguation block in `<source_tiers>`. The disambiguation is load-bearing.
- **Format quirk:** Uses paragraph-start label positioning instead of end-of-sentence. Still rule-compliant but different from few-shot.

### Gemini 2.5 Flash
- **Quirk:** Avoids the commentary data entirely — produces zero `(Scholarship)` labels. Reads `narrative_units` but not `commentary_entries`.

### Qwen Family
- **Quirk:** Qwen 3 thinking variants need `disableThinking: true` or reasoning tokens leak into the answer. Set via Ollama adapter's `disableThinking` constructor arg.

---

## 8. How to Test a New Model

When evaluating a new model for addition to the recommended tier:

### Step 1: Setup
1. Ensure dev server is running with the current `system-prompt.ts`
2. Ensure model parameters are set to the standard benchmark values (temp 0.5 / topP 0.85 / freq 0.6 / pres 0.5 / max 2400)
3. Open reader mode on Judges 6
4. Enable climate toggle in context controls
5. Make sure commentary sources are enabled

### Step 2: Run the Gideon benchmark
Paste the standard three-part question into chat:

> Why does God call Gideon a 'mighty warrior' when he's hiding in a winepress? What does the fleece incident reveal about the nature of doubt? From this experience Gideon had, how can we learn to be faithful in today's climate?

### Step 3: Grade across the 5 dimensions

Use the grading rubric:

**A+ (Top Tier):**
- All paragraphs tier-labeled, correct named format
- 12+ pipeline fingerprints surfaced
- Commentary named (Gill) with verbatim or near-verbatim quote
- Multiple properly-attributed Canon quotes
- Strong markdown formatting (headers, bold, flowing prose)

**A (Production-Viable):**
- All paragraphs labeled correctly
- 8-12 fingerprints surfaced
- Commentary at least mentioned by name
- Canon quotes properly tagged
- Decent formatting

**A−/B+ (Backup Tier):**
- Tier labels present but distribution off
- 5-8 fingerprints
- Commentary generic or missing
- Most Canon quotes tagged

**B or below (Not Recommended):**
- Missing tier labels, numeric substitutes, or prose attribution
- <5 fingerprints
- Commentary fabricated or missing entirely
- Format problems

### Step 4: Spot-check for fabrication

If the model cites a commentator, verify the quote exists in the DB:

```bash
node -e "const db = require('better-sqlite3')('./data/selah.db'); const rows = db.prepare(\"SELECT text FROM commentary_entries WHERE text LIKE '%SEARCH_PHRASE%' LIMIT 3\").all(); rows.forEach(r => { console.log('---'); console.log(r.text.slice(0, 500)); }); db.close();"
```

If no match, the model is fabricating — reject it for production.

### Step 5: Regression test on current top pick

Run the same question on **Gemma 4 31B** to verify no regression. If the new model is being added alongside Gemma 4, both should still pass. If Gemma 4 regresses after a prompt change, the change is not safe.

### Step 6: Update this document

Add the new model under the appropriate tier section with:
- Grade
- Strengths
- Weaknesses
- Best use case
- Any model-specific quirks discovered

---

## 9. Historical Context (What We Learned)

### The prompt design breakthrough (2026-04-08/09)

Before this milestone, Selah's system prompt was flat markdown with tier rules buried mid-document. Every model tested treated the tier labels as optional formatting guidance. Compliance was effectively zero for GPT-4.1 and GPT-4.1-mini, and partial at best for others.

**The fix:** Restructure the prompt using XML tags (Anthropic-recommended pattern), add a TOC at the top with CRITICAL flags on key sections, and move the `<output_format>` section (with its complete few-shot example) to the VERY END of the prompt to leverage recency bias.

**Result:** 100% tier compliance across Claude (all sizes), Gemma 4/3, GPT-4.1, DeepSeek, Qwen 122B, Grok 4.2 — all in a single structural change.

**Lesson:** The XML + TOC + recency-weighted format directive + complete few-shot example is the load-bearing pattern. Do not regress.

### The AI-Assisted disambiguation (2026-04-09)

GPT-5.4 was initially failing to label Scripture as `(Canon)` — it was interpreting `(AI-Assisted)` literally as "I am an AI, so everything I write is AI-assisted" and applying it to all content including direct quotes.

**The fix:** Add a CRITICAL CLARIFICATION block in `<source_tiers>` explaining that the label tracks content TYPE (curated analysis or synthesis) not AUTHOR identity. Explicit negative framing: *"even though you, an AI, are the one typing them."*

**Result:** GPT-5.4 correctly labels Scripture as `(Canon)` on subsequent runs. Gemma 4 31B verified no regression.

**Lesson:** Tier label names can have semantic ambiguity with model self-reference. Disambiguate explicitly when adding new models or when a model fails on basic labeling.

### The grounding principle false start (2026-04-09)

OpenAI's prompt playground suggested a "grounding principle" directive to be added at the top of the prompt. The wording was GPT-calibrated and used phrases like *"prioritize the curated data over your training knowledge."*

**Result on GPT-4.1:** Modest improvement (+1-2 fingerprints)
**Result on Gemma 4 31B:** Significant regression (-4 climate fingerprints, lost theme verbatim, lost commentary attribution)

**Lesson:** Don't optimize prompts for one model family at the cost of another. Always regression-test prompt changes on the current production pick BEFORE committing. The directive was rolled back.

### Parameter plumbing discovery (2026-04-09)

During model testing, we discovered that the `send/route.ts` API endpoint had been simplified at some point to use a hardcoded `{ model: '', maxTokens: 4096 }` config — meaning the user's parameter sliders were not reaching the models at all. Every grounded chat used adapter default parameters regardless of UI settings.

**The fix:** Restored per-provider parameter reading in `send/route.ts`. Added the missing parameter pass-through in `openai.ts` (which didn't pass temperature/top_p/penalties to the completion call).

**Result:** When parameters actually reached Gemma 4 31B for the first time, the deepest climate fingerprints (camels, caves, cisterns, theme verbatim) surfaced. They had been filtered before purely because the frequency/presence penalties weren't being applied.

**Lesson:** When the pipeline is working but outputs look shallow, check that the tuning surface (parameters) is actually reaching the model. The prompt and the parameters are separate layers and both must work.

### The DeepSeek stream corruption (2026-04-09)

DeepSeek V3.1 responses had word-level corruption (missing first tokens, mid-sentence drops). Other models didn't exhibit this.

**Root cause:** DeepSeek V3.1 on OpenRouter uses a hybrid reasoning mode that interleaves content between `delta.content` and `delta.reasoning_content` fields. The OpenAI SDK's TypeScript types don't include `reasoning_content`, so our adapter was silently dropping it.

**The fix:** Cast through `unknown` to read both fields, concatenate, and yield combined output (`src/lib/ai/providers/openrouter.ts:39-54`).

**Lesson:** When diagnosing streaming issues on a specific model, check whether the model emits non-standard delta fields that the SDK's typed interface doesn't expose.

### Anthropic family consistency (2026-04-09)

When testing Claude Haiku 4.5 (Anthropic's cheap model), we expected it to perform similarly to GPT-4.1-mini (the worst performer) — a small model with degraded capability. Instead, Haiku 4.5 performed at near-Sonnet quality, hitting verbatim commentary citations and full narrative engagement.

**Lesson:** Anthropic's Constitutional AI training methodology produces grounding fidelity as a family-wide trait, not a flagship-only feature. This does NOT hold for OpenAI (mini is significantly degraded) or Google (Flash is significantly shallower than Pro/Ultra). For Selah's grounded scholarship use case, **Claude is the natural model family** because every size preserves the curation-faithful behavior.

---

## 10. Maintenance

**This document should be updated when:**
- A new model is tested and added to the rankings
- A prompt change passes regression testing
- A new pipeline fingerprint is added to the DB
- A new parameter default proves better empirically
- A model-specific quirk is discovered that requires workaround

**This document should NOT be updated for:**
- Single-run anomalies or variance
- Prompt changes that weren't regression-tested
- Theoretical improvements that haven't been validated against the Gideon benchmark

**Related files:**
- `src/lib/ai/grounding/system-prompt.ts` — the canonical system prompt
- `src/lib/ai/providers/openrouter.ts` — OpenRouter adapter with the DeepSeek fix
- `src/lib/ai/providers/openai.ts` — custom/llama-server adapter
- `src/lib/ai/providers/ollama.ts` — Ollama local adapter
- `src/app/api/ai/send/route.ts` — the chat endpoint that reads parameters from settings
- `src/lib/ai/grounding/extractors/study-builder.ts` — the study builder grounding extractor (includes `ai-chat` filter for injection exclusion)
