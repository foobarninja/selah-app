import type { NarrativeUnitRecord } from "./narrative-types";

export const narratives2Samuel: NarrativeUnitRecord[] = [
  // ── 1. David Mourns Saul and Jonathan (1:1-27) ──────────────────────
  {
    id: "2sa-david-mourns-saul",
    title: "David Mourns Saul and Jonathan",
    bookId: "2SA",
    chapterStart: 1,
    verseStart: 1,
    chapterEnd: 1,
    verseEnd: 27,
    summary: `David receives the news of Saul's death on Mount Gilboa not from an Israelite messenger but from an Amalekite who claims to have delivered the killing blow, apparently expecting a reward. Instead of gratitude, David tears his clothes, weeps, and fasts until evening. He then orders the Amalekite executed for daring to raise his hand against the Lord's anointed — a move that is both genuine grief and politically shrewd, establishing immediately that David did not celebrate his rival's death.

The centerpiece of the passage is the Song of the Bow, one of the most exquisite poems in the Hebrew Bible. David laments Saul and Jonathan together, refusing to separate the complicated king from the beloved friend. "How the mighty have fallen" becomes a refrain that echoes across centuries. He praises Saul's military prowess without mentioning the years of persecution, and he immortalizes Jonathan with the devastating line about a love "surpassing the love of women" — a statement about covenant loyalty so deep it transcends every other human bond.

This is not political theater. David's grief is real, layered, and costly. He is mourning a man who tried to kill him repeatedly and a friend whose death leaves an irreplaceable void. The lament teaches Israel — and us — that you can grieve someone whose relationship with you was broken, that honoring the dead does not require dishonesty about their life, and that the capacity to mourn your enemy is a mark of moral seriousness, not weakness.`,
    significance: `The Song of the Bow sets the moral tone for David's entire reign. A lesser man would have danced on Saul's grave. David instead composes poetry that honors his persecutor, establishing a precedent: legitimate succession does not require the demonization of the predecessor. This ethic — mourning even those who wronged you — runs counter to the triumphalism that infects most power transitions.

The passage also introduces the theological tension that will define 2 Samuel: David is genuinely righteous here, capable of extraordinary moral beauty. That same man will later commit adultery and murder. The narrator wants us to see both Davids clearly, because the story is not about a hero or a villain but about what power does to a human heart.`,
    relationalNote: `David's grief reveals the complexity of real relationships. He mourns Saul — a father figure who became a would-be murderer. He mourns Jonathan — a friend whose loyalty cost him a throne. These are not simple losses. They are the kind of grief that comes when relationships are tangled with betrayal, loyalty, love, and political reality all at once. The text validates grieving complicated people without pretending the complications didn't exist.`,
    conceptualNote: `The Amalekite's miscalculation exposes a common assumption: that the enemy of your enemy will reward you for your enemy's death. David's response demolishes this transactional logic. The anointing of a king — even a failed king — carries weight that outlasts the king's failures. This is not about Saul deserving honor; it is about the office and the God who appointed it. David's refusal to celebrate the death of the Lord's anointed is a theological statement about the limits of political opportunism.`,
    climateNote: `The narrative is set in the aftermath of the Battle of Gilboa, fought in the Jezreel Valley — a broad plain at the foot of the Gilboa range where the hot, dry conditions of the Rift Valley meet the fertile lowlands. Bodies left on the battlefield would have decomposed quickly in the heat. The geographical setting matters: Gilboa is in the north, far from David's base in the south, underscoring how news traveled slowly and how David was genuinely in the dark about the battle's outcome until the messenger arrived.`,
    modernParallel: `Consider the death of a deeply flawed public leader — someone who accomplished genuine good but also caused enormous harm. The public reaction often splits into celebration or hagiography, with little room for the uncomfortable middle ground. David's lament models a third way: acknowledging the weight of the loss without sanitizing the person. It is the posture of a truth-teller at a funeral, honoring what was real without pretending the pain didn't happen.

In organizational life, this maps to the departure of a toxic but talented leader. The temptation is either to trash their legacy or to pretend everything was fine. David's approach — mourning the genuine loss while building something new — is the healthiest path, and the hardest. It requires the emotional maturity to hold two truths simultaneously: this person hurt me, and this person's death diminishes the world.

The Song of the Bow also speaks to anyone who has lost a complicated relationship — a parent who was both protector and threat, a mentor who was both generous and controlling. David shows that grief does not require resolution. You can mourn what was and what could have been at the same time.`,
    keyQuestions: JSON.stringify([
      "Why does David execute the Amalekite rather than rewarding him, and what does this reveal about David's understanding of divine authority?",
      "How does the Song of the Bow handle the tension between Saul's genuine accomplishments and his moral failures?",
      "What does David's statement about Jonathan's love 'surpassing the love of women' tell us about the nature of covenant friendship?",
      "Is David's public mourning entirely genuine, partly political, or both — and does it matter?",
      "How do we mourn people who both blessed us and harmed us without resorting to either hagiography or demonization?",
      "What does this passage suggest about the relationship between grief and leadership?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Grieving the complicated: when the person you mourn is also the person who hurt you", target_audience: "Adults processing loss of difficult relationships", primary_theme: "Grief and honesty" },
      { angle: "The courage not to celebrate your enemy's downfall", target_audience: "Leaders navigating transitions of power", primary_theme: "Integrity in leadership" },
      { angle: "The Song of the Bow: what it means to honor someone without lying about them", target_audience: "General congregation", primary_theme: "Truth-telling and grace" },
      { angle: "David and Jonathan: the love that outlasts death", target_audience: "Men exploring deep friendship", primary_theme: "Covenant loyalty" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 1:1-27. Cross-referenced with standard pericope divisions and scholarly commentary on the Song of the Bow."
  },

  // ── 2. David Becomes King (2:1–5:5) ─────────────────────────────────
  {
    id: "2sa-david-becomes-king",
    title: "David Becomes King over All Israel",
    bookId: "2SA",
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 5,
    verseEnd: 5,
    summary: `After Saul's death, David does not seize the throne. He inquires of the Lord, moves to Hebron, and is anointed king over Judah — one tribe, not twelve. Meanwhile, Abner, Saul's general, installs Ish-bosheth (Saul's surviving son) as king over the remaining tribes. What follows is a grinding civil war that lasts years, not weeks. The text is blunt: "The war between the house of Saul and the house of David lasted a long time. David grew stronger and stronger, while the house of Saul grew weaker and weaker."

The political maneuvering is brutal and personal. Abner kills Asahel (Joab's brother) in battle, setting up a blood feud that will haunt David's reign. When Abner defects to David's side after a dispute with Ish-bosheth, Joab murders Abner in cold blood — ostensibly for family honor, but also to eliminate a rival for military command. David publicly curses Joab for the murder but does not punish him, establishing a pattern of moral clarity combined with political paralysis that will define his kingship.

Ish-bosheth is assassinated by two of his own captains, who bring his head to David expecting a reward. David has them executed, just as he executed the Amalekite who claimed to have killed Saul. The pattern is consistent: David refuses to benefit from political murder, even when the murder benefits him. Finally, all the tribes come to David at Hebron and anoint him king over all Israel. He has waited over seven years. The throne was promised; the path was blood-soaked.`,
    significance: `This extended narrative reveals that God's promises do not eliminate political reality — they run through it. David was anointed by Samuel as a boy, but the road from anointing to actual kingship passes through exile, civil war, assassination, and moral compromise. The text refuses to present David's rise as a clean, providential triumph. It was messy, violent, and slow.

The section also introduces a tension that will never resolve: David's moral clarity versus his political impotence. He condemns Joab's murder of Abner but cannot afford to lose Joab. He condemns Ish-bosheth's assassination but benefits from it. David's hands may be technically clean, but the narrator invites us to notice how convenient these murders are for him. The question of David's complicity — or at least his willingness to benefit from violence he condemns — is one the text never fully answers.`,
    relationalNote: `The Abner-Joab-David triangle is a study in how unresolved grief and vengeance poison organizations. Joab's brother Asahel is killed by Abner in a battle that Joab arguably provoked. Joab then murders Abner, not just for revenge but to protect his own position. David mourns publicly but does nothing. This dynamic — where a leader sees clearly but acts weakly — creates a culture of impunity. Joab learns that David's moral pronouncements carry no consequences, a lesson Joab will exploit repeatedly.`,
    conceptualNote: `The passage raises hard questions about divine sovereignty and human agency. God promised David the throne, but the throne arrives through a chain of human decisions — some noble, some murderous, none of which David directly controls. The text does not resolve whether God orchestrated these events or merely worked through them. It simply presents the raw political reality and lets the reader sit with the discomfort of a holy promise fulfilled through unholy means.`,
    climateNote: `Hebron, David's capital during this period, sits in the Judean hill country at about 930 meters elevation — higher and cooler than Jerusalem. The region receives moderate rainfall and was historically surrounded by vineyards and olive groves. The choice of Hebron as a capital was both strategic (central to Judah's territory) and symbolic (Abraham had settled there, and the patriarchs were buried in the cave of Machpelah nearby). The civil war played out across the varied terrain of the central highlands, the Jordan Valley, and the Transjordan.`,
    modernParallel: `The seven-year gap between David's anointing as king of Judah and his recognition by all Israel mirrors the experience of leaders who hold a legitimate mandate but lack institutional buy-in. Think of a new CEO hired to transform a company where half the organization is loyal to the previous regime. The mandate is real, but the authority has to be built one relationship at a time, often through painful negotiation and the slow attrition of the old guard.

Joab's murder of Abner has direct parallels in modern organizations where a loyal lieutenant takes unauthorized action that benefits the leader but violates the leader's stated values. The leader faces a terrible choice: punish the lieutenant and lose operational capacity, or condemn the action verbally while retaining the lieutenant — thereby establishing that the organization's stated values are aspirational, not enforceable. David chooses the latter, and the consequences ripple through his entire reign.

This passage also speaks to anyone waiting for a promise to be fulfilled. The delay is not a sign of God's absence; it is the texture of real life. Promises that skip over political reality, relational complexity, and institutional resistance are fantasies, not prophecies. David's patience — imperfect, occasionally complicit, but real — is the kind of faithfulness that actually works in the world as it is.`,
    keyQuestions: JSON.stringify([
      "Why does David inquire of the Lord before moving to Hebron, and what does this reveal about his decision-making process?",
      "How complicit is David in the deaths of Abner and Ish-bosheth, given that he condemns the killings but benefits from them?",
      "What does Joab's murder of Abner reveal about the cost of unresolved blood feuds in leadership structures?",
      "Why does David curse Joab publicly but fail to punish him, and what precedent does this set?",
      "How does the seven-year wait between David's anointing over Judah and his recognition by all Israel shape our understanding of divine promises?",
      "What does it mean that God's purposes are accomplished through morally ambiguous human actions?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The long road from promise to fulfillment: what happens in the waiting years", target_audience: "People in seasons of unfulfilled calling", primary_theme: "Patience and faithfulness" },
      { angle: "When your lieutenant does the wrong thing for your benefit: David and Joab", target_audience: "Leaders and managers", primary_theme: "Accountability and complicity" },
      { angle: "Civil war in the household of God: when the people of God fight each other", target_audience: "Congregations experiencing division", primary_theme: "Unity and reconciliation" },
      { angle: "Clean hands, convenient outcomes: the ethics of benefiting from others' sins", target_audience: "Ethics-minded adults", primary_theme: "Moral complicity" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 2:1–5:5. Cross-referenced with standard pericope divisions and scholarly commentary on the Davidic succession narrative."
  },

  // ── 3. Jerusalem Captured (5:6-25) ──────────────────────────────────
  {
    id: "2sa-jerusalem-captured",
    title: "David Captures Jerusalem",
    bookId: "2SA",
    chapterStart: 5,
    verseStart: 6,
    chapterEnd: 5,
    verseEnd: 25,
    summary: `David's first act as king over all Israel is a military masterstroke: he captures Jerusalem from the Jebusites, a Canaanite enclave that had resisted Israelite conquest for centuries. The Jebusites taunt him — "Even the blind and the lame can ward you off" — but David takes the city through the water shaft, a move that combines tactical ingenuity with raw audacity. He renames it the City of David and begins transforming it from a minor hill fortress into the political and spiritual center of the nation.

The choice of Jerusalem is itself a stroke of political genius. The city sits on the border between Judah (David's tribe) and Benjamin (Saul's tribe), belonging to neither. By making a neutral city his capital, David sidesteps the tribal jealousies that fueled the civil war. He builds alliances — Hiram of Tyre sends cedar and craftsmen — takes more wives and concubines, and defeats the Philistines in two decisive battles in the Valley of Rephaim.

The passage moves at breathtaking speed, compressing what must have been years of effort into a few verses. But the narrator's economy is deliberate: this is David at his apex of competence, the anointed king finally acting with the full authority and ability that God intended. Everything works. The city falls, the alliances form, the enemies scatter. It is the calm before the storm.`,
    significance: `The capture of Jerusalem is one of the most consequential military and political decisions in biblical history. It creates the city that will become the spiritual center of Judaism, the site of the Temple, the place where Jesus will be crucified, and a flashpoint of geopolitical conflict to this day. David's choice was pragmatic — a neutral capital for a divided people — but its theological significance grew exponentially over time, far beyond anything David could have anticipated.

The narrative also presents David at his most effective: decisive, creative, politically astute, and militarily brilliant. The text wants us to see this David clearly, because the contrast with the David of the Bathsheba narrative will be devastating. The same man who could conquer an impregnable city will prove unable to conquer his own appetites.`,
    relationalNote: `David's selection of Jerusalem demonstrates relational intelligence applied to governance. By choosing a city that belonged to no tribe, he communicated that his kingship was for all Israel, not a tribal spoil. This kind of symbolic gesture — choosing a neutral ground — is foundational to reconciliation after civil conflict. It says: I am not here to reward my supporters and punish my opponents. I am here to build something new that belongs to everyone.`,
    conceptualNote: `The Jebusites' taunt — that even the blind and lame could defend their city — reflects the ancient Near Eastern convention of psychological warfare. David's conquest through the water shaft (the exact mechanism is debated by scholars) demonstrates that no human fortification is impregnable when God's purposes are in motion. The passage connects military strategy with divine favor without making either one redundant: David uses real tactics, and God grants real success.`,
    climateNote: `Jerusalem sits on a limestone ridge in the Judean highlands at approximately 750 meters elevation, flanked by the Kidron Valley to the east and the Hinnom Valley to the south and west. The Jebusite city occupied the southeastern hill (the original City of David), a narrow ridge above the Gihon Spring — the water source that made the site habitable and whose shaft likely provided the entry point for David's forces. The spring-fed location in an otherwise semi-arid landscape made Jerusalem defensible but also vulnerable to anyone who could control the water access.`,
    modernParallel: `David's selection of Jerusalem as a neutral capital has direct parallels in modern nation-building. Think of the creation of Washington, D.C., carved from land donated by Maryland and Virginia precisely because it belonged to no state. Or Canberra, built as Australia's capital because Sydney and Melbourne could not stop competing. Or Abuja, Nigeria's planned capital, chosen to replace Lagos partly because of its central, ethnically neutral location. The principle is the same: after division, the seat of power must signal fresh start, not tribal victory.

The Jebusites' overconfidence also resonates. Institutions that have never been challenged often develop a false sense of invulnerability — "even the blind and lame can defend this." Then someone finds the water shaft. In business, this is the incumbent that laughs at the upstart until the upstart finds the one vulnerability no one thought to defend. In personal life, it is the assumption that because something has always worked, it always will.

David's comprehensive effectiveness in this passage — military, political, diplomatic, infrastructural — represents a person operating in their zone of full alignment: skill, calling, opportunity, and divine backing all converging. These moments are real but temporary, and the text's placement of this passage before David's catastrophic moral failure is a warning: peak competence does not immunize against peak temptation.`,
    keyQuestions: JSON.stringify([
      "Why does David choose Jerusalem as his capital rather than Hebron, and what does this reveal about his political wisdom?",
      "What is the significance of the Jebusites' taunt about the blind and the lame, and what does David's response reveal about his character?",
      "How does the rapid success described in this passage set up the reader for the failures that follow?",
      "What does the alliance with Hiram of Tyre suggest about David's understanding of international relations?",
      "How does the concept of a 'neutral capital' apply to reconciliation in divided communities today?",
      "What is the relationship between military competence and spiritual faithfulness in this passage?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Finding the water shaft: creative problem-solving when the obvious path is blocked", target_audience: "Entrepreneurs and leaders facing entrenched obstacles", primary_theme: "Innovation and divine guidance" },
      { angle: "The neutral capital: building institutions that belong to everyone", target_audience: "Church leaders navigating faction and division", primary_theme: "Reconciliation and inclusion" },
      { angle: "Peak performance is not peak protection: the danger of the apex moment", target_audience: "Successful professionals", primary_theme: "Humility and vigilance" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 5:6-25. Cross-referenced with archaeological data on Jebusite Jerusalem and the Warren's Shaft theory."
  },

  // ── 4. The Ark Comes to Jerusalem (6:1-23) ─────────────────────────
  {
    id: "2sa-ark-comes-to-jerusalem",
    title: "The Ark Comes to Jerusalem",
    bookId: "2SA",
    chapterStart: 6,
    verseStart: 1,
    chapterEnd: 6,
    verseEnd: 23,
    summary: `David's decision to bring the Ark of the Covenant to Jerusalem is brilliant theology fused with brilliant politics: by housing God's presence in his capital, he makes Jerusalem not just the seat of government but the spiritual center of the nation. But the first attempt goes catastrophically wrong. They transport the Ark on an ox cart — the Philistine method, not the Levitical one — and when the oxen stumble, a man named Uzzah reaches out to steady it. God strikes Uzzah dead. David is terrified and furious, and the Ark sits in the house of Obed-Edom for three months.

The second attempt succeeds. This time David follows the prescribed method — Levites carry the Ark on poles — and the procession is marked by extravagant worship. David dances before the Lord "with all his might," wearing a linen ephod, essentially stripped of royal dignity. He is not performing for the crowd; he is lost in adoration. The contrast between David the king and David the worshiper is the point: true worship requires the surrender of status.

But the scene ends with a bitter domestic confrontation. Michal, Saul's daughter, watches from a window and despises David for his undignified display. When he returns home, she attacks him with withering sarcasm. David fires back, essentially telling her that God chose him over her father. The narrator's final note is devastating: "Michal daughter of Saul had no children to the day of her death." Whether this is divine judgment or David's abandonment of her bed, the text does not say. Either way, it is a tragedy within the triumph.`,
    significance: `The Uzzah incident is one of the most disturbing passages in the Old Testament, and the narrator makes no attempt to soften it. God's holiness is not safe. The Ark is not a national mascot; it is the localized presence of the infinite God, and approaching it on human terms — even with good intentions — is lethal. This is not a God who can be managed, moved on a cart, or steadied by human hands. The passage insists that worship must be on God's terms, not ours.

David's dance represents the opposite extreme: worship so abandoned that it offends the sensibilities of the respectable. The juxtaposition of Uzzah's death and David's dance creates a paradox that sits at the heart of biblical theology — the same God who kills the casual touch invites the ecstatic dance. The difference is posture: Uzzah treats the Ark as an object to be managed; David treats God as a person to be adored.`,
    relationalNote: `The David-Michal confrontation reveals the cost of their fractured marriage. Michal was given to David as a political prize, taken from him by Saul, married to another man (Paltiel, who wept when she was taken back), and then reclaimed by David as a political asset in the civil war. She has been traded like property her entire life. Her contempt for David's worship may be partly theological (she shares Saul's view of propriety) and partly personal (she is watching a man who reclaimed her as a political chess piece now dance with abandon before God while she sits barren in a palace). The text refuses to make her simply a villain. She is a casualty of the power dynamics between two royal houses.`,
    conceptualNote: `The Uzzah incident forces a confrontation with the biblical concept of holiness as dangerous. Modern Western Christianity has largely domesticated God, reducing holiness to moral purity. The Ark narrative insists that holiness is an ontological reality — a consuming fire that cannot be approached casually. This is not cruelty; it is the nature of the infinite meeting the finite. The prescribed protocols for carrying the Ark were not arbitrary rules but life-preserving boundaries, like the safety protocols around a nuclear reactor.`,
    climateNote: `The procession from Baale-Judah (likely Kiriath-Jearim, about 14 kilometers west of Jerusalem) would have followed a route through the Judean foothills and up into the central ridge. The terrain is rocky and uneven — precisely the kind of road where an ox cart would stumble, as the text describes. The eventual Levitical method of carrying the Ark on poles was far more suited to this landscape, suggesting that the prescribed method was not only theologically correct but practically superior for the terrain.`,
    modernParallel: `The Uzzah incident has a direct parallel in any situation where well-intentioned people approach something powerful on their own terms rather than on its terms. A therapist who ignores clinical boundaries because they "care about the patient." A volunteer who bypasses safety protocols because "I know what I'm doing." An activist who deploys a nuclear truth in a context that can't handle it. Good intentions are not a substitute for proper approach. The lesson is not that God is arbitrary but that power — divine or otherwise — must be approached with the respect its nature demands.

David's dance speaks to anyone who has been told their worship, grief, joy, or expression is "too much." Michal's contempt is the voice of institutional propriety: keep it dignified, keep it controlled, keep it respectable. David's response is the voice of authentic encounter: I will become even more undignified than this. This tension plays out in every worshiping community that negotiates between form and freedom, between liturgy and spontaneity, between what looks appropriate and what feels true.

The Michal subplot also resonates with anyone trapped in a relationship defined by political utility rather than genuine love. Michal was never asked what she wanted. She was a pawn in her father's game and then in David's. Her bitterness is understandable even if it is misdirected. The text does not celebrate her barrenness; it mourns it.`,
    keyQuestions: JSON.stringify([
      "Why does God strike Uzzah dead for what seems like a well-intentioned act, and what does this reveal about the nature of holiness?",
      "What is the difference between David's approach to the Ark in the second attempt versus the first?",
      "Why does David dance with abandon before the Ark, and what does this tell us about authentic worship?",
      "Is Michal's contempt for David purely theological, or does it reflect the pain of their broken relationship?",
      "How do we hold together the God who kills Uzzah and the God who delights in David's dance?",
      "What does Michal's barrenness signify in the context of the narrative?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Don't touch the Ark: the danger of approaching holy things on our own terms", target_audience: "Church leaders and worship teams", primary_theme: "Holiness and reverence" },
      { angle: "Dancing like nobody's watching — except everyone is: the cost of undignified worship", target_audience: "Worshiping communities", primary_theme: "Authentic worship vs. respectability" },
      { angle: "Michal at the window: when pain disguises itself as contempt", target_audience: "People processing relational wounds", primary_theme: "Bitterness and unprocessed grief" },
      { angle: "The second attempt: getting it right after getting it wrong", target_audience: "People recovering from failure", primary_theme: "Correction and humility" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 6:1-23. Cross-referenced with scholarly commentary on the Uzzah incident and Michal's characterization."
  },

  // ── 5. The Davidic Covenant (7:1-29) ────────────────────────────────
  {
    id: "2sa-davidic-covenant",
    title: "The Davidic Covenant",
    bookId: "2SA",
    chapterStart: 7,
    verseStart: 1,
    chapterEnd: 7,
    verseEnd: 29,
    summary: `David, now secure in his cedar palace, is troubled by a theological asymmetry: he lives in luxury while the Ark of God dwells in a tent. He tells the prophet Nathan he wants to build God a house — a temple. Nathan initially approves, but that night God sends a message that reverses the entire proposal. God will not let David build Him a house; instead, God will build David a house — a dynasty.

The oracle that follows is the theological backbone of the entire Old Testament's messianic hope. God promises David that his descendant will sit on the throne forever, that God will be a father to David's heir, and that even when the heir sins, God will discipline him but never withdraw His steadfast love as He did from Saul. The promise is unconditional in its ultimate scope — God's commitment to David's line will not be revoked — even though individual kings within that line will face consequences for their failures.

David's response is one of the most genuine prayers in Scripture. He does not negotiate, strategize, or bargain. He simply sits before the Lord and marvels: "Who am I, Sovereign Lord, and what is my family, that you have brought me this far?" The shepherd boy from Bethlehem, now king of Israel, recognizes that everything he has received is unmerited. His prayer is the appropriate response to grace: not entitlement, but astonishment.`,
    significance: `The Davidic Covenant is the hinge on which the biblical narrative turns. It establishes the expectation that a son of David will rule forever — an expectation that survives the destruction of the monarchy, the exile, the return, and the centuries of waiting. It is the theological foundation for the New Testament's identification of Jesus as the "Son of David." Without 2 Samuel 7, there is no manger in Bethlehem, no triumphal entry, no throne at the right hand of God.

The wordplay on "house" is the narrative's central irony: David wants to build God a house (temple), but God builds David a house (dynasty). This reversal encapsulates the gospel logic that runs through all of Scripture: God does not need human effort to establish His purposes. He takes the human impulse to do something for God and redirects it into the far more radical posture of receiving something from God.`,
    relationalNote: `God's promise to discipline David's descendants without abandoning them is a model of covenantal parenting. "When he does wrong, I will punish him with a rod wielded by men, with floggings inflicted by human hands. But my love will never be taken away from him." This is not permissive grace; it is committed love that holds consequences and compassion together. The promise acknowledges that the relationship will include failure, but failure will not end the relationship. This is the definition of unconditional love — not the absence of standards, but the refusal to abandon.`,
    conceptualNote: `The tension between conditional and unconditional elements in the Davidic Covenant has generated centuries of theological debate. The Mosaic Covenant was clearly conditional: obey and be blessed, disobey and be cursed. The Davidic Covenant adds a new layer: individual kings will face consequences, but the dynasty itself will endure. This creates a theological framework where human failure is real and costly but not ultimately decisive — God's purposes will prevail through and despite the failures of His chosen agents. This is the soil from which the Christian doctrine of grace grows.`,
    climateNote: `David's cedar palace, built with materials from Hiram of Tyre, represents a significant import of Lebanese cedar through the coastal trade routes and up into the Judean highlands. Cedar does not grow in the arid climate of Jerusalem; its presence in David's palace is itself a marker of international trade, wealth, and the Phoenician alliance. The contrast between David's cedar house and God's tent (the tabernacle) would have been visually and materially stark in the dry, stone-built environment of early Jerusalem.`,
    modernParallel: `David's impulse to build God a temple mirrors the well-meaning instinct of successful people to "give back to God" — to build a building, fund a program, or launch an initiative that will stand as a monument to their generosity. God's response is gentle but firm: I don't need your building project. Instead, let me do something for you that will outlast anything you could construct. The reversal is humbling precisely because it strips away the one thing successful people can always offer: their competence.

This dynamic plays out in churches constantly. A wealthy donor wants to build a new wing. A talented leader wants to launch a new ministry. The impulse is genuinely generous, but it can mask a deeper need to be the one who does something for God rather than the one who receives something from God. The Davidic Covenant insists that the most important things in the kingdom are not built by human hands.

David's prayer of astonishment — "Who am I?" — is the antidote to the entitlement that often accompanies success. It is the prayer of someone who has achieved everything and recognizes that none of it was inevitable. In a culture that celebrates self-made success, David's posture is countercultural: the greatest king in Israel's history sits before God and says, essentially, "I have no idea why you chose me."`,
    keyQuestions: JSON.stringify([
      "Why does God refuse David's offer to build a temple, and what does this reveal about how God relates to human initiative?",
      "What is the significance of the wordplay on 'house' (temple vs. dynasty) in God's response to David?",
      "How does the Davidic Covenant relate to and differ from the Mosaic Covenant?",
      "What does God's promise to discipline but not abandon David's descendants reveal about divine love?",
      "How does David's prayer of astonishment model an appropriate response to unmerited favor?",
      "In what ways does the Davidic Covenant shape the New Testament's understanding of Jesus?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When God says no to your building project: receiving instead of achieving", target_audience: "Driven, successful people", primary_theme: "Grace vs. works" },
      { angle: "I will be his father: God's commitment to discipline without abandonment", target_audience: "Parents; people with complicated relationships to authority", primary_theme: "Unconditional love" },
      { angle: "Who am I? The prayer of astonished gratitude", target_audience: "General congregation", primary_theme: "Humility and worship" },
      { angle: "The house God builds: dynasty, legacy, and the long arc of faithfulness", target_audience: "Multigenerational families and communities", primary_theme: "God's faithfulness across generations" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 7:1-29. Cross-referenced with scholarly commentary on the Davidic Covenant and its role in messianic theology."
  },

  // ── 6. David and Mephibosheth (9:1-13) ──────────────────────────────
  {
    id: "2sa-david-and-mephibosheth",
    title: "David and Mephibosheth",
    bookId: "2SA",
    chapterStart: 9,
    verseStart: 1,
    chapterEnd: 9,
    verseEnd: 13,
    summary: `In the ancient Near East, a new dynasty typically secured its power by exterminating the previous royal family. David does the opposite. He asks, "Is there anyone still left of the house of Saul to whom I can show kindness for Jonathan's sake?" The word he uses is hesed — covenantal loyalty, steadfast love, the kind of faithfulness that persists because of a prior commitment, not because of the other person's merit or usefulness.

The search produces Mephibosheth, Jonathan's son, who is "lame in both feet" — injured as a child when his nurse dropped him while fleeing after the deaths of Saul and Jonathan. Mephibosheth is living in Lo-Debar, a name that means "no pasture" or "nothing" — a place of obscurity and poverty. He is a disabled grandson of a dead king, hiding in a backwater, expecting execution. Instead, David restores Saul's entire estate to him, assigns Saul's former servant Ziba to manage the land on his behalf, and — most remarkably — gives Mephibosheth a permanent seat at the king's table.

Mephibosheth's response is painfully self-deprecating: "What is your servant, that you should notice a dead dog like me?" He has internalized the identity of someone who is worthless, disposable, a relic of a defeated house. David's kindness does not just restore his material circumstances; it restores his identity. He is no longer a fugitive; he is a guest of the king. The chapter ends with a quiet, powerful image: "Mephibosheth lived in Jerusalem, because he always ate at the king's table; and he was lame in both feet." The disability remains; the status has changed.`,
    significance: `This passage is the Old Testament's clearest narrative illustration of grace. Mephibosheth has no claim on David. He is a member of the rival house, disabled, impoverished, and politically irrelevant. David's kindness is not motivated by what Mephibosheth can offer but by David's covenant with Jonathan. The initiative belongs entirely to David; Mephibosheth contributes nothing but his presence at the table.

The theological parallels are unmistakable: a king seeks out someone in a place of nothing, restores what was lost, and gives them a permanent place at his table — not because of who they are, but because of a prior covenant. The text does not allegorize this; it simply tells the story and lets the resonance do its work.`,
    relationalNote: `David's kindness to Mephibosheth is rooted in his love for Jonathan. The dead friend's son becomes the living recipient of a loyalty that transcends death. This is one of the most powerful aspects of covenantal thinking: promises made to one generation create obligations to the next. David does not owe Mephibosheth anything personally. He owes Jonathan everything, and Jonathan is gone. So the debt of love flows to the one Jonathan left behind.`,
    conceptualNote: `Mephibosheth's self-description as a "dead dog" reflects how thoroughly marginalization can shape identity. He has absorbed the values of a world that discards the disabled, the defeated, and the powerless. David's restoration addresses not just material need but ontological identity — Mephibosheth is not a dead dog; he is a guest of the king. The passage suggests that genuine grace does more than change circumstances; it challenges the internalized narratives of worthlessness that oppression creates.`,
    climateNote: `Lo-Debar, Mephibosheth's place of exile, is generally identified with a site in the Transjordan, east of the Jordan River, in the region of Gilead. This area is more remote and less fertile than the Judean heartland, fitting the etymological suggestion of "no pasture." The move from Lo-Debar to Jerusalem — from the marginal Transjordanian highlands to the royal capital on the central ridge — represents a dramatic geographical as well as social ascent. Eating at the king's table in Jerusalem would have meant access to the best food, water, and shelter the kingdom could provide.`,
    modernParallel: `Mephibosheth's story speaks directly to anyone who has internalized an identity of worthlessness because of disability, family history, poverty, or marginalization. The world's system of value — which prizes ability, power, beauty, and productivity — tells people like Mephibosheth that they are dead dogs. Grace pulls up a chair at the table and says: sit here. Your disability has not changed, but your identity has. You are no longer defined by what you lack but by whose table you sit at.

In organizational terms, David's treatment of Mephibosheth is the opposite of how most institutions treat the remnants of previous regimes. The typical approach is purge and replace. David's approach is seek, restore, and include. This is not naive — David is also consolidating power by neutralizing a potential rival through generosity — but it is genuine. The political and the personal are not mutually exclusive.

The Ziba subplot, which will become important later in the narrative, introduces a warning: the person assigned to serve the vulnerable may be the one who exploits them. Ziba is given authority over Mephibosheth's estate, and later (in chapter 16) he will manipulate this position for his own gain. Grace extended to the vulnerable must include structural protections, not just good intentions.`,
    keyQuestions: JSON.stringify([
      "What motivates David to seek out a survivor of Saul's house, and how does the concept of hesed (covenant loyalty) shape his actions?",
      "What does Mephibosheth's self-description as a 'dead dog' reveal about how marginalization shapes identity?",
      "How does David's restoration of Mephibosheth illustrate the biblical concept of grace?",
      "What is the significance of Mephibosheth eating permanently at the king's table?",
      "How does the narrator's closing note — 'he was lame in both feet' — function theologically?",
      "What are the risks embedded in David's arrangement with Ziba, and what does this suggest about structures of care for the vulnerable?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Pulled from Lo-Debar: grace that seeks you in the place of nothing", target_audience: "People experiencing poverty, disability, or marginalization", primary_theme: "Grace and identity restoration" },
      { angle: "A seat at the king's table: belonging that does not require ability", target_audience: "Communities wrestling with inclusion", primary_theme: "Radical hospitality" },
      { angle: "For Jonathan's sake: how covenant love extends beyond death to the next generation", target_audience: "Parents and mentors", primary_theme: "Legacy and covenant faithfulness" },
      { angle: "Dead dog identity: how oppression shapes self-perception and how grace rewrites it", target_audience: "People with internalized shame", primary_theme: "Identity and dignity" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 9:1-13. Cross-referenced with scholarly commentary on hesed and Mephibosheth's characterization."
  },

  // ── 7. David and Bathsheba (11:1-27) ────────────────────────────────
  {
    id: "2sa-david-and-bathsheba",
    title: "David and Bathsheba",
    bookId: "2SA",
    chapterStart: 11,
    verseStart: 1,
    chapterEnd: 11,
    verseEnd: 27,
    summary: `The chapter opens with a single devastating sentence: "In the spring, at the time when kings go off to war, David sent Joab out with the king's men and the whole Israelite army... But David remained in Jerusalem." The king who conquered Jerusalem, who danced before the Ark, who defeated the Philistines — that king stayed home. The text makes no attempt to explain why. It simply notes the absence and lets the reader feel the weight of it.

From the rooftop of his palace, David sees a woman bathing. He inquires about her. He is told she is Bathsheba, the wife of Uriah the Hittite — one of David's own elite warriors, currently fighting David's war. The identification should have stopped him: she is married, her husband is loyal, he is the king. David sends for her anyway. The Hebrew is stark: "David sent messengers and took her. She came to him, and he slept with her." The verbs are all David's. Bathsheba has no recorded dialogue, no recorded consent. She is summoned by the most powerful man in the nation. This is not a romance; it is an abuse of royal power.

When Bathsheba sends word that she is pregnant, David's first instinct is not repentance but cover-up. He recalls Uriah from the front, hoping he will go home to his wife and the pregnancy will be attributed to him. But Uriah, with devastating irony, refuses to enjoy the comforts of home while his comrades are sleeping in the field. David gets him drunk; Uriah still refuses. Finally, David writes a letter to Joab — carried by Uriah's own hand — ordering that Uriah be placed in the fiercest fighting and then abandoned so he will be killed. The murder is committed, the cover-up succeeds, and David takes Bathsheba as his wife. The chapter's final sentence is the narrator's judgment: "But the thing David had done displeased the Lord."`,
    significance: `This chapter is the moral pivot of the entire David narrative and arguably one of the most important chapters in the Hebrew Bible. It shatters any illusion that being chosen by God immunizes a person from moral catastrophe. The man after God's own heart commits adultery, manipulates a loyal soldier, orchestrates a murder, and covers it all up — not in a moment of passion but through a calculated sequence of decisions spanning days or weeks.

The text's refusal to give Bathsheba dialogue or agency is itself the point: the narrator is showing us what royal power does to people. Bathsheba is not a character in this chapter; she is an object of David's desire and David's power. The asymmetry is the indictment. The king who showed hesed to Mephibosheth treats Bathsheba as a commodity and Uriah as a disposable asset. Power has revealed what was always possible inside the human heart.`,
    relationalNote: `The David-Uriah dynamic is one of the most morally disturbing relationships in Scripture. Uriah is not a stranger; he is one of David's "mighty men," an elite warrior who has risked his life for David's kingdom. David's betrayal is not just adultery and murder — it is a betrayal of the deepest bonds of military loyalty. Uriah's refusal to go home while his comrades fight is a rebuke David never hears, because David has already decided Uriah must die. The man of greater integrity is killed by the man of greater power.`,
    conceptualNote: `The narrator's technique in this chapter is masterful restraint. There is no editorializing, no moralizing, no commentary until the final sentence. The events are reported as facts: David saw, David sent, David took, David wrote. The accumulation of verbs creates an escalation that the reader can see clearly but David apparently cannot — or will not. This narrative strategy forces the reader into the role of moral witness: you are watching a good man make terrible choices, and the text trusts you to see it for what it is without being told.`,
    climateNote: `"In the spring, at the time when kings go off to war" refers to the dry season following the latter rains, when roads were passable, fields were harvested (reducing the economic impact of mustering troops), and the weather favored military campaigns. David's decision to remain in Jerusalem during campaign season is conspicuous: the king is in the capital when he should be with his army. The rooftop from which he sees Bathsheba reflects typical Levantine architecture — flat roofs used as living space in the warm months, offering views across the densely built city. The palace, situated on the highest ground, would have overlooked neighboring rooftops.`,
    modernParallel: `This is the #MeToo narrative of the Hebrew Bible, and the text does not flinch from it. A man with unchecked institutional power sees a woman, learns she is the wife of his employee, summons her to his residence, and sleeps with her. The power differential makes consent functionally impossible. Bathsheba is not asked; she is taken. The modern parallels are painfully obvious: the boss who "has an affair" with the intern, the pastor who "falls into sin" with a congregant, the executive who "makes a mistake" with a subordinate. The language of mutuality obscures the reality of coercion. The text refuses that language. David sent. David took.

The cover-up is equally recognizable. When the consequences arrive, the powerful person does not confess; they manage. David's sequence — recall Uriah, get him drunk, and finally arrange his death — is the ancient equivalent of the modern institutional cover-up: first try to make the problem go away quietly, then escalate to more drastic measures, each step requiring a deeper moral compromise than the last. The first step makes the second possible. The second makes the third thinkable. By the time David writes the letter, he is so deep in self-deception that murdering a loyal soldier seems like the only option.

The passage also speaks to the corruption of isolation. David stayed home when he should have been at war. He was idle, unsupervised, and unchecked. The greatest king in Israel's history was most dangerous to himself and others when he was alone with his power and his appetites. This is a warning to every person in authority: the structures that keep you accountable are not restrictions on your freedom; they are protections for your soul.`,
    keyQuestions: JSON.stringify([
      "What is the significance of the narrator's note that David stayed in Jerusalem 'at the time when kings go off to war'?",
      "Does Bathsheba have any meaningful agency in this narrative, and what does her silence tell us about the nature of power?",
      "How does David's treatment of Uriah compare to his earlier treatment of Mephibosheth, and what does this reveal about the corrosive effect of unchecked power?",
      "Why does Uriah refuse to go home, and how does his integrity function as an implicit rebuke of David?",
      "What does the escalation from adultery to cover-up to murder reveal about the psychology of moral compromise?",
      "How should we read this passage in light of contemporary conversations about power, consent, and abuse?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The time when kings go off to war: what happens when leaders abandon their post", target_audience: "Leaders and people in authority", primary_theme: "Accountability and responsibility" },
      { angle: "He sent, he took: naming abuse of power for what it is", target_audience: "Communities addressing power imbalance and abuse", primary_theme: "Power, consent, and justice" },
      { angle: "The Uriah letter: how cover-ups escalate from bad to monstrous", target_audience: "General congregation", primary_theme: "The psychology of moral compromise" },
      { angle: "The silence of Bathsheba: hearing the voices that power erases", target_audience: "Survivors of abuse; advocates", primary_theme: "Seeing the unseen" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 11:1-27. Cross-referenced with scholarly commentary on the Succession Narrative and feminist readings of the Bathsheba account."
  },

  // ── 8. Nathan Confronts David (12:1-25) ─────────────────────────────
  {
    id: "2sa-nathan-confronts-david",
    title: "Nathan Confronts David",
    bookId: "2SA",
    chapterStart: 12,
    verseStart: 1,
    chapterEnd: 12,
    verseEnd: 25,
    summary: `The prophet Nathan comes to David with a story about a rich man with vast flocks who steals a poor man's only lamb — a beloved pet that "ate from his food, drank from his cup, and even slept in his arms" — to serve to a guest. David's response is immediate and furious: "As surely as the Lord lives, the man who did this must die! He must pay for that lamb four times over, because he did such a thing and had no pity." David the judge has convicted himself. Nathan delivers the devastating punchline: "You are the man."

Nathan then speaks God's judgment directly. David, who was given everything — the kingdom, Saul's wives, the house of Israel and Judah — took the one thing that belonged to another. The consequences will be severe and specific: the sword will never depart from David's house, someone close to him will violate his wives in public view, and the child conceived with Bathsheba will die. David's response, for once, is immediate and unhedged: "I have sinned against the Lord." No excuses, no deflection, no blame-shifting. Nathan responds: "The Lord has taken away your sin. You are not going to die."

The child becomes ill and David fasts, weeps, and lies on the ground for seven days, pleading with God to spare the boy. The child dies anyway. David's servants are afraid to tell him, but when he learns the truth, he gets up, washes, changes his clothes, and goes to worship. His response baffles his household: "While the child was still alive, I fasted and wept... But now that he is dead, why should I go on fasting? Can I bring him back again? I will go to him, but he will not return to me." Afterward, David comforts Bathsheba, and she bears another son: Solomon, whom the Lord loves.`,
    significance: `Nathan's confrontation is the gold standard for prophetic truth-telling. He does not storm in with accusations; he tells a story that bypasses David's defenses and allows the king to judge himself before revealing that the king is the defendant. This is not manipulation; it is pastoral genius. Nathan understands that power insulates people from direct confrontation, so he uses narrative to create a space where David can see clearly before his defenses engage.

David's repentance is also remarkable in its completeness. "I have sinned against the Lord" — five words, no qualifiers. In a world where powerful people reflexively blame circumstances, subordinates, or victims, David's confession is starkly honest. The consequences are not removed — the child dies, the sword will haunt his house for generations — but the relationship with God is restored. This is the biblical pattern of grace: forgiveness does not eliminate consequences, but it does restore communion.`,
    relationalNote: `The Nathan-David relationship is one of the most important in Scripture. Nathan is David's court prophet — he depends on David's patronage, lives in David's capital, and serves at David's pleasure. And yet he walks into the king's presence and says, "You are the man." This requires extraordinary courage, because prophets who confront kings in the ancient Near East often end up dead. Nathan's willingness to risk his life to tell the truth, and David's willingness to hear it, represent the highest expression of the prophetic-royal relationship: power that is accountable to truth.`,
    conceptualNote: `The death of the child raises agonizing theological questions that the text does not resolve. David repents fully and God forgives him, but the child dies anyway. The consequences of sin fall on the innocent. This is not presented as fair or as a theological principle to be applied universally — it is presented as a specific act of divine judgment within a specific narrative. The text's refusal to generalize is important: it does not say all children die because of their parents' sins. It says this child died as a consequence of this sin, within the context of this covenant. The tension is meant to remain unresolved, a wound in the narrative that mirrors the wound in the world.`,
    climateNote: `David's seven-day fast and vigil on the ground would have taken place in the royal quarters of Jerusalem, likely during the warmer months (the campaign against Ammon was ongoing). Lying on the ground in a Jerusalem summer, refusing food and water for days, would have been physically dangerous. The servants' fear that David might harm himself if told of the child's death reflects a realistic concern about dehydration, exhaustion, and grief-induced collapse in the warm, dry conditions of the Judean highlands.`,
    modernParallel: `Nathan's parable is the template for every intervention, every courageous conversation, every truth spoken to power. The genius is the indirect approach: Nathan does not begin with "You committed adultery and murdered Uriah." He begins with a story that engages David's moral imagination before David realizes he is the subject. This technique — using narrative to bypass defensive walls — is used by the best therapists, the most effective preachers, and the wisest friends. It works because it invites the person to judge from outside themselves before asking them to look within.

David's pattern of behavior in this chapter — immediate repentance followed by devastating loss followed by worship — is profoundly disorienting to modern sensibilities. We expect either that repentance should remove consequences (the prosperity gospel version) or that consequences prove God has not forgiven (the shame-based version). David inhabits neither framework. He accepts both forgiveness and consequence simultaneously. He grieves the child's death without accusing God of unfairness. He worships after loss without pretending the loss didn't happen. This is mature faith, and it looks nothing like the triumphalism or the despair that pass for faith in most contemporary contexts.

The birth of Solomon at the end of the chapter is the narrative's quiet insistence that God's story does not end with judgment. The same relationship that produced catastrophe also produces the heir through whom God's purposes will advance. This is not a reward for repentance; it is a statement about God's refusal to abandon His purposes even when they run through the wreckage of human failure.`,
    keyQuestions: JSON.stringify([
      "Why does Nathan use a parable rather than a direct accusation, and what does this reveal about effective truth-telling?",
      "What is the significance of David's immediate, unqualified confession — 'I have sinned against the Lord'?",
      "How do we reconcile God's forgiveness of David with the death of the child — does forgiveness not remove consequences?",
      "What does David's response to the child's death (worship instead of continued mourning) reveal about his theology?",
      "How does the birth of Solomon function in the narrative's theology of grace and judgment?",
      "What does the Nathan-David confrontation model for speaking truth to power in our own contexts?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "You are the man: the courage to confront and the grace to confess", target_audience: "Leaders and communities navigating accountability", primary_theme: "Prophetic truth-telling" },
      { angle: "Forgiveness and consequences: why grace does not mean the pain goes away", target_audience: "People dealing with the fallout of forgiven sin", primary_theme: "Grace and consequence" },
      { angle: "Getting up from the ground: worship after devastating loss", target_audience: "People in grief", primary_theme: "Faith in the face of loss" },
      { angle: "The parable approach: how stories bypass our defenses", target_audience: "Teachers, pastors, counselors", primary_theme: "The power of narrative" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 12:1-25. Cross-referenced with scholarly commentary on prophetic confrontation and the Nathan oracle."
  },

  // ── 9. Amnon and Tamar (13:1-39) ────────────────────────────────────
  {
    id: "2sa-amnon-and-tamar",
    title: "Amnon and Tamar",
    bookId: "2SA",
    chapterStart: 13,
    verseStart: 1,
    chapterEnd: 13,
    verseEnd: 39,
    summary: `Amnon, David's firstborn son, becomes obsessed with his half-sister Tamar. The text is careful with language: Amnon "loved" Tamar, but the love described is possessive, consuming, and focused entirely on what Amnon wants. His cousin Jonadab devises a plan: Amnon feigns illness and asks David to send Tamar to his quarters to prepare food for him. David, inexplicably, agrees — sending his daughter into his son's private chambers despite what should have been obvious warning signs.

When Tamar arrives, Amnon sends away the servants, grabs her, and demands she sleep with him. Tamar's response is one of the most articulate pleas in the Hebrew Bible: she appeals to moral law ("Don't do this wicked thing"), to social consequence ("Where could I get rid of my disgrace?"), and even offers a potential legitimate path ("Speak to the king; he will not keep me from being married to you"). She is reasoning, negotiating, trying every argument available to a woman with no physical power against a man who has already decided. None of it works. "He was stronger than she, and he raped her."

What follows is psychologically devastating. The text says Amnon's hatred for Tamar after the rape was greater than the love he had felt before it. He orders her thrown out of his chambers. Tamar tears her royal robe — the garment that marks her as a virgin princess — puts ashes on her head, and goes away weeping. She goes to her brother Absalom's house, where she lives "a desolate woman." And David? David "was furious." But he did nothing. His anger is impotent because he is morally compromised — the man who took Bathsheba has no standing to punish Amnon for taking Tamar. Absalom waits two years, then murders Amnon at a sheep-shearing festival, and flees to his maternal grandfather in Geshur.`,
    significance: `This chapter is the narrative fulfillment of Nathan's prophecy that the sword would never depart from David's house. The sin that David committed in secret — taking a woman and destroying a man — now erupts within his own family in horrifyingly parallel form. Amnon takes Tamar; David had taken Bathsheba. The difference is that David at least married Bathsheba and provided for her; Amnon uses Tamar and throws her away. The sins of the father metastasize in the children.

The text's treatment of Tamar is extraordinary in its refusal to blame the victim. The narrator gives Tamar more dialogue than Bathsheba, more agency, more voice. Her arguments are cogent, her resistance is clear, and the narrator explicitly states that Amnon overpowered her. There is no ambiguity about what happened and no suggestion that Tamar was complicit. In a literary world where women's perspectives are rarely centered, this chapter centers Tamar's experience with startling clarity.`,
    relationalNote: `David's inaction after the rape is the most damaging element of the entire narrative. He is "furious" but does nothing. The text offers no explanation, but the implication is clear: David's own sexual sin has stripped him of moral authority. How can the man who took Bathsheba punish the son who took Tamar? This paralysis is the truest consequence of David's sin — not the death of a child or the loss of a battle, but the inability to protect his own daughter because his own guilt has disarmed him. Tamar is failed not just by Amnon's violence but by David's silence.`,
    conceptualNote: `The Amnon-Tamar narrative demolishes the modern tendency to spiritualize biblical "love." What Amnon feels for Tamar is called "love" in the Hebrew, but it is entirely self-referential: it is about what Amnon wants, what Amnon feels, what Amnon craves. The moment he has what he wants, the "love" transforms into hatred. This is desire masquerading as love — acquisitive, consuming, and ultimately destructive. The text's unflinching portrayal of this dynamic is a corrective to any theology that treats sexual desire as inherently neutral or private.`,
    climateNote: `The sheep-shearing festival at Baal-Hazor (about 25 kilometers north of Jerusalem, in the Ephraimite highlands) was a major agricultural celebration. Sheep-shearing typically took place in the spring, when warmer weather made the work feasible and the wool could be processed and traded. These festivals involved feasting, drinking, and social gathering, making them ideal cover for Absalom's planned assassination of Amnon. The remote location — away from Jerusalem and David's immediate oversight — was strategically chosen.`,
    modernParallel: `This chapter reads like a case study from a modern sexual assault advocacy organization. The grooming process (Jonadab's plan), the manipulation of institutional authority (David unknowingly sends Tamar into danger), the victim's clear verbal resistance, the physical overpowering, the post-assault rejection, the victim's visible grief, the institutional failure to respond (David's inaction), and the desolation that follows — every element maps directly onto patterns that advocates describe in contemporary cases.

The failure of the father is particularly devastating. In families, churches, and institutions where sexual violence occurs, the response of the authority figure is often more damaging than the assault itself. When the person with power to intervene is "furious" but does nothing, the victim receives a second message: what happened to you matters less than the cost of addressing it. David's silence tells Tamar that her violation is less important than the political complications of punishing the crown prince. This is the same calculation made by every institution that suppresses reports of abuse to protect its reputation.

Absalom's eventual murder of Amnon is not justice; it is vengeance born of a vacuum. When the legitimate authority fails to act, someone else will — and the result is always worse than proper justice would have been. This pattern repeats endlessly: in families where abuse is ignored until a sibling takes violent retribution, in communities where injustice festers until it explodes, in societies where courts fail and vigilantes rise. David's failure to act does not prevent violence; it guarantees it.`,
    keyQuestions: JSON.stringify([
      "What is the difference between Amnon's 'love' for Tamar and genuine love, and how does the text make this distinction clear?",
      "Why does David send Tamar to Amnon's quarters, and what does this reveal about his awareness (or denial) of the danger?",
      "How does the narrator center Tamar's voice and agency in a culture that typically marginalized women's perspectives?",
      "Why does David do nothing after the rape, and how does his inaction relate to his own sexual sin?",
      "Is Absalom's murder of Amnon an act of justice or vengeance, and what is the difference?",
      "What does this passage teach about institutional responses to sexual violence?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When the father does nothing: the devastating cost of leadership silence in the face of abuse", target_audience: "Church leaders and institutional leaders", primary_theme: "Institutional accountability" },
      { angle: "Tamar's voice: hearing the victim when power refuses to listen", target_audience: "Communities addressing sexual violence", primary_theme: "Justice for the vulnerable" },
      { angle: "Love that devours: the difference between desire and genuine love", target_audience: "Young adults; dating and marriage contexts", primary_theme: "Authentic vs. exploitative love" },
      { angle: "The desolate woman: what happens to survivors when justice is withheld", target_audience: "Survivors and their advocates", primary_theme: "Lament and restoration" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 13:1-39. Cross-referenced with scholarly commentary on the Succession Narrative and feminist analysis of Tamar's characterization."
  },

  // ── 10. Absalom's Rebellion (14:1–18:33) ────────────────────────────
  {
    id: "2sa-absaloms-rebellion",
    title: "Absalom's Rebellion",
    bookId: "2SA",
    chapterStart: 14,
    verseStart: 1,
    chapterEnd: 18,
    verseEnd: 33,
    summary: `Absalom's coup against David is not a sudden explosion but a slow burn ignited by David's failure to act after Tamar's rape and sustained by Absalom's charisma, political cunning, and legitimate grievance. After three years in exile following Amnon's murder, Absalom is brought back to Jerusalem through Joab's manipulation but is barred from the king's presence for two more years. When father and son finally meet, David kisses Absalom, but the reconciliation is surface-level — the underlying issues are never addressed.

Absalom then spends four years systematically undermining David's authority. He stations himself at the city gate, intercepts petitioners seeking justice, and tells them: "Your claims are valid, but there is no representative of the king to hear you... If only I were appointed judge in the land!" He is handsome, populist, and strategically patient. He "stole the hearts of the people of Israel." When the coup finally comes, it is devastating in its completeness. David flees Jerusalem barefoot and weeping, crossing the Kidron Valley in a scene that prefigures Jesus' own departure from the city.

The war that follows is fought in the forest of Ephraim, where Absalom's forces are routed. Absalom himself, riding through the dense oak forest, gets his head caught in a tree. Joab, defying David's explicit order to "deal gently with the young man Absalom," finds him hanging alive and drives three javelins through his heart. David's response when he hears the news is the most anguished cry in the Hebrew Bible: "O my son Absalom! My son, my son Absalom! If only I had died instead of you — O Absalom, my son, my son!"`,
    significance: `Absalom's rebellion is the direct consequence of David's failures: the Bathsheba affair stripped David of moral authority, and his inaction after Tamar's rape destroyed his credibility as a just ruler. Absalom's critique of David — that the king is not providing justice — is accurate. The rebellion is not pure ambition; it is fueled by a real vacuum of leadership that David created through his own moral collapse. This makes the narrative heartbreaking rather than simple: the father is wrong, the son's grievance is legitimate, and the result is catastrophe for everyone.

The theological dimension is equally devastating. David's departure from Jerusalem echoes Israel's exodus in reverse — the king is going into exile from the city of God. The narrative is structured as a near-complete deconstruction of everything David built: the capital is lost, the throne is usurped, the family is shattered. And yet David's faith remains. On the Mount of Olives, weeping and barefoot, David submits to God's will: "If I find favor in the Lord's eyes, he will bring me back... But if he says, 'I am not pleased with you,' then I am ready; let him do to me whatever seems good to him."`,
    relationalNote: `The David-Absalom relationship is the tragic center of 2 Samuel. David loves Absalom deeply but has failed him catastrophically — first by not punishing Amnon for raping Tamar, then by exiling Absalom for the retaliatory murder, then by bringing him back to Jerusalem but refusing to see him for two years. Every interaction is marked by David's inability to combine love with justice, tenderness with truth. He either avoids the relationship entirely or performs superficial gestures of reconciliation that address nothing. Absalom's rage is the rage of a son who knows his father loves him but cannot trust his father to do the right thing.`,
    conceptualNote: `The image of Absalom caught in the oak tree — suspended between heaven and earth, alive but unable to move — has fascinated interpreters for millennia. In the immediate narrative, it represents the futility of rebellion against God's anointed. But it also represents something more personal: a young man trapped between his father's love and his father's failures, between legitimate grievance and illegitimate ambition, between life and death. Joab's decision to kill Absalom against David's orders is both a military necessity and a moral violation — and the text refuses to resolve which one matters more.`,
    climateNote: `The forest of Ephraim, where the decisive battle occurs, was likely in the Transjordan (despite the name suggesting a location west of the Jordan) — a hilly, densely wooded region where thick oak and terebinth forests made large-scale cavalry and chariot warfare impossible. The text notes that "the forest swallowed up more men that day than the sword" — an observation about terrain lethality that military historians confirm. Dense woodland favors the smaller, more familiar force (David's veterans) against a larger but less experienced army (Absalom's recruits). The oak that trapped Absalom was characteristic of these Transjordanian forests.`,
    modernParallel: `Absalom's rebellion is the anatomy of an organizational split, and it begins not with the rebel but with the leader's failure. In every church split, every boardroom coup, every political insurgency, there is usually a legitimate grievance that the incumbent leader failed to address. The challenger rises because the leader created a vacuum. Absalom's whispered conversations at the gate — "If only I were in charge, things would be different" — are the same conversations that happen in parking lots after board meetings, in break rooms after all-hands, in group chats after church services. The challenger tells people what they already feel, and the incumbent discovers too late that loyalty cannot survive the absence of justice.

David's flight from Jerusalem is a masterclass in how quickly everything can unravel. A kingdom built over decades collapses in days. This is the experience of every leader who has faced a sudden, comprehensive loss of authority — whether through scandal, organizational failure, or simply the accumulation of unaddressed problems. The speed of the collapse is proportional to the depth of the rot.

David's grief over Absalom — "If only I had died instead of you" — is the grief of every parent who watches a child self-destruct and knows, at some level, that their own failures contributed to it. It is not the grief of innocence; it is the grief of complicity. David does not blame Absalom. He does not rage at God. He simply wishes he could have traded his life for his son's. This is the rawest, most unfiltered expression of parental love in the Bible — and it comes from a man who failed his son in almost every way a father can fail.`,
    keyQuestions: JSON.stringify([
      "How does David's failure to address Tamar's rape and Amnon's crime create the conditions for Absalom's rebellion?",
      "Is Absalom's rebellion purely ambitious, or does he have legitimate grievances — and does the answer change the moral calculus?",
      "What does David's response on the Mount of Olives reveal about his faith in the midst of catastrophic loss?",
      "Why does Joab kill Absalom against David's explicit orders, and how should we evaluate his decision?",
      "What does David's cry — 'O my son Absalom!' — reveal about the relationship between parental love and parental failure?",
      "How does the structure of this narrative (slow buildup, sudden collapse) reflect the way leadership failures typically unfold?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The gate whisperer: how unaddressed failures create space for insurgency", target_audience: "Organizational leaders", primary_theme: "Accountability and institutional health" },
      { angle: "Barefoot on the Mount of Olives: faith in the midst of total loss", target_audience: "People experiencing devastating reversal", primary_theme: "Surrender and trust" },
      { angle: "The father who failed: parental love that cannot undo parental mistakes", target_audience: "Parents processing guilt and grief", primary_theme: "Parental grief and grace" },
      { angle: "Caught in the tree: when you are trapped between grievance and ambition", target_audience: "People wrestling with anger at authority", primary_theme: "Justice vs. vengeance" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 14:1–18:33. Cross-referenced with scholarly commentary on the Succession Narrative and the theological significance of David's exile."
  },

  // ── 11. David Mourns Absalom (18:33–19:8) ───────────────────────────
  {
    id: "2sa-david-mourns-absalom",
    title: "David Mourns Absalom",
    bookId: "2SA",
    chapterStart: 18,
    verseStart: 33,
    chapterEnd: 19,
    verseEnd: 8,
    summary: `The victory celebration never happens. David's army has won a decisive battle, saved the kingdom, and defeated the usurper — but the king is locked in an upper chamber, sobbing: "O my son Absalom! My son, my son Absalom! If only I had died instead of you — O Absalom, my son, my son!" The soldiers who risked their lives to restore David's throne slink back into the city "as men steal in who are ashamed when they flee from battle." A day of victory has been turned into a day of mourning because the king's private grief has overwhelmed his public responsibility.

Joab, brutal and pragmatic as always, confronts David with a harsh truth: "You love those who hate you and hate those who love you. You have made it clear today that the commanders and their men mean nothing to you." Joab tells David that if he does not come out and acknowledge his soldiers, every one of them will desert by nightfall — and that loss will be worse than anything David has suffered in his entire life. It is a cruel speech, and it is entirely correct.

David pulls himself together and takes his seat at the city gate. The troops file past, and the kingdom is preserved. But the passage leaves us with an unbearable tension: the king's duty requires him to suppress his grief, and the father's heart requires him to express it. Both are true. Neither cancels the other. David sits at the gate and does what must be done, but the reader knows what it costs him.`,
    significance: `This compact passage is one of the most psychologically acute scenes in ancient literature. It captures the impossible tension between private grief and public duty that defines leadership in crisis. David is not wrong to grieve his son. Joab is not wrong to insist that the king must function. The tragedy is that the situation demands both and allows neither to be fully expressed. David's grief is real; his duty is real; and the conflict between them has no clean resolution.

The passage also completes the arc of David's fatherhood. He failed Tamar by doing nothing. He failed Absalom by alternating between exile and surface reconciliation. And now, in death, Absalom finally receives from David the one thing he never got in life: unconditional, agonized, total love. The cruelest irony of the David narrative is that David's love for his children was always real — he simply could never translate it into the justice, discipline, and presence they needed while they were alive.`,
    relationalNote: `The Joab-David dynamic reaches its peak tension here. Joab is the one who killed Absalom against David's orders, and now Joab is the one telling David to stop grieving the son Joab murdered. The audacity is staggering, but so is the accuracy. Joab sees what David cannot: that a king who mourns the enemy's death while ignoring his own army's sacrifice will lose the army. Joab's relational instincts are correct even when his methods are brutal. This is the tragedy of their partnership: David needs Joab's ruthlessness and resents it; Joab provides what David needs and is never thanked for it.`,
    conceptualNote: `The passage raises a profound question about the relationship between emotion and responsibility. Modern Western culture tends to privilege authentic feeling over institutional duty — "follow your heart" is our highest moral axiom. Ancient Near Eastern culture tended toward the opposite: the king's role supersedes the king's feelings. The biblical text inhabits neither framework comfortably. It validates David's grief by recording it in devastating detail. It also validates Joab's rebuke by showing that David's grief, unchecked, will destroy the kingdom. The text's refusal to choose sides is its deepest wisdom.`,
    climateNote: `The "upper room" where David mourns was likely part of the gate complex at Mahanaim, David's temporary capital in the Transjordan. Gate chambers in this region were typically built with thick stone walls that provided insulation from both heat and cold, creating relatively private spaces within otherwise public structures. The soldiers returning to the city would have passed through the gate area — making David's absence from the gate all the more conspicuous and demoralizing.`,
    modernParallel: `Every leader who has suffered a private loss during a public crisis knows exactly what David is feeling. The CEO whose parent dies during a corporate turnaround. The pastor who receives a cancer diagnosis during a church capital campaign. The military officer who learns of a family tragedy while commanding troops in the field. The institution needs the leader to function, and the leader needs to grieve, and there is no schedule that accommodates both.

Joab's confrontation — "You love those who hate you and hate those who love you" — is the kind of truth that only someone with nothing left to lose will deliver. It is the intervention that saves the kingdom at the cost of the king's emotional honesty. In modern terms, it is the chief of staff who tells the grieving president to get back to the Oval Office, the board member who tells the bereaved founder to show up at the shareholder meeting, the friend who says what no one else will say: your pain is real, and right now it is destroying the people who stood by you.

The passage offers no resolution because there is none. It simply shows a man doing two contradictory things at once: mourning his son and governing his kingdom. The image of David sitting at the gate — dutiful, present, and broken — is the image of every leader who has ever had to function while falling apart. The text does not celebrate this or condemn it. It simply witnesses it.`,
    keyQuestions: JSON.stringify([
      "Is David wrong to grieve so publicly, or is Joab wrong to demand he stop — and can both be true simultaneously?",
      "What does Joab's confrontation reveal about the tension between private emotion and public responsibility?",
      "How does David's grief for Absalom illuminate the failures of their relationship during Absalom's life?",
      "What does the soldiers' reaction — slinking back 'as men steal in who are ashamed' — tell us about the impact of a leader's emotional state on an organization?",
      "Is there a way to honor both private grief and public duty, or does one always come at the expense of the other?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Sitting at the gate while falling apart: leading through unresolved grief", target_audience: "Leaders carrying private pain", primary_theme: "Duty and grief" },
      { angle: "You love those who hate you: when someone tells you the truth you need but cannot bear", target_audience: "People resisting necessary confrontation", primary_theme: "Painful truth" },
      { angle: "The love that came too late: when death reveals what life concealed", target_audience: "Parents with estranged children", primary_theme: "Parental love and regret" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 18:33–19:8. Cross-referenced with scholarly commentary on the David-Joab dynamic and the psychology of leadership grief."
  },

  // ── 12. Rizpah's Vigil (21:1-14) ────────────────────────────────────
  {
    id: "2sa-rizpahs-vigil",
    title: "Rizpah's Vigil",
    bookId: "2SA",
    chapterStart: 21,
    verseStart: 1,
    chapterEnd: 21,
    verseEnd: 14,
    summary: `A three-year famine grips Israel, and David inquires of the Lord. The answer is startling: the famine is because of Saul, who massacred the Gibeonites in violation of the ancient treaty Joshua had made with them. The Gibeonites, when asked what will make amends, demand the execution of seven of Saul's descendants. David agrees, handing over two sons of Rizpah (Saul's concubine) and five sons of Merab (Saul's daughter). They are killed and their bodies exposed on a hillside at the beginning of the barley harvest.

What follows is one of the most haunting scenes in all of Scripture. Rizpah, the mother of two of the dead men, takes sackcloth and spreads it on a rock near the bodies. She stays there from the beginning of harvest until the rains come — a period of months. She guards the bodies day and night, driving away the birds by day and the wild animals by night. She cannot bring her sons back. She cannot undo the political machination that killed them. She can only refuse to let their bodies be desecrated. So she sits on a rock and keeps vigil, alone, for months.

When David hears what Rizpah has done, he is moved to action. He retrieves the bones of Saul and Jonathan from Jabesh-Gilead, gathers the remains of the seven executed men, and gives them all a proper burial in the family tomb. After the burial, "God answered prayer on behalf of the land." Rizpah's wordless protest accomplishes what political negotiation, military power, and royal authority could not: it shames the king into doing the right thing.`,
    significance: `Rizpah's vigil is one of the most powerful acts of protest in the Bible — and she never speaks a word. She has no political power, no army, no court prophet to plead her case. She is a concubine, a woman whose social standing derived entirely from a dead king. And yet her silent, relentless presence on that hillside compels David — the most powerful man in Israel — to act. The passage insists that moral authority does not require institutional power. Sometimes the most forceful statement is a body that simply refuses to move.

The larger passage raises deeply troubling questions about collective punishment and the theology of inherited guilt. The seven men who die are not personally guilty of Saul's crime against the Gibeonites. They are executed because of their family connection to the perpetrator. The text does not celebrate this arrangement; it presents it as a grim political reality. But Rizpah's vigil redeems the passage from being merely a record of state violence by centering the cost on the human beings who bear it.`,
    relationalNote: `Rizpah's relationship to her sons is defined by a single, terrible constraint: she cannot save them, but she can honor them. Her vigil is the act of a mother who has exhausted every other option and has only her physical presence left to give. This is the love of every parent who sits beside a dying child, every family member who keeps vigil at a hospital bed, every mother who refuses to leave the site where her child was killed. It is love stripped of all power except the power to be present.`,
    conceptualNote: `The passage sits uneasily in any neat theological framework. God attributes the famine to Saul's violation of the Gibeonite treaty, implying that corporate sin has corporate consequences that persist across generations. The Gibeonites demand blood atonement, and David complies. The executed men are, by any modern standard, innocent of the crime for which they die. The text does not resolve these tensions — it presents them as the raw moral data of a world where injustice, atonement, and political power are tangled together in ways that resist easy systematization. Rizpah's vigil is the human response to a system that grinds individuals into political currency.`,
    climateNote: `Rizpah's vigil spans from the beginning of the barley harvest (April-May) until the autumn rains (October-November) — roughly five to six months. During this period, the Judean highlands experience intense summer heat with temperatures regularly exceeding 30°C, no rainfall whatsoever (the dry season is absolute), and strong UV exposure on the exposed hillside. The birds she drove away would have included vultures, ravens, and other carrion birds common to the region. The wild animals would have included jackals and possibly hyenas. Rizpah endured all of this on an exposed rock, with only sackcloth for shelter. The physical toll of this vigil would have been extreme.`,
    modernParallel: `Rizpah is the ancestor of every mother who has kept vigil at the site of injustice. She is the Mothers of the Plaza de Mayo in Buenos Aires, walking silently in circles every Thursday for decades, demanding accountability for their "disappeared" children. She is Mamie Till, who insisted on an open casket so the world could see what was done to her son Emmett. She is the mothers in Mexico who dig in mass graves searching for their missing children. She is every parent who has placed flowers at a roadside memorial, stood outside a courthouse demanding justice, or simply refused to let the world forget.

Rizpah's power derives not from any institutional authority but from the moral force of a mother's refusal to abandon her children even in death. She cannot change the political calculation that killed her sons. She cannot reverse the king's decision. She can only sit on a rock and refuse to leave. And that refusal — wordless, exhausting, sustained over months — eventually moves the most powerful man in the nation to act. The lesson is not that silent protest always works. The lesson is that moral witness has a power that political systems cannot account for and cannot ultimately ignore.

David's response — collecting the bones, providing proper burial — is the response of a conscience that has been shamed into action. He did the wrong thing (handing over the seven men) for defensible reasons (appeasing the Gibeonites, ending the famine), and Rizpah's vigil forces him to reckon with the human cost of his political decision. This is the function of prophetic witness in every age: not to reverse decisions that have already been made, but to ensure that the people who bear the cost are not forgotten.`,
    keyQuestions: JSON.stringify([
      "How do we evaluate the morality of executing seven men for a crime committed by their ancestor — is this justice, collective punishment, or something else?",
      "What does Rizpah's silent vigil accomplish that speech, political action, or military power could not?",
      "Why does the narrator include this deeply troubling passage in the David narrative, and what does it reveal about the costs of political power?",
      "How does Rizpah's story speak to modern movements led by mothers seeking justice for their children?",
      "What does David's eventual response to Rizpah's vigil reveal about the power of sustained moral witness?",
      "How do we hold this passage alongside the rest of 2 Samuel's theology of a just God?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The mother on the rock: when all you have left is your presence", target_audience: "People enduring prolonged grief or injustice", primary_theme: "Faithful presence" },
      { angle: "Rizpah and the Mothers of the Plaza: the moral power of refusing to forget", target_audience: "Justice-oriented communities", primary_theme: "Prophetic witness" },
      { angle: "When the state needs a body: the human cost of political calculations", target_audience: "Citizens and leaders wrestling with systemic injustice", primary_theme: "Justice and power" },
      { angle: "The vigil that moved the king: how silent witness shames power into action", target_audience: "Activists and advocates", primary_theme: "Nonviolent resistance" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 21:1-14. Cross-referenced with scholarly commentary on Rizpah's characterization and parallels to modern protest movements."
  },

  // ── 13. David's Census (24:1-25) ────────────────────────────────────
  {
    id: "2sa-davids-census",
    title: "David's Census and the Threshing Floor",
    bookId: "2SA",
    chapterStart: 24,
    verseStart: 1,
    chapterEnd: 24,
    verseEnd: 25,
    summary: `The final chapter of 2 Samuel opens with one of the most theologically perplexing sentences in the Bible: "Again the anger of the Lord burned against Israel, and he incited David against them, saying, 'Go and take a census of Israel and Judah.'" (The Chronicler, writing later, attributes the incitement to Satan rather than to God — a theological correction that reveals how deeply uncomfortable this verse made later readers.) Whatever the source, David orders a census, and even Joab — not known for his moral sensitivity — pushes back: "May the Lord your God multiply the troops a hundred times over. But why does my lord the king want to do such a thing?" David overrules him.

The census takes nine months and twenty days. When it is complete, David is immediately convicted: "I have sinned greatly in what I have done." The prophet Gad offers David a choice of three punishments: three years of famine, three months of fleeing from enemies, or three days of plague. David chooses the plague, reasoning: "Let us fall into the hands of the Lord, for his mercy is great. Do not let me fall into human hands." The plague kills seventy thousand people. When the destroying angel reaches the threshing floor of Araunah the Jebusite, overlooking Jerusalem, God says, "Enough! Withdraw your hand."

David sees the angel and begs God to punish him, not the people: "I am the one who has sinned and done wrong. These are but sheep. What have they done? Let your hand fall on me and my family." Gad tells David to build an altar on Araunah's threshing floor. Araunah offers the site for free, but David insists on paying: "I will not sacrifice to the Lord my God burnt offerings that cost me nothing." He buys the threshing floor, builds the altar, and offers sacrifices. The plague stops. The threshing floor of Araunah will become the site of Solomon's Temple — the place where heaven and earth meet, the place where sacrifice atones for sin.`,
    significance: `This passage serves as the theological capstone of 2 Samuel, bringing together all the book's major themes: the tension between divine sovereignty and human responsibility, the reality that a leader's sin has communal consequences, the necessity of genuine sacrifice, and the hope that even catastrophic failure can become the foundation for something holy. The threshing floor that witnessed plague and death becomes the site of the Temple — the place of atonement, worship, and divine presence for centuries to come.

David's insistence on paying for the threshing floor — "I will not sacrifice to the Lord my God burnt offerings that cost me nothing" — is one of the most quoted lines in the Old Testament and one of the most challenging. It insists that worship which costs nothing is worth nothing. This is not transactional theology; it is a statement about the nature of genuine offering. If the sacrifice doesn't hurt, it isn't a sacrifice. David, who has spent the entire book learning what his sins cost, refuses to let his final act of worship be cheap.`,
    relationalNote: `David's prayer — "Let your hand fall on me and my family" — is the prayer of a leader who has finally accepted full responsibility for the consequences of his actions. Throughout 2 Samuel, David's sins have cost other people: Uriah, Bathsheba, Tamar, Amnon, Absalom, the seventy thousand who die in the plague. Here, at the end, David asks God to direct the cost toward himself rather than toward the people. It is too late — the damage is done — but the posture represents David's growth from the man who covered up Uriah's murder to a man willing to absorb the consequences of his own decisions.`,
    conceptualNote: `The census itself seems innocuous — what is wrong with counting your troops? — but the ancient understanding was that numbering the people represented a reliance on military strength rather than divine provision. A census was the act of a king who trusts in numbers rather than in God. It is also an assertion of ownership: to count is to claim. The people belong to God, not to David, and David's act of counting them is an implicit claim of sovereignty that belongs only to God. The sin is subtle, which makes it all the more dangerous — it is the sin of a man who has forgotten that his power is derivative, not original.`,
    climateNote: `The threshing floor of Araunah was located on Mount Moriah, the rocky hilltop just north of the City of David. Threshing floors in the ancient Near East were deliberately sited on exposed hilltops or ridges to catch the prevailing westerly winds that would separate wheat from chaff during the winnowing process. The location — elevated, wind-swept, with panoramic views of the surrounding terrain — was both agriculturally practical and symbolically powerful. This same hilltop, according to tradition, was where Abraham bound Isaac. It would become the site of the Temple, and later the Dome of the Rock. The threshing floor's transformation from agricultural workspace to sacred site is one of the most consequential land-use changes in human history.`,
    modernParallel: `David's census sin is the sin of metrics-driven leadership: the belief that if you can count it, you can control it. Every organization that reduces human beings to headcount, every church that measures success by attendance figures, every government that treats citizens as data points is conducting David's census. The sin is not in the counting itself but in the shift of trust — from the unquantifiable reality of God's provision to the measurable comfort of numerical superiority. The modern equivalent is the leader who checks the analytics dashboard before praying, who trusts the spreadsheet more than the Spirit, who confuses data with wisdom.

David's insistence on paying for the threshing floor is a rebuke to every form of cheap worship. The donation that comes from surplus, the service that costs no time, the prayer that risks no vulnerability, the generosity that never touches the principal — all of these are offerings that cost nothing. David's principle does not require poverty or masochism; it requires that worship involve genuine sacrifice. If you can give it without feeling the loss, it may be a transaction, but it is not an offering.

The transformation of the threshing floor into the Temple site is the book's final theological statement: God builds on the site of human failure. The place where plague struck becomes the place where atonement is made. The ground where sin was confronted becomes the ground where sin is forgiven. This is the pattern of the entire biblical narrative — God does not find clean ground for His purposes; He redeems contaminated ground. Every sanctuary is built on a threshing floor. Every place of worship was once a place of judgment. The hope of 2 Samuel is that the worst moments of human history can become, in God's hands, the foundations of something holy.`,
    keyQuestions: JSON.stringify([
      "Why is a census sinful — what does it reveal about David's shift in trust from God to military power?",
      "How do we reconcile God inciting David to take the census with David being punished for it?",
      "Why does David choose plague over famine or military defeat, and what does his reasoning reveal about his theology?",
      "What is the significance of David's prayer that the punishment fall on him rather than on the people?",
      "Why does David insist on paying for the threshing floor, and what does his statement about costless sacrifice mean for worship today?",
      "How does the transformation of the threshing floor into the Temple site encapsulate the theology of 2 Samuel?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "I will not offer that which costs me nothing: the demand for genuine sacrifice in worship", target_audience: "Worshiping communities", primary_theme: "Costly worship" },
      { angle: "The threshing floor theology: how God builds on the site of our greatest failures", target_audience: "People seeking redemption from past failures", primary_theme: "Redemption of broken places" },
      { angle: "The census temptation: trusting metrics over God", target_audience: "Leaders and organizations", primary_theme: "Trust and dependence on God" },
      { angle: "Let your hand fall on me: a leader who finally accepts the cost", target_audience: "Leaders wrestling with accountability", primary_theme: "Responsibility and intercession" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "Narrative unit generated via AI-assisted analysis of 2 Samuel 24:1-25. Cross-referenced with scholarly commentary on the census narrative and the theological significance of the Temple site."
  },
];
