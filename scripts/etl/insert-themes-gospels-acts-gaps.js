const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO passage_themes (theme_id,book_id,chapter,verse_start,verse_end,relevance,context_note,source_tier) VALUES (?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ── MAT 3 — Baptism of Jesus / John the Baptist ──────────────────────
  ['repentance', 'MAT', 3, 1, 17, 'primary', 'John the Baptist calls Israel to repentance and warns the Pharisees that lineage alone cannot substitute for genuine turning from sin.', 'ai_assisted'],
  ['holy-spirit', 'MAT', 3, 1, 17, 'primary', 'The Spirit descends on Jesus like a dove at his baptism, marking his anointing and the beginning of his public ministry.', 'ai_assisted'],
  ['identity', 'MAT', 3, 1, 17, 'secondary', 'The Father publicly declares Jesus as his beloved Son, establishing his messianic identity before the crowds.', 'ai_assisted'],

  // ── MAT 4 — Temptation and early ministry ────────────────────────────
  ['temptation', 'MAT', 4, 1, 25, 'primary', 'Satan tempts Jesus in the wilderness with provision, spectacle, and power, testing his faithfulness to the Father.', 'ai_assisted'],
  ['kingdom-of-god', 'MAT', 4, 1, 25, 'primary', 'Jesus begins proclaiming "the kingdom of heaven is at hand," inaugurating his Galilean ministry with urgency.', 'ai_assisted'],
  ['calling', 'MAT', 4, 1, 25, 'secondary', 'Jesus calls his first disciples — Simon, Andrew, James, and John — away from their nets to follow him.', 'ai_assisted'],

  // ── MAT 9 — Healing and calling sinners ──────────────────────────────
  ['compassion', 'MAT', 9, 1, 38, 'primary', 'Jesus heals a paralytic, a woman with bleeding, a ruler\'s daughter, and the blind, moved by compassion for the suffering.', 'ai_assisted'],
  ['forgiveness', 'MAT', 9, 1, 38, 'primary', 'Jesus declares the paralytic\'s sins forgiven before healing him, linking physical restoration to spiritual pardon.', 'ai_assisted'],
  ['mission', 'MAT', 9, 1, 38, 'secondary', 'Jesus sees the crowds as harassed sheep without a shepherd and urges prayer for workers to be sent into the harvest.', 'ai_assisted'],

  // ── MAT 11 — Messengers, woes, and rest ──────────────────────────────
  ['messianic-prophecy', 'MAT', 11, 1, 30, 'primary', 'Jesus points John\'s disciples to the evidence of fulfilled messianic prophecy — the blind see, the lame walk, the good news is preached.', 'ai_assisted'],
  ['divine-judgment', 'MAT', 11, 1, 30, 'secondary', 'Jesus pronounces woe on Chorazin, Bethsaida, and Capernaum for refusing to repent despite witnessing his mighty works.', 'ai_assisted'],
  ['grace-unmerited', 'MAT', 11, 1, 30, 'primary', 'Jesus invites the weary and burdened to come to him for rest, offering grace to those crushed by religious legalism.', 'ai_assisted'],

  // ── MAT 12 — Lord of the Sabbath ─────────────────────────────────────
  ['authority', 'MAT', 12, 1, 50, 'primary', 'Jesus claims authority over the Sabbath, asserting that the Son of Man is lord even over sacred institutions.', 'ai_assisted'],
  ['hypocrisy', 'MAT', 12, 1, 50, 'secondary', 'The Pharisees attribute Jesus\' Spirit-empowered healings to Beelzebul, revealing hearts that prefer religious control over genuine mercy.', 'ai_assisted'],
  ['mercy', 'MAT', 12, 1, 50, 'primary', 'Jesus twice quotes "I desire mercy, not sacrifice," centering God\'s priority on compassionate action over ritual compliance.', 'ai_assisted'],

  // ── MAT 14 — Death of John / Feeding 5000 ───────────────────────────
  ['suffering', 'MAT', 14, 1, 36, 'secondary', 'John the Baptist is executed by Herod, showing the cost of prophetic faithfulness and foreshadowing Jesus\' own suffering.', 'ai_assisted'],
  ['providence', 'MAT', 14, 1, 36, 'primary', 'Jesus multiplies five loaves and two fish to feed over five thousand, demonstrating God\'s abundant provision from scarcity.', 'ai_assisted'],
  ['faith', 'MAT', 14, 1, 36, 'primary', 'Peter walks on water but begins to sink when he takes his eyes off Jesus, illustrating both the possibility and fragility of faith.', 'ai_assisted'],

  // ── MAT 15 — Clean and unclean / Canaanite woman ────────────────────
  ['faith', 'MAT', 15, 1, 39, 'primary', 'The Canaanite woman persists in asking Jesus for her daughter\'s healing despite initial refusal, and Jesus commends her great faith.', 'ai_assisted'],
  ['hypocrisy', 'MAT', 15, 1, 39, 'secondary', 'Jesus confronts the Pharisees for nullifying God\'s commands through human tradition, showing that defilement comes from the heart, not unwashed hands.', 'ai_assisted'],
  ['inclusion', 'MAT', 15, 1, 39, 'secondary', 'A Gentile woman receives healing for her daughter, anticipating the extension of God\'s mercy beyond Israel.', 'ai_assisted'],

  // ── MAT 19 — Marriage, wealth, and the kingdom ───────────────────────
  ['kingdom-of-god', 'MAT', 19, 1, 30, 'primary', 'Jesus teaches that the kingdom belongs to those with childlike dependence and warns that wealth can obstruct entry.', 'ai_assisted'],
  ['sacrifice', 'MAT', 19, 1, 30, 'secondary', 'The rich young man turns away grieving because he cannot surrender his possessions, contrasting with disciples who left everything.', 'ai_assisted'],
  ['kingdom-reversal', 'MAT', 19, 1, 30, 'secondary', 'Jesus declares that many who are first will be last and the last first, overturning worldly assumptions about status.', 'ai_assisted'],

  // ── MAT 22 — Parables and greatest commandment ──────────────────────
  ['love', 'MAT', 22, 1, 46, 'primary', 'Jesus summarizes the entire Law and Prophets in two commands: love God wholeheartedly and love your neighbor as yourself.', 'ai_assisted'],
  ['divine-judgment', 'MAT', 22, 1, 46, 'secondary', 'The parable of the wedding banquet warns that those who refuse the king\'s invitation face exclusion from the feast.', 'ai_assisted'],
  ['wisdom', 'MAT', 22, 1, 46, 'secondary', 'Jesus silences the Pharisees, Sadducees, and Herodians in succession, demonstrating divine wisdom that transcends partisan traps.', 'ai_assisted'],

  // ── MAT 23 — Woes against the scribes and Pharisees ──────────────────
  ['hypocrisy', 'MAT', 23, 1, 39, 'primary', 'Jesus pronounces seven woes against the scribes and Pharisees for outward piety that masks inner corruption and injustice.', 'ai_assisted'],
  ['divine-judgment', 'MAT', 23, 1, 39, 'primary', 'Jesus warns that the blood of all righteous prophets will be required of this generation, signaling coming judgment on Jerusalem.', 'ai_assisted'],
  ['lament', 'MAT', 23, 1, 39, 'secondary', 'Jesus weeps over Jerusalem, longing to gather her children as a hen gathers her chicks, but the city refuses.', 'ai_assisted'],

  // ── MAT 24 — Olivet Discourse / End times ────────────────────────────
  ['eschatological-hope', 'MAT', 24, 1, 51, 'primary', 'Jesus promises his return in glory after tribulation, giving his disciples hope that present suffering is not the final word.', 'ai_assisted'],
  ['endurance', 'MAT', 24, 1, 51, 'primary', 'Jesus warns that the one who endures to the end will be saved, urging steadfastness amid persecution and false prophets.', 'ai_assisted'],
  ['faithfulness', 'MAT', 24, 1, 51, 'secondary', 'The parable of the faithful servant contrasts watchful readiness with the complacency of those who assume the master delays.', 'ai_assisted'],

  // ── MRK 4 — Parables of the kingdom ──────────────────────────────────
  ['kingdom-of-god', 'MRK', 4, 1, 41, 'primary', 'Jesus teaches through parables — sower, seed growing secretly, mustard seed — revealing the kingdom\'s hidden but unstoppable growth.', 'ai_assisted'],
  ['faith', 'MRK', 4, 1, 41, 'primary', 'Jesus calms the storm and asks "Have you still no faith?", confronting the disciples\' fear with the reality of his authority.', 'ai_assisted'],
  ['discernment', 'MRK', 4, 1, 41, 'secondary', 'Jesus distinguishes insiders who receive kingdom mysteries from outsiders, warning that how one hears determines what one receives.', 'ai_assisted'],

  // ── MRK 8 — Feeding 4000 / Peter's confession ───────────────────────
  ['faith', 'MRK', 8, 1, 39, 'primary', 'Peter confesses Jesus as the Christ, a breakthrough of faith that nonetheless remains incomplete — he cannot accept a suffering Messiah.', 'ai_assisted'],
  ['self-denial', 'MRK', 8, 1, 39, 'primary', 'Jesus defines discipleship as denying oneself, taking up one\'s cross, and following him — the cost of allegiance.', 'ai_assisted'],
  ['providence', 'MRK', 8, 1, 39, 'secondary', 'Jesus feeds four thousand from seven loaves, yet the disciples still fail to grasp God\'s sufficiency despite repeated provision.', 'ai_assisted'],

  // ── MRK 9 — Transfiguration and exorcism ─────────────────────────────
  ['glory-of-god', 'MRK', 9, 1, 50, 'primary', 'Jesus is transfigured before Peter, James, and John, revealing his divine glory alongside Moses and Elijah.', 'ai_assisted'],
  ['faith', 'MRK', 9, 1, 50, 'secondary', 'The father of the demon-possessed boy cries "I believe; help my unbelief," embodying honest, struggling faith that Jesus honors.', 'ai_assisted'],
  ['servanthood', 'MRK', 9, 1, 50, 'primary', 'Jesus overturns the disciples\' argument about greatness by placing a child among them: whoever serves the least is truly first.', 'ai_assisted'],

  // ── MRK 11 — Triumphal entry and temple cleansing ────────────────────
  ['authority', 'MRK', 11, 1, 33, 'primary', 'Jesus enters Jerusalem as king and drives merchants from the temple, asserting sovereign authority over Israel\'s worship.', 'ai_assisted'],
  ['divine-judgment', 'MRK', 11, 1, 33, 'primary', 'The cursing of the fig tree symbolizes judgment on Israel\'s fruitless religion — outward leaves but no fruit.', 'ai_assisted'],
  ['prayer', 'MRK', 11, 1, 33, 'secondary', 'Jesus declares the temple should be a house of prayer for all nations, connecting faith-filled prayer with forgiveness.', 'ai_assisted'],

  // ── LUK 3 — John the Baptist and genealogy ──────────────────────────
  ['repentance', 'LUK', 3, 1, 38, 'primary', 'John demands practical repentance — sharing possessions, honest tax-collecting, non-violent soldiering — not mere ritual.', 'ai_assisted'],
  ['justice', 'LUK', 3, 1, 38, 'secondary', 'John\'s call to share clothing and food with the poor frames repentance in terms of economic justice and neighborly generosity.', 'ai_assisted'],
  ['divine-plan', 'LUK', 3, 1, 38, 'secondary', 'Luke traces Jesus\' genealogy back to Adam and ultimately to God, situating the salvation story within universal human history.', 'ai_assisted'],

  // ── LUK 5 — Calling of first disciples / healings ───────────────────
  ['calling', 'LUK', 5, 1, 39, 'primary', 'Simon Peter falls at Jesus\' knees after the miraculous catch, recognizing his own sinfulness, and Jesus calls him to fish for people.', 'ai_assisted'],
  ['faith', 'LUK', 5, 1, 39, 'secondary', 'Friends lower a paralytic through the roof, and Jesus, seeing their faith, forgives and heals, linking communal faith to divine response.', 'ai_assisted'],
  ['new-life', 'LUK', 5, 1, 39, 'secondary', 'Jesus teaches that new wine requires new wineskins, signaling that his ministry cannot be contained within old religious structures.', 'ai_assisted'],

  // ── LUK 6 — Sermon on the Plain ─────────────────────────────────────
  ['kingdom-reversal', 'LUK', 6, 1, 49, 'primary', 'Blessings on the poor, hungry, and weeping are paired with woes on the rich and comfortable, overturning social hierarchies.', 'ai_assisted'],
  ['love', 'LUK', 6, 1, 49, 'primary', 'Jesus commands love for enemies, generosity without expecting return, and mercy mirroring the Father\'s own compassion.', 'ai_assisted'],
  ['kingdom-ethics', 'LUK', 6, 1, 49, 'secondary', 'Jesus lays out the ethical foundation of his kingdom: judge not, give generously, build on the rock of his words.', 'ai_assisted'],

  // ── LUK 8 — Parables and miracles ───────────────────────────────────
  ['faith', 'LUK', 8, 1, 56, 'primary', 'Jesus commends the bleeding woman for her faith and challenges Jairus to keep believing even after his daughter dies.', 'ai_assisted'],
  ['authority', 'LUK', 8, 1, 56, 'primary', 'Jesus calms a storm, casts out Legion, and raises the dead, demonstrating authority over nature, demons, and death itself.', 'ai_assisted'],
  ['kingdom-of-god', 'LUK', 8, 1, 56, 'secondary', 'The parable of the sower reveals varied responses to God\'s word, with fruitful soil representing those who hold fast with patient endurance.', 'ai_assisted'],

  // ── LUK 9 — Sending the Twelve / Transfiguration ────────────────────
  ['discipleship', 'LUK', 9, 1, 62, 'primary', 'Jesus sends the Twelve with authority, feeds five thousand, and then demands radical commitment — no one who puts hand to the plow and looks back is fit for the kingdom.', 'ai_assisted'],
  ['self-denial', 'LUK', 9, 1, 62, 'primary', 'Jesus tells all who would follow him to deny themselves daily and take up their cross, redefining greatness as suffering service.', 'ai_assisted'],
  ['glory-of-god', 'LUK', 9, 1, 62, 'secondary', 'On the mountain Jesus is transfigured, his face and clothing dazzling, as Moses and Elijah discuss his coming departure in Jerusalem.', 'ai_assisted'],

  // ── LUK 11 — Lord's Prayer and woes ─────────────────────────────────
  ['prayer', 'LUK', 11, 1, 54, 'primary', 'Jesus teaches the Lord\'s Prayer and follows it with a parable about persistence, assuring that the Father gives the Holy Spirit to those who ask.', 'ai_assisted'],
  ['hypocrisy', 'LUK', 11, 1, 54, 'primary', 'Jesus pronounces woes on Pharisees and lawyers for tithing herbs while neglecting justice and love, and for loading burdens they refuse to carry.', 'ai_assisted'],
  ['holy-spirit', 'LUK', 11, 1, 54, 'secondary', 'Jesus promises that the Father will give the Holy Spirit to those who ask, contrasting divine generosity with the Pharisees\' spiritual stinginess.', 'ai_assisted'],

  // ── LUK 12 — Fearlessness and readiness ─────────────────────────────
  ['fear-of-god', 'LUK', 12, 1, 59, 'primary', 'Jesus urges fearing God rather than human persecutors, assuring that even sparrows are not forgotten and every hair is numbered.', 'ai_assisted'],
  ['faithfulness', 'LUK', 12, 1, 59, 'primary', 'Parables of the faithful manager and watchful servants stress readiness for the master\'s return, equating faithfulness with vigilance.', 'ai_assisted'],
  ['generosity', 'LUK', 12, 1, 59, 'secondary', 'Jesus warns against greed and anxiety about possessions, commanding disciples to sell and give alms, storing treasure in heaven.', 'ai_assisted'],

  // ── LUK 13 — Repent or perish / Narrow door ─────────────────────────
  ['repentance', 'LUK', 13, 1, 35, 'primary', 'Jesus warns that without repentance all will perish like those killed by Pilate or the tower of Siloam — tragedy is a universal call to turn.', 'ai_assisted'],
  ['kingdom-of-god', 'LUK', 13, 1, 35, 'primary', 'Jesus compares the kingdom to a mustard seed and leaven, small beginnings yielding enormous growth, while warning the door is narrow.', 'ai_assisted'],
  ['lament', 'LUK', 13, 1, 35, 'secondary', 'Jesus weeps over Jerusalem\'s refusal to be gathered, echoing prophetic grief over a city that kills the prophets sent to her.', 'ai_assisted'],

  // ── LUK 14 — Cost of discipleship ───────────────────────────────────
  ['discipleship', 'LUK', 14, 1, 35, 'primary', 'Jesus demands that followers count the cost: whoever does not renounce all possessions and carry their cross cannot be his disciple.', 'ai_assisted'],
  ['humility', 'LUK', 14, 1, 35, 'primary', 'At a Pharisee\'s banquet Jesus teaches guests to take the lowest seat, and hosts to invite the poor, crippled, and blind rather than the socially advantaged.', 'ai_assisted'],
  ['kingdom-reversal', 'LUK', 14, 1, 35, 'secondary', 'The parable of the great banquet shows the originally invited refusing, so the master fills his table with the marginalized from streets and hedges.', 'ai_assisted'],

  // ── LUK 18 — Persistent prayer and humility ─────────────────────────
  ['prayer', 'LUK', 18, 1, 43, 'primary', 'The parable of the persistent widow teaches that God will vindicate his elect who cry out to him, encouraging relentless prayer.', 'ai_assisted'],
  ['humility', 'LUK', 18, 1, 43, 'primary', 'The tax collector who beats his breast and begs mercy goes home justified rather than the self-righteous Pharisee — God exalts the humble.', 'ai_assisted'],
  ['faith', 'LUK', 18, 1, 43, 'secondary', 'Blind Bartimaeus cries out despite the crowd\'s rebuke, and Jesus says his faith has saved him — persistent trust receives healing.', 'ai_assisted'],

  // ── LUK 20 — Authority challenged / Parable of tenants ──────────────
  ['authority', 'LUK', 20, 1, 47, 'primary', 'Religious leaders demand to know by what authority Jesus acts; he silences them with a counter-question about John\'s baptism.', 'ai_assisted'],
  ['divine-judgment', 'LUK', 20, 1, 47, 'primary', 'The parable of the wicked tenants warns that those who reject and kill the owner\'s son will have the vineyard taken from them.', 'ai_assisted'],
  ['wisdom', 'LUK', 20, 1, 47, 'secondary', 'Jesus navigates loaded questions about taxes and resurrection with wisdom that leaves opponents unable to trap him.', 'ai_assisted'],

  // ── LUK 21 — Widow's offering and coming destruction ─────────────────
  ['generosity', 'LUK', 21, 1, 38, 'secondary', 'The poor widow who gives two coins gives more than all the wealthy, because she gives out of her poverty — everything she has to live on.', 'ai_assisted'],
  ['eschatological-hope', 'LUK', 21, 1, 38, 'primary', 'Jesus teaches that after Jerusalem\'s destruction and cosmic signs, the Son of Man will come with power, and redemption draws near.', 'ai_assisted'],
  ['endurance', 'LUK', 21, 1, 38, 'primary', 'Jesus warns of persecution, betrayal, and imprisonment but promises that by steadfast endurance his followers will gain their lives.', 'ai_assisted'],

  // ── LUK 22 — Last Supper and arrest ──────────────────────────────────
  ['new-covenant', 'LUK', 22, 1, 71, 'primary', 'Jesus institutes the Lord\'s Supper, declaring the cup the new covenant in his blood poured out for his followers.', 'ai_assisted'],
  ['betrayal', 'LUK', 22, 1, 71, 'primary', 'Judas agrees to hand Jesus over for money, and Jesus identifies the betrayer at the table, weaving treachery into the meal of communion.', 'ai_assisted'],
  ['sacrifice', 'LUK', 22, 1, 71, 'secondary', 'Jesus agonizes in Gethsemane, sweating drops like blood, yet submits to the Father\'s will — the ultimate act of self-giving.', 'ai_assisted'],
  ['servant-leadership', 'LUK', 22, 1, 71, 'secondary', 'When the disciples argue about who is greatest, Jesus declares that the one who leads must become like the one who serves.', 'ai_assisted'],

  // ── LUK 23 — Trial and crucifixion ──────────────────────────────────
  ['forgiveness', 'LUK', 23, 1, 56, 'primary', 'From the cross Jesus prays "Father, forgive them, for they know not what they do," extending pardon even to his executioners.', 'ai_assisted'],
  ['salvation', 'LUK', 23, 1, 56, 'primary', 'Jesus promises the repentant thief "today you will be with me in paradise," offering salvation in the final hour to one with nothing to give.', 'ai_assisted'],
  ['suffering', 'LUK', 23, 1, 56, 'secondary', 'Jesus is mocked, scourged, and crucified between criminals, enduring the full weight of human cruelty and divine judgment.', 'ai_assisted'],

  // ── JHN 5 — Healing at Bethesda ──────────────────────────────────────
  ['authority', 'JHN', 5, 1, 47, 'primary', 'Jesus claims the Father has given all judgment to the Son, making himself equal with God and scandalizing the Jewish leaders.', 'ai_assisted'],
  ['miracles', 'JHN', 5, 1, 47, 'secondary', 'Jesus heals a man paralyzed for thirty-eight years at Bethesda, provoking controversy because it occurs on the Sabbath.', 'ai_assisted'],
  ['divine-judgment', 'JHN', 5, 1, 47, 'secondary', 'Jesus warns that those who hear the Son\'s voice will live, but those who have done evil face a resurrection of judgment.', 'ai_assisted'],

  // ── JHN 6 — Bread of Life ───────────────────────────────────────────
  ['providence', 'JHN', 6, 1, 72, 'primary', 'Jesus feeds over five thousand with five barley loaves and two fish, demonstrating that God provides abundantly from almost nothing.', 'ai_assisted'],
  ['faith', 'JHN', 6, 1, 72, 'primary', 'Jesus declares "I am the bread of life" and many disciples leave, but Peter confesses "You have the words of eternal life" — faith that persists through scandal.', 'ai_assisted'],
  ['sacrifice', 'JHN', 6, 1, 72, 'secondary', 'Jesus teaches that his flesh is real food and his blood real drink, foreshadowing the cross and the self-giving at the heart of salvation.', 'ai_assisted'],

  // ── JHN 7 — Feast of Tabernacles ────────────────────────────────────
  ['conflict', 'JHN', 7, 1, 53, 'primary', 'The crowd splits sharply over Jesus — some call him a prophet, others the Christ, still others dismiss him — his claims provoke deep conflict.', 'ai_assisted'],
  ['holy-spirit', 'JHN', 7, 1, 53, 'primary', 'Jesus cries out that rivers of living water will flow from the believer, which John interprets as the Spirit not yet given.', 'ai_assisted'],
  ['messianic-prophecy', 'JHN', 7, 1, 53, 'secondary', 'Debate over Jesus\' origins reveals confused expectations: can the Messiah come from Galilee when Scripture says he arises from Bethlehem?', 'ai_assisted'],

  // ── JHN 8 — Light of the World / "Before Abraham was" ───────────────
  ['truthfulness', 'JHN', 8, 1, 59, 'primary', 'Jesus claims to be the light of the world and declares that the truth will set people free, exposing the bondage of sin.', 'ai_assisted'],
  ['sin', 'JHN', 8, 1, 59, 'primary', 'Jesus tells those who claim Abraham as father that their desire to kill him proves they are slaves to sin and children of the devil.', 'ai_assisted'],
  ['identity', 'JHN', 8, 1, 59, 'secondary', 'Jesus makes the climactic "I AM" declaration — "before Abraham was, I am" — prompting the crowd to take up stones.', 'ai_assisted'],

  // ── JHN 10 — Good Shepherd ──────────────────────────────────────────
  ['love', 'JHN', 10, 1, 42, 'primary', 'The good shepherd lays down his life for the sheep voluntarily; no one takes it from him — the ultimate expression of self-giving love.', 'ai_assisted'],
  ['sovereignty', 'JHN', 10, 1, 42, 'secondary', 'Jesus declares that no one can snatch his sheep from his hand or the Father\'s, grounding assurance in divine sovereignty.', 'ai_assisted'],
  ['community', 'JHN', 10, 1, 42, 'secondary', 'Jesus speaks of "other sheep not of this fold" whom he must bring, envisioning one flock under one shepherd — a community beyond Israel.', 'ai_assisted'],

  // ── JHN 12 — Triumphal entry and grain of wheat ─────────────────────
  ['sacrifice', 'JHN', 12, 1, 50, 'primary', 'Jesus teaches that unless a grain of wheat falls to the ground and dies it remains alone, but in dying it bears much fruit — his death as the source of life.', 'ai_assisted'],
  ['glory-of-god', 'JHN', 12, 1, 50, 'primary', 'Jesus prays "Father, glorify your name" and a voice from heaven responds, revealing that the cross is the paradoxical means of divine glorification.', 'ai_assisted'],
  ['fulfilled-prophecy', 'JHN', 12, 1, 50, 'secondary', 'John quotes Isaiah to explain Israel\'s unbelief, showing that even rejection fulfills the prophetic script of God\'s plan.', 'ai_assisted'],

  // ── JHN 14 — Way, Truth, Life ───────────────────────────────────────
  ['presence-of-god', 'JHN', 14, 1, 31, 'primary', 'Jesus promises the Holy Spirit as another Advocate who will dwell in and with the disciples, ensuring God\'s abiding presence after his departure.', 'ai_assisted'],
  ['peace', 'JHN', 14, 1, 31, 'primary', 'Jesus bequeaths his peace — not as the world gives — calming troubled hearts on the eve of his arrest and death.', 'ai_assisted'],
  ['obedience', 'JHN', 14, 1, 31, 'secondary', 'Jesus ties love to obedience: "If you love me, you will keep my commandments," making obedience the evidence of genuine affection.', 'ai_assisted'],

  // ── JHN 16 — Spirit of truth and sorrow turned to joy ───────────────
  ['holy-spirit', 'JHN', 16, 1, 33, 'primary', 'Jesus explains that the Spirit of truth will convict the world, guide into all truth, and glorify Christ by declaring what is to come.', 'ai_assisted'],
  ['joy', 'JHN', 16, 1, 33, 'primary', 'Jesus compares the disciples\' grief to a woman in labor: sorrow now, but when they see him again their joy will be full and irrevocable.', 'ai_assisted'],
  ['courage', 'JHN', 16, 1, 33, 'secondary', 'Jesus warns of persecution and scattering but concludes with "Take heart; I have overcome the world," grounding courage in his victory.', 'ai_assisted'],

  // ── ACT 12 — Peter's miraculous escape ──────────────────────────────
  ['prayer', 'ACT', 12, 1, 25, 'primary', 'The church prays earnestly for Peter while he is imprisoned, and an angel frees him — demonstrating the power of corporate intercession.', 'ai_assisted'],
  ['deliverance', 'ACT', 12, 1, 25, 'primary', 'An angel strikes Peter\'s chains and leads him past guards through locked gates, a dramatic rescue that echoes Israel\'s exodus.', 'ai_assisted'],
  ['divine-judgment', 'ACT', 12, 1, 25, 'secondary', 'Herod Agrippa is struck down by an angel for accepting divine honors, contrasting human arrogance with God\'s sovereign justice.', 'ai_assisted'],

  // ── ACT 14 — Paul and Barnabas in Lystra and Derbe ──────────────────
  ['mission', 'ACT', 14, 1, 28, 'primary', 'Paul and Barnabas preach boldly in Iconium, Lystra, and Derbe, establishing churches and appointing elders across southern Galatia.', 'ai_assisted'],
  ['persecution', 'ACT', 14, 1, 28, 'primary', 'Paul is stoned and left for dead at Lystra but rises and continues preaching, embodying the endurance required of apostolic mission.', 'ai_assisted'],
  ['endurance', 'ACT', 14, 1, 28, 'secondary', 'Paul tells new believers they must enter the kingdom of God through many tribulations, framing suffering as the normal path of discipleship.', 'ai_assisted'],

  // ── ACT 16 — Philippian jailer ──────────────────────────────────────
  ['salvation', 'ACT', 16, 1, 40, 'primary', 'The Philippian jailer asks "What must I do to be saved?" and Paul answers "Believe in the Lord Jesus" — salvation distilled to its essence.', 'ai_assisted'],
  ['prayer', 'ACT', 16, 1, 40, 'secondary', 'Paul and Silas pray and sing hymns at midnight in chains, and an earthquake opens every door — worship in suffering becomes a vehicle of liberation.', 'ai_assisted'],
  ['liberation', 'ACT', 16, 1, 40, 'primary', 'God breaks chains through an earthquake, freeing Paul and Silas, and through the gospel, freeing the jailer and his household from spiritual bondage.', 'ai_assisted'],

  // ── ACT 18 — Paul in Corinth ────────────────────────────────────────
  ['mission', 'ACT', 18, 1, 28, 'primary', 'Paul settles in Corinth for eighteen months, pivoting from synagogue to Gentile mission after Jewish opposition, and a church takes root.', 'ai_assisted'],
  ['courage', 'ACT', 18, 1, 28, 'secondary', 'The Lord tells Paul in a night vision "Do not be afraid; keep on speaking," assuring him of divine protection and many people in the city.', 'ai_assisted'],
  ['community', 'ACT', 18, 1, 28, 'secondary', 'Paul partners with Aquila and Priscilla in tentmaking and ministry, modeling how shared labor and hospitality sustain missionary work.', 'ai_assisted'],

  // ── ACT 21 — Paul's arrival in Jerusalem ────────────────────────────
  ['costly-obedience', 'ACT', 21, 1, 40, 'primary', 'Paul presses on to Jerusalem despite repeated prophetic warnings that imprisonment awaits, declaring himself ready to die for the name of Jesus.', 'ai_assisted'],
  ['persecution', 'ACT', 21, 1, 40, 'primary', 'A mob seizes Paul in the temple and tries to kill him, accusing him of defiling the holy place by bringing Gentiles inside.', 'ai_assisted'],
  ['divine-plan', 'ACT', 21, 1, 40, 'secondary', 'Paul\'s arrest sets in motion a chain of trials that will carry the gospel all the way to Rome, fulfilling God\'s purpose through suffering.', 'ai_assisted'],

  // ── ACT 22 — Paul's defense before the crowd ───────────────────────
  ['calling', 'ACT', 22, 1, 30, 'primary', 'Paul recounts his Damascus road encounter with the risen Christ and his commission to carry the gospel to the Gentiles.', 'ai_assisted'],
  ['new-identity-in-christ', 'ACT', 22, 1, 30, 'secondary', 'Paul contrasts his former identity as a zealous persecutor with his transformation into an apostle, illustrating radical conversion.', 'ai_assisted'],
  ['mission', 'ACT', 22, 1, 30, 'secondary', 'The crowd listens until Paul mentions his commission to the Gentiles, at which point they erupt — the Gentile mission remains the flashpoint.', 'ai_assisted'],

  // ── ACT 23 — Plot against Paul / transfer to Caesarea ───────────────
  ['providence', 'ACT', 23, 1, 35, 'primary', 'Paul\'s nephew uncovers the assassination plot and the Roman commander transfers Paul under heavy guard, showing God\'s providential protection.', 'ai_assisted'],
  ['courage', 'ACT', 23, 1, 35, 'secondary', 'Paul boldly addresses the Sanhedrin and strategically divides Pharisees from Sadducees over the resurrection, demonstrating shrewdness under pressure.', 'ai_assisted'],
  ['resurrection-hope', 'ACT', 23, 1, 35, 'secondary', 'Paul declares "It is with respect to the hope of the resurrection that I am on trial," centering his defense on the core Christian confession.', 'ai_assisted'],

  // ── ACT 24 — Trial before Felix ─────────────────────────────────────
  ['justice', 'ACT', 24, 1, 27, 'primary', 'Paul appeals to Roman law for a fair hearing, insisting that no evidence supports the charges and that his accusers should prove their case.', 'ai_assisted'],
  ['faith', 'ACT', 24, 1, 27, 'secondary', 'Paul speaks to Felix about faith in Christ Jesus, covering justice, self-control, and coming judgment, causing Felix to tremble.', 'ai_assisted'],
  ['perseverance-in-faith', 'ACT', 24, 1, 27, 'secondary', 'Paul remains imprisoned for two years while Felix delays, yet continues to testify — faithfulness sustained through bureaucratic injustice.', 'ai_assisted'],

  // ── ACT 25 — Appeal to Caesar ───────────────────────────────────────
  ['divine-plan', 'ACT', 25, 1, 27, 'primary', 'Paul appeals to Caesar, setting in motion the journey to Rome that fulfills Jesus\' promise that Paul would testify before the emperor.', 'ai_assisted'],
  ['justice', 'ACT', 25, 1, 27, 'primary', 'Festus acknowledges that Paul has done nothing deserving death, yet political maneuvering keeps him in chains — human justice falls short.', 'ai_assisted'],
  ['courage', 'ACT', 25, 1, 27, 'secondary', 'Paul refuses to be handed over to Jerusalem and boldly invokes his right as a Roman citizen to stand before Caesar\'s tribunal.', 'ai_assisted'],
]);

console.log('Done — inserted passage_themes for 46 Gospel+Acts gap chapters.');
db.close();
