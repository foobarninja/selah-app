#!/usr/bin/env node
// 21-seed-devotionals.js — Seed 40 devotionals covering all tags, audiences, seasons, and specific topics
"use strict";

const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(__dirname, "../../data/selah.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

const NOW = new Date().toISOString();

// ---------- devotional data ----------
const devotionals = [
  // ═══════════════════════════════════════════════════════════════
  // 1. BULLYING — young children — David & Goliath
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-bullying-david-goliath",
    title: "When Someone Is Mean and Big",
    book_id: "1SA",
    chapter: 17,
    verse_start: 32,
    verse_end: 50,
    context_brief:
      "A giant soldier named Goliath yelled mean things at everyone every day. Nobody wanted to face him. But a boy named David — too small for armor — trusted God and stood up to the bully.",
    modern_moment:
      "Someone at school keeps saying hurtful things or pushing people around. It feels scary. David shows that size doesn't decide who is brave — and that you are never alone when you stand up for what is right.",
    conversation_starters: JSON.stringify([
      "Has anyone ever said something mean to you that made your stomach hurt?",
      "David was small but not alone. Who helps you when someone is unkind?",
      "What is one brave thing you could do if you see someone being bullied?"
    ]),
    going_deeper: "Talk about the difference between being a bully and being brave. David did not become a bully back — he trusted God.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "1sa-david-and-goliath",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: bullying tag, young-children audience",
    tags: [
      { tag_id: "bullying", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. BULLYING — young children — Daniel & Lions' Den
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-bullying-daniel-lions",
    title: "When Others Try to Get You in Trouble",
    book_id: "DAN",
    chapter: 6,
    verse_start: 10,
    verse_end: 23,
    context_brief:
      "Daniel's coworkers were jealous. They tricked the king into making a rule they knew Daniel could not follow. Daniel prayed anyway — and God shut the lions' mouths.",
    modern_moment:
      "Sometimes people set traps — they make fun of you for doing the right thing or try to get you in trouble on purpose. Daniel kept praying even when it was dangerous. You can keep doing what is right even when others try to stop you.",
    conversation_starters: JSON.stringify([
      "Have you ever been picked on for doing the right thing?",
      "Daniel's friends were jealous. Why do you think jealousy makes people act mean?",
      "What is something good you do that you should keep doing, no matter what anyone says?"
    ]),
    going_deeper: "God did not keep Daniel out of the lions' den — He was WITH Daniel inside it. Sometimes bravery means going through the hard thing, not around it.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "dan-lions-den",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: bullying tag, young-children audience",
    tags: [
      { tag_id: "bullying", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. DIVORCE — teens — Hosea/Gomer
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-divorce-hosea-gomer",
    title: "When a Family Breaks Apart",
    book_id: "HOS",
    chapter: 1,
    verse_start: 2,
    verse_end: 9,
    context_brief:
      "God told the prophet Hosea to marry Gomer, knowing she would leave. The marriage crumbled — and the children bore names meaning 'Not Loved' and 'Not My People.' Yet God refused to stop loving.",
    modern_moment:
      "When parents divorce, it can feel like the ground disappears. You might wonder if it is your fault or if love always ends. Hosea's story is raw and painful, but it reveals that even when human covenants break, God's faithfulness does not.",
    conversation_starters: JSON.stringify([
      "What feelings come up when you think about family breaking apart — anger, sadness, confusion, all of them?",
      "Hosea's children had painful names. Have you ever felt labeled by something that was not your fault?",
      "What does it mean that God keeps loving even when relationships fail?"
    ]),
    going_deeper: "Read Hosea 3:1 — 'Go again, love.' God's love is not based on whether people stay. If your family is going through this, it is not your fault, and you are still completely loved.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "hos-hosea-marries-gomer",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: divorce tag, teens audience",
    tags: [
      { tag_id: "divorce", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "grief", relevance: "secondary" },
      { tag_id: "relationships-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. NEW SCHOOL — family — Ruth arriving in Bethlehem
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-new-school-ruth",
    title: "Walking into a Room Where Nobody Knows You",
    book_id: "RUT",
    chapter: 1,
    verse_start: 19,
    verse_end: 22,
    context_brief:
      "Ruth arrived in Bethlehem as a foreigner. She did not look like anyone, talk like anyone, or know the customs. The whole town stared. But she showed up anyway.",
    modern_moment:
      "A new school feels like a foreign country — different rules, different groups, everyone already knows each other. Ruth walked into that kind of room. She did not pretend to be someone else. She just kept showing up, and eventually she belonged.",
    conversation_starters: JSON.stringify([
      "What is the hardest part about being new somewhere — not knowing anyone, or feeling like everyone is watching?",
      "Ruth stuck close to Naomi at first. Who could you stick close to when things feel unfamiliar?",
      "What is one small brave thing you could do on a first day?"
    ]),
    going_deeper: "Ruth's story reminds us that belonging is not instant. It took a whole harvest season before she found her place. Be patient with yourself.",
    audience: "family",
    estimated_minutes: 5,
    season: "back-to-school",
    day_of_year: null,
    narrative_id: "rut-naomi-and-ruth",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: new-school tag, family audience, back-to-school season",
    tags: [
      { tag_id: "new-school", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "back-to-school", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "courage-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. PET LOSS — young children — creation/animals
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-pet-loss-creation",
    title: "When Your Pet Goes Away Forever",
    book_id: "GEN",
    chapter: 1,
    verse_start: 20,
    verse_end: 25,
    context_brief:
      "When God made the world, He created every animal — fish, birds, dogs, cats, hamsters, all of them. He called them 'good.' Every creature matters to God.",
    modern_moment:
      "When a pet dies, the house feels too quiet. Their bowl is still there. Their spot on the couch is empty. It is okay to be very, very sad. God made your pet and called it good — your love for them was good too.",
    conversation_starters: JSON.stringify([
      "What is your favorite memory with your pet?",
      "God called the animals 'good.' What made your pet so good?",
      "It is okay to cry about this. Do you want to draw a picture of your pet to remember them?"
    ]),
    going_deeper: "God notices every sparrow (Matthew 10:29). He cares about creatures — and He cares about how much you miss yours.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "creation-of-world",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: pet-loss tag, young-children audience",
    tags: [
      { tag_id: "pet-loss", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "grief", relevance: "primary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. PET LOSS — young children — Balaam's donkey
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-pet-loss-balaams-donkey",
    title: "God Cares About Animals Too",
    book_id: "NUM",
    chapter: 22,
    verse_start: 21,
    verse_end: 35,
    context_brief:
      "Balaam's donkey saw an angel that Balaam could not see. The donkey tried to protect Balaam, and Balaam hit her. Then God opened the donkey's mouth — and she spoke! God cared about that donkey.",
    modern_moment:
      "Your pet could not talk with words, but they showed love in their own way. God made animals with feelings and loyalty. When we lose them, the sadness is real because the love was real.",
    conversation_starters: JSON.stringify([
      "Balaam's donkey protected him. How did your pet show you love?",
      "God let the donkey speak up. If your pet could say one thing to you, what would it be?",
      "What is one thing you want to always remember about your pet?"
    ]),
    going_deeper: "God saw the donkey when Balaam did not. God sees your sadness too, even when other people might not understand why losing a pet hurts so much.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "num-balaam-and-his-donkey",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: pet-loss tag, young-children audience",
    tags: [
      { tag_id: "pet-loss", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "grief", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. MOVING — family — Abraham leaving Ur
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-moving-abraham-ur",
    title: "Leaving Everything Behind",
    book_id: "GEN",
    chapter: 12,
    verse_start: 1,
    verse_end: 9,
    context_brief:
      "God told Abram: leave your country, your relatives, your father's house — everything you know. Go to a land I will show you. Abram packed up and walked into the unknown.",
    modern_moment:
      "Moving means saying goodbye to your room, your street, your friends. It means starting over. Abram did not know where he was going, but he knew who was going with him. When your family moves, God moves with you.",
    conversation_starters: JSON.stringify([
      "What will you miss most about where you live now?",
      "Abram did not know where he was going. What feels scary about not knowing what the new place will be like?",
      "What is one thing about your family that stays the same no matter where you live?"
    ]),
    going_deeper: "Abram became Abraham — the father of nations — because he was willing to go. Some of the best chapters of your life might start with a moving truck.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "call-of-abram",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: moving tag, family audience",
    tags: [
      { tag_id: "moving", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "change", relevance: "primary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. MOVING — family — Israelites entering Canaan
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-moving-jordan-crossing",
    title: "Stepping into the New Place",
    book_id: "JOS",
    chapter: 3,
    verse_start: 14,
    verse_end: 17,
    context_brief:
      "After 40 years of wandering, Israel finally crossed the Jordan River into the promised land. The priests had to step INTO the water before it parted. They had to move first.",
    modern_moment:
      "Moving to a new home means stepping into unknown territory. The Israelites picked up stones from the riverbed as reminders of where they had been. You can carry your memories with you into the new place.",
    conversation_starters: JSON.stringify([
      "The priests had to step in before the water moved. What is one brave first step you can take in your new place?",
      "The Israelites stacked stones to remember. What 'stones' do you want to take with you — photos, traditions, recipes?",
      "What are you hoping the new place will be like?"
    ]),
    going_deeper: "Joshua 4:6-7 says the stones were so children would ask, 'What do these mean?' Keep telling your family's story, wherever you end up.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "jos-crossing-the-jordan",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: moving tag, family audience",
    tags: [
      { tag_id: "moving", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "courage-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. HEALTH CRISIS — family — Hezekiah's illness
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-health-crisis-hezekiah",
    title: "When Someone You Love Is Very Sick",
    book_id: "2KI",
    chapter: 20,
    verse_start: 1,
    verse_end: 11,
    context_brief:
      "King Hezekiah was told he would die. He turned his face to the wall and wept and prayed. God heard his prayer and gave him more years. But first, Hezekiah had to be honest about how scared he was.",
    modern_moment:
      "When a parent, grandparent, or someone you love is seriously ill, the fear is real. Hezekiah did not pretend to be fine. He cried. He prayed. God met him in the tears, not after them.",
    conversation_starters: JSON.stringify([
      "When someone is sick, what feelings come up? Is it okay to feel all of them?",
      "Hezekiah turned to the wall and cried. Where do you go when you need to let your feelings out?",
      "What is one thing we can do as a family to support each other right now?"
    ]),
    going_deeper: "Hezekiah's story does not promise that every sick person will be healed. But it promises that every prayer is heard. God does not waste your tears.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "2ki-hezekiahs-illness",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: health-crisis tag, family audience",
    tags: [
      { tag_id: "health-crisis", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "suffering-tag", relevance: "primary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. HEALTH CRISIS — family — Bleeding woman
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-health-crisis-bleeding-woman",
    title: "Twelve Years of Waiting for Healing",
    book_id: "MRK",
    chapter: 5,
    verse_start: 25,
    verse_end: 34,
    context_brief:
      "A woman had been sick for twelve years. She spent all her money on doctors. Nothing worked. She reached through the crowd and touched Jesus' robe — and was healed instantly.",
    modern_moment:
      "Chronic illness is exhausting — the appointments, the waiting, the hoping, the disappointment. This woman refused to give up. She reached for help one more time. Jesus did not just heal her body — He called her 'daughter' and restored her dignity.",
    conversation_starters: JSON.stringify([
      "Twelve years is a long time. How does it feel when sickness goes on and on?",
      "She reached out even though she was afraid. What does it look like to keep reaching for help?",
      "Jesus called her 'daughter.' Why does it matter that He saw HER, not just her sickness?"
    ]),
    going_deeper: "Mark 5:34 — 'Your faith has healed you. Go in peace and be freed from your suffering.' Jesus cares about the whole person, not just the diagnosis.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "mrk-jairus-and-bleeding-woman",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: health-crisis tag, family audience",
    tags: [
      { tag_id: "health-crisis", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "patience-tag", relevance: "secondary" },
      { tag_id: "suffering-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. FINANCIAL STRESS — adults — Widow's mite
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-financial-stress-widows-mite",
    title: "Two Coins and a Reckless Trust",
    book_id: "MRK",
    chapter: 12,
    verse_start: 41,
    verse_end: 44,
    context_brief:
      "Jesus watched rich people throw large amounts into the temple treasury. Then a poor widow dropped in two tiny copper coins — all she had to live on. Jesus said she gave more than all the others combined.",
    modern_moment:
      "When you are counting every dollar and the bills keep coming, generosity feels impossible. This passage is not a guilt trip to give what you do not have. It is a revelation: God measures faithfulness, not figures. Your small offerings — of money, time, energy — matter enormously.",
    conversation_starters: JSON.stringify([
      "When money is tight, what is the first thing that feels threatened — security, dignity, control?",
      "Jesus noticed what nobody else did. Where do you feel unseen in your financial struggle?",
      "What is the difference between trusting God with money and being reckless with it?"
    ]),
    going_deeper: "This widow trusted God with her last meal. You are not required to be her — but you are invited to bring whatever you have, however small, and trust that God sees it.",
    audience: "adults",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "mrk-widows-offering",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: financial-stress tag, adults audience",
    tags: [
      { tag_id: "financial-stress", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "generosity-tag", relevance: "secondary" },
      { tag_id: "stress", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. FINANCIAL STRESS — adults — Widow's oil (2 Kings 4 — using Elisha)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-financial-stress-widows-oil",
    title: "What Do You Have in Your House?",
    book_id: "2KI",
    chapter: 4,
    verse_start: 1,
    verse_end: 7,
    context_brief:
      "A prophet's widow was about to lose her children to debt slavery. Elisha asked: 'What do you have?' She had one small jar of oil. God multiplied it — jar after jar — until every vessel was full and the debt was paid.",
    modern_moment:
      "Financial pressure can make you feel like you have nothing. Elisha's question cuts through the panic: what DO you have? It might not look like enough, but God works with what you bring.",
    conversation_starters: JSON.stringify([
      "When money is tight, what resources do you overlook because they seem too small?",
      "The widow had to ask neighbors for empty jars — she had to let people in. How hard is it to ask for help with money?",
      "The oil stopped when the jars ran out. What does it mean to keep 'bringing jars' — keep making room for provision?"
    ]),
    going_deeper: "God did not drop bags of gold from heaven. He multiplied what she already had. Sometimes provision looks less like a miracle and more like resourcefulness empowered by grace.",
    audience: "adults",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: financial-stress tag, adults audience. Narrative unit for 2Ki 4:1-7 not in DB, narrative_id left null.",
    tags: [
      { tag_id: "financial-stress", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "stress", relevance: "secondary" },
      { tag_id: "patience-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. COMPARISON — teens — Cain & Abel
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-comparison-cain-abel",
    title: "When Someone Else Gets the Approval You Wanted",
    book_id: "GEN",
    chapter: 4,
    verse_start: 3,
    verse_end: 12,
    context_brief:
      "Cain and Abel both brought offerings. God accepted Abel's and rejected Cain's. Instead of asking why, Cain let jealousy consume him — and it ended in murder. God warned him: 'sin is crouching at your door.'",
    modern_moment:
      "They got the grade, the spot on the team, the followers. You tried just as hard. Comparison starts as a small question — 'Why them and not me?' — but it can grow into something that eats you alive. Cain's story is extreme, but the seed is familiar.",
    conversation_starters: JSON.stringify([
      "When someone gets something you wanted, what is the first thing you feel — anger, sadness, or 'it is not fair'?",
      "God told Cain, 'sin is crouching at your door.' What does comparison turn into if you let it grow?",
      "What if God's plan for you is different from — not less than — someone else's?"
    ]),
    going_deeper: "God did not say Cain was worthless. He said, 'If you do what is right, will you not be accepted?' The issue was not Abel's success — it was Cain's response to it.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "cain-and-abel",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: comparison tag, teens audience",
    tags: [
      { tag_id: "comparison", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "anger-tag", relevance: "secondary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. COMPARISON — teens — Rachel & Leah
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-comparison-rachel-leah",
    title: "The Sister Who Had Everything (and Still Felt Empty)",
    book_id: "GEN",
    chapter: 29,
    verse_start: 16,
    verse_end: 30,
    context_brief:
      "Rachel was beautiful and loved by Jacob. Leah was unloved but had children. Each envied what the other had. Neither felt like enough. It tore the family apart.",
    modern_moment:
      "Social media is a highlight reel. Someone always seems to have the thing you are missing — looks, friends, talent, attention. Rachel and Leah show that comparison is ancient and destructive. Nobody wins when you keep score.",
    conversation_starters: JSON.stringify([
      "Rachel had love but wanted children. Leah had children but wanted love. Why is it so hard to see what we DO have?",
      "When you scroll through social media, what kind of posts make you feel 'less than'?",
      "What would change if you stopped comparing your chapter 3 to someone else's chapter 20?"
    ]),
    going_deeper: "Genesis 29:31 says 'the LORD saw that Leah was unloved.' God sees the person who feels invisible. Your worth is not determined by who notices you.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "jacob-rachel-leah",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: comparison tag, teens audience",
    tags: [
      { tag_id: "comparison", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "identity-tag", relevance: "secondary" },
      { tag_id: "relationships-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. APOLOGIZING — family — Psalm 51 (David's confession)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-apologizing-psalm51",
    title: "The Hardest Words: 'I Was Wrong'",
    book_id: "PSA",
    chapter: 51,
    verse_start: 1,
    verse_end: 12,
    context_brief:
      "After David did terrible things — adultery and murder — the prophet Nathan confronted him. David did not make excuses. He said, 'I have sinned against the LORD,' and wrote this psalm of raw, honest confession.",
    modern_moment:
      "Saying sorry is hard. Really meaning it is harder. David's prayer does not minimize what he did. He owns it completely: 'Against you, you only, have I sinned.' A real apology names what was wrong without adding 'but...'",
    conversation_starters: JSON.stringify([
      "What makes apologizing so hard — pride, embarrassment, or fear that people won't forgive?",
      "David said 'create in me a clean heart.' Why is saying sorry not enough — why does the heart need to change?",
      "Think of a time someone gave you a real apology. How did it feel different from a fake one?"
    ]),
    going_deeper: "A real apology has three parts: 'I was wrong. I am sorry. I will change.' Practice saying all three without adding excuses.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "psa-psalm-51",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: apologizing tag, family audience",
    tags: [
      { tag_id: "apologizing", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "forgiveness-tag", relevance: "primary" },
      { tag_id: "failure", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. APOLOGIZING — family — Zacchaeus
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-apologizing-zacchaeus",
    title: "Paying It Back: When Sorry Means Action",
    book_id: "LUK",
    chapter: 19,
    verse_start: 1,
    verse_end: 10,
    context_brief:
      "Zacchaeus was a tax collector who cheated people for years. When Jesus visited his house, Zacchaeus did not just say sorry — he gave back four times what he had stolen. His apology had legs.",
    modern_moment:
      "Words matter, but so do actions. Zacchaeus shows that a real apology tries to fix what was broken. If you broke a toy, fix it. If you said something mean, say something kind. If you took something, give it back — and then some.",
    conversation_starters: JSON.stringify([
      "Zacchaeus gave back four times what he took. What does it look like to make things right, not just say sorry?",
      "Jesus went to Zacchaeus's house BEFORE he apologized. What does it mean that Jesus came to him first?",
      "Is there something you need to make right with someone?"
    ]),
    going_deeper: "Luke 19:9 — 'Today salvation has come to this house.' Apology is not punishment — it is the door to freedom.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "luk-zacchaeus",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: apologizing tag, family audience",
    tags: [
      { tag_id: "apologizing", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "forgiveness-tag", relevance: "secondary" },
      { tag_id: "generosity-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 17-20. SEASONAL: ADVENT (4 devotionals to fill the gap)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-advent-magnificat",
    title: "Mary's Song: The World Turned Upside Down",
    book_id: "LUK",
    chapter: 1,
    verse_start: 46,
    verse_end: 56,
    context_brief:
      "A teenage girl from a nobody town was told she would carry God's Son. Her response was not fear — it was a revolution song. The hungry will be filled. The powerful will be brought down.",
    modern_moment:
      "Advent begins with waiting — but Mary's song says the waiting is not passive. God is already at work, already turning things upside down. What if this season of preparation is not about perfecting your holiday plans but about joining what God is already doing?",
    conversation_starters: JSON.stringify([
      "Mary was young and powerless by the world's standards. Why did God choose her?",
      "She said God 'lifts the humble.' Where do you see that happening today?",
      "What are you waiting for this Advent — and what might God already be doing?"
    ]),
    going_deeper: "Read the Magnificat aloud as a family. Let each person name one thing they are waiting for God to do.",
    audience: "family",
    estimated_minutes: 5,
    season: "advent",
    day_of_year: null,
    narrative_id: "luk-magnificat",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: advent season",
    tags: [
      { tag_id: "advent", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "patience-tag", relevance: "secondary" },
      { tag_id: "joy-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-advent-prince-of-peace",
    title: "A Child Who Carries the Government",
    book_id: "ISA",
    chapter: 9,
    verse_start: 2,
    verse_end: 7,
    context_brief:
      "Isaiah prophesied that a child would come — not a warrior or politician — who would carry the weight of the world on His shoulders. His name would be Wonderful Counselor, Mighty God, Prince of Peace.",
    modern_moment:
      "The world aches for peace. Isaiah's prophecy says peace does not come from power but from a child. Advent invites us to believe that the small, the quiet, the unexpected is where God does His best work.",
    conversation_starters: JSON.stringify([
      "Why do you think God chose a baby instead of a king to save the world?",
      "Which name means the most to you right now — Wonderful Counselor, Mighty God, or Prince of Peace?",
      "Where does our family need peace this Advent?"
    ]),
    going_deeper: "Isaiah wrote this during a time of war and fear. The promise was not that everything would be fine tomorrow — but that a light was coming. Sometimes hope is just seeing the light before the dawn.",
    audience: "family",
    estimated_minutes: 5,
    season: "advent",
    day_of_year: null,
    narrative_id: "isa-prince-of-peace",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: advent season",
    tags: [
      { tag_id: "advent", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 19. CHRISTMAS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-christmas-birth-of-jesus",
    title: "Born in the Wrong Place",
    book_id: "MAT",
    chapter: 1,
    verse_start: 18,
    verse_end: 25,
    context_brief:
      "Jesus was not born in a palace. There was no room, no status, no fanfare. God entered the world in the most ordinary, overlooked, inconvenient way possible.",
    modern_moment:
      "Christmas gets buried under wrapping paper and schedules. The actual story is rougher: a scared couple, no room, a feeding trough for a bed. God chose the margins, not the middle. He still does.",
    conversation_starters: JSON.stringify([
      "Why do you think God chose such a humble birth for Jesus?",
      "What feels 'too small' or 'too ordinary' in your life that God might want to use?",
      "How can we make room for Jesus this Christmas — not just in our schedule, but in our hearts?"
    ]),
    going_deeper: "Matthew traces Jesus' genealogy through liars, outsiders, and broken people. Christmas is proof that God works through mess, not around it.",
    audience: "family",
    estimated_minutes: 5,
    season: "christmas",
    day_of_year: 359,
    narrative_id: "mat-genealogy-and-birth",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: christmas season",
    tags: [
      { tag_id: "christmas", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "gratitude-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 20. LENT
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-lent-potter-and-clay",
    title: "Being Reshaped Hurts",
    book_id: "JER",
    chapter: 18,
    verse_start: 1,
    verse_end: 6,
    context_brief:
      "God told Jeremiah to go watch a potter at work. The clay vessel was marred, so the potter crushed it and started over — reshaping it into something new. God said: 'Like clay in the potter's hand, so are you in mine.'",
    modern_moment:
      "Lent is a season of being reshaped. It requires admitting that some things in us are marred — habits, attitudes, selfishness. Being remade is not comfortable. But the potter is not destroying — He is creating.",
    conversation_starters: JSON.stringify([
      "What does it feel like to be 'reshaped' — uncomfortable, scary, hopeful?",
      "The potter did not throw the clay away. He started over. What is the difference between being thrown away and being remade?",
      "What is one thing you could give up or take on this Lent that would make space for God to work?"
    ]),
    going_deeper: "Jeremiah 18:6 — 'Can I not do with you as this potter does?' Surrender is not weakness. It is trusting the hands that hold you.",
    audience: "family",
    estimated_minutes: 5,
    season: "lent",
    day_of_year: null,
    narrative_id: "jer-the-potter",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: lent season",
    tags: [
      { tag_id: "lent", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 21. EASTER
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-easter-empty-tomb",
    title: "The Tomb Is Empty — Now What?",
    book_id: "MRK",
    chapter: 16,
    verse_start: 1,
    verse_end: 8,
    context_brief:
      "The women came to anoint a dead body. Instead they found an empty tomb and a young man who said, 'He is not here. He has risen.' Mark's gospel ends with them running away, afraid. No neat resolution.",
    modern_moment:
      "Easter is supposed to be triumphant, but Mark's version ends in fear and silence. Maybe that is more honest. Resurrection is not just a happy ending — it is a world-shattering reality that takes time to absorb. It is okay if your faith is more 'trembling and bewildered' than 'confident and singing.'",
    conversation_starters: JSON.stringify([
      "The women were afraid at the empty tomb. Is it okay to be scared by good news?",
      "Mark's gospel ends mid-sentence. Why might God leave the story open-ended?",
      "What does resurrection mean for you today — not just as theology, but in your actual life?"
    ]),
    going_deeper: "The earliest manuscripts of Mark end at 16:8 — with fear. The resurrection story was so big it left the first witnesses speechless. What leaves you speechless about God?",
    audience: "family",
    estimated_minutes: 5,
    season: "easter",
    day_of_year: null,
    narrative_id: "mrk-empty-tomb",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: easter season",
    tags: [
      { tag_id: "easter", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "doubt-tag", relevance: "secondary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 22. THANKSGIVING
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-thanksgiving-song-of-sea",
    title: "Singing After the Storm",
    book_id: "EXO",
    chapter: 15,
    verse_start: 1,
    verse_end: 13,
    context_brief:
      "The Israelites had just crossed the Red Sea with Pharaoh's army drowning behind them. Their response was spontaneous worship — a song of gratitude bursting out of relief.",
    modern_moment:
      "Thanksgiving is best when it follows a hard season. The Israelites did not sing because life was comfortable — they sang because they survived. What storm has your family come through this year?",
    conversation_starters: JSON.stringify([
      "The Israelites sang after danger passed. What are you relieved about this year?",
      "Go around the table: name one hard thing from this year and one good thing that came out of it.",
      "Miriam grabbed a tambourine. How does your family celebrate when something good happens?"
    ]),
    going_deeper: "Gratitude is not pretending everything is fine. It is naming the good in the middle of the real. What good can you name today?",
    audience: "family",
    estimated_minutes: 5,
    season: "thanksgiving",
    day_of_year: null,
    narrative_id: "song-of-the-sea",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: thanksgiving-season tag",
    tags: [
      { tag_id: "thanksgiving-season", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "gratitude-tag", relevance: "primary" },
      { tag_id: "joy-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 23. NEW YEAR
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-new-year-choose-life",
    title: "Choose Life: Starting Over on Purpose",
    book_id: "DEU",
    chapter: 30,
    verse_start: 15,
    verse_end: 20,
    context_brief:
      "Moses stood before Israel at the edge of the promised land and gave them the starkest choice: 'I set before you life and death, blessings and curses. Choose life.'",
    modern_moment:
      "A new year feels like standing at a threshold. Moses does not say 'hope for the best.' He says CHOOSE. Every day is a series of small choices. What will your family choose this year?",
    conversation_starters: JSON.stringify([
      "Moses said 'choose life.' What does choosing life look like in daily decisions?",
      "What is one habit from last year you want to leave behind?",
      "What is one thing your family wants to be intentional about this year?"
    ]),
    going_deeper: "Deuteronomy 30:19 — 'I have set before you life and death... Now choose life, so that you and your children may live.' The choice is not once — it is daily.",
    audience: "family",
    estimated_minutes: 5,
    season: "new-year",
    day_of_year: 1,
    narrative_id: "deu-choose-life",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: new-year season",
    tags: [
      { tag_id: "new-year", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 24. SUMMER
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-summer-rest-sabbath",
    title: "Permission to Slow Down",
    book_id: "LEV",
    chapter: 25,
    verse_start: 1,
    verse_end: 7,
    context_brief:
      "God commanded that the land rest every seventh year — no planting, no harvesting, no productivity. Even the dirt gets a sabbath. If God gave rest to soil, He certainly gives it to you.",
    modern_moment:
      "Summer can feel like an extended Sabbath — longer days, slower pace, bare feet. But we fill it with camps and trips and checklists. What if this summer, you actually rested?",
    conversation_starters: JSON.stringify([
      "Even dirt gets a year off! Why do humans have such a hard time resting?",
      "What is the most restful thing you can imagine doing this summer?",
      "How can our family build 'sabbath moments' into this summer — not just vacation, but real rest?"
    ]),
    going_deeper: "The Sabbath year required trust — you had to believe God would provide without your effort. Rest is an act of faith.",
    audience: "family",
    estimated_minutes: 5,
    season: "summer",
    day_of_year: null,
    narrative_id: "lev-sabbath-and-jubilee",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: summer season",
    tags: [
      { tag_id: "summer", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "rest-tag", relevance: "primary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 25. BACK TO SCHOOL — teens
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-back-to-school-daniel-babylon",
    title: "Staying Yourself in a New World",
    book_id: "DAN",
    chapter: 1,
    verse_start: 3,
    verse_end: 21,
    context_brief:
      "Daniel was a teenager taken from his home and dropped into Babylon — new language, new food, new rules, new pressure to conform. He resolved to stay faithful without being obnoxious about it.",
    modern_moment:
      "A new school year brings pressure to fit in, to become whoever the crowd wants you to be. Daniel navigated a foreign culture without losing himself. He was respectful, excellent, and uncompromising — all at the same time.",
    conversation_starters: JSON.stringify([
      "Daniel was in a place where nobody shared his values. Have you ever felt like that?",
      "He did not rebel loudly — he found creative alternatives. What does that look like in your school?",
      "What is one thing about yourself you refuse to change, no matter what anyone thinks?"
    ]),
    going_deeper: "Daniel 1:20 — the king found Daniel ten times better than everyone else. Faithfulness is not a handicap — it is a superpower.",
    audience: "teens",
    estimated_minutes: 6,
    season: "back-to-school",
    day_of_year: null,
    narrative_id: "dan-fiery-furnace",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: back-to-school season, teens audience",
    tags: [
      { tag_id: "back-to-school", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "identity-tag", relevance: "secondary" },
      { tag_id: "courage-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 26-28. YOUNG CHILDREN — underrepresented life-situation tags
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-yc-fear-red-sea",
    title: "When You're Trapped and Scared",
    book_id: "EXO",
    chapter: 14,
    verse_start: 10,
    verse_end: 22,
    context_brief:
      "The Israelites were stuck — the sea in front, the army behind. They were terrified. Moses said, 'Stand firm. The LORD will fight for you.' Then God split the sea wide open.",
    modern_moment:
      "Sometimes you feel trapped — maybe it is a dark room, a scary dream, or a situation where you do not know what to do. God did not leave His people stuck, and He will not leave you stuck either.",
    conversation_starters: JSON.stringify([
      "What makes you feel trapped or scared?",
      "Moses said 'stand firm.' What does it mean to be brave even when you're scared?",
      "God made a way through the water. Can you think of a time things worked out even when you were worried?"
    ]),
    going_deeper: "Being brave does not mean not being scared. It means trusting God even when you ARE scared.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "the-passover",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: fear-tag, young-children audience",
    tags: [
      { tag_id: "fear-tag", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-yc-gratitude-creation",
    title: "Look What God Made!",
    book_id: "GEN",
    chapter: 1,
    verse_start: 1,
    verse_end: 25,
    context_brief:
      "God made light, water, land, plants, animals, stars — everything! And after each day, He looked at what He made and said, 'It is good.'",
    modern_moment:
      "Look around — trees, dogs, rain, your own hands. God made all of it and called it GOOD. Gratitude starts with noticing. What good thing can you spot right now?",
    conversation_starters: JSON.stringify([
      "What is your favorite thing God made?",
      "God said 'it is good' over and over. What would YOU say 'it is good' about today?",
      "Can you count five good things you can see from where you are sitting?"
    ]),
    going_deeper: "Try a 'Thank You Walk' — go outside and say thank you to God for every good thing you notice.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "creation-of-world",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: gratitude-tag, young-children audience",
    tags: [
      { tag_id: "gratitude-tag", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "joy-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-yc-sibling-jacob-esau",
    title: "When You and Your Brother (or Sister) Fight",
    book_id: "GEN",
    chapter: 33,
    verse_start: 1,
    verse_end: 11,
    context_brief:
      "Jacob and Esau were brothers who had a huge fight. Jacob tricked Esau and ran away. Years later, Jacob came back terrified — but Esau ran to him and hugged him. They made up.",
    modern_moment:
      "Siblings fight. Sometimes it feels like you will never get along again. But Jacob and Esau show that even the worst fights can end in a hug. It takes time, and it takes being brave enough to say sorry.",
    conversation_starters: JSON.stringify([
      "Have you ever been so mad at your brother or sister that you wanted to run away?",
      "Esau ran to Jacob and hugged him. Who needs to make the first move in your family?",
      "What is one kind thing you could do for your sibling today?"
    ]),
    going_deeper: "It took Jacob and Esau twenty years to make up. Hopefully you will not wait that long! But it shows that reconciliation is always possible.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "jacob-and-esau-reconcile",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: sibling-conflict tag, young-children audience",
    tags: [
      { tag_id: "sibling-conflict", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "forgiveness-tag", relevance: "secondary" },
      { tag_id: "relationships-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-yc-friendship-david-jonathan",
    title: "The Best Kind of Friend",
    book_id: "1SA",
    chapter: 18,
    verse_start: 1,
    verse_end: 4,
    context_brief:
      "Jonathan was a prince. David was a shepherd boy. They became best friends anyway. Jonathan gave David his own robe and sword — he shared his best stuff because he loved David that much.",
    modern_moment:
      "A real friend is not about who is popular or who has the best toys. Jonathan shared everything with David. A real friend cheers for you, shares with you, and sticks with you even when it is hard.",
    conversation_starters: JSON.stringify([
      "What makes someone a REAL friend?",
      "Jonathan shared his best things. What is something you could share with a friend?",
      "Have you ever had a friend who was very different from you? What made it work?"
    ]),
    going_deeper: "Proverbs 17:17 says 'A friend loves at all times.' The best friendships are not about what you get — they are about what you give.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "1sa-david-and-jonathan",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: friendship-trouble tag, young-children audience",
    tags: [
      { tag_id: "friendship-trouble", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "relationships-tag", relevance: "secondary" },
      { tag_id: "generosity-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-yc-patience-noah",
    title: "Waiting a Really, Really Long Time",
    book_id: "GEN",
    chapter: 8,
    verse_start: 1,
    verse_end: 12,
    context_brief:
      "Noah was stuck on a boat with his family and a LOT of animals. He waited and waited for the water to go down. He sent out a dove — it came back. He waited more. He sent it again — it came back with an olive branch! Finally, it did not come back at all.",
    modern_moment:
      "Waiting is so hard — waiting for your birthday, waiting for a turn, waiting for something to get better. Noah had to wait a whole year on that boat! But the water did go down. The waiting did end.",
    conversation_starters: JSON.stringify([
      "What is the hardest thing you have ever had to wait for?",
      "Noah sent the dove three times. What does it mean to keep checking and keep hoping?",
      "What helps you be patient when waiting feels forever?"
    ]),
    going_deeper: "God remembered Noah (Genesis 8:1). Even when the waiting feels endless, God has not forgotten you.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: patience-tag, young-children audience. Gen 8 flood narrative.",
    tags: [
      { tag_id: "patience-tag", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 31-35. TEENS — underrepresented life-situation tags
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-teen-doubt-thomas",
    title: "It's Okay to Need Proof",
    book_id: "JHN",
    chapter: 20,
    verse_start: 24,
    verse_end: 29,
    context_brief:
      "Everyone told Thomas that Jesus was alive. Thomas said, 'Unless I see the nail marks and put my finger in them, I will not believe.' A week later, Jesus showed up and said, 'Go ahead. Touch them.'",
    modern_moment:
      "Doubt is not the enemy of faith — pretending is. Thomas did not fake belief. He was honest. And Jesus did not shame him — He showed up. If you have questions, ask them. God is not afraid of your doubts.",
    conversation_starters: JSON.stringify([
      "Have you ever doubted something about God? What happened?",
      "Jesus did not reject Thomas for doubting. What does that tell you about how God handles your questions?",
      "What is the difference between doubt that destroys faith and doubt that deepens it?"
    ]),
    going_deeper: "Thomas went from 'I will not believe' to 'My Lord and my God!' — the strongest confession in the Gospels. Honest doubt can lead to the deepest faith.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "jhn-thomas-doubts",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: doubt-tag, teens audience",
    tags: [
      { tag_id: "doubt-tag", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-teen-loneliness-elijah",
    title: "When You Feel Like the Only One",
    book_id: "1KI",
    chapter: 19,
    verse_start: 3,
    verse_end: 18,
    context_brief:
      "Elijah had just defeated 450 prophets of Baal. You would think he would be celebrating. Instead, he ran into the desert, collapsed, and told God he wanted to die. 'I am the only one left,' he said. But God whispered to him — and told him he was not alone.",
    modern_moment:
      "After a big win or in the middle of a hard season, loneliness hits differently. You can be surrounded by people and still feel completely alone. Elijah felt it. God did not lecture him — He fed him, let him sleep, and then whispered.",
    conversation_starters: JSON.stringify([
      "Have you ever felt alone even in a crowd?",
      "God did not shout at Elijah. He whispered. Where do you hear God most clearly?",
      "Elijah thought he was the only faithful person left. God said there were 7,000. Why do we assume we are more alone than we are?"
    ]),
    going_deeper: "God's response to Elijah's depression was not a sermon — it was bread, water, and rest. Sometimes the most spiritual thing you can do is eat and sleep.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "1ki-elijah-flees-to-horeb",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: loneliness-tag, teens audience",
    tags: [
      { tag_id: "loneliness-tag", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "suffering-tag", relevance: "secondary" },
      { tag_id: "rest-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-teen-temptation-joseph",
    title: "When Saying No Costs You Everything",
    book_id: "GEN",
    chapter: 39,
    verse_start: 6,
    verse_end: 20,
    context_brief:
      "Joseph was a slave in Potiphar's house. Potiphar's wife tried to seduce him day after day. Joseph refused. She lied about him and he went to prison. Doing the right thing made his life worse — at least in the short term.",
    modern_moment:
      "Sometimes saying no costs you. Friends drop you. Opportunities disappear. People twist the story. Joseph shows that integrity is not always rewarded immediately — but it is always worth it.",
    conversation_starters: JSON.stringify([
      "Have you ever done the right thing and gotten punished for it?",
      "Joseph ran. Sometimes the best response to temptation is to literally leave. When do you need to just walk away?",
      "How do you hold on to integrity when nobody is going to clap for you?"
    ]),
    going_deeper: "Genesis 39:21 — 'But the LORD was with Joseph.' Even in prison. Integrity does not guarantee comfort, but it guarantees God's presence.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: temptation-tag, teens audience. Joseph in Potiphar's house.",
    tags: [
      { tag_id: "temptation-tag", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "secondary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-teen-failure-peter",
    title: "The Night You Denied Everything",
    book_id: "LUK",
    chapter: 22,
    verse_start: 54,
    verse_end: 62,
    context_brief:
      "Peter swore he would never abandon Jesus. Hours later, he denied knowing Him three times. When the rooster crowed, Jesus looked straight at Peter. Peter went outside and wept bitterly.",
    modern_moment:
      "You said you would not do it. You did it anyway. The shame is crushing. Peter's story is proof that your worst moment is not your last moment. The same Peter who denied Jesus three times became the rock the church was built on.",
    conversation_starters: JSON.stringify([
      "Have you ever failed at something you promised you would do? What did it feel like?",
      "Jesus looked at Peter — not with anger, but with knowing. What does it feel like to be fully known, including your failures?",
      "Peter's story did not end in the courtyard. What does it mean that failure is not final?"
    ]),
    going_deeper: "In John 21, Jesus asks Peter 'Do you love me?' three times — once for each denial. Restoration mirrors the wound. What wound in you needs that kind of patient healing?",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: failure tag, teens audience",
    tags: [
      { tag_id: "failure", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "forgiveness-tag", relevance: "secondary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-teen-anger-jonah",
    title: "Angry at God (and Not Ashamed to Say It)",
    book_id: "JON",
    chapter: 4,
    verse_start: 1,
    verse_end: 11,
    context_brief:
      "Jonah was furious — at God. The Ninevites repented and God forgave them, and Jonah hated it. He sat on a hill and pouted. God grew a plant to shade him, then killed it. Jonah raged about the plant. God said: 'You care about a plant but not 120,000 people?'",
    modern_moment:
      "Sometimes you are angry at God — for what He allows, who He forgives, what He does not fix. Jonah screamed his anger at God. And God did not strike him down. He asked a question. God can handle your anger.",
    conversation_starters: JSON.stringify([
      "Have you ever been angry at God? About what?",
      "Jonah was mad because God was too merciful. Is there a situation where God's forgiveness of someone else bothers you?",
      "God asks Jonah a question and the book just... ends. Why doesn't God give him an answer?"
    ]),
    going_deeper: "The book of Jonah ends with a question, not an answer. Maybe God trusts you enough to sit with the question.",
    audience: "teens",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: anger-tag, teens audience",
    tags: [
      { tag_id: "anger-tag", relevance: "primary" },
      { tag_id: "teens", relevance: "primary" },
      { tag_id: "doubt-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 36-40. ADULTS + remaining life-situation tags
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-adult-work-calling-bezalel",
    title: "Your Work Is Holy (Yes, That Work)",
    book_id: "EXO",
    chapter: 31,
    verse_start: 1,
    verse_end: 11,
    context_brief:
      "God filled Bezalel with His Spirit — not to preach or prophesy, but to do metalwork, carpentry, and design. The first person in the Bible described as 'filled with the Spirit' was an artist and craftsman.",
    modern_moment:
      "We separate 'sacred' and 'secular' work, but God does not. The spreadsheet, the lesson plan, the plumbing repair, the code review — all of it can be done with the same Spirit that built the tabernacle.",
    conversation_starters: JSON.stringify([
      "What is your work — paid or unpaid? Do you ever think of it as holy?",
      "Bezalel used skill AND Spirit. How does excellence in your craft connect to faith?",
      "What would change if you saw Monday morning as sacred as Sunday morning?"
    ]),
    going_deeper: "Colossians 3:23 — 'Whatever you do, work at it with all your heart, as working for the Lord.' Your calling is not just in church. It is wherever your hands are.",
    audience: "adults",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: work-calling tag, adults audience. Exodus 31 tabernacle artisan.",
    tags: [
      { tag_id: "work-calling", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "identity-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-adult-marriage-hosea",
    title: "Love That Stays When Everything Says Leave",
    book_id: "HOS",
    chapter: 3,
    verse_start: 1,
    verse_end: 5,
    context_brief:
      "God told Hosea: 'Go again. Love your wife, even though she is loved by another man and is an adulteress.' Hosea bought Gomer back — not because she deserved it, but because that is what covenant love does.",
    modern_moment:
      "Marriage is hard. Sometimes it feels like the love is gone, the trust is broken, or the distance is too wide. Hosea's story is not a guarantee of fairy-tale endings. It is a picture of love that costs something — love that chooses to stay and rebuild.",
    conversation_starters: JSON.stringify([
      "What does it cost to love someone who has hurt you?",
      "Hosea 'bought back' Gomer. What does redemption look like in a marriage — is it always possible?",
      "How do you distinguish between love that perseveres and love that enables?"
    ]),
    going_deeper: "This passage is ultimately about God's love for Israel — and for us. If your marriage is in a hard season, this is permission to grieve AND to hope.",
    audience: "adults",
    estimated_minutes: 7,
    season: null,
    day_of_year: null,
    narrative_id: "hos-hosea-marries-gomer",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: marriage-struggle tag, adults audience",
    tags: [
      { tag_id: "marriage-struggle", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "forgiveness-tag", relevance: "secondary" },
      { tag_id: "relationships-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-adult-death-lazarus",
    title: "Jesus Wept (And So Can You)",
    book_id: "JHN",
    chapter: 11,
    verse_start: 32,
    verse_end: 44,
    context_brief:
      "Lazarus was dead. Martha and Mary were devastated. Jesus knew He was about to raise Lazarus — He had the power and the plan — and yet He wept. The Son of God cried at a funeral.",
    modern_moment:
      "When you lose someone, well-meaning people say 'they are in a better place.' Maybe. But you are not. Jesus did not bypass grief to get to the miracle. He stopped and wept WITH them first. Your grief is not a lack of faith.",
    conversation_starters: JSON.stringify([
      "Why did Jesus cry if He knew He was about to raise Lazarus?",
      "What loss are you carrying right now that no one fully understands?",
      "How does it change your view of God to know that He weeps with you?"
    ]),
    going_deeper: "John 11:35 is the shortest verse in the Bible but maybe the most important. God is not distant from your pain. He enters it.",
    audience: "adults",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "jhn-raising-of-lazarus",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: death-of-loved-one tag, adults audience",
    tags: [
      { tag_id: "death-of-loved-one", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "grief", relevance: "primary" },
      { tag_id: "suffering-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-adult-stress-martha",
    title: "Busy, Anxious, and Missing the Point",
    book_id: "LUK",
    chapter: 10,
    verse_start: 38,
    verse_end: 42,
    context_brief:
      "Martha was doing everything — cooking, cleaning, hosting. Mary sat at Jesus' feet. Martha snapped: 'Tell her to help me!' Jesus said, 'Martha, you are worried about many things, but only one thing is needed.'",
    modern_moment:
      "The to-do list never ends. The emails, the meals, the obligations — they multiply. Martha was not wrong to serve. She was wrong to let the serving consume her. Sometimes the most productive thing is to stop producing.",
    conversation_starters: JSON.stringify([
      "Are you more of a Martha or a Mary? Is that by choice or by default?",
      "Jesus said 'only one thing is needed.' What is that one thing for you right now?",
      "What would it look like to sit down — literally — for ten minutes today with no agenda?"
    ]),
    going_deeper: "Martha's busyness was not the sin. Her resentment was. When serving becomes a source of bitterness, it has stopped being service.",
    audience: "adults",
    estimated_minutes: 6,
    season: null,
    day_of_year: null,
    narrative_id: "luk-mary-and-martha",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: stress tag, adults audience",
    tags: [
      { tag_id: "stress", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "rest-tag", relevance: "secondary" },
      { tag_id: "joy-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-adult-suffering-job",
    title: "When God Does Not Explain",
    book_id: "JOB",
    chapter: 38,
    verse_start: 1,
    verse_end: 11,
    context_brief:
      "Job lost everything — children, health, wealth. His friends gave bad theology. Finally, God spoke from the whirlwind. But He did not explain why. He said, 'Where were you when I laid the earth's foundation?' God answered Job's questions with bigger questions.",
    modern_moment:
      "You want reasons. You want the 'why.' Job never got one. What he got was God's presence — and somehow that was enough. Not a satisfying ending, but a true one.",
    conversation_starters: JSON.stringify([
      "Have you ever asked God 'why' and gotten silence?",
      "God did not answer Job's question but He showed up. Is presence enough when answers are not?",
      "How do you hold faith and unanswered questions at the same time?"
    ]),
    going_deeper: "Job 42:5 — 'My ears had heard of you but now my eyes have seen you.' Job moved from theology ABOUT God to encounter WITH God. Sometimes that is the only answer.",
    audience: "adults",
    estimated_minutes: 7,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: suffering-tag, adults audience",
    tags: [
      { tag_id: "suffering-tag", relevance: "primary" },
      { tag_id: "adults", relevance: "primary" },
      { tag_id: "doubt-tag", relevance: "secondary" },
      { tag_id: "patience-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // FAMILY MOMENT TAGS (mealtime, bedtime, morning, car-ride, family-meeting)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-bedtime-psalm23",
    title: "Lying Down in Green Pastures",
    book_id: "PSA",
    chapter: 23,
    verse_start: 1,
    verse_end: 6,
    context_brief:
      "David wrote about God as a shepherd who makes him lie down in green pastures and leads him beside still waters. Even in the darkest valley, the shepherd is there.",
    modern_moment:
      "Bedtime can be when the worries come. The room is dark and the thoughts get loud. Psalm 23 is the perfect bedtime prayer: God is close, the valley is not forever, and you can lie down safely because someone is watching over you.",
    conversation_starters: JSON.stringify([
      "What do you think about when you close your eyes at night?",
      "The shepherd stays with the sheep in the dark valley. What 'dark valley' do you need God to walk through with you?",
      "Can you say Psalm 23 together as a family prayer tonight?"
    ]),
    going_deeper: "Try memorizing Psalm 23 as a family — one verse per night at bedtime.",
    audience: "family",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: null,
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: bedtime family-moment tag",
    tags: [
      { tag_id: "bedtime", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "fear-tag", relevance: "secondary" },
      { tag_id: "rest-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-mealtime-feeding-5000",
    title: "A Boy's Lunch That Fed a Crowd",
    book_id: "MRK",
    chapter: 6,
    verse_start: 35,
    verse_end: 44,
    context_brief:
      "Five thousand people were hungry. The disciples said send them away. A boy had five loaves and two fish. Jesus took the small lunch, blessed it, broke it, and there was more than enough for everyone.",
    modern_moment:
      "As you sit around this table, someone prepared this food. It might feel ordinary. But Jesus took ordinary bread and made it extraordinary. Every shared meal is a small miracle — food, family, and gratitude all in one place.",
    conversation_starters: JSON.stringify([
      "The boy shared his lunch. What is something small you could share that might make a big difference?",
      "Jesus blessed the food before breaking it. What are you thankful for at this meal?",
      "There were twelve baskets left over. God gives more than enough. Where have you seen that?"
    ]),
    going_deeper: "Try a new mealtime tradition: before eating, each person names one thing from the day they are grateful for.",
    audience: "family",
    estimated_minutes: 3,
    season: null,
    day_of_year: null,
    narrative_id: "mrk-feeding-five-thousand",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: mealtime family-moment tag",
    tags: [
      { tag_id: "mealtime", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "generosity-tag", relevance: "secondary" },
      { tag_id: "gratitude-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-morning-new-mercies",
    title: "Brand New Mercies This Morning",
    book_id: "LAM",
    chapter: 3,
    verse_start: 22,
    verse_end: 26,
    context_brief:
      "Lamentations is the saddest book in the Bible — Jerusalem has been destroyed. But right in the middle of the tears, this: 'His mercies are new every morning. Great is His faithfulness.'",
    modern_moment:
      "Every morning is a reset. Yesterday's mistakes, yesterday's worries — they do not get the first word today. God's mercies are NEW. Not recycled, not leftover — brand new. Take a breath. This day is a gift.",
    conversation_starters: JSON.stringify([
      "What do you want to leave behind from yesterday?",
      "If God's mercies are new every morning, what does that mean for the mistakes you made yesterday?",
      "What is one thing you are looking forward to today?"
    ]),
    going_deeper: "This verse comes from the darkest book in the Bible. Hope is most powerful when it comes from the hardest places.",
    audience: "family",
    estimated_minutes: 3,
    season: null,
    day_of_year: null,
    narrative_id: "lam-great-is-thy-faithfulness",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: morning family-moment tag",
    tags: [
      { tag_id: "morning", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "gratitude-tag", relevance: "secondary" },
      { tag_id: "forgiveness-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-car-ride-jonah-running",
    title: "Running the Wrong Direction",
    book_id: "JON",
    chapter: 1,
    verse_start: 1,
    verse_end: 5,
    context_brief:
      "God told Jonah to go east to Nineveh. Jonah bought a ticket west to Tarshish — as far away as he could get. He literally ran in the opposite direction from where God told him to go.",
    modern_moment:
      "As you ride in this car, you are going somewhere. But have you ever felt like you were running FROM something instead of TOWARD something? Jonah shows that you can run, but God is patient enough to redirect you.",
    conversation_starters: JSON.stringify([
      "Jonah ran away from God's plan. Have you ever avoided doing something you knew was right?",
      "Where are you headed right now — literally in this car and also in life?",
      "God did not give up on Jonah. What does that tell you about how God handles your detours?"
    ]),
    going_deeper: "Jonah was asleep in the storm. Sometimes avoidance looks like sleep, distraction, or busyness. What are you avoiding?",
    audience: "family",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "jon-running-from-god",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: car-ride family-moment tag",
    tags: [
      { tag_id: "car-ride", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "secondary" }
    ]
  },
  {
    id: "devo-family-meeting-nehemiah-walls",
    title: "When the Whole Family Needs to Build Something Together",
    book_id: "NEH",
    chapter: 4,
    verse_start: 13,
    verse_end: 23,
    context_brief:
      "Nehemiah's wall-building project was under attack. He organized families to work on the section of wall nearest their own homes. Everyone had a role. Everyone mattered.",
    modern_moment:
      "A family meeting means something needs to be built — or rebuilt. Maybe it is trust, a schedule, a plan for a hard season. Nehemiah shows that when everyone has a role and everyone shows up, walls go up faster than anyone expected.",
    conversation_starters: JSON.stringify([
      "Nehemiah assigned sections of wall to families. What is our family building right now?",
      "What is your role in this family? What are you good at contributing?",
      "The workers held a tool in one hand and a weapon in the other — they were prepared for trouble. What challenges might we face, and how do we prepare?"
    ]),
    going_deeper: "Nehemiah 4:20 — 'Our God will fight for us.' The family does not do this alone. God is in the meeting too.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "neh-building-under-threat",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: family-meeting tag",
    tags: [
      { tag_id: "family-meeting", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "courage-tag", relevance: "secondary" },
      { tag_id: "relationships-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 46. NEW BABY — family
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-new-baby-isaac",
    title: "When the Family Gets Bigger",
    book_id: "GEN",
    chapter: 21,
    verse_start: 1,
    verse_end: 7,
    context_brief:
      "Sarah and Abraham waited decades for a baby. When Isaac finally came, Sarah laughed with joy: 'God has brought me laughter!' The name Isaac means 'he laughs.'",
    modern_moment:
      "A new baby changes everything — sleep, schedules, attention, the whole family rhythm. Isaac means laughter. A new sibling is not a replacement — it is an addition to the joy. But it is also okay to feel jealous or weird about it.",
    conversation_starters: JSON.stringify([
      "Sarah laughed when Isaac was born. What is exciting about a new baby in our family?",
      "What is one thing that feels hard or different about having a new baby around?",
      "How can we make sure everyone in the family still feels seen and loved?"
    ]),
    going_deeper: "Abraham and Sarah waited 25 years for this child. Some of the best gifts take the longest to arrive.",
    audience: "family",
    estimated_minutes: 5,
    season: null,
    day_of_year: null,
    narrative_id: "birth-of-isaac",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: new-baby tag",
    tags: [
      { tag_id: "new-baby", relevance: "primary" },
      { tag_id: "family-audience", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "joy-tag", relevance: "secondary" }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // 47. DIVORCE — young children
  // ═══════════════════════════════════════════════════════════════
  {
    id: "devo-yc-divorce-malachi",
    title: "When Mommy and Daddy Live in Different Houses",
    book_id: "MAL",
    chapter: 3,
    verse_start: 16,
    verse_end: 18,
    context_brief:
      "Malachi talks about a 'scroll of remembrance' — God writes down the names of people who love Him. No matter what happens in a family, every child's name is written in God's book.",
    modern_moment:
      "When parents live in different houses, everything feels split in two — your stuff, your time, your heart. But YOU are not split. You are whole. God knows exactly where you are, and He is in both houses.",
    conversation_starters: JSON.stringify([
      "What is the hardest part about going between two houses?",
      "God says He treasures you like a special jewel (Malachi 3:17). How does that make you feel?",
      "Is there anything you want to talk about that feels too big to say?"
    ]),
    going_deeper: "Remind your child: the divorce is not their fault, they are loved by both parents, and God's love for them never moves out.",
    audience: "young-children",
    estimated_minutes: 4,
    season: null,
    day_of_year: null,
    narrative_id: "mal-messenger-of-the-covenant",
    source_tier: "ai_assisted",
    source_notes: "Gap-fill: divorce tag, young-children audience",
    tags: [
      { tag_id: "divorce", relevance: "primary" },
      { tag_id: "young-children", relevance: "primary" },
      { tag_id: "change", relevance: "secondary" },
      { tag_id: "fear-tag", relevance: "secondary" }
    ]
  }
];

// ---------- insert logic ----------
function main() {
  console.log("=== Seeding Devotionals ===");

  const insertDevo = db.prepare(`
    INSERT OR IGNORE INTO devotionals
      (id, title, book_id, chapter, verse_start, verse_end, context_brief,
       modern_moment, conversation_starters, going_deeper, audience,
       estimated_minutes, season, day_of_year, narrative_id,
       source_tier, source_notes, created_at)
    VALUES
      (@id, @title, @book_id, @chapter, @verse_start, @verse_end, @context_brief,
       @modern_moment, @conversation_starters, @going_deeper, @audience,
       @estimated_minutes, @season, @day_of_year, @narrative_id,
       @source_tier, @source_notes, @created_at)
  `);

  const insertTag = db.prepare(`
    INSERT OR IGNORE INTO devotional_tag_map (devotional_id, tag_id, relevance)
    VALUES (@devotional_id, @tag_id, @relevance)
  `);

  const batch = db.transaction(() => {
    for (const d of devotionals) {
      const tags = d.tags;
      const row = { ...d, created_at: NOW };
      delete row.tags;
      insertDevo.run(row);
      for (const t of tags) {
        insertTag.run({ devotional_id: d.id, tag_id: t.tag_id, relevance: t.relevance });
      }
    }
  });

  batch();

  const count = db.prepare("SELECT COUNT(*) as c FROM devotionals").get().c;
  console.log(`Total devotionals after insert: ${count}`);

  // Report tag coverage
  const underserved = db
    .prepare(
      `SELECT dt.id, dt.name, dt.category, COUNT(dtm.id) as uses
       FROM devotional_tags dt
       LEFT JOIN devotional_tag_map dtm ON dt.id = dtm.tag_id
       GROUP BY dt.id
       HAVING uses < 3
       ORDER BY uses ASC`
    )
    .all();

  if (underserved.length > 0) {
    console.log(`\nTags with fewer than 3 devotionals (${underserved.length}):`);
    for (const t of underserved) {
      console.log(`  ${t.id}: ${t.uses} (${t.category})`);
    }
  } else {
    console.log("\nAll tags have 3+ devotionals!");
  }

  // Report audience coverage
  const audiences = db
    .prepare(
      "SELECT audience, COUNT(*) as c FROM devotionals GROUP BY audience ORDER BY c DESC"
    )
    .all();
  console.log("\nAudience breakdown:");
  for (const a of audiences) console.log(`  ${a.audience}: ${a.c}`);

  // Report season coverage
  const seasons = db
    .prepare(
      "SELECT season, COUNT(*) as c FROM devotionals WHERE season IS NOT NULL GROUP BY season ORDER BY c DESC"
    )
    .all();
  console.log("\nSeason breakdown:");
  for (const s of seasons) console.log(`  ${s.season}: ${s.c}`);

  db.close();
}

main();
