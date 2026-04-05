const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ── Psalm 3 — Davidic, Lament (fleeing Absalom) ──
  ['david','PSA',3,1,null,'protagonist','desperate','crying out to God while fleeing his own son Absalom','survival and the pain of family betrayal','David flees his own son and still says the LORD sustains him. The psalm is a battlefield lullaby — he lay down and slept because God kept him.','Running from someone you raised and still managing to sleep because you trust the only one who has not turned on you.','canon'],

  // ── Psalm 4 — Davidic, Trust ──
  ['david','PSA',4,1,null,'protagonist','quiet confidence','answering critics with trust in God at nightfall','personal vindication and inner peace','David tells his enemies to search their hearts in silence on their beds. Then he lies down in peace. Evening psalms teach you how to end a day under fire.','The discipline of putting your phone down at night instead of arguing with strangers online.','canon'],

  // ── Psalm 5 — Davidic, Lament ──
  ['david','PSA',5,1,null,'protagonist','anguished','presenting his morning prayer against deceitful enemies','access to God versus the lies of the wicked','A morning counterpart to Psalm 4. David listens for God at dawn while liars scheme. He asks God to lead him in righteousness because the road is mined.','The morning prayer before walking into a workplace full of people who want you gone.','canon'],

  // ── Psalm 6 — Davidic, Penitential ──
  ['david','PSA',6,1,null,'protagonist','broken','begging God to relent from discipline because his bones are shaking','physical and spiritual collapse under divine correction','The first penitential psalm. David weeps so much his bed is soaked. Then suddenly he stands up — the LORD has heard. The turn is instant and unexplained.','Crying yourself to sleep and waking up knowing something shifted, even though nothing changed externally.','canon'],

  // ── Psalm 7 — Davidic, Lament ──
  ['david','PSA',7,1,null,'protagonist','desperate','pleading innocence against a slanderous accuser named Cush','the justice of God when false accusations fly','David invites God to judge him if he is guilty. He is so confident of his innocence he dares divine scrutiny. The psalm is a courtroom with God as judge.','Filing a defamation suit and being willing to testify under oath because you know the truth is on your side.','canon'],

  // ── Psalm 9 — Davidic, Praise ──
  ['david','PSA',9,1,null,'protagonist','exultant','praising God for executing justice against enemy nations','the fate of the wicked and the hope of the oppressed','David tells the whole story of what God has done — rebuked nations, blotted out names, overturned cities. The psalm is a victory parade in poetry.','The documentary that finally names the corrupt officials and shows they lost everything.','canon'],

  // ── Psalm 10 — Lament (anonymous, linked to Psalm 9) ──
  ['david','PSA',10,1,null,'protagonist','crying out','demanding to know why God stands far off while the wicked hunt the poor','the suffering of the vulnerable under systemic evil','The wicked says in his heart there is no God. The psalm catalogs exploitation with forensic detail — ambush, murder, scheming. Then it calls God to rise.','The investigative journalist documenting injustice and asking why nobody in power intervenes.','scholarship'],

  // ── Psalm 11 — Davidic, Trust ──
  ['david','PSA',11,1,null,'protagonist','quiet confidence','refusing to flee when the foundations are destroyed','standing firm when everything around you collapses','People tell David to flee like a bird. He answers: the LORD is in his holy temple. If the foundations are destroyed what can the righteous do? David does not answer the question — he redirects it.','Refusing to panic-sell when the market crashes because you trust the fundamentals.','canon'],

  // ── Psalm 12 — Davidic, Lament ──
  ['david','PSA',12,1,null,'protagonist','anguished','lamenting the disappearance of faithful people in a world of flattery and lies','the debasement of language and trust in society','Everyone lies. Flattering lips, double hearts. David contrasts human speech with God whose words are pure, refined seven times. The psalm is about the crisis of truth.','Living in an era of deepfakes and misinformation and clinging to the one source you know cannot lie.','canon'],

  // ── Psalm 14 — Davidic, Lament/Wisdom ──
  ['david','PSA',14,1,null,'protagonist','contemplative','diagnosing universal human corruption from God\'s vantage point','whether anyone on earth actually seeks God','The fool says there is no God. God looks down from heaven and sees — not one who does good. The psalm is a divine audit with catastrophic results.','The compliance review that finds every department cutting corners and nobody willing to admit it.','canon'],

  // ── Psalm 15 — Davidic, Wisdom ──
  ['david','PSA',15,1,null,'protagonist','contemplative','defining who may dwell in God\'s presence','moral fitness for worship','David asks who may live on God\'s holy mountain and then answers with a character profile — blameless conduct, truthful speech, no slander, keeps an oath even when it hurts.','The job description for the one role everyone wants but few qualify for, and the qualifications are all about character.','canon'],

  // ── Psalm 16 — Davidic, Trust ──
  ['david','PSA',16,1,null,'protagonist','resting in God','choosing God as his portion and refusing any other inheritance','ultimate loyalty and the path of life','David says the boundary lines have fallen in pleasant places. He has a beautiful inheritance. The psalm is radical contentment — not needing more because God is enough.','The person who turns down the bigger salary because the life they have already fits.','canon'],

  // ── Psalm 17 — Davidic, Lament ──
  ['david','PSA',17,1,null,'protagonist','desperate','pleading with God to examine his heart and defend him from deadly enemies','vindication of the innocent under lethal threat','David invites God to test him, try him, visit him in the night. He will find nothing because David has purposed his mouth will not transgress. Then he asks to be hidden under God\'s wings.','The accused who requests a polygraph because they know they are telling the truth.','canon'],

  // ── Psalm 18 — Davidic, Praise (deliverance from Saul) ──
  ['david','PSA',18,1,null,'protagonist','exultant','celebrating God\'s dramatic rescue from Saul and all his enemies','retrospective gratitude for survival against impossible odds','The longest thanksgiving in the Psalter. God reaches down, draws David out of many waters, sets his feet on a rock. Mountains shake, skies split. The rescue is cinematic.','The memoir written years after the crisis, where you finally see how close you came to not making it.','canon'],

  // ── Psalm 19 — Davidic, Praise/Wisdom ──
  ['david','PSA',19,1,null,'protagonist','overflowing with gratitude','marveling at God\'s two books — creation and scripture','the integration of natural revelation and written revelation','The heavens declare, and the law revives. David fuses astronomy and theology in a single poem. The sun rises like a bridegroom; the statutes are sweeter than honey.','Standing in a national park and reading a sacred text and realizing they are saying the same thing.','canon'],

  // ── Psalm 20 — Davidic, Royal ──
  ['david','PSA',20,1,null,'protagonist','kingly authority','blessing the king before battle with prayers for victory','national survival hinging on God\'s favor toward the anointed','A pre-battle liturgy. Some trust in chariots and some in horses, but we trust in the name of the LORD our God. The psalm is the national anthem before the war.','The locker room prayer before the championship game, except the stakes are life and death.','canon'],

  // ── Psalm 21 — Davidic, Royal ──
  ['david','PSA',21,1,null,'protagonist','coronation joy','celebrating the king\'s victories and God\'s answered prayers','the relationship between divine blessing and royal success','The king rejoices in God\'s strength. Everything he asked, God gave — long life, splendor, eternal blessings. The psalm is a coronation anniversary.','The year-end review where every goal was exceeded and the leader knows exactly who to credit.','canon'],

  // ── Psalm 24 — Davidic, Praise/Royal ──
  ['david','PSA',24,1,null,'protagonist','exultant','welcoming the King of Glory through the ancient gates','who is worthy to stand in God\'s holy place','The earth is the LORD\'s. Then the gates are told to lift their heads. Who is this King of Glory? The LORD strong and mighty. The psalm may have accompanied the ark entering Jerusalem.','The crowd parting as the procession passes — everyone stops to ask who is arriving.','canon'],

  // ── Psalm 25 — Davidic, Lament/Wisdom ──
  ['david','PSA',25,1,null,'protagonist','anguished','lifting his soul to God for guidance and forgiveness while surrounded by enemies','learning God\'s paths when your own have failed','An acrostic prayer. David asks for teaching, leading, truth — all while confessing his youthful sins. The psalm is a student\'s prayer: teach me, because I have made a mess on my own.','Going back to school after a career failure because you realize you need to relearn the fundamentals.','canon'],

  // ── Psalm 26 — Davidic, Trust ──
  ['david','PSA',26,1,null,'protagonist','quiet confidence','asking God to examine his integrity and distinguish him from hypocrites','moral separation from the corrupt','David washes his hands in innocence and walks around God\'s altar. He refuses to sit with the worthless or gather with hypocrites. The psalm is a purity audit.','The employee who requests an ethics review of their own department because they want to be cleared publicly.','canon'],

  // ── Psalm 27 — Davidic, Trust ──
  ['david','PSA',27,1,null,'protagonist','quiet confidence','seeking God\'s face as the one thing he desires above all else','spiritual longing in the midst of danger','The LORD is my light and my salvation — whom shall I fear? David wants one thing: to gaze upon the beauty of the LORD. The psalm splits between fierce confidence and tender longing.','The person who could ask for anything but only wants to be in the presence of someone they love.','canon'],

  // ── Psalm 28 — Davidic, Lament ──
  ['david','PSA',28,1,null,'protagonist','desperate','begging God not to be silent or else he will die like those going to the pit','the difference between divine silence and divine abandonment','David cries toward the holy of holies. If God stays silent, David is as good as dead. Then God hears, and David\'s heart leaps. The reversal is physical.','Calling someone in an emergency and hearing the line ring and ring and then finally they pick up.','canon'],

  // ── Psalm 29 — Davidic, Praise ──
  ['david','PSA',29,1,null,'protagonist','exultant','describing God\'s voice thundering across creation','the raw power of God displayed in a storm','Seven thunders. The voice of the LORD breaks cedars, shakes the wilderness, strips forests bare. And in his temple everyone says Glory. The psalm is a hurricane translated into worship.','Standing outside during a thunderstorm and feeling the smallness that is actually a relief.','canon'],

  // ── Psalm 30 — Davidic, Praise ──
  ['david','PSA',30,1,null,'protagonist','overflowing with gratitude','thanking God for healing after nearly dying','the reversal from mourning to dancing','Weeping may stay for the night, but joy comes in the morning. David was at the edge of the grave and God pulled him back. The psalm is the morning after the worst night.','The phone call from the doctor saying the results came back clear after weeks of dread.','canon'],

  // ── Psalm 31 — Davidic, Lament ──
  ['david','PSA',31,1,null,'protagonist','desperate','committing his spirit into God\'s hands while enemies plot and friends abandon him','total surrender when every human support has failed','Into your hands I commit my spirit. Jesus quoted this from the cross. David says it while alive — trusting God with his future when the present is unbearable.','Signing everything over to the one person you trust because you cannot manage it alone anymore.','canon'],

  // ── Psalm 32 — Davidic, Penitential/Wisdom ──
  ['david','PSA',32,1,null,'protagonist','repentant','teaching the relief of confessed sin after trying to hide it','the physical toll of unconfessed guilt','When David kept silent his bones wasted away. When he confessed, God forgave. The psalm proves that secrets have a body count — and honesty is the cure.','The weight that lifts when you finally tell someone the thing you have been carrying alone for years.','canon'],

  // ── Psalm 33 — Praise (anonymous) ──
  ['david','PSA',33,1,null,'referenced figure','exultant','calling the righteous to praise with instruments and a new song','God\'s sovereignty over nations and individuals','No attribution. The psalm sings a new song to God who made the heavens by his word. Armies do not save; horses do not deliver. Only God\'s eye rescues.','The crowd singing the national anthem at a moment of genuine unity — not performance but conviction.','scholarship'],

  // ── Psalm 34 — Davidic, Praise/Wisdom ──
  ['david','PSA',34,1,null,'protagonist','overflowing with gratitude','praising God after escaping King Abimelech by pretending to be insane','deliverance through humiliation','David pretended to be mad, drooling on his beard, and the king let him go. Now he writes an acrostic about tasting and seeing that the LORD is good. Dignity sacrificed, life saved.','The humiliating interview that somehow led to the best job of your life — you would do it again.','canon'],

  // ── Psalm 35 — Davidic, Lament ──
  ['david','PSA',35,1,null,'protagonist','anguished','pleading for God to fight his legal battles against treacherous former friends','betrayal by people he once cared for','David mourned for his enemies when they were sick. Now they rejoice at his stumbling. The psalm is the prayer of the person who was kind and got repaid with cruelty.','Discovering that the colleague you covered for has been undermining you to the boss.','canon'],

  // ── Psalm 36 — Davidic, Wisdom/Lament ──
  ['david','PSA',36,1,null,'protagonist','contemplative','contrasting the limitless love of God with the self-deception of the wicked','the source of life and light being God alone','The wicked flatters himself too much to detect or hate his sin. Meanwhile God\'s love reaches the heavens, his faithfulness the clouds. Two realities existing simultaneously.','The contrast between the CEO cooking the books in his office and the sunrise visible through his window.','canon'],

  // ── Psalm 37 — Davidic, Wisdom ──
  ['david','PSA',37,1,null,'protagonist','teaching','advising the faithful not to envy the wicked because their success is temporary','patience and trust when evil seems to win','Do not fret. Trust the LORD. Delight in the LORD. Commit your way. Be still. Wait patiently. The psalm is a masterclass in holy patience from an old man who has seen it all.','The grandfather who has watched every bully eventually lose and tells you to just keep showing up.','canon'],

  // ── Psalm 38 — Davidic, Penitential ──
  ['david','PSA',38,1,null,'protagonist','broken','describing the physical devastation of sin and divine discipline','total collapse of health, friendships, and dignity under guilt','David\'s wounds stink, his back burns, friends stand far off, enemies close in. The psalm is the most visceral description of sin\'s consequences in the Bible.','The intervention where everyone lists the damage and the person in the chair cannot argue with any of it.','canon'],

  // ── Psalm 39 — Davidic, Lament ──
  ['david','PSA',39,1,null,'protagonist','anguished','trying to stay silent about his suffering but finally bursting out','the brevity and futility of life when God seems hostile','David muzzled himself but the pain grew. Then he broke — show me how fleeting I am. Life is a breath, a shadow. The psalm is existential and offers no easy comfort.','The journal entry written at 3 AM when you have given up pretending everything is fine.','canon'],

  // ── Psalm 40 — Davidic, Praise/Lament ──
  ['david','PSA',40,1,null,'protagonist','overflowing with gratitude','testifying that God pulled him from a pit and put a new song in his mouth','the transition from rescue to renewed trouble','The first half is pure thanksgiving — God heard, God rescued, God put a new song in his mouth. Then the second half returns to crisis. The psalm shows that rescue is not permanent — you will need God again.','The person who just finished paying off debt and then gets an unexpected bill — but knows they survived before.','canon'],

  // ── Psalm 41 — Davidic, Lament/Wisdom ──
  ['david','PSA',41,1,null,'protagonist','anguished','enduring betrayal by a close friend who shared his bread','the sacred violation of table fellowship','Blessed is the one who considers the poor. Then David reveals his own poverty — a friend he trusted, who ate his bread, has turned against him. Jesus applied this to Judas.','The business partner who had dinner at your house last week and filed a lawsuit this morning.','canon'],

  // ── Psalm 42 — Sons of Korah, Lament ──
  ['david','PSA',42,1,null,'referenced figure','desperate','thirsting for God while enemies mock and ask where is your God','spiritual desolation far from the temple','As the deer pants for water, so my soul pants for you. The psalmist remembers leading processions to the house of God. Now tears are his food day and night. Memory of worship sustains him.','The immigrant who watches old videos of home on their phone every night before sleep.','scholarship'],

  // ── Psalm 43 — (continuation of 42), Lament ──
  ['david','PSA',43,1,null,'referenced figure','crying out','begging God to send light and truth to guide him back to the holy mountain','return from exile to worship','Send out your light and your truth — let them lead me. The psalmist wants to come home to God\'s altar and worship with the harp. The psalm is pure homesickness for God.','The traveler whose flight keeps getting delayed, staring at the departure board, just wanting to get home.','scholarship'],

  // ── Psalm 44 — Sons of Korah, Lament ──
  ['david','PSA',44,1,null,'referenced figure','anguished','protesting national defeat despite faithfulness','theodicy at the national level','Our fathers told us what you did in their day. But now you have rejected us. We have not forgotten you — why have you forgotten us? The psalm accuses God of sleeping.','The community that did everything right and still got hit by the disaster, asking what went wrong.','scholarship'],

  // ── Psalm 45 — Sons of Korah, Royal ──
  ['david','PSA',45,1,null,'referenced figure','coronation joy','celebrating a royal wedding with lavish praise for the king and his bride','the glory of the messianic king and his bride','A wedding song. The king is the most handsome of men. His bride forgets her people and enters the palace in gold. The psalm was read as messianic by both Jews and Christians.','The royal wedding broadcast that stops an entire nation — beauty, spectacle, and the hope of a dynasty.','scholarship'],

  // ── Psalm 46 — Sons of Korah, Trust ──
  ['david','PSA',46,1,null,'referenced figure','quiet confidence','declaring God as refuge even if the earth gives way and mountains fall into the sea','cosmic-level security in God alone','God is our refuge and strength. Nations rage, kingdoms fall, he utters his voice, the earth melts. Be still and know that I am God. The psalm inspired A Mighty Fortress.','The bunker that holds during the earthquake — and the voice from inside it that says stop running.','scholarship'],

  // ── Psalm 47 — Sons of Korah, Praise ──
  ['david','PSA',47,1,null,'referenced figure','exultant','calling all nations to clap and shout because God is king over the whole earth','universal worship of the one true God','Clap your hands, all peoples. God has gone up with a shout. The psalm sees a future where every nation worships. The scope is global before globalism existed.','The World Cup final where every country forgets their rivalries for a moment of shared wonder.','scholarship'],

  // ── Psalm 48 — Sons of Korah, Praise ──
  ['david','PSA',48,1,null,'referenced figure','exultant','praising God for making Zion impregnable and scattering enemy kings','the security of God\'s city and God\'s people','Kings assembled, they came together, they saw it, they were astounded, they fled in terror. God defends his city by reputation alone. The psalm is a travelogue of the holy city.','The city so well defended that armies take one look and turn around without firing a shot.','scholarship'],

  // ── Psalm 49 — Sons of Korah, Wisdom ──
  ['david','PSA',49,1,null,'referenced figure','contemplative','teaching that wealth cannot ransom anyone from death','the equality of death regardless of status','Rich and poor, listen together. No one can pay enough to live forever. The grave is the great equalizer. The psalm mocks the person who names lands after themselves.','The billionaire obituary that reads exactly like everyone else\'s — born, lived, died.','scholarship'],

  // ── Psalm 50 — Asaph, Wisdom/Prophetic ──
  ['david','PSA',50,1,null,'referenced figure','teaching','God summoning the earth to court and prosecuting empty ritualists','whether God needs your sacrifices (he does not)','God speaks — I do not need your bulls. Every animal in the forest is already mine. The psalm redefines worship as thanksgiving and faithfulness, not performance.','The boss telling the team to stop sending fancy reports and start actually doing the work.','scholarship'],

  // ── Psalm 52 — Davidic, Lament/Wisdom ──
  ['david','PSA',52,1,null,'protagonist','anguished','confronting Doeg the Edomite who betrayed the priests','the destructive power of a lying tongue','Doeg informed on the priests and Saul had them killed. David addresses the mighty man who boasts of evil. Your tongue is a sharpened razor. God will uproot you permanently.','The whistleblower who exposed the wrong people and got innocents fired — and the reckoning that followed.','canon'],

  // ── Psalm 53 — Davidic, Lament/Wisdom ──
  ['david','PSA',53,1,null,'protagonist','contemplative','restating the universal corruption of humanity from Psalm 14','whether practical atheism is as dangerous as theoretical atheism','Nearly identical to Psalm 14 but placed in a different collection. The fool says there is no God. The repetition is deliberate — the lesson needs repeating.','The same warning issued twice because nobody listened the first time.','canon'],

  // ── Psalm 54 — Davidic, Lament ──
  ['david','PSA',54,1,null,'protagonist','desperate','crying to God when the Ziphites betray his hiding place to Saul','survival when your own neighbors sell you out','Save me by your name. Strangers attack, ruthless men seek my life. But God is my helper. The psalm is compact — eight verses of pure crisis and trust.','The safe house that gets compromised and you have to trust the escape plan your mentor gave you.','canon'],

  // ── Psalm 55 — Davidic, Lament ──
  ['david','PSA',55,1,null,'protagonist','anguished','wishing for wings to fly away from a betraying friend','the unique devastation of intimate betrayal','If an enemy insulted me I could endure it. But it was you — my companion, my close friend. We walked to the house of God together. The psalm is the Bible\'s most personal betrayal poem.','The best friend who testified against you — and you still remember every good conversation.','canon'],

  // ── Psalm 56 — Davidic, Lament/Trust ──
  ['david','PSA',56,1,null,'protagonist','desperate','trusting God while the Philistines seize him in Gath','whether God keeps track of suffering','You have kept count of my tossings. Put my tears in your bottle. Are they not in your record? David believes God literally counts his sleepless nights and collects his tears.','The friend who remembers every hard thing you told them, even the ones you forgot you said.','canon'],

  // ── Psalm 57 — Davidic, Lament/Trust ──
  ['david','PSA',57,1,null,'protagonist','quiet confidence','hiding in a cave from Saul and choosing praise over panic','worship in the most confined and dangerous spaces','In the shadow of your wings I will take refuge till the storms of destruction pass. David is in a cave. Saul is outside. He writes a song. The cave becomes a cathedral.','Writing music in the basement apartment because you cannot afford the studio but the song will not wait.','canon'],

  // ── Psalm 58 — Davidic, Lament ──
  ['david','PSA',58,1,null,'protagonist','crying out','accusing unjust rulers of poisonous judgment','whether human courts can deliver real justice','The wicked are estranged from the womb. Their venom is like a cobra that stops its ears. David asks God to break their teeth. The psalm does not mince words about corrupt judges.','The court ruling so unjust that the public demands the entire bench be replaced.','canon'],

  // ── Psalm 59 — Davidic, Lament ──
  ['david','PSA',59,1,null,'protagonist','desperate','praying while Saul\'s agents watch his house waiting to kill him','immediate physical danger with no escape route','They return at evening, snarling like dogs, prowling the city. David calls his enemies strays. But he sings of God\'s strength in the morning. Night belongs to the dogs; dawn belongs to God.','The security camera showing intruders circling your house while you wait for the police.','canon'],

  // ── Psalm 60 — Davidic, Lament ──
  ['david','PSA',60,1,null,'protagonist','anguished','processing a military defeat and asking God to restore the nation','national recovery after a devastating loss','You have rejected us, God. You have broken through our defenses. You have made the land tremble. Give us aid against the enemy, for human help is worthless.','The team reviewing the game tape after a blowout loss, trying to figure out what went wrong.','canon'],

  // ── Psalm 61 — Davidic, Lament/Trust ──
  ['david','PSA',61,1,null,'protagonist','crying out','asking to be led to the rock that is higher than himself because his heart is faint','the need for something beyond your own strength','From the ends of the earth I call to you. Lead me to the rock that is higher than I. David admits he cannot climb this one alone. He needs to be carried.','Calling someone from the airport in a strange city and saying I do not know where to go — just come get me.','canon'],

  // ── Psalm 62 — Davidic, Trust ──
  ['david','PSA',62,1,null,'protagonist','resting in God','commanding his soul to find rest in God alone','the futility of trusting power or wealth','For God alone my soul waits in silence. Trust in him at all times. Pour out your hearts before him. People are a breath; riches are fleeting. The psalm is aggressive stillness.','The investor who puts everything in one fund and sleeps well because they did their research.','canon'],

  // ── Psalm 63 — Davidic, Trust/Praise ──
  ['david','PSA',63,1,null,'protagonist','quiet confidence','seeking God in a dry wilderness with a thirst that only God can satisfy','spiritual desire that surpasses physical need','My soul thirsts for you in a dry and weary land. Your love is better than life. David is in the wilderness of Judah, literally dehydrated, and still says God is enough.','Choosing to fast not because food is unavailable but because you want to feel how much you need what is invisible.','canon'],

  // ── Psalm 64 — Davidic, Lament ──
  ['david','PSA',64,1,null,'protagonist','anguished','asking God to protect him from conspirators who sharpen their tongues like swords','the lethal power of coordinated slander','They plot injustice and say who will see us? But God shoots them with a sudden arrow. The psalm shows that hidden schemes are never hidden from God.','The group chat where people coordinate attacks on someone\'s reputation — and the screenshot that exposes them all.','canon'],

  // ── Psalm 65 — Davidic, Praise ──
  ['david','PSA',65,1,null,'protagonist','overflowing with gratitude','praising God for answered prayer, forgiveness, and abundant harvests','the generosity of God displayed in creation','You crown the year with your bounty. The hills are clothed with gladness. The meadows shout for joy. The psalm turns harvest into worship and weather into theology.','The farmer standing in the field after the rain finally came, knowing the crop is saved.','canon'],

  // ── Psalm 66 — Praise (anonymous) ──
  ['david','PSA',66,1,null,'referenced figure','exultant','calling all the earth to shout joyfully and witness what God has done','public testimony of personal deliverance','Come and see what God has done. He turned the sea into dry land. Then the psalm shifts to first person — I will come with offerings because you heard my cry. Public and personal praise fused.','The survivor who stands before the audience and tells the story everyone needed to hear.','scholarship'],

  // ── Psalm 67 — Praise (anonymous) ──
  ['david','PSA',67,1,null,'referenced figure','exultant','praying for God\'s blessing so that all nations will know his ways','God\'s blessing as a means of global witness','May God be gracious to us and bless us — so that your way may be known on earth. The blessing is not for hoarding. It is a megaphone aimed at every nation.','The scholarship fund that exists not just to educate one person but to change an entire community.','scholarship'],

  // ── Psalm 68 — Davidic, Praise ──
  ['david','PSA',68,1,null,'protagonist','exultant','describing God\'s triumphal march from Sinai to Zion scattering enemies','the unstoppable advance of God through history','Let God arise, let his enemies be scattered. The psalm is a military parade — captives led, gifts received, kings fleeing. God rides through the heavens on the ancient clouds.','The ticker-tape parade for the returning heroes, except the hero is God and the parade route spans centuries.','canon'],

  // ── Psalm 69 — Davidic, Lament ──
  ['david','PSA',69,1,null,'protagonist','desperate','sinking in deep waters with no foothold, hated without cause','the isolation of the faithful servant of God','Save me, O God, for the waters have come up to my neck. I sink in deep mire. The psalm is quoted more in the New Testament than almost any other — Jesus lived its every word.','Drowning in a situation where calling for help only makes more people watch.','canon'],

  // ── Psalm 70 — Davidic, Lament ──
  ['david','PSA',70,1,null,'protagonist','desperate','begging God to hurry because he is poor and needy','the urgency of unanswered prayer','Hasten to help me, O LORD. Do not delay. Five verses of pure emergency. The psalm is the 911 call of the Psalter — no time for theology, just come now.','Dialing emergency services and repeating the address three times because every second matters.','canon'],

  // ── Psalm 71 — Lament (anonymous, likely elderly David) ──
  ['david','PSA',71,1,null,'protagonist','desperate','praying not to be cast off in old age when strength is spent','whether God stays faithful to the very end of a long life','Do not cast me off in the time of old age. Do not forsake me when my strength is gone. The psalm is an old man\'s prayer — looking back at a lifetime of rescues, begging for one more.','The retiree in the hospital asking God for the same faithfulness they experienced fifty years ago.','scholarship'],

  // ── Psalm 72 — Solomon, Royal ──
  ['solomon','PSA',72,1,null,'protagonist','kingly authority','praying for a king who will judge the poor with righteousness and rule from sea to sea','the ideal kingdom of justice and peace','Give the king your justice, O God. He will defend the afflicted, crush the oppressor, and reign as long as the sun endures. The psalm is the blueprint for every kingdom that never quite arrived.','The campaign speech that describes the government everyone wishes existed — and the prayer that one day it will.','canon'],

  // ── Psalm 74 — Asaph, Lament ──
  ['david','PSA',74,1,null,'referenced figure','anguished','mourning the destruction of the temple and asking God how long','national devastation when the sacred center is destroyed','They burned your sanctuary to the ground. They set up their own banners as signs. We see no signs, no prophets, no one knows how long. The psalm is the prayer of Ground Zero.','Standing in the ruins of the building where your community gathered, asking when it can be rebuilt.','scholarship'],

  // ── Psalm 75 — Asaph, Praise/Prophetic ──
  ['david','PSA',75,1,null,'referenced figure','quiet confidence','declaring that God himself sets the time for judgment and will level every boast','divine timing in executing justice','God says: at the set time I will judge with equity. The earth trembles but I hold its pillars firm. The psalm trusts the judge\'s calendar even when the trial seems overdue.','The prosecutor who tells the public to be patient because the indictment is coming at exactly the right moment.','scholarship'],

  // ── Psalm 76 — Asaph, Praise ──
  ['david','PSA',76,1,null,'referenced figure','exultant','celebrating God\'s terrifying victory from Zion that left warriors asleep in death','the awe-inspiring judgment of God against aggressors','God broke the flashing arrows, the shields, the swords. Stouthearted warriors were stripped of spoil and slept their last sleep. The psalm makes war itself bow.','The defense system so overwhelming that the attacking army simply shut down before reaching the border.','scholarship'],

  // ── Psalm 77 — Asaph, Lament ──
  ['david','PSA',77,1,null,'referenced figure','anguished','lying awake at night wondering if God has permanently rejected his people','whether God\'s character has changed','Has God forgotten to be gracious? Has he in anger shut up his compassion? Then the psalmist remembers the exodus. Memory rescues theology. He recalls what God did and clings to it.','Scrolling through old photos on a bad night to remember that good things did happen and can happen again.','scholarship'],

  // ── Psalm 78 — Asaph, Wisdom/Historical ──
  ['david','PSA',78,1,null,'referenced figure','teaching','retelling Israel\'s entire history as a cautionary tale for the next generation','whether the children will repeat the failures of the fathers','The longest historical psalm. It recounts every rebellion, every rescue, every relapse. The point: do not be like your ancestors. Remember. The psalm is the curriculum of a civilization.','The family history book written so the grandchildren do not make the same mistakes.','scholarship'],

  // ── Psalm 79 — Asaph, Lament ──
  ['david','PSA',79,1,null,'referenced figure','desperate','mourning the destruction of Jerusalem and the slaughter of the faithful','national survival and God\'s reputation among the nations','The nations have invaded your inheritance. They have laid Jerusalem in ruins. The dead are left unburied. How long, LORD? The psalm measures grief in bodies and rubble.','The news footage of a city in ruins and the desperate prayer from the diaspora watching on screens.','scholarship'],

  // ── Psalm 80 — Asaph, Lament ──
  ['david','PSA',80,1,null,'referenced figure','crying out','begging God to restore Israel using the image of a vine he once planted and now abandoned','whether God will tend his vineyard again or let it burn','You transplanted a vine from Egypt. It took root, filled the land. Then you broke down its walls. Why? Restore us, O God. Let your face shine. The psalm repeats the refrain like a mantra.','The family business that was thriving until the founder stepped away, and now the children beg him to come back.','scholarship'],

  // ── Psalm 81 — Asaph, Praise/Prophetic ──
  ['david','PSA',81,1,null,'referenced figure','teaching','God himself speaking to Israel about their stubbornness and what he would have given them','the tragedy of unreceived blessing','Sing aloud! Blow the trumpet! Then God speaks: I am the LORD who brought you out of Egypt. Open your mouth wide and I will fill it. But my people did not listen. The lost blessings haunt.','The scholarship that expired because nobody applied — the giver shaking their head at what could have been.','scholarship'],

  // ── Psalm 82 — Asaph, Prophetic ──
  ['david','PSA',82,1,null,'referenced figure','teaching','God standing in the divine council and condemning unjust judges who will die like mortals','accountability of those in power','God stands in the great assembly and judges the judges. How long will you defend the unjust? You are gods, but you will die like mere mortals. The psalm strips every title from corrupt authority.','The oversight board revoking the licenses of judges who took bribes — you had power and you wasted it.','scholarship'],

  // ── Psalm 83 — Asaph, Lament ──
  ['david','PSA',83,1,null,'referenced figure','desperate','pleading for God to act against a coalition of nations conspiring to destroy Israel','national extinction by coordinated enemies','They say come, let us destroy them as a nation, that the name of Israel be remembered no more. Ten nations listed by name. The psalm is a roll call of existential threats.','The small company discovering that every competitor has formed an alliance specifically to put them out of business.','scholarship'],

  // ── Psalm 84 — Sons of Korah, Praise/Trust ──
  ['david','PSA',84,1,null,'referenced figure','overflowing with gratitude','longing for God\'s house with every fiber of his being','the ache of separation from worship','How lovely is your dwelling place. My soul yearns, even faints, for the courts of the LORD. Even the sparrow has found a home near your altar. Better one day in your courts than a thousand elsewhere.','The feeling of walking into the place where you belong after being away too long — your whole body exhales.','scholarship'],

  // ── Psalm 85 — Sons of Korah, Lament/Praise ──
  ['david','PSA',85,1,null,'referenced figure','quiet confidence','asking God to revive his people again after a season of discipline','national renewal after justified punishment','Love and faithfulness meet together. Righteousness and peace kiss each other. The psalm envisions a future where God\'s character attributes hold a reunion in the land.','The post-war reconstruction where former enemies sit at the same table and build something new together.','scholarship'],

  // ── Psalm 86 — Davidic, Lament ──
  ['david','PSA',86,1,null,'protagonist','desperate','a poor and needy servant calling on a compassionate and gracious God all day long','the daily dependence of the helpless on God','Hear me, LORD, for I am poor and needy. You are forgiving and good, abounding in love. Teach me your way. Give me an undivided heart. David wants one thing: a heart that does not split.','The daily prayer of someone in recovery who knows they cannot make it without help every single hour.','canon'],

  // ── Psalm 87 — Sons of Korah, Praise ──
  ['david','PSA',87,1,null,'referenced figure','exultant','declaring that Zion is the birthplace of all nations in God\'s register','the universal scope of God\'s city','Glorious things are said of you, city of God. Among those who know me I count Rahab, Babylon, Philistia, Tyre, Cush — this one was born in Zion. God\'s birth registry includes everyone.','The city whose birth certificate includes immigrants from every continent — and claims them all as native.','scholarship'],

  // ── Psalm 89 — Ethan the Ezrahite, Lament/Royal ──
  ['david','PSA',89,1,null,'referenced figure','anguished','recalling God\'s covenant with David\'s dynasty and then mourning its apparent collapse','whether God\'s promises can fail','You said: I have made a covenant with David. His throne will endure forever. But now you have rejected, you have renounced. The psalm is the longest unanswered question in the Psalter.','The contract you signed that the other party seems to have forgotten — and you are holding the original copy, asking when.','scholarship'],

  // ── Psalm 91 — Trust (anonymous) ──
  ['david','PSA',91,1,null,'referenced figure','resting in God','declaring total protection for the one who dwells in the shelter of the Most High','divine security against every category of danger','A thousand may fall at your side, ten thousand at your right hand, but it will not come near you. The psalm names every fear — plague, arrow, lion, cobra — and answers each one.','The bodyguard brief that covers every scenario and ends with: you will be fine because the principal is God.','scholarship'],

  // ── Psalm 92 — Praise (Sabbath song) ──
  ['david','PSA',92,1,null,'referenced figure','overflowing with gratitude','declaring that it is good to praise the LORD and sing to his name on the Sabbath','the flourishing of the righteous over a lifetime','The righteous flourish like a palm tree, they grow like a cedar in Lebanon. They still bear fruit in old age. The psalm is the Sabbath celebration of a life well-rooted.','The eighty-year-old still volunteering, still sharp, still bearing fruit — proof that some trees never stop growing.','scholarship'],

  // ── Psalm 93 — Praise (enthronement) ──
  ['david','PSA',93,1,null,'referenced figure','exultant','proclaiming that the LORD reigns, robed in majesty, and the world is firmly established','the stability of God\'s throne above the chaos of the floods','The LORD reigns. The seas have lifted up their voice, the seas have lifted up their pounding waves. Mightier than the breakers is the LORD on high. Order over chaos.','The lighthouse standing firm in the hurricane while the waves crash and break around it — unmoved, still lit.','scholarship'],

  // ── Psalm 94 — Lament (anonymous) ──
  ['david','PSA',94,1,null,'referenced figure','crying out','demanding that the God of vengeance shine forth against arrogant oppressors','whether God sees injustice or looks the other way','They crush your people, LORD. They kill the widow, the foreigner, the fatherless. Does he who fashioned the ear not hear? The psalm insists God is not indifferent.','The survivors testifying before the tribunal, insisting that someone with authority must have been watching.','scholarship'],

  // ── Psalm 95 — Praise/Warning (anonymous) ──
  ['david','PSA',95,1,null,'referenced figure','exultant','inviting worship with joy and then warning against hardening hearts like at Meribah','the danger of praise without obedience','Come, let us sing for joy. Then the tone shifts — do not harden your hearts as at Meribah. Worship that does not lead to obedience leads to wandering for forty years.','The church that sings loudly on Sunday and ignores the homeless on Monday — the psalm is written for them.','scholarship'],

  // ── Psalm 96 — Praise (enthronement) ──
  ['david','PSA',96,1,null,'referenced figure','exultant','calling all the earth to sing a new song because the LORD comes to judge with equity','universal worship from every nation and all creation','Sing to the LORD a new song. Let the heavens rejoice, the earth be glad, the sea resound, the fields be jubilant, the trees sing for joy. All creation is a choir.','The concert where even the people who came reluctantly end up singing along because the music is that good.','scholarship'],

  // ── Psalm 97 — Praise (enthronement) ──
  ['david','PSA',97,1,null,'referenced figure','exultant','declaring that the LORD reigns with fire, lightning, and mountains melting like wax','the consuming holiness of God that exposes every idol','The LORD reigns — clouds and thick darkness surround him. Fire goes before him. The mountains melt like wax. Every idol is put to shame. The psalm is terrifying and beautiful.','The thunderstorm that knocks out the power grid and reminds everyone that nature does not answer to technology.','scholarship'],

  // ── Psalm 98 — Praise (anonymous) ──
  ['david','PSA',98,1,null,'referenced figure','exultant','commanding all creation to make music because God has revealed his righteousness to the nations','the celebration of divine victory made visible','Sing a new song, for he has done marvelous things. Rivers clap their hands, mountains sing together for joy. The psalm hears music in geography.','The flash mob that starts with one person and ends with the entire plaza singing the same song.','scholarship'],

  // ── Psalm 99 — Praise (enthronement) ──
  ['david','PSA',99,1,null,'referenced figure','exultant','proclaiming the LORD reigns and calling the nations to tremble at his holy name','the holiness of God as the defining attribute','The LORD reigns — let the nations tremble. He is holy. Moses, Aaron, Samuel called on his name and he answered. The psalm repeats holy like a bell.','The courtroom where everyone rises when the judge enters — not custom but genuine reverence.','scholarship'],

  // ── Psalm 100 — Praise (anonymous) ──
  ['david','PSA',100,1,null,'referenced figure','exultant','commanding all the earth to worship with gladness and enter God\'s gates with thanksgiving','the simplest and most universal call to worship','Shout for joy to the LORD, all the earth. Know that the LORD is God. We are his people, the sheep of his pasture. Five verses. No caveats. Just worship.','The song everyone knows the words to — the one that needs no introduction and never gets old.','scholarship'],

  // ── Psalm 101 — Davidic, Royal/Wisdom ──
  ['david','PSA',101,1,null,'protagonist','kingly authority','making a covenant of integrity for his household and kingdom','the moral standard of a godly ruler','I will walk with integrity of heart within my house. I will not look at anything vile. Whoever slanders secretly, I will destroy. No one who practices deceit will dwell in my house.','The new governor publishing their ethics policy on day one and actually living by it.','canon'],

  // ── Psalm 102 — Penitential (anonymous afflicted one) ──
  ['david','PSA',102,1,null,'referenced figure','broken','pouring out a lament as an afflicted person wasting away while Zion lies in ruins','personal suffering mirroring national devastation','My days vanish like smoke, my bones burn. I eat ashes like bread. I am like an owl among the ruins. But you, LORD, endure forever. The psalm pivots from personal decay to eternal hope.','Writing your will in the hospital and then looking out the window and remembering that spring always comes.','scholarship'],

  // ── Psalm 104 — Praise (anonymous creation hymn) ──
  ['david','PSA',104,1,null,'referenced figure','overflowing with gratitude','cataloging the wonders of creation from light to leviathan','the artistry and generosity of God in nature','He wraps himself in light as a garment. He makes the clouds his chariot. He waters the mountains. He makes grass grow for cattle and wine that gladdens the heart. The psalm is Genesis 1 set to music.','The nature documentary narrated by someone who actually knows the filmmaker personally.','scholarship'],

  // ── Psalm 105 — Praise/Historical (anonymous) ──
  ['david','PSA',105,1,null,'referenced figure','exultant','retelling Israel\'s history from Abraham to the promised land as a story of God\'s faithfulness','the continuity of God\'s promises across generations','He remembers his covenant forever — the word he commanded for a thousand generations. Abraham, Isaac, Jacob, Joseph, Moses, the plagues, the exodus, the land. Every promise kept.','The family reunion slideshow that traces the family from immigration to the present, with every answered prayer noted.','scholarship'],

  // ── Psalm 106 — Lament/Historical (anonymous) ──
  ['david','PSA',106,1,null,'referenced figure','repentant','confessing Israel\'s long history of rebellion despite God\'s relentless mercy','whether God\'s patience has a limit','We have sinned like our fathers. They forgot his works. They grumbled. They made a calf. They envied Moses. Again and again he delivered them — and again and again they rebelled.','The parole hearing where the defendant reads the full record of their offenses before asking for mercy one more time.','scholarship'],

  // ── Psalm 107 — Praise (anonymous) ──
  ['david','PSA',107,1,null,'referenced figure','overflowing with gratitude','gathering four stories of people who cried to the LORD in trouble and were rescued','the pattern of distress, prayer, and deliverance','Some wandered in deserts. Some sat in darkness. Some were fools who suffered. Some went to sea. Each time they cried out, and each time God saved. The psalm is the same story told four ways.','The support group where everyone shares a different crisis but the rescue has the same shape every time.','scholarship'],

  // ── Psalm 108 — Davidic, Praise/Lament ──
  ['david','PSA',108,1,null,'protagonist','quiet confidence','waking up to praise God with music and then asking for help in battle','the integration of worship and warfare','My heart is steadfast, O God. I will awaken the dawn. Then David shifts to war — who will bring me to the fortified city? The psalm combines the hymnal and the battle plan.','The soldier who prays before dawn and then picks up the radio to coordinate the operation.','canon'],

  // ── Psalm 109 — Davidic, Lament ──
  ['david','PSA',109,1,null,'protagonist','anguished','unleashing the most severe imprecations in the Psalter against a betrayer','the cry for divine justice when human justice is impossible','Let his days be few. Let his children be fatherless. The curses are brutal. But they are prayers — David hands the vengeance to God instead of taking it himself.','The victim impact statement that holds nothing back because the courtroom is the one place you are allowed to say it all.','canon'],

  // ── Psalm 110 — Davidic, Royal/Messianic ──
  ['david','PSA',110,1,null,'protagonist','kingly authority','recording an oracle from God to the Messiah: sit at my right hand until I make your enemies your footstool','the identity and reign of the priest-king','The LORD says to my Lord: Sit at my right hand. You are a priest forever in the order of Melchizedek. The most-quoted psalm in the New Testament. David sees someone greater than himself.','The founder writing a succession plan that describes a leader they know they could never be.','canon'],

  // ── Psalm 111 — Praise (anonymous acrostic) ──
  ['david','PSA',111,1,null,'referenced figure','exultant','praising God\'s works in an acrostic poem that catalogs his faithfulness','the public declaration of private gratitude','Great are the works of the LORD, studied by all who delight in them. He provides food, remembers his covenant, sends redemption. The fear of the LORD is the beginning of wisdom.','The acceptance speech that lists every person who helped, because the winner knows they did not do it alone.','scholarship'],

  // ── Psalm 112 — Wisdom (anonymous acrostic) ──
  ['david','PSA',112,1,null,'referenced figure','contemplative','describing the blessed life of the person who fears the LORD','the practical rewards of righteousness','Wealth and riches are in his house. He is generous and lends freely. He will never be shaken. Bad news does not frighten him because his heart is secure. The psalm is the resume of the righteous.','The person who gives extravagantly, sleeps peacefully, and never checks the stock market because their real portfolio is elsewhere.','scholarship'],

  // ── Psalm 113 — Praise (Hallel) ──
  ['david','PSA',113,1,null,'referenced figure','exultant','praising God who stoops down from the heights to lift the poor from the dust','the character of a God who descends to elevate','Who is like the LORD our God, who is seated on high, who looks far down on the heavens and the earth? He raises the poor from the dust. The psalm is the Magnificat before Mary sang it.','The CEO who eats lunch in the cafeteria with the interns — not for optics but because that is who they are.','scholarship'],

  // ── Psalm 114 — Praise (Hallel) ──
  ['david','PSA',114,1,null,'referenced figure','exultant','retelling the exodus as a cosmic event where the sea fled and mountains skipped','the personification of nature responding to God','The sea looked and fled. The Jordan turned back. The mountains skipped like rams. Why? Because God showed up. The psalm turns geology into comedy — nature panicking before its maker.','The office that goes completely silent when the boss unexpectedly walks in — except the office is the Red Sea.','scholarship'],

  // ── Psalm 115 — Praise (Hallel) ──
  ['david','PSA',115,1,null,'referenced figure','quiet confidence','contrasting the living God with dead idols that have mouths but cannot speak','the absurdity of worshipping what you made with your own hands','Their idols are silver and gold, made by human hands. They have mouths but cannot speak, eyes but cannot see. Those who make them become like them. The psalm is the original anti-consumerism manifesto.','Spending all day staring at a screen that cannot love you back and slowly becoming as lifeless as the pixels.','scholarship'],

  // ── Psalm 116 — Praise (Hallel) ──
  ['david','PSA',116,1,null,'referenced figure','overflowing with gratitude','loving God because he heard the cry for help when death was near','the personal bond forged through answered prayer','I love the LORD because he heard my voice. The cords of death entangled me. I called on the name of the LORD. He saved me. What shall I return? I will lift the cup of salvation.','The patient leaving the ICU who cannot stop hugging the nurses and promising to live differently.','scholarship'],

  // ── Psalm 117 — Praise (Hallel, shortest psalm) ──
  ['david','PSA',117,1,null,'referenced figure','exultant','calling all nations to praise the LORD for his steadfast love and faithfulness','the universality of God\'s love in the fewest possible words','Two verses. Every nation. Every people. Great is his steadfast love. His faithfulness endures forever. The shortest psalm says everything that needs to be said.','The wedding toast that is only two sentences long but makes everyone cry because it is perfectly true.','scholarship'],

  // ── Psalm 118 — Praise (Hallel) ──
  ['david','PSA',118,1,null,'referenced figure','exultant','celebrating the stone the builders rejected becoming the cornerstone','the reversal of human rejection by divine election','Give thanks to the LORD for he is good. The stone the builders rejected has become the cornerstone. This is the day the LORD has made. The psalm Jesus sang on his way to the cross.','The rejection letter that turned into the origin story — the company that passed on you watching you build something bigger.','scholarship'],

  // ── Psalm 120 — Lament (Songs of Ascents) ──
  ['david','PSA',120,1,null,'referenced figure','anguished','crying for deliverance from lying lips while living among hostile people','the exhaustion of living surrounded by deceit','I am for peace, but when I speak they are for war. The first Song of Ascents begins in exile and complaint. The pilgrimage to Jerusalem starts from the worst possible address.','Starting the road trip from the town you hate, which is exactly why you need the journey.','scholarship'],

  // ── Psalm 121 — Trust (Songs of Ascents) ──
  ['david','PSA',121,1,null,'referenced figure','resting in God','looking up to the hills and asking where help comes from','divine protection on a dangerous journey','I lift up my eyes to the mountains — where does my help come from? My help comes from the LORD. He will not let your foot slip. He who watches you will not slumber.','The GPS voice that says recalculating but never abandons you, even on the worst back roads at midnight.','scholarship'],

  // ── Psalm 122 — Davidic, Praise (Songs of Ascents) ──
  ['david','PSA',122,1,null,'protagonist','overflowing with gratitude','rejoicing at the invitation to go to the house of the LORD','the joy of communal worship in Jerusalem','I rejoiced with those who said to me let us go to the house of the LORD. Our feet are standing in your gates, Jerusalem. Pray for the peace of Jerusalem. The psalm is arrival after longing.','The moment the plane touches down in the city you have been homesick for — and someone is waiting at the gate.','canon'],

  // ── Psalm 123 — Lament (Songs of Ascents) ──
  ['david','PSA',123,1,null,'referenced figure','desperate','lifting eyes to God as servants look to the hand of their master, begging for mercy against contempt','enduring the scorn of the comfortable and proud','As the eyes of slaves look to the hand of their master, so our eyes look to the LORD. Have mercy on us, for we have endured no end of contempt. The psalm is pure upward gaze.','The employee waiting for the boss to notice them, not to promote them but just to stop the bullying.','scholarship'],

  // ── Psalm 124 — Davidic, Praise (Songs of Ascents) ──
  ['david','PSA',124,1,null,'protagonist','overflowing with gratitude','imagining what would have happened if the LORD had not been on their side','retrospective terror at how close disaster came','If the LORD had not been on our side, they would have swallowed us alive. The flood would have swept us away. Our help is in the name of the LORD. The psalm is the shudder after the near-miss.','Watching the dashcam footage and realizing the other car missed you by inches — and going quiet.','canon'],

  // ── Psalm 125 — Trust (Songs of Ascents) ──
  ['david','PSA',125,1,null,'referenced figure','resting in God','declaring that those who trust the LORD are like Mount Zion — immovable','the stability of the faithful versus the crookedness of the wicked','Those who trust in the LORD are like Mount Zion, which cannot be shaken but endures forever. As the mountains surround Jerusalem, so the LORD surrounds his people.','The house built on bedrock while the ones on sand wash away — you feel the storm but you do not move.','scholarship'],

  // ── Psalm 126 — Praise (Songs of Ascents) ──
  ['david','PSA',126,1,null,'referenced figure','exultant','remembering the joy of return from exile when it felt like dreaming','the harvest of joy that follows the sowing of tears','When the LORD restored the fortunes of Zion, we were like those who dreamed. Those who sow with tears will reap with songs of joy. The psalm promises a harvest for every grief.','The refugee family returning to their rebuilt home and laughing because it does not feel real yet.','scholarship'],

  // ── Psalm 127 — Solomon, Wisdom (Songs of Ascents) ──
  ['solomon','PSA',127,1,null,'protagonist','teaching','teaching that without the LORD building the house, all human labor is futile','the sovereignty of God over work, rest, and family','Unless the LORD builds the house, the builders labor in vain. He grants sleep to those he loves. Children are a heritage from the LORD. The psalm redefines productivity as partnership with God.','The entrepreneur who finally stops working eighteen-hour days and realizes the business runs better when they rest.','canon'],

  // ── Psalm 128 — Wisdom (Songs of Ascents) ──
  ['david','PSA',128,1,null,'referenced figure','quiet confidence','blessing the one who fears the LORD with a fruitful home and prosperous life','the ordinary joy of a faithful household','Your wife will be like a fruitful vine. Your children like olive shoots around your table. The psalm celebrates the domestic and the daily. No war, no crisis — just dinner at home.','The family photo on the mantle that nobody famous would recognize but everyone in the house would die for.','scholarship'],

  // ── Psalm 129 — Lament (Songs of Ascents) ──
  ['david','PSA',129,1,null,'referenced figure','quiet confidence','testifying that though enemies have attacked since youth, they have not prevailed','survival through persistent oppression','They have greatly oppressed me from my youth — but they have not gained the victory over me. Plowers plowed my back and made their furrows long. But the LORD has cut the cords.','The scars that prove you survived what was meant to destroy you — each one a mark of endurance.','scholarship'],

  // ── Psalm 130 — Penitential (Songs of Ascents) ──
  ['david','PSA',130,1,null,'referenced figure','repentant','crying from the depths for God\'s forgiveness and waiting for his word more than watchmen wait for morning','the possibility of mercy when guilt is undeniable','Out of the depths I cry to you, LORD. If you kept a record of sins, who could stand? But with you there is forgiveness. My soul waits for the Lord more than watchmen wait for the morning.','The 4 AM confession when the night is longest and the only thing you can do is wait for the light to come.','scholarship'],

  // ── Psalm 131 — Davidic, Trust (Songs of Ascents) ──
  ['david','PSA',131,1,null,'protagonist','resting in God','quieting his soul like a weaned child resting on its mother','the discipline of not reaching for what is beyond you','My heart is not proud. My eyes are not haughty. I do not concern myself with matters too great for me. I have calmed and quieted myself like a weaned child. Three verses of radical peace.','The executive who stops checking email on vacation and discovers they are not as indispensable as they thought.','canon'],

  // ── Psalm 132 — Royal (Songs of Ascents) ──
  ['david','PSA',132,1,null,'referenced figure','kingly authority','recalling David\'s vow to find a dwelling place for the LORD and God\'s oath to establish his dynasty','the covenant between God and David\'s house, centered on the temple','David swore he would not rest until he found a place for the LORD. God swore David\'s sons would sit on his throne forever. Two oaths, one bond — the psalm is a double promise.','The handshake deal between a founder and an investor where both put everything on the line because the vision is that big.','scholarship'],

  // ── Psalm 133 — Davidic, Wisdom (Songs of Ascents) ──
  ['david','PSA',133,1,null,'protagonist','quiet confidence','celebrating the rare and precious gift of unity among brothers','the beauty and fragility of community','How good and pleasant it is when God\'s people live together in unity. It is like oil running down Aaron\'s beard, like dew on Mount Hermon. Three verses on the rarest thing in the world.','The family reunion where nobody argues and everyone is genuinely glad to be together — and everyone knows how rare this is.','canon'],

  // ── Psalm 134 — Praise (Songs of Ascents) ──
  ['david','PSA',134,1,null,'referenced figure','exultant','calling the night-shift priests to lift their hands and bless the LORD','worship that happens when no one is watching','Praise the LORD, all you servants who minister by night in the house of the LORD. Three verses. The last Song of Ascents. The pilgrimage ends with the night watch praising in the dark.','The janitor singing in the empty stadium after everyone has gone home — worship with an audience of One.','scholarship'],

  // ── Psalm 135 — Praise (anonymous) ──
  ['david','PSA',135,1,null,'referenced figure','exultant','praising God by name for choosing Israel, controlling nature, and shattering idols','the personal name of God as the basis for worship','Praise the LORD, for the LORD is good. Sing praise to his name, for that is pleasant. He does whatever pleases him in heaven and earth. The idols of the nations are merely silver and gold.','The biography that traces a leader\'s greatest decisions and shows they were right every time — not lucky, just good.','scholarship'],

  // ── Psalm 136 — Praise (Great Hallel) ──
  ['david','PSA',136,1,null,'referenced figure','overflowing with gratitude','repeating his love endures forever twenty-six times while retelling creation and exodus','the relentlessness of divine love','Every verse ends with for his love endures forever. Creation — his love endures forever. The exodus — his love endures forever. The psalm is one idea, hammered home until you believe it.','The parent who says I love you at the end of every phone call no matter what — because you need to hear it again.','scholarship'],

  // ── Psalm 138 — Davidic, Praise ──
  ['david','PSA',138,1,null,'protagonist','overflowing with gratitude','giving thanks with a whole heart because God answered when he called and strengthened his soul','the emboldening effect of answered prayer','I called and you answered me. You made me bold and stouthearted. Though I walk in the midst of trouble, you preserve my life. The psalm is the prayer after the answered prayer.','The follow-up call to thank the person who helped during the crisis — your voice different now, stronger.','canon'],

  // ── Psalm 140 — Davidic, Lament ──
  ['david','PSA',140,1,null,'protagonist','desperate','begging God to rescue him from violent and deceitful men who plan evil daily','survival against coordinated malice','Rescue me, LORD, from evildoers. They sharpen their tongues like serpents. The poison of vipers is on their lips. Let burning coals fall on them. The psalm matches the enemy\'s venom with divine fire.','The restraining order filed against someone whose words are as dangerous as their fists.','canon'],

  // ── Psalm 141 — Davidic, Lament/Wisdom ──
  ['david','PSA',141,1,null,'protagonist','quiet confidence','asking God to guard his mouth and keep his heart from evil even when the righteous rebuke him','self-discipline when temptation and pressure converge','Set a guard over my mouth, LORD. Keep watch over the door of my lips. Let a righteous man strike me — that is a kindness. David asks to be controlled from the outside because he does not trust his own restraint.','Asking a trusted friend to take your car keys before the party starts because you know yourself too well.','canon'],

  // ── Psalm 142 — Davidic, Lament (in the cave) ──
  ['david','PSA',142,1,null,'protagonist','desperate','crying aloud in a cave because no one cares for his soul','total abandonment by every human ally','I look to my right and see no one who regards me. No refuge remains. No one cares for my soul. Then: you are my refuge, my portion in the land of the living. The cave psalm finds God where humans fail.','The moment in the hospital room when every visitor has left and you realize God is the only one who stayed.','canon'],

  // ── Psalm 143 — Davidic, Penitential ──
  ['david','PSA',143,1,null,'protagonist','broken','spreading out his hands to God in a land of thirst because his spirit faints within him','spiritual desolation that requires divine intervention to survive','My spirit grows faint within me. My heart within me is dismayed. I spread out my hands to you. My soul thirsts for you like a parched land. The last penitential psalm. David is empty.','The recovery patient who has hit bottom and finally stopped pretending they can fix themselves.','canon'],

  // ── Psalm 144 — Davidic, Royal/Praise ──
  ['david','PSA',144,1,null,'protagonist','kingly authority','blessing God who trains his hands for war and then asking for prosperity and peace','the king\'s prayer for both military victory and domestic flourishing','Blessed be the LORD, my rock, who trains my hands for war. Then David pivots: may our sons be like well-nurtured plants, our daughters like pillars. The warrior prays for gardens.','The general who fights all week and spends the weekend coaching little league — defending and building at the same time.','canon'],

  // ── Psalm 146 — Praise (Hallel finale) ──
  ['david','PSA',146,1,null,'referenced figure','exultant','resolving to praise God for life and warning against trusting human princes','the reliability of God versus the mortality of every leader','Do not put your trust in princes, in human beings who cannot save. When their spirit departs, their plans come to nothing. Blessed is the one whose help is the God of Jacob.','The voter who has been disappointed by every candidate and finally puts their trust in something beyond the ballot box.','scholarship'],

  // ── Psalm 147 — Praise (Hallel finale) ──
  ['david','PSA',147,1,null,'referenced figure','exultant','praising God who heals the brokenhearted and counts the stars by name','the God who is simultaneously cosmic and intimate','He determines the number of the stars and calls them each by name. He heals the brokenhearted and binds up their wounds. The same God. The psalm holds infinity and intimacy together.','The surgeon who operates on hearts all day and then goes home and gently bandages their child\'s scraped knee.','scholarship'],

  // ── Psalm 148 — Praise (Hallel finale) ──
  ['david','PSA',148,1,null,'referenced figure','exultant','commanding everything that exists — from angels to sea creatures to hail — to praise the LORD','the total worship of all creation','Praise him, sun and moon. Praise him, shining stars. Praise him, great sea creatures. Praise him, lightning and hail. Young men and women, old men and children. The psalm leaves nothing out.','The orchestra where every instrument plays — from the piccolo to the timpani — and together they make a sound no soloist could.','scholarship'],

  // ── Psalm 149 — Praise (Hallel finale) ──
  ['david','PSA',149,1,null,'referenced figure','exultant','singing a new song while wielding a double-edged sword — worship and warfare fused','the people of God as both worshippers and warriors','Let the saints rejoice and sing on their beds. Let the high praises of God be in their mouths and a two-edged sword in their hands. The psalm refuses to separate worship from action.','The protest march that begins with singing and ends with structural change — praise as a weapon against injustice.','scholarship'],

  // ── Psalm 150 — Praise (final psalm) ──
  ['david','PSA',150,1,null,'referenced figure','exultant','commanding every instrument and everything that breathes to praise the LORD — the final word of the Psalter','the Psalter\'s grand conclusion in undiluted praise','Praise him with trumpet, harp, tambourine, strings, pipe, cymbals. Let everything that has breath praise the LORD. The last word of the book of Psalms is praise. It was always heading here.','The final song at the concert when the entire audience is on their feet and the building shakes — and nobody wants to leave.','scholarship'],
]);

console.log('Done PSA gaps — 135 rows');
db.close();
