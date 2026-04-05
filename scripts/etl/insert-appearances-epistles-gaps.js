const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ═══════════════════════════════════════════════════════════════
  // ROMANS (Paul to Rome)
  // ═══════════════════════════════════════════════════════════════

  // ── ROM 2: God's Righteous Judgment ───────────────────────────
  ['paul','ROM',2,1,29,'protagonist','pastoral-confrontation','dismantle moral superiority among those who judge others while doing the same things','the credibility of the gospel depends on consistent living','Paul turns from the pagan world to the moralist and says you who judge do the very same things. He dismantles the idea that knowledge of the law equals obedience to it. Real circumcision is of the heart','The pastor who looks at his own congregation and says you share articles about other people\'s sins while ignoring your own','scholarship'],

  // ── ROM 10: Faith Comes by Hearing ────────────────────────────
  ['paul','ROM',10,1,21,'protagonist','anguished-urgency','explain that salvation is available to everyone who calls on the Lord and that Israel has heard but not responded','the eternal destiny of his own people','Paul says the word is near you, in your mouth and in your heart. Everyone who calls on the name of the Lord will be saved. But how will they call on one they have not heard? How will they hear without a preacher?','The missionary who weeps because the message is simple and available but his own family refuses to listen','scholarship'],

  // ── ROM 11: The Olive Tree ────────────────────────────────────
  ['paul','ROM',11,1,36,'protagonist','awe-filled-hope','show that God has not rejected Israel and that Gentile inclusion will eventually provoke Israel to faith','the unity of God\'s redemptive plan across history','Paul uses the olive tree metaphor: Gentiles are wild branches grafted in, but the natural branches can be grafted back. He ends with a doxology: Oh the depth of the riches of the wisdom and knowledge of God','The historian who traces a family tree across centuries and discovers every apparent dead end reconnects','scholarship'],

  // ── ROM 15: The Priestly Duty of Paul ─────────────────────────
  ['paul','ROM',15,1,33,'protagonist','grateful-ambition','outline his missionary strategy and ask for the Roman church\'s partnership','his planned mission to Spain depends on Roman support','Paul describes himself as a priestly servant of Christ Jesus to the Gentiles. He has preached from Jerusalem to Illyricum and now aims for Spain with Rome as his base. He asks them to strive together with him in prayer','The nonprofit director writing a year-end letter explaining the vision, the track record, and the funding gap','scholarship'],
  ['timothy','ROM',15,30,33,'witness','supportive','be named among those who stand with Paul\'s mission','the relational network that sustains apostolic ministry','Timothy is part of the team Paul references as he asks Rome to pray for his safety in Jerusalem and his journey westward','The deputy director whose name appears in the annual report as evidence the organization is not a one-man show','inferred'],

  // ── ROM 16: Greetings and Commendation ────────────────────────
  ['paul','ROM',16,1,27,'protagonist','warm-affection','commend Phoebe, greet coworkers, and warn against divisive people','the relational infrastructure of the early church','Paul greets 26 people by name, more than any other letter. He calls Phoebe a deacon and patron, Junia outstanding among the apostles, Priscilla and Aquila his coworkers who risked their necks for him','The CEO\'s farewell email that names every person who made the company what it is','scholarship'],
  ['phoebe','ROM',16,1,2,'deuteragonist','trusted-responsibility','carry the letter to Rome and represent Paul\'s teaching','the most important letter in Christian history depends on her','Paul commends Phoebe as a deacon of Cenchreae and a patron of many, including himself. She is almost certainly the one who carries and reads Romans to the church','The executive courier trusted to hand-deliver the merger documents and answer every question about them','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 1 CORINTHIANS (Paul to Corinth)
  // ═══════════════════════════════════════════════════════════════

  // ── 1CO 2: Wisdom from the Spirit ─────────────────────────────
  ['paul','1CO',2,1,16,'protagonist','humble-confidence','contrast worldly wisdom with Spirit-revealed wisdom','the Corinthians are choosing leaders based on rhetorical skill instead of spiritual depth','Paul says he came to them in weakness and fear and much trembling, not with eloquent wisdom, so their faith would rest on God\'s power. The Spirit searches the deep things of God','The professor who deliberately avoids jargon so students will grasp the substance rather than be impressed by the vocabulary','scholarship'],

  // ── 1CO 3: Spiritual Immaturity ───────────────────────────────
  ['paul','1CO',3,1,23,'protagonist','frustrated-tenderness','rebuke the Corinthians for their factionalism and remind them they are God\'s building','the church is tearing itself apart over personality cults','Paul says I could not address you as spiritual but as infants. One plants, another waters, but God gives the growth. Each builder\'s work will be tested by fire','The founder who returns to find the team fighting over whose department matters most and says the company is what matters','scholarship'],

  // ── 1CO 4: Fools for Christ ───────────────────────────────────
  ['paul','1CO',4,1,21,'protagonist','biting-irony','contrast apostolic suffering with Corinthian arrogance','the church needs to see that real authority comes through sacrifice not status','Paul uses devastating sarcasm: Already you have all you want, already you have become rich, you have begun to reign. We apostles are like men sentenced to death, a spectacle to the world','The combat veteran addressing a room of armchair generals who have never been in the field','scholarship'],
  ['timothy','1CO',4,17,17,'deuteragonist','faithful-representative','be sent to Corinth to remind them of Paul\'s ways','the church needs a trusted mediator before Paul arrives','Paul says he is sending Timothy, his beloved and faithful child in the Lord, to remind them of his ways. Timothy is the advance team for a difficult visit','The trusted lieutenant sent ahead to the branch office to prepare them for the CEO\'s arrival','scholarship'],

  // ── 1CO 6: Lawsuits and the Body ──────────────────────────────
  ['paul','1CO',6,1,20,'protagonist','indignant-pastoral-care','stop believers from suing each other in pagan courts and from treating their bodies as disposable','the church\'s witness before the watching world','Paul is stunned: Is there no one wise enough among you to settle disputes? Your body is a temple of the Holy Spirit. You were bought with a price. Glorify God with your body','The pastor who finds out church members are suing each other and sleeping around and addresses both in the same sermon','scholarship'],

  // ── 1CO 9: Paul's Rights as an Apostle ────────────────────────
  ['paul','1CO',9,1,27,'protagonist','disciplined-self-denial','defend his right to financial support while explaining why he waives it','his credibility is questioned because he works for free','Paul says he has the right to food, drink, and a wife, but he forgoes everything so no one can accuse him of preaching for money. He disciplines his body like an athlete so he himself will not be disqualified','The pro bono lawyer who could charge a fortune but works free so no one can question his motives','scholarship'],

  // ── 1CO 10: Warnings from Israel's History ────────────────────
  ['paul','1CO',10,1,33,'protagonist','urgent-warning','use Israel\'s wilderness failures as cautionary examples for overconfident Corinthians','believers who think they are immune to temptation are the most vulnerable','Paul says these things happened as examples for us. If you think you are standing firm, be careful that you don\'t fall. God is faithful and will provide a way of escape with every temptation','The AA sponsor who tells his sponsee about every relapse he has ever seen in people who thought they were cured','scholarship'],
  ['moses','1CO',10,1,5,'referenced figure','cautionary-example','serve as the historical leader whose generation failed despite miraculous provision','Israel\'s wilderness generation is the mirror for Corinthian overconfidence','Paul references the cloud, the sea, the manna, and the rock, all under Moses\'s leadership, yet most of that generation was struck down in the wilderness. Privilege does not guarantee perseverance','The founding team that had every advantage and still failed because they took success for granted','scholarship'],

  // ── 1CO 14: Order in Worship ──────────────────────────────────
  ['paul','1CO',14,1,40,'protagonist','pastoral-firmness','regulate the chaotic worship at Corinth so tongues and prophecy build the church rather than inflate egos','visitors are walking into services and thinking the church is insane','Paul says if the whole church speaks in tongues and outsiders come in, will they not say you are out of your minds? Everything should be done decently and in order','The worship director who has to tell the band that the 20-minute guitar solo is not helping anyone connect with God','scholarship'],

  // ── 1CO 16: Final Instructions ────────────────────────────────
  ['paul','1CO',16,1,24,'protagonist','warm-practical','organize the collection for Jerusalem and coordinate travel plans','the financial gift proves the Gentile churches care about Jewish believers','Paul gives logistical instructions: set aside money on the first day of every week, send approved representatives, and he will come after passing through Macedonia. Ministry runs on planning','The campaign manager who ends the inspiring speech with here is the budget spreadsheet and the timeline','scholarship'],
  ['timothy','1CO',16,10,11,'deuteragonist','anxious-faithfulness','arrive in Corinth as Paul\'s representative and not be despised for his youth','Timothy must navigate a hostile church without Paul\'s authority','Paul says when Timothy comes, see that he has nothing to fear among you, for he is doing the work of the Lord just as I am. Let no one despise him. Send him on his way in peace','The young associate sent to handle the difficult client while the senior partner watches from a distance','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 2 CORINTHIANS (Paul to Corinth, Second Letter)
  // ═══════════════════════════════════════════════════════════════

  // ── 2CO 2: Forgiveness for the Offender ───────────────────────
  ['paul','2CO',2,1,17,'protagonist','relieved-compassion','urge the church to forgive the person they disciplined so he is not overwhelmed by excessive sorrow','discipline that never restores becomes cruelty','Paul says the punishment by the majority is sufficient. Forgive and comfort him, or he may be overwhelmed by excessive sorrow. Reaffirm your love for him, so that Satan does not outwit us','The HR director who says the employee served his suspension, now welcome him back before we lose him entirely','scholarship'],

  // ── 2CO 6: The Ministry Commended ─────────────────────────────
  ['paul','2CO',6,1,18,'protagonist','raw-vulnerability','catalogue his sufferings as credentials and plead with the Corinthians to open their hearts','his relationship with the church he founded is fractured','Paul lists beatings, imprisonments, sleepless nights, genuine love, and the Holy Spirit as his resume. Then he says: We have spoken freely to you, our heart is wide open. You are not restricted by us but by your own affections','The parent who says I have held nothing back from you, the distance between us is not coming from my side','scholarship'],

  // ── 2CO 7: Godly Grief ────────────────────────────────────────
  ['paul','2CO',7,1,16,'protagonist','overflowing-joy','celebrate that his painful letter produced repentance rather than resentment','the relationship with Corinth has turned a corner','Paul says godly grief produces repentance that leads to salvation without regret, but worldly grief produces death. Titus has reported their longing, mourning, and zeal, and Paul rejoices','The mentor who sent a brutally honest email and then could not sleep until the reply came back saying you were right','scholarship'],
  ['titus','2CO',7,5,16,'deuteragonist','encouraged-relief','report to Paul that the Corinthians have responded well to the severe letter','the success of the diplomatic mission determines the church\'s future','Titus arrives with good news: the Corinthians were grieved but it led to repentance. His spirit has been refreshed by them. Paul\'s boast about them to Titus has proved true','The mediator who returns from negotiations and says they agreed to every term, they actually want this to work','scholarship'],

  // ── 2CO 8: The Collection for Jerusalem ───────────────────────
  ['paul','2CO',8,1,24,'protagonist','tactful-motivation','motivate the Corinthians to complete their financial pledge for the Jerusalem church','the Macedonians have given out of poverty and now the wealthy Corinthians are behind on their promise','Paul uses the Macedonians\' extreme generosity as a model and says he is not commanding but testing the genuineness of their love. He reminds them that Christ became poor so they could become rich','The fundraiser who shows the video of the small donors who gave sacrificially to shame the major donors into completing their pledges','scholarship'],
  ['titus','2CO',8,16,24,'deuteragonist','eager-initiative','lead the delegation that will administer the collection','financial accountability requires trusted handlers','Paul says Titus not only accepted the appeal but is coming to Corinth of his own accord with enthusiasm. He is Paul\'s partner and co-worker among them','The CFO who volunteers to personally oversee the audit because the organization\'s credibility depends on transparent accounting','scholarship'],

  // ── 2CO 9: Cheerful Giving ────────────────────────────────────
  ['paul','2CO',9,1,15,'protagonist','encouraging-confidence','assure the Corinthians that generous giving produces abundant return and glorifies God','the collection must be ready when Paul arrives so there is no embarrassment','Paul says whoever sows sparingly reaps sparingly. God loves a cheerful giver. He closes with Thanks be to God for his indescribable gift','The development director who closes the capital campaign with you are not losing money, you are planting seeds that will feed people for decades','scholarship'],

  // ── 2CO 10: Paul Defends His Authority ────────────────────────
  ['paul','2CO',10,1,18,'protagonist','controlled-intensity','confront opponents who say he is bold in letters but weak in person','rival teachers are undermining his authority by mocking his physical presence','Paul says I who am humble when face to face but bold when away. He warns: do not force me to be as bold in person as they expect. We demolish arguments and every pretension that sets itself against the knowledge of God','The CEO who has been patient on Zoom calls and now books a flight to the satellite office where the rebellion is brewing','scholarship'],

  // ── 2CO 11: Paul's Boasting ───────────────────────────────────
  ['paul','2CO',11,1,33,'protagonist','reluctant-ferocity','expose the false apostles by contrasting their comfort with his suffering catalogue','the Corinthians are being seduced by smooth-talking charlatans','Paul lists five floggings of 39 lashes, three beatings with rods, one stoning, three shipwrecks, a night and day in the open sea. He calls his rivals super-apostles with dripping sarcasm. His resume is written in scars','The veteran surgeon who listens to the new hire brag about his fellowship and then quietly rolls up his sleeves to show thirty years of operating-room burns','scholarship'],

  // ── 2CO 13: Final Warnings ────────────────────────────────────
  ['paul','2CO',13,1,14,'protagonist','stern-love','warn that his third visit will not be gentle if they have not repented','this is the last chance before confrontation','Paul says when I come I will not spare those who sinned earlier. Examine yourselves to see whether you are in the faith. He ends with the trinitarian blessing: the grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit','The doctor who says at the follow-up if you haven\'t changed your diet by next visit, we are scheduling surgery','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // GALATIANS (Paul to Galatia)
  // ═══════════════════════════════════════════════════════════════

  // ── GAL 4: Children of the Free Woman ─────────────────────────
  ['paul','GAL',4,1,31,'protagonist','desperate-affection','convince the Galatians to stop reverting to law-keeping by appealing to their relationship with him and the allegory of Sarah and Hagar','the entire gospel of grace is at stake','Paul says my dear children, for whom I am again in the pains of childbirth until Christ is formed in you. He uses the Sarah-Hagar allegory: you are children of the free woman, not the slave. Do not go back','The sponsor who watches his recovering friend reach for the old addiction and says I went through labor to get you here, do not throw it away','scholarship'],
  ['abraham','GAL',4,21,31,'referenced figure','typological-anchor','serve as the father whose two sons illustrate the covenant of promise versus the covenant of law','the theological argument depends on this Old Testament precedent','Paul recasts Abraham\'s family drama: Ishmael born of the slave according to the flesh, Isaac born of the free woman through promise. The Galatians must choose which lineage they belong to','The family historian who explains that the inheritance goes to the children of the legitimate marriage, not the side arrangement','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // EPHESIANS (Paul to Ephesus)
  // ═══════════════════════════════════════════════════════════════

  // ── EPH 3: The Mystery Revealed ───────────────────────────────
  ['paul','EPH',3,1,21,'protagonist','awestruck-gratitude','reveal the mystery that Gentiles are co-heirs with Israel and pray the most expansive prayer in his letters','the cosmic scope of God\'s plan must reshape how the church sees itself','Paul says he is a prisoner for the sake of the Gentiles, then reveals the mystery: through the gospel the Gentiles are heirs together, members together, sharers together. His prayer asks that they grasp the width, length, height, and depth of Christ\'s love','The architect who unveils the master plan and everyone realizes their small renovation is actually part of a city-wide transformation','scholarship'],

  // ── EPH 5: Walk in Love ───────────────────────────────────────
  ['paul','EPH',5,1,33,'protagonist','pastoral-earnestness','call believers to imitate God in love and describe marriage as an icon of Christ and the church','the daily conduct of believers is the visible gospel','Paul says be imitators of God as beloved children and walk in love. He uses marriage as a profound mystery pointing to Christ and the church: husbands love your wives as Christ loved the church and gave himself up for her','The couples\' counselor who says your marriage is not just about you two, it is a living demonstration of something much larger','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // COLOSSIANS (Paul to Colossae)
  // ═══════════════════════════════════════════════════════════════

  // ── COL 4: Final Greetings ────────────────────────────────────
  ['paul','COL',4,1,18,'protagonist','warm-collegial','send greetings, instructions, and commendations for his network of coworkers','the relational web sustains the scattered churches','Paul mentions Tychicus, Onesimus, Aristarchus, Mark, Justus, Epaphras, Luke, and Demas. He says Epaphras is always wrestling in prayer for them. He signs off: Remember my chains','The incarcerated leader who sends letters naming every teammate and reminding the organization he is still directing operations from his cell','scholarship'],
  ['epaphras','COL',4,12,13,'deuteragonist','fervent-intercession','wrestle in prayer for the Colossians\' spiritual maturity','the church he planted is under doctrinal threat and he cannot be there','Paul testifies that Epaphras is always wrestling in prayer for them, that they may stand firm in all the will of God. He has worked hard for them and for those in Laodicea and Hierapolis','The church planter who moved away but still prays for his former congregation every single day like a parent with grown children','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 1 THESSALONIANS (Paul to Thessalonica)
  // ═══════════════════════════════════════════════════════════════

  // ── 1TH 2: Paul's Conduct Among Them ─────────────────────────
  ['paul','1TH',2,1,20,'protagonist','tender-parental','defend the sincerity of his ministry and express the depth of his attachment to the Thessalonians','his opponents claim he was a fraudulent traveling philosopher','Paul says we were gentle among you, like a nursing mother taking care of her own children. We were ready to share not only the gospel but also our own selves, because you had become very dear to us. You are our glory and joy','The teacher at the 10-year reunion who says I would have paid to teach your class, those were the best years of my career','scholarship'],
  ['timothy','1TH',2,17,20,'deuteragonist','reliable-emissary','be sent back to Thessalonica to strengthen the young church','Paul was torn away prematurely and cannot return himself','Paul says we were torn away from you, orphaned in person not in heart, and we tried again and again to come. When he could not, he sent Timothy to establish and exhort them','The parent who cannot visit their child at college so they send the older sibling to check on them','scholarship'],

  // ── 1TH 5: The Day of the Lord ────────────────────────────────
  ['paul','1TH',5,1,28,'protagonist','bracing-encouragement','prepare the church for Christ\'s return with practical instructions for daily faithfulness','the Thessalonians are anxious about timing and need to focus on readiness','Paul says the day of the Lord comes like a thief in the night but you are children of light. Rejoice always, pray without ceasing, give thanks in everything. Do not quench the Spirit. Test everything','The coach who says stop worrying about the playoff bracket and focus on winning tomorrow\'s game','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 2 THESSALONIANS (Paul to Thessalonica)
  // ═══════════════════════════════════════════════════════════════

  // ── 2TH 1: God's Righteous Judgment ───────────────────────────
  ['paul','2TH',1,1,12,'protagonist','protective-affirmation','encourage a persecuted church that God will vindicate them and punish their oppressors','the Thessalonians are suffering and need to know it is not meaningless','Paul thanks God that their faith is growing abundantly and their love for one another is increasing even under persecution. He says God considers it just to repay affliction to those who afflict you and grant relief to you who are afflicted','The lawyer who tells the wrongfully convicted client your suffering is documented and the appeal is certain, justice is coming','scholarship'],
  ['silas','2TH',1,1,1,'witness','co-authorial','co-sign the letter with Paul to Thessalonica','the letter carries more weight with multiple apostolic names','Silas is named alongside Paul and Timothy in the greeting, lending his authority and personal knowledge of the Thessalonian church from its founding','The co-author whose name on the paper signals to reviewers that the research has been independently verified','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 1 TIMOTHY (Paul to Timothy)
  // ═══════════════════════════════════════════════════════════════

  // ── 1TI 4: Train Yourself in Godliness ────────────────────────
  ['paul','1TI',4,1,16,'protagonist','mentoring-urgency','warn Timothy about coming apostasy and command him to model godliness despite his youth','false teachers are already infiltrating and Timothy is the front line','Paul says the Spirit expressly says that in later times some will depart from the faith. He tells Timothy: do not let anyone despise your youth but set an example in speech, conduct, love, faith, and purity','The retiring CEO writing the leadership manual for his 30-year-old successor and saying the board will test you, lead by example','scholarship'],
  ['timothy','1TI',4,1,16,'deuteragonist','eager-but-uncertain','receive instruction on how to lead a church under doctrinal threat','his credibility as a young leader depends on his character not his age','Timothy is told to devote himself to the public reading of Scripture, to exhortation, and to teaching. Do not neglect the gift you have. Practice these things, immerse yourself in them','The young pastor who keeps Paul\'s letter in his desk and rereads it before every board meeting','scholarship'],

  // ── 1TI 5: Widows, Elders, and Practical Church Order ─────────
  ['paul','1TI',5,1,25,'protagonist','administrative-wisdom','give Timothy detailed instructions on caring for widows and disciplining elders','the church needs governance structures that protect the vulnerable and hold leaders accountable','Paul says honor widows who are truly widows. Do not admit a charge against an elder except on the evidence of two or three witnesses. Those who persist in sin, rebuke in the presence of all','The board chair who writes the HR handbook covering benefits for retirees and the process for firing executives','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 2 TIMOTHY (Paul to Timothy)
  // ═══════════════════════════════════════════════════════════════

  // ── 2TI 3: Godlessness in the Last Days ───────────────────────
  ['paul','2TI',3,1,17,'protagonist','grave-tenderness','warn Timothy that difficult times are coming and ground him in Scripture as the antidote','Paul senses his own death approaching and Timothy must carry on alone','Paul describes people who have the appearance of godliness but deny its power. He reminds Timothy: you have known the sacred writings since childhood. All Scripture is breathed out by God and profitable for teaching','The dying professor who tells his best student the institution will go through a dark period but the texts will sustain you if you stay in them','scholarship'],
  ['timothy','2TI',3,10,17,'deuteragonist','sobered-resolve','continue in what he has learned from Paul and from the Scriptures','the next generation of the faith depends on Timothy\'s faithfulness','Paul says you have followed my teaching, my conduct, my aim in life, my faith, my patience, my love, my steadfastness, my persecutions. Continue in what you have learned, knowing from whom you learned it','The apprentice who realizes the master is retiring and everything he was taught is now his responsibility to carry forward','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // TITUS (Paul to Titus)
  // ═══════════════════════════════════════════════════════════════

  // ── TIT 3: Doing Good Works ───────────────────────────────────
  ['paul','TIT',3,1,15,'protagonist','grounded-generosity','instruct Titus to remind believers to be subject to rulers, gentle, and devoted to good works','the Cretan church needs practical holiness not just correct doctrine','Paul says we ourselves were once foolish and enslaved, but when the kindness and love of God appeared he saved us, not because of works done by us but because of his mercy. Avoid foolish controversies, they are unprofitable','The community organizer who says stop arguing about bylaws and start serving the neighborhood, that is how people know we are real','scholarship'],
  ['titus','TIT',3,12,15,'deuteragonist','trusted-administrator','manage the Cretan churches and prepare to meet Paul in Nicopolis','the organization of new churches on an entire island rests on his shoulders','Paul tells Titus to come to him at Nicopolis after Artemas or Tychicus arrives to relieve him. Even the handoff is planned. Titus is the regional manager of an island-wide church network','The regional director who cannot leave until his replacement arrives because the whole operation depends on the transition','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // HEBREWS (Unknown/Paul to Jewish Believers)
  // ═══════════════════════════════════════════════════════════════

  // ── HEB 2: Jesus Made Like His Brothers ───────────────────────
  ['jesus','HEB',2,1,18,'protagonist','redemptive-solidarity','become fully human to destroy death and help Abraham\'s descendants','the incarnation must be complete for the atonement to work','The author says since the children share flesh and blood, he himself likewise shared the same things, so that through death he might destroy the one who has the power of death. He had to become like his brothers in every respect','The billionaire who moves into the poorest neighborhood not as a visitor but as a resident so he can fix it from the inside','scholarship'],
  ['moses','HEB',2,1,4,'referenced figure','comparative-witness','serve as a baseline for the seriousness of disobeying God\'s message','if the message declared through angels was valid, how much more the message declared through the Son','The author argues from lesser to greater: if the law given through angels carried penalties, how much more should we pay attention to the salvation announced by the Lord himself','The judge who says if violating a city ordinance carries a fine, violating the constitution carries imprisonment','scholarship'],

  // ── HEB 3: Jesus Greater Than Moses ───────────────────────────
  ['jesus','HEB',3,1,6,'protagonist','faithful-builder','serve as the Son over God\'s house, surpassing Moses who was a servant in it','the Jewish believers must understand Jesus\'s superiority to transfer their allegiance','The author says Moses was faithful in all God\'s house as a servant, but Christ is faithful over God\'s house as a son. The servant is honored but the son inherits','The architect who designed the house versus the owner who built it: both faithful, but one has authority the other does not','scholarship'],
  ['moses','HEB',3,1,19,'deuteragonist','faithful-but-surpassed','be honored as God\'s faithful servant while being shown as inferior to Christ','the comparison must honor Moses while establishing Jesus\'s supremacy','Moses was faithful in all God\'s house, testifying to the things that would be spoken later. But the wilderness generation who followed him still fell because of unbelief. Faithfulness to Moses was not enough','The founding CEO whose portrait hangs in the lobby but whose company has been acquired by a larger vision','scholarship'],

  // ── HEB 5: The Order of Melchizedek ───────────────────────────
  ['jesus','HEB',5,1,14,'protagonist','compassionate-priest','become the eternal high priest who can sympathize with human weakness','the old priesthood is temporary and the new one is permanent','The author says in the days of his flesh Jesus offered up prayers and loud cries and tears to the one who was able to save him from death. Although he was a son, he learned obedience through what he suffered','The surgeon who has survived the same surgery he now performs, and his patients trust him because he knows the pain from the inside','scholarship'],
  ['abraham','HEB',5,6,10,'referenced figure','typological-link','connect Jesus to the Melchizedek priesthood that predates and surpasses the Levitical order','the argument for Jesus\'s priesthood depends on Abraham acknowledging Melchizedek','The author cites Psalm 110: You are a priest forever after the order of Melchizedek. Abraham paid tithes to Melchizedek, establishing a priesthood older than Levi','The ancient treaty that predates and overrides every subsequent contract because no one can void the original agreement','scholarship'],

  // ── HEB 6: The Danger of Falling Away ─────────────────────────
  ['paul','HEB',6,1,20,'protagonist','alarmed-pastoral-concern','warn that those who have tasted the heavenly gift and then fall away cannot be renewed to repentance','the Hebrew believers are drifting back toward Judaism and the stakes are eternal','The author says it is impossible for those who have been enlightened and then have fallen away to be restored again to repentance since they are crucifying the Son of God again. But he is confident of better things concerning them','The oncologist who describes the worst-case scenario in detail and then says but I do not believe that is your prognosis','scholarship'],

  // ── HEB 10: A New and Living Way ──────────────────────────────
  ['jesus','HEB',10,1,39,'protagonist','once-for-all-sacrifice','open access to God through his body as the final sacrifice','the entire sacrificial system is being replaced by a single act','The author says by a single offering he has perfected for all time those who are being sanctified. The curtain is his flesh and through it we have confidence to enter the holy places. Let us draw near','The key card that opens every door in the building permanently, replacing the old system where you needed a different pass for every floor','scholarship'],
  ['paul','HEB',10,19,39,'protagonist','exhortive-urgency','urge the community to hold fast their confession and not abandon meeting together','some are already drifting away from the assembly','The author says let us hold fast the confession of our hope without wavering. Do not neglect meeting together as some are in the habit of doing. If we go on sinning deliberately, there no longer remains a sacrifice for sins','The group leader who says if you stop showing up, there is no backup plan for your soul','scholarship'],

  // ── HEB 13: Final Exhortations ────────────────────────────────
  ['paul','HEB',13,1,25,'protagonist','affectionate-conclusion','close with practical instructions about hospitality, marriage, money, and obedience to leaders','the community needs daily ethics not just theological argument','The author says let brotherly love continue, do not neglect to show hospitality to strangers, remember those who are in prison. Let marriage be held in honor. Keep your life free from the love of money','The commencement speaker who finishes the grand vision with be kind, stay married, and live within your means','scholarship'],
  ['timothy','HEB',13,23,23,'witness','recently-released','be mentioned as having been released from prison','the personal note connects this letter to Paul\'s circle','The author says our brother Timothy has been released, and if he comes soon enough they will visit the recipients together. This one verse links the letter to the Pauline network','The colleague whose release from custody signals that the team is reassembling for the next phase','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // JAMES (James to the Twelve Tribes)
  // ═══════════════════════════════════════════════════════════════

  // ── JAS 4: Submit to God ──────────────────────────────────────
  ['james-brother-of-jesus','JAS',4,1,17,'protagonist','prophetic-rebuke','confront the community about their quarrels, worldliness, and arrogant planning','believers are fighting, slandering, and making plans without consulting God','James says you do not have because you do not ask. You ask and do not receive because you ask wrongly, to spend it on your passions. You adulterous people, friendship with the world is enmity with God','The family counselor who says your marriage is failing because you are both competing instead of cooperating, and you have made career idols out of your ambitions','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 1 PETER (Peter to the Diaspora)
  // ═══════════════════════════════════════════════════════════════

  // ── 1PE 4: Suffering as a Christian ───────────────────────────
  ['simon-peter','1PE',4,1,19,'protagonist','sober-solidarity','prepare the scattered believers for intensifying persecution by reframing suffering as participation in Christ\'s sufferings','the fiery trial is not a surprise but a calling','Peter says do not be surprised at the fiery trial as though something strange were happening. Rejoice insofar as you share Christ\'s sufferings. If you are insulted for the name of Christ, you are blessed','The chaplain who tells the soldiers before deployment this is exactly what you trained for, do not let the reality of combat make you doubt the mission','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 2 PETER (Peter's Second Letter)
  // ═══════════════════════════════════════════════════════════════

  // ── 2PE 3: The Day of the Lord Will Come ──────────────────────
  ['simon-peter','2PE',3,1,18,'protagonist','urgent-cosmic-perspective','counter scoffers who say Christ is not returning and explain that God\'s patience is salvific','believers are losing hope because the promise seems delayed','Peter says scoffers will come saying where is the promise of his coming. But with the Lord one day is as a thousand years. He is not slow but patient, not wanting anyone to perish. The heavens will be dissolved and the earth exposed','The climate scientist who says the glacier is not melting slowly, it is melting on geological time, and when it goes it goes all at once','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // 1 JOHN (John to the Beloved Community)
  // ═══════════════════════════════════════════════════════════════

  // ── 1JN 3: Children of God ────────────────────────────────────
  ['john-son-of-zebedee','1JN',3,1,24,'protagonist','tender-certainty','define what it means to be children of God and how love is the distinguishing mark','false teachers are confusing identity and the community needs clarity','John says see what kind of love the Father has given us, that we should be called children of God, and so we are. We know that we have passed out of death into life because we love the brothers. If anyone has the world\'s goods and sees his brother in need but closes his heart, how does God\'s love abide in him?','The grandfather who sits the family down and says we are not the kind of people who walk past someone in need, that is not who we are','scholarship'],

  // ── 1JN 4: God Is Love ───────────────────────────────────────
  ['john-son-of-zebedee','1JN',4,1,21,'protagonist','seasoned-love','distinguish the Spirit of God from the spirit of antichrist and ground the community in the reality that God is love','the church is threatened by false spirits and needs a test','John says test the spirits. Every spirit that confesses Jesus Christ has come in the flesh is from God. Then the summit: God is love. There is no fear in love, but perfect love casts out fear. We love because he first loved us','The elder statesman who says I have one test for any teaching: does it produce love or fear? If it produces fear, it is not from God','scholarship'],

  // ═══════════════════════════════════════════════════════════════
  // REVELATION (John's Apocalyptic Vision)
  // ═══════════════════════════════════════════════════════════════

  // ── REV 9: The Fifth and Sixth Trumpets ───────────────────────
  ['john-son-of-zebedee','REV',9,1,21,'witness','horrified-awe','record the locusts from the abyss and the army of 200 million horsemen','the scale of divine judgment escalates beyond human comprehension','John sees a star fall from heaven and open the bottomless pit. Locusts with scorpion tails torment people for five months. Then four angels release an army of 200 million. Despite all this, the rest of humanity does not repent','The war correspondent who films the aftermath of escalating bombardment and reports that the survivors are still refusing to evacuate','canon'],
  ['angel-of-revelation','REV',9,1,12,'protagonist','executing-judgment','sound the fifth trumpet and release the locusts from the abyss','the divine timetable of judgment must proceed in sequence','The angel sounds the trumpet and a star falls from heaven with the key to the bottomless pit. Smoke rises like a great furnace and from the smoke come locusts with the power of scorpions. They are commanded not to kill but to torment for five months','The general who opens the armory and deploys weapons that wound but do not kill because the objective is surrender not annihilation','canon'],
  ['dragon-satan','REV',9,11,11,'deuteragonist','commanding-destruction','rule over the locusts of the abyss as their king called Abaddon and Apollyon','destruction and torment are his domain','The locusts have as king over them the angel of the abyss, whose name in Hebrew is Abaddon and in Greek Apollyon, both meaning Destroyer. Even chaos has a commander','The crime lord who controls the street-level operatives from behind the scenes and whose name means ruin','canon'],

  // ── REV 10: The Angel and the Little Scroll ──────────────────
  ['john-son-of-zebedee','REV',10,1,11,'protagonist','bittersweet-obedience','eat the little scroll that is sweet in the mouth but bitter in the stomach','the prophet must internalize judgment before proclaiming it','John sees a mighty angel wrapped in a cloud with a rainbow over his head. The angel gives him a scroll and says eat it. It is sweet as honey in his mouth but makes his stomach bitter. He is told he must prophesy again about many peoples','The journalist who is handed a classified document, reads it eagerly, and then realizes the story will destroy lives on all sides','canon'],
  ['angel-of-revelation','REV',10,1,7,'deuteragonist','majestic-authority','deliver the little scroll and announce that there will be no more delay','the mystery of God is about to be fulfilled','A mighty angel comes down from heaven with one foot on the sea and one on the land and swears by him who lives forever that there will be no more delay. When the seventh angel sounds his trumpet, the mystery of God will be fulfilled','The Supreme Court justice who steps to the microphone and announces the final ruling will be issued at the next session, no more continuances','canon'],

  // ── REV 15: The Song of Moses and the Lamb ───────────────────
  ['john-son-of-zebedee','REV',15,1,8,'witness','trembling-worship','observe the victorious saints singing and the seven angels receiving the seven bowls','heaven is preparing for the final sequence of judgments','John sees those who had conquered the beast standing beside a sea of glass mixed with fire, holding harps and singing the song of Moses and the Lamb: Great and amazing are your deeds, Lord God the Almighty','The audience at a memorial concert where the survivors of a war stand together and sing the anthem that carried them through','canon'],
  ['four-living-creatures','REV',15,7,8,'deuteragonist','solemn-dispensation','give the seven golden bowls full of the wrath of God to the seven angels','the final judgments are administered from the throne room','One of the four living creatures gives each of the seven angels a golden bowl full of the wrath of God who lives forever and ever. The temple fills with smoke and no one can enter until the seven plagues are finished','The chief of staff who hands sealed envelopes to seven department heads and locks the boardroom until every order has been executed','canon'],

  // ── REV 16: The Seven Bowls of Wrath ─────────────────────────
  ['john-son-of-zebedee','REV',16,1,21,'witness','overwhelmed-by-judgment','record the pouring out of seven bowls of final wrath on the earth','the climax of divine judgment before the fall of Babylon','John watches as sores break out on those with the mark of the beast, the sea becomes blood, rivers become blood, the sun scorches people, darkness covers the beast\'s throne, the Euphrates dries up, and the greatest earthquake in history strikes. Yet people curse God and do not repent','The disaster reporter broadcasting seven catastrophes in a single week while the population refuses to evacuate','canon'],
  ['angel-of-revelation','REV',16,1,17,'protagonist','executing-final-wrath','pour out the seven bowls in sequence culminating in the voice from the throne saying It is done','each bowl targets a specific aspect of the beast\'s dominion','A loud voice from the temple commands: Go, pour out the seven bowls of the wrath of God on the earth. The seventh angel pours his bowl into the air and a loud voice from the throne says It is done','The mission commander who radios each unit in sequence and when the last one reports in, declares operation complete','canon'],
  ['beast-from-sea','REV',16,10,14,'deuteragonist','defiant-under-judgment','suffer darkness over his kingdom while his allies gather for Armageddon','even under direct divine assault the beast system does not surrender','The fifth bowl is poured on the throne of the beast and his kingdom is plunged into darkness. People gnaw their tongues in anguish but do not repent. Three demonic spirits go out to gather the kings for Armageddon','The dictator whose capital is under siege, the power grid is destroyed, and instead of surrendering he mobilizes for one final counterattack','canon'],

  // ── REV 17: The Great Prostitute ─────────────────────────────
  ['john-son-of-zebedee','REV',17,1,18,'witness','astonished','be shown the judgment of the great prostitute seated on many waters','John must understand the symbolic identity of Babylon before witnessing her fall','One of the seven bowl angels says Come, I will show you the judgment of the great prostitute. John sees a woman sitting on a scarlet beast, drunk with the blood of the saints. He marvels greatly and the angel explains the mystery','The detective who is brought to the evidence room and shown the case files of a crime syndicate he did not know existed','canon'],
  ['babylon-the-great','REV',17,1,18,'protagonist','intoxicated-with-power','sit enthroned on the beast, drunk on the blood of the saints, adorned in luxury','the world system that opposes God is personified as a seductive, violent empire','The woman is arrayed in purple and scarlet, adorned with gold and jewels, holding a golden cup full of abominations. On her forehead a name of mystery: Babylon the great, mother of prostitutes and of earth\'s abominations','The megacorporation whose luxury brand is built on exploitation, and the label on every product hides the supply chain of suffering','canon'],
  ['beast-from-sea','REV',17,8,17,'deuteragonist','ascending-from-the-abyss','carry the woman and represent the political power behind the economic-religious empire','the beast was and is not and is about to rise, a parody of the eternal God','The beast has seven heads and ten horns. The ten horns will hate the prostitute and devour her. The beast system eventually turns on the very culture it created','The political movement that empowers a cultural elite until it no longer needs them, then destroys them','canon'],

  // ── REV 18: The Fall of Babylon ──────────────────────────────
  ['john-son-of-zebedee','REV',18,1,24,'witness','solemn-grief-mixed-with-relief','record the merchants weeping over Babylon\'s destruction while heaven rejoices','the same event that devastates the world system liberates the saints','John watches kings, merchants, and sailors mourn Babylon\'s fall in a single hour. Her sins are heaped high as heaven. Then a mighty angel throws a great millstone into the sea and says So will Babylon be thrown down with violence','The journalist covering a financial crash who films traders weeping on Wall Street while wrongfully foreclosed families finally get their homes back','canon'],
  ['babylon-the-great','REV',18,1,24,'protagonist','catastrophic-downfall','fall in a single hour and be mourned by every economic power that profited from her','the entire global trade system collapses with her','A mighty angel cries: Fallen, fallen is Babylon the great! The merchants weep because no one buys their cargo anymore: gold, silver, jewels, pearls, fine linen, purple cloth, silk, and human souls. In her was found the blood of prophets and saints','The empire whose stock crashes to zero in one trading session and the bankruptcy filings reveal they were trafficking people alongside luxury goods','canon'],
  ['angel-of-revelation','REV',18,1,8,'deuteragonist','thunderous-proclamation','announce Babylon\'s fall with blinding light and a voice from heaven saying Come out of her my people','the saints must separate from the system before it collapses on them','Another angel comes down from heaven with great authority, and the earth is made bright with his glory. He cries: Come out of her my people, lest you share in her sins and her plagues','The whistleblower on national television saying get your money out of this bank by Friday because Monday it will not exist','canon'],
]);

console.log('Done epistles+revelation gaps — 49 chapters, ' + 78 + ' rows');
db.close();
