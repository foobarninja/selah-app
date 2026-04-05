const db = require('better-sqlite3')('data/selah.db');

// Ensure Jehosheba exists as a character (used in 2KI 11 and 2CH 22)
db.prepare(`INSERT OR IGNORE INTO characters (id, name, gender, occupation, social_status, era, bio_brief, source_tier, is_named, prominence)
  VALUES ('jehosheba','Jehosheba','female','princess / protector of the royal heir','daughter of King Jehoram, wife of Jehoiada the priest','divided-kingdom','Princess who hid the infant Joash from Queen Athaliah''s massacre, single-handedly preserving the Davidic line.','canon',1,'minor')`).run();

const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // NOTE: JOS, JDG, 1SA, 2SA gap chapters were already filled by a prior ETL run.
  // This script covers the remaining gaps: 1KI, 2KI, 1CH, 2CH, EZR, NEH, EST.

  // =============================
  // 1 KINGS (1KI) — 12 gap chapters
  // =============================

  // 1KI 1 — Adonijah's power grab and Solomon's coronation
  ['david','1KI',1,1,53,'protagonist','feeble-but-decisive','confirm Solomon as king before Adonijah seizes the throne','the succession and the dynasty','David is old and cold and cannot get warm. But when Bathsheba and Nathan tell him Adonijah is crowning himself, the old king gives one last decisive order','The bedridden founder who hears about a boardroom coup and dictates one final email that settles the succession','canon'],
  ['solomon','1KI',1,32,53,'deuteragonist','anointed-under-threat','be crowned king while his brother throws a rival coronation party','the Davidic dynasty','Solomon rides David\'s own mule to Gihon and the trumpet blows so loud that Adonijah\'s guests hear it mid-feast and scatter','The legitimate successor whose appointment announcement interrupts the rival\'s premature victory party','canon'],
  ['bathsheba','1KI',1,11,31,'witness','strategic-urgency','alert David to Adonijah\'s coup','her son\'s life and throne','Bathsheba follows Nathan\'s script perfectly, reminding David of his oath. She saves Solomon\'s future with timing and composure','The mother who walks into the boardroom and reminds the chairman of a promise he made, in front of witnesses','canon'],
  ['nathan-prophet','1KI',1,11,27,'witness','politically-astute','engineer Solomon\'s coronation by coaching Bathsheba','prophetic responsibility for the succession','Nathan orchestrates the counter-coup with the precision of a campaign manager. He tells Bathsheba exactly what to say and when','The advisor who scripts the press conference that saves the company from a hostile takeover','canon'],

  // 1KI 2 — David's deathbed instructions and Solomon consolidates
  ['david','1KI',2,1,12,'protagonist','dying-clarity','give Solomon final instructions including a hit list','securing the throne through strategic elimination','Be strong and show yourself a man. Then David lists who to reward and who to eliminate. Joab, Shimei. Deathbed politics','The retiring executive whose final memo includes who to promote and who to fire','canon'],
  ['solomon','1KI',2,13,46,'deuteragonist','cold-consolidation','execute or exile everyone who threatens his throne','absolute security for the new reign','Solomon kills Adonijah, banishes Abiathar, executes Joab at the altar, and traps Shimei into a death sentence. The kingdom is established in Solomon\'s hand','The new CEO who, in the first quarter, restructures the entire executive team and eliminates every rival center of power','canon'],
  ['joab','1KI',2,28,35,'witness','defiant-cornered','cling to the altar horns hoping for sanctuary','his life after decades of loyal violence','Joab grabs the horns of the altar and says I will die here. Benaiah kills him there. The enforcer who knew too much dies at the place of mercy','The fixer whose knowledge of where the bodies are buried becomes the reason he is buried','canon'],

  // 1KI 4 — Solomon's administration and wisdom
  ['solomon','1KI',4,1,34,'protagonist','peak-governance','organize the kingdom with twelve governors and unprecedented abundance','administrative excellence and international renown','Solomon\'s daily provisions include thirty cors of fine flour and sixty of meal. He speaks three thousand proverbs. Judah and Israel are as numerous as sand','The quarter where the org chart is perfect, every department is staffed, and the CEO is writing thought leadership articles','canon'],

  // 1KI 6 — Building the Temple
  ['solomon','1KI',6,1,38,'protagonist','devoted-construction','build the Temple exactly to God\'s specifications over seven years','creating God\'s permanent dwelling among Israel','The Temple takes seven years. Every stone is cut at the quarry so no hammer or chisel is heard during construction. Sacred silence on the job site','Building the new headquarters with such precision that no one hears the construction noise from inside the existing office','canon'],

  // 1KI 7 — Solomon's palace and Temple furnishings
  ['solomon','1KI',7,1,51,'protagonist','ambitious-grandeur','build his own palace in thirteen years and furnish the Temple','personal legacy and worship infrastructure','The palace takes thirteen years, almost twice the Temple. Hiram of Tyre casts the two bronze pillars, the molten sea, and ten bronze stands','Spending more on the executive suite than on the chapel, but making sure the chapel furnishings are world-class','canon'],
  ['hiram-king-of-tyre','1KI',7,13,47,'deuteragonist','master-craftsmanship','cast the bronze work for the Temple','commercial partnership and artistic legacy','Hiram casts the two pillars Jachin and Boaz, the molten sea on twelve oxen, and all the bronze vessels. A pagan artisan builds God\'s furniture','The contracted designer whose work becomes the most iconic element of someone else\'s building','canon'],

  // 1KI 8 — Temple dedication
  ['solomon','1KI',8,1,66,'protagonist','worshipful-intercession','dedicate the Temple with prayer, sacrifice, and celebration','God\'s presence filling the house','The cloud fills the Temple so thickly the priests cannot stand. Solomon prays the longest prayer in Kings: when they sin, when there is famine, when the foreigner comes. He covers every scenario','The founder who gives the dedication speech and imagines every possible future the building might face','canon'],

  // 1KI 9 — God's warning to Solomon
  ['solomon','1KI',9,1,28,'protagonist','warned-at-the-peak','receive God\'s conditional promise and manage international projects','the permanence of the dynasty depends on obedience','God appears a second time: if you turn aside, I will cut off Israel from this land and this house will become a heap. Warning at the apex','Getting a promotion letter and a performance improvement plan in the same envelope','canon'],

  // 1KI 13 — Man of God from Judah
  ['jeroboam','1KI',13,1,34,'antagonist','confronted-then-unchanged','continue his idolatrous worship at Bethel despite a prophetic sign','political control of northern worship','A man of God cries against the altar and Jeroboam\'s hand withers when he points at the prophet. The hand is restored but the heart is not','The leader who has a health scare at the office, recovers, and goes right back to the same behavior','canon'],

  // 1KI 14 — Judgment on Jeroboam and Rehoboam
  ['jeroboam','1KI',14,1,20,'protagonist','desperate-deception','send his wife in disguise to the blind prophet Ahijah','learning his sick son\'s fate','Jeroboam sends his wife disguised to Ahijah. The blind prophet says come in, wife of Jeroboam, why pretend? The boy will die when your feet enter the city','Sending someone else to get your diagnosis because you are too afraid to hear it yourself','canon'],
  ['rehoboam','1KI',14,21,31,'deuteragonist','unfaithful-decline','preside over Judah\'s spiritual and military decline','the southern kingdom\'s integrity','Judah does evil. Shishak of Egypt plunders the Temple treasures Solomon stored. The gold shields are replaced with bronze. Decline measured in metals','Replacing the company\'s premium equipment with budget substitutes and pretending nothing changed','canon'],

  // 1KI 15 — Abijam and Asa of Judah
  ['solomon','1KI',15,1,24,'referenced figure','legacy-shadow','his faithfulness and failures frame the evaluation of every subsequent king','the measuring stick for all of Judah\'s kings','Every king is measured against David. Abijam walked in all the sins of his father. Asa\'s heart was wholly true. The founder\'s standard outlives the founder','The founder\'s principles used to evaluate every successor decades after they are gone','inferred'],

  // 1KI 16 — Northern dynasty chaos
  ['jeroboam','1KI',16,1,34,'referenced figure','condemned-legacy','his sin becomes the template for every northern king','the theological default setting of the northern kingdom','Four kings in one chapter: Baasha, Elah, Zimri, Omri. Zimri reigns seven days. The north is a revolving door of violence. All walk in the way of Jeroboam','The startup that changes CEOs four times in two years, each one repeating the same structural mistake','inferred'],
  ['ahab','1KI',16,29,34,'protagonist','corrupted-alliance','marry Jezebel and introduce Baal worship officially','the theological identity of the northern kingdom','Ahab did more to provoke the LORD than all the kings before him. As if it were a light thing to walk in Jeroboam\'s sins, he married Jezebel','The executive who marries into a competing ideology and lets it rewrite the company mission','canon'],

  // 1KI 20 — Ahab defeats Aram twice then spares Ben-hadad
  ['ahab','1KI',20,1,43,'protagonist','obedient-then-foolish','defeat Ben-hadad of Aram twice by divine aid then spare him by treaty','military victory squandered by misplaced mercy','A prophet says this vast army will be yours today. Ahab wins twice. Then he calls Ben-hadad my brother and makes a treaty. A prophet says your life for his life','Winning the lawsuit, then settling with the defendant over drinks and giving back everything the court awarded','canon'],

  // =============================
  // 2 KINGS (2KI) — 15 gap chapters
  // =============================

  // 2KI 1 — Ahaziah and Elijah's fire
  ['elijah','2KI',1,1,18,'protagonist','uncompromising-authority','confront King Ahaziah for consulting Baal-zebub instead of God','the exclusive authority of the God of Israel','Ahaziah sends fifty soldiers to arrest Elijah. Fire falls from heaven. He sends fifty more. Fire again. The third captain begs for mercy','The regulator who keeps shutting down the company\'s workarounds until someone finally comes in person with humility','canon'],

  // 2KI 3 — Moab campaign with Elisha
  ['elisha','2KI',3,1,27,'protagonist','reluctant-prophetic-aid','provide water and victory for the allied kings against Moab','proving God acts even through flawed alliances','Elisha says I would not look at you except for Jehoshaphat\'s sake. Bring me a musician. While the harpist plays, the word of the LORD comes','The consultant who only takes the meeting as a favor to a friend and then delivers the breakthrough insight while background music plays','canon'],
  ['jehoshaphat','2KI',3,1,27,'deuteragonist','alliance-seeking','join Israel\'s campaign against Moab','political solidarity and military cooperation','Jehoshaphat asks again for a real prophet. His pattern: allying with bad kings but insisting on consulting God. Consistent inconsistency','The board member who keeps investing in questionable ventures but always asks for an ethics review first','canon'],

  // 2KI 4 — Elisha's miracles: oil, Shunammite's son, poison stew, bread
  ['elisha','2KI',4,1,44,'protagonist','compassionate-power','multiply oil for a widow, raise the Shunammite\'s son, purify stew, multiply bread','serving ordinary people with extraordinary power','Four miracles in one chapter: debt relief, resurrection, food safety, and multiplication. Elisha is the blue-collar prophet','The community organizer who pays off a family\'s medical bills, saves a child, fixes the contaminated water supply, and feeds the neighborhood in one week','canon'],

  // 2KI 7 — Siege of Samaria broken by four lepers
  ['elisha','2KI',7,1,20,'protagonist','prophetic-certainty','predict the siege will end and food prices will collapse by tomorrow','the survival of a starving city','Elisha says tomorrow a seah of fine flour for a shekel. The officer says if the LORD opened windows in heaven, could this happen? Elisha says you will see it but not eat it. He is trampled at the gate','The analyst who predicts the market reversal and the skeptic who bets against it and gets wiped out','canon'],

  // 2KI 8 — Hazael and Elisha weeps
  ['elisha','2KI',8,1,15,'protagonist','grief-stricken-foresight','weep because he knows what Hazael will do to Israel','prophetic burden of knowing the future','Hazael asks why are you weeping? Elisha says because I know the evil you will do. You will set fire to their fortresses, kill their young men, and dash their children. Then he says the LORD has shown me you will be king','The advisor who weeps at the succession announcement because they alone know what the new leader will become','canon'],

  // 2KI 10 — Jehu's purge of Baal
  ['jehu','2KI',10,1,36,'protagonist','zealous-overkill','exterminate Ahab\'s house and destroy Baal worship','fulfilling prophetic judgment and securing the throne','Jehu gathers all Baal worshipers into the temple pretending to hold a great sacrifice, then slaughters them all. He destroys the pillar but keeps Jeroboam\'s calves','The reformer who burns the obvious corruption but keeps the systemic one because it serves his politics','canon'],

  // 2KI 11 — Athaliah's usurpation and Joash crowned
  ['joash','2KI',11,1,21,'protagonist','hidden-then-crowned','be hidden for six years then crowned as the rightful king','the survival of the Davidic line','Athaliah kills all the royal family but the infant Joash is hidden in the temple by his aunt. At age seven, the priest crowns him and Athaliah is executed','The heir hidden in a safe house for years who emerges when the usurper is finally removed','canon'],
  ['jehosheba','2KI',11,1,3,'deuteragonist','courageous-protection','hide the infant Joash from Athaliah\'s massacre','preserving the Davidic dynasty','Jehosheba steals the baby from among the royal children being murdered and hides him in the temple for six years. One woman saves the entire messianic line','The employee who hides the backup tapes when the CEO orders all records destroyed','canon'],

  // 2KI 13 — Death of Elisha
  ['elisha','2KI',13,14,25,'protagonist','dying-prophecy','give King Joash a prophetic test with arrows','the extent of Israel\'s future victories','Elisha is on his deathbed. He tells the king to strike the ground with arrows. The king strikes three times and stops. Elisha is angry: you should have struck five or six times','The mentor on their last day who gives you a test and you give a mediocre answer, and they tell you that answer just cost you two years of growth','canon'],

  // 2KI 14 — Amaziah and Jehoash
  ['amaziah-priest','2KI',14,1,29,'referenced figure','partial-obedience','defeat Edom then challenge Israel foolishly','pride after a small victory','Amaziah beats Edom and gets cocky. He challenges Jehoash of Israel. Jehoash sends the thistle-and-cedar fable: why invite trouble? Amaziah insists. Jerusalem\'s wall is broken','The regional champion who challenges the national competitor, gets humiliated, and loses their home market','inferred'],

  // 2KI 15 — Rapid succession of northern kings
  ['people-of-israel','2KI',15,1,38,'referenced figure','spiraling-instability','cycle through five kings in rapid succession','the disintegration of the northern kingdom','Zechariah, Shallum, Menahem, Pekahiah, Pekah. Assassinations, conspiracies, and Assyrian tribute. The kingdom hemorrhages leaders','The company that goes through five CEOs in three years, each one ousted by the next, while the real competitor closes in','inferred'],

  // 2KI 16 — Ahaz of Judah
  ['hezekiah','2KI',16,1,20,'referenced figure','future-reformer','his father Ahaz\'s apostasy sets up his later reforms','the theological baseline Hezekiah will reverse','Ahaz copies an Assyrian altar design, rearranges the temple to please Tiglath-pileser, and sacrifices his own son. The lowest point before the reform','The previous administration whose policies were so catastrophic that the successor inherits a mandate for total change','inferred'],

  // 2KI 19 — Sennacherib's defeat (parallel to ch 18-19 combined)
  ['hezekiah','2KI',19,1,37,'protagonist','desperate-prayer','spread Sennacherib\'s threatening letter before the LORD','the survival of Jerusalem and the Davidic kingdom','Hezekiah prays: you alone are God. That night the angel of the LORD kills 185,000 Assyrian soldiers. Sennacherib goes home and is murdered by his own sons','Laying the lawsuit on the table, praying over it, and then watching the plaintiff\'s case collapse from internal causes','canon'],
  ['isaiah','2KI',19,5,34,'deuteragonist','prophetic-encouragement','deliver God\'s mocking reply to Sennacherib','divine credibility against imperial propaganda','Isaiah says the virgin daughter of Zion despises you, Sennacherib. God puts a hook in your nose and leads you home. The most brutal divine trash-talk in the Bible','The press secretary who drafts the response that turns the hostile coverage into a victory lap','canon'],

  // 2KI 21 — Manasseh's wickedness
  ['hezekiah','2KI',21,1,26,'referenced figure','legacy-undone','his reforms are reversed by his own son Manasseh','the impermanence of revival without heart change','Manasseh rebuilds every altar Hezekiah tore down, practices sorcery, and fills Jerusalem with innocent blood. Tradition says he sawed Isaiah in half','The successor who dismantles every policy the reformer built, board by board, in their first year','inferred'],

  // 2KI 23 — Josiah's comprehensive reform
  ['josiah','2KI',23,1,30,'protagonist','zealous-purification','destroy every high place, idol, and pagan altar in Judah','delaying God\'s judgment through total reform','Josiah burns the Asherah pole, defiles Topheth, slaughters the idolatrous priests, and celebrates the greatest Passover since the judges. Then he is killed at Megiddo','The CEO who personally shreds every fraudulent document, fires every complicit manager, throws the company\'s biggest celebration, and then is killed in a freak accident','canon'],

  // 2KI 25 — Fall of Jerusalem and exile
  ['zedekiah-last-king','2KI',25,1,7,'protagonist','desperate-then-captured','flee Jerusalem as the Babylonians breach the walls','his life and the remnant of the kingdom','Zedekiah runs at night and is caught near Jericho. His sons are killed before his eyes, then his eyes are put out. The last image he sees is the end of everything','The executive who tries to flee with the hard drives and is caught at the airport, watching the company dissolved in real time','canon'],
  ['nebuchadnezzar','2KI',25,8,21,'antagonist','methodical-destruction','burn the Temple, break the walls, and deport the population','completing the Babylonian conquest of Judah','Nebuzaradan the captain burns every significant building, breaks down the walls, and carries off the bronze, gold, and silver. A civilization reduced to scrap metal','The liquidator who catalogs every asset, strips the building, and ships the inventory to the parent company\'s warehouse','canon'],

  // =============================
  // 1 CHRONICLES (1CH) — 24 gap chapters
  // =============================

  // 1CH 2 — Genealogy of Judah through David
  ['david','1CH',2,1,55,'referenced figure','genealogical-center','his lineage from Judah through Jesse is the backbone of this chapter','the messianic line runs through Judah to David','The genealogy narrows from Judah to Perez to Hezron to Ram to Jesse to David. Every name is a stepping stone to the throne','The family tree document that shows how the current CEO descends from the original founder through seven generations','canon'],

  // 1CH 3 — David's descendants and royal line
  ['david','1CH',3,1,24,'referenced figure','dynastic-root','his sons and their descendants form the royal genealogy through exile and return','the continuity of the Davidic promise through catastrophe','David\'s sons are listed, then Solomon\'s line through the exile to Zerubbabel. The promise survives Babylon','The succession chart that proves the founding family still has a living heir despite every hostile takeover','canon'],

  // 1CH 4 — Jabez and tribal genealogies
  ['david','1CH',4,1,43,'referenced figure','tribal-context','these clans eventually form his kingdom\'s population base','the social infrastructure of the monarchy','Jabez prays: bless me and enlarge my territory. One prayer buried in a genealogy becomes the most famous verse in the chapter','The footnote in the annual report that becomes more famous than the report itself','canon'],

  // 1CH 5 — Reuben, Gad, half-Manasseh
  ['david','1CH',5,1,26,'referenced figure','implied-endpoint','the eastern tribes\' genealogies point toward the unified kingdom','territorial claims and tribal faithfulness','Reuben lost the birthright because he defiled his father\'s bed. The rights went to Joseph but the leadership went to Judah. Genealogy as theology','The org chart that explains why the firstborn does not run the company and the fourth-born does','canon'],

  // 1CH 6 — Levitical genealogy and cities
  ['samuel','1CH',6,1,81,'referenced figure','levitical-heritage','his ancestry among the Kohathite Levites grounds his prophetic authority','priestly legitimacy for the last judge','Samuel appears in the Levitical genealogy connecting him to the tabernacle ministry. The prophet was also a priest by blood','Discovering that the consultant who saved the company was actually from the founding family all along','canon'],

  // 1CH 7 — Northern tribes genealogy
  ['david','1CH',7,1,40,'referenced figure','national-unity','these northern tribes form part of the kingdom he will unite','the demographic foundation of Israel','Issachar, Benjamin, Naphtali, Manasseh, Ephraim, Asher. Brief genealogies like roll calls at muster. Each tribe counted and remembered','The census data that shows every division of the company still exists, still has employees, still matters','inferred'],

  // 1CH 8 — Benjamin's genealogy featuring Saul
  ['saul','1CH',8,1,40,'referenced figure','genealogical-context','his family line is traced within the tribe of Benjamin','the transition from Saul to David framed genealogically','Saul\'s family is listed in detail. The Chronicler does not erase Saul; he contextualizes him. Even failed kings have a place in the record','The former CEO whose portrait still hangs in the lobby because the history matters even when the tenure did not','canon'],

  // 1CH 9 — Returnees from exile
  ['david','1CH',9,1,44,'referenced figure','restoration-anchor','the returned exiles reorganize around Davidic structures','post-exilic identity and continuity','The chapter lists who came back from Babylon: priests, Levites, gatekeepers, singers. The same roles David organized, now rebuilt from scratch','The company that rebuilds after bankruptcy using the original founder\'s org chart as the blueprint','inferred'],

  // 1CH 11 — David's mighty men at Hebron
  ['david','1CH',11,1,47,'protagonist','magnetic-leadership','rally all Israel at Hebron and capture Jerusalem','uniting the nation and establishing the capital','All Israel comes to Hebron and says we are your bone and flesh. David takes Jerusalem. The mighty men list follows: warriors who bled for him before he was king','The IPO prospectus that names every early employee who built the company when no one believed in it','canon'],

  // 1CH 12 — Warriors who joined David
  ['david','1CH',12,1,40,'protagonist','coalition-builder','receive warriors from every tribe, even Benjamin and Manasseh','building the broadest possible coalition for kingship','Men from every tribe come to David at Ziklag and Hebron. Even Saul\'s own tribe sends defectors. The movement becomes a flood','The political candidate who starts with a core base and ends with endorsements from every demographic, including the opponent\'s home district','canon'],

  // 1CH 14 — David defeats the Philistines
  ['david','1CH',14,1,17,'protagonist','God-directed-victory','defeat the Philistines twice using different strategies each time','establishing military dominance under divine guidance','The first time God says go up. The second time God says go around and wait for the sound of marching in the treetops. Different problem, different strategy, same God','The leader who does not copy-paste last quarter\'s playbook but asks for fresh direction every time','canon'],

  // 1CH 15 — Ark brought to Jerusalem properly
  ['david','1CH',15,1,29,'protagonist','joyful-reverence','bring the Ark to Jerusalem on the shoulders of Levites, not a cart','correcting the Uzzah disaster by following the proper procedure','David says no one but the Levites may carry the Ark, because we did not seek God according to the rule. The second attempt follows the manual','The team that reruns the deployment following the documented process after the first attempt crashed production','canon'],

  // 1CH 16 — David's psalm of thanksgiving
  ['david','1CH',16,1,43,'protagonist','ecstatic-worship','install the Ark in the tent and establish perpetual worship','worship as the centerpiece of national life','David composes a psalm blending parts of Psalms 96, 105, and 106. He appoints Asaph and the Levitical musicians for continuous service','The founder who writes the company values on the wall and hires a team whose only job is to keep the culture alive','canon'],

  // 1CH 18 — David's military victories (parallel to 2SA 8)
  ['david','1CH',18,1,17,'protagonist','conquering-expansion','defeat surrounding nations and administer justice','building the empire that Solomon will inherit','David defeats Philistia, Moab, Zobah, Aram, Edom. He dedicates all plunder to the LORD. The Chronicler emphasizes: David administered justice and equity','The CEO who wins market share in five verticals and donates the windfall profits to the foundation','canon'],

  // 1CH 19 — War with Ammon (parallel to 2SA 10)
  ['joab','1CH',19,1,19,'protagonist','tactical-brilliance','fight a two-front war against Ammon and Aram','military survival and national honor','Joab faces armies in front and behind. He picks the best troops for one front and gives the rest to Abishai. Be strong for our people and for the cities of our God','The manager who splits the team to fight two crises at once and tells everyone to give everything because the mission matters','canon'],
  ['david','1CH',19,1,19,'deuteragonist','insulted-then-victorious','respond to the humiliation of his ambassadors','diplomatic honor and regional dominance','David\'s messengers are shaved and humiliated. The Ammonites know they have made themselves an enemy and hire mercenaries. It does not help','The company that retaliates after a rival publicly humiliates their delegation at a trade show','canon'],

  // 1CH 20 — Capture of Rabbah and Philistine giants
  ['david','1CH',20,1,8,'protagonist','commanding-authority','finish the siege of Rabbah and take the crown of their king','completing the Ammonite conquest','David takes the crown from the king\'s head, weighing a talent of gold. The Chronicler skips Bathsheba entirely. Grace by omission','The biography that skips the scandal and goes straight from the war to the coronation','canon'],

  // 1CH 22 — David prepares for the Temple
  ['david','1CH',22,1,19,'protagonist','purposeful-generosity','prepare materials and charge Solomon to build the Temple','ensuring the Temple is built even though he cannot do it himself','David stockpiles gold, silver, bronze, iron, timber, and stone in vast quantities. I have taken great pains to provide for the house of the LORD','The founder who cannot build the new headquarters but spends years stockpiling the materials so the successor can','canon'],
  ['solomon','1CH',22,6,16,'deuteragonist','charged-with-mission','receive his father\'s commission to build the Temple','fulfilling God\'s plan through David\'s preparation','David tells Solomon: be strong and courageous, do not be afraid. The same words God spoke to Joshua. The charge echoes across generations','The new leader hearing the same pep talk their predecessor received from the founder before them','canon'],

  // 1CH 23 — Organization of Levites
  ['david','1CH',23,1,32,'protagonist','administrative-worship','organize the twenty-four thousand Levites into divisions for temple service','ensuring worship runs smoothly after his death','David divides the Levites by clan and assigns their duties: gates, treasuries, music, service. Worship as an organizational chart','The outgoing executive who writes the operational manual so detailed that the successor cannot fail','canon'],

  // 1CH 24 — Priestly divisions
  ['david','1CH',24,1,31,'protagonist','systemic-planning','divide the priests into twenty-four rotating courses','fair rotation and coverage of temple worship','The lots fall to determine which priestly family serves which week. Zechariah\'s course of Abijah will still be active when an angel appears in Luke 1','The shift schedule written so far in advance that it is still being followed centuries later','canon'],

  // 1CH 25 — Musicians and singers
  ['david','1CH',25,1,31,'protagonist','artistic-devotion','organize the temple musicians into twenty-four courses','worship through music as a permanent institution','Asaph, Heman, and Jeduthun prophesy with lyres, harps, and cymbals. Two hundred and eighty-eight trained singers. Music is not decoration; it is ministry','The company that hires a full-time creative team and gives them the same org-chart authority as engineering','canon'],

  // 1CH 26 — Gatekeepers and treasurers
  ['david','1CH',26,1,32,'protagonist','operational-thoroughness','assign gatekeepers, treasurers, and external officials','security and financial integrity for the temple','Every gate has assigned keepers, every treasury has a named official. Nothing is left to chance or goodwill','The security and finance team buildout that ensures every access point is monitored and every dollar is tracked','canon'],

  // 1CH 27 — Military and civil divisions
  ['david','1CH',27,1,34,'protagonist','national-organizer','organize military divisions of twenty-four thousand men per month and tribal leaders','the administrative infrastructure of the kingdom','Twelve divisions of twenty-four thousand rotate monthly. Each tribe has a named leader. David runs a nation like a well-staffed enterprise','The org chart that shows monthly rotation of on-call teams, named leads for every department, and clear reporting lines','canon'],

  // 1CH 28 — David's charge to Solomon and the assembly
  ['david','1CH',28,1,21,'protagonist','solemn-commissioning','publicly charge Solomon to build the Temple and hand over the blueprints','the transition of power and the temple plans','David gives Solomon the plans for the temple in writing, by the Spirit. Every porch, room, treasury, and angel wing is specified. Then he says be strong, the LORD is with you','The founder handing the architect the blueprints they drew during their illness, saying build exactly this','canon'],
  ['solomon','1CH',28,9,21,'deuteragonist','awed-recipient','receive the temple plans and his father\'s blessing','fulfilling the mission David could not','Solomon is told: the LORD has chosen you to build a house for the sanctuary. Be strong and do it. He inherits a mission bigger than any military conquest','The successor who receives not a company but a cathedral to build','canon'],

  // 1CH 29 — David's offerings and death
  ['david','1CH',29,1,30,'protagonist','generous-worship','give his personal fortune and lead the nation in giving for the Temple','funding the Temple with sacrificial generosity','David gives three thousand talents of gold and seven thousand of silver from his personal treasury. Then the leaders give. Then the people give. Giving cascades','The founder who writes the first check for the capital campaign and the whole organization follows','canon'],

  // =============================
  // 2 CHRONICLES (2CH) — 29 gap chapters
  // =============================

  // 2CH 2 — Solomon negotiates with Hiram for Temple materials
  ['solomon','2CH',2,1,18,'protagonist','diplomatic-planning','negotiate with Hiram of Tyre for cedar, craftsmen, and materials','acquiring the resources to build the Temple','Solomon writes: the house I am about to build will be great, for our God is greater than all gods. International partnership for a sacred purpose','The CEO who writes the procurement letter explaining why this project matters more than any commercial deal','canon'],
  ['hiram-king-of-tyre','2CH',2,1,18,'deuteragonist','impressed-partnership','supply materials and skilled labor for the Temple','commercial alliance and international prestige','Hiram replies: because the LORD loves his people he has made you king. A pagan king theologizes about Israel\'s God. Commerce with commentary','The supplier who says in the cover letter that they are honored to be part of something that matters','canon'],

  // 2CH 3 — Temple construction begins
  ['solomon','2CH',3,1,17,'protagonist','reverent-construction','begin building the Temple on Mount Moriah at the threshing floor of Araunah','the physical construction of God\'s house','Solomon builds on Mount Moriah, where Abraham offered Isaac and David saw the angel. Every layer of the site carries theological weight','Breaking ground on a site where three generations of your family had defining moments','canon'],

  // 2CH 4 — Temple furnishings
  ['solomon','2CH',4,1,22,'protagonist','meticulous-craftsmanship','build the altar, the bronze sea, the lampstands, and the tables','equipping the Temple for worship','The bronze altar is twenty cubits square. The molten sea holds three thousand baths. Ten lampstands, ten tables, a hundred gold basins. Scale communicates reverence','Outfitting the new building with custom-built furniture because off-the-shelf does not honor the mission','canon'],

  // 2CH 6 — Solomon's dedicatory prayer
  ['solomon','2CH',6,1,42,'protagonist','intercessory-grandeur','pray for every conceivable future scenario Israel might face','God\'s faithfulness to his promises through every crisis','Solomon kneels on a bronze platform before all Israel and prays: when there is famine, plague, war, sin, or a foreigner who comes because of your great name. He covers everything','The founder who writes the contingency plan that addresses every risk scenario the company might face for the next century','canon'],

  // 2CH 7 — Fire from heaven and God's conditional promise
  ['solomon','2CH',7,1,22,'protagonist','awed-by-fire','witness fire from heaven consuming the sacrifice','divine validation of the Temple','Fire falls from heaven and the glory of the LORD fills the temple. The people fall on their faces. Then God says at night: if my people humble themselves and pray, I will heal their land','Watching the prototype work perfectly on demo day and then getting a private message from the investor saying there are conditions','canon'],

  // 2CH 8 — Solomon's building projects and administration
  ['solomon','2CH',8,1,18,'protagonist','imperial-administration','build cities, organize worship, and manage international trade','the peak of Solomonic power and order','Solomon builds store cities, establishes trade with Ophir through Hiram\'s fleet, and ensures the priestly rotations run on David\'s schedule','The year when every capital project finishes on time, every trade route is profitable, and the operations manual runs itself','canon'],

  // 2CH 11 — Rehoboam fortifies Judah
  ['rehoboam','2CH',11,1,23,'protagonist','strategic-consolidation','fortify cities in Judah and Benjamin after the northern split','defending the reduced kingdom','Rehoboam builds fifteen fortress cities and distributes his sons as governors. Priests and Levites migrate south, strengthening Judah','Losing half the company in a split but fortifying the half you kept with the best talent who chose to stay','canon'],

  // 2CH 12 — Shishak invades, Rehoboam humbles himself
  ['rehoboam','2CH',12,1,16,'protagonist','humbled-by-invasion','humble himself after Shishak invades because he abandoned the Law','partial deliverance through partial repentance','Shemaiah says you abandoned God so God abandoned you to Shishak. Rehoboam and the leaders humble themselves. God says I will grant some deliverance but they will be servants','Losing the biggest client because you got complacent, then groveling enough to keep the account but on worse terms','canon'],

  // 2CH 13 — Abijah defeats Jeroboam
  ['rehoboam','2CH',13,1,22,'referenced figure','dynastic-context','his son Abijah fights Jeroboam with theological arguments','the legitimacy of the Davidic line versus the northern rebellion','Abijah stands on a mountain and preaches to Jeroboam\'s army: you have golden calves, we have the God of David and real priests. Then God strikes and Jeroboam never recovers','Giving the keynote at the competitor\'s conference explaining why your approach is the original and theirs is a knockoff, then winning the deal','canon'],

  // 2CH 14 — Asa defeats the Ethiopians
  ['hezekiah','2CH',14,1,15,'referenced figure','future-parallel','Asa\'s reforms foreshadow Hezekiah\'s later and greater reforms','the pattern of faithful kings seeking God before battle','Asa faces a million Ethiopian soldiers and prays: LORD, there is no one besides you to help the powerless against the mighty. God routs the army','Facing a competitor ten times your size and winning because you made the right call before the fight started','inferred'],

  // 2CH 15 — Asa's reform and covenant renewal
  ['solomon','2CH',15,1,19,'referenced figure','golden-standard','Asa\'s reforms are measured against the Solomonic ideal','the religious renewal of Judah under Asa','The Spirit comes on Azariah who says the LORD is with you when you are with him. Asa removes idols, restores the altar, and all Judah makes an oath to seek God','The turnaround CEO who strips out the distractions, reinstalls the founding principles, and gets the whole company to recommit','inferred'],

  // 2CH 16 — Asa's failure in old age
  ['solomon','2CH',16,1,14,'referenced figure','cautionary-decline','Asa\'s late-career failure echoes Solomon\'s own decline','the danger of trusting alliances over God in old age','Asa pays Aram to attack Israel instead of trusting God. The seer rebukes him. Asa throws the seer in prison and oppresses the people. Good kings can end badly','The executive who had a brilliant first decade and a disastrous last year because they stopped listening','inferred'],

  // 2CH 17 — Jehoshaphat's teaching initiative
  ['jehoshaphat','2CH',17,1,19,'protagonist','reforming-educator','send officials and Levites to teach the Law throughout Judah','national religious literacy','Jehoshaphat sends princes with Levites carrying the Book of the Law to teach in every city. The fear of the LORD falls on surrounding nations','The CEO who sends the senior team on a road show to every office with the company handbook, and competitors take notice','canon'],

  // 2CH 18 — Jehoshaphat and Ahab at Ramoth-gilead (parallel to 1KI 22)
  ['jehoshaphat','2CH',18,1,34,'protagonist','uneasy-alliance','join Ahab in battle despite Micaiah\'s warning','political alliance versus prophetic truth','Jehoshaphat says is there not still a prophet of the LORD? He asks the right question and then ignores the answer. Nearly dies when Ahab uses him as a decoy','The partner who insists on due diligence, gets bad results, and goes through with the deal anyway','canon'],
  ['micaiah','2CH',18,1,34,'deuteragonist','defiant-truth','tell the truth when four hundred prophets lie','the integrity of the prophetic word','I saw all Israel scattered on the mountains like sheep without a shepherd. Four hundred yes-men and one Micaiah. He goes to prison for being right','The analyst who presents the real numbers to a room full of people who presented the fake ones, and gets fired for it','canon'],

  // 2CH 19 — Jehoshaphat appoints judges
  ['jehoshaphat','2CH',19,1,11,'protagonist','reforming-justice','appoint judges throughout Judah with a charge to judge for the LORD','establishing a just legal system','Consider what you do, for you judge not for man but for the LORD. He appoints judges in every fortified city with explicit instructions on impartiality','The chief justice who personally onboards every new judge and says your loyalty is to the law, not to me','canon'],

  // 2CH 21 — Jehoram's wicked reign
  ['david','2CH',21,1,20,'referenced figure','covenant-anchor','the Davidic covenant prevents God from destroying Judah despite Jehoram','the unconditional promise holding through the worst king yet','Jehoram kills all his brothers, marries Ahab\'s daughter, and leads Judah into Baal worship. Yet the LORD was not willing to destroy the house of David because of the covenant','The subsidiary that should be shut down but is protected because the parent company made an irrevocable promise to the founder','canon'],

  // 2CH 22 — Ahaziah's brief reign and Athaliah's coup
  ['jehosheba','2CH',22,1,12,'deuteragonist','desperate-courage','hide the infant Joash from Athaliah\'s massacre','preserving the Davidic line through a single child','Athaliah destroys all the royal seed. Jehosheba hides Joash in the temple for six years. One woman, one baby, one closet in the temple. The dynasty survives','The archivist who hides the only backup when the new regime orders all records destroyed','canon'],

  // 2CH 23 — Joash crowned, Athaliah executed
  ['joash','2CH',23,1,21,'protagonist','revealed-king','be presented to the people after six years in hiding','the restoration of legitimate Davidic rule','Jehoiada the priest brings out the king\'s son, puts the crown on him, and gives him the testimony. Athaliah tears her clothes and cries Treason! The usurper calls the rightful king a traitor','The legitimate heir emerging from hiding while the person sitting in the chair screams that this is illegal','canon'],

  // 2CH 24 — Joash repairs the Temple then falls
  ['joash','2CH',24,1,27,'protagonist','reforming-then-fallen','repair the Temple under Jehoiada then turn to idols after Jehoiada dies','the danger of borrowed faith','Joash does right all the days of Jehoiada. When Jehoiada dies, Joash listens to new advisors and abandons the Temple. He even kills Jehoiada\'s son Zechariah','The protege who thrives under the mentor and collapses the moment the mentor retires','canon'],

  // 2CH 25 — Amaziah's partial obedience
  ['david','2CH',25,1,28,'referenced figure','measuring-standard','Amaziah does right but not with a whole heart, measured against David','the recurring standard for all Judean kings','Amaziah defeats Edom, brings back their gods, and worships them. A prophet says why seek gods that could not save their own people? Amaziah says who made you the king\'s counselor','The executive who wins the contract and then adopts the failing client\'s methodology for no rational reason','inferred'],

  // 2CH 26 — Uzziah's pride and leprosy
  ['david','2CH',26,1,23,'referenced figure','institutional-memory','Uzziah is measured against the Davidic standard','the link between pride and divine judgment','Uzziah is powerful until he is strong. Then he enters the temple to burn incense. Eighty priests confront him. Leprosy breaks out on his forehead while he rages at them','The CEO who decides they can also do the CFO\'s job, is confronted by the entire finance team, and is removed from the building','canon'],

  // 2CH 27 — Jotham's quiet faithfulness
  ['david','2CH',27,1,9,'referenced figure','quiet-faithfulness','Jotham does right like his father but does not enter the temple','steady governance without dramatic intervention','Jotham builds, fortifies, conquers Ammon, and becomes mighty because he ordered his ways before the LORD. Eight verses of competence without crisis','The manager who never makes headlines because everything in their department just works','inferred'],

  // 2CH 28 — Ahaz's comprehensive apostasy
  ['hezekiah','2CH',28,1,27,'referenced figure','future-contrast','Ahaz\'s total apostasy sets the stage for Hezekiah\'s total reform','the theological basement from which Hezekiah will build','Ahaz closes the temple doors, sets up altars on every corner of Jerusalem, and sacrifices his sons. He is not even buried in the royal tombs','The predecessor so bad that the job description for their replacement is just undo everything they did','inferred'],

  // 2CH 29 — Hezekiah reopens and cleanses the Temple
  ['hezekiah','2CH',29,1,36,'protagonist','urgent-restoration','reopen and purify the Temple in his first month as king','reversing decades of apostasy immediately','Hezekiah opens the temple doors in his first month and tells the Levites: our fathers were unfaithful, now it is in my heart to make a covenant. The Levites take sixteen days to clean the temple','The new CEO who on day one reopens the department the predecessor shut down and says we are going back to our mission','canon'],

  // 2CH 30 — Hezekiah's national Passover
  ['hezekiah','2CH',30,1,27,'protagonist','inclusive-zeal','invite all Israel including the northern tribes to celebrate Passover in Jerusalem','national reunion and spiritual renewal','Hezekiah sends couriers from Dan to Beersheba. Some northern tribes laugh at the invitation but some come. The Passover runs so well they extend it another seven days','Sending the reunion invitation to every branch including the ones that split off years ago, and some of them actually show up','canon'],

  // 2CH 31 — Hezekiah organizes tithes and priestly support
  ['hezekiah','2CH',31,1,21,'protagonist','administrative-reform','organize the collection and distribution of tithes for priests and Levites','sustaining the worship infrastructure financially','The people bring so much that the piles of grain overflow. Hezekiah orders storerooms prepared. Faithful giving creates a logistics problem','The fundraising campaign that exceeds the goal so dramatically that the finance team has to build new systems to process it','canon'],

  // 2CH 32 — Sennacherib's invasion and Hezekiah's pride
  ['hezekiah','2CH',32,1,33,'protagonist','faith-tested-then-proud','defend Jerusalem against Sennacherib then stumble in pride','the survival of Judah and the danger of success','Hezekiah tells the people: be strong, there is a greater power with us than with him. God sends an angel. Then Hezekiah gets sick, recovers, and shows off to Babylon. Pride follows every victory','The leader who delivers the greatest speech of their career, wins the crisis, and then gets caught showing off to the wrong people','canon'],
  ['sennacherib','2CH',32,1,23,'antagonist','blasphemous-arrogance','mock God and besiege Jerusalem','Assyrian expansion and theological intimidation','Sennacherib\'s officers shout in Hebrew at the walls: no god has delivered any nation from Assyria, your God will not either. An angel settles the argument','The competitor who publishes an open letter saying no one can beat them, then goes bankrupt within the quarter','canon'],

  // 2CH 33 — Manasseh's wickedness and repentance
  ['hezekiah','2CH',33,1,25,'referenced figure','undone-legacy','his reforms are reversed by his own son Manasseh','the fragility of institutional reform','Manasseh rebuilds every altar Hezekiah tore down. But the Chronicler adds what Kings does not: Manasseh is captured by Assyria, repents in prison, and God restores him. The worst king gets grace','The successor who destroys everything the reformer built, hits rock bottom in federal custody, and comes back humbled','canon'],

  // 2CH 35 — Josiah's Passover and death
  ['josiah','2CH',35,1,27,'protagonist','meticulous-joy-then-tragedy','celebrate the greatest Passover since Samuel and then die at Megiddo','the height of reform ending in inexplicable death','No Passover like it since Samuel. Josiah organizes every detail. Then Neco of Egypt marches through and Josiah inexplicably fights him. He dies in his chariot. All Judah mourns','The leader who throws the best company event in history and is killed in a car accident on the way home','canon'],

  // =============================
  // EZRA (EZR) — 6 gap chapters
  // =============================

  // EZR 2 — List of returnees
  ['zerubbabel','EZR',2,1,70,'protagonist','determined-return','lead the first wave of 42,360 returnees to Jerusalem','rebuilding the community from a census list','Every family is counted: priests, Levites, singers, gatekeepers, temple servants. Forty-two thousand three hundred and sixty souls. A nation rebuilt from a spreadsheet','The manifest of the first flight home after the company reopens its original headquarters','canon'],

  // EZR 4 — Opposition stops the rebuilding
  ['zerubbabel','EZR',4,1,24,'protagonist','frustrated-perseverance','refuse foreign help and face political opposition that halts the temple work','the purity and completion of the temple project','Local enemies offer to help build and are refused. They write to the Persian king and the work stops for years. Opposition from within and without','The project that gets shut down by regulatory complaints filed by the competitors who offered to co-develop it','canon'],

  // EZR 5 — Prophets encourage, work resumes
  ['zerubbabel','EZR',5,1,17,'protagonist','reinvigorated-obedience','resume building the temple after prophetic encouragement from Haggai and Zechariah','completing the temple despite years of delay','The prophets say build and Zerubbabel builds. The governor sends a letter to Darius asking whether Cyrus really authorized this. The work continues while the bureaucracy deliberates','Restarting the project on the strength of the original authorization while lawyers verify the paperwork','canon'],
  ['ezra','EZR',5,1,17,'referenced figure','future-arrival','the temple that Zerubbabel builds is the one Ezra will later reform','continuity between the first and second returns','Haggai and Zechariah prophesy. The elders build. The letter goes to Darius. The temple rises stone by stone while the empire processes the request','The team that keeps shipping features while legal reviews the contract in the background','inferred'],

  // EZR 6 — Temple completed and dedicated
  ['zerubbabel','EZR',6,1,22,'protagonist','triumphant-completion','complete and dedicate the second temple','restoring worship after seventy years of exile','Darius finds Cyrus\'s decree and orders the work funded from the royal treasury. The temple is finished. They celebrate Passover. Weeping turns to feasting','The day the building inspector signs off, the funding clears, and the grand opening happens all in the same week','canon'],

  // EZR 8 — Ezra's caravan to Jerusalem
  ['ezra','EZR',8,1,36,'protagonist','prayerful-courage','lead a second wave of returnees to Jerusalem carrying massive temple treasures without a military escort','the safety of people and treasure on a dangerous road','Ezra is ashamed to ask the king for soldiers because he told the king God protects those who seek him. So he fasts and prays instead. The treasure arrives intact','Telling the board you do not need insurance because you believe in the product, then shipping a million dollars of inventory with no security','canon'],

  // EZR 10 — Dissolution of foreign marriages
  ['ezra','EZR',10,1,44,'protagonist','anguished-obedience','lead the community in putting away foreign wives','covenant purity at devastating personal cost','The men sit in the rain weeping while Ezra demands compliance. Names are listed. Marriages dissolved. The most painful reform in the restoration','The compliance audit that results in people losing their positions, conducted in public, in the rain, with everyone watching','canon'],

  // =============================
  // NEHEMIAH (NEH) — 7 gap chapters
  // =============================

  // NEH 3 — Wall builders listed by section
  ['nehemiah','NEH',3,1,32,'protagonist','organizational-genius','assign every family and guild a section of the wall to rebuild','completing the wall through distributed labor','Eliashib the high priest builds the Sheep Gate. The goldsmiths repair their section. The perfumers repair theirs. Even the daughters of Shallum build. Everyone has a section','The project manager who breaks the deliverable into forty pieces and assigns every team a specific segment with their name on it','canon'],

  // NEH 7 — Census of returnees (parallel to Ezra 2)
  ['nehemiah','NEH',7,1,73,'protagonist','administrative-thoroughness','register the people by genealogy to establish legitimate citizenship','ensuring only verified returnees hold land and temple roles','Nehemiah finds the registry of those who came up first and counts again. Forty-two thousand three hundred and sixty. The same number as Ezra. Continuity confirmed','Running the audit a second time to verify the first results and getting the same number, confirming the data is clean','canon'],

  // NEH 9 — National confession
  ['nehemiah','NEH',9,1,38,'deuteragonist','pastoral-authority','lead the people through a day of fasting and confession','national repentance and covenant renewal','The people stand and confess for a quarter of the day and worship for another quarter. The Levites recite all of salvation history from Abraham to exile','The company retreat where the team spends the morning reviewing every failure and the afternoon recommitting to the mission','canon'],
  ['ezra','NEH',9,1,38,'protagonist','priestly-grief','lead the public reading and recitation of Israel\'s history of unfaithfulness','theological grounding for the covenant renewal','The Levites cry out: you are a forgiving God, gracious and compassionate, slow to anger and abounding in love. Even when our ancestors were arrogant you did not abandon them','The chaplain who reads the company\'s founding story at the memorial service, emphasizing every time the company was saved from its own mistakes','canon'],

  // NEH 10 — Covenant signed
  ['nehemiah','NEH',10,1,39,'protagonist','covenantal-leadership','lead the people in signing a binding written covenant','institutionalizing the reform so it outlasts the leader','The leaders, Levites, and priests sign. The people bind themselves: no intermarriage, no Sabbath commerce, temple tax, wood offering, firstfruits. Everything in writing','The entire leadership team signing the code of conduct on camera so no one can later claim they did not agree','canon'],

  // NEH 11 — Repopulation of Jerusalem
  ['nehemiah','NEH',11,1,36,'protagonist','strategic-settlement','repopulate Jerusalem by lot, one in ten families must live in the city','making the capital viable after the wall is built','The people cast lots and one in ten moves to Jerusalem. The rest bless those who volunteer. Living in the capital is a sacrifice not a privilege','The company that needs people to relocate to the new headquarters and has to incentivize the move because nobody wants to go','canon'],

  // NEH 12 — Wall dedication
  ['nehemiah','NEH',12,1,47,'protagonist','celebratory-worship','dedicate the wall with two great processions marching in opposite directions on top of the wall','the culmination of the entire rebuilding project','Two choirs march on top of the wall in opposite directions and meet at the temple. The joy of Jerusalem is heard far away. The sound carries','The ribbon-cutting ceremony where two teams walk the finished project from opposite ends and meet in the middle while the whole city watches','canon'],
  ['ezra','NEH',12,36,43,'deuteragonist','joyful-leadership','lead one of the two processions on the wall','shared celebration between the spiritual and civic leaders','Ezra leads one procession and Nehemiah follows the other. The priest and the governor, each on the wall, each marching toward the same center','The two cofounders who walk the finished building from opposite doors and shake hands in the lobby','canon'],

  // NEH 13 — Nehemiah's final reforms
  ['nehemiah','NEH',13,1,31,'protagonist','furious-reform','clean house after returning from a trip to find everything has backslid','sustaining reform when the leader turns their back','Nehemiah returns from Babylon to find Tobiah living in a temple room, Sabbath being violated, and foreign marriages resumed. He throws Tobiah\'s furniture out, shuts the gates on Sabbath, and pulls out people\'s hair','The CEO who goes on vacation for two weeks and comes back to find the dress code abandoned, the competitor invited to lunch, and the expense policy in shreds','canon'],

  // =============================
  // ESTHER (EST) — 5 gap chapters
  // =============================

  // EST 4 — Mordecai's mourning and Esther's resolve
  ['mordecai','EST',4,1,17,'protagonist','grief-stricken-urgency','mourn publicly and mobilize Esther to act','the survival of every Jew in the empire','Mordecai tears his clothes and wails at the gate. He sends the decree to Esther: who knows whether you have come to the kingdom for such a time as this. The most famous challenge in scripture','The mentor who says I did not invest in you for you to stay silent when everything is on the line','canon'],
  ['esther','EST',4,1,17,'deuteragonist','fearful-then-resolved','decide to approach the king uninvited despite the death penalty','her life and the survival of her people','If I perish, I perish. Three days of fasting before the most dangerous walk in the Persian court. She chooses her people over her safety','The whistleblower who files the report knowing the retaliation could end their career','canon'],

  // EST 6 — The king's sleepless night and Haman's humiliation
  ['mordecai','EST',6,1,14,'protagonist','unknowing-vindication','receive public honor for the assassination plot he uncovered in chapter two','divine timing and ironic justice','The king cannot sleep, reads the records, discovers Mordecai was never honored, and asks Haman what to do for someone the king wants to honor. Haman thinks it is about himself','The old email forwarded to the board at exactly the right moment that saves the person who sent it years ago','canon'],
  ['haman','EST',6,1,14,'antagonist','humiliated-dread','lead Mordecai through the streets in royal robes while shouting his honor','the collapse of his plan and his dignity','Haman has to put the robe on the man he planned to hang, lead him on the king\'s horse, and proclaim his honor in public. He goes home with his head covered','Being forced to present the award to the person you were trying to fire, in front of the entire company','canon'],

  // EST 7 — Esther's revelation and Haman's execution
  ['esther','EST',7,1,10,'protagonist','courageous-revelation','reveal her Jewish identity and accuse Haman at the second banquet','the lives of her people','The adversary and enemy is this wicked Haman. Esther names him to his face in front of the king. Timing, venue, and courage converge','The executive who stands up at the board meeting and says the person sitting across from me is the one defrauding the company','canon'],
  ['haman','EST',7,1,10,'antagonist','terrified-then-executed','beg Esther for mercy and be hanged on his own gallows','his life','Haman falls on the couch where Esther reclines, and the king thinks he is assaulting her. He is hanged on the fifty-cubit gallows he built for Mordecai. The irony is total','The person who built the trap for someone else and falls into it themselves, in the most public way possible','canon'],
  ['mordecai','EST',7,1,10,'deuteragonist','vindicated','be revealed as the target of Haman\'s genocide plot','justice and the reversal of the decree','The king learns Haman built gallows for Mordecai, the man who saved the king\'s life. The gallows become Haman\'s scaffold. Every weapon formed against Mordecai destroys its maker','The colleague whose enemies keep accidentally proving their loyalty with every attack they launch','canon'],

  // EST 9 — Jews defend themselves, Purim established
  ['mordecai','EST',9,1,32,'protagonist','triumphant-authority','oversee the Jewish self-defense and establish the feast of Purim','permanent remembrance of deliverance','The Jews strike down their enemies. Haman\'s ten sons are hanged. Mordecai writes the Purim decree: these days should be remembered and kept in every generation','The executive who after the crisis writes the company holiday into the calendar permanently so no one forgets what almost happened','canon'],
  ['esther','EST',9,1,32,'deuteragonist','protective-vigilance','request an additional day for the Jews in Susa and the hanging of Haman\'s sons','completing the destruction of the threat','Esther asks for one more day and for Haman\'s sons\' bodies to be publicly displayed. She is not being cruel; she is being thorough. Incomplete justice breeds future threats','The lawyer who asks the judge for the maximum penalty because they know a light sentence will embolden copycats','canon'],

  // EST 10 — Mordecai's greatness
  ['mordecai','EST',10,1,3,'protagonist','second-in-the-kingdom','serve as second to King Ahasuerus and advocate for Jewish welfare','the long-term security and prosperity of the Jewish diaspora','Mordecai the Jew was second in rank to King Ahasuerus, great among the Jews, and held in high esteem. He sought the good of his people and spoke peace to all his descendants','The immigrant who rises to the second-highest office in the land and uses every ounce of power to protect the community that raised them','canon'],
]);

console.log('Done HISTORICAL GAPS — inserted rows for 1KI(12ch) 2KI(15ch) 1CH(24ch) 2CH(29ch) EZR(6ch) NEH(7ch) EST(5ch)');
db.close();
