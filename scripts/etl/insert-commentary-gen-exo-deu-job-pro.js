#!/usr/bin/env node
/**
 * Generate AI commentary for Genesis 2, Exodus 20, Deuteronomy 6, Job 38, Proverbs 31
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
// GENESIS 2  (25 verses) — Creation of Man, Eden, Creation of Woman
// ============================================================================

commentary.push({ book_id: "GEN", chapter: 2, verse: 1, text:
  `Genesis 2:1 — "Thus the heavens and the earth were completed in all their vast array." — The Hebrew word for "vast array" (tseva'am) is a military term — it means hosts, armies, organized ranks. Creation isn't a mess that sorted itself out; it's a marshaled force, every element in its assigned position. The cosmos has structure and intention behind it, and this verse is the exhale after six days of divine labor.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 2, text:
  `Genesis 2:2 — "And by the seventh day God had finished the work He had been doing; so on that day He rested from all His work." — God didn't rest because He was tired. The Hebrew word (shavat) simply means He stopped, ceased, desisted. An omnipotent Creator doesn't need a nap — He's making a point. The act of stopping is itself a creative act: it establishes rhythm, boundary, and the radical idea that productivity isn't the highest value in the universe.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 3, text:
  `Genesis 2:3 — "Then God blessed the seventh day and sanctified it, because on that day He rested from all the work of creation that He had accomplished." — This is the first thing in the Bible that God makes holy — not a place, not a person, but a day. Time itself is sanctified before anything else. Every later Sabbath command traces back here. The idea that rest is built into the fabric of creation, not bolted on as an afterthought, would have been revolutionary in the ancient Near East, where the gods created humans specifically to do the work the gods didn't want to do.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 4, text:
  `Genesis 2:4 — "This is the account of the heavens and the earth when they were created, in the day that the LORD God made them." — Here's where the camera zooms in. Chapter 1 was the wide shot — cosmic, panoramic, structured by days. Chapter 2 is the close-up, intimate and earthy. And notice the name shift: "God" (Elohim) in chapter 1 becomes "LORD God" (Yahweh Elohim) here. The personal, covenant name enters the story right when the narrative gets personal.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 5, text:
  `Genesis 2:5 — "Now no shrub of the field had yet appeared on the earth, nor had any plant of the field sprouted; for the LORD God had not yet sent rain upon the earth, and there was no man to cultivate the ground." — Two things are missing: rain and a farmer. The land is waiting for both. This sets up the whole biblical theology of partnership — God provides the rain, humanity provides the labor. Neither alone is sufficient. The earth is designed to need both divine provision and human participation.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 6, text:
  `Genesis 2:6 — "But springs welled up from the earth and watered the whole surface of the ground." — Before rain, before irrigation, the earth itself provided water from below. The Hebrew word (ed) is rare and debated — it might mean mist, spring, or underground stream. Whatever the exact meaning, the picture is of a world that was already being sustained even before the full system was in place. God was already providing before there was anyone to notice.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 7, text:
  `Genesis 2:7 — "Then the LORD God formed man from the dust of the ground and breathed the breath of life into his nostrils, and the man became a living being." — This is one of the most intimate verses in the Bible. The word "formed" (yatsar) is the same word used for a potter shaping clay. God gets His hands dirty. And then the breath — mouth to nostrils, as close as resuscitation. Humanity is dust plus divine breath. Take away either ingredient and you don't have a person. We are earthy and heavenly at the same time, which is exactly the tension the rest of the Bible will explore.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 8, text:
  `Genesis 2:8 — "And the LORD God planted a garden in Eden, in the east, where He placed the man He had formed." — God plants a garden. Not commands one into existence, not delegates it — plants it. The same hands that shaped the man now prepare his home. "Eden" means delight or pleasure. And notice: God placed the man there. Adam didn't find Eden on his own or earn his way in. He was carried to it. Grace shows up before the fall.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 9, text:
  `Genesis 2:9 — "Out of the ground the LORD God gave growth to every tree that is pleasing to the eye and good for food. And in the middle of the garden were the tree of life and the tree of the knowledge of good and evil." — The trees are both beautiful and functional — pleasing to the eye and good for food. God didn't make a utilitarian world; He made an aesthetically rich one. But in the center stand two trees that represent the only real choice in the garden: life on God's terms, or the attempt to define good and evil for yourself. Every human story since has been a variation on that same fork.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 10, text:
  `Genesis 2:10 — "Now a river flowed out of Eden to water the garden, and from there it branched into four headwaters:" — Rivers flow out of Eden, not into it. The garden is a source, not a destination. This detail matters because it frames Eden as a place of overflow and generosity — life pours out from the presence of God and spreads to water the world. Ezekiel 47 and Revelation 22 will both pick up this river-from-the-presence-of-God image, bookending the Bible with the same picture.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 11, text:
  `Genesis 2:11 — "The name of the first river is Pishon; it winds through the whole land of Havilah, where there is gold." — The Pishon is one of the great unsolved mysteries of biblical geography. Nobody knows where it was. But the text isn't trying to give you GPS coordinates — it's painting a picture of a lavish, mineral-rich world. Gold appears in the second chapter of the Bible, valued before there's any economy to spend it in. The raw materials of beauty and craft are built into creation from the start.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 12, text:
  `Genesis 2:12 — "And the gold of that land is pure, and bdellium and onyx are found there." — Bdellium is probably an aromatic resin; onyx is a gemstone. These three materials — gold, resin, and precious stone — will show up again in the construction of the tabernacle and the priestly garments. It's as if Eden is the original temple, and everything Israel later builds is an attempt to re-create what was lost. The parallels are too consistent to be accidental.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 13, text:
  `Genesis 2:13 — "The name of the second river is Gihon; it winds through the whole land of Cush." — "Gihon" is also the name of Jerusalem's primary spring, the one where Solomon was later anointed king (1 Kings 1:33). Whether this is the same location or an intentional echo, the name links Eden to the future holy city. "Cush" typically refers to the region south of Egypt. The garden's rivers reach across the known world — Eden's blessing isn't contained; it flows everywhere.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 14, text:
  `Genesis 2:14 — "The name of the third river is Hiddekel; it runs along the east side of Assyria. And the fourth river is the Euphrates." — Now we're on familiar ground. The Hiddekel is the Tigris, and the Euphrates needs no introduction. These are the rivers of Mesopotamia, the cradle of civilization. By anchoring Eden to real geography, the text insists this isn't a fairy tale in a faraway land. It happened in the real world, the world Israel's neighbors knew. And the Euphrates will later mark the boundary of the promised land (Genesis 15:18), connecting Eden to covenant.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 15, text:
  `Genesis 2:15 — "Then the LORD God took the man and placed him in the Garden of Eden to cultivate and keep it." — "Cultivate and keep" (abad and shamar) are the same two Hebrew words later used for priestly service in the tabernacle. Adam isn't just a gardener; he's a priest-king tending sacred space. Work existed before the fall — it's not a curse. The curse in chapter 3 will make work painful, but the work itself is part of the original design. Meaningful labor is a gift, not a punishment.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 16, text:
  `Genesis 2:16 — "And the LORD God commanded him, 'You may eat freely from every tree of the garden,'" — Count the ratio: every tree in the garden is a "yes." One tree is a "no." God leads with abundance, not restriction. The command starts with lavish permission. We tend to remember the prohibition in verse 17 and forget this verse, but the overwhelmingly generous default is the context for the single boundary. God is not stingy. The one limitation exists inside a world of unlimited provision.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 17, text:
  `Genesis 2:17 — "but you must not eat from the tree of the knowledge of good and evil; for in the day that you eat of it, you will surely die." — The tree's name isn't "the tree of evil." It's the tree of the knowledge of good and evil — the ability to autonomously define what's right and wrong apart from God. The prohibition isn't anti-intellectual; it's about who gets to be the moral center of the universe. "You will surely die" is literally "dying you will die" in Hebrew — an emphatic construction that covers both the immediate spiritual death and the eventual physical one. The serpent in chapter 3 will target exactly this promise.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 18, text:
  `Genesis 2:18 — "The LORD God also said, 'It is not good for the man to be alone. I will make for him a suitable helper.'" — After six repetitions of "it was good" in chapter 1, here's the first "not good" — and it's about isolation. The man is in a perfect garden with a perfect God, and something is still missing. "Helper" (ezer) is not a subordinate term. It's used most often in the Old Testament for God Himself as Israel's helper (Psalm 121:1-2). A "suitable" helper means a corresponding counterpart — someone who matches, complements, and completes.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 19, text:
  `Genesis 2:19 — "And out of the ground the LORD God formed every beast of the field and every bird of the air, and He brought them to the man to see what he would name each one. And whatever the man called each living creature, that was its name." — God brings the animals to Adam to "see what he would name each one." That phrasing — "to see" — suggests genuine curiosity, as if God is interested in what Adam will come up with. Naming in the ancient world wasn't labeling; it was an act of authority and discernment. Adam is exercising dominion, but also demonstrating that none of these creatures is his match.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 20, text:
  `Genesis 2:20 — "The man gave names to all the livestock, to the birds of the air, and to every beast of the field. But for Adam no suitable helper was found." — The naming parade has a hidden purpose: Adam needs to feel the gap before God fills it. He names lion, eagle, ox — magnificent creatures, every one — and none of them is the counterpart he needs. God could have created the woman first and skipped this process. Instead He lets the ache develop so the gift will be recognized. Sometimes God lets you feel what's missing before He provides it.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 21, text:
  `Genesis 2:21 — "So the LORD God caused the man to fall into a deep sleep, and while he slept, He took one of the man's ribs and closed up the area with flesh." — The "deep sleep" (tardemah) is the same word used when God made His covenant with Abraham in Genesis 15:12. It's not anesthesia; it's a divine act in which the human is passive and God does all the work. Adam contributes nothing to the creation of his partner — he's unconscious. The woman is entirely God's idea and God's handiwork. Adam doesn't build her, earn her, or commission her.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 22, text:
  `Genesis 2:22 — "And from the rib that the LORD God had taken from the man, He made a woman and brought her to him." — The Hebrew word for "made" here (banah) means "built." God built the woman. It's a different word than the one used for forming Adam from dust. And then God "brought her to him" — the first presentation, the first introduction. God is the one who initiates the relationship. There's something almost ceremonial about it, like a father walking his daughter down the aisle. The relationship begins with God as the matchmaker.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 23, text:
  `Genesis 2:23 — "And the man said: 'This is now bone of my bones and flesh of my flesh; she shall be called woman, for out of man she was taken.'" — These are the first recorded human words in the Bible, and they're poetry. Adam wakes up and bursts into verse. "Bone of my bones" is a superlative — the deepest possible connection. The wordplay in Hebrew is beautiful: she is ishshah (woman) because she was taken from ish (man). After naming every animal with clinical precision, Adam meets his match and can only respond with wonder.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 24, text:
  `Genesis 2:24 — "For this reason a man will leave his father and mother and be united to his wife, and they will become one flesh." — This is the narrator stepping in to draw a universal principle from a specific event. It's striking because Adam and Eve had no father and mother to leave — the instruction is for every generation after them. "One flesh" is more than physical union; it describes a new social unit, a new loyalty, a new primary allegiance. Jesus quotes this verse directly in Matthew 19:5 to ground His teaching on marriage in creation itself, before the fall, before the law.`
});

commentary.push({ book_id: "GEN", chapter: 2, verse: 25, text:
  `Genesis 2:25 — "And the man and his wife were both naked, and they were not ashamed." — The final verse of the chapter is devastating in its simplicity. Complete vulnerability, zero shame. No hiding, no performing, no self-consciousness. This is the world before sin — not just the absence of clothing but the absence of the need to protect yourself from the person closest to you. The very next chapter will shatter this, and the rest of the Bible is, in a sense, the story of getting back to this kind of openness before God and one another.`
});

// ============================================================================
// EXODUS 20  (26 verses) — The Ten Commandments
// ============================================================================

commentary.push({ book_id: "EXO", chapter: 20, verse: 1, text:
  `Exodus 20:1 — "And God spoke all these words:" — Five words in English, and they changed the world. Before this moment, Israel had experienced God through plagues, pillars of fire, and a parted sea. Now He speaks in propositions — clear, direct, moral language. This isn't mystical experience; it's covenant law. And the critical word is "all" — God spoke all these words as a unified whole. The commandments aren't a menu to pick from; they're a single package that describes what it looks like to live as God's people.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 2, text:
  `Exodus 20:2 — "'I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery.'" — The commandments don't start with a rule. They start with a relationship and a rescue. "I am the LORD your God" — identity. "Who brought you out" — history. The law is grounded in grace: God saved them before He gave them a single command. Obedience is the response to liberation, not the price of it. Every command that follows only makes sense in light of this preamble. You don't obey to get free; you obey because you already are.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 3, text:
  `Exodus 20:3 — "You shall have no other gods before Me." — "Before Me" in Hebrew (al panay) can mean "before My face" or "in My presence" — and since God is everywhere, that means there's no place where other gods are permitted. This isn't just about priority; it's about exclusivity. In the ancient Near East, everyone had a pantheon. The radical demand here is monotheistic loyalty in a polytheistic world. Israel's neighbors would have found this command not just unusual but bizarre.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 4, text:
  `Exodus 20:4 — "You shall not make for yourself an idol in the form of anything in the heavens above, on the earth below, or in the waters beneath." — This covers every zone of the ancient cosmos — sky, land, sea. Nothing in creation can represent the Creator. The prohibition isn't against art; it's against reducing God to something manageable. An image gives you the illusion of control — you can carry it, position it, decorate it. The God of Israel refuses to be domesticated. He will be encountered on His own terms or not at all.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 5, text:
  `Exodus 20:5 — "You shall not bow down to them or worship them; for I, the LORD your God, am a jealous God, visiting the iniquity of the fathers on their children to the third and fourth generations of those who hate Me," — "Jealous" (qanna) isn't petty insecurity; it's the fierce protectiveness of a committed relationship. A husband who doesn't care if his wife is with someone else doesn't love her. The generational consequence isn't about God punishing innocent grandchildren — it's an honest observation that idolatry creates a cultural current that drags families along for generations. Sin has momentum.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 6, text:
  `Exodus 20:6 — "but showing loving devotion to a thousand generations of those who love Me and keep My commandments." — Notice the math: judgment reaches three or four generations, but love reaches a thousand. God's default posture isn't wrath; it's steadfast love (chesed). The ratio is wildly asymmetric on the side of mercy. And the condition is beautifully simple — "those who love Me and keep My commandments." Love and obedience aren't separate tracks; they're the same road described from two angles.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 7, text:
  `Exodus 20:7 — "You shall not take the name of the LORD your God in vain, for the LORD will not leave anyone unpunished who takes His name in vain." — This is about far more than swearing. "Taking God's name" means bearing it — Israel carried God's name the way an ambassador carries a nation's authority. To bear that name "in vain" (lashshav) means emptily, deceptively, or worthlessly. It covers false oaths, hypocritical worship, and any claim to represent God while living in a way that misrepresents Him. It's less about what you say and more about the gap between your label and your life.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 8, text:
  `Exodus 20:8 — "Remember the Sabbath day by keeping it holy." — "Remember" implies it already existed — which it did, from Genesis 2:3. Israel isn't inventing the Sabbath; they're being told not to forget it. In Egypt, slaves don't get days off. Pharaoh's economy runs seven days a week. The Sabbath is an anti-Egypt institution: it declares that human beings are not production units. You are more than what you produce. One day in seven, you stop — and the world doesn't end. That's the point.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 9, text:
  `Exodus 20:9 — "Six days you shall labor and do all your work," — This verse is often overlooked, but it's a command too. Work is not optional — it's part of the Sabbath rhythm. Six days of honest labor make the seventh day meaningful. Rest without work is just idleness; work without rest is slavery. The Sabbath pattern sanctifies both sides. You're commanded to be productive and commanded to stop, and the genius of the rhythm is that each half protects the other.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 10, text:
  `Exodus 20:10 — "but the seventh day is a Sabbath to the LORD your God, on which you must not do any work—neither you, nor your son or daughter, nor your manservant or maidservant or livestock, nor the foreigner within your gates." — The Sabbath is radically inclusive. It covers the entire household, including servants, animals, and immigrants. You can't rest on the backs of others. This is the first labor law in history, and it protects the people with the least power. Even the ox gets a day off. The command reveals God's concern not just for worship but for the vulnerable bodies that do the work.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 11, text:
  `Exodus 20:11 — "For in six days the LORD made the heavens and the earth and the sea and all that is in them, but on the seventh day He rested. Therefore the LORD blessed the Sabbath day and set it apart as holy." — The Sabbath is anchored in creation, not just covenant. God Himself modeled the rhythm. Deuteronomy 5:15 gives a second reason — remembering the Exodus. So the Sabbath carries two stories: you rest because God rested, and you rest because you're no longer slaves. Creation dignity and liberation dignity, woven into a single weekly practice.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 12, text:
  `Exodus 20:12 — "Honor your father and mother, so that your days may be long in the land that the LORD your God is giving you." — This is the hinge commandment — the bridge between duties to God (1-4) and duties to neighbor (6-10). Parents stand in a unique position: they represent God's authority in the home and are your first neighbors. "Honor" (kabed) means to give weight to, to take seriously. And this is the first command with a promise attached, as Paul notes in Ephesians 6:2. Societies that respect their elders tend to endure; those that don't, fracture.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 13, text:
  `Exodus 20:13 — "You shall not murder." — Two words in Hebrew (lo tirtsach). The verb ratsach specifically refers to unlawful killing — murder, not all killing. The Old Testament itself prescribes capital punishment and acknowledges war, so this isn't absolute pacifism. It's a prohibition against taking human life on your own authority, for your own reasons. Every person bears God's image (Genesis 9:6), which means no one has the right to destroy what God has made in His likeness.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 14, text:
  `Exodus 20:14 — "You shall not commit adultery." — Another two words in Hebrew. Adultery in the ancient world wasn't just a private failing; it was a violation of covenant, a betrayal of trust, and an assault on the family unit that held society together. The command protects marriage as the foundational human institution — established in Genesis 2:24, before government, before organized religion. Jesus deepened this in Matthew 5:28, pushing the boundary from physical act to interior desire, because the heart is where adultery starts.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 15, text:
  `Exodus 20:15 — "You shall not steal." — This command assumes private property exists and matters. You can't steal what nobody owns. But it goes deeper than possessions — some scholars argue the original context was kidnapping (stealing persons), which would connect it to the Exodus: Israel had just been freed from a nation that stole their labor and their children. Whether it's property or persons, the principle is the same: what belongs to your neighbor is not yours to take.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 16, text:
  `Exodus 20:16 — "You shall not bear false witness against your neighbor." — This is primarily a courtroom command — don't lie under oath, don't fabricate testimony that could get someone punished or killed. In a society without forensic evidence, a person's word was often the only evidence. A lying witness could be a murder weapon. But the principle extends beyond the courtroom: every community depends on truthful speech. When people can't trust each other's words, the whole social fabric shreds.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 17, text:
  `Exodus 20:17 — "You shall not covet your neighbor's house. You shall not covet your neighbor's wife, or his manservant or maidservant, or his ox or donkey, or anything that belongs to your neighbor." — The final commandment is the most radical because it's entirely interior. You can legislate against murder, theft, and lying — but you can't enforce a law against wanting. This command reveals that God isn't only interested in behavior; He's interested in the heart that drives behavior. Coveting is the root that produces all the other sins on this list. James 1:15 maps the same progression: desire gives birth to sin, and sin gives birth to death.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 18, text:
  `Exodus 20:18 — "When all the people witnessed the thunder and lightning, the sounding of the ram's horn, and the mountain enveloped in smoke, they trembled and stood at a distance." — This is what it looks like when finite creatures encounter the infinite God without a mediator. Thunder, lightning, trumpet, smoke, trembling — it's overwhelming. The people's reaction is entirely appropriate. They're not being cowards; they're being honest about the gap between them and the holy. The scene explains why the rest of the Old Testament is so concerned with mediation — priests, sacrifices, tabernacle. Unmediated access to God is terrifying.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 19, text:
  `Exodus 20:19 — "'Speak to us yourself and we will listen,' they said to Moses. 'But do not let God speak to us, or we will die.'" — The people ask for a mediator. They want God's words filtered through a human voice they can handle. This is the birth of the prophetic office — Moses becomes the go-between, the one who can stand in God's presence and bring the message back. Every prophet after Moses follows this pattern. And it foreshadows the ultimate mediation: "In the past God spoke to our ancestors through the prophets... but in these last days He has spoken to us by His Son" (Hebrews 1:1-2).`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 20, text:
  `Exodus 20:20 — "'Do not be afraid,' Moses replied. 'For God has come to test you, so that the fear of Him may be before you, to keep you from sinning.'" — Moses draws a distinction between two kinds of fear: terror that paralyzes ("do not be afraid") and reverence that guides ("the fear of Him"). The thunderstorm at Sinai wasn't meant to traumatize Israel but to calibrate their relationship with God. A healthy awe of God's holiness is the best deterrent against sin — not because you're scared of getting caught, but because you've seen who you're dealing with.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 21, text:
  `Exodus 20:21 — "And the people stood at a distance as Moses approached the thick darkness where God was." — The crowd stays back; Moses walks forward. Into thick darkness, no less — not light, not glory, but darkness. God dwells in "thick darkness" (araphel), which is a paradox: the God who is light (1 John 1:5) meets Moses in impenetrable shadow. The darkness isn't absence; it's overwhelming presence that the human eye can't process. Moses' willingness to walk into what everyone else flees from is what sets mediators apart.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 22, text:
  `Exodus 20:22 — "Then the LORD said to Moses, 'This is what you are to tell the Israelites: You have seen for yourselves that I have spoken to you from heaven.'" — "You have seen for yourselves" — this isn't secondhand religion. Israel didn't hear about God from a missionary; they experienced Him directly. The Sinai event created a nation of eyewitnesses. God appeals to their own experience as the foundation for everything that follows. The commands aren't abstract philosophy; they're rooted in a shared, unforgettable encounter.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 23, text:
  `Exodus 20:23 — "You are not to make any gods alongside Me; you are not to make for yourselves gods of silver or gold." — God circles back to the first two commandments and makes them even more specific. Silver and gold — the materials of wealth and prestige — are particularly tempting as idol material because they represent what people already worship. The command isn't just about religious statues; it's about the human tendency to fashion gods out of whatever we value most. If your bank account is silver and gold, this verse still applies.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 24, text:
  `Exodus 20:24 — "You are to make for Me an altar of earth, and sacrifice on it your burnt offerings and peace offerings, your sheep and goats and cattle. In every place where I cause My name to be remembered, I will come to you and bless you." — The altar is made of earth — the simplest, most accessible material. No one needs to be wealthy to worship. And the promise is stunning: wherever God's name is remembered, He shows up. Worship isn't confined to a single sacred mountain. It's as portable as memory. Wherever you remember who God is and what He's done, that ground becomes holy.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 25, text:
  `Exodus 20:25 — "Now if you make an altar of stones for Me, you must not build it with stones shaped by tools; for if you use a chisel on it, you will defile it." — Uncut stones. No human craftsmanship on the altar. The altar is where you meet God, and adding your artistic contribution to it implies that God needs your improvement. The raw stone says: this encounter isn't about what you bring to it. It's about what God does at it. There's something humbling about a rough-hewn altar — it refuses to let the worshiper take credit for the worship space.`
});

commentary.push({ book_id: "EXO", chapter: 20, verse: 26, text:
  `Exodus 20:26 — "And you must not go up to My altar on steps, lest your nakedness be exposed on it.'" — A practical command with a theological point. Steps require climbing, and in ancient tunics, climbing exposes the body. God's worship will not involve the kind of exposure that characterized Canaanite fertility rites. But there's also a leveling principle: no elevated platform means no one stands above anyone else in worship. You approach God on flat ground, on the same level as everyone else. The altar is not a stage.`
});

// ============================================================================
// DEUTERONOMY 6  (25 verses) — The Shema
// ============================================================================

commentary.push({ book_id: "DEU", chapter: 6, verse: 1, text:
  `Deuteronomy 6:1 — "These are the commandments and statutes and ordinances that the LORD your God has instructed me to teach you to follow in the land that you are about to enter and possess," — Moses is standing on the eastern bank of the Jordan, giving his final address to a generation that wasn't at Sinai. These words are a hand-off: the generation that left Egypt has died, and the one about to enter Canaan needs to hear the covenant fresh. "Instructed me to teach you" — Moses is a teacher, not a king. His authority is derivative, borrowed from God for the purpose of passing it on.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 2, text:
  `Deuteronomy 6:2 — "so that you and your children and grandchildren may fear the LORD your God all the days of your lives by keeping all His statutes and commandments that I give you, and so that your days may be prolonged." — Three generations in one sentence — you, your children, your grandchildren. Moses is thinking long-term. Faith isn't a single-generation project; it's a relay race. And "fear" here isn't dread but the deep respect that shapes daily decisions. The promise of long life in the land isn't individual longevity but national endurance: keep this covenant, and your civilization lasts.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 3, text:
  `Deuteronomy 6:3 — "Hear, O Israel, and be careful to observe them, so that you may prosper and multiply greatly in a land flowing with milk and honey, just as the LORD, the God of your fathers, has promised you." — "Milk and honey" is the shorthand for abundance — pastoral wealth (milk from livestock) and agricultural sweetness (honey from bees or date syrup). It's a sensory description: this land will taste good. God's promises aren't abstract. They show up in your mouth, in your pantry, in the tangible experience of having enough and more than enough.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 4, text:
  `Deuteronomy 6:4 — "Hear, O Israel: The LORD our God, the LORD is One." — The Shema. Six Hebrew words that have been recited morning and evening by Jewish people for over three thousand years. "Hear" (shema) doesn't just mean to perceive sound — it means to listen and respond, to obey. And "one" (echad) is debated: does it mean the LORD alone is our God, or that the LORD is a unity? Both readings have ancient support. What's beyond debate is that this verse draws a line in the sand against every form of polytheism and divided loyalty. There is one God, and He requires undivided allegiance.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 5, text:
  `Deuteronomy 6:5 — "And you shall love the LORD your God with all your heart and with all your soul and with all your strength." — Jesus called this the greatest commandment (Mark 12:30). Heart, soul, strength — the totality of the inner life, the animating breath, and physical capacity. God isn't interested in compartmentalized devotion, where He gets Sunday mornings but not Monday decisions. The triple "all" is relentless: every affection, every ambition, every resource. It's not a command you can check off; it's a direction you orient your entire life toward.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 6, text:
  `Deuteronomy 6:6 — "These words I am commanding you today are to be upon your hearts." — "Upon your hearts" — not just in your memory, but shaping your desires. The heart in Hebrew thought is the center of will and decision, not just emotion. God's words are meant to become the operating system of your inner life, the filter through which every choice runs. This verse is the bridge between the Shema (who God is) and the teaching commands that follow (how you pass it on). Before you can teach, you have to internalize.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 7, text:
  `Deuteronomy 6:7 — "And you shall teach them diligently to your children and speak of them when you sit at home and when you walk along the road, when you lie down and when you get up." — Faith formation isn't a classroom event; it's an all-day, every-situation conversation. Sitting, walking, lying down, rising — the four postures cover the entire day. The word "diligently" (shanan) means to sharpen, like whetting a blade. Teaching God's words to your children isn't casual; it's intentional and persistent. And notice it's the parents' job, not the priests'. The primary seminary is the household.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 8, text:
  `Deuteronomy 6:8 — "Tie them as reminders on your hands and bind them on your foreheads." — Jewish tradition took this literally and created tefillin (phylacteries) — small leather boxes containing Scripture passages strapped to the hand and forehead. Whether the original intent was literal or metaphorical, the message is the same: God's words should direct what you do (hands) and how you think (forehead). Your actions and your thoughts, both claimed by the covenant. Jesus criticized the Pharisees not for wearing phylacteries but for making them conspicuously large as a show of piety (Matthew 23:5).`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 9, text:
  `Deuteronomy 6:9 — "Write them on the doorposts of your houses and on your gates." — This is the origin of the mezuzah — a small case containing the Shema, affixed to the doorframe of a Jewish home. Every time you enter or leave, you pass through God's word. The doorpost and the gate mark the boundary between private and public life, between home and world. The command says: God's word governs both spaces. There is no secular zone where the covenant doesn't apply.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 10, text:
  `Deuteronomy 6:10 — "And when the LORD your God brings you into the land He swore to your fathers, to Abraham, Isaac, and Jacob, that He would give you—a land with great and splendid cities that you did not build," — The inheritance is entirely unearned. Cities already built, infrastructure already in place. Israel is walking into a finished house. This is the setup for the warning that follows: unearned blessings are the most dangerous kind, because they tempt you to forget who provided them. Prosperity has a way of erasing the memory of dependence.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 11, text:
  `Deuteronomy 6:11 — "with houses full of every good thing with which you did not fill them, with wells that you did not dig, and with vineyards and olive groves that you did not plant—and when you eat and are satisfied," — The repetition of "you did not" is hammering the point: you didn't build this, fill this, dig this, or plant this. The bounty is real, but it's received, not achieved. And the pivot phrase is "when you eat and are satisfied" — that's the danger zone. Hunger keeps you praying. Satisfaction tempts you to stop. Moses knows that a full stomach is the biggest threat to Israel's faithfulness.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 12, text:
  `Deuteronomy 6:12 — "be careful not to forget the LORD who brought you out of the land of Egypt, out of the house of slavery." — "Be careful not to forget" — as if forgetting is the default setting, and remembering requires deliberate effort. It does. The Exodus itself anchors everything: no matter how good the new land is, the story of rescue is the one that defines you. Israel's identity isn't "people who live in a nice country" but "people who were slaves and got set free." Lose that story, and you lose yourself.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 13, text:
  `Deuteronomy 6:13 — "Fear the LORD your God, serve Him only, and take your oaths in His name." — Jesus quotes this verse when Satan tempts Him in the wilderness (Matthew 4:10, Luke 4:8). Three commands: fear, serve, swear by His name. Taking oaths in God's name means invoking Him as your witness — it means your word is backed by the ultimate authority. In a culture without contracts and notaries, this was the strongest possible guarantee. But it also meant you'd better mean what you say, because God is listening.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 14, text:
  `Deuteronomy 6:14 — "Do not follow other gods, the gods of the peoples around you." — "The peoples around you" — proximity is the danger. These aren't distant, theoretical gods; they're the ones your new neighbors worship. They have temples on every hill, festivals in every season, and they'll invite you over. The temptation isn't going to arrive as an obvious enemy; it's going to show up as a friendly neighbor offering to include you. That's why Moses keeps repeating this warning — he knows how assimilation works.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 15, text:
  `Deuteronomy 6:15 — "For the LORD your God, who is among you, is a jealous God. Otherwise the anger of the LORD your God will be kindled against you, and He will wipe you off the face of the earth." — "Who is among you" — God isn't distant. He lives in the camp, which means His presence is both a privilege and an accountability. The jealousy language echoes Exodus 20:5, and the stakes are existential: "wipe you off the face of the earth." This isn't empty rhetoric. The later history of Israel — exile, destruction of the temple — shows that these warnings were tragically prophetic.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 16, text:
  `Deuteronomy 6:16 — "Do not test the LORD your God as you tested Him at Massah." — Massah (Exodus 17:7) was where Israel demanded water and essentially said, "Is the LORD among us or not?" Testing God means demanding proof of His presence as a condition for your obedience. Jesus also quotes this verse against Satan (Matthew 4:7) — when tempted to throw Himself off the temple to force God's hand. Testing God is the opposite of trust: it's saying, "Prove yourself to me before I'll follow you."`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 17, text:
  `Deuteronomy 6:17 — "You are to diligently keep the commandments of the LORD your God and the testimonies and statutes He has given you." — "Diligently keep" — the Hebrew carries the sense of guarding, watching over, being vigilant about. Commandments, testimonies, and statutes aren't three different categories but three angles on the same body of instruction. The repetition isn't redundancy; it's emphasis. Moses is saying: take this seriously from every direction. Casual observance isn't observance at all.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 18, text:
  `Deuteronomy 6:18 — "Do what is right and good in the sight of the LORD, so that it may be well with you and that you may enter and possess the good land that the LORD your God swore to give your fathers," — "Right and good" — not just technically correct, but genuinely beneficial. The rabbis built an entire ethical tradition on this phrase, arguing that it requires going beyond the letter of the law to its spirit. And notice the promise isn't just survival but wellbeing — "that it may be well with you." God's commands aren't arbitrary hoops; they're the blueprint for a flourishing life.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 19, text:
  `Deuteronomy 6:19 — "driving out all your enemies before you, as the LORD has said." — The land has current occupants who are hostile to Israel's mission. God promises to clear the way. This verse acknowledges that entering the promised life isn't without opposition — there will be resistance. But the emphasis is on God doing the driving out, not Israel's military prowess. The battles ahead are real, but they've already been decided by the One who made the promise.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 20, text:
  `Deuteronomy 6:20 — "In the future, when your son asks, 'What is the meaning of the decrees and statutes and ordinances that the LORD our God has commanded you?'" — Moses anticipates the question every parent will eventually face: "Why do we do this?" And he treats it as a good sign. A child who asks about the meaning of the commands is a child engaging with faith, not just inheriting it. The question isn't rebellion — it's the beginning of ownership. The Passover Haggadah builds its entire structure around this verse, making the child's question the engine of the ritual.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 21, text:
  `Deuteronomy 6:21 — "then you are to tell him, 'We were slaves of Pharaoh in Egypt, but the LORD brought us out of Egypt with a mighty hand.'" — The answer to "why do we follow these rules?" isn't a theological lecture. It's a story. "We were slaves, and God freed us." The first person plural is deliberate — "we were slaves," not "our ancestors were slaves." Every generation is supposed to tell the story as their own. The commands only make sense inside the narrative of rescue. Strip the story away, and the rules become arbitrary.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 22, text:
  `Deuteronomy 6:22 — "Before our eyes the LORD inflicted great and devastating signs and wonders on Egypt, on Pharaoh, and on all his household." — "Before our eyes" — again, first person, as if the speaker was there. The signs and wonders weren't random miracles; they were targeted at Egypt's gods and Egypt's king. Each plague dismantled a piece of the Egyptian religious system. The point wasn't spectacle for its own sake but the systematic demonstration that Pharaoh's power was borrowed and God's was absolute.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 23, text:
  `Deuteronomy 6:23 — "But He brought us out from there to lead us in and give us the land that He had sworn to our fathers." — Brought out to lead in. Liberation wasn't the end of the story; it was the beginning. God didn't free Israel just to wander. He freed them to give them a home. This is the full arc of salvation throughout the Bible: deliverance from something and deliverance into something. A rescue that doesn't lead somewhere isn't complete. God always saves people for a purpose.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 24, text:
  `Deuteronomy 6:24 — "And the LORD commanded us to observe all these statutes and to fear the LORD our God, that we may always be prosperous and preserved, as we are to this day." — The commands are for Israel's benefit, not God's. God doesn't need their obedience to be complete; they need it to be whole. "Prosperous and preserved" — the law is protective, not oppressive. It's the guardrail on the mountain road. "As we are to this day" is Moses pointing to the evidence standing in front of him: you're alive, you're free, you're about to inherit a land. That's what obedience looks like in practice.`
});

commentary.push({ book_id: "DEU", chapter: 6, verse: 25, text:
  `Deuteronomy 6:25 — "And if we are careful to observe every one of these commandments before the LORD our God, as He has commanded us, then that will be our righteousness." — This verse raises a tension that the rest of the Bible will wrestle with. Is righteousness earned by obedience? Paul quotes from Deuteronomy extensively and argues that the law reveals the standard but cannot be the final means of achieving righteousness (Romans 9:30-32). But in its original context, Moses is saying something simpler: living faithfully in the covenant is what righteous living looks like. The New Testament won't contradict this; it will deepen it by revealing the One whose righteousness makes ours possible.`
});

// ============================================================================
// JOB 38  (41 verses) — God Answers Job from the Whirlwind
// ============================================================================

commentary.push({ book_id: "JOB", chapter: 38, verse: 1, text:
  `Job 38:1 — "Then the LORD answered Job out of the whirlwind and said:" — After 37 chapters of human debate — accusation, defense, philosophy, theology — God finally speaks. And He doesn't arrive in a still small voice or a gentle breeze. He arrives in a whirlwind (se'arah), a theophanic storm. The medium is the message: God's entrance into the conversation is itself overwhelming. And notice: He answers Job, not Eliphaz, Bildad, Zophar, or Elihu. Job is the one who demanded an audience, and God honors that demand — though not in the way Job expected.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 2, text:
  `Job 38:2 — "'Who is this who obscures My counsel by words without knowledge?'" — God's opening line is a question, not an answer. And it's a pointed one. "Words without knowledge" doesn't mean Job was lying; it means he was speaking beyond the limits of what he could possibly understand. After 37 chapters of trying to make sense of his suffering, God essentially says: you've been talking about things too big for you. It's not a rebuke of Job's pain or his honesty — it's a recalibration of the scale. Job had been thinking too small.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 3, text:
  `Job 38:3 — "Now brace yourself like a man; I will question you, and you shall inform Me." — "Brace yourself" is literally "gird up your loins" — tuck in your robe and get ready. It's the ancient equivalent of "buckle up." And then the stunning reversal: Job had been demanding to question God, but God flips the dynamic entirely. "I will question you." The entire speech that follows is interrogation, not explanation. God doesn't defend His management of the universe. He asks Job whether Job could manage it. The questions are the answer.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 4, text:
  `Job 38:4 — "Where were you when I laid the foundations of the earth? Tell Me, if you have understanding." — The first question goes straight to the beginning. Were you there? The implied answer is devastating: you weren't. You didn't see the foundations poured; you have no idea what the blueprints look like. This isn't cruelty — it's perspective. Job has been trying to read the meaning of his suffering, but he's working from a chapter in the middle of a book whose beginning he never witnessed and whose ending he can't see.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 5, text:
  `Job 38:5 — "Who fixed its measurements? Surely you know! Or who stretched a measuring line across it?" — The sarcasm is unmistakable: "Surely you know!" God is using the language of architecture — measurements, measuring lines. The earth is being described as a building with precise specifications, and God is the architect. The irony cuts deep because Job had been speaking with great confidence about how the universe should work. God is saying: you talk like someone who drew the plans, but you've never even seen the drafting table.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 6, text:
  `Job 38:6 — "On what were its foundations set, or who laid its cornerstone," — Ancient construction began with a cornerstone — the reference point from which every other measurement was taken. If the cornerstone is wrong, the whole building is wrong. God's question implies that the universe has a cornerstone, a foundational reference point that everything else is oriented around. Job has been trying to make sense of reality without access to that reference point. You can't evaluate the building if you don't know where the cornerstone is.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 7, text:
  `Job 38:7 — "while the morning stars sang together and all the sons of God shouted for joy?" — Creation had an audience. The "morning stars" and "sons of God" — angelic beings — were there when the foundations went down, and their response was celebration, not analysis. They didn't ask why God was building the earth or demand an explanation of its design. They sang. This verse quietly suggests that the proper response to God's creative work is wonder, not cross-examination. There's a time for questions and a time for worship, and creation's debut called for the latter.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 8, text:
  `Job 38:8 — "Who enclosed the sea behind doors when it burst forth from the womb," — The sea is personified as a newborn bursting from the womb — wild, chaotic, untameable. In ancient Near Eastern mythology, the sea was a chaos monster that threatened to destroy the ordered world. God takes that imagery and reframes it: the sea isn't a rival god; it's a baby He delivered and then contained. The One asking Job these questions is the One who tamed the most chaotic force in the ancient imagination, and He did it the way you'd swaddle a newborn.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 9, text:
  `Job 38:9 — "when I made the clouds its garment and thick darkness its blanket," — Continuing the newborn metaphor: God wrapped the sea in clouds like swaddling clothes. The vast, terrifying ocean is being described as an infant God is caring for. There's a tenderness in this image that sits right alongside the cosmic power. God doesn't just control the sea by brute force; He nurtures it into its boundaries. It suggests that even God's management of chaos involves something like parental care.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 10, text:
  `Job 38:10 — "when I fixed its boundaries and set in place its bars and doors," — Bars and doors — the sea is in a room with limits. God decides exactly how far the water goes. This isn't passive natural law; it's active divine will, continuously maintained. Every tide that turns, every wave that breaks instead of flooding the continent — that's the bars and doors holding. The point for Job is that the God who sets limits on the ocean might also have reasons for the limits He sets on human understanding.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 11, text:
  `Job 38:11 — "and I declared: 'You may come this far, but no farther; here your proud waves must stop'?" — God speaks to the sea the way you'd speak to a child testing boundaries: "This far. No farther." The waves are called "proud" — as if the ocean has an attitude, constantly pushing against its limits, and God's word is the line it cannot cross. Proverbs 8:29 echoes this image. For Job, suffering in what feels like chaos, the message is clear: the God who puts limits on the sea is also capable of putting limits on suffering, even when it doesn't feel like it.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 12, text:
  `Job 38:12 — "In your days, have you commanded the morning or assigned the dawn its place," — The questions shift from the foundations of the earth to the daily management of the planet. Have you ever told the sun to rise? It's easy to take the dawn for granted — it happens every day. But someone has to cue it. God is pointing out that the most routine events in the natural world require ongoing, moment-by-moment divine attention. If Job can't manage something as basic as the sunrise, what makes him think he can manage the meaning of his own pain?`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 13, text:
  `Job 38:13 — "that it might spread to the ends of the earth and shake the wicked out of it?" — Dawn doesn't just bring light; it exposes. The imagery is of someone shaking out a blanket — the wicked who operate under cover of darkness are dislodged when the light arrives. There's a moral dimension to the sunrise: darkness is where evil hides, and the dawn is God's daily act of exposure. Every morning is a miniature judgment, a reset where the light pushes back the dark. God handles this on a planetary scale, every single day.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 14, text:
  `Job 38:14 — "The earth takes shape like clay under a seal; its hills stand out like the folds of a garment." — A beautiful poetic image: the dawn light hits the landscape and features emerge from the darkness the way a design emerges when you press a seal into clay. In the dark, the earth is flat and featureless. Light reveals contour, depth, texture. The hills "stand out like folds of a garment" — three-dimensional, richly detailed. God is an artist, and the sunrise is His daily gallery opening.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 15, text:
  `Job 38:15 — "Light is withheld from the wicked, and their upraised arm is broken." — "Their upraised arm" — the gesture of violence or defiance — is broken by the light. Darkness empowers those who work by stealth and intimidation, but the coming of light ends their advantage. This is both literal (criminals prefer night) and theological (evil cannot survive full exposure). God's governance of the day-night cycle isn't just astronomical; it's moral. The rhythm of the cosmos has justice built into it.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 16, text:
  `Job 38:16 — "Have you journeyed to the vents of the sea or walked in the trenches of the deep?" — Ocean floor exploration — in the ancient world, utterly impossible. The "vents of the sea" might refer to the springs that feed the ocean from below. God is asking Job whether he's been to the places no human has ever seen. The ocean floor is God's private gallery, unseen by any human eye until modern submersibles. Even today, most of the deep ocean is unmapped. God's creation exceeds not just ancient knowledge but modern exploration.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 17, text:
  `Job 38:17 — "Have the gates of death been revealed to you? Have you seen the gates of the shadow of death?" — From the ocean floor to the realm of the dead — another place beyond human access. Job, who has wished for death multiple times in this book, is being asked: do you actually know what lies on the other side? You've been speaking about death as if it's an escape, but have you seen its gates? The question gently challenges the idea that death is simple or that Job fully understands what he's been asking for.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 18, text:
  `Job 38:18 — "Have you surveyed the extent of the earth? Tell Me, if you know all this." — "The extent of the earth" — how big is it? Can you comprehend its full scope? God is systematically widening the frame. Job's perspective has been zoomed in on his own suffering — understandably so. But God is pulling the camera back to show the whole canvas. It's not that Job's pain doesn't matter; it's that it exists within a context so vast that Job cannot see its edges. The command to speak is almost tender: "Tell Me, if you know all this." God knows Job can't. That's the point.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 19, text:
  `Job 38:19 — "Where is the way to the home of light? Do you know where darkness resides," — Light and darkness are treated as real things with real addresses. Where does light live when it's not illuminating the earth? Where does darkness go when the sun comes up? These questions sound almost whimsical, but they're probing something deep: the fundamental structure of reality itself is beyond human comprehension. We can describe light scientifically, but we still can't answer where it "lives." The mystery hasn't diminished with modern physics; it's deepened.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 20, text:
  `Job 38:20 — "so you can lead it back to its border? Do you know the paths to its home?" — God personifies light and darkness as travelers with homes and borders. Can you escort them? Can you navigate the route? The humor is dry — God is treating these cosmic forces as errands Job should be able to run if he's really as knowledgeable as his speeches have suggested. Every question in this chapter is another layer of "you're not as big as you think you are, and the universe is not as small as you've been treating it."`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 21, text:
  `Job 38:21 — "Surely you know, for you were already born! And the number of your days is great!" — This is God being wryly sarcastic. "Surely you know — after all, you've been around since the beginning, right? You're so old and wise!" Job is probably somewhere between 50 and 100 years old. The universe is unfathomably ancient. The gap between Job's experience and God's is not a matter of degree but of kind. It's the difference between reading one page of a book and having written every word of it.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 22, text:
  `Job 38:22 — "Have you entered the storehouses of snow or observed the storehouses of hail," — God has warehouses for weather. Snow and hail are stored, inventoried, ready for deployment. The image is of a cosmic arsenal that God maintains and dispenses as He sees fit. It's playful but powerful — the idea that precipitation isn't random but managed. Every snowflake, every hailstone has been in inventory before it falls. Weather isn't chaos; it's supply chain management on a divine scale.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 23, text:
  `Job 38:23 — "which I hold in reserve for times of trouble, for the day of war and battle?" — The storehouses of hail aren't just weather systems — they're weapons. Joshua 10:11 describes God using hailstones against Israel's enemies. Revelation 16:21 features catastrophic hail in the end times. God's management of nature includes strategic deployment for justice. The "day of war and battle" tells Job that there are dimensions to God's governance — including the timing and use of natural forces — that are completely invisible to human observers. God is playing a longer game than anyone on earth can see.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 24, text:
  `Job 38:24 — "In which direction is the lightning dispersed, or the east wind scattered over the earth?" — Lightning and wind — two of the most unpredictable forces in nature — have specific paths set by God. Lightning doesn't strike randomly; it's dispersed. The east wind doesn't just blow; it's scattered in a particular pattern. For people in the ancient Near East, the east wind was the desert wind — hot, dry, destructive. Even that wind has a director. The implication for Job: if weather patterns have purpose you can't see, maybe your suffering does too.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 25, text:
  `Job 38:25 — "Who cuts a channel for the flood or clears a path for the thunderbolt," — Rain doesn't just fall; it's channeled. Thunderbolts don't just strike; they follow cleared paths. God is the civil engineer of storms, directing water flow and electrical discharge with precision. The image of cutting channels suggests deliberate infrastructure — God has built drainage systems for the sky. The question isn't whether Job can do this; it's whether Job can even comprehend the complexity of what God manages in a single rainstorm.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 26, text:
  `Job 38:26 — "to bring rain on a barren land, on a desert where no man lives," — This is a stunning detail. God sends rain to places where nobody lives. No audience, no agricultural benefit, no human purpose whatsoever. God waters deserts. Why? Because the creation isn't exclusively about humans. There's a divine aesthetic at work, a care for the earth that has nothing to do with human utility. This verse gently dethrones anthropocentrism: the universe doesn't revolve around your needs, Job. It doesn't even revolve around human needs. God has interests beyond what benefits you.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 27, text:
  `Job 38:27 — "to satisfy the parched wasteland and make it sprout with tender grass?" — God finds satisfaction in watering a wasteland that no human will ever see or benefit from. "Tender grass" in a desert — fragile, beautiful, utterly useless to human economies. But God grows it anyway. This reveals something about God's character that Job's theology hadn't accounted for: God delights in things that serve no instrumental purpose. Beauty for its own sake. Life for its own sake. The universe is not a machine; it's a garden tended by someone who loves growing things.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 28, text:
  `Job 38:28 — "Does the rain have a father? Who has begotten the drops of dew?" — God asks about paternity — who is the parent of rain and dew? In Canaanite religion, Baal was the storm god who fathered the rain. God's question may be a quiet polemic: if rain has a father, it's Me, not Baal. But there's also something tender in the metaphor. Rain is born, begotten, like a child. The natural processes of the water cycle are described in the language of family. God isn't a distant engineer; He's a parent to His creation.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 29, text:
  `Job 38:29 — "From whose womb does the ice emerge? Who gives birth to the frost from heaven," — The maternal imagery continues: ice and frost are born. God uses both paternal (verse 28) and maternal (verse 29) language for His creative work. The Creator transcends gender categories while drawing on both to describe the intimacy of His relationship with creation. Ice and frost aren't industrial products; they're offspring. Every frozen pond, every frosty morning is a birth God attended.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 30, text:
  `Job 38:30 — "when the waters become hard as stone and the surface of the deep is frozen?" — Water becoming hard as stone — the transformation is almost alchemical. Liquid becomes solid, flexible becomes rigid, the flowing deep becomes a walkable surface. God does this with temperature, which He also controls. The "surface of the deep" connects back to Genesis 1:2, where the Spirit of God hovered over the deep. The same deep that was formless and void at creation is now frozen solid at God's command. He has always been master of the deep, whether liquid or solid.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 31, text:
  `Job 38:31 — "Can you bind the chains of the Pleiades or loosen the belt of Orion?" — From weather to astronomy. The Pleiades (Kimah) is a tight star cluster; Orion (Kesil) has a distinctive belt of three stars. "Bind" and "loosen" suggest that God holds the constellations in their configurations. Can you hold a star cluster together or rearrange a constellation? The ancient world saw these star groups every night and recognized that whatever kept them in formation was beyond human power. Modern astronomy only deepens the wonder: we now know these stars are light-years apart, held in place by gravitational forces of incomprehensible magnitude.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 32, text:
  `Job 38:32 — "Can you bring forth the constellations in their seasons or lead out the Bear and her cubs?" — "The Bear and her cubs" is likely Ursa Major and Ursa Minor — the Big and Little Dipper. The constellations have seasons; they appear at appointed times and God is the one who brings them out, like a shepherd leading animals from a pen. The precision of astronomical cycles — the same stars appearing at the same time each year — is presented not as mechanical but as personally directed. God leads them out. He knows them by name.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 33, text:
  `Job 38:33 — "Do you know the laws of the heavens? Can you set their dominion over the earth?" — "Laws of the heavens" — the principles that govern celestial mechanics. Newton would call them the laws of motion and gravitation. Job's author calls them God's ordinances. And these heavenly laws have "dominion over the earth" — the seasons, tides, climate, agricultural cycles are all governed from above. Can Job write these laws? Can he even fully comprehend them? The humility that modern science should produce is the same humility God is cultivating in Job: the more you learn, the more you realize you don't know.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 34, text:
  `Job 38:34 — "Can you command the clouds so that a flood of water covers you?" — Can you make it rain? Not predict rain, not pray for rain — command it. Speak to the clouds and have them obey. Elijah could pray for rain (1 Kings 18), but even he was asking God to send it. The direct command of weather is God's exclusive domain. The question underscores the difference between prayer (asking God to act) and power (commanding nature directly). Job has access to the first but not the second.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 35, text:
  `Job 38:35 — "Can you send the lightning bolts on their way? Do they report to you, 'Here we are'?" — Lightning bolts as servants who report for duty: "Here we are!" It's almost comical — the image of lightning snapping to attention like soldiers before their commander. But the comedy serves a serious point: the most violent, unpredictable force in nature is under God's direct command. Lightning doesn't freelance. It goes where it's sent and checks in when it arrives. If God micro-manages lightning, how much more does He attend to the lives of people made in His image?`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 36, text:
  `Job 38:36 — "Who has put wisdom in the heart or given understanding to the mind?" — The questions shift from external creation to internal capacity. Where does wisdom come from? Where does understanding originate? God made the hardware (the mind) and installed the software (wisdom). Even Job's ability to think, reason, and question God is itself a gift from God. The very faculties Job uses to challenge God's management of the world are faculties God gave him. You can't use a God-given mind to dethrone the God who gave it.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 37, text:
  `Job 38:37 — "Who has the wisdom to count the clouds? Or who can tilt the water jars of the heavens" — Counting clouds — an impossible task for anyone but God. And the image of tilting water jars is wonderful: God pours rain from the sky the way you'd pour water from a pitcher. The metaphor domesticates something vast (atmospheric precipitation) into something homey (pouring from a jar). God's relationship with the weather is casual, familiar, easy — the way a cook handles their kitchen tools. What overwhelms us is routine for Him.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 38, text:
  `Job 38:38 — "when the dust hardens into a mass and the clods of earth stick together?" — After rain falls, the dry, cracked ground drinks it in and becomes cohesive. Dust becomes mud; clods stick together. This is the ground-level result of what God manages from above. The cycle is complete: God counts the clouds, tilts the jars, and the earth responds by becoming workable, fertile, ready for seed. The connection between heaven and earth is maintained by God's constant attention. Nothing in this chain is self-sustaining. It all depends on the One who tilts the jars.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 39, text:
  `Job 38:39 — "Can you hunt the prey for a lioness or satisfy the hunger of young lions" — God shifts from inanimate creation to the animal kingdom. Can you feed a lion? Not an animal you domesticated — a wild lioness hunting for her cubs. God takes personal responsibility for the food chain. Psalm 104:21 echoes this: "The young lions roar for their prey, seeking their food from God." The lioness thinks she's hunting. She is. But God is the one who arranged the prey to be where it is when she's hungry. Providence operates through natural processes.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 40, text:
  `Job 38:40 — "when they crouch in their dens and lie in wait in the thicket?" — The lioness crouching, waiting — it looks like instinct, like biology. But God frames it as something He's managing. Even the waiting period, the patience of a predator in the thicket, is part of God's provision. The animals at their most wild and predatory are still within God's care. This challenges a neat division between "natural" and "supernatural." For God, there's no such distinction. Everything natural is His work.`
});

commentary.push({ book_id: "JOB", chapter: 38, verse: 41, text:
  `Job 38:41 — "Who provides food for the raven when its young cry out to God as they wander about for lack of food?" — The chapter ends not with a lion but with a raven — a scavenger, ritually unclean in Israel, not exactly a noble creature. And yet God feeds it. When baby ravens cry out, God hears. Jesus picks up this exact point in Luke 12:24: "Consider the ravens: they do not sow or reap... yet God feeds them. How much more valuable are you!" The chapter that began with cosmic foundations ends with baby birds. God's attention spans from the architecture of the universe to the hunger of a chick. If He manages both, He can surely manage what's happening to Job.`
});

// ============================================================================
// PROVERBS 31  (31 verses) — The Woman of Valor
// ============================================================================

commentary.push({ book_id: "PRO", chapter: 31, verse: 1, text:
  `Proverbs 31:1 — "These are the words of King Lemuel—the burden that his mother taught him:" — King Lemuel is mentioned nowhere else in the Bible, and his identity is debated. Some rabbinic traditions identify him as Solomon, with "Lemuel" as a nickname meaning "belonging to God." What's certain is that his mother is the teacher here. In a patriarchal world, this chapter gives us a woman's voice shaping a king. The word "burden" (massa) can also mean "oracle" — this isn't casual advice; it's prophetic instruction delivered with authority.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 2, text:
  `Proverbs 31:2 — "What shall I say, O my son? What, O son of my womb? What, O son of my vows?" — Three times she calls him "my son" with escalating intimacy: my son, son of my womb, son of my vows. The last phrase suggests he was a child of prayer — promised or dedicated to God before birth, like Samuel. This triple address isn't just maternal affection; it's a claim on his attention. "I carried you, I birthed you, I prayed you into existence. Now listen." The urgency is palpable.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 3, text:
  `Proverbs 31:3 — "Do not spend your strength on women or your vigor on those who ruin kings." — A mother warning her royal son about sexual excess. History is littered with kings destroyed by this exact pattern — Solomon himself being the most prominent biblical example (1 Kings 11:1-4). "Those who ruin kings" is blunt: certain relationships are career-ending for rulers. The wisdom isn't prudish; it's pragmatic. Leadership requires focus, and dissipation of sexual energy scatters what should be concentrated on governing well.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 4, text:
  `Proverbs 31:4 — "It is not for kings, O Lemuel, it is not for kings to drink wine, or for rulers to crave strong drink," — The repetition — "it is not for kings, it is not for kings" — hammers the point. Wine and strong drink aren't forbidden universally in the Bible, but they're dangerous for rulers because rulers make decisions that affect everyone. A drunk king is a danger to his entire nation. Power and intoxication are a lethal combination. The mother isn't a prohibitionist; she's a realist about what's at stake when the person drinking holds lives in their hands.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 5, text:
  `Proverbs 31:5 — "lest they drink and forget what is decreed, depriving all the oppressed of justice." — Here's the reason: drunk rulers forget the law and the vulnerable pay the price. "Depriving all the oppressed of justice" — the people who can least afford a bad judge are the first to suffer when the judge is impaired. The mother's concern isn't about personal morality in a vacuum; it's about the social consequences of royal irresponsibility. Leadership is always about the people who depend on you.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 6, text:
  `Proverbs 31:6 — "Give strong drink to one who is perishing, and wine to the bitter in soul." — This verse surprises people. The same mother who just warned against drinking now prescribes it — for the dying and the despairing. It's a mercy provision, not a lifestyle endorsement. In a world without modern painkillers, alcohol was the available analgesic. The principle is nuanced: what's harmful for a ruler with responsibilities is compassionate for a person at the end of their rope. Context determines application.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 7, text:
  `Proverbs 31:7 — "Let him drink and forget his poverty, and remember his misery no more." — "Forget his poverty... remember his misery no more" — this is about temporary relief for people in unbearable circumstances, not about escapism as a lifestyle. The Bible is consistently honest about the harshness of life for the poor and the suffering. Sometimes the most compassionate thing is to ease the pain of someone you can't cure. The verse doesn't solve poverty; it acknowledges that sometimes all you can do is offer comfort.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 8, text:
  `Proverbs 31:8 — "Open your mouth for those with no voice, for the cause of all the dispossessed." — Now the mother turns to the king's primary duty: advocacy for the powerless. "Those with no voice" — people who can't speak for themselves in court, in the marketplace, in the halls of power. The king's mouth is supposed to be their mouth. This is a radical definition of royal authority: your power exists for the benefit of people who have none. Kingship in Israel was never meant to be self-serving; it was meant to be representational.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 9, text:
  `Proverbs 31:9 — "Open your mouth, judge righteously, and defend the cause of the poor and needy." — "Judge righteously" — not just legally, but justly, with particular attention to the poor and needy. The repetition of "open your mouth" from verse 8 is emphatic: speak up. Silence in the face of injustice is a failure of leadership. This isn't optional for the king; it's his job description. Lemuel's mother defines good governance in nine verses: don't waste yourself on pleasure; use your power for the defenseless. That's it. That's the whole curriculum.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 10, text:
  `Proverbs 31:10 — "A wife of noble character, who can find? She is far more precious than rubies." — Here begins the famous acrostic poem — each verse starts with the next letter of the Hebrew alphabet, from aleph to tav. "Noble character" (chayil) is a military word meaning strength, valor, or capability. It's the same word used for mighty warriors (Judges 6:12). This woman isn't praised for being demure; she's praised for being formidable. The rhetorical question "who can find?" signals that this is rare and extraordinary — not the norm, but the aspiration.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 11, text:
  `Proverbs 31:11 — "The heart of her husband trusts in her, and he lacks nothing of value." — Trust is the foundation. Her husband's confidence in her is so complete that he "lacks nothing of value" — she's a reliable partner in every dimension of their shared life. This isn't about a wife who stays home while her husband runs things; the next twenty verses will show her running operations, businesses, and charitable enterprises. His trust is well-placed because she's genuinely competent, not because she's merely agreeable.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 12, text:
  `Proverbs 31:12 — "She brings him good and not harm all the days of her life." — "All the days of her life" — this isn't a phase; it's a pattern. The consistency is the point. Bringing good "all the days" means through seasons of prosperity and hardship, youth and age, agreement and conflict. She's a steady force for her household's wellbeing. And "not harm" is a significant addition — it acknowledges that an intimate partner has unique power to either build up or tear down, and this woman deliberately chooses the first.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 13, text:
  `Proverbs 31:13 — "She selects wool and flax and works with eager hands." — "Selects" implies discernment — she's choosing quality raw materials, not just grabbing what's available. And "eager hands" (literally "delight of her palms") means she enjoys the work. This isn't grudging labor; it's skilled craftsmanship done with pleasure. Wool and flax are the foundations of the ancient textile trade, and the fact that she starts here suggests she's involved in production from the raw material stage. She's not just sewing; she's running a supply chain.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 14, text:
  `Proverbs 31:14 — "She is like the merchant ships, bringing her food from afar." — Merchant ships — this is international trade language. She's compared not to a local shopkeeper but to the trading vessels that crossed the Mediterranean. Her procurement isn't limited to the local market; she sources goods from distant places. This is a woman with a network, with connections beyond her immediate community. The comparison to ships also implies resourcefulness and calculated risk — merchant voyages weren't safe, and the metaphor grants her that same boldness.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 15, text:
  `Proverbs 31:15 — "She rises while it is still night to provide food for her household and portions for her maidservants." — She's up before dawn — not because she's a martyr but because she's a manager. The "portions for her maidservants" shows she's responsible for staff. This isn't a one-woman operation; she leads a team. And she provides for them, which means she's a fair employer. The verse is less about early rising as a virtue and more about leadership that takes responsibility for the people under its care.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 16, text:
  `Proverbs 31:16 — "She appraises a field and buys it; from her earnings she plants a vineyard." — She appraises, she buys, she invests. This is real estate, agriculture, and capital investment — from her own earnings. In the ancient world, women's property rights varied widely, but this text presents a woman making independent financial decisions and funding them from her own revenue. The vineyard represents long-term thinking: grapes take years to produce. She's not living paycheck to paycheck; she's building generational wealth.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 17, text:
  `Proverbs 31:17 — "She girds herself with strength and shows that her arms are strong." — "Girds herself with strength" — the same language used for warriors preparing for battle. Her strength isn't dainty or decorative; it's functional. "Her arms are strong" means physical, tangible capability. This woman works hard enough to have the muscle tone to show for it. The portrait is unapologetically physical — she's not praised for being fragile or ethereal but for being robust. The Hebrew ideal of feminine excellence included strength, not just beauty.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 18, text:
  `Proverbs 31:18 — "She sees that her gain is good, and her lamp is not extinguished at night." — She evaluates her own work and finds it profitable — that's business acumen, not vanity. "Her lamp is not extinguished" means she works into the evening when necessary. She's not on a rigid schedule; she extends her hours when the work demands it. But the image of the lamp also carries symbolic weight: her household is never dark. Her diligence keeps the light on, literally and figuratively. She's the reason the house is warm and lit.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 19, text:
  `Proverbs 31:19 — "She stretches out her hands to the distaff and grasps the spindle with her fingers." — Back to textile production: the distaff holds raw fiber, the spindle twists it into thread. This is the hands-on, skilled labor behind the finished product. She doesn't just manage from a distance; she does the detailed work herself. In the ancient economy, spinning was time-consuming and required real skill. The verse highlights that her competence spans from high-level strategy (buying fields, verse 16) to ground-level craftsmanship.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 20, text:
  `Proverbs 31:20 — "She opens her arms to the poor and reaches out her hands to the needy." — After a string of verses about productivity and profit, this one pivots to generosity. Her economic success isn't hoarded; it flows outward to the vulnerable. The same hands that grasp the spindle (verse 19) open to the poor (verse 20). She's not wealthy for her own sake but for the sake of others. This is the biblical pattern: blessing is always meant to flow through you, not just to you. Profit without generosity is incomplete.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 21, text:
  `Proverbs 31:21 — "When it snows, she has no fear for her household, for they are all clothed in scarlet." — Snow meant danger in the ancient world — cold could kill. But she's already prepared. "Clothed in scarlet" likely refers to double-layered or high-quality garments (some scholars read the Hebrew as "double garments" based on a textual variant). Either way, the point is that she planned ahead. Winter doesn't catch her off guard because she spent autumn getting ready. Fear is neutralized by foresight.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 22, text:
  `Proverbs 31:22 — "She makes coverings for her bed; her clothing is fine linen and purple." — Fine linen and purple — these are luxury materials. Purple dye was extracted from murex sea snails and was extraordinarily expensive. She doesn't neglect herself in the process of providing for everyone else. This is important: the woman of valor takes care of her own needs too. She makes beautiful things for her home and wears excellent clothing. Self-care isn't selfishness; it's sustainability. You can't pour from an empty cup, or a bare wardrobe.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 23, text:
  `Proverbs 31:23 — "Her husband is known at the city gate, where he sits among the elders of the land." — The city gate was where legal, commercial, and civic decisions were made — the town square of the ancient world. Her husband has status and influence there. But the verse is placed in the middle of her poem, which creates an interesting dynamic: his public reputation is, at least in part, a product of her work behind the scenes. The household she's built gives him the stability and freedom to lead publicly. They're a partnership, and her contribution is foundational to his visibility.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 24, text:
  `Proverbs 31:24 — "She makes linen garments and sells them; she delivers sashes to the merchants." — She's not just a producer; she's a seller. She has market access and commercial relationships with merchants. The "sashes" (chagor) were likely belts or waistbands — practical, tradeable goods. This is a woman running a small manufacturing business, complete with production, sales, and distribution. The ancient economy was more complex than we often assume, and this woman is a full participant in it, not a bystander.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 25, text:
  `Proverbs 31:25 — "Strength and honor are her clothing, and she can laugh at the days to come." — This is the verse that ties the whole portrait together. Her real garments aren't linen and purple (verse 22) — they're strength (oz) and honor (hadar), words used elsewhere for God Himself. And she laughs at the future. Not nervously, not in denial — she laughs because she's prepared, because her trust is well-placed, because she's done the work. Anxiety about the future is the absence of this kind of rooted confidence. She's built something that can weather what's coming.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 26, text:
  `Proverbs 31:26 — "She opens her mouth with wisdom, and faithful instruction is on her tongue." — Her speech matches her actions. "Faithful instruction" (torat chesed) literally means "the teaching of lovingkindness." She's not just wise; she teaches with kindness. Wisdom without warmth is harsh, and warmth without wisdom is empty. She combines both. This verse also quietly positions her as a teacher — the same role Lemuel's mother held at the beginning of the chapter. The chapter opens and closes with women who teach with authority.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 27, text:
  `Proverbs 31:27 — "She watches over the affairs of her household and does not eat the bread of idleness." — "Watches over" (tsophiyah) comes from the same root as the word for a watchman on the city wall. She's standing guard over her household the way a sentinel guards a city. Nothing slips past her. And "the bread of idleness" is a vivid phrase — there's a kind of bread that laziness produces, and it's not bread she eats. Every good thing in her household is the product of attentiveness and effort, not luck or inheritance.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 28, text:
  `Proverbs 31:28 — "Her children rise up and call her blessed; her husband praises her as well:" — The verdict comes from the people who know her best — her family. Not colleagues, not the public, not social media. The children and husband who live with her every day are the ones who praise her. That's the toughest audience there is. Anyone can maintain a reputation among people who only see you occasionally. The praise of the people who share your house, who see you at your worst, who know the behind-the-scenes reality — that's the praise that means something.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 29, text:
  `Proverbs 31:29 — "'Many daughters have done noble things, but you surpass them all!'" — This is the husband's quote — his specific praise. "Many daughters have done noble things" acknowledges that she's not the only competent woman. There's a community of capable women, and she's among them. But "you surpass them all" is personal, intimate superlative. It's not a competition; it's a husband looking at his wife and being genuinely amazed. Good marriages involve this kind of specific, vocal admiration. He doesn't take her for granted; he tells her she's extraordinary.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 30, text:
  `Proverbs 31:30 — "Charm is deceptive and beauty is fleeting, but a woman who fears the LORD is to be praised." — The poem's climactic principle: charm and beauty aren't bad, but they're unreliable. Charm can manipulate; beauty fades. The foundation of everything described in this chapter is the fear of the LORD — the same concept that opened the entire book of Proverbs (1:7). Every competency, every virtue, every achievement listed in this poem grows from that root. Remove it, and the portrait becomes mere productivity. With it, the productivity has a soul.`
});

commentary.push({ book_id: "PRO", chapter: 31, verse: 31, text:
  `Proverbs 31:31 — "Give her the fruit of her hands, and let her works praise her at the gates." — The final verse is a command to the community: let her results speak. "The fruit of her hands" — let her enjoy what she's earned. Don't take credit for her work or diminish her contribution. "Let her works praise her at the gates" — the same gates where her husband sits among the elders (verse 23). She deserves public recognition in the same space where public decisions are made. The poem that could have stayed domestic goes civic: her excellence is a matter of public record. The book of Proverbs ends by elevating a woman to the place of honor.`
});

// ============================================================================
// EXECUTE INSERT
// ============================================================================

const insertAll = db.transaction((entries) => {
  for (const e of entries) {
    insert.run(e.book_id, e.chapter, e.verse, e.text);
  }
});

insertAll(commentary);

console.log(`\n=== Commentary Insert Complete ===`);
console.log(`Total entries inserted: ${commentary.length}`);

const chapters = [
  { book_id: "GEN", chapter: 2, label: "Genesis 2" },
  { book_id: "EXO", chapter: 20, label: "Exodus 20" },
  { book_id: "DEU", chapter: 6, label: "Deuteronomy 6" },
  { book_id: "JOB", chapter: 38, label: "Job 38" },
  { book_id: "PRO", chapter: 31, label: "Proverbs 31" },
];

for (const ch of chapters) {
  const count = db.prepare(
    `SELECT COUNT(*) as n FROM commentary_entries WHERE source_id = 'selah-ai' AND book_id = ? AND chapter = ?`
  ).get(ch.book_id, ch.chapter);
  console.log(`  ${ch.label}: ${count.n} verses`);
}

db.close();
