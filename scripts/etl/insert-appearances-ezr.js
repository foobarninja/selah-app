const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ezr-cyrus-decree (EZR 1:1-11)
  ['cyrus','EZR',1,1,11,'protagonist','divinely-stirred','issue the decree allowing Jews to return and rebuild the temple','the restoration of Israel','The LORD stirred up the spirit of Cyrus king of Persia. A pagan emperor writes the check for rebuilding God\'s house','The secular foundation that funds the community project nobody expected them to support','scholarship'],
  ['zerubbabel','EZR',1,1,11,'deuteragonist','hopeful-duty','lead the first wave of returnees back to Jerusalem','beginning the restoration','Zerubbabel carries the temple vessels back. He is the Davidic heir in exile, now carrying bowls and cups home','The heir who returns to the family property carrying the original furniture','scholarship'],

  // ezr-temple-rebuilt (EZR 3:1-6:22)
  ['zerubbabel','EZR',3,1,22,'protagonist','determined-perseverance','rebuild the temple despite opposition and discouragement','restoring worship and national identity','The foundation is laid and the old men weep because it is so small compared to Solomon\'s temple while the young shout for joy. You cannot tell the weeping from the shouting','A company relaunch where the veterans mourn what was lost and the newcomers celebrate what is coming','scholarship'],
  ['joshua','EZR',3,1,22,'deuteragonist','priestly-faithfulness','restore the altar and the sacrificial system before the walls are even up','continuity of worship','Joshua the high priest rebuilds the altar first. Worship before walls. Priorities','The chaplain who holds services in the parking lot while the building is under construction','scholarship'],

  // ezr-ezra-arrives (EZR 7:1-10)
  ['ezra','EZR',7,1,10,'protagonist','devoted-scholarship','bring the Torah back to the center of community life','the spiritual reformation of the returned exiles','Ezra set his heart to study the Law, to do it, and to teach it. Study, practice, then teach. The order matters','The professor who lives what they teach and teaches only what they live','scholarship'],

  // ezr-mixed-marriages-crisis (EZR 9:1-10:44)
  ['ezra','EZR',9,1,44,'protagonist','horrified-grief','confront the community over intermarriage with surrounding peoples','covenant purity and national survival','Ezra tears his garment, pulls out his hair, and sits appalled until the evening sacrifice. His grief is so theatrical it becomes a public sermon','The leader whose visible devastation over a problem shames everyone else into action','scholarship'],
  ['people-of-israel','EZR',9,1,44,'deuteragonist','convicted-weeping','repent and put away foreign wives','obedience to the covenant at devastating personal cost','The men weep in the rain while confessing. The text lists names of those who had married foreign women. Public accountability','The company-wide meeting where specific names are read and people must publicly commit to change','scholarship'],
]);

console.log('Done EZR -', 7, 'rows');
db.close();
