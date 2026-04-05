const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ===================== JOSHUA GAPS =====================

  // JOS 4 — memorial stones at Gilgal (narrative)
  ['joshua','JOS',4,1,24,'protagonist','reverent-authority','set up twelve memorial stones so future generations remember the Jordan crossing','collective memory and covenant identity','Joshua commands one man from each tribe to carry a stone from the riverbed, building a monument out of obedience','Creating a company tradition that reminds everyone where the journey started','scholarship'],
  ['god','JOS',4,1,24,'deuteragonist','faithful','exalt Joshua in the sight of all Israel','confirming Joshua as Moses\'s legitimate successor','God tells Joshua this day I will begin to exalt you, the crossing is the public endorsement','The board publicly backing the new CEO at the first all-hands meeting','scholarship'],

  // JOS 6 — fall of Jericho (narrative, already partially covered as ch5 in DB but ch6 text is distinct)
  ['joshua','JOS',6,1,27,'protagonist','commanding-faith','execute God\'s battle plan for Jericho','the first major victory in Canaan','Joshua orders seven days of marching, seven priests, seven trumpets. On the seventh day the walls collapse','Following a bizarre strategy from leadership that makes no sense until it works','scholarship'],
  ['rahab','JOS',6,1,27,'deuteragonist','anxious-hope','survive the city\'s destruction with her family','life or death by a scarlet cord','Rahab and her household are pulled out alive while everything else burns, faith rewarded at the last moment','The person who trusted the promise and waited while everything around them fell apart','scholarship'],

  // JOS 8 — conquest of Ai (narrative)
  ['joshua','JOS',8,1,35,'protagonist','strategic-confidence','take Ai by ambush after the Achan crisis is resolved','restoring momentum after a devastating defeat','Joshua sets a nighttime ambush behind the city, lures Ai\'s army out, and crushes them from both sides','Redesigning the strategy after a public failure and executing flawlessly the second time','scholarship'],
  ['god','JOS',8,1,35,'deuteragonist','directive','give Joshua the battle plan and reassure him','restoring Israel\'s confidence in divine backing','God says do not be afraid, I have given the king of Ai into your hand. The first words after the Achan disaster','The CEO sending a personal note to the team after a crisis saying we are back on track','scholarship'],

  // JOS 11 — northern campaign (narrative)
  ['joshua','JOS',11,1,23,'protagonist','relentless-obedience','defeat the northern coalition led by Jabin of Hazor','completing the conquest of the entire land','Joshua hamstrings their horses and burns their chariots, refusing to keep the superior technology for himself','The leader who destroys the competitive advantage rather than becoming dependent on it','scholarship'],
  ['god','JOS',11,1,23,'deuteragonist','sovereign','harden the hearts of the northern kings so they attack','ensuring total victory by gathering all enemies in one place','God orchestrates the coalition so Joshua can defeat them all at once rather than city by city','Letting the opposition consolidate so you can address everything in a single decisive action','scholarship'],

  // JOS 12 — list of defeated kings (list chapter)
  ['joshua','JOS',12,1,24,'protagonist','administrative','record thirty-one defeated kings as a summary of the conquest','historical accounting and covenant fulfillment','Thirty-one kings listed like a trophy wall, each name representing a battle God won through Israel','The annual report that lists every milestone achieved since the company launched','scholarship'],

  // JOS 14 — Caleb claims Hebron (territory chapter with narrative)
  ['joshua','JOS',14,1,15,'protagonist','administrative','distribute the land by lot as God commanded','fairness in allocation of the inheritance','Joshua oversees the division at Gilgal, ensuring each tribe receives what was promised','The executor of a will making sure every beneficiary gets their rightful share','scholarship'],

  // JOS 15 — territory of Judah (territory/list chapter)
  ['joshua','JOS',15,1,63,'protagonist','administrative','assign Judah\'s borders and cities','completing the tribal land grants','Judah receives the largest allotment, stretching from the Dead Sea to the Mediterranean, with detailed boundary markers','The surveyor mapping out property lines for the largest stakeholder in the development','scholarship'],

  // JOS 16 — territory of Ephraim (territory/list chapter)
  ['joshua','JOS',16,1,10,'protagonist','administrative','assign Ephraim\'s inheritance','tribal allotment for Joseph\'s descendants','Ephraim receives central hill country but fails to drive out the Canaanites of Gezer, a footnote that will haunt them','Giving a team their own territory but noting they never fully secured their perimeter','scholarship'],

  // JOS 17 — territory of Manasseh (territory/list chapter)
  ['joshua','JOS',17,1,18,'protagonist','administrative','assign western Manasseh\'s territory and address their complaint','fair distribution despite tribal pressure','The daughters of Zelophehad claim their inheritance and Manasseh complains they need more land, Joshua tells them to clear the forests','Telling the team that wants more resources to develop what they already have','scholarship'],

  // JOS 18 — remaining territories surveyed (territory/list chapter)
  ['joshua','JOS',18,1,28,'protagonist','administrative','rebuke seven tribes for delaying and survey the remaining land','completing the distribution before momentum is lost','Joshua asks how long will you wait before taking possession, then sends surveyors to map the remaining territory','The project manager who calls out the teams that have not started their assignments','scholarship'],

  // JOS 19 — remaining tribal allotments (territory/list chapter)
  ['joshua','JOS',19,1,51,'protagonist','administrative','assign land to the final six tribes and receive his own inheritance','finishing the allocation completely','Joshua himself receives Timnath-serah last, the leader takes his share only after everyone else is settled','The founder who pays themselves last after making sure every employee is compensated','scholarship'],

  // JOS 21 — Levitical cities (territory/list chapter)
  ['joshua','JOS',21,1,45,'protagonist','administrative','assign forty-eight cities to the Levites from the other tribes\' territories','ensuring the priestly tribe has places to live and serve','The Levites get no contiguous territory but are scattered throughout Israel as a spiritual infrastructure','Distributing support staff across every office instead of concentrating them at headquarters','scholarship'],

  // ===================== JUDGES GAPS =====================

  // JDG 5 — Song of Deborah (narrative/poetry)
  ['deborah','JDG',5,1,31,'protagonist','triumphant-worship','sing a victory hymn celebrating God\'s deliverance','theological interpretation of the battle','Deborah\'s song names the tribes who showed up and shames those who stayed home, public accountability through poetry','The team lead who sends the post-mortem email naming who helped and who ghosted','scholarship'],
  ['barak','JDG',5,1,31,'deuteragonist','celebratory','join Deborah in singing after the victory','shared credit for the deliverance','Barak sings alongside Deborah, the reluctant general now fully in the moment of triumph','The co-lead who finally steps into confidence after the project succeeds','scholarship'],

  // JDG 8 — Gideon's pursuit and decline (narrative)
  ['gideon','JDG',8,1,35,'protagonist','vengeful-then-idolatrous','pursue the Midianite kings and punish towns that refused help','personal vengeance and consolidation of victory','Gideon tortures the elders of Succoth with thorns, then makes an ephod that becomes an idol. The hero becomes the problem','The founder who wins the war but lets success corrupt them into building a cult of personality','scholarship'],

  // JDG 11 — Jephthah's negotiation and vow (narrative)
  ['jephthah','JDG',11,1,40,'protagonist','diplomatic-then-reckless','negotiate with Ammon then make a devastating vow','Israel\'s freedom at an unbearable personal cost','Jephthah sends messengers with a careful legal argument, then ruins everything with one impulsive sentence to God','The negotiator who wins the deal brilliantly then destroys their personal life with one rash promise','scholarship'],
  ['jephthahs-daughter','JDG',11,1,40,'deuteragonist','joyful-then-devastated','welcome her father home from victory','her own life becomes the price of his vow','She comes out dancing with tambourines and walks into a death sentence. Joy becomes horror in one doorway','The child who runs to greet a parent and walks into the worst news of their life','scholarship'],

  // JDG 12 — Jephthah vs Ephraim, shibboleth (narrative)
  ['jephthah','JDG',12,1,15,'protagonist','ruthless-authority','defeat the Ephraimites who threatened him after the Ammonite victory','tribal honor and political survival','Jephthah uses the word shibboleth as a password at the Jordan fords, forty-two thousand die for a mispronunciation','Using an insider test to identify who belongs and eliminating those who fail it','scholarship'],

  // JDG 15 — Samson's jawbone battle (narrative)
  ['samson','JDG',15,1,20,'protagonist','rage-fueled-strength','avenge the Philistines for taking his wife','personal vendetta escalating into national conflict','Samson ties torches to foxes\' tails, burns Philistine fields, then kills a thousand men with a donkey jawbone','The lone operator who causes massive collateral damage in pursuit of a personal grudge','scholarship'],
  ['god','JDG',15,1,20,'deuteragonist','providential','empower Samson and provide water from the rock','sustaining the flawed judge','God splits the rock at Lehi and water flows for the thirsty Samson, sustaining the vessel despite his chaos','Giving resources to the problematic employee because the mission still needs them','scholarship'],

  // JDG 16 — Samson and Delilah, his death (narrative)
  ['samson','JDG',16,1,31,'protagonist','self-destructive-then-redemptive','pursue Delilah and ultimately destroy the Philistine temple','personal pleasure that becomes his undoing and his final act of faith','Samson tells Delilah his secret after she nags him daily, is blinded and enslaved, then pulls down the temple on everyone including himself','The gifted person who throws everything away for a relationship, hits rock bottom, and makes one last stand','scholarship'],
  ['delilah','JDG',16,1,31,'antagonist','mercenary-persistence','extract the secret of Samson\'s strength for eleven hundred pieces of silver from each Philistine lord','money and power','Delilah tries four times, and Samson plays along until he breaks. She sells his secret without hesitation','The person who weaponizes intimacy for profit, patient enough to wait you out','scholarship'],

  // JDG 18 — Danite migration, theft of Micah's idol (narrative)
  ['micah-of-ephraim','JDG',18,1,31,'protagonist','helpless-outrage','try to stop the Danites from stealing his idols and priest','his personal religious system','Micah chases after six hundred armed Danites and is told to shut up or die. His entire shrine is stolen','The small business owner who watches a corporation copy their product and has no recourse','scholarship'],

  // JDG 20 — civil war against Benjamin (narrative)
  ['levite-of-judges','JDG',20,1,48,'protagonist','inflammatory','rally the tribes to war by sending pieces of his concubine throughout Israel','vengeance and justice, though his own cowardice caused the crisis','The Levite tells a sanitized version of the story to the assembly, leaving out his own role in pushing her outside','The person who tells the story of their victimhood while editing out their own failure','scholarship'],
  ['god','JDG',20,1,48,'deuteragonist','directive','instruct Israel which tribe goes first and when to attack','divine judgment on Benjamin\'s depravity','Israel asks God who shall go up first and loses twice before winning on the third day, obedience does not guarantee immediate success','Following the plan exactly and failing twice before the breakthrough comes','scholarship'],

  // JDG 21 — wives for Benjamin's survivors (narrative)
  ['god','JDG',21,1,25,'deuteragonist','silent','God is conspicuously absent from the decision-making','Israel acts without consulting God','The tribes find wives for Benjamin through two morally questionable schemes, and the narrator notes everyone did what was right in their own eyes','The team that solves a crisis with ethically dubious workarounds because no one is actually in charge','scholarship'],

  // ===================== 1 SAMUEL GAPS =====================

  // 1SA 2 — Eli's wicked sons and Hannah's song (narrative)
  ['hannah','1SA',2,1,11,'protagonist','prophetic-exultation','sing a prayer of triumph after dedicating Samuel','worship and theological declaration','Hannah\'s song declares God lifts the poor from the dust and seats them with princes, a preview of Mary\'s Magnificat','The person who comes from nothing and speaks truth about how the world actually works','scholarship'],
  ['eli','1SA',2,1,11,'deuteragonist','weak-permissive','fail to restrain his corrupt sons','the integrity of the priesthood','Eli\'s sons treat sacrifices with contempt and sleep with women at the tabernacle door, and Eli only gives a weak rebuke','The parent in leadership whose kids run wild in the office and everyone sees it but no one can say anything','scholarship'],
  ['samuel','1SA',2,1,11,'witness','growing-in-favor','serve before the LORD as a child','his formation as the future leader','The boy Samuel ministers before the LORD wearing a little linen ephod his mother makes him each year','The intern who is quietly learning the business while the executives self-destruct around them','scholarship'],

  // 1SA 5 — Ark among the Philistines (narrative)
  ['god','1SA',5,1,12,'protagonist','devastating-power','strike the Philistines with plagues while they hold the Ark','demonstrating that the God of Israel is not a captured trophy','The statue of Dagon falls facedown before the Ark twice, and tumors break out in every city that hosts it','The product you acquired from a competitor that proceeds to destroy your own infrastructure','scholarship'],

  // 1SA 6 — Philistines return the Ark (narrative)
  ['god','1SA',6,1,21,'protagonist','holy-judgment','guide the Ark home and strike those who look inside it','holiness demands reverence even in celebration','The Philistines send the Ark back on a cart with golden tumors and mice as guilt offerings, and seventy of Beth-shemesh die for looking inside','The hazardous asset that everyone wants to get rid of but nobody can handle safely','scholarship'],

  // 1SA 7 — Samuel rallies Israel at Mizpah (narrative)
  ['samuel','1SA',7,1,17,'protagonist','prophetic-authority','call Israel to repentance and lead them against the Philistines','national spiritual renewal','Samuel tells them to put away their foreign gods, pours water before the LORD, and thunderstorm routs the Philistines','The turnaround consultant who says step one is clean house, step two is recommit, step three is execute','scholarship'],
  ['god','1SA',7,1,17,'deuteragonist','thunderous-intervention','fight for Israel with a supernatural thunderstorm','answering repentance with deliverance','God thunders with a great thunder against the Philistines, and Samuel sets up a stone called Ebenezer: thus far the LORD has helped us','The dramatic turnaround that reminds everyone who is actually in charge','scholarship'],

  // 1SA 10 — Saul anointed and confirmed (narrative)
  ['saul','1SA',10,1,27,'protagonist','overwhelmed-transformation','receive the Spirit and be publicly selected as king','his readiness for kingship','The Spirit of God rushes upon Saul and he prophesies among the prophets, then hides among the baggage at his coronation','The new hire who crushed the interview, gets the offer, then panics on the first day','scholarship'],
  ['samuel','1SA',10,1,27,'deuteragonist','orchestrating','present Saul to the people through the lot-casting ceremony','legitimate public installation of the king','Samuel uses the sacred lots to publicly confirm what was already privately anointed, process validates revelation','The HR director who runs the formal promotion ceremony for the person already tapped for the role','scholarship'],

  // 1SA 11 — Saul rescues Jabesh-gilead (narrative)
  ['saul','1SA',11,1,15,'protagonist','Spirit-empowered-rage','rescue Jabesh-gilead from Nahash the Ammonite','proving himself as king through decisive military action','Saul hears the threat, the Spirit rushes on him, he cuts up his oxen and sends the pieces across Israel: rally or else','The new CEO who proves themselves with one bold decisive action in the first crisis','scholarship'],
  ['samuel','1SA',11,1,15,'deuteragonist','affirming','lead the covenant renewal at Gilgal after the victory','consolidating the monarchy on a high note','Samuel uses Saul\'s victory as the moment to formally install the kingdom, timing a ceremony to momentum','The advisor who says now is the moment to formalize what everyone just saw you do','scholarship'],

  // 1SA 12 — Samuel's farewell speech (narrative)
  ['samuel','1SA',12,1,25,'protagonist','solemn-integrity','give his farewell address and warn Israel about the risks of monarchy','his legacy and the nation\'s fidelity','Samuel asks who have I defrauded, and no one can accuse him. Then he calls thunder in wheat harvest to prove his point','The outgoing leader who asks for a public audit of their tenure and passes with a clean record','scholarship'],

  // 1SA 14 — Jonathan's bold raid (narrative)
  ['jonathan','1SA',14,1,52,'protagonist','daring-faith','attack the Philistine garrison with just his armor-bearer','proving God can save by many or by few','Jonathan climbs a cliff face and attacks a garrison alone, saying nothing can hinder the LORD from saving','The junior officer who takes initiative on a suicide mission and wins, embarrassing cautious leadership','scholarship'],
  ['saul','1SA',14,1,52,'antagonist','rash-then-foolish','impose a fasting oath on the army during battle','control and religious performance','Saul\'s oath nearly gets his own son killed. Jonathan eats honey, the army is starving, and Saul would have executed Jonathan if the troops had not intervened','The boss who creates a policy in the heat of the moment that almost destroys their best performer','scholarship'],

  // 1SA 15 — Saul spares Agag, rejected as king (narrative)
  ['saul','1SA',15,1,35,'protagonist','defiant-self-justification','spare King Agag and the best livestock against God\'s command','his kingship and his relationship with God','Saul says he saved the animals to sacrifice to God. Samuel replies: does the LORD delight in sacrifices as much as obedience? To obey is better than sacrifice','The executive who breaks the rule and reframes it as a strategic improvement','scholarship'],
  ['samuel','1SA',15,1,35,'deuteragonist','heartbroken-resolve','pronounce God\'s final rejection of Saul','prophetic integrity over personal grief','Samuel mourns for Saul but never visits him again. He hacks Agag to pieces before the LORD. The prophet does the grim work the king refused','The mentor who grieves the person they have to let go but does not waver on the decision','scholarship'],

  // 1SA 19 — Saul tries to kill David, Michal helps David escape (narrative)
  ['david','1SA',19,1,24,'protagonist','desperate-flight','escape Saul\'s repeated assassination attempts','his life','David dodges a spear, escapes through a window, and flees to Samuel at Ramah while Saul\'s agents keep coming','Running from a workplace where the boss has literally tried to destroy you','scholarship'],
  ['saul','1SA',19,1,24,'antagonist','murderous-obsession','pin David to the wall with a spear and then send agents to kill him','eliminating the rival he cannot control','Saul throws the spear, sends assassins to David\'s house, and finally goes to Ramah himself, only to be overcome by the Spirit and lie naked all day','The executive who keeps escalating tactics against a rival until they embarrass themselves publicly','scholarship'],

  // 1SA 20 — Jonathan warns David (narrative)
  ['jonathan','1SA',20,1,42,'protagonist','torn-loyalty','confirm Saul\'s intent and warn David','saving his best friend against his father\'s orders','Jonathan uses the arrow signal to tell David to run, then they weep together knowing this is likely goodbye','Helping your friend escape a toxic situation even though it puts your own position at risk','scholarship'],
  ['david','1SA',20,1,42,'deuteragonist','grieving-fear','learn whether Saul truly intends to kill him','his life and his friendship with Jonathan','David hides in the field and waits for Jonathan\'s signal, his fate decided by which way the arrows fall','Waiting for the text that tells you whether you still have a future where you are','scholarship'],

  // 1SA 21 — David at Nob, flees to Gath (narrative)
  ['david','1SA',21,1,15,'protagonist','deceptive-desperation','get food and a weapon from the priests at Nob, then flee to Gath','immediate survival as a fugitive','David lies to Ahimelech the priest, takes the holy bread and Goliath\'s sword, then pretends to be insane before the Philistine king','The person on the run who says whatever they need to say at each stop to stay alive','scholarship'],

  // 1SA 22 — Saul massacres the priests of Nob (narrative)
  ['saul','1SA',22,1,23,'antagonist','paranoid-rage','massacre the priests who helped David','eliminating anyone who might support his rival','Saul orders eighty-five priests killed because Ahimelech gave David bread. When his guards refuse, Doeg the Edomite does it','The leader so paranoid they destroy innocent bystanders to punish one person','scholarship'],
  ['david','1SA',22,1,23,'protagonist','guilty-grief','gather his family and outcasts at Adullam cave','building a base while carrying the guilt of Nob','David says I am responsible for the death of your father\'s whole family when Abiathar escapes to him. He owns the consequence of his lie','The person who realizes their survival came at a cost someone else paid','scholarship'],

  // 1SA 23 — David rescues Keilah, flees to wilderness (narrative)
  ['david','1SA',23,1,29,'protagonist','faith-under-pressure','rescue Keilah from the Philistines then flee when the city would betray him','survival while still doing the right thing','David saves a city that would hand him to Saul the next day. Doing good does not guarantee loyalty','Helping a client who you know will leave you the moment a better offer comes along','scholarship'],
  ['saul','1SA',23,1,29,'antagonist','obsessive-pursuit','hunt David through the wilderness of Ziph','capturing and killing David','Saul tracks David like prey through the desert, diverted only by a Philistine invasion at the last moment','The competitor so focused on destroying you they almost miss an existential threat to their own business','scholarship'],

  // 1SA 26 — David spares Saul again in the wilderness of Ziph (narrative)
  ['david','1SA',26,1,25,'protagonist','restrained-conviction','spare Saul\'s life a second time by taking his spear and water jug','proving to Saul and to himself that he will not seize the throne by violence','David sneaks into Saul\'s camp at night, takes the spear from beside his head, and shouts from the hilltop. Mercy repeated is a pattern, not an accident','Showing restraint toward someone who keeps coming after you, not because they deserve it but because of who you want to be','scholarship'],
  ['saul','1SA',26,1,25,'deuteragonist','ashamed-again','acknowledge David\'s righteousness yet again','a moment of clarity in an otherwise paranoid spiral','Saul says I have sinned, return my son David, but the audience knows this repentance will not last','The person who apologizes sincerely in the moment but never actually changes','scholarship'],

  // 1SA 27 — David among the Philistines (narrative)
  ['david','1SA',27,1,12,'protagonist','calculated-deception','live among the Philistines to escape Saul permanently','long-term survival through a morally gray alliance','David tells Achish he raids Judah when he actually raids other peoples, playing both sides to stay alive','Going to work for the competitor and secretly maintaining loyalty to your original mission','scholarship'],

  // 1SA 29 — Philistine lords reject David before the battle (narrative)
  ['david','1SA',29,1,11,'protagonist','ambiguous-relief','accept dismissal from the Philistine army before fighting Israel','avoiding the impossible choice of fighting his own people','The Philistine lords send David away because they do not trust him, and David protests but is probably relieved','Being uninvited from the meeting where you would have been forced to choose between two loyalties','scholarship'],

  // 1SA 30 — David rescues families from Amalekite raid on Ziklag (narrative)
  ['david','1SA',30,1,31,'protagonist','devastated-then-strengthened','rescue his family and his men\'s families from the Amalekites','everything, his men are talking about stoning him','David wept until he had no strength left, then strengthened himself in the LORD his God. Rock bottom becomes the pivot','The moment when everything is lost and you have to decide whether to collapse or dig deep','scholarship'],
  ['god','1SA',30,1,31,'deuteragonist','guiding','answer David\'s inquiry and direct the pursuit','restoring what was stolen','God tells David to pursue and he will recover everything. Every person and possession is brought back','The prayer answered at the darkest hour with total restoration','scholarship'],

  // ===================== 2 SAMUEL GAPS =====================

  // 2SA 3 — Abner defects to David, Joab murders Abner (narrative)
  ['abner','2SA',3,1,39,'protagonist','pragmatic-defection','switch allegiance from Ish-bosheth to David after a personal insult','power and survival in a shifting political landscape','Abner is accused of sleeping with Saul\'s concubine and storms off to David. A bedroom rumor triggers a regime change','The executive who defects to the rival company after a public humiliation from their own CEO','scholarship'],
  ['joab','2SA',3,1,39,'antagonist','vengeful','murder Abner to avenge his brother Asahel','personal blood revenge disguised as loyalty','Joab lures Abner to the gate of Hebron and stabs him in the stomach. David curses Joab but cannot punish him','The loyal lieutenant who commits a crime the boss cannot forgive but also cannot afford to prosecute','scholarship'],
  ['david','2SA',3,1,39,'deuteragonist','grief-and-political-damage-control','publicly mourn Abner to prove he did not order the hit','maintaining legitimacy during the transition','David fasts, weeps, and composes a lament for Abner. All Israel knows the king had no part in it','The CEO who has to publicly distance themselves from a rogue employee\'s actions','scholarship'],

  // 2SA 4 — murder of Ish-bosheth (narrative)
  ['ish-bosheth','2SA',4,1,12,'protagonist','helpless','he is murdered in his bed by his own captains','the end of Saul\'s dynasty','Ish-bosheth is napping when Rechab and Baanah stab him, cut off his head, and bring it to David expecting a reward','The figurehead whose only remaining supporters turn on him once the real power shifts','scholarship'],
  ['david','2SA',4,1,12,'deuteragonist','righteous-fury','execute the murderers who killed Ish-bosheth','proving he does not profit from assassinations','David has the killers executed and their hands and feet hung in Hebron. He refuses to build his kingdom on murder','The leader who punishes people who try to help through dirty means, setting the standard publicly','scholarship'],

  // 2SA 8 — David's military victories (summary/list chapter)
  ['david','2SA',8,1,18,'protagonist','administrative','defeat Philistia, Moab, Zobah, Aram, and Edom','establishing the empire','David defeats every surrounding nation and dedicates the plunder to the LORD, a rapid-fire summary of total military dominance','The quarterly report that shows expansion in every market simultaneously','scholarship'],

  // 2SA 10 — war with Ammon and Aram (narrative)
  ['david','2SA',10,1,19,'protagonist','insulted-then-decisive','respond to the humiliation of his ambassadors by Ammon','national honor and diplomatic standing','David sends condolences and Hanun shaves the ambassadors\' beards and cuts their robes. David sends Joab to settle it','Sending a goodwill delegation that gets publicly humiliated, forcing a military response','scholarship'],
  ['joab','2SA',10,1,19,'deuteragonist','tactical-brilliance','defeat the combined Ammonite-Aramean force','military survival against a two-front attack','Joab splits his forces and tells Abishai if one side is losing the other comes to help, mutual support under pressure','The field commander who designs a flexible battle plan that covers both flanks','scholarship'],

  // 2SA 15 — Absalom's conspiracy and David's flight (narrative)
  ['absalom','2SA',15,1,37,'protagonist','calculated-charm','steal the hearts of Israel through political seduction','the throne','Absalom spends four years at the gate telling everyone the king does not care about justice but I would, patient populism','The politician who builds grassroots support by systematically undermining the incumbent','scholarship'],
  ['david','2SA',15,1,37,'deuteragonist','heartbroken-resignation','flee Jerusalem to save the city from a siege','survival and preserving the capital','David walks up the Mount of Olives barefoot, weeping, head covered, while the whole countryside watches the king become a refugee','The founder forced out of their own company walking past employees who do not know what to say','scholarship'],
  ['hushai','2SA',15,1,37,'witness','loyal-cunning','stay behind as a spy in Absalom\'s court','counter-intelligence for David','David sends Hushai back to Jerusalem to defeat Ahithophel\'s counsel from the inside','The trusted ally who volunteers to stay behind enemy lines and feed information back','scholarship'],

  // 2SA 16 — Shimei curses David, Ziba deceives David (narrative)
  ['shimei','2SA',16,1,23,'antagonist','vindictive','curse David and throw stones at him during his flight','expressing Benjamite resentment against David','Shimei runs along the hillside screaming murderer and throwing rocks. Abishai wants to cut his head off but David says let him curse','The person who kicks you publicly when you are down and everyone watching waits to see how you respond','scholarship'],
  ['david','2SA',16,1,23,'protagonist','humiliated-acceptance','endure the cursing without retaliation','trusting God to judge between him and Shimei','David says perhaps the LORD told him to curse me, absorbing humiliation as potential discipline','The leader who takes public abuse without retaliating because they know some of it might be deserved','scholarship'],

  // 2SA 17 — Ahithophel vs Hushai's counsel (narrative)
  ['ahithophel','2SA',17,1,29,'protagonist','brilliant-rejected','advise Absalom to strike David immediately with twelve thousand men','his reputation as the wisest counselor','Ahithophel gives the strategically perfect advice: attack tonight while David is exhausted and disorganized','The consultant who gives the right recommendation that gets overruled by someone more persuasive','scholarship'],
  ['hushai','2SA',17,1,29,'deuteragonist','persuasive-saboteur','convince Absalom to delay the attack, buying David time','saving David by defeating the better plan','Hushai appeals to Absalom\'s vanity: you should lead all Israel personally in a massive attack. The delay saves David','The insider who kills the best proposal by replacing it with a more flattering but worse one','scholarship'],
  ['ahithophel','2SA',17,1,29,'antagonist','suicidal-despair','kill himself after his counsel is rejected','he sees the inevitable outcome clearly','Ahithophel goes home, sets his affairs in order, and hangs himself. He knows Absalom will lose without his plan','The strategist who sees the ending before anyone else and cannot bear to watch it play out','scholarship'],

  // 2SA 19 — David returns to Jerusalem after Absalom's death (narrative)
  ['david','2SA',19,1,43,'protagonist','grief-to-governance','stop mourning Absalom and resume leadership','reuniting the fractured kingdom','Joab confronts David and he gets up, sits at the gate, and begins the painful work of reconciliation with former enemies','The leader who has to put personal grief aside and start managing the aftermath of a civil war','scholarship'],
  ['shimei','2SA',19,1,43,'deuteragonist','groveling-repentance','beg David for forgiveness after cursing him during the flight','saving his own life now that David has won','Shimei rushes to meet David with a thousand Benjamites, falling on his face. David spares him','The person who publicly trashed you scrambling to make amends once you are back in power','scholarship'],
  ['mephibosheth','2SA',19,1,43,'witness','wronged-loyalty','explain that Ziba lied and he remained loyal to David','his land and his honor','Mephibosheth says Ziba deceived me, I have not washed or trimmed my beard since you left. David splits the estate','The employee who was slandered during the leadership crisis and finally gets to tell their side','scholarship'],

  // 2SA 20 — Sheba's rebellion (narrative)
  ['joab','2SA',20,1,26,'protagonist','ruthless-efficiency','crush Sheba\'s rebellion and reassert military control','his position as commander','Joab murders Amasa with a concealed dagger, pursues Sheba to Abel Beth-maakah, and a wise woman throws Sheba\'s head over the wall','The operator who removes every obstacle, human or otherwise, to restore order','scholarship'],
  ['david','2SA',20,1,26,'deuteragonist','weary-authority','send forces to stop Sheba before the rebellion spreads','preventing another civil war immediately after the last one','David replaces Joab with Amasa but Joab kills Amasa and takes command anyway. David cannot control his own general','The CEO who tries to promote someone over the COO and the COO simply refuses to be replaced','scholarship'],

  // 2SA 22 — David's psalm of deliverance (poetry chapter)
  ['david','2SA',22,1,51,'protagonist','reflective-worship','sing a psalm reviewing God\'s deliverance throughout his life','theological gratitude and testimony','David sings of God as rock, fortress, deliverer, nearly identical to Psalm 18. A warrior-poet reviewing the whole journey','Writing your memoir at the end of a career and realizing every crisis had a purpose','scholarship'],
  ['god','2SA',22,1,51,'deuteragonist','mighty-deliverer','rescue David from all his enemies including Saul','covenant faithfulness across decades','The earth shook, smoke rose from His nostrils, He reached down from on high and drew me out of deep waters','The recurring pattern of rescue that only becomes visible when you look back at the full timeline','scholarship'],

  // 2SA 23 — David's last words and mighty men (narrative/list)
  ['david','2SA',23,1,39,'protagonist','reflective-legacy','record his last words and honor his mighty warriors','legacy and recognition of those who served','David names thirty-seven mighty men who fought with him from the beginning, each with their defining moment','The retiring leader who spends their last address naming the people who made everything possible','scholarship'],
  ['joab','2SA',23,1,39,'deuteragonist','listed-among-warriors','recognized as one of David\'s key commanders','military legacy','Joab\'s brother Asahel and his armor-bearer are listed among the thirty, the family that bled for David\'s throne','The inner circle whose sacrifices built the organization from the ground up','scholarship'],
]);

console.log('Done historical-1 gaps — JOS/JDG/1SA/2SA —', 86, 'rows');
db.close();
