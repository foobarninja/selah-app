/**
 * Insert passage_themes for 26 missing Epistles + Revelation chapters.
 *
 * Missing chapters:
 *   ROM 2,16 | 1CO 14,16 | 2CO 2,6,7,8,9,10,11,13 | EPH 3,5 | COL 4
 *   2TH 1 | 1TI 4,5 | 2TI 3 | HEB 2,3,6 | JAS 4 | REV 10,15,16
 *
 * 2-3 themes per chapter, source_tier = 'ai_assisted'.
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------------------------------------------------------------------------
// 1. Ensure all required themes exist
// ---------------------------------------------------------------------------

const missingThemes = [
  {
    id: 'judgment',
    name: 'Judgment',
    category: 'theology',
    definition: "God's righteous evaluation of human conduct — both present moral discernment and the eschatological verdict that sets all things right.",
    modern_framing: "The sense that actions have real consequences and that the universe is not morally indifferent — someone is keeping score, and the final reckoning matters.",
    related_themes: '["divine-judgment","wrath-of-god","justice","righteousness"]',
  },
  {
    id: 'righteousness',
    name: 'Righteousness',
    category: 'virtue',
    definition: "Right standing before God — both the moral uprightness God requires and the status God grants through faith. In Paul, it is the gift that resolves the human dilemma.",
    modern_framing: "Living with integrity even when no one is watching, and knowing your worth does not depend on your performance but on whose you are.",
    related_themes: '["justice","faith","justification","holiness"]',
  },
  {
    id: 'order',
    name: 'Order',
    category: 'practice',
    definition: "The principle that God is not a God of confusion but of peace, reflected in how worship, community life, and creation itself are structured.",
    modern_framing: "The rhythm and structure that make shared life possible — knowing when to speak, when to listen, and how to make room for everyone.",
    related_themes: '["worship","community","wisdom","peace"]',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    category: 'experience',
    definition: "God's active consolation in suffering — not removal of pain but the sustaining presence that enables endurance and equips believers to comfort others.",
    modern_framing: "The deep reassurance that comes not from being told everything is fine but from someone sitting with you in the mess and saying, 'I am here.'",
    related_themes: '["suffering","hope","presence-of-god","compassion"]',
  },
  {
    id: 'spiritual-warfare',
    name: 'Spiritual Warfare',
    category: 'theology',
    definition: "The ongoing cosmic conflict between God's purposes and the forces of evil, played out in both heavenly realms and daily human decisions.",
    modern_framing: "The awareness that the struggles you face are not just personal or political but part of something larger — and the tools to resist are not weapons of violence but truth, faith, and prayer.",
    related_themes: '["warfare","authority","faith","prayer","temptation"]',
  },
  {
    id: 'mystery',
    name: 'Mystery',
    category: 'theology',
    definition: "A divine truth once hidden but now revealed in Christ — not something unknowable but something that required God's initiative to disclose.",
    modern_framing: "The moment the puzzle clicks and you realize the answer was always there, waiting for the right time to be shown — God's long game finally making sense.",
    related_themes: '["mystery-of-god","revelation","divine-plan","wisdom"]',
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    category: 'virtue',
    definition: "Steadfast endurance under trial — the refusal to abandon faith when circumstances demand it, sustained by hope in God's promises.",
    modern_framing: "Showing up again tomorrow even when today was brutal — the quiet stubbornness of faith that outlasts every reason to quit.",
    related_themes: '["perseverance-in-faith","endurance","suffering","hope","patience"]',
  },
  {
    id: 'second-coming',
    name: 'Second Coming',
    category: 'eschatology',
    definition: "The promised return of Christ in glory to judge the living and the dead, consummate the kingdom, and make all things new.",
    modern_framing: "The conviction that history is heading somewhere — that the story is not over and the best chapter has not been written yet.",
    related_themes: '["eschatological-hope","judgment","kingdom-of-god","resurrection-hope"]',
  },
  {
    id: 'godliness',
    name: 'Godliness',
    category: 'virtue',
    definition: "A life shaped by reverence for God — practical piety that expresses itself in character, conduct, and devotion.",
    modern_framing: "Living in a way that reflects what you actually believe about God — faith that shows up in how you treat your body, your time, and your neighbor.",
    related_themes: '["holiness","discipleship","fear-of-god","obedience"]',
  },
  {
    id: 'scripture',
    name: 'Scripture',
    category: 'theology',
    definition: "The God-breathed writings that teach, correct, and equip — the authoritative record of God's revelation and the primary tool for spiritual formation.",
    modern_framing: "The ancient text that still reads you more than you read it — a living document that speaks into every generation with surprising relevance.",
    related_themes: '["wisdom","discipleship","prophecy","truth"]',
  },
  {
    id: 'incarnation',
    name: 'Incarnation',
    category: 'theology',
    definition: "The Word becoming flesh — God entering fully into human experience, taking on a body, limitations, suffering, and death to redeem from the inside.",
    modern_framing: "God did not shout instructions from a distance but moved into the neighborhood — solidarity at its most radical.",
    related_themes: '["humanity-of-christ","suffering","salvation","presence-of-god"]',
  },
  {
    id: 'hardness-of-heart',
    name: 'Hardness of Heart',
    category: 'vice',
    definition: "The progressive inability to hear God's voice, caused by repeated refusal to respond — a spiritual callousness that makes repentance increasingly difficult.",
    modern_framing: "The slow numbing that comes from ignoring your conscience so often that you stop hearing it — spiritual scar tissue built up one compromise at a time.",
    related_themes: '["rebellion","obedience","repentance","sin"]',
  },
  {
    id: 'assurance',
    name: 'Assurance',
    category: 'experience',
    definition: "The confident certainty of salvation and God's faithfulness — not arrogance but the settled peace that comes from trusting God's promises rather than one's own performance.",
    modern_framing: "The deep-down knowing that you belong, even on your worst day — security rooted not in what you have done but in what has been done for you.",
    related_themes: '["faith","hope","covenant","salvation","perseverance"]',
  },
  {
    id: 'worldliness',
    name: 'Worldliness',
    category: 'vice',
    definition: "The adoption of values, priorities, and desires shaped by a culture opposed to God — not engagement with the world but conformity to its disordered loves.",
    modern_framing: "Letting the algorithm, the market, or the crowd set your priorities instead of letting your faith shape them — drifting into the current without noticing.",
    related_themes: '["temptation","idolatry","holiness","sin"]',
  },
];

const insertTheme = db.prepare(`
  INSERT OR IGNORE INTO themes (id, name, category, definition, modern_framing, related_themes, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const insertThemes = db.transaction(() => {
  let count = 0;
  for (const t of missingThemes) {
    const info = insertTheme.run(t.id, t.name, t.category, t.definition, t.modern_framing, t.related_themes);
    if (info.changes > 0) count++;
  }
  return count;
});

const themesAdded = insertThemes();
console.log(`Inserted ${themesAdded} new themes (${missingThemes.length - themesAdded} already existed).`);

// ---------------------------------------------------------------------------
// 2. Verse-end lookup helper
// ---------------------------------------------------------------------------

const maxVerseStmt = db.prepare(
  'SELECT MAX(verse) AS max_v FROM verses WHERE book_id = ? AND chapter = ?'
);

function lastVerse(book, chapter) {
  const row = maxVerseStmt.get(book, chapter);
  return row ? row.max_v : null;
}

// ---------------------------------------------------------------------------
// 3. Theme tags — [book_id, chapter, theme_id, relevance, context_note]
// ---------------------------------------------------------------------------

const tags = [
  // ======================== ROMANS ========================

  // ROM 2 — judgment, righteousness, hypocrisy
  ['ROM', 2, 'judgment', 'primary',
    "Paul argues that God's judgment is impartial — both Jew and Gentile are accountable, and possessing the law does not exempt anyone from its standard."],
  ['ROM', 2, 'righteousness', 'primary',
    "True righteousness is internal, not ethnic or ceremonial — circumcision of the heart by the Spirit matters more than the outward sign."],
  ['ROM', 2, 'hypocrisy', 'secondary',
    "Paul exposes the inconsistency of teaching others while failing to obey oneself, warning that God's name is blasphemed among the Gentiles because of it."],

  // ROM 16 — community, fellowship, mission
  ['ROM', 16, 'community', 'primary',
    "Paul's personal greetings to over twenty-five co-workers reveal the diverse, interconnected network of house churches sustaining the early mission."],
  ['ROM', 16, 'fellowship', 'primary',
    "The chapter is a window into real Christian fellowship — shared labor, mutual affection, and hospitality that crosses gender, ethnic, and social lines."],
  ['ROM', 16, 'mission', 'secondary',
    "Names like Phoebe the deacon and Junia the apostle show that mission was carried forward by a broad team, not a single leader."],

  // ======================== 1 CORINTHIANS ========================

  // 1CO 14 — spiritual-gifts, worship, order
  ['1CO', 14, 'spiritual-gifts', 'primary',
    "Paul regulates the use of tongues and prophecy in worship, insisting that every gift must build up the whole community, not just the individual."],
  ['1CO', 14, 'worship', 'primary',
    "Corporate worship should be intelligible and edifying — an outsider walking in should encounter God, not confusion."],
  ['1CO', 14, 'order', 'secondary',
    "God is not a God of disorder but of peace; Paul establishes practical guidelines so that spiritual enthusiasm does not descend into chaos."],

  // 1CO 16 — generosity, community, commission
  ['1CO', 16, 'generosity', 'primary',
    "Paul organizes the collection for the Jerusalem saints, instructing each believer to set aside a sum weekly — generosity as a disciplined practice, not a spontaneous impulse."],
  ['1CO', 16, 'community', 'primary',
    "Travel plans, personal commendations, and greetings reveal a web of relationships that held the early churches together across distance."],
  ['1CO', 16, 'commission', 'secondary',
    "The closing charge — 'Be on your guard; stand firm in the faith; be courageous; be strong' — sends the church back into mission with resolve."],

  // ======================== 2 CORINTHIANS ========================

  // 2CO 2 — forgiveness, comfort
  ['2CO', 2, 'forgiveness', 'primary',
    "Paul urges the church to forgive and restore the offender, warning that excessive punishment can overwhelm a person and give Satan an advantage."],
  ['2CO', 2, 'comfort', 'primary',
    "Relief floods Paul when Titus brings good news from Corinth — comfort that comes from reconciliation after painful confrontation."],

  // 2CO 6 — holiness, reconciliation
  ['2CO', 6, 'holiness', 'primary',
    "Paul calls believers to separate from what defiles, grounding the command in God's promise to dwell among them — holiness as the condition of intimacy."],
  ['2CO', 6, 'reconciliation', 'primary',
    "As God's fellow workers, Paul and his team urge the Corinthians not to receive grace in vain but to be fully reconciled in heart and conduct."],

  // 2CO 7 — holiness, reconciliation
  ['2CO', 7, 'holiness', 'primary',
    "Godly sorrow produces repentance leading to salvation without regret — a grief that cleanses rather than destroys."],
  ['2CO', 7, 'reconciliation', 'primary',
    "Titus's report that the Corinthians received Paul's painful letter with earnestness, alarm, and longing confirms that genuine reconciliation has begun."],

  // 2CO 8 — generosity, grace-unmerited
  ['2CO', 8, 'generosity', 'primary',
    "The Macedonians gave beyond their means out of severe poverty — generosity modeled on Christ, who though rich became poor so that through his poverty others might become rich."],
  ['2CO', 8, 'grace-unmerited', 'secondary',
    "Paul frames the collection not as obligation but as a grace — the same word used for salvation now applied to giving."],

  // 2CO 9 — generosity, grace-unmerited
  ['2CO', 9, 'generosity', 'primary',
    "God loves a cheerful giver, and whoever sows generously will reap generously — the agricultural metaphor makes giving an act of faith, not loss."],
  ['2CO', 9, 'grace-unmerited', 'secondary',
    "God is able to make all grace abound to you, so that in all things at all times you may abound in every good work — grace as the fuel for generosity."],

  // 2CO 10 — authority, spiritual-warfare
  ['2CO', 10, 'authority', 'primary',
    "Paul defends his apostolic authority against critics who judge by outward appearance, insisting that his meekness in person reflects Christ, not weakness."],
  ['2CO', 10, 'spiritual-warfare', 'primary',
    "The weapons of this warfare are not worldly — Paul speaks of demolishing strongholds, arguments, and every pretension that sets itself up against the knowledge of God."],

  // 2CO 11 — authority, suffering
  ['2CO', 11, 'authority', 'primary',
    "Paul reluctantly boasts, listing his credentials against the 'super-apostles' — not to self-promote but to protect the community from deception."],
  ['2CO', 11, 'suffering', 'primary',
    "The catalog of sufferings — beatings, shipwrecks, hunger, danger — becomes Paul's true credential, proving that apostolic authority is authenticated by endurance, not eloquence."],

  // 2CO 13 — grace-unmerited, community
  ['2CO', 13, 'grace-unmerited', 'primary',
    "The letter closes with the trinitarian benediction — 'The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit be with you all.'"],
  ['2CO', 13, 'community', 'secondary',
    "Paul's final appeals for self-examination, mutual encouragement, and unity show that community health requires ongoing honest assessment."],

  // ======================== EPHESIANS ========================

  // EPH 3 — mystery, grace-unmerited, prayer
  ['EPH', 3, 'mystery', 'primary',
    "The mystery hidden for ages is now revealed: Gentiles are fellow heirs with Israel, united in one body through the gospel."],
  ['EPH', 3, 'grace-unmerited', 'primary',
    "Paul marvels that he, the least of all the saints, was given grace to preach the unsearchable riches of Christ to the Gentiles."],
  ['EPH', 3, 'prayer', 'secondary',
    "Paul's prayer for the Ephesians — that they would be rooted in love and grasp its limitless dimensions — is among the most expansive prayers in Scripture."],

  // EPH 5 — love, holiness, wisdom
  ['EPH', 5, 'love', 'primary',
    "Husbands are to love their wives as Christ loved the church and gave himself up for her — sacrificial love as the pattern for all human intimacy."],
  ['EPH', 5, 'holiness', 'primary',
    "Believers are called to live as children of light, exposing the fruitless deeds of darkness — holiness not as withdrawal but as illumination."],
  ['EPH', 5, 'wisdom', 'secondary',
    "Be very careful how you live — not as unwise but as wise, making the most of every opportunity because the days are evil."],

  // ======================== COLOSSIANS ========================

  // COL 4 — prayer, community, mission
  ['COL', 4, 'prayer', 'primary',
    "Paul asks for prayer that God would open a door for the gospel — prayer as the engine of mission, not an afterthought."],
  ['COL', 4, 'community', 'primary',
    "Personal greetings and instructions about exchanging letters between churches reveal the collaborative, networked nature of early Christian community."],
  ['COL', 4, 'mission', 'secondary',
    "The instruction to conduct yourselves wisely toward outsiders, making the most of the time, frames daily interactions as mission opportunities."],

  // ======================== 2 THESSALONIANS ========================

  // 2TH 1 — perseverance, judgment, second-coming
  ['2TH', 1, 'perseverance', 'primary',
    "Paul commends the Thessalonians for their growing faith and endurance amid persecutions — suffering that proves them worthy of the kingdom."],
  ['2TH', 1, 'judgment', 'primary',
    "God's righteous judgment will repay affliction to the afflicters and relief to the afflicted — justice delayed is not justice denied."],
  ['2TH', 1, 'second-coming', 'secondary',
    "Relief comes when the Lord Jesus is revealed from heaven in blazing fire — the second coming as both vindication for the faithful and reckoning for the disobedient."],

  // ======================== 1 TIMOTHY ========================

  // 1TI 4 — discipleship, godliness, calling
  ['1TI', 4, 'discipleship', 'primary',
    "Paul urges Timothy to train himself in godliness, which has value for all things — spiritual formation as intentional practice, not passive absorption."],
  ['1TI', 4, 'godliness', 'primary',
    "Physical training has some value, but godliness has value for both the present life and the life to come — a long-term investment that never depreciates."],
  ['1TI', 4, 'calling', 'secondary',
    "Do not neglect your gift, which was given you through prophecy — Timothy's calling is confirmed communally and must be stewarded diligently."],

  // 1TI 5 — community, justice, leadership
  ['1TI', 5, 'community', 'primary',
    "Instructions on caring for widows, honoring elders, and managing household relationships reveal the church as an extended family with real obligations."],
  ['1TI', 5, 'justice', 'primary',
    "Accusations against elders require two or three witnesses — fairness and due process protect both leaders and the community from slander."],
  ['1TI', 5, 'leadership', 'secondary',
    "Elders who direct the affairs of the church well are worthy of double honor — leadership as service that deserves tangible recognition."],

  // ======================== 2 TIMOTHY ========================

  // 2TI 3 — perseverance, scripture, suffering
  ['2TI', 3, 'perseverance', 'primary',
    "Paul reminds Timothy that everyone who wants to live a godly life in Christ Jesus will be persecuted — perseverance is the expected norm, not the exception."],
  ['2TI', 3, 'scripture', 'primary',
    "All Scripture is God-breathed and useful for teaching, rebuking, correcting, and training in righteousness — the foundational statement on Scripture's purpose."],
  ['2TI', 3, 'suffering', 'secondary',
    "Paul points to his own persecutions in Antioch, Iconium, and Lystra as the model — suffering endured because the Lord rescued him through it all."],

  // ======================== HEBREWS ========================

  // HEB 2 — incarnation, suffering, salvation
  ['HEB', 2, 'incarnation', 'primary',
    "Jesus was made lower than the angels for a little while, sharing fully in flesh and blood so that through death he might destroy the one who holds the power of death."],
  ['HEB', 2, 'suffering', 'primary',
    "Because he himself suffered when tempted, he is able to help those who are being tempted — solidarity in suffering as the basis of priestly compassion."],
  ['HEB', 2, 'salvation', 'secondary',
    "How shall we escape if we ignore so great a salvation? — the urgency of the gospel is proportional to the magnitude of what has been accomplished."],

  // HEB 3 — faith, obedience, hardness-of-heart
  ['HEB', 3, 'faith', 'primary',
    "The wilderness generation failed to enter God's rest because of unbelief — faith is the prerequisite for receiving what God promises."],
  ['HEB', 3, 'obedience', 'primary',
    "The author equates disobedience with unbelief: those who heard the good news but did not combine it with faith gained nothing from it."],
  ['HEB', 3, 'hardness-of-heart', 'secondary',
    "Today, if you hear his voice, do not harden your hearts — the warning against calloused unresponsiveness is urgent because each day the window narrows."],

  // HEB 6 — perseverance, assurance, covenant
  ['HEB', 6, 'perseverance', 'primary',
    "The author urges believers to press on to maturity rather than laying again the foundation of repentance — faith must grow or it risks falling away."],
  ['HEB', 6, 'assurance', 'primary',
    "God confirmed his promise with an oath so that by two unchangeable things believers would have strong encouragement to hold fast to hope — assurance anchored in God's character."],
  ['HEB', 6, 'covenant', 'secondary',
    "The oath to Abraham becomes the anchor of the soul, firm and secure — covenant promise as the ground of confidence when circumstances waver."],

  // ======================== JAMES ========================

  // JAS 4 — humility, prayer, worldliness
  ['JAS', 4, 'humility', 'primary',
    "God opposes the proud but gives grace to the humble — submit yourselves to God, and he will lift you up."],
  ['JAS', 4, 'prayer', 'secondary',
    "You do not have because you do not ask, and when you ask you do not receive because you ask with wrong motives — prayer integrity matters."],
  ['JAS', 4, 'worldliness', 'secondary',
    "Friendship with the world is enmity with God — James frames divided loyalty as spiritual adultery, demanding an uncompromising choice."],

  // ======================== REVELATION ========================

  // REV 10 — prophecy, sovereignty, mystery
  ['REV', 10, 'prophecy', 'primary',
    "John is told to eat the scroll and prophesy again — the prophetic task is renewed, and the message is both sweet in reception and bitter in its content."],
  ['REV', 10, 'sovereignty', 'primary',
    "The mighty angel with one foot on the sea and one on the land declares that there will be no more delay — God's sovereign timetable is unfolding on schedule."],
  ['REV', 10, 'mystery', 'secondary',
    "The mystery of God will be accomplished as announced to the prophets — all the threads of prophecy are converging toward fulfillment."],

  // REV 15 — worship, judgment, holiness
  ['REV', 15, 'worship', 'primary',
    "Those who conquered the beast sing the song of Moses and the Lamb — worship as the response of the redeemed who have endured through tribulation."],
  ['REV', 15, 'judgment', 'primary',
    "Seven angels with seven plagues prepare to pour out the final expression of God's wrath — judgment as the necessary prelude to restoration."],
  ['REV', 15, 'holiness', 'secondary',
    "The temple fills with smoke from the glory and power of God, and no one can enter until the plagues are finished — holiness so intense it is unapproachable."],

  // REV 16 — judgment, sovereignty, wrath
  ['REV', 16, 'judgment', 'primary',
    "The seven bowls are poured out on the earth in rapid succession — sores, blood, scorching heat, darkness, drought, and earthquake — judgment that is total and irreversible."],
  ['REV', 16, 'sovereignty', 'primary',
    "Even amid catastrophic judgment the angel declares, 'You are just in these judgments, O Holy One' — God's sovereignty is exercised in righteousness, not arbitrary power."],
  ['REV', 16, 'wrath', 'secondary',
    "The great city splits into three parts and Babylon is remembered before God to give her the cup of the fury of his wrath — divine patience finally exhausted."],
];

// ---------------------------------------------------------------------------
// 4. Insert passage_themes rows
// ---------------------------------------------------------------------------

const insertTag = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, 1, ?, ?, ?, 'ai_assisted')
`);

const insertAll = db.transaction(() => {
  let count = 0;
  for (const [bookId, chapter, themeId, relevance, contextNote] of tags) {
    const verseEnd = lastVerse(bookId, chapter);
    if (!verseEnd) {
      console.error(`  WARNING: No verses found for ${bookId} ${chapter}, skipping.`);
      continue;
    }
    insertTag.run(themeId, bookId, chapter, verseEnd, relevance, contextNote);
    count++;
  }
  return count;
});

const inserted = insertAll();
console.log(`\nInserted ${inserted} passage_theme rows across 26 chapters.`);

// ---------------------------------------------------------------------------
// 5. Verify
// ---------------------------------------------------------------------------

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) AS cnt
  FROM passage_themes
  WHERE book_id IN ('ROM','1CO','2CO','EPH','COL','2TH','1TI','2TI','HEB','JAS','REV')
  GROUP BY book_id
  ORDER BY book_id
`).all();
console.log('\nTotal passage_themes by book (Epistles + Revelation):');
byBook.forEach(r => console.log(`  ${r.book_id}: ${r.cnt}`));

const total = db.prepare(`SELECT COUNT(*) AS cnt FROM passage_themes`).get();
console.log(`\nGrand total passage_themes: ${total.cnt}`);

db.close();
console.log('Done.');
