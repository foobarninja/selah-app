#!/usr/bin/env node
/**
 * Generate AI commentary for Proverbs 3, Ecclesiastes 3, Jeremiah 29, Daniel 3
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
// PROVERBS 3  (35 verses)
// ============================================================================

commentary.push({ book_id: "PRO", chapter: 3, verse: 1, text:
  `Proverbs 3:1 \u2014 "My son, do not forget my teaching, but let your heart keep my commandments;" \u2014 This is a parent leaning across the table, not a lecturer behind a podium. The Hebrew for "forget" (shakach) isn't just mental \u2014 it means to neglect, to let something slip away through inattention. The father isn't worried his son can't recite the rules; he's worried the kid will stop caring about them. Every generation faces this: the slow drift from what we were taught, not because we rejected it but because we got busy.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 2, text:
  `Proverbs 3:2 \u2014 "for they will add length to your days, years and peace to your life." \u2014 The promise here is shalom \u2014 not just "peace" as absence of conflict but wholeness, completeness, things fitting together the way they should. The Proverbs often frame wisdom's rewards in tangible terms: longer life, real peace. This isn't prosperity gospel; it's the observation that people who live with integrity tend to sleep better and avoid the chaos that recklessness brings.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 3, text:
  `Proverbs 3:3 \u2014 "Never let loving devotion or faithfulness leave you; bind them around your neck, write them on the tablet of your heart." \u2014 "Loving devotion" translates chesed \u2014 God's stubborn, covenant-keeping love that refuses to quit on people. The imagery of binding and writing echoes Deuteronomy 6:8, where Israel was told to physically attach God's words to their bodies. The point is visceral: make faithfulness so much a part of you that it's indistinguishable from your identity.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 4, text:
  `Proverbs 3:4 \u2014 "Then you will find favor and high regard in the sight of God and man." \u2014 This verse makes an audacious claim: that living with chesed and faithfulness earns you credibility in both directions \u2014 upward toward God and outward toward people. Luke 2:52 uses nearly identical language about Jesus growing in favor with God and man. It's a reminder that genuine character has a way of being recognized, even in cynical environments.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 5, text:
  `Proverbs 3:5 \u2014 "Trust in the LORD with all your heart, and lean not on your own understanding;" \u2014 Probably the most quoted verse in Proverbs, and for good reason. "Lean" (sha'an) means to support your weight on something \u2014 like leaning on a wall. The father is saying: don't make your own analysis the load-bearing wall of your life. This doesn't mean stop thinking; it means stop treating your conclusions as the final word. There's a difference between using your mind and worshipping it.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 6, text:
  `Proverbs 3:6 \u2014 "in all your ways acknowledge Him, and He will make your paths straight." \u2014 "Acknowledge" (yada) is the Hebrew word for deep, intimate knowing \u2014 the same word used for the most personal human relationships. This isn't a checkbox prayer before a decision; it's an ongoing awareness of God in every part of your life. The promise isn't that the path will be easy, but that it will be clear.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 7, text:
  `Proverbs 3:7 \u2014 "Be not wise in your own eyes; fear the LORD and turn away from evil." \u2014 The most dangerous kind of foolishness is the kind that thinks it's wisdom. "Wise in your own eyes" describes someone who has stopped listening because they've decided they already know enough. The antidote is the fear of the Lord \u2014 not terror, but the kind of awe that keeps you humble enough to keep learning.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 8, text:
  `Proverbs 3:8 \u2014 "This will bring healing to your body and refreshment to your bones." \u2014 The Hebrews didn't separate body and soul the way modern Westerners tend to. Spiritual health and physical well-being were connected. "Refreshment to your bones" (shiquy) literally means moisture or drink \u2014 like water soaking into dry ground. Living with humility and reverence isn't just good theology; it's good for your whole self.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 9, text:
  `Proverbs 3:9 \u2014 "Honor the LORD with your wealth and with the firstfruits of all your harvest;" \u2014 Firstfruits meant giving the first portion before you knew how the rest of the harvest would turn out. It was an act of trust, not accounting. In an agrarian economy, this was genuinely risky \u2014 you gave the first grain before seeing whether the rains would hold. The principle survives the shift from fields to paychecks: generosity from the top, not from the leftovers.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 10, text:
  `Proverbs 3:10 \u2014 "then your barns will be filled with plenty, and your vats will overflow with new wine." \u2014 This is wisdom literature, not a contractual guarantee. Proverbs describe how life generally works, not how it always works \u2014 the book of Job exists to make that distinction. That said, the pattern is real: people who hold their resources with open hands tend to find their lives marked by abundance in ways that tight-fisted living never produces.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 11, text:
  `Proverbs 3:11 \u2014 "My son, do not reject the discipline of the LORD, and do not loathe His rebuke;" \u2014 Nobody likes being corrected. The word for "loathe" (quts) means to feel a visceral disgust. The father knows his son's instinct will be to recoil when God redirects him. Hebrews 12:5-6 quotes this passage directly, framing divine discipline not as punishment but as parenting. The hardest part of discipline isn't the pain \u2014 it's accepting that it comes from love.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 12, text:
  `Proverbs 3:12 \u2014 "for the LORD disciplines the one He loves, as does a father the son in whom he delights." \u2014 The comparison to fatherhood is the interpretive key. A father who never corrects his child doesn't love that child \u2014 he's indifferent. God's correction is evidence of investment, not anger. The Hebrew word for "delights" (ratsah) means to take pleasure in, to be satisfied with. Discipline and delight aren't opposites; they're proof of the same relationship.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 13, text:
  `Proverbs 3:13 \u2014 "Blessed is the man who finds wisdom, the man who acquires understanding," \u2014 The shift here moves from instruction to celebration. Wisdom is now personified \u2014 she'll get her own speaking parts later in Proverbs 8. "Finds" suggests both searching and stumbling upon, like a treasure you discover because you were looking in the right direction. "Blessed" (ashre) means deeply happy \u2014 not giddy, but the settled contentment of someone whose life actually works.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 14, text:
  `Proverbs 3:14 \u2014 "for she is more profitable than silver, and her gain is better than fine gold." \u2014 The Teacher pulls out economic language his audience would understand. In the ancient Near East, silver was common currency and gold was the premium store of value. He's saying wisdom outperforms both \u2014 a claim that would have raised eyebrows in a commercial culture. The comparison forces a question we still dodge: if you could trade your smartest investment for genuine wisdom, would you?`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 15, text:
  `Proverbs 3:15 \u2014 "She is more precious than rubies; nothing you desire compares with her." \u2014 "Nothing you desire" is a sweeping absolute. Rubies (or possibly red coral \u2014 the Hebrew peninim is debated) were the most valuable gems in the ancient world. The point is that wisdom doesn't compete in the same category as material wealth; she transcends the whole ranking system. Job 28 makes the same argument at even greater length.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 16, text:
  `Proverbs 3:16 \u2014 "Long life is in her right hand; in her left hand are riches and honor." \u2014 Wisdom is pictured as a queen distributing gifts with both hands. The right hand (the hand of power and preference) holds long life; the left holds riches and honor. Everything people chase through shortcuts and schemes, wisdom offers freely to those who pursue her. It's a portrait of abundance that comes through character rather than hustle.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 17, text:
  `Proverbs 3:17 \u2014 "All her ways are pleasant, and all her paths are peaceful." \u2014 "Pleasant" (no'am) carries the sense of beauty and delight. "Peaceful" is shalom again \u2014 wholeness. The wise life isn't pictured as grim duty but as genuine enjoyment. This pushes back against the caricature that following God means giving up everything good. Wisdom's path is described as the most attractive option available, not a sacrifice you endure.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 18, text:
  `Proverbs 3:18 \u2014 "She is a tree of life to those who embrace her, and those who lay hold of her are blessed." \u2014 The tree of life appears first in Genesis 2-3, in the garden before the fall. Connecting wisdom to that image is intentional: wisdom offers a way back toward what was lost. "Embrace" and "lay hold of" are physical, active verbs \u2014 this isn't passive appreciation but a deliberate grip on something life-giving.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 19, text:
  `Proverbs 3:19 \u2014 "The LORD founded the earth by wisdom and established the heavens by understanding." \u2014 Now the scope explodes outward. The same wisdom the father has been urging his son to pursue is the force God used to build the universe. This means wisdom isn't just practical advice for getting through the day \u2014 it's woven into the fabric of reality itself. When you live wisely, you're aligning with the operating system of creation.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 20, text:
  `Proverbs 3:20 \u2014 "By His knowledge the watery depths were broken open, and the clouds dripped with dew." \u2014 The imagery evokes both the primordial deep of Genesis 1 and the ongoing water cycle that sustains life. God's knowledge (da'at \u2014 experiential, intimate knowledge) governs both cosmic forces and morning dew. The juxtaposition of the massive and the delicate is the point: wisdom operates at every scale.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 21, text:
  `Proverbs 3:21 \u2014 "My son, do not lose sight of this: Preserve sound judgment and discernment." \u2014 The father pulls his son back from the cosmic to the practical: don't just admire wisdom in the abstract \u2014 hold onto it in daily life. "Sound judgment" (tushiyyah) is a rare word in Hebrew that suggests effective, working wisdom \u2014 the kind that actually produces results, not just impressive conversation.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 22, text:
  `Proverbs 3:22 \u2014 "They will be life to your soul and adornment to your neck." \u2014 "Adornment to your neck" parallels the necklace imagery from verse 3. In the ancient world, neck jewelry signaled status and identity. Wisdom doesn't just keep you alive \u2014 it gives you a visible dignity that others can see. The soul and the exterior both benefit; wisdom isn't a private, hidden thing.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 23, text:
  `Proverbs 3:23 \u2014 "Then you will go on your way in safety, and your foot will not stumble." \u2014 "Stumble" (nagaph) can mean to strike against something or to be tripped up. The promise isn't that the road will have no obstacles but that you'll have the footing to navigate them. Think of it as the difference between walking through a dark room with and without a flashlight \u2014 the furniture is still there, but you don't crash into it.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 24, text:
  `Proverbs 3:24 \u2014 "When you lie down, you will not be afraid; when you rest, your sleep will be sweet." \u2014 Insomnia and anxiety are ancient problems, not modern inventions. The person who lives with wisdom can actually rest because they're not lying awake replaying bad decisions or dreading consequences. "Sweet sleep" is one of the most practical, tangible rewards the Proverbs promise \u2014 and anyone who's spent a night staring at the ceiling knows how valuable it is.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 25, text:
  `Proverbs 3:25 \u2014 "Do not fear sudden danger or the ruin that overtakes the wicked," \u2014 "Sudden danger" (pachad pit'om) captures that jolt of fear when something unexpected hits. The reassurance isn't that bad things won't happen \u2014 it's that the wise person has a foundation that doesn't collapse when they do. The "ruin of the wicked" is specifically the kind of catastrophe that comes from living recklessly; the wise person is simply not in that lane.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 26, text:
  `Proverbs 3:26 \u2014 "for the LORD will be your confidence and will keep your foot from the snare." \u2014 "Confidence" (kesel) is a fascinating word \u2014 in other contexts it can mean foolish self-reliance. Here it's redeemed: the Lord himself becomes the ground of your confidence. The snare imagery comes from hunting \u2014 hidden traps set along a path. With God as your security, you're not relying on your own ability to spot every danger.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 27, text:
  `Proverbs 3:27 \u2014 "Do not withhold good from the deserving when it is within your power to act." \u2014 The chapter pivots from theology to ethics, from trust in God to treatment of neighbors. "Within your power" is literally "when it is in the power of your hand" \u2014 meaning you have the resources right now. This isn't about grand philanthropy; it's about the moment when someone needs something you can provide and you hesitate.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 28, text:
  `Proverbs 3:28 \u2014 "Do not tell your neighbor, 'Come back tomorrow and I will provide'\u2014 when you already have the means." \u2014 This is devastatingly specific. The sin isn't refusing to help \u2014 it's delaying help you could give right now. The excuse of "tomorrow" is a way to feel generous without actually being generous. James 2:15-16 echoes this exact scenario: wishing someone well while withholding what they need.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 29, text:
  `Proverbs 3:29 \u2014 "Do not devise evil against your neighbor, for he trustfully dwells beside you." \u2014 The word "trustfully" (betach) is the key. Your neighbor lives near you in a posture of trust \u2014 they've let their guard down because proximity creates an assumption of safety. Scheming against someone who trusts you is a particular kind of treachery. This applies to any relationship where someone has made themselves vulnerable to you.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 30, text:
  `Proverbs 3:30 \u2014 "Do not accuse a man without cause, when he has done you no harm." \u2014 The Hebrew word for "accuse" (riv) is a legal term \u2014 it means to bring a formal dispute. This prohibits weaponizing the justice system (or social pressure) against someone who hasn't wronged you. Frivolous accusations are a form of violence, and they were as much a problem in ancient Israel as they are in the age of social media.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 31, text:
  `Proverbs 3:31 \u2014 "Do not envy a violent man or choose any of his ways;" \u2014 There's something in human nature that admires the person who takes what they want by force. The violent man gets results \u2014 at least in the short term. The father warns against both envying the outcomes and adopting the methods. Psalm 73 is the extended meditation on this same temptation: watching the ruthless prosper and wondering if playing by the rules is worth it.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 32, text:
  `Proverbs 3:32 \u2014 "for the LORD detests the perverse, but He is a friend to the upright." \u2014 "Friend" (sod) means intimate counsel \u2014 being brought into the inner circle. God doesn't just tolerate the upright; he confides in them. The contrast between "detests" and "is a friend to" couldn't be sharper. The perverse person (luz \u2014 someone who twists things, who is devious) repels God. The straight-dealing person attracts his companionship.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 33, text:
  `Proverbs 3:33 \u2014 "The curse of the LORD is on the house of the wicked, but He blesses the home of the righteous." \u2014 The contrast between "house" and "home" is telling \u2014 the wicked build structures; the righteous build households. God's blessing or curse extends beyond individuals to the environments they create. This isn't about square footage; it's about the spiritual atmosphere of the places where people live.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 34, text:
  `Proverbs 3:34 \u2014 "He mocks the mockers, but gives grace to the humble." \u2014 James 4:6 and 1 Peter 5:5 both quote this verse, making it one of the Old Testament's most New-Testament-relevant proverbs. There's a divine irony at work: those who mock others become the objects of God's mockery, while those who lower themselves receive unmerited favor. The humble don't earn grace \u2014 that would be a contradiction \u2014 but they're postured to receive it.`
});

commentary.push({ book_id: "PRO", chapter: 3, verse: 35, text:
  `Proverbs 3:35 \u2014 "The wise will inherit honor, but fools are held up to shame." \u2014 The chapter ends with inheritance language \u2014 honor isn't seized or earned in the transactional sense; it's inherited, like property passed down to those who belong to the family. Fools, by contrast, don't just miss out on honor; they actively accumulate shame. The final note is a choice: which inheritance are you building toward?`
});

// ============================================================================
// ECCLESIASTES 3  (22 verses)
// ============================================================================

commentary.push({ book_id: "ECC", chapter: 3, verse: 1, text:
  `Ecclesiastes 3:1 \u2014 "To everything there is a season, and a time for every purpose under heaven:" \u2014 The Teacher opens with one of the most recognized lines in all of literature. "Under heaven" is his signature framing \u2014 everything that happens in the human experience, seen from ground level. The word for "season" (zeman) suggests an appointed time, not random chance. There's a structure to life, even when it doesn't feel like it.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 2, text:
  `Ecclesiastes 3:2 \u2014 "a time to be born and a time to die, a time to plant and a time to uproot," \u2014 He starts at the extremes: birth and death, the two events no human controls. Then he shifts to agriculture \u2014 planting and uprooting \u2014 where humans participate but don't ultimately decide whether the rain comes. The pairing forces honesty: you showed up without being asked and you'll leave without being consulted. Everything between those bookends is the territory of this poem.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 3, text:
  `Ecclesiastes 3:3 \u2014 "a time to kill and a time to heal, a time to break down and a time to build," \u2014 This pair is uncomfortable on purpose. The Teacher isn't endorsing killing; he's acknowledging that life includes it \u2014 war, capital punishment, slaughter for food, the hard necessities of an imperfect world. He refuses to sanitize the human experience. Healing follows killing; building follows tearing down. The sequence matters: destruction precedes reconstruction.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 4, text:
  `Ecclesiastes 3:4 \u2014 "a time to weep and a time to laugh, a time to mourn and a time to dance," \u2014 The Teacher validates the full emotional spectrum. Cultures that only permit joy become shallow; cultures that only permit grief become crushing. Both weeping and laughing are appropriate \u2014 the wisdom is knowing which one fits the moment. Anyone who has laughed at a funeral or cried at a wedding knows that these categories bleed into each other.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 5, text:
  `Ecclesiastes 3:5 \u2014 "a time to cast away stones and a time to gather stones together, a time to embrace and a time to refrain from embracing," \u2014 "Casting away stones" may refer to clearing a field for planting, while gathering them could mean building walls or preparing for siege. Some rabbinic interpreters read this as a euphemism for intimacy and abstinence. Either way, the Teacher keeps insisting: opposite actions can both be right, depending on the season. Wisdom is timing.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 6, text:
  `Ecclesiastes 3:6 \u2014 "a time to search and a time to count as lost, a time to keep and a time to discard," \u2014 Knowing when to stop looking is its own kind of wisdom. We live in a culture that says never give up, never let go, never quit searching. The Teacher disagrees. Sometimes the right move is to grieve what's gone and open your hands. Hoarding \u2014 whether objects, relationships, or grudges \u2014 is as misguided as throwing everything away.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 7, text:
  `Ecclesiastes 3:7 \u2014 "a time to tear and a time to mend, a time to be silent and a time to speak," \u2014 Tearing garments was the ancient expression of grief \u2014 raw, visible, undeniable. Mending comes later, when the worst has passed. The silence-and-speech pairing is devastating in its simplicity. Job's friends got it right when they sat in silence for seven days; they got it catastrophically wrong when they opened their mouths. Sometimes the most loving thing you can do is shut up.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 8, text:
  `Ecclesiastes 3:8 \u2014 "a time to love and a time to hate, a time for war and a time for peace." \u2014 The poem ends where it has to end \u2014 with the biggest categories. Love and hate, war and peace. The Teacher doesn't flinch from including hate in the catalog of appointed times. This isn't permission to be hateful; it's an acknowledgment that righteous anger at injustice, at evil, at cruelty, has its season. The poem offers no resolution. It just sits there, asking you to hold all of it.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 9, text:
  `Ecclesiastes 3:9 \u2014 "What does the worker gain from his toil?" \u2014 After the poetry, the Teacher drops a bucket of cold water. If everything has its appointed time and you can't control the timing, then what's the point of effort? This is a genuine question, not a rhetorical device \u2014 and the Teacher will spend the rest of the chapter wrestling with it. Don't rush past the discomfort. He's earned the right to ask.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 10, text:
  `Ecclesiastes 3:10 \u2014 "I have seen the burden that God has laid upon the sons of men to occupy them." \u2014 The word for "burden" (inyan) means a preoccupation, a task that consumes you. God has given humanity work to do, but the Teacher frames it as a burden, not a gift. He's not being ungrateful \u2014 he's being honest about what it feels like to labor under conditions you didn't choose, toward outcomes you can't guarantee.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 11, text:
  `Ecclesiastes 3:11 \u2014 "He has made everything beautiful in its time. He has also set eternity in the hearts of men, yet they cannot fathom the work that God has done from beginning to end." \u2014 This is arguably the most profound verse in Ecclesiastes. God makes things beautiful \u2014 but only in their time, not necessarily in yours. And he's placed eternity in your heart \u2014 a sense that there must be more \u2014 while simultaneously making the full picture incomprehensible. You're wired to ask questions you can't answer. That's not a design flaw; it's the design.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 12, text:
  `Ecclesiastes 3:12 \u2014 "I know that there is nothing better for them than to rejoice and do good while they live," \u2014 After the existential vertigo of verse 11, the Teacher lands on something startlingly simple: enjoy your life and do good. This isn't shallow optimism \u2014 it's the hard-won conclusion of someone who has stared into the void and decided to eat dinner anyway. Rejoicing and doing good are presented as the best available response to the mystery of existence.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 13, text:
  `Ecclesiastes 3:13 \u2014 "and also that every man should eat and drink and find satisfaction in all his labor\u2014this is the gift of God." \u2014 The ability to enjoy a meal, a drink, and the work of your hands is not a human achievement \u2014 it's a divine gift. The Teacher says this without irony. In a book full of "vanity" and "meaninglessness," the capacity for simple pleasure is identified as something God gives. If you can sit down to dinner tonight and genuinely enjoy it, that's grace.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 14, text:
  `Ecclesiastes 3:14 \u2014 "I know that everything God does endures forever; nothing can be added to it or taken from it. God does it so that they should fear Him." \u2014 God's work is complete and unalterable. Humans tinker, iterate, and revise; God doesn't. The purpose of this permanence is reverence \u2014 "fear" in the sense of standing before something so much larger than yourself that your instinct is awe, not analysis. The Teacher is saying: the incomprehensibility of God's work isn't a problem to solve. It's the appropriate posture for a creature.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 15, text:
  `Ecclesiastes 3:15 \u2014 "What exists has already been, and what will be has already been, for God will call to account what has passed." \u2014 This sounds like fatalism, but the Teacher is making a different point. The cyclical nature of life \u2014 nothing truly new under the sun \u2014 means that God is already familiar with whatever you're facing. The final phrase, "God will call to account what has passed," adds accountability to the cycle. History repeats, but it isn't unobserved.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 16, text:
  `Ecclesiastes 3:16 \u2014 "Furthermore, I saw under the sun that in the place of judgment there is wickedness, and in the place of righteousness there is wickedness." \u2014 The Teacher turns his gaze to the courtroom \u2014 the one place that should be reliable \u2014 and finds corruption there too. This is not cynicism; it's observation. When the institutions designed to enforce justice are themselves unjust, the existential crisis deepens. If you can't trust the courts, what can you trust?`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 17, text:
  `Ecclesiastes 3:17 \u2014 "I said in my heart, 'God will judge the righteous and the wicked, since there is a time for every activity and every deed.'" \u2014 The Teacher's own poem comes back to comfort him. If there's a time for everything, there must be a time for judgment \u2014 a time when the crooked courts are overruled by a judge who can't be bribed. He says this "in his heart" \u2014 it's a private act of faith, not a public declaration. Sometimes faith sounds like a whispered reassurance to yourself.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 18, text:
  `Ecclesiastes 3:18 \u2014 "I said to myself, 'As for the sons of men, God tests them so that they may see for themselves that they are but beasts.'" \u2014 This is the Teacher at his most brutally honest. Strip away pretension and look at humanity from a distance: we eat, sleep, fight, reproduce, and die. Just like animals. God allows this clear-eyed view not to degrade humans but to demolish human arrogance. You cannot begin to appreciate grace until you've accepted how little you're owed.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 19, text:
  `Ecclesiastes 3:19 \u2014 "For the fates of both men and beasts are the same: As one dies, so dies the other\u2014they all have the same breath. Man has no advantage over the animals, since everything is futile." \u2014 The Teacher pushes further into the discomfort. Same breath (ruach), same death, same dirt. From a purely observational standpoint \u2014 which is all the Teacher claims to have \u2014 there's no visible evidence of human superiority. This isn't atheism; it's the honest admission that faith requires believing in something you can't see from ground level.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 20, text:
  `Ecclesiastes 3:20 \u2014 "All go to one place; all come from dust, and all return to dust." \u2014 An echo of Genesis 3:19, where God tells Adam he'll return to the ground he was taken from. The Teacher collapses the distance between the king and the field mouse: same origin, same destination. This verse sits at the bottom of the chapter's emotional arc, and the Teacher lets it sit there. No silver lining. No rescue. Just dust.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 21, text:
  `Ecclesiastes 3:21 \u2014 "Who knows if the spirit of man rises upward and the spirit of the animal descends into the earth?" \u2014 The Teacher asks the question that every funeral forces on us: what happens after? He doesn't answer it. He can't \u2014 not from observation alone. Later biblical revelation (Daniel 12:2, the resurrection of Jesus) will provide answers the Teacher doesn't have access to. His honesty about what he doesn't know is as valuable as other writers' certainty about what they do.`
});

commentary.push({ book_id: "ECC", chapter: 3, verse: 22, text:
  `Ecclesiastes 3:22 \u2014 "I have seen that there is nothing better for a man than to enjoy his work, because that is his lot. For who can bring him to see what will come after him?" \u2014 The chapter ends where the Teacher always lands: back at the table, back at the work, back at the present moment. Since you can't see what comes after, pour yourself into what's in front of you. This isn't resignation \u2014 it's the Teacher's version of faithfulness. Do the work. Enjoy what you can. Leave the rest to God. It's not much of an answer, but it might be the only honest one available under the sun.`
});

// ============================================================================
// JEREMIAH 29  (32 verses)
// ============================================================================

commentary.push({ book_id: "JER", chapter: 29, verse: 1, text:
  `Jeremiah 29:1 \u2014 "This is the text of the letter that Jeremiah the prophet sent from Jerusalem to the surviving elders among the exiles and to the priests, the prophets, and all the others Nebuchadnezzar had carried into exile from Jerusalem to Babylon." \u2014 This is a letter, not a sermon. Jeremiah is writing to real people in a real crisis \u2014 Jewish exiles forcibly relocated to Babylon around 597 BC. These aren't tourists; they're prisoners of war trying to figure out if God has abandoned them. The letter format matters: this is personal communication to people in pain.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 2, text:
  `Jeremiah 29:2 \u2014 "(This was after King Jeconiah, the queen mother, the court officials, the officials of Judah and Jerusalem, the craftsmen, and the metalsmiths had been exiled from Jerusalem.)" \u2014 The parenthetical gives the historical anchor: the deportation of 597 BC, when Nebuchadnezzar took the upper class \u2014 royalty, government officials, and skilled workers \u2014 leaving behind the poor and unskilled. The exiles Jeremiah is writing to are the educated elite, which makes his message even more countercultural: settle down, stop expecting a quick rescue.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 3, text:
  `Jeremiah 29:3 \u2014 "The letter was entrusted to Elasah son of Shaphan and Gemariah son of Hilkiah, whom Zedekiah king of Judah sent to King Nebuchadnezzar in Babylon. It stated:" \u2014 Jeremiah piggybacked his letter on a diplomatic mission. Elasah and Gemariah were traveling to Babylon on official business for King Zedekiah, and Jeremiah slipped his correspondence into their pouch. These named couriers matter \u2014 they were real people bearing a message that would have been politically dangerous for everyone involved.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 4, text:
  `Jeremiah 29:4 \u2014 "This is what the LORD of Hosts, the God of Israel, says to all the exiles who were carried away from Jerusalem to Babylon:" \u2014 "LORD of Hosts" (Yahweh Tseva'ot) \u2014 the God who commands armies \u2014 is writing to people who just lost a war. The title isn't accidental. The God who could have prevented the exile is the same God now sending instructions to the exiles. He's not explaining why it happened; he's telling them what to do next.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 5, text:
  `Jeremiah 29:5 \u2014 "Build houses and settle down. Plant gardens and eat their produce." \u2014 This would have been infuriating to hear. The exiles wanted to go home. False prophets were telling them the exile would be short. And here comes Jeremiah saying: build houses. Plant gardens. In other words, this isn't temporary \u2014 invest in where you are. For people who believed God's promises were tied to a specific piece of land, this instruction required a complete theological reorientation.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 6, text:
  `Jeremiah 29:6 \u2014 "Take wives and have sons and daughters. Take wives for your sons and give your daughters in marriage, so that they too may have sons and daughters. Multiply there; do not decrease." \u2014 God tells the exiles to plan for grandchildren. The math is telling: if your grandchildren are getting married, you're looking at a multi-generational timeline. This isn't a two-year inconvenience; it's a seventy-year reality. "Do not decrease" is an echo of the original creation mandate in Genesis \u2014 even in exile, God's people are supposed to flourish.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 7, text:
  `Jeremiah 29:7 \u2014 "Seek the prosperity of the city to which I have sent you as exiles. Pray to the LORD on its behalf, for if it prospers, you too will prosper." \u2014 This is one of the most radical verses in the Old Testament. God tells his people to pray for Babylon \u2014 the empire that destroyed their temple and dragged them from their homes. Your enemy's well-being is now linked to your own. This demolishes the option of sulking in a corner waiting for rescue. Wherever God has placed you, invest there.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 8, text:
  `Jeremiah 29:8 \u2014 "For this is what the LORD of Hosts, the God of Israel, says: 'Do not be deceived by the prophets and diviners among you, and do not listen to the dreams you elicit from them.'" \u2014 False prophets were telling the exiles what they wanted to hear: this will be over soon, God's going to reverse this any day now. God's warning through Jeremiah is blunt \u2014 those voices are lying. The phrase "dreams you elicit" suggests the exiles were actively seeking out optimistic prophecies, shopping for the answer they preferred.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 9, text:
  `Jeremiah 29:9 \u2014 "For they are falsely prophesying to you in My name; I have not sent them, declares the LORD." \u2014 "In My name" is the critical phrase. These weren't obviously pagan prophets \u2014 they were claiming to speak for Yahweh. The exiles had no easy way to distinguish true prophecy from false. Jeremiah's test is simple but brutal: the true word from God is the one you don't want to hear. The false prophets promised rescue; the true prophet demanded patience.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 10, text:
  `Jeremiah 29:10 \u2014 "For this is what the LORD says: 'When Babylon's seventy years are complete, I will attend to you and confirm My promise to restore you to this place.'" \u2014 Seventy years. Not seventy days or seventy months. An entire human lifetime. Most of the people reading this letter would die in Babylon. The promise of restoration is real, but it's for their grandchildren, not for them. This is what makes verse 11 \u2014 which comes next \u2014 so much more costly than a greeting card suggests.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 11, text:
  `Jeremiah 29:11 \u2014 "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, to give you a future and a hope." \u2014 This is the most context-stripped verse in the Bible. It's on coffee mugs, dorm room posters, and graduation cards as if it's a blank-check promise of personal success. It is not. God is speaking to a community of war refugees who will spend their entire lives in exile. The "future and hope" is for their descendants, seventy years out. The promise is real and beautiful \u2014 but it's a promise that requires trusting God across a timeline that exceeds your own lifespan. That's not comforting in the shallow sense. It's comforting in the deepest possible sense: God's plans are bigger than your biography.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 12, text:
  `Jeremiah 29:12 \u2014 "Then you will call upon Me and come and pray to Me, and I will listen to you." \u2014 "Then" \u2014 after the seventy years, after the waiting, after the faithfulness in exile. Prayer isn't presented as a shortcut to change God's timeline; it's presented as the appropriate response when the timeline is complete. The promise that God will listen is radical for people who must have wondered if God had gone deaf. He hasn't. The line is open. The timeline is just longer than you'd like.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 13, text:
  `Jeremiah 29:13 \u2014 "You will seek Me and find Me when you search for Me with all your heart." \u2014 The condition is "all your heart" \u2014 not casual interest, not half-hearted inquiry, not God-as-backup-plan. This echoes Deuteronomy 4:29, which made the same promise in the same context: if you find yourself in exile and you seek God with everything you have, you'll find him. The verse assumes that finding God requires effort and sincerity, not just religious routine.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 14, text:
  `Jeremiah 29:14 \u2014 "I will be found by you, declares the LORD, and I will restore you from captivity and gather you from all the nations and places to which I have banished you, declares the LORD. I will restore you to the place from which I sent you into exile." \u2014 God takes ownership of the exile: "I sent you." This isn't random historical misfortune \u2014 it's discipline with a return ticket. The gathering from "all the nations" anticipates a scattering even wider than Babylon, which is exactly what happened in subsequent centuries. The promise of restoration is specific: back to the land, back to the place. Geography matters to God.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 15, text:
  `Jeremiah 29:15 \u2014 "Because you may say, 'The LORD has raised up for us prophets in Babylon,'" \u2014 The exiles were apparently pointing to their own prophets in Babylon as evidence that God was still actively speaking to them there \u2014 and that those prophets' optimistic timelines should be trusted. Jeremiah is about to dismantle that argument. Having prophets doesn't mean having true prophets.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 16, text:
  `Jeremiah 29:16 \u2014 "this is what the LORD says about the king who sits on David's throne and all the people who remain in this city, your brothers who did not go with you into exile\u2014" \u2014 God now addresses those left behind in Jerusalem \u2014 the ones the exiles might have envied. Staying in Jerusalem wasn't the good outcome; it was the worse one. The exiles may have felt abandoned, but they were actually the preserved remnant. Sometimes the harder road is the mercy.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 17, text:
  `Jeremiah 29:17 \u2014 "this is what the LORD of Hosts says: 'I will send against them sword and famine and plague, and I will make them like rotten figs, so bad they cannot be eaten.'" \u2014 The rotten fig metaphor comes from Jeremiah 24, where God showed the prophet two baskets of figs \u2014 good figs representing the exiles and rotten figs representing those left in Jerusalem. The people the exiles envied are now described as inedible. God's assessment of your situation may be the exact opposite of your own.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 18, text:
  `Jeremiah 29:18 \u2014 "I will pursue them with sword and famine and plague. I will make them a horror to all the kingdoms of the earth\u2014a curse, a desolation, and an object of scorn and reproach among all the nations to which I banish them." \u2014 The language is relentless: horror, curse, desolation, scorn, reproach. This is what awaits those who stayed in Jerusalem and refused to submit to Babylon \u2014 the very thing Jeremiah had been telling them to do for years. Disobedience didn't just affect Israel; it made them a cautionary tale for every nation watching.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 19, text:
  `Jeremiah 29:19 \u2014 "I will do this because they have not listened to My words, declares the LORD, which I sent to them again and again through My servants the prophets. And neither have you exiles listened, declares the LORD." \u2014 The last sentence is a gut punch. Jeremiah pivots mid-verse from condemning Jerusalem to confronting the exiles themselves: you're not off the hook either. God's patience in sending prophets "again and again" highlights both his persistence and their stubbornness. The exile isn't a random disaster \u2014 it's the consequence of decades of ignored warnings.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 20, text:
  `Jeremiah 29:20 \u2014 "So hear the word of the LORD, all you exiles I have sent away from Jerusalem to Babylon." \u2014 Again, God says "I have sent" \u2014 he takes responsibility for the exile as an act of divine discipline, not Babylonian imperialism. The command to "hear" (shema) is the fundamental demand of the Old Testament, going back to Deuteronomy 6:4. After cataloging everyone who failed to listen, God gives yet another chance. His patience is stunning.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 21, text:
  `Jeremiah 29:21 \u2014 "This is what the LORD of Hosts, the God of Israel, says about Ahab son of Kolaiah and Zedekiah son of Maaseiah, who are prophesying to you lies in My name: 'I will deliver them to Nebuchadnezzar king of Babylon, and he will kill them before your very eyes.'" \u2014 Jeremiah names names. Ahab and Zedekiah (not the king \u2014 different Zedekiah) were specific false prophets operating among the exiles, giving them hope based on lies. God's judgment on false prophets is severe because the damage they do is severe \u2014 false hope in a crisis can be more destructive than honest despair.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 22, text:
  `Jeremiah 29:22 \u2014 "Because of them, all the exiles of Judah who are in Babylon will use this curse: 'May the LORD make you like Zedekiah and Ahab, whom the king of Babylon roasted in the fire!'" \u2014 "Roasted in the fire" \u2014 execution by burning was a known Babylonian punishment. These false prophets would become so infamous that their names would enter the language as a curse formula. When you mislead people in God's name, you don't just face consequences \u2014 you become a cautionary tale that outlives you.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 23, text:
  `Jeremiah 29:23 \u2014 "For they have committed an outrage in Israel by committing adultery with the wives of their neighbors and speaking lies in My name, which I did not command them to do. I am He who knows, and I am a witness, declares the LORD." \u2014 The false prophets weren't just theologically wrong \u2014 they were morally corrupt, using their spiritual authority to exploit people sexually. This pattern \u2014 charismatic religious leader using position for personal gratification \u2014 is as old as organized religion and as current as tomorrow's headlines. God positions himself as both the one who knows and the witness who will testify.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 24, text:
  `Jeremiah 29:24 \u2014 "You are to tell Shemaiah the Nehelamite that" \u2014 A new character enters: Shemaiah, another false prophet in Babylon. The chapter shifts to a specific conflict between Jeremiah and Shemaiah, showing that the battle between true and false prophecy wasn't abstract \u2014 it was personal, with names and addresses. Shemaiah had apparently been working to undermine Jeremiah's authority from Babylon.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 25, text:
  `Jeremiah 29:25 \u2014 "this is what the LORD of Hosts, the God of Israel, says: 'In your own name you have sent out letters to all the people of Jerusalem, to the priest Zephaniah son of Maaseiah, and to all the priests. You said to Zephaniah:'" \u2014 Shemaiah had been conducting his own letter-writing campaign \u2014 a counter-offensive against Jeremiah's letter. He wrote to Jerusalem's religious establishment, trying to get Jeremiah arrested. The detail that he wrote "in your own name" (not God's) may indicate either honesty or that even Shemaiah knew he couldn't claim divine backing for this particular maneuver.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 26, text:
  `Jeremiah 29:26 \u2014 "'The LORD has appointed you priest in place of Jehoiada, to be the chief officer in the house of the LORD, responsible for any madman who acts like a prophet\u2014you must put him in stocks and neck irons.'" \u2014 Shemaiah calls Jeremiah a "madman" (meshugga) and demands he be locked up. The temple had an official responsible for controlling disruptive prophets \u2014 a "bouncer for prophets," essentially. Shemaiah is weaponizing institutional authority against a genuine prophet, a pattern that didn't end with the Old Testament.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 27, text:
  `Jeremiah 29:27 \u2014 "So now, why have you not rebuked Jeremiah of Anathoth, who poses as a prophet among you?" \u2014 "Poses as a prophet" \u2014 Shemaiah frames Jeremiah as a fraud. From Babylon, he's pressuring Jerusalem's priests to silence the one voice telling the truth. The irony is thick: the false prophet is accusing the true prophet of being false. Identifying which is which has always been the hardest task in religious life.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 28, text:
  `Jeremiah 29:28 \u2014 "For he has sent to us in Babylon, claiming: Since the exile will be lengthy, build houses and settle down; plant gardens and eat their produce.'" \u2014 Shemaiah quotes Jeremiah's own letter back at the Jerusalem priests as evidence of his madness. The message that the exile would be lengthy was exactly what nobody wanted to hear. The true prophet's message was used as the prosecution's exhibit A. Truth has never been a defense against the charge of being unwelcome.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 29, text:
  `Jeremiah 29:29 \u2014 "(Zephaniah the priest, however, had read this letter to Jeremiah the prophet.)" \u2014 A quiet act of decency in a hostile story. Zephaniah, the priest Shemaiah tried to weaponize against Jeremiah, instead showed Jeremiah the letter. We don't know Zephaniah's motives \u2014 maybe sympathy, maybe just protocol \u2014 but the result was that the conspiracy was exposed. Sometimes faithfulness looks like a minor official doing the right thing when no one is watching.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 30, text:
  `Jeremiah 29:30 \u2014 "Then the word of the LORD came to Jeremiah:" \u2014 The standard prophetic formula, but after the drama of Shemaiah's conspiracy, it carries extra weight. God doesn't leave Jeremiah to fight his battles alone. When the institutional power structure aligns against the true prophet, God speaks again. The response to opposition is not silence but another word from the Lord.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 31, text:
  `Jeremiah 29:31 \u2014 "'Send a message telling all the exiles what the LORD says concerning Shemaiah the Nehelamite. Because Shemaiah has prophesied to you\u2014though I did not send him\u2014and has made you trust in a lie,'" \u2014 "Though I did not send him" is the defining mark of false prophecy: unauthorized speech presented as divine revelation. The damage isn't just that Shemaiah lied \u2014 it's that he "made you trust in a lie." False hope built on false prophecy sets people up for a harder crash than honest grief would have caused.`
});

commentary.push({ book_id: "JER", chapter: 29, verse: 32, text:
  `Jeremiah 29:32 \u2014 "this is what the LORD says: 'I will surely punish Shemaiah the Nehelamite and his descendants. He will have no one left among this people, nor will he see the good that I will bring to My people, declares the LORD, for he has preached rebellion against the LORD.'" \u2014 The punishment fits the crime with devastating precision. Shemaiah told the exiles they'd see restoration soon \u2014 so God says Shemaiah himself will never see the restoration. He preached rebellion, so his line is cut off. The chapter ends with a reminder that God's good plans (from verse 11) will come to pass, but not everyone will be around to see them. False prophets forfeit the very future they falsely promised.`
});

// ============================================================================
// DANIEL 3  (30 verses)
// ============================================================================

commentary.push({ book_id: "DAN", chapter: 3, verse: 1, text:
  `Daniel 3:1 \u2014 "King Nebuchadnezzar made a golden statue sixty cubits high and six cubits wide, and he set it up on the plain of Dura in the province of Babylon." \u2014 Sixty cubits is roughly 90 feet \u2014 a nine-story building made of gold, standing in a flat plain where it would dominate the horizon from every direction. The proportions (10:1 height to width) suggest it was an obelisk or pillar rather than a human figure. This is state power made visible: look at what I built, and know who's in charge.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 2, text:
  `Daniel 3:2 \u2014 "Then King Nebuchadnezzar sent word to assemble the satraps, prefects, governors, advisers, treasurers, judges, magistrates, and all the other officials of the provinces to attend the dedication of the statue he had set up." \u2014 The guest list reads like a government org chart \u2014 every level of imperial bureaucracy summoned to one location. This isn't a religious ceremony; it's a loyalty test. Nebuchadnezzar is requiring every official in his empire to publicly demonstrate allegiance. Attendance isn't optional.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 3, text:
  `Daniel 3:3 \u2014 "So the satraps, prefects, governors, advisers, treasurers, judges, magistrates, and all the rulers of the provinces assembled for the dedication of the statue that King Nebuchadnezzar had set up, and they stood before it." \u2014 The repetition of every single title is deliberate \u2014 it emphasizes the total, comprehensive nature of the compliance. Everyone came. Everyone stood. The narrator is building the pressure before introducing the three men who didn't bow.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 4, text:
  `Daniel 3:4 \u2014 "Then the herald loudly proclaimed, 'O people of every nation and language, this is what you are commanded:'" \u2014 "Every nation and language" \u2014 the Babylonian empire was multiethnic and multilingual, and this decree cuts across all of it. No exemptions for cultural difference, religious tradition, or personal conviction. The word "commanded" leaves no room for negotiation. This is the voice of empire: you will comply, regardless of who you are or what you believe.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 5, text:
  `Daniel 3:5 \u2014 "As soon as you hear the sound of the horn, flute, zither, lyre, harp, pipes, and all kinds of music, you must fall down and worship the golden statue that King Nebuchadnezzar has set up." \u2014 The list of instruments is another example of the narrator's deliberate repetition \u2014 it becomes almost comedic in its thoroughness. But the mechanism is chilling: music as trigger for compelled worship. The sensory experience is designed to override individual conscience. When the music plays, everyone drops. No thinking required.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 6, text:
  `Daniel 3:6 \u2014 "And whoever does not fall down and worship will immediately be thrown into the blazing fiery furnace." \u2014 The consequence is immediate and absolute. Not a trial, not an appeal \u2014 instant execution by fire. Industrial furnaces in ancient Babylon were real; they were used in brick-making and metalwork and could reach extreme temperatures. Nebuchadnezzar isn't making an empty threat. The cost of non-compliance is death, and everyone knows it.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 7, text:
  `Daniel 3:7 \u2014 "Therefore, as soon as all the people heard the sound of the horn, flute, zither, lyre, harp, and all kinds of music, the people of every nation and language would fall down and worship the golden statue that King Nebuchadnezzar had set up." \u2014 "All the people" bowed. The compliance was total \u2014 which is what makes the next scene possible. You can only identify the people standing when everyone else is on the ground. The three Hebrew men didn't make a speech or stage a protest; they simply remained upright while the entire plain of Dura went flat.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 8, text:
  `Daniel 3:8 \u2014 "At this time some astrologers came forward and maliciously accused the Jews," \u2014 The Aramaic phrase translated "maliciously accused" literally means "ate their pieces" \u2014 a vivid idiom for slander. These astrologers had professional reasons to resent the Jewish exiles who had been promoted in Daniel 2. This isn't righteous concern for the king's decree; it's workplace politics weaponized through religious compliance. Jealousy found an acceptable channel.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 9, text:
  `Daniel 3:9 \u2014 "saying to King Nebuchadnezzar, 'O king, may you live forever!'" \u2014 The standard court greeting, dripping with flattery. "May you live forever" is what you say to someone who controls whether you live at all. The astrologers know exactly how to approach the king \u2014 with deference, with protocol, with the right amount of obsequiousness. The setup before the accusation is as calculated as the accusation itself.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 10, text:
  `Daniel 3:10 \u2014 "You, O king, have issued a decree that everyone who hears the sound of the horn, flute, zither, lyre, harp, pipes, and all kinds of music must fall down and worship the golden statue," \u2014 The accusers repeat the decree back to the king, making sure he remembers that this was his idea and his authority on the line. They're not just reporting a violation; they're reminding Nebuchadnezzar that his credibility depends on enforcement. If exceptions are allowed, the decree means nothing.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 11, text:
  `Daniel 3:11 \u2014 "and that whoever does not fall down and worship will be thrown into the blazing fiery furnace." \u2014 The accusers make sure the death penalty clause is front of mind before naming the accused. They're building a legal cage: you said this, you promised this consequence, now here are the violators. The structure of their argument leaves Nebuchadnezzar no room to show mercy without appearing weak.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 12, text:
  `Daniel 3:12 \u2014 "But there are some Jews you have appointed to manage the province of Babylon\u2014Shadrach, Meshach, and Abednego\u2014who have ignored you, O king, and have refused to serve your gods or worship the golden statue you have set up." \u2014 Three details designed to maximize the king's rage: (1) they're Jews \u2014 foreigners, (2) you promoted them \u2014 they owe you, (3) they've ignored you \u2014 it's personal. The accusation escalates from religious non-compliance to personal disrespect. Notice Daniel's absence \u2014 he's not mentioned in this chapter, possibly because his position was too senior to be present at this particular assembly.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 13, text:
  `Daniel 3:13 \u2014 "Then Nebuchadnezzar, furious with rage, summoned Shadrach, Meshach, and Abednego. So these men were brought before the king," \u2014 "Furious with rage" \u2014 the Aramaic doubles the intensity. This isn't mild irritation; it's the volcanic anger of an absolute monarch whose authority has been publicly defied. And yet, he summons them. He doesn't execute them immediately, which the decree technically required. Something \u2014 perhaps the memory of Daniel's service, perhaps curiosity \u2014 makes him want to hear them out.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 14, text:
  `Daniel 3:14 \u2014 "and Nebuchadnezzar said to them, 'Shadrach, Meshach, and Abednego, is it true that you do not serve my gods or worship the golden statue I have set up?'" \u2014 The question gives them an out. Nebuchadnezzar is essentially saying: tell me this is a misunderstanding. He's offering them a chance to recant before witnesses, which would save face for everyone. The king who could have killed them on the spot is instead giving them a second chance. Even rage has room for pragmatism.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 15, text:
  `Daniel 3:15 \u2014 "Now, if you are ready, as soon as you hear the sound of the horn, flute, zither, lyre, harp, pipes, and all kinds of music, you must fall down and worship the statue I have made. But if you refuse to worship, you will be thrown at once into the blazing fiery furnace. Then what god will be able to deliver you from my hands?" \u2014 The final sentence is the real challenge: "What god will be able to deliver you from my hands?" Nebuchadnezzar isn't just enforcing a decree \u2014 he's asserting that his power exceeds any god's. It's a direct theological challenge, and the three men hear it as such. Their response addresses the god question, not the legal one.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 16, text:
  `Daniel 3:16 \u2014 "Shadrach, Meshach, and Abednego replied to the king, 'O Nebuchadnezzar, we have no need to answer you in this matter.'" \u2014 This is either breathtaking courage or suicidal arrogance \u2014 and the difference depends entirely on whether their God is real. "We have no need to answer" isn't rudeness; it's clarity. The question of whether to bow has already been settled. There's nothing to discuss, negotiate, or deliberate. Some decisions are made long before the moment of testing arrives.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 17, text:
  `Daniel 3:17 \u2014 "If the God whom we serve exists, then He is able to deliver us from the blazing fiery furnace and from your hand, O king." \u2014 "If the God whom we serve exists" \u2014 some translations render this as "if it be so" (meaning, if we're thrown in), but the Aramaic carries a genuine conditional: if our God is real, he can save us. This is not doubt; it's honest theology. They're not claiming certainty about the outcome. They're affirming God's capability while leaving the decision to him.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 18, text:
  `Daniel 3:18 \u2014 "But even if He does not, let it be known to you, O king, that we will not serve your gods or worship the golden statue you have set up." \u2014 This is the theological summit of the chapter and one of the most important sentences in the Bible. "But even if He does not." Their faith doesn't depend on being rescued. They'll serve God whether he saves them or lets them burn. This separates genuine faith from transactional religion. Most people serve God because of what he does for them; these three serve God because of who he is. Period.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 19, text:
  `Daniel 3:19 \u2014 "At this, Nebuchadnezzar was filled with rage, and the expression on his face changed toward Shadrach, Meshach, and Abednego. He gave orders to heat the furnace seven times hotter than usual," \u2014 His face literally changed \u2014 the Aramaic suggests his features contorted. "Seven times hotter" is probably hyperbolic, but the intent is clear: maximum punishment, beyond what the crime required. Rage doesn't calculate proportional responses. The overkill reveals that Nebuchadnezzar feels personally threatened, not just disobeyed.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 20, text:
  `Daniel 3:20 \u2014 "and he commanded some mighty men of valor in his army to tie up Shadrach, Meshach, and Abednego and throw them into the blazing fiery furnace." \u2014 "Mighty men of valor" \u2014 Nebuchadnezzar sends his best soldiers, not ordinary guards. Three bound men being thrown into a furnace don't require elite troops. The king is performing power, making a spectacle of the execution. Every detail is designed to demonstrate that resistance to the empire ends this way.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 21, text:
  `Daniel 3:21 \u2014 "So they were tied up, wearing robes, trousers, turbans, and other clothes, and they were thrown into the blazing fiery furnace." \u2014 The clothing detail seems odd until you reach verse 27, where their clothes are unburned. The narrator is cataloging exactly what went in so you'll know exactly what survived. These were their official court garments \u2014 the uniforms of Babylonian government service. They're being thrown into the fire dressed as loyal subjects of the empire that's killing them.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 22, text:
  `Daniel 3:22 \u2014 "The king's command was so urgent and the furnace so hot that the fiery flames killed the men who carried up Shadrach, Meshach, and Abednego." \u2014 The executioners die. The men ordered to carry out the king's rage become its first victims. This detail serves two purposes: it establishes that the heat was genuinely lethal (no one can claim the furnace wasn't hot enough), and it demonstrates the collateral damage of tyrannical anger. Nebuchadnezzar's rage killed his own soldiers.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 23, text:
  `Daniel 3:23 \u2014 "And these three men, Shadrach, Meshach, and Abednego, firmly bound, fell into the blazing fiery furnace." \u2014 "Firmly bound" and "fell into" \u2014 they were helpless. No escape plan, no hidden fireproofing, no last-minute rescue before they hit the flames. They actually went into the fire. Whatever happens next, it happens inside the furnace, not instead of it. God's deliverance in this story doesn't come by preventing the trial but by being present in it.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 24, text:
  `Daniel 3:24 \u2014 "Suddenly King Nebuchadnezzar jumped up in amazement and asked his advisers, 'Did we not throw three men, firmly bound, into the fire?' 'Certainly, O king,' they replied." \u2014 The most powerful man in the world jumps out of his seat. Whatever he's seeing through the furnace opening has overridden his rage with astonishment. His question is almost comically careful \u2014 he's checking the count. Three in, right? You're sure? Because what he's about to say next doesn't add up.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 25, text:
  `Daniel 3:25 \u2014 "'Look!' he exclaimed. 'I see four men, unbound and unharmed, walking around in the fire\u2014and the fourth looks like a son of the gods!'" \u2014 Three became four. Bound became unbound. Falling became walking. Everything reversed inside the furnace. The identity of the fourth figure has been debated for millennia \u2014 an angel, a theophany, a pre-incarnate appearance of Christ. Nebuchadnezzar, a pagan king, calls him "a son of the gods" using his own theological framework. He doesn't have the right vocabulary, but he knows what he's seeing isn't human.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 26, text:
  `Daniel 3:26 \u2014 "Then Nebuchadnezzar approached the door of the blazing fiery furnace and called out, 'Shadrach, Meshach, and Abednego, servants of the Most High God, come out!' So Shadrach, Meshach, and Abednego came out of the fire," \u2014 The king who challenged "what god can deliver you" now calls their God "Most High" \u2014 the supreme deity. Nebuchadnezzar has to walk up to the door of the furnace that killed his own soldiers. He calls them by name and adds a title he didn't use before: servants of the Most High God. The furnace changed his vocabulary.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 27, text:
  `Daniel 3:27 \u2014 "and when the satraps, prefects, governors, and royal advisers had gathered around, they saw that the fire had no effect on the bodies of these men. Not a hair of their heads was singed, their robes were unaffected, and there was no smell of fire on them." \u2014 The same officials who witnessed the loyalty test now witness the acquittal. The details are forensic: no burns, no singed hair, no smoke smell, clothes intact. The fire consumed their ropes but didn't touch them. The thoroughness of the inspection \u2014 by the empire's own officials \u2014 makes the miracle undeniable. The furnace took only what bound them.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 28, text:
  `Daniel 3:28 \u2014 "Nebuchadnezzar declared, 'Blessed be the God of Shadrach, Meshach, and Abednego, who has sent His angel and delivered His servants who trusted in Him. They violated the king's command and risked their lives rather than serve or worship any god except their own God.'" \u2014 Nebuchadnezzar's praise is genuine but notice what he highlights: they violated the king's command. He's admiring their disobedience to him. A man who demanded total allegiance is now publicly praising people who refused to give it. He calls their defiance "trust" \u2014 which is exactly what it was.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 29, text:
  `Daniel 3:29 \u2014 "Therefore I decree that the people of any nation or language who say anything offensive against the God of Shadrach, Meshach, and Abednego will be cut into pieces and their houses reduced to rubble. For there is no other god who can deliver in this way." \u2014 Nebuchadnezzar responds the only way he knows: with another decree. He can't help being an imperial ruler \u2014 his conversion of awe into legislation is almost endearing. The threat of violence to enforce respect for God is ironic but honest: he understands power, and what he just saw was power beyond anything in his arsenal.`
});

commentary.push({ book_id: "DAN", chapter: 3, verse: 30, text:
  `Daniel 3:30 \u2014 "Then the king promoted Shadrach, Meshach, and Abednego in the province of Babylon." \u2014 The chapter ends with a one-sentence epilogue: promotion. The men who refused to bow end up higher than they started. This isn't a universal promise \u2014 faithfulness doesn't always lead to earthly promotion, as the rest of Daniel and the martyrdom traditions make clear. But in this story, the empire that tried to destroy them ends up elevating them. The furnace was meant to be the end of their careers; it became the making of them.`
});

// ============================================================================
// INSERT INTO DATABASE
// ============================================================================

const insertMany = db.transaction((entries) => {
  for (const entry of entries) {
    insert.run(entry.book_id, entry.chapter, entry.verse, entry.text);
  }
});

insertMany(commentary);

// Verify
const counts = db.prepare(
  `SELECT book_id, chapter, COUNT(*) as cnt
   FROM commentary_entries
   WHERE source_id = 'selah-ai'
     AND book_id IN ('PRO','ECC','JER','DAN')
   GROUP BY book_id, chapter
   ORDER BY book_id, chapter`
).all();

console.log("\n=== INSERTION SUMMARY ===");
for (const row of counts) {
  const bookName = db.prepare("SELECT name FROM books WHERE id = ?").get(row.book_id).name;
  console.log(`  ${bookName} ${row.chapter}: ${row.cnt} verses`);
}

const total = db.prepare(
  `SELECT COUNT(*) as total
   FROM commentary_entries
   WHERE source_id = 'selah-ai'
     AND book_id IN ('PRO','ECC','JER','DAN')`
).get();

console.log(`\n  TOTAL: ${total.total} commentary entries inserted`);

// Spot check: verify format of a few entries
console.log("\n=== SPOT CHECKS ===");
const checks = [
  { book: "PRO", ch: 3, v: 5, label: "Proverbs 3:5 (trust in the LORD)" },
  { book: "ECC", ch: 3, v: 11, label: "Ecclesiastes 3:11 (eternity in the heart)" },
  { book: "JER", ch: 29, v: 11, label: "Jeremiah 29:11 (plans to prosper)" },
  { book: "DAN", ch: 3, v: 18, label: "Daniel 3:18 (but even if he does not)" },
];

for (const c of checks) {
  const entry = db.prepare(
    `SELECT text FROM commentary_entries
     WHERE source_id = 'selah-ai' AND book_id = ? AND chapter = ? AND verse = ?`
  ).get(c.book, c.ch, c.v);
  console.log(`\n[${c.label}]`);
  console.log(entry.text.substring(0, 120) + "...");
}

db.close();
console.log("\nDone!");
