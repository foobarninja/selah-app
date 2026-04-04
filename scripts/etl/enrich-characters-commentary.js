#!/usr/bin/env node
/**
 * Enrich character profiles with scholarly commentary data.
 * Processes life-of-christ and early-church era characters.
 *
 * v3: Aggressive text cleaning. Only uses complete, grammatically clean sentences.
 * Strips all raw commentary artifacts. Produces natural-reading prose.
 */

const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

const BOOK_MAP = {
  'genesis': 'GEN', 'exodus': 'EXO', 'leviticus': 'LEV', 'numbers': 'NUM',
  'deuteronomy': 'DEU', 'joshua': 'JOS', 'judges': 'JDG', 'ruth': 'RUT',
  '1 samuel': '1SA', '2 samuel': '2SA', '1 kings': '1KI', '2 kings': '2KI',
  '1 chronicles': '1CH', '2 chronicles': '2CH', 'ezra': 'EZR', 'nehemiah': 'NEH',
  'esther': 'EST', 'job': 'JOB', 'psalms': 'PSA', 'psalm': 'PSA',
  'proverbs': 'PRO', 'ecclesiastes': 'ECC', 'song of solomon': 'SNG',
  'isaiah': 'ISA', 'jeremiah': 'JER', 'lamentations': 'LAM', 'ezekiel': 'EZK',
  'daniel': 'DAN', 'hosea': 'HOS', 'joel': 'JOL', 'amos': 'AMO',
  'obadiah': 'OBA', 'jonah': 'JON', 'micah': 'MIC', 'nahum': 'NAM',
  'habakkuk': 'HAB', 'zephaniah': 'ZEP', 'haggai': 'HAG', 'zechariah': 'ZEC',
  'malachi': 'MAL',
  'matthew': 'MAT', 'mark': 'MRK', 'luke': 'LUK', 'john': 'JHN',
  'acts': 'ACT', 'romans': 'ROM', '1 corinthians': '1CO', '2 corinthians': '2CO',
  'galatians': 'GAL', 'ephesians': 'EPH', 'philippians': 'PHP', 'colossians': 'COL',
  '1 thessalonians': '1TH', '2 thessalonians': '2TH', '1 timothy': '1TI', '2 timothy': '2TI',
  'titus': 'TIT', 'philemon': 'PHM', 'hebrews': 'HEB', 'james': 'JAS',
  '1 peter': '1PE', '2 peter': '2PE', '1 john': '1JN', '2 john': '2JN',
  '3 john': '3JN', 'jude': 'JUD', 'revelation': 'REV'
};

function parseReferences(refStr) {
  const results = [];
  const parts = refStr.split(/,\s*(?=[1-3]?\s*[A-Z])/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('Josephus') || trimmed.includes('Antiquities') || trimmed.includes('Tacitus')) continue;
    const match = trimmed.match(/^(\d?\s*[A-Za-z]+(?:\s+[A-Za-z]+)*)\s+(\d+):(\d+)(?:[–\-](?:(\d+):)?(\d+))?/);
    if (match) {
      const bookName = match[1].toLowerCase().trim();
      const chapter = parseInt(match[2]);
      const verseStart = parseInt(match[3]);
      const verseEnd = match[5] ? parseInt(match[5]) : verseStart;
      const bookId = BOOK_MAP[bookName];
      if (bookId) {
        results.push({ bookId, chapter, verseStart, verseEnd, ref: trimmed });
      }
    }
  }
  return results;
}

/**
 * Extract clean, complete sentences from raw commentary text.
 * Aggressively filters out:
 * - Truncated sentences (from the 800-char limit)
 * - Hebrew/Greek transliterations
 * - Verse reference clutter
 * - Headers and formatting artifacts
 * - Incomplete thoughts
 */
function extractCleanSentences(rawText) {
  let text = rawText;

  // Remove header lines (ALL CAPS sections)
  text = text.replace(/^[A-Z\s,()=.;–\-]{10,}$/gm, '');

  // Remove verse-start patterns: "And Jesus said unto him--" or "But John forbade him--"
  text = text.replace(/^[A-Za-z, ]{5,40}--(?=\w)/gm, '');

  // Remove inline commentary glosses: "word -- definition" pattern
  text = text.replace(/\b[a-z]+ - [A-Z][^.]{5,60}(?=\.)/g, '');

  // Remove inline scripture refs like (Mat 3:13; Luk 3:21-22; Joh 1:31-34)
  text = text.replace(/\([A-Z][a-z]{0,2}\d?\s+\d+:\d+[^)]*\)/g, '');
  // Remove parenthetical single-letter refs like (x) (a) (b)
  text = text.replace(/\s*\([a-z]\)\s*/g, ' ');
  // Remove "see on Joh 4:29 (note)" and similar
  text = text.replace(/;?\s*see (?:on )?[A-Z][a-z]{0,2}\d?\s+\d+:\d+(?:\s*\(note\))?/gi, '');
  // Remove "See JOSEPHUS, Wars..." style references
  text = text.replace(/\(See [A-Z]+[^)]*\)/g, '');
  // Remove standalone verse references like "Mar 1:10" mid-sentence
  text = text.replace(/\b[A-Z][a-z]{0,2}\d?\s+\d+:\d+(?:[,-]\s*\d+)*(?:-\d+)?\b/g, '');
  // Remove "Note, see on" patterns
  text = text.replace(/Note,\s*/g, '');
  // Remove "(compare ...)" and "(contrast ...)"
  text = text.replace(/\((compare|contrast|cf\.?)[^)]*\)/gi, '');

  // Remove Hebrew text (Unicode Hebrew block)
  text = text.replace(/[\u0590-\u05FF]+/g, '');
  // Remove Greek text (Unicode Greek blocks)
  text = text.replace(/[\u0370-\u03FF\u1F00-\u1FFF]+/g, '');
  // Remove empty parenthetical residue from cleaned Greek/Hebrew
  text = text.replace(/\(\s*\)/g, '');
  text = text.replace(/\[\s*\]/g, '');
  // Remove transliteration markers and common transliterated words after them
  text = text.replace(/\bfrom\s+[a-z]{2,10},?\s*/gi, (match) => {
    if (/from\s+[a-z]{2,8}\b/i.test(match) && match.length < 20) return '';
    return match;
  });

  // Remove numbered list markers
  text = text.replace(/\n?\d+\.\s+/g, ' ');

  // Remove "rather," / "literally," commentary glosses that are fragments
  text = text.replace(/rather,\s*"[^"]*"/g, '');
  text = text.replace(/literally,\s*"[^"]*"/g, '');

  // Remove [AUTHOR NAME] citations like [WEBSTER and WILKINSON]
  text = text.replace(/\[[A-Z][A-Z\s]+\]/g, '');

  // Remove "see Book Introduction" references
  text = text.replace(/\(see [^)]*Introduction[^)]*\)/gi, '');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  // Split into sentences - being careful with abbreviations
  const rawSentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);

  const cleanSentences = [];
  for (const sentence of rawSentences) {
    let s = sentence.trim();
    if (!s) continue;

    // Skip if too short to be meaningful
    if (s.length < 35) continue;

    // Skip if it's mostly a verse quote (lots of archaic language)
    if (/\b(cometh|saith|hath|doeth|goeth|doth|shalt|wilt|hast|speaketh)\b/i.test(s) &&
        s.split(/\b(cometh|saith|hath|doeth|goeth|doth|shalt|wilt|hast)\b/i).length > 2) continue;

    // Skip if it starts with a dash or is a fragment
    if (s.startsWith('--') || s.startsWith('-')) continue;

    // Skip if it doesn't end with proper punctuation (truncated)
    if (!s.endsWith('.') && !s.endsWith('!') && !s.endsWith('?') && !s.endsWith('"')) continue;

    // Skip sentences that are mostly parenthetical refs or noise
    if ((s.match(/[()]/g) || []).length > 4) continue;

    // Skip if it has too many dangling fragments (sign of bad extraction)
    if ((s.match(/\s{2,}/g) || []).length > 2) continue;

    // Skip sentences with unmatched quotes
    const doubleQuotes = (s.match(/"/g) || []).length;
    if (doubleQuotes % 2 !== 0) {
      // Try to fix by removing trailing incomplete quote
      const lastQuote = s.lastIndexOf('"');
      if (lastQuote > s.length * 0.7) {
        s = s.substring(0, lastQuote).trim();
        if (!s.endsWith('.')) s += '.';
      } else {
        continue;
      }
    }

    // Final cleanup
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/\(\s*\)/g, ''); // Empty parens
    s = s.replace(/\[\s*\]/g, ''); // Empty brackets
    s = s.replace(/\s{2,}/g, ' ');
    s = s.replace(/\s,/g, ','); // Fix space-before-comma
    s = s.replace(/,,+/g, ','); // Fix double commas
    s = s.replace(/, ,/g, ','); // Fix comma-space-comma
    s = s.replace(/\s\./g, '.'); // Fix space-before-period

    // Must still be long enough after cleanup
    if (s.length < 40) continue;

    // Check for grammatical completeness - must have a verb-like word
    if (!/\b(is|was|were|are|had|has|have|did|does|do|be|been|being|made|came|went|said|told|gave|took|knew|saw|found|became|shows|reveals|indicates|suggests|means|implies|demonstrates|notes|observes|teaches|illustrates|represents|signifies|seems|appears|refers|speaks|points|called|considered|received|described|recognized|understood|served|followed|believed|trusted)\b/i.test(s)) continue;

    // Skip sentences with too many dashes (commentary formatting artifacts)
    if ((s.match(/--/g) || []).length > 1) continue;

    // Skip sentences that are mostly just "word - definition" gloss patterns
    if (/^[A-Za-z\s]{2,20}\s*-\s/.test(s)) continue;

    // Skip sentences that start with verse text glosses like "cast a trench about thee"
    if (/^[a-z]/.test(s) && s.length < 100) continue;

    // Skip sentences with leftover transliteration fragments
    if (/\b[a-z]{2,8},\s*[a-z]{2,8}\b/.test(s) && s.length < 80) continue;

    // Skip sentences referencing manuscript variants (ABD, Syriac, Coptic etc.)
    if (/\bABD\b/.test(s) || /\bSyriac of\b/.test(s) || /\bCoptic\b/.test(s)) continue;

    // Skip sentences with verse number markers like "15:34 Eloi..."
    if (/^\d+:\d+\s/.test(s)) continue;

    cleanSentences.push(s);
  }

  return cleanSentences;
}

/**
 * Score a sentence for scholarly insight value.
 * Higher score = more useful for enrichment.
 */
function scoreInsightValue(sentence) {
  const s = sentence.toLowerCase();
  let score = 0;

  // Strong analytical signals
  if (/\b(signif|significance|significant)\b/.test(s)) score += 4;
  if (/\b(reveals?|revealing)\b/.test(s)) score += 3;
  if (/\b(remarkable|striking|noteworthy|extraordinary)\b/.test(s)) score += 3;
  if (/\b(contrast|irony|paradox)\b/.test(s)) score += 3;
  if (/\b(custom|tradition|practice|cultural)\b/.test(s)) score += 3;
  if (/\b(historical|context|background)\b/.test(s)) score += 2;
  if (/\b(original|literally|greek|hebrew|aramaic)\b/.test(s)) score += 2;
  if (/\b(indicates?|suggests?|implies?|demonstrates?)\b/.test(s)) score += 2;
  if (/\b(transform|conversion|redempt)\b/.test(s)) score += 3;
  if (/\b(faith|grace|mercy|forgiv)\b/.test(s)) score += 2;
  if (/\b(symboliz|represent|typif|foreshadow)\b/.test(s)) score += 3;
  if (/\b(teaches?|illustrates?|shows?)\b/.test(s)) score += 1;

  // Penalize
  if (/\b(see note|see on|compare|cf\.)\b/.test(s)) score -= 2;
  if (sentence.length < 50) score -= 2;
  if (sentence.length > 300) score -= 1;

  // Prefer medium-length, substantive sentences
  if (sentence.length >= 60 && sentence.length <= 200) score += 1;

  return score;
}

// Prepared statements
const getCommentary = db.prepare(`
  SELECT cs.name, cs.id as source_id, ce.verse, substr(ce.text, 1, 800) as text
  FROM commentary_entries ce
  JOIN commentary_sources cs ON ce.source_id = cs.id
  WHERE ce.book_id = ? AND ce.chapter = ? AND ce.verse BETWEEN ? AND ?
  ORDER BY cs.name, ce.verse
`);
const getCharacter = db.prepare('SELECT * FROM characters WHERE id = ?');
const updateCharacter = db.prepare('UPDATE characters SET bio_full = ?, faith_journey = ?, source_notes = ? WHERE id = ?');

const CHARACTER_IDS = [
  'jesus', 'mary-mother-of-jesus', 'john-the-baptist', 'simon-peter', 'judas-iscariot',
  'andrew', 'james-son-of-zebedee', 'john-son-of-zebedee', 'matthew-levi', 'thomas',
  'mary-magdalene', 'martha-of-bethany', 'lazarus', 'nicodemus', 'pontius-pilate',
  'woman-at-the-well', 'zacchaeus', 'elizabeth', 'zechariah-father-of-john',
  'hemorrhaging-woman', 'centurion-with-servant', 'man-born-blind', 'syrophoenician-woman',
  'woman-caught-in-adultery', 'repentant-thief', 'simeon-in-temple',
  'paul', 'barnabas', 'stephen', 'timothy', 'luke', 'priscilla',
  'james-brother-of-jesus', 'lydia', 'cornelius', 'ananias-husband-of-sapphira',
  'sapphira', 'gamaliel', 'ethiopian-eunuch', 'herod-agrippa-i', 'phoebe'
];

/**
 * Gather commentary insights for a character.
 * Returns: { momentInsights: { momentName: { bestSentence, source, emotionalState } }, sources: Set }
 */
function gatherInsights(character) {
  let arc;
  try {
    arc = JSON.parse(character.emotional_arc || '[]');
  } catch (e) {
    return { momentInsights: {}, sources: new Set() };
  }

  const momentInsights = {};
  const allSources = new Set();

  for (const moment of arc) {
    const refs = parseReferences(moment.reference);
    const candidates = [];

    for (const ref of refs) {
      const rows = getCommentary.all(ref.bookId, ref.chapter, ref.verseStart, ref.verseEnd);
      if (rows.length === 0) continue;

      // Deduplicate
      const seen = new Set();
      const unique = rows.filter(r => {
        const key = r.source_id + ':' + r.verse;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      // Group by source
      const bySource = {};
      for (const row of unique) {
        if (!bySource[row.name]) bySource[row.name] = [];
        bySource[row.name].push(row);
      }

      for (const [sourceName, sourceRows] of Object.entries(bySource)) {
        const combinedText = sourceRows.map(r => r.text).join(' ');
        const cleanSentences = extractCleanSentences(combinedText);

        // Score and pick the top 2 sentences from this source
        if (cleanSentences.length > 0) {
          const scored = cleanSentences.map(s => ({ text: s, score: scoreInsightValue(s) }));
          scored.sort((a, b) => b.score - a.score);
          const shortSource = sourceName
            .replace(' Bible Commentary', '')
            .replace(' Open Study Notes', '');
          // Keep top 2 for bio/faith split
          for (const best of scored.slice(0, 2)) {
            if (best.score >= 0) {
              candidates.push({
                source: shortSource,
                fullSource: sourceName,
                text: best.text,
                score: best.score
              });
              allSources.add(sourceName);
            }
          }
        }
      }
    }

    if (candidates.length > 0) {
      // Keep all candidates sorted by score for bio/faith splitting
      candidates.sort((a, b) => b.score - a.score);
      // Deduplicate same text from same source
      const seenTexts = new Set();
      const deduped = candidates.filter(c => {
        const key = c.text.substring(0, 50);
        if (seenTexts.has(key)) return false;
        seenTexts.add(key);
        return true;
      });
      momentInsights[moment.moment] = {
        items: deduped,
        emotional_state: moment.emotional_state
      };
    }
  }

  return { momentInsights, sources: allSources };
}

/**
 * Enrich bio_full with 2-3 best scholarly observations across all moments.
 * Returns { enrichedBio, usedTextKeys } so faith enrichment can avoid duplicates.
 */
function enrichBio(bio, momentInsights) {
  const usedTextKeys = new Set();
  const moments = Object.entries(momentInsights);
  if (moments.length === 0) return { enrichedBio: bio, usedTextKeys };

  // Rank moments by their best insight score, using diverse sources
  const ranked = [];
  const usedSourcesGlobal = new Set();
  const allMomentItems = moments
    .flatMap(([moment, data]) => data.items.map(item => ({ moment, ...item })))
    .filter(r => r.text.length >= 40)
    .sort((a, b) => b.score - a.score);

  const usedTextsGlobal = new Set();
  for (const item of allMomentItems) {
    if (ranked.length >= 3) break;
    // Skip duplicate text (same commentary appearing for different verse ranges)
    const textKey = item.text.substring(0, 60);
    if (usedTextsGlobal.has(textKey)) continue;
    // Prefer diverse sources AND moments
    const momentAlreadyUsed = ranked.some(r => r.moment === item.moment);
    if (momentAlreadyUsed && ranked.length >= 2) continue;
    if (usedSourcesGlobal.has(item.source) && ranked.length >= 2) continue;
    usedSourcesGlobal.add(item.source);
    usedTextsGlobal.add(textKey);
    ranked.push(item);
    usedTextKeys.add(textKey);
  }

  if (ranked.length === 0) return { enrichedBio: bio, usedTextKeys };

  // Build the scholarly paragraph
  const parts = [];
  for (let i = 0; i < ranked.length; i++) {
    const item = ranked[i];
    let text = item.text;
    if (text.length > 220) {
      const cut = text.lastIndexOf('.', 220);
      if (cut > 80) text = text.substring(0, cut + 1);
    }

    const momentLower = item.moment.toLowerCase().replace(/^the /, '');
    if (i === 0) {
      parts.push(`Classical commentators add revealing detail. On ${momentLower}, ${item.source} notes that ${text.charAt(0).toLowerCase() + text.slice(1)}`);
    } else {
      parts.push(`${item.source} observes regarding ${momentLower} that ${text.charAt(0).toLowerCase() + text.slice(1)}`);
    }
  }

  let paragraph = parts.join(' ');
  if (!paragraph.endsWith('.') && !paragraph.endsWith('!') && !paragraph.endsWith('?')) {
    const lastDot = paragraph.lastIndexOf('.');
    if (lastDot > paragraph.length * 0.6) paragraph = paragraph.substring(0, lastDot + 1);
    else paragraph += '.';
  }

  return { enrichedBio: bio + '\n\n' + paragraph, usedTextKeys };
}

/**
 * Enrich faith_journey with 1-2 theologically relevant commentary insights.
 * Avoids insights already used in bio enrichment.
 */
function enrichFaith(faith, momentInsights, usedTextKeys) {
  if (!faith) return faith;
  const moments = Object.entries(momentInsights);
  if (moments.length === 0) return faith;

  // Collect all insight sentences, excluding those used in bio
  const candidates = [];
  const seenTextsInFaith = new Set();
  for (const [moment, data] of moments) {
    for (const item of data.items) {
      const textKey = item.text.substring(0, 60);
      // Skip if already used in bio
      if (usedTextKeys.has(textKey)) continue;
      // Skip duplicate text across moments
      if (seenTextsInFaith.has(textKey)) continue;
      seenTextsInFaith.add(textKey);

      const lower = item.text.toLowerCase();
      let faithScore = item.score;
      if (/\b(faith|faithful)\b/.test(lower)) faithScore += 4;
      if (/\b(believ|belief)\b/.test(lower)) faithScore += 4;
      if (/\b(trust|trusting)\b/.test(lower)) faithScore += 3;
      if (/\b(heart|soul)\b/.test(lower)) faithScore += 2;
      if (/\b(spirit|spiritual)\b/.test(lower)) faithScore += 2;
      if (/\b(grace|mercy)\b/.test(lower)) faithScore += 3;
      if (/\b(repent|transform|conversion)\b/.test(lower)) faithScore += 4;
      if (/\b(obedien|surrender|humil)\b/.test(lower)) faithScore += 3;
      if (/\b(righteous|holy|sanctif)\b/.test(lower)) faithScore += 2;
      if (/\b(called|calling|purpose)\b/.test(lower)) faithScore += 2;
      candidates.push({ ...item, moment, faithScore });
    }
  }

  // Need at least one faith-relevant insight
  candidates.sort((a, b) => b.faithScore - a.faithScore);
  // Pick up to 2, preferring different sources
  const picks = [];
  const pickedSources = new Set();
  for (const c of candidates) {
    if (picks.length >= 2) break;
    if (c.faithScore <= 0) continue;
    if (pickedSources.has(c.source) && picks.length >= 1) continue;
    pickedSources.add(c.source);
    picks.push(c);
  }
  if (picks.length === 0) return faith;

  const additions = picks.map(p => {
    let text = p.text;
    if (text.length > 200) {
      const cut = text.lastIndexOf('.', 200);
      if (cut > 80) text = text.substring(0, cut + 1);
    }
    return `${p.source} notes that ${text.charAt(0).toLowerCase() + text.slice(1)}`;
  });

  let paragraph = 'The commentary tradition enriches this picture. ' + additions.join(' ');
  if (!paragraph.endsWith('.') && !paragraph.endsWith('!')) {
    const lastDot = paragraph.lastIndexOf('.');
    if (lastDot > paragraph.length * 0.6) paragraph = paragraph.substring(0, lastDot + 1);
    else paragraph += '.';
  }

  return faith + '\n\n' + paragraph;
}

function buildSourceNotes(existingNotes, sources) {
  if (sources.size === 0) return existingNotes;
  const sourceList = Array.from(sources).sort().join('; ');
  const existing = existingNotes || '';
  if (existing.includes('Commentary enrichment')) return existing;
  return existing + (existing ? ' ' : '') + 'Commentary enrichment from: ' + sourceList + '.';
}

// ─── Main ───────────────────────────────────────────────────────────────

// Strip any previous enrichment first
console.log('Stripping previous enrichment...');
const stripPrevious = db.transaction(() => {
  for (const id of CHARACTER_IDS) {
    const char = getCharacter.get(id);
    if (!char) continue;

    let bio = char.bio_full || '';
    let faith = char.faith_journey || '';
    let notes = char.source_notes || '';
    let changed = false;

    // Strip old enrichment from bio
    for (const marker of ['\n\nClassical commentators ', '\n\nRegarding ']) {
      const idx = bio.indexOf(marker);
      if (idx !== -1) { bio = bio.substring(0, idx); changed = true; }
    }
    // Strip old enrichment from faith
    for (const marker of ['\n\nClassical commentators ', '\n\nThe commentary tradition ']) {
      const idx = faith.indexOf(marker);
      if (idx !== -1) { faith = faith.substring(0, idx); changed = true; }
    }
    // Strip old enrichment from source_notes
    const niMatch = notes.match(/\s*Commentary enrichment from:.*/);
    if (niMatch) {
      notes = notes.replace(/\s*Commentary enrichment from:.*/, '').trim();
      changed = true;
    }

    if (changed) updateCharacter.run(bio, faith, notes, id);
  }
});
stripPrevious();

// Process all characters
console.log(`Processing ${CHARACTER_IDS.length} characters...\n`);

let enriched = 0;
let skipped = 0;
const updates = [];

for (const id of CHARACTER_IDS) {
  const char = getCharacter.get(id);
  if (!char) { console.log(`SKIP ${id}: not found`); skipped++; continue; }

  const { momentInsights, sources } = gatherInsights(char);

  if (Object.keys(momentInsights).length === 0) {
    console.log(`SKIP ${id}: no commentary found`);
    skipped++;
    continue;
  }

  const { enrichedBio, usedTextKeys } = enrichBio(char.bio_full, momentInsights);
  const newFaith = enrichFaith(char.faith_journey, momentInsights, usedTextKeys);
  const newNotes = buildSourceNotes(char.source_notes, sources);

  if (enrichedBio !== char.bio_full || newFaith !== char.faith_journey || newNotes !== char.source_notes) {
    updates.push({ id, bio_full: enrichedBio, faith_journey: newFaith, source_notes: newNotes });
    const mc = Object.keys(momentInsights).length;
    const ic = Object.values(momentInsights).reduce((s, d) => s + d.items.length, 0);
    console.log(`ENRICH ${id}: ${mc} moments, ${ic} insights, ${sources.size} sources`);
    enriched++;
  } else {
    console.log(`SKIP ${id}: no usable changes`);
    skipped++;
  }
}

if (updates.length > 0) {
  db.transaction((items) => {
    for (const u of items) {
      updateCharacter.run(u.bio_full, u.faith_journey, u.source_notes, u.id);
    }
  })(updates);
  console.log(`\nCommitted ${updates.length} updates.`);
}

console.log(`\nDone. Enriched: ${enriched}, Skipped: ${skipped}`);
db.close();
