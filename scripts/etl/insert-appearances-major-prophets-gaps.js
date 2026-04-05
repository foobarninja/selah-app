const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ═══════════════════════════════════════════════════════════════
  // ISAIAH — missing chapters
  // ═══════════════════════════════════════════════════════════════

  // ISA 1 — Indictment of Judah
  ['isaiah','ISA',1,1,31,'protagonist','burdened','confront Judah with her rebellion against God','the survival of an entire nation living in willful disobedience','Isaiah opens with God\'s courtroom speech: I raised children and they rebelled. The ox knows its owner but Israel does not know me','Watching a community destroy itself and being the one who has to say something','scholarship'],

  // ISA 3 — Judgment on Jerusalem's leaders
  ['isaiah','ISA',3,1,26,'protagonist','defiant','expose the corrupt leadership stripping the nation bare','societal collapse when leaders fail','God enters into judgment with the elders and princes: it is you who have devoured the vineyard','Calling out leadership failures when everyone else is afraid to speak','scholarship'],

  // ISA 4 — The Branch of the Lord
  ['isaiah','ISA',4,1,6,'protagonist','visionary','point to a purified remnant after judgment','hope that destruction is not the final word','After the fire of judgment a canopy of glory will cover what remains, protection born from purging','Rebuilding something beautiful from what survives a necessary demolition','scholarship'],

  // ISA 8 — Maher-shalal-hash-baz
  ['isaiah','ISA',8,1,22,'protagonist','resolute','embody the prophetic message in his own family','the credibility of God\'s word made visible in a child\'s name','Isaiah names his son Speed-the-Spoil because Assyria is coming fast, his family becomes the sermon','Naming your project after the problem because you want no one to forget what is at stake','scholarship'],

  // ISA 10 — Woe to Assyria
  ['isaiah','ISA',10,1,34,'protagonist','defiant','declare that the tool God uses will itself be judged','whether imperial power answers to anyone','Assyria is the axe but the axe does not boast over the one who swings it','The contractor who thinks they own the building because they held the hammer','scholarship'],

  // ISA 11 — The Shoot from Jesse
  ['isaiah','ISA',11,1,16,'protagonist','visionary','describe the coming righteous king from David\'s line','the future shape of justice on earth','A shoot from the stump of Jesse, the Spirit resting on him, the wolf dwelling with the lamb','Imagining a leader so just that even natural enemies find peace','scholarship'],

  // ISA 12 — Song of Salvation
  ['isaiah','ISA',12,1,6,'protagonist','visionary','lead a song of thanksgiving for God\'s salvation','worship as the proper response to deliverance','With joy you will draw water from the wells of salvation, sing to the Lord for he has done gloriously','The celebration after a long crisis finally breaks','scholarship'],

  // ISA 13 — Oracle against Babylon
  ['isaiah','ISA',13,1,22,'protagonist','burdened','pronounce doom on the empire that will swallow nations','the fate of the superpower that thinks it is untouchable','The day of the Lord comes cruel with wrath, Babylon the glory of kingdoms will be like Sodom','Watching the invincible corporation face the investigation it never expected','scholarship'],

  // ISA 14 — Fall of the King of Babylon
  ['isaiah','ISA',14,1,32,'protagonist','defiant','mock the fallen tyrant who shook kingdoms','whether any human power can rival God','How you have fallen from heaven, morning star. The king who said I will ascend is brought to the pit','The CEO who built an empire on intimidation watching it all collapse','scholarship'],

  // ISA 15 — Oracle against Moab
  ['isaiah','ISA',15,1,9,'protagonist','grieving','lament the devastation coming to Moab','compassion even in pronouncing judgment on a neighbor','Isaiah weeps for Moab: my heart cries out for her fugitives, the waters of Dimon are full of blood','Grieving the destruction of a neighboring country even when the relationship was complicated','scholarship'],

  // ISA 16 — Moab's Pride and Fall
  ['isaiah','ISA',16,1,14,'protagonist','grieving','urge Moab to seek shelter and mourn her coming ruin','whether pride prevents a nation from asking for help','Send the lamb to the ruler of the land, let the outcasts of Moab sojourn among you','Watching a proud neighbor refuse the help that could save them','scholarship'],

  // ISA 17 — Oracle against Damascus
  ['isaiah','ISA',17,1,14,'protagonist','burdened','announce that Damascus and northern Israel will fall together','alliances that drag both parties into ruin','Damascus will cease to be a city, and the glory of Jacob will be brought low','When your business partner\'s collapse takes you down with them','scholarship'],

  // ISA 18 — Oracle against Cush
  ['isaiah','ISA',18,1,7,'protagonist','resolute','warn the distant Ethiopian envoys that God alone determines outcomes','whether foreign alliances can substitute for trust in God','A nation tall and smooth-skinned sends envoys, but God will quietly watch and then act','Receiving diplomatic visitors while knowing their proposal will not change the outcome','scholarship'],

  // ISA 19 — Oracle against Egypt
  ['isaiah','ISA',19,1,25,'protagonist','visionary','prophesy Egypt\'s humbling and eventual turning to God','redemption even for Israel\'s ancient oppressor','The Lord rides on a swift cloud to Egypt, but one day Egypt Assyria and Israel will worship together','Your oldest rival eventually becoming your partner in something bigger than both of you','scholarship'],

  // ISA 20 — Isaiah Walks Naked
  ['isaiah','ISA',20,1,6,'protagonist','burdened','walk stripped and barefoot for three years as a sign against Egypt and Cush','his own dignity sacrificed to make the message undeniable','Isaiah walks naked and barefoot as a sign that Assyria will lead Egypt away stripped','The activist who does something humiliating in public because nothing else gets attention','scholarship'],

  // ISA 21 — Oracle against Babylon, Edom, Arabia
  ['isaiah','ISA',21,1,17,'protagonist','anguished','bear the weight of visions he did not ask for','the prophet\'s body absorbing the horror of what he sees','My heart staggers, horror has appalled me, the twilight I longed for has become trembling','Receiving terrible news you cannot un-know and cannot stop','scholarship'],

  // ISA 22 — Oracle against the Valley of Vision
  ['isaiah','ISA',22,1,25,'protagonist','anguished','rebuke Jerusalem for partying when she should be repenting','a city that celebrates while the siege ramp is being built','Let us eat and drink for tomorrow we die, but the Lord says this iniquity will not be atoned','The office throwing a party while layoffs are already decided','scholarship'],

  // ISA 23 — Oracle against Tyre
  ['isaiah','ISA',23,1,18,'protagonist','burdened','declare that the merchant queen of the seas will be silenced','whether wealth can buy immunity from judgment','Wail O ships of Tarshish for Tyre is laid waste, no house no harbor','The global trade hub that thought it was too connected to fail','scholarship'],

  // ISA 24 — The Lord's Devastation of the Earth
  ['isaiah','ISA',24,1,23,'protagonist','anguished','describe cosmic judgment that spares no class or nation','the entire earth accountable not just individual nations','The earth is utterly broken, the earth is split apart, the earth is violently shaken','Climate catastrophe that does not respect national borders or bank accounts','scholarship'],

  // ISA 25 — Praise for God's Salvation
  ['isaiah','ISA',25,1,12,'protagonist','visionary','celebrate the feast God will prepare after judgment','hope on the other side of devastation','He will swallow up death forever and wipe away tears from all faces','The banquet held in the rebuilt neighborhood after the disaster','scholarship'],

  // ISA 26 — Song of Trust
  ['isaiah','ISA',26,1,21,'protagonist','resolute','lead a song of trust in God\'s perfect peace','the steadfast mind kept in peace','You keep him in perfect peace whose mind is stayed on you because he trusts in you','The person who sleeps soundly during the crisis because they have done what they can','scholarship'],

  // ISA 27 — Deliverance of Israel
  ['isaiah','ISA',27,1,13,'protagonist','visionary','promise that God will slay the dragon and gather his scattered people','final victory over chaos and exile','In that day the Lord will punish Leviathan the fleeing serpent and Israel will blossom and fill the world','The family reunion after years of estrangement when everyone finally comes home','scholarship'],

  // ISA 28 — Woe to Ephraim
  ['isaiah','ISA',28,1,29,'protagonist','defiant','confront the drunkards of Ephraim and the scoffers in Jerusalem','leaders too intoxicated to lead','The proud crown of the drunkards of Ephraim will be trodden underfoot, priest and prophet reel with strong drink','Leadership so impaired they mock the one person telling them the truth','scholarship'],

  // ISA 29 — Woe to Jerusalem
  ['isaiah','ISA',29,1,24,'protagonist','burdened','expose worship that is all lips and no heart','whether religion without sincerity is worse than none','This people honors me with their lips but their hearts are far from me','Going through all the motions at work while being completely checked out','scholarship'],

  // ISA 30 — Woe to the Rebellious
  ['isaiah','ISA',30,1,33,'protagonist','grieving','warn Judah that running to Egypt for help insults God','trusting a fading empire instead of the living God','In returning and rest you shall be saved, in quietness and trust shall be your strength, but you were unwilling','Hiring expensive consultants instead of listening to the person in the room who knows the answer','scholarship'],

  // ISA 31 — Woe to Those Who Go Down to Egypt
  ['isaiah','ISA',31,1,9,'protagonist','defiant','rebuke those who trust Egyptian horses over God\'s power','military alliances versus divine protection','The Egyptians are human and not God, their horses are flesh and not spirit','Stockpiling weapons while neglecting the relationships that actually keep you safe','scholarship'],

  // ISA 32 — A King Will Reign in Righteousness
  ['isaiah','ISA',32,1,20,'protagonist','visionary','describe a coming reign of justice and the Spirit\'s outpouring','what society looks like when leadership is righteous','A king will reign in righteousness, until the Spirit is poured out from on high and the wilderness becomes a fruitful field','Imagining what your city would look like if every leader actually served the people','scholarship'],

  // ISA 33 — Distress and Help
  ['isaiah','ISA',33,1,24,'protagonist','resolute','declare that God will rise up and destroy the destroyers','whether there is justice for the oppressed','O Lord be gracious to us, we wait for you, be our arm every morning our salvation in time of trouble','Praying for intervention when every human option has been exhausted','scholarship'],

  // ISA 34 — Judgment on the Nations
  ['isaiah','ISA',34,1,17,'protagonist','burdened','announce universal judgment with Edom as the prime example','cosmic accountability','The Lord is enraged against all the nations, their slain will be cast out, the mountains will flow with blood','The reckoning that no country, no matter how remote, can escape','scholarship'],

  // ISA 35 — The Ransomed Return
  ['isaiah','ISA',35,1,10,'protagonist','visionary','paint the joyful highway of return through a transformed desert','the redeemed coming home through a world made new','The desert shall rejoice and blossom, the eyes of the blind shall be opened, and the ransomed shall return with singing','The moment refugees see their homeland restored and walk home on a new road','scholarship'],

  // ISA 36 — Sennacherib Threatens Jerusalem
  ['isaiah','ISA',36,1,22,'protagonist','resolute','stand firm as Assyria besieges Jerusalem','the survival of the city and the credibility of God','Sennacherib\'s field commander shouts in Hebrew to terrify the people on the wall','The hostile takeover team showing up at your office and addressing your employees directly','scholarship'],
  ['sennacherib','ISA',36,1,22,'antagonist','arrogant','intimidate Jerusalem into surrender without a fight','total psychological domination before the siege even begins','The Rabshakeh mocks Hezekiah\'s trust in God: has any god delivered his land from my hand?','The competitor who sends a public letter saying your company cannot survive','scholarship'],
  ['hezekiah','ISA',36,1,22,'deuteragonist','anguished','hold the city together under unbearable pressure','his kingdom, his faith, his legacy','Hezekiah\'s officials come to him with torn clothes: the Assyrian words are too devastating to repeat','The leader who gets the worst possible news and has to decide in minutes what to tell the team','scholarship'],

  // ISA 37 — Hezekiah's Prayer and Deliverance
  ['isaiah','ISA',37,1,38,'protagonist','resolute','deliver God\'s answer to Hezekiah\'s desperate prayer','whether prayer changes the outcome of a siege','Isaiah sends word: the virgin daughter of Zion despises you, Sennacherib, God will defend this city','The advisor who delivers the turning-point message at the darkest hour','scholarship'],
  ['hezekiah','ISA',37,1,38,'deuteragonist','resolute','spread the threatening letter before God and pray','everything he has left','Hezekiah takes the letter into the temple and spreads it before the Lord, raw honesty before God','Taking the threatening email, printing it, and sitting with it in silence before deciding','scholarship'],

  // ISA 38 — Hezekiah's Illness and Recovery
  ['isaiah','ISA',38,1,22,'protagonist','commissioned','deliver both a death sentence and a reprieve to the king','the boundary between prophetic word and divine reversal','Isaiah says you will die, then God says I have heard your prayer, I will add fifteen years','The doctor who delivers the terminal diagnosis and then calls back with unexpected good news','scholarship'],
  ['hezekiah','ISA',38,1,22,'deuteragonist','anguished','plead for more life as he faces the wall and weeps','fifteen more years','Hezekiah turns his face to the wall and weeps bitterly, and God grants him more time','Bargaining with reality in a hospital room and being given a second chance','scholarship'],

  // ISA 39 — Envoys from Babylon
  ['isaiah','ISA',39,1,8,'protagonist','burdened','warn Hezekiah that showing off to Babylon will cost his descendants everything','a future exile seeded by present vanity','Isaiah asks what did they see, and Hezekiah says everything. Isaiah says it will all go to Babylon','Showing the competitor your entire operation and your advisor saying you just gave away the company','scholarship'],
  ['hezekiah','ISA',39,1,8,'deuteragonist','complacent','show Babylonian envoys every treasure in the palace','short-term flattery over long-term security','Hezekiah shows them everything and then says at least there will be peace in my lifetime, chilling selfishness','The executive who sells the company\'s future for a favorable quarter','scholarship'],

  // ISA 41 — Fear Not, I Am with You
  ['isaiah','ISA',41,1,29,'protagonist','commissioned','proclaim God\'s reassurance to exiled Israel','whether a scattered people can believe they are still chosen','Fear not for I am with you, be not dismayed for I am your God, I will strengthen you','The message that arrives when you have convinced yourself you are completely alone','scholarship'],

  // ISA 42 — The Servant of the Lord (Servant Song 1)
  ['isaiah','ISA',42,1,25,'protagonist','visionary','introduce the chosen Servant who will bring justice gently','the shape of true power: not by force but by faithfulness','A bruised reed he will not break, a faintly burning wick he will not quench','The leader who wins not by crushing opposition but by protecting the fragile','scholarship'],
  ['jesus','ISA',42,1,25,'referenced','commissioned','bring justice to the nations without breaking what is weak','redemption through gentleness not domination','Behold my servant whom I uphold, my chosen in whom my soul delights, I have put my Spirit upon him','The person everyone underestimates who changes everything by refusing to play the power game','scholarship'],

  // ISA 43 — You Are Mine
  ['isaiah','ISA',43,1,28,'protagonist','commissioned','deliver the most intimate reassurance in all of prophecy','whether identity survives destruction','When you pass through the waters I will be with you, I have called you by name you are mine','The friend who says your name when you have forgotten who you are','scholarship'],

  // ISA 44 — There Is No Other God
  ['isaiah','ISA',44,1,28,'protagonist','defiant','mock the absurdity of idol-making and declare God alone is God','the intellectual bankruptcy of idolatry','He burns half the wood and cooks his meal, with the rest he makes a god and worships it','Using the same material for your furniture and your religion','scholarship'],

  // ISA 45 — Cyrus, God's Anointed
  ['isaiah','ISA',45,1,25,'protagonist','visionary','announce a pagan king as God\'s chosen instrument','whether God can use anyone regardless of their beliefs','Thus says the Lord to his anointed to Cyrus, I call you by name though you do not know me','God using someone who does not even believe in him to accomplish the rescue','scholarship'],

  // ISA 46 — Bel and Nebo Fall
  ['isaiah','ISA',46,1,13,'protagonist','defiant','contrast Babylon\'s gods who must be carried with Israel\'s God who carries his people','which direction the carrying goes','You carry your idols on weary beasts, but I have made and I will carry, I will bear and I will save','The difference between a religion you have to maintain and a God who maintains you','scholarship'],

  // ISA 47 — The Fall of Babylon
  ['isaiah','ISA',47,1,15,'protagonist','resolute','taunt the queen city that thought she would never be widowed','the hubris of empires that say I am and there is no one besides me','Come down and sit in the dust, virgin daughter of Babylon. You said I shall be mistress forever','The dynasty that thought the rules did not apply to them meeting the rules','scholarship'],

  // ISA 48 — Stubborn Israel Refined
  ['isaiah','ISA',48,1,22,'protagonist','burdened','confront Israel\'s stubbornness while still promising deliverance','refining without destroying','I refined you but not as silver, I chose you in the furnace of affliction, for my own sake I do it','The parent who disciplines not to punish but because giving up is not an option','scholarship'],

  // ISA 49 — The Servant's Mission (Servant Song 2)
  ['isaiah','ISA',49,1,26,'protagonist','visionary','reveal that the Servant\'s mission extends beyond Israel to all nations','whether salvation has borders','It is too light a thing that you should be my servant to raise up the tribes of Jacob, I will make you a light for the nations','The startup that realizes its product is not just for the local market','scholarship'],
  ['jesus','ISA',49,1,26,'referenced','commissioned','be a light to the nations beyond Israel','universal redemption','I will make you as a light for the nations that my salvation may reach to the end of the earth','The mission that keeps expanding because the need is bigger than anyone first imagined','scholarship'],

  // ISA 50 — The Servant's Obedience (Servant Song 3)
  ['isaiah','ISA',50,1,11,'protagonist','resolute','describe the Servant who does not turn back from suffering','obedience that costs everything','I gave my back to those who strike and my cheeks to those who pull out the beard, I set my face like a flint','The person who walks into the hearing knowing what it will cost and refusing to flinch','scholarship'],
  ['jesus','ISA',50,1,11,'referenced','resolute','endure suffering without retaliation','vindication through faithfulness not force','He who vindicates me is near, who will contend with me, the Lord God helps me','Absorbing the blow because you know the truth will eventually speak for itself','scholarship'],

  // ISA 51 — Comfort for Zion
  ['isaiah','ISA',51,1,23,'protagonist','commissioned','call the faithful to remember their origin and trust God\'s coming comfort','whether the past provides courage for the future','Look to the rock from which you were hewn, Abraham was only one when I called him','Reminding someone of where they started when they are afraid of where they are going','scholarship'],

  // ISA 53 — The Suffering Servant (Servant Song 4)
  ['isaiah','ISA',53,1,12,'protagonist','anguished','describe the Servant crushed for the sins of others','whether innocent suffering can redeem the guilty','He was pierced for our transgressions, crushed for our iniquities, by his wounds we are healed','The person who takes the punishment for something they did not do and it saves everyone','scholarship'],
  ['jesus','ISA',53,1,12,'referenced','anguished','bear the sin of many through voluntary suffering','substitutionary redemption','Like a lamb led to slaughter he opened not his mouth, the Lord laid on him the iniquity of us all','The innocent verdict that comes too late because someone already served the sentence voluntarily','scholarship'],

  // ISA 54 — The Barren Woman Sings
  ['isaiah','ISA',54,1,17,'protagonist','visionary','promise that the barren and shamed will have more children than the married','restoration after humiliation','Sing O barren one who did not bear, for the children of the desolate one will be more','The woman who thought her story was over discovering it is just beginning','scholarship'],

  // ISA 55 — Come, Everyone Who Thirsts
  ['isaiah','ISA',55,1,13,'protagonist','commissioned','issue the great invitation to come without money and without price','whether grace can really be free','Come everyone who thirsts, come to the waters, he who has no money come buy and eat','The free clinic that actually means it when they say no one will be turned away','scholarship'],

  // ISA 56 — Salvation for Foreigners and Eunuchs
  ['isaiah','ISA',56,1,12,'protagonist','visionary','declare that outsiders and the excluded will be gathered in','the boundaries of who belongs to God','The foreigners who join themselves to the Lord, I will give them a name better than sons and daughters','The organization that rewrites its membership rules to include the people everyone else excluded','scholarship'],

  // ISA 57 — Peace for the Contrite
  ['isaiah','ISA',57,1,21,'protagonist','burdened','contrast the wicked with the contrite whom God revives','whether humility opens doors that power cannot','I dwell in the high and holy place and also with him who is of a contrite and lowly spirit','God choosing to live in the penthouse and the basement at the same time','scholarship'],

  // ISA 58 — True Fasting
  ['isaiah','ISA',58,1,14,'protagonist','defiant','expose the hypocrisy of fasting while oppressing workers','whether ritual without justice is an insult to God','Is not this the fast I choose: to loose the bonds of wickedness, to let the oppressed go free','The company that donates to charity but does not pay its employees fairly','scholarship'],

  // ISA 59 — Sin and Redemption
  ['isaiah','ISA',59,1,21,'protagonist','anguished','diagnose the sin that separates the people from God and promise a Redeemer','the gap between the people and God that only God can close','Your iniquities have made a separation between you and your God, but a Redeemer will come to Zion','The audit that reveals how deep the problem goes and the investor who says I will cover it','scholarship'],

  // ISA 60 — The Glory of Zion
  ['isaiah','ISA',60,1,22,'protagonist','visionary','describe nations streaming to Zion\'s light','the reversal of exile into global centrality','Arise shine for your light has come, nations shall come to your light and kings to the brightness of your rising','The forgotten neighborhood that becomes the destination everyone wants to visit','scholarship'],

  // ISA 62 — Zion's New Name
  ['isaiah','ISA',62,1,12,'protagonist','resolute','refuse to be silent until Jerusalem\'s vindication shines like a torch','relentless advocacy for a city that cannot advocate for itself','For Zion\'s sake I will not keep silent, you shall be called My Delight Is in Her','The advocate who will not stop filing appeals until the wrongful conviction is overturned','scholarship'],

  // ISA 63 — The Divine Warrior
  ['isaiah','ISA',63,1,19,'protagonist','anguished','cry out to God as warrior and father while lamenting the people\'s hardness','whether God will intervene as he did in the exodus','I looked but there was no one to help, so my own arm brought me salvation','Looking around for allies and realizing you will have to do this alone','scholarship'],

  // ISA 64 — A Prayer for Mercy
  ['isaiah','ISA',64,1,12,'protagonist','anguished','plead for God to tear the heavens open and come down','desperation so deep it demands the impossible','Oh that you would rend the heavens and come down, we are the clay you are the potter','The prayer you pray when you have run out of polite ways to ask','scholarship'],

  // ISA 66 — New Heavens and New Earth
  ['isaiah','ISA',66,1,24,'protagonist','visionary','close the book with cosmic renewal and final judgment','the ultimate destination of history','Behold I create new heavens and a new earth, before she was in labor she gave birth','The architect\'s final rendering showing what the city will look like when every phase is complete','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // JEREMIAH — missing chapters
  // ═══════════════════════════════════════════════════════════════

  // JER 2 — Israel's Apostasy
  ['jeremiah','JER',2,1,37,'protagonist','grieving','confront Israel with her spiritual adultery','a nation that left its first love and cannot even see it','My people have committed two evils: they have forsaken me the fountain of living waters and hewn out broken cisterns','Leaving a reliable relationship for something flashy that cannot hold water','scholarship'],

  // JER 3 — Faithless Israel Called to Return
  ['jeremiah','JER',3,1,25,'protagonist','grieving','plead with faithless Israel to return','whether a divorce can be undone by repentance','Return faithless Israel, I will not look on you in anger for I am merciful','The spouse who says come home, I am still here, after the worst betrayal','scholarship'],

  // JER 4 — Disaster from the North
  ['jeremiah','JER',4,1,31,'protagonist','anguished','warn that invasion is coming and the land will be waste','the countdown to destruction','My anguish my anguish I writhe in pain, the walls of my heart, I cannot keep silent','The feeling in your chest when you know the catastrophe is coming and no one is listening','scholarship'],

  // JER 5 — Not One Righteous
  ['jeremiah','JER',5,1,31,'protagonist','burdened','search Jerusalem for one honest person and find none','whether a single righteous person could save the city','Run to and fro through the streets, if you can find one who does justice I will pardon her','The investigator who searches the entire organization for one clean department and comes up empty','scholarship'],

  // JER 6 — Siege of Jerusalem
  ['jeremiah','JER',6,1,30,'protagonist','anguished','sound the alarm as the enemy approaches from the north','last-minute warning to a people who will not hear','To whom shall I speak and give warning that they may hear, their ears are uncircumcised','Shouting fire in a building full of people wearing headphones','scholarship'],

  // JER 8 — The Harvest Is Past
  ['jeremiah','JER',8,1,22,'protagonist','grieving','weep over a people who have passed the point of return','the deadline that has already expired','The harvest is past the summer is ended and we are not saved, is there no balm in Gilead','Missing the application deadline and realizing there is no extension','scholarship'],

  // JER 9 — A Fountain of Tears
  ['jeremiah','JER',9,1,26,'protagonist','grieving','wish his head were a fountain of tears for the slain of his people','grief too large for a human body','Oh that my head were waters and my eyes a fountain of tears that I might weep day and night','Crying until you physically cannot cry anymore and still not being done','scholarship'],

  // JER 10 — God vs. Idols
  ['jeremiah','JER',10,1,25,'protagonist','defiant','contrast the living God with handmade scarecrows that cannot speak','the absurdity of fearing what you built with your own hands','Like a scarecrow in a cucumber field their idols cannot speak, they have to be carried','Being afraid of the thing you assembled from a kit','scholarship'],

  // JER 11 — The Broken Covenant
  ['jeremiah','JER',11,1,23,'protagonist','burdened','announce that the covenant is broken and his own hometown plots to kill him','personal danger for delivering an unpopular message','The men of Anathoth say do not prophesy in the name of the Lord or you will die by our hand','Your hometown threatening you for telling the truth about the family business','scholarship'],

  // JER 12 — Jeremiah's Complaint
  ['jeremiah','JER',12,1,17,'protagonist','anguished','ask God why the wicked prosper while he suffers for obedience','the fairness of God when faithfulness is punished','Why does the way of the wicked prosper, you planted them and they took root','The honest employee watching the cheaters get promoted and asking HR why','scholarship'],

  // JER 13 — The Linen Belt
  ['jeremiah','JER',13,1,27,'protagonist','burdened','bury a belt and dig it up ruined as a sign of Judah\'s corruption','a visual aid for a people who will not listen to words','The belt was good for nothing, so are this people who refuse to hear my words','The demonstration project that shows exactly what neglect does to something once valuable','scholarship'],

  // JER 14 — Drought and Famine
  ['jeremiah','JER',14,1,22,'protagonist','anguished','intercede during drought while God tells him to stop praying','the horrifying command to stop interceding','Do not pray for the welfare of this people, though they fast I will not hear their cry','Being told to stop advocating for someone because the decision has already been made','scholarship'],

  // JER 15 — Jeremiah's Isolation
  ['jeremiah','JER',15,1,21,'protagonist','anguished','confess his loneliness and bitterness while God recommissions him','whether the prophet can endure the cost of his calling','I did not sit in the company of revelers, I sat alone because your hand was upon me','The whistleblower who lost every friend and asks the lawyer if it was worth it','scholarship'],

  // JER 16 — No Marriage, No Mourning
  ['jeremiah','JER',16,1,21,'protagonist','burdened','accept God\'s command to never marry or attend funerals as a living sign','his entire personal life surrendered to the message','Do not take a wife, do not enter a house of mourning, for I have taken away my peace from this people','The assignment that requires giving up every normal human milestone','scholarship'],

  // JER 17 — The Heart Is Deceitful
  ['jeremiah','JER',17,1,27,'protagonist','resolute','diagnose the incurable human heart and point to God as the healer','the unflinching truth about self-deception','The heart is deceitful above all things and desperately sick, who can understand it','The therapist who says the problem is not your circumstances it is your operating system','scholarship'],

  // JER 19 — The Broken Flask
  ['jeremiah','JER',19,1,15,'protagonist','defiant','smash a clay flask in front of the elders as a sign of irreversible judgment','when repair is no longer possible only breaking remains','As one breaks a potter\'s vessel so that it can never be mended, so will I break this people','Smashing the prototype in front of the board to show the product cannot be fixed','scholarship'],

  // JER 21 — Zedekiah Asks for Help
  ['jeremiah','JER',21,1,14,'protagonist','resolute','tell the king there is no rescue, only surrender or death','the last king\'s last chance','I myself will fight against you with outstretched hand, he who stays in this city shall die','The advisor who tells the CEO the only option left is to accept the buyout','scholarship'],
  ['zedekiah-last-king','JER',21,1,14,'deuteragonist','anguished','beg Jeremiah for a word of hope as Babylon closes in','the throne and his life','Zedekiah sends to Jeremiah: perhaps the Lord will deal with us according to his wonderful deeds, desperate hope','The leader asking the consultant for good news when there is none left to give','scholarship'],

  // JER 22 — Judgment on the Kings
  ['jeremiah','JER',22,1,30,'protagonist','defiant','pronounce doom on the royal house for injustice','the accountability of power','Do justice and righteousness, deliver the robbed from the oppressor, but you have eyes only for dishonest gain','The inspector who walks through the executive suite listing every violation','scholarship'],

  // JER 23 — Woe to False Shepherds
  ['jeremiah','JER',23,1,40,'protagonist','defiant','expose the prophets who speak lies in God\'s name','the corruption of the religious establishment','The prophets prophesy lies in my name, I did not send them, they speak visions of their own minds','The whistleblower exposing the TV preacher who is making it all up','scholarship'],

  // JER 24 — Good and Bad Figs
  ['jeremiah','JER',24,1,10,'protagonist','visionary','see a vision of two baskets of figs: the exiles are the good ones','the counterintuitive truth that the deported are the blessed','The good figs are those taken into exile, I will set my eyes on them for good and bring them back','The layoff that turns out to be the best thing that ever happened to your career','scholarship'],

  // JER 25 — Seventy Years of Exile
  ['jeremiah','JER',25,1,38,'protagonist','burdened','announce exactly seventy years of Babylonian captivity','a precise timeline for national suffering','For twenty-three years I have spoken to you persistently but you have not listened, seventy years you will serve Babylon','The consultant who warned for decades finally being proven right by the exact timeline','scholarship'],

  // JER 26 — Jeremiah Threatened with Death
  ['jeremiah','JER',26,1,24,'protagonist','resolute','preach in the temple knowing it could get him killed','his life versus his message','The priests and prophets say you shall die, but Jeremiah says the Lord sent me to speak','The employee who testifies before the committee knowing the company will retaliate','scholarship'],

  // JER 27 — The Yoke of Babylon
  ['jeremiah','JER',27,1,22,'protagonist','defiant','wear a wooden yoke to show that submission to Babylon is God\'s will','the scandal of telling your own people to surrender','Jeremiah wears yoke bars and tells the kings: serve Babylon and live, resist and die','Telling your team that the merger is going to happen and fighting it will only make things worse','scholarship'],

  // JER 28 — Hananiah Breaks the Yoke
  ['jeremiah','JER',28,1,17,'protagonist','resolute','confront the false prophet Hananiah who broke his yoke and promised peace','the difference between a comforting lie and a painful truth','Hananiah breaks the wooden yoke but Jeremiah says God will replace it with iron','The optimist who breaks the warning sign and the realist who says now the danger is worse','scholarship'],

  // JER 30 — Restoration Promised
  ['jeremiah','JER',30,1,24,'protagonist','visionary','deliver a scroll of hope promising restoration after exile','whether there is life after national death','I will restore the fortunes of my people and bring them back to the land, they shall serve David their king','The letter from the bank saying your foreclosure is reversed and the house is yours again','scholarship'],

  // JER 33 — The Promise of Restoration
  ['jeremiah','JER',33,1,26,'protagonist','visionary','receive promises of restoration while imprisoned in the courtyard of the guard','hope spoken from inside a prison cell','Call to me and I will answer you and show you great and hidden things you have not known','The jailhouse letter that contains the most hopeful words ever written','scholarship'],

  // JER 34 — Zedekiah's Broken Promise
  ['jeremiah','JER',34,1,22,'protagonist','defiant','condemn Zedekiah for freeing slaves then re-enslaving them','the hypocrisy of a liberation that was never meant to last','You recently repented and did what was right in proclaiming liberty, then you turned around and profaned my name','The company that announces diversity reforms then quietly reverses them','scholarship'],
  ['zedekiah-last-king','JER',34,1,22,'antagonist','complacent','revoke the slave liberation he had just proclaimed','political convenience over moral commitment','Zedekiah freed the slaves to gain God\'s favor during the siege then took them back when the pressure eased','The politician who signs the bill for the photo op then guts it in committee','scholarship'],

  // JER 35 — The Rechabites' Faithfulness
  ['jeremiah','JER',35,1,19,'protagonist','burdened','contrast the Rechabites\' loyalty to their ancestor with Judah\'s disloyalty to God','a family that kept a vow for generations shaming a nation that cannot keep one','The Rechabites say our father told us never to drink wine and we have obeyed, but Judah will not obey God','The family that still follows grandpa\'s rules while the whole culture has abandoned its founding principles','scholarship'],

  // JER 36 — The Scroll Burned
  ['jeremiah','JER',36,1,32,'protagonist','resolute','dictate his prophecies to Baruch knowing the king will try to destroy them','whether words from God can be burned','The king cut the scroll with a knife and threw it into the fire, but Jeremiah dictated it all again plus more','The journalist whose story gets killed by the editor so they publish it somewhere else with extra material','scholarship'],
  ['baruch','JER',36,1,32,'deuteragonist','resolute','write and publicly read Jeremiah\'s words at personal risk','loyalty to the prophet and the message','Baruch reads the scroll in the temple, then the officials warn him to hide','The assistant who reads the report to the board when the boss is banned from the meeting','scholarship'],

  // JER 37 — Jeremiah Imprisoned
  ['jeremiah','JER',37,1,21,'protagonist','resolute','continue prophesying despite being thrown into a dungeon','faithfulness when the cost is a prison cell','Jeremiah is beaten and put in a vaulted cell in the house of Jonathan, left to die','The dissident locked up for saying what the government does not want to hear','scholarship'],

  // JER 38 — Jeremiah in the Cistern
  ['jeremiah','JER',38,1,28,'protagonist','anguished','survive being thrown into a muddy cistern to die','his life hanging by a rope','They let Jeremiah down by ropes into the cistern where there was no water only mud, and he sank','Being dropped into a pit by the people you were trying to save','scholarship'],
  ['zedekiah-last-king','JER',38,1,28,'deuteragonist','anguished','secretly consult Jeremiah while too weak to protect him publicly','torn between wanting truth and fearing his own officials','Zedekiah says I am afraid of the Judeans who have deserted, the king afraid of his own people','The leader who believes the advisor but is too afraid of the board to act on the advice','scholarship'],

  // JER 40 — Jeremiah Stays in Judah
  ['jeremiah','JER',40,1,16,'protagonist','burdened','choose to stay in the devastated land with the poorest remnant','solidarity with the left-behind','The captain of the guard releases Jeremiah and he chooses to stay with Gedaliah and the remnant','Choosing to stay in the struggling community when you have a ticket out','scholarship'],

  // JER 41 — Gedaliah Assassinated
  ['jeremiah','JER',41,1,18,'protagonist','grieving','witness the assassination of Gedaliah and the collapse of the remnant\'s stability','the last pillar of order removed by violence','Ishmael struck down Gedaliah and all the Judeans and Chaldeans who were with him','The community leader assassinated and everything they held together falling apart overnight','scholarship'],

  // JER 42 — The Remnant Asks for Guidance
  ['jeremiah','JER',42,1,22,'protagonist','resolute','tell the remnant to stay in Judah and not flee to Egypt','obedience to an unwelcome answer','If you remain in this land I will build you up, but if you go to Egypt the sword will follow you there','Asking for advice, getting an answer you hate, and having to decide if you actually wanted the truth','scholarship'],

  // JER 43 — The Flight to Egypt
  ['jeremiah','JER',43,1,13,'protagonist','burdened','be dragged to Egypt against his will by the very people who asked for his counsel','the prophet forced to watch the people repeat the original mistake','They went to Egypt for they did not obey the voice of the Lord, and they took Jeremiah with them','Being dragged along on the bad decision you explicitly warned against','scholarship'],
  ['baruch','JER',43,1,13,'deuteragonist','burdened','accompany Jeremiah into Egypt as his faithful scribe','loyalty that follows into exile','They accused Baruch of inciting Jeremiah against them, then took both men to Egypt','The assistant blamed for the boss\'s unpopular stance and exiled alongside them','scholarship'],

  // JER 44 — Idolatry in Egypt
  ['jeremiah','JER',44,1,30,'protagonist','defiant','deliver his final recorded oracle against the remnant worshipping the queen of heaven in Egypt','the last sermon to people who have already decided','The women say we will keep burning incense to the queen of heaven as we have always done','The intervention where the person says I know what you are going to say and I am not stopping','scholarship'],

  // JER 45 — A Word for Baruch
  ['jeremiah','JER',45,1,5,'protagonist','commissioned','deliver God\'s personal word to his weary scribe','the individual behind the ministry','God says to Baruch: do you seek great things for yourself, do not seek them, but your life I will give you','The mentor telling the burned-out assistant: lower your expectations but you will survive this','scholarship'],
  ['baruch','JER',45,1,5,'deuteragonist','anguished','hear that his reward for faithful service is survival not success','whether survival is enough','Baruch says woe is me, the Lord has added sorrow to my pain, I am weary','The dedicated employee told the best they will get is keeping their job','scholarship'],

  // JER 46 — Oracle against Egypt
  ['jeremiah','JER',46,1,28,'protagonist','burdened','prophesy Egypt\'s defeat at Carchemish and her future humiliation','the fall of the other superpower','Egypt rises like the Nile but the Lord will bring her down, Pharaoh is but a noise','The empire that floods the market and then recedes leaving nothing behind','scholarship'],

  // JER 47 — Oracle against the Philistines
  ['jeremiah','JER',47,1,7,'protagonist','burdened','announce the flood of destruction coming from the north against the Philistines','ancient enemies swept away by the same tide','Waters are rising out of the north and shall become an overflowing torrent','The regional competitor destroyed by the same market shift threatening you','scholarship'],

  // JER 48 — Oracle against Moab
  ['jeremiah','JER',48,1,47,'protagonist','grieving','lament Moab\'s destruction with surprising tenderness','compassion for an enemy nation','My heart moans for Moab like a flute, for the riches they gained have perished','Mourning the collapse of a rival because you remember when they were great','scholarship'],

  // JER 49 — Oracles against Ammon, Edom, Damascus, Kedar, Elam
  ['jeremiah','JER',49,1,39,'protagonist','burdened','pronounce judgment on five nations in rapid succession','the scope of God\'s sovereignty over all peoples','Has Israel no sons, has he no heir? Concerning Edom: is there no longer wisdom in Teman?','The auditor who goes through every department in the building and finds problems in all of them','scholarship'],

  // JER 50 — Oracle against Babylon (Part 1)
  ['jeremiah','JER',50,1,46,'protagonist','visionary','prophesy the fall of the empire that is currently destroying everything','Babylon itself will face what it inflicted','Declare among the nations: Babylon is taken, Bel is put to shame, Merodach is dismayed','The conqueror who thought the rules only applied to the conquered','scholarship'],

  // JER 51 — Oracle against Babylon (Part 2)
  ['jeremiah','JER',51,1,64,'protagonist','resolute','complete the Babylon oracle and sink the scroll in the Euphrates','a symbolic ending for an empire that will sink and not rise','Jeremiah writes all the disaster to come on Babylon in a scroll, ties a stone to it, and throws it in the Euphrates','Writing the bankruptcy filing and dropping it in the river as a promise of what is coming','scholarship'],

  // JER 52 — The Fall of Jerusalem (Historical Appendix)
  ['jeremiah','JER',52,1,34,'protagonist','grieving','record the fulfillment of everything he predicted','vindication that feels like funeral','The city was broken into, Zedekiah\'s sons were killed before his eyes, then his eyes were put out','Being proven right in the worst possible way and wishing you had been wrong','scholarship'],
  ['zedekiah-last-king','JER',52,1,34,'deuteragonist','anguished','watch his sons killed and then be blinded as the last thing he ever sees','the most horrific end for the last king','The last thing Zedekiah saw was his sons being slaughtered, then they put out his eyes','The leader whose final memory is watching everything they built be destroyed','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // LAMENTATIONS — missing chapters
  // ═══════════════════════════════════════════════════════════════

  // LAM 2 — God's Anger against Zion
  ['jeremiah','LAM',2,1,22,'protagonist','anguished','grieve that God himself has become the enemy of his own city','the theological horror of God destroying what he built','The Lord has swallowed up without mercy all the habitations of Jacob, he has become like an enemy','Watching the founder burn down their own company and understanding why but still screaming','scholarship'],

  // LAM 4 — The Siege's Horrors
  ['jeremiah','LAM',4,1,22,'protagonist','grieving','describe the famine so severe that compassionate women boiled their own children','suffering beyond the capacity of language','The hands of compassionate women have boiled their own children, gold has grown dim','The war report so horrific the journalist cannot finish reading it on air','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // EZEKIEL — missing chapters
  // ═══════════════════════════════════════════════════════════════

  // EZK 2 — Ezekiel's Commission
  ['ezekiel','EZK',2,1,10,'protagonist','commissioned','receive his commission to speak to a rebellious house','obedience regardless of the audience\'s response','Son of man I send you to the people of Israel, to nations of rebels who have rebelled against me','Being hired to deliver training to a department that has already decided they do not care','scholarship'],
  ['god','EZK',2,1,10,'deuteragonist','resolute','commission Ezekiel and hand him a scroll of lamentation','empowering the messenger for an impossible audience','He spread the scroll before me and it had writing on the front and on the back: words of lamentation and mourning and woe','The boss who hands you the file and says read this, then go tell them','scholarship'],

  // EZK 3 — Ezekiel Eats the Scroll
  ['ezekiel','EZK',3,1,27,'protagonist','commissioned','eat the scroll and become a watchman for Israel','internalizing the message before delivering it','I ate it and it was in my mouth as sweet as honey, then the Spirit lifted me up','Studying the material until it becomes part of you before you teach the class','scholarship'],
  ['god','EZK',3,1,27,'deuteragonist','resolute','appoint Ezekiel as watchman with blood-accountability','the stakes of silence when you are the watchman','If you do not warn the wicked his blood I will require at your hand','The lifeguard told they are personally liable if they see someone drowning and say nothing','scholarship'],

  // EZK 4 — The Siege of Jerusalem Enacted
  ['ezekiel','EZK',4,1,17,'protagonist','burdened','lie on his side for 430 days as a living model of Jerusalem\'s siege','his body becoming the message','Lie on your left side 390 days for Israel and 40 days on your right side for Judah','The performance artist who stays in a box for a year because the press release was not enough','scholarship'],

  // EZK 5 — The Razor and the Hair
  ['ezekiel','EZK',5,1,17,'protagonist','burdened','shave his head and divide the hair into thirds as a sign of Jerusalem\'s fate','a third burned a third struck a third scattered','Take a sharp sword and divide the hair: a third burned, a third struck with the sword, a third scattered to the wind','Dividing your portfolio into three parts and watching each one fail differently','scholarship'],

  // EZK 6 — Prophecy against the Mountains
  ['ezekiel','EZK',6,1,14,'protagonist','defiant','prophesy against the mountains of Israel where idolatry thrives','dismantling the high places','Set your face toward the mountains of Israel and prophesy against them','Walking into every regional office and delivering the same shutdown notice','scholarship'],

  // EZK 7 — The End Has Come
  ['ezekiel','EZK',7,1,27,'protagonist','anguished','announce that the end has come upon the four corners of the land','total and final judgment','An end, the end has come upon the four corners of the land, now the end is upon you','The countdown timer that hits zero and there is no reset button','scholarship'],

  // EZK 8 — Idolatry in the Temple
  ['ezekiel','EZK',8,1,18,'protagonist','visionary','be transported in vision to see the abominations inside the temple','the horror of what happens behind closed doors in sacred space','He brought me to the entrance and I saw every form of creeping things and loathsome beasts portrayed on the wall','The inspector who opens the sealed room and finds the contamination everyone denied','scholarship'],
  ['god','EZK',8,1,18,'deuteragonist','resolute','show Ezekiel the hidden idolatry to justify the coming judgment','exposing what the leaders do when they think no one sees','They say the Lord does not see us, the Lord has forsaken the land, but I am showing you','The security camera footage played at the hearing that no one knew existed','scholarship'],

  // EZK 9 — The Mark of Preservation
  ['ezekiel','EZK',9,1,11,'protagonist','visionary','watch as those who grieve over sin are marked and the rest are slain','the thin line between the marked and the unmarked','Put a mark on the foreheads of those who sigh and groan over all the abominations, then begin at my sanctuary','The evacuation where only those wearing the wristband get on the bus','scholarship'],
  ['god','EZK',9,1,11,'deuteragonist','resolute','command the marking of the righteous and the execution of the rest','surgical justice that distinguishes grief from complicity','Begin at my sanctuary, so they began with the elders who were before the house','Judgment starting with the leadership floor not the mailroom','scholarship'],

  // EZK 11 — Judgment and Promise
  ['ezekiel','EZK',11,1,25,'protagonist','visionary','prophesy against the corrupt leaders and receive the promise of a new heart','judgment and restoration in the same breath','I will give them one heart and a new spirit, I will remove the heart of stone and give a heart of flesh','The surgeon who says I have to remove the damaged organ but I have a transplant ready','scholarship'],
  ['god','EZK',11,1,25,'deuteragonist','visionary','promise heart transplant surgery for the nation','transforming the people from the inside out','I will give them a heart of flesh so that they may walk in my statutes','The promise that the fix is not behavioral modification but a completely new operating system','scholarship'],

  // EZK 12 — The Exile Pantomime
  ['ezekiel','EZK',12,1,28,'protagonist','burdened','dig through a wall at night with a pack on his back as a sign of exile','acting out the deportation before it happens','Dig through the wall and carry your baggage out in the dark as they watch','The fire drill that everyone ignores until the real alarm goes off','scholarship'],

  // EZK 13 — Against False Prophets
  ['ezekiel','EZK',13,1,23,'protagonist','defiant','condemn the prophets who whitewash flimsy walls and sew magic bands','exposing spiritual fraud','They have misled my people saying peace when there is no peace, they daub the wall with whitewash','The inspector who peels back the fresh paint and shows the wall is crumbling underneath','scholarship'],

  // EZK 14 — Idols in the Heart
  ['ezekiel','EZK',14,1,23,'protagonist','resolute','tell the elders that God will not be consulted by those who have idols in their hearts','the prerequisite for prayer is honesty','These men have taken their idols into their hearts, shall I indeed let myself be consulted by them?','The client who asks for advice but has already decided and the advisor who says clean house first','scholarship'],

  // EZK 15 — Jerusalem the Useless Vine
  ['ezekiel','EZK',15,1,8,'protagonist','burdened','compare Jerusalem to a vine branch that is good for nothing except burning','a chosen people who failed their only purpose','The wood of the vine is not used for anything, how much less when fire has charred it','The specialist tool that cannot even do the one thing it was designed for','scholarship'],

  // EZK 16 — Jerusalem the Unfaithful Bride
  ['ezekiel','EZK',16,1,63,'protagonist','anguished','tell Jerusalem\'s story from abandoned infant to lavished bride to worse-than-a-prostitute','the full arc of betrayal from rescued to rescuer-denier','You were naked and bare, I spread my garment over you, but you trusted in your beauty and played the whore','The person rescued from the gutter who becomes rich and pretends they never needed help','scholarship'],

  // EZK 17 — The Eagle and the Vine
  ['ezekiel','EZK',17,1,24,'protagonist','resolute','tell a riddle about two eagles and a vine to explain Zedekiah\'s broken oath to Babylon','the consequences of breaking a covenant even with a pagan king','He broke the oath and broke the covenant; shall he escape? He despised the oath and broke the covenant','Violating the terms of the deal and expecting no consequences because you dislike the other party','scholarship'],

  // EZK 18 — The Soul That Sins Shall Die
  ['ezekiel','EZK',18,1,32,'protagonist','resolute','overturn the proverb about children paying for parents\' sins','individual moral responsibility','The soul who sins shall die, the son shall not bear the iniquity of the father','The legal ruling that you are responsible for your own choices not your parents\' record','scholarship'],

  // EZK 19 — Lament for Israel's Princes
  ['ezekiel','EZK',19,1,14,'protagonist','grieving','sing a funeral song for the princes of Israel as captured lions and a burned vine','royal potential wasted and destroyed','Your mother was like a vine planted by the water, but she was plucked up in fury and the east wind dried her fruit','The dynasty that produced great leaders and then watched the last generation destroy the legacy','scholarship'],

  // EZK 20 — Israel's History of Rebellion
  ['ezekiel','EZK',20,1,49,'protagonist','burdened','recount Israel\'s entire history as one long pattern of rebellion in every generation','whether the cycle can ever be broken','I acted for the sake of my name that it should not be profaned, again and again they rebelled','The family intervention where you read the whole timeline of broken promises going back decades','scholarship'],

  // EZK 21 — The Sword of the Lord
  ['ezekiel','EZK',21,1,32,'protagonist','anguished','groan and cry aloud as the sharpened sword is drawn against Jerusalem','the physical toll of bearing the word','Groan before their eyes with breaking heart and bitter grief, a sword a sword sharpened and polished','The messenger who has to deliver the verdict and their hands shake the entire time','scholarship'],

  // EZK 22 — The Bloody City
  ['ezekiel','EZK',22,1,31,'protagonist','defiant','list Jerusalem\'s crimes and declare that every class is guilty','no clean hands anywhere in the leadership','I sought for someone to stand in the breach before me for the land but I found no one','The search committee that reviews every candidate and finds none qualified','scholarship'],

  // EZK 23 — Oholah and Oholibah
  ['ezekiel','EZK',23,1,49,'protagonist','burdened','tell the parable of two sisters whose unfaithfulness with foreign empires surpassed all bounds','Samaria and Jerusalem competing in betrayal','They played the whore in Egypt, Oholah with Assyria, Oholibah worse with Babylon','Two siblings who each make worse versions of the same destructive choices','scholarship'],

  // EZK 24 — The Cooking Pot and Ezekiel's Wife Dies
  ['ezekiel','EZK',24,1,27,'protagonist','anguished','lose his wife and be forbidden to mourn as a sign of Jerusalem\'s fall','personal grief silenced for the sake of the message','The delight of your eyes will be taken away with a blow, but you shall not mourn or weep','Being told you cannot grieve publicly because your composure is part of the demonstration','scholarship'],

  // EZK 25 — Oracles against Ammon, Moab, Edom, Philistia
  ['ezekiel','EZK',25,1,17,'protagonist','resolute','pronounce judgment on four nations that gloated over Jerusalem\'s fall','accountability for those who cheered from the sidelines','Because you said aha over my sanctuary when it was profaned, I will stretch out my hand against you','The rival companies that celebrated your bankruptcy about to face their own audit','scholarship'],

  // EZK 26 — Oracle against Tyre
  ['ezekiel','EZK',26,1,21,'protagonist','resolute','prophesy that Tyre the island fortress will be scraped bare as a rock','the fall of the city everyone thought was siege-proof','I will scrape her soil from her and make her a bare rock, she shall be a place for spreading nets','The fortified position everyone said was impregnable slowly being dismantled stone by stone','scholarship'],

  // EZK 27 — Lament over Tyre
  ['ezekiel','EZK',27,1,36,'protagonist','grieving','sing a detailed funeral song cataloging Tyre\'s lost trade and glory','the beauty of what was destroyed','Your borders are in the heart of the seas, your builders made perfect your beauty, now you have sunk','The detailed inventory of everything the bankrupt company once had','scholarship'],

  // EZK 28 — Against the Prince of Tyre
  ['ezekiel','EZK',28,1,26,'protagonist','defiant','address the king of Tyre who said I am a god and compare him to a fallen guardian cherub','the collapse of self-deification','You were in Eden the garden of God, your heart was proud because of your beauty, you corrupted your wisdom','The executive who believed their own press releases and forgot they were human','scholarship'],

  // EZK 29 — Oracle against Egypt
  ['ezekiel','EZK',29,1,21,'protagonist','resolute','prophesy against Pharaoh the great dragon lurking in the Nile','humbling the power Israel kept running to for help','I am against you Pharaoh king of Egypt, the great dragon that lies in the midst of his streams','The unreliable ally who promised protection and delivered nothing','scholarship'],

  // EZK 30 — Lament for Egypt
  ['ezekiel','EZK',30,1,26,'protagonist','burdened','announce that the day of the Lord is near for Egypt and her allies','a superpower whose arm God will break','I will break the arms of Pharaoh and he shall groan before him like a man mortally wounded','The champion athlete whose career-ending injury happens on live television','scholarship'],

  // EZK 31 — Pharaoh as the Great Cedar
  ['ezekiel','EZK',31,1,18,'protagonist','resolute','compare Pharaoh to Assyria\'s great cedar that was cut down for its pride','no tree is too tall to fell','All the trees of Eden envied it, but it was brought down to Sheol because of its towering height','The tallest building in the skyline being demolished because the foundation was corrupt','scholarship'],

  // EZK 32 — Lament for Pharaoh
  ['ezekiel','EZK',32,1,32,'protagonist','grieving','compose a funeral dirge for Pharaoh and list the nations already in the pit','the crowded graveyard of empires','They have gone down and lie still with the uncircumcised, all of them slain by the sword','The hallway of corporate portraits where every predecessor eventually failed','scholarship'],

  // EZK 33 — Ezekiel the Watchman Renewed
  ['ezekiel','EZK',33,1,33,'protagonist','commissioned','receive the news that Jerusalem has fallen and his mouth is opened again','vindication and grief arriving in the same sentence','The fugitive came and said the city has struck, and my mouth was opened and I was no longer mute','The phone call confirming everything you warned about has happened and now everyone wants to listen','scholarship'],

  // EZK 35 — Against Mount Seir
  ['ezekiel','EZK',35,1,15,'protagonist','resolute','prophesy against Edom for perpetual hatred and gloating over Israel\'s fall','judgment for those who profited from their brother\'s ruin','Because you cherished perpetual enmity and gave over the people of Israel to the sword, I will make you desolate','The relative who celebrated your downfall and is about to face their own','scholarship'],

  // EZK 38 — Gog of Magog
  ['ezekiel','EZK',38,1,23,'protagonist','visionary','prophesy against Gog and the coalition that will invade the restored land','the final threat after restoration','I will turn you about and put hooks in your jaws and bring you out, but on the mountains of Israel you shall fall','The hostile takeover attempt that comes after the recovery and fails spectacularly','scholarship'],
  ['god','EZK',38,1,23,'deuteragonist','resolute','orchestrate the final defeat of the great enemy coalition','vindicating his holiness before all nations','I will magnify myself and make myself known in the eyes of many nations, and they shall know that I am the Lord','The demonstration of power that settles every question about who is actually in charge','scholarship'],

  // EZK 39 — Gog's Defeat
  ['ezekiel','EZK',39,1,29,'protagonist','visionary','describe the total annihilation of Gog\'s forces and the great sacrificial feast','the cleanup after the final battle','Seven months the house of Israel will be burying them, they will light fires with the weapons for seven years','The cleanup operation that takes longer than the battle because the destruction was so complete','scholarship'],
  ['god','EZK',39,1,29,'deuteragonist','visionary','pour out his Spirit on Israel after the final defeat','the restoration that follows the last war','I will not hide my face anymore from them when I pour out my Spirit upon the house of Israel','The moment after the crisis when the leader finally shows the compassion they held back during the fight','scholarship'],

  // EZK 41 — The Inner Temple
  ['ezekiel','EZK',41,1,26,'protagonist','visionary','measure the inner temple\'s dimensions and decorations in meticulous detail','the architecture of holiness down to the cubit','The nave was forty cubits long and twenty cubits wide, palm trees and cherubim on every wall','The architect walking through the model home measuring every room and noting every finish','scholarship'],

  // EZK 42 — The Priests' Chambers
  ['ezekiel','EZK',42,1,20,'protagonist','visionary','measure the priests\' chambers where holy offerings are eaten','sacred space requires precise boundaries','The chambers where the priests eat the most holy offerings, they shall not go out into the outer court','The secure area with restricted access where only cleared personnel can enter','scholarship'],

  // EZK 43 — The Glory Returns
  ['ezekiel','EZK',43,1,27,'protagonist','visionary','watch the glory of God return to the temple from the east','the climax of the entire vision','The glory of the Lord entered the temple by the gate facing east and the glory filled the temple','The moment the founder walks back into the building everyone thought was permanently abandoned','scholarship'],
  ['god','EZK',43,1,27,'deuteragonist','visionary','return to dwell in the temple he had previously abandoned','the promise that departure is not permanent','Son of man this is the place of my throne where I will dwell in the midst of Israel forever','Moving back into the house you left, this time for good','scholarship'],

  // EZK 44 — The Closed Gate and Levitical Duties
  ['ezekiel','EZK',44,1,31,'protagonist','visionary','receive instructions about the eastern gate and the reformed priesthood','restoring sacred order after corruption','The gate shall remain shut because the Lord has entered by it, the Zadokite priests shall minister to me','The entrance reserved for the owner alone and the staff retrained after the previous management failed','scholarship'],

  // EZK 45 — The Holy District and Offerings
  ['ezekiel','EZK',45,1,25,'protagonist','visionary','lay out the sacred district and correct the princes\' exploitation','a land plan that builds justice into the infrastructure','Enough O princes of Israel, put away violence and oppression, and execute justice','The zoning plan redesigned so the powerful cannot squeeze out the vulnerable','scholarship'],

  // EZK 46 — The Prince's Offerings
  ['ezekiel','EZK',46,1,24,'protagonist','visionary','regulate the prince\'s worship and prevent land-grabbing from the people','constitutional limits on royal power in sacred space','The prince shall not take any of the inheritance of the people, thrusting them out of their property','The regulation that prevents the executive from converting common areas into their private office','scholarship'],

  // EZK 48 — Division of the Land
  ['ezekiel','EZK',48,1,35,'protagonist','visionary','divide the restored land among the twelve tribes with a holy center','the final blueprint of the redeemed community','The name of the city from that time on shall be The Lord Is There','The last page of the master plan where the city gets its permanent name: God Lives Here','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // DANIEL — missing chapters
  // ═══════════════════════════════════════════════════════════════

  // DAN 8 — The Ram and the Goat
  ['daniel','DAN',8,1,27,'protagonist','visionary','see a vision of a ram and goat representing Persia and Greece and be physically overwhelmed','apocalyptic knowledge that the body cannot easily bear','I Daniel was overcome and lay sick for some days, the vision was beyond understanding','Receiving classified intelligence so disturbing you cannot function for days','scholarship'],

  // DAN 10 — The Heavenly Messenger
  ['daniel','DAN',10,1,21,'protagonist','anguished','fast for three weeks until a terrifying angelic figure appears and touches him','the physical cost of seeking revelation','I had no strength left, my face turned deathly pale, and I was helpless','The executive retreat where the facilitator says something that makes the CEO physically collapse','scholarship'],
  ['michael','DAN',10,1,21,'referenced','resolute','fight in the heavenly realm against the prince of Persia','cosmic warfare behind the curtain of history','Michael one of the chief princes came to help me for I was left there with the kings of Persia','The reinforcements that arrive in a battle you did not even know was happening','scholarship'],

  // DAN 11 — Kings of the North and South
  ['daniel','DAN',11,1,45,'protagonist','visionary','receive a detailed roadmap of wars between empires stretching centuries into the future','history written in advance','A mighty king shall arise who shall rule with great dominion, but his kingdom shall be broken and divided','Reading the merger-and-acquisition timeline for the next two centuries and seeing every deal and betrayal','scholarship'],
  ['angel-of-revelation','DAN',11,1,45,'deuteragonist','resolute','narrate the future conflicts between Ptolemaic and Seleucid empires to Daniel','providing the classified briefing on centuries of geopolitics','He shall stir up his power against the king of the south with a great army','The intelligence briefing that covers every regime change for the next two hundred years','scholarship'],

  // DAN 12 — The End of Days
  ['daniel','DAN',12,1,13,'protagonist','visionary','hear that the dead will rise and be told to seal the book until the end','the final words of a lifetime of visions','Many of those who sleep in the dust of the earth shall awake, go your way Daniel for the words are sealed','The classified file stamped do not open until further notice, and you are told to go live your life','scholarship'],
  ['michael','DAN',12,1,13,'referenced','resolute','stand up in the final crisis to protect God\'s people','the last line of cosmic defense','At that time Michael the great prince who protects your people shall arise','The ally who shows up at the final hearing when everything is on the line','scholarship'],
]);

const count = 57 + 44 + 2 + 41 + 4; // ISA + JER + LAM + EZK + DAN missing chapters
console.log('Done major prophets gaps —', db.prepare("SELECT changes() as c").get().c, 'rows inserted');
db.close();
