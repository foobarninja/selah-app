const db = require('better-sqlite3')('data/selah.db');

const ins = db.prepare('INSERT OR IGNORE INTO devotionals (id,title,book_id,chapter,verse_start,verse_end,context_brief,modern_moment,conversation_starters,going_deeper,audience,estimated_minutes,season,day_of_year,narrative_id,source_tier,source_notes,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
const tagIns = db.prepare('INSERT OR IGNORE INTO devotional_tag_map (devotional_id,tag_id,relevance) VALUES (?,?,?)');

const DEVS = [
  // ===== ACTS (16 devotionals) =====
  // 1. Pentecost - family
  ['act-devo-pentecost','When God Showed Up Like Fire','ACT',2,1,13,
   'Jesus had gone back to heaven. His followers were gathered in a room, scared and unsure what would happen next. Then the Holy Spirit arrived like a rushing wind and tongues of fire.',
   'You know that feeling when you walk into a room and the energy completely shifts? Maybe someone shows up who changes everything — a coach, a friend, a parent stepping in. The disciples were huddled and afraid. Then God did not whisper. He roared in like a windstorm and lit them on fire. These scared people became bold in minutes.',
   'When have you felt a sudden burst of courage you did not expect?|What would it look like if our family asked God to show up in a hard situation?|Have you ever been surprised by how brave someone became?',
   'Read Acts 2:14-41. Peter — the same guy who denied knowing Jesus three times — now stands up and preaches to thousands. What changed?',
   'family',5,null,121,'act-pentecost','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 2. Early church sharing - family
  ['act-devo-early-church','Nobody Had Too Much or Too Little','ACT',2,42,47,
   'The first Christians did something radical: they shared everything. They ate together daily, pooled resources, and made sure nobody went without.',
   'Imagine your neighborhood actually sharing everything — tools, food, money, time. Not because someone forced them, but because they wanted to. The early church was not a commune or a charity. It was a family that noticed when someone was hungry and did something about it.',
   'What is one thing our family could share with someone this week?|Why do you think sharing is harder than giving?|What would our neighborhood look like if everyone looked out for each other?',
   'Read Acts 4:32-37. Barnabas sold a field to help others. What would it cost you — really cost you — to help someone in need?',
   'family',5,null,122,'act-early-church-life','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 3. Ananias and Sapphira - teens
  ['act-devo-ananias','The Lie That Cost Everything','ACT',5,1,11,
   'Ananias and Sapphira sold property and pretended to give all the money to the church, but secretly kept some back. They lied about it — and both dropped dead.',
   'This is the scariest story in the New Testament. Nobody forced them to give everything. The sin was not keeping money — it was performing generosity while faking it. They wanted the reputation of radical giving without the cost. It is the ancient version of posting about charity while doing nothing.',
   'Have you ever pretended to be more generous or more good than you actually were?|Why is pretending to be something you are not more dangerous than just being honest about your flaws?|What is the difference between privacy and deception?',
   'This story disturbs people. It should. Read it alongside 1 John 1:8-9. God is not asking for perfection — he is asking for honesty.',
   'teens',5,null,123,'act-ananias-and-sapphira','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 4. Stephen martyred - adults
  ['act-devo-stephen','The Man Who Forgave While Dying','ACT',7,54,60,
   'Stephen was the first Christian killed for his faith. As stones rained down on him, he looked up and saw heaven open. His last words echoed Jesus: Lord, do not hold this sin against them.',
   'Stephen did not just believe the right things — he became like Jesus in the hardest possible moment. While being murdered, he prayed for his murderers. Standing in the crowd watching was a young man named Saul, who would later become the apostle Paul. Sometimes the seeds of transformation are planted in the worst moments.',
   'Could you forgive someone who was actively hurting you?|When have you seen someone respond to cruelty with grace — and what effect did it have?|What does it say about Stephen that his dying words were about his killers, not himself?',
   'Read Acts 22:19-20 where Paul remembers this moment years later. Stephen\'s death haunted him. Sometimes courage has consequences we never see.',
   'adults',6,null,124,'act-stephen-martyred','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 5. Philip and Ethiopian - family
  ['act-devo-philip-ethiopian','The Chariot Conversation','ACT',8,26,40,
   'Philip was told by an angel to go to a desert road. There he met an Ethiopian official reading Isaiah in his chariot but not understanding it. Philip ran alongside, explained it, and baptized him on the spot.',
   'God sent Philip to exactly the right spot at exactly the right moment for one person who had one question. The Ethiopian was powerful, wealthy, and educated — but he needed help understanding what he was reading. Sometimes the most important conversation you have today is the one you did not plan.',
   'Has a conversation ever changed the way you understood something?|If God nudged you to talk to a stranger, would you do it?|Who helped you understand something about God that you could not figure out alone?',
   'The Ethiopian went home rejoicing. Tradition says he brought Christianity to Ethiopia. One roadside conversation changed the history of an entire nation.',
   'family',5,null,125,'act-philip-and-the-ethiopian','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 6. Conversion of Saul - teens
  ['act-devo-saul-conversion','When the Worst Person You Know Changes','ACT',9,1,19,
   'Saul was the most feared enemy of Christians — dragging believers from their homes and throwing them in prison. On the road to Damascus, Jesus appeared in a blinding light and everything changed.',
   'Saul was not looking for God. He was looking for people to arrest. He was 100% certain he was right. Then Jesus knocked him flat and asked the most personal question possible: Why are you persecuting ME? Not my people. Me. Every person Saul had hurt was someone Jesus took personally.',
   'Have you ever been completely wrong about something you were sure about?|Is there anyone in your life who you think could never change?|What would it take for you to completely rethink your direction?',
   'Notice that Saul was blind for three days and had to be led by the hand. Sometimes God has to take everything away before he can give you something new.',
   'teens',5,null,126,'act-conversion-of-saul','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 7. Peter's vision / Cornelius - family
  ['act-devo-peters-vision','When God Changed Peter\'s Mind','ACT',10,9,35,
   'Peter had a vision of unclean animals and God told him to eat. Peter refused three times. Then God said: Do not call anything impure that God has made clean. Right then, messengers from a Roman soldier named Cornelius arrived.',
   'Peter was a good religious person who followed all the rules. And the rules said: do not eat with outsiders, do not enter their homes, do not treat them as equals. God had to give Peter a weird dream about food to get through to him. Sometimes our certainty about who is in and who is out is the very thing God wants to shatter.',
   'Have you ever changed your mind about someone you thought you would never like?|Who are the people our culture tells us to avoid?|What would it look like to treat every person as someone God loves?',
   'Read Acts 10:34-35. Peter says it out loud: God does not show favoritism. This was a revolution in Peter\'s world. Is it still revolutionary in ours?',
   'family',5,null,127,'act-peters-vision','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 8. Antioch church - adults
  ['act-devo-antioch','The Place Where They Were First Called Christians','ACT',11,19,30,
   'After persecution scattered believers from Jerusalem, some ended up in Antioch and started something nobody expected: they told non-Jewish people about Jesus. A diverse, multiethnic church was born.',
   'The Antioch church was the first place believers were called Christians — and it was not a compliment. But this church was special because it was the first community where people from completely different backgrounds worshiped together. Jews and Greeks, rich and poor, slaves and free. Barnabas went to find Paul because this church needed a teacher who understood both worlds.',
   'What does your community look like — is it mostly people like you, or is there real diversity?|Why is it easier to build community with people who are similar to us?|What would a church look like that truly reflected your whole city?',
   'Read Acts 13:1-3. The Antioch church sent out the first missionaries. New communities often have more courage than established ones. Why might that be?',
   'adults',6,null,128,'act-antioch-church','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 9. Jerusalem Council - adults
  ['act-devo-jerusalem-council','The Argument That Saved the Church','ACT',15,1,21,
   'The early church faced its biggest crisis: did non-Jewish believers have to follow all Jewish laws? The apostles gathered in Jerusalem and had a fierce debate. James proposed a compromise that changed everything.',
   'The church almost split apart in its first generation — not over theology in the abstract but over who belongs and what the entry requirements are. Sound familiar? Every community faces this question. The Jerusalem Council decided that grace was the door, not cultural conformity. They chose unity over uniformity.',
   'Have you ever been part of a group that disagreed about the rules?|What is the difference between an important standard and a preference that feels important?|How do you decide when to compromise and when to hold firm?',
   'James quotes Amos 9:11-12 — God is doing something that includes everyone. Sometimes the Bible\'s own answer to our arguments is bigger than either side expected.',
   'adults',6,null,129,'act-jerusalem-council','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 10. Paul in Athens - teens
  ['act-devo-paul-athens','Finding God at the Philosophy Club','ACT',17,16,34,
   'Paul walked through Athens, a city full of temples and statues to every god imaginable. At the Areopagus, he did not condemn them — he quoted their own poets and said the unknown god they worshiped was the one he came to announce.',
   'Paul did not walk into the intellectual capital of the world and say: you are all wrong and I am right. He listened. He learned their culture. He quoted their poets. He found the common ground — that restless searching for something beyond ourselves — and built a bridge from there. He took their questions seriously.',
   'Where do you encounter ideas that are different from what you believe?|Have you ever learned something true from an unexpected source?|How do you talk about your faith with someone who does not share it — do you lecture or listen first?',
   'Paul\'s approach got mixed results — some sneered, some wanted to hear more, some believed. Honest engagement does not guarantee agreement. But it keeps the conversation open.',
   'teens',5,null,130,'act-paul-in-athens','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 11. Riot in Ephesus - family
  ['act-devo-ephesus-riot','When Business and Belief Collide','ACT',19,23,41,
   'Silversmiths in Ephesus made money selling idol statues. When Paul\'s preaching meant fewer people buying idols, they started a riot. The whole city was in chaos for two hours.',
   'Follow the money. The silversmiths were not really upset about theology — they were upset about their income. When believing the right thing threatens someone\'s wallet, expect a fight. This happens in every era: truth becomes controversial when it costs someone profit.',
   'Can you think of a time when doing the right thing was unpopular because it cost someone money?|Why do people sometimes resist good changes?|What matters more — doing what is right or keeping things comfortable?',
   'A city clerk finally calmed the crowd with common sense (vv. 35-41). Sometimes the voice of reason comes from unexpected places.',
   'family',5,null,131,'act-riot-in-ephesus','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 12. Paul's farewell to elders - adults
  ['act-devo-pauls-farewell','The Goodbye That Broke Everyone','ACT',20,17,38,
   'Paul called the Ephesian church leaders to the beach at Miletus. He told them he would never see them again. He wept. They wept. They knelt and prayed together, then they walked him to his ship.',
   'Paul was a tough man — beaten, shipwrecked, imprisoned, stoned and left for dead. But here he is crying on a beach with his friends. He gave them his most honest farewell: I did not hold back anything that was helpful. I served with tears. I am going somewhere dangerous and I am not coming back. Leadership is not position — it is love that costs something.',
   'Have you ever had to say goodbye knowing you might not see someone again?|What is the hardest part about letting go of people you love?|If you had one final conversation with the people who matter most, what would you say?',
   'Paul quotes Jesus: It is more blessed to give than to receive (v. 35). This saying appears nowhere in the Gospels — Paul preserved a word of Jesus that would otherwise be lost.',
   'adults',6,null,132,'act-pauls-farewell-to-elders','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 13. Paul before Agrippa - teens
  ['act-devo-paul-agrippa','Making Your Case Before the Powerful','ACT',26,1,29,
   'Paul stood in chains before King Agrippa and told his story — not as a legal defense, but as an honest testimony. He was so persuasive that Agrippa said: Do you think you can make me a Christian so quickly?',
   'Paul was a prisoner speaking to a king, and yet Paul was the one in control of the room. He did not beg. He did not apologize for his beliefs. He simply told the truth about what happened to him. Your story — honestly told — is the most powerful thing you have. Nobody can argue with what happened to you.',
   'If you had five minutes to explain what you believe and why, what would you say?|Have you ever had to defend something you believe in to someone with more power than you?|What is the difference between being pushy and being honest?',
   'Agrippa\'s almost-response is one of the most haunting lines in the Bible. Being almost persuaded is not the same as being changed.',
   'teens',5,null,133,'act-paul-before-agrippa','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 14. Shipwreck - young-children
  ['act-devo-shipwreck','The Storm That Could Not Stop Paul','ACT',27,13,44,
   'Paul was being taken to Rome as a prisoner on a ship. A massive storm hit — two weeks of darkness, no sun, no stars, no food. Everyone gave up hope. But Paul stood up and said: Take heart. God told me we will all survive.',
   'The storm was so bad that the sailors threw the cargo overboard. They could not see the sun for days. Everyone on that ship — 276 people — thought they were going to die. But Paul had a promise from God, and he held onto it even when the waves said otherwise. Sometimes holding on is the bravest thing you can do.',
   'Have you ever been scared during a big storm?|What helps you feel brave when something scary is happening?|Who is someone who stays calm when things get crazy?',
   'Everyone made it to shore alive — some swimming, some holding onto broken pieces of the ship. God did not stop the storm, but he got every single person through it.',
   'young-children',4,null,134,'act-shipwreck','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 15. Ascension - family
  ['act-devo-ascension','The Day Jesus Left (and Why That Was Good)','ACT',1,1,11,
   'Forty days after rising from the dead, Jesus gathered his disciples on a hill, gave them final instructions, and ascended into heaven. Two angels appeared and said: Why are you staring at the sky?',
   'The disciples stood there looking up, mouths open, frozen. They had just watched their leader disappear into the clouds. The angels basically said: Stop staring and start moving. Jesus left so the Spirit could come. Sometimes what feels like abandonment is actually empowerment.',
   'Have you ever felt like God was far away?|What is the difference between God being absent and God being present in a new way?|Has someone leaving ever opened a door for you to grow?',
   'Jesus told them to wait in Jerusalem. Sometimes the instruction is not go — it is stay. Waiting is not doing nothing. It is preparing for what comes next.',
   'family',5,null,135,'act-ascension','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 16. Paul in Rome - adults
  ['act-devo-paul-rome','Under House Arrest but Still Unstoppable','ACT',28,16,31,
   'The book of Acts ends with Paul under house arrest in Rome, chained to a Roman guard. For two years he welcomed everyone who came and taught about Jesus boldly and without hindrance.',
   'Acts does not end with a victory parade. It ends with Paul in chains. But the final word in the Greek text is akolytos — unhindered. A man in chains, preaching without hindrance. The gospel cannot be imprisoned even when its messengers are. Sometimes your greatest influence comes in your most limited circumstances.',
   'When have you felt limited or stuck, and how did you respond?|Have constraints ever forced you to be more creative or more focused?|What does it mean that the story of Acts never really ends — it just stops mid-sentence?',
   'Acts has no conclusion because the story is still being written. Every generation of believers adds chapters. What chapter are you writing?',
   'adults',6,null,136,'act-paul-in-rome','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== ROMANS (8 devotionals) =====
  // 17. Romans 5 - Peace with God - family
  ['rom-devo-peace-with-god','Peace When Nothing Feels Peaceful','ROM',5,1,11,
   'Paul writes that since we have been made right with God through faith, we have peace with God. Not peace with our circumstances — peace with God himself. Even suffering produces endurance, character, and hope.',
   'Peace with God does not mean everything is fine. It means that in the middle of everything not being fine, there is a relationship that cannot be broken. Suffering is not pointless — it builds something in you that comfort never could. But this is not a platitude for someone else\'s pain. It is a promise you discover in your own.',
   'What is the difference between feeling peaceful and having peace with God?|Has a hard time ever built something good in you that you could not have gotten any other way?|What does it mean that God\'s love has been poured into our hearts?',
   'Verse 8: God demonstrates his own love for us in this — while we were still sinners, Christ died for us. Not after we cleaned up. While we were at our worst.',
   'family',5,null,137,'rom-peace-with-god','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 18. Romans 7 - Internal war - teens
  ['rom-devo-internal-war','Why You Do the Thing You Hate','ROM',7,14,25,
   'Paul describes a war inside himself: I do not do the good I want to do, but the evil I do not want to do — this I keep on doing. He is not describing someone far from God. He is describing himself.',
   'This is the most honest passage in the Bible. The apostle Paul — church planter, miracle worker, author of half the New Testament — is saying: I am a mess inside. I know what is right and I still do what is wrong. If you have ever felt like a hypocrite, like you cannot stop a habit, like you keep failing at the same thing, Paul is saying: me too. You are not uniquely broken. You are human.',
   'What is something you keep doing even though you know you should stop?|Does it help to know that Paul struggled with the same kind of internal war?|What is the difference between trying harder and asking for help?',
   'Verse 24: What a wretched man I am! Who will rescue me? The answer is not willpower. It is a person. Sometimes the answer to your deepest struggle is not a strategy — it is a Savior.',
   'teens',5,null,138,'rom-internal-war','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 19. Romans 8:1-17 - No condemnation - family
  ['rom-devo-no-condemnation','The Voice That Says You Are Not Enough','ROM',8,1,17,
   'Paul declares: There is now no condemnation for those who are in Christ Jesus. The law of the Spirit of life has set you free from the law of sin and death.',
   'No condemnation. Not less condemnation. Not condemnation-once-you-improve. No condemnation. Right now. That voice in your head that says you are not enough, you will never change, you are too far gone — that voice is not God. God opens Romans 8 with the most liberating sentence ever written and spends the rest of the chapter proving he means it.',
   'What does the voice of condemnation sound like in your life?|How would your day change if you really believed there was no condemnation?|What is the difference between conviction that helps you grow and shame that tears you down?',
   'Verse 15: You did not receive a spirit of slavery to fall back into fear, but you received the Spirit of adoption, by whom we cry Abba, Father. You are not a slave earning approval. You are a child who already has it.',
   'family',5,null,139,'rom-no-condemnation','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 20. Romans 8:18-39 - Nothing separates - adults
  ['rom-devo-nothing-separates','The List of Things That Cannot Beat You','ROM',8,28,39,
   'Paul writes the most sweeping promise in Scripture: neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers, neither height nor depth, nor anything else in all creation will be able to separate us from the love of God.',
   'Paul is not writing from a comfortable study. He has been beaten, shipwrecked, stoned, and imprisoned. He is writing from experience when he makes this list. He has tested every item on it. Death? He has faced it. Powers? They have hunted him. Present suffering? He lives in it. And he says: none of it wins. Love wins. Not eventually. Now.',
   'What feels like it could separate you from God\'s love right now?|Have you ever been through something that made you doubt God was there?|What does it mean that Paul says we are MORE than conquerors — not just survivors?',
   'Read the full sweep of Romans 8:18-39. Paul moves from groaning to glory. He does not skip the suffering — he walks through it to the other side.',
   'adults',6,null,140,'rom-no-condemnation','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 21. Romans 12 - Living sacrifice - family
  ['rom-devo-living-sacrifice','Your Whole Life as an Act of Worship','ROM',12,1,8,
   'Paul urges believers to offer their bodies as living sacrifices — which he calls your true and proper worship. Then he says: do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
   'A dead sacrifice stays on the altar. A living sacrifice keeps crawling off. That is the challenge Paul is naming. Worship is not just what you do on Sunday — it is how you treat your coworker on Monday, how you respond to your kids at dinnertime, how you handle the slow driver in traffic. Your ordinary life is the offering.',
   'What does it look like to worship God with your regular Tuesday?|What pattern of the world is hardest for you to resist?|If someone watched your daily routine, what would they say you worship?',
   'Verses 9-21 get practical: love sincerely, hate evil, honor others above yourselves, be joyful in hope, patient in affliction, faithful in prayer. This is what a living sacrifice looks like on the ground.',
   'family',5,null,141,'rom-living-sacrifice','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 22. Romans 3 - All have sinned - teens
  ['rom-devo-all-have-sinned','The Great Equalizer','ROM',3,9,26,
   'Paul makes his case: there is no one righteous, not even one. All have sinned and fall short of the glory of God. But then he pivots: all are justified freely by his grace.',
   'Paul spends three chapters proving that nobody is good enough — not the religious people, not the moral people, not anyone. Then he drops the word freely. Justified freely. Not earned. Not deserved. Not awarded to the best performers. Freely. The same word that levels everyone also lifts everyone.',
   'Do you tend to compare yourself to others — either feeling superior or inferior?|How does it change things to know that everyone starts at the same place?|What does free really mean when it comes to grace?',
   'The word justified means declared right. It is a legal term. God does not just forgive you — he declares you right. Not innocent. Not overlooked. Right.',
   'teens',5,null,142,'rom-all-have-sinned','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 23. Romans 6 - Dead to sin - adults
  ['rom-devo-dead-to-sin','Who You Used to Be Is Dead','ROM',6,1,14,
   'Paul asks: Shall we go on sinning so that grace may increase? His answer is fierce: By no means! We who died to sin — how can we live in it any longer? Baptism pictures a death and resurrection.',
   'Cheap grace says: God forgives, so do whatever you want. Paul says that misses the point entirely. You died. The old version of you is buried. You are not improving the old self — you are living as a new one. This is not about trying harder. It is about understanding that the person who was enslaved to that pattern is gone.',
   'What part of your old self keeps trying to come back to life?|Is there a habit or pattern you have that belongs to a version of you that no longer exists?|What does freedom actually feel like — not just freedom from, but freedom to?',
   'Verse 14: Sin shall no longer be your master, because you are not under the law, but under grace. Freedom from sin comes through grace, not through rules.',
   'adults',6,null,143,'rom-dead-to-sin','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 24. Romans 14 - Strong and weak - family
  ['rom-devo-strong-and-weak','Stop Judging Each Other About the Small Stuff','ROM',14,1,13,
   'The Roman church was fighting about food and holy days. Some Christians ate meat; others were vegetarians. Some observed special days; others did not. Paul says: stop judging each other over these things.',
   'Every family, every church, every community has these fights. One person thinks screens are fine; another thinks they rot your brain. One family does Christmas big; another keeps it simple. Paul is not saying nothing matters. He is saying: figure out what matters most and stop making everyone else live by your preferences.',
   'What is something your family disagrees about that is not really a big deal?|How do you know the difference between an important standard and a personal preference?|Have you ever judged someone for doing something differently than you?',
   'Verse 13: Make up your mind not to put any stumbling block or obstacle in the way of a brother or sister. The goal is not winning the argument — it is loving the person.',
   'family',5,null,144,'rom-strong-and-weak','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 1 CORINTHIANS (6 devotionals) =====
  // 25. Divisions - adults
  ['1co-devo-divisions','Stop Picking Teams','1CO',1,10,17,
   'The Corinthian church was splitting into factions: I follow Paul, I follow Apollos, I follow Peter. Paul is horrified: Is Christ divided? Was Paul crucified for you?',
   'Christians have been picking teams since the first century. My pastor versus your pastor. My tradition versus yours. Paul says this tears the body apart. The problem is not having teachers you respect — it is turning respect into rivalry. When your identity comes from your team instead of your Christ, you have already lost.',
   'Do you ever define yourself by who you are against rather than who you follow?|Why is it so tempting to turn preferences into tribes?|What would it look like to disagree with someone in your community without making them the enemy?',
   'Paul deliberately chose not to baptize many Corinthians (v. 14-16) — he did not want anyone saying they belonged to him. Real leaders point away from themselves.',
   'adults',6,null,145,'1co-divisions','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 26. Body of Christ - family
  ['1co-devo-body-of-christ','You Are Not the Whole Body','1CO',12,12,27,
   'Paul compares the church to a human body: the eye cannot say to the hand, I do not need you. Every part matters. The parts that seem weakest are actually indispensable.',
   'You know the kid who always gets picked last? The person in the group project who seems to contribute least? The family member who feels invisible? Paul says those people are indispensable. Not tolerated. Not included out of pity. Necessary. The body does not work without every part.',
   'Have you ever felt like the least important person in a group?|Who is someone in your life that you might be overlooking?|What does your family or group look like when everyone\'s contribution is valued?',
   'Verse 26: If one part suffers, every part suffers with it. You cannot scroll past someone else\'s pain and stay healthy yourself. We are connected.',
   'family',5,null,146,'1co-spiritual-gifts','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 27. Love chapter - family
  ['1co-devo-love-chapter','Love Is Not a Feeling — It Is a Decision','1CO',13,1,13,
   'Paul writes the famous love chapter — but not for a wedding. He wrote it to a church tearing itself apart with competition, jealousy, and arrogance. Love is patient, love is kind was a rebuke.',
   'We put 1 Corinthians 13 on wedding cards, but Paul wrote it to people who were suing each other, getting drunk at communion, and arguing about who had the best spiritual gifts. This is not romantic poetry. It is a mirror held up to a community that had everything except love. Read it again with that in mind and it becomes something much more challenging.',
   'Read the list of what love is and is not — which one is hardest for you?|How does it change things to know this was written to people who were fighting?|What would your school, workplace, or home look like if everyone actually practiced this list?',
   'Verse 11: When I was a child, I talked like a child. Paul is saying: grow up. Stop the spiritual one-upmanship. The greatest thing is not being impressive — it is being loving.',
   'family',5,null,147,'1co-love-chapter','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 28. Resurrection - adults
  ['1co-devo-resurrection','If the Dead Are Not Raised, None of This Matters','1CO',15,12,28,
   'Some Corinthians were denying the resurrection. Paul fires back: if Christ has not been raised, your faith is useless. You are still in your sins. And we are the most pitiful people alive.',
   'Paul is not playing nice here. He says: if there is no resurrection, I am a liar, you are a fool, and everyone who died believing this died for nothing. Christianity is not a self-help philosophy with nice values. It rises or falls on whether a dead man actually walked out of a tomb. Paul is daring you to take it seriously enough to reject it or believe it — but not to tame it.',
   'Do you believe in the resurrection — and does it actually change how you live?|What would you lose if the resurrection were not true?|Why does Paul say the resurrection matters for everyday life, not just afterlife?',
   'Verse 20: But Christ has indeed been raised. After all the warnings, Paul gives the answer. And then he draws out the implications for all of human history.',
   'adults',6,null,148,'1co-resurrection','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 29. Food offered to idols / conscience - teens
  ['1co-devo-food-idols','When Your Freedom Hurts Someone Else','1CO',8,1,13,
   'Some Corinthian Christians felt free to eat meat offered to idols — it is just food, the idols are not real. Others were horrified. Paul says: you are right that idols are nothing. But your freedom is destroying your brother.',
   'You have every right to post that on social media. You have every right to watch that show. You have every right to go to that party. But Paul asks a different question: is your freedom building people up or tearing them down? Knowledge says I can. Love asks should I. The mature person limits their own freedom for the sake of someone else.',
   'Have you ever exercised your right to do something and accidentally hurt someone?|When is it loving to hold back even if you are technically allowed?|What is the difference between legalism and choosing to limit yourself out of love?',
   'Verse 9: Be careful that the exercise of your rights does not become a stumbling block. Freedom without love is just selfishness with a permission slip.',
   'teens',5,null,149,'1co-food-offered-to-idols','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 30. Lord's Supper - family
  ['1co-devo-lords-supper','The Meal That Remembers','1CO',11,23,34,
   'Paul passes on what Jesus did at the last supper: he took bread, gave thanks, broke it, and said this is my body given for you. Do this in remembrance of me. But Paul is angry — the Corinthians were turning this sacred meal into a selfish feast.',
   'Some Corinthians were gorging themselves while others went hungry at the same table. Paul says: that is not the Lord\'s Supper — that is your supper. You are eating judgment on yourselves. The meal is supposed to remind you that someone gave his body for you. The least you can do is share your bread.',
   'When do you feel most connected to your family or community during a meal?|Why do you think Jesus chose a meal — not a lecture or a ceremony — as the way to remember him?|How does sharing food with others change a relationship?',
   'Every time you eat this bread and drink this cup, you proclaim the Lord\'s death until he comes. A meal. A memory. A promise. All at once.',
   'family',5,null,150,'1co-lords-supper','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 2 CORINTHIANS (4 devotionals) =====
  // 31. Comfort in suffering - family
  ['2co-devo-comfort-suffering','The God Who Comforts So You Can Comfort Others','2CO',1,3,11,
   'Paul opens his most personal letter by praising the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.',
   'Your worst experience might be someone else\'s lifeline. That is not a silver lining — it is a purpose. Paul is not saying suffering is good. He is saying God does not waste it. The parent who survived addiction can sit with the struggling teen. The kid who was bullied can spot the lonely one. Comfort flows through wounds.',
   'Has someone who went through something hard ever helped you through a similar experience?|How is comfort from someone who understands different from comfort from someone who has never been there?|What pain in your past might be exactly what someone else needs?',
   'Paul admits he was so burdened he despaired of life itself (v. 8). This is not a man speaking from theory. He is speaking from the bottom.',
   'family',5,null,151,'2co-comfort-in-suffering','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 32. Treasure in jars of clay - adults
  ['2co-devo-jars-of-clay','Treasure in Fragile Containers','2CO',4,7,18,
   'Paul says we have this treasure in jars of clay — common, breakable, cheap pottery — to show that the surpassing power belongs to God and not to us. We are hard pressed but not crushed, perplexed but not in despair.',
   'God put the greatest treasure in the universe inside the most fragile containers he could find: us. Not marble vases. Not titanium safes. Clay pots that chip and crack and break. Paul says this is the point. If you were unbreakable, you would get the credit. Your weakness is not a bug — it is the feature that makes God\'s power visible.',
   'Where do you feel most fragile right now?|Do you try to hide your cracks or let people see them?|How does knowing that God works through weakness — not despite it — change how you see your limitations?',
   'Verse 16: We do not lose heart. Though outwardly we are wasting away, yet inwardly we are being renewed day by day. The exterior is temporary. The interior is eternal.',
   'adults',6,null,152,'2co-treasure-in-jars','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 33. Thorn in the flesh - teens
  ['2co-devo-thorn','The Prayer God Said No To','2CO',12,7,10,
   'Paul had a thorn in the flesh — some persistent suffering he never names. He begged God three times to remove it. God said: My grace is sufficient for you, for my power is made perfect in weakness.',
   'Three times Paul asked. Three times God said no. Not because God did not care. Because God had a different plan. The thorn stayed — and Paul discovered that God\'s power showed up most in the place he was weakest. This is not a comfortable truth. It is an honest one. Sometimes the thing you most want removed is the thing that keeps you dependent on God.',
   'Is there something you have prayed about that God has not fixed?|How do you respond when the answer is no?|What might it mean that God\'s power is made perfect in weakness — not in strength?',
   'Paul\'s response in verse 10 is stunning: I delight in weaknesses. Not tolerate. Not endure. Delight. That takes a lifetime to learn.',
   'teens',5,null,153,'2co-power-in-weakness','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 34. Ministry of reconciliation - adults
  ['2co-devo-reconciliation','You Are an Ambassador, Not a Judge','2CO',5,17,21,
   'Paul says: if anyone is in Christ, the new creation has come. The old has gone, the new is here. God has given us the ministry of reconciliation — making us ambassadors, as though God were making his appeal through us.',
   'An ambassador represents a country they did not create, carrying a message they did not author, to people they may not understand. That is your job. Not judge. Not prosecutor. Not defender. Ambassador. You carry the message of reconciliation — that God is not counting people\'s sins against them. If you are keeping score, you have misunderstood your assignment.',
   'Do you see yourself more as a judge or an ambassador?|What would change in your relationships if you stopped keeping score?|What does it mean to be a new creation — not improved, but new?',
   'The old has gone. Not the old is improving. Not the old is slowly getting better. Gone. New creation language is radical — it means you are not a renovation. You are a rebuild.',
   'adults',6,null,154,'2co-ministry-of-reconciliation','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== GALATIANS (4 devotionals) =====
  // 35. No other gospel / confronting Peter - teens
  ['gal-devo-no-other-gospel','When Paul Told Peter He Was Wrong','GAL',2,11,21,
   'Paul publicly confronted Peter for hypocrisy — Peter had been eating with non-Jewish believers but stopped when the Jewish hardliners showed up. Paul called him out in front of everyone.',
   'Peter was not wrong in his beliefs — he was wrong in his behavior. He knew the truth but caved to peer pressure. And Paul did not pull him aside quietly. He confronted him publicly because Peter\'s hypocrisy was public. Sometimes the loving thing is not the comfortable thing. And sometimes the person who needs correcting is not the obvious villain — it is the respected leader.',
   'Have you ever acted differently around certain people to avoid conflict?|Is it harder to confront a friend or an enemy?|What is the difference between calling someone out and tearing someone down?',
   'Verse 20: I have been crucified with Christ and I no longer live, but Christ lives in me. Paul\'s whole argument comes down to this: if Christ lives in me, I cannot live a double life.',
   'teens',5,null,155,'gal-no-other-gospel','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 36. Freedom in Christ / Fruit of Spirit - family
  ['gal-devo-fruit-of-spirit','The Fruit Nobody Can Fake','GAL',5,16,26,
   'Paul contrasts the works of the flesh — hatred, jealousy, rage, selfish ambition — with the fruit of the Spirit: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.',
   'You can fake a lot of things, but you cannot fake fruit. Fruit grows slowly, over time, from healthy roots. You cannot staple apples to a dead tree and call it productive. The fruit of the Spirit is not a checklist to perform — it is evidence of something alive inside you. If you are not seeing fruit, the question is not try harder — it is what are you rooted in?',
   'Which fruit of the Spirit comes most naturally to you? Which is hardest?|What is the difference between performing kindness and actually being kind?|What does it mean that this is fruit — something that grows — not a to-do list?',
   'Against such things there is no law. Nobody ever got arrested for being too patient or too gentle. There is no upper limit on goodness.',
   'family',5,null,156,'gal-freedom-in-christ','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 37. Bear one another's burdens - family
  ['gal-devo-bear-burdens','Carry Each Other','GAL',6,1,10,
   'Paul says: carry each other\'s burdens, and in this way you will fulfill the law of Christ. But then he says: each one should carry their own load. Which is it?',
   'The Greek uses two different words. Burden means a crushing weight — the kind that will break you if you carry it alone. Load means a backpack — your daily responsibilities. Help people with their crushing weights. Do not carry their backpacks for them. The difference between helping and enabling is knowing which is which.',
   'When has someone helped you carry a burden that was too heavy for you?|How do you know when someone needs help versus when they need to do it themselves?|What burden is someone near you carrying right now that you could share?',
   'Verse 9: Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up. The harvest is coming. Keep going.',
   'family',5,null,157,'gal-bear-one-anothers-burdens','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 38. Faith vs Law - adults
  ['gal-devo-faith-vs-law','You Cannot Earn What Is Already Free','GAL',3,1,14,
   'Paul is furious with the Galatians: Who has bewitched you? You began by the Spirit — are you now trying to finish by human effort? He argues that Abraham was justified by faith long before the law existed.',
   'The Galatians started with grace and then drifted back to performance. Paul calls this foolishness. You experienced freedom and then chose to pick up the chains again. This is the perpetual human temptation: to turn relationship into religion, gift into obligation, freedom into a new set of rules. Every generation does it.',
   'Where in your life have you turned a gift into an obligation?|Do you tend to earn your way or receive freely?|What does it feel like to truly accept something you did not work for?',
   'Verse 3: After beginning by means of the Spirit, are you now trying to finish by means of the flesh? This question haunts every person who has ever drifted from wonder to duty.',
   'adults',6,null,158,'gal-faith-vs-law','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== EPHESIANS (4 devotionals) =====
  // 39. Saved by grace - teens
  ['eph-devo-saved-by-grace','The Gift You Cannot Earn','EPH',2,1,10,
   'Paul writes: it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast. You are God\'s workmanship, created for good works.',
   'Dead people do not save themselves. Paul says you were dead in your sins — not sick, not struggling, dead. And God made you alive. You did not earn it. You did not deserve it. You cannot boast about it. But here is the twist: you were saved for something. Created in Christ Jesus to do good works that God prepared in advance for you. Grace is not the end of the story — it is the beginning.',
   'Do you tend to feel like you need to earn God\'s approval?|What does it mean to be someone\'s workmanship — their craft, their art?|If your good works are not earning salvation, what are they for?',
   'Verse 10: We are God\'s handiwork. The Greek word is poiema — we get the word poem from it. You are God\'s poem.',
   'teens',5,null,159,'eph-saved-by-grace','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 40. Unity of the body - family
  ['eph-devo-unity','One Body, One Spirit, One Hope','EPH',4,1,6,
   'Paul urges the Ephesians to live worthy of their calling — with all humility and gentleness, with patience, bearing with one another in love, making every effort to keep the unity of the Spirit.',
   'Notice what unity requires: humility, gentleness, patience, bearing with one another. Unity is not agreement on everything. It is choosing to stay together through disagreement. It takes effort — Paul says make every effort. Peace is not the absence of conflict. It is the presence of love in the middle of conflict.',
   'What is the difference between unity and uniformity?|Why does Paul list humility first?|When has your family or group stayed together through a disagreement — and what made that possible?',
   'One body, one Spirit, one hope, one Lord, one faith, one baptism, one God. Seven ones. Paul is not begging for unity — he is declaring it already exists. Your job is to keep what God already made.',
   'family',5,null,160,'eph-unity-of-the-body','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 41. Armor of God - young-children
  ['eph-devo-armor-of-god','Getting Dressed for Battle','EPH',6,10,18,
   'Paul tells believers to put on the full armor of God: the belt of truth, the breastplate of righteousness, shoes of the gospel of peace, the shield of faith, the helmet of salvation, and the sword of the Spirit.',
   'Every morning you get dressed — shoes, shirt, maybe a coat. Paul says there is another kind of getting dressed. Put on truth like a belt that holds everything together. Put on peace like shoes that carry you through the day. Pick up faith like a shield. God does not send you into hard days unprotected. He gives you armor.',
   'What piece of armor do you think you need most today?|What does it mean to put on truth like a belt?|How is faith like a shield?',
   'The armor is for standing, not attacking. Paul says stand your ground six times. Sometimes the bravest thing is simply not running away.',
   'young-children',4,null,161,'eph-armor-of-god','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 42. Spiritual blessings - adults
  ['eph-devo-spiritual-blessings','Chosen Before the World Began','EPH',1,3,14,
   'Paul opens Ephesians with a breathtaking sentence (one sentence in Greek, 202 words) declaring that God chose us before the creation of the world, predestined us for adoption, lavished his grace on us, and revealed the mystery of his will.',
   'Before you took your first breath, before the universe had stars, God had you in mind. Not as an afterthought. Not as a plan B. Chosen. The word Paul uses means handpicked. This is not about determinism or free will debates — it is about belonging. You are not an accident. You are not a cosmic coincidence. You were wanted before there was a world to want you in.',
   'What does it feel like to know you were chosen before the world existed?|How does being chosen change the way you see your identity?|Have you ever felt like an afterthought — and how does this passage speak to that?',
   'Paul says God lavished his grace on us. Not measured it. Not rationed it. Lavished. Like a parent who cannot stop giving to a child they adore.',
   'adults',6,null,162,'eph-spiritual-blessings','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== PHILIPPIANS (4 devotionals) =====
  // 43. Joy in chains - adults
  ['php-devo-joy-in-chains','Writing About Joy from a Prison Cell','PHP',1,12,26,
   'Paul writes from prison that his chains have actually advanced the gospel — the whole palace guard knows why he is there, and other believers have become bolder. For me to live is Christ and to die is gain.',
   'Paul is not in a metaphorical prison. He is in an actual prison, chained to an actual guard, facing actual death. And he writes a letter about joy. Not because he is pretending. Because he has found something that prison cannot touch. His circumstances are terrible and his spirit is free. That disconnect is the whole message of Philippians.',
   'Can you imagine finding joy in the worst circumstances of your life?|What is the difference between happiness and joy?|What is something in your life that no circumstance can take from you?',
   'To live is Christ and to die is gain. Paul is saying he cannot lose. If he lives, he gets to serve. If he dies, he gets to be with Christ. When both outcomes are good, fear loses its power.',
   'adults',6,null,163,'php-joy-in-chains','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 44. Christ hymn / humility - family
  ['php-devo-christ-hymn','The One Who Had Everything and Gave It Up','PHP',2,1,11,
   'Paul quotes an early Christian hymn: Jesus, who was in very nature God, did not consider equality with God something to be used to his own advantage. He made himself nothing, taking the form of a servant.',
   'Jesus had every right to pull rank. He was God. Instead, he emptied himself and became a servant. He went from the highest place in the universe to the lowest. Paul\'s point is not just theology — it is an instruction: have this same mindset. In a world obsessed with climbing up, Jesus climbed down. And God exalted him for it.',
   'What does it look like to serve someone when you could demand to be served?|Why do you think humility is so hard?|Who is someone you know who genuinely serves others without needing credit?',
   'Every knee will bow. Not because of force — because of love. The one who went lowest is given the highest name. The path up goes through down.',
   'family',5,null,164,'php-christ-hymn','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 45. Pressing toward the goal - teens
  ['php-devo-pressing-on','Forgetting What Is Behind','PHP',3,7,14,
   'Paul says: whatever were gains to me I now consider loss for the sake of Christ. One thing I do: forgetting what is behind and straining toward what is ahead, I press on toward the goal.',
   'Paul had an incredible resume — top education, perfect religious credentials, elite status. He calls it all garbage compared to knowing Christ. This is not false modesty. He is saying: I am done looking in the rearview mirror. Your past achievements do not define you. Your past failures do not define you either. The only thing that matters is where you are heading.',
   'What are you most tempted to build your identity on — achievements, reputation, popularity?|What would it look like to stop dwelling on your past mistakes?|What is the goal you are pressing toward?',
   'Not that I have already obtained all this or have already arrived. Paul — the greatest apostle — says he is not finished. If he is still growing, so are you. Give yourself permission to be in progress.',
   'teens',5,null,165,'php-pressing-toward-the-goal','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 46. Rejoice always / contentment - family
  ['php-devo-rejoice-contentment','The Secret of Being Content','PHP',4,4,13,
   'Paul writes: Rejoice in the Lord always. I will say it again: Rejoice! Do not be anxious about anything. I have learned the secret of being content in any situation. I can do all things through him who gives me strength.',
   'I can do all things through Christ is not about winning games or crushing goals. Paul wrote it about being content whether he had food or was starving, whether he was comfortable or in chains. The secret he learned was not how to get what he wanted — it was how to be at peace when he did not get what he wanted. That is a superpower.',
   'What do you think you need to be happy?|What is the difference between wanting things and needing things?|Can you think of a time when you had less but felt more content?',
   'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. The antidote to anxiety is not answers — it is prayer with thanksgiving.',
   'family',5,null,166,'php-rejoice-always','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== COLOSSIANS (3 devotionals) =====
  // 47. Supremacy of Christ - adults
  ['col-devo-supremacy','Before Everything, Above Everything','COL',1,15,20,
   'Paul declares that Christ is the image of the invisible God, the firstborn over all creation. In him all things hold together. He is before all things, and in him all things hold together.',
   'All things hold together in him. Every atom, every relationship, every chaotic day — held together by Christ. When life feels like it is falling apart, Paul says there is someone holding it together at a level you cannot see. This is not wishful thinking. It is a claim about the fundamental structure of reality.',
   'When has your life felt like it was falling apart?|What does it mean that Christ holds all things together — not just spiritual things, but all things?|How would you live differently if you believed the universe was held together by a person who loves you?',
   'He is before all things. Before your problem. Before your crisis. Before the universe itself. Whatever you are facing, he was there first.',
   'adults',6,null,167,'col-supremacy-of-christ','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 48. New self - family
  ['col-devo-new-self','Taking Off the Old, Putting On the New','COL',3,1,14,
   'Paul tells believers to put to death the old way of living and put on the new self: compassion, kindness, humility, gentleness, patience. Bear with each other and forgive. And over all these, put on love.',
   'Paul gives you a wardrobe change. Take off anger, rage, malice, slander, filthy language. Put on compassion, kindness, humility, gentleness, patience. This is not about trying harder to be nice. It is about changing what you wear — changing what people see when they encounter you. And the outermost layer, the coat that goes over everything else, is love.',
   'If your attitude were clothing, what would people see you wearing today?|Which item on the take off list is hardest for you to remove?|Which item on the put on list would make the biggest difference in your home?',
   'Bear with each other and forgive one another. Bear with means to put up with imperfect people. That is not failure — that is family.',
   'family',5,null,168,'col-new-self','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 49. Fullness in Christ - teens
  ['col-devo-fullness','You Already Have Everything You Need','COL',2,6,15,
   'Paul warns against anyone who would add requirements beyond Christ: do not let anyone judge you by what you eat or drink, or with regard to a festival. You have been given fullness in Christ.',
   'The Colossians were being told they needed Christ PLUS secret knowledge, PLUS special rules, PLUS mystical experiences. Paul says: no. You have fullness in Christ. Not Christ plus something. Christ. Period. In a world that always tells you that you need more — more followers, more achievements, more validation — Paul says you already have everything you need.',
   'What does the world tell you that you need to be complete?|Have you ever felt like faith should be more complicated than it is?|What would change if you actually believed you already have everything you need in Christ?',
   'Verse 15: Having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them by the cross. The cross was not defeat. It was a victory parade.',
   'teens',5,null,169,'col-fullness-in-christ','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 1 THESSALONIANS (2 devotionals) =====
  // 50. Coming of the Lord / grief - family
  ['1th-devo-grief-and-hope','Grieving with Hope','1TH',4,13,18,
   'The Thessalonians were worried about believers who had died before Jesus returned. Paul writes: we do not grieve like the rest who have no hope. The dead in Christ will rise first.',
   'Paul does not say: do not grieve. He says: do not grieve like people who have no hope. Grief is real. Grief is right. But for the believer, grief is not the final word. There is a reunion coming. Paul wrote these words to real people mourning real losses. They are not theology — they are comfort.',
   'Have you ever lost someone you love?|What does it mean to grieve with hope instead of without it?|How do you comfort someone who is grieving?',
   'Encourage each other with these words. Paul says this passage is meant to be spoken out loud to people in pain. Not preached at them. Spoken to them.',
   'family',5,null,170,'1th-coming-of-the-lord','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 51. Holy living / quiet life - adults
  ['1th-devo-quiet-life','The Radical Idea of a Quiet Life','1TH',4,9,12,
   'Paul instructs: make it your ambition to lead a quiet life, to mind your own business, and to work with your hands, so that your daily life may win the respect of outsiders.',
   'Make it your ambition to lead a quiet life. In a culture that rewards noise, platform, hustle, and hot takes, Paul says: be ambitious about quietness. Mind your own business. Do your work. Earn the respect of people outside your bubble not through impressive words but through a consistent life. The most radical thing you can do might be the most ordinary.',
   'Is our culture addicted to noise and busyness?|What would it look like to be ambitious about quiet faithfulness?|Who do you respect most — loud voices or consistent lives?',
   'This is not a call to withdrawal from the world. It is a call to be so steady, so reliable, so consistent that people notice without you saying a word.',
   'adults',5,null,171,'1th-holy-living','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 2 THESSALONIANS (1 devotional) =====
  // 52. Idle believers / work - teens
  ['2th-devo-idle','If You Do Not Work, You Do Not Eat','2TH',3,6,13,
   'Some Thessalonian believers had stopped working, expecting Jesus to return any moment. Paul says bluntly: if anyone is not willing to work, he should not eat. We were not idle when we were with you.',
   'Some people used the end of the world as an excuse to stop contributing. Paul is having none of it. He says: I worked with my own hands when I was with you, even though I had the right to be supported. If Jesus is coming back tomorrow, the best thing you can do today is your job. Faith is not an escape from responsibility — it is the reason to be more responsible.',
   'Have you ever used a good excuse to avoid work?|What does your work ethic say about what you believe?|Why does Paul connect working with faith instead of separating them?',
   'Never tire of doing what is good. Even when the task is boring. Even when nobody notices. Even when the world feels like it is ending.',
   'teens',5,null,172,'2th-idle-believers','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== HEBREWS (5 devotionals) =====
  // 53. Jesus the high priest - adults
  ['heb-devo-high-priest','A Priest Who Gets It','HEB',4,14,16,
   'The author of Hebrews says we have a high priest who is able to empathize with our weaknesses — one who has been tempted in every way, just as we are, yet he did not sin.',
   'Jesus is not watching your struggle from a distance with folded arms. He has been tempted in every way, just as you are. The loneliness. The exhaustion. The pull to give up. The desire to take the easy way out. He felt all of it. He gets it. That is why you can approach God\'s throne with confidence — not because you have cleaned yourself up, but because the one sitting there understands what it is like to be you.',
   'Does it change things to know that Jesus was genuinely tempted — not just pretending?|What would it look like to approach God with confidence instead of fear?|When do you most need someone who truly understands what you are going through?',
   'Let us then approach God\'s throne of grace with confidence. Not his throne of judgment. Grace. The throne is approachable because the priest is relatable.',
   'adults',6,null,173,'heb-jesus-the-high-priest','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 54. Faith hall of fame - family
  ['heb-devo-faith-hall','The People Who Bet Everything on What They Could Not See','HEB',11,1,16,
   'The author of Hebrews defines faith as confidence in what we hope for, assurance of what we do not see, then walks through a hall of fame: Abel, Enoch, Noah, Abraham, Sarah — all of whom lived by faith without seeing the promises fulfilled.',
   'These people did not have proof. They had promises. Abraham left his home without knowing where he was going. Noah built a boat when there was no rain. Sarah laughed at the idea of having a baby and then named him Laughter. Faith is not closing your eyes and hoping — it is acting on a promise when the evidence has not arrived yet.',
   'When have you had to act on something you believed but could not see?|Which person in this hall of fame do you relate to most?|What is the difference between faith and wishful thinking?',
   'They were longing for a better country — a heavenly one. These heroes of faith were homesick for a home they had never seen. They lived as strangers on earth because they belonged somewhere else.',
   'family',5,null,174,'heb-faith-hall-of-fame','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 55. Running the race - teens
  ['heb-devo-running-race','Throw Off What Slows You Down','HEB',12,1,3,
   'Since we are surrounded by such a great cloud of witnesses, let us throw off everything that hinders and the sin that so easily entangles. Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.',
   'Every runner knows: you do not sprint in a winter coat. You strip down to what is essential. The author of Hebrews says your life is a race and some things are slowing you down. Not just sin — anything that hinders. Good things that have become heavy things. Distractions. Comfort. The approval of people who do not matter. Throw it off.',
   'What is something that is not bad but is slowing you down?|What does it look like to fix your eyes on Jesus — practically, daily?|Who is in your cloud of witnesses — people who have run before you and are cheering you on?',
   'Fixing our eyes on Jesus, who for the joy set before him endured the cross. Jesus endured the worst thing because he could see through it to the joy on the other side.',
   'teens',5,null,175,'heb-running-the-race','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 56. God has spoken - family
  ['heb-devo-god-has-spoken','God Is Not Silent','HEB',1,1,4,
   'The book of Hebrews opens: In the past God spoke through prophets at many times and in various ways, but in these last days he has spoken to us by his Son.',
   'God did not stay silent. He spoke through burning bushes, through prophets, through dreams and visions and thunder. But then he did something nobody expected — he spoke through a person. Not a message. A person. Jesus is not just what God said. He is how God speaks. When you want to know what God sounds like, look at Jesus.',
   'How do you hear God — through the Bible, through other people, through circumstances?|What does it mean that God spoke through a person instead of just a book?|If Jesus is God\'s final word, what is he saying?',
   'The Son is the radiance of God\'s glory and the exact representation of his being. Like the sun and its rays — you cannot separate them. When you see the Son, you see the Father.',
   'family',5,null,176,'heb-god-has-spoken','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 57. Unshakeable kingdom - adults
  ['heb-devo-unshakeable','When Everything Shakes, What Remains?','HEB',12,25,29,
   'The author of Hebrews says God will shake everything that can be shaken so that what cannot be shaken may remain. Therefore, since we are receiving a kingdom that cannot be shaken, let us be thankful.',
   'Everything you have built your life on will be tested. Your career, your health, your relationships, your reputation — all shakeable. God shakes not to destroy but to reveal what is real. When the shaking stops, what remains is the unshakeable kingdom. This is not a threat. It is a gift. Would you rather discover what is real now or find out too late?',
   'What in your life has been shaken recently?|What has survived the shaking?|What are you building on that cannot be shaken?',
   'Let us worship God acceptably with reverence and awe, for our God is a consuming fire. This is not the tame God of greeting cards. This is the God who burns away everything false and leaves only what is true.',
   'adults',6,null,177,'heb-unshakeable-kingdom','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== JAMES (4 devotionals) =====
  // 58. Trials and temptation - teens
  ['jas-devo-trials','Consider It Pure Joy? Seriously?','JAS',1,2,8,
   'James opens with a shocking command: consider it pure joy when you face trials of many kinds, because the testing of your faith produces perseverance.',
   'James does not say feel joy. He says consider it joy — which is a decision, not an emotion. He is not telling you to enjoy suffering. He is telling you to see it differently. A gym workout is painful, but you consider it good because you know what it builds. James says trials are the gym for your soul. You do not have to like the workout. You just have to trust the process.',
   'What trial in your life might be building something in you?|Can you choose your perspective on a hard situation even when you cannot choose the situation itself?|What does perseverance look like in your life right now?',
   'If any of you lacks wisdom, let him ask God, who gives generously to all without finding fault. God does not lecture you for not knowing. He teaches you when you ask.',
   'teens',5,null,178,'jas-trials-and-temptation','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 59. Faith and works - adults
  ['jas-devo-faith-and-works','Faith That Does Nothing Is Nothing','JAS',2,14,26,
   'James asks: what good is it if someone claims to have faith but has no deeds? Can such faith save them? If a brother or sister is without clothes or food and you say go in peace, keep warm and well fed, but do nothing about their physical needs, what good is that?',
   'James is not contradicting Paul. He is completing him. Paul says you cannot earn salvation by works. James says real salvation works. Faith that does not move your hands and feet is not faith — it is a theory. If you believe God loves the poor and you walk past a hungry person, your belief is academic. James wants to see the receipts.',
   'Is your faith mostly in your head or does it show up in your actions?|When was the last time your faith cost you something tangible — time, money, comfort?|What is the difference between believing something and living it?',
   'Even the demons believe — and shudder. Believing the right things is the bare minimum. The question is not what do you believe but what does your belief make you do?',
   'adults',6,null,179,'jas-faith-and-works','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 60. Taming the tongue - young-children
  ['jas-devo-tongue','The Tiny Thing That Starts Big Fires','JAS',3,3,10,
   'James says the tongue is a small part of the body, but it makes great boasts. Consider what a great forest is set on fire by a small spark. The tongue is a fire.',
   'Your tongue is tiny, but it is powerful. A few mean words can ruin someone\'s whole day. A lie can break a friendship. A kind word can make someone smile for a week. James says your tongue is like the rudder on a big ship — small, but it steers everything. What you say matters more than almost anything else you do.',
   'Can you remember a time when someone\'s words really hurt you?|Can you remember a time when someone\'s words made you feel great?|What is one kind thing you could say to someone today?',
   'With the tongue we praise God and curse human beings who are made in his image. The same mouth. James says this should not be. The same spring cannot pour out both fresh water and salt water.',
   'young-children',4,null,180,'jas-taming-the-tongue','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 61. Rich and poor - family
  ['jas-devo-rich-poor','Your Money Is Not the Point','JAS',5,1,6,
   'James thunders against the rich: your wealth has rotted, and moths have eaten your clothes. Your gold and silver are corroded. You have hoarded wealth in the last days. You have failed to pay the workers who mowed your fields.',
   'James is not against wealth. He is against wealth that comes at someone else\'s expense. The specific sin here is withholding wages — getting rich by not paying the people who did the work. This is not ancient history. Every time someone underpays, exploits, or takes credit for someone else\'s labor, James is talking about them.',
   'Do you think about where your stuff comes from — who made it and whether they were paid fairly?|What does it mean to be generous versus just not being greedy?|How does our family think about money — is it a tool or a goal?',
   'The cries of the harvesters have reached the ears of the Lord Almighty. God hears the people who are not paid. Justice is not optional.',
   'family',5,null,181,'jas-rich-and-poor','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 1 PETER (2 devotionals) =====
  // 62. Living hope - family
  ['1pe-devo-living-hope','A Hope That Is Alive','1PE',1,3,9,
   'Peter writes to scattered, persecuted believers: praise be to the God who has given us new birth into a living hope through the resurrection of Jesus Christ. An inheritance that can never perish, spoil, or fade.',
   'Peter is writing to people who have lost their homes, been scattered across the Roman Empire, and face daily persecution. And he calls their hope living. Not a dead hope that you pull out on Sundays. A living, breathing, growing hope. An inheritance that cannot be stolen, cannot rot, and cannot fade. In the worst circumstances, Peter points to the most permanent thing.',
   'What makes hope feel alive versus dead?|Have you ever held onto hope when everything around you said to give up?|What does it mean to have something that can never perish, spoil, or fade?',
   'In all this you greatly rejoice, though now for a little while you may have had to suffer grief in various trials. For a little while. Peter puts suffering in a time frame. It is real, but it is temporary.',
   'family',5,null,182,'1pe-living-hope','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // 63. Suffering for good - teens
  ['1pe-devo-suffering-for-good','When Doing Right Gets You in Trouble','1PE',3,13,17,
   'Peter asks: who is going to harm you if you are eager to do good? But even if you should suffer for what is right, you are blessed. Do not fear their threats; do not be frightened. Always be prepared to give an answer for the hope that you have, but do it with gentleness and respect.',
   'Sometimes doing the right thing makes you unpopular. Standing up for the kid who gets bullied. Telling the truth when lying would be easier. Refusing to go along with the crowd. Peter does not promise this will go well for you in the short term. But he says: do it with gentleness and respect. You can be brave without being a jerk.',
   'When has doing the right thing cost you something?|How do you speak up for what you believe without being arrogant about it?|What does it look like to be prepared to explain your hope?',
   'Gentleness and respect. Peter says how you defend your faith matters as much as what you defend. Winning the argument while losing the person is not a win.',
   'teens',5,null,183,'1pe-suffering-for-good','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== 1 JOHN (1 devotional) =====
  // 64. God is love - young-children
  ['1jn-devo-god-is-love','God Is Love and Love Is Not Scared','1JN',4,7,19,
   'John writes: God is love. Whoever lives in love lives in God, and God in them. There is no fear in love, because perfect love drives out fear.',
   'If God is love, then every time you see real love — a parent comforting a scared child, a friend sticking by you, someone forgiving when they did not have to — you are seeing God. And if perfect love drives out fear, then the more you know how much God loves you, the less afraid you have to be. Love and fear cannot live in the same room.',
   'What are you most afraid of?|How does knowing you are loved make you less scared?|Where do you see God\'s love in your everyday life?',
   'We love because he first loved us. You do not start the loving. God does. You just love back.',
   'young-children',4,null,184,'1jn-love-one-another','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],

  // ===== REVELATION (1 devotional) =====
  // 65. New heaven new earth - family
  ['rev-devo-new-heaven','The Day God Moves In','REV',21,1,7,
   'John sees a vision of the new heaven and new earth: God\'s dwelling place is now among the people. He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.',
   'The Bible does not end with people going up to heaven. It ends with God coming down to earth. He will wipe every tear — not wave a hand and make you forget. Wipe. Like a parent wiping a child\'s face after a hard cry. Every single tear you have ever cried will be personally addressed by the God who made you. The pain was not pointless. It was temporary.',
   'What tear do you most want God to wipe away?|What does it mean that God comes to live with us — not that we escape to somewhere else?|If the end of the story is this good, how does that change today?',
   'He who was seated on the throne said: I am making everything new. Not I am making new things. He is making everything — including the broken things — new. Nothing is thrown away. Everything is redeemed.',
   'family',5,null,185,'rev-new-heaven-new-earth','ai_assisted','Acts-Epistles batch, generated 2026-04-03','2026-04-03T00:00:00Z'],
];

const TAGS = [
  // Acts devotionals
  ['act-devo-pentecost','courage-tag','primary'],
  ['act-devo-pentecost','change','secondary'],
  ['act-devo-early-church','generosity-tag','primary'],
  ['act-devo-early-church','relationships-tag','secondary'],
  ['act-devo-ananias','temptation-tag','primary'],
  ['act-devo-ananias','identity-tag','secondary'],
  ['act-devo-stephen','courage-tag','primary'],
  ['act-devo-stephen','forgiveness-tag','primary'],
  ['act-devo-stephen','suffering-tag','secondary'],
  ['act-devo-philip-ethiopian','relationships-tag','primary'],
  ['act-devo-philip-ethiopian','change','secondary'],
  ['act-devo-saul-conversion','change','primary'],
  ['act-devo-saul-conversion','identity-tag','secondary'],
  ['act-devo-peters-vision','change','primary'],
  ['act-devo-peters-vision','relationships-tag','secondary'],
  ['act-devo-antioch','relationships-tag','primary'],
  ['act-devo-antioch','courage-tag','secondary'],
  ['act-devo-jerusalem-council','relationships-tag','primary'],
  ['act-devo-jerusalem-council','patience-tag','secondary'],
  ['act-devo-paul-athens','courage-tag','primary'],
  ['act-devo-paul-athens','doubt-tag','secondary'],
  ['act-devo-ephesus-riot','courage-tag','primary'],
  ['act-devo-ephesus-riot','work-calling','secondary'],
  ['act-devo-pauls-farewell','relationships-tag','primary'],
  ['act-devo-pauls-farewell','suffering-tag','secondary'],
  ['act-devo-paul-agrippa','courage-tag','primary'],
  ['act-devo-paul-agrippa','identity-tag','secondary'],
  ['act-devo-shipwreck','fear-tag','primary'],
  ['act-devo-shipwreck','courage-tag','secondary'],
  ['act-devo-ascension','change','primary'],
  ['act-devo-ascension','doubt-tag','secondary'],
  ['act-devo-paul-rome','patience-tag','primary'],
  ['act-devo-paul-rome','courage-tag','secondary'],

  // Romans devotionals
  ['rom-devo-peace-with-god','suffering-tag','primary'],
  ['rom-devo-peace-with-god','patience-tag','secondary'],
  ['rom-devo-internal-war','temptation-tag','primary'],
  ['rom-devo-internal-war','doubt-tag','primary'],
  ['rom-devo-internal-war','identity-tag','secondary'],
  ['rom-devo-no-condemnation','identity-tag','primary'],
  ['rom-devo-no-condemnation','fear-tag','secondary'],
  ['rom-devo-nothing-separates','suffering-tag','primary'],
  ['rom-devo-nothing-separates','fear-tag','secondary'],
  ['rom-devo-nothing-separates','identity-tag','secondary'],
  ['rom-devo-living-sacrifice','work-calling','primary'],
  ['rom-devo-living-sacrifice','identity-tag','secondary'],
  ['rom-devo-all-have-sinned','identity-tag','primary'],
  ['rom-devo-all-have-sinned','forgiveness-tag','secondary'],
  ['rom-devo-dead-to-sin','identity-tag','primary'],
  ['rom-devo-dead-to-sin','change','primary'],
  ['rom-devo-dead-to-sin','temptation-tag','secondary'],
  ['rom-devo-strong-and-weak','relationships-tag','primary'],
  ['rom-devo-strong-and-weak','patience-tag','secondary'],

  // 1 Corinthians devotionals
  ['1co-devo-divisions','relationships-tag','primary'],
  ['1co-devo-divisions','identity-tag','secondary'],
  ['1co-devo-body-of-christ','relationships-tag','primary'],
  ['1co-devo-body-of-christ','identity-tag','secondary'],
  ['1co-devo-love-chapter','relationships-tag','primary'],
  ['1co-devo-love-chapter','patience-tag','secondary'],
  ['1co-devo-resurrection','doubt-tag','primary'],
  ['1co-devo-resurrection','courage-tag','secondary'],
  ['1co-devo-food-idols','relationships-tag','primary'],
  ['1co-devo-food-idols','temptation-tag','secondary'],
  ['1co-devo-lords-supper','relationships-tag','primary'],
  ['1co-devo-lords-supper','generosity-tag','secondary'],

  // 2 Corinthians devotionals
  ['2co-devo-comfort-suffering','suffering-tag','primary'],
  ['2co-devo-comfort-suffering','relationships-tag','secondary'],
  ['2co-devo-jars-of-clay','suffering-tag','primary'],
  ['2co-devo-jars-of-clay','identity-tag','secondary'],
  ['2co-devo-thorn','suffering-tag','primary'],
  ['2co-devo-thorn','doubt-tag','secondary'],
  ['2co-devo-thorn','patience-tag','secondary'],
  ['2co-devo-reconciliation','forgiveness-tag','primary'],
  ['2co-devo-reconciliation','identity-tag','primary'],
  ['2co-devo-reconciliation','relationships-tag','secondary'],

  // Galatians devotionals
  ['gal-devo-no-other-gospel','courage-tag','primary'],
  ['gal-devo-no-other-gospel','relationships-tag','secondary'],
  ['gal-devo-no-other-gospel','identity-tag','secondary'],
  ['gal-devo-fruit-of-spirit','identity-tag','primary'],
  ['gal-devo-fruit-of-spirit','patience-tag','secondary'],
  ['gal-devo-bear-burdens','relationships-tag','primary'],
  ['gal-devo-bear-burdens','generosity-tag','secondary'],
  ['gal-devo-faith-vs-law','identity-tag','primary'],
  ['gal-devo-faith-vs-law','doubt-tag','secondary'],

  // Ephesians devotionals
  ['eph-devo-saved-by-grace','identity-tag','primary'],
  ['eph-devo-saved-by-grace','work-calling','secondary'],
  ['eph-devo-unity','relationships-tag','primary'],
  ['eph-devo-unity','patience-tag','secondary'],
  ['eph-devo-armor-of-god','courage-tag','primary'],
  ['eph-devo-armor-of-god','fear-tag','secondary'],
  ['eph-devo-spiritual-blessings','identity-tag','primary'],
  ['eph-devo-spiritual-blessings','joy-tag','secondary'],

  // Philippians devotionals
  ['php-devo-joy-in-chains','joy-tag','primary'],
  ['php-devo-joy-in-chains','suffering-tag','primary'],
  ['php-devo-joy-in-chains','courage-tag','secondary'],
  ['php-devo-christ-hymn','identity-tag','primary'],
  ['php-devo-christ-hymn','generosity-tag','secondary'],
  ['php-devo-pressing-on','identity-tag','primary'],
  ['php-devo-pressing-on','change','secondary'],
  ['php-devo-pressing-on','failure','secondary'],
  ['php-devo-rejoice-contentment','joy-tag','primary'],
  ['php-devo-rejoice-contentment','stress','primary'],
  ['php-devo-rejoice-contentment','patience-tag','secondary'],

  // Colossians devotionals
  ['col-devo-supremacy','identity-tag','primary'],
  ['col-devo-supremacy','fear-tag','secondary'],
  ['col-devo-new-self','change','primary'],
  ['col-devo-new-self','relationships-tag','secondary'],
  ['col-devo-new-self','forgiveness-tag','secondary'],
  ['col-devo-fullness','identity-tag','primary'],
  ['col-devo-fullness','doubt-tag','secondary'],

  // 1 Thessalonians devotionals
  ['1th-devo-grief-and-hope','suffering-tag','primary'],
  ['1th-devo-grief-and-hope','fear-tag','secondary'],
  ['1th-devo-quiet-life','rest-tag','primary'],
  ['1th-devo-quiet-life','work-calling','primary'],
  ['1th-devo-quiet-life','patience-tag','secondary'],

  // 2 Thessalonians devotionals
  ['2th-devo-idle','work-calling','primary'],
  ['2th-devo-idle','patience-tag','secondary'],

  // Hebrews devotionals
  ['heb-devo-high-priest','suffering-tag','primary'],
  ['heb-devo-high-priest','temptation-tag','secondary'],
  ['heb-devo-high-priest','doubt-tag','secondary'],
  ['heb-devo-faith-hall','courage-tag','primary'],
  ['heb-devo-faith-hall','doubt-tag','secondary'],
  ['heb-devo-running-race','patience-tag','primary'],
  ['heb-devo-running-race','temptation-tag','secondary'],
  ['heb-devo-god-has-spoken','identity-tag','primary'],
  ['heb-devo-god-has-spoken','doubt-tag','secondary'],
  ['heb-devo-unshakeable','fear-tag','primary'],
  ['heb-devo-unshakeable','change','secondary'],
  ['heb-devo-unshakeable','suffering-tag','secondary'],

  // James devotionals
  ['jas-devo-trials','suffering-tag','primary'],
  ['jas-devo-trials','patience-tag','primary'],
  ['jas-devo-trials','courage-tag','secondary'],
  ['jas-devo-faith-and-works','work-calling','primary'],
  ['jas-devo-faith-and-works','generosity-tag','secondary'],
  ['jas-devo-tongue','relationships-tag','primary'],
  ['jas-devo-tongue','temptation-tag','secondary'],
  ['jas-devo-rich-poor','generosity-tag','primary'],
  ['jas-devo-rich-poor','work-calling','secondary'],

  // 1 Peter devotionals
  ['1pe-devo-living-hope','suffering-tag','primary'],
  ['1pe-devo-living-hope','joy-tag','secondary'],
  ['1pe-devo-living-hope','patience-tag','secondary'],
  ['1pe-devo-suffering-for-good','courage-tag','primary'],
  ['1pe-devo-suffering-for-good','suffering-tag','secondary'],
  ['1pe-devo-suffering-for-good','fear-tag','secondary'],

  // 1 John devotional
  ['1jn-devo-god-is-love','fear-tag','primary'],
  ['1jn-devo-god-is-love','relationships-tag','primary'],
  ['1jn-devo-god-is-love','identity-tag','secondary'],

  // Revelation devotional
  ['rev-devo-new-heaven','suffering-tag','primary'],
  ['rev-devo-new-heaven','joy-tag','primary'],
  ['rev-devo-new-heaven','fear-tag','secondary'],
];

const batch = db.transaction((devs, tags) => {
  for (const d of devs) ins.run(...d);
  for (const t of tags) tagIns.run(...t);
});

batch(DEVS, TAGS);

// Verify
const count = db.prepare('SELECT COUNT(*) as c FROM devotionals').get();
const tagCount = db.prepare('SELECT COUNT(*) as c FROM devotional_tag_map').get();
const audienceCounts = db.prepare("SELECT audience, COUNT(*) as c FROM devotionals GROUP BY audience ORDER BY audience").all();

console.log(`Inserted ${count.c} devotionals and ${tagCount.c} tag mappings`);
console.log('Audience breakdown:', JSON.stringify(audienceCounts));

db.close();
