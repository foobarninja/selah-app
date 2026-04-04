const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // jos-commissioning-of-joshua (JOS 1:1-18)
  ['joshua','JOS',1,1,18,'protagonist','resolute-yet-anxious','obey God and lead Israel into the Promised Land','survival of the nation and fulfillment of the covenant','Joshua receives the mantle after Moses dies, a massive leadership transition with no room for hesitation','Starting a new role after your mentor leaves the company','scholarship'],
  ['moses','JOS',1,1,18,'mentioned','N/A','his legacy frames Joshua\'s charge','the weight of succession','Moses is dead but his shadow defines every command God gives Joshua','The legendary founder whose standards you now have to meet','scholarship'],

  // jos-rahab-and-the-spies (JOS 2:1-24)
  ['rahab','JOS',2,1,24,'protagonist','fearful-yet-decisive','protect her family by siding with Israel','life or death for her entire household','A Canaanite prostitute risks everything on a foreign God, the ultimate outsider bet','Whistleblower who switches sides because she sees where the truth is','scholarship'],
  ['joshua','JOS',2,1,24,'deuteragonist','strategic','gather intelligence before the invasion','military success of the crossing','Joshua sends spies secretly, he learned from the disastrous spy mission under Moses','A CEO commissioning market research before a major launch','scholarship'],

  // jos-crossing-the-jordan (JOS 3:1-4:24)
  ['joshua','JOS',3,1,24,'protagonist','faith-filled-authority','lead Israel across the Jordan on dry ground','national identity and divine confirmation of his leadership','Joshua commands the priests to step into the flooded river first, leadership means going in before you see the miracle','Leading your team into an uncertain pivot when the board is watching','scholarship'],
  ['eleazar-son-of-aaron','JOS',3,1,24,'deuteragonist','reverent','carry the Ark as instructed','the presence of God going before the people','The priests touch the water and it stops, they are the hinge of the miracle','The person who actually has to press the button everyone else is watching','scholarship'],

  // jos-fall-of-jericho (JOS 5:13-6:27)
  ['joshua','JOS',6,1,27,'protagonist','awe-then-obedience','take Jericho by following God\'s bizarre battle plan','first military victory sets the tone for the conquest','Marching silently around walls for a week sounds insane until the walls fall','Following a counterintuitive strategy from leadership that actually pays off','scholarship'],
  ['rahab','JOS',6,1,27,'deuteragonist','anxious-hope','survive the destruction by trusting the spies\' promise','her family lives or dies by a scarlet cord','Rahab hangs the cord and waits, faith is not passive it is positioned','Waiting for the job offer you were promised while the company restructures around you','scholarship'],

  // jos-achans-sin (JOS 7:1-26)
  ['achan','JOS',7,1,26,'antagonist','greedy-then-terrified','take forbidden plunder from Jericho','the holiness of the community and the success of the campaign','One man hides a robe and gold under his tent and thirty-six soldiers die at Ai','An employee who cuts corners on compliance and tanks the whole department','scholarship'],
  ['joshua','JOS',7,1,26,'deuteragonist','devastated-then-resolute','find out why God withdrew his favor','restoring the covenant relationship','Joshua tears his clothes and falls on his face, leadership means owning failures you did not personally commit','A manager who has to fire someone they trusted after discovering fraud','scholarship'],

  // jos-gibeonite-deception (JOS 9:1-27)
  ['joshua','JOS',9,1,27,'protagonist','deceived-then-honor-bound','make alliances wisely','Israel\'s integrity and treaty obligations','Joshua fails to inquire of the LORD and gets tricked by moldy bread and worn sandals','Signing a contract without doing due diligence and having to honor it anyway','scholarship'],

  // jos-sun-stands-still (JOS 10:1-15)
  ['joshua','JOS',10,1,15,'protagonist','bold-faith','defend the Gibeonites and defeat the Amorite coalition','keeping his treaty word and expanding the conquest','Joshua asks God to stop the sun, the most audacious prayer in the OT','Asking your boss for something no one has ever asked for and getting it','scholarship'],

  // jos-division-of-land (JOS 13:1-21:45)
  ['joshua','JOS',13,1,45,'protagonist','weary-but-faithful','distribute the land fairly among the tribes','every family gets their inheritance','Joshua is old and there is still much land to take, leadership includes unfinished business','A retiring executive who has to write the succession plan knowing the job is not done','scholarship'],
  ['caleb','JOS',13,1,45,'deuteragonist','vigorous-and-expectant','claim Hebron as promised forty-five years earlier','personal promise fulfillment','Caleb at 85 says give me this mountain, delayed gratification on a generational scale','The colleague who has been waiting for their shot and finally gets it','scholarship'],

  // jos-cities-of-refuge (JOS 20:1-9)
  ['joshua','JOS',20,1,9,'protagonist','just','establish cities where accidental killers can flee','justice and mercy in the new society','Six cities set apart so that the blood avenger cannot kill before a trial','Building a legal system that distinguishes between intent and accident','scholarship'],

  // jos-eastern-tribes-altar (JOS 22:1-34)
  ['joshua','JOS',22,1,34,'protagonist','grateful-then-alarmed','send the eastern tribes home with blessing','national unity and theological fidelity','The eastern tribes build an altar and everyone thinks it is apostasy until it turns out to be a memorial','A remote team creates their own process and HQ panics until they explain it is for alignment not rebellion','scholarship'],
  ['phinehas','JOS',22,1,34,'deuteragonist','zealous-but-open','investigate the altar before attacking','preventing civil war','Phinehas leads the delegation and actually listens, zeal tempered by dialogue','The compliance officer who investigates before issuing a violation','scholarship'],

  // jos-joshuas-farewell (JOS 23:1-16)
  ['joshua','JOS',23,1,16,'protagonist','solemn-urgency','warn Israel to stay faithful after he dies','the long-term covenant faithfulness of the nation','An old man who has seen everything begs the next generation not to blow it','A retiring founder giving the all-hands speech about not losing the culture','scholarship'],

  // jos-covenant-at-shechem (JOS 24:1-33)
  ['joshua','JOS',24,1,33,'protagonist','resolute','lead Israel in a covenant renewal','the nation chooses or rejects YHWH','As for me and my house we will serve the LORD, Joshua draws the line','A family meeting where everyone has to say out loud what they actually believe','scholarship'],
]);

console.log('Done JOS -', 21, 'rows');
db.close();
