const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // jdg-incomplete-conquest (JDG 1:1-2:5)
  ['joshua','JDG',1,1,5,'mentioned','N/A','his death triggers the question: who will fight next','tribal survival without centralized leadership','Joshua is gone and the cracks show immediately, each tribe fights alone with mixed results','When the founding CEO retires and every department starts doing its own thing','scholarship'],
  ['caleb','JDG',1,1,5,'deuteragonist','determined','claim his inheritance by force','personal legacy and tribal territory','Caleb offers his daughter as a prize for taking Debir, old-school motivation','A senior leader incentivizing the next generation with real rewards','scholarship'],

  // jdg-cycle-of-judges (JDG 2:6-3:6)
  ['joshua','JDG',2,6,6,'mentioned','N/A','his generation kept the faith and the next forgot','generational faithfulness','The generation that saw miracles dies and the next one does not know the LORD','Kids who grow up in the family business but have no idea why it was built','scholarship'],
  ['othniel','JDG',2,6,6,'deuteragonist','Spirit-empowered','deliver Israel from Cushan-Rishathaim','breaking the first cycle of oppression','Othniel is the model judge: called, empowered, victorious, and then the land rests','The first hire who sets the template everyone else gets measured against','scholarship'],

  // jdg-ehud-kills-eglon (JDG 3:12-30)
  ['ehud','JDG',3,12,30,'protagonist','cunning-and-bold','assassinate Eglon and liberate Israel','freedom from Moabite oppression','A left-handed Benjamite straps a short sword to his right thigh and walks into the throne room','The underestimated outsider who uses what everyone sees as a disadvantage','scholarship'],

  // jdg-deborah-and-barak (JDG 4:1-5:31)
  ['deborah','JDG',4,1,31,'protagonist','authoritative-and-prophetic','rally Israel against Sisera and the Canaanite oppression','national liberation and covenant faithfulness','Deborah judges under a palm tree and commands Barak to fight, she does not ask permission','A woman in leadership who has to push a reluctant male colleague to do his job','scholarship'],
  ['barak','JDG',4,1,31,'deuteragonist','hesitant','defeat Sisera but only if Deborah comes along','military victory but shared glory','Barak refuses to go without Deborah and loses the honor of the kill to a woman','The executive who will not make a move without his mentor in the room','scholarship'],
  ['jael','JDG',4,1,31,'witness','fierce-hospitality','kill Sisera in her own tent','ending the battle decisively','Jael offers milk and a blanket then drives a tent peg through his skull, hospitality weaponized','The quiet person at the party who ends up being the most decisive one in the crisis','scholarship'],

  // jdg-gideons-call (JDG 6:1-40)
  ['gideon','JDG',6,1,40,'protagonist','fearful-and-doubting','respond to God\'s call to save Israel from Midian','Israel\'s survival against overwhelming odds','Gideon is threshing wheat in a winepress to hide from Midianites when the angel calls him mighty warrior','Getting a promotion email while you are hiding in your cubicle hoping no one notices you','scholarship'],

  // jdg-gideons-victory (JDG 7:1-8:35)
  ['gideon','JDG',7,1,35,'protagonist','obedient-then-flawed','defeat Midian with 300 men','proving God fights, not numbers','God cuts the army from 32000 to 300 so nobody can brag, then they win with torches and jars','Your startup beats the enterprise competitor with a skeleton crew and a wild pitch','scholarship'],

  // jdg-abimelechs-tyranny (JDG 9:1-57)
  ['abimelech-son-of-gideon','JDG',9,1,57,'antagonist','ruthless-ambition','seize power by murdering his 70 brothers','personal kingship in a society that rejected monarchy','Abimelech hires thugs, kills his brothers on a single stone, and is eventually killed by a woman dropping a millstone','The toxic executive who claws to the top by destroying peers and gets taken out by someone nobody expected','scholarship'],
  ['woman-of-thebez','JDG',9,1,57,'witness','decisive','defend her city from Abimelech','survival of Thebez','She drops a millstone on his head from the tower wall, ending his reign of terror','The junior employee who stops the bully that everyone else was too afraid to confront','scholarship'],

  // jdg-jephthahs-vow (JDG 10:6-12:7)
  ['jephthah','JDG',10,6,7,'protagonist','desperate-and-rash','deliver Israel from the Ammonites','military victory at a devastating personal cost','Jephthah vows to sacrifice whatever comes out of his door first, and his only daughter walks out','Making a promise in desperation that costs you the thing you love most','scholarship'],
  ['jephthahs-daughter','JDG',10,6,7,'deuteragonist','grief-stricken-yet-accepting','honor her father\'s vow','her own life','She asks only for two months to mourn her virginity with friends before the vow is fulfilled','The child who pays the price for a parent\'s reckless decision','scholarship'],

  // jdg-samsons-birth (JDG 13:1-25)
  ['manoah','JDG',13,1,25,'deuteragonist','awed-and-anxious','understand the angel\'s instructions for raising Samson','raising a consecrated child correctly','Manoah asks the angel\'s name and is told it is too wonderful, then panics thinking they will die','The anxious parent who reads every parenting book and still feels unprepared','scholarship'],
  ['manoahs-wife','JDG',13,1,25,'protagonist','calm-faith','receive and trust the divine announcement','the birth of a deliverer','She sees the angel first, reports accurately, and calms Manoah down with logic: if God meant to kill us He would not have accepted the offering','The spouse who is theologically clearer than the one who is supposed to be leading','scholarship'],
  ['samson','JDG',13,1,25,'mentioned','N/A','his birth is the point of the whole scene','future deliverance of Israel','Samson does not appear as an actor yet but the Spirit begins to stir him','The prodigy everyone is talking about before they even show up','scholarship'],

  // jdg-samson-and-delilah (JDG 14:1-16:31)
  ['samson','JDG',14,1,31,'protagonist','impulsive-and-self-destructive','pursue women and fight Philistines on his own terms','personal gratification masquerading as divine mission','Samson tears a lion apart, eats honey from its carcass, and tells riddles at his wedding, mixing the sacred with the reckless','The gifted athlete who keeps making tabloid headlines instead of championships','scholarship'],
  ['delilah','JDG',14,1,31,'antagonist','calculating','discover the secret of Samson\'s strength for Philistine silver','money and political allegiance','Delilah nags Samson until he breaks, proving that persistence can be a weapon','The person who keeps asking the same question until you give up the information','scholarship'],

  // jdg-danite-migration (JDG 17:1-18:31)
  ['micah-of-ephraim','JDG',17,1,31,'protagonist','syncretistic','create his own shrine with a Levite priest','personal religion on his own terms','Micah hires a Levite as his personal priest and thinks God will bless him now, DIY religion','Setting up your own spiritual practice from a buffet of traditions and calling it authentic','scholarship'],

  // jdg-levites-concubine (JDG 19:1-21:25)
  ['levite-of-judges','JDG',19,1,25,'protagonist','cowardly-then-manipulative','save himself by handing over his concubine','his own survival at her expense','The Levite pushes his concubine out the door to the mob and in the morning tells her to get up, then dismembers her body to rally the tribes','The person who sacrifices someone else to save themselves then turns it into a cause','scholarship'],
  ['concubine-of-levite','JDG',19,1,25,'deuteragonist','terrified','survive the night','her life','She is gang-raped all night and found dead on the doorstep at dawn, the darkest verse in Judges','The voiceless victim whose suffering is used as a political tool by others','scholarship'],
  ['benjamin','JDG',19,1,25,'antagonist','depraved-then-defiant','protect the rapists of Gibeah','tribal loyalty over justice','The tribe of Benjamin defends the guilty and nearly gets wiped out in civil war','A department that covers for a bad actor and faces dissolution','scholarship'],
]);

console.log('Done JDG -', 24, 'rows');
db.close();
