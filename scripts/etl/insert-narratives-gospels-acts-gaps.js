const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare(`INSERT INTO narrative_units
  (id,title,book_id,chapter_start,verse_start,chapter_end,verse_end,
   summary,significance,relational_note,conceptual_note,climate_note,
   modern_parallel,key_questions,preaching_angles,source_tier,source_notes)
  VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);

const batch = db.transaction((rows) => {
  for (const r of rows) ins.run(...r);
});

const units = [

  // ═══════════════════════════════════════════════════════════════════════
  //  MATTHEW — missing chapters: 3, 4, 9, 11, 12, 14, 15, 19, 22, 23, 24
  // ═══════════════════════════════════════════════════════════════════════

  // ── MAT 3 ─────────────────────────────────────────────────────────────
  [
    'mat-baptism-of-jesus',
    'The Baptism of Jesus',
    'MAT', 3, 1, 3, 17,
    'John the Baptist appears in the Judean wilderness proclaiming a baptism of repentance and announcing one who is coming after him who is far greater. Pharisees and Sadducees come to the Jordan, and John rebukes them as a brood of vipers. Jesus arrives from Galilee and insists on being baptized despite John\'s protests, and as he rises from the water the heavens open, the Spirit descends like a dove, and a voice declares: "This is my beloved Son, in whom I am well pleased."',
    'The baptism inaugurates Jesus\' public ministry and establishes his identity through a trinitarian theophany. By submitting to a baptism he does not need, Jesus identifies himself with sinful humanity from the very start, foreshadowing the cross where he will bear the full weight of that identification.',
    'John and Jesus share a kinship and a mission, but their roles are asymmetric. John recognizes his own unworthiness yet Jesus insists on solidarity. The dynamic models how genuine authority often seeks the lower position rather than demanding recognition.',
    'The themes of prophetic fulfillment, divine sonship, and Spirit-empowerment converge at the Jordan. The opened heavens reverse the closed-heaven imagery of judgment, signaling a new era of divine accessibility.',
    'The Jordan River valley near Jericho was a politically charged landscape where Israel first entered the Promised Land under Joshua. Baptismal movements in this region carried overtones of national renewal under Roman occupation.',
    'A newly inaugurated leader who, before assuming power, insists on standing in line with ordinary people rather than arriving through a VIP entrance. The gesture signals solidarity and reframes what authority looks like.',
    JSON.stringify([
      "Why does Jesus insist on being baptized when he has no sin to repent of?",
      "What does the voice from heaven reveal about the relationship between Father and Son?",
      "How does John the Baptist's fiery preaching about judgment relate to Jesus' message of grace?"
    ]),
    JSON.stringify([
      {"angle":"Solidarity with sinners as the first act of ministry","target_audience":"leaders and those in positions of authority","primary_theme":"humility and identification"},
      {"angle":"The heavens torn open — God is no longer distant","target_audience":"people who feel spiritually distant or abandoned","primary_theme":"divine presence and accessibility"},
      {"angle":"John's courage in confronting religious leaders who perform repentance without substance","target_audience":"congregations comfortable with religious routine","primary_theme":"authentic repentance"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 4 ─────────────────────────────────────────────────────────────
  [
    'mat-temptation-of-jesus',
    'The Temptation of Jesus and the Beginning of Ministry in Galilee',
    'MAT', 4, 1, 4, 25,
    'Immediately after his baptism, the Spirit drives Jesus into the wilderness for forty days of fasting and temptation. Satan offers three tests: turning stones to bread, throwing himself from the temple pinnacle, and receiving all the kingdoms of the world in exchange for worship. Jesus defeats each temptation by quoting Deuteronomy. He then relocates to Capernaum, begins preaching that the kingdom of heaven is at hand, calls his first disciples from their fishing boats, and launches a healing ministry that draws crowds from across the region.',
    'The temptation narrative shows Jesus recapitulating Israel\'s wilderness experience and succeeding where Israel failed. Each temptation targets a legitimate need — sustenance, security, sovereignty — and twists it. Jesus demonstrates that the kingdom will not be established through shortcuts, spectacles, or compromise with evil.',
    'Jesus calls Simon, Andrew, James, and John directly from their livelihoods, and they leave immediately. This pattern of radical, instantaneous response establishes discipleship as something that disrupts existing social and economic arrangements rather than fitting neatly into them.',
    'The three temptations map onto the three fundamental human drives: appetite, ambition, and autonomy. Satan\'s strategy is not to make Jesus do something obviously evil but to take a shortcut to a good end — provision, protection, dominion — by means that bypass suffering and obedience.',
    'The Judean wilderness is a barren, rocky terrain descending steeply toward the Dead Sea. Capernaum, by contrast, was a prosperous fishing town on the Via Maris trade route on the north shore of the Sea of Galilee. The move from wilderness to Galilee signals a shift from private preparation to public proclamation.',
    'A leader who has just received public affirmation is immediately tested in private. The most dangerous temptations are not crude but sophisticated — using one\'s gifts to serve oneself, manufacturing a crisis to prove one\'s importance, or trading integrity for influence. Every person in public life faces some version of these three tests.',
    JSON.stringify([
      "Why does the Spirit lead Jesus into temptation immediately after the affirmation of his baptism?",
      "How do the three temptations relate to the ways we are tempted to shortcut God's purposes?",
      "What does it cost the first disciples to follow Jesus, and what does that model for us?"
    ]),
    JSON.stringify([
      {"angle":"The temptation to shortcut suffering on the way to a good outcome","target_audience":"leaders facing moral compromise for strategic gain","primary_theme":"integrity and patience"},
      {"angle":"Leaving the nets — what discipleship costs and what it offers","target_audience":"people discerning vocational or life changes","primary_theme":"calling and sacrifice"},
      {"angle":"Jesus quoting Scripture to resist temptation — the role of deep formation in crisis moments","target_audience":"congregations seeking spiritual resilience","primary_theme":"spiritual discipline"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 9 ─────────────────────────────────────────────────────────────
  [
    'mat-calling-of-matthew-and-healing',
    'The Calling of Matthew and a Cascade of Healing',
    'MAT', 9, 1, 9, 38,
    'Jesus returns to Capernaum and heals a paralytic, forgiving his sins and provoking the scribes to accuse him of blasphemy. He then calls Matthew the tax collector from his booth and dines with tax collectors and sinners, declaring he came not for the righteous but the sick. A series of miracles follows: healing a woman with a hemorrhage, raising Jairus\'s daughter, restoring sight to two blind men, and casting out a demon from a mute man. The chapter closes with Jesus observing that the harvest is plentiful but the laborers are few.',
    'Matthew 9 demonstrates that the kingdom of God manifests as both physical restoration and social boundary-crossing. Jesus does not merely heal bodies; he forgives sins, eats with outcasts, and touches the ritually unclean, systematically overturning the purity system that kept the marginalized at a distance from God.',
    'The calling of Matthew the tax collector is especially striking because tax collectors were considered traitors collaborating with Rome. By choosing Matthew and dining at his table, Jesus publicly associates with the most despised class of Jewish society, forcing his other followers to reckon with radical inclusion.',
    'Forgiveness, healing, and social restoration are presented as inseparable facets of the same kingdom reality. The "new wine in new wineskins" teaching signals that Jesus\' ministry cannot be contained within existing religious categories — it requires a new framework entirely.',
    'Capernaum was a garrison town on the border between the territories of Herod Antipas and Philip. Tax collectors sat at toll booths on the main road, extracting customs duties for Herod\'s regime. Pharisaic purity codes made social contact with such people a source of ritual contamination.',
    'A respected community leader publicly sitting down to dinner with the people everyone else avoids — the formerly incarcerated, the addicted, the socially disgraced. The scandal is not the meal but the message: these people belong at the table.',
    JSON.stringify([
      "Why does Jesus connect physical healing with forgiveness of sins?",
      "What does it mean that Jesus came for the sick, not the healthy — and who decides which category they belong to?",
      "How does the image of plentiful harvest and few workers challenge the way churches allocate their energy?"
    ]),
    JSON.stringify([
      {"angle":"Jesus at the table with tax collectors — the scandal of inclusive grace","target_audience":"congregations wrestling with who belongs","primary_theme":"radical hospitality"},
      {"angle":"New wine needs new wineskins — when existing structures cannot hold what God is doing","target_audience":"church leaders facing institutional change","primary_theme":"renewal and adaptation"},
      {"angle":"The harvest is plentiful — seeing the world as God sees it","target_audience":"congregations oriented inward","primary_theme":"mission and compassion"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 11 ────────────────────────────────────────────────────────────
  [
    'mat-john-in-prison-and-woes',
    'John\'s Doubt from Prison and Woes on Unrepentant Cities',
    'MAT', 11, 1, 11, 30,
    'John the Baptist, imprisoned by Herod Antipas, sends disciples to ask Jesus: "Are you the one who is to come, or should we expect someone else?" Jesus responds not with a theological argument but with evidence — the blind see, the lame walk, the dead are raised, and the poor hear good news. He then praises John as the greatest born of women, denounces the cities of Chorazin, Bethsaida, and Capernaum for witnessing miracles yet refusing to repent, and concludes with the tender invitation: "Come to me, all you who are weary and burdened, and I will give you rest."',
    'This chapter holds together two truths that most theology separates: God\'s severe judgment on those who refuse to respond, and God\'s tender compassion for those who are exhausted. The invitation to rest is not offered to the self-satisfied but to the crushed — those for whom religion has become another burden rather than liberation.',
    'John\'s question from prison is one of the most honest moments in Scripture. The forerunner who confidently proclaimed Jesus at the Jordan now doubts from a dungeon. Jesus neither rebukes John\'s doubt nor gives him a simple yes. Instead, he points to evidence and lets John draw his own conclusion — a model for how faith handles uncertainty.',
    'The "yoke" metaphor draws on rabbinic language where a rabbi\'s yoke meant his particular interpretation of Torah. Jesus is offering an alternative way of bearing the weight of religious obligation — not eliminating it, but making it life-giving rather than crushing.',
    'John the Baptist was imprisoned in Herod Antipas\'s fortress at Machaerus, east of the Dead Sea. The Galilean cities Jesus denounces — Chorazin, Bethsaida, Capernaum — were prosperous towns along the north shore of the Sea of Galilee that had received sustained exposure to Jesus\' ministry.',
    'A whistleblower locked in prison begins to wonder if the cause they sacrificed everything for is actually going to win. Meanwhile, the communities that had front-row seats to transformation shrug and go back to business as usual. The combination of courageous doubt and comfortable indifference is recognizable in every generation.',
    JSON.stringify([
      "How should we understand John the Baptist's doubt — is it a failure of faith or a model of honest questioning?",
      "What does Jesus' denunciation of cities that witnessed miracles say about the relationship between evidence and faith?",
      "Who are the 'weary and burdened' today, and how does the church either add to their burden or offer rest?"
    ]),
    JSON.stringify([
      {"angle":"Permission to doubt from prison — faith that is honest enough to ask hard questions","target_audience":"people experiencing doubt or spiritual crisis","primary_theme":"honest faith"},
      {"angle":"Come to me, all who are weary — rest for the religiously exhausted","target_audience":"burned-out Christians and those harmed by toxic religion","primary_theme":"grace and rest"},
      {"angle":"The danger of witnessing God's work and remaining unchanged","target_audience":"long-time church members in comfortable settings","primary_theme":"repentance and responsiveness"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 12 ────────────────────────────────────────────────────────────
  [
    'mat-lord-of-the-sabbath',
    'Lord of the Sabbath and the Blasphemy Against the Spirit',
    'MAT', 12, 1, 12, 50,
    'Jesus\' disciples pluck grain on the Sabbath, and Pharisees accuse them of breaking the law. Jesus responds with precedents from David and the temple priests, then heals a man with a withered hand in the synagogue on the Sabbath, prompting the Pharisees to plot his destruction. After further healings, the Pharisees attribute Jesus\' exorcisms to Beelzebul. Jesus responds with the devastating warning about blasphemy against the Holy Spirit — the one sin that cannot be forgiven — and redefines his family as those who do the will of his Father.',
    'Matthew 12 marks a turning point in the Gospel. The Pharisaic opposition crystallizes into a plot to kill Jesus, and the battle lines are drawn. The blasphemy against the Spirit is not a casual sin but a settled disposition that calls good evil and attributes the work of God to Satan — it is unforgiven not because God refuses mercy but because it represents a state in which mercy is no longer recognizable.',
    'The redefinition of family at the chapter\'s end is radical. When told his mother and brothers are waiting outside, Jesus gestures toward his disciples and says, "Here are my mother and my brothers." He is not rejecting his biological family but establishing that the community formed around obedience to God takes priority over kinship ties.',
    'The Sabbath controversies expose a fundamental hermeneutical question: does the law exist to serve human flourishing or do humans exist to serve the law? Jesus consistently sides with mercy over ritual, function over form, and human need over legal precision.',
    'Galilean grain fields and synagogues were the contested ground between Pharisaic Sabbath regulations and the daily needs of ordinary people. The Pharisees\' legal fence around the Sabbath classified plucking grain as reaping and healing as work — expansions of Torah that Jesus systematically challenged.',
    'A corporation\'s compliance department has made the rules so elaborate that employees can no longer do the actual work the organization exists to perform. Someone with authority steps in and says: the rules exist to serve the mission, not the other way around. The ensuing power struggle is predictable.',
    JSON.stringify([
      "When does protecting a sacred practice cross the line into preventing the very good that practice was meant to foster?",
      "What does the unforgivable sin actually describe, and why does it trouble so many people who are almost certainly not guilty of it?",
      "What does Jesus' redefinition of family mean for the church's relationship to biological kinship structures?"
    ]),
    JSON.stringify([
      {"angle":"Mercy over sacrifice — when religious rules prevent human flourishing","target_audience":"rule-oriented communities and legalistic environments","primary_theme":"mercy and the purpose of law"},
      {"angle":"The unforgivable sin — what it is and what it isn't","target_audience":"anxious believers who fear they have committed it","primary_theme":"assurance and discernment"},
      {"angle":"A new kind of family — belonging defined by obedience, not bloodline","target_audience":"people longing for belonging or navigating family dysfunction","primary_theme":"spiritual family and community"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 14 ────────────────────────────────────────────────────────────
  [
    'mat-death-of-john-and-feeding-five-thousand',
    'The Death of John the Baptist and the Feeding of the Five Thousand',
    'MAT', 14, 1, 14, 36,
    'Herod Antipas executes John the Baptist after Herodias\'s daughter dances at his birthday banquet and requests John\'s head on a platter. When Jesus hears the news he withdraws by boat, but crowds follow on foot. Moved with compassion, he heals the sick and then feeds over five thousand people with five loaves and two fish. He sends the disciples ahead by boat, walks on the water to them in the fourth watch of the night, and Peter briefly walks on water before sinking in fear.',
    'The juxtaposition of Herod\'s banquet of death and Jesus\' meal of abundance is deliberate. Two kingdoms are contrasted: one sustains itself through violence and political manipulation, the other multiplies scarce resources through compassion. The feeding miracle is the most attested miracle in the Gospels (six accounts) and prefigures the Eucharist.',
    'Peter\'s attempt to walk on water reveals both his impulsive courage and his inability to sustain faith under pressure. Jesus does not refuse his request but extends his hand when Peter sinks. The dynamic captures the ongoing pattern of discipleship: bold initiative, faltering faith, and rescue by grace.',
    'The themes of abundance and scarcity run throughout. Herod\'s abundance produces death; Jesus\' scarcity produces abundance. The miracle challenges the assumption that resources are zero-sum and that compassion must be rationed.',
    'Herod Antipas\'s fortress-palace at Machaerus overlooked the Dead Sea. The feeding miracle takes place on the Galilean shore where thousands of pilgrims traveled during festival seasons. The "lonely place" to which Jesus withdrew was likely the northeast shore near Bethsaida.',
    'A government banquet ends in a politically motivated execution. Meanwhile, on the other side of the country, a community organizer with no budget feeds thousands of hungry people in an open field. The contrast between what power does with abundance and what love does with scarcity could not be sharper.',
    JSON.stringify([
      "What does the contrast between Herod's banquet and Jesus' feeding miracle reveal about two different kinds of power?",
      "Why does Jesus make the disciples distribute the bread rather than simply making it appear?",
      "What does Peter's experience on the water teach about the relationship between courage and faith?"
    ]),
    JSON.stringify([
      {"angle":"Two banquets — Herod's feast of death and Jesus' feast of life","target_audience":"congregations navigating the relationship between faith and political power","primary_theme":"kingdom contrast"},
      {"angle":"Start with what you have — five loaves and two fish are enough","target_audience":"people and churches feeling under-resourced for their calling","primary_theme":"sufficiency and generosity"},
      {"angle":"Sinking and being caught — Peter's walk on water as the rhythm of faith","target_audience":"believers struggling with fear and doubt","primary_theme":"courage and rescue"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 15 ────────────────────────────────────────────────────────────
  [
    'mat-tradition-and-the-canaanite-woman',
    'Clean and Unclean: Tradition, the Canaanite Woman, and the Feeding of Four Thousand',
    'MAT', 15, 1, 15, 39,
    'Pharisees from Jerusalem challenge Jesus about handwashing traditions. He responds by accusing them of nullifying God\'s commands through their traditions, teaching that defilement comes from the heart, not from unwashed hands. He then withdraws to Tyre and Sidon where a Canaanite woman begs him to heal her daughter. After an exchange that tests her faith — "It is not right to take the children\'s bread and toss it to the dogs" — Jesus commends her great faith and heals her daughter. The chapter concludes with Jesus feeding four thousand people.',
    'This chapter systematically dismantles the inside/outside boundary that defined Second Temple Judaism. External purity rules cannot make someone clean; a Gentile woman\'s faith exceeds that of Israel; and God\'s provision extends beyond Jewish crowds to a second feeding in Gentile territory. The trajectory points toward the universal mission of Matthew 28.',
    'The exchange with the Canaanite woman is among the most challenging in the Gospels. Jesus appears to reject her with an ethnic slur, yet she refuses to accept rejection. Whether Jesus is testing her, teaching his disciples, or genuinely having his perspective expanded, the encounter demonstrates that persistent, argumentative faith is honored rather than punished.',
    'The conceptual framework is purity — who is clean, what makes someone unclean, and where the boundaries of God\'s community fall. Jesus relocates defilement from the external to the internal, from the body to the heart, and then demonstrates that even the ethnic boundary between Jew and Gentile cannot limit God\'s compassion.',
    'Pharisees from Jerusalem represent the religious center investigating the Galilean periphery. Tyre and Sidon were Gentile coastal cities in Phoenicia. The handwashing tradition was a Pharisaic extension of priestly purity rules to ordinary meals — a program to sanctify all of Israel.',
    'A religious community defines itself by what it won\'t touch, who it won\'t associate with, and which rules distinguish insiders from outsiders. An outsider with no credentials, no membership, and no standing makes a case so compelling that the community\'s own leader publicly honors her faith. The gatekeepers are embarrassed.',
    JSON.stringify([
      "How do religious traditions meant to honor God sometimes end up contradicting God's actual commands?",
      "What do we make of Jesus' apparent harshness toward the Canaanite woman, and what does her response model?",
      "If defilement comes from the heart rather than from external contact, how should that reshape the church's approach to 'unclean' people and situations?"
    ]),
    JSON.stringify([
      {"angle":"When tradition becomes a wall — the danger of rules that replace relationship","target_audience":"tradition-heavy churches and denominations","primary_theme":"tradition vs. obedience"},
      {"angle":"The Canaanite woman — arguing with God and winning","target_audience":"people who feel excluded from God's promises","primary_theme":"bold faith and persistence"},
      {"angle":"Defilement comes from within — the radical interiority of Jesus' ethic","target_audience":"morally focused congregations","primary_theme":"heart transformation"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 19 ────────────────────────────────────────────────────────────
  [
    'mat-marriage-children-rich-young-man',
    'Marriage, Children, and the Rich Young Man',
    'MAT', 19, 1, 19, 30,
    'Jesus travels to Judea beyond the Jordan. Pharisees test him with a question about divorce, and he appeals to creation\'s original intention for lifelong marriage, permitting separation only in cases of sexual immorality. The disciples find the standard so high they suggest it\'s better not to marry at all. Jesus then welcomes children whom the disciples try to turn away, saying the kingdom belongs to such as these. A rich young man asks what he must do to inherit eternal life; Jesus tells him to sell everything and follow. The young man leaves grieving, and Jesus declares it is easier for a camel to go through the eye of a needle than for a rich person to enter the kingdom.',
    'The three episodes share a common theme: the kingdom of God demands a reckoning with the things we most tightly grip — marriage as a possession to discard, children as interruptions to manage, and wealth as security to accumulate. Each scene exposes how self-interest masquerades as reasonable behavior.',
    'The rich young man\'s grief when told to sell everything is one of the most psychologically honest moments in the Gospels. He is not a villain. He has kept the commandments. He genuinely wants eternal life. But he cannot release the one thing that defines his identity and security. Jesus looks at him with love, not condemnation — and lets him walk away.',
    'The concept of "the last shall be first" inverts the assumed correlation between virtue, wealth, and divine favor. In a culture where riches were read as God\'s blessing, Jesus\' declaration that wealth is a spiritual obstacle was genuinely shocking.',
    'The region of Judea beyond the Jordan (Perea) was territory under Herod Antipas. Divorce was politically explosive since Antipas had divorced his Nabatean wife to marry Herodias. The rabbinic schools of Hillel and Shammai debated the grounds for divorce, making the question a legal trap.',
    'A successful, ethically upright professional asks a spiritual mentor what more they need to do. The answer is not to try harder but to release the one thing they have organized their entire life around. They cannot do it. Not because they are evil, but because identity and security are harder to surrender than anyone admits until they try.',
    JSON.stringify([
      "Why does Jesus point back to creation's original design when addressing divorce rather than simply interpreting Mosaic law?",
      "What does the disciples' attempt to keep children away reveal about what they valued, and how does the church repeat that pattern?",
      "What is the modern equivalent of the rich young man's wealth — the thing we cannot imagine releasing?"
    ]),
    JSON.stringify([
      {"angle":"The grief of the rich young man — when the cost of discipleship is clear","target_audience":"affluent congregations and professionals","primary_theme":"wealth, identity, and surrender"},
      {"angle":"Let the children come — who the church turns away and why","target_audience":"family-oriented congregations and children's ministry leaders","primary_theme":"welcome and the kingdom"},
      {"angle":"The last shall be first — grace that overturns meritocracy","target_audience":"achievement-oriented communities","primary_theme":"grace vs. earning"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 22 ────────────────────────────────────────────────────────────
  [
    'mat-render-unto-caesar',
    'Render unto Caesar: Taxes, Resurrection, and the Greatest Commandment',
    'MAT', 22, 1, 22, 46,
    'Jesus tells the parable of the wedding banquet where invited guests refuse to come and outsiders fill the hall. Then three groups attempt to trap him. The Pharisees and Herodians ask about paying taxes to Caesar; Jesus responds with the famous "Render unto Caesar what is Caesar\'s, and unto God what is God\'s." Sadducees pose a riddle about marriage and resurrection; Jesus corrects their theology. A Pharisaic lawyer asks which commandment is greatest; Jesus answers with love of God and love of neighbor, calling them the foundation of all the Law and Prophets. Jesus then poses his own question about the Messiah being David\'s Lord, and no one dares question him further.',
    'The chapter demonstrates Jesus\' intellectual mastery under extreme political pressure. Each question is designed to force him into a position that will alienate either the crowds or the authorities. His responses do not dodge the questions but transcend them, reframing every issue in terms of God\'s ultimate claim on human life.',
    'The unlikely alliance of Pharisees, Herodians, and Sadducees — groups that normally despised each other — reveals how threatening Jesus was to every power structure simultaneously. Their cooperation against a common enemy is a pattern that recurs whenever genuine prophetic challenge appears.',
    'The "render unto Caesar" saying is not a neat division of sacred and secular. Since humans bear God\'s image, everything ultimately belongs to God. Caesar may stamp his image on a coin, but God has stamped the divine image on every person. The statement is far more subversive than it first appears.',
    'The Jerusalem temple courts during Passover week were a politically charged environment. The coin Jesus calls for bore the image of Tiberius with an inscription declaring him divine — possessing it violated the second commandment, making the Pharisees\' trap ironic.',
    'A public figure at a press conference faces a series of loaded questions designed to produce either a sound bite that will destroy their base or a statement that authorities can prosecute. Instead of choosing between the options presented, they reframe each question in a way that exposes the questioner\'s assumptions.',
    JSON.stringify([
      "What does 'render unto Caesar' actually mean if humans — bearing God's image — ultimately belong entirely to God?",
      "How does Jesus' summary of the law as love of God and love of neighbor challenge the tendency to reduce faith to either vertical devotion or horizontal ethics?",
      "Why is the parable of the wedding banquet both an invitation and a warning?"
    ]),
    JSON.stringify([
      {"angle":"Render unto Caesar — the subversive politics of belonging to God","target_audience":"politically engaged Christians across the spectrum","primary_theme":"allegiance and idolatry"},
      {"angle":"The greatest commandment — love as the integration of all law","target_audience":"congregations fragmented by doctrinal disputes","primary_theme":"love as the hermeneutical key"},
      {"angle":"The wedding banquet — the danger of refusing the invitation","target_audience":"nominal believers and those drifting from faith","primary_theme":"urgency and response"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 23 ────────────────────────────────────────────────────────────
  [
    'mat-woes-to-scribes-pharisees',
    'The Seven Woes: Jesus Denounces Religious Hypocrisy',
    'MAT', 23, 1, 23, 39,
    'Jesus addresses the crowds and his disciples about the scribes and Pharisees, acknowledging their teaching authority but condemning their behavior. He then delivers seven devastating "woe" pronouncements: they shut the kingdom in people\'s faces, make converts worse than themselves, manipulate oath-taking, tithe herbs while neglecting justice and mercy, clean the outside of the cup while the inside is filthy, and build tombs for prophets while repeating the violence of their ancestors. The chapter concludes with Jesus weeping over Jerusalem: "How often I have longed to gather your children together, as a hen gathers her chicks under her wings, and you were not willing."',
    'Matthew 23 is the most sustained denunciation of religious leadership in the New Testament. It is not an attack on Judaism but on hypocrisy — the specific corruption that occurs when people with spiritual authority use it for self-aggrandizement rather than service. The lament over Jerusalem reveals that judgment comes from grief, not contempt.',
    'The image of Jesus as a mother hen wanting to gather her chicks is one of the most striking feminine images for God in Scripture. The one who has just delivered seven thunderbolts of condemnation immediately reveals the broken heart behind the anger. Judgment and compassion are not opposites; they are expressions of the same love.',
    'The woes follow a pattern: external religious performance substitutes for internal transformation. Tithing mint and cumin while ignoring justice, mercy, and faithfulness is the signature move of institutional religion in every era. The concept of "whitewashed tombs" — beautiful on the outside, full of decay within — became a permanent metaphor for hypocrisy.',
    'The Jerusalem temple precincts were the domain of scribes and Pharisees whose elaborate public piety — broadened phylacteries, lengthened tassels, honored seats at banquets — functioned as social currency in a culture where religious status and political influence were deeply entwined.',
    'A whistleblower addresses a press conference exposing institutional corruption — the leaders who demand standards they do not keep, the organization that builds monuments to past reformers while silencing current ones, the culture of appearance management that consumes more energy than actual mission. The exposure is devastating because it is specific.',
    JSON.stringify([
      "Which of the seven woes most directly applies to the contemporary church, and why?",
      "How do we hold together Jesus' fierce denunciation and his heartbroken lament over Jerusalem?",
      "What does it look like to tithe 'mint, dill, and cumin' while neglecting justice, mercy, and faithfulness in a modern context?"
    ]),
    JSON.stringify([
      {"angle":"The seven woes as a mirror for institutional Christianity","target_audience":"church leaders and denominational structures","primary_theme":"hypocrisy and accountability"},
      {"angle":"Jesus weeping over Jerusalem — anger as an expression of love","target_audience":"people who struggle with God's judgment","primary_theme":"grief and judgment"},
      {"angle":"Straining gnats and swallowing camels — misplaced moral priorities","target_audience":"morally serious Christians who may have lost the plot","primary_theme":"justice, mercy, and proportion"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MAT 24 ────────────────────────────────────────────────────────────
  [
    'mat-olivet-discourse',
    'The Olivet Discourse: Signs of the End and the Call to Readiness',
    'MAT', 24, 1, 24, 51,
    'As Jesus leaves the temple, the disciples marvel at its grandeur. He tells them not one stone will be left on another. Sitting on the Mount of Olives, they ask when this will happen and what will signal his coming and the end of the age. Jesus describes wars, famines, earthquakes, persecution, and false messiahs — but insists these are only "birth pains." He warns of the abomination of desolation, urges those in Judea to flee to the mountains, and says the Son of Man will come on the clouds with power and glory. He uses the parable of the fig tree, Noah\'s flood, and the faithful servant to press one point: no one knows the day or the hour, so stay ready.',
    'The Olivet Discourse holds together near-historical judgment (the destruction of the temple in AD 70) and eschatological expectation (the final coming of the Son of Man). Its purpose is not to satisfy curiosity about the future but to produce vigilant faithfulness in the present. Every generation that has used this text as a timeline has missed its point.',
    'The disciples\' awe at the temple\'s architecture prompts Jesus\' prediction of its destruction. Their instinct is to marvel at what human power has built; Jesus redirects attention to what God is about to dismantle. The tension between visible institutional grandeur and invisible divine purposes runs through the entire discourse.',
    'The concept of "birth pains" reframes suffering. The anguish is not pointless — it is productive, moving toward a new reality. This metaphor prevents both despair (the suffering is meaningless) and triumphalism (we can skip the suffering). Between the already and the not-yet, the posture is alert, active waiting.',
    'The Mount of Olives overlooked Herod\'s massive temple renovation — gleaming marble and gold that had been under construction for decades. The structure seemed permanent, yet Jesus predicts its complete destruction within a generation, a prophecy fulfilled when Roman legions under Titus razed it in AD 70.',
    'A gleaming corporate headquarters that seems too big to fail. Insiders assume the institution is permanent. A prophet says: this will all come down. The question is not whether disruption is coming but whether people will be found faithful when it arrives.',
    JSON.stringify([
      "Why does Jesus refuse to give a specific timeline and instead emphasize readiness?",
      "How should Christians read apocalyptic literature — as a newspaper prediction or as a call to faithful living?",
      "What 'temples' in our own world seem permanent but may be more fragile than they appear?"
    ]),
    JSON.stringify([
      {"angle":"No one knows the day or the hour — against the obsession with end-times prediction","target_audience":"prophecy-focused Christians and their critics","primary_theme":"vigilance over speculation"},
      {"angle":"Birth pains — suffering that produces something new","target_audience":"people enduring prolonged difficulty","primary_theme":"hope through suffering"},
      {"angle":"The faithful servant — what does it mean to be found doing the right thing when the master returns?","target_audience":"leaders and stewards of any kind","primary_theme":"faithfulness and accountability"}
    ]),
    'ai_assisted',
    null
  ],

  // ═══════════════════════════════════════════════════════════════════════
  //  MARK — missing chapters: 4, 8, 9, 11
  // ═══════════════════════════════════════════════════════════════════════

  // ── MRK 4 ─────────────────────────────────────────────────────────────
  [
    'mrk-parables-and-storm',
    'Parables of the Kingdom and the Stilling of the Storm',
    'MRK', 4, 1, 4, 41,
    'Teaching from a boat on the Sea of Galilee, Jesus delivers the parable of the sower, explaining that the same seed produces wildly different results depending on the soil. He adds the parables of the lamp under a basket, the seed growing secretly, and the mustard seed — all illustrating how the kingdom of God works in hidden, surprising, and disproportionate ways. That evening, crossing the lake, a violent storm threatens to swamp the boat. The disciples find Jesus asleep on a cushion in the stern. He wakes, rebukes the wind and waves, and asks: "Why are you so afraid? Do you still have no faith?"',
    'Mark 4 establishes that the kingdom of God does not arrive through overwhelming force but through hidden, patient, organic growth — like seeds. The storm-stilling then demonstrates that the one who teaches these gentle parables also commands the forces of nature. The same Jesus who trusts slow growth also exercises instant authority over chaos.',
    'The disciples\' question — "Teacher, don\'t you care if we drown?" — is one of the rawest prayers in Scripture. They are not asking a theological question; they are terrified and angry. Jesus\' response addresses not the storm but their fear. The pattern suggests that the real crisis is not external danger but internal faithlessness.',
    'The parables operate on the principle that the kingdom\'s apparent smallness and hiddenness are features, not bugs. The mustard seed does not look like a kingdom. The seed growing secretly does its work while the farmer sleeps. This is a direct challenge to messianic expectations of dramatic political overthrow.',
    'The Sea of Galilee sits 700 feet below sea level in a basin surrounded by hills. Cool air funneling through ravines produces sudden, violent storms that can swamp small fishing boats within minutes. The disciples\' fear was not irrational — experienced fishermen knew these storms killed.',
    'A startup that begins in a garage, ignored by the industry, growing slowly while everyone focuses on the major players. Or a community garden in a neglected neighborhood — invisible at first, then suddenly producing food for hundreds. The kingdom works like that. Meanwhile, the same leader who patiently plants seeds can also walk into a boardroom in crisis and restore order with a word.',
    JSON.stringify([
      "Why does Jesus use parables that obscure meaning rather than plain teaching that clarifies?",
      "What kind of 'soil' best describes your current capacity to receive and act on what God is saying?",
      "When the storm hits, what does it reveal about where we actually place our trust?"
    ]),
    JSON.stringify([
      {"angle":"The mustard seed — trusting the kingdom's hidden growth in an age of metrics","target_audience":"pastors and ministry leaders measuring impact","primary_theme":"patience and hiddenness"},
      {"angle":"'Don't you care?' — praying with raw honesty in the storm","target_audience":"people in crisis or suffering","primary_theme":"lament and trust"},
      {"angle":"Four soils, one seed — why the same message produces such different responses","target_audience":"evangelism-focused congregations","primary_theme":"receptivity and spiritual formation"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MRK 8 ─────────────────────────────────────────────────────────────
  [
    'mrk-peter-confession-and-cost',
    'Peter\'s Confession and the Cost of Following Jesus',
    'MRK', 8, 1, 8, 38,
    'Jesus feeds four thousand in the Decapolis and then crosses back to Galilee where Pharisees demand a sign. He warns the disciples about the "leaven of the Pharisees and Herod" but they think he is talking about bread — revealing a stunning spiritual dullness. He heals a blind man in two stages at Bethsaida. Near Caesarea Philippi he asks, "Who do you say that I am?" Peter answers, "You are the Messiah." Jesus immediately predicts his suffering and death. When Peter rebukes him, Jesus says, "Get behind me, Satan!" and teaches that following him means taking up one\'s cross.',
    'Mark 8 is the hinge of the entire Gospel. Peter\'s confession is the narrative climax — and the moment everything turns dark. From this point forward, the road leads to Jerusalem and the cross. The two-stage healing of the blind man is Mark\'s visual metaphor for the disciples: they can see, but not yet clearly.',
    'Peter goes from the highest commendation to the harshest rebuke within moments. He can see who Jesus is but cannot accept what that means. The "Satan" label is not about Peter\'s character but about the source of the assumption that the Messiah should avoid suffering. Peter is voicing the world\'s theology, not God\'s.',
    'The concept of messiahship is being radically redefined. Peter confesses Jesus as Messiah, but his idea of what that means — military victory, political restoration — is precisely wrong. A suffering Messiah was a contradiction in terms in first-century Judaism. Jesus is not adjusting expectations; he is demolishing them.',
    'Caesarea Philippi was a Gentile city at the foot of Mount Hermon where a shrine to the Greek god Pan was carved into a massive rock cliff. The question "Who do you say I am?" is asked in a landscape saturated with competing claims about divine identity.',
    'A leader who has built a movement finally asks the inner circle: "Who do you think I really am?" One of them gets the answer right. Then the leader explains that success will look like apparent failure, that victory requires suffering, and that anyone who follows must accept the same terms. The room goes silent.',
    JSON.stringify([
      "Why does Jesus heal the blind man in two stages, and what might that say about how spiritual understanding develops?",
      "What was Peter right about, and what was he wrong about — and how do we make the same mistakes?",
      "What does 'take up your cross' actually mean in a context where we don't face literal crucifixion?"
    ]),
    JSON.stringify([
      {"angle":"'Get behind me, Satan' — when our best intentions oppose God's purposes","target_audience":"well-meaning Christians whose theology avoids suffering","primary_theme":"suffering and discipleship"},
      {"angle":"Two-stage sight — the journey from partial to full understanding","target_audience":"new believers and those in spiritual formation","primary_theme":"progressive revelation"},
      {"angle":"Losing your life to find it — the paradox at the center of Christian existence","target_audience":"people at crossroads of self-preservation vs. self-giving","primary_theme":"sacrifice and true life"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MRK 9 ─────────────────────────────────────────────────────────────
  [
    'mrk-transfiguration-and-failure',
    'The Transfiguration and the Disciples\' Failure',
    'MRK', 9, 1, 9, 50,
    'Six days after Peter\'s confession, Jesus takes Peter, James, and John up a high mountain where he is transfigured — his clothes become dazzling white, and Moses and Elijah appear. A cloud overshadows them, and a voice says, "This is my beloved Son; listen to him." They descend to find the remaining disciples unable to cast out a demon from a boy. The father cries, "I believe; help my unbelief!" Jesus casts out the spirit. He then teaches privately about his coming death, but the disciples argue about who is greatest. Jesus places a child among them and says whoever wants to be first must be last of all and servant of all.',
    'The transfiguration reveals Jesus\' true glory, bookended by two passion predictions and the disciples\' utter failure to comprehend either the glory or the suffering. The mountaintop experience is real but temporary; the descent into a world of demonic suffering and petty ambition is where discipleship actually happens.',
    'The father\'s cry — "I believe; help my unbelief!" — is perhaps the most honest prayer in the Bible. He does not pretend to have more faith than he has. He brings his divided heart to Jesus and asks for help with the division itself. Jesus honors this partial, struggling faith completely.',
    'The juxtaposition of transfiguration glory and valley failure teaches that spiritual experience on the mountaintop does not automatically translate into power in the valley. The disciples\' argument about greatness, coming immediately after a passion prediction, shows how deeply the human drive for status resists the way of the cross.',
    'The high mountain is traditionally identified as Mount Hermon or Mount Tabor. The descent into a chaotic scene of failed exorcism, a suffering child, and an arguing crowd mirrors the pattern of Moses descending Sinai to find the golden calf — the prophet comes from divine encounter to human failure.',
    'A team returns from an inspiring leadership retreat to find the office in chaos, clients angry, and junior staff arguing about promotions. The retreat was real. The vision was genuine. But it does not inoculate against the mundane failures of ordinary life. The test of any mountain experience is what happens in the valley.',
    JSON.stringify([
      "What is the relationship between mountaintop spiritual experiences and the grinding realities of daily life?",
      "How is 'I believe; help my unbelief' a model for honest prayer?",
      "Why do the disciples argue about greatness immediately after Jesus predicts his suffering and death?"
    ]),
    JSON.stringify([
      {"angle":"'Help my unbelief' — the prayer of honest, struggling faith","target_audience":"people wrestling with doubt and partial belief","primary_theme":"authentic faith"},
      {"angle":"Mountaintop and valley — why spiritual highs don't prevent ordinary failures","target_audience":"people disillusioned after a spiritual experience fades","primary_theme":"perseverance and reality"},
      {"angle":"The child in the center — greatness redefined as service","target_audience":"leaders and status-conscious communities","primary_theme":"humility and servanthood"}
    ]),
    'ai_assisted',
    null
  ],

  // ── MRK 11 ────────────────────────────────────────────────────────────
  [
    'mrk-triumphal-entry-temple-cleansing',
    'The Triumphal Entry and the Cleansing of the Temple',
    'MRK', 11, 1, 11, 33,
    'Jesus enters Jerusalem riding a donkey as crowds spread cloaks and branches on the road, shouting "Hosanna!" He inspects the temple and leaves for Bethany. The next morning he curses a fig tree with leaves but no fruit. Entering the temple, he overturns the tables of money changers and dove sellers, declaring, "My house shall be called a house of prayer for all nations, but you have made it a den of robbers." The next day the fig tree has withered, and Jesus teaches about faith and forgiveness. Chief priests, scribes, and elders challenge his authority; he refuses to answer until they address John\'s baptism.',
    'Mark sandwiches the temple cleansing between the cursing and withering of the fig tree — his signature literary technique. The fig tree with leaves but no fruit represents the temple: impressive on the outside, spiritually barren within. Jesus is not reforming the temple; he is pronouncing judgment on it.',
    'The confrontation with the temple authorities is a clash between divinely authorized prophetic action and institutionally credentialed religious power. By asking about John\'s baptism, Jesus exposes that the authorities are not interested in truth but in protecting their position. They refuse to answer because every answer costs them something.',
    'The phrase "a house of prayer for all nations" quotes Isaiah 56:7 and points to the Court of the Gentiles, which the money-changing operation had effectively colonized. The temple was failing its mission to be a place where all nations could encounter God. Jesus\' action is both a prophetic protest and a symbolic destruction.',
    'Jesus\' entry from the Mount of Olives over the Kidron Valley into Jerusalem echoed Zechariah\'s prophecy of a humble king. The temple\'s money-changing system required pilgrims to exchange pagan coinage for Tyrian shekels to purchase sacrificial animals — the Sadducean aristocracy controlled and profited from this exchange.',
    'An activist walks into a financial institution that has turned a public service into a profit center, overturns the furniture, and declares the place has betrayed its charter. The institution\'s board demands to know who authorized this. The activist asks a question they refuse to answer, because answering would expose their own illegitimacy.',
    JSON.stringify([
      "What does the fig tree episode reveal about the difference between religious appearance and spiritual fruitfulness?",
      "Was Jesus' temple action a reform or a judgment — and what difference does it make?",
      "How do institutions that exist to connect people to God sometimes become obstacles instead?"
    ]),
    JSON.stringify([
      {"angle":"Leaves without fruit — when churches look alive but produce nothing","target_audience":"established churches that may be coasting on reputation","primary_theme":"fruitfulness and judgment"},
      {"angle":"A house of prayer for all nations — the temple's failed mission and the church's temptation","target_audience":"congregations examining their accessibility and inclusiveness","primary_theme":"mission and access"},
      {"angle":"The authority question — when institutions demand credentials to avoid reckoning with truth","target_audience":"leaders and those navigating institutional power","primary_theme":"authority and accountability"}
    ]),
    'ai_assisted',
    null
  ],

  // ═══════════════════════════════════════════════════════════════════════
  //  LUKE — missing: 3, 5, 6, 8, 9, 11, 12, 13, 14, 18, 20, 21, 22, 23
  // ═══════════════════════════════════════════════════════════════════════

  // ── LUK 3 ─────────────────────────────────────────────────────────────
  [
    'luk-john-baptizes-and-genealogy',
    'John the Baptist\'s Ministry and the Genealogy of Jesus',
    'LUK', 3, 1, 3, 38,
    'Luke precisely dates the scene: the fifteenth year of Tiberius Caesar. John the Baptist preaches repentance in the Jordan wilderness, quoting Isaiah about making paths straight. He gives practical ethical instructions — tax collectors should collect no more than required, soldiers should not extort. He baptizes Jesus, the heavens open, and the Spirit descends. Luke then traces Jesus\' genealogy backward from Joseph through David and Abraham all the way to "Adam, the son of God."',
    'Luke\'s genealogy goes back to Adam rather than Abraham (as in Matthew), making a universal claim: Jesus is not merely the Jewish Messiah but the representative of all humanity. By anchoring the scene in world history with Roman rulers and Jewish high priests, Luke insists this is not mythology but an event within datable human history.',
    'John\'s ethical instructions to tax collectors and soldiers are remarkable for their specificity. He does not tell them to quit their morally compromised jobs but to stop the specific abuses their positions enable. This is repentance as concrete behavioral change, not abstract emotion.',
    'Luke\'s dual emphasis on historical particularity and universal scope defines his project. The gospel enters history through specific political conditions (Tiberius, Pilate, Herod, Annas, Caiaphas) but extends to all humanity through the Adam genealogy. Particularity and universality are not opposites.',
    'Luke dates the scene precisely within the fractured political landscape created by Rome\'s division of Herod the Great\'s kingdom. The Jordan wilderness was a liminal space between territories, associated with Israel\'s original crossing into the Promised Land under Joshua.',
    'A journalist opens a story by naming the president, the governor, the mayor, and the local power brokers — establishing that the events are historical, not mythological. The story is about a grassroots movement in a politically occupied territory where people are looking for practical guidance on how to live with integrity under an unjust system.',
    JSON.stringify([
      "Why does Luke trace Jesus' genealogy all the way back to Adam rather than stopping at Abraham?",
      "What is significant about John's practical ethical instructions to tax collectors and soldiers?",
      "How does Luke's emphasis on historical dating shape the way we understand the gospel's claims?"
    ]),
    JSON.stringify([
      {"angle":"Repentance with specifics — John's insistence on concrete behavioral change","target_audience":"congregations that spiritualize repentance without practical application","primary_theme":"practical ethics"},
      {"angle":"Son of Adam, Son of God — the universal scope of Jesus' mission","target_audience":"diverse or multicultural congregations","primary_theme":"universality of the gospel"},
      {"angle":"Faith anchored in history — why Luke insists on dates, names, and places","target_audience":"intellectually oriented believers and skeptics","primary_theme":"historical reliability"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 5 ─────────────────────────────────────────────────────────────
  [
    'luk-calling-of-first-disciples',
    'The Catch of Fish and the Calling of the First Disciples',
    'LUK', 5, 1, 5, 39,
    'Jesus teaches from Simon Peter\'s boat on the Sea of Galilee, then instructs the experienced fishermen to cast their nets in deep water after catching nothing all night. The catch is so massive the nets begin to break. Peter falls to his knees: "Go away from me, Lord; I am a sinful man!" Jesus says, "Don\'t be afraid; from now on you will fish for people." Luke then records the healing of a leper, a paralytic lowered through a roof, the calling of Levi the tax collector, and a debate about fasting that produces Jesus\' saying about new wine and old wineskins.',
    'Peter\'s response to the miraculous catch reveals the biblical pattern: genuine encounter with God produces not self-confidence but self-awareness. He does not say "I am a great man" but "I am a sinful man." Jesus\' response to honest self-knowledge is not condemnation but commission — the call to mission comes precisely at the moment of deepest humility.',
    'The call narratives share a pattern: Jesus enters the ordinary workspace of ordinary people — a fishing boat, a tax booth — and transforms it into the site of calling. Discipleship begins not in religious spaces but in the places where people earn their living.',
    'The new wine/old wineskins teaching signals discontinuity. Something genuinely new is happening that cannot be contained in existing religious categories. The old is not necessarily bad, but it is insufficient. This conceptual framework explains why Jesus\' ministry repeatedly breaks established patterns.',
    'Galilean fishermen worked through the night using seine nets and paid taxes to Herod Antipas through toll collectors. Fishing was physically grueling, economically squeezed, and socially unremarkable. These were not the credentialed religious leaders anyone expected to form the nucleus of a world-changing movement.',
    'A business owner who has just had the worst quarter in years is approached by someone who says: try this completely different approach. Against their professional judgment, they try it — and the results exceed anything in their career. The success does not produce pride but awe, because they know it did not come from their own expertise.',
    JSON.stringify([
      "Why does genuine encounter with God so often produce awareness of one's sinfulness rather than self-congratulation?",
      "What does it mean that Jesus calls people from their workplaces rather than from religious settings?",
      "How does the new wine/old wineskins image apply to changes the church faces today?"
    ]),
    JSON.stringify([
      {"angle":"Peter's response — self-awareness as the doorway to calling","target_audience":"people who feel unqualified for ministry","primary_theme":"humility and commission"},
      {"angle":"The workplace as the site of calling — discipleship beyond the church building","target_audience":"working professionals seeking vocational meaning","primary_theme":"sacred and secular"},
      {"angle":"New wine, new wineskins — navigating change without losing the substance","target_audience":"churches facing generational or cultural transition","primary_theme":"innovation and faithfulness"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 6 ─────────────────────────────────────────────────────────────
  [
    'luk-sermon-on-the-plain',
    'The Sermon on the Plain: Blessings, Woes, and Enemy Love',
    'LUK', 6, 1, 6, 49,
    'After Sabbath controversies and choosing the twelve apostles, Jesus delivers teaching on a level place to a great crowd. Unlike Matthew\'s Beatitudes, Luke includes corresponding woes: "Blessed are you who are poor... woe to you who are rich." He commands love of enemies, generosity without expectation of return, and non-judgment. He teaches that a tree is known by its fruit, and concludes with the parable of two builders — one on rock, one on sand.',
    'Luke\'s version of this teaching is sharper and more economically concrete than Matthew\'s. "Blessed are the poor" is not "poor in spirit" — it is the materially destitute. The woes against the rich, the well-fed, and the popular represent a direct economic reversal that aligns with Mary\'s Magnificat. Luke\'s Jesus is consistently on the side of the dispossessed.',
    'The command to love enemies is the most distinctive ethical teaching of Jesus. It is not a feeling but an action: "do good to those who hate you, bless those who curse you, pray for those who mistreat you." The relational revolution lies in refusing to let the enemy\'s behavior determine one\'s own.',
    'The blessings and woes operate as a prophetic reversal. The current order — where wealth means blessing and poverty means curse — is declared temporary and about to be inverted. The kingdom of God is not a spiritual upgrade of existing power structures but their overturning.',
    'A level place in Galilee where the audience was predominantly peasant poor. The blessings on the hungry and the woes on the rich addressed a lived reality in which absentee landlords and priestly elites concentrated land and wealth while subsistence farmers faced crushing taxation from both Roman and Herodian authorities.',
    'A labor organizer addresses a crowd of minimum-wage workers: "The system that keeps you poor and hungry is not the final word. And you who are comfortable at their expense — your comfort has an expiration date." The speech does not offer a political program but a moral framework that delegitimizes the status quo.',
    JSON.stringify([
      "How does Luke's 'blessed are the poor' differ from Matthew's 'poor in spirit,' and why does it matter?",
      "What does loving enemies look like in practice — not as a feeling but as a set of actions?",
      "How should the church respond to the woes against the rich and the well-fed?"
    ]),
    JSON.stringify([
      {"angle":"Blessed are the poor — Luke's economic gospel and its challenge to comfortable Christianity","target_audience":"affluent congregations","primary_theme":"economic justice and discipleship"},
      {"angle":"Love your enemies — the most radical and most ignored command in the New Testament","target_audience":"politically polarized communities","primary_theme":"nonviolence and enemy love"},
      {"angle":"The tree and its fruit — when religious words and lived behavior do not match","target_audience":"congregations valuing integrity","primary_theme":"authenticity and character"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 8 ─────────────────────────────────────────────────────────────
  [
    'luk-women-disciples-storm-demons',
    'Women Who Followed, the Storm, and the Gerasene Demoniac',
    'LUK', 8, 1, 8, 56,
    'Luke uniquely notes that women — Mary Magdalene, Joanna (wife of Herod\'s steward Chuza), Susanna, and many others — were supporting Jesus\' ministry out of their own resources. After the parable of the sower and the lamp, Jesus calms a storm on the Sea of Galilee. Crossing to the region of the Gerasenes, he encounters a man possessed by a legion of demons, living among the tombs. The demons are cast into a herd of pigs that rush into the lake. The chapter closes with the healing of Jairus\'s daughter and the woman with a hemorrhage — two desperate faith stories intertwined.',
    'Luke\'s inclusion of the women disciples is theologically and historically significant. These women financed the movement, traveled with it publicly, and included a member of Herod\'s own household. Luke is revealing that the Jesus movement crossed gender, class, and political lines from its earliest days.',
    'The Gerasene demoniac\'s name — "Legion" — is a Roman military term for a unit of 5,000 soldiers. The man living among tombs, naked and chains broken, is a portrait of complete social, spiritual, and physical destruction. Jesus restores him to his right mind, clothed and sitting — a complete reversal.',
    'The chapter operates on the theme of boundary-crossing. Women travel with a rabbi. A storm is stilled. A Gentile territory is entered. A demoniac is restored. A bleeding woman touches Jesus. A dead girl is raised. Every barrier — gender, nature, ethnicity, spiritual possession, ritual impurity, death — is crossed.',
    'The Gerasene region was Gentile territory in the Decapolis where pig farming was a major industry. The demoniac\'s residence among tombs made him ritually unclean by every Jewish standard. The hemorrhaging woman was likewise ritually impure for twelve years, excluded from temple worship and normal social contact.',
    'A nonprofit director discovers that the organization\'s most reliable supporters include a government official\'s spouse, a formerly homeless person now fully restored, and a woman who was excluded from every institution for over a decade. The movement draws from every social stratum and nobody\'s past disqualifies them.',
    JSON.stringify([
      "Why does Luke specifically name the women who financed and traveled with Jesus' ministry?",
      "What does the restoration of the Gerasene demoniac tell us about the scope of what Jesus came to do?",
      "How do the intertwined stories of Jairus's daughter and the hemorrhaging woman relate to each other?"
    ]),
    JSON.stringify([
      {"angle":"The women who funded the movement — hidden supporters and the church's gender blind spots","target_audience":"congregations examining women's roles","primary_theme":"women in ministry and leadership"},
      {"angle":"Legion — the complete destruction and complete restoration of a human life","target_audience":"people recovering from addiction, abuse, or mental health crises","primary_theme":"deliverance and restoration"},
      {"angle":"Twelve years of bleeding, twelve years of a girl's life — two desperations, one Healer","target_audience":"anyone in a long season of suffering","primary_theme":"faith and healing"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 9 ─────────────────────────────────────────────────────────────
  [
    'luk-mission-transfiguration-cost',
    'The Mission of the Twelve, the Transfiguration, and the Cost of Following',
    'LUK', 9, 1, 9, 62,
    'Jesus sends the Twelve on mission with authority over demons and diseases, instructing them to take nothing for the journey. Herod hears about Jesus and is perplexed. Jesus feeds five thousand with five loaves and two fish. Peter confesses Jesus as the Messiah, and Jesus predicts his suffering. On a mountain, Jesus is transfigured before Peter, James, and John. Descending, he heals a demon-possessed boy the disciples could not help. He sets his face toward Jerusalem and issues the radical demands of discipleship: "Foxes have dens... but the Son of Man has nowhere to lay his head." He tells one would-be follower, "Let the dead bury their own dead."',
    'Luke 9 marks the great turning point of the Gospel. After the transfiguration, Jesus "set his face toward Jerusalem" — a phrase conveying grim determination. Everything before this is Galilean ministry; everything after is the journey to the cross. The cost of following is made explicit: there is no home, no delay, no looking back.',
    'The radical sayings about discipleship — no shelter, no funerals, no farewells — are not universal rules but responses to individuals who attach conditions to their following. Jesus is exposing the excuses that sound reasonable but mask an unwillingness to prioritize the kingdom above every other loyalty.',
    'The transfiguration connects Jesus to Moses and Elijah — law and prophets — while the voice from heaven establishes Jesus\' authority over both. The "exodus" (departure) that Jesus discusses with Moses and Elijah on the mountain is his coming death, framing the crucifixion as a liberation event parallel to Israel\'s escape from Egypt.',
    'Jesus\' mission instructions — take nothing, rely on hospitality — engaged the ancient Near Eastern hospitality code that obligated households to shelter travelers. The transfiguration likely occurred on Mount Hermon or Mount Tabor. Setting his face toward Jerusalem signaled the beginning of a deliberate, dangerous journey.',
    'A movement leader sends the team out with no budget and no backup plan, trusting that the communities they serve will provide. Later, after a revelatory strategic planning retreat, the leader announces that the organization is pivoting toward a path that everyone knows will be costly. Some team members hesitate. The leader says: this is not a part-time commitment.',
    JSON.stringify([
      "What does 'set his face toward Jerusalem' reveal about Jesus' understanding of his own mission?",
      "Why are the demands of discipleship so extreme — no home, no funeral, no farewell?",
      "How does the transfiguration connect Jesus to the entire story of Israel?"
    ]),
    JSON.stringify([
      {"angle":"Setting his face — the courage of walking toward what will cost you everything","target_audience":"leaders facing difficult decisions","primary_theme":"resolve and sacrifice"},
      {"angle":"No looking back — the radical prioritization of the kingdom","target_audience":"people weighing the cost of following Jesus seriously","primary_theme":"commitment and discipleship"},
      {"angle":"The transfiguration — a glimpse of glory to sustain the journey through suffering","target_audience":"people in long seasons of difficulty","primary_theme":"glory and endurance"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 11 ────────────────────────────────────────────────────────────
  [
    'luk-lords-prayer-and-woes',
    'The Lord\'s Prayer, the Sign of Jonah, and Woes on the Pharisees',
    'LUK', 11, 1, 11, 54,
    'A disciple asks Jesus to teach them to pray, producing Luke\'s version of the Lord\'s Prayer — shorter and more direct than Matthew\'s. Jesus follows with the parable of the friend at midnight, teaching persistence in prayer. He casts out a demon and defends himself against the charge of using demonic power. He offers only "the sign of Jonah" — his coming death and resurrection — as proof. At a Pharisee\'s dinner, he pronounces woes on the Pharisees for tithing herbs while ignoring justice and love, and on the lawyers for loading people with burdens they will not carry.',
    'Luke\'s prayer instruction and prophetic critique form a single argument: authentic relationship with God (prayer) necessarily produces justice and mercy. The Pharisees\' failure is not too much religion but religion disconnected from its purpose. They have prayer without practice, ritual without relationship.',
    'The parable of the friend at midnight teaches that God responds to shameless persistence. The Greek word anaideia means "shamelessness" or "audacity." It is not that God is reluctant like the sleeping neighbor, but that God honors bold, persistent, unembarrassed asking.',
    'The "sign of Jonah" concept refuses to give religion-as-spectacle what it wants. The crowd demands a dramatic miraculous sign; Jesus offers only the pattern of death and resurrection. The deepest evidence for God is not a miracle to observe but a story to enter.',
    'Dining at a Pharisee\'s home carried ritual significance. Reclining positions at banquets signaled social hierarchy. The Pharisaic extension of priestly purity to the domestic table aimed to sanctify all of Israel but had created a system where rule-keeping replaced genuine transformation.',
    'A congregation prays eloquently every Sunday but the church budget allocates nothing to the neighborhood around it. A community leader raises funds for monuments to civil rights heroes while opposing current civil rights legislation. The gap between devotional performance and ethical practice is the oldest religious problem.',
    JSON.stringify([
      "How does Luke's shorter, more direct version of the Lord's Prayer shape our understanding of what prayer is?",
      "What does the parable of the friend at midnight teach about the posture God wants from us?",
      "Which of the woes against the Pharisees and lawyers most directly challenges the contemporary church?"
    ]),
    JSON.stringify([
      {"angle":"Shameless prayer — the audacity God honors","target_audience":"people who feel their prayers are unanswered","primary_theme":"persistence and boldness in prayer"},
      {"angle":"Tithing herbs, ignoring justice — the perennial gap between piety and ethics","target_audience":"morally serious churches","primary_theme":"integrity and justice"},
      {"angle":"The sign of Jonah — when people want spectacle and God offers resurrection","target_audience":"seekers and skeptics who want proof","primary_theme":"faith and evidence"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 12 ────────────────────────────────────────────────────────────
  [
    'luk-rich-fool-and-worry',
    'The Rich Fool, the Watchful Servants, and Freedom from Anxiety',
    'LUK', 12, 1, 12, 59,
    'Jesus warns against the leaven of Pharisaic hypocrisy and tells the crowd not to fear those who can kill the body. A man asks Jesus to settle an inheritance dispute; Jesus responds with the parable of the rich fool who builds bigger barns only to die that night. He teaches the disciples not to worry about food or clothing — "consider the ravens, consider the lilies." He urges them to be like servants waiting for their master\'s return, warns that he has come to bring division, and tells the crowds to read the signs of the times.',
    'Luke 12 addresses the two great anxieties of human existence: material scarcity and death. The rich fool\'s error is not wealth itself but the delusion that accumulated possessions can secure life against its fundamental vulnerability. "This very night your life will be demanded from you" strips away every illusion of control.',
    'Jesus\' refusal to adjudicate the inheritance dispute is significant. He is not a judge or arbitrator — his mission is not to manage property rights within the existing system but to expose the greed that drives the dispute in the first place.',
    'The parable of the rich fool operates on the concept that life is loan, not possession. "Your life will be demanded" uses a financial term — called in, collected. Life is something entrusted, not owned. The one who stores up treasure for himself but is not "rich toward God" has fundamentally misunderstood what he has.',
    'First-century Judean subsistence farming made one bad harvest or one tax assessment the difference between poverty and debt slavery. Jesus\' audience knew real hunger. His teaching about not worrying was not addressed to comfortable people with retirement accounts but to the genuinely destitute.',
    'A successful entrepreneur spends their final year of life expanding their storage capacity — bigger houses, more investment properties, another warehouse — and dies of a heart attack before enjoying any of it. Meanwhile, a community of people with far less lives with open hands, sharing what they have, sleeping soundly at night.',
    JSON.stringify([
      "What is the difference between prudent planning and the rich fool's hoarding?",
      "How can 'do not worry' be good news to people facing genuine material need?",
      "What does it mean to be 'rich toward God' rather than rich toward oneself?"
    ]),
    JSON.stringify([
      {"angle":"The rich fool — the illusion that accumulation can secure life","target_audience":"affluent believers and consumer-driven culture","primary_theme":"mortality and materialism"},
      {"angle":"Consider the ravens, consider the lilies — God's provision as an invitation out of anxiety","target_audience":"anxiety-prone communities","primary_theme":"trust and contentment"},
      {"angle":"Watchful servants — living as though the master could return tonight","target_audience":"complacent or distracted Christians","primary_theme":"vigilance and stewardship"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 13 ────────────────────────────────────────────────────────────
  [
    'luk-repent-or-perish',
    'Repent or Perish: Tragedies, the Narrow Door, and Lament for Jerusalem',
    'LUK', 13, 1, 13, 35,
    'People report to Jesus that Pilate has killed Galilean worshippers, mixing their blood with their sacrifices. Jesus rejects the assumption that these victims were worse sinners and warns, "Unless you repent, you too will all perish." He tells the parable of the barren fig tree given one more year. He heals a crippled woman on the Sabbath, angering the synagogue ruler. He teaches about the mustard seed and yeast, declares that the door to the kingdom is narrow, and weeps over Jerusalem: "How often I have longed to gather your children together."',
    'Luke 13 confronts the theology of retribution — the belief that suffering is always deserved. Jesus does not explain why tragedies happen; he uses them to redirect the question from "why them?" to "what about you?" Tragedy is not divine punishment aimed at the wicked but an urgent call to universal repentance.',
    'The synagogue ruler is indignant that Jesus healed on the Sabbath. Jesus calls him a hypocrite who would untie a donkey on the Sabbath but objects to freeing a woman "bound by Satan for eighteen years." The relational dimension is devastating: religious authority would show more urgency for an animal than for a suffering human being.',
    'The narrow door teaching resists the assumption that belonging to the right group guarantees entrance. "We ate and drank in your presence" — proximity to Jesus is not the same as following him. The door is narrow not because God restricts entry but because the way of repentance and faith is demanding.',
    'Pilate\'s massacre of Galilean worshippers at the temple and the collapse of the tower of Siloam were recent events. In a culture that assumed suffering indicated divine judgment, Jesus\' refusal to connect the dots between sin and calamity was theologically revolutionary.',
    'A natural disaster strikes a city, and pundits immediately debate what the victims did to deserve it. A public figure refuses to play that game and instead says: instead of analyzing why bad things happen to them, examine whether you are living the way you should be. The redirection is uncomfortable because it\'s personal.',
    JSON.stringify([
      "How does Jesus' response to the Galilean massacre challenge the common assumption that suffering is punishment?",
      "What does the barren fig tree parable teach about God's patience and its limits?",
      "Who does the narrow door exclude, and why do many assume they will be inside?"
    ]),
    JSON.stringify([
      {"angle":"Tragedy is not punishment — rejecting the theology of retribution","target_audience":"people suffering or grieving who are told their pain is deserved","primary_theme":"suffering and God's character"},
      {"angle":"The barren fig tree — divine patience that has a deadline","target_audience":"complacent believers and communities","primary_theme":"urgency and repentance"},
      {"angle":"The narrow door — why proximity to Jesus is not the same as following him","target_audience":"culturally Christian communities","primary_theme":"authentic discipleship"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 14 ────────────────────────────────────────────────────────────
  [
    'luk-banquet-and-cost',
    'The Great Banquet and the Cost of Discipleship',
    'LUK', 14, 1, 14, 35,
    'At a Sabbath meal in a Pharisee\'s house, Jesus heals a man with dropsy and challenges the guests about taking the lowest seat rather than scrambling for honor. He tells the host to invite the poor, crippled, lame, and blind rather than friends and rich neighbors. He then delivers the parable of the great banquet: invited guests make excuses (new land, new oxen, new marriage), so the host sends servants to bring in the poor, disabled, and homeless from the streets. Jesus concludes with stark warnings about counting the cost of discipleship: "whoever does not carry their cross and follow me cannot be my disciple."',
    'Luke 14 is a social revolution disguised as a dinner party. Jesus uses the charged setting of a Pharisee\'s banquet to dismantle the honor system of the Greco-Roman world. The great banquet parable is both an indictment of Israel\'s rejection and a celebration of God\'s insistence on a full house.',
    'The excuses of the invited guests are not frivolous — they involve property, livelihood, and family. That is precisely the point. The things that keep people from the banquet are not sins but legitimate goods that have become ultimate commitments. The kingdom demands priority over every reasonable alternative.',
    'The reversal pattern is total: those who exalt themselves will be humbled, those who humble themselves will be exalted. The first invited refuse; the uninvited are compelled to come. The ones with social capital make excuses; the ones with nothing accept eagerly. Privilege becomes a barrier; poverty becomes an advantage.',
    'Formal banquets in the Greco-Roman world featured strict seating protocols where position relative to the host signaled social rank. The entire honor-competition system was visible in who sat where, who was invited, and who was excluded.',
    'An exclusive gala sends invitations to the city\'s elite. On the night of the event, the important people all cancel — business trips, closings, weddings. The host sends the catering team into the streets and shelters, and the banquet is filled with people who never expected to be invited anywhere. The food is the same. The music is the same. The guests are completely different.',
    JSON.stringify([
      "What are the 'legitimate excuses' that keep people from responding to God's invitation today?",
      "Why does Jesus tell the host to invite people who cannot repay the invitation?",
      "What does it mean to count the cost of discipleship, and what costs most in your context?"
    ]),
    JSON.stringify([
      {"angle":"The great banquet — when the invited won't come and the uninvited are welcomed","target_audience":"established churches wondering why new people don't come","primary_theme":"invitation and exclusion"},
      {"angle":"Invite those who cannot repay — generosity without reciprocity","target_audience":"communities oriented around networking and mutual benefit","primary_theme":"radical generosity"},
      {"angle":"Counting the cost — discipleship that demands honest reckoning","target_audience":"new believers and those considering faith","primary_theme":"costly discipleship"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 18 ────────────────────────────────────────────────────────────
  [
    'luk-persistent-widow-pharisee-ruler',
    'The Persistent Widow, the Pharisee and Tax Collector, and the Rich Ruler',
    'LUK', 18, 1, 18, 43,
    'Jesus tells the parable of a widow who wears down an unjust judge through relentless persistence — teaching that God will vindicate his chosen ones who cry to him day and night. The parable of the Pharisee and tax collector follows: the Pharisee thanks God he is not like other people; the tax collector beats his breast and says, "God, have mercy on me, a sinner." Jesus declares the tax collector goes home justified. Children are brought to Jesus, the disciples rebuke them, and Jesus insists the kingdom belongs to such. A rich ruler asks about eternal life; Jesus tells him to sell everything, and the ruler walks away sad.',
    'Luke 18 is organized around the question of who gets access to God. Not the self-righteous but the desperate. Not the powerful but the persistent. Not the accomplished but the childlike. The chapter systematically disqualifies every credential the religious world values and opens the door to those who have nothing to offer except need.',
    'The Pharisee\'s prayer is really a self-congratulatory monologue that uses God as an audience. The tax collector cannot even lift his eyes. The contrast is not between good and bad people but between two postures: one that approaches God as an accomplishment to display and one that approaches God as a need to be met.',
    'The persistent widow teaching is not that God is like the unjust judge but that if even an unjust judge responds to persistence, how much more will a just God respond to his people\'s cries. The argument moves from lesser to greater. The concept of justification appears here — the tax collector "went home justified" — not through works but through honest need.',
    'Widows had almost no legal standing without a male advocate in the Roman provincial system. The unjust judge who "neither feared God nor respected people" reflects the corruption of local courts where justice was routinely bought and sold.',
    'A homeless woman stands outside a government office every day for months, demanding the benefits she is owed. The officials are not moved by compassion but by exhaustion. If bureaucratic persistence works on indifferent officials, how much more does genuine crying out reach a God who actually cares? Meanwhile, in the waiting room, a well-dressed man lists his qualifications while a broken person in the corner simply whispers, "help me."',
    JSON.stringify([
      "What does the persistent widow teach about prayer — and what does it not teach about God's character?",
      "Why does the tax collector go home justified rather than the Pharisee?",
      "What is the modern version of the rich ruler's attachment — and how does Jesus' response challenge it?"
    ]),
    JSON.stringify([
      {"angle":"The tax collector's prayer — why 'God, have mercy on me' is the only prayer that matters","target_audience":"people exhausted by performance-based religion","primary_theme":"grace and humility"},
      {"angle":"The persistent widow — prayer as relentless engagement with God","target_audience":"people who have stopped praying because nothing seems to change","primary_theme":"perseverance in prayer"},
      {"angle":"The rich ruler's sadness — when you get the diagnosis but can't accept the treatment","target_audience":"affluent communities and those gripping something they know they should release","primary_theme":"surrender and freedom"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 20 ────────────────────────────────────────────────────────────
  [
    'luk-authority-challenged-tenants',
    'Jesus\' Authority Challenged and the Parable of the Wicked Tenants',
    'LUK', 20, 1, 20, 47,
    'Chief priests, scribes, and elders demand to know by what authority Jesus acts. He answers with a counter-question about John\'s baptism that traps them. He tells the parable of the vineyard tenants who kill the owner\'s servants and finally his son, warning that the vineyard will be given to others. Spies try to trap him with the question about paying taxes to Caesar. Sadducees test him with a resurrection riddle. Jesus then asks how the Messiah can be David\'s son yet David\'s Lord, and warns against the scribes who love honor but devour widows\' houses.',
    'Luke 20 depicts a sustained assault on Jesus\' legitimacy by every faction of Jerusalem\'s religious establishment. His responses do not defend his authority but expose theirs. The parable of the wicked tenants is a thinly veiled allegory of Israel\'s rejection of God\'s messengers, culminating in the killing of the Son.',
    'The spies sent to trap Jesus with the tax question reveal how deeply the political and religious powers had merged in their opposition. The Sadducees\' resurrection riddle, designed to make the doctrine look absurd, backfires when Jesus demonstrates their theological ignorance. Every encounter ends with Jesus\' opponents silenced.',
    'The parable of the wicked tenants introduces the concept of transferred stewardship: the vineyard remains God\'s, but its management will be given to those who produce fruit. This is not replacement theology but accountability theology — privilege carries responsibility, and persistent failure to meet that responsibility has consequences.',
    'The Jerusalem temple courts during Passover week were the stage for this confrontation. The chief priests and Sadducean aristocracy controlled the temple and collaborated with Rome. Jesus\' popularity among the festival crowds made a public arrest dangerous, driving the authorities toward subterfuge.',
    'A board of directors confronts a reform-minded executive with demands for credentials. The executive asks them a question about their own origins that they cannot answer without embarrassing themselves. The parable of tenants who kill the owner\'s representatives is a company allegory: the board has confused managing the enterprise with owning it.',
    JSON.stringify([
      "Why does Jesus answer questions with questions, and what does this reveal about his opponents' motives?",
      "What does the parable of the wicked tenants teach about the relationship between privilege and accountability?",
      "How does the warning about scribes who devour widows' houses apply to religious institutions today?"
    ]),
    JSON.stringify([
      {"angle":"The wicked tenants — when stewards forget they don't own the vineyard","target_audience":"church and institutional leaders","primary_theme":"stewardship and accountability"},
      {"angle":"Give to Caesar what is Caesar's — navigating competing loyalties","target_audience":"Christians in politically charged environments","primary_theme":"allegiance and wisdom"},
      {"angle":"Devouring widows' houses — when religious institutions exploit the vulnerable","target_audience":"communities concerned about institutional integrity","primary_theme":"justice and institutional reform"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 21 ────────────────────────────────────────────────────────────
  [
    'luk-widows-mite-and-end-times',
    'The Widow\'s Offering and the Destruction of the Temple',
    'LUK', 21, 1, 21, 38,
    'Jesus observes a poor widow putting two small coins into the temple treasury and declares she has given more than all the wealthy donors, because she gave all she had to live on. He then predicts the destruction of the temple, warns of wars, earthquakes, famines, and persecution, and describes the fall of Jerusalem — "when you see Jerusalem surrounded by armies, know that its desolation has come near." He urges readiness, saying heaven and earth will pass away but his words will not, and calls his followers to watch and pray to stand before the Son of Man.',
    'The widow\'s offering and the temple\'s destruction are deliberately juxtaposed. The religious system that consumes a widow\'s last two coins while its leaders devour widows\' houses is the same system whose destruction Jesus predicts in the next breath. The widow gives everything to an institution that is about to be demolished.',
    'The widow\'s story is often sentimentalized as an example of generous giving. In context, it is more complex and more troubling. She gives "all she had to live on" to a temple apparatus that Jesus has just condemned. The text may celebrate her devotion while indicting the institution that exploits it.',
    'Luke\'s eschatological discourse focuses more specifically on the fall of Jerusalem than the parallel accounts. "When you see Jerusalem surrounded by armies" is not apocalyptic symbolism but a concrete warning that was literally fulfilled in AD 66-70. Luke holds together historical judgment and cosmic hope.',
    'The temple treasury was located in the Court of Women, the farthest point at which women could enter. The thirteen trumpet-shaped collection boxes were public. Roman legions under Titus besieged and destroyed Jerusalem and the temple in AD 70, scattering the population.',
    'An elderly woman on a fixed income puts her last dollars in the church offering plate while the building fund committee debates a multi-million-dollar renovation. Her gift is simultaneously the most generous act in the room and the most troubling indictment of an institution that accepts it without ensuring she has enough to eat.',
    JSON.stringify([
      "Is the widow's offering an example to follow or an injustice to correct — or both?",
      "How should Christians read prophecies about the temple's destruction now that it has already happened?",
      "What does 'watch and pray' look like as a practical spiritual discipline?"
    ]),
    JSON.stringify([
      {"angle":"The widow's mite reconsidered — generosity, exploitation, and the tension between them","target_audience":"churches that emphasize sacrificial giving","primary_theme":"stewardship and institutional responsibility"},
      {"angle":"Heaven and earth will pass away — what endures when institutions crumble","target_audience":"people in seasons of institutional collapse","primary_theme":"permanence and impermanence"},
      {"angle":"Watch and pray — readiness as a way of life","target_audience":"congregations navigating uncertain times","primary_theme":"vigilance and spiritual discipline"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 22 ────────────────────────────────────────────────────────────
  [
    'luk-last-supper-and-arrest',
    'The Last Supper, Gethsemane, and the Arrest of Jesus',
    'LUK', 22, 1, 22, 71,
    'Satan enters Judas, who conspires with the chief priests. Jesus sends Peter and John to prepare the Passover. At the meal, he institutes the Lord\'s Supper with bread and wine, declares one of them will betray him, and the disciples argue about who is greatest. Jesus predicts Peter\'s denial and tells them the time of easy mission is over: "the one who has no sword must sell his cloak and buy one." In Gethsemane, he prays so intensely his sweat becomes like drops of blood. Judas betrays him with a kiss. Jesus heals the ear of the high priest\'s servant. Peter follows at a distance and denies Jesus three times. The guards mock and beat Jesus, and the council condemns him.',
    'Luke 22 is the most relationally devastating chapter in the Gospel. Betrayal, denial, abandonment, and institutional injustice converge on a single evening. Yet Luke uniquely records that "the Lord turned and looked straight at Peter" after the denials — a gaze that conveys not condemnation but heartbreak. Even in his own crisis, Jesus is pastoring his people.',
    'The argument about greatness during the Last Supper is almost unbearable in its timing. Jesus has just spoken of his body broken and blood poured out, and the disciples immediately argue about rank. Jesus responds not with fury but with service: "I am among you as one who serves." The contrast between his sacrifice and their ambition defines the nature of Christian leadership.',
    'The instruction to buy a sword is one of the most debated sayings of Jesus. It likely signals that the era of peaceful mission described in Luke 10 is ending and the disciples are about to face violent opposition. When they produce two swords and Jesus says "That is enough," the irony is sharp — two swords are not enough for anything military. The saying prepares them for danger, not violence.',
    'The Passover meal commemorated Israel\'s liberation from Egypt. The upper room was likely in Jerusalem\'s wealthy Upper City. Gethsemane, on the Mount of Olives, was an olive grove whose name means "oil press" — an apt metaphor for the crushing pressure Jesus experienced there.',
    'At a farewell dinner for a beloved leader, the inner circle argues about succession and rank. The leader washes their hands, breaks bread, and says: this is what my life has been about — service, sacrifice, giving myself for you. Hours later, one team member betrays the leader for money, another denies knowing them, and the rest scatter.',
    JSON.stringify([
      "What does the disciples' argument about greatness at the Last Supper reveal about human nature under pressure?",
      "How do we understand Jesus' instruction about swords — is he endorsing violence or something else entirely?",
      "What does Peter's denial teach about the gap between intention and performance under fear?"
    ]),
    JSON.stringify([
      {"angle":"I am among you as one who serves — leadership redefined at the Last Supper","target_audience":"leaders at all levels","primary_theme":"servant leadership"},
      {"angle":"Peter's denial — the anatomy of failure and the look that brings restoration","target_audience":"people who have failed publicly or privately","primary_theme":"failure, grief, and grace"},
      {"angle":"Gethsemane sweat — the emotional and physical cost of obedience","target_audience":"people facing agonizing decisions","primary_theme":"surrender and suffering"}
    ]),
    'ai_assisted',
    null
  ],

  // ── LUK 23 ────────────────────────────────────────────────────────────
  [
    'luk-trial-crucifixion-burial',
    'The Trial, Crucifixion, and Burial of Jesus',
    'LUK', 23, 1, 23, 56,
    'Jesus is brought before Pilate, who finds no basis for charges. Pilate sends him to Herod Antipas, who mocks him and returns him. Pilate offers to release Jesus, but the crowd demands Barabbas. Jesus is led to Golgotha, and on the way he tells the weeping women of Jerusalem to weep for themselves and their children. He is crucified between two criminals. One criminal mocks him; the other asks to be remembered, and Jesus promises, "Today you will be with me in paradise." Darkness covers the land. Jesus cries, "Father, into your hands I commit my spirit," and dies. Joseph of Arimathea takes the body and lays it in a tomb.',
    'Luke\'s passion narrative emphasizes Jesus\' innocence (declared three times by Pilate, confirmed by Herod, acknowledged by the centurion) and his compassion even while dying — he prays for his executioners, comforts the weeping women, and welcomes a dying criminal into paradise. Luke\'s Jesus is the innocent sufferer who saves others even as he himself is destroyed.',
    'The criminal on the cross who is welcomed into paradise with no time for baptism, catechism, or moral reformation is the ultimate case study in grace. He has nothing to offer except honest need. His simple request — "remember me" — is met with a promise that exceeds anything he could have asked.',
    'Pilate\'s shuttling of Jesus between jurisdictions reveals the moral cowardice of political power. Pilate knows Jesus is innocent but is unwilling to pay the political cost of justice. The crowd\'s choice of Barabbas — a violent revolutionary — over Jesus — a nonviolent teacher — dramatizes the human preference for power over love.',
    'Roman crucifixion was deliberately public, gruesome, and slow — designed to terrorize subjugated populations. Golgotha was outside the city walls. The darkness from noon to three and the tearing of the temple curtain are cosmic and liturgical signs that the crucifixion affects reality at every level.',
    'A whistleblower is brought before multiple courts. Each judge knows they are innocent but finds it politically inconvenient to say so. The crowd cheers when the charges stick. The whistleblower dies, but not before forgiving the people who destroyed them and welcoming a fellow prisoner into hope. The courthouse curtain tears.',
    JSON.stringify([
      "What does Jesus' promise to the criminal on the cross reveal about the nature of salvation?",
      "How does Pilate's repeated declaration of Jesus' innocence make his failure to act worse, not better?",
      "Why does Luke emphasize Jesus' compassion for others even during his own execution?"
    ]),
    JSON.stringify([
      {"angle":"Today you will be with me in paradise — grace at the last possible moment","target_audience":"people who feel they have run out of time or chances","primary_theme":"radical grace"},
      {"angle":"Father, forgive them — the prayer from the cross that defines the faith","target_audience":"people struggling to forgive","primary_theme":"forgiveness under extreme suffering"},
      {"angle":"Pilate's moral cowardice — when knowing the right thing and doing it are not the same","target_audience":"people facing costly moral decisions","primary_theme":"courage and complicity"}
    ]),
    'ai_assisted',
    null
  ],

  // ═══════════════════════════════════════════════════════════════════════
  //  JOHN — missing chapters: 5, 6, 7, 8, 10, 12, 14, 16
  // ═══════════════════════════════════════════════════════════════════════

  // ── JHN 5 ─────────────────────────────────────────────────────────────
  [
    'jhn-pool-of-bethesda',
    'The Healing at the Pool of Bethesda',
    'JHN', 5, 1, 5, 47,
    'At the Pool of Bethesda in Jerusalem, a man who has been disabled for thirty-eight years lies among a crowd of sick people waiting for the waters to stir. Jesus asks, "Do you want to get well?" — a question that sounds obvious but is not. The man does not say yes; he explains why he cannot reach the water in time. Jesus heals him and tells him to pick up his mat and walk. Because it is the Sabbath, the authorities confront the healed man and then Jesus. Jesus responds with a discourse on his relationship with the Father: "My Father is always at his work to this very day, and I too am working." The leaders intensify their persecution.',
    'John 5 introduces the central conflict of John\'s Gospel: Jesus claims an intimate, working partnership with the Father that the religious authorities interpret as blasphemy. The healing is not merely a miracle but a sign that precipitates a theological crisis. Jesus is making claims about his own identity that leave no room for a middle position — he is either who he says he is or he is guilty of the charge.',
    'Jesus\' question — "Do you want to get well?" — addresses the psychological complexity of chronic suffering. Thirty-eight years of disability has shaped this man\'s identity, relationships, and daily routine. Wellness will disrupt everything. The question is not cruel but deeply perceptive: not everyone who is sick actually wants what healing will require of them.',
    'The concept of the Son doing only what the Father does establishes the pattern of Jesus\' authority as derivative but identical. He does not act independently but mirrors the Father\'s actions perfectly. This is not subordination but union — the same work, the same will, the same judgment.',
    'The Pool of Bethesda was a double pool near the Sheep Gate in Jerusalem, surrounded by five colonnades. Archaeological excavations have confirmed its existence. The pool was associated with healing and may have been connected to an Asclepius cult, making it a site where Jewish and pagan healing expectations intersected.',
    'A patient who has been in the same waiting room for decades is asked by a doctor: "Do you actually want to leave this place?" The question seems offensive until you realize the waiting room has become home — the identity, the routine, the community of other waiting patients. Healing means losing all of that and building a new life from scratch.',
    JSON.stringify([
      "Why does Jesus ask 'Do you want to get well?' — and what makes this a harder question than it appears?",
      "How does the Sabbath controversy reveal the religious leaders' priorities?",
      "What does Jesus' claim to do only what the Father does teach about the nature of his authority?"
    ]),
    JSON.stringify([
      {"angle":"Do you want to get well? — when healing disrupts the life you've built around brokenness","target_audience":"people in long seasons of stagnation or chronic difficulty","primary_theme":"transformation and identity"},
      {"angle":"My Father is always working — God does not observe religious holidays from mercy","target_audience":"legalistic communities","primary_theme":"Sabbath, law, and compassion"},
      {"angle":"The witness of the Son — Jesus' identity as the crisis that demands a verdict","target_audience":"seekers exploring the claims of Jesus","primary_theme":"christology and decision"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 6 ─────────────────────────────────────────────────────────────
  [
    'jhn-bread-of-life',
    'Feeding the Five Thousand and the Bread of Life Discourse',
    'JHN', 6, 1, 6, 71,
    'Jesus feeds five thousand on a Galilean hillside and walks on water to his disciples in a storm. The crowd follows him to Capernaum, seeking more bread. Jesus delivers the Bread of Life discourse: "I am the bread of life. Whoever comes to me will never go hungry." He intensifies the language: "Unless you eat the flesh of the Son of Man and drink his blood, you have no life in you." Many disciples find this teaching too hard and leave. Jesus asks the Twelve, "You do not want to leave too, do you?" Peter answers, "Lord, to whom shall we go? You have the words of eternal life."',
    'John 6 is the great sifting chapter. The crowd that enthusiastically follows Jesus for bread abandons him when the teaching becomes difficult. The Bread of Life discourse is the first of John\'s great "I am" statements and forces a decision: Jesus is not offering a meal program but himself as the source of life. The crowd wants provision; Jesus offers presence.',
    'Peter\'s response when many leave — "To whom shall we go?" — is not an enthusiastic confession but a realistic assessment. He does not say "I fully understand." He says, in effect, "We have nowhere else to turn, and we trust you even when we don\'t comprehend." This is the shape of mature faith.',
    'The "eating flesh and drinking blood" language is deliberately scandalous. Whether interpreted eucharistically or metaphorically, the point is the same: relationship with Jesus requires total incorporation — taking him into oneself, not merely admiring him from a distance. The half-committed are given every reason to leave.',
    'Passover was near, making the feeding miracle a deliberate echo of the manna in the wilderness. The crowd\'s attempt to make Jesus king by force reveals the political expectations attached to a messianic figure who could provide bread in a subsistence economy.',
    'A popular speaker draws thousands to a motivational event. When the speaker pivots from inspiration to demanding personal transformation, the audience thins dramatically. A small group stays, not because they understand everything, but because they have enough experience to know there is nothing better on offer.',
    JSON.stringify([
      "Why does Jesus use such offensive language about eating his flesh and drinking his blood?",
      "What is the difference between the crowd's desire for bread and Jesus' offer of himself?",
      "How is Peter's 'to whom shall we go?' a model for faith that persists through confusion?"
    ]),
    JSON.stringify([
      {"angle":"The Bread of Life — Jesus as the answer to humanity's deepest hunger","target_audience":"seekers and people attempting to fill a void with achievement, substances, or relationships","primary_theme":"spiritual hunger and satisfaction"},
      {"angle":"Many walked away — the cost of difficult teaching and the thinning of the crowd","target_audience":"churches facing decline and tempted to soften the message","primary_theme":"faithfulness over popularity"},
      {"angle":"To whom shall we go? — staying when you don't understand","target_audience":"believers wrestling with doubts","primary_theme":"trust and perseverance"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 7 ─────────────────────────────────────────────────────────────
  [
    'jhn-feast-of-tabernacles-divided',
    'Rivers of Living Water: Jesus at the Feast of Tabernacles',
    'JHN', 7, 1, 7, 52,
    'Jesus\' brothers urge him to go to the Feast of Tabernacles publicly, but he goes secretly. Midway through the feast he begins teaching in the temple courts, and the crowd is divided — some say he is a good man, others say he leads people astray, still others wonder if he is the Messiah. On the great last day of the feast, Jesus stands and cries out, "Let anyone who is thirsty come to me and drink. Whoever believes in me, rivers of living water will flow from within them." Temple guards are sent to arrest him but return empty-handed, saying, "No one ever spoke the way this man does." Nicodemus urges due process; the authorities dismiss him.',
    'The Feast of Tabernacles was a water festival celebrating God\'s provision in the wilderness, during which priests poured water from the Pool of Siloam on the temple altar. Jesus\' proclamation about living water at the climax of this ritual is a claim to be the fulfillment of everything the feast pointed toward.',
    'The division in the crowd mirrors the division Jesus creates everywhere: some are drawn, some are hostile, and the authorities want him silenced but cannot manage it. The temple guards\' refusal to arrest him — "No one ever spoke like this" — shows that even the instruments of institutional power are affected by what they encounter.',
    'The concept of "living water" connects to the well at Sychar (chapter 4), to Ezekiel\'s vision of water flowing from the temple, and to the Spirit who will be given after Jesus\' glorification. John is developing a sustained metaphor: Jesus replaces the temple as the source of life-giving water.',
    'The Feast of Tabernacles (Sukkot) was one of three pilgrimage festivals, celebrating the autumn harvest and the wilderness wandering. Pilgrims lived in temporary booths and the week-long celebration included a daily water procession. The festival drew massive crowds to Jerusalem.',
    'At the climax of a major national celebration, when the official ceremony reaches its most solemn moment, an unauthorized speaker stands up and declares that he is the fulfillment of everything the ceremony commemorates. The crowd fractures. Security is sent but comes back saying they were unable to act. The authorities are furious but impotent.',
    JSON.stringify([
      "What does it mean that rivers of living water will flow from within believers?",
      "Why does Jesus wait to appear at the feast secretly rather than going publicly?",
      "How does the crowd's division over Jesus model the range of responses people still have to him?"
    ]),
    JSON.stringify([
      {"angle":"Rivers of living water — the Spirit as the fulfillment of Israel's deepest longings","target_audience":"believers seeking deeper spiritual experience","primary_theme":"the Holy Spirit and spiritual thirst"},
      {"angle":"No one ever spoke like this — when even the opposition is disarmed","target_audience":"skeptics and those investigating Jesus","primary_theme":"the authority of Jesus' words"},
      {"angle":"The divided crowd — why Jesus always forces a decision","target_audience":"people sitting on the fence about Jesus","primary_theme":"decision and commitment"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 8 ─────────────────────────────────────────────────────────────
  [
    'jhn-woman-caught-adultery-light',
    'The Woman Caught in Adultery and the Light of the World',
    'JHN', 8, 1, 8, 59,
    'The scribes and Pharisees bring a woman caught in adultery, demanding Jesus pronounce the death penalty. Jesus bends down and writes in the dust, then says, "Let anyone among you who is without sin be the first to throw a stone." One by one they leave. Jesus tells the woman, "Neither do I condemn you. Go and sin no more." He then declares, "I am the light of the world." A fierce debate with the religious leaders escalates until Jesus says, "Before Abraham was, I AM" — a direct claim to the divine name. They pick up stones to kill him, and he slips away.',
    'John 8 contains both the most tender and the most explosive moments in the Gospel. The woman caught in adultery reveals a Jesus who refuses to be weaponized by either legalism or libertinism — he neither condemns nor excuses. The "I AM" statement is the most direct divine claim in the Gospels, invoking the name God gave Moses at the burning bush.',
    'The trap is perfect: if Jesus says stone her, he contradicts his message of mercy; if he says release her, he contradicts the law of Moses. But the question of where the adulterous man is — since adultery requires two people — exposes that the accusers are using the woman as a pawn in their campaign against Jesus. She is not a person to them; she is a weapon.',
    'The progression from "light of the world" to "I AM" reveals John\'s theological architecture. Jesus moves from functional claim (what he does — gives light) to ontological claim (who he is — the eternal God). Each escalation narrows the possible responses: worship or rejection.',
    'The temple courts in Jerusalem during a festival season were the public square of Jewish life. The punishment for adultery was stoning under Mosaic law, but under Roman occupation Jews were not permitted to carry out capital sentences, creating a legal contradiction the Pharisees sought to exploit.',
    'A mob drags a woman before a community leader, demanding punishment. The leader does not defend or condemn her. Instead, he turns to the accusers and says: whoever has never done anything wrong, you go first. The crowd disperses. Then the leader speaks to the woman with both grace and expectation: you are not condemned, but do not continue down this path. It is the rarest combination — complete mercy with complete moral seriousness.',
    JSON.stringify([
      "How does Jesus' response to the woman caught in adultery hold together grace and truth?",
      "What does 'before Abraham was, I AM' claim, and why does it provoke a violent response?",
      "How does the absence of the man in the adultery story expose the hypocrisy of the accusers?"
    ]),
    JSON.stringify([
      {"angle":"Neither do I condemn you — the revolutionary power of non-condemnation","target_audience":"people carrying shame or caught in moral failure","primary_theme":"grace without excuse-making"},
      {"angle":"Let the one without sin cast the first stone — the exposure of self-righteous accusation","target_audience":"judgmental communities and cancel culture","primary_theme":"judgment and self-examination"},
      {"angle":"Before Abraham was, I AM — the most staggering claim in human history","target_audience":"seekers grappling with Jesus' identity","primary_theme":"deity of Christ"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 10 ────────────────────────────────────────────────────────────
  [
    'jhn-good-shepherd',
    'The Good Shepherd',
    'JHN', 10, 1, 10, 42,
    'Jesus declares, "I am the good shepherd. The good shepherd lays down his life for the sheep." He contrasts himself with hired hands who flee when the wolf comes, and with thieves who come only to steal, kill, and destroy. He claims sheep that are "not of this fold" and says he has authority to lay down his life and authority to take it up again. At the Feast of Dedication (Hanukkah), the Jewish leaders press him: "If you are the Messiah, tell us plainly." He responds, "I and the Father are one." They again attempt to stone him for blasphemy.',
    'The Good Shepherd discourse is Jesus\' most sustained metaphor for his relationship with his people. The shepherd does not drive from behind but leads from the front and lays down his life voluntarily. This redefines leadership, authority, and sacrifice. The claim "I and the Father are one" is the Gospel\'s clearest statement of the unity between Jesus and God.',
    'The relationship between shepherd and sheep is characterized by voice recognition — "my sheep hear my voice and I know them." This is not a relationship of control but of intimacy. The sheep follow because they recognize the shepherd, not because they are coerced. The "other sheep not of this fold" anticipates the Gentile mission.',
    'The contrast between the good shepherd, the thief, and the hired hand creates a taxonomy of leadership. The thief exploits. The hired hand serves for wages and abandons in crisis. The good shepherd sacrifices. Every institution is led by one of these three types.',
    'The Feast of Dedication (Hanukkah) celebrated the rededication of the temple by the Maccabees after it was desecrated by Antiochus Epiphanes. Solomon\'s Colonnade, where this conversation occurs, was the eastern portico of the temple complex. The setting raises questions of legitimate authority and temple faithfulness.',
    'A CEO tells the board: I am not like the consultants who come and go, or the temp executives who abandon ship when the market drops. I know every employee by name. I will lose everything before I let this company and its people go under. When the board asks who authorized this level of commitment, the CEO says: the founder and I are one and the same.',
    JSON.stringify([
      "What distinguishes a good shepherd from a hired hand, and how does this apply to leadership in the church?",
      "What does Jesus mean by 'other sheep not of this fold,' and what are its implications for Christian exclusivism?",
      "How does 'I and the Father are one' shape our understanding of who Jesus claims to be?"
    ]),
    JSON.stringify([
      {"angle":"The good shepherd vs. the hired hand — a standard for evaluating leadership","target_audience":"churches with leadership concerns","primary_theme":"sacrificial leadership"},
      {"angle":"Other sheep not of this fold — the surprising breadth of Jesus' flock","target_audience":"exclusive or insular communities","primary_theme":"inclusion and the scope of salvation"},
      {"angle":"I and the Father are one — the claim that demands a verdict","target_audience":"seekers and those exploring Christology","primary_theme":"the identity of Jesus"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 12 ────────────────────────────────────────────────────────────
  [
    'jhn-anointing-triumphal-entry-greeks',
    'The Anointing at Bethany, the Triumphal Entry, and the Coming of the Greeks',
    'JHN', 12, 1, 12, 50,
    'Six days before Passover, Mary of Bethany anoints Jesus\' feet with expensive perfume, and Judas objects to the waste. Jesus says, "Leave her alone; she bought it for the day of my burial." He enters Jerusalem to crowds waving palm branches and shouting "Hosanna!" Greeks come to Philip asking to see Jesus, and he responds, "Unless a grain of wheat falls to the ground and dies, it remains only a single seed. But if it dies, it produces many seeds." He speaks of his coming death, and a voice from heaven confirms him. Despite many signs, most do not believe, fulfilling Isaiah\'s prophecy.',
    'John 12 marks the transition from Jesus\' public ministry to his passion. Mary\'s anointing anticipates burial. The arrival of Greeks signals that "the hour has come" for the Son of Man to be glorified — and glorification in John means the cross. The grain of wheat metaphor encapsulates the entire gospel: death is the mechanism of fruitfulness.',
    'Mary\'s extravagant anointing and Judas\'s calculating objection reveal two fundamentally different orientations toward Jesus. Judas frames the perfume as a resource management problem; Mary treats it as an act of devotion that transcends economic logic. The contrast between worship and calculation defines how people relate to Jesus throughout the Gospel.',
    'The grain of wheat saying introduces the paradox that defines John\'s theology: the way up is down, life comes through death, and glory is achieved through suffering. This is not masochism but the fundamental structure of a universe where self-giving love is the deepest reality.',
    'Bethany was a village on the eastern slope of the Mount of Olives, about two miles from Jerusalem. The entry into Jerusalem fulfilled Zechariah 9:9. The arrival of Greeks at a Jewish festival symbolizes the Gentile world\'s approach to God through Jesus.',
    'An artist destroys their most valuable painting in a public act that everyone except the artist considers wasteful. A journalist objects: "Think of what that was worth!" The artist says: "It was worth everything — that is exactly why I gave it." Meanwhile, foreign visitors arrive at the gallery asking to meet the artist, and the artist says: now is the time.',
    JSON.stringify([
      "What does Mary's extravagant anointing teach about the relationship between worship and economic calculation?",
      "How does the grain of wheat metaphor reframe our understanding of death and fruitfulness?",
      "Why does the arrival of the Greeks trigger Jesus' declaration that 'the hour has come'?"
    ]),
    JSON.stringify([
      {"angle":"The grain of wheat — why death is the only path to life","target_audience":"people facing loss or the end of something","primary_theme":"sacrifice and fruitfulness"},
      {"angle":"Mary's perfume — extravagant worship in a world of calculating objections","target_audience":"congregations debating resource allocation","primary_theme":"devotion and generosity"},
      {"angle":"The Greeks have come — when the world comes looking for Jesus","target_audience":"churches navigating multicultural or outward-facing mission","primary_theme":"the universal scope of the gospel"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 14 ────────────────────────────────────────────────────────────
  [
    'jhn-way-truth-life',
    'I Am the Way, the Truth, and the Life',
    'JHN', 14, 1, 14, 31,
    'In the upper room after the Last Supper, Jesus tells the troubled disciples, "Do not let your hearts be troubled. In my Father\'s house are many rooms." Thomas asks where Jesus is going; Jesus responds, "I am the way, and the truth, and the life. No one comes to the Father except through me." Philip asks to be shown the Father; Jesus replies, "Anyone who has seen me has seen the Father." He promises the Holy Spirit — the Advocate — who will teach them everything and remind them of all Jesus has said. He gives them his peace: "Not as the world gives do I give to you."',
    'John 14 is the most intimate chapter in the Gospels — a farewell conversation between Jesus and his closest friends on the night of his arrest. The theological claims are staggering: Jesus is the exclusive way to God, seeing Jesus is seeing the Father, and the Spirit will continue Jesus\' presence after his departure. Yet the setting is not a theological seminar but a room full of frightened people being comforted.',
    'Thomas and Philip ask the two most honest questions: "Where are you going?" and "Show us the Father." Both questions reveal that after three years of following Jesus, the disciples still do not fully understand who he is or where his mission leads. Jesus does not condemn their confusion but uses it to make his most explicit self-revelations.',
    'The promise of the Advocate (Parakletos) introduces the concept of the Spirit as another presence of the same kind as Jesus. The Spirit does not bring new revelation but reminds and teaches what Jesus has already said. This means the church is not left to figure things out alone but has an ongoing divine interpreter.',
    'The upper room was likely in Jerusalem\'s wealthy Upper City. The farewell discourse takes place on the eve of Passover, in a room charged with the weight of impending separation, betrayal, and death. The intimacy of the setting stands in stark contrast to the public nature of Jesus\' earlier ministry.',
    'A founder about to leave a company gathers the executive team. They are terrified. The founder says: I am not leaving you without resources. Everything I have built, you have access to. And I am sending someone who knows my mind as well as I do to guide you. Do not be afraid. The peace I am giving you is not the absence of problems but the presence of someone who has already overcome them.',
    JSON.stringify([
      "How should we understand 'no one comes to the Father except through me' — as exclusion or as invitation?",
      "What does it mean that seeing Jesus is seeing the Father?",
      "How does the promised Advocate/Spirit change the way the disciples — and we — navigate Jesus' absence?"
    ]),
    JSON.stringify([
      {"angle":"Do not let your hearts be troubled — comfort for the frightened","target_audience":"people facing loss, transition, or the unknown","primary_theme":"peace and assurance"},
      {"angle":"The way, the truth, and the life — Jesus as the answer to humanity's three deepest needs","target_audience":"seekers and those exploring Christian claims","primary_theme":"the sufficiency of Christ"},
      {"angle":"The Advocate — the Holy Spirit as ongoing divine presence","target_audience":"believers seeking deeper understanding of the Spirit's role","primary_theme":"the Holy Spirit and guidance"}
    ]),
    'ai_assisted',
    null
  ],

  // ── JHN 16 ────────────────────────────────────────────────────────────
  [
    'jhn-grief-to-joy-overcome-world',
    'From Grief to Joy: The Spirit and Overcoming the World',
    'JHN', 16, 1, 16, 33,
    'Jesus warns the disciples they will be expelled from synagogues and even killed by people who think they are serving God. He explains that the Spirit will convict the world of sin, righteousness, and judgment. He says, "I have much more to say to you, more than you can now bear," and promises the Spirit will guide them into all truth. He compares their coming grief to a woman in labor: "You will grieve, but your grief will turn to joy." The chapter culminates in one of Scripture\'s most quoted promises: "In this world you will have trouble. But take heart! I have overcome the world."',
    'John 16 is remarkable for its emotional honesty. Jesus does not promise the disciples a trouble-free life but guarantees trouble and promises that it is not the final word. The labor metaphor — grief that produces joy — reframes suffering not as meaningless but as productive. The "overcoming" is not avoiding hardship but maintaining peace and courage within it.',
    'Jesus admits that his disciples cannot bear everything at once: "I have much more to say to you, more than you can now bear." This is a model of pedagogical wisdom — truth is given in proportion to the capacity to receive it. The Spirit\'s ongoing guidance means that understanding deepens over time, not all at once.',
    'The Spirit\'s work of conviction addresses three domains: sin (because the world does not believe in Jesus), righteousness (because Jesus goes to the Father), and judgment (because the ruler of this world is condemned). This is not guilt-inducing conviction but reality-revealing clarity — the Spirit exposes what is actually true.',
    'The farewell discourse takes place on the eve of Jesus\' arrest. The warning about synagogue expulsion reflects the social reality that following Jesus would cost Jewish believers their entire community, livelihood, and family connections — a price many early believers paid.',
    'A departing mentor tells the team: you will face opposition, and some of it will come from people who are absolutely convinced they are doing the right thing. But I am not leaving you without guidance. The grief you feel now will eventually produce something you cannot yet imagine. And remember — I have already been through the worst the world can do, and I am still standing.',
    JSON.stringify([
      "How does the labor metaphor change the way we understand suffering?",
      "What does it mean that the Spirit convicts the world of sin, righteousness, and judgment?",
      "How is 'I have overcome the world' good news when trouble is explicitly promised?"
    ]),
    JSON.stringify([
      {"angle":"In this world you will have trouble — an honest faith that does not promise easy lives","target_audience":"suffering people and prosperity-gospel contexts","primary_theme":"realism and hope"},
      {"angle":"Grief turned to joy — the labor pains of a new reality","target_audience":"people in transition, loss, or painful growth","primary_theme":"redemptive suffering"},
      {"angle":"The Spirit of truth — ongoing guidance for a community that cannot yet bear all the truth","target_audience":"churches navigating theological growth and change","primary_theme":"progressive illumination"}
    ]),
    'ai_assisted',
    null
  ],

  // ═══════════════════════════════════════════════════════════════════════
  //  ACTS — missing chapters: 14, 16, 18, 21, 22, 23, 24, 25
  // ═══════════════════════════════════════════════════════════════════════

  // ── ACT 14 ────────────────────────────────────────────────────────────
  [
    'act-first-missionary-journey-iconium-lystra',
    'Iconium, Lystra, and the First Missionary Journey\'s Return',
    'ACT', 14, 1, 14, 28,
    'Paul and Barnabas preach in Iconium with such effectiveness that the city divides between supporters and opponents. Fleeing a stoning plot, they move to Lystra where Paul heals a man lame from birth. The crowd attempts to worship them as Hermes and Zeus. Paul and Barnabas tear their clothes and redirect worship to the living God. Jews from Antioch and Iconium arrive, turn the crowd, and stone Paul, dragging him outside the city and leaving him for dead. He recovers, and they return through the cities they have planted churches in, appointing elders and encouraging the believers that "we must go through many hardships to enter the kingdom of God."',
    'Acts 14 establishes the pattern of the early mission: spectacular success, violent opposition, and resilient return. The Lystra episode shows the gospel entering a thoroughly pagan context where the categories are completely different — the crowd has no Jewish framework, so they interpret healing through Greek mythology. The mission must translate, not just proclaim.',
    'Paul and Barnabas\'s horror at being worshiped reveals the difference between a genuine apostle and a false one. Their immediate, visceral rejection of divine honors — tearing their clothes — contrasts sharply with leaders who cultivate personal followings. The hardest test of ministry may not be persecution but adulation.',
    'The phrase "through many hardships we must enter the kingdom" is presented not as a warning to discourage but as a reassurance to contextualize. Suffering is not evidence that the mission has failed; it is the normal cost of the kingdom\'s advance. This reframes persecution from anomaly to expectation.',
    'Lystra was a Roman colony in the Lycaonian-speaking interior of Asia Minor. The cult of Zeus was prominent there, and local legend held that Zeus and Hermes had once visited the region in disguise. The crowd\'s attempt to sacrifice to Paul and Barnabas reflects this cultural memory.',
    'A medical team arrives in a rural area with no hospitals. They heal people and are immediately treated as celebrities — their photos go viral, people start a fan club. The team tears down the posters and says: we did not come to be worshiped; we came because someone sent us. Days later, rival factions drive them out of town. They return months later to train local leaders.',
    JSON.stringify([
      "How should the church respond when people want to worship the messenger instead of the message?",
      "What does Paul's recovery after being stoned reveal about resilience in ministry?",
      "How does the statement 'through many hardships we must enter the kingdom' shape expectations for the Christian life?"
    ]),
    JSON.stringify([
      {"angle":"Tearing their clothes — rejecting adulation as fiercely as persecution","target_audience":"leaders and celebrity-culture churches","primary_theme":"humility and misdirected worship"},
      {"angle":"Through many hardships — suffering as the normal path, not the exceptional one","target_audience":"new believers and suffering communities","primary_theme":"perseverance and expectation"},
      {"angle":"Stoned and left for dead, then gets up — the resilience of apostolic mission","target_audience":"burned-out ministry workers","primary_theme":"resilience and calling"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 16 ────────────────────────────────────────────────────────────
  [
    'act-macedonia-philippi-lydia-jailer',
    'The Macedonian Call, Lydia, and the Philippian Jailer',
    'ACT', 16, 1, 16, 40,
    'Paul recruits Timothy, and the Spirit redirects their journey through a vision of a man from Macedonia calling for help — the gospel crosses from Asia into Europe. In Philippi, they meet Lydia, a dealer in purple cloth, who becomes the first European convert. A slave girl with a spirit of divination follows them; Paul casts out the spirit, enraging her owners who lose their source of income. Paul and Silas are beaten, jailed, and placed in stocks. At midnight they sing hymns, an earthquake opens the prison, and the jailer, about to kill himself, asks, "What must I do to be saved?" He and his entire household are baptized that night.',
    'Acts 16 is a hinge chapter in salvation history: the gospel enters Europe. Luke signals this with the shift to "we" narration — he was there. The three conversions span the social spectrum: Lydia (wealthy merchant), the slave girl (exploited property), and the jailer (Roman military). The gospel is not class-specific.',
    'Paul and Silas singing hymns at midnight in a prison with bloody backs is one of the most extraordinary scenes in Acts. Their worship is not performance — there is no audience except the other prisoners. It is the expression of a faith that is not circumstance-dependent. The earthquake is God\'s response, but the singing preceded it.',
    'The slave girl episode reveals the intersection of spiritual oppression and economic exploitation. Her owners are angry not because Paul freed her from a demon but because he destroyed their revenue stream. The conflict between gospel liberation and economic interest is a pattern that recurs throughout Acts.',
    'Philippi was a Roman colony with special privileges and a strong military culture. Purple cloth was a luxury commodity associated with royalty and wealth. The place of prayer by the river suggests no synagogue existed — fewer than ten Jewish men in the city. The jailer was a Roman soldier responsible for prisoners with his life.',
    'A tech company\'s most profitable product turns out to be exploitative. A whistleblower shuts it down, and the executives have the whistleblower arrested. In jail, the whistleblower starts a support group that transforms the prison staff. The arresting officer asks: how do I get what you have? The answer: trust the one who sent me.',
    JSON.stringify([
      "What does the Macedonian vision teach about divine guidance and the willingness to change plans?",
      "How does the slave girl episode expose the economic interests behind spiritual oppression?",
      "What enabled Paul and Silas to sing at midnight in prison, and what does that model for us?"
    ]),
    JSON.stringify([
      {"angle":"Singing at midnight — worship that does not wait for circumstances to improve","target_audience":"people in dark seasons","primary_theme":"worship in suffering"},
      {"angle":"The Philippian jailer — when the person guarding you becomes the one asking for help","target_audience":"evangelistic communities","primary_theme":"unexpected conversions"},
      {"angle":"Lydia, the slave girl, the jailer — the gospel crossing every social barrier","target_audience":"diverse or class-conscious communities","primary_theme":"the gospel's social range"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 18 ────────────────────────────────────────────────────────────
  [
    'act-paul-in-corinth',
    'Paul in Corinth: Tentmaking and the Gospel',
    'ACT', 18, 1, 18, 28,
    'Paul arrives in Corinth and partners with Aquila and Priscilla, fellow tentmakers recently expelled from Rome by Claudius\'s edict. He preaches in the synagogue every Sabbath. When Jews oppose him, he turns to the Gentiles, declaring, "Your blood be on your own heads! From now on I will go to the Gentiles." The Lord speaks to Paul in a night vision: "Do not be afraid; keep on speaking. I have many people in this city." Paul stays eighteen months. Gallio, the Roman proconsul, dismisses Jewish charges against Paul as an internal religious dispute. Paul then travels to Ephesus and Antioch, while Apollos, an eloquent Alexandrian, receives further instruction from Priscilla and Aquila.',
    'Acts 18 shows the gospel establishing roots in one of the Roman Empire\'s most cosmopolitan and morally complex cities. God\'s night vision — "I have many people in this city" — reframes Corinth from a hostile mission field to a place where God\'s people already exist and need to be reached. The word of encouragement comes precisely when Paul is most vulnerable to quitting.',
    'Priscilla and Aquila model married partnership in ministry, and Luke notably places Priscilla\'s name first when describing their instruction of Apollos — suggesting her leading role in theological teaching. The couple represents the kind of collaborative, non-hierarchical ministry partnership that characterized the early church at its best.',
    'Gallio\'s dismissal of the case against Paul as an internal Jewish matter establishes an important legal precedent: Roman authorities initially treated Christianity as a subset of Judaism, which was a licensed religion. This accidental protection allowed the church to grow under Rome\'s umbrella.',
    'Corinth was a major commercial center on the narrow isthmus connecting mainland Greece to the Peloponnese. Its two harbors made it a crossroads of east-west Mediterranean trade. The city was proverbially associated with sexual immorality and religious diversity. Claudius expelled Jews from Rome around AD 49.',
    'A church planter arrives in a city famous for its nightlife, corporate corruption, and cultural diversity. They take a day job to pay the bills and start a community group in a coworker\'s house. When the local religious establishment files a complaint, the judge throws it out as a non-issue. Eighteen months later, the congregation is established, and the planter moves on — leaving behind a married couple who are better theologians than anyone realizes.',
    JSON.stringify([
      "What does God's promise 'I have many people in this city' teach about how God sees places we consider hostile?",
      "Why does Paul work as a tentmaker, and what does this model about ministry and self-support?",
      "What does Priscilla and Aquila's instruction of Apollos reveal about theological mentoring?"
    ]),
    JSON.stringify([
      {"angle":"I have many people in this city — seeing a hostile environment through God's eyes","target_audience":"church planters and urban ministry leaders","primary_theme":"mission and encouragement"},
      {"angle":"Tentmaking — the integration of work and ministry","target_audience":"bivocational ministers and working professionals","primary_theme":"vocation and ministry"},
      {"angle":"Priscilla and Aquila — married partnership in teaching and ministry","target_audience":"couples in ministry and communities debating women's roles","primary_theme":"collaboration and shared leadership"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 21 ────────────────────────────────────────────────────────────
  [
    'act-paul-arrested-jerusalem',
    'Paul\'s Arrest in Jerusalem',
    'ACT', 21, 1, 21, 40,
    'Paul travels to Jerusalem despite repeated prophetic warnings that imprisonment awaits him. Agabus binds his own hands and feet with Paul\'s belt, prophesying chains in Jerusalem. Paul declares, "I am ready not only to be bound but also to die for the name of the Lord Jesus." In Jerusalem, James and the elders suggest Paul demonstrate his Jewish faithfulness by sponsoring temple purification rites. While Paul is in the temple, Jews from Asia accuse him of defiling it by bringing Gentiles inside. A mob drags him from the temple and begins beating him. Roman soldiers intervene and arrest Paul. Standing on the barracks steps, Paul asks to address the crowd.',
    'Acts 21 marks the beginning of Paul\'s long journey toward Rome — not as a free missionary but as a prisoner. His willingness to go to Jerusalem despite clear warnings models a faith that is informed by prophecy but not controlled by fear. The arrest fulfills Jesus\' own pattern: the servant is not above the master.',
    'The tension between Paul and the Jerusalem church is palpable. James and the elders ask Paul to prove his Jewish loyalty — suggesting that rumors about Paul teaching Jews to abandon Moses have created a political crisis within the church. Paul agrees, demonstrating his pastoral flexibility, but the gesture fails to prevent the very accusation it was designed to deflect.',
    'The charge that Paul brought Gentiles into the temple\'s inner courts was a capital offense — a sign posted in Greek and Latin at the barrier warned that any non-Jew who entered would be responsible for their own death. The accusation is false but exposes the deepest anxiety of Jewish identity: the boundary between Jew and Gentile that Paul\'s gospel was systematically dissolving.',
    'Jerusalem during a festival was packed with pilgrims from across the diaspora. The temple\'s Court of the Gentiles was separated from the inner courts by a stone barrier (the soreg). Roman soldiers stationed in the Antonia Fortress adjacent to the temple could observe the temple courts and intervene in disturbances.',
    'A civil rights leader returns to the city where they know they will be arrested, despite friends begging them not to go. Once there, allies suggest they perform symbolic gestures to appease opponents. The gestures fail. A mob forms, and the police arrive — not to protect the leader but to arrest them. On the courthouse steps, the leader asks for a microphone.',
    JSON.stringify([
      "What does Paul's willingness to go to Jerusalem despite prophetic warnings teach about the relationship between divine guidance and human courage?",
      "Why does the Jerusalem church ask Paul to demonstrate his Jewish faithfulness, and what does his compliance reveal?",
      "How does the false accusation about defiling the temple expose the real issue driving opposition to Paul?"
    ]),
    JSON.stringify([
      {"angle":"Ready to die — Paul's journey toward certain suffering","target_audience":"people facing costly obedience","primary_theme":"courage and calling"},
      {"angle":"The tension between Paul and Jerusalem — when the same gospel creates different expectations","target_audience":"churches navigating internal theological diversity","primary_theme":"unity amid disagreement"},
      {"angle":"The temple barrier — the boundary that the gospel was dissolving","target_audience":"communities wrestling with insider/outsider dynamics","primary_theme":"inclusion and identity"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 22 ────────────────────────────────────────────────────────────
  [
    'act-paul-defense-crowd',
    'Paul\'s Defense Before the Jerusalem Crowd',
    'ACT', 22, 1, 22, 30,
    'Standing on the barracks steps, Paul addresses the crowd in Aramaic, and they fall silent. He tells his story: a devout Jew educated under Gamaliel, a persecutor of the Way who held the cloaks at Stephen\'s stoning, then encountered the risen Jesus on the road to Damascus. The crowd listens until Paul says God sent him "far away to the Gentiles." At this word they erupt: "Rid the earth of him! He\'s not fit to live!" The Roman commander orders Paul flogged for information, but Paul reveals his Roman citizenship, stopping the flogging immediately. The commander is alarmed — he had purchased his citizenship, but Paul was born with it.',
    'The crowd\'s turning point is surgically precise: they can tolerate Paul\'s conversion, his visions, even his claim to speak for God — but not the inclusion of Gentiles. The word "Gentiles" is the detonator. Acts 22 exposes the deepest resistance to the gospel: not theological disagreement but ethnic exclusivism.',
    'Paul\'s dual identity — devout Jew and Roman citizen — gives him access to worlds that would otherwise be closed. His use of Roman citizenship is strategic, not selfish; it preserves his life for continued mission. The commander\'s admission that he purchased his citizenship while Paul was born with it introduces an ironic social reversal.',
    'Paul\'s retelling of his Damascus road experience emphasizes the continuity between his Jewish past and his Christian present. He was not converted from Judaism but to the fullest expression of what his Judaism was always pointing toward. The concept of testimony — personal narrative as theological argument — is modeled here.',
    'The Antonia Fortress barracks overlooked the temple courts from the northwest corner. Paul spoke in Aramaic, the common language of Palestinian Jews, which immediately signaled his insider status. Roman citizenship was a valuable legal protection that exempted a person from summary punishment.',
    'An immigrant speaks to a hostile rally in their own language, and the crowd quiets. They tell the story of their journey — born here, educated here, once shared your convictions. The crowd listens. Then the speaker says: I was sent to serve people outside our community. The crowd explodes. It was never about the story. It was about who gets included.',
    JSON.stringify([
      "Why does the crowd tolerate Paul's testimony until he mentions the Gentiles?",
      "What does Paul's strategic use of Roman citizenship teach about engaging systems of power?",
      "How does Paul frame his conversion as continuity with his Jewish identity rather than a rejection of it?"
    ]),
    JSON.stringify([
      {"angle":"The word 'Gentiles' as a detonator — when inclusion is the unforgivable offense","target_audience":"communities wrestling with diversity and exclusion","primary_theme":"inclusion and resistance"},
      {"angle":"Paul's testimony — the power of personal narrative in hostile settings","target_audience":"believers learning to share their faith","primary_theme":"witness and story"},
      {"angle":"Born a citizen — strategic use of privilege for the sake of mission","target_audience":"privileged believers wondering how to use their advantages","primary_theme":"stewardship of privilege"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 23 ────────────────────────────────────────────────────────────
  [
    'act-plot-against-paul-transfer-caesarea',
    'The Sanhedrin Hearing and the Plot to Kill Paul',
    'ACT', 23, 1, 23, 35,
    'Paul appears before the Sanhedrin and opens by claiming a clear conscience. The high priest Ananias orders him struck. Paul retorts, "God will strike you, you whitewashed wall!" Learning he addressed the high priest, Paul apologizes. He then strategically divides the council by declaring, "I am a Pharisee, and I am on trial for the hope of the resurrection of the dead." Pharisees and Sadducees erupt into violent argument. That night, the Lord appears to Paul: "Take courage! As you have testified about me in Jerusalem, you must also testify in Rome." Forty men take an oath not to eat or drink until they have killed Paul. Paul\'s nephew discovers the plot and reports it to the Roman commander, who transfers Paul to Caesarea under heavy military escort.',
    'Acts 23 reveals Paul as both a principled theologian and a shrewd political operator. His exploitation of the Pharisee-Sadducee divide is tactically brilliant — by making the resurrection the issue, he forces his natural theological allies (the Pharisees) to defend him against their rivals. The Lord\'s nighttime encouragement confirms that this chaos is part of the plan: Rome is the destination.',
    'Paul\'s nephew — an otherwise unknown young man — is the instrument of divine protection. God does not send an angel or an earthquake but a relative with information. The protection of the apostle comes through ordinary family networks and a Roman military system that, for its own reasons, cooperates with God\'s purposes.',
    'The resurrection functions here as both a genuine theological conviction and a strategic argument. Paul believes in the resurrection, and he knows it will divide his opponents. The concept that truth can be strategically deployed without being instrumentalized is a delicate one — Paul walks the line.',
    'The Sanhedrin met in the Hall of Hewn Stone adjacent to the temple. The high priest Ananias was notoriously corrupt and was later assassinated during the Jewish revolt. The oath of the forty assassins (a form of herem, or devoted ban) was a dangerous form of religious zealotry.',
    'A defendant at a congressional hearing realizes the committee is split between two ideological factions. By framing the issue as a question one faction cares about deeply, the defendant turns the hearing into an internal fight. That night, a family member discovers an assassination plot and alerts the authorities, who transfer the defendant to a more secure jurisdiction.',
    JSON.stringify([
      "Is Paul's exploitation of the Pharisee-Sadducee divide shrewd wisdom or manipulative deception?",
      "What does the Lord's nighttime encouragement reveal about divine guidance in dangerous situations?",
      "How does God use ordinary means — a nephew, a military escort — to accomplish extraordinary purposes?"
    ]),
    JSON.stringify([
      {"angle":"Take courage — divine encouragement in the middle of the night and the middle of the crisis","target_audience":"people in prolonged difficulty who need reassurance of God's plan","primary_theme":"encouragement and divine purpose"},
      {"angle":"Paul's nephew — God working through ordinary people in ordinary ways","target_audience":"people who feel too ordinary to be used by God","primary_theme":"ordinary instruments of providence"},
      {"angle":"Shrewd as serpents — the ethics of strategic thinking in hostile environments","target_audience":"Christians in complex professional or political settings","primary_theme":"wisdom and integrity"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 24 ────────────────────────────────────────────────────────────
  [
    'act-paul-before-felix',
    'Paul Before Governor Felix',
    'ACT', 24, 1, 24, 27,
    'The high priest Ananias arrives in Caesarea with an attorney named Tertullus, who accuses Paul of being a troublemaker, a ringleader of the Nazarene sect, and a temple defiler. Paul defends himself: he worships the same God as his accusers, believes everything in the Law and Prophets, and was ceremonially clean in the temple when arrested. Felix, who has considerable knowledge of the Way, adjourns the case. He later summons Paul for a private conversation about faith in Christ Jesus. When Paul discusses "righteousness, self-control, and the judgment to come," Felix becomes frightened and dismisses him: "When I find it convenient, I will send for you." He keeps Paul imprisoned for two years, hoping for a bribe.',
    'Felix\'s response — fear followed by procrastination — is one of the most psychologically realistic portraits in Acts. He is intellectually curious, emotionally moved, and morally convicted, but he delays indefinitely. The phrase "when I find it convenient" is the epitaph of every person who recognized the truth but never acted on it.',
    'The private conversations between Paul and Felix reveal a strange intimacy. Felix and his wife Drusilla (a Jewish princess) were genuinely interested in Paul\'s message. But Felix wanted the gospel on his terms — intellectually stimulating but morally undemanding. Paul refused to edit the message, discussing precisely the topics Felix needed but did not want to hear.',
    'Paul\'s defense reframes Christianity not as a departure from Judaism but as its fulfillment. "I believe everything that is in accordance with the Law and the Prophets" — this is continuity, not rupture. The concept of "the Way" as a movement within Judaism is still operative at this stage.',
    'Caesarea Maritima was the Roman administrative capital of Judea, built by Herod the Great with a magnificent harbor, palace, and amphitheater. Felix was a freed slave who rose to the governorship — Tacitus wrote that "he exercised the power of a king with the instincts of a slave." His tenure was marked by corruption and brutality.',
    'A prisoner gets a private audience with the governor. The governor is fascinated, keeps requesting meetings, but never acts. The prisoner refuses to soften the message or offer a bribe. Two years pass. The governor is eventually recalled for corruption, and the prisoner is still in jail — not because the case is complicated but because justice was never the point.',
    JSON.stringify([
      "What makes Felix's 'when I find it convenient' so dangerous, and how do we see that pattern today?",
      "Why does Paul speak about righteousness, self-control, and judgment to a morally compromised governor?",
      "What does Felix's two-year delay reveal about the relationship between conviction and action?"
    ]),
    JSON.stringify([
      {"angle":"When I find it convenient — the deadliest words in response to the gospel","target_audience":"people who are interested in Christianity but keep postponing commitment","primary_theme":"procrastination and urgency"},
      {"angle":"Righteousness, self-control, and judgment — the gospel Felix didn't want to hear","target_audience":"audiences that prefer comfortable spiritual messages","primary_theme":"the full gospel and moral demand"},
      {"angle":"Two years in prison — faithfulness when justice is delayed indefinitely","target_audience":"people waiting for resolution in prolonged difficulty","primary_theme":"patience and trust in God's timing"}
    ]),
    'ai_assisted',
    null
  ],

  // ── ACT 25 ────────────────────────────────────────────────────────────
  [
    'act-paul-appeals-to-caesar',
    'Paul Appeals to Caesar',
    'ACT', 25, 1, 25, 27,
    'Festus replaces Felix as governor and visits Jerusalem, where the chief priests ask him to transfer Paul for an ambush. Festus refuses and holds a hearing in Caesarea. The charges are serious but unsubstantiated. Festus, wanting to do the Jewish leaders a favor, asks Paul if he is willing to be tried in Jerusalem. Paul, knowing the danger, makes the declaration that changes everything: "I appeal to Caesar!" Festus confers with his council and responds, "You have appealed to Caesar. To Caesar you will go!" King Agrippa and Bernice arrive for a state visit, and Festus consults Agrippa about the case, admitting he has nothing concrete to write to the emperor.',
    'Paul\'s appeal to Caesar is a pivotal moment in salvation history. What appears to be a legal maneuver is actually the mechanism God uses to bring Paul to Rome — the very destination the Lord promised in Acts 23:11. Human legal systems, political interests, and divine purposes converge in a single sentence.',
    'Festus is portrayed as more competent than Felix but equally trapped by political pressures. He wants to accommodate the Jewish leaders without violating Roman law. Paul\'s appeal to Caesar removes the case from local manipulation but commits Paul to the uncertainties of imperial justice. Both men are constrained by systems larger than themselves.',
    'The concept of appealing to Caesar was a right of Roman citizenship — the provocatio ad Caesarem. By invoking it, Paul moves from a provincial court where politics can override justice to the imperial court where (in theory) the law is supreme. The irony is that the most powerful legal system in the world is being used to advance the gospel.',
    'Festus succeeded Felix around AD 59-60. King Agrippa II and his sister Bernice were the last of the Herodian dynasty, ruling a small territory in the northeast. Their arrival in Caesarea with royal pomp contrasts with Paul the prisoner whose message will outlast their dynasty.',
    'A defendant facing a corrupt local court exercises their right to have the case heard by the Supreme Court. The local judge is relieved — the political problem is now someone else\'s. The defendant knows the Supreme Court is not guaranteed to be favorable, but they also know it is the path to the capital city, where they have always intended to go.',
    JSON.stringify([
      "How does Paul's appeal to Caesar serve both his legal interests and God's larger mission?",
      "What does Festus's inability to formulate charges reveal about the nature of the opposition to Paul?",
      "How does God use human legal and political systems to accomplish divine purposes?"
    ]),
    JSON.stringify([
      {"angle":"I appeal to Caesar — using the system to advance the mission","target_audience":"Christians navigating legal, political, or institutional systems","primary_theme":"strategic wisdom and divine sovereignty"},
      {"angle":"Festus's dilemma — when doing right is politically costly","target_audience":"leaders under pressure to compromise for convenience","primary_theme":"courage and political integrity"},
      {"angle":"To Caesar you will go — how divine promises are fulfilled through unexpected means","target_audience":"people waiting on unfulfilled promises from God","primary_theme":"providence and patience"}
    ]),
    'ai_assisted',
    null
  ],
];

// ─── Run the insert ──────────────────────────────────────────────────────────
console.log(`Inserting ${units.length} narrative units ...`);
batch(units);
const total = db.prepare("SELECT count(*) FROM narrative_units WHERE book_id IN ('MAT','MRK','LUK','JHN','ACT')").pluck().get();
console.log(`Done. Total Gospels+Acts narrative units now: ${total}`);
db.close();
