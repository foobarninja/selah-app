import type { ThemeRecord } from "./theme-types"

/**
 * Doctrine & Relationship theme taxonomy (~85 themes)
 * Categories: doctrine, relationship
 * sourceTier: ai_assisted for all entries
 */
export const themesDoctrineRelationship: ThemeRecord[] = [
  // ═══════════════════════════════════════════════════════════════
  //  DOCTRINE  (~45 themes)
  // ═══════════════════════════════════════════════════════════════

  // ── Covenant ────────────────────────────────────────────────────
  {
    id: "covenant",
    name: "Covenant",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "A covenant is a solemn, binding agreement between God and people that structures the entire biblical narrative. Unlike a contract between equals, biblical covenants are initiated by God and carry promises, obligations, and signs that mark a people as belonging to him.",
    modernFraming:
      "Think of it less like signing a lease and more like the unspoken pact between you and the people who'd show up at 2 a.m. — it costs something, and it means everything.",
    relatedThemes: JSON.stringify([
      "faithfulness",
      "promise",
      "loyalty",
      "god-and-humanity",
      "law",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "abrahamic-covenant",
    name: "Abrahamic Covenant",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "God's unconditional promise to Abraham — land, descendants, and blessing to all nations — becomes the bedrock of Israel's identity and ultimately the foundation for Christian hope. It's the promise that set everything in motion, sealed not with a handshake but with a smoking firepot passing between split animals.",
    modernFraming:
      "Imagine someone telling you your broke, childless, elderly self is going to change the world — and meaning it. That's the audacity of this covenant.",
    relatedThemes: JSON.stringify([
      "promise",
      "faith",
      "blessing",
      "family",
      "inheritance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mosaic-covenant",
    name: "Mosaic Covenant",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "Given at Sinai, the Mosaic covenant established Israel as a holy nation with specific laws, rituals, and moral standards. It's conditional — blessings for obedience, curses for disobedience — and it created the framework through which Israel understood right relationship with God and neighbor.",
    modernFraming:
      "It's the constitution a newly freed people needed: here's who we are now, here's how we treat each other, here's what it looks like to live differently from every empire that came before.",
    relatedThemes: JSON.stringify([
      "law",
      "torah",
      "obedience",
      "holiness",
      "liberation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "davidic-covenant",
    name: "Davidic Covenant",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "God's promise to David that his throne would be established forever anchors Israel's messianic hope. Even when the monarchy crumbles and exile looms, prophets keep pointing back to this promise — a future king from David's line who will reign with justice.",
    modernFraming:
      "It's the promise that the best leader you've ever had is a preview, not the finale — something better is coming, and it won't be undone by politics or corruption.",
    relatedThemes: JSON.stringify([
      "kingdom-of-god",
      "messianic-prophecy",
      "leadership",
      "hope",
      "sovereignty",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "new-covenant",
    name: "New Covenant",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "Promised by Jeremiah and inaugurated by Jesus, the new covenant writes God's law on human hearts rather than stone tablets. It promises forgiveness not through repeated sacrifice but through a decisive, once-for-all act, and it extends the invitation beyond ethnic Israel to all peoples.",
    modernFraming:
      "It's the upgrade from following the rules because you have to, to wanting to because something inside you has fundamentally shifted.",
    relatedThemes: JSON.stringify([
      "atonement",
      "holy-spirit",
      "indwelling",
      "redemption",
      "grace",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "covenant-faithfulness",
    name: "Covenant Faithfulness",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "The Hebrew word hesed — steadfast love, loyal love, covenant faithfulness — is the glue that holds the biblical story together. It describes God's relentless commitment to his promises even when the other party fails spectacularly and repeatedly.",
    modernFraming:
      "It's the friend who keeps showing up even after you ghosted them for a year. Not because they're a pushover, but because their commitment isn't contingent on your performance.",
    relatedThemes: JSON.stringify([
      "faithfulness",
      "loyalty",
      "mercy",
      "love",
      "patience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "covenant-breaking",
    name: "Covenant Breaking",
    category: "doctrine",
    parentThemeId: "covenant",
    definition:
      "Throughout Scripture, covenant breaking — whether through idolatry, injustice, or neglect — triggers prophetic confrontation and consequences. The prophets use the language of marital infidelity to describe Israel's unfaithfulness, painting covenant violation as deeply personal, not merely legal.",
    modernFraming:
      "It's not just breaking a rule — it's breaking a relationship. Like finding out someone vowed 'for better or worse' but meant 'until something better comes along.'",
    relatedThemes: JSON.stringify([
      "sin",
      "idolatry",
      "betrayal",
      "consequences-of-sin",
      "rebellion",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Salvation ───────────────────────────────────────────────────
  {
    id: "salvation",
    name: "Salvation",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "Salvation in Scripture is far more than a ticket to heaven — it encompasses rescue from oppression, healing of brokenness, liberation from sin, and the ultimate restoration of all creation. The biblical story arcs from garden to city, from exile to homecoming, with God as the persistent rescuer.",
    modernFraming:
      "It's being pulled from the wreckage you didn't even realize you were trapped in — and discovering the life on the other side is bigger than you imagined.",
    relatedThemes: JSON.stringify([
      "redemption",
      "grace",
      "deliverance",
      "hope",
      "new-creation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "redemption",
    name: "Redemption",
    category: "doctrine",
    parentThemeId: "salvation",
    definition:
      "Redemption carries the image of buying back — a slave purchased out of bondage, a family field reclaimed from debt. In the New Testament, Jesus is the kinsman-redeemer who pays the price to set captives free, not with silver but with his own life.",
    modernFraming:
      "It's someone stepping in to cover a debt you could never repay — not to hold it over you, but to set you free from it entirely.",
    relatedThemes: JSON.stringify([
      "atonement",
      "liberation",
      "sacrifice",
      "grace",
      "new-life",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "atonement",
    name: "Atonement",
    category: "doctrine",
    parentThemeId: "salvation",
    definition:
      "Atonement addresses the rupture between humanity and God. Biblical images include the scapegoat carrying sins into the wilderness, the substitutionary lamb, and the mercy seat where God's justice and mercy meet. Multiple theories (ransom, substitution, moral influence, Christus Victor) have tried to capture its meaning — each illuminating a different facet.",
    modernFraming:
      "It's the thing that makes reconciliation possible when you've done real damage — not pretending it didn't happen, but absorbing the cost so the relationship can be restored.",
    relatedThemes: JSON.stringify([
      "sacrifice",
      "reconciliation",
      "sin",
      "mercy",
      "justice",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "justification",
    name: "Justification",
    category: "doctrine",
    parentThemeId: "salvation",
    definition:
      "Justification is the act of being declared righteous — not because you've earned it, but because God credits righteousness to those who trust him. Paul argues this was true for Abraham long before the law existed, making it available to anyone through faith.",
    modernFraming:
      "Imagine the charges against you being dropped — not on a technicality, but because someone else absorbed the full weight of the verdict on your behalf.",
    relatedThemes: JSON.stringify([
      "grace",
      "faith",
      "righteousness",
      "law-and-grace",
      "forgiveness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sanctification",
    name: "Sanctification",
    category: "doctrine",
    parentThemeId: "salvation",
    definition:
      "Sanctification is the ongoing process of becoming holy — being set apart and gradually shaped into the image of Christ. It's not instantaneous perfection but a lifelong renovation project involving the Spirit's work, human cooperation, community, and often suffering.",
    modernFraming:
      "It's the long, unglamorous work of becoming the person you keep saying you want to be — except you're not doing it alone, and the goal is bigger than self-improvement.",
    relatedThemes: JSON.stringify([
      "holiness",
      "spiritual-formation",
      "fruit-of-spirit",
      "discipline",
      "transformation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "deliverance",
    name: "Deliverance",
    category: "doctrine",
    parentThemeId: "salvation",
    definition:
      "From the Exodus to the exile's end to Jesus casting out demons, deliverance is God's decisive intervention to rescue his people from powers they cannot overcome alone. It's physical, spiritual, and communal — never just a private, interior experience.",
    modernFraming:
      "It's the moment you realize you're not stuck anymore — someone kicked down the door you'd been pounding on for years.",
    relatedThemes: JSON.stringify([
      "liberation",
      "exodus",
      "power-of-god",
      "courage",
      "oppression",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Sin ─────────────────────────────────────────────────────────
  {
    id: "sin",
    name: "Sin",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "Sin in the biblical imagination is not merely rule-breaking — it's a fracture in relationship, a distortion of what humans were made to be, and a power that enslaves. It corrupts individuals, communities, and entire systems, and it's the problem the whole biblical story is trying to solve.",
    modernFraming:
      "It's the thing you do that you swore you'd never do again, the pattern you can't seem to break, and the quiet ways you harm people without even noticing.",
    relatedThemes: JSON.stringify([
      "rebellion",
      "consequences-of-sin",
      "repentance",
      "grace",
      "atonement",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "original-sin",
    name: "Original Sin",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "The doctrine that humanity's first act of disobedience in Eden introduced a fundamental brokenness into human nature and the world itself. Traditions differ on the mechanics — inherited guilt vs. inherited tendency — but agree that something went wrong at the root, not just the branches.",
    modernFraming:
      "It's the reason the advice 'just be yourself' is both true and terrifying — because yourself is a mix of genuine goodness and some deeply embedded default settings toward selfishness.",
    relatedThemes: JSON.stringify([
      "temptation",
      "human-nature",
      "shame",
      "fall",
      "consequences-of-sin",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "temptation",
    name: "Temptation",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "Temptation in Scripture is the lure toward choosing something good in the wrong way, at the wrong time, or at someone else's expense. From Eden's fruit to Jesus in the wilderness, it targets legitimate desires and twists them. James insists it comes from within, not from God.",
    modernFraming:
      "It's the voice that says 'you deserve this' right before you do the thing you'll regret — the shortcut that looks like freedom but leads to a smaller life.",
    relatedThemes: JSON.stringify([
      "sin",
      "desire",
      "self-control",
      "spiritual-warfare",
      "wisdom",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "rebellion",
    name: "Rebellion",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "Biblical rebellion is the deliberate refusal to live under God's authority — from Adam and Eve to Israel's golden calf to the nations raging in the Psalms. It's not mere ignorance; it's knowing the right path and choosing to walk the other way.",
    modernFraming:
      "It's not the teenager who questions the rules — it's the one who understands them perfectly and burns the house down anyway, convinced they know better.",
    relatedThemes: JSON.stringify([
      "disobedience",
      "pride",
      "rebellion-against-authority",
      "consequences-of-sin",
      "repentance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "idolatry",
    name: "Idolatry",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "Idolatry is giving ultimate allegiance to anything other than God — whether carved images, political power, wealth, or self. The prophets mock it relentlessly: you made it with your own hands and then bowed down to it. It's the Bible's diagnosis of what goes wrong when worship gets misdirected.",
    modernFraming:
      "Your idol is whatever you'd sacrifice your integrity to keep — your career, your reputation, your comfort, your follower count. It's the thing that would leave you with nothing if you lost it.",
    relatedThemes: JSON.stringify([
      "worship",
      "false-gods",
      "materialism",
      "covenant-breaking",
      "prophetic-judgment",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hypocrisy",
    name: "Hypocrisy",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "Jesus reserved his harshest words not for sinners but for hypocrites — religious leaders who performed piety while neglecting justice, mercy, and faithfulness. Hypocrisy is the gap between the self you project and the self you actually are, and Scripture insists God sees through it every time.",
    modernFraming:
      "It's the Instagram version of your life vs. the version your therapist knows about. Jesus wasn't angry at messy people — he was furious at polished ones who used religion as a mask.",
    relatedThemes: JSON.stringify([
      "authenticity",
      "judgment",
      "pharisee",
      "integrity",
      "self-deception",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "consequences-of-sin",
    name: "Consequences of Sin",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "Scripture presents sin's consequences as both natural outcomes and divine judgment — exile, broken relationships, generational trauma, and spiritual death. The prophets insist these aren't arbitrary punishments but the logical result of abandoning the source of life.",
    modernFraming:
      "It's the hangover, the trust that takes years to rebuild, the family pattern your kids inherited without being taught. Consequences aren't God being petty — they're gravity.",
    relatedThemes: JSON.stringify([
      "judgment",
      "exile",
      "suffering",
      "repentance",
      "restoration",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "corporate-sin",
    name: "Corporate Sin",
    category: "doctrine",
    parentThemeId: "sin",
    definition:
      "The Bible doesn't limit sin to individuals — entire nations, institutions, and systems can be complicit in injustice. From Sodom's inhospitality to Babylon's exploitation, Scripture holds communities accountable for structural evil, not just personal morality.",
    modernFraming:
      "It's the company culture that rewards toxic behavior, the neighborhood that 'didn't see anything,' the system everyone benefits from but nobody wants to examine too closely.",
    relatedThemes: JSON.stringify([
      "justice",
      "oppression",
      "prophetic-judgment",
      "repentance",
      "community",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Sovereignty ─────────────────────────────────────────────────
  {
    id: "sovereignty",
    name: "Sovereignty of God",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "God's sovereignty means he is the ultimate authority over all creation, history, and human affairs. Scripture holds this in tension with human freedom and the reality of evil — insisting God is in control without reducing humans to puppets or making God the author of evil.",
    modernFraming:
      "It's the belief that the universe isn't random chaos or blind indifference — that there's a mind and a will behind it all, even when it feels like nobody's driving.",
    relatedThemes: JSON.stringify([
      "providence",
      "divine-plan",
      "mystery-of-god",
      "trust",
      "kingdom-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "providence",
    name: "Providence",
    category: "doctrine",
    parentThemeId: "sovereignty",
    definition:
      "Providence is God's ongoing care and governance of creation — not a distant clockmaker who wound things up, but an active sustainer who provides, protects, and directs. The story of Joseph ('you meant it for evil, God meant it for good') is its defining narrative.",
    modernFraming:
      "It's looking back at the worst thing that happened to you and seeing how it led to something you wouldn't trade — not because the pain was good, but because it wasn't wasted.",
    relatedThemes: JSON.stringify([
      "sovereignty",
      "trust",
      "gratitude",
      "suffering",
      "divine-plan",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "predestination",
    name: "Predestination",
    category: "doctrine",
    parentThemeId: "sovereignty",
    definition:
      "Predestination addresses whether God foreordains who will be saved. Calvinists emphasize God's sovereign election; Arminians stress human free response to grace; Eastern traditions focus on God's foreknowledge. All traditions affirm that salvation originates with God, not human effort — the disagreement is about the mechanics.",
    modernFraming:
      "It's the question of whether you chose God or God chose you — and most honest believers will tell you it felt like both at the same time.",
    relatedThemes: JSON.stringify([
      "free-will",
      "sovereignty",
      "grace",
      "mystery-of-god",
      "salvation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "free-will",
    name: "Free Will",
    category: "doctrine",
    parentThemeId: "sovereignty",
    definition:
      "The question of human freedom runs throughout Scripture — from God placing a tree in the garden to Joshua's 'choose this day whom you will serve.' The Bible presents genuine human choice without fully resolving its tension with divine sovereignty, suggesting both are real and important.",
    modernFraming:
      "It's the reason 'I had no choice' never quite rings true — you always had a choice, even when every option was terrible.",
    relatedThemes: JSON.stringify([
      "predestination",
      "responsibility",
      "obedience",
      "rebellion",
      "sovereignty",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-plan",
    name: "Divine Plan",
    category: "doctrine",
    parentThemeId: "sovereignty",
    definition:
      "Scripture presents history as moving toward a destination — not cyclical or random, but purposeful. From creation to new creation, from promise to fulfillment, the biblical story insists there's a plot, and God is the author navigating it through human freedom, failure, and faithfulness.",
    modernFraming:
      "It's the reassurance that even when your chapter feels like filler, the story is going somewhere — and the author hasn't lost the thread.",
    relatedThemes: JSON.stringify([
      "providence",
      "prophecy",
      "hope",
      "sovereignty",
      "new-creation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mystery-of-god",
    name: "Mystery of God",
    category: "doctrine",
    parentThemeId: "sovereignty",
    definition:
      "Biblical mystery isn't a problem to solve but a reality too large to fully grasp. Job learned this at the whirlwind; Paul marveled at it in Romans 11. Mystery isn't the absence of knowledge — it's the recognition that God is bigger than our categories.",
    modernFraming:
      "It's making peace with the fact that 'I don't know' is sometimes the most honest and faithful thing you can say — and that certainty isn't the same as faith.",
    relatedThemes: JSON.stringify([
      "sovereignty",
      "awe",
      "humility",
      "faith",
      "silence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Kingdom of God ──────────────────────────────────────────────
  {
    id: "kingdom-of-god",
    name: "Kingdom of God",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "The kingdom of God is the central theme of Jesus' teaching — God's reign breaking into the present world, overturning human power structures and inaugurating a new way of being human. It's both a present reality and a future hope, both a gift to receive and a way of life to embody.",
    modernFraming:
      "It's the world as it should be, crashing into the world as it is — every time someone chooses mercy over revenge, generosity over hoarding, truth over spin.",
    relatedThemes: JSON.stringify([
      "already-not-yet",
      "kingdom-ethics",
      "kingdom-reversal",
      "sovereignty",
      "new-creation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "already-not-yet",
    name: "Already and Not Yet",
    category: "doctrine",
    parentThemeId: "kingdom-of-god",
    definition:
      "The kingdom has been inaugurated by Jesus but not yet fully consummated — evil is defeated but not eliminated, healing is real but not universal, justice is advancing but not complete. Christians live in this tension, celebrating what has begun while longing for what's still to come.",
    modernFraming:
      "It's knowing the war is won but you're still in the middle of a battle — the diagnosis changed, but the treatment is ongoing.",
    relatedThemes: JSON.stringify([
      "kingdom-of-god",
      "hope",
      "patience",
      "new-creation",
      "resurrection",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "kingdom-ethics",
    name: "Kingdom Ethics",
    category: "doctrine",
    parentThemeId: "kingdom-of-god",
    definition:
      "The Sermon on the Mount lays out an ethic that makes no sense apart from the kingdom — turning the other cheek, loving enemies, refusing to retaliate. These aren't idealistic suggestions but the operating instructions for life under God's reign, where the rules of empire no longer apply.",
    modernFraming:
      "It's the counterintuitive playbook: the meek inherit, the peacemakers win, and the people who stop trying to save their lives are the ones who actually find them.",
    relatedThemes: JSON.stringify([
      "sermon-on-mount",
      "love",
      "peacemaking",
      "justice",
      "discipleship",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "kingdom-reversal",
    name: "Kingdom Reversal",
    category: "doctrine",
    parentThemeId: "kingdom-of-god",
    definition:
      "Throughout Scripture, God consistently inverts human hierarchies — the younger son inherits, the barren woman gives birth, the last become first, the cross becomes a throne. This pattern is not accidental; it reveals God's preference for the overlooked and his resistance to human pride.",
    modernFraming:
      "It's the hiring manager choosing the underdog, the award going to the unknown, the powerful brought low by their own arrogance — except it's cosmic and it's on purpose.",
    relatedThemes: JSON.stringify([
      "humility",
      "justice",
      "liberation",
      "barrenness",
      "servant-leadership",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "new-creation",
    name: "New Creation",
    category: "doctrine",
    parentThemeId: "kingdom-of-god",
    definition:
      "The biblical story doesn't end with souls escaping earth but with heaven and earth reunited — a renewed creation where death, pain, and injustice are no more. Revelation's vision isn't abandonment of the physical world but its radical transformation and healing.",
    modernFraming:
      "It's not an escape plan — it's a renovation project. God doesn't throw away the broken world; he makes it into something you wouldn't believe if you saw the 'before' photo.",
    relatedThemes: JSON.stringify([
      "resurrection",
      "hope",
      "restoration",
      "kingdom-of-god",
      "already-not-yet",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Resurrection ────────────────────────────────────────────────
  {
    id: "resurrection",
    name: "Resurrection",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "Resurrection is the cornerstone of Christian faith — not a metaphor for optimism but the claim that Jesus physically rose from the dead and that his followers will share the same destiny. Paul says if it didn't happen, the whole thing falls apart. It redefines death, hope, and the future.",
    modernFraming:
      "It's the most audacious claim in human history: death doesn't get the last word. Not as a comforting platitude, but as something that actually happened on a Sunday morning in first-century Palestine.",
    relatedThemes: JSON.stringify([
      "new-life",
      "hope",
      "death-and-afterlife",
      "new-creation",
      "victory",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "bodily-resurrection",
    name: "Bodily Resurrection",
    category: "doctrine",
    parentThemeId: "resurrection",
    definition:
      "The biblical hope isn't disembodied souls floating in clouds but transformed, physical bodies — what Paul calls 'spiritual bodies,' not meaning immaterial but animated by the Spirit. Jesus' resurrection body could eat fish and be touched, yet also walk through walls.",
    modernFraming:
      "It's the insistence that your body matters — not just your soul, not just your mind. Whatever's coming next, it involves the real, physical you, upgraded beyond recognition.",
    relatedThemes: JSON.stringify([
      "resurrection",
      "new-creation",
      "embodiment",
      "death-and-afterlife",
      "transformation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-renewal",
    name: "Spiritual Renewal",
    category: "doctrine",
    parentThemeId: "resurrection",
    definition:
      "Before the final resurrection, Scripture speaks of a present renewal — being born again, having hearts of stone replaced with hearts of flesh, being raised to new life through baptism. It's resurrection power at work now, not just later.",
    modernFraming:
      "It's the moment you realize you're not the same person you were three years ago — and the change wasn't just willpower. Something deeper shifted.",
    relatedThemes: JSON.stringify([
      "sanctification",
      "holy-spirit",
      "transformation",
      "repentance",
      "new-life",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "new-life",
    name: "New Life",
    category: "doctrine",
    parentThemeId: "resurrection",
    definition:
      "New life in Christ is both a status (you are a new creation) and a process (the old is passing away). It's the daily reality of living as someone who has died to one way of being and is learning to walk in another — stumbling, getting up, being met with grace.",
    modernFraming:
      "It's the fresh start that isn't just a New Year's resolution — it comes with new resources, new identity, and a community that won't let you do it alone.",
    relatedThemes: JSON.stringify([
      "resurrection",
      "spiritual-renewal",
      "baptism",
      "transformation",
      "hope",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "death-and-afterlife",
    name: "Death and Afterlife",
    category: "doctrine",
    parentThemeId: "resurrection",
    definition:
      "The Bible's view of death evolves — from Sheol's shadowy existence in the Old Testament to Jesus' promise of paradise and Paul's vision of resurrection. Scripture is less interested in mapping the afterlife than in insisting that death is an enemy already defeated and that what comes next is life, not oblivion.",
    modernFraming:
      "It's the question everyone asks at 3 a.m. after losing someone they love — and the Bible's answer isn't a detailed floor plan of heaven but a person who walked out of a tomb.",
    relatedThemes: JSON.stringify([
      "resurrection",
      "grief",
      "hope",
      "bodily-resurrection",
      "judgment",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Holy Spirit ─────────────────────────────────────────────────
  {
    id: "holy-spirit",
    name: "Holy Spirit",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "The Holy Spirit is God's active presence in the world — hovering over creation, empowering prophets and kings, and after Pentecost, dwelling within every believer. The Spirit is not an impersonal force but a person who teaches, convicts, comforts, and transforms.",
    modernFraming:
      "It's God not as a distant concept but as someone closer than your own breath — the internal GPS that recalculates when you go off course.",
    relatedThemes: JSON.stringify([
      "empowerment",
      "indwelling",
      "fruit-of-spirit",
      "spiritual-gifts",
      "new-covenant",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "empowerment",
    name: "Empowerment",
    category: "doctrine",
    parentThemeId: "holy-spirit",
    definition:
      "From Samson's strength to the early church's boldness, the Spirit empowers ordinary people to do what they could never do on their own. Pentecost democratized this — no longer reserved for prophets and kings but poured out on all flesh, regardless of age, gender, or status.",
    modernFraming:
      "It's showing up to something way over your head and discovering you have exactly what you need — not because you're special, but because you're not doing it alone.",
    relatedThemes: JSON.stringify([
      "holy-spirit",
      "courage",
      "spiritual-gifts",
      "calling",
      "strength",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-gifts",
    name: "Spiritual Gifts",
    category: "doctrine",
    parentThemeId: "holy-spirit",
    definition:
      "Paul describes spiritual gifts as diverse abilities given by the Spirit for the common good — prophecy, teaching, healing, administration, generosity, and more. No one has all gifts; everyone has at least one. They're not trophies to display but tools to serve.",
    modernFraming:
      "It's your specific superpower in the group project — the thing you do that makes everyone else's contribution work better. Not for your resume, but for the team.",
    relatedThemes: JSON.stringify([
      "holy-spirit",
      "church-as-body",
      "community",
      "service",
      "empowerment",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "indwelling",
    name: "Indwelling",
    category: "doctrine",
    parentThemeId: "holy-spirit",
    definition:
      "The radical New Testament claim that God's Spirit actually lives within believers — making their bodies temples, not just visitors at a temple. What was once confined to the tabernacle and then the temple is now distributed across every person who follows Jesus.",
    modernFraming:
      "It's the difference between visiting someone's house and them moving in with you. God doesn't just show up on Sundays — he has a permanent address, and it's you.",
    relatedThemes: JSON.stringify([
      "holy-spirit",
      "new-covenant",
      "intimacy-with-god",
      "sanctification",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fruit-of-spirit",
    name: "Fruit of the Spirit",
    category: "doctrine",
    parentThemeId: "holy-spirit",
    definition:
      "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control — Paul's list in Galatians isn't a checklist to manufacture but the natural produce of a life connected to the Spirit. They're evidence of inner transformation, not external performance.",
    modernFraming:
      "You can't fake an apple tree. Either the roots are healthy and the fruit shows up, or you're gluing plastic apples to dead branches. The fruit reveals what's actually growing inside.",
    relatedThemes: JSON.stringify([
      "holy-spirit",
      "love",
      "joy",
      "patience",
      "self-control",
      "sanctification",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Prophecy ────────────────────────────────────────────────────
  {
    id: "prophecy",
    name: "Prophecy",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "Biblical prophecy is less about predicting the future than about speaking God's truth to the present — confronting injustice, calling people back to covenant faithfulness, and casting a vision of what God intends. Foretelling is part of it, but forth-telling is its heart.",
    modernFraming:
      "It's not a crystal ball — it's the person in the room who says what everyone's thinking but nobody wants to say, backed by a conviction that comes from somewhere beyond themselves.",
    relatedThemes: JSON.stringify([
      "messianic-prophecy",
      "prophetic-judgment",
      "prophetic-hope",
      "truth",
      "courage",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "messianic-prophecy",
    name: "Messianic Prophecy",
    category: "doctrine",
    parentThemeId: "prophecy",
    definition:
      "Threads woven throughout the Old Testament point toward a coming deliverer — a suffering servant, a king from David's line, a prophet like Moses, a priest forever. Christians see these fulfilled in Jesus; the original audiences heard them as hope that God's rescue was coming.",
    modernFraming:
      "It's every scene in the movie that only makes sense on the second viewing — the clues were always there, you just didn't have the ending yet.",
    relatedThemes: JSON.stringify([
      "fulfilled-prophecy",
      "davidic-covenant",
      "hope",
      "salvation",
      "kingdom-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "prophetic-judgment",
    name: "Prophetic Judgment",
    category: "doctrine",
    parentThemeId: "prophecy",
    definition:
      "The prophets didn't pull punches — they announced divine judgment on injustice, idolatry, and exploitation with vivid, sometimes shocking imagery. But judgment in Scripture is rarely punitive for its own sake; it's the clearing of ground for something new to grow.",
    modernFraming:
      "It's the intervention nobody wants but everyone needs — the moment someone loves you enough to say 'this path you're on is going to destroy you, and I won't pretend otherwise.'",
    relatedThemes: JSON.stringify([
      "justice",
      "consequences-of-sin",
      "repentance",
      "wrath-of-god",
      "corporate-sin",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "prophetic-hope",
    name: "Prophetic Hope",
    category: "doctrine",
    parentThemeId: "prophecy",
    definition:
      "Even the harshest prophetic books contain passages of staggering hope — dry bones coming to life, deserts blooming, swords beaten into plowshares. Prophetic hope isn't wishful thinking; it's the insistence that God's final word is restoration, not destruction.",
    modernFraming:
      "It's the voice that says 'this isn't the end of the story' when everything around you says otherwise — not denial, but defiant trust in a different outcome.",
    relatedThemes: JSON.stringify([
      "hope",
      "restoration",
      "new-creation",
      "messianic-prophecy",
      "comfort",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fulfilled-prophecy",
    name: "Fulfilled Prophecy",
    category: "doctrine",
    parentThemeId: "prophecy",
    definition:
      "The New Testament writers repeatedly show how events in Jesus' life — birth in Bethlehem, ministry in Galilee, suffering and death, resurrection — fulfill Old Testament prophecies. This isn't proof-texting but a way of saying the whole story has been heading here all along.",
    modernFraming:
      "It's connecting the dots between a promise someone made decades ago and the moment you realize they actually kept it — the long game of faithfulness.",
    relatedThemes: JSON.stringify([
      "messianic-prophecy",
      "covenant-faithfulness",
      "divine-plan",
      "scripture",
      "faith",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Law ─────────────────────────────────────────────────────────
  {
    id: "law",
    name: "Law",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "The law (Torah) is instruction, not just legislation — God's guidance for how to live as his people. It covers everything from worship to diet to economic justice, and its purpose is debated: is it a path to righteousness, a mirror showing our failure, or a guide for grateful living? All three, depending on who you ask.",
    modernFraming:
      "It's less 'rules that restrict you' and more 'instructions for a life that actually works' — like the difference between a prison wall and a guardrail on a mountain road.",
    relatedThemes: JSON.stringify([
      "torah",
      "law-and-grace",
      "mosaic-covenant",
      "obedience",
      "justice",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "torah",
    name: "Torah",
    category: "doctrine",
    parentThemeId: "law",
    definition:
      "Torah literally means 'instruction' or 'teaching,' not 'law' in the restrictive sense. The first five books of the Bible contain narrative, poetry, and law woven together — it's not a legal code so much as a story of God forming a people and teaching them how to live.",
    modernFraming:
      "It's the family story and house rules rolled into one — you can't understand the rules without the story, and the story doesn't make sense without the rules.",
    relatedThemes: JSON.stringify([
      "law",
      "mosaic-covenant",
      "scripture",
      "wisdom",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "law-and-grace",
    name: "Law and Grace",
    category: "doctrine",
    parentThemeId: "law",
    definition:
      "Paul's letters wrestle with how the law relates to the grace of Christ — not as enemies but as different chapters in the same story. The law reveals the standard; grace provides what the law demanded but couldn't produce. They're not opposed; they're sequential.",
    modernFraming:
      "It's the difference between knowing you need to change and actually having the power to do it — the law is the diagnosis, grace is the cure.",
    relatedThemes: JSON.stringify([
      "grace",
      "justification",
      "new-covenant",
      "freedom",
      "spirit-of-law",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "moral-law",
    name: "Moral Law",
    category: "doctrine",
    parentThemeId: "law",
    definition:
      "Many Christian traditions distinguish moral law (love God, love neighbor, don't murder) from ceremonial and civil law, arguing the moral law reflects God's unchanging character and remains binding. This framework helps navigate which Old Testament commands still apply, though the lines aren't always clean.",
    modernFraming:
      "It's the stuff that's wrong everywhere, in every century, in every culture — not because a religion says so, but because it's woven into the fabric of what it means to be human.",
    relatedThemes: JSON.stringify([
      "law",
      "ethics",
      "justice",
      "ten-commandments",
      "conscience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "ceremonial-law",
    name: "Ceremonial Law",
    category: "doctrine",
    parentThemeId: "law",
    definition:
      "Ceremonial laws governed Israel's worship life — sacrifices, clean and unclean foods, purity rituals, festival observances. Most Christians see these as fulfilled in Christ and no longer binding, though they remain deeply instructive for understanding the New Testament.",
    modernFraming:
      "It's the difference between the scaffolding and the building — the scaffolding was essential during construction, but once the building stands, you don't need it anymore. You still learn from it, though.",
    relatedThemes: JSON.stringify([
      "sacrifice",
      "holiness",
      "atonement",
      "worship",
      "law-and-grace",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spirit-of-law",
    name: "Spirit of the Law",
    category: "doctrine",
    parentThemeId: "law",
    definition:
      "Jesus repeatedly pointed past the letter of the law to its intent — not just 'don't murder' but 'don't harbor contempt'; not just 'don't commit adultery' but 'guard your heart.' The spirit of the law is more demanding than the letter, because it addresses who you are, not just what you do.",
    modernFraming:
      "It's the difference between technically following the rules and actually getting the point. You can obey every traffic law while road-raging the whole way home.",
    relatedThemes: JSON.stringify([
      "kingdom-ethics",
      "moral-law",
      "integrity",
      "heart",
      "hypocrisy",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Worship ─────────────────────────────────────────────────────
  {
    id: "worship",
    name: "Worship",
    category: "doctrine",
    parentThemeId: null,
    definition:
      "Worship in Scripture is the whole-life response to who God is — not just singing on Sunday but the orientation of everything you do around the God who made and saved you. The prophets insisted that worship without justice is noise God refuses to listen to.",
    modernFraming:
      "It's not just the music that gives you chills — it's how you spend your money, treat your coworkers, and what you reach for when you're alone. Everybody worships something.",
    relatedThemes: JSON.stringify([
      "prayer",
      "praise",
      "sacrifice",
      "idolatry",
      "intimacy-with-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "prayer",
    name: "Prayer",
    category: "doctrine",
    parentThemeId: "worship",
    definition:
      "Prayer in the Bible ranges from desperate cries to structured liturgy, from silent contemplation to wrestling matches with God. It's not reciting wishes to the sky; it's the primary way humans maintain relationship with God — honest, messy, persistent, and transformative.",
    modernFraming:
      "It's the conversation you keep having even when you're not sure anyone's listening — because sometimes the act of speaking the truth out loud changes you, whether or not you hear a reply.",
    relatedThemes: JSON.stringify([
      "intimacy-with-god",
      "hearing-god",
      "silence-of-god",
      "trust",
      "lament",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "praise",
    name: "Praise",
    category: "doctrine",
    parentThemeId: "worship",
    definition:
      "Praise is the joyful declaration of who God is and what he has done — from the Psalms' exuberant hallelujahs to Revelation's cosmic worship. It's not flattery God needs; it's the natural overflow when finite beings encounter infinite goodness.",
    modernFraming:
      "It's the thing that happens involuntarily when something is so beautiful or good that you have to tell someone — like recommending a song you can't stop playing. Praise is worship's exclamation point.",
    relatedThemes: JSON.stringify([
      "worship",
      "gratitude",
      "joy",
      "awe",
      "music",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sacrifice",
    name: "Sacrifice",
    category: "doctrine",
    parentThemeId: "worship",
    definition:
      "Sacrifice is the costly offering that restores relationship — from Abel's firstlings to Israel's temple system to Christ's cross. The trajectory of Scripture moves from animal sacrifice toward self-giving love, with Jesus redefining sacrifice as laying down your life for others.",
    modernFraming:
      "It's choosing the harder path because something matters more than your comfort — the parent who works two jobs, the friend who gives up their Saturday, the leader who takes the blame.",
    relatedThemes: JSON.stringify([
      "atonement",
      "love",
      "generosity",
      "cross",
      "worship",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sabbath",
    name: "Sabbath",
    category: "doctrine",
    parentThemeId: "worship",
    definition:
      "Sabbath is the radical claim that rest is not laziness but resistance — resistance to the empire's demand for constant productivity and trust that the world won't fall apart if you stop. It's built into creation itself: even God rested.",
    modernFraming:
      "It's the weekly practice of proving you're not a machine — turning off the phone, ignoring the inbox, and remembering that your worth isn't measured by your output.",
    relatedThemes: JSON.stringify([
      "rest",
      "trust",
      "creation",
      "freedom",
      "rhythm",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "pilgrimage",
    name: "Pilgrimage",
    category: "doctrine",
    parentThemeId: "worship",
    definition:
      "Israel's festivals required physical journeys to Jerusalem — the Psalms of Ascent were sung on the road. Pilgrimage embodies the idea that faith isn't just mental assent but a bodily, communal journey toward encounter with God.",
    modernFraming:
      "It's the road trip version of faith — sometimes you have to physically go somewhere to understand something that reading about it can't teach you.",
    relatedThemes: JSON.stringify([
      "worship",
      "journey",
      "community",
      "sabbath",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },

  // ═══════════════════════════════════════════════════════════════
  //  RELATIONSHIP  (~40 themes)
  // ═══════════════════════════════════════════════════════════════

  // ── Family ──────────────────────────────────────────────────────
  {
    id: "family",
    name: "Family",
    category: "relationship",
    parentThemeId: null,
    definition:
      "Family in Scripture is both the primary unit of faith transmission and a recurring site of dysfunction — from Cain and Abel through David's household. The Bible is honest about family: it's where you learn to love and where you learn to wound, often at the same time.",
    modernFraming:
      "It's the people you didn't choose who shaped you the most — for better and worse. The Bible doesn't idealize family; it shows you every beautiful and broken version of it.",
    relatedThemes: JSON.stringify([
      "marriage",
      "parenting",
      "sibling-rivalry",
      "inheritance",
      "belonging",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "marriage",
    name: "Marriage",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "Scripture uses marriage as both a human institution and a theological metaphor — God and Israel, Christ and the church. It's a covenant of self-giving love, not a transaction. The Bible's marriage stories are rarely tidy; they include arranged marriages, polygamy, grief, betrayal, and redemption.",
    modernFraming:
      "It's the relationship that exposes every part of you — the good, the selfish, the petty. Marriage in the Bible isn't a fairy tale; it's two imperfect people practicing covenant in real time.",
    relatedThemes: JSON.stringify([
      "family",
      "covenant",
      "love",
      "intimacy-with-god",
      "faithfulness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "parenting",
    name: "Parenting",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "From Abraham sacrificing Isaac (or not) to the prodigal son's father running down the road, parenting in Scripture is about releasing children to their own journeys while remaining an anchor of love. God himself is portrayed as parent — protective, instructive, heartbroken, and never giving up.",
    modernFraming:
      "It's the job where you pour everything in and then watch them make their own choices — some brilliant, some devastating. Every parent in the Bible understands the prodigal father's ache.",
    relatedThemes: JSON.stringify([
      "family",
      "father-child",
      "mother-child",
      "discipline",
      "love",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sibling-rivalry",
    name: "Sibling Rivalry",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "From Cain and Abel to Joseph and his brothers to the prodigal and elder sons, sibling rivalry is one of the Bible's most persistent themes. It explores jealousy, favoritism, competition for blessing, and the hard road to reconciliation. It's never trivial — in Genesis, it literally starts with a murder.",
    modernFraming:
      "It's the comparison game that starts in childhood and never quite goes away — who got more, who was favored, who had it easier. The Bible shows that it can either destroy a family or, against all odds, lead to healing.",
    relatedThemes: JSON.stringify([
      "jealousy",
      "family",
      "conflict",
      "reconciliation",
      "favoritism",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "father-child",
    name: "Father-Child Relationship",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "The Bible's father-child relationships span the spectrum — from Abraham's painful obedience with Isaac to David's grief over Absalom. God is consistently portrayed as father, and these human stories illuminate that metaphor with all its complexity, tenderness, and tension.",
    modernFraming:
      "It's the relationship that shapes how you see authority, worth, and love — whether your father was present, absent, gentle, or harsh. The Bible knows every version.",
    relatedThemes: JSON.stringify([
      "parenting",
      "authority",
      "god-and-humanity",
      "inheritance",
      "discipline",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mother-child",
    name: "Mother-Child Relationship",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "From Hagar weeping in the wilderness to Hannah's desperate prayer to Mary pondering things in her heart, mother-child relationships in Scripture carry fierce love, sacrifice, and often subversive power. Mothers in the Bible frequently act as agents of God's purposes at great personal cost.",
    modernFraming:
      "It's the love that will scheme, sacrifice, and fight for a child's future — from Moses' mother hiding him in a basket to the mom who works three jobs so her kid can have one shot.",
    relatedThemes: JSON.stringify([
      "parenting",
      "sacrifice",
      "love",
      "barrenness",
      "courage",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "barrenness",
    name: "Barrenness",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "Barrenness in the Bible is both a painful human experience and a narrative device — Sarah, Rebekah, Rachel, Hannah, and Elizabeth all wait in agonizing hope before God opens their wombs. It's always followed by surprising fulfillment, signaling that God's plans come through impossible situations.",
    modernFraming:
      "It's the season of waiting when everyone around you has what you desperately want — the empty nursery, the unfulfilled calling, the dream that won't come alive no matter what you try.",
    relatedThemes: JSON.stringify([
      "waiting",
      "hope",
      "kingdom-reversal",
      "mother-child",
      "lament",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "inheritance",
    name: "Inheritance",
    category: "relationship",
    parentThemeId: "family",
    definition:
      "Inheritance in Scripture is both material (land, birthright, blessing) and spiritual (the promises of God passed from generation to generation). It drives some of the most dramatic conflicts — Esau selling his birthright, the prodigal demanding his share early, Israel inheriting Canaan.",
    modernFraming:
      "It's not just what you get when someone dies — it's the values, patterns, blessings, and baggage your family passed down, whether they meant to or not.",
    relatedThemes: JSON.stringify([
      "family",
      "blessing",
      "promise",
      "sibling-rivalry",
      "generational",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Friendship ──────────────────────────────────────────────────
  {
    id: "friendship",
    name: "Friendship",
    category: "relationship",
    parentThemeId: null,
    definition:
      "Biblical friendship goes deeper than casual acquaintance — David and Jonathan's covenant loyalty, Ruth and Naomi's fierce devotion, Jesus calling his disciples 'friends.' Proverbs insists that a true friend sticks closer than a brother, making friendship a form of chosen covenant.",
    modernFraming:
      "It's the relationship you choose that sometimes outlasts the ones you were born into — the person who knows your worst self and still picks up the phone.",
    relatedThemes: JSON.stringify([
      "loyalty",
      "brotherhood",
      "love",
      "community",
      "chosen-family",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "loyalty",
    name: "Loyalty",
    category: "relationship",
    parentThemeId: "friendship",
    definition:
      "Loyalty in Scripture is costly commitment that holds firm under pressure — Ruth clinging to Naomi, Jonathan protecting David at risk to his own throne, the disciples who stayed at the cross. It's not blind allegiance but faithfulness rooted in love.",
    modernFraming:
      "It's showing up when it costs you something — defending someone when they're not in the room, staying when leaving would be easier, choosing the person over the advantage.",
    relatedThemes: JSON.stringify([
      "faithfulness",
      "friendship",
      "covenant-faithfulness",
      "betrayal",
      "trust",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "betrayal",
    name: "Betrayal",
    category: "relationship",
    parentThemeId: "friendship",
    definition:
      "From Judas' kiss to Peter's denial to Absalom's coup, betrayal in Scripture is always personal — it comes from the inner circle, not the enemy. The Psalms are full of the particular anguish of being wounded by someone who ate at your table.",
    modernFraming:
      "Betrayal isn't just Judas and silver — it's the text you weren't supposed to see, the friend who sided with your ex, the coworker who took credit for your idea. It hurts most from the people closest to you.",
    relatedThemes: JSON.stringify([
      "trust",
      "loyalty",
      "friendship",
      "grief",
      "forgiveness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "brotherhood",
    name: "Brotherhood",
    category: "relationship",
    parentThemeId: "friendship",
    definition:
      "Brotherhood in Scripture extends beyond biology to spiritual kinship — fellow soldiers, fellow believers, fellow sufferers. David and Jonathan's bond, the early church calling each other 'brothers and sisters,' Paul's affection for Timothy — all testify to bonds forged in shared purpose and mutual sacrifice.",
    modernFraming:
      "It's the bond formed in the trenches — the roommate who became your brother, the small group that became your family, the teammate who'd take a bullet for you.",
    relatedThemes: JSON.stringify([
      "friendship",
      "community",
      "loyalty",
      "chosen-family",
      "fellowship",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "chosen-family",
    name: "Chosen Family",
    category: "relationship",
    parentThemeId: "friendship",
    definition:
      "Jesus redefined family when he gestured at his disciples and said 'here are my mother and brothers.' Scripture validates the bonds formed not by blood but by shared faith, purpose, and commitment — Ruth choosing Naomi's people, the early church sharing everything in common.",
    modernFraming:
      "It's the people who became your family when your actual family couldn't or wouldn't — the ones you chose and who chose you back. Blood may be thicker than water, but covenant is thicker than both.",
    relatedThemes: JSON.stringify([
      "family",
      "friendship",
      "community",
      "belonging",
      "fellowship",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Community ───────────────────────────────────────────────────
  {
    id: "community",
    name: "Community",
    category: "relationship",
    parentThemeId: null,
    definition:
      "Biblical faith is irreducibly communal — from Israel as a people to the church as a body. You cannot follow God alone. Community is where faith is tested, character is formed, gifts are exercised, and the lonely find belonging. It's also where the hardest relational work happens.",
    modernFraming:
      "It's the group that's harder than going solo but more transformative — the people who challenge your blind spots, celebrate your wins, and refuse to let you isolate.",
    relatedThemes: JSON.stringify([
      "church-as-body",
      "fellowship",
      "belonging",
      "one-another",
      "hospitality",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "belonging",
    name: "Belonging",
    category: "relationship",
    parentThemeId: "community",
    definition:
      "The Bible addresses the universal human need to belong — from God's repeated declaration 'you will be my people' to the early church's radical inclusion of outsiders. Belonging isn't earned; it's bestowed. And it's always more costly and more beautiful than mere acceptance.",
    modernFraming:
      "It's the difference between being in the room and being wanted there — knowing you don't have to perform, pretend, or prove yourself to have a seat at the table.",
    relatedThemes: JSON.stringify([
      "community",
      "identity",
      "inclusion",
      "chosen-family",
      "adoption",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "fellowship",
    name: "Fellowship",
    category: "relationship",
    parentThemeId: "community",
    definition:
      "Koinonia — deep fellowship — was the hallmark of the early church: sharing meals, possessions, prayers, and suffering. It goes far beyond socializing; it's the shared life that happens when people are genuinely committed to one another and to Christ.",
    modernFraming:
      "It's not just coffee after church — it's the meal you share after the worst week of your life, the text at midnight, the friend who drops everything because you need them.",
    relatedThemes: JSON.stringify([
      "community",
      "hospitality",
      "one-another",
      "love",
      "church-as-body",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "church-as-body",
    name: "Church as Body",
    category: "relationship",
    parentThemeId: "community",
    definition:
      "Paul's metaphor of the church as Christ's body insists that every member is essential, every gift matters, and no part can say to another 'I don't need you.' It's an argument against hierarchy, individualism, and the celebrity model of leadership — the eye needs the hand, and the hand needs the foot.",
    modernFraming:
      "It's the team where the star player and the water boy both matter — where your weird, specific skill is exactly what's missing, and the whole group suffers when you check out.",
    relatedThemes: JSON.stringify([
      "community",
      "spiritual-gifts",
      "unity",
      "diversity",
      "belonging",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "one-another",
    name: "One-Another Commands",
    category: "relationship",
    parentThemeId: "community",
    definition:
      "The New Testament contains dozens of 'one another' commands — love, serve, bear with, forgive, encourage, admonish, confess to one another. These aren't optional extras; they're the daily mechanics of what it looks like for the church to actually be the church.",
    modernFraming:
      "It's the relational operating system of the church: you carry my burden this week, I carry yours next week. None of it works if everyone's keeping score or staying surface-level.",
    relatedThemes: JSON.stringify([
      "community",
      "fellowship",
      "forgiveness",
      "service",
      "love",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    category: "relationship",
    parentThemeId: "community",
    definition:
      "Biblical hospitality isn't Martha Stewart entertaining — it's making room for the stranger, the refugee, the outsider. Abraham hosted angels unawares; the early church opened homes as the first sanctuaries. Hebrews commands it. Jesus made it the test of true religion.",
    modernFraming:
      "It's the open door, the extra plate, the willingness to be inconvenienced by someone else's need. Not performing generosity for an audience, but quietly making space for people who have none.",
    relatedThemes: JSON.stringify([
      "hospitality-to-stranger",
      "community",
      "generosity",
      "love",
      "inclusion",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Authority ───────────────────────────────────────────────────
  {
    id: "authority",
    name: "Authority",
    category: "relationship",
    parentThemeId: null,
    definition:
      "Scripture examines authority from every angle — God's ultimate authority, human authority as delegated stewardship, and the constant temptation to abuse power. From Moses to kings to apostles, the pattern is clear: authority is for serving those under it, not exploiting them.",
    modernFraming:
      "It's the question of who gets to call the shots and what happens when they use that power for themselves instead of for the people they're supposed to serve.",
    relatedThemes: JSON.stringify([
      "leadership",
      "submission",
      "servant-leadership",
      "sovereignty",
      "obedience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "leadership",
    name: "Leadership",
    category: "relationship",
    parentThemeId: "authority",
    definition:
      "Biblical leadership is paradoxical — the greatest must become the least, the first must be last, and the model leader washes feet. From Joseph's administration in Egypt to Nehemiah's wall-building to Jesus' upside-down kingdom, leadership in Scripture is measured by who it serves, not who it impresses.",
    modernFraming:
      "It's the boss who would never ask you to do something they wouldn't do themselves — the person who leads from the front but eats last.",
    relatedThemes: JSON.stringify([
      "authority",
      "servant-leadership",
      "wisdom",
      "responsibility",
      "calling",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "submission",
    name: "Submission",
    category: "relationship",
    parentThemeId: "authority",
    definition:
      "Submission in Scripture is voluntary yielding, not coerced obedience — modeled ultimately by Christ submitting to the Father's will in Gethsemane. It's always mutual in context (Ephesians 5:21 says 'submit to one another') and never a license for abuse or domination.",
    modernFraming:
      "It's the willingness to trust someone else's lead when you could fight for control — not because you're weak, but because you believe something bigger is at stake than being right.",
    relatedThemes: JSON.stringify([
      "obedience",
      "humility",
      "authority",
      "trust",
      "servant-leadership",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "rebellion-against-authority",
    name: "Rebellion Against Authority",
    category: "relationship",
    parentThemeId: "authority",
    definition:
      "Scripture both condemns illegitimate rebellion (Korah's uprising, Absalom's coup) and celebrates resistance to unjust authority (Hebrew midwives defying Pharaoh, Daniel refusing the king's food). The distinction hinges on whether the authority being resisted is acting in accordance with God's character.",
    modernFraming:
      "It's the difference between the employee who undermines a good boss out of ego and the whistleblower who risks everything because staying silent would make them complicit.",
    relatedThemes: JSON.stringify([
      "rebellion",
      "authority",
      "justice",
      "courage",
      "civil-disobedience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "servant-leadership",
    name: "Servant Leadership",
    category: "relationship",
    parentThemeId: "authority",
    definition:
      "Jesus made servant leadership the only legitimate model — 'whoever wants to be great among you must be your servant.' He demonstrated it by washing feet, touching lepers, and dying on a cross. It's power wielded for others, never over them.",
    modernFraming:
      "It's the leader who clears the path for others to succeed rather than building a platform for themselves — the manager you'd follow anywhere because they put your growth above their ego.",
    relatedThemes: JSON.stringify([
      "leadership",
      "humility",
      "authority",
      "kingdom-reversal",
      "love",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Conflict ────────────────────────────────────────────────────
  {
    id: "conflict",
    name: "Conflict",
    category: "relationship",
    parentThemeId: null,
    definition:
      "The Bible doesn't shy away from conflict — it's full of wars, family feuds, church disputes, and internal struggles. What it offers isn't a conflict-free life but a framework for navigating it: truth-telling, forgiveness, reconciliation, and sometimes the courage to fight for justice.",
    modernFraming:
      "It's the argument you're avoiding, the tension in the room, the relationship that's stuck. The Bible says: deal with it — honestly, humbly, and before the sun goes down.",
    relatedThemes: JSON.stringify([
      "reconciliation",
      "peacemaking",
      "warfare",
      "forgiveness",
      "enemies",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "reconciliation",
    name: "Reconciliation",
    category: "relationship",
    parentThemeId: "conflict",
    definition:
      "Reconciliation is the restoration of a broken relationship — between humans and God (2 Corinthians 5) and between humans with each other (the prodigal's return, Jacob and Esau's embrace). It requires honesty about the breach, genuine repentance, and the hard work of rebuilding trust.",
    modernFraming:
      "It's the hardest conversation you'll ever have — the one where you stop keeping score and start choosing the relationship over being right. It doesn't mean pretending it didn't happen; it means building something new from the wreckage.",
    relatedThemes: JSON.stringify([
      "forgiveness",
      "atonement",
      "peacemaking",
      "conflict",
      "grace",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "peacemaking",
    name: "Peacemaking",
    category: "relationship",
    parentThemeId: "conflict",
    definition:
      "Jesus called peacemakers 'children of God' — not peacekeepers who avoid conflict but peacemakers who actively pursue shalom: the flourishing of all things. Biblical peace isn't the absence of conflict but the presence of justice, wholeness, and right relationships.",
    modernFraming:
      "It's not 'let's all just get along' — it's the person who walks into the tension, names the elephant, and does the work of building bridges instead of walls.",
    relatedThemes: JSON.stringify([
      "peace",
      "conflict",
      "reconciliation",
      "justice",
      "kingdom-ethics",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "warfare",
    name: "Warfare",
    category: "relationship",
    parentThemeId: "conflict",
    definition:
      "The Bible contains both physical warfare (conquest narratives, battles of kings) and spiritual warfare (Ephesians' armor of God, cosmic conflict between good and evil). These difficult texts have been used to justify violence and to resist it; honest reading requires wrestling with both the historical context and the trajectory toward enemy-love.",
    modernFraming:
      "It's the hardest part of the Bible to read honestly — because sometimes the fight is real and unavoidable, and sometimes the 'fight' is the daily battle to choose love in a world that rewards cruelty.",
    relatedThemes: JSON.stringify([
      "conflict",
      "enemies",
      "courage",
      "spiritual-warfare",
      "kingdom-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "enemies",
    name: "Enemies",
    category: "relationship",
    parentThemeId: "conflict",
    definition:
      "The Psalms cry out against enemies; Jesus commands love for them. This tension is intentional — Scripture allows space for honest rage while directing believers toward the radical practice of enemy-love. The prayer 'forgive them, they don't know what they're doing' comes from a cross, not a couch.",
    modernFraming:
      "It's the person you'd be justified in hating — and the terrifying invitation to pray for them anyway. Not because they deserve it, but because holding onto it is slowly poisoning you.",
    relatedThemes: JSON.stringify([
      "forgiveness",
      "conflict",
      "love",
      "lament",
      "persecution",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Mentorship ──────────────────────────────────────────────────
  {
    id: "mentorship",
    name: "Mentorship",
    category: "relationship",
    parentThemeId: null,
    definition:
      "Biblical mentorship is life-on-life investment — Moses and Joshua, Elijah and Elisha, Paul and Timothy, Jesus and the Twelve. It's not classroom instruction but apprenticeship: learning by watching, doing, failing, and being shaped by someone further along the path.",
    modernFraming:
      "It's the person who sees potential in you before you see it in yourself — who tells you the truth, lets you fail safely, and doesn't let you quit when it gets hard.",
    relatedThemes: JSON.stringify([
      "discipleship",
      "teacher-student",
      "passing-the-torch",
      "wisdom",
      "spiritual-formation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "discipleship",
    name: "Discipleship",
    category: "relationship",
    parentThemeId: "mentorship",
    definition:
      "To be a disciple is to be a learner who follows — not just intellectually but with your whole life. Jesus' disciples left nets, tax booths, and families to walk with him. Discipleship is formation through proximity: you become like the one you follow.",
    modernFraming:
      "It's the difference between admiring someone from a distance and actually reorganizing your life around what they teach. It's not a course you complete — it's a life you enter.",
    relatedThemes: JSON.stringify([
      "mentorship",
      "obedience",
      "spiritual-formation",
      "sacrifice",
      "community",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-formation",
    name: "Spiritual Formation",
    category: "relationship",
    parentThemeId: "mentorship",
    definition:
      "Spiritual formation is the slow, often invisible process of being shaped into Christlikeness — through prayer, Scripture, community, suffering, and ordinary daily faithfulness. It's less about dramatic breakthroughs and more about the gradual, patient work of becoming the person you were created to be.",
    modernFraming:
      "It's the spiritual equivalent of compound interest — small, daily deposits that don't look like much until you zoom out over years and realize you've become someone different.",
    relatedThemes: JSON.stringify([
      "sanctification",
      "discipleship",
      "prayer",
      "community",
      "patience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "passing-the-torch",
    name: "Passing the Torch",
    category: "relationship",
    parentThemeId: "mentorship",
    definition:
      "The Bible is a story of succession — Moses to Joshua, Elijah to Elisha, Jesus to the disciples, Paul to Timothy. The mature generation's job is not to hold power indefinitely but to prepare the next generation and then step aside, trusting that God's work will continue through new hands.",
    modernFraming:
      "It's the mentor who celebrates when the student surpasses them — the leader who builds their own replacement instead of building a kingdom that can't survive without them.",
    relatedThemes: JSON.stringify([
      "mentorship",
      "legacy",
      "leadership",
      "generational",
      "trust",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "teacher-student",
    name: "Teacher-Student Relationship",
    category: "relationship",
    parentThemeId: "mentorship",
    definition:
      "The rabbi-disciple model was central to Jewish life and Jesus' ministry — students didn't just learn ideas but imitated their teacher's entire way of life. The goal wasn't information transfer but transformation: becoming like the teacher in character, not just knowledge.",
    modernFraming:
      "It's the difference between someone who teaches you facts and someone who teaches you how to think, live, and see the world differently. The best teachers change you, not just your GPA.",
    relatedThemes: JSON.stringify([
      "mentorship",
      "discipleship",
      "wisdom",
      "authority",
      "humility",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── Stranger ────────────────────────────────────────────────────
  {
    id: "stranger",
    name: "The Stranger",
    category: "relationship",
    parentThemeId: null,
    definition:
      "The Old Testament commands care for the stranger (ger) more than almost any other social obligation — 'for you were strangers in Egypt.' This concern extends into the New Testament, where Jesus identifies himself with the stranger: 'I was a stranger and you welcomed me.'",
    modernFraming:
      "It's the person who doesn't look like you, talk like you, or come from where you come from — and the biblical command is crystal clear: treat them like they belong, because you know what it's like not to.",
    relatedThemes: JSON.stringify([
      "hospitality-to-stranger",
      "immigrant",
      "inclusion",
      "compassion",
      "justice",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hospitality-to-stranger",
    name: "Hospitality to the Stranger",
    category: "relationship",
    parentThemeId: "stranger",
    definition:
      "Beyond general hospitality, the Bible specifically commands welcoming strangers — foreigners, travelers, and the displaced. Abraham's hosting of three visitors (who turned out to be divine), Rahab sheltering the spies, and Hebrews' reminder about 'entertaining angels unawares' all elevate this practice from nicety to sacred duty.",
    modernFraming:
      "It's opening your door to someone you have no obligation to help — the neighbor you've never spoken to, the new kid at church, the refugee family down the street.",
    relatedThemes: JSON.stringify([
      "hospitality",
      "stranger",
      "generosity",
      "compassion",
      "love",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "immigrant",
    name: "The Immigrant",
    category: "relationship",
    parentThemeId: "stranger",
    definition:
      "Israel's identity was forged as immigrants — aliens in Egypt, wanderers in the wilderness, exiles in Babylon. This experience is the foundation of their ethic toward foreigners: 'Do not oppress a foreigner; you yourselves know how it feels.' Ruth the Moabite, a quintessential immigrant, ends up in the lineage of David and Jesus.",
    modernFraming:
      "It's the new family in the neighborhood who doesn't speak the language yet — and the Bible's response isn't 'go back where you came from' but 'set an extra place at the table.'",
    relatedThemes: JSON.stringify([
      "stranger",
      "exile",
      "belonging",
      "justice",
      "hospitality-to-stranger",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "outsider",
    name: "The Outsider",
    category: "relationship",
    parentThemeId: "stranger",
    definition:
      "Scripture repeatedly centers outsiders — Rahab the prostitute, Ruth the Moabite, the Samaritan woman, the Roman centurion. God's story has a persistent pattern of insiders becoming complacent and outsiders showing up with the faith that insiders lost.",
    modernFraming:
      "It's the person everyone counted out who ends up changing everything — the dropout who starts the company, the outsider who sees what the insiders can't.",
    relatedThemes: JSON.stringify([
      "inclusion",
      "kingdom-reversal",
      "stranger",
      "faith",
      "exclusion",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "inclusion",
    name: "Inclusion",
    category: "relationship",
    parentThemeId: "stranger",
    definition:
      "The biblical trajectory moves from a chosen people to an open invitation — from 'my people Israel' to 'every tribe, tongue, and nation.' The early church's biggest controversy was inclusion: do Gentiles belong? The answer, after much wrestling, was an emphatic yes.",
    modernFraming:
      "It's the moment the velvet rope comes down and the VIP section opens to everyone — not because standards dropped, but because the host's table was always meant to be bigger than we thought.",
    relatedThemes: JSON.stringify([
      "belonging",
      "outsider",
      "community",
      "grace",
      "kingdom-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "exclusion",
    name: "Exclusion",
    category: "relationship",
    parentThemeId: "stranger",
    definition:
      "Scripture takes exclusion seriously — both as something God's people experience (exile, marginalization) and something they perpetrate (purity codes that become gatekeeping, religious leaders blocking access to God). Jesus consistently challenged exclusionary practices that contradicted God's welcoming character.",
    modernFraming:
      "It's the clique that closes ranks, the church that only welcomes people who look and think like them, the system that was built for some people and not others. Jesus flipped tables over it — literally.",
    relatedThemes: JSON.stringify([
      "inclusion",
      "outsider",
      "injustice",
      "hypocrisy",
      "kingdom-reversal",
    ]),
    sourceTier: "ai_assisted",
  },

  // ── God and Humanity ────────────────────────────────────────────
  {
    id: "god-and-humanity",
    name: "God and Humanity",
    category: "relationship",
    parentThemeId: null,
    definition:
      "The Bible's central story is the relationship between God and human beings — created in God's image, estranged by sin, pursued by grace, and invited into restored intimacy. It's a love story, a court drama, a family saga, and a rescue mission all at once.",
    modernFraming:
      "It's the longest-running relationship in history — and it reads less like a theological textbook and more like a messy, honest journal of two parties who can't quit each other.",
    relatedThemes: JSON.stringify([
      "intimacy-with-god",
      "covenant",
      "prayer",
      "sin",
      "salvation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "intimacy-with-god",
    name: "Intimacy with God",
    category: "relationship",
    parentThemeId: "god-and-humanity",
    definition:
      "From walking with Adam in the garden to indwelling believers through the Spirit, God pursues closeness — not distant reverence alone but genuine knowing and being known. The Psalms model this with stunning emotional range: praise, rage, longing, gratitude, and desperate need.",
    modernFraming:
      "It's the difference between knowing about someone and knowing them — the shift from 'God is great' to 'God, where are you? I need you right now.'",
    relatedThemes: JSON.stringify([
      "prayer",
      "worship",
      "indwelling",
      "love",
      "hearing-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "distance-from-god",
    name: "Distance from God",
    category: "relationship",
    parentThemeId: "god-and-humanity",
    definition:
      "The experience of God's absence runs throughout Scripture — from Adam hiding in the garden to Israel's exile to Jesus' cry of dereliction on the cross. Sometimes it results from human sin; sometimes it remains unexplained. The Psalms give language to this ache without cheap resolution.",
    modernFraming:
      "It's the spiritual dry season where prayer feels like talking to the ceiling and the faith that used to feel alive just... doesn't. The Bible doesn't pretend it won't happen — it gives you words for when it does.",
    relatedThemes: JSON.stringify([
      "silence-of-god",
      "exile",
      "lament",
      "sin",
      "loneliness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wrestling-with-god",
    name: "Wrestling with God",
    category: "relationship",
    parentThemeId: "god-and-humanity",
    definition:
      "Jacob literally wrestled God and walked away with a limp and a new name. This story legitimizes the struggle — honest faith isn't passive acceptance but active engagement, questioning, arguing, and refusing to let go until blessing comes. Job, Jeremiah, and the psalmists all do it.",
    modernFraming:
      "It's the 3 a.m. prayer that sounds more like an argument than worship — 'Why did you let this happen?' is a prayer too, and God doesn't seem to mind the honesty.",
    relatedThemes: JSON.stringify([
      "doubt",
      "faith",
      "lament",
      "prayer",
      "mystery-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "hearing-god",
    name: "Hearing God",
    category: "relationship",
    parentThemeId: "god-and-humanity",
    definition:
      "God speaks in Scripture through burning bushes, still small voices, prophets, dreams, Scripture itself, and ultimately through Jesus — 'the Word made flesh.' Learning to hear God is less about waiting for an audible voice and more about cultivating attentiveness through prayer, community, and Scripture.",
    modernFraming:
      "It's not usually a thundering voice from the sky — it's the persistent nudge you can't shake, the verse that won't leave you alone, the friend who says exactly what you needed to hear without knowing it.",
    relatedThemes: JSON.stringify([
      "prayer",
      "silence-of-god",
      "prophecy",
      "discernment",
      "intimacy-with-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "silence-of-god",
    name: "Silence of God",
    category: "relationship",
    parentThemeId: "god-and-humanity",
    definition:
      "The 400 years between Malachi and Matthew. The book of Esther, where God is never mentioned. The psalmist crying 'How long, O Lord?' Biblical silence isn't evidence of absence — but it's honest about how devastating it can feel. Even Jesus experienced it on the cross.",
    modernFraming:
      "It's praying into what feels like a void and getting nothing back — the unanswered prayer, the miracle that didn't come, the diagnosis that didn't change. The Bible doesn't explain the silence, but it refuses to pretend it doesn't happen.",
    relatedThemes: JSON.stringify([
      "distance-from-god",
      "lament",
      "faith",
      "patience",
      "mystery-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
]
