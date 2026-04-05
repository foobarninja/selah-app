/**
 * Insert passage_themes for 148 missing Historical book chapters.
 *
 * Books: JOS, JDG, 1SA, 2SA, 1KI, 2KI, 1CH, 2CH, EZR, NEH, EST
 *
 * 2-3 themes per chapter (1-2 for genealogy/list chapters).
 * source_tier: 'ai_assisted'
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Each entry: [book_id, chapter, verse_start, verse_end, theme_id, relevance, context_note]
const rows = [

  // ==================== JOSHUA (12 chapters) ====================

  // JOS 4 — Memorial stones after crossing the Jordan
  ['JOS', 4, 1, 25, 'faithfulness', 'primary', "Twelve memorial stones mark Israel's miraculous Jordan crossing, a tangible reminder that God's faithfulness bridges the impossible."],
  ['JOS', 4, 1, 25, 'covenant', 'primary', "The stone memorial echoes covenant-renewal language, binding the next generation to the memory of God's mighty acts."],
  ['JOS', 4, 1, 25, 'community', 'secondary', "Twelve stones for twelve tribes — the monument insists that the crossing was a corporate event, not a private miracle."],

  // JOS 6 — Fall of Jericho
  ['JOS', 6, 1, 27, 'obedience', 'primary', "Israel marches silently for six days as commanded — Jericho falls not by siege engines but by radical obedience to an absurd military plan."],
  ['JOS', 6, 1, 27, 'divine-intervention', 'primary', "Walls collapse at the sound of trumpets and a shout, making clear that the victory belongs entirely to God."],
  ['JOS', 6, 1, 27, 'warfare', 'secondary', "The first Canaanite city falls through liturgical procession rather than conventional assault, redefining holy war."],

  // JOS 8 — Conquest of Ai and covenant renewal at Ebal
  ['JOS', 8, 1, 35, 'sovereignty', 'primary', "After Achan's sin is purged, God gives Ai into Israel's hands — sovereignty that withholds and then restores victory."],
  ['JOS', 8, 1, 35, 'obedience', 'primary', "Joshua reads the entire law at Mount Ebal — military conquest pauses for covenant renewal because obedience matters more than momentum."],
  ['JOS', 8, 1, 35, 'divine-judgment', 'secondary', "Ai's destruction fulfills the herem command, illustrating the seriousness of God's judgment on Canaanite wickedness."],

  // JOS 11 — Northern campaign
  ['JOS', 11, 1, 23, 'sovereignty', 'primary', "A massive coalition of northern kings gathers against Israel, yet God delivers them all — no alliance can resist divine sovereignty."],
  ['JOS', 11, 1, 23, 'warfare', 'primary', "Joshua hamstrings horses and burns chariots as commanded, refusing to stockpile military technology and trusting God alone for future battles."],
  ['JOS', 11, 1, 23, 'faithfulness', 'secondary', "The chapter summary — 'Joshua took the whole land, just as the LORD had directed Moses' — confirms God kept every territorial promise."],

  // JOS 12 — List of defeated kings
  ['JOS', 12, 1, 24, 'sovereignty', 'primary', "Thirty-one defeated kings catalogued in a single list — a royal body count that demonstrates God's comprehensive sovereignty over Canaan."],
  ['JOS', 12, 1, 24, 'divine-plan', 'secondary', "The inventory of conquered territories maps onto the land promises made to Abraham, showing the divine plan unfolding city by city."],

  // JOS 14 — Caleb claims Hebron
  ['JOS', 14, 1, 15, 'faithfulness', 'primary', "Forty-five years after spying Canaan, eighty-five-year-old Caleb claims the mountain God promised — faithfulness that outlasts a generation of delay."],
  ['JOS', 14, 1, 15, 'courage', 'primary', "Caleb requests the hardest territory — where the Anakim giants live — because courage trusts God's promise more than human odds."],
  ['JOS', 14, 1, 15, 'inheritance', 'secondary', "Caleb's allotment is grounded in God's oath through Moses, making inheritance a matter of divine promise, not tribal lottery."],

  // JOS 15 — Judah's territory
  ['JOS', 15, 1, 63, 'inheritance', 'primary', "Judah receives the largest allotment, detailed boundary by boundary — inheritance as God's concrete, mappable provision for his people."],
  ['JOS', 15, 1, 63, 'chosen-people', 'secondary', "Judah's prominence in the land distribution foreshadows the tribe's royal destiny — from this territory will come David and the Messiah."],

  // JOS 16 — Ephraim's territory
  ['JOS', 16, 1, 10, 'inheritance', 'primary', "Ephraim's allotment in the central hill country fulfills Jacob's blessing on Joseph's younger son — inheritance shaped by prophetic word."],
  ['JOS', 16, 1, 10, 'chosen-people', 'secondary', "Despite being the younger brother, Ephraim receives the superior portion, echoing the biblical pattern of God elevating the unexpected."],

  // JOS 17 — Manasseh's territory
  ['JOS', 17, 1, 18, 'inheritance', 'primary', "Manasseh's daughters claim their father's share as Moses commanded — inheritance rights extended beyond gender norms by divine decree."],
  ['JOS', 17, 1, 18, 'courage', 'secondary', "Zelophehad's daughters boldly approach Joshua to claim their land, and the tribe is told to clear forested hill country rather than complain about insufficient territory."],

  // JOS 18 — Remaining tribal allotments
  ['JOS', 18, 1, 28, 'inheritance', 'primary', "Seven tribes still lack their allotment, and Joshua rebukes their hesitation — inheritance requires active faith to possess what God has given."],
  ['JOS', 18, 1, 28, 'community', 'secondary', "The allotment takes place at Shiloh before the whole assembly, ensuring land distribution is a communal act under God's oversight."],

  // JOS 19 — Remaining tribal territories
  ['JOS', 19, 1, 51, 'inheritance', 'primary', "Six tribes receive their territories by sacred lot at Shiloh — every boundary line drawn by divine allocation, not human preference."],
  ['JOS', 19, 1, 51, 'divine-plan', 'secondary', "Joshua himself receives a personal inheritance last, modeling servant-leadership that distributes to others before claiming his own portion."],

  // JOS 21 — Levitical cities
  ['JOS', 21, 1, 45, 'worship', 'primary', "Forty-eight Levitical cities scattered across all tribal territories ensure that worship leadership and Torah instruction reach every corner of the land."],
  ['JOS', 21, 1, 45, 'faithfulness', 'primary', "The chapter's climactic summary — 'Not one of all the LORD's good promises failed; every one was fulfilled' — seals the conquest narrative with covenant certainty."],
  ['JOS', 21, 1, 45, 'community', 'secondary', "Levites receive cities within every tribe's territory, weaving priestly presence into the fabric of Israelite communal life."],

  // ==================== JUDGES (9 chapters) ====================

  // JDG 5 — Song of Deborah
  ['JDG', 5, 1, 32, 'worship', 'primary', "Deborah and Barak sing a victory hymn that credits God alone for the defeat of Sisera — worship as the proper response to deliverance."],
  ['JDG', 5, 1, 32, 'courage', 'primary', "The song praises tribes who risked their lives and shames those who stayed home — courage measured by willingness to answer God's call."],
  ['JDG', 5, 1, 32, 'sovereignty', 'secondary', "Even the stars fight from heaven against Sisera — cosmic sovereignty deployed on behalf of a small, outnumbered people."],

  // JDG 8 — Gideon's pursuit and ephod
  ['JDG', 8, 1, 35, 'leadership', 'primary', "Gideon refuses the crown — 'the LORD will rule over you' — yet acts like a king, collecting gold and taking many wives, exposing leadership's subtle corruptions."],
  ['JDG', 8, 1, 35, 'idolatry', 'primary', "Gideon fashions a golden ephod that becomes a snare to all Israel — the liberator unwittingly creates the next generation's idol."],
  ['JDG', 8, 1, 35, 'divine-judgment', 'secondary', "Gideon executes the Midianite kings who killed his brothers, blending personal vengeance with the completion of divine judgment."],

  // JDG 11 — Jephthah's vow
  ['JDG', 11, 1, 40, 'calling', 'primary', "Jephthah, an outcast son of a prostitute, is called back by the elders who rejected him — God uses the marginalized to deliver his people."],
  ['JDG', 11, 1, 40, 'faithfulness', 'primary', "Jephthah's rash vow and its devastating fulfillment show the cost of promises made without wisdom — faithfulness twisted into tragedy."],
  ['JDG', 11, 1, 40, 'sovereignty', 'secondary', "Jephthah's theological argument to the Ammonite king — each nation possesses what its god gives — is an appeal to God's sovereign land grant."],

  // JDG 12 — Ephraim's civil conflict and minor judges
  ['JDG', 12, 1, 15, 'community', 'primary', "Inter-tribal warfare erupts over Ephraim's wounded pride, and 42,000 Israelites die at the Jordan fords — community fractured by jealousy."],
  ['JDG', 12, 1, 15, 'divine-judgment', 'secondary', "The Shibboleth test turns dialect differences into death sentences — judgment administered through tribal division rather than divine command."],

  // JDG 15 — Samson's foxes and jawbone victory
  ['JDG', 15, 1, 20, 'divine-intervention', 'primary', "Samson kills a thousand Philistines with a donkey's jawbone, then God splits a rock to provide water — power and provision from unlikely sources."],
  ['JDG', 15, 1, 20, 'warfare', 'primary', "Samson wages a one-man guerrilla campaign — burning fields with foxes, striking with a jawbone — unconventional warfare powered by the Spirit."],
  ['JDG', 15, 1, 20, 'prayer', 'secondary', "After his great victory, Samson prays desperately for water — even the strongest warrior depends on God for the next breath."],

  // JDG 16 — Samson and Delilah, death at the temple
  ['JDG', 16, 1, 31, 'betrayal', 'primary', "Delilah sells Samson's secret for silver, and he tells her despite knowing the danger — betrayal enabled by misplaced intimacy."],
  ['JDG', 16, 1, 31, 'sovereignty', 'primary', "Blinded and enslaved, Samson kills more Philistines in death than in life — God's sovereign purpose fulfilled even through a broken judge."],
  ['JDG', 16, 1, 31, 'prayer', 'secondary', "Samson's final prayer — 'Remember me, O God, strengthen me just once more' — is a desperate, authentic cry that God answers."],

  // JDG 18 — Dan's migration and idolatry
  ['JDG', 18, 1, 31, 'idolatry', 'primary', "The Danites steal Micah's carved image and his Levite priest, establishing an idolatrous shrine — institutional idolatry born from tribal restlessness."],
  ['JDG', 18, 1, 31, 'inheritance', 'secondary', "Dan cannot hold its allotted territory and migrates north, seizing Laish — a tribe that trades its God-given inheritance for an easier conquest."],

  // JDG 20 — Civil war against Benjamin
  ['JDG', 20, 1, 48, 'divine-judgment', 'primary', "All Israel unites to punish Benjamin for the atrocity at Gibeah — divine judgment executed through corporate military action after repeated inquiry of God."],
  ['JDG', 20, 1, 48, 'justice', 'primary', "The horrific crime against the Levite's concubine demands justice, and the tribes' response shows that some evil cannot be tolerated within the covenant community."],
  ['JDG', 20, 1, 48, 'community', 'secondary', "Israel assembles 'as one man' to address Benjamin's sin — community responsibility for internal wickedness taken with devastating seriousness."],

  // JDG 21 — Wives for Benjamin
  ['JDG', 21, 1, 25, 'mercy', 'primary', "After nearly annihilating Benjamin, the tribes grieve and seek creative solutions to preserve the twelfth tribe — mercy that tries to undo the excess of judgment."],
  ['JDG', 21, 1, 25, 'community', 'primary', "The desperate schemes to provide wives for Benjamin reveal a community struggling to hold itself together after self-inflicted trauma."],
  ['JDG', 21, 1, 25, 'leadership', 'secondary', "The refrain 'everyone did what was right in his own eyes' closes the book, diagnosing Israel's chaos as a leadership vacuum."],

  // ==================== 1 SAMUEL (18 chapters) ====================

  // 1SA 2 — Hannah's prayer and Eli's corrupt sons
  ['1SA', 2, 1, 36, 'worship', 'primary', "Hannah's prayer-song magnifies God as the one who reverses fortunes — the barren woman sings while the well-fed stumble, making worship a revolutionary act."],
  ['1SA', 2, 1, 36, 'divine-judgment', 'primary', "Eli's sons treat sacrificial offerings with contempt and abuse women at the tabernacle — judgment is pronounced through an unnamed prophet because leadership corruption demands divine response."],
  ['1SA', 2, 1, 36, 'sovereignty', 'secondary', "Hannah's song declares God kills and brings to life, makes poor and makes rich — sovereignty over every reversal in human experience."],

  // 1SA 5 — The ark among the Philistines
  ['1SA', 5, 1, 12, 'sovereignty', 'primary', "Dagon falls face-down before the ark twice — the Philistine god prostrates before Israel's God, demonstrating sovereignty that mocks rival deities in their own temple."],
  ['1SA', 5, 1, 12, 'divine-judgment', 'primary', "Tumors and plague strike every city that hosts the ark — judgment follows the ark from Ashdod to Gath to Ekron, proving God needs no army to defeat his enemies."],

  // 1SA 6 — The ark returned
  ['1SA', 6, 1, 21, 'mercy', 'primary', "The Philistines return the ark with guilt offerings of gold, acknowledging the God of Israel — even pagans recognize when divine mercy is their only escape."],
  ['1SA', 6, 1, 21, 'worship', 'secondary', "Beth-shemesh celebrates the ark's return with burnt offerings, but men who look inside the ark die — worship requires reverence, not curiosity."],

  // 1SA 7 — Samuel judges Israel at Mizpah
  ['1SA', 7, 1, 17, 'repentance', 'primary', "Samuel calls all Israel to put away foreign gods and return to the LORD with all their hearts — national repentance as the prerequisite for national deliverance."],
  ['1SA', 7, 1, 17, 'prayer', 'primary', "Samuel cries out to the LORD on Israel's behalf, and God answers with thunder that routs the Philistines — intercessory prayer as Israel's most effective weapon."],
  ['1SA', 7, 1, 17, 'leadership', 'secondary', "Samuel sets up the Ebenezer stone — 'Thus far the LORD has helped us' — modeling leadership that credits God rather than claiming personal glory."],

  // 1SA 10 — Saul anointed and chosen by lot
  ['1SA', 10, 1, 27, 'calling', 'primary', "Samuel privately anoints Saul, and the Spirit rushes upon him — calling confirmed by prophetic ecstasy and three successive signs fulfilled the same day."],
  ['1SA', 10, 1, 27, 'sovereignty', 'primary', "The public lot falls on Saul, who hides among the baggage — divine sovereignty chooses a reluctant king whose humility will not last."],
  ['1SA', 10, 1, 27, 'prophecy', 'secondary', "Each sign Samuel predicts comes true in sequence — prophetic authority validated by immediate, verifiable fulfillment."],

  // 1SA 11 — Saul defeats the Ammonites at Jabesh-gilead
  ['1SA', 11, 1, 15, 'courage', 'primary', "Saul rallies all Israel by cutting oxen and sending pieces throughout the land — courage expressed through decisive action when Jabesh-gilead faces mutilation."],
  ['1SA', 11, 1, 15, 'mercy', 'secondary', "After the victory, Saul refuses to execute those who questioned his kingship — mercy shown at the peak of popular support."],
  ['1SA', 11, 1, 15, 'leadership', 'secondary', "The Spirit of God rushes upon Saul and his anger is kindled — Spirit-empowered leadership that channels righteous anger into military deliverance."],

  // 1SA 12 — Samuel's farewell address
  ['1SA', 12, 1, 25, 'faithfulness', 'primary', "Samuel recounts God's faithful acts from Egypt to the present, proving that every cry for help was answered — a farewell built on God's track record."],
  ['1SA', 12, 1, 25, 'obedience', 'primary', "Samuel warns that both king and people must obey God's voice or face judgment — obedience remains the condition of blessing even under monarchy."],
  ['1SA', 12, 1, 25, 'prayer', 'secondary', "Samuel promises never to stop praying for Israel — intercessory prayer as the prophet's ongoing gift even after surrendering political authority."],

  // 1SA 14 — Jonathan's bold attack
  ['1SA', 14, 1, 52, 'courage', 'primary', "Jonathan climbs a cliff with only his armor-bearer, declaring 'Nothing can hinder the LORD from saving by many or by few' — courage grounded in theology, not odds."],
  ['1SA', 14, 1, 52, 'faithfulness', 'secondary', "God sends earthquake-panic through the Philistine camp to confirm Jonathan's faith — divine faithfulness that rewards bold trust with supernatural confirmation."],
  ['1SA', 14, 1, 52, 'leadership', 'secondary', "Saul's rash oath nearly kills his own son and weakens the army — foolish leadership that endangers the people it should protect."],

  // 1SA 15 — Saul's disobedience and rejection
  ['1SA', 15, 1, 35, 'obedience', 'primary', "Saul spares King Agag and the best livestock despite God's command to destroy everything — partial obedience exposed as full disobedience."],
  ['1SA', 15, 1, 35, 'divine-judgment', 'primary', "Samuel declares 'to obey is better than sacrifice' and announces God has torn the kingdom from Saul — judgment on a king who redefined God's commands to suit himself."],
  ['1SA', 15, 1, 35, 'sovereignty', 'secondary', "God regrets making Saul king, and Samuel grieves all night — sovereignty that removes what it once bestowed, without apology."],

  // 1SA 19 — Saul tries to kill David; Michal's rescue
  ['1SA', 19, 1, 24, 'betrayal', 'primary', "Saul hurls a spear at David during worship and sends assassins to his house — the king's jealousy turns covenant loyalty into murderous betrayal."],
  ['1SA', 19, 1, 24, 'courage', 'secondary', "Michal deceives her father to save David's life, and Jonathan advocates for David at personal risk — courage costs both of Saul's children their father's favor."],
  ['1SA', 19, 1, 24, 'prophecy', 'secondary', "The Spirit seizes Saul among the prophets at Ramah, stripping him naked — prophecy as divine restraint that humiliates the persecutor."],

  // 1SA 20 — David and Jonathan's covenant
  ['1SA', 20, 1, 43, 'faithfulness', 'primary', "Jonathan and David renew their covenant with tears, swearing loyalty across generations — faithfulness that transcends political loyalty to a deranged king."],
  ['1SA', 20, 1, 43, 'betrayal', 'secondary', "Saul hurls a spear at his own son Jonathan for defending David — paternal betrayal driven by jealousy and paranoia."],
  ['1SA', 20, 1, 43, 'courage', 'secondary', "Jonathan risks his life to warn David, choosing covenant faithfulness over dynastic advantage — courage that sacrifices a throne for a friendship."],

  // 1SA 21 — David at Nob and among the Philistines
  ['1SA', 21, 1, 16, 'provision-in-wilderness', 'primary', "David eats the holy bread at Nob — provision that bends sacred regulation when God's anointed is desperate and hunted."],
  ['1SA', 21, 1, 16, 'exile', 'secondary', "David flees to Gath and feigns madness before Achish — the future king reduced to a fugitive performing insanity to survive among enemies."],

  // 1SA 22 — Saul massacres the priests of Nob
  ['1SA', 22, 1, 23, 'divine-judgment', 'primary', "Saul orders the slaughter of eighty-five priests because Ahimelech helped David — a massacre that fulfills the earlier prophecy against Eli's house through Saul's madness."],
  ['1SA', 22, 1, 23, 'leadership', 'primary', "David gathers outcasts, debtors, and the discontented at Adullam — the rejected anointed one builds a community from society's rejects."],
  ['1SA', 22, 1, 23, 'betrayal', 'secondary', "Doeg the Edomite reports David's visit to Nob and personally executes the priests — betrayal by an opportunist who serves power, not truth."],

  // 1SA 23 — David rescues Keilah and flees Saul
  ['1SA', 23, 1, 29, 'prayer', 'primary', "David inquires of the LORD twice before acting — at Keilah and in the wilderness — modeling leadership that consults God before every major decision."],
  ['1SA', 23, 1, 29, 'sovereignty', 'primary', "God reveals that Keilah's citizens will betray David despite his rescue — divine sovereignty that redirects the fugitive king through uncomfortable truth."],
  ['1SA', 23, 1, 29, 'faithfulness', 'secondary', "Jonathan finds David in the wilderness and strengthens his hand in God — covenant faithfulness that risks everything to encourage the hunted."],

  // 1SA 26 — David spares Saul a second time
  ['1SA', 26, 1, 25, 'mercy', 'primary', "David refuses to kill sleeping Saul, taking only his spear and water jug — mercy that honors God's anointed even when self-defense would be justified."],
  ['1SA', 26, 1, 25, 'faithfulness', 'secondary', "David declares he will not stretch out his hand against the LORD's anointed — faithfulness to God's sovereign choice overrides personal survival instinct."],
  ['1SA', 26, 1, 25, 'humility', 'secondary', "Saul confesses 'I have sinned... I have acted like a fool' — a fleeting moment of humility that will not produce lasting change."],

  // 1SA 27 — David among the Philistines
  ['1SA', 27, 1, 12, 'exile', 'primary', "David settles in Philistine territory for sixteen months, raiding Israel's enemies while deceiving Achish — exile that forces moral compromise on the future king."],
  ['1SA', 27, 1, 12, 'sovereignty', 'secondary', "Even David's deception serves God's larger purpose — the raids destroy Canaanite remnants while Achish believes David burns bridges with Israel."],

  // 1SA 29 — Philistines reject David before the battle
  ['1SA', 29, 1, 11, 'sovereignty', 'primary', "Philistine commanders refuse to let David fight against Israel — divine sovereignty uses pagan suspicion to extract David from an impossible loyalty conflict."],
  ['1SA', 29, 1, 11, 'divine-plan', 'secondary', "Achish dismisses David reluctantly, calling him blameless — God orchestrates David's removal from the battle that will kill Saul without David's hand being involved."],

  // 1SA 30 — David recovers everything from the Amalekites
  ['1SA', 30, 1, 31, 'prayer', 'primary', "David 'strengthened himself in the LORD his God' when his own men speak of stoning him — prayer as the lifeline when even allies turn hostile."],
  ['1SA', 30, 1, 31, 'justice', 'primary', "David establishes the rule that those who guard the baggage share equally with those who fight — justice that redefines contribution beyond combat."],
  ['1SA', 30, 1, 31, 'leadership', 'secondary', "David recovers every person and possession the Amalekites took, then shares spoil with Judean elders — leadership that provides, protects, and distributes generously."],

  // ==================== 2 SAMUEL (11 chapters) ====================

  // 2SA 3 — Abner defects to David and is murdered
  ['2SA', 3, 1, 39, 'sovereignty', 'primary', "Abner shifts allegiance from Ish-bosheth to David, beginning the unification of all Israel under God's chosen king — sovereignty working through political realignment."],
  ['2SA', 3, 1, 39, 'betrayal', 'primary', "Joab murders Abner at the gate of Hebron under pretense of peace, avenging his brother Asahel — betrayal that stains David's reign before it fully begins."],
  ['2SA', 3, 1, 39, 'justice', 'secondary', "David publicly mourns Abner and curses Joab's house, distancing himself from the murder — justice demanded even when the victim was a former enemy."],

  // 2SA 4 — Murder of Ish-bosheth
  ['2SA', 4, 1, 12, 'justice', 'primary', "David executes Ish-bosheth's assassins who expected reward — justice that refuses to profit from the murder of a rival, even a weak one."],
  ['2SA', 4, 1, 12, 'sovereignty', 'secondary', "Saul's dynasty collapses through internal treachery, clearing the path for David without his complicity — sovereignty that removes obstacles through others' choices."],

  // 2SA 8 — David's military victories
  ['2SA', 8, 1, 18, 'sovereignty', 'primary', "David defeats Philistia, Moab, Zobah, Aram, and Edom in rapid succession — the LORD gives David victory wherever he goes, fulfilling the promise of a great name."],
  ['2SA', 8, 1, 18, 'justice', 'secondary', "David administers justice and equity to all his people — military expansion paired with domestic righteousness marks the kingdom's golden age."],
  ['2SA', 8, 1, 18, 'leadership', 'secondary', "The chapter lists David's chief officials by role — a structured administration that turns a tribal confederation into a functioning state."],

  // 2SA 10 — War with Ammon and Aram
  ['2SA', 10, 1, 19, 'warfare', 'primary', "Hanun humiliates David's ambassadors by shaving their beards and cutting their garments — an insult that triggers a war David tried to avoid through diplomacy."],
  ['2SA', 10, 1, 19, 'courage', 'primary', "Joab faces enemies on two fronts and declares 'Be strong, and let us fight bravely for our people and the cities of our God' — courage framed as theological duty."],
  ['2SA', 10, 1, 19, 'sovereignty', 'secondary', "The Aramean coalition dissolves after defeat, and the vassal states make peace with Israel — sovereignty that dismantles alliances formed against God's people."],

  // 2SA 15 — Absalom's rebellion
  ['2SA', 15, 1, 37, 'betrayal', 'primary', "Absalom steals the hearts of Israel through calculated charm and declares himself king at Hebron — betrayal by a son that weaponizes a father's permissiveness."],
  ['2SA', 15, 1, 37, 'humility', 'primary', "David flees Jerusalem barefoot, weeping, with his head covered, telling Zadok to return the ark — humility that trusts God's verdict over political maneuvering."],
  ['2SA', 15, 1, 37, 'prayer', 'secondary', "David prays that Ahithophel's counsel be turned to foolishness — a single prayer that becomes the hinge on which the rebellion turns."],

  // 2SA 16 — Shimei curses David; Absalom in Jerusalem
  ['2SA', 16, 1, 23, 'humility', 'primary', "Shimei pelts David with stones and curses, yet David forbids retaliation — 'Perhaps the LORD will look on my misery and repay me with good for his cursing today.'"],
  ['2SA', 16, 1, 23, 'betrayal', 'secondary', "Ahithophel advises Absalom to publicly take David's concubines — betrayal designed to make reconciliation impossible."],
  ['2SA', 16, 1, 23, 'sovereignty', 'secondary', "David accepts Shimei's cursing as possibly from the LORD — sovereignty acknowledged even in humiliation by the king who knows God disciplines those he loves."],

  // 2SA 17 — Ahithophel vs. Hushai; Absalom's fatal choice
  ['2SA', 17, 1, 29, 'sovereignty', 'primary', "The LORD ordains that Absalom follow Hushai's bad counsel over Ahithophel's brilliant advice — sovereignty that answers David's prayer by defeating wisdom with folly."],
  ['2SA', 17, 1, 29, 'divine-plan', 'primary', "Ahithophel's suicide after his counsel is rejected shows a man who sees the future clearly — the divine plan overrides the smartest human strategy."],
  ['2SA', 17, 1, 29, 'faithfulness', 'secondary', "Jonathan and Ahimaaz risk their lives to carry intelligence to David, hidden in a well by a loyal woman — faithfulness that operates through covert networks of ordinary courage."],

  // 2SA 19 — David returns to Jerusalem
  ['2SA', 19, 1, 44, 'mercy', 'primary', "David pardons Shimei who cursed him and restores Mephibosheth — mercy extended to enemies and dependents alike on the day of restoration."],
  ['2SA', 19, 1, 44, 'leadership', 'primary', "Joab confronts David's excessive mourning for Absalom — 'You love those who hate you and hate those who love you' — leadership rebuked for misplaced grief."],
  ['2SA', 19, 1, 44, 'community', 'secondary', "Judah and Israel quarrel over who should escort the king home — the rebellion is over but tribal division festers beneath the surface."],

  // 2SA 20 — Sheba's revolt
  ['2SA', 20, 1, 26, 'community', 'primary', "Sheba's cry — 'We have no share in David!' — splits Israel from Judah, exposing the fragile unity that Absalom's rebellion had already cracked."],
  ['2SA', 20, 1, 26, 'leadership', 'secondary', "A wise woman of Abel negotiates Sheba's death to save her city — leadership exercised by an unnamed woman who values community over a rebel's life."],
  ['2SA', 20, 1, 26, 'justice', 'secondary', "Joab murders Amasa, David's newly appointed general, at a public greeting — ruthless pragmatism that perpetuates injustice within David's own command structure."],

  // 2SA 22 — David's song of deliverance
  ['2SA', 22, 1, 51, 'worship', 'primary', "David's psalm rehearses a lifetime of divine rescue — the earth shook, smoke rose from God's nostrils, he rode a cherub — worship that takes deliverance personally."],
  ['2SA', 22, 1, 51, 'faithfulness', 'primary', "David sings 'He is a shield to all who take refuge in him' — faithfulness celebrated not as doctrine but as autobiography."],
  ['2SA', 22, 1, 51, 'sovereignty', 'secondary', "God trains David's hands for war and makes his feet like a deer's — sovereignty expressed through the equipping of a single life for its appointed task."],

  // 2SA 23 — David's last words and mighty men
  ['2SA', 23, 1, 39, 'leadership', 'primary', "David's last words describe the ideal ruler who governs justly in the fear of God — leadership at its twilight defining what it always should have been."],
  ['2SA', 23, 1, 39, 'courage', 'primary', "The Three and the Thirty perform legendary feats — breaking through Philistine lines for water, standing alone in a field — courage memorialized by name."],
  ['2SA', 23, 1, 39, 'community', 'secondary', "The catalogue of mighty men shows that David's kingdom was built by a community of exceptional warriors, not a lone hero."],

  // ==================== 1 KINGS (12 chapters) ====================

  // 1KI 1 — Adonijah's bid and Solomon's coronation
  ['1KI', 1, 1, 53, 'sovereignty', 'primary', "David designates Solomon over the firstborn claimant Adonijah — sovereignty exercised through prophetic promise rather than birth order."],
  ['1KI', 1, 1, 53, 'leadership', 'primary', "Bathsheba and Nathan maneuver an aging David to act, while Adonijah throws a premature coronation feast — leadership succession as a contest between divine promise and human ambition."],
  ['1KI', 1, 1, 53, 'mercy', 'secondary', "Solomon spares Adonijah conditionally — mercy extended to a rival on the condition of loyalty, a reprieve that will prove temporary."],

  // 1KI 2 — David's charge and Solomon secures the throne
  ['1KI', 2, 1, 46, 'obedience', 'primary', "David's deathbed charge to Solomon — 'Walk in God's ways, keep his statutes' — obedience as the foundation stone for the entire Solomonic project."],
  ['1KI', 2, 1, 46, 'justice', 'primary', "Solomon systematically removes Adonijah, Joab, and Shimei — justice that settles David's unfinished accounts with surgical precision."],
  ['1KI', 2, 1, 46, 'sovereignty', 'secondary', "The kingdom is firmly established in Solomon's hand — the narrator attributes the consolidation to divine purpose, not merely political cunning."],

  // 1KI 4 — Solomon's administration and wisdom
  ['1KI', 4, 1, 34, 'leadership', 'primary', "Solomon's twelve district governors supply provisions on a rotating basis — administrative wisdom that feeds a nation through organized delegation."],
  ['1KI', 4, 1, 34, 'sovereignty', 'primary', "Solomon rules from the Euphrates to Egypt, fulfilling the Abrahamic land promise at its maximum extent — sovereignty realized in geopolitical terms."],
  ['1KI', 4, 1, 34, 'prosperity', 'secondary', "Judah and Israel are as numerous as sand by the sea, eating, drinking, and happy — prosperity as the visible fruit of a kingdom governed by divine wisdom."],

  // 1KI 6 — Construction of the temple
  ['1KI', 6, 1, 38, 'worship', 'primary', "Seven years of meticulous construction produce a house overlaid with gold, carved with cherubim and palm trees — worship given its most magnificent earthly dwelling."],
  ['1KI', 6, 1, 38, 'obedience', 'primary', "Mid-construction, God reminds Solomon that the temple's validity depends on obedience — 'If you walk in my statutes, I will dwell among the children of Israel.'"],
  ['1KI', 6, 1, 38, 'covenant', 'secondary', "The temple dimensions echo the tabernacle's proportions, connecting Solomon's stone edifice to Moses' portable tent — covenant continuity in architectural form."],

  // 1KI 7 — Solomon's palace and temple furnishings
  ['1KI', 7, 1, 51, 'worship', 'primary', "Huram crafts the bronze pillars, the molten sea, and ten lavers — furnishings of extraordinary artistry dedicated entirely to facilitating Israel's worship."],
  ['1KI', 7, 1, 51, 'calling', 'secondary', "Huram of Tyre, a craftsman filled with wisdom and skill, is called to sacred work — artistic calling placed in service of divine purpose."],

  // 1KI 8 — Solomon's dedication of the temple
  ['1KI', 8, 1, 66, 'prayer', 'primary', "Solomon's dedication prayer covers seven scenarios of national crisis — famine, plague, war, exile — and in each case directs Israel to pray toward this house."],
  ['1KI', 8, 1, 66, 'worship', 'primary', "The glory cloud fills the temple so that priests cannot stand to minister — worship interrupted by the overwhelming presence of the God being worshipped."],
  ['1KI', 8, 1, 66, 'mercy', 'secondary', "Solomon repeatedly asks God to hear and forgive — the entire prayer assumes Israel will sin and presupposes mercy as God's default response."],

  // 1KI 9 — God's second appearance and Solomon's projects
  ['1KI', 9, 1, 28, 'covenant', 'primary', "God appears a second time with promise and warning — 'If you turn aside, I will cut off Israel from the land' — covenant blessing inseparable from covenant obligation."],
  ['1KI', 9, 1, 28, 'obedience', 'secondary', "The conditional nature of God's promise makes Solomon's future apostasy not merely sinful but covenantally catastrophic."],
  ['1KI', 9, 1, 28, 'sovereignty', 'secondary', "Solomon builds cities, stations a fleet, and receives gold from Ophir — sovereign blessing that looks like wise administration from the outside."],

  // 1KI 13 — The man of God and the old prophet
  ['1KI', 13, 1, 34, 'obedience', 'primary', "A prophet from Judah delivers God's word against Jeroboam's altar but is deceived into disobedience by a lying old prophet — obedience tested by a peer's false authority."],
  ['1KI', 13, 1, 34, 'divine-judgment', 'primary', "A lion kills the disobedient prophet but does not eat the body or maul the donkey — judgment precisely calibrated to prove the death was divine, not random."],
  ['1KI', 13, 1, 34, 'prophecy', 'secondary', "The prophet names Josiah by name three centuries before his birth — prophecy that reaches across generations to demonstrate God's foreknowledge."],

  // 1KI 14 — Jeroboam's son dies; Rehoboam's decline
  ['1KI', 14, 1, 31, 'divine-judgment', 'primary', "Ahijah tells Jeroboam's wife that her son will die the moment she enters the city — judgment on the house of Jeroboam delivered through the sickness of the only good son."],
  ['1KI', 14, 1, 31, 'idolatry', 'primary', "Judah under Rehoboam sets up high places, sacred stones, and Asherah poles — idolatry spreading south proves that the northern kingdom has no monopoly on unfaithfulness."],
  ['1KI', 14, 1, 31, 'sovereignty', 'secondary', "Shishak of Egypt plunders the temple — the gold shields Solomon made are replaced with bronze, a visible downgrade that sovereignty permits as discipline."],

  // 1KI 15 — Abijam and Asa of Judah; Nadab and Baasha of Israel
  ['1KI', 15, 1, 34, 'faithfulness', 'primary', "Asa does right in the LORD's eyes, removing idols and deposing his own grandmother's Asherah pole — faithfulness that costs family loyalty."],
  ['1KI', 15, 1, 34, 'idolatry', 'secondary', "Abijam walks in all the sins of his father — idolatry passed down generationally while God preserves Judah only for David's sake."],
  ['1KI', 15, 1, 34, 'divine-judgment', 'secondary', "Baasha destroys Jeroboam's entire house, fulfilling Ahijah's prophecy — judgment executed through a usurper who becomes the instrument of divine verdict."],

  // 1KI 16 — Northern dynasty collapse
  ['1KI', 16, 1, 34, 'divine-judgment', 'primary', "Four kings in rapid succession — Baasha, Elah, Zimri, Omri — each worse than the last, as divine judgment cycles through dynasties that refuse to learn."],
  ['1KI', 16, 1, 34, 'idolatry', 'primary', "Ahab marries Jezebel and builds a Baal temple in Samaria — idolatry formalized into state religion, surpassing all previous kings in provocation."],
  ['1KI', 16, 1, 34, 'sovereignty', 'secondary', "Despite the parade of wicked kings, God continues to speak through prophets and execute judgment — sovereignty that refuses to abandon even a corrupt nation."],

  // 1KI 20 — Ahab's wars with Ben-hadad
  ['1KI', 20, 1, 43, 'sovereignty', 'primary', "A nameless prophet tells Ahab that God will deliver Ben-hadad's vast army 'so you will know that I am the LORD' — victory given to reveal sovereignty, not reward virtue."],
  ['1KI', 20, 1, 43, 'obedience', 'primary', "Ahab releases Ben-hadad in a treaty instead of executing the ban — disobedience dressed as diplomacy, costing Ahab his life in prophetic verdict."],
  ['1KI', 20, 1, 43, 'divine-judgment', 'secondary', "A prophet wounded by a colleague stages a parable-trap for Ahab — 'Your life for his life' — judgment delivered through street theater."],

  // ==================== 2 KINGS (15 chapters) ====================

  // 2KI 1 — Ahaziah and Elijah's fire
  ['2KI', 1, 1, 18, 'sovereignty', 'primary', "Ahaziah sends messengers to inquire of Baal-zebub, and Elijah intercepts them — sovereignty that refuses to let Israel's king bypass the God of Israel."],
  ['2KI', 1, 1, 18, 'divine-judgment', 'primary', "Fire from heaven consumes two companies of fifty soldiers sent to arrest Elijah — judgment proportional to the arrogance of those who treat prophets as fugitives."],
  ['2KI', 1, 1, 18, 'prayer', 'secondary', "The third captain begs for his life, and Elijah consults God before going — prayer as the mechanism that shifts from judgment to mercy."],

  // 2KI 3 — Moab campaign with Elisha
  ['2KI', 3, 1, 27, 'prophecy', 'primary', "Elisha provides water and a military victory through a prophetic word to the combined armies of Israel, Judah, and Edom — prophecy as tactical intelligence from God."],
  ['2KI', 3, 1, 27, 'divine-intervention', 'primary', "Ditches fill with water without rain, and the Moabites mistake the red reflection for blood — divine intervention that turns geography into deception."],
  ['2KI', 3, 1, 27, 'worship', 'secondary', "Elisha calls for a harpist before prophesying, and the Spirit comes upon him — worship as the gateway through which prophetic revelation flows."],

  // 2KI 4 — Elisha's miracles: oil, Shunammite's son, stew, bread
  ['2KI', 4, 1, 44, 'provision-in-wilderness', 'primary', "Elisha multiplies oil for a widow in debt, purifies poisoned stew, and feeds a hundred with twenty loaves — provision that meets desperate need through miraculous abundance."],
  ['2KI', 4, 1, 44, 'faithfulness', 'primary', "The Shunammite woman's dead son is raised by Elisha — God's faithfulness to the woman who housed his prophet, rewarding hospitality with resurrection."],
  ['2KI', 4, 1, 44, 'prayer', 'secondary', "Elisha prays stretched out over the dead child until warmth returns — intercessory prayer that is bodily, persistent, and personally costly."],

  // 2KI 7 — Lepers discover the abandoned Aramean camp
  ['2KI', 7, 1, 20, 'sovereignty', 'primary', "God causes the Aramean army to hear phantom chariots and flee in panic, abandoning food, silver, and gold — sovereignty that ends a siege without a single Israelite sword drawn."],
  ['2KI', 7, 1, 20, 'provision-in-wilderness', 'primary', "Four lepers discover the abandoned camp and announce abundance to a starving city — provision delivered through the most marginalized members of society."],
  ['2KI', 7, 1, 20, 'divine-judgment', 'secondary', "The skeptical officer who doubted Elisha's prophecy is trampled at the gate — he sees the abundance but never tastes it, judgment on unbelief."],

  // 2KI 8 — Shunammite's land restored; Hazael and Joram
  ['2KI', 8, 1, 29, 'sovereignty', 'primary', "The Shunammite returns from seven years in Philistia and her land is restored at the exact moment Gehazi tells the king her story — providence orchestrating timing."],
  ['2KI', 8, 1, 29, 'prophecy', 'primary', "Elisha weeps as he tells Hazael he will become king of Aram and brutalize Israel — prophecy that foresees the horror it announces."],
  ['2KI', 8, 1, 29, 'divine-judgment', 'secondary', "Judah and Israel both decline under wicked kings — Jehoram of Judah and Joram of Israel — judgment expressed through leadership failure on both sides of the border."],

  // 2KI 10 — Jehu destroys Baal worship
  ['2KI', 10, 1, 36, 'divine-judgment', 'primary', "Jehu exterminates Ahab's house and massacres Baal worshippers in their own temple — judgment on the house of Omri executed with brutal thoroughness."],
  ['2KI', 10, 1, 36, 'obedience', 'secondary', "God commends Jehu for destroying Ahab's house but condemns him for not turning from Jeroboam's golden calves — partial obedience recognized and partial disobedience condemned."],
  ['2KI', 10, 1, 36, 'idolatry', 'secondary', "Baal worship is purged but calf worship continues — idolatry that reforms one visible evil while retaining a politically convenient one."],

  // 2KI 11 — Athaliah usurps; Joash crowned
  ['2KI', 11, 1, 21, 'sovereignty', 'primary', "Athaliah massacres the royal family, but the infant Joash is hidden in the temple for six years — sovereignty preserving the Davidic line through a single child."],
  ['2KI', 11, 1, 21, 'courage', 'primary', "Jehoiada the priest engineers a coup against Athaliah, arming the temple guard with David's own spears — priestly courage that restores the rightful dynasty."],
  ['2KI', 11, 1, 21, 'covenant', 'secondary', "Jehoiada renews the covenant between the LORD, the king, and the people — covenant as the legal framework for overthrowing a usurper and restoring order."],

  // 2KI 13 — Jehoahaz, Jehoash, and Elisha's death
  ['2KI', 13, 1, 25, 'mercy', 'primary', "Despite Israel's persistent idolatry, God gives them a deliverer because 'he had compassion on them' — mercy that outlasts generations of provocation."],
  ['2KI', 13, 1, 25, 'prophecy', 'secondary', "Dying Elisha tells Joash to strike the ground with arrows — the king strikes only three times, limiting his victories by his own halfhearted faith."],
  ['2KI', 13, 1, 25, 'faithfulness', 'secondary', "Even dead, Elisha's bones raise a man to life — God's power through his prophet extends beyond the grave, a final sign of faithful partnership."],

  // 2KI 14 — Amaziah and Jeroboam II
  ['2KI', 14, 1, 29, 'justice', 'primary', "Amaziah executes his father's assassins but spares their children, obeying the law of Moses — justice that follows divine statute rather than tribal custom."],
  ['2KI', 14, 1, 29, 'sovereignty', 'secondary', "Jeroboam II restores Israel's borders from Lebo-hamath to the Sea of the Arabah — territorial restoration that fulfills Jonah's prophecy through a wicked king."],
  ['2KI', 14, 1, 29, 'humility', 'secondary', "Amaziah's pride after defeating Edom leads him to challenge Israel and suffer humiliating defeat — arrogance that mistakes one victory for invincibility."],

  // 2KI 15 — Succession of kings in Israel and Judah
  ['2KI', 15, 1, 38, 'divine-judgment', 'primary', "Five kings reign in Israel through assassination and conspiracy — Zechariah, Shallum, Menahem, Pekahiah, Pekah — judgment expressed through political chaos."],
  ['2KI', 15, 1, 38, 'sovereignty', 'secondary', "Uzziah of Judah prospers for decades but is struck with leprosy for burning incense in the temple — sovereignty that disciplines even long-faithful kings who overstep."],
  ['2KI', 15, 1, 38, 'idolatry', 'secondary', "Every Israelite king continues the sins of Jeroboam — the golden-calf template proves impossible to discard once institutionalized."],

  // 2KI 16 — Ahaz of Judah
  ['2KI', 16, 1, 20, 'idolatry', 'primary', "Ahaz sacrifices his own son in the fire and copies a pagan altar from Damascus to replace the bronze altar of Solomon — idolatry that reaches into the temple itself."],
  ['2KI', 16, 1, 20, 'betrayal', 'primary', "Ahaz strips the temple to bribe the king of Assyria for help against Aram and Israel — betrayal of covenant loyalty for imperial protection."],
  ['2KI', 16, 1, 20, 'exile', 'secondary', "Ahaz's alliance with Assyria begins Judah's slow slide toward vassal status — the exile starts not with deportation but with voluntary submission."],

  // 2KI 19 — Hezekiah's prayer and Sennacherib's defeat
  ['2KI', 19, 1, 37, 'prayer', 'primary', "Hezekiah spreads Sennacherib's threatening letter before the LORD and prays — 'You alone are God; deliver us so all kingdoms will know' — prayer as theological argument."],
  ['2KI', 19, 1, 37, 'sovereignty', 'primary', "The angel of the LORD strikes 185,000 Assyrians in a single night — sovereignty that renders the world's greatest army irrelevant overnight."],
  ['2KI', 19, 1, 37, 'faithfulness', 'secondary', "Isaiah confirms God will defend Jerusalem 'for my own sake and for the sake of my servant David' — faithfulness to a covenant made generations earlier."],

  // 2KI 21 — Manasseh's wickedness
  ['2KI', 21, 1, 26, 'idolatry', 'primary', "Manasseh rebuilds the high places Hezekiah destroyed, sets up Baal altars in the temple, and practices sorcery — idolatry that reverses an entire generation of reform."],
  ['2KI', 21, 1, 26, 'divine-judgment', 'primary', "God pronounces irreversible judgment on Jerusalem because Manasseh has made Judah worse than the Canaanites Israel displaced — judgment that even later reforms cannot cancel."],
  ['2KI', 21, 1, 26, 'exile', 'secondary', "The prophets declare God will stretch over Jerusalem the measuring line of Samaria — exile previewed as the fate Judah inherits from its sister kingdom."],

  // 2KI 23 — Josiah's reforms
  ['2KI', 23, 1, 37, 'repentance', 'primary', "Josiah tears down high places, burns the Asherah pole, defiles Topheth, and slaughters pagan priests — the most thorough repentance-driven reform in Israel's history."],
  ['2KI', 23, 1, 37, 'obedience', 'primary', "Josiah celebrates a Passover so faithful that 'there had been no such Passover since the days of the judges' — obedience that recovers forgotten liturgy."],
  ['2KI', 23, 1, 37, 'prophecy', 'secondary', "Josiah fulfills by name the prophecy spoken against Jeroboam's altar three centuries earlier — prophetic words that wait patiently for their designated executor."],

  // 2KI 25 — Fall of Jerusalem
  ['2KI', 25, 1, 30, 'exile', 'primary', "Nebuchadnezzar burns the temple, the palace, and every great house in Jerusalem — exile as the final consequence of centuries of covenant breaking."],
  ['2KI', 25, 1, 30, 'divine-judgment', 'primary', "The city that God chose for his name becomes rubble, fulfilling every prophetic warning — judgment delayed for generations but never cancelled."],
  ['2KI', 25, 1, 30, 'mercy', 'secondary', "Jehoiachin is released from prison and given a seat at Babylon's royal table — a flicker of mercy in the darkness, hinting that exile is not the last word."],

  // ==================== 1 CHRONICLES (24 chapters) ====================

  // 1CH 2 — Genealogy of Judah
  ['1CH', 2, 1, 55, 'chosen-people', 'primary', "Judah's genealogy traces the line from Perez through Ram to Jesse and David — chosen-people identity carried through specific families across centuries."],
  ['1CH', 2, 1, 55, 'inheritance', 'secondary', "Clan-by-clan enumeration establishes land rights and tribal identity for the post-exilic community rebuilding its sense of belonging."],

  // 1CH 3 — David's descendants
  ['1CH', 3, 1, 24, 'chosen-people', 'primary', "The royal line from David through Solomon to the exile and beyond — the chosen dynasty catalogued to prove continuity even through catastrophe."],
  ['1CH', 3, 1, 24, 'covenant', 'secondary', "Post-exilic descendants of David are named, sustaining hope that the Davidic covenant promise has not been extinguished by Babylon."],

  // 1CH 4 — Clans of Judah and Simeon; Jabez's prayer
  ['1CH', 4, 1, 43, 'prayer', 'primary', "Jabez prays 'Oh that you would bless me and enlarge my territory' — a brief prayer embedded in genealogy, proving that one bold request can rewrite a life story."],
  ['1CH', 4, 1, 43, 'inheritance', 'secondary', "Simeonite clans expand into Gedor and Mount Seir, seizing pastureland — inheritance actively claimed through migration and settlement."],

  // 1CH 5 — Reuben, Gad, and half-Manasseh
  ['1CH', 5, 1, 41, 'warfare', 'primary', "The Transjordan tribes defeat the Hagrites because they 'cried out to God during the battle, and he answered their prayers because they trusted in him.'"],
  ['1CH', 5, 1, 41, 'exile', 'secondary', "The chapter ends with Assyria deporting these tribes because they were unfaithful — warfare victories negated by later idolatry that leads to exile."],

  // 1CH 6 — Levitical genealogy and cities
  ['1CH', 6, 1, 81, 'worship', 'primary', "The Levitical genealogy traces Aaron's priestly line and the musicians David appointed — worship leadership legitimized by unbroken genealogical authority."],
  ['1CH', 6, 1, 81, 'inheritance', 'secondary', "Forty-eight Levitical cities are catalogued, confirming that the tribe whose inheritance is the LORD himself still requires physical cities."],

  // 1CH 7 — Issachar, Benjamin, Naphtali, Manasseh, Ephraim, Asher
  ['1CH', 7, 1, 40, 'chosen-people', 'primary', "Six tribes catalogued with military census figures — chosen-people identity expressed through organized readiness to defend the community."],
  ['1CH', 7, 1, 40, 'inheritance', 'secondary', "Tribal genealogies establish each family's place within the national framework, anchoring post-exilic identity in ancestral records."],

  // 1CH 8 — Benjamin's genealogy (Saul's line)
  ['1CH', 8, 1, 40, 'chosen-people', 'primary', "Benjamin's genealogy culminates in Saul's family tree — the first royal house documented to set the stage for its replacement by David."],
  ['1CH', 8, 1, 40, 'inheritance', 'secondary', "Benjaminite clans settled in Jerusalem and Gibeon are named, establishing territorial claims that matter to the post-exilic community."],

  // 1CH 9 — Returnees to Jerusalem
  ['1CH', 9, 1, 44, 'community', 'primary', "The first returnees to Jerusalem are listed by priestly, Levitical, and lay families — community rebuilt by cataloguing who came back and what role they fill."],
  ['1CH', 9, 1, 44, 'worship', 'secondary', "Gatekeepers, musicians, and temple servants are enumerated — worship infrastructure restored person by person before a single sacrifice is offered."],

  // 1CH 11 — David's coronation and mighty men
  ['1CH', 11, 1, 47, 'leadership', 'primary', "All Israel gathers at Hebron to make David king, declaring 'You are our bone and flesh' — leadership legitimized by national consensus and divine anointing."],
  ['1CH', 11, 1, 47, 'courage', 'primary', "David's mighty men perform extraordinary feats — Jashobeam kills 300 in one encounter, Eleazar stands alone until his hand froze to the sword — courage that defines an era."],
  ['1CH', 11, 1, 47, 'community', 'secondary', "The list of warriors from every tribe shows David's kingdom built by a broad coalition, not a single tribal faction."],

  // 1CH 12 — Warriors who joined David
  ['1CH', 12, 1, 41, 'community', 'primary', "Soldiers from every tribe — including Benjamin and Judah — defect to David at Ziklag and Hebron, forming a community united by shared conviction."],
  ['1CH', 12, 1, 41, 'courage', 'secondary', "Gadite warriors with faces 'like the faces of lions' cross the Jordan at flood stage to join David — courage measured by what they risk to align with God's anointed."],

  // 1CH 14 — David defeats the Philistines
  ['1CH', 14, 1, 17, 'sovereignty', 'primary', "God tells David to circle behind the Philistines and wait for the sound of marching in the treetops — sovereignty that choreographs battle strategy through rustling leaves."],
  ['1CH', 14, 1, 17, 'prayer', 'secondary', "David inquires of God before each battle and receives different instructions each time — prayer as situational obedience, not formulaic repetition."],

  // 1CH 15 — The ark brought to Jerusalem properly
  ['1CH', 15, 1, 29, 'worship', 'primary', "David organizes Levites to carry the ark on poles as Moses prescribed — worship corrected after the Uzzah disaster by returning to God's original instructions."],
  ['1CH', 15, 1, 29, 'obedience', 'primary', "David acknowledges the first failure — 'We did not inquire of him about how to do it in the prescribed way' — obedience that learns from catastrophe."],

  // 1CH 16 — David's psalm of thanksgiving
  ['1CH', 16, 1, 43, 'worship', 'primary', "David appoints Asaph and the Levites to minister before the ark with a psalm combining portions of Psalms 96, 105, and 106 — worship as curated liturgy."],
  ['1CH', 16, 1, 43, 'faithfulness', 'primary', "The psalm declares 'He remembers his covenant forever, the promise he made for a thousand generations' — faithfulness celebrated in public, corporate song."],
  ['1CH', 16, 1, 43, 'covenant', 'secondary', "The Abrahamic covenant — land, descendants, blessing — is rehearsed in song before the entire assembly, binding worship to covenant memory."],

  // 1CH 18 — David's victories
  ['1CH', 18, 1, 17, 'sovereignty', 'primary', "David defeats Philistia, Moab, Zobah, and Aram — 'The LORD gave David victory wherever he went,' crediting every military success to divine sovereignty."],
  ['1CH', 18, 1, 17, 'justice', 'secondary', "David administers justice and equity to all his people — the Chronicler pairs external conquest with internal righteousness."],

  // 1CH 19 — Ammonite war
  ['1CH', 19, 1, 19, 'warfare', 'primary', "Hanun's humiliation of David's ambassadors triggers a massive war with Ammon and its Aramean mercenaries — warfare ignited by diplomatic insult."],
  ['1CH', 19, 1, 19, 'courage', 'secondary', "Joab deploys forces on two fronts and trusts God for the outcome — battlefield courage paired with theological surrender."],

  // 1CH 20 — Capture of Rabbah and Philistine giants
  ['1CH', 20, 1, 8, 'warfare', 'primary', "David's forces capture Rabbah's crown and defeat Philistine giants — warfare that systematically eliminates threats to the promised kingdom."],
  ['1CH', 20, 1, 8, 'sovereignty', 'secondary', "Giant-slaying is not David's alone — his warriors kill Goliath's relatives, showing that sovereignty distributes heroism across the community."],

  // 1CH 22 — David prepares for the temple
  ['1CH', 22, 1, 19, 'worship', 'primary', "David amasses gold, silver, bronze, and timber beyond measure for the temple he will not build — worship preparation as a legacy gift from one generation to the next."],
  ['1CH', 22, 1, 19, 'calling', 'primary', "David charges Solomon: 'Now, my son, the LORD be with you, and may you succeed in building the house' — calling passed from father to son with divine commission."],
  ['1CH', 22, 1, 19, 'obedience', 'secondary', "David tells Solomon that success depends on keeping the law of Moses — obedience as the operating system for every construction project."],

  // 1CH 23 — Levitical divisions organized
  ['1CH', 23, 1, 32, 'worship', 'primary', "David organizes 38,000 Levites into divisions for temple service, gate-keeping, and praise — worship scaled up from portable tabernacle to permanent institution."],
  ['1CH', 23, 1, 32, 'community', 'secondary', "Detailed Levitical assignments ensure every family has a defined role — community organized so that no one is left without a function in God's house."],

  // 1CH 24 — Priestly divisions
  ['1CH', 24, 1, 31, 'worship', 'primary', "Twenty-four priestly divisions established by lot ensure year-round temple coverage — worship organized so that sacrifice never ceases for lack of personnel."],
  ['1CH', 24, 1, 31, 'chosen-people', 'secondary', "Assignment by sacred lot removes human favoritism from priestly scheduling — chosen-people roles distributed by divine randomness, not political connection."],

  // 1CH 25 — Musicians organized
  ['1CH', 25, 1, 31, 'worship', 'primary', "Two hundred eighty-eight trained musicians divided into twenty-four courses — worship given professional infrastructure because praise deserves skill."],
  ['1CH', 25, 1, 31, 'prophecy', 'secondary', "Asaph, Heman, and Jeduthun prophesy with lyres, harps, and cymbals — musical prophecy recognized as a legitimate mode of divine communication."],

  // 1CH 26 — Gatekeepers and treasurers
  ['1CH', 26, 1, 32, 'worship', 'primary', "Gatekeepers assigned to every entrance of the temple mount — worship protected by organized security that treats access to God's house as a sacred trust."],
  ['1CH', 26, 1, 32, 'community', 'secondary', "Treasurers manage dedicated gifts and war spoils — community stewardship of sacred resources organized with the same care as priestly schedules."],

  // 1CH 27 — Military and civil administrators
  ['1CH', 27, 1, 34, 'leadership', 'primary', "Twelve monthly divisions of 24,000 soldiers each, plus tribal chiefs and royal estate managers — leadership structured for both military readiness and economic administration."],
  ['1CH', 27, 1, 34, 'community', 'secondary', "The administrative list names overseers of vineyards, olive trees, herds, and storehouses — community life organized down to agricultural detail."],

  // 1CH 28 — David's charge to Solomon and the temple plans
  ['1CH', 28, 1, 21, 'calling', 'primary', "David publicly announces God chose Solomon to build the temple and delivers architectural plans received by the Spirit — calling confirmed before the entire assembly."],
  ['1CH', 28, 1, 21, 'obedience', 'primary', "David charges Solomon: 'Be strong and courageous and do the work. Do not be afraid, for the LORD God is with you' — obedience as courage sustained by presence."],
  ['1CH', 28, 1, 21, 'divine-plan', 'secondary', "Every detail of the temple — rooms, courts, treasuries — comes from a written plan from God's hand, leaving nothing to human invention."],

  // 1CH 29 — Offerings for the temple and David's death
  ['1CH', 29, 1, 30, 'worship', 'primary', "David gives from his personal fortune and the leaders follow — 'Who am I that we should be able to give as generously as this? Everything comes from you' — worship through radical generosity."],
  ['1CH', 29, 1, 30, 'sovereignty', 'primary', "David's prayer declares 'Yours, LORD, is the greatness and the power and the glory' — sovereignty acknowledged as the foundation of every good gift."],
  ['1CH', 29, 1, 30, 'humility', 'secondary', "David confesses 'We are foreigners and strangers in your sight, as were all our ancestors' — humility before God even at the height of royal achievement."],

  // ==================== 2 CHRONICLES (29 chapters) ====================

  // 2CH 2 — Solomon prepares to build the temple
  ['2CH', 2, 1, 18, 'worship', 'primary', "Solomon tells Hiram of Tyre 'The temple I am going to build will be great, because our God is greater than all other gods' — worship architecture scaled to theology."],
  ['2CH', 2, 1, 18, 'calling', 'secondary', "Solomon recruits 153,600 laborers and 3,600 overseers — the calling to build God's house mobilizes an entire nation's workforce."],

  // 2CH 3 — Temple construction begins
  ['2CH', 3, 1, 17, 'worship', 'primary', "The temple rises on Mount Moriah where Abraham offered Isaac and David saw the angel — worship anchored to the geography of prior divine encounters."],
  ['2CH', 3, 1, 17, 'covenant', 'secondary', "The Most Holy Place, overlaid with 600 talents of gold, houses the ark of the covenant — architectural extravagance serving covenant presence."],

  // 2CH 4 — Temple furnishings
  ['2CH', 4, 1, 22, 'worship', 'primary', "The bronze altar, the molten sea, ten lampstands, and a hundred gold basins — every furnishing crafted to facilitate unbroken, magnificent worship."],
  ['2CH', 4, 1, 22, 'calling', 'secondary', "Huram-abi's craftsmanship transforms raw bronze and gold into sacred implements — artistic calling placed in direct service of divine encounter."],

  // 2CH 6 — Solomon's dedication prayer
  ['2CH', 6, 1, 42, 'prayer', 'primary', "Solomon prays seven petitions covering war, drought, famine, plague, and exile — prayer as the prescribed remedy for every category of national crisis."],
  ['2CH', 6, 1, 42, 'mercy', 'primary', "Each petition ends with 'hear from heaven and forgive' — mercy assumed as God's fundamental disposition, not an exception to be negotiated."],
  ['2CH', 6, 1, 42, 'covenant', 'secondary', "Solomon appeals to the Davidic covenant as the ground of his petition — 'Do not reject your anointed one; remember the mercies promised to David your servant.'"],

  // 2CH 7 — Fire falls and God's answer
  ['2CH', 7, 1, 22, 'worship', 'primary', "Fire falls from heaven and consumes the sacrifices, and glory fills the temple so that priests cannot enter — worship validated by visible, terrifying divine response."],
  ['2CH', 7, 1, 22, 'repentance', 'primary', "God's answer to Solomon — 'If my people who are called by my name humble themselves and pray, I will heal their land' — repentance as the permanent mechanism of national restoration."],
  ['2CH', 7, 1, 22, 'covenant', 'secondary', "God warns that disobedience will turn the temple into a heap of ruins — covenant promise paired with covenant threat in a single conversation."],

  // 2CH 8 — Solomon's building projects
  ['2CH', 8, 1, 18, 'sovereignty', 'primary', "Solomon builds store cities, fortifies towns, and stations his fleet at Ezion-geber — sovereignty expressed through strategic infrastructure that secures God's people."],
  ['2CH', 8, 1, 18, 'worship', 'secondary', "Solomon maintains the daily, Sabbath, and festival sacrifices as Moses commanded — worship calendar observed alongside empire-building."],

  // 2CH 11 — Rehoboam fortifies Judah
  ['2CH', 11, 1, 23, 'sovereignty', 'primary', "God forbids Rehoboam from attacking Israel through the prophet Shemaiah — sovereignty that overrules a king's military instinct to preserve a divine decision."],
  ['2CH', 11, 1, 23, 'worship', 'secondary', "Priests and Levites from all Israel migrate south because Jeroboam bars them from serving — worship loyalty that uproots families to follow the legitimate altar."],

  // 2CH 12 — Shishak invades; Rehoboam humbles himself
  ['2CH', 12, 1, 16, 'humility', 'primary', "Rehoboam and the princes humble themselves when Shemaiah announces judgment — 'The LORD is righteous' — humility that acknowledges deserved punishment and reduces its severity."],
  ['2CH', 12, 1, 16, 'divine-judgment', 'secondary', "Shishak plunders the temple's gold shields, replaced by bronze — judgment made visible in the downgrade of national treasure."],

  // 2CH 13 — Abijah defeats Jeroboam
  ['2CH', 13, 1, 23, 'faithfulness', 'primary', "Abijah rebukes Jeroboam's golden calves from a mountaintop, declaring Judah still serves the LORD with legitimate priests — faithfulness as the basis of his military confidence."],
  ['2CH', 13, 1, 23, 'warfare', 'secondary', "Judah is ambushed front and rear but cries out to God and routs Israel, killing 500,000 — warfare won by appeal to the covenant God, not tactical superiority."],

  // 2CH 14 — Asa's reforms and victory over Zerah
  ['2CH', 14, 1, 15, 'prayer', 'primary', "Facing a million-man Ethiopian army, Asa prays 'LORD, there is no one like you to help the powerless against the mighty' — prayer as the first and only military strategy."],
  ['2CH', 14, 1, 15, 'courage', 'secondary', "Asa removes foreign altars and high places in peacetime, spending political capital on reform before crisis forces his hand."],

  // 2CH 15 — Azariah's prophecy and Asa's reform
  ['2CH', 15, 1, 19, 'repentance', 'primary', "Azariah tells Asa 'The LORD is with you when you are with him. If you seek him, he will be found' — repentance as the condition that activates divine presence."],
  ['2CH', 15, 1, 19, 'covenant', 'secondary', "Asa leads the people to renew the covenant, swearing to seek the LORD with all their heart — covenant renewal as the institutional expression of repentance."],

  // 2CH 16 — Asa's failure and death
  ['2CH', 16, 1, 14, 'faithfulness', 'primary', "Asa hires Aram instead of trusting God against Baasha — the king who prayed against a million Ethiopians now buys a mercenary alliance, faithfulness abandoned in old age."],
  ['2CH', 16, 1, 14, 'divine-judgment', 'secondary', "The seer Hanani rebukes Asa: 'The eyes of the LORD range throughout the earth to strengthen those whose hearts are fully committed' — judgment on a divided heart."],

  // 2CH 17 — Jehoshaphat strengthens Judah
  ['2CH', 17, 1, 19, 'obedience', 'primary', "Jehoshaphat sends officials, Levites, and priests throughout Judah with the Book of the Law — obedience promoted through a national teaching circuit."],
  ['2CH', 17, 1, 19, 'leadership', 'secondary', "The fear of the LORD falls on surrounding nations so they do not make war — leadership so righteous that it projects security without military action."],

  // 2CH 18 — Jehoshaphat and Ahab at Ramoth-gilead
  ['2CH', 18, 1, 34, 'prophecy', 'primary', "Micaiah alone speaks truth against four hundred court prophets, declaring 'I saw all Israel scattered on the hills like sheep without a shepherd' — prophetic integrity against consensus."],
  ['2CH', 18, 1, 34, 'sovereignty', 'secondary', "God sends a lying spirit to Ahab's prophets to lure him to his death — sovereignty that uses deception to execute judgment on a king who prefers lies."],

  // 2CH 19 — Jehoshaphat's judicial reforms
  ['2CH', 19, 1, 11, 'justice', 'primary', "Jehoshaphat appoints judges throughout Judah with the charge: 'Consider carefully what you do, because you are not judging for mere mortals but for the LORD' — justice as divine vocation."],
  ['2CH', 19, 1, 11, 'leadership', 'secondary', "The judicial reform includes a supreme court in Jerusalem with priests and Levites — leadership that builds institutions for justice rather than relying on royal fiat."],

  // 2CH 21 — Jehoram's evil reign
  ['2CH', 21, 1, 20, 'divine-judgment', 'primary', "Jehoram kills all his brothers upon taking the throne, and God strikes him with an incurable bowel disease — judgment proportional to the brutality of fratricide."],
  ['2CH', 21, 1, 20, 'covenant', 'secondary', "Despite Jehoram's wickedness, God does not destroy Judah 'because of the covenant he had made with David' — covenant as the sole thread preventing annihilation."],

  // 2CH 22 — Ahaziah's brief reign and Athaliah's coup
  ['2CH', 22, 1, 12, 'sovereignty', 'primary', "Ahaziah reigns one year before Jehu kills him — sovereignty using a northern revolution to prune Judah's corrupted branch grafted from Ahab's house."],
  ['2CH', 22, 1, 12, 'courage', 'secondary', "Jehosheba hides the infant Joash from Athaliah's massacre in the temple — courage that saves the Davidic line through one woman's defiance."],

  // 2CH 23 — Joash crowned, Athaliah executed
  ['2CH', 23, 1, 21, 'courage', 'primary', "Jehoiada the priest orchestrates a palace coup with military commanders, revealing the hidden prince and proclaiming 'Long live the king!' — priestly courage that restores the dynasty."],
  ['2CH', 23, 1, 21, 'covenant', 'primary', "Jehoiada makes a covenant between himself, the people, and the king that they would be the LORD's people — covenant as the constitutional act that legitimizes regime change."],

  // 2CH 24 — Joash repairs the temple, then falls away
  ['2CH', 24, 1, 27, 'worship', 'primary', "Joash repairs the temple by collecting offerings in a chest at the gate — worship infrastructure rebuilt through popular generosity when institutional systems fail."],
  ['2CH', 24, 1, 27, 'betrayal', 'primary', "After Jehoiada dies, Joash listens to officials who lead him into idolatry and murders Zechariah, Jehoiada's own son — betrayal of the mentor who saved his life."],
  ['2CH', 24, 1, 27, 'divine-judgment', 'secondary', "A small Aramean force defeats Judah's large army as judgment for abandoning God — military math inverted by divine displeasure."],

  // 2CH 25 — Amaziah's mixed record
  ['2CH', 25, 1, 28, 'obedience', 'primary', "Amaziah dismisses 100,000 hired Israelite soldiers on a prophet's word, absorbing the financial loss — obedience that costs real money when God overrides military planning."],
  ['2CH', 25, 1, 28, 'idolatry', 'secondary', "After defeating Edom, Amaziah brings back Edomite gods and worships them — idolatry born from the inexplicable impulse to worship the gods of a people you just conquered."],

  // 2CH 26 — Uzziah's rise and fall
  ['2CH', 26, 1, 23, 'sovereignty', 'primary', "God gives Uzziah extraordinary military and agricultural success as long as he seeks the LORD — sovereignty that prospers proportional to devotion."],
  ['2CH', 26, 1, 23, 'humility', 'secondary', "Uzziah enters the temple to burn incense himself and is struck with leprosy — pride punished instantly when a king usurps priestly prerogative."],

  // 2CH 27 — Jotham's faithful reign
  ['2CH', 27, 1, 9, 'obedience', 'primary', "Jotham does right in God's eyes and does not enter the temple as his father did — obedience that learns from a predecessor's mistake."],
  ['2CH', 27, 1, 9, 'faithfulness', 'secondary', "Jotham grows powerful because he 'ordered his ways before the LORD his God' — faithfulness rewarded with quiet, steady prosperity."],

  // 2CH 28 — Ahaz's apostasy
  ['2CH', 28, 1, 27, 'idolatry', 'primary', "Ahaz makes cast images for the Baals, burns his sons in the fire, and sacrifices on every high hill — idolatry so extreme it rivals Canaanite practice."],
  ['2CH', 28, 1, 27, 'divine-judgment', 'primary', "God delivers Judah to Aram, Israel, Edom, and Philistia simultaneously — judgment from every compass point because Ahaz has abandoned the LORD from every angle."],
  ['2CH', 28, 1, 27, 'exile', 'secondary', "Ahaz strips the temple and shuts its doors, then sets up altars on every Jerusalem street corner — spiritual exile achieved without leaving the land."],

  // 2CH 29 — Hezekiah reopens and purifies the temple
  ['2CH', 29, 1, 36, 'repentance', 'primary', "Hezekiah opens the temple doors in his first month as king and commands the Levites to consecrate themselves — repentance as the first act of government."],
  ['2CH', 29, 1, 36, 'worship', 'primary', "The purification takes sixteen days, then sacrifices resume with singing, trumpets, and prostration — worship restored from silence to symphony."],
  ['2CH', 29, 1, 36, 'leadership', 'secondary', "Hezekiah does not delegate spiritual renewal — he personally directs every stage of temple cleansing, modeling leadership that prioritizes worship over politics."],

  // 2CH 30 — Hezekiah's Passover
  ['2CH', 30, 1, 27, 'mercy', 'primary', "Many eat the Passover without proper purification, but Hezekiah prays and God heals the people — mercy that accepts imperfect worship when the heart is sincere."],
  ['2CH', 30, 1, 27, 'community', 'primary', "Hezekiah invites all Israel, including the northern tribes, to celebrate together — community rebuilt across political borders through shared worship."],
  ['2CH', 30, 1, 27, 'repentance', 'secondary', "Couriers carry the invitation north: 'Do not be stiff-necked as your ancestors were; yield yourselves to the LORD' — repentance offered as reunion."],

  // 2CH 31 — Hezekiah's ongoing reforms
  ['2CH', 31, 1, 21, 'worship', 'primary', "The people destroy high places, sacred stones, and Asherah poles throughout Judah, Benjamin, Ephraim, and Manasseh — worship purified by removing rival altars."],
  ['2CH', 31, 1, 21, 'faithfulness', 'secondary', "Tithes and offerings pour in so abundantly they are stacked in heaps — faithfulness in giving that overwhelms the storage capacity of the temple."],

  // 2CH 32 — Sennacherib's invasion and Hezekiah's deliverance
  ['2CH', 32, 1, 33, 'prayer', 'primary', "Hezekiah and Isaiah cry out to heaven when Sennacherib blasphemes, and God sends an angel who annihilates the Assyrian army — prayer as the weapon that summons angelic intervention."],
  ['2CH', 32, 1, 33, 'sovereignty', 'primary', "Sennacherib boasts that no god has stopped him — the LORD responds with 185,000 dead soldiers, demonstrating that Israel's God is not like the gods of conquered nations."],
  ['2CH', 32, 1, 33, 'humility', 'secondary', "Hezekiah's heart grows proud after his healing, but he repents — humility recovered through self-correction before judgment falls on Jerusalem."],

  // 2CH 33 — Manasseh's evil and repentance
  ['2CH', 33, 1, 25, 'repentance', 'primary', "In Assyrian captivity, Manasseh — the most wicked king in Judah's history — humbles himself and God restores him to Jerusalem, proving no sinner is beyond repentance."],
  ['2CH', 33, 1, 25, 'mercy', 'primary', "God hears the prayer of a king who set up altars to Baal in the temple — mercy so radical it redefines the limits of forgiveness."],
  ['2CH', 33, 1, 25, 'idolatry', 'secondary', "Manasseh practices sorcery, consults mediums, and sets up a carved image in the temple — idolatry catalogued in exhaustive detail to magnify the miracle of his later repentance."],

  // 2CH 35 — Josiah's Passover
  ['2CH', 35, 1, 27, 'worship', 'primary', "Josiah celebrates a Passover unmatched since Samuel's day, with 30,000 lambs and 3,000 bulls from the king's own herds — worship funded by royal generosity at unprecedented scale."],
  ['2CH', 35, 1, 27, 'obedience', 'primary', "Every detail follows the written directions of David and Solomon — obedience to liturgical tradition treated as seriously as obedience to moral law."],
  ['2CH', 35, 1, 27, 'sovereignty', 'secondary', "Josiah dies fighting Pharaoh Neco despite a divine warning through the Egyptian king — sovereignty that even the best reformer cannot override by ignoring a prophetic word."],

  // ==================== EZRA (6 chapters) ====================

  // EZR 2 — List of returning exiles
  ['EZR', 2, 1, 70, 'chosen-people', 'primary', "49,897 returnees catalogued by family, town, and temple role — chosen-people identity rebuilt through meticulous record-keeping after exile shattered every institution."],
  ['EZR', 2, 1, 70, 'community', 'secondary', "Priests, Levites, singers, gatekeepers, and temple servants are listed alongside lay families — community restored with worship infrastructure prioritized from day one."],

  // EZR 4 — Opposition to rebuilding
  ['EZR', 4, 1, 24, 'courage', 'primary', "Adversaries offer to help build the temple, and Zerubbabel refuses — courage to reject compromise when the partners do not share covenant commitment."],
  ['EZR', 4, 1, 24, 'exile', 'secondary', "Officials write to Artaxerxes accusing Jerusalem of rebellion, and the king orders construction stopped — exile's power persists even after the return, through imperial bureaucracy."],

  // EZR 5 — Haggai and Zechariah encourage rebuilding
  ['EZR', 5, 1, 17, 'prophecy', 'primary', "Haggai and Zechariah prophesy to the Jews in Judah, and Zerubbabel and Jeshua restart construction — prophetic speech as the catalyst that breaks political paralysis."],
  ['EZR', 5, 1, 17, 'courage', 'secondary', "Building resumes before the Persian bureaucracy grants permission — courage that acts on God's word while the paperwork is still in transit."],

  // EZR 6 — Temple completed and dedicated
  ['EZR', 6, 1, 22, 'worship', 'primary', "The second temple is completed and dedicated with sacrifices and joy — worship restored in the very city where it was destroyed, proving exile is not the final chapter."],
  ['EZR', 6, 1, 22, 'sovereignty', 'primary', "Darius finds Cyrus's decree and funds the temple from royal revenue — pagan kings become unwitting instruments of divine sovereignty, financing Israel's worship."],
  ['EZR', 6, 1, 22, 'faithfulness', 'secondary', "The exiles celebrate Passover — the festival of liberation — in their rebuilt temple, closing a seventy-year circle of faithfulness from exile to restoration."],

  // EZR 8 — Ezra's caravan to Jerusalem
  ['EZR', 8, 1, 36, 'prayer', 'primary', "Ezra proclaims a fast at the Ahava canal, too ashamed to ask the king for soldiers after boasting that God protects those who seek him — prayer as the only escort."],
  ['EZR', 8, 1, 36, 'faithfulness', 'secondary', "Ezra recruits Levites for the caravan because none had volunteered — faithfulness that actively gathers reluctant participants for God's work."],

  // EZR 10 — Dissolution of foreign marriages
  ['EZR', 10, 1, 44, 'repentance', 'primary', "The assembly weeps in the rain as they confess intermarriage with pagan nations — corporate repentance so intense it reshapes family structures."],
  ['EZR', 10, 1, 44, 'covenant', 'primary', "The people pledge to put away foreign wives and their children — covenant purity enforced at devastating personal cost to preserve Israel's distinct identity."],
  ['EZR', 10, 1, 44, 'obedience', 'secondary', "A three-month investigation examines every case — obedience administered through due process, not mob action."],

  // ==================== NEHEMIAH (7 chapters) ====================

  // NEH 3 — Builders of the wall
  ['NEH', 3, 1, 38, 'community', 'primary', "Forty-one groups repair named sections of the wall — priests, goldsmiths, perfume-makers, officials, daughters — community built literally, stone by stone, by every social class."],
  ['NEH', 3, 1, 38, 'calling', 'secondary', "Each family rebuilds the section nearest their own house — calling expressed through proximity, everyone responsible for the wall they can see from their door."],

  // NEH 7 — Census of returnees
  ['NEH', 7, 1, 73, 'chosen-people', 'primary', "Nehemiah finds Zerubbabel's original census and registers the community by genealogy — chosen-people identity reconfirmed through ancestral documentation."],
  ['NEH', 7, 1, 73, 'community', 'secondary', "The census includes those who could not prove their ancestry and were excluded from the priesthood — community boundaries maintained by genealogical evidence."],

  // NEH 9 — National confession
  ['NEH', 9, 1, 38, 'repentance', 'primary', "The Levites lead a public prayer that rehearses Israel's entire history of rebellion and God's patience — repentance grounded in honest reckoning with the past."],
  ['NEH', 9, 1, 38, 'mercy', 'primary', "The prayer repeats 'in your great mercy' seven times — mercy is the refrain that holds the nation's story together despite endless unfaithfulness."],
  ['NEH', 9, 1, 38, 'faithfulness', 'secondary', "From Abraham to the exile, God keeps every promise while Israel breaks every commitment — divine faithfulness contrasted with human failure across two millennia."],

  // NEH 10 — Covenant renewal pledge
  ['NEH', 10, 1, 40, 'covenant', 'primary', "Eighty-four leaders sign a binding agreement to keep the law — covenant renewed not in emotional fervor but in written, witnessed commitment."],
  ['NEH', 10, 1, 40, 'obedience', 'primary', "The pledge specifies no intermarriage, Sabbath observance, and temple support — obedience broken into concrete, measurable commitments."],
  ['NEH', 10, 1, 40, 'community', 'secondary', "The rest of the people join the oath with a curse on themselves if they break it — community that binds itself voluntarily to covenant consequences."],

  // NEH 11 — Settlement of Jerusalem
  ['NEH', 11, 1, 36, 'community', 'primary', "Lots cast to move one in ten families into Jerusalem — community rebuilt by voluntary and involuntary sacrifice because the holy city needs residents, not just walls."],
  ['NEH', 11, 1, 36, 'courage', 'secondary', "Those who volunteered to live in Jerusalem are praised — courage to inhabit a city surrounded by hostile neighbors when safer towns are available."],

  // NEH 12 — Dedication of the wall
  ['NEH', 12, 1, 47, 'worship', 'primary', "Two great choirs march in opposite directions on top of the wall and meet at the temple — worship that turns infrastructure into liturgy and construction into praise."],
  ['NEH', 12, 1, 47, 'community', 'primary', "The joy of Jerusalem is heard from far away — community celebration so loud it becomes a testimony to surrounding nations."],
  ['NEH', 12, 1, 47, 'faithfulness', 'secondary', "Priests and Levites are recorded by name across generations — faithfulness to worship roles maintained through meticulous genealogical records."],

  // NEH 13 — Nehemiah's final reforms
  ['NEH', 13, 1, 31, 'obedience', 'primary', "Nehemiah discovers the temple storeroom given to Tobiah, tithes unpaid, Sabbath violated, and intermarriage resumed — every reform from chapter 10 already unraveling."],
  ['NEH', 13, 1, 31, 'leadership', 'primary', "Nehemiah throws out Tobiah's furniture, confronts the nobles, shuts the gates on Sabbath, and pulls hair from intermarrying men — leadership that physically enforces holiness when persuasion fails."],
  ['NEH', 13, 1, 31, 'repentance', 'secondary', "Nehemiah prays 'Remember me, O my God, for good' — repentance-driven reform that knows human effort is insufficient without divine remembrance."],

  // ==================== ESTHER (5 chapters) ====================

  // EST 4 — Mordecai's plea and Esther's decision
  ['EST', 4, 1, 17, 'courage', 'primary', "Esther resolves 'If I perish, I perish' and approaches the king uninvited — courage that accepts death as the price of obedience to a higher calling."],
  ['EST', 4, 1, 17, 'calling', 'primary', "Mordecai's question — 'Who knows whether you have come to the kingdom for such a time as this?' — reframes privilege as divine positioning for a sacrificial task."],
  ['EST', 4, 1, 17, 'prayer', 'secondary', "Esther calls a three-day fast for all Jews in Susa — in a book that never mentions God, corporate fasting functions as prayer's silent synonym."],

  // EST 6 — The king honors Mordecai
  ['EST', 6, 1, 14, 'sovereignty', 'primary', "The king's insomnia on the crucial night leads to the reading of Mordecai's unrewarded loyalty — divine sovereignty operating through a sleepless night and a forgotten record."],
  ['EST', 6, 1, 14, 'justice', 'primary', "Haman is forced to parade Mordecai through the streets in royal robes — justice that uses the enemy's own proposal to honor the righteous."],

  // EST 7 — Esther exposes Haman
  ['EST', 7, 1, 10, 'courage', 'primary', "Esther reveals her Jewish identity and accuses Haman to his face at the king's table — courage that risks everything in a single sentence."],
  ['EST', 7, 1, 10, 'justice', 'primary', "Haman is hanged on the gallows he built for Mordecai — justice that turns a man's weapon into his own execution device."],
  ['EST', 7, 1, 10, 'divine-plan', 'secondary', "Every coincidence converges: the banquets, the timing, the gallows already built — a divine plan visible only in retrospect, operating without a single miracle."],

  // EST 9 — Jews defend themselves; Purim established
  ['EST', 9, 1, 32, 'sovereignty', 'primary', "The day decreed for Jewish annihilation becomes the day Jews triumph over their enemies — sovereignty that reverses genocide into victory."],
  ['EST', 9, 1, 32, 'community', 'primary', "Purim is established as an annual festival of feasting, joy, and gifts to the poor — community identity forged through shared remembrance of deliverance."],
  ['EST', 9, 1, 32, 'justice', 'secondary', "The Jews strike down those who sought to destroy them but refuse to plunder — justice that defends without enriching itself at the enemy's expense."],

  // EST 10 — Mordecai's greatness
  ['EST', 10, 1, 13, 'leadership', 'primary', "Mordecai becomes second to the king and seeks the welfare of his people — leadership exercised in exile that uses imperial power for the good of the vulnerable."],
  ['EST', 10, 1, 13, 'divine-plan', 'secondary', "A Jewish exile rises to the highest position in the Persian empire — the divine plan places covenant people in positions of influence among the nations."],
];

// --- Insert logic ---
const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const insertMany = db.transaction((data) => {
  let count = 0;
  for (const [bookId, chapter, verseStart, verseEnd, themeId, relevance, contextNote] of data) {
    insert.run(themeId, bookId, chapter, verseStart, verseEnd, relevance, contextNote);
    count++;
  }
  return count;
});

const count = insertMany(rows);
console.log(`Inserted ${count} passage_themes for historical book gaps.`);

// --- Verification ---
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('JOS','JDG','1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH','EST')
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('By book:', JSON.stringify(byBook));

const totalChapters = db.prepare(`
  SELECT COUNT(DISTINCT book_id || ':' || chapter) as chapters FROM passage_themes
  WHERE book_id IN ('JOS','JDG','1SA','2SA','1KI','2KI','1CH','2CH','EZR','NEH','EST')
`).get();
console.log('Total distinct chapters covered:', totalChapters.chapters);

db.close();
