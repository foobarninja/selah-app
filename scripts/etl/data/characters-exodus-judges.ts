import type { CharacterRecord } from './character-types'

export const exodusJudgesCharacters: CharacterRecord[] = [
  // ─────────────────────────────────────────────
  // EXODUS ERA (12 characters)
  // ─────────────────────────────────────────────

  {
    id: 'moses',
    name: 'Moses',
    aliases: 'Moshe',
    gender: 'male',
    tribeClan: 'Levi',
    occupation: 'prophet, leader, lawgiver',
    socialStatus: 'raised as Egyptian royalty; later a shepherd; ultimately national leader',
    era: 'exodus',
    approximateDates: '~1526–1406 BC (traditional)',
    bioBrief: 'The reluctant liberator who argued with God about his own qualifications and then spent forty years managing a nation that constantly wanted to go back to slavery.',
    bioFull: `Moses is one of the most layered people in all of Scripture, and most of that gets flattened into "the guy with the tablets." But think about what actually happened to him. He was born under a death sentence, adopted into the family responsible for that sentence, and spent his first forty years living inside the contradiction of being both oppressor and oppressed. When he finally acted on his identity — killing an Egyptian taskmaster — he didn't become a hero. He became a fugitive. That's not the arc of a confident leader. That's the arc of someone who doesn't know who he is yet.

The next forty years in Midian weren't some kind of pastoral sabbatical. He married, had kids, tended sheep. He built a life. And then a bush caught fire and didn't burn, and a voice told him to go back to the place where he was wanted for murder and demand that the most powerful man in the world release his labor force. Moses' response? "Send someone else." That's not false modesty. That's a man who tried to do this once, on his own terms, and it destroyed his life.

What followed — the plagues, the sea, Sinai, the wilderness — was forty years of mediating between a holy God and a perpetually dissatisfied people. Moses interceded for Israel when God wanted to destroy them. He smashed the tablets in rage when Israel built the golden calf. He begged to see God's face and was told he could only see God's back. He struck a rock in frustration and lost his right to enter the promised land. This is not a plaster saint. This is a man who carried an impossible weight and sometimes broke under it.

The most remarkable thing about Moses may be what he didn't get. He led the people to the border of Canaan and then died on a mountain, looking at a land he'd never walk into. The whole project of his life — and he didn't get to finish it. That's either a tragedy or a profound statement about what faithfulness actually requires.`,
    modernParallel: `Think about the nonprofit founder who spends thirty years building an organization to solve a crisis — homelessness, clean water, refugee resettlement — and then gets pushed out by the board right before the big breakthrough. Or the civil rights leader who spent decades in the fight and died before the legislation passed. Moses is the person who does the hardest work of liberation and then doesn't get to enjoy the result. You've probably worked with someone like this — the person who builds the team, creates the culture, solves the impossible problems, and then gets transferred right before the project ships. The question Moses forces you to ask is: would you still do the work if you knew you'd never see the payoff?`,
    emotionalArc: JSON.stringify([
      { moment: 'Killing the Egyptian taskmaster', reference: 'Exodus 2:11-15', emotional_state: 'Righteous fury collapsing into terror and shame', source_tier: 'canon' },
      { moment: 'The burning bush call', reference: 'Exodus 3-4', emotional_state: 'Resistance, inadequacy, desperate negotiation with God', source_tier: 'canon' },
      { moment: 'Smashing the tablets after the golden calf', reference: 'Exodus 32:19', emotional_state: 'Volcanic anger — at Israel, at himself, at the whole fragile project', source_tier: 'canon' },
      { moment: 'Asking to see God\'s glory', reference: 'Exodus 33:18-23', emotional_state: 'Aching intimacy — wanting to know the one he serves', source_tier: 'canon' },
      { moment: 'Striking the rock at Meribah', reference: 'Numbers 20:10-12', emotional_state: 'Exhaustion-fueled rage after decades of complaint', source_tier: 'canon' }
    ]),
    faithJourney: `Moses' faith didn't follow a steady upward line. It looked more like a jagged mountain range. He started with a dramatic encounter at the burning bush, but even that didn't produce instant confidence — he kept arguing, kept asking for someone else. His faith grew in the furnace of Pharaoh's court, on the shore of the Red Sea, and in the terrifying silence of Sinai. But it also cracked. The rock at Meribah wasn't just disobedience; it was the eruption of a man who had been holding it together for decades and finally snapped.

What's remarkable is that Moses' relationship with God was described as face-to-face, like friends talking. That kind of intimacy didn't protect him from doubt, anger, or failure. If anything, it made those things more acute. The closer you get, the more the gap between what you know and what you experience starts to burn. Moses died on Nebo with unfinished business and a view of the land he'd never enter. His faith wasn't rewarded with completion. It was rewarded with presence — God buried him personally, and nobody knows where.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 2-40; Numbers 10-36; Deuteronomy 1-34. Core biographical details are directly scriptural. Emotional states at the burning bush and Meribah are explicitly described. Interior states during the golden calf incident are inferred from canonical actions.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'aaron',
    name: 'Aaron',
    aliases: null,
    gender: 'male',
    tribeClan: 'Levi',
    occupation: 'high priest, spokesperson',
    socialStatus: 'first high priest of Israel; brother of Moses',
    era: 'exodus',
    approximateDates: '~1529–1406 BC (traditional)',
    bioBrief: 'Moses\' older brother who became Israel\'s first high priest — and also the guy who made the golden calf when things got tense.',
    bioFull: `Aaron is the person in the group project who volunteers to present because someone has to, and then ends up getting credit for work that wasn't entirely his. He was Moses' mouthpiece — literally. When Moses said he couldn't speak well, God said, "Fine, Aaron will talk for you." That's a strange starting position: you're essential, but you're derivative. Your authority comes from standing next to someone else.

And Aaron handled that role with mixed results. He stood before Pharaoh. He stretched out the staff. He was right there for the plagues and the Red Sea. But when Moses went up the mountain and didn't come back on schedule, Aaron caved to the crowd. "Give me your gold," he said, and he made a calf. When Moses confronted him, Aaron's excuse was almost comically bad: "I threw the gold in the fire and out came this calf." That's not leadership. That's a man who is terrified of the people he's supposed to be leading.

But here's the thing — God still made him high priest. After the calf, after the excuse, Aaron was given the most sacred role in Israel's worship. He wore the breastplate with the names of the twelve tribes over his heart. He entered the Most Holy Place on the Day of Atonement. The same hands that shaped an idol were the hands that offered sacrifices for the nation's sins.

Aaron's story is uncomfortable because it doesn't let you sort people cleanly into "faithful" and "unfaithful." He was both. He was the high priest and the idolmaker. He carried the nation's sins before God, and he also created their worst one.`,
    modernParallel: `Aaron is the second-in-command at a company who makes all the right moves when the CEO is around but folds under pressure the moment the boss is out of pocket. He's the interim pastor who greenlights a terrible building project because the congregation was loud about it and he didn't want the conflict. You know this person — competent, even gifted, but dangerously responsive to whoever is in the room. The question Aaron raises isn't whether you can be forgiven for a massive failure (he was), but whether you can be trusted with authority when the person you lean on isn't there.`,
    emotionalArc: JSON.stringify([
      { moment: 'Reuniting with Moses after decades apart', reference: 'Exodus 4:27-28', emotional_state: 'Relief and willingness — finally, a mission', source_tier: 'scholarship' },
      { moment: 'Making the golden calf', reference: 'Exodus 32:1-6', emotional_state: 'People-pleasing panic overriding conviction', source_tier: 'canon' },
      { moment: 'Losing his sons Nadab and Abihu', reference: 'Leviticus 10:1-3', emotional_state: 'Stunned silence — the text says he "held his peace"', source_tier: 'canon' },
      { moment: 'Challenging Moses\' authority with Miriam', reference: 'Numbers 12', emotional_state: 'Simmering resentment finally surfacing', source_tier: 'canon' }
    ]),
    faithJourney: `Aaron's faith was shaped almost entirely by proximity — to Moses, to the tabernacle, to God's presence. He didn't have a burning bush moment. He had a brother who came back from the desert with a wild story and a divine commission. Aaron believed it and went. That's worth something. But Aaron's faith was also deeply reactive. When Moses was present, Aaron tracked with the mission. When Moses disappeared up a mountain, Aaron tracked with the crowd.

The death of Nadab and Abihu is the hinge point. Two of his sons offered "unauthorized fire" before the Lord and were killed instantly. Moses gave Aaron a theological explanation, and Aaron said nothing. That silence might be the most profound act of faith in his entire story — not agreement, not understanding, just the decision not to rail against God when God had just taken his children. Aaron's faith never looked like Moses'. It was quieter, more fragile, more dependent. But he wore the ephod until the day he died on Mount Hor, and that counts for something.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 4-40; Leviticus 8-10; Numbers 12, 16-17, 20. The golden calf narrative and the death of Nadab and Abihu are canonical. Aaron\'s emotional state after his sons\' death (silence) is explicitly stated in Leviticus 10:3.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'miriam',
    name: 'Miriam',
    aliases: null,
    gender: 'female',
    tribeClan: 'Levi',
    occupation: 'prophet, worship leader',
    socialStatus: 'senior leader of Israel alongside Moses and Aaron',
    era: 'exodus',
    approximateDates: '~1533–1406 BC (traditional)',
    bioBrief: 'The big sister who watched a basket float down a crocodile river to save her baby brother — and decades later led a nation in worship on the other side of the sea.',
    bioFull: `Miriam was the first person in Moses' story who took initiative, and she did it when she was still a child. She stood on the bank of the Nile and watched her baby brother float in a basket toward an Egyptian princess, and then she walked up and offered to find a Hebrew nurse — Moses' own mother. That's not just courage. That's strategic thinking from a girl who shouldn't have had to think strategically about whether her brother would live or die.

Fast-forward several decades, and Miriam is one of the three leaders of Israel. Micah 6:4 names her alongside Moses and Aaron as someone God sent to lead. After the Red Sea crossing, she grabbed a tambourine and led the women in what might be the oldest song in the Bible. She was a prophet. She was a leader. She was not a footnote.

But Miriam also challenged Moses' authority — specifically, his marriage to a Cushite woman. "Has the Lord spoken only through Moses?" she asked. "Hasn't he also spoken through us?" The punishment was severe: she was struck with a skin disease and excluded from the camp for seven days. Aaron, who participated in the same challenge, was not punished. That disparity has generated centuries of commentary, and none of it is fully satisfying. What's clear is that Miriam hit a wall between her genuine prophetic authority and the limits placed around it.

She died at Kadesh and was buried there. The text notes that immediately after her death, there was no water. The rabbis connected those two facts, and whether or not you accept the tradition of "Miriam's well," the symbolic point holds: when she was gone, something essential dried up.`,
    modernParallel: `Miriam is the woman who co-founded the startup, did the critical early work that made the whole thing possible, and then watched the credit and the authority flow to her brother. She's the senior woman at the firm who has every qualification and still gets told, explicitly or implicitly, that the role she wants isn't really hers to claim. When she pushes back, she gets punished more harshly than the man who pushed back alongside her. If you've ever watched a woman get disciplined for the same behavior a male colleague got a pass on, you've seen Miriam's story playing out in a conference room.`,
    emotionalArc: JSON.stringify([
      { moment: 'Watching baby Moses on the Nile', reference: 'Exodus 2:4-8', emotional_state: 'Terrified vigilance — a child carrying adult-sized stakes', source_tier: 'canon' },
      { moment: 'Leading worship after the Red Sea crossing', reference: 'Exodus 15:20-21', emotional_state: 'Exultant liberation — decades of waiting exploding into song', source_tier: 'canon' },
      { moment: 'Challenging Moses\' authority', reference: 'Numbers 12:1-2', emotional_state: 'Resentment born of genuine grievance meeting genuine overreach', source_tier: 'ai_assisted' },
      { moment: 'Struck with skin disease and exiled from camp', reference: 'Numbers 12:10-15', emotional_state: 'Humiliation, isolation, the particular sting of public punishment', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Miriam's faith was forged in watching. She watched the Nile, she watched Egypt, she watched God move through her brother. By the time she stood on the far shore of the Red Sea with a tambourine, her faith had decades of evidence behind it. She didn't just believe God could deliver — she had personally arranged part of the delivery mechanism when she was barely old enough to do it.

But faith and frustration are not mutually exclusive, and Miriam's challenge to Moses in Numbers 12 wasn't faithlessness — it was a prophet asking why her prophetic voice mattered less than someone else's. God's response was direct and painful. She spent seven days outside the camp. The text doesn't tell us what happened in those seven days, but a prophet in isolation, cut off from the community she helped lead, forced to sit with the raw fact that God had sided with her brother — that's not a small thing. She came back. She continued. And when she died, the water stopped. Whatever her failings, she was load-bearing.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 2:4-8, 15:20-21; Numbers 12; 20:1; Micah 6:4. Miriam\'s role as prophet and leader is canonical. The connection between her death and the water shortage is textual (Numbers 20:1-2), though the "well of Miriam" tradition is rabbinic (Talmud Ta\'anit 9a).',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'pharaoh-of-exodus',
    name: 'Pharaoh of the Exodus',
    aliases: 'Pharaoh; possibly Ramesses II or Amenhotep II (debated)',
    gender: 'male',
    tribeClan: null,
    occupation: 'king of Egypt',
    socialStatus: 'absolute monarch, considered divine in Egyptian religion',
    era: 'exodus',
    approximateDates: '~15th or 13th century BC (debated)',
    bioBrief: 'The most powerful man in the ancient world who kept saying "no" to God until his own stubbornness became the mechanism of his destruction.',
    bioFull: `The Pharaoh of the Exodus is never named in the biblical text, which is itself a statement. In a culture obsessed with immortalizing royal names on every surface, the Bible refuses to grant him one. He's just "Pharaoh" — a title, a function, a cautionary role in someone else's story.

But consider what the narrative actually shows you. Here's a man who genuinely believed he was a god. Not metaphorically — the Egyptian pharaoh was considered the incarnation of Horus, the mediator between the divine and human worlds. When Moses showed up and said "The God of the Hebrews says let my people go," Pharaoh's response — "Who is the Lord, that I should obey him?" — wasn't just arrogance. It was a theological claim. He was asserting his own divinity against an unknown deity of a slave population.

The plagues systematically dismantled that claim. Each plague targeted an Egyptian god. The Nile turns to blood — there goes Hapi. Frogs — there goes Heqet. Darkness — there goes Ra. This wasn't random destruction. It was a theological argument conducted through catastrophe. And Pharaoh kept hardening his heart, or God hardened it for him (the text alternates, and that ambiguity is the point), until the final plague took his firstborn son.

What happened after the Red Sea is almost never discussed. Pharaoh either drowned or returned to a devastated kingdom with his army destroyed, his labor force gone, his economy shattered, and his theological claims in ruins. Either way, his story is about the catastrophic cost of building your identity on a lie about your own power.`,
    modernParallel: `Pharaoh is the CEO who has been told by every metric, every advisor, every market signal that the strategy is failing — and who doubles down because admitting error would mean admitting he's not the visionary he believes himself to be. He's the political leader who watches the consequences of his policy pile up in real human suffering and still won't reverse course because reversal feels like weakness. You've seen this pattern: the person whose identity is so fused with their authority that they will let everything burn before they say "I was wrong."`,
    emotionalArc: JSON.stringify([
      { moment: 'First encounter with Moses', reference: 'Exodus 5:1-2', emotional_state: 'Contemptuous dismissal — a god being bothered by slaves', source_tier: 'canon' },
      { moment: 'Repeated relenting and re-hardening during the plagues', reference: 'Exodus 7-11', emotional_state: 'A cycle of fear breaking through and pride reasserting itself', source_tier: 'canon' },
      { moment: 'Death of his firstborn', reference: 'Exodus 12:29-30', emotional_state: 'The text says he rose in the night and there was "a great cry" — a man finally broken', source_tier: 'canon' },
      { moment: 'Pursuing Israel to the Red Sea', reference: 'Exodus 14:5-9', emotional_state: 'Regret weaponized into rage — he wants them back', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Pharaoh doesn't have a faith journey in the traditional sense — he has an anti-faith journey. He started with total confidence in his own divinity and watched that confidence get dismantled plague by plague. Each time he relented, he experienced something like forced repentance — "I have sinned," he told Moses at one point — but it never stuck. The moment the pressure lifted, the hardness returned.

The theological puzzle of God "hardening Pharaoh's heart" has occupied commentators for millennia. What the narrative seems to show is a feedback loop: Pharaoh hardened his own heart first (the early plagues), and then God confirmed that hardness (the later plagues). It's a portrait of what happens when resistance to truth becomes so habitual that it calcifies into identity. Pharaoh couldn't let Israel go because letting Israel go would mean he wasn't who he thought he was. His theology — "I am a god" — required their slavery. In the end, the Red Sea closed over the army of a man who bet everything on being divine and discovered he wasn't.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 1-14. The pharaoh is unnamed in the text. Identification with Ramesses II (13th century) or Amenhotep II (15th century) depends on the dating of the Exodus, which remains debated among scholars. The alternation between Pharaoh hardening his own heart and God hardening it is a well-documented pattern in the Hebrew text.',
    isNamed: false,
    prominence: 'secondary',
  },

  {
    id: 'jethro',
    name: 'Jethro',
    aliases: 'Reuel; Hobab (possibly)',
    gender: 'male',
    tribeClan: 'Midianite / Kenite',
    occupation: 'priest of Midian, shepherd',
    socialStatus: 'tribal priest and elder; father-in-law of Moses',
    era: 'exodus',
    approximateDates: '~16th–15th century BC (traditional)',
    bioBrief: 'Moses\' father-in-law — a Midianite priest who gave Moses both a wife and the best management advice in the Bible.',
    bioFull: `Jethro is one of the most interesting minor characters in the Bible because he's a pagan priest who is right about almost everything. He took Moses in when Moses was a fugitive. He gave Moses his daughter Zipporah in marriage. He provided forty years of stability in the wilderness before the burning bush ever happened. And then, after the Exodus, he showed up at the Israelite camp and did something remarkable: he watched Moses sit from morning until evening personally adjudicating every dispute in the nation, and he said, "What you're doing is not good."

That's one of the great understatements of Scripture. Moses was burning out in real time, handling everything from property disputes to theological questions, and nobody in Israel had the standing or the nerve to tell him to stop. It took an outsider — a Midianite, not an Israelite — to see the obvious: you need to delegate. Appoint capable leaders over thousands, hundreds, fifties, and tens. Only take the hard cases yourself.

This is the origin of organizational management in the biblical text, and it came from outside the covenant community. Jethro wasn't part of Israel. He worshipped differently. He had no share in the promises made to Abraham. And yet he saw what needed to happen more clearly than anyone inside the system.

After giving his advice, Jethro went home. He didn't stay to claim credit or a position. He just helped, and left. That kind of wisdom — given freely, without self-interest, from an unexpected source — is rarer than prophecy.`,
    modernParallel: `Jethro is the retired executive who sits on the board of a nonprofit and within twenty minutes of observing identifies the structural problem everyone else has been too close to see. He's the outsider consultant — maybe from a completely different industry — who walks in, watches the founder doing everything personally, and says, "You need to build middle management or you're going to collapse." The particular genius of Jethro is that he didn't share Moses' theology, didn't belong to Moses' community, and still had the most practical wisdom in the room. If you've ever gotten your best career advice from someone who doesn't share your background at all, you've met a Jethro.`,
    emotionalArc: JSON.stringify([
      { moment: 'Taking in Moses as a fugitive', reference: 'Exodus 2:20-21', emotional_state: 'Hospitality and pragmatic generosity', source_tier: 'ai_assisted' },
      { moment: 'Hearing about the Exodus and offering sacrifices', reference: 'Exodus 18:9-12', emotional_state: 'Genuine awe — a priest encountering a God more powerful than his own', source_tier: 'canon' },
      { moment: 'Watching Moses judge Israel all day', reference: 'Exodus 18:13-18', emotional_state: 'The clear-eyed concern of someone who recognizes unsustainable leadership', source_tier: 'canon' }
    ]),
    faithJourney: `Jethro's faith journey is fascinating because it crosses religious boundaries. He was a priest of Midian — meaning he served gods that were not the God of Israel. But when he heard what Yahweh had done in Egypt, his response was worship. "Now I know that the Lord is greater than all gods," he said, and he offered burnt offerings. Some scholars read this as a conversion moment. Others see it as a polytheist acknowledging a superior deity. Either way, it's a man whose encounter with evidence changed his theology.

What Jethro models is something the biblical narrative doesn't always make room for: wisdom that comes from outside the faith community. His organizational advice wasn't divinely revealed — it was the product of experience, observation, and common sense. And Moses, the man who talked with God face to face, listened to it. Jethro's faith, whatever its exact contours, was a faith that paid attention to the world as it actually worked. That's its own kind of devotion.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 2:15-22; 3:1; 18:1-27. The multiple names (Jethro, Reuel, Hobab) are a long-standing source-critical question. Jethro\'s sacrifice and declaration in Exodus 18:10-12 are canonical. Whether this constitutes a "conversion" is debated in scholarship.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'zipporah',
    name: 'Zipporah',
    aliases: null,
    gender: 'female',
    tribeClan: 'Midianite / Kenite',
    occupation: 'shepherdess',
    socialStatus: 'daughter of a tribal priest; wife of Moses',
    era: 'exodus',
    approximateDates: '~15th century BC (traditional)',
    bioBrief: 'Moses\' Midianite wife who saved his life on the road to Egypt with a flint knife and a terrifying act of faith she shouldn\'t have had to perform.',
    bioFull: `Zipporah appears in only a handful of verses, but one of them is among the most disturbing scenes in the entire Bible. On the road back to Egypt, God met Moses and sought to kill him. The text doesn't explain why. Zipporah grabbed a flint knife, circumcised their son on the spot, touched Moses' feet with the foreskin, and said, "You are a bridegroom of blood to me." And then God let Moses go.

That passage has confused readers for three thousand years. But whatever the precise theology, the human reality is stark: Zipporah, a Midianite woman who didn't grow up with the covenant of circumcision, performed a violent religious act in a moment of mortal crisis to save her husband's life. She acted decisively when Moses apparently could not. She understood something about this God's demands that Moses had neglected. And her words — "a bridegroom of blood" — carry a weight that suggests she was not entirely at peace with what she'd just done.

After that, Zipporah largely disappears from the main narrative. Moses sent her back to her father's house at some point (the text says Jethro "took" her, Exodus 18:2), and she returned to Moses only when Jethro brought her back after the Red Sea. She's also mentioned obliquely in Numbers 12, where Miriam and Aaron criticize Moses for his "Cushite wife" — which may or may not refer to Zipporah.

She's a woman who married a shepherd who turned out to be a world-historical figure, who performed a terrifying act of emergency faith, and who spent much of her husband's greatest chapter somewhere else. The text doesn't tell us how she felt about any of that.`,
    modernParallel: `Zipporah is the spouse of someone whose career suddenly becomes all-consuming — a calling, a mission, something bigger than the family. She's the military wife who handles everything at home while her partner is deployed, who performs an emergency she shouldn't have had to handle because her partner dropped the ball on something important, and who eventually gets sent back to her parents' house because the mission is too dangerous or too consuming to include her. If you've ever been the person whose partner's vocation swallowed your shared life, and whose critical contributions got compressed into a footnote, you understand Zipporah.`,
    emotionalArc: JSON.stringify([
      { moment: 'Circumcising her son to save Moses', reference: 'Exodus 4:24-26', emotional_state: 'Desperate, blood-soaked determination — doing what must be done with her own hands', source_tier: 'canon' },
      { moment: '"A bridegroom of blood" declaration', reference: 'Exodus 4:25-26', emotional_state: 'Something between revulsion and resolve — this covenant costs', source_tier: 'ai_assisted' },
      { moment: 'Sent back to her father during the Exodus', reference: 'Exodus 18:2', emotional_state: 'The silence of the text here is itself a kind of absence', source_tier: 'conjecture' }
    ]),
    faithJourney: `Zipporah's faith is almost entirely action-based. We don't get her prayers, her theology, or her internal monologue. We get a flint knife and a decision. She married into a covenant she didn't grow up with, and when that covenant's God threatened her husband's life, she didn't freeze or flee — she performed the ritual that satisfied the demand. That's a faith forged in emergency, not contemplation.

What happened to Zipporah's faith after that night on the road? We don't know. She was sent away before the plagues, before the sea, before Sinai. She missed the foundational events of Israel's faith. When she returned, the nation her husband led had been through an experience she hadn't shared. Her faith story is the story of someone on the edges of a massive spiritual movement, connected to it through marriage but not through shared experience. It's a quieter, lonelier kind of faithfulness — the kind that doesn't get a song or a monument.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 2:21-22; 4:24-26; 18:1-6. The "bridegroom of blood" passage (Exodus 4:24-26) is one of the most discussed obscure passages in the Hebrew Bible. Whether the "Cushite wife" in Numbers 12 refers to Zipporah or a second wife is debated.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'joshua',
    name: 'Joshua',
    aliases: 'Yehoshua; Hoshea (original name)',
    gender: 'male',
    tribeClan: 'Ephraim',
    occupation: 'military commander, national leader',
    socialStatus: 'Moses\' aide; successor; conqueror of Canaan',
    era: 'exodus',
    approximateDates: '~1490–1380 BC (traditional)',
    bioBrief: 'Moses\' apprentice who spent forty years learning to lead by watching, and then got the job nobody else in his generation was alive to take.',
    bioFull: `Joshua's story starts in shadows. He was Moses' aide — the Hebrew word suggests something closer to a personal attendant than a general. He fought the Amalekites at Rephidim while Moses held up his hands on the hill. He went partway up Sinai when Moses received the law. He was in the tent of meeting when the glory showed up. He was always nearby, always watching, always second.

When the twelve spies returned from Canaan, Joshua and Caleb were the only two who said, "We can take the land." The other ten saw giants and walled cities. Joshua and Caleb saw the same things but drew a different conclusion. The nation sided with the ten, and that decision cost an entire generation their lives. Joshua and Caleb spent the next forty years walking through a wilderness with people who were all going to die there. Every funeral for the next four decades was a reminder of what the majority's fear had cost.

When Moses died, God told Joshua, "Be strong and courageous" — three times in a single speech. That repetition isn't just rhetorical. It suggests that Joshua needed to hear it, that the man who had waited decades for this role was not brimming with confidence when it finally arrived. He was probably terrified. He was stepping into shoes that belonged to the greatest prophet Israel had ever known, leading a new generation into a land full of fortified cities, starting with Jericho.

Joshua led the conquest, divided the land, and at the end of his life gathered the people and gave them a choice: "Choose this day whom you will serve." And then he said the line that ends up on wall plaques: "As for me and my house, we will serve the Lord." What gets lost is the context — he said it because he wasn't sure the people would choose the same. He knew them. He'd watched one generation die of unbelief. He wasn't naive about the second.`,
    modernParallel: `Joshua is the longtime deputy who finally gets promoted to the top job after the legendary founder retires — and who immediately discovers that having watched someone do it for decades doesn't mean you feel ready to do it yourself. He's the second-generation business leader, the successor CEO, the person who inherits a mission and has to figure out how to make it their own without the charisma and mystique of the original. If you've ever stepped into a role where everyone is comparing you to your predecessor, and your first move had to be a bold one (Jericho), you know what Joshua's first week felt like.`,
    emotionalArc: JSON.stringify([
      { moment: 'One of only two spies to trust God\'s promise', reference: 'Numbers 14:6-9', emotional_state: 'Conviction against overwhelming consensus — and the grief of being ignored', source_tier: 'canon' },
      { moment: 'Commissioning after Moses\' death', reference: 'Joshua 1:1-9', emotional_state: 'The weight of succession — God repeating "be strong" suggests he felt weak', source_tier: 'canon' },
      { moment: 'The fall of Jericho', reference: 'Joshua 6', emotional_state: 'Vindication of a trust held for forty years', source_tier: 'ai_assisted' },
      { moment: 'Final charge to Israel: "Choose this day"', reference: 'Joshua 24:14-15', emotional_state: 'A leader who knows his people well enough to worry about what they\'ll do after he\'s gone', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Joshua's faith was shaped by apprenticeship. He didn't have a singular dramatic encounter with God — he had decades of proximity to someone who did. He watched Moses succeed and fail, rage and intercede, climb Sinai and break tablets. That kind of faith isn't born in a moment; it's absorbed over years. By the time Joshua took command, his faith was the product of everything he'd observed, survived, and waited through.

The forty years of wilderness wandering must have been particularly formative. Joshua had seen the promised land. He knew what it looked like, what it could be. And then he watched an entire generation die without getting there, including Moses. His faith had to survive the prolonged disappointment of knowing the destination and not being able to reach it. When he finally crossed the Jordan, it wasn't just a military campaign — it was the fulfillment of a promise he'd been holding onto since he was young. Joshua's "choose this day" speech at the end of his life has the weight of a man who chose, and chose again, for decades when choosing was hard.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Exodus 17:8-16; 24:13; 33:11; Numbers 13-14; Deuteronomy 31:1-8; Joshua 1-24. Joshua\'s role as Moses\' "minister" (mesharet) and his actions as spy and commander are all canonical.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'caleb',
    name: 'Caleb',
    aliases: null,
    gender: 'male',
    tribeClan: 'Judah (though possibly Kenizzite by ancestry)',
    occupation: 'spy, warrior, tribal leader',
    socialStatus: 'tribal representative; one of two survivors of the Exodus generation',
    era: 'exodus',
    approximateDates: '~1490–1370 BC (traditional)',
    bioBrief: 'The other faithful spy — the eighty-five-year-old who asked for the mountain with the giants on it because he\'d been waiting forty-five years to fight them.',
    bioFull: `Caleb gets overshadowed by Joshua, and that's a shame, because Caleb might be the more interesting of the two faithful spies. Joshua was Moses' protege, groomed for leadership. Caleb was just a tribal representative from Judah — possibly not even fully Israelite by blood, since "Kenizzite" suggests a non-Israelite clan that was absorbed into Judah. He had no special position. He just looked at the land, looked at the giants, and said, "We should go up and take possession of it. We can certainly do it."

The nation nearly stoned him for that opinion. They preferred the report of the ten spies who said the land's inhabitants were too strong, that the Israelites looked like grasshoppers by comparison. Caleb and Joshua tore their clothes in grief, and then they spent the next forty years watching everyone who disagreed with them die.

What makes Caleb remarkable is the end of his story, not the beginning. At eighty-five years old, after the conquest of Canaan was underway, Caleb came to Joshua and said something extraordinary: "I am still as strong today as I was the day Moses sent me out. Give me this hill country that the Lord promised me. The Anakites are there, with large, fortified cities — but the Lord helping me, I will drive them out." He didn't ask for a retirement plot in the valley. He asked for the hard territory. The giants were still there, and he still wanted to fight them.

Caleb "wholly followed the Lord" — that's the phrase the text uses, repeatedly. Not partially, not mostly, not when it was convenient. Wholly. And that wholeness expressed itself not in contemplation but in action: give me the mountain.`,
    modernParallel: `Caleb is the sixty-five-year-old who comes out of retirement to launch a startup in the hardest sector — not because she needs the money, but because there's a problem she's been thinking about for forty years and she still believes she can solve it. He's the veteran teacher who volunteers for the most challenging school in the district because he's spent decades getting ready for exactly that fight. Caleb is anyone who reaches the age when most people are winding down and says, "No, actually — give me the hard thing. I've been preparing for this my whole life."`,
    emotionalArc: JSON.stringify([
      { moment: 'Returning from spying in Canaan', reference: 'Numbers 13:30', emotional_state: 'Bold confidence against the crowd — he silenced the people before Moses', source_tier: 'canon' },
      { moment: 'The nation rejects his report', reference: 'Numbers 14:6-10', emotional_state: 'Grief and outrage — tearing his clothes as the crowd talks about stoning him', source_tier: 'canon' },
      { moment: 'Asking for Hebron at age eighty-five', reference: 'Joshua 14:6-12', emotional_state: 'Undiminished fire — four decades of waiting have not cooled his resolve', source_tier: 'canon' }
    ]),
    faithJourney: `Caleb's faith was defined by the phrase "wholly followed." It's used about him like a title. And the content of that faith was remarkably physical — not mystical visions or prophetic utterances but a stubborn insistence that what God promised, God would deliver, and that Caleb's job was to go take it. His faith was a faith of forward motion.

The forty years of wandering are the untold chapter. Caleb believed the land could be taken, was overruled, and then spent four decades walking in circles with the generation that had overruled him. Every death in the wilderness was a vindication he couldn't have wanted. His faith had to survive not just opposition but the slow, grinding aftermath of opposition — being right and having it not matter for forty years. When he finally asked for Hebron, it was the eruption of a conviction that had been pressurized for nearly half a century. Caleb's faith wasn't patient in the passive sense. It was patient the way a coiled spring is patient.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Numbers 13-14; 32:12; Deuteronomy 1:34-36; Joshua 14:6-15; 15:13-19; Judges 1:12-15. The description of Caleb as Kenizzite (Numbers 32:12; Joshua 14:6) raises questions about his ethnic background that scholars continue to debate.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'korah',
    name: 'Korah',
    aliases: null,
    gender: 'male',
    tribeClan: 'Levi (Kohathite clan)',
    occupation: 'Levite, tabernacle worker',
    socialStatus: 'Levitical leader; instigator of a rebellion',
    era: 'exodus',
    approximateDates: '~15th century BC (traditional)',
    bioBrief: 'The Levite who decided that proximity to the tabernacle wasn\'t enough — he wanted the priesthood too, and the ground opened up.',
    bioFull: `Korah had a legitimate job. As a Kohathite Levite, he was responsible for carrying the most sacred objects of the tabernacle — the ark, the table, the lampstand. He was closer to the holy things than almost anyone in Israel. But it wasn't enough. He wanted the priesthood. He wanted to offer incense. He wanted what Aaron had.

His argument wasn't bad, on the surface. "The whole community is holy, every one of them, and the Lord is with them," he told Moses. "Why do you set yourselves above the Lord's assembly?" That's a reasonable-sounding theological claim: if all of Israel is holy, why should some have more access to God than others? It's the kind of argument that sounds like democracy and humility but is actually driven by ambition dressed in egalitarian clothing.

Moses' response was sharp: "Isn't it enough for you that the God of Israel has separated you from the rest of the Israelite community to bring you near himself — and you're trying to get the priesthood too?" The rebuke lands because it names the real issue: Korah wasn't advocating for the people. He was advocating for himself. He had a significant role and wanted a bigger one, and he used populist language to make his personal ambition sound like a justice cause.

The ground opened and swallowed him, his family, and his followers. Fire consumed the 250 men who offered unauthorized incense. The next day — the very next day — the community grumbled against Moses and Aaron for what had happened. Fourteen thousand seven hundred people died in the resulting plague. Korah's rebellion didn't just destroy him; it triggered a chain reaction of destruction that swept through the nation.`,
    modernParallel: `Korah is the mid-level executive who has genuine talent and a real role but can't stop comparing himself to the C-suite. He frames his ambition as advocacy: "The whole team should have a voice," he says, but what he means is "I should have more power." He's the church elder who challenges the pastor not because the pastor is wrong but because the elder wants the platform. If you've ever watched someone use the language of equality and inclusion to mask a personal power grab — and then watched the fallout damage everyone around them — you've seen Korah's story in modern dress.`,
    emotionalArc: JSON.stringify([
      { moment: 'Rallying 250 leaders against Moses', reference: 'Numbers 16:1-3', emotional_state: 'Righteous-sounding ambition — he believed his own framing', source_tier: 'ai_assisted' },
      { moment: 'Moses\' rebuke: "Isn\'t it enough for you?"', reference: 'Numbers 16:8-11', emotional_state: 'The discomfort of being accurately named', source_tier: 'ai_assisted' },
      { moment: 'The ground opens', reference: 'Numbers 16:31-33', emotional_state: 'Terror — the final, irreversible consequence', source_tier: 'canon' }
    ]),
    faithJourney: `Korah's faith journey is a cautionary story about proximity without satisfaction. He was near the holy things. He carried the ark. He served in the tabernacle. And none of it was enough. His faith, if you can call it that, was faith in his own worthiness — he believed he deserved more access, more authority, more centrality in the worship of God.

The tragedy is that Korah's role was genuinely important. The Kohathites carried the holiest objects in Israel. But comparison is corrosive, and Korah compared his role to Aaron's and found his wanting. His faith didn't fail because he lacked access to God — it failed because he decided that the access he had wasn't prestigious enough. That's a particular kind of spiritual sickness: serving God but resenting the terms. The ground that opened under Korah swallowed a man who had everything except the one thing he believed he was owed.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Numbers 16-17. Korah\'s genealogy, rebellion, and judgment are canonical. Jude 11 references "Korah\'s rebellion" as a type. The Psalms of the "sons of Korah" (Psalms 42, 44-49, 84-85, 87-88) indicate that his descendants survived.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'balaam',
    name: 'Balaam',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'prophet-for-hire, diviner',
    socialStatus: 'renowned seer from Pethor (Mesopotamia)',
    era: 'exodus',
    approximateDates: '~15th or 13th century BC (traditional)',
    bioBrief: 'The pagan prophet whose donkey saw an angel before he did — and who couldn\'t stop blessing Israel even when he was being paid to curse them.',
    bioFull: `Balaam is one of the strangest figures in the Bible because he's a genuine prophet who is also, by almost every indication, a mercenary. Balak, king of Moab, hired him to curse Israel, and Balaam knew enough about the God of Israel to know he couldn't just say whatever Balak wanted. "I can't go beyond the command of the Lord my God," he said — and that phrase "my God" is fascinating, because Balaam wasn't an Israelite. He was a professional seer from Mesopotamia who apparently had a real connection to Yahweh, even though he also practiced divination and was willing to negotiate fees for spiritual services.

The donkey episode is the one everyone remembers. On the road to Moab, Balaam's donkey saw the angel of the Lord blocking the path and refused to move. Balaam beat the donkey three times. Then God opened the donkey's mouth, and it spoke: "What have I done to you to make you beat me these three times?" The humiliation is deliberate — a prophet who can't see what his donkey can see. A man who hears from God but has worse spiritual perception than his pack animal.

When Balaam finally arrived, he opened his mouth to curse Israel and blessings came out instead. Three times Balak set up altars and three times Balaam blessed. The oracles are magnificent poetry: "How can I curse those God has not cursed?" Balak was furious. Balaam was helpless — his mouth belonged to God even when his heart apparently belonged to whoever was paying.

And that's where the story turns dark. Later texts reveal that Balaam, unable to curse Israel directly, advised Moab to seduce Israel into sexual immorality and idol worship. He found the workaround. If you can't curse them with words, corrupt them with strategy. He eventually died by the sword when Israel conquered Midian. The prophet who blessed Israel with his mouth destroyed them with his advice.`,
    modernParallel: `Balaam is the consultant who genuinely knows the right answer but can't stop looking for a way to give the client what they want. He's the lobbyist who understands the policy is bad but keeps finding procedural angles to advance it. He's the advisor who tells you the truth to your face and then helps your competitor behind your back — not because he's evil in some cartoonish way, but because he's fundamentally for sale. If you've ever known someone whose integrity was real but conditional — someone who would tell the truth right up until the moment the money got serious enough — you've met Balaam.`,
    emotionalArc: JSON.stringify([
      { moment: 'Negotiating with Balak\'s messengers', reference: 'Numbers 22:7-20', emotional_state: 'The internal tug between divine constraint and financial desire', source_tier: 'ai_assisted' },
      { moment: 'The donkey speaks', reference: 'Numbers 22:28-30', emotional_state: 'Humiliation — a prophet rebuked by an animal', source_tier: 'canon' },
      { moment: 'Blessing Israel against his employer\'s wishes', reference: 'Numbers 23-24', emotional_state: 'Compulsion — his mouth belongs to God even when his will does not', source_tier: 'canon' },
      { moment: 'Advising Moab to seduce Israel', reference: 'Numbers 31:16; Revelation 2:14', emotional_state: 'The cold calculation of a man who found the loophole', source_tier: 'scholarship' }
    ]),
    faithJourney: `Balaam's faith is the most paradoxical in the Hebrew Bible. He heard from God. He obeyed God's direct commands. He delivered some of the most beautiful prophetic poetry in Scripture. And he was ultimately killed as an enemy of God's people. His faith was real but mercenary — genuine encounter with the divine, combined with an inability to let that encounter override his self-interest.

The arc of Balaam's story is a warning about what happens when spiritual gifting and moral character diverge. He could see the future, but he couldn't master his own greed. He could speak for God, but he couldn't stop working for Balak. His final act — advising Moab on how to corrupt Israel through Moabite women — was the move of someone who had lost any battle between revelation and revenue. Balaam's faith journey ends not with a dramatic fall but with a quiet, strategic betrayal: he couldn't curse Israel with his mouth, so he cursed them with his counsel. It's a story about the difference between knowing God and choosing God.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Numbers 22-24; 31:8, 16; Deuteronomy 23:4-5; Joshua 13:22; 2 Peter 2:15-16; Jude 11; Revelation 2:14. An extra-biblical inscription mentioning "Balaam son of Beor" was found at Deir Alla in Jordan (c. 840-760 BC), confirming his reputation as a seer in the broader ancient Near East.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'rahab',
    name: 'Rahab',
    aliases: null,
    gender: 'female',
    tribeClan: null,
    occupation: 'innkeeper / prostitute',
    socialStatus: 'marginalized Canaanite woman in Jericho',
    era: 'exodus',
    approximateDates: '~15th or 13th century BC (traditional)',
    bioBrief: 'A Canaanite prostitute who bet her entire family\'s survival on a God she\'d only heard rumors about — and ended up in the genealogy of Jesus.',
    bioFull: `Rahab's house was built into the wall of Jericho, which tells you everything about her social position. She was literally on the margins — her home was the city's skin, not its center. The text calls her a "zonah," which most translations render as prostitute, though some scholars argue for innkeeper. Either way, she was not a person of status in Canaanite society. She was useful, visible, and disposable.

When Joshua's two spies came to Jericho, they went to Rahab's house. When the king's men came looking, she hid the spies under flax stalks on her roof and lied about their whereabouts. Then she made her move: "I know that the Lord has given you this land," she told them. She'd heard about the Red Sea. She'd heard about the victories east of the Jordan. And she drew a conclusion that no one else in Jericho drew: this God is real, and this army is going to win, and I need to be on the right side of what's coming.

Her theology in that moment is raw and practical: "The Lord your God is God in heaven above and on the earth below." That's not sophisticated doctrine. That's a survival assessment that also happens to be true. She negotiated for her family's safety — a scarlet cord in the window, and everyone inside her house would live. She chose well. The walls fell, but Rahab's section held. Or rather, Rahab's family was extracted before the destruction. The woman on the margins was saved from the center's collapse.

The afterlife of Rahab's story is extraordinary. She married Salmon, an Israelite. She became the mother of Boaz, the great-grandmother of David, and an ancestor of Jesus. Matthew's genealogy names her explicitly. A Canaanite prostitute in the bloodline of the Messiah. If you want to understand what the Bible means by grace, start there.`,
    modernParallel: `Rahab is the undocumented immigrant who sees which way the political winds are blowing before the pundits do and makes a decision that saves her family when everyone around her is still in denial. She's the woman with the wrong resume, the wrong background, the wrong reputation, who reads the situation more accurately than the respectable people at the city center and acts while they're still debating. If you've ever watched someone from the margins — someone the system had written off — make the one smart move that everyone else missed, you've seen Rahab.`,
    emotionalArc: JSON.stringify([
      { moment: 'Hiding the spies and lying to the king\'s men', reference: 'Joshua 2:1-7', emotional_state: 'Calculated terror — one wrong word and her whole family dies', source_tier: 'ai_assisted' },
      { moment: 'Confessing faith in Israel\'s God', reference: 'Joshua 2:9-11', emotional_state: 'A survival instinct that has crossed into genuine conviction', source_tier: 'canon' },
      { moment: 'Waiting inside the house with the scarlet cord', reference: 'Joshua 6:22-25', emotional_state: 'The unbearable suspense of trusting a promise from strangers while the walls come down', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Rahab's faith started as information and became conviction. She heard the reports — the Red Sea, the victories, the unstoppable advance — and she did what the rest of Jericho didn't do: she let the evidence change her. "I know that the Lord has given you this land" is not a statement of hope. It's a statement of assessment. She looked at the data and drew the right conclusion while an entire city stayed frozen in denial.

But faith-as-assessment only gets you so far. The scarlet cord in the window is where assessment became trust. Rahab had to stay inside her house, on the wall of a city that was about to be destroyed, and believe that two foreign spies would keep their word. That's not abstract belief. That's betting your mother, your father, your siblings, and yourself on a promise from people you met once. The book of Hebrews puts her in the faith hall of fame, right alongside Abraham and Moses. James uses her as his example of faith that works. The most unlikely candidate for faith in the whole conquest narrative turned out to have more of it than anyone else in her city.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Joshua 2; 6:17-25; Matthew 1:5; Hebrews 11:31; James 2:25. Rahab\'s placement in Jesus\' genealogy (Matthew 1:5) is canonical. The identification of Rahab in Matthew with the Rahab of Joshua is the traditional reading, though some scholars question it.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'phinehas',
    name: 'Phinehas',
    aliases: 'Pinchas',
    gender: 'male',
    tribeClan: 'Levi (grandson of Aaron)',
    occupation: 'priest',
    socialStatus: 'priestly heir; grandson of Aaron the high priest',
    era: 'exodus',
    approximateDates: '~15th century BC (traditional)',
    bioBrief: 'Aaron\'s grandson who stopped a plague by driving a spear through an Israelite man and a Midianite woman in the act — and God called it righteous zeal.',
    bioFull: `Phinehas' defining moment is violent, and there's no way to make it comfortable. While Israel was at Shittim, Israelite men began having sexual relations with Moabite women and worshipping their gods. A plague broke out. While Moses and the leaders were weeping at the entrance to the tent of meeting, an Israelite man brazenly brought a Midianite woman into his tent, in full view of everyone. Phinehas got up, took a spear, followed them into the tent, and drove the spear through both of them. The plague stopped. Twenty-four thousand had died.

God's response to Phinehas was a covenant of peace and a permanent priesthood: "He was zealous for my God and made atonement for the Israelites." That's jarring to modern ears. A violent act is called atonement. A killing is rewarded with peace. The text is not asking you to be comfortable with it. It's asking you to understand the context: Israel was disintegrating, the plague was active, and Phinehas acted when everyone else — including Moses — was paralyzed by grief.

What's interesting about Phinehas is that his zeal didn't become a pattern of violence. He later served as a diplomat, sent to negotiate with the eastern tribes when they built an altar by the Jordan and the western tribes feared it meant apostasy. Phinehas investigated, listened, and resolved the conflict without bloodshed. The same man who used a spear at Shittim used words at the Jordan.

His legacy is complicated. Some traditions celebrate him as the model of righteous zeal. Others use him as a cautionary tale about religious violence. The text itself doesn't moralize — it reports what he did, reports God's response, and moves on. What you do with Phinehas says a lot about what you believe about the intersection of holiness and force.`,
    modernParallel: `Phinehas is the person in an organization who takes drastic, unilateral action during a crisis — the whistleblower who goes public without authorization, the officer who breaks protocol because the protocol isn't stopping the immediate harm. Sometimes that person is celebrated as a hero. Sometimes they're fired. Sometimes both. Phinehas forces a question that modern institutions constantly wrestle with: when does individual action in a crisis become justified, and who gets to decide? He's also the reminder that the same person capable of decisive force can also be capable of careful diplomacy — if the situation calls for it.`,
    emotionalArc: JSON.stringify([
      { moment: 'Seeing the Israelite man bring the Midianite woman into camp', reference: 'Numbers 25:6-8', emotional_state: 'Righteous fury catalyzed by public defiance during a plague', source_tier: 'canon' },
      { moment: 'God\'s covenant of peace', reference: 'Numbers 25:10-13', emotional_state: 'Vindication — his zeal was recognized, not punished', source_tier: 'canon' },
      { moment: 'Diplomatic mission to the eastern tribes', reference: 'Joshua 22:13-34', emotional_state: 'Measured restraint — the zealot as peacemaker', source_tier: 'canon' }
    ]),
    faithJourney: `Phinehas' faith expressed itself primarily through action, and specifically through an intolerance for the things he believed threatened the covenant. He grew up in the priestly family — Aaron's grandson — and he internalized the holiness code at a visceral level. When he saw the covenant being violated in the most public, brazen way possible, he didn't deliberate. He acted. That immediacy is either inspiring or terrifying, depending on how you read it.

But Phinehas' faith matured beyond the spear. His later role as a diplomatic envoy suggests a man who learned that zeal has more than one expression. At the Jordan, he could have assumed the worst about the eastern tribes' altar and led a punitive expedition. Instead, he investigated. He listened. He accepted the explanation and prevented a civil war. The faith of the young man with the spear became the faith of an older man with discernment. That development — from zeal to wisdom, from action to investigation — is itself a kind of spiritual growth that the text presents without fanfare but with clear approval.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Numbers 25:1-18; Joshua 22:13-34; Judges 20:28; Psalm 106:30-31. Phinehas\' "covenant of peace" and permanent priesthood are canonical. His diplomatic role in Joshua 22 is often overlooked but textually explicit.',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────────────────────────
  // JUDGES ERA (11 characters)
  // ─────────────────────────────────────────────

  {
    id: 'deborah',
    name: 'Deborah',
    aliases: null,
    gender: 'female',
    tribeClan: 'Ephraim (held court in Ephraim\'s hill country)',
    occupation: 'judge, prophet, military strategist',
    socialStatus: 'national leader and arbiter; one of the major judges',
    era: 'judges',
    approximateDates: '~12th century BC',
    bioBrief: 'The only judge who was also a prophet, and the only one people actually came to for wisdom voluntarily. She led from under a palm tree and won a war.',
    bioFull: `Deborah is unusual among the judges because she wasn't raised up in a crisis — she was already leading when the crisis came. People came to her for judgment between Ramah and Bethel, sitting under a palm tree. She wasn't a guerrilla fighter or a warlord. She was a sitting judge whose authority was recognized because she was wise, not because she had an army. In a period defined by chaos and cyclical failure, Deborah represented something rare: legitimate, trusted governance.

When the military crisis came — Jabin king of Canaan and his general Sisera, with nine hundred iron chariots — Deborah didn't pick up a sword. She summoned Barak, the military commander, and told him, "The Lord, the God of Israel, commands you: go, take ten thousand men and draw Sisera out." That's not a suggestion. That's a prophetic command delivered with the authority of someone who knows she speaks for God.

Barak's response is famous: "If you go with me, I'll go. If you don't go with me, I won't go." Deborah agreed, but she also warned him: "The honor will not be yours, for the Lord will deliver Sisera into the hands of a woman." That prophecy was fulfilled not by Deborah but by Jael, a Kenite woman who drove a tent peg through Sisera's skull. The battle was won by a prophet who strategized it, a general who needed her presence to fight it, and a non-Israelite woman who finished it with a hammer.

Deborah's victory song in Judges 5 is one of the oldest pieces of Hebrew poetry. It's fierce, triumphant, and unflinching. She celebrates Jael as "most blessed of women" and delivers a devastating final image: Sisera's mother waiting at the window for a son who will never come home. Deborah saw the full human cost of war — on both sides — and sang about it anyway.`,
    modernParallel: `Deborah is the woman who runs the organization everyone turns to for the hard decisions — not because she has the biggest budget or the most direct reports, but because she's the one who actually knows what to do. She's the senior partner, the experienced judge, the strategist who doesn't need to be in the field because she understands the field better than the people standing in it. When Barak says "I won't go without you," he's every male leader who has privately admitted that the smartest person in the room is the woman he's supposedly in charge of.`,
    emotionalArc: JSON.stringify([
      { moment: 'Summoning Barak with a divine command', reference: 'Judges 4:6-7', emotional_state: 'Confident authority — she speaks as God\'s mouthpiece without hesitation', source_tier: 'canon' },
      { moment: 'Barak refuses to go without her', reference: 'Judges 4:8-9', emotional_state: 'Something between exasperation and resolve — fine, I\'ll go, but you\'re losing the credit', source_tier: 'ai_assisted' },
      { moment: 'Singing the victory song', reference: 'Judges 5', emotional_state: 'Fierce exultation that encompasses both triumph and the grief of war', source_tier: 'canon' },
      { moment: 'Describing Sisera\'s mother at the window', reference: 'Judges 5:28-30', emotional_state: 'Unsentimental recognition of the enemy\'s humanity', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Deborah's faith is notable for its lack of drama. She didn't have a crisis of belief or a dramatic call narrative. She simply exercised prophetic authority as though it were the most natural thing in the world. Her faith was operational — it expressed itself through decisions, commands, and the confidence to tell a military commander what God had said. In a period when Israel's faith was cyclical (sin, suffering, crying out, deliverance, repeat), Deborah was a fixed point.

Her song in Judges 5 is the fullest expression of her faith: a God who fights from the heavens, who causes stars and rivers to join the battle, who uses unlikely people — a woman with a tent peg — to accomplish decisive victories. Deborah's faith wasn't a fragile thing she protected. It was a working tool she used to lead, strategize, and judge. She trusted God the way a surgeon trusts a scalpel: completely, practically, and without sentiment.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 4-5. The Song of Deborah (Judges 5) is widely regarded by scholars as one of the oldest texts in the Hebrew Bible, possibly dating to the 12th century BC. Deborah\'s dual role as judge and prophet is explicitly stated in Judges 4:4.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'barak',
    name: 'Barak',
    aliases: null,
    gender: 'male',
    tribeClan: 'Naphtali',
    occupation: 'military commander',
    socialStatus: 'tribal leader; commanded Israel\'s forces under Deborah',
    era: 'judges',
    approximateDates: '~12th century BC',
    bioBrief: 'The general who won the battle but lost the credit because he wouldn\'t go to war without the prophet — and Hebrews still lists him as a hero of faith.',
    bioFull: `Barak gets an unfair reputation as the man who was too afraid to fight without a woman holding his hand. That's a lazy reading. What actually happened is more interesting. Deborah summoned him and delivered a prophetic command: God says take ten thousand men to Mount Tabor, and I will draw Sisera out to the Kishon River and give him into your hands. Barak's response — "If you go with me, I'll go" — isn't necessarily cowardice. It might be a commander insisting that the prophet who delivered the battle plan be present to provide ongoing divine guidance. In the ancient world, going to battle without your prophet was foolish, not brave.

That said, Deborah's reply makes it clear that his insistence came at a cost: "The honor will not be yours." The victory would be attributed to a woman. And it was — not to Deborah, but to Jael, the Kenite woman who killed Sisera with a tent peg. Barak arrived at Jael's tent to find his enemy already dead on the floor.

What's easy to miss is that Barak actually fought well. He led ten thousand men down Mount Tabor against nine hundred iron chariots and won decisively. The text says the Lord routed Sisera's army — a rainstorm apparently turned the Kishon River into a flood that bogged down the chariots. Barak's military execution was excellent. His faith needed a crutch, but his generalship didn't.

The book of Hebrews includes Barak in its hall of faith, right alongside Gideon, Samson, David, and Samuel. Whatever his hesitation, it didn't disqualify him. He's an example of faith that is real but not complete — the kind that needs support to function, that doesn't look heroic but still shows up.`,
    modernParallel: `Barak is the project lead who says, "I'll take this on, but I need the expert in the room with me." He's the new CEO who insists the outgoing founder stay on as an advisor for the first year. There's a fine line between wise humility and disqualifying insecurity, and Barak walks right along it. His story is for anyone who has done the hard thing but needed someone beside them to do it — and who then watched the credit go elsewhere. You won the battle. Someone else got the headline. And the question is whether you can live with that.`,
    emotionalArc: JSON.stringify([
      { moment: 'Refusing to go without Deborah', reference: 'Judges 4:8', emotional_state: 'A mixture of faith and dependency — he believes the prophecy but needs the prophet', source_tier: 'ai_assisted' },
      { moment: 'Leading the charge down Mount Tabor', reference: 'Judges 4:14-16', emotional_state: 'Committed action once the decision is made — no hesitation in battle', source_tier: 'canon' },
      { moment: 'Finding Sisera already dead in Jael\'s tent', reference: 'Judges 4:22', emotional_state: 'The quiet deflation of arriving one step too late for the defining moment', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Barak's faith was real enough to make Hebrews 11 but qualified enough to cost him the honor. He believed Deborah's prophecy — he went to war on the strength of it — but he couldn't fully own the risk. He needed the prophet present, physically, to anchor his courage. That's a kind of faith the Bible doesn't condemn but also doesn't celebrate without reservation.

What Barak demonstrates is that faith doesn't have to be pristine to be counted. He shows up in the same list as Abraham, Moses, and David — people whose faith was also imperfect, also mixed with fear and failure. Barak went to war. He fought. He won. And he accepted the diminished credit without, as far as the text tells us, complaint. There's a faith in that too — the faith of someone who does the job even when the glory goes to someone else. It's not the faith of the hero. It's the faith of the professional.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 4-5; Hebrews 11:32. Barak\'s inclusion in the Hebrews 11 faith roll call is notable given the ambiguity of his portrayal in Judges. The Song of Deborah (Judges 5) names Barak as co-participant in the victory.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'gideon',
    name: 'Gideon',
    aliases: 'Jerub-Baal ("let Baal contend")',
    gender: 'male',
    tribeClan: 'Manasseh (Abiezrite clan)',
    occupation: 'farmer, judge, military leader',
    socialStatus: 'youngest son of a minor clan; became national deliverer',
    era: 'judges',
    approximateDates: '~12th century BC',
    bioBrief: 'The guy who was threshing wheat in a winepress to hide from the Midianites when God called him "mighty warrior" — and who kept asking for more proof.',
    bioFull: `When the angel of the Lord found Gideon, he was threshing wheat in a winepress. You thresh wheat on a hilltop, where the wind separates chaff from grain. You use a winepress when you're hiding. Gideon was hiding his food production from the Midianites, who had been raiding Israel's harvest for seven years. The angel's greeting — "The Lord is with you, mighty warrior" — is either the most encouraging thing anyone has ever said or the most ironic.

Gideon's immediate response was essentially: "If the Lord is with us, why is all this happening?" It's one of the most honest questions in the Bible. Gideon wasn't being rhetorical. He wanted an answer. The Midianites were everywhere. The crops were being stolen. The nation was starving. And this angel shows up calling him a warrior while he's cowering in a pit with his wheat.

What followed was a slow, painful process of God reducing Gideon's options until he had to trust. The first army of thirty-two thousand was too big. God cut it to ten thousand. Still too big. God cut it to three hundred. Three hundred men with torches and jars against an army "thick as locusts." The whole point was to make the victory unmistakably God's, not Gideon's. And it worked — the Midianite army panicked and destroyed itself in the confusion.

But Gideon's story doesn't end at the battle. He made a golden ephod from the spoils, and "all Israel prostituted themselves by worshipping it." The deliverer became the source of a new idolatry. He also accumulated seventy sons by many wives and a concubine's son named Abimelech, who would eventually murder all but one of his brothers and seize power. Gideon's personal life after the victory was a slow unraveling that set up the next cycle of disaster. The hero of the winepress couldn't manage the peace.`,
    modernParallel: `Gideon is the accidental founder — the person who starts a movement or a company not because they had a grand vision but because they were just trying to survive and got drafted into something bigger. He's the reluctant activist who keeps asking "Are you sure I'm the right person for this?" and needs signs and confirmations and still isn't fully confident. But he does the thing. And then, after the big win, he can't handle the success. He's the startup founder who disrupts an industry and then makes terrible personal decisions that undermine everything he built. The victory was real. So was the mess that came after.`,
    emotionalArc: JSON.stringify([
      { moment: 'Threshing wheat in the winepress', reference: 'Judges 6:11-13', emotional_state: 'Fear-driven hiding masked by a blunt theological question', source_tier: 'canon' },
      { moment: 'Testing God with the fleece — twice', reference: 'Judges 6:36-40', emotional_state: 'Genuine faith fighting genuine doubt — he needs proof, and asks for it', source_tier: 'canon' },
      { moment: 'Overhearing the Midianite soldier\'s dream', reference: 'Judges 7:13-15', emotional_state: 'The moment fear broke — he worshipped and then attacked', source_tier: 'canon' },
      { moment: 'Making the golden ephod', reference: 'Judges 8:24-27', emotional_state: 'Victory\'s corruption — success becoming a snare', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Gideon's faith was built on negotiation. He didn't accept the call and move. He tested, questioned, demanded proof, and then tested again. The fleece episodes are sometimes held up as models of discernment, but they're actually portraits of a man who needed to see something before he could believe it. God's patience with that process is itself remarkable — no rebuke, no impatience, just the wet fleece and the dry fleece, one more piece of evidence for a man who couldn't proceed without it.

The pivot point was the overheard dream. Standing outside the Midianite camp at night, Gideon heard a soldier describe a dream of a barley loaf tumbling into the camp and flattening a tent, and his companion interpreted it as Gideon's coming victory. Something shifted. Gideon worshipped — the first time in the narrative — and then went straight into battle. His faith moved from negotiation to action. But faith that peaks in a military victory and then produces a golden ephod is faith that didn't transfer from the battlefield to everyday life. Gideon trusted God to win the war and then couldn't trust God with the peace. That gap between crisis faith and daily faith is more common than anyone wants to admit.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 6-8. All major events — the winepress, the fleece, the reduction of the army, the battle, the ephod — are canonical. Gideon\'s other name, Jerub-Baal, is explained in Judges 6:32.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'samson',
    name: 'Samson',
    aliases: 'Shimshon',
    gender: 'male',
    tribeClan: 'Dan',
    occupation: 'judge (Nazirite from birth)',
    socialStatus: 'divinely appointed deliverer; Nazirite',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The strongest man in the Bible who couldn\'t control himself — a one-man wrecking crew whose greatest enemy was always his own appetites.',
    bioFull: `Samson is the judge who makes everyone uncomfortable because he doesn't fit the template. He wasn't a wise leader. He didn't rally an army. He didn't have a moment of devout faith that launched a military campaign. He was a supernaturally strong loner who killed Philistines mostly because they personally offended him. His entire career as a judge was driven by personal grudges, sexual desire, and rage — and the text says, repeatedly, that the Spirit of the Lord came upon him during these episodes.

He was set apart before birth. A Nazirite — no wine, no unclean food, no razor on his head. His mother received the announcement from an angel. Everything about his origin says "sacred purpose." And then he grew up and spent his life violating every boundary his consecration implied. He pursued Philistine women. He ate honey from a lion's carcass (touching a dead body violated the Nazirite vow). He attended drinking feasts. The only vow he kept was the hair — and even that, he eventually gave away.

Delilah is the headline, but she was the culmination, not the cause. Samson had been revealing his weaknesses to women and paying the price for it long before Delilah. His first wife in Timnah extracted the riddle answer from him through tears. The pattern was established: Samson was undone by intimacy. Not by Philistine armies, not by physical combat, but by the vulnerability of desire. He could tear a lion apart with his bare hands but couldn't keep a secret from a woman he wanted.

The final scene is devastating. Blind, grinding grain in a Philistine prison, brought out to entertain his captors at a temple feast — and then, hair grown back, one final prayer: "Let me die with the Philistines." He pushed the pillars. The temple collapsed. He killed more people in his death than in his life. It's simultaneously a moment of faith and a suicide. Samson's last act was exactly like his whole life: glorious and tragic at the same time.`,
    modernParallel: `Samson is the phenomenally talented athlete or artist who can do things nobody else can do and who is systematically destroyed by the appetites that come with the talent. He's the rock star, the championship quarterback, the prodigy — someone whose gifts are undeniable and whose self-destructive patterns are equally undeniable. Everyone around him can see the crash coming except him. His story is on the front page of the sports section every few years: incredible talent, terrible judgment, a long fall, and a final act that's hard to categorize as either redemption or waste.`,
    emotionalArc: JSON.stringify([
      { moment: 'Tearing the lion apart with bare hands', reference: 'Judges 14:5-6', emotional_state: 'Raw, unprocessed power — the Spirit rushes in and violence erupts', source_tier: 'canon' },
      { moment: 'Betrayed by his Timnite wife', reference: 'Judges 14:16-17', emotional_state: 'Rage born of emotional vulnerability — he gave in and was humiliated', source_tier: 'canon' },
      { moment: 'Delilah extracts the secret of his strength', reference: 'Judges 16:15-17', emotional_state: 'Exhaustion, capitulation — he\'s tired of fighting her and tells her everything', source_tier: 'canon' },
      { moment: 'Grinding grain blind in the Philistine prison', reference: 'Judges 16:21', emotional_state: 'The crushing humiliation of a strong man made helpless', source_tier: 'ai_assisted' },
      { moment: 'Final prayer and death', reference: 'Judges 16:28-30', emotional_state: 'A desperate combination of faith, revenge, and resignation', source_tier: 'canon' }
    ]),
    faithJourney: `Samson's faith is the most confusing in the book of Judges because it coexists so completely with disobedience. The Spirit of the Lord came upon him repeatedly, empowering acts that were driven by personal vendetta, not national deliverance. He prayed — at the jawbone of the donkey when he was thirsty, and in the Philistine temple at the end — but his prayers were about his own needs, not Israel's. And yet Hebrews 11 names him as a hero of faith. The Bible seems to insist that Samson's faith was real, even though it was tangled up in everything else he was.

The prison was where something changed, or at least clarified. Samson in the prison was Samson without options, without strength, without the hair that symbolized his consecration. Whatever happened in his interior life during those months of grinding grain, it produced a final prayer that the author of Judges treats as genuine: "Sovereign Lord, remember me. Please, God, strengthen me just once more." It's the prayer of a man who wasted everything and knows it. Samson's faith journey is the story of a person who had every spiritual advantage, squandered them all, and then, at the very end, with nothing left, turned back to the God he'd spent a lifetime ignoring. Whether that's redemption or tragedy depends on how you define both words.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 13-16; Hebrews 11:32. Samson\'s Nazirite status, exploits, and death are all canonical. His inclusion in Hebrews 11 confirms the NT perspective that his faith, however flawed, was genuine.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'delilah',
    name: 'Delilah',
    aliases: null,
    gender: 'female',
    tribeClan: null,
    occupation: 'unknown (possibly courtesan)',
    socialStatus: 'woman in the Valley of Sorek; associate of the Philistine lords',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The woman who extracted Samson\'s secret — not through seduction alone, but through relentless emotional pressure until he broke.',
    bioFull: `Delilah is usually reduced to "the temptress," but the text shows something more calculated and more human than that. The Philistine lords came to her with a specific assignment: find out the source of Samson's strength. They offered eleven hundred pieces of silver each — five lords, so fifty-five hundred pieces total. That's an enormous sum. Delilah wasn't seduced into betrayal. She was hired for it. This was a business transaction.

Her method wasn't sexual, at least not primarily. She asked. Directly. "Tell me the secret of your great strength." Samson lied three times — bowstrings, new ropes, weaving his hair into a loom. Each time, Delilah tested the answer by calling in the Philistines, and each time Samson broke free. And each time, she came back with the same question. The text records her words: "How can you say 'I love you' when you won't confide in me?"

That line is devastating because it weaponizes intimacy. She used the language of relationship to extract tactical intelligence. And here's the uncomfortable part: it worked. Samson told her. He "told her everything." Not because she overpowered him — because she outlasted him. "She prodded him day after day until he was sick to death of it." Samson's supernatural strength had no defense against relentless emotional manipulation. The strongest man in the world was worn down by a woman who wouldn't stop asking.

Delilah called the barber, held Samson's head in her lap while his hair was shaved, and then woke him up with the words "Samson, the Philistines are upon you." There's no indication she felt conflicted. The text presents her as someone who did a job and collected the payment. She disappears from the narrative after that. We don't know what she did with the money or what she thought about the blind man grinding grain in the prison. The Bible gives her no redemption arc and no condemnation speech. She was effective. That's all the text says.`,
    modernParallel: `Delilah is the person who is paid — literally or figuratively — to extract information from someone who trusts them. She's the corporate spy who builds a genuine-seeming relationship to get trade secrets. She's the handler who exploits an asset's emotional needs for intelligence. But she's also something simpler and more common: the person in a relationship who uses emotional pressure as a tool of control. "If you really loved me, you'd tell me." If you've been in a relationship where vulnerability was weaponized — where your trust was treated as a resource to be mined — you've been in Samson's position. The question Delilah raises isn't about gender. It's about what happens when intimacy becomes transactional.`,
    emotionalArc: JSON.stringify([
      { moment: 'Accepting the Philistine lords\' commission', reference: 'Judges 16:4-5', emotional_state: 'Calculating pragmatism — she sees the opportunity and takes it', source_tier: 'ai_assisted' },
      { moment: 'Repeated failures as Samson lies', reference: 'Judges 16:6-14', emotional_state: 'Frustration channeled into persistence — she doesn\'t quit', source_tier: 'ai_assisted' },
      { moment: '"How can you say you love me?"', reference: 'Judges 16:15', emotional_state: 'Weaponized emotion — the language of intimacy deployed as leverage', source_tier: 'canon' },
      { moment: 'Samson\'s hair is cut in her lap', reference: 'Judges 16:19', emotional_state: 'Cold efficiency — the mission is accomplished', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Delilah doesn't have a faith journey in any conventional sense. The text doesn't tell us what she believed, what gods she worshipped, or whether she had any spiritual framework at all. She's defined entirely by her actions, and those actions are transactional. She was offered money, she did the work, she collected the payment.

What Delilah's story reveals about faith is indirect: she's the environmental pressure that tested Samson's consecration and found it wanting. She didn't overcome his strength — she circumvented it. She didn't fight his faith — she ignored it and targeted his need for human connection instead. In that sense, Delilah is a mirror for any force that doesn't attack belief directly but erodes it through relentless, intimate pressure. She didn't argue Samson out of his Nazirite vow. She nagged him out of it. And that turned out to be far more effective.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 16:4-21. Delilah is named in the text but her ethnic background (Philistine or Israelite) is never specified. The Valley of Sorek was on the border between Israelite and Philistine territory.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'jephthah',
    name: 'Jephthah',
    aliases: null,
    gender: 'male',
    tribeClan: 'Gilead (Manasseh, east of the Jordan)',
    occupation: 'outlaw leader, judge',
    socialStatus: 'son of a prostitute; expelled from his family; became a military leader and judge',
    era: 'judges',
    approximateDates: '~12th century BC',
    bioBrief: 'The outcast son of a prostitute who became a warrior, made a terrible vow, and paid for it with the only person he loved.',
    bioFull: `Jephthah's story begins with rejection. He was the son of Gilead and a prostitute, and his legitimate half-brothers drove him out of the family: "You're not going to get any inheritance in our family, because you are the son of another woman." He fled to the land of Tob and became the leader of a band of "worthless fellows" — adventurers, outcasts, the kind of men who follow someone with nothing to lose. He was essentially a warlord on the margins.

When the Ammonites attacked Gilead, the elders who had expelled Jephthah came crawling back. "Come, be our commander." Jephthah's response is bitter and pointed: "Didn't you hate me and drive me from my father's house? Why do you come to me now, when you're in trouble?" It's the eternal dynamic: the person the community rejects becomes the person the community needs. Jephthah negotiated hard — he would lead them only if they made him head of Gilead permanently, not just for the battle. They agreed.

Jephthah tried diplomacy first, sending messengers to the Ammonite king with a detailed historical argument about Israel's right to the land. It's a surprisingly sophisticated legal brief from a man dismissed as a bandit. When diplomacy failed, he fought and won. But before the battle, he made a vow: "Whatever comes out of the door of my house to meet me when I return in triumph, I will sacrifice it as a burnt offering."

His daughter came out first. Dancing, tambourines. His only child. "When he saw her, he tore his clothes. 'Oh no, my daughter! You have brought me very low.'" The text is ambiguous about whether he actually sacrificed her or devoted her to perpetual virginity, and scholars have argued both sides for centuries. What's not ambiguous is the devastation. Jephthah's vow was reckless, and the cost fell on the person who had done nothing wrong. The warrior who negotiated for power couldn't negotiate his way out of his own words.`,
    modernParallel: `Jephthah is the kid from the wrong side of town who gets kicked out of the family, builds something on his own in rough circumstances, and then gets called back the moment the family needs muscle. He's the estranged sibling who gets the phone call: "We know we cut you off, but Dad's in the hospital and you're the only one who can handle this." The vow is the part that makes his story a tragedy: it's the leader who makes a rash promise in the heat of a campaign — a commitment, a pledge, a public declaration — and then discovers that keeping it will cost something he never intended to pay. If you've ever watched someone's ambition or determination produce a promise that destroyed something they loved, you've seen Jephthah's story.`,
    emotionalArc: JSON.stringify([
      { moment: 'Expelled by his brothers', reference: 'Judges 11:1-3', emotional_state: 'The foundational wound — rejection by the people who should have claimed him', source_tier: 'canon' },
      { moment: 'Confronting the elders who exiled him', reference: 'Judges 11:7', emotional_state: 'Bitter vindication — they need him now', source_tier: 'canon' },
      { moment: 'Making the vow', reference: 'Judges 11:30-31', emotional_state: 'Desperation disguised as devotion — trying to guarantee God\'s favor', source_tier: 'ai_assisted' },
      { moment: 'His daughter emerges from the house', reference: 'Judges 11:34-35', emotional_state: 'The worst moment in the book of Judges — a man destroyed by his own words', source_tier: 'canon' }
    ]),
    faithJourney: `Jephthah's faith was shaped by scarcity. Everything he had, he fought for. Nothing was given. When he turned to God before the Ammonite battle, his instinct was to bargain — "If you give me the victory, I will give you..." That's the faith of someone who has never received anything freely and doesn't believe in unconditional gifts. Jephthah's vow is often read as piety, but it reads more like a transaction: a man trying to guarantee an outcome by raising the stakes of the offering.

The aftermath of the vow reveals a man trapped between what he believed about God's demands and what he felt as a father. "I have opened my mouth to the Lord, and I cannot take back my vow." That rigidity — the inability to imagine that God might not want what the vow promised — is its own kind of theological failure. Jephthah knew enough about God to pray, to vow, to credit God with the victory. But he didn't know God well enough to understand that God doesn't require the sacrifice of children. His faith was real, but it was deformed by a life of scarcity, rejection, and the persistent belief that nothing good comes without an exorbitant price.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Judges 11-12; Hebrews 11:32. The debate over whether Jephthah literally sacrificed his daughter or devoted her to lifelong virginity remains unresolved in scholarship. The text (Judges 11:39) says "he did to her as he had vowed" and that "she knew no man," which supports both readings.',
    isNamed: true,
    prominence: 'secondary',
  },

  {
    id: 'ruth',
    name: 'Ruth',
    aliases: null,
    gender: 'female',
    tribeClan: 'Moabite (married into Judah)',
    occupation: 'gleaner, farm laborer',
    socialStatus: 'foreign widow; became ancestress of King David',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'A Moabite widow who chose her mother-in-law\'s people and her mother-in-law\'s God — and whose loyalty set in motion the line of David.',
    bioFull: `Ruth's story begins with three funerals. Her father-in-law, Elimelech, died in Moab. Then her husband, Mahlon, died. Then her brother-in-law, Chilion, died. Three Hebrew men had come to Moab to escape a famine, and Moab killed them all (or at least, they all died there). Naomi, Ruth's mother-in-law, decided to go home to Bethlehem. She told both daughters-in-law to go back to their mothers' houses, back to their own people and their own gods. Orpah kissed Naomi goodbye and left. Ruth grabbed hold and wouldn't let go.

"Where you go, I will go. Where you stay, I will stay. Your people will be my people, and your God my God." Those words are read at weddings, but they were spoken on a road between two countries by a young widow to an old one. Ruth wasn't choosing a husband. She was choosing a destitute mother-in-law, a foreign culture, an unknown God, and a future with no guarantees. She was volunteering for poverty and social marginalization. The only thing she'd gain was Naomi's company.

In Bethlehem, Ruth went to glean — picking up the scraps left behind by harvesters, the ancient world's version of a food bank. She "happened" to end up in the field of Boaz, a wealthy relative of Naomi's dead husband. Boaz noticed her, protected her, fed her extra. The text is careful: he was kind because she was a faithful woman, not because she was a romantic prospect. But Naomi saw the opportunity and sent Ruth to the threshing floor at night. "Uncover his feet and lie down." Whatever exactly that means (and scholars debate it), Ruth went. She proposed to Boaz, in effect, by asking him to exercise his right as a kinsman-redeemer and marry her.

Boaz said yes, navigated the legal obstacles, and married her. Their son was Obed. Obed's son was Jesse. Jesse's son was David. A Moabite woman — from the nation born of Lot's incest with his daughter, from a people cursed in Deuteronomy — ended up in the direct lineage of Israel's greatest king and, ultimately, of Jesus. Grace doesn't just bend the rules. Sometimes it rewrites the genealogy.`,
    modernParallel: `Ruth is the immigrant who follows a family member to a country where she has no status, no connections, and no safety net — and who works the hardest, lowest-paying job available because it's the only way to eat. She's the daughter-in-law who moves in with her aging mother-in-law after the family falls apart, not because it's required but because she refuses to let the old woman face it alone. She's the outsider who is eventually embraced by a community that had every cultural reason to reject her. If you've ever seen a refugee or an immigrant build a life from nothing through sheer loyalty and work, and then watched their children or grandchildren rise to prominence, you've seen Ruth's story.`,
    emotionalArc: JSON.stringify([
      { moment: 'Refusing to leave Naomi', reference: 'Ruth 1:16-17', emotional_state: 'Fierce, chosen loyalty — not obligation, not romance, just love that refuses to let go', source_tier: 'canon' },
      { moment: 'Gleaning in Boaz\'s field', reference: 'Ruth 2:2-3', emotional_state: 'The quiet dignity of someone doing what needs to be done without complaint', source_tier: 'ai_assisted' },
      { moment: 'Going to the threshing floor at night', reference: 'Ruth 3:6-9', emotional_state: 'Courage riding on top of vulnerability — she\'s risking everything on one man\'s character', source_tier: 'ai_assisted' },
      { moment: 'Holding Obed — Naomi\'s restoration', reference: 'Ruth 4:13-17', emotional_state: 'Quiet fulfillment — the destitution is over, the line continues', source_tier: 'canon' }
    ]),
    faithJourney: `Ruth's faith was adopted, not inherited. She grew up in Moab, worshipping Chemosh. She married a Hebrew man and encountered his God. And when everything fell apart — when her husband died and her mother-in-law told her to go home to her own gods — she chose Naomi's God instead. "Your God will be my God." That's a conversion statement, and it came with no promise of reward. Ruth chose Yahweh at the lowest point, with nothing to gain and everything to lose.

What makes Ruth's faith distinctive is its expression. She didn't prophesy. She didn't lead armies. She didn't have visions. She gleaned grain. She cared for her mother-in-law. She went to the threshing floor when Naomi told her to. Her faith was expressed through loyalty, work, and risk. It's the most domestic, most ordinary, most human expression of faith in the entire Old Testament — and it produced the royal line. The book of Ruth sits in the middle of the Judges period, a time of violence, idolatry, and social collapse, and it says: even here, even now, faithfulness is happening. Not in the battles or the political crises, but in a field, between two women, over a basket of barley.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Book of Ruth (4 chapters). Ruth\'s placement in David\'s genealogy is confirmed in Ruth 4:17-22 and Matthew 1:5. The story is set "in the days when the judges ruled" (Ruth 1:1).',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'naomi',
    name: 'Naomi',
    aliases: 'Mara ("bitter" — self-given)',
    gender: 'female',
    tribeClan: 'Judah (Ephrathite of Bethlehem)',
    occupation: 'none (widow)',
    socialStatus: 'formerly comfortable; reduced to destitute widowhood',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The woman who lost her husband and both sons in a foreign country and came home saying, "Don\'t call me Naomi. Call me Mara — bitter — because God has dealt bitterly with me."',
    bioFull: `Naomi left Bethlehem with a husband and two sons. She came back with nothing but a Moabite daughter-in-law and a bitterness so deep she renamed herself. "Don't call me Naomi" — which means pleasant — "call me Mara" — which means bitter. "I went away full, and the Lord has brought me back empty." That's not a complaint. That's a theological indictment. She's saying God did this. Not fate, not bad luck — the Almighty has afflicted her.

That kind of raw honesty in the face of loss is rare in Scripture and even rarer in the way we usually talk about faith. Naomi didn't pretend she was fine. She didn't spiritualize her grief. She said what she felt: God took everything from me, and I'm angry about it. The text doesn't correct her. It doesn't have someone swoop in with "God has a plan." It just lets her bitterness stand.

But Naomi's bitterness coexisted with strategic intelligence. The moment she learned Ruth was gleaning in Boaz's field, her mind started working. She knew the kinsman-redeemer laws. She knew Boaz's character. She orchestrated the threshing floor encounter with the precision of someone who understands both the legal system and human nature. "Wash, put on perfume, get dressed, go down to the threshing floor." Naomi was grieving, but she wasn't passive. She was bitter and brilliant at the same time.

When Obed was born, the women of Bethlehem said to Naomi, "Your daughter-in-law, who loves you, is better to you than seven sons." That's one of the most remarkable statements in the Hebrew Bible — a Moabite woman valued above the ideal of seven sons. And Naomi took the baby and held him. The text says "Naomi took the child and laid him in her lap and became his nurse." The woman who came home empty was full again. Not because her grief was resolved, but because new life had grown alongside it.`,
    modernParallel: `Naomi is the mother who buries her children and has to figure out how to keep living. She's the woman who retires to the town she grew up in after her husband dies, and her old neighbors barely recognize her because grief has rewritten her face. She's also the grandmother who, despite everything, starts scheming to get her daughter-in-law set up with the right man because even in the depths of loss, she can't stop being practical. If you've known an older woman who carries devastating grief and fierce tactical intelligence in the same body — who cries at night and plans during the day — you know Naomi.`,
    emotionalArc: JSON.stringify([
      { moment: 'Telling Ruth and Orpah to go home', reference: 'Ruth 1:8-13', emotional_state: 'Grief beyond hope — she has nothing to offer and knows it', source_tier: 'canon' },
      { moment: '"Call me Mara"', reference: 'Ruth 1:20-21', emotional_state: 'Bitterness spoken aloud as theology — God is the cause, and she will say so', source_tier: 'canon' },
      { moment: 'Orchestrating Ruth\'s visit to the threshing floor', reference: 'Ruth 3:1-4', emotional_state: 'Strategic hope emerging from despair — she sees a possibility and acts', source_tier: 'ai_assisted' },
      { moment: 'Holding Obed', reference: 'Ruth 4:16-17', emotional_state: 'Restoration that doesn\'t erase the loss but adds something new to hold', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Naomi's faith is the faith of someone who has been hurt by God and says so. She didn't lose her belief in God's existence or power. She lost her belief in God's kindness. "The Almighty has dealt very bitterly with me." That's not atheism. It's a relationship in crisis — the anger of someone who trusted and was (in her experience) betrayed. The Bible presents Naomi's accusation without refutation. Nobody tells her she's wrong. Nobody offers a theodicy. Her pain is allowed to stand as evidence.

But Naomi's story also shows that faith in crisis doesn't mean faith abandoned. She went back to Bethlehem — back to the land, back to the covenant community. She invoked the kinsman-redeemer tradition, which is a legal mechanism embedded in Israelite theology. She trusted Boaz to do the right thing. Even while accusing God of afflicting her, she operated within the structures God had established. That's a paradox worth sitting with: a woman who blamed God for her suffering and simultaneously relied on God's systems for her deliverance. Naomi's faith wasn't consistent. It was human. And it was, in the end, rewarded — not with an explanation, but with a grandchild.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Book of Ruth. Naomi\'s name-change declaration (Ruth 1:20-21) and her role in orchestrating Ruth and Boaz\'s meeting are canonical. The statement about Ruth being "better than seven sons" (Ruth 4:15) is one of the highest commendations of a woman in the Hebrew Bible.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'boaz',
    name: 'Boaz',
    aliases: null,
    gender: 'male',
    tribeClan: 'Judah (Ephrathite of Bethlehem)',
    occupation: 'landowner, farmer',
    socialStatus: 'wealthy, prominent man in Bethlehem; kinsman-redeemer',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The wealthy Bethlehem farmer who noticed a Moabite widow gleaning in his field and chose to do far more than the law required.',
    bioFull: `Boaz is the rare biblical character who is simply, consistently good — and the text doesn't undermine it. He's wealthy but not exploitative. He's powerful but not predatory. When he first noticed Ruth in his field, his first instinct was protection: "Stay in my field. Don't go to another field. Stay close to my servant girls. I've told the men not to touch you." That last instruction tells you something about what gleaning fields were like for a young foreign woman. Boaz didn't just let her glean. He created a safe environment for it.

He went further. He told his harvesters to deliberately leave extra grain for her to find. The law required that gleaners be allowed in the field; it didn't require that the field owner rig the harvest in their favor. Boaz exceeded the obligation. He did what was right and then did more. When Ruth asked why he was being so kind to a foreigner, his answer was simple: he'd heard what she did for Naomi. Loyalty recognized loyalty.

The threshing floor scene is where Boaz becomes genuinely remarkable. Ruth showed up at night, uncovered his feet, and asked him to exercise his kinsman-redeemer rights. Boaz could have taken advantage of the situation. Instead, he praised her character, promised to handle it legally, and sent her home before dawn to protect her reputation. Then he went to the city gate and navigated the legal process to claim the right of redemption, including an older kinsman who had first claim but didn't want the complication.

Boaz married Ruth. Their son was Obed. Obed's son was Jesse. Jesse's son was David. The genealogy at the end of the book is the narrative's final statement: this is what happens when a good man does more than the minimum. It doesn't just save one family. It sets in motion a royal dynasty. Boaz is the closest thing the Old Testament has to a portrait of what redeemer really means in everyday terms.`,
    modernParallel: `Boaz is the employer who doesn't just follow labor laws but creates a workplace where the most vulnerable people on his team are genuinely safe and looked after. He's the landlord who doesn't just meet code but makes sure the single mother on the third floor has a functioning heater before winter. He's the person who sees someone with fewer resources, fewer connections, fewer protections, and decides — without fanfare, without an audience — to do more than the situation technically requires. If you've ever had a boss, a neighbor, or a stranger go out of their way for you when they had no obligation to, you've experienced Boaz.`,
    emotionalArc: JSON.stringify([
      { moment: 'Noticing Ruth in the field', reference: 'Ruth 2:5-9', emotional_state: 'Attentive concern — he sees her situation and acts immediately', source_tier: 'canon' },
      { moment: 'Ruth at the threshing floor', reference: 'Ruth 3:10-13', emotional_state: 'Moved, protective, and honorable — he could take, but he waits and does it right', source_tier: 'canon' },
      { moment: 'Negotiating at the city gate', reference: 'Ruth 4:1-10', emotional_state: 'Quiet determination — he\'s navigating the system to secure the right outcome', source_tier: 'ai_assisted' }
    ]),
    faithJourney: `Boaz's faith is never described in dramatic terms because it didn't need to be. His faith was structural — built into how he ran his fields, treated his workers, and responded to a vulnerable woman in his community. His first words to Ruth included a blessing: "May the Lord repay you for what you have done. May you be richly rewarded by the Lord, the God of Israel, under whose wings you have come to take refuge." That's not performative. It's the language of a man who genuinely believes in a God who rewards faithfulness and who considers himself an instrument of that reward.

What's distinctive about Boaz's faith is its integration with everyday life. He didn't have a calling narrative, a vision, or a dramatic encounter. He had fields, workers, laws, and a community — and he applied his faith to all of them. The kinsman-redeemer system was a legal institution, but Boaz treated it as a sacred obligation. He redeemed Ruth not just because the law allowed it but because he understood what redemption was supposed to look like: someone with resources stepping in to restore someone without them. His faith was quiet, practical, and enormously consequential. It produced a king.`,
    sourceTier: 'ai_assisted',
    sourceNotes: 'Book of Ruth. Boaz\'s role as kinsman-redeemer (go\'el) is the legal and theological center of the narrative. His genealogical significance is confirmed in Ruth 4:18-22 and Matthew 1:5.',
    isNamed: true,
    prominence: 'significant',
  },

  {
    id: 'hannah',
    name: 'Hannah',
    aliases: null,
    gender: 'female',
    tribeClan: 'Ephraim (by marriage to Elkanah)',
    occupation: 'wife, mother',
    socialStatus: 'one of two wives of Elkanah; initially barren',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The barren woman who prayed so intensely the priest thought she was drunk — and then gave the child she\'d begged for back to God.',
    bioFull: `Hannah's pain was domestic and relentless. She was barren in a culture where barrenness was considered a curse or a divine judgment. Her husband Elkanah loved her — the text is explicit about this — but love didn't solve the problem. His other wife, Peninnah, had children and used them as weapons. Year after year, when the family went to Shiloh for the annual sacrifice, Peninnah provoked Hannah until she wept and couldn't eat. This wasn't a one-time cruelty. It was systematic, annual humiliation at the most sacred event on the family calendar.

Elkanah tried. "Hannah, why are you crying? Why don't you eat? Don't I mean more to you than ten sons?" The question is well-intentioned and completely beside the point. He was asking her to weigh his love against her pain, and grief doesn't work that way. Hannah didn't need to be told she was loved. She needed to be a mother. And no amount of a husband's affection could fill that particular emptiness.

At Shiloh, Hannah prayed. The text describes her lips moving but no sound coming out — a prayer so internal, so desperate, that it bypassed speech. Eli the priest saw her and thought she was drunk. She had to defend the sincerity of her own grief to a religious leader who couldn't recognize prayer when it was happening in front of him. "I am a woman who is deeply troubled. I have not been drinking. I was pouring out my soul to the Lord." That defense — having to explain your anguish to someone who should have understood it — adds another layer to Hannah's pain.

God answered. Samuel was born. And then Hannah did the thing that makes her story extraordinary: she gave him back. As soon as the boy was weaned, she brought him to the temple at Shiloh and left him there. "I prayed for this child, and the Lord has granted me what I asked. So now I give him to the Lord." She fought for years to have a child and then voluntarily surrendered him to be raised by someone else. That's not natural. That's a kind of faith that costs more than most people are willing to pay.`,
    modernParallel: `Hannah is the woman who goes through years of fertility treatments, baby showers for everyone else, and well-meaning friends who say "just relax and it'll happen" — while the one person in her life who should understand keeps asking the wrong questions. She's also the mother who, after finally having the child, makes the gut-wrenching decision to send them away for something she believes matters more than her own happiness — the boarding school, the mission, the specialized program. If you've ever wanted something so badly that the wanting became your whole identity, and then received it and had to open your hands again, you understand Hannah.`,
    emotionalArc: JSON.stringify([
      { moment: 'Peninnah\'s annual provocation', reference: '1 Samuel 1:6-7', emotional_state: 'Chronic, compounding grief — the wound reopened every year at the same place', source_tier: 'canon' },
      { moment: 'Praying silently at Shiloh', reference: '1 Samuel 1:10-13', emotional_state: 'Prayer beyond words — anguish so deep it bypasses speech', source_tier: 'canon' },
      { moment: 'Mistaken for a drunk by Eli', reference: '1 Samuel 1:14-16', emotional_state: 'The indignity of having to justify genuine grief to a spiritual authority', source_tier: 'canon' },
      { moment: 'Leaving Samuel at the temple', reference: '1 Samuel 1:24-28', emotional_state: 'A surrender that costs everything she fought for', source_tier: 'canon' },
      { moment: 'Hannah\'s song of praise', reference: '1 Samuel 2:1-10', emotional_state: 'Fierce, expansive joy — her personal deliverance becomes a statement about God\'s character', source_tier: 'canon' }
    ]),
    faithJourney: `Hannah's faith was forged in unanswered prayer. For years — the text says year after year — she went to Shiloh and prayed, and nothing happened. Peninnah kept having children. Hannah kept weeping. The God she prayed to was silent. That kind of sustained, unanswered prayer either builds faith into something unbreakable or destroys it completely. For Hannah, it did the former, but not without cost. By the time she prayed the prayer Eli mistook for drunkenness, her faith was so concentrated, so compressed by years of waiting, that it had become almost physical — her whole body involved, her lips moving, no sound.

The vow she made — "if you give me a son, I'll give him back to you for his whole life" — is the key to understanding her faith. She wasn't bargaining. She was offering. She was saying: this child isn't for me. He's for you. The thing I want most in the world, I will not keep. That's the inverse of how most prayers of desperation work. Most people pray, "Give me this and I'll hold on to it forever." Hannah prayed, "Give me this and I'll let it go." Her song in 1 Samuel 2 — which Mary's Magnificat echoes a thousand years later — isn't just personal thanksgiving. It's a manifesto about a God who inverts the world's hierarchies: the barren woman becomes fruitful, the mighty are broken, the hungry are fed. Hannah's faith turned her private pain into a public theology.`,
    sourceTier: 'ai_assisted',
    sourceNotes: '1 Samuel 1-2. Hannah\'s prayer, Eli\'s misunderstanding, Samuel\'s birth, and Hannah\'s song are all canonical. The literary parallels between Hannah\'s song (1 Samuel 2:1-10) and the Magnificat (Luke 1:46-55) are widely recognized.',
    isNamed: true,
    prominence: 'major',
  },

  {
    id: 'eli',
    name: 'Eli',
    aliases: null,
    gender: 'male',
    tribeClan: 'Levi (descended from Ithamar, Aaron\'s son)',
    occupation: 'high priest, judge',
    socialStatus: 'high priest at Shiloh; judge of Israel for forty years',
    era: 'judges',
    approximateDates: '~11th century BC',
    bioBrief: 'The high priest who couldn\'t control his own sons and mistook a desperate woman\'s prayer for drunkenness — the last judge before the monarchy.',
    bioFull: `Eli was the high priest at Shiloh for forty years, and his defining failure was that he could manage a nation's worship but not his own family. His sons, Hophni and Phinehas, were, as the text bluntly puts it, "scoundrels who had no regard for the Lord." They stole from the sacrifices, took the best portions of meat by force, and had sexual relations with women who served at the entrance to the tent of meeting. Everyone knew about it. And Eli — the high priest, the judge, the man with the authority to stop it — did almost nothing.

He did rebuke them, once. "Why do you do such things? I hear from all the people about these wicked deeds of yours." But a rebuke without consequences is just a complaint. The text explicitly states: "His sons did not listen to their father's rebuke." And Eli didn't escalate. He didn't remove them from service. He didn't exercise his authority as either a father or a priest. He let it continue. A prophetic word came: "Why do you honor your sons more than me?"

That question is the heart of Eli's failure. It wasn't that he approved of his sons' behavior. He clearly didn't. It was that he valued peace with his family over obedience to his calling. He chose to be a comfortable father rather than a faithful priest. It's one of the most common failures in leadership: the inability to discipline the people closest to you because the relational cost feels too high.

Eli's end was physical collapse mirroring spiritual collapse. When a messenger brought news that the ark of God had been captured and both his sons killed in battle, Eli fell backward off his seat by the gate, broke his neck, and died. He was old, he was heavy, and the weight of the worst possible news tipped him over. The ark — the thing he was supposed to protect — was gone. His sons — the people he was supposed to discipline — were dead. And the priesthood he represented was about to be transferred to a boy named Samuel, who had grown up under his roof because Eli couldn't recognize prayer when he saw it.`,
    modernParallel: `Eli is the senior pastor whose adult children are causing harm in the church and who won't address it because the personal cost of confrontation is too high. He's the CEO whose VP is committing fraud and who writes a concerned email instead of firing them. He's any leader — in a family, a company, an institution — who sees the problem, names the problem, and then fails to act on the problem because the person causing it is someone he loves or depends on. Eli's story is the story of authority without enforcement, and it's playing out in boardrooms and family dinners every day.`,
    emotionalArc: JSON.stringify([
      { moment: 'Mistaking Hannah for a drunk', reference: '1 Samuel 1:12-14', emotional_state: 'Spiritual dullness — a priest who can\'t recognize genuine prayer', source_tier: 'canon' },
      { moment: 'Rebuking his sons without consequences', reference: '1 Samuel 2:22-25', emotional_state: 'The impotence of a man who disapproves but won\'t discipline', source_tier: 'canon' },
      { moment: 'Receiving the prophetic judgment', reference: '1 Samuel 2:27-36', emotional_state: 'The slow comprehension that his passivity has cost his family everything', source_tier: 'ai_assisted' },
      { moment: 'Hearing the news of the ark\'s capture', reference: '1 Samuel 4:17-18', emotional_state: 'The final blow — not his sons\' deaths, but the ark\'s loss is what kills him', source_tier: 'canon' }
    ]),
    faithJourney: `Eli's faith was institutional. He served at Shiloh. He performed the sacrifices. He wore the ephod. He sat at the gate. He did the job for forty years. But somewhere along the way, the spiritual vitality drained out of the performance. When Hannah prayed with her whole body, Eli saw drunkenness. When his sons desecrated the sanctuary, Eli saw a problem he could address with words. When Samuel heard God's voice in the night, Eli was the last to realize what was happening. His faith had become a function, not a fire.

And yet — Eli wasn't a villain. When the prophetic judgment came, he accepted it: "He is the Lord; let him do what is good in his eyes." That's resignation, not defiance. It's the faith of a man who knows he failed and doesn't argue with the consequences. Eli's spiritual tragedy is quieter than most. He didn't rebel against God or chase foreign gods. He just stopped paying attention. He let the forms of faith substitute for the substance, and by the time the substance was tested — by Hannah's prayer, by his sons' sin, by the Philistine advance — there wasn't enough left to respond with. Eli's story is a warning about the slow, undramatic erosion of spiritual attentiveness that can happen to anyone who does the same sacred work for forty years.`,
    sourceTier: 'ai_assisted',
    sourceNotes: '1 Samuel 1-4. Eli\'s forty-year judgeship, his sons\' corruption, the prophetic judgment, and his death are all canonical. The detail that he fell because of the ark\'s capture (not his sons\' deaths) is explicitly stated in 1 Samuel 4:18.',
    isNamed: true,
    prominence: 'significant',
  },
]
