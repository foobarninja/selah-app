/**
 * Insert missing OT narrative units for gap chapters.
 *
 * Missing chapters by book:
 *   GEN: 5, 10, 20, 35, 36
 *   LEV: 9, 21, 22, 24, 27
 *   NUM: 5, 7, 8, 9, 15, 18, 19, 28, 29, 30, 31, 32, 33, 34, 35, 36
 *   DEU: 7, 11-26, 29
 *   JOS: 8, 11, 12
 *   1SA: 11, 12, 21, 22, 23, 27, 29, 30
 *   2SA: 8, 10, 20, 22, 23
 *   1KI: 1, 2, 4, 9, 14, 15, 16, 20
 *   2KI: 1, 3, 4, 8, 11, 13, 14, 15, 16, 21
 *   1CH: 11, 12, 18, 19, 20, 23-29
 *   2CH: 2, 3, 4, 8, 12-19, 21-33
 *   EZR: 2, 8
 *   NEH: 3, 9, 10, 11, 12, 13
 *
 * Rules:
 *   - Genealogy chapters: brief units with minimal notes
 *   - Law-code chapters: grouped into single units where possible
 *   - Narrative chapters: one unit per major episode
 *   - source_tier: 'ai_assisted', source_notes: null
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Each row: [id, title, bookId, chapterStart, verseStart, chapterEnd, verseEnd,
//            summary, significance, relationalNote, conceptualNote, climateNote,
//            modernParallel, keyQuestions, preachingAngles, sourceTier, sourceNotes]
const rows = [

  // ============================================================
  // GENESIS
  // ============================================================

  // GEN 5 — Genealogy from Adam to Noah
  ['gen-genealogy-of-seth', 'Genealogy from Adam to Noah', 'GEN', 5, 1, 5, 32,
    'Ten generations are listed from Adam to Noah in a rhythmic formula: he lived, he fathered sons and daughters, and he died. The repetition is numbing by design — it mimics the weight of passing centuries. But two disruptions break the pattern. Enoch "walked with God and was not, for God took him," a single line that cracks open the monotone of mortality. And Lamech names his son Noah, expressing hope that this child will bring relief from the cursed ground. The genealogy is not filler. It is a bridge between the tragedy of Eden and the catastrophe of the flood, and its quiet insistence is: life continued, generation after generation, even under the sentence of death.',
    'This genealogy connects the first human to the flood hero, establishing the theological line through which God preserves humanity. The ages — extraordinary by modern standards — emphasize the vitality of the pre-flood world and make Enoch\'s exception all the more striking. The text is claiming that death is the norm, and escape from death is the miracle.',
    'The father-son chain is the only social structure visible here. Each generation inherits both the image of God (5:3 echoes 1:26) and the curse of mortality. Fatherhood is simultaneously a gift and a transmission of brokenness.',
    'The genealogy introduces the concept of inherited identity — you are named, counted, and placed in a line. The pre-flood ages raise questions about mortality and divine intention that the flood narrative will address.',
    'The pre-flood world stretches across centuries that dwarf recorded history. For an ancient audience, these enormous lifespans signaled a lost golden age, a time when humanity was closer to its Edenic origin.',
    'Family trees seem boring until you need one — until someone asks "where did you come from?" and you realize the answer is a story of survival, of people who kept going even when the world gave them every reason to stop. This genealogy is the Bible\'s version of that.',
    JSON.stringify(['What does it mean that life continued "normally" for centuries between the Fall and the Flood?', 'Why does Enoch\'s exception matter in a list dominated by death?', 'What hopes do you carry for the next generation that echo Lamech\'s hope for Noah?']),
    JSON.stringify([
      { angle: 'The Weight of "And He Died"', target_audience: 'Those grieving or contemplating mortality', primary_theme: 'Mortality and the exception of grace' },
      { angle: 'Naming Your Hope', target_audience: 'New parents and expectant families', primary_theme: 'Generational hope despite a broken world' }
    ]),
    'ai_assisted', null],

  // GEN 10 — Table of Nations
  ['gen-table-of-nations', 'The Table of Nations', 'GEN', 10, 1, 10, 32,
    'Seventy nations descend from Noah\'s three sons — Shem, Ham, and Japheth — spreading across the ancient world by clan, language, and territory. This is not a phone directory. It is a theological claim: every people on earth is family. The diversity of nations is not an accident or a punishment (that comes in chapter 11). It is the outworking of the creation mandate to fill the earth. Nimrod appears as the first empire-builder, and the text notes it without celebration — a hint that concentrated power is not the divine plan.',
    'The Table of Nations grounds Israel\'s identity in a global family tree. Every nation Israel will later encounter — Egypt, Canaan, Assyria, Philistia — appears here as a relative. This makes future conflicts family disputes and future blessings (to Abraham: "all families of the earth") a reunion.',
    'The three-brother structure mirrors the family dynamics that drive Genesis: which line carries the promise forward? Ham\'s line includes Canaan and Nimrod; Shem\'s line leads to Abraham. The text is already sorting the branches.',
    'The concept of nationhood as divine design — peoples differentiated by language, land, and lineage — anticipates both the Babel disruption and the Abrahamic mission to bless all nations.',
    'The geography spans from the Mediterranean to Mesopotamia, mapping the known world of the ancient Near East. Each clan name corresponds to a real people group the original audience would have recognized.',
    'Think of a family reunion where you discover distant relatives you never knew you had. The Table of Nations says every culture, every language group, every people — they all started at the same table. The implications for how we treat "the other" are enormous.',
    JSON.stringify(['If all nations share a common ancestor, how should that shape our view of cultural and ethnic differences?', 'What does it mean that the Bible traces human diversity to divine design rather than to punishment?']),
    JSON.stringify([
      { angle: 'The Family We Forgot', target_audience: 'Multicultural congregations', primary_theme: 'Common humanity across ethnic lines' }
    ]),
    'ai_assisted', null],

  // GEN 20 — Abraham and Abimelech
  ['gen-abraham-and-abimelech', 'Abraham and Abimelech in Gerar', 'GEN', 20, 1, 20, 18,
    'Abraham moves south to Gerar and, for the second time, introduces Sarah as his sister. The pattern is depressingly familiar — fear overrides faith, and the covenant-bearer endangers the covenant woman. But this time the story takes an unexpected turn. Abimelech, the pagan king, acts with more integrity than the prophet of God. God intervenes in a dream to warn Abimelech, who is genuinely outraged: "Did he not himself say to me, \'She is my sister\'?" Abraham\'s excuse — that he assumed there was no fear of God in this place — rings hollow when the Gentile king demonstrates exactly that fear.',
    'This episode is a devastating portrait of how proximity to God does not guarantee moral superiority. Abraham is called a prophet in this chapter — the first use of the term in the Bible — yet he is the liar, and the pagan king is the righteous one. The text refuses to let Israel claim automatic moral high ground.',
    'The relationship between Abraham and Abimelech inverts expectations. The patriarch is the deceiver; the foreigner is the truth-teller. God protects both parties — Sarah from defilement, Abimelech from guilt. The covenant survives not because of Abraham\'s faithfulness but despite his failure.',
    'The chapter introduces the idea that prophetic status and moral failure can coexist — a theme that will recur throughout the Bible. Abraham\'s prayer heals Abimelech\'s household even though Abraham himself is the source of the problem.',
    'Gerar sits in the western Negev, a region where a stateless nomad depends entirely on the goodwill of local rulers for water and pasture. Abraham\'s fear is not irrational — vulnerable people lie to survive. But the text holds him to a higher standard.',
    'Ever assumed the worst about someone — a new neighbor, a different community, a foreign country — only to discover they had more integrity than you did? Abraham projected godlessness onto Gerar and found God already there. We do the same thing every time we write off people we haven\'t bothered to know.',
    JSON.stringify(['When have you underestimated the moral character of someone outside your community?', 'How do you reconcile Abraham\'s status as a prophet with his repeated deception?', 'What does it mean that God protects the covenant even when the covenant-bearer acts badly?']),
    JSON.stringify([
      { angle: 'When the Outsider Has More Integrity', target_audience: 'Church communities tempted by moral superiority', primary_theme: 'Grace beyond tribal boundaries' },
      { angle: 'The Prophet Who Lied Twice', target_audience: 'Leaders struggling with repeated moral failures', primary_theme: 'Calling persists through failure' }
    ]),
    'ai_assisted', null],

  // GEN 35 — Jacob Returns to Bethel
  ['gen-jacob-returns-to-bethel', 'Jacob Returns to Bethel', 'GEN', 35, 1, 35, 29,
    'God commands Jacob to return to Bethel — the place where, decades earlier, a fugitive dreamed of a ladder reaching heaven. The journey back requires purification: foreign gods are buried under an oak at Shechem. At Bethel, God reaffirms the name Israel and renews the Abrahamic promises. But the chapter is shadowed by loss. Rachel dies giving birth to Benjamin on the road. Reuben sleeps with Bilhah, shattering his father\'s trust. Isaac dies at Hebron. The covenant continues, but at tremendous personal cost.',
    'This chapter is a hinge point in Genesis — it closes the Jacob cycle and transitions to the Joseph narrative. The covenant renewal at Bethel bookends Jacob\'s journey: he left as a deceiver running from his brother, and returns as Israel, a patriarch burying his wife and his father.',
    'Jacob\'s command to put away foreign gods reveals the spiritual state of his household after Shechem. Rachel\'s death during Benjamin\'s birth forces Jacob to rename the child from Ben-oni ("son of my sorrow") to Benjamin ("son of my right hand") — grief and hope in a single act of naming.',
    'The burial of foreign gods before worship establishes a pattern: genuine encounter with God requires the removal of rivals. The name change from Jacob to Israel is reaffirmed, making identity transformation a completed act rather than a one-time event.',
    'The journey from Shechem to Bethel to Hebron traces the central hill country of Canaan. Rachel\'s burial site near Bethlehem will become a landmark in Israelite memory.',
    'Returning to a place where God once met you — after years of compromise, loss, and mixed results — is one of the most vulnerable things a person can do. Jacob went back to Bethel carrying grief, scandal, and foreign idols. He left carrying a renewed promise. Sometimes the most faithful thing is to go back to the beginning.',
    JSON.stringify(['Is there a "Bethel" in your life — a place of early encounter with God — that you need to revisit?', 'What "foreign gods" might need to be buried before you can move forward spiritually?', 'How do you hold grief and promise together, as Jacob did with Rachel\'s death and Benjamin\'s birth?']),
    JSON.stringify([
      { angle: 'Going Back to Bethel', target_audience: 'Long-time believers in spiritual dry seasons', primary_theme: 'Covenant renewal after years of compromise' },
      { angle: 'Burying the Gods You Accumulated', target_audience: 'People in spiritual declutter mode', primary_theme: 'Purification as prerequisite for encounter' }
    ]),
    'ai_assisted', null],

  // GEN 36 — Esau's Descendants
  ['gen-esaus-descendants', 'The Descendants of Esau', 'GEN', 36, 1, 36, 43,
    'Esau\'s genealogy is catalogued in meticulous detail: his wives, his sons, the chiefs of Edom, and the kings who reigned before any king ruled in Israel. The chapter reads like an administrative record, but its placement is deliberate — it closes the Esau branch of the family before the Joseph narrative opens. Esau received land and nationhood outside the promised land. The rejected line prospered, just not within the covenant.',
    'The text honors Esau\'s line with a full genealogical record, signaling that God\'s provision extends beyond the chosen family. Edom will remain Israel\'s neighbor, rival, and mirror throughout the Old Testament.',
    'The separation of Esau and Jacob is now complete. They shared a womb, a father\'s blessing became a source of conflict, and now their descendants will occupy different lands. The genealogy is a farewell — respectful, thorough, and final.',
    'Recording the unchosen line\'s genealogy establishes that divine election does not mean divine abandonment. Esau was not cursed; he was redirected.',
    'Edom occupies the rugged terrain southeast of the Dead Sea — copper-rich, trade-route adjacent, and politically organized into chieftaincies before Israel had a king.',
    'Every family has branches that went a different direction. This chapter is the Bible pausing to say: they mattered too. Their story is worth recording even if the camera is about to follow someone else.',
    JSON.stringify(['What does it mean that God records the genealogy of the "unchosen" line?', 'How should we think about people and communities that prosper outside our tradition?']),
    JSON.stringify([
      { angle: 'The Brother Who Went a Different Way', target_audience: 'Families with estranged members', primary_theme: 'God\'s provision beyond the chosen line' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // LEVITICUS
  // ============================================================

  // LEV 9 — The Priesthood Begins
  ['lev-priesthood-begins', 'The Priesthood Begins', 'LEV', 9, 1, 9, 24,
    'After seven days of ordination, Aaron and his sons begin their priestly ministry. Aaron offers sacrifices for himself and for the people, Moses and Aaron bless the congregation, and the glory of the Lord appears. Fire comes out from the Lord and consumes the offering. The people shout and fall on their faces. This is the moment the entire tabernacle system has been building toward — God\'s visible presence among his people, mediated through sacrifice and priesthood.',
    'This chapter records the inauguration of Israel\'s sacrificial system. The divine fire that consumes the offering validates the entire Levitical apparatus — God accepts what has been offered according to his instructions. The pattern of obedience leading to divine manifestation is established here.',
    'Aaron acts as mediator between God and Israel for the first time. His trembling is implied — he has just been through an elaborate ordination, and his sons will die in the very next chapter. The weight of standing between a holy God and a sinful people is immense.',
    'The sequence — offering, blessing, glory, fire — establishes the theology of mediated worship. Humans cannot approach God directly; the system of priesthood and sacrifice creates the necessary bridge.',
    'The wilderness tabernacle is a portable sanctuary in the Sinai desert. The fire from the Lord would have been visible to the entire camp gathered around the tent of meeting.',
    'Think of the first day on a job you trained months for — the moment when preparation becomes reality. That is Leviticus 9: the system goes live, and God shows up.',
    JSON.stringify(['What does it look like when preparation meets divine response?', 'Why does God choose to manifest through structured systems rather than spontaneous appearances?']),
    JSON.stringify([
      { angle: 'When the System Goes Live', target_audience: 'People launching new ministries or vocations', primary_theme: 'Obedient preparation meets divine power' }
    ]),
    'ai_assisted', null],

  // LEV 21-22 — Priestly Holiness Standards
  ['lev-priestly-holiness-standards', 'Priestly Holiness Standards', 'LEV', 21, 1, 22, 33,
    'These chapters detail the heightened holiness requirements for priests: restrictions on mourning practices, physical qualifications for service, rules about who may eat sacred offerings, and standards for acceptable sacrificial animals. The high priest faces the strictest regulations — he may not mourn even for his parents. The underlying logic is representational: the priest stands before God on behalf of the people, so his life must reflect the holiness of the one he represents.',
    'The priestly standards establish that mediators bear a heavier burden than the community they serve. The physical and behavioral requirements are not about worth but about function — the priest\'s body and life are instruments of sacred representation.',
    'The priest\'s family is drawn into his vocation. His wife, his children, and even his mourning are shaped by his calling. The cost of sacred service extends beyond the individual to the household.',
    'The concept of holiness as separation is carried to its logical extreme in the priesthood. If all Israel is to be holy, the priests must be holier still — not morally superior, but ritually more separated for divine service.',
    'In a wilderness camp with no hospital or social services, the priesthood is the only institutional link between the people and God. These regulations ensure that link remains unbroken.',
    'Anyone in public service — pastors, teachers, leaders — knows the tension between personal freedom and representational responsibility. These chapters name that tension directly: your role shapes your life in ways you did not choose.',
    JSON.stringify(['Is it fair that leaders bear heavier standards? What is the theological logic?', 'How do you serve in a representative role without losing your own identity?']),
    JSON.stringify([
      { angle: 'The Cost of Representing God', target_audience: 'Pastors and ministry leaders', primary_theme: 'Vocation-shaped life' }
    ]),
    'ai_assisted', null],

  // LEV 24 — Bread, Light, and Blasphemy
  ['lev-bread-light-blasphemy', 'Bread, Light, and Blasphemy', 'LEV', 24, 1, 24, 23,
    'The chapter opens with instructions for the perpetual lamp and the showbread — weekly rituals that maintain God\'s presence in the tabernacle. Then an abrupt narrative interrupts: a man of mixed parentage (Egyptian father, Israelite mother) blasphemes the divine name during a quarrel. Moses consults the Lord, and the penalty is death by stoning. The text then restates the lex talionis — eye for eye, tooth for tooth — as the standard of proportional justice for all, native and foreigner alike.',
    'The juxtaposition of worship maintenance and capital punishment reveals the seriousness of the divine name. The same God whose lamp must never go out will not allow his name to be weaponized. The inclusion of a foreigner under the same law establishes equal justice.',
    'The mixed-parentage detail is not incidental. This man belongs to both Israel and Egypt, and his case forces the community to determine whose law applies. The answer: God\'s law applies to everyone in the camp equally.',
    'The lex talionis (eye for eye) is not a license for revenge but a ceiling on punishment — the penalty must fit the crime, no more. It is a radical limitation on retribution in a world where blood feuds could escalate without end.',
    'The olive oil for the lamp and the grain for the showbread require ongoing supply in the desert — a logistical commitment that makes worship a daily economic act, not just a spiritual one.',
    'The equal-justice principle here is remarkable for the ancient world: the immigrant and the citizen face the same court. Modern societies still struggle with the ideal that Leviticus 24 states plainly.',
    JSON.stringify(['What does it mean to treat the divine name with reverence in a casual culture?', 'How does the equal-justice principle apply to contemporary disparities in how law is applied?']),
    JSON.stringify([
      { angle: 'One Law for All', target_audience: 'Justice-oriented communities', primary_theme: 'Equal accountability regardless of origin' }
    ]),
    'ai_assisted', null],

  // LEV 27 — Vows and Dedications
  ['lev-vows-and-dedications', 'Vows and Dedications', 'LEV', 27, 1, 27, 34,
    'Leviticus closes with regulations for voluntary vows: dedicating persons, animals, houses, and land to the Lord, along with redemption prices for each. The chapter deals with the economics of devotion — what happens when you promise something to God and then want it back. The answer is: you can redeem it, but at a cost. The underlying principle is that words spoken to God are binding, and the sacred cannot be casually reclaimed for common use.',
    'As the final chapter of Leviticus, this section closes the book by addressing voluntary devotion beyond the required sacrifices. It signals that the relationship between God and Israel has room for personal initiative, not just obligation.',
    'Vow-making in a clan-based society often involved dedicating family members to tabernacle service. The redemption prices made this possible without permanently surrendering a household member — balancing devotion with family integrity.',
    'The theology of vows rests on the character of God as one who keeps promises and expects the same. Casual speech before God is impossible in this framework.',
    'Valuations are given in shekels of the sanctuary — a fixed standard in a world without standardized currency. The economic precision reflects the seriousness with which the community treated verbal commitments to God.',
    'We live in a world of broken promises and easy cancellations. Leviticus 27 says: your word to God is currency. You can renegotiate, but there is always a cost.',
    JSON.stringify(['What promises have you made to God that you have quietly let slide?', 'Is there a modern equivalent to the redemption price — a cost for changing your commitment?']),
    JSON.stringify([
      { angle: 'The Cost of Changed Minds', target_audience: 'People renegotiating commitments', primary_theme: 'Integrity of vows before God' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // NUMBERS
  // ============================================================

  // NUM 5 — Purity of the Camp and the Jealousy Ritual
  ['num-camp-purity-jealousy', 'Purity of the Camp and the Jealousy Ritual', 'NUM', 5, 1, 5, 31,
    'The chapter addresses three issues: removing the unclean from camp, restitution for wrongs, and the trial of the suspected adulteress (the sotah ritual). The jealousy ordeal — bitter water, an oath, the dust from the tabernacle floor — is unsettling to modern readers. But in its context, it served as a protection: in a world where a husband\'s jealousy could lead to violence or summary execution, this ritual transferred judgment from the husband to God. The outcome was in God\'s hands, not the man\'s anger.',
    'The sotah ritual places divine judgment at the center of marital disputes, removing the husband\'s unilateral power to punish. In the ancient Near East, this was remarkably protective of the accused wife.',
    'The husband-wife dynamic here is mediated by the priest and by God. Jealousy — a corrosive force in any relationship — is not ignored but redirected through institutional channels.',
    'The concept of the camp as sacred space drives the opening regulations: God dwells in the center, so the perimeter must be maintained. Purity is spatial, not just moral.',
    'In a tent-camp community, accusations of adultery could tear apart the social fabric. The ritual provides a structured resolution that prevents mob justice.',
    'When suspicion poisons a relationship, there are only two options: let it fester or bring it into the light. This chapter insists on the second, however imperfect the mechanism.',
    JSON.stringify(['How does a community handle suspicion without descending into vigilantism?', 'What does it mean that God, not the accuser, renders the verdict?']),
    JSON.stringify([
      { angle: 'When Jealousy Meets Justice', target_audience: 'Couples and counselors', primary_theme: 'Structured resolution over unilateral punishment' }
    ]),
    'ai_assisted', null],

  // NUM 7 — Offerings at the Tabernacle Dedication
  ['num-tabernacle-dedication-offerings', 'Offerings at the Tabernacle Dedication', 'NUM', 7, 1, 7, 89,
    'Each of the twelve tribal leaders brings an identical offering over twelve consecutive days for the dedication of the tabernacle. The chapter is the longest in the Torah, and its repetition is the point. Every tribe\'s contribution is recorded in full — not summarized, not abbreviated. The text insists on giving each tribe its own paragraph, its own day, its own dignity. At the end, Moses enters the tent of meeting and hears God\'s voice from between the cherubim.',
    'The meticulous repetition communicates equal dignity among the tribes. No tribe\'s offering is more important than another\'s. The identical gifts prevent competition and establish that approach to God is uniform in value.',
    'Twelve leaders, twelve identical gifts, twelve separate paragraphs — the text refuses to play favorites. In a community prone to tribal rivalry, this chapter is a structural argument for equality before God.',
    'The concept of corporate worship as individual contribution writ large emerges here. The tabernacle belongs to all Israel, and its dedication requires every tribe\'s participation.',
    'The offerings include silver plates, gold dishes, bulls, rams, lambs, and grain — the combined agricultural and pastoral wealth of a people recently freed from slavery, now investing in worship.',
    'Imagine twelve departments in an organization each getting equal recognition at a company event — not ranked, not compared, just honored. That is Numbers 7. Tedious to read, meaningful to the people in it.',
    JSON.stringify(['Why does the Bible sometimes insist on tedious repetition?', 'What does equal recognition look like in your community?']),
    JSON.stringify([
      { angle: 'Every Tribe Gets Its Paragraph', target_audience: 'Diverse communities', primary_theme: 'Equal dignity in worship' }
    ]),
    'ai_assisted', null],

  // NUM 8 — Levite Consecration
  ['num-levite-consecration', 'Consecration of the Levites', 'NUM', 8, 1, 8, 26,
    'The Levites are ritually cleansed and presented as a wave offering before the Lord — living sacrifices offered on behalf of Israel. They serve as substitutes for the firstborn of every family, a living ransom. Their consecration includes shaving, washing, and laying on of hands by the whole congregation. The age limits for service (25 to 50) establish that sacred work has both an entry point and a retirement.',
    'The Levites embody the principle of substitutionary service. Every Israelite firstborn belongs to God; the Levites serve in their place. This theology of one serving for many anticipates later sacrificial theology.',
    'The congregation lays hands on the Levites, transferring their obligation onto these representatives. The relationship is one of delegation — the Levites carry the community\'s sacred duty so the community can function.',
    'The wave offering of living persons is a striking image: humans presented to God not for slaughter but for service. It redefines offering as vocation, not death.',
    'The age limits reflect the physical demands of tabernacle service — transporting heavy poles, curtains, and frames through the desert. This is manual labor consecrated as worship.',
    'Every organization has people who carry a disproportionate share of the sacred work so that others can go about their lives. The Levites are the Bible\'s template for dedicated service personnel.',
    JSON.stringify(['Who carries the "Levite" role in your community — doing the sacred work so others can thrive?', 'What does it mean to be a living offering?']),
    JSON.stringify([
      { angle: 'Living Sacrifices', target_audience: 'Volunteers and ministry workers', primary_theme: 'Vocation as substitutionary service' }
    ]),
    'ai_assisted', null],

  // NUM 9 — Second Passover and the Cloud
  ['num-second-passover-cloud', 'The Second Passover and the Guiding Cloud', 'NUM', 9, 1, 9, 23,
    'Israel celebrates the Passover one year after leaving Egypt, but some people are ritually unclean and cannot participate. God provides a solution: a second Passover one month later for those who missed the first. The chapter then describes the cloud over the tabernacle — when it lifts, Israel marches; when it settles, they camp. Whether two days or a month, the people wait for the cloud. Their entire itinerary is governed by divine movement.',
    'The second Passover provision reveals a God who makes room for exceptions without abandoning the rule. The cloud guidance establishes that Israel\'s journey is not self-directed — they follow, they do not lead.',
    'The tension between the ritually excluded and the community is resolved not by lowering the standard but by creating a second opportunity. Inclusion and holiness coexist through creative provision.',
    'The cloud theology makes Israel\'s journey an exercise in responsive obedience. Planning is impossible when you do not know if you will be in the same place tomorrow. This is forced dependence on God.',
    'Desert travel is dangerous without clear direction. The cloud provided both shade (daytime) and fire (nighttime) — practical survival as well as spiritual guidance.',
    'Anyone who has waited for direction — for the next job, the next door to open — knows the frustration of the cloud that will not move. Numbers 9 says: stay until it lifts. Your schedule is not the point.',
    JSON.stringify(['How do you respond when God\'s timing does not match your plans?', 'What does it look like to create "second chances" in a community without lowering standards?']),
    JSON.stringify([
      { angle: 'Waiting for the Cloud', target_audience: 'People in seasons of uncertainty', primary_theme: 'Divine timing over human planning' }
    ]),
    'ai_assisted', null],

  // NUM 15 — Supplementary Offering Laws and Sabbath Violation
  ['num-supplementary-laws-sabbath', 'Offering Supplements and the Sabbath Breaker', 'NUM', 15, 1, 15, 41,
    'After the devastating report of the spies and the failed invasion, God gives supplementary laws for offerings — pointedly framed as "when you come into the land." The message is clear: the promise still stands even though this generation will not see it. Mid-chapter, a man is caught gathering sticks on the Sabbath and is put to death. The chapter closes with the command to wear tassels (tzitzit) as physical reminders of God\'s commands.',
    'The "when you come into the land" framing after the spy debacle is an act of grace — God is already speaking to the next generation. The sabbath violation and tassels bracket the chapter with the theme of remembering God\'s commands when forgetfulness seems easiest.',
    'The stick-gatherer is an individual whose small act of disobedience becomes a public test case. The severity of the penalty communicates the seriousness of sabbath in a community whose survival depends on trusting God for provision.',
    'The tassels command (tzitzit) transforms clothing into theology — every garment becomes a mnemonic for the covenant. Physical reminders are not signs of weak faith but tools for maintaining it.',
    'In the wilderness, gathering fuel was a daily necessity. The sabbath prohibition tested whether Israel trusted God to provide enough in six days — an economic and spiritual challenge in a survival environment.',
    'We all wear reminders — wedding rings, team jerseys, religious symbols. The tzitzit command says: let your clothing tell you who you belong to. In a culture of identity confusion, that is more relevant than ever.',
    JSON.stringify(['What physical reminders help you stay connected to your commitments?', 'How does God speaking about the future land offer hope after catastrophic failure?']),
    JSON.stringify([
      { angle: 'After the Worst Day, God Still Has Plans', target_audience: 'People recovering from major failure', primary_theme: 'Promises outlast disobedience' }
    ]),
    'ai_assisted', null],

  // NUM 18-19 — Priestly Duties and the Red Heifer
  ['num-priestly-duties-red-heifer', 'Priestly Duties and the Red Heifer', 'NUM', 18, 1, 19, 22,
    'Numbers 18 assigns specific responsibilities and income to the priests and Levites: they receive no land inheritance but are sustained by tithes and offerings. Numbers 19 introduces the red heifer — a unique purification ritual for corpse contamination. An unblemished red cow is slaughtered and burned entirely; its ashes are mixed with water to cleanse anyone who has touched a dead body. The paradox: the priest who prepares the purification becomes temporarily unclean himself.',
    'The "no inheritance except the Lord" clause for Levites establishes the principle of vocational dependence on God. The red heifer ritual addresses the most common form of impurity in a community where death was ever-present.',
    'The priest who creates the purification ashes becomes unclean in the process — a picture of vicarious contamination in service to others. Pastoral ministry has always required absorbing some of the mess.',
    'The red heifer has generated centuries of theological reflection. Its paradox — the purifier becomes impure — anticipates the New Testament theology of Christ bearing sin to cleanse sinners.',
    'In desert conditions with high mortality and no embalming, corpse contamination was an ongoing practical problem. The red heifer ashes could be stored and mixed with water as needed — a portable purification system.',
    'The helper who absorbs others\' pain — the therapist, the social worker, the pastor — knows the cost of being the purification agent. This ritual names that cost honestly.',
    JSON.stringify(['What does it mean to serve in a way that costs your own "cleanness"?', 'How does dependence on God for income change a person\'s relationship to their work?']),
    JSON.stringify([
      { angle: 'The Cost of Being the Cleanup Crew', target_audience: 'Caregivers and helping professionals', primary_theme: 'Vicarious impurity in service' }
    ]),
    'ai_assisted', null],

  // NUM 28-29 — Festival Calendar of Offerings
  ['num-festival-offerings-calendar', 'The Festival Calendar of Offerings', 'NUM', 28, 1, 29, 40,
    'A comprehensive calendar of required offerings: daily, sabbath, monthly, and the seven annual festivals (Passover, Firstfruits, Weeks, Trumpets, Day of Atonement, Tabernacles). The list is exhaustive — bulls, rams, lambs, grain, and drink offerings specified for every occasion. This is the budget of Israel\'s worship life, quantified in livestock and grain. The sheer volume communicates that Israel\'s relationship with God is not occasional or sentimental but structural, regular, and costly.',
    'The offering calendar establishes worship as a fixed structure, not a spontaneous impulse. Israel\'s year is organized around encounters with God, ensuring that no season passes without corporate acknowledgment of divine provision.',
    'The community bears the cost collectively. These are not personal devotions but national obligations — the entire community funds its worship through shared sacrifice.',
    'The theology of regularity is the heart of these chapters. Daily offerings mean God is acknowledged every morning and evening. Sabbath offerings add to, not replace, the daily ones. Festivals layer even more. The cumulative effect is a life saturated with worship.',
    'The livestock quantities require significant pastoral wealth. The offerings reflect an agricultural society whose primary capital is living animals and harvested grain.',
    'Every budget reveals priorities. These chapters are Israel\'s budget — and the priority is unmistakable: God first, in every cycle, at every level.',
    JSON.stringify(['What does your calendar reveal about your actual priorities?', 'Is there value in structured, regular worship even when it does not feel spontaneous?']),
    JSON.stringify([
      { angle: 'Show Me Your Calendar, I\'ll Show You Your God', target_audience: 'Busy professionals and families', primary_theme: 'Structured worship as priority declaration' }
    ]),
    'ai_assisted', null],

  // NUM 30 — Vows and Their Annulment
  ['num-vows-annulment', 'Vows: When Words Become Binding', 'NUM', 30, 1, 30, 16,
    'This chapter regulates vows made by women in relationship to the authority of their fathers or husbands. A man\'s vow is binding unconditionally; a woman\'s vow can be annulled by her father or husband on the day he hears it. If he remains silent, it stands. The patriarchal framework is undeniable, but within it the text creates a specific protection: the woman is not punished if her vow is overridden. The guilt transfers to the one who annulled it.',
    'The chapter establishes that words spoken to God carry real weight, regardless of gender. The annulment provisions exist within a household-authority structure, but the transfer of guilt to the annuller is a striking protection for the subordinate party.',
    'The father-daughter and husband-wife dynamics govern these regulations. The silent-consent principle (failure to object = ratification) places responsibility on the authority figure, not the vow-maker.',
    'The theology of vows as irrevocable speech acts drives the entire chapter. God takes spoken commitments seriously, and the community must create structures to manage that seriousness within complex household dynamics.',
    'In a patriarchal clan economy, a woman\'s vow could have significant economic implications for the household. The annulment provision manages the tension between individual devotion and household economics.',
    'Any time one person\'s promises affect another person\'s life — business partners, spouses, parents and children — the question of authority and responsibility arises. This chapter says: if you override someone else\'s commitment, the consequences are yours.',
    JSON.stringify(['When should an authority figure override a subordinate\'s commitment?', 'What does the transfer of guilt teach about responsibility in leadership?']),
    JSON.stringify([
      { angle: 'When Someone Else Breaks Your Promise', target_audience: 'People whose commitments have been overridden', primary_theme: 'Authority, responsibility, and guilt' }
    ]),
    'ai_assisted', null],

  // NUM 31-32 — War with Midian and Transjordan Settlements
  ['num-midian-war-transjordan', 'War with Midian and the Transjordan Settlements', 'NUM', 31, 1, 32, 42,
    'Israel wages holy war against Midian as retribution for the Baal Peor seduction. The aftermath is brutal and detailed: plunder, purification, and distribution of spoils. Chapter 32 shifts to the tribes of Reuben, Gad, and half-Manasseh requesting land east of the Jordan for their herds. Moses responds with fury — are they the new generation\'s version of the faithless spies? They negotiate a compromise: they will fight alongside their brothers first, then return to settle the Transjordan.',
    'The Midian war closes the Baal Peor chapter that killed 24,000. The Transjordan negotiation tests whether the new generation has learned the lesson of the spies — choosing comfort over covenant nearly costs them their inheritance.',
    'Moses\'s anger at the Transjordan request reveals lingering trauma from forty years of dealing with defection. The two-and-a-half tribes must prove their commitment through action, not just words.',
    'The tension between tribal self-interest and community solidarity is the theological heart of chapter 32. Individual prosperity that undermines corporate mission is not acceptable — you fight together before you settle separately.',
    'The Transjordan region (Gilead, Bashan) offered rich pastureland that appealed to cattle-heavy tribes. Choosing it meant living outside the primary promised land, a geographic decision with theological overtones.',
    'The Transjordan negotiation is every conversation about individual versus collective responsibility. You want to pursue your own opportunity? Fine — but first you fulfill your obligations to the group. Organizations, churches, and families navigate this tension constantly.',
    JSON.stringify(['When does pursuing personal opportunity become abandoning shared responsibility?', 'How do you prove commitment through action rather than words?']),
    JSON.stringify([
      { angle: 'Fight First, Then Settle', target_audience: 'Teams and organizations', primary_theme: 'Personal ambition versus collective obligation' }
    ]),
    'ai_assisted', null],

  // NUM 33-36 — Journey Log, Boundaries, and Final Laws
  ['num-journey-log-final-laws', 'Journey Log, Land Boundaries, and Final Laws', 'NUM', 33, 1, 36, 13,
    'Numbers closes with four administrative chapters: a travel itinerary listing forty-two wilderness stops (ch. 33), the boundaries of the promised land (ch. 34), the designation of Levitical cities and cities of refuge (ch. 35), and the inheritance rights of Zelophehad\'s daughters (ch. 36). The journey log reads like a road map of faithfulness and failure. The land boundaries anticipate conquest. The refuge cities establish that even in a violent world, due process matters. And Zelophehad\'s daughters, who fought for their inheritance in chapter 27, now accept a reasonable limitation: they will marry within their tribe to prevent land fragmentation.',
    'These closing chapters frame the wilderness as a completed journey with a documented record. The land boundaries, refuge cities, and inheritance laws establish structures for the society Israel is about to become.',
    'Zelophehad\'s daughters return to accept a communal limitation on their hard-won rights — personal inheritance balanced against tribal integrity. The negotiation between individual and collective rights continues.',
    'The cities of refuge establish a crucial legal principle: accidental killing is different from murder. Due process and sanctuary exist even within the harshest justice codes. This is a civilization-building provision.',
    'Forty-two wilderness stops in forty years — some lasting days, some years. The geography traces a winding path through the Sinai and Transjordan, a physical record of a generation\'s journey from slavery to the edge of promise.',
    'Documenting the journey — every stop, every boundary, every legal provision — is the work of a community that knows it is building something that must outlast its founders. These chapters are the blueprints for a nation.',
    JSON.stringify(['Why does the Bible preserve a travel log of forty-two stops?', 'What does the cities-of-refuge concept teach about justice and mercy?']),
    JSON.stringify([
      { angle: 'Blueprint for a Just Society', target_audience: 'Justice-minded congregations', primary_theme: 'Institutional design as moral act' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // DEUTERONOMY
  // ============================================================

  // DEU 7 — The Command to Destroy and the Reason to Trust
  ['deu-command-to-destroy-and-trust', 'Driving Out the Nations', 'DEU', 7, 1, 7, 26,
    'Moses commands Israel to utterly destroy the seven nations of Canaan — no treaties, no intermarriage, no mercy. The severity is staggering. But the chapter immediately pivots to the reason: "It was not because you were more in number that the LORD set his love on you... but because the LORD loves you." The command to destroy is framed entirely within the logic of election and loyalty. Israel is not superior; Israel is chosen. And the danger of compromise is not abstract — it is the slow erosion of identity through cultural assimilation.',
    'This chapter is one of the most difficult in the Bible. The herem (total destruction) command raises profound ethical questions. But the text situates it within God\'s faithfulness to the covenant and Israel\'s vulnerability to idolatry — not within racial superiority.',
    'God\'s relationship with Israel is described in the language of love and choice — not merit. The most tender language in Deuteronomy appears in the same chapter as the most violent commands, creating a theological tension the text does not resolve.',
    'The logic of election without merit — "not because you were great" — is the foundation of grace theology. Israel is chosen despite its smallness, loved despite its stubbornness.',
    'The seven nations of Canaan were not primitive tribes but sophisticated city-state cultures with advanced agriculture, religious architecture, and military technology. Israel was the underdog.',
    'The fear of losing your identity through cultural absorption is not ancient history. Every minority community, immigrant family, and distinctive tradition faces the question: how much can you blend in before you disappear?',
    JSON.stringify(['How do you maintain distinctive identity without becoming hostile to outsiders?', 'What does it mean to be chosen not because of merit but because of love?']),
    JSON.stringify([
      { angle: 'Loved, Not Earned', target_audience: 'Performance-driven believers', primary_theme: 'Election as unmerited love' },
      { angle: 'The Danger of Slow Drift', target_audience: 'Communities navigating cultural assimilation', primary_theme: 'Identity preservation without isolationism' }
    ]),
    'ai_assisted', null],

  // DEU 11-13 — Love, Loyalty, and the Test of False Prophets
  ['deu-love-loyalty-false-prophets', 'Love, Loyalty, and the Test of False Prophets', 'DEU', 11, 1, 13, 18,
    'These chapters press the central demand: love God with total loyalty. Chapter 11 contrasts Egypt (where you irrigated by foot) with Canaan (where God sends rain) — the promised land requires dependence. Chapter 12 centralizes worship at the place God will choose, eliminating the freelance altars that breed syncretism. Chapter 13 is the test of loyalty: if a prophet performs a miracle but leads you away from God, the miracle does not validate the message. Even family members who entice toward other gods are to be rejected. The standard is theological, not experiential.',
    'The centralization of worship and the false-prophet test establish a framework where truth is measured by faithfulness to the covenant God, not by spectacular results. This is foundational for prophetic discernment throughout the Bible.',
    'The command to reject even family members who lead astray places covenant loyalty above kinship loyalty — a radical demand in a clan-based society where family was everything.',
    'The epistemological claim of chapter 13 is revolutionary: miracles do not establish truth; covenant faithfulness does. A prophet who does signs but leads away from God is false. Content trumps experience.',
    'The shift from irrigation-dependent Egypt to rain-dependent Canaan is geographic theology. In Egypt, you controlled the water. In Canaan, you pray for it. The land itself teaches dependence on God.',
    'In an age of charismatic leadership and viral influence, the Deuteronomy 13 test is more relevant than ever: does this leader, however impressive, lead you toward or away from the God of the covenant?',
    JSON.stringify(['How do you evaluate spiritual leaders when their results are impressive but their direction seems off?', 'What does it mean to live in a land that requires dependence rather than self-sufficiency?']),
    JSON.stringify([
      { angle: 'When Miracles Lie', target_audience: 'Charismatic and evangelical communities', primary_theme: 'Covenant faithfulness over experiential validation' }
    ]),
    'ai_assisted', null],

  // DEU 14-16 — Community Economics and Festival Calendar
  ['deu-community-economics-festivals', 'Community Economics and the Festival Calendar', 'DEU', 14, 1, 16, 17,
    'These chapters weave together dietary laws, tithing, debt release, slave freedom, and the three pilgrim festivals (Passover, Weeks, Tabernacles). The common thread is community economics shaped by theology. The tithe feeds the Levite, the immigrant, the orphan, and the widow. Every seventh year, debts are released and slaves go free. The festivals are not vacations but mandatory celebrations where the entire community — including the marginalized — rejoices together. Deuteronomy\'s economic vision is radical: generosity is legislated, not optional.',
    'These chapters constitute the economic constitution of ancient Israel. Their vision is striking: a society where generosity is structural, where debt does not become permanent, and where the poor eat at the same table as the prosperous during festivals.',
    'The festivals require the entire household — including servants and immigrants — to celebrate together. The economic hierarchy is temporarily suspended during worship. Joy is a community project, not a private luxury.',
    'The sabbatical debt release and slave emancipation establish the principle that economic relationships must be periodically reset. No debt is meant to be permanent; no servitude is meant to be lifelong. This is a structural challenge to accumulation without limit.',
    'In an agrarian economy without banking or insurance, these laws created a social safety net woven from theological obligation. The tithe was not church fundraising — it was welfare funded by worship.',
    'Imagine if every seven years, all consumer debt was forgiven. Imagine if your workplace was required by law to throw a party where the CEO and the janitor sat at the same table. That is the Deuteronomic vision — unrealized then, unrealized now, but still on the books.',
    JSON.stringify(['What would change if generosity were structural rather than optional?', 'Why does Deuteronomy mandate joy alongside justice?']),
    JSON.stringify([
      { angle: 'The Economy God Had in Mind', target_audience: 'Justice-oriented congregations', primary_theme: 'Economic structures shaped by theology' },
      { angle: 'Mandatory Joy', target_audience: 'Communities that separate worship from social justice', primary_theme: 'Festival celebration as economic inclusion' }
    ]),
    'ai_assisted', null],

  // DEU 17-20 — Institutions of Leadership and Rules for War
  ['deu-leadership-institutions-war', 'Institutions of Leadership and Rules for War', 'DEU', 17, 1, 20, 20,
    'Moses outlines the four offices that will govern Israel: judges (ch. 16-17), kings (ch. 17), priests (ch. 18), and prophets (ch. 18). Then chapters 19-20 address criminal justice (cities of refuge, witness requirements) and rules of warfare. The king is especially constrained: he must not multiply horses, wives, or gold, and he must write a personal copy of the law and read it daily. This is the most limited monarchy in the ancient world — a king under Torah, not above it.',
    'The institutional blueprint establishes separation of powers millennia before Montesquieu. No single office holds all authority. The king is accountable to the law, the prophet speaks for God, the priest mediates worship, and judges adjudicate disputes.',
    'The prophet is described as one "like Moses" whom God will raise up — a mediator between the people\'s fear of God\'s direct voice and God\'s desire to communicate. Prophetic authority is derivative, not autonomous.',
    'The requirement for two or three witnesses in capital cases (19:15) establishes a procedural protection against false accusation that becomes foundational in both Jewish and Christian legal tradition.',
    'The warfare rules include exemptions for the newly married, new homeowners, and the fearful — a remarkably humane military code that prioritizes household stability over military manpower.',
    'A leader who must read the law daily, who cannot accumulate excessive wealth or military power, who is accountable to prophets and judges — this is the constitutional ideal. Every leadership crisis in the rest of the Old Testament happens when these limits are ignored.',
    JSON.stringify(['What happens when leaders are not accountable to anything larger than themselves?', 'Why does Deuteronomy limit the king\'s wealth and military power?']),
    JSON.stringify([
      { angle: 'The King Who Reads', target_audience: 'Leaders and executives', primary_theme: 'Power constrained by accountability' },
      { angle: 'Rules of Engagement', target_audience: 'Military families and ethicists', primary_theme: 'Humane limits on violence' }
    ]),
    'ai_assisted', null],

  // DEU 21-25 — Social Laws: Justice in Daily Life
  ['deu-social-laws-daily-life', 'Deuteronomic Social Laws', 'DEU', 21, 1, 25, 19,
    'This dense block of legislation covers unsolved murders, treatment of captive women, inheritance rights of the firstborn regardless of favoritism, rebellious sons, dignified burial, lost property, cross-dressing prohibitions, bird-nest conservation, building codes (rooftop parapets), agricultural mixing prohibitions, marriage disputes, sexual offenses, exclusion from the assembly, camp hygiene, escaped slaves, interest-free loans to fellow Israelites, divorce and remarriage, kidnapping, wages paid daily, gleaning rights, and honest weights and measures. The range is staggering — from construction safety to ecological sensitivity. The common thread: every area of life is subject to divine concern.',
    'These chapters demolish the modern distinction between sacred and secular. Building codes, environmental regulations, labor law, and sexual ethics all fall under the same divine authority. God legislates rooftop parapets because human safety is sacred.',
    'The escaped-slave provision (23:15-16) is remarkable: a fugitive slave is not to be returned but welcomed. In the ancient world, this was unheard of. The daily-wage law protects the laborer who lives hand to mouth.',
    'The levirate marriage law (25:5-10) preserves the name and inheritance of a dead man through his brother — community continuity matters more than individual convenience. The gleaning laws (24:19-22) institutionalize generosity for the poor.',
    'These laws envision a settled agricultural society with houses, fields, and vineyards — the life Israel is about to enter in Canaan. The regulations presuppose permanence after forty years of nomadic existence.',
    'Rooftop parapets, daily wages, conservation of bird nests, honest weights at the market — this is God caring about building codes and labor law. If your faith does not touch your business practices and your treatment of workers, Deuteronomy 21-25 would like a word.',
    JSON.stringify(['If every area of life is subject to divine concern, what areas have you treated as "secular"?', 'What modern equivalents exist for gleaning laws and daily-wage provisions?']),
    JSON.stringify([
      { angle: 'God Cares About Building Codes', target_audience: 'Business owners and professionals', primary_theme: 'No sacred-secular divide' },
      { angle: 'Gleaning Laws for a Gig Economy', target_audience: 'Social justice advocates', primary_theme: 'Structural provision for the vulnerable' }
    ]),
    'ai_assisted', null],

  // DEU 26 — Firstfruits Confession and Covenant Commitment
  ['deu-firstfruits-confession', 'The Firstfruits Confession', 'DEU', 26, 1, 26, 19,
    'The Deuteronomic law code culminates in a liturgical act: when Israel brings its first harvest in Canaan, each farmer must recite a creed — "A wandering Aramean was my father" — summarizing the entire salvation history from Jacob through Egypt to the promised land. Then the tithe is given to the Levite, immigrant, orphan, and widow. The chapter closes with a mutual commitment: God declares Israel as his treasured possession, and Israel declares the Lord as its God. This is covenant at its most intimate — two parties choosing each other.',
    'The firstfruits confession (26:5-10) is one of the oldest credal statements in the Bible. It grounds every act of worship in historical memory. You do not just give your harvest; you tell the story of why you have a harvest at all.',
    'The mutual declaration — God claims Israel, Israel claims God — transforms covenant from legal contract to relational commitment. Both parties are on record.',
    'The requirement to recite salvation history while giving the tithe links memory, gratitude, and generosity into a single act. You give because you remember; you remember because you tell the story aloud.',
    'The firstfruits ceremony presupposes the settled agricultural life that Israel has not yet entered — Moses is legislating for a future they can only imagine, creating rituals for a life they have not lived.',
    'What if every paycheck came with a requirement to pause and say: "I was nothing. I was lost. I was rescued. And now I have this." What would that do to your relationship with money?',
    JSON.stringify(['When you give, do you connect it to a larger story of what God has done?', 'What would it mean to practice a "firstfruits confession" with your own family history?']),
    JSON.stringify([
      { angle: 'A Wandering Aramean Was My Father', target_audience: 'Immigrants and first-generation believers', primary_theme: 'Worship rooted in salvation history' }
    ]),
    'ai_assisted', null],

  // DEU 29 — The Covenant at Moab
  ['deu-covenant-at-moab', 'The Covenant Renewed at Moab', 'DEU', 29, 1, 29, 29,
    'Moses gathers all Israel — leaders, elders, women, children, and even the foreigners who chop wood and carry water — to renew the covenant on the plains of Moab. This is a separate covenant from Sinai, made with the generation that will actually enter the land. Moses includes those not yet born: "not with you alone do I make this covenant, but with whoever is not here today." The chapter ends with a famous declaration: "The secret things belong to the LORD our God, but the things that are revealed belong to us and to our children forever."',
    'The Moab covenant extends the covenant community across time — binding not just the present generation but all future ones. This is the theological foundation for covenant identity as something you are born into, not just something you choose.',
    'The inclusion of wood-choppers and water-carriers alongside leaders ensures that no one is too marginal for covenant. Social hierarchy does not determine covenantal standing.',
    'The closing verse (29:29) establishes an epistemological boundary: there are things God has not revealed, and Israel must live within what has been given. Theological humility is built into the covenant structure.',
    'The plains of Moab — visible from the promised land but not yet in it — create a setting of threshold. The covenant is made at the edge, not in the center, of promise.',
    'Making a commitment that binds people not yet born — that is what parents do at a baptism, what founders do when they write a constitution, what communities do when they plant trees they will not live to see shade from. Moses is thinking in generations, not years.',
    JSON.stringify(['What commitments have you inherited from people who made them before you were born?', 'How do you live faithfully within the limits of what has been revealed?']),
    JSON.stringify([
      { angle: 'A Covenant for People Not Yet Born', target_audience: 'Parents and legacy builders', primary_theme: 'Intergenerational faithfulness' },
      { angle: 'The Secret Things', target_audience: 'Those anxious about unanswered questions', primary_theme: 'Living within revealed limits' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // JOSHUA
  // ============================================================

  // JOS 8 — Conquest of Ai and Covenant Renewal at Ebal
  ['jos-conquest-of-ai', 'The Conquest of Ai and Renewal at Mount Ebal', 'JOS', 8, 1, 8, 35,
    'After Achan\'s sin is purged, God gives Israel a second chance at Ai. This time the strategy involves an ambush — God directs the tactics and Israel obeys. The city falls. Then Joshua does something unexpected: he pauses the military campaign to build an altar on Mount Ebal and read the entire law of Moses to the assembled nation, including women, children, and foreigners. Conquest stops for worship. The priorities are clear.',
    'The juxtaposition of military victory and covenant renewal establishes that conquest without covenant is meaningless. Israel fights for the land, but the land is given for a purpose — and that purpose is embodied in the law read aloud at Ebal.',
    'Joshua\'s decision to halt the campaign for a worship service speaks to his priorities. Military momentum could have been maintained, but Joshua understood that the army\'s identity matters more than the army\'s schedule.',
    'The public reading of the law — every word, to everyone — makes Torah the foundation of life in the land. What Israel has fought for must be governed by what God has said.',
    'Mount Ebal and Mount Gerizim face each other across a narrow valley in the central highlands — a natural amphitheater. The geography itself becomes a stage for covenant proclamation.',
    'Imagine a company that wins a major contract and, before celebrating, gathers the whole team to re-read the mission statement. That is what Joshua does at Ebal — victory is not the goal; fidelity to purpose is.',
    JSON.stringify(['When have you needed to pause in the middle of progress to remember why you started?', 'Why does obedience precede the second attempt at Ai?']),
    JSON.stringify([
      { angle: 'Pausing Victory for Worship', target_audience: 'Achievement-driven leaders', primary_theme: 'Mission over momentum' }
    ]),
    'ai_assisted', null],

  // JOS 11 — Northern Campaign
  ['jos-northern-campaign', 'The Northern Campaign', 'JOS', 11, 1, 11, 23,
    'A massive coalition of northern kings gathers against Israel at the Waters of Merom. God tells Joshua not to be afraid and to hamstring their horses and burn their chariots. Joshua obeys, and the northern cities fall. The chapter summarizes: "Joshua took the whole land, just as the LORD had directed Moses." The conquest is comprehensive but not instant — "Joshua made war a long time with all those kings."',
    'The summary statement confirms that God\'s territorial promises to Moses have been fulfilled. The long duration of the war ("a long time") tempers triumphalism — faithfulness is not always swift.',
    'Joshua hamstrings horses and burns chariots as commanded, refusing to stockpile military technology. Trusting God for future battles means destroying the tools that would enable self-reliance.',
    'The hardening of the northern kings\' hearts (11:20) parallels Pharaoh\'s hardening in Exodus, linking the conquest to the exodus as acts of the same divine sovereignty.',
    'The northern campaign covered vast terrain from the Galilee to the Hermon range. The coalition\'s military superiority (horses and chariots) made Israel\'s victory a clear demonstration of divine intervention.',
    'Destroying your own captured advantage — burning the chariots instead of keeping them — is counterintuitive to every strategic instinct. But the principle is clear: if the tool replaces trust, the tool must go.',
    JSON.stringify(['What "chariots" do you cling to instead of trusting God?', 'What does it mean that faithfulness sometimes takes "a long time"?']),
    JSON.stringify([
      { angle: 'Burn the Chariots', target_audience: 'Planners and strategists', primary_theme: 'Trusting God over accumulated resources' }
    ]),
    'ai_assisted', null],

  // JOS 12 — List of Defeated Kings
  ['jos-defeated-kings', 'The Defeated Kings', 'JOS', 12, 1, 12, 24,
    'Thirty-one defeated kings are catalogued in a single list — two from the Transjordan under Moses, and twenty-nine from Canaan under Joshua. The chapter is a military roll call, a tally of completed promises. Each name represents a city that once had a king, an army, and walls. Now each has only a line in Israel\'s victory ledger.',
    'The list functions as a receipt for God\'s promises. Each king\'s defeat corresponds to a territorial commitment made to Abraham, Moses, or Joshua. The promises were not vague — they were specific, mappable, and verifiable.',
    'The list includes kings from the Jordan Valley to the coast, from the Negev to the north. Every region is represented, showing that no area was outside God\'s reach.',
    'The defeated-kings list as a literary form emphasizes completeness. Thirty-one kings is a large number for a small geographic area, indicating dense political fragmentation — many small city-states, each with its own ruler.',
    'The political landscape of Canaan was a patchwork of independent city-states, each controlling a small territory. Israel\'s task was to replace this fragmentation with unified covenant governance.',
    'A list of completed tasks does not make exciting reading, but anyone who has ever checked thirty-one items off a to-do list knows the satisfaction. This chapter is the Bible\'s "done" list.',
    JSON.stringify(['What "kings" in your life has God already defeated that you have forgotten to count?']),
    JSON.stringify([
      { angle: 'The Done List', target_audience: 'People who forget past victories during current struggles', primary_theme: 'Cataloguing God\'s faithfulness' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 1 SAMUEL
  // ============================================================

  // 1SA 11 — Saul Rescues Jabesh-Gilead
  ['1sa-saul-rescues-jabesh-gilead', 'Saul Rescues Jabesh-Gilead', '1SA', 11, 1, 11, 15,
    'The Ammonite king Nahash besieges Jabesh-Gilead and offers humiliating terms: gouge out every right eye as a condition of peace. When the news reaches Saul, the Spirit of God comes upon him and he cuts a pair of oxen into pieces, sending them throughout Israel as a summons to war. The response is overwhelming. Israel rallies, Jabesh-Gilead is saved, and Saul\'s kingship is confirmed at Gilgal. This is Saul at his best — Spirit-empowered, decisive, and merciful (he refuses to execute those who had doubted him).',
    'This is the golden moment of Saul\'s reign, the evidence that the Spirit-anointed king could deliver Israel. Everything that follows will be measured against this high point, making the eventual decline all the more tragic.',
    'Saul\'s mercy toward his critics (11:13) reveals the king he could have been — secure enough in God\'s vindication to forego personal revenge. This generosity will not last.',
    'The Spirit\'s empowerment of Saul mirrors the judges\' pattern, connecting the new institution (kingship) to the older one. But judges were temporary; kings are permanent. The stakes of Spirit-departure are now much higher.',
    'Jabesh-Gilead was an isolated Transjordan town with limited defensive capacity. Its rescue by a unified Israelite army demonstrates what the monarchy was supposed to provide: coordinated national defense.',
    'There is a moment in every leader\'s tenure that defines the potential — the rescue, the breakthrough, the decisive act that proves what they are capable of. Saul\'s tragedy is that this moment was the peak, not the beginning.',
    JSON.stringify(['When was your finest hour, and how did it shape what came next?', 'What does it look like to be merciful toward people who doubted you?']),
    JSON.stringify([
      { angle: 'The Peak That Became the Benchmark', target_audience: 'Leaders reflecting on early success', primary_theme: 'What we do with our best moments' }
    ]),
    'ai_assisted', null],

  // 1SA 12 — Samuel's Farewell Address
  ['1sa-samuels-farewell', 'Samuel\'s Farewell Address', '1SA', 12, 1, 12, 25,
    'Samuel, now aged, stands before Israel and makes his case: he has led with integrity, taken no bribes, oppressed no one. He challenges anyone to contradict him, and no one can. Then he recounts God\'s faithfulness from Egypt to the present, warns about the dangers of kingship, and calls down thunder and rain during wheat harvest as a sign. The people are terrified. Samuel\'s final word: "Only fear the LORD and serve him faithfully. But if you still do wickedly, you and your king shall be swept away."',
    'Samuel\'s farewell establishes the prophetic role as the king\'s conscience. Even as the monarchy begins, the prophet reserves the right to hold the king accountable. This tension between prophet and king will define Israelite political history.',
    'The relationship between Samuel and Israel is that of a parent releasing an adult child into a marriage of their own choosing. Samuel did not want them to have a king. But he will not stop praying for them or teaching them.',
    'Samuel\'s self-defense — "whose ox have I taken?" — establishes the standard for public leadership: measurable integrity, verifiable by the people you served.',
    'Thunder during wheat harvest (dry season) would have been meteorologically extraordinary in ancient Palestine, making it an unmistakable sign of divine authority behind Samuel\'s words.',
    'The outgoing leader who has served with integrity, who releases power while speaking hard truth — this is the model for every transition. Samuel does not sabotage the new regime; he blesses it while warning it.',
    JSON.stringify(['Could you stand before the people you have led and invite them to name your failures?', 'How does a leader release authority without abandoning responsibility?']),
    JSON.stringify([
      { angle: 'The Exit Interview of a Faithful Leader', target_audience: 'Leaders in transition', primary_theme: 'Integrity as legacy' }
    ]),
    'ai_assisted', null],

  // 1SA 21-22 — David at Nob and the Cave of Adullam
  ['1sa-david-at-nob-adullam', 'David at Nob and the Cave of Adullam', '1SA', 21, 1, 22, 23,
    'Fleeing Saul, David comes to the priest Ahimelech at Nob, lies about his mission, eats the holy bread, and takes Goliath\'s sword. He then feigns madness before the Philistine king of Gath. When Saul learns that Ahimelech helped David, he orders the massacre of the entire priestly city — eighty-five priests killed by Doeg the Edomite. Only Abiathar escapes and joins David. Meanwhile, David gathers a band of debtors, outcasts, and the discontented in the cave of Adullam.',
    'The Nob massacre reveals the full horror of Saul\'s descent: a king who kills his own priests. David\'s guilt in triggering the massacre (his lie to Ahimelech) shows that even the anointed future king makes choices with devastating consequences.',
    'David\'s admission to Abiathar — "I am responsible for the death of your father\'s whole family" — is a rare moment of ownership. The relationship between David and Abiathar will carry the weight of this shared trauma for decades.',
    'The Adullam gathering — everyone in distress, everyone in debt, everyone discontented — is the origin story of David\'s kingdom. The future king of Israel starts with the people no one else wants. This is a recurring biblical pattern.',
    'Nob was a priestly town near Jerusalem. Its destruction by Saul\'s order essentially eliminates the Elide priestly line, fulfilling the prophecy against Eli\'s house from 1 Samuel 2-3.',
    'The people who gathered at Adullam — the indebted, the distressed, the bitter — are the people who always gather around someone who offers an alternative to the current regime. Every movement starts in a cave with people who have nothing to lose.',
    JSON.stringify(['When has your deception or poor judgment caused harm to innocent people?', 'Why does God build futures from caves full of outcasts?']),
    JSON.stringify([
      { angle: 'The Cave Where Movements Begin', target_audience: 'People starting from scratch', primary_theme: 'God builds from the margins' },
      { angle: 'When Your Lie Gets Someone Killed', target_audience: 'Leaders grappling with unintended consequences', primary_theme: 'Owning the collateral damage of deception' }
    ]),
    'ai_assisted', null],

  // 1SA 23 — David Saves Keilah, Saul Hunts David
  ['1sa-david-saves-keilah', 'David Saves Keilah', '1SA', 23, 1, 23, 29,
    'David rescues the town of Keilah from the Philistines, then asks God whether the town will hand him over to Saul. God says yes — the people David just saved will betray him. David flees to the wilderness of Ziph, where Jonathan comes for a secret visit and "strengthened his hand in God." Meanwhile, Saul closes in, and only a Philistine raid distracts him at the last moment.',
    'The Keilah episode demonstrates that doing the right thing does not guarantee loyalty. The people David saved would have surrendered him. The wilderness becomes David\'s seminary — where he learns to depend on God alone.',
    'Jonathan\'s visit to David in the wilderness is their last recorded meeting. His words — "you will be king over Israel, and I shall be next to you" — are stunning in their selflessness. The crown prince voluntarily subordinates himself to the fugitive.',
    'David\'s use of the ephod to inquire of God before each decision establishes a pattern of divine consultation that contrasts sharply with Saul\'s increasingly desperate methods.',
    'The wilderness of Ziph and the hill country of southern Judah provided natural hiding places — caves, ravines, and sparse vegetation. David\'s familiarity with this terrain from his shepherding years gave him a survival advantage.',
    'The friend who shows up when everything is falling apart and says "I believe in you" — that is Jonathan at Ziph. Some friendships exist for exactly that purpose.',
    JSON.stringify(['Have you ever done the right thing and been betrayed by the people you helped?', 'Who has been your Jonathan — the person who strengthened your hand in God?']),
    JSON.stringify([
      { angle: 'The Friend Who Shows Up', target_audience: 'People in crisis', primary_theme: 'Covenant friendship in dark seasons' }
    ]),
    'ai_assisted', null],

  // 1SA 27, 29, 30 — David Among the Philistines
  ['1sa-david-among-philistines', 'David Among the Philistines', '1SA', 27, 1, 30, 31,
    'Exhausted from running, David defects to the Philistines and is given the town of Ziklag by King Achish. For sixteen months, he raids non-Israelite settlements while telling Achish he is raiding Judah — a double game of survival. When the Philistines march against Israel, the other Philistine commanders refuse to let David fight alongside them (ch. 29). David returns to find Ziklag burned by Amalekites and his people taken captive. His own men talk of stoning him. David "strengthened himself in the LORD his God," pursues the Amalekites, and recovers everything.',
    'The Ziklag period is David\'s moral low point — living as a Philistine vassal, deceiving his host, and raiding villages while lying about his targets. Yet God providentially prevents him from fighting Israel and restores everything the Amalekites took.',
    'David\'s men threaten to stone him at Ziklag — the people he has led and provided for turn on him in a moment of crisis. Leadership credibility can evaporate instantly under extreme pressure.',
    'The phrase "David strengthened himself in the LORD his God" (30:6) is the theological center of the entire fugitive narrative. At rock bottom — betrayed, bereaved, threatened by his own men — David turns inward to God. This is the moment that separates David from Saul.',
    'Ziklag sat in the border zone between Philistia and Judah, making it ideal for David\'s double game. The Negev raids targeted Amalekite and Geshurite settlements, not Israelite ones, preserving David\'s future claim on Judah\'s loyalty.',
    'There is a season in some lives when every option looks compromised — when you are lying to survive, serving people you do not respect, and wondering if God has forgotten the promise. Ziklag is that season. And the only way through is David\'s way: strengthen yourself in the Lord.',
    JSON.stringify(['When have you compromised your values to survive, and how did you find your way back?', 'What does it look like to strengthen yourself in God when your own people turn on you?']),
    JSON.stringify([
      { angle: 'Rock Bottom and the Turn Inward', target_audience: 'Leaders at their lowest point', primary_theme: 'Self-strengthening in God when all human support fails' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 2 SAMUEL
  // ============================================================

  // 2SA 8, 10 — David's Military Victories
  ['2sa-davids-military-victories', 'David\'s Military Victories', '2SA', 8, 1, 10, 19,
    'David defeats the Philistines, the Moabites, the Arameans, the Edomites, and the Ammonites, establishing Israel as the dominant regional power. His administration is detailed: generals, scribes, priests, and officials. The expansion is dramatic — from a fugitive in a cave to a king whose empire stretches from Egypt to the Euphrates. Chapter 10 records the Ammonite insult to David\'s ambassadors and the resulting war that sets the stage for the Bathsheba affair (the army is at Rabbah while David stays in Jerusalem).',
    'These chapters present David\'s kingdom at its zenith — the fulfillment of the Abrahamic land promises at their maximum extent. The administrative list shows a functioning state emerging from tribal confederacy.',
    'David dedicates the war spoils to the Lord — a pattern of returning victory\'s proceeds to God that contrasts sharply with Saul\'s failure to do the same. The Ammonite humiliation of David\'s ambassadors (shaving half their beards, cutting their garments) was a calculated diplomatic insult.',
    'The territorial expansion fulfills the broadest reading of the Abrahamic land promise. David\'s kingdom becomes the template against which every subsequent king is measured.',
    'The geopolitical vacuum created by the temporary weakness of Egypt and Assyria allowed a small Levantine state to achieve regional dominance — a window that would close within a few generations.',
    'Success can be the most dangerous season of all — when everything is working, the temptation to stay home while others do the hard work grows quietly. Chapter 10 ends with the army at war, setting the stage for chapter 11\'s catastrophe.',
    JSON.stringify(['How do you handle seasons of success without losing vigilance?', 'What does it look like to dedicate the spoils of your success to God?']),
    JSON.stringify([
      { angle: 'The Danger of Peak Season', target_audience: 'Successful leaders and entrepreneurs', primary_theme: 'Vigilance during abundance' }
    ]),
    'ai_assisted', null],

  // 2SA 20 — Sheba's Revolt
  ['2sa-shebas-revolt', 'Sheba\'s Revolt', '2SA', 20, 1, 20, 26,
    'No sooner has Absalom\'s rebellion ended than Sheba ben Bichri, a Benjaminite, rallies the northern tribes against David with the cry: "We have no share in David!" The kingdom fractures along the old tribal fault line — Judah versus the rest. Joab pursues Sheba to Abel Beth-Maacah, where a "wise woman" negotiates a solution: the town delivers Sheba\'s head over the wall, and the siege ends. David\'s kingdom is held together by Joab\'s ruthlessness and a nameless woman\'s diplomacy.',
    'Sheba\'s revolt reveals that Absalom\'s rebellion was a symptom, not the disease. The tribal fracture between Judah and the northern tribes will eventually split the kingdom permanently under Rehoboam.',
    'The wise woman of Abel is one of the Bible\'s unnamed heroes — she negotiates between a besieging army and a doomed town, saving lives through quick thinking and rhetorical skill. Her question to Joab — "Why should you swallow up the LORD\'s inheritance?" — reframes military action as theological destruction.',
    'The "no share in David" cry anticipates the exact language of the northern secession in 1 Kings 12. The political unity of Israel was always fragile, held together by David\'s charisma more than structural loyalty.',
    'Abel Beth-Maacah was a border town in the far north, near the territories of Aram. Sheba\'s flight to the periphery of Israel reflects the centrifugal forces pulling the kingdom apart.',
    'Every organization has its version of "we have no share in David" — the moment when a faction decides the leader does not represent them. The response defines whether the institution survives: violence, negotiation, or schism.',
    JSON.stringify(['What fault lines exist in your community that could split it under pressure?', 'When has an unnamed person\'s wisdom saved a situation that power could not?']),
    JSON.stringify([
      { angle: 'The Unnamed Diplomat', target_audience: 'Behind-the-scenes leaders and mediators', primary_theme: 'Wisdom that averts catastrophe' }
    ]),
    'ai_assisted', null],

  // 2SA 22-23 — David's Song and Last Words
  ['2sa-davids-song-last-words', 'David\'s Song and Last Words', '2SA', 22, 1, 23, 39,
    'David\'s psalm of deliverance (nearly identical to Psalm 18) celebrates God as rock, fortress, and deliverer, recounting divine intervention in cosmic imagery — earthquake, smoke, and thunder. Chapter 23 records David\'s "last words" — a brief oracle about the ideal ruler — followed by the roll call of his mighty warriors and their exploits: Adino who killed 800 in one encounter, Eleazar who fought until his hand froze to his sword, Benaiah who killed a lion in a pit on a snowy day.',
    'David\'s song places his entire military career within the framework of divine deliverance — not personal prowess but God\'s intervention. The mighty-warrior roll call honors the people whose courage made the kingdom possible.',
    'The warriors\' stories are told with affection and specificity. Three men broke through Philistine lines to bring David water from Bethlehem\'s well — and David poured it out as an offering, valuing their devotion too highly to drink it for himself.',
    'David\'s "last words" describe the ideal king as one who rules in the fear of God, like the sun shining on a morning without clouds. This becomes the standard against which all future kings are judged — including David himself.',
    'The mighty warriors represent the Adullam cave generation — debtors and outcasts who became elite soldiers. Their exploits span decades of warfare across Israel\'s borders.',
    'The water-from-Bethlehem incident is one of the most beautiful leadership moments in Scripture: soldiers risk their lives for their commander\'s offhand wish, and the commander honors their sacrifice by refusing to consume it selfishly.',
    JSON.stringify(['Who are the "mighty warriors" whose contributions made your life possible?', 'When has someone\'s sacrifice been too precious for you to take for granted?']),
    JSON.stringify([
      { angle: 'The Water He Would Not Drink', target_audience: 'Leaders and team builders', primary_theme: 'Honoring sacrifice by refusing to trivialize it' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 1 KINGS
  // ============================================================

  // 1KI 1-2 — Solomon Secures the Throne
  ['1ki-solomon-secures-throne', 'Solomon Secures the Throne', '1KI', 1, 1, 2, 46,
    'David is old and failing. Adonijah, the presumptive heir, makes his move — chariots, runners, a coronation feast. But Nathan the prophet and Bathsheba outmaneuver him, reminding David of his promise to Solomon. David orders Solomon anointed at Gihon, and the sound of celebration reaches Adonijah\'s feast. His guests scatter. In chapter 2, dying David gives Solomon final instructions: be strong, keep God\'s law — and settle old scores. Joab, Shimei, and Adonijah are all eliminated. The transition is complete and bloody.',
    'The succession narrative is astonishingly honest: Israel\'s golden age begins with palace intrigue, a senile king, competing factions, and political executions. God\'s purposes advance through a thoroughly messy political process.',
    'Bathsheba\'s role as political operator is remarkable. The woman who was once taken by David\'s power now wields enough influence to determine the succession. Her journey from victim to queen mother is one of the most dramatic arcs in the Bible.',
    'David\'s deathbed instructions mix genuine piety ("walk in his ways, keep his statutes") with political calculus ("deal with Joab, deal with Shimei"). The text does not resolve the tension — it presents it.',
    'The Gihon Spring was Jerusalem\'s water source, located on the eastern slope. Anointing Solomon there, within earshot of Adonijah\'s feast, was a calculated power move.',
    'Every leadership transition involves some combination of noble ideals and raw politics. These chapters refuse to pretend otherwise. The question is not whether the process is clean but whether the outcome serves God\'s purposes.',
    JSON.stringify(['How do you navigate leadership transitions where the process is messy but the stakes are real?', 'Can God work through political maneuvering?']),
    JSON.stringify([
      { angle: 'The Messy Transfer of Power', target_audience: 'Leaders navigating succession', primary_theme: 'Providence in imperfect political processes' }
    ]),
    'ai_assisted', null],

  // 1KI 4 — Solomon's Administration
  ['1ki-solomons-administration', 'Solomon\'s Administration and Wisdom', '1KI', 4, 1, 4, 34,
    'Solomon\'s twelve district governors are listed, each responsible for provisioning the royal household for one month. His daily provision is staggering: thirty cors of fine flour, sixty cors of meal, ten fat oxen, twenty pasture-fed cattle, a hundred sheep, plus deer and fowl. His wisdom surpasses all the wise men of the East, and he composes 3,000 proverbs and 1,005 songs. Nations send delegations to hear him. This is the golden age — a kingdom at peace, where "Judah and Israel were as many as the sand by the sea."',
    'Chapter 4 presents the apex of the Solomonic era — administrative sophistication, international reputation, economic abundance, and intellectual achievement. It is the fulfillment of every promise and the setup for every failure.',
    'The twelve-district system reorganizes Israel along administrative rather than tribal lines — an efficiency that also erodes traditional tribal identity. Solomon\'s wisdom draws international visitors, but his bureaucracy creates the tax burden that will split the kingdom.',
    'The description of Solomon\'s wisdom as encompassing botany, zoology, and literature (4:33) presents wisdom as comprehensive knowledge of the created order, not just spiritual insight.',
    'The daily provision for Solomon\'s court represents the output of a complex agrarian economy. The administrative districts ensured systematic collection, but the burden fell on working farmers.',
    'Peak performance metrics do not tell the whole story. The same administration that made Solomon the wisest and wealthiest king was building resentment in every district. Numbers can look great while the foundation is cracking.',
    JSON.stringify(['When has success on paper masked growing problems underneath?', 'What is the difference between wisdom and administrative efficiency?']),
    JSON.stringify([
      { angle: 'The Spreadsheet and the Soul', target_audience: 'Administrators and managers', primary_theme: 'Success metrics versus true health' }
    ]),
    'ai_assisted', null],

  // 1KI 9 — God's Second Appearance and Solomon's Projects
  ['1ki-gods-second-warning', 'God\'s Second Appearance and Solomon\'s Projects', '1KI', 9, 1, 9, 28,
    'After the temple is completed, God appears to Solomon a second time — not to celebrate but to warn. If Solomon turns away, God will cut off Israel and make the temple "a heap of ruins." The rest of the chapter catalogs Solomon\'s building projects, his use of forced labor, and his alliance with Hiram of Tyre. The juxtaposition is deliberate: divine warning followed by imperial expansion. The seeds of the decline described in chapter 11 are already being planted.',
    'God\'s second appearance is conditional where the first (1 Kings 3) was generous. The shift from promise to warning marks the beginning of accountability for the golden age.',
    'The use of forced labor (corvée) on non-Israelite populations echoes Egypt. The irony is unmistakable: the nation born from slavery is building its empire on the labor of others.',
    'The conditional covenant — "if you turn aside... I will cut off Israel" — establishes that even the temple is not unconditionally protected. No institution is so sacred that unfaithfulness cannot destroy it.',
    'Solomon\'s building projects — the temple, his palace, Millo, Hazor, Megiddo, Gezer — reflect the infrastructure of a regional power. The scope is impressive; the human cost is implied.',
    'The most successful season is often the moment God says: "Remember the conditions." Growth without accountability is empire-building without covenant. It always ends badly.',
    JSON.stringify(['What warnings have you received during your most successful seasons?', 'How do you prevent success from becoming the foundation of unfaithfulness?']),
    JSON.stringify([
      { angle: 'The Warning at the Peak', target_audience: 'Organizations and leaders at their zenith', primary_theme: 'Accountability during abundance' }
    ]),
    'ai_assisted', null],

  // 1KI 14-16 — The Early Divided Kingdom
  ['1ki-early-divided-kingdom', 'The Early Divided Kingdom', '1KI', 14, 1, 16, 34,
    'These chapters cover the rapid decline of both kingdoms after the split. In Judah: Rehoboam allows pagan worship, Shishak of Egypt invades, and subsequent kings maintain the pattern. In Israel: Jeroboam\'s dynasty ends in assassination. Baasha seizes the throne, rules badly, and his son Elah is murdered by Zimri, who reigns seven days before Omri takes over by military force. Omri builds Samaria and is succeeded by Ahab, "who did more evil than all who were before him." The pace of succession is dizzying, the pattern relentless: each king is measured against David and found wanting.',
    'The rapid succession of northern kings demonstrates the instability of a monarchy built on Jeroboam\'s golden calves. Without a covenant foundation, power is seized and lost by violence.',
    'The Deuteronomic formula — "he did what was evil in the sight of the LORD" — is applied like a stamp to king after king. The theological evaluation is identical because the theological failure is identical: idolatry.',
    'The measuring rod is always David. Not sinless David, but covenant-faithful David. The standard is not perfection but orientation — did the king\'s heart belong to God?',
    'The Egyptian invasion under Shishak (Pharaoh Shoshenq I, ca. 925 BC) is confirmed by archaeological evidence, including Shishak\'s own inscription at Karnak. The divided kingdom immediately attracted external predators.',
    'Three chapters, seven kings, two assassinations, a seven-day reign, and one foreign invasion. This is what political instability looks like when the center does not hold. The pattern is depressingly familiar across human history.',
    JSON.stringify(['What happens to institutions that measure leaders by power rather than faithfulness?', 'Why is the evaluation always the same — "evil in the sight of the LORD"?']),
    JSON.stringify([
      { angle: 'When the Center Does Not Hold', target_audience: 'Communities navigating institutional instability', primary_theme: 'Covenant loss and political collapse' }
    ]),
    'ai_assisted', null],

  // 1KI 20 — Ahab and Ben-Hadad
  ['1ki-ahab-and-ben-hadad', 'Ahab and Ben-Hadad', '1KI', 20, 1, 20, 43,
    'Ben-Hadad of Aram besieges Samaria with impossible demands. A prophet assures Ahab that God will give victory — not because Ahab deserves it, but "so that you may know that I am the LORD." Israel wins twice, and Ben-Hadad begs for mercy. Ahab makes a treaty with him instead of executing the herem judgment. A prophet condemns the decision: "Your life shall go for his life." Ahab returns home sullen and angry — a preview of the Naboth episode that follows.',
    'God fights for Ahab not because of Ahab\'s merit but for the sake of divine self-revelation. Even the worst king of Israel receives grace — which makes his squandering of it all the more tragic.',
    'Ahab\'s decision to treaty with Ben-Hadad rather than execute God\'s judgment reflects his pattern of half-obedience. He will take the victory but refuse the uncomfortable part of the instruction.',
    'The "so that you may know I am the LORD" formula connects this narrative to the Exodus plagues — God is still in the business of making himself known through military events.',
    'The Aramean threat from Damascus was the dominant geopolitical challenge for the northern kingdom. The two battles described correspond to standard ancient Near Eastern siege warfare and open-field engagement.',
    'Receiving an unexpected victory and then handling the aftermath badly — making the deal that feels diplomatic but ignores the principle — is a pattern visible in every boardroom and political negotiation.',
    JSON.stringify(['When has God given you a victory you did not deserve, and what did you do with it?', 'What does it look like to follow through on difficult instructions, not just the easy parts?']),
    JSON.stringify([
      { angle: 'Grace for the Undeserving', target_audience: 'People who struggle to accept unmerited favor', primary_theme: 'God\'s self-revelation through undeserved victory' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 2 KINGS
  // ============================================================

  // 2KI 1 — Ahaziah and Elijah
  ['2ki-ahaziah-and-elijah', 'Ahaziah Consults Baal-Zebub', '2KI', 1, 1, 1, 18,
    'King Ahaziah of Israel falls through a lattice in his upper chamber and sends messengers to consult Baal-Zebub, the god of Ekron, about his recovery. Elijah intercepts them: "Is it because there is no God in Israel that you are going to inquire of Baal-Zebub?" Ahaziah sends soldiers to arrest Elijah. Two groups of fifty are consumed by fire from heaven. The third captain begs for mercy and is spared. Ahaziah dies as Elijah prophesied — the last king of the Omride dynasty\'s northern branch.',
    'The central question — "Is there no God in Israel?" — defines the theological crisis. The king of God\'s people bypasses God to consult a Philistine deity. Elijah\'s confrontation is about jurisdiction: who has authority over Israel\'s fate?',
    'Elijah\'s relationship with royal power is consistently adversarial. He does not negotiate; he declares. The fire from heaven echoes Carmel and establishes that the prophetic office holds divine lethal authority.',
    'The fire-from-heaven episodes raise difficult questions about divine violence. The narrative presents them as responses to attempts to coerce the prophet — the soldiers were sent to arrest God\'s messenger.',
    'The lattice through which Ahaziah fell was a typical feature of upper rooms in Israelite palaces, designed for ventilation in the Mediterranean climate.',
    'When everything falls apart, who do you call? The first instinct reveals the deepest loyalty. Ahaziah\'s instinct was to call a foreign god. Your crisis-phone-call reveals your operational theology.',
    JSON.stringify(['Who do you instinctively turn to in crisis — and what does that reveal?', 'What does Elijah\'s question mean in a culture with unlimited spiritual options?']),
    JSON.stringify([
      { angle: 'Your Crisis Call Reveals Your God', target_audience: 'People in crisis', primary_theme: 'First instinct as theological indicator' }
    ]),
    'ai_assisted', null],

  // 2KI 3-4 — Elisha's Early Ministry
  ['2ki-elishas-early-ministry', 'Elisha\'s Early Ministry', '2KI', 3, 1, 4, 44,
    'Elisha\'s ministry begins with a series of miracles that echo and expand Elijah\'s: water for a thirsty army (ch. 3), oil multiplied for a widow in debt (4:1-7), a son promised and raised from death for the Shunammite woman (4:8-37), purification of poisoned stew (4:38-41), and multiplication of twenty loaves to feed a hundred men (4:42-44). The pattern is clear: Elisha\'s ministry is directed at ordinary people in ordinary crises — debt, infertility, hunger, death.',
    'Elisha\'s miracles are domestic where Elijah\'s were dramatic. Elijah confronted kings and called down fire; Elisha fills jars of oil and feeds hungry students. The prophetic office serves the nation at every level.',
    'The Shunammite woman is a complex figure — wealthy, hospitable, and fierce. Her confrontation with Elisha after her son\'s death ("Did I ask you for a son?") is raw grief directed at the one who raised her hopes.',
    'The multiplication miracles — oil, bread — anticipate Jesus\' feeding miracles. The prophetic ministry as provider establishes that God\'s concern extends to grocery bills and mortgage payments.',
    'The widow\'s oil crisis reflects the debt economy of the northern kingdom, where creditors could seize children as collateral. Elisha\'s intervention is economic rescue through miraculous means.',
    'A prophet who notices the widow about to lose her children to creditors, who feeds the hungry, who gives a childless woman a son — this is ministry that meets people where they actually live, not where theology says they should be.',
    JSON.stringify(['Where do you see God at work in ordinary, domestic crises?', 'What does it mean that the prophet\'s greatest miracles happen in kitchens and bedrooms?']),
    JSON.stringify([
      { angle: 'Kitchen-Table Miracles', target_audience: 'People in financial or domestic crisis', primary_theme: 'God\'s presence in ordinary need' }
    ]),
    'ai_assisted', null],

  // 2KI 8 — Hazael, Jehoram, and Ahaziah
  ['2ki-hazael-rise-to-power', 'Hazael\'s Rise and the Decline of Judah', '2KI', 8, 1, 8, 29,
    'The Shunammite woman returns from Philistia to reclaim her land. Hazael visits Elisha and receives the terrible prophecy that he will become king of Aram and do great evil to Israel. Elisha weeps. Hazael murders Ben-Hadad and seizes the throne. Meanwhile, Jehoram of Judah marries into Ahab\'s family and walks in the ways of the northern kings, and Ahaziah follows the same path. The Omride corruption has crossed the border into Judah.',
    'Elisha\'s tears over what Hazael will do reveal the prophet\'s humanity — he sees the future and grieves. The Omride marriage alliance infects Judah, demonstrating that compromise with evil does not stay contained.',
    'Elisha weeps because he knows Hazael will burn, kill, and slaughter. The prophet has power to see but not to prevent. This is perhaps the loneliest aspect of prophetic calling.',
    'The cross-border marriage between Judah\'s royals and Ahab\'s house is precisely the kind of alliance Deuteronomy 7 warned against. The theological infection operates exactly as predicted.',
    'Hazael\'s coup in Damascus shifted the regional balance of power. Aram under Hazael became Israel\'s most dangerous enemy, fulfilling Elisha\'s tearful prophecy.',
    'The consequences of bad alliances — personal, institutional, national — always spread further than expected. Judah thought marrying into Israel\'s royal house was diplomatic strategy. It was theological contamination.',
    JSON.stringify(['When has an alliance or compromise you made spread consequences further than expected?', 'What does it mean that the prophet who saw the future wept rather than celebrated his insight?']),
    JSON.stringify([
      { angle: 'The Alliance That Infected Everything', target_audience: 'Leaders evaluating partnerships', primary_theme: 'Compromise as contagion' }
    ]),
    'ai_assisted', null],

  // 2KI 11 — Athaliah and Joash
  ['2ki-athaliah-and-joash', 'Athaliah\'s Coup and Joash\'s Rescue', '2KI', 11, 1, 11, 21,
    'When Ahaziah dies, his mother Athaliah seizes the throne and massacres the royal family — the Davidic line is nearly extinguished. But Jehosheba, the king\'s sister, hides the infant Joash in the temple for six years. The priest Jehoiada orchestrates a coup: Joash is crowned, Athaliah is executed, and the covenant is renewed. The Davidic line survives by a thread — one baby hidden in the house of God.',
    'This is the most dramatic threat to the Davidic covenant in the entire Old Testament. If Joash dies, the line of promise ends. The survival of one infant in a temple storeroom is the hinge on which messianic hope turns.',
    'Jehosheba and Jehoiada are the unlikely heroes — a princess and a priest who risk everything to preserve a dynasty that has been corrupted by the very family Athaliah represents.',
    'The covenant renewal after Athaliah\'s fall explicitly reconnects Judah to its theological identity. The Baal temple is destroyed and the priest of Baal killed. This is reformation as regime change.',
    'Athaliah was a daughter or granddaughter of Omri, making her an Israelite (northern) queen ruling Judah — the culmination of the disastrous marriage alliance. Her six-year reign is the Omride dynasty\'s deepest penetration into Judah.',
    'One person hiding one child from one tyrant — that is how close the story of redemption came to ending. Every time you wonder if one act of courage matters, remember Jehosheba.',
    JSON.stringify(['When has one person\'s quiet courage preserved something that seemed lost?', 'How does the survival of Joash inform your understanding of God\'s protection of his promises?']),
    JSON.stringify([
      { angle: 'The Baby in the Temple', target_audience: 'People questioning whether small acts matter', primary_theme: 'One act of courage as preservation of hope' }
    ]),
    'ai_assisted', null],

  // 2KI 13-14 — Elisha's Death and Northern Kings
  ['2ki-elisha-death-northern-kings', 'Elisha\'s Death and the Northern Kings', '2KI', 13, 1, 14, 29,
    'Elisha, dying, is visited by King Joash of Israel, who weeps over him. Elisha has him shoot an arrow and strike the ground — but Joash strikes only three times, and Elisha is angry: "You should have struck five or six times." Even after death, Elisha\'s bones raise a dead man thrown into his grave. The northern dynasty continues: Jehoahaz under Aramean oppression, Joash recovering cities, Amaziah of Judah foolishly challenging Israel and losing. Jeroboam II expands Israel\'s borders but does evil. The prophets\' message is ignored; the kingdom expands while rotting from within.',
    'Elisha\'s death scene reveals that even God\'s gifts have limits tied to human response. Joash\'s half-hearted striking is a metaphor for the northern kingdom itself — always stopping short of full obedience.',
    'The dead man raised by contact with Elisha\'s bones demonstrates that prophetic power transcends the prophet\'s life. God\'s purposes outlast their human instruments.',
    'Jeroboam II\'s territorial expansion creates an illusion of health. The kingdom\'s borders are at their widest, but Amos and Hosea are already prophesying against the social rot beneath the prosperity.',
    'The Aramean oppression under Hazael and Ben-Hadad III reduced Israel to near-vassalage. The recovery under Joash and Jeroboam II was a temporary reprieve, not a permanent restoration.',
    'A dying mentor, angry that his protege is not giving full effort — that image resonates with anyone who has watched potential squandered. "You should have struck more" is the regret of every teacher who saw what was possible.',
    JSON.stringify(['When have you stopped short of what was possible because of half-hearted effort?', 'How can an organization look successful while rotting from within?']),
    JSON.stringify([
      { angle: 'You Should Have Struck More', target_audience: 'People settling for less than full effort', primary_theme: 'The cost of half-heartedness' }
    ]),
    'ai_assisted', null],

  // 2KI 15-16 — Final Northern Kings and Ahaz
  ['2ki-final-northern-kings-ahaz', 'Final Northern Kings and Ahaz of Judah', '2KI', 15, 1, 16, 20,
    'The northern kingdom disintegrates: six kings in its final decades, most seizing power through assassination. Zechariah, Shallum, Menahem, Pekahiah, Pekah — the names blur together in a cycle of violence. Assyria emerges as the dominant threat; Menahem buys temporary peace with tribute. In Judah, Ahaz faces a coalition of Israel and Aram and, rather than trusting God (as Isaiah urged), appeals to Assyria for help. He then copies a pagan altar from Damascus and installs it in the temple. The king of Judah voluntarily paganizes the house of God.',
    'The rapid northern succession demonstrates the terminal instability of a kingdom without covenant foundation. Ahaz\'s appeal to Assyria, meanwhile, introduces the foreign power that will eventually destroy both kingdoms.',
    'Ahaz\'s decision to replace the temple altar with a Damascus copy is theological treason — the king redesigning God\'s house to match a foreign patron\'s religion. This is compromise elevated to policy.',
    'The contrast between Ahaz and Isaiah (detailed in Isaiah 7) frames the chapter: the prophet offers faith, the king chooses politics. The consequences will unfold for generations.',
    'The Assyrian Empire under Tiglath-Pileser III was aggressively expanding into the Levant. Smaller states had to choose: resist in coalition or submit as vassals. Both options had devastating costs.',
    'When institutions face existential threats, the temptation is to abandon core identity for survival. Ahaz chose political survival at the cost of theological integrity. Organizations face this trade-off constantly.',
    JSON.stringify(['When have you compromised core values for institutional survival?', 'What is the difference between strategic pragmatism and theological betrayal?']),
    JSON.stringify([
      { angle: 'The Altar Import', target_audience: 'Leaders navigating external pressure', primary_theme: 'Identity versus survival' }
    ]),
    'ai_assisted', null],

  // 2KI 21 — Manasseh's Reign
  ['2ki-manassehs-reign', 'The Reign of Manasseh', '2KI', 21, 1, 21, 26,
    'Manasseh reigns fifty-five years — the longest reign in Judah\'s history — and reverses everything his father Hezekiah achieved. He rebuilds the high places, erects altars to Baal, sets up an Asherah pole in the temple, practices sorcery, and "shed very much innocent blood, till he had filled Jerusalem from one end to another." The text blames Manasseh for making the exile inevitable: "Because Manasseh has done these abominations... I will wipe Jerusalem as one wipes a dish."',
    'Manasseh represents the point of no return. Despite Josiah\'s later reforms, the narrator identifies Manasseh\'s reign as the reason God gave Judah over to destruction. Fifty-five years of systematic apostasy outweighs one generation of reform.',
    'The father-son contrast between Hezekiah and Manasseh is devastating. The most faithful king produces the most wicked one. Parental faithfulness does not guarantee generational continuity.',
    'The innocent blood Manasseh shed is never forgotten by the narrator. Even God\'s patience has limits, and systematic injustice — not just idolatry — is cited as the cause of judgment.',
    'Manasseh\'s long reign coincided with Assyria\'s dominance. As an Assyrian vassal, Manasseh likely adopted Assyrian religious practices as part of political submission — syncretism as foreign policy.',
    'Fifty-five years is long enough to normalize anything. An entire generation grew up knowing nothing but Manasseh\'s version of Judah. When corruption becomes the default, reform feels radical rather than restorative.',
    JSON.stringify(['How long does it take for a community to normalize what was once unthinkable?', 'What is the relationship between political accommodation and spiritual compromise?']),
    JSON.stringify([
      { angle: 'When Fifty-Five Years Changes Everything', target_audience: 'Communities in long-term decline', primary_theme: 'The normalizing power of sustained corruption' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 1 CHRONICLES
  // ============================================================

  // 1CH 11-12 — David's Warriors and Supporters
  ['1ch-davids-warriors-supporters', 'David\'s Warriors and Supporters', '1CH', 11, 1, 12, 40,
    'The Chronicler lists David\'s mighty warriors and the tribal leaders who rallied to him — first at the stronghold, then at Ziklag, and finally at Hebron for his coronation. The lists are extensive, naming warriors from every tribe, including Benjaminites (Saul\'s own tribe). The gathering at Hebron is described as a joyful military assembly — "for there was joy in Israel." The Chronicler\'s point: David\'s kingship was not a partisan coup but a national convergence.',
    'The warrior lists legitimize David\'s kingship as a broad-based, multi-tribal consensus. The inclusion of Benjaminite warriors is especially significant — even Saul\'s kinsmen recognized David\'s calling.',
    'The Chronicler transforms the Adullam outcasts of 1-2 Samuel into honored founding members of the kingdom. What began as desperation is reframed as destiny.',
    'The phrase "day by day people came to David to help him, until there was a great army, like an army of God" (12:22) presents the gathering as divinely orchestrated convergence, not political maneuvering.',
    'The tribal delegations at Hebron represent a functioning confederacy choosing a unified monarchy — a transition from decentralized tribal governance to centralized royal authority.',
    'Every institution\'s founding story includes the early supporters who showed up when the outcome was uncertain. These chapters name those people, because showing up early is its own form of courage.',
    JSON.stringify(['Who showed up early when you were just getting started?', 'What does it mean to join something before it is successful?']),
    JSON.stringify([
      { angle: 'The Early Adopters of God\'s Plan', target_audience: 'New ventures and church plants', primary_theme: 'Courage of early commitment' }
    ]),
    'ai_assisted', null],

  // 1CH 18-20 — David's Wars (Chronicles Version)
  ['1ch-davids-wars-chronicles', 'David\'s Wars', '1CH', 18, 1, 20, 8,
    'The Chronicler summarizes David\'s military campaigns — defeating Philistines, Moabites, Arameans, Edomites, and Ammonites. Notably, the Bathsheba affair is entirely omitted. Where 2 Samuel places the Ammonite war as the backdrop for David\'s sin, the Chronicler records only the military victory. David takes the crown from the Ammonite king\'s head, and warriors defeat Philistine giants. The narrative is selective — not dishonest, but purposeful. The Chronicler is writing for returned exiles who need a model, not a scandal.',
    'The Chronicler\'s omission of the Bathsheba narrative is deliberate editorial theology. For the post-exilic community, David is the template for covenant monarchy. The focus is institutional legacy, not personal failure.',
    'The giant-slaying warriors in chapter 20 continue the tradition of David\'s earliest exploit (Goliath). The next generation of warriors inherits both the skill and the calling.',
    'By presenting David\'s wars without the moral failures, the Chronicler argues that the Davidic monarchy — as an institution — is worthy of restoration. The failures are known; the template is what matters now.',
    'The post-exilic community for whom Chronicles was written had no army, no king, and limited territory. These accounts of military glory served as remembered identity for a people rebuilding from nothing.',
    'Every organization tells its founding story selectively — emphasizing the vision, the breakthroughs, the victories. Chronicles does this intentionally. The question is whether selective memory serves hope or dishonesty.',
    JSON.stringify(['Is it appropriate to tell a story selectively when the goal is restoration rather than biography?', 'What institutional legacy is worth preserving from your community\'s past?']),
    JSON.stringify([
      { angle: 'Telling the Story That Builds the Future', target_audience: 'Communities rebuilding after failure', primary_theme: 'Selective memory as restoration tool' }
    ]),
    'ai_assisted', null],

  // 1CH 23-29 — David's Temple Preparations
  ['1ch-davids-temple-preparations', 'David\'s Temple Preparations', '1CH', 23, 1, 29, 30,
    'David organizes the Levites, priests, musicians, gatekeepers, and treasurers for the temple Solomon will build. He divides the priests into twenty-four courses, assigns singers and musicians by lot, and establishes the administrative framework for worship that will persist for centuries. Chapter 28 contains David\'s charge to Solomon — the temple plans given "by the Spirit" — and his public fundraising appeal. Chapter 29 records the people\'s generous response and David\'s great prayer: "All things come from you, and of your own have we given you." David dies, and Solomon reigns.',
    'These chapters present David as the architect of Israel\'s worship infrastructure. He cannot build the temple, but he can build the system. The Chronicler makes David\'s organizational genius equal in importance to Solomon\'s construction.',
    'David\'s prayer in 29:14 — "We give you only what comes from your hand" — is one of the most theologically precise statements about generosity in Scripture. All giving is returning.',
    'The twenty-four priestly courses organized here will still be in operation in Jesus\' time (Zechariah serves in the course of Abijah, Luke 1:5). David\'s organizational decisions shaped worship for a thousand years.',
    'The post-exilic community needed these organizational blueprints to rebuild temple worship after the exile. Chronicles preserves them as institutional memory for reconstruction.',
    'The leader who cannot build the thing but can design the system, fund the project, and organize the team — that is David in these chapters. Not every leader gets to cut the ribbon. Some build the platform others will stand on.',
    JSON.stringify(['What are you organizing or preparing that someone else will complete?', 'How does the idea that "all things come from you" change your relationship to generosity?']),
    JSON.stringify([
      { angle: 'Building What You Will Not See', target_audience: 'Leaders preparing for succession', primary_theme: 'Organizational legacy as worship' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // 2 CHRONICLES
  // ============================================================

  // 2CH 2-4 — Solomon Builds the Temple
  ['2ch-solomon-builds-temple', 'Solomon Builds the Temple', '2CH', 2, 1, 4, 22,
    'Solomon requests materials from Huram of Tyre, conscripts labor, and builds the temple. The Chronicler provides extraordinary detail: the dimensions, the gold overlay, the cherubim, the pillars Jachin and Boaz, the bronze sea, the ten basins, the golden lampstands, the tables, and the courts. Every measurement, every material, every ornament is recorded. The text lingers over the construction the way an architect lingers over blueprints — this is the dwelling place of God, and no detail is too small to matter.',
    'The temple construction is the Chronicler\'s central event. Every detail communicates that God deserves the finest human artistry. The collaboration with Huram (a Gentile) anticipates the temple\'s role as a house of prayer for all nations.',
    'The Israelite-Tyrian partnership makes the temple an international project. The finest craftsmen are not all Israelite — God\'s house is built with the best the world offers.',
    'The architectural detail carries theological weight: the gold, the cherubim, the dimensions all echo and expand the tabernacle. The temple is the permanent fulfillment of what the wilderness tent anticipated.',
    'The temple was built with quarried stone, imported cedar, and gold — representing the combined resources of Israel\'s economy and international trade networks. The economic investment was enormous.',
    'Every detail matters when you are building something for someone you love. These chapters read like a craftsman\'s journal because that is exactly what they are — a record of devotion expressed in cedar, gold, and stone.',
    JSON.stringify(['What does attention to detail in worship communicate about your view of God?', 'How does the international collaboration challenge isolationist spirituality?']),
    JSON.stringify([
      { angle: 'Every Detail Is Devotion', target_audience: 'Artists, builders, and creatives', primary_theme: 'Craftsmanship as worship' }
    ]),
    'ai_assisted', null],

  // 2CH 8 — Solomon's Achievements
  ['2ch-solomons-achievements', 'Solomon\'s Achievements and Worship Order', '2CH', 8, 1, 8, 18,
    'Solomon builds cities, organizes labor, establishes the festival calendar at the temple according to Moses\' law, and launches a fleet from Ezion-Geber in partnership with Huram. The chapter emphasizes Solomon\'s obedience to the Mosaic worship calendar: daily, sabbath, monthly, and annual offerings are all maintained. The Chronicler presents this as the golden standard — a king who builds, trades, and worships in proper order.',
    'The Chronicler\'s focus on Solomon\'s adherence to the Mosaic calendar presents him as the model of Torah-obedient monarchy. The building projects are secondary to the worship order.',
    'The ongoing partnership with Huram demonstrates that international commerce and covenant faithfulness are not mutually exclusive — at least in Solomon\'s best years.',
    'The detailed worship calendar (8:13) matches Deuteronomy and Numbers precisely, showing the Chronicler\'s concern that post-exilic worship replicates the Solomonic standard.',
    'Ezion-Geber on the Gulf of Aqaba gave Solomon access to Red Sea trade routes reaching Africa, Arabia, and India. The fleet\'s gold imports funded the kingdom\'s prosperity.',
    'Prosperity built on proper order — worship first, commerce second — is the Chronicler\'s ideal. When the order reverses, everything unravels.',
    JSON.stringify(['What does it look like to maintain spiritual disciplines during seasons of prosperity?']),
    JSON.stringify([
      { angle: 'Worship First, Then Build', target_audience: 'Entrepreneurs and builders', primary_theme: 'Spiritual order as foundation for enterprise' }
    ]),
    'ai_assisted', null],

  // 2CH 12-16 — Early Kings of Judah
  ['2ch-early-kings-judah', 'The Early Kings of Judah', '2CH', 12, 1, 16, 14,
    'After Rehoboam abandons the law, Shishak of Egypt invades. The prophet Shemaiah delivers God\'s message: "You abandoned me, so I have abandoned you." Rehoboam humbles himself, and the destruction is limited. His successors — Abijah, Asa — represent a pattern the Chronicler traces with care. Abijah delivers a theological speech before battle and wins. Asa begins well, removing idols and even deposing his own grandmother for her Asherah pole. But when threatened by Baasha of Israel, Asa appeals to Aram instead of God. A prophet confronts him; Asa, enraged, throws the prophet in prison. He dies with diseased feet, seeking physicians instead of God.',
    'The Chronicler establishes the pattern that will repeat for every king: faithfulness brings blessing; apostasy brings judgment; humility can mitigate consequences. Asa\'s trajectory — good beginning, bad ending — becomes a warning template.',
    'Asa deposing his grandmother (Queen Mother Maacah) for idolatry shows that covenant fidelity can require cutting the most powerful family ties. His later rage at the prophet shows the same decisiveness turned in the wrong direction.',
    'The phrase "the eyes of the LORD range throughout the earth to strengthen those whose hearts are fully committed to him" (16:9, in the prophet Hanani\'s rebuke) becomes one of the most quoted theological statements in Chronicles.',
    'The Egyptian invasion under Shishak brought the first foreign army into Jerusalem since David conquered it. The loss of temple treasures (including Solomon\'s gold shields) symbolized the end of the golden age.',
    'A leader who starts strong, confronts hard things, even deposes his own family for the right reasons — and then, under pressure, makes a pragmatic alliance instead of trusting God. The final season defines the legacy more than the first.',
    JSON.stringify(['Have you seen leaders who started well but finished poorly? What caused the shift?', 'What does it mean that God\'s eyes search for fully committed hearts?']),
    JSON.stringify([
      { angle: 'Starting Well Is Not Enough', target_audience: 'Mid-career leaders', primary_theme: 'Faithfulness as a finish-line virtue' }
    ]),
    'ai_assisted', null],

  // 2CH 17-19 — Jehoshaphat's Reign
  ['2ch-jehoshaphats-reign', 'Jehoshaphat\'s Reign', '2CH', 17, 1, 19, 11,
    'Jehoshaphat strengthens Judah\'s defenses, sends teaching teams throughout the nation to instruct people in the law, and is rewarded with regional respect and prosperity. But he makes a disastrous alliance with Ahab through marriage, joining him in battle at Ramoth-Gilead (where Ahab dies). Back in Judah, a prophet confronts him: "Should you help the wicked and love those who hate the LORD?" Jehoshaphat then appoints judges throughout the land and instructs them: "Consider carefully what you do, because you are not judging for mere mortals but for the LORD."',
    'Jehoshaphat is the Chronicler\'s most complex "good" king — genuinely faithful in domestic policy but repeatedly compromised by foreign alliances. His judicial reform is one of the most significant institutional contributions in Judah\'s history.',
    'The teaching teams sent throughout Judah represent systematic theological education. Jehoshaphat understood that national faithfulness requires informed citizens, not just faithful leaders.',
    'The appointment of judges with the charge to "judge for the LORD" establishes an independent judiciary answerable to divine standards, not royal preferences. This is separation of powers in embryonic form.',
    'The alliance with Ahab through marriage brought Judah into the orbit of Omride politics and religion. Jehoshaphat\'s son married Athaliah, planting the seed that would nearly destroy the Davidic line.',
    'A leader who invests in education, builds institutions of justice, and genuinely seeks God — but who cannot resist the wrong alliance. The combination of domestic excellence and diplomatic weakness is painfully common.',
    JSON.stringify(['How can a leader be genuinely faithful in one area and compromised in another?', 'What would systematic theological education look like in your community?']),
    JSON.stringify([
      { angle: 'Good Domestic Policy, Bad Foreign Policy', target_audience: 'Leaders who compartmentalize faithfulness', primary_theme: 'Comprehensive integrity' }
    ]),
    'ai_assisted', null],

  // 2CH 21-28 — The Middle Kings of Judah
  ['2ch-middle-kings-judah', 'The Middle Kings of Judah: Decline and Partial Recovery', '2CH', 21, 1, 28, 27,
    'These chapters trace Judah\'s roller-coaster through eight reigns. Jehoram murders his brothers and walks in the ways of Ahab (his father-in-law). Ahaziah follows the same path. Athaliah seizes power and nearly extinguishes the Davidic line. Joash starts well under Jehoiada the priest but turns to idolatry after Jehoiada dies, even murdering Jehoiada\'s own son Zechariah. Amaziah defeats Edom, then imports Edomite gods. Uzziah prospers until pride leads him to burn incense in the temple and he is struck with leprosy. Jotham is faithful but does not remove the high places. Ahaz reaches the nadir — closing the temple, building altars on every corner, and sacrificing his own children.',
    'The Chronicler maintains the same evaluative framework through every reign: seek God and prosper, abandon God and suffer. The pattern is applied with relentless consistency, making the theological point inescapable.',
    'The Jehoiada-Joash relationship is especially tragic. Joash\'s faithfulness lasted exactly as long as his mentor lived. Without the priest\'s influence, the king reverted to idolatry and murdered the mentor\'s son. Dependent faith is fragile faith.',
    'Uzziah\'s leprosy for burning incense — overstepping priestly prerogatives — establishes that even successful kings cannot blur the boundary between royal and priestly authority. The offices are deliberately separated.',
    'The Assyrian threat dominates the later reigns. Ahaz\'s child sacrifice and temple desecration represent the worst accommodation to foreign pressure. The temple closing is the Chronicler\'s ultimate horror.',
    'Eight kings, two centuries, and the same pattern repeated: every recovery is partial, every decline is predictable, and every king is measured by the same standard. Institutions do not drift randomly — they follow the character of their leadership.',
    JSON.stringify(['Why do institutions tend to follow the character of their top leadership?', 'What does Joash\'s story teach about the danger of mentor-dependent faith?']),
    JSON.stringify([
      { angle: 'The Faith That Died with the Mentor', target_audience: 'Young believers and discipleship programs', primary_theme: 'Internalized versus dependent faith' },
      { angle: 'Same Pattern, Different Century', target_audience: 'History-minded congregations', primary_theme: 'Institutional character follows leadership character' }
    ]),
    'ai_assisted', null],

  // 2CH 29-33 — Hezekiah and Manasseh
  ['2ch-hezekiah-and-manasseh', 'Hezekiah\'s Reform and Manasseh\'s Reversal', '2CH', 29, 1, 33, 25,
    'Hezekiah reopens and purifies the temple in his very first month, restores the Levitical worship order, and celebrates a Passover so significant that nothing like it had occurred "since the days of Solomon." He removes high places, shatters the bronze serpent Moses made, and faces Sennacherib\'s siege with prophetic assurance from Isaiah. God delivers Jerusalem with an angel. Then Manasseh undoes everything — rebuilding every high place, filling the temple with pagan altars, practicing child sacrifice and sorcery. But the Chronicler adds a detail absent from Kings: Manasseh is taken captive by Assyria, repents in prison, is restored, and removes the foreign gods. Even Manasseh gets a second chance.',
    'The Chronicler\'s inclusion of Manasseh\'s repentance is theologically revolutionary. The worst king in Judah\'s history — the one who made exile inevitable — is shown receiving mercy. If Manasseh can repent and be restored, no one is beyond grace.',
    'Hezekiah\'s Passover deliberately includes the northern tribes, inviting a reunited worship experience. The Chronicler frames this as a partial restoration of Solomonic-era unity.',
    'Manasseh\'s repentance in Assyrian captivity (not in 2 Kings) transforms the narrative from pure judgment to judgment-then-mercy. The Chronicler insists that the covenant of grace outlasts even the most extreme unfaithfulness.',
    'Sennacherib\'s invasion of 701 BC is one of the best-documented events in ancient Near Eastern history, confirmed by Assyrian records, the Taylor Prism, and archaeological evidence at Lachish.',
    'The father who reforms everything, the son who destroys it, and the grace that reaches even the destroyer — this is not an abstract theological pattern. It is the story of every family and institution that has cycled through renewal and collapse.',
    JSON.stringify(['If Manasseh can repent and be restored, what does that say about the limits of grace?', 'Why does one generation\'s reform often fail to transfer to the next?']),
    JSON.stringify([
      { angle: 'If Manasseh Can Be Forgiven', target_audience: 'People who believe they have gone too far', primary_theme: 'Grace beyond the point of no return' },
      { angle: 'The Reform That Didn\'t Transfer', target_audience: 'Parents and institutional leaders', primary_theme: 'Generational faithfulness as ongoing project' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // EZRA
  // ============================================================

  // EZR 2 — The List of Returnees
  ['ezr-list-of-returnees', 'The List of Returnees', 'EZR', 2, 1, 2, 70,
    'A detailed registry of families, clans, and temple personnel who returned from Babylon to Jerusalem under Zerubbabel. The numbers are specific — 42,360 people, plus 7,337 servants and 200 singers. Some families could not prove their lineage and were excluded from the priesthood until a priest with Urim and Thummim could adjudicate. The chapter reads like a census, but for returned exiles, this list was proof of survival. Every name was someone who chose to go home.',
    'The list functions as a theological document: God\'s people survived exile, preserved their identity, and returned. The specificity of the numbers insists that this is real — not myth, not metaphor, but documented restoration.',
    'Families who could not prove their genealogy faced exclusion from priestly service. Identity documentation mattered in a community rebuilding from scratch — you had to prove you belonged.',
    'The preservation of names across exile demonstrates the power of communal memory. These families maintained records through seventy years of displacement in a foreign land.',
    'The journey from Babylon to Jerusalem was approximately 900 miles. Forty-two thousand people traveling with livestock, servants, and temple vessels constituted a major logistical undertaking.',
    'A list of names seems like the least exciting text in the Bible — until you are one of the names. For displaced people everywhere, the roll call of who survived and who came home is the most important document in the world.',
    JSON.stringify(['Why does the Bible preserve this kind of detailed administrative record?', 'What does it mean to "prove you belong" in a community rebuilding after catastrophe?']),
    JSON.stringify([
      { angle: 'The Roll Call of the Survivors', target_audience: 'Immigrant and refugee communities', primary_theme: 'Identity preserved through displacement' }
    ]),
    'ai_assisted', null],

  // EZR 8 — Ezra's Traveling Companions
  ['ezr-traveling-companions', 'Ezra\'s Traveling Companions', 'EZR', 8, 1, 8, 36,
    'Ezra lists the families traveling with him from Babylon to Jerusalem and discovers there are no Levites in the group. He recruits some, then proclaims a fast — he is ashamed to ask the king for a military escort after boasting that God\'s hand protects those who seek him. The journey takes four months through dangerous territory. They arrive safely, deliver the temple vessels, offer sacrifices, and distribute the king\'s orders to the provincial authorities. The chapter is a portrait of faith tested by the gap between public theology and private fear.',
    'Ezra\'s refusal to request a military escort is a deliberate test of his own public theology. He had told the king that God protects his people, and now he must live by what he preached.',
    'The absence of Levites initially is telling — temple servants were not eager to leave Babylon for the hardships of rebuilding. Ezra must actively recruit the very people the project most needs.',
    'The fast before departure acknowledges that faith is not denial of danger. Ezra knows the road is perilous. He fasts not because he is confident but because he knows he has no other option.',
    'The route from Babylon to Jerusalem passed through uncontrolled territory where bandits preyed on caravans. The treasure they carried (gold, silver, temple vessels) made them a prime target.',
    'The moment when your public testimony meets private reality — when you have to actually trust what you told everyone else to trust — that is Ezra at the canal. Faith is not the absence of fear; it is the refusal to let fear rewrite your theology.',
    JSON.stringify(['When has your public faith been tested by private circumstances?', 'What does it mean to fast instead of calling for reinforcements?']),
    JSON.stringify([
      { angle: 'When You Have to Live Your Own Sermon', target_audience: 'Pastors and public leaders', primary_theme: 'Integrity between proclamation and practice' }
    ]),
    'ai_assisted', null],

  // ============================================================
  // NEHEMIAH
  // ============================================================

  // NEH 3 — The Builders of the Wall
  ['neh-builders-of-the-wall', 'The Builders of the Wall', 'NEH', 3, 1, 3, 32,
    'A section-by-section account of who built which part of Jerusalem\'s wall: priests, goldsmiths, perfumers, district leaders, women, and families — each assigned a specific section. Some nobles "would not stoop to serve." The chapter is a construction roster, but its theology is in the details: the high priest builds the Sheep Gate, perfumers repair the next section, a man and his daughters work side by side. Everyone has a section; the wall is built by ordinary people doing their assigned part.',
    'The wall is not built by one leader but by the whole community. The detailed roster communicates that communal projects require universal participation — and the text notices who refused to help.',
    'The inclusion of daughters working alongside their father, and of tradespeople (goldsmiths, perfumers) doing manual labor, breaks every social expectation. The wall levels hierarchies.',
    'Each builder works "opposite his own house" (3:10, 23, 28-30) — personal investment in the section that protects your own family creates motivation that abstract duty cannot.',
    'The wall sections correspond to known gates and landmarks of Persian-period Jerusalem, making this one of the most archaeologically useful chapters in the Bible.',
    'You do not need to build the whole wall. You need to build your section. The genius of Nehemiah\'s plan is that it turns an overwhelming project into manageable, personal assignments.',
    JSON.stringify(['What is your section of the wall?', 'Why does the text name those who refused to help?']),
    JSON.stringify([
      { angle: 'Build Your Section', target_audience: 'Congregations and volunteer teams', primary_theme: 'Distributed responsibility in communal projects' }
    ]),
    'ai_assisted', null],

  // NEH 9-10 — Confession and Covenant Renewal
  ['neh-confession-covenant-renewal', 'Confession and Covenant Renewal', 'NEH', 9, 1, 10, 39,
    'The people gather for a national day of confession. The Levites lead a sweeping recital of salvation history — creation, Abraham, Egypt, Sinai, wilderness, conquest, judges, kings, exile — all told as a story of God\'s patience and Israel\'s rebellion. The prayer climaxes: "You have been righteous in all that has come upon us, for you have dealt faithfully and we have acted wickedly." Then the community signs a written covenant pledging to keep the law: no intermarriage, sabbath observance, temple support, firstfruits, and tithes. The covenant is signed, sealed, and witnessed.',
    'The Levitical prayer in chapter 9 is the longest prayer in the Bible and the most comprehensive retelling of Israel\'s history. Its purpose is not information but formation — the community rehearses its identity as a people defined by God\'s faithfulness and their own failure.',
    'The signed covenant in chapter 10 makes the renewal concrete and accountable. Names are attached to commitments. This is not a vague feeling of spiritual renewal but a documented, witnessed obligation.',
    'The prayer\'s theological center is the contrast between divine faithfulness and human unfaithfulness, told without excuse or mitigation. The community accepts responsibility for exile and acknowledges God\'s justice.',
    'The written, signed covenant parallels ancient Near Eastern suzerainty treaties. The community is reconstituting itself as a treaty people — bound to God and to each other by documented commitment.',
    'There is a difference between feeling sorry and signing a document. Nehemiah 10 says: put your name on it. Commit in writing. Let people hold you accountable. Spiritual renewal that remains internal is incomplete.',
    JSON.stringify(['What would it mean to sign a covenant of commitment in your community?', 'Why does honest confession of history — including failure — lead to renewal rather than despair?']),
    JSON.stringify([
      { angle: 'Sign Your Name', target_audience: 'Communities seeking accountability', primary_theme: 'Documented commitment as spiritual renewal' }
    ]),
    'ai_assisted', null],

  // NEH 11-12 — Resettlement and Wall Dedication
  ['neh-resettlement-wall-dedication', 'Resettlement of Jerusalem and Wall Dedication', 'NEH', 11, 1, 12, 47,
    'Jerusalem\'s walls are rebuilt but the city is underpopulated. The people cast lots to move one in ten families into the city — volunteers are praised, but the lottery ensures enough settlers. Chapter 11 lists who lived where. Chapter 12 records the priestly and Levitical genealogies and the great celebration of the wall\'s dedication: two choirs process in opposite directions along the top of the wall and meet at the temple. "The joy of Jerusalem was heard far away."',
    'The resettlement lottery addresses a real problem: the rebuilt city needed residents, and few wanted to leave their suburban farms for urban life inside walls. The community solved it with both voluntary sacrifice and organized obligation.',
    'The two-choir dedication procession — walking opposite directions along the wall — is a liturgical act of claiming space. The wall becomes sacred not through priestly blessing but through musical worship.',
    'The genealogical records in chapter 12 connect the post-exilic community to its pre-exilic heritage. Identity continuity across the exile is the Chronicler\'s central theological concern.',
    'Post-exilic Jerusalem was a small, vulnerable settlement within massive walls. The city needed population density to be defensible and economically viable.',
    'Cities need people willing to move in when it is inconvenient. Churches, neighborhoods, and communities thrive when enough people say "I will live here" — not because it is comfortable, but because it is needed.',
    JSON.stringify(['What would it mean to move toward need rather than comfort?', 'How does communal celebration consecrate shared work?']),
    JSON.stringify([
      { angle: 'Move Into the City', target_audience: 'People considering risky commitments', primary_theme: 'Showing up where you are needed' }
    ]),
    'ai_assisted', null],

  // NEH 13 — Nehemiah's Final Reforms
  ['neh-nehemiahs-final-reforms', 'Nehemiah\'s Final Reforms', 'NEH', 13, 1, 13, 31,
    'Nehemiah returns from a visit to the Persian court and finds everything unraveling: Tobiah the Ammonite has been given a room in the temple, the Levites have abandoned their posts because they are not being paid, merchants are selling on the sabbath, and intermarriage has resumed. Nehemiah is furious. He throws Tobiah\'s furniture out of the temple, confronts the officials, shuts the gates on sabbath, and physically assaults some of the intermarried men, pulling out their hair. His repeated prayer — "Remember me, O my God" — punctuates each reform like a refrain of exhaustion.',
    'The book of Nehemiah ends not with triumph but with the recurrence of the same problems the covenant was supposed to solve. Reform is never final. The vigilance required to maintain faithfulness is exhausting and permanent.',
    'Nehemiah\'s violence (hair-pulling, cursing) is jarring, but it reveals the frustration of a leader who built the wall, organized the covenant, left briefly, and returned to find everything undone. Institutional memory is shorter than anyone hopes.',
    'The repeated "Remember me, O my God" is not triumphalism — it is a tired leader appealing to the only audience whose opinion ultimately matters. Nehemiah\'s validation must come from God because it will not come from the people.',
    'Tobiah\'s presence in the temple represents the penetration of political compromise into sacred space. The Ammonite was specifically excluded by the law read in chapter 13:1 — the community violated its own covenant within months of signing it.',
    'Every reformer knows the sickening feeling of coming back to find the changes undone. Nehemiah 13 is the honest ending: not "happily ever after" but "the work is never finished." If that sounds depressing, it is also realistic — and realistic hope is more durable than wishful thinking.',
    JSON.stringify(['When have you returned to a project and found your work undone?', 'What sustains a reformer when the reforms do not stick?']),
    JSON.stringify([
      { angle: 'Remember Me, O God', target_audience: 'Exhausted reformers and caregivers', primary_theme: 'Faithfulness when results do not last' }
    ]),
    'ai_assisted', null],
];

// --- Insert logic ---
const insert = db.prepare(`
  INSERT OR IGNORE INTO narrative_units (
    id, title, book_id, chapter_start, verse_start, chapter_end, verse_end,
    summary, significance, relational_note, conceptual_note, climate_note,
    modern_parallel, key_questions, preaching_angles,
    source_tier, source_notes
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((data) => {
  let count = 0;
  for (const r of data) {
    insert.run(...r);
    count++;
  }
  return count;
});

// Check for duplicate IDs within our data
const ids = rows.map(r => r[0]);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length > 0) {
  console.error('Duplicate IDs in data:', dupes.join(', '));
  db.close();
  process.exit(1);
}

const count = insertMany(rows);
console.log(`Inserted ${count} narrative units for OT gap chapters.`);

// --- Verification ---
const books = [
  'GEN', 'LEV', 'NUM', 'DEU',
  'JOS',
  '1SA', '2SA', '1KI', '2KI',
  '1CH', '2CH',
  'EZR', 'NEH'
];

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM narrative_units
  WHERE book_id IN (${books.map(() => '?').join(',')})
  GROUP BY book_id ORDER BY book_id
`).all(...books);
console.log('narrative_units by book:', JSON.stringify(byBook));

const total = db.prepare('SELECT COUNT(*) as c FROM narrative_units').get();
console.log('Total narrative units in database:', total.c);

db.close();
