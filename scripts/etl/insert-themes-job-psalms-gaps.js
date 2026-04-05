/**
 * Fill 166 missing passage_themes rows for Job (31 ch) and Psalms (135 ch).
 *
 * JOB themes by dialogue section:
 *   Job's speeches  -> suffering, justice, faith, absence-of-god, hope, lament
 *   Friends' speeches -> judgment, sin, righteousness, wisdom, sovereignty
 *   Elihu (32-37)   -> sovereignty, wisdom, humility
 *   God's speeches (38-41) -> sovereignty, creation, wisdom, humility
 *
 * PSALMS themes by psalm type:
 *   Lament         -> suffering, lament, prayer, hope, trust
 *   Praise         -> worship, gratitude, joy, sovereignty, creation
 *   Royal          -> kingship, covenant, authority, messianic-hope (mapped to messianic-prophecy)
 *   Wisdom         -> wisdom, righteousness, justice, obedience
 *   Penitential    -> repentance, sin, mercy, forgiveness
 *   Pilgrimage     -> pilgrimage, worship, community, peace
 *   Enthronement   -> sovereignty, kingship (mapped to authority), worship
 *
 * 1 theme per psalm, 2 per Job chapter.  source_tier = 'ai_assisted'.
 */

const Database = require('better-sqlite3');
const db = new Database('data/selah.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Verse counts so we can set verse_end correctly ──────────────────────────
const verseCounts = {};
db.prepare(`
  SELECT book_id, chapter, MAX(verse) AS max_verse
  FROM verses WHERE book_id IN ('JOB','PSA')
  GROUP BY book_id, chapter
`).all().forEach(r => {
  if (!verseCounts[r.book_id]) verseCounts[r.book_id] = {};
  verseCounts[r.book_id][r.chapter] = r.max_verse;
});

// ─── Guard: skip chapters that already have passage_themes ───────────────────
const existing = new Set();
db.prepare(`
  SELECT DISTINCT book_id, chapter FROM passage_themes
  WHERE book_id IN ('JOB','PSA')
`).all().forEach(r => existing.add(`${r.book_id}:${r.chapter}`));

// ─── Data: [book_id, chapter, theme_id, relevance, context_note] ─────────────
const rows = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  JOB — 31 missing chapters, 2 themes each
  // ═══════════════════════════════════════════════════════════════════════════

  // Ch 2: Prologue continued — Satan strikes Job's body; wife says "Curse God"
  ['JOB', 2, 'suffering', 'primary', "Satan afflicts Job with painful sores from head to foot, stripping even bodily health from a blameless man."],
  ['JOB', 2, 'faith', 'secondary', "Job refuses his wife's counsel to curse God and die, clinging to integrity despite total loss."],

  // Ch 5: Eliphaz continues — appeals to God's discipline
  ['JOB', 5, 'sovereignty', 'primary', "Eliphaz urges Job to accept suffering as divine discipline from the Almighty who wounds but also binds up."],
  ['JOB', 5, 'wisdom', 'secondary', "Eliphaz appeals to traditional wisdom, asserting the pattern that mortals bring trouble on themselves."],

  // Ch 6: Job replies — anguish is justified
  ['JOB', 6, 'suffering', 'primary', "Job insists his anguish outweighs the sands of the sea, defending the raw honesty of his complaint."],
  ['JOB', 6, 'lament', 'secondary', "Job accuses his friends of being as unreliable as a seasonal wadi that dries up when most needed."],

  // Ch 7: Job continues — life is fleeting misery
  ['JOB', 7, 'suffering', 'primary', "Job compares his days to a weaver's shuttle, describing restless nights and decaying flesh."],
  ['JOB', 7, 'absence-of-god', 'secondary', "Job asks why God singles him out as a target, watching him so closely yet refusing to look away."],

  // Ch 10: Job's plea — why did you make me only to destroy me?
  ['JOB', 10, 'lament', 'primary', "Job questions why God shaped him in the womb only to pursue him with relentless affliction."],
  ['JOB', 10, 'justice', 'secondary', "Job protests that God knows he is not guilty yet no one can deliver him from God's hand."],

  // Ch 12: Job replies to Zophar — God's inscrutable power
  ['JOB', 12, 'sovereignty', 'primary', "Job acknowledges God's absolute power to exalt and destroy nations, overturning counselors and kings alike."],
  ['JOB', 12, 'wisdom', 'secondary', "Job sarcastically challenges his friends' claim to wisdom, insisting even animals know what they teach."],

  // Ch 13: Job continues — I will argue my case before God
  ['JOB', 13, 'justice', 'primary', "Job resolves to present his legal case directly to God, preferring honest confrontation to his friends' whitewashing."],
  ['JOB', 13, 'faith', 'secondary', "Though God may slay him, Job declares he will still defend his ways to God's face."],

  // Ch 14: Job — mortals born to trouble, cut down like flowers
  ['JOB', 14, 'hope', 'primary', "Job asks the haunting question whether mortals who die could live again, longing for renewal beyond the grave."],
  ['JOB', 14, 'suffering', 'secondary', "Job likens human life to a withering flower and a fleeting shadow, worn down by unrelenting pain."],

  // Ch 15: Eliphaz second speech — rebukes Job more sharply
  ['JOB', 15, 'sin', 'primary', "Eliphaz accuses Job of undermining the fear of God, insisting the wicked writhe in pain all their days."],
  ['JOB', 15, 'wisdom', 'secondary', "Eliphaz appeals to ancestral tradition as proof that suffering is always the consequence of hidden sin."],

  // Ch 16: Job replies — miserable comforters
  ['JOB', 16, 'suffering', 'primary', "Job describes God as an attacker who has shriveled him up, torn him apart, and set him up as a target."],
  ['JOB', 16, 'lament', 'secondary', "Job calls his friends miserable comforters whose windy speeches do nothing to ease his pain."],

  // Ch 17: Job continues — my spirit is broken
  ['JOB', 17, 'suffering', 'primary', "Job's spirit is broken, his days extinguished; he sees only the grave ahead."],
  ['JOB', 17, 'hope', 'secondary', "Job pleads for a pledge from God himself, since no human will vouch for him any longer."],

  // Ch 18: Bildad second speech — the fate of the wicked
  ['JOB', 18, 'justice', 'primary', "Bildad paints a terrifying portrait of the wicked man's destruction, assuming this describes Job's trajectory."],
  ['JOB', 18, 'sin', 'secondary', "Bildad insists the light of the wicked is extinguished and his own schemes bring him down."],

  // Ch 19: Job replies — I know my redeemer lives
  ['JOB', 19, 'faith', 'primary', "Job makes his boldest declaration of trust: he knows his redeemer lives and will stand upon the earth."],
  ['JOB', 19, 'suffering', 'secondary', "Job laments that God has stripped him of honor and uprooted his hope like a fallen tree."],

  // Ch 20: Zophar second speech — the triumph of the wicked is short
  ['JOB', 20, 'justice', 'primary', "Zophar insists the joy of the wicked is brief and divine retribution will reclaim every ill-gotten gain."],
  ['JOB', 20, 'sin', 'secondary', "Zophar describes how the wicked swallow riches only to vomit them up, consumed by hidden guilt."],

  // Ch 21: Job replies — why do the wicked prosper?
  ['JOB', 21, 'justice', 'primary', "Job demolishes retribution theology by cataloging the long, comfortable lives the wicked actually enjoy."],
  ['JOB', 21, 'suffering', 'secondary', "Job asks why the innocent suffer while the godless grow old, powerful, and surrounded by grandchildren."],

  // Ch 22: Eliphaz third speech — accuses Job of specific sins
  ['JOB', 22, 'sin', 'primary', "Eliphaz fabricates specific charges: Job stripped the naked, withheld bread from the hungry, turned away widows."],
  ['JOB', 22, 'justice', 'secondary', "Eliphaz frames repentance as a transaction — return to God and gold will be restored."],

  // Ch 23: Job replies — if only I could find God
  ['JOB', 23, 'absence-of-god', 'primary', "Job searches for God in every direction but cannot find him, tormented by divine hiddenness."],
  ['JOB', 23, 'faith', 'secondary', "Even in God's absence Job insists he has kept God's way and treasured his words more than daily bread."],

  // Ch 24: Job continues — why does God not set times for judgment?
  ['JOB', 24, 'justice', 'primary', "Job demands to know why God allows the wicked to move boundary stones, steal flocks, and exploit the poor."],
  ['JOB', 24, 'suffering', 'secondary', "Job describes the orphaned, the widowed, and the destitute who groan under oppression while God seems silent."],

  // Ch 25: Bildad third speech — how can a mortal be righteous before God?
  ['JOB', 25, 'sovereignty', 'primary', "Bildad's brief final speech exalts God's dominion and unapproachable purity among the heavenly hosts."],
  ['JOB', 25, 'sin', 'secondary', "Bildad concludes that if even the moon is not bright enough for God, how much less a mortal born of dust."],

  // Ch 26: Job replies — God's power is beyond comprehension
  ['JOB', 26, 'sovereignty', 'primary', "Job surpasses his friends' theology, describing God stretching the north over empty space and hanging the earth on nothing."],
  ['JOB', 26, 'wisdom', 'secondary', "Job acknowledges these are mere outskirts of God's ways; the thunder of his power no one can understand."],

  // Ch 27: Job — I will never concede my integrity
  ['JOB', 27, 'faith', 'primary', "Job swears by the living God that he will not let go of his integrity or speak a false word of confession."],
  ['JOB', 27, 'justice', 'secondary', "Job insists that while the godless may heap up silver, the righteous will eventually wear their fine clothing."],

  // Ch 30: Job — now they mock me
  ['JOB', 30, 'suffering', 'primary', "Men younger and lower in status now mock Job, spitting in his face; his dignity has collapsed."],
  ['JOB', 30, 'lament', 'secondary', "Job cries out to God but receives no answer; he has become a brother of jackals in his desolation."],

  // Ch 31: Job — final oath of innocence
  ['JOB', 31, 'justice', 'primary', "Job enumerates his ethical conduct in a sworn oath, inviting curses on himself if any charge is true."],
  ['JOB', 31, 'faith', 'secondary', "Job's willingness to stake his life on his innocence reflects absolute confidence in his standing before God."],

  // Ch 33: Elihu — God speaks through dreams and pain
  ['JOB', 33, 'sovereignty', 'primary', "Elihu argues God speaks through night visions and bodily pain to turn mortals back from the pit."],
  ['JOB', 33, 'wisdom', 'secondary', "Elihu presents suffering as divine pedagogy, a channel through which God instructs those who will listen."],

  // Ch 34: Elihu — God cannot act wickedly
  ['JOB', 34, 'justice', 'primary', "Elihu defends God's perfect justice, insisting the Almighty cannot pervert what is right."],
  ['JOB', 34, 'sovereignty', 'secondary', "Elihu argues God governs the entire earth impartially and owes no explanation to any creature."],

  // Ch 35: Elihu — human sin does not affect God
  ['JOB', 35, 'sovereignty', 'primary', "Elihu contends that human wickedness and righteousness affect fellow mortals, not the transcendent God."],
  ['JOB', 35, 'wisdom', 'secondary', "Elihu warns that the proud cry out for help yet receive no answer because they do not seek God himself."],

  // Ch 36: Elihu — God is mighty and does not despise anyone
  ['JOB', 36, 'sovereignty', 'primary', "Elihu proclaims God's mighty power and purpose in using affliction to open the ears of the oppressed."],
  ['JOB', 36, 'humility', 'secondary', "Elihu warns Job against turning to evil and urges him to exalt God's work rather than question it."],

  // Ch 37: Elihu — the majesty of God in storms
  ['JOB', 37, 'sovereignty', 'primary', "Elihu describes thunder, lightning, and ice as God's handiwork, preparing the stage for the divine whirlwind."],
  ['JOB', 37, 'humility', 'secondary', "Elihu asks Job whether he can command clouds or spread out the skies, pressing the gulf between creature and Creator."],

  // Ch 39: God continues — wild animals beyond human control
  ['JOB', 39, 'creation', 'primary', "God catalogues the mountain goat, wild donkey, ox, ostrich, horse, and hawk, none of which answer to Job."],
  ['JOB', 39, 'sovereignty', 'secondary', "Each creature embodies a wildness that humbles human pretension to mastery over the natural order."],

  // Ch 40: God challenges Job; Behemoth
  ['JOB', 40, 'sovereignty', 'primary', "God asks whether Job would condemn the Almighty to justify himself, then describes Behemoth's unstoppable strength."],
  ['JOB', 40, 'humility', 'secondary', "Job puts his hand over his mouth, admitting he spoke of things he did not understand."],

  // Ch 41: God — Leviathan, the untameable
  ['JOB', 41, 'creation', 'primary', "God devotes an entire chapter to Leviathan's terrifying splendor, a creature no human can hook or subdue."],
  ['JOB', 41, 'sovereignty', 'secondary', "Leviathan demonstrates that chaos itself is God's creature, subject to the Creator who alone is fearless."],


  // ═══════════════════════════════════════════════════════════════════════════
  //  PSALMS — 135 missing chapters, 1 theme each
  // ═══════════════════════════════════════════════════════════════════════════

  // ── Lament psalms ─────────────────────────────────────────────────────────
  ['PSA',  3, 'trust',    'primary', "David trusts God as his shield even when thousands rise against him after Absalom's revolt."],
  ['PSA',  4, 'trust',    'primary', "An evening prayer of confidence that God alone makes the psalmist dwell in safety."],
  ['PSA',  5, 'prayer',   'primary', "A morning petition asking God to lead in righteousness amid deceitful enemies."],
  ['PSA',  6, 'repentance','primary', "A penitential cry from one shaken to the bones, begging God for mercy in severe distress."],
  ['PSA',  7, 'justice',  'primary', "The psalmist appeals to God as righteous judge to vindicate him against false accusation."],
  ['PSA',  9, 'justice',  'primary', "A thanksgiving for God's righteous judgments that uphold the oppressed and rebuke the nations."],
  ['PSA', 10, 'lament',   'primary', "A cry against the arrogant wicked who prey on the helpless while God seems far off."],
  ['PSA', 11, 'trust',    'primary', "The psalmist refuses to flee, trusting that the LORD in his holy temple tests the righteous."],
  ['PSA', 12, 'prayer',   'primary', "A plea for God to act when the faithful have vanished and flattering lips dominate."],
  ['PSA', 14, 'sin',      'primary', "The fool denies God and all humanity turns aside; none does good, not even one."],
  ['PSA', 15, 'obedience','primary', "A torah-entrance liturgy listing the moral qualifications of those who dwell on God's holy hill."],
  ['PSA', 16, 'trust',    'primary', "David finds fullness of joy in God's presence, trusting he will not be abandoned to the grave."],
  ['PSA', 17, 'prayer',   'primary', "A prayer for vindication from one who has walked with integrity and seeks refuge under God's wings."],
  ['PSA', 18, 'gratitude','primary', "A royal thanksgiving for deliverance in battle, celebrating God as rock, fortress, and deliverer."],
  ['PSA', 19, 'creation', 'primary', "The heavens declare God's glory by day and night, and his torah revives the soul."],
  ['PSA', 20, 'trust',    'primary', "A communal prayer for the king's victory, trusting in the name of the LORD rather than chariots."],
  ['PSA', 21, 'gratitude','primary', "The congregation celebrates the king's joy in God's strength and the blessings of answered prayer."],
  ['PSA', 24, 'worship',  'primary', "A processional liturgy welcoming the King of glory through the ancient gates into his holy place."],
  ['PSA', 25, 'trust',    'primary', "An acrostic prayer for guidance and forgiveness, trusting that God leads the humble in his paths."],
  ['PSA', 26, 'obedience','primary', "The psalmist invites God to test his heart, declaring he has walked in integrity and faithfulness."],
  ['PSA', 27, 'trust',    'primary', "The psalmist seeks one thing: to dwell in God's house, confident that the LORD is his light and salvation."],
  ['PSA', 28, 'prayer',   'primary', "A plea not to be dragged away with the wicked, turning to praise when God hears the cry."],
  ['PSA', 29, 'worship',  'primary', "The voice of the LORD thunders over the waters, stripping forests bare while the temple cries glory."],
  ['PSA', 30, 'gratitude','primary', "A thanksgiving for healing that turned mourning into dancing and weeping into morning joy."],
  ['PSA', 31, 'trust',    'primary', "The psalmist commits his spirit into God's hands, trusting the LORD to redeem a life under siege."],
  ['PSA', 32, 'forgiveness','primary', "A penitential psalm celebrating the blessedness of those whose transgression is forgiven and sin covered."],
  ['PSA', 33, 'sovereignty','primary', "A hymn praising the LORD whose word created the heavens and whose plans stand firm forever."],
  ['PSA', 34, 'gratitude','primary', "David blesses the LORD who delivered him from all his fears and invites the humble to taste God's goodness."],
  ['PSA', 35, 'lament',   'primary', "A plea for God to contend with those who contend against the psalmist without cause."],
  ['PSA', 36, 'love',     'primary', "The steadfast love of the LORD extends to the heavens; in his light the righteous see light."],
  ['PSA', 37, 'wisdom',   'primary', "An acrostic wisdom psalm urging trust in God and patience, for the meek will inherit the land."],
  ['PSA', 38, 'repentance','primary', "A penitential psalm of one crushed by sin's burden, with no soundness in the flesh and friends standing afar."],
  ['PSA', 39, 'lament',   'primary', "The psalmist resolves to guard his tongue, then breaks silence to ask God the measure of his fleeting days."],
  ['PSA', 40, 'gratitude','primary', "God lifted the psalmist from a slimy pit and set his feet on rock, putting a new song in his mouth."],
  ['PSA', 41, 'trust',    'primary', "A psalm of confidence that God sustains the one who considers the poor, even when betrayed by a close friend."],
  ['PSA', 42, 'lament',   'primary', "As the deer pants for streams of water, the psalmist's soul thirsts for the living God amid taunts and tears."],
  ['PSA', 43, 'prayer',   'primary', "The psalmist pleads for God's light and truth to guide him back to the holy hill and altar of joy."],
  ['PSA', 44, 'lament',   'primary', "The nation protests that God has rejected them despite their faithfulness, selling them for a pittance."],
  ['PSA', 45, 'worship',  'primary', "A royal wedding psalm celebrating the king's splendor and the bride's beauty in a procession of joy."],
  ['PSA', 46, 'trust',    'primary', "God is refuge and strength; though the earth gives way and mountains fall into the sea, he will not be shaken."],
  ['PSA', 47, 'sovereignty','primary', "A shout of triumph as God ascends his throne, king over all the earth and all the nations."],
  ['PSA', 48, 'worship',  'primary', "Zion is celebrated as the joy of the whole earth, the city of the great King whose love endures."],
  ['PSA', 49, 'wisdom',   'primary', "A wisdom meditation on death as the great equalizer: no one can ransom another's life, wealth cannot buy immortality."],
  ['PSA', 50, 'worship',  'primary', "God summons the earth and judges his people, demanding thankful hearts rather than empty ritual sacrifice."],
  ['PSA', 52, 'justice',  'primary', "The psalmist contrasts the scheming tongue of the wicked with the righteous who trust in God's steadfast love."],
  ['PSA', 53, 'sin',      'primary', "A restatement of the universal corruption of humanity: the fool says there is no God and all have turned aside."],
  ['PSA', 54, 'prayer',   'primary', "David pleads for God's saving help when strangers rise against him and ruthless men seek his life."],
  ['PSA', 55, 'lament',   'primary', "The psalmist wishes for wings like a dove to fly from the violence of a city and the betrayal of a close companion."],
  ['PSA', 56, 'trust',    'primary', "When afraid, the psalmist puts his trust in God, whose word he praises, knowing that God counts his tears."],
  ['PSA', 57, 'prayer',   'primary', "David cries to God from a cave, taking refuge under the shadow of his wings until destruction passes."],
  ['PSA', 58, 'justice',  'primary', "A protest against unjust rulers whose venom is like that of a deaf cobra refusing to be charmed."],
  ['PSA', 59, 'prayer',   'primary', "David asks God to deliver him from enemies who howl like dogs prowling the city at night."],
  ['PSA', 60, 'lament',   'primary', "After military defeat, the nation cries out that God has rejected them and asks him to restore them."],
  ['PSA', 61, 'prayer',   'primary', "From the end of the earth the psalmist cries for God to lead him to the rock that is higher."],
  ['PSA', 62, 'trust',    'primary', "The psalmist's soul finds rest in God alone; power belongs to God and steadfast love is his."],
  ['PSA', 63, 'worship',  'primary', "In a dry and weary land the psalmist's soul thirsts for God, finding his love better than life."],
  ['PSA', 64, 'prayer',   'primary', "A plea for protection from secret plots, trusting that God will turn the schemers' arrows back on them."],
  ['PSA', 65, 'gratitude','primary', "A harvest hymn praising God who crowns the year with bounty and waters the furrows of the earth."],
  ['PSA', 66, 'worship',  'primary', "A call for all the earth to shout to God, recounting his awesome deeds and faithfulness to his people."],
  ['PSA', 67, 'worship',  'primary', "A prayer that God's saving power be known among all nations so all peoples praise him."],
  ['PSA', 68, 'sovereignty','primary', "God arises and scatters his enemies; he rides through the deserts and leads captives in triumphal procession."],
  ['PSA', 69, 'lament',   'primary', "The psalmist sinks in deep waters, enduring reproach and isolation while pleading for God's rescue."],
  ['PSA', 70, 'prayer',   'primary', "An urgent short plea for God to hasten to help, echoing the close of Psalm 40."],
  ['PSA', 71, 'trust',    'primary', "An elderly psalmist pleads not to be cast off in old age, recounting lifelong trust since the womb."],
  ['PSA', 72, 'justice',  'primary', "A royal psalm praying that the king judge the poor with righteousness and bring peace to the mountains."],
  ['PSA', 74, 'lament',   'primary', "A communal lament over the destruction of the sanctuary, asking God why he has rejected his people forever."],
  ['PSA', 75, 'sovereignty','primary', "God declares he will judge with equity; the earth trembles but he holds its pillars firm."],
  ['PSA', 76, 'sovereignty','primary', "God is resplendent in Zion, breaking the flashing arrows and shields of war, feared by the kings of the earth."],
  ['PSA', 77, 'lament',   'primary', "The psalmist cries aloud at night, questioning whether God's steadfast love has ceased, then recalls his ancient deeds."],
  ['PSA', 78, 'wisdom',   'primary', "A lengthy didactic psalm recounting Israel's history from the exodus to David, teaching the next generation God's faithfulness."],
  ['PSA', 79, 'lament',   'primary', "A communal cry after Jerusalem's fall, with the dead unburied and God's people a reproach to their neighbors."],
  ['PSA', 80, 'prayer',   'primary', "Israel begs the Shepherd of Israel to restore them, repeating the refrain: let your face shine that we may be saved."],
  ['PSA', 81, 'obedience','primary', "God laments that his people did not listen; if only Israel would walk in his ways he would subdue their foes."],
  ['PSA', 82, 'justice',  'primary', "God takes his stand in the divine council and rebukes the gods for failing to defend the weak and fatherless."],
  ['PSA', 83, 'prayer',   'primary', "Asaph pleads for God to act against a coalition of nations conspiring to wipe out Israel's name."],
  ['PSA', 84, 'worship',  'primary', "The psalmist's soul longs and faints for the courts of the LORD; a single day there surpasses a thousand elsewhere."],
  ['PSA', 85, 'hope',     'primary', "A prayer for national restoration where steadfast love and faithfulness meet, righteousness and peace kiss."],
  ['PSA', 86, 'prayer',   'primary', "David asks for mercy and a united heart to fear God's name, confessing God is great and abounding in love."],
  ['PSA', 87, 'worship',  'primary', "Zion is praised as the city where all peoples are born, the spiritual mother of every nation."],
  ['PSA', 89, 'lament',   'primary', "A lament over the apparent failure of the Davidic covenant, asking how long God will hide his face."],
  ['PSA', 91, 'trust',    'primary', "Whoever dwells in the shelter of the Most High rests under the Almighty's shadow, guarded from plague and terror."],
  ['PSA', 92, 'gratitude','primary', "A sabbath song declaring it is good to give thanks and proclaim God's love in the morning and faithfulness at night."],

  // ── Enthronement psalms (93-99) — sovereignty, worship ───────────────────
  ['PSA', 93, 'sovereignty','primary', "The LORD reigns, robed in majesty; the world is established, firm, and the throne stands from of old."],
  ['PSA', 94, 'justice',  'primary', "The psalmist calls on the God of vengeance to rise and repay the proud who crush God's people."],
  ['PSA', 95, 'worship',  'primary', "A call to kneel before the LORD our maker, with a warning not to harden hearts as at Meribah."],
  ['PSA', 96, 'worship',  'primary', "A new song for all the earth declaring God's glory among the nations and his coming to judge in righteousness."],
  ['PSA', 97, 'sovereignty','primary', "The LORD reigns; clouds and darkness surround him, fire goes before him, and the earth trembles."],
  ['PSA', 98, 'worship',  'primary', "A new song for God's marvelous deeds; rivers clap hands and mountains sing as the LORD comes to judge."],
  ['PSA', 99, 'sovereignty','primary', "The LORD reigns enthroned between the cherubim; he is holy and exalted above all peoples."],

  ['PSA',100, 'worship',  'primary', "A shout of joy for all the earth: enter his gates with thanksgiving, for his love endures forever."],
  ['PSA',101, 'obedience','primary', "David vows to lead a blameless life, banishing the faithless and silencing slanderers in his house."],
  ['PSA',102, 'repentance','primary', "A penitential prayer from one afflicted and wasting away, contrasting human frailty with God's eternal throne."],
  ['PSA',104, 'creation', 'primary', "A majestic hymn surveying the whole created order from light and clouds to sea creatures and seasons."],
  ['PSA',105, 'gratitude','primary', "A recital of God's saving acts from Abraham through Joseph to the exodus, celebrating covenant faithfulness."],
  ['PSA',106, 'sin',      'primary', "A confession tracing Israel's repeated rebellion from the Red Sea to the exile, yet God remembered his covenant."],
  ['PSA',107, 'gratitude','primary', "Four portraits of those redeemed by God — lost wanderers, prisoners, the sick, and storm-tossed sailors — all give thanks."],
  ['PSA',108, 'trust',    'primary', "David's heart is steadfast; he praises God among the nations and trusts in divine help over human aid."],
  ['PSA',109, 'lament',   'primary', "A sharp imprecatory prayer against a lying accuser, appealing for God's judgment on relentless deceit."],
  ['PSA',110, 'sovereignty','primary', "The LORD says to the king: sit at my right hand until I make your enemies a footstool, a priest forever."],
  ['PSA',111, 'gratitude','primary', "An acrostic hymn praising God's works, his provision, and his covenant faithfulness in the assembly."],
  ['PSA',112, 'obedience','primary', "An acrostic portrait of the blessed person who fears the LORD, generous, just, and unshaken by evil news."],
  ['PSA',113, 'worship',  'primary', "Praise the LORD from the rising to the setting of the sun; he raises the poor from the dust."],
  ['PSA',114, 'sovereignty','primary', "At the exodus the sea fled and the mountains skipped like rams before the God of Jacob."],
  ['PSA',115, 'trust',    'primary', "Not to us but to your name give glory; idols have mouths but cannot speak, but we trust in the LORD."],
  ['PSA',116, 'gratitude','primary', "The psalmist loves the LORD who heard his cry and freed him from death; he lifts the cup of salvation."],
  ['PSA',117, 'worship',  'primary', "The shortest psalm calls all nations to praise the LORD for his great steadfast love and enduring faithfulness."],
  ['PSA',118, 'gratitude','primary', "A processional thanksgiving declaring the stone the builders rejected has become the cornerstone; this is the LORD's doing."],

  // ── Pilgrimage psalms (120-134) — pilgrimage, worship, community, peace ──
  ['PSA',120, 'lament',   'primary', "A pilgrim cries to the LORD from among hostile peoples whose lying tongues are like warrior's arrows."],
  ['PSA',121, 'trust',    'primary', "The pilgrim lifts eyes to the hills; help comes from the LORD who neither slumbers nor sleeps."],
  ['PSA',122, 'worship',  'primary', "The pilgrim rejoices at the call to go to the house of the LORD and prays for Jerusalem's peace."],
  ['PSA',123, 'prayer',   'primary', "Pilgrims lift their eyes to God as servants look to their master's hand, pleading for mercy amid contempt."],
  ['PSA',124, 'gratitude','primary', "If the LORD had not been on our side, the flood would have swept us away, the snare would have trapped us."],
  ['PSA',125, 'trust',    'primary', "Those who trust in the LORD are like Mount Zion — immovable, surrounded by God's protective presence."],
  ['PSA',126, 'hope',     'primary', "When the LORD restored Zion's fortunes the pilgrims were like dreamers; those who sow in tears reap in joy."],
  ['PSA',127, 'trust',    'primary', "Unless the LORD builds the house, the builders labor in vain; children are a heritage from him."],
  ['PSA',128, 'worship',  'primary', "A blessing on those who fear the LORD: the family table set, the vine fruitful, peace upon Israel."],
  ['PSA',129, 'hope',     'primary', "Israel recounts oppression endured since youth yet declares the LORD has cut the cords of the wicked."],
  ['PSA',130, 'repentance','primary', "Out of the depths the psalmist cries to God, waiting for the LORD more than watchmen wait for the morning."],
  ['PSA',131, 'trust',    'primary', "A brief psalm of childlike humility: the psalmist has calmed and quieted his soul like a weaned child."],
  ['PSA',132, 'worship',  'primary', "A pilgrimage hymn recalling David's oath to find a dwelling place for God and God's choice of Zion."],
  ['PSA',133, 'community','primary', "How good and pleasant it is when brothers dwell together in unity, like precious oil and Hermon's dew."],
  ['PSA',134, 'worship',  'primary', "The final pilgrimage psalm: a nighttime blessing exchanged between worshipers and the LORD who made heaven and earth."],

  ['PSA',135, 'worship',  'primary', "A call to praise the LORD who chose Israel and is greater than all gods, with power over nature and nations."],
  ['PSA',136, 'gratitude','primary', "The great hallel with its twenty-six-fold refrain: his steadfast love endures forever, spanning creation to exodus to conquest."],
  ['PSA',138, 'gratitude','primary', "David gives thanks with his whole heart; when he called, God answered and made him bold with strength in his soul."],
  ['PSA',140, 'prayer',   'primary', "David asks God to guard him from violent men who sharpen their tongues like serpents and set hidden traps."],
  ['PSA',141, 'prayer',   'primary', "An evening prayer asking God to set a guard over the psalmist's mouth and keep his heart from evil."],
  ['PSA',142, 'lament',   'primary', "David cries to God from a cave when no one cares for his life, asking God to be his refuge."],
  ['PSA',143, 'repentance','primary', "A penitential plea for God's faithfulness, acknowledging that no living person is righteous before him."],
  ['PSA',144, 'trust',    'primary', "David praises God who trains his hands for battle and delivers him, praying for the nation's prosperity."],

  // ── Final Hallel psalms (146-150) — praise, worship, joy ─────────────────
  ['PSA',146, 'worship',  'primary', "The psalmist resolves to praise God all his life, trusting the LORD who upholds the oppressed and feeds the hungry."],
  ['PSA',147, 'creation', 'primary', "God heals the brokenhearted, counts the stars, and covers the sky with clouds; praise him for snow and wind."],
  ['PSA',148, 'creation', 'primary', "All creation is summoned to praise: sun, moon, stars, sea creatures, mountains, trees, beasts, and all peoples."],
  ['PSA',149, 'worship',  'primary', "A new song of praise: Israel rejoices in its maker and the faithful exult in glory with a two-edged sword."],
  ['PSA',150, 'worship',  'primary', "The Psalter's grand finale: praise God with trumpet, harp, tambourine, strings, pipe, and clashing cymbals."],
];

// ─── Insert ──────────────────────────────────────────────────────────────────
const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, 1, ?, ?, ?, 'ai_assisted')
`);

const insertAll = db.transaction((data) => {
  let inserted = 0;
  let skipped = 0;
  for (const [bookId, chapter, themeId, relevance, contextNote] of data) {
    const key = `${bookId}:${chapter}`;
    if (existing.has(key)) {
      // Don't skip — existing chapters had narrative-unit-level themes,
      // but these are chapter-level gap fills. However, guard against
      // exact duplicates on (theme_id, book_id, chapter, verse_start).
      const dup = db.prepare(`
        SELECT 1 FROM passage_themes
        WHERE theme_id = ? AND book_id = ? AND chapter = ? AND verse_start = 1
      `).get(themeId, bookId, chapter);
      if (dup) { skipped++; continue; }
    }
    const verseEnd = (verseCounts[bookId] && verseCounts[bookId][chapter]) || null;
    insert.run(themeId, bookId, chapter, verseEnd, relevance, contextNote);
    inserted++;
  }
  return { inserted, skipped };
});

const { inserted, skipped } = insertAll(rows);
console.log(`Inserted ${inserted} passage_themes rows (${skipped} duplicates skipped).`);

// ─── Verify ──────────────────────────────────────────────────────────────────
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) AS cnt
  FROM passage_themes WHERE book_id IN ('JOB','PSA') AND source_tier = 'ai_assisted'
  GROUP BY book_id
`).all();
console.log('New ai_assisted rows by book:', JSON.stringify(byBook));

const totalJob = db.prepare(`SELECT COUNT(DISTINCT chapter) AS c FROM passage_themes WHERE book_id='JOB'`).get();
const totalPsa = db.prepare(`SELECT COUNT(DISTINCT chapter) AS c FROM passage_themes WHERE book_id='PSA'`).get();
console.log(`JOB chapters covered: ${totalJob.c}/42`);
console.log(`PSA chapters covered: ${totalPsa.c}/150`);

db.close();
console.log('Done.');
