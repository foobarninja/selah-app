const db = require('better-sqlite3')('data/selah.db');

const ins = db.prepare(`INSERT OR IGNORE INTO devotionals (id,title,book_id,chapter,verse_start,verse_end,context_brief,modern_moment,conversation_starters,going_deeper,audience,estimated_minutes,season,day_of_year,narrative_id,source_tier,source_notes,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
const tagIns = db.prepare(`INSERT OR IGNORE INTO devotional_tag_map (devotional_id,tag_id,relevance) VALUES (?,?,?)`);

const now = '2026-04-03T00:00:00.000Z';

const devotionals = [
  // ============================================================
  // MATTHEW (18 devotionals)
  // ============================================================

  // 1 - ADVENT/CHRISTMAS seasonal
  {
    id: 'gos-the-night-god-moved-in-next-door',
    title: 'The Night God Moved In Next Door',
    book_id: 'MAT', chapter: 1, vs: 18, ve: 25,
    context: 'Joseph discovers Mary is pregnant and faces a devastating choice — until an angel appears in a dream telling him not to be afraid. The child will be called Emmanuel, "God with us."',
    moment: 'Have you ever gotten news that turned your whole world upside down? Joseph had his entire future planned — and then everything changed overnight. But sometimes the thing that wrecks your plan IS the plan. God didn\'t just send a message; He moved into the neighborhood.',
    starters: JSON.stringify(["What's the scariest change you've ever had to accept?", "Why do you think God chose an ordinary carpenter to raise Jesus?", "What does 'God with us' mean for your life right now?"]),
    deeper: 'Notice Joseph never speaks a single word in the Gospels. His faith is entirely shown through action. What does that teach us about faith that acts even when we can\'t find the words?',
    audience: 'family', minutes: 5, season: 'advent', day: 355,
    narrative: 'mat-genealogy-and-birth',
    tags: [['change', 'primary'], ['courage-tag', 'primary'], ['fear-tag', 'secondary'], ['family-audience', 'secondary']]
  },

  // 2 - CHRISTMAS seasonal
  {
    id: 'gos-the-refugees-who-changed-the-world',
    title: 'The Refugees Who Changed the World',
    book_id: 'MAT', chapter: 2, vs: 13, ve: 23,
    context: 'Joseph, Mary, and baby Jesus flee to Egypt to escape King Herod\'s murderous decree. They become refugees in a foreign land — an echo of Israel\'s own history.',
    moment: 'The King of Kings started life as a refugee. His family packed up in the middle of the night and ran for their lives. When you see families on the news who\'ve lost everything and had to start over somewhere new, remember: Jesus knows exactly what that feels like.',
    starters: JSON.stringify(["Have you or anyone you know ever had to start over somewhere completely new?", "Why do you think God let His own Son experience being a refugee?", "How can we help families who are displaced today?"]),
    deeper: 'Matthew deliberately echoes Moses\'s story — a king killing babies, a family escaping to Egypt. Jesus relives Israel\'s history in His own body. Read Hosea 11:1 alongside this passage.',
    audience: 'family', minutes: 5, season: 'christmas', day: 360,
    narrative: 'mat-genealogy-and-birth',
    tags: [['suffering-tag', 'primary'], ['courage-tag', 'primary'], ['fear-tag', 'secondary'], ['change', 'secondary']]
  },

  // 3
  {
    id: 'gos-the-happiness-nobody-expected',
    title: 'The Happiness Nobody Expected',
    book_id: 'MAT', chapter: 5, vs: 1, ve: 12,
    context: 'Jesus begins His most famous sermon by turning the world\'s definition of happiness inside out. Blessed are the poor, the mourning, the meek, the hungry. Not the powerful, the popular, or the comfortable.',
    moment: 'Imagine someone standing up at a school assembly and saying: "The happiest kid here is the one who got picked last at recess. The one crying in the bathroom. The one who gave away their lunch." People would think they were crazy. But Jesus means it.',
    starters: JSON.stringify(["Which beatitude surprises you the most? Why?", "Why do you think Jesus says mourning people are blessed?", "Can you think of a time when a hard experience actually brought something good?"]),
    deeper: 'The word "blessed" (makarios) doesn\'t just mean happy — it means "to be envied." Jesus isn\'t just comforting the hurting; He\'s saying the world should want what they have.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-beatitudes',
    tags: [['joy-tag', 'primary'], ['suffering-tag', 'primary'], ['identity-tag', 'secondary'], ['grief', 'secondary']]
  },

  // 4
  {
    id: 'gos-talking-to-someone-you-cant-see',
    title: 'Talking to Someone You Can\'t See',
    book_id: 'MAT', chapter: 6, vs: 5, ve: 15,
    context: 'Jesus teaches His followers how to pray — not with fancy public performances, but privately, simply, like talking to a Father who already knows what you need.',
    moment: 'Prayer can feel weird. You\'re talking to someone you can\'t see, can\'t hear reply, and you\'re not even sure they\'re listening. But Jesus says: your Father knows what you need before you ask. Prayer isn\'t informing God — it\'s turning toward Him.',
    starters: JSON.stringify(["What's hardest about prayer for you — starting, focusing, or believing someone's listening?", "Why does Jesus say to pray in secret?", "Which line of the Lord's Prayer means the most to you right now?"]),
    deeper: '"Give us this day our daily bread" echoes the manna in the wilderness — just enough for today. What would change if you only asked God for what you need today, not tomorrow?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-lords-prayer',
    tags: [['doubt-tag', 'primary'], ['rest-tag', 'primary'], ['patience-tag', 'secondary'], ['stress', 'secondary']]
  },

  // 5
  {
    id: 'gos-why-birds-dont-have-anxiety',
    title: 'Why Birds Don\'t Have Anxiety',
    book_id: 'MAT', chapter: 6, vs: 25, ve: 34,
    context: 'Jesus points to birds that never plant crops and wildflowers dressed better than kings. His point: if God handles them, He can handle you. Stop letting tomorrow steal today.',
    moment: 'You\'re lying in bed and your brain starts its nightly highlight reel of everything that could go wrong. Jesus says: look at a sparrow. It didn\'t set an alarm. It didn\'t make a to-do list. And it ate today. You are worth infinitely more than a sparrow.',
    starters: JSON.stringify(["What keeps you up at night worrying?", "Does 'don't worry' feel helpful or frustrating? Why?", "What's one worry you could hand to God just for today?"]),
    deeper: 'Jesus doesn\'t say "never plan." He says don\'t let anxiety about tomorrow hijack today. The lilies aren\'t lazy — they bloom. What does it look like to bloom without anxious striving?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-do-not-worry',
    tags: [['stress', 'primary'], ['fear-tag', 'primary'], ['rest-tag', 'secondary'], ['patience-tag', 'secondary']]
  },

  // 6 - Young children
  {
    id: 'gos-when-the-boat-was-sinking',
    title: 'When the Boat Was Sinking and Jesus Was Napping',
    book_id: 'MAT', chapter: 8, vs: 23, ve: 27,
    context: 'A violent storm hits while Jesus is asleep in the boat. The disciples, including experienced fishermen, are terrified. They wake Jesus, who calms the storm with a word.',
    moment: 'Ever feel like everything\'s falling apart and God is just... asleep? The disciples felt that too. They\'re bailing water, screaming, and Jesus is on a pillow. But His nap wasn\'t carelessness — it was peace. And He invited them into it.',
    starters: JSON.stringify(["What's a 'storm' in your life right now?", "Why do you think Jesus was able to sleep through the storm?", "What would it feel like to have that kind of peace?"]),
    deeper: 'The disciples ask "Don\'t you care if we drown?" — the question behind every unanswered prayer. Jesus doesn\'t scold the storm question. He answers it with action.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mat-calming-the-storm',
    tags: [['fear-tag', 'primary'], ['courage-tag', 'primary'], ['stress', 'secondary'], ['doubt-tag', 'secondary']]
  },

  // 7
  {
    id: 'gos-the-smallest-seed-the-biggest-tree',
    title: 'The Smallest Seed, the Biggest Tree',
    book_id: 'MAT', chapter: 13, vs: 31, ve: 32,
    context: 'Jesus compares God\'s kingdom to a mustard seed — the tiniest seed a farmer would plant, which grows into a tree large enough for birds to nest in.',
    moment: 'Every massive thing started microscopic. The friendship that saved your life started with a wave. The movement that changed history started with one person who cared. God\'s kingdom doesn\'t arrive like a meteor — it grows like a seed.',
    starters: JSON.stringify(["What's something huge in your life that started really small?", "Why does God work through small things instead of doing everything big and flashy?", "What 'seed' could you plant this week?"]),
    deeper: 'The mustard seed was considered a weed by many — invasive and unstoppable once it took root. God\'s kingdom is like that: it can\'t be contained, and it shelters everyone.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mat-parables-of-the-kingdom',
    tags: [['patience-tag', 'primary'], ['courage-tag', 'secondary'], ['identity-tag', 'secondary'], ['doubt-tag', 'secondary']]
  },

  // 8
  {
    id: 'gos-buried-treasure-and-impulse-buys',
    title: 'Buried Treasure and the Best Impulse Buy Ever',
    book_id: 'MAT', chapter: 13, vs: 44, ve: 46,
    context: 'Jesus tells two tiny parables back-to-back: a man finds treasure in a field and sells everything to buy that field. A merchant finds a perfect pearl and does the same.',
    moment: 'Have you ever wanted something so badly you\'d trade everything for it? A spot on the team. A friendship. These people found something so valuable that selling everything didn\'t feel like a sacrifice — it felt like a deal.',
    starters: JSON.stringify(["What's the most valuable thing you own? Would you sell it for something better?", "Why did the treasure finder feel JOY, not loss, when he sold everything?", "What does it mean that God's kingdom is worth everything?"]),
    deeper: 'Some scholars think the treasure isn\'t just us finding God — it\'s God finding us. He\'s the one who sells everything (gives His Son) to get the field (the world) for the treasure (you).',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-parables-of-the-kingdom',
    tags: [['joy-tag', 'primary'], ['identity-tag', 'primary'], ['generosity-tag', 'secondary']]
  },

  // 9 - Teens
  {
    id: 'gos-who-do-you-say-i-am',
    title: 'The Question That Changes Everything: Who Do You Say I Am?',
    book_id: 'MAT', chapter: 16, vs: 13, ve: 20,
    context: 'Jesus asks His disciples what people are saying about Him. They list the rumors. Then He turns it personal: "But who do YOU say I am?" Peter answers: the Messiah.',
    moment: 'Everyone has an opinion about Jesus — good teacher, historical figure, myth, revolutionary. But Jesus isn\'t interested in what "people" think. He asks YOU. Not your parents\' faith, not your friend\'s doubts. Yours. Who do you say He is?',
    starters: JSON.stringify(["If someone at school asked you 'Who is Jesus?' what would you actually say?", "Why does Jesus care more about YOUR answer than the crowd's opinion?", "Has your answer to this question ever changed?"]),
    deeper: 'Jesus says Peter\'s answer came from the Father, not from human reasoning. Some truths aren\'t figured out — they\'re revealed. What\'s the difference between believing and knowing?',
    audience: 'teens', minutes: 6, season: null, day: null,
    narrative: 'mat-peter-confesses-christ',
    tags: [['identity-tag', 'primary'], ['doubt-tag', 'primary'], ['courage-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 10
  {
    id: 'gos-the-time-peter-james-john-saw-glory',
    title: 'The Mountain Where Everything Changed',
    book_id: 'MAT', chapter: 17, vs: 1, ve: 13,
    context: 'Jesus takes three disciples up a mountain and is transfigured — His face shines like the sun, His clothes become blazing white. Moses and Elijah appear. A voice from heaven says: "This is my Son. Listen to Him."',
    moment: 'Mountain-top moments don\'t last. Peter wanted to build shelters and stay forever. But Jesus led them back down — because the point of the mountain isn\'t to live there. It\'s to carry what you saw back into the valley.',
    starters: JSON.stringify(["Have you ever had a 'mountain-top moment' — camp, retreat, amazing worship — that faded?", "Why didn't Jesus let them stay on the mountain?", "How do you hold onto a powerful experience when regular life returns?"]),
    deeper: 'The Transfiguration echoes Moses on Sinai — same mountain glory, same cloud, same voice. But this time the instruction is: listen to my Son, not obey the law. What shifts?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-transfiguration',
    tags: [['joy-tag', 'primary'], ['identity-tag', 'secondary'], ['doubt-tag', 'secondary'], ['change', 'secondary']]
  },

  // 11
  {
    id: 'gos-how-many-times-do-i-have-to-forgive',
    title: 'How Many Times Do I Have to Forgive This Person?',
    book_id: 'MAT', chapter: 18, vs: 21, ve: 35,
    context: 'Peter asks Jesus the very human question: how many times must I forgive someone? Seven times? Jesus says seventy-seven times, then tells about a servant forgiven a massive debt who refuses to forgive a tiny one.',
    moment: 'There\'s always that person. The one who keeps doing the same thing and keeps saying sorry. Peter wanted a number — a limit where he could finally stop forgiving. Jesus basically says: you don\'t get to stop. Because you were forgiven an un-payable debt first.',
    starters: JSON.stringify(["Is there someone you're struggling to forgive right now?", "Why is forgiving the same person over and over SO hard?", "What's the difference between forgiving someone and trusting them again?"]),
    deeper: 'The first servant owed 10,000 talents — billions in today\'s money, an absurd, un-payable amount. The second owed a few bucks. That gap IS the gospel. What debt have you been forgiven?',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'mat-forgiveness-seventy-times',
    tags: [['forgiveness-tag', 'primary'], ['anger-tag', 'primary'], ['relationships-tag', 'secondary'], ['patience-tag', 'secondary']]
  },

  // 12 - Teens
  {
    id: 'gos-unfair-grace-the-last-get-paid-first',
    title: 'Unfair Grace: When the Last Hired Get Paid First',
    book_id: 'MAT', chapter: 20, vs: 1, ve: 16,
    context: 'A vineyard owner hires workers throughout the day — some at dawn, some at noon, some an hour before quitting time. He pays them all the same. The early workers are furious.',
    moment: 'This parable makes rule-followers angry. You work all day, someone shows up at 4:55 PM, and they get the same paycheck? That\'s not fair. Exactly. Grace isn\'t fair. That\'s what makes it grace. And if you\'re honest, you\'ve been the 4:55 PM worker more than you\'d like to admit.',
    starters: JSON.stringify(["Does this parable make you angry? Good — that's the point. Why?", "Have you ever resented someone getting something they 'didn't earn'?", "Would you rather live in a world of strict fairness or outrageous generosity?"]),
    deeper: 'The early workers agreed to a fair wage and got it. Their anger isn\'t about injustice — it\'s about comparison. "Are you envious because I am generous?" What does comparison steal from your joy?',
    audience: 'teens', minutes: 6, season: null, day: null,
    narrative: 'mat-workers-in-vineyard',
    tags: [['generosity-tag', 'primary'], ['anger-tag', 'secondary'], ['joy-tag', 'secondary'], ['work-calling', 'secondary']]
  },

  // 13
  {
    id: 'gos-what-you-did-for-the-invisible-ones',
    title: 'What You Did for the Invisible Ones, You Did for Me',
    book_id: 'MAT', chapter: 25, vs: 31, ve: 46,
    context: 'Jesus describes the final judgment: nations separated like sheep and goats. The difference? Whether they fed the hungry, welcomed the stranger, clothed the naked, visited the prisoner. "Whatever you did for the least of these, you did for me."',
    moment: 'The test wasn\'t a theology exam. It wasn\'t church attendance. It was: did you see the person everyone else walked past? Did you stop? Jesus says He\'s hiding in the faces of people we\'d rather not notice.',
    starters: JSON.stringify(["Who are the 'invisible people' in your school, neighborhood, or town?", "Why does Jesus identify Himself with the hungry and imprisoned — not the successful?", "What's one way you could see Jesus in someone this week?"]),
    deeper: 'Both groups are surprised — the sheep didn\'t know they were serving Jesus, and the goats didn\'t know they were ignoring Him. What does it mean that the right thing is often done unconsciously?',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'mat-sheep-and-goats',
    tags: [['generosity-tag', 'primary'], ['courage-tag', 'primary'], ['relationships-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 14 - LENT/EASTER seasonal
  {
    id: 'gos-the-loneliest-prayer-ever-prayed',
    title: 'The Loneliest Prayer Ever Prayed',
    book_id: 'MAT', chapter: 26, vs: 36, ve: 46,
    context: 'In Gethsemane, Jesus sweats blood and begs His Father for another way. His closest friends fall asleep three times. He faces the cross utterly alone.',
    moment: 'Jesus didn\'t walk to the cross whistling. He was terrified. He begged for a way out. And the people He needed most couldn\'t stay awake for one hour. If Jesus wrestled with God\'s plan, you\'re allowed to wrestle too.',
    starters: JSON.stringify(["Have you ever prayed hard for something and the answer was 'no'?", "Why is it important that Jesus was afraid?", "What does it mean when your closest people can't be there for you?"]),
    deeper: '"Not my will, but yours." This is the hinge of history. What does it cost you to say those words honestly? Jesus models that obedience and anguish can coexist.',
    audience: 'family', minutes: 6, season: 'lent', day: 89,
    narrative: 'mat-gethsemane',
    tags: [['suffering-tag', 'primary'], ['loneliness-tag', 'primary'], ['fear-tag', 'secondary'], ['courage-tag', 'secondary']]
  },

  // 15 - EASTER seasonal
  {
    id: 'gos-the-day-death-died',
    title: 'The Day Death Died',
    book_id: 'MAT', chapter: 28, vs: 1, ve: 10,
    context: 'Two Marys go to the tomb at dawn. An earthquake. An angel. An empty grave. "He is not here; He has risen." They run with fear and great joy to tell the others.',
    moment: 'Every Easter we hear it and it almost loses its shock. A dead man walked out of His grave. Not resuscitated — resurrected. The worst thing that ever happened (the murder of God\'s Son) became the best thing that ever happened (death defeated). That\'s the pattern of the gospel: God makes dead things live.',
    starters: JSON.stringify(["What does resurrection mean for something in your life that feels dead — a friendship, hope, a dream?", "Why did Jesus appear first to women, whose testimony wasn't legally accepted?", "If the resurrection is true, what changes about the way you live today?"]),
    deeper: 'The guards were paid to lie. The first witnesses were women. Everything about this story is designed to be un-fabricatable. Why would you invent a story no one would believe?',
    audience: 'family', minutes: 6, season: 'easter', day: 92,
    narrative: 'mat-resurrection',
    tags: [['joy-tag', 'primary'], ['courage-tag', 'primary'], ['grief', 'secondary'], ['change', 'secondary']]
  },

  // 16 - Adults
  {
    id: 'gos-go-and-make-and-dont-look-back',
    title: 'Go and Make — and Don\'t Look Back',
    book_id: 'MAT', chapter: 28, vs: 16, ve: 20,
    context: 'The risen Jesus gives the Great Commission: go to all nations, make disciples, baptize, teach. "I am with you always, to the very end of the age."',
    moment: 'Eleven ordinary, traumatized men who just watched their leader die. And He says: now go change the world. With what? No money, no army, no social media. Just His presence and a promise: I\'m with you. Always. That\'s still the job description.',
    starters: JSON.stringify(["What's your 'go' — the place or people God might be sending you toward?", "Why does Jesus say 'I am with you' right after giving an impossible command?", "How do you 'make disciples' in your everyday life?"]),
    deeper: 'Matthew\'s Gospel starts with "God with us" (Emmanuel, 1:23) and ends with "I am with you always" (28:20). The whole book is bookended by presence. What does that tell you about what matters most?',
    audience: 'adults', minutes: 6, season: null, day: null,
    narrative: 'mat-resurrection',
    tags: [['work-calling', 'primary'], ['courage-tag', 'primary'], ['identity-tag', 'secondary'], ['change', 'secondary']]
  },

  // 17
  {
    id: 'gos-the-sermon-that-wrecked-every-comfort-zone',
    title: 'The Sermon That Wrecked Every Comfort Zone',
    book_id: 'MAT', chapter: 5, vs: 38, ve: 48,
    context: 'Jesus pushes beyond "an eye for an eye" — turn the other cheek, go the extra mile, love your enemies, pray for those who persecute you. Be perfect as your Father is perfect.',
    moment: 'Love your enemies. Not tolerate them. Not "be the bigger person" while secretly hoping they fail. Actually love them. Pray for the person who makes your life miserable. This isn\'t natural. It\'s supernatural. And that\'s exactly the point.',
    starters: JSON.stringify(["Who is hardest for you to love right now?", "Does 'turn the other cheek' mean be a pushover? What does it really mean?", "What would your school or workplace look like if everyone did this for one day?"]),
    deeper: 'In first-century culture, turning the other cheek was an act of defiance, not weakness — it forced the aggressor to treat you as an equal. Jesus is teaching creative, nonviolent resistance. How does that change your reading?',
    audience: 'teens', minutes: 6, season: null, day: null,
    narrative: 'mat-sermon-on-the-mount',
    tags: [['forgiveness-tag', 'primary'], ['courage-tag', 'primary'], ['anger-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 18
  {
    id: 'gos-the-last-meal-and-the-first-promise',
    title: 'The Last Meal and the First Promise',
    book_id: 'MAT', chapter: 26, vs: 17, ve: 30,
    context: 'Jesus shares a final Passover meal with His disciples, breaks bread, pours wine, and says: this is my body, this is my blood — a new covenant. One of them will betray Him.',
    moment: 'He sat at a table with the man who would sell Him out, the friend who would deny Him, and the crew who would run away. And He broke bread with all of them. The Lord\'s Supper was born at a table where nobody deserved to sit.',
    starters: JSON.stringify(["Why did Jesus include Judas at this meal?", "What does it mean that Jesus gave thanks before His worst night?", "How does communion feel different knowing this context?"]),
    deeper: 'The Passover meal remembered Israel\'s liberation from slavery. Jesus is now saying: I\'m the Lamb. This is the new exodus. You\'re being set free from something bigger than Egypt.',
    audience: 'family', minutes: 5, season: 'lent', day: 87,
    narrative: 'mat-last-supper',
    tags: [['forgiveness-tag', 'primary'], ['gratitude-tag', 'primary'], ['relationships-tag', 'secondary'], ['suffering-tag', 'secondary']]
  },

  // ============================================================
  // MARK (14 devotionals)
  // ============================================================

  // 19
  {
    id: 'gos-the-day-it-all-started',
    title: 'The Day It All Started: Baptism and the Wilderness',
    book_id: 'MRK', chapter: 1, vs: 9, ve: 13,
    context: 'Jesus is baptized and the Spirit descends like a dove. God says: "You are my Son, whom I love." Immediately the Spirit drives Him into the wilderness for 40 days of temptation.',
    moment: 'Right after the best moment — "You are loved" — comes the hardest moment — the wilderness. That\'s not a coincidence. Sometimes God sends you into hard places not because He\'s forgotten you, but because He just told you who you are.',
    starters: JSON.stringify(["Has a great moment in your life ever been followed immediately by a hard one?", "Why does God affirm Jesus's identity BEFORE the test, not after?", "What 'wilderness' are you in right now?"]),
    deeper: 'Mark says the Spirit "drove" Jesus into the wilderness — the same word used for casting out demons. The Spirit doesn\'t gently suggest the hard path. What does that tell you about spiritual growth?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-baptism-and-temptation',
    tags: [['identity-tag', 'primary'], ['temptation-tag', 'primary'], ['courage-tag', 'secondary'], ['change', 'secondary']]
  },

  // 20 - Young children
  {
    id: 'gos-the-friends-who-wrecked-the-roof',
    title: 'The Friends Who Wrecked the Roof',
    book_id: 'MRK', chapter: 2, vs: 1, ve: 12,
    context: 'Four friends carry a paralyzed man to Jesus, but the house is packed. So they dig through the roof and lower him down on a mat. Jesus sees THEIR faith and heals the man.',
    moment: 'Imagine you\'re sitting in church and the ceiling starts crumbling. Dirt falls on your head. Then a guy on a stretcher drops into the room. Those friends didn\'t let anything — crowds, walls, a roof — stop them from getting their friend to Jesus. That\'s the kind of friend to be.',
    starters: JSON.stringify(["Who would carry you through a roof?", "Who would you carry?", "Why does Jesus respond to the FRIENDS' faith, not the sick man's?"]),
    deeper: 'Jesus first says "Your sins are forgiven" — not "You\'re healed." The man came for his legs; Jesus addressed his soul. What do you think you need most, and what does God think you need?',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mrk-healing-the-paralytic',
    tags: [['relationships-tag', 'primary'], ['courage-tag', 'primary'], ['forgiveness-tag', 'secondary'], ['suffering-tag', 'secondary']]
  },

  // 21
  {
    id: 'gos-the-man-with-a-thousand-demons',
    title: 'The Man with a Thousand Demons and a New Address',
    book_id: 'MRK', chapter: 5, vs: 1, ve: 20,
    context: 'A man living naked among tombs, cutting himself, screaming day and night, possessed by a legion of demons. Jesus crosses a lake just for this one person and sets him completely free.',
    moment: 'Everyone had given up on this guy. He was the town scary story. And Jesus crossed a stormy lake specifically to find him. The person everyone avoids? Jesus specifically seeks them out. No one is too far gone.',
    starters: JSON.stringify(["Have you ever felt like 'too much' for people?", "Why did Jesus cross a lake in a storm for ONE person?", "The healed man wanted to follow Jesus, but Jesus sent him home. Why?"]),
    deeper: 'The man wanted to go with Jesus, but Jesus said: go home and tell your people. Your mess became your message. The place of your worst pain becomes the place of your greatest testimony.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-gerasene-demoniac',
    tags: [['identity-tag', 'primary'], ['suffering-tag', 'primary'], ['loneliness-tag', 'secondary'], ['change', 'secondary']]
  },

  // 22
  {
    id: 'gos-the-woman-who-touched-the-edge',
    title: 'The Woman Who Touched the Edge and Got Her Life Back',
    book_id: 'MRK', chapter: 5, vs: 25, ve: 34,
    context: 'A woman who has been bleeding for 12 years — broke from doctors, isolated from community, ritually unclean — pushes through a crowd and touches Jesus\'s cloak. She\'s healed instantly.',
    moment: 'Twelve years of doctors who took her money and made things worse. Twelve years of being called unclean and untouchable. She shouldn\'t have been in that crowd at all. But desperation makes you brave. And Jesus didn\'t scold her for breaking the rules — He called her "daughter."',
    starters: JSON.stringify(["Have you ever been desperate enough to try something you'd normally never do?", "Why does Jesus call her 'daughter' — the only time He uses that word for anyone?", "What does this story say about people who feel invisible or excluded?"]),
    deeper: 'Jesus felt power go out from Him and asked "Who touched me?" — in a crushing crowd. He wanted to see her face, not just heal her body. The encounter mattered as much as the miracle.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-jairus-and-bleeding-woman',
    tags: [['suffering-tag', 'primary'], ['courage-tag', 'primary'], ['loneliness-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 23 - Young children
  {
    id: 'gos-the-kid-who-shared-his-lunch',
    title: 'The Kid Who Shared His Lunch and Fed a Stadium',
    book_id: 'MRK', chapter: 6, vs: 30, ve: 44,
    context: 'Five thousand hungry people, one boy with five small loaves and two fish. The disciples say "Send them away." Jesus says "You feed them." He multiplies the tiny lunch into a feast with 12 baskets of leftovers.',
    moment: 'A kid. A lunchbox. An impossible situation. And Jesus says: give Me what you have. Not what you wish you had. Not what the person next to you has. What YOU have. Even if it seems embarrassingly small. He makes small things enormous.',
    starters: JSON.stringify(["What do you have that feels 'not enough'?", "Why did Jesus use a kid's lunch instead of creating food from nothing?", "What leftovers in your life could God multiply?"]),
    deeper: 'Twelve baskets left over — one for each doubting disciple. The surplus was the sermon. When God provides, there\'s always more than enough. What does abundance from scarcity teach about God\'s character?',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mrk-feeding-five-thousand',
    tags: [['generosity-tag', 'primary'], ['courage-tag', 'primary'], ['doubt-tag', 'secondary'], ['gratitude-tag', 'secondary']]
  },

  // 24
  {
    id: 'gos-walking-on-the-water-and-missing-the-point',
    title: 'Walking on Water and Still Missing the Point',
    book_id: 'MRK', chapter: 6, vs: 45, ve: 52,
    context: 'Jesus walks on water toward the terrified disciples in a storm. He climbs in the boat, the wind stops, and Mark says they were amazed "because they had not understood about the loaves; their hearts were hardened."',
    moment: 'They just watched Him feed 5,000 people with a kid\'s lunch. And now they\'re surprised He can walk on water? Mark is ruthless: they didn\'t get it because their hearts were hard. You can see a miracle and still miss the lesson.',
    starters: JSON.stringify(["Have you ever seen God do something amazing and then immediately worried about the next problem?", "Why does Mark connect the miracle of the loaves to walking on water?", "What makes a heart 'hard' — and how do you soften it?"]),
    deeper: 'Jesus meant to "pass by them" on the water — the same phrase used for God passing by Moses and Elijah. This is a theophany, God revealing Himself. The disciples are in the presence of God and don\'t recognize Him.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-jesus-walks-on-water',
    tags: [['doubt-tag', 'primary'], ['fear-tag', 'primary'], ['patience-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 25 - Teens
  {
    id: 'gos-the-outsider-who-argued-with-jesus',
    title: 'The Outsider Who Argued with Jesus — and Won',
    book_id: 'MRK', chapter: 7, vs: 24, ve: 30,
    context: 'A Syrophoenician woman — a Gentile, a foreigner, a woman — begs Jesus to heal her daughter. Jesus seems to refuse. She pushes back. And Jesus commends her faith and heals her daughter.',
    moment: 'This story is uncomfortable. Jesus seems to say no. She doesn\'t accept it. And He changes His response. This woman teaches us that desperate, honest, even argumentative faith gets God\'s attention. Polite, passive faith doesn\'t always cut it.',
    starters: JSON.stringify(["Is it okay to argue with God?", "Why do you think Jesus initially seemed to refuse her?", "Have you ever had to fight for something you believed God would do?"]),
    deeper: 'This is the moment the gospel breaks ethnic boundaries. A foreign woman\'s faith surpasses what Jesus has seen in Israel. She becomes the hinge between "Israel only" and "all nations." Her argument opened a door for all of us.',
    audience: 'teens', minutes: 6, season: null, day: null,
    narrative: 'mrk-syrophoenician-woman',
    tags: [['courage-tag', 'primary'], ['doubt-tag', 'primary'], ['identity-tag', 'secondary'], ['patience-tag', 'secondary']]
  },

  // 26
  {
    id: 'gos-the-blind-man-who-refused-to-shut-up',
    title: 'The Blind Man Who Refused to Shut Up',
    book_id: 'MRK', chapter: 10, vs: 46, ve: 52,
    context: 'Blind Bartimaeus sits by the road begging as Jesus passes. The crowd tells him to be quiet. He yells louder. Jesus stops and asks: "What do you want me to do for you?"',
    moment: 'Everyone told him to be quiet. Too loud. Too desperate. Too embarrassing. But Bartimaeus knew this was his one chance, and he wasn\'t going to let anyone\'s opinion steal it. Sometimes the most spiritual thing you can do is refuse to shut up.',
    starters: JSON.stringify(["Has anyone ever tried to quiet your faith or your need?", "Why does Jesus ask 'What do you want?' — doesn't He already know?", "What would you yell if Jesus walked by right now?"]),
    deeper: 'Mark says Bartimaeus threw off his cloak — his beggar\'s mat, his identity, his only possession. He left his old life on the ground before he could even see. That\'s faith.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-blind-bartimaeus',
    tags: [['courage-tag', 'primary'], ['identity-tag', 'primary'], ['suffering-tag', 'secondary'], ['change', 'secondary']]
  },

  // 27 - Young children
  {
    id: 'gos-two-coins-and-everything',
    title: 'Two Coins and Everything',
    book_id: 'MRK', chapter: 12, vs: 41, ve: 44,
    context: 'Rich people drop large amounts into the temple treasury. A poor widow puts in two tiny coins — all she has. Jesus calls His disciples over: she gave more than all of them combined.',
    moment: 'Math class says two pennies is less than a hundred dollars. Jesus math says: it\'s more. Because she gave everything, and they gave from their extra. God doesn\'t measure your gift by its size — He measures it by what it cost you.',
    starters: JSON.stringify(["What's something you gave away that really cost you?", "Why does God care about sacrifice more than the amount?", "What could you give this week that would actually cost you something?"]),
    deeper: 'This story comes right after Jesus condemns religious leaders who "devour widows\' houses." The same system that impoverished her got her last coins. Jesus sees both the beauty of her gift and the injustice of the system.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mrk-widows-offering',
    tags: [['generosity-tag', 'primary'], ['courage-tag', 'secondary'], ['gratitude-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 28
  {
    id: 'gos-the-perfume-the-outrage-and-the-betrayal',
    title: 'The Perfume, the Outrage, and the Betrayal',
    book_id: 'MRK', chapter: 14, vs: 3, ve: 11,
    context: 'A woman pours an entire jar of expensive perfume on Jesus\'s head — a year\'s wages. The room erupts with indignation about waste. Jesus defends her: "She has done a beautiful thing." Immediately after, Judas goes to betray Him.',
    moment: 'Everyone in the room did the math and got angry. She did the love and gave everything. Mark puts her extravagance right next to Judas\'s betrayal on purpose. One poured out everything for Jesus. The other traded Him for pocket change.',
    starters: JSON.stringify(["Have you ever done something generous and been criticized for it?", "Why does Jesus call 'wasted' money a 'beautiful thing'?", "What's the difference between the woman's heart and the critics' hearts?"]),
    deeper: 'Jesus says "she prepared my body for burial" — she may be the only person who truly understood He was about to die. While the disciples argued about power, she grieved and anointed. Sometimes love sees what ambition misses.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-anointing-at-bethany',
    tags: [['generosity-tag', 'primary'], ['courage-tag', 'secondary'], ['grief', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 29 - EASTER seasonal
  {
    id: 'gos-darkness-at-noon',
    title: 'Darkness at Noon: The Death That Changed Everything',
    book_id: 'MRK', chapter: 15, vs: 33, ve: 39,
    context: 'Darkness covers the land for three hours. Jesus cries out "My God, my God, why have you forsaken me?" and breathes His last. The temple curtain tears from top to bottom. A Roman centurion says: "Surely this man was the Son of God."',
    moment: 'The most honest prayer ever prayed: "Why have you abandoned me?" If Jesus can say that to God, you can say anything to God. He didn\'t die with a serene smile — He died with a scream. And that scream is the most comforting thing in the Bible for anyone who feels abandoned.',
    starters: JSON.stringify(["Have you ever felt abandoned by God?", "Why is it important that Jesus felt forsaken?", "A Roman soldier — the enemy — was the first to recognize who Jesus was. What does that tell you?"]),
    deeper: 'Jesus quotes Psalm 22:1, which starts with abandonment but ends with triumph. He\'s not despairing — He\'s pointing to the whole psalm. Read Psalm 22 and see how it ends.',
    audience: 'family', minutes: 6, season: 'easter', day: 90,
    narrative: 'mrk-crucifixion-mark',
    tags: [['suffering-tag', 'primary'], ['grief', 'primary'], ['doubt-tag', 'secondary'], ['courage-tag', 'secondary']]
  },

  // 30
  {
    id: 'gos-the-empty-tomb-and-the-terrified-women',
    title: 'The Empty Tomb and the Terrified Women',
    book_id: 'MRK', chapter: 16, vs: 1, ve: 8,
    context: 'Three women go to anoint Jesus\'s body. The stone is rolled away. A young man in white says He\'s risen. Mark\'s original ending: "They said nothing to anyone, because they were afraid."',
    moment: 'Mark\'s Gospel originally ended with fear and silence — not a triumphant hymn. And that\'s strangely honest. Sometimes the most earth-shaking news leaves you speechless. Faith doesn\'t always feel brave. Sometimes it starts as trembling.',
    starters: JSON.stringify(["Why do you think Mark ended his Gospel with fear instead of celebration?", "Have you ever been so overwhelmed by something good that you couldn't speak?", "What does it mean that the resurrection started with scared, silent women — not confident preachers?"]),
    deeper: 'The abrupt ending may be intentional — Mark leaves the story unfinished because YOU are the next chapter. The women eventually spoke. What will you do with this news?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mrk-empty-tomb',
    tags: [['fear-tag', 'primary'], ['courage-tag', 'primary'], ['change', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 31
  {
    id: 'gos-rules-were-made-for-people',
    title: 'Rules Were Made for People, Not People for Rules',
    book_id: 'MRK', chapter: 2, vs: 23, ve: 28,
    context: 'The Pharisees catch Jesus\'s disciples picking grain on the Sabbath. Jesus responds: "The Sabbath was made for man, not man for the Sabbath."',
    moment: 'Rules exist to protect you, not imprison you. When a rule becomes more important than the person it was designed to help, something has gone terribly wrong. Jesus didn\'t abolish the Sabbath — He restored its purpose: rest is a gift, not a cage.',
    starters: JSON.stringify(["Can you think of a good rule that gets applied in a bad way?", "What's the difference between rest as a gift and rest as an obligation?", "How do you know when a rule is helping people vs. hurting them?"]),
    deeper: 'Jesus calls Himself "Lord of the Sabbath." He\'s not breaking the law — He\'s the Author editing His own book. What does it mean to follow the spirit of a law rather than just the letter?',
    audience: 'teens', minutes: 5, season: null, day: null,
    narrative: 'mrk-jesus-and-the-sabbath',
    tags: [['rest-tag', 'primary'], ['identity-tag', 'secondary'], ['patience-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 32 - Young children
  {
    id: 'gos-the-girl-who-woke-up',
    title: 'The Girl Who Woke Up',
    book_id: 'MRK', chapter: 5, vs: 35, ve: 43,
    context: 'Jairus\'s 12-year-old daughter dies while Jesus is delayed. Mourners laugh when Jesus says she\'s sleeping. He takes her hand and says "Talitha koum" — "Little girl, get up." She gets up and walks.',
    moment: 'The mourners had already given up. The professionals said it was over. But Jesus walked past the doubters, took a little girl\'s hand, and whispered: wake up. Whatever feels dead and over in your life — a dream, a friendship, hope itself — He can whisper to it too.',
    starters: JSON.stringify(["Why did Jesus tell everyone she was 'sleeping' when she had died?", "What's something in your life that feels 'dead' that you wish could wake up?", "Why did Jesus tell them to give her something to eat after the miracle?"]),
    deeper: 'Jesus preserved her dignity — He only let her parents and three disciples in the room. And His first instruction after raising her from the dead? "Give her something to eat." Even miracles need a snack. The supernatural meets the ordinary.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'mrk-jairus-and-bleeding-woman',
    tags: [['grief', 'primary'], ['courage-tag', 'primary'], ['fear-tag', 'secondary'], ['joy-tag', 'secondary']]
  },

  // ============================================================
  // LUKE (18 devotionals)
  // ============================================================

  // 33 - ADVENT seasonal
  {
    id: 'gos-the-teenage-girl-who-changed-everything',
    title: 'The Teenage Girl Who Changed Everything',
    book_id: 'LUK', chapter: 1, vs: 46, ve: 56,
    context: 'Mary — likely a teenager — responds to the most terrifying news of her life with a song. The Magnificat: God lifts the lowly, fills the hungry, scatters the proud.',
    moment: 'A teenage girl from a nothing town gets told she\'ll carry God\'s Son. Her response isn\'t fear — it\'s a revolution song. She doesn\'t sing about herself; she sings about a God who flips power structures. The proud get scattered, the hungry get fed, and the lowly get lifted. This teenager understood God\'s politics better than any politician.',
    starters: JSON.stringify(["What would your reaction be if God asked you to do something terrifying and world-changing?", "Why does Mary focus on the poor and hungry in her song?", "How old is too young to be used by God? (Trick question.)"]),
    deeper: 'The Magnificat echoes Hannah\'s song from 1 Samuel 2. Mary knew her Bible and saw herself in the story. What story from Scripture do you see yourself in?',
    audience: 'teens', minutes: 5, season: 'advent', day: 348,
    narrative: 'luk-magnificat',
    tags: [['courage-tag', 'primary'], ['identity-tag', 'primary'], ['joy-tag', 'secondary'], ['change', 'secondary']]
  },

  // 34 - CHRISTMAS seasonal
  {
    id: 'gos-the-night-shift-workers-who-met-god',
    title: 'The Night-Shift Workers Who Met God First',
    book_id: 'LUK', chapter: 2, vs: 8, ve: 20,
    context: 'Angels appear to shepherds — the night shift, the overlooked, the ritually unclean. They\'re the first to hear the news. They find a baby in a feeding trough.',
    moment: 'God could have announced Jesus to kings, priests, or professors. He chose shepherds pulling the night shift. The most important birth announcement in human history went to people nobody would have believed. God\'s VIP list has always been upside down.',
    starters: JSON.stringify(["Why shepherds? Why not priests, scholars, or rulers?", "What does it tell you about God that He chose a feeding trough, not a palace?", "Who are today's 'shepherds' — the overlooked people God might choose first?"]),
    deeper: 'Shepherds couldn\'t testify in court — they were considered unreliable. God chose legally inadmissible witnesses. The gospel has always been unbelievable to the credentialed and crystal clear to the desperate.',
    audience: 'family', minutes: 5, season: 'christmas', day: 359,
    narrative: 'luk-birth-of-jesus',
    tags: [['joy-tag', 'primary'], ['identity-tag', 'primary'], ['gratitude-tag', 'secondary'], ['generosity-tag', 'secondary']]
  },

  // 35 - ADVENT seasonal
  {
    id: 'gos-the-old-couple-who-never-stopped-waiting',
    title: 'The Old Couple Who Never Stopped Waiting',
    book_id: 'LUK', chapter: 2, vs: 25, ve: 38,
    context: 'Simeon and Anna — elderly, devout, waiting decades for God\'s promise. Simeon holds baby Jesus and says: "My eyes have seen your salvation." Anna, an 84-year-old widow, begins to tell everyone.',
    moment: 'Simeon waited his entire life for one moment. Anna spent 60 years praying in the temple. And the thing they waited for was a baby small enough to hold in wrinkled arms. Sometimes God\'s answer doesn\'t come like a thunderbolt — it comes like a newborn. Small, quiet, easy to miss.',
    starters: JSON.stringify(["What's the longest you've ever waited for something?", "How do you keep hoping when the wait feels endless?", "What does Simeon's response teach us about recognizing God's answer when it finally comes?"]),
    deeper: 'Simeon says this child will cause "the rising and falling of many" and be "a sign that will be opposed." Even at the celebration of Jesus\'s birth, the shadow of the cross is already visible. Joy and sorrow are never far apart.',
    audience: 'family', minutes: 5, season: 'advent', day: 350,
    narrative: 'luk-simeon-and-anna',
    tags: [['patience-tag', 'primary'], ['gratitude-tag', 'primary'], ['grief', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 36 - Young children
  {
    id: 'gos-the-twelve-year-old-who-scared-his-parents',
    title: 'The Twelve-Year-Old Who Scared His Parents to Death',
    book_id: 'LUK', chapter: 2, vs: 41, ve: 52,
    context: 'Jesus, age 12, stays behind in Jerusalem when His family leaves. After three frantic days of searching, Mary and Joseph find Him in the temple, discussing theology with scholars.',
    moment: 'Every parent knows the stomach-drop feeling of losing a kid at the store. Now imagine losing your kid for three days — and he\'s God\'s Son and you have to explain this to the Almighty. When they find Him, He says: "Didn\'t you know I\'d be in my Father\'s house?" Twelve-year-old Jesus was already navigating two identities.',
    starters: JSON.stringify(["Have you ever done something that scared your parents because you felt called to it?", "Why was Jesus in the temple instead of with His family?", "What does it mean that Jesus 'grew in wisdom' — didn't He already know everything?"]),
    deeper: 'Luke says Jesus was "obedient to them" after this. Even the Son of God submitted to human parents. Independence and obedience aren\'t opposites — they\'re both part of growing up.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'luk-jesus-at-twelve',
    tags: [['identity-tag', 'primary'], ['relationships-tag', 'primary'], ['patience-tag', 'secondary'], ['courage-tag', 'secondary']]
  },

  // 37 - Adults
  {
    id: 'gos-the-hometown-crowd-that-tried-to-kill-him',
    title: 'The Hometown Crowd That Tried to Kill Him',
    book_id: 'LUK', chapter: 4, vs: 16, ve: 30,
    context: 'Jesus reads Isaiah 61 in His hometown synagogue and says: "Today this Scripture is fulfilled in your hearing." They marvel at first, then grow furious and try to throw Him off a cliff.',
    moment: 'His hometown loved Him until He challenged them. They were fine with Jesus as a carpenter\'s kid with nice words. But Jesus as Messiah who serves outsiders more than insiders? That was too much. The people closest to you can become the most hostile when you outgrow the box they built for you.',
    starters: JSON.stringify(["Have you ever felt unsupported by people who should know you best?", "Why did the crowd turn so fast — from amazement to murder?", "Is there someone you've put in a box who's outgrown it?"]),
    deeper: 'Jesus deliberately mentions two Old Testament stories where God helped foreigners — a widow in Sidon, a leper from Syria — instead of Israelites. He\'s saying: God\'s grace goes to whoever is hungry for it, not whoever thinks they deserve it.',
    audience: 'adults', minutes: 6, season: null, day: null,
    narrative: 'luk-nazareth-manifesto',
    tags: [['courage-tag', 'primary'], ['identity-tag', 'primary'], ['loneliness-tag', 'secondary'], ['change', 'secondary']]
  },

  // 38
  {
    id: 'gos-the-tears-that-wrecked-a-dinner-party',
    title: 'The Tears That Wrecked a Dinner Party',
    book_id: 'LUK', chapter: 7, vs: 36, ve: 50,
    context: 'At a Pharisee\'s dinner, a "sinful woman" crashes the party, weeps over Jesus\'s feet, dries them with her hair, and pours perfume on them. The host is disgusted. Jesus tells a story about two debtors forgiven different amounts.',
    moment: 'The religious insider hosted the dinner but didn\'t even offer Jesus water for His feet — basic hospitality. The "sinful woman" gave Jesus her tears, her hair, her perfume, everything. Sometimes the people farthest from religion are closest to God\'s heart, because they know exactly how much they\'ve been forgiven.',
    starters: JSON.stringify(["Why was the religious leader more uncomfortable than the 'sinful' woman?", "Have you ever judged someone's relationship with God based on their reputation?", "What does it mean that 'whoever has been forgiven much, loves much'?"]),
    deeper: 'The Pharisee didn\'t think he needed much forgiveness. So he didn\'t love much. The dangerous place isn\'t being a big sinner — it\'s being someone who doesn\'t think they\'re one.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'luk-sinful-woman-anoints-jesus',
    tags: [['forgiveness-tag', 'primary'], ['gratitude-tag', 'primary'], ['identity-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 39
  {
    id: 'gos-the-hero-is-the-enemy',
    title: 'The Hero Is the Enemy',
    book_id: 'LUK', chapter: 10, vs: 25, ve: 37,
    context: 'A lawyer asks "Who is my neighbor?" Jesus tells about a man robbed and left for dead. A priest and a Levite walk past. A Samaritan — the hated outsider — stops and saves him.',
    moment: 'Jesus\'s audience hated Samaritans. So He made the Samaritan the hero. Imagine telling a story where the person your listeners despise the most is the only one who does the right thing. Jesus doesn\'t just teach compassion — He demolishes the walls we build between "us" and "them."',
    starters: JSON.stringify(["Who is 'the Samaritan' in your world — the group you might overlook or avoid?", "Why did the priest and Levite walk past?", "What does 'Go and do likewise' look like in your life this week?"]),
    deeper: 'The lawyer asked "Who is my neighbor?" hoping to narrow the definition. Jesus answered: "Which one BECAME a neighbor?" The question isn\'t who deserves your help — it\'s whether you\'ll become the kind of person who helps.',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'luk-good-samaritan',
    tags: [['generosity-tag', 'primary'], ['courage-tag', 'primary'], ['relationships-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 40
  {
    id: 'gos-the-fight-about-dishes-that-was-about-everything',
    title: 'The Fight About Dishes That Was Really About Everything',
    book_id: 'LUK', chapter: 10, vs: 38, ve: 42,
    context: 'Martha hosts Jesus and is frantically cooking and cleaning. Her sister Mary sits at Jesus\'s feet listening. Martha demands Jesus tell Mary to help. Jesus gently says Mary chose the better thing.',
    moment: 'Martha isn\'t wrong — someone has to make dinner. But she\'s so busy serving Jesus that she misses being with Jesus. This isn\'t a story about lazy vs. hardworking. It\'s about mistaking busyness for closeness. You can serve God so furiously that you forget to sit with Him.',
    starters: JSON.stringify(["Are you more of a Martha or a Mary — and is that good or bad?", "What's the difference between serving God and being with God?", "When has being busy stolen something important from you?"]),
    deeper: 'Mary sits "at Jesus\'s feet" — the posture of a disciple, a student. In that culture, women weren\'t allowed to be disciples. Jesus is breaking a rule by letting her stay. He\'s not just defending rest — He\'s defending her right to learn.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'luk-mary-and-martha',
    tags: [['rest-tag', 'primary'], ['work-calling', 'secondary'], ['stress', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 41
  {
    id: 'gos-the-greatest-short-story-ever-told',
    title: 'The Greatest Short Story Ever Told',
    book_id: 'LUK', chapter: 15, vs: 11, ve: 32,
    context: 'A younger son demands his inheritance (essentially wishing his father dead), wastes it all, and ends up feeding pigs. He comes home rehearsing an apology. The father runs to him, throws a party. The older brother refuses to come in.',
    moment: 'This story has something to offend everyone. If you\'re the younger brother, it\'s about grace you don\'t deserve. If you\'re the older brother, it\'s about the anger you don\'t admit. The father runs — undignified, robe flying, sandals slapping — because love doesn\'t walk. Love sprints.',
    starters: JSON.stringify(["Which brother are you right now — the one who left or the one who resents?", "Why is the older brother's anger harder to see than the younger brother's rebellion?", "What does it mean that the father was watching the road?"]),
    deeper: 'The story ends without resolution — we never learn if the older brother comes in. Jesus leaves it open because He\'s talking to Pharisees (the older brothers). The invitation is still hanging: will you come to the party?',
    audience: 'family', minutes: 7, season: null, day: null,
    narrative: 'luk-prodigal-son',
    tags: [['forgiveness-tag', 'primary'], ['identity-tag', 'primary'], ['anger-tag', 'secondary'], ['relationships-tag', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 42
  {
    id: 'gos-the-party-nobody-expected-to-be-invited-to',
    title: 'The Party Nobody Expected to Be Invited To',
    book_id: 'LUK', chapter: 15, vs: 1, ve: 10,
    context: 'The Pharisees grumble: "This man welcomes sinners and eats with them." Jesus responds with parables of a lost sheep (left 99 to find 1) and a lost coin (swept the whole house). Both end with a party.',
    moment: 'The religious elite were scandalized that Jesus ate with "those people." His response: heaven literally throws a party when one person nobody wanted finds their way home. If the guest list offends you, you might not understand the host.',
    starters: JSON.stringify(["Who are 'those people' that make you uncomfortable?", "Why does Jesus leave 99 safe sheep for 1 lost one? Isn't that bad math?", "What does it feel like to be the 'found' one at a party thrown just for you?"]),
    deeper: 'The lost sheep wandered. The lost coin was dropped — it didn\'t lose itself. Some people are lost by their own choices; some are lost because life dropped them. Jesus searches for both.',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'luk-prodigal-son',
    tags: [['joy-tag', 'primary'], ['identity-tag', 'primary'], ['loneliness-tag', 'secondary'], ['gratitude-tag', 'secondary']]
  },

  // 43 - Adults
  {
    id: 'gos-the-rich-man-who-could-see-but-wouldnt-look',
    title: 'The Rich Man Who Could See but Wouldn\'t Look',
    book_id: 'LUK', chapter: 16, vs: 19, ve: 31,
    context: 'A rich man feasts daily while a beggar named Lazarus lies at his gate, covered in sores. Both die. Lazarus is comforted; the rich man is in agony. A great chasm separates them forever.',
    moment: 'The rich man didn\'t murder Lazarus. Didn\'t kick him. Didn\'t even notice him. That was the sin: Lazarus was at his gate every single day, and the rich man just... walked past. The most dangerous kind of evil isn\'t cruelty — it\'s comfortable indifference.',
    starters: JSON.stringify(["Who might be 'at your gate' that you walk past every day?", "Why is indifference more dangerous than outright hostility?", "What would change if you actually saw the people you currently step over?"]),
    deeper: 'The rich man is never named, but the beggar is — Lazarus (meaning "God helps"). In Jesus\'s stories, the unnamed are usually the powerful. Here, God knows the forgotten by name and forgets the famous.',
    audience: 'adults', minutes: 6, season: null, day: null,
    narrative: 'luk-rich-man-and-lazarus',
    tags: [['generosity-tag', 'primary'], ['suffering-tag', 'primary'], ['relationships-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 44 - Young children
  {
    id: 'gos-nine-out-of-ten-forgot',
    title: 'Nine Out of Ten Forgot',
    book_id: 'LUK', chapter: 17, vs: 11, ve: 19,
    context: 'Ten lepers beg Jesus for healing. He heals all ten. Only one comes back to say thank you — and he\'s a Samaritan, the outsider.',
    moment: 'Ten people got a miracle. One said thanks. You\'d think being healed of a disease that stole your life would make gratitude automatic. But it doesn\'t. Most people grab the gift and run. The one who came back got something the other nine missed: a relationship with the Healer, not just the healing.',
    starters: JSON.stringify(["When's the last time you forgot to say thank you for something big?", "Why do you think the nine didn't come back?", "What's the difference between getting a gift and knowing the giver?"]),
    deeper: 'Jesus says to the Samaritan: "Your faith has made you well" — a different word than the healing the other nine received. They were cured; he was made whole. Gratitude completes what healing begins.',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'luk-ten-lepers',
    tags: [['gratitude-tag', 'primary'], ['relationships-tag', 'secondary'], ['identity-tag', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 45
  {
    id: 'gos-the-crook-in-the-tree',
    title: 'The Crook in the Tree Who Got a Dinner Invitation',
    book_id: 'LUK', chapter: 19, vs: 1, ve: 10,
    context: 'Zacchaeus, a chief tax collector and a rich man who got wealthy by cheating his own people, climbs a sycamore tree to see Jesus. Jesus looks up and says: "I\'m coming to your house today."',
    moment: 'Nobody liked Zacchaeus. He was a traitor who got rich off his neighbors\' backs. Short guy, big reputation, zero friends. But he climbed a tree — a ridiculous, undignified, childlike thing to do. And Jesus picked him out of the crowd. Jesus doesn\'t wait for you to clean up your life before He invites Himself over.',
    starters: JSON.stringify(["Have you ever done something embarrassing because you desperately wanted to see something important?", "Why does Jesus go to the house of the town's most hated person?", "What does Zacchaeus's response (giving half his wealth away) tell you about what Jesus's presence does?"]),
    deeper: 'Zacchaeus doesn\'t just repent — he repays four times what he stole. That goes beyond the law. An encounter with Jesus doesn\'t just stop the bleeding; it creates extravagant restitution. What would "four times over" look like for your wrongs?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'luk-zacchaeus',
    tags: [['forgiveness-tag', 'primary'], ['generosity-tag', 'primary'], ['change', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 46
  {
    id: 'gos-walking-with-a-stranger-you-already-know',
    title: 'Walking with a Stranger You Already Know',
    book_id: 'LUK', chapter: 24, vs: 13, ve: 35,
    context: 'Two heartbroken followers walk to Emmaus after the crucifixion. A stranger joins them and explains the Scriptures. At dinner, He breaks bread and they recognize Him — it\'s Jesus. He vanishes.',
    moment: 'They walked seven miles with Jesus and didn\'t recognize Him. Sometimes God is walking right next to you in your worst moment and you can\'t see Him. Their eyes opened at the table, when bread was broken. Maybe God shows up most clearly in the ordinary — a meal, a conversation, a stranger\'s kindness.',
    starters: JSON.stringify(["Have you ever looked back and realized God was in a moment you didn't recognize at the time?", "Why does Jesus reveal Himself through breaking bread — something ordinary?", "They said their hearts were 'burning' while He talked. What makes your heart burn?"]),
    deeper: 'They invited the stranger in for dinner even though He could have walked on. Their hospitality became the context for revelation. What if the encounter you need with God depends on the invitation you extend?',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'luk-road-to-emmaus',
    tags: [['grief', 'primary'], ['doubt-tag', 'primary'], ['joy-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 47 - CHRISTMAS seasonal
  {
    id: 'gos-no-room-no-plan-no-problem',
    title: 'No Room, No Plan, No Problem',
    book_id: 'LUK', chapter: 2, vs: 1, ve: 7,
    context: 'A census forces Mary and Joseph to Bethlehem. No room at the inn. The Son of God is born in an animal shelter and laid in a feeding trough.',
    moment: 'God entered the world in the last place anyone would look — a barn, not a hospital; a trough, not a cradle; a village, not a capital. From day one, Jesus identified with people who don\'t have a place. If you\'ve ever felt like there\'s no room for you, you worship a God who knows exactly how that feels.',
    starters: JSON.stringify(["Have you ever felt like there was 'no room' for you somewhere?", "Why do you think God chose these humble circumstances for His Son?", "What does the manger say about what God values?"]),
    deeper: 'The word for "inn" (katalyma) can also mean "guest room." Joseph may have had family in Bethlehem who couldn\'t accommodate them. Even family resources can fail. But God works in the margins, not just the main room.',
    audience: 'family', minutes: 5, season: 'christmas', day: 358,
    narrative: 'luk-birth-of-jesus',
    tags: [['identity-tag', 'primary'], ['suffering-tag', 'secondary'], ['courage-tag', 'secondary'], ['change', 'secondary']]
  },

  // 48 - Teens
  {
    id: 'gos-the-goodbye-that-wasnt-sad',
    title: 'The Goodbye That Wasn\'t Sad',
    book_id: 'LUK', chapter: 24, vs: 50, ve: 53,
    context: 'Jesus blesses His disciples and is taken up to heaven. Surprisingly, they return to Jerusalem not with grief but "with great joy."',
    moment: 'Usually when someone you love leaves, you\'re devastated. But the disciples were full of joy. Not because they didn\'t care, but because they finally understood: His leaving wasn\'t an ending. It was a sending. He wasn\'t abandoning them — He was unleashing them.',
    starters: JSON.stringify(["Have you ever had a goodbye that felt more like a beginning?", "Why were the disciples joyful instead of sad?", "What does it mean that Jesus's departure empowered them?"]),
    deeper: 'Luke\'s Gospel begins and ends in the temple — starting with a priest who can\'t speak (Zechariah) and ending with disciples who can\'t stop praising. What changed between the bookends?',
    audience: 'teens', minutes: 5, season: null, day: null,
    narrative: 'luk-ascension',
    tags: [['joy-tag', 'primary'], ['change', 'primary'], ['courage-tag', 'secondary'], ['grief', 'secondary']]
  },

  // 49
  {
    id: 'gos-the-sending-that-changed-everything',
    title: 'The Day Jesus Said You\'re Not Ready — Now Go',
    book_id: 'MAT', chapter: 10, vs: 1, ve: 15,
    context: 'Jesus sends out twelve ordinary men — fishermen, a tax collector, a zealot — with authority to heal and preach. He tells them to take nothing for the journey: no money, no extra clothes, no backup plan.',
    moment: 'No training program. No certification. No emergency fund. Jesus sent unqualified people with nothing but His authority. If you\'re waiting until you feel ready to do something God is asking, you\'ll wait forever. He doesn\'t call the equipped; He equips the called.',
    starters: JSON.stringify(["What's something you feel 'not ready' for that God might be calling you to?", "Why did Jesus tell them to take nothing?", "What would it feel like to depend entirely on God for your next meal?"]),
    deeper: 'The instruction to "shake the dust off your feet" if rejected shows that the disciples\' job is to offer, not to force. Rejection isn\'t failure — it\'s redirection. How does that change how you handle being told no?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-sending-the-twelve',
    tags: [['work-calling', 'primary'], ['courage-tag', 'primary'], ['fear-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 50 - ADVENT seasonal
  {
    id: 'gos-the-foreigners-who-followed-a-star',
    title: 'The Foreigners Who Followed a Star',
    book_id: 'MAT', chapter: 2, vs: 1, ve: 12,
    context: 'Magi from the East follow a star to find the newborn King. They bring gold, frankincense, and myrrh. They bypass Herod on the way home, warned in a dream.',
    moment: 'The first people to worship Jesus from outside Israel were astrologers from a foreign land who followed a star. They didn\'t have the Bible. They didn\'t know the prophecies. They just saw a light and followed it. Sometimes the people with the least religious knowledge have the most spiritual hunger.',
    starters: JSON.stringify(["What 'star' is God using to lead you somewhere right now?", "Why did outsiders recognize Jesus before the religious leaders did?", "What gifts would you bring to Jesus if you met Him today?"]),
    deeper: 'Gold for a king, frankincense for a priest, myrrh for a burial. The gifts prophetically tell Jesus\'s whole story: royalty, worship, and death. Even at His birth, the cross casts a shadow.',
    audience: 'family', minutes: 5, season: 'advent', day: 356,
    narrative: 'mat-genealogy-and-birth',
    tags: [['courage-tag', 'primary'], ['identity-tag', 'secondary'], ['joy-tag', 'secondary'], ['gratitude-tag', 'secondary']]
  },

  // ============================================================
  // JOHN (15 devotionals)
  // ============================================================

  // 51
  {
    id: 'gos-in-the-beginning-was-a-person',
    title: 'In the Beginning Was a Person',
    book_id: 'JHN', chapter: 1, vs: 1, ve: 14,
    context: 'John\'s Gospel doesn\'t start with a birth story — it starts before time. "In the beginning was the Word, and the Word was with God, and the Word was God." Then: "The Word became flesh and dwelt among us."',
    moment: 'Before there were stars, before there was time, before there was anything — there was a conversation. God was never alone. And the Word that spoke everything into existence decided to become a baby who needed His diaper changed. The Creator entered the creation. That\'s either the craziest thing ever said or the most beautiful.',
    starters: JSON.stringify(["What does it mean that Jesus is the 'Word'?", "Why would the Creator of everything become a helpless baby?", "How does knowing Jesus existed before creation change how you see Him?"]),
    deeper: '"Dwelt among us" literally means "tabernacled" or "pitched His tent." God moved from a temple made of stone to a body made of flesh. Your body is the new temple. What does that change about how you treat it?',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'jhn-the-word-became-flesh',
    tags: [['identity-tag', 'primary'], ['joy-tag', 'secondary'], ['doubt-tag', 'secondary'], ['gratitude-tag', 'secondary']]
  },

  // 52 - Young children
  {
    id: 'gos-the-party-that-almost-ran-dry',
    title: 'The Party That Almost Ran Dry',
    book_id: 'JHN', chapter: 2, vs: 1, ve: 11,
    context: 'At a wedding in Cana, the wine runs out — a social disaster in that culture. Mary tells Jesus. He turns six stone jars of water (about 150 gallons) into the best wine anyone has ever tasted.',
    moment: 'Jesus\'s first miracle wasn\'t healing the sick or raising the dead. It was saving a party. He made sure a wedding didn\'t get ruined. That tells you something about what God cares about — not just survival, but celebration. Not just enough, but the best.',
    starters: JSON.stringify(["Does it surprise you that Jesus's first miracle was at a party?", "Why does God care about joy and celebration — not just serious spiritual stuff?", "When has God turned something embarrassing into something beautiful in your life?"]),
    deeper: 'The stone jars were used for Jewish purification rituals. Jesus fills religious containers with celebration wine. The old system of ritual purity is being replaced by the new wine of the gospel. What old structures is God filling with new purpose in your life?',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'jhn-wedding-at-cana',
    tags: [['joy-tag', 'primary'], ['generosity-tag', 'primary'], ['gratitude-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 53 - Adults
  {
    id: 'gos-the-nighttime-conversation-that-changed-theology',
    title: 'The Nighttime Conversation That Changed Theology',
    book_id: 'JHN', chapter: 3, vs: 1, ve: 17,
    context: 'Nicodemus, a Pharisee and member of the Jewish ruling council, comes to Jesus at night. Jesus tells him: "You must be born again." Nicodemus is confused. Jesus says: "God so loved the world that He gave His only Son."',
    moment: 'Nicodemus was the guy with all the credentials — education, position, respect. And he came at night because he was afraid of what people would think. The most famous verse in the Bible (John 3:16) was first spoken in a private conversation with a man too scared to be seen asking questions. Doubt doesn\'t disqualify you — it might be the beginning.',
    starters: JSON.stringify(["Why did Nicodemus come at night?", "Have you ever been afraid to ask a spiritual question publicly?", "What does 'born again' mean — not religiously, but honestly?"]),
    deeper: 'Jesus uses the image of Moses lifting up the serpent in the wilderness. The Israelites were saved by looking at the thing that was killing them. The cross works the same way — you\'re saved by staring at the worst thing that ever happened and finding life in it.',
    audience: 'adults', minutes: 6, season: null, day: null,
    narrative: 'jhn-nicodemus',
    tags: [['doubt-tag', 'primary'], ['identity-tag', 'primary'], ['courage-tag', 'secondary'], ['change', 'secondary']]
  },

  // 54
  {
    id: 'gos-the-woman-at-the-well-who-had-been-everything',
    title: 'The Woman Who Had Been Through Everything',
    book_id: 'JHN', chapter: 4, vs: 5, ve: 30,
    context: 'Jesus, a Jewish man, asks a Samaritan woman for water — breaking every social rule. She\'s been married five times and is living with a sixth man. Instead of shame, Jesus offers "living water." She becomes the first evangelist.',
    moment: 'She came to the well at noon — the hottest part of the day — because she didn\'t want to face the other women. She\'d arranged her whole life around avoiding people. And Jesus arranged His whole journey to meet her. He knew everything about her and still asked for a drink.',
    starters: JSON.stringify(["Have you ever avoided people because you were ashamed?", "Why does Jesus bring up her five marriages — is He shaming her or freeing her?", "What does it mean that the town believed because of HER testimony?"]),
    deeper: 'Jesus says true worship isn\'t about location (this mountain or that temple) but about "spirit and truth." The woman was trying to have a theological debate. Jesus says: it\'s not about being right — it\'s about being real.',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'jhn-woman-at-the-well',
    tags: [['identity-tag', 'primary'], ['loneliness-tag', 'primary'], ['forgiveness-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 55 - Young children
  {
    id: 'gos-the-man-who-was-born-for-a-miracle',
    title: 'The Man Who Was Born for a Miracle',
    book_id: 'JHN', chapter: 9, vs: 1, ve: 12,
    context: 'The disciples ask about a man born blind: "Who sinned — him or his parents?" Jesus says: "Neither. This happened so that God\'s works might be displayed." He makes mud, puts it on the man\'s eyes, and tells him to wash. He sees for the first time.',
    moment: 'Everyone saw this blind man and asked: whose fault is this? Jesus saw him and asked: what can God do with this? The worst thing about you might be the canvas for God\'s best work. Your struggle isn\'t your punishment — it might be your platform.',
    starters: JSON.stringify(["Have you ever assumed someone's suffering was their fault?", "How does it change things to see hard circumstances as a canvas for God's work?", "What 'blindness' in your life might God want to open?"]),
    deeper: 'The healed man is questioned, threatened, and kicked out of the synagogue for his testimony. Seeing clearly cost him his community. Sometimes the clearer you see, the more opposition you face. What has clarity cost you?',
    audience: 'young-children', minutes: 4, season: null, day: null,
    narrative: 'jhn-man-born-blind',
    tags: [['suffering-tag', 'primary'], ['identity-tag', 'primary'], ['courage-tag', 'secondary'], ['doubt-tag', 'secondary']]
  },

  // 56
  {
    id: 'gos-the-friend-who-showed-up-four-days-late',
    title: 'The Friend Who Showed Up Four Days Late',
    book_id: 'JHN', chapter: 11, vs: 1, ve: 44,
    context: 'Lazarus dies and Jesus waits two more days before coming. Martha says: "If you had been here, my brother wouldn\'t have died." Jesus weeps. Then He calls Lazarus out of the tomb.',
    moment: 'Jesus was late on purpose. He could have healed Lazarus from a distance, but He waited until the situation was completely, undeniably, four-days-dead impossible. Because God\'s timing isn\'t our timing, and His best work happens when we\'ve given up.',
    starters: JSON.stringify(["Have you ever felt like God showed up too late?", "Why did Jesus weep if He knew He was about to raise Lazarus?", "What's your 'four-day-dead' situation where you've given up hope?"]),
    deeper: '"Jesus wept" is the shortest verse in the Bible — and the deepest. He cries not because He\'s powerless but because He loves. He enters grief fully even though He holds the solution. What does it mean that God grieves WITH you, not just FOR you?',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'jhn-raising-of-lazarus',
    tags: [['grief', 'primary'], ['patience-tag', 'primary'], ['doubt-tag', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 57 - Teens
  {
    id: 'gos-when-the-teacher-grabbed-a-towel',
    title: 'When the Teacher Grabbed a Towel',
    book_id: 'JHN', chapter: 13, vs: 1, ve: 17,
    context: 'At the Last Supper, Jesus strips to a servant\'s outfit and washes His disciples\' filthy feet — including Judas\'s. Peter protests. Jesus insists: if I don\'t wash you, you have no part with me.',
    moment: 'The King of the universe, kneeling on a floor, scrubbing road filth off the feet of people who would abandon Him in hours. He washed the feet of His betrayer. Leadership, according to Jesus, looks nothing like power. It looks like a towel.',
    starters: JSON.stringify(["What's the most 'beneath you' task you could do for someone?", "Why did Jesus wash Judas's feet too?", "What does this say about what real leadership looks like?"]),
    deeper: 'Peter says "Never!" and Jesus says "Unless I wash you, you have no part with me." Peter then says "Wash all of me!" Peter swings from pride to excess — both miss the point. What does it look like to simply receive service?',
    audience: 'teens', minutes: 5, season: null, day: null,
    narrative: 'jhn-washing-feet',
    tags: [['generosity-tag', 'primary'], ['identity-tag', 'primary'], ['relationships-tag', 'secondary'], ['courage-tag', 'secondary']]
  },

  // 58
  {
    id: 'gos-stay-connected-or-dry-up',
    title: 'Stay Connected or Dry Up',
    book_id: 'JHN', chapter: 15, vs: 1, ve: 11,
    context: 'Jesus says: "I am the vine; you are the branches. If you remain in me, you will bear much fruit; apart from me you can do nothing." He\'s walking to the cross as He says this.',
    moment: 'A branch that breaks off a vine doesn\'t slowly decline — it dries up and dies. It\'s not about trying harder; it\'s about staying connected. You can\'t manufacture fruit by willpower. You grow fruit by staying attached to the source. The exhausting hustle of "doing more for God" is replaced by "stay close to God."',
    starters: JSON.stringify(["What does 'remaining in Jesus' look like on a normal Tuesday?", "Have you ever tried to produce 'spiritual fruit' by your own effort? How did that go?", "What disconnects you from the vine?"]),
    deeper: 'Jesus says the Father prunes branches that DO bear fruit — to make them bear more. Pruning is painful, and it happens to the fruitful, not the failing. What pruning is God doing in your life right now?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'jhn-the-vine',
    tags: [['rest-tag', 'primary'], ['identity-tag', 'primary'], ['patience-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 59 - Adults
  {
    id: 'gos-the-prayer-you-were-never-supposed-to-hear',
    title: 'The Prayer You Were Never Supposed to Hear',
    book_id: 'JHN', chapter: 17, vs: 1, ve: 26,
    context: 'Jesus prays aloud — not for Himself alone, but for His disciples and "for those who will believe through their message." That includes you. He prays for unity, protection, and joy.',
    moment: 'This is Jesus talking to His Father about you, by name, before He goes to die. He doesn\'t pray for your comfort or success. He prays for your unity, your joy, and that you would be protected from evil. If you want to know what Jesus cares about for your life, read His prayer list. It might surprise you.',
    starters: JSON.stringify(["How does it feel to know Jesus prayed specifically for YOU before the cross?", "He prays for unity — why is that so important to Jesus?", "What surprises you about what's NOT on His prayer list?"]),
    deeper: 'Jesus prays "that they may be one as we are one." The unity He envisions isn\'t organizational — it\'s relational, modeled on the Trinity. How does that change what "church unity" means to you?',
    audience: 'adults', minutes: 6, season: null, day: null,
    narrative: 'jhn-high-priestly-prayer',
    tags: [['relationships-tag', 'primary'], ['joy-tag', 'primary'], ['identity-tag', 'secondary'], ['courage-tag', 'secondary']]
  },

  // 60 - LENT seasonal
  {
    id: 'gos-what-is-truth-asked-the-man-staring-at-it',
    title: 'What Is Truth? Asked the Man Staring at It',
    book_id: 'JHN', chapter: 18, vs: 33, ve: 38,
    context: 'Pilate interrogates Jesus: "Are you a king?" Jesus says His kingdom is not of this world. "So you ARE a king?" "You say I am. I came to testify to the truth." Pilate asks: "What is truth?" — and walks away before Jesus can answer.',
    moment: 'Pilate asked the most important question in human history — "What is truth?" — and didn\'t wait for the answer. Truth was literally standing in front of him, bleeding and bound. We live in a world drowning in information and starving for truth. And truth isn\'t a concept — it\'s a Person.',
    starters: JSON.stringify(["How do you decide what's true in a world full of conflicting information?", "Why did Pilate walk away from his own question?", "What does it mean that truth is a Person, not just a set of facts?"]),
    deeper: 'Jesus says "Everyone on the side of truth listens to me." Truth isn\'t neutral — it has a side. And taking that side often means standing alone. What truth are you avoiding because it\'s inconvenient?',
    audience: 'family', minutes: 6, season: 'lent', day: 88,
    narrative: 'jhn-pilate-and-truth',
    tags: [['courage-tag', 'primary'], ['doubt-tag', 'primary'], ['identity-tag', 'secondary'], ['suffering-tag', 'secondary']]
  },

  // 61
  {
    id: 'gos-it-is-finished',
    title: 'It Is Finished — Not "I Am Finished"',
    book_id: 'JHN', chapter: 19, vs: 28, ve: 37,
    context: 'Jesus says "It is finished" (tetelestai) — a word meaning "paid in full," stamped on receipts when a debt was cleared. He bows His head and gives up His spirit.',
    moment: 'His last word wasn\'t "I failed." It wasn\'t "I\'m done." It was "It is FINISHED." Paid in full. Completed. Every debt, every failure, every sin — stamped "settled." This isn\'t a cry of defeat. It\'s a declaration of victory. Whatever you\'re still trying to pay for with guilt, it\'s already been paid.',
    starters: JSON.stringify(["What guilt are you still carrying that Jesus already paid for?", "What's the difference between 'I am finished' and 'It is finished'?", "How does 'paid in full' change how you see your mistakes?"]),
    deeper: 'John notes that blood and water flowed from Jesus\'s side — medically indicating death by cardiac arrest. Jesus literally died of a broken heart. The physical detail matters: this is not a metaphor. It happened.',
    audience: 'family', minutes: 6, season: null, day: null,
    narrative: 'jhn-crucifixion-john',
    tags: [['forgiveness-tag', 'primary'], ['suffering-tag', 'primary'], ['grief', 'secondary'], ['joy-tag', 'secondary']]
  },

  // 62
  {
    id: 'gos-the-voice-in-the-garden-that-said-her-name',
    title: 'The Voice in the Garden That Said Her Name',
    book_id: 'JHN', chapter: 20, vs: 11, ve: 18,
    context: 'Mary Magdalene stands weeping at the empty tomb. She sees someone she thinks is the gardener. He says one word: "Mary." She recognizes Him immediately. The risen Jesus appeared first to a woman whose testimony wouldn\'t have been accepted in court.',
    moment: 'She didn\'t recognize Him by sight. She recognized Him by how He said her name. There\'s someone who knows your name — not your résumé, not your reputation, not your mistakes — just your name. And the way He says it is how you know it\'s Him.',
    starters: JSON.stringify(["Have you ever recognized someone not by how they look but by how they make you feel?", "Why did Jesus appear first to Mary, not to Peter or John?", "What does it mean that Jesus calls you by name?"]),
    deeper: 'Mary calls Him "Rabboni" (my teacher) and tries to hold on. Jesus says "Don\'t cling to me — I haven\'t yet ascended." The relationship is changing — from physical presence to spiritual reality. What does it look like to love someone you can\'t hold?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'jhn-mary-at-the-tomb',
    tags: [['grief', 'primary'], ['joy-tag', 'primary'], ['identity-tag', 'secondary'], ['loneliness-tag', 'secondary']]
  },

  // 63
  {
    id: 'gos-the-honest-doubter-who-touched-the-wounds',
    title: 'The Honest Doubter Who Touched the Wounds',
    book_id: 'JHN', chapter: 20, vs: 24, ve: 29,
    context: 'Thomas wasn\'t there when Jesus appeared to the others. He says: "Unless I see the nail marks and put my finger where the nails were, I won\'t believe." A week later, Jesus appears and says: "Put your finger here."',
    moment: 'Thomas gets a bad rap. We call him "Doubting Thomas" like it\'s an insult. But he was honest about what he needed. And Jesus didn\'t scold him — He showed up and said: here are my hands. Touch them. Doubt isn\'t the opposite of faith. Pretending is.',
    starters: JSON.stringify(["What do you doubt about God right now — honestly?", "Why does Jesus show Thomas His wounds instead of just His glory?", "Is there a difference between honest doubt and stubborn unbelief?"]),
    deeper: 'Thomas\'s response is the highest declaration in the Gospels: "My Lord and my God!" The deepest doubt produced the highest worship. What if your biggest questions are leading you to the biggest breakthroughs?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'jhn-thomas-doubts',
    tags: [['doubt-tag', 'primary'], ['courage-tag', 'primary'], ['identity-tag', 'secondary'], ['relationships-tag', 'secondary']]
  },

  // 64 - Teens
  {
    id: 'gos-when-the-person-you-trusted-most-lets-you-down',
    title: 'When the Person You Trusted the Most Lets You Down',
    book_id: 'JHN', chapter: 21, vs: 15, ve: 19,
    context: 'Peter denied Jesus three times. Now the risen Jesus asks Peter three times: "Do you love me?" Each question heals a denial. Each answer restores a calling. "Feed my sheep."',
    moment: 'Peter swore he\'d die for Jesus. Then he denied even knowing Him — three times, to a servant girl. The guilt must have been crushing. But Jesus doesn\'t bring it up to shame him. He brings it up to heal it. Three denials. Three questions. Three restorations. Jesus matches His restoration to the exact shape of your failure.',
    starters: JSON.stringify(["Have you ever let someone down badly and wondered if you could be forgiven?", "Why does Jesus ask three times — isn't once enough?", "What does it mean that Jesus gave Peter a job AFTER his worst failure?"]),
    deeper: 'The word for "love" shifts. Jesus first asks "Do you agape (unconditionally) love me?" Peter answers with "I philia (friendly) love you." He\'s done making promises he can\'t keep. And Jesus accepts the honest answer. Authenticity matters more than aspiration.',
    audience: 'teens', minutes: 6, season: null, day: null,
    narrative: 'jhn-peter-restored',
    tags: [['forgiveness-tag', 'primary'], ['failure', 'primary'], ['relationships-tag', 'secondary'], ['identity-tag', 'secondary']]
  },

  // 65
  {
    id: 'gos-the-triumphal-entry-that-wasnt',
    title: 'The Parade That Made the King Cry',
    book_id: 'MAT', chapter: 21, vs: 1, ve: 11,
    context: 'Jesus rides into Jerusalem on a donkey while crowds wave palm branches and shout "Hosanna!" Luke adds that Jesus wept over the city as He approached.',
    moment: 'Everyone thought it was a victory parade. Crowds cheering, coats on the ground, palm branches waving. But Jesus was riding toward His death, and He knew it. The same crowd shouting "Hosanna" would shout "Crucify" five days later. Jesus cried because He saw what they couldn\'t: the difference between what they wanted and what they needed.',
    starters: JSON.stringify(["Have you ever celebrated something that turned out differently than you expected?", "Why did Jesus choose a donkey instead of a war horse?", "What's the difference between what you want from God and what you need?"]),
    deeper: 'Zechariah 9:9 prophesied a king coming on a donkey — a symbol of peace, not war. The crowd wanted a military liberator. Jesus offered something better and harder: inner liberation. What liberation do you actually need?',
    audience: 'family', minutes: 5, season: null, day: null,
    narrative: 'mat-triumphal-entry',
    tags: [['grief', 'primary'], ['patience-tag', 'secondary'], ['identity-tag', 'secondary'], ['courage-tag', 'secondary']]
  }
];

// Build arrays
const DEVS = [];
const TAGS = [];

for (const d of devotionals) {
  DEVS.push([
    d.id, d.title, d.book_id, d.chapter, d.vs, d.ve,
    d.context, d.moment, d.starters, d.deeper,
    d.audience, d.minutes, d.season, d.day,
    d.narrative, 'ai_assisted', 'Claude gospel devotional generation 2026-04-03',
    now
  ]);
  for (const [tagId, relevance] of d.tags) {
    TAGS.push([d.id, tagId, relevance]);
  }
}

console.log(`Prepared ${DEVS.length} devotionals and ${TAGS.length} tags`);

// Validate audience mix
const audienceCounts = {};
for (const d of devotionals) {
  audienceCounts[d.audience] = (audienceCounts[d.audience] || 0) + 1;
}
console.log('Audience mix:', JSON.stringify(audienceCounts));

// Validate seasonal
const seasonCounts = {};
for (const d of devotionals) {
  if (d.season) seasonCounts[d.season] = (seasonCounts[d.season] || 0) + 1;
}
console.log('Seasonal mix:', JSON.stringify(seasonCounts));

// Validate book distribution
const bookCounts = {};
for (const d of devotionals) {
  bookCounts[d.book_id] = (bookCounts[d.book_id] || 0) + 1;
}
console.log('Book distribution:', JSON.stringify(bookCounts));

// Insert
const batch = db.transaction((devs, tags) => {
  for (const d of devs) ins.run(...d);
  for (const t of tags) tagIns.run(...t);
});

batch(DEVS, TAGS);
console.log('Inserted successfully!');

// Verify
const count = db.prepare("SELECT COUNT(*) as c FROM devotionals WHERE narrative_id IN (SELECT id FROM narrative_units WHERE book_id IN ('MAT','MRK','LUK','JHN'))").get();
console.log(`Total gospel devotionals in DB: ${count.c}`);

const tagCount = db.prepare("SELECT COUNT(*) as c FROM devotional_tag_map WHERE devotional_id LIKE 'gos-%'").get();
console.log(`Total gospel tag mappings in DB: ${tagCount.c}`);

db.close();
