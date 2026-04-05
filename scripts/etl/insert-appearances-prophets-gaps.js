const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ===== ISAIAH (57 missing chapters) =====

  ['isaiah','ISA',1,1,null,'protagonist','confrontational-grief',null,null,'Isaiah opens with a courtroom scene: the heavens and earth are witnesses as God indicts Israel for rebellion',null,'scholarship'],
  ['god','ISA',1,1,null,'deuteragonist','wounded-father',null,null,'God says I reared children and they rebelled against me, the ox knows its owner but Israel does not',null,'scholarship'],

  ['isaiah','ISA',3,1,null,'protagonist','warning-urgency',null,null,'Isaiah announces God will strip Jerusalem of every support, leader, and luxury',null,'scholarship'],
  ['god','ISA',3,1,null,'deuteragonist','judicial-severity',null,null,'God enters judgment against the elders who have crushed the faces of the poor',null,'scholarship'],

  ['isaiah','ISA',4,1,null,'protagonist','prophetic-hope',null,null,'Isaiah envisions a remnant purified by a spirit of judgment and burning, sheltered by God\'s glory',null,'scholarship'],

  ['isaiah','ISA',8,1,null,'protagonist','obedient-dread',null,null,'Isaiah names his son Maher-Shalal-Hash-Baz as a sign that Assyria will sweep through like a flood',null,'scholarship'],
  ['god','ISA',8,1,null,'deuteragonist','sovereign-warning',null,null,'God tells Isaiah not to fear what the people fear but to regard Him as holy and let Him be your dread',null,'scholarship'],

  ['isaiah','ISA',10,1,null,'protagonist','prophetic-denunciation',null,null,'Isaiah declares woe to those who enact unjust statutes, then warns Assyria is merely God\'s rod',null,'scholarship'],
  ['god','ISA',10,1,null,'deuteragonist','sovereign-orchestration',null,null,'God says when He has finished using Assyria He will punish its arrogant king',null,'scholarship'],

  ['isaiah','ISA',11,1,null,'protagonist','messianic-vision',null,null,'A shoot from the stump of Jesse, the Spirit resting on him, the wolf dwelling with the lamb',null,'scholarship'],
  ['isaiah','ISA',12,1,null,'protagonist','joyful-anticipation',null,null,'A song of thanksgiving: with joy you will draw water from the wells of salvation',null,'scholarship'],
  ['isaiah','ISA',13,1,null,'protagonist','apocalyptic-gravity',null,null,'Oracle against Babylon: the day of the Lord comes as destruction from the Almighty',null,'scholarship'],
  ['isaiah','ISA',14,1,null,'protagonist','taunting-triumph',null,null,'Isaiah pronounces a taunt against the fallen king of Babylon and promises Israel\'s restoration',null,'scholarship'],
  ['isaiah','ISA',15,1,null,'protagonist','reluctant-compassion',null,null,'Oracle against Moab: Isaiah\'s heart cries out for Moab even as he announces judgment',null,'scholarship'],
  ['isaiah','ISA',16,1,null,'protagonist','lamenting-prophet',null,null,'Isaiah weeps for Moab\'s vineyards and says his heart moans like a harp for its destruction',null,'scholarship'],
  ['isaiah','ISA',17,1,null,'protagonist','prophetic-warning',null,null,'Oracle against Damascus and Israel who have forgotten the God of their salvation',null,'scholarship'],
  ['isaiah','ISA',18,1,null,'protagonist','far-seeing-oracle',null,null,'Oracle concerning Cush, the land of buzzing wings beyond the rivers of Ethiopia',null,'scholarship'],
  ['isaiah','ISA',19,1,null,'protagonist','sweeping-oracle',null,null,'Oracle against Egypt: the Lord rides a swift cloud into Egypt and its idols tremble',null,'scholarship'],
  ['isaiah','ISA',20,1,null,'protagonist','humiliated-obedience',null,null,'Isaiah walks naked and barefoot for three years as a sign against Egypt and Cush',null,'scholarship'],
  ['isaiah','ISA',21,1,null,'protagonist','anguished-watchman',null,null,'Isaiah is stationed as a watchman and cries out that Babylon has fallen, has fallen',null,'scholarship'],
  ['isaiah','ISA',22,1,null,'protagonist','weeping-rebuke',null,null,'Isaiah weeps over Jerusalem\'s valley of vision where the people feast instead of repent',null,'scholarship'],
  ['isaiah','ISA',23,1,null,'protagonist','maritime-oracle',null,null,'Oracle against Tyre: the merchant city will be forgotten for seventy years',null,'scholarship'],
  ['isaiah','ISA',24,1,null,'protagonist','cosmic-dread',null,null,'Isaiah sees the whole earth devastated, the city of chaos broken, the foundations shaken',null,'scholarship'],
  ['isaiah','ISA',25,1,null,'protagonist','eschatological-praise',null,null,'Isaiah praises God who will swallow up death forever and wipe tears from all faces',null,'scholarship'],
  ['isaiah','ISA',26,1,null,'protagonist','trusting-song',null,null,'A song of the strong city: perfect peace for the mind stayed on God',null,'scholarship'],
  ['isaiah','ISA',27,1,null,'protagonist','vineyard-hope',null,null,'In that day the Lord will punish Leviathan and tend His vineyard, guarding it night and day',null,'scholarship'],
  ['isaiah','ISA',28,1,null,'protagonist','woe-pronouncement',null,null,'Woe to the proud crown of Ephraim\'s drunkards; God lays a tested cornerstone in Zion',null,'scholarship'],
  ['isaiah','ISA',29,1,null,'protagonist','grief-over-blindness',null,null,'Isaiah mourns that the people draw near with their lips but their hearts are far away',null,'scholarship'],
  ['isaiah','ISA',30,1,null,'protagonist','pleading-frustration',null,null,'Isaiah warns against the alliance with Egypt: in returning and rest you shall be saved, but you would not',null,'scholarship'],
  ['god','ISA',30,1,null,'deuteragonist','patient-longing',null,null,'The Lord waits to be gracious to you, He rises to show you mercy',null,'scholarship'],
  ['isaiah','ISA',31,1,null,'protagonist','anti-alliance-warning',null,null,'Woe to those who go down to Egypt for help and rely on horses instead of the Holy One',null,'scholarship'],
  ['isaiah','ISA',32,1,null,'protagonist','righteous-kingdom-vision',null,null,'A king will reign in righteousness and each will be like a shelter from the wind',null,'scholarship'],
  ['isaiah','ISA',33,1,null,'protagonist','battle-prayer',null,null,'Isaiah cries to God for grace in the midst of siege and envisions the king in his beauty',null,'scholarship'],
  ['isaiah','ISA',34,1,null,'protagonist','cosmic-judgment',null,null,'The sword of the Lord is bathed in heaven, coming down on Edom in furious judgment',null,'scholarship'],
  ['isaiah','ISA',35,1,null,'protagonist','redemption-joy',null,null,'The desert will bloom, the eyes of the blind will be opened, the ransomed will return to Zion with singing',null,'scholarship'],
  ['isaiah','ISA',36,1,null,'protagonist','historical-narrator',null,null,'The Assyrian Rabshakeh stands outside Jerusalem\'s walls and mocks Hezekiah\'s trust in God',null,'scholarship'],
  ['isaiah','ISA',37,1,null,'protagonist','prophetic-assurance',null,null,'Isaiah tells Hezekiah not to fear and prophesies that Sennacherib will return home and fall by the sword',null,'scholarship'],
  ['god','ISA',37,1,null,'deuteragonist','protective-fury',null,null,'God sends an angel that strikes 185,000 Assyrians dead in the night',null,'scholarship'],
  ['isaiah','ISA',38,1,null,'protagonist','life-and-death-oracle',null,null,'Isaiah tells Hezekiah he will die, then returns with a reprieve of fifteen years',null,'scholarship'],
  ['isaiah','ISA',39,1,null,'protagonist','ominous-prophecy',null,null,'Isaiah warns Hezekiah that everything he showed the Babylonian envoys will one day be carried to Babylon',null,'scholarship'],

  ['isaiah','ISA',41,1,null,'protagonist','comfort-messenger',null,null,'Fear not, for I am with you; I will strengthen you, I will help you',null,'scholarship'],
  ['god','ISA',41,1,null,'deuteragonist','reassuring-sovereign',null,null,'God calls Israel His servant and promises to uphold them with His righteous right hand',null,'scholarship'],

  ['isaiah','ISA',42,1,null,'protagonist','servant-song-herald',null,null,'Behold my servant whom I uphold, he will bring justice to the nations without breaking a bruised reed',null,'scholarship'],
  ['god','ISA',42,1,null,'deuteragonist','commissioning-tenderness',null,null,'God puts His Spirit on the servant and calls him as a covenant for the people and a light for the nations',null,'scholarship'],

  ['isaiah','ISA',43,1,null,'protagonist','redemption-herald',null,null,'Fear not, for I have redeemed you, I have called you by name, you are mine',null,'scholarship'],
  ['god','ISA',43,1,null,'deuteragonist','possessive-love',null,null,'God says when you pass through the waters I will be with you, for you are precious in my eyes',null,'scholarship'],

  ['isaiah','ISA',44,1,null,'protagonist','idol-mockery',null,null,'Isaiah mocks the idol-maker who uses half a log for a fire and half for a god, then says remember these things, O Jacob',null,'scholarship'],
  ['god','ISA',44,1,null,'deuteragonist','exclusive-creator',null,null,'I am the first and I am the last, besides me there is no god',null,'scholarship'],

  ['isaiah','ISA',45,1,null,'protagonist','cyrus-oracle',null,null,'Isaiah names Cyrus as God\'s anointed shepherd who will rebuild Jerusalem, a century before his birth',null,'scholarship'],
  ['god','ISA',45,1,null,'deuteragonist','sovereign-purpose',null,null,'I form light and create darkness, I make well-being and create calamity, I am the Lord who does all these things',null,'scholarship'],

  ['isaiah','ISA',46,1,null,'protagonist','contrast-proclamation',null,null,'Babylon\'s gods are carried by beasts but Israel\'s God carries His people from birth to old age',null,'scholarship'],
  ['isaiah','ISA',47,1,null,'protagonist','taunt-over-babylon',null,null,'Come down and sit in the dust, O virgin daughter of Babylon, your sorceries cannot save you',null,'scholarship'],
  ['isaiah','ISA',48,1,null,'protagonist','exasperated-grace',null,null,'Isaiah rebukes Israel\'s stubbornness yet delivers God\'s promise of refinement and redemption',null,'scholarship'],
  ['god','ISA',48,1,null,'deuteragonist','frustrated-redeemer',null,null,'Oh that you had paid attention to my commandments, then your peace would have been like a river',null,'scholarship'],

  ['isaiah','ISA',49,1,null,'protagonist','second-servant-song',null,null,'The servant says God formed him in the womb and made him a light to the nations',null,'scholarship'],
  ['god','ISA',49,1,null,'deuteragonist','expanding-mission',null,null,'It is too small a thing that you should be my servant to raise up the tribes of Jacob',null,'scholarship'],

  ['isaiah','ISA',50,1,null,'protagonist','third-servant-song',null,null,'The servant sets his face like flint, giving his back to those who strike and his cheeks to those who pull out the beard',null,'scholarship'],
  ['god','ISA',50,1,null,'deuteragonist','vindicating-presence',null,null,'He who vindicates me is near; who will contend with me?',null,'scholarship'],

  ['isaiah','ISA',51,1,null,'protagonist','wake-up-call',null,null,'Awake, awake, put on strength, O arm of the Lord; was it not you who dried up the sea?',null,'scholarship'],
  ['god','ISA',51,1,null,'deuteragonist','comforting-warrior',null,null,'I, I am he who comforts you; who are you that you are afraid of man who dies?',null,'scholarship'],

  ['isaiah','ISA',53,1,null,'protagonist','suffering-servant-vision',null,null,'He was despised and rejected, a man of sorrows, pierced for our transgressions, crushed for our iniquities',null,'scholarship'],

  ['isaiah','ISA',54,1,null,'protagonist','barren-woman-joy',null,null,'Sing, O barren one; enlarge your tent, for your descendants will possess nations',null,'scholarship'],
  ['god','ISA',54,1,null,'deuteragonist','covenant-husband',null,null,'For a brief moment I deserted you, but with great compassion I will gather you',null,'scholarship'],

  ['isaiah','ISA',55,1,null,'protagonist','universal-invitation',null,null,'Come, everyone who thirsts, come to the waters; buy wine and milk without money and without price',null,'scholarship'],
  ['god','ISA',55,1,null,'deuteragonist','generous-host',null,null,'My thoughts are not your thoughts, as the heavens are higher than the earth so are my ways higher than your ways',null,'scholarship'],

  ['isaiah','ISA',56,1,null,'protagonist','inclusive-vision',null,null,'Isaiah declares God\'s house will be called a house of prayer for all peoples',null,'scholarship'],
  ['god','ISA',56,1,null,'deuteragonist','welcoming-sovereign',null,null,'The foreigners who join themselves to the Lord, I will bring them to my holy mountain',null,'scholarship'],

  ['isaiah','ISA',57,1,null,'protagonist','rebuke-and-healing',null,null,'Isaiah rebukes idolaters but promises God revives the spirit of the lowly and the heart of the contrite',null,'scholarship'],
  ['god','ISA',57,1,null,'deuteragonist','high-and-low-dweller',null,null,'I dwell in the high and holy place and also with him who is of a contrite and lowly spirit',null,'scholarship'],

  ['isaiah','ISA',58,1,null,'protagonist','true-fast-proclamation',null,null,'Is not this the fast that I choose: to loose the bonds of wickedness, to let the oppressed go free?',null,'scholarship'],
  ['god','ISA',58,1,null,'deuteragonist','justice-demanding',null,null,'If you pour yourself out for the hungry, then your light shall rise in the darkness',null,'scholarship'],

  ['isaiah','ISA',59,1,null,'protagonist','sin-exposing-lament',null,null,'Your iniquities have made a separation between you and God, and your sins have hidden his face from you',null,'scholarship'],
  ['god','ISA',59,1,null,'deuteragonist','warrior-redeemer',null,null,'God puts on righteousness as a breastplate and a helmet of salvation, coming as Redeemer to Zion',null,'scholarship'],

  ['isaiah','ISA',60,1,null,'protagonist','radiant-dawn-vision',null,null,'Arise, shine, for your light has come; nations shall come to your light and kings to the brightness of your rising',null,'scholarship'],
  ['god','ISA',60,1,null,'deuteragonist','glorifying-presence',null,null,'The Lord will be your everlasting light, and your days of mourning shall be ended',null,'scholarship'],

  ['isaiah','ISA',62,1,null,'protagonist','relentless-intercession',null,null,'For Zion\'s sake I will not keep silent until her righteousness goes forth as brightness',null,'scholarship'],
  ['god','ISA',62,1,null,'deuteragonist','rejoicing-bridegroom',null,null,'As the bridegroom rejoices over the bride, so shall your God rejoice over you',null,'scholarship'],

  ['isaiah','ISA',63,1,null,'protagonist','warrior-God-vision',null,null,'Who is this coming from Edom with garments stained crimson? I have trodden the winepress alone',null,'scholarship'],
  ['god','ISA',63,1,null,'deuteragonist','avenging-savior',null,null,'I looked but there was no one to help, so my own arm brought salvation',null,'scholarship'],

  ['isaiah','ISA',64,1,null,'protagonist','desperate-petition',null,null,'Oh that you would rend the heavens and come down; we are the clay and you are our potter',null,'scholarship'],
  ['god','ISA',64,1,null,'deuteragonist','hidden-sovereign',null,null,'You have hidden your face from us and made us melt in the hand of our iniquities',null,'scholarship'],

  ['isaiah','ISA',66,1,null,'protagonist','final-vision',null,null,'Heaven is my throne and earth my footstool; as a mother comforts her child so will I comfort you in Jerusalem',null,'scholarship'],
  ['god','ISA',66,1,null,'deuteragonist','cosmic-judge-and-comforter',null,null,'Before she was in labor she gave birth; who has heard such a thing? Shall I bring to the point of birth and not deliver?',null,'scholarship'],

  // ===== JEREMIAH (44 missing chapters) =====

  ['jeremiah','JER',2,1,null,'protagonist','betrayed-lover-voice',null,null,'Jeremiah delivers God\'s case: I remember your youthful devotion, but you have forsaken the fountain of living waters',null,'scholarship'],
  ['god','JER',2,1,null,'deuteragonist','jilted-husband',null,null,'My people have committed two evils: they have forsaken me, the fountain of living waters, and hewn broken cisterns',null,'scholarship'],

  ['jeremiah','JER',3,1,null,'protagonist','divorce-metaphor',null,null,'Jeremiah compares Israel to a faithless wife who has played the harlot on every high hill',null,'scholarship'],
  ['god','JER',3,1,null,'deuteragonist','pleading-spouse',null,null,'Return, faithless Israel; I will not look on you in anger, for I am merciful',null,'scholarship'],

  ['jeremiah','JER',4,1,null,'protagonist','alarm-sounding',null,null,'Blow the trumpet in the land; a destroyer of nations has set out against you',null,'scholarship'],
  ['god','JER',4,1,null,'deuteragonist','grieving-judge',null,null,'My people are foolish, they do not know me; they are skilled in doing evil but know not how to do good',null,'scholarship'],

  ['jeremiah','JER',5,1,null,'protagonist','street-level-search',null,null,'Jeremiah searches Jerusalem for one honest person and finds none; the poor are ignorant, the great have broken the yoke',null,'scholarship'],
  ['god','JER',5,1,null,'deuteragonist','restrained-wrath',null,null,'How can I pardon you? Your children have forsaken me and sworn by those who are no gods',null,'scholarship'],

  ['jeremiah','JER',6,1,null,'protagonist','harvest-failure-grief',null,null,'Jeremiah warns that the enemy comes from the north; the harvest is past and we are not saved',null,'scholarship'],
  ['god','JER',6,1,null,'deuteragonist','rejected-refiner',null,null,'I made you a tester of metals; the refining goes on in vain for the wicked are not removed',null,'scholarship'],

  ['jeremiah','JER',8,1,null,'protagonist','incurable-grief',null,null,'Is there no balm in Gilead? Is there no physician there? My grief is beyond healing, my heart is sick',null,'scholarship'],

  ['jeremiah','JER',9,1,null,'protagonist','weeping-prophet',null,null,'Oh that my head were waters and my eyes a fountain of tears, that I might weep day and night for the slain',null,'scholarship'],

  ['jeremiah','JER',10,1,null,'protagonist','idol-mockery',null,null,'Jeremiah mocks the scarecrow-gods decorated with silver and gold that cannot speak or walk',null,'scholarship'],
  ['god','JER',10,1,null,'deuteragonist','incomparable-creator',null,null,'The Lord is the true God, the living God; at his wrath the earth quakes',null,'scholarship'],

  ['jeremiah','JER',11,1,null,'protagonist','covenant-enforcer',null,null,'Jeremiah proclaims the curse of the broken covenant while discovering a plot against his own life in Anathoth',null,'scholarship'],
  ['god','JER',11,1,null,'deuteragonist','covenant-prosecutor',null,null,'I brought them out of Egypt saying obey my voice, but they did not listen',null,'scholarship'],

  ['jeremiah','JER',12,1,null,'protagonist','frustrated-questioner',null,null,'Why does the way of the wicked prosper? Jeremiah puts God on trial for apparent injustice',null,'scholarship'],
  ['god','JER',12,1,null,'deuteragonist','weary-sovereign',null,null,'If you have raced with men on foot and they have wearied you, how will you compete with horses?',null,'scholarship'],

  ['jeremiah','JER',13,1,null,'protagonist','dramatic-sign-act',null,null,'Jeremiah buries a loincloth at the Euphrates; when he retrieves it, it is ruined, like Israel\'s pride',null,'scholarship'],

  ['jeremiah','JER',14,1,null,'protagonist','drought-intercessor',null,null,'Jeremiah cries out during drought but God refuses to accept the people\'s fasts and offerings',null,'scholarship'],
  ['god','JER',14,1,null,'deuteragonist','refusing-prayer',null,null,'Do not pray for the welfare of this people; though they fast I will not hear their cry',null,'scholarship'],

  ['jeremiah','JER',15,1,null,'protagonist','personal-lament',null,null,'Woe is me, my mother, that you bore me; everyone curses me though I have neither lent nor borrowed',null,'scholarship'],
  ['god','JER',15,1,null,'deuteragonist','reassuring-commissioner',null,null,'If you return I will restore you; you shall be as my mouth, a fortified wall of bronze',null,'scholarship'],

  ['jeremiah','JER',16,1,null,'protagonist','forbidden-normalcy',null,null,'God forbids Jeremiah from marrying, attending funerals, or feasting, making his life a sign of coming catastrophe',null,'scholarship'],
  ['god','JER',16,1,null,'deuteragonist','life-restricting-sovereign',null,null,'I am going to banish them from this land because their fathers forsook me',null,'scholarship'],

  ['jeremiah','JER',17,1,null,'protagonist','heart-diagnosis',null,null,'The heart is deceitful above all things and desperately sick; who can understand it?',null,'scholarship'],
  ['god','JER',17,1,null,'deuteragonist','heart-searcher',null,null,'I the Lord search the heart and test the mind, to give every man according to his ways',null,'scholarship'],

  ['jeremiah','JER',19,1,null,'protagonist','shattered-flask',null,null,'Jeremiah smashes a potter\'s flask before the elders as a sign that God will shatter Jerusalem',null,'scholarship'],

  ['jeremiah','JER',21,1,null,'protagonist','siege-oracle',null,null,'During Babylon\'s siege Jeremiah tells Zedekiah that God Himself fights against Jerusalem',null,'scholarship'],
  ['god','JER',21,1,null,'deuteragonist','adversary-of-his-city',null,null,'I myself will fight against you with outstretched hand and strong arm, in anger and fury and great wrath',null,'scholarship'],

  ['jeremiah','JER',22,1,null,'protagonist','royal-rebuke',null,null,'Jeremiah pronounces judgment on Judah\'s kings: Shallum, Jehoiakim, and Coniah',null,'scholarship'],

  ['jeremiah','JER',23,1,null,'protagonist','shepherd-indictment',null,null,'Woe to the shepherds who destroy and scatter the sheep; God will raise up a righteous Branch',null,'scholarship'],
  ['god','JER',23,1,null,'deuteragonist','true-shepherd',null,null,'I will gather the remnant of my flock and set shepherds over them who will care for them',null,'scholarship'],

  ['jeremiah','JER',24,1,null,'protagonist','two-baskets-vision',null,null,'Jeremiah sees two baskets of figs: the good figs are the exiles, the bad figs are those who remain',null,'scholarship'],

  ['jeremiah','JER',25,1,null,'protagonist','seventy-years-oracle',null,null,'Jeremiah announces seventy years of Babylonian exile and the cup of God\'s wrath for all nations',null,'scholarship'],
  ['god','JER',25,1,null,'deuteragonist','cup-bearer-of-wrath',null,null,'Take this cup of the wine of wrath from my hand and make all the nations drink it',null,'scholarship'],

  ['jeremiah','JER',26,1,null,'protagonist','trial-for-his-life',null,null,'Jeremiah preaches in the temple court and is seized; the priests demand his death but the officials spare him',null,'scholarship'],

  ['jeremiah','JER',27,1,null,'protagonist','yoke-wearer',null,null,'Jeremiah wears a wooden yoke and tells the nations to submit to Nebuchadnezzar as God\'s servant',null,'scholarship'],

  ['jeremiah','JER',28,1,null,'protagonist','confronting-false-prophecy',null,null,'Hananiah breaks Jeremiah\'s yoke and predicts a two-year return; Jeremiah says God will replace wood with iron',null,'scholarship'],

  ['jeremiah','JER',30,1,null,'protagonist','restoration-hope',null,null,'The Book of Consolation begins: I will restore the fortunes of my people and bring them back to the land',null,'scholarship'],
  ['god','JER',30,1,null,'deuteragonist','healing-sovereign',null,null,'I will restore health to you, and your wounds I will heal, for they have called you an outcast',null,'scholarship'],

  ['jeremiah','JER',33,1,null,'protagonist','prison-promise',null,null,'While still confined Jeremiah receives the promise of the righteous Branch and an eternal Davidic covenant',null,'scholarship'],
  ['god','JER',33,1,null,'deuteragonist','covenant-keeper',null,null,'Call to me and I will answer you and tell you great and hidden things you have not known',null,'scholarship'],

  ['jeremiah','JER',34,1,null,'protagonist','slave-release-oracle',null,null,'Jeremiah rebukes the people for taking back the slaves they had freed during the siege',null,'scholarship'],

  ['jeremiah','JER',35,1,null,'protagonist','rechabite-lesson',null,null,'The Rechabites refuse wine in obedience to their ancestor, shaming Judah who disobeys God',null,'scholarship'],

  ['jeremiah','JER',36,1,null,'protagonist','scroll-writer',null,null,'Jeremiah dictates his prophecies to Baruch; King Jehoiakim burns the scroll strip by strip',null,'scholarship'],
  ['god','JER',36,1,null,'deuteragonist','undeterrable-word',null,null,'Jeremiah dictates the words again and adds many more; God\'s word cannot be burned',null,'scholarship'],

  ['jeremiah','JER',37,1,null,'protagonist','imprisoned-prophet',null,null,'Jeremiah is beaten and imprisoned in a cistern for prophesying surrender to Babylon',null,'scholarship'],

  ['jeremiah','JER',38,1,null,'protagonist','cistern-depths',null,null,'Jeremiah sinks into the mud of a cistern and is rescued by Ebed-Melech the Ethiopian',null,'scholarship'],

  ['jeremiah','JER',40,1,null,'protagonist','freed-among-ruins',null,null,'Nebuzaradan frees Jeremiah and he stays with Gedaliah, the Babylonian-appointed governor',null,'scholarship'],

  ['jeremiah','JER',41,1,null,'protagonist','assassination-witness',null,null,'Ishmael assassinates Gedaliah and the small remnant flees in terror',null,'scholarship'],

  ['jeremiah','JER',42,1,null,'protagonist','ignored-counsel',null,null,'The remnant asks Jeremiah to pray for guidance, then refuses to obey when told to stay in the land',null,'scholarship'],
  ['god','JER',42,1,null,'deuteragonist','clear-directive',null,null,'If you remain in this land I will build you up, but if you go to Egypt the sword you fear will follow you there',null,'scholarship'],

  ['jeremiah','JER',43,1,null,'protagonist','forced-to-egypt',null,null,'The remnant drags Jeremiah to Egypt against his will, fulfilling exactly what God warned against',null,'scholarship'],

  ['jeremiah','JER',44,1,null,'protagonist','final-confrontation',null,null,'In Egypt Jeremiah confronts the people who burn incense to the queen of heaven; they refuse to listen',null,'scholarship'],

  ['jeremiah','JER',45,1,null,'protagonist','word-to-baruch',null,null,'Jeremiah comforts his scribe Baruch: do not seek great things for yourself, but your life will be spared',null,'scholarship'],

  ['jeremiah','JER',46,1,null,'protagonist','egypt-oracle',null,null,'Oracle against Egypt: Pharaoh\'s army is defeated at Carchemish, a sacrifice by the Euphrates',null,'scholarship'],
  ['jeremiah','JER',47,1,null,'protagonist','philistia-oracle',null,null,'Waters rise from the north against the Philistines; Ashkelon and Gaza are silenced',null,'scholarship'],
  ['jeremiah','JER',48,1,null,'protagonist','moab-oracle',null,null,'Moab is destroyed; Jeremiah wails for it, for its wine vats have ceased',null,'scholarship'],
  ['jeremiah','JER',49,1,null,'protagonist','nations-oracle',null,null,'Oracles against Ammon, Edom, Damascus, Kedar, and Elam fall in succession',null,'scholarship'],
  ['jeremiah','JER',50,1,null,'protagonist','babylon-fall-oracle',null,null,'Declare among the nations: Babylon is taken; her images are shamed, her idols dismayed',null,'scholarship'],
  ['god','JER',50,1,null,'deuteragonist','avenger-of-israel',null,null,'Israel and Judah will come weeping, seeking the Lord their God and the road to Zion',null,'scholarship'],
  ['jeremiah','JER',51,1,null,'protagonist','babylon-doom-sealed',null,null,'Jeremiah commands Seraiah to read the scroll in Babylon then sink it in the Euphrates: thus shall Babylon sink',null,'scholarship'],
  ['jeremiah','JER',52,1,null,'protagonist','historical-epilogue',null,null,'Jerusalem falls, the temple is burned, and the people are exiled, exactly as Jeremiah prophesied for decades',null,'scholarship'],

  // ===== LAMENTATIONS (2 missing chapters) =====

  ['jeremiah','LAM',2,1,null,'protagonist','devastated-witness',null,null,'The Lord has swallowed up Israel without mercy; Jeremiah\'s eyes fail with tears over the destruction of Jerusalem',null,'scholarship'],
  ['god','LAM',2,1,null,'deuteragonist','wrathful-destroyer',null,null,'The Lord has become like an enemy; He has destroyed Israel, destroyed her strongholds',null,'scholarship'],

  ['jeremiah','LAM',4,1,null,'protagonist','gold-dimmed-grief',null,null,'How the gold has grown dim; the sacred stones lie scattered at every street corner',null,'scholarship'],

  // ===== EZEKIEL (41 missing chapters) =====

  ['ezekiel','EZK',2,1,null,'protagonist','commissioned-prophet',null,null,'God tells Ezekiel to eat a scroll of lamentations and woe, and to speak to a rebellious house',null,'scholarship'],
  ['god','EZK',2,1,null,'deuteragonist','commissioning-sovereign',null,null,'Son of man, I send you to the people of Israel, to nations of rebels who have rebelled against me',null,'scholarship'],

  ['ezekiel','EZK',3,1,null,'protagonist','watchman-appointed',null,null,'Ezekiel eats the scroll that tastes like honey and is appointed watchman: warn them or their blood is on your hands',null,'scholarship'],
  ['god','EZK',3,1,null,'deuteragonist','accountability-setter',null,null,'If you warn the wicked and he does not turn, he shall die in his sin but you will have delivered your soul',null,'scholarship'],

  ['ezekiel','EZK',4,1,null,'protagonist','siege-mime',null,null,'Ezekiel lies on his side for 390 days facing a model of Jerusalem under siege, a living sign-act',null,'scholarship'],

  ['ezekiel','EZK',5,1,null,'protagonist','hair-dividing-sign',null,null,'Ezekiel shaves his head and divides the hair into thirds: burned, struck with sword, scattered to the wind',null,'scholarship'],
  ['god','EZK',5,1,null,'deuteragonist','unprecedented-judgment',null,null,'I will do among you what I have never yet done and will never do again because of your abominations',null,'scholarship'],

  ['ezekiel','EZK',6,1,null,'protagonist','mountain-oracle',null,null,'Ezekiel prophesies against the mountains of Israel where the high places stand',null,'scholarship'],
  ['god','EZK',6,1,null,'deuteragonist','idol-destroyer',null,null,'Your altars shall be desolate and I will scatter your bones around your idols',null,'scholarship'],

  ['ezekiel','EZK',7,1,null,'protagonist','end-proclamation',null,null,'An end! The end has come upon the four corners of the land',null,'scholarship'],

  ['ezekiel','EZK',8,1,null,'protagonist','temple-horror-witness',null,null,'Ezekiel is transported in vision to Jerusalem\'s temple and sees elders worshipping idols in secret chambers',null,'scholarship'],
  ['god','EZK',8,1,null,'deuteragonist','jealous-revealer',null,null,'Son of man, do you see what the elders of Israel are doing in the dark? They say the Lord does not see us',null,'scholarship'],

  ['ezekiel','EZK',9,1,null,'protagonist','slaughter-witness',null,null,'Ezekiel watches as six executioners move through Jerusalem; only those marked with a tav are spared',null,'scholarship'],
  ['god','EZK',9,1,null,'deuteragonist','discriminating-judge',null,null,'Pass through Jerusalem and put a mark on the foreheads of those who groan over its abominations',null,'scholarship'],

  ['ezekiel','EZK',11,1,null,'protagonist','vision-continued',null,null,'Ezekiel prophesies against the wicked counselors of Jerusalem and receives the promise of a new heart',null,'scholarship'],
  ['god','EZK',11,1,null,'deuteragonist','heart-transplant-promise',null,null,'I will give them one heart and put a new spirit within them; I will remove the heart of stone',null,'scholarship'],

  ['ezekiel','EZK',12,1,null,'protagonist','exile-mime',null,null,'Ezekiel digs through the wall at night carrying his belongings, acting out the exile that is coming',null,'scholarship'],

  ['ezekiel','EZK',13,1,null,'protagonist','false-prophet-rebuke',null,null,'Woe to the foolish prophets who follow their own spirit and have seen nothing',null,'scholarship'],
  ['god','EZK',13,1,null,'deuteragonist','wall-demolisher',null,null,'I will break down the wall the false prophets whitewashed and it will fall on them',null,'scholarship'],

  ['ezekiel','EZK',14,1,null,'protagonist','idol-heart-warning',null,null,'These men have set up idols in their hearts; should I let myself be consulted by them?',null,'scholarship'],
  ['god','EZK',14,1,null,'deuteragonist','undeceivable-judge',null,null,'Even if Noah, Daniel, and Job were in the city they could save only themselves by their righteousness',null,'scholarship'],

  ['ezekiel','EZK',15,1,null,'protagonist','vine-parable',null,null,'Jerusalem is a useless vine, good for nothing but fuel for the fire',null,'scholarship'],

  ['ezekiel','EZK',16,1,null,'protagonist','foundling-allegory',null,null,'Ezekiel tells Jerusalem\'s story: an abandoned baby God raised, adorned, and married, who became a harlot',null,'scholarship'],
  ['god','EZK',16,1,null,'deuteragonist','betrayed-benefactor',null,null,'You trusted in your beauty and played the whore because of your renown',null,'scholarship'],

  ['ezekiel','EZK',17,1,null,'protagonist','eagle-vine-riddle',null,null,'Two great eagles and a vine: a parable of Zedekiah\'s broken oath to Babylon',null,'scholarship'],

  ['ezekiel','EZK',18,1,null,'protagonist','individual-justice',null,null,'The soul who sins shall die; the son shall not bear the father\'s guilt; each person stands before God alone',null,'scholarship'],
  ['god','EZK',18,1,null,'deuteragonist','life-offering-judge',null,null,'I have no pleasure in the death of anyone; turn and live!',null,'scholarship'],

  ['ezekiel','EZK',19,1,null,'protagonist','lion-vine-lament',null,null,'A lament for Israel\'s princes: lioness cubs caught and caged, a vine plucked up and withered',null,'scholarship'],

  ['ezekiel','EZK',20,1,null,'protagonist','history-of-rebellion',null,null,'Ezekiel recounts Israel\'s entire history as repeated rebellion from Egypt to the present',null,'scholarship'],
  ['god','EZK',20,1,null,'deuteragonist','restrained-fury',null,null,'I acted for the sake of my name, that it should not be profaned in the sight of the nations',null,'scholarship'],

  ['ezekiel','EZK',21,1,null,'protagonist','sword-song',null,null,'A sword, a sword is sharpened and polished for slaughter; Ezekiel groans with breaking heart',null,'scholarship'],

  ['ezekiel','EZK',22,1,null,'protagonist','bloody-city-indictment',null,null,'Jerusalem is a city of blood: father and mother are treated with contempt, the alien is oppressed',null,'scholarship'],
  ['god','EZK',22,1,null,'deuteragonist','gap-seeking-judge',null,null,'I sought for a man among them who should stand in the gap before me, but I found none',null,'scholarship'],

  ['ezekiel','EZK',23,1,null,'protagonist','two-sisters-allegory',null,null,'Oholah and Oholibah, Samaria and Jerusalem, two sisters who whored after Assyria and Babylon',null,'scholarship'],

  ['ezekiel','EZK',24,1,null,'protagonist','cauldron-and-death',null,null,'On the day Babylon besieges Jerusalem, Ezekiel\'s wife dies and God forbids him to mourn as a sign',null,'scholarship'],
  ['god','EZK',24,1,null,'deuteragonist','sign-through-suffering',null,null,'I am about to take the delight of your eyes from you; you shall not mourn or weep',null,'scholarship'],

  ['ezekiel','EZK',25,1,null,'protagonist','neighbor-nations-oracle',null,null,'Oracles against Ammon, Moab, Edom, and Philistia for gloating over Jerusalem\'s fall',null,'scholarship'],

  ['ezekiel','EZK',26,1,null,'protagonist','tyre-doom-oracle',null,null,'Tyre said Aha! over Jerusalem\'s gate; now the waves of nations will crash against Tyre\'s walls',null,'scholarship'],

  ['ezekiel','EZK',27,1,null,'protagonist','tyre-shipwreck-lament',null,null,'Tyre is a magnificent ship built from the finest materials, sinking into the heart of the seas',null,'scholarship'],

  ['ezekiel','EZK',28,1,null,'protagonist','tyre-king-oracle',null,null,'The prince of Tyre said I am a god, but he is a man; Eden\'s guardian cherub cast down in disgrace',null,'scholarship'],

  ['ezekiel','EZK',29,1,null,'protagonist','egypt-oracle',null,null,'Pharaoh is a great dragon lying in the Nile; God will put hooks in his jaws and drag him out',null,'scholarship'],

  ['ezekiel','EZK',30,1,null,'protagonist','egypt-arm-broken',null,null,'The day of the Lord is near for Egypt; God will break both arms of Pharaoh',null,'scholarship'],

  ['ezekiel','EZK',31,1,null,'protagonist','cedar-parable',null,null,'Pharaoh is likened to a great cedar of Lebanon that grew taller than all the trees but was cut down',null,'scholarship'],

  ['ezekiel','EZK',32,1,null,'protagonist','pharaoh-lament',null,null,'A lament over Pharaoh: the great sea monster caught in God\'s net, cast down to the pit among the fallen',null,'scholarship'],

  ['ezekiel','EZK',33,1,null,'protagonist','watchman-renewed',null,null,'Ezekiel is recommissioned as watchman; Jerusalem has fallen and now the word flows freely again',null,'scholarship'],
  ['god','EZK',33,1,null,'deuteragonist','life-and-death-arbiter',null,null,'As I live, I have no pleasure in the death of the wicked; turn back, turn back, why will you die?',null,'scholarship'],

  ['ezekiel','EZK',35,1,null,'protagonist','edom-oracle',null,null,'Mount Seir rejoiced over Israel\'s ruin; God will make Edom a perpetual desolation',null,'scholarship'],

  ['ezekiel','EZK',38,1,null,'protagonist','gog-oracle',null,null,'Gog of the land of Magog will come against Israel in the latter days with a vast horde',null,'scholarship'],
  ['god','EZK',38,1,null,'deuteragonist','trap-setter',null,null,'I will put hooks in your jaws and bring you out with all your army to demonstrate my holiness',null,'scholarship'],

  ['ezekiel','EZK',39,1,null,'protagonist','gog-destruction',null,null,'Gog\'s forces fall on the mountains of Israel; it takes seven months to bury the dead',null,'scholarship'],
  ['god','EZK',39,1,null,'deuteragonist','glory-revealed',null,null,'I will set my glory among the nations, and all nations shall see my judgment',null,'scholarship'],

  ['ezekiel','EZK',41,1,null,'protagonist','temple-dimensions',null,null,'The measuring angel shows Ezekiel the nave, inner room, and side chambers of the new temple',null,'scholarship'],

  ['ezekiel','EZK',42,1,null,'protagonist','temple-chambers',null,null,'Ezekiel measures the priestly chambers where the holy offerings are eaten',null,'scholarship'],

  ['ezekiel','EZK',43,1,null,'protagonist','glory-returns',null,null,'The glory of the Lord enters the temple from the east and fills it; Ezekiel falls on his face',null,'scholarship'],
  ['god','EZK',43,1,null,'deuteragonist','dwelling-presence',null,null,'Son of man, this is the place of my throne where I will dwell in the midst of Israel forever',null,'scholarship'],

  ['ezekiel','EZK',44,1,null,'protagonist','gate-and-priests',null,null,'The east gate remains shut because the Lord has entered by it; regulations for the Levitical priests',null,'scholarship'],

  ['ezekiel','EZK',45,1,null,'protagonist','sacred-district',null,null,'A holy portion of the land is set apart for the sanctuary, the priests, and the prince',null,'scholarship'],

  ['ezekiel','EZK',46,1,null,'protagonist','worship-regulations',null,null,'The prince worships at the gate threshold; regulations for Sabbath and new moon offerings',null,'scholarship'],

  ['ezekiel','EZK',48,1,null,'protagonist','tribal-allotments',null,null,'The land is divided among the twelve tribes; the city is named The Lord Is There',null,'scholarship'],

  // ===== DANIEL (4 missing chapters) =====

  ['daniel','DAN',8,1,null,'protagonist','ram-and-goat-vision',null,null,'Daniel sees a ram with two horns trampled by a goat with a great horn, the vision of the end',null,'scholarship'],
  ['god','DAN',8,1,null,'deuteragonist','revelation-giver',null,null,'Gabriel is sent to make Daniel understand the vision concerning the appointed time of the end',null,'scholarship'],

  ['daniel','DAN',10,1,null,'protagonist','overwhelming-vision',null,null,'Daniel fasts for three weeks and sees a man dressed in linen whose face is like lightning',null,'scholarship'],

  ['daniel','DAN',11,1,null,'protagonist','kingdoms-foretold',null,null,'The angel reveals wars between the kings of the north and south leading to the abomination of desolation',null,'scholarship'],

  ['daniel','DAN',12,1,null,'protagonist','sealed-until-the-end',null,null,'At that time Michael shall arise; those who sleep in the dust shall awake, some to everlasting life',null,'scholarship'],
  ['god','DAN',12,1,null,'deuteragonist','time-sealer',null,null,'Seal up the book until the time of the end; go your way, Daniel, for you shall rest and rise at the end of days',null,'scholarship'],

  // ===== HOSEA (10 missing chapters) =====

  ['hosea','HOS',2,1,null,'protagonist','marriage-allegory',null,null,'Hosea speaks God\'s case against unfaithful Israel, yet promises to allure her again into the wilderness',null,'scholarship'],
  ['god','HOS',2,1,null,'deuteragonist','jealous-lover',null,null,'I will betroth you to me forever; I will betroth you in righteousness, justice, steadfast love, and mercy',null,'scholarship'],

  ['hosea','HOS',3,1,null,'protagonist','costly-redemption',null,null,'Hosea buys back his adulterous wife for fifteen shekels of silver and a measure of barley',null,'scholarship'],

  ['hosea','HOS',5,1,null,'protagonist','judgment-herald',null,null,'Hear this, O priests, for judgment is for you; Ephraim is joined to idols, let him alone',null,'scholarship'],
  ['god','HOS',5,1,null,'deuteragonist','withdrawing-presence',null,null,'I will return to my place until they acknowledge their guilt and seek my face in their distress',null,'scholarship'],

  ['hosea','HOS',6,1,null,'protagonist','shallow-repentance-lament',null,null,'Come let us return to the Lord; but their love is like a morning cloud that evaporates',null,'scholarship'],
  ['god','HOS',6,1,null,'deuteragonist','disappointed-lover',null,null,'I desire steadfast love and not sacrifice, the knowledge of God rather than burnt offerings',null,'scholarship'],

  ['hosea','HOS',7,1,null,'protagonist','oven-metaphor',null,null,'They are all adulterers, like a heated oven; Ephraim is a cake not turned, half-baked',null,'scholarship'],

  ['hosea','HOS',8,1,null,'protagonist','trumpet-alarm',null,null,'Set the trumpet to your lips! Israel has sown the wind and shall reap the whirlwind',null,'scholarship'],
  ['god','HOS',8,1,null,'deuteragonist','rejected-sovereign',null,null,'They made kings but not through me; they made idols from their silver and gold to their own destruction',null,'scholarship'],

  ['hosea','HOS',9,1,null,'protagonist','festival-disruption',null,null,'Rejoice not, O Israel; the days of punishment have come; the prophet is a fool, the man of the spirit is mad',null,'scholarship'],

  ['hosea','HOS',10,1,null,'protagonist','harvest-of-evil',null,null,'Israel is a luxuriant vine that yields fruit for itself; the more altars, the more sin',null,'scholarship'],

  ['hosea','HOS',12,1,null,'protagonist','jacob-parallel',null,null,'Ephraim feeds on the wind; Hosea recalls Jacob who strove with God and wept at Bethel',null,'scholarship'],

  ['hosea','HOS',13,1,null,'protagonist','death-sentence-and-reprieve',null,null,'When Ephraim spoke there was trembling, but he incurred guilt through Baal and died; shall I ransom them from death?',null,'scholarship'],
  ['god','HOS',13,1,null,'deuteragonist','death-defeating-sovereign',null,null,'O Death, where are your plagues? O Sheol, where is your sting? Compassion is hidden from my eyes',null,'scholarship'],

  // ===== JOEL (1 missing chapter) =====

  ['joel','JOL',3,1,null,'protagonist','valley-of-decision',null,null,'God gathers all nations to the Valley of Jehoshaphat for judgment; put in the sickle for the harvest is ripe',null,'scholarship'],
  ['god','JOL',3,1,null,'deuteragonist','final-judge',null,null,'The Lord roars from Zion; the heavens and earth tremble, but He is a refuge for His people',null,'scholarship'],

  // ===== AMOS (6 missing chapters) =====

  ['amos','AMO',2,1,null,'protagonist','israel-indictment',null,null,'After indicting the nations Amos turns on Israel: they sell the righteous for silver and trample the poor',null,'scholarship'],
  ['god','AMO',2,1,null,'deuteragonist','impartial-judge',null,null,'I brought you up from Egypt and raised up prophets from your sons, but you made the Nazirites drink wine',null,'scholarship'],

  ['amos','AMO',3,1,null,'protagonist','cause-and-effect-logic',null,null,'Does a lion roar when it has no prey? The Lord God has spoken; who can but prophesy?',null,'scholarship'],
  ['god','AMO',3,1,null,'deuteragonist','roaring-lion',null,null,'You only have I known of all the families of the earth; therefore I will punish you for all your iniquities',null,'scholarship'],

  ['amos','AMO',4,1,null,'protagonist','cows-of-bashan',null,null,'Amos calls the wealthy women cows of Bashan who oppress the poor and crush the needy',null,'scholarship'],
  ['god','AMO',4,1,null,'deuteragonist','five-times-rejected',null,null,'Yet you did not return to me: famine, drought, blight, plague, war, and still you did not return',null,'scholarship'],

  ['amos','AMO',6,1,null,'protagonist','complacency-warning',null,null,'Woe to those at ease in Zion who lie on beds of ivory, drink wine in bowls, and are not grieved over the ruin of Joseph',null,'scholarship'],

  ['amos','AMO',8,1,null,'protagonist','summer-fruit-vision',null,null,'Amos sees a basket of summer fruit: the end has come for Israel, and a famine of hearing the word of the Lord',null,'scholarship'],
  ['god','AMO',8,1,null,'deuteragonist','famine-sender',null,null,'I will send a famine, not of bread or water, but of hearing the words of the Lord',null,'scholarship'],

  ['amos','AMO',9,1,null,'protagonist','altar-destruction-and-hope',null,null,'The Lord stands beside the altar commanding its destruction, then promises to raise up the fallen booth of David',null,'scholarship'],
  ['god','AMO',9,1,null,'deuteragonist','destroyer-and-restorer',null,null,'I will restore the fortunes of my people Israel; they shall plant vineyards and never again be uprooted',null,'scholarship'],

  // ===== MICAH (4 missing chapters) =====

  ['micah-prophet','MIC',1,1,null,'protagonist','stripping-lament',null,null,'Micah strips naked and wails because Samaria\'s wound is incurable and has come to the gate of Jerusalem',null,'scholarship'],
  ['god','MIC',1,1,null,'deuteragonist','mountain-melting-judge',null,null,'The Lord comes down and treads on the high places; the mountains melt under Him like wax before fire',null,'scholarship'],

  ['micah-prophet','MIC',2,1,null,'protagonist','land-theft-rebuke',null,null,'Woe to those who devise wickedness on their beds and seize fields and houses in the morning',null,'scholarship'],

  ['micah-prophet','MIC',3,1,null,'protagonist','leader-indictment',null,null,'Hear, you heads of Jacob: you who tear skin from flesh, who build Zion with blood',null,'scholarship'],
  ['god','MIC',3,1,null,'deuteragonist','spirit-empowered',null,null,'But as for me, I am filled with power, with the Spirit of the Lord, to declare to Jacob his transgression',null,'scholarship'],

  ['micah-prophet','MIC',4,1,null,'protagonist','mountain-vision',null,null,'In the latter days the mountain of the Lord\'s house shall be highest; nations shall beat swords into plowshares',null,'scholarship'],
  ['god','MIC',4,1,null,'deuteragonist','peaceable-ruler',null,null,'He shall judge between many peoples; nation shall not lift up sword against nation',null,'scholarship'],

  // ===== NAHUM (2 missing chapters) =====

  ['nahum','NAM',2,1,null,'protagonist','siege-herald',null,null,'Nahum describes Nineveh\'s siege in vivid detail: the shields flash red, the chariots storm through the streets',null,'scholarship'],
  ['god','NAM',2,1,null,'deuteragonist','lion-den-destroyer',null,null,'I am against you, declares the Lord; I will burn your chariots and cut off your prey from the earth',null,'scholarship'],

  ['nahum','NAM',3,1,null,'protagonist','woe-over-nineveh',null,null,'Woe to the bloody city, full of lies and plunder; the crack of whip, the rumble of wheel, the galloping horse',null,'scholarship'],

  // ===== HABAKKUK (1 missing chapter) =====

  ['habakkuk','HAB',2,1,null,'protagonist','watchtower-vigil',null,null,'Habakkuk stations himself on the watchtower to hear God\'s answer; the righteous shall live by faith',null,'scholarship'],
  ['god','HAB',2,1,null,'deuteragonist','vision-giver',null,null,'Write the vision and make it plain; though it tarries, wait for it, it will surely come',null,'scholarship'],

  // ===== ZEPHANIAH (2 missing chapters) =====

  ['zephaniah','ZEP',2,1,null,'protagonist','nations-oracle',null,null,'Seek the Lord, all you humble of the land; perhaps you will be hidden on the day of wrath',null,'scholarship'],

  ['zephaniah','ZEP',3,1,null,'protagonist','woe-and-joy',null,null,'Woe to the oppressing city, but then: the Lord your God is in your midst, a mighty one who will save',null,'scholarship'],
  ['god','ZEP',3,1,null,'deuteragonist','singing-sovereign',null,null,'He will rejoice over you with gladness, quiet you with his love, exult over you with loud singing',null,'scholarship'],

  // ===== HAGGAI (1 missing chapter) =====

  ['haggai','HAG',2,1,null,'protagonist','greater-glory-promise',null,null,'The latter glory of this house shall be greater than the former; in this place I will give peace',null,'scholarship'],
  ['god','HAG',2,1,null,'deuteragonist','shaker-of-nations',null,null,'I will shake the heavens and earth and sea, and the treasures of all nations shall come in',null,'scholarship'],

  // ===== ZECHARIAH (11 missing chapters) =====

  ['zechariah-prophet','ZEC',2,1,null,'protagonist','measuring-line-vision',null,null,'A man with a measuring line goes to measure Jerusalem but is told the city will be unwalled because of its multitude',null,'scholarship'],
  ['god','ZEC',2,1,null,'deuteragonist','fire-wall-protector',null,null,'I will be a wall of fire around Jerusalem and the glory within her',null,'scholarship'],

  ['zechariah-prophet','ZEC',3,1,null,'protagonist','high-priest-vision',null,null,'Joshua the high priest stands in filthy garments before the angel; Satan accuses but God rebukes',null,'scholarship'],
  ['god','ZEC',3,1,null,'deuteragonist','garment-changer',null,null,'Remove the filthy garments; I have taken your iniquity away and will clothe you with pure vestments',null,'scholarship'],

  ['zechariah-prophet','ZEC',4,1,null,'protagonist','lampstand-vision',null,null,'A golden lampstand with seven lamps and two olive trees: not by might nor by power but by my Spirit',null,'scholarship'],
  ['god','ZEC',4,1,null,'deuteragonist','spirit-empowerer',null,null,'Who are you, O great mountain? Before Zerubbabel you shall become a plain',null,'scholarship'],

  ['zechariah-prophet','ZEC',5,1,null,'protagonist','flying-scroll-vision',null,null,'A flying scroll of curses and a woman in a basket called Wickedness, carried away to Shinar',null,'scholarship'],

  ['zechariah-prophet','ZEC',6,1,null,'protagonist','four-chariots-vision',null,null,'Four chariots go out from between two mountains of bronze, patrolling the earth',null,'scholarship'],

  ['zechariah-prophet','ZEC',7,1,null,'protagonist','fasting-question',null,null,'The people ask whether to keep fasting; God says execute true justice and show mercy and compassion',null,'scholarship'],
  ['god','ZEC',7,1,null,'deuteragonist','justice-over-ritual',null,null,'When you fasted, was it for me? Render true judgments, show kindness to one another',null,'scholarship'],

  ['zechariah-prophet','ZEC',8,1,null,'protagonist','restoration-promises',null,null,'Old men and old women shall again sit in the streets of Jerusalem, each with staff in hand because of great age',null,'scholarship'],
  ['god','ZEC',8,1,null,'deuteragonist','zealous-restorer',null,null,'I am jealous for Zion with great jealousy; I will return to Zion and dwell in the midst of Jerusalem',null,'scholarship'],

  ['zechariah-prophet','ZEC',10,1,null,'protagonist','shepherd-oracle',null,null,'Ask rain from the Lord; He will strengthen the house of Judah and save the house of Joseph',null,'scholarship'],
  ['god','ZEC',10,1,null,'deuteragonist','compassionate-gatherer',null,null,'I will bring them back because I have compassion on them; they shall be as though I had not rejected them',null,'scholarship'],

  ['zechariah-prophet','ZEC',11,1,null,'protagonist','shepherd-rejection',null,null,'Zechariah acts out the role of a shepherd who is valued at thirty pieces of silver and rejected',null,'scholarship'],

  ['zechariah-prophet','ZEC',13,1,null,'protagonist','fountain-and-sword',null,null,'A fountain opened for the house of David for sin and uncleanness; strike the shepherd and the sheep scatter',null,'scholarship'],
  ['god','ZEC',13,1,null,'deuteragonist','refining-sovereign',null,null,'I will put the third into the fire and refine them; they will call on my name and I will answer them',null,'scholarship'],

  ['zechariah-prophet','ZEC',14,1,null,'protagonist','final-battle-vision',null,null,'The Lord will go out and fight against the nations; His feet shall stand on the Mount of Olives',null,'scholarship'],
  ['god','ZEC',14,1,null,'deuteragonist','king-of-all-earth',null,null,'The Lord will be king over all the earth; on that day there shall be one Lord and His name one',null,'scholarship'],

  // ===== MALACHI (3 missing chapters) =====

  ['malachi','MAL',1,1,null,'protagonist','love-questioned',null,null,'I have loved you, says the Lord, but you say how have you loved us? The priests despise God\'s table',null,'scholarship'],
  ['god','MAL',1,1,null,'deuteragonist','offended-father',null,null,'A son honors his father; if I am a father, where is my honor? You offer blind and lame animals on my altar',null,'scholarship'],

  ['malachi','MAL',2,1,null,'protagonist','covenant-violation',null,null,'The priests have corrupted the covenant of Levi; Judah has been faithless and married foreign gods',null,'scholarship'],
  ['god','MAL',2,1,null,'deuteragonist','witness-against-treachery',null,null,'The Lord was witness between you and the wife of your youth; I hate divorce, says the Lord',null,'scholarship'],

  ['malachi','MAL',4,1,null,'protagonist','final-promise',null,null,'The sun of righteousness shall rise with healing in its wings; Elijah will come before the great and dreadful day',null,'scholarship'],
  ['god','MAL',4,1,null,'deuteragonist','coming-in-fire',null,null,'The day is coming, burning like an oven; all the arrogant and evildoers will be stubble',null,'scholarship'],
]);

console.log('Done PROPHETS gaps — inserted rows for ISA/JER/LAM/EZK/DAN/HOS/JOL/AMO/MIC/NAM/HAB/ZEP/HAG/ZEC/MAL');
db.close();
