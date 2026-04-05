/**
 * Insert passage_themes for 148 missing Major Prophet chapters.
 *
 * Missing chapters:
 *   ISA: 1,3,4,8,10-39,41-51,53-60,62-64,66           (57 ch)
 *   JER: 2-6,8-17,19,21-28,30,33-38,40-52              (44 ch)
 *   LAM: 2,4                                            (2 ch)
 *   EZK: 2-9,11-33,35,38,39,41-46,48                   (41 ch)
 *   DAN: 8,10,11,12                                     (4 ch)
 *
 * 2-3 themes per chapter, source_tier = 'ai_assisted'.
 */
const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

/* ───────────────────────────────────────────────────────
 * 1. Ensure any new theme slugs exist in the themes table
 * ─────────────────────────────────────────────────────── */
const newThemes = [
  { id: 'judgment',          name: 'Judgment',          category: 'doctrine',        definition: 'God\'s decisive evaluation and sentencing of sin, both temporal and eschatological.',                          modernFraming: 'The conviction that wrong will not go unchecked forever.' },
  { id: 'suffering-servant', name: 'Suffering Servant', category: 'doctrine',        definition: 'The mysterious figure of Isaiah who bears the sins of many through innocent suffering.',                     modernFraming: 'The paradox that the most consequential victories come through willing sacrifice, not force.' },
  { id: 'comfort',           name: 'Comfort',           category: 'virtue',          definition: 'Divine consolation offered to those in grief, exile, or despair — a tenderness that restores.',             modernFraming: 'The reassurance you are not alone in the dark, and the dark is not the end.' },
  { id: 'restoration',       name: 'Restoration',       category: 'doctrine',        definition: 'God\'s act of returning what was lost, broken, or exiled to wholeness and right relationship.',             modernFraming: 'The stubborn hope that ruin is never God\'s final word.' },
  { id: 'pride',             name: 'Pride',             category: 'condition',       definition: 'Self-exaltation that usurps God\'s place, the root sin behind idolatry and injustice.',                     modernFraming: 'The voice that says you are the center of the story.' },
  { id: 'shepherd',          name: 'Shepherd',          category: 'relationship',    definition: 'God or His appointed leader as the one who feeds, guides, protects, and gathers the flock.',               modernFraming: 'The leader who sacrifices personal comfort for the well-being of those in their care.' },
  { id: 'second-coming',     name: 'Second Coming',     category: 'doctrine',        definition: 'The expected future return of God\'s anointed to consummate history, judge the nations, and restore all things.', modernFraming: 'The belief that history is heading somewhere, and Someone is coming to set it right.' },
  { id: 'spiritual-warfare', name: 'Spiritual Warfare', category: 'condition',       definition: 'The cosmic conflict between God\'s purposes and opposing spiritual powers that affects earthly events.',    modernFraming: 'The unseen dimension behind visible struggles — the sense that more is at stake than meets the eye.' },
  { id: 'perseverance',      name: 'Perseverance',      category: 'virtue',          definition: 'Steadfast endurance through suffering and opposition, holding fast to faith when everything says let go.',  modernFraming: 'Showing up again tomorrow when today nearly broke you.' },
];

const insertTheme = db.prepare(`
  INSERT OR IGNORE INTO themes (id, name, category, parent_theme_id, definition, modern_framing, related_themes, source_tier)
  VALUES (@id, @name, @category, NULL, @definition, @modernFraming, '[]', 'ai_assisted')
`);

const insertThemesBatch = db.transaction(() => {
  let created = 0;
  for (const t of newThemes) {
    const info = insertTheme.run(t);
    if (info.changes > 0) created++;
  }
  return created;
});

const themesCreated = insertThemesBatch();
if (themesCreated > 0) console.log(`Created ${themesCreated} new theme(s).`);

/* ───────────────────────────────────────────────────────
 * 2. passage_themes rows
 *    Format: [themeId, bookId, chapter, vStart, vEnd, relevance, contextNote]
 * ─────────────────────────────────────────────────────── */
const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const rows = [
  /* ======================= ISAIAH ======================= */

  // --- ISA judgment oracles (1-12, 28-35) ---

  // ISA 1 — The great arraignment
  ['judgment', 'ISA', 1, 1, 31, 'primary',
    'God opens court against Judah: the ox knows its owner but Israel does not know its God — the most stinging comparison in the prophets.'],
  ['sin', 'ISA', 1, 1, 31, 'primary',
    'The catalogue of religious hypocrisy is devastating: God is sick of their sacrifices while their hands are full of blood.'],
  ['justice', 'ISA', 1, 1, 31, 'secondary',
    'The remedy is plain: learn to do right, seek justice, defend the oppressed, take up the cause of the fatherless and the widow.'],

  // ISA 3 — Judgment on Jerusalem's leaders
  ['judgment', 'ISA', 3, 1, 26, 'primary',
    'God removes every support from Jerusalem — bread, water, hero, judge, prophet — leaving the city leaderless and tottering.'],
  ['sin', 'ISA', 3, 1, 26, 'primary',
    'Leaders devour the vineyard and grind the faces of the poor; their arrogance becomes its own indictment.'],

  // ISA 4 — The Branch of the Lord
  ['restoration', 'ISA', 4, 1, 6, 'primary',
    'After judgment the Branch of the Lord will be beautiful and glorious, and a canopy of cloud and fire will shelter Zion — Exodus imagery reborn.'],
  ['holiness', 'ISA', 4, 1, 6, 'primary',
    'Those who remain will be called holy, cleansed by a spirit of judgment and burning — holiness as what survives the fire.'],

  // ISA 8 — The waters of Shiloah refused
  ['judgment', 'ISA', 8, 1, 23, 'primary',
    'Because the people reject the gentle waters of Shiloah, God will bring the floodwaters of Assyria over them like a river bursting its banks.'],
  ['sovereignty', 'ISA', 8, 1, 23, 'primary',
    'Isaiah binds up the testimony among his disciples and waits for the Lord who is hiding His face — faith that trusts when God goes silent.'],

  // ISA 10 — Assyria the rod of God's anger
  ['sovereignty', 'ISA', 10, 1, 34, 'primary',
    'Assyria is the rod in God\'s hand, but the rod does not know it is being wielded — divine sovereignty working through an arrogant empire.'],
  ['judgment', 'ISA', 10, 1, 34, 'primary',
    'When God finishes using Assyria, He will punish the boasting heart of the king who says "By the strength of my hand I have done this."'],

  // ISA 11 — The shoot from Jesse's stump
  ['redemption', 'ISA', 11, 1, 16, 'primary',
    'A shoot will come from the stump of Jesse, and the Spirit of the Lord will rest on him — hope growing from what looks like death.'],
  ['justice', 'ISA', 11, 1, 16, 'primary',
    'He will judge the poor with righteousness and decide with equity for the meek — the Messiah\'s reign defined by justice, not power.'],
  ['hope', 'ISA', 11, 1, 16, 'secondary',
    'The wolf will dwell with the lamb and a little child will lead them — the most luminous vision of cosmic peace in the Old Testament.'],

  // ISA 12 — Song of thanksgiving
  ['salvation', 'ISA', 12, 1, 6, 'primary',
    'Israel sings "God is my salvation; I will trust and not be afraid" — the first Exodus song resung after deliverance from exile.'],
  ['worship', 'ISA', 12, 1, 6, 'primary',
    'The chapter is pure praise: shout and sing for joy, for great is the Holy One of Israel in your midst.'],

  // ISA 13 — Oracle against Babylon
  ['judgment', 'ISA', 13, 1, 22, 'primary',
    'God summons a cosmic army against Babylon; the day of the Lord comes with wrath and fierce anger to make the land desolate.'],
  ['sovereignty', 'ISA', 13, 1, 22, 'primary',
    'Even mighty Babylon is a tool in God\'s hand — empires rise and fall at His command.'],

  // ISA 14 — Fall of the king of Babylon
  ['pride', 'ISA', 14, 1, 32, 'primary',
    'The king who said "I will ascend above the heights of the clouds, I will make myself like the Most High" is brought down to Sheol.'],
  ['judgment', 'ISA', 14, 1, 32, 'primary',
    'The taunt song over Babylon\'s fallen king is Scripture\'s most vivid portrait of how God humbles the exalted.'],

  // ISA 15 — Oracle against Moab
  ['judgment', 'ISA', 15, 1, 9, 'primary',
    'Moab\'s destruction comes overnight: cities ruined, waters full of blood, and refugees fleeing with their possessions on their backs.'],
  ['grief', 'ISA', 15, 1, 9, 'primary',
    'Even the prophet\'s heart cries out for Moab — judgment pronounced with tears, not gloating.'],

  // ISA 16 — Moab's pride and lament
  ['pride', 'ISA', 16, 1, 14, 'primary',
    'Moab is famous for her pride, her insolence, her boasting — and none of it will save her.'],
  ['judgment', 'ISA', 16, 1, 14, 'primary',
    'The joyful shouting over harvests will cease, and Isaiah himself moans like a harp for Moab — compassion woven into condemnation.'],

  // ISA 17 — Oracle against Damascus
  ['judgment', 'ISA', 17, 1, 14, 'primary',
    'Damascus will become a heap of ruins and the glory of Jacob will thin, like a reaper gathering standing grain in the Valley of Rephaim.'],
  ['idolatry', 'ISA', 17, 1, 14, 'primary',
    'In that day people will look to their Maker instead of their altars and Asherah poles — disaster stripping away every substitute god.'],

  // ISA 18 — Oracle concerning Cush
  ['sovereignty', 'ISA', 18, 1, 7, 'primary',
    'God quietly watches from His dwelling place like shimmering heat in sunshine, then acts at the precise moment — sovereignty expressed as patient timing.'],
  ['judgment', 'ISA', 18, 1, 7, 'primary',
    'A powerful distant nation will be cut down like pruned branches left for the birds, then will bring gifts to the Lord on Mount Zion.'],

  // ISA 19 — Oracle against Egypt
  ['judgment', 'ISA', 19, 1, 25, 'primary',
    'The Lord rides a swift cloud into Egypt: idols tremble, the Nile dries up, and wise counselors become fools.'],
  ['redemption', 'ISA', 19, 1, 25, 'primary',
    'The chapter ends with astonishing hope: Egypt called "my people," Assyria "my handiwork," and Israel "my inheritance" — former enemies blessed together.'],

  // ISA 20 — Isaiah walks naked as a sign
  ['judgment', 'ISA', 20, 1, 6, 'primary',
    'Isaiah walks stripped and barefoot for three years as a sign that Egypt and Cush will be led away naked by Assyria.'],
  ['sovereignty', 'ISA', 20, 1, 6, 'primary',
    'The shocking prophetic act warns Judah against trusting alliances with Egypt — only God is a reliable refuge.'],

  // ISA 21 — Oracle on the desert by the sea
  ['judgment', 'ISA', 21, 1, 17, 'primary',
    'Babylon has fallen, has fallen! All the images of her gods lie shattered on the ground — the watchman\'s long vigil rewarded with devastating news.'],
  ['sovereignty', 'ISA', 21, 1, 17, 'primary',
    'The watchman keeps his post night after night until God reveals the outcome — human faithfulness paired with divine timing.'],

  // ISA 22 — Oracle on the Valley of Vision
  ['judgment', 'ISA', 22, 1, 25, 'primary',
    'Jerusalem parties while the enemy approaches; instead of weeping and repentance, the people say "Let us eat and drink, for tomorrow we die."'],
  ['sin', 'ISA', 22, 1, 25, 'primary',
    'Shebna the steward carves himself a grand tomb while the city crumbles — self-serving leadership indicted by the prophet.'],

  // ISA 23 — Oracle against Tyre
  ['judgment', 'ISA', 23, 1, 18, 'primary',
    'Tyre, merchant queen of the seas, will be forgotten for seventy years — even commercial empires answer to God.'],
  ['sovereignty', 'ISA', 23, 1, 18, 'primary',
    'The Lord Almighty planned Tyre\'s downfall to humble all human glory and bring low the renowned of the earth.'],

  // ISA 24 — The Lord's devastation of the earth
  ['judgment', 'ISA', 24, 1, 23, 'primary',
    'The earth is utterly laid waste — its people have broken the everlasting covenant, and the curse devours the land.'],
  ['sovereignty', 'ISA', 24, 1, 23, 'primary',
    'The Lord Almighty will reign on Mount Zion and before His elders with such glory that the moon is disgraced and the sun ashamed.'],

  // ISA 25 — Praise for God's faithful plans
  ['salvation', 'ISA', 25, 1, 12, 'primary',
    'God will swallow up death forever and wipe away tears from all faces — the most hopeful single verse in the prophetic corpus.'],
  ['worship', 'ISA', 25, 1, 12, 'primary',
    'On this mountain God prepares a feast of rich food and aged wine for all peoples — salvation envisioned as a banquet.'],

  // ISA 26 — Song of trust
  ['trust', 'ISA', 26, 1, 21, 'primary',
    'Perfect peace is kept for those whose minds are stayed on the Lord — trust as the foundation of inner stability.'],
  ['hope', 'ISA', 26, 1, 21, 'primary',
    'Your dead will live, their bodies will rise — an early whisper of resurrection hope in Israel\'s long night.'],

  // ISA 27 — Deliverance of Israel
  ['redemption', 'ISA', 27, 1, 13, 'primary',
    'In that day the Lord will thresh from the Euphrates to the Wadi of Egypt and gather Israel one by one — redemption is personal, not just national.'],
  ['restoration', 'ISA', 27, 1, 13, 'primary',
    'A great trumpet will sound and the lost in Assyria and the outcasts in Egypt will come worship the Lord on the holy mountain.'],

  // ISA 28 — Woe to Ephraim's drunkards
  ['judgment', 'ISA', 28, 1, 29, 'primary',
    'The proud crown of Ephraim\'s drunkards will be trampled underfoot; priests and prophets stagger with wine and reel with beer.'],
  ['justice', 'ISA', 28, 1, 29, 'primary',
    'God will make justice the measuring line and righteousness the plumb line — a tested cornerstone laid in Zion amid the rubble of lies.'],

  // ISA 29 — Woe to Ariel (Jerusalem)
  ['judgment', 'ISA', 29, 1, 24, 'primary',
    'The city where David settled will be besieged until her voice comes ghostlike from the dust — Jerusalem reduced to a whisper.'],
  ['idolatry', 'ISA', 29, 1, 24, 'primary',
    'These people honor God with their lips but their hearts are far from Him; their worship is merely human rules learned by rote.'],

  // ISA 30 — Woe to the obstinate nation
  ['sin', 'ISA', 30, 1, 33, 'primary',
    'Israel runs to Egypt for help without consulting God, adding sin to sin like children piling rebellion on rebellion.'],
  ['sovereignty', 'ISA', 30, 1, 33, 'primary',
    'In repentance and rest is your salvation, in quietness and trust is your strength — but you would have none of it.'],

  // ISA 31 — Woe to those who rely on Egypt
  ['judgment', 'ISA', 31, 1, 9, 'primary',
    'Those who go down to Egypt for help and rely on horses will find that Egyptians are human, not divine, and their horses flesh, not spirit.'],
  ['sovereignty', 'ISA', 31, 1, 9, 'primary',
    'Like birds hovering overhead, the Lord Almighty will shield Jerusalem; He will pass over it and deliver it.'],

  // ISA 32 — The kingdom of righteousness
  ['justice', 'ISA', 32, 1, 20, 'primary',
    'A king will reign in righteousness and rulers will rule with justice — each leader a shelter from the wind and a stream in the desert.'],
  ['hope', 'ISA', 32, 1, 20, 'primary',
    'The Spirit is poured out from on high and the desert becomes a fertile field; justice and righteousness produce lasting peace and security.'],

  // ISA 33 — Woe to the destroyer
  ['judgment', 'ISA', 33, 1, 24, 'primary',
    'The destroyer will be destroyed and the treacherous betrayed — God rises to punish those who thought themselves untouchable.'],
  ['salvation', 'ISA', 33, 1, 24, 'primary',
    'Your eyes will see the king in his beauty and view a land that stretches afar — salvation as a vision of breathtaking spaciousness.'],

  // ISA 34 — Judgment against the nations
  ['judgment', 'ISA', 34, 1, 17, 'primary',
    'The Lord is angry with all nations: the heavens are rolled up like a scroll and His sword is bathed in blood — cosmic judgment in prophetic poetry.'],
  ['sovereignty', 'ISA', 34, 1, 17, 'primary',
    'Every creature receives its portion by the Lord\'s decree; His mouth commands and His Spirit gathers — sovereignty extending to every detail.'],

  // ISA 35 — Joy of the redeemed
  ['redemption', 'ISA', 35, 1, 10, 'primary',
    'The ransomed of the Lord return to Zion with singing, and everlasting joy crowns their heads — sorrow and sighing flee away.'],
  ['hope', 'ISA', 35, 1, 10, 'primary',
    'The desert blooms, the blind see, the deaf hear, the lame leap like a deer — creation itself is healed when God\'s people come home.'],

  // ISA 36 — Sennacherib threatens Jerusalem
  ['faith', 'ISA', 36, 1, 22, 'primary',
    'The Assyrian field commander mocks Hezekiah\'s trust in God, using every psychological weapon to break Jerusalem\'s faith before the siege begins.'],
  ['sovereignty', 'ISA', 36, 1, 22, 'primary',
    'Sennacherib claims God himself sent him to destroy Jerusalem — propaganda that twists theological language to serve imperial power.'],

  // ISA 37 — Hezekiah's prayer and deliverance
  ['prayer', 'ISA', 37, 1, 38, 'primary',
    'Hezekiah spreads the threatening letter before the Lord and prays — one of Scripture\'s most vivid pictures of bringing an impossible situation to God.'],
  ['sovereignty', 'ISA', 37, 1, 38, 'primary',
    'An angel strikes down 185,000 Assyrians in a single night — God defends Jerusalem for His own sake and for David\'s sake.'],

  // ISA 38 — Hezekiah's illness and recovery
  ['prayer', 'ISA', 38, 1, 22, 'primary',
    'Hezekiah turns his face to the wall and weeps bitterly; God adds fifteen years to his life — prayer that bends the trajectory of a life.'],
  ['suffering', 'ISA', 38, 1, 22, 'primary',
    'Hezekiah\'s psalm from his sickbed is raw: "Like a lion he breaks all my bones" — suffering described as God\'s own assault before God\'s own healing.'],

  // ISA 39 — Envoys from Babylon
  ['judgment', 'ISA', 39, 1, 8, 'primary',
    'Hezekiah shows Babylon\'s envoys everything in his treasury — a moment of foolish pride that foreshadows the exile centuries before it happens.'],
  ['sovereignty', 'ISA', 39, 1, 8, 'primary',
    'Isaiah announces that everything Hezekiah showed will be carried to Babylon; the king accepts the word of the Lord with eerie calm.'],

  // --- ISA comfort/restoration (40-55) ---

  // ISA 41 — Fear not, I am with you
  ['comfort', 'ISA', 41, 1, 29, 'primary',
    'Three times God says "Fear not" — to the nation, to the worm Jacob, to the thirsty — comfort layered on comfort for every kind of smallness.'],
  ['sovereignty', 'ISA', 41, 1, 29, 'primary',
    'God calls Cyrus from the east and challenges the idols to predict the future; only the Lord announces the end from the beginning.'],

  // ISA 42 — First Servant Song
  ['suffering-servant', 'ISA', 42, 1, 25, 'primary',
    'Here is my servant, whom I uphold, my chosen one in whom I delight — the Servant will bring justice to the nations without breaking a bruised reed.'],
  ['mission', 'ISA', 42, 1, 25, 'primary',
    'The Servant is a covenant for the people and a light for the Gentiles, to open blind eyes and free captives from darkness — mission defined as liberation.'],
  ['justice', 'ISA', 42, 1, 25, 'secondary',
    'He will not falter or be discouraged till he establishes justice on earth — quiet persistence, not military force, is the Servant\'s method.'],

  // ISA 43 — You are mine
  ['redemption', 'ISA', 43, 1, 28, 'primary',
    'Fear not, for I have redeemed you; I have called you by name, you are mine — the most intimate declaration of belonging in the prophets.'],
  ['comfort', 'ISA', 43, 1, 28, 'primary',
    'When you pass through the waters, I will be with you; through the rivers, they shall not overwhelm you — presence promised in every kind of drowning.'],

  // ISA 44 — Israel the chosen, idols the absurd
  ['sovereignty', 'ISA', 44, 1, 28, 'primary',
    'God names Cyrus as His shepherd before Cyrus is born — sovereignty that scripts history in advance.'],
  ['idolatry', 'ISA', 44, 1, 28, 'primary',
    'The idol-maker uses half a log to cook dinner and carves the other half into a god — the most devastating satire of idolatry in Scripture.'],

  // ISA 45 — Cyrus the anointed
  ['sovereignty', 'ISA', 45, 1, 26, 'primary',
    'God calls Cyrus "my anointed" and opens doors before him — a pagan king serving God\'s purposes without knowing it.'],
  ['salvation', 'ISA', 45, 1, 26, 'primary',
    'Turn to me and be saved, all the ends of the earth — salvation offered universally, not just to Israel.'],

  // ISA 46 — Bel and Nebo bow down
  ['sovereignty', 'ISA', 46, 1, 13, 'primary',
    'Babylon\'s gods must be carried on carts by weary animals, but Israel\'s God carries His people from birth to old age — the difference between a dead idol and the living God.'],
  ['idolatry', 'ISA', 46, 1, 13, 'primary',
    'To whom will you compare me? Gold poured into a mold cannot move, cannot answer, cannot save — idolatry as the worship of your own craftsmanship.'],

  // ISA 47 — Fall of Babylon
  ['judgment', 'ISA', 47, 1, 15, 'primary',
    'Virgin Daughter Babylon sits in the dust: her luxury stripped, her sorceries useless, her merchants scattered — no one to save her.'],
  ['sovereignty', 'ISA', 47, 1, 15, 'primary',
    'Babylon said "I am, and there is none besides me" — an echo of God\'s own self-declaration, and the root sin of every empire.'],

  // ISA 48 — Refined but not as silver
  ['redemption', 'ISA', 48, 1, 22, 'primary',
    'For my own name\'s sake I delay my wrath; I have refined you but not as silver — God saves a stubborn people for the sake of His own character.'],
  ['sovereignty', 'ISA', 48, 1, 22, 'primary',
    'God announces new things before they spring into being so Israel cannot credit idols; sovereignty includes the timing of revelation.'],

  // ISA 49 — Second Servant Song
  ['suffering-servant', 'ISA', 49, 1, 26, 'primary',
    'The Servant is called from the womb and hidden like a polished arrow — formed for a mission that feels like failure until God reveals its scope.'],
  ['mission', 'ISA', 49, 1, 26, 'primary',
    'It is too small a thing for the Servant to restore Israel alone; He will be a light for the Gentiles — mission expanded beyond every boundary.'],
  ['comfort', 'ISA', 49, 1, 26, 'secondary',
    'Can a mother forget her nursing child? Even she may forget, but I will not forget you — God\'s love surpassing the strongest human bond.'],

  // ISA 50 — Third Servant Song
  ['suffering-servant', 'ISA', 50, 1, 11, 'primary',
    'The Servant offers his back to those who strike him and his cheeks to those who pull out his beard — suffering embraced voluntarily, not endured passively.'],
  ['faith', 'ISA', 50, 1, 11, 'primary',
    'The Sovereign Lord helps me; who will condemn me? The Servant\'s confidence rests entirely on God, not on circumstances.'],

  // ISA 51 — Awake, awake, put on strength
  ['comfort', 'ISA', 51, 1, 23, 'primary',
    'Listen to me, you who pursue righteousness: look to the rock from which you were cut — comfort rooted in remembering origins.'],
  ['redemption', 'ISA', 51, 1, 23, 'primary',
    'The ransomed of the Lord will return with singing; everlasting joy will crown their heads — the same promise from chapter 35 repeated because exiles need to hear it twice.'],

  // --- ISA Servant Songs continued + future vision (53, 56-66) ---

  // ISA 53 — Fourth Servant Song
  ['atonement', 'ISA', 53, 1, 12, 'primary',
    'He was pierced for our transgressions, crushed for our iniquities; the punishment that brought us peace was on him — substitutionary suffering at its starkest.'],
  ['suffering-servant', 'ISA', 53, 1, 12, 'primary',
    'He was despised and rejected, a man of sorrows acquainted with grief — the Servant\'s identity is forged entirely in pain.'],
  ['redemption', 'ISA', 53, 1, 12, 'secondary',
    'By his wounds we are healed; the Lord has laid on him the iniquity of us all — redemption accomplished through innocent suffering, not military conquest.'],

  // ISA 54 — Sing, barren woman
  ['restoration', 'ISA', 54, 1, 17, 'primary',
    'Sing, barren woman, for the children of the desolate will be more than of her who has a husband — restoration that exceeds the original blessing.'],
  ['comfort', 'ISA', 54, 1, 17, 'primary',
    'For a brief moment I abandoned you, but with deep compassion I will bring you back — God\'s anger lasts a moment, His love lasts forever.'],

  // ISA 55 — Come, all who are thirsty
  ['salvation', 'ISA', 55, 1, 13, 'primary',
    'Come, everyone who thirsts, come to the waters; you who have no money, come, buy and eat — salvation offered free to the desperate.'],
  ['hope', 'ISA', 55, 1, 13, 'primary',
    'My word will not return to me empty but will accomplish what I desire — hope grounded in the reliability of God\'s promises.'],

  // ISA 56 — Salvation for foreigners and eunuchs
  ['mission', 'ISA', 56, 1, 12, 'primary',
    'Foreigners and eunuchs who keep God\'s covenant will receive a name better than sons and daughters — inclusion that shatters every boundary.'],
  ['justice', 'ISA', 56, 1, 12, 'primary',
    'God\'s house shall be called a house of prayer for all nations — the temple\'s purpose redefined as universal access to God.'],

  // ISA 57 — Peace for the righteous
  ['judgment', 'ISA', 57, 1, 21, 'primary',
    'God condemns the idolaters who sacrifice children in the ravines and set up their beds on every high hill — religion become obscenity.'],
  ['comfort', 'ISA', 57, 1, 21, 'primary',
    'The high and exalted One who lives forever also dwells with the contrite and lowly — transcendence and intimacy in the same breath.'],

  // ISA 58 — True fasting
  ['justice', 'ISA', 58, 1, 14, 'primary',
    'The fast God chooses is to loose the chains of injustice, share food with the hungry, and provide shelter for the poor — worship measured by action.'],
  ['worship', 'ISA', 58, 1, 14, 'primary',
    'If you spend yourselves on behalf of the hungry, your light will rise in the darkness — genuine worship transforms both the giver and the world.'],

  // ISA 59 — Sin separates, God intervenes
  ['sin', 'ISA', 59, 1, 21, 'primary',
    'God\'s arm is not too short to save, but your iniquities have separated you from God — the problem is not divine inability but human rebellion.'],
  ['redemption', 'ISA', 59, 1, 21, 'primary',
    'God looked and was appalled that there was no one to intervene, so His own arm achieved salvation — redemption as God doing what no one else could.'],

  // ISA 60 — Arise, shine, for your light has come
  ['restoration', 'ISA', 60, 1, 22, 'primary',
    'Nations will come to your light and kings to the brightness of your dawn — Zion restored as the magnetic center of a healed world.'],
  ['hope', 'ISA', 60, 1, 22, 'primary',
    'The sun will no more be your light by day, for the Lord will be your everlasting light — creation transcended by the Creator\'s own radiance.'],

  // ISA 62 — Zion's new name
  ['restoration', 'ISA', 62, 1, 12, 'primary',
    'You will be called by a new name that the mouth of the Lord will bestow — Hephzibah (My Delight Is in Her) replacing Forsaken.'],
  ['mission', 'ISA', 62, 1, 12, 'primary',
    'The watchmen on Jerusalem\'s walls never fall silent; they give the Lord no rest until He establishes Zion — intercession as holy stubbornness.'],

  // ISA 63 — The warrior from Edom and the prayer of remembrance
  ['judgment', 'ISA', 63, 1, 19, 'primary',
    'Who is this coming from Edom with garments stained crimson? I have trodden the winepress alone — God as lone warrior executing judgment.'],
  ['hope', 'ISA', 63, 1, 19, 'primary',
    'The prophet remembers Moses and the exodus, pleading with God to act again — hope built on the precedent of past deliverance.'],

  // ISA 64 — Oh that you would rend the heavens
  ['prayer', 'ISA', 64, 1, 12, 'primary',
    'Oh that you would rend the heavens and come down! — the most desperate prayer in the prophets, begging God to stop being distant.'],
  ['sin', 'ISA', 64, 1, 12, 'primary',
    'All our righteous acts are like filthy rags, and like autumn leaves our sins sweep us away — utter moral bankruptcy confessed without flinching.'],

  // ISA 66 — New heavens and new earth
  ['new-creation', 'ISA', 66, 1, 24, 'primary',
    'As the new heavens and new earth endure before me, so will your offspring and your name endure — the Bible\'s grandest promise of permanence.'],
  ['worship', 'ISA', 66, 1, 24, 'primary',
    'From one New Moon to another and from one Sabbath to another, all mankind will come and bow down before me — worship as the eternal rhythm of the new creation.'],
  ['judgment', 'ISA', 66, 1, 24, 'secondary',
    'Heaven is my throne and earth my footstool; what house could you build for me? — God rejects temple confidence that substitutes for obedient hearts.'],

  /* ======================= JEREMIAH ======================= */

  // --- JER judgment ---

  // JER 2 — Israel's unfaithfulness
  ['idolatry', 'JER', 2, 1, 37, 'primary',
    'Israel has exchanged her glory for worthless idols — a spring of living water abandoned for cracked cisterns that hold nothing.'],
  ['covenant', 'JER', 2, 1, 37, 'primary',
    'God remembers the devotion of Israel\'s youth, the love of her bridal days — covenant tenderness contrasted with present betrayal.'],

  // JER 3 — Return, faithless Israel
  ['repentance', 'JER', 3, 1, 25, 'primary',
    'Return, faithless Israel — God pleads for repentance even after spiritual adultery that would end any human marriage.'],
  ['covenant', 'JER', 3, 1, 25, 'primary',
    'God compares Israel and Judah to two unfaithful sisters, yet promises shepherds after His own heart who will lead with knowledge and understanding.'],

  // JER 4 — Disaster from the north
  ['judgment', 'JER', 4, 1, 31, 'primary',
    'A lion has come out of his lair, a destroyer of nations has set out — Babylon advances while Jeremiah watches the earth return to formless void.'],
  ['repentance', 'JER', 4, 1, 31, 'primary',
    'Circumcise your hearts, people of Judah — external religion without internal transformation will not avert the coming disaster.'],

  // JER 5 — Not one righteous person
  ['sin', 'JER', 5, 1, 31, 'primary',
    'God sends Jeremiah searching for one honest person in Jerusalem and he cannot find one — injustice so pervasive it has become invisible.'],
  ['judgment', 'JER', 5, 1, 31, 'primary',
    'The prophets prophesy lies, the priests rule by their own authority, and the people love it — a nation that prefers comfortable deception to hard truth.'],

  // JER 6 — Jerusalem under siege
  ['judgment', 'JER', 6, 1, 30, 'primary',
    'Prepare for battle against Jerusalem! The city is full of oppression as a well is full of water — violence pours out continuously.'],
  ['sin', 'JER', 6, 1, 30, 'primary',
    'From the least to the greatest, all are greedy for gain; prophets and priests practice deceit, crying "Peace, peace" when there is no peace.'],

  // JER 8 — No balm in Gilead
  ['grief', 'JER', 8, 1, 23, 'primary',
    'Is there no balm in Gilead? Is there no physician there? Jeremiah weeps because the wound of his people will not heal.'],
  ['judgment', 'JER', 8, 1, 23, 'primary',
    'Even the stork knows her appointed seasons, but God\'s people do not know the requirements of the Lord — nature shames the nation.'],

  // JER 9 — A fountain of tears
  ['grief', 'JER', 9, 1, 26, 'primary',
    'Oh that my head were a spring of water and my eyes a fountain of tears — the weeping prophet earns his title.'],
  ['sin', 'JER', 9, 1, 26, 'primary',
    'Their tongues are deadly arrows; they speak cordially to their neighbors while setting traps — a society corroded by weaponized language.'],

  // JER 10 — The true God vs. worthless idols
  ['idolatry', 'JER', 10, 1, 25, 'primary',
    'A tree is cut from the forest, adorned with silver and gold, and fastened with nails — the idol is a scarecrow in a cucumber field, and cannot speak.'],
  ['sovereignty', 'JER', 10, 1, 25, 'primary',
    'The Lord is the true God, the living God, the eternal King; when He is angry, the earth trembles — no idol can compare.'],

  // JER 11 — The broken covenant
  ['covenant', 'JER', 11, 1, 23, 'primary',
    'This nation has broken the covenant I made with their ancestors — God indicts Judah for violating the Sinai agreement in every particular.'],
  ['judgment', 'JER', 11, 1, 23, 'primary',
    'The men of Anathoth plot to kill Jeremiah for prophesying, and God pronounces judgment on them — opposition to truth invites its own destruction.'],

  // JER 12 — Jeremiah's complaint
  ['justice', 'JER', 12, 1, 17, 'primary',
    'Why does the way of the wicked prosper? Jeremiah dares to put God on trial and God responds by raising the stakes rather than answering the question.'],
  ['suffering', 'JER', 12, 1, 17, 'primary',
    'If you have raced with men on foot and they have wearied you, how will you compete with horses? — God tells the suffering prophet it will get worse.'],

  // JER 13 — The ruined linen belt
  ['judgment', 'JER', 13, 1, 27, 'primary',
    'Like a belt that clings to a man\'s waist, God bound Israel to Himself — but the belt buried by the Euphrates is now rotting and useless.'],
  ['pride', 'JER', 13, 1, 27, 'primary',
    'Can an Ethiopian change his skin or a leopard its spots? Neither can you do good who are accustomed to doing evil — pride has become second nature.'],

  // JER 14 — Drought, sword, and famine
  ['judgment', 'JER', 14, 1, 22, 'primary',
    'The ground is cracked, the farmers are dismayed, even the doe abandons her newborn fawn — creation itself suffers for the people\'s sin.'],
  ['prayer', 'JER', 14, 1, 22, 'primary',
    'Jeremiah intercedes but God tells him to stop praying for this people — the terrifying moment when judgment overrides intercession.'],

  // JER 15 — Jeremiah's second lament
  ['suffering', 'JER', 15, 1, 21, 'primary',
    'I sat alone because your hand was upon me — Jeremiah\'s prophetic calling isolates him from every human community.'],
  ['calling', 'JER', 15, 1, 21, 'primary',
    'If you utter worthy words, you will be my spokesman — God renews Jeremiah\'s commission by challenging him to separate precious from worthless.'],

  // JER 16 — No marriage, no mourning, no feasting
  ['judgment', 'JER', 16, 1, 21, 'primary',
    'God forbids Jeremiah to marry or have children because this generation will die of deadly diseases — the prophet\'s celibacy is an enacted sermon.'],
  ['exile', 'JER', 16, 1, 21, 'primary',
    'I will hurl you out of this land into a land neither you nor your ancestors have known — exile described as God\'s violent throw.'],

  // JER 17 — The heart is deceitful
  ['sin', 'JER', 17, 1, 27, 'primary',
    'The heart is deceitful above all things and beyond cure — Jeremiah\'s most quoted diagnosis of the human condition.'],
  ['trust', 'JER', 17, 1, 27, 'primary',
    'Blessed is the one who trusts in the Lord; he will be like a tree planted by the water — the same image as Psalm 1, the choice between two ways.'],

  // JER 19 — The broken jar
  ['judgment', 'JER', 19, 1, 15, 'primary',
    'Jeremiah shatters a potter\'s jar at the Potsherd Gate: so will God shatter this people and this city, never to be repaired.'],
  ['sin', 'JER', 19, 1, 15, 'primary',
    'They have filled this place with the blood of the innocent and built high places to burn children — sin so extreme it never entered God\'s mind.'],

  // JER 21 — Zedekiah's inquiry and God's answer
  ['judgment', 'JER', 21, 1, 14, 'primary',
    'King Zedekiah asks Jeremiah to pray for deliverance, and God answers that He Himself will fight against Jerusalem with outstretched hand.'],
  ['sovereignty', 'JER', 21, 1, 14, 'primary',
    'God sets before the people the way of life and the way of death: surrender to Babylon and live, or resist and die — sovereignty framed as stark choice.'],

  // JER 22 — Judgment on Judah's kings
  ['justice', 'JER', 22, 1, 30, 'primary',
    'Do what is just and right, rescue the oppressed from the hand of the oppressor — the king\'s only legitimate function reduced to one sentence.'],
  ['judgment', 'JER', 22, 1, 30, 'primary',
    'Jehoiakim builds his palace by injustice, making his people work for nothing — a king who uses forced labor forfeits the right to rule.'],

  // JER 23 — Woe to the shepherds
  ['judgment', 'JER', 23, 1, 40, 'primary',
    'Woe to the shepherds who scatter the flock — God will gather the remnant Himself and raise up a righteous Branch from David\'s line.'],
  ['hope', 'JER', 23, 1, 40, 'primary',
    'The days are coming when God will raise up a righteous king called "The Lord Our Righteousness" — messianic hope in the darkest of times.'],

  // JER 24 — Two baskets of figs
  ['judgment', 'JER', 24, 1, 10, 'primary',
    'The good figs are the exiles God sent to Babylon; the bad figs are those who stayed behind — counter-intuitive judgment where exile is the mercy.'],
  ['hope', 'JER', 24, 1, 10, 'primary',
    'God promises to give the exiles a heart to know Him, and they will return — exile becomes the crucible that produces genuine faith.'],

  // JER 25 — Seventy years of captivity
  ['judgment', 'JER', 25, 1, 39, 'primary',
    'For twenty-three years Jeremiah has spoken and the people have not listened; now God sends Nebuchadnezzar as His servant to devastate the land.'],
  ['sovereignty', 'JER', 25, 1, 39, 'primary',
    'God hands the cup of His wrath to every nation, one by one — even Babylon will drink last, sovereignty orchestrating a sequence of judgment.'],

  // JER 26 — Jeremiah threatened with death
  ['persecution', 'JER', 26, 1, 28, 'primary',
    'The priests and prophets seize Jeremiah and say "You must die!" for prophesying the temple\'s destruction — truth-telling as a capital offense.'],
  ['faithfulness', 'JER', 26, 1, 28, 'primary',
    'Jeremiah stands firm: the Lord sent me to prophesy against this house; do with me whatever you think is right — courage born of calling.'],

  // JER 27 — Submit to Babylon's yoke
  ['sovereignty', 'JER', 27, 1, 46, 'primary',
    'Jeremiah wears a yoke on his neck and tells the nations to submit to Nebuchadnezzar, whom God has made lord over all — sovereignty working through an unlikely instrument.'],
  ['judgment', 'JER', 27, 1, 46, 'primary',
    'Any nation that refuses the yoke will be punished by sword, famine, and plague — resisting God\'s appointed instrument only multiplies suffering.'],

  // JER 28 — Hananiah the false prophet
  ['prophecy', 'JER', 28, 1, 64, 'primary',
    'Hananiah breaks Jeremiah\'s yoke and promises peace within two years; God replaces the wooden yoke with an iron one — false comfort makes the truth heavier.'],
  ['judgment', 'JER', 28, 1, 64, 'primary',
    'Hananiah dies within the year as Jeremiah predicted — the cost of prophesying peace when God has declared judgment.'],

  // --- JER restoration (30-33) ---

  // JER 30 — Restoration after disaster
  ['restoration', 'JER', 30, 1, 33, 'primary',
    'I will restore you to health and heal your wounds, declares the Lord — the same God who wounded now promises to bind up.'],
  ['hope', 'JER', 30, 1, 33, 'primary',
    'Jacob\'s trouble is terrible, but he will be saved out of it; God will break the yoke from their neck and tear off their bonds.'],

  // JER 33 — The Lord our Righteousness
  ['restoration', 'JER', 33, 1, 26, 'primary',
    'Call to me and I will answer you and tell you great and unsearchable things you do not know — promise spoken to Jeremiah while imprisoned.'],
  ['covenant', 'JER', 33, 1, 26, 'primary',
    'God\'s covenant with David is as unbreakable as His covenant with day and night — the Davidic promise anchored in creation\'s stability.'],
  ['hope', 'JER', 33, 1, 26, 'secondary',
    'In those days Judah will be saved and Jerusalem will live in safety, called "The Lord Our Righteousness" — identity redefined by divine character.'],

  // --- JER narrative (34-38) ---

  // JER 34 — Freed slaves re-enslaved
  ['justice', 'JER', 34, 1, 22, 'primary',
    'The people freed their slaves during the siege then re-enslaved them when the pressure eased — faith that evaporates the moment danger passes.'],
  ['covenant', 'JER', 34, 1, 22, 'primary',
    'God declares them covenant-breakers who profaned His name; they passed between the halves of the calf but did not keep their word.'],

  // JER 35 — The Rechabites' faithfulness
  ['faithfulness', 'JER', 35, 1, 19, 'primary',
    'The Rechabites have obeyed their ancestor Jonadab\'s command for generations, while Israel has ignored the living God — human loyalty shames divine disloyalty.'],
  ['obedience', 'JER', 35, 1, 19, 'primary',
    'God holds up the Rechabites as an object lesson: if they can obey a human father\'s commands, why can\'t Israel obey the eternal God?'],

  // JER 36 — The scroll burned and rewritten
  ['faithfulness', 'JER', 36, 1, 32, 'primary',
    'King Jehoiakim cuts Jeremiah\'s scroll into pieces and burns it column by column — you can burn the word but you cannot destroy it.'],
  ['sovereignty', 'JER', 36, 1, 32, 'primary',
    'God tells Jeremiah to write another scroll and adds even more words — divine revelation is not diminished by human destruction.'],

  // JER 37 — Jeremiah imprisoned
  ['suffering', 'JER', 37, 1, 24, 'primary',
    'Jeremiah is beaten and thrown into a dungeon for telling the truth; Zedekiah secretly summons him but lacks the courage to act on his words.'],
  ['faithfulness', 'JER', 37, 1, 24, 'primary',
    'Even in prison Jeremiah speaks the same message: the Babylonians will return and burn this city — prophetic consistency under pressure.'],

  // JER 38 — Jeremiah in the cistern
  ['suffering', 'JER', 38, 1, 40, 'primary',
    'Jeremiah sinks into the mud of an empty cistern, left to die — the prophetic calling at its most physically brutal.'],
  ['faithfulness', 'JER', 38, 1, 40, 'primary',
    'Ebed-Melech the Cushite risks his life to rescue Jeremiah with rags and ropes — an outsider shows the compassion Israel\'s leaders refuse.'],

  // --- JER continued narrative + oracles against nations ---

  // JER 40 — Gedaliah appointed governor
  ['sovereignty', 'JER', 40, 1, 16, 'primary',
    'Nebuzaradan releases Jeremiah and Gedaliah is appointed over the remnant — a fragile new beginning in the ruins of Judah.'],
  ['hope', 'JER', 40, 1, 16, 'primary',
    'Scattered Judeans begin returning from Moab, Ammon, and Edom to harvest a rich crop — life tentatively reasserting itself after catastrophe.'],

  // JER 41 — Gedaliah assassinated
  ['judgment', 'JER', 41, 1, 22, 'primary',
    'Ishmael murders Gedaliah and seventy pilgrims, throwing bodies into the cistern — violence spiraling even after God\'s judgment has fallen.'],
  ['sin', 'JER', 41, 1, 22, 'primary',
    'The assassination destroys the last chance for stability in the land — human sin undoing the fragile mercy God had provided.'],

  // JER 42 — The remnant asks Jeremiah to pray
  ['sovereignty', 'JER', 42, 1, 22, 'primary',
    'The remnant asks Jeremiah to seek God\'s will, promising to obey whatever He says — but their minds are already made up to go to Egypt.'],
  ['judgment', 'JER', 42, 1, 22, 'primary',
    'God says stay in the land and I will build you up; go to Egypt and the sword and famine you fear will follow you there — no escape from running.'],

  // JER 43 — Flight to Egypt
  ['sin', 'JER', 43, 1, 32, 'primary',
    'The people accuse Jeremiah of lying and drag him to Egypt — disobedience that reverses the Exodus, returning to the house of slavery.'],
  ['judgment', 'JER', 43, 1, 32, 'primary',
    'Jeremiah buries stones at the entrance to Pharaoh\'s palace as a sign: Nebuchadnezzar will set his throne on this very spot.'],

  // JER 44 — Disaster for Jews in Egypt
  ['idolatry', 'JER', 44, 1, 30, 'primary',
    'The women openly defend burning incense to the Queen of Heaven, insisting things went well when they worshipped her — idolatry defended with its own distorted evidence.'],
  ['judgment', 'JER', 44, 1, 30, 'primary',
    'God swears by His own great name that almost no one from the remnant in Egypt will return to Judah — the most absolute of judgments.'],

  // JER 45 — Message to Baruch
  ['calling', 'JER', 45, 1, 28, 'primary',
    'Baruch mourns that God has added sorrow to his pain, and God replies: should you seek great things for yourself when I am bringing disaster? — calling that costs.'],
  ['suffering', 'JER', 45, 1, 28, 'primary',
    'God promises to give Baruch his life as a prize of war wherever he goes — survival itself is the reward in a world collapsing.'],

  // --- JER oracles against nations (46-52) ---

  // JER 46 — Oracle against Egypt
  ['judgment', 'JER', 46, 1, 28, 'primary',
    'Egypt\'s army at Carchemish is crushed like a fattened calf led to slaughter — Pharaoh is all noise but misses his moment.'],
  ['sovereignty', 'JER', 46, 1, 28, 'primary',
    'The King, whose name is the Lord Almighty, swears that Nebuchadnezzar will come like Tabor among the mountains — God directing international affairs.'],

  // JER 47 — Oracle against the Philistines
  ['judgment', 'JER', 47, 1, 16, 'primary',
    'Waters rise from the north to become an overflowing torrent; every man will cry out and all who dwell in the land will wail.'],
  ['sovereignty', 'JER', 47, 1, 16, 'primary',
    'The sword of the Lord cannot rest when God has commanded it against Ashkelon and the seacoast — divine purpose behind historical warfare.'],

  // JER 48 — Oracle against Moab
  ['judgment', 'JER', 48, 1, 47, 'primary',
    'Moab has been at ease from youth, settled on its dregs like wine never poured from vessel to vessel — complacency about to be shattered.'],
  ['pride', 'JER', 48, 1, 47, 'primary',
    'We have heard of Moab\'s pride, how great is her arrogance — pride and abundance have produced a nation that trusts in its own works.'],

  // JER 49 — Oracles against Ammon, Edom, Damascus, Kedar, Elam
  ['judgment', 'JER', 49, 1, 39, 'primary',
    'God calls nation after nation to account: Ammon for seizing Gad, Edom for pride in her mountain strongholds, each weighed and found wanting.'],
  ['sovereignty', 'JER', 49, 1, 39, 'primary',
    'Though Edom builds her nest among the stars, God will bring her down — no fortress is high enough to escape divine sovereignty.'],

  // JER 50 — Oracle against Babylon (part 1)
  ['judgment', 'JER', 50, 1, 46, 'primary',
    'Babylon itself will fall; the hammer of the whole earth is cut in pieces — the instrument of God\'s judgment on others now faces its own reckoning.'],
  ['sovereignty', 'JER', 50, 1, 46, 'primary',
    'God stirs up an alliance of great nations from the north against Babylon — the same pattern He used against Judah now turned on the conqueror.'],
  ['hope', 'JER', 50, 1, 46, 'secondary',
    'In those days Israel and Judah together will seek the Lord with weeping, asking the way to Zion — exile\'s end intertwined with Babylon\'s fall.'],

  // JER 51 — Oracle against Babylon (part 2)
  ['judgment', 'JER', 51, 1, 64, 'primary',
    'Babylon was a gold cup in the Lord\'s hand making the whole earth drunk, but suddenly she falls — the empire that intoxicated nations is itself destroyed.'],
  ['divine-plan', 'JER', 51, 1, 64, 'primary',
    'Jeremiah writes all the disasters coming on Babylon in a scroll, ties a stone to it, and sinks it in the Euphrates: so will Babylon sink to rise no more.'],

  // JER 52 — The fall of Jerusalem
  ['judgment', 'JER', 52, 1, 34, 'primary',
    'The city is breached, the temple burned, the walls demolished, and the people marched into exile — everything Jeremiah predicted for forty years fulfilled in a single season.'],
  ['exile', 'JER', 52, 1, 34, 'primary',
    'The detailed inventory of temple vessels carried to Babylon reads like a death certificate for an entire civilization.'],
  ['hope', 'JER', 52, 1, 34, 'secondary',
    'Jehoiachin is released from prison and given a seat at Babylon\'s table — a flicker of Davidic survival in the darkness, the thinnest thread of hope.'],

  /* ======================= LAMENTATIONS ======================= */

  // LAM 2 — God's anger against Zion
  ['judgment', 'LAM', 2, 1, 22, 'primary',
    'The Lord has swallowed up Israel without pity, thrown down her strongholds, and multiplied mourning — God Himself is the destroyer.'],
  ['grief', 'LAM', 2, 1, 22, 'primary',
    'My eyes fail from weeping, my stomach churns; children and infants faint in the streets — grief too visceral for theology to contain.'],
  ['lament', 'LAM', 2, 1, 22, 'secondary',
    'What can I say for you? To what can I compare you, Daughter Jerusalem? — the poet searches for words adequate to unprecedented devastation.'],

  // LAM 4 — The siege's horror
  ['suffering', 'LAM', 4, 1, 22, 'primary',
    'Those killed by the sword are better off than those who die of famine; compassionate women cook their own children — suffering beyond description.'],
  ['judgment', 'LAM', 4, 1, 22, 'primary',
    'The punishment of Daughter Zion is greater than that of Sodom, which was overthrown in a moment without a hand raised against it.'],

  /* ======================= EZEKIEL ======================= */

  // --- EZK visions (2-3) ---

  // EZK 2 — Ezekiel's commission
  ['calling', 'EZK', 2, 1, 10, 'primary',
    'Son of man, I am sending you to a rebellious nation — Ezekiel receives the most physically dramatic prophetic commission in Scripture.'],
  ['faithfulness', 'EZK', 2, 1, 10, 'primary',
    'Do not be afraid of them or their words, though briers and thorns surround you — the call to speak requires courage because the audience is hostile.'],

  // EZK 3 — Eat the scroll
  ['calling', 'EZK', 3, 1, 27, 'primary',
    'Ezekiel eats the scroll and it tastes sweet as honey — God\'s word must be internalized before it can be proclaimed.'],
  ['faithfulness', 'EZK', 3, 1, 27, 'primary',
    'God makes Ezekiel a watchman: if you warn the wicked and they do not turn, you have saved your life — prophetic responsibility reduced to one obligation.'],

  // --- EZK judgment oracles (4-9) ---

  // EZK 4 — The siege model
  ['judgment', 'EZK', 4, 1, 17, 'primary',
    'Ezekiel builds a model of Jerusalem under siege and lies on his side for 390 days — the prophet\'s body becomes the message.'],
  ['exile', 'EZK', 4, 1, 17, 'primary',
    'God prescribes famine rations of mixed grain cooked over dung — the degradation of exile enacted before it happens.'],

  // EZK 5 — The sword, the fire, and the wind
  ['judgment', 'EZK', 5, 1, 17, 'primary',
    'Ezekiel shaves his head and divides the hair: a third burned, a third struck with a sword, a third scattered to the wind — Jerusalem\'s population sorted into calamities.'],
  ['sin', 'EZK', 5, 1, 17, 'primary',
    'Jerusalem has been more wicked than the surrounding nations, rebelling against God\'s laws more than the countries around her.'],

  // EZK 6 — Prophecy against the mountains
  ['idolatry', 'EZK', 6, 1, 14, 'primary',
    'God will destroy the high places: altars demolished, incense stands smashed, slain scattered among the idols — the worship sites become graveyards.'],
  ['judgment', 'EZK', 6, 1, 14, 'primary',
    'Then you will know that I am the Lord — Ezekiel\'s signature phrase appears six times, judgment as the pedagogy of last resort.'],

  // EZK 7 — The end has come
  ['judgment', 'EZK', 7, 1, 27, 'primary',
    'The end has come upon the four corners of the land — seven times "the end" tolls like a funeral bell through the chapter.'],
  ['sovereignty', 'EZK', 7, 1, 27, 'primary',
    'Their silver and gold will not save them; they will throw it into the streets — wealth becomes worthless on the day of the Lord\'s wrath.'],

  // EZK 8 — Idolatry in the temple
  ['idolatry', 'EZK', 8, 1, 18, 'primary',
    'God shows Ezekiel increasingly horrifying scenes inside the temple: an idol of jealousy, elders burning incense to wall carvings, women weeping for Tammuz, men worshipping the sun.'],
  ['judgment', 'EZK', 8, 1, 18, 'primary',
    'Each scene is introduced with "You will see still greater abominations" — the tour of the temple reveals corruption layer upon layer.'],

  // EZK 9 — The mark on the forehead
  ['judgment', 'EZK', 9, 1, 11, 'primary',
    'Six executioners enter the city, but first a man in linen marks the foreheads of those who grieve over the abominations — judgment that distinguishes.'],
  ['justice', 'EZK', 9, 1, 11, 'primary',
    'Begin at my sanctuary — judgment starts with God\'s own house, the place that should have been holiest is judged first.'],

  // --- EZK judgment continues (11-24) ---

  // EZK 11 — God's glory departs, promise remains
  ['judgment', 'EZK', 11, 1, 25, 'primary',
    'God\'s glory rises from the threshold and departs to the Mount of Olives — the most devastating image in Ezekiel, God leaving His own house.'],
  ['hope', 'EZK', 11, 1, 25, 'primary',
    'I will give them an undivided heart and put a new spirit in them — even as glory departs, God promises interior renovation for the exiles.'],

  // EZK 12 — The exile enacted
  ['exile', 'EZK', 12, 1, 28, 'primary',
    'Ezekiel packs his bags and digs through the wall at dusk — acting out the escape that Zedekiah will attempt, right down to covering his face.'],
  ['judgment', 'EZK', 12, 1, 28, 'primary',
    'The people say the vision is for the distant future; God answers that none of His words will be delayed any longer — imminence against complacency.'],

  // EZK 13 — False prophets condemned
  ['judgment', 'EZK', 13, 1, 23, 'primary',
    'The prophets who whitewash flimsy walls with plaster will be exposed when God\'s storm tears the wall down — false assurance cannot survive reality.'],
  ['sin', 'EZK', 13, 1, 23, 'primary',
    'They lead my people astray saying "Peace" when there is no peace — the deadliest lie is the one dressed in religious language.'],

  // EZK 14 — Idolatry of the heart
  ['idolatry', 'EZK', 14, 1, 23, 'primary',
    'These elders have set up idols in their hearts; should I let myself be inquired of by them? — internal idolatry more dangerous than external.'],
  ['judgment', 'EZK', 14, 1, 23, 'primary',
    'Even if Noah, Daniel, and Job were in the land, they could save only themselves — no one else\'s righteousness can substitute for yours.'],

  // EZK 15 — The useless vine
  ['judgment', 'EZK', 15, 1, 8, 'primary',
    'A vine that bears no fruit is useless even as firewood — Jerusalem\'s only purpose was to bear fruit for God, and she has failed.'],
  ['sin', 'EZK', 15, 1, 8, 'primary',
    'The vine imagery strips away every pretension: if you are not fulfilling your purpose, you are worse than worthless.'],

  // EZK 16 — Jerusalem's unfaithfulness
  ['covenant', 'EZK', 16, 1, 63, 'primary',
    'God found Jerusalem as an abandoned newborn, raised her, married her, and lavished her with beauty — but she used every gift to attract other lovers.'],
  ['idolatry', 'EZK', 16, 1, 63, 'primary',
    'You slaughtered my children and sacrificed them to idols — the most graphic and extended allegory of spiritual adultery in Scripture.'],

  // EZK 17 — Two eagles and a vine
  ['sovereignty', 'EZK', 17, 1, 24, 'primary',
    'The first eagle (Babylon) plants a vine (Zedekiah) that reaches toward the second eagle (Egypt) — a political parable exposing broken loyalty.'],
  ['judgment', 'EZK', 17, 1, 24, 'primary',
    'Can the vine thrive after being pulled up by its roots? Zedekiah broke his oath and will not escape — even oaths to pagans bind before God.'],

  // EZK 18 — The soul that sins will die
  ['justice', 'EZK', 18, 1, 32, 'primary',
    'The soul who sins is the one who will die; children will not share the guilt of parents — individual moral responsibility established against fatalism.'],
  ['repentance', 'EZK', 18, 1, 32, 'primary',
    'If a wicked person turns from sin, none of their transgressions will be remembered — repentance genuinely resets the account.'],

  // EZK 19 — Lament for Israel's princes
  ['lament', 'EZK', 19, 1, 14, 'primary',
    'Your mother was a lioness among lions; she raised cubs who became rulers, only to see each one trapped and caged — kingship as tragedy.'],
  ['judgment', 'EZK', 19, 1, 14, 'primary',
    'The strong branch of the vine was torn off and withered; fire consumed it — the Davidic line reduced to a funeral song.'],

  // EZK 20 — Review of Israel's rebellion
  ['idolatry', 'EZK', 20, 1, 49, 'primary',
    'In Egypt they refused to abandon idols; in the wilderness they despised God\'s laws; in the land they sacrificed on every high hill — rebellion in every era.'],
  ['sovereignty', 'EZK', 20, 1, 49, 'primary',
    'For the sake of my name I acted, so that it would not be profaned — God\'s mercy driven not by Israel\'s merit but by His own character.'],

  // EZK 21 — The sword unsheathed
  ['judgment', 'EZK', 21, 1, 37, 'primary',
    'A sword, a sword, sharpened and polished, prepared for slaughter — God\'s blade is drawn and will not return to its sheath until it has finished.'],
  ['sovereignty', 'EZK', 21, 1, 37, 'primary',
    'The king of Babylon stands at the fork in the road and uses divination to decide which way to march — but God controls even the lots of the enemy.'],

  // EZK 22 — Jerusalem's sins catalogued
  ['sin', 'EZK', 22, 1, 31, 'primary',
    'The city of bloodshed: shedding blood, dishonoring parents, mistreating aliens, oppressing orphans and widows — every commandment systematically violated.'],
  ['judgment', 'EZK', 22, 1, 31, 'primary',
    'I looked for someone to stand in the gap but found no one — the absence of a single intercessor seals the city\'s fate.'],

  // EZK 23 — Oholah and Oholibah
  ['idolatry', 'EZK', 23, 1, 49, 'primary',
    'Two sisters — Samaria and Jerusalem — compete in prostitution with Egypt, Assyria, and Babylon, each outdoing the other in infidelity.'],
  ['judgment', 'EZK', 23, 1, 49, 'primary',
    'Your lovers will turn against you and deal with you in hatred; they will strip you naked — the allies Israel courted become the instruments of her humiliation.'],

  // EZK 24 — The cooking pot and Ezekiel's wife
  ['judgment', 'EZK', 24, 1, 27, 'primary',
    'Jerusalem is the corroded pot set on the fire whose filth will not come out even when heated to the point of destruction.'],
  ['suffering', 'EZK', 24, 1, 27, 'primary',
    'God takes Ezekiel\'s wife — the delight of his eyes — and forbids him to mourn, making the prophet\'s unbearable grief a sign of the nation\'s coming loss.'],

  // EZK 25 — Oracles against Ammon, Moab, Edom, Philistia
  ['judgment', 'EZK', 25, 1, 17, 'primary',
    'Because you clapped your hands and stamped your feet with glee over Israel\'s fall, God will stretch out His hand against you — gloating invites judgment.'],
  ['sovereignty', 'EZK', 25, 1, 17, 'primary',
    'Then they will know that I am the Lord — even pagan nations must learn the identity of Israel\'s God.'],

  // EZK 26 — Oracle against Tyre
  ['judgment', 'EZK', 26, 1, 21, 'primary',
    'Tyre rejoiced at Jerusalem\'s fall because it meant more trade; God will bring Nebuchadnezzar against her like the sea against a rock.'],
  ['pride', 'EZK', 26, 1, 21, 'primary',
    'The island fortress that thought itself unsinkable will become a bare rock where fishermen spread their nets — pride measured by the height of the fall.'],

  // EZK 27 — Lament over Tyre
  ['pride', 'EZK', 27, 1, 36, 'primary',
    'Tyre was a magnificent ship made of the finest materials from every nation, but she will sink in the heart of the seas on the day of her ruin.'],
  ['judgment', 'EZK', 27, 1, 36, 'primary',
    'Every merchant who traded with Tyre will wail over her — a commercial empire whose obituary reads like a shipping manifest.'],

  // EZK 28 — The king of Tyre
  ['pride', 'EZK', 28, 1, 26, 'primary',
    'You were in Eden, the garden of God; every precious stone adorned you — then your heart became proud and you were cast from the mountain of God.'],
  ['judgment', 'EZK', 28, 1, 26, 'primary',
    'Your wisdom was corrupted by your splendor; I threw you to the earth — the archetypal fall from beauty to ashes.'],

  // EZK 29 — Oracle against Egypt
  ['judgment', 'EZK', 29, 1, 21, 'primary',
    'Pharaoh is the great monster lying in the Nile: God will put hooks in his jaws and drag him out — Egypt\'s power reduced to a hooked fish.'],
  ['sovereignty', 'EZK', 29, 1, 21, 'primary',
    'Egypt will be desolate for forty years and never again rule over nations — God sets the ceiling on every empire\'s ambition.'],

  // EZK 30 — Egypt's day of doom
  ['judgment', 'EZK', 30, 1, 26, 'primary',
    'A day is near — the day of the Lord, a day of clouds, a time of doom for the nations — Egypt\'s allies will fall alongside her.'],
  ['sovereignty', 'EZK', 30, 1, 26, 'primary',
    'God will break the arms of Pharaoh and strengthen the arms of Babylon\'s king — sovereignty rearranging the balance of power between empires.'],

  // EZK 31 — Pharaoh as the great cedar
  ['pride', 'EZK', 31, 1, 18, 'primary',
    'Assyria was a cedar in Lebanon, beautiful beyond all trees of Eden — but because its heart was proud, it was felled and the nations fled its shade.'],
  ['judgment', 'EZK', 31, 1, 18, 'primary',
    'All the trees of Eden, the choice and best of Lebanon, were consoled in the earth below — even paradise\'s trees go down to the pit when pride reigns.'],

  // EZK 32 — Lament over Pharaoh and Egypt
  ['judgment', 'EZK', 32, 1, 32, 'primary',
    'Pharaoh is a thrashing monster in the seas whom God will catch in a net; the heavens darken and the land fills with blood.'],
  ['sovereignty', 'EZK', 32, 1, 32, 'primary',
    'Pharaoh is laid among the uncircumcised with Assyria, Elam, and every other fallen power — the mighty descend to Sheol together, stripped of all rank.'],

  // EZK 33 — Ezekiel the watchman renewed
  ['repentance', 'EZK', 33, 1, 33, 'primary',
    'As surely as I live, I take no pleasure in the death of the wicked but rather that they turn from their ways and live — God\'s desire stated as oath.'],
  ['calling', 'EZK', 33, 1, 33, 'primary',
    'When Jerusalem falls, Ezekiel\'s mouth is opened and his role shifts from doom-pronouncer to hope-builder — the same watchman, a new message.'],

  // --- EZK restoration (35, 38-39) ---

  // EZK 35 — Oracle against Mount Seir
  ['judgment', 'EZK', 35, 1, 15, 'primary',
    'Because Edom harbored an ancient hatred and handed Israel over to the sword, Mount Seir will become a desolate waste.'],
  ['sovereignty', 'EZK', 35, 1, 15, 'primary',
    'Edom said "These two nations will be ours" while the Lord was there — attempting to inherit what belongs to God provokes swift judgment.'],

  // EZK 38 — Gog of Magog
  ['sovereignty', 'EZK', 38, 1, 23, 'primary',
    'God draws Gog out like a fish with hooks, orchestrating the final assault only to display His own glory — even the ultimate enemy serves the plan.'],
  ['judgment', 'EZK', 38, 1, 23, 'primary',
    'Fire, brimstone, torrential rain, and hailstones: the arsenal of God against the coalition that dares attack His restored people.'],

  // EZK 39 — Gog's defeat
  ['restoration', 'EZK', 39, 1, 29, 'primary',
    'I will now restore the fortunes of Jacob and have compassion on all the people of Israel, zealous for my holy name.'],
  ['sovereignty', 'EZK', 39, 1, 29, 'primary',
    'It will take seven months to bury the dead and seven years to burn the weapons — the scale of God\'s victory measured in cleanup time.'],

  // --- EZK temple vision (41-46, 48) ---

  // EZK 41 — The temple measured
  ['presence-of-god', 'EZK', 41, 1, 26, 'primary',
    'Every measurement of the new temple communicates order, symmetry, and holiness — God\'s dwelling designed down to the cubit.'],
  ['worship', 'EZK', 41, 1, 26, 'primary',
    'Carved palm trees and cherubim adorn the walls, echoing Eden and Solomon\'s temple — the future sanctuary remembers every past sacred space.'],

  // EZK 42 — The holy chambers
  ['holiness', 'EZK', 42, 1, 20, 'primary',
    'The chambers are where priests eat the most holy offerings and change their garments, distinguishing sacred from common — holiness requires boundaries.'],
  ['worship', 'EZK', 42, 1, 20, 'primary',
    'The wall surrounding the temple complex separates the holy from the common, measuring 500 cubits on each side — sacred space architecturally defined.'],

  // EZK 43 — God's glory returns
  ['glory-of-god', 'EZK', 43, 1, 27, 'primary',
    'The glory of the God of Israel came from the east, sounding like rushing waters, and the land shone with His glory — the return that makes everything new.'],
  ['presence-of-god', 'EZK', 43, 1, 27, 'primary',
    'Son of man, this is the place of my throne where I will live among the Israelites forever — God\'s presence permanently restored after the agony of departure.'],

  // EZK 44 — Regulations for the priests
  ['holiness', 'EZK', 44, 1, 31, 'primary',
    'The east gate stays shut because the Lord has entered through it — God\'s exclusive entrance underscores the absolute holiness of His presence.'],
  ['worship', 'EZK', 44, 1, 31, 'primary',
    'The Levites who went astray will bear the consequences of their sin, but the Zadokite priests who remained faithful will minister before God — faithfulness determines access.'],

  // EZK 45 — The sacred district
  ['justice', 'EZK', 45, 1, 25, 'primary',
    'Enough, you princes of Israel! Give up your violence and oppression and do what is just — even in the restored community, leadership must be accountable.'],
  ['worship', 'EZK', 45, 1, 25, 'primary',
    'The prince provides bulls, grain, and oil for the festivals — leadership defined by providing for the community\'s worship rather than extracting from it.'],

  // EZK 46 — Offerings and the prince's inheritance
  ['worship', 'EZK', 46, 1, 24, 'primary',
    'The prince enters by the vestibule of the gate on Sabbaths and new moons, and the people worship at the entrance — ordered worship expressing ordered relationship with God.'],
  ['justice', 'EZK', 46, 1, 24, 'primary',
    'The prince must not take any of the people\'s inheritance by eviction; he must give his sons their inheritance from his own property — power constrained by justice.'],

  // EZK 48 — Division of the land
  ['restoration', 'EZK', 48, 1, 35, 'primary',
    'The land is divided equally among the tribes, including allotments for aliens living among them — restoration that includes the outsider.'],
  ['presence-of-god', 'EZK', 48, 1, 35, 'primary',
    'The city will be called "The Lord Is There" — the final word of Ezekiel is a name, and the name is a promise: God will never leave again.'],

  /* ======================= DANIEL ======================= */

  // DAN 8 — The ram and the goat
  ['sovereignty', 'DAN', 8, 1, 27, 'primary',
    'The two-horned ram (Medo-Persia) is shattered by the one-horned goat (Greece) whose horn breaks into four — empires rising and falling on schedule.'],
  ['prophecy', 'DAN', 8, 1, 27, 'primary',
    'The vision specifies 2,300 evenings and mornings until the sanctuary is reconsecrated — prophetic precision that will match the Maccabean crisis centuries later.'],

  // DAN 10 — Daniel's vision by the Tigris
  ['spiritual-warfare', 'DAN', 10, 1, 21, 'primary',
    'The angel was delayed twenty-one days by the prince of Persia until Michael came to help — the curtain pulled back on cosmic conflict behind earthly events.'],
  ['prayer', 'DAN', 10, 1, 21, 'primary',
    'Daniel mourns and fasts for three weeks before the answer arrives — persistent prayer that does not give up when heaven is silent.'],

  // DAN 11 — Kings of the north and south
  ['sovereignty', 'DAN', 11, 1, 45, 'primary',
    'A detailed march of Ptolemaic and Seleucid kings, predicted before any of them exist — history as the script God has already written.'],
  ['perseverance', 'DAN', 11, 1, 45, 'primary',
    'The people who know their God will firmly resist, though many will fall by sword, flame, captivity, and plunder — faithfulness at the cost of life.'],

  // DAN 12 — The end of days and resurrection
  ['second-coming', 'DAN', 12, 1, 13, 'primary',
    'At that time Michael will arise, and there will be a time of distress such as never occurred — the final tribulation before deliverance.'],
  ['perseverance', 'DAN', 12, 1, 13, 'primary',
    'Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness like the stars forever — eternal reward for earthly faithfulness.'],
  ['sovereignty', 'DAN', 12, 1, 13, 'secondary',
    'Go your way till the end; you will rest and then rise to receive your allotted inheritance — Daniel\'s final instruction is to trust and wait.'],
];

/* ───────────────────────────────────────────────────────
 * 3. Insert rows
 * ─────────────────────────────────────────────────────── */
const insertMany = db.transaction((data) => {
  let count = 0;
  for (const [themeId, bookId, chapter, vStart, vEnd, relevance, note] of data) {
    insert.run(themeId, bookId, chapter, vStart, vEnd, relevance, note);
    count++;
  }
  return count;
});

const count = insertMany(rows);
console.log(`Inserted ${count} passage_themes for 148 Major Prophet gap chapters.`);

/* ───────────────────────────────────────────────────────
 * 4. Verify
 * ─────────────────────────────────────────────────────── */
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('ISA','JER','LAM','EZK','DAN')
    AND source_tier = 'ai_assisted'
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('AI-assisted themes by book:', JSON.stringify(byBook));

const total = db.prepare(`
  SELECT COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('ISA','JER','LAM','EZK','DAN')
`).get();
console.log('Total Major Prophet passage_themes:', total.c);

db.close();
