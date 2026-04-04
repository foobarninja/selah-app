const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // 2ch-solomons-wisdom-chronicles (2CH 1:1-17)
  ['solomon','2CH',1,1,17,'protagonist','humble-wisdom','ask God for wisdom at Gibeon','the character of his reign','The Chronicler emphasizes Solomon\'s request: give me wisdom and knowledge to lead this people. No wealth, no enemies crushed, just competence','Asking for training instead of a raise at your first performance review','scholarship'],

  // 2ch-temple-dedication (2CH 5:1-7:22)
  ['solomon','2CH',5,1,22,'protagonist','worshipful-awe','dedicate the temple with prayer and sacrifice','God\'s presence dwelling among Israel','The glory of the LORD fills the temple so densely the priests cannot stand. Solomon prays the longest prayer in the OT: if my people who are called by my name humble themselves and pray','The opening ceremony where something happens that was not on the agenda and everyone knows God showed up','scholarship'],

  // 2ch-visit-of-queen-of-sheba (2CH 9:1-12)
  ['solomon','2CH',9,1,12,'protagonist','peak-glory','host the queen and display God\'s blessing','international validation of Israelite wisdom','The queen is breathless: happy are your servants who continually stand before you. Solomon at his zenith before the fall','The company profile piece that runs right before everything goes wrong','scholarship'],
  ['queen-of-sheba','2CH',9,1,12,'deuteragonist','astonished','verify Solomon\'s wisdom with her own eyes','intellectual and commercial partnership','She tests him with hard questions and he answers them all. She gives 120 talents of gold. The Chronicler wants you to know how magnificent this was','The investor who arrives skeptical, leaves convinced, and writes the biggest check of the round','scholarship'],

  // 2ch-rehoboams-folly (2CH 10:1-11:4)
  ['rehoboam','2CH',10,1,4,'protagonist','arrogant-stupidity','reject the northern tribes\' reasonable request','the unity of Israel','My father chastised you with whips; I will chastise you with scorpions. One sentence splits a kingdom in two','The new manager who doubles down on the unpopular policy and loses half the team','scholarship'],
  ['jeroboam','2CH',10,1,4,'deuteragonist','calculating-patience','lead the northern secession','his own kingdom','Jeroboam lets Rehoboam destroy himself. Sometimes the best strategy is waiting','The competitor who wins by doing nothing while the incumbent self-destructs','scholarship'],
  ['shemaiah-prophet','2CH',10,1,4,'witness','prophetic-restraint','prevent civil war with a word from God','national sanity','This is from the LORD. Do not fight. And remarkably they listen. One of the few times a prophet stops a war','The mediator whose single sentence in the meeting prevents a catastrophic escalation','scholarship'],

  // 2ch-jehoshaphats-prayer (2CH 20:1-30)
  ['jehoshaphat','2CH',20,1,30,'protagonist','terrified-then-trusting','pray when three armies march against Judah','national survival','We do not know what to do, but our eyes are on you. Then he sends the choir ahead of the army. Worship as military strategy','Facing an impossible deadline and deciding to pray before you plan','scholarship'],

  // 2ch-josiahs-passover (2CH 34:1-35:27)
  ['josiah','2CH',34,1,27,'protagonist','righteous-grief-then-zeal','reform Judah and celebrate the greatest Passover since Samuel','delaying divine judgment','Josiah tears his clothes when the Law is read, then enacts comprehensive reform and throws the biggest Passover in 400 years','The leader who reads the forgotten mission statement and says we are going back to this right now','scholarship'],
  ['huldah','2CH',34,1,27,'deuteragonist','prophetic-authority','authenticate the Book and pronounce judgment delayed for Josiah','divine validation','Huldah confirms the Law is real, the judgment is real, but because Josiah\'s heart was tender, he will be spared the worst','The auditor who says the fines are coming but your predecessor will not be blamed because they reported it','scholarship'],
  ['hilkiah-priest','2CH',34,1,27,'witness','stunned-discovery','present the Book of the Law found during renovations','the catalyst for national reform','Hilkiah finds the scroll and the whole direction of the nation changes overnight. One document in a dusty corner','Finding the original contract in a file cabinet that changes everything about the current dispute','scholarship'],

  // 2ch-fall-and-cyrus-decree (2CH 36:1-23)
  ['zedekiah-last-king','2CH',36,1,23,'protagonist','stiff-necked-rebellion','rebel against Babylon despite prophetic warnings','the end of Judah','The Chronicler says he stiffened his neck and hardened his heart. He refused to humble himself before Jeremiah','The leader who ignores every warning, every metric, every advisor, until there is nothing left','scholarship'],
  ['nebuchadnezzar','2CH',36,1,23,'antagonist','imperial-instrument','destroy Jerusalem and carry Judah into exile','Babylonian expansion as divine judgment','Nebuchadnezzar burns the temple, breaks the walls, and takes everything. But the Chronicler frames him as God\'s tool, not God\'s rival','The market correction that destroys companies but is actually the economy self-correcting','scholarship'],
  ['cyrus','2CH',36,1,23,'deuteragonist','divinely-moved','issue the decree allowing the Jews to return and rebuild','the restoration of Israel','The LORD stirred up the spirit of Cyrus. The book that began with Adam ends with a pagan king fulfilling God\'s promise. Hope from the most unlikely source','The competitor who unexpectedly opens the door for your comeback','scholarship'],
]);

console.log('Done 2CH -', 16, 'rows');
db.close();
