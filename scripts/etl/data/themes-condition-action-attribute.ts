import type { ThemeRecord } from "./theme-types";

export const themesConditionActionAttribute: ThemeRecord[] = [
  // ============================================================
  // CONDITION CATEGORY (~30 themes)
  // ============================================================

  // --- SUFFERING (parent + 7 children) ---
  {
    id: "suffering",
    name: "Suffering",
    category: "condition",
    parentThemeId: null,
    definition:
      "The broad biblical reality that pain, loss, and hardship are woven into the human story from Genesis 3 onward. Scripture never pretends suffering is easy, but it consistently insists that God is present inside it and can bring meaning out of it.",
    modernFraming:
      "Suffering is the diagnosis you didn't see coming, the layoff email on a Tuesday morning, the grief that rewrites your whole calendar. The Bible doesn't offer a quick fix — it offers company.",
    relatedThemes: JSON.stringify([
      "theodicy",
      "redemptive-suffering",
      "faithfulness-of-god",
      "presence-of-god",
      "wilderness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "persecution",
    name: "Persecution",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "Targeted hostility directed at people because of their faith or identity within God's people. From Pharaoh's oppression of Israel to the early church's imprisonment, Scripture treats persecution as a recurring cost of faithfulness.",
    modernFraming:
      "Persecution today might mean a Christian journalist jailed for reporting truth, or a teenager mocked relentlessly for refusing to go along with the crowd. It's paying a real social price for what you believe.",
    relatedThemes: JSON.stringify([
      "suffering",
      "oppression",
      "costly-obedience",
      "justice-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "illness",
    name: "Illness",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "Physical sickness and disability appear throughout Scripture — from Naaman's leprosy to the hemorrhaging woman to Paul's thorn in the flesh. The Bible treats illness as a legitimate arena for faith, not a sign of personal failure.",
    modernFraming:
      "Illness is the chronic pain that reshapes your whole identity, the waiting room that becomes your second home. Scripture meets you in that fluorescent-lit hallway, not with platitudes but with presence.",
    relatedThemes: JSON.stringify([
      "suffering",
      "miracles",
      "power-of-god",
      "provision-in-wilderness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "poverty",
    name: "Poverty",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "Material deprivation and economic vulnerability are major biblical concerns. God consistently identifies with the poor, commands care for them in the Law, and in Jesus literally becomes one of them — born in a feeding trough, not a palace.",
    modernFraming:
      "Poverty is choosing between groceries and the electric bill, or watching your kids eat free lunch while classmates unpack organic snack boxes. The Bible says God notices that gap — and he's not neutral about it.",
    relatedThemes: JSON.stringify([
      "suffering",
      "generosity",
      "justice-of-god",
      "oppression",
      "abundance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "oppression",
    name: "Oppression",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "The systemic misuse of power that crushes vulnerable people. Scripture is full of prophetic fury against those who exploit the weak — from Egypt's taskmasters to the corrupt judges Amos denounces. God consistently sides with the oppressed.",
    modernFraming:
      "Oppression is the system that keeps certain zip codes underfunded, the labor practice that treats people as disposable. The prophets would have had a lot to say about predatory lending.",
    relatedThemes: JSON.stringify([
      "suffering",
      "slavery",
      "justice-of-god",
      "liberation",
      "poverty",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "innocent-suffering",
    name: "Innocent Suffering",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "The agonizing reality that sometimes people suffer through no fault of their own. Job is the prime example — a righteous man who loses everything while his friends insist he must have done something wrong. The Bible refuses to let that bad theology stand.",
    modernFraming:
      "Innocent suffering is the child with cancer, the family whose house burns down a week after Christmas. It's the question that makes even devout people whisper 'why?' into the dark.",
    relatedThemes: JSON.stringify([
      "suffering",
      "theodicy",
      "justice-of-god",
      "divine-judgment",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "redemptive-suffering",
    name: "Redemptive Suffering",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "The mysterious biblical claim that suffering can become the raw material for something good — not that it was good in itself, but that God refuses to waste it. Isaiah's Suffering Servant and Jesus's cross are the ultimate examples: the worst thing becomes the best thing.",
    modernFraming:
      "Redemptive suffering is the recovering addict who now sponsors others, the grief that cracks you open enough to finally feel compassion. It doesn't make the pain worth it — but it means the pain isn't the last word.",
    relatedThemes: JSON.stringify([
      "suffering",
      "theodicy",
      "holiness",
      "love-of-god",
      "costly-obedience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "theodicy",
    name: "Theodicy",
    category: "condition",
    parentThemeId: "suffering",
    definition:
      "The ancient struggle to reconcile a good, powerful God with the existence of evil and suffering. The Bible doesn't dodge this question — Job screams it, the psalmists weep it, Habakkuk demands an answer. What Scripture offers isn't a tidy explanation but a relationship.",
    modernFraming:
      "Theodicy is the question you type into a search engine at 2 a.m. after the worst phone call of your life: 'If God is good, why did this happen?' The Bible honors that question more than most churches do.",
    relatedThemes: JSON.stringify([
      "suffering",
      "innocent-suffering",
      "justice-of-god",
      "faithfulness-of-god",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- EXILE (parent + 5 children) ---
  {
    id: "exile",
    name: "Exile",
    category: "condition",
    parentThemeId: null,
    definition:
      "The forced removal from home, land, and the familiar. Biblically, exile is both a historical event — Israel deported to Babylon — and a spiritual metaphor for the human condition of being far from where we belong. It's one of the Bible's most powerful lenses.",
    modernFraming:
      "Exile isn't just Babylon — it's the college freshman 2,000 miles from home who doesn't recognize anything on the menu. It's the immigrant who dreams in one language and lives in another.",
    relatedThemes: JSON.stringify([
      "displacement",
      "homesickness",
      "return-from-exile",
      "faithfulness-of-god",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "displacement",
    name: "Displacement",
    category: "condition",
    parentThemeId: "exile",
    definition:
      "Being uprooted from the place that shaped you. From Abraham leaving Ur to Ruth leaving Moab, the Bible is full of people who had to start over in unfamiliar territory. Displacement is disorienting, but Scripture shows God meeting people in the new, strange place.",
    modernFraming:
      "Displacement is the military family on their fifth move, the refugee learning a new alphabet at forty. It's scrolling through photos of a hometown that's moved on without you.",
    relatedThemes: JSON.stringify([
      "exile",
      "homesickness",
      "diaspora",
      "wandering",
      "new-identity-in-christ",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "homesickness",
    name: "Homesickness",
    category: "condition",
    parentThemeId: "exile",
    definition:
      "The ache for a place or a time you can't return to. Psalm 137 captures it perfectly: 'How can we sing the Lord's song in a foreign land?' It's the grief of distance, the longing for what was familiar and good.",
    modernFraming:
      "Homesickness is the smell of your grandmother's kitchen hitting you in a random grocery store aisle. It's the ache that tells you something about where you actually belong — and maybe about a home you haven't found yet.",
    relatedThemes: JSON.stringify([
      "exile",
      "displacement",
      "spiritual-exile",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "diaspora",
    name: "Diaspora",
    category: "condition",
    parentThemeId: "exile",
    definition:
      "The scattering of God's people across foreign nations. What began as judgment in the Old Testament became, surprisingly, a vehicle for blessing — Jewish communities throughout the Roman Empire provided the network along which the gospel first spread.",
    modernFraming:
      "Diaspora is every immigrant church worshipping in a rented storefront, every cultural community keeping traditions alive thousands of miles from their origin. Scattering isn't just loss — sometimes it's seed-sowing.",
    relatedThemes: JSON.stringify([
      "exile",
      "displacement",
      "mission",
      "chosen-people",
      "ethnicity-and-race",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-exile",
    name: "Spiritual Exile",
    category: "condition",
    parentThemeId: "exile",
    definition:
      "The inner experience of feeling far from God even when you haven't physically moved. The psalmists describe seasons when God seems silent, absent, or hidden. Spiritual exile is a real and recognized part of the faith journey, not a failure.",
    modernFraming:
      "Spiritual exile is sitting in a church service and feeling absolutely nothing. It's the prayer life that used to feel like a conversation and now feels like talking to a ceiling. The mystics called it the 'dark night of the soul' — you might just call it Tuesday.",
    relatedThemes: JSON.stringify([
      "exile",
      "spiritual-dryness",
      "absence-of-god",
      "presence-of-god",
      "wandering",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "return-from-exile",
    name: "Return from Exile",
    category: "condition",
    parentThemeId: "exile",
    definition:
      "The hopeful biblical arc that exile is never the end of the story. God promises — and delivers — restoration. Ezra and Nehemiah narrate Israel's physical return; the New Testament frames salvation itself as a homecoming from spiritual exile.",
    modernFraming:
      "Return from exile is the moment you walk back into a community after years away and someone says 'we saved your seat.' It's recovery, reconciliation, the long drive home after you finally admit you need help.",
    relatedThemes: JSON.stringify([
      "exile",
      "repentance",
      "faithfulness-of-god",
      "revival",
      "new-identity-in-christ",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- SLAVERY (parent + 4 children) ---
  {
    id: "slavery",
    name: "Slavery",
    category: "condition",
    parentThemeId: null,
    definition:
      "The condition of being owned, controlled, or trapped by a power greater than yourself. Israel's enslavement in Egypt is the defining narrative of the Old Testament — it shapes their laws, their worship, and their identity as a people rescued by God.",
    modernFraming:
      "Slavery in the modern world isn't ancient history — human trafficking is a multi-billion-dollar industry. And the metaphor extends to anything that owns you: addiction, debt, abusive relationships. The Exodus story says God hears people in chains.",
    relatedThemes: JSON.stringify([
      "bondage",
      "liberation",
      "oppression",
      "justice-of-god",
      "freedom",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "bondage",
    name: "Bondage",
    category: "condition",
    parentThemeId: "slavery",
    definition:
      "The state of being held captive — whether by literal chains, systemic injustice, or spiritual forces. Paul describes the whole creation as in 'bondage to decay,' groaning for freedom. Bondage is the Bible's word for being stuck in something you can't escape on your own.",
    modernFraming:
      "Bondage is the addiction you've quit six times, the toxic relationship you keep going back to, the cycle of behavior you swore you'd break. It's knowing exactly what freedom looks like and not being able to reach it.",
    relatedThemes: JSON.stringify([
      "slavery",
      "spiritual-slavery",
      "freedom",
      "liberation",
      "repentance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "freedom",
    name: "Freedom",
    category: "condition",
    parentThemeId: "slavery",
    definition:
      "The state of being released from whatever held you captive. Biblical freedom isn't just the absence of chains — it's freedom for something: to worship, to love, to live as God intended. Paul warns the Galatians not to trade their new freedom for a different kind of slavery.",
    modernFraming:
      "Freedom is the first morning you wake up and the old habit doesn't have its hooks in you. It's the moment you realize the opinion that used to control you doesn't anymore. It's terrifying and exhilarating in equal measure.",
    relatedThemes: JSON.stringify([
      "slavery",
      "liberation",
      "bondage",
      "new-identity-in-christ",
      "spiritual-rest",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "liberation",
    name: "Liberation",
    category: "condition",
    parentThemeId: "slavery",
    definition:
      "The active process of being set free — not just a status change but a dramatic rescue. The Exodus is the ultimate liberation story: God sees suffering, hears cries, and acts with power. Liberation in Scripture is always God's initiative, never earned.",
    modernFraming:
      "Liberation is the court ruling that overturns a wrongful conviction, the intervention that finally breaks through, the moment someone extends a hand and says 'you don't have to live like this anymore.'",
    relatedThemes: JSON.stringify([
      "slavery",
      "freedom",
      "power-of-god",
      "justice-of-god",
      "oppression",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-slavery",
    name: "Spiritual Slavery",
    category: "condition",
    parentThemeId: "slavery",
    definition:
      "The New Testament extends the slavery metaphor inward: sin itself is a slave-master. Jesus tells the Pharisees 'everyone who sins is a slave to sin,' and Paul describes the internal war of doing what you hate. Spiritual slavery is the universal human condition apart from grace.",
    modernFraming:
      "Spiritual slavery is the voice in your head that says you'll never change, the pattern you've inherited from your parents that you swore you'd break. It's the prison you built yourself, one compromise at a time.",
    relatedThemes: JSON.stringify([
      "slavery",
      "bondage",
      "repentance",
      "freedom",
      "redemptive-suffering",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- WILDERNESS (parent + 4 children) ---
  {
    id: "wilderness",
    name: "Wilderness",
    category: "condition",
    parentThemeId: null,
    definition:
      "The in-between space — geographically barren, spiritually disorienting, but surprisingly formative. Israel spent forty years there. Jesus spent forty days. The wilderness is where illusions die and dependence on God becomes non-negotiable.",
    modernFraming:
      "Wilderness is the gap year that turned into a gap decade, the career transition where nothing makes sense yet. It's the season when your old answers stopped working but the new ones haven't arrived.",
    relatedThemes: JSON.stringify([
      "testing",
      "spiritual-dryness",
      "provision-in-wilderness",
      "wandering",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "testing",
    name: "Testing",
    category: "condition",
    parentThemeId: "wilderness",
    definition:
      "God's purposeful process of revealing what's actually inside a person. Deuteronomy says God led Israel through the wilderness to 'test you, to know what was in your heart.' Testing isn't punishment — it's exposure, like stress-testing a bridge before traffic crosses it.",
    modernFraming:
      "Testing is the crisis that shows you what you're really made of — the friend who needs money you can't spare, the shortcut nobody would notice. Character isn't built in the test; it's revealed there.",
    relatedThemes: JSON.stringify([
      "wilderness",
      "obedience",
      "faithfulness-of-god",
      "radical-obedience",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-dryness",
    name: "Spiritual Dryness",
    category: "condition",
    parentThemeId: "wilderness",
    definition:
      "The experience of spiritual desolation — when prayer feels hollow, worship feels performative, and God seems distant. The psalmist cries 'my soul thirsts for you in a dry and weary land.' It's a recognized biblical season, not a disqualification.",
    modernFraming:
      "Spiritual dryness is going through the motions at church while feeling absolutely empty inside. It's the devotional app streak you're keeping but getting nothing from. Sometimes the dry season is where the deepest roots grow.",
    relatedThemes: JSON.stringify([
      "wilderness",
      "spiritual-exile",
      "absence-of-god",
      "sabbath-rest",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wandering",
    name: "Wandering",
    category: "condition",
    parentThemeId: "wilderness",
    definition:
      "Movement without clear direction — sometimes as consequence of disobedience, sometimes as part of God's longer plan. Israel wandered for forty years because of unbelief, but Abraham wandered toward a promise he couldn't see yet. Context matters.",
    modernFraming:
      "Wandering is switching majors for the third time, swiping through job listings at midnight, or driving with no destination because you can't face going home yet. Sometimes wandering is lostness; sometimes it's searching.",
    relatedThemes: JSON.stringify([
      "wilderness",
      "exile",
      "calling",
      "spiritual-dryness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "provision-in-wilderness",
    name: "Provision in Wilderness",
    category: "condition",
    parentThemeId: "wilderness",
    definition:
      "God's surprising habit of providing exactly what's needed in the place where nothing grows. Manna in the desert, water from rock, ravens feeding Elijah — the wilderness is where God's provision becomes most visible precisely because human resources run out.",
    modernFraming:
      "Provision in the wilderness is the unexpected check in the mail the week rent is due, the stranger who shows up with exactly the right word. It's God's supply chain working through back channels you never would have planned.",
    relatedThemes: JSON.stringify([
      "wilderness",
      "faithfulness-of-god",
      "abundance",
      "generosity",
      "miracles",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- ABUNDANCE (parent + 4 children) ---
  {
    id: "abundance",
    name: "Abundance",
    category: "condition",
    parentThemeId: null,
    definition:
      "The experience of having more than enough — a condition the Bible celebrates but also warns about. From the Promised Land 'flowing with milk and honey' to Jesus's miracle of overflowing wine at Cana, God is generous. But abundance can also become a spiritual hazard when it replaces dependence on God.",
    modernFraming:
      "Abundance is the full fridge, the savings account with margin, the season when things are actually going well. The Bible's question isn't whether you'll ever have enough — it's what happens to your soul when you do.",
    relatedThemes: JSON.stringify([
      "blessing",
      "prosperity",
      "generosity",
      "provision-in-wilderness",
      "feast",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "blessing",
    name: "Blessing",
    category: "condition",
    parentThemeId: "abundance",
    definition:
      "God's active favor poured into someone's life — not just material wealth, but flourishing in the fullest sense. The Abrahamic covenant is a blessing that's meant to flow through Israel to 'all the families of the earth.' Biblical blessing is never meant to be hoarded.",
    modernFraming:
      "Blessing is the mentor who changes your trajectory, the marriage that actually works, the talent that opens doors. The biblical question is always: who else is this for?",
    relatedThemes: JSON.stringify([
      "abundance",
      "prosperity",
      "faithfulness-of-god",
      "generosity",
      "chosen-people",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "prosperity",
    name: "Prosperity",
    category: "condition",
    parentThemeId: "abundance",
    definition:
      "Material and relational thriving. The Old Testament often connects prosperity to covenant faithfulness, but the book of Job and the psalms of lament complicate that equation. Prosperity is a gift, not a guarantee — and never a measure of someone's spiritual worth.",
    modernFraming:
      "Prosperity is the career that's finally clicking, the business that's growing. Scripture celebrates it but refuses to let you build your identity on it, because markets crash and seasons change.",
    relatedThemes: JSON.stringify([
      "abundance",
      "blessing",
      "wealth",
      "poverty",
      "theodicy",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wealth",
    name: "Wealth",
    category: "condition",
    parentThemeId: "abundance",
    definition:
      "The accumulation of material resources. Scripture doesn't condemn wealth itself — Abraham, David, and Joseph of Arimathea were all wealthy — but it issues stark warnings about its spiritual dangers. Jesus said it's easier for a camel to go through the eye of a needle than for a rich person to enter God's kingdom.",
    modernFraming:
      "Wealth is the portfolio, the property, the lifestyle upgrade. Jesus isn't anti-money — he's anti-anything-that-sits-on-the-throne-of-your-heart. The question isn't how much you have but how tightly you're gripping it.",
    relatedThemes: JSON.stringify([
      "abundance",
      "generosity",
      "poverty",
      "sacrifice-of-possessions",
      "tithing",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "feast",
    name: "Feast",
    category: "condition",
    parentThemeId: "abundance",
    definition:
      "The communal celebration of God's provision and faithfulness. Israel's calendar was built around feasts — Passover, Tabernacles, Weeks — each one a sensory reminder that God had come through. Jesus's first miracle was keeping a party going, and his kingdom is described as a banquet.",
    modernFraming:
      "Feast is Thanksgiving dinner with the whole family, the block party where everyone brings a dish, the celebration that says 'we made it through.' God apparently loves a good table — and he always sets extra places.",
    relatedThemes: JSON.stringify([
      "abundance",
      "blessing",
      "sabbath-rest",
      "presence-of-god",
      "generosity",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- IDENTITY (parent + 5 children) ---
  {
    id: "identity",
    name: "Identity",
    category: "condition",
    parentThemeId: null,
    definition:
      "The fundamental question of who you are — and whose you are. Scripture consistently roots identity not in achievement, ethnicity, or social status, but in relationship with God. From 'you are my beloved son' at Jesus's baptism to 'you are a chosen people' in 1 Peter, God defines his people before they perform.",
    modernFraming:
      "Identity is what you write in your Instagram bio, but it's also what you whisper to yourself at 3 a.m. The Bible says you are named and known before you ever accomplish a thing.",
    relatedThemes: JSON.stringify([
      "chosen-people",
      "new-identity-in-christ",
      "name-and-naming",
      "adoption",
      "calling",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "chosen-people",
    name: "Chosen People",
    category: "condition",
    parentThemeId: "identity",
    definition:
      "God's sovereign decision to select a particular people — not because they were the biggest, strongest, or most deserving, but simply because he loved them. Election in Scripture is always for service, never for privilege alone. Israel was chosen to bless the nations, not to hoard blessing.",
    modernFraming:
      "Being chosen isn't about being the teacher's pet — it's about being handed a job. If God picked you, it's because there's something he wants to do through you for someone else.",
    relatedThemes: JSON.stringify([
      "identity",
      "calling",
      "mission",
      "faithfulness-of-god",
      "blessing",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "adoption",
    name: "Adoption",
    category: "condition",
    parentThemeId: "identity",
    definition:
      "The New Testament metaphor for how believers enter God's family — not by birthright but by grace. Paul uses Roman adoption law to make the point: adopted children had the full legal rights of biological heirs. You're not a second-class member of God's household.",
    modernFraming:
      "Adoption is the legal paper that says 'you belong here now, fully, no asterisk.' It's God looking at your mess of a resume and saying 'I'm not hiring you — I'm bringing you home.'",
    relatedThemes: JSON.stringify([
      "identity",
      "new-identity-in-christ",
      "father-love",
      "love-of-god",
      "chosen-people",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "new-identity-in-christ",
    name: "New Identity in Christ",
    category: "condition",
    parentThemeId: "identity",
    definition:
      "Paul's radical claim that union with Christ creates an entirely new self. 'If anyone is in Christ, the new creation has come.' The old labels — Jew or Gentile, slave or free — don't define you anymore. Your deepest identity is now 'in Christ,' which nothing can revoke.",
    modernFraming:
      "New identity in Christ is the moment you stop introducing yourself by your worst failure or your best achievement. It's realizing your identity isn't something you build — it's something you receive.",
    relatedThemes: JSON.stringify([
      "identity",
      "adoption",
      "freedom",
      "repentance",
      "name-and-naming",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "name-and-naming",
    name: "Name and Naming",
    category: "condition",
    parentThemeId: "identity",
    definition:
      "In biblical culture, names carry destiny. God renames Abram to Abraham, Jacob to Israel, Simon to Peter — each renaming marks a new chapter. To know someone's name is to know their character; for God to give a new name is to rewrite a story.",
    modernFraming:
      "Name and naming is the nickname that stuck, the diagnosis that tried to become your identity, the label you've been fighting to outgrow. God's in the business of giving new names — and his names tend to be better than the ones the world assigns.",
    relatedThemes: JSON.stringify([
      "identity",
      "new-identity-in-christ",
      "calling",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "ethnicity-and-race",
    name: "Ethnicity and Race",
    category: "condition",
    parentThemeId: "identity",
    definition:
      "Scripture affirms ethnic diversity as part of God's creative design — the 'table of nations' in Genesis 10, the multilingual miracle at Pentecost, and Revelation's vision of 'every nation, tribe, people and language' worshipping together. Ethnic identity is celebrated, never erased, in God's kingdom.",
    modernFraming:
      "Ethnicity and race is the conversation the church has been having — and avoiding — for centuries. The Bible's vision isn't colorblindness; it's a table so big and so diverse that every culture's dish is on it.",
    relatedThemes: JSON.stringify([
      "identity",
      "chosen-people",
      "diaspora",
      "justice-of-god",
      "oppression",
    ]),
    sourceTier: "ai_assisted",
  },

  // ============================================================
  // ACTION CATEGORY (~20 themes)
  // ============================================================

  // --- CALLING (parent + 5 children) ---
  {
    id: "calling",
    name: "Calling",
    category: "action",
    parentThemeId: null,
    definition:
      "God's initiative in summoning people to particular purposes. From 'Abraham, go' to 'Samuel, Samuel' to 'Follow me,' calling in Scripture is always God's move first. It's less about finding your passion and more about being found by a Person with a plan.",
    modernFraming:
      "Calling isn't the motivational poster about following your dreams — it's the unsettling sense that you're supposed to do something specific, even when your LinkedIn profile isn't ready for it.",
    relatedThemes: JSON.stringify([
      "vocation",
      "mission",
      "answering-the-call",
      "reluctant-prophet",
      "identity",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "vocation",
    name: "Vocation",
    category: "action",
    parentThemeId: "calling",
    definition:
      "The broader sense that all legitimate work — not just 'ministry' — is a response to God's calling. The Reformation recovered this idea: the cobbler's bench is as sacred as the pulpit. Every honest occupation can be an act of worship and service to neighbor.",
    modernFraming:
      "Vocation is realizing that your spreadsheet, your classroom, your operating room, or your kitchen is holy ground. It's not about quitting your job to become a pastor — it's about seeing your job as the pastor sees theirs.",
    relatedThemes: JSON.stringify([
      "calling",
      "mission",
      "obedience",
      "sabbath-rest",
      "identity",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "mission",
    name: "Mission",
    category: "action",
    parentThemeId: "calling",
    definition:
      "The outward thrust of God's people into the world with a specific purpose. The Bible isn't about God rescuing people out of the world — it's about God sending rescued people back into it. Mission is the Great Commission, but it's also Jeremiah telling exiles to seek the welfare of their city.",
    modernFraming:
      "Mission isn't just overseas trips with matching t-shirts — it's the way you show up in your neighborhood, your office, your school. Wherever you are, you've been sent there on purpose.",
    relatedThemes: JSON.stringify([
      "calling",
      "commission",
      "diaspora",
      "generosity",
      "love-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "commission",
    name: "Commission",
    category: "action",
    parentThemeId: "calling",
    definition:
      "A specific mandate given by God or by Jesus to accomplish a task. The Great Commission in Matthew 28 is the most famous, but commissions thread throughout Scripture — Moses at the burning bush, Isaiah in the temple, Paul on the Damascus road. A commission carries authority.",
    modernFraming:
      "Commission is the difference between volunteering and being deployed. It's not 'I thought this might be fun' — it's 'I've been authorized and sent.' That changes how you handle opposition.",
    relatedThemes: JSON.stringify([
      "calling",
      "mission",
      "obedience",
      "answering-the-call",
      "power-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "reluctant-prophet",
    name: "Reluctant Prophet",
    category: "action",
    parentThemeId: "calling",
    definition:
      "The biblical pattern of people who resist God's call — Moses with his speech impediment excuses, Jonah literally running the opposite direction, Jeremiah protesting he's too young. God seems to have a preference for people who don't think they're ready.",
    modernFraming:
      "The reluctant prophet is the introvert asked to lead, the person who knows they should speak up but really doesn't want to. If your first response to God's nudge is 'please pick someone else,' you're in excellent biblical company.",
    relatedThemes: JSON.stringify([
      "calling",
      "answering-the-call",
      "obedience",
      "weakness-and-power",
      "testing",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "answering-the-call",
    name: "Answering the Call",
    category: "action",
    parentThemeId: "calling",
    definition:
      "The moment of saying yes to God — sometimes bold and immediate like Isaiah's 'Here I am, send me,' sometimes slow and grudging like Jonah's eventual compliance. Answering the call rarely means you feel ready; it means you go anyway.",
    modernFraming:
      "Answering the call is the deep breath before you hit 'submit' on the application, make the phone call you've been avoiding, or walk into the room where you know you'll be uncomfortable. It's obedience before confidence arrives.",
    relatedThemes: JSON.stringify([
      "calling",
      "reluctant-prophet",
      "obedience",
      "radical-obedience",
      "commission",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- REPENTANCE (parent + 4 children) ---
  {
    id: "repentance",
    name: "Repentance",
    category: "action",
    parentThemeId: null,
    definition:
      "A complete change of direction — the Hebrew word literally means 'to turn.' Repentance in the Bible is not just feeling bad; it's a decisive pivot from one path to another. John the Baptist, Jesus, and Peter all begin their public message with the same word: 'Repent.'",
    modernFraming:
      "Repentance isn't just guilt or shame — it's the U-turn. It's deleting the app, making the apology, changing the pattern. Feeling sorry is the on-ramp; repentance is the actual exit.",
    relatedThemes: JSON.stringify([
      "confession",
      "turning-back",
      "revival",
      "faithfulness-of-god",
      "new-identity-in-christ",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "confession",
    name: "Confession",
    category: "action",
    parentThemeId: "repentance",
    definition:
      "The act of speaking truth about yourself — naming your sin, your failure, your need. Psalm 32 describes the physical relief of finally confessing after trying to hide. Confession in Scripture is never about informing God of something he doesn't know; it's about agreeing with what he already sees.",
    modernFraming:
      "Confession is the hardest conversation you'll ever start: 'I was wrong.' It's the AA meeting, the therapist's office, the text that says 'I need to tell you something.' Honesty is the beginning of freedom.",
    relatedThemes: JSON.stringify([
      "repentance",
      "contrition",
      "freedom",
      "holiness",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "turning-back",
    name: "Turning Back",
    category: "action",
    parentThemeId: "repentance",
    definition:
      "The prophets' constant plea: return to God. Hosea, Joel, Malachi — they all beg Israel to turn back before it's too late. Turning back implies you were once headed the right direction, which makes it an act of memory as much as decision.",
    modernFraming:
      "Turning back is re-enrolling in the program you dropped out of, calling the friend you ghosted, opening the Bible you haven't touched in two years. It's the humility to admit the detour was a mistake.",
    relatedThemes: JSON.stringify([
      "repentance",
      "return-from-exile",
      "faithfulness-of-god",
      "pursuing-love",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "revival",
    name: "Revival",
    category: "action",
    parentThemeId: "repentance",
    definition:
      "A collective awakening — when an entire community turns back to God at once. Josiah's rediscovery of the Law, Ezra's public reading of Scripture, Pentecost — these are moments when the spiritual temperature of a whole group shifts dramatically.",
    modernFraming:
      "Revival isn't just an emotional church service — it's a neighborhood that starts looking out for each other, a campus where honesty replaces posturing, a family that finally breaks the cycle. It's contagious repentance.",
    relatedThemes: JSON.stringify([
      "repentance",
      "turning-back",
      "presence-of-god",
      "power-of-god",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "contrition",
    name: "Contrition",
    category: "action",
    parentThemeId: "repentance",
    definition:
      "Deep, genuine sorrow over sin — not because you got caught, but because you understand what you've broken. Psalm 51 is the classic text: 'a broken and contrite heart, O God, you will not despise.' Contrition is the emotional truthfulness that makes repentance real rather than performative.",
    modernFraming:
      "Contrition is the tears that come when you finally see the hurt you caused through the other person's eyes. It's not self-pity — it's grief that your choices mattered and you chose wrong.",
    relatedThemes: JSON.stringify([
      "repentance",
      "confession",
      "holiness",
      "love-of-god",
      "steadfast-love",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- OBEDIENCE (parent + 3 children) ---
  {
    id: "obedience",
    name: "Obedience",
    category: "action",
    parentThemeId: null,
    definition:
      "Doing what God says — which in Scripture is presented not as robotic compliance but as the natural response of love and trust. Jesus connects obedience directly to love: 'If you love me, you will keep my commandments.' Obedience is the shape love takes when it gets specific.",
    modernFraming:
      "Obedience isn't blind rule-following — it's trusting the surgeon enough to hold still during the operation. It's doing the hard thing because you trust the one who asked you to do it.",
    relatedThemes: JSON.stringify([
      "radical-obedience",
      "costly-obedience",
      "calling",
      "faithfulness-of-god",
      "testing",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "radical-obedience",
    name: "Radical Obedience",
    category: "action",
    parentThemeId: "obedience",
    definition:
      "Obedience that goes beyond the reasonable and into the scandalous. Abraham offering Isaac, Hosea marrying Gomer, Jesus washing feet — these acts make no sense by conventional logic. Radical obedience is when God's instructions violate your spreadsheet.",
    modernFraming:
      "Radical obedience is quitting the lucrative job because you know you're supposed to, forgiving the person everyone agrees you shouldn't have to forgive, giving away the thing you wanted most. It looks foolish from the outside.",
    relatedThemes: JSON.stringify([
      "obedience",
      "costly-obedience",
      "answering-the-call",
      "sacrifice-of-possessions",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "costly-obedience",
    name: "Costly Obedience",
    category: "action",
    parentThemeId: "obedience",
    definition:
      "Faithfulness that comes with a price tag. Daniel in the lion's den, Shadrach in the furnace, Jesus in Gethsemane — they all counted the cost and obeyed anyway. Costly obedience acknowledges that doing the right thing sometimes costs you everything the world values.",
    modernFraming:
      "Costly obedience is the whistleblower who loses their career for telling the truth, the parent who makes the unpopular boundary for their kid's sake. It's obedience with a receipt — and the amount is real.",
    relatedThemes: JSON.stringify([
      "obedience",
      "persecution",
      "suffering",
      "radical-obedience",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "obedience-vs-sacrifice",
    name: "Obedience vs. Sacrifice",
    category: "action",
    parentThemeId: "obedience",
    definition:
      "Samuel's famous declaration to Saul: 'To obey is better than sacrifice.' The prophets consistently hammer this point — God isn't impressed by religious performance that substitutes for actual obedience. You can't buy God off with offerings while ignoring what he actually asked for.",
    modernFraming:
      "Obedience vs. sacrifice is volunteering at church every weekend while refusing to apologize to your spouse. It's the religious activity that keeps you too busy to do the simple, hard thing God actually wants.",
    relatedThemes: JSON.stringify([
      "obedience",
      "holiness",
      "repentance",
      "justice-of-god",
      "confession",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- GENEROSITY (parent + 4 children) ---
  {
    id: "generosity",
    name: "Generosity",
    category: "action",
    parentThemeId: null,
    definition:
      "The open-handed posture that mirrors God's own character. Scripture consistently presents generosity not as optional niceness but as evidence that grace has actually taken root in a person. The early church shared everything; Paul says God loves a cheerful giver.",
    modernFraming:
      "Generosity is picking up the check, yes, but it's also giving your time, your attention, your parking spot. It's the posture that says 'I have enough — what do you need?'",
    relatedThemes: JSON.stringify([
      "giving",
      "tithing",
      "sacrifice-of-possessions",
      "abundance",
      "love-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "giving",
    name: "Giving",
    category: "action",
    parentThemeId: "generosity",
    definition:
      "The concrete act of releasing what you have for someone else's benefit. Jesus highlights the widow's two coins as the greatest gift in the temple — not because of the amount, but because of the proportion. Biblical giving is measured by what it costs the giver, not what it provides the receiver.",
    modernFraming:
      "Giving is the anonymous Venmo to a friend who's struggling, the hours spent tutoring someone else's kid, the skill you offer for free because someone needs it. What you release reveals what you trust.",
    relatedThemes: JSON.stringify([
      "generosity",
      "tithing",
      "sacrifice-of-possessions",
      "sharing",
      "love-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "tithing",
    name: "Tithing",
    category: "action",
    parentThemeId: "generosity",
    definition:
      "The practice of giving a portion — traditionally a tenth — of one's income or produce to God. Rooted in the Mosaic Law and practiced by Abraham before the Law existed, tithing is both a practical support for worship and a tangible declaration that everything belongs to God.",
    modernFraming:
      "Tithing is the auto-transfer on the first of the month that says 'this isn't all mine.' Whether you land on ten percent or some other number, the point is regular, intentional, first-fruits giving — not tips from the leftovers.",
    relatedThemes: JSON.stringify([
      "generosity",
      "giving",
      "obedience",
      "abundance",
      "wealth",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sharing",
    name: "Sharing",
    category: "action",
    parentThemeId: "generosity",
    definition:
      "The early church model of holding possessions with open hands. Acts describes believers selling property and distributing to anyone in need — not as forced communism but as the spontaneous overflow of a community gripped by grace. Sharing is generosity made communal.",
    modernFraming:
      "Sharing is the neighbor who lends the lawn mower without being asked, the carpool that saves a single mom an hour every day, the family that opens their guest room to someone between apartments. It's generosity with a house key.",
    relatedThemes: JSON.stringify([
      "generosity",
      "giving",
      "feast",
      "love-of-god",
      "abundance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sacrifice-of-possessions",
    name: "Sacrifice of Possessions",
    category: "action",
    parentThemeId: "generosity",
    definition:
      "Voluntarily giving up material goods for a greater purpose. From the rich young ruler's test to Zacchaeus's spontaneous restitution, Jesus consistently uses possessions as the litmus test for where the heart actually is. Sacrifice of possessions is where theology meets the wallet.",
    modernFraming:
      "Sacrifice of possessions is downsizing so you can fund someone else's education, selling the second car to support a cause, choosing the smaller house because the margin matters more. It's letting go of stuff so you can hold onto what matters.",
    relatedThemes: JSON.stringify([
      "generosity",
      "radical-obedience",
      "wealth",
      "poverty",
      "costly-obedience",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- REST (parent + 4 children) ---
  {
    id: "rest",
    name: "Rest",
    category: "action",
    parentThemeId: null,
    definition:
      "The deliberate cessation of work as an act of trust and worship. God rested on the seventh day — not because he was tired, but to establish a rhythm. Rest in Scripture is both gift and command: a refusal to believe the world depends entirely on your effort.",
    modernFraming:
      "Rest is the most countercultural thing you can do in a productivity-obsessed society. It's putting the phone down, closing the laptop, and trusting that the world won't end if you take a nap.",
    relatedThemes: JSON.stringify([
      "sabbath-rest",
      "spiritual-rest",
      "peace",
      "provision-in-wilderness",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sabbath-rest",
    name: "Sabbath Rest",
    category: "action",
    parentThemeId: "rest",
    definition:
      "The weekly rhythm of stopping that God built into creation and encoded in the Ten Commandments. Sabbath isn't just a day off — it's a protest against the lie that your worth is determined by your output. It's built into the operating system of reality.",
    modernFraming:
      "Sabbath rest is the weekly practice of proving you're not God. It's letting the inbox sit, the project wait, the hustle pause — and discovering that you're still loved when you're not producing.",
    relatedThemes: JSON.stringify([
      "rest",
      "spiritual-rest",
      "obedience",
      "feast",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "spiritual-rest",
    name: "Spiritual Rest",
    category: "action",
    parentThemeId: "rest",
    definition:
      "The inner peace that comes from trusting God's finished work rather than your own striving. Hebrews describes a 'rest' that remains for God's people — not a hammock but a settled confidence that God has handled what you couldn't. It's the exhale after years of holding your breath.",
    modernFraming:
      "Spiritual rest is finally stopping the performance, the people-pleasing, the spiritual resume-building. It's the moment you realize God isn't grading you — he's already given you an A you didn't earn.",
    relatedThemes: JSON.stringify([
      "rest",
      "sabbath-rest",
      "peace",
      "freedom",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "cessation",
    name: "Cessation",
    category: "action",
    parentThemeId: "rest",
    definition:
      "The act of stopping — not because the work is done, but because God says it's time. The Sabbath principle extends beyond weekly rest to sabbatical years, the Year of Jubilee, and the eschatological rest promised in Revelation. Cessation is the discipline of unfinished business left in God's hands.",
    modernFraming:
      "Cessation is leaving the office at 5 even though the to-do list isn't done, stepping back from a ministry that's consuming you, or simply putting down the need to fix everything. Sometimes the most faithful thing you can do is stop.",
    relatedThemes: JSON.stringify([
      "rest",
      "sabbath-rest",
      "obedience",
      "provision-in-wilderness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "peace",
    name: "Peace",
    category: "action",
    parentThemeId: "rest",
    definition:
      "The Hebrew word shalom means not just the absence of conflict but the presence of wholeness — everything in its right place, flourishing as God intended. Peace in Scripture is both a gift to receive and a mission to pursue. Jesus calls peacemakers 'children of God.'",
    modernFraming:
      "Peace isn't just quiet — it's the deep sense that things are being made right. It's the neighborhood where everyone has enough, the relationship where honesty has replaced eggshells, the soul that has stopped running.",
    relatedThemes: JSON.stringify([
      "rest",
      "spiritual-rest",
      "justice-of-god",
      "presence-of-god",
      "reconciliation",
    ]),
    sourceTier: "ai_assisted",
  },

  // ============================================================
  // ATTRIBUTE-OF-GOD CATEGORY (~25 themes)
  // ============================================================

  // --- HOLINESS (parent + 4 children) ---
  {
    id: "holiness",
    name: "Holiness",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "God's absolute otherness — the quality that makes the seraphim cover their faces and Moses remove his sandals. Holiness is not primarily a moral category but an ontological one: God is in a category entirely by himself. Everything else follows from that.",
    modernFraming:
      "Holiness is the reason you instinctively lower your voice in a cathedral or feel small under a star-filled sky. It's the sense that you're in the presence of something so much bigger than you that your categories break.",
    relatedThemes: JSON.stringify([
      "transcendence",
      "otherness-of-god",
      "sacred-space",
      "presence-of-god",
      "glory-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "transcendence",
    name: "Transcendence",
    category: "attribute-of-god",
    parentThemeId: "holiness",
    definition:
      "God's absolute beyondness — he is not a bigger version of us but fundamentally other. Isaiah captures it: 'My thoughts are not your thoughts, neither are your ways my ways.' Transcendence means God can never be fully domesticated by our theologies or contained by our categories.",
    modernFraming:
      "Transcendence is the uncomfortable reminder that God doesn't fit in your theological box, your political party, or your vision board. He's not your life coach — he's the ground of all reality.",
    relatedThemes: JSON.stringify([
      "holiness",
      "otherness-of-god",
      "glory-of-god",
      "immanence",
      "power-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "otherness-of-god",
    name: "Otherness of God",
    category: "attribute-of-god",
    parentThemeId: "holiness",
    definition:
      "The quality that prevents God from being reduced to a projection of human desires or values. God's otherness is what makes worship possible — you can't worship something that's just like you. It's also what makes God trustworthy: his perspective isn't limited by yours.",
    modernFraming:
      "The otherness of God is the reason your five-year plan doesn't account for what God is actually doing. It's the frustration — and the relief — of discovering that God's agenda isn't identical to yours.",
    relatedThemes: JSON.stringify([
      "holiness",
      "transcendence",
      "glory-of-god",
      "theodicy",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "sacred-space",
    name: "Sacred Space",
    category: "attribute-of-god",
    parentThemeId: "holiness",
    definition:
      "Places set apart because God's presence inhabits them — the tabernacle, the temple, the burning bush. Scripture shows a progression: from specific holy places to Jesus as the temple to believers themselves as sacred space. The geography of holiness keeps expanding.",
    modernFraming:
      "Sacred space is the corner of your apartment where you pray, the trail where you always hear God clearly, the dinner table where real conversation happens. Holiness isn't confined to buildings with steeples.",
    relatedThemes: JSON.stringify([
      "holiness",
      "holy-ground",
      "temple-as-dwelling",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "holy-ground",
    name: "Holy Ground",
    category: "attribute-of-god",
    parentThemeId: "holiness",
    definition:
      "The specific biblical image of a place made sacred by God's presence. 'Take off your sandals, for the place where you are standing is holy ground' — God says this to Moses at the bush, but the principle keeps recurring. Any ground where God shows up becomes holy ground.",
    modernFraming:
      "Holy ground is the hospital room where you felt God show up at 3 a.m., the park bench where the hard conversation finally happened, the kitchen floor where you hit your knees. It's ordinary geography made sacred by encounter.",
    relatedThemes: JSON.stringify([
      "holiness",
      "sacred-space",
      "presence-of-god",
      "immanence",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- FAITHFULNESS OF GOD (parent + 3 children) ---
  {
    id: "faithfulness-of-god",
    name: "Faithfulness of God",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "God's unwavering reliability — he does what he says and finishes what he starts. Lamentations 3 declares 'great is your faithfulness' in the middle of national catastrophe. God's faithfulness isn't dependent on human performance; it's rooted in his character.",
    modernFraming:
      "Faithfulness of God is the promise that holds when everything else falls apart. It's the reason people who've lost everything can still sing — not because they're in denial, but because they've seen God come through before.",
    relatedThemes: JSON.stringify([
      "steadfast-love",
      "covenant-keeping",
      "reliability-of-god",
      "suffering",
      "provision-in-wilderness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "steadfast-love",
    name: "Steadfast Love",
    category: "attribute-of-god",
    parentThemeId: "faithfulness-of-god",
    definition:
      "The Hebrew word hesed — often translated 'steadfast love,' 'lovingkindness,' or 'covenant loyalty.' It's arguably the most important word in the Old Testament. Hesed is love that has made a commitment and refuses to break it, even when the other party does.",
    modernFraming:
      "Steadfast love is the parent who picks up the phone every time, no matter what the kid has done. It's love that doesn't quit when things get ugly — and God's hesed has survived every ugly thing humanity has thrown at it.",
    relatedThemes: JSON.stringify([
      "faithfulness-of-god",
      "covenant-keeping",
      "love-of-god",
      "unconditional-love",
      "pursuing-love",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "covenant-keeping",
    name: "Covenant Keeping",
    category: "attribute-of-god",
    parentThemeId: "faithfulness-of-god",
    definition:
      "God's perfect track record of honoring his promises. From Noah's rainbow to Abraham's descendants to David's throne, God keeps every covenant — even when Israel breaks theirs. The cross is the ultimate covenant-keeping act: God fulfilling the promise at the cost of his own life.",
    modernFraming:
      "Covenant keeping is the person who shows up even when the relationship is inconvenient. In a world of broken promises and ghosted commitments, God's record is spotless — he has never bailed.",
    relatedThemes: JSON.stringify([
      "faithfulness-of-god",
      "steadfast-love",
      "reliability-of-god",
      "chosen-people",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "reliability-of-god",
    name: "Reliability of God",
    category: "attribute-of-god",
    parentThemeId: "faithfulness-of-god",
    definition:
      "The attribute that makes God safe to lean on with your full weight. Scripture uses images of rock, fortress, and refuge — solid, immovable, dependable. God's reliability isn't occasional; it's structural. You can build your life on it without worrying about the foundation.",
    modernFraming:
      "Reliability of God is the load-bearing wall in the house of your life. Everything else might shift — jobs, relationships, health — but this one holds. The Bible's invitation is to put your weight where the structure actually is.",
    relatedThemes: JSON.stringify([
      "faithfulness-of-god",
      "covenant-keeping",
      "steadfast-love",
      "testing",
      "wilderness",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- POWER OF GOD (parent + 4 children) ---
  {
    id: "power-of-god",
    name: "Power of God",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "God's unlimited capacity to act — displayed in creation, in the Exodus, in the resurrection. Biblical power isn't brute force; it's purposeful, creative, and often surprising. The cross reveals that God's greatest display of power looked like weakness.",
    modernFraming:
      "Power of God isn't the action-movie version of strength — it's the power that makes something out of nothing, raises dead things, and works through the people nobody would have picked. It's the power that doesn't need to prove itself.",
    relatedThemes: JSON.stringify([
      "miracles",
      "creation",
      "divine-intervention",
      "weakness-and-power",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "miracles",
    name: "Miracles",
    category: "attribute-of-god",
    parentThemeId: "power-of-god",
    definition:
      "God's direct intervention in the natural order — signs that point beyond themselves to who God is. Biblical miracles aren't magic tricks; they're revelations of character. The Red Sea parts to show God rescues; the lame walk to show God restores; the dead rise to show death doesn't win.",
    modernFraming:
      "Miracles are the diagnosis that reverses, the addiction that breaks, the impossible situation that somehow resolves. Whether dramatic or quiet, they're the moments that remind you the rules have a Ruler.",
    relatedThemes: JSON.stringify([
      "power-of-god",
      "divine-intervention",
      "illness",
      "provision-in-wilderness",
      "creation",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "creation",
    name: "Creation",
    category: "attribute-of-god",
    parentThemeId: "power-of-god",
    definition:
      "God's foundational act of bringing everything into existence from nothing. Genesis presents creation as the first display of God's power, wisdom, and generosity. Creation isn't finished — God continues to create, sustain, and renew the world he made.",
    modernFraming:
      "Creation is the reason a sunset still stops you in your tracks and a newborn's grip around your finger feels like a miracle. It's the daily evidence that someone with extraordinary taste is running the show.",
    relatedThemes: JSON.stringify([
      "power-of-god",
      "holiness",
      "glory-of-god",
      "abundance",
      "sabbath-rest",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-intervention",
    name: "Divine Intervention",
    category: "attribute-of-god",
    parentThemeId: "power-of-god",
    definition:
      "God stepping into human situations and changing the trajectory. From delivering Israel at the Red Sea to sending angels to apostles in prison, Scripture shows a God who doesn't just observe from a distance but acts decisively when the time is right.",
    modernFraming:
      "Divine intervention is the moment the story should have ended badly but didn't — the 'coincidence' too specific to be random, the rescue that arrived exactly when human options ran out.",
    relatedThemes: JSON.stringify([
      "power-of-god",
      "miracles",
      "liberation",
      "provision-in-wilderness",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "weakness-and-power",
    name: "Weakness and Power",
    category: "attribute-of-god",
    parentThemeId: "power-of-god",
    definition:
      "The paradox at the heart of the gospel: God's power is made perfect in weakness. Paul boasts in his limitations because that's where God's strength shows up most clearly. The cross — the ultimate display of weakness — is what Paul calls 'the power of God.'",
    modernFraming:
      "Weakness and power is the stuttering speaker who changes the room, the small church that feeds the whole block, the recovering addict who sponsors ten others. God has a thing for unlikely containers.",
    relatedThemes: JSON.stringify([
      "power-of-god",
      "reluctant-prophet",
      "suffering",
      "redemptive-suffering",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- JUSTICE OF GOD (parent + 4 children) ---
  {
    id: "justice-of-god",
    name: "Justice of God",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "God's commitment to making things right — setting crooked things straight, defending the vulnerable, and holding the powerful accountable. Justice in Scripture isn't cold legal procedure; it's deeply relational, flowing from God's love for the people being harmed.",
    modernFraming:
      "Justice of God is the reason the Bible has more to say about how you treat your employees than about your worship playlist. God cares about systems, not just souls — because systems are made of souls.",
    relatedThemes: JSON.stringify([
      "divine-judgment",
      "wrath",
      "vindication",
      "oppression",
      "poverty",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "divine-judgment",
    name: "Divine Judgment",
    category: "attribute-of-god",
    parentThemeId: "justice-of-god",
    definition:
      "God's evaluation and verdict on human actions — both in history and at the end of time. Judgment in the Bible isn't arbitrary; it's the natural consequence of a just God encountering injustice. It's also, surprisingly, good news for the oppressed who have been waiting for someone to set things right.",
    modernFraming:
      "Divine judgment is the accountability that no one can evade, the audit that catches every cooked book. For the powerful, it's a warning. For the crushed, it's the best news they've ever heard: someone is keeping score, and he's not fooled.",
    relatedThemes: JSON.stringify([
      "justice-of-god",
      "wrath",
      "punishment",
      "theodicy",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "wrath",
    name: "Wrath",
    category: "attribute-of-god",
    parentThemeId: "justice-of-god",
    definition:
      "God's settled, righteous opposition to everything that destroys his beloved creation. Wrath in the Bible isn't a temper tantrum — it's the white-hot anger of a parent watching someone hurt their child. It's love in its fiercest form, directed at the thing doing the damage.",
    modernFraming:
      "Wrath is the anger you feel when you see a news story about child abuse — except it's perfect, proportional, and backed by the power to actually do something about it. God's wrath is what his love looks like when it encounters evil.",
    relatedThemes: JSON.stringify([
      "justice-of-god",
      "divine-judgment",
      "holiness",
      "love-of-god",
      "punishment",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "punishment",
    name: "Punishment",
    category: "attribute-of-god",
    parentThemeId: "justice-of-god",
    definition:
      "The consequences God allows or assigns for sin and injustice. Biblical punishment serves multiple purposes: correction, deterrence, and restoration. Even exile — Israel's most severe punishment — carried within it God's promise of return. Punishment in Scripture is rarely the end of the story.",
    modernFraming:
      "Punishment is the consequence you can't charm your way out of, the reality check that forces a reckoning. The Bible shows God using it not to destroy people but to wake them up — like the friend who finally tells you the truth nobody else will.",
    relatedThemes: JSON.stringify([
      "justice-of-god",
      "divine-judgment",
      "wrath",
      "exile",
      "repentance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "vindication",
    name: "Vindication",
    category: "attribute-of-god",
    parentThemeId: "justice-of-god",
    definition:
      "God's act of publicly clearing the name and restoring the honor of those who were wrongly accused, oppressed, or dismissed. The psalmists repeatedly cry out for vindication — not personal revenge, but for God to set the record straight. Jesus's resurrection is the ultimate vindication.",
    modernFraming:
      "Vindication is the wrongly accused person finally exonerated, the overlooked worker finally recognized, the truth that eventually surfaces no matter how long it was buried. God is in the business of restoring reputations that injustice destroyed.",
    relatedThemes: JSON.stringify([
      "justice-of-god",
      "oppression",
      "suffering",
      "innocent-suffering",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- LOVE OF GOD (parent + 4 children) ---
  {
    id: "love-of-god",
    name: "Love of God",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "The defining characteristic of God's nature — 'God is love' is not a metaphor but a statement of identity. God's love is not reactive; it's initiating. He loves before we respond, while we're still in rebellion, and without any guarantee we'll love him back. It's the most reckless, determined force in the universe.",
    modernFraming:
      "Love of God isn't the sentimental kind you see on greeting cards — it's the love that shows up uninvited, pursues you across state lines, and refuses to take 'I'm fine' for an answer. It's relentless, specific, and a little unsettling.",
    relatedThemes: JSON.stringify([
      "unconditional-love",
      "pursuing-love",
      "father-love",
      "steadfast-love",
      "faithfulness-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "unconditional-love",
    name: "Unconditional Love",
    category: "attribute-of-god",
    parentThemeId: "love-of-god",
    definition:
      "Love without prerequisites, conditions, or expiration dates. Romans 5:8 states it plainly: 'While we were still sinners, Christ died for us.' God's love doesn't wait for you to clean up, straighten out, or earn it. It arrives before you're ready — which is the only way love that saves can work.",
    modernFraming:
      "Unconditional love is the parent who answers the collect call from jail, the friend who doesn't say 'I told you so.' It's the love that knows your browser history and your real thoughts and hasn't flinched.",
    relatedThemes: JSON.stringify([
      "love-of-god",
      "steadfast-love",
      "pursuing-love",
      "adoption",
      "freedom",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "pursuing-love",
    name: "Pursuing Love",
    category: "attribute-of-god",
    parentThemeId: "love-of-god",
    definition:
      "God's relentless chase after people who are running away. Hosea marries an unfaithful wife as a living picture of God's pursuing love for Israel. The parable of the lost sheep — leaving ninety-nine to find one — reveals a God who counts, notices, and goes after.",
    modernFraming:
      "Pursuing love is the friend who keeps texting after you've gone silent, the parent who drives four hours because something in your voice didn't sound right. God isn't sitting on his throne waiting for you to come back — he's already in the car.",
    relatedThemes: JSON.stringify([
      "love-of-god",
      "unconditional-love",
      "steadfast-love",
      "turning-back",
      "repentance",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "father-love",
    name: "Father Love",
    category: "attribute-of-god",
    parentThemeId: "love-of-god",
    definition:
      "Jesus's revolutionary invitation to call God 'Abba' — Father. The parable of the prodigal son reveals a father who watches, waits, runs, embraces, and throws a party. Father love in Scripture combines tenderness and authority, discipline and delight.",
    modernFraming:
      "Father love is complicated for anyone whose human father fell short — and the Bible knows that. God's fatherhood isn't a projection of your dad's failures; it's the original your dad was supposed to be a copy of. It's the father you needed, whether you had one or not.",
    relatedThemes: JSON.stringify([
      "love-of-god",
      "adoption",
      "unconditional-love",
      "identity",
      "presence-of-god",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "god-as-husband",
    name: "God as Husband",
    category: "attribute-of-god",
    parentThemeId: "love-of-god",
    definition:
      "The bold prophetic metaphor of God as the faithful husband to Israel, his often-unfaithful bride. Hosea, Isaiah, and Ezekiel all use this image. It's not sentimental — it includes jealousy, grief, and unwavering commitment. Ephesians extends it to Christ and the church.",
    modernFraming:
      "God as husband is the metaphor that says the divine-human relationship isn't transactional — it's covenantal, intimate, and exclusive. It's God saying 'I chose you, I'm not leaving, and your unfaithfulness hurts me but doesn't end this.'",
    relatedThemes: JSON.stringify([
      "love-of-god",
      "covenant-keeping",
      "faithfulness-of-god",
      "pursuing-love",
      "steadfast-love",
    ]),
    sourceTier: "ai_assisted",
  },

  // --- PRESENCE OF GOD (parent + 4 children) ---
  {
    id: "presence-of-god",
    name: "Presence of God",
    category: "attribute-of-god",
    parentThemeId: null,
    definition:
      "The central promise of the Bible: God with us. From walking in Eden to the pillar of fire to the incarnation to 'I am with you always,' Scripture is the story of a God who refuses to be distant. His presence is both the greatest gift and the deepest need.",
    modernFraming:
      "Presence of God is the thing you're actually looking for underneath every other search — the sense that you're not alone, that someone sees you, that the silence has a listener. Every spiritual longing is ultimately a longing for this.",
    relatedThemes: JSON.stringify([
      "immanence",
      "glory-of-god",
      "temple-as-dwelling",
      "absence-of-god",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "immanence",
    name: "Immanence",
    category: "attribute-of-god",
    parentThemeId: "presence-of-god",
    definition:
      "God's nearness — the complementary truth to transcendence. The same God who is beyond all categories has chosen to be as close as breath. The incarnation is the ultimate expression: God didn't just visit; he moved into the neighborhood.",
    modernFraming:
      "Immanence is the theological word for 'God is not far away.' It's the reason you can pray in a traffic jam, sense the sacred in a shared meal, or find God in the messiest parts of ordinary life. He's not just up there — he's right here.",
    relatedThemes: JSON.stringify([
      "presence-of-god",
      "transcendence",
      "holy-ground",
      "temple-as-dwelling",
      "holiness",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "glory-of-god",
    name: "Glory of God",
    category: "attribute-of-god",
    parentThemeId: "presence-of-god",
    definition:
      "The visible, overwhelming display of God's character and presence. Moses asked to see it and was nearly destroyed by the experience. Glory filled the temple with smoke, shone around shepherds at the nativity, and radiated from Jesus on the mount of transfiguration. It's God's nature made visible.",
    modernFraming:
      "Glory of God is the moment that takes your breath away and makes you feel very small and very loved at the same time. It's the sunset that makes you pull over, the worship service where everyone forgets themselves, the instant you realize this is all real.",
    relatedThemes: JSON.stringify([
      "presence-of-god",
      "holiness",
      "transcendence",
      "creation",
      "sacred-space",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "temple-as-dwelling",
    name: "Temple as Dwelling",
    category: "attribute-of-god",
    parentThemeId: "presence-of-god",
    definition:
      "The biblical arc of God choosing to live among his people — tabernacle in the wilderness, Solomon's temple, Jesus as the temple, believers as the temple, and finally the New Jerusalem where God dwells fully with humanity. The whole story is about God closing the distance.",
    modernFraming:
      "Temple as dwelling is the trajectory from 'God lives in a building' to 'God lives in you.' The church isn't a place you go — it's a people God inhabits. Your body, your community, your dinner table can be a temple.",
    relatedThemes: JSON.stringify([
      "presence-of-god",
      "sacred-space",
      "immanence",
      "holiness",
      "new-identity-in-christ",
    ]),
    sourceTier: "ai_assisted",
  },
  {
    id: "absence-of-god",
    name: "Absence of God",
    category: "attribute-of-god",
    parentThemeId: "presence-of-god",
    definition:
      "The devastating experience of God's perceived withdrawal. 'My God, my God, why have you forsaken me?' — spoken by David and by Jesus from the cross. Scripture takes divine absence seriously; it's not dismissed as mere feeling. But even God's apparent absence serves his purposes.",
    modernFraming:
      "Absence of God is the prayer that bounces off the ceiling, the season when the faith that used to sustain you feels like a dead battery. The Bible doesn't gaslight you about it — it gives you psalms to scream it.",
    relatedThemes: JSON.stringify([
      "presence-of-god",
      "spiritual-exile",
      "spiritual-dryness",
      "theodicy",
      "suffering",
    ]),
    sourceTier: "ai_assisted",
  },
];
