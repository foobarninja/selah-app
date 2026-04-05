// 20-generate-devotional-tags.ts — Insert devotional tag taxonomy
import { db, heading, log } from './db'

interface TagRecord {
  id: string
  name: string
  category: string
  icon: string | null
  parentTagId: string | null
  description: string
  sortOrder: number
}

const TAGS: TagRecord[] = [
  // === LIFE SITUATIONS (top-level, 20) ===
  { id: 'stress', name: 'Stress & Anxiety', category: 'life-situation', icon: null, parentTagId: null, description: 'When worry keeps you up at night or the pressure feels unmanageable', sortOrder: 10 },
  { id: 'grief', name: 'Grief & Loss', category: 'life-situation', icon: null, parentTagId: null, description: 'When someone or something important is gone and the absence is heavy', sortOrder: 20 },
  { id: 'fear-tag', name: 'Fear & Uncertainty', category: 'life-situation', icon: null, parentTagId: null, description: 'When the future feels threatening and you cannot see the path forward', sortOrder: 30 },
  { id: 'anger-tag', name: 'Anger & Frustration', category: 'life-situation', icon: null, parentTagId: null, description: 'When injustice or betrayal has your blood boiling', sortOrder: 40 },
  { id: 'loneliness-tag', name: 'Loneliness & Isolation', category: 'life-situation', icon: null, parentTagId: null, description: 'When you feel unseen, disconnected, or like nobody understands', sortOrder: 50 },
  { id: 'doubt-tag', name: 'Doubt & Questions', category: 'life-situation', icon: null, parentTagId: null, description: 'When faith feels shaky and the honest questions need space', sortOrder: 60 },
  { id: 'gratitude-tag', name: 'Gratitude & Celebration', category: 'life-situation', icon: null, parentTagId: null, description: 'When something good has happened and you want to mark it', sortOrder: 70 },
  { id: 'forgiveness-tag', name: 'Forgiveness & Reconciliation', category: 'life-situation', icon: null, parentTagId: null, description: 'When a relationship is broken and you are deciding whether to rebuild', sortOrder: 80 },
  { id: 'identity-tag', name: 'Identity & Purpose', category: 'life-situation', icon: null, parentTagId: null, description: 'When you are asking who you are, why you are here, and what matters', sortOrder: 90 },
  { id: 'patience-tag', name: 'Waiting & Patience', category: 'life-situation', icon: null, parentTagId: null, description: 'When the answer has not come and the timeline is not yours to set', sortOrder: 100 },
  { id: 'change', name: 'Change & Transition', category: 'life-situation', icon: null, parentTagId: null, description: 'When life is shifting and nothing feels settled yet', sortOrder: 110 },
  { id: 'failure', name: 'Failure & Shame', category: 'life-situation', icon: null, parentTagId: null, description: 'When you messed up and the weight of it is crushing', sortOrder: 120 },
  { id: 'temptation-tag', name: 'Temptation & Struggle', category: 'life-situation', icon: null, parentTagId: null, description: 'When you know what you should do but the pull in the other direction is strong', sortOrder: 130 },
  { id: 'relationships-tag', name: 'Relationships', category: 'life-situation', icon: null, parentTagId: null, description: 'When the people closest to you are the hardest to navigate', sortOrder: 140 },
  { id: 'work-calling', name: 'Work & Calling', category: 'life-situation', icon: null, parentTagId: null, description: 'When your job, purpose, or daily grind needs perspective', sortOrder: 150 },
  { id: 'suffering-tag', name: 'Suffering & Pain', category: 'life-situation', icon: null, parentTagId: null, description: 'When life hurts and no one can explain why', sortOrder: 160 },
  { id: 'joy-tag', name: 'Joy & Contentment', category: 'life-situation', icon: null, parentTagId: null, description: 'When you want to cultivate gladness even in ordinary days', sortOrder: 170 },
  { id: 'courage-tag', name: 'Courage & Standing Firm', category: 'life-situation', icon: null, parentTagId: null, description: 'When doing the right thing requires you to stand alone', sortOrder: 180 },
  { id: 'rest-tag', name: 'Rest & Sabbath', category: 'life-situation', icon: null, parentTagId: null, description: 'When you need permission to stop, breathe, and be still', sortOrder: 190 },
  { id: 'generosity-tag', name: 'Generosity & Giving', category: 'life-situation', icon: null, parentTagId: null, description: 'When you are thinking about what you have and what you could share', sortOrder: 200 },

  // === LIFE SITUATION CHILDREN (14) ===
  { id: 'new-baby', name: 'New Baby', category: 'life-situation', icon: null, parentTagId: 'relationships-tag', description: 'When a family is expanding and everything is changing', sortOrder: 141 },
  { id: 'sibling-conflict', name: 'Sibling Conflict', category: 'life-situation', icon: null, parentTagId: 'relationships-tag', description: 'When brothers or sisters are at war', sortOrder: 142 },
  { id: 'marriage-struggle', name: 'Marriage Struggle', category: 'life-situation', icon: null, parentTagId: 'relationships-tag', description: 'When the closest relationship feels the most distant', sortOrder: 143 },
  { id: 'friendship-trouble', name: 'Friendship Trouble', category: 'life-situation', icon: null, parentTagId: 'relationships-tag', description: 'When a friend has hurt you or you have hurt a friend', sortOrder: 144 },
  { id: 'bullying', name: 'Bullying', category: 'life-situation', icon: null, parentTagId: 'relationships-tag', description: 'When someone is being targeted', sortOrder: 145 },
  { id: 'moving', name: 'Moving', category: 'life-situation', icon: null, parentTagId: 'change', description: 'When everything familiar is being left behind', sortOrder: 111 },
  { id: 'new-school', name: 'New School', category: 'life-situation', icon: null, parentTagId: 'change', description: 'First day nerves, new faces, trying to figure out where you fit', sortOrder: 112 },
  { id: 'divorce', name: 'Divorce in the Family', category: 'life-situation', icon: null, parentTagId: 'change', description: 'When the family is splitting and nobody asked the kids', sortOrder: 113 },
  { id: 'death-of-loved-one', name: 'Death of a Loved One', category: 'life-situation', icon: null, parentTagId: 'grief', description: 'When someone who mattered deeply is gone', sortOrder: 21 },
  { id: 'pet-loss', name: 'Loss of a Pet', category: 'life-situation', icon: null, parentTagId: 'grief', description: 'When the empty bed reminds you of who is missing', sortOrder: 22 },
  { id: 'health-crisis', name: 'Health Crisis', category: 'life-situation', icon: null, parentTagId: 'suffering-tag', description: 'When someone in the family is sick and the future is uncertain', sortOrder: 161 },
  { id: 'financial-stress', name: 'Financial Stress', category: 'life-situation', icon: null, parentTagId: 'stress', description: 'When the money is tight and the bills do not care', sortOrder: 11 },
  { id: 'comparison', name: 'Comparison & Envy', category: 'life-situation', icon: null, parentTagId: 'identity-tag', description: 'When everyone else seems to have what you want', sortOrder: 91 },
  { id: 'apologizing', name: 'Learning to Apologize', category: 'life-situation', icon: null, parentTagId: 'forgiveness-tag', description: 'When you need to say sorry and mean it', sortOrder: 81 },

  // === FAMILY MOMENTS (5) ===
  { id: 'bedtime', name: 'Bedtime', category: 'family-moment', icon: null, parentTagId: null, description: 'Short, calming devotionals for winding down the day together', sortOrder: 10 },
  { id: 'mealtime', name: 'Mealtime', category: 'family-moment', icon: null, parentTagId: null, description: 'Quick conversation starters for the dinner table', sortOrder: 20 },
  { id: 'morning', name: 'Morning', category: 'family-moment', icon: null, parentTagId: null, description: 'Starting the day with intention before the rush begins', sortOrder: 30 },
  { id: 'car-ride', name: 'Car Ride', category: 'family-moment', icon: null, parentTagId: null, description: 'For the captive audience in the back seat', sortOrder: 40 },
  { id: 'family-meeting', name: 'Family Meeting', category: 'family-moment', icon: null, parentTagId: null, description: 'When the whole family needs to talk about something real', sortOrder: 50 },

  // === SEASONS (8) ===
  { id: 'advent', name: 'Advent', category: 'season', icon: null, parentTagId: null, description: 'The four weeks before Christmas - waiting, hoping, preparing', sortOrder: 10 },
  { id: 'christmas', name: 'Christmas', category: 'season', icon: null, parentTagId: null, description: 'The celebration of incarnation - God entering the mess', sortOrder: 20 },
  { id: 'lent', name: 'Lent', category: 'season', icon: null, parentTagId: null, description: 'Forty days of reflection, repentance, and preparation for Easter', sortOrder: 30 },
  { id: 'easter', name: 'Easter', category: 'season', icon: null, parentTagId: null, description: 'Resurrection - death is not the last word', sortOrder: 40 },
  { id: 'thanksgiving-season', name: 'Thanksgiving', category: 'season', icon: null, parentTagId: null, description: 'Cultivating gratitude in a culture of complaint', sortOrder: 50 },
  { id: 'new-year', name: 'New Year', category: 'season', icon: null, parentTagId: null, description: 'Fresh starts, new commitments, courage to begin again', sortOrder: 60 },
  { id: 'back-to-school', name: 'Back to School', category: 'season', icon: null, parentTagId: null, description: 'New classrooms, new friendships, new challenges', sortOrder: 70 },
  { id: 'summer', name: 'Summer', category: 'season', icon: null, parentTagId: null, description: 'Longer days, slower pace, space to breathe', sortOrder: 80 },

  // === AUDIENCE (4) ===
  { id: 'young-children', name: 'Young Children (4-7)', category: 'audience', icon: null, parentTagId: null, description: 'Simple, concrete, no abstract theology', sortOrder: 10 },
  { id: 'family-audience', name: 'Family (7+)', category: 'audience', icon: null, parentTagId: null, description: 'The default - accessible to kids, substantial for adults', sortOrder: 20 },
  { id: 'teens', name: 'Teens (13-18)', category: 'audience', icon: null, parentTagId: null, description: 'Can handle complexity, social dynamics, identity questions', sortOrder: 30 },
  { id: 'adults', name: 'Adults', category: 'audience', icon: null, parentTagId: null, description: 'Full depth - systemic injustice, moral complexity, doubt, suffering', sortOrder: 40 },
]

function main(): void {
  heading('Generating Devotional Tags')

  const insert = db.prepare(`
    INSERT OR IGNORE INTO devotional_tags (id, name, category, icon, parent_tag_id, description, sort_order)
    VALUES (@id, @name, @category, @icon, @parentTagId, @description, @sortOrder)
  `)

  const batch = db.transaction((tags: TagRecord[]) => {
    for (const t of tags) insert.run(t)
  })

  batch(TAGS)

  const count = (db.prepare('SELECT COUNT(*) as c FROM devotional_tags').get() as { c: number }).c
  log(`${count} devotional tags inserted`)

  const byCat = db.prepare('SELECT category, COUNT(*) as c FROM devotional_tags GROUP BY category ORDER BY c DESC').all() as { category: string; c: number }[]
  for (const row of byCat) log(`  ${row.category}: ${row.c}`)

  const topLevel = (db.prepare('SELECT COUNT(*) as c FROM devotional_tags WHERE parent_tag_id IS NULL').get() as { c: number }).c
  log(`  top-level: ${topLevel}, children: ${count - topLevel}`)

  db.close()
}

main()
