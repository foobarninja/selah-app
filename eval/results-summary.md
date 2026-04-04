# Commentary Enrichment Eval — Results Summary

## Token Cost Comparison

Approximate token counts (chars / 4):

| Sample | Group A (Control) | Group B (Enrichment) | Group C (Regeneration) |
|--------|------------------|---------------------|----------------------|
| OT-1 Binding of Isaac | ~1,612 (sunk) | in: ~27K out: ~5,753 total: ~33K | in: ~27K out: ~4,518 total: ~32K |
| OT-2 Valley of Dry Bones | ~2,009 (sunk) | in: ~22K out: ~5,476 total: ~27K | in: ~22K out: ~4,690 total: ~27K |
| NT-1 Woman at the Well | ~2,073 (sunk) | in: ~34K out: ~6,780 total: ~41K | in: ~34K out: ~6,591 total: ~41K |
| NT-2 Road to Emmaus | ~1,935 (sunk) | in: ~23K out: ~6,482 total: ~29K | in: ~23K out: ~4,922 total: ~28K |
| **Average** | ~1,907 | in: ~26.5K out: ~6,123 total: ~32.5K | in: ~26.5K out: ~5,180 total: ~32K |

Note: Group B input includes control sample + commentary. Group C input includes passage text + commentary + character/climate context. Input costs are dominated by commentary injection (~20-32K tokens per passage).

## Commentary Density per Sample

| Sample | Sources Available | Total Commentary Tokens | Commentary-to-Control Ratio |
|--------|------------------|------------------------|---------------------------|
| OT-1 Binding of Isaac | 6 (all sources) | ~26,035 | 16:1 |
| OT-2 Valley of Dry Bones | 6 (all sources) | ~19,874 | 10:1 |
| NT-1 Woman at the Well | 5 (no Keil-Delitzsch, OT only) | ~31,638 | 15:1 |
| NT-2 Road to Emmaus | 5 (no Keil-Delitzsch, OT only) | ~21,024 | 11:1 |

Commentary density is high across all samples — 10-16x the size of the control output. This means the model has substantial scholarly material to draw from.

## Enrichment Change Summary (Group B)

### OT-1: Binding of Isaac
- **Claims added:** 6 major (linguistic precision on Hebrew word order, Symmachus translation, Elohim/Ha-Elohim distinction, Isaac's age traditions, Moriah etymology, Jehovah-jireh meaning)
- **Claims corrected:** 1 (distance corrected from ~50 miles to 40-45 miles per convergent commentary evidence)
- **Claims re-tiered:** 0
- **Sections unchanged:** Modern Parallel, most Key Questions, most Preaching Angles

### OT-2: Valley of Dry Bones
- **Claims added:** 17 (harugiym as "slain" not generic "dead", definite article on ha-biq'ah, ruach as breath-of-life per Ps 104, Theodoret's Genesis 2 recognition, Hebrew philology on yabesh/nigzarnu, "four winds" as scattering reversal, rabbinic traditions from Sanhedrin 92b, and more)
- **Claims corrected:** 0
- **Claims re-tiered:** 0
- **Sections unchanged:** All Modern Parallels, all original Key Questions and Preaching Angles

### NT-1: Woman at the Well
- **Claims added:** 22 (Greek sunchrontai meaning, Jesus as divine Petitioner, Clarke/Pearce five-point argument woman may not be immoral, progressive naming of Jesus, well/fountain Greek distinction phreatos/pege, "spirit and truth" single preposition, and more)
- **Claims corrected:** 0
- **Claims re-tiered:** 1 (ritual uncleanness nuanced — Gill documents Samaritan water was considered clean; barrier was social communion not halakhic purity)
- **Sections unchanged:** Modern Parallel, original Key Questions, original Preaching Angles

### NT-2: Road to Emmaus
- **Claims added:** 20+ (Cleopas identity traditions, divine passive grammar, four explanations for non-recognition, Clarke's artlessness argument, Gill's Abkath Rocel parallel, specific OT passages Jesus likely expounded, Codex Bezae variant, Mishnah Berakot customs, unnarrated Peter appearance)
- **Claims corrected:** 0
- **Claims re-tiered:** 1 (eucharistic overtones downgraded — Clarke, Henry, and Gill all deny eucharistic significance, reading it as a common meal; verbal parallels real but consensus overstated)
- **Sections unchanged:** Modern Parallel, original Key Questions, original Preaching Angles

## Key Observations

1. **The commentary data confirmed the originals far more than it contradicted them.** Zero factual corrections were needed for 3 of 4 samples. The one correction (OT-1 distance) was minor.

2. **Enrichment adds depth, not breadth.** The additions are linguistic, historical, and theological detail — Hebrew/Greek word studies, scholarly traditions, cross-references. They make the content more grounded without changing its character.

3. **Modern parallels and key questions were never improved by commentary.** These sections — the app's most distinctive contribution — are AI-generated synthesis that commentary data simply doesn't address. The commentary adds scholarship; the original adds relatability.

4. **Two interesting re-tierings emerged:**
   - NT-1: The "ritual uncleanness" framing was more social than halakhic
   - NT-2: The "eucharistic overtones" were overstated — major commentators explicitly disagree

5. **Group B (enrichment) preserves voice while adding grounding.** Group C (regeneration) produces a different document that may or may not match the original's tone.

## File Locations

```
eval/
├── control/          # Group A: original narrative units (no commentary)
│   ├── OT-1-binding-of-isaac.md
│   ├── OT-2-valley-of-dry-bones.md
│   ├── NT-1-woman-at-well.md
│   └── NT-2-road-to-emmaus.md
├── commentary/       # Raw commentary data per passage
│   ├── OT-1-commentary.md
│   ├── OT-2-commentary.md
│   ├── NT-1-commentary.md
│   └── NT-2-commentary.md
├── enriched/         # Group B: control + commentary enrichment
│   ├── OT-1-binding-of-isaac.md
│   ├── OT-2-valley-of-dry-bones.md
│   ├── NT-1-woman-at-well.md
│   └── NT-2-road-to-emmaus.md
├── regen/            # Group C: from-scratch regeneration with commentary
│   ├── OT-1-binding-of-isaac.md
│   ├── OT-2-valley-of-dry-bones.md
│   ├── NT-1-woman-at-well.md
│   └── NT-2-road-to-emmaus.md
├── side-by-side/     # All three versions concatenated for comparison
│   ├── OT-1.md
│   ├── OT-2.md
│   ├── NT-1.md
│   └── NT-2.md
└── results-summary.md  (this file)
```

The scoring will be done externally using the rubric in selah-commentary-eval.md.
