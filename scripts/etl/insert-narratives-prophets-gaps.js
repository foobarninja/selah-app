/**
 * insert-narratives-prophets-gaps.js
 *
 * Fill missing narrative_units for Prophet books.
 *
 * Missing chapters covered:
 *   ISA: 56 chapters (1,3,4,8,10-39,41-51,54-60,62-64,66)
 *   JER: 44 chapters (2-6,8-17,19,21-28,30,33-38,40-52)
 *   LAM: 2 chapters (2,4)
 *   EZK: 31 chapters (4-9,12-33,35,38,39)
 *   DAN: 4 chapters (8,10,11,12)
 *   HOS: 7 chapters (7-10,12,13)
 *   AMO: 5 chapters (3,4,6,8,9)
 *   MIC: 4 chapters (1-4)
 *   ZEC: 5 chapters (7,8,10,11,14)
 *   MAL: 2 chapters (1,2)
 *
 * Grouped into sensible prophetic-oracle units per instructions.
 * source_tier = 'ai_assisted'
 *
 * Run: node scripts/etl/insert-narratives-prophets-gaps.js
 */

const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

const insert = db.prepare(`
  INSERT OR REPLACE INTO narrative_units (
    id, title, book_id, chapter_start, verse_start, chapter_end, verse_end,
    summary, significance, relational_note, conceptual_note, climate_note,
    modern_parallel, key_questions, preaching_angles,
    source_tier, source_notes
  ) VALUES (
    @id, @title, @bookId, @chapterStart, @verseStart, @chapterEnd, @verseEnd,
    @summary, @significance, @relationalNote, @conceptualNote, @climateNote,
    @modernParallel, @keyQuestions, @preachingAngles,
    @sourceTier, @sourceNotes
  )
`);

/* ═══════════════════════════════════════════════════════════════════
 *  DATA
 * ═══════════════════════════════════════════════════════════════════ */
const rows = [

  // ═══════════════════════════════════════════════════════════
  //  ISAIAH
  // ═══════════════════════════════════════════════════════════

  // --- Section: Judgment on Judah (ISA 1-4) ---
  // Existing: ch 2 (swords-into-plowshares). Missing: 1, 3, 4
  {
    id: 'isa-judgment-on-judah',
    title: 'Judgment on Judah: The Great Arraignment',
    bookId: 'ISA',
    chapterStart: 1,
    verseStart: 1,
    chapterEnd: 4,
    verseEnd: 6,
    summary: 'God opens court against the nation He raised. The indictment is devastating: the ox knows its owner but Israel does not know its God. Religious performance continues — sacrifices, festivals, incense — while the people\'s hands drip with blood. Isaiah surveys a society whose leaders plunder the poor, whose women parade in luxury while the destitute starve, and whose courts are thick with bribery. Yet the section does not end in destruction alone. After judgment strips Jerusalem bare, a purified remnant emerges under the Branch of the Lord, sheltered by a new pillar of cloud and fire that recalls the Exodus. Chapters 1-4 function as a theological overture: everything the rest of Isaiah will explore — judgment, purification, remnant hope, and restoration — appears here in compressed form.',
    significance: 'This opening unit establishes that God\'s controversy with Judah is not about insufficient religion but about unjust society. The sheer volume of worship activity makes the indictment worse, not better. Isaiah insists that worship without justice is not just ineffective — it is offensive to God. The passage also introduces the remnant theology that will carry the entire book: not everyone will be destroyed, but only what survives the fire will be called holy.',
    relationalNote: 'The parent-child metaphor in 1:2 ("I reared children and brought them up, but they have rebelled against me") frames the entire relationship between God and Israel as familial betrayal rather than contractual violation. This is not a landlord evicting a tenant; it is a parent grieving over children who have walked away.',
    conceptualNote: 'Isaiah collapses the modern separation between worship and ethics. The theological claim is that liturgy performed by unjust hands is not neutral — it is an abomination. This challenges any community that imagines spiritual devotion and social responsibility can be practiced independently of each other.',
    climateNote: 'Late eighth-century Jerusalem under Uzziah and Jotham experienced significant prosperity and building expansion. Archaeological evidence shows increased luxury goods imports and wealth concentration among elites. The agricultural imagery — vineyard, garden, oak — reflects the Judean hill country economy that depended on terraced farming and seasonal rainfall.',
    modernParallel: 'Consider a wealthy nation that builds magnificent cathedrals, funds elaborate worship services, and produces a thriving religious publishing industry — while its healthcare system bankrupts families, its courts favor the powerful, and its immigrants sleep in cages. Isaiah 1-4 is not an ancient artifact; it is a mirror held up to any society whose religious devotion coexists comfortably with structural injustice.',
    keyQuestions: JSON.stringify([
      'What does it mean that God rejects worship offered by people whose hands are "full of blood"?',
      'How does the parent-child metaphor change the way we understand divine judgment?',
      'What is the relationship between the stripping away of luxury in chapter 3 and the purity described in chapter 4?',
      'Where do we see the pattern of religious performance masking social injustice today?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When God sues His own people', target_audience: 'communities complacent in their religiosity', primary_theme: 'worship without justice is an abomination' },
      { angle: 'The remnant after the fire', target_audience: 'those going through painful pruning seasons', primary_theme: 'purification as the path to genuine holiness' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 1, 3, 4 (ch 2 covered by existing swords-into-plowshares unit). Synthesized from standard critical analysis of Isaiah\'s opening oracles.'
  },

  // --- Section: Woe Oracles (ISA 10-12) ---
  // Missing: 10, 11, 12
  {
    id: 'isa-woe-oracles',
    title: 'Woe Oracles: Assyria as God\'s Rod and the Shoot from Jesse',
    bookId: 'ISA',
    chapterStart: 10,
    verseStart: 1,
    chapterEnd: 12,
    verseEnd: 6,
    summary: 'Isaiah announces woe on those who make unjust laws and deprive the poor of their rights, then pivots to a stunning theological claim: Assyria, the most terrifying military machine in the ancient world, is merely a rod in God\'s hand. The empire does not know it is being wielded — Assyria thinks its conquests are its own achievement — and when God finishes using it, He will punish the arrogant heart of the Assyrian king. From the stump of David\'s fallen dynasty, a shoot will grow. The Spirit of the Lord will rest on this ruler, who will judge the poor with righteousness. The wolf will lie down with the lamb, and a little child will lead them. The section culminates in a song of praise echoing the Exodus: "With joy you will draw water from the wells of salvation."',
    significance: 'These chapters solve one of the hardest theological puzzles in the prophets: if God is sovereign, how can a pagan empire destroy God\'s own people? Isaiah\'s answer is that Assyria is an instrument, not an agent — used by God for discipline but held accountable for its own cruelty. The messianic vision in chapter 11 is one of the most important in the Hebrew Bible, establishing that the future king will be defined not by military power but by justice, wisdom, and the Spirit of God.',
    relationalNote: 'The relationship between God and Assyria is deeply ironic: the empire that boasts "By the strength of my hand I have done this" is unaware it is being used. This dynamic speaks to every powerful institution that confuses its own competence with ultimate authority. Meanwhile, the messianic shoot from Jesse\'s stump represents God\'s preference for working through what appears insignificant.',
    conceptualNote: 'The theological concept of divine sovereignty operating through human agency without excusing human evil is the central tension of these chapters. Assyria is simultaneously God\'s instrument and God\'s enemy — a paradox that refuses neat resolution and forces readers to hold judgment and purpose together.',
    climateNote: 'Assyrian expansion under Tiglath-Pileser III and his successors reshaped the entire ancient Near East in the late eighth century BCE. The deportation policies that Isaiah references were systematic programs of population transfer designed to prevent future rebellion. The vision of wolves lying with lambs would have resonated powerfully with shepherding communities that constantly lost livestock to predators.',
    modernParallel: 'When a superpower uses its military might to reshape a region, claiming its own strategic genius as the reason for its success, it is enacting the Assyrian posture Isaiah describes. The shoot from the stump speaks to every community that has watched its institutions collapse and wonders if anything will grow again — a failing school district that produces one transformative teacher, a devastated neighborhood that births a community garden.',
    keyQuestions: JSON.stringify([
      'How do we hold together the idea that God uses empires as instruments while also holding those empires accountable?',
      'What does the shoot from Jesse\'s stump teach about where God typically locates new beginnings?',
      'Why is the messianic ruler defined by justice for the poor rather than military victory?',
      'What would it look like for the wolf to lie with the lamb in your community?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The rod that doesn\'t know it\'s a rod', target_audience: 'leaders tempted by the illusion of self-made success', primary_theme: 'divine sovereignty behind human power' },
      { angle: 'Hope from a stump', target_audience: 'communities after institutional collapse', primary_theme: 'God works through apparent endings' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 10-12. Messianic interpretation draws on broad Jewish and Christian scholarly consensus.'
  },

  // --- Section: Oracles Against the Nations (ISA 13-23) ---
  // Missing: 13-23
  {
    id: 'isa-oracles-against-nations',
    title: 'Oracles Against the Nations: No Empire Is Exempt',
    bookId: 'ISA',
    chapterStart: 13,
    verseStart: 1,
    chapterEnd: 23,
    verseEnd: 18,
    summary: 'Isaiah turns his gaze from Judah to the surrounding nations and delivers a devastating sequence of judgment oracles: Babylon, Assyria, Philistia, Moab, Damascus, Cush, Egypt, and Tyre each receive their verdict. The oracle against Babylon (chs 13-14) is the most elaborate, including the famous taunt song against the king who said "I will ascend to heaven" and was cast down to Sheol. Moab\'s oracle is surprisingly tender — Isaiah weeps for Moab\'s devastation. Egypt\'s oracle culminates in the astonishing vision of an altar to the Lord in Egypt and an Assyria-Israel-Egypt peace axis. These are not merely political forecasts; they are theological claims that every nation exists under God\'s moral authority.',
    significance: 'The oracles against the nations establish a universal scope for Isaiah\'s theology. God is not merely Israel\'s tribal deity — He is the sovereign over all peoples and holds every empire accountable. The fall-from-heaven imagery in chapter 14 has profoundly shaped Christian theology about pride and the origin of evil. The Egypt oracle (ch 19) is one of the most universalist passages in the Old Testament, envisioning former enemies worshipping together.',
    relationalNote: 'Isaiah\'s tears for Moab (15:5, 16:9-11) reveal that prophetic judgment is not delivered with relish. The prophet identifies with the suffering even of Israel\'s rivals, modeling a compassion that transcends tribal loyalty. The vision of Egypt, Assyria, and Israel as co-worshippers represents the most expansive relational possibility in the prophetic literature.',
    conceptualNote: 'The theology of nations here insists that political power is never autonomous. Every empire operates within a moral order it did not create and cannot escape. The Babylon taunt song (ch 14) explores the psychology of imperial hubris — the delusion of self-deification — and its inevitable collapse into the grave.',
    climateNote: 'The nations named correspond to the major powers and trade routes of the eighth-century Levant. Tyre was the great maritime trading city; Moab was the grain-producing plateau east of the Dead Sea; Egypt controlled the Nile delta breadbasket. Isaiah maps the entire political geography of his world and declares that none of it is outside God\'s jurisdiction.',
    modernParallel: 'The oracles against the nations function like a foreign policy address delivered not from a throne room but from a prophet\'s conviction that no superpower gets a permanent exemption from moral accountability. The fall-from-heaven language applies whenever an institution — corporate, political, religious — begins to believe its own press releases about its indispensability.',
    keyQuestions: JSON.stringify([
      'What does it mean that God holds nations accountable that have no covenant with Him?',
      'Why does Isaiah weep for Moab, an enemy nation?',
      'How does the vision of Egypt worshipping alongside Israel challenge tribalistic religion?',
      'Where do we see the "I will ascend to heaven" impulse in modern institutions?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'No empire is forever', target_audience: 'communities living under powerful institutions', primary_theme: 'God\'s sovereignty over all nations' },
      { angle: 'Weeping for the enemy', target_audience: 'congregations in polarized contexts', primary_theme: 'prophetic compassion that crosses lines of enmity' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 13-23. Historical context from Assyrian-period archaeology and ANE treaty literature.'
  },

  // --- Section: Isaiah\'s Apocalypse (ISA 24-27) ---
  // Missing: 24-27
  {
    id: 'isa-apocalypse',
    title: 'Isaiah\'s Apocalypse: The Earth Laid Waste and the Feast on the Mountain',
    bookId: 'ISA',
    chapterStart: 24,
    verseStart: 1,
    chapterEnd: 27,
    verseEnd: 13,
    summary: 'The scope suddenly expands from individual nations to the entire earth. God will devastate the whole world because its inhabitants have violated the "everlasting covenant" — a primordial moral order that binds all humanity, not just Israel. The earth mourns, withers, and staggers like a drunkard. Even the celestial bodies are shamed. Yet in the center of this cosmic judgment stands one of the most beautiful promises in Scripture: God will prepare a feast on Mount Zion for all peoples, will swallow up death forever, and will wipe away the tears from every face. Chapter 26 contains a song of trust from a besieged city, and chapter 27 portrays God as a vineyard keeper who tenderly guards His vine.',
    significance: 'These chapters are among the earliest examples of apocalyptic literature in the Bible. They introduce concepts — universal resurrection, the swallowing of death, the cosmic feast — that will become central to later Jewish and Christian eschatology. Isaiah 25:8 ("He will swallow up death forever") is directly quoted by Paul in 1 Corinthians 15. The passage insists that God\'s final purpose is not destruction but a banquet of abundance for all peoples.',
    relationalNote: 'The image of God wiping tears from every face is perhaps the most intimate picture of the divine in the entire prophetic corpus. This is not a distant deity issuing decrees but a tender parent bending down to comfort a weeping child. The universal scope — "all peoples," "all nations" — ensures that no one is left outside the circle of care.',
    conceptualNote: 'The "everlasting covenant" that humanity has broken is not the Mosaic covenant but something older — a creational moral order that binds all human beings. This universalizes the prophetic critique: it is not just Israel that has failed but the entire human project. The response, however, is equally universal: the feast is for "all peoples," not just the covenant community.',
    climateNote: 'The language of the earth "staggering like a drunkard" and the heavenly bodies being "ashamed" reflects ancient cosmological thinking in which the moral and physical orders are inseparable. Human sin disorders creation itself. The agricultural imagery of the vineyard in chapter 27 returns the reader to the Judean hillside landscape where most of Isaiah\'s audience lived and worked.',
    modernParallel: 'The "Isaiah Apocalypse" reads like a meditation on global systems failure — ecological collapse, pandemic, economic meltdown — followed by the stubborn insistence that destruction is not the final word. The feast on the mountain is the answer to every dystopian vision: not denial of catastrophe but the conviction that beyond it lies a table set for everyone.',
    keyQuestions: JSON.stringify([
      'What is the "everlasting covenant" that all humanity has broken?',
      'How does the promise of death being swallowed up function as hope rather than escapism?',
      'What does it mean that God prepares a feast for "all peoples" — how wide is this invitation?',
      'How does the vineyard imagery in chapter 27 connect to the vineyard song in chapter 5?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The feast beyond the fire', target_audience: 'communities facing existential anxiety', primary_theme: 'God\'s final purpose is abundance, not destruction' },
      { angle: 'He will wipe away every tear', target_audience: 'those carrying grief', primary_theme: 'divine tenderness in the face of suffering' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 24-27 ("Little Apocalypse"). Eschatological analysis informed by standard critical commentaries.'
  },

  // --- Section: Woe Series (ISA 28-33) ---
  // Missing: 28-33
  {
    id: 'isa-woe-series',
    title: 'The Woe Series: False Security and the Cornerstone',
    bookId: 'ISA',
    chapterStart: 28,
    verseStart: 1,
    chapterEnd: 33,
    verseEnd: 24,
    summary: 'A new cycle of woe oracles targets the leaders of both northern Israel and Judah. Samaria\'s drunken rulers are a fading flower about to be trampled. Jerusalem\'s leaders have made a "covenant with death," trusting in alliances and lies rather than God. Against this, God lays in Zion a tested cornerstone, a sure foundation — the person who trusts will never be dismayed. Isaiah pronounces woe on those who plan in secret, thinking God cannot see, and on those who seek Egypt\'s military horses instead of trusting the Holy One of Israel. The series culminates in a vision of the coming king who will reign in righteousness, where eyes that were blind will see and ears that were deaf will hear.',
    significance: 'The cornerstone image (28:16) becomes one of the most important messianic texts in the New Testament, applied to Christ by both Peter and Paul. The entire woe series is a sustained critique of political pragmatism that substitutes human alliances for divine trust. Isaiah does not oppose statecraft per se, but statecraft that excludes God from the calculation.',
    relationalNote: 'The "covenant with death" is Isaiah\'s savage description of Judah\'s diplomatic alliances — treaties made with powers that will ultimately destroy them. It captures the self-destructive logic of fear-based decision-making: the very protections you seek become the instruments of your undoing.',
    conceptualNote: 'The cornerstone theology here introduces the idea that God\'s work has a foundation — a tested, reliable starting point — and that faith means building on that foundation rather than on the shifting alliances of political convenience. This becomes central to New Testament ecclesiology.',
    climateNote: 'The Egyptian alliance that Isaiah condemns was a concrete geopolitical option in the late eighth century. Egypt\'s war horses and chariots were legendary. Judah\'s leaders calculated that Egyptian military power could offset the Assyrian threat. Isaiah argues this is not just bad strategy but bad theology.',
    modernParallel: 'Every institution that trusts its insurance policies more than its mission, its lobbyists more than its principles, its alliances of convenience more than its founding purpose — this is the "covenant with death" Isaiah describes. The cornerstone image speaks to the need for every community to identify what is actually foundational versus what is merely expedient.',
    keyQuestions: JSON.stringify([
      'What are the modern "covenants with death" — alliances that promise security but deliver destruction?',
      'How does the cornerstone metaphor challenge communities to identify what they are actually building on?',
      'Why does Isaiah single out trust in military power as a particular form of faithlessness?',
      'What would it look like to trust the "sure foundation" rather than the alliance of convenience?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The covenant with death', target_audience: 'leaders making fear-based compromises', primary_theme: 'false security always betrays' },
      { angle: 'Building on the cornerstone', target_audience: 'communities discerning their true foundation', primary_theme: 'trust in God versus trust in systems' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 28-33. Cornerstone messianic reading attested across Jewish and Christian commentary traditions.'
  },

  // --- Section: Judgment and Salvation (ISA 34-35) ---
  // Missing: 34, 35
  {
    id: 'isa-judgment-and-salvation',
    title: 'Judgment and Salvation: The Burning Desert and the Blooming Wilderness',
    bookId: 'ISA',
    chapterStart: 34,
    verseStart: 1,
    chapterEnd: 35,
    verseEnd: 10,
    summary: 'These two chapters form a devastating diptych. Chapter 34 is universal judgment at its most terrifying: the heavens dissolve, the stars fall, and Edom becomes a wasteland of burning pitch and sulfur, inhabited only by jackals and owls. Chapter 35 is its perfect opposite: the wilderness blooms, the blind see, the deaf hear, the lame leap like deer, and a highway of holiness cuts through the desert for the ransomed of the Lord to return singing to Zion. The juxtaposition is deliberate — judgment and salvation are not sequential alternatives but simultaneous realities, and the reader must hold both in a single vision.',
    significance: 'Chapter 35 is one of the most frequently echoed passages in the New Testament. When John the Baptist sends messengers to ask Jesus if he is the expected one, Jesus quotes Isaiah 35: "the blind see, the lame walk, the deaf hear." The chapter functions as Isaiah\'s clearest portrait of what redemption looks like in concrete, bodily terms — it is not an ethereal spiritual escape but the restoration of broken bodies and barren landscapes.',
    relationalNote: 'The ransomed returning on the highway of holiness are the exiles — people who have been displaced, broken, scattered. Their return is accompanied by singing and everlasting joy. The passage insists that God\'s final word to displaced people is homecoming, not permanent exile.',
    conceptualNote: 'The parallelism between cosmic destruction and cosmic renewal in these chapters establishes a pattern that runs through biblical eschatology: you cannot have the new creation without the end of the old one. The desert blooming is not a mere metaphor but a declaration that redemption transforms the material world.',
    climateNote: 'The Judean wilderness — the arid region between the central highlands and the Dead Sea — was the quintessential "desert" in Israelite experience. Its transformation into a blooming garden would have been the most vivid possible image of divine reversal for Isaiah\'s audience.',
    modernParallel: 'Chapter 35 speaks directly to disability justice: the blind seeing, the deaf hearing, the lame leaping. In a world that often spiritualizes these images away, Isaiah insists that God\'s redemption has a bodily dimension. It also speaks to ecological restoration — degraded land made whole, dry rivers flowing again.',
    keyQuestions: JSON.stringify([
      'Why does Isaiah place cosmic judgment and cosmic renewal side by side?',
      'How should we read the physical healings in chapter 35 — literally, metaphorically, or both?',
      'What does the "highway of holiness" suggest about the journey from exile to restoration?',
      'Where do you see deserts blooming in your context?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The desert will bloom', target_audience: 'those in barren seasons of life', primary_theme: 'God transforms wasteland into garden' },
      { angle: 'Bodies matter to God', target_audience: 'disability justice communities and those with chronic illness', primary_theme: 'redemption includes bodily restoration' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 34-35. NT echoes in Matt 11:4-5 / Luke 7:22 well attested in scholarship.'
  },

  // --- Section: Hezekiah Narrative (ISA 36-39) ---
  // Missing: 36-39 (ch 39 exists as jer-fall narrative but needs covering here)
  {
    id: 'isa-hezekiah-narrative',
    title: 'The Hezekiah Crisis: Assyria at the Gates',
    bookId: 'ISA',
    chapterStart: 36,
    verseStart: 1,
    chapterEnd: 38,
    verseEnd: 22,
    summary: 'The Assyrian army arrives at Jerusalem\'s walls and the Rabshakeh delivers his speech in Hebrew so the common people can hear: "Do not let Hezekiah deceive you — no god has delivered any nation from my hand." It is a masterpiece of psychological warfare and theological provocation. Hezekiah tears his clothes, goes to the temple, and spreads the Assyrian letter before the Lord. Isaiah sends word: God will defend this city. That night, 185,000 Assyrian soldiers die, and Sennacherib retreats. In chapter 38, Hezekiah falls mortally ill and God adds fifteen years to his life. The section is the narrative hinge of the entire book — the dramatic proof that trusting God (as Ahaz refused to do in ch 7) actually works.',
    significance: 'The Hezekiah narrative is the only extended prose section in Isaiah 1-39 and serves as the historical vindication of everything Isaiah has preached. Where Ahaz refused to trust and allied with Assyria, Hezekiah trusts and is delivered. The passage also marks a transition: chapters 36-39 parallel 2 Kings 18-20, bridging Isaiah\'s first-person prophecy to the "Book of Comfort" that begins in chapter 40.',
    relationalNote: 'Hezekiah\'s response to crisis is a model of vulnerable faith: he does not posture or strategize but literally lays the threat before God and asks for help. The contrast with Ahaz could not be sharper. The relationship between prophet and king here is collaborative rather than adversarial — Isaiah supports Hezekiah rather than condemning him.',
    conceptualNote: 'The Rabshakeh\'s speech raises the deepest theological question of the passage: is Yahweh just another national god who will fail against Assyria\'s power? The deliverance of Jerusalem is God\'s answer — not a general principle that faith always prevents disaster, but a specific historical demonstration of God\'s sovereignty over the mightiest empire on earth.',
    climateNote: 'Sennacherib\'s siege of Jerusalem in 701 BCE is one of the best-attested events in both biblical and Assyrian records. The Sennacherib Prism confirms the siege though tells it differently. Jerusalem\'s water supply, secured by Hezekiah\'s tunnel, was critical to surviving the siege.',
    modernParallel: 'The Rabshakeh\'s speech is the voice of every overwhelming force that says resistance is futile — the terminal diagnosis, the impossible debt, the political machine that cannot be fought. Hezekiah\'s response — taking the letter to the temple, spreading it out before God — is the posture of anyone who faces something bigger than themselves and refuses to surrender or pretend.',
    keyQuestions: JSON.stringify([
      'What makes Hezekiah\'s response to crisis different from Ahaz\'s in chapter 7?',
      'How does the Rabshakeh\'s speech function as theological provocation, not just military intimidation?',
      'Does the deliverance of Jerusalem establish a general principle or describe a specific act of God?',
      'What does it look like to "spread the letter before the Lord" in your own life?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Spreading the letter before God', target_audience: 'those overwhelmed by circumstances', primary_theme: 'vulnerable trust in the face of impossible odds' },
      { angle: 'When the empire says your God can\'t save you', target_audience: 'communities facing hostile cultural pressure', primary_theme: 'divine sovereignty over powerful opposition' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 36-38 (ch 39 covered by existing fall-of-jerusalem unit). Sennacherib siege historicity well attested by both biblical and Assyrian records.'
  },

  // --- Section: Comfort / Second Isaiah (ISA 41-51) ---
  // Existing: ch 40 (comfort-my-people), ch 52-53 (suffering-servant). Missing: 41-51
  {
    id: 'isa-comfort',
    title: 'The Book of Comfort: God\'s Case Against the Idols',
    bookId: 'ISA',
    chapterStart: 41,
    verseStart: 1,
    chapterEnd: 48,
    verseEnd: 22,
    summary: 'God puts the nations\' gods on trial and they have nothing to say. In a series of courtroom speeches, Yahweh challenges the idols to predict the future, to do anything at all — and they stand mute. Meanwhile God announces something unprecedented: a conqueror from the east (Cyrus of Persia) will liberate the exiles, and God calls this pagan king "my shepherd" and "my anointed." The passage weaves together devastating idol parody (a craftsman cuts down a tree, warms himself with half of it, and worships the other half), tender reassurance ("Fear not, for I am with you; I will strengthen you"), and the insistence that Israel\'s liberation from Babylon will be a new Exodus greater than the first. The section culminates in the command to leave Babylon — not as fugitives but as a liturgical procession carrying the vessels of the Lord.',
    significance: 'Isaiah 41-48 contains the most sustained monotheistic argument in the Hebrew Bible. The idol trial speeches are not merely polemic — they establish the theological basis for Israel\'s hope. If there is only one God, then Babylon\'s gods cannot prevent what Yahweh has decreed. The naming of Cyrus as God\'s anointed (44:28, 45:1) is revolutionary: it claims that God works through secular rulers who do not know Him, which challenges every assumption about how divine purpose operates in history.',
    relationalNote: 'The tender reassurances scattered through these chapters — "I have called you by name, you are mine," "When you pass through the waters I will be with you" — are addressed to a community in exile that has lost everything. The relational dynamic is that of a parent finding a lost child: fierce love expressed through the promise of presence.',
    conceptualNote: 'The idol parody sections (44:9-20) are some of the funniest passages in the Bible, and the humor is theologically serious. By making idol-making look absurd (using the same piece of wood for both fuel and worship), Isaiah is deconstructing the entire religious worldview of Babylon. The contrast is absolute: Yahweh speaks, acts, predicts, and fulfills; the idols are carried around and can do nothing.',
    climateNote: 'The Babylonian exile (597-539 BCE) placed the Jewish community in the heart of Mesopotamian civilization. The grand processional ways of Babylon, where idol statues were paraded during the New Year festival (Akitu), form the visual backdrop for Isaiah\'s idol parody. The "waters" and "rivers" references connect to Babylon\'s Euphrates-based irrigation system.',
    modernParallel: 'The idol trial speeches apply to any object of ultimate trust that turns out to be mute when you need it most — the career that defined you until the layoff, the political party that promised everything, the financial portfolio that evaporated overnight. Isaiah\'s question to the idols is the question every crisis poses to our functional gods: "Can they tell us what is to come?"',
    keyQuestions: JSON.stringify([
      'What does it mean that God calls a pagan king "my anointed"?',
      'How does the idol parody function as both humor and serious theology?',
      'What are the modern equivalents of the idols Isaiah describes?',
      'How does the promise "I have called you by name" function for a community that has lost its identity?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The God who calls you by name', target_audience: 'those struggling with identity and belonging', primary_theme: 'divine intimacy in displacement' },
      { angle: 'When your gods go silent', target_audience: 'people whose functional idols have failed', primary_theme: 'the bankruptcy of misplaced trust' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 41-48. Monotheistic trial speeches and Cyrus oracle analysis from Deutero-Isaiah scholarship.'
  },

  // --- Section: Servant Songs (ISA 49-51) ---
  // Missing: 49-51 (52-53 exists)
  {
    id: 'isa-servant-songs',
    title: 'The Servant Songs: Called, Rejected, and Vindicated',
    bookId: 'ISA',
    chapterStart: 49,
    verseStart: 1,
    chapterEnd: 51,
    verseEnd: 23,
    summary: 'The mysterious Servant of the Lord steps forward and speaks: "The Lord called me before I was born." His mission is not only to restore Israel but to be a light to the nations. Yet the Servant also confesses what looks like failure: "I have labored in vain, I have spent my strength for nothing." God\'s response is to expand the mission — "It is too small a thing for you to restore the tribes of Jacob; I will make you a light for the Gentiles." Chapter 50 introduces the Suffering Servant who gives his back to those who strike him and his cheeks to those who pull out his beard, yet trusts that God will vindicate him. Chapter 51 calls the faithful remnant to look to Abraham and Sarah — a barren couple from whom God made a nation — as proof that God can make something from nothing.',
    significance: 'The Servant Songs are among the most theologically significant passages in the Hebrew Bible and the most debated. The Servant has been identified as Israel, a faithful remnant, the prophet himself, and (in Christian reading) the Messiah. The passage insists that God\'s purpose includes but transcends Israel — the Servant\'s mission is global. The willingness to suffer without retaliating (50:6) introduces a theology of redemptive suffering that will become central to the New Testament.',
    relationalNote: 'The Servant\'s confession of apparent failure (49:4) is one of the most honest moments in prophetic literature. Before vindication comes the experience of fruitlessness — the sense that everything you have given your life to has produced nothing. God\'s response is not denial but expansion: your sense of failure is actually too small a frame for what I am doing.',
    conceptualNote: 'The theology of vocation in these chapters is radical: the Servant is called before birth, shaped in the womb, given a mouth like a sharp sword — and then experiences what looks like complete failure. The theological claim is that divine calling does not exempt from suffering but includes it, and that the suffering itself becomes the vehicle of the mission.',
    climateNote: 'The call to "look to the rock from which you were hewn" (51:1) uses quarrying imagery familiar in the Judean hill country where limestone was the primary building material. The Abraham and Sarah reference grounds the exilic community\'s hope in their own founding story: if God could make a nation from one barren couple, God can restore a decimated people.',
    modernParallel: 'The Servant who labors in vain and is told his mission is actually larger than he imagined speaks to every person whose faithful work seems to produce no results. The teacher in the struggling school, the social worker in the overwhelmed system, the activist whose cause keeps losing — Isaiah says the apparent failure is not the whole story.',
    keyQuestions: JSON.stringify([
      'Who is the Servant — Israel, a remnant, the prophet, the Messiah, or all of these?',
      'What does it mean that the Servant\'s mission is "too small" when limited to Israel?',
      'How does the Servant\'s willingness to suffer without retaliating challenge conventional power?',
      'Where have you experienced the dynamic of apparent failure that turns out to be a larger purpose?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When your mission feels like failure', target_audience: 'burned-out servants and ministry workers', primary_theme: 'God\'s purposes are larger than our metrics' },
      { angle: 'A light to the nations', target_audience: 'communities discerning their broader calling', primary_theme: 'vocation that transcends tribal boundaries' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 49-51. Servant Song identification debates drawn from standard critical and theological commentary traditions.'
  },

  // --- Section: New Community (ISA 54-59) ---
  // Missing: 54-60 minus 55 is not existing (all missing). Let's cover 54-59.
  {
    id: 'isa-new-community',
    title: 'The New Community: Covenant, Justice, and the Sin That Separates',
    bookId: 'ISA',
    chapterStart: 54,
    verseStart: 1,
    chapterEnd: 59,
    verseEnd: 21,
    summary: 'After the Suffering Servant\'s sacrifice, the barren woman is told to sing — she will have more children than the married woman. God\'s covenant of peace will never be removed, and the new Jerusalem will be built with precious stones. Chapter 55 issues the great invitation: "Come, everyone who thirsts, come to the waters; you who have no money, come, buy and eat!" The word of God goes out and will not return empty. Chapters 56-57 welcome foreigners and eunuchs into the covenant community — previously excluded by Deuteronomy — while condemning Israel\'s leaders as blind watchmen and greedy dogs. Chapter 58 delivers Isaiah\'s most famous ethical teaching: the fast God chooses is not going without food but loosing the bonds of injustice, feeding the hungry, and sheltering the homeless. Chapter 59 is a dark confession: "Your iniquities have separated you from your God" — the most direct statement of sin-as-separation in the prophets.',
    significance: 'These chapters reimagine the boundaries of God\'s people. The inclusion of foreigners and eunuchs (56:3-8) overturns Deuteronomic exclusion and anticipates the radical inclusivity of the early church. Chapter 55\'s invitation to "buy without money" is one of the clearest expressions of grace in the Old Testament. Chapter 58\'s definition of true fasting has been quoted in virtually every social justice movement in Jewish and Christian history.',
    relationalNote: 'The barren-woman-singing imagery (ch 54) speaks to anyone whose life has been defined by absence — absence of children, of community, of hope. God\'s promise is not just that the emptiness will end but that the one who was barren will be more fruitful than the one who never suffered.',
    conceptualNote: 'The theological arc from grace (ch 55: free water, free wine) through inclusivity (ch 56: foreigners welcomed) to ethical demand (ch 58: true fasting = justice) to confession (ch 59: our sins separate us) maps the full range of covenantal life. Grace precedes demand, but demand is not optional.',
    climateNote: 'The call to "share your food with the hungry and provide the poor wanderer with shelter" (58:7) reflects the harsh realities of post-exilic Judean life, where returnees struggled with inadequate housing, food insecurity, and exploitation by wealthier neighbors. The rebuilt Jerusalem was a fraction of its former size.',
    modernParallel: 'Chapter 58\'s redefinition of fasting directly challenges any religious community that practices personal piety while ignoring systemic injustice. The inclusion of foreigners and eunuchs challenges every community that draws lines around who belongs. The free invitation of chapter 55 challenges every economy that makes basic necessities available only to those who can pay.',
    keyQuestions: JSON.stringify([
      'How does Isaiah 56\'s inclusion of foreigners and eunuchs challenge the boundaries your community draws?',
      'What does it mean that the fast God wants is justice, not hunger?',
      'How does the invitation to "buy without money" relate to modern concepts of grace?',
      'What are the "iniquities that separate" in your context?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Come without money', target_audience: 'those who feel they have nothing to offer God', primary_theme: 'radical grace that requires no qualification' },
      { angle: 'The fast God chooses', target_audience: 'communities conflating personal piety with faithfulness', primary_theme: 'justice as the essence of worship' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 54-59. Inclusion of eunuchs/foreigners discussed in Trito-Isaiah scholarship; ch 58 fasting text central to liberation theology.'
  },

  // --- Section: Future Glory (ISA 60-66) ---
  // Existing: ch 61 (anointed-one), ch 65 (new-heavens). Missing: 60, 62-64, 66
  {
    id: 'isa-future-glory',
    title: 'Future Glory: Arise and Shine, for Your Light Has Come',
    bookId: 'ISA',
    chapterStart: 60,
    verseStart: 1,
    chapterEnd: 66,
    verseEnd: 24,
    summary: 'The final section of Isaiah opens with the command to arise and shine — Jerusalem\'s light has come and the glory of the Lord rises upon her. Nations will stream to her light and kings to the brightness of her dawn. Chapter 62 gives Jerusalem new names: "My Delight Is in Her" and "Married." The prophet declares he will not keep silent until her vindication shines like the dawn. Chapters 63-64 contain the most anguished prayer in Isaiah: "Where is your zeal and your might? Look down from heaven and see! You are our Father — Abraham does not know us, Israel does not acknowledge us — you, O Lord, are our Father." The book closes with the new heavens and new earth (ch 65), the humility God requires (66:1-2: "Heaven is my throne and earth is my footstool — what house could you build me?"), and a final vision of all nations gathering to see God\'s glory.',
    significance: 'Isaiah closes with some of the most expansive eschatological vision in the Hebrew Bible. The new heavens and new earth, the gathering of all nations, the transformation of Jerusalem into a beacon for the world — these images shaped Jewish messianic expectation and Christian eschatology profoundly. The prayer of 63-64 is one of the rawest expressions of lament in Scripture, showing that even within a book of sweeping hope, there is space for anguished questioning.',
    relationalNote: 'The renaming of Jerusalem — from abandoned to "My Delight Is in Her" — is a relational act of restoration. God is not merely rebuilding a city but restoring a relationship. The prayer of 63-64 reveals a community that feels abandoned by God and abandoned by its own ancestors, yet clings to the address "our Father" as the one thing that cannot be taken away.',
    conceptualNote: 'The final chapter\'s insistence that God cannot be contained in a temple (66:1) is a theological exclamation point on the entire book: the God who fills heaven and earth will not be domesticated by any human structure, no matter how magnificent. True worship requires a contrite and humble spirit, not a building program.',
    climateNote: 'The post-exilic community that produced the final form of Isaiah lived in a modest, struggling Jerusalem far removed from the glory of Solomon\'s era. The extravagant visions of nations streaming to Zion and wealth pouring in functioned as prophetic imagination that sustained hope in circumstances that seemed to mock it.',
    modernParallel: 'The prayer of Isaiah 63-64 is the prayer of every community that knows God\'s promises but cannot see their fulfillment — the inner-city church praying for revival in a neighborhood of boarded-up buildings, the persecuted minority clinging to hope of vindication. The vision of all nations gathering speaks to every longing for a world where difference is not a threat but a gift.',
    keyQuestions: JSON.stringify([
      'How does the renaming of Jerusalem ("My Delight Is in Her") speak to the experience of being re-defined by God?',
      'What does the raw prayer of 63-64 teach about honest lament within a tradition of hope?',
      'If heaven is God\'s throne and earth His footstool, what does that mean for our building projects?',
      'What does the vision of all nations gathering to see God\'s glory mean for religious exclusivism?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Arise and shine', target_audience: 'discouraged communities waiting for renewal', primary_theme: 'the light comes before the circumstances change' },
      { angle: 'When you cannot see the promise', target_audience: 'those in prolonged seasons of waiting', primary_theme: 'honest lament as an expression of faith' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ISA 60, 62-64, 66 (chs 61 and 65 covered by existing units). Trito-Isaiah scholarship and eschatological analysis.'
  },

  // ISA 8 standalone (included in grouping note but needs explicit coverage)
  {
    id: 'isa-waters-of-shiloah',
    title: 'The Waters of Shiloah: Gentle Streams Refused',
    bookId: 'ISA',
    chapterStart: 8,
    verseStart: 1,
    chapterEnd: 8,
    verseEnd: 22,
    summary: 'God tells Isaiah to write on a large scroll the name "Maher-Shalal-Hash-Baz" ("quick to the plunder, swift to the spoil") — another prophet-child whose name is a walking prophecy. Because the people reject the gentle, flowing waters of Shiloah (Jerusalem\'s modest water source), God will bring the mighty floodwaters of Assyria over them. Isaiah binds up his testimony among his disciples, withdraws from public ministry, and waits for the Lord who is "hiding his face from the house of Jacob." The chapter ends in darkness: those who consult mediums and spiritists will find only "distress and darkness and fearful gloom."',
    significance: 'The Shiloah waters metaphor is one of Isaiah\'s most powerful images: God\'s provision is gentle and modest, like a small spring, but the people want something more impressive. They will get what they want — the Euphrates-scale power of Assyria — and it will drown them. The passage introduces the theme of the faithful remnant who preserve testimony during a time of national blindness.',
    relationalNote: 'Isaiah\'s decision to withdraw and wait for God — to "bind up the testimony among my disciples" — models a posture of faithful patience when the public sphere has become hostile to truth. The small circle of disciples preserving the prophetic word anticipates every underground church and resistance community in history.',
    conceptualNote: 'The contrast between Shiloah (gentle) and the Euphrates (overwhelming) is a theology of how people choose their own destruction by rejecting modest provision in favor of impressive power. This is the theological principle behind Ahaz\'s entire foreign policy disaster.',
    climateNote: 'The Gihon Spring and the Shiloah channel were Jerusalem\'s primary water source — a modest flow compared to the great rivers of Mesopotamia. The Euphrates was synonymous with imperial power; the Shiloah with vulnerable dependence on God.',
    modernParallel: 'Choosing the flashy solution over the modest provision, the impressive alliance over the quiet discipline, the big-name consultant over the faithful local worker — this is the pattern Isaiah names. The floodwaters of what we choose instead of the gentle stream often overwhelm us.',
    keyQuestions: JSON.stringify([
      'What are the "gentle waters of Shiloah" in your life that you have rejected in favor of something more impressive?',
      'What does it mean that God sometimes "hides his face" — is absence itself a form of communication?',
      'How do you preserve truth when the public sphere is hostile to it?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The gentle stream refused', target_audience: 'communities tempted by flashy alternatives to faithful practices', primary_theme: 'God\'s provision often comes in modest forms' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering ISA 8. Shiloah/Euphrates contrast well established in Isaianic scholarship.'
  },

  // ═══════════════════════════════════════════════════════════
  //  JEREMIAH
  // ═══════════════════════════════════════════════════════════

  // --- Section: Early Oracles (JER 2-6) ---
  {
    id: 'jer-early-oracles',
    title: 'Early Oracles: Israel the Faithless Bride',
    bookId: 'JER',
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 6,
    verseEnd: 30,
    summary: 'Jeremiah\'s earliest preaching recalls Israel\'s honeymoon period in the wilderness — "I remember the devotion of your youth, your love as a bride" — and then documents the comprehensive betrayal that followed. Israel has exchanged the living God for gods that are no gods, like a spring of living water abandoned for cracked cisterns that hold nothing. The people have forgotten God, and the forgetting is willful. Chapters 3-4 call for repentance using the metaphor of divorce and remarriage; chapter 4 envisions the coming invasion in language that echoes Genesis 1 in reverse — the earth becomes "formless and empty," creation undone. Chapters 5-6 catalogue specific sins: oppression of the poor, treachery among friends, prophets who cry "Peace, peace" when there is no peace. Jeremiah searches Jerusalem for one honest person and cannot find one.',
    significance: 'These early oracles establish Jeremiah\'s central metaphor: Israel as an unfaithful spouse who has abandoned a loving partner for worthless alternatives. The "broken cisterns" image (2:13) is one of the most quoted in the prophetic corpus. The "un-creation" language in chapter 4 makes the theological claim that covenant violation does not merely harm the community — it disorders the entire created world.',
    relationalNote: 'The bride metaphor draws on Hosea but intensifies the emotional charge. God is not described as angry but as bewildered: "What fault did your ancestors find in me that they strayed so far?" (2:5). The relational dynamic is that of a spouse who genuinely does not understand what went wrong.',
    conceptualNote: 'The "broken cisterns" image is theologically precise. A cistern was a desperate backup plan in a land dependent on rain — you carved it out of limestone and plastered it, hoping it would hold water during the dry season. A cracked cistern holds nothing. Jeremiah is saying that idolatry is not just wrong but useless — it cannot deliver what it promises.',
    climateNote: 'Late seventh-century Judah under Josiah experienced both religious reform and geopolitical upheaval as Assyria weakened and Egypt and Babylon competed for regional dominance. Water scarcity was a constant reality in the Judean hill country, making the cistern metaphor viscerally immediate.',
    modernParallel: 'The broken cisterns image speaks to any community or individual that has abandoned a reliable source of meaning, identity, or purpose for alternatives that cannot deliver. The career that promised fulfillment but left emptiness, the ideology that promised liberation but delivered new forms of bondage, the relationship that promised everything but held nothing.',
    keyQuestions: JSON.stringify([
      'What are the "broken cisterns" in your life — things that promised to hold water but turned out to be cracked?',
      'How does the un-creation language in chapter 4 connect human sin to ecological disorder?',
      'Why do the prophets cry "Peace, peace" when there is no peace — what makes false comfort so appealing?',
      'What does it look like to return to the "devotion of your youth"?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Broken cisterns', target_audience: 'those disillusioned by things that promised more than they delivered', primary_theme: 'only the living water sustains' },
      { angle: 'Peace, peace when there is no peace', target_audience: 'communities that reward comfortable lies over hard truths', primary_theme: 'the danger of false reassurance' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 2-6. Bride/cistern metaphors central to Jeremianic scholarship.'
  },

  // --- Section: Temple Sermon and Related (JER 8-17) ---
  // Existing: ch 7 (temple-sermon). Missing: 8-17
  {
    id: 'jer-temple-consequences',
    title: 'After the Temple Sermon: Harvest Past, Summer Ended, Not Saved',
    bookId: 'JER',
    chapterStart: 8,
    verseStart: 1,
    chapterEnd: 13,
    verseEnd: 27,
    summary: 'In the aftermath of the temple sermon, Jeremiah documents a people past the point of hearing. "The harvest is past, the summer has ended, and we are not saved" — one of the most haunting lines in Scripture. The prophet weeps: "Is there no balm in Gilead? Is there no physician there?" God exposes the lies that hold society together: wise men who reject the word of the Lord, prophets and priests who offer superficial remedies, neighbors who deceive each other systematically. Chapter 10 mocks idols as scarecrows in a cucumber field. Chapter 11 reveals a plot against Jeremiah\'s life by his own townspeople of Anathoth. Chapter 12 contains Jeremiah\'s anguished complaint: "Why does the way of the wicked prosper?" Chapter 13 uses the linen belt parable — a belt buried and ruined — to illustrate how intimately God had bound Israel to himself, and how completely the relationship has rotted.',
    significance: 'This section introduces the "weeping prophet" dimension of Jeremiah\'s character. Unlike Isaiah\'s oracular distance, Jeremiah is emotionally shattered by his own message. The "balm in Gilead" question has become one of the most recognized biblical phrases, later woven into African American spirituals as a declaration that healing exists even when the prophet cannot find it. The conspiracy against Jeremiah by his own family anticipates the suffering-prophet motif that will intensify throughout the book.',
    relationalNote: 'Jeremiah\'s complaint in chapter 12 is a genuine argument with God — not rebellious but anguished. He has obeyed, suffered, and now watches the wicked thrive while he endures threats from his own family. God\'s response is not comfort but challenge: "If you have raced with men on foot and they have worn you out, how can you compete with horses?" The relationship between prophet and God here is brutally honest.',
    conceptualNote: 'The linen belt parable (ch 13) is a theology of intimacy spoiled. The belt was meant to cling to the waist — the most intimate garment. God bound Israel to himself with that closeness, and the belt has rotted through neglect. The theological insight is that covenant is not a contract filed away but a living intimacy that can decay.',
    climateNote: 'Gilead, east of the Jordan, was famous for its medicinal balm — a resin used in ancient Near Eastern medicine. Jeremiah\'s question about whether there is balm in Gilead uses the region\'s most famous export as a metaphor for healing that exists but is not being applied.',
    modernParallel: 'The "harvest is past, summer has ended, and we are not saved" captures the feeling of every missed opportunity — the relationship that might have been repaired, the reform that might have prevented collapse, the intervention that came too late. The balm in Gilead question resonates wherever healing resources exist but are inaccessible or ignored.',
    keyQuestions: JSON.stringify([
      'What does the "balm in Gilead" represent — is healing available but refused, or genuinely absent?',
      'How does Jeremiah\'s argument with God in chapter 12 model honest faith?',
      'What does the linen belt parable teach about the nature of covenant intimacy?',
      'Where in your life has the harvest passed and summer ended?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Is there no balm in Gilead?', target_audience: 'communities searching for healing', primary_theme: 'the anguish of available-but-unapplied healing' },
      { angle: 'Racing with horses', target_audience: 'those overwhelmed by escalating demands', primary_theme: 'God\'s call to deeper endurance' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 8-13. Balm of Gilead cultural significance well attested in ANE medical texts.'
  },

  // --- Section: Laments (JER 14-17, 19) ---
  {
    id: 'jer-laments',
    title: 'The Laments: Drought, Despair, and the Heart\'s Deceit',
    bookId: 'JER',
    chapterStart: 14,
    verseStart: 1,
    chapterEnd: 17,
    verseEnd: 27,
    summary: 'Drought devastates the land and Jeremiah intercedes, but God forbids him to pray for the people — three times. The false prophets promise peace and plenty; God says He did not send them and their prophecies are lies. Jeremiah\'s own suffering intensifies: "Cursed be the day I was born!" He wishes he had never been a prophet, yet cannot stop because the word is "a fire shut up in my bones." Chapter 16 forbids Jeremiah from marrying or attending funerals or feasts — his entire social life becomes a prophetic sign of the devastation coming. Chapter 17 delivers the famous diagnosis: "The heart is deceitful above all things, and desperately sick — who can understand it?" followed immediately by the image of the person who trusts in the Lord as a tree planted by water, whose roots reach the stream and whose leaves stay green even in drought.',
    significance: 'The prohibition against Jeremiah marrying is one of the most personally costly prophetic signs in Scripture — his loneliness is the message. The "deceitful heart" diagnosis (17:9) has become one of the most quoted verses in the Bible, forming the anthropological foundation for doctrines of original sin. Yet it is paired with the tree-by-water image, insisting that the cure for the deceitful heart is not self-improvement but trust in the Lord.',
    relationalNote: 'Jeremiah is forbidden from the three basic social activities that create human community: marriage, mourning, and celebration. His isolation is not ascetic withdrawal but prophetic performance — the community itself is about to lose all of these things. The prophet bears the future in his body before it arrives in history.',
    conceptualNote: 'The tree-by-water image in 17:7-8 is a deliberate echo of Psalm 1, but placed in a more extreme context. The drought is real, not hypothetical. Jeremiah is saying that the person who trusts God is not exempt from drought but survives it because their roots reach a deeper source.',
    climateNote: 'Drought was the most feared natural disaster in Judah\'s rain-dependent agriculture. The description in chapter 14 — cracked ground, farmers covering their heads in shame, wild donkeys panting on bare heights — reflects the brutal reality of failed rains in a semi-arid climate.',
    modernParallel: 'The person forbidden from marrying, mourning, or celebrating because their entire life must be a warning sign is the whistleblower whose career, friendships, and social life are consumed by the truth they carry. The "deceitful heart" diagnosis speaks to every therapeutic tradition that recognizes human beings are not reliable narrators of their own motivations.',
    keyQuestions: JSON.stringify([
      'What does it mean that God forbade Jeremiah from praying for the people?',
      'How does Jeremiah\'s celibacy function as a prophetic sign?',
      'What is the relationship between the "deceitful heart" and the "tree by water" — is the cure for self-deception trust?',
      'Where is the "fire in your bones" — the truth you cannot stop speaking?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The fire in your bones', target_audience: 'those compelled to speak uncomfortable truth', primary_theme: 'prophetic calling as inescapable burden' },
      { angle: 'The tree by water in the drought', target_audience: 'those enduring spiritual dry seasons', primary_theme: 'hidden roots that sustain through visible barrenness' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 14-17 (ch 19 symbolic act included thematically). Jeremiah\'s confessions scholarship from Bright, Brueggemann, O\'Connor.'
  },

  // JER 19 standalone — symbolic act
  {
    id: 'jer-broken-jar',
    title: 'The Broken Jar: Beyond Repair',
    bookId: 'JER',
    chapterStart: 19,
    verseStart: 1,
    chapterEnd: 19,
    verseEnd: 15,
    summary: 'God tells Jeremiah to buy a clay jar, gather the elders and priests, go to the Valley of Ben Hinnom — the site of child sacrifice — and smash the jar in their presence. "I will smash this nation and this city as one smashes a potter\'s vessel, so that it can never be mended." Unlike the potter\'s wheel episode in chapter 18 where the clay could be reshaped, the fired jar cannot be reformed. It can only be broken. The message is that the window for repentance has closed for this generation.',
    significance: 'The contrast between the potter\'s wheel (ch 18, where reshaping is possible) and the smashed jar (ch 19, where it is not) is theologically crucial. It introduces the terrible possibility that a point of no return exists — not because God is unwilling to forgive, but because the community has hardened beyond the capacity to change.',
    relationalNote: 'Jeremiah performs this act before the leaders who could have changed course but chose not to. The smashing is a public grief act — not vindictive but mournful. The Valley of Ben Hinnom, where children had been sacrificed to Molech, is chosen deliberately: the leaders are confronted with the worst thing they have done.',
    conceptualNote: 'The theology of irreversibility is one of the most difficult concepts in prophetic literature. It does not negate divine mercy but acknowledges that human choices have real consequences and that some damage cannot be undone, only endured and survived.',
    climateNote: 'The Valley of Ben Hinnom (Gehenna) south of Jerusalem was the site of the Tophet, where child sacrifice had been practiced. By Jeremiah\'s time it had become a garbage dump — the association with burning and corruption later gave its name to the New Testament concept of hell.',
    modernParallel: 'The smashed jar is the relationship that cannot be repaired, the institution that has been so corrupted it must be dissolved rather than reformed, the environmental damage that is irreversible. It is the hardest prophetic message: sometimes the question is not how to fix things but how to survive what cannot be fixed.',
    keyQuestions: JSON.stringify([
      'What distinguishes the potter\'s wheel (ch 18) from the smashed jar (ch 19)?',
      'Is there a point of no return in communities and relationships?',
      'Why does Jeremiah choose the Valley of Ben Hinnom for this act?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Beyond the potter\'s wheel', target_audience: 'communities facing irreversible consequences', primary_theme: 'when repair is no longer possible, grief and survival become the task' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering JER 19. Potter/jar contrast central to Jeremianic theology of judgment.'
  },

  // --- Section: Judgment Oracles (JER 21-28) ---
  // Existing: ch 29 (letter-to-exiles). Missing: 21-28
  {
    id: 'jer-judgment-oracles',
    title: 'Judgment Oracles: Kings, Prophets, and the Basket of Figs',
    bookId: 'JER',
    chapterStart: 21,
    verseStart: 1,
    chapterEnd: 28,
    verseEnd: 17,
    summary: 'Zedekiah sends messengers to Jeremiah asking for a miracle against Babylon, and Jeremiah\'s answer is devastating: God himself is fighting against you. The following chapters evaluate Judah\'s kings — Shallum, Jehoiakim, Coniah — and find them wanting. The good shepherd God will raise up is contrasted with the shepherds who scatter the flock. Chapter 23 turns its fury on the false prophets: "I did not send them, yet they ran; I did not speak to them, yet they prophesied." Chapter 24\'s vision of two baskets of figs — good and bad — makes the counterintuitive claim that those already in exile are the good figs, and those remaining in Jerusalem are the bad. Chapters 25-28 chronicle Jeremiah\'s deepening conflict with the establishment: the cup of God\'s wrath for all nations, the threat of death for his temple preaching, the yoke he wears to symbolize Babylonian servitude, and the confrontation with the false prophet Hananiah who breaks the yoke and dies.',
    significance: 'The basket-of-figs vision (ch 24) overturns every assumption about who is blessed and who is cursed. The exiles — the defeated, displaced people — are God\'s future. Those who remained in Jerusalem and thought they were the lucky ones are headed for destruction. This inversion of apparent fortune is one of the most important theological moves in the prophets. The Hananiah episode (ch 28) dramatizes the deadly serious question of how to distinguish true prophecy from false.',
    relationalNote: 'The confrontation with Hananiah is a study in competing prophetic authorities. Both claim to speak for God. Hananiah says what the people want to hear — the exile will be short, the temple vessels will return soon. Jeremiah says what no one wants to hear — the exile will be long, submit to Babylon. The relational question is: how do you trust the prophet who brings bad news?',
    conceptualNote: 'The "good figs" theology inverts the prosperity gospel of Jeremiah\'s day. Being in exile — displaced, defeated, humiliated — is paradoxically the position of blessing because it is the position of truth. Those who remain in Jerusalem live in a delusion of security. This pattern — God working through apparent defeat rather than apparent victory — becomes a central motif in biblical theology.',
    climateNote: 'The fig harvest was a major agricultural event in Judah. Good figs were a prized commodity; rotten figs were worthless. The basket vision uses everyday agricultural experience to make a theological point that would have shocked its audience.',
    modernParallel: 'The good-figs-in-exile principle speaks to every situation where the people who seem to have lost are actually better positioned for the future than the people who seem to have won. The company that downsized and forced its best people into the job market, where they found better positions. The community that was displaced and built something more resilient in the new location.',
    keyQuestions: JSON.stringify([
      'How do you distinguish a true prophet from a false one when both claim to speak for God?',
      'What does the good-figs vision teach about the relationship between apparent fortune and actual blessing?',
      'Why does Jeremiah wear a yoke — what does embodied prophecy accomplish that words alone cannot?',
      'Where have you seen God work through apparent defeat rather than apparent victory?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Good figs in exile', target_audience: 'those who feel displaced or defeated', primary_theme: 'God\'s future is often located where we least expect it' },
      { angle: 'When the false prophet breaks the yoke', target_audience: 'communities navigating competing authorities', primary_theme: 'discerning truth from what we merely wish were true' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 21-28. True/false prophecy criteria from Deut 18 and Jer 28 widely discussed in scholarship.'
  },

  // --- Section: Book of Comfort (JER 30, 33) ---
  // Existing: ch 31 (new-covenant), ch 32 (buying-the-field). Missing: 30, 33
  {
    id: 'jer-book-of-comfort',
    title: 'The Book of Comfort: Incurable Wound, Unbreakable Promise',
    bookId: 'JER',
    chapterStart: 30,
    verseStart: 1,
    chapterEnd: 30,
    verseEnd: 24,
    summary: 'God tells Jeremiah to write his words in a book because "days are coming when I will restore the fortunes of my people." The diagnosis is brutal honesty: "Your wound is incurable, your injury beyond healing." But the treatment is equally direct: "I will restore you to health and heal your wounds." The chapter describes a terror that will be transformed — Jacob\'s trouble from which he will be saved. The oppressors will be devoured, the scatterers scattered, the wounded healed. God will punish those who injured Israel but will also discipline Israel with justice, not leaving it wholly unpunished. The promise is not cheap grace but costly restoration.',
    significance: 'Chapter 30 establishes the paradox at the heart of the Book of Comfort: the wound is incurable AND God will heal it. This is not contradiction but the deepest kind of theological honesty — acknowledging that the damage is real, total, and beyond human remedy, while insisting that divine initiative operates precisely in the space where human effort has exhausted itself.',
    relationalNote: 'The doctor-patient metaphor runs through this chapter. God acknowledges the severity of the wound — "all your allies have forgotten you, they care nothing for you" — before prescribing the treatment. The relational dynamic is honesty before healing: no false comfort, no minimizing the damage, but also no despair.',
    conceptualNote: 'The theology of "incurable wound, divine healing" operates at the boundary of possibility. Jeremiah never says the wound is not real or not serious. He says that the healer is greater than the wound. This is hope without denial — the hardest and most necessary kind.',
    climateNote: 'The late seventh-century Judean context was one of escalating crisis as Babylon replaced Assyria as the dominant Near Eastern power. Jeremiah\'s promise of restoration would have been spoken to people watching their world collapse in real time.',
    modernParallel: 'The "incurable wound" that God nevertheless heals speaks to recovery from addiction, trauma, systemic racism, generational poverty — situations that are genuinely beyond human remedy but not beyond divine initiative. The refusal to minimize the damage while insisting on hope is the posture every honest counselor, physician, and pastor must inhabit.',
    keyQuestions: JSON.stringify([
      'How can a wound be both incurable and healed?',
      'What does it mean that God disciplines "with justice" rather than leaving unpunished?',
      'Where have you seen restoration that seemed impossible until it happened?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The incurable wound', target_audience: 'those dealing with damage that seems beyond repair', primary_theme: 'divine healing operates where human effort is exhausted' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering JER 30. Book of Comfort analysis from Brueggemann, Fretheim, Lundbom.'
  },

  {
    id: 'jer-covenant-renewed',
    title: 'The Renewed Covenant: A Future Built on Faithfulness',
    bookId: 'JER',
    chapterStart: 33,
    verseStart: 1,
    chapterEnd: 33,
    verseEnd: 26,
    summary: 'While Jeremiah is still confined in the courtyard of the guard — imprisoned for his prophesying — God tells him to call out and He will answer. The coming restoration is described in concrete terms: the streets of Jerusalem, now desolate, will again hear the sounds of joy and gladness, the voices of bride and bridegroom. A righteous Branch will spring from David\'s line. The Levitical priests will never lack a descendant to serve. God\'s covenant with day and night — the fixed order of creation — is given as the guarantee of His covenant with David. If the natural order can be broken, then the promise can be broken. Since it cannot, the promise stands.',
    significance: 'Chapter 33 ties the covenant promise to the reliability of creation itself. This is one of the most audacious claims in Scripture: God\'s faithfulness to His people is as certain as the alternation of day and night. The passage also extends the promise beyond the royal line to the Levitical priesthood, ensuring that both governance and worship will be restored.',
    relationalNote: 'Jeremiah receives this promise while in prison — the most constrained circumstances imaginable. The God who speaks about restoring streets and cities speaks to a man who cannot walk freely. The relational message is that divine promises are not contingent on the prophet\'s circumstances.',
    conceptualNote: 'Anchoring the covenant in creation\'s fixed order (day/night, heaven/earth) elevates the promise from historical contingency to cosmological certainty. This is not a political forecast but a creational guarantee.',
    climateNote: 'Jerusalem under siege was a city of rationed food, closed markets, and empty streets. The promise of joy, gladness, and wedding celebrations would have been the most vivid possible contrast to the desolation Jeremiah\'s audience was living through.',
    modernParallel: 'Receiving promises of restoration while sitting in a prison cell is the experience of every visionary who can see what is coming but cannot yet walk into it. The appeal to creation\'s reliability — sunrise and sunset as guarantees — offers a foundation for hope that does not depend on current circumstances.',
    keyQuestions: JSON.stringify([
      'What does it mean that God\'s covenant faithfulness is tied to the reliability of creation?',
      'How does receiving the promise in prison change its meaning?',
      'What "sounds of joy" have gone silent in your context, and what would their return look like?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Promises from prison', target_audience: 'those in constrained circumstances who need long-range hope', primary_theme: 'divine promises are not limited by present conditions' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering JER 33. Creation-covenant linkage discussed in Brueggemann and Fretheim.'
  },

  // --- Section: Final Days of Judah (JER 34-38) ---
  // Missing: 34-38
  {
    id: 'jer-final-days',
    title: 'The Final Days: Scrolls Burned, Prophets Imprisoned',
    bookId: 'JER',
    chapterStart: 34,
    verseStart: 1,
    chapterEnd: 38,
    verseEnd: 28,
    summary: 'The last years of Judah unfold in escalating chaos. King Zedekiah proclaims freedom for Hebrew slaves during the Babylonian siege — then reverses the decree when the siege temporarily lifts, revealing the cynicism beneath the piety. The Rechabites, who faithfully keep their ancestor\'s command to abstain from wine and live in tents, become a rebuke to a nation that cannot keep any promise. Chapter 36 records the dramatic scroll episode: Jeremiah dictates his prophecies, Baruch reads them in the temple, and King Jehoiakim cuts off column after column with a penknife and feeds them to the fire. Jeremiah simply dictates them again, with additions. Chapters 37-38 chronicle Jeremiah\'s arrest, imprisonment in a cistern (he sinks into the mud), and rescue by Ebed-Melech, an Ethiopian official who risks his career to save the prophet.',
    significance: 'The scroll-burning episode (ch 36) is one of the most important passages in the Bible for understanding how Scripture itself was formed. A king can destroy the physical text, but the word regenerates — Jeremiah dictates it again with more material. The Ebed-Melech rescue (ch 38) is remarkable: the person who saves God\'s prophet is a foreign court official, not an Israelite — a pattern of outsiders showing faithfulness that insiders refuse.',
    relationalNote: 'Ebed-Melech\'s intervention is one of the most moving acts of courage in the Bible. He goes to the king, argues for Jeremiah\'s life, and personally hauls the prophet out of the cistern with rags under the ropes so they will not cut his armpits. The detail about the rags is not incidental — it reveals a person who cares not just about the rescue but about the rescued person\'s dignity and comfort.',
    conceptualNote: 'The theology of the indestructible word — burned by the king but dictated again — establishes a principle that reverberates through every subsequent attempt to suppress Scripture. The word of God is not dependent on any single physical copy. It survives the fire because its source is not the scroll but the God who speaks.',
    climateNote: 'The cistern into which Jeremiah was thrown was a water-storage pit that had gone dry, leaving only mud at the bottom. In a city under siege, water cisterns became prisons because they were deep, secure, and no longer needed for their original purpose.',
    modernParallel: 'Jehoiakim cutting and burning the scroll is every authority that suppresses inconvenient reports, bans books, or silences whistleblowers. Ebed-Melech is every bystander who becomes an ally — the colleague who speaks up at cost, the official who uses their position to protect the vulnerable. The rags under the ropes are the small acts of care that distinguish genuine rescue from merely efficient extraction.',
    keyQuestions: JSON.stringify([
      'What does the scroll-burning episode teach about the relationship between Scripture and political power?',
      'Why is it a foreign official who saves Jeremiah — what does this say about who is faithful?',
      'What are the "rags under the ropes" in your acts of care — the details that honor dignity?',
      'How does the Rechabites\' faithfulness to their ancestor shame a nation that cannot keep its covenant?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The word that survives the fire', target_audience: 'communities where truth is being suppressed', primary_theme: 'God\'s word cannot be destroyed by human authority' },
      { angle: 'Rags under the ropes', target_audience: 'anyone in a position to help the vulnerable', primary_theme: 'rescue that preserves dignity' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 34-38. Scroll formation in ch 36 important for canon history; Ebed-Melech episode widely discussed in postcolonial readings.'
  },

  // --- Section: Fall and Aftermath (JER 40-45) ---
  // Existing: ch 39 (fall-of-jerusalem-jeremiah). Missing: 40-45
  {
    id: 'jer-fall-aftermath',
    title: 'After the Fall: Gedaliah, Flight to Egypt, and Baruch\'s Grief',
    bookId: 'JER',
    chapterStart: 40,
    verseStart: 1,
    chapterEnd: 45,
    verseEnd: 5,
    summary: 'Jerusalem has fallen. Nebuchadnezzar releases Jeremiah and appoints Gedaliah as governor over the remnant. For a brief moment, there is hope — scattered Judeans begin returning, the harvest is gathered. Then Ishmael assassinates Gedaliah, and the fragile recovery collapses. The surviving community, terrified of Babylonian reprisal, asks Jeremiah to pray for guidance. God says: stay in the land and I will build you up. The people ask for God\'s word and then refuse it, fleeing to Egypt instead and dragging Jeremiah with them. In Egypt, they return to worshipping the Queen of Heaven, and Jeremiah prophesies against them to the end. Chapter 45 is a brief, tender word to Baruch, Jeremiah\'s faithful scribe, who has been grieving: "Should you then seek great things for yourself? Do not seek them."',
    significance: 'The post-fall narrative is one of the most psychologically realistic sections of the Bible. The people ask for God\'s word, promise to obey it, receive it, and immediately disobey — a devastating portrait of how trauma and fear override even genuine spiritual intention. The word to Baruch (ch 45) is one of the most overlooked gems in Scripture: a personal pastoral word to the faithful companion who has carried the prophet\'s burden without receiving any glory.',
    relationalNote: 'The relationship between Jeremiah and the remnant reaches its most painful point here: they ask for his intercession, receive God\'s answer, and do the opposite. Jeremiah is dragged to Egypt against his will, still prophesying to people who will not listen. The word to Baruch reveals the prophet\'s awareness that his helper is suffering too.',
    conceptualNote: 'The theological principle that asking for God\'s word does not guarantee obedience to it is painfully illustrated here. The community\'s flight to Egypt — the very place from which God originally delivered Israel — is a symbolic un-Exodus, a reversal of the foundational salvation narrative.',
    climateNote: 'The remnant\'s flight to Egypt brought them to the Nile Delta region, a completely different agricultural environment from the Judean hill country. The contrast between the land God promised and the land they chose is geographically stark.',
    modernParallel: 'Asking for advice you have already decided not to follow, commissioning a study whose conclusions you will ignore, praying for guidance while your bags are already packed — this is the dynamic Jeremiah describes. The word to Baruch speaks to every faithful assistant, associate pastor, or secondary leader who has poured themselves out for someone else\'s calling and wonders if their own pain matters to God.',
    keyQuestions: JSON.stringify([
      'Why do the people ask for God\'s word and then disobey it?',
      'What does the flight to Egypt symbolize in the context of Israel\'s Exodus story?',
      'What does God\'s personal word to Baruch teach about divine attention to secondary figures?',
      'Where have you asked for guidance while already knowing what you planned to do?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The un-Exodus', target_audience: 'communities going backward instead of forward', primary_theme: 'fear-driven reversals of God\'s deliverance' },
      { angle: 'A word for Baruch', target_audience: 'faithful servants in the background', primary_theme: 'God sees the one who carries the prophet\'s burden' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 40-45. Post-fall narrative and Baruch colophon discussed in Lundbom, Stulman, O\'Connor.'
  },

  // --- Section: Oracles Against Nations (JER 46-51) ---
  {
    id: 'jer-oracles-against-nations',
    title: 'Oracles Against the Nations: Egypt, Babylon, and All Between',
    bookId: 'JER',
    chapterStart: 46,
    verseStart: 1,
    chapterEnd: 51,
    verseEnd: 64,
    summary: 'Jeremiah\'s oracles against the nations form a vast panorama of divine judgment on the ancient world: Egypt\'s armies broken at Carchemish, Philistia overwhelmed, Moab\'s pride shattered, Ammon judged, Edom laid waste, Damascus trembling, and Babylon — the empire that was God\'s instrument of judgment — itself judged and destroyed. The Babylon oracle (chs 50-51) is the longest and most elaborate: the nation that conquered the world will be conquered, the hammer of the whole earth will be broken. Jeremiah writes the oracle on a scroll, ties it to a stone, and has Seraiah throw it into the Euphrates: "So shall Babylon sink, to rise no more."',
    significance: 'These oracles establish that God\'s judgment is not tribal but universal. The same God who judged Judah now judges Judah\'s oppressors. Babylon, despite being God\'s instrument, is not exempt from moral accountability. The scroll-and-stone ceremony at the Euphrates is one of the most dramatic prophetic acts in Scripture — a physical enactment of Babylon\'s submersion.',
    relationalNote: 'As with Isaiah\'s oracles against the nations, Jeremiah\'s pronouncements occasionally include compassion for the judged: "My heart moans for Moab" (48:36). The prophet does not celebrate destruction even of those who deserve it.',
    conceptualNote: 'The theology of the instrument judged — Babylon used by God and then destroyed by God — prevents any nation from claiming divine mandate as a permanent status. Being used by God for one purpose does not confer immunity from God\'s judgment on other matters.',
    climateNote: 'The Battle of Carchemish (605 BCE) where Nebuchadnezzar defeated Pharaoh Necho is one of the most significant battles in ancient Near Eastern history, establishing Babylonian dominance. The Euphrates, into which the scroll is thrown, was Babylon\'s lifeline.',
    modernParallel: 'Every empire that serves as an instrument of historical change and then assumes its own permanence is Babylon. The scroll sinking into the Euphrates is the prophetic declaration that no human power, however useful to divine purpose at one moment, is entitled to exist forever.',
    keyQuestions: JSON.stringify([
      'What does it mean that God judges the instrument He used for judgment?',
      'How does the scroll-in-the-Euphrates ceremony function as prophetic theater?',
      'Why does Jeremiah mourn for Moab even as he announces its destruction?',
      'What empires in our time might be instruments God uses and simultaneously judges?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The hammer broken', target_audience: 'those living under powerful institutions', primary_theme: 'no human power is permanent' },
      { angle: 'Mourning the enemy', target_audience: 'communities in conflict', primary_theme: 'prophetic compassion extends even to those under judgment' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering JER 46-51. Carchemish battle historicity from Neo-Babylonian chronicles.'
  },

  // --- Section: Appendix (JER 52) ---
  {
    id: 'jer-appendix',
    title: 'The Appendix: Jerusalem\'s Fall by the Numbers',
    bookId: 'JER',
    chapterStart: 52,
    verseStart: 1,
    chapterEnd: 52,
    verseEnd: 34,
    summary: 'The final chapter is a historical appendix paralleling 2 Kings 25: Jerusalem besieged, the walls breached, Zedekiah captured and blinded after watching his sons executed, the temple looted and burned, the population deported. The chapter ends with a strange grace note: King Jehoiachin, exiled to Babylon decades earlier, is released from prison and given a seat at the Babylonian king\'s table. After all the destruction, the last image in Jeremiah is a captive king eating at a foreign table — a tiny, ambiguous sign that the story is not over.',
    significance: 'The inclusion of Jehoiachin\'s release as the final word of Jeremiah is a deliberate editorial choice. After fifty-one chapters of judgment, lament, and destruction, the book ends not with a bang but with a quiet act of mercy toward an exiled king. It functions as a whispered promise: if God can keep a king alive in Babylon, God can keep the covenant alive too.',
    relationalNote: 'Jehoiachin eating at the king\'s table is an image of survival through hospitality. Even in exile, even after everything, someone sets a place for you. The editorial decision to end here rather than with the destruction suggests that the final word belongs to mercy, not judgment.',
    conceptualNote: 'The detailed inventory of temple objects looted by the Babylonians — the bronze pillars, the basins, the gold and silver utensils — is a theology of loss made concrete. Every item represents a connection to the worship life that defined the community. Their removal is not just theft but spiritual amputation.',
    climateNote: 'The siege of Jerusalem lasted eighteen months (588-586 BCE), during which famine became so severe the text hints at cannibalism. The Babylonian destruction left the city uninhabitable for decades.',
    modernParallel: 'The inventory of what was lost speaks to every community that has catalogued its losses after disaster. The tiny grace note of Jehoiachin at the table speaks to every family that has endured the worst and found one small reason to keep going — the phone call, the letter, the small kindness that said the story was not finished.',
    keyQuestions: JSON.stringify([
      'Why does the book of Jeremiah end with Jehoiachin eating at a foreign king\'s table?',
      'What does the inventory of temple objects teach about how communities process loss?',
      'Where do you see small signs of mercy after comprehensive destruction?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'A place at the table', target_audience: 'those who have lost nearly everything', primary_theme: 'mercy as the quiet last word after judgment' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering JER 52. Jehoiachin release confirmed by Babylonian ration tablets discovered at Babylon.'
  },

  // ═══════════════════════════════════════════════════════════
  //  LAMENTATIONS
  // ═══════════════════════════════════════════════════════════

  // Missing: LAM 2, 4
  {
    id: 'lam-gods-anger-poured-out',
    title: 'God\'s Anger Poured Out: The Lord as Enemy',
    bookId: 'LAM',
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 2,
    verseEnd: 22,
    summary: 'The second poem makes the most disturbing claim in the book: God himself has become Israel\'s enemy. "The Lord has swallowed up without mercy all the dwellings of Jacob." He has broken down his own temple, destroyed his own altar, rejected his own king and priest. Children faint in the streets. Mothers eat their own children. The prophets find no vision from the Lord. This chapter refuses to blame only Babylon — it insists that God is the active agent of destruction. The poet does not explain or justify this; he simply describes it, and the description is nearly unbearable. The chapter ends with an anguished appeal: "Look, Lord, and consider: Whom have you ever treated like this?"',
    significance: 'Lamentations 2 is one of the most theologically daring passages in Scripture because it attributes the destruction directly to God rather than merely permitting it through human agents. This is not theodicy (explaining why God allows evil) but anti-theodicy (refusing to explain and instead confronting God with the horror). The chapter gives biblical warrant for honest, even accusatory, prayer in the face of catastrophe.',
    relationalNote: 'The chapter\'s central relational crisis is that the one who was supposed to protect has become the destroyer. This is the dynamic of betrayal at the highest level — not a stranger hurting you, but the one you trusted most. The mothers eating their children is the most extreme image of a world turned completely upside down.',
    conceptualNote: 'The theology of divine wrath in this chapter is not abstract doctrine but lived experience processed through poetry. The poet does not theologize about wrath — he catalogs its effects on bodies, buildings, and communities. This insistence on concreteness prevents wrath from becoming a comfortable theological category.',
    climateNote: 'The destruction of Jerusalem in 586 BCE left the city a smoldering ruin. Archaeological evidence confirms massive destruction layers. The famine described was a direct consequence of the eighteen-month siege.',
    modernParallel: 'This chapter speaks to anyone who has experienced destruction from a source they trusted — the church leader who abused, the institution that failed, the God who seemed absent. The permission to say "Lord, look at what you have done" is itself a form of faith — you do not accuse someone you have stopped believing in.',
    keyQuestions: JSON.stringify([
      'What does it mean to say God has become Israel\'s enemy — is this literally true or poetically true?',
      'How does directly accusing God function as an act of faith rather than unfaith?',
      'What does this chapter offer to people who feel God has actively harmed rather than helped them?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When God seems like the enemy', target_audience: 'those experiencing faith crisis after trauma', primary_theme: 'honest accusation as a form of relationship with God' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering LAM 2. Anti-theodicy framework from Brueggemann; destruction archaeology from Lipschits.'
  },

  {
    id: 'lam-siege-horrors',
    title: 'The Siege\'s Horrors: Gold Grown Dim',
    bookId: 'LAM',
    chapterStart: 4,
    verseStart: 1,
    chapterEnd: 4,
    verseEnd: 22,
    summary: 'The fourth poem opens with the image of gold growing dim and sacred gems scattered at every street corner — everything that was precious has been degraded. Princes who were once "purer than snow, whiter than milk" are now blacker than soot, unrecognized in the streets. Children beg for bread and no one gives. The wealthy dig through garbage. The famine is described in merciless detail: mothers\' hands cooking their own children. The prophets and priests whose sins brought this — shedding innocent blood in the city — now wander blind and defiled through the streets, untouchable. The chapter ends with a word to Edom, who gloated over Jerusalem\'s fall: your turn is coming.',
    significance: 'Chapter 4 is the most graphic account of siege conditions in the Bible. It functions as both historical testimony and theological reflection on how quickly a society can collapse from prosperity to cannibalism. The blame placed on religious leaders — prophets and priests who shed innocent blood — is the most direct indictment of religious leadership in the Lamentations collection.',
    relationalNote: 'The reversal of social status — princes unrecognizable, the wealthy scavenging — reveals how fragile social hierarchies are. The community\'s structure has completely collapsed. The only stable relationship left is the appeal to God that runs through the poem.',
    conceptualNote: 'The image of gold growing dim is a theology of desacralization — what was set apart and precious has been profaned. The sacred objects, the anointed leaders, the holy city — all degraded. This is the opposite of consecration, and the poet does not look away.',
    climateNote: 'The conditions described — famine, thirst, physical degradation — are consistent with archaeological and historical evidence of prolonged siege warfare in the ancient Near East. Food supplies within a walled city could be exhausted in months.',
    modernParallel: 'Every society that imagines its prosperity is permanent, its institutions unshakable, its leaders untouchable — this chapter is the counter-testimony. The speed of collapse from "purer than snow" to "blacker than soot" mirrors modern situations where seemingly stable societies have descended into chaos within months.',
    keyQuestions: JSON.stringify([
      'What does it mean for gold to "grow dim" — what happens when what was sacred is profaned?',
      'Why does the chapter single out prophets and priests for blame?',
      'How quickly can a prosperous society collapse, and what does that teach about false security?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When the gold grows dim', target_audience: 'communities watching institutions decline', primary_theme: 'the fragility of human achievement without divine foundation' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering LAM 4. Siege warfare conditions from Oded Lipschits and Assyriological sources.'
  },

  // ═══════════════════════════════════════════════════════════
  //  EZEKIEL
  // ═══════════════════════════════════════════════════════════

  // Missing: 4-9, 12-33, 35, 38, 39
  // Existing: 1-3 (call), 10-11 (glory departs), 34 (shepherds), 36 (new heart), 37 (dry bones), 40-48 (temple/river)

  // --- Ezekiel: Siege Signs (EZK 4-7) ---
  {
    id: 'ezk-siege-signs',
    title: 'Signs of Siege: The Prophet\'s Body as Warning',
    bookId: 'EZK',
    chapterStart: 4,
    verseStart: 1,
    chapterEnd: 7,
    verseEnd: 27,
    summary: 'God commands Ezekiel to perform a series of bizarre prophetic acts that use his own body as a billboard. He lies on his left side for 390 days (for Israel\'s sin) and his right side for 40 days (for Judah\'s). He cooks his food over dung. He shaves his head and divides the hair into thirds — burned, struck with a sword, scattered to the wind. He digs through a wall and carries his belongings out like a refugee, acting out the exile before it happens. Chapters 6-7 declare the end: "The end has come upon the four corners of the land." Idolatrous high places will be destroyed, and the people will know that God is the Lord — a refrain that will echo through the entire book.',
    significance: 'Ezekiel\'s sign-acts are the most extreme forms of embodied prophecy in the Bible. The prophet does not merely describe the siege — he lives a miniature version of it. This raises profound questions about the cost of prophetic calling and the power of performative speech. The repeated phrase "then they will know that I am the Lord" reveals Ezekiel\'s central theological concern: divine recognition through judgment.',
    relationalNote: 'Ezekiel\'s sign-acts would have been performed before the exilic community in Babylon — people who had already lost everything and were watching the prophet act out an even worse version of what was happening to those still in Jerusalem. The emotional impact on the audience must have been devastating.',
    conceptualNote: 'The theology of "knowing the Lord" through judgment is a challenging concept. Ezekiel insists that God\'s primary purpose in allowing destruction is not punishment for its own sake but revelation — forcing recognition of divine reality upon a people who have spent generations ignoring it.',
    climateNote: 'Ezekiel performed these signs in the exilic community at Tel-Abib by the Kebar River in Babylon, present-day Iraq. The flat Mesopotamian landscape was utterly different from the Judean hills, adding to the disorientation of exile.',
    modernParallel: 'The prophet who uses their own body as a protest sign — the hunger striker, the person who chains themselves to a tree, the monk who self-immolates — stands in the tradition of Ezekiel\'s sign-acts. The question these acts raise is whether the message is worth the cost to the messenger.',
    keyQuestions: JSON.stringify([
      'What does it mean to use your body as a prophetic message?',
      'How does "then they will know that I am the Lord" reframe the purpose of judgment?',
      'What is the emotional impact of watching someone act out your worst fears?',
      'Where do we see embodied protest in our own era?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The body as the message', target_audience: 'those called to costly witness', primary_theme: 'prophetic calling as embodied truth-telling' },
      { angle: 'The end of denial', target_audience: 'communities avoiding hard realities', primary_theme: 'judgment as forced recognition' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering EZK 4-7. Ezekiel sign-act analysis from Greenberg, Block, and Zimmerli.'
  },

  // --- Ezekiel: Temple Abominations (EZK 8-9) ---
  {
    id: 'ezk-temple-abominations',
    title: 'Temple Abominations: What Happens Behind Closed Doors',
    bookId: 'EZK',
    chapterStart: 8,
    verseStart: 1,
    chapterEnd: 9,
    verseEnd: 11,
    summary: 'In a visionary transport, God seizes Ezekiel by the hair and carries him to Jerusalem\'s temple. What he sees is a tour of escalating horror: an idol of jealousy at the entrance, seventy elders burning incense to crawling things and detestable animals painted on the walls ("each at the shrine of his own idol"), women weeping for the Mesopotamian deity Tammuz, and twenty-five men worshipping the sun with their backs turned to the temple of the Lord. Each scene is worse than the last, and each is accompanied by "You will see still greater abominations." Then six executioners appear, and a man dressed in linen marks the foreheads of those who grieve over the abominations — everyone else is slaughtered. The city runs with blood.',
    significance: 'This vision reveals what Israel\'s worship had actually become behind the temple\'s public facade. The escalating abominations show that idolatry was not a fringe activity but an institutional reality involving the nation\'s leaders. The mark on the foreheads of the grievers (ch 9) is one of the earliest "seal of God" images, later echoed in Revelation 7.',
    relationalNote: 'The elders worship their idols in dark rooms saying "The Lord does not see us; the Lord has forsaken the land." This is the logic of practical atheism — not denying God\'s existence but denying God\'s attention. The relational breach is not that they have stopped believing but that they have stopped caring whether God watches.',
    conceptualNote: 'The vision exposes the gap between public religion and private practice. The temple looked functional from the outside, but inside it had become a gallery of competing idolatries. This is a permanent warning against confusing institutional survival with spiritual health.',
    climateNote: 'The Tammuz cult was a Mesopotamian fertility religion involving ritual mourning for a dying-and-rising god. Its presence in the Jerusalem temple reflects the deep syncretistic penetration of Babylonian religion into Judean practice.',
    modernParallel: 'The temple that looks active from the outside but is hollow inside is every institution whose public image conceals internal corruption — the company with a stunning lobby and toxic culture, the church with excellent programming and abusive leadership, the democracy with free elections and purchased legislators.',
    keyQuestions: JSON.stringify([
      'What does it mean that the abominations escalate as Ezekiel goes deeper into the temple?',
      'How does the logic of "the Lord does not see" function in modern institutional corruption?',
      'What does the mark on the grievers\' foreheads teach about God\'s attention to those who resist?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'What happens behind closed doors', target_audience: 'communities confronting institutional hypocrisy', primary_theme: 'God sees what the public facade conceals' },
      { angle: 'The mark of the grievers', target_audience: 'those who mourn cultural and institutional decline', primary_theme: 'God notices those who refuse to accept the corruption' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering EZK 8-9. Temple vision analysis from Block, Zimmerli; Tammuz cult from ANE religious studies.'
  },

  // --- Ezekiel: Individual Responsibility and Allegories (EZK 12-20) ---
  {
    id: 'ezk-exile-and-responsibility',
    title: 'Exile and Individual Responsibility: No More "Sour Grapes"',
    bookId: 'EZK',
    chapterStart: 12,
    verseStart: 1,
    chapterEnd: 20,
    verseEnd: 49,
    summary: 'Ezekiel performs another sign-act, digging through a wall and carrying his pack out like a refugee, then announces that Zedekiah will be captured trying to flee. He attacks the false prophets who whitewash unstable walls with plaster and the women who sew magic bands on wrists. Chapter 14 declares that even Noah, Daniel, and Job could only save themselves, not the nation. Chapter 16 is the longest and most graphic allegory in the Bible: Jerusalem as an abandoned infant whom God rescued, raised, and married, only to watch her become a prostitute worse than Sodom. Chapter 17 uses a political allegory of eagles and cedars. Chapter 18 delivers the revolutionary principle: "The soul who sins is the one who will die" — overturning the proverb about fathers eating sour grapes and children\'s teeth being set on edge. Individual moral responsibility replaces collective inherited guilt. Chapter 20 reviews Israel\'s entire history as a litany of rebellion.',
    significance: 'Chapter 18\'s declaration of individual responsibility is one of the most important theological developments in the Hebrew Bible. It breaks the fatalistic assumption that the current generation is merely paying for ancestral sin and insists that each person stands before God on their own moral account. The allegory in chapter 16, while deeply uncomfortable in its graphic sexual imagery, uses shock to convey the depth of God\'s emotional investment and the severity of the betrayal.',
    relationalNote: 'The foundling-bride allegory in chapter 16 is God\'s most emotionally vulnerable self-disclosure through Ezekiel. God describes rescuing a blood-covered newborn from a field, washing her, raising her, marrying her, dressing her in fine clothes — and then watching her give everything away to foreign lovers. The emotional register is raw grief, not cold anger.',
    conceptualNote: 'The move from collective to individual moral responsibility in chapter 18 has enormous implications. It means the exile is not fate — the next generation can choose differently. It also means no one can hide behind communal identity. Each person is accountable for their own choices. This theological shift is as significant as anything in the prophets.',
    climateNote: 'The exilic community in Babylon was wrestling with the theological crisis of whether they were being punished for their own sins or their ancestors\'. Ezekiel\'s teaching on individual responsibility addressed a real pastoral emergency among the displaced.',
    modernParallel: 'Chapter 18\'s principle speaks to every debate about inherited guilt and personal responsibility. It refuses both extremes: it does not deny that parents\' sins have consequences for children, but it insists that children are not morally defined by those consequences. You are not your family\'s failures. You can choose differently.',
    keyQuestions: JSON.stringify([
      'How does chapter 18 change the way we think about inherited guilt and personal responsibility?',
      'What does the foundling-bride allegory in chapter 16 reveal about God\'s emotional life?',
      'How do false prophets "whitewash unstable walls" — what modern equivalents exist?',
      'What does it mean that even Noah, Daniel, and Job could not save the nation?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'You are not your parents\' sins', target_audience: 'those burdened by family dysfunction or generational trauma', primary_theme: 'individual moral agency and fresh starts' },
      { angle: 'Whitewashing unstable walls', target_audience: 'communities tempted by superficial fixes', primary_theme: 'false reassurance versus honest diagnosis' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering EZK 12-20. Chapter 18 individual responsibility theology from Greenberg, Joyce; ch 16 allegory interpretation from Galambush.'
  },

  // --- Ezekiel: Oracles Against Nations (EZK 21-32) ---
  {
    id: 'ezk-sword-and-nations',
    title: 'The Drawn Sword and Oracles Against Nations',
    bookId: 'EZK',
    chapterStart: 21,
    verseStart: 1,
    chapterEnd: 32,
    verseEnd: 32,
    summary: 'God draws a sword and it will not return to its sheath. Ezekiel slashes the air, moans, and beats his chest as a sign. The king of Babylon stands at a crossroads using divination to choose his target. Chapters 22-23 catalogue Jerusalem\'s sins (shedding blood, profaning Sabbath, sexual immorality) and compare Samaria and Jerusalem to two promiscuous sisters, Oholah and Oholibah. Then the focus shifts to the surrounding nations: Ammon, Moab, Edom, and Philistia receive brief verdicts. The Tyre oracle (chs 26-28) is the most elaborate: the great trading city will be scraped bare as a rock, and the king of Tyre, who declared "I am a god," will be brought to a humiliating death. Chapter 28 includes the Garden-of-Eden imagery traditionally associated with the fall of Satan. The Egypt oracle (chs 29-32) portrays Pharaoh as a great monster dragged from the Nile and left to rot. The section ends with Egypt descending to Sheol to join the other fallen empires in the pit.',
    significance: 'The Tyre oracle contains some of the most important theological reflection on the relationship between beauty, wealth, and pride in the entire Bible. The king of Tyre "was in Eden, the garden of God" — adorned with every precious stone, perfect in beauty — until wickedness was found in him. This passage has profoundly influenced Christian theology about the origin of evil and the corruption of good gifts. The descent-to-Sheol imagery establishes that all empires end in the same place.',
    relationalNote: 'The Oholah/Oholibah allegory (ch 23) extends the marriage metaphor from chapter 16 into explicit political terms: the "lovers" are Egypt, Assyria, and Babylon — the foreign powers Israel courted for military protection. Every political alliance is framed as sexual infidelity, making the geopolitical intensely personal.',
    conceptualNote: 'The theology of empire in these chapters insists that political and economic power is a trust, not a possession. Tyre\'s wealth and beauty were gifts that became idols. The recurring descent to Sheol — nation after nation joining the dead in the pit — is Ezekiel\'s way of saying that human glory, however magnificent, has an expiration date.',
    climateNote: 'Tyre was an island fortress-city off the Lebanese coast, considered impregnable due to its maritime position. Its fall to Nebuchadnezzar (and later Alexander) was a shock to the ancient world. Egypt\'s Nile-based agricultural empire was the other major power center in the region.',
    modernParallel: 'The Tyre oracle speaks to any institution that confuses its beauty and success with divine right — the corporation so profitable it believes itself untouchable, the nation so powerful it believes itself permanent, the religious institution so historically significant it believes itself above accountability.',
    keyQuestions: JSON.stringify([
      'What does the Garden of Eden imagery in the Tyre oracle teach about the corruption of beauty and privilege?',
      'How do the descent-to-Sheol passages challenge the assumption that some empires are permanent?',
      'What political "lovers" do communities pursue instead of trusting God?',
      'How does Ezekiel\'s sword imagery convey the urgency and inevitability of judgment?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Perfect in beauty until...', target_audience: 'communities grappling with the corruption of good gifts', primary_theme: 'how privilege becomes pride' },
      { angle: 'All empires end in the same place', target_audience: 'those living under powerful systems', primary_theme: 'the mortality of human institutions' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering EZK 21-32. Tyre and Eden traditions from Block, Greenberg; Sheol descent motif from ANE underworld literature.'
  },

  // --- Ezekiel: Watchman Renewed (EZK 33) ---
  {
    id: 'ezk-watchman-renewed',
    title: 'The Watchman Renewed: News of Jerusalem\'s Fall',
    bookId: 'EZK',
    chapterStart: 33,
    verseStart: 1,
    chapterEnd: 33,
    verseEnd: 33,
    summary: 'Ezekiel\'s role as watchman is restated: if the watchman sees the sword coming and blows the trumpet, anyone who ignores the warning bears their own guilt. If the watchman fails to warn, the blood is on his hands. That night, a fugitive arrives with the news everyone has been dreading: "The city has fallen." With this report, Ezekiel\'s mouth is opened — he had been mute since chapter 24 when God struck him silent as a sign. The chapter then addresses the survivors in the land who think they will inherit what\'s left: "Abraham was only one man, yet he possessed the land. But we are many — surely the land has been given to us." God\'s answer is blunt: you eat meat with blood, worship idols, and shed blood — you will not possess the land.',
    significance: 'Chapter 33 is the hinge of the entire book of Ezekiel. Everything before this point has been judgment; everything after will move toward restoration. The arrival of news from Jerusalem is the moment the prophetic warnings are vindicated and the prophetic silence ends. The watchman metaphor establishes a theology of pastoral responsibility that has shaped clergy ethics for millennia.',
    relationalNote: 'The fugitive who arrives with news of Jerusalem\'s fall is one of the most dramatic moments in the prophets — the moment when theoretical judgment becomes historical fact. Ezekiel\'s muteness ending at this precise point suggests that God\'s silence was tied to the unresolved crisis; now that judgment has fallen, speech can resume.',
    conceptualNote: 'The watchman theology places moral responsibility on the one who sees danger and must decide whether to speak. It is the biblical foundation for the ethical obligation to warn, which extends into every professional context where knowledge of danger creates a duty to speak.',
    climateNote: 'The journey from Jerusalem to Babylon for a fugitive would have taken weeks across the Syrian desert. The delay between the city\'s fall and the news reaching the exilic community was a period of agonizing uncertainty.',
    modernParallel: 'The watchman\'s dilemma is the dilemma of every person who possesses information that others need to hear but do not want to: the doctor with a terminal diagnosis, the auditor with evidence of fraud, the intelligence analyst with knowledge of an approaching threat. The moral question is not whether to speak but whether your silence makes you complicit.',
    keyQuestions: JSON.stringify([
      'What does the watchman metaphor teach about the moral responsibility of knowledge?',
      'Why was Ezekiel\'s speech restored only when Jerusalem fell?',
      'How does the survivors\' claim to the land reveal a failure to understand judgment?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The watchman\'s burden', target_audience: 'leaders with difficult information to deliver', primary_theme: 'the moral duty to warn' },
      { angle: 'When the news arrives', target_audience: 'communities processing long-feared outcomes', primary_theme: 'the transition from anticipation to reality' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering EZK 33. Watchman theology from Block, Zimmerli; book structure analysis.'
  },

  // --- Ezekiel: Against Edom / Mount Seir (EZK 35) ---
  {
    id: 'ezk-against-edom',
    title: 'Against Mount Seir: When Neighbors Gloat',
    bookId: 'EZK',
    chapterStart: 35,
    verseStart: 1,
    chapterEnd: 35,
    verseEnd: 15,
    summary: 'God pronounces judgment on Edom (Mount Seir) for its gleeful response to Jerusalem\'s destruction. Edom said, "These two nations and their lands will be ours" — trying to seize the territory of both Israel and Judah while they were down. God\'s response: because you harbored ancient hostility and handed the Israelites over to the sword in their time of calamity, Mount Seir will become a desolate waste. The judgment matches the crime: you rejoiced at desolation, so desolation will be your inheritance.',
    significance: 'This oracle establishes a moral principle that runs through the prophets: exploiting your neighbor\'s disaster is itself a sin that invites divine judgment. Edom\'s guilt is not causing Jerusalem\'s fall but celebrating it and profiting from it. This is the prophetic condemnation of schadenfreude elevated to geopolitical scale.',
    relationalNote: 'The "ancient hostility" between Edom and Israel goes back to Esau and Jacob — twin brothers whose rivalry became a permanent enmity between nations. Edom\'s gloating at Jerusalem\'s fall is the climax of centuries of sibling rivalry. The passage suggests that even among hostile neighbors, there are moral boundaries that must not be crossed.',
    conceptualNote: 'The measure-for-measure principle (you rejoiced at desolation, so desolation comes to you) is a theology of moral symmetry that appears throughout Ezekiel. It insists that the universe has a moral architecture that eventually mirrors back what you have done.',
    climateNote: 'Edom occupied the arid mountainous region south and east of the Dead Sea (modern southern Jordan). The terrain was harsh but strategically valuable, controlling trade routes between Arabia and the Mediterranean.',
    modernParallel: 'The neighbor who swoops in to buy distressed property when a family is forced out, the competitor who poaches clients from a struggling business, the nation that seizes territory from a weakened neighbor — this is the Edom pattern. The prophetic word is that profiting from another\'s pain is not shrewd but sinful.',
    keyQuestions: JSON.stringify([
      'What is the moral difference between causing destruction and celebrating it?',
      'How does the Esau-Jacob backstory deepen the significance of Edom\'s behavior?',
      'Where do we see the Edom pattern — exploiting others\' disasters — in our context?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When the neighbor gloats', target_audience: 'communities that have experienced exploitation in vulnerability', primary_theme: 'God judges those who profit from others\' pain' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering EZK 35. Edom-Israel relations from archaeological and biblical evidence; Obadiah parallel themes.'
  },

  // --- Ezekiel: Gog and Magog (EZK 38-39) ---
  {
    id: 'ezk-gog-magog',
    title: 'Gog and Magog: The Final Battle and God\'s Vindication',
    bookId: 'EZK',
    chapterStart: 38,
    verseStart: 1,
    chapterEnd: 39,
    verseEnd: 29,
    summary: 'After the promises of restoration in chapters 36-37, Ezekiel describes a massive future invasion led by Gog from the land of Magog — a coalition of nations attacking a restored and peaceful Israel. God lures this army in, then destroys it with earthquake, plague, rain, hailstones, fire, and brimstone. The slaughter is so comprehensive that it takes seven months to bury the dead and seven years to burn the weapons. Birds and beasts are summoned to a gruesome sacrificial feast on the fallen. The purpose, stated repeatedly, is that "the nations will know that I am the LORD." God\'s Spirit will be poured out on Israel, and "I will never again hide my face from them."',
    significance: 'The Gog and Magog prophecy is one of the most influential apocalyptic texts in the Bible, directly echoed in Revelation 20:8. It establishes the pattern of a final, definitive battle in which God himself destroys the enemies of his people — not through Israel\'s military power but through divine intervention. The passage insists that history will culminate in God\'s self-vindication before all nations.',
    relationalNote: 'The promise that God will "never again hide my face" marks the ultimate resolution of the broken relationship that has driven the entire book. From the glory departing the temple (ch 10) to the glory returning (ch 43), Ezekiel traces the arc of divine absence and return. Gog\'s destruction removes the final threat to that restored relationship.',
    conceptualNote: 'The identity of Gog has generated centuries of speculation (Gyges of Lydia, various modern nations), but the theological function matters more than the historical identification. Gog represents the final expression of human hostility toward God\'s people — the last enemy, the ultimate threat — and God\'s response is total, personal, and permanent.',
    climateNote: 'The "mountains of Israel" where the battle takes place (38:8, 39:2, 4, 17) are the central hill country — the heartland of the promised land. The ecological imagery of birds and beasts feasting on the fallen draws on battlefield realities in the ancient world.',
    modernParallel: 'The Gog and Magog narrative speaks to every community\'s deepest fear: what if, after restoration, the enemy comes back? The passage says the final threat will be met not by human defense but by divine intervention, which either comforts or disturbs depending on how you read it. In a world of nuclear deterrence and asymmetric warfare, the question of ultimate security remains.',
    keyQuestions: JSON.stringify([
      'Who or what is Gog — should we identify it with a specific nation or read it as symbolic?',
      'What does it mean that God lures the enemy in before destroying them?',
      'How does the promise that God will "never again hide my face" resolve the book\'s central tension?',
      'What does this passage teach about ultimate security — where does it come from?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The last enemy', target_audience: 'those anxious about future threats', primary_theme: 'God\'s final victory removes the last reason for fear' },
      { angle: 'Never again hidden', target_audience: 'those who have experienced God\'s absence', primary_theme: 'the permanent restoration of divine presence' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering EZK 38-39. Gog identification debates from Block, Zimmerli; apocalyptic connections to Revelation 20 from standard NT scholarship.'
  },

  // ═══════════════════════════════════════════════════════════
  //  DANIEL
  // ═══════════════════════════════════════════════════════════

  // Missing: 8, 10, 11, 12. Existing: 1-7, 9
  {
    id: 'dan-ram-and-goat',
    title: 'The Ram and the Goat: Greece Shatters Persia',
    bookId: 'DAN',
    chapterStart: 8,
    verseStart: 1,
    chapterEnd: 8,
    verseEnd: 27,
    summary: 'Daniel sees a ram with two horns (Media and Persia) charging westward, southward, and northward — no animal can stand against it. Then a goat with a single prominent horn (Greece under Alexander) comes from the west so fast its feet do not touch the ground and shatters the ram. The great horn breaks and four horns replace it (the division of Alexander\'s empire). From one of these grows a small horn that reaches toward the south, the east, and the Beautiful Land (Israel), casting down some of the stars of heaven, abolishing the daily sacrifice, and desecrating the sanctuary. The angel Gabriel appears and interprets the vision, telling Daniel it concerns "the time of the end." Daniel is overwhelmed and ill for several days.',
    significance: 'This is the most historically specific apocalyptic vision in Daniel, and its correspondence to the Medo-Persian and Greek empires is so precise that critical scholars often date the chapter to the Maccabean period. The "little horn" is widely identified with Antiochus IV Epiphanes, who desecrated the Jerusalem temple in 167 BCE. The passage establishes the principle that God reveals the shape of the future to his servants, not to satisfy curiosity but to sustain faithfulness during the crisis.',
    relationalNote: 'Daniel\'s physical response to the vision — illness and being overwhelmed — is a reminder that apocalyptic revelation is not entertainment. The weight of seeing the future, especially a future filled with suffering for God\'s people, takes a physical toll. The angel Gabriel\'s appearance introduces a mediating figure who helps the human prophet bear what he has seen.',
    conceptualNote: 'The theology of the "time of the end" in this chapter does not necessarily mean the end of history but the end of a particular era of suffering. The 2,300 evenings and mornings after which the sanctuary will be reconsecrated matches the approximate duration of the Antiochene persecution. This creates a framework of limited, bounded suffering — terrible but not eternal.',
    climateNote: 'The vision is set at the Ulai canal in Susa, the Persian administrative capital (in modern Iran). The geographical specificity grounds the apocalyptic imagery in real-world locations that Daniel\'s audience would have recognized.',
    modernParallel: 'The vision of a seemingly unstoppable power suddenly shattered by an even faster one speaks to every geopolitical upheaval: the Soviet Union dissolving in months, the rapid American pullout from Afghanistan, the overnight collapse of financial institutions in 2008. The little horn that grows from a fragment of a shattered empire and targets religious practice maps onto every regime that begins as a political entity and escalates to persecution of faith communities.',
    keyQuestions: JSON.stringify([
      'How should we read the historical specificity of this vision — as prediction, as reflection, or both?',
      'What does Daniel\'s physical illness after the vision teach about the cost of prophetic revelation?',
      'How does the "2,300 evenings and mornings" framework of bounded suffering function as hope?',
      'Where do we see the "little horn" pattern — political power escalating to religious persecution?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Suffering with an expiration date', target_audience: 'communities under persecution or extended trials', primary_theme: 'divine revelation that suffering is bounded, not eternal' },
      { angle: 'When the goat shatters the ram', target_audience: 'those navigating rapid power shifts', primary_theme: 'no empire is invincible' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering DAN 8. Historical identification of ram/goat from both traditional and critical scholarship; Antiochus IV Epiphanes from Maccabean historiography.'
  },

  {
    id: 'dan-spiritual-warfare',
    title: 'The Heavenly Battle: When Prayer Meets Cosmic Resistance',
    bookId: 'DAN',
    chapterStart: 10,
    verseStart: 1,
    chapterEnd: 10,
    verseEnd: 21,
    summary: 'Daniel has been mourning and fasting for three weeks when a terrifying figure appears — a man dressed in linen with a face like lightning, eyes like flaming torches, arms and legs like burnished bronze. Daniel alone sees the vision; his companions flee in terror. The heavenly being explains the delay: "From the first day you set your mind to understand and humbled yourself before your God, your words were heard, and I have come in response to your words. But the prince of the kingdom of Persia withstood me twenty-one days." Only the arrival of Michael, Israel\'s angelic prince, released the messenger to reach Daniel. The passage pulls back the curtain on a cosmic reality: behind the visible geopolitical conflicts, angelic and demonic powers contend for nations.',
    significance: 'Daniel 10 is the most detailed account of spiritual warfare in the Hebrew Bible. It establishes the theological framework that earthly events have heavenly counterparts — that the rise and fall of empires is connected to conflicts in an unseen spiritual dimension. This passage profoundly influenced later Jewish angelology and Christian spiritual warfare theology.',
    relationalNote: 'The revelation that Daniel\'s prayer was heard on the first day but the answer was delayed for three weeks by cosmic conflict transforms the experience of unanswered prayer. The delay is not divine indifference — it is the time required for the answer to fight its way through opposition. This reframes every season of apparent silence.',
    conceptualNote: 'The concept of national angelic princes (the "prince of Persia," Michael as Israel\'s prince) introduces a theology of cosmic governance that operates behind human politics. Earthly empires are expressions of heavenly conflicts. This is not dualism — God is clearly sovereign — but it is a refusal to treat the visible world as the whole story.',
    climateNote: 'Daniel receives this vision beside the Tigris River during the third year of Cyrus king of Persia. The Persian period (539+ BCE) was a time of relative peace for the Jewish community, making the intense spiritual warfare imagery surprising — the visible calm concealed invisible conflict.',
    modernParallel: 'The twenty-one-day delay between prayer and answer speaks to every person who has prayed faithfully and heard nothing. The passage does not promise immediate results but insists that the silence does not mean the prayer was not heard. The cosmic-conflict framework also challenges purely materialist explanations of history: what if more is happening than what we can see?',
    keyQuestions: JSON.stringify([
      'How does the twenty-one-day delay change your understanding of unanswered prayer?',
      'What does the concept of national angelic princes teach about the relationship between the visible and invisible worlds?',
      'How should the reality of spiritual warfare affect the way we pray?',
      'What are the modern implications of a worldview that includes unseen spiritual conflict?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When the answer is delayed', target_audience: 'those struggling with unanswered prayer', primary_theme: 'divine hearing does not guarantee immediate response' },
      { angle: 'The war behind the war', target_audience: 'communities trying to understand why good efforts meet unexpected resistance', primary_theme: 'unseen spiritual dimensions of earthly conflicts' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering DAN 10. Angelology and spiritual warfare theology from Collins, Goldingay; ANE divine council background.'
  },

  {
    id: 'dan-kings-north-south',
    title: 'Kings of North and South: History Written in Advance',
    bookId: 'DAN',
    chapterStart: 11,
    verseStart: 1,
    chapterEnd: 11,
    verseEnd: 45,
    summary: 'The angelic messenger delivers the most detailed historical prophecy in the Bible: a sequence of kings of the North (Seleucids) and kings of the South (Ptolemies) whose conflicts will rage across the land of Israel for centuries. The wars, alliances, marriages, betrayals, and assassinations are described with remarkable specificity — historians can match many verses to known events of the Hellenistic period. The narrative builds toward "a contemptible person" who abolishes the daily sacrifice, sets up the "abomination of desolation," and persecutes those who know their God. Yet "the people who know their God shall stand firm and take action." The passage describes martyrdom, refinement through suffering, and the assurance that the tyrant\'s end will come "at the appointed time."',
    significance: 'Daniel 11 is the most extensively debated chapter in the entire book due to its historical specificity. The "abomination of desolation" (11:31) is referenced by Jesus in Mark 13:14 as a sign of future catastrophe, linking this passage directly to NT eschatology. The chapter\'s core theology is that even the most chaotic and violent period of history operates within divine limits — there is an "appointed time" for everything.',
    relationalNote: 'The "people who know their God" are not passive victims but active resisters. They instruct many, even though some of them will fall by sword, flame, captivity, and plunder. The relationship between the faithful community and the tyrant is not just oppressor-and-victim but an active contest of wills — the community chooses faithfulness, and that choice has consequences the tyrant cannot ultimately defeat.',
    conceptualNote: 'The theology of "appointed times" in Daniel 11 insists that even the most chaotic-seeming events are temporally bounded. The tyrant will rage, but only until "the time of the end." This is not fatalism — the human actors make real choices — but it is the conviction that no human evil has the final word on the timeline.',
    climateNote: 'The Seleucid-Ptolemaic wars of the third and second centuries BCE turned the land of Israel into a contested buffer zone between rival empires. The population endured repeated invasions, shifting loyalties, and forced Hellenization. The "abomination" likely refers to the altar to Zeus that Antiochus erected in the Jerusalem temple in 167 BCE.',
    modernParallel: 'The pattern of northern and southern powers fighting over the land between them has repeated throughout history: Korea, Vietnam, Poland, Ukraine. The people caught in the middle — the ones who "know their God and take action" — are the civilians who resist occupation, the teachers who preserve culture underground, the pastors who hold services when worship is forbidden.',
    keyQuestions: JSON.stringify([
      'How should we read the extraordinary historical specificity of this chapter?',
      'What does "the people who know their God shall stand firm" look like in practice?',
      'How does the concept of "appointed times" function as hope during persecution?',
      'Where do we see the Daniel 11 pattern of great powers fighting over small nations today?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Standing firm when the powers rage', target_audience: 'communities under political pressure or persecution', primary_theme: 'faithfulness as active resistance within divine limits' },
      { angle: 'The appointed time', target_audience: 'those enduring prolonged suffering', primary_theme: 'divine sovereignty sets limits on human evil' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering DAN 11. Seleucid/Ptolemaic identification from Collins, Goldingay; abomination of desolation from both Maccabean and NT scholarship.'
  },

  {
    id: 'dan-resurrection-hope',
    title: 'The Resurrection: Those Who Sleep in the Dust Shall Awake',
    bookId: 'DAN',
    chapterStart: 12,
    verseStart: 1,
    chapterEnd: 12,
    verseEnd: 13,
    summary: 'Michael, the great prince, arises to protect Israel in a time of distress "such as has never occurred." Then comes the most explicit resurrection text in the Hebrew Bible: "Many of those who sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt. Those who are wise shall shine like the brightness of the sky above; and those who turn many to righteousness, like the stars forever and ever." Daniel is told to seal the book until the time of the end. When he asks "How long?", the answer is "a time, times, and half a time." The book closes with the personal promise to Daniel: "You shall rest, and shall stand in your allotted place at the end of the days."',
    significance: 'Daniel 12:2-3 is the clearest statement of bodily resurrection in the Old Testament and the foundation for all subsequent Jewish and Christian resurrection theology. It addresses the ultimate injustice of martyrdom: if the faithful die for their faith, is death the last word? Daniel says no — the dust-sleepers will awake, and the righteous will shine like stars. This passage directly influences Paul\'s resurrection theology in 1 Corinthians 15.',
    relationalNote: 'The personal word to Daniel — "You shall rest, and shall stand in your allotted place at the end" — is an extraordinary moment of divine tenderness toward an aging prophet who has served faithfully for decades in exile. After all the apocalyptic terror of the preceding chapters, the book ends with a personal assurance: your story has a destination.',
    conceptualNote: 'The resurrection in Daniel is not universal in the Greek philosophical sense but selective and judicial — "some to everlasting life, some to shame." It is tied to moral accountability: those who "turn many to righteousness" shine brightest. This is not a natural process but a divine act that corrects the injustices of history.',
    climateNote: 'The "dust of the earth" from which the dead arise is the same dust to which humans return in Genesis 3:19. The resurrection reverses the curse of death itself. The stars-forever image connects earthly faithfulness to cosmic permanence.',
    modernParallel: 'Daniel 12 speaks to every situation where faithful people die without seeing justice — martyrs, whistleblowers who are destroyed by the systems they exposed, parents who sacrificed everything for children who never acknowledged it. The passage insists that the final accounting has not yet occurred and that what looks like the end is not.',
    keyQuestions: JSON.stringify([
      'How does Daniel 12:2-3 address the problem of righteous suffering?',
      'What does it mean to "shine like stars" — how does earthly faithfulness connect to eternal significance?',
      'Why is Daniel told to "seal the book" — what is the function of sealed prophecy?',
      'How does the personal word to Daniel model God\'s care for aging servants?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Those who sleep shall awake', target_audience: 'those grieving the death of the faithful', primary_theme: 'resurrection as divine correction of history\'s injustices' },
      { angle: 'You shall stand at the end', target_audience: 'aging believers wondering if their service mattered', primary_theme: 'personal divine assurance for the long-faithful' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering DAN 12. Resurrection theology from Collins, Wright (N.T.); 1 Cor 15 connections well attested.'
  },

  // ═══════════════════════════════════════════════════════════
  //  HOSEA
  // ═══════════════════════════════════════════════════════════

  // Missing: 7-10, 12, 13. Existing: 1-6, 11, 14
  {
    id: 'hos-israels-corruption',
    title: 'Israel\'s Corruption: Hot as an Oven, Silly as a Dove',
    bookId: 'HOS',
    chapterStart: 7,
    verseStart: 1,
    chapterEnd: 10,
    verseEnd: 15,
    summary: 'Hosea catalogues Israel\'s dysfunction with some of the most vivid metaphors in the prophets. The nation is "like a heated oven" — its passions consume its leaders. It is "a flat cake not turned over" — burned on one side, raw on the other, useless. It is "a silly dove, easily deceived" — fluttering between Egypt and Assyria for help instead of turning to God. They "sow the wind and reap the whirlwind" — the most famous harvest metaphor in Scripture. Chapter 8 announces that Israel has broken the covenant and rebelled against God\'s law. Their golden calf will be smashed to pieces. Chapter 9 declares that the days of reckoning have come, and the prophet is called a fool and a madman by the people. Chapter 10 invokes the image of plowing: "Sow righteousness for yourselves, reap the fruit of unfailing love, break up your unplowed ground."',
    significance: 'The "sow the wind, reap the whirlwind" proverb from 8:7 has entered virtually every language and culture. It captures the theology of moral consequence in seven words: the scale of what you harvest vastly exceeds the scale of what you planted. Hosea\'s imagery throughout these chapters is deliberately homespun — ovens, doves, flat cakes, plowing — reflecting his rural northern Israelite context and making the theology accessible through agricultural and domestic experience.',
    relationalNote: 'The "silly dove" metaphor captures Israel\'s co-dependent pattern: fluttering between Egypt and Assyria, never settling, always looking for the next alliance to solve its problems. This is the relational pattern of someone who seeks rescue from everyone except the one who can actually help.',
    conceptualNote: 'The "unplowed ground" in 10:12 is the theological counterpart to the "sow the wind" judgment: if you break up the hard ground, if you do the difficult preparatory work of repentance, the harvest will be different. Hosea holds judgment and invitation in the same breath.',
    climateNote: 'The agricultural imagery reflects the northern kingdom\'s fertile Jezreel Valley and surrounding agricultural land. Baking, plowing, sowing, and harvesting were the daily realities of Hosea\'s audience.',
    modernParallel: 'Sowing the wind and reaping the whirlwind is the pattern of every shortcut that produces consequences far larger than the original action — the quick lie that unravels into a scandal, the deferred maintenance that becomes a catastrophe, the policy shortcut that becomes a systemic crisis.',
    keyQuestions: JSON.stringify([
      'What does "sow the wind, reap the whirlwind" look like in your context?',
      'How does the "silly dove" pattern manifest in modern alliance-building?',
      'What "unplowed ground" needs to be broken up before genuine change can happen?',
      'Why does the prophetic voice get called foolish and mad?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Sowing the wind', target_audience: 'communities experiencing consequences of past shortcuts', primary_theme: 'the disproportionate harvest of small compromises' },
      { angle: 'Break up your unplowed ground', target_audience: 'those ready for difficult preparatory work of change', primary_theme: 'repentance as agricultural labor' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering HOS 7-10. Agricultural metaphor analysis from Andersen/Freedman Anchor Bible; Mays commentary.'
  },

  {
    id: 'hos-lessons-from-history',
    title: 'Lessons from History: Jacob, Egypt, and the God Who Remembers',
    bookId: 'HOS',
    chapterStart: 12,
    verseStart: 1,
    chapterEnd: 13,
    verseEnd: 16,
    summary: 'Hosea reaches back into Israel\'s history to make his case. He recalls Jacob, who struggled with God and wept and pleaded at Bethel — a reminder that the nation\'s ancestor knew how to be honest with God, even if the current generation has forgotten. He recalls the Exodus: "I am the LORD your God from the land of Egypt; you know no God but me." Yet Israel, once fed and satisfied, "became proud and forgot me." Chapter 13 is among the darkest passages in the prophets: God will be like a lion, a leopard, a bear robbed of her cubs. "Where, O death, are your plagues? Where, O grave, is your destruction?" In context, this is not a promise of victory over death (as Paul will later reinterpret it) but a summons of death as judgment. Samaria will bear its guilt because it has rebelled against its God.',
    significance: 'Hosea\'s use of the Jacob story reinterprets Israel\'s founding ancestor not as a trickster-hero but as a model of desperate prayer. The "where, O death" passage (13:14) has a complex afterlife: Paul quotes it in 1 Corinthians 15:55 as a victory shout over death, but in Hosea\'s original context it may be a threat, not a promise. This dual reading is one of the most fascinating examples of prophetic reinterpretation in the Bible.',
    relationalNote: 'The accusation "when you were fed, you became proud and forgot me" names the most common spiritual dynamic in the prophets: prosperity leading to amnesia. The relationship with God was sustained by need; when the need disappeared, so did the relationship.',
    conceptualNote: 'The animal imagery — lion, leopard, bear — represents God as predator, which inverts the usual shepherd imagery. When the flock refuses the shepherd, the shepherd becomes the threat. This is not a different God but the same God in a different mode, and the mode is determined by the people\'s response.',
    climateNote: 'The wild animals Hosea names — lion, leopard, bear — were genuine threats in the northern kingdom\'s landscape. The Israelite hill country and Jordan Valley supported populations of all three species in the eighth century BCE.',
    modernParallel: 'Prosperity-induced amnesia is the central spiritual disease of affluent cultures. The community that prayed passionately during the crisis and stopped praying when the crisis passed; the nation that turned to God during wartime and away from God in peacetime — this is the pattern Hosea identifies.',
    keyQuestions: JSON.stringify([
      'How does prosperity lead to spiritual amnesia?',
      'What does it mean for God to become "like a lion" to His own people?',
      'How does Hosea\'s use of the Jacob story reframe the ancestral narrative?',
      'How do you read "where, O death, are your plagues" — as threat or promise?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Prosperity and amnesia', target_audience: 'affluent communities that have drifted from dependence on God', primary_theme: 'how blessing can become the path to forgetting' },
      { angle: 'Wrestling like Jacob', target_audience: 'those who have lost the habit of honest prayer', primary_theme: 'desperation as a doorway to encounter' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering HOS 12-13. Jacob tradition in Hosea from Andersen/Freedman; 1 Cor 15:55 reinterpretation from NT scholarship.'
  },

  // ═══════════════════════════════════════════════════════════
  //  AMOS
  // ═══════════════════════════════════════════════════════════

  // Missing: 3, 4, 6, 8, 9. Existing: 1-2, 5, 7
  {
    id: 'amo-privilege-and-judgment',
    title: 'Privilege and Judgment: You Only Have I Chosen — Therefore I Will Punish',
    bookId: 'AMO',
    chapterStart: 3,
    verseStart: 1,
    chapterEnd: 4,
    verseEnd: 13,
    summary: 'Amos delivers one of the most startling theological reversals in the prophets: "You only have I chosen of all the families of the earth — therefore I will punish you for all your iniquities." Election is not a shield but a heightened responsibility. What follows is a systematic demolition of Israel\'s complacency. The wealthy lie on ivory beds, eat lambs from the flock, strum on harps, drink wine by the bowlful, and anoint themselves with the finest oils — "but are not grieved over the ruin of Joseph." God sent famine, drought, blight, plague, and overthrow "like Sodom and Gomorrah" — and still Israel did not return. The refrain "yet you did not return to me" repeats five times like a tolling bell. The section closes: "Prepare to meet your God, O Israel."',
    significance: 'Amos 3:2 redefines election theology. Being chosen does not mean being protected from judgment — it means being held to a higher standard. This single verse overturns every prosperity gospel, every "God is on our side" nationalism, every assumption that divine favor equals divine indulgence. The five-fold "yet you did not return to me" is one of the most rhetorically powerful passages in the prophets, demonstrating God\'s patient, escalating attempts to get Israel\'s attention.',
    relationalNote: 'The "cows of Bashan" address to the wealthy women of Samaria (4:1) is deliberately provocative — these are women who oppress the poor and demand their husbands bring them drinks. Amos targets not just the men who run the economy but the culture of luxury that the entire upper class maintains and defends.',
    conceptualNote: 'The theology of escalating warning — drought, blight, plague, overthrow — followed by the refrain "yet you did not return" establishes that judgment is not God\'s first response but God\'s last resort. Every catastrophe was an invitation to repent that was refused.',
    climateNote: 'The prosperity Amos describes was real: archaeological evidence from eighth-century Samaria includes luxury ivory furniture, imported wines, and elaborate architecture. The wealth gap between the Samarian elite and the rural poor was enormous.',
    modernParallel: 'The reversal of election is relevant wherever a community assumes its historical significance protects it from accountability. The nation that cites its founding ideals while violating them, the church that cites its theological heritage while ignoring its ethical failures — Amos says chosenness increases accountability, not immunity.',
    keyQuestions: JSON.stringify([
      'How does Amos 3:2 redefine what it means to be "chosen"?',
      'What are the modern equivalents of the escalating warnings Israel ignored?',
      'How does the culture of luxury among the Samarian elite connect to the oppression of the poor?',
      'What does "prepare to meet your God" mean — is it a threat, an invitation, or both?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Chosen — therefore punished', target_audience: 'communities that assume privilege equals protection', primary_theme: 'election as heightened accountability' },
      { angle: 'Yet you did not return', target_audience: 'those who have ignored repeated warnings', primary_theme: 'God\'s patient escalation before final judgment' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering AMO 3-4. Election theology in Amos from Mays, Paul; Samaria archaeology from Tappy.'
  },

  {
    id: 'amo-woe-to-complacent',
    title: 'Woe to the Complacent: Lounging While the Nation Burns',
    bookId: 'AMO',
    chapterStart: 6,
    verseStart: 1,
    chapterEnd: 6,
    verseEnd: 14,
    summary: 'Woe to those who are at ease in Zion and feel secure on the mountain of Samaria. The elite lounge on beds inlaid with ivory, feast on choice lambs, improvise on the harp like David, drink wine by the bowlful — "but are not grieved over the ruin of Joseph." They will be the first to go into exile. God abhors the pride of Jacob and detests his fortresses. A nation will be raised up against Israel that will oppress them from Lebo-hamath to the Brook of the Arabah — the full extent of the promised land.',
    significance: 'This chapter is the Bible\'s most concentrated indictment of the sin of complacency. The problem is not that the wealthy enjoy good things — it is that they enjoy them while being utterly indifferent to the suffering happening around them. The phrase "not grieved over the ruin of Joseph" is the theological heart of the chapter: it defines sin not as active cruelty but as willful obliviousness.',
    relationalNote: 'The complacent elite have constructed a social bubble that shields them from the suffering of their own nation. Their beds, their food, their music, their wine — every luxury is a wall between them and the reality of what is happening to the poor. Amos insists that this insulation is itself the sin.',
    conceptualNote: 'The theology of grief-as-duty is striking. Amos does not demand that the wealthy give up their wealth (though other passages do); here he demands that they feel something about the suffering around them. The failure to grieve is treated as a moral failure, not merely an emotional one.',
    climateNote: 'Lebo-hamath to the Brook of the Arabah represents the full extent of Israelite territory from north to south. The promise that oppression will cover this entire range means there will be no enclave of safety.',
    modernParallel: 'The complacent elite of Samaria have their counterparts in every society where a wealthy class has insulated itself from the consequences of the policies it benefits from. Gated communities adjacent to food deserts, luxury real estate blocks from homeless encampments — the geography of indifference has not changed in 2,800 years.',
    keyQuestions: JSON.stringify([
      'What does it mean that the sin is not cruelty but indifference?',
      'How does the entertainment and luxury described function as insulation from reality?',
      'Is grief over public suffering a moral duty or merely an emotion?',
      'Where are the modern "beds of ivory" — the luxuries that shield us from awareness of suffering?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Not grieved over the ruin', target_audience: 'comfortable communities disconnected from surrounding suffering', primary_theme: 'indifference as a form of sin' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering AMO 6. Ivory beds confirmed by Samaria archaeological excavations.'
  },

  {
    id: 'amo-basket-of-fruit',
    title: 'The Basket of Summer Fruit: The End Has Come',
    bookId: 'AMO',
    chapterStart: 8,
    verseStart: 1,
    chapterEnd: 9,
    verseEnd: 15,
    summary: 'God shows Amos a basket of summer fruit (qayits) and says, "The end (qets) has come for my people Israel." The wordplay is untranslatable but devastating — ripe fruit signals the end of the season and the beginning of decay. Amos then describes a famine "not of bread or thirst for water, but of hearing the words of the Lord." People will stagger from sea to sea, searching for the word of the Lord, and not find it. The merchants who cheat the poor with rigged scales and sell the chaff of the wheat will be brought down. Yet the book does not end in destruction. Chapter 9 closes with a stunning promise of restoration: "I will restore David\'s fallen shelter... I will plant Israel in their own land, never again to be uprooted." The desolated cities will be rebuilt, the vineyards replanted, the gardens flourishing again.',
    significance: 'The famine of the word of God (8:11-12) is one of the most theologically profound images in the prophets. It suggests that the worst possible punishment is not physical suffering but the withdrawal of divine communication — a world where you search for God\'s voice and the heavens are silent. The contrast between this famine and the restoration promise in chapter 9 creates the full arc of Amos: total judgment followed by total restoration, with nothing in between to soften the whiplash.',
    relationalNote: 'The famine of the word represents the ultimate relational breakdown: not just being ignored by God but being unable to find God even when you search. This is more devastating than punishment — it is absence. The restoration in chapter 9 reverses this completely, promising permanent presence.',
    conceptualNote: 'The juxtaposition of chapters 8 and 9 — from famine of the word to overflowing vineyards — mirrors the prophetic pattern of judgment-then-restoration that runs through the entire prophetic corpus. Amos refuses to let either pole stand alone: judgment without hope is nihilism; hope without judgment is sentimentality.',
    climateNote: 'The summer fruit basket was a familiar harvest-end image in Israel. The fruit was ripe, sweet, and about to rot — the perfect metaphor for a society at the peak of its prosperity and the edge of its collapse. The restoration imagery of rebuilt cities and replanted vineyards speaks directly to the agricultural economy Amos\'s audience depended on.',
    modernParallel: 'The famine of the word speaks to every culture that has lost the ability to hear moral truth — not because no one is speaking it but because the capacity to receive it has atrophied. A society drowning in information but starving for wisdom, a generation with access to every sacred text ever written but unable to hear the voice of God — this is the famine Amos describes.',
    keyQuestions: JSON.stringify([
      'What does a "famine of the word of God" look like in a world with unprecedented access to information?',
      'How does the wordplay between "summer fruit" and "the end" function theologically?',
      'How do we hold together the severity of chapters 1-8 with the restoration of chapter 9?',
      'What does permanent replanting ("never again to be uprooted") promise to displaced communities?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The famine you can\'t buy your way out of', target_audience: 'affluent communities experiencing spiritual emptiness', primary_theme: 'the word of God cannot be purchased, earned, or manufactured' },
      { angle: 'Never again uprooted', target_audience: 'displaced communities and immigrants', primary_theme: 'God\'s promise of permanent belonging after permanent disruption' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering AMO 8-9. Qayits/qets wordplay from Wolff, Paul; famine-of-the-word theology from Mays.'
  },

  // ═══════════════════════════════════════════════════════════
  //  MICAH
  // ═══════════════════════════════════════════════════════════

  // Missing: 1-4. Existing: 5, 6, 7
  {
    id: 'mic-judgment-on-samaria-jerusalem',
    title: 'Judgment on Samaria and Jerusalem: The Mountains Will Melt',
    bookId: 'MIC',
    chapterStart: 1,
    verseStart: 1,
    chapterEnd: 2,
    verseEnd: 13,
    summary: 'God comes down from heaven and the mountains melt beneath his feet like wax before fire. Samaria will be made a heap of rubble, its idols smashed, its wages burned. Micah strips naked and wails through the streets of the Judean towns, punning on their names to describe the disaster rolling southward from Samaria toward Jerusalem. Chapter 2 targets the powerful who "devise wickedness on their beds" — who lie awake at night planning how to seize fields, houses, and inheritances. "They covet fields and seize them, and houses, and take them." Yet the section closes with a promise: God will gather the remnant of Israel like sheep in a pen, and the one who breaks open the way will go before them.',
    significance: 'Micah is a rural prophet from Moresheth who speaks against the corruption of both Samaria and Jerusalem — the capitals of both Israelite kingdoms. His strip-and-wail demonstration is one of the most dramatic prophetic acts in Scripture, and his specificity about land seizure reflects the perspective of a villager who has watched wealthy urbanites swallow up family farms. The passage grounds prophetic concern in concrete economic injustice.',
    relationalNote: 'Micah speaks as someone from the margins — a small-town prophet confronting capital-city corruption. His empathy is with the families whose ancestral land is being stolen through legal manipulation. The relational dynamic is that of the rural poor versus the urban powerful.',
    conceptualNote: 'The land-seizure theology here connects to the Jubilee principle: land in Israel belonged ultimately to God and was distributed to families as a trust. Seizing another family\'s land was not just theft but a violation of the theological order of creation.',
    climateNote: 'Moresheth-Gath, Micah\'s hometown, was a small agricultural village in the Judean Shephelah (lowlands), directly in the path of any invading army coming from the coastal plain. Micah\'s urgency was geographically personal.',
    modernParallel: 'Micah\'s land seizure oracles speak directly to every context where developers, corporations, or governments displace rural and indigenous communities from ancestral land. The "devising wickedness on their beds" captures the boardroom planning that precedes displacement.',
    keyQuestions: JSON.stringify([
      'What does it mean that Micah strips naked and wails — how does this intensify the prophetic message?',
      'How does the land-seizure indictment connect to modern displacement and gentrification?',
      'What is the theological significance of ancestral land in Israel?',
      'How does the remnant promise in 2:12-13 function after the devastation of chapters 1-2?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'When the powerful plan at night', target_audience: 'communities experiencing displacement or economic exploitation', primary_theme: 'God sees and judges the powerful who steal from the vulnerable' },
      { angle: 'The prophet from the margins', target_audience: 'rural and small-town congregations', primary_theme: 'God speaks truth to power from unexpected places' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering MIC 1-2. Moresheth identification from archaeological surveys; land-seizure context from Chaney, Premnath.'
  },

  {
    id: 'mic-zion-and-nations',
    title: 'Zion Exalted Among the Nations: Swords into Plowshares',
    bookId: 'MIC',
    chapterStart: 3,
    verseStart: 1,
    chapterEnd: 4,
    verseEnd: 13,
    summary: 'Micah turns his fire on Israel\'s leaders: rulers who hate good and love evil, who "tear the skin from my people and the flesh from their bones." Prophets who lead astray, who cry "Peace" when their mouths are filled. "Zion will be plowed like a field, Jerusalem will become a heap of rubble." Then the vision pivots dramatically: in the last days, the mountain of the Lord\'s temple will be established as the highest of mountains, and all nations will stream to it. They will beat their swords into plowshares and their spears into pruning hooks. Nation will not take up sword against nation, nor will they train for war anymore. Everyone will sit under their own vine and fig tree, and no one will make them afraid. The contrast could not be sharper: the same Zion that will be plowed as a field will become the peace capital of the world.',
    significance: 'The swords-into-plowshares vision (shared with Isaiah 2:2-4) is the most famous peace prophecy in the Bible. Micah adds the vine-and-fig-tree image that George Washington quoted at the founding of the American republic. The juxtaposition of destruction (3:12) and exaltation (4:1-5) is the prophetic vision at its most compressed: judgment and hope separated by a breath.',
    relationalNote: 'The vine-and-fig-tree image is fundamentally about security — not military security but the security of a person who can sit at home without fear. After all the violence, displacement, and land seizure Micah has described, this image of a person peacefully enjoying their own land is the ultimate relational restoration.',
    conceptualNote: 'The conversion of weapons into agricultural tools is a theology of transformation rather than mere cessation. Peace is not just the absence of war but the redirection of violent energy into productive labor. The sword becomes a plowshare — same metal, different purpose.',
    climateNote: 'The vine-and-fig-tree image reflects the Judean agricultural ideal. A household with its own vine (for wine) and fig tree (for fruit and shade) was the picture of modest sufficiency. Micah\'s peace is not about wealth but about security and enough.',
    modernParallel: 'The swords-to-plowshares vision has been the touchstone for every peace and disarmament movement in Western history. The United Nations has a sculpture of it outside its headquarters. The vine-and-fig-tree image speaks to the housing security movement, land sovereignty for indigenous peoples, and every vision of communities where people can simply live without fear.',
    keyQuestions: JSON.stringify([
      'How does the juxtaposition of Zion plowed as a field and Zion exalted as the highest mountain function?',
      'What does it mean to convert swords into plowshares — is this about disarmament, transformation, or both?',
      'What would "sitting under your own vine and fig tree" look like in your context?',
      'Why do both Micah and Isaiah share the swords-to-plowshares vision — what does this suggest about its importance?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Swords into plowshares', target_audience: 'communities longing for peace', primary_theme: 'the transformation of violent energy into productive purpose' },
      { angle: 'Your own vine and fig tree', target_audience: 'those longing for housing security and stable community', primary_theme: 'the peace of having enough and not being afraid' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering MIC 3-4. Swords/plowshares parallel with ISA 2 well attested; vine-and-fig-tree in American political discourse from Dreisbach.'
  },

  // ═══════════════════════════════════════════════════════════
  //  ZECHARIAH
  // ═══════════════════════════════════════════════════════════

  // Missing: 7, 8, 10, 11, 14. Existing: 1-6, 9, 12-13
  {
    id: 'zec-justice-and-mercy',
    title: 'Justice and Mercy: When Fasting Becomes Self-Serving',
    bookId: 'ZEC',
    chapterStart: 7,
    verseStart: 1,
    chapterEnd: 8,
    verseEnd: 23,
    summary: 'A delegation asks Zechariah whether they should continue the fasting rituals that commemorated Jerusalem\'s destruction now that the temple is being rebuilt. God\'s answer cuts to the heart: "When you fasted and mourned, was it really for me? And when you ate and drank, was it not just for yourselves?" The question exposes self-serving religion. Then God delivers the ethical core: "Administer true justice, show mercy and compassion, do not oppress the widow, the fatherless, the foreigner, or the poor." Chapter 8 pivots to extravagant hope: old men and women will again sit in the streets of Jerusalem, and boys and girls will play in its squares. God will save His people and bring them back. "Let your hands be strong," Zechariah says. The chapter ends with a vision of ten foreigners grabbing the robe of one Jew and saying, "Let us go with you, because we have heard that God is with you."',
    significance: 'Zechariah 7-8 echoes Isaiah 58\'s fasting critique: the problem is not the ritual but the motivation. God wants justice, mercy, and compassion — not self-focused piety. The vision of old people and children in Jerusalem\'s streets is one of the most beautiful images of urban restoration in the Bible. The ten foreigners grabbing a Jew\'s robe is a powerful vision of Israel\'s witness attracting the nations through the quality of its communal life, not through proselytism.',
    relationalNote: 'The image of old men and women sitting in streets and children playing is about the restoration of intergenerational community. A city safe enough for the very old and the very young is a city where relationships can flourish across generations. This is Zechariah\'s definition of shalom: not grand architecture but grandparents and grandchildren sharing public space.',
    conceptualNote: 'The foreigners who grab the Jew\'s robe represent a theology of attraction rather than coercion. The nations are drawn to God not by conquest or argument but by the visible evidence of a community that God inhabits. This is mission as quality of communal life, not as program.',
    climateNote: 'The post-exilic community in Jerusalem was small, poor, and struggling to rebuild. The vision of thriving streets would have been a stark contrast to the actual conditions of a half-ruined city.',
    modernParallel: 'A city where the elderly can sit safely outdoors and children can play in the streets is still the measure of a good society. The ten foreigners grabbing a community member\'s robe and saying "God is with you" is the best possible definition of evangelism: living in a way that makes people want what you have.',
    keyQuestions: JSON.stringify([
      'What does God\'s question about fasting reveal about the difference between self-serving and God-serving religion?',
      'What would it look like for your community to be the kind of place where ten foreigners want to join?',
      'How does the image of old people and children in the streets define well-being?',
      'What is the relationship between justice/mercy and attractional witness?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Was it really for me?', target_audience: 'communities evaluating the motives behind their religious practices', primary_theme: 'self-examination of worship motivations' },
      { angle: 'Old people and children in the streets', target_audience: 'urban congregations and neighborhood revitalization efforts', primary_theme: 'intergenerational community as the sign of God\'s presence' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ZEC 7-8. Fasting critique parallel with ISA 58; post-exilic Jerusalem conditions from Lipschits, Meyers.'
  },

  {
    id: 'zec-shepherd-rejected',
    title: 'The Rejected Shepherd: Thirty Pieces of Silver',
    bookId: 'ZEC',
    chapterStart: 10,
    verseStart: 1,
    chapterEnd: 11,
    verseEnd: 17,
    summary: 'God promises to strengthen Judah and save the house of Joseph, gathering them from exile and making them as though He had never rejected them. Then the passage takes a dark turn. Zechariah acts out a shepherd parable: he takes two staffs named "Favor" (the covenant with the nations) and "Union" (the bond between Judah and Israel) and shepherds the flock. But the flock detests him. He breaks the staff of Favor, annulling the covenant. He asks for his wages and is paid thirty pieces of silver — which God tells him to throw to the potter in the house of the Lord, a "handsome price at which they valued me." The staff of Union is then broken. A foolish, worthless shepherd will replace the true one.',
    significance: 'The thirty pieces of silver passage (11:12-13) is one of the most important messianic texts for Christian theology, applied by Matthew 27:9 to Judas\'s betrayal price. The breaking of the two staffs symbolizes the dissolution of both God\'s protective covenant with the nations and the internal unity of God\'s people. The passage is among the most enigmatic in the prophets, layering multiple referents into a single dramatic act.',
    relationalNote: 'The flock that "detests" its own shepherd and values him at the price of a slave (thirty pieces of silver was the compensation for a slave gored by an ox, Exodus 21:32) captures the ultimate relational insult: the one who cares most is valued least.',
    conceptualNote: 'The theology of rejected leadership runs through the entire prophetic tradition, but Zechariah gives it its most compressed and bitter form. The true shepherd is underpaid and dismissed; the foolish shepherd who replaces him will not care for the wounded or feed the healthy. The passage suggests that communities often get the leaders they deserve — reject the faithful one and you inherit the negligent one.',
    climateNote: 'The shepherd imagery was deeply resonant in a society where sheep herding was a primary livelihood. The staffs named Favor and Union would have been recognizable shepherd\'s equipment given symbolic theological names.',
    modernParallel: 'The community that fires its most honest leader and hires a more compliant one, the congregation that dismisses the pastor who told the truth and calls one who tells them what they want to hear — this is the Zechariah 11 pattern. The thirty-pieces-of-silver insult speaks to every situation where someone\'s faithful service is valued at the lowest possible rate.',
    keyQuestions: JSON.stringify([
      'What does the thirty pieces of silver represent — and why is it called a "handsome price" sarcastically?',
      'What happens when a community breaks its staff of Favor (covenant with God) and Union (internal bonds)?',
      'How does the worthless shepherd contrast with the rejected true shepherd?',
      'Where do you see communities undervaluing the leaders who serve them most faithfully?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Thirty pieces of silver', target_audience: 'those whose faithful service has been undervalued', primary_theme: 'the cost of rejection and the value God places on faithfulness' },
      { angle: 'Broken staffs', target_audience: 'divided communities', primary_theme: 'what happens when covenant and unity are dissolved' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Grouped oracle covering ZEC 10-11. Thirty pieces of silver in Matthew 27 from standard NT/OT scholarship; shepherd traditions from Meyers, Petersen.'
  },

  {
    id: 'zec-final-day',
    title: 'The Final Day: Living Waters from Jerusalem',
    bookId: 'ZEC',
    chapterStart: 14,
    verseStart: 1,
    chapterEnd: 14,
    verseEnd: 21,
    summary: 'Zechariah closes with the most dramatic eschatological vision in the Minor Prophets. All nations gather against Jerusalem. The city is taken, houses looted, women violated. Then God goes out to fight, and His feet stand on the Mount of Olives, which splits in two. Living waters flow from Jerusalem, half to the eastern sea and half to the western. The Lord becomes king over the whole earth — "on that day the Lord will be one and His name one." The nations that attacked Jerusalem will be struck with plague, and the survivors will go up year after year to worship at the Feast of Tabernacles. Even the horse bells will bear the inscription "HOLY TO THE LORD," and the cooking pots in Jerusalem will be as holy as the sacred bowls before the altar. There will no longer be a merchant in the house of the Lord.',
    significance: 'Zechariah 14 is one of the most influential eschatological texts in the Bible. The Mount of Olives splitting and living waters flowing from Jerusalem directly inform the New Testament\'s portrayal of Christ\'s return (Acts 1:11-12). The holiness of horse bells and cooking pots represents the collapse of the sacred/secular divide — in the final reality, everything is holy. The Feast of Tabernacles as the universal festival of worship influenced John\'s Gospel (John 7:37-39) and the theology of water and Spirit.',
    relationalNote: 'The vision begins with devastating violence — the city taken, houses looted — and ends with universal worship and total holiness. The relational arc moves from the worst possible breach to the most comprehensive restoration. The surviving nations who attacked Jerusalem will themselves come to worship — former enemies become fellow worshippers.',
    conceptualNote: 'The most revolutionary theological claim in this chapter is that holiness will extend to the mundane. Horse bells and cooking pots becoming holy means the distinction between sacred and ordinary is abolished. This is not the sanctification of special objects but the holiness of all things in God\'s fully realized kingdom.',
    climateNote: 'The living waters flowing from Jerusalem to both the Dead Sea (eastern) and the Mediterranean (western) would transform the geography of the entire land. The Dead Sea, the lowest and most lifeless body of water on earth, receiving living water is an image of creation itself being renewed.',
    modernParallel: 'The vision of cooking pots as holy as temple bowls challenges every community that separates "sacred" activities (worship, prayer) from "secular" ones (cooking, working, commuting). Zechariah\'s final vision is a world where there is no longer any such division — where the Monday morning commute is as holy as the Sunday morning service.',
    keyQuestions: JSON.stringify([
      'What does it mean that the Mount of Olives splits and living waters flow in both directions?',
      'How does the holiness of cooking pots challenge the sacred/secular divide?',
      'Why is the Feast of Tabernacles chosen as the universal worship festival?',
      'What would a world look like where "the Lord is one and His name one"?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Holy cooking pots', target_audience: 'those who feel their daily work has no spiritual significance', primary_theme: 'the collapse of the sacred/secular divide in God\'s final reality' },
      { angle: 'Living waters flowing east and west', target_audience: 'communities longing for renewal', primary_theme: 'God\'s life-giving presence flowing in every direction' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering ZEC 14. Mount of Olives eschatology in Acts 1 from standard NT scholarship; living waters theology from Meyers, Boda.'
  },

  // ═══════════════════════════════════════════════════════════
  //  MALACHI
  // ═══════════════════════════════════════════════════════════

  // Missing: 1, 2. Existing: 3-4
  {
    id: 'mal-polluted-offerings',
    title: 'Polluted Offerings: When Worship Becomes Contempt',
    bookId: 'MAL',
    chapterStart: 1,
    verseStart: 1,
    chapterEnd: 1,
    verseEnd: 14,
    summary: 'God opens with a declaration of love — "I have loved you" — and Israel immediately pushes back: "How have you loved us?" The entire book will follow this disputation pattern: God states a truth, Israel challenges it, and God responds with evidence. The first dispute is about worship. The priests offer blind, lame, and sick animals on the altar — the leftovers and rejects — and then wonder why God does not accept their sacrifices. God\'s response is devastating: "Try offering them to your governor — would he be pleased with you?" Better to shut the temple doors entirely than to continue this insulting worship. And then the universalist bombshell: "From the rising of the sun to its setting, my name is great among the nations, and in every place incense is offered to my name" — a claim that genuine worship of God is already happening beyond Israel\'s borders.',
    significance: 'Malachi 1:11 is one of the most startling universalist claims in the Old Testament: God\'s name is great among the nations. While Israel offers defective worship, the wider world is already honoring God. This has been interpreted variously as referring to Jewish diaspora communities, sincere worship by Gentiles, or an eschatological vision, but in every reading it challenges Israel\'s assumption that it has a monopoly on access to God.',
    relationalNote: 'The disputation format throughout Malachi mirrors a marriage counseling session gone wrong: "I love you." "How?" "Here\'s the evidence." "That doesn\'t count." The people\'s inability to see God\'s love — and their contempt expressed through leftover offerings — reveals a relationship running on resentment rather than gratitude.',
    conceptualNote: 'The theology of offering quality is not about God needing perfect animals but about what the offering reveals about the offerer\'s heart. A blind lamb on the altar says: "You are not worth my best." The passage connects worship quality to relational honesty — you can tell what someone thinks of you by what they are willing to give.',
    climateNote: 'Post-exilic Judah was a poor, struggling community. The temptation to offer defective animals was real — the healthy ones were needed for breeding and labor. But Malachi insists that economic hardship does not excuse contemptuous worship.',
    modernParallel: 'Every perfunctory offering — the check written carelessly, the volunteer hour given grudgingly, the prayer rattled off while checking your phone — is a defective lamb on the altar. Malachi asks: would you give this to your boss? Then why are you giving it to God?',
    keyQuestions: JSON.stringify([
      'What does the quality of our offerings reveal about our relationship with God?',
      'How does Malachi 1:11 challenge the idea that genuine worship is limited to one tradition?',
      'What does the disputation format reveal about the state of the God-Israel relationship?',
      'Where are you offering your "leftovers" rather than your best?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'Would your governor accept it?', target_audience: 'communities going through the motions of worship', primary_theme: 'the connection between offering quality and relational honesty' },
      { angle: 'My name is great among the nations', target_audience: 'communities with a tribal view of God', primary_theme: 'God\'s reach extends beyond our boundaries' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering MAL 1. Disputation form analysis from Petersen, Hill; universalist reading of 1:11 widely debated.'
  },

  {
    id: 'mal-covenant-of-marriage',
    title: 'The Covenant of Marriage: Faithlessness in Worship and Family',
    bookId: 'MAL',
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 2,
    verseEnd: 16,
    summary: 'God addresses the priests with a curse: if they do not honor His name, He will spread dung on their faces — the offal from their sacrificial animals. The covenant with Levi was one of life and peace, but the priests have corrupted it. "The lips of a priest ought to preserve knowledge, and from his mouth people should seek instruction — because he is the messenger of the LORD." But the priests have caused many to stumble. The passage then shifts to the community: Judah has been unfaithful by marrying the daughters of foreign gods and by breaking faith with the wives of their youth. "The LORD is acting as witness between you and the wife of your youth... She is your partner, the wife of your marriage covenant. Has not the one God made you? In flesh and spirit you are his. And what does the one God seek? Godly offspring." The section concludes: "I hate divorce, says the LORD."',
    significance: 'Malachi 2 is one of the most important biblical texts on both religious leadership and marriage. The indictment of the priests — who should preserve knowledge but instead cause stumbling — is a permanent charge sheet for clergy misconduct. The marriage passage is among the most frequently cited in wedding ceremonies and marriage counseling, establishing the covenantal nature of marriage with God as witness.',
    relationalNote: 'The connection between unfaithful worship and unfaithful marriage is not accidental in Malachi — both are covenant violations. The men who divorce their Israelite wives to marry foreign women are committing the same sin in their marriages that the priests are committing at the altar: treating a sacred covenant as disposable.',
    conceptualNote: 'The "wife of your youth" passage establishes marriage as a three-party covenant: husband, wife, and God as witness. This means that marital faithfulness is not just a personal preference or social convention but a theological obligation. God is not a distant observer of marriage but an active witness who holds both parties accountable.',
    climateNote: 'Intermarriage with foreign women was a significant issue in the post-exilic community. Ezra and Nehemiah also address it, though with different approaches. The foreign marriages Malachi condemns appear to involve divorcing Israelite wives to form politically or economically advantageous unions.',
    modernParallel: 'The priest who should preserve knowledge but instead causes stumbling is every religious leader who uses their position for personal benefit rather than communal edification. The "wife of your youth" passage speaks to every marriage where convenience, advancement, or novelty has been prioritized over the commitment made at the altar.',
    keyQuestions: JSON.stringify([
      'What does it mean that the priest\'s lips should "preserve knowledge"?',
      'How does Malachi connect unfaithful worship with unfaithful marriage?',
      'What does God as "witness" to marriage add to our understanding of marital covenant?',
      'How should we read "I hate divorce" — as an absolute prohibition or as a statement about God\'s grief?'
    ]),
    preachingAngles: JSON.stringify([
      { angle: 'The priest who causes stumbling', target_audience: 'religious leaders examining their own faithfulness', primary_theme: 'the sacred responsibility of spiritual leadership' },
      { angle: 'The wife of your youth', target_audience: 'married couples and pre-marital counseling contexts', primary_theme: 'marriage as a covenant with God as witness' }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: 'Standalone oracle covering MAL 2. Marriage covenant theology from Hugenberger; priestly critique from Hill, Petersen.'
  },

];

/* ═══════════════════════════════════════════════════════════════════
 *  INSERT
 * ═══════════════════════════════════════════════════════════════════ */
const ids = rows.map(r => r.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
  console.error(`Duplicate IDs: ${dupes.join(', ')}`);
  db.close();
  process.exit(1);
}

const batchInsert = db.transaction(() => {
  let inserted = 0;
  for (const r of rows) {
    insert.run(r);
    inserted++;
  }
  return inserted;
});

const inserted = batchInsert();
console.log(`Inserted ${inserted} narrative units.`);

const count = (db.prepare('SELECT COUNT(*) as c FROM narrative_units').get()).c;
console.log(`Total narrative_units now: ${count}`);

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM narrative_units
  WHERE book_id IN ('ISA','JER','LAM','EZK','DAN','HOS','AMO','MIC','ZEC','MAL')
  GROUP BY book_id ORDER BY MIN(rowid)
`).all();
for (const row of byBook) {
  console.log(`  ${row.book_id}: ${row.c}`);
}

db.close();
