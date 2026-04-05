/**
 * Insert missing narrative_units for Wisdom/Poetry gaps.
 *
 * Missing chapters:
 *   JOB: 6,7,15,16,17,18,19,20,21,22,23,24,25,26,27           (15 ch)
 *   PSA: 3-7,9-12,44-72,74-87,89,91-102,104-118,120-136,
 *        138,140-144                                            (102 ch)
 *   ECC: 2                                                      (1 ch)
 *   SNG: 6,7                                                    (2 ch)
 *
 * Grouping strategy:
 *   JOB  — dialogue cycles (second & third rounds)
 *   PSA  — thematic/collection groupings (3-10 psalms per unit)
 *   ECC  — single unit for ch 2
 *   SNG  — single unit for ch 6-7
 *
 * source_tier = 'ai_assisted' for all rows.
 */

const Database = require('better-sqlite3');
const db = new Database('data/selah.db');
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Guard: collect existing IDs so we can skip duplicates ──────────────────
const existingIds = new Set(
  db.prepare(`SELECT id FROM narrative_units WHERE book_id IN ('JOB','PSA','ECC','SNG')`)
    .all().map(r => r.id)
);

// ─── INSERT statement ───────────────────────────────────────────────────────
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

// ═════════════════════════════════════════════════════════════════════════════
//  NARRATIVE UNIT DATA
// ═════════════════════════════════════════════════════════════════════════════

const units = [

  // ═══════════════════════════════════════════════════════════════════════════
  //  JOB — Second & Third Dialogue Cycles (15 chapters)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'job-first-reply',
    title: "Job's First Reply to Eliphaz: Anguish Justified",
    bookId: 'JOB',
    chapterStart: 6,
    verseStart: 1,
    chapterEnd: 7,
    verseEnd: 21,
    summary: "Job responds to Eliphaz's careful first speech with raw, unfiltered anguish. Chapter 6 opens with Job wishing his grief could be weighed on scales — it would outweigh the sand of the seas. He defends his outcry: a wild donkey does not bray over fresh grass; his braying is proportional to his pain. Then he turns on his friends with one of the most devastating metaphors in the book: they are like seasonal wadis — desert streams that flood in winter rains but vanish precisely when summer travelers need water most. Caravans from Tema and Sheba look for the streams and find nothing. 'Such you have now become to me,' Job says. He did not even ask them for money or rescue — just honest companionship, and they could not manage it. Chapter 7 shifts from friends to God: life is forced labor, nights are endless, flesh is covered with worms and dirt. Job asks God directly: 'Am I the sea, or the sea dragon, that you set a guard over me?' He takes the language of Psalm 8 — 'What is man that you are mindful of him?' — and inverts it from praise to accusation. Why does God pay such relentless attention to a creature who will soon be dust?",
    significance: "Job 6-7 establishes a pattern that will define the entire dialogue section: the friends offer theology, and Job responds with experience. The wadi metaphor is not merely literary decoration — it is a theological indictment of any comfort that disappears when the heat rises. Job also performs the radical theological move of taking Israel's worship language and turning it against God. The inversion of Psalm 8 is deliberate: if divine attention is supposed to be a blessing, Job experiences it as surveillance. This anticipates the modern problem of theodicy — the God who sees everything is also the God who watches suffering without intervening.",
    relationalNote: "The wadi metaphor reveals what Job most needs and least receives: reliable friendship. The friends are not malicious; they are seasonal — present when conditions are easy, absent when the desert heat of real suffering arrives. Job's complaint is not that they are wrong (though they are) but that they are unreliable. The distinction between theological correctness and relational faithfulness is one of the book's most enduring insights.",
    conceptualNote: "The inversion of Psalm 8 in Job 7:17-18 is one of the most sophisticated theological moves in the Hebrew Bible. The psalm celebrates divine attention as grace; Job reframes it as persecution. Both readings are grammatically possible from the same Hebrew text, which means the words themselves contain the ambiguity. Whether God's watchfulness is blessing or burden depends entirely on the experiencer's situation — a conclusion that systematic theology resists but pastoral theology confirms.",
    climateNote: "The wadi imagery draws on the seasonal streams of the Transjordan and Negev, which flood during winter rains and become bone-dry channels in the summer months. Caravans crossing the desert depended on knowing which wadis held water; a dry wadi meant possible death. The metaphor would have been viscerally understood by any listener in the ancient Near East, where water reliability was literally a matter of survival.",
    modernParallel: "Job's complaint about fair-weather friends resonates in any era. The friend who promises 'I am here for you' and then stops returning calls after two weeks. The church that rallies around a crisis for the first month and then moves on. The wadi metaphor names a pattern that grief counselors document routinely: social support follows a sharp decay curve after initial tragedy. Job wanted someone who would still be there when the streambed was dry.",
    keyQuestions: JSON.stringify([
      "Have you ever experienced the 'wadi' pattern — friends or community who were present in the early crisis but absent in the long suffering?",
      "Job takes Psalm 8's celebration of divine attention and turns it into an accusation. Can the same theological truth be both blessing and curse depending on context?",
      "What does it look like to be a perennial stream rather than a seasonal wadi for someone who is suffering?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Fair-Weather Friends: When the Wadi Runs Dry", target_audience: "Anyone navigating long-term suffering and social isolation", primary_theme: "Reliable presence vs. seasonal comfort" },
      { angle: "When Psalm 8 Becomes an Accusation: The God Who Won't Look Away", target_audience: "People struggling with the feeling that God's attention is oppressive rather than comforting", primary_theme: "Divine attention as both gift and burden" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Newsom's 'The Book of Job: A Contest of Moral Imaginations,' Habel's OTL commentary, and Clines's WBC Job 1-20. Wadi ecology per Hillel's 'Rivers of Eden.'"
  },

  {
    id: 'job-eliphaz-second-speech',
    title: "Eliphaz's Second Speech: The Hardening of Dogma",
    bookId: 'JOB',
    chapterStart: 15,
    verseStart: 1,
    chapterEnd: 15,
    verseEnd: 35,
    summary: "Eliphaz drops the pastoral gentleness of his first speech and attacks directly. He accuses Job of undermining piety itself: 'You are doing away with the fear of God and hindering meditation before God.' Where he once offered a comforting vision and spoke tentatively, he now lectures with cold certainty. He appeals to the tradition of the elders — wisdom passed down from fathers who received the land before any foreigner walked among them — as though ancient pedigree settles theological disputes. His portrait of the wicked person is vivid and specific: a man who shakes his fist at God, who charges at the Almighty with a thick-bossed shield, who has grown fat on the prosperity that will soon destroy him. The wicked man lives in ruined cities, in houses destined to become rubble. His branch will not be green; flame will dry up his shoots. The speech is a masterpiece of retribution theology applied as a weapon: every detail of the wicked man's fate is designed to mirror Job's situation, though Eliphaz never names Job directly.",
    significance: "The second cycle marks the deterioration of the friends' empathy. Eliphaz's first speech was careful, even tender. His second is prosecutorial. The shift reveals how theological systems under pressure become more rigid rather than more flexible. When Job's suffering refused to fit Eliphaz's framework, Eliphaz did not revise the framework — he revised his assessment of Job. This is the book's most devastating critique of dogmatic theology: it sacrifices the person to preserve the system.",
    relationalNote: "Eliphaz's shift from compassion to condemnation maps a relational pattern that pastors and counselors recognize: the helper who becomes the accuser when the sufferer refuses to get better on schedule. The unspoken logic is: 'I offered you the right answer. Your continued suffering proves you did not accept it. Therefore the problem is you.' The relationship has become transactional — comfort was offered as a loan, and Job's failure to recover is treated as a default.",
    conceptualNote: "Eliphaz's appeal to ancestral tradition is a common rhetorical move in wisdom literature: the older the source, the more authoritative the claim. But the book of Job systematically undermines this assumption. The wisdom of the fathers is not wrong in general; it is wrong in this specific case. The book's argument is not against tradition per se but against tradition that has become unfalsifiable — that interprets all counter-evidence as the fault of the questioner rather than the theory.",
    climateNote: "The imagery of dried branches, scorched shoots, and cities reduced to rubble draws on the agricultural and architectural fragility of the ancient Near East, where a single drought season could strip orchards bare and abandoned mud-brick settlements would crumble within a generation. Eliphaz's portrait of divine judgment uses the landscape of ruin that was visible everywhere in the region.",
    modernParallel: "Eliphaz's second speech is the voice of every system that blames the sufferer when the system's solution does not work. The patient told their chronic pain is psychosomatic because the tests came back normal. The unemployed worker told they are not trying hard enough. The church member whose depression is attributed to insufficient faith. The hardening of Eliphaz is the hardening of any ideology that cannot accommodate the evidence of innocent suffering.",
    keyQuestions: JSON.stringify([
      "Why does Eliphaz become harsher in his second speech rather than more compassionate? What drives the hardening of dogma?",
      "When have you seen a theological or ideological framework blame the sufferer rather than revise itself?",
      "Eliphaz appeals to ancestral tradition. When is tradition a reliable guide, and when does it become a weapon?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When the Helper Becomes the Accuser", target_audience: "Pastors and counselors navigating compassion fatigue", primary_theme: "The shift from empathy to judgment when suffering persists" },
      { angle: "The Unfalsifiable System: When Theology Cannot Be Wrong", target_audience: "Anyone who has been blamed by a system for their own suffering", primary_theme: "The danger of ideologies that interpret all counter-evidence as user error" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 1-20, Newsom's 'Contest of Moral Imaginations,' and Balentine's Smyth & Helwys commentary on Job's dialogue cycles."
  },

  {
    id: 'job-reply-to-eliphaz-second',
    title: "Job's Reply to Eliphaz: Miserable Comforters Are You All",
    bookId: 'JOB',
    chapterStart: 16,
    verseStart: 1,
    chapterEnd: 17,
    verseEnd: 16,
    summary: "Job delivers one of the sharpest lines in the Bible: 'Miserable comforters are you all!' He tells the friends he could do what they do — pile up words, shake his head in mock sympathy — if their positions were reversed, but he would not. He would strengthen them with his mouth; the solace of his lips would assuage their pain. Then he turns to God and the language becomes legal: 'God has worn me out, shriveled me up, torn me in his wrath, gnashed his teeth at me.' Job describes himself as a target for divine archery — God's archers surround him, pierce his kidneys, pour out his gall. Yet in the same breath he makes his most audacious claim: 'Even now, behold, my witness is in heaven, and he who testifies for me is on high.' Job appeals to God against God — asking the heavenly witness to testify against the earthly tormentor. Chapter 17 spirals into despair: his spirit is broken, his days are extinct, mockers surround him. He sees the grave as his only house, corruption as his family. 'Where then is my hope? Who will see my hope?'",
    significance: "The cry for a heavenly witness (16:19) is the second in a series of legal appeals that climax in chapter 19's redeemer. Job is constructing a case within God's own court — demanding that the divine judge provide a divine advocate. This is theologically extraordinary: Job splits the divine identity into accuser and defender, refusing to accept that the God who wounds is the only God there is. The church would later see in these passages a foreshadowing of Christ as advocate, but the original text is doing something more radical: insisting that justice must exist even within God's own nature.",
    relationalNote: "Job's rebuke of his friends — 'miserable comforters' — has become proverbial for a reason. His counter-proposal is striking: if roles were reversed, he would strengthen them rather than lecture them. Job defines true friendship not as having the right answers but as using whatever resources you have to build someone up rather than tear them down. The relational failure of the friends is not ignorance but orientation: they are oriented toward being right rather than being present.",
    conceptualNote: "The heavenly witness concept draws on ancient Near Eastern legal practice where a third-party witness could testify on behalf of someone in a dispute. Job transposes this courtroom procedure into theology: he needs someone in the heavenly court to speak for him against the divine prosecutor. The conceptual tension — appealing to God against God — is one of the most daring theological moves in the Hebrew Bible and anticipates later doctrines of divine mediation.",
    climateNote: "Job's description of himself as a divine archery target uses military imagery familiar in the ancient Near East, where composite bow warfare was devastating. The pierced kidneys and poured-out gall describe wounds from arrows that penetrate deep into the torso — the kind of battlefield injury that was invariably fatal in a world without surgery.",
    modernParallel: "The phrase 'miserable comforters' applies to every well-meaning intervention that makes things worse: the grief card with a Bible verse that implies the mourner should be over it by now, the cancer diagnosis met with 'everything happens for a reason,' the depression responded to with 'have you tried just being grateful?' Job's counter-offer — 'I would strengthen you with my mouth' — is not a technique but an orientation. The question is not what to say but what you are trying to do: are you trying to fix the person or fortify them?",
    keyQuestions: JSON.stringify([
      "Job says he could comfort his friends better than they comfort him. What distinguishes strengthening someone from lecturing them?",
      "What does it mean to appeal to God against God — to demand that the divine accuser also provide a divine advocate?",
      "Job spirals between legal defiance (ch 16) and total despair (ch 17). Is this incoherence, or does it reflect the real shape of grief?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Miserable Comforters: The Art of Making Suffering Worse", target_audience: "Anyone in a caring profession — pastors, chaplains, therapists, friends", primary_theme: "The difference between fixing and fortifying" },
      { angle: "My Witness Is in Heaven: Appealing to God Against God", target_audience: "People in spiritual crisis who feel God is both the problem and the only possible solution", primary_theme: "The audacity of demanding divine justice from the divine judge" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Habel's OTL commentary, Clines's WBC Job 1-20, and Janzen's Interpretation commentary. Heavenly witness motif per Mowinckel and Day."
  },

  {
    id: 'job-bildad-second-speech',
    title: "Bildad's Second Speech: The Fate of the Wicked",
    bookId: 'JOB',
    chapterStart: 18,
    verseStart: 1,
    chapterEnd: 18,
    verseEnd: 21,
    summary: "Bildad's second speech is a single, sustained portrait of what happens to the wicked — and every detail is a barely veiled description of Job's situation. He opens with irritation: 'How long will you hunt for words?' Then he paints the wicked man's fate in dark, vivid strokes: his light is put out, his fire gives no warmth, the lamp above him is extinguished. He walks into his own trap; his feet are caught in a net. Terrors frighten him on every side. His skin is consumed, the firstborn of death devours his limbs. He is torn from his tent — his security — and marched before the king of terrors. Brimstone is scattered on his habitation. His roots dry up beneath, his branch withers above. His memory perishes from the earth; he has no name in the street. He has no offspring or descendant among his people. Bildad's conclusion is blunt: 'Surely such are the dwellings of the unrighteous, and this is the place of him who does not know God.' Every image — lost children, destroyed property, physical disease, social erasure — matches Job's circumstances precisely. Bildad does not need to accuse Job explicitly; the portrait is the accusation.",
    significance: "Bildad's speech exemplifies the retribution principle at its most rigid and its most cruel. The theological framework is impeccable in the abstract: the wicked suffer, the righteous prosper, and the universe maintains moral order. But applied to a specific innocent sufferer, this framework becomes an instrument of torture. The reader, who knows from the prologue that Job is blameless, watches Bildad construct a portrait of wickedness that perfectly describes an innocent man. This is the book's central dramatic irony weaponized: correct theology producing monstrous pastoral outcomes.",
    relationalNote: "Bildad does not ask Job a single question in this speech. He does not inquire about Job's experience or invite dialogue. He lectures, and the lecture is a trap: if Job protests, he confirms the portrait of someone who 'does not know God.' The relational dynamic has shifted entirely from conversation to prosecution. Bildad is no longer a friend seeking to help; he is an attorney building a case.",
    conceptualNote: "The 'king of terrors' in verse 14 is a personification of death that draws on ancient Near Eastern mythology, where Mot (death) was depicted as a royal figure who swallowed the living. Bildad's speech operates within a tightly closed theological system where outcomes reveal character — a system that the book of Job exists to dismantle.",
    climateNote: "The fire and lamp imagery reflects the centrality of flame in ancient domestic life, where a household's lamp burning through the night signified prosperity and continuity. An extinguished lamp meant an empty house — a family line ended. The dried roots and withered branches evoke the precarious existence of trees in semi-arid landscapes where even a brief interruption of water supply is fatal.",
    modernParallel: "Bildad's speech is the logic of every prosperity gospel sermon applied in reverse: if blessing proves favor, then suffering proves fault. It is also the logic of social media judgment, where a person's circumstances are treated as evidence of their character. The foreclosed house proves financial irresponsibility. The divorce proves relational failure. The illness proves lifestyle choices. Bildad's portrait of the wicked is a template for victim-blaming across every era.",
    keyQuestions: JSON.stringify([
      "Bildad never names Job, but his portrait of the wicked matches Job's situation exactly. Is this deliberate cruelty or theological blindness?",
      "How does the retribution principle — the idea that outcomes reveal character — operate in modern culture, even outside religious contexts?",
      "What is the pastoral cost of a theology that cannot accommodate innocent suffering?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Portrait That Fits: When Theology Becomes a Weapon", target_audience: "Anyone who has been told their suffering proves their sin", primary_theme: "The cruelty of retribution theology applied to specific cases" },
      { angle: "The King of Terrors: Facing Death Without Easy Answers", target_audience: "People confronting mortality — their own or a loved one's", primary_theme: "Honest engagement with death vs. theological platitudes" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 1-20, Habel's OTL commentary, and Pope's Anchor Bible Job. King of terrors motif per Tromp's 'Primitive Conceptions of Death.'"
  },

  {
    id: 'job-reply-to-bildad-second',
    title: "Job's Reply to Bildad: I Know That My Redeemer Lives",
    bookId: 'JOB',
    chapterStart: 19,
    verseStart: 1,
    chapterEnd: 19,
    verseEnd: 29,
    summary: "Job's reply to Bildad's second speech contains both his lowest point and his highest. He begins with an anguished catalogue of isolation: God has walled up his way, stripped him of glory, uprooted his hope like a tree. His brothers are estranged, his relatives have failed him, his servants treat him as a stranger, his wife finds his breath repulsive, even young children despise him. His bones cling to his skin, and he has escaped by the skin of his teeth. Then comes the pivot — one of the most famous passages in all of Scripture: 'I know that my Redeemer lives, and at the last he will stand upon the earth. And after my skin has been thus destroyed, yet in my flesh I shall see God, whom I shall see for myself, and my eyes shall behold, and not another.' The Hebrew is notoriously difficult and contested, but the emotional trajectory is unmistakable: from total abandonment to defiant hope. Job demands that his words be inscribed with an iron pen on rock forever — he wants a permanent record of both his suffering and his faith.",
    significance: "The go'el (redeemer/vindicator) passage is one of the most theologically loaded verses in the Hebrew Bible. In its original context, the go'el was a legal figure — a kinsman-redeemer who would defend a vulnerable family member's rights, redeem their property, or avenge their blood. Job is claiming that he has a cosmic go'el who will vindicate him after death if necessary. Christian tradition has read this as a prophecy of resurrection and Christ; the original Hebrew is more ambiguous but no less radical. Job insists on vindication even if it comes posthumously. This is faith that survives the death of every other hope.",
    relationalNote: "The catalogue of broken relationships in 19:13-22 is the most complete inventory of social death in the Bible. Every concentric circle of relationship has collapsed: family, household, community. The isolation is total. Against this backdrop, Job's appeal to a redeemer is not abstract theology — it is the cry of someone who has no human advocate left and must find a cosmic one or perish without witness.",
    conceptualNote: "The go'el concept bridges legal, familial, and theological categories. In Israelite law, the go'el redeemed land (Leviticus 25), avenged blood (Numbers 35), and married a kinsman's widow (Ruth). Job transposes this earthly institution into the heavenly realm — demanding that God fulfill the go'el role even when God appears to be the adversary. The theological complexity is staggering: the accuser must also be the redeemer.",
    climateNote: "The desire to inscribe words with an iron pen on rock reflects the monumental inscription practices of the ancient Near East, where important legal declarations and royal edicts were carved into cliff faces and stelae to survive beyond any single generation. In a culture without paper archives, rock inscription was the closest thing to permanence — and Job wants his case preserved forever.",
    modernParallel: "The phrase 'I know that my Redeemer lives' has been set to music so often that its original context of utter desperation is frequently lost. These words are not spoken from a place of comfort but from the absolute bottom — after everyone has abandoned Job and his own body is failing. The power of the statement comes from its setting: this is faith that exists not because of evidence but in spite of total counter-evidence. It resonates with anyone who has ever maintained hope when every rational reason for hope has been removed.",
    keyQuestions: JSON.stringify([
      "Job moves from total isolation (19:13-22) to defiant hope (19:25-27) in a few verses. What enables this shift?",
      "What does it mean that Job's redeemer must also be his accuser? Can God be both adversary and advocate?",
      "Job wants his words carved in rock — a permanent record. Why does the act of recording suffering matter?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "I Know That My Redeemer Lives — From the Bottom, Not the Top", target_audience: "Anyone whose faith persists in the absence of evidence", primary_theme: "Hope as defiance rather than optimism" },
      { angle: "Social Death: When Every Circle of Relationship Collapses", target_audience: "People experiencing profound isolation — illness, incarceration, estrangement", primary_theme: "The search for a cosmic advocate when all human advocates have gone" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 1-20, Habel's OTL commentary, Pope's Anchor Bible Job, and Janzen's Interpretation commentary. Go'el analysis per Levenson and Hubbard."
  },

  {
    id: 'job-zophar-second-speech',
    title: "Zophar's Second Speech: The Short-Lived Triumph of the Wicked",
    bookId: 'JOB',
    chapterStart: 20,
    verseStart: 1,
    chapterEnd: 20,
    verseEnd: 29,
    summary: "Zophar, the most blunt of the three friends, doubles down on retribution theology with a speech about the fleeting nature of wicked prosperity. His agitation is visible from the opening: 'My disturbing thoughts make me respond, because of the turmoil within me.' The gist is simple and forceful: the joy of the wicked is momentary, his prosperity is an illusion that will be violently reversed. The wicked man swallows wealth but God makes him vomit it up. He sucks the poison of cobras; the viper's tongue kills him. He will not enjoy the streams of honey and butter he accumulated. He must give back the profit of his schemes; his riches bring no pleasure. Because he oppressed the poor and seized houses he did not build, he will know no quiet in his belly, no escape from his greed. In the fullness of his sufficiency he will be in distress. God will rain fury on him while he is eating — the ultimate image of judgment arriving in the middle of indulgence. 'This is the wicked man's portion from God, the heritage decreed for him by God.'",
    significance: "Zophar's speech completes the friends' theological triptych in the second cycle. All three have now argued the same thesis with different imagery: the wicked suffer, therefore the sufferer is wicked. Zophar's contribution is the idea that wicked prosperity is itself a form of judgment — the wealth that the wicked enjoy is actually the poison that will kill them. This is a sophisticated theological move that makes retribution unfalsifiable: if the wicked prosper, the prosperity is temporary; if they suffer, the suffering is deserved. Either way, the system works. The book of Job exists to expose exactly this kind of closed-loop reasoning.",
    relationalNote: "Zophar's opening admission of inner turmoil is the most honest moment from the friends in the second cycle. He is not simply reciting doctrine; he is disturbed. Job's arguments are getting under his skin. But rather than allow the disturbance to open him to new possibilities, Zophar uses it as fuel for a more aggressive restatement of the old position. This is a relational pattern: when someone's pain challenges our framework, the anxiety we feel can push us toward either growth or entrenchment. Zophar chooses entrenchment.",
    conceptualNote: "The image of God forcing the wicked to vomit up their wealth draws on the ancient Near Eastern concept of cosmic rebalancing — the idea that the universe has a built-in mechanism for restoring equilibrium. Wealth unjustly gained is a foreign body that the cosmic order will eventually expel. This is not mere metaphor but a statement about the moral structure of reality. The problem, as Job will point out, is that reality frequently fails to cooperate with this theory.",
    climateNote: "Zophar's imagery of streams flowing with honey and butter evokes the pastoral abundance of the land — apiary and dairy products being marks of a prosperous semi-nomadic economy. The contrast with viper poison draws on the real danger of snakes in the rocky terrain of the ancient Near East, where vipers sheltered in stone walls and could strike without warning.",
    modernParallel: "Zophar's argument is the moral logic behind every headline about a corrupt executive finally facing justice or a fraudulent empire collapsing. 'They got what they deserved' satisfies something deep in the human desire for cosmic fairness. The problem is that for every fraudster who is exposed, a hundred prosper unmolested, and for every wicked person whose wealth becomes poison, there is a Job whose righteousness brings nothing but ash.",
    keyQuestions: JSON.stringify([
      "Zophar makes wicked prosperity into its own punishment. Is this insight or rationalization?",
      "Zophar admits he is troubled by Job's arguments. What happens when we use anxiety as fuel for dogma rather than openness?",
      "Does the universe actually have a self-correcting moral mechanism, or is that a comforting fiction?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Vomit Principle: When Systems Claim to Be Self-Correcting", target_audience: "Anyone frustrated by the persistence of unjust prosperity", primary_theme: "The gap between moral theory and observable reality" },
      { angle: "Disturbed but Unchanged: When Anxiety Hardens Rather Than Opens", target_audience: "Leaders and communities facing uncomfortable truths", primary_theme: "The choice between entrenchment and growth when challenged" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 1-20, Habel's OTL commentary, and Newsom's 'Contest of Moral Imaginations.' Cosmic rebalancing concept per Koch's 'Is There a Doctrine of Retribution in the Old Testament?'"
  },

  {
    id: 'job-reply-to-zophar-second',
    title: "Job's Reply to Zophar: The Wicked Do Prosper",
    bookId: 'JOB',
    chapterStart: 21,
    verseStart: 1,
    chapterEnd: 21,
    verseEnd: 34,
    summary: "Job demolishes the retribution principle with empirical observation. He tells the friends: look at the actual evidence. The wicked live to old age, grow mighty in power, see their children established, and their houses are safe from fear. Their bulls breed without fail, their cows calve without miscarriage, their children dance and sing. They spend their days in prosperity and go down to Sheol in peace. And these are people who say to God, 'Depart from us! We do not desire the knowledge of your ways. What is the Almighty that we should serve him?' Job challenges the friends' evasion: 'How often is the lamp of the wicked put out? How often does their calamity come upon them?' The answer, he implies, is: not nearly as often as your theology requires. When the friends suggest that if the wicked escape, their children will be punished, Job replies with devastating logic: 'Let their own eyes see their destruction. What do they care about their households after them?' Punishing children for parents' sins is not justice; it is evasion. Job concludes: 'How then will you comfort me with empty nothings? There is nothing left of your answers but falsehood.'",
    significance: "Job 21 is the most philosophically rigorous speech in the dialogues. Job does what the friends refuse to do: look at the evidence. His argument anticipates every later theodicy discussion by insisting that theological claims must answer to observable reality. The wicked do prosper. The righteous do suffer. Any theology that cannot account for this is not a theology but an anesthetic. The friends' retreat to intergenerational punishment — the children will pay — is exposed as morally bankrupt. Job insists that justice delayed beyond death is justice denied.",
    relationalNote: "Job asks his friends for one small thing: 'Listen carefully to my words, and let this be your consolation.' He is not even asking them to agree. He is asking them to listen. The request reveals how thoroughly the conversation has broken down. The friends' inability to hear Job's evidence — to sit with facts that challenge their framework — is the relational core of the book's tragedy. Every broken pastoral relationship follows this pattern: one party needs to be heard; the other party needs to be right.",
    conceptualNote: "Job's empirical argument against retribution theology anticipates the philosophical problem of evil formulated by Epicurus and developed by Hume and Mackie. If God is just and powerful, why do the wicked prosper and the righteous suffer? The friends attempt to dissolve the problem by redefining terms (the prosperity is temporary, the children will be punished). Job refuses these moves and insists on facing the raw data. The book does not ultimately answer the problem of evil — it reframes it from a philosophical puzzle to a relational encounter (chapters 38-41).",
    climateNote: "Job's description of the wicked's prospering flocks — bulls breeding successfully, cows calving without loss — speaks directly to the pastoral economy where livestock health was the primary measure of wealth and divine favor. In a world without veterinary medicine, successful breeding seasons were attributed to divine blessing. Job's point is that this blessing falls on the godless as readily as the faithful.",
    modernParallel: "Job 21 is the text for anyone who has looked at the evidence and found the prosperity gospel wanting. The drug lord who dies peacefully in his bed at 90. The honest worker who loses everything in a rigged system. The faithful believer whose prayers go unanswered while the person who never prayed lives without a care. Job's argument is not cynicism — it is realism, and the book validates it. God never tells Job he was wrong about the evidence. God reframes the question, but the evidence stands.",
    keyQuestions: JSON.stringify([
      "Job says the wicked prosper and die in peace. Does your theology have an honest answer to this observation?",
      "The friends retreat to intergenerational punishment. Why is 'the children will pay' morally unsatisfying?",
      "Job asks the friends simply to listen. Why is listening to uncomfortable evidence so difficult?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Look at the Evidence: When Theology Must Answer to Reality", target_audience: "People whose experience contradicts the theological answers they have been given", primary_theme: "The moral imperative of empirical honesty in theology" },
      { angle: "Empty Comfort: When Reassurance Is Actually Falsehood", target_audience: "Pastors and counselors who feel pressure to provide answers they do not believe", primary_theme: "The cost of choosing comfort over truth" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 1-20, Newsom's 'Contest of Moral Imaginations,' and Gordis's 'The Book of God and Man.' Theodicy parallels per Laato & de Moor's 'Theodicy in the World of the Bible.'"
  },

  {
    id: 'job-eliphaz-third-speech',
    title: "Eliphaz's Third Speech: The Direct Accusation",
    bookId: 'JOB',
    chapterStart: 22,
    verseStart: 1,
    chapterEnd: 22,
    verseEnd: 30,
    summary: "Eliphaz's third speech crosses a line. He abandons general principles and accuses Job directly of specific sins: 'Is not your wickedness great? There is no end to your iniquities.' He charges Job with taking pledges from the naked, withholding bread from the hungry, refusing water to the weary, and sending widows away empty. These are social justice crimes — violations of the covenant obligation to protect the vulnerable. None of them are true. The reader knows this from the prologue; Job is 'blameless and upright.' But Eliphaz has reached the logical terminus of his theology: since Job is suffering, Job must have sinned. Since the suffering is severe, the sin must be severe. The specific charges are fabricated to fit the magnitude of the punishment. Then Eliphaz pivots to an appeal: if Job will return to the Almighty, he will be restored. Gold will be his plenty, God will hear his prayer, light will shine on his ways. The speech combines the cruelest accusation in the dialogues with the most beautiful invitation to repentance — and both are based on the same false premise.",
    significance: "Eliphaz's third speech reveals the ultimate consequence of retribution theology taken to its logical end: the invention of sin to explain suffering. When the evidence does not fit the theory, the theologian fabricates evidence. This move has been replicated throughout history — from medieval plague victims accused of secret sin, to AIDS patients in the 1980s, to poverty attributed to moral failure. The speech is the book of Job's most explicit demonstration of how theology can produce injustice.",
    relationalNote: "The relationship between Job and Eliphaz has completed its arc from compassion to condemnation. The man who sat in silence for seven days now invents crimes to accuse his friend of. The deterioration is total. And yet the speech ends with genuine tenderness — 'If you return to the Almighty, you will be restored.' Eliphaz genuinely wants Job to be well. His cruelty is not malice; it is the fruit of a system that can only offer restoration through confession. The tragedy is that the path to healing Eliphaz offers requires Job to lie about himself.",
    conceptualNote: "The specific sins Eliphaz alleges — stripping the naked, refusing food and water, oppressing widows — are drawn from the covenant obligations enumerated in Deuteronomy and the prophets. These are not random accusations but the standard charges brought against covenant violators in Israelite legal tradition. Eliphaz is using the prophetic indictment form, which gives his fabrications an air of divine authority. The form is legitimate; the application is false.",
    climateNote: "The social crimes Eliphaz alleges take on particular gravity in an arid, subsistence economy where withholding water could mean death and refusing bread during drought was tantamount to murder. The vulnerability of widows and orphans was not metaphorical but physical — without a male provider in a patriarchal economy, they faced starvation and exposure.",
    modernParallel: "Eliphaz's speech is the logic of every system that requires the sufferer to confess a sin they did not commit before they can receive help. The employee told they must have done something wrong before HR will investigate the harassment. The patient whose symptoms are dismissed until they admit to a lifestyle factor that does not exist. The church member told to repent of unnamed sins before they can be prayed for. The demand for false confession as the price of care is one of the most insidious forms of institutional abuse.",
    keyQuestions: JSON.stringify([
      "Eliphaz invents specific sins to explain Job's suffering. Where do we see this pattern — fabricating fault to explain misfortune — in modern life?",
      "The speech ends with a beautiful call to repentance. Can a genuine invitation to restoration be built on a false accusation?",
      "What is the pastoral cost of a theology that requires confession before it can offer comfort?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Inventing Sin: When Theology Requires You to Lie About Yourself", target_audience: "Anyone who has been pressured to confess to something they did not do in order to receive care", primary_theme: "The violence of requiring false confession as the price of restoration" },
      { angle: "Beautiful Lies: When the Invitation Is Real but the Premise Is False", target_audience: "Pastors and leaders navigating the tension between orthodoxy and pastoral honesty", primary_theme: "The tragedy of genuine compassion built on false theology" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 21-37, Newsom's 'Contest of Moral Imaginations,' and Habel's OTL commentary. Prophetic indictment form per Westermann's 'Basic Forms of Prophetic Speech.'"
  },

  {
    id: 'job-reply-to-eliphaz-third',
    title: "Job's Reply to Eliphaz: Searching for God in the Dark",
    bookId: 'JOB',
    chapterStart: 23,
    verseStart: 1,
    chapterEnd: 24,
    verseEnd: 25,
    summary: "Job's reply spans two chapters and two moods. Chapter 23 is an agonized search for God. 'Oh, that I knew where I might find him, that I might come even to his seat!' Job is confident that if he could present his case directly — without the friends' interference — God would listen. He would lay his case in order, fill his mouth with arguments. And God would not overpower him but would give heed. 'There an upright man could argue with him, and I would be acquitted forever by my judge.' But God is unfindable: 'I go forward, but he is not there; backward, but I cannot perceive him; on the left hand when he is working, I cannot behold him; he turns to the right hand, but I cannot see him.' The divine absence is complete — not philosophical but experiential. God is doing things (working, acting) but is invisible to Job. Yet Job maintains his integrity: 'He knows the way that I take; when he has tried me, I shall come out as gold.' Chapter 24 shifts to the social world: the wicked move boundary stones, steal flocks from orphans, push the needy off the road, and force the poor to hide in the desert like wild donkeys. The oppressed harvest fields that are not theirs, tread winepresses yet suffer thirst, and die groaning in the city while God charges no one with wrong.",
    significance: "Job 23-24 contains two of the book's most important theological contributions. First, the insistence that God can be simultaneously present (at work) and absent (unfindable) — a paradox that defines the experience of many believers. Second, the catalogue of social injustice in chapter 24 moves the argument beyond Job's personal suffering to systemic evil. Job is no longer arguing only for himself but for every oppressed person whose cries God appears to ignore. This expansion from personal to systemic theodicy is one of the book's most profound moves.",
    relationalNote: "Job's longing to find God is not the desire of an enemy but of a lover — someone who believes that if they could only get a hearing, the relationship could be restored. The frustration is that of a plaintiff who trusts the judge but cannot get a court date. This relational paradox — absolute trust in God's justice combined with absolute inability to reach God — is the emotional center of the book.",
    conceptualNote: "The 'coming out as gold' metaphor in 23:10 draws on the metallurgical process of refining precious metals, where fire separates pure gold from dross. Job applies this to himself: suffering is a refining process, and he will emerge pure. This is one of the few moments where Job comes close to the friends' theology of suffering-as-discipline, but with a crucial difference: he insists on his innocence throughout. The gold was gold before the fire; the fire reveals rather than creates purity.",
    climateNote: "The description of the oppressed poor in chapter 24 — hiding in the desert like wild donkeys, gathering fodder in wastelands, spending the night naked without covering, clinging to rocks for shelter — paints a vivid picture of the displaced populations living on the margins of ancient Near Eastern settlements, where the barren wilderness between towns offered hiding but not sustenance.",
    modernParallel: "Job's complaint that God is simultaneously at work and unavailable resonates with anyone who believes in providence but cannot detect it in their circumstances. The cancer patient who prays to a God they believe is sovereign but whose sovereignty feels like silence. Job 24's social catalogue — the boundary stone moved, the orphan's flock seized, the poor pushed to the margins — reads like a modern human rights report. The rhetorical question embedded in the chapter is devastating: if God sees all this and does nothing, what exactly is divine justice?",
    keyQuestions: JSON.stringify([
      "Job says God is at work but invisible. Have you experienced the paradox of believing in divine activity while being unable to detect it?",
      "How does Job 24's expansion from personal suffering to systemic injustice change the book's argument?",
      "'When he has tried me, I shall come out as gold.' Is this faith, denial, or defiance?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Forward, Backward, Left, Right: Searching for God in Every Direction and Finding Silence", target_audience: "Anyone in a season of divine absence who still believes God is active somewhere", primary_theme: "The paradox of divine presence and divine hiddenness" },
      { angle: "Boundary Stones and Orphan Flocks: When Theodicy Becomes Social Justice", target_audience: "Communities concerned with systemic injustice and divine accountability", primary_theme: "Job's expansion from personal suffering to structural evil" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 21-37, Habel's OTL commentary, and Balentine's Smyth & Helwys commentary. Divine hiddenness per Balentine's 'The Hidden God.'"
  },

  {
    id: 'job-bildad-third-speech',
    title: "Bildad's Third Speech: The Exhaustion of Dogma",
    bookId: 'JOB',
    chapterStart: 25,
    verseStart: 1,
    chapterEnd: 25,
    verseEnd: 6,
    summary: "Bildad's third speech is only six verses long — the shortest speech in the entire dialogue section. This brevity is itself a theological statement. The friends are running out of material. Bildad manages a few lines about God's cosmic dominion: 'Dominion and fear are with God; he makes peace in his high places. Is there any number to his armies? Upon whom does his light not arise?' Then he asks two rhetorical questions: 'How then can man be in the right before God? How can he who is born of woman be pure?' His answer: even the moon is not bright enough and the stars are not pure in God's sight — how much less a human being, who is a maggot, a worm. And then silence. Bildad has nothing more to say. The theological arsenal of the retribution tradition has been emptied. Three rounds of debate have produced no new insight, no pastoral breakthrough, no movement in Job's suffering. The friends have exhausted their system, and their system has exhausted them.",
    significance: "The shrinking of Bildad's speech from a full chapter in round one to six verses in round three is one of the most brilliantly subtle structural features of the book. The dialogue section is designed to show the progressive failure of conventional theology when confronted with innocent suffering. The friends do not run out of conviction; they run out of content. Bildad's final move — declaring all humanity worms before a cosmic God — is not comfort but surrender dressed as piety. When all you can say is 'humans are maggots,' you have stopped doing theology and started doing nihilism.",
    relationalNote: "Bildad's brevity is also a relational collapse. In the first cycle, the friends gave full speeches, engaged with Job's arguments, and attempted persuasion. By the third cycle, Bildad offers a cosmic generalization and falls silent. The relationship has moved from dialogue to lecture to silence — but not the compassionate silence of the opening seven days. This is the silence of someone who has nothing left to offer but will not admit it.",
    conceptualNote: "The worm/maggot language (rimmah/tole'ah) in verse 6 is deliberately dehumanizing. While other biblical texts use similar language to express humility before God (Psalm 22:6), Bildad applies it as a blanket statement about human worthlessness. The theological problem is that this makes God's interest in human beings inexplicable — if we are merely worms, why does the entire book of Job exist? The speech undercuts its own premise.",
    climateNote: "Bildad's cosmic imagery — the moon, the stars, God's armies in the high places — reflects the clarity of the night sky in the ancient Near East, where light pollution was nonexistent and the Milky Way was visible nightly. The astronomical references are not poetic abstraction but lived experience — the night sky was the most obvious display of overwhelming divine power available to the ancient observer.",
    modernParallel: "Bildad's six verses are the sound of a worldview collapsing in slow motion while its advocate refuses to acknowledge the collapse. The therapist who keeps recommending the same intervention after it has failed twelve times. The economic theory that keeps predicting recovery as the recession deepens. The sermon that keeps promising breakthrough as the congregation quietly empties. When the speech gets shorter, the confidence is not increasing — it is evaporating.",
    keyQuestions: JSON.stringify([
      "Why is Bildad's third speech so short? What does the brevity tell us about the state of the friends' theology?",
      "Is calling humanity 'worms' before God an expression of humility or a failure of theology?",
      "When a system runs out of new things to say, is that evidence of its completion or its exhaustion?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Six Verses and Silence: When the System Runs Out of Words", target_audience: "Leaders and thinkers confronting the limits of their own frameworks", primary_theme: "The difference between a complete system and an exhausted one" },
      { angle: "Worms Before God: The Line Between Humility and Nihilism", target_audience: "Anyone struggling with self-worth in the context of divine transcendence", primary_theme: "Human dignity as a theological necessity, not a psychological luxury" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 21-37, Newsom's 'Contest of Moral Imaginations,' and Habel's OTL commentary. Structural analysis of shrinking speeches per Andersen's TOTC Job."
  },

  {
    id: 'job-final-reply',
    title: "Job's Final Reply to the Friends: Cosmic Wisdom and Unshaken Integrity",
    bookId: 'JOB',
    chapterStart: 26,
    verseStart: 1,
    chapterEnd: 27,
    verseEnd: 23,
    summary: "Job's final response to the friends is a two-chapter tour de force that silences the debate. Chapter 26 opens with biting sarcasm: 'How you have helped the powerless! How you have saved the arm that has no strength! How you have counseled the unwise!' Then Job unveils his own cosmology — not the friends' tidy moral universe, but an awe-struck vision of God's power over chaos. The shades tremble beneath the waters; Sheol is naked before God; Abaddon has no covering. God stretches the north over the void and hangs the earth on nothing. He wraps the waters in clouds, yet the clouds do not burst. He has inscribed a circle on the face of the waters at the boundary of light and darkness. The pillars of heaven tremble at his rebuke. By his power he stilled the sea; by his understanding he shattered Rahab. By his wind the heavens were made fair; his hand pierced the fleeing serpent. 'These are but the outskirts of his ways, and how small a whisper do we hear of him! But the thunder of his power who can understand?' Chapter 27 is Job's oath of integrity: 'As God lives, who has taken away my right, and the Almighty, who has made my soul bitter, as long as my breath is in me and the spirit of God is in my nostrils, my lips will not speak falsehood, and my tongue will not utter deceit. Far be it from me to say that you are right; till I die I will not put away my integrity from me.'",
    significance: "These chapters function as Job's closing argument before the divine speech in chapters 38-41. The cosmological vision of chapter 26 anticipates God's own speech — both describe divine power over chaos, sea, and serpent. The difference is that Job acknowledges the mystery ('how small a whisper do we hear') while the friends claim to have mapped it completely. Job's integrity oath in chapter 27 is structurally critical: by swearing on God's own life while simultaneously accusing God of injustice, Job holds the paradox that the book refuses to dissolve. He trusts the God he is accusing.",
    relationalNote: "Job's opening sarcasm — how helpful you have been to the powerless — is the formal end of the friendship as a functional relationship. The friends will not speak again (except Elihu, a latecomer). Job has out-argued them, out-suffered them, and out-theologized them. But his final word is not about them — it is about his own integrity. The relationship with the friends is over; the relationship with God is about to enter its decisive phase.",
    conceptualNote: "Job's cosmology in chapter 26 draws on creation mythology shared across the ancient Near East — the stilling of the sea, the shattering of Rahab (the chaos monster), the piercing of the serpent. But Job deploys this mythology not to praise God conventionally but to demonstrate that God's power is so vast it dwarfs all human categories, including the moral categories the friends have been applying. The outskirts of God's ways — what we can perceive — are a whisper. The thunder is beyond comprehension.",
    climateNote: "The image of God hanging the earth on nothing and stretching the north over the void reflects a cosmology in which the earth was understood to be suspended over primordial waters, supported by divine power alone. The stilling of the sea and the scattering of storms evoke the Mediterranean weather systems that periodically devastated the Levantine coast — cosmic forces that no human technology could resist.",
    modernParallel: "Job's integrity oath speaks to anyone who refuses to falsify their experience for the sake of theological or social acceptability. The patient who will not say they are healed when they are not. The employee who will not sign a statement they know is false to keep their job. The believer who will not pretend to have answers they do not have. 'Till I die I will not put away my integrity' is the sentence of every honest person confronting a system that rewards performance over truth.",
    keyQuestions: JSON.stringify([
      "Job says we hear only a 'whisper' of God's ways. How does this reframe the friends' confident theological claims?",
      "What does it mean that Job swears by the God he is accusing? Is this coherent?",
      "Job refuses to surrender his integrity even to gain restoration. When is integrity worth more than relief?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Outskirts of His Ways: Why Theological Humility Is Not Theological Weakness", target_audience: "Anyone tempted to claim more certainty about God than the evidence warrants", primary_theme: "The vast gap between what we know of God and what there is to know" },
      { angle: "Till I Die: The Cost and Dignity of Refusing to Lie About Your Experience", target_audience: "People pressured to perform healing, happiness, or orthodoxy they do not feel", primary_theme: "Integrity as the foundation of genuine faith" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Clines's WBC Job 21-37, Habel's OTL commentary, and Pope's Anchor Bible Job. Chaos mythology per Day's 'God's Conflict with the Dragon and the Sea.'"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  PSALMS — Thematic/Collection Groupings (102 chapters)
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'psa-davidic-laments-3-7',
    title: "Davidic Laments: Surrounded but Not Abandoned (Psalms 3-7)",
    bookId: 'PSA',
    chapterStart: 3,
    verseStart: 1,
    chapterEnd: 7,
    verseEnd: 17,
    summary: "Psalms 3-7 form the first cluster of Davidic laments, each attributed to David and each structured around the same crisis: enemies surround the psalmist, God seems distant, and the only option is to cry out. Psalm 3 is set at David's flight from Absalom — 'How many are my foes!' — yet pivots to the stunning claim, 'I lay down and slept; I woke again, for the LORD sustained me.' Psalm 4 is an evening prayer of trust. Psalm 5 is a morning prayer requesting guidance through a landscape of enemies. Psalm 6 is the first of the penitential psalms — 'O LORD, rebuke me not in your anger' — with the psalmist's bed drenched in tears. Psalm 7 calls on God as judge: 'If I have done this, if there is wrong in my hands... let the enemy pursue my soul.' Together, these psalms establish the Psalter's primary emotional vocabulary: distress, accusation, trust, and the stubborn refusal to let go of a God who appears absent.",
    significance: "These psalms introduce the pattern that will dominate Books I-II of the Psalter: individual lament as the foundational prayer form. Their placement after the wisdom introduction of Psalm 1 and the royal theology of Psalm 2 means the reader moves immediately from confident theology into the reality of lived suffering. The Psalter does not let the theoretical framework of its introduction stand unchallenged for even three psalms.",
    relationalNote: "The relationship between the psalmist and God in these laments is characterized by raw directness: accusation, petition, and trust coexist in the same breath. The psalmist does not approach God with decorum but with desperation. The intimacy is paradoxical — you do not scream at someone you do not trust.",
    conceptualNote: "The superscriptions connecting these psalms to specific events in David's life (Psalm 3 to the Absalom rebellion, Psalm 7 to conflict with a Benjaminite) represent an early hermeneutical tradition that read the psalms as windows into David's biography. Whether historically accurate or not, the superscriptions accomplish something theologically important: they locate prayer in specific, messy, human situations rather than abstract devotional space.",
    climateNote: "The imagery of lying down and sleeping in Psalm 3 gains urgency when one remembers that David is supposedly a fugitive fleeing through the Judean wilderness, where nights were cold, terrain was rough, and the threat of pursuit was constant. Sleep under those conditions is not rest but surrender — an act of trust in divine protection that contradicts every survival instinct.",
    modernParallel: "These psalms are the prayers of anyone who goes to bed afraid and wakes up surprised to have survived the night. The cancer patient after the first round of chemotherapy. The single parent checking the bank account. The refugee in a camp. The structure of these psalms — cry, trust, wake — maps the daily rhythm of every person living in sustained crisis.",
    keyQuestions: JSON.stringify([
      "The psalmist claims to sleep peacefully while fleeing enemies. Is this genuine trust or performative faith?",
      "These psalms move from accusation to trust within a few verses. Is this emotional whiplash, or does it reflect the real shape of prayer under pressure?",
      "What is the role of enemy language in the psalms? Who are the 'enemies' in your prayer life?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Sleeping While Surrounded: Trust as an Act of Defiance", target_audience: "People living with chronic anxiety or sustained crisis", primary_theme: "Rest as resistance when circumstances demand panic" },
      { angle: "The First Prayers: How the Psalter Teaches Us to Pray by Starting with Pain", target_audience: "New believers or anyone beginning a practice of prayer", primary_theme: "Lament as the foundation of authentic prayer" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' McCann's 'A Theological Introduction to the Book of Psalms,' and deClaisse-Walford's 'Introduction to the Psalms.'"
  },

  {
    id: 'psa-psalms-of-trust-9-12',
    title: "Justice and the Oppressed: Psalms 9-12",
    bookId: 'PSA',
    chapterStart: 9,
    verseStart: 1,
    chapterEnd: 12,
    verseEnd: 8,
    summary: "Psalms 9-10 form an acrostic pair (likely originally one psalm) that alternates between praise for God's justice and lament over the oppressor's seeming impunity. 'The LORD is a stronghold for the oppressed' — but in the very next breath, 'Why, O LORD, do you stand far off? Why do you hide yourself in times of trouble?' The wicked man boasts, 'God has forgotten, he has hidden his face, he will never see it.' Psalm 11 asks the foundational question for anyone facing institutional corruption: 'If the foundations are destroyed, what can the righteous do?' The answer: 'The LORD is in his holy temple; the LORD's throne is in heaven; his eyes see, his eyelids test the children of man.' Psalm 12 cries out against a world where everyone lies: 'Help, LORD, for the godly one is gone; for the faithful have vanished from among the children of man.' Flattering lips, double hearts, the tongue that makes great boasts — and then the divine promise: 'Because the poor are plundered, because the needy groan, I will now arise, says the LORD.' These four psalms wrestle with the most persistent pastoral question: when the system is rigged and the powerful exploit the weak, is God paying attention?",
    significance: "This cluster introduces the Psalter's sustained engagement with social justice — not as political commentary but as theological crisis. The question is not merely 'is the system fair?' but 'does God see the unfairness?' The alternation between trust and lament in these psalms reflects the lived experience of oppressed communities throughout history: moments of confidence that God will act, followed by the crushing awareness that God has not acted yet.",
    relationalNote: "The relationship between the psalmist and the wicked is defined by asymmetric power: the wicked lurk, ambush, seize, drag, and crush, while the psalmist can only cry out. The cry is directed upward — to the only power that outranks the oppressor. The psalms' insistence that God 'sees' and 'tests' the children of man is a relational claim: the God who created relationship will not ultimately tolerate its distortion by predatory power.",
    conceptualNote: "Psalm 11's question — 'If the foundations are destroyed, what can the righteous do?' — raises the problem of institutional failure. 'Foundations' here likely refers to the social and legal structures that are supposed to guarantee justice. When those structures are corrupted, the psalm offers not a political strategy but a theological conviction: God's throne outlasts every human institution.",
    climateNote: "The imagery of the wicked lurking 'in ambush in the villages' and 'in hiding places' to seize the poor reflects the physical vulnerability of isolated rural settlements in the Judean highlands, where small communities had limited protection against bandits and exploitative officials. The 'net' and 'snare' imagery draws on hunting practices in the rocky terrain.",
    modernParallel: "These psalms speak directly to communities living under corrupt systems — where the courts are bought, the police are complicit, and the powerful rewrite the rules in their favor. 'If the foundations are destroyed, what can the righteous do?' is the question of every whistleblower, every activist facing a rigged system, every citizen watching democratic norms erode. The psalms do not promise quick resolution. They promise that God sees.",
    keyQuestions: JSON.stringify([
      "'If the foundations are destroyed, what can the righteous do?' — how do you answer this in your own context?",
      "The psalms alternate between confidence and despair. Is this lack of consistency a weakness or an honest portrait of faith under pressure?",
      "God says 'I will now arise' in Psalm 12. What do you do with the gap between the promise and its fulfillment?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When the Foundations Crack: Faith in an Era of Institutional Failure", target_audience: "Communities experiencing systemic injustice or institutional corruption", primary_theme: "Divine sovereignty as the foundation that outlasts human structures" },
      { angle: "'I Will Now Arise': God's Promise to the Plundered Poor", target_audience: "Economically marginalized communities", primary_theme: "God's preferential attention to the oppressed" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' McCann's 'A Theological Introduction to the Book of Psalms,' and Mays's Interpretation Psalms commentary."
  },

  {
    id: 'psa-korah-collection-44-49',
    title: "The Sons of Korah Collection: National Crisis and Temple Worship (Psalms 44-49)",
    bookId: 'PSA',
    chapterStart: 44,
    verseStart: 1,
    chapterEnd: 49,
    verseEnd: 20,
    summary: "The Korah psalms open Book II of the Psalter with a cluster that moves between national lament, royal celebration, and wisdom reflection. Psalm 44 is a communal lament of devastating honesty: 'You have rejected us and disgraced us... You have made us like sheep for slaughter, and have scattered us among the nations... All this has come upon us, though we have not forgotten you, and we have not been false to your covenant.' This is not a prayer of penitence — the community insists it has not sinned, yet God has abandoned them. Psalm 45 pivots to a royal wedding psalm — 'You are the most handsome of the sons of men' — celebrating the king's bride with exotic imagery of ivory palaces and gold of Ophir. Psalms 46-48 are Zion songs — 'God is our refuge and strength... the city of God, the holy habitation of the Most High' — celebrating Jerusalem's inviolability. Psalm 49 is a wisdom meditation on the futility of wealth: 'Man in his pomp will not remain; he is like the beasts that perish.'",
    significance: "This collection illustrates the Psalter's refusal to separate worship from reality. Psalm 44's insistence on innocent suffering at the national level does for the community what Job does for the individual: it breaks the retribution principle. The community did not sin. God abandoned them anyway. The placement of this lament alongside Zion songs celebrating God's protection of Jerusalem creates a deliberate theological tension that the editors did not try to resolve.",
    relationalNote: "Psalm 44's 'we have not forgotten you... we have not been false to your covenant' is the cry of a faithful spouse abandoned without cause. The covenant relationship is intact from the community's side, making God's apparent withdrawal inexplicable. The psalm does not resolve this — it simply states it and demands that God wake up: 'Awake! Why are you sleeping, O Lord?'",
    conceptualNote: "The Korah superscriptions connect these psalms to a guild of temple musicians descended from Korah, the Levite who rebelled against Moses in Numbers 16. The irony is deliberate: the descendants of a rebel produce some of the Psalter's most theologically daring prayers. Rebellion against simplistic theology is, the Psalter suggests, a legitimate Levitical function.",
    climateNote: "The Zion songs (46-48) draw their confidence from Jerusalem's physical position — set among hills, supplied by the Gihon spring, and protected by walls. The 'river whose streams make glad the city of God' (46:4) refers to the water system that made Jerusalem defensible in siege conditions, a crucial advantage in the semi-arid highlands where most cities depended on external water sources.",
    modernParallel: "Psalm 44 speaks for any community that has done everything right and still been devastated: the church that served faithfully and was still destroyed by a natural disaster, the nation that maintained its treaties and was still invaded, the family that kept every rule and was still shattered by illness. The psalm's power is its refusal to manufacture guilt where none exists.",
    keyQuestions: JSON.stringify([
      "Psalm 44 insists the community has not sinned yet God has abandoned them. How does this challenge personal and communal theology?",
      "How do the Zion songs' celebration of Jerusalem's security sit alongside Psalm 44's experience of national defeat?",
      "Psalm 49 says wealth cannot save anyone. In a collection about national crisis, why does wisdom about money appear?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Awake! Why Are You Sleeping? When Faithful Communities Suffer Without Explanation", target_audience: "Churches and communities experiencing inexplicable crisis", primary_theme: "Corporate lament as a legitimate form of worship" },
      { angle: "Ivory Palaces and Sheep for Slaughter: The Psalter's Refusal to Choose Between Glory and Grief", target_audience: "Congregations struggling with the tension between celebration and suffering", primary_theme: "Holding worship and lament together without resolving the tension" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from deClaisse-Walford's 'Introduction to the Psalms,' Brueggemann's 'The Message of the Psalms,' and Goulder's 'The Psalms of the Sons of Korah.'"
  },

  {
    id: 'psa-davidic-collection-50-72',
    title: "The Davidic Heart: Repentance, Kingship, and Trust (Psalms 50, 52-72)",
    bookId: 'PSA',
    chapterStart: 50,
    verseStart: 1,
    chapterEnd: 72,
    verseEnd: 20,
    summary: "This large Davidic collection — bracketed by Asaph's call to genuine worship in Psalm 50 and Solomon's prayer for a just king in Psalm 72 — contains some of the Psalter's most emotionally intense prayers. Psalm 52 attacks the 'mighty man' who boasts in evil. Psalms 53-55 are laments of betrayal and fear: 'It is not an enemy who taunts me... but it is you, my equal, my companion, my familiar friend' (55:12-13). Psalms 56-60 are prayers of a fugitive — attributed to David hiding from Saul or in enemy territory — where trust is forged under threat. Psalms 61-64 are prayers of longing for God's presence and protection. Psalms 65-68 erupt into praise: for harvest, for deliverance, for God's march through the wilderness. Psalm 69 is a lament so intense the New Testament applies it to Christ: 'Zeal for your house has consumed me.' Psalm 72 closes Book II with a prayer for the king that becomes a vision of cosmic justice: 'May he judge your people with righteousness, and your poor with justice... May he defend the cause of the poor, deliver the children of the needy, and crush the oppressor.'",
    significance: "This collection demonstrates that Davidic authorship encompasses the full emotional range — from betrayal to praise, from fugitive terror to royal vision. The Psalter's portrait of David is not a sanitized icon but a fully human voice that prays through every circumstance. Psalm 72's closing vision of a just king who champions the poor establishes the messianic hope that structures the rest of the Psalter: every lament is read against the promise that God's anointed will eventually set things right.",
    relationalNote: "The betrayal psalms (especially 55) introduce one of the Psalter's most painful themes: the friend who becomes an enemy. 'His speech was smooth as butter, yet war was in his heart; his words were softer than oil, yet they were drawn swords.' This is not warfare between strangers but the collapse of intimacy. The psalms give voice to the unique devastation of trust violated by someone who was close.",
    conceptualNote: "Psalm 72's vision of the ideal king connects kingship directly to justice for the poor. The king's legitimacy is measured not by military conquest but by the welfare of the most vulnerable. This is a radical political theology: power exists to serve the powerless. The closing doxology — 'Blessed be the LORD, the God of Israel, who alone does wondrous things' — and the notation 'The prayers of David, the son of Jesse, are ended' mark Psalm 72 as a deliberate structural conclusion to the first major division of the Psalter.",
    climateNote: "Psalm 65's harvest thanksgiving — 'You crown the year with your bounty; your wagon tracks overflow with abundance. The pastures of the wilderness overflow, the hills gird themselves with joy, the meadows clothe themselves with flocks, the valleys deck themselves with grain' — paints the Judean landscape at its most abundant, during the late spring harvest when winter rains have done their work and the countryside is briefly green and productive before the summer drought begins.",
    modernParallel: "The betrayal psalms map directly onto modern experiences of broken trust: the business partner who embezzles, the spouse who deceives, the friend who shares your secrets. The psalms do not recommend forgiveness as a first response — they recommend honest complaint to God. Psalm 72's vision of a king who champions the poor is a political theology that challenges every government, left or right: power that does not serve the vulnerable is power that has lost its legitimacy.",
    keyQuestions: JSON.stringify([
      "The betrayal psalms give voice to a specific kind of pain — the friend who becomes an enemy. Why does this hurt differently from opposition by a stranger?",
      "Psalm 72 measures royal legitimacy by care for the poor. How does this standard apply to contemporary leadership?",
      "This collection moves between intense lament and exuberant praise. What does that range suggest about the life of faith?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Smooth-Tongued Friend: Praying Through Betrayal", target_audience: "Anyone recovering from a betrayal of trust by someone close", primary_theme: "Lament as the pathway through relational devastation" },
      { angle: "Psalm 72's Political Vision: The King Who Champions the Poor", target_audience: "Communities reflecting on the relationship between power and justice", primary_theme: "Leadership measured by care for the most vulnerable" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' McCann's 'A Theological Introduction to the Book of Psalms,' and Wilson's 'The Editing of the Hebrew Psalter.'"
  },

  {
    id: 'psa-asaph-collection-74-83',
    title: "The Asaph Psalms: When God Abandons the Temple (Psalms 74-83)",
    bookId: 'PSA',
    chapterStart: 74,
    verseStart: 1,
    chapterEnd: 83,
    verseEnd: 18,
    summary: "The Asaph collection in Book III confronts the worst theological crisis in Israel's history: the destruction of the temple and the apparent failure of the covenant. Psalm 74 describes the devastation in visceral detail: 'Your foes have roared in the midst of your meeting place; they set up their own signs for signs. They hacked all the carved wood with axes and hatchets. They set your sanctuary on fire; they profaned the dwelling place of your name, bringing it down to the ground.' Psalm 77 asks whether God's steadfast love has ceased forever. Psalm 78 retells Israel's entire history as a cycle of rebellion and grace — the longest historical psalm in the Psalter. Psalm 79 is a communal lament over Jerusalem's destruction: 'O God, the nations have come into your inheritance; they have defiled your holy temple.' Psalm 80 uses the vine metaphor for Israel — planted by God, now ravaged, its wall broken down so that every passerby can pluck its fruit. Psalm 82 envisions God taking his stand in the divine council to judge the 'gods' who have failed to protect the poor. Psalm 83 calls for God to act against a coalition of enemies.",
    significance: "The Asaph psalms represent the Psalter's engagement with the Babylonian exile — the event that shattered every theological assumption about God's protection of Jerusalem. If Zion was inviolable (Psalms 46-48), why is it in ruins? If God chose Israel, why are the nations triumphant? These psalms do not answer the question — they hold it open as a wound that only God can close.",
    relationalNote: "The dominant relational mode is accusation: 'Why do you cast us off forever? Why does your anger smoke against the sheep of your pasture?' (74:1). The community addresses God as a spurned lover addresses the one who left. The psalms assume the relationship still exists — otherwise there would be no one to accuse — but they insist that God has violated its terms.",
    conceptualNote: "Psalm 82's scene of God judging the divine council ('gods') reflects the ancient Near Eastern understanding of a heavenly court where subordinate deities were responsible for justice among the nations. The psalm declares that these gods have failed — 'How long will you judge unjustly and show partiality to the wicked?' — and sentences them to death: 'You shall die like men.' This is a radical theological move: the gods of the nations are not merely inferior but morally accountable and condemned.",
    climateNote: "The destruction imagery in Psalms 74 and 79 — axes, fire, rubble, blood poured out like water — reflects the brutal warfare of the Neo-Babylonian period, when siege and destruction were systematic. The 'vine' metaphor of Psalm 80 draws on the terraced vineyards of the Judean highlands, where generations of labor could be destroyed in a single military campaign.",
    modernParallel: "The Asaph psalms speak to any community whose sacred space has been destroyed — whether a church burned, a neighborhood demolished, or a cultural heritage erased by conflict. They also address the deeper theological crisis: when the institution you believed God was protecting ceases to exist, what happens to your theology of protection? These psalms refuse to resolve the crisis prematurely — they sit in the rubble and demand that God explain.",
    keyQuestions: JSON.stringify([
      "The Asaph psalms confront the destruction of the temple — the place where God was supposed to dwell. When has a sacred space or institution you trusted in been destroyed?",
      "Psalm 82 puts the 'gods' on trial for failing to protect the poor. What would it look like to hold spiritual authorities accountable by this standard?",
      "These psalms retell Israel's history as rebellion and grace. How does remembering the past shape present prayer?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When the Temple Falls: Faith After the Destruction of Sacred Spaces", target_audience: "Communities that have lost their church building, neighborhood, or cultural heritage", primary_theme: "Theological survival when the institution God was supposed to protect is gone" },
      { angle: "God Stands in the Council: Holding Spiritual Powers Accountable", target_audience: "Communities questioning the faithfulness of their leaders or institutions", primary_theme: "Divine accountability applied to every exercise of authority" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' Nasuti's 'Tradition History and the Psalms of Asaph,' and Tate's WBC Psalms 51-100."
  },

  {
    id: 'psa-korah-zion-songs-84-87',
    title: "The Korah Zion Songs: Longing for God's House (Psalms 84-87)",
    bookId: 'PSA',
    chapterStart: 84,
    verseStart: 1,
    chapterEnd: 87,
    verseEnd: 7,
    summary: "After the crisis of the Asaph psalms, the second Korah collection offers songs of longing and hope centered on Zion. Psalm 84 is one of the most beautiful expressions of desire for God's presence in all of Scripture: 'How lovely is your dwelling place, O LORD of hosts! My soul longs, yes, faints for the courts of the LORD; my heart and flesh sing for joy to the living God. Even the sparrow finds a home, and the swallow a nest for herself, where she may lay her young, at your altars, O LORD of hosts.' The pilgrim values a single day in God's courts above a thousand elsewhere. Psalm 85 prays for national restoration: 'Will you not revive us again, that your people may rejoice in you?' Its vision of restored relationship is famously poetic: 'Steadfast love and faithfulness meet; righteousness and peace kiss each other.' Psalm 86 is a personal prayer of David placed within this Korah collection, calling on God's mercy. Psalm 87 is a brief, bold Zion psalm that declares all nations will one day claim Zion as their birthplace: 'This one and that one were born in her' — Rahab (Egypt), Babylon, Philistia, Tyre, and Cush. The most exclusive city in the world becomes universal.",
    significance: "This cluster represents the Psalter's theology of sacred longing — the conviction that the human soul is oriented toward God's presence as instinctively as a bird seeks a nest. Psalm 87's universalism is theologically explosive: the nations that destroyed Jerusalem will one day be counted as her citizens. This is not military triumphalism but radical inclusion — the gates of Zion opened to every people.",
    relationalNote: "Psalm 84's longing is somatic — 'my heart and flesh sing for joy.' The relationship with God is not cerebral but embodied. The pilgrim does not merely think about God; their body aches for God's presence. The sparrow nesting at the altar is an image of creatures finding home in the divine presence — small, vulnerable beings at rest in a place of power.",
    conceptualNote: "Psalm 87's list of nations 'born' in Zion draws on the concept of divine citizenship — the idea that spiritual identity transcends ethnic and national boundaries. This was a radical claim in a world defined by tribal and national identity. The psalm anticipates the New Testament's vision of a people drawn from every nation, though it remains rooted in Zion theology.",
    climateNote: "The 'Valley of Baca' in Psalm 84:6 (likely meaning 'valley of weeping' or 'valley of balsam trees') refers to one of the arid wadis that pilgrims traversed on their way to Jerusalem. The autumn rains that transformed these dry valleys into pools of water made the pilgrimage possible — without the rains, the journey was too dangerous to attempt.",
    modernParallel: "Psalm 84's longing speaks to anyone who has been separated from a community or place that feels like home — the refugee remembering their village, the expatriate aching for their homeland, the former churchgoer who misses a community they can no longer attend. The ache is not nostalgia; it is the soul's recognition that it was made for a specific form of belonging.",
    keyQuestions: JSON.stringify([
      "Have you experienced the kind of longing Psalm 84 describes — not intellectual desire but bodily aching for God's presence?",
      "Psalm 87 claims that even Israel's enemies will one day be counted as Zion's citizens. What does this radical inclusion mean for how we define belonging?",
      "What is your 'Valley of Baca' — the dry place you must traverse on the way to where you need to be?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Even the Sparrow Finds a Home: Sacred Longing in a Displaced World", target_audience: "Refugees, immigrants, and anyone separated from the place that feels like home", primary_theme: "The soul's instinct for divine belonging" },
      { angle: "Born in Zion: When the Enemy Becomes a Citizen", target_audience: "Communities wrestling with inclusion, immigration, and the boundaries of belonging", primary_theme: "God's vision of universal citizenship that transcends tribal boundaries" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' Tate's WBC Psalms 51-100, and Goulder's 'The Psalms of the Sons of Korah.' Valley of Baca per Cogan and Tadmor."
  },

  {
    id: 'psa-ethan-covenant-crisis-89',
    title: "Ethan's Covenant Crisis: The Broken Promise (Psalm 89)",
    bookId: 'PSA',
    chapterStart: 89,
    verseStart: 1,
    chapterEnd: 89,
    verseEnd: 52,
    summary: "Psalm 89 is the most theologically explosive psalm in the Psalter. Its first half is a glorious hymn to God's faithfulness and the Davidic covenant: 'I will sing of the steadfast love of the LORD, forever.' God swore an oath to David: 'I will establish your offspring forever, and build your throne for all generations.' The covenant is unconditional — even if David's children sin, God will discipline but not withdraw his steadfast love. 'My covenant I will not violate, nor alter the word that went forth from my lips. Once for all I have sworn by my holiness; I will not lie to David.' Then the psalm turns — and the turn is devastating. 'But now you have cast off and rejected; you are full of wrath against your anointed. You have renounced the covenant with your servant; you have defiled his crown in the dust.' The enemy has breached every wall, the young king is shamed, the throne is cast to the ground. The psalm closes with a question that has no answer: 'Lord, where is your steadfast love of old, which by your faithfulness you swore to David?' Then silence. No resolution. No comforting conclusion. Just the question hanging in the air. The editors placed this psalm at the end of Book III — the book shaped by the exile — as the final word before the doxology.",
    significance: "Psalm 89 confronts God with God's own words and finds a contradiction. God swore an unbreakable oath. The oath appears broken. This is not a failure of faith but a crisis of theology: the psalmist believed God's promise and the promise was not kept. The psalm's refusal to resolve the contradiction — its willingness to end on the question rather than the answer — makes it one of the most theologically honest texts in the Bible.",
    relationalNote: "The relationship between the psalmist and God is that of a plaintiff quoting a contract that has been violated. The hurt is not generic but specific and documented: 'You said this. You did that. Explain.' The intimacy of the complaint is proportional to the specificity of the promise. Vague disappointment can be managed; a broken oath cannot.",
    conceptualNote: "Psalm 89 sits at the intersection of royal theology (the Davidic covenant) and wisdom theology (the reliability of God's character). The psalm systematically establishes the covenant's terms and then systematically demonstrates that the terms have been violated. The logical conclusion — that God has lied — is approached but never quite stated. The psalmist stops just short, which makes the silence that follows more devastating than any explicit accusation.",
    climateNote: "The imagery of the defiled crown cast in the dust and breached walls evokes the physical reality of a besieged and conquered city in the ancient Near East. The 'dust' is not metaphorical — defeated kings were literally made to prostrate themselves in the dirt before their conquerors, often publicly humiliated before execution or exile.",
    modernParallel: "Psalm 89 is the prayer for anyone who believed a specific promise — from God, from an institution, from a person — and watched it broken. The church that was promised growth and experienced closure. The marriage that was promised permanence and ended in divorce. The career that was promised advancement and delivered termination. The psalm does not tell you how to feel better. It tells you that the Bible itself contains a prayer for the experience of broken promises — and that the prayer has no answer.",
    keyQuestions: JSON.stringify([
      "God made an unconditional promise to David. The promise appears broken. How do you hold a faith that depends on divine faithfulness when divine faithfulness seems to have failed?",
      "The psalm ends without resolution. Is this honest theology or incomplete theology?",
      "What specific promises — from God, from institutions, from people — have shaped your life? What happened when they were tested?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Where Is Your Steadfast Love? When God's Promises Appear Broken", target_audience: "Anyone living in the gap between divine promise and present reality", primary_theme: "Theological honesty in the face of apparent divine failure" },
      { angle: "The Psalm That Ends with a Question: Faith Without Resolution", target_audience: "Christians uncomfortable with unresolved theological tension", primary_theme: "The Bible's willingness to leave hard questions unanswered" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Tate's WBC Psalms 51-100, Clifford's 'Psalms 73-150,' and McCann's 'A Theological Introduction to the Book of Psalms.' Covenant theology per Cross and Levenson."
  },

  {
    id: 'psa-moses-and-trust-91-102',
    title: "Book IV — The LORD Reigns: Trust Beyond the Monarchy (Psalms 91-102)",
    bookId: 'PSA',
    chapterStart: 91,
    verseStart: 1,
    chapterEnd: 102,
    verseEnd: 28,
    summary: "Book IV answers the devastating question of Psalm 89 — 'Where is your steadfast love?' — not with the Davidic covenant but with something older: the LORD's eternal kingship. Psalm 91 promises divine protection in language of breathtaking intimacy: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty... He will cover you with his pinions, and under his wings you will find refuge.' Psalms 93 and 95-99 form the 'LORD reigns' collection — enthronement psalms declaring that God's kingship transcends any human dynasty: 'The LORD reigns! Let the earth rejoice!' Psalm 95 warns against hardening hearts as Israel did at Meribah and Massah. Psalm 96 calls on all the earth to sing a new song. Psalm 97 proclaims righteousness and justice as the foundation of God's throne. Psalm 100 is pure, distilled praise: 'Know that the LORD, he is God! It is he who made us, and we are his.' Psalm 102 returns to lament — 'Hear my prayer, O LORD; let my cry come to you!' — but now the lament is framed by the conviction that God's years have no end. The monarchy has fallen, but the divine King endures.",
    significance: "Book IV is the Psalter's theological response to the exile. After Book III's crisis — the covenant broken, the temple destroyed, the monarchy ended — Book IV reaches behind the monarchy to the wilderness period and God's eternal kingship. The editorial message is: before there was a David, there was a God. The LORD's reign does not depend on human political structures. This reframing is the Psalter's most important theological move, rescuing Israel's faith from the rubble of its institutions.",
    relationalNote: "Psalm 91's imagery of shelter, wings, and shadow describes a God who is experienced as physical proximity — not a distant sovereign but a protective parent. The shift from Psalm 89's abandoned covenant to Psalm 91's enfolding presence represents a relational reorientation: from trusting in what God promised to trusting in who God is.",
    conceptualNote: "The 'LORD reigns' psalms use enthronement language that may have been associated with an annual temple ceremony celebrating God's kingship. Their placement in Book IV — after the monarchy's collapse — transforms their original liturgical function into a theological assertion: God's enthronement is not a ritual re-enactment but an eternal reality that survives every institutional failure.",
    climateNote: "Psalm 91's imagery of pestilence, plague, and arrows that fly by day draws on the dangers of life in the ancient Near East — epidemic disease, military violence, and nocturnal predators. The 'terror of the night' could refer to both spiritual dangers and the very real threats of a world without artificial light, where darkness brought wild animals, bandits, and illness attributed to demonic forces.",
    modernParallel: "Book IV's message is simple and devastating: your institutions will fail. Your political systems will collapse. Your leaders will disappoint. And the God who existed before all of them will exist after all of them. This is the word for every Christian tradition that has identified its faith too closely with a political party, a denomination, a cultural form, or a charismatic leader. The LORD reigns. Everything else is provisional.",
    keyQuestions: JSON.stringify([
      "Book IV answers the crisis of Book III by reaching behind the monarchy to God's eternal kingship. What do you reach for when your institutions fail?",
      "Psalm 91 promises extraordinary protection. How do you read this psalm honestly when bad things happen to faithful people?",
      "The 'LORD reigns' psalms were originally liturgical. What happens when worship language is repurposed for theological crisis?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The LORD Reigns: Faith After Institutional Collapse", target_audience: "Communities processing the failure of trusted institutions — churches, governments, organizations", primary_theme: "God's sovereignty as the foundation that survives every structural failure" },
      { angle: "Under His Wings: The God Who Is Closer Than Your Institutions", target_audience: "People whose primary experience of God has been through structures that no longer exist", primary_theme: "Direct divine intimacy as the ground beneath organizational forms" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from McCann's 'A Theological Introduction to the Book of Psalms,' Wilson's 'The Editing of the Hebrew Psalter,' and Mays's 'The LORD Reigns: A Theological Handbook to the Psalms.'"
  },

  {
    id: 'psa-hallel-and-torah-104-118',
    title: "Creation, Exodus, and Hallel: The Great Story Retold (Psalms 104-118)",
    bookId: 'PSA',
    chapterStart: 104,
    verseStart: 1,
    chapterEnd: 118,
    verseEnd: 29,
    summary: "This block contains some of the Psalter's most expansive material. Psalm 104 is a creation hymn of staggering beauty — 'You set the earth on its foundations, so that it should never be moved' — celebrating God's provision for every creature: springs for wild donkeys, trees for storks, mountains for wild goats, the moon marking seasons, and Leviathan playing in the sea. Psalms 105-106 are paired historical psalms: 105 recounts God's faithfulness from Abraham through the exodus, while 106 recounts Israel's persistent rebellion. Psalms 107-110 celebrate deliverance and divine authority. Psalm 110 — 'Sit at my right hand until I make your enemies your footstool' — is the most quoted psalm in the New Testament. Psalms 111-112 are acrostic wisdom psalms paired as mirror images: one describes God's character, the other the character of the person who fears God. Psalms 113-118 constitute the Egyptian Hallel — the psalms sung at Passover and the great festivals. Psalm 113 praises the God who raises the poor from the dust. Psalm 114 celebrates the exodus with vivid personification: 'The sea looked and fled; Jordan turned back. The mountains skipped like rams.' Psalm 118 — 'The stone the builders rejected has become the cornerstone' — is the psalm Jesus quotes before his death and the early church claims as its own.",
    significance: "This collection is the Psalter's retelling of the grand narrative: creation, covenant, exodus, rebellion, deliverance, praise. It functions as a compressed Torah, moving from God's creative act to the Passover celebration within fifteen psalms. The placement of the Egyptian Hallel here connects the Psalter's praise to Israel's foundational saving act — every subsequent generation's praise is rooted in the original liberation.",
    relationalNote: "The pairing of Psalm 105 (God's faithfulness) and Psalm 106 (Israel's rebellion) creates a relational portrait of extraordinary honesty: God keeps promises; we break them. The relationship survives not because of mutual fidelity but because of unilateral grace. This double-sided memory — 'God was faithful' and 'we were not' — is the most honest form of corporate remembrance.",
    conceptualNote: "Psalm 104's creation theology parallels the Egyptian Hymn to Aten, suggesting cross-cultural exchange in wisdom traditions. The psalm differs from Genesis 1 in its emphasis on ongoing providence rather than initial creation: God is not merely the originator but the sustainer, providing food, water, and seasons in an unbroken cycle of care. Psalm 110's royal oracle — combining kingship and priesthood in the figure of Melchizedek — became one of the most theologically generative texts in both Judaism and Christianity.",
    climateNote: "Psalm 104's ecological catalogue — springs, mountains, cedars of Lebanon, storks, wild goats, the great sea with Leviathan — reads as a nature documentary of the ancient Near East. The description of seasons governed by the moon, animals emerging at night and retreating at dawn, and humans going out to work in daylight captures the circadian and seasonal rhythms of pre-industrial agrarian life in the Levant.",
    modernParallel: "The Egyptian Hallel (113-118) is still sung at Jewish Passover seders today, making these psalms among the most continuously performed liturgical texts in human history. Jesus sang these psalms the night before his death. The 'stone the builders rejected' (Psalm 118) has become a metaphor for every person, idea, or community that was dismissed as worthless and later proved indispensable. These psalms connect every contemporary act of worship to the original liberation — every praise carries the DNA of the exodus.",
    keyQuestions: JSON.stringify([
      "Psalm 104 celebrates God's ongoing provision for all creatures. How does this shape environmental theology?",
      "Psalms 105 and 106 remember the same history from opposite angles. Why does honest memory require both?",
      "'The stone the builders rejected' — who or what has been rejected in your context that may prove to be the cornerstone?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Leviathan at Play: Psalm 104 and the God Who Delights in Creation", target_audience: "Anyone interested in the intersection of faith and ecology", primary_theme: "Creation as ongoing divine provision, not merely origin event" },
      { angle: "The Stone the Builders Rejected: Finding God's Cornerstone in What Was Discarded", target_audience: "Marginalized communities and anyone who has been told they do not belong", primary_theme: "God's habit of building with what the powerful throw away" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' Allen's WBC Psalms 101-150, and Brown's 'Seeing the Psalms.' Aten hymn parallels per Dion and Sarna."
  },

  {
    id: 'psa-songs-of-ascent-120-134',
    title: "Songs of Ascent: The Pilgrim Staircase (Psalms 120-134)",
    bookId: 'PSA',
    chapterStart: 120,
    verseStart: 1,
    chapterEnd: 134,
    verseEnd: 3,
    summary: "The fifteen Songs of Ascent form the Psalter's most tightly organized sub-collection — short psalms sung by pilgrims ascending to Jerusalem for the three annual festivals. The journey begins far from home: Psalm 120 cries from exile among those who hate peace. Psalm 121 looks up at the mountains: 'I lift up my eyes to the hills. From where does my help come? My help comes from the LORD, who made heaven and earth.' Psalm 122 arrives: 'I was glad when they said to me, \"Let us go to the house of the LORD!\" Our feet are standing within your gates, O Jerusalem.' The collection moves through trust (Psalm 125 — 'Those who trust in the LORD are like Mount Zion, which cannot be moved'), communal blessing (Psalm 127 — 'Unless the LORD builds the house, those who build it labor in vain'), family joy (Psalm 128 — 'Your children will be like olive shoots around your table'), and deep spiritual longing (Psalm 130 — 'Out of the depths I cry to you, O LORD'). Psalm 131 is one of the simplest and most profound prayers in the Bible: 'I have calmed and quieted my soul, like a weaned child with its mother; like a weaned child is my soul within me.' Psalm 133 celebrates community: 'How good and pleasant it is when brothers dwell in unity!' Psalm 134 closes the collection at nightfall in the temple: 'Lift up your hands to the holy place and bless the LORD!'",
    significance: "The Songs of Ascent represent faith as journey — not a destination arrived at once but a path walked repeatedly, seasonally, communally. Their brevity (most are under ten verses) reflects the rhythmic pace of walking. Their structure — from exile to arrival to blessing — mirrors both the physical pilgrimage and the spiritual arc of the Psalter itself. Psalm 130's 'out of the depths' shows that even pilgrims ascending to joy carry their grief with them.",
    relationalNote: "These psalms are inherently communal — you do not make pilgrimage alone. The journey from Psalm 120's isolation to Psalm 133's 'brothers dwelling in unity' traces the relational arc of moving from loneliness into community. The psalms suggest that community is not a static state but something arrived at through shared effort, shared vulnerability, and shared walking.",
    conceptualNote: "The fifteen psalms may correspond to the fifteen steps between the Court of Women and the Court of Israel in the Second Temple, with Levites singing one psalm on each step. Whether or not this tradition is historical, it embeds the psalms in physical architecture — each song marks a step upward, literalizing the metaphor of spiritual ascent.",
    climateNote: "The pilgrimage routes to Jerusalem ran through the Judean wilderness and hill country — steep, rocky, and dangerous terrain that required days of walking from Galilee or Transjordan. The 'hills' of Psalm 121 are the Judean mountains surrounding Jerusalem; help comes not from the hills themselves but from the God worshipped on Mount Zion. The olive shoots of Psalm 128 reflect the agricultural reality where olive trees represented multi-generational investment — they take decades to mature and centuries to reach full production.",
    modernParallel: "The Songs of Ascent are the Psalter's travel playlist — songs for the road, designed to be memorized and repeated with each step. In a world of instant access, where you can stream any worship service from your couch, these psalms insist that the journey matters. You are supposed to walk there. The physical effort, the companionship of fellow travelers, the dust and sweat and aching feet — these are not obstacles to worship but part of it. Psalm 131's weaned child metaphor speaks to anyone who has learned that spiritual maturity is not getting everything you want but being content without it.",
    keyQuestions: JSON.stringify([
      "What is your pilgrimage — the regular, repeated journey you take toward the presence of God?",
      "'Unless the LORD builds the house, those who build it labor in vain.' How does this challenge our culture's worship of productivity?",
      "Psalm 131's weaned child is content without demanding. What would spiritual weaning look like in your life?",
      "These psalms are sung in community while walking. What is lost when worship becomes individual and stationary?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Pilgrim Staircase: Why the Journey to Worship Matters as Much as Arrival", target_audience: "Anyone whose spiritual life has become static or convenience-oriented", primary_theme: "Faith as repeated pilgrimage rather than permanent arrival" },
      { angle: "Out of the Depths: The Lament Psalm Hidden in the Pilgrimage Songs", target_audience: "People carrying grief into communal worship who feel pressure to leave it outside", primary_theme: "The legitimacy of ascending toward joy while carrying sorrow" },
      { angle: "Like a Weaned Child: The Contentment That Comes After Demand", target_audience: "Anyone exhausted by spiritual striving or the pressure to want more from God", primary_theme: "Maturity as the capacity to rest in God's presence without demands" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Brueggemann's 'The Message of the Psalms,' Allen's WBC Psalms 101-150, and Keet's 'A Study of the Psalms of Ascent.' Temple steps tradition per m. Middot 2:5."
  },

  {
    id: 'psa-songs-of-trust-135-136',
    title: "The Great Hallel: Steadfast Love That Endures Forever (Psalms 135-136)",
    bookId: 'PSA',
    chapterStart: 135,
    verseStart: 1,
    chapterEnd: 136,
    verseEnd: 26,
    summary: "Psalms 135-136 form a paired climax following the Songs of Ascent. Psalm 135 is a hymn of praise that draws on Israel's history and the polemic against idols: 'The idols of the nations are silver and gold, the work of human hands. They have mouths, but do not speak; they have eyes, but do not see.' Psalm 136 is the Great Hallel — a litany of twenty-six statements about God's acts in creation and history, each followed by the congregational response: 'for his steadfast love endures forever.' The repetition is not redundancy but liturgical architecture: creation (his steadfast love endures forever), the exodus (his steadfast love endures forever), the wilderness (his steadfast love endures forever), the conquest (his steadfast love endures forever), present deliverance (his steadfast love endures forever). The refrain becomes the interpretive key: every divine act, from the setting of the stars to the drowning of Pharaoh, is an expression of the same underlying reality — hesed, steadfast love, covenant faithfulness.",
    significance: "Psalm 136's twenty-six-fold repetition of 'his steadfast love endures forever' is the Psalter's most emphatic theological claim. The repetition insists that hesed is not one of God's attributes among many but the interpretive lens through which every divine act should be read. Creation is hesed. Liberation is hesed. Provision is hesed. Even the violent acts of the exodus narrative are framed as expressions of covenant love directed toward a specific people.",
    relationalNote: "The responsive structure — statement and refrain — requires community. A solo reader cannot achieve the psalm's effect. The liturgical design creates a conversation between cantor and congregation where the cantor names what God has done and the community affirms why: steadfast love. This shared interpretation of history is a relational act — the community is not merely reciting facts but collectively declaring their meaning.",
    conceptualNote: "Hesed is one of the Hebrew Bible's most untranslatable words — variously rendered as steadfast love, loving-kindness, mercy, loyalty, or covenant faithfulness. It combines the reliability of a legal commitment with the warmth of personal affection. Psalm 136 effectively defines hesed by example: everything God does is hesed. The word is not explained; it is enacted across twenty-six verses.",
    climateNote: "The psalm's movement from cosmic creation (sun, moon, stars) to specific geography (the Red Sea, the wilderness, the Jordan, the kingdoms of Sihon and Og) traces a journey from the universal to the particular. The landscapes named were familiar to the pilgrims singing these psalms — the route from Egypt through the desert to Canaan was Israel's foundational journey, and the terrain was real enough that later pilgrims could walk it.",
    modernParallel: "The refrain 'his steadfast love endures forever' has the quality of a mantra — a sentence repeated until it penetrates below the intellectual to the instinctive. For a community that has just walked through the Songs of Ascent and arrived at the temple, this psalm provides the interpretive framework for the entire pilgrimage: every step was steadfast love. Every difficulty was steadfast love. The repetition does not make the claim more certain; it makes the singer more formed by the claim.",
    keyQuestions: JSON.stringify([
      "Why does the psalm repeat the same phrase twenty-six times? What does repetition accomplish that a single statement cannot?",
      "Every divine act — including violent ones — is attributed to hesed. How do you hold together steadfast love and the destruction of Pharaoh's army?",
      "If you were to write your own Psalm 136, what events in your life would you follow with 'his steadfast love endures forever'?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Twenty-Six Times: Why Repetition Is the Deepest Form of Theology", target_audience: "Anyone skeptical of liturgical repetition or seeking deeper spiritual formation", primary_theme: "Repetition as the technology by which truth moves from head to heart" },
      { angle: "Write Your Own Psalm 136: Interpreting Your Story Through Steadfast Love", target_audience: "Small groups, retreats, or anyone seeking to reframe their personal history", primary_theme: "The discipline of reading every chapter of your life as an expression of divine faithfulness" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Allen's WBC Psalms 101-150, Brueggemann's 'The Message of the Psalms,' and Sakenfeld's 'The Meaning of Hesed in the Hebrew Bible.'"
  },

  {
    id: 'psa-psalm-138',
    title: "Psalm 138: Thanksgiving Before the Gods",
    bookId: 'PSA',
    chapterStart: 138,
    verseStart: 1,
    chapterEnd: 138,
    verseEnd: 8,
    summary: "Psalm 138 is a Davidic thanksgiving psalm of concentrated power. 'I give you thanks, O LORD, with my whole heart; before the gods I sing your praise.' The opening is defiant: the psalmist worships Yahweh in the presence of other divine beings — or perhaps before the powerful of the earth — with unashamed gratitude. God answered when the psalmist called, increasing the strength of the soul. Then a remarkable claim: 'All the kings of the earth shall give you thanks, O LORD, for they have heard the words of your mouth.' The psalm pivots to a paradox that defines God's character: 'Though the LORD is high, he regards the lowly, but the haughty he knows from afar.' The closing is an act of trust: 'Though I walk in the midst of trouble, you preserve my life... The LORD will fulfill his purpose for me; your steadfast love, O LORD, endures forever. Do not forsake the work of your hands.'",
    significance: "Psalm 138's placement between the exile-colored psalms and the deeply personal Psalm 139 serves as a bridge — a moment of gratitude that acknowledges both divine transcendence and intimate care. The 'before the gods' phrase is theologically bold, acknowledging a cosmic landscape of powers while asserting Yahweh's supremacy through the act of praise rather than argument.",
    relationalNote: "The closing petition — 'do not forsake the work of your hands' — appeals to God's investment: you made me, so do not abandon what you started. The relationship is grounded in creation, not performance. The psalmist's confidence is not that they deserve continued care but that God does not abandon projects.",
    conceptualNote: "'Before the gods' (neged elohim) has been variously interpreted as before angelic beings, before the divine council, before pagan deities, or before earthly rulers. The ambiguity may be intentional: the psalm asserts Yahweh's supremacy against every possible rival, whatever category they inhabit.",
    climateNote: "The psalm's universal horizon — all kings of the earth giving thanks — reflects the expansive worldview of the post-exilic community, which had encountered the empires of Babylon and Persia and recognized that Yahweh's sovereignty must extend beyond Israel's borders or it is not sovereignty at all.",
    modernParallel: "The confidence that God 'regards the lowly but knows the haughty from afar' inverts every social hierarchy. The powerful think their proximity to power brings them closer to God; the psalm says it creates distance. The lowly, who have nothing to commend them, receive divine attention precisely because they have nothing. This is the theological ground of every liberation movement: God's attention flows downward.",
    keyQuestions: JSON.stringify([
      "What does it mean to worship 'before the gods' — in the presence of rival powers, competing loyalties, or skeptical observers?",
      "God 'regards the lowly but knows the haughty from afar.' How does this invert conventional assumptions about who is close to God?",
      "'Do not forsake the work of your hands.' Is it legitimate to appeal to God's investment in you as a reason for continued care?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Do Not Forsake the Work of Your Hands: You Are God's Unfinished Project", target_audience: "Anyone who feels abandoned mid-process — spiritually, vocationally, or relationally", primary_theme: "God's faithfulness to complete what was started" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Allen's WBC Psalms 101-150, Brueggemann's 'The Message of the Psalms,' and Mays's Interpretation Psalms commentary."
  },

  {
    id: 'psa-final-davidic-140-144',
    title: "The Final Davidic Prayers: Deliverance and Doxology (Psalms 140-144)",
    bookId: 'PSA',
    chapterStart: 140,
    verseStart: 1,
    chapterEnd: 144,
    verseEnd: 15,
    summary: "The final cluster of Davidic psalms before the Hallel finale returns to the themes that have defined Davidic prayer throughout the Psalter: enemies, deliverance, and trust. Psalm 140 pleads for rescue from the violent: 'They make their tongue sharp as a serpent's, and under their lips is the venom of asps.' Psalm 141 asks God to set a guard over the psalmist's own mouth — a prayer for self-discipline as well as deliverance. Psalm 142 is attributed to David in the cave, praying when 'no one cares for my soul' — a psalm of total isolation that finds its resolution in God alone. Psalm 143 is the last of the seven penitential psalms: 'Do not enter into judgment with your servant, for no one living is righteous before you... Teach me to do your will, for you are my God. Let your good Spirit lead me on level ground.' Psalm 144 turns to royal victory and closes with a vision of prosperity: sons like sturdy plants, daughters like corner pillars, barns full, flocks multiplying, no breach in the walls, no cry of distress. 'Blessed are the people whose God is the LORD!'",
    significance: "This final Davidic collection functions as David's last will and testament in the Psalter. The movement from desperate prayer (140-142) through penitence (143) to royal blessing (144) recapitulates the entire Davidic experience: persecuted, humbled, and ultimately blessed. The placement immediately before the Hallel finale (145-150) means that the Psalter's journey through lament arrives at the threshold of praise through David's voice — the shepherd-king who knew both the cave and the throne.",
    relationalNote: "Psalm 142's 'no one cares for my soul' is one of the Psalter's most devastating statements of isolation. The cave setting — literally underground, cut off from light and community — makes the loneliness spatial as well as relational. Yet the psalm's resolution is not the arrival of human companionship but the adequacy of divine attention: 'You are my refuge, my portion in the land of the living.'",
    conceptualNote: "Psalm 143's 'no one living is righteous before you' anticipates the Pauline doctrine of universal sinfulness, though in context it functions less as a doctrinal statement and more as a legal strategy: the psalmist asks God not to judge by strict justice because no one could survive that standard. The prayer is for mercy, not acquittal — for a relationship governed by grace rather than merit.",
    climateNote: "The cave of Psalm 142's superscription may refer to the caves of the Judean wilderness near En Gedi — natural limestone formations that offered refuge from pursuit but were dark, cramped, and isolating. The vision of prosperity in Psalm 144 — full barns, abundant flocks, strong walls — paints the ideal of settled agricultural life in the Judean highlands during a period of peace and adequate rainfall.",
    modernParallel: "These psalms trace a journey familiar to anyone in recovery: from crisis (140) through self-examination (141) through isolation (142) through confession (143) to the vision of a restored life (144). The order matters. You do not arrive at the blessed life without passing through the cave. Psalm 142's radical loneliness speaks to the epidemic of isolation in modern culture — the person who has hundreds of social media connections and no one who cares for their soul.",
    keyQuestions: JSON.stringify([
      "Psalm 142 is the prayer of total isolation: 'No one cares for my soul.' When has this been your experience, and what brought you through?",
      "Psalm 143 asks God not to judge strictly, because no one is righteous. Is this humility or evasion?",
      "How does the movement from cave (142) to crowned prosperity (144) reflect the shape of the life of faith?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Cave Psalm: When No One Cares for Your Soul", target_audience: "People experiencing profound isolation, depression, or social disconnection", primary_theme: "God as the companion in radical aloneness" },
      { angle: "From Cave to Crown: The Full Arc of David's Prayer Life", target_audience: "Anyone in a season of transition from suffering toward restoration", primary_theme: "The path through isolation, confession, and surrender to blessing" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Allen's WBC Psalms 101-150, Brueggemann's 'The Message of the Psalms,' and McCann's 'A Theological Introduction to the Book of Psalms.'"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  ECCLESIASTES — 1 missing chapter
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'ecc-qohelets-experiment',
    title: "Qohelet's Experiment: Testing Pleasure, Wisdom, and Toil",
    bookId: 'ECC',
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 2,
    verseEnd: 26,
    summary: "Ecclesiastes 2 is the most sustained first-person experiment in the Hebrew Bible. Qohelet — the Teacher, traditionally identified with Solomon — sets out to test whether meaning can be found in pleasure, achievement, or wisdom. 'I said in my heart, Come now, I will test you with pleasure; enjoy yourself.' He tries laughter: it is mad. He tries wine: guided by wisdom, he drinks to see what is good. He builds houses, plants vineyards, makes gardens and parks, constructs pools to water forests of growing trees. He acquires servants, flocks, silver, gold, singers, and the 'delights of the sons of man — many concubines.' He becomes greater than all who were before him in Jerusalem, and wisdom remains with him throughout. Then the verdict: 'I considered all that my hands had done and the toil I had expended in doing it, and behold, all was hebel and a striving after wind, and there was nothing to be gained under the sun.' He turns to wisdom itself: the wise man has eyes in his head, but the fool walks in darkness — yet both die, and death erases the distinction. 'So I hated life.' He hates his toil because he must leave it to someone who did not earn it. The chapter concludes that eating, drinking, and finding enjoyment in work are gifts from God — but even this is qualified: God gives wisdom and joy to the one who pleases him, but the sinner's gathered wealth is merely transferred. 'This also is hebel and a striving after wind.'",
    significance: "Ecclesiastes 2 is the Old Testament's most rigorous empirical investigation into the meaning of life. Qohelet does not philosophize from an armchair; he runs the experiments. Pleasure, achievement, wisdom, wealth — each is tested and each fails to provide lasting satisfaction. The chapter's conclusion is not nihilism but a kind of chastened realism: enjoyment exists, but it is a divine gift, not a human achievement, and it comes without guarantees. This is wisdom literature at its most honest — refusing to promise what it cannot deliver.",
    relationalNote: "The chapter is relentlessly individual — 'I built... I made... I acquired... I hated.' Qohelet's experiment is conducted in isolation, and the loneliness of the project is part of its point. Accumulation without community is accumulation without meaning. The unnamed heir who will receive Qohelet's wealth is not a partner but an irritant — a reminder that the fruits of individual achievement are disbursed by death to people who did nothing to earn them.",
    conceptualNote: "The keyword hebel — traditionally translated 'vanity' or 'meaninglessness' — literally means 'breath,' 'vapor,' or 'mist.' It connotes not worthlessness but transience, insubstantiality, the inability to grasp or hold. Life under the sun is not meaningless in the modern nihilistic sense; it is ephemeral. Everything that Qohelet builds will outlast him but not his experience of building it. The problem is not that life is bad but that it is brief.",
    climateNote: "Qohelet's gardens, parks, pools, and forests evoke the royal pleasure gardens of ancient Near Eastern monarchs — elaborate irrigated paradises in an otherwise semi-arid landscape. The parks (pardes, from Persian, giving us 'paradise') were symbols of royal power over nature: the ability to make the desert bloom through engineering and wealth. The irony is that even these manufactured Edens are hebel.",
    modernParallel: "Ecclesiastes 2 is the autobiography of every successful person who achieved everything on their list and felt emptier at the top than at the bottom. The entrepreneur who exits the company and discovers that the years of building produced wealth but not meaning. The retiree who realizes that their identity was their productivity, and without it they are lost. Qohelet's honesty is rare and valuable: he does not pretend that achievement was satisfying when it was not. The chapter gives permission to say, 'I got what I wanted and it was not enough.'",
    keyQuestions: JSON.stringify([
      "Qohelet tests pleasure, wisdom, and achievement and finds them all hebel. Have you ever reached a goal and found it emptier than expected?",
      "The chapter says enjoyment is a gift from God, not an achievement. What changes when you stop trying to manufacture satisfaction and learn to receive it?",
      "Qohelet hates leaving his work to an unknown heir. How does the knowledge that you cannot control what happens after you change how you invest your energy now?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "I Got Everything I Wanted and It Was Not Enough: Qohelet's Honest Autopsy of Success", target_audience: "Achievers, entrepreneurs, and anyone approaching or past midlife", primary_theme: "The insufficiency of accomplishment as a source of lasting meaning" },
      { angle: "Enjoyment as Gift: When You Stop Manufacturing and Start Receiving", target_audience: "People exhausted by the pressure to optimize every experience", primary_theme: "The difference between earned satisfaction and given joy" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Fox's JPS Ecclesiastes commentary, Seow's Anchor Bible Ecclesiastes, and Bartholomew's 'Ecclesiastes.' Hebel analysis per Fox's 'A Time to Tear Down and a Time to Build Up.'"
  },

  // ═══════════════════════════════════════════════════════════════════════════
  //  SONG OF SOLOMON — 2 missing chapters
  // ═══════════════════════════════════════════════════════════════════════════

  {
    id: 'sng-beloved-praised',
    title: "The Beloved Praised: Mutual Admiration and Reunion (Song of Solomon 6-7)",
    bookId: 'SNG',
    chapterStart: 6,
    verseStart: 1,
    chapterEnd: 7,
    verseEnd: 13,
    summary: "Chapters 6-7 move from the lovers' reunion after the crisis of separation in chapter 5 into some of the Song's most extravagant mutual praise. The daughters of Jerusalem ask, 'Where has your beloved gone?' and the woman replies: 'My beloved has gone down to his garden, to the beds of spices, to graze in the gardens and to gather lilies. I am my beloved's and my beloved is mine.' The crisis is resolved; the lovers are reunited. Then the man speaks — and his praise of the woman is stunning in both its beauty and its strangeness. 'You are beautiful as Tirzah, my love, lovely as Jerusalem, awesome as an army with banners.' He compares her to royal cities and military power — this is not fragile beauty but formidable beauty. Her hair is a flock of goats, her teeth like ewes from the washing, her cheeks like halves of a pomegranate. Among sixty queens and eighty concubines and maidens without number, she is unique: 'My dove, my perfect one, is the only one.' Chapter 7 contains the most complete wasf (praise poem) in the Song, this time beginning from the feet and moving upward — the reverse of chapter 4's head-to-toe sequence. Her feet in sandals, the curves of her thighs, her navel like a rounded bowl, her belly like a heap of wheat, her breasts like twin fawns, her neck like an ivory tower, her eyes like pools in Heshbon, her nose like the tower of Lebanon, her head like Carmel. Then the woman speaks: 'I am my beloved's, and his desire is for me' — a deliberate echo and reversal of Genesis 3:16, where the woman's desire is toward her husband and he rules over her. Here desire is mutual, and no one rules.",
    significance: "The reversal of Genesis 3:16 in Song 7:10 is one of the most theologically significant lines in the book. Where the fall introduced asymmetric desire and domination, the Song envisions desire restored to mutuality. This is not merely a love poem but a theological statement about what human intimacy looks like when the curse is lifted. The comparison of the woman to cities and armies overturns the expectation that feminine beauty is passive or decorative — the Song's woman is magnificent, formidable, and awe-inspiring.",
    relationalNote: "The resolution of the separation crisis (chapters 5-6) into renewed praise demonstrates a pattern that characterizes healthy long-term intimacy: rupture followed by repair, with the repair deepening rather than merely restoring the connection. The lovers do not pretend the crisis did not happen; they move through it into a more extravagant expression of love. The wasf of chapter 7 is more detailed than chapter 4's — as though separation has sharpened the capacity for admiration.",
    conceptualNote: "The comparison of the woman to Tirzah (the northern capital before Samaria) and Jerusalem suggests a pre-divided-monarchy setting or, more likely, a poetic tradition that predates the political split. The military imagery — 'awesome as an army with banners' — is unique in love poetry and suggests that the Song's understanding of beauty encompasses power, not just appearance. The bottom-to-top wasf in chapter 7 may reflect a dance, with the onlookers describing the woman's body as she moves.",
    climateNote: "The geographical references in the wasf — pools of Heshbon, tower of Lebanon, Carmel, Damascus — span the entire Levantine landscape from Transjordan to the Mediterranean coast. The imagery draws on the most striking features of each location: Heshbon's famous water reservoirs, Lebanon's towering cedars, Carmel's forested ridge jutting into the sea. The woman's body is described as a landscape — a geography of desire that encompasses the entire known world.",
    modernParallel: "The Song's insistence on mutual desire — 'I am my beloved's and his desire is for me' — challenges both ancient patriarchy and modern commodification of the body. The woman is not an object of the man's gaze; she is a subject who gazes back, who speaks her desire aloud, who initiates and responds. In a culture saturated with images of bodies as products, the Song's portrait of embodied desire between equals is genuinely counter-cultural. The military metaphors for feminine beauty — armies, towers, city walls — offer an alternative to the cultural association of female beauty with fragility.",
    keyQuestions: JSON.stringify([
      "The Song compares the woman to cities, armies, and towers. How does this challenge conventional ideas about feminine beauty?",
      "'His desire is for me' reverses Genesis 3:16's curse. What does mutual desire look like when power dynamics are healed?",
      "The lovers reunite after crisis and their praise becomes more extravagant. How does rupture-and-repair deepen intimacy?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Awesome as an Army: The Song's Vision of Formidable Beauty", target_audience: "Women and anyone challenging narrow definitions of attractiveness", primary_theme: "Beauty as power, dignity, and presence — not fragility" },
      { angle: "His Desire Is for Me: Reversing the Curse of Genesis 3", target_audience: "Couples and anyone interested in the theology of intimacy", primary_theme: "The Song as a vision of what love looks like when domination is removed" }
    ]),
    sourceTier: 'ai_assisted',
    sourceNotes: "Synthesized from Exum's OTL Song of Songs commentary, Pope's Anchor Bible Song of Songs, and Fox's 'The Song of Songs and the Ancient Egyptian Love Songs.' Genesis 3:16 reversal per Trible's 'God and the Rhetoric of Sexuality.'"
  },

];

// ═════════════════════════════════════════════════════════════════════════════
//  EXECUTE
// ═════════════════════════════════════════════════════════════════════════════

const batchInsert = db.transaction((rows) => {
  let inserted = 0;
  let skipped = 0;
  for (const u of rows) {
    if (existingIds.has(u.id)) {
      // Still INSERT OR REPLACE so we update if desired
    }
    insert.run(u);
    inserted++;
  }
  return { inserted, skipped };
});

// Check for duplicate IDs within our own data
const ids = units.map(u => u.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
  console.error(`\u26A0 Duplicate IDs in script data: ${dupes.join(', ')}`);
  db.close();
  process.exit(1);
}

console.log(`\n=== Insert Missing Wisdom Narrative Units ===`);
console.log(`Units to insert: ${units.length}`);

const result = batchInsert(units);
console.log(`Inserted/updated: ${result.inserted}`);

// Summary
const count = db.prepare('SELECT COUNT(*) as c FROM narrative_units').get().c;
console.log(`\nTotal narrative_units in database: ${count}`);

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM narrative_units
  WHERE book_id IN ('JOB','PSA','ECC','SNG')
  GROUP BY book_id ORDER BY MIN(rowid)
`).all();
for (const row of byBook) {
  console.log(`  ${row.book_id}: ${row.c}`);
}

db.close();
console.log('\nDone.');
