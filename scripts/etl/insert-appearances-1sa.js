const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // 1sa-hannahs-prayer (1SA 1:1-2:11)
  ['hannah','1SA',1,1,11,'protagonist','anguished-then-exultant','beg God for a son and dedicate him to the LORD','her identity as a barren woman in a culture that defines women by children','Hannah prays so intensely that Eli thinks she is drunk, then sings a revolutionary song about God reversing fortunes','The person whose prayer life looks crazy to onlookers but moves heaven','scholarship'],
  ['elkanah','1SA',1,1,11,'deuteragonist','loving-but-clueless','comfort Hannah','marital harmony','Elkanah asks Am I not better than ten sons, a loving husband who does not understand what she actually needs','The partner who tries to fix the problem instead of just being present','scholarship'],
  ['peninnah','1SA',1,1,11,'antagonist','provocative','taunt Hannah for her barrenness','social dominance in the household','Peninnah pokes at the wound year after year at the annual sacrifice, weaponizing fertility','The coworker who always mentions their achievements right next to your struggle','scholarship'],
  ['eli','1SA',1,1,11,'witness','misjudging-then-blessing','discern what Hannah is doing','priestly duty','Eli initially accuses Hannah of being drunk, then blesses her when he understands. Even priests misread people','The authority figure who jumps to the wrong conclusion but corrects course','scholarship'],

  // 1sa-samuels-call (1SA 3:1-21)
  ['samuel','1SA',3,1,21,'protagonist','innocent-then-burdened','respond to God\'s voice in the night','becoming the prophet of a new era','Samuel hears his name three times and thinks it is Eli. When he finally says Speak LORD, the message is devastating','Being new at a job and getting handed the hardest conversation on your first week','scholarship'],
  ['eli','1SA',3,1,21,'deuteragonist','resigned-acceptance','help Samuel recognize God\'s voice','his legacy and his sons\' fate','Eli realizes God is calling the boy and tells him what to say, knowing the message will condemn his own house','The mentor who trains their replacement knowing the replacement will deliver news about their failure','scholarship'],

  // 1sa-ark-captured (1SA 4:1-7:2)
  ['eli','1SA',4,1,2,'deuteragonist','dread-then-death','wait for news of the battle and the Ark','his sons and the Ark of God','Eli falls backward off his chair and breaks his neck when he hears the Ark is captured. His body cannot hold the weight of the news','The leader whose health fails when the organization collapses on their watch','scholarship'],
  ['phinehas-son-of-eli','1SA',4,1,2,'antagonist','presumptuous','carry the Ark into battle as a magic talisman','victory by manipulation of sacred objects','The sons of Eli treat the Ark like a lucky charm and die in the same battle','Using the company brand to cover for a terrible product','scholarship'],
  ['samuel','1SA',4,1,2,'witness','grieving','he will eventually restore order after this catastrophe','Israel\'s spiritual survival','Samuel is in the background during the Ark narrative but emerges as the leader who rebuilds','The person in the wings who has to rebuild after the public failure of current leadership','scholarship'],

  // 1sa-israel-demands-a-king (1SA 8:1-22)
  ['samuel','1SA',8,1,22,'protagonist','hurt-and-obedient','warn Israel about the cost of monarchy','the shape of Israel\'s government','Samuel takes it personally when they ask for a king, but God says they are rejecting Me not you','The founder being told the company needs professional management and it stings','scholarship'],
  ['elders-of-israel','1SA',8,1,22,'deuteragonist','impatient','get a king like all the other nations','national security and identity','The elders want to be normal, to have a king who will fight their battles, but normal costs freedom','The team that wants to copy the competitor instead of staying unique','scholarship'],

  // 1sa-saul-anointed (1SA 9:1-10:27)
  ['saul','1SA',9,1,27,'protagonist','humble-bewilderment','find his father\'s lost donkeys','initially trivial, then cosmic','Saul is looking for donkeys and finds a kingdom. He hides among the baggage at his own coronation','Getting promoted when you were just trying to solve a small problem and suddenly you are in charge','scholarship'],
  ['samuel','1SA',9,1,27,'deuteragonist','prophetic-authority','anoint Saul as God commanded','installing the king Israel demanded','Samuel pours oil on Saul\'s head privately, then presents him publicly. The private anointing precedes the public role','The board chair who taps you for CEO before anyone else knows','scholarship'],

  // 1sa-sauls-first-failure (1SA 13:1-15:35)
  ['saul','1SA',13,1,35,'protagonist','anxious-then-defiant','offer the sacrifice himself because Samuel is late, then spare Agag','his throne and dynasty','Saul cannot wait and offers the sacrifice, then spares the enemy king and best livestock. Partial obedience is disobedience','The manager who bends the rules under pressure and then rationalizes it as a good call','scholarship'],
  ['samuel','1SA',13,1,35,'deuteragonist','grief-stricken','confront Saul and pronounce judgment','the integrity of prophetic authority','Samuel tells Saul the kingdom is torn from him, then hacks Agag to pieces. The prophet does what the king would not','The mentor who has to tell you it is over and clean up your mess','scholarship'],

  // 1sa-david-anointed (1SA 16:1-13)
  ['david','1SA',16,1,13,'protagonist','anointed-in-obscurity','tend sheep until God calls him','the future of Israel\'s monarchy','The youngest son, not even invited to the lineup, gets pulled from the sheep and anointed. God does not see as humans see','The intern nobody thought to invite to the interview who gets the job','scholarship'],
  ['samuel','1SA',16,1,13,'deuteragonist','obedient-but-nervous','anoint the next king while Saul still reigns','God\'s choice over human expectations','Samuel looks at the tall brothers and God keeps saying no. He almost repeats the Saul mistake of choosing by appearance','The recruiter who has to ignore the resume and trust the gut feeling','scholarship'],
  ['jesse','1SA',16,1,13,'witness','surprised','present his sons to Samuel','his family\'s future','Jesse does not even bother to bring David in from the fields until Samuel asks if there is another son','The parent who underestimates their youngest child','scholarship'],

  // 1sa-david-and-goliath (1SA 17:1-58)
  ['david','1SA',17,1,58,'protagonist','righteous-indignation','fight Goliath in the name of the LORD','Israel\'s honor and the proof that God fights','David rejects the armor, picks five stones, and runs toward the giant. Everyone else was calculating odds; David was calculating God','The new hire who solves the problem everyone else was too experienced to attempt','scholarship'],
  ['goliath','1SA',17,1,58,'antagonist','contemptuous','humiliate Israel and their God','Philistine dominance','Goliath mocks David when he sees a boy with a sling, not realizing the boy does not fight alone','The bully who underestimates someone because they do not look the part','scholarship'],
  ['saul','1SA',17,1,58,'witness','paralyzed-fear','someone needs to fight Goliath but he will not do it himself','his reputation as warrior-king','Saul is the tallest man in Israel and he cowers in his tent for forty days. The irony is thick','The leader who has the title and the resources but cannot act','scholarship'],

  // 1sa-david-and-jonathan (1SA 18:1-20:42)
  ['jonathan','1SA',18,1,42,'protagonist','selfless-love','protect David even at the cost of his own throne','his friendship and his father\'s dynasty','Jonathan strips off his own royal robe and gives it to David, literally giving away his succession','Voting for your friend\'s promotion when it means you will never get the role','scholarship'],
  ['david','1SA',18,1,42,'deuteragonist','fearful-loyalty','survive Saul\'s attempts to kill him while honoring Jonathan','his life and his integrity','David weeps with Jonathan knowing they may never see each other again, a friendship that cost everything','The bond between two people on opposite sides of a corporate split who refuse to betray each other','scholarship'],
  ['saul','1SA',18,1,42,'antagonist','jealous-rage','kill David before he takes the throne','his dynasty','Saul throws a spear at David twice while he plays the harp. The music that soothed him now reminds him of what he is losing','The boss who turns on their star employee because the crowd loves them more','scholarship'],

  // 1sa-david-spares-saul (1SA 24:1-26:25)
  ['david','1SA',24,1,25,'protagonist','restrained-mercy','refuse to kill Saul even when given the chance','his integrity and trust in God\'s timing','David cuts Saul\'s robe in a cave and is immediately convicted. Power without permission is still theft','Having access to destroy your enemy\'s career and choosing not to use it','scholarship'],
  ['saul','1SA',24,1,25,'antagonist','hunting-then-shamed','kill David','his throne','Saul weeps when he realizes David spared him, but the repentance is shallow. He will hunt David again','The competitor who tears up at your generosity but goes right back to undermining you','scholarship'],
  ['abishai','1SA',24,1,25,'witness','eager-to-kill','urge David to finish Saul','loyalty to David','Abishai whispers God has delivered your enemy into your hand, let me pin him with one thrust','The loyal friend who says just do it, not understanding that restraint is the point','scholarship'],

  // 1sa-david-and-abigail (1SA 25:1-44)
  ['abigail','1SA',25,1,44,'protagonist','urgent-wisdom','prevent David from committing mass murder over a petty insult','saving lives and David\'s conscience','Abigail loads donkeys with food and intercepts an armed and furious David. She talks him down with theology and tact','The mediator who walks into a heated negotiation and de-escalates it with facts and empathy','scholarship'],
  ['david','1SA',25,1,44,'deuteragonist','enraged-then-grateful','punish Nabal for refusing hospitality','his honor and his men\'s survival','David swears to kill every male in Nabal\'s household by morning, then thanks Abigail for stopping him','The leader who almost makes a catastrophic decision out of anger and is saved by good counsel','scholarship'],

  // 1sa-saul-and-the-medium (1SA 28:1-25)
  ['saul','1SA',28,1,25,'protagonist','desperate-terror','consult the dead Samuel through a medium','knowing his fate before the final battle','Saul, who banned mediums, disguises himself to visit one. When Samuel\'s ghost says tomorrow you die, Saul collapses','Googling your symptoms at 2am when you already know the diagnosis is bad','scholarship'],
  ['samuel','1SA',28,1,25,'mentioned','annoyed-from-beyond','deliver God\'s final verdict to Saul','confirming what Saul already knows','Samuel is irritated at being disturbed: why do you ask me since the LORD has turned from you','The retired advisor who takes the call and says I already told you this','scholarship'],

  // 1sa-death-of-saul (1SA 31:1-13)
  ['saul','1SA',31,1,13,'protagonist','hopeless-resolve','die rather than be captured by the Philistines','his dignity in death','Saul falls on his own sword after his sons die in battle. The man who started hiding in baggage ends by falling on steel','The leader whose career ends exactly as badly as everyone warned it would','scholarship'],
  ['jonathan','1SA',31,1,13,'deuteragonist','doomed-loyalty','fight alongside his father despite knowing the outcome','family honor','Jonathan dies on Mount Gilboa with his father, loyal to the end even to a doomed cause','The person who stays on a sinking ship out of love, not delusion','scholarship'],
  ['philistine-army','1SA',31,1,13,'antagonist','triumphant','defeat Israel and desecrate Saul\'s body','military supremacy','The Philistines hang Saul\'s body on the wall of Beth-shan, a final humiliation','The competitor who not only wins but makes a public spectacle of your failure','scholarship'],
]);

console.log('Done 1SA -', 33, 'rows');
db.close();
