const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // =========================================================================
  // 1 KINGS — 12 missing chapters: 1,2,4,6,7,8,9,13,14,15,16,20
  // =========================================================================

  // 1KI 1 — Adonijah's bid for the throne; David is old and failing
  ['adonijah','1KI',1,1,53,'protagonist','ambitious-presumption','seize the throne while David is bedridden','the Davidic succession','Adonijah throws a coronation feast for himself while his father is still alive, inviting everyone except Solomon and Nathan. Self-appointment disguised as destiny','The VP who starts acting like CEO while the founder is on medical leave','scholarship'],
  ['bathsheba','1KI',1,1,53,'deuteragonist','protective-urgency','secure Solomon\'s succession per David\'s oath','her son\'s life and the promised throne','Bathsheba goes to the dying king and reminds him of his promise. Nathan coaches her through it. Politics in the sickroom','The board member who holds the founder to a verbal commitment everyone else forgot','scholarship'],
  ['david','1KI',1,1,53,'protagonist','feeble-but-decisive','confirm Solomon as king before dying','the dynasty and the covenant','David is so old servants pile blankets on him and he cannot get warm. But he summons enough authority to say put Solomon on my mule. His last act is a king-making','The retiring CEO who can barely stand but walks to the microphone to announce the successor','scholarship'],
  ['solomon','1KI',1,1,53,'deuteragonist','anointed-suddenly','receive the kingship at Gihon Spring','legitimacy of the throne','Solomon rides David\'s mule to Gihon, Zadok anoints him, and the trumpet blows. Adonijah\'s party hears the noise mid-feast','Getting the promotion call while your rival is still celebrating their own','scholarship'],

  // 1KI 2 — David's deathbed charge; Solomon consolidates power
  ['david','1KI',2,1,12,'protagonist','dying-clarity','charge Solomon to be strong and settle old scores','the security of the new reign','David\'s last words are half theological and half a hit list: be faithful to God, but also deal with Joab and Shimei. Piety and pragmatism in the same breath','The retiring founder whose farewell letter has a vision section and a list of people to watch out for','scholarship'],
  ['solomon','1KI',2,13,46,'protagonist','ruthless-consolidation','eliminate every rival and secure the throne','uncontested power','Solomon executes Adonijah, banishes Abiathar, kills Joab at the altar, and eventually kills Shimei. Four threats, four removals. The kingdom was established in Solomon\'s hand','The new CEO whose first quarter is a quiet purge of everyone who backed the other candidate','scholarship'],
  ['adonijah','1KI',2,13,25,'antagonist','fatally-foolish','request Abishag the Shunammite as wife','a veiled second play for the throne','Adonijah asks Bathsheba to get him Abishag. Solomon sees through it immediately: requesting the king\'s concubine is a claim to the throne. One request, one execution','Asking for the former CEO\'s corner office on your first day and not understanding why that gets you fired','scholarship'],

  // 1KI 4 — Solomon's administration and wisdom
  ['solomon','1KI',4,1,34,'protagonist','administrative-brilliance','organize the kingdom with governors, officials, and provisioning systems','efficient governance of a golden age','Solomon appoints twelve governors, feeds the court thirty oxen and a hundred sheep daily, and speaks three thousand proverbs. Peak institutional capacity','The CEO whose org chart is so clean that Harvard writes a case study about it','scholarship'],

  // 1KI 6 — Building the Temple (construction details)
  ['solomon','1KI',6,1,38,'protagonist','sacred-builder','construct the Temple according to God\'s design','a permanent dwelling for God\'s presence','Seven years to build a house for God: cedar walls, gold overlay, carved cherubim. Then God speaks mid-construction: if you walk in my statutes I will dwell among Israel. The condition matters more than the architecture','Spending years on the perfect building and then reading the fine print that says the building is not the point, your behavior is','scholarship'],

  // 1KI 7 — Solomon's palace and Temple furnishings
  ['solomon','1KI',7,1,51,'protagonist','lavish-builder','build his palace and commission Temple furnishings','royal prestige and sacred worship','Solomon\'s palace takes thirteen years, almost double the Temple. The narrator does not comment but the math speaks. Hiram casts the bronze pillars, the sea on twelve oxen, and every basin','The founder who spends more on headquarters than on the product and nobody says anything because the product is also excellent','scholarship'],
  ['hiram-king-of-tyre','1KI',7,13,51,'deuteragonist','master-craftsman','cast the bronze work for the Temple','artistic excellence in sacred service','Hiram crafts two massive pillars named Jachin and Boaz, a molten sea, ten stands, and every pot and shovel. Holy craftsmanship at industrial scale','The contractor whose work is so good it defines the building','scholarship'],

  // 1KI 8 — Temple Dedication: Solomon's prayer
  ['solomon','1KI',8,1,66,'protagonist','worshipful-humility','dedicate the Temple and pray for Israel\'s future','God\'s enduring presence and Israel\'s faithfulness','Solomon spreads his hands toward heaven: will God really dwell on earth? He prays for foreigners, for drought, for plague, for war. Every future disaster is pre-covered in prayer','The founder who writes the crisis playbook on opening day because they know good times do not last forever','scholarship'],

  // 1KI 9 — God's warning to Solomon; treaty with Hiram
  ['solomon','1KI',9,1,28,'protagonist','warned-but-prosperous','receive God\'s conditional promise and expand trade networks','the covenant conditions of the Temple','God appears a second time: if you turn away, I will cut off Israel and this house will become a heap of ruins. Solomon responds by giving Hiram twenty cities. The warning slides off prosperity','Getting the terms and conditions on the same day as the keys, and filing the terms without reading them','scholarship'],
  ['hiram-king-of-tyre','1KI',9,10,28,'deuteragonist','dissatisfied-partner','receive twenty cities from Solomon as payment','fair compensation for materials and labor','Hiram inspects the cities and calls them Cabul, meaning as good as nothing. He is unimpressed. Even allies have limits','The supplier who looks at the equity they were offered instead of cash and says this is not what we agreed on','scholarship'],

  // 1KI 13 — The man of God from Judah; the lying prophet
  ['jeroboam','1KI',13,1,34,'antagonist','defiant-then-shaken','maintain his rival altar at Bethel despite prophetic warning','political control of northern worship','Jeroboam stretches out his hand to seize the prophet and it withers. The altar splits apart. He begs for healing but does not repent. Power that refuses to learn','The executive whose body starts failing from stress but who changes nothing about how they work','scholarship'],

  // 1KI 14 — Judgment on Jeroboam; Rehoboam's reign in Judah
  ['jeroboam','1KI',14,1,20,'protagonist','desperate-hypocrisy','send his wife in disguise to the prophet Ahijah about their sick son','his child\'s life','Jeroboam tells his wife to disguise herself and consult the prophet he abandoned. Ahijah is blind but God warns him. The disguise fools nobody','Calling the advisor you fired when you need emergency help and hoping they do not recognize your voice','scholarship'],
  ['rehoboam','1KI',14,21,31,'protagonist','compromised-reign','rule Judah while the nation slides into idolatry','maintaining a kingdom already fractured','Judah builds high places, sacred pillars, and Asherah poles on every high hill. Shishak of Egypt invades and takes the gold shields. Rehoboam replaces them with bronze. The whole reign is a downgrade','Replacing the real thing with a knockoff and hoping nobody notices','scholarship'],

  // 1KI 15 — Abijam and Asa in Judah; Nadab and Baasha in Israel
  ['david','1KI',15,1,24,'referenced figure','N/A','serve as the standard by which every king is measured','theological benchmark','Abijam walks in the sins of his father, but God keeps the lamp burning for David\'s sake. David\'s covenant covers generations of mediocrity','The founder whose vision statement still protects the company decades after they are gone','scholarship'],
  ['jehoshaphat','1KI',15,24,24,'mentioned','N/A','succeed Asa on the throne of Judah','continuity of the Davidic line','Jehoshaphat is named in one verse as Asa\'s successor. The Chronicler will have more to say. For now he is just the next name','The successor whose name appears in the transition announcement with no details yet','scholarship'],

  // 1KI 16 — Rapid succession of northern kings: Baasha, Elah, Zimri, Omri, Ahab
  ['ahab','1KI',16,29,34,'protagonist','wicked-escalation','marry Jezebel and establish Baal worship in Israel','political alliance through religious compromise','Ahab does more to provoke God than all the kings before him. He marries Jezebel, builds a Baal temple in Samaria, and makes an Asherah pole. Each verse is worse than the last','The CEO who merges with the competitor everyone warned about and adopts their entire culture','scholarship'],

  // 1KI 20 — Ben-Hadad besieges Samaria; Ahab's wars and foolish mercy
  ['ahab','1KI',20,1,43,'protagonist','vacillating','defeat Ben-Hadad twice then release him against God\'s command','political pragmatism over prophetic obedience','Ahab wins two impossible victories and then makes a treaty with the enemy God told him to destroy. He trades divine judgment for a trade deal','Winning the lawsuit and then settling with the defendant privately because you want the business relationship','scholarship'],
  ['elijah','1KI',20,1,43,'referenced figure','N/A','his prophetic authority looms over Ahab\'s decisions','the prophetic standard Ahab keeps violating','An unnamed prophet condemns Ahab for releasing Ben-Hadad. Elijah\'s shadow is on every confrontation between God and this king','The former auditor whose reports are still quoted every time the company makes the same mistake','inferred'],

  // =========================================================================
  // 2 KINGS — 15 missing chapters: 1,3,4,7,8,10,11,13,14,15,16,19,21,23,25
  // =========================================================================

  // 2KI 1 — Ahaziah consults Baal-zebub; Elijah calls fire from heaven
  ['elijah','2KI',1,1,18,'protagonist','fearless-confrontation','intercept messengers sent to a pagan god and pronounce the king\'s death','the exclusive sovereignty of YHWH','Ahaziah falls through a lattice, sends to Baal-zebub for a prognosis, and Elijah meets the messengers: is there no God in Israel? Then fire falls on two companies of fifty soldiers','The regulator who intercepts the company trying to hire a foreign law firm to avoid domestic jurisdiction','scholarship'],

  // 2KI 3 — Jehoshaphat, Jehoram, and Elisha against Moab
  ['elisha','2KI',3,1,27,'protagonist','reluctant-contempt','provide water and victory for the allied kings','honoring Jehoshaphat while scorning Jehoram','Elisha says to Jehoram: if not for Jehoshaphat I would not even look at you. Then he asks for a musician, the Spirit comes, and he orders ditches dug. Water arrives without rain','The consultant who agrees to the engagement only because one member of the board is worth respecting','scholarship'],
  ['jehoshaphat','2KI',3,1,27,'deuteragonist','pious-but-entangled','join another questionable military alliance','defeating Moab while seeking prophetic guidance','Jehoshaphat asks is there not a prophet of the LORD? Again. The same pattern as with Ahab. He keeps allying with the wrong people and then looking for a prophet to bless it','The board member who keeps voting for bad deals but always insists on a compliance review first','scholarship'],

  // 2KI 4 — Elisha's miracles: widow's oil, Shunammite's son, poison stew, feeding 100
  ['elisha','2KI',4,1,44,'protagonist','compassionate-power','multiply oil for a widow, raise a dead boy, cure poison stew, and feed a hundred men','meeting everyday needs through prophetic authority','Four miracles in one chapter, none of them public spectacles. A widow\'s debt, a mother\'s grief, bad food, not enough bread. Elisha works in kitchens and sickrooms','The leader whose most important work happens in private with the people nobody else notices','scholarship'],

  // 2KI 7 — Four lepers discover the Arameans have fled
  ['elisha','2KI',7,1,20,'protagonist','prophetic-certainty','announce that tomorrow flour will be cheap in besieged Samaria','the credibility of God\'s word during a famine','Elisha says by this time tomorrow, a seah of flour for a shekel. The officer mocks: even if God opened windows in heaven. He dies trampled in the gate, seeing the miracle he mocked','The analyst who predicts the turnaround and the skeptic who bets against it and loses everything','scholarship'],

  // 2KI 8 — The Shunammite restored; Hazael murders Ben-Hadad; Jehoram and Ahaziah of Judah
  ['elisha','2KI',8,1,15,'protagonist','grieving-foresight','weep because he sees what Hazael will do to Israel','the weight of prophetic knowledge','Elisha stares at Hazael until he is embarrassed and weeps. Hazael asks why. Because I know what you will do to Israel: dash infants, rip open pregnant women. Knowing the future is a burden','The advisor who sees exactly what the new hire will do to the company and cannot prevent it','scholarship'],
  ['jehoshaphat','2KI',8,16,29,'referenced figure','N/A','his legacy is invoked as Jehoram and Ahaziah rule Judah','the standard that his successors fail to meet','Jehoram walks in the way of the kings of Israel because he married Ahab\'s daughter. Jehoshaphat\'s good reign is undone by one bad marriage alliance','The founder whose successor immediately reverses the culture because they married into the competition','scholarship'],

  // 2KI 10 — Jehu purges Baal worship
  ['jehu','2KI',10,1,36,'protagonist','violent-zeal','exterminate the house of Ahab and every Baal worshiper in Israel','fulfilling divine mandate with excessive force','Jehu gathers all Baal worshipers into the temple under pretense of a festival, then slaughters them all. He destroys the pillar and makes the temple a latrine. Reform as demolition','The turnaround executive who cleans house so aggressively that the company culture becomes fear','scholarship'],

  // 2KI 11 — Athaliah seizes the throne; Joash hidden in the Temple
  ['athaliah','2KI',11,1,16,'antagonist','murderous-tyranny','destroy the royal line and reign alone','total power','Athaliah kills her own grandchildren to seize the throne. She is the only woman to rule Judah and she does it over a pile of bodies. Six years of terror','The interim leader who eliminates all successors so the interim becomes permanent','scholarship'],
  ['joash','2KI',11,1,21,'protagonist','boy-king-revealed','be crowned at age seven and restore the Davidic line','the survival of the covenant dynasty','Joash is hidden in the Temple for six years by his aunt Jehosheba while Athaliah thinks she has killed everyone. He emerges to the crowd shouting long live the king','The heir apparent everyone thought was gone, reappearing at exactly the right moment','scholarship'],

  // 2KI 13 — Elisha's death; Jehoahaz and Jehoash of Israel
  ['elisha','2KI',13,1,25,'protagonist','dying-prophet','deliver a final prophecy on his deathbed and perform a posthumous miracle','the continuation of prophetic power','Elisha tells Joash to strike the ground with arrows. He strikes three times and Elisha is angry: you should have struck five or six times. Even dying, his expectations are higher than everyone else\'s. Then a dead man touches his bones and revives','The mentor whose standards outlast their body and whose influence still works after they are gone','scholarship'],

  // 2KI 14 — Amaziah of Judah; Jeroboam II of Israel
  ['joash','2KI',14,1,22,'deuteragonist','taunting-victor','defeat Amaziah and break down Jerusalem\'s wall','northern dominance over Judah','Joash of Israel tells Amaziah a fable: a thistle asked a cedar for his daughter, and a wild beast trampled the thistle. Then he sacks Jerusalem. Mockery followed by conquest','The competitor who responds to your challenge with a meme and then acquires your company','scholarship'],

  // 2KI 15 — Parade of northern kings: Azariah, Zechariah, Shallum, Menahem, Pekahiah, Pekah; Jotham in Judah
  ['people-of-israel','2KI',15,1,38,'referenced figure','N/A','endure rapid political instability as kings are assassinated in succession','the death spiral of the northern kingdom','Five kings in one chapter, three by assassination. Menahem rips open pregnant women. Pul of Assyria exacts tribute. The kingdom bleeds out slowly','The company that burns through five CEOs in two years while the debt piles up','scholarship'],

  // 2KI 16 — Ahaz of Judah: Assyrian alliance and pagan altar
  ['hezekiah','2KI',16,1,20,'referenced figure','N/A','wait in the wings while his father Ahaz dismantles the faith','the coming reform that will reverse everything','Ahaz copies a pagan altar from Damascus, rearranges the Temple, and strips the bronze for Assyrian tribute. His son Hezekiah will undo it all','The successor who watches the predecessor strip the company and quietly plans the rebuilding','scholarship'],

  // 2KI 19 — Hezekiah's prayer; Isaiah's oracle; Sennacherib's defeat
  ['hezekiah','2KI',19,1,37,'protagonist','desperate-faith','spread Sennacherib\'s letter before the LORD and pray','the survival of Jerusalem','Hezekiah literally unfolds the threatening letter and lays it before God. That night 185,000 Assyrian soldiers die. The distance between prayer and deliverance is one night','Printing the threatening email and praying over it before responding, and the next morning the competitor implodes','scholarship'],
  ['elijah','2KI',19,1,37,'referenced figure','N/A','his prophetic tradition continues through Isaiah','the continuity of prophetic authority','Isaiah delivers God\'s answer: the virgin daughter of Zion laughs at Sennacherib. Elijah\'s mantle is alive in every prophet who confronts empire with a word','The founding principle that still guides the organization generations after the founder','inferred'],

  // 2KI 21 — Manasseh's evil reign; Amon's brief rule
  ['hezekiah','2KI',21,1,26,'referenced figure','N/A','his reforms are systematically reversed by his son','the fragility of generational faithfulness','Manasseh rebuilds everything Hezekiah tore down. High places, altars to Baal, Asherah in the Temple, child sacrifice. He sheds so much innocent blood that it fills Jerusalem from end to end','The next generation that undoes every reform the previous leader spent their career building','scholarship'],
  ['josiah','2KI',21,1,26,'referenced figure','N/A','wait two generations for his chance to reform','the pendulum between faithfulness and apostasy','Amon is assassinated after two years. The people kill the conspirators and put eight-year-old Josiah on the throne. Hope re-enters through a child','The company that cycles through two terrible leaders before the board finally finds someone who cares about the mission','scholarship'],

  // 2KI 23 — Josiah's sweeping reform and death at Megiddo
  ['josiah','2KI',23,1,30,'protagonist','zealous-grief','purge Judah of every pagan site and celebrate Passover','complete covenant renewal before judgment falls','Josiah burns the Asherah at Kidron, defiles Topheth, smashes the high places, slaughters the pagan priests, and holds a Passover like none since the Judges. Then he rides to Megiddo and dies. The best king gets the worst ending','The reformer who fixes everything, throws the celebration, and then dies in an unrelated accident that undoes the optimism','scholarship'],
  ['hezekiah','2KI',23,1,30,'referenced figure','N/A','his earlier reform is the template Josiah completes','the arc from partial to total reform','Josiah goes further than Hezekiah: he removes things Hezekiah left standing. Each generation of reform builds on the last, but none of them sticks','The second restructuring that goes deeper than the first but the company still folds','scholarship'],

  // 2KI 25 — Fall of Jerusalem; Gedaliah assassinated; Jehoiachin released
  ['josiah','2KI',25,1,30,'referenced figure','N/A','his reform was not enough to avert the judgment','the limits of individual faithfulness against institutional rot','Thirty-four years after Josiah died, Jerusalem burns. His reform delayed judgment but could not cancel it. The book of the Law he found is now ash','The turnaround that bought five years but the structural problems were terminal','scholarship'],
  ['nebuchadnezzar','2KI',25,1,30,'antagonist','imperial-finality','destroy Jerusalem, burn the Temple, and deport the survivors','Babylonian expansion and divine judgment','Nebuchadnezzar\'s captain burns the house of the LORD, the king\'s house, and every great house. The bronze pillars Hiram cast for Solomon are broken up and carried to Babylon','The acquiring company that strips the iconic headquarters, sells the brand assets, and relocates everything','scholarship'],

  // =========================================================================
  // 1 CHRONICLES — 24 missing chapters: 2-9,11,12,14,15,16,18,19,20,22-29
  // =========================================================================

  // 1CH 2 — Genealogy of Judah through Jesse and David
  ['david','1CH',2,1,55,'referenced figure','N/A','anchor the genealogical center of Judah\'s line','the messianic lineage preserved through exile','The line from Judah narrows to Jesse, then to David. Every name is a theological argument that the exile did not sever the covenant','The family tree that proves the current leadership has an unbroken line to the founder','scholarship'],

  // 1CH 3 — David's sons and the royal line through exile
  ['david','1CH',3,1,24,'referenced figure','N/A','his descendants are traced through the exile and return','the survival of the messianic line','David\'s sons born in Hebron and Jerusalem are listed, then the line continues through the exile to the post-exilic leaders. The dynasty survived Babylon','The succession plan that survived the bankruptcy and still has viable candidates','scholarship'],

  // 1CH 4 — Clans of Judah and Simeon; Jabez's prayer
  ['david','1CH',4,1,43,'referenced figure','N/A','his tribe of Judah is catalogued in detail','tribal identity and territorial claims','Jabez prays for blessing and God grants it — a two-verse burst of narrative in an ocean of names. Simeon\'s clans expand into Gedor and Seir','The org chart where one name has a footnote that tells a better story than the whole document','scholarship'],

  // 1CH 5 — Reuben, Gad, and the half-tribe of Manasseh
  ['david','1CH',5,1,26,'referenced figure','N/A','the Transjordan tribes are recorded before their exile by Assyria','the cost of unfaithfulness','Reuben lost the birthright because he defiled his father\'s bed. The Transjordan tribes are exiled because they were unfaithful. Genealogy as theological verdict','The employee roster that includes a column for why certain people are no longer with the company','scholarship'],

  // 1CH 6 — The Levites: priests, musicians, and their cities
  ['david','1CH',6,1,81,'referenced figure','N/A','the Levitical families are organized around their Temple roles','the infrastructure of worship','Aaron\'s line from Eleazar to the exile is traced, then the musicians David appointed: Heman, Asaph, Ethan. Forty-eight Levitical cities are listed. Worship has a zip code','The staffing plan for every campus of the organization, traced back to the original hires','scholarship'],

  // 1CH 7 — Northern tribes: Issachar, Benjamin, Naphtali, Manasseh, Ephraim, Asher
  ['david','1CH',7,1,40,'referenced figure','N/A','the northern tribes are counted as part of all Israel','the Chronicler\'s insistence on unity','The Chronicler includes tribes that no longer exist as political entities. He refuses to let the northern tribes be forgotten. All Israel still matters','The company history that includes the divisions that were sold off, because they were still part of the story','scholarship'],

  // 1CH 8 — Benjamin's genealogy, centered on Saul
  ['david','1CH',8,1,40,'referenced figure','N/A','Saul\'s tribe is detailed as the prelude to David\'s rise','the transition from Saul to David','Benjamin is listed in detail because Saul comes from Benjamin. The genealogy sets up the narrative: chapter 10 will tell how the kingdom passed from this line to David','The competitor profile in the appendix that explains why the market share shifted','scholarship'],

  // 1CH 9 — Residents of post-exilic Jerusalem
  ['david','1CH',9,1,44,'referenced figure','N/A','the returned exiles are registered as continuity with pre-exilic Israel','identity and belonging after the exile','The Chronicler lists who came back and what they did: priests, Levites, gatekeepers, singers. Then Saul\'s genealogy repeats, bridging the genealogies to the narrative. The roster is the restoration','The re-hire list that proves the company did not die, it just relocated and rebuilt','scholarship'],

  // 1CH 11 — David's mighty warriors and the capture of Jerusalem
  ['david','1CH',11,1,47,'protagonist','warrior-king','capture Jerusalem and rally his mighty men','establishing the capital and military loyalty','David takes Zion and renames it the City of David. Then the chapter catalogs his warriors: Jashobeam killed 300, Eleazar stood in a barley field alone, three men broke through Philistine lines for water David refused to drink','The founder who builds the headquarters and then the origin stories of every early employee become company legend','scholarship'],

  // 1CH 12 — Warriors rally to David at Ziklag and Hebron
  ['david','1CH',12,1,40,'protagonist','magnetic-leadership','attract fighters from every tribe before becoming king','building the coalition that unifies Israel','Men come to David at Ziklag day after day until the camp is like the army of God. Even some of Saul\'s Benjaminites defect. The momentum is unstoppable','The startup that keeps poaching talent from the market leader until the talent flow becomes a headline','scholarship'],

  // 1CH 14 — David defeats the Philistines; his fame spreads
  ['david','1CH',14,1,17,'protagonist','faith-in-battle','inquire of God before each battle and win both times','military legitimacy and divine guidance','David asks God: shall I go up? God says yes and gives a different tactic the second time. Wait for the sound in the balsam trees then strike. Obedience adapts to the moment','The leader who checks in before every major decision and gets different instructions each time because the situation changed','scholarship'],

  // 1CH 15 — The Ark brought to Jerusalem properly
  ['david','1CH',15,1,29,'protagonist','corrected-joy','move the Ark with Levites on poles instead of a cart','doing it right after doing it wrong','David says nobody but the Levites may carry the Ark because we did not inquire of God the first time. He dances before the LORD in a linen ephod. Joy that learned from failure','The CEO who rewrites the launch process after the first one crashed and dances at the second one','scholarship'],

  // 1CH 16 — David's psalm of thanksgiving
  ['david','1CH',16,1,43,'protagonist','worshipful-gratitude','establish perpetual worship before the Ark','making worship the permanent center of national life','David composes a psalm mashing up Psalms 96, 105, and 106: give thanks, tell the nations, sing to him. Then he appoints Asaph and the musicians as permanent staff. Worship becomes an institution','The founder who writes the company anthem and hires a full-time culture team on day one','scholarship'],

  // 1CH 18 — David's military victories and officials
  ['david','1CH',18,1,17,'protagonist','conquering-administrator','defeat the Philistines, Moabites, Arameans, and Edomites and organize his government','establishing Israel as a regional power','David wins on every front and then the chapter lists his cabinet: Joab over the army, Jehoshaphat the recorder, Zadok the priest. Empire needs bureaucracy','The company that wins market share in every segment and then hires its first COO and CFO','scholarship'],

  // 1CH 19 — War with Ammon; David's ambassadors humiliated
  ['david','1CH',19,1,19,'protagonist','offended-then-victorious','avenge the humiliation of his ambassadors by Ammon','national honor and military deterrence','David sends condolence envoys; Hanun shaves half their beards and cuts their garments at the hips. David sends Joab. The Ammonites hire Aramean mercenaries and still lose','Sending a goodwill delegation, having them publicly mocked, and then launching a hostile takeover','scholarship'],

  // 1CH 20 — Capture of Rabbah; Philistine giants killed
  ['david','1CH',20,1,8,'protagonist','delegating-king','send Joab to finish the siege while he stays in Jerusalem','military consolidation','The Chronicler omits the Bathsheba incident entirely and just says David stayed in Jerusalem while Joab attacked Rabbah. The most significant silence in Chronicles','The corporate biography that skips the scandal and goes straight to the next quarter','scholarship'],

  // 1CH 22 — David prepares materials for the Temple
  ['david','1CH',22,1,19,'protagonist','visionary-preparation','stockpile materials and charge Solomon to build the Temple','ensuring the Temple gets built even though he cannot build it','David says I have taken great pains to provide for the house of the LORD: 100,000 talents of gold, a million of silver, bronze and iron beyond weighing. Then he tells Solomon: be strong, do not be afraid','The founder who cannot take the company public but spends years ensuring their successor has everything they need to do it','scholarship'],
  ['solomon','1CH',22,1,19,'deuteragonist','young-and-charged','receive the mission and the materials from his father','becoming the builder of God\'s house','David says you are young and inexperienced and the house must be exceedingly magnificent. So I have prepared. Solomon inherits a mission larger than himself and a warehouse to match','The new CEO who walks into a warehouse full of resources and a mandate that says build something people will remember','scholarship'],

  // 1CH 23 — Levitical divisions: 38,000 organized by role
  ['david','1CH',23,1,32,'protagonist','organizational-architect','organize the Levites into divisions for Temple service','institutionalizing worship before Solomon builds the structure','David divides 38,000 Levites into shifts: 24,000 for the work, 6,000 as officers and judges, 4,000 as gatekeepers, 4,000 as musicians. Worship as a staffing plan','The operations executive who builds the org chart and shift schedules before the building is even finished','scholarship'],

  // 1CH 24 — Twenty-four priestly divisions chosen by lot
  ['david','1CH',24,1,31,'protagonist','fair-administrator','divide the priests into twenty-four rotational courses by lot','equitable service and preventing priestly monopolies','David divides the sons of Aaron by lot so no family dominates the altar. Sixteen courses from Eleazar, eight from Ithamar. The lot prevents favoritism','The scheduling system designed so every team gets equal access to the high-profile shifts','scholarship'],

  // 1CH 25 — Musicians: 288 trained singers in twenty-four divisions
  ['david','1CH',25,1,31,'protagonist','worship-architect','organize 288 trained musicians under Asaph, Heman, and Jeduthun','perpetual professional worship at the Temple','The musicians are assigned by lot: the master and the student together. David treats music as prophecy: they prophesied with lyres, harps, and cymbals','The arts director who builds a rotation of professional musicians and insists their work is as sacred as the preaching','scholarship'],

  // 1CH 26 — Gatekeepers and treasurers assigned by family
  ['david','1CH',26,1,32,'protagonist','security-organizer','assign gatekeepers to every entrance and treasurers over the storehouses','protecting and funding the Temple infrastructure','Gatekeepers are assigned by lot to north, south, east, west, and the storehouses. Every door has a name. Every treasury has an overseer. Security and finance are worship too','The facilities manager who assigns every entrance a guard and every budget line an owner before the building opens','scholarship'],

  // 1CH 27 — Military and tribal leaders; David's administrators
  ['david','1CH',27,1,34,'protagonist','administrative-mastery','organize the army into monthly rotations and appoint tribal leaders','sustaining a standing army without bankrupting the nation','Twelve divisions of 24,000, each serving one month. David invents the reserve system: always ready, never exhausted','The COO who designs a rotation schedule so no team burns out but coverage is always one hundred percent','scholarship'],

  // 1CH 28 — David's public charge to Solomon and the Temple plans
  ['david','1CH',28,1,21,'protagonist','solemn-commission','give Solomon the Temple blueprints and charge him publicly before all Israel','the successful construction of the Temple','David says God chose Solomon and gave me the plans by the Spirit\'s hand. He hands over architectural drawings like Moses received the tabernacle pattern. Then: be strong, do not fear, God will be with you','The founder presenting the product roadmap to the successor in front of the entire company and saying I got this from above, now you execute it','scholarship'],
  ['solomon','1CH',28,1,21,'deuteragonist','publicly-commissioned','accept the Temple plans and the national mandate','carrying David\'s vision into reality','Solomon stands before all Israel receiving the weight of his father\'s dream. Every leader, officer, and mighty man is watching. The handoff is complete','The successor at the podium receiving the strategic plan with the whole org watching, knowing there is no room to fail','scholarship'],

  // 1CH 29 — David's offering; Solomon anointed; David dies
  ['david','1CH',29,1,30,'protagonist','generous-farewell','give his personal fortune and lead Israel in a freewill offering for the Temple','ensuring abundant resources for the building','David gives 3,000 talents of gold and 7,000 talents of silver from his personal treasury, then asks who else is willing. The leaders give 5,000 talents of gold, 10,000 darics, 10,000 talents of silver. Generosity is contagious','The founder who writes the first check for the nonprofit and then watches the room match it','scholarship'],
  ['solomon','1CH',29,1,30,'deuteragonist','anointed-again','receive the kingship a second time with full national support','unchallenged legitimacy','Solomon is made king a second time with more ceremony than the first. The Chronicler wants no ambiguity: this succession was unanimous','The CEO whose board vote is recorded as unanimous to signal that there was no dissent','scholarship'],

  // =========================================================================
  // 2 CHRONICLES — 29 missing chapters: 2-4,6-8,11-19,21-33,35
  // =========================================================================

  // 2CH 2 — Solomon prepares to build; letter to Hiram
  ['solomon','2CH',2,1,18,'protagonist','diplomatic-builder','negotiate with Hiram for timber and a master craftsman','securing the materials for the Temple','Solomon writes: the temple I build will be great because our God is greater than all gods. Then he asks for a man skilled in gold, silver, bronze, iron, and purple fabric. Vision matched with procurement','The CEO who writes the mission statement and the purchase orders on the same day','scholarship'],
  ['hiram-king-of-tyre','2CH',2,1,18,'deuteragonist','commercially-impressed','supply materials and a master artisan in exchange for wheat and oil','trade partnership with Israel','Hiram writes back: because the LORD loves his people he has made you king. Then he sends Huram-Abi the craftsman. Even pagan kings recognize when God has placed someone','The supplier who says yes because they can see the vision is real, not just because the contract is good','scholarship'],

  // 2CH 3 — Temple construction begins
  ['solomon','2CH',3,1,17,'protagonist','sacred-architect','build the Temple on Mount Moriah where God appeared to David','the physical realization of the divine blueprint','Solomon begins building on Moriah, where Abraham offered Isaac, where David saw the angel. The geography is the theology. Gold overlay, cherubim with twenty-cubit wingspan, the veil of blue and purple','Groundbreaking on the site that has been part of the company story since the very first chapter','scholarship'],

  // 2CH 4 — Temple furnishings: bronze sea, lampstands, courts
  ['solomon','2CH',4,1,22,'protagonist','meticulous-worship','furnish the Temple with everything needed for sacrifice and worship','equipping the house of God completely','A bronze altar, a molten sea, ten lampstands, ten tables, a hundred basins of gold. The Chronicler catalogs every object because each one is a tool for meeting God','Outfitting the new facility with every piece of equipment before the grand opening, nothing missing','scholarship'],

  // 2CH 6 — Solomon's prayer of dedication
  ['solomon','2CH',6,1,42,'protagonist','intercessory-humility','pray for every future crisis Israel might face','God\'s faithfulness through generations of failure','Solomon kneels on a bronze platform before all Israel and prays: when they sin and you scatter them and they return and pray toward this house, hear from heaven. He covers famine, plague, war, exile, even foreigners. Preemptive intercession','Writing the disaster recovery plan on launch day because you know human nature better than you trust human consistency','scholarship'],

  // 2CH 7 — Fire from heaven; God's conditional promise
  ['solomon','2CH',7,1,22,'protagonist','awed-then-warned','witness fire from heaven consuming the sacrifice and receive God\'s terms','the conditional permanence of God\'s presence','Fire falls from heaven and the glory fills the Temple so thickly the priests cannot enter. Then God says: if my people who are called by my name humble themselves and pray and turn, I will heal their land. The most quoted verse in Chronicles','Watching the product launch go viral and then reading the investor memo that says this only works if the team stays humble','scholarship'],

  // 2CH 8 — Solomon's building projects and administration
  ['solomon','2CH',8,1,18,'protagonist','builder-administrator','expand infrastructure and formalize Temple worship schedules','consolidating the golden age','Solomon builds cities, stations troops, establishes the priestly rotations David designed, and launches a fleet at Ezion-Geber. Administration at peak efficiency','The quarter where every initiative launches, every hire starts, and the investor deck writes itself','scholarship'],

  // 2CH 11 — Rehoboam fortifies Judah; priests and Levites defect south
  ['rehoboam','2CH',11,1,23,'protagonist','consolidating-loss','fortify fifteen cities and absorb the Levites fleeing Jeroboam\'s idolatry','stabilizing Judah after losing ten tribes','Rehoboam fortifies cities, stocks them with food and weapons, and receives the priests Jeroboam expelled. The northern brain drain becomes Judah\'s gain','The company that loses the division but gains all the best talent who refused to work under the new management','scholarship'],

  // 2CH 12 — Shishak invades; Rehoboam humbles himself
  ['rehoboam','2CH',12,1,16,'protagonist','arrogant-then-humbled','abandon the Law once he is strong, then humble himself when Egypt invades','the conditional nature of divine protection','When Rehoboam is established and strong he forsakes the Law. Shishak comes with 1,200 chariots. The prophet Shemaiah says you abandoned God so God abandons you. They humble themselves and God grants partial deliverance','Getting too comfortable after the funding round, then losing the biggest client and having to eat humble pie to survive','scholarship'],

  // 2CH 13 — Abijah defeats Jeroboam with a theological speech
  ['rehoboam','2CH',13,1,22,'referenced figure','N/A','his son Abijah invokes the Davidic covenant in battle','generational legacy','Abijah stands on a mountain and gives a sermon to the northern army: you have golden calves, we have the LORD and his priests. Then God strikes Jeroboam and 500,000 fall. Theology as military strategy','The CEO\'s kid who takes over, gives a speech about the founding values, and then wins the biggest contract in company history','scholarship'],

  // 2CH 14 — Asa's early faithfulness; victory over the Cushites
  ['david','2CH',14,1,15,'referenced figure','N/A','his standard of faithfulness defines what a good king looks like','the theological benchmark','Asa does what is good and right. He removes foreign altars, smashes pillars, and tells Judah to seek God. When a million Cushites attack, he prays: we rely on you. God routs them','The leader who actually lives by the company values and wins an impossible contract because clients can tell the difference','scholarship'],

  // 2CH 15 — Asa's reform; the covenant renewal ceremony
  ['david','2CH',15,1,19,'referenced figure','N/A','his legacy of worship and covenant informs Asa\'s reform','spiritual renewal','The prophet Azariah meets Asa and says the LORD is with you when you are with him. Asa deposes his grandmother for making an Asherah pole. Reform that does not spare family','The CEO who fires their own relative for violating company policy because nobody is above the standard','scholarship'],

  // 2CH 16 — Asa's later failure; alliance with Aram instead of God
  ['david','2CH',16,1,14,'referenced figure','N/A','his example of trusting God contrasts with Asa\'s late-career pragmatism','the tragedy of finishing poorly','Asa hires Aram to fight Israel instead of trusting God. The seer Hanani rebukes him: you relied on Aram instead of the LORD. Asa throws the seer in prison and oppresses people. A good king who ends badly','The leader who trusted instinct for twenty years and then hires consultants for the last challenge and punishes anyone who objects','scholarship'],

  // 2CH 17 — Jehoshaphat's prosperity and teaching initiative
  ['jehoshaphat','2CH',17,1,19,'protagonist','zealous-educator','send officials and Levites to teach the Law throughout Judah','spiritual literacy for the entire nation','Jehoshaphat sends princes and Levites with the Book of the Law to every city in Judah. They taught. Systematic theological education as national policy','The CEO who funds a company university and sends instructors to every regional office','scholarship'],

  // 2CH 18 — Jehoshaphat and Ahab at Ramoth-Gilead (parallel to 1KI 22)
  ['jehoshaphat','2CH',18,1,34,'protagonist','uneasy-alliance','ally with Ahab despite prophetic warning from Micaiah','political pragmatism versus divine counsel','Jehoshaphat asks for a real prophet, hears the truth, and goes to war anyway. He nearly dies when the enemy mistakes him for Ahab. He cries out and God diverts them','The board member who commissions the risk report, reads it, and still votes with the majority','scholarship'],
  ['ahab','2CH',18,1,34,'antagonist','defiant-to-the-end','go to war at Ramoth-Gilead in disguise to dodge the prophecy','escaping divine judgment by human cleverness','Ahab disguises himself and puts Jehoshaphat in royal robes. A random arrow hits Ahab between the joints of his armor. You cannot disguise yourself from God','Sending your partner to the meeting in the expensive suit while you sit in the back, and the auditors find you anyway','scholarship'],

  // 2CH 19 — Jehoshaphat appoints judges and reforms justice
  ['jehoshaphat','2CH',19,1,11,'protagonist','chastened-reformer','establish a judicial system with judges in every fortified city','justice and accountability throughout Judah','The seer Jehu confronts him: should you help the wicked? But there is still some good in you. Jehoshaphat responds with judicial reform. He tells the judges: you judge not for man but for the LORD','The executive who gets called out by the board, accepts the criticism, and restructures compliance','scholarship'],

  // 2CH 21 — Jehoram's wicked reign; Elijah's letter; disease and death
  ['jehoshaphat','2CH',21,1,20,'referenced figure','N/A','his legacy is destroyed by his son Jehoram who kills all his brothers','the fragility of reform','Jehoram murders all his brothers, marries Ahab\'s daughter, and leads Judah into idolatry. Elijah sends a letter: because you have not walked like Jehoshaphat your father, the LORD will strike your bowels. He dies in great agony, and no one is sorry','The successor who kills every competing project, adopts the worst practices, and dies with no one at the funeral','scholarship'],

  // 2CH 22 — Ahaziah's brief reign; Athaliah seizes power
  ['athaliah','2CH',22,1,12,'antagonist','ruthless-seizure','destroy the royal line and claim the throne','absolute power','Ahaziah reigns one year and is killed by Jehu. Then his mother Athaliah destroys all the royal seed. But Jehosheba hides baby Joash in the Temple for six years. One aunt versus a queen','The hostile board member who tries to wipe out every heir, not knowing that one was smuggled to safety','scholarship'],

  // 2CH 23 — Jehoiada crowns Joash; Athaliah executed
  ['joash','2CH',23,1,21,'protagonist','crowned-child','be revealed as the surviving heir and crowned king at age seven','restoring the Davidic dynasty','Jehoiada the priest brings the boy out, puts the crown on him, and the people clap and shout long live the king. Athaliah tears her clothes and screams treason. She is dragged out and killed','The rightful heir emerging from hiding while the usurper screams that the real treason is happening','scholarship'],

  // 2CH 24 — Joash repairs the Temple then falls away after Jehoiada dies
  ['joash','2CH',24,1,27,'protagonist','faithful-then-treacherous','repair the Temple under Jehoiada then turn to idols after his death','the limits of borrowed faith','Joash is good as long as Jehoiada lives. After the priest dies, officials convince the king to abandon the Temple. Zechariah son of Jehoiada rebukes him and Joash has him stoned in the Temple court. He kills his mentor\'s son','The protege who thrives under the mentor and self-destructs the moment the mentor retires','scholarship'],

  // 2CH 25 — Amaziah's partial obedience and arrogance
  ['joash','2CH',25,1,28,'referenced figure','N/A','his reign illustrates the pattern of partial obedience followed by pride','the cycle repeating','Amaziah does right but not with a whole heart. He wins against Edom, worships their gods, then challenges Joash of Israel and loses. Pride after a small victory leads to a big defeat','The manager who wins one account, gets overconfident, picks a fight with the market leader, and gets crushed','scholarship'],

  // 2CH 26 — Uzziah's greatness and leprosy
  ['hezekiah','2CH',26,1,23,'referenced figure','N/A','his future reform waits while Uzziah illustrates the danger of pride','the recurring pattern of rising-then-falling kings','Uzziah is powerful, builds towers, digs cisterns, and fields a huge army. Then he enters the Temple to burn incense, the priests confront him, and leprosy breaks out on his forehead. He lives in a separate house until death. Pride literally disfigures him','The CEO who builds the company to record revenues and then gets caught doing something only the board is authorized to do','scholarship'],

  // 2CH 27 — Jotham's quiet faithfulness
  ['david','2CH',27,1,9,'referenced figure','N/A','his standard of faithfulness is the backdrop for Jotham\'s steady reign','the rarity of a king who finishes well','Jotham becomes mighty because he ordered his ways before the LORD his God. Nine verses. No scandal, no dramatic failure, no apostasy. The shortest reign summary in Chronicles for a good king','The executive whose tenure is boring because nothing goes wrong, which is the highest compliment','scholarship'],

  // 2CH 28 — Ahaz's catastrophic unfaithfulness
  ['hezekiah','2CH',28,1,27,'referenced figure','N/A','his radical reform will undo every sin his father Ahaz commits in this chapter','the setup for redemption','Ahaz makes molten images for the Baals, burns his sons in the valley of Hinnom, and is defeated by everyone: Aram, Israel, Edom, Philistia. He strips the Temple and shuts the doors. The lowest point before the turnaround','The predecessor who runs the company into the ground so completely that the board finally empowers a real reformer','scholarship'],

  // 2CH 29 — Hezekiah reopens and cleanses the Temple
  ['hezekiah','2CH',29,1,36,'protagonist','zealous-restoration','reopen and purify the Temple that Ahaz shut','reversing the apostasy and restoring worship','In the first month of his first year, Hezekiah opens the Temple doors. The Levites spend sixteen days carrying out the filth. Then the worship resumes with trumpets, singing, and the whole assembly bowing. Reform does not wait','The new CEO who reopens the R&D lab on day one and tells the team start building again','scholarship'],

  // 2CH 30 — Hezekiah's all-Israel Passover
  ['hezekiah','2CH',30,1,27,'protagonist','inclusive-devotion','invite all Israel and Judah, including the shattered north, to Passover','national reunification through worship','Hezekiah sends couriers to Ephraim and Manasseh: come back to the LORD. Most laugh and mock. Some humble themselves and come. The Passover is so joyful they extend it another seven days','The leader who invites the alumni of the failed division to the company retreat and some actually show up and weep','scholarship'],

  // 2CH 31 — Hezekiah organizes tithes and priestly divisions
  ['hezekiah','2CH',31,1,21,'protagonist','systematic-reformer','organize the priestly divisions, tithes, and contributions','sustaining the reform institutionally','The people bring so much in tithes that they pile it in heaps. Hezekiah has to build storerooms. Faithfulness creates surplus','The quarter where donations exceed the budget and the finance team scrambles to set up new accounts','scholarship'],

  // 2CH 32 — Sennacherib's invasion; Hezekiah's faith and later pride
  ['hezekiah','2CH',32,1,33,'protagonist','faith-tested-then-proud','defend Jerusalem by faith and then nearly ruin it with pride','the gap between public faith and private ego','Hezekiah tells the people: be strong, there is a greater power with us than with him. God sends an angel and Sennacherib retreats. Then Hezekiah gets sick, recovers, and his heart is lifted up. The Chronicler adds: God tested him to know what was in his heart','Surviving the existential crisis through faith and then almost blowing it by showing off to the investors who visit afterward','scholarship'],

  // 2CH 33 — Manasseh's evil, exile, repentance, and Amon's brief reign
  ['hezekiah','2CH',33,1,25,'referenced figure','N/A','his legacy is demolished by his son but the Chronicler adds a twist not found in Kings','the possibility of repentance even for the worst king','Manasseh is worse than the nations God drove out. But the Chronicler adds what Kings omits: Manasseh is captured, taken to Babylon in hooks, and he prays. God restores him. The worst king repents. Not even the narrator expected this','The executive everyone wrote off who hits rock bottom in a hostile takeover, humbles themselves, and gets a second chance nobody saw coming','scholarship'],

  // 2CH 35 — Josiah's great Passover and death at Megiddo
  ['josiah','2CH',35,1,27,'protagonist','reverent-then-reckless','celebrate the greatest Passover since Samuel and then die in an unnecessary battle','the peak and collapse of Judah\'s last reform','Josiah provides 30,000 lambs and 3,000 bulls from his own flocks. No Passover like it since Samuel. Then Neco of Egypt says God told me to hurry, do not interfere. Josiah disguises himself and goes to battle anyway and is killed. The narrator says he did not listen to the words of Neco from the mouth of God','The leader who throws the best company event in history, ignores a warning the next day, and dies in a venture that was never their fight','scholarship'],

  // =========================================================================
  // EZRA — 6 missing chapters: 2,4,5,6,8,10
  // =========================================================================

  // EZR 2 — List of returnees from Babylon
  ['zerubbabel','EZR',2,1,70,'protagonist','leading-the-return','bring the first wave of exiles back to Jerusalem','the restoration of Israel','42,360 people plus 7,337 servants and 200 singers. The Chronicler lists them by family, by town, by guild. Every name is a vote to go home','The company re-hire list after a major layoff, every name representing someone who chose to come back','scholarship'],

  // EZR 4 — Opposition halts the Temple rebuilding
  ['zerubbabel','EZR',4,1,24,'protagonist','frustrated-perseverance','resist the offer of help from adversaries who then sabotage the project','the purity and progress of the rebuilding','The adversaries say let us build with you. Zerubbabel says no. They retaliate with letters to the Persian court and the work stops for years. Saying no to the wrong partnership is more expensive than building alone','The startup that rejects the strategic investor, gets sued, and the product launch stalls for two years','scholarship'],
  ['cyrus','EZR',4,1,24,'referenced figure','N/A','his original decree is weaponized by opponents who appeal to later kings','the bureaucratic corruption of a good mandate','The enemies cite the city\'s rebellious history and the work stops under Artaxerxes. Cyrus said build; Artaxerxes says stop. The paperwork contradicts itself across administrations','The original board resolution that gets overridden by a later board with different priorities','scholarship'],

  // EZR 5 — Haggai and Zechariah restart the rebuilding; Tattenai investigates
  ['zerubbabel','EZR',5,1,17,'protagonist','re-energized','restart the Temple construction after prophetic encouragement','completing what was abandoned','Haggai and Zechariah prophesy and Zerubbabel and Joshua start building again. Tattenai the governor investigates but does not stop them. This time the eye of God is on the elders','The project that restarts after the legal hold is lifted and this time the regulators just observe instead of blocking','scholarship'],
  ['ezra','EZR',5,1,17,'referenced figure','N/A','his later arrival will complete what Zerubbabel begins','the spiritual reform that follows the physical rebuilding','The Temple is rising but the hearts are not yet reformed. Ezra\'s work of teaching the Law will come later to fill the building with purpose','The beautiful facility that still needs a director of programs before it means anything','inferred'],

  // EZR 6 — Darius confirms Cyrus's decree; Temple completed and dedicated
  ['zerubbabel','EZR',6,1,22,'protagonist','vindicated-completion','complete and dedicate the second Temple','the restoration of worship after seventy years of exile','Darius searches the archives, finds Cyrus\'s decree, and orders the work to proceed with imperial funding. The Temple is finished and dedicated with joy and 100 bulls, 200 rams, 400 lambs, and 12 goats. The exiles celebrate Passover','The legal team that finds the original contract in the archives and the court orders the project completed with the other side paying','scholarship'],
  ['cyrus','EZR',6,1,22,'referenced figure','N/A','his original decree is vindicated by Darius\'s search of the archives','the persistence of a righteous decree','Cyrus\'s scroll is found in the citadel of Ecbatana. The dead king\'s word still has force. Darius says let it be done with all diligence','The founding document that gets pulled from storage decades later and still holds legal authority','scholarship'],

  // EZR 8 — Ezra's caravan from Babylon; fasting for safe journey
  ['ezra','EZR',8,1,36,'protagonist','faith-over-pragmatism','lead a caravan carrying massive treasure without military escort','trusting God instead of the king\'s soldiers','Ezra is ashamed to ask the king for soldiers because he said God\'s hand is on all who seek him. So they fast and pray and carry twelve tons of silver and gold through bandit territory without a guard','The leader who told the board we do not need insurance, then has to drive the truck personally and pray the whole way','scholarship'],

  // EZR 10 — The community confesses and separates from foreign wives
  ['ezra','EZR',10,1,44,'protagonist','anguished-authority','lead the painful process of dissolving marriages that violate the covenant','covenant faithfulness at devastating personal cost','The people stand in the rain trembling. Ezra says you have been unfaithful. They agree to separate from foreign wives. The text lists names. This is not abstract theology; it is specific people losing specific families','The compliance action that names individuals and requires them to unwind relationships the company never should have allowed','scholarship'],

  // =========================================================================
  // NEHEMIAH — 7 missing chapters: 3,7,9,10,11,12,13
  // =========================================================================

  // NEH 3 — Each family repairs its section of the wall
  ['nehemiah','NEH',3,1,32,'protagonist','organizing-genius','assign every family a section of the wall to rebuild','completing the wall through distributed ownership','Eliashib the high priest rebuilds the Sheep Gate. The sons of Hassenaah rebuild the Fish Gate. Goldsmiths, perfumers, merchants, and rulers each take a section. Everyone builds the part of the wall nearest their own house','The project manager who assigns every team a deliverable based on what is closest to their desk','scholarship'],

  // NEH 7 — The census of returnees (parallel to EZR 2)
  ['nehemiah','NEH',7,1,73,'protagonist','administrative-diligence','register the people by genealogy after the wall is complete','securing identity and inheritance for the returned community','Nehemiah finds the original register from the first return and uses it to verify who belongs. The wall is built but now he needs to know who is inside it. Structure before chaos','The operations director who completes the building and then audits the employee roster before opening day','scholarship'],

  // NEH 9 — The great prayer of confession
  ['ezra','NEH',9,1,38,'protagonist','intercessory-grief','lead the longest prayer of confession in scripture','national repentance and covenant renewal','The Levites recite Israel\'s entire history from creation to exile as a prayer: you were faithful, we were not, you were patient, we were stiff-necked. Eight sections covering two thousand years of grace and rebellion','The company retreat where someone reads the founding story alongside every time the team broke its own values, and everyone signs a recommitment','scholarship'],
  ['nehemiah','NEH',9,1,38,'deuteragonist','participatory-grief','join the communal confession and covenant signing','solidarity in repentance','Nehemiah\'s name appears on the sealed document. The governor participates in the confession as an equal, not a spectator','The CEO who stands in the town hall and says I failed too, and signs the new code of conduct first','scholarship'],

  // NEH 10 — The sealed covenant: tithes, Sabbath, Temple upkeep
  ['nehemiah','NEH',10,1,39,'protagonist','covenant-signer','lead the people in sealing a written covenant to obey the Law','binding the community to specific commitments','They sign an agreement with specific terms: no intermarriage, keep the Sabbath, pay the Temple tax, supply wood and firstfruits. Vague repentance becomes concrete obligation','The team that moves from a mission statement to a signed operating agreement with metrics and deadlines','scholarship'],
  ['ezra','NEH',10,1,39,'deuteragonist','legal-authority','ensure the covenant reflects the Law accurately','the theological integrity of the binding document','Ezra\'s teaching undergirds every clause. The covenant is not invented; it is the Law made local and specific','The general counsel who ensures the new policy matches the original charter word for word','scholarship'],

  // NEH 11 — Volunteers and lots for settling Jerusalem
  ['nehemiah','NEH',11,1,36,'protagonist','strategic-populator','move one-tenth of the population into Jerusalem by lot','a capital city needs citizens','The people cast lots: one out of ten must live in Jerusalem. The rest bless those who volunteer. Living in the rebuilt city is a sacrifice, not a privilege','The company that asks ten percent of staff to relocate to the new headquarters and calls them volunteers even though lots are drawn','scholarship'],

  // NEH 12 — Dedication of the wall with two choirs
  ['nehemiah','NEH',12,1,47,'protagonist','celebratory-leader','dedicate the wall with two great choirs marching in opposite directions','the culmination of the rebuilding mission','Two processions walk on top of the wall in opposite directions and meet at the Temple with singing so loud the joy is heard far away. The wall is not just defense; it is a stage for worship','The grand opening where two groups march from opposite ends of the building and meet in the middle with music','scholarship'],
  ['ezra','NEH',12,1,47,'deuteragonist','leading-worship','lead one of the two processions on the wall','the union of builder and teacher in celebration','Ezra leads one choir and Nehemiah follows the other. The governor and the scribe, the builder and the teacher, completing the circuit together','The COO and the CTO walking the building from opposite ends on opening day and meeting in the lobby','scholarship'],

  // NEH 13 — Nehemiah's final reforms: Sabbath, mixed marriages, Temple purity
  ['nehemiah','NEH',13,1,31,'protagonist','furious-reformer','clean house after returning from Babylon to find everything has slipped','the permanence of reform','Nehemiah returns to find Tobiah living in the Temple storeroom, tithes unpaid, Sabbath violated, and intermarriage resumed. He throws Tobiah\'s furniture out, confronts the nobles, shuts the gates on Sabbath, and pulls out people\'s hair. The book ends with him angry','The leader who goes on sabbatical, comes back, and finds every policy they implemented has been ignored','scholarship'],
  ['tobiah','NEH',13,1,31,'antagonist','entrenched-corruption','occupy a room in the Temple that should hold tithes','using insider connections to embed in the institution','Tobiah the enemy of the rebuilding has somehow gotten a private room in the Temple through the high priest\'s family connections. The fox is in the henhouse with a key','The competitor who gets office space inside your building because someone on the inside is related to them','scholarship'],
  ['sanballat','NEH',13,1,31,'antagonist','infiltrating','marry his daughter into the high priestly family','corrupting the leadership from within','Sanballat\'s son-in-law is a grandson of the high priest. Nehemiah chases him away. The enemy you kept outside the wall got inside through a wedding','The rival company that could not beat you in the market so they married into the founding family','scholarship'],

  // =========================================================================
  // ESTHER — 5 missing chapters: 4,6,7,9,10
  // =========================================================================

  // EST 4 — Mordecai mourns; Esther resolves to act
  ['mordecai','EST',4,1,17,'protagonist','public-grief','mourn in sackcloth at the gate and rally Esther to action','the survival of the Jewish people','Mordecai tears his clothes and wails loudly in the city square. Every province where the decree arrives, Jews fast and weep. Then he sends the message: who knows whether you have come to the kingdom for such a time as this','The person who goes public with the crisis, makes noise until it cannot be ignored, and then tells the insider that this is their moment','scholarship'],
  ['esther','EST',4,1,17,'deuteragonist','fearful-then-resolved','risk death by approaching the king uninvited','her life and the survival of her people','Esther hesitates: anyone who approaches the king without being summoned dies. Mordecai says if you stay silent, deliverance will come from elsewhere but you and your family will perish. She says: if I perish, I perish. Fast for me three days','The whistleblower who weighs the personal cost, accepts it, and says give me seventy-two hours to prepare','scholarship'],
  ['hatach','EST',4,1,17,'witness','faithful-courier','carry messages between Mordecai at the gate and Esther in the palace','enabling communication under surveillance','Hatach goes back and forth as the only link between the mourning man outside and the frightened queen inside. Without him there is no plan','The trusted assistant who carries the sensitive messages between the boardroom and the field office when email is not safe','scholarship'],

  // EST 6 — The king's insomnia; Haman forced to honor Mordecai
  ['mordecai','EST',6,1,14,'protagonist','unwitting-honoree','receive the royal honor Haman designed for himself','divine irony and vindication','The king cannot sleep, reads the chronicles, discovers Mordecai once saved his life, and asks what was done for him. Nothing. Haman walks in and the king asks how to honor someone. Haman assumes it is himself and designs the ultimate tribute. Then the king says do this for Mordecai','The employee whose old contribution gets discovered in the archives on the exact night the CEO is reviewing personnel files','scholarship'],
  ['haman','EST',6,1,14,'antagonist','humiliated-horror','lead Mordecai through the streets in royal robes while proclaiming his honor','the total reversal of his plans','Haman robes the man he planned to hang and leads him through the city shouting thus shall it be done to the man the king delights to honor. He goes home with his head covered. Zeresh says if Mordecai is Jewish you will surely fall','The rival who is forced to publicly celebrate the promotion of the person they tried to fire','scholarship'],
  ['zeresh','EST',6,1,14,'witness','prophetic-dread','predict Haman\'s downfall based on Mordecai\'s identity','her husband\'s fate','Zeresh shifts from build the gallows to you cannot win against him. She reads the situation faster than her husband. If Mordecai is of the seed of the Jews, you will not prevail','The spouse who told you to go for it yesterday and today says you need to call a lawyer','scholarship'],

  // EST 7 — Esther's banquet: Haman exposed and hanged
  ['esther','EST',7,1,10,'protagonist','courageous-accusation','reveal her identity and name Haman as the enemy at the second banquet','the survival of her people','The king asks what is your wish, Queen Esther? She says: if I have found favor, let my life be given me and my people. For we have been sold to be destroyed. The adversary and enemy is this wicked Haman. Maximum precision at maximum stakes','The presentation where you name the threat, identify the person responsible, and ask for your team\'s survival all in one sentence','scholarship'],
  ['haman','EST',7,1,10,'antagonist','terrified-then-dead','beg for his life and be hanged on his own gallows','the complete reversal of his plot','Haman falls on the couch where Esther is reclining to beg for mercy and the king thinks he is assaulting the queen. They cover his face and hang him on the gallows he built for Mordecai. The instrument of murder becomes the instrument of justice','The executive whose own hostile takeover plan becomes the legal basis for their termination','scholarship'],
  ['mordecai','EST',7,1,10,'deuteragonist','vindicated','have his name cleared and Haman\'s plot reversed','personal vindication and national salvation','The gallows Haman built for Mordecai receive Haman instead. The king\'s fury subsides only when justice is complete','The whistleblower whose case file is finally read and the person who tried to silence them is the one removed','scholarship'],

  // EST 9 — The Jews defend themselves; Purim established
  ['mordecai','EST',9,1,32,'protagonist','authoritative-triumph','issue the counter-decree and establish the feast of Purim','permanent remembrance of deliverance','The Jews strike down their enemies but take no plunder, refusing to profit from justice. Mordecai writes to all the provinces: remember this, celebrate this, and never forget. Purim becomes mandatory joy','The leader who wins the existential fight and then institutionalizes the anniversary so the company never forgets how close it came','scholarship'],
  ['esther','EST',9,1,32,'deuteragonist','protective-authority','request a second day of defense in Susa and co-author the Purim decree','complete security and permanent memory','Esther asks for one more day because the threat in the capital is not fully neutralized. She is not satisfied with partial safety. Then she co-signs the Purim letter with Mordecai','The executive who says the recall is not done until every unit is accounted for and then co-writes the post-mortem policy','scholarship'],

  // EST 10 — Mordecai's greatness
  ['mordecai','EST',10,1,3,'protagonist','second-in-the-kingdom','serve as second to King Ahasuerus and advocate for his people','the ongoing welfare of the Jewish diaspora','Mordecai is great among the Jews, accepted by the multitude of his brothers, seeking the good of his people and speaking peace. Three verses that close the book with a portrait of faithful power','The executive who ends their career known for one thing: they used every bit of their power to protect the people who had none','scholarship'],
  ['esther','EST',10,1,3,'referenced figure','N/A','her courage made Mordecai\'s position possible','the partnership that saved a nation','Esther is not named in the final verses but her fingerprints are on every line. Without her banquet there is no reversal. Without her voice there is no decree','The co-founder whose name is not on the building but whose decision made the building possible','scholarship'],
]);

const rowCount = 136;
console.log('Done historical2 gaps (1KI,2KI,1CH,2CH,EZR,NEH,EST) -', rowCount, 'rows');
db.close();
