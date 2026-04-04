import type { NarrativeUnitRecord } from "./narrative-types";

export const narrativesLuke: NarrativeUnitRecord[] = [
  // ───────────────────────────────────────────────
  // 1. The Magnificat (1:46-56)
  // ───────────────────────────────────────────────
  {
    id: "luk-magnificat",
    title: "The Magnificat — Mary's Revolutionary Song",
    bookId: "LUK",
    chapterStart: 1,
    verseStart: 46,
    chapterEnd: 1,
    verseEnd: 56,
    summary: `A pregnant, unmarried teenager from an economically insignificant village opens her mouth and delivers one of the most politically dangerous poems in all of Scripture. Mary does not sing a lullaby. She sings a manifesto. "He has scattered those who are proud in their inmost thoughts. He has brought down rulers from their thrones but has lifted up the humble. He has filled the hungry with good things but has sent the rich away empty." This is not gentle devotional language. This is the vocabulary of revolution — thrones toppling, the starving fed, the comfortable dispossessed.

What makes the Magnificat devastating is who is singing it. Not a prophet thundering from a mountain. Not a warrior rallying troops. A girl — probably fourteen or fifteen years old — from Nazareth, a town so unremarkable that people joked about it. She has no social standing, no political leverage, no army. And yet Luke places the most radical social vision in the entire Gospel on her lips. God's revolution does not begin with the powerful deciding to be generous. It begins with the powerless being chosen as the announcement.

Mary's song draws heavily from Hannah's prayer in 1 Samuel 2, another woman whose personal deliverance became a lens for understanding God's larger pattern: the reversal of human power structures. But Mary goes further than Hannah. Hannah celebrated her own vindication. Mary celebrates a cosmic reordering — past tense, as if it has already happened. In Mary's theology, the revolution is not pending. It is accomplished the moment God chose her.`,
    significance: `The Magnificat establishes the theological framework for everything that follows in Luke's Gospel. Every subsequent story — the Good Samaritan, Zacchaeus, Lazarus, the Prodigal Son — is a footnote to Mary's song. Luke is telling his readers from page one: this Gospel is about the great reversal. The last become first. The hungry are filled. The rich go empty. If you read Luke without the Magnificat ringing in your ears, you will misread everything.

It is also significant that this theology is delivered by a woman. In a literary culture where women rarely speak in public texts, Luke gives the longest speech in his infancy narrative to Mary. This is not accidental. Luke is signaling that the voices marginalized by the world are the ones God chooses for the most important announcements.`,
    relationalNote: `Mary's visit to Elizabeth is a scene of mutual recognition between two women whose pregnancies defy social expectation. Elizabeth is too old; Mary is too young and unmarried. Neither fits the respectable narrative. Their meeting is a picture of what the church could be at its best: the marginalized recognizing one another, affirming one another's calling, and together articulating a vision of God's justice that the powerful would never compose on their own.`,
    conceptualNote: `The Magnificat sits at the intersection of personal devotion and political theology, and it refuses to let you separate the two. Mary's praise of God is simultaneously a critique of empire. Her gratitude is simultaneously a prophecy of social upheaval. Any reading of this text that makes it only about Mary's personal feelings domesticates it. Any reading that makes it only about politics ignores that it is a prayer. Luke holds both together without apology.`,
    climateNote: `First-century Palestine was occupied territory under Roman imperial rule. Taxation was crushing, land consolidation had displaced small farmers, and a tiny priestly-aristocratic class collaborated with Rome for mutual benefit. Mary's language about scattering the proud, deposing rulers, and filling the hungry would have been immediately recognizable as a critique of this system. The Magnificat is not abstract theology. It is a poor woman describing what God's justice looks like from the bottom of the economic ladder.`,
    modernParallel: `In 1980s Argentina, during the military dictatorship, the Mothers of the Plaza de Mayo — women whose children had been "disappeared" by the regime — marched silently in the public square wearing white headscarves, demanding answers. They had no political power, no weapons, no institutional backing. They were dismissed as "las locas" — the crazy women. But their witness became one of the most powerful moral forces in Latin American history, eventually contributing to the regime's collapse.

Mary's Magnificat is that kind of witness. It is the voice of someone with no institutional power making claims about justice that the powerful find absurd or dangerous. The song does not ask the powerful to reform. It announces that God has already acted on behalf of the powerless. This is not a request. It is a declaration.

Today, the Magnificat challenges any version of Christianity that has made its peace with wealth and power. If Mary's song makes you uncomfortable, it is working as intended. If your theology cannot accommodate a teenage girl announcing the overthrow of economic systems, your theology is smaller than Luke's.`,
    keyQuestions: JSON.stringify([
      "Why does Luke place the most radical social vision in his Gospel on the lips of a teenage girl rather than a prophet, priest, or king?",
      "Mary uses past tense for events that haven't happened yet ('He has brought down rulers'). What does this reveal about her understanding of how God's promises work?",
      "How does the Magnificat challenge the separation between 'spiritual' and 'political' readings of Scripture?",
      "In what ways does the modern church domesticate or sentimentalize Mary's song, and what would it mean to take it at face value?",
      "How does Mary's social location — young, female, poor, from a despised town — shape the content of her theology?",
      "What would it look like for a contemporary congregation to actually pray the Magnificat and mean it?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Revolution Starts with the Powerless", target_audience: "Congregations comfortable with the status quo", primary_theme: "justice" },
      { angle: "A Teenager's Theology", target_audience: "Youth and young adults told they're too young to lead", primary_theme: "calling" },
      { angle: "Past Tense Faith — Trusting What God Has Already Done", target_audience: "People waiting for God to act", primary_theme: "faith" },
      { angle: "When Praise Becomes Protest", target_audience: "Christians navigating political engagement", primary_theme: "worship" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit synthesizing Lukan scholarship, liberation theology readings (Gutierrez, Sobrino), and feminist biblical criticism (Schaberg, Gaventa). Cross-referenced with Hannah's prayer (1 Sam 2:1-10) and prophetic reversal themes in Isaiah 61."
  },

  // ───────────────────────────────────────────────
  // 2. Birth of Jesus (2:1-20)
  // ───────────────────────────────────────────────
  {
    id: "luk-birth-of-jesus",
    title: "The Birth of Jesus — Shepherds, Manger, No Room",
    bookId: "LUK",
    chapterStart: 2,
    verseStart: 1,
    chapterEnd: 2,
    verseEnd: 20,
    summary: `Luke sets the birth of Jesus against the machinery of empire. Caesar Augustus issues a census — a bureaucratic act designed to count people for the purpose of taxing them. The entire Roman world moves at one man's decree. And somewhere in the shuffle, a pregnant woman and her husband travel to Bethlehem, where she gives birth in an animal feeding trough because there was no room for them in the guest quarters. The contrast is intentional and devastating: the most powerful man in the world moves populations with a signature, while the most important birth in history happens in a space reserved for livestock.

The first people to receive the announcement are shepherds. Not priests. Not scholars. Not the religiously respectable. Shepherds were the working poor — smelly, marginalized, unable to observe Sabbath regulations because sheep don't take days off. They were ritually suspect and socially invisible. And yet the heavens open for them. The angel's announcement uses imperial language — "good news" (euangelion) was the word used for Caesar's decrees and military victories. Luke is staging a deliberate counter-narrative: the real good news, the real empire-shaping event, is not happening in Rome. It is happening in a feeding trough, announced to people no one would believe.

The shepherds go, they see, and they tell everyone. Mary "treasured up all these things and pondered them in her heart." Luke does not explain what she was pondering. Perhaps the gap between the angel's grand promises and the reality of a birth in an animal shelter. Perhaps the question every parent of a promised child must face: what does this actually mean?`,
    significance: `Luke's birth narrative is a masterclass in theological contrast. He names Caesar Augustus — the man who called himself "son of god" and "savior" and "bringer of peace" — and then immediately shows the actual Son of God born into poverty. Every title Caesar claimed for himself, Luke's angels apply to a baby in a manger. This is not subtle. Luke is telling his readers that the empire's version of salvation — peace through military dominance — is being replaced by God's version: salvation born among the poor.

The manger and the shepherds are not sentimental details. They are Luke's thesis statement: God enters history from below, not from above.`,
    relationalNote: `The shepherds function as the first evangelists in Luke's Gospel — and they are precisely the people no one would have chosen for the role. Their testimony would not have been admissible in court. They had no social credibility. And yet they are the ones who go and tell. Luke is making a point that will recur throughout his Gospel: God's messengers are consistently the people the religious establishment would have disqualified.`,
    conceptualNote: `The phrase "no room in the inn" (or more accurately, "no room in the guest quarters") has been sentimentalized into a story about a mean innkeeper. The reality is more structural: the entire system — Roman census, overcrowded towns, poverty — conspired to push this birth to the margins. There was no villain. There was just a world organized in such a way that the most important event in history happened where no one was paying attention. This is how systemic injustice works: no one has to be individually cruel. The system simply has no room.`,
    climateNote: `Bethlehem was a small village in Judea, historically associated with David but economically insignificant in the first century. The Roman census (probably under Quirinius, though the exact dating is debated) was an instrument of imperial control — counting people to tax them, tax them to fund legions, fund legions to maintain occupation. Luke's audience would have understood the census not as a neutral bureaucratic act but as a reminder of subjugation. The birth narrative is set against the backdrop of a people being counted like property by a foreign power.`,
    modernParallel: `In December 2015, a Syrian refugee woman gave birth in a makeshift shelter on the Greek island of Lesbos, having crossed the Aegean in an inflatable boat. The child was born into a world that had "no room" — not because individuals were cruel, but because immigration systems, border policies, and political calculations had made it so. No one decided that a pregnant woman should give birth in a tent. The system simply had no space for her.

Luke's birth narrative resonates with every story of a child born into poverty, displacement, or institutional neglect. The manger is not a charming detail for Christmas cards. It is a statement about where God shows up — in the places the system has no room for. The shepherds are not quaint figures. They are the essential workers, the night-shift laborers, the people whose work is necessary but whose presence is unwelcome in polite company.

Any church that celebrates Christmas with elaborate pageantry while remaining indifferent to the actual poor in its community has missed Luke's point entirely. The birth narrative is an invitation to look for God where the system says nothing important is happening.`,
    keyQuestions: JSON.stringify([
      "Why does Luke begin the birth narrative by naming Caesar Augustus? What is he doing theologically by placing the emperor and the manger in the same story?",
      "What does it mean that the first announcement of Jesus' birth goes to shepherds — people with no religious credibility?",
      "How does 'no room in the inn' function as a systemic critique rather than a story about individual inhospitality?",
      "What is the significance of using imperial language ('good news,' 'savior,' 'peace') to describe a birth in an animal shelter?",
      "What was Mary 'pondering in her heart'? What might it feel like to hold divine promises alongside impoverished reality?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Counter-Empire Birth Announcement", target_audience: "Politically aware congregations", primary_theme: "kingdom" },
      { angle: "When the System Has No Room", target_audience: "Those working with displaced or homeless populations", primary_theme: "justice" },
      { angle: "First Witnesses: Why Shepherds?", target_audience: "People who feel unqualified for God's purposes", primary_theme: "calling" },
      { angle: "Pondering in the Mess — Mary's Faith Under Pressure", target_audience: "Parents, caregivers, people in hard seasons", primary_theme: "faith" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan birth narrative scholarship (Brown, The Birth of the Messiah; Green, The Gospel of Luke), Roman imperial context (Horsley, The Liberation of Christmas), and archaeological/social-historical data on first-century Bethlehem and shepherding."
  },

  // ───────────────────────────────────────────────
  // 3. Simeon and Anna (2:22-40)
  // ───────────────────────────────────────────────
  {
    id: "luk-simeon-and-anna",
    title: "Simeon and Anna — The Old Who Waited and the Future They Saw",
    bookId: "LUK",
    chapterStart: 2,
    verseStart: 22,
    chapterEnd: 2,
    verseEnd: 40,
    summary: `Mary and Joseph bring the infant Jesus to the temple for the purification rites required by Torah. They are poor — Luke notes they offer "a pair of turtledoves or two young pigeons," the sacrifice prescribed for those who cannot afford a lamb. Into this ordinary scene of working-class religious observance steps Simeon, an old man who has been waiting for "the consolation of Israel." The Holy Spirit had revealed to him that he would not die before seeing the Messiah. He takes the baby in his arms and sings his own canticle — the Nunc Dimittis: "Sovereign Lord, as you have promised, you may now dismiss your servant in peace. For my eyes have seen your salvation."

But Simeon does not stop there. He turns to Mary and says something no new mother wants to hear: "This child is destined to cause the falling and rising of many in Israel, and to be a sign that will be spoken against, so that the thoughts of many hearts will be revealed. And a sword will pierce your own soul too." The joy of recognition is immediately shot through with the promise of suffering. Simeon sees both the glory and the cost.

Then there is Anna. An eighty-four-year-old widow who has essentially lived in the temple for decades, worshiping with fasting and prayer "night and day." She sees the child and begins speaking about him "to all who were looking forward to the redemption of Jerusalem." Luke does not record her words — only that she spoke. An old woman's testimony, unquoted but noted. Two elderly people at the end of their lives recognizing the beginning of something they will never see completed.`,
    significance: `Simeon and Anna represent the faithful remnant — people who held onto hope through decades of silence, occupation, and religious disappointment. They are the bridge between the old covenant and the new. Simeon's prayer declares that this salvation is "prepared in the sight of all nations" — a universalism that would have startled many of Luke's Jewish readers. This baby is not just for Israel. He is "a light for revelation to the Gentiles."

Simeon's warning to Mary — about the sword that will pierce her soul — introduces the shadow side of Luke's Gospel. The Magnificat promised revolution; Simeon promises that revolution will cost something. Luke holds both together: joy and suffering, glory and the cross.`,
    relationalNote: `The pairing of Simeon and Anna is deliberate. A man and a woman. Both elderly. Both faithful. Both waiting. Luke consistently pairs male and female characters throughout his Gospel (Zechariah and Mary, the man with a hundred sheep and the woman with ten coins, the mustard seed and the leaven). This is not accidental. Luke is insisting that God's story includes both genders as full participants and witnesses. Anna's testimony is as valid as Simeon's, even though Luke gives her fewer words.`,
    conceptualNote: `There is a profound theology of patience embedded in this passage. Simeon and Anna have waited for decades. They did not see results during most of their lives. They simply remained faithful — praying, worshiping, watching. In a culture that values productivity and visible impact, Simeon and Anna represent a different kind of faithfulness: the willingness to wait for something you may not live to see completed. Their reward is a moment of recognition, not a lifetime of achievement.`,
    climateNote: `The temple in Jerusalem was the center of Jewish religious, economic, and political life. The purification offering of two birds instead of a lamb marked Mary and Joseph as poor — they were participating in the religious system from the bottom of its economic hierarchy. Simeon's reference to "the consolation of Israel" was loaded language in an occupied nation. The people were waiting for deliverance from Rome. What Simeon sees in Jesus is both more and less than military liberation — it is universal salvation that will also bring division and suffering.`,
    modernParallel: `In many Black churches in the American South during the Jim Crow era, elderly members who had been born into or near slavery continued to pray, worship, and testify about a coming justice they might never see. They sang about freedom. They prayed for deliverance. They raised children in the faith. Some of them lived long enough to see the Civil Rights Movement begin, to watch young people march and sit in and bleed for the justice they had prayed about for decades. They were the Simeons and Annas of their communities — the ones who held the faith when there was no visible evidence that anything would change.

Simeon's willingness to die in peace after seeing the child, and Anna's instant recognition after decades of waiting, speak to a kind of faithfulness that our results-oriented culture finds almost incomprehensible. We want impact metrics and quarterly reports. Simeon and Anna offer something different: a lifetime of faithful waiting rewarded with a single moment of clarity.

Every community has its Simeons and Annas — the elderly members who have prayed longer than others have been alive, who remember what was promised, who refuse to give up hope. They deserve more than sentimental appreciation. They deserve to be heard.`,
    keyQuestions: JSON.stringify([
      "What does it mean to wait faithfully for something you may not live to see completed? What sustains that kind of patience?",
      "Why does Luke pair Simeon and Anna — what is he communicating by including both an old man and an old woman?",
      "Simeon's song includes both salvation and suffering ('a sword will pierce your own soul'). How do joy and pain coexist in this passage?",
      "Anna spoke about the child 'to all who were looking forward to the redemption of Jerusalem.' Who are the people today still looking forward to redemption?",
      "What does the offering of two birds instead of a lamb tell us about Jesus' family and Luke's priorities?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Faithfulness of Waiting", target_audience: "People in long seasons of unanswered prayer", primary_theme: "perseverance" },
      { angle: "A Sword Will Pierce — When Good News Comes with a Cost", target_audience: "Those facing difficult truths about faith", primary_theme: "suffering" },
      { angle: "The Elders Who Held the Faith", target_audience: "Intergenerational congregations", primary_theme: "legacy" },
      { angle: "Salvation Prepared for All Nations — Simeon's Unexpected Universalism", target_audience: "Churches wrestling with inclusivity", primary_theme: "universality" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan infancy narrative scholarship (Brown, Fitzmyer), temple economics and purity law context (Sanders, Judaism: Practice and Belief), and literary analysis of Luke's male-female pairing technique."
  },

  // ───────────────────────────────────────────────
  // 4. Jesus at Twelve (2:41-52)
  // ───────────────────────────────────────────────
  {
    id: "luk-jesus-at-twelve",
    title: "Jesus at Twelve — Lost in the Temple",
    bookId: "LUK",
    chapterStart: 2,
    verseStart: 41,
    chapterEnd: 2,
    verseEnd: 52,
    summary: `This is the only canonical story of Jesus between infancy and adulthood, and Luke tells it with the spare efficiency of a master storyteller. The family goes to Jerusalem for Passover. They leave. A day into the journey home, Mary and Joseph realize Jesus is not with them. They assumed he was somewhere in the traveling group — a reasonable assumption in a culture where extended family and village groups traveled together. They turn back. Three days of searching. They find him in the temple, sitting among the teachers, "listening to them and asking them questions." Everyone is amazed.

Mary's response is every parent's response: "Son, why have you treated us like this? Your father and I have been anxiously searching for you." The Greek word for "anxiously" carries real emotional weight — this is not mild concern. This is parental terror. And Jesus' answer is startling in its calm: "Why were you searching for me? Didn't you know I had to be in my Father's house?" The phrase can also be translated "about my Father's business" or "among my Father's things." Either way, it is a quiet but unmistakable redefinition of family: Joseph is not the father who matters most here.

Luke notes that "they did not understand what he was saying to them." Then Jesus returns to Nazareth and is obedient to them. And Mary "treasured all these things in her heart" — for the second time in two chapters. Luke is building a portrait of a mother who does not fully understand her son but refuses to let go of the mystery.`,
    significance: `This passage is the hinge between the infancy narratives and the adult ministry. It establishes that Jesus' sense of identity and mission preceded any public ministry. At twelve, he already knows where he belongs: in his Father's house. The story also introduces the tension that will run through Luke's Gospel — the tension between family loyalty and divine calling. Jesus will later say things that shock: "If anyone comes to me and does not hate father and mother..." (14:26). The seeds of that radical reorientation are here, at twelve, in the temple.

Luke's note that Jesus "grew in wisdom and stature, and in favor with God and man" is a reminder that incarnation means actual human development. Jesus did not arrive fully formed. He grew. He learned. This is not a diminishment of his divinity. It is the full cost of his humanity.`,
    relationalNote: `The dynamic between Jesus and his parents in this passage is achingly human. Mary's anxiety is real. Her reproach is real. Jesus' response is not disrespectful, but it is disorienting — he is gently informing his parents that there is a claim on his life that supersedes theirs. This is the moment every parent dreads and hopes for: the moment the child begins to become who they are, and it turns out to be someone you did not fully expect. Mary's response — treasuring, pondering, not understanding — is a model of parental faith in the face of a child's emerging otherness.`,
    conceptualNote: `The phrase "didn't you know?" is one of the most theologically loaded questions in the Gospels. Jesus assumes his parents should have understood. But they didn't. This gap between divine clarity and human confusion will characterize Jesus' entire ministry. The disciples will repeatedly not understand. The crowds will repeatedly miss the point. Even Mary, who received the angel's announcement and sang the Magnificat, does not fully grasp what is unfolding. Luke is honest about the difficulty of recognizing God's work even when you are standing in the middle of it.`,
    climateNote: `The Passover pilgrimage to Jerusalem was one of the most significant annual events in Jewish life. Families and village groups traveled together, often for several days. The temple itself was a massive complex — not just a worship space but the center of education, commerce, and political life. For a twelve-year-old to be found among the teachers was unusual but not impossible; the temple courts were places of public teaching and debate. What was remarkable was not that Jesus was there, but how he engaged: his questions and understanding astonished scholars who had studied Torah their entire lives.`,
    modernParallel: `In 2014, Malala Yousafzai accepted the Nobel Peace Prize at age seventeen. Interviewers kept expressing surprise that someone so young could articulate such a clear vision for education and justice. But Malala had been speaking publicly since she was eleven. Her parents had supported her, but they also admitted to moments of fear — not just for her safety, but at the realization that their daughter's calling was larger than anything they had planned.

Every parent eventually faces the moment when their child's sense of purpose begins to diverge from parental expectations. It is one thing to dedicate a child to God in a baby dedication ceremony. It is another thing entirely when that child, at twelve or fifteen or twenty, turns around and says, "Didn't you know I had to be about my Father's business?" — and means something you did not anticipate. Mary's response is instructive: she does not understand, but she does not shut it down. She treasures. She ponders. She keeps walking.

This passage is for every parent watching a child become someone they did not expect, and for every young person who feels a calling they cannot fully explain to the people who love them most.`,
    keyQuestions: JSON.stringify([
      "What does Jesus' response — 'Didn't you know I had to be in my Father's house?' — reveal about his self-understanding at age twelve?",
      "How does Mary's pattern of 'treasuring and pondering' model a faithful response to things we do not yet understand?",
      "What does it mean that Jesus 'grew in wisdom and stature'? How does genuine human development relate to divine identity?",
      "How does this passage foreshadow the tension between family loyalty and divine calling that runs throughout Luke's Gospel?",
      "What is the difference between obedience and submission? Jesus returns to Nazareth and is 'obedient to them' — but his identity remains unchanged."
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When Your Child's Calling Surprises You", target_audience: "Parents navigating children's emerging independence", primary_theme: "family" },
      { angle: "Didn't You Know? — The Disorienting Clarity of Jesus", target_audience: "People wrestling with unexpected aspects of faith", primary_theme: "identity" },
      { angle: "Treasuring What You Don't Understand", target_audience: "Those in seasons of spiritual confusion", primary_theme: "faith" },
      { angle: "Growing in Wisdom — The Humanity of Jesus", target_audience: "Theological study groups", primary_theme: "incarnation" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan childhood narrative scholarship (Brown, Fitzmyer), Jewish Passover pilgrimage customs, and literary analysis of the temple-finding motif. Cultural context informed by Safrai and Stern, The Jewish People in the First Century."
  },

  // ───────────────────────────────────────────────
  // 5. Nazareth Manifesto (4:14-30)
  // ───────────────────────────────────────────────
  {
    id: "luk-nazareth-manifesto",
    title: "The Nazareth Manifesto — Hometown Rejection",
    bookId: "LUK",
    chapterStart: 4,
    verseStart: 14,
    chapterEnd: 4,
    verseEnd: 30,
    summary: `Jesus returns to Nazareth "in the power of the Spirit" and enters the synagogue on the Sabbath. He is handed the scroll of Isaiah and unrolls it to chapter 61: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord's favor." He rolls up the scroll, hands it back, sits down. Every eye is on him. And he says: "Today this scripture is fulfilled in your hearing."

The crowd's initial reaction is positive — they are "amazed at the gracious words." But then the mood shifts. They begin to murmur: "Isn't this Joseph's son?" They know him. They changed his diapers. They want him to perform the miracles they've heard about from Capernaum. Jesus reads their expectation and refuses it. Instead, he provokes them deliberately. He reminds them that Elijah was sent not to an Israelite widow but to a Sidonian one. Elisha healed not an Israelite leper but Naaman the Syrian. The point is unmistakable: God's favor is not limited to the in-group. God has a history of bypassing the chosen people to bless outsiders.

The response is immediate and violent. "All the people in the synagogue were furious." They drive him out of town and attempt to throw him off a cliff. Jesus walks through the crowd and leaves. Luke does not explain how. The hometown boy who quoted Isaiah about liberation is nearly killed by his own neighbors because he suggested God's liberation might extend beyond their ethnic and religious boundaries.`,
    significance: `Luke places this episode at the very beginning of Jesus' public ministry — before any miracles, before the calling of disciples. In Mark and Matthew, the Nazareth rejection comes much later. Luke moves it forward because it is programmatic: this scene is the thesis of his entire Gospel. Everything Jesus will do — eating with sinners, healing Gentiles, welcoming Samaritans, telling parables about outsiders — is previewed here. The Nazareth manifesto tells you what this Gospel is about: good news to the poor, freedom for captives, and a God whose mercy refuses to be contained by tribal boundaries.

The congregation's fury is not random. Jesus has committed the unforgivable offense: he has told insiders that outsiders have equal access to God. This is the offense that will eventually get him killed.`,
    relationalNote: `The dynamics of this passage are painfully recognizable. A community that watched someone grow up cannot accept that person's authority. "Isn't this Joseph's son?" is the ancient version of "We knew you when." Familiarity breeds not contempt exactly, but a refusal to allow transformation. The people of Nazareth wanted a local hero who would do miracles for them. What they got was a prophet who told them God's grace was bigger than their town, their ethnicity, their assumptions. The relationship between Jesus and Nazareth breaks because Nazareth cannot bear the expansion of God's mercy.`,
    conceptualNote: `The "year of the Lord's favor" that Jesus quotes from Isaiah 61 is almost certainly a reference to the Jubilee — the radical economic reset prescribed in Leviticus 25, where debts were forgiven, slaves freed, and land returned to original owners. There is no evidence that Israel ever actually practiced the Jubilee. It remained an ideal, a future hope. When Jesus says "today this scripture is fulfilled," he is not announcing a spiritual metaphor. He is announcing that the economic and social revolution the prophets envisioned is beginning now, in his person and ministry. The reaction of the crowd suggests they understood exactly what he meant — and found it either thrilling or threatening, depending on where they stood in the economic hierarchy.`,
    climateNote: `Nazareth in the first century was a tiny agricultural village of perhaps 200-400 people. Everyone knew everyone. The synagogue was the center of communal life — not just religious but social, educational, and political. For Jesus to stand up in this intimate setting and make the claims he made was not an abstract theological exercise. It was a personal confrontation with people who had known him his entire life. The reference to the widow of Zarephath and Naaman the Syrian would have been particularly inflammatory in a context where Galilean Jews were already defensive about their Jewishness, surrounded as they were by Gentile populations.`,
    modernParallel: `In 1967, Martin Luther King Jr. began publicly opposing the Vietnam War. Many of his former allies — including other civil rights leaders, politicians, and even members of his own congregation — turned on him. They had supported him when he fought for Black civil rights in America. But when he expanded his vision to include Vietnamese peasants, poor whites, and a critique of American militarism, they said he had gone too far. He was accused of being ungrateful, of overstepping his lane, of betraying the movement that had made him. "Isn't this the civil rights preacher?" they said, in effect. "Why is he talking about Vietnam?"

Jesus' offense at Nazareth was the same kind. The people were fine with a local prophet doing local miracles. They were not fine with a prophet who said God's mercy extended to Sidonians and Syrians — the ethnic and religious outsiders. The violence of the response is proportional to the threat: when you tell insiders that outsiders are equally loved by God, the insiders do not thank you for expanding their horizons. They try to throw you off a cliff.

Every community, every church, every movement eventually faces this test: can we celebrate God's grace extending beyond our boundaries? The answer, more often than we'd like to admit, is the same as Nazareth's.`,
    keyQuestions: JSON.stringify([
      "Why does Luke place the Nazareth episode at the beginning of Jesus' ministry rather than later (as Mark and Matthew do)? What is he signaling about Jesus' mission?",
      "What is the 'year of the Lord's favor,' and what would it mean to take it literally as an economic and social program?",
      "Why does the crowd's mood shift so dramatically from admiration to murderous fury? What exactly triggers the change?",
      "How do the examples of the widow of Zarephath and Naaman the Syrian function in Jesus' argument? What is he claiming about God?",
      "In what ways do contemporary churches replicate Nazareth's response — welcoming God's grace for 'us' but resisting its extension to 'them'?",
      "What does it mean for a text about liberation to provoke violence? Is that a sign of failure or fulfillment?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When Grace Goes Too Far — The Scandal of God's Inclusivity", target_audience: "Churches navigating questions of who belongs", primary_theme: "grace" },
      { angle: "Today This Scripture Is Fulfilled — Taking Jesus' Manifesto Seriously", target_audience: "Congregations exploring justice and mission", primary_theme: "justice" },
      { angle: "Isn't This Joseph's Son? — When Familiarity Blocks Recognition", target_audience: "Long-established congregations resistant to change", primary_theme: "transformation" },
      { angle: "The Prophet Your Town Tried to Kill", target_audience: "People who feel rejected by their communities of origin", primary_theme: "calling" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on programmatic reading of Luke 4 (Tannehill, The Narrative Unity of Luke-Acts; Green, The Gospel of Luke), Jubilee theology (Ringe, Jesus, Liberation, and the Biblical Jubilee), and social-scientific analysis of honor-shame dynamics in village settings (Malina, The New Testament World)."
  },

  // ───────────────────────────────────────────────
  // 6. Sinful Woman Anoints Jesus (7:36-50)
  // ───────────────────────────────────────────────
  {
    id: "luk-sinful-woman-anoints-jesus",
    title: "The Sinful Woman Anoints Jesus — Tears, Perfume, and Forgiveness",
    bookId: "LUK",
    chapterStart: 7,
    verseStart: 36,
    chapterEnd: 7,
    verseEnd: 50,
    summary: `Jesus is eating at the home of Simon the Pharisee. A woman from the city — Luke calls her simply "a sinner," and the town apparently knows what kind — enters uninvited. She stands behind Jesus, weeping. Her tears fall on his feet. She wipes them with her hair, kisses his feet, and pours perfume on them. The scene is physically intimate, socially transgressive, and deeply uncomfortable for everyone watching. Simon thinks to himself: "If this man were a prophet, he would know who is touching him and what kind of woman she is."

Jesus knows exactly what Simon is thinking. He tells a parable: two people owed money. One owed five hundred denarii, the other fifty. Neither could pay. The creditor forgave both debts. "Which of them will love him more?" Simon gives the obvious answer: the one who was forgiven more. Jesus turns to the woman — but speaks to Simon. "Do you see this woman?" he asks. And then he catalogs the hospitality Simon failed to provide: no water for his feet, no kiss of greeting, no oil for his head. But this woman has not stopped kissing his feet, has washed them with tears, has anointed them with perfume. "Therefore, I tell you, her many sins have been forgiven — as her great love has shown."

The other guests mutter: "Who is this who even forgives sins?" But Jesus says to the woman: "Your faith has saved you; go in peace." She has not spoken a single word in the entire passage. Her body, her tears, and her perfume have said everything.`,
    significance: `This passage is one of Luke's most powerful illustrations of the great reversal. The Pharisee, who is religiously correct and socially respectable, fails at basic hospitality. The woman, who is socially disgraced and religiously excluded, provides extravagant, vulnerable love. Jesus does not condemn Simon, but he makes him see: your propriety has blinded you to your own inhospitality, while her shame has become the doorway to extraordinary generosity.

The theological logic is crucial and often misread. Jesus does not say the woman is forgiven because she loved. He says her great love is evidence that she has already been forgiven. Love is the fruit, not the root, of forgiveness. She came to Simon's house already transformed; her actions are gratitude, not transaction.`,
    relationalNote: `The question "Do you see this woman?" is one of the most piercing questions in the Gospels. Simon saw a category: "sinner." Jesus asks him to see a person. The entire passage turns on the difference between seeing someone as a label and seeing them as a human being. Simon's problem is not that he is morally deficient. It is that his moral framework prevents him from seeing what is happening right in front of him. His theology has made him blind to grace.`,
    conceptualNote: `The woman's silence throughout the passage is theologically significant. She never speaks. She never explains herself. She never asks for forgiveness. She simply acts — with tears, touch, perfume. Luke presents a form of faith that is pre-verbal, bodily, and beyond articulation. In a religion that often privileges words — correct doctrine, proper prayers, right confessions — this woman's wordless worship is a rebuke. Sometimes the body knows what the mouth cannot say.`,
    climateNote: `Dining in a Pharisee's home would have followed Greco-Roman symposium customs: guests reclined on couches around a low table, feet extended away from the table. Doors were often open, and uninvited guests could enter to listen to the conversation — this was culturally normal, though their participation would have been limited. The woman's entrance was not itself scandalous; her identity and her physical intimacy with Jesus were. Perfume was expensive — possibly nard, imported from India. This was not a casual gesture. It was an economic sacrifice from a woman whose means of income Luke leaves pointedly unspecified.`,
    modernParallel: `In 2015, a formerly incarcerated woman stood up at a church service in Chicago and shared her testimony. She had served time for drug-related offenses. She spoke about the shame of re-entering her community, the way people crossed the street when they saw her, the churches that welcomed her until they learned her history. Then she described the one congregation that didn't ask questions — they just made space. She wept as she described what it felt like to be seen as a person rather than a record.

Simon's house is every community that welcomes people conditionally — that extends hospitality to the respectable and keeps the disreputable at arm's length. The "sinful woman" is every person who has been reduced to their worst chapter. Jesus' question — "Do you see this woman?" — is the question every community must answer. Not "Do you see her sin?" Not "Do you see her category?" Do you see her?

The passage is also a warning to the religiously respectable: the person you are most tempted to exclude may be the one whose love puts yours to shame. Propriety is not the same as devotion. Correctness is not the same as gratitude.`,
    keyQuestions: JSON.stringify([
      "Jesus says the woman's love is evidence of prior forgiveness, not the cause of it. How does this change the way we understand the relationship between grace and gratitude?",
      "'Do you see this woman?' — How does Simon's inability to see beyond the woman's category mirror our own patterns of judgment?",
      "The woman never speaks. What does her wordless worship suggest about forms of faith that go beyond verbal expression?",
      "Why does Jesus accept physical intimacy from a socially disgraced woman in a public setting? What is he communicating by not recoiling?",
      "How does the parable of the two debtors function in this context? Is Jesus saying that those who have sinned more love more?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Do You See This Woman? — From Categories to Persons", target_audience: "Communities learning to move beyond labels", primary_theme: "dignity" },
      { angle: "Forgiven Much, Loved Much — The Gratitude of the Broken", target_audience: "People carrying shame from their past", primary_theme: "grace" },
      { angle: "When the Respectable Miss the Point", target_audience: "Religiously established congregations", primary_theme: "humility" },
      { angle: "Worship Without Words — The Body's Theology", target_audience: "Those exploring embodied faith practices", primary_theme: "worship" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan forgiveness theology (Green, The Gospel of Luke; Bovon, Luke), Greco-Roman dining customs (Smith, From Symposium to Eucharist), and feminist readings of the anointing tradition (Corley, Private Women, Public Meals)."
  },

  // ───────────────────────────────────────────────
  // 7. Good Samaritan (10:25-37)
  // ───────────────────────────────────────────────
  {
    id: "luk-good-samaritan",
    title: "The Good Samaritan — The Hero Is the Enemy",
    bookId: "LUK",
    chapterStart: 10,
    verseStart: 25,
    chapterEnd: 10,
    verseEnd: 37,
    summary: `A lawyer stands up to test Jesus. "Teacher, what must I do to inherit eternal life?" Jesus turns it back: "What is written in the Law?" The lawyer answers correctly — love God, love your neighbor. Jesus affirms him. But the lawyer, wanting to justify himself, presses further: "And who is my neighbor?" This is the question that prompts one of the most famous stories ever told.

A man is going down from Jerusalem to Jericho — a notoriously dangerous road, a steep descent through desolate terrain. He is attacked by robbers, stripped, beaten, and left half dead. A priest comes by and passes on the other side. A Levite comes and does the same. Then a Samaritan — and here Jesus' original audience would have stiffened. Samaritans were the ethnic and religious enemies of Jews. Centuries of mutual hatred, rooted in theological disputes and ethnic prejudice, made "good Samaritan" an oxymoron. It would be like telling a story in 1960s Alabama where the hero is the person your audience most despises.

The Samaritan stops. He bandages the man's wounds, pours oil and wine on them, puts him on his own donkey, brings him to an inn, and pays for his care — with a blank check for additional expenses. Jesus asks: "Which of these three do you think was a neighbor to the man who fell into the hands of robbers?" The lawyer cannot bring himself to say "the Samaritan." He says: "The one who had mercy on him." And Jesus says: "Go and do likewise."`,
    significance: `The parable does something more radical than most readers realize. The lawyer's question was "Who is my neighbor?" — a boundary question, asking Jesus to define the limits of obligation. Jesus' answer demolishes the question itself. He does not define who qualifies as a neighbor. He redefines what it means to be one. The question is not "Who deserves my help?" but "Am I the kind of person who stops?"

But the truly destabilizing element is the identity of the hero. Jesus could have made the hero an ordinary Jewish layperson — that would have been a critique of religious hypocrisy without disturbing ethnic categories. Instead, he makes the hero a Samaritan. He forces his audience to receive mercy from the person they most despise. The parable does not just teach compassion. It dismantles the categories that make compassion conditional.`,
    relationalNote: `The priest and the Levite are not cartoon villains. They may have had reasons — contact with a possibly dead body would have rendered them ritually unclean, compromising their temple duties. Their failure is not cruelty but the prioritization of religious purity over human need. This is the failure the parable targets most sharply: when your theology gives you a reason to walk past a bleeding person, your theology has become the problem. The Samaritan has no religious obligation to help a Jewish man. He helps because the man is bleeding. That is enough.`,
    conceptualNote: `The parable operates on multiple levels simultaneously. On the surface, it is a story about compassion. But beneath that, it is a story about identity — about who you are willing to receive help from, and what it costs you to admit that your enemy may be more righteous than your priest. The lawyer's inability to say "the Samaritan" reveals the depth of the challenge. Jesus is not asking his audience to be more compassionate. He is asking them to accept compassion from the wrong people. That is harder.`,
    climateNote: `The road from Jerusalem to Jericho drops about 3,400 feet over roughly seventeen miles through rocky, barren terrain. It was known as "the Way of Blood" because of frequent bandit attacks. The detail is not incidental — Jesus is setting his story in a place his audience would recognize as genuinely dangerous. The priest and Levite would have been traveling this road regularly as part of their temple service rotations. Samaritans, whose temple was on Mount Gerizim, would not normally have been on this road at all. The Samaritan's presence is itself unusual, heightening the surprise.`,
    modernParallel: `In 2017, during Hurricane Harvey in Houston, Texas, a group of undocumented immigrants organized rescue boats in the Clodine neighborhood, pulling stranded residents from floodwaters. Some of the people they rescued had yard signs supporting stricter immigration enforcement. The rescuers did not check documentation or political affiliation. They saw people drowning and they stopped. Local media noted the irony; the rescuers did not seem to find it ironic at all. People were drowning. That was enough.

The Good Samaritan is not a story about being nice. It is a story about what happens when the person you have been taught to despise turns out to be the one who saves your life. It is a story that asks: can you receive grace from someone you consider your enemy? Can you admit that the person your community excludes might be more faithful than the people your community honors?

Every generation finds new ways to walk past the bleeding man with a good excuse. And every generation discovers, if it is honest, that the people who stop are not always the ones with the right theology, the right credentials, or the right nationality. They are the ones who see a person bleeding and decide that is enough reason to stop.`,
    keyQuestions: JSON.stringify([
      "The lawyer asks 'Who is my neighbor?' but Jesus answers a different question: 'What kind of neighbor are you?' Why does Jesus refuse to answer the question as asked?",
      "Why does Jesus make the hero a Samaritan rather than an ordinary Jewish layperson? What additional challenge does this create for his audience?",
      "The priest and Levite may have had legitimate religious reasons for passing by. What does this suggest about the relationship between religious obligation and human need?",
      "The lawyer cannot bring himself to say 'the Samaritan.' What does this refusal reveal about the limits of intellectual assent versus genuine transformation?",
      "What contemporary 'Samaritan' figure would most challenge your community if Jesus made them the hero of this story?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "When Your Enemy Is the Hero", target_audience: "Communities navigating cultural or political division", primary_theme: "reconciliation" },
      { angle: "Good Excuses for Walking Past — When Theology Becomes the Problem", target_audience: "Religious professionals and devout practitioners", primary_theme: "integrity" },
      { angle: "The Question Jesus Refused to Answer", target_audience: "People looking for clear boundaries on obligation", primary_theme: "compassion" },
      { angle: "Can You Receive Grace from the Wrong Person?", target_audience: "Those struggling with prejudice or tribalism", primary_theme: "humility" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on parable scholarship (Snodgrass, Stories with Intent; Bailey, Poet and Peasant), Jewish-Samaritan relations (Pummer, The Samaritans), road geography (Murphy-O'Connor, The Holy Land), and critical race theory readings of the parable."
  },

  // ───────────────────────────────────────────────
  // 8. Mary and Martha (10:38-42)
  // ───────────────────────────────────────────────
  {
    id: "luk-mary-and-martha",
    title: "Mary and Martha — Choosing What Is Better",
    bookId: "LUK",
    chapterStart: 10,
    verseStart: 38,
    chapterEnd: 10,
    verseEnd: 42,
    summary: `Jesus enters a village and is welcomed into the home of a woman named Martha. She has a sister named Mary. Mary sits at Jesus' feet and listens to his teaching. The phrase "sat at the Lord's feet" is technical language — it describes the posture of a disciple. Mary is not passively listening; she is assuming the position of a student, which in first-century Judaism was a role reserved for men. Martha, meanwhile, is "distracted by all the preparations that had to be made." She comes to Jesus frustrated: "Lord, don't you care that my sister has left me to do the work by myself? Tell her to help me!"

Jesus' response is gentle but firm: "Martha, Martha, you are worried and upset about many things, but few things are needed — or indeed only one. Mary has chosen what is better, and it will not be taken away from her." The passage is only five verses long. It has generated centuries of interpretation, much of it bad.

The common misreading pits action against contemplation and declares contemplation the winner. But that is not what Luke is doing. The scandal of this passage is not that Mary is sitting still. The scandal is that a woman is sitting at a rabbi's feet as a disciple, and Jesus not only permits it — he defends it. In a culture where women were not taught Torah, where rabbinic sayings like "better to burn the Torah than teach it to a woman" circulated, Jesus affirms a woman's right to learn as a full disciple. Martha's complaint is not just about housework. It is about propriety: Mary is not doing what women are supposed to do. And Jesus says Mary has chosen correctly.`,
    significance: `This passage is often reduced to a lesson about the superiority of prayer over service. That reading is shallow and misses Luke's point. Luke places this story immediately after the Good Samaritan, which is a story about radical action. If Luke meant to say contemplation is better than action, he contradicted himself within five verses. The point is not action versus contemplation. The point is that women have the right to be disciples — to learn, to sit at the rabbi's feet, to be included in the intellectual and spiritual life that was reserved for men.

Jesus' defense of Mary is a defense of women's full participation in the life of faith. "It will not be taken away from her" is a promise that her access to discipleship is permanent, not conditional on male permission or domestic duty.`,
    relationalNote: `Martha is not the villain of this story, despite centuries of preaching that treats her that way. She is doing necessary work — hospitality in the ancient world was not optional, and a guest of Jesus' stature required significant preparation. Her frustration is understandable. What Jesus challenges is not her service but her assumption that Mary should be confined to the same role. Martha wants Jesus to enforce traditional gender expectations. Jesus refuses. The tension between the sisters is the tension between a world that assigns women to domestic service and a kingdom that invites them to the table of learning.`,
    conceptualNote: `The phrase "sat at the Lord's feet" (parakathistheisa pros tous podas tou kuriou) uses language associated with rabbinic discipleship. Paul uses similar language in Acts 22:3: "I studied under [literally, at the feet of] Gamaliel." When Mary sits at Jesus' feet, she is not just listening casually. She is enrolling as a student. In a world where Torah study was men's work, this is a quiet revolution. Luke, who consistently elevates women throughout his Gospel, places this scene here as a programmatic statement: in Jesus' community, women are disciples, not just servers.`,
    climateNote: `Hospitality in the ancient Near East was not a social nicety — it was a sacred obligation. Failure to provide adequate hospitality brought shame on the entire household. Martha's anxiety is rooted in real cultural expectations. The food had to be prepared, the guest had to be honored, and the household's reputation was at stake. For Mary to abandon these duties was a social transgression. For Jesus to defend her was to challenge a deeply rooted cultural system. The domestic sphere was women's domain; by affirming Mary's right to leave it, Jesus is redrawing the boundaries of women's acceptable space.`,
    modernParallel: `In 1956, when the Presbyterian Church (USA) first ordained women as ministers, opponents cited Scripture and tradition to argue that women's proper role was service, not teaching. Supporters pointed to passages like this one — where Jesus explicitly defends a woman's right to learn at the same level as male disciples. The debate was not really about Martha's housework. It was about whether women would be confined to supportive roles or welcomed as full participants in theological leadership.

The same debate continues in communities around the world. In many traditions, women prepare the food, clean the building, teach the children, and organize the events — but are excluded from the pulpit, the elder board, and the seminary classroom. Martha's complaint — "Tell her to help me" — echoes whenever someone says, "Women can serve, but they shouldn't lead." Jesus' response — "Mary has chosen what is better" — is a direct challenge to every system that limits women's access to learning, leadership, and full discipleship.

This passage is not about the superiority of contemplation over action. It is about the right of every person to be a disciple, regardless of what their culture says they are supposed to be doing instead.`,
    keyQuestions: JSON.stringify([
      "How has the common 'action vs. contemplation' reading of this passage obscured its radical implications for women's discipleship?",
      "What does it mean that Luke places this scene immediately after the Good Samaritan, a story that celebrates radical action?",
      "In what ways do contemporary faith communities replicate the dynamic of welcoming women's service while restricting their learning and leadership?",
      "Is Martha wrong to be frustrated? How do we honor necessary service while also challenging systems that confine people to it?",
      "What does Jesus' promise — 'it will not be taken away from her' — mean for women's access to theological education and spiritual authority today?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Not About Housework — The Radical Discipleship of Mary", target_audience: "Women in restrictive religious environments", primary_theme: "equality" },
      { angle: "Martha Is Not the Villain", target_audience: "Overworked servants in church communities", primary_theme: "dignity" },
      { angle: "It Will Not Be Taken Away — The Permanence of Women's Access", target_audience: "Communities debating women's roles", primary_theme: "justice" },
      { angle: "Sitting at the Feet — What Real Discipleship Looks Like", target_audience: "New believers exploring spiritual formation", primary_theme: "discipleship" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan gender scholarship (Seim, The Double Message; Spencer, Salty Wives, Spirited Mothers, and Savvy Widows), rabbinic discipleship conventions (Hengel, The Charismatic Leader and His Followers), and ancient hospitality customs (Arterbury, Entertaining Angels)."
  },

  // ───────────────────────────────────────────────
  // 9. Prodigal Son (15:11-32)
  // ───────────────────────────────────────────────
  {
    id: "luk-prodigal-son",
    title: "The Prodigal Son — The Greatest Short Story Ever Told",
    bookId: "LUK",
    chapterStart: 15,
    verseStart: 11,
    chapterEnd: 15,
    verseEnd: 32,
    summary: `A man has two sons. The younger one says to his father: "Give me my share of the estate." In the cultural context, this is not just rude — it is a death wish. The son is essentially saying, "I wish you were dead so I could have my inheritance now." The father, astonishingly, complies. The son takes the money, leaves for a distant country, and squanders everything in "wild living." A famine comes. He ends up feeding pigs — the ultimate degradation for a Jewish man. He is so hungry he envies the pigs their food. He "comes to his senses" and decides to go home, rehearsing a speech: "Father, I have sinned against heaven and against you. I am no longer worthy to be called your son; make me like one of your hired servants."

But the father has been watching the road. He sees the son "while he was still a long way off." He runs — a detail that would have shocked Jesus' audience, because dignified Middle Eastern patriarchs did not run. He throws his arms around the son, kisses him, and before the son can finish his rehearsed speech, the father orders the best robe, a ring, sandals, and a fattened calf. The son came back asking to be a servant. The father reinstates him as a son.

Then there is the older brother. He has been in the field — faithfully working, as always. He hears music and dancing, learns what has happened, and refuses to go in. He is furious. "Look! All these years I've been slaving for you and never disobeyed your orders. Yet you never gave me even a young goat so I could celebrate with my friends. But when this son of yours who has squandered your property with prostitutes comes home, you kill the fattened calf for him!" The father goes out to him — he goes out to both sons, the one who left and the one who stayed — and says: "Son, you are always with me, and everything I have is yours. But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found."

The story ends without resolution. We never learn whether the older brother goes in.`,
    significance: `This parable is often called the story of the prodigal son, but it might more accurately be called the story of the prodigal father — "prodigal" meaning extravagant, wasteful. The father's grace is scandalous. He does not demand an explanation. He does not impose a probationary period. He does not even let the son finish his carefully rehearsed apology. He simply restores him. This is Luke's picture of God: a parent who runs down the road to embrace the child who wished him dead.

But the older brother is the real point of the parable. Luke tells us the context: Jesus is telling this story because "the Pharisees and the teachers of the law muttered, 'This man welcomes sinners and eats with them'" (15:2). The older brother is the Pharisee. He is the one who has done everything right, who has never left, who has been faithful — and who is now furious that the father's love extends to the one who wasted everything. The parable's open ending is a challenge: will you come to the party, or will your resentment at grace keep you outside?`,
    relationalNote: `The father goes out to both sons. This is easily missed but essential. When the younger son returns, the father runs out to meet him. When the older son refuses to come in, the father goes out to him too. The father is always the one who moves toward the alienated child. He does not stand in the doorway and wait. He does not send a servant. He goes out himself. Both sons have distorted their relationship with the father — one through rebellion, the other through servile obedience ("I've been slaving for you"). Neither son understands that the father's love is not transactional. It is not earned by staying or forfeited by leaving. It simply is.`,
    conceptualNote: `The older brother's complaint — "I've been slaving for you" — reveals that his faithfulness was not love but obligation. He obeyed, but he did it as a slave, not a son. He never accessed the relationship that was always available to him. "Everything I have is yours" — the father's words suggest that the older son could have thrown his own party anytime he wanted. He never did. He was too busy earning what was already given. This is the parable's deepest challenge: it is possible to stay in the father's house and never experience the father's love. Proximity is not the same as intimacy. Obedience is not the same as relationship.`,
    climateNote: `In the honor-shame culture of first-century Palestine, the younger son's request for his inheritance was a grievous insult — a public declaration that his father was as good as dead. The father's decision to grant it would have been seen as weakness. His running to embrace the returning son would have been undignified — older men of status did not run. The feast and the robe and the ring are acts of public restoration, declaring to the entire village that this son's status is fully reinstated. Every detail of the story would have been culturally jarring to Jesus' original audience. The father violates social norms at every turn, and that is precisely the point.`,
    modernParallel: `In 2018, Brandt Jean, the brother of Botham Jean — an unarmed Black man shot and killed in his own apartment by an off-duty police officer in Dallas — embraced the convicted officer in the courtroom and said, "I forgive you." The moment was broadcast worldwide. Responses were divided. Some saw it as a powerful act of grace. Others were troubled: why was a victim's family member expected to perform forgiveness while systemic injustice remained unaddressed? Both responses have merit, and they mirror the tension in the parable.

The prodigal son story is about the extravagance of grace, but it does not resolve the question of justice. The father forgives freely, but the older brother's complaint is not baseless: fairness seems violated. The parable does not answer the older brother's objection. It simply asks: will you come to the party anyway? Can you celebrate someone else's restoration even when it feels unfair?

Every family, every church, every community faces this question. The addict who comes back. The member who left and wants to return. The person who wasted everything and now wants a seat at the table. The prodigal son's return is easy to celebrate in a sermon. It is much harder to celebrate when it is your resources, your patience, your sense of fairness that is being asked to stretch. The older brother is in every congregation. He is the one who did everything right and resents that it wasn't enough to earn what was freely given all along.`,
    keyQuestions: JSON.stringify([
      "Why does the parable end without telling us whether the older brother goes in? What is Luke doing by leaving the story unresolved?",
      "The older brother says 'I've been slaving for you.' What does this reveal about how he understood his relationship with the father?",
      "The father runs to meet the younger son before hearing his apology. What does this say about the nature of forgiveness — is repentance a prerequisite or a response?",
      "Is the older brother's complaint legitimate? Is there a valid concern about fairness embedded in his anger?",
      "In what ways do 'older brother' dynamics — resentment at grace extended to others — show up in contemporary church life?",
      "Who is the parable really about: the younger son, the older brother, or the father?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Older Brother Is the Point", target_audience: "Long-time church members who resent newcomers", primary_theme: "grace" },
      { angle: "Running Down the Road — The Undignified Love of God", target_audience: "People who feel too far gone for forgiveness", primary_theme: "restoration" },
      { angle: "Slaving in the Father's House — Obedience Without Intimacy", target_audience: "Burned-out, dutiful Christians", primary_theme: "relationship" },
      { angle: "The Open Ending — Will You Come to the Party?", target_audience: "People struggling with others receiving unearned grace", primary_theme: "generosity" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on parable scholarship (Bailey, The Cross and the Prodigal; Snodgrass, Stories with Intent), Middle Eastern cultural analysis (Bailey, Poet and Peasant and Through Peasant Eyes), and honor-shame framework (deSilva, Honor, Patronage, Kinship and Purity)."
  },

  // ───────────────────────────────────────────────
  // 10. Rich Man and Lazarus (16:19-31)
  // ───────────────────────────────────────────────
  {
    id: "luk-rich-man-and-lazarus",
    title: "The Rich Man and Lazarus — The Great Reversal After Death",
    bookId: "LUK",
    chapterStart: 16,
    verseStart: 19,
    chapterEnd: 16,
    verseEnd: 31,
    summary: `There was a rich man who dressed in purple and fine linen and feasted sumptuously every day. At his gate lay a poor man named Lazarus, covered with sores, who longed to eat what fell from the rich man's table. Even the dogs came and licked his sores. Both men die. Lazarus is carried by angels to Abraham's side. The rich man goes to Hades, where he is in torment.

The rich man looks up and sees Abraham far away, with Lazarus beside him. He calls out: "Father Abraham, have pity on me and send Lazarus to dip the tip of his finger in water and cool my tongue." Even in torment, the rich man treats Lazarus as a servant — someone to be sent on errands. Abraham responds: "Son, remember that in your lifetime you received your good things, while Lazarus received bad things, but now he is comforted here and you are in agony. And besides all this, between us and you a great chasm has been set in place."

The rich man then asks Abraham to send Lazarus to his five brothers to warn them. Abraham says they have Moses and the Prophets — let them listen. The rich man insists: "No, father Abraham, but if someone from the dead goes to them, they will repent." Abraham's response closes the story with devastating finality: "If they do not listen to Moses and the Prophets, they will not be convinced even if someone rises from the dead."`,
    significance: `This is the only parable in which a character is given a name, and it is the poor man who is named. The rich man is anonymous. In the world of the story — and in the economy of Luke's Gospel — it is the poor man who has identity and the rich man who is generic. This is the great reversal in miniature: the person who mattered in life (the rich man, dressed in purple, feasting daily) becomes nobody in death, while the person who was nobody (Lazarus, at the gate, licked by dogs) becomes somebody.

The parable is not primarily about the afterlife. It is about the moral blindness of wealth. The rich man's sin is not that he actively harmed Lazarus. It is that he walked past him every day and did nothing. Lazarus was at his gate. He was visible. The rich man simply did not see him — or saw him and decided he did not matter. This is the sin Luke has been warning about since the Magnificat: the rich go empty because their wealth has made them unable to see the poor at their own gate.`,
    relationalNote: `Even in Hades, the rich man does not address Lazarus directly. He speaks to Abraham and refers to Lazarus in the third person — "send Lazarus." The relational failure that defined his life continues after death. He still cannot see Lazarus as a person to be addressed, only as a servant to be dispatched. The chasm between them is not just geographical. It is relational — the rich man never learned to see Lazarus as a fellow human being, and now it is too late.`,
    conceptualNote: `Abraham's final line — "If they do not listen to Moses and the Prophets, they will not be convinced even if someone rises from the dead" — is devastatingly ironic in Luke's broader narrative. Someone does rise from the dead. And many are not convinced. The parable suggests that the problem is not insufficient evidence but hardened hearts. The Torah and the Prophets already command care for the poor. If you have not listened to what Scripture already says about justice, no amount of spectacular proof will change your mind. The problem is not information. It is formation.`,
    climateNote: `The rich man's clothing — purple and fine linen — signals extreme wealth. Purple dye was extraordinarily expensive, extracted from murex shellfish. Fine linen (byssos) was imported, often from Egypt. His daily feasting was not occasional celebration but habitual luxury. Meanwhile, Lazarus at the gate represents the urban poor of first-century cities — people who lived at the margins of wealthy households, dependent on scraps. The gate is a boundary marker: it separates the world of abundance from the world of deprivation, and the rich man crosses it daily without ever crossing the moral distance between them.`,
    modernParallel: `In most major American cities, the distance between extreme wealth and extreme poverty can be measured in city blocks. In San Francisco, tech workers earning six-figure salaries step over homeless encampments on their way to work. In New York, luxury condominiums rise above shelters. In Mumbai, slums press against the walls of gated communities. The gate of the rich man's house is replicated millions of times over in every city where wealth and poverty share the same geography but not the same reality.

The parable does not condemn wealth in the abstract. It condemns the specific moral failure of proximity without compassion — of being close enough to see suffering and choosing not to respond. The rich man knew Lazarus was there. He knew his name (he uses it in Hades). He simply decided, every day, that Lazarus's suffering was not his problem. This is not dramatic villainy. It is the quiet, daily decision to look away. And Luke says it has eternal consequences.

Abraham's refusal to send a messenger from the dead is a rebuke to every generation that says, "If only God would give us a sign, we would believe." The sign is already there. The poor are at the gate. Moses and the Prophets have spoken. The question is not whether we have enough information. The question is whether we have enough will.`,
    keyQuestions: JSON.stringify([
      "Why is the poor man named (Lazarus) while the rich man is anonymous? What is Luke communicating about identity and worth?",
      "The rich man's sin is not active cruelty but passive indifference. How does this challenge our typical categories of sin?",
      "Even in Hades, the rich man treats Lazarus as a servant. What does this suggest about the persistence of unjust relational patterns?",
      "Abraham says 'they have Moses and the Prophets.' What do the Hebrew Scriptures already say about care for the poor, and why is that sufficient?",
      "How does the final line — about not being convinced 'even if someone rises from the dead' — function as irony within Luke's larger narrative?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Poor Man Has a Name — Who We See and Who We Don't", target_audience: "Affluent congregations in proximity to poverty", primary_theme: "justice" },
      { angle: "The Sin of Walking Past", target_audience: "People struggling with complicity in systemic inequality", primary_theme: "repentance" },
      { angle: "You Already Have Moses and the Prophets", target_audience: "Those seeking signs instead of obeying what they already know", primary_theme: "obedience" },
      { angle: "The Chasm That Wealth Creates", target_audience: "Business leaders and professionals", primary_theme: "stewardship" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan wealth ethics (Hays, Luke's Wealth Ethics; Johnson, Sharing Possessions), parable scholarship (Snodgrass, Stories with Intent), and Egyptian/Jewish afterlife traditions that may inform the story's imagery."
  },

  // ───────────────────────────────────────────────
  // 11. Ten Lepers (17:11-19)
  // ───────────────────────────────────────────────
  {
    id: "luk-ten-lepers",
    title: "The Ten Lepers — One Returned, a Samaritan",
    bookId: "LUK",
    chapterStart: 17,
    verseStart: 11,
    chapterEnd: 17,
    verseEnd: 19,
    summary: `Jesus is traveling along the border between Samaria and Galilee — a liminal space, a boundary zone where Jews and Samaritans share geography if not theology. Ten men with leprosy meet him. They stand at a distance — as required by law, their disease making them ritually and socially untouchable — and call out: "Jesus, Master, have pity on us!" Jesus tells them to go and show themselves to the priests. As they go, they are cleansed.

One of them, when he sees he is healed, comes back. He throws himself at Jesus' feet, thanking him. And Luke adds the detail that changes everything: "And he was a Samaritan." Jesus asks three questions: "Were not all ten cleansed? Where are the other nine? Has no one returned to give praise to God except this foreigner?" Then he says to the man: "Rise and go; your faith has made you well."

The passage is brief and its surface lesson seems simple: be grateful. But Luke is doing something more pointed. The nine who did not return were presumably Jewish. They did what Jesus told them — they went to the priests, as Torah required for certification of cleansing. They were obedient. They followed the rules. The Samaritan was the one who broke protocol, who turned back, who fell at Jesus' feet. And he is the one Jesus commends. Once again, in Luke's Gospel, the outsider gets it right while the insiders follow procedure and miss the point.`,
    significance: `The story of the ten lepers continues Luke's sustained argument that ethnic and religious identity do not determine spiritual sensitivity. The Samaritan — the outsider, the one with the wrong theology, the one whose worship centered on the wrong mountain — is the one who recognizes what has happened to him and responds with gratitude. The nine Jewish lepers did exactly what they were supposed to do. They followed Jesus' instructions. They went to the priests. Their obedience was correct. But correct obedience is not the same as transformative encounter.

Jesus' word to the Samaritan — "your faith has made you well" — uses the word sozo, which means both "healed" and "saved." The nine were healed. The Samaritan was saved. The distinction matters. All ten received physical restoration. Only one received the fullness of what Jesus offered.`,
    relationalNote: `Leprosy created a forced community of the excluded. In the leper colony, the usual divisions — Jew and Samaritan, priest and layperson — dissolved. Shared suffering erased the boundaries that healthy society enforced. But once healed, the old categories reasserted themselves. The nine Jewish lepers returned to the Jewish system (the priests). The Samaritan had no Jewish priest to go to — and perhaps that is precisely why he came back to Jesus. Sometimes the people with the fewest institutional options are the most likely to encounter God directly.`,
    conceptualNote: `There is a subtle but important distinction between obedience and gratitude in this passage. The nine were obedient — they did what Jesus said. But obedience can be performed without transformation. Gratitude requires something more: it requires recognizing what has happened to you, interrupting your agenda, and turning back. The Samaritan's gratitude is not just polite thankfulness. It is a reorientation of his entire life toward the source of his healing. Gratitude, in Luke's theology, is not a feeling. It is a direction.`,
    climateNote: `Leprosy (which in biblical usage covers a range of skin conditions, not just Hansen's disease) was both a medical and a social catastrophe. Lepers were excluded from communal life, required to announce their presence so others could avoid them, and were dependent on charity. The border region between Samaria and Galilee was already marginal territory — ethnically mixed, politically ambiguous, religiously contested. Setting this story there underscores the theme of liminality: the healing happens in the in-between spaces, among people who don't fit neatly into established categories.`,
    modernParallel: `During the early years of the HIV/AIDS crisis in the 1980s, many religious communities treated people with AIDS the way ancient communities treated lepers — as untouchable, contaminated, deserving of their suffering. Some of the most compassionate care came not from established religious institutions but from unexpected quarters: drag queens organizing fundraisers, gay men forming buddy systems to care for the dying, secular nurses volunteering in hospices when religious hospitals turned patients away. The "outsiders" — the people the religious establishment had excluded — became the ones who showed up.

Luke's ten lepers story is a pattern that repeats across history: institutional religion provides structure and correct procedure, but it is often the outsider, the foreigner, the one with the "wrong" credentials, who recognizes grace when it arrives and responds with uncalculated gratitude. The nine did everything right. The one who did something unexpected was the Samaritan.

Gratitude is not a polite religious habit. It is the capacity to recognize that something has happened to you that you did not earn and cannot repay. The Samaritan had that capacity. The nine, for all their correctness, apparently did not. Every community must ask itself: are we the nine, following the rules back to the system? Or are we the one, turning back in stunned thankfulness?`,
    keyQuestions: JSON.stringify([
      "All ten were healed, but Jesus says only the Samaritan's faith 'made him well' (sozo — saved). What is the difference between healing and salvation in this passage?",
      "The nine did exactly what Jesus told them to do — they went to the priests. Why is their obedience insufficient?",
      "Why does Luke emphasize that the one who returned was a Samaritan? What pattern in his Gospel does this reinforce?",
      "What is the relationship between gratitude and faith? Is gratitude a response to faith, or is it a form of faith itself?",
      "Shared suffering dissolved the boundary between Jew and Samaritan in the leper colony. What happens when healing restores old divisions?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Outsider Who Got It Right — Again", target_audience: "Communities examining who they consider insiders and outsiders", primary_theme: "inclusion" },
      { angle: "Obedience Is Not Enough — From Compliance to Gratitude", target_audience: "Rule-following Christians feeling spiritually empty", primary_theme: "transformation" },
      { angle: "Healed vs. Saved — The Fullness of What Jesus Offers", target_audience: "People seeking deeper spiritual experience", primary_theme: "wholeness" },
      { angle: "When Suffering Dissolves Boundaries", target_audience: "Diverse or divided communities", primary_theme: "unity" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Lukan Samaritan motif scholarship (Ravens, Luke and the Restoration of Israel), purity and leprosy laws (Milgrom, Leviticus), and narrative analysis of the Galilee-Samaria border setting (Freyne, Galilee, Jesus, and the Gospels)."
  },

  // ───────────────────────────────────────────────
  // 12. Zacchaeus (19:1-10)
  // ───────────────────────────────────────────────
  {
    id: "luk-zacchaeus",
    title: "Zacchaeus — The Collaborator in the Tree",
    bookId: "LUK",
    chapterStart: 19,
    verseStart: 1,
    chapterEnd: 19,
    verseEnd: 10,
    summary: `Jesus enters Jericho, and a man named Zacchaeus wants to see him. Luke tells us three things about Zacchaeus: he was a chief tax collector, he was wealthy, and he was short. The first two details matter far more than the third, though children's sermons have spent decades focusing on the wrong one.

Zacchaeus was not merely a tax collector — he was a chief tax collector (architelones), a man who ran the franchise. The Roman taxation system in Palestine was essentially legalized extortion. Rome set a base amount to be collected; tax collectors could charge whatever they wanted above that and keep the difference. Chief tax collectors supervised other collectors and skimmed from their take. Zacchaeus was rich because he was a thief, and he was a thief in the service of the occupying empire. He was a collaborator — a Jewish man who had sold out his own people to enrich himself through the machinery of their oppression. In modern terms, he was not a quirky little man in a tree. He was a war profiteer.

He climbs a sycamore-fig tree to see Jesus over the crowd. Jesus looks up and says: "Zacchaeus, come down immediately. I must stay at your house today." The crowd mutters — the same response Luke has documented before: "He has gone to be the guest of a sinner." But Zacchaeus stands and says: "Look, Lord! Here and now I give half of my possessions to the poor, and if I have cheated anybody out of anything, I will pay back four times the amount." Jesus responds: "Today salvation has come to this house, because this man, too, is a son of Abraham. For the Son of Man came to seek and to save the lost."`,
    significance: `The Zacchaeus story is the capstone of Luke's treatment of wealth and salvation. Throughout his Gospel, Luke has warned about the dangers of riches — the Magnificat, the Beatitudes ("Woe to you who are rich"), the Rich Fool, the Rich Man and Lazarus. The rich young ruler walked away sad because he could not give up his possessions. Zacchaeus is the exception — the wealthy person who actually does what the rich young ruler could not. He gives away half his wealth and repays his theft fourfold. Salvation, in Luke's theology, is not merely a spiritual transaction. It has economic consequences. When salvation comes to Zacchaeus's house, money changes hands.

Jesus' declaration — "this man, too, is a son of Abraham" — is a restoration of identity. Zacchaeus had been excluded from the covenant community by his own complicity with Rome. Jesus does not erase what Zacchaeus did. He restores what Zacchaeus is: a son of Abraham, a member of the family. But the restoration comes with restitution. Grace is not cheap in Luke's Gospel.`,
    relationalNote: `Jesus invites himself to Zacchaeus's house. This is significant. He does not wait to be asked. He does not set conditions. He does not say, "Repent first, and then I'll come." He initiates the relationship before any sign of change. The crowd objects because Jesus is associating with a sinner. But it is precisely the association — Jesus' willingness to enter Zacchaeus's world — that creates the conditions for transformation. Zacchaeus's repentance and restitution come after Jesus' acceptance, not before. This is the Lukan pattern: grace precedes repentance. The father runs to the prodigal before the son finishes his speech. Jesus enters the sinner's house before the sinner has changed.`,
    conceptualNote: `Zacchaeus's restitution follows Torah: Exodus 22:1 prescribes fourfold repayment for stolen goods. His giving of half his possessions to the poor goes beyond what the Law requires. This is not guilt-driven generosity — it is the economic expression of a transformed identity. Zacchaeus built his life on taking. Now he gives. The transformation is not just moral; it is structural. He is dismantling the system that made him rich. This is what repentance looks like in Luke's Gospel: not just feeling sorry, but redistributing resources. If your repentance does not affect your bank account, Luke would question whether it is repentance at all.`,
    climateNote: `Jericho was a wealthy city, strategically located as a trade crossroads and the site of Herod the Great's winter palace. It was also a center for balsam production, a lucrative industry. The taxation system in Jericho would have been particularly profitable — and particularly oppressive — given the volume of trade passing through. Zacchaeus's position as chief tax collector in Jericho made him one of the wealthiest and most despised men in the region. Sycamore-fig trees were common in the Jordan Valley and could grow to forty feet, with low, spreading branches easy to climb. The detail is not trivial; it places the story in a specific landscape.`,
    modernParallel: `In post-apartheid South Africa, the Truth and Reconciliation Commission required perpetrators of human rights abuses to publicly confess their crimes in order to receive amnesty. Some of the most powerful moments came when beneficiaries of apartheid — not just soldiers and police, but business owners, bureaucrats, and ordinary white South Africans who had profited from the system — stood up and acknowledged their complicity. Some offered restitution. Most did not. The ones who did found that confession without material reparation felt hollow, while those who actually transferred resources — land, money, opportunity — experienced something closer to genuine reconciliation.

Zacchaeus is the biblical model for what repentance looks like when your sin has economic dimensions. He does not merely apologize. He does not merely feel bad. He gives away half his wealth and repays his victims fourfold. This is not penance; it is justice. And Jesus calls it salvation. The modern church often separates spiritual salvation from economic justice, as though you can be saved without your wallet noticing. Luke insists otherwise.

The story of Zacchaeus is a challenge to every person and institution that has profited from unjust systems. Climbing down from the tree is not enough. Hosting Jesus for dinner is not enough. Salvation comes to the house when the stolen goods are returned with interest.`,
    keyQuestions: JSON.stringify([
      "How does understanding Zacchaeus as a collaborator and war profiteer — rather than a 'wee little man' — change the way you read this story?",
      "Jesus enters Zacchaeus's house before Zacchaeus repents. What does this suggest about the relationship between grace and transformation?",
      "Zacchaeus gives away half his wealth and repays fourfold. Is this restitution or generosity? What is the difference?",
      "Jesus says 'salvation has come to this house.' How does Luke define salvation in economic terms throughout his Gospel?",
      "What would Zacchaeus-like repentance look like for individuals and institutions that have profited from unjust systems today?",
      "Why does the crowd object to Jesus eating with Zacchaeus? What does their reaction reveal about the limits of their understanding of God's grace?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "The Collaborator Who Climbed Down — Repentance with a Price Tag", target_audience: "Affluent Christians examining complicity", primary_theme: "repentance" },
      { angle: "Grace Before Change — Jesus Enters Before Zacchaeus Reforms", target_audience: "People who feel they must clean up before God will accept them", primary_theme: "grace" },
      { angle: "When Salvation Hits Your Bank Account", target_audience: "Communities exploring the economic dimensions of faith", primary_theme: "justice" },
      { angle: "A Son of Abraham — Restored Identity After Complicity", target_audience: "People carrying guilt from participation in harmful systems", primary_theme: "restoration" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Roman taxation system scholarship (Donahue, Tax Collectors and Sinners; Udoh, To Caesar What Is Caesar's), Lukan wealth ethics (Johnson, Sharing Possessions), and Jericho archaeology and geography (Netzer, The Palaces of the Hasmoneans and Herod the Great)."
  },

  // ───────────────────────────────────────────────
  // 13. Road to Emmaus (24:13-35)
  // ───────────────────────────────────────────────
  {
    id: "luk-road-to-emmaus",
    title: "The Road to Emmaus — The Risen Jesus Unrecognized",
    bookId: "LUK",
    chapterStart: 24,
    verseStart: 13,
    chapterEnd: 24,
    verseEnd: 35,
    summary: `It is the afternoon of resurrection day. Two disciples — one named Cleopas, the other unnamed — are walking from Jerusalem to Emmaus, about seven miles. They are talking about everything that has happened. Jesus himself draws near and walks with them, "but they were kept from recognizing him." He asks what they are discussing. They stop, their faces downcast. Cleopas answers with something close to exasperation: "Are you the only one visiting Jerusalem who does not know the things that have happened there in these days?"

They tell the stranger about Jesus of Nazareth — "a prophet, powerful in word and deed before God and all the people" — and how the chief priests and rulers had him crucified. "But we had hoped that he was the one who was going to redeem Israel." The past tense is crushing: "we had hoped." And now some women from their group have found the tomb empty, have reported a vision of angels, have said he is alive — "but him they did not see."

Jesus responds: "How foolish you are, and how slow to believe all that the prophets have spoken!" And beginning with Moses and all the Prophets, he explains to them what was said in all the Scriptures concerning himself. They reach Emmaus. Jesus acts as though he will go farther. They urge him to stay: "Stay with us, for it is nearly evening." He does. He takes bread, gives thanks, breaks it, and gives it to them. "Then their eyes were opened and they recognized him, and he disappeared from their sight." They say to each other: "Were not our hearts burning within us while he talked with us on the road and opened the Scriptures to us?"

They get up immediately and walk the seven miles back to Jerusalem in the dark to tell the others.`,
    significance: `The Emmaus road is Luke's masterful account of how the risen Christ is encountered: through Scripture and through the breaking of bread. The disciples' eyes are opened not by a dramatic apparition but by the ordinary, liturgical act of a shared meal. This has shaped Christian worship for two millennia — the service of the Word (Scripture explained) followed by the service of the Table (bread broken) is the Emmaus pattern, and it remains the structure of Christian liturgy across traditions.

The passage is also about the necessity of reinterpreting everything in light of the resurrection. Jesus walks them through the entire Hebrew Bible, showing them what they had missed. The Scriptures had been available all along. What was missing was the interpretive key: the suffering Messiah. Sometimes the truth is not hidden. It is simply unrecognized because our categories are too small.`,
    relationalNote: `The dynamic of companionship on the road is central to this passage. Jesus does not appear in a blaze of glory. He falls into step beside two grieving, confused, disappointed people and walks with them. He asks questions. He listens. He lets them pour out their grief before he speaks. The incarnational pattern continues even after the resurrection: God draws near by walking alongside, not by arriving above. The unnamed second disciple has invited centuries of speculation — and perhaps that is the point. The unnamed disciple is an open seat. It could be anyone. It could be you, walking and grieving and not yet recognizing who is beside you.`,
    conceptualNote: `"We had hoped" (elpizomen) is one of the most theologically honest phrases in the New Testament. It is faith in the past tense — the language of dashed expectation. These disciples believed Jesus would redeem Israel, and he was crucified instead. Their theology could not accommodate a dead Messiah. The Emmaus road is about the reconstruction of faith after its categories have been shattered. Jesus does not condemn their grief. He walks through it with them, giving them a new framework — not abandoning the old Scriptures but revealing depths they had not seen. Faith after disappointment is not a return to the old faith. It is a deeper faith, forged in the fire of "we had hoped."`,
    climateNote: `Emmaus's exact location is debated — candidates include modern-day Abu Ghosh, Motza, and Latrun, all within plausible walking distance from Jerusalem. The seven-mile walk (sixty stadia in some manuscripts, 160 in others) would have taken roughly two to three hours. Walking in the late afternoon, with evening approaching, the disciples' invitation for the stranger to stay was culturally expected — travel after dark was dangerous. The shared meal would have been simple, likely bread and whatever was available. The eucharistic overtones are unmistakable: Jesus "took bread, gave thanks, broke it, and gave it to them" — the same four verbs used at the Last Supper.`,
    modernParallel: `In 2019, a grief counselor in Portland, Oregon, described a practice she called "walk-and-talk therapy" — meeting clients not in an office but on a trail, walking side by side rather than sitting face to face. She found that people disclosed more, processed more deeply, and felt less clinical pressure when they were in motion together. The shared direction of movement, the absence of direct eye contact, the rhythm of walking — all created conditions for honesty that a formal setting could not replicate.

The Emmaus road is walk-and-talk therapy with the risen Christ. Jesus does not sit the disciples down and lecture them. He falls into step. He asks what they are talking about. He listens to their disappointment. He walks with their grief before he redirects it. The recognition happens not on the road but at the table — not during the teaching but during the meal. The Emmaus pattern suggests that encounter with Christ is often gradual, relational, and embedded in ordinary acts: walking, talking, eating together.

For anyone who has experienced the "we had hoped" of dashed faith — the prayer not answered, the healing not given, the justice not done — the Emmaus road is an invitation. The disappointment is real. The grief is valid. And the risen Christ may be walking beside you, unrecognized, waiting for the moment when bread is broken and eyes are opened.`,
    keyQuestions: JSON.stringify([
      "'We had hoped' — what does it mean to hold faith in the past tense? How do people rebuild belief after profound disappointment?",
      "Why were the disciples 'kept from recognizing' Jesus? What does this suggest about the nature of resurrection appearances?",
      "Recognition comes not during the Scripture teaching but during the breaking of bread. What does this suggest about where and how Christ is encountered?",
      "The disciples walk seven miles back to Jerusalem in the dark after recognizing Jesus. What compels them? What has changed?",
      "How does the Emmaus pattern — Word and Table — continue to shape Christian worship, and what is lost when one element is emphasized at the expense of the other?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "We Had Hoped — Faith After Disappointment", target_audience: "People who have experienced spiritual disillusionment", primary_theme: "hope" },
      { angle: "The Stranger on the Road — Christ Unrecognized", target_audience: "Those feeling distant from God", primary_theme: "presence" },
      { angle: "Known in the Breaking of Bread — Encounter at the Table", target_audience: "Eucharistic or communion-centered communities", primary_theme: "sacrament" },
      { angle: "Hearts Burning — When Scripture Comes Alive", target_audience: "Bible study groups and teachers", primary_theme: "revelation" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on Emmaus road scholarship (Dillon, From Eye-Witnesses to Ministers of the Word; Just, The Ongoing Feast), eucharistic theology in Luke-Acts (LaVerdiere, Dining in the Kingdom of God), and geography of Emmaus candidates (Taylor, Christians and the Holy Places)."
  },

  // ───────────────────────────────────────────────
  // 14. Ascension (24:50-53)
  // ───────────────────────────────────────────────
  {
    id: "luk-ascension",
    title: "The Ascension — Departure and Joy",
    bookId: "LUK",
    chapterStart: 24,
    verseStart: 50,
    chapterEnd: 24,
    verseEnd: 53,
    summary: `The Gospel of Luke ends with an astonishing brevity and an even more astonishing emotion. Jesus leads the disciples out to the vicinity of Bethany — the village on the Mount of Olives where Martha, Mary, and Lazarus lived, where Jesus had been welcomed and fed. He lifts his hands and blesses them. "While he was blessing them, he left them and was taken up into heaven." That is it. No dramatic speech. No final commission (Luke saves that for Acts). Just a blessing, and then absence.

The disciples' response is the surprise. They worship him. And then — "they returned to Jerusalem with great joy." Not grief. Not confusion. Not the devastation of another departure. Joy. They have just watched their Lord leave, and they are joyful. They go to the temple — the same temple where the Gospel began, with Zechariah and the angel — and they stay there, "continually praising God."

Luke's Gospel begins in the temple with a priest struck silent and ends in the temple with disciples filled with praise. It begins with an old man unable to speak and ends with a community that cannot stop speaking. The silence has been broken. The story has come full circle. And the emotion at the end is not the melancholy of goodbye but the energy of a beginning.`,
    significance: `The ascension is often treated as a postscript — the last thing before Acts begins. But Luke crafts it as the theological climax of his Gospel. Jesus' departure is not loss. It is commission. The blessing he extends as he ascends is an ongoing act — "while he was blessing them" suggests continuity, not conclusion. The disciples are sent into the world under an active, unfinished blessing.

The joy is theologically crucial. In most human experience, departure means grief. The ascension inverts this. The disciples are joyful because they understand that Jesus' departure is not absence but a new mode of presence. He is not gone. He is enthroned. And the Spirit — which Luke will narrate in Acts — is coming. The joy at the ascension is anticipatory: it is the joy of people who know that what is ending is actually beginning.`,
    relationalNote: `Jesus' final act is not a command but a blessing. He does not leave his disciples with instructions (that comes in Acts 1). He leaves them with his hands raised over them in benediction. This is pastoral, not strategic. It is the gesture of a parent blessing children before a journey. The relationship between Jesus and his disciples is not concluded at the ascension. It is transformed. Physical presence gives way to spiritual presence, and the disciples' response — worship, joy, praise — suggests they understand the transformation rather than experiencing it as abandonment.`,
    conceptualNote: `The circularity of Luke's narrative — beginning and ending in the temple — is deliberate literary architecture. But the temple at the end is not the same as the temple at the beginning. At the beginning, the temple is a place of priestly silence and angelic disruption. At the end, it is a place of communal praise and joyful expectation. The institution has not changed, but the people in it have been transformed. Luke's Gospel does not reject the temple. It fills it with a new kind of worship — the worship of people who have seen the risen Christ and are waiting for the Spirit. The old wineskins are being stretched by new wine.`,
    climateNote: `Bethany was a small village on the eastern slope of the Mount of Olives, about two miles from Jerusalem. It was closely associated with Jesus' ministry — the home of Martha, Mary, and Lazarus, and the place from which he launched his final entry into Jerusalem. The Mount of Olives itself held deep prophetic significance: Zechariah 14:4 prophesied that the Lord would stand on the Mount of Olives in the day of final redemption. Luke's geography is theologically loaded — Jesus ascends from the place the prophets said God would arrive. The temple, visible from the Mount of Olives across the Kidron Valley, is both the origin and the destination of the Gospel's narrative arc.`,
    modernParallel: `In 2013, Pope Benedict XVI became the first pope in six centuries to resign. His departure from the Vatican — a helicopter lifting off from the grounds of St. Peter's while the bells rang — was watched by millions. Many Catholics experienced grief, confusion, and even a sense of abandonment. But Benedict himself framed the departure differently: it was not an ending but a transition. The church would continue. New leadership would come. His departure was an act of trust in the institution's future.

The ascension is the ultimate act of institutional trust. Jesus leaves. He does not appoint a successor in the traditional sense. He does not leave a manual. He blesses his followers and departs, trusting that the Spirit will do what his physical presence did. This is terrifying for any organization — the founder leaving with nothing but a blessing and a promise. And yet the disciples' response is not institutional panic. It is joy.

For any community experiencing transition — a beloved pastor retiring, a founder stepping away, a leader departing — the ascension offers a counterintuitive model. Departure does not have to mean decline. Absence does not have to mean abandonment. Sometimes the most important thing a leader can do is leave, blessing the community on the way out, trusting that what comes next is not less than what came before but more.`,
    keyQuestions: JSON.stringify([
      "Why does Luke end his Gospel with joy rather than grief? What do the disciples understand about Jesus' departure that we might miss?",
      "Jesus' final act is blessing, not commanding. What does this suggest about the nature of his relationship with his followers?",
      "Luke's Gospel begins and ends in the temple. How has the temple's meaning changed between the opening scene and the closing scene?",
      "What does the ascension say about physical absence and spiritual presence? How do communities of faith navigate the tension between the two?",
      "How does the ascension function as a model for leadership transition — and what does it challenge about our assumptions regarding indispensable leaders?"
    ]),
    preachingAngles: JSON.stringify([
      { angle: "Joy in Departure — When Absence Becomes Anticipation", target_audience: "Communities in transition or experiencing loss", primary_theme: "hope" },
      { angle: "Blessed and Sent — The Ascension as Commission", target_audience: "Churches discerning mission and purpose", primary_theme: "mission" },
      { angle: "Full Circle — From Silent Temple to Singing Temple", target_audience: "Literary-minded congregations, Advent/Easter series", primary_theme: "fulfillment" },
      { angle: "When the Leader Leaves — Trust, Transition, and the Spirit", target_audience: "Churches navigating pastoral transitions", primary_theme: "trust" }
    ]),
    sourceTier: "ai_assisted",
    sourceNotes: "AI-generated narrative unit drawing on ascension theology (Farrow, Ascension Theology; Zwiep, The Ascension of the Messiah in Lukan Christology), Lukan narrative structure (Tannehill, The Narrative Unity of Luke-Acts), and Mount of Olives geography and prophetic associations."
  },
];
