import type { CharacterRecord } from './character-types'

export const exilePostExileCharacters: CharacterRecord[] = [
  // ─────────────────────────────────────────────
  // EXILE ERA
  // ─────────────────────────────────────────────

  {
    id: 'daniel',
    name: 'Daniel',
    aliases: '["Belteshazzar"]',
    gender: 'male',
    tribeClan: 'Judah',
    occupation: 'Court advisor / dream interpreter / government official',
    socialStatus: 'royalty',
    era: 'exile',
    approximateDates: 'c. 620–530 BC',
    bioBrief:
      'A young Judean noble deported to Babylon who rose to the highest levels of a foreign government while maintaining an unyielding private faith. Daniel served multiple imperial administrations across nearly seventy years, navigating court intrigue, lions, and the constant pressure to assimilate.',
    bioFull:
      "Daniel's story is really about the cost of competence in a system that never fully accepts you. He was probably a teenager when Babylon's soldiers marched him out of Jerusalem — ripped from family, language, food, even his name. The empire handed him a new identity, Belteshazzar, and a world-class education designed to make him useful and loyal. And here's what's striking: Daniel became genuinely excellent at the work. He didn't phone it in. He climbed to the top of a pagan bureaucracy and did it well enough that multiple kings couldn't afford to lose him.\n\nBut excellence didn't protect him — it made him a target. The lions' den wasn't about Daniel breaking a law; it was about colleagues who couldn't stand watching an outsider succeed. They had to manufacture a conflict between his faith and his job because his actual performance was untouchable. That dynamic — being too good to fire but too different to fully embrace — defined his entire career.\n\nWhat makes Daniel fascinating is his refusal to compartmentalize. He didn't have a \"work self\" and a \"faith self.\" The same man who interpreted Nebuchadnezzar's dreams on deadline also opened his windows three times a day to pray toward a city that lay in ruins. He held power without letting power hold him, which is rarer than any miracle in the book.\n\nBy the end of his life, Daniel had outlasted the empire that kidnapped him. He watched Babylon fall to Persia and kept his post. The man who arrived as a captive teenager became an elder statesman whose counsel shaped world history. But the text never suggests he stopped grieving what was taken from him or stopped longing for home.",
    modernParallel:
      "Daniel is the first-generation immigrant kid who gets a full ride to an elite university, graduates top of the class, and climbs to the C-suite of a Fortune 500 company — all while his coworkers can't quite pronounce his real name and keep asking where he's \"really\" from. He's the person who code-switches flawlessly in the boardroom but still calls his grandmother to pray in his mother tongue every evening. Everyone respects his talent; almost nobody understands the weight he carries.\n\nHe's also the person who, when the company asks him to cut an ethical corner \"just this once,\" quietly says no and accepts whatever consequences follow — not with a speech, but with the calm of someone who decided the line a long time ago.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Deportation from Jerusalem as a youth',
        reference: 'Daniel 1:1-6',
        emotional_state: 'Grief, disorientation, loss of identity',
        source_tier: 'scholarship',
      },
      {
        moment: 'Refuses the king\'s food — first act of quiet defiance',
        reference: 'Daniel 1:8-16',
        emotional_state: 'Resolve, vulnerability, determination',
        source_tier: 'canon',
      },
      {
        moment: 'Interprets Nebuchadnezzar\'s dream under threat of death',
        reference: 'Daniel 2:14-19',
        emotional_state: 'Urgency, fear, then relief and gratitude',
        source_tier: 'canon',
      },
      {
        moment: 'Thrown into the lions\' den by jealous officials',
        reference: 'Daniel 6:16-23',
        emotional_state: 'Calm acceptance, trust under mortal threat',
        source_tier: 'canon',
      },
      {
        moment: 'Receives apocalyptic visions of future kingdoms',
        reference: 'Daniel 7–12',
        emotional_state: 'Overwhelm, exhaustion, awe, longing for resolution',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Daniel's faith didn't develop in a sanctuary — it developed in a foreign government building. He never had the luxury of a supportive religious community or a temple to visit. His spiritual life was entirely self-directed and maintained under constant social pressure to conform. The fact that he kept it going for decades, through regime changes and political purges, says something about a faith that had moved past external supports and into the bone.\n\nWhat's notable is that Daniel never seems to weaponize his faith. He doesn't preach at the kings he serves. He doesn't refuse to work within a pagan system. He simply maintains a private practice — prayer, dietary boundaries, honesty — and lets the tension between that practice and the empire's demands play out naturally. His faith isn't performative; it's structural. It's load-bearing. When the crisis comes, he doesn't have to manufacture courage because the daily discipline already built the architecture for it.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Daniel. Historical dating and context debated among scholars; narrative treated as canonical testimony regardless of composition date.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'shadrach',
    name: 'Shadrach',
    aliases: '["Hananiah"]',
    gender: 'male',
    tribeClan: 'Judah',
    occupation: 'Provincial administrator in Babylon',
    socialStatus: 'servant',
    era: 'exile',
    approximateDates: 'c. 620–560 BC',
    bioBrief:
      'One of three young Judean exiles who refused to worship Nebuchadnezzar\'s golden image and survived the fiery furnace. Born Hananiah, renamed Shadrach by his captors, he served as a Babylonian provincial official while holding to his convictions.',
    bioFull:
      "Shadrach — born Hananiah, meaning \"the LORD is gracious\" — got handed a Babylonian name and a government job and was expected to be grateful. Along with Meshach and Abednego, he was part of Daniel's cohort: young Judean men selected for their potential and repurposed for imperial service. He was bright enough to be useful, compliant enough to be tolerable, and foreign enough to be expendable the moment he stopped cooperating.\n\nThe furnace episode is the moment that defines him, but it's worth sitting with the choice. Nebuchadnezzar didn't set the trap for Shadrach specifically — the golden image was a loyalty test for the entire empire. Most people bowed. The calculation was obvious: bow, keep your job, keep your life, worship your own God in private later. Shadrach and his friends looked at that math and said, essentially, \"We've done the cost-benefit analysis and we'd rather burn.\"\n\nWhat's remarkable isn't the miracle — it's the speech before the miracle. \"Our God is able to deliver us... but even if he does not\" (Daniel 3:17-18). They didn't know they'd survive. They made the decision without the safety net of a guaranteed outcome. That kind of conviction doesn't come from a single dramatic moment; it comes from years of small decisions that built a specific kind of person.\n\nAfter the furnace, the text tells us Nebuchadnezzar promoted all three. History doesn't record much else. Shadrach went back to administrating a province in the empire that tried to kill him — which is its own kind of courage.",
    modernParallel:
      "Shadrach is the mid-level employee at a company whose CEO demands public loyalty pledges — sign the letter, attend the rally, post the statement — and who quietly refuses, knowing it will probably end his career. He's the person who shows up to work the next day after being publicly threatened, not because he's fearless but because he already made the decision and has no interest in re-litigating it. He's the junior associate who tells the senior partner, \"I understand the consequences, but I can't sign that.\"",
    emotionalArc: JSON.stringify([
      {
        moment: 'Deported from Judah and renamed by captors',
        reference: 'Daniel 1:6-7',
        emotional_state: 'Loss of identity, displacement',
        source_tier: 'scholarship',
      },
      {
        moment: 'Refuses to bow to Nebuchadnezzar\'s golden image',
        reference: 'Daniel 3:12-18',
        emotional_state: 'Defiant calm, acceptance of death',
        source_tier: 'canon',
      },
      {
        moment: 'Survives the fiery furnace unharmed',
        reference: 'Daniel 3:19-27',
        emotional_state: 'Awe, relief, vindication',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Shadrach's faith is defined by a single sentence: \"But even if he does not.\" That phrase is the dividing line between transactional religion — I obey because God will protect me — and something deeper. Shadrach had apparently worked out that his obligations existed independent of outcomes. He would do the right thing whether or not it worked out for him, which is a spiritual maturity that most people never reach.\n\nHis faith was also communal. He didn't face the furnace alone; he faced it with Meshach and Abednego. There's something honest about that — faith sustained in isolation is heroic, but faith sustained in community is human. These three held each other's nerve when the heat was real.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Source: Daniel 1, 3. Babylonian name Shadrach; Hebrew name Hananiah. Limited biographical detail beyond the furnace narrative.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'meshach',
    name: 'Meshach',
    aliases: '["Mishael"]',
    gender: 'male',
    tribeClan: 'Judah',
    occupation: 'Provincial administrator in Babylon',
    socialStatus: 'servant',
    era: 'exile',
    approximateDates: 'c. 620–560 BC',
    bioBrief:
      'One of three young Judean exiles who refused to bow before Nebuchadnezzar\'s golden statue and were thrown into a fiery furnace. Born Mishael, he was renamed Meshach and served in the Babylonian provincial government.',
    bioFull:
      "Meshach — originally Mishael, a name meaning \"who is what God is?\" — carries an identity question right in his birth name. That question became the defining tension of his life: in an empire that demanded total allegiance to its gods and its king, Meshach had to keep answering the question his parents embedded in his name. Who, exactly, is comparable to God? Not Nebuchadnezzar. Not a ninety-foot gold statue. Not the empire itself.\n\nLike Shadrach and Abednego, Meshach was part of the Babylonian assimilation program — educated, fed, clothed, and employed by the state. The goal was to produce loyal imperial subjects who happened to have Judean DNA. And on most days, the program probably seemed to be working. Meshach did his job. He administered his province. He operated within the system. The friction only became visible when the system demanded something his conscience couldn't deliver.\n\nThe furnace was the moment where the internal architecture of his character became external. Everything he believed privately suddenly had to be stated publicly, in front of the most powerful man in the known world, with execution as the immediate consequence of honesty. Meshach didn't flinch — but we shouldn't assume that means he wasn't terrified. Courage and fear aren't mutually exclusive; they're often concurrent.\n\nAfter the miracle, Meshach returned to obscurity. The text gives him no further story, no epilogue, no legacy narrative. He went back to work. That's its own lesson: sometimes the most dramatic moment of your life is followed by a Monday morning.",
    modernParallel:
      "Meshach is the person in the meeting who doesn't speak up first but, when the moment comes, stands with the colleague who did. He's the second signature on the letter, the person who makes a protest go from one individual's problem to a collective stand. He's the friend who says, \"If you're going, I'm going,\" and means it — not because he's not scared, but because he decided a long time ago that some things matter more than job security.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Taken from Judah, given a Babylonian name',
        reference: 'Daniel 1:6-7',
        emotional_state: 'Disorientation, cultural erasure',
        source_tier: 'scholarship',
      },
      {
        moment: 'Stands with friends in refusing to bow to the statue',
        reference: 'Daniel 3:12-18',
        emotional_state: 'Solidarity, fear held in check by conviction',
        source_tier: 'canon',
      },
      {
        moment: 'Walks out of the furnace alive',
        reference: 'Daniel 3:26-27',
        emotional_state: 'Stunned gratitude, quiet vindication',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Meshach's faith is the faith of the person who stands second. That's not a lesser faith — in some ways, it's harder. The first person to resist has the adrenaline of initiative. The second person has a clear-eyed view of exactly what's about to happen and chooses to step forward anyway. Meshach saw the furnace being heated and stood his ground, which means his decision was made with full information.\n\nHis faith was also, crucially, a faith that didn't require being the protagonist. Meshach never gets a solo scene. He's always part of a trio. His spiritual life was apparently comfortable with shared credit and shared risk, which runs counter to every instinct that says faith is a solo performance. Sometimes faithfulness looks like showing up next to the person who needs you to show up.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Source: Daniel 1, 3. Hebrew name Mishael; Babylonian name Meshach. No independent narrative outside the group account.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'abednego',
    name: 'Abednego',
    aliases: '["Azariah"]',
    gender: 'male',
    tribeClan: 'Judah',
    occupation: 'Provincial administrator in Babylon',
    socialStatus: 'servant',
    era: 'exile',
    approximateDates: 'c. 620–560 BC',
    bioBrief:
      'The third of three young Judean exiles who defied Nebuchadnezzar\'s command to worship a golden image and survived the furnace. Born Azariah ("the LORD helps"), he was renamed Abednego ("servant of Nebo") — a name swap that encapsulated the empire\'s entire assimilation project.',
    bioFull:
      "Abednego's original name, Azariah, meant \"the LORD helps.\" The Babylonians renamed him Abednego — \"servant of Nebo,\" a Babylonian deity. That's not a nickname; it's a theological mugging. The empire literally overwrote his God with theirs, right there in his daily identity. Every time someone called him Abednego, they were reinforcing the message: you belong to us now, and so does your God.\n\nHe was the youngest or at least the last-named of the trio, which in ancient Near Eastern literary convention often signals something — the overlooked one, the underestimated one. Abednego would have gone through the same Babylonian education program, the same cultural pressure cooker, the same daily negotiation between cooperation and compromise. He ate different food, prayed to a different God, and did it all while answering to a name that honored someone else's deity.\n\nThe furnace scene is where Abednego's story crystallizes. Three men standing in front of a furnace heated seven times hotter than normal, with the most powerful ruler on earth giving them one last chance to comply. Abednego's choice wasn't theoretical — he could smell the heat. He could see the soldiers who'd thrown condemned men into that furnace before. He chose the fire anyway.\n\nThe fourth figure in the furnace — the one Nebuchadnezzar saw walking with them — means Abednego's experience inside wasn't solitary suffering. It was accompanied. Whatever he went through in those flames, he didn't go through it alone. That might be the most important detail in the entire story.",
    modernParallel:
      "Abednego is the person whose employer literally changed their name — anglicized it, shortened it, made it \"easier\" — and who bore that small daily erasure for years until the day the company demanded something that crossed a line they couldn't uncross. He's the third person to stand up in the meeting after two colleagues have already spoken, knowing that by now management has had time to get genuinely angry. He's the one who adds his name to the petition not because he thinks it'll work, but because his friends are on it and he won't let them stand alone.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Identity overwritten — renamed from Azariah to Abednego',
        reference: 'Daniel 1:7',
        emotional_state: 'Humiliation, spiritual dissonance',
        source_tier: 'scholarship',
      },
      {
        moment: 'Refuses to worship the golden image alongside Shadrach and Meshach',
        reference: 'Daniel 3:14-18',
        emotional_state: 'Terrified resolve, communal courage',
        source_tier: 'canon',
      },
      {
        moment: 'Encounters a fourth figure in the furnace and emerges unharmed',
        reference: 'Daniel 3:24-27',
        emotional_state: 'Awe, unexpected companionship, profound relief',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Abednego's faith is the faith of someone who carried a name that denied his God every single day and still prayed to that God every single night. That's a particular kind of resilience — not the dramatic kind that makes headlines, but the grinding, daily kind that most people never see. His spiritual identity survived a renaming that was designed to destroy it.\n\nThe furnace revealed what the daily grind had built. Abednego didn't suddenly find faith in a crisis; he'd been practicing it in obscurity for years. The moment in the fire was simply the moment his private convictions became publicly visible. And the fourth figure walking with him — whatever theological interpretation you bring to that — meant that his faith was met. He trusted he wouldn't be alone, and he wasn't.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Source: Daniel 1, 3. Hebrew name Azariah; Babylonian name Abednego. Always appears as part of the trio; no independent narrative.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'nebuchadnezzar',
    name: 'Nebuchadnezzar',
    aliases: '["Nebuchadnezzar II", "Nebuchadrezzar"]',
    gender: 'male',
    tribeClan: null,
    occupation: 'King of the Neo-Babylonian Empire',
    socialStatus: 'royalty',
    era: 'exile',
    approximateDates: 'c. 634–562 BC',
    bioBrief:
      'The most powerful ruler of the ancient Near East in his era, Nebuchadnezzar conquered Jerusalem, destroyed Solomon\'s Temple, and deported the Judean elite to Babylon. The biblical narrative tracks his journey from absolute power through madness to an unexpected humility.',
    bioFull:
      "Nebuchadnezzar is one of the most psychologically complex figures in the Hebrew Bible, and he's not even Israelite. He's the antagonist who becomes something harder to categorize — not a convert, exactly, but a man who was broken open by experiences he couldn't control and came out the other side altered. The Bible doesn't sanitize him. He destroyed the Temple. He burned Jerusalem. He uprooted an entire civilization. And then the text gives him a transformation arc that's more honest and more unsettling than most heroes get.\n\nHis power was real and total. At the height of his reign, Nebuchadnezzar controlled everything from Egypt's border to the Persian Gulf. He built Babylon into the wonder of the ancient world — the Hanging Gardens, the Ishtar Gate, infrastructure that made Rome look provincial. He was not a paper tiger. When he stood on his palace roof and said, \"Is not this great Babylon, that I have built?\" he wasn't delusional. He had, in fact, built it. The pride was factually accurate, which is what made it so dangerous.\n\nThe madness episode — seven years living like an animal, eating grass, nails growing like claws — reads like a clinical account of a severe psychological break. Whether you read it as divine judgment or a naturalistic mental health crisis, the result is the same: the most powerful man in the world was reduced to something barely human. His courtiers watched. His empire continued without him. Everything he'd built proved it didn't need him.\n\nWhat happened after the madness is the part that doesn't get enough attention. Nebuchadnezzar came back. He was restored. And the text records him making a public declaration acknowledging a God who wasn't his own — not because he was conquered militarily, but because he was conquered internally. The man who destroyed the Temple ended up praising the Temple's God. That's not a neat moral lesson; it's a deeply strange and uncomfortable arc that the Bible lets stand without editorial comment.",
    modernParallel:
      "Nebuchadnezzar is the self-made tech billionaire who built the company from nothing, who genuinely earned his success, and whose identity became so fused with that success that he couldn't tell where the company ended and he began. He's the founder who gets pushed out during a mental health crisis, watches the company run fine without him, and comes back a fundamentally different person — not humbler by choice, but humbler because reality dismantled his self-concept at the foundation level. He's the CEO who writes the brutally honest memoir that makes everyone uncomfortable because it's too real.\n\nHe's also the person whose greatest accomplishment and greatest harm are the same thing: he built an empire, and building that empire required destroying other people's worlds.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Conquers Jerusalem and destroys the Temple',
        reference: '2 Kings 25:8-10; Daniel 1:1-2',
        emotional_state: 'Imperial triumph, unchecked power',
        source_tier: 'canon',
      },
      {
        moment: 'Troubled by a dream no one can interpret — until Daniel',
        reference: 'Daniel 2:1-19',
        emotional_state: 'Anxiety, vulnerability beneath the power',
        source_tier: 'canon',
      },
      {
        moment: 'Watches three men survive the furnace he ordered heated',
        reference: 'Daniel 3:24-28',
        emotional_state: 'Astonishment, confrontation with forces beyond his control',
        source_tier: 'canon',
      },
      {
        moment: 'Descends into madness — seven years living as an animal',
        reference: 'Daniel 4:28-33',
        emotional_state: 'Total psychological disintegration, loss of self',
        source_tier: 'canon',
      },
      {
        moment: 'Sanity restored; publicly praises the God of Israel',
        reference: 'Daniel 4:34-37',
        emotional_state: 'Humility, awe, reconstructed identity',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Nebuchadnezzar's spiritual journey doesn't fit any standard template, and that's what makes it so interesting. He didn't grow up in a faith tradition that pointed toward the God of Israel. He had his own gods, his own temples, his own priests. His encounters with Daniel's God were intrusions — unexpected, unwelcome, and progressively harder to ignore. Each miracle and each dream pushed him a little further from his certainties, but he kept snapping back to his default setting of self-worship until the madness made that impossible.\n\nThe post-madness declaration in Daniel 4 is not a conversion in any traditional sense. Nebuchadnezzar doesn't renounce his throne or tear down his temples. He simply acknowledges that there's a power operating above his own, that his sovereignty is borrowed, and that the God of a tiny conquered nation turned out to be the one running the show. It's the spirituality of a man who got beaten into honesty — not elegant, not tidy, but real.\n\nHis journey raises an uncomfortable question the text never answers: can the person who did terrible things also be the person who arrives at genuine spiritual insight? The Bible seems to say yes, without suggesting that the insight erases the harm.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Biblical sources: 2 Kings 24-25, 2 Chronicles 36, Jeremiah, Daniel 1-4. Extensively attested in Babylonian archaeological records. Historical Nebuchadnezzar II well-documented.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'ezekiel',
    name: 'Ezekiel',
    aliases: null,
    gender: 'male',
    tribeClan: 'Levi (priestly family)',
    occupation: 'Prophet / priest',
    socialStatus: 'priest',
    era: 'exile',
    approximateDates: 'c. 622–570 BC',
    bioBrief:
      'A priest-turned-prophet who received his calling in Babylon, Ezekiel delivered some of the most visually intense and emotionally demanding prophecies in the Bible — including acting out Jerusalem\'s siege with his own body and being forbidden to mourn his wife\'s death.',
    bioFull:
      "Ezekiel is the prophet who makes other prophets look well-adjusted. His book reads like the journal of a man who was given visions too large for human processing and then told to act them out in public. Wheels within wheels, living creatures with four faces, a valley of dry bones reassembling themselves — Ezekiel's inner world was so vivid and so strange that scholars have debated for centuries whether he was experiencing genuine mystical encounters or something clinically significant. The honest answer is probably both.\n\nHe was a priest by training, which matters enormously. Ezekiel was raised to serve in the Temple — the rituals, the architecture, the theology of sacred space were his entire professional identity. And then the Temple was destroyed, and he was sitting in Babylon, thousands of miles from the place where his life was supposed to happen. His prophetic ministry wasn't a career change he chose; it was a reassignment imposed by catastrophe. Everything he knew about how to connect with God — the sacrifices, the holy of holies, the priestly calendar — was gone.\n\nWhat the exile did to Ezekiel personally is almost unbearable to read. God used his body as a billboard: lie on your side for 390 days, eat food cooked over dung, shave your head and burn a third of the hair. And then the most devastating command of all — when your wife dies, don't mourn. Don't weep. His wife died, and he was told to treat it as a sign to the people. The text records his obedience without recording his feelings, which is its own kind of cruelty.\n\nBut Ezekiel is also the prophet of resurrection. The valley of dry bones — that vision of dead things coming back to life — came from a man who had watched everything die. His hope wasn't naive; it was hard-won. When Ezekiel described the new Temple in chapters 40-48, he was drawing blueprints for a future he'd never see, with the precision of a man who remembered every measurement of the building that was destroyed. That's not optimism. That's faith with an architect's eye.",
    modernParallel:
      "Ezekiel is the artist who processes collective trauma through work so intense it makes people uncomfortable. He's the war photographer whose images are too graphic for the front page but too important to suppress. He's the spoken-word poet at the open mic whose performance is so raw that half the audience leaves and the other half can't stop thinking about it for weeks. He's the therapist's kid who grew up knowing exactly how the system was supposed to work, watched the system collapse, and then had to build a new therapeutic framework from the wreckage.\n\nHe's also the person who loses their spouse and goes to work the next day because someone told them they had to — and who carries that unprocessed grief in their body for the rest of their life.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Receives his prophetic calling in Babylon — the throne-chariot vision',
        reference: 'Ezekiel 1:1-28',
        emotional_state: 'Overwhelm, terror, awe at the incomprehensible',
        source_tier: 'canon',
      },
      {
        moment: 'Commanded to perform agonizing symbolic acts — lying on his side, eating siege rations',
        reference: 'Ezekiel 4:1-17',
        emotional_state: 'Physical suffering, obedient distress',
        source_tier: 'canon',
      },
      {
        moment: 'Wife dies; forbidden to mourn publicly',
        reference: 'Ezekiel 24:15-27',
        emotional_state: 'Devastating grief suppressed by divine command',
        source_tier: 'canon',
      },
      {
        moment: 'Vision of the valley of dry bones',
        reference: 'Ezekiel 37:1-14',
        emotional_state: 'Hard-won hope, resurrection from despair',
        source_tier: 'canon',
      },
      {
        moment: 'Detailed vision of the restored Temple',
        reference: 'Ezekiel 40-48',
        emotional_state: 'Longing, architectural precision as devotion',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Ezekiel's faith was forged in the worst possible conditions — exile, loss of vocation, loss of sacred space, loss of his wife. He was a priest without a temple, which is like being a surgeon without a hospital. The tools of his faith were gone, and he had to build new ones in real time, in a foreign country, while God was asking him to do things that looked insane to everyone watching.\n\nWhat emerged was a faith that was extraordinarily visual and embodied. Ezekiel didn't just talk about God's word — he ate a scroll. He didn't just predict Jerusalem's fall — he built a model of it and lay beside it for over a year. His faith lived in his body in a way that was painful and strange and completely authentic. He processed the unprocessable by turning it into performance, art, and architecture.\n\nThe Temple vision at the end of his book is the purest expression of Ezekiel's faith: meticulous, detailed, future-oriented, and deeply rooted in what was lost. He described a building that didn't exist with measurements so precise you could construct it. That's the faith of someone who believes in restoration not as a vague feeling but as a concrete, buildable reality.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Ezekiel. Prophetic ministry dated c. 593-571 BC based on internal chronological markers. Priestly background established in Ezekiel 1:3.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────────────────────────
  // POST-EXILE ERA
  // ─────────────────────────────────────────────

  {
    id: 'ezra',
    name: 'Ezra',
    aliases: null,
    gender: 'male',
    tribeClan: 'Levi (priestly descent from Aaron)',
    occupation: 'Scribe / priest / teacher of the Law',
    socialStatus: 'priest',
    era: 'post-exile',
    approximateDates: 'c. 480–420 BC',
    bioBrief:
      'A scholar-priest who led the second wave of Jewish returnees from Babylon to Jerusalem, Ezra\'s mission was to reestablish the Torah as the organizing principle of the restored community. He is traditionally credited with shaping Judaism into a text-centered faith.',
    bioFull:
      "Ezra is the person who rebuilt a religion from its source documents. When he arrived in Jerusalem from Babylon, the physical Temple had already been reconstructed — Zerubbabel's generation handled that. But the spiritual infrastructure was in disrepair. The returnees had intermarried, the Torah was barely being followed, and the community was drifting toward assimilation not because of imperial pressure but because of simple cultural entropy. Ezra's job was to reverse that drift, and his tool was a book.\n\nWhat makes Ezra historically remarkable is that he essentially invented the role that would define Judaism for the next 2,500 years: the scholar-teacher who treats the text as the primary site of encounter with God. Before the exile, Israelite religion was centered on the Temple, the priests, and the sacrifices. Ezra didn't eliminate those things, but he placed the Torah alongside them — and in practice, above them. When he stood on a wooden platform and read the Law aloud while Levites translated and explained it, he was creating the prototype for every synagogue service, every Bible study, and every sermon that would follow.\n\nThe intermarriage crisis is the part of Ezra's story that modern readers find hardest to stomach. He wept publicly when he learned that Jewish men had married non-Jewish women, and he pushed for the dissolution of those marriages. It reads as exclusionary and cruel, and by modern standards it is. But Ezra was operating in a context where the community's survival as a distinct people was genuinely in question. He made a harsh call in a desperate situation, and whether that call was right is a question the text leaves for its readers to wrestle with.\n\nEzra's legacy isn't the intermarriage policy — it's the book. He took a collection of scrolls and made them the beating heart of a community. He demonstrated that a people could survive the loss of land, temple, and sovereignty as long as they had a shared text and the discipline to study it. That insight saved Judaism and, by extension, shaped the entire Western intellectual tradition.",
    modernParallel:
      "Ezra is the professor of cultural studies who returns to his ancestral homeland after the revolution and finds that the younger generation has forgotten the language, the literature, and the traditions. He's the person who starts the community school, curates the curriculum, and insists that everyone — not just the elite — sit down and learn the foundational texts. He's the diaspora kid who comes back with a Ph.D. and a mission, and whose intensity about cultural preservation makes some people grateful and other people deeply uncomfortable.\n\nHe's also the community leader who makes a controversial decision about boundaries — who's in, who's out — and lives with the backlash, convinced that without boundaries there won't be a community left to argue about.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Receives commission from King Artaxerxes to return to Jerusalem',
        reference: 'Ezra 7:11-26',
        emotional_state: 'Purpose, scholarly excitement, weight of responsibility',
        source_tier: 'canon',
      },
      {
        moment: 'Leads the journey from Babylon — refuses a military escort, trusting God',
        reference: 'Ezra 8:21-23',
        emotional_state: 'Vulnerable faith, public stakes for a private conviction',
        source_tier: 'canon',
      },
      {
        moment: 'Discovers widespread intermarriage and tears his garments in grief',
        reference: 'Ezra 9:1-5',
        emotional_state: 'Shock, public grief, anguish over communal failure',
        source_tier: 'canon',
      },
      {
        moment: 'Reads the Torah aloud to the assembled people; the crowd weeps',
        reference: 'Nehemiah 8:1-12',
        emotional_state: 'Solemn joy, communal catharsis, restoration of meaning',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Ezra's faith was the faith of a scholar — rigorous, text-based, and deeply convinced that knowledge of God's word was not optional but essential. He didn't treat scripture as a devotional supplement; he treated it as the foundation on which everything else was built. His preparation for the journey back to Jerusalem wasn't military or logistical — it was literary. He \"set his heart to study the Law of the LORD, and to do it, and to teach\" (Ezra 7:10). Study, practice, teach — in that order. He wouldn't teach what he hadn't lived, and he wouldn't live what he hadn't studied.\n\nBut Ezra's faith also had an anguished edge. The scene where he tears his garments and pulls out his own hair when he hears about intermarriage isn't the reaction of a dispassionate academic. It's the reaction of someone who took communal faithfulness personally — who felt the community's failures in his own body. His faith was intellectual but not detached. He cared about the text because he cared about the people the text was supposed to shape.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary sources: Book of Ezra, Nehemiah 8. Traditionally credited with significant editorial work on the Hebrew Bible. Historical dating debated; likely active under Artaxerxes I (458 BC arrival) or Artaxerxes II.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'nehemiah',
    name: 'Nehemiah',
    aliases: null,
    gender: 'male',
    tribeClan: 'Judah (probable)',
    occupation: 'Cupbearer to Persian king / governor of Judah',
    socialStatus: 'royalty',
    era: 'post-exile',
    approximateDates: 'c. 475–410 BC',
    bioBrief:
      'A high-ranking official in the Persian court who gave up a comfortable government career to rebuild Jerusalem\'s shattered walls. Nehemiah combined hands-on construction management with political savvy, completing the wall in just fifty-two days against fierce opposition.',
    bioFull:
      "Nehemiah had a good life in Persia. Cupbearer to King Artaxerxes wasn't a waiter's job — it was a position of intimate trust and significant influence. He lived in the palace, had the king's ear, and was probably well-compensated. By any reasonable measure, he had made it. He was the successful diaspora professional who'd beaten the odds and built a life in the empire that had conquered his people.\n\nAnd then his brother showed up with bad news from Jerusalem, and Nehemiah's comfortable life became intolerable. The walls were broken, the gates were burned, and the people who'd returned were living in disgrace. Nehemiah didn't hear that report and form a committee. He wept, fasted, and then — this is the part that reveals his character — he made a plan. He calculated what he'd need: letters of safe passage, timber from the king's forest, a military escort. He walked into the king's presence with a specific ask and a timeline. Nehemiah grieved like a prophet and organized like a project manager.\n\nThe wall project is a masterclass in leadership under pressure. Nehemiah faced external opposition from Sanballat, Tobiah, and Geshem — regional power brokers who had every incentive to keep Jerusalem weak. He faced internal problems: predatory lending among the wealthy, labor fatigue, and the constant temptation to quit. His solution was elegant and brutal: workers held a tool in one hand and a weapon in the other. He literally built and fought simultaneously.\n\nFifty-two days. That's how long it took to rebuild the wall. The speed tells you something about Nehemiah's intensity, but also about the hunger of the people who'd been living without protection. Nehemiah gave them something to rally around, and they responded with an urgency that suggests they'd been waiting for someone to show up with a plan and the authority to execute it.",
    modernParallel:
      "Nehemiah is the corporate executive who quits a six-figure job to go back to the neighborhood where he grew up — which has been gutted by disinvestment — and starts a community development organization. He's the person who shows up with grant applications already filled out, a construction timeline on a spreadsheet, and a volunteer roster organized by skill set. He's not an idealist; he's a pragmatist who happens to be driven by something deeper than profit.\n\nHe's also the leader who has to deal with the fact that not everyone in the community wants the same thing. Some people are profiting from the dysfunction. Some people are too tired to hope. Nehemiah's gift is that he can hold the vision and manage the resistance at the same time, without pretending either one away.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Receives news of Jerusalem\'s broken walls and weeps',
        reference: 'Nehemiah 1:1-4',
        emotional_state: 'Grief, visceral connection to a homeland he\'s never governed',
        source_tier: 'canon',
      },
      {
        moment: 'Risks his position by asking the king for permission to rebuild',
        reference: 'Nehemiah 2:1-8',
        emotional_state: 'Fear masked by preparation, calculated vulnerability',
        source_tier: 'canon',
      },
      {
        moment: 'Inspects the ruined walls at night, alone',
        reference: 'Nehemiah 2:12-16',
        emotional_state: 'Private reckoning with the scale of the task',
        source_tier: 'canon',
      },
      {
        moment: 'Confronts wealthy Jews exploiting the poor during rebuilding',
        reference: 'Nehemiah 5:1-13',
        emotional_state: 'Righteous anger, moral clarity',
        source_tier: 'canon',
      },
      {
        moment: 'Wall completed in fifty-two days',
        reference: 'Nehemiah 6:15-16',
        emotional_state: 'Exhausted triumph, vindication',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Nehemiah's faith expressed itself in short, urgent prayers fired off in the middle of conversations and crises — what scholars sometimes call \"arrow prayers.\" He didn't retreat to a monastery to find God; he found God in the middle of a construction site. His book is punctuated with quick prayers: \"Remember me, O my God\" appears like a refrain, a man constantly touching base with the divine while his hands are full of bricks and his inbox is full of threats.\n\nHis faith was also stubbornly practical. Nehemiah didn't pray instead of planning; he prayed and planned. He fasted and then prepared a budget proposal. He trusted God and posted armed guards. That combination — spiritual dependence and operational competence — made his faith deeply integrated rather than compartmentalized. He didn't see a conflict between trusting God and doing the work, because for him they were the same activity.\n\nWhat's most striking is that Nehemiah's faith had a collective dimension that was unusual even for his time. He wasn't just trying to save his own soul; he was trying to rebuild the physical and social infrastructure that would allow an entire community to practice their faith. His spirituality was civic, architectural, economic — it showed up in walls and policies and interest-rate reforms.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Nehemiah (first-person memoir sections among the earliest autobiographical writing in the Bible). Served under Artaxerxes I; arrived in Jerusalem c. 445 BC.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'esther',
    name: 'Esther',
    aliases: '["Hadassah"]',
    gender: 'female',
    tribeClan: 'Benjamin',
    occupation: 'Queen of Persia',
    socialStatus: 'royalty',
    era: 'post-exile',
    approximateDates: 'c. 490–430 BC',
    bioBrief:
      'An orphaned Jewish woman who became queen of the Persian Empire and used her position to prevent the genocide of her people. Esther operated in a world where her identity was a secret and her influence was indirect — and she leveraged both with extraordinary precision.',
    bioFull:
      "Esther's story is about the terrifying math of hidden identity. She was a Jewish orphan raised by her cousin Mordecai, living in the Persian capital under a name — Esther, from the Persian word for \"star\" — that concealed her Hebrew name, Hadassah. When she entered the king's harem and eventually became queen, she did so with her ethnicity hidden. Mordecai told her not to reveal it. She was passing, and passing in an empire that could turn on her people at any moment.\n\nThe beauty contest that made her queen was not a fairy tale. Women were gathered from across the empire, put through twelve months of cosmetic treatments, and sent one by one to spend the night with the king. The ones he didn't choose went to the harem permanently — married but functionally discarded. Esther won. But \"winning\" in this context meant being selected by a man who'd just banished his previous queen for disobedience. She married into power with a very clear understanding of its limits.\n\nWhen Haman's genocide plot emerged, Esther faced the most consequential decision of her life. Approaching the king uninvited could mean death. Revealing her Jewish identity could mean death. Doing nothing would mean the death of her entire people. Mordecai's famous challenge — \"who knows whether you have not come to the kingdom for such a time as this?\" — isn't comforting. It's a pressure cooker. It says: maybe everything that happened to you, all the loss and the beauty treatments and the nights with a king you didn't choose, happened so you could be in this room at this moment. That's either the most meaningful thing anyone has ever said to you or the most crushing burden.\n\nEsther chose to act, but she didn't charge in. She planned. Two banquets. Strategic timing. She read the room, managed the king's ego, and let Haman's arrogance do half the work for her. Her courage wasn't impulsive — it was calculated, patient, and devastatingly effective. She saved a nation not with a sword but with a dinner party and impeccable timing.",
    modernParallel:
      "Esther is the woman who gets hired as the diversity candidate, knows she's the diversity candidate, and decides to use the access that position gives her to actually change the institution from the inside. She's the person who has been code-switching so long she almost forgot which version of herself was the original — and then a crisis forces her to choose. She's the junior senator who doesn't have seniority or a power base but has proximity to the decision-maker, and who uses that proximity at exactly the right moment to block legislation that would devastate her community.\n\nShe's also the person who understands that visibility is a weapon that can be pointed in both directions. Coming out, speaking up, revealing who you really are — those are acts of courage, but they're also strategic calculations. Esther timed her revelation for maximum impact because she knew she'd only get one shot.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Taken into the king\'s harem — beauty treatments begin',
        reference: 'Esther 2:8-12',
        emotional_state: 'Loss of autonomy, strategic compliance',
        source_tier: 'scholarship',
      },
      {
        moment: 'Chosen as queen while concealing her Jewish identity',
        reference: 'Esther 2:17-20',
        emotional_state: 'Guarded triumph, the weight of a hidden self',
        source_tier: 'canon',
      },
      {
        moment: 'Learns of Haman\'s plot to annihilate the Jews',
        reference: 'Esther 4:4-8',
        emotional_state: 'Terror, moral paralysis, then resolve',
        source_tier: 'canon',
      },
      {
        moment: '"If I perish, I perish" — decides to approach the king uninvited',
        reference: 'Esther 4:15-16',
        emotional_state: 'Acceptance of potential death, fierce determination',
        source_tier: 'canon',
      },
      {
        moment: 'Reveals her identity and accuses Haman before the king',
        reference: 'Esther 7:3-6',
        emotional_state: 'Controlled fury, vulnerability weaponized as disclosure',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "The Book of Esther famously never mentions God. Not once. That absence has generated centuries of commentary, but it might be the most honest thing about the book. Esther's faith — if we call it that — operated in a space where divine intervention wasn't visible, where prayer might or might not work, and where the outcome depended on a young woman's willingness to risk her life. Her three-day fast before approaching the king is the closest the text comes to a spiritual practice, and even that is described in communal rather than theological terms: \"Fast for me. Do not eat or drink for three days.\" It's a request for solidarity, not a prayer formula.\n\nEsther's spiritual significance may lie precisely in that divine silence. She acted without guarantees, without miracles, without a prophet telling her God would protect her. She had Mordecai's challenge, her own courage, and the wild possibility that her position wasn't an accident. Her faith, if it existed, was the faith of someone working in the dark — doing the right thing without knowing whether anyone or anything was backing her up. That's a kind of faith most people recognize more readily than burning bushes and parting seas.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Esther. Set during reign of Ahasuerus (likely Xerxes I, 486-465 BC). One of two biblical books named for a woman. Notably, God is never explicitly mentioned in the Hebrew text.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'mordecai',
    name: 'Mordecai',
    aliases: null,
    gender: 'male',
    tribeClan: 'Benjamin',
    occupation: 'Court official / adoptive father',
    socialStatus: 'common',
    era: 'post-exile',
    approximateDates: 'c. 510–440 BC',
    bioBrief:
      'Esther\'s older cousin and adoptive father, Mordecai was a Jewish official at the Persian court gate who refused to bow to Haman and became the catalyst for both the crisis and the deliverance of his people.',
    bioFull:
      "Mordecai is the behind-the-scenes operator who made Esther's story possible. He raised an orphaned girl, navigated the Persian bureaucracy, and positioned himself at the king's gate — the ancient equivalent of working in the lobby of power, close enough to hear everything, low-ranking enough to be ignored. He was a man who understood systems: how information flowed, who had influence, where the pressure points were.\n\nHis refusal to bow to Haman is the inciting incident of the entire Book of Esther, and the text is frustratingly vague about why he refused. It wasn't a general principle — Jewish law didn't prohibit bowing to officials. Some scholars suggest it was specifically about Haman's Agagite heritage, connecting to the ancient enmity between Israel and Amalek. Others read it as personal: Mordecai simply wouldn't give this particular man the satisfaction. Whatever the reason, he refused, and he did it knowing it would provoke a response. He was either principled or reckless or both.\n\nThe genius of Mordecai was strategic. When Haman's genocide plot emerged, Mordecai didn't try to storm the palace. He worked the asset he had: Esther. His message to her — \"do not think that because you are in the king's house you alone of all the Jews will escape\" — is loving and ruthless in equal measure. He was telling his adopted daughter that her safety was an illusion and that her position came with an obligation she couldn't refuse. It's the speech of a man who loved her enough to be honest and strategic enough to know that honesty was also the most effective tool.\n\nMordecai's eventual elevation — riding the king's horse in royal robes while Haman led him through the streets — is one of the great reversals in literature. The man who sat at the gate ended up wearing the crown's regalia. But what's telling is that Mordecai didn't seek the position. He was promoted because he'd quietly foiled an assassination plot years earlier and because Haman's downfall created a vacuum. His rise was the cumulative result of years of quiet faithfulness, not a single dramatic gesture.",
    modernParallel:
      "Mordecai is the immigrant uncle who works as a security guard at a government building, knows every janitor and every aide by first name, and has a better read on the politics of the place than most elected officials. He's the person who raised his niece when her parents died, pushed her to succeed in a system he understood from the outside, and then — when the crisis came — called in the debt. Not cruelly, but honestly: \"You're where you are for a reason. This is the reason.\"\n\nHe's also the person who does the quiet, uncredited thing — reporting the assassination plot, keeping his head down, building a network — and doesn't see the payoff for years. His career is a masterclass in the long game.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Adopts his orphaned cousin Esther and raises her as his own',
        reference: 'Esther 2:5-7',
        emotional_state: 'Protective love, sense of familial duty',
        source_tier: 'canon',
      },
      {
        moment: 'Refuses to bow to Haman — triggering the crisis',
        reference: 'Esther 3:1-6',
        emotional_state: 'Defiant conviction, awareness of the risk',
        source_tier: 'canon',
      },
      {
        moment: 'Learns of the genocide decree and mourns publicly in sackcloth',
        reference: 'Esther 4:1-3',
        emotional_state: 'Anguish, desperate urgency',
        source_tier: 'canon',
      },
      {
        moment: 'Challenges Esther to act — "for such a time as this"',
        reference: 'Esther 4:13-14',
        emotional_state: 'Strategic clarity masking deep fear for his people',
        source_tier: 'canon',
      },
      {
        moment: 'Elevated to Haman\'s position — the reversal is complete',
        reference: 'Esther 8:1-2, 15',
        emotional_state: 'Vindication, communal joy, the weight of new authority',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Like the rest of the Book of Esther, Mordecai's faith operates in the register of implication rather than statement. He never prays on the page. He never invokes God's name. But his actions imply a deep structure of belief: the refusal to bow, the confidence that deliverance would come \"from another place\" even if Esther stayed silent, the willingness to stake everything on the conviction that his people's story wasn't over. His famous statement to Esther — \"relief and deliverance will arise for the Jews from another place\" — is the closest he comes to a theological claim, and it's strikingly indirect. He doesn't say God will save them. He says help will come. From somewhere.\n\nMordecai's faith was the faith of a strategist — a man who believed that history had a direction and that human action within history mattered. He didn't sit back and wait for miracles. He positioned his people, managed his assets, and worked the angles. But underneath all that calculation was something less rational: a stubborn confidence that the story would hold, that the Jewish people would survive, and that his refusal to bow was worth the cosmic gamble it provoked.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Esther. Descendant of Kish of the tribe of Benjamin (Esther 2:5). Some scholars note the parallel with King Saul (also a Benjaminite son of Kish) in the conflict with the Agagite Haman.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'haman',
    name: 'Haman',
    aliases: '["Haman the Agagite"]',
    gender: 'male',
    tribeClan: 'Agagite (possibly descended from Amalekite royalty)',
    occupation: 'Prime minister / chief advisor to King Ahasuerus',
    socialStatus: 'royalty',
    era: 'post-exile',
    approximateDates: 'c. 490–470 BC',
    bioBrief:
      'The chief advisor to King Ahasuerus who plotted the genocide of the Jewish people because one man — Mordecai — refused to bow to him. Haman is the Bible\'s portrait of how unchecked ego and ethnic hatred, combined with political power, produce catastrophic evil.',
    bioFull:
      "Haman is terrifying precisely because he's recognizable. He's not a supernatural villain or a foreign conqueror; he's a bureaucrat with a wounded ego and the administrative machinery to act on it. One man refused to bow to him, and rather than shrug it off or deal with Mordecai directly, Haman decided to exterminate Mordecai's entire ethnic group. That escalation — from personal insult to attempted genocide — is the most important thing about his character. It reveals a man whose sense of self was so fragile that a single act of disrespect became an existential threat that could only be resolved through total annihilation.\n\nThe mechanics of Haman's plan are chillingly bureaucratic. He didn't raise an army. He submitted a memo. He went to the king with a policy proposal — \"there is a certain people scattered abroad... their laws are different from those of every other people, and they do not keep the king's laws\" — and framed genocide as sound governance. He even offered to fund it personally: ten thousand talents of silver. The industrialization of hatred through administrative process is not an ancient phenomenon. It's a recurring pattern.\n\nHaman's downfall is structured as dark comedy. He builds a seventy-five-foot gallows for Mordecai. He shows up at the palace early, eager to request Mordecai's execution. The king asks him, \"What should be done for the man the king delights to honor?\" Haman, assuming the king means him, designs an elaborate public honor — and is then forced to perform it for Mordecai. The man who demanded everyone bow to him is now leading his enemy's victory parade through the capital.\n\nThe final scene is swift and merciless. Haman falls on Esther's couch, the king interprets it as assault, and Haman is hanged on the very gallows he built for Mordecai. It's a narrative of perfect reversal: every weapon Haman forged was used against him. But the text doesn't invite gloating. It invites recognition. Haman isn't a monster from another world — he's a type. A recurring human pattern of insecurity, prejudice, and power that shows up in every century.",
    modernParallel:
      "Haman is the senior executive who can't tolerate the one employee who doesn't laugh at his jokes, and instead of moving on, launches an HR campaign to restructure the entire department so that person's role is eliminated. He's the politician who encounters one community that doesn't support him and responds not with persuasion but with policies designed to suppress their votes, restrict their rights, and question their loyalty to the country. He's the person who builds the trap so elaborate that he ends up caught in it himself — the architect of his own destruction who is somehow always surprised when the blueprint flips.\n\nHe's also a warning about what happens when thin skin meets real power. Most petty people are merely annoying. Haman had the king's signet ring.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Promoted to highest position — demands universal bowing',
        reference: 'Esther 3:1-2',
        emotional_state: 'Grandiosity, entitlement, addiction to deference',
        source_tier: 'canon',
      },
      {
        moment: 'Mordecai refuses to bow — Haman is enraged',
        reference: 'Esther 3:5-6',
        emotional_state: 'Narcissistic fury disproportionate to the slight',
        source_tier: 'canon',
      },
      {
        moment: 'Plans genocide and casts lots (purim) to choose the date',
        reference: 'Esther 3:7-15',
        emotional_state: 'Cold calculation, vindictive satisfaction',
        source_tier: 'canon',
      },
      {
        moment: 'Forced to honor Mordecai publicly — his humiliation begins',
        reference: 'Esther 6:10-12',
        emotional_state: 'Shock, mortification, dawning dread',
        source_tier: 'canon',
      },
      {
        moment: 'Exposed by Esther and hanged on his own gallows',
        reference: 'Esther 7:6-10',
        emotional_state: 'Panic, pleading, total collapse',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Haman doesn't have a faith journey in any positive sense, but he's theologically significant precisely because of what he represents. He cast lots — purim — to determine the date for the genocide, which means he believed in some kind of cosmic order, some force that could be consulted through divination. His religion, such as it was, was instrumentalized: the divine was a tool to optimize his plans, not a power that made claims on his behavior.\n\nThe irony the text builds around Haman is deeply theological even though it never states a theology. Every one of his plans reverses. The gallows he builds becomes his scaffold. The honor he designs becomes Mordecai's parade. The date he selects by lot becomes a Jewish festival of deliverance. The Book of Esther never says God did this, but the pattern of reversal is so systematic that the absence of God's name starts to feel like a literary choice rather than a theological one — as if the author is saying: look at the pattern and draw your own conclusions.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Book of Esther. Identified as an Agagite (Esther 3:1), possibly linking him to Agag, king of the Amalekites (1 Samuel 15). His downfall is commemorated annually in the festival of Purim.',
    isNamed: true,
    prominence: 'secondary',
  },
]
