const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // 2ki-elijahs-departure (2KI 2:1-18)
  ['elijah','2KI',2,1,18,'protagonist','serene-departure','ascend to heaven without dying','the prophetic succession','Elijah is taken up by a chariot of fire in a whirlwind. He tries three times to leave Elisha behind but Elisha refuses to go','The mentor who keeps saying you do not need me anymore while the mentee insists on one more lesson','scholarship'],
  ['elisha','2KI',2,1,18,'deuteragonist','desperate-loyalty','receive a double portion of Elijah\'s spirit','continuing the prophetic mission','Elisha asks for a double portion and is told if you see me taken, it is yours. He watches, picks up the mantle, and strikes the Jordan','Inheriting your mentor\'s role and immediately having to prove you belong','scholarship'],

  // 2ki-elisha-heals-naaman (2KI 5:1-27)
  ['naaman','2KI',5,1,27,'protagonist','proud-then-humbled','be healed of leprosy','his health, his career, his identity','Naaman expects a dramatic healing ritual and is told to wash in the muddy Jordan seven times. He almost misses his miracle because of pride','The executive who almost refuses the simple solution because it is not impressive enough','scholarship'],
  ['naamans-servant-girl','2KI',5,1,27,'witness','compassionate-faith','tell her mistress about the prophet in Israel','her master\'s healing','A kidnapped slave girl cares enough about her captor to point him toward healing. Grace from the margins','The intern who solves the problem the senior team has been stuck on','scholarship'],
  ['elisha','2KI',5,1,27,'deuteragonist','unimpressed','heal Naaman and refuse payment','demonstrating that God\'s gifts are not for sale','Elisha does not even come to the door. He sends a messenger. The prophet is not performing for generals','The doctor who prescribes the boring effective treatment instead of the flashy expensive one','scholarship'],
  ['gehazi','2KI',5,1,27,'antagonist','greedy','chase Naaman and take payment Elisha refused','personal enrichment from someone else\'s miracle','Gehazi runs after Naaman, lies to get silver and clothing, and inherits Naaman\'s leprosy. You wanted his stuff, now you have his disease','The employee who monetizes their boss\'s reputation and gets caught','scholarship'],

  // 2ki-elisha-and-the-siege (2KI 6:8-7:20)
  ['elisha','2KI',6,8,20,'protagonist','calm-authority','reveal the invisible army and feed the besieged city','the survival of Samaria','Elisha prays and his servant sees the hills full of horses and chariots of fire. Do not fear, those who are with us are more','The leader who stays calm during a crisis because they see something nobody else can see','scholarship'],

  // 2ki-jehus-revolution (2KI 9:1-10:36)
  ['jehu','2KI',9,1,36,'protagonist','zealous-violence','purge the house of Ahab and the Baal worshipers','fulfilling prophetic judgment','Jehu drives his chariot furiously, kills Joram, has Jezebel thrown from a window, and stacks seventy heads at the gate. Excessive zeal','The reformer who goes so far that the reform becomes its own kind of tyranny','scholarship'],
  ['jezebel','2KI',9,1,36,'antagonist','defiant-to-the-end','face Jehu with dignity','her reputation','Jezebel paints her eyes and adorns her hair before Jehu arrives, then mocks him from the window. She dies on her own terms','The executive who shows up impeccably dressed to their own termination meeting','scholarship'],

  // 2ki-joash-repairs-temple (2KI 12:1-21)
  ['joash','2KI',12,1,21,'protagonist','reforming-zeal','repair the neglected temple','restoring proper worship','The boy king hidden from Athaliah for six years grows up to restore the temple. But the priests drag their feet on the money','The young leader who inherits a broken institution and has to fight the old guard to fix it','scholarship'],

  // 2ki-fall-of-israel (2KI 17:1-41)
  ['people-of-israel','2KI',17,1,41,'protagonist','persistent-idolatry','worship other gods despite centuries of warnings','national survival','The narrator lists everything Israel did wrong in an exhaustive theological autopsy. They would not listen','The company post-mortem that reads like a list of every warning that was ignored','scholarship'],

  // 2ki-hezekiahs-crisis (2KI 18:1-19:37)
  ['hezekiah','2KI',18,1,37,'protagonist','terrified-then-trusting','defend Jerusalem against Sennacherib','the survival of Judah and the Davidic line','Hezekiah spreads the Assyrian letter before the LORD and prays. That night an angel kills 185,000 Assyrian soldiers','Taking the threatening email, printing it out, and praying over it instead of panicking','scholarship'],
  ['isaiah','2KI',18,1,37,'deuteragonist','prophetic-assurance','deliver God\'s response to Hezekiah','divine credibility in the face of imperial threat','Isaiah sends word: the virgin daughter of Zion laughs at Sennacherib. Theological trash talk backed by angelic firepower','The advisor who says do not worry about their press release, here is what is actually going to happen','scholarship'],
  ['sennacherib','2KI',18,1,37,'antagonist','arrogant-then-defeated','conquer Jerusalem and mock YHWH','Assyrian expansion','Sennacherib sends the Rabshakeh to trash-talk God in Hebrew within earshot of the walls. Psychological warfare meets divine intervention','The competitor who sends a public letter mocking your company and then goes bankrupt','scholarship'],

  // 2ki-hezekiahs-illness (2KI 20:1-21)
  ['hezekiah','2KI',20,1,21,'protagonist','desperate-then-grateful-then-foolish','beg God for more life, then show Babylonians everything','personal survival and then pride','Hezekiah weeps and God adds fifteen years. Then he shows Babylonian envoys all his treasure. The extra years create the future catastrophe','Getting a second chance and immediately making a choice that will haunt your grandchildren','scholarship'],
  ['isaiah','2KI',20,1,21,'deuteragonist','prophetic-warning','tell Hezekiah both the healing and the coming Babylonian exile','the long-term consequences of pride','Isaiah asks what did you show them? Everything, says Hezekiah. Isaiah says Babylon will take it all. Hezekiah shrugs: at least there will be peace in my time','The advisor who warns about long-term risk and is dismissed because the short-term looks fine','scholarship'],

  // 2ki-josiahs-reform (2KI 22:1-23:30)
  ['josiah','2KI',22,1,30,'protagonist','righteous-grief','reform Judah after the Book of the Law is found','delaying judgment and restoring the covenant','Josiah tears his clothes when he hears the Law read aloud. He realizes how far Judah has fallen. Then he enacts the most thorough reform in Israel\'s history','The new CEO who reads the compliance report and realizes the company has been operating illegally for years','scholarship'],
  ['hilkiah-priest','2KI',22,1,30,'deuteragonist','startled-discovery','present the found Book of the Law to the king','the legitimacy of the reform','Hilkiah finds the scroll during temple renovations. It had been lost, buried under layers of neglect','The archivist who finds the original company charter in a storage closet and it contradicts current policy','scholarship'],
  ['huldah','2KI',22,1,30,'witness','prophetic-authority','authenticate the Book and deliver God\'s verdict','divine validation of the reform','They consult Huldah the prophetess, not Jeremiah. She confirms the book is genuine and the judgment is real but delayed for Josiah','The independent auditor everyone trusts who confirms that yes, this is as bad as it looks','scholarship'],

  // 2ki-fall-of-jerusalem (2KI 24:1-25:30)
  ['zedekiah-last-king','2KI',24,1,30,'protagonist','rebellious-then-broken','rebel against Babylon despite Jeremiah\'s warnings','Judah\'s last chance at survival','Zedekiah watches his sons killed, then his eyes are put out. The last thing he sees is the end of his dynasty','The leader who bets the company on a gamble, loses, and watches the liquidation','scholarship'],
  ['nebuchadnezzar','2KI',24,1,30,'antagonist','imperial-efficiency','destroy Jerusalem and deport Judah','expanding the Babylonian empire','Nebuchadnezzar burns the temple, breaks down the walls, and carries everything to Babylon. The end of an era in one paragraph','The acquiring company that strips the assets and dissolves the original entity','scholarship'],
]);

console.log('Done 2KI -', 23, 'rows');
db.close();
