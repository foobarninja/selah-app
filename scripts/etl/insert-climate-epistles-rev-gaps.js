/**
 * Insert passage_climate rows for missing Epistles + Revelation chapters.
 *
 * All epistles and Revelation share context_id = 'climate-early-church'.
 * Each chapter gets 1 row spanning verse 1 to the last verse of that chapter.
 *
 * Before inserting, we CHECK which chapters already have data and skip them.
 *
 * Candidate chapters (53):
 *   ROM 2,10,11,15,16 | 1CO 2,3,4,6,9,10,14,16 | 2CO 2,6,7,8,9,10,11,13
 *   GAL 2,4 | EPH 3,5 | COL 1 | 1TH 2,3,5 | 2TH 1 | 1TI 4,5 | 2TI 1
 *   TIT 3 | HEB 2,3,5,6,10,13 | JAS 4 | 1PE 3,4 | 2PE 3 | 1JN 3,4
 *   REV 7,9,10,15,16,17,18
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------------------------------------------------------------------------
// 1. Context notes per book
// ---------------------------------------------------------------------------

const contextNotes = {
  ROM: 'The church in Rome \u2014 a mixed Jewish-Gentile community in the imperial capital',
  '1CO': 'The church in Corinth \u2014 a wealthy, cosmopolitan port city known for religious pluralism and moral permissiveness',
  '2CO': 'The church in Corinth \u2014 a wealthy, cosmopolitan port city known for religious pluralism and moral permissiveness',
  GAL: 'The churches in Galatia \u2014 Gentile converts being pressured by Judaizers to adopt circumcision and Torah observance',
  EPH: 'The church in Ephesus \u2014 a major commercial center with the massive temple of Artemis dominating the skyline',
  PHP: 'The church in Philippi \u2014 a Roman colony proud of its citizenship, where Paul was once jailed and the church began with Lydia and the jailer',
  COL: 'The church in Colossae \u2014 a small Phrygian town where syncretistic philosophy threatened the sufficiency of Christ',
  '1TH': 'The church in Thessalonica \u2014 a Roman administrative center on the Via Egnatia where persecution was immediate and the return of Christ felt imminent',
  '2TH': 'The church in Thessalonica \u2014 a Roman administrative center on the Via Egnatia where persecution was immediate and the return of Christ felt imminent',
  '1TI': 'Timothy pastoring in Ephesus \u2014 managing false teachers and organizing church leadership in a hostile pagan environment',
  '2TI': 'Timothy pastoring in Ephesus \u2014 managing false teachers and organizing church leadership in a hostile pagan environment',
  TIT: 'Titus organizing churches on Crete \u2014 an island with a reputation for dishonesty and moral laxity',
  PHM: 'A personal letter to Philemon in Colossae \u2014 a slaveholder confronted with the gospel implications for his relationship with Onesimus',
  HEB: 'A Jewish-Christian community tempted to return to Judaism under pressure, possibly in Rome',
  JAS: 'Scattered Jewish Christians facing economic inequality and trials of faith',
  '1PE': 'Churches in Asia Minor facing increasing Roman hostility and social ostracism',
  '2PE': 'Churches in Asia Minor facing increasing Roman hostility and social ostracism',
  '1JN': 'The Johannine community dealing with internal division over Christology',
  '2JN': 'The Johannine community dealing with internal division over Christology',
  '3JN': 'The Johannine community dealing with internal division over Christology',
  JUD: 'A community infiltrated by antinomian teachers distorting grace into license',
  REV: "The seven churches of Asia Minor under Domitian's reign \u2014 emperor worship required, refusal meant economic exclusion or death",
};

// ---------------------------------------------------------------------------
// 2. Candidate chapters to check
// ---------------------------------------------------------------------------

const candidates = [
  // ROM
  ['ROM', 2], ['ROM', 10], ['ROM', 11], ['ROM', 15], ['ROM', 16],
  // 1CO
  ['1CO', 2], ['1CO', 3], ['1CO', 4], ['1CO', 6], ['1CO', 9],
  ['1CO', 10], ['1CO', 14], ['1CO', 16],
  // 2CO
  ['2CO', 2], ['2CO', 6], ['2CO', 7], ['2CO', 8], ['2CO', 9],
  ['2CO', 10], ['2CO', 11], ['2CO', 13],
  // GAL
  ['GAL', 2], ['GAL', 4],
  // EPH
  ['EPH', 3], ['EPH', 5],
  // COL (check)
  ['COL', 1],
  // 1TH
  ['1TH', 2], ['1TH', 3], ['1TH', 5],
  // 2TH
  ['2TH', 1],
  // 1TI
  ['1TI', 4], ['1TI', 5],
  // 2TI (check)
  ['2TI', 1],
  // TIT
  ['TIT', 3],
  // HEB
  ['HEB', 2], ['HEB', 3], ['HEB', 5], ['HEB', 6], ['HEB', 10], ['HEB', 13],
  // JAS
  ['JAS', 4],
  // 1PE
  ['1PE', 3], ['1PE', 4],
  // 2PE
  ['2PE', 3],
  // 1JN
  ['1JN', 3], ['1JN', 4],
  // REV
  ['REV', 7], ['REV', 9], ['REV', 10], ['REV', 15], ['REV', 16],
  ['REV', 17], ['REV', 18],
];

// ---------------------------------------------------------------------------
// 3. Check which chapters already have passage_climate data
// ---------------------------------------------------------------------------

const allBookIds = [...new Set(candidates.map(c => c[0]))];
const placeholders = allBookIds.map(() => '?').join(',');

const existing = db.prepare(
  `SELECT DISTINCT book_id, chapter FROM passage_climate WHERE book_id IN (${placeholders})`
).all(...allBookIds);

const existingSet = new Set(existing.map(r => `${r.book_id}:${r.chapter}`));

const toInsert = candidates.filter(([bookId, chapter]) => {
  const key = `${bookId}:${chapter}`;
  if (existingSet.has(key)) {
    console.log(`  SKIP ${key} — already has passage_climate data`);
    return false;
  }
  return true;
});

console.log(`\n${candidates.length} candidate chapters, ${existing.length} already have data, ${toInsert.length} to insert.\n`);

if (toInsert.length === 0) {
  console.log('Nothing to insert. Done.');
  db.close();
  process.exit(0);
}

// ---------------------------------------------------------------------------
// 4. Verse-end lookup helper
// ---------------------------------------------------------------------------

const maxVerseStmt = db.prepare(
  'SELECT MAX(verse) AS max_v FROM verses WHERE book_id = ? AND chapter = ?'
);

function lastVerse(book, chapter) {
  const row = maxVerseStmt.get(book, chapter);
  return row ? row.max_v : null;
}

// ---------------------------------------------------------------------------
// 5. Insert passage_climate rows
// ---------------------------------------------------------------------------

const CONTEXT_ID = 'climate-early-church';

const insertStmt = db.prepare(`
  INSERT INTO passage_climate (context_id, book_id, chapter, verse_start, verse_end, context_note, source_tier)
  VALUES (?, ?, ?, 1, ?, ?, 'ai_assisted')
`);

const insertAll = db.transaction(() => {
  let count = 0;
  for (const [bookId, chapter] of toInsert) {
    const verseEnd = lastVerse(bookId, chapter);
    if (!verseEnd) {
      console.error(`  WARNING: No verses found for ${bookId} ${chapter}, skipping.`);
      continue;
    }

    const note = contextNotes[bookId];
    if (!note) {
      console.error(`  WARNING: No context_note defined for ${bookId}, skipping.`);
      continue;
    }

    insertStmt.run(CONTEXT_ID, bookId, chapter, verseEnd, note);
    console.log(`  + ${bookId} ${chapter}  (1-${verseEnd})`);
    count++;
  }
  return count;
});

const inserted = insertAll();
console.log(`\nInserted ${inserted} passage_climate rows.`);

// ---------------------------------------------------------------------------
// 6. Verify
// ---------------------------------------------------------------------------

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) AS cnt
  FROM passage_climate
  WHERE book_id IN (${placeholders})
  GROUP BY book_id
  ORDER BY book_id
`).all(...allBookIds);

console.log('\nTotal passage_climate by book (Epistles + Revelation):');
byBook.forEach(r => console.log(`  ${r.book_id}: ${r.cnt}`));

const total = db.prepare('SELECT COUNT(*) AS cnt FROM passage_climate').get();
console.log(`\nGrand total passage_climate: ${total.cnt}`);

db.close();
console.log('Done.');
