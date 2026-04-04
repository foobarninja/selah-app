const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // rut-naomi-and-ruth (RUT 1:1-22)
  ['naomi','RUT',1,1,22,'protagonist','bitter-grief','return to Bethlehem after losing everything in Moab','survival and identity as a widow with nothing','Naomi tells the women to call her Mara because the Almighty has dealt bitterly with her, raw theological honesty','Coming home after a devastating loss and telling everyone you are not okay','scholarship'],
  ['ruth','RUT',1,1,22,'deuteragonist','fierce-loyalty','stay with Naomi despite having no obligation','her entire future as a foreign widow','Where you go I will go, your people will be my people, your God will be my God. Ruth chooses belonging over safety','Choosing to stay with a struggling family member when everyone else says walk away','scholarship'],

  // rut-gleaning-in-boazs-field (RUT 2:1-23)
  ['ruth','RUT',2,1,23,'protagonist','humble-determination','glean enough grain to feed herself and Naomi','daily survival','Ruth asks permission to glean behind the harvesters, the ancient welfare system, and works from morning to evening','Taking the entry-level job without complaint because you have people depending on you','scholarship'],
  ['boaz','RUT',2,1,23,'deuteragonist','generous-and-protective','show kindness to Ruth beyond what the law requires','integrity and compassion in daily business','Boaz tells his workers to leave extra grain for her and to not harass her, quietly rigging the system in her favor','The boss who adjusts schedules and assignments to help a struggling employee without making it obvious','scholarship'],
  ['naomi','RUT',2,1,23,'witness','hope-rekindled','recognize God might be working through Boaz','the possibility of redemption','Naomi hears Boaz\'s name and her eyes light up: he is a kinsman-redeemer, the first spark of hope in the whole book','When your friend tells you about someone they met and you realize this could actually work out','scholarship'],

  // rut-the-threshing-floor (RUT 3:1-18)
  ['ruth','RUT',3,1,18,'protagonist','bold-vulnerability','propose to Boaz by uncovering his feet at the threshing floor','marriage, redemption, and the family line','Ruth goes to the threshing floor at midnight, dressed up, and lies at his feet. Maximum vulnerability in a patriarchal world','Making the first move in a relationship when everything is on the line','scholarship'],
  ['boaz','RUT',3,1,18,'deuteragonist','honorable-desire','do the right thing even though a closer kinsman exists','legal and moral integrity','Boaz wants to marry her but insists on following the legal process first, desire constrained by principle','The person who wants to say yes immediately but says let me do this properly','scholarship'],
  ['naomi','RUT',3,1,18,'witness','strategic-hope','coach Ruth through the proposal','securing a future for both of them','Naomi plans the whole thing: wash, perfume, dress, go to the floor, do what he tells you. Ancient matchmaking at its finest','Your grandmother scheming to set you up with someone she has already vetted','scholarship'],

  // rut-boaz-redeems-ruth (RUT 4:1-22)
  ['boaz','RUT',4,1,22,'protagonist','resolute-joy','redeem Ruth and Naomi\'s land at the city gate','the family name and the lineage to David','Boaz outmaneuvers the closer kinsman by mentioning Ruth along with the land, and the man backs out. Legal chess','Closing the deal by knowing the fine print better than the competition','scholarship'],
  ['ruth','RUT',4,1,22,'deuteragonist','fulfilled','marry Boaz and bear a son in the line of David','her place in Israel and in history','A Moabite widow becomes the great-grandmother of King David, the ultimate immigrant success story','The outsider who becomes essential to the family legacy','scholarship'],
  ['naomi','RUT',4,1,22,'witness','restored-joy','hold her grandson Obed','redemption from emptiness','The women say Naomi has a son, and she nurses the baby. She who was Mara is blessed again','The grandparent who thought the family line was over holding the next generation','scholarship'],
]);

console.log('Done RUT -', 11, 'rows');
db.close();
