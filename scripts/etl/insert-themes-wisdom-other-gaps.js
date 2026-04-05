/**
 * Insert passage_themes for 34 missing Proverbs + Ecclesiastes + Song of Solomon chapters.
 *
 * Missing chapters:
 *   PRO: 2,3,4,5,7,8,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,28,29,30  (24 ch)
 *   ECC: 2,6,7,8,10,11                                                        (6 ch)
 *   SNG: 2,5,6,7                                                              (4 ch)
 *
 * 2 themes per chapter, 68 rows total.
 * source_tier: 'ai_assisted'
 */
const Database = require('better-sqlite3');
const db = new Database('data/selah.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ──────────────────────────────────────────────────────────────
// 1. Ensure all referenced theme IDs exist in the themes table.
//    Several IDs needed here were never seeded.
// ──────────────────────────────────────────────────────────────
const newThemes = [
  { id: 'discipline',    name: 'Discipline',    category: 'action',  definition: 'Corrective training that shapes character and behaviour toward maturity.',                        modernFraming: 'The painful feedback that makes you better.' },
  { id: 'righteousness', name: 'Righteousness', category: 'virtue',  definition: 'Right conduct and moral uprightness aligned with God\'s standards.',                              modernFraming: 'Doing the right thing even when nobody is watching.' },
  { id: 'pride',         name: 'Pride',         category: 'emotion', definition: 'An inflated sense of self that resists correction and elevates oneself above others and God.',     modernFraming: 'The blind spot you defend the hardest.' },
  { id: 'speech',        name: 'Speech',        category: 'action',  definition: 'The use of words to build up or tear down, recognized as a moral act with lasting consequences.', modernFraming: 'Every word you say is a brick — building or demolishing.' },
  { id: 'diligence',     name: 'Diligence',     category: 'virtue',  definition: 'Persistent, careful effort in work and responsibility.',                                          modernFraming: 'Showing up and doing the work when motivation fades.' },
  { id: 'laziness',      name: 'Laziness',      category: 'condition', definition: 'Habitual avoidance of effort that leads to ruin.',                                              modernFraming: 'Choosing comfort now and paying for it later.' },
  { id: 'instruction',   name: 'Instruction',   category: 'action',  definition: 'Teaching and correction intended to impart wisdom and godly living.',                              modernFraming: 'The lesson you resent receiving and treasure later.' },
  { id: 'self-control',  name: 'Self-Control',  category: 'virtue',  definition: 'The ability to restrain impulses and govern oneself according to wisdom.',                         modernFraming: 'Saying no to yourself before someone else has to.' },
  { id: 'vanity',        name: 'Vanity',        category: 'condition', definition: 'The fleeting, vaporous quality of human endeavour apart from God.',                              modernFraming: 'The nagging suspicion that none of it will last.' },
  { id: 'mortality',     name: 'Mortality',      category: 'condition', definition: 'The inescapable reality of human death that frames all of life.',                               modernFraming: 'The clock everyone hears but nobody wants to read.' },
  { id: 'work',          name: 'Work',           category: 'action',  definition: 'Human labour viewed as both gift and burden under God\'s providence.',                             modernFraming: 'The Monday-morning question: what is all this for?' },
  { id: 'desire',        name: 'Desire',         category: 'emotion', definition: 'Deep longing, especially romantic or erotic yearning, affirmed as part of creation.',             modernFraming: 'The ache that pulls you toward someone and will not let go.' },
  { id: 'beauty',        name: 'Beauty',         category: 'condition', definition: 'Physical and spiritual loveliness celebrated as a reflection of the Creator.',                  modernFraming: 'The moment something takes your breath away.' },
];

const insertTheme = db.prepare(`
  INSERT OR IGNORE INTO themes (id, name, category, parent_theme_id, definition, modern_framing, related_themes, source_tier)
  VALUES (@id, @name, @category, NULL, @definition, @modernFraming, '[]', 'ai_assisted')
`);

const insertThemesBatch = db.transaction(() => {
  let created = 0;
  for (const t of newThemes) {
    const info = insertTheme.run(t);
    if (info.changes > 0) created++;
  }
  return created;
});

const themesCreated = insertThemesBatch();
console.log(`Created ${themesCreated} new theme records (${newThemes.length - themesCreated} already existed).`);

// ──────────────────────────────────────────────────────────────
// 2. The 68 passage_theme rows: [book_id, chapter, verse_start, verse_end, theme_id, relevance, context_note]
// ──────────────────────────────────────────────────────────────
const rows = [

  // ====================== PROVERBS (24 chapters × 2 = 48 rows) ======================

  // PRO 2 — Wisdom protects from evil paths and the forbidden woman
  ['PRO', 2, 1, 22, 'wisdom',      'primary',   'Solomon urges his son to seek wisdom like hidden treasure, promising it will guard him from crooked paths and the seductive stranger.'],
  ['PRO', 2, 1, 22, 'discipline',  'secondary', 'Receiving and storing up commandments is the prerequisite for understanding — discipline as the soil in which wisdom takes root.'],

  // PRO 3 — Trust in the LORD and the blessings of wisdom
  ['PRO', 3, 1, 35, 'trust',       'primary',   'Trust in the LORD with all your heart and lean not on your own understanding — the chapter\'s thesis that surrender precedes guidance.'],
  ['PRO', 3, 1, 35, 'humility',    'secondary', 'Do not be wise in your own eyes; fear the LORD and shun evil — humility framed as intellectual honesty before God.'],

  // PRO 4 — Guard your heart above all else
  ['PRO', 4, 1, 27, 'instruction', 'primary',   'A father passes down wisdom received from his own father, making instruction a three-generation relay of moral formation.'],
  ['PRO', 4, 1, 27, 'integrity',   'secondary', 'Guard your heart, for everything you do flows from it — integrity as the vigilant protection of one\'s inner life.'],

  // PRO 5 — Warning against adultery, rejoice in the wife of your youth
  ['PRO', 5, 1, 23, 'self-control',  'primary', 'The forbidden woman\'s lips drip honey but her end is bitter — self-control presented as the boundary between life and destruction.'],
  ['PRO', 5, 1, 23, 'faithfulness', 'secondary', 'Rejoice in the wife of your youth and let her love satisfy you always — faithfulness in marriage as the positive vision behind the warning.'],

  // PRO 7 — The seduction of the naive young man
  ['PRO', 7, 1, 27, 'wisdom',       'primary',  'A dramatic street-level narrative shows a young man led to slaughter by the forbidden woman — wisdom as the street smarts that save your life.'],
  ['PRO', 7, 1, 27, 'self-control', 'secondary', 'The young man lacked sense and wandered near her door at twilight — the absence of self-control presented as a fatal vulnerability.'],

  // PRO 8 — Wisdom speaks: I was there before creation
  ['PRO', 8, 1, 36, 'wisdom',       'primary',  'Wisdom personified declares she was beside God at creation like a master craftsman — wisdom elevated to a cosmic, pre-creational reality.'],
  ['PRO', 8, 1, 36, 'fear',         'secondary', 'The fear of the LORD is to hate evil, pride, arrogance, and perverted speech — reverent awe as wisdom\'s ethical foundation.'],

  // PRO 12 — The righteous versus the wicked in everyday life
  ['PRO', 12, 1, 28, 'righteousness', 'primary', 'Whoever loves discipline loves knowledge, but whoever hates correction is stupid — righteousness shown through willingness to be corrected.'],
  ['PRO', 12, 1, 28, 'speech',        'secondary', 'Truthful lips endure forever but a lying tongue lasts only a moment — speech as the daily arena where character is revealed.'],

  // PRO 13 — Wealth gained hastily dwindles; patient gathering grows
  ['PRO', 13, 1, 25, 'diligence',   'primary',   'Wealth from get-rich-quick schemes dwindles, but whoever gathers little by little makes it grow — diligence as the slow road to lasting gain.'],
  ['PRO', 13, 1, 25, 'discipline',  'secondary',  'Whoever spares the rod hates their children, but the one who loves them is careful to discipline — correction as love in disguise.'],

  // PRO 14 — There is a way that appears right but leads to death
  ['PRO', 14, 1, 35, 'wisdom',      'primary',   'There is a way that appears right to a person but its end is the way of death — wisdom as the ability to see past appearances.'],
  ['PRO', 14, 1, 35, 'justice',     'secondary',  'Righteousness exalts a nation, but sin condemns any people — justice framed as a communal reality, not merely individual virtue.'],

  // PRO 15 — A gentle answer turns away wrath
  ['PRO', 15, 1, 33, 'speech',      'primary',   'A gentle answer turns away wrath, but a harsh word stirs up anger — the tongue as the primary instrument of peace or conflict.'],
  ['PRO', 15, 1, 33, 'humility',    'secondary', 'Before honour comes humility, and the LORD detests the proud of heart — humility as the prerequisite for every good outcome.'],

  // PRO 16 — The heart plans, but the LORD directs the steps
  ['PRO', 16, 1, 33, 'sovereignty', 'primary',   'In their hearts humans plan their course, but the LORD establishes their steps — divine sovereignty gently overriding human agendas.'],
  ['PRO', 16, 1, 33, 'pride',       'secondary',  'Pride goes before destruction and a haughty spirit before a fall — the chapter\'s most quoted warning against self-exaltation.'],

  // PRO 18 — Death and life are in the power of the tongue
  ['PRO', 18, 1, 24, 'speech',       'primary',  'Death and life are in the power of the tongue, and those who love it will eat its fruit — words treated as morally consequential acts.'],
  ['PRO', 18, 1, 24, 'community',    'secondary', 'A man of many companions may be ruined, but there is a friend who sticks closer than a brother — community distilled to its truest form.'],

  // PRO 19 — Kindness to the poor is a loan to the LORD
  ['PRO', 19, 1, 29, 'generosity',   'primary',  'Whoever is kind to the poor lends to the LORD, and he will repay them for their deed — generosity reframed as a divine transaction.'],
  ['PRO', 19, 1, 29, 'discipline',   'secondary', 'Discipline your children, for in that there is hope — parental correction presented as an act of redemptive love.'],

  // PRO 20 — Who can say, I have kept my heart pure?
  ['PRO', 20, 1, 30, 'integrity',    'primary',  'Who can say I have kept my heart pure, I am clean and without sin? — integrity framed as an honest reckoning with one\'s own limits.'],
  ['PRO', 20, 1, 30, 'justice',      'secondary', 'Differing weights and differing measures — the LORD detests them both — justice as precision and fairness in every exchange.'],

  // PRO 21 — The king's heart is a stream in the LORD's hand
  ['PRO', 21, 1, 31, 'sovereignty',  'primary',  'The king\'s heart is a stream of water in the hand of the LORD; he turns it wherever he will — divine rule over the most powerful human authority.'],
  ['PRO', 21, 1, 31, 'righteousness','secondary', 'To do what is right and just is more acceptable to the LORD than sacrifice — righteousness valued above ritual performance.'],

  // PRO 22 — A good name is more desirable than great riches
  ['PRO', 22, 1, 29, 'integrity',      'primary', 'A good name is more desirable than great riches; to be esteemed is better than silver or gold — integrity as the most valuable asset.'],
  ['PRO', 22, 1, 29, 'instruction',    'secondary','Train up a child in the way he should go; even when he is old he will not depart from it — instruction as a long-term investment in character.'],

  // PRO 23 — Do not gaze at wine when it is red
  ['PRO', 23, 1, 35, 'self-control',   'primary', 'Do not gaze at wine when it sparkles in the cup; in the end it bites like a snake — self-control as refusal of alluring destruction.'],
  ['PRO', 23, 1, 35, 'wisdom',         'secondary','Buy the truth and do not sell it — wisdom, instruction, and understanding together — wisdom treated as a non-negotiable possession.'],

  // PRO 24 — Do not gloat when your enemy falls
  ['PRO', 24, 1, 34, 'diligence',      'primary', 'I went past the field of a sluggard and thorns had come up everywhere — diligence taught by observing the ruin of its opposite.'],
  ['PRO', 24, 1, 34, 'justice',         'secondary','Do not gloat when your enemy falls; the LORD will see and be displeased — justice that refuses even inward schadenfreude.'],

  // PRO 25 — A word fitly spoken is like apples of gold
  ['PRO', 25, 1, 28, 'speech',          'primary', 'A word fitly spoken is like apples of gold in a setting of silver — the right word at the right moment elevated to the level of art.'],
  ['PRO', 25, 1, 28, 'self-control',    'secondary','Like a city whose walls are broken through is a person who lacks self-control — inner discipline framed as the fortification of the soul.'],

  // PRO 26 — As a dog returns to its vomit, so fools repeat their folly
  ['PRO', 26, 1, 28, 'wisdom',          'primary', 'Answer a fool according to his folly, or do not — the paired proverbs teach that wisdom requires reading the situation, not following a formula.'],
  ['PRO', 26, 1, 28, 'laziness',        'secondary','The sluggard buries his hand in the dish and is too lazy to bring it back to his mouth — laziness depicted with absurd humour to shame the reader.'],

  // PRO 27 — Iron sharpens iron
  ['PRO', 27, 1, 27, 'community',       'primary', 'As iron sharpens iron, so one person sharpens another — community defined by mutual challenge, not comfortable agreement.'],
  ['PRO', 27, 1, 27, 'diligence',       'secondary','Be sure you know the condition of your flocks; give careful attention to your herds — diligence in stewardship as the foundation of provision.'],

  // PRO 28 — The righteous are bold as a lion
  ['PRO', 28, 1, 28, 'righteousness',   'primary', 'The wicked flee though no one pursues, but the righteous are bold as a lion — righteousness as the source of unshakeable courage.'],
  ['PRO', 28, 1, 28, 'integrity',       'secondary','Better the poor whose walk is blameless than the rich whose ways are perverse — integrity valued above wealth without qualification.'],

  // PRO 29 — Where there is no vision the people cast off restraint
  ['PRO', 29, 1, 27, 'justice',          'primary', 'When the righteous thrive the people rejoice; when the wicked rule the people groan — justice and governance inseparably linked.'],
  ['PRO', 29, 1, 27, 'discipline',       'secondary','A rod and a reprimand impart wisdom, but a child left undisciplined disgraces its mother — discipline as the structure love requires.'],

  // PRO 30 — Agur's oracle: give me neither poverty nor riches
  ['PRO', 30, 1, 33, 'humility',         'primary', 'Every word of God is flawless — do not add to his words, or he will rebuke you — humility before divine revelation as Agur\'s defining posture.'],
  ['PRO', 30, 1, 33, 'wisdom',           'secondary','Give me neither poverty nor riches but only my daily bread — wisdom distilled into the most honest prayer about money in Scripture.'],

  // ====================== ECCLESIASTES (6 chapters × 2 = 12 rows) ======================

  // ECC 2 — I tried everything: pleasure, wealth, achievement — all vanity
  ['ECC', 2, 1, 26, 'vanity',       'primary',   'I denied myself nothing my eyes desired, yet when I surveyed all my hands had done, everything was meaningless and chasing after wind.'],
  ['ECC', 2, 1, 26, 'work',         'secondary',  'I hated all the things I had toiled for because I must leave them to someone after me who may be a fool — work cursed by the inability to control its legacy.'],

  // ECC 6 — God gives wealth but not the ability to enjoy it
  ['ECC', 6, 1, 12, 'vanity',       'primary',   'God gives someone wealth, possessions, and honour but a stranger enjoys them instead — abundance without enjoyment is a grievous evil.'],
  ['ECC', 6, 1, 12, 'mortality',    'secondary',  'Who knows what is good for a person during the few and meaningless days they pass through like a shadow — mortality rendering all calculations uncertain.'],

  // ECC 7 — Sorrow is better than laughter
  ['ECC', 7, 1, 29, 'wisdom',       'primary',   'The heart of the wise is in the house of mourning, but the heart of fools is in the house of pleasure — wisdom forged in sorrow, not entertainment.'],
  ['ECC', 7, 1, 29, 'sovereignty',  'secondary',  'Consider what God has done: who can straighten what he has made crooked? — divine sovereignty acknowledged even when it baffles.'],

  // ECC 8 — No one can comprehend what goes on under the sun
  ['ECC', 8, 1, 17, 'sovereignty',  'primary',   'No one can comprehend what goes on under the sun — despite all efforts to search it out, the work of God remains inscrutable.'],
  ['ECC', 8, 1, 17, 'joy',         'secondary',   'I commend the enjoyment of life because there is nothing better under the sun than to eat and drink and be glad — joy as the only sane response to inscrutability.'],

  // ECC 10 — A little folly outweighs wisdom and honour
  ['ECC', 10, 1, 20, 'wisdom',      'primary',   'As dead flies give perfume a bad smell, so a little folly outweighs wisdom and honour — wisdom shown to be fragile, easily ruined by small acts of foolishness.'],
  ['ECC', 10, 1, 20, 'speech',      'secondary',  'Do not curse the king even in your thought, for a bird of the air may carry your words — careless speech as the folly most likely to destroy you.'],

  // ECC 11 — Cast your bread upon the waters
  ['ECC', 11, 1, 10, 'joy',         'primary',   'Be happy, young man, while you are young, and let your heart give you joy in the days of your youth — urgent enjoyment before the darkness comes.'],
  ['ECC', 11, 1, 10, 'work',        'secondary',  'Cast your bread upon the waters, for after many days you will find it again — bold investment and labour commended despite life\'s uncertainty.'],

  // ====================== SONG OF SOLOMON (4 chapters × 2 = 8 rows) ======================

  // SNG 2 — My beloved is mine and I am his
  ['SNG', 2, 1, 17, 'love',         'primary',   'My beloved is mine and I am his — mutual belonging declared with a simplicity that becomes the Song\'s refrain and theological anchor.'],
  ['SNG', 2, 1, 17, 'desire',       'secondary',  'Arise, my darling, my beautiful one, come with me — the winter is past, the rains are over — desire expressed through the imagery of spring\'s arrival.'],

  // SNG 5 — I opened for my beloved but he had turned and gone
  ['SNG', 5, 1, 17, 'love',         'primary',   'I opened for my beloved, but my beloved had left — love tested by absence and longing, the ache of the door opened a moment too late.'],
  ['SNG', 5, 1, 17, 'beauty',       'secondary',  'My beloved is radiant and ruddy, outstanding among ten thousand — the woman catalogues her lover\'s beauty in extravagant physical detail.'],

  // SNG 6 — You are as beautiful as Tirzah, my darling
  ['SNG', 6, 1, 13, 'beauty',       'primary',   'You are as beautiful as Tirzah, my darling, as lovely as Jerusalem, as majestic as troops with banners — beauty described in civic and military grandeur.'],
  ['SNG', 6, 1, 13, 'belonging',    'secondary',  'I am my beloved\'s and my beloved is mine — the refrain reaffirmed after the pain of separation, belonging restored.'],

  // SNG 7 — How beautiful your sandalled feet, O prince's daughter
  ['SNG', 7, 1, 13, 'desire',       'primary',   'How beautiful your sandalled feet — the lover\'s gaze travels upward in an unashamed celebration of the woman\'s body from foot to crown.'],
  ['SNG', 7, 1, 13, 'celebration',  'secondary',  'Come, my beloved, let us go to the countryside — desire overflows into invitation, love celebrated in the open fields and vineyards.'],
];

// ──────────────────────────────────────────────────────────────
// 3. Insert into passage_themes
// ──────────────────────────────────────────────────────────────
const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const insertAll = db.transaction((data) => {
  let count = 0;
  for (const [bookId, chapter, verseStart, verseEnd, themeId, relevance, contextNote] of data) {
    insert.run(themeId, bookId, chapter, verseStart, verseEnd, relevance, contextNote);
    count++;
  }
  return count;
});

const inserted = insertAll(rows);
console.log(`Inserted ${inserted} passage_theme rows for 34 chapters.`);

// ──────────────────────────────────────────────────────────────
// 4. Verify
// ──────────────────────────────────────────────────────────────
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) AS cnt
  FROM passage_themes
  WHERE book_id IN ('PRO','ECC','SNG') AND source_tier = 'ai_assisted'
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('Total ai_assisted passage_themes by book:', JSON.stringify(byBook));

const proChapters = db.prepare(`
  SELECT DISTINCT chapter FROM passage_themes WHERE book_id = 'PRO' ORDER BY chapter
`).all().map(r => r.chapter);
console.log('PRO chapters now covered:', proChapters);

const eccChapters = db.prepare(`
  SELECT DISTINCT chapter FROM passage_themes WHERE book_id = 'ECC' ORDER BY chapter
`).all().map(r => r.chapter);
console.log('ECC chapters now covered:', eccChapters);

const sngChapters = db.prepare(`
  SELECT DISTINCT chapter FROM passage_themes WHERE book_id = 'SNG' ORDER BY chapter
`).all().map(r => r.chapter);
console.log('SNG chapters now covered:', sngChapters);

db.close();
console.log('Done.');
