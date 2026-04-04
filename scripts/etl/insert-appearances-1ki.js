const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // 1ki-solomons-wisdom (1KI 3:1-28)
  ['solomon','1KI',3,1,28,'protagonist','humble-then-wise','ask God for wisdom to govern','the quality of his entire reign','God offers Solomon anything and he asks for a discerning heart. Then he adjudicates two prostitutes and a baby with a sword','Being offered any perk at a new job and asking for the ability to do it well','scholarship'],

  // 1ki-building-the-temple (1KI 5:1-8:66)
  ['solomon','1KI',5,1,66,'protagonist','purposeful-devotion','build and dedicate the Temple','the permanent dwelling of God among Israel','Solomon prays at the dedication: will God really dwell on earth? The heavens cannot contain you, how much less this temple','Building something magnificent and knowing on opening day that it is still not big enough','scholarship'],
  ['hiram-king-of-tyre','1KI',5,1,66,'deuteragonist','commercial-friendship','supply cedar and craftsmen in exchange for grain and oil','trade alliance and mutual benefit','Hiram is a pagan king who helps build the LORD\'s temple. God uses whoever He wants','The outside contractor who does not share your mission but delivers exactly what you need','scholarship'],

  // 1ki-queen-of-sheba (1KI 10:1-13)
  ['solomon','1KI',10,1,13,'protagonist','magnificent','display his wisdom and wealth to the queen','international reputation','Solomon answers every question and the queen says the half was not told me. Peak glory','The TED talk that exceeds every expectation in the audience','scholarship'],
  ['queen-of-sheba','1KI',10,1,13,'deuteragonist','overwhelmed-admiration','test Solomon with hard questions','validating the rumors of his wisdom','She arrives with camels loaded with spices, gold, and precious stones, leaves breathless. The ultimate peer review','A venture capitalist who flies in skeptical and leaves writing a check','scholarship'],

  // 1ki-solomons-decline (1KI 11:1-43)
  ['solomon','1KI',11,1,43,'protagonist','compromised','love many foreign women and follow their gods','the covenant and the unity of the kingdom','Solomon\'s heart is turned by 700 wives and 300 concubines. The wisest man makes the dumbest choices','The brilliant founder who lets lifestyle creep erode everything they built','scholarship'],
  ['jeroboam','1KI',11,1,43,'deuteragonist','ambitious','receive the prophecy that he will rule ten tribes','political opportunity rising from Solomon\'s failure','Ahijah tears a cloak into twelve pieces and gives Jeroboam ten. A prop sermon that changes history','The middle manager who gets tapped to lead the spin-off company','scholarship'],

  // 1ki-kingdom-divides (1KI 12:1-24)
  ['rehoboam','1KI',12,1,24,'protagonist','arrogant-foolishness','assert dominance over the northern tribes','holding the united kingdom together','Rehoboam rejects the elders\' advice and listens to his frat brothers: my little finger is thicker than my father\'s waist','The new CEO who ignores experienced advisors and listens to yes-men, splitting the company','scholarship'],
  ['jeroboam','1KI',12,1,24,'deuteragonist','opportunistic','lead the northern secession','establishing his own kingdom','Jeroboam becomes king of the ten northern tribes by default. Rehoboam\'s stupidity is his kingmaker','Being handed the keys because the other candidate self-destructed in the interview','scholarship'],
  ['shemaiah-prophet','1KI',12,1,24,'witness','prophetic-restraint','stop Rehoboam from fighting the north','preventing civil war','Shemaiah says this is from the LORD, do not fight your brothers. The split is God\'s judgment not just bad politics','The advisor who says stop, this loss is not yours to reverse','scholarship'],

  // 1ki-jeroboams-golden-calves (1KI 12:25-13:34)
  ['jeroboam','1KI',12,25,34,'protagonist','politically-calculating','prevent the northern tribes from worshiping in Jerusalem','political control through religious innovation','Jeroboam makes two golden calves and says here are your gods, O Israel. He reinvents worship for political convenience','The leader who reshapes the company values to serve retention instead of truth','scholarship'],

  // 1ki-elijah-and-the-ravens (1KI 17:1-24)
  ['elijah','1KI',17,1,24,'protagonist','bold-then-dependent','declare drought then survive it in hiding','proving that the LORD alone controls rain','Elijah announces no rain, then hides by a brook fed by ravens, then survives on a widow\'s last oil. The prophet who declares famine and then experiences it','The whistleblower who triggers the crisis and then has to live through it','scholarship'],
  ['widow-of-zarephath','1KI',17,1,24,'deuteragonist','desperate-faith','feed Elijah with her last handful of flour','survival for her and her son','She is gathering sticks to cook one last meal before dying. Elijah says feed me first. Insane ask, insane faith','Being asked to give from your last dollar by someone who promises it will come back','scholarship'],

  // 1ki-elijah-on-carmel (1KI 18:1-46)
  ['elijah','1KI',18,1,46,'protagonist','volcanic-faith','prove YHWH is God on Mount Carmel','the theological identity of Israel','Elijah mocks the prophets of Baal all afternoon then drenches his altar in water three times. Maximum drama, maximum faith','Stacking the odds against yourself in a public demo because you know your product works','scholarship'],
  ['ahab','1KI',18,1,46,'antagonist','reluctant-compliance','allow the contest while supporting Baal worship','political survival between his wife and the prophet','Ahab calls Elijah the troubler of Israel. Elijah fires back: you are the troubler because you abandoned the LORD','The executive who blames the auditor for the problems the audit uncovered','scholarship'],
  ['obadiah-ahabs-steward','1KI',18,1,46,'witness','faithful-fear','hide 100 prophets of the LORD from Jezebel','serving God from inside a corrupt administration','Obadiah fears God greatly and hides prophets in caves while working for Ahab. Faithful in enemy territory','The compliance officer in a corrupt company who quietly protects the honest people','scholarship'],

  // 1ki-elijah-flees-to-horeb (1KI 19:1-18)
  ['elijah','1KI',19,1,18,'protagonist','suicidal-exhaustion','die under a broom tree after Jezebel\'s death threat','his own survival and the meaning of his ministry','The greatest prophet in Israel just won on Carmel and now wants to die. God feeds him, lets him sleep, then speaks in a whisper not a storm','Burnout after a major victory, when the adrenaline crashes and you realize nothing changed','scholarship'],
  ['jezebel','1KI',19,1,18,'antagonist','murderous-fury','kill Elijah by the next day','eliminating the threat to Baal worship','Jezebel sends a messenger: may the gods deal with me if I do not make your life like one of those prophets by tomorrow','The powerful person who sends one text that undoes all your confidence','scholarship'],

  // 1ki-naboths-vineyard (1KI 21:1-29)
  ['naboth','1KI',21,1,29,'protagonist','principled-defiance','refuse to sell his ancestral vineyard to the king','his family inheritance and the law of God','Naboth says the LORD forbid that I should give you my inheritance. He dies for saying no to power','The homeowner who refuses to sell to the developer because the land is not just property','scholarship'],
  ['jezebel','1KI',21,1,29,'antagonist','ruthless-efficiency','frame Naboth and have him stoned so Ahab gets the vineyard','getting what she wants regardless of law','Jezebel writes letters in Ahab\'s name, hires false witnesses, and has Naboth executed. A judicial murder in thirty verses','The executive who fabricates evidence to remove an obstacle and makes it look legal','scholarship'],
  ['ahab','1KI',21,1,29,'deuteragonist','sulking-then-compliant','get Naboth\'s vineyard','personal desire','Ahab goes to bed and pouts like a child when Naboth says no. Jezebel says is this how a king acts? Then does it for him','The leader who wants something, sulks when told no, and lets someone else do the dirty work','scholarship'],
  ['elijah','1KI',21,1,29,'witness','prophetic-fury','pronounce doom on Ahab and Jezebel','divine justice','Elijah meets Ahab in the vineyard: have you murdered and also taken possession? Dogs will lick your blood. Raw confrontation','The investigator who shows up at the crime scene and tells you exactly what is coming','scholarship'],

  // 1ki-micaiah-vs-400-prophets (1KI 22:1-40)
  ['micaiah','1KI',22,1,40,'protagonist','defiant-truth','tell Ahab the truth when 400 prophets say what the king wants to hear','the integrity of prophecy','Micaiah first sarcastically agrees with the 400, then delivers the real word: I saw all Israel scattered like sheep without a shepherd','The analyst who tells the board the real numbers after everyone else presented the optimistic forecast','scholarship'],
  ['ahab','1KI',22,1,40,'antagonist','willfully-blind','go to war despite the warning','his own death','Ahab disguises himself in battle hoping to dodge the prophecy. A random arrow finds the gap in his armor. You cannot outrun the word of God','The CEO who ignores the risk assessment and gets hit by exactly what they were warned about','scholarship'],
  ['jehoshaphat','1KI',22,1,40,'deuteragonist','uneasy-compliance','ally with Ahab despite misgivings','political alliance versus prophetic warning','Jehoshaphat asks for a real prophet after hearing the 400 but still goes to battle anyway. Knowing the right thing and doing the wrong thing','The board member who asks tough questions in the meeting then votes with the majority anyway','scholarship'],
]);

console.log('Done 1KI -', 28, 'rows');
db.close();
