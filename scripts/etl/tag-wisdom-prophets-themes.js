/**
 * Tag Wisdom/Poetry and Prophets narrative units with themes.
 * 107 units total: JOB(11), PSA(15), PRO(8), ECC(6), SNG(4),
 *   ISA(9), JER(8), LAM(3), EZK(7), DAN(8), HOS(4), JOL(2), AMO(4),
 *   OBA(1), JON(4), MIC(3), NAM(1), HAB(2), ZEP(1), HAG(1), ZEC(3), MAL(2)
 */
const Database = require('better-sqlite3');
const db = new Database('data/selah.db');

// Each entry: [unit_id, theme_id, relevance, context_note]
// We use the narrative unit's passage reference (book_id, chapter_start, verse_start, chapter_end, verse_end)
// to insert into passage_themes.

const units = db.prepare(`
  SELECT id, book_id, chapter_start, verse_start, chapter_end, verse_end
  FROM narrative_units
  WHERE book_id IN ('JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
`).all();

const unitMap = {};
units.forEach(u => { unitMap[u.id] = u; });

// Theme tags: [unit_id, theme_id, relevance, context_note]
const tags = [
  // ==================== JOB (11 units) ====================

  // job-the-wager — Job 1:1–2:13
  ['job-the-wager', 'suffering', 'primary', "Job loses children, wealth, and health in rapid succession — suffering so total it strips away every external marker of identity and blessing."],
  ['job-the-wager', 'theodicy', 'primary', "The heavenly wager frames the entire book's central question: why does a righteous person suffer when God has the power to prevent it?"],
  ['job-the-wager', 'innocent-suffering', 'primary', "God himself twice declares Job 'blameless and upright,' making his devastation explicitly undeserved."],
  ['job-the-wager', 'testing', 'secondary', "The Satan's challenge — 'Does Job fear God for nothing?' — frames suffering as a test of whether faith can survive without reward."],
  ['job-the-wager', 'faith', 'secondary', "Job's response — 'The LORD gave, and the LORD has taken away; blessed be the name of the LORD' — is faith at its most naked."],
  ['job-the-wager', 'sovereignty', 'secondary', "God permits the suffering, setting boundaries on what the Satan can do — sovereignty that allows evil within limits."],
  ['job-the-wager', 'loss-of-loved-one', 'illustrative', "Ten children die in a single day — the most concentrated family loss in Scripture."],
  ['job-the-wager', 'worship', 'illustrative', "Job tears his robe, shaves his head, and falls to the ground in worship — grief and worship in the same breath."],

  // job-first-lament — Job 3:1–3:26
  ['job-first-lament', 'lament', 'primary', "Job's first words after seven days of silence are a curse on his own birth — raw, unfiltered anguish given poetic form."],
  ['job-first-lament', 'despair', 'primary', "Job wishes he had never been born, envying the stillborn and the dead — despair so deep it reverses the creation impulse."],
  ['job-first-lament', 'suicidal-despair', 'secondary', "While Job does not seek death actively, he longs for it as relief — 'Why is light given to those in misery, and life to the bitter of soul?'"],
  ['job-first-lament', 'suffering', 'secondary', "The lament arises from physical agony and total loss — suffering that makes existence itself feel like punishment."],
  ['job-first-lament', 'dark-night-of-soul', 'secondary', "Job's curse on the day of his birth is the archetypal dark night — faith not abandoned but submerged beneath overwhelming pain."],
  ['job-first-lament', 'fear-of-death', 'illustrative', "Paradoxically, Job does not fear death but desires it — death as the only peace available."],
  ['job-first-lament', 'prayer', 'illustrative', "Though structured as a curse, the lament is directed toward God — complaint as a form of desperate prayer."],

  // job-eliphaz-speaks — Job 4:1–5:27
  ['job-eliphaz-speaks', 'theodicy', 'primary', "Eliphaz offers the retribution principle as explanation: the innocent do not perish, therefore suffering implies sin."],
  ['job-eliphaz-speaks', 'consequences-of-sin', 'primary', "The entire speech assumes a direct causal link between sin and suffering — a theology that comforts the comfortable."],
  ['job-eliphaz-speaks', 'wisdom', 'secondary', "Eliphaz appeals to a mystical night vision as the source of his wisdom — experience and revelation as authority."],
  ['job-eliphaz-speaks', 'foolishness', 'secondary', "Eliphaz's confident theology becomes the book's primary example of well-meaning foolishness — saying true things in wrong contexts."],
  ['job-eliphaz-speaks', 'compassion', 'illustrative', "Eliphaz begins gently — 'If one ventures a word with you, will you be offended?' — pastoral sensitivity that dissolves into accusation."],
  ['job-eliphaz-speaks', 'divine-justice', 'illustrative', "The speech assumes God's justice operates mechanistically — a theological framework the book will ultimately subvert."],

  // job-bildad-speaks — Job 8:1–8:22
  ['job-bildad-speaks', 'theodicy', 'primary', "Bildad doubles down on retribution theology, suggesting Job's children died because of their own sin."],
  ['job-bildad-speaks', 'consequences-of-sin', 'primary', "Bildad insists the tradition is clear: God does not reject a blameless person or strengthen evildoers — so Job must be guilty."],
  ['job-bildad-speaks', 'justice-of-god', 'secondary', "Bildad's central question — 'Does God pervert justice?' — is a legitimate theological question weaponized against a suffering friend."],
  ['job-bildad-speaks', 'foolishness', 'secondary', "The appeal to ancestral tradition as infallible authority exemplifies intellectual rigidity masquerading as wisdom."],
  ['job-bildad-speaks', 'faith', 'illustrative', "Bildad offers conditional hope — if Job is pure and upright, God will restore him — faith as transaction."],
  ['job-bildad-speaks', 'repentance', 'illustrative', "The implied call to repent assumes guilt that the prologue has already denied — repentance demanded of the innocent."],

  // job-protests-innocence — Job 9:1–14:22
  ['job-protests-innocence', 'innocent-suffering', 'primary', "Job insists on his innocence while acknowledging he cannot prove it in any court where God is both judge and opposing party."],
  ['job-protests-innocence', 'justice', 'primary', "Job demands a legal hearing — he wants justice, not comfort — but recognizes the asymmetry: how can a mortal argue with the Almighty?"],
  ['job-protests-innocence', 'wrestling-with-god', 'primary', "Job does not abandon God but confronts God directly, demanding answers — wrestling that refuses to let go without a blessing."],
  ['job-protests-innocence', 'power-of-god', 'secondary', "Job acknowledges God's overwhelming power while insisting power alone does not make right — might is not justice."],
  ['job-protests-innocence', 'death-and-afterlife', 'secondary', "Job meditates on death as final — 'If mortals die, will they live again?' — hope flickering but not yet caught."],
  ['job-protests-innocence', 'lament', 'secondary', "The legal arguments are interwoven with lament — Job oscillates between courtroom language and raw grief."],
  ['job-protests-innocence', 'fear-of-death', 'illustrative', "Job sees death approaching and wants his case heard before it arrives — urgency born of mortality."],

  // job-zophar-speaks — Job 11:1–11:20
  ['job-zophar-speaks', 'theodicy', 'primary', "Zophar is the harshest friend — he tells Job he actually deserves worse than he has received."],
  ['job-zophar-speaks', 'mystery-of-god', 'secondary', "Zophar invokes divine transcendence — God's wisdom is higher than heaven, deeper than Sheol — but uses mystery to silence rather than humble."],
  ['job-zophar-speaks', 'repentance', 'secondary', "Zophar demands Job repent and put away sin, offering restoration as the guaranteed result of confession."],
  ['job-zophar-speaks', 'consequences-of-sin', 'secondary', "Like the other friends, Zophar assumes suffering is proportional to sin — the wicked have no escape."],
  ['job-zophar-speaks', 'foolishness', 'illustrative', "Zophar's certainty about Job's hidden sin becomes the book's starkest example of theological cruelty disguised as pastoral care."],
  ['job-zophar-speaks', 'hope', 'illustrative', "The conditional hope Zophar offers — 'you will forget your misery, remembering it only as waters gone by' — is genuine but built on a false premise."],

  // job-where-is-wisdom — Job 28:1–28:28
  ['job-where-is-wisdom', 'wisdom', 'primary', "The poem asks where wisdom can be found and concludes it cannot be mined, bought, or discovered by human effort — only God knows its place."],
  ['job-where-is-wisdom', 'fear-of-god', 'primary', "The poem's conclusion — 'The fear of the Lord, that is wisdom' — reframes the entire search: wisdom begins with awe, not analysis."],
  ['job-where-is-wisdom', 'mystery-of-god', 'secondary', "Wisdom's hiddenness parallels God's hiddenness — the answer to the book's deepest question is not available through human inquiry alone."],
  ['job-where-is-wisdom', 'transcendence', 'secondary', "The poem portrays wisdom as existing in a realm beyond human access — the deep says 'It is not in me,' the sea says 'It is not with me.'"],
  ['job-where-is-wisdom', 'creation', 'secondary', "Ancient mining imagery reveals humanity's technological mastery over nature — yet wisdom remains beyond all human engineering."],
  ['job-where-is-wisdom', 'humility-before-god', 'illustrative', "The search for wisdom that ends in surrender teaches intellectual humility — the smartest response is sometimes silence."],

  // job-final-defense — Job 29:1–31:40
  ['job-final-defense', 'innocent-suffering', 'primary', "Job's oath of innocence lists specific ethical behaviors — caring for the poor, avoiding lust, fair treatment of servants — proving his righteousness by concrete action."],
  ['job-final-defense', 'justice', 'primary', "Job appeals to justice as a man who practiced it: he was eyes to the blind, feet to the lame, a father to the needy."],
  ['job-final-defense', 'honor-and-shame', 'secondary', "The contrast between past honor and present humiliation drives the speech — from respected elder to laughingstock."],
  ['job-final-defense', 'integrity', 'secondary', "The oath stakes Job's life on his moral record — if he is lying, let thorns grow instead of wheat."],
  ['job-final-defense', 'social-justice', 'secondary', "Job's ethical catalog includes caring for the poor, fair treatment of servants regardless of status, and welcoming the stranger."],
  ['job-final-defense', 'grief', 'illustrative', "Chapter 30 is grief for a lost life — not just lost possessions but lost standing, lost respect, lost community."],
  ['job-final-defense', 'justice-for-oppressed', 'illustrative', "Job's defense reveals a life spent defending widows, orphans, and the exploited — justice not as theory but as daily practice."],

  // job-elihu-speaks — Job 32:1–37:24
  ['job-elihu-speaks', 'wisdom', 'secondary', "Elihu claims wisdom comes from the Spirit, not from age — a partial correction of the friends that still misses the mark."],
  ['job-elihu-speaks', 'theodicy', 'primary', "Elihu argues suffering can be pedagogical — God uses pain to instruct, not just punish — a more nuanced but still inadequate theodicy."],
  ['job-elihu-speaks', 'sovereignty', 'secondary', "Elihu emphasizes God's sovereign right to act without explaining himself — a bridge between the friends' certainty and God's whirlwind speech."],
  ['job-elihu-speaks', 'righteous-anger', 'secondary', "Elihu is angry at Job for self-justification and at the friends for their failed arguments — anger as theological frustration."],
  ['job-elihu-speaks', 'humility', 'illustrative', "Despite claiming humility, Elihu speaks for six chapters unprompted — the gap between claimed and practiced humility."],
  ['job-elihu-speaks', 'power-of-god', 'illustrative', "Elihu's final speech about storms and lightning prepares for God's own appearance from the whirlwind."],

  // job-god-speaks — Job 38:1–41:34
  ['job-god-speaks', 'sovereignty', 'primary', "God answers from the whirlwind with 77 questions that reframe the entire debate — 'Where were you when I laid the earth's foundation?'"],
  ['job-god-speaks', 'creation', 'primary', "The divine speech is a tour of creation — from the foundations of the earth to the habits of the mountain goat — revealing a cosmos that does not revolve around human concerns."],
  ['job-god-speaks', 'mystery-of-god', 'primary', "God never explains why Job suffered. The answer to the question is the refusal to answer the question — mystery as theological substance."],
  ['job-god-speaks', 'power-of-god', 'secondary', "Behemoth and Leviathan demonstrate divine mastery over chaos itself — the God who plays with the terrifying."],
  ['job-god-speaks', 'humility-before-god', 'secondary', "The questions are designed not to crush Job but to expand his frame — humility born of wonder, not humiliation."],
  ['job-god-speaks', 'transcendence', 'secondary', "God's speech reveals the radical otherness of the divine perspective — a God whose concerns dwarf human categories."],
  ['job-god-speaks', 'presence-of-god', 'illustrative', "After chapters of divine silence, God speaks — presence itself as the answer that transcends explanation."],
  ['job-god-speaks', 'intimacy-with-god', 'illustrative', "The whirlwind speech is paradoxically intimate — God addresses Job directly, personally, for four chapters."],

  // job-restoration — Job 42:1–42:17
  ['job-restoration', 'repentance', 'primary', "Job's response — 'I had heard of you by the hearing of the ear, but now my eye sees you' — is not repentance for sin but a transformation of knowing."],
  ['job-restoration', 'grace-unmerited', 'primary', "God rebukes the friends, not Job — vindicating the man who argued honestly over those who defended God with false theology."],
  ['job-restoration', 'restoration-from-shame', 'secondary', "Job is restored double — but the new children do not replace the dead ones, making restoration bittersweet and incomplete."],
  ['job-restoration', 'forgiveness', 'secondary', "Job is told to pray for his friends — the man who suffered must intercede for those who added to his suffering."],
  ['job-restoration', 'intimacy-with-god', 'secondary', "The shift from hearing to seeing — secondhand theology replaced by direct encounter — is the book's real resolution."],
  ['job-restoration', 'blessing', 'secondary', "The epilogue's doubled possessions fulfill the conventional reward theology — but only after the book has demolished it as a universal principle."],
  ['job-restoration', 'theodicy', 'illustrative', "The restoration does not answer the theodicy question — it transcends it through encounter, leaving the intellectual problem unsolved."],

  // ==================== PSALMS (15 units) ====================

  // psa-psalm-1 — Psalm 1:1–1:6
  ['psa-psalm-1', 'wisdom', 'primary', "Psalm 1 functions as the Psalter's wisdom gateway, dividing humanity into two paths — the planted tree and the wind-blown chaff."],
  ['psa-psalm-1', 'torah', 'primary', "The righteous person's delight is in the Torah, meditated on day and night — the law as source of life, not burden."],
  ['psa-psalm-1', 'consequences-of-sin', 'secondary', "The two-ways theology is stark: the righteous prosper, the wicked perish — a framework the Psalter itself will complicate."],
  ['psa-psalm-1', 'obedience', 'secondary', "The psalm assumes a direct relationship between obedience and flourishing — the tree planted by streams of water."],
  ['psa-psalm-1', 'discernment', 'illustrative', "The opening beatitude warns against three escalating levels of compromise — walking, standing, sitting — discernment as ongoing vigilance."],
  ['psa-psalm-1', 'divine-judgment', 'illustrative', "The wicked will not stand in the judgment — God watches over the righteous but the way of the wicked leads to destruction."],

  // psa-psalm-2 — Psalm 2:1–2:12
  ['psa-psalm-2', 'messianic-prophecy', 'primary', "The psalm declares God's anointed king installed on Zion — 'You are my son; today I have begotten you' — the foundation of messianic expectation."],
  ['psa-psalm-2', 'sovereignty', 'primary', "While nations rage and rulers conspire, God laughs from heaven — divine sovereignty untroubled by human rebellion."],
  ['psa-psalm-2', 'kingdom-of-god', 'secondary', "The psalm envisions a universal kingdom where God's anointed rules the nations — the political theology of the Psalter."],
  ['psa-psalm-2', 'rebellion', 'secondary', "Nations and rulers plot to throw off divine authority — rebellion as the default human political posture."],
  ['psa-psalm-2', 'wrath-of-god', 'secondary', "The warning to kings — 'Kiss the Son, lest he be angry' — frames divine wrath as the consequence of refusing to acknowledge God's anointed."],
  ['psa-psalm-2', 'davidic-covenant', 'illustrative', "The psalm's royal language reflects the Davidic covenant — God's promise to David's dynasty as the vehicle of universal rule."],

  // psa-psalm-8 — Psalm 8:1–8:9
  ['psa-psalm-8', 'creation', 'primary', "The psalm contemplates the night sky and asks the foundational anthropological question — what is humanity's place in the cosmos?"],
  ['psa-psalm-8', 'identity', 'primary', "Humans are made 'a little lower than God' and crowned with glory and honor — the highest possible dignity statement in the ancient world."],
  ['psa-psalm-8', 'glory-of-god', 'secondary', "The psalm frames human dignity within divine majesty — 'O LORD, our Lord, how majestic is your name in all the earth!'"],
  ['psa-psalm-8', 'praise', 'secondary', "Even infants and nursing babies declare God's praise — worship as the most fundamental human capacity."],
  ['psa-psalm-8', 'humility-before-god', 'secondary', "The question 'What is man that you are mindful of him?' expresses awe at divine attention — smallness as the ground of wonder."],
  ['psa-psalm-8', 'authority', 'illustrative', "Humanity is given dominion over creation — authority as stewardship, not exploitation."],

  // psa-psalms-of-lament — Psalms 13–43
  ['psa-psalms-of-lament', 'lament', 'primary', "The largest genre in the Psalter follows a structure: address, complaint, trust, petition, praise — grief given liturgical form."],
  ['psa-psalms-of-lament', 'suffering', 'primary', "The lament psalms voice every kind of suffering — physical illness, social rejection, military defeat, spiritual abandonment."],
  ['psa-psalms-of-lament', 'prayer', 'primary', "Lament is the Bible's school of prayer — teaching that honest complaint to God is not faithlessness but its deepest expression."],
  ['psa-psalms-of-lament', 'hope-in-suffering', 'secondary', "Nearly every lament turns a corner — 'But I trust in your steadfast love' — hope that persists within, not after, suffering."],
  ['psa-psalms-of-lament', 'feeling-forgotten-by-god', 'secondary', "'How long, O LORD? Will you forget me forever?' — the psalmist names the experience of divine absence without denying divine existence."],
  ['psa-psalms-of-lament', 'faithfulness-of-god', 'secondary', "Even in complaint, the psalmists appeal to God's character — remembering past faithfulness as the basis for present hope."],
  ['psa-psalms-of-lament', 'enemies', 'illustrative', "The laments consistently name enemies — personal, national, spiritual — as the source of suffering that drives the prayer."],

  // psa-psalm-22 — Psalm 22:1–22:31
  ['psa-psalm-22', 'abandonment', 'primary', "'My God, my God, why have you forsaken me?' — the most famous cry of divine abandonment, later quoted by Jesus from the cross."],
  ['psa-psalm-22', 'messianic-prophecy', 'primary', "The details — pierced hands and feet, divided garments, mocking crowds — are read as prefiguring the crucifixion with startling specificity."],
  ['psa-psalm-22', 'suffering', 'primary', "Physical agony described in visceral detail — bones out of joint, heart like wax, tongue cleaving to the jaw — suffering as bodily disintegration."],
  ['psa-psalm-22', 'praise', 'secondary', "The psalm pivots dramatically from abandonment to praise — 'I will declare your name to my people' — despair transformed into testimony."],
  ['psa-psalm-22', 'hope-in-suffering', 'secondary', "The turn from lament to praise models how hope can emerge not by denying suffering but by moving through it."],
  ['psa-psalm-22', 'redemptive-suffering', 'illustrative', "The sufferer's vindication becomes a witness to all nations — 'All the ends of the earth will remember and turn to the LORD.'"],
  ['psa-psalm-22', 'persecution', 'illustrative', "The sufferer is surrounded by enemies described as bulls, lions, and dogs — persecution as dehumanization."],

  // psa-psalm-23 — Psalm 23:1–23:6
  ['psa-psalm-23', 'presence-of-god', 'primary', "'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me' — presence as the answer to fear."],
  ['psa-psalm-23', 'trust', 'primary', "The entire psalm is an exercise in trust — 'The LORD is my shepherd, I shall not want' — confidence born of relationship, not circumstance."],
  ['psa-psalm-23', 'provision-in-wilderness', 'secondary', "Green pastures, still waters, a table in the presence of enemies — God provides not in the absence of danger but in its midst."],
  ['psa-psalm-23', 'peace', 'secondary', "The psalm paints a picture of deep peace — rest, refreshment, guided paths — shalom as the shepherd's gift."],
  ['psa-psalm-23', 'steadfast-love', 'secondary', "'Surely goodness and steadfast love shall follow me all the days of my life' — hesed as pursuing force, not passive quality."],
  ['psa-psalm-23', 'overcoming-fear', 'illustrative', "Fear is not denied but overcome — the valley of death's shadow is walked through, not avoided."],
  ['psa-psalm-23', 'intimacy-with-god', 'illustrative', "The shift from 'he' to 'you' midway through the psalm marks a move from testimony to direct address — description becoming conversation."],

  // psa-psalm-51 — Psalm 51:1–51:19
  ['psa-psalm-51', 'repentance', 'primary', "David's confession after Bathsheba is the Bible's most thorough anatomy of repentance — acknowledging sin, pleading for cleansing, requesting a new heart."],
  ['psa-psalm-51', 'sin', 'primary', "'Against you, you only, have I sinned' — sin understood as fundamentally a violation of relationship with God, not just a moral failure."],
  ['psa-psalm-51', 'mercy', 'primary', "The psalm opens by appealing to God's mercy and steadfast love — repentance that trusts in divine compassion rather than human merit."],
  ['psa-psalm-51', 'guilt', 'secondary', "David's awareness of sin is constant — 'my sin is ever before me' — guilt as the wound that drives the prayer."],
  ['psa-psalm-51', 'spiritual-renewal', 'secondary', "'Create in me a clean heart, O God, and renew a right spirit within me' — renewal as divine surgery, not human effort."],
  ['psa-psalm-51', 'confession', 'secondary', "The psalm models confession: specific, honest, without excuses — 'I know my transgressions, and my sin is ever before me.'"],
  ['psa-psalm-51', 'obedience-vs-sacrifice', 'illustrative', "'The sacrifices of God are a broken spirit; a broken and contrite heart, O God, you will not despise' — inner disposition over ritual performance."],

  // psa-psalm-73 — Psalm 73:1–73:28
  ['psa-psalm-73', 'theodicy', 'primary', "The psalmist nearly loses faith watching the wicked prosper — 'Their bodies are healthy and strong; they are free from common human burdens.'"],
  ['psa-psalm-73', 'envy', 'primary', "'I envied the arrogant when I saw the prosperity of the wicked' — honest admission that material success of the unjust can erode faith."],
  ['psa-psalm-73', 'faith', 'secondary', "Faith almost collapses — 'my feet had nearly slipped' — until the psalmist enters the sanctuary and sees the end of the wicked."],
  ['psa-psalm-73', 'presence-of-god', 'secondary', "The resolution is not intellectual but relational — 'You hold me by my right hand... Whom have I in heaven but you?'"],
  ['psa-psalm-73', 'justice-of-god', 'secondary', "The psalmist eventually sees the wicked's prosperity as temporary and their destruction as sudden — justice deferred, not denied."],
  ['psa-psalm-73', 'worship', 'illustrative', "It is in the sanctuary — in worship — that perspective shifts, not in philosophical argument."],
  ['psa-psalm-73', 'prosperity', 'illustrative', "The psalm interrogates the relationship between wealth and divine favor — a question prosperity theology still cannot answer."],

  // psa-psalm-88 — Psalm 88:1–88:18
  ['psa-psalm-88', 'despair', 'primary', "The only psalm with no resolution — it begins in darkness and ends in darkness: 'darkness is my closest friend.'"],
  ['psa-psalm-88', 'dark-night-of-soul', 'primary', "Psalm 88 validates the experience of unresolved suffering — faith that persists in praying even when prayer receives no answer."],
  ['psa-psalm-88', 'silence-of-god', 'primary', "God does not respond. The psalm is a prayer hurled into silence — and the Bible includes it without correction or resolution."],
  ['psa-psalm-88', 'lament', 'secondary', "The psalm follows lament structure but breaks its own rules — the expected turn to hope never comes."],
  ['psa-psalm-88', 'isolation', 'secondary', "'You have taken from me friend and neighbor — darkness is my closest friend' — suffering as radical loneliness."],
  ['psa-psalm-88', 'feeling-forgotten-by-god', 'secondary', "'Why, LORD, do you reject me and hide your face from me?' — the experience of divine rejection without explanation."],
  ['psa-psalm-88', 'death-and-afterlife', 'illustrative', "'Do the dead rise up to praise you?' — the psalm questions whether death ends relationship with God."],

  // psa-psalm-90 — Psalm 90:1–90:17
  ['psa-psalm-90', 'death-and-afterlife', 'primary', "The psalm meditates on human mortality with unflinching honesty — 'You turn people back to dust; you sweep them away in the sleep of death.'"],
  ['psa-psalm-90', 'transcendence', 'primary', "'Before the mountains were born or you brought forth the whole world, from everlasting to everlasting you are God' — divine eternity dwarfing human brevity."],
  ['psa-psalm-90', 'wisdom', 'secondary', "'Teach us to number our days, that we may gain a heart of wisdom' — mortality awareness as the beginning of wisdom."],
  ['psa-psalm-90', 'wrath-of-god', 'secondary', "Human brevity is connected to divine displeasure — 'We are consumed by your anger and terrified by your indignation.'"],
  ['psa-psalm-90', 'patience', 'secondary', "A thousand years are like a day in God's sight — divine patience that makes human urgency look like impatience."],
  ['psa-psalm-90', 'prayer', 'illustrative', "The psalm ends with a petition for God's favor — 'Establish the work of our hands' — prayer that acknowledges human fragility while asking for lasting significance."],

  // psa-psalm-103 — Psalm 103:1–103:22
  ['psa-psalm-103', 'divine-mercy', 'primary', "'The LORD is compassionate and gracious, slow to anger, abounding in love' — the most generous portrait of God's character in the Psalter."],
  ['psa-psalm-103', 'forgiveness', 'primary', "'As far as the east is from the west, so far has he removed our transgressions from us' — forgiveness as total spatial separation from sin."],
  ['psa-psalm-103', 'love-of-god', 'primary', "God's love is described as a father's compassion for his children — tender, knowing, aware of human frailty."],
  ['psa-psalm-103', 'praise', 'secondary', "The psalm commands the soul to bless the LORD and forget none of his benefits — praise as deliberate remembrance."],
  ['psa-psalm-103', 'gratitude', 'secondary', "The list of benefits — forgiveness, healing, redemption, satisfaction — is a catalog of reasons for thankfulness."],
  ['psa-psalm-103', 'steadfast-love', 'secondary', "'As high as the heavens are above the earth, so great is his steadfast love' — hesed measured in cosmic dimensions."],
  ['psa-psalm-103', 'father-love', 'illustrative', "'As a father has compassion on his children, so the LORD has compassion on those who fear him' — divine love framed in parental tenderness."],

  // psa-psalm-119 — Psalm 119:1–119:176
  ['psa-psalm-119', 'torah', 'primary', "176 verses of sustained meditation on God's word — every verse contains a synonym for Torah (law, statutes, precepts, commands, decrees, promises)."],
  ['psa-psalm-119', 'obedience', 'primary', "The psalm treats obedience not as burden but as delight — 'I run in the path of your commands, for you have broadened my understanding.'"],
  ['psa-psalm-119', 'love-of-god', 'secondary', "The psalm's obsessive focus on God's word is an expression of love — Torah as love letter, not legal code."],
  ['psa-psalm-119', 'suffering', 'secondary', "Interspersed with praise are cries of suffering — 'I am laid low in the dust; preserve my life according to your word' — the Torah as anchor in affliction."],
  ['psa-psalm-119', 'wisdom', 'secondary', "'Your commands make me wiser than my enemies' — Torah study as the source of practical wisdom for daily life."],
  ['psa-psalm-119', 'perseverance-in-faith', 'illustrative', "The acrostic structure itself embodies perseverance — working through every letter of the alphabet, every facet of devotion."],
  ['psa-psalm-119', 'prayer', 'illustrative', "The psalm alternates between meditation and petition — Torah study and prayer as inseparable practices."],

  // psa-psalm-137 — Psalm 137:1–137:9
  ['psa-psalm-137', 'exile', 'primary', "'By the rivers of Babylon we sat and wept when we remembered Zion' — the defining psalm of exile, homesickness as liturgical memory."],
  ['psa-psalm-137', 'national-grief', 'primary', "The grief is communal — a people mourning a destroyed homeland, hanging their harps on willows, unable to sing the LORD's song in a foreign land."],
  ['psa-psalm-137', 'vengeance', 'secondary', "The psalm's final verses — 'Happy is the one who seizes your infants and dashes them against the rocks' — are the Bible's most disturbing prayer, raw rage given liturgical voice."],
  ['psa-psalm-137', 'homesickness', 'secondary', "'If I forget you, Jerusalem, may my right hand forget its skill' — memory of home as sacred obligation."],
  ['psa-psalm-137', 'lament', 'secondary', "The psalm moves from grief to rage — lament that refuses to sanitize the emotional truth of dispossession."],
  ['psa-psalm-137', 'displacement', 'illustrative', "The captors demand entertainment — 'Sing us one of the songs of Zion' — forced performance as an additional cruelty of displacement."],
  ['psa-psalm-137', 'anger', 'illustrative', "The psalm's honesty about violent rage challenges any theology that excludes difficult emotions from prayer."],

  // psa-psalm-139 — Psalm 139:1–139:24
  ['psa-psalm-139', 'intimacy-with-god', 'primary', "'You have searched me, LORD, and you know me' — the most sustained meditation on God's intimate knowledge of the individual in all of Scripture."],
  ['psa-psalm-139', 'presence-of-god', 'primary', "'Where can I go from your Spirit? Where can I flee from your presence?' — divine omnipresence experienced as inescapable intimacy."],
  ['psa-psalm-139', 'creation', 'secondary', "'You knit me together in my mother's womb' — creation language applied to individual formation, each person as divine handiwork."],
  ['psa-psalm-139', 'identity', 'secondary', "The psalm grounds human identity in divine knowledge — 'I am fearfully and wonderfully made' — identity as gift, not achievement."],
  ['psa-psalm-139', 'sovereignty', 'secondary', "'All the days ordained for me were written in your book before one of them came to be' — divine foreknowledge as the context of individual life."],
  ['psa-psalm-139', 'fear-of-god', 'illustrative', "The psalm's final prayer — 'Search me, O God, and know my heart; test me and know my anxious thoughts' — invites the very scrutiny it has described."],

  // psa-psalms-of-praise — Psalms 145–150
  ['psa-psalms-of-praise', 'praise', 'primary', "The Psalter ends in an unbroken crescendo of praise — six psalms that gather all creation into a single sustained shout of worship."],
  ['psa-psalms-of-praise', 'worship', 'primary', "'Let everything that has breath praise the LORD' — worship as the telos of creation, the purpose for which everything exists."],
  ['psa-psalms-of-praise', 'joy', 'primary', "The finale is pure, undiluted joy — after 144 psalms of lament, confession, and struggle, the Psalter resolves into exuberant celebration."],
  ['psa-psalms-of-praise', 'creation', 'secondary', "Sun, moon, stars, sea creatures, mountains, trees, animals, and humans all join the chorus — creation as a praise-generating system."],
  ['psa-psalms-of-praise', 'glory-of-god', 'secondary', "The doxology celebrates God's greatness, power, faithfulness, and justice — every divine attribute eliciting praise."],
  ['psa-psalms-of-praise', 'justice-for-oppressed', 'secondary', "Even in praise, justice appears — 'The LORD sets prisoners free, the LORD gives sight to the blind, the LORD lifts up those who are bowed down.'"],
  ['psa-psalms-of-praise', 'kingdom-of-god', 'illustrative', "'The LORD reigns forever' — the Psalter's last word is that God is king, and his kingdom endures."],

  // ==================== PROVERBS (8 units) ====================

  // pro-prologue — Proverbs 1:1–1:7
  ['pro-prologue', 'wisdom', 'primary', "The entire book's thesis: 'The fear of the LORD is the beginning of knowledge' — wisdom as relationship, not information."],
  ['pro-prologue', 'fear-of-god', 'primary', "Fear of God is not terror but awe-filled reverence — the foundational orientation from which all true knowledge flows."],
  ['pro-prologue', 'discernment', 'secondary', "The prologue promises to teach prudence, knowledge, and discretion — wisdom as skill in navigating life's complexity."],
  ['pro-prologue', 'foolishness', 'secondary', "'Fools despise wisdom and instruction' — folly defined not as stupidity but as the refusal to learn."],
  ['pro-prologue', 'parenting', 'illustrative', "'Listen, my son, to your father's instruction' — wisdom as intergenerational transmission within family."],
  ['pro-prologue', 'mentorship', 'illustrative', "The father-son address establishes the book's pedagogical framework — wisdom passed from teacher to student."],

  // pro-lady-wisdom — Proverbs 1:20–9:6
  ['pro-lady-wisdom', 'wisdom', 'primary', "Wisdom personified as a woman crying in the streets — public, accessible, urgent, not hidden in ivory towers."],
  ['pro-lady-wisdom', 'creation', 'primary', "'I was there when he set the heavens in place' — Wisdom as God's companion at creation, present before the world began."],
  ['pro-lady-wisdom', 'calling', 'secondary', "Lady Wisdom calls to the simple and the scoffers — wisdom as vocation that pursues the one who does not yet seek it."],
  ['pro-lady-wisdom', 'blessing', 'secondary', "'Whoever finds me finds life' — wisdom associated with flourishing, prosperity, and life itself."],
  ['pro-lady-wisdom', 'discernment', 'secondary', "The extended warnings against the 'forbidden woman' teach discernment between true wisdom and seductive shortcuts."],
  ['pro-lady-wisdom', 'temptation', 'illustrative', "The streets where Wisdom calls are the same streets where temptation lurks — choosing wisdom requires resisting easier alternatives."],

  // pro-the-sluggard — Proverbs 6:6–26:16
  ['pro-the-sluggard', 'practical-wisdom', 'primary', "The sluggard portraits teach wisdom through negative example — what not to do becomes a mirror for self-examination."],
  ['pro-the-sluggard', 'foolishness', 'primary', "'The sluggard says, There is a lion in the road!' — laziness invents increasingly absurd excuses to avoid work."],
  ['pro-the-sluggard', 'consequences-of-sin', 'secondary', "'A little sleep, a little slumber... and poverty will come on you like a thief' — small compromises compound into disaster."],
  ['pro-the-sluggard', 'vocation', 'secondary', "'Go to the ant, you sluggard; consider its ways and be wise!' — the ant's diligence as a model for purposeful labor."],
  ['pro-the-sluggard', 'poverty', 'illustrative', "Poverty in Proverbs is sometimes the result of laziness — an uncomfortable truth the book states without apology."],
  ['pro-the-sluggard', 'humility', 'illustrative', "The humor of the sluggard portraits is designed to disarm — you laugh before you realize you're looking in a mirror."],

  // pro-lady-folly — Proverbs 9:13–9:18
  ['pro-lady-folly', 'foolishness', 'primary', "Lady Folly is loud, seductive, and sits at the highest point of the city offering stolen water — a direct counterfeit of Lady Wisdom's invitation."],
  ['pro-lady-folly', 'temptation', 'primary', "'Stolen water is sweet; food eaten in secret is delicious!' — temptation's promise that transgression tastes better than obedience."],
  ['pro-lady-folly', 'death-and-afterlife', 'secondary', "'Her guests are deep in the realm of the dead' — folly's feast ends in death, though the guests do not know it."],
  ['pro-lady-folly', 'discernment', 'secondary', "The parallel structure with Lady Wisdom forces a choice — both call from the same streets, but the destinations are opposite."],
  ['pro-lady-folly', 'consequences-of-sin', 'illustrative', "Those who enter Lady Folly's house do not return — sin's consequences are irreversible in this portrait."],

  // pro-the-tongue — Proverbs 10:19–25:11
  ['pro-the-tongue', 'practical-wisdom', 'primary', "'Death and life are in the power of the tongue' — speech as the most consequential daily act, capable of building up or destroying."],
  ['pro-the-tongue', 'honesty', 'secondary', "The tongue proverbs prize truthful speech — 'Lying lips are an abomination to the LORD, but those who act faithfully are his delight.'"],
  ['pro-the-tongue', 'conflict', 'secondary', "'A gentle answer turns away wrath, but a harsh word stirs up anger' — the tongue as the primary instrument of either peacemaking or warfare."],
  ['pro-the-tongue', 'integrity', 'secondary', "What you say reveals what you are — 'The tongue of the righteous is choice silver' versus the worthless speech of the wicked."],
  ['pro-the-tongue', 'peacemaking', 'illustrative', "'A word fitly spoken is like apples of gold in settings of silver' — the right word at the right time as an act of beauty."],
  ['pro-the-tongue', 'compassion', 'illustrative', "'The tongue of the wise brings healing' — speech as medicine, not just communication."],

  // pro-wealth-and-poverty — Proverbs 11:24–30:9
  ['pro-wealth-and-poverty', 'wealth', 'primary', "Proverbs refuses simplistic views of money — wealth can be a blessing or a trap, and the book presents both without contradiction."],
  ['pro-wealth-and-poverty', 'poverty', 'primary', "Some poverty results from laziness, some from oppression — Proverbs distinguishes between the two without romanticizing either."],
  ['pro-wealth-and-poverty', 'social-justice', 'secondary', "'Whoever oppresses the poor shows contempt for their Maker, but whoever is kind to the needy honors God' — economic ethics grounded in creation theology."],
  ['pro-wealth-and-poverty', 'generosity', 'secondary', "'One person gives freely, yet gains even more; another withholds unduly, but comes to poverty' — generosity as counter-intuitive economics."],
  ['pro-wealth-and-poverty', 'contentment', 'secondary', "Agur's prayer — 'Give me neither poverty nor riches' — is the Bible's most realistic prayer about money."],
  ['pro-wealth-and-poverty', 'practical-wisdom', 'illustrative', "The proverbs on money are practical, not ideological — they observe rather than systematize."],
  ['pro-wealth-and-poverty', 'justice-for-oppressed', 'illustrative', "'Do not exploit the poor because they are poor and do not crush the needy in court' — justice as protecting the vulnerable from systemic exploitation."],

  // pro-friendship — Proverbs 17:17–27:17
  ['pro-friendship', 'friendship', 'primary', "'Iron sharpens iron, and one person sharpens another' — real friendship defined not by comfort but by mutual transformation."],
  ['pro-friendship', 'loyalty', 'primary', "'A friend loves at all times, and a brother is born for a time of adversity' — loyalty tested by crisis, not convenience."],
  ['pro-friendship', 'honesty', 'secondary', "'Wounds from a friend can be trusted, but an enemy multiplies kisses' — honest critique as the highest form of friendship."],
  ['pro-friendship', 'community', 'secondary', "Proverbs assumes life is communal — isolation is dangerous, and the fool who separates himself 'rages against all sound judgment.'"],
  ['pro-friendship', 'practical-wisdom', 'illustrative', "Friendship wisdom is observational — learned from watching relationships succeed and fail over time."],

  // pro-the-noble-wife — Proverbs 31:10–31:31
  ['pro-the-noble-wife', 'wisdom', 'primary', "The Proverbs 31 woman is Lady Wisdom embodied in daily life — her value is 'far above rubies,' echoing Wisdom's own self-description."],
  ['pro-the-noble-wife', 'vocation', 'primary', "She is an entrepreneur, manager, trader, and benefactor — vocation as holistic competence, not domestic limitation."],
  ['pro-the-noble-wife', 'marriage', 'secondary', "The poem celebrates a partnership where 'her husband has full confidence in her' — marriage as mutual trust and shared enterprise."],
  ['pro-the-noble-wife', 'generosity', 'secondary', "'She opens her arms to the poor and extends her hands to the needy' — economic success directed toward community welfare."],
  ['pro-the-noble-wife', 'fear-of-god', 'secondary', "'Charm is deceptive, and beauty is fleeting; but a woman who fears the LORD is to be praised' — the book's thesis restated in its final poem."],
  ['pro-the-noble-wife', 'courage', 'illustrative', "'She is clothed with strength and dignity; she can laugh at the days to come' — confidence grounded in competence and character."],

  // ==================== ECCLESIASTES (6 units) ====================

  // ecc-everything-is-meaningless — Ecclesiastes 1:1–1:18
  ['ecc-everything-is-meaningless', 'despair', 'primary', "'Vanity of vanities! All is vanity' — the opening thesis declares everything under the sun to be hevel, vapor, mist — meaningful enough to perceive but impossible to grasp."],
  ['ecc-everything-is-meaningless', 'wisdom', 'primary', "Qohelet's pursuit of wisdom itself proves futile — 'For in much wisdom is much grief, and whoever increases knowledge increases sorrow.'"],
  ['ecc-everything-is-meaningless', 'death-and-afterlife', 'secondary', "The cyclical nature of all things — sun rising, wind blowing, streams flowing — suggests existence without progress, life without lasting change."],
  ['ecc-everything-is-meaningless', 'sovereignty', 'secondary', "If everything is meaningless, the question of why God made it this way looms beneath the surface."],
  ['ecc-everything-is-meaningless', 'foolishness', 'illustrative', "Even the pursuit of understanding proves to be 'a chasing after wind' — the wise fool who knows his quest is futile but cannot stop."],

  // ecc-time-for-everything — Ecclesiastes 3:1–3:22
  ['ecc-time-for-everything', 'sovereignty', 'primary', "The poem asserts God has made everything beautiful in its time — a hidden order exists that humans can perceive but not control."],
  ['ecc-time-for-everything', 'death-and-afterlife', 'secondary', "'A time to be born and a time to die' — mortality is woven into the poem's structure as one polarity among many."],
  ['ecc-time-for-everything', 'mystery-of-god', 'secondary', "'He has set eternity in the human heart; yet no one can fathom what God has done from beginning to end' — the ache of knowing there is more without being able to grasp it."],
  ['ecc-time-for-everything', 'patience', 'secondary', "The poem teaches that forcing the wrong action at the wrong time is as destructive as inaction — timing is everything."],
  ['ecc-time-for-everything', 'joy', 'illustrative', "'There is nothing better for a person than to enjoy their work' — joy as the response to mystery, not its solution."],
  ['ecc-time-for-everything', 'peace', 'illustrative', "'A time for war and a time for peace' — even conflict and resolution follow rhythms humans cannot orchestrate."],

  // ecc-oppression-and-toil — Ecclesiastes 4:1–4:16
  ['ecc-oppression-and-toil', 'oppression', 'primary', "Qohelet sees the tears of the oppressed with no one to comfort them — power is on the side of the oppressors, and there is no advocate."],
  ['ecc-oppression-and-toil', 'injustice', 'primary', "The observation is stark: the powerful exploit, the weak suffer, and the system does not self-correct."],
  ['ecc-oppression-and-toil', 'loneliness', 'secondary', "'Two are better than one... but pity anyone who falls and has no one to help them up' — isolation as existential vulnerability."],
  ['ecc-oppression-and-toil', 'envy', 'secondary', "'All toil and all achievement spring from one person's envy of another' — competition as the hidden engine of productivity."],
  ['ecc-oppression-and-toil', 'community', 'secondary', "The 'cord of three strands' passage affirms companionship as the antidote to the futility of solitary achievement."],
  ['ecc-oppression-and-toil', 'despair', 'illustrative', "Qohelet envies the dead more than the living, and the never-born most of all — despair deepened by moral observation."],

  // ecc-enjoy-life — Ecclesiastes 5:18–9:10
  ['ecc-enjoy-life', 'joy', 'primary', "'Go, eat your food with gladness, and drink your wine with a joyful heart, for God has already approved what you do' — radical enjoyment as the response to meaninglessness."],
  ['ecc-enjoy-life', 'contentment', 'primary', "Qohelet's repeated command to enjoy life is not escapism — it is the disciplined practice of receiving each day's pleasure as God's gift."],
  ['ecc-enjoy-life', 'death-and-afterlife', 'secondary', "'Whatever your hand finds to do, do it with all your might, for in the realm of the dead there is no working' — mortality as the urgency behind enjoyment."],
  ['ecc-enjoy-life', 'marriage', 'secondary', "'Enjoy life with your wife, whom you love, all the days of this meaningless life' — love as the best response to absurdity."],
  ['ecc-enjoy-life', 'feast', 'illustrative', "Eating, drinking, and celebrating are not distractions from meaning but the meaning itself — ordinary pleasure as divine gift."],
  ['ecc-enjoy-life', 'gratitude', 'illustrative', "The call to enjoy implies gratitude — receiving what is given rather than grasping for what is withheld."],

  // ecc-death-comes-for-all — Ecclesiastes 9:1–12:8
  ['ecc-death-comes-for-all', 'death-and-afterlife', 'primary', "Death is the great equalizer — 'The same destiny overtakes all: the righteous and the wicked, the good and the bad, the clean and the unclean.'"],
  ['ecc-death-comes-for-all', 'despair', 'primary', "The old age poem in chapter 12 describes bodily decline in haunting metaphors — the silver cord severed, the golden bowl broken, dust returning to dust."],
  ['ecc-death-comes-for-all', 'fear-of-death', 'secondary', "Qohelet stares at death without flinching — no afterlife hope softens the blow, making this the Bible's most unflinching mortality meditation."],
  ['ecc-death-comes-for-all', 'wisdom', 'secondary', "'Wisdom is better than folly, just as light is better than darkness — but the same fate overtakes them both' — wisdom's value limited by death's finality."],
  ['ecc-death-comes-for-all', 'creation', 'illustrative', "'Remember your Creator in the days of your youth, before the days of trouble come' — creation memory as the anchor against decay."],
  ['ecc-death-comes-for-all', 'suffering', 'illustrative', "The catalog of aging — dimming eyes, trembling hands, grinding teeth — is suffering described with poetic precision."],

  // ecc-conclusion — Ecclesiastes 12:9–12:14
  ['ecc-conclusion', 'fear-of-god', 'primary', "'Fear God and keep his commandments, for this is the duty of all mankind' — the editor's frame reasserts orthodoxy over Qohelet's subversion."],
  ['ecc-conclusion', 'divine-judgment', 'secondary', "'God will bring every deed into judgment, including every hidden thing, whether it is good or evil' — a final accountability that Qohelet's main text questioned."],
  ['ecc-conclusion', 'wisdom', 'secondary', "The epilogue praises Qohelet as a wise teacher while gently redirecting — 'Of making many books there is no end, and much study wearies the body.'"],
  ['ecc-conclusion', 'obedience', 'secondary', "The editor reduces the book's sprawling questions to a single imperative — obey God and trust the judgment to him."],
  ['ecc-conclusion', 'torah', 'illustrative', "The command to keep God's commandments echoes Deuteronomy — the editor anchors Ecclesiastes within Torah faithfulness."],

  // ==================== SONG OF SOLOMON (4 units) ====================

  // sng-lovers-desire — Song of Solomon 1:1–2:7
  ['sng-lovers-desire', 'eros', 'primary', "'Let him kiss me with the kisses of his mouth! For your love is better than wine' — unashamed erotic desire as the poem's opening note."],
  ['sng-lovers-desire', 'love', 'primary', "The mutual longing between lovers is celebrated without apology — desire itself is portrayed as good, beautiful, and urgent."],
  ['sng-lovers-desire', 'identity', 'secondary', "'Dark am I, yet lovely' — the woman asserts her beauty against social judgment, claiming identity through desire rather than convention."],
  ['sng-lovers-desire', 'joy', 'secondary', "The lovers' delight in each other generates an atmosphere of intoxicating joy — wine, fragrance, spring."],
  ['sng-lovers-desire', 'intimacy-with-god', 'illustrative', "Jewish and Christian tradition reads the Song as allegory for divine-human love — eros as a window into mystical intimacy."],
  ['sng-lovers-desire', 'celebration', 'illustrative', "The poem celebrates the body, the senses, and physical presence — creation theology in its most embodied form."],

  // sng-the-search — Song of Solomon 3:1–5:8
  ['sng-the-search', 'loneliness', 'primary', "The woman searches the city at night for her beloved — desire as vulnerability, longing as exposure to danger."],
  ['sng-the-search', 'eros', 'primary', "The search is driven by erotic longing — 'I looked for the one my heart loves' — not duty but desire."],
  ['sng-the-search', 'fear', 'secondary', "The city watchmen find and beat the woman — the search for love involves real risk and real violence."],
  ['sng-the-search', 'perseverance-in-faith', 'secondary', "Despite danger, the woman does not stop searching — persistence in love as a model for relentless pursuit."],
  ['sng-the-search', 'abandonment', 'illustrative', "The beloved's absence creates an ache that drives the entire movement — absence as intensifier of desire."],

  // sng-garden-of-delights — Song of Solomon 4:1–5:1
  ['sng-garden-of-delights', 'eros', 'primary', "A sustained, detailed celebration of the woman's body — 'Your two breasts are like two fawns' — the Bible's most explicit affirmation of sexual delight."],
  ['sng-garden-of-delights', 'marriage', 'secondary', "'A garden locked is my sister, my bride' — exclusivity and consummation celebrated within committed relationship."],
  ['sng-garden-of-delights', 'creation', 'secondary', "The garden imagery connects human love to Eden — bodies and pleasure as part of the created good."],
  ['sng-garden-of-delights', 'joy', 'secondary', "'Eat, friends, and drink; drink your fill of love' — the divine voice (or the poet's) blessing physical union."],
  ['sng-garden-of-delights', 'celebration', 'illustrative', "The consummation is described with pomegranates, myrrh, honey, wine — a feast of the senses affirming bodily existence."],
  ['sng-garden-of-delights', 'holiness', 'illustrative', "The Song's inclusion in Scripture makes physical love a holy subject — desire sanctified, not merely tolerated."],

  // sng-love-is-strong-as-death — Song of Solomon 8:5–8:14
  ['sng-love-is-strong-as-death', 'love', 'primary', "'Love is strong as death, jealousy fierce as the grave; its flashes are flashes of fire, the very flame of the LORD' — the poem's climactic thesis equating love with cosmic force."],
  ['sng-love-is-strong-as-death', 'death-and-afterlife', 'secondary', "Love is measured against death — the only force in the poem considered strong enough to serve as comparison."],
  ['sng-love-is-strong-as-death', 'eros', 'secondary', "The entire poem resolves into a declaration that erotic love cannot be quenched — 'Many waters cannot quench love; rivers cannot sweep it away.'"],
  ['sng-love-is-strong-as-death', 'wealth', 'secondary', "'If one were to give all the wealth of one's house for love, it would be utterly scorned' — love's value transcends economics."],
  ['sng-love-is-strong-as-death', 'divine-jealousy', 'illustrative', "The 'flame of the LORD' — shalhevet-yah — is the only explicit reference to God in the Song, linking love's intensity to divine fire."],

  // ==================== ISAIAH (9 units) ====================

  // isa-swords-into-plowshares — Isaiah 2:1–2:5
  ['isa-swords-into-plowshares', 'peace', 'primary', "'They will beat their swords into plowshares and their spears into pruning hooks' — the defining vision of universal peace in prophetic literature."],
  ['isa-swords-into-plowshares', 'eschatological-hope', 'primary', "The vision is explicitly future — 'in the last days' — hope directed not at the present but at God's ultimate intention for creation."],
  ['isa-swords-into-plowshares', 'kingdom-of-god', 'secondary', "'The mountain of the LORD's temple will be established as the highest of the mountains' — God's kingdom as the political center of all nations."],
  ['isa-swords-into-plowshares', 'inclusion', 'secondary', "'All nations will stream to it' — universal access to God, not ethnic exclusion."],
  ['isa-swords-into-plowshares', 'justice', 'secondary', "'He will judge between the nations and will settle disputes' — peace built on justice, not just the absence of conflict."],
  ['isa-swords-into-plowshares', 'prophetic-hope', 'illustrative', "The vision is the prophetic tradition at its most ambitious — imagining a world completely transformed."],

  // isa-the-vineyard-song — Isaiah 5:1–5:7
  ['isa-the-vineyard-song', 'covenant-breaking', 'primary', "The vineyard that produced bad grapes despite perfect care is Israel failing to produce justice despite every advantage of covenant."],
  ['isa-the-vineyard-song', 'divine-judgment', 'primary', "God will remove the vineyard's hedge and wall — judgment as the withdrawal of protection, not the imposition of violence."],
  ['isa-the-vineyard-song', 'injustice', 'secondary', "'He looked for justice (mishpat) but saw bloodshed (mispach); for righteousness (tsedaqah) but heard cries of distress (tse'aqah)' — the Hebrew wordplay makes injustice a parody of justice."],
  ['isa-the-vineyard-song', 'love-of-god', 'secondary', "The vineyard song begins as a love song — God's investment in Israel is framed as romantic devotion that has been spurned."],
  ['isa-the-vineyard-song', 'god-as-husband', 'illustrative', "The vineyard-as-beloved metaphor anticipates Hosea's marriage metaphor — God as the spurned lover."],
  ['isa-the-vineyard-song', 'consequences-of-sin', 'illustrative', "The vineyard will become a wasteland — consequences framed not as arbitrary punishment but as natural result of rejecting care."],

  // isa-isaiahs-call — Isaiah 6:1–6:13
  ['isa-isaiahs-call', 'holiness', 'primary', "'Holy, holy, holy is the LORD Almighty' — the triple repetition (trisagion) expresses divine holiness as the defining attribute Isaiah encounters."],
  ['isa-isaiahs-call', 'calling', 'primary', "'Here am I. Send me!' — Isaiah's volunteering for prophetic mission after his lips are cleansed by the burning coal."],
  ['isa-isaiahs-call', 'presence-of-god', 'secondary', "Isaiah sees God on the throne, with seraphim and smoke filling the temple — theophany as overwhelming sensory encounter."],
  ['isa-isaiahs-call', 'sin', 'secondary', "'Woe to me! I am ruined! For I am a man of unclean lips' — the encounter with holiness reveals sin before it offers commission."],
  ['isa-isaiahs-call', 'atonement', 'secondary', "The burning coal touches Isaiah's lips — 'your guilt is taken away and your sin atoned for' — cleansing through fire as precondition for service."],
  ['isa-isaiahs-call', 'transcendence', 'illustrative', "The temple shakes, smoke fills the room, the train of God's robe fills the space — the otherness of God made physically manifest."],
  ['isa-isaiahs-call', 'glory-of-god', 'illustrative', "'The whole earth is full of his glory' — the seraphim's declaration that divine glory is not confined to the temple."],

  // isa-immanuel-prophecy — Isaiah 7:1–7:25
  ['isa-immanuel-prophecy', 'messianic-prophecy', 'primary', "'The virgin will conceive and give birth to a son, and will call him Immanuel — God with us' — a sign in crisis that Christians read as pointing to Christ."],
  ['isa-immanuel-prophecy', 'trust', 'primary', "King Ahaz is told to trust God rather than ally with Assyria — the sign is offered to a king who refuses to believe."],
  ['isa-immanuel-prophecy', 'presence-of-god', 'secondary', "The name Immanuel — 'God with us' — is the theological heart: divine presence in the midst of political crisis."],
  ['isa-immanuel-prophecy', 'faith-vs-sight', 'secondary', "Ahaz chooses the visible alliance over the invisible promise — the politics of calculation vs. the risk of faith."],
  ['isa-immanuel-prophecy', 'divine-judgment', 'secondary', "Because Ahaz refuses the sign, Assyria will come — the very power he trusts will become the instrument of judgment."],
  ['isa-immanuel-prophecy', 'fear', 'illustrative', "Ahaz's heart 'shook as the trees of the forest shake with the wind' — political fear driving theological failure."],

  // isa-prince-of-peace — Isaiah 9:1–9:7
  ['isa-prince-of-peace', 'messianic-prophecy', 'primary', "'For to us a child is born... and he will be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace' — the defining messianic title passage."],
  ['isa-prince-of-peace', 'hope', 'primary', "'The people walking in darkness have seen a great light' — hope breaking into the specific geography of Galilee's suffering."],
  ['isa-prince-of-peace', 'kingdom-of-god', 'secondary', "'Of the greatness of his government and peace there will be no end' — a kingdom characterized by justice and righteousness forever."],
  ['isa-prince-of-peace', 'peace', 'secondary', "The Prince of Peace establishes a reign not through military conquest but through justice — peace as the fruit of righteousness."],
  ['isa-prince-of-peace', 'davidic-covenant', 'secondary', "'He will reign on David's throne' — the messianic hope rooted in God's promise to David's dynasty."],
  ['isa-prince-of-peace', 'liberation', 'illustrative', "'For as in the day of Midian's defeat, you have shattered the yoke that burdens them' — liberation from oppression as the context for the child's birth."],

  // isa-comfort-my-people — Isaiah 40:1–40:31
  ['isa-comfort-my-people', 'prophetic-hope', 'primary', "'Comfort, comfort my people' — the great hinge of Isaiah, where judgment gives way to consolation and exile's end is announced."],
  ['isa-comfort-my-people', 'power-of-god', 'primary', "'He gives strength to the weary and increases the power of the weak... those who hope in the LORD will renew their strength' — divine power as the resource of the exhausted."],
  ['isa-comfort-my-people', 'faithfulness-of-god', 'secondary', "'The word of our God endures forever' — God's faithfulness contrasted with the transience of human power (grass that withers, flowers that fade)."],
  ['isa-comfort-my-people', 'sovereignty', 'secondary', "'Who has measured the waters in the hollow of his hand?' — God's sovereignty over nations, which are 'like a drop in a bucket.'"],
  ['isa-comfort-my-people', 'return-from-exile', 'secondary', "'Every valley shall be raised up, every mountain made low' — the imagery of road-building for the exiles' return."],
  ['isa-comfort-my-people', 'hope-in-suffering', 'illustrative', "The promise comes to a people who said 'My way is hidden from the LORD' — comfort addressing the specific despair of exile."],
  ['isa-comfort-my-people', 'endurance', 'illustrative', "'They will run and not grow weary, they will walk and not be faint' — endurance as a gift of hope, not human grit."],

  // isa-the-suffering-servant — Isaiah 52:13–53:12
  ['isa-the-suffering-servant', 'redemptive-suffering', 'primary', "'He was pierced for our transgressions, he was crushed for our iniquities' — suffering that is vicarious, voluntary, and redemptive."],
  ['isa-the-suffering-servant', 'atonement', 'primary', "'The LORD has laid on him the iniquity of us all' — substitutionary bearing of sin as the mechanism of redemption."],
  ['isa-the-suffering-servant', 'messianic-prophecy', 'primary', "The Servant's suffering, rejection, and vindication form the primary Old Testament basis for Christian understanding of Christ's passion."],
  ['isa-the-suffering-servant', 'innocent-suffering', 'secondary', "'He was oppressed and afflicted, yet he did not open his mouth' — the Servant suffers without guilt, like a lamb before its shearers."],
  ['isa-the-suffering-servant', 'shame', 'secondary', "'He was despised and rejected by mankind' — the Servant endures social contempt as part of the redemptive mission."],
  ['isa-the-suffering-servant', 'self-sacrificial-love', 'secondary', "The Servant's willingness to bear others' sins is the purest expression of self-sacrificial love in the Hebrew Bible."],
  ['isa-the-suffering-servant', 'vindication', 'illustrative', "'After he has suffered, he will see the light of life and be satisfied' — suffering vindicated not by explanation but by resurrection-like restoration."],
  ['isa-the-suffering-servant', 'salvation', 'illustrative', "'By his wounds we are healed' — salvation accomplished through the suffering of another."],

  // isa-the-anointed-one — Isaiah 61:1–61:11
  ['isa-the-anointed-one', 'liberation', 'primary', "'The Spirit of the Sovereign LORD is on me... to proclaim freedom for the captives and release from darkness for the prisoners' — the mission of the anointed defined as liberation."],
  ['isa-the-anointed-one', 'justice-for-oppressed', 'primary', "Good news to the poor, binding up the brokenhearted, comforting mourners — justice expressed as care for those society has crushed."],
  ['isa-the-anointed-one', 'messianic-prophecy', 'secondary', "Jesus reads this passage in the Nazareth synagogue and declares 'Today this scripture is fulfilled in your hearing' — the definitive messianic self-identification."],
  ['isa-the-anointed-one', 'holy-spirit', 'secondary', "'The Spirit of the Sovereign LORD is on me' — the anointing is Spirit-empowerment for a specific mission."],
  ['isa-the-anointed-one', 'restoration-from-shame', 'secondary', "'Instead of your shame you will receive a double portion' — restoration that overcompensates for past humiliation."],
  ['isa-the-anointed-one', 'joy', 'illustrative', "'The oil of joy instead of mourning, a garment of praise instead of a spirit of despair' — transformation described in sensory terms."],

  // isa-new-heavens-new-earth — Isaiah 65:17–65:25
  ['isa-new-heavens-new-earth', 'new-creation', 'primary', "'See, I will create new heavens and a new earth' — the most expansive vision of cosmic renewal in the prophetic literature."],
  ['isa-new-heavens-new-earth', 'eschatological-hope', 'primary', "Death, weeping, and injustice will be abolished — the vision describes a world where the fundamental conditions of suffering are reversed."],
  ['isa-new-heavens-new-earth', 'peace', 'secondary', "'The wolf and the lamb will feed together' — even the animal kingdom is reconciled in the new creation."],
  ['isa-new-heavens-new-earth', 'joy', 'secondary', "'I will rejoice over Jerusalem and take delight in my people' — God's joy over the restored city."],
  ['isa-new-heavens-new-earth', 'justice', 'secondary', "'No longer will they build houses and others live in them' — economic justice built into the structure of the new world."],
  ['isa-new-heavens-new-earth', 'abundance', 'illustrative', "Long life, secure homes, fruitful labor — the new creation is not ethereal but material, tangible, and embodied."],

  // ==================== JEREMIAH (8 units) ====================

  // jer-jeremiahs-call — Jeremiah 1:1–1:19
  ['jer-jeremiahs-call', 'calling', 'primary', "'Before I formed you in the womb I knew you; before you were born I set you apart' — divine calling as a pre-natal reality."],
  ['jer-jeremiahs-call', 'reluctant-prophet', 'primary', "'Alas, Sovereign LORD, I do not know how to speak; I am too young' — resistance to calling rooted in genuine inadequacy."],
  ['jer-jeremiahs-call', 'sovereignty', 'secondary', "God's plan for Jeremiah precedes Jeremiah's existence — divine sovereignty over individual vocation."],
  ['jer-jeremiahs-call', 'courage', 'secondary', "'Do not be afraid of them, for I am with you and will rescue you' — courage demanded because the mission will provoke opposition."],
  ['jer-jeremiahs-call', 'identity', 'secondary', "Jeremiah's identity is defined by calling before he can define himself — vocation as the ground of selfhood."],
  ['jer-jeremiahs-call', 'prophetic-judgment', 'illustrative', "'I appoint you over nations and kingdoms to uproot and tear down, to destroy and overthrow, to build and to plant' — destruction before construction."],

  // jer-temple-sermon — Jeremiah 7:1–7:34
  ['jer-temple-sermon', 'hypocrisy', 'primary', "'Will you steal and murder, commit adultery and perjury... and then come and stand before me in this house?' — religious performance masking moral failure."],
  ['jer-temple-sermon', 'idolatry', 'primary', "The temple itself has become an idol — the building trusted as a talisman rather than the God who dwells there."],
  ['jer-temple-sermon', 'social-justice', 'secondary', "The conditions for God's continued presence: 'Deal with each other justly, do not oppress the foreigner, the fatherless or the widow.'"],
  ['jer-temple-sermon', 'divine-judgment', 'secondary', "'What I did to Shiloh I will now do to the house that bears my Name' — the precedent of destroyed sanctuaries warns that no building is safe."],
  ['jer-temple-sermon', 'worship', 'secondary', "True worship is inseparable from justice — ritual without ethics is worse than no ritual at all."],
  ['jer-temple-sermon', 'moral-courage', 'illustrative', "Jeremiah delivers this sermon at the temple gate to people who will later try to kill him for it."],

  // jer-the-potter — Jeremiah 18:1–18:12
  ['jer-the-potter', 'sovereignty', 'primary', "The potter reshaping marred clay illustrates God's sovereign right to reshape nations — divine freedom to alter plans in response to human actions."],
  ['jer-the-potter', 'repentance', 'secondary', "The metaphor implies that repentance can change God's intended action — judgment is conditional, not inevitable."],
  ['jer-the-potter', 'free-will', 'secondary', "The potter responds to the clay's condition — divine sovereignty and human responsibility held in tension, neither canceling the other."],
  ['jer-the-potter', 'grace-unmerited', 'secondary', "Even when the pot is marred, the potter does not discard it but reshapes it — grace as persistent re-forming."],
  ['jer-the-potter', 'divine-plan', 'illustrative', "God's plans for nations are responsive, not mechanical — the potter adapts to the material without abandoning the intention."],
  ['jer-the-potter', 'creation', 'illustrative', "The pottery metaphor echoes Genesis — God forming humanity from clay — creation as an ongoing divine activity."],

  // jer-jeremiahs-lament — Jeremiah 20:7–20:18
  ['jer-jeremiahs-lament', 'lament', 'primary', "'You deceived me, LORD, and I was deceived' — the prophet accuses God of seduction, using language that borders on violation."],
  ['jer-jeremiahs-lament', 'suffering', 'primary', "Jeremiah has been beaten, put in stocks, publicly humiliated — suffering as the direct cost of faithful prophecy."],
  ['jer-jeremiahs-lament', 'calling', 'secondary', "The compulsion to prophesy — 'his word is in my heart like a fire, a fire shut up in my bones' — calling as burden that cannot be escaped."],
  ['jer-jeremiahs-lament', 'suicidal-despair', 'secondary', "'Cursed be the day I was born!' — echoing Job's lament, Jeremiah wishes for non-existence."],
  ['jer-jeremiahs-lament', 'wrestling-with-god', 'secondary', "Jeremiah does not leave God but confronts God — accusation as the most intimate form of faith."],
  ['jer-jeremiahs-lament', 'persecution', 'illustrative', "The prophet is persecuted not by foreigners but by his own people and religious establishment."],

  // jer-letter-to-exiles — Jeremiah 29:1–29:14
  ['jer-letter-to-exiles', 'exile', 'primary', "The letter addresses those deported to Babylon — exiles told to settle in, not wait for quick rescue."],
  ['jer-letter-to-exiles', 'hope', 'primary', "'I know the plans I have for you... plans to prosper you and not to harm you, plans to give you hope and a future' — hope that is long-term, not immediate."],
  ['jer-letter-to-exiles', 'love-of-neighbor', 'secondary', "'Seek the peace and prosperity of the city to which I have carried you' — radical instruction to bless the enemy city, not curse it."],
  ['jer-letter-to-exiles', 'patience', 'secondary', "'When seventy years are completed for Babylon, I will come to you' — hope that requires generational patience."],
  ['jer-letter-to-exiles', 'divine-plan', 'secondary', "God claims authorship of the exile — 'the city to which I have carried you' — sovereignty even over catastrophe."],
  ['jer-letter-to-exiles', 'prayer', 'illustrative', "'Pray to the LORD for it' — prayer for the enemy city as the spiritual practice of exile."],
  ['jer-letter-to-exiles', 'community', 'illustrative', "'Build houses and settle down; plant gardens and eat what they produce' — community-building as the work of hope in hostile territory."],

  // jer-new-covenant — Jeremiah 31:31–31:40
  ['jer-new-covenant', 'new-covenant', 'primary', "'I will make a new covenant with the people of Israel' — the single most theologically consequential covenant passage in Jeremiah."],
  ['jer-new-covenant', 'forgiveness', 'primary', "'I will forgive their wickedness and will remember their sins no more' — divine forgetting as the foundation of the new relationship."],
  ['jer-new-covenant', 'spiritual-renewal', 'secondary', "'I will put my law in their minds and write it on their hearts' — internalization replacing externalization, transformation replacing regulation."],
  ['jer-new-covenant', 'covenant', 'secondary', "The new covenant is defined against the old — 'not like the covenant I made with their ancestors' — continuity in relationship, discontinuity in mechanism."],
  ['jer-new-covenant', 'intimacy-with-god', 'secondary', "'They will all know me, from the least of them to the greatest' — unmediated access to God for every person."],
  ['jer-new-covenant', 'grace-unmerited', 'illustrative', "The new covenant is initiated entirely by God — 'I will make,' 'I will put,' 'I will forgive' — grace as divine monologue."],

  // jer-buying-the-field — Jeremiah 32:1–32:44
  ['jer-buying-the-field', 'faith', 'primary', "Jeremiah buys a field during a siege — investing in land that the Babylonian army is about to overrun — as an act of prophetic faith."],
  ['jer-buying-the-field', 'hope', 'primary', "'Houses, fields and vineyards will again be bought in this land' — hope expressed through economic action, not just words."],
  ['jer-buying-the-field', 'faith-vs-sight', 'secondary', "The visible reality says the land is worthless; the prophetic word says it will be restored — faith as contradiction of observable evidence."],
  ['jer-buying-the-field', 'sovereignty', 'secondary', "'Nothing is too hard for you' — Jeremiah prays after the purchase, affirming God's power even when the situation looks impossible."],
  ['jer-buying-the-field', 'prophetic-hope', 'secondary', "The field purchase is a prophetic sign-act — hope performed, not just proclaimed."],
  ['jer-buying-the-field', 'courage', 'illustrative', "Buying the field while imprisoned for treason and under siege takes both financial and personal courage."],

  // jer-fall-of-jerusalem-jeremiah — Jeremiah 39:1–39:18
  ['jer-fall-of-jerusalem-jeremiah', 'divine-judgment', 'primary', "Everything Jeremiah predicted comes true — the walls breached, the king captured, the city burned."],
  ['jer-fall-of-jerusalem-jeremiah', 'consequences-of-sin', 'primary', "Decades of idolatry, injustice, and covenant-breaking culminate in the destruction of Jerusalem — consequences finally arriving."],
  ['jer-fall-of-jerusalem-jeremiah', 'national-grief', 'secondary', "The fall of Jerusalem is the defining national trauma — the city, temple, and monarchy all destroyed simultaneously."],
  ['jer-fall-of-jerusalem-jeremiah', 'exile', 'secondary', "The population is deported — exile beginning not as metaphor but as historical catastrophe."],
  ['jer-fall-of-jerusalem-jeremiah', 'vindication', 'secondary', "Jeremiah is vindicated but takes no pleasure in it — the prophet who was right about everything stands amid the ruins."],
  ['jer-fall-of-jerusalem-jeremiah', 'prophecy', 'illustrative', "Fulfilled prophecy demonstrates the authenticity of Jeremiah's mission — the word of God proven reliable through destruction."],

  // ==================== LAMENTATIONS (3 units) ====================

  // lam-how-lonely-sits-the-city — Lamentations 1:1–1:22
  ['lam-how-lonely-sits-the-city', 'national-grief', 'primary', "'How lonely sits the city that once was full of people! How like a widow she has become' — Jerusalem personified as a desolate, grieving woman."],
  ['lam-how-lonely-sits-the-city', 'lament', 'primary', "The chapter is structured as a funeral dirge — grief disciplined into acrostic poetry, each verse beginning with a successive Hebrew letter."],
  ['lam-how-lonely-sits-the-city', 'exile', 'secondary', "'Among all her lovers there is no one to comfort her' — Jerusalem's allies have abandoned her, and her people are in exile."],
  ['lam-how-lonely-sits-the-city', 'consequences-of-sin', 'secondary', "'Jerusalem has sinned greatly and so has become unclean' — the poet acknowledges that the suffering has moral cause."],
  ['lam-how-lonely-sits-the-city', 'shame', 'secondary', "'All who honored her despise her, for they have all seen her naked' — national humiliation described in terms of sexual exposure."],
  ['lam-how-lonely-sits-the-city', 'loneliness', 'illustrative', "The city that was full of people now sits alone — isolation as the defining condition of judgment."],
  ['lam-how-lonely-sits-the-city', 'abandonment', 'illustrative', "Friends have become enemies, allies have become accusers — abandonment by every source of comfort."],

  // lam-great-is-thy-faithfulness — Lamentations 3:1–3:66
  ['lam-great-is-thy-faithfulness', 'hope-in-suffering', 'primary', "'Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning' — hope embedded in the darkest chapter."],
  ['lam-great-is-thy-faithfulness', 'faithfulness-of-god', 'primary', "'Great is your faithfulness' — the declaration that God's character has not changed even when circumstances say otherwise."],
  ['lam-great-is-thy-faithfulness', 'suffering', 'primary', "The chapter opens with visceral suffering — 'I am the man who has seen affliction by the rod of the LORD's wrath' — before finding hope."],
  ['lam-great-is-thy-faithfulness', 'steadfast-love', 'secondary', "The poet appeals to God's hesed — covenant love that persists through catastrophe."],
  ['lam-great-is-thy-faithfulness', 'waiting-on-god', 'secondary', "'The LORD is good to those whose hope is in him, to the one who seeks him; it is good to wait quietly for the salvation of the LORD.'"],
  ['lam-great-is-thy-faithfulness', 'lament', 'secondary', "Even the hope is surrounded by lament — this is not a psalm of pure praise but a flickering light in sustained darkness."],
  ['lam-great-is-thy-faithfulness', 'grief-and-hope', 'illustrative', "Grief and hope coexist without resolving each other — the poet holds both simultaneously."],

  // lam-remember-o-lord — Lamentations 5:1–5:22
  ['lam-remember-o-lord', 'prayer', 'primary', "'Remember, LORD, what has happened to us; look, and see our disgrace' — a communal prayer that asks God to witness suffering."],
  ['lam-remember-o-lord', 'silence-of-god', 'primary', "The book ends without answer — 'unless you have utterly rejected us and are angry with us beyond measure' — the prayer receives no response."],
  ['lam-remember-o-lord', 'suffering', 'secondary', "The chapter catalogs post-siege suffering: orphaned children, forced labor, humiliation, starvation — suffering in granular detail."],
  ['lam-remember-o-lord', 'despair', 'secondary', "'The joy of our hearts has ceased; our dancing has been turned to mourning' — the loss of joy as itself a form of death."],
  ['lam-remember-o-lord', 'sovereignty', 'secondary', "'You, LORD, reign forever; your throne endures from generation to generation' — an assertion of divine sovereignty that makes the silence more painful, not less."],
  ['lam-remember-o-lord', 'abandonment', 'illustrative', "'Why do you forget us forever, why do you forsake us so long?' — the question that the book refuses to answer."],

  // ==================== EZEKIEL (7 units) ====================

  // ezk-ezekiels-call — Ezekiel 1:1–3:27
  ['ezk-ezekiels-call', 'calling', 'primary', "Ezekiel is commissioned to speak to a rebellious people — his call includes eating a scroll and being told the audience will not listen."],
  ['ezk-ezekiels-call', 'glory-of-god', 'primary', "The vision of the wheel within a wheel, the four living creatures, and the sapphire throne — God's glory manifest in the most elaborate theophany in Scripture."],
  ['ezk-ezekiels-call', 'presence-of-god', 'secondary', "God's glory appears by the Kebar River in Babylon — divine presence is not confined to the temple but meets the exiles where they are."],
  ['ezk-ezekiels-call', 'exile', 'secondary', "The call comes among the exiles — prophetic commission in displacement, not in Jerusalem."],
  ['ezk-ezekiels-call', 'transcendence', 'secondary', "The vision defies normal categories — wheels intersecting, creatures with four faces — God's otherness expressed through visual disorientation."],
  ['ezk-ezekiels-call', 'obedience', 'illustrative', "Ezekiel eats the scroll and finds it sweet — obedience to the prophetic word as literal ingestion."],
  ['ezk-ezekiels-call', 'costly-obedience', 'illustrative', "God warns Ezekiel the people will not listen — the call is to faithfulness of delivery, not success of reception."],

  // ezk-glory-departs — Ezekiel 10:1–11:25
  ['ezk-glory-departs', 'presence-of-god', 'primary', "The glory of the LORD rises from above the cherubim, moves to the threshold, then leaves the temple entirely — God departing his own house."],
  ['ezk-glory-departs', 'divine-judgment', 'primary', "God's departure is the ultimate judgment — worse than military defeat is the withdrawal of divine presence."],
  ['ezk-glory-departs', 'idolatry', 'secondary', "The glory departs because the temple has been profaned with idolatry — the abominations described in chapters 8-9 make the house uninhabitable for God."],
  ['ezk-glory-departs', 'absence-of-god', 'secondary', "The departure creates a theological crisis — if God leaves the temple, where is God? The exile becomes spatial as well as geographic."],
  ['ezk-glory-departs', 'temple-as-dwelling', 'secondary', "The temple's purpose as God's dwelling place is what makes the departure devastating — the house is now empty."],
  ['ezk-glory-departs', 'hope', 'illustrative', "The glory stops at the eastern gate — it hesitates, lingers, as if reluctant to leave — a whisper of future return."],

  // ezk-shepherds-of-israel — Ezekiel 34:1–34:31
  ['ezk-shepherds-of-israel', 'leadership', 'primary', "'Woe to you shepherds of Israel who only take care of yourselves!' — the most comprehensive critique of leadership failure in the Hebrew Bible."],
  ['ezk-shepherds-of-israel', 'justice-for-oppressed', 'primary', "The shepherds eat the curds, clothe themselves with wool, slaughter choice animals but do not tend the sick, bind the injured, or search for the lost."],
  ['ezk-shepherds-of-israel', 'divine-intervention', 'secondary', "'I myself will search for my sheep and look after them' — God becomes the shepherd because human leaders have failed."],
  ['ezk-shepherds-of-israel', 'messianic-prophecy', 'secondary', "'I will place over them one shepherd, my servant David' — the promise of a future leader who will shepherd properly."],
  ['ezk-shepherds-of-israel', 'oppression', 'secondary', "The strong sheep push aside the weak, butting with flank and shoulder — exploitation within the community, not just by leaders."],
  ['ezk-shepherds-of-israel', 'servant-leadership', 'illustrative', "The indictment defines true leadership by what the shepherds failed to do — serving, healing, seeking, binding up."],
  ['ezk-shepherds-of-israel', 'compassion', 'illustrative', "God's self-description as shepherd is driven by compassion for scattered, hungry, injured sheep — divine motivation as tenderness."],

  // ezk-new-heart — Ezekiel 36:22–36:38
  ['ezk-new-heart', 'spiritual-renewal', 'primary', "'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh' — transformation as divine surgery."],
  ['ezk-new-heart', 'holy-spirit', 'primary', "'I will put my Spirit in you and move you to follow my decrees' — the Spirit as the agent of internal transformation."],
  ['ezk-new-heart', 'grace-unmerited', 'secondary', "'It is not for your sake, people of Israel, that I am going to do these things, but for the sake of my holy name' — renewal motivated by God's character, not human merit."],
  ['ezk-new-heart', 'holiness', 'secondary', "God acts to vindicate his holy name — the holiness of God as the ultimate motivation for redemption."],
  ['ezk-new-heart', 'new-covenant', 'secondary', "The new heart passage parallels Jeremiah's new covenant — law written internally rather than externally."],
  ['ezk-new-heart', 'repentance', 'illustrative', "'Then you will remember your evil ways... and you will loathe yourselves' — repentance as a consequence of renewal, not its precondition."],

  // ezk-valley-of-dry-bones — Ezekiel 37:1–37:14
  ['ezk-valley-of-dry-bones', 'resurrection', 'primary', "'Can these bones live?' — the vision of dry bones coming to life is the Hebrew Bible's most vivid image of resurrection hope."],
  ['ezk-valley-of-dry-bones', 'hope', 'primary', "'Our bones are dried up and our hope is gone' — the vision addresses the specific despair of exile, where the nation appears permanently dead."],
  ['ezk-valley-of-dry-bones', 'holy-spirit', 'secondary', "'Come, breath, from the four winds and breathe into these slain' — the Spirit (ruach) as the animating force that transforms death into life."],
  ['ezk-valley-of-dry-bones', 'new-life', 'secondary', "The bones reassemble, gain sinew, flesh, and skin — new life described in creation-reversal terms."],
  ['ezk-valley-of-dry-bones', 'return-from-exile', 'secondary', "'I will bring you back to the land of Israel' — the resurrection vision is explicitly interpreted as national restoration."],
  ['ezk-valley-of-dry-bones', 'power-of-god', 'illustrative', "God's power is demonstrated at the point of maximum impossibility — not merely sick bones but dry bones, long dead."],

  // ezk-temple-vision — Ezekiel 40:1–48:35
  ['ezk-temple-vision', 'sacred-space', 'primary', "The most elaborate architectural vision in Scripture — nine chapters of meticulous measurements for a temple that represents cosmic order."],
  ['ezk-temple-vision', 'presence-of-god', 'primary', "The glory of the LORD returns from the east and fills the temple — the reversal of the departure in chapter 10."],
  ['ezk-temple-vision', 'holiness', 'secondary', "The vision's concentric zones of increasing holiness — from outer court to inner court to Most Holy Place — reflect the structure of divine holiness."],
  ['ezk-temple-vision', 'worship', 'secondary', "Detailed instructions for sacrifices and festivals — worship as the purpose for which the temple exists."],
  ['ezk-temple-vision', 'eschatological-hope', 'secondary', "The temple vision describes a reality that has never been built — eschatological hope in architectural form."],
  ['ezk-temple-vision', 'new-creation', 'illustrative', "The vision includes the redistribution of land among the tribes — new creation as total social and geographic restructuring."],

  // ezk-river-of-life — Ezekiel 47:1–47:12
  ['ezk-river-of-life', 'new-creation', 'primary', "Water flows from the temple, deepening as it goes, turning the Dead Sea fresh and making everything it touches alive — creation healed from its source."],
  ['ezk-river-of-life', 'abundance', 'primary', "'Fruit trees of all kinds will grow on both banks of the river... their fruit will serve for food and their leaves for healing' — abundance as the signature of God's presence."],
  ['ezk-river-of-life', 'presence-of-god', 'secondary', "The river flows from the temple threshold — life originates from God's dwelling, not from natural sources."],
  ['ezk-river-of-life', 'spiritual-renewal', 'secondary', "'Where the river flows everything will live' — renewal applied to the entire ecosystem, not just individuals."],
  ['ezk-river-of-life', 'eschatological-hope', 'secondary', "The vision anticipates Revelation 22's river of life — prophetic hope carried through to the Bible's final vision."],
  ['ezk-river-of-life', 'blessing', 'illustrative', "The river blesses everything it touches — blessing as overflowing, widening, deepening gift."],

  // ==================== DANIEL (8 units) ====================

  // dan-exiles-in-babylon — Daniel 1:1–1:21
  ['dan-exiles-in-babylon', 'exile', 'primary', "Jerusalem has fallen, temple vessels are carried to Babylon, and the best young men are conscripted into the empire's re-education program."],
  ['dan-exiles-in-babylon', 'identity', 'primary', "Daniel resolves not to defile himself with the royal food — resistance as identity preservation when the empire seeks to erase distinctiveness."],
  ['dan-exiles-in-babylon', 'moral-courage', 'secondary', "The food refusal is not dietary legalism but a strategic first act of resistance — choosing where to draw the line before the empire draws it for you."],
  ['dan-exiles-in-babylon', 'wisdom', 'secondary', "Daniel and his friends are found ten times better than all the magicians and enchanters — wisdom as gift that surpasses imperial education."],
  ['dan-exiles-in-babylon', 'faithfulness', 'secondary', "Faithfulness to God in small things (diet) prepares for faithfulness in large things (the furnace, the den)."],
  ['dan-exiles-in-babylon', 'providence', 'illustrative', "'God had caused the official to show favor' — divine providence working through a pagan bureaucrat."],

  // dan-nebuchadnezzars-dream — Daniel 2:1–2:49
  ['dan-nebuchadnezzars-dream', 'sovereignty', 'primary', "The statue of four kingdoms crumbled by a stone 'not cut by human hands' — God's kingdom destroys all human empires without human agency."],
  ['dan-nebuchadnezzars-dream', 'kingdom-of-god', 'primary', "'The God of heaven will set up a kingdom that will never be destroyed' — the vision's thesis: all human power is temporary, only God's kingdom endures."],
  ['dan-nebuchadnezzars-dream', 'prophecy', 'secondary', "Daniel interprets what the wise men cannot — prophetic insight as divine gift, not human calculation."],
  ['dan-nebuchadnezzars-dream', 'prayer', 'secondary', "Daniel and his friends pray through the night for revelation — the interpretation comes through prayer, not study."],
  ['dan-nebuchadnezzars-dream', 'wisdom', 'secondary', "Daniel's ability to reveal both the dream and its meaning establishes him as the wisest man in the empire."],
  ['dan-nebuchadnezzars-dream', 'humility', 'illustrative', "'No wise man, enchanter, magician or diviner can explain to the king the mystery he has asked about — but there is a God in heaven who reveals mysteries.'"],

  // dan-fiery-furnace — Daniel 3:1–3:30
  ['dan-fiery-furnace', 'courage-in-faith', 'primary', "'If we are thrown into the blazing furnace, the God we serve is able to deliver us... But even if he does not, we will not serve your gods' — faith that does not require rescue."],
  ['dan-fiery-furnace', 'idolatry', 'primary', "Nebuchadnezzar's golden statue demands total worship — idolatry as the empire's ultimate loyalty test."],
  ['dan-fiery-furnace', 'standing-alone', 'secondary', "Three men refuse to bow while an entire empire kneels — minority faithfulness against overwhelming conformity."],
  ['dan-fiery-furnace', 'deliverance', 'secondary', "A fourth figure appears in the furnace — divine presence in the fire, not removal from it."],
  ['dan-fiery-furnace', 'persecution', 'secondary', "The accusation against the Jews is politically motivated — bureaucratic jealousy weaponizing religious loyalty."],
  ['dan-fiery-furnace', 'presence-of-god', 'illustrative', "The fourth figure in the fire — God does not prevent suffering but enters it with his people."],

  // dan-nebuchadnezzars-madness — Daniel 4:1–4:37
  ['dan-nebuchadnezzars-madness', 'humility', 'primary', "The most powerful man in the world is driven to eat grass like cattle until he acknowledges that 'the Most High is sovereign over all kingdoms.'"],
  ['dan-nebuchadnezzars-madness', 'sovereignty', 'primary', "'Those who walk in pride he is able to humble' — divine sovereignty demonstrated by reducing imperial pride to animal existence."],
  ['dan-nebuchadnezzars-madness', 'consequences-of-sin', 'secondary', "The madness comes twelve months after the warning — delayed judgment giving space for repentance that never comes."],
  ['dan-nebuchadnezzars-madness', 'repentance', 'secondary', "Nebuchadnezzar's restoration follows his acknowledgment of God's sovereignty — repentance as recognition, not ritual."],
  ['dan-nebuchadnezzars-madness', 'grace-unmerited', 'secondary', "The pagan king is restored and even testifies to God's greatness — grace extended beyond the covenant community."],
  ['dan-nebuchadnezzars-madness', 'power-of-god', 'illustrative', "God's power is displayed not through military action but through the humbling of one man's mind."],

  // dan-writing-on-the-wall — Daniel 5:1–5:31
  ['dan-writing-on-the-wall', 'divine-judgment', 'primary', "'MENE, MENE, TEKEL, PARSIN — God has numbered, weighed, and divided your kingdom' — judgment as precise accounting, not arbitrary destruction."],
  ['dan-writing-on-the-wall', 'consequences-of-sin', 'primary', "Belshazzar uses sacred temple vessels for a drunken feast — desecration met with immediate, lethal judgment."],
  ['dan-writing-on-the-wall', 'idolatry', 'secondary', "The king praises gods of gold, silver, bronze, iron, wood, and stone while drinking from vessels consecrated to the true God."],
  ['dan-writing-on-the-wall', 'humility', 'secondary', "'You knew all this, yet you have not humbled yourself' — Belshazzar's sin is not ignorance but willful refusal to learn from his grandfather's humbling."],
  ['dan-writing-on-the-wall', 'moral-courage', 'secondary', "Daniel speaks truth to the king at a party — 'You have not humbled yourself' — knowing the empire is about to fall."],
  ['dan-writing-on-the-wall', 'terror', 'illustrative', "The king's face turns pale, his knees knock together — the physical experience of encountering divine judgment."],

  // dan-lions-den — Daniel 6:1–6:28
  ['dan-lions-den', 'faithfulness', 'primary', "Daniel prays openly three times a day despite the decree — faithfulness as habit that does not adjust to political pressure."],
  ['dan-lions-den', 'persecution', 'primary', "Daniel's colleagues engineer the decree specifically to trap him — bureaucratic evil targeting religious faithfulness."],
  ['dan-lions-den', 'deliverance', 'secondary', "God sends an angel to shut the lions' mouths — deliverance that vindicates faithfulness without guaranteeing it will always come."],
  ['dan-lions-den', 'prayer', 'secondary', "Daniel's three-daily prayer toward Jerusalem is the practice the empire cannot tolerate — prayer as the irreducible act of faith."],
  ['dan-lions-den', 'integrity', 'secondary', "Daniel's enemies can find no corruption or negligence in his service — integrity so complete that only his faith can be used against him."],
  ['dan-lions-den', 'courage-in-faith', 'illustrative', "Daniel does not hide his prayers or seek compromise — open faithfulness as the most dangerous and most necessary courage."],

  // dan-son-of-man-vision — Daniel 7:1–7:28
  ['dan-son-of-man-vision', 'kingdom-of-god', 'primary', "'One like a son of man' receives an everlasting kingdom from the Ancient of Days — the vision that defines Jesus's favorite self-designation."],
  ['dan-son-of-man-vision', 'messianic-prophecy', 'primary', "The Son of Man figure — human, not beastly — receives dominion, glory, and a kingdom that all peoples will worship."],
  ['dan-son-of-man-vision', 'sovereignty', 'secondary', "Four empires rise and fall as beasts from the sea — but the court sits, the books are opened, and God renders final judgment."],
  ['dan-son-of-man-vision', 'eschatological-hope', 'secondary', "The vision looks past all earthly empires to a final kingdom — apocalyptic hope that sustains the persecuted."],
  ['dan-son-of-man-vision', 'divine-judgment', 'secondary', "The Ancient of Days takes his seat and judges the beasts — judgment as cosmic courtroom drama."],
  ['dan-son-of-man-vision', 'oppression', 'illustrative', "The fourth beast devours, tramples, and crushes — empire as predator, making the human Son of Man a radical contrast."],
  ['dan-son-of-man-vision', 'terror', 'illustrative', "Daniel is troubled and alarmed by the visions — apocalyptic hope does not come comfortably."],

  // dan-seventy-weeks — Daniel 9:1–9:27
  ['dan-seventy-weeks', 'prayer', 'primary', "Daniel's prayer of confession — one of the most profound in Scripture — acknowledges corporate sin and appeals to God's mercy."],
  ['dan-seventy-weeks', 'repentance', 'primary', "'We have sinned and done wrong... we have not listened to your servants the prophets' — corporate confession on behalf of the entire nation."],
  ['dan-seventy-weeks', 'divine-plan', 'secondary', "The seventy weeks outline a divine timetable — redemption operating on a schedule beyond human comprehension."],
  ['dan-seventy-weeks', 'messianic-prophecy', 'secondary', "'The Anointed One will be put to death and will have nothing' — the seventy weeks prophecy includes the death of the Messiah."],
  ['dan-seventy-weeks', 'redemption', 'secondary', "The purpose of the seventy weeks: 'to finish transgression, to put an end to sin, to atone for wickedness, to bring in everlasting righteousness.'"],
  ['dan-seventy-weeks', 'corporate-sin', 'illustrative', "Daniel includes himself in the confession — 'we have sinned' — though the text presents him as blameless."],

  // ==================== HOSEA (4 units) ====================

  // hos-hosea-marries-gomer — Hosea 1:1–3:5
  ['hos-hosea-marries-gomer', 'marriage', 'primary', "God commands Hosea to marry an unfaithful woman — marriage as lived prophetic metaphor for God's relationship with Israel."],
  ['hos-hosea-marries-gomer', 'betrayal', 'primary', "Gomer's infidelity enacts Israel's spiritual adultery — betrayal experienced in the most intimate human relationship."],
  ['hos-hosea-marries-gomer', 'god-as-husband', 'primary', "The entire metaphor rests on God as the faithful husband whose wife has gone after other lovers."],
  ['hos-hosea-marries-gomer', 'covenant-breaking', 'secondary', "Gomer's departure mirrors Israel's breaking of the covenant — unfaithfulness as the primary sin."],
  ['hos-hosea-marries-gomer', 'pursuing-love', 'secondary', "Hosea buys Gomer back from slavery — God's love as pursuit that pays the price of redemption."],
  ['hos-hosea-marries-gomer', 'redemption', 'secondary', "The purchase of Gomer from the slave market parallels God's intention to redeem Israel from the consequences of her betrayal."],
  ['hos-hosea-marries-gomer', 'name-and-naming', 'illustrative', "The children named Lo-Ruhamah ('Not Loved') and Lo-Ammi ('Not My People') — judgment encoded in naming."],

  // hos-israels-unfaithfulness — Hosea 4:1–6:3
  ['hos-israels-unfaithfulness', 'covenant-breaking', 'primary', "God brings a covenant lawsuit (rib) against Israel — 'There is no faithfulness, no love, no acknowledgment of God in the land.'"],
  ['hos-israels-unfaithfulness', 'idolatry', 'primary', "The specific charge: Israel has gone after Baal, consulting wooden idols and offering sacrifices on hilltops."],
  ['hos-israels-unfaithfulness', 'injustice', 'secondary', "'Cursing, lying, murder, stealing, adultery — they break all bounds, and bloodshed follows bloodshed.'"],
  ['hos-israels-unfaithfulness', 'divine-judgment', 'secondary', "The lawsuit format makes judgment legal, not arbitrary — God presenting evidence before rendering verdict."],
  ['hos-israels-unfaithfulness', 'repentance', 'secondary', "'Come, let us return to the LORD... he will heal us' — the call to repentance interrupting the judgment oracle."],
  ['hos-israels-unfaithfulness', 'steadfast-love', 'illustrative', "'I desire mercy (hesed), not sacrifice' — God values covenant loyalty over ritual performance."],

  // hos-gods-anguished-love — Hosea 11:1–11:11
  ['hos-gods-anguished-love', 'love-of-god', 'primary', "'When Israel was a child, I loved him' — God remembers teaching Israel to walk, holding them by the arms, tender as a parent with an infant."],
  ['hos-gods-anguished-love', 'father-love', 'primary', "'How can I give you up, Ephraim? How can I hand you over, Israel?' — divine anguish at the prospect of judgment, a parent unable to abandon a wayward child."],
  ['hos-gods-anguished-love', 'divine-mercy', 'secondary', "'My heart is changed within me; all my compassion is aroused' — God's internal conflict between justice and mercy resolving in mercy."],
  ['hos-gods-anguished-love', 'wrestling-with-god', 'secondary', "God wrestles with himself — 'I will not carry out my fierce anger' — divine self-restraint born of love."],
  ['hos-gods-anguished-love', 'parenting', 'secondary', "The parent-child metaphor — teaching to walk, bending down to feed — makes divine love tangible and heartbreaking."],
  ['hos-gods-anguished-love', 'unconditional-love', 'illustrative', "'I am God, and not a man — the Holy One among you' — God's love transcends the human pattern of abandoning those who betray us."],

  // hos-restoration-promise — Hosea 14:1–14:9
  ['hos-restoration-promise', 'repentance', 'primary', "'Return, Israel, to the LORD your God' — the prophet provides the actual script for repentance: 'Take words with you and return.'"],
  ['hos-restoration-promise', 'grace-unmerited', 'primary', "'I will heal their waywardness and love them freely, for my anger has turned away' — restoration initiated by divine grace, not human merit."],
  ['hos-restoration-promise', 'new-life', 'secondary', "'I will be like the dew to Israel; he will blossom like a lily' — restoration described in botanical imagery, new life springing from divine moisture."],
  ['hos-restoration-promise', 'turning-back', 'secondary', "The book ends with an invitation to return — the Hebrew word shuv (turn back) is the dominant verb of the chapter."],
  ['hos-restoration-promise', 'compassion', 'secondary', "God heals waywardness — the metaphor treats Israel's infidelity as illness rather than crime."],
  ['hos-restoration-promise', 'wisdom', 'illustrative', "'Who is wise? Let them realize these things' — the epilogue frames the entire book as wisdom literature."],

  // ==================== JOEL (2 units) ====================

  // jol-the-locust-plague — Joel 1:1–2:17
  ['jol-the-locust-plague', 'divine-judgment', 'primary', "The locust swarm is interpreted as God's army — natural disaster as divine judgment requiring theological response."],
  ['jol-the-locust-plague', 'repentance', 'primary', "'Rend your heart and not your garments' — the call to internal repentance, not external performance."],
  ['jol-the-locust-plague', 'lament', 'secondary', "'Put on sackcloth, you priests, and mourn' — communal lament as the appropriate response to catastrophe."],
  ['jol-the-locust-plague', 'national-grief', 'secondary', "The devastation affects everyone — grain, wine, oil stripped from the land, joy itself dried up."],
  ['jol-the-locust-plague', 'divine-mercy', 'secondary', "'Return to the LORD your God, for he is gracious and compassionate, slow to anger and abounding in love' — the possibility that God may relent."],
  ['jol-the-locust-plague', 'prayer', 'illustrative', "The priests are called to weep between the portico and altar — liturgical prayer as community's last resort."],

  // jol-spirit-poured-out — Joel 2:28–3:21
  ['jol-spirit-poured-out', 'holy-spirit', 'primary', "'I will pour out my Spirit on all people' — the most expansive promise of Spirit-outpouring in the Hebrew Bible."],
  ['jol-spirit-poured-out', 'prophecy', 'primary', "'Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions' — prophetic gift democratized across age, gender, and class."],
  ['jol-spirit-poured-out', 'eschatological-hope', 'secondary', "Peter cites this passage at Pentecost as fulfilled — the 'last days' have begun with the Spirit's arrival."],
  ['jol-spirit-poured-out', 'inclusion', 'secondary', "'Even on my servants, both men and women' — the Spirit crosses every social boundary, including slavery and gender."],
  ['jol-spirit-poured-out', 'divine-judgment', 'secondary', "The Spirit outpouring precedes the Day of the LORD — judgment and salvation as two sides of one event."],
  ['jol-spirit-poured-out', 'empowerment', 'illustrative', "The Spirit empowers ordinary people for prophetic witness — not institutional authority but charismatic gifting."],

  // ==================== AMOS (4 units) ====================

  // amo-judgment-on-nations — Amos 1:1–2:16
  ['amo-judgment-on-nations', 'divine-justice', 'primary', "Amos pronounces judgment on seven nations for specific war crimes before turning the same formula on Israel — God's justice is universal, not tribal."],
  ['amo-judgment-on-nations', 'social-justice', 'primary', "Israel's crimes are not military but social — selling the innocent for silver, trampling the poor, denying justice to the oppressed."],
  ['amo-judgment-on-nations', 'hypocrisy', 'secondary', "The rhetorical trap: Israel cheers judgment on its neighbors then discovers itself under the same verdict — self-righteous hypocrisy exposed."],
  ['amo-judgment-on-nations', 'oppression', 'secondary', "The specific charges — exploiting the poor, father and son using the same woman, lounging on garments taken as pledges — systemic oppression detailed."],
  ['amo-judgment-on-nations', 'prophetic-judgment', 'secondary', "'For three transgressions and for four' — the escalating formula emphasizes that God's patience has limits."],
  ['amo-judgment-on-nations', 'covenant-breaking', 'illustrative', "Israel is judged more harshly than the nations because they had the law and the prophets — greater privilege means greater accountability."],

  // amo-let-justice-roll — Amos 5:1–5:27
  ['amo-let-justice-roll', 'justice', 'primary', "'Let justice roll on like a river, righteousness like a never-failing stream!' — the most famous justice text in the prophetic literature."],
  ['amo-let-justice-roll', 'worship', 'primary', "'I hate, I despise your religious festivals' — God rejects worship that coexists with injustice, making ritual without ethics an abomination."],
  ['amo-let-justice-roll', 'social-justice', 'secondary', "The specific injustices: trampling the poor, imposing heavy rent on grain, depriving the oppressed of justice in the courts."],
  ['amo-let-justice-roll', 'hypocrisy', 'secondary', "Elaborate festivals, noisy songs, harps — religious performance that masks economic exploitation."],
  ['amo-let-justice-roll', 'lament', 'secondary', "Amos opens with a funeral song for a living nation — 'Fallen is Virgin Israel, never to rise again.'"],
  ['amo-let-justice-roll', 'prophetic-judgment', 'illustrative', "God desires justice, not sacrifice — the prophetic tradition's central insistence that ethics precedes ritual."],

  // amo-the-plumb-line — Amos 7:1–7:9
  ['amo-the-plumb-line', 'divine-judgment', 'primary', "God shows Amos a plumb line held against Israel — the nation measured against the standard and found crooked."],
  ['amo-the-plumb-line', 'divine-mercy', 'secondary', "In the first two visions (locusts and fire), Amos intercedes and God relents — mercy as a real possibility that eventually exhausts itself."],
  ['amo-the-plumb-line', 'prayer', 'secondary', "'Sovereign LORD, forgive! How can Jacob survive? He is so small!' — prophetic intercession that God initially honors."],
  ['amo-the-plumb-line', 'patience', 'secondary', "The progression from relenting to finality shows divine patience reaching its boundary — three chances, then judgment."],
  ['amo-the-plumb-line', 'justice-of-god', 'illustrative', "The plumb line metaphor frames judgment as measurement, not caprice — God holds Israel to an objective standard."],

  // amo-amos-vs-amaziah — Amos 7:10–7:17
  ['amo-amos-vs-amaziah', 'moral-courage', 'primary', "Amos, a shepherd from Tekoa, stands against Amaziah the priest of the royal sanctuary — prophet vs. establishment."],
  ['amo-amos-vs-amaziah', 'calling', 'primary', "'I was neither a prophet nor the son of a prophet... the LORD took me from tending the flock and said, Go, prophesy' — calling that trumps credentials."],
  ['amo-amos-vs-amaziah', 'persecution', 'secondary', "Amaziah reports Amos to the king as a conspiracy and tells him to leave — the prophet expelled from the center of power."],
  ['amo-amos-vs-amaziah', 'authority', 'secondary', "The conflict is about authority: institutional (Amaziah's priestly office) vs. charismatic (Amos's divine commission)."],
  ['amo-amos-vs-amaziah', 'prophetic-judgment', 'secondary', "Amos responds to expulsion with an even harsher prophecy against Amaziah personally — confrontation escalated, not retreated from."],
  ['amo-amos-vs-amaziah', 'standing-alone', 'illustrative', "Amos stands alone against the priest, the king, and the entire religious establishment — prophetic solitude."],

  // ==================== OBADIAH (1 unit) ====================

  // oba-judgment-on-edom — Obadiah 1:1–1:21
  ['oba-judgment-on-edom', 'betrayal', 'primary', "Edom, descended from Esau, stood by while Jerusalem was sacked — the brother who gloated at the brother's destruction."],
  ['oba-judgment-on-edom', 'divine-judgment', 'primary', "'As you have done, it will be done to you' — the principle of reciprocal justice applied to nations."],
  ['oba-judgment-on-edom', 'sibling-rivalry', 'secondary', "The Jacob-Esau conflict extends to nations — Edom and Israel as brothers whose enmity spans generations."],
  ['oba-judgment-on-edom', 'humility', 'secondary', "'The pride of your heart has deceived you' — Edom's fortress-bred arrogance illustrates the opposite of humility, and pride precedes the fall."],
  ['oba-judgment-on-edom', 'kingdom-of-god', 'illustrative', "'The kingdom will be the LORD's' — the oracle's final word looks past national conflict to divine sovereignty."],
  ['oba-judgment-on-edom', 'enemies', 'illustrative', "Edom cut off fugitives and handed over survivors — active complicity with the enemy, not passive observation."],

  // ==================== JONAH (4 units) ====================

  // jon-running-from-god — Jonah 1:1–1:17
  ['jon-running-from-god', 'reluctant-prophet', 'primary', "Jonah does not hesitate or protest — he immediately boards a ship heading in the exact opposite direction, a funded, deliberate escape from God."],
  ['jon-running-from-god', 'rebellion', 'primary', "Fleeing to Tarshish is not doubt but defiance — Jonah knows exactly what God wants and refuses."],
  ['jon-running-from-god', 'sovereignty', 'secondary', "God sends the storm — Jonah cannot outrun the God who commands the sea, the wind, and the great fish."],
  ['jon-running-from-god', 'outsider', 'secondary', "The pagan sailors pray, sacrifice, and fear the LORD — the outsiders respond to God while the prophet runs from him."],
  ['jon-running-from-god', 'consequences-of-sin', 'secondary', "Jonah's rebellion endangers everyone on the ship — disobedience has communal consequences."],
  ['jon-running-from-god', 'divine-intervention', 'illustrative', "The great fish is not punishment but rescue — God's intervention saves the prophet who tried to drown his own calling."],

  // jon-prayer-from-the-fish — Jonah 2:1–2:10
  ['jon-prayer-from-the-fish', 'prayer', 'primary', "Jonah prays a thanksgiving psalm from inside the fish — gratitude for rescue before the rescue is complete."],
  ['jon-prayer-from-the-fish', 'deliverance', 'primary', "'You, LORD my God, brought my life up from the pit' — deliverance experienced in the belly of the beast."],
  ['jon-prayer-from-the-fish', 'repentance', 'secondary', "'When my life was ebbing away, I remembered you, LORD' — turning back to God at the point of extremity."],
  ['jon-prayer-from-the-fish', 'gratitude', 'secondary', "The prayer is structured as thanksgiving, not petition — Jonah thanks God for saving him even as he sits inside the instrument of salvation."],
  ['jon-prayer-from-the-fish', 'idolatry', 'illustrative', "'Those who cling to worthless idols turn away from God's love for them' — a statement Jonah will ironically embody in chapter 4."],

  // jon-nineveh-repents — Jonah 3:1–3:10
  ['jon-nineveh-repents', 'repentance', 'primary', "The entire city repents — from king to cattle — the most complete, immediate, and improbable repentance in the Bible."],
  ['jon-nineveh-repents', 'divine-mercy', 'primary', "'When God saw what they did and how they turned from their evil ways, he relented' — mercy as God's response to genuine change."],
  ['jon-nineveh-repents', 'second-chances', 'secondary', "God gives Jonah a second commission and Nineveh a chance to turn — second chances for both prophet and enemy."],
  ['jon-nineveh-repents', 'love-of-enemy', 'secondary', "God's mercy extends to Israel's greatest enemy — the Assyrian capital that terrorized the ancient world."],
  ['jon-nineveh-repents', 'prophecy', 'secondary', "'Forty more days and Nineveh will be overthrown' — five words in Hebrew that accomplish what no other prophetic sermon achieved."],
  ['jon-nineveh-repents', 'humility', 'illustrative', "The king of Nineveh steps down from his throne, removes his robes, and sits in dust — imperial power humbled."],

  // jon-jonahs-anger — Jonah 4:1–4:11
  ['jon-jonahs-anger', 'mercy', 'primary', "Jonah is furious that God showed mercy to Nineveh — the prophet who understood grace theologically but rejected it when applied to his enemies."],
  ['jon-jonahs-anger', 'love-of-enemy', 'primary', "The book's central question: Can you accept that God loves your enemy as much as he loves you?"],
  ['jon-jonahs-anger', 'compassion', 'secondary', "'Should I not have concern for the great city of Nineveh, in which there are more than a hundred and twenty thousand people?' — God's compassion embraces those Jonah would condemn."],
  ['jon-jonahs-anger', 'anger', 'secondary', "'I knew that you are a gracious and compassionate God' — Jonah quotes the creedal formula from Exodus 34 as a complaint, not a praise."],
  ['jon-jonahs-anger', 'grace-unmerited', 'secondary', "The vine, the worm, and the scorching wind — God uses a plant to teach Jonah about the absurdity of caring more for comfort than for 120,000 lives."],
  ['jon-jonahs-anger', 'exclusion', 'illustrative', "Jonah wants God's grace to have ethnic boundaries — mercy for Israel, judgment for Nineveh."],
  ['jon-jonahs-anger', 'divine-mercy', 'illustrative', "The book ends with a question, not an answer — leaving the reader to decide if they are Jonah."],

  // ==================== MICAH (3 units) ====================

  // mic-bethlehem-prophecy — Micah 5:1–5:5
  ['mic-bethlehem-prophecy', 'messianic-prophecy', 'primary', "'But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel.'"],
  ['mic-bethlehem-prophecy', 'kingdom-reversal', 'primary', "God chooses the smallest town for the greatest king — the reversal pattern that runs through Scripture, power from unexpected places."],
  ['mic-bethlehem-prophecy', 'davidic-covenant', 'secondary', "Bethlehem is David's hometown — the future ruler connects to David's origins, not to Jerusalem's grandeur."],
  ['mic-bethlehem-prophecy', 'peace', 'secondary', "'He will be our peace' — the coming ruler defined not by military power but by the peace he embodies."],
  ['mic-bethlehem-prophecy', 'humility', 'illustrative', "The ruler comes from a town 'small among the clans' — humility built into the messianic origin story."],
  ['mic-bethlehem-prophecy', 'prophetic-hope', 'illustrative', "The prophecy interrupts judgment oracles with sudden, specific hope — a pinpoint of light in surrounding darkness."],

  // mic-what-does-the-lord-require — Micah 6:1–6:8
  ['mic-what-does-the-lord-require', 'justice', 'primary', "'What does the LORD require of you? To act justly and to love mercy and to walk humbly with your God' — the most concise ethical summary in the Hebrew Bible."],
  ['mic-what-does-the-lord-require', 'humility-before-god', 'primary', "Walking humbly with God is the third requirement — relationship, not just ethics, as the foundation of prophetic religion."],
  ['mic-what-does-the-lord-require', 'mercy', 'secondary', "Loving mercy (hesed) is not just practicing mercy but delighting in it — mercy as affection, not obligation."],
  ['mic-what-does-the-lord-require', 'obedience-vs-sacrifice', 'secondary', "'Shall I offer my firstborn for my transgression?' — the prophet rejects escalating religious performance in favor of simple justice."],
  ['mic-what-does-the-lord-require', 'covenant', 'secondary', "The courtroom setting — mountains as witnesses, God bringing charges — frames the demand within covenant relationship."],
  ['mic-what-does-the-lord-require', 'worship', 'illustrative', "The rhetorical questions about thousands of rams and rivers of oil expose the absurdity of thinking God can be bought with ritual."],

  // mic-who-is-a-god-like-you — Micah 7:14–7:20
  ['mic-who-is-a-god-like-you', 'forgiveness', 'primary', "'Who is a God like you, who pardons sin and forgives the transgression?' — forgiveness as divine signature, the unique characteristic that defines God."],
  ['mic-who-is-a-god-like-you', 'divine-mercy', 'primary', "'You do not stay angry forever but delight to show mercy' — God's mercy is not reluctant duty but active delight."],
  ['mic-who-is-a-god-like-you', 'faithfulness-of-god', 'secondary', "'You will be faithful to Jacob and show love to Abraham, as you pledged on oath to our ancestors' — covenant promises held across millennia."],
  ['mic-who-is-a-god-like-you', 'compassion', 'secondary', "'You will have compassion on us; you will tread our sins underfoot and hurl all our iniquities into the depths of the sea.'"],
  ['mic-who-is-a-god-like-you', 'steadfast-love', 'illustrative', "God's love is described as ancient, sworn, and irrevocable — steadfast love rooted in oath, not emotion."],

  // ==================== NAHUM (1 unit) ====================

  // nam-fall-of-nineveh — Nahum 1:1–3:19
  ['nam-fall-of-nineveh', 'divine-judgment', 'primary', "Nineveh, the capital of Assyria that once repented under Jonah, finally falls — divine judgment that waited generations."],
  ['nam-fall-of-nineveh', 'justice-of-god', 'primary', "'The LORD is slow to anger but great in power; the LORD will not leave the guilty unpunished' — patience that eventually gives way to justice."],
  ['nam-fall-of-nineveh', 'wrath-of-god', 'secondary', "Nahum portrays God as an avenging warrior — wrath directed at the empire that built its wealth on blood and cruelty."],
  ['nam-fall-of-nineveh', 'oppression', 'secondary', "'Woe to the city of blood, full of lies, full of plunder, never without victims!' — the empire's brutality cataloged."],
  ['nam-fall-of-nineveh', 'consequences-of-sin', 'secondary', "Nineveh's repentance under Jonah was temporary — the return to violence eventually exhausts divine patience."],
  ['nam-fall-of-nineveh', 'liberation', 'illustrative', "For the nations Assyria terrorized, Nineveh's fall is liberation — judgment experienced as mercy by the oppressed."],

  // ==================== HABAKKUK (2 units) ====================

  // hab-how-long-o-lord — Habakkuk 1:1–2:4
  ['hab-how-long-o-lord', 'theodicy', 'primary', "'How long, LORD, must I call for help, but you do not listen?' — the prophet demands to know why God tolerates injustice."],
  ['hab-how-long-o-lord', 'wrestling-with-god', 'primary', "Habakkuk does not speak to the people for God — he argues with God on the people's behalf, a prophet turned plaintiff."],
  ['hab-how-long-o-lord', 'faith', 'secondary', "'The righteous person will live by his faithfulness' — the verse that launched the Reformation, faith as the response to unanswered questions."],
  ['hab-how-long-o-lord', 'injustice', 'secondary', "God's answer — using Babylon as instrument of judgment — creates a new problem: how can God use a more wicked nation to punish a less wicked one?"],
  ['hab-how-long-o-lord', 'patience', 'secondary', "'The revelation awaits an appointed time... though it linger, wait for it' — faith as sustained patience in the face of unexplained delay."],
  ['hab-how-long-o-lord', 'silence-of-god', 'illustrative', "The prophet's complaint begins with God's apparent silence — the experience of unanswered prayer driving theological crisis."],

  // hab-habakkuks-prayer — Habakkuk 3:1–3:19
  ['hab-habakkuks-prayer', 'faith', 'primary', "'Though the fig tree does not bud and there are no grapes on the vines... yet I will rejoice in the LORD' — faith that persists when every visible support has been removed."],
  ['hab-habakkuks-prayer', 'joy-in-suffering', 'primary', "Joy in the absence of all material blessing — the most extreme statement of faith-based joy in the Hebrew Bible."],
  ['hab-habakkuks-prayer', 'hope-in-suffering', 'secondary', "The prayer transforms complaint into confidence — Habakkuk still has no answers but has shifted from protest to trust."],
  ['hab-habakkuks-prayer', 'power-of-god', 'secondary', "The theophany recalls the Exodus — God parting seas, shattering mountains — past power as the basis for present trust."],
  ['hab-habakkuks-prayer', 'praise', 'secondary', "The prayer is also a hymn — 'On shigionoth... For the director of music' — complaint transformed into liturgy."],
  ['hab-habakkuks-prayer', 'endurance', 'illustrative', "'The Sovereign LORD is my strength; he makes my feet like the feet of a deer' — endurance described as divine gift, not human grit."],

  // ==================== ZEPHANIAH (1 unit) ====================

  // zep-day-of-the-lord — Zephaniah 1:1–3:20
  ['zep-day-of-the-lord', 'divine-judgment', 'primary', "Zephaniah opens with the most comprehensive threat of destruction in prophetic literature — God will sweep away everything from the face of the earth."],
  ['zep-day-of-the-lord', 'love-of-god', 'primary', "'The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; he will quiet you with his love; he will rejoice over you with singing' — the most tender promise following the harshest judgment."],
  ['zep-day-of-the-lord', 'wrath-of-god', 'secondary', "The Day of the LORD is described as fire, darkness, anguish — cosmic judgment language echoing the flood narrative."],
  ['zep-day-of-the-lord', 'eschatological-hope', 'secondary', "After judgment, God promises to gather the scattered, remove shame, and bring his people home — judgment is penultimate, not final."],
  ['zep-day-of-the-lord', 'humility', 'secondary', "'Seek the LORD, all you humble of the land... Seek righteousness, seek humility; perhaps you will be sheltered on the day of the LORD's anger.'"],
  ['zep-day-of-the-lord', 'joy', 'illustrative', "God rejoicing over his people with singing — one of Scripture's most startling images, the Creator singing a love song over the restored."],
  ['zep-day-of-the-lord', 'restoration-from-shame', 'illustrative', "'At that time I will gather you; at that time I will bring you home. I will give you honor and praise among all the peoples of the earth.'"],

  // ==================== HAGGAI (1 unit) ====================

  // hag-rebuild-the-temple — Haggai 1:1–2:23
  ['hag-rebuild-the-temple', 'worship', 'primary', "'Is it time for you to live in paneled houses while this house lies in ruins?' — the prophet confronts misplaced priorities, comfort over worship."],
  ['hag-rebuild-the-temple', 'obedience', 'primary', "The people respond to Haggai's message and begin rebuilding — one of the few times in the prophets when the audience actually obeys."],
  ['hag-rebuild-the-temple', 'presence-of-god', 'secondary', "'I am with you, declares the LORD' — divine presence promised as the motivation for rebuilding."],
  ['hag-rebuild-the-temple', 'return-from-exile', 'secondary', "The returned exiles have been home for eighteen years but the temple is still in ruins — return without restoration."],
  ['hag-rebuild-the-temple', 'eschatological-hope', 'secondary', "'The glory of this present house will be greater than the glory of the former house' — the rebuilt temple as a sign pointing to something greater."],
  ['hag-rebuild-the-temple', 'temple-as-dwelling', 'illustrative', "The temple project is about restoring God's dwelling among the people — architecture as theology."],

  // ==================== ZECHARIAH (3 units) ====================

  // zec-night-visions — Zechariah 1:7–6:15
  ['zec-night-visions', 'prophetic-hope', 'primary', "Eight visions in one night paint a comprehensive picture of restoration — the lampstand, the flying scroll, the horsemen patrolling the earth."],
  ['zec-night-visions', 'return-from-exile', 'primary', "The visions promise the rebuilding of Jerusalem, the return of God's presence, and the cleansing of the priesthood."],
  ['zec-night-visions', 'messianic-prophecy', 'secondary', "'Here is the man whose name is the Branch' — the messianic figure who will build the temple and unite priestly and royal offices."],
  ['zec-night-visions', 'sovereignty', 'secondary', "The horsemen patrol the earth — God's sovereignty extends over all nations, not just Israel."],
  ['zec-night-visions', 'spiritual-renewal', 'secondary', "Joshua the high priest is cleansed of filthy garments and dressed in new clothes — priestly purification as national renewal."],
  ['zec-night-visions', 'forgiveness', 'illustrative', "'I have taken away your sin' — the cleansing of Joshua represents the forgiveness of the entire community."],

  // zec-humble-king — Zechariah 9:9–9:10
  ['zec-humble-king', 'messianic-prophecy', 'primary', "'Your king comes to you, righteous and victorious, lowly and riding on a donkey' — the prophecy Jesus fulfills in the triumphal entry."],
  ['zec-humble-king', 'humility', 'primary', "The king rides a donkey, not a war horse — power expressed through humility, victory through lowliness."],
  ['zec-humble-king', 'peace', 'secondary', "'He will proclaim peace to the nations' — the humble king's reign is characterized by universal peace, not military dominance."],
  ['zec-humble-king', 'kingdom-reversal', 'secondary', "The image reverses every expectation of kingship — not chariot and army but donkey and peace proclamation."],
  ['zec-humble-king', 'kingdom-of-god', 'illustrative', "'His rule will extend from sea to sea' — universal dominion achieved through humility, not conquest."],

  // zec-pierced-one — Zechariah 12:10–13:1
  ['zec-pierced-one', 'messianic-prophecy', 'primary', "'They will look on me, the one they have pierced, and they will mourn for him as one mourns for an only child' — John's Gospel applies this to the crucifixion."],
  ['zec-pierced-one', 'grief', 'primary', "The mourning is described as the most bitter grief possible — like mourning an only child, like the mourning at Hadad Rimmon."],
  ['zec-pierced-one', 'repentance', 'secondary', "The mourning is a response to recognition — seeing what they have done to the pierced one produces communal repentance."],
  ['zec-pierced-one', 'grace-unmerited', 'secondary', "'On that day a fountain will be opened to the house of David... to cleanse them from sin and impurity' — grace as cleansing fountain."],
  ['zec-pierced-one', 'atonement', 'secondary', "The piercing of God's representative opens the way for cleansing — suffering that makes purification possible."],
  ['zec-pierced-one', 'holy-spirit', 'illustrative', "'I will pour out on the house of David... a spirit of grace and supplication' — the Spirit enables the recognition and repentance."],

  // ==================== MALACHI (2 units) ====================

  // mal-messenger-of-the-covenant — Malachi 3:1–4:6
  ['mal-messenger-of-the-covenant', 'messianic-prophecy', 'primary', "'I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple' — the prophecy Christians read as pointing to John the Baptist and Jesus."],
  ['mal-messenger-of-the-covenant', 'divine-judgment', 'secondary', "'But who can endure the day of his coming? Who can stand when he appears? For he will be like a refiner's fire' — the coming is judgment as purification."],
  ['mal-messenger-of-the-covenant', 'eschatological-hope', 'secondary', "'I will send the prophet Elijah to you before that great and dreadful day of the LORD' — the last prophetic word before four centuries of silence."],
  ['mal-messenger-of-the-covenant', 'covenant', 'secondary', "The 'messenger of the covenant' connects the coming figure to the entire covenant tradition — fulfillment of all God's promises."],
  ['mal-messenger-of-the-covenant', 'reconciliation', 'secondary', "'He will turn the hearts of the parents to their children, and the hearts of the children to their parents' — reconciliation across generations as the sign of restoration."],
  ['mal-messenger-of-the-covenant', 'family', 'illustrative', "The final verse of the Christian Old Testament is about family reconciliation — intergenerational healing as the preparation for the Messiah."],

  // mal-robbing-god — Malachi 3:6–3:12
  ['mal-robbing-god', 'tithing', 'primary', "'Bring the whole tithe into the storehouse... Test me in this,' says the LORD Almighty, 'and see if I will not throw open the floodgates of heaven' — the only passage where God invites testing."],
  ['mal-robbing-god', 'faithfulness-of-god', 'primary', "'I the LORD do not change. So you, the descendants of Jacob, are not destroyed' — divine faithfulness as the only reason Israel still exists."],
  ['mal-robbing-god', 'generosity', 'secondary', "The tithe command is framed as a trust exercise — generosity as the practice that opens the channel for blessing."],
  ['mal-robbing-god', 'blessing', 'secondary', "'I will prevent pests from devouring your crops, and the vines in your fields will not drop their fruit' — blessing connected to obedience in giving."],
  ['mal-robbing-god', 'covenant-breaking', 'secondary', "Withholding tithes is framed as robbery — covenant obligations presented in economic terms."],
  ['mal-robbing-god', 'testing', 'illustrative', "'Test me in this' — the unique invitation for humans to test God, reversing the normal pattern."],
];

// Now insert all tags into passage_themes
const insert = db.prepare(`
  INSERT INTO passage_themes (theme_id, book_id, chapter, verse_start, verse_end, relevance, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_assisted')
`);

const insertMany = db.transaction((rows) => {
  let count = 0;
  for (const [unitId, themeId, relevance, contextNote] of rows) {
    const unit = unitMap[unitId];
    if (!unit) {
      console.error(`Unit not found: ${unitId}`);
      continue;
    }
    insert.run(
      themeId,
      unit.book_id,
      unit.chapter_start,
      unit.verse_start,
      unit.verse_end || null,
      relevance,
      contextNote
    );
    count++;
  }
  return count;
});

const count = insertMany(tags);
console.log(`Inserted ${count} theme tags for ${Object.keys(unitMap).length} narrative units.`);

// Verify counts
const byRelevance = db.prepare(`
  SELECT relevance, COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
  GROUP BY relevance
`).all();
console.log('By relevance:', JSON.stringify(byRelevance));

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_themes
  WHERE book_id IN ('JOB','PSA','PRO','ECC','SNG','ISA','JER','LAM','EZK','DAN','HOS','JOL','AMO','OBA','JON','MIC','NAM','HAB','ZEP','HAG','ZEC','MAL')
  GROUP BY book_id ORDER BY book_id
`).all();
console.log('By book:', JSON.stringify(byBook));

db.close();
