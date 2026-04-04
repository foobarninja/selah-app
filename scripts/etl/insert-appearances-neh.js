const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // neh-nehemiahs-prayer (NEH 1:1-2:10)
  ['nehemiah','NEH',1,1,10,'protagonist','grief-then-calculated-action','get the king\'s permission to rebuild Jerusalem\'s walls','the security and dignity of the returned exiles','Nehemiah weeps, fasts, and prays for months. Then when the king asks why he looks sad, he has a fully prepared proposal ready. Grief plus strategy','The employee who prays about the problem for months, then walks into the meeting with a slide deck','scholarship'],

  // neh-inspecting-the-walls (NEH 2:11-20)
  ['nehemiah','NEH',2,11,20,'protagonist','strategic-stealth','inspect the walls at night before announcing his plan','assessing the real situation before going public','Nehemiah rides around the ruins at night on a donkey. He does not tell anyone what God has put in his heart until he has seen it himself','The new leader who walks the factory floor at midnight before the first town hall','scholarship'],
  ['sanballat','NEH',2,11,20,'antagonist','mocking-contempt','undermine the rebuilding effort','maintaining power and influence in the region','Sanballat laughs: what are these feeble Jews doing? Will they revive the stones from the burned rubble? Mockery as first weapon','The competitor who posts snarky comments about your launch before you even ship','scholarship'],
  ['tobiah','NEH',2,11,20,'antagonist','dismissive','join Sanballat in opposing the rebuilding','political self-interest','Tobiah adds: if a fox climbs on it the wall will collapse. Maximum condescension','The board member who says this will never work before the pilot even starts','scholarship'],

  // neh-building-under-threat (NEH 4:1-23)
  ['nehemiah','NEH',4,1,23,'protagonist','vigilant-resolve','build the wall while armed against attack','physical safety and project completion','Half the men work, half stand guard. Everyone carries a weapon. Trowel in one hand, sword in the other','Working on a launch while fielding legal threats, doing both at the same time','scholarship'],
  ['sanballat','NEH',4,1,23,'antagonist','escalating-fury','stop the wall by force if mockery fails','preventing Jerusalem from becoming a fortified city again','Sanballat moves from mockery to conspiracy to armed threat. Each failure makes him angrier','The competitor who goes from tweets to lawsuits to sabotage as your project succeeds','scholarship'],

  // neh-economic-justice (NEH 5:1-19)
  ['nehemiah','NEH',5,1,19,'protagonist','righteous-anger','confront wealthy Jews who are exploiting the poor','internal justice while fighting external enemies','Nehemiah is furious that nobles are charging interest and seizing land from poor Jews during the rebuilding. He calls a public assembly and shames them','The leader who pauses the product launch to address the fact that the team is being mistreated by management','scholarship'],

  // neh-wall-completed (NEH 6:1-7:4)
  ['nehemiah','NEH',6,1,4,'protagonist','discerning-resolve','finish the wall despite plots and traps','completing the mission','Sanballat invites Nehemiah to a meeting four times. Each time: I am doing a great work and I cannot come down. Focus as self-defense','Declining every coffee meeting and networking event until the product ships','scholarship'],
  ['sanballat','NEH',6,1,4,'antagonist','desperate-scheming','lure Nehemiah into a trap disguised as a peace meeting','stopping the wall by any means','When mockery, force, and political pressure fail, Sanballat tries friendship. The most dangerous weapon is the fake olive branch','The rival who suddenly wants to partner right when you are about to win','scholarship'],

  // neh-reading-the-law (NEH 8:1-18)
  ['ezra','NEH',8,1,18,'protagonist','joyful-authority','read the Law aloud to all the people at the Water Gate','spiritual renewal for the entire community','Ezra stands on a wooden platform and reads from dawn to midday. The people weep when they hear the Law. Nehemiah says stop crying, the joy of the LORD is your strength','The all-hands meeting where the mission statement is read aloud and everyone realizes how far they have drifted','scholarship'],
  ['nehemiah','NEH',8,1,18,'deuteragonist','pastoral-encouragement','tell the people not to grieve but to celebrate','turning conviction into joy','Nehemiah redirects the weeping: go eat rich food and share with those who have nothing. Grief must become generosity','The leader who says yes we have work to do, but first we celebrate how far we have come','scholarship'],
]);

console.log('Done NEH -', 12, 'rows');
db.close();
