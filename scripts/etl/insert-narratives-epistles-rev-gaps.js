/**
 * insert-narratives-epistles-rev-gaps.js
 *
 * Fill missing narrative_units for Epistles + Revelation chapters.
 *
 * Missing chapters (grouped into argument units per epistle logic):
 *   ROM 2,16 | 1CO 14,16 | 2CO 2,6,7,8,9,10,11,13 | EPH 3,5 | COL 4
 *   2TH 1 | 1TI 4,5 | 2TI 3 | HEB 2,3,6 | JAS 4 | REV 10
 *
 * source_tier = 'ai_assisted'
 */

const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ---------------------------------------------------------------------------
// Narrative units to insert
// ---------------------------------------------------------------------------

const narratives = [

  // ========================================================================
  //  R O M A N S
  // ========================================================================

  // ROM 2:1-29 — Paul's Case Against Moral Judges
  {
    id: 'rom-case-against-moral-judges',
    title: "Paul's Case Against Moral Judges",
    book_id: 'ROM',
    chapter_start: 2,
    verse_start: 1,
    chapter_end: 2,
    verse_end: 29,
    summary:
      "After luring the morally confident reader into a comfortable nod through the catalogue of Gentile sin in chapter 1, Paul springs the trap. 'Therefore you have no excuse, O man, every one of you who judges.' The self-righteous reader — almost certainly the Jewish-Christian contingent in Rome who had been mentally checking off every item on the vice list — suddenly discovers that the finger has turned around and is pointing directly at them.\n\nPaul's argument is devastating in its simplicity: you who judge others do the very same things. Not necessarily the same specific acts, but the same fundamental posture — claiming moral superiority while being guilty of your own failures. The implication is not that everyone commits identical sins. It is that everyone stands under the same verdict. God shows no favoritism. He judges according to reality, not reputation.\n\nThe chapter climaxes with a redefinition of Jewish identity itself. 'A person is not a Jew who is one only outwardly, nor is circumcision merely outward and physical. No, a person is a Jew who is one inwardly; and circumcision is circumcision of the heart.' Paul is not abolishing Jewish identity. He is radicalizing it. The mark that matters is not carved into flesh but written on the heart by the Spirit. The insider who coasts on heritage is in more danger than the outsider who genuinely seeks God.",
    significance:
      "Romans 2 is the hinge that transforms Paul's argument from a critique of pagan idolatry into a universal indictment. Without this chapter, Romans would be a comfortable document for religious people — a catalogue of other people's sins. With it, Paul closes every escape hatch. The moralist is as guilty as the libertine. The judge is as condemned as the judged. This leveling is essential to Paul's gospel: if everyone is not equally condemned, then grace is not equally needed, and the cross is merely a suggestion rather than the only hope.\n\nThe redefinition of circumcision as a matter of the heart draws directly from Deuteronomy 30:6 and Jeremiah 4:4. Paul is not innovating — he is reminding his audience that the prophets themselves said external religion without internal transformation is worthless.",
    relational_note:
      "Paul is addressing the Jewish-Christian majority in Rome who have returned after Claudius's expulsion to find a Gentile-dominated church. They would have felt spiritually superior — they had the Torah, the covenants, the heritage. Paul cuts the legs out from under that confidence without dismissing its legitimacy. He acknowledges that Jewish identity carries genuine advantages (chapter 3 will spell these out), but advantages are not the same as immunity. The relational dynamic is that of a fellow Jew telling his own people: your heritage is real, but it will not save you from the same judgment everyone else faces.",
    conceptual_note:
      "The concept of divine impartiality — 'God shows no favoritism' — is one of the most radical claims in ancient religion. Every ancient system had insiders and outsiders, and the gods favored their own people. Paul says the God of Israel judges everyone by the same standard. This is not relativism — the standard is real and demanding. But it is applied without ethnic or cultural privilege. The implications for the Jewish-Gentile divide in Rome would have been explosive: if God does not favor Jews in judgment, then the Gentile believers are not second-class citizens in the kingdom.",
    climate_note:
      "Rome's Jewish-Christian community was navigating a painful reentry. After Claudius expelled Jews around AD 49, the church had operated as an entirely Gentile institution for several years. When Jewish believers returned, they found a church that had developed its own practices, leadership structures, and theology — all without reference to Jewish tradition. The temptation to reassert Jewish authority by pulling rank on Torah observance and covenant heritage was strong. Paul addresses this tension head-on: your heritage is real, but it does not exempt you from the same moral scrutiny everyone else faces.",
    modern_parallel:
      "Every community has its version of the moral judge — the person who has memorized the rules, catalogued everyone else's failures, and built an identity around being the one who got it right. Romans 2 is the text that dismantles that identity. It is not comfortable reading for anyone who has ever used 'those people' as a category.\n\nThe modern equivalent of circumcision-as-identity-marker is whatever your community uses to separate insiders from outsiders: the right voting record, the right theological vocabulary, attendance at the right events, abstinence from the right vices. Paul's argument is not that these things are irrelevant. It is that they are insufficient. You can check every external box and still have an unchanged heart. The person who has never missed a Sunday service but gossips in the parking lot is Paul's target audience.\n\nThe 'circumcision of the heart' language is also strikingly relevant for anyone raised in a religious tradition who has to decide whether their faith is inherited or chosen. Paul is asking: is your identity something stamped on you at birth, or something the Spirit is actively writing into your character? The answer determines whether your religion is a costume or a transformation.",
    key_questions: JSON.stringify([
      "Where in your life do you judge others for failures you privately share?",
      "What external markers of faith have you substituted for genuine internal transformation?",
      "How does the claim that 'God shows no favoritism' challenge the way your community treats insiders and outsiders?",
      "What would it look like for your faith to be 'circumcision of the heart' rather than a set of external credentials?",
      "When has moral confidence blinded you to your own need for grace?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Trap: When the Sermon Is About You",
        target_audience: "Morally confident churchgoers who evaluate others",
        primary_theme: "Self-righteousness as spiritual blindness"
      },
      {
        angle: "No Favoritism: The God Who Doesn't Grade on a Curve",
        target_audience: "Communities divided by insider-outsider dynamics",
        primary_theme: "Divine impartiality and universal accountability"
      },
      {
        angle: "Heart Surgery: When Heritage Isn't Enough",
        target_audience: "People raised in religious homes questioning inherited faith",
        primary_theme: "Internal transformation versus external markers"
      },
      {
        angle: "The Judge Judged: How Moral Confidence Becomes Moral Danger",
        target_audience: "Leaders and teachers who hold others to high standards",
        primary_theme: "The symmetry between judgment given and judgment received"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in Pauline scholarship on the diatribe form in Romans 2 and the Jewish-Gentile dynamics of the Roman church.'
  },

  // ROM 16:1-27 — Paul's Greetings and Final Warnings
  {
    id: 'rom-greetings-final-warnings',
    title: "Paul's Greetings and Final Warnings",
    book_id: 'ROM',
    chapter_start: 16,
    verse_start: 1,
    chapter_end: 16,
    verse_end: 27,
    summary:
      "Romans ends not with a theological flourish but with a roll call. Twenty-six names. Phoebe, the deacon who likely carried the letter. Prisca and Aquila, who risked their necks for Paul. Andronicus and Junia, outstanding among the apostles. Mary, who worked hard for the Roman church. Ampliatus, Urbanus, Stachys, Apelles, the household of Aristobulus — name after name, each one a life, each one a story.\n\nThis is not filler. This is the gospel in human form. Every name represents a relationship forged across the ethnic, economic, and gender barriers that defined the Roman world. Slaves and freedpersons sit next to aristocrats. Jews next to Gentiles. Women in leadership alongside men. The list is a snapshot of what the church was actually doing — creating a community that didn't exist anywhere else in the ancient world.\n\nThen Paul pivots sharply. Watch out for those who cause divisions and put obstacles in your way that are contrary to the teaching you have learned. Stay away from them. The warmth of the greetings is followed by a cold warning: unity is precious and fragile, and there are people who will destroy it for personal gain. The letter closes with a doxology that reaches back to the beginning: the mystery hidden for long ages is now revealed, and through it all nations are being brought to the obedience of faith.",
    significance:
      "Romans 16 is the most important chapter in the New Testament for understanding the social composition of the early church. The names reveal a community that crossed every major social boundary in the Roman world. Phoebe is commended as a deacon and patron — a woman in formal leadership. Junia (almost certainly female, despite centuries of attempts to make the name masculine) is called 'outstanding among the apostles.' Slaves, freedpersons, and citizens worship together. This chapter demolishes any claim that the early church was a homogeneous movement.\n\nThe sharp warning against divisive people is also significant: Paul considers unity a theological issue, not merely a social preference. Those who create divisions are serving 'their own appetites,' not the Lord. The implication is that schism is a form of idolatry — placing personal agendas above the body of Christ.",
    relational_note:
      "Paul has never visited Rome, but he knows an astonishing number of people there — a testament to the mobility of early Christians across the empire and to Paul's relational network. The greetings are not perfunctory. Each person is named with a specific commendation: this one 'worked hard,' that one 'risked their necks,' another is 'beloved.' Paul sees people, remembers them, and honors them publicly. The list models a leadership style that notices individuals, even in a letter addressed to an entire congregation.\n\nThe warning about divisive people reveals Paul's pastoral protectiveness. He has invested sixteen chapters in building a theological framework for unity. He is not going to let false teachers undo it with smooth talk.",
    conceptual_note:
      "The closing doxology ties the entire letter together by returning to the theme of mystery revealed. The gospel was God's plan from eternity, hidden in the prophetic writings, now disclosed to all nations. Paul's argument has come full circle: from the universal need for salvation (chapters 1-3) through the mechanics of grace (chapters 4-8) and the mystery of Israel (chapters 9-11) to the practical outworking of love (chapters 12-15) — and now the names of the people in whom all of this is being lived out. Theology is never abstract for Paul. It always terminates in persons.",
    climate_note:
      "The diversity of names in Romans 16 reflects the cosmopolitan nature of the imperial capital. Rome drew people from every corner of the empire — Jewish immigrants, Greek freedpersons, Latin citizens, slaves from Africa and Asia. The church was forming in the most diverse city in the ancient world, which made its unity both more remarkable and more fragile. The warning about divisive people suggests that this unity was already under threat — likely from teachers who wanted to impose additional requirements on Gentile believers or who used the community for personal influence.",
    modern_parallel:
      "Most people skip Romans 16. It's a list of names they can't pronounce about people they've never heard of. But this chapter is a mirror. Look at the list and ask: does your church look like this? Does your community include people from different ethnic backgrounds, economic classes, and social positions — not as a diversity initiative but as the natural consequence of a gospel that breaks down walls?\n\nThe women in this list are particularly striking. Phoebe isn't mentioned as a helper or supporter — she's a deacon and a patron, formal titles of authority. Junia is an apostle. Prisca is named before her husband, suggesting she was the more prominent ministry partner. Whatever you believe about gender roles in the church, you have to reckon with the fact that Paul — supposedly the great restrictor of women — ends his most important letter by commending women in leadership.\n\nThe warning about divisive people is evergreen. Every generation of the church has its smooth talkers who use theology as a cover for ego, who create factions by flattering some and excluding others, who serve 'their own appetites' while claiming to serve God. Paul's counsel is blunt: stay away from them. Not engage them. Not debate them. Avoid them. Some threats to unity are not worth a conversation.",
    key_questions: JSON.stringify([
      "If someone wrote a greeting list for your church, what would it reveal about the diversity — or lack of diversity — of your community?",
      "Who are the unsung workers in your congregation who deserve to be named and honored?",
      "How do you distinguish between healthy theological disagreement and divisive behavior that Paul says to avoid?",
      "What does it mean that Paul commends women in formal leadership roles at the end of his most theologically rigorous letter?",
      "The doxology says the mystery hidden for ages is now revealed. Where do you see the gospel creating unlikely community in your own context?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Roll Call: Why the Names You Skip Are the Point",
        target_audience: "Congregations that undervalue relational investment",
        primary_theme: "The gospel embodied in specific people and relationships"
      },
      {
        angle: "Phoebe, Junia, and the Women Paul Trusted: What Romans 16 Reveals",
        target_audience: "Communities debating women in ministry",
        primary_theme: "Women in early church leadership as Pauline evidence"
      },
      {
        angle: "Stay Away: Paul's Surprisingly Blunt Advice About Divisive People",
        target_audience: "Churches experiencing faction and infighting",
        primary_theme: "Unity as a theological commitment, not just social preference"
      },
      {
        angle: "The Diverse City, the Diverse Church: What Rome Teaches Us About Community",
        target_audience: "Monocultural congregations in diverse settings",
        primary_theme: "The gospel's power to create community across every divide"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in social-historical analysis of Roman prosopography and Pauline network studies.'
  },

  // ========================================================================
  //  1   C O R I N T H I A N S
  // ========================================================================

  // 1CO 14:1-40 — Order in Worship
  {
    id: '1co-order-in-worship',
    title: "Order in Worship: Prophecy, Tongues, and the Common Good",
    book_id: '1CO',
    chapter_start: 14,
    verse_start: 1,
    chapter_end: 14,
    verse_end: 40,
    summary:
      "After the soaring poetry of the love chapter, Paul lands with both feet on the ground. The Corinthian worship services have become chaotic. Everyone is speaking in tongues simultaneously, nobody is interpreting, visitors walk in and think the congregation has lost its mind. The spiritual gifts Paul praised in chapter 12 and surrounded with love in chapter 13 are being weaponized for self-display. The church has turned worship into a competition.\n\nPaul's correction is simple but radical: pursue love, and earnestly desire spiritual gifts, especially prophecy. Tongues speak mysteries to God, but prophecy speaks to people for their upbuilding, encouragement, and consolation. The person who speaks in tongues builds up themselves; the person who prophesies builds up the church. Paul doesn't ban tongues — he says he speaks in tongues more than all of them — but he insists that what happens in corporate worship must be intelligible to everyone present. Five words of instruction, he says, are worth more than ten thousand words in a tongue nobody understands.\n\nThe chapter climaxes with a principle that has shaped liturgical practice for two millennia: 'God is not a God of disorder but of peace.' Everything should be done in a fitting and orderly way. This is not a call to suppress the Spirit. It is a call to channel the Spirit's work toward the community's actual benefit. The most Spirit-filled worship service is not the loudest or the most ecstatic — it is the one where everyone leaves built up.",
    significance:
      "1 Corinthians 14 establishes the principle that spiritual gifts are given for the common good, not for individual display. This chapter has been the primary battleground for debates about tongues, prophecy, and charismatic worship throughout church history. But the central point transcends those debates: whatever gift you have, its purpose is to serve others. The moment a gift becomes a platform for self-expression or a marker of spiritual superiority, it has been corrupted.\n\nPaul's criterion for evaluating worship practices is intelligibility and edification. Does it build up the body? Can outsiders understand what's happening? These questions remain the most important ones any church can ask about its worship.",
    relational_note:
      "Paul's relationship with the Corinthians is famously complicated — they are his most gifted and most dysfunctional congregation. His tone in chapter 14 oscillates between pastoral patience and blunt exasperation. 'Brothers and sisters, stop thinking like children.' He is a father correcting his children who have been showing off. The reference to outsiders walking in and thinking 'you are out of your mind' suggests Paul is genuinely concerned about the church's public witness — not just its internal dynamics.",
    conceptual_note:
      "The distinction between tongues and prophecy is not about which gift is 'better' in the abstract but about which serves the gathered community more effectively. Paul values both, but in corporate worship the criteria shift from personal edification to communal benefit. This principle — that context determines which gifts should be expressed — is a mature theology of spiritual gifts that avoids both the suppression of charismata and the chaos of unregulated expression. The 'God of peace, not disorder' principle is not anti-supernatural. It is the claim that the Holy Spirit is coherent, purposeful, and community-oriented.",
    climate_note:
      "Corinth was a city that valued public performance. Rhetoric, oratory, and dramatic display were the cultural currency. The ecstatic practices in the Corinthian church — uninterpreted tongues, simultaneous prophesying, chaotic worship — likely reflected the surrounding culture's love of spectacle. Paul is pushing back against a church that has imported Corinthian performance culture into its worship. The gift of tongues, in particular, may have been prized precisely because it was the most dramatic and unintelligible, making the speaker seem more spiritual by Corinthian standards.",
    modern_parallel:
      "The Corinthian worship problem is alive in every church that confuses spiritual maturity with spiritual performance. In charismatic contexts, the question is whether ecstatic gifts are being used to build up the body or to showcase the gifted. In traditional contexts, the same dynamic plays out differently: the person with theological knowledge who dominates every discussion, the musician who turns worship into a concert, the preacher who performs rather than serves.\n\nPaul's criterion cuts across every worship tradition: is what you're doing intelligible and edifying to the person next to you? If an outsider walked in, would they encounter God or would they encounter your religious subculture? The question is not whether your worship is contemporary or traditional, loud or quiet, planned or spontaneous. The question is whether it builds up the people in the room.\n\nThe line 'God is not a God of disorder but of peace' has been used to justify everything from rigid liturgical rubrics to suppressing the Spirit entirely. Paul intended neither. He is saying that the Spirit's work has a shape, and that shape is love expressed in intelligible, community-building ways.",
    key_questions: JSON.stringify([
      "In your worship context, what practices exist more for the performer than for the congregation?",
      "How do you distinguish between the Spirit's genuine work and cultural preference dressed up in spiritual language?",
      "Paul says five intelligible words are worth more than ten thousand in a tongue. Where is your community prioritizing impressiveness over clarity?",
      "If an outsider walked into your worship service this Sunday, what would they conclude about your God?",
      "How do you hold together genuine openness to the Spirit with orderly, community-building worship?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Five Words: When Less Is More in Worship",
        target_audience: "Churches debating worship style and spiritual gifts",
        primary_theme: "Intelligibility and edification as the criteria for worship"
      },
      {
        angle: "The God of Peace, Not Chaos: Why the Spirit Has a Shape",
        target_audience: "Charismatic congregations navigating gift expression",
        primary_theme: "Order as the Spirit's character, not the Spirit's cage"
      },
      {
        angle: "What Would the Outsider Think? Worship and Public Witness",
        target_audience: "Inward-focused churches unconcerned with accessibility",
        primary_theme: "Worship as evangelism when ordered by love"
      },
      {
        angle: "Gifts for the Body: When Your Talent Stops Serving Others",
        target_audience: "Gifted individuals who use ministry as self-expression",
        primary_theme: "Spiritual gifts as community property, not personal platform"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in Pauline scholarship on Corinthian worship practices and the theology of charismata.'
  },

  // 1CO 16:1-24 — Collection and Closing
  {
    id: '1co-collection-and-closing',
    title: "The Collection and Closing Instructions",
    book_id: '1CO',
    chapter_start: 16,
    verse_start: 1,
    chapter_end: 16,
    verse_end: 24,
    summary:
      "After fifteen chapters of soaring theology, fierce correction, and the most famous chapter on love ever written, Paul ends with logistics. Set aside money on the first day of each week. Timothy is coming — don't intimidate him. Apollos doesn't want to visit right now. The household of Stephanas deserves your respect. Greet each other with a holy kiss. The letter closes not with a doctrinal summary but with the practical business of a community that has bills to pay, leaders to honor, and relationships to maintain.\n\nThe collection Paul organizes is for the impoverished Jerusalem church — a project he considers so important that he mentions it in nearly every letter. This is not a fundraising appeal. It is a theological act: Gentile churches sending money to Jewish believers to demonstrate that the body of Christ is one across ethnic and geographic lines. The collection is the economic proof of everything Paul argued in Romans about Jew and Gentile being one in Christ.\n\nThe final lines are striking in their warmth and their edge. 'If anyone has no love for the Lord, let that person be cursed.' Then immediately: 'The grace of the Lord Jesus be with you. My love be with all of you in Christ Jesus.' Tenderness and severity, side by side. Paul doesn't resolve the tension. He lives in it.",
    significance:
      "1 Corinthians 16 demonstrates that for Paul, theology is never complete until it reaches the wallet and the calendar. The first-day-of-the-week collection establishes a pattern that would eventually become the basis for Sunday worship and Christian giving. The collection for Jerusalem is Paul's most concrete demonstration that the gospel creates economic solidarity across ethnic and geographic lines. If your theology doesn't change how you spend your money and organize your time, Paul would say it hasn't actually changed you.\n\nThe commendation of Stephanas and the instruction to 'be subject to such people' reveals Paul's ecclesiology: leadership is recognized by service, not by title. The community owes respect to those who have devoted themselves to serving the saints.",
    relational_note:
      "Paul's closing reveals the complex web of relationships sustaining the early church. Timothy needs protection from intimidation — suggesting he is young and the Corinthians are aggressive. Apollos is maintaining his independence from Paul's travel schedule — a sign that the apostolic network was collaborative, not hierarchical. Aquila and Prisca host a house church and send greetings. The 'holy kiss' instruction is a reminder that early Christian community was physically embodied, not just intellectually shared.\n\nThe personal warmth of 'my love be with all of you' is remarkable coming at the end of the most corrective letter Paul ever wrote. He has rebuked them for divisions, sexual immorality, lawsuit abuse, worship chaos, and theological confusion — and he closes by telling them he loves them.",
    conceptual_note:
      "The collection for Jerusalem is undergirded by a theology of reciprocity Paul makes explicit elsewhere (Romans 15:27): the Gentiles have shared in the Jews' spiritual blessings, so they owe it to share material blessings in return. This is not charity in the modern sense — it is covenant solidarity. The economic sharing across ethnic lines is the material expression of the spiritual unity Paul has been arguing for. Money, for Paul, is a theological medium.",
    climate_note:
      "The Jerusalem church was impoverished for multiple reasons: the communal sharing of Acts 2-4 may have depleted resources, Roman taxation was crushing, and periodic famines (Acts 11:28) devastated the region. The Corinthian church, by contrast, was relatively prosperous — located in a major commercial hub with members wealthy enough to host house churches and throw dinner parties. The collection asks the rich church to support the poor one, crossing every line that the Roman world used to separate people: ethnicity, geography, class, and culture.",
    modern_parallel:
      "Most sermons on giving focus on personal blessing or institutional budget. Paul's collection is about neither. It is about the visible, material demonstration that the body of Christ transcends national, ethnic, and economic boundaries. The question is not 'can you afford to give?' but 'what does your giving say about who you believe your family is?'\n\nThe first-day-of-the-week instruction is also more significant than it appears. Paul is establishing a rhythm of generosity — not a one-time fundraising event but a weekly practice of setting aside resources for others. This is the origin of the offering plate, and its purpose is not institutional maintenance but cross-cultural solidarity.\n\nThe combination of severity and warmth in the closing lines models something the modern church desperately needs: the ability to speak hard truth and express genuine love in the same breath. Paul doesn't soften his warnings to seem nicer, and he doesn't withhold affection to seem tougher. He holds both, because that is what real pastoral love looks like.",
    key_questions: JSON.stringify([
      "What does your giving pattern reveal about who you consider to be your family in Christ?",
      "Paul organizes an international collection for a church he has never visited. What equivalent acts of cross-cultural solidarity exist in your community?",
      "How do you hold together the severity of Paul's warning ('let that person be cursed') with the warmth of his closing ('my love be with all of you')?",
      "What would it look like to establish a rhythm of generosity — not occasional donations but weekly, intentional setting aside for others?",
      "Who are the Stephanases in your congregation — the unrecognized servants who deserve honor?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Theology Meets the Wallet: Why Paul Ends With Money",
        target_audience: "Congregations that separate faith from finances",
        primary_theme: "Economic solidarity as theological confession"
      },
      {
        angle: "The Weekly Rhythm: How Giving Becomes a Discipline, Not an Event",
        target_audience: "Churches with sporadic or reluctant giving patterns",
        primary_theme: "Habitual generosity as spiritual formation"
      },
      {
        angle: "Cursed and Loved: The Unresolved Tension in Paul's Closing",
        target_audience: "Leaders navigating tough love in community",
        primary_theme: "Pastoral integrity that holds truth and tenderness together"
      },
      {
        angle: "Honor the Servants: Recognizing the Stephanases Among Us",
        target_audience: "Churches that only celebrate visible leaders",
        primary_theme: "Leadership defined by service, not by title"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in Pauline scholarship on the Jerusalem collection and early Christian financial practices.'
  },

  // ========================================================================
  //  2   C O R I N T H I A N S
  // ========================================================================

  // 2CO 2:1 – 7:16 — Ministry of Reconciliation (grouped: ch 2,6,7)
  {
    id: '2co-ministry-of-reconciliation-extended',
    title: "The Ministry of Reconciliation: Suffering, Sincerity, and the New Covenant",
    book_id: '2CO',
    chapter_start: 2,
    verse_start: 1,
    chapter_end: 7,
    verse_end: 16,
    summary:
      "Second Corinthians 2–7 is Paul at his most raw. He opens by explaining why he changed his travel plans — not out of fickleness but to spare the Corinthians another painful visit. Someone in the church had caused enormous grief, and Paul is now urging the congregation to forgive and restore this person before sorrow swallows him whole. Punishment has served its purpose; now it is time for comfort.\n\nFrom this pastoral crisis Paul launches into one of the most sustained and magnificent meditations on ministry in all of Scripture. He describes himself and his coworkers as the aroma of Christ — a fragrance of life to those being saved and of death to those perishing. He contrasts the glory of the old covenant (which came with such radiance that Moses had to veil his face) with the surpassing glory of the new covenant written on human hearts. We carry this treasure, he says, in jars of clay — 'hard pressed on every side, but not crushed; perplexed, but not in despair; persecuted, but not abandoned; struck down, but not destroyed.'\n\nChapters 6 and 7 bring the appeal to a climax. Paul catalogs his sufferings — beatings, imprisonments, sleepless nights, hunger — not as a complaint but as credentials. His hardships authenticate his ministry precisely because they prove he is not in it for the perks. He pleads with the Corinthians to open wide their hearts, as he has opened his. And then, in chapter 7, the resolution: Titus has arrived with good news. The Corinthians have repented. Their godly sorrow has produced earnestness, eagerness, and a longing to make things right. Paul's joy overflows.",
    significance:
      "This section establishes that authentic Christian ministry is validated not by success, power, or polish but by suffering endured with integrity. Paul's 'jars of clay' metaphor is one of the most important images in pastoral theology: the treasure of the gospel is deliberately placed in fragile, cracked, inadequate containers so that the power is obviously God's and not the minister's. This inverts every human expectation of leadership — where the world sees weakness, Paul sees the most convincing proof that God is at work.\n\nThe reconciliation theme running through these chapters operates on two levels: God reconciling the world to himself through Christ (5:18-21), and Paul reconciling with the Corinthians through painful honesty and patient love. The theological and the personal are inseparable.",
    relational_note:
      "The emotional vulnerability in these chapters is extraordinary. Paul admits he was so distressed that he couldn't minister effectively in Troas (2:12-13). He begs the Corinthians to make room in their hearts for him (6:11-13). He confesses his anxiety about how they would receive his severe letter, then erupts in relief when Titus reports their repentance (7:5-7). This is not the cold apostolic authority of a distant leader. This is a man who loves a dysfunctional community with his whole heart and is devastated when that love is not reciprocated. The reconciliation between Paul and the Corinthians models the reconciliation between God and humanity — painful, vulnerable, and ultimately joyful.",
    conceptual_note:
      "The old covenant/new covenant contrast in chapter 3 draws from Jeremiah 31 and Ezekiel 36. The old covenant came with external glory — Moses' shining face — but its glory was fading and veiled. The new covenant comes with internal transformation — the Spirit writing on hearts — and its glory is increasing and unveiled. Paul's point is not that the old covenant was bad. It is that the new covenant is so much better that what was glorious has lost its glory by comparison. The veil imagery is rich: Israel's hearts are veiled when they read the old covenant, but when anyone turns to the Lord, the veil is removed. Freedom and transformation happen through direct encounter with the Lord's glory.",
    climate_note:
      "The Corinthian church was influenced by the Greco-Roman culture of rhetorical power and social status. Traveling teachers were evaluated by their eloquence, appearance, and ability to command impressive fees. Paul — who was unimpressive in appearance, refused payment, and was frequently beaten and imprisoned — looked like a failure by Corinthian standards. His opponents in Corinth exploited this, questioning his credentials and authority. Paul's defense is to turn the evaluation criteria upside down: his suffering and weakness are his credentials because they prove the power belongs to God.",
    modern_parallel:
      "In a culture that judges leaders by their platform size, their production quality, and their absence of visible weakness, Paul's ministry philosophy is a bomb. The jars of clay principle says: your cracks are not liabilities. They are the spaces through which God's light shines. The pastor who admits to depression, the leader who confesses confusion, the missionary who comes home exhausted and doubting — these are not ministry failures. They are, by Paul's logic, the most compelling evidence that the gospel is real and not just another self-help brand.\n\nThe reconciliation with the Corinthians also models something most churches desperately need: a pathway back from relational breakdown. Paul wrote a severe letter. It caused pain. He agonized over whether he should have sent it. And then — it worked. The sorrow produced repentance, not resentment. Not every confrontation ends this well, but Paul shows that avoiding hard conversations is not the same as preserving peace. Sometimes genuine peace requires going through the painful valley of honest conflict.\n\nThe 'aroma of Christ' image is haunting. You are either the smell of life or the smell of death, depending on the spiritual state of the person encountering you. There is no neutral. The same gospel that liberates one person offends another. That is not a failure of communication. It is the nature of the message.",
    key_questions: JSON.stringify([
      "Where are you carrying treasure in jars of clay — and are you trying to hide the cracks or let the light through?",
      "Paul's suffering authenticated his ministry. How does your community evaluate its leaders — by polish or by faithfulness through hardship?",
      "Is there a relationship in your life that needs the kind of painful, honest reconciliation Paul describes here?",
      "What is the difference between godly sorrow that produces repentance and worldly sorrow that produces death?",
      "Paul says we are 'the aroma of Christ.' To the people around you, does your life smell like life or like death — and can you control which?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Jars of Clay: Why Your Weakness Is Your Strongest Credential",
        target_audience: "Leaders struggling with imposter syndrome or burnout",
        primary_theme: "Divine power displayed through human fragility"
      },
      {
        angle: "The Severe Letter: When Love Requires Confrontation",
        target_audience: "Communities avoiding necessary conflict",
        primary_theme: "Godly sorrow as the pathway to genuine reconciliation"
      },
      {
        angle: "Unveiled Faces: Living Without Masks Before God and Each Other",
        target_audience: "Congregations where pretense is the norm",
        primary_theme: "The freedom of the new covenant versus performance religion"
      },
      {
        angle: "The Aroma of Christ: Why You Can't Be Spiritually Neutral",
        target_audience: "Passive Christians hoping to avoid offense",
        primary_theme: "The polarizing nature of authentic faith"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Covers 2CO 2-7 as a unified pastoral and theological argument. Grounded in Pauline scholarship on apostolic suffering and new covenant theology.'
  },

  // 2CO 8:1 – 9:15 — Collection for Jerusalem
  {
    id: '2co-collection-for-jerusalem',
    title: "The Collection for Jerusalem: Generosity and Grace",
    book_id: '2CO',
    chapter_start: 8,
    verse_start: 1,
    chapter_end: 9,
    verse_end: 15,
    summary:
      "Paul shifts from raw emotion to practical economics — but the economics are saturated with theology. He holds up the Macedonian churches as a model: they were severely tested by affliction and extreme poverty, yet their overflowing joy produced a 'wealth of generosity.' They didn't give out of surplus. They gave out of lack. They begged for the privilege of participating. Paul is describing a community so transformed by the gospel that their giving defied every rational calculation.\n\nThen the theological ground: 'You know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you through his poverty might become rich.' This one sentence is the Christological foundation for all Christian generosity. Giving is not a duty reluctantly performed. It is the natural overflow of people who understand what they have received. The cross is the pattern: someone rich becoming poor so that others might become rich. Every act of genuine generosity repeats that pattern in miniature.\n\nPaul closes with the promise that God who provides seed to the sower will enlarge the harvest of their righteousness. The generous will have enough for every good work. And the final result: thanksgiving to God. The collection will not only supply the needs of the saints but will overflow in many expressions of thanks. The circle is complete — grace received, grace given, gratitude returned to God.",
    significance:
      "2 Corinthians 8-9 is the most developed theology of giving in the New Testament. Paul grounds generosity not in obligation or guilt but in Christology — the self-emptying of Christ is the pattern for all Christian economic behavior. The 'grace of giving' language transforms stewardship from a reluctant duty into a joyful participation in the gospel itself. The equality principle Paul articulates (8:13-15, drawing from the manna story in Exodus 16) is revolutionary: the goal is not that some are burdened and others relieved, but that there is equality through mutual sharing.",
    relational_note:
      "Paul is navigating a delicate social dynamic. The Corinthians had promised to contribute to the Jerusalem collection a year ago but have not followed through. Paul uses the Macedonians as a gentle spur — essentially saying, 'These churches that have far less than you have already given sacrificially. I know you don't want to be outdone.' He sends Titus and two other brothers ahead to organize the collection, partly to ensure transparency and partly to avoid any appearance that Paul is personally profiting. The relational care here is noteworthy: Paul handles money with meticulous accountability because he knows how easily financial suspicion can destroy trust.",
    conceptual_note:
      "The Christological grounding of generosity in 8:9 is one of the most compressed statements of incarnational theology in the Pauline corpus. Christ's 'richness' refers to his pre-existent divine glory; his 'poverty' refers to the incarnation and ultimately the cross. The logic is not merely moral example ('be generous like Jesus') but participatory: when you give sacrificially, you are enacting the same pattern that saved you. Generosity is not adjacent to the gospel. It is the gospel in economic form.\n\nThe manna principle from Exodus 16 — 'the one who gathered much did not have too much, and the one who gathered little did not have too little' — provides the Old Testament warrant for economic redistribution within the people of God. Paul is not advocating state socialism. He is describing the natural economic behavior of a community that genuinely believes its members belong to one body.",
    climate_note:
      "The Jerusalem church's poverty was both economic and political. Roman taxation, local exploitation, and the social cost of following a crucified Messiah left the community destitute. The Corinthian church, located in a major commercial center, had access to wealth that Jerusalem Christians could not imagine. Paul's collection is not just charity — it is a deliberate strategy to bind the Gentile and Jewish wings of the church together through material solidarity. If Gentile churches demonstrate tangible love for Jewish believers, the theological unity Paul argues for becomes economically visible.",
    modern_parallel:
      "The Christological principle of generosity — 'though he was rich, for your sake he became poor' — dismantles every prosperity gospel and every guilt-based giving campaign simultaneously. The prosperity gospel says God makes the generous rich. Paul says Christ became poor. Guilt-based giving says you owe God. Paul says you've already received more than you could ever repay, so giving is a joyful response, not a reluctant obligation.\n\nThe Macedonian example is particularly convicting for affluent Western Christians. These were churches in severe poverty giving out of their lack, not their surplus. The test of generosity is not what you give when you have plenty. It is what you give when giving costs you something you feel.\n\nThe transparency measures Paul puts in place — sending named, trustworthy delegates, keeping the collection accountable — also speak to the modern church's frequent financial scandals. Paul understood that money and ministry create a combustible combination, and he proactively built safeguards. Any church leader who resists financial transparency is operating outside the Pauline model.",
    key_questions: JSON.stringify([
      "Is your giving more like the Macedonians (sacrificial, out of lack) or more calculated and cautious? What drives the difference?",
      "How does the Christological principle — Christ became poor so you could become rich — reshape your understanding of generosity?",
      "Paul says giving should be 'not reluctantly or under compulsion.' What would it take for your giving to feel like a privilege rather than an obligation?",
      "What safeguards does your church have in place for financial transparency? Would Paul be satisfied with them?",
      "The collection was meant to bind Jew and Gentile together. What equivalent acts of cross-cultural economic solidarity is your community engaged in?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Rich Became Poor: The Christological Foundation of Every Dollar You Give",
        target_audience: "Affluent congregations with cautious giving patterns",
        primary_theme: "Generosity as participation in Christ's self-emptying"
      },
      {
        angle: "The Macedonian Standard: When the Poorest Churches Give the Most",
        target_audience: "Churches that give from surplus but not from sacrifice",
        primary_theme: "Sacrificial giving as evidence of gospel transformation"
      },
      {
        angle: "Not Reluctantly: When Giving Becomes a Privilege, Not a Burden",
        target_audience: "Guilt-fatigued givers and reluctant stewards",
        primary_theme: "Joy as the engine of generosity"
      },
      {
        angle: "Follow the Money: Why Paul Insisted on Financial Transparency",
        target_audience: "Church leaders and finance teams",
        primary_theme: "Accountability as an expression of integrity, not suspicion"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in Pauline scholarship on the Jerusalem collection and incarnational economics.'
  },

  // 2CO 10:1 – 13:14 — Paul's Apostolic Defense (ch 10-11, 13)
  {
    id: '2co-apostolic-defense',
    title: "Paul's Apostolic Defense: The Fool's Speech",
    book_id: '2CO',
    chapter_start: 10,
    verse_start: 1,
    chapter_end: 13,
    verse_end: 14,
    summary:
      "The tone of 2 Corinthians shifts so dramatically at chapter 10 that many scholars believe this is a separate letter — the 'severe letter' Paul references earlier. Whether it was written separately or forms the climax of the same document, the emotional intensity is unmistakable. Paul is under attack. False apostles have infiltrated the Corinthian church, boasting about their credentials, their eloquence, their impressive appearance. They have called Paul weak, unimpressive in person, and incompetent as a speaker. And they are winning.\n\nPaul responds with the most extraordinary rhetorical move in the New Testament: the 'fool's speech.' He engages in the very boasting he considers absurd, but every boast is inverted. Where others boast of strength, Paul boasts of weakness. Where others list their successes, Paul lists his sufferings: five times flogged by the Jews, three times beaten with rods, once stoned, three times shipwrecked, a night and a day adrift at sea — plus danger from rivers, bandits, his own countrymen, Gentiles, cities, wilderness, sea, and false brothers. And on top of it all, 'the daily pressure of my anxiety for all the churches.'\n\nThe climax is the thorn in the flesh. Three times Paul begged the Lord to remove it. The answer: 'My grace is sufficient for you, for my power is made perfect in weakness.' This becomes Paul's final boast and his theological manifesto: 'When I am weak, then I am strong.' The letter closes with a warning — Paul is coming, and he will not spare those who persist in sin — followed by the most trinitarian benediction in the New Testament: 'The grace of the Lord Jesus Christ, and the love of God, and the fellowship of the Holy Spirit be with you all.'",
    significance:
      "2 Corinthians 10-13 is the definitive New Testament passage on the relationship between weakness and power. Paul's argument is not that weakness is a necessary evil tolerated by God. It is that weakness is the chosen medium through which God's power operates most visibly. This inverts every cultural and religious assumption about leadership, authority, and credibility. The thorn in the flesh — whatever it was — becomes the theological cornerstone: God deliberately leaves the weakness in place because removing it would obscure the point. The power belongs to God, not the vessel.\n\nThe trinitarian benediction in 13:14 is the earliest and most concise trinitarian formula in the New Testament, predating the formal creeds by centuries.",
    relational_note:
      "Paul's relationship with Corinth reaches its most strained point in these chapters. The false apostles have not merely offered alternative teaching — they have attacked Paul personally, calling him weak, timid, and a fraud. Paul's defense is passionate, sarcastic, and vulnerable by turns. He compares himself to a father watching his daughter seduced by a con artist (11:2-3). He resorts to 'boasting like a fool' because the Corinthians — who should know better — are impressed by exactly the kind of self-promotion Paul has always refused. The emotional stakes are not abstract: Paul fears losing a church he planted to charlatans.",
    conceptual_note:
      "The 'power made perfect in weakness' principle is Paul's most radical contribution to the theology of leadership. It does not mean that competence is irrelevant or that failure should be celebrated. It means that the most important power in the universe — the power of the gospel — deliberately works through human limitation so that no one mistakes the container for the contents. The super-apostles' error is not merely arrogance; it is a misunderstanding of how God works. They think divine power produces impressive humans. Paul says divine power inhabits broken ones.\n\nThe thorn in the flesh has been identified as everything from a physical illness to a spiritual attack to a difficult person. Paul's deliberate vagueness may be intentional — the specifics don't matter because every believer has their own thorn. The principle is universal: some weaknesses are not removed because they serve a higher purpose.",
    climate_note:
      "The competitive culture of Corinth extended to religion. Traveling teachers (sophists) competed for followers through rhetorical brilliance and personal charisma. They expected payment, dressed impressively, and cultivated patron relationships with wealthy hosts. The 'super-apostles' who infiltrated Corinth operated by exactly these rules. Paul's refusal to accept payment, his unimpressive appearance, and his history of suffering made him look like a loser by Corinthian standards. His defense is to redefine the rules entirely: in the kingdom of God, the credentials that matter are the scars.",
    modern_parallel:
      "In a social media age where personal branding, platform building, and curated success are the currency of influence, Paul's fool's speech is a grenade. The super-apostles are the Instagram pastors — polished, charismatic, always winning. Paul is the pastor nobody follows on social media, who doesn't have a book deal, who spent last Tuesday in a hospital room with a dying church member instead of recording a podcast. Paul's argument is that the second person is more credible, not less.\n\nThe thorn in the flesh resonates with anyone who has prayed repeatedly for deliverance from something that won't go away — chronic illness, depression, addiction, a difficult family member, a persistent temptation. Paul prayed three times and God said no. Not because God is cruel, but because the weakness is serving a purpose the sufferer cannot see. 'My grace is sufficient' is not a platitude. It is God's answer to the most painful prayer Paul ever prayed.\n\nThe trinitarian benediction that closes the letter has been spoken at the end of Christian worship services for nearly two thousand years. Most people hear it as a nice way to end a service. But coming at the end of this letter — after the attacks, the suffering, the boasting, the tears — it is an act of defiance. After everything, Paul's final word is grace, love, and fellowship. The super-apostles get the last attack. God gets the last word.",
    key_questions: JSON.stringify([
      "What is your 'thorn in the flesh' — the weakness you have asked God to remove and he hasn't? What might its purpose be?",
      "How does your community evaluate its leaders — by the metrics of the super-apostles or by Paul's criteria of faithful suffering?",
      "Where in your life is the phrase 'my power is made perfect in weakness' true but unwelcome?",
      "Paul boasts in his weakness. What would it look like for you to stop hiding your vulnerabilities and instead let them testify to God's sufficiency?",
      "The super-apostles were impressive but fraudulent. How do you discern between genuine spiritual authority and polished self-promotion?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Power in Weakness: The Most Counter-Intuitive Principle in Scripture",
        target_audience: "Leaders struggling with inadequacy or failure",
        primary_theme: "Divine power operating through human limitation"
      },
      {
        angle: "The Thorn That Stayed: When God Says No to Your Best Prayer",
        target_audience: "People exhausted from unanswered prayer",
        primary_theme: "Suffering as a vehicle for sufficient grace"
      },
      {
        angle: "The Fool's Speech: When Paul Fought Fire With Irony",
        target_audience: "Theologically curious congregations",
        primary_theme: "The inversion of cultural credentials in the kingdom of God"
      },
      {
        angle: "Spotting the Super-Apostles: How to Recognize Fraudulent Leadership",
        target_audience: "Churches navigating leadership transitions or scandals",
        primary_theme: "Discerning authentic authority from self-promoting charisma"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Covers 2CO 10-13 as a unified apostolic defense. Grounded in scholarship on the Corinthian correspondence and Pauline theology of weakness.'
  },

  // ========================================================================
  //  E P H E S I A N S
  // ========================================================================

  // EPH 3:1-21 — Mystery of Christ
  {
    id: 'eph-mystery-of-christ',
    title: "The Mystery of Christ Revealed",
    book_id: 'EPH',
    chapter_start: 3,
    verse_start: 1,
    chapter_end: 3,
    verse_end: 21,
    summary:
      "Paul begins chapter 3 with 'For this reason I, Paul, a prisoner for Christ Jesus on behalf of you Gentiles —' and then interrupts himself. He doesn't finish the sentence until verse 14. The interruption is a parenthetical explosion about a mystery that has been hidden for ages and is now revealed: the Gentiles are fellow heirs with Israel, members of the same body, sharers in the promise in Christ Jesus through the gospel. This is not an addendum to God's plan. It is the plan.\n\nWhat had been opaque in the Old Testament — how could the God of Israel be the God of the whole world? — is now made plain through the church. Paul says the manifold wisdom of God is being displayed 'through the church' to 'the rulers and authorities in the heavenly realms.' The church is not just the recipient of God's wisdom. It is the demonstration of God's wisdom to the cosmos. Every time a Jewish believer and a Gentile believer sit down at the same table, the principalities and powers see something they never expected.\n\nThen Paul prays. And this prayer is the theological center of the entire letter. He prays that the Ephesians would be strengthened with power through the Spirit in their inner being, that Christ would dwell in their hearts through faith, that they would be rooted and grounded in love, and that they would be able to comprehend what is the breadth, length, height, and depth of Christ's love — a love that surpasses knowledge. The prayer ends with one of the grandest doxologies in Scripture: 'Now to him who is able to do immeasurably more than all we ask or imagine, according to his power that is at work within us — to him be glory in the church and in Christ Jesus throughout all generations, for ever and ever.'",
    significance:
      "Ephesians 3 reveals that the multiethnic church is not a concession to cultural diversity — it is the mystery of the ages, the hidden purpose of God now made visible. The theological weight of this claim is staggering: the coming together of Jew and Gentile into one body is not a secondary outcome of the gospel. It is the demonstration of the gospel to the spiritual realm itself. The church's unity is cosmic theater — evidence presented before principalities and powers that God's wisdom is real.\n\nThe prayer for comprehending the 'breadth, length, height, and depth' of Christ's love has been the subject of mystical reflection for centuries. Some see it as a reference to the cross itself — broad enough to embrace all people, long enough to reach eternity, high enough to reach God, deep enough to descend into hell. Whatever the precise geometry, the point is that this love exceeds the capacity of any single mind to contain it. It takes the whole community to begin to grasp it.",
    relational_note:
      "Paul identifies himself specifically as 'a prisoner for Christ Jesus on behalf of you Gentiles.' His imprisonment is not incidental — it is part of his vocation to the Gentile mission. He is suffering because he believes that Gentile inclusion is worth suffering for. The relational dynamic is a mentor who has paid an enormous personal price for the people he is writing to, and who considers that price a privilege. 'I ask you not to be discouraged because of my sufferings for you, which are your glory.'",
    conceptual_note:
      "The 'mystery' in Paul's usage is not a puzzle to be solved but a secret now revealed. It was always part of God's plan, but it was hidden — 'not made known to people in other generations as it has now been revealed by the Spirit to God's holy apostles and prophets.' The content of the mystery is not Christology per se (that Christ would come) but ecclesiology: that Gentiles would be co-heirs, co-members, co-sharers. The scandal is not that God has a Son. The scandal is that God's family has no ethnic boundary.\n\nThe phrase 'immeasurably more than all we ask or imagine' is not a blank check for wish fulfillment. It is a declaration about God's operative power — the power 'at work within us.' God's capacity exceeds our imagination, and that power is already active in the lives of believers. The prayer is for the awareness of what is already true, not for something new to happen.",
    climate_note:
      "Ephesus was a city defined by ethnic and religious stratification. The Temple of Artemis served as both religious center and banking institution. Jewish communities had their own legal standing and social structures. Roman citizens had privileges others did not. The claim that all of these distinctions are relativized 'in Christ' — that a Jewish tentmaker and a Gentile silversmith are now 'fellow heirs' — was socially revolutionary. The 'rulers and authorities in the heavenly realms' may also have a political dimension: the earthly powers that maintained ethnic separation are being defied by the church's existence.",
    modern_parallel:
      "The claim that the multiethnic church is God's exhibit A to the cosmos puts enormous weight on what happens in actual congregations. If the church is the display case for God's wisdom, what does a segregated church display? What does a monocultural church communicate to the principalities and powers? Paul's vision is not a diversity initiative. It is a claim that the church's visible unity across ethnic, economic, and cultural lines is the primary evidence that the gospel works.\n\nThe prayer for comprehending the love of Christ — its breadth, length, height, and depth — speaks to a generation that knows more about love in theory than in experience. We can quote 1 Corinthians 13, define agape, and analyze the Greek verbs. But Paul's prayer is that the Ephesians would know this love experientially, not just intellectually. 'To know this love that surpasses knowledge' is deliberately paradoxical: the most important knowing is beyond what the mind can contain.\n\nThe doxology — 'immeasurably more than all we ask or imagine' — is the most hope-filled sentence in the letter, and it is grounded not in optimism but in divine power. Whatever you think God can do, you're thinking too small. Whatever you imagine is possible, God's capacity exceeds your imagination. And that power is not distant. It is 'at work within us' — present tense, active, right now.",
    key_questions: JSON.stringify([
      "If the multiethnic church is God's cosmic demonstration project, what does the composition of your church display to the world?",
      "Paul says the love of Christ has breadth, length, height, and depth. Which dimension do you find hardest to believe applies to you?",
      "What are you asking God for that might be far too small compared to what he is 'able to do immeasurably more' than?",
      "Paul calls himself a 'prisoner on behalf of you Gentiles.' Who is currently paying a price so that you can be included in God's family?",
      "How does the idea that the church demonstrates God's wisdom to 'rulers and authorities in the heavenly realms' change how you think about Sunday morning?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Mystery Revealed: Why the Multiethnic Church Is Not Optional",
        target_audience: "Monocultural congregations in diverse communities",
        primary_theme: "Gentile inclusion as the hidden plan of God, now visible"
      },
      {
        angle: "Immeasurably More: When Your Imagination Is Too Small for God",
        target_audience: "Discouraged believers with diminished expectations",
        primary_theme: "Divine power exceeding human imagination"
      },
      {
        angle: "Breadth, Length, Height, Depth: The Geometry of a Love Beyond Knowledge",
        target_audience: "Congregations that intellectualize faith at the expense of experience",
        primary_theme: "Experiential knowledge of Christ's love"
      },
      {
        angle: "Exhibit A: What the Principalities See When They Look at Your Church",
        target_audience: "Churches examining their witness to the spiritual realm",
        primary_theme: "The church as cosmic theater of God's wisdom"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on the Pauline mystery motif and cosmic ecclesiology in Ephesians.'
  },

  // EPH 5:1-33 — Walking in Light
  {
    id: 'eph-walking-in-light',
    title: "Walking in Light: Ethics and the Household of Faith",
    book_id: 'EPH',
    chapter_start: 5,
    verse_start: 1,
    chapter_end: 5,
    verse_end: 33,
    summary:
      "Ephesians 5 is where Paul's cosmic theology meets the kitchen table. After three chapters of dizzying theological vision and one chapter on church unity, Paul now says: here is what it looks like to walk in the light. And the first instruction is disarmingly simple — 'follow God's example, as dearly loved children.' The ethic flows from identity, not obligation. You are beloved, so live like it.\n\nThe chapter catalogs what belongs to the darkness — sexual immorality, impurity, greed, obscene talk, coarse joking — not as a killjoy list but as a description of behaviors that don't fit who the Ephesians have become. 'You were once darkness, but now you are light in the Lord. Live as children of light.' Paul doesn't say they were in darkness. He says they were darkness. The transformation is ontological, not just behavioral.\n\nThe household code that follows (5:21-33) has generated more controversy than almost any passage in Paul. 'Submit to one another out of reverence for Christ' introduces a mutual submission that governs everything that follows. Wives are told to submit to husbands 'as to the Lord,' and husbands are told to love their wives 'as Christ loved the church and gave himself up for her.' The standard for the husband is not authority but sacrifice — 'gave himself up.' Whatever hierarchy exists here is one in which the person with more power is required to use it for the other's benefit, to the point of death. Paul's model for marriage is the cross.",
    significance:
      "Ephesians 5 bridges the gap between theology and daily life in a way few passages manage. The ethical instructions are grounded in identity ('children of light'), not legalism. The transformation Paul describes is not behavior modification but a change of nature — from darkness to light. The ethical life is the natural expression of who the believer has become, not a list of rules to earn divine approval.\n\nThe household code has been used both to enforce patriarchy and to subvert it, depending on which verses receive emphasis. Read in its first-century context, the radical element is not the wife's submission (which would have been assumed) but the husband's sacrificial love modeled on Christ's death. No pagan household code demanded that a husband love his wife to the point of self-sacrifice. Paul is not importing secular patriarchy into the church. He is Christianizing the household by making the cross the governing principle of every relationship.",
    relational_note:
      "Paul's posture toward the Ephesians in chapter 5 is that of a parent coaching children into maturity. 'Follow God's example, as dearly loved children' sets the relational frame: they are not slaves being given orders but children being taught how to walk. The shift from cosmic theology to household ethics mirrors the rhythm of parenting — you teach your children the big story so they know how to navigate the small moments.\n\nThe marriage passage (5:21-33) ultimately points beyond human marriage to Christ and the church. 'This is a profound mystery — but I am talking about Christ and the church.' Paul uses marriage as a lens to understand the gospel, and the gospel as a lens to understand marriage. Neither is complete without the other.",
    conceptual_note:
      "The light/darkness imagery in Ephesians 5 draws from a deep well in Jewish and Christian tradition — the Genesis creation narrative, the Johannine prologue, the Qumran community's 'War of the Sons of Light Against the Sons of Darkness.' Paul is not using metaphor casually. Light and darkness represent two fundamentally different modes of existence, and the Ephesians have crossed from one to the other. The ethical instructions are the natural behavior of people who live in light — just as the eye naturally adjusts to brightness.\n\nThe command to 'be filled with the Spirit' (5:18) contrasts with being drunk with wine and suggests that the Spirit-filled life has its own intoxication — but one that produces psalms, hymns, spiritual songs, and thanksgiving rather than debauchery. The Spirit is not a supplement to the ethical life. The Spirit is the power that makes the ethical life possible.",
    climate_note:
      "The Ephesian context included the worship of Artemis (associated with fertility rites and sexual license), widespread Roman practices of infanticide and sexual exploitation, and a household structure in which the paterfamilias had absolute authority over wife, children, and slaves. Paul's ethical instructions would have sounded both familiar and strange: familiar in their call to ordered household life, strange in their foundation (Christ's sacrifice) and their demand that power be exercised for the benefit of the less powerful. The command to husbands to love their wives 'as Christ loved the church' was culturally revolutionary in a world where wives were property.",
    modern_parallel:
      "The identity-before-behavior framework of Ephesians 5 is the antidote to moralism. Paul doesn't say 'stop sinning so God will love you.' He says 'you are beloved children of light, so live accordingly.' The difference matters enormously. Moralism produces guilt and exhaustion. Identity-based ethics produces freedom and gratitude. You are not working toward acceptance. You are living from it.\n\nThe household code remains the most pastorally challenging section of Ephesians for modern readers. The word 'submit' triggers either defensive postures or weaponized authority, depending on who's wielding it. What gets lost in the culture war is Paul's actual logic: the governing verb is mutual submission (5:21), the model for authority is self-sacrifice unto death (5:25), and the ultimate reference point is Christ and the church, not any human power structure. A husband who reads this passage and concludes 'my wife must submit to me' has read the passage about as badly as it can be read. The passage says his job is to die.\n\nThe command to 'be filled with the Spirit' rather than drunk with wine speaks to a culture that medicates its pain and celebrates its numbness. The Spirit offers an alternative intoxication — one that leads to song, gratitude, and genuine community rather than to isolation and regret.",
    key_questions: JSON.stringify([
      "Paul says 'you were once darkness, but now you are light.' Where in your life are you still acting as if the lights haven't been turned on?",
      "How does the identity-before-behavior framework change the way you approach moral struggle — not 'try harder' but 'remember who you are'?",
      "What would it look like for the marriage relationship in your life (or your vision of marriage) to be governed by Christ's self-sacrificial love rather than by power or preference?",
      "Paul contrasts being filled with the Spirit with being drunk with wine. What do you turn to for emotional relief that the Spirit is offering in a deeper way?",
      "How do you navigate the household code in a culture that is rightly suspicious of power imbalances but often dismissive of sacrificial love?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Children of Light: When Ethics Flow from Identity, Not Obligation",
        target_audience: "Moralistic congregations exhausted by rule-keeping",
        primary_theme: "Ontological transformation as the basis for Christian behavior"
      },
      {
        angle: "His Job Is to Die: What the Household Code Actually Demands of Husbands",
        target_audience: "Couples, marriage enrichment contexts",
        primary_theme: "Christ's self-sacrifice as the model for authority in marriage"
      },
      {
        angle: "Spirit-Filled, Not Self-Medicated: The Alternative Intoxication",
        target_audience: "People using substances or distractions to cope",
        primary_theme: "The Spirit's fullness as the answer to the soul's thirst"
      },
      {
        angle: "From Darkness to Light: The Most Radical Identity Change Possible",
        target_audience: "New believers and seekers exploring faith",
        primary_theme: "The gospel as ontological transformation, not behavior modification"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Ephesian household codes and Pauline ethics of identity.'
  },

  // ========================================================================
  //  C O L O S S I A N S
  // ========================================================================

  // COL 4:1-18 — Colossian Greetings
  {
    id: 'col-greetings',
    title: "Colossian Greetings and Final Instructions",
    book_id: 'COL',
    chapter_start: 4,
    verse_start: 1,
    chapter_end: 4,
    verse_end: 18,
    summary:
      "Colossians closes with the kind of practical instructions and personal greetings that reveal how the early church actually functioned as a network. Paul tells masters to provide slaves with what is right and fair — a quietly revolutionary instruction in a world where slaves had no legal rights. He urges persistent prayer, wisdom toward outsiders, and speech 'seasoned with salt' — gracious but not bland.\n\nThen comes the network. Tychicus is carrying the letter. Onesimus — the runaway slave returning to Philemon — is with him. Aristarchus is a fellow prisoner. Mark (the one Paul once rejected as a travel companion in Acts 15) has been restored and commended. Epaphras, who planted the Colossian church, is wrestling in prayer for them. Luke the physician is present. And Demas — who Paul will later say deserted him, 'having loved this present world' (2 Timothy 4:10) — is here too, still faithful for now.\n\nThe letter ends with a poignant personal note: 'I, Paul, write this greeting in my own hand. Remember my chains.' He has been dictating the entire letter. These last words are his own handwriting — a signature, a reminder, and a request. The man who wrote the cosmic Christology of chapter 1 ends by asking people to remember that he is chained up.",
    significance:
      "Colossians 4 demonstrates that the high Christology of the letter ('in him all the fullness of deity dwells bodily') is meant to be lived out in the most mundane contexts — master-slave relationships, conversations with outsiders, personal correspondence. Paul's theology is never abstract. The same Christ who holds the universe together also governs how you treat your employees and how you talk to your neighbors.\n\nThe personal greetings reveal the relational infrastructure of the early church: letters carried by trusted delegates, prayer networks spanning cities, reconciled relationships (Mark), faithful church planters (Epaphras), and the ever-present reality of imprisonment. The church spread not through institutional machinery but through relationships sustained across distance and difficulty.",
    relational_note:
      "The mention of Mark is significant. Paul and Barnabas split over Mark's unreliability in Acts 15:36-41. Now Paul commends Mark and instructs the Colossians to welcome him. The reconciliation is quiet but profound — no dramatic speech, just a name in a greeting list with a commendation attached. Paul's relational capacity for restoration is one of his most underappreciated qualities.\n\nEpaphras 'wrestling in prayer' for the Colossians reveals the intensity of pastoral care across distance. He planted the church, cannot be with them, and so he fights for them the only way available: on his knees. The image of prayer as wrestling suggests that intercession is not passive but costly — an expenditure of spiritual energy on behalf of people you love.",
    conceptual_note:
      "The instruction to masters — 'provide your slaves with what is right and fair, because you know that you also have a Master in heaven' — does not abolish slavery (Paul was not in a position to do so), but it plants a theological seed that would eventually destroy the institution. If the master and the slave share a Master, then the hierarchy between them is relativized by a higher authority. This 'heavenly Master' principle erodes slavery from within: you cannot treat someone as subhuman when you both answer to the same Lord.\n\nThe instruction to make the most of every opportunity and to let your conversation be 'always full of grace, seasoned with salt' is Paul's missiology in a sentence. Engagement with outsiders should be intentional, gracious, and interesting — not preachy, not bland, not combative.",
    climate_note:
      "Colossae was a small Phrygian city that had been eclipsed by its neighbors Laodicea and Hierapolis. The church there was likely small, influenced by syncretistic philosophy (the 'Colossian heresy' of chapter 2), and pastored at a distance by Epaphras. The instruction to exchange letters with the Laodicean church (4:16) reveals that these congregations were networked and interdependent. The mention of Nympha and the church in her house reminds us that early Christianity operated in domestic spaces, not purpose-built facilities. The church was literally in someone's living room.",
    modern_parallel:
      "Paul's closing instructions model something the modern church often struggles with: integrating high theology with daily practice. It is one thing to affirm that Christ holds the universe together. It is another to treat your employees fairly, speak graciously to skeptics, and maintain relationships across geographic distance. Colossians 4 says these are the same thing.\n\nThe Mark rehabilitation is encouraging for anyone who has failed publicly and wonders whether there is a way back. Paul rejected Mark. Years later, Paul commends him. The church made room for both the initial failure and the eventual restoration. That is a community worth belonging to.\n\n'Remember my chains' is the final word from a man who has spent the letter describing a Christ of limitless cosmic authority. The author of that Christology is in prison. The disconnect between the theology and the circumstances is the point: the gospel does not depend on the freedom or comfort of its messengers. It has always been carried by chained hands.",
    key_questions: JSON.stringify([
      "How does the way you treat people with less power than you reflect your awareness that you 'also have a Master in heaven'?",
      "Paul says conversation with outsiders should be 'seasoned with salt' — gracious but flavorful. How would outsiders describe your conversations about faith?",
      "Is there a 'Mark' in your life — someone you've written off who deserves another chance?",
      "Epaphras 'wrestles in prayer' for the Colossians. Who are you wrestling in prayer for?",
      "What does it mean that the author of the most exalted Christology in the New Testament ends with 'remember my chains'?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Seasoned With Salt: How to Talk to People Who Don't Share Your Faith",
        target_audience: "Christians in pluralistic workplaces and neighborhoods",
        primary_theme: "Gracious, intentional engagement with outsiders"
      },
      {
        angle: "The Rehabilitation of Mark: When the Church Makes Room for Second Chances",
        target_audience: "People who have failed and feel disqualified",
        primary_theme: "Restoration as a core practice of Christian community"
      },
      {
        angle: "Remember My Chains: When High Theology Meets Hard Circumstances",
        target_audience: "Believers suffering despite strong faith",
        primary_theme: "The gospel carried by chained hands"
      },
      {
        angle: "Wrestling in Prayer: What Epaphras Teaches About Intercession",
        target_audience: "Prayer ministries and intercessors",
        primary_theme: "Pastoral prayer as costly, active spiritual labor"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Pauline prison epistles and early church social networks.'
  },

  // ========================================================================
  //  2   T H E S S A L O N I A N S
  // ========================================================================

  // 2TH 1:1-12 — Thessalonian Perseverance
  {
    id: '2th-perseverance',
    title: "Thessalonian Perseverance Under Persecution",
    book_id: '2TH',
    chapter_start: 1,
    verse_start: 1,
    chapter_end: 1,
    verse_end: 12,
    summary:
      "Paul opens 2 Thessalonians by thanking God for something most people would not celebrate: the church's suffering. The Thessalonians are enduring persecution and affliction, and Paul says their perseverance is 'evidence of God's righteous judgment' — proof that they are worthy of the kingdom for which they are suffering. The suffering is not a sign that God has abandoned them. It is a sign that they are on the right side of the coming vindication.\n\nPaul then paints a picture of that vindication in vivid apocalyptic colors. The Lord Jesus will be revealed from heaven with blazing fire and powerful angels, inflicting vengeance on those who do not know God and do not obey the gospel. He will come to be glorified among his holy people and to be marveled at among all who have believed. The language is fierce and unapologetic — this is not the gentle Jesus of children's storybooks. This is the returning King who settles accounts.\n\nBut Paul's purpose is not to frighten. It is to encourage. The Thessalonians are being crushed, and Paul is saying: hold on. The same God who allows your suffering will also vindicate it. Your persecutors will not have the last word. And the letter's opening prayer — that God would count them worthy of his calling and fulfill every resolve for good and every work of faith — grounds the encouragement in present grace, not just future hope. God is at work in them now, not merely at the end.",
    significance:
      "2 Thessalonians 1 establishes the theological framework for understanding suffering as evidence of faithfulness rather than evidence of divine abandonment. This reversal is essential for persecuted communities: if suffering means God has left you, then persecution destroys faith. If suffering means you are aligned with the coming kingdom, then persecution becomes evidence of allegiance.\n\nThe passage also contains one of the New Testament's most explicit descriptions of divine judgment — vengeance, blazing fire, eternal destruction. This language is uncomfortable for modern readers, but it served a crucial pastoral function: assuring an oppressed community that injustice is not permanent and that the God they serve is not indifferent to their pain.",
    relational_note:
      "Paul's relationship with the Thessalonians is uniquely tender. They were among his earliest converts, and the persecution they face began almost immediately (1 Thessalonians 2:14). Paul boasts about them to other churches — holding up their faith and endurance as an example. This is not flattery. It is a pastor publicly honoring a congregation that has been faithful under extraordinary pressure. The opening thanksgiving is Paul's way of saying: I see what you're going through, I am proud of you, and I have not forgotten you.",
    conceptual_note:
      "The 'righteous judgment of God' concept in verse 5 operates on two levels. First, the Thessalonians' suffering demonstrates that they are being refined for the kingdom — their perseverance proves their faith is genuine. Second, the coming judgment will be 'righteous' because it will be proportional and just — those who afflict the faithful will themselves be afflicted. Paul is not celebrating vengeance for its own sake. He is affirming that the universe is morally coherent and that suffering does not have the final word.\n\nThe dual nature of Christ's return — glory among the saints and judgment among the disobedient — reflects the consistent biblical pattern that the same event brings liberation for some and reckoning for others. The Exodus freed Israel and judged Egypt. The cross saves believers and condemns the powers. The return will complete the same pattern on a cosmic scale.",
    climate_note:
      "Thessalonica was a free city on the Via Egnatia — the main Roman highway across Macedonia. It had a significant Jewish community and a thriving imperial cult. The church faced opposition from both Jewish synagogue leaders (Acts 17:5-9) and Roman authorities who viewed allegiance to 'another king, Jesus' as sedition. The persecution was social, economic, and potentially legal. Paul's language about divine vengeance would have resonated with a community that had no legal recourse against its persecutors and needed assurance that someone more powerful than Rome was paying attention.",
    modern_parallel:
      "For Christians in the global south — in Nigeria, China, North Korea, parts of India — 2 Thessalonians 1 is not an ancient text. It is a present-tense survival manual. The assurance that God sees suffering, that perseverance is evidence of genuine faith, and that vindication is coming provides the theological scaffolding for communities enduring what Western Christians rarely face.\n\nFor Western Christians, the passage raises uncomfortable questions. If suffering for faith is evidence of genuine allegiance, what does the absence of suffering suggest? This is not a call to seek persecution, but it is an invitation to ask whether your faith costs you anything. The Thessalonians didn't choose suffering. They simply refused to compromise, and the world made them pay.\n\nThe divine judgment language is the part of the Bible that many modern readers would prefer to skip. But the alternative to a God who judges is a God who is indifferent to injustice — and that is not good news for anyone who has been oppressed. The persecuted need to know that injustice is not permanent. The doctrine of divine judgment is, paradoxically, a word of comfort for the powerless.",
    key_questions: JSON.stringify([
      "Paul calls the Thessalonians' suffering 'evidence of God's righteous judgment.' How does that reframe your understanding of hardship in your own life?",
      "Does your faith cost you anything? If not, what does that suggest about its countercultural content?",
      "How do you hold together the fierce judgment language of this passage with the grace and mercy emphasized elsewhere in Paul?",
      "Paul boasts about the Thessalonians to other churches. Who in your community deserves that kind of public honor for their faithfulness under pressure?",
      "Is the doctrine of divine judgment comforting or disturbing to you — and what does your reaction reveal about your position in the world?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Evidence of Faithfulness: When Suffering Proves You're on the Right Side",
        target_audience: "Christians facing opposition or social cost for their faith",
        primary_theme: "Persecution as evidence of genuine kingdom allegiance"
      },
      {
        angle: "The God Who Settles Accounts: Why Divine Judgment Is Good News for the Oppressed",
        target_audience: "People who have experienced injustice without recourse",
        primary_theme: "Divine vengeance as comfort for the powerless"
      },
      {
        angle: "Hold On: The Pastoral Heart Behind Apocalyptic Language",
        target_audience: "Exhausted believers tempted to quit",
        primary_theme: "Encouragement rooted in coming vindication"
      },
      {
        angle: "Worthy of the Calling: Present Grace for Future Glory",
        target_audience: "Christians uncertain whether they measure up",
        primary_theme: "God's active work in making believers worthy through faith"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Thessalonian persecution and Pauline eschatological encouragement.'
  },

  // ========================================================================
  //  1   T I M O T H Y
  // ========================================================================

  // 1TI 4:1 – 5:25 — Pastoral Instructions for Timothy
  {
    id: '1ti-pastoral-instructions',
    title: "Pastoral Instructions for Timothy: Teaching, Conduct, and Care",
    book_id: '1TI',
    chapter_start: 4,
    verse_start: 1,
    chapter_end: 5,
    verse_end: 25,
    summary:
      "Paul shifts from church structure to personal pastoral counsel, and he opens with a warning: in later times some will abandon the faith, following deceiving spirits and things taught by demons. The false teachers promote asceticism — forbidding marriage and commanding abstinence from certain foods — which Paul rejects by affirming that everything God created is good and nothing is to be rejected if it is received with thanksgiving. The heresy is not too much freedom. It is a distorted piety that adds restrictions God never intended.\n\nThen Paul turns to Timothy himself. 'Don't let anyone look down on you because you are young, but set an example in speech, in conduct, in love, in faith, and in purity.' The instruction is both empowering and demanding — Timothy's age is not an excuse, but his character must be above reproach. Paul tells him to devote himself to the public reading of Scripture, to preaching, and to teaching. 'Watch your life and doctrine closely. Persevere in them.'\n\nChapter 5 turns to the practical management of the church as a family. Treat older men as fathers, younger men as brothers, older women as mothers, younger women as sisters. The widow instructions are remarkably detailed — a real widows' list for those over sixty who have no family support, specific obligations for families to care for their own, a warning against younger widows being enrolled in the list prematurely. Paul addresses the compensation and discipline of elders: those who direct the affairs of the church well deserve double honor, especially those who labor in preaching and teaching. And an accusation against an elder should not be entertained unless supported by two or three witnesses.",
    significance:
      "1 Timothy 4-5 is the most practical section of pastoral theology in the New Testament. It covers everything from combating false teaching to personal spiritual discipline to caring for widows to handling accusations against leaders. The passage treats the church as a household — a family that requires the same kind of attentive management as any home, but with higher stakes.\n\nPaul's affirmation that 'everything God created is good' (4:4) is a foundational principle for Christian engagement with the material world. Against every gnostic tendency to demonize matter, food, and sexuality, Paul insists that creation is good and is sanctified by the word of God and prayer. Christian holiness is not about escape from the physical world but about receiving it with gratitude.",
    relational_note:
      "The letter's relational dynamic is that of an aging mentor giving detailed instructions to a younger protege who is overwhelmed by his assignment. Timothy is young, possibly timid (2 Timothy 1:7), and facing opposition from false teachers and disrespectful older church members. Paul's instructions are not abstract leadership principles. They are a father telling his son exactly how to handle the situations he will face tomorrow morning. The specificity — widows over sixty, elders who labor in preaching, accusations requiring witnesses — suggests that Timothy is dealing with real cases, not hypotheticals.",
    conceptual_note:
      "The false teaching Paul combats in chapter 4 — asceticism masquerading as piety — is a recurring pattern in Christian history. From medieval monasticism to modern health-and-wealth legalism, the temptation to add restrictions beyond what Scripture requires is perennial. Paul's corrective is theologically precise: the creation is good because the Creator is good, and thanksgiving sanctifies what we receive. The error is not in discipline (Paul himself practiced it) but in turning personal disciplines into universal requirements and treating God's good gifts as inherently suspect.\n\nThe widow-care instructions in chapter 5 reveal the early church functioning as an alternative social safety net in a world without government welfare. The church took responsibility for its vulnerable members — not as charity but as family obligation. The principle that 'anyone who does not provide for their relatives has denied the faith' is one of the strongest social-ethical statements in the Pauline corpus.",
    climate_note:
      "Ephesus was home to the cult of Artemis, mystery religions, and philosophical schools that often promoted ascetic practices as the path to spiritual enlightenment. The false teachers in 1 Timothy appear to have imported these ideas into the church — combining Jewish food laws with Greco-Roman asceticism to create a hybrid piety that sounded spiritual but contradicted the gospel's affirmation of creation. The large population of widows in the ancient world (where life expectancy was low and women had limited economic options) made widow care a critical community issue that any functioning church had to address.",
    modern_parallel:
      "'Don't let anyone look down on you because you are young' is the verse every young leader has memorized. But it comes with a condition: set an example in speech, conduct, love, faith, and purity. Paul doesn't say 'demand respect despite your age.' He says 'earn credibility through your character.' Youth is not a disqualification, but it requires double attention to integrity because the margin for error is thinner.\n\nThe widow-care instructions translate directly into how churches care for their most vulnerable members. In a world with social security and nursing homes, churches often outsource elder care to the state. Paul assumed the church was the primary safety net. The question for modern congregations is not whether they have a benevolence fund but whether they have a culture of family-like responsibility for members who fall through every other net.\n\nThe elder discipline instructions are painfully relevant for a church emerging from decades of leadership scandals. Two or three witnesses. Public rebuke for those who persist in sin. No favoritism. Paul provides a framework that is neither naive (he knows leaders can sin) nor cynical (he protects them from frivolous accusations). The balance is urgently needed.",
    key_questions: JSON.stringify([
      "Where is your community adding spiritual restrictions that God never intended — turning personal convictions into universal requirements?",
      "Paul tells Timothy to 'watch your life and doctrine closely.' Which one gets more of your attention, and what suffers as a result?",
      "How does your church care for its most vulnerable members — widows, the elderly, the chronically ill? Is it a program or a family culture?",
      "What safeguards exist in your community for handling accusations against leaders? Are they adequate?",
      "Paul tells a young leader not to let anyone despise his youth, but to earn credibility through character. What character quality do you most need to develop in your current season?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "Everything God Created Is Good: Against the Piety of Restriction",
        target_audience: "Legalistic communities that equate holiness with prohibition",
        primary_theme: "Creation affirmed, asceticism corrected, thanksgiving as sanctification"
      },
      {
        angle: "Young Leader, Old Responsibility: Timothy's Challenge and Ours",
        target_audience: "Emerging leaders in church and workplace",
        primary_theme: "Credibility earned through character, not demanded by title"
      },
      {
        angle: "The Church as Family: Caring for Widows, Elders, and the Vulnerable",
        target_audience: "Congregations outsourcing pastoral care to programs",
        primary_theme: "The church as primary social safety net for its members"
      },
      {
        angle: "Two or Three Witnesses: A Framework for Leader Accountability",
        target_audience: "Churches navigating leadership failures or transitions",
        primary_theme: "Balanced accountability that protects and corrects"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in pastoral epistles scholarship on church order, false teaching, and social welfare in the early church.'
  },

  // ========================================================================
  //  2   T I M O T H Y
  // ========================================================================

  // 2TI 3:1-17 — Last Days Warning
  {
    id: '2ti-last-days-warning',
    title: "Last Days Warning: Perilous Times and the Power of Scripture",
    book_id: '2TI',
    chapter_start: 3,
    verse_start: 1,
    chapter_end: 3,
    verse_end: 17,
    summary:
      "Paul writes from death row with the clarity that only mortality can provide. 'Mark this: there will be terrible times in the last days.' What follows is not a prediction about the distant future but a diagnosis of what Timothy is already seeing: people who love themselves, love money, are boastful, proud, abusive, ungrateful, unholy, without love, unforgiving, slanderous, without self-control, brutal, not lovers of the good, treacherous, rash, conceited, lovers of pleasure rather than lovers of God — 'having a form of godliness but denying its power.'\n\nThat last phrase is the most dangerous item on the list. The others are obvious vices. This one is camouflaged virtue — people who look religious, who speak the vocabulary, who attend the services, but whose lives bear no evidence of transformation. Paul is warning Timothy that the greatest threat to the church is not persecution from outside but hollow religion from within.\n\nPaul then pivots to Timothy's own formation. 'But as for you, continue in what you have learned and have become convinced of.' Timothy has known the Scriptures from infancy — his grandmother Lois and mother Eunice made sure of that. And now comes one of the most important statements about Scripture in the entire Bible: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting, and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.' The Scriptures are not merely informative. They are formative. They don't just tell you about God. They shape you into someone who can do God's work.",
    significance:
      "2 Timothy 3:16-17 is the New Testament's definitive statement on the nature and purpose of Scripture. 'God-breathed' (theopneustos) means the Scriptures carry divine authority — they are not merely human documents about God but divine communication through human authors. The fourfold purpose — teaching, rebuking, correcting, training in righteousness — covers the full range of spiritual formation. Scripture tells you what is true, shows you where you are wrong, explains how to get right, and trains you to stay right.\n\nThe 'form of godliness' warning is equally significant. Paul identifies the most dangerous counterfeit: not atheism, not paganism, but Christianity without power. The shell without the substance. The label without the life. This is the threat that bypasses every apologetic defense because it comes from within the walls.",
    relational_note:
      "This is Paul's last letter. He knows he is going to die. The urgency in his voice is palpable — he is not giving Timothy general advice for someday. He is preparing him for a future without Paul. The reference to Lois and Eunice adds a deeply personal dimension: Paul is not the only one who formed Timothy. A grandmother and a mother built the foundation. Paul is reminding Timothy that his spiritual heritage is multi-generational, and that heritage will sustain him after Paul is gone.\n\nThe tone oscillates between warning and tenderness. Paul describes terrible people doing terrible things, and then turns to Timothy with the gentleness of a dying father: 'But you — continue in what you have learned.' The 'but you' is the pivot of the chapter. The world may be falling apart, but you know what you know, and you know whom you learned it from.",
    conceptual_note:
      "The 'last days' in Paul's usage do not refer exclusively to the end of history. They describe the entire period between Christ's ascension and his return — the present age, which is characterized by both the presence of the Spirit and the persistence of evil. Timothy is already living in the last days, and so are we. The vices Paul describes are not future predictions. They are present realities that will intensify over time.\n\nThe concept of Scripture as 'God-breathed' has been central to every major debate about biblical authority. It does not specify a theory of inspiration (dictation, supervision, illumination) but affirms the result: these writings carry the breath of God. They are living and active. The practical consequence — that the person of God may be 'thoroughly equipped for every good work' — makes Scripture's purpose functional, not merely doctrinal. You don't study the Bible to win arguments. You study it to be transformed into someone capable of doing what God asks.",
    climate_note:
      "Paul is writing during Nero's persecution, which specifically targeted Christians in Rome. He is in a Roman prison, likely the Mamertine, expecting execution. The false teachers he describes — who 'worm their way into homes and gain control over gullible women' — are real people exploiting the community's vulnerability during a time of intense pressure. When the shepherd is imprisoned, the wolves get bolder. Timothy faces the dual challenge of combating internal corruption and sustaining the church's morale under external threat, and he must do it without Paul.",
    modern_parallel:
      "Paul's list of last-days vices reads like a social media audit: lovers of self, lovers of money, boastful, proud, slanderous, without self-control, lovers of pleasure rather than lovers of God. The specificity is uncanny not because Paul was predicting Instagram but because human nature doesn't change. The technologies are new. The sins are ancient.\n\nThe 'form of godliness' warning is the most relevant item for the contemporary church. The danger is not that people will stop attending church. It is that they will attend church, serve on committees, post Bible verses, and sing worship songs — all without being changed. The shell is intact. The power is missing. Paul's counsel is blunt: 'Have nothing to do with such people.' Not argue with them. Not reform them. Avoid them.\n\nThe affirmation of Scripture's God-breathed nature lands in a culture that is simultaneously more biblically literate (information access) and less biblically formed (character transformation) than perhaps any in history. The issue is not whether people have access to the Bible. It is whether the Bible has access to them — whether they allow it to teach, rebuke, correct, and train, or whether they treat it as a quotation database for social media captions.",
    key_questions: JSON.stringify([
      "Where do you see the 'form of godliness without its power' in your own community — or in yourself?",
      "Paul's vice list includes 'lovers of pleasure rather than lovers of God.' Where do your pleasures and your devotion compete, and which is winning?",
      "Who are the Lois and Eunice figures in your life — the people who built your spiritual foundation before you were old enough to choose it?",
      "If Scripture is meant to teach, rebuke, correct, and train, which of those four functions do you most resist? Why?",
      "Paul writes this from death row. How does his certainty about Scripture's power, in the face of his own execution, challenge your relationship with the Bible?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Form Without the Power: Christianity's Most Dangerous Counterfeit",
        target_audience: "Congregations that are active but unchanged",
        primary_theme: "The distinction between religious performance and spiritual transformation"
      },
      {
        angle: "God-Breathed: What Scripture Is For and Why It Matters",
        target_audience: "Churches navigating biblical authority questions",
        primary_theme: "Scripture as formative, not merely informative"
      },
      {
        angle: "But You: Paul's Final Charge to the Next Generation",
        target_audience: "Young leaders preparing for ministry without mentors",
        primary_theme: "Faithfulness rooted in what you've learned and whom you've learned it from"
      },
      {
        angle: "Lois, Eunice, and the Long Game of Faith: Why Grandmothers Matter",
        target_audience: "Families, intergenerational congregations",
        primary_theme: "Multi-generational spiritual formation"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on the Pastoral Epistles, Neronian persecution, and the doctrine of Scripture.'
  },

  // ========================================================================
  //  H E B R E W S
  // ========================================================================

  // HEB 2:1-18 — Jesus Greater Than Angels
  {
    id: 'heb-jesus-greater-than-angels',
    title: "Jesus Greater Than Angels: Why the Son Became Human",
    book_id: 'HEB',
    chapter_start: 2,
    verse_start: 1,
    chapter_end: 2,
    verse_end: 18,
    summary:
      "Chapter 2 opens with the first of five warning passages that punctuate Hebrews like alarm bells: 'We must pay the most careful attention, therefore, to what we have heard, so that we do not drift away.' The word 'drift' is telling. The author doesn't describe a dramatic renunciation of faith. The danger is quieter — the slow, almost imperceptible sliding away from what you once held dear. Neglect, not rebellion.\n\nThen comes a stunning argument for the incarnation. The author quotes Psalm 8 — 'What is mankind that you are mindful of them?' — and applies it to Jesus. God put everything under human feet, but we don't yet see everything subject to humanity. What we do see is Jesus, 'who was made lower than the angels for a little while, now crowned with glory and honor because he suffered death, so that by the grace of God he might taste death for everyone.'\n\nThe logic is precise: Jesus had to become fully human to save humans. He didn't take on the nature of angels. He took on the nature of Abraham's descendants. He was made like his brothers and sisters in every respect so that he could become a merciful and faithful high priest. The chapter climaxes with one of the most comforting verses in the New Testament: 'Because he himself suffered when he was tempted, he is able to help those who are being tempted.' The help is not theoretical. It is experiential. He knows.",
    significance:
      "Hebrews 2 provides the most developed argument for the incarnation's necessity in the New Testament. The author's logic is not merely that Jesus chose to become human but that he had to become human to accomplish salvation. Only a human could die a human death. Only someone who shared our nature could destroy the one who holds the power of death. Only a brother could free enslaved brothers and sisters.\n\nThe 'drifting' warning establishes a theme that runs through the entire letter: the primary spiritual danger is not dramatic apostasy but gradual neglect. This resonates far more than warnings about active rebellion, because most people who leave the faith don't do so by conscious decision. They drift.",
    relational_note:
      "The author's term for Jesus — 'pioneer' or 'founder' of salvation — carries the image of a trailblazer who goes first through the most dangerous territory. Jesus didn't direct the rescue from a safe distance. He went first into suffering, into temptation, into death. The relational dynamic is that of an elder brother who has already navigated the worst terrain and now turns back to guide his siblings through it. 'He is not ashamed to call them brothers and sisters' — this from the one who is 'the radiance of God's glory.' He could be ashamed. He isn't.",
    conceptual_note:
      "The destruction of 'him who holds the power of death — that is, the devil' (2:14) through Christ's death is a key atonement concept. By dying, Christ entered death's territory and defeated it from within. The image is not of an external rescue but of an infiltration — the Son takes on mortal flesh, enters death, and destroys death's power from the inside. This 'Christus Victor' motif has been central to Eastern Orthodox theology and is increasingly appreciated in Western scholarship as a complement to substitutionary and moral-influence models.\n\nThe 'fear of death' that holds humanity in lifelong slavery (2:15) is one of the most psychologically perceptive statements in the New Testament. Existentialist philosophers would spend centuries articulating what this verse captures in a clause: the fear of death shapes every human choice, relationship, and ambition. Christ's victory over death is not merely an afterlife guarantee. It is liberation from the fear that controls everything.",
    climate_note:
      "The original audience was likely Jewish Christians who had elevated angels to a status that competed with Christ's. First-century Judaism had a rich angelology — angels mediated the Torah (Galatians 3:19, Acts 7:53), angels fought in cosmic battles, and some speculative traditions bordered on angel worship (Colossians 2:18). The author spends all of chapter 1 establishing Christ's superiority to angels and now explains why Christ became lower than the angels: not because he was inferior but because salvation required incarnation. The audience needed to understand that Christ's humiliation was strategic, not a sign of lower status.",
    modern_parallel:
      "The warning about drifting is the most relevant pastoral observation in Hebrews for the contemporary church. Most people do not make a conscious decision to leave the faith. They get busy. They skip a Sunday, then two, then a month. The Bible goes from the nightstand to the shelf to the box in the closet. Prayer thins from daily conversation to occasional crisis management. The drift is so gradual that by the time you notice it, you've already covered a lot of distance.\n\nThe claim that Christ 'tasted death for everyone' — and through death destroyed death's power — speaks directly to a culture that has made death the final obscenity, the topic we refuse to discuss, the reality we spend billions to delay. The fear of death does not look like medieval terror at the grim reaper. It looks like a culture obsessed with youth, terrified of aging, and incapable of sitting with a dying person without reaching for a platitude. Christ's victory over death is not a theological abstraction. It is the offer of a life no longer controlled by the thing we refuse to name.\n\nAnd the final verse — 'because he himself suffered when he was tempted, he is able to help those who are being tempted' — is the sentence that makes Christianity different from every philosophical system that offers wisdom from a distance. The help Christ offers is not advice. It is solidarity. He didn't read about your suffering. He entered it.",
    key_questions: JSON.stringify([
      "Where are you drifting — not rebelling, not deciding, just slowly sliding away from what you once held dear?",
      "What does it mean that Jesus is 'not ashamed to call you brother or sister' — and where does shame keep you from receiving that?",
      "How does the fear of death shape your decisions, relationships, and ambitions — even if you don't consciously think about it?",
      "The author says Christ had to be made like us 'in every respect.' Does that comfort you or unsettle you? Why?",
      "If Christ 'tasted death for everyone,' what does that change about how you face your own mortality?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Drift: Why the Biggest Spiritual Danger Is Not Rebellion But Neglect",
        target_audience: "Lukewarm or distracted believers",
        primary_theme: "Gradual spiritual drift as the primary pastoral threat"
      },
      {
        angle: "Not Ashamed: The Brother Who Came Down to Get You",
        target_audience: "People isolated by shame or unworthiness",
        primary_theme: "Christ's identification with humanity as the basis for hope"
      },
      {
        angle: "Freed From the Fear of Death: Living Without the Final Anxiety",
        target_audience: "People controlled by existential fear or grief",
        primary_theme: "Christ's destruction of death's power over daily life"
      },
      {
        angle: "He Suffered When Tempted: Why Christ's Help Is Not Theoretical",
        target_audience: "People struggling with persistent temptation",
        primary_theme: "Experiential solidarity as the foundation of divine aid"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Hebrews Christology, the Christus Victor atonement motif, and first-century Jewish angelology.'
  },

  // HEB 3:1-19 — Jesus Greater Than Moses
  {
    id: 'heb-jesus-greater-than-moses',
    title: "Jesus Greater Than Moses: The Danger of Hardened Hearts",
    book_id: 'HEB',
    chapter_start: 3,
    verse_start: 1,
    chapter_end: 3,
    verse_end: 19,
    summary:
      "The author makes a comparison that no Jewish audience could ignore: Jesus and Moses. Moses is not a villain in this text — he is honored as 'faithful in all God's house.' But there is a crucial distinction. Moses was faithful as a servant in the house. Jesus is faithful as the Son over the house. A servant, no matter how loyal, is not the same as the owner's heir. The house itself belongs to the Son.\n\nThe implications would have been explosive for Jewish Christians tempted to return to Judaism. Moses represents the entire Torah system — the law, the priesthood, the sacrifices, the temple. To go back to Moses is to go back to a servant when the Son is standing right in front of you. The author doesn't denigrate Moses. He relativizes him. Everything Moses built was a testimony pointing to something greater.\n\nThen the author pivots to Psalm 95 and delivers a warning that will echo through the next two chapters: 'Today, if you hear his voice, do not harden your hearts as you did in the rebellion.' The wilderness generation saw the Red Sea parted, ate manna from heaven, drank water from the rock — and still refused to trust God at the border of the Promised Land. They had every reason to believe and chose not to. The result: an entire generation died in the desert, never entering the rest God had prepared for them. The author's message to his audience is unmistakable: you are standing at the same border. Do not make the same choice.",
    significance:
      "Hebrews 3 establishes the Son's superiority over the greatest figure in Judaism — Moses, the lawgiver, the liberator, the friend of God. This comparison goes to the heart of the temptation facing the original audience: returning to Judaism meant returning to Moses, and returning to Moses meant choosing the servant over the Son. The author doesn't argue that Moses was wrong or that the Torah was bad. He argues that both were preparatory — 'a testimony to what would be said in the future.'\n\nThe Psalm 95 quotation introduces the most sustained warning in Hebrews. The wilderness generation's failure is not presented as ancient history. It is a pattern that can be repeated. Faith is not a one-time decision. It is a daily posture. 'Today' is the operative word — not tomorrow, not when things settle down, not after you've figured everything out. Today.",
    relational_note:
      "The author addresses the audience as 'holy brothers and sisters who share in the heavenly calling' — language that affirms their identity before delivering a warning. This is not a lecture from above. It is an appeal from within the same family. The warning about hardened hearts is delivered by someone who includes himself in the danger: 'See to it, brothers and sisters, that none of you has a sinful, unbelieving heart that turns away from the living God.'\n\nThe call to 'encourage one another daily, as long as it is called Today' reveals the author's understanding that perseverance is communal, not individual. You cannot stay faithful alone. You need a community that speaks truth to you every day, because the deceitfulness of sin works slowly, and you will not notice your own hardening without others to point it out.",
    conceptual_note:
      "The builder/house metaphor is theologically precise. Jesus is not merely a more impressive figure than Moses. He occupies a different category entirely. Moses is part of the house; Jesus built the house. 'The builder of a house has greater honor than the house itself.' This is an argument from ontology, not merely from rank. The Son's superiority is not about being a better servant. It is about being the creator who made everything the servant managed.\n\nThe 'hardening' language draws from the Exodus narrative, where Pharaoh's heart was hardened, but applies it to God's own people. The warning is that proximity to God's wonders does not guarantee faith. The wilderness generation saw more miracles than any generation in history and still didn't trust God. Experience without obedience produces not mature faith but hardened resistance.",
    climate_note:
      "The original audience was being pressured to return to Judaism — which, unlike Christianity, was a legally recognized religion (religio licita) under Roman law. Judaism offered social protection, established community structures, and freedom from persecution that Christianity could not guarantee. The temptation was practical, not merely theological: going back to the synagogue meant safety. The author's response is that safety purchased by abandoning the Son is the most dangerous decision possible. The wilderness generation chose safety over faith and spent forty years dying in the desert.",
    modern_parallel:
      "The hardened heart warning is not about dramatic apostasy. It is about the slow, daily process by which someone who once responded to God's voice stops hearing it altogether. Sin is 'deceitful' — it doesn't announce itself. It creeps. It rationalizes. It makes the drift feel reasonable at every step. By the time the heart is fully hardened, the person doesn't feel hard. They feel normal. That's the deceit.\n\nThe call to 'encourage one another daily' is a prescription for a relational structure most modern churches lack. Weekly services and small groups are not what the author has in mind. 'Daily' means a community so interwoven that its members can detect spiritual drift in each other before the drifter notices it. It means vulnerable enough to receive correction and brave enough to give it. Most churches are neither.\n\nThe Moses-Jesus comparison also speaks to anyone who is clinging to a previous form of faith that once served them well but has become a refuge from growth. The 'Moses' in your life might be a theological system, a charismatic leader, a worship style, or a spiritual experience that was genuine but is not the destination. The author says: what you had was real, but it was pointing to something better. Don't mistake the signpost for the city.",
    key_questions: JSON.stringify([
      "What is your 'Moses' — the genuine but preparatory thing you might be clinging to instead of pressing on to the greater reality?",
      "Where is your heart hardening through the 'deceitfulness of sin' — so gradually that you haven't noticed?",
      "Do you have a community that encourages you daily — or are you trying to sustain faith in isolation?",
      "The wilderness generation saw miracles and still didn't believe. What have you seen God do that you're currently failing to trust him with?",
      "What does it mean to hear God's voice 'today' — not tomorrow, not when conditions improve, but right now?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Servant and the Son: Why Going Back to Moses Means Going Backward",
        target_audience: "Christians tempted to retreat to familiar but incomplete faith systems",
        primary_theme: "Christ's superiority over every preparatory form of faith"
      },
      {
        angle: "The Deceit of the Drift: How Hearts Harden Without Noticing",
        target_audience: "Lukewarm believers who don't realize they've drifted",
        primary_theme: "Sin's gradual, deceitful hardening of the human heart"
      },
      {
        angle: "Today: The Most Urgent Word in the Bible",
        target_audience: "Procrastinators in faith and life",
        primary_theme: "Immediacy of response as the essence of faithful living"
      },
      {
        angle: "Daily Encouragement: Why You Cannot Stay Faithful Alone",
        target_audience: "Individualistic believers resistant to community accountability",
        primary_theme: "Perseverance as a communal, not individual, achievement"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Hebrews typology, the Moses-Christ comparison, and the wilderness generation as a paradigm of unbelief.'
  },

  // HEB 6:1-20 — Warning Against Falling Away
  {
    id: 'heb-warning-against-falling-away',
    title: "Warning Against Falling Away: The Impossibility of Renewal",
    book_id: 'HEB',
    chapter_start: 6,
    verse_start: 1,
    chapter_end: 6,
    verse_end: 20,
    summary:
      "Hebrews 6 contains the most terrifying paragraph in the New Testament. 'It is impossible for those who have once been enlightened, who have tasted the heavenly gift, who have shared in the Holy Spirit, who have tasted the goodness of the word of God and the powers of the coming age and who have fallen away, to be brought back to repentance. To their loss they are crucifying the Son of God all over again and subjecting him to public disgrace.' The description of what these people experienced is not vague — they were enlightened, they tasted the gift, they shared in the Spirit. This is not about people who never believed. It is about people who did.\n\nThe agricultural metaphor that follows makes the logic visceral. Land that drinks the rain and produces a crop receives blessing. Land that drinks the same rain and produces thorns is in danger of being cursed and burned. Same rain. Different response. The rain is not the variable. The soil is.\n\nBut the passage doesn't end in despair. The author pivots: 'Even though we speak like this, dear friends, we are convinced of better things in your case — the things that have to do with salvation.' The warning is genuine, but so is the confidence. And the chapter closes with one of the most anchoring images in Scripture: hope as 'an anchor for the soul, firm and secure,' entering behind the curtain where Jesus has gone as forerunner on our behalf. The storm is real. But the anchor holds.",
    significance:
      "Hebrews 6:4-6 has generated more theological debate than almost any passage in the New Testament. Calvinists argue the passage describes people who appeared to believe but never truly did. Arminians argue it warns of genuine apostasy from genuine faith. The author may not be settling a systematic theology debate at all — he may be making a pastoral point: the trajectory you are on has a destination, and if you persist in moving away from Christ, there may come a point from which no return is possible. The warning is meant to prevent the outcome, not to describe an inevitable fate.\n\nThe anchor metaphor in verses 19-20 provides the counterbalance. The same chapter that contains the New Testament's most terrifying warning also contains one of its most comforting images. The anchor is not the believer's grip on God but God's oath anchored in the holy of holies where Christ has already entered. Security comes not from the strength of the chain but from the weight of the anchor.",
    relational_note:
      "The author's pastoral care is evident in the structure of the passage: warning (vv. 4-8), reassurance (vv. 9-12), and hope (vv. 13-20). He is not trying to terrorize his audience into obedience. He is trying to wake them up before they drift past the point of return. The phrase 'even though we speak like this, dear friends' reveals a preacher who knows the warning was severe and immediately moves to comfort the congregation. The goal is not fear. It is vigilance.\n\nThe call to 'show this same diligence to the very end' and to 'imitate those who through faith and patience inherit what has been promised' points the audience toward models of perseverance. The author knows that abstract theology is not enough to sustain a community under pressure. They need examples — people who made it through. Abraham is named as the paradigmatic example: he waited patiently and received what was promised.",
    conceptual_note:
      "The 'impossibility' language has three main interpretations. First, some read it as describing a hypothetical scenario that will never actually occur for genuine believers (a warning that functions as a deterrent). Second, some read it as describing a real possibility that genuine believers can fall away permanently. Third, some read it as describing the impossibility of a second repentance for those who publicly renounce Christ under persecution — which, in the ancient world, involved offering incense to Caesar and formally denying Jesus. The third reading fits the historical context well: public apostasy under persecution was a specific, concrete act with specific, concrete consequences.\n\nThe oath of God to Abraham (vv. 13-18) introduces a theological principle: when God makes a promise, he swears by himself, since there is no one greater to swear by. The anchor of hope is not anchored in the believer's faithfulness but in God's oath. The entire passage moves from human fragility to divine certainty.",
    climate_note:
      "The original audience was likely facing pressure to renounce Christ — whether through formal apostasy before Roman authorities or through a quiet return to the synagogue. In either case, the act of turning away was public and consequential. The author's warning about the 'impossibility of renewal' may reflect the early church's practice of not allowing a second repentance for those who denied Christ under persecution — a discipline attested in the Shepherd of Hermas and debated for centuries. The pastoral urgency of the passage makes sense in a context where apostasy was not a theoretical danger but a daily temptation with immediate social benefits.",
    modern_parallel:
      "The terror of Hebrews 6:4-6 has kept sensitive Christians awake at night for twenty centuries. 'Have I committed the unpardonable sin? Have I fallen too far? Is it too late for me?' The irony is that anyone asking those questions almost certainly has not fallen away in the way the author describes. The person who has genuinely and finally hardened their heart does not lie awake worrying about it. They have moved on. The very anxiety about the passage is evidence that the Spirit is still active.\n\nThe anchor metaphor speaks to anyone who feels like their faith is hanging by a thread. The good news of Hebrews 6 is that the anchor is not your grip. It is God's oath. The anchor holds not because you are strong but because it is lodged behind the curtain in the presence of God himself, where Christ has already gone. Your faith may feel like a fraying rope. But the other end is attached to something immovable.\n\nThe 'same rain, different soil' image is also psychologically acute. Two people can sit in the same sermon, read the same Bible, participate in the same community — and one produces fruit while the other produces thorns. The rain is the same. The variable is the condition of the soil. This is not a call to manufacture better soil by willpower. It is a call to ask God to break up the hardened ground before it is too late.",
    key_questions: JSON.stringify([
      "Does the warning in Hebrews 6 terrify you or leave you indifferent? What does your reaction reveal about your spiritual condition?",
      "Where is the 'same rain, different soil' dynamic playing out in your life — where are you receiving God's grace without producing fruit?",
      "The anchor of hope is lodged in God's oath, not your performance. How does that change the way you handle spiritual doubt?",
      "Is there someone in your community who is drifting toward the kind of apostasy the author warns about? What would it look like to intervene before it's too late?",
      "Abraham 'waited patiently and received what was promised.' What promise are you waiting for, and what does patient faithfulness look like in the meantime?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Most Terrifying Paragraph: What Hebrews 6 Does and Doesn't Say",
        target_audience: "Christians tormented by fear of having fallen away",
        primary_theme: "Distinguishing pastoral warning from theological despair"
      },
      {
        angle: "The Anchor Holds: Finding Security in God's Oath, Not Your Performance",
        target_audience: "Anxious believers whose assurance depends on feelings",
        primary_theme: "Hope anchored in divine faithfulness, not human consistency"
      },
      {
        angle: "Same Rain, Different Soil: Why Some People Grow and Others Don't",
        target_audience: "Long-time churchgoers who have stopped growing",
        primary_theme: "The condition of the heart as the variable in spiritual formation"
      },
      {
        angle: "Before It's Too Late: The Urgency of Hebrews' Warning Passages",
        target_audience: "Communities where spiritual drift is normalized",
        primary_theme: "Vigilance as a communal responsibility"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Hebrews warning passages, early church penitential discipline, and the anchor metaphor in ancient rhetoric.'
  },

  // ========================================================================
  //  J A M E S
  // ========================================================================

  // JAS 4:1-17 — Friendship With the World
  {
    id: 'jas-friendship-with-the-world',
    title: "Friendship With the World: Desire, Conflict, and Humility",
    book_id: 'JAS',
    chapter_start: 4,
    verse_start: 1,
    chapter_end: 4,
    verse_end: 17,
    summary:
      "James gets to the root. 'What causes fights and quarrels among you? Don't they come from your desires that battle within you?' Every external conflict, James argues, has an internal origin. You want something. You can't get it. So you quarrel. You covet. You fight. You even pray — but you don't receive, because you ask with wrong motives, intending to spend what you get on your own pleasures. The problem is not that God is stingy. The problem is that the request is self-serving.\n\nThen comes the sentence that arrests: 'You adulterous people, don't you know that friendship with the world means enmity against God?' James is not talking about engagement with culture or enjoyment of creation. He is talking about adopting the world's value system — its understanding of success, its definition of power, its approach to getting what you want. To align yourself with that system is to make yourself God's enemy. There is no neutral ground.\n\nThe chapter closes with a call to humility that is as direct as a slap: 'God opposes the proud but shows grace to the humble. Submit yourselves to God. Resist the devil, and he will flee from you. Come near to God and he will come near to you.' The sequence matters. Submit first. Then resist. Then draw near. And the result is not earned. It is reciprocated. God meets the one who approaches. The chapter ends with a practical warning: 'If anyone, then, knows the good they ought to do and doesn't do it, it is sin for them.' Sin is not only doing wrong. It is knowing right and failing to act.",
    significance:
      "James 4 provides the New Testament's most incisive analysis of the internal roots of conflict. While Paul tends to locate human problems in the flesh/spirit dynamic, James locates them in misdirected desire. You fight because you want. You don't have because you don't ask — or you ask wrongly. The diagnosis is psychological as well as spiritual: the human heart is a war zone, and external conflicts are merely the surface expression of internal chaos.\n\nThe 'friendship with the world' concept has been enormously influential in Christian ethics and has been both used well (as a call to counter-cultural faithfulness) and used poorly (as a justification for cultural withdrawal and legalism). James's point is not that the world is entirely bad but that its operating system — acquisition, self-promotion, domination — is incompatible with the kingdom of God.",
    relational_note:
      "James addresses his audience as 'adulterous people' — language drawn from the Old Testament prophets who described Israel's unfaithfulness as spiritual adultery. This is family language. James is not condemning outsiders. He is rebuking insiders who are cheating on God by flirting with the world's values. The intensity of the language reveals the depth of the relationship: you only call someone adulterous if you believe they belong to someone else. James's readers belong to God, which is precisely why their worldliness is so offensive.\n\nThe promise 'come near to God and he will come near to you' is one of the most relationally warm statements in James. Despite the fierce rebuke, the path back is not complicated. It is not a twelve-step program. It is proximity. Move toward God. He will move toward you.",
    conceptual_note:
      "The concept of sin as omission — 'anyone who knows the good they ought to do and doesn't do it, it is sin' — is one of James's most distinctive contributions to Christian ethics. Most moral frameworks focus on sins of commission (things you shouldn't have done). James adds the category of sins of omission (things you should have done and didn't). This dramatically expands the scope of moral responsibility. It is not enough to avoid doing wrong. You must do the right that you know to do.\n\nThe 'God opposes the proud' quotation from Proverbs 3:34 is a principle James considers foundational. God's posture toward humanity is determined not by their achievements but by their posture. Humility receives grace. Pride receives resistance. The most important spiritual disposition is not competence but lowliness.",
    climate_note:
      "James writes to scattered Jewish Christians who are facing economic inequality, social conflict, and the temptation to pursue wealth and status by the methods of the surrounding culture. The 'fights and quarrels' are likely real disputes within the community — possibly over economic resources, social standing, or leadership positions. The merchants who say 'Today or tomorrow we will go to this or that city, carry on business, and make money' (4:13) represent the entrepreneurial class that was using worldly business strategies without reference to God's will. James's rebuke is not anti-business. It is anti-autonomy — the assumption that you can plan your life without consulting the one who owns your next breath.",
    modern_parallel:
      "James's diagnosis of conflict — 'you want something and don't get it' — is the most psychologically honest explanation for most arguments in most relationships. Strip away the presenting issue, and beneath almost every fight is an unmet desire: to be respected, to be right, to be comfortable, to be in control. Couples who learn to identify the desire beneath the argument are doing James 4 therapy.\n\nThe 'friendship with the world' warning is uncomfortable for anyone embedded in a culture that rewards ambition, self-promotion, and strategic relationship-building. James is not saying these things are always wrong. He is saying that when the world's value system becomes your operating system — when you pursue success on the world's terms, using the world's methods, for the world's rewards — you have made yourself God's enemy. The question is not whether you live in the world. It is whether you run on its software.\n\nThe 'come near to God and he will come near to you' promise is disarmingly simple in a culture that wants spiritual complexity. We want a program, a conference, a book, a podcast series. James says: move toward God. He will close the distance. The hardest part is not the method. It is the movement.",
    key_questions: JSON.stringify([
      "What desire is beneath your most recent conflict — the real want that drove the fight, not just the presenting issue?",
      "James says friendship with the world is enmity with God. Where are you running on the world's operating system — its definitions of success, power, and worth?",
      "Is there 'good you ought to do' that you know about and are failing to act on? What is it, and what is stopping you?",
      "What would it look like to 'come near to God' this week — not as a program but as a simple act of proximity?",
      "James says 'you do not have because you do not ask, or you ask with wrong motives.' How honest are you about your motives in prayer?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Desire Beneath the Fight: Why James 4 Is Better Than Couples Therapy",
        target_audience: "People in conflict — relational, vocational, or ecclesial",
        primary_theme: "Misdirected desire as the root of all human conflict"
      },
      {
        angle: "Running on the World's Software: What Friendship With the World Actually Means",
        target_audience: "Ambitious Christians navigating career and culture",
        primary_theme: "The incompatibility of worldly operating systems with the kingdom of God"
      },
      {
        angle: "Come Near: The Simplest and Hardest Invitation in Scripture",
        target_audience: "People who feel distant from God and don't know how to return",
        primary_theme: "Divine responsiveness to human approach"
      },
      {
        angle: "The Sin of Knowing and Not Doing: James's Ethics of Omission",
        target_audience: "Morally cautious people who avoid wrong but neglect good",
        primary_theme: "Responsibility for the good left undone"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on the Epistle of James, wisdom literature connections, and early Jewish-Christian ethics.'
  },

  // ========================================================================
  //  R E V E L A T I O N
  // ========================================================================

  // REV 10:1-11 — Angel With the Little Scroll
  {
    id: 'rev-angel-with-little-scroll',
    title: "The Angel With the Little Scroll",
    book_id: 'REV',
    chapter_start: 10,
    verse_start: 1,
    chapter_end: 10,
    verse_end: 11,
    summary:
      "Between the sixth and seventh trumpets, the vision pauses. A mighty angel descends from heaven, wrapped in a cloud, with a rainbow above his head, his face like the sun, and his legs like pillars of fire. He plants one foot on the sea and one foot on the land — a cosmic posture claiming dominion over the entire created order. In his hand is a little scroll, open.\n\nThen the angel shouts with a voice like a lion's roar, and seven thunders speak. John is about to write down what they said, but a voice from heaven stops him: 'Seal up what the seven thunders have said. Do not write it down.' In a book that reveals, something is hidden. In an apocalypse designed to unveil, there is a mystery that remains sealed. The reader is reminded that even in God's revelation, there are things God chooses not to disclose.\n\nThe angel then swears by the one who lives forever that 'there will be no more delay.' When the seventh trumpet sounds, 'the mystery of God will be accomplished, just as he announced to his servants the prophets.' And John is told to take the scroll and eat it. It will taste as sweet as honey in his mouth but turn his stomach sour. He eats it, and it is exactly as promised: sweet and bitter, delicious and nauseating. Then the commission: 'You must prophesy again about many peoples, nations, languages, and kings.'",
    significance:
      "Revelation 10 is a literary interlude with profound theological significance. The sealed thunders remind the reader that apocalyptic literature does not make everything plain. There are limits to revelation, mysteries God retains. In a book that seems to say everything, the sealed thunders are a reminder that human beings are not entitled to total disclosure.\n\nThe eating of the scroll draws directly from Ezekiel 2:8-3:3, where the prophet is told to eat a scroll of lamentation and woe, and it tastes as sweet as honey. The message of God is both delightful and devastating — sweet because it is truth, bitter because of what it reveals about human suffering and divine judgment. The dual nature of the scroll captures the experience of every genuine prophet: the word of God is a joy to receive and a burden to deliver.",
    relational_note:
      "The mighty angel's cosmic posture — one foot on the sea, one foot on the land — establishes God's sovereign claim over all creation. This is not merely a visual spectacle. It is a pastoral reassurance: the God of John's vision is not a regional deity confined to a temple or a city. He claims everything. For a community being told that Caesar owns the world, this vision says otherwise.\n\nJohn's commission to 'prophesy again about many peoples, nations, languages, and kings' reestablishes his vocation after the pause. The interlude is not an interruption. It is a recommissioning. John is being told: what you have seen so far is not the whole story. There is more to say, and you are the one who must say it. The author-audience dynamic is one of a prophet being prepared for the next stage of his message.",
    conceptual_note:
      "The sealed thunders raise a fundamental question about the limits of revelation. If God reveals some things and conceals others, then the proper human posture toward divine mystery is humility, not frustration. The person who demands that God explain everything before they will trust him has misunderstood the nature of the relationship. Revelation, even at its most lavish, is selective. There are chambers in the mind of God that remain locked.\n\nThe sweet-and-bitter scroll is a metaphor for the prophetic vocation itself. God's word is not one-dimensionally pleasant. It contains promises and warnings, comfort and judgment, hope and horror. Anyone who preaches only the sweet parts has not eaten the whole scroll. Anyone who preaches only the bitter parts has swallowed the message wrong. The authentic prophetic voice holds both flavors simultaneously — which is why genuine preaching is so difficult and so rare.",
    climate_note:
      "The seven churches of Asia Minor lived under Domitian's intensifying demands for emperor worship. The 'no more delay' declaration would have been urgently received by communities wondering how long they would have to endure. The angel's sworn oath functions as a divine guarantee: the present suffering has an expiration date. The mystery of God will be accomplished. The empire that seems eternal is temporal. For a community enduring what felt like endless persecution, the most important word in the chapter may be 'no more delay.'",
    modern_parallel:
      "In an age that demands transparency, explanations, and total information access, the sealed thunders are a radical statement about the limits of human knowledge. There are things God knows that you will not be told. Not because God is withholding out of cruelty, but because some knowledge is not for you — not yet, and maybe not ever in this life. The sealed thunders are the biblical equivalent of 'I'll explain later' from a God who has earned the right to be trusted with what he keeps silent about.\n\nThe sweet-and-bitter scroll is the experience of every pastor, counselor, or parent who has had to deliver truth that is both beautiful and painful. The diagnosis is accurate — that's the sweet part. The prognosis is hard — that's the bitter. The Bible is not a feel-good book. It is a true book, and truth is not always comfortable. Anyone who has read the Bible honestly knows both flavors: the sweetness of 'I have loved you with an everlasting love' and the bitterness of 'the wages of sin is death.'\n\nThe 'no more delay' declaration speaks to everyone who has prayed 'how long?' — how long until justice, how long until healing, how long until this ends? The angel swears: the mystery of God will be accomplished. Not abandoned. Not forgotten. Accomplished. The timing is not yours to know. But the outcome is guaranteed.",
    key_questions: JSON.stringify([
      "What sealed thunders in your life — things God has not explained — are you struggling to accept?",
      "Have you eaten the whole scroll, or only the sweet parts? Where are you avoiding the bitter truths of Scripture?",
      "The angel declares 'no more delay.' What are you waiting for God to accomplish, and how do you sustain faith in the meantime?",
      "John is recommissioned to 'prophesy again.' Where has God paused your calling, and what would it look like to receive a fresh commission?",
      "The angel claims dominion over land and sea. What areas of your life have you not yet surrendered to God's sovereign claim?"
    ]),
    preaching_angles: JSON.stringify([
      {
        angle: "The Sealed Thunders: What God Chooses Not to Reveal — and Why That's Okay",
        target_audience: "People demanding answers from God before they will trust",
        primary_theme: "Humility before divine mystery and the limits of revelation"
      },
      {
        angle: "Sweet and Bitter: Why the Word of God Is Not a Comfort-Only Message",
        target_audience: "Congregations accustomed to feel-good preaching",
        primary_theme: "The dual nature of prophetic truth — delightful and devastating"
      },
      {
        angle: "No More Delay: The Oath That Guarantees the Ending",
        target_audience: "Suffering believers wondering how long God will wait",
        primary_theme: "Divine commitment to accomplishing the mystery on schedule"
      },
      {
        angle: "One Foot on the Sea, One on the Land: The God Who Claims Everything",
        target_audience: "Christians in cultures that resist God's total sovereignty",
        primary_theme: "God's dominion over every sphere of creation and life"
      }
    ]),
    source_tier: 'ai_assisted',
    source_notes:
      'Generated via AI-assisted gap-fill pipeline. Grounded in scholarship on Revelation\'s literary structure, Ezekiel parallels, and the prophetic commissioning motif.'
  },

];

// ---------------------------------------------------------------------------
// Insert logic
// ---------------------------------------------------------------------------

console.log('=== Inserting missing narrative_units for Epistles + Revelation gaps ===\n');

// Check for existing IDs
const existingIds = new Set();
const checkStmt = db.prepare('SELECT id FROM narrative_units WHERE id = ?');
for (const n of narratives) {
  const row = checkStmt.get(n.id);
  if (row) existingIds.add(n.id);
}

const toInsert = narratives.filter(n => !existingIds.has(n.id));
console.log(`${narratives.length} total units, ${existingIds.size} already exist, ${toInsert.length} to insert.\n`);

if (existingIds.size > 0) {
  for (const id of existingIds) {
    console.log(`  SKIP ${id} — already exists`);
  }
  console.log('');
}

if (toInsert.length === 0) {
  console.log('Nothing to insert. Done.');
  db.close();
  process.exit(0);
}

// Prepare insert statement
const insertStmt = db.prepare(`
  INSERT INTO narrative_units (
    id, title, book_id, chapter_start, verse_start, chapter_end, verse_end,
    summary, significance, relational_note, conceptual_note, climate_note,
    modern_parallel, key_questions, preaching_angles,
    source_tier, source_notes
  ) VALUES (
    @id, @title, @book_id, @chapter_start, @verse_start, @chapter_end, @verse_end,
    @summary, @significance, @relational_note, @conceptual_note, @climate_note,
    @modern_parallel, @key_questions, @preaching_angles,
    @source_tier, @source_notes
  )
`);

const batchInsert = db.transaction((units) => {
  let count = 0;
  for (const u of units) {
    insertStmt.run(u);
    console.log(`  + ${u.book_id} ${u.chapter_start}${u.chapter_end !== u.chapter_start ? '-' + u.chapter_end : ''}  "${u.title}"`);
    count++;
  }
  return count;
});

const inserted = batchInsert(toInsert);
console.log(`\nInserted ${inserted} narrative_units.\n`);

// ---------------------------------------------------------------------------
// Verify
// ---------------------------------------------------------------------------

const total = db.prepare('SELECT COUNT(*) as c FROM narrative_units').get();
console.log(`Total narrative_units now in database: ${total.c}`);

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM narrative_units
  WHERE book_id IN ('ROM','1CO','2CO','EPH','COL','2TH','1TI','2TI','HEB','JAS','REV')
  GROUP BY book_id ORDER BY MIN(rowid)
`).all();

console.log('\nNarrative units per book (target books):');
for (const row of byBook) {
  console.log(`  ${row.book_id}: ${row.c}`);
}

db.close();
console.log('\nDone.');
