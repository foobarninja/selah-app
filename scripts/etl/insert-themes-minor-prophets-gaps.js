/**
 * Insert passage_themes for 41 Minor Prophet chapters that have no theme tags.
 * 2 themes per chapter = 82 rows total.
 *
 * Books covered: HOS, JOL, AMO, MIC, NAM, HAB, ZEP, HAG, ZEC, MAL
 */
const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const rows = [
  /* ======================= HOSEA ======================= */

  // HOS 2 — Israel as unfaithful wife; judgment then restoration
  ['covenant', 'HOS', 2, 1, 25, 'primary',
    'God brings a covenant lawsuit against Israel-as-wife, charging her with chasing other lovers who she credits for her grain, wine, and oil.'],
  ['love', 'HOS', 2, 1, 25, 'primary',
    'Despite the indictment God promises to allure her into the wilderness and speak tenderly, turning the Valley of Trouble into a door of hope.'],

  // HOS 3 — Hosea buys Gomer back
  ['faithfulness', 'HOS', 3, 1, 5, 'primary',
    'Hosea purchases his unfaithful wife for fifteen shekels and barley, embodying God\'s relentless covenant faithfulness toward wayward Israel.'],
  ['repentance', 'HOS', 3, 1, 5, 'primary',
    'Gomer must live faithfully without other lovers for many days, a picture of Israel\'s long discipline before genuine return to the Lord.'],

  // HOS 5 — Judgment on priests, people, and kings
  ['divine-judgment', 'HOS', 5, 1, 15, 'primary',
    'God announces He will be like a moth to Ephraim and rot to Judah, slow invisible destruction followed by a lion\'s sudden strike.'],
  ['repentance', 'HOS', 5, 1, 15, 'primary',
    'God withdraws until Israel acknowledges guilt and seeks His face, waiting for genuine desperation rather than diplomatic fixes with Assyria.'],

  // HOS 6 — Shallow repentance
  ['mercy', 'HOS', 6, 1, 12, 'primary',
    'God declares "I desire mercy, not sacrifice" — steadfast covenant love outweighs ritual performance in every era.'],
  ['faithfulness', 'HOS', 6, 1, 12, 'primary',
    'Israel\'s love is like morning mist that evaporates before breakfast; God grieves a faithfulness that never outlasts the emotion of the moment.'],

  // HOS 7 — Israel's corruption like a heated oven
  ['idolatry', 'HOS', 7, 1, 16, 'primary',
    'Israel is like an oven whose baker sleeps: the dough of conspiracy rises unchecked, and the nation burns itself alive from the inside.'],
  ['divine-judgment', 'HOS', 7, 1, 16, 'primary',
    'God laments that He trained and strengthened their arms, yet they plot evil against Him; they are a faulty bow that misses every target.'],

  // HOS 8 — Reaping the whirlwind
  ['idolatry', 'HOS', 8, 1, 14, 'primary',
    'Israel multiplied altars for sinning and made self-appointed kings and golden calves; their self-made religion produces only ruin.'],
  ['divine-judgment', 'HOS', 8, 1, 14, 'primary',
    'They sow the wind and reap the whirlwind — the standing grain has no heads, and what grows strangers swallow.'],

  // HOS 9 — No more festivals
  ['divine-judgment', 'HOS', 9, 1, 17, 'primary',
    'Hosea announces the end of celebration and the beginning of exile; Israel will eat unclean food in Assyria and the prophet is called a fool for telling the truth.'],
  ['love', 'HOS', 9, 1, 17, 'primary',
    'God remembers finding Israel like grapes in the wilderness, first love contrasted with final betrayal as the nation consecrates itself to shame.'],

  // HOS 10 — Plowing wickedness, reaping injustice
  ['repentance', 'HOS', 10, 1, 15, 'primary',
    'Hosea calls Israel to sow righteousness and break up fallow ground, for it is time to seek the Lord before the storm arrives.'],
  ['covenant', 'HOS', 10, 1, 15, 'primary',
    'Israel plowed wickedness and reaped injustice because they trusted in their own way; the covenant curses now fall as God gathers nations against them.'],

  // HOS 12 — Jacob's legacy and Israel's failure
  ['faithfulness', 'HOS', 12, 1, 15, 'primary',
    'Hosea retells Jacob\'s life — grasping, wrestling, weeping — as a mirror for Ephraim, who has become rich and claims no guilt.'],
  ['covenant', 'HOS', 12, 1, 15, 'primary',
    'God reminds Israel that through prophets He spoke, multiplied visions, and gave parables, but Ephraim provoked bitterly despite continuous covenant communication.'],

  // HOS 13 — Death and resurrection, lion and grave
  ['divine-judgment', 'HOS', 13, 1, 16, 'primary',
    'God will be like a lion, a leopard, a bear robbed of cubs — Samaria shall bear her guilt because she rebelled against her God.'],
  ['mercy', 'HOS', 13, 1, 16, 'primary',
    'In the same breath as utter judgment comes impossible hope: "O Death, where are your plagues? O Grave, where is your sting?" — mercy snatching victory from the grave.'],

  /* ======================= JOEL ======================= */

  // JOL 3 — Valley of decision, judgment of the nations
  ['divine-judgment', 'JOL', 3, 1, 21, 'primary',
    'God gathers all nations to the Valley of Jehoshaphat to judge them for scattering Israel, dividing His land, and selling His people as slaves.'],
  ['prophetic-hope', 'JOL', 3, 1, 21, 'primary',
    'While the heavens and earth tremble, the Lord becomes a shelter for His people; Judah shall be inhabited forever and Jerusalem to all generations.'],

  /* ======================= AMOS ======================= */

  // AMO 2 — Judgment reaches Israel itself
  ['justice', 'AMO', 2, 1, 16, 'primary',
    'Amos pivots from condemning foreign nations to indicting Israel: they sell the righteous for silver and the needy for a pair of sandals.'],
  ['divine-judgment', 'AMO', 2, 1, 16, 'primary',
    'God reminds Israel of every grace they ignored — the Exodus, the Amorites destroyed, the prophets raised up — making their injustice inexcusable.'],

  // AMO 3 — The lion has roared
  ['sovereignty', 'AMO', 3, 1, 15, 'primary',
    'Seven rhetorical questions establish inevitability: does a lion roar without prey? The Sovereign Lord does nothing without revealing His plan to the prophets.'],
  ['divine-judgment', 'AMO', 3, 1, 15, 'primary',
    'God summons Ashdod and Egypt as witnesses to Samaria\'s corruption — even pagan nations would be shocked by Israel\'s injustice.'],

  // AMO 4 — Cows of Bashan and five unanswered warnings
  ['justice', 'AMO', 4, 1, 13, 'primary',
    'Amos calls the wealthy women "cows of Bashan" who oppress the poor and demand luxury while the vulnerable are crushed.'],
  ['compassion', 'AMO', 4, 1, 13, 'primary',
    'Five times God sent corrective hardship — famine, drought, blight, plague, overthrow — each an act of compassion disguised as discipline, each refused.'],

  // AMO 6 — Woe to the complacent
  ['rebellion', 'AMO', 6, 1, 15, 'primary',
    'The elite lounge on ivory beds, sing idle songs, and drink wine by the bowl, but are not grieved over the ruin of Joseph — pride blinding them to collapse.'],
  ['divine-judgment', 'AMO', 6, 1, 15, 'primary',
    'God swears by Himself to deliver the city: He abhors the pride of Jacob and will raise a nation to oppress them from border to border.'],

  // AMO 8 — The basket of summer fruit
  ['justice', 'AMO', 8, 1, 14, 'primary',
    'Merchants cannot wait for the Sabbath to end so they can cheat customers with rigged scales, making the poor stumble over a pair of sandals.'],
  ['sovereignty', 'AMO', 8, 1, 14, 'primary',
    'God sends a famine not of bread or water but of hearing His word — silence as the ultimate sovereign judgment on those who refused to listen.'],

  // AMO 9 — Destruction and restoration
  ['divine-judgment', 'AMO', 9, 1, 15, 'primary',
    'The Lord stands beside the altar commanding total demolition: dig into Sheol, climb to heaven, hide on Carmel — there is no escape.'],
  ['prophetic-hope', 'AMO', 9, 1, 15, 'primary',
    'God promises to raise David\'s fallen booth, repair its breaches, and restore abundance — the mountains will drip sweet wine and Israel will never again be uprooted.'],

  /* ======================= MICAH ======================= */

  // MIC 1 — Judgment on Samaria and Jerusalem
  ['divine-judgment', 'MIC', 1, 1, 16, 'primary',
    'God descends and the mountains melt like wax before fire; Samaria\'s wound is incurable and it has reached the gate of Jerusalem.'],
  ['justice', 'MIC', 1, 1, 16, 'primary',
    'Micah goes stripped and naked, wailing like jackals, embodying the grief of divine justice falling on both capital cities for systemic idolatry.'],

  // MIC 2 — Woe to land-grabbers
  ['justice', 'MIC', 2, 1, 13, 'primary',
    'Those who lie awake devising wickedness and seize fields at morning light face a God who is planning disaster shaped to fit their crime.'],
  ['divine-judgment', 'MIC', 2, 1, 13, 'primary',
    'God announces a yoke of judgment: those who stole land will have no one to divide land by lot in the assembly of the Lord.'],

  // MIC 3 — Leaders who skin the flock
  ['justice', 'MIC', 3, 1, 12, 'primary',
    'Rulers tear skin from the people and chop them like meat for the pot; prophets cry peace when fed and declare war when denied payment.'],
  ['humility', 'MIC', 3, 1, 12, 'primary',
    'Micah stands in contrast to the proud establishment, filled with power and the Spirit to declare Jacob\'s transgression while Zion will be plowed like a field.'],

  // MIC 4 — Swords into plowshares
  ['hope', 'MIC', 4, 1, 14, 'primary',
    'Nations will stream to the mountain of the Lord and beat swords into plowshares; none will learn war anymore in the vision of a world beyond violence.'],
  ['messianic-prophecy', 'MIC', 4, 1, 14, 'primary',
    'God will gather the lame, the outcast, and the afflicted into a strong nation and reign over them from Mount Zion forever.'],

  /* ======================= NAHUM ======================= */

  // NAM 2 — The fall of Nineveh
  ['divine-judgment', 'NAM', 2, 1, 14, 'primary',
    'Nineveh\'s siege unfolds in cinematic detail: shields flash red, chariots like torches, river gates burst open, the palace collapses.'],
  ['sovereignty', 'NAM', 2, 1, 14, 'primary',
    'God declares Himself directly against Nineveh: "I will burn your chariots, the sword will devour your young lions, and your messengers will be heard no more."'],

  // NAM 3 — Woe to the city of blood
  ['divine-judgment', 'NAM', 3, 1, 19, 'primary',
    'Nineveh is charged as a city of blood, lies, and plunder; heaps of corpses fill the streets and all who hear the news clap their hands.'],
  ['justice', 'NAM', 3, 1, 19, 'primary',
    'God exposes Nineveh publicly as she exposed others — punishment mirrors the crime, and not one voice rises to grieve for her.'],

  /* ======================= HABAKKUK ======================= */

  // HAB 2 — The righteous shall live by faith + five woes
  ['faith', 'HAB', 2, 1, 20, 'primary',
    'God answers the prophet on the watchtower: write the vision plainly, for the righteous shall live by his faithfulness — the verse that launched the Reformation.'],
  ['justice', 'HAB', 2, 1, 20, 'primary',
    'Five woes fall on Babylon for plunder, unjust gain, bloodshed, debauchery, and idolatry, while the earth will be filled with knowledge of God\'s glory as waters cover the sea.'],

  /* ======================= ZEPHANIAH ======================= */

  // ZEP 2 — Judgment on the nations surrounding Judah
  ['divine-judgment', 'ZEP', 2, 1, 15, 'primary',
    'Nation by nation the sentence falls: Gaza abandoned, Ashkelon desolate, Moab like Sodom, Cush slain, Nineveh a desert ruin.'],
  ['humility', 'ZEP', 2, 1, 15, 'primary',
    'Zephaniah urges the humble of the land to seek righteousness and humility — perhaps they will be hidden on the day of the Lord\'s anger.'],

  // ZEP 3 — Woe to Jerusalem, then singing over her
  ['divine-judgment', 'ZEP', 3, 1, 20, 'primary',
    'Jerusalem is indicted as the oppressing city whose officials are roaring lions and whose prophets are treacherous — the holy city became the corrupt city.'],
  ['joy', 'ZEP', 3, 1, 20, 'primary',
    'God removes the proud, leaves a humble remnant, then rejoices over them with gladness, quiets them with love, and exults over them with loud singing.'],

  /* ======================= HAGGAI ======================= */

  // HAG 2 — The glory of the second temple and Zerubbabel's signet ring
  ['worship', 'HAG', 2, 1, 24, 'primary',
    'Haggai assures discouraged builders that the latter glory of this house will exceed the former, because God\'s presence fills it, not human splendor.'],
  ['obedience', 'HAG', 2, 1, 24, 'primary',
    'God shakes heavens and earth, then makes Zerubbabel His signet ring — faithful obedience in a small task receives a cosmic commissioning.'],

  /* ======================= ZECHARIAH ======================= */

  // ZEC 2 — The man with the measuring line
  ['prophetic-hope', 'ZEC', 2, 1, 17, 'primary',
    'Jerusalem will be inhabited as villages without walls because God\'s glory overflows every boundary; He Himself will be a wall of fire around her.'],
  ['sovereignty', 'ZEC', 2, 1, 17, 'primary',
    'God promises to dwell in Jerusalem\'s midst and many nations will join themselves to the Lord — the scope of covenant expands from one city to all peoples.'],

  // ZEC 3 — Joshua the high priest cleansed
  ['holiness', 'ZEC', 3, 1, 11, 'primary',
    'Joshua stands before the angel in filthy garments; the accuser is rebuked and Joshua is reclothed in pure vestments — holiness as gift, not achievement.'],
  ['repentance', 'ZEC', 3, 1, 11, 'primary',
    'God takes away Joshua\'s iniquity and commissions him anew: "If you walk in my ways I will give you charge of my courts" — cleansing precedes commission.'],

  // ZEC 4 — The gold lampstand and Zerubbabel
  ['sovereignty', 'ZEC', 4, 1, 14, 'primary',
    '"Not by might nor by power but by my Spirit," says the Lord — the temple will be completed by divine power flowing like oil, not human effort.'],
  ['prophetic-hope', 'ZEC', 4, 1, 14, 'primary',
    'Zerubbabel\'s hands laid the foundation and will complete it; the mountain of obstacles becomes a plain, and those who despised small beginnings will rejoice.'],

  // ZEC 5 — The flying scroll and the woman in the basket
  ['holiness', 'ZEC', 5, 1, 11, 'primary',
    'A flying scroll enters every thief\'s and liar\'s house to consume it — sin is systematically identified and purged from the land.'],
  ['sovereignty', 'ZEC', 5, 1, 11, 'primary',
    'Wickedness personified is sealed in lead and exiled to Babylon; God does not simply suppress sin but physically removes it from His community.'],

  // ZEC 6 — Four chariots and Joshua crowned
  ['messianic-prophecy', 'ZEC', 6, 1, 15, 'primary',
    'Joshua is crowned and told the Branch will build the temple, bear royal honor, and unite priest and king on one throne — the offices converge in one figure.'],
  ['sovereignty', 'ZEC', 6, 1, 15, 'primary',
    'Four chariots with colored horses patrol the earth to the four winds; God\'s authority extends over every corner of creation.'],

  // ZEC 7 — Fasting or justice?
  ['justice', 'ZEC', 7, 1, 14, 'primary',
    'God redirects attention from fasting rituals to covenant behavior: render true judgments, show kindness, do not oppress the widow, fatherless, or poor.'],
  ['repentance', 'ZEC', 7, 1, 14, 'primary',
    'Israel made their hearts diamond-hard against the law and the prophets, so God scattered them with a whirlwind — ritual without repentance brings exile.'],

  // ZEC 8 — Jealous love and ten men grabbing one Jew's robe
  ['prophetic-hope', 'ZEC', 8, 1, 23, 'primary',
    'Old men and women will again sit in Jerusalem\'s streets while children play in the squares — the restored city as evidence of God\'s faithfulness.'],
  ['eschatological-hope', 'ZEC', 8, 1, 23, 'primary',
    'Ten men from every language will grab the robe of one Jew and say "Let us go with you, for we have heard that God is with you" — the nations drawn to covenant life.'],

  // ZEC 10 — Ask rain from the Lord
  ['prophetic-hope', 'ZEC', 10, 1, 12, 'primary',
    'God will strengthen Judah, gather the scattered, and make them as though He had never rejected them — redemption that erases the memory of exile.'],
  ['sovereignty', 'ZEC', 10, 1, 12, 'primary',
    'God\'s anger burns against the worthless shepherds; He Himself will visit the flock and make Judah His majestic warhorse in battle.'],

  // ZEC 11 — The two staffs broken
  ['covenant', 'ZEC', 11, 1, 17, 'primary',
    'The shepherd breaks the staff called Favor, annulling the covenant, then breaks Union, severing the brotherhood between Judah and Israel.'],
  ['messianic-prophecy', 'ZEC', 11, 1, 17, 'primary',
    'The good shepherd is valued at thirty pieces of silver — the price of a slave — foreshadowing the rejection and betrayal of the Messiah.'],

  // ZEC 13 — The fountain and the smitten shepherd
  ['holiness', 'ZEC', 13, 1, 9, 'primary',
    'A fountain is opened for sin and uncleanness; false prophets will be ashamed and the spirit of impurity removed from the land.'],
  ['messianic-prophecy', 'ZEC', 13, 1, 9, 'primary',
    '"Strike the shepherd and the sheep will scatter" — God commands the sword against His own shepherd, and the remnant is refined through fire like silver.'],

  // ZEC 14 — The Lord's feet on the Mount of Olives
  ['eschatological-hope', 'ZEC', 14, 1, 21, 'primary',
    'The Lord\'s feet stand on the Mount of Olives, splitting it in two; living waters flow east and west, and He is king over all the earth.'],
  ['sovereignty', 'ZEC', 14, 1, 21, 'primary',
    'Every pot in Jerusalem will be holy; the bells on the horses will say "Holy to the Lord" — the line between sacred and secular dissolves because the whole city becomes the temple.'],

  /* ======================= MALACHI ======================= */

  // MAL 1 — Polluted offerings and God's name among the nations
  ['worship', 'MAL', 1, 1, 14, 'primary',
    'Priests bring blind and lame animals to the altar; God says try offering them to your governor and see if he is pleased — worship reveals the heart\'s true priorities.'],
  ['covenant', 'MAL', 1, 1, 14, 'primary',
    'God declares "I have loved you" and contrasts Jacob with Esau, yet Israel profanes His name while among the nations it is honored from sunrise to sunset.'],

  // MAL 2 — Covenant with Levi broken, marriage covenant broken
  ['faithfulness', 'MAL', 2, 1, 17, 'primary',
    'Priests corrupted instruction and caused many to stumble; the lips of a priest should guard knowledge, but Levi\'s covenant of faithfulness has been shattered.'],
  ['justice', 'MAL', 2, 1, 17, 'primary',
    'God has been witness to the marriage covenant: He hates the covering of one\'s garment with violence, and the people weary Him by calling evil good.'],

  // MAL 4 — The sun of righteousness and Elijah's return
  ['prophecy', 'MAL', 4, 1, 6, 'primary',
    'God will send Elijah before the great and dreadful day to turn the hearts of parents to children and children to parents — the final prophetic word before centuries of silence.'],
  ['justice', 'MAL', 4, 1, 6, 'primary',
    'The day comes burning like an oven for the arrogant, but the sun of righteousness rises with healing in its wings for those who fear God\'s name.'],
];

const insertMany = db.transaction((data) => {
  let count = 0;
  for (const [themeId, bookId, chapter, vStart, vEnd, relevance, note] of data) {
    insert.run(themeId, bookId, chapter, vStart, vEnd, relevance, note);
    count++;
  }
  return count;
});

const count = insertMany(rows);
console.log(`Inserted ${count} passage_themes for 41 Minor Prophet gap chapters.`);

// Verify
const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('HOS','JOL','AMO','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
    AND source_tier = 'ai_assisted'
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('AI-assisted themes by book:', JSON.stringify(byBook));

db.close();
