/**
 * Insert passage_climate rows for 189 missing Prophet chapters.
 *
 * Missing Major (148):
 *   ISA: 1,3,4,8,10-39,41-51,53-60,62-64,66           (57 ch)
 *   JER: 2-6,8-17,19,21-28,30,33-38,40-52              (44 ch)
 *   LAM: 2,4                                            (2 ch)
 *   EZK: 2-9,11-33,35,38,39,41-46,48                   (41 ch)
 *   DAN: 8,10,11,12                                     (4 ch)
 *
 * Missing Minor (41):
 *   HOS: 2,3,5,6,7,8,9,10,12,13
 *   JOL: 3
 *   AMO: 2,3,4,6,8,9
 *   MIC: 1,2,3,4
 *   NAM: 2,3
 *   HAB: 2
 *   ZEP: 2,3
 *   HAG: 2
 *   ZEC: 2,3,4,5,6,7,8,10,11,13,14
 *   MAL: 1,2,4
 *
 * Climate context IDs:
 *   ISA 1-39  -> divided-monarchy   (8th century, Assyrian threat)
 *   ISA 40-66 -> climate-exile      (exilic/post-exilic comfort)
 *   JER 1-39  -> divided-monarchy   (late 7th-early 6th century)
 *   JER 40-52 -> climate-exile      (fall of Jerusalem and aftermath)
 *   LAM       -> climate-exile
 *   EZK       -> climate-exile      (written in Babylon)
 *   DAN       -> climate-exile      (Babylonian/Persian court)
 *   HOS,AMO,MIC -> divided-monarchy (8th century)
 *   NAM,HAB,ZEP -> divided-monarchy (7th century)
 *   JOL       -> divided-monarchy   (traditionally pre-exilic)
 *   HAG,ZEC,MAL -> climate-post-exile (Persian period restoration)
 *
 * 1 row per chapter. source_tier = 'ai_assisted'.
 */
const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

/* ───────────────────────────────────────────────────────
 * Prepared statement
 * ─────────────────────────────────────────────────────── */
const insert = db.prepare(`
  INSERT INTO passage_climate
    (context_id, book_id, chapter, verse_start, verse_end, location_id, context_note, source_tier)
  VALUES (?, ?, ?, 1, NULL, NULL, ?, 'ai_assisted')
`);

/* ───────────────────────────────────────────────────────
 * Data: [context_id, book_id, chapter, context_note]
 * ─────────────────────────────────────────────────────── */
const rows = [

  /* ======================= ISAIAH 1-39 (divided-monarchy) ======================= */

  // ISA 1 — The great arraignment
  ['divided-monarchy', 'ISA', 1,
    'Isaiah opens with a courtroom indictment of Judah during the reigns of Uzziah through Hezekiah, when Assyria\'s westward expansion threatened every small kingdom in the Levant.'],

  // ISA 3 — Judgment on Jerusalem's leaders
  ['divided-monarchy', 'ISA', 3,
    'Isaiah denounces Judah\'s corrupt ruling class during a period when Assyrian pressure was destabilizing the region and incompetent leadership at home was accelerating the crisis.'],

  // ISA 4 — The Branch of the LORD
  ['divided-monarchy', 'ISA', 4,
    'A brief vision of future cleansing and restoration set against the backdrop of 8th-century Judah\'s moral decay under Assyrian shadow.'],

  // ISA 8 — Maher-Shalal-Hash-Baz
  ['divided-monarchy', 'ISA', 8,
    'Isaiah names his son as a living sign that Assyria will sweep through Syria and Israel before the child can speak, a prophecy rooted in the Syro-Ephraimite crisis of 735 BC.'],

  // ISA 10 — Woe to Assyria, the rod of God's anger
  ['divided-monarchy', 'ISA', 10,
    'God uses Assyria as an instrument of judgment but will then judge Assyria itself for its arrogance, reflecting the tense balance of power in the late 8th century.'],

  // ISA 11 — The shoot from Jesse's stump
  ['divided-monarchy', 'ISA', 11,
    'A messianic vision of a righteous king arising from David\'s line, offered while the Davidic monarchy was weakened and Assyria dominated the political horizon.'],

  // ISA 12 — Songs of praise
  ['divided-monarchy', 'ISA', 12,
    'A hymn of thanksgiving closing the Immanuel section, anticipating deliverance in a season when Judah lived under constant Assyrian threat.'],

  // ISA 13 — Oracle against Babylon
  ['divided-monarchy', 'ISA', 13,
    'Isaiah announces Babylon\'s future destruction even before Babylon has eclipsed Assyria, a prophetic long-range view from the Assyrian-dominated 8th century.'],

  // ISA 14 — Fall of the king of Babylon
  ['divided-monarchy', 'ISA', 14,
    'The taunt-song against Babylon\'s tyrant is set in the context of 8th-century Judah, where imperial arrogance was embodied first by Assyria.'],

  // ISA 15 — Oracle against Moab
  ['divided-monarchy', 'ISA', 15,
    'Moab\'s devastation is mourned as Assyrian campaigns ravaged Transjordan, and Judah watched its neighbor collapse under the same imperial pressure it faced.'],

  // ISA 16 — Moab's refugees
  ['divided-monarchy', 'ISA', 16,
    'Moabite refugees stream toward Judah seeking shelter, a scene rooted in the Assyrian campaigns that uprooted entire populations across the region.'],

  // ISA 17 — Oracle against Damascus
  ['divided-monarchy', 'ISA', 17,
    'Damascus and northern Israel are condemned together as allies against Assyria; Tiglath-Pileser III would destroy both within a decade of this oracle.'],

  // ISA 18 — Oracle concerning Cush
  ['divided-monarchy', 'ISA', 18,
    'Ethiopian envoys arrive in Judah seeking an anti-Assyrian alliance, reflecting the diplomatic maneuvering of small states trying to resist the empire.'],

  // ISA 19 — Oracle against Egypt
  ['divided-monarchy', 'ISA', 19,
    'Egypt\'s internal divisions and eventual submission to God\'s purposes are proclaimed while Egypt was courting Judah as a buffer against Assyria.'],

  // ISA 20 — Isaiah walks naked as a sign
  ['divided-monarchy', 'ISA', 20,
    'Isaiah strips and walks barefoot for three years as a warning against trusting Egypt and Cush, a dramatic protest during the anti-Assyrian coalition building of the 710s BC.'],

  // ISA 21 — Oracle on the desert by the sea
  ['divided-monarchy', 'ISA', 21,
    'Visions of Babylon\'s fall and oracles against Edom and Arabia reflect the turbulent geopolitics of the Assyrian period as empires shifted.'],

  // ISA 22 — Oracle on the Valley of Vision
  ['divided-monarchy', 'ISA', 22,
    'Jerusalem celebrates prematurely after a siege is lifted; Isaiah rebukes the city for revelry instead of repentance during Assyria\'s campaigns against Judah.'],

  // ISA 23 — Oracle against Tyre
  ['divided-monarchy', 'ISA', 23,
    'Tyre\'s commercial empire will be humbled, a prophecy delivered when Phoenician wealth and Assyrian military power dominated the eastern Mediterranean.'],

  // ISA 24 — The LORD's devastation of the earth
  ['divided-monarchy', 'ISA', 24,
    'A cosmic judgment oracle expanding local Assyrian-era devastation into a universal vision of God judging the entire earth for breaking the eternal covenant.'],

  // ISA 25 — Praise for God's plan
  ['divided-monarchy', 'ISA', 25,
    'A hymn celebrating God\'s future victory banquet on Mount Zion, contrasting the present reality of Assyrian domination with an eschatological feast for all peoples.'],

  // ISA 26 — Song of trust
  ['divided-monarchy', 'ISA', 26,
    'A song of trust in God\'s protection for the righteous city, set against the anxious 8th-century context when walled cities fell routinely to Assyrian siege.'],

  // ISA 27 — Deliverance of Israel
  ['divided-monarchy', 'ISA', 27,
    'God will slay the sea monster Leviathan and restore Israel\'s vineyard, cosmic imagery applied to the concrete hope of survival through Assyrian oppression.'],

  // ISA 28 — Woe to Ephraim's drunkards
  ['divided-monarchy', 'ISA', 28,
    'Northern Israel\'s leaders are condemned for drunken incompetence as Assyria prepares to destroy Samaria in 722 BC, with a warning that Judah is next.'],

  // ISA 29 — Woe to Ariel (Jerusalem)
  ['divided-monarchy', 'ISA', 29,
    'Jerusalem will be besieged and brought low, then miraculously delivered — a pattern fulfilled in Sennacherib\'s 701 BC campaign against Hezekiah.'],

  // ISA 30 — Woe to the obstinate nation
  ['divided-monarchy', 'ISA', 30,
    'Judah seeks Egyptian military aid against Assyria despite Isaiah\'s insistence that trust in God, not foreign alliances, is the path to survival.'],

  // ISA 31 — Woe to those who rely on Egypt
  ['divided-monarchy', 'ISA', 31,
    'Isaiah condemns the pro-Egyptian faction in Hezekiah\'s court who trust in chariots and horsemen rather than the Holy One of Israel against Assyria.'],

  // ISA 32 — The righteous king
  ['divided-monarchy', 'ISA', 32,
    'A vision of a just king and a transformed society contrasts with the political chaos of the late 8th century under Assyrian pressure.'],

  // ISA 33 — Woe to the destroyer
  ['divided-monarchy', 'ISA', 33,
    'An oracle against the Assyrian invader who breaks treaties, likely Sennacherib\'s devastating campaign through Judah in 701 BC.'],

  // ISA 34 — Judgment on the nations
  ['divided-monarchy', 'ISA', 34,
    'Cosmic judgment with Edom singled out for destruction, a vision that transcends the immediate Assyrian crisis to proclaim God\'s sovereignty over all nations.'],

  // ISA 35 — Joy of the redeemed
  ['divided-monarchy', 'ISA', 35,
    'The desert blooms and the ransomed return to Zion with singing, a vision of restoration that bookends the judgment oracles of the Assyrian period.'],

  // ISA 36 — Sennacherib threatens Jerusalem
  ['divided-monarchy', 'ISA', 36,
    'Sennacherib\'s field commander delivers Assyria\'s ultimatum to Jerusalem in 701 BC, the most acute military crisis of the divided monarchy era.'],

  // ISA 37 — Hezekiah's prayer and deliverance
  ['divided-monarchy', 'ISA', 37,
    'Hezekiah prays and God delivers Jerusalem from Sennacherib\'s army overnight, the pivotal event that vindicated Isaiah\'s message of trust against Assyria.'],

  // ISA 38 — Hezekiah's illness and recovery
  ['divided-monarchy', 'ISA', 38,
    'Hezekiah faces death and is granted fifteen more years, a personal crisis set within the broader Assyrian threat to the Davidic dynasty.'],

  // ISA 39 — Envoys from Babylon
  ['divided-monarchy', 'ISA', 39,
    'Hezekiah shows Babylon\'s envoys all his treasures; Isaiah predicts everything will be carried to Babylon, a hinge between Assyrian and Babylonian threats.'],

  /* ======================= ISAIAH 40-66 (climate-exile) ======================= */

  // ISA 41 — Fear not, I am with you
  ['climate-exile', 'ISA', 41,
    'God reassures exiled Israel as His chosen servant, promising to strengthen them against their enemies during the Babylonian captivity.'],

  // ISA 42 — The Servant of the LORD
  ['climate-exile', 'ISA', 42,
    'The first Servant Song introduces a figure who will bring justice to the nations gently, a vision of hope for exiles who had known only brute imperial force.'],

  // ISA 43 — Fear not, I have redeemed you
  ['climate-exile', 'ISA', 43,
    'God promises to pass through waters and fire with His people, directly addressing the trauma of exile and the fear that God has abandoned Israel.'],

  // ISA 44 — Israel the chosen
  ['climate-exile', 'ISA', 44,
    'God mocks Babylonian idol-making and reaffirms Israel as His servant, asserting monotheism against the polytheistic culture surrounding the exiles.'],

  // ISA 45 — Cyrus, God's anointed
  ['climate-exile', 'ISA', 45,
    'God names Cyrus of Persia as His anointed instrument of liberation, a stunning declaration that a pagan emperor serves Israel\'s God during exile.'],

  // ISA 46 — Babylon's idols fall
  ['climate-exile', 'ISA', 46,
    'Bel and Nebo are carried away as burdens while God carries Israel; the contrast between helpless idols and the living God speaks directly to exiles surrounded by Babylonian religion.'],

  // ISA 47 — Fall of Babylon
  ['climate-exile', 'ISA', 47,
    'Virgin Daughter Babylon will be humiliated and stripped of power, a taunt-song offering vindication to exiles who had endured Babylonian cruelty.'],

  // ISA 48 — Israel refined in the furnace
  ['climate-exile', 'ISA', 48,
    'God declares that exile has been a refining furnace and now commands Israel to leave Babylon, a direct address to deportees weighing whether to return.'],

  // ISA 49 — The Servant's mission to the nations
  ['climate-exile', 'ISA', 49,
    'The second Servant Song extends Israel\'s calling beyond national restoration to becoming a light to the Gentiles, broadening exile\'s meaning into universal mission.'],

  // ISA 50 — The Servant's obedience through suffering
  ['climate-exile', 'ISA', 50,
    'The third Servant Song describes willing suffering and trust in God amid opposition, modeling faithfulness for exiles tempted to abandon hope.'],

  // ISA 51 — Comfort for Zion
  ['climate-exile', 'ISA', 51,
    'God calls exiles to remember Abraham\'s journey from one to many, assuring them that Zion\'s desolation will be reversed as surely as creation was spoken into being.'],

  // ISA 53 — The Suffering Servant
  ['climate-exile', 'ISA', 53,
    'The fourth Servant Song describes one who bears the sins of many through innocent suffering, the theological climax of the exile\'s redemptive meaning.'],

  // ISA 54 — Sing, barren woman
  ['climate-exile', 'ISA', 54,
    'Zion is told to enlarge her tent because her children will be more than before the exile; God\'s covenant faithfulness outlasts His momentary anger.'],

  // ISA 55 — Come, all who thirst
  ['climate-exile', 'ISA', 55,
    'A free invitation to abundant life as exiles prepare to return, with God\'s word promised to accomplish its purpose as surely as rain grows crops.'],

  // ISA 56 — Salvation for foreigners
  ['climate-exile', 'ISA', 56,
    'God\'s house will be a house of prayer for all nations, expanding covenant membership beyond ethnic Israel in the post-exilic restoration vision.'],

  // ISA 57 — Peace for the contrite
  ['climate-exile', 'ISA', 57,
    'God dwells both in the high and holy place and with the contrite, offering comfort to humbled exiles while condemning those who returned to idolatry.'],

  // ISA 58 — True fasting
  ['climate-exile', 'ISA', 58,
    'God redefines acceptable worship as justice for the oppressed and food for the hungry, challenging returning exiles whose religious practice lacks social compassion.'],

  // ISA 59 — Sin separates, God intervenes
  ['climate-exile', 'ISA', 59,
    'When no human deliverer could be found, God Himself put on righteousness as armor, addressing the moral paralysis of the exilic community.'],

  // ISA 60 — Arise, shine
  ['climate-exile', 'ISA', 60,
    'Nations stream to Zion\'s light and kings bring tribute, a vision of glorified Jerusalem that transcends the meager reality of post-exilic rebuilding.'],

  // ISA 62 — Zion's new name
  ['climate-exile', 'ISA', 62,
    'Jerusalem will be renamed Hephzibah and Beulah, replacing "Forsaken" and "Desolate" with names of delight and marriage as exile gives way to restoration.'],

  // ISA 63 — The warrior and the prayer
  ['climate-exile', 'ISA', 63,
    'God returns as a warrior from Edom with garments stained red, and the prophet pleads for God to act as He did at the Exodus for His exiled people.'],

  // ISA 64 — Rend the heavens
  ['climate-exile', 'ISA', 64,
    'The most desperate prayer in the prophets begs God to tear open the sky and come down, expressing the raw anguish of a community still waiting for full restoration.'],

  // ISA 66 — New heavens and new earth
  ['climate-exile', 'ISA', 66,
    'God promises new heavens and a new earth where all humanity worships before Him, the ultimate horizon of hope for exiles whose present reality remained bleak.'],

  /* ======================= JEREMIAH 2-39 (divided-monarchy) ======================= */

  // JER 2 — Israel's unfaithfulness
  ['divided-monarchy', 'JER', 2,
    'Jeremiah indicts Judah for abandoning God like a bride forgetting her husband, preaching in Jerusalem as Babylon rises to replace Assyria as the dominant threat.'],

  // JER 3 — Return, faithless Israel
  ['divided-monarchy', 'JER', 3,
    'God pleads for repentance through the metaphor of two unfaithful sisters, during Josiah\'s reform era when Judah had one last chance to turn before Babylon struck.'],

  // JER 4 — Disaster from the north
  ['divided-monarchy', 'JER', 4,
    'Jeremiah sees a vision of creation undone as the Babylonian army advances from the north, a cosmic reversal reflecting the late 7th-century geopolitical upheaval.'],

  // JER 5 — Not one righteous
  ['divided-monarchy', 'JER', 5,
    'God searches Jerusalem for one honest person and finds none, an oracle delivered as Judah\'s moral collapse accelerated in the years before Babylon\'s arrival.'],

  // JER 6 — Jerusalem besieged
  ['divided-monarchy', 'JER', 6,
    'Jeremiah warns that siege and destruction are imminent from the north, preaching to a Jerusalem that refused to listen as Babylonian power consolidated.'],

  // JER 8 — The harvest is past
  ['divided-monarchy', 'JER', 8,
    'Judah\'s refusal to repent leads Jeremiah to lament that the harvest is past and the summer ended, yet the people are not saved — a cry from the final decades before exile.'],

  // JER 9 — A fountain of tears
  ['divided-monarchy', 'JER', 9,
    'Jeremiah wishes his head were a spring of water to weep for the slain of his people, mourning a society destroyed by deceit in the shadow of Babylonian invasion.'],

  // JER 10 — God versus idols
  ['divided-monarchy', 'JER', 10,
    'The living God who stretches out the heavens is contrasted with scarecrow-like idols, a polemic against Judah\'s syncretism as Babylonian culture pressed in.'],

  // JER 11 — The broken covenant
  ['divided-monarchy', 'JER', 11,
    'God declares the Sinai covenant broken and conspirators from Jeremiah\'s hometown plot to kill him, reflecting the dangerous political climate of pre-exilic Judah.'],

  // JER 12 — Jeremiah's complaint
  ['divided-monarchy', 'JER', 12,
    'Jeremiah asks why the wicked prosper while he suffers for faithfulness, and God answers that worse is coming — if horses exhaust you, how will you race chariots?'],

  // JER 13 — The linen belt
  ['divided-monarchy', 'JER', 13,
    'A ruined linen belt symbolizes Judah\'s ruined pride and uselessness, an enacted prophecy during the final years of the Davidic monarchy\'s decline.'],

  // JER 14 — Drought and false prophets
  ['divided-monarchy', 'JER', 14,
    'A devastating drought grips Judah while false prophets promise peace, reflecting both the agricultural vulnerability and theological confusion of the late monarchy.'],

  // JER 15 — Jeremiah's anguish
  ['divided-monarchy', 'JER', 15,
    'God tells Jeremiah that even Moses and Samuel could not intercede for this generation, leaving the prophet isolated and bitter in a nation barreling toward destruction.'],

  // JER 16 — No marriage, no mourning
  ['divided-monarchy', 'JER', 16,
    'God forbids Jeremiah from marrying or attending funerals as a living sign that normal life in Judah is ending as Babylon\'s shadow lengthens.'],

  // JER 17 — The deceitful heart
  ['divided-monarchy', 'JER', 17,
    'The heart is deceitful above all things and beyond cure — Jeremiah diagnoses Judah\'s spiritual sickness as terminal in the final years before Babylonian conquest.'],

  // JER 19 — The broken jar
  ['divided-monarchy', 'JER', 19,
    'Jeremiah smashes a potter\'s flask in the Valley of Ben Hinnom, declaring that God will shatter Jerusalem just as irreparably, a provocative public act in the dying monarchy.'],

  // JER 21 — Judgment on Zedekiah
  ['divided-monarchy', 'JER', 21,
    'King Zedekiah begs Jeremiah for a hopeful word during Babylon\'s siege, but is told to surrender — a clash between royal desperation and prophetic honesty.'],

  // JER 22 — Against the kings of Judah
  ['divided-monarchy', 'JER', 22,
    'Jeremiah condemns Jehoiakim for building a lavish palace with forced labor while ignoring justice, a direct rebuke of royal corruption in Judah\'s final decades.'],

  // JER 23 — Woe to the shepherds
  ['divided-monarchy', 'JER', 23,
    'False prophets and negligent kings are denounced as shepherds who scatter the flock, with a promise of a righteous Branch from David\'s line yet to come.'],

  // JER 24 — Two baskets of figs
  ['divided-monarchy', 'JER', 24,
    'Good figs represent the exiles already in Babylon; bad figs represent those remaining in Jerusalem, a surprising reversal of expected fortune during the Babylonian crisis.'],

  // JER 25 — Seventy years of captivity
  ['divided-monarchy', 'JER', 25,
    'Jeremiah announces seventy years of Babylonian dominion over Judah and all nations, setting a timeline for exile that would anchor Jewish hope for generations.'],

  // JER 26 — Jeremiah threatened with death
  ['divided-monarchy', 'JER', 26,
    'Jeremiah nearly dies for prophesying the Temple\'s destruction, saved only by officials who remember Micah made similar threats — the politics of prophecy in pre-exilic Judah.'],

  // JER 27 — Submit to Babylon's yoke
  ['divided-monarchy', 'JER', 27,
    'Jeremiah wears a wooden yoke to symbolize submission to Nebuchadnezzar, countering the anti-Babylonian coalition that neighboring kings were forming.'],

  // JER 28 — Hananiah breaks the yoke
  ['divided-monarchy', 'JER', 28,
    'The false prophet Hananiah shatters Jeremiah\'s yoke and promises deliverance within two years; Jeremiah responds that God will replace wood with iron — submission, not revolt.'],

  // JER 30 — Restoration promised
  ['divided-monarchy', 'JER', 30,
    'Amid judgment oracles, God promises to restore Israel and Judah from captivity, a beacon of hope inserted into the darkest period of the late monarchy.'],

  // JER 33 — The LORD promises peace
  ['divided-monarchy', 'JER', 33,
    'While imprisoned during Babylon\'s siege, Jeremiah receives God\'s promise that the Davidic covenant and Levitical priesthood will endure — hope at the point of maximum despair.'],

  // JER 34 — Broken covenant with slaves
  ['divided-monarchy', 'JER', 34,
    'Jerusalem\'s leaders free their slaves during the siege then re-enslave them when the pressure eases, epitomizing the bad-faith repentance of Judah\'s final days.'],

  // JER 35 — The faithfulness of the Rechabites
  ['divided-monarchy', 'JER', 35,
    'The Rechabite clan keeps their ancestor\'s commands for generations while Judah breaks God\'s covenant repeatedly, a shaming contrast in the pre-exilic period.'],

  // JER 36 — The scroll burned by Jehoiakim
  ['divided-monarchy', 'JER', 36,
    'King Jehoiakim slices and burns Jeremiah\'s scroll column by column, the definitive act of royal rejection of God\'s word in the final years of the monarchy.'],

  // JER 37 — Jeremiah imprisoned
  ['divided-monarchy', 'JER', 37,
    'Jeremiah is arrested as a traitor for counseling surrender to Babylon, thrown into a dungeon during the siege as political and prophetic authority clashed.'],

  // JER 38 — Jeremiah in the cistern
  ['divided-monarchy', 'JER', 38,
    'Officials throw Jeremiah into a muddy cistern to die for demoralizing the army; an Ethiopian court official risks his life to pull the prophet out.'],

  /* ======================= JEREMIAH 40-52 (climate-exile) ======================= */

  // JER 40 — Gedaliah appointed governor
  ['climate-exile', 'JER', 40,
    'After Jerusalem falls, Babylon appoints Gedaliah as governor over the remnant; Jeremiah stays in the ruined land as the exile begins.'],

  // JER 41 — Gedaliah assassinated
  ['climate-exile', 'JER', 41,
    'Ishmael assassinates Gedaliah and massacres pilgrims, plunging the Judean remnant into chaos in the immediate aftermath of Jerusalem\'s destruction.'],

  // JER 42 — The remnant seeks guidance
  ['climate-exile', 'JER', 42,
    'The surviving Judeans ask Jeremiah to inquire of God and promise to obey, but their minds are already set on fleeing to Egypt despite the prophet\'s warning.'],

  // JER 43 — Flight to Egypt
  ['climate-exile', 'JER', 43,
    'The remnant drags Jeremiah to Egypt against God\'s command, choosing a second exile over trust in God\'s plan for those who remained in the devastated land.'],

  // JER 44 — Idolatry in Egypt
  ['climate-exile', 'JER', 44,
    'In Egypt the refugees return to worshipping the Queen of Heaven, insisting it brought prosperity; Jeremiah confronts unrepentant idolatry even after Jerusalem\'s fall.'],

  // JER 45 — Message to Baruch
  ['climate-exile', 'JER', 45,
    'Jeremiah\'s scribe Baruch is told not to seek great things for himself but to be grateful for survival, a personal word amid national catastrophe.'],

  // JER 46 — Oracle against Egypt
  ['climate-exile', 'JER', 46,
    'Egypt\'s defeat at Carchemish in 605 BC is described as God\'s judgment, the battle that established Babylonian supremacy and sealed Judah\'s fate.'],

  // JER 47 — Oracle against the Philistines
  ['climate-exile', 'JER', 47,
    'Babylon\'s army sweeps over Philistia like a flood from the north, one of several oracles showing that exile\'s devastation reached far beyond Judah.'],

  // JER 48 — Oracle against Moab
  ['climate-exile', 'JER', 48,
    'Moab\'s pride and wealth are shattered by Babylon, a lament for a neighbor nation caught in the same imperial destruction that consumed Judah.'],

  // JER 49 — Oracles against Ammon, Edom, Damascus, Kedar, Elam
  ['climate-exile', 'JER', 49,
    'Multiple nations fall under God\'s judgment through Babylonian conquest, demonstrating that exile was not Israel\'s unique punishment but a regional cataclysm.'],

  // JER 50 — Oracle against Babylon (part 1)
  ['climate-exile', 'JER', 50,
    'Babylon itself will fall, and Israel will return weeping and seeking God; the empire that executed God\'s judgment will be judged in turn.'],

  // JER 51 — Oracle against Babylon (part 2)
  ['climate-exile', 'JER', 51,
    'Babylon\'s walls will be leveled and her gods shattered; the cup of wrath she forced on the nations will be turned back on her.'],

  // JER 52 — The fall of Jerusalem
  ['climate-exile', 'JER', 52,
    'A historical appendix recording the siege, the Temple\'s destruction, and the deportation numbers — the raw data of exile preserved as testimony.'],

  /* ======================= LAMENTATIONS (climate-exile) ======================= */

  // LAM 2 — God's anger against Zion
  ['climate-exile', 'LAM', 2,
    'The poet describes God Himself as the enemy who destroyed Jerusalem\'s walls and Temple, the most theologically daring interpretation of the Babylonian conquest.'],

  // LAM 4 — The siege's horrors
  ['climate-exile', 'LAM', 4,
    'Starvation during the siege reduced Jerusalem to cannibalism; the poet contrasts the city\'s former glory with the unbearable degradation of exile\'s beginning.'],

  /* ======================= EZEKIEL (climate-exile) ======================= */

  // EZK 2 — Ezekiel's commissioning
  ['climate-exile', 'EZK', 2,
    'God commissions Ezekiel among the Babylonian exiles at Tel-Abib, sending him to a rebellious house of Israel who may refuse to listen.'],

  // EZK 3 — Watchman for Israel
  ['climate-exile', 'EZK', 3,
    'Ezekiel is appointed as a watchman responsible for warning Israel, sitting overwhelmed among the exiles by the Chebar Canal for seven days.'],

  // EZK 4 — Siege of Jerusalem enacted
  ['climate-exile', 'EZK', 4,
    'Ezekiel builds a model of Jerusalem under siege and lies on his side for 390 days, an enacted prophecy performed in Babylon before the actual fall.'],

  // EZK 5 — Judgment by sword, famine, and plague
  ['climate-exile', 'EZK', 5,
    'Ezekiel shaves his head and divides the hair into thirds to represent the fates of Jerusalem\'s population — a visceral warning from exile to those still in the city.'],

  // EZK 6 — Prophecy against Israel's mountains
  ['climate-exile', 'EZK', 6,
    'From Babylon, Ezekiel pronounces judgment on the high places of Israel where idolatry flourished, connecting the exiles\' punishment to specific sins back home.'],

  // EZK 7 — The end has come
  ['climate-exile', 'EZK', 7,
    'Ezekiel declares the end has come upon the land of Israel, the day of doom is near — an urgent warning from exile that Jerusalem\'s destruction is imminent.'],

  // EZK 8 — Idolatry in the Temple
  ['climate-exile', 'EZK', 8,
    'In a vision Ezekiel is transported to Jerusalem\'s Temple and sees elders worshipping images, women weeping for Tammuz, and men bowing to the sun — the sins that caused exile.'],

  // EZK 9 — Slaughter of the idolaters
  ['climate-exile', 'EZK', 9,
    'Six executioners pass through Jerusalem while a scribe marks the foreheads of those who grieve over idolatry, a vision of selective judgment received in Babylonian exile.'],

  // EZK 11 — Judgment and promise
  ['climate-exile', 'EZK', 11,
    'God condemns Jerusalem\'s leaders but promises the exiles a new heart and spirit, the first hint that exile itself is the path to spiritual renewal.'],

  // EZK 12 — Ezekiel mimes the exile
  ['climate-exile', 'EZK', 12,
    'Ezekiel digs through a wall and carries his belongings out at night, acting out the coming exile for fellow deportees who think Jerusalem will survive.'],

  // EZK 13 — Against false prophets
  ['climate-exile', 'EZK', 13,
    'Ezekiel condemns prophets in exile who whitewash flimsy walls with false hope, promising peace when destruction is certain.'],

  // EZK 14 — Idolaters consult the prophet
  ['climate-exile', 'EZK', 14,
    'Elders come to Ezekiel with idols in their hearts; God refuses to answer them, exposing the hypocrisy of seeking divine guidance while harboring false gods in Babylon.'],

  // EZK 15 — Jerusalem the useless vine
  ['climate-exile', 'EZK', 15,
    'Jerusalem is a vine that produces no fruit and is only fit for burning, a parable explaining to the exiles why their city had to be destroyed.'],

  // EZK 16 — Jerusalem's unfaithfulness
  ['climate-exile', 'EZK', 16,
    'God tells Jerusalem\'s story as an abandoned infant He raised into a queen who became a prostitute, the most extended metaphor for covenant betrayal in the exile literature.'],

  // EZK 17 — Two eagles and a vine
  ['climate-exile', 'EZK', 17,
    'An allegory of Babylon and Egypt as two eagles and Judah as a vine, explaining the geopolitics that led to exile through the language of fable.'],

  // EZK 18 — Individual responsibility
  ['climate-exile', 'EZK', 18,
    'God declares that children will not die for parents\' sins, overturning the exiles\' complaint that they were punished for previous generations\' idolatry.'],

  // EZK 19 — Lament for Israel's princes
  ['climate-exile', 'EZK', 19,
    'A funeral dirge for Judah\'s last kings, depicted as lion cubs caught in nets and a vine uprooted, sung from exile over the fallen Davidic monarchy.'],

  // EZK 20 — Israel's history of rebellion
  ['climate-exile', 'EZK', 20,
    'God recounts Israel\'s rebellions from Egypt to Canaan, explaining to the exiles that their punishment is the culmination of centuries of unfaithfulness.'],

  // EZK 21 — The sword of the LORD
  ['climate-exile', 'EZK', 21,
    'God\'s sword is drawn and polished for slaughter, and Nebuchadnezzar stands at the crossroads choosing which nation to attack — a vision of Babylon as God\'s instrument.'],

  // EZK 22 — The sins of Jerusalem
  ['climate-exile', 'EZK', 22,
    'Jerusalem is a furnace of impurity where prophets, priests, officials, and people all share guilt; God sought one person to stand in the gap and found no one.'],

  // EZK 23 — Oholah and Oholibah
  ['climate-exile', 'EZK', 23,
    'Samaria and Jerusalem are portrayed as two sisters who prostituted themselves with Assyria and Babylon, explaining both the northern exile and Judah\'s current deportation.'],

  // EZK 24 — The cooking pot and Ezekiel's wife
  ['climate-exile', 'EZK', 24,
    'On the day Babylon begins its final siege, Ezekiel\'s wife dies and he is forbidden to mourn — his personal grief becomes a sign of the nation\'s coming loss.'],

  // EZK 25 — Oracles against Ammon, Moab, Edom, Philistia
  ['climate-exile', 'EZK', 25,
    'Judah\'s neighbors who gloated over Jerusalem\'s fall will face the same Babylonian judgment, proclaimed from exile as vindication for the humiliated deportees.'],

  // EZK 26 — Oracle against Tyre
  ['climate-exile', 'EZK', 26,
    'Tyre\'s commercial empire will be destroyed by Nebuchadnezzar, demonstrating that Babylon\'s conquests serve God\'s universal judgment, not just punishment of Israel.'],

  // EZK 27 — Lament for Tyre
  ['climate-exile', 'EZK', 27,
    'Tyre is described as a magnificent trading ship that sinks in the heart of the sea, a lament for fallen commercial glory that resonated with exiles who lost everything.'],

  // EZK 28 — Against the king of Tyre
  ['climate-exile', 'EZK', 28,
    'Tyre\'s king claimed to be a god in Eden\'s garden but will be brought down to the pit, a meditation on imperial pride written from the powerlessness of Babylonian exile.'],

  // EZK 29 — Oracle against Egypt
  ['climate-exile', 'EZK', 29,
    'Egypt is condemned as an unreliable ally that broke like a reed when Judah leaned on it, explaining to the exiles why trusting Egypt instead of God led to deportation.'],

  // EZK 30 — Lament for Egypt
  ['climate-exile', 'EZK', 30,
    'The day of the LORD comes against Egypt and its allies, proclaimed by Ezekiel in Babylon as proof that God\'s judgment extends to every empire.'],

  // EZK 31 — Egypt as a fallen cedar
  ['climate-exile', 'EZK', 31,
    'Pharaoh is compared to a great cedar of Lebanon felled for its pride, a warning issued from exile that even the mightiest powers fall when God acts.'],

  // EZK 32 — Lament for Pharaoh
  ['climate-exile', 'EZK', 32,
    'Pharaoh descends to Sheol and joins other fallen empires — Assyria, Elam, Meshech — a vision of the graveyard of empires delivered from Babylonian captivity.'],

  // EZK 33 — Ezekiel the watchman renewed
  ['climate-exile', 'EZK', 33,
    'News of Jerusalem\'s fall reaches the exiles; Ezekiel\'s ministry shifts from warning to restoration as the community absorbs the reality of total destruction.'],

  // EZK 35 — Oracle against Mount Seir
  ['climate-exile', 'EZK', 35,
    'Edom is condemned for seizing Judah\'s territory during the exile, addressing the exiles\' anger at neighbors who profited from their catastrophe.'],

  // EZK 38 — Gog of Magog (part 1)
  ['climate-exile', 'EZK', 38,
    'A future invasion by Gog from the far north is prophesied, assuring the exiles that even after restoration, God will defend Israel from any eschatological threat.'],

  // EZK 39 — Gog defeated
  ['climate-exile', 'EZK', 39,
    'God destroys Gog\'s army decisively, and the nations recognize that Israel\'s exile was discipline, not divine impotence — vindication for the deportees\' faith.'],

  // EZK 41 — The new Temple's inner room
  ['climate-exile', 'EZK', 41,
    'Ezekiel\'s vision of the restored Temple\'s measurements continues in meticulous detail, offering exiles a blueprint for hope that God will dwell among them again.'],

  // EZK 42 — The priests' chambers
  ['climate-exile', 'EZK', 42,
    'Sacred chambers for the priests are measured out in the Temple vision, assuring the exiles that holy worship will be restored with proper order.'],

  // EZK 43 — God's glory returns
  ['climate-exile', 'EZK', 43,
    'The glory of God that departed from the Temple in chapter 10 returns through the east gate, the climactic reversal of exile — God coming home.'],

  // EZK 44 — Regulations for the Temple
  ['climate-exile', 'EZK', 44,
    'The east gate is shut because God has entered, and new regulations restrict Temple service, establishing purity standards for the post-exile restoration.'],

  // EZK 45 — The sacred district
  ['climate-exile', 'EZK', 45,
    'Land is allotted for the Temple, priests, and prince in the restored community, a vision of just governance contrasting with the corrupt monarchy that caused exile.'],

  // EZK 46 — The prince's offerings
  ['climate-exile', 'EZK', 46,
    'The prince leads worship with appointed offerings on Sabbaths and festivals, a model of faithful leadership given to exiles who had known only corrupt kings.'],

  // EZK 48 — Land allotment for the tribes
  ['climate-exile', 'EZK', 48,
    'The twelve tribes receive idealized land divisions and the city is renamed "The LORD Is There," the exile\'s final vision — God permanently dwelling with His people.'],

  /* ======================= DANIEL (climate-exile) ======================= */

  // DAN 8 — The ram and the goat
  ['climate-exile', 'DAN', 8,
    'Daniel\'s vision of the ram and goat depicts the fall of Persia to Greece, revealing to the exilic community that God controls the succession of empires.'],

  // DAN 10 — Daniel's vision by the Tigris
  ['climate-exile', 'DAN', 10,
    'Daniel fasts three weeks by the Tigris and encounters an angelic messenger delayed by spiritual warfare, pulling back the curtain on cosmic conflict during exile.'],

  // DAN 11 — Kings of the north and south
  ['climate-exile', 'DAN', 11,
    'Detailed prophecy of wars between Ptolemaic and Seleucid empires, assuring exiles that God foreknows every geopolitical shift that will affect His people.'],

  // DAN 12 — The time of the end
  ['climate-exile', 'DAN', 12,
    'The dead will rise and the wise will shine like stars — the clearest Old Testament promise of resurrection, given to comfort a community enduring exile\'s suffering.'],

  /* ======================= HOSEA (divided-monarchy) ======================= */

  // HOS 2 — Israel's unfaithfulness and restoration
  ['divided-monarchy', 'HOS', 2,
    'Hosea\'s unfaithful wife symbolizes Israel\'s idolatry in the prosperous but spiritually corrupt 8th century under Jeroboam II, when Baal worship competed with Yahweh.'],

  // HOS 3 — Hosea redeems his wife
  ['divided-monarchy', 'HOS', 3,
    'Hosea buys back his adulterous wife as a sign that God will reclaim Israel after a long period without king or sacrifice, prophesying during the northern kingdom\'s final decades.'],

  // HOS 5 — Judgment on Israel and Judah
  ['divided-monarchy', 'HOS', 5,
    'Both Israel and Judah face God\'s judgment during the Syro-Ephraimite crisis, when the northern kingdom allied with Syria against its own southern brother.'],

  // HOS 6 — A call to repentance
  ['divided-monarchy', 'HOS', 6,
    'Israel\'s repentance is as fleeting as morning dew; God desires steadfast love, not sacrifice — a diagnosis of superficial religion in the prosperous 8th-century north.'],

  // HOS 7 — Israel's corruption
  ['divided-monarchy', 'HOS', 7,
    'Kings are assassinated in rapid succession and Israel lurches between Assyrian and Egyptian alliances, a portrait of political chaos in the northern kingdom\'s final years.'],

  // HOS 8 — Israel reaps the whirlwind
  ['divided-monarchy', 'HOS', 8,
    'They sow the wind and reap the whirlwind; Israel has multiplied altars for sinning, a harvest metaphor for the consequences of 8th-century idolatry.'],

  // HOS 9 — Punishment for Israel
  ['divided-monarchy', 'HOS', 9,
    'Israel will return to Egypt and eat unclean food in Assyria, a prophecy of exile delivered during the harvest festivals that disguised the nation\'s spiritual bankruptcy.'],

  // HOS 10 — Israel's guilt
  ['divided-monarchy', 'HOS', 10,
    'Israel\'s prosperous vineyards funded more altars to false gods; the calf of Beth-aven will be carried to Assyria as tribute when the empire finally strikes.'],

  // HOS 12 — Israel's guilt traced to Jacob
  ['divided-monarchy', 'HOS', 12,
    'Hosea traces Israel\'s deceitfulness back to Jacob who struggled with God, calling the 8th-century nation to return to the God their ancestor wrestled with at Peniel.'],

  // HOS 13 — God's wrath against Israel
  ['divided-monarchy', 'HOS', 13,
    'Where is your plague, O Death? — God threatens to unleash death on unrepentant Israel, a terrifying oracle from the final years before Assyria destroyed Samaria in 722 BC.'],

  /* ======================= JOEL (divided-monarchy) ======================= */

  // JOL 3 — Judgment in the Valley of Jehoshaphat
  ['divided-monarchy', 'JOL', 3,
    'God gathers all nations for judgment in the Valley of Jehoshaphat for scattering Israel and dividing the land, an eschatological oracle from the pre-exilic prophetic tradition.'],

  /* ======================= AMOS (divided-monarchy) ======================= */

  // AMO 2 — Judgment on Israel
  ['divided-monarchy', 'AMO', 2,
    'After condemning surrounding nations, Amos turns on Israel itself for selling the righteous for silver and trampling the poor, targeting 8th-century economic exploitation.'],

  // AMO 3 — Israel's unique accountability
  ['divided-monarchy', 'AMO', 3,
    'You only have I chosen among all the families of the earth, therefore I will punish you for all your sins — privilege increases accountability, not immunity, in the 8th century.'],

  // AMO 4 — Cows of Bashan
  ['divided-monarchy', 'AMO', 4,
    'Amos addresses the wealthy women of Samaria who oppress the poor and demand wine, skewering the conspicuous consumption of Jeroboam II\'s prosperous reign.'],

  // AMO 6 — Woe to the complacent
  ['divided-monarchy', 'AMO', 6,
    'The wealthy lie on ivory beds, eat lambs and calves, and anoint themselves with fine oils but grieve not for Israel\'s ruin — 8th-century luxury masking moral collapse.'],

  // AMO 8 — The basket of ripe fruit
  ['divided-monarchy', 'AMO', 8,
    'Israel is ripe for judgment; merchants cheat with dishonest scales and can barely wait for the Sabbath to end so they can resume exploiting the poor.'],

  // AMO 9 — Destruction and restoration
  ['divided-monarchy', 'AMO', 9,
    'The eyes of the Lord are on the sinful kingdom, yet God will not totally destroy Jacob — judgment tempered with a promise of restoration from 8th-century ruin.'],

  /* ======================= MICAH (divided-monarchy) ======================= */

  // MIC 1 — Judgment on Samaria and Judah
  ['divided-monarchy', 'MIC', 1,
    'Micah announces that Samaria will become a heap of rubble and the wound is incurable — reaching to Judah\'s gate, a prophecy linking the northern and southern crises of the 8th century.'],

  // MIC 2 — Woe to oppressors
  ['divided-monarchy', 'MIC', 2,
    'Powerful landowners seize fields and evict families while preachers of wind and lies are the prophets the people prefer, a rural prophet\'s indictment of 8th-century injustice.'],

  // MIC 3 — Leaders who devour
  ['divided-monarchy', 'MIC', 3,
    'Rulers who should protect the people instead skin them alive, and prophets sell their oracles for money — leadership corruption in the late 8th-century divided monarchy.'],

  // MIC 4 — Swords into plowshares
  ['divided-monarchy', 'MIC', 4,
    'Nations stream to Zion and beat swords into plowshares, a vision of universal peace proclaimed while Assyrian armies marched through the 8th-century Levant.'],

  /* ======================= NAHUM (divided-monarchy) ======================= */

  // NAM 2 — Nineveh attacked
  ['divided-monarchy', 'NAM', 2,
    'Nahum describes Nineveh\'s fall with chariots flashing and soldiers stumbling, a prophecy fulfilled in 612 BC when the Babylonians and Medes sacked the Assyrian capital.'],

  // NAM 3 — Woe to Nineveh
  ['divided-monarchy', 'NAM', 3,
    'Nineveh the city of blood will be exposed and shamed like Thebes before her, the 7th-century prophet celebrating the end of Assyria\'s reign of terror.'],

  /* ======================= HABAKKUK (divided-monarchy) ======================= */

  // HAB 2 — The LORD's answer
  ['divided-monarchy', 'HAB', 2,
    'The righteous shall live by faith — God tells Habakkuk that Babylon will be judged in turn, answering the 7th-century prophet\'s anguish over violence and injustice.'],

  /* ======================= ZEPHANIAH (divided-monarchy) ======================= */

  // ZEP 2 — Judgment on the nations
  ['divided-monarchy', 'ZEP', 2,
    'Philistia, Moab, Ammon, Cush, and Assyria face God\'s wrath as Zephaniah prophesies during Josiah\'s reign, when Assyria\'s collapse was creating a dangerous power vacuum.'],

  // ZEP 3 — Jerusalem rebuked and restored
  ['divided-monarchy', 'ZEP', 3,
    'God will purify Jerusalem and leave a humble remnant who trust in His name, a promise of restoration spoken during Josiah\'s 7th-century reforms.'],

  /* ======================= HAGGAI (climate-post-exile) ======================= */

  // HAG 2 — The glory of the new Temple
  ['climate-post-exile', 'HAG', 2,
    'The glory of the Second Temple will surpass the first — God encourages the discouraged returnees in 520 BC whose rebuilt temple seemed pathetic compared to Solomon\'s.'],

  /* ======================= ZECHARIAH (climate-post-exile) ======================= */

  // ZEC 2 — A man with a measuring line
  ['climate-post-exile', 'ZEC', 2,
    'Jerusalem will be a city without walls because of the multitude within it, a vision of expansion given to a tiny post-exilic community rebuilding from rubble in the Persian period.'],

  // ZEC 3 — Clean garments for Joshua
  ['climate-post-exile', 'ZEC', 3,
    'The high priest Joshua\'s filthy garments are replaced with clean robes, symbolizing the post-exilic community\'s purification and restored access to God.'],

  // ZEC 4 — The gold lampstand
  ['climate-post-exile', 'ZEC', 4,
    'Not by might nor by power but by my Spirit — God assures Zerubbabel that the Temple will be completed despite the tiny remnant\'s meager resources in Persian-period Judah.'],

  // ZEC 5 — The flying scroll and the woman in a basket
  ['climate-post-exile', 'ZEC', 5,
    'Wickedness is removed from the restored community and sent to Babylon in a basket, visions of moral cleansing for the post-exilic settlement.'],

  // ZEC 6 — Four chariots and Joshua's crown
  ['climate-post-exile', 'ZEC', 6,
    'Four chariots patrol the earth and Joshua the high priest is crowned, merging priestly and royal authority in the post-exilic community that lacked a Davidic king.'],

  // ZEC 7 — Justice, not fasting
  ['climate-post-exile', 'ZEC', 7,
    'The returnees ask whether to keep fasting for the Temple\'s destruction now that it is rebuilt; God answers that He wants justice and mercy, not empty ritual.'],

  // ZEC 8 — Promises for Jerusalem
  ['climate-post-exile', 'ZEC', 8,
    'Old men and women will sit in Jerusalem\'s streets and children will play there again — a vision of normalcy and peace for a post-exilic community still traumatized by destruction.'],

  // ZEC 10 — The LORD will restore
  ['climate-post-exile', 'ZEC', 10,
    'God promises to strengthen Judah and gather scattered Israel, speaking to the incomplete return from exile when many Jews remained in the Persian diaspora.'],

  // ZEC 11 — The rejected shepherd
  ['climate-post-exile', 'ZEC', 11,
    'The good shepherd is rejected and paid thirty pieces of silver, a prophetic enactment of leadership failure in the post-exilic period when worthy shepherds were scorned.'],

  // ZEC 13 — A fountain for cleansing
  ['climate-post-exile', 'ZEC', 13,
    'A fountain will open for the house of David to cleanse sin, and false prophets will be ashamed, envisioning spiritual purification beyond what the post-exilic Temple could provide.'],

  // ZEC 14 — The LORD comes to reign
  ['climate-post-exile', 'ZEC', 14,
    'God\'s feet will stand on the Mount of Olives and living water will flow from Jerusalem — the ultimate eschatological hope for a post-exilic community living under Persian rule.'],

  /* ======================= MALACHI (climate-post-exile) ======================= */

  // MAL 1 — God's love and the priests' contempt
  ['climate-post-exile', 'MAL', 1,
    'Priests offer blind and lame animals on God\'s altar while claiming to love Him; the post-exilic community\'s worship has decayed into cynical routine.'],

  // MAL 2 — Faithless priests and faithless husbands
  ['climate-post-exile', 'MAL', 2,
    'Priests have corrupted the covenant of Levi and men divorce the wives of their youth; spiritual and social faithlessness compound in the Persian-period community.'],

  // MAL 4 — The day of the LORD and Elijah's return
  ['climate-post-exile', 'MAL', 4,
    'The sun of righteousness will rise with healing, and Elijah will come before the great day — the final prophetic word before four centuries of silence between the testaments.'],
];

/* ───────────────────────────────────────────────────────
 * Run inserts in a transaction
 * ─────────────────────────────────────────────────────── */
const insertMany = db.transaction((data) => {
  let count = 0;
  for (const [contextId, bookId, chapter, note] of data) {
    insert.run(contextId, bookId, chapter, note);
    count++;
  }
  return count;
});

const count = insertMany(rows);
console.log(`Inserted ${count} passage_climate rows for 189 missing Prophet chapters.`);

/* ───────────────────────────────────────────────────────
 * Verify
 * ─────────────────────────────────────────────────────── */
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_climate
  WHERE book_id IN ('ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
    AND source_tier = 'ai_assisted'
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('AI-assisted passage_climate by book:', JSON.stringify(byBook));

const total = db.prepare(`
  SELECT COUNT(*) as c FROM passage_climate
  WHERE book_id IN ('ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
`).get();
console.log('Total Prophet passage_climate:', total.c);

db.close();
