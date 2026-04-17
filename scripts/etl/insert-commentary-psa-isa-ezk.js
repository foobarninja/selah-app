#!/usr/bin/env node
/**
 * Generate AI commentary for Psalm 1, Psalm 91, Psalm 119:1-32, Isaiah 9, Ezekiel 37
 * Source tier: AI-Assisted (selah-ai)
 * Voice: Modern Bridge — knowledgeable friend at the dinner table
 */

const Database = require("better-sqlite3");
const db = new Database("./data/selah.db");

const insert = db.prepare(
  `INSERT OR REPLACE INTO commentary_entries (source_id, book_id, chapter, verse, text, is_introduction)
   VALUES ('selah-ai', ?, ?, ?, ?, 0)`
);

const commentary = [];

// ============================================================================
// PSALM 1  (6 verses) — The Two Ways
// ============================================================================

commentary.push({ book_id: "PSA", chapter: 1, verse: 1, text:
  `Psalms 1:1 — "Blessed is the man who does not walk in the counsel of the wicked, or set foot on the path of sinners, or sit in the seat of mockers." — Notice the downward slide: walking, standing, sitting. It's a portrait of settling in. Nobody wakes up one morning and decides to become a cynic — it happens in stages. First you listen to bad advice, then you hang around people going the wrong direction, then you take a seat and get comfortable there. The psalm opens the entire Psalter with a warning about gravity.`
});

commentary.push({ book_id: "PSA", chapter: 1, verse: 2, text:
  `Psalms 1:2 — "But his delight is in the Law of the LORD, and on His law he meditates day and night." — The Hebrew for "meditates" (hagah) means to mutter or murmur — it's not silent contemplation but audible rehearsal, turning God's words over like a phrase you can't get out of your head. And the key word is "delight." This person isn't grinding through Scripture out of obligation; they actually want to be there. That's the real mark of the blessed life — not discipline without desire, but desire that fuels discipline.`
});

commentary.push({ book_id: "PSA", chapter: 1, verse: 3, text:
  `Psalms 1:3 — "He is like a tree planted by streams of water, yielding its fruit in season, whose leaf does not wither, and who prospers in all he does." — "Planted" is the operative word — this tree didn't just happen to sprout near the water. Someone chose its location. The image is of intentional rootedness. And notice: the fruit comes "in season," not on demand. Even the blessed life has seasons of hiddenness before harvest. Jeremiah 17:8 echoes this same image, which suggests it was a well-known proverb about what it looks like when a life is properly anchored.`
});

commentary.push({ book_id: "PSA", chapter: 1, verse: 4, text:
  `Psalms 1:4 — "Not so the wicked! For they are like chaff driven off by the wind." — The contrast is almost brutally efficient. After three verses painting a lush, rooted, fruitful tree, we get one image for the wicked: chaff. The dry husk that blows away during threshing. No roots, no fruit, no weight, no permanence. The psalm doesn't spend much time analyzing the wicked — there's not much to analyze. A life untethered from God is a life without substance.`
});

commentary.push({ book_id: "PSA", chapter: 1, verse: 5, text:
  `Psalms 1:5 — "Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous." — "Stand" doesn't just mean physical standing — it means to hold up, to endure scrutiny. When everything gets weighed, the chaff life doesn't survive the examination. The "assembly of the righteous" may refer to Israel's worshipping community or to a future final gathering, but the point is the same: there's a community the wicked have excluded themselves from, and it's not because the door was locked but because they never wanted in.`
});

commentary.push({ book_id: "PSA", chapter: 1, verse: 6, text:
  `Psalms 1:6 — "For the LORD guards the path of the righteous, but the way of the wicked will perish." — The psalm ends where it started — with paths. God "knows" (yada) the way of the righteous, and in Hebrew that's not passive awareness but intimate, invested knowledge. He's not observing the righteous from a distance; He's walking with them. The wicked's path, by contrast, just disappears — like a road that leads into a desert and stops. Psalm 1 is a gateway: every psalm that follows assumes this fork in the road.`
});

// ============================================================================
// PSALM 91  (16 verses) — Shelter of the Most High
// ============================================================================

commentary.push({ book_id: "PSA", chapter: 91, verse: 1, text:
  `Psalms 91:1 — "He who dwells in the shelter of the Most High will abide in the shadow of the Almighty." — Four names for God in the first two verses: Most High (Elyon), Almighty (Shaddai), LORD (Yahweh), and God (Elohim). It's like the psalmist is stacking up every name he knows, because no single title captures what this kind of protection feels like. "Dwells" and "abides" both imply permanence — this isn't someone ducking under an awning during a storm. It's someone who has moved in.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 2, text:
  `Psalms 91:2 — "I will say to the LORD, 'You are my refuge and my fortress, my God, in whom I trust.'" — The shift to first person makes this a declaration, not just a theological observation. There's a difference between believing God is a refuge and telling Him so out loud. "Fortress" (metsuda) is a military term — a high, fortified position that enemies can't reach. The psalmist isn't pretending the threats aren't real; he's claiming a position that puts him above them.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 3, text:
  `Psalms 91:3 — "Surely He will deliver you from the snare of the fowler, and from the deadly plague." — The two threats here represent two categories: deliberate attack (a trap set by a hunter) and impersonal catastrophe (plague). God's protection covers both — the enemy who's aiming for you and the disaster that isn't aimed at anyone. The "fowler" image is vivid: someone who sets invisible snares for birds. The traps we don't see coming are often the most dangerous.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 4, text:
  `Psalms 91:4 — "He will cover you with His feathers; under His wings you will find refuge; His faithfulness is a shield and rampart." — The imagery pivots from fortress to mother bird — from cold stone walls to warm feathers. God's protection isn't only about strength; it's about tenderness. Jesus would later use this same image when He wept over Jerusalem: "How often I wanted to gather your children together, as a hen gathers her chicks" (Matthew 23:37). Then the metaphor shifts again to shield and rampart, because God's faithfulness is both soft enough to shelter you and hard enough to stop what's coming at you.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 5, text:
  `Psalms 91:5 — "You will not fear the terror of the night, nor the arrow that flies by day," — Night terrors and daytime arrows — fear that comes in the dark when your imagination runs wild, and danger that comes in broad daylight when you can see it clearly. The psalm covers the full clock. The promise isn't that nothing bad happens at night or during the day; it's that fear doesn't get to be the ruling emotion in either.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 6, text:
  `Psalms 91:6 — "nor the pestilence that stalks in the darkness, nor the calamity that destroys at noon." — Pestilence "stalks" — it moves through the population like a predator. The ancients understood contagion in their own way, and they knew that plagues were indiscriminate and terrifying. "Destruction at noon" is particularly unsettling because noon is supposed to be safe — full visibility, no shadows to hide in. The psalm is dismantling every variety of fear, including the ones that strike when you least expect them.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 7, text:
  `Psalms 91:7 — "Though a thousand may fall at your side, and ten thousand at your right hand, no harm will come near you." — This is battlefield language, and the numbers are staggering — a thousand on one side, ten thousand on the other. The psalm doesn't deny that devastation is happening all around; it claims a supernatural exemption in the middle of it. This is one of those verses that sounds like a blank-check promise, and it's important to read it in context with the rest of Scripture, where faithful people do sometimes suffer. The psalm is speaking to the reality of divine protection, not guaranteeing that faith functions as body armor.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 8, text:
  `Psalms 91:8 — "You will only see it with your eyes and witness the punishment of the wicked." — "Only see it" — you'll be a witness, not a casualty. There's an echo of the Passover here, where Israel watched Egypt's judgment from behind doors marked with blood. The verse assumes a moral order to the universe: that wickedness eventually meets consequences. That doesn't mean every tragedy is punishment, but it does mean God isn't indifferent to injustice.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 9, text:
  `Psalms 91:9 — "Because you have made the LORD your dwelling— my refuge, the Most High—" — The verse restates the condition: all these protections flow from a choice. "Made the LORD your dwelling" is relational, not geographical. It's about where your life is centered, where your identity resides. The psalmist keeps circling back to this because the promise is only as real as the relationship behind it.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 10, text:
  `Psalms 91:10 — "no evil will befall you, no plague will approach your tent." — "Tent" roots this in the nomadic world of ancient Israel, where your home was literally a canvas structure in the wilderness. Even in that vulnerable setting — no walls, no moat, no alarm system — God's presence is the security system. The promise scales: whether you're in a tent or a high-rise, the source of safety doesn't change.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 11, text:
  `Psalms 91:11 — "For He will command His angels concerning you to guard you in all your ways." — This is the verse Satan quotes to Jesus in the wilderness temptation (Matthew 4:6, Luke 4:10-11), and that context matters enormously. Satan used real Scripture to suggest a false application — "throw yourself off the temple and let the angels catch you." Jesus refused, recognizing the difference between trusting God and testing Him. The verse is genuine — God does deploy angelic protection — but it was never meant to be wielded as a dare.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 12, text:
  `Psalms 91:12 — "They will lift you up in their hands, so that you will not strike your foot against a stone." — The image is almost parental — hands under a toddler's arms as they learn to walk. The angels' assignment isn't just battlefield protection; it extends to the small stumbles, the mundane hazards. Satan deliberately quoted this verse alongside verse 11, clipping it from its context of trust and twisting it into a script for presumption. The verse itself is beautiful; its misuse is a warning about how proof-texting works.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 13, text:
  `Psalms 91:13 — "You will tread on the lion and cobra; you will trample the young lion and serpent." — Lions and serpents together cover the spectrum of threats: the predator that overwhelms you with brute force and the one that strikes without warning from the ground. "Tread" and "trample" imply dominance, not just survival. Jesus told the seventy-two, "I have given you authority to trample on snakes and scorpions" (Luke 10:19), drawing a direct line from this psalm to the authority believers carry.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 14, text:
  `Psalms 91:14 — "'Because he loves Me, I will deliver him; because he knows My name, I will protect him.'" — The voice shifts dramatically — now God Himself is speaking. And notice what triggers the promise: love and knowledge of His name. Not perfect performance, not religious achievement, but relational attachment. "Knows My name" in Hebrew thought means far more than knowing a label; it means understanding someone's character and staking your life on it.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 15, text:
  `Psalms 91:15 — "'When he calls out to Me, I will answer him; I will be with him in trouble. I will deliver him and honor him.'" — God doesn't promise to prevent trouble — He promises to be in it with you. "I will be with him in trouble" is one of the most honest lines in the Psalter. Deliverance and honor come, but they come through the trial, not around it. The sequence matters: call, answer, presence in trouble, deliverance, honor. God doesn't skip steps.`
});

commentary.push({ book_id: "PSA", chapter: 91, verse: 16, text:
  `Psalms 91:16 — "'With long life I will satisfy him and show him My salvation.'" — The psalm ends with God's voice still speaking, and the final word is "salvation" (yeshua). Long life in the Old Testament was a sign of God's favor, and "satisfy" means not just duration but fulfillment — a life that feels complete, not just long. The last phrase, "show him My salvation," suggests that the ultimate deliverance isn't just surviving enemies but seeing God's rescue in its fullest dimension.`
});

// ============================================================================
// PSALM 119:1-32  (Aleph, Beth, Gimel, Daleth stanzas)
// ============================================================================

// --- ALEPH (vv. 1-8) ---

commentary.push({ book_id: "PSA", chapter: 119, verse: 1, text:
  `Psalms 119:1 — "Blessed are those whose way is blameless, who walk in the Law of the LORD." — The longest chapter in the Bible opens with the same word as Psalm 1: "Blessed" (ashre). That's not a coincidence — this is a 176-verse expansion of the tree-by-the-water life. "Blameless" doesn't mean sinless; it means wholehearted, undivided. Each eight-verse section of this psalm starts with a successive letter of the Hebrew alphabet, making the whole thing an A-to-Z love letter to God's word.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 2, text:
  `Psalms 119:2 — "Blessed are those who keep His testimonies and seek Him with all their heart." — "Testimonies" (edot) are God's declarations about who He is and what He requires — they're the receipts, so to speak. And "seek Him with all their heart" raises the bar: it's not enough to have the testimonies on file. You have to actively pursue the God behind them. Half-hearted seeking is the spiritual equivalent of a search you abandon after the first page of results.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 3, text:
  `Psalms 119:3 — "They do no iniquity; they walk in His ways." — This describes a direction, not perfection. The blameless aren't people who never stumble; they're people whose overall trajectory is toward God. "Walk" is habitual movement — it's about the pattern of your life, not isolated moments. The psalmist is painting a portrait of consistency, not sinlessness.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 4, text:
  `Psalms 119:4 — "You have ordained Your precepts, that we should keep them diligently." — Here the psalmist addresses God directly for the first time in the psalm. "Ordained" carries weight — these aren't suggestions or spiritual life hacks. God commanded them, and "diligently" (meod) means exceedingly, with real intensity. There's a gap between knowing what's commanded and caring enough to actually do it, and this verse lives right in that gap.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 5, text:
  `Psalms 119:5 — "Oh, that my ways were committed to keeping Your statutes!" — This is one of the most honest prayers in the Bible. The psalmist isn't boasting about his obedience; he's aching for more of it. The "Oh, that..." construction is a sigh, a longing. He knows the standard, he believes in it, and he feels the distance between where he is and where he wants to be. Every honest believer knows this feeling.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 6, text:
  `Psalms 119:6 — "Then I would not be ashamed when I consider all Your commandments." — Shame enters when we look at the full scope of what God asks and realize how far short we fall. "All Your commandments" — not just the convenient ones, not just the ones that come naturally. The psalmist is staring at the entire body of God's instruction and feeling the gap. But the tone isn't despair; it's motivation. He wants to reach a place where nothing in God's word makes him flinch.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 7, text:
  `Psalms 119:7 — "I will praise You with an upright heart when I learn Your righteous judgments." — Learning produces worship. That's the progression: understanding what God has decided (His judgments), and the right response is praise, not just agreement. "Upright heart" means sincerity — no performance, no going through motions. The psalmist is saying: the more I genuinely understand what You've ruled, the more I'll genuinely worship You.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 8, text:
  `Psalms 119:8 — "I will keep Your statutes; do not utterly forsake me." — The Aleph stanza ends with a promise and a plea. "I will keep Your statutes" is commitment, but "do not utterly forsake me" is vulnerability. The psalmist knows he can't do this alone. Even his best intention needs God's sustaining presence. That combination — resolve plus dependence — is the posture of real faith.`
});

// --- BETH (vv. 9-16) ---

commentary.push({ book_id: "PSA", chapter: 119, verse: 9, text:
  `Psalms 119:9 — "How can a young man keep his way pure? By guarding it according to Your word." — The Beth stanza opens with a practical question that hasn't aged a day. The answer isn't willpower, accountability partners, or better habits — it's God's word as a guardrail. "Guarding" (shamar) is watchman language: you're standing sentry over your own path. The young man in view isn't expected to be immune to temptation; he's expected to be armed against it.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 10, text:
  `Psalms 119:10 — "With all my heart I have sought You; do not let me stray from Your commandments." — Again the "all my heart" language — the psalmist doesn't do anything halfway. But the prayer "do not let me stray" reveals a healthy self-awareness: even wholehearted seekers can wander. He's asking God to be both the destination and the guardrail. The honesty here is refreshing — he trusts his desire but not his consistency.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 11, text:
  `Psalms 119:11 — "I have hidden Your word in my heart that I might not sin against You." — Probably the most memorized verse about memorization. "Hidden" (tsaphan) means to treasure up, to store something valuable in a secure location. The heart is the vault, and God's word is the treasure. The logic is straightforward: when truth is internalized, sin has less room to operate. It's not a magic formula, but it is a proven strategy — what's in your heart shapes what comes out of your life.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 12, text:
  `Psalms 119:12 — "Blessed are You, O LORD; teach me Your statutes." — A burst of praise right in the middle of instruction. The psalmist blesses God and then immediately asks to be taught. The connection is intentional: worship opens us up to learning. When you're genuinely in awe of someone, you're far more receptive to what they have to say. This verse is both prayer and posture.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 13, text:
  `Psalms 119:13 — "With my lips I proclaim all the judgments of Your mouth." — The word goes in (verse 11) and then comes out (verse 13). Internalization without expression is hoarding; expression without internalization is parroting. The psalmist does both: he stores it and he speaks it. "All the judgments" — not the popular ones, not the comfortable ones, all of them. There's a completeness to his commitment.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 14, text:
  `Psalms 119:14 — "I rejoice in the way of Your testimonies as much as in all riches." — This is a staggering comparison. The psalmist isn't saying God's word is moderately valuable; he's putting it on the same shelf as total wealth. "All riches" — not some, all. The comparison reveals what he actually treasures. It's easy to say Scripture is valuable; it's another thing to mean it the way this verse means it, where you'd genuinely trade everything else for it.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 15, text:
  `Psalms 119:15 — "I will meditate on Your precepts and regard Your ways." — "Meditate" (siach) here means to muse, to ponder carefully, to turn something over mentally. "Regard" means to look intently at, to give sustained attention. Both words describe slow, deliberate engagement — the opposite of scrolling past. The psalmist is committing to focused attention in a world that rewards distraction. Some things only reveal their depth when you linger.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 16, text:
  `Psalms 119:16 — "I will delight in Your statutes; I will not forget Your word." — The Beth stanza closes with delight and memory. "Delight" (sha'a) means to take exquisite pleasure in something. This isn't duty; it's enjoyment. And "I will not forget" echoes the opening of the stanza — guarding your way means holding on to what guards you. The stanza began with purity and ends with pleasure, suggesting they're not as separate as we often assume.`
});

// --- GIMEL (vv. 17-24) ---

commentary.push({ book_id: "PSA", chapter: 119, verse: 17, text:
  `Psalms 119:17 — "Deal bountifully with Your servant, that I may live and keep Your word." — The Gimel stanza opens with a request for generosity. The psalmist doesn't assume he deserves abundance; he asks for it, and his reason is revealing — not "so I can be comfortable" but "so I can live and obey." He sees continued life as an opportunity for continued faithfulness. That's an unusual way to think about being alive.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 18, text:
  `Psalms 119:18 — "Open my eyes that I may see wondrous things from Your law." — One of the most important prayers any Bible reader can pray. The assumption is that wondrous things are already in the text — the problem is with our eyes, not with the content. "Open" (galah) means to uncover, to remove a veil. The psalmist believes there are layers in God's word that require divine help to access. Study is necessary, but illumination is a gift.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 19, text:
  `Psalms 119:19 — "I am a stranger on the earth; do not hide Your commandments from me." — "Stranger" (ger) is a loaded word in the Torah — it refers to the resident alien, the foreigner without rights or roots. The psalmist feels that displacement and uses it as leverage in prayer: "I'm a stranger here, and the only orientation I have is Your word. Don't withhold it." When you feel like you don't belong in the world around you, God's word becomes your map and your home address.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 20, text:
  `Psalms 119:20 — "My soul is consumed with longing for Your judgments at all times." — "Consumed" (garas) means crushed or broken — the longing is so intense it's physically painful. This isn't casual interest in theology; it's a craving. "At all times" rules out seasonal devotion. The psalmist wants God's judgments — His authoritative rulings on right and wrong — the way a starving person wants bread. Not as a hobby, but as survival.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 21, text:
  `Psalms 119:21 — "You rebuke the arrogant— the cursed who stray from Your commandments." — Arrogance and straying go together. The arrogant person believes they know better than God's commands, and straying is the inevitable result. "Cursed" is strong language, but the logic is clear: to deliberately wander from God's path is to walk away from God's blessing. The rebuke isn't arbitrary anger; it's the natural consequence of self-appointed authority.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 22, text:
  `Psalms 119:22 — "Remove my scorn and contempt, for I have kept Your testimonies." — The psalmist is asking for relief from social pressure — people are mocking him for his devotion. "Scorn and contempt" suggest public humiliation. His defense isn't to argue with his critics; it's to appeal to God. He's kept the testimonies despite the cost, and he's asking God to vindicate that loyalty. Sometimes faithfulness makes you look foolish to the people around you, and only God can lift that weight.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 23, text:
  `Psalms 119:23 — "Though rulers sit and slander me, Your servant meditates on Your statutes." — The opposition isn't coming from random critics — it's from rulers, people with power. They're not just disagreeing; they're slandering. And the psalmist's response? He meditates. He doesn't fight back, plot revenge, or launch a PR campaign. He goes deeper into God's word. That's not weakness; it's a strategic refusal to let powerful enemies set the agenda for his inner life.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 24, text:
  `Psalms 119:24 — "Your testimonies are indeed my delight; they are my counselors." — The Gimel stanza ends with God's testimonies replacing human advisors. Where rulers slander (verse 23), God's word counsels. The psalmist doesn't just read Scripture for comfort; he uses it for decision-making. "Counselors" (anshe atsati, literally "men of my counsel") personifies the testimonies — they're like trusted advisors sitting at his table, guiding him when everyone else is lying about him.`
});

// --- DALETH (vv. 25-32) ---

commentary.push({ book_id: "PSA", chapter: 119, verse: 25, text:
  `Psalms 119:25 — "My soul cleaves to the dust; revive me according to Your word." — The Daleth stanza opens in the dirt. "Cleaves to the dust" means face-down, flattened, barely alive. This is depression language, or at minimum profound exhaustion. And the remedy he reaches for isn't a change of scenery or a motivational speech — it's God's word. "Revive me" (chayeni) means make me alive again. He's asking Scripture to do what only breath can do: reanimate what's gone still.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 26, text:
  `Psalms 119:26 — "I recounted my ways, and You answered me; teach me Your statutes." — There's honest self-examination here. The psalmist told God where he's been — the good, the bad, the embarrassing — and God responded. The willingness to recount your ways before God, without editing, is the beginning of real growth. And then comes the next ask: "teach me." Confession without continued learning is incomplete; he wants to know what to do next.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 27, text:
  `Psalms 119:27 — "Make clear to me the way of Your precepts; then I will meditate on Your wonders." — Understanding unlocks meditation. He's not asking for information just to have it; he's asking so he can go deeper. "Make clear" (bin) means to cause to understand, to give insight. The psalmist knows the difference between reading and understanding, and he's asking for the latter. Once he gets it, he'll meditate — he'll stay with it until the wonder shows itself.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 28, text:
  `Psalms 119:28 — "My soul melts with sorrow; strengthen me according to Your word." — "Melts" (dalaf) means to drip or weep — the soul is dissolving under the weight of grief. This is raw. And again, the prescription is "according to Your word." The psalmist has a single-source pharmacy. He goes to the same well for revival (verse 25), for teaching (verse 26), for insight (verse 27), and now for strength. God's word isn't a specialist; it's a general practitioner that covers everything.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 29, text:
  `Psalms 119:29 — "Remove me from the path of deceit and graciously grant me Your law." — Two requests that mirror each other: take away the false, give me the true. "Path of deceit" isn't necessarily lying to others — it can mean a self-deceived life, a life built on illusions about what matters. "Graciously grant" (chanan) is mercy language — he's not claiming he earned the law. He knows it's a gift, and he's asking for it the way you'd ask for grace: with open hands, not clenched fists.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 30, text:
  `Psalms 119:30 — "I have chosen the way of truth; I have set Your ordinances before me." — After asking God to remove deceit, the psalmist declares his own choice. There's a partnership here: God removes the false (verse 29), and the psalmist chooses the true (verse 30). "Set before me" means he's placed God's ordinances in his line of sight — like pinning a note to the dashboard. The choice for truth isn't made once; it's renewed every time you set God's word in front of your eyes again.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 31, text:
  `Psalms 119:31 — "I cling to Your testimonies, O LORD; let me not be put to shame." — "Cling" (davaq) is the same word used in Genesis 2:24 for a man clinging to his wife. It's covenant language, bond language. The psalmist's attachment to God's testimonies is intimate and stubborn. And the prayer against shame echoes verse 6 — he's still concerned about the gap between God's standard and his life, but he's holding on rather than letting go.`
});

commentary.push({ book_id: "PSA", chapter: 119, verse: 32, text:
  `Psalms 119:32 — "I run in the path of Your commandments, for You will enlarge my heart." — The Daleth stanza began face-down in the dust (verse 25) and ends running. That's resurrection trajectory. "Enlarge my heart" means expanded capacity — more room for understanding, for joy, for obedience. The commandments aren't a narrow corridor that restricts movement; they're a track that enables speed. When your heart is enlarged, obedience stops feeling like a cage and starts feeling like a sprint.`
});

// ============================================================================
// ISAIAH 9  (21 verses) — For Unto Us a Child Is Born
// ============================================================================

commentary.push({ book_id: "ISA", chapter: 9, verse: 1, text:
  `Isaiah 9:1 — "Nevertheless, there will be no more gloom for those in distress. In the past He humbled the land of Zebulun and the land of Naphtali, but in the future He will honor the Way of the Sea, beyond the Jordan, Galilee of the nations:" — The geography matters. Zebulun and Naphtali were the first territories hit when Assyria invaded from the north — they got the worst of it first. Isaiah says the same region that experienced the deepest humiliation will receive the greatest honor. Matthew 4:13-16 identifies this as fulfilled when Jesus begins His ministry in Galilee. The darkest corner gets the first light.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 2, text:
  `Isaiah 9:2 — "The people walking in darkness have seen a great light; on those living in the land of the shadow of death, a light has dawned." — "Shadow of death" (tsalmaveth) isn't metaphorical hand-wringing — these people were living under genuine existential threat from the Assyrian war machine. The light that breaks through isn't a candle; it's described as "great," overwhelming enough to change the entire atmosphere. This verse is read every Christmas, and rightly so, but its original audience wasn't thinking about a manger — they were thinking about survival.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 3, text:
  `Isaiah 9:3 — "You have enlarged the nation and increased its joy. The people rejoice before You as they rejoice at harvest time, as men rejoice in dividing the plunder." — Two images of celebration: harvest and victory. Harvest joy is the relief of provision after a season of labor and uncertainty. Plunder joy is the exhilaration after a battle won. Both are earthy, physical, communal — people laughing together because the threat is over and the table is full. God's deliverance doesn't produce stoic gratitude; it produces the kind of joy that shows up in your body.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 4, text:
  `Isaiah 9:4 — "For as in the day of Midian You have shattered the yoke of their burden, the bar across their shoulders, and the rod of their oppressor." — "The day of Midian" is a specific reference to Judges 7, when Gideon's tiny force of 300 defeated the entire Midianite army through God's intervention. Isaiah is saying: the coming deliverance will be like that — so disproportionate, so obviously God's doing, that no human general can take credit. Yoke, bar, rod — three images of oppression, all shattered.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 5, text:
  `Isaiah 9:5 — "For every trampling boot of battle and every garment rolled in blood will be burned as fuel for the fire." — The tools of war themselves are destroyed — not stored, not repurposed, burned. This isn't just a ceasefire; it's the end of the need for war. The boots and bloody garments that represent military power become kindling. Isaiah is describing a peace so complete that the instruments of violence are rendered permanently obsolete.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 6, text:
  `Isaiah 9:6 — "For unto us a child is born, unto us a son is given, and the government will be upon His shoulders. And He will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace." — Every one of these titles would be extraordinary for a human king; together they're impossible for anyone merely human. "Mighty God" (El Gibbor) is a divine title — Isaiah uses it for God Himself in 10:21. A child born who is also Mighty God, an earthly son who is also Everlasting Father — the tension in these titles is the tension of the Incarnation, centuries before Bethlehem. This verse doesn't explain how it works; it just announces that it will.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 7, text:
  `Isaiah 9:7 — "Of the increase of His government and peace there will be no end. He will reign on the throne of David and over his kingdom, to establish and sustain it with justice and righteousness from that time and forevermore. The zeal of the LORD of Hosts will accomplish this." — "No end" to the increase — not a static kingdom but an expanding one. And the power behind it isn't the king's competence but "the zeal of the LORD of Hosts." God is passionate about this promise. The throne of David was empty or occupied by failures for centuries, and Isaiah says someone is coming who will actually fill it. Justice and righteousness aren't campaign promises; they're the actual foundation.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 8, text:
  `Isaiah 9:8 — "The Lord has sent a message against Jacob, and it has fallen upon Israel." — The tone shifts abruptly. After the soaring promise of verses 1-7, Isaiah pivots to judgment. God's word "falls upon" Israel the way a sentence falls on the accused. The Northern Kingdom (Israel/Jacob) is about to learn that the same God who promises a future Messiah also holds the present generation accountable. Promise and judgment are not contradictions; they come from the same mouth.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 9, text:
  `Isaiah 9:9 — "All the people will know it— Ephraim and the dwellers of Samaria. With pride and arrogance of heart they will say:" — Ephraim was the dominant tribe of the Northern Kingdom, and Samaria was its capital. "All the people will know it" — the judgment won't be ambiguous or deniable. But instead of repentance, Isaiah predicts arrogance. They'll know what God has done and still respond with defiance. Pride doesn't crumble just because the evidence is clear.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 10, text:
  `Isaiah 9:10 — "'The bricks have fallen, but we will rebuild with finished stone; the sycamores have been felled, but we will replace them with cedars.'" — This sounds like resilience, but Isaiah frames it as defiance. They're not rebuilding in partnership with God; they're rebuilding in spite of Him. Bricks to hewn stone, sycamores to cedars — they're upgrading, doubling down. "We'll come back stronger" can be faith or it can be hubris, and the difference is whether God is in the sentence. He's not in this one.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 11, text:
  `Isaiah 9:11 — "The LORD has raised up the foes of Rezin against him and joined his enemies together." — Rezin was king of Aram (Syria), and he had been allied with Israel against Judah. Now God turns the tables — Rezin's own enemies become the instrument of judgment. God uses geopolitics. He doesn't need miracles to bring discipline; He works through the alliances, betrayals, and power shifts that already dominate the ancient Near East.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 12, text:
  `Isaiah 9:12 — "Aram from the east and Philistia from the west have devoured Israel with open mouths. Despite all this, His anger is not turned away; His hand is still upraised." — The refrain "His hand is still upraised" will repeat three more times (9:17, 9:21, 10:4). It's a drumbeat of warning: the judgment isn't over. Aram and Philistia attack from opposite directions, a pincer movement, and still the people don't turn back. Each repetition of the refrain tightens the vise a little more.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 13, text:
  `Isaiah 9:13 — "But the people did not return to Him who struck them; they did not seek the LORD of Hosts." — The tragedy in this verse isn't the striking — it's the refusal to return. God's discipline had a purpose: to provoke repentance. It didn't work. "They did not seek" — the initiative was available. The door was open. But seeking requires humility, and humility was the one thing their pride wouldn't permit. The saddest failures are the ones where the way back was clearly marked and nobody took it.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 14, text:
  `Isaiah 9:14 — "So the LORD will cut off Israel's head and tail, both palm branch and reed in a single day." — "Head and tail, palm branch and reed" — this is a total amputation of leadership, from top to bottom, from noble to common. "In a single day" emphasizes the swiftness. When God moves in judgment, the structures people assumed were permanent can vanish overnight. Isaiah is about to explain who the head and tail are.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 15, text:
  `Isaiah 9:15 — "The head is the elder and honorable man, and the tail is the prophet who teaches lies." — The elder represents political leadership; the false prophet represents religious leadership. Both are cut off. Notice that the prophet who teaches lies is the "tail" — the one wagging behind, telling the body politic whatever it wants to hear. False prophets don't lead; they follow popular opinion and baptize it with spiritual language. That makes them the tail, not the head, no matter how loudly they claim to speak for God.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 16, text:
  `Isaiah 9:16 — "For those who guide this people mislead them, and those they mislead are swallowed up." — Leadership failure produces cascading destruction. The guides become misleaders, and the misled get consumed. It's a food chain of deception. But notice: both parties bear responsibility. The leaders for misleading, and the people for following without discernment. "Swallowed up" is the end of a people who outsourced their thinking to leaders who weren't trustworthy.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 17, text:
  `Isaiah 9:17 — "Therefore the Lord takes no pleasure in their young men; He has no compassion on their fatherless and widows. For every one of them is godless and wicked, and every mouth speaks folly. Despite all this, His anger is not turned away; His hand is still upraised." — This is one of the hardest verses in the chapter. God withholds compassion from the categories that usually receive it most — the young, the orphaned, the widowed. The reason given is devastating: "every one of them is godless." The corruption is total, top to bottom. When an entire society is complicit, the usual exemptions don't apply. The refrain sounds again, relentless.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 18, text:
  `Isaiah 9:18 — "For wickedness burns like a fire that consumes the thorns and briers and kindles the forest thickets which roll upward in billows of smoke." — Sin as wildfire — it starts in the underbrush (thorns and briers) and climbs into the canopy (forest thickets). The smoke billows upward, visible for miles. Isaiah is describing how moral corruption spreads: it doesn't stay contained. What begins as small compromises eventually engulfs entire systems. Anyone who has watched an institution collapse from internal rot knows exactly what this looks like.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 19, text:
  `Isaiah 9:19 — "By the wrath of the LORD of Hosts the land is scorched, and the people are fuel for the fire. No man even spares his brother." — The fire isn't just natural consequence; it's fueled by divine wrath. And the most chilling detail: "No man even spares his brother." Social bonds disintegrate. When God's judgment lands on a society, the first casualty is solidarity. People who should protect each other become predators. The breakdown of brotherhood is both a result of judgment and a form of it.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 20, text:
  `Isaiah 9:20 — "They carve out what is on the right, but they are still hungry; they eat what is on the left, but they are still not satisfied. Each one devours the flesh of his own offspring." — This may be literal famine language — sieges in the ancient world produced unthinkable desperation — or it may describe the insatiable greed that drives a collapsing society. Either way, the image is grotesque on purpose. A people consuming their own future ("the flesh of his own offspring") is a society that has lost all capacity for self-preservation. Greed without limit eats everything, including what it should protect most.`
});

commentary.push({ book_id: "ISA", chapter: 9, verse: 21, text:
  `Isaiah 9:21 — "Manasseh devours Ephraim, and Ephraim Manasseh; together they turn against Judah. Despite all this, His anger is not turned away; His hand is still upraised." — Manasseh and Ephraim were the two sons of Joseph — they should be natural allies. Instead they're consuming each other, and then uniting only to attack Judah. Civil war between brothers, followed by joint aggression against the remaining family. The chapter ends with the refrain one more time, a door that hasn't closed. God's hand is still raised, and the next chapter will deliver the final blows.`
});

// ============================================================================
// EZEKIEL 37  (28 verses) — Valley of Dry Bones
// ============================================================================

commentary.push({ book_id: "EZK", chapter: 37, verse: 1, text:
  `Ezekiel 37:1 — "The hand of the LORD was upon me, and He brought me out by His Spirit and set me down in the middle of the valley, and it was full of bones." — Ezekiel doesn't walk into this valley; he's placed there by God's Spirit. The prophet has no choice about what he's about to see. "Full of bones" — not a few scattered remains, but a valley carpeted with death. This is the aftermath of a catastrophic defeat, likely evoking the destruction of Jerusalem and the exile. God puts His prophet at ground zero and says: look at this.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 2, text:
  `Ezekiel 37:2 — "He led me all around among them, and I saw a great many bones on the floor of the valley, and indeed, they were very dry." — God gives Ezekiel a tour. Not a glance from a distance — He walks him through the entire field. "Very dry" is the key detail: these bones have been here a long time. No moisture, no marrow, no life left in any biological sense. The dryness is the point. If God can do something with these, He can do something with anything.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 3, text:
  `Ezekiel 37:3 — "Then He asked me, 'Son of man, can these bones come to life?' 'O Lord GOD,' I replied, 'only You know.'" — This might be the wisest answer in the entire Bible. Ezekiel doesn't say yes — that would be presumption. He doesn't say no — that would be denial of God's power. He says, "You know." It's a response that holds together both the impossibility of the situation and the sovereignty of God. When you're standing in a valley of death and God asks you a question, honest uncertainty beats false confidence every time.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 4, text:
  `Ezekiel 37:4 — "And He said to me, 'Prophesy concerning these bones and tell them, "Dry bones, hear the word of the LORD!"'" — God tells Ezekiel to preach to bones. This is absurd, and it's meant to be. Dead things can't hear. But God's word creates the capacity for what it commands. When God says "hear," He's not waiting for the bones to tune in — His word is the force that makes hearing possible. Every act of preaching is, at some level, an act of talking to dry bones and trusting God's word to do what human words can't.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 5, text:
  `Ezekiel 37:5 — "This is what the Lord GOD says to these bones: I will cause breath to enter you, and you will come to life." — "Breath" (ruach) is the same word as "spirit" and "wind" in Hebrew. God is promising to do what He did in Genesis 2:7 when He breathed into Adam. The language is deliberately creational — this isn't repair, it's re-creation. God doesn't fix what's broken; He makes dead things alive from scratch. That's not renovation; that's resurrection.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 6, text:
  `Ezekiel 37:6 — "I will attach tendons to you and make flesh grow upon you and cover you with skin. I will put breath within you so that you will come to life. Then you will know that I am the LORD." — The reconstruction sequence is specific and cinematic: tendons first, then flesh, then skin, then breath. God is rebuilding bodies in anatomical order. "Then you will know that I am the LORD" — the purpose of the miracle isn't just to reverse death. It's revelation. When the impossible happens, the only explanation left is God.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 7, text:
  `Ezekiel 37:7 — "So I prophesied as I had been commanded. And as I prophesied, there was suddenly a noise, a rattling, and the bones came together, bone to bone." — Ezekiel obeys, and the sound effects begin. "A noise, a rattling" — imagine the sound of thousands of bones scraping across stone, finding their matches, clicking into place. This is the most audible vision in the prophets. The obedience of the prophet and the power of God's word converge in a moment that you'd hear before you'd see. The valley becomes a construction site.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 8, text:
  `Ezekiel 37:8 — "As I looked on, tendons appeared on them, flesh grew, and skin covered them; but there was no breath in them." — God delivers exactly what He promised in verse 6, in order — tendons, flesh, skin. But He pauses before the final step. The bodies are complete but lifeless. This is a deliberate pause in the narrative, and it makes a theological point: physical completeness isn't life. You can have all the parts and still be dead. The breath — God's Spirit — is what makes the difference between a body and a person.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 9, text:
  `Ezekiel 37:9 — "Then He said to me, 'Prophesy to the breath; prophesy, son of man, and tell the breath that this is what the Lord GOD says: Come from the four winds, O breath, and breathe into these slain, so that they may live!'" — Now Ezekiel is told to prophesy to the breath itself — to command the ruach. "Four winds" means from every direction, from the totality of creation. The slain don't summon their own breath; it must be called from outside them. This is the same pattern as Pentecost: the Spirit comes as wind, from beyond, into people who could not generate it themselves.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 10, text:
  `Ezekiel 37:10 — "So I prophesied as He had commanded me, and the breath entered them, and they came to life and stood on their feet—a vast army." — They don't just breathe; they stand. And they're not a crowd; they're an army. The word "vast" (gadol meod) means exceedingly great. What was a graveyard is now a military force. The transformation is total: from scattered bones to organized, purposeful, standing-on-their-feet power. This is what God's Spirit does — it doesn't just revive individuals; it forms them into something with collective purpose and direction.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 11, text:
  `Ezekiel 37:11 — "Then He said to me, 'Son of man, these bones are the whole house of Israel. Look, they are saying, "Our bones are dried up, and our hope has perished; we are cut off."'" — God interprets the vision. The bones represent Israel in exile — not physically dead but nationally and spiritually dead. The three complaints are devastating: dried up (no vitality), hope perished (no future), cut off (no connection). This is what exile felt like from the inside. God doesn't dismiss their despair; He quotes it back to them before answering it.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 12, text:
  `Ezekiel 37:12 — "Therefore prophesy and tell them that this is what the Lord GOD says: 'O My people, I will open your graves and bring you up from them, and I will bring you back to the land of Israel.'" — "O My people" — the covenant language is still active. They said "we are cut off" (verse 11), and God responds with "My people." He hasn't let go. "Open your graves" shifts from the valley metaphor to burial language, making the promise even more personal. Whatever tomb you're in — exile, depression, national collapse — God is in the business of opening graves.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 13, text:
  `Ezekiel 37:13 — "Then you, My people, will know that I am the LORD, when I open your graves and bring you up from them." — Again the purpose statement: "you will know that I am the LORD." God's rescue operations are always also revelation events. The return from exile wasn't just a geopolitical event; it was a theological declaration. When people who were dead come back to life, the only appropriate response is to recognize who did it. God stakes His identity on the reversal.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 14, text:
  `Ezekiel 37:14 — "I will put My Spirit in you and you will live, and I will settle you in your own land. Then you will know that I, the LORD, have spoken, and I will do it, declares the LORD." — The vision comes full circle: Spirit, life, land. This is a triple restoration. And the final declaration — "I have spoken, and I will do it" — is God stamping His own reliability. He's not making a suggestion or expressing a hope; He's announcing a fact in advance. The gap between God's promise and its fulfillment is never a question of ability, only timing.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 15, text:
  `Ezekiel 37:15 — "Again the word of the LORD came to me, saying," — A new oracle begins. The valley of bones dealt with resurrection; now the sticks deal with reunification. Ezekiel 37 has two halves, and both address the same core problem from different angles: Israel isn't just dead — it's divided. God intends to fix both.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 16, text:
  `Ezekiel 37:16 — "And you, son of man, take a single stick and write on it: 'Belonging to Judah and to the Israelites associated with him.' Then take another stick and write on it: 'Belonging to Joseph—the stick of Ephraim—and to all the house of Israel associated with him.'" — Judah represents the Southern Kingdom; Ephraim/Joseph represents the Northern Kingdom. They've been divided since Rehoboam's reign (1 Kings 12), roughly 400 years by Ezekiel's time. Two sticks, two kingdoms, two identities. The labels matter — each stick carries the name of a family, a history, an entire set of tribal loyalties. God is about to erase the division that seemed permanent.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 17, text:
  `Ezekiel 37:17 — "Then join them together into one stick, so that they become one in your hand." — This is a visual sermon. Ezekiel holds one stick in each hand, then brings them together. The simplicity of the action is the point — what had been politically impossible for centuries, God demonstrates with a simple gesture. "One in your hand" — not two sticks glued together, but genuinely one. The unity God promises isn't a fragile alliance; it's a fundamental merging of identity.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 18, text:
  `Ezekiel 37:18 — "When your people ask you, 'Won't you explain to us what you mean by these?'" — God anticipates the question. He knows the people will be curious, and He builds the explanation into the prophetic act. This is a pattern throughout Ezekiel: dramatic visual demonstrations that provoke questions, which then become teaching moments. God doesn't just announce; He performs, then explains. The visual sticks first, then the verbal interpretation. Some truths need to be seen before they can be understood.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 19, text:
  `Ezekiel 37:19 — "you are to tell them that this is what the Lord GOD says: 'I will take the stick of Joseph, which is in the hand of Ephraim, and the tribes of Israel associated with him, and I will put them together with the stick of Judah. I will make them into a single stick, and they will become one in My hand.'" — "In My hand" — this is God's work, not a political negotiation. The Northern and Southern kingdoms couldn't reconcile themselves; they needed a hand bigger than both to hold them together. Notice the progression: Ezekiel holds them together in his hand (verse 17), but God says they will become one in His hand (verse 19). The prophet demonstrates what God will accomplish.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 20, text:
  `Ezekiel 37:20 — "When the sticks on which you write are in your hand and in full view of the people," — The visual aid is public. Everyone can see it. God doesn't deliver this promise in a private whisper to Ezekiel; He makes it a spectacle. The exiles in Babylon need to witness this with their own eyes. There's something about physically watching two sticks become one that hits different than just hearing about it. God knows how humans learn, and He teaches accordingly.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 21, text:
  `Ezekiel 37:21 — "you are to tell them that this is what the Lord GOD says: 'I will take the Israelites out of the nations to which they have gone, and I will gather them from all around and bring them into their own land.'" — Gathering from "all around" — the diaspora wasn't concentrated in one place. Israelites had been scattered by Assyria, by Babylon, and by voluntary migration. God promises to gather them from every direction. This is a logistical impossibility that God announces as a simple fact. He doesn't explain the mechanism; He just says "I will."`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 22, text:
  `Ezekiel 37:22 — "I will make them one nation in the land, on the mountains of Israel, and one king will rule over all of them. Then they will no longer be two nations and will never again be divided into two kingdoms." — "Never again be divided" — this goes beyond the post-exilic return, where Israel was never fully reunited as described here. The promise points forward to a fulfillment that transcends any specific historical moment. "One king" echoes the Messianic expectation: a ruler who unifies what human kings kept tearing apart. The mountains of Israel, not the plains of Babylon, are the stage for this reunion.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 23, text:
  `Ezekiel 37:23 — "They will no longer defile themselves with their idols or detestable images, or with any of their transgressions. I will save them from all their apostasies by which they sinned, and I will cleanse them. Then they will be My people, and I will be their God." — The covenant formula — "My people / their God" — is restored. But notice what precedes it: cleansing from idolatry. The original division of the kingdom was rooted in spiritual compromise (1 Kings 11-12), so the reunification requires spiritual purification. God doesn't just reassemble the nation; He addresses the root cause of its fracture. Reunion without repentance would just set up the next split.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 24, text:
  `Ezekiel 37:24 — "My servant David will be king over them, and there will be one shepherd for all of them. They will follow My ordinances and keep and observe My statutes." — "My servant David" — David had been dead for roughly 400 years when Ezekiel wrote this. This is either about a literal resurrection of David or, more likely, about a coming Davidic king who embodies everything David was supposed to be. "One shepherd" ties directly to Ezekiel 34, where God condemned Israel's failed shepherds and promised to install His own. The good shepherd and the Davidic king are the same figure.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 25, text:
  `Ezekiel 37:25 — "They will live in the land that I gave to My servant Jacob, where your fathers lived. They will live there forever with their children and grandchildren, and My servant David will be their prince forever." — "Forever" appears twice, with emphasis. The land promise to Jacob (Genesis 28:13) is reaffirmed and made permanent. "Children and grandchildren" — God is thinking generationally. This isn't a temporary resettlement; it's an eternal inheritance. And the Davidic prince reigns alongside them, not as a temporary monarch but as a forever ruler. The language keeps pressing past what any historical return could deliver.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 26, text:
  `Ezekiel 37:26 — "And I will make a covenant of peace with them; it will be an everlasting covenant. I will establish them and multiply them, and I will set My sanctuary among them forever." — "Covenant of peace" (berit shalom) — not just the absence of war but the presence of wholeness. "Everlasting covenant" means no expiration, no conditions that could void it. And then the stunning detail: "My sanctuary among them forever." God doesn't just restore the people to the land; He moves in with them. The entire trajectory of Scripture — from Eden to tabernacle to temple — points toward God dwelling with His people, and this verse promises it will finally be permanent.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 27, text:
  `Ezekiel 37:27 — "My dwelling place will be with them; I will be their God, and they will be My people." — Revelation 21:3 quotes this verse almost verbatim to describe the new heaven and new earth. What Ezekiel promises, John sees fulfilled. "My dwelling place with them" is the end of distance, the end of mediated access, the end of needing a temple as a designated meeting point because God's presence permeates everything. This verse is the hinge between Old Testament hope and New Testament consummation.`
});

commentary.push({ book_id: "EZK", chapter: 37, verse: 28, text:
  `Ezekiel 37:28 — "Then the nations will know that I the LORD sanctify Israel, when My sanctuary is among them forever." — The chapter ends with the audience expanding beyond Israel to the nations. God's work with Israel was never just about Israel — it was always meant to be witnessed by the watching world. "Sanctify" means to set apart, to make holy. When God's presence takes up permanent residence with His people, the whole earth will see what it looks like when God claims a people as His own. The bones that were dead are now alive, the sticks that were divided are now one, and the God who did it all is home forever.`
});

// ============================================================================
// INSERT ALL COMMENTARY
// ============================================================================

const insertMany = db.transaction(() => {
  for (const c of commentary) {
    insert.run(c.book_id, c.chapter, c.verse, c.text);
  }
});

insertMany();

console.log(`Inserted ${commentary.length} commentary entries:`);

const counts = {};
for (const c of commentary) {
  const key = `${c.book_id} ${c.chapter}`;
  counts[key] = (counts[key] || 0) + 1;
}
for (const [key, count] of Object.entries(counts)) {
  console.log(`  ${key}: ${count} verses`);
}

db.close();
