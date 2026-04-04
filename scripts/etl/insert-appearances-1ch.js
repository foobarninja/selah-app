const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // 1ch-genealogies (1CH 1:1-9:44)
  ['adam','1CH',1,1,44,'mentioned','N/A','he anchors the genealogy from creation to exile','the identity of the returned exiles','Nine chapters of names. The Chronicler tells a broken people: you are connected to Adam, to Abraham, to David. You belong','Tracing your ancestry on a genealogy website and finding you are connected to something bigger','scholarship'],
  ['david','1CH',1,1,44,'mentioned','N/A','his line is the genealogical climax','the messianic lineage','Every name flows toward David. The genealogies are not boring; they are theological architecture','The org chart that reveals who the company was actually built to serve','scholarship'],

  // 1ch-death-of-saul-chronicles (1CH 10:1-14)
  ['saul','1CH',10,1,14,'protagonist','doomed','die in battle against the Philistines','his dynasty and Israel\'s future','The Chronicler adds a theological verdict Samuel never gave: Saul died because of his unfaithfulness. Two sentences of judgment','The post-mortem review that says in one line what everyone knew but nobody documented','scholarship'],
  ['david','1CH',10,1,14,'mentioned','N/A','Saul\'s death opens the way for David','the transition of power','The chapter ends: the LORD turned the kingdom over to David. Not politics but providence','The board announcement that frames the leadership change as inevitable all along','scholarship'],

  // 1ch-david-brings-the-ark (1CH 13:1-16:43)
  ['david','1CH',13,1,43,'protagonist','reverent-joy','bring the Ark to Jerusalem with proper worship','theological legitimacy for the capital','The Chronicler adds a massive worship service that Samuel does not record: Asaph, Heman, Jeduthun, choirs, trumpets. David the worship leader','Planning the grand opening celebration with live music and a keynote that makes people cry','scholarship'],
  ['uzzah','1CH',13,1,43,'witness','reflexive-then-dead','steady the Ark on the cart','the holiness of God\'s presence','Uzzah dies and David is afraid. The second attempt uses Levites carrying the Ark on poles, as prescribed. Process matters','The team that learns from the first failed deployment and follows the documentation the second time','scholarship'],

  // 1ch-davidic-covenant-chronicles (1CH 17:1-27)
  ['david','1CH',17,1,27,'protagonist','humbled-worship','receive God\'s covenant promise of an eternal dynasty','the messianic hope','David sits before the LORD and says Who am I that you have brought me this far? Pure gratitude in response to undeserved promise','Getting the contract of a lifetime and your first response is I do not deserve this','scholarship'],
  ['nathan-prophet','1CH',17,1,27,'deuteragonist','prophetic-correction','deliver the covenant word to David','God\'s plan versus David\'s plan','Nathan tells David: you will not build the house, God will build yours. The Chronicler frames this as the theological center of history','The advisor who redirects the founder\'s vision into something infinitely bigger','scholarship'],

  // 1ch-davids-census-chronicles (1CH 21:1-22:1)
  ['david','1CH',21,1,1,'protagonist','prideful-then-repentant','number the fighting men','military pride versus divine dependence','The Chronicler says Satan incited David. Samuel says God. The Chronicler adds theological nuance to the same event','Realizing that the impulse you thought was your own idea was actually a trap','scholarship'],
  ['araunah','1CH',21,1,1,'deuteragonist','generous','offer his threshing floor for the altar','becoming the site of the future temple','David pays full price: 600 shekels of gold in Chronicles versus 50 of silver in Samuel. The Chronicler inflates the price to match the significance','The real estate deal where everyone knows the lot is worth more than the appraisal says','scholarship'],
  ['joab','1CH',21,1,1,'witness','disgusted-obedience','carry out the census he finds abhorrent','loyalty to the king despite moral objection','Joab does not even finish the count because it is so repulsive to him. He skips Levi and Benjamin','The CFO who refuses to complete the audit because they know the numbers are being used for the wrong purpose','scholarship'],
]);

console.log('Done 1CH -', 12, 'rows');
db.close();
