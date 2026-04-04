import { ThemeRecord } from "./theme-types";

export const themesVirtuesEmotions: ThemeRecord[] = [
  // ──────────────────────────────────────────────
  // VIRTUE CATEGORY
  // ──────────────────────────────────────────────

  // ── LOVE (top-level) ──
  {
    id: "love",
    name: "Love",
    category: "virtue",
    parentThemeId: null,
    definition:
      "The central ethic of Scripture — a disposition of the will that seeks the genuine good of another, even at personal cost. In the Hebrew Bible, God's hesed (steadfast love) anchors covenant faithfulness; in the New Testament, love fulfills the entire law. It is not mere sentiment but a deliberate, self-giving commitment.",
    modernFraming:
      "Love is choosing to show up for someone when it costs you something — staying on the phone at 2 a.m., forgiving when you'd rather keep score, putting someone else's wellbeing above your convenience.",
    relatedThemes: JSON.stringify(["agape", "faithfulness", "compassion", "grace-unmerited", "covenant", "self-sacrificial-love"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "agape",
    name: "Agape",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "The Greek term for unconditional, self-giving love — the kind God extends to humanity without expecting anything in return. Agape is the word used in John 3:16 and 1 Corinthians 13; it describes a love that is chosen, not earned. It is the highest form of love in the New Testament ethical vision.",
    modernFraming:
      "Agape is the love that keeps loving when the other person has nothing to offer you back — caring for an aging parent who doesn't remember your name, or forgiving a friend who never apologized.",
    relatedThemes: JSON.stringify(["love", "grace-unmerited", "forgiveness", "divine-mercy", "self-sacrificial-love"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "phileo",
    name: "Phileo",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "Brotherly or friendship love — the warm affection shared between companions. This is the love behind Philadelphia ('city of brotherly love') and the bond between David and Jonathan. It is reciprocal, rooted in mutual enjoyment and shared life.",
    modernFraming:
      "Phileo is the friend who knows your coffee order and shows up with it on your worst day — the warmth between people who genuinely like each other, not just love each other out of obligation.",
    relatedThemes: JSON.stringify(["love", "community", "fellowship", "loyalty", "love-of-neighbor"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "storge",
    name: "Storge",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "Natural, familial affection — the instinctive love between parents and children, siblings, and close kin. Though the word itself is rare in the New Testament, the concept saturates Scripture: God as Father, Israel as God's child, the church as family.",
    modernFraming:
      "Storge is the love that doesn't need a reason — your mom saving every terrible drawing you made as a kid, or that automatic protectiveness you feel when your sibling is hurting.",
    relatedThemes: JSON.stringify(["love", "family", "god-as-father", "belonging", "adoption"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "eros",
    name: "Eros",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "Romantic and passionate love, celebrated in Song of Solomon as a gift from God within covenant relationship. While the word 'eros' itself doesn't appear in the New Testament, Scripture treats sexual and romantic love as good when rightly ordered — a mirror of God's passionate desire for his people.",
    modernFraming:
      "Eros is the electricity when someone you love walks into the room — that deep pull toward another person that Scripture says is beautiful, not shameful, when it's part of genuine commitment.",
    relatedThemes: JSON.stringify(["love", "marriage", "desire", "covenant", "beauty"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "self-sacrificial-love",
    name: "Self-Sacrificial Love",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "Love that willingly absorbs cost for someone else's benefit — modeled supremely by Jesus on the cross. 'Greater love has no one than this: to lay down one's life for one's friends' (John 15:13). It stands as the ultimate test of love's authenticity.",
    modernFraming:
      "This is the parent working a second job so their kid can go to college, or the friend who takes the blame so you don't get fired. It's love that shows up in what it's willing to lose.",
    relatedThemes: JSON.stringify(["agape", "atonement", "servanthood", "cross", "redemption", "martyrdom"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "love-of-enemy",
    name: "Love of Enemy",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "Jesus' radical command to extend love, prayer, and genuine goodwill toward those who harm you (Matthew 5:44). This isn't passive tolerance — it's an active refusal to let hatred define you, rooted in the belief that every person bears the image of God, even those who wrong you.",
    modernFraming:
      "Love of enemy is praying for the coworker who threw you under the bus, or refusing to celebrate when someone who hurt you finally fails. It's the hardest kind of love because nothing in you wants to do it.",
    relatedThemes: JSON.stringify(["forgiveness", "agape", "righteous-anger", "reconciliation", "peacemaking", "nonviolence"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "love-of-neighbor",
    name: "Love of Neighbor",
    category: "virtue",
    parentThemeId: "love",
    definition:
      "The second greatest commandment: 'Love your neighbor as yourself' (Leviticus 19:18, Mark 12:31). Jesus' parable of the Good Samaritan radically expands 'neighbor' to include anyone you encounter in need, regardless of ethnicity, religion, or social status.",
    modernFraming:
      "Love of neighbor is shoveling your elderly neighbor's driveway before they wake up, or checking on the quiet kid in class. It's seeing a need right in front of you and choosing not to walk past it.",
    relatedThemes: JSON.stringify(["phileo", "social-justice", "compassion", "community", "hospitality"]),
    sourceTier: "ai_assisted",
  },

  // ── FAITH (top-level) ──
  {
    id: "faith",
    name: "Faith",
    category: "virtue",
    parentThemeId: null,
    definition:
      "In Scripture, faith is confident trust in God's character and promises — the substance of things hoped for, the evidence of things not seen (Hebrews 11:1). It is not blind belief but a settled conviction that shapes action. Abraham's willingness to leave home, Moses' confrontation of Pharaoh — faith always moves the feet.",
    modernFraming:
      "Faith is quitting the safe job because you know you're supposed to, or sitting in a hospital waiting room holding onto something you can't prove but can't let go of either.",
    relatedThemes: JSON.stringify(["trust", "hope", "perseverance-in-faith", "doubt", "obedience"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "trust",
    name: "Trust",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "The relational dimension of faith — placing confident reliance on God's goodness even when circumstances suggest otherwise. The Psalms are full of trust language: 'In God I trust; I will not be afraid' (Psalm 56:4). Trust is faith made personal.",
    modernFraming:
      "Trust is the thing that breaks when someone lies to you and the thing that costs everything to rebuild. With God, it's choosing to believe the story isn't over when every chapter so far looks bleak.",
    relatedThemes: JSON.stringify(["faith", "faithfulness", "betrayal", "vulnerability", "waiting-on-god"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "belief",
    name: "Belief",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "The intellectual assent and personal conviction that God exists, that his word is true, and that Jesus is who he claimed to be. In the Gospel of John, belief (pisteuō) is the central human response to God — not just agreeing with facts but staking your life on them.",
    modernFraming:
      "Belief is what you're really choosing when someone asks 'but do you actually think this is true?' It's the moment where knowing about God becomes knowing God.",
    relatedThemes: JSON.stringify(["faith", "doubt", "revelation", "truth", "conversion"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "faithfulness",
    name: "Faithfulness",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "Steadfast loyalty and reliability over time — one of the fruits of the Spirit (Galatians 5:22). God's faithfulness is the bedrock of the entire biblical story: he keeps his promises across generations, even when his people don't keep theirs. Human faithfulness mirrors this divine consistency.",
    modernFraming:
      "Faithfulness is the friend who's still there ten years later, the spouse who stays when it gets hard, the person who does what they said they'd do even when nobody's watching.",
    relatedThemes: JSON.stringify(["faith", "trust", "covenant", "keeping-promises", "loyalty", "hesed"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "perseverance-in-faith",
    name: "Perseverance in Faith",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "The gritty, long-haul commitment to keep believing when everything says stop. Hebrews 12 pictures it as a race; James says testing produces endurance. It's not the absence of doubt but the refusal to let doubt have the final word.",
    modernFraming:
      "Perseverance is still praying after years of silence, still showing up to church when you feel nothing, still choosing hope on the morning after the worst night. It's faith that outlasts feelings.",
    relatedThemes: JSON.stringify(["faith", "endurance", "hope-in-suffering", "patience", "dark-night-of-soul"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mustard-seed-faith",
    name: "Mustard Seed Faith",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "Jesus' teaching that even tiny, genuine faith can accomplish extraordinary things (Matthew 17:20). The point isn't the size of your faith but the size of the God your faith is in. A mustard seed is almost invisible, yet it grows into the largest garden plant.",
    modernFraming:
      "Mustard seed faith is whispering 'okay, God, I'll try' when you can barely get out of bed — and then watching that bare minimum somehow become the start of something you couldn't have engineered.",
    relatedThemes: JSON.stringify(["faith", "trust", "kingdom-of-god", "growth", "weakness"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "faith-vs-sight",
    name: "Faith vs. Sight",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "The tension between trusting what God has promised and relying only on what can be seen and measured. Paul writes, 'We walk by faith, not by sight' (2 Corinthians 5:7). Thomas needed to see and touch; Jesus blessed those who believe without seeing.",
    modernFraming:
      "Faith vs. sight is the tension between your bank account and your calling, between the MRI results and the prayer you prayed. It's every moment where the evidence says one thing and your gut — or God — says another.",
    relatedThemes: JSON.stringify(["faith", "doubt", "trust", "revelation", "mystery"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "faith-and-works",
    name: "Faith and Works",
    category: "virtue",
    parentThemeId: "faith",
    definition:
      "The relationship between believing and doing — a tension explored most sharply by Paul and James. Paul insists salvation comes through faith, not works (Ephesians 2:8-9); James insists faith without works is dead (James 2:26). Together they teach that genuine faith naturally produces action.",
    modernFraming:
      "Faith and works is the difference between saying you care about homelessness and actually volunteering at a shelter. Real belief changes your schedule, your wallet, your hands — not just your opinions.",
    relatedThemes: JSON.stringify(["faith", "obedience", "servanthood", "sanctification", "hypocrisy"]),
    sourceTier: "ai_assisted",
  },

  // ── HOPE (top-level) ──
  {
    id: "hope",
    name: "Hope",
    category: "virtue",
    parentThemeId: null,
    definition:
      "Biblical hope is not wishful thinking but confident expectation grounded in God's track record. It faces suffering honestly while insisting that God's future is brighter than the present darkness. Hope anchors the soul (Hebrews 6:19) and refuses to let current pain be the final chapter.",
    modernFraming:
      "Hope is what keeps you applying for jobs after the hundredth rejection, or planting a garden in a neighborhood everyone else has given up on. It's stubborn belief that tomorrow can be different.",
    relatedThemes: JSON.stringify(["faith", "eschatological-hope", "resurrection-hope", "despair", "waiting-on-god"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "eschatological-hope",
    name: "Eschatological Hope",
    category: "virtue",
    parentThemeId: "hope",
    definition:
      "Hope oriented toward God's ultimate future — the new creation, the final defeat of evil, the restoration of all things. This is the hope of Revelation 21: no more tears, no more death. It provides a horizon that reframes present suffering as temporary.",
    modernFraming:
      "Eschatological hope is what sustains you when the news is unbearable — the deep-down conviction that the world's brokenness isn't permanent, that injustice and suffering get the second-to-last word, not the last.",
    relatedThemes: JSON.stringify(["hope", "resurrection-hope", "kingdom-of-god", "new-creation", "second-coming", "justice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hope-in-suffering",
    name: "Hope in Suffering",
    category: "virtue",
    parentThemeId: "hope",
    definition:
      "The paradoxical biblical claim that suffering can produce hope rather than destroy it. Romans 5:3-5 traces the path: suffering produces endurance, endurance produces character, character produces hope. The cross itself is the ultimate example — the worst thing that ever happened became the best thing that ever happened.",
    modernFraming:
      "Hope in suffering is the cancer survivor who starts a foundation, or the grieving parent who mentors other grieving parents. It's the strange alchemy where your deepest wound becomes your most credible voice.",
    relatedThemes: JSON.stringify(["hope", "grief", "perseverance-in-faith", "joy-in-suffering", "lament", "redemption"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hope-deferred",
    name: "Hope Deferred",
    category: "virtue",
    parentThemeId: "hope",
    definition:
      "Proverbs 13:12 says 'Hope deferred makes the heart sick.' This theme captures the ache of unanswered prayer, unfulfilled promises, and seasons where God seems silent. Israel waited 400 years between Malachi and Matthew. Abraham waited decades for Isaac. Delayed hope is real hope tested by time.",
    modernFraming:
      "Hope deferred is the couple who's been trying to have a baby for years, the resume that keeps getting passed over, the prayer you've prayed so many times you've lost count. It's hope that hurts.",
    relatedThemes: JSON.stringify(["hope", "waiting-on-god", "patience", "despair", "lament", "unanswered-prayer"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "resurrection-hope",
    name: "Resurrection Hope",
    category: "virtue",
    parentThemeId: "hope",
    definition:
      "The specifically Christian confidence that because Jesus rose from the dead, death does not get the final word — not for individuals, and not for the world. Paul says if there's no resurrection, faith is futile (1 Corinthians 15:17). Resurrection hope means every ending is potentially a beginning.",
    modernFraming:
      "Resurrection hope is what lets you start over after divorce, after bankruptcy, after the thing you thought would end you. It's the stubborn belief that dead things can come back to life — relationships, dreams, even you.",
    relatedThemes: JSON.stringify(["hope", "eschatological-hope", "atonement", "new-creation", "death", "eternal-life"]),
    sourceTier: "ai_assisted",
  },

  // ── JUSTICE (top-level) ──
  {
    id: "justice",
    name: "Justice",
    category: "virtue",
    parentThemeId: null,
    definition:
      "In Scripture, justice (mishpat) is not merely punitive — it's restorative. God's justice sets things right: defending the vulnerable, correcting oppression, ensuring fair treatment. The prophets hammer this theme relentlessly: God cares less about religious performance and more about whether the widow and orphan are protected.",
    modernFraming:
      "Justice isn't just a biblical concept — it's the feeling when someone cuts in line, when a court ruling feels wrong, when a system fails the people it was designed to protect. It's the ache for things to be made right.",
    relatedThemes: JSON.stringify(["mercy", "social-justice", "divine-justice", "righteousness", "oppression", "injustice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "social-justice",
    name: "Social Justice",
    category: "virtue",
    parentThemeId: "justice",
    definition:
      "The prophetic insistence that faith must produce tangible equity and care for the marginalized. Amos thunders, 'Let justice roll down like waters' (5:24). Isaiah 58 defines true worship as loosening chains, sharing food, and sheltering the homeless. Social justice is worship made visible.",
    modernFraming:
      "Social justice is volunteering at a food bank, advocating for fair wages, or speaking up when someone's being treated differently because of where they're from. It's faith that gets its hands dirty.",
    relatedThemes: JSON.stringify(["justice", "justice-for-oppressed", "love-of-neighbor", "compassion", "prophetic-voice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-justice",
    name: "Divine Justice",
    category: "virtue",
    parentThemeId: "justice",
    definition:
      "God's perfect capacity to judge rightly — to see every hidden motive, weigh every action, and render a verdict that is simultaneously fair and merciful. Divine justice is what makes mercy meaningful: forgiveness costs something because the offense was real. God doesn't pretend wrong didn't happen; he addresses it fully.",
    modernFraming:
      "Divine justice is the deep relief of knowing that even when human courts fail, even when the powerful get away with it here, nothing escapes final reckoning. Someone is keeping score accurately.",
    relatedThemes: JSON.stringify(["justice", "wrath-of-god", "mercy", "atonement", "judgment", "sovereignty"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "restorative-justice",
    name: "Restorative Justice",
    category: "virtue",
    parentThemeId: "justice",
    definition:
      "Justice oriented not primarily toward punishment but toward repair — making victims whole, transforming offenders, and healing communities. Zacchaeus repaying fourfold what he stole (Luke 19) exemplifies restorative justice. God's aim is not merely to condemn but to restore.",
    modernFraming:
      "Restorative justice is the school that replaces suspensions with circles where kids talk through what happened, or the community program where offenders hear directly from the people they harmed. It asks: how do we make this right?",
    relatedThemes: JSON.stringify(["justice", "forgiveness", "reconciliation", "second-chances", "redemption"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "justice-for-oppressed",
    name: "Justice for the Oppressed",
    category: "virtue",
    parentThemeId: "justice",
    definition:
      "God's particular concern for those crushed by systems of power — the widow, the orphan, the foreigner, the poor. Psalm 146:7 declares God 'executes justice for the oppressed.' Throughout Scripture, how a society treats its most vulnerable members reveals the true state of its heart.",
    modernFraming:
      "Justice for the oppressed is the nagging conviction when you drive past a homeless encampment, or hear about wage theft, or watch a family get evicted. It's God saying: these people are not invisible to me.",
    relatedThemes: JSON.stringify(["justice", "social-justice", "compassion", "poverty", "oppression", "liberation"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "injustice",
    name: "Injustice",
    category: "virtue",
    parentThemeId: "justice",
    definition:
      "The violation of God's created order — when power is abused, the vulnerable are exploited, and the scales are deliberately tipped. The prophets rage against injustice as a direct offense to God's character. Injustice isn't just bad policy; it's a theological crisis, because every person bears the image of God.",
    modernFraming:
      "Injustice is the knot in your stomach when someone gets away with something because of who they know, or when the rules seem to apply differently depending on your zip code or skin color.",
    relatedThemes: JSON.stringify(["justice", "oppression", "righteous-anger", "lament", "divine-justice", "social-justice"]),
    sourceTier: "ai_assisted",
  },

  // ── MERCY (top-level) ──
  {
    id: "mercy",
    name: "Mercy",
    category: "virtue",
    parentThemeId: null,
    definition:
      "Not getting what you deserve — the decision to withhold punishment and extend kindness instead. In Hebrew, mercy (rachamim) shares a root with 'womb,' suggesting a deep, gut-level tenderness. God's mercy is not weakness; it is strength choosing compassion over condemnation.",
    modernFraming:
      "Mercy is the cop who gives a warning instead of a ticket, the teacher who lets you retake the exam, the friend who doesn't bring up your worst moment even though they could. It's being let off a hook you genuinely deserved to be on.",
    relatedThemes: JSON.stringify(["justice", "grace-unmerited", "compassion", "forgiveness", "divine-mercy"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "compassion",
    name: "Compassion",
    category: "virtue",
    parentThemeId: "mercy",
    definition:
      "Literally 'suffering with' — the capacity to feel another's pain and be moved to act. When Jesus saw crowds, he was 'moved with compassion' (splanchnizomai — a visceral, gut-deep emotion). Compassion is mercy's engine: it bridges the gap between seeing need and doing something about it.",
    modernFraming:
      "Compassion is what happens when a news story makes you cry and then makes you write a check or show up. It's the difference between saying 'that's sad' and actually entering someone else's pain.",
    relatedThemes: JSON.stringify(["mercy", "love-of-neighbor", "empathy", "servanthood", "suffering"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "forgiveness",
    name: "Forgiveness",
    category: "virtue",
    parentThemeId: "mercy",
    definition:
      "The deliberate release of a debt someone owes you — canceling what they owe emotionally, relationally, or materially. Jesus taught that forgiveness isn't optional ('seventy times seven,' Matthew 18:22) and modeled it from the cross ('Father, forgive them'). Forgiveness doesn't mean pretending nothing happened; it means choosing not to make them pay.",
    modernFraming:
      "Forgiveness is deleting the screenshot you saved to use against someone, or deciding not to bring up that thing from five years ago in the next argument. It hurts, it's slow, and it's the only path to freedom.",
    relatedThemes: JSON.stringify(["mercy", "grace-unmerited", "reconciliation", "bitterness", "resentment", "love-of-enemy"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "grace-unmerited",
    name: "Grace (Unmerited Favor)",
    category: "virtue",
    parentThemeId: "mercy",
    definition:
      "Getting what you don't deserve — God's free and unearned favor toward those who have done nothing to qualify for it. Grace is the through-line of the gospel: while we were still sinners, Christ died for us (Romans 5:8). It disrupts every merit-based system and offends every scorekeeper.",
    modernFraming:
      "Grace is the scholarship you didn't earn, the second chance from a boss who had every right to fire you, the love that shows up when you've been at your absolute worst. It's the gift that makes no economic sense.",
    relatedThemes: JSON.stringify(["mercy", "forgiveness", "agape", "salvation", "atonement", "second-chances"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "second-chances",
    name: "Second Chances",
    category: "virtue",
    parentThemeId: "mercy",
    definition:
      "God's pattern of restoring people after failure — Jonah gets a second call, Peter is reinstated after denial, Israel is brought back from exile. The biblical God is relentlessly in the business of do-overs, not because failure doesn't matter but because people matter more.",
    modernFraming:
      "Second chances are the re-enrollment after dropping out, the relationship rebuilt after betrayal, the job offer after you blew the first interview. It's the moment someone says 'let's try again' when you expected them to say 'we're done.'",
    relatedThemes: JSON.stringify(["grace-unmerited", "forgiveness", "restoration-from-shame", "redemption", "repentance"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-mercy",
    name: "Divine Mercy",
    category: "virtue",
    parentThemeId: "mercy",
    definition:
      "God's specific, active compassion toward sinful and suffering humanity — the reason the story keeps going instead of ending in Genesis 3. God 'delights in mercy' (Micah 7:18). Divine mercy is not God looking the other way; it's God looking directly at the mess and choosing love anyway.",
    modernFraming:
      "Divine mercy is the moment in prayer when you feel forgiven for the thing you can't forgive yourself for — when the weight lifts and you realize God isn't keeping a list, even if you are.",
    relatedThemes: JSON.stringify(["mercy", "grace-unmerited", "compassion", "forgiveness", "god-as-father", "hesed"]),
    sourceTier: "ai_assisted",
  },

  // ── COURAGE (top-level) ──
  {
    id: "courage",
    name: "Courage",
    category: "virtue",
    parentThemeId: null,
    definition:
      "The strength to act rightly in the face of danger, opposition, or fear. 'Be strong and courageous' is God's repeated command to Joshua, to David, to the exiles. Biblical courage is not the absence of fear but obedience that persists despite it. It is always rooted in God's presence: 'for the LORD your God is with you.'",
    modernFraming:
      "Courage is speaking up in a meeting when everyone else stays silent, standing by your values when they're unpopular, or walking into a hard conversation you've been avoiding for months.",
    relatedThemes: JSON.stringify(["faith", "fear", "moral-courage", "overcoming-fear", "perseverance-in-faith"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "moral-courage",
    name: "Moral Courage",
    category: "virtue",
    parentThemeId: "courage",
    definition:
      "The willingness to do what is right even when it is socially, professionally, or personally costly. The Hebrew midwives defied Pharaoh to save babies (Exodus 1). Nathan confronted King David's sin to his face. Moral courage risks reputation and comfort for the sake of what is true.",
    modernFraming:
      "Moral courage is reporting the fraud even though it means losing your job, or telling your friend the truth they don't want to hear. It's choosing integrity when silence would be so much easier.",
    relatedThemes: JSON.stringify(["courage", "integrity", "honesty", "standing-alone", "prophetic-voice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "physical-courage",
    name: "Physical Courage",
    category: "virtue",
    parentThemeId: "courage",
    definition:
      "Bravery in the face of bodily danger — David facing Goliath, Daniel entering the lion's den, Shadrach, Meshach, and Abednego walking into the furnace. These stories don't glorify recklessness; they demonstrate that loyalty to God sometimes puts your body on the line.",
    modernFraming:
      "Physical courage is the firefighter running into the building, the protester standing in front of the tank, the person who intervenes when someone's being attacked on the subway. It's your body saying yes when your instincts scream run.",
    relatedThemes: JSON.stringify(["courage", "faith", "martyrdom", "fear-of-death", "self-sacrificial-love"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "courage-in-faith",
    name: "Courage in Faith",
    category: "virtue",
    parentThemeId: "courage",
    definition:
      "The specific courage required to follow God into the unknown — Abraham leaving Ur, Moses approaching the burning bush, Mary saying yes to the angel. This is courage fueled not by personal confidence but by trust in God's faithfulness even when the path ahead is invisible.",
    modernFraming:
      "Courage in faith is saying yes to the mission trip when you've never left your state, or planting a church in a neighborhood everyone else has written off. It's obedience before you see the map.",
    relatedThemes: JSON.stringify(["courage", "faith", "trust", "obedience", "calling"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "standing-alone",
    name: "Standing Alone",
    category: "virtue",
    parentThemeId: "courage",
    definition:
      "The courage to hold a position when no one else will — Elijah against 450 prophets of Baal, Jeremiah prophesying to a hostile nation, Jesus in Gethsemane while the disciples slept. Sometimes faithfulness means being the only one in the room who sees it differently.",
    modernFraming:
      "Standing alone is being the only person at the table who disagrees, the whistleblower who loses friends, the kid who refuses to join the bullying. It's the loneliest kind of brave.",
    relatedThemes: JSON.stringify(["courage", "moral-courage", "loneliness", "isolation", "integrity", "prophetic-voice"]),
    sourceTier: "ai_assisted",
  },

  // ── HUMILITY (top-level) ──
  {
    id: "humility",
    name: "Humility",
    category: "virtue",
    parentThemeId: null,
    definition:
      "An accurate view of yourself before God — not thinking less of yourself, but thinking of yourself less. Jesus washed feet (John 13), Paul counted his credentials as rubbish (Philippians 3), and Mary said 'let it be to me according to your word.' Humility is strength under control, not weakness.",
    modernFraming:
      "Humility is the CEO who eats lunch in the break room, the expert who says 'I don't know,' and the leader who gives credit to the team. It's being secure enough to not need to prove you're the smartest person in the room.",
    relatedThemes: JSON.stringify(["servanthood", "meekness", "pride", "self-denial", "wisdom"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "meekness",
    name: "Meekness",
    category: "virtue",
    parentThemeId: "humility",
    definition:
      "Power under restraint — not timidity but controlled strength. Jesus called himself 'meek and lowly in heart' (Matthew 11:29), yet he overturned tables and confronted the powerful. Moses was called the meekest man on earth (Numbers 12:3) while leading a nation through the wilderness. Meekness is choosing not to use the power you have.",
    modernFraming:
      "Meekness is the boss who never raises their voice, the black belt who walks away from a fight, the person who could destroy you in an argument but chooses to listen instead.",
    relatedThemes: JSON.stringify(["humility", "patience", "self-denial", "gentleness", "strength"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "servanthood",
    name: "Servanthood",
    category: "virtue",
    parentThemeId: "humility",
    definition:
      "The deliberate choice to place others' needs above your own status — modeled by Jesus who 'did not come to be served, but to serve' (Mark 10:45). In a world obsessed with climbing, servanthood walks downward. It redefines greatness as willingness to do the unglamorous work.",
    modernFraming:
      "Servanthood is cleaning up after the event when everyone else has left, mentoring someone who can't advance your career, or doing the work that never gets thanked. It's leading from the bottom.",
    relatedThemes: JSON.stringify(["humility", "self-sacrificial-love", "leadership", "washing-feet", "faith-and-works"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "self-denial",
    name: "Self-Denial",
    category: "virtue",
    parentThemeId: "humility",
    definition:
      "Jesus' call to 'deny yourself, take up your cross, and follow me' (Matthew 16:24) — the voluntary surrender of comfort, preference, and self-interest for the sake of following God. Self-denial is not self-hatred; it is reordering priorities so that God's purposes come first.",
    modernFraming:
      "Self-denial is fasting when you'd rather eat, giving when you'd rather save, and staying quiet when you'd rather defend yourself. It's the daily discipline of saying 'not my will' in a culture that worships 'my truth.'",
    relatedThemes: JSON.stringify(["humility", "self-sacrificial-love", "discipline", "fasting", "cross"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "humility-before-god",
    name: "Humility Before God",
    category: "virtue",
    parentThemeId: "humility",
    definition:
      "The posture of recognizing God's infinite greatness and your own finite place — not groveling but honestly acknowledging the gap. Job's response after encountering God directly ('I spoke of things I did not understand,' Job 42:3) and Isaiah's 'I am undone' capture this trembling awe.",
    modernFraming:
      "Humility before God is the moment you stop arguing with the diagnosis, the loss, the closed door — and instead say 'I don't understand this, but I trust you.' It's surrender, not defeat.",
    relatedThemes: JSON.stringify(["humility", "fear-of-god", "worship", "surrender", "sovereignty"]),
    sourceTier: "ai_assisted",
  },

  // ── WISDOM (top-level) ──
  {
    id: "wisdom",
    name: "Wisdom",
    category: "virtue",
    parentThemeId: null,
    definition:
      "The skill of living well — seeing reality clearly and responding appropriately. In Proverbs, wisdom is personified as a woman calling out in the streets (Proverbs 8). Biblical wisdom begins with 'the fear of the LORD' (Proverbs 9:10) and works itself out in practical decision-making, moral clarity, and relational intelligence.",
    modernFraming:
      "Wisdom is knowing when to speak and when to stay quiet, when to push and when to wait, when to hold on and when to let go. It's the friend whose advice you actually trust because they've earned it.",
    relatedThemes: JSON.stringify(["discernment", "foolishness", "humility", "fear-of-god", "knowledge"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "discernment",
    name: "Discernment",
    category: "virtue",
    parentThemeId: "wisdom",
    definition:
      "The ability to distinguish truth from deception, good from evil, and wisdom from foolishness — especially when the difference is subtle. Solomon asked God for a 'discerning heart' (1 Kings 3:9). Paul prays that believers' love would abound 'in knowledge and depth of insight' (Philippians 1:9). Discernment sees what's really going on beneath the surface.",
    modernFraming:
      "Discernment is the gut feeling that something is off about a deal that looks perfect on paper, or knowing which friend is genuinely asking for advice and which one just wants validation.",
    relatedThemes: JSON.stringify(["wisdom", "practical-wisdom", "truth", "deception", "holy-spirit"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "practical-wisdom",
    name: "Practical Wisdom",
    category: "virtue",
    parentThemeId: "wisdom",
    definition:
      "The applied dimension of wisdom — knowing what to do in specific, messy, real-life situations. Proverbs is a masterclass: how to handle money, friendships, anger, laziness, and speech. Practical wisdom bridges the gap between knowing what's right and actually doing it well in context.",
    modernFraming:
      "Practical wisdom is knowing the right thing to say at a funeral (and knowing not to say 'everything happens for a reason'), or understanding that being right doesn't mean being right now.",
    relatedThemes: JSON.stringify(["wisdom", "discernment", "patience", "self-control", "stewardship"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "foolishness",
    name: "Foolishness",
    category: "virtue",
    parentThemeId: "wisdom",
    definition:
      "In Proverbs, the fool is not stupid but morally stubborn — someone who refuses correction, despises wisdom, and insists on their own way. Foolishness also has a paradoxical positive sense: the 'foolishness of the cross' (1 Corinthians 1:18) overturns worldly wisdom entirely.",
    modernFraming:
      "Foolishness is doubling down on a bad decision because you don't want to admit you were wrong, or ignoring every warning sign because you 'know better.' But sometimes the foolish-looking choice — forgiving, giving, trusting — turns out to be the wisest one.",
    relatedThemes: JSON.stringify(["wisdom", "pride", "humility", "repentance", "discernment"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wisdom-vs-knowledge",
    name: "Wisdom vs. Knowledge",
    category: "virtue",
    parentThemeId: "wisdom",
    definition:
      "Knowledge is data; wisdom is knowing what to do with it. Paul warns that 'knowledge puffs up, but love builds up' (1 Corinthians 8:1). Solomon could catalog plants and animals and also navigate human conflict. The biblical ideal integrates information with moral character and relational sensitivity.",
    modernFraming:
      "Wisdom vs. knowledge is the difference between your doctor who has all the facts and the one who knows how to deliver hard news with kindness. You can ace every test and still make terrible life choices.",
    relatedThemes: JSON.stringify(["wisdom", "discernment", "humility", "pride", "truth"]),
    sourceTier: "ai_assisted",
  },

  // ── INTEGRITY (top-level) ──
  {
    id: "integrity",
    name: "Integrity",
    category: "virtue",
    parentThemeId: null,
    definition:
      "Wholeness between what you believe, say, and do — being the same person in public and private. The Hebrew word (tom) suggests completeness, blamelessness. Job's integrity was the one thing even God pointed to (Job 2:3). Integrity means your life tells a consistent story.",
    modernFraming:
      "Integrity is being the same person on social media that you are at the dinner table, or keeping the promise even when it costs more than you expected. It's what you do when nobody's watching.",
    relatedThemes: JSON.stringify(["honesty", "truthfulness", "consistency", "hypocrisy", "moral-courage"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "honesty",
    name: "Honesty",
    category: "virtue",
    parentThemeId: "integrity",
    definition:
      "Truthful speech and transparent dealing — 'let your yes be yes and your no be no' (Matthew 5:37). Scripture condemns false witness, deceptive scales, and flattering lips. Honesty is the baseline of trust in any relationship, human or divine.",
    modernFraming:
      "Honesty is telling your friend the outfit doesn't work, admitting you made the mistake before someone else finds out, or saying 'I don't know' instead of bluffing your way through a meeting.",
    relatedThemes: JSON.stringify(["integrity", "truthfulness", "trust", "deception", "keeping-promises"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "truthfulness",
    name: "Truthfulness",
    category: "virtue",
    parentThemeId: "integrity",
    definition:
      "A commitment to reality as God sees it — not just avoiding lies but actively embodying truth. Jesus called himself 'the way, the truth, and the life' (John 14:6). Truthfulness goes beyond factual accuracy to living authentically, without masks or pretense.",
    modernFraming:
      "Truthfulness is the courage to say 'I'm not okay' when someone asks how you're doing, or refusing to spin a story to make yourself look better. It's exhausting to maintain a lie; truth is freedom.",
    relatedThemes: JSON.stringify(["integrity", "honesty", "authenticity", "deception", "confession"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "consistency",
    name: "Consistency",
    category: "virtue",
    parentThemeId: "integrity",
    definition:
      "Reliability over time — being the same person under pressure that you are in peace. God's consistency (immutability) is the foundation of all trust: 'I the LORD do not change' (Malachi 3:6). Human consistency reflects divine character and builds the credibility that makes influence possible.",
    modernFraming:
      "Consistency is the parent who follows through on consequences every time, the leader who applies the same rules to everyone, and the friend who shows up — not just for the dramatic moments, but for the boring Tuesday ones.",
    relatedThemes: JSON.stringify(["integrity", "faithfulness", "discipline", "trust", "hypocrisy"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "keeping-promises",
    name: "Keeping Promises",
    category: "virtue",
    parentThemeId: "integrity",
    definition:
      "Honoring your word even when circumstances change — modeled by God's covenant faithfulness throughout the entire biblical narrative. Psalm 15 describes the person who 'keeps their oath even when it hurts.' In a world of fine print and loopholes, keeping promises is radical faithfulness.",
    modernFraming:
      "Keeping promises is showing up to help your friend move even though it's raining and you're tired, or honoring a commitment when a better offer comes along. It's your word meaning something.",
    relatedThemes: JSON.stringify(["integrity", "faithfulness", "covenant", "trust", "honesty"]),
    sourceTier: "ai_assisted",
  },

  // ── PATIENCE (top-level) ──
  {
    id: "patience",
    name: "Patience",
    category: "virtue",
    parentThemeId: null,
    definition:
      "The capacity to endure delay, suffering, or provocation without losing composure or faith. Patience (makrothymia, 'long-tempered') is a fruit of the Spirit and a defining attribute of God himself — 'slow to anger, abounding in love' (Exodus 34:6). Biblical patience isn't passive; it's active waiting with purpose.",
    modernFraming:
      "Patience is not honking at the car in front of you, but it's also not scrolling on your phone while your kid tells you a long, winding story. It's giving people and situations the time they need, even when you want to force the ending.",
    relatedThemes: JSON.stringify(["endurance", "waiting-on-god", "long-suffering", "hope-deferred", "self-control"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "endurance",
    name: "Endurance",
    category: "virtue",
    parentThemeId: "patience",
    definition:
      "The ability to keep going under sustained pressure — hypomonē in Greek, one of the New Testament's favorite words. Hebrews 12 pictures faith as a long race requiring endurance. It's not a burst of energy but a marathon capacity to persist when the road is long and the results are invisible.",
    modernFraming:
      "Endurance is the grad student in year seven, the recovering addict on day 412, the single parent who just keeps showing up. It's not glamorous — it's just refusing to quit.",
    relatedThemes: JSON.stringify(["patience", "perseverance-in-faith", "suffering", "hope-in-suffering", "discipline"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "long-suffering",
    name: "Long-Suffering",
    category: "virtue",
    parentThemeId: "patience",
    definition:
      "Bearing pain or provocation for an extended time without retaliation or bitterness. This is God's posture toward a rebellious Israel over centuries, and the calling of believers toward difficult people. Long-suffering is patience with a cost — it absorbs pain rather than passing it along.",
    modernFraming:
      "Long-suffering is the parent of a prodigal child who keeps the light on year after year, or the person in a difficult marriage who chooses grace one more time. It's love measured not in moments but in decades.",
    relatedThemes: JSON.stringify(["patience", "endurance", "forgiveness", "compassion", "hope-deferred"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "waiting-on-god",
    name: "Waiting on God",
    category: "virtue",
    parentThemeId: "patience",
    definition:
      "The specific spiritual discipline of trusting God's timing rather than forcing your own. 'Those who wait on the LORD shall renew their strength' (Isaiah 40:31). The Psalms are full of waiting: waiting for deliverance, for justice, for an answer. It's the hardest form of trust because it requires doing nothing visibly productive.",
    modernFraming:
      "Waiting on God is the silence after the prayer, the gap between the promise and the fulfillment, the season where nothing seems to be happening and you have to choose whether to force it or trust it.",
    relatedThemes: JSON.stringify(["patience", "hope-deferred", "trust", "faith-vs-sight", "surrender"]),
    sourceTier: "ai_assisted",
  },

  // ──────────────────────────────────────────────
  // EMOTION CATEGORY
  // ──────────────────────────────────────────────

  // ── GRIEF (top-level) ──
  {
    id: "grief",
    name: "Grief",
    category: "emotion",
    parentThemeId: null,
    definition:
      "The deep sorrow that accompanies loss — of people, places, possibilities, or the way things were supposed to be. 'Jesus wept' (John 11:35) is the shortest verse in the Bible and one of the most profound: God himself grieves. The Psalms of lament give grief a voice, refusing to sanitize pain.",
    modernFraming:
      "Grief is the wave that hits you in the grocery store when you reach for their favorite cereal, or the silence in a house that used to be loud. It doesn't follow a schedule and it doesn't ask permission.",
    relatedThemes: JSON.stringify(["mourning", "lament", "loss-of-loved-one", "hope", "comfort"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mourning",
    name: "Mourning",
    category: "emotion",
    parentThemeId: "grief",
    definition:
      "The outward expression of grief — tearing clothes, sitting in ashes, weeping publicly. In biblical culture, mourning was communal and embodied, not hidden or rushed. 'Blessed are those who mourn, for they shall be comforted' (Matthew 5:4) — Jesus promises that grief expressed openly will be met with God's presence.",
    modernFraming:
      "Mourning is wearing black to the funeral, but it's also crying in the shower six months later when nobody's watching. It's giving your grief a body, a sound, a ritual — instead of stuffing it down and pretending you're fine.",
    relatedThemes: JSON.stringify(["grief", "lament", "comfort", "community", "death"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "lament",
    name: "Lament",
    category: "emotion",
    parentThemeId: "grief",
    definition:
      "A structured cry of pain directed at God — not the absence of faith but faith in its rawest form. Nearly a third of the Psalms are laments. The book of Lamentations gives an entire nation permission to scream. Lament says: 'God, this is unbearable, and I'm bringing it to you because I still believe you can do something about it.'",
    modernFraming:
      "Lament is the prayer that sounds like yelling, the journal entry that's all questions and no answers, the worship song that starts in a minor key. It's honest with God instead of polite.",
    relatedThemes: JSON.stringify(["grief", "mourning", "anger", "hope-in-suffering", "prayer", "psalms"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "loss-of-loved-one",
    name: "Loss of a Loved One",
    category: "emotion",
    parentThemeId: "grief",
    definition:
      "The specific grief of death — David mourning Absalom ('O my son, my son!'), Martha and Mary weeping over Lazarus, Jacob tearing his clothes over Joseph. Scripture never minimizes this pain or rushes past it. The Bible takes death seriously because it takes life seriously.",
    modernFraming:
      "Loss of a loved one is the empty chair at Thanksgiving, the phone number you can't delete, the reflex to text them something funny before remembering. It reshapes your entire world without asking.",
    relatedThemes: JSON.stringify(["grief", "mourning", "death", "resurrection-hope", "comfort", "eternal-life"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "national-grief",
    name: "National Grief",
    category: "emotion",
    parentThemeId: "grief",
    definition:
      "Collective sorrow shared by an entire people — Israel weeping over Jerusalem's destruction, the exile community mourning by the rivers of Babylon (Psalm 137). National grief acknowledges that some losses are too large for individual processing; they require communal wailing, shared memory, and corporate lament.",
    modernFraming:
      "National grief is the silence after a school shooting, the shared horror of a natural disaster, the collective ache on the anniversary of a tragedy. It's when the whole country feels the same wound at the same time.",
    relatedThemes: JSON.stringify(["grief", "lament", "exile", "injustice", "community", "trauma"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "grief-and-hope",
    name: "Grief and Hope",
    category: "emotion",
    parentThemeId: "grief",
    definition:
      "The paradox of holding sorrow and expectation simultaneously — 'weeping may stay for the night, but rejoicing comes in the morning' (Psalm 30:5). Paul tells the Thessalonians not to grieve like those who have no hope (1 Thessalonians 4:13). This isn't bypassing grief but infusing it with a future.",
    modernFraming:
      "Grief and hope is crying at the funeral and meaning it, but also believing you'll see them again. It's planting a memorial tree because you believe in growth even after loss. The grief is real; the hope is also real.",
    relatedThemes: JSON.stringify(["grief", "hope", "resurrection-hope", "mourning", "comfort", "healing"]),
    sourceTier: "ai_assisted",
  },

  // ── FEAR (top-level) ──
  {
    id: "fear",
    name: "Fear",
    category: "emotion",
    parentThemeId: null,
    definition:
      "An emotional response to perceived danger — physical, spiritual, or existential. Scripture distinguishes between unhealthy fear (anxiety, terror) and healthy fear (reverent awe before God). 'Do not fear' appears over 300 times in the Bible, suggesting God knows it's the most universal human struggle.",
    modernFraming:
      "Fear is the 3 a.m. spiral about money, health, or the future. It's the tightness in your chest before a difficult conversation. Everyone feels it; the question is whether it drives you or you drive it.",
    relatedThemes: JSON.stringify(["fear-of-god", "anxiety", "courage", "trust", "overcoming-fear"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fear-of-god",
    name: "Fear of God",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "Not terror but reverent awe — the appropriate human response to encountering the holy, infinite Creator. 'The fear of the LORD is the beginning of wisdom' (Proverbs 9:10). This isn't cowering; it's the breathless, knee-buckling recognition that you're in the presence of something infinitely greater than yourself.",
    modernFraming:
      "Fear of God is the feeling at the edge of the Grand Canyon — you're not scared exactly, but you feel very small and very alive. It's the moment in worship when something bigger than you fills the room and your cleverness suddenly seems irrelevant.",
    relatedThemes: JSON.stringify(["fear", "wisdom", "worship", "holiness", "humility-before-god", "awe"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "anxiety",
    name: "Anxiety",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "Worry about the future — the mental spinning that Jesus addressed directly: 'Do not be anxious about your life, what you will eat or drink' (Matthew 6:25). Paul's antidote is prayer with thanksgiving (Philippians 4:6-7). Scripture treats anxiety honestly — not as sin to shame but as a burden to surrender.",
    modernFraming:
      "Anxiety is checking your email at midnight, rehearsing conversations that haven't happened yet, and googling symptoms instead of sleeping. It's your brain's smoke alarm going off when there's no fire.",
    relatedThemes: JSON.stringify(["fear", "trust", "peace", "worry", "prayer", "contentment"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "terror",
    name: "Terror",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "Overwhelming, paralyzing fear — the kind the Israelites felt at the Red Sea with Pharaoh's army behind them, or the disciples in the storm on Galilee. Terror is fear amplified beyond coping capacity. Scripture meets terror not with 'calm down' but with 'I am with you.'",
    modernFraming:
      "Terror is the phone call at 3 a.m., the diagnosis nobody expected, the moment the ground literally or figuratively shakes beneath you. It's fear so big it shuts down your ability to think.",
    relatedThemes: JSON.stringify(["fear", "trauma", "courage", "god-as-refuge", "overcoming-fear"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fear-of-death",
    name: "Fear of Death",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "The primal human dread of mortality — what Hebrews 2:15 calls the 'lifelong slavery' of those who fear death. The Bible doesn't pretend death is nothing; it calls death 'the last enemy' (1 Corinthians 15:26). But the resurrection is God's answer: death is defeated, even if it's not yet destroyed.",
    modernFraming:
      "Fear of death is the tightness you feel at a funeral, the way a health scare rewrites your priorities overnight, or lying awake wondering what happens after. It's the one fear everyone shares and almost nobody talks about.",
    relatedThemes: JSON.stringify(["fear", "death", "resurrection-hope", "eternal-life", "grief", "courage"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fear-of-rejection",
    name: "Fear of Rejection",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "The dread of being excluded, dismissed, or deemed unworthy — a fear that shaped Peter's denial of Jesus and Nicodemus' nighttime visit. Scripture acknowledges this fear honestly while pointing to a God who 'will never leave you nor forsake you' (Deuteronomy 31:6). The deepest cure for fear of rejection is secure belonging.",
    modernFraming:
      "Fear of rejection is not raising your hand, not asking the question, not applying for the thing — because what if they say no? What if they don't want you? It's the voice that keeps you small to keep you safe.",
    relatedThemes: JSON.stringify(["fear", "shame", "belonging", "loneliness", "identity", "acceptance"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "overcoming-fear",
    name: "Overcoming Fear",
    category: "emotion",
    parentThemeId: "fear",
    definition:
      "The process of moving through fear rather than around it — enabled not by personal bravery but by God's presence. Joshua was told to be courageous because God was with him, not because he was strong. 'Perfect love casts out fear' (1 John 4:18) — the antidote to fear is not willpower but relationship.",
    modernFraming:
      "Overcoming fear is making the phone call anyway, submitting the application anyway, having the conversation anyway — shaking, sweating, and doing it because something matters more than your comfort.",
    relatedThemes: JSON.stringify(["fear", "courage", "faith", "trust", "love", "holy-spirit"]),
    sourceTier: "ai_assisted",
  },

  // ── JOY (top-level) ──
  {
    id: "joy",
    name: "Joy",
    category: "emotion",
    parentThemeId: null,
    definition:
      "A deep, settled gladness rooted not in circumstances but in God's character and promises. Joy is a fruit of the Spirit (Galatians 5:22), present even in suffering (James 1:2). The Psalms command joy over 70 times — it is both a gift to receive and a discipline to practice. Joy is deeper than happiness because it can coexist with pain.",
    modernFraming:
      "Joy is the belly laugh with old friends, but it's also the quiet peace when everything is uncertain but you sense it's going to be okay. It's not the absence of problems — it's the presence of something stronger than problems.",
    relatedThemes: JSON.stringify(["celebration", "gratitude", "contentment", "hope", "worship", "peace"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "celebration",
    name: "Celebration",
    category: "emotion",
    parentThemeId: "joy",
    definition:
      "The communal expression of joy — feasts, festivals, singing, dancing. Israel's calendar was structured around celebration: Passover, Tabernacles, Purim. Even heaven throws parties: the angels rejoice over one sinner who repents (Luke 15:10). Celebration is joy made social and embodied.",
    modernFraming:
      "Celebration is the surprise party, the graduation, the first paycheck framed on the wall. It's stopping to mark the win instead of immediately moving to the next task. We forget to celebrate, and something in us dies a little when we do.",
    relatedThemes: JSON.stringify(["joy", "gratitude", "community", "worship", "feasting", "sabbath"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    category: "emotion",
    parentThemeId: "joy",
    definition:
      "Thankfulness recognized and expressed — the heartbeat of biblical worship. Paul commands it: 'In everything give thanks' (1 Thessalonians 5:18). The Psalms overflow with it. Gratitude reframes reality: instead of focusing on what's missing, it names what's present. It is the antidote to entitlement and the gateway to joy.",
    modernFraming:
      "Gratitude is pausing before a meal even when you're in a rush, texting someone to say 'I was just thinking about how glad I am you're in my life,' or keeping a list of good things on the days when everything feels heavy.",
    relatedThemes: JSON.stringify(["joy", "thanksgiving", "contentment", "worship", "generosity"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "thanksgiving",
    name: "Thanksgiving",
    category: "emotion",
    parentThemeId: "joy",
    definition:
      "Gratitude directed specifically toward God — acknowledging him as the source of every good gift (James 1:17). Thanksgiving psalms (e.g., Psalm 100, 136) rehearse God's acts and respond with praise. It's not just feeling grateful but declaring it, often publicly, often liturgically.",
    modernFraming:
      "Thanksgiving is more than a November holiday — it's the prayer before the meal, the 'I couldn't have done this without you' directed at God, the discipline of naming blessings when your instinct is to catalog complaints.",
    relatedThemes: JSON.stringify(["gratitude", "joy", "worship", "prayer", "praise"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "contentment",
    name: "Contentment",
    category: "emotion",
    parentThemeId: "joy",
    definition:
      "The learned ability to be at peace with what you have — not apathy but active satisfaction. Paul wrote from prison: 'I have learned the secret of being content in any and every situation' (Philippians 4:12). Contentment is freedom from the endless cycle of wanting more.",
    modernFraming:
      "Contentment is scrolling Instagram without feeling like your life is inferior, eating at home without wishing you could afford the restaurant, and genuinely being happy for a friend's success without the sting of comparison.",
    relatedThemes: JSON.stringify(["joy", "gratitude", "peace", "envy", "covetousness", "simplicity"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "joy-in-suffering",
    name: "Joy in Suffering",
    category: "emotion",
    parentThemeId: "joy",
    definition:
      "The paradoxical capacity to experience joy not in spite of suffering but somehow through it. James says 'consider it pure joy when you face trials of many kinds' (James 1:2). Paul and Silas sang hymns in prison (Acts 16). This isn't masochism — it's a joy so deep that suffering can't reach the bottom of it.",
    modernFraming:
      "Joy in suffering is the cancer patient who still cracks jokes, the family that sings at the funeral, the missionary who wouldn't trade their hardship for anyone else's comfort. It baffles outsiders because it doesn't compute — and that's kind of the point.",
    relatedThemes: JSON.stringify(["joy", "hope-in-suffering", "perseverance-in-faith", "gratitude", "peace", "martyrdom"]),
    sourceTier: "ai_assisted",
  },

  // ── ANGER (top-level) ──
  {
    id: "anger",
    name: "Anger",
    category: "emotion",
    parentThemeId: null,
    definition:
      "A powerful emotion signaling that something is wrong — a boundary has been violated, an injustice committed, a value threatened. Scripture doesn't condemn anger itself: 'Be angry and do not sin' (Ephesians 4:26). Jesus was angry at corruption in the temple. The question isn't whether you feel anger but what you do with it.",
    modernFraming:
      "Anger is the heat in your chest when someone lies to your face, the spike when you read about a child being hurt, the frustration when systems fail the people they should protect. It's an alarm — the question is whether you let it inform you or consume you.",
    relatedThemes: JSON.stringify(["righteous-anger", "wrath-of-god", "bitterness", "forgiveness", "justice", "lament"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "righteous-anger",
    name: "Righteous Anger",
    category: "emotion",
    parentThemeId: "anger",
    definition:
      "Anger aligned with God's own anger — fury at injustice, exploitation, and evil rather than at personal inconvenience. Jesus overturning tables in the temple (John 2:13-17) is the paradigm: righteous anger targets systems of oppression, not personal enemies. It burns hot but burns clean.",
    modernFraming:
      "Righteous anger is the fire you feel when a bully targets a kid, when corruption is exposed, when powerful people hurt vulnerable ones. It's anger that makes you do something — start a petition, confront the problem, change the policy.",
    relatedThemes: JSON.stringify(["anger", "justice", "injustice", "social-justice", "moral-courage", "prophetic-voice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wrath-of-god",
    name: "Wrath of God",
    category: "emotion",
    parentThemeId: "anger",
    definition:
      "God's settled, holy opposition to evil — not a temper tantrum but a righteous refusal to tolerate what destroys his creation. God's wrath is the necessary flip side of his love: you can't genuinely love victims without being angry at what harms them. Romans 1:18 says God's wrath is 'revealed from heaven against all godlessness and wickedness.'",
    modernFraming:
      "God's wrath is what you want to exist when you hear about human trafficking, genocide, or child abuse. If God shrugged at evil, he wouldn't be good. His anger at injustice is actually the most comforting thing about him.",
    relatedThemes: JSON.stringify(["anger", "divine-justice", "judgment", "holiness", "mercy", "atonement"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "bitterness",
    name: "Bitterness",
    category: "emotion",
    parentThemeId: "anger",
    definition:
      "Anger that has been nursed rather than resolved — a root that grows slowly and poisons everything it touches. Hebrews 12:15 warns against a 'root of bitterness' that defiles many. Bitterness is the refusal to release an offense; it punishes you more than the person who wronged you.",
    modernFraming:
      "Bitterness is replaying the argument for the thousandth time, keeping a mental ledger of everyone who wronged you, and smiling at someone while holding a grudge so old you've forgotten the original offense. It's drinking poison and hoping the other person gets sick.",
    relatedThemes: JSON.stringify(["anger", "resentment", "forgiveness", "unforgiveness", "healing"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "resentment",
    name: "Resentment",
    category: "emotion",
    parentThemeId: "anger",
    definition:
      "The slow burn of feeling wronged or overlooked — the older brother in the prodigal son parable who did everything right and got no party (Luke 15:25-32). Resentment often masks deeper pain: I gave and gave and nobody noticed, or, their success reminds me of my failure.",
    modernFraming:
      "Resentment is watching a coworker get promoted when you did the work, doing the dishes every single night and nobody saying thanks, or seeing your sibling get praised for something you've been doing quietly for years.",
    relatedThemes: JSON.stringify(["anger", "bitterness", "envy", "jealousy", "forgiveness", "injustice"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "vengeance",
    name: "Vengeance",
    category: "emotion",
    parentThemeId: "anger",
    definition:
      "The desire to repay harm with harm — a deeply human impulse that Scripture consistently redirects toward God. 'Vengeance is mine; I will repay, says the Lord' (Romans 12:19). The Psalms are honest about the desire for vengeance (imprecatory psalms) while the New Testament channels it toward trust in God's justice.",
    modernFraming:
      "Vengeance is the fantasy of sending that screenshot to everyone, the urge to key someone's car, the satisfaction you imagine from watching someone get what they deserve. The Bible says: feel it, bring it to God, but don't execute it yourself.",
    relatedThemes: JSON.stringify(["anger", "divine-justice", "forgiveness", "love-of-enemy", "righteous-anger", "retribution"]),
    sourceTier: "ai_assisted",
  },

  // ── SHAME (top-level) ──
  {
    id: "shame",
    name: "Shame",
    category: "emotion",
    parentThemeId: null,
    definition:
      "The painful sense that you are fundamentally flawed — not just that you did something wrong (guilt) but that you are something wrong. Adam and Eve hid after the fall; shame drives hiding. In honor-shame cultures of the Bible, shame was social death. The gospel speaks directly to shame: 'no condemnation' (Romans 8:1).",
    modernFraming:
      "Shame is the voice that says you're a fraud, that if people really knew you they'd leave. It's not 'I made a mistake' — it's 'I am a mistake.' And it keeps you hiding in the one place where hiding feels safest: alone.",
    relatedThemes: JSON.stringify(["guilt", "honor-and-shame", "restoration-from-shame", "identity", "vulnerability", "grace-unmerited"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "guilt",
    name: "Guilt",
    category: "emotion",
    parentThemeId: "shame",
    definition:
      "The moral awareness that you have done something wrong — distinct from shame in that guilt focuses on behavior, not identity. Guilt can be healthy (the conviction that leads David to repentance in Psalm 51) or toxic (the crippling self-condemnation Paul says has no place for those in Christ). Healthy guilt is a compass; toxic guilt is a cage.",
    modernFraming:
      "Guilt is the pit in your stomach after you snapped at your kid, the thing that keeps you up at night after you told a lie, the weight you carry when you know you could have done better and didn't.",
    relatedThemes: JSON.stringify(["shame", "repentance", "confession", "forgiveness", "conscience", "grace-unmerited"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "public-humiliation",
    name: "Public Humiliation",
    category: "emotion",
    parentThemeId: "shame",
    definition:
      "The shame of being exposed or degraded before others — Joseph's brothers stripping his robe, Jesus stripped and crucified publicly, the woman caught in adultery dragged before a crowd. Public humiliation attacks identity at its most visible point and was a deliberate weapon in the ancient world.",
    modernFraming:
      "Public humiliation is going viral for the wrong reason, being called out in a meeting in front of everyone, or having your worst moment become the only thing people know about you. It's shame with an audience.",
    relatedThemes: JSON.stringify(["shame", "honor-and-shame", "restoration-from-shame", "dignity", "bullying"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "restoration-from-shame",
    name: "Restoration from Shame",
    category: "emotion",
    parentThemeId: "shame",
    definition:
      "God's consistent pattern of lifting the shamed back to honor — clothing Adam and Eve, restoring Job, reinstating Peter after his denial, and declaring his people 'a crown of beauty' (Isaiah 62:3). Restoration from shame doesn't erase the past but redefines the future. It says: your worst moment does not own you.",
    modernFraming:
      "Restoration from shame is the comeback story — the addict who becomes a counselor, the failure who builds something beautiful from the wreckage. It's the moment you stop hiding and discover that people don't run away.",
    relatedThemes: JSON.stringify(["shame", "redemption", "grace-unmerited", "second-chances", "healing", "identity"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "honor-and-shame",
    name: "Honor and Shame",
    category: "emotion",
    parentThemeId: "shame",
    definition:
      "The cultural framework underlying much of Scripture — where standing in the community determines your value and losing face can be worse than death. Understanding honor-shame dynamics illuminates parables (the prodigal son's public return), Jesus' crucifixion (the most shameful death possible), and the radical inversion of the gospel: the shamed one is the honored one.",
    modernFraming:
      "Honor and shame is caring deeply about your reputation, being devastated by a public failure, or feeling like your family's name is on the line. It's the cultural lens most of the world still sees through, even if Western culture tries to pretend otherwise.",
    relatedThemes: JSON.stringify(["shame", "public-humiliation", "restoration-from-shame", "identity", "pride", "dignity"]),
    sourceTier: "ai_assisted",
  },

  // ── LONELINESS (top-level) ──
  {
    id: "loneliness",
    name: "Loneliness",
    category: "emotion",
    parentThemeId: null,
    definition:
      "The ache of disconnection — from others, from God, from belonging. Elijah sat alone under a broom tree wanting to die (1 Kings 19). Jesus experienced ultimate loneliness on the cross: 'My God, my God, why have you forsaken me?' (Matthew 27:46). God declared 'it is not good for man to be alone' (Genesis 2:18) — loneliness violates the way things were designed.",
    modernFraming:
      "Loneliness is being in a crowded room and feeling invisible, scrolling through everyone else's weekend plans on Friday night, or moving to a new city where nobody knows your name. It's one of the most common human experiences and one of the hardest to admit.",
    relatedThemes: JSON.stringify(["isolation", "abandonment", "community", "belonging", "depression"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "isolation",
    name: "Isolation",
    category: "emotion",
    parentThemeId: "loneliness",
    definition:
      "Being cut off — whether by circumstance, choice, or force — from community and connection. Lepers were isolated outside the camp. Prisoners, exiles, and outcasts populate Scripture. Isolation is loneliness with walls around it, and it can be both imposed (exile) and self-constructed (withdrawal from shame or fear).",
    modernFraming:
      "Isolation is declining every invitation until people stop inviting you, working from home for the third week in a row without seeing a friend, or carrying a secret that separates you from everyone who might help.",
    relatedThemes: JSON.stringify(["loneliness", "abandonment", "exile", "shame", "depression", "community"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "abandonment",
    name: "Abandonment",
    category: "emotion",
    parentThemeId: "loneliness",
    definition:
      "The devastating experience of being left behind — by a parent, a spouse, a friend, or seemingly by God. Hagar was sent into the desert with her son. David cried out, 'Do not forsake me, O God' (Psalm 27:9). Jesus' cry of dereliction on the cross is the ultimate expression: even God knows what it feels like to feel abandoned.",
    modernFraming:
      "Abandonment is the parent who left, the friend who ghosted, the spouse who walked out. It's the wound that whispers 'you weren't enough to stay for' and it rewires how you trust everyone who comes after.",
    relatedThemes: JSON.stringify(["loneliness", "isolation", "trust", "betrayal", "fear-of-rejection", "attachment"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "feeling-forgotten-by-god",
    name: "Feeling Forgotten by God",
    category: "emotion",
    parentThemeId: "loneliness",
    definition:
      "The painful spiritual experience of God's apparent absence — when prayers seem to hit the ceiling and heaven is silent. 'How long, O LORD? Will you forget me forever?' (Psalm 13:1). This is not a failure of faith; it's a common, honest stage in the spiritual journey, acknowledged repeatedly in Scripture without condemnation.",
    modernFraming:
      "Feeling forgotten by God is praying for months with no answer, watching everyone else get their breakthrough while you're still waiting, or sitting in church feeling absolutely nothing. It's the loneliest kind of loneliness because it's vertical.",
    relatedThemes: JSON.stringify(["loneliness", "dark-night-of-soul", "lament", "hope-deferred", "waiting-on-god", "unanswered-prayer"]),
    sourceTier: "ai_assisted",
  },

  // ── JEALOUSY (top-level) ──
  {
    id: "jealousy",
    name: "Jealousy",
    category: "emotion",
    parentThemeId: null,
    definition:
      "A complex emotion with both negative and positive dimensions in Scripture. Human jealousy (protective or possessive) is often destructive: Saul's jealousy of David, Joseph's brothers. Yet God describes himself as 'jealous' (Exodus 34:14) — fiercely protective of the relationship he has with his people. Jealousy reveals what we value most.",
    modernFraming:
      "Jealousy is the sting when your best friend gets a new best friend, the suspicion that your partner is emotionally closer to someone else, or the irrational anger when someone else gets the thing you wanted. It's possessiveness dressed up as caring.",
    relatedThemes: JSON.stringify(["envy", "covetousness", "divine-jealousy", "resentment", "trust", "insecurity"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "envy",
    name: "Envy",
    category: "emotion",
    parentThemeId: "jealousy",
    definition:
      "Wanting what someone else has — their success, their relationships, their life. Envy differs from jealousy in that jealousy guards what it has while envy covets what others have. Proverbs 14:30 says 'envy rots the bones.' It was envy that drove Cain to murder Abel and the religious leaders to crucify Jesus (Mark 15:10).",
    modernFraming:
      "Envy is the bitter taste when your friend buys a house and you're still renting, or when someone younger gets promoted over you. It poisons celebration — you can't be happy for someone when you're too busy comparing.",
    relatedThemes: JSON.stringify(["jealousy", "covetousness", "contentment", "gratitude", "bitterness", "comparison"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "covetousness",
    name: "Covetousness",
    category: "emotion",
    parentThemeId: "jealousy",
    definition:
      "The tenth commandment targets this: an inordinate desire for what belongs to someone else — their possessions, position, spouse, or life. Covetousness is the engine beneath consumerism and the silent sin nobody confesses. Achan's covetousness brought disaster on all of Israel (Joshua 7). It starts with looking and ends with taking.",
    modernFraming:
      "Covetousness is scrolling through someone's vacation photos and feeling your satisfaction with your own life drain away. It's wanting the car, the house, the career, the relationship — not because you need it, but because they have it.",
    relatedThemes: JSON.stringify(["jealousy", "envy", "greed", "contentment", "materialism", "idolatry"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-jealousy",
    name: "Divine Jealousy",
    category: "emotion",
    parentThemeId: "jealousy",
    definition:
      "God's fierce, protective love for his people — not petty possessiveness but the passionate refusal to share his beloved with counterfeits. 'I the LORD your God am a jealous God' (Exodus 20:5). Divine jealousy is the love of a faithful spouse who will not stand by while the relationship is destroyed by infidelity to false gods.",
    modernFraming:
      "Divine jealousy is the way a good parent reacts when something is pulling their child toward destruction — it's not insecurity, it's fierce love. God's jealousy is a feature, not a bug; it means you matter to him too much for him to shrug.",
    relatedThemes: JSON.stringify(["jealousy", "holiness", "idolatry", "covenant", "worship", "love"]),
    sourceTier: "ai_assisted",
  },

  // ── DESPAIR (top-level) ──
  {
    id: "despair",
    name: "Despair",
    category: "emotion",
    parentThemeId: null,
    definition:
      "The complete collapse of hope — the conviction that nothing can change, nothing matters, and God has either left or doesn't care. Ecclesiastes explores existential despair ('vanity of vanities'). Jeremiah is called the weeping prophet. The psalmists cry from pits and depths. Scripture does not flinch from despair; it sits in it and speaks from it.",
    modernFraming:
      "Despair is lying in bed unable to see the point of getting up, watching the news and feeling like the world is beyond repair, or hitting a wall in your life where every direction looks like a dead end. It's the heaviest emotion there is.",
    relatedThemes: JSON.stringify(["hopelessness", "depression", "grief", "dark-night-of-soul", "hope", "lament"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hopelessness",
    name: "Hopelessness",
    category: "emotion",
    parentThemeId: "despair",
    definition:
      "The specific dimension of despair where the future looks entirely empty — nothing good is coming, nothing will change. Ezekiel's vision of the valley of dry bones (Ezekiel 37) speaks directly to hopelessness: 'Can these bones live?' The answer Israel gave was no. God's answer was watch me.",
    modernFraming:
      "Hopelessness is staring at a pile of debt and seeing no way out, or going through treatment after treatment with no improvement. It's the absence of 'maybe tomorrow will be better' — and it lies, because dry bones can live.",
    relatedThemes: JSON.stringify(["despair", "hope", "depression", "resurrection-hope", "dark-night-of-soul", "suicide"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "dark-night-of-soul",
    name: "Dark Night of the Soul",
    category: "emotion",
    parentThemeId: "despair",
    definition:
      "A term from Christian mysticism (St. John of the Cross) for the season when God feels utterly absent and faith becomes raw survival. Mother Teresa experienced this for decades. Psalm 88 is the darkest psalm — it doesn't resolve into praise. Sometimes the spiritual life goes silent, and the only prayer is 'help.'",
    modernFraming:
      "Dark night of the soul is the season where the Bible feels dead, prayer feels pointless, and the songs you used to love sound hollow. It's not losing your faith — it's your faith being rebuilt in the dark without any of the feelings that used to prop it up.",
    relatedThemes: JSON.stringify(["despair", "feeling-forgotten-by-god", "lament", "faith", "perseverance-in-faith", "doubt"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "depression",
    name: "Depression",
    category: "emotion",
    parentThemeId: "despair",
    definition:
      "A sustained state of emotional, spiritual, and physical heaviness that goes beyond ordinary sadness. Elijah's collapse under the broom tree (1 Kings 19) — 'take my life' — is one of Scripture's most honest portrayals. God's response was not a lecture but sleep, food, and companionship. Depression is not a faith failure; it is a human experience that God meets with tenderness.",
    modernFraming:
      "Depression is the gray film over everything, the inability to care about things that used to matter, the exhaustion that sleep doesn't fix. It's not laziness and it's not weakness — it's an illness that deserves compassion, not judgment.",
    relatedThemes: JSON.stringify(["despair", "hopelessness", "loneliness", "grief", "healing", "anxiety"]),
    sourceTier: "ai_assisted",
  },
  {
    id: "suicidal-despair",
    name: "Suicidal Despair",
    category: "emotion",
    parentThemeId: "despair",
    definition:
      "The extremity of pain where death feels preferable to continued living — expressed by Elijah ('take my life'), Jonah ('it is better for me to die'), and Job ('why did I not perish at birth?'). Scripture includes these voices without censoring them, demonstrating that God does not reject those who reach this depth. He draws near to them.",
    modernFraming:
      "Suicidal despair is the point where the pain outweighs the reasons to stay. If you're here: you are not alone, you are not weak, and there is help. Call 988 (Suicide & Crisis Lifeline). The Bible's most broken people became its most important voices — and God met every single one of them.",
    relatedThemes: JSON.stringify(["despair", "hopelessness", "depression", "isolation", "divine-mercy", "healing", "comfort"]),
    sourceTier: "ai_assisted",
  },
];
