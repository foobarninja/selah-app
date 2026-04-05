/**
 * Insert passage_climate rows for 200 missing Wisdom-literature chapters.
 *
 * Missing chapters:
 *   JOB: 2,5,6,7,10,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30,31,33,34,35,36,37,39,40,41  (31 ch)
 *   PSA: 3-7,9-12,14-21,24-50,52-72,74-87,89,91-102,104-118,120-136,138,140-144,146-150             (135 ch)
 *   PRO: 2,3,4,5,7,8,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,28,29,30                         (24 ch)
 *   ECC: 2,6,7,8,10,11                                                                               (6 ch)
 *   SNG: 2,5,6,7                                                                                     (4 ch)
 *
 * Climate context IDs:
 *   JOB -> patriarchal  |  PSA, PRO, ECC, SNG -> united-monarchy
 *
 * 1 row per chapter.  verse_start = 1, verse_end = NULL.
 * source_tier = 'ai_assisted'.
 */

const Database = require('better-sqlite3');
const db = new Database('data/selah.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Guard: skip chapters that already have passage_climate rows ─────────────
const existing = new Set();
db.prepare(`
  SELECT DISTINCT book_id, chapter FROM passage_climate
  WHERE book_id IN ('JOB','PSA','PRO','ECC','SNG')
`).all().forEach(r => existing.add(`${r.book_id}:${r.chapter}`));

// ─── Data: [book_id, chapter, context_id, context_note] ─────────────────────
const rows = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  JOB — 31 missing chapters  (context: patriarchal)
  //  Notes vary by dialogue section
  // ═══════════════════════════════════════════════════════════════════════════

  // Ch 2 — Prologue continued: Satan strikes Job's body
  ['JOB', 2, 'patriarchal', 'The ash heap where Job sits among friends who have traveled to comfort him but will instead accuse him.'],

  // Ch 5 — Eliphaz first speech continued
  ['JOB', 5, 'patriarchal', 'The communal gathering place where a respected elder lectures a suffering man using ancestral proverbs passed down by oral tradition.'],

  // Ch 6 — Job replies: anguish justified
  ['JOB', 6, 'patriarchal', 'The ash heap where Job defends his outcry, comparing his friends to seasonal wadis that vanish when the desert heat makes water most needed.'],

  // Ch 7 — Job: life is fleeting misery
  ['JOB', 7, 'patriarchal', 'The sleepless nights of a man covered in sores, tossing on a mat in a world without medicine or relief from the desert heat.'],

  // Ch 10 — Job's plea to God
  ['JOB', 10, 'patriarchal', 'The ash heap where a patriarch who once judged at the city gate now sits in refuse, pleading with the God who shaped him from clay.'],

  // Ch 12 — Job replies to Zophar: God's inscrutable power
  ['JOB', 12, 'patriarchal', 'A debate circle in the open air where Job points to the natural world around them — beasts, birds, fish — as witnesses that God overturns all human order.'],

  // Ch 13 — Job: I will argue my case before God
  ['JOB', 13, 'patriarchal', 'The ash heap transformed into a courtroom in Job\'s imagination, where he demands the right to present his case as a free man before the divine judge.'],

  // Ch 14 — Job: mortals born to trouble
  ['JOB', 14, 'patriarchal', 'A world where the brevity of life is visible daily — cut flowers wilting in the heat, seasonal streams drying to bare rock, graves dug in stony ground.'],

  // Ch 15 — Eliphaz second speech: sharper rebuke
  ['JOB', 15, 'patriarchal', 'The elder circle where Eliphaz escalates his rhetoric, invoking the authority of ancestral wisdom traditions in a patriarchal society that reveres the words of the fathers.'],

  // Ch 16 — Job: miserable comforters
  ['JOB', 16, 'patriarchal', 'The ash heap where Job sits as a broken man, using the violent imagery of an attacker to describe what God has done to his body and reputation.'],

  // Ch 17 — Job: my spirit is broken
  ['JOB', 17, 'patriarchal', 'A dying man on the ash heap at the edge of the settlement, socially exiled and looking toward the grave as his only remaining house.'],

  // Ch 18 — Bildad second speech: fate of the wicked
  ['JOB', 18, 'patriarchal', 'The debate circle where Bildad paints the wicked man\'s destruction using images drawn from desert life — snares, pitfalls, tents torn down, roots dried up.'],

  // Ch 19 — Job: I know my redeemer lives
  ['JOB', 19, 'patriarchal', 'The ash heap where a man stripped of every social bond in a kinship-based society — family, servants, friends — makes his boldest declaration of faith.'],

  // Ch 20 — Zophar second speech: the wicked's triumph is short
  ['JOB', 20, 'patriarchal', 'The debate circle where Zophar insists the prosperity of the wicked is as temporary as a dream, drawing on images of feasting that turns to poison.'],

  // Ch 21 — Job: why do the wicked prosper?
  ['JOB', 21, 'patriarchal', 'The ash heap where Job challenges retribution theology by pointing to wealthy, comfortable elders in the surrounding patriarchal settlements who never suffer.'],

  // Ch 22 — Eliphaz third speech: accuses Job of specific sins
  ['JOB', 22, 'patriarchal', 'The debate circle where Eliphaz fabricates charges — withholding water, refusing bread to the hungry — crimes of hospitality violation that were among the gravest offenses in patriarchal culture.'],

  // Ch 23 — Job: if only I could find God
  ['JOB', 23, 'patriarchal', 'The vast, empty landscape of the ancient Near East where Job searches east, west, north, and south for a God who remains hidden behind the horizonless terrain.'],

  // Ch 24 — Job: why does God ignore injustice?
  ['JOB', 24, 'patriarchal', 'The agrarian margins where the poor glean in fields, carry sheaves while hungry, and press oil for landowners — economic exploitation visible in every patriarchal settlement.'],

  // Ch 25 — Bildad's brief third speech: man is a maggot
  ['JOB', 25, 'patriarchal', 'The debate circle reduced to a six-verse dismissal, as Bildad\'s arguments collapse into raw assertions about human worthlessness under the desert stars.'],

  // Ch 26 — Job: God's power beyond comprehension
  ['JOB', 26, 'patriarchal', 'The open sky above the ash heap where Job describes God hanging the earth over nothing and stretching the northern heavens — cosmology drawn from naked-eye observation of the ancient night sky.'],

  // Ch 27 — Job: I will not deny my integrity
  ['JOB', 27, 'patriarchal', 'The ash heap where Job swears an oath by the living God — the most binding legal act in patriarchal culture — that he will never concede false guilt.'],

  // Ch 30 — Job: my days of honor are gone
  ['JOB', 30, 'patriarchal', 'The ash heap where Job contrasts his former status — elders standing in respect, young men stepping aside — with his current degradation among outcasts and scavengers at the settlement\'s edge.'],

  // Ch 31 — Job's final oath of innocence
  ['JOB', 31, 'patriarchal', 'The ash heap transformed into a witness stand as Job swears a comprehensive oath of innocence covering every domain of patriarchal ethics — land, women, servants, the poor, wealth, and worship.'],

  // Ch 33 — Elihu's first speech: God does speak
  ['JOB', 33, 'patriarchal', 'The debate circle where a younger man breaks the age-hierarchy of patriarchal protocol to challenge both Job and the three elders, claiming God speaks through dreams and suffering.'],

  // Ch 34 — Elihu: God cannot be unjust
  ['JOB', 34, 'patriarchal', 'The open-air assembly where Elihu appeals to the gathered community, arguing that the God who governs the entire earth cannot pervert justice for one man.'],

  // Ch 35 — Elihu: your sin doesn't affect God
  ['JOB', 35, 'patriarchal', 'The debate circle under the wide sky where Elihu tells Job to look up at the clouds far above — God is too exalted for human righteousness or wickedness to reach him.'],

  // Ch 36 — Elihu: God is mighty and uses suffering to instruct
  ['JOB', 36, 'patriarchal', 'The landscape where Elihu draws from the storm clouds gathering on the horizon, describing God\'s instruction through affliction as a rescue, not a punishment.'],

  // Ch 37 — Elihu: the approaching storm reveals God
  ['JOB', 37, 'patriarchal', 'The open desert where Elihu points to the thunderstorm rolling in — lightning, ice, whirlwind — as God\'s power made visible moments before the LORD speaks from that very storm.'],

  // Ch 39 — God continues: the wild animals
  ['JOB', 39, 'patriarchal', 'The wild terrain beyond the settlement where mountain goats give birth unseen, wild donkeys roam the salt flats, and the ostrich outruns the horse — God\'s untameable creation.'],

  // Ch 40 — God: will you condemn me to justify yourself?
  ['JOB', 40, 'patriarchal', 'The storm where God challenges Job to consider Behemoth — a massive creature at ease in the marshlands, with bones like bronze tubes, unthreatened by the flooding Jordan.'],

  // Ch 41 — God: Leviathan, beyond all human mastery
  ['JOB', 41, 'patriarchal', 'The storm where God describes Leviathan — a terrifying sea creature no human can hook, bind, or subdue — the ultimate symbol of forces beyond patriarchal control.'],

  // ═══════════════════════════════════════════════════════════════════════════
  //  PSALMS — 135 missing chapters  (context: united-monarchy)
  //  Brief context notes keyed to psalm type / content
  // ═══════════════════════════════════════════════════════════════════════════

  // Psa 3 — Fleeing Absalom
  ['PSA', 3, 'united-monarchy', 'Composed during David\'s flight from Absalom, when the king fled Jerusalem barefoot across the Kidron Valley.'],
  // Psa 4 — Evening prayer
  ['PSA', 4, 'united-monarchy', 'An evening prayer from the royal court of Jerusalem where the king entrusts his safety to God at nightfall.'],
  // Psa 5 — Morning prayer
  ['PSA', 5, 'united-monarchy', 'A morning prayer offered at the sanctuary as the king prepares to face enemies and deceitful courtiers.'],
  // Psa 6 — Prayer in distress
  ['PSA', 6, 'united-monarchy', 'A king\'s plea from his sickbed in the palace, weeping through the night and begging God for healing.'],
  // Psa 7 — Plea for vindication
  ['PSA', 7, 'united-monarchy', 'A plea for divine judgment against a false accuser, set in the context of tribal rivalries surrounding the throne.'],
  // Psa 9 — Thanksgiving for justice
  ['PSA', 9, 'united-monarchy', 'A thanksgiving hymn celebrating God\'s defeat of enemy nations from the throne room in Jerusalem.'],
  // Psa 10 — Why do the wicked prosper?
  ['PSA', 10, 'united-monarchy', 'A lament over the arrogant who prey on the poor in the streets and marketplaces of the capital city.'],
  // Psa 11 — The LORD tests the righteous
  ['PSA', 11, 'united-monarchy', 'A declaration of trust when advisors urge the king to flee like a bird to the mountain strongholds.'],
  // Psa 12 — Faithful people vanish
  ['PSA', 12, 'united-monarchy', 'A lament over the collapse of honest speech in a royal court riddled with flattery and double-talk.'],
  // Psa 14 — The fool says there is no God
  ['PSA', 14, 'united-monarchy', 'A wisdom psalm surveying the moral corruption visible from the vantage point of Jerusalem\'s throne.'],
  // Psa 15 — Who may dwell on your holy hill?
  ['PSA', 15, 'united-monarchy', 'An entrance liturgy recited at the gates of the Jerusalem sanctuary before worshippers ascend the temple mount.'],
  // Psa 16 — Preserve me, O God
  ['PSA', 16, 'united-monarchy', 'A song of trust composed in the royal court where the king chooses the LORD over rival deities worshipped in surrounding nations.'],
  // Psa 17 — Hear my righteous plea
  ['PSA', 17, 'united-monarchy', 'A night prayer from the king who asks God to guard him as the apple of his eye while enemies circle the palace.'],
  // Psa 18 — Victory song of David
  ['PSA', 18, 'united-monarchy', 'A royal victory hymn celebrating deliverance from Saul and all enemies, sung in the Jerusalem court.'],
  // Psa 19 — The heavens declare God's glory
  ['PSA', 19, 'united-monarchy', 'A creation hymn composed under the clear skies of the Judean highlands where the sun\'s circuit is visible from horizon to horizon.'],
  // Psa 20 — May the LORD answer you in trouble
  ['PSA', 20, 'united-monarchy', 'A pre-battle liturgy recited at the sanctuary as the king prepares to lead Israel\'s army into the field.'],
  // Psa 21 — The king rejoices in God's strength
  ['PSA', 21, 'united-monarchy', 'A royal psalm celebrating the king\'s coronation blessings and military victories granted by God.'],
  // Psa 24 — Lift up your heads, O gates
  ['PSA', 24, 'united-monarchy', 'A processional liturgy sung as the ark of the covenant was carried through the gates of Jerusalem into the sanctuary.'],
  // Psa 25 — To you, O LORD, I lift my soul
  ['PSA', 25, 'united-monarchy', 'An acrostic prayer for guidance and forgiveness offered by the king in the Jerusalem sanctuary.'],
  // Psa 26 — Vindicate me, O LORD
  ['PSA', 26, 'united-monarchy', 'A declaration of integrity from a worshipper who washes his hands before processing around the altar in the sanctuary.'],
  // Psa 27 — The LORD is my light
  ['PSA', 27, 'united-monarchy', 'A song of trust from the king who desires one thing above all — to dwell in the house of the LORD in Jerusalem.'],
  // Psa 28 — To you, O LORD, I call
  ['PSA', 28, 'united-monarchy', 'A plea directed toward the inner sanctuary where the king lifts his hands toward the holy of holies.'],
  // Psa 29 — The voice of the LORD
  ['PSA', 29, 'united-monarchy', 'A hymn to God\'s thundering voice, composed in a land where violent storms over the Lebanon mountains displayed raw divine power.'],
  // Psa 30 — Joy comes in the morning
  ['PSA', 30, 'united-monarchy', 'A thanksgiving psalm for healing, possibly connected to the dedication of the temple site on the threshing floor of Araunah.'],
  // Psa 31 — In you, O LORD, I take refuge
  ['PSA', 31, 'united-monarchy', 'A lament from a besieged king who commits his spirit to God while enemies plot in the streets of the capital.'],
  // Psa 32 — Blessed is the one whose sin is forgiven
  ['PSA', 32, 'united-monarchy', 'A penitential psalm reflecting the physical and emotional toll of unconfessed sin in a culture where guilt manifested as bodily illness.'],
  // Psa 33 — Sing joyfully to the LORD
  ['PSA', 33, 'united-monarchy', 'A communal praise hymn sung with harp and ten-stringed lyre in the Jerusalem worship assembly.'],
  // Psa 34 — I will bless the LORD at all times
  ['PSA', 34, 'united-monarchy', 'An acrostic thanksgiving attributed to David after his escape from Abimelech, celebrating deliverance with a wisdom-teaching format.'],
  // Psa 35 — Contend, O LORD, with those who contend with me
  ['PSA', 35, 'united-monarchy', 'A lament against false witnesses and treacherous courtiers who repay kindness with legal accusations at the city gate.'],
  // Psa 36 — Transgression speaks to the wicked
  ['PSA', 36, 'united-monarchy', 'A wisdom psalm contrasting the self-deceived wicked with God\'s steadfast love that reaches to the heavens over Jerusalem.'],
  // Psa 37 — Do not fret because of evildoers
  ['PSA', 37, 'united-monarchy', 'An acrostic wisdom psalm counseling patience with the prosperity of the wicked in the agrarian economy of the united kingdom.'],
  // Psa 38 — O LORD, do not rebuke me in anger
  ['PSA', 38, 'united-monarchy', 'A penitential psalm describing festering wounds and social isolation in a society where illness was often interpreted as divine punishment.'],
  // Psa 39 — I will watch my ways
  ['PSA', 39, 'united-monarchy', 'A meditation on the brevity of life addressed to Jeduthun the temple musician, composed in the royal court of Jerusalem.'],
  // Psa 40 — I waited patiently for the LORD
  ['PSA', 40, 'united-monarchy', 'A thanksgiving-turned-lament recited in the great assembly at the Jerusalem sanctuary after deliverance from danger.'],
  // Psa 41 — Blessed is the one who considers the poor
  ['PSA', 41, 'united-monarchy', 'A royal psalm from a king\'s sickbed where even trusted friends who shared bread at the palace table have turned against him.'],
  // Psa 42 — As the deer pants for water
  ['PSA', 42, 'united-monarchy', 'A Levitical singer exiled from the Jerusalem temple, remembering festival processions while stranded near the Jordan headwaters at Mount Hermon.'],
  // Psa 43 — Send out your light and truth
  ['PSA', 43, 'united-monarchy', 'A continuation of the exiled singer\'s plea to return to God\'s altar on the holy hill of Jerusalem.'],
  // Psa 44 — We have heard with our ears, O God
  ['PSA', 44, 'united-monarchy', 'A national lament after military defeat, sung by the sons of Korah in the Jerusalem sanctuary.'],
  // Psa 45 — A royal wedding song
  ['PSA', 45, 'united-monarchy', 'A wedding psalm for the king, composed in the ivory-adorned palace where the bride arrives in gold-woven garments.'],
  // Psa 46 — God is our refuge and strength
  ['PSA', 46, 'united-monarchy', 'A song of Zion celebrating Jerusalem as an unshakeable city because of God\'s presence within its walls.'],
  // Psa 47 — Clap your hands, all peoples
  ['PSA', 47, 'united-monarchy', 'An enthronement psalm celebrating God as king over all nations, sung with shouts and trumpet blasts at the Jerusalem sanctuary.'],
  // Psa 48 — Great is the LORD in the city of our God
  ['PSA', 48, 'united-monarchy', 'A song of Zion praising the beauty and impregnability of Jerusalem\'s holy mountain where God dwells.'],
  // Psa 49 — Hear this, all peoples
  ['PSA', 49, 'united-monarchy', 'A wisdom psalm addressing rich and poor alike with the sobering truth that wealth cannot ransom anyone from death.'],
  // Psa 50 — The Mighty One summons the earth
  ['PSA', 50, 'united-monarchy', 'A prophetic psalm by Asaph depicting God summoning Israel to court from the perfection of Zion\'s beauty.'],
  // Psa 52 — Why do you boast of evil?
  ['PSA', 52, 'united-monarchy', 'A rebuke of Doeg the Edomite, the ruthless informant whose tongue destroyed the priestly city of Nob.'],
  // Psa 53 — The fool says there is no God
  ['PSA', 53, 'united-monarchy', 'A restatement of Psalm 14\'s indictment of moral corruption, set to the melody of Mahalath in the temple liturgy.'],
  // Psa 54 — Save me, O God, by your name
  ['PSA', 54, 'united-monarchy', 'A brief lament from David\'s time hiding in the wilderness of Ziph when the locals betrayed his location to Saul.'],
  // Psa 55 — Listen to my prayer, O God
  ['PSA', 55, 'united-monarchy', 'A lament over betrayal by a close companion who shared meals and walked to the house of God with the psalmist.'],
  // Psa 56 — Be gracious to me, O God
  ['PSA', 56, 'united-monarchy', 'A prayer from David\'s capture by the Philistines in Gath, trusting God while surrounded by hostile foreigners.'],
  // Psa 57 — Be merciful to me, O God
  ['PSA', 57, 'united-monarchy', 'A lament from the cave where David hid from Saul, finding shelter under God\'s wings in the darkness of En Gedi.'],
  // Psa 58 — Do the rulers judge justly?
  ['PSA', 58, 'united-monarchy', 'A rebuke of corrupt judges whose verdicts poison justice like cobra venom in the courts of the kingdom.'],
  // Psa 59 — Deliver me from my enemies
  ['PSA', 59, 'united-monarchy', 'A prayer from the night Saul sent soldiers to watch David\'s house, when assassins prowled the streets like dogs.'],
  // Psa 60 — You have rejected us, O God
  ['PSA', 60, 'united-monarchy', 'A national lament after military setback, recited when David fought Aram-Naharaim and Aram-Zobah on the northern frontier.'],
  // Psa 61 — Hear my cry, O God
  ['PSA', 61, 'united-monarchy', 'A prayer from a king far from Jerusalem who longs for the rock that is higher than he and the shelter of God\'s tent.'],
  // Psa 62 — Truly my soul rests in God
  ['PSA', 62, 'united-monarchy', 'A meditation on silent trust addressed to Jeduthun, composed amid palace intrigues where enemies plot to topple the king.'],
  // Psa 63 — O God, you are my God
  ['PSA', 63, 'united-monarchy', 'A prayer from the wilderness of Judah where David\'s parched body mirrors his soul\'s thirst for God\'s presence.'],
  // Psa 64 — Hear me, O God, as I complain
  ['PSA', 64, 'united-monarchy', 'A lament against conspirators who sharpen their tongues like swords and aim bitter words like arrows from ambush.'],
  // Psa 65 — Praise awaits you in Zion
  ['PSA', 65, 'united-monarchy', 'A harvest thanksgiving celebrating the rains that water the furrows and crown the year with abundance across Israel.'],
  // Psa 66 — Shout for joy to God, all the earth
  ['PSA', 66, 'united-monarchy', 'A communal thanksgiving psalm inviting the nations to witness how God brought Israel through fire and water to a place of abundance.'],
  // Psa 67 — May God be gracious to us
  ['PSA', 67, 'united-monarchy', 'A harvest blessing asking God to make his face shine so that all nations learn his saving power through Israel\'s prosperity.'],
  // Psa 68 — Let God arise, let his enemies be scattered
  ['PSA', 68, 'united-monarchy', 'A processional victory hymn celebrating God\'s march from Sinai to Zion, possibly sung as the ark entered Jerusalem.'],
  // Psa 69 — Save me, O God, for the waters have come up to my neck
  ['PSA', 69, 'united-monarchy', 'A lament from one sinking in deep mire, hated without cause, and mocked by those who sit in the city gate.'],
  // Psa 70 — Hasten, O God, to save me
  ['PSA', 70, 'united-monarchy', 'An urgent four-verse plea for swift deliverance, extracted from Psalm 40 for use as an independent cry in the liturgy.'],
  // Psa 71 — In you, O LORD, I take refuge
  ['PSA', 71, 'united-monarchy', 'An elderly worshipper\'s prayer in the Jerusalem sanctuary, pleading that God not forsake him in old age and gray hairs.'],
  // Psa 72 — Give the king your justice, O God
  ['PSA', 72, 'united-monarchy', 'A royal psalm praying that Solomon\'s reign brings justice to the poor and prosperity from the Euphrates to the ends of the earth.'],
  // Psa 74 — O God, why have you rejected us forever?
  ['PSA', 74, 'united-monarchy', 'A lament over the destruction of the sanctuary, recalling God\'s primordial victories over sea monsters and chaos.'],
  // Psa 75 — We give thanks, for your name is near
  ['PSA', 75, 'united-monarchy', 'A prophetic psalm by Asaph where God declares he will judge with equity when the appointed time comes.'],
  // Psa 76 — In Judah God is known
  ['PSA', 76, 'united-monarchy', 'A Zion hymn celebrating God\'s defeat of enemy warriors whose weapons lie shattered at the gates of Jerusalem.'],
  // Psa 77 — I cried out to God for help
  ['PSA', 77, 'united-monarchy', 'A night lament by Asaph addressed to Jeduthun, recalling God\'s ancient deeds when the waters of the Red Sea parted.'],
  // Psa 78 — Give ear, O my people
  ['PSA', 78, 'united-monarchy', 'A historical psalm by Asaph retelling Israel\'s story from Egypt to David\'s election as shepherd-king over God\'s people.'],
  // Psa 79 — O God, the nations have invaded
  ['PSA', 79, 'united-monarchy', 'A communal lament after foreign invasion, with the blood of God\'s servants poured out like water around Jerusalem.'],
  // Psa 80 — Hear us, Shepherd of Israel
  ['PSA', 80, 'united-monarchy', 'A national prayer using the vine metaphor — God transplanted Israel from Egypt but now the vineyard wall is broken down.'],
  // Psa 81 — Sing for joy to God our strength
  ['PSA', 81, 'united-monarchy', 'A festival psalm for a new moon celebration featuring trumpets, tambourines, harps, and lyres in the Jerusalem sanctuary.'],
  // Psa 82 — God presides in the great assembly
  ['PSA', 82, 'united-monarchy', 'A prophetic psalm depicting God standing in the divine council to rebuke unjust judges who fail to defend the weak.'],
  // Psa 83 — O God, do not remain silent
  ['PSA', 83, 'united-monarchy', 'A prayer by Asaph against a coalition of nations — Edom, Moab, Ammon, Philistia, Tyre — conspiring to wipe out Israel.'],
  // Psa 84 — How lovely is your dwelling place
  ['PSA', 84, 'united-monarchy', 'A pilgrimage psalm by the sons of Korah, celebrating the joy of approaching the Jerusalem sanctuary through the valley of Baca.'],
  // Psa 85 — You restored the fortunes of Jacob
  ['PSA', 85, 'united-monarchy', 'A national prayer for revival where steadfast love and faithfulness meet, righteousness and peace kiss in the land.'],
  // Psa 86 — Hear me, LORD, and answer me
  ['PSA', 86, 'united-monarchy', 'A personal lament by David weaving together phrases from older psalms into a unified prayer for mercy and strength.'],
  // Psa 87 — On the holy mountain stands the city
  ['PSA', 87, 'united-monarchy', 'A Zion hymn imagining the day when Egypt, Babylon, Philistia, Tyre, and Cush are all registered as born in Jerusalem.'],
  // Psa 89 — I will sing of the LORD's great love
  ['PSA', 89, 'united-monarchy', 'A covenant psalm by Ethan the Ezrahite celebrating God\'s promises to David\'s dynasty, then lamenting their apparent failure.'],
  // Psa 91 — Whoever dwells in the shelter of the Most High
  ['PSA', 91, 'united-monarchy', 'A song of divine protection using imagery of warfare, plague, and wild animals familiar to life in the Judean highlands.'],
  // Psa 92 — A song for the Sabbath day
  ['PSA', 92, 'united-monarchy', 'A Sabbath hymn celebrating how the righteous flourish like palm trees planted in the courts of the LORD\'s house.'],
  // Psa 93 — The LORD reigns, robed in majesty
  ['PSA', 93, 'united-monarchy', 'An enthronement psalm declaring God\'s kingship above the thundering seas, sung in the Jerusalem sanctuary.'],
  // Psa 94 — The LORD is a God who avenges
  ['PSA', 94, 'united-monarchy', 'A plea for justice against oppressors who crush God\'s people, murder widows and foreigners, and kill the fatherless.'],
  // Psa 95 — Come, let us sing for joy to the LORD
  ['PSA', 95, 'united-monarchy', 'A call to worship that pivots into a warning not to repeat the wilderness rebellion at Meribah and Massah.'],
  // Psa 96 — Sing to the LORD a new song
  ['PSA', 96, 'united-monarchy', 'A universal praise hymn declaring God\'s kingship to all nations, sung when the ark was brought to Jerusalem.'],
  // Psa 97 — The LORD reigns, let the earth be glad
  ['PSA', 97, 'united-monarchy', 'An enthronement psalm depicting God surrounded by clouds, fire, and lightning as all false gods bow before him.'],
  // Psa 98 — Sing to the LORD a new song
  ['PSA', 98, 'united-monarchy', 'A victory hymn calling rivers to clap and mountains to sing as God comes to judge the earth in righteousness.'],
  // Psa 99 — The LORD reigns, let the nations tremble
  ['PSA', 99, 'united-monarchy', 'An enthronement psalm celebrating the holy God who spoke to Moses, Aaron, and Samuel from the pillar of cloud.'],
  // Psa 100 — Shout for joy to the LORD, all the earth
  ['PSA', 100, 'united-monarchy', 'A thanksgiving psalm for entering the temple gates with praise, likely sung during festival processions in Jerusalem.'],
  // Psa 101 — I will sing of your love and justice
  ['PSA', 101, 'united-monarchy', 'A royal pledge by David to govern with integrity, banishing the deceitful and arrogant from the palace and the city.'],
  // Psa 102 — Hear my prayer, O LORD
  ['PSA', 102, 'united-monarchy', 'A lament of an afflicted man wasting away like smoke, alone on a rooftop like a solitary bird among the ruins.'],
  // Psa 104 — Praise the LORD, my soul
  ['PSA', 104, 'united-monarchy', 'A creation hymn surveying the natural world from springs in ravines to cedars of Lebanon to Leviathan playing in the sea.'],
  // Psa 105 — Give praise to the LORD, proclaim his name
  ['PSA', 105, 'united-monarchy', 'A historical psalm retelling God\'s covenant faithfulness from Abraham through the plagues of Egypt to the gift of Canaan.'],
  // Psa 106 — Praise the LORD; give thanks for he is good
  ['PSA', 106, 'united-monarchy', 'A confession psalm recounting Israel\'s repeated rebellions from the Red Sea through the wilderness to the land of Canaan.'],
  // Psa 107 — Give thanks to the LORD for he is good
  ['PSA', 107, 'united-monarchy', 'A thanksgiving psalm with four vignettes — desert wanderers, prisoners, the sick, and storm-tossed sailors — all delivered by God.'],
  // Psa 108 — My heart is steadfast, O God
  ['PSA', 108, 'united-monarchy', 'A composite psalm combining praise and a war oracle, claiming Moab, Edom, and Philistia as God\'s possessions.'],
  // Psa 109 — My God whom I praise, do not remain silent
  ['PSA', 109, 'united-monarchy', 'A fierce imprecatory psalm against a false accuser who repaid love with hatred and stood at the right hand to condemn.'],
  // Psa 110 — The LORD says to my lord: Sit at my right hand
  ['PSA', 110, 'united-monarchy', 'A royal oracle declaring the king both ruler and priest forever in the order of Melchizedek, composed in Jerusalem\'s court.'],
  // Psa 111 — Praise the LORD; I will extol the LORD
  ['PSA', 111, 'united-monarchy', 'An acrostic hymn celebrating God\'s works as studied and pondered in the assembly of the upright at Jerusalem.'],
  // Psa 112 — Praise the LORD; blessed is the one who fears the LORD
  ['PSA', 112, 'united-monarchy', 'An acrostic wisdom psalm describing the prosperity and generosity of the God-fearing person in Israelite society.'],
  // Psa 113 — Praise the LORD; praise, you servants of the LORD
  ['PSA', 113, 'united-monarchy', 'An Egyptian Hallel psalm sung at Passover, celebrating God who raises the poor from the dust and the ash heap.'],
  // Psa 114 — When Israel came out of Egypt
  ['PSA', 114, 'united-monarchy', 'An Exodus hymn depicting the sea fleeing and mountains skipping like rams as God led his people out of Egypt.'],
  // Psa 115 — Not to us, LORD, but to your name be the glory
  ['PSA', 115, 'united-monarchy', 'A polemic against idols that have mouths but cannot speak, contrasted with the living God who does whatever he pleases.'],
  // Psa 116 — I love the LORD, for he heard my voice
  ['PSA', 116, 'united-monarchy', 'A personal thanksgiving for rescue from death, fulfilled by lifting the cup of salvation in the courts of the LORD\'s house.'],
  // Psa 117 — Praise the LORD, all you nations
  ['PSA', 117, 'united-monarchy', 'The shortest psalm — two verses calling all nations and peoples to praise the LORD for his enduring faithfulness.'],
  // Psa 118 — Give thanks to the LORD for he is good
  ['PSA', 118, 'united-monarchy', 'A processional thanksgiving psalm culminating at the temple gates with the cry "the stone the builders rejected has become the cornerstone."'],
  // Psa 120 — I call on the LORD in my distress
  ['PSA', 120, 'united-monarchy', 'The first Song of Ascents, a lament from a pilgrim living far from Jerusalem among the deceitful in Meshech and Kedar.'],
  // Psa 121 — I lift my eyes to the mountains
  ['PSA', 121, 'united-monarchy', 'A pilgrim\'s song looking up at the Judean hills on the road to Jerusalem, trusting the LORD who neither slumbers nor sleeps.'],
  // Psa 122 — I rejoiced when they said, Let us go to the house of the LORD
  ['PSA', 122, 'united-monarchy', 'A pilgrim\'s joyful arrival at Jerusalem, standing inside the gates and praying for the peace of the city of David.'],
  // Psa 123 — To you I lift my eyes
  ['PSA', 123, 'united-monarchy', 'A communal plea for mercy from pilgrims who endure the contempt and ridicule of the proud and arrogant.'],
  // Psa 124 — If the LORD had not been on our side
  ['PSA', 124, 'united-monarchy', 'A communal thanksgiving imagining what would have happened if God had not rescued Israel from enemies who nearly swallowed them alive.'],
  // Psa 125 — Those who trust in the LORD are like Mount Zion
  ['PSA', 125, 'united-monarchy', 'A pilgrimage psalm comparing the faithful to Zion — immovable, surrounded by mountains as the LORD surrounds his people.'],
  // Psa 126 — When the LORD restored the fortunes of Zion
  ['PSA', 126, 'united-monarchy', 'A pilgrimage psalm celebrating restoration with mouths full of laughter, praying that those who sow in tears reap with joy.'],
  // Psa 127 — Unless the LORD builds the house
  ['PSA', 127, 'united-monarchy', 'A wisdom psalm of Solomon declaring that without God\'s blessing all human labor — building, guarding, working — is futile.'],
  // Psa 128 — Blessed are all who fear the LORD
  ['PSA', 128, 'united-monarchy', 'A pilgrimage blessing picturing the God-fearing man\'s wife as a fruitful vine and children as olive shoots around the table.'],
  // Psa 129 — They have greatly oppressed me from my youth
  ['PSA', 129, 'united-monarchy', 'A communal psalm recalling how enemies plowed furrows on Israel\'s back but the LORD cut the cords of the wicked.'],
  // Psa 130 — Out of the depths I cry to you
  ['PSA', 130, 'united-monarchy', 'A penitential psalm from the depths, waiting for the LORD more than watchmen wait for the morning on Jerusalem\'s walls.'],
  // Psa 131 — My heart is not proud, O LORD
  ['PSA', 131, 'united-monarchy', 'A three-verse psalm of quiet trust where David\'s calmed soul rests like a weaned child content against its mother.'],
  // Psa 132 — LORD, remember David
  ['PSA', 132, 'united-monarchy', 'A royal psalm recalling David\'s oath to find a dwelling place for God and the LORD\'s oath to establish David\'s throne.'],
  // Psa 133 — How good and pleasant when brothers dwell together
  ['PSA', 133, 'united-monarchy', 'A pilgrimage psalm celebrating unity with the image of anointing oil running down Aaron\'s beard and dew on Mount Hermon.'],
  // Psa 134 — Praise the LORD, all you servants who minister by night
  ['PSA', 134, 'united-monarchy', 'The final Song of Ascents, a brief nighttime blessing exchanged between pilgrims and the Levites serving the night watch in the sanctuary.'],
  // Psa 135 — Praise the LORD; praise the name of the LORD
  ['PSA', 135, 'united-monarchy', 'A Hallel psalm weaving together Exodus themes and idol polemic, sung by the Levitical choirs in the temple courts.'],
  // Psa 136 — Give thanks to the LORD for he is good
  ['PSA', 136, 'united-monarchy', 'The Great Hallel with its twenty-six-fold refrain "his love endures forever," sung antiphonally in the Jerusalem sanctuary.'],
  // Psa 138 — I will praise you, LORD, with all my heart
  ['PSA', 138, 'united-monarchy', 'A thanksgiving by David sung before the heavenly court, bowing toward the holy temple as God answers his prayer.'],
  // Psa 140 — Rescue me, LORD, from evildoers
  ['PSA', 140, 'united-monarchy', 'A lament against violent conspirators who sharpen their tongues like serpents and hide snares along the king\'s path.'],
  // Psa 141 — I call to you, LORD, come quickly
  ['PSA', 141, 'united-monarchy', 'An evening prayer asking God to set a guard over the psalmist\'s mouth as incense smoke rises at the sanctuary.'],
  // Psa 142 — I cry aloud to the LORD
  ['PSA', 142, 'united-monarchy', 'A prayer from a cave where David hides, his spirit growing faint while no one on his right hand acknowledges him.'],
  // Psa 143 — LORD, hear my prayer
  ['PSA', 143, 'united-monarchy', 'A penitential psalm where the psalmist spreads his hands like parched land thirsting for rain in the Judean wilderness.'],
  // Psa 144 — Praise be to the LORD my Rock
  ['PSA', 144, 'united-monarchy', 'A royal psalm asking God to part the heavens and send lightning to rescue the king from the hands of foreigners.'],
  // Psa 146 — Praise the LORD, my soul
  ['PSA', 146, 'united-monarchy', 'A Hallel psalm warning against trust in princes and celebrating the God who feeds the hungry and sets prisoners free.'],
  // Psa 147 — Praise the LORD; how good to sing praises
  ['PSA', 147, 'united-monarchy', 'A hymn celebrating God who rebuilds Jerusalem, heals the brokenhearted, counts the stars, and sends snow like wool.'],
  // Psa 148 — Praise the LORD from the heavens
  ['PSA', 148, 'united-monarchy', 'A cosmic praise psalm calling angels, sun, moon, sea creatures, mountains, trees, kings, and children to praise the LORD.'],
  // Psa 149 — Sing to the LORD a new song
  ['PSA', 149, 'united-monarchy', 'A victory psalm where the faithful dance with tambourines and carry two-edged swords to execute God\'s judgment on the nations.'],
  // Psa 150 — Praise the LORD; praise God in his sanctuary
  ['PSA', 150, 'united-monarchy', 'The grand finale of the Psalter — every instrument and every breath praising God in the Jerusalem sanctuary.'],

  // ═══════════════════════════════════════════════════════════════════════════
  //  PROVERBS — 24 missing chapters  (context: united-monarchy)
  // ═══════════════════════════════════════════════════════════════════════════

  // Pro 2 — Wisdom protects from evil
  ['PRO', 2, 'united-monarchy', 'Solomon\'s court school where the king instructs his son to seek wisdom like silver, promising it will guard him from the paths of the wicked and the seductive stranger.'],
  // Pro 3 — Trust in the LORD
  ['PRO', 3, 'united-monarchy', 'The royal palace where a father tells his son to trust the LORD with all his heart, reflecting a prosperous era when the temptation was self-reliance.'],
  // Pro 4 — Guard your heart
  ['PRO', 4, 'united-monarchy', 'A three-generation relay of wisdom instruction — Solomon passes down what David taught him in the Jerusalem palace.'],
  // Pro 5 — Warning against adultery
  ['PRO', 5, 'united-monarchy', 'The court of a king who maintained a vast harem, warning his heir that the forbidden woman\'s lips drip honey but her end is bitter as wormwood.'],
  // Pro 7 — The seduction of the naive
  ['PRO', 7, 'united-monarchy', 'The narrow streets of Jerusalem at twilight where a naive young man wanders past the corner near the adulteress\'s house.'],
  // Pro 8 — Wisdom calls aloud
  ['PRO', 8, 'united-monarchy', 'The city gates and crossroads of Jerusalem where personified Wisdom takes the public stage, calling to all who pass through.'],
  // Pro 12 — The righteous and the wicked contrasted
  ['PRO', 12, 'united-monarchy', 'The agrarian economy of the united kingdom where a righteous man cares for his animals and the diligent hand brings wealth.'],
  // Pro 13 — Wisdom from a father
  ['PRO', 13, 'united-monarchy', 'The family estate where wealth gained hastily vanishes but gathered little by little grows, reflecting the landed economy of Solomon\'s Israel.'],
  // Pro 14 — The wise woman builds her house
  ['PRO', 14, 'united-monarchy', 'The households of Jerusalem where the wise woman builds her home and the fool tears his down with his own hands.'],
  // Pro 15 — A gentle answer turns away wrath
  ['PRO', 15, 'united-monarchy', 'The royal court and marketplace where the tongue\'s power is on display — a gentle word calms fury, a harsh one stirs anger.'],
  // Pro 16 — The king's lips are an oracle
  ['PRO', 16, 'united-monarchy', 'The throne room of Jerusalem where the king\'s judgment is treated as divine oracle and honest scales are the LORD\'s delight.'],
  // Pro 18 — The name of the LORD is a fortified tower
  ['PRO', 18, 'united-monarchy', 'The walled city of Jerusalem where the rich man\'s wealth is his fortress but the name of the LORD is the true strong tower.'],
  // Pro 19 — Better to be poor and honest
  ['PRO', 19, 'united-monarchy', 'The social stratification of Solomon\'s kingdom where wealth attracts many friends but the poor man\'s companion deserts him.'],
  // Pro 20 — Wine is a mocker
  ['PRO', 20, 'united-monarchy', 'The banquet halls and market courts of the united kingdom where wine flows freely and the king\'s wrath is like a lion\'s roar.'],
  // Pro 21 — The king's heart is in the LORD's hands
  ['PRO', 21, 'united-monarchy', 'The political world of the Israelite monarchy where the LORD directs the king\'s heart like water channels in an irrigation system.'],
  // Pro 22 — A good name is more desirable than great riches
  ['PRO', 22, 'united-monarchy', 'The commercial crossroads of Solomon\'s trading empire where reputation determined a man\'s access to credit, contracts, and community trust.'],
  // Pro 23 — When you sit to dine with a ruler
  ['PRO', 23, 'united-monarchy', 'The court banquet tables of Jerusalem where an invitation to dine with the king required discernment about what was really being offered.'],
  // Pro 24 — Do not envy the wicked
  ['PRO', 24, 'united-monarchy', 'The agrarian landscape of the kingdom where a lazy man\'s vineyard is overgrown with thorns and his stone wall lies in ruins.'],
  // Pro 25 — These also are proverbs of Solomon, copied by Hezekiah's men
  ['PRO', 25, 'united-monarchy', 'The scribal workshop where Hezekiah\'s officials collected and copied Solomon\'s proverbs, preserving court wisdom from the united monarchy era.'],
  // Pro 26 — Like snow in summer
  ['PRO', 26, 'united-monarchy', 'The daily life of the kingdom where fools, sluggards, and gossips wreak havoc with the reliability of weather in the wrong season.'],
  // Pro 27 — Do not boast about tomorrow
  ['PRO', 27, 'united-monarchy', 'The pastoral and agricultural world of Israel where the condition of your flocks determines your future and a friend\'s honest wound heals.'],
  // Pro 28 — The wicked flee though no one pursues
  ['PRO', 28, 'united-monarchy', 'The legal and economic life of the kingdom where unjust rulers are like a driving rain that destroys the harvest of the poor.'],
  // Pro 29 — The one who stiffens his neck
  ['PRO', 29, 'united-monarchy', 'The governance of the united kingdom where righteous rulers make the people rejoice but wicked leaders make them groan.'],
  // Pro 30 — The sayings of Agur
  ['PRO', 30, 'united-monarchy', 'A wisdom collection from Agur son of Jakeh, an oracle-giver outside the Davidic court, observing the natural world with fresh eyes.'],

  // ═══════════════════════════════════════════════════════════════════════════
  //  ECCLESIASTES — 6 missing chapters  (context: united-monarchy)
  // ═══════════════════════════════════════════════════════════════════════════

  // Ecc 2 — Pleasures and achievements are meaningless
  ['ECC', 2, 'united-monarchy', 'The palace of a king who tested every pleasure available in the wealthiest court of the ancient Near East and found it all vapor.'],
  // Ecc 6 — The frustration of unused wealth
  ['ECC', 6, 'united-monarchy', 'The commercial world of Solomon\'s Jerusalem where a man may have wealth, possessions, and honor but God gives him no ability to enjoy them.'],
  // Ecc 7 — Wisdom and folly contrasted
  ['ECC', 7, 'united-monarchy', 'The royal court where the Preacher tests conventional wisdom proverbs against lived experience and finds them inadequate.'],
  // Ecc 8 — Obey the king, but God's ways are mysterious
  ['ECC', 8, 'united-monarchy', 'The political reality of court life where obedience to the king is prudent but the ultimate judge of all things is God alone.'],
  // Ecc 10 — Folly in high places
  ['ECC', 10, 'united-monarchy', 'The royal bureaucracy where a single act of folly outweighs much wisdom, and rulers feast in the morning instead of governing.'],
  // Ecc 11 — Cast your bread upon the waters
  ['ECC', 11, 'united-monarchy', 'The maritime trade routes of Solomon\'s commercial empire where merchants sent goods by ship and waited for uncertain returns.'],

  // ═══════════════════════════════════════════════════════════════════════════
  //  SONG OF SOLOMON — 4 missing chapters  (context: united-monarchy)
  // ═══════════════════════════════════════════════════════════════════════════

  // Sng 2 — My beloved is mine and I am his
  ['SNG', 2, 'united-monarchy', 'The spring landscape of the Judean countryside where the beloved\'s voice calls across vineyards as winter rains end and flowers blanket the hills.'],
  // Sng 5 — I opened for my beloved, but he had gone
  ['SNG', 5, 'united-monarchy', 'The nighttime streets of Jerusalem where the woman searches for her beloved and the city watchmen strike and wound her.'],
  // Sng 6 — Where has your beloved gone?
  ['SNG', 6, 'united-monarchy', 'The royal garden of Jerusalem where the beloved has gone down among the lilies and the woman\'s beauty overwhelms like an army with banners.'],
  // Sng 7 — How beautiful your sandaled feet
  ['SNG', 7, 'united-monarchy', 'The vineyards and orchards surrounding Jerusalem in spring where the lovers pledge themselves among the blossoming henna and mandrakes.'],
];

// ─── Insert ─────────────────────────────────────────────────────────────────
const insert = db.prepare(`
  INSERT INTO passage_climate (context_id, book_id, chapter, verse_start, verse_end, context_note, source_tier)
  VALUES (@context_id, @book_id, @chapter, @verse_start, @verse_end, @context_note, @source_tier)
`);

const batchInsert = db.transaction(() => {
  let inserted = 0;
  let skipped = 0;
  for (const [book_id, chapter, context_id, context_note] of rows) {
    const key = `${book_id}:${chapter}`;
    if (existing.has(key)) {
      skipped++;
      continue;
    }
    insert.run({
      context_id,
      book_id,
      chapter,
      verse_start: 1,
      verse_end: null,
      context_note,
      source_tier: 'ai_assisted',
    });
    inserted++;
  }
  return { inserted, skipped };
});

const result = batchInsert();
console.log(`Inserted ${result.inserted} passage_climate rows (${result.skipped} skipped — already existed).`);

// ─── Verify ─────────────────────────────────────────────────────────────────
const counts = db.prepare(`
  SELECT book_id, COUNT(*) AS cnt
  FROM passage_climate
  WHERE book_id IN ('JOB','PSA','PRO','ECC','SNG')
  GROUP BY book_id
  ORDER BY book_id
`).all();

console.log('\nPassage-climate coverage by book:');
for (const r of counts) {
  console.log(`  ${r.book_id}: ${r.cnt} chapters`);
}

const total = counts.reduce((s, r) => s + r.cnt, 0);
console.log(`  TOTAL: ${total} rows`);

db.close();
