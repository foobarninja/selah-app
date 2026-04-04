#!/usr/bin/env node
const db = require('better-sqlite3')('data/selah.db');

const ins = db.prepare(
  'INSERT OR IGNORE INTO character_relationships (character_a, character_b, relationship, description, source_tier) VALUES (?,?,?,?,?)'
);
const batch = db.transaction((rows) => {
  for (const r of rows) ins.run(...r);
});

const relationships = [
  // ============================================================
  // PATRIARCHAL ERA — FAMILY OF ADAM
  // ============================================================
  ['adam', 'eve', 'spouse', 'The first couple, whose shared transgression redefined the human condition and bound them in both guilt and promise', 'canon'],
  ['adam', 'cain', 'parent', 'Father whose firstborn became the first murderer — the original rupture between generations', 'canon'],
  ['adam', 'abel', 'parent', 'Father of the first martyr, whose death introduced humanity to the grief of losing a child to violence', 'canon'],
  ['eve', 'cain', 'parent', 'Mother of the first murderer, who declared at his birth that she had "acquired a man from the LORD"', 'canon'],
  ['eve', 'abel', 'parent', 'Mother who lost her second son to fratricide — the first woman to know the anguish of burial', 'canon'],
  ['cain', 'abel', 'sibling', 'Brothers whose rival offerings created the archetype of jealousy — Cain murdered Abel when God favored his sacrifice', 'canon'],
  ['adam', 'eve', 'ally', 'United in both transgression and the painful task of building civilization east of Eden after expulsion', 'canon'],

  // ============================================================
  // NOAH
  // ============================================================
  ['noah', 'shem', 'parent', 'Father of the blessed son through whom the messianic line continues — Shem reverently covered his drunken father', 'canon'],
  ['adam', 'noah', 'grandparent', 'Distant ancestor — ten generations separate them, yet both stand as new beginnings for the human race', 'canon'],
  ['enoch', 'noah', 'grandparent', 'Great-grandfather via Methuselah — the line of the man who walked with God led to the man who saved creation', 'canon'],
  ['shem', 'abraham', 'grandparent', 'Ancestor through whom Noah\'s blessing passed to Abraham — some traditions identify Shem with Melchizedek', 'canon'],
  ['noah', 'nimrod', 'grandparent', 'Great-grandfather of the mighty hunter who founded Babel — Noah\'s line produced both faith and rebellion', 'canon'],

  // ============================================================
  // ABRAHAM'S CIRCLE
  // ============================================================
  ['abraham', 'sarah', 'spouse', 'Partners in faith and deception — she laughed at God\'s promise and he twice passed her off as his sister', 'canon'],
  ['abraham', 'hagar', 'master', 'Master who took his wife\'s Egyptian slave as concubine at Sarah\'s urging, then let Sarah drive her into the desert', 'canon'],
  ['abraham', 'ishmael', 'parent', 'Father who loved his firstborn but sent him into the wilderness at God\'s command to protect the covenant line', 'canon'],
  ['abraham', 'isaac', 'parent', 'Father willing to sacrifice his miracle son on Moriah — the supreme test of faith that defined both their lives', 'canon'],
  ['abraham', 'lot', 'uncle', 'Uncle who rescued Lot from captivity in war yet could not save him from choosing Sodom\'s doomed prosperity', 'canon'],
  ['lot', 'abraham', 'nephew', 'Nephew who chose the well-watered plain of Sodom over staying with his uncle, a decision that cost him everything', 'canon'],
  ['sarah', 'hagar', 'rival', 'Mistress and slave locked in a jealous power struggle over whose son would be Abraham\'s true heir', 'canon'],
  ['sarah', 'isaac', 'parent', 'Mother who laughed in disbelief at the promise, then named her miracle son "Laughter" when he arrived in her old age', 'canon'],
  ['sarah', 'ishmael', 'rival', 'Sarah demanded the expulsion of Hagar\'s son to protect Isaac\'s inheritance, splitting Abraham\'s household permanently', 'canon'],
  ['hagar', 'ishmael', 'parent', 'Slave mother who raised her son alone in the desert after expulsion, sustained by an angel\'s promise of nationhood', 'canon'],
  ['isaac', 'ishmael', 'sibling', 'Half-brothers separated in childhood — one the child of promise, the other of impatience — reunited only to bury their father', 'canon'],
  ['abraham', 'melchizedek', 'ally', 'The mysterious priest-king of Salem blessed Abraham after battle, receiving a tenth of the spoils in return', 'canon'],
  ['melchizedek', 'abraham', 'priest-to', 'Priest of God Most High who blessed Abraham with bread and wine, prefiguring a priesthood older than Levi\'s', 'canon'],
  ['abraham', 'nimrod', 'enemy', 'Tradition holds Nimrod as the tyrant of Babel who opposed Abraham\'s monotheism — empire versus covenant faith', 'scholarship'],
  ['abraham', 'pharaoh-of-joseph', 'ally', 'Abraham\'s distant descendant Joseph would serve this Pharaoh, but Abraham himself dealt with an earlier Egyptian king', 'scholarship'],

  // ============================================================
  // ISAAC'S FAMILY
  // ============================================================
  ['isaac', 'rebekah', 'spouse', 'A love match arranged by a servant\'s prayer — she became the mastermind who redirected the blessing to her favored son', 'canon'],
  ['isaac', 'esau', 'parent', 'Father who favored his rough outdoorsy firstborn, only to be deceived by wife and younger son on his deathbed', 'canon'],
  ['isaac', 'jacob', 'parent', 'Father tricked into giving his irrevocable blessing to the wrong son — a pivotal moment that shaped Israel\'s destiny', 'canon'],
  ['rebekah', 'esau', 'parent', 'Mother who overlooked her firstborn entirely, engineering an elaborate deception to steal his blessing for Jacob', 'canon'],
  ['rebekah', 'jacob', 'parent', 'Mother who loved Jacob enough to scheme against her own husband, risking a curse upon herself to secure the blessing', 'canon'],
  ['rebekah', 'laban', 'sibling', 'Sister of the trickster Laban — cunning seems to have run in the family from Paddan-aram', 'canon'],
  ['esau', 'jacob', 'sibling', 'Twin brothers whose rivalry began in the womb — Esau sold his birthright for stew, then lost his blessing to disguise', 'canon'],
  ['esau', 'jacob', 'rival', 'Rivals from birth who reconciled with tears and embraces after twenty years of estrangement and fear', 'canon'],
  ['esau', 'ishmael', 'in-law', 'Esau married Ishmael\'s daughter Mahalath, allying the two dispossessed sons of Abraham\'s line', 'canon'],
  ['rebekah', 'abraham', 'in-law', 'Daughter-in-law chosen by Abraham\'s servant at a well — her decisive character proved a match for the family\'s calling', 'canon'],
  ['isaac', 'abraham', 'child', 'Son who carried the wood for his own sacrifice and never forgot it — the binding shaped his passive, inward character', 'canon'],

  // ============================================================
  // JACOB'S CIRCLE
  // ============================================================
  ['jacob', 'rachel', 'spouse', 'The great love of Jacob\'s life — he worked fourteen years for her hand and mourned her roadside death forever', 'canon'],
  ['jacob', 'leah', 'spouse', 'The unloved wife given by deception, yet she bore six sons and a daughter, becoming mother of both priests and kings', 'canon'],
  ['jacob', 'bilhah', 'master', 'Rachel\'s handmaid given to Jacob as surrogate, bearing Dan and Naphtali on Rachel\'s behalf', 'canon'],
  ['jacob', 'zilpah', 'master', 'Leah\'s handmaid given to Jacob in the fertility competition, bearing Gad and Asher', 'canon'],
  ['jacob', 'laban', 'nephew', 'Nephew exploited by his uncle for twenty years of labor — the trickster Jacob finally met someone more cunning', 'canon'],
  ['laban', 'jacob', 'uncle', 'Uncle who tricked Jacob with a wedding-night bride swap and changed his wages ten times, yet lost everything', 'canon'],
  ['laban', 'rachel', 'parent', 'Father who used Rachel as leverage to extract fourteen years of labor from a lovesick Jacob', 'canon'],
  ['laban', 'leah', 'parent', 'Father who substituted Leah on Jacob\'s wedding night, condemning her to a marriage where she was second choice', 'canon'],
  ['rachel', 'leah', 'sibling', 'Sisters trapped in a painful rivalry for their shared husband — Leah had sons, Rachel had Jacob\'s heart', 'canon'],
  ['rachel', 'leah', 'rival', 'Competing wives whose bitter fertility contest inadvertently produced the twelve tribes of Israel', 'canon'],
  ['jacob', 'esau', 'ally', 'After wrestling with God at Peniel, Jacob bowed seven times before Esau and the brothers reconciled in tears', 'canon'],

  // ============================================================
  // JACOB'S CHILDREN — parent relationships
  // ============================================================
  ['jacob', 'joseph-son-of-jacob', 'parent', 'Father who loved Rachel\'s firstborn above all others, giving him the coat that ignited his brothers\' murderous jealousy', 'canon'],
  ['jacob', 'judah-son-of-jacob', 'parent', 'Father of the son who emerged as leader and ancestor of David\'s royal line despite early moral failures', 'canon'],
  ['jacob', 'reuben', 'parent', 'Father whose firstborn lost the birthright for the sin of lying with his father\'s concubine Bilhah', 'canon'],
  ['jacob', 'simeon-son-of-jacob', 'parent', 'Father of the son who, with Levi, massacred Shechem — an act Jacob cursed on his deathbed', 'canon'],
  ['jacob', 'levi-son-of-jacob', 'parent', 'Father of the violent avenger of Dinah, whose descendants would paradoxically become Israel\'s priestly tribe', 'canon'],
  ['jacob', 'benjamin', 'parent', 'Father who clung to his youngest — the last surviving son of Rachel — refusing to risk losing him in Egypt', 'canon'],
  ['jacob', 'dinah', 'parent', 'Father of the daughter whose assault at Shechem triggered a brutal reprisal that made his family odious to neighbors', 'canon'],
  ['rachel', 'joseph-son-of-jacob', 'parent', 'Mother of the dreamer — her death giving birth to Benjamin left Joseph as the living memory of Jacob\'s great love', 'canon'],
  ['rachel', 'benjamin', 'parent', 'Mother who died in childbirth naming him Ben-oni ("son of my sorrow"); Jacob renamed him Benjamin ("son of my right hand")', 'canon'],
  ['leah', 'judah-son-of-jacob', 'parent', 'Mother of the son through whom the royal messianic line would descend, despite Leah being the unloved wife', 'canon'],
  ['leah', 'reuben', 'parent', 'Mother whose firstborn brought her mandrakes from the field, traded to Rachel for a night with Jacob', 'canon'],
  ['leah', 'simeon-son-of-jacob', 'parent', 'Mother who named him "heard" because the LORD heard she was unloved and opened her womb again', 'canon'],
  ['leah', 'levi-son-of-jacob', 'parent', 'Mother of the future priestly tribe, named "attached" in hope that bearing three sons would finally win Jacob\'s love', 'canon'],
  ['leah', 'dinah', 'parent', 'Mother of Jacob\'s only named daughter, whose story reveals the vulnerability of women in the patriarchal world', 'canon'],
  ['bilhah', 'dinah', 'ally', 'Handmaid in Jacob\'s household alongside Dinah — both women navigating a world controlled by patriarchs', 'scholarship'],

  // ============================================================
  // BROTHERS' DYNAMICS
  // ============================================================
  ['joseph-son-of-jacob', 'reuben', 'sibling', 'Reuben tried to save Joseph from the murder plot, planning to secretly return him to their father', 'canon'],
  ['joseph-son-of-jacob', 'judah-son-of-jacob', 'sibling', 'Judah proposed selling Joseph into slavery instead of killing him — a cruel mercy that changed history', 'canon'],
  ['joseph-son-of-jacob', 'benjamin', 'sibling', 'Full brothers through Rachel — Joseph wept openly when he saw Benjamin in Egypt after decades apart', 'canon'],
  ['joseph-son-of-jacob', 'simeon-son-of-jacob', 'sibling', 'Joseph detained Simeon as hostage in Egypt, possibly singling out the most violent brother', 'canon'],
  ['reuben', 'judah-son-of-jacob', 'sibling', 'Rival eldest sons — Reuben lost the birthright through sin, and leadership passed to Judah', 'canon'],
  ['reuben', 'simeon-son-of-jacob', 'sibling', 'Brothers who both fell from favor — Reuben for defiling Bilhah, Simeon for the Shechem massacre', 'canon'],
  ['reuben', 'benjamin', 'sibling', 'Reuben pledged his own two sons as surety to persuade Jacob to let Benjamin go to Egypt', 'canon'],
  ['simeon-son-of-jacob', 'levi-son-of-jacob', 'sibling', 'Brothers united in violence at Shechem, jointly cursed by Jacob for their fierce and cruel anger', 'canon'],
  ['simeon-son-of-jacob', 'dinah', 'sibling', 'Brother who avenged Dinah\'s assault with a massacre, driven by rage that Jacob could not condone', 'canon'],
  ['levi-son-of-jacob', 'dinah', 'sibling', 'Brother who joined Simeon in the violent reprisal for Dinah\'s honor at Shechem', 'canon'],
  ['judah-son-of-jacob', 'benjamin', 'sibling', 'Judah\'s impassioned plea to Joseph on Benjamin\'s behalf is one of the most moving speeches in Genesis', 'canon'],
  ['judah-son-of-jacob', 'tamar-genesis', 'in-law', 'Judah unknowingly slept with his widowed daughter-in-law who tricked him to secure her right to offspring', 'canon'],

  // ============================================================
  // JOSEPH IN EGYPT
  // ============================================================
  ['joseph-son-of-jacob', 'potiphar', 'servant', 'Slave who rose to manage his master\'s entire household, only to be imprisoned on a false accusation', 'canon'],
  ['potiphar', 'joseph-son-of-jacob', 'master', 'Egyptian captain who trusted Joseph with everything until his wife\'s lie sent Joseph to prison', 'canon'],
  ['joseph-son-of-jacob', 'potiphars-wife', 'enemy', 'She attempted to seduce him daily; when he fled leaving his cloak, she weaponized the evidence against him', 'canon'],
  ['potiphar', 'potiphars-wife', 'spouse', 'Husband who believed his wife\'s accusation over his most trusted slave, ending Joseph\'s tenure in his house', 'canon'],
  ['joseph-son-of-jacob', 'pharaoh-of-joseph', 'ally', 'Prisoner-turned-vizier who interpreted Pharaoh\'s dreams and saved Egypt from famine, earning absolute trust', 'canon'],
  ['pharaoh-of-joseph', 'joseph-son-of-jacob', 'king', 'Pharaoh who elevated a Hebrew prisoner to second-in-command over all Egypt based on God-given dream interpretation', 'canon'],
  ['joseph-son-of-jacob', 'asenath', 'spouse', 'Egyptian wife given by Pharaoh — she bore Ephraim and Manasseh, grafting Egyptian blood into Israel\'s tribes', 'canon'],
  ['joseph-son-of-jacob', 'jacob', 'child', 'The favored son who rose from pit to palace, then revealed himself to his starving family with tears and forgiveness', 'canon'],
  ['judah-son-of-jacob', 'jacob', 'child', 'Son who grew from the man who sold his brother into the one who offered himself as slave to save Benjamin', 'canon'],

  // ============================================================
  // JOB'S CIRCLE
  // ============================================================
  ['job', 'eliphaz', 'ally', 'Friend who came to comfort Job but ended up accusing him of hidden sin to explain God\'s punishment', 'canon'],
  ['job', 'bildad', 'ally', 'Friend whose rigid retribution theology insisted Job must have sinned, offering orthodoxy instead of compassion', 'canon'],
  ['job', 'zophar', 'ally', 'The bluntest of Job\'s friends, who openly accused him of deserving far worse than he got', 'canon'],
  ['job', 'elihu', 'rival', 'Young challenger who rebuked both Job and his friends with a theology of divine discipline and refining fire', 'canon'],
  ['job', 'satan-accuser', 'enemy', 'The Accuser wagered that Job\'s faith was transactional — strip away blessing and he would curse God to His face', 'canon'],
  ['eliphaz', 'bildad', 'ally', 'Fellow comforter of Job who shared the retribution theology — suffering must always imply guilt', 'scholarship'],
  ['eliphaz', 'zophar', 'ally', 'Fellow comforter united in the conviction that the righteous never suffer without hidden cause', 'scholarship'],
  ['bildad', 'zophar', 'ally', 'Fellow comforter whose increasingly harsh accusations revealed the cruelty of formulaic theology', 'scholarship'],
  ['elihu', 'eliphaz', 'rival', 'Elihu waited for the three elders to finish, then declared them all wrong — suffering can be pedagogy, not punishment', 'canon'],

  // ============================================================
  // EXODUS ERA — MOSES' FAMILY
  // ============================================================
  ['moses', 'aaron', 'sibling', 'Brothers who together confronted Pharaoh — Moses the reluctant prophet, Aaron the eloquent spokesman', 'canon'],
  ['moses', 'miriam', 'sibling', 'Sister who watched his basket in the Nile and later led Israel in song, but also challenged his authority', 'canon'],
  ['aaron', 'miriam', 'sibling', 'Brother and sister who jointly challenged Moses\' unique prophetic status, provoking God\'s rebuke and Miriam\'s leprosy', 'canon'],
  ['moses', 'zipporah', 'spouse', 'Midianite wife who saved Moses\' life by circumcising their son on the road back to Egypt', 'canon'],
  ['moses', 'jethro', 'in-law', 'Father-in-law who sheltered Moses for forty years and taught him to delegate leadership — practical wisdom Moses needed', 'canon'],
  ['jethro', 'moses', 'mentor', 'Midianite priest who observed Moses burning out under sole leadership and designed the judicial system that saved him', 'canon'],
  ['jethro', 'zipporah', 'parent', 'Father who gave his daughter to a fugitive Hebrew — a decision that entwined Midian\'s destiny with Israel\'s exodus', 'canon'],

  // ============================================================
  // MOSES AND GOD / PHARAOH
  // ============================================================
  ['moses', 'pharaoh-of-exodus', 'rival', 'The defining confrontation of the Torah — reluctant shepherd versus divine-king, liberation versus empire', 'canon'],
  ['pharaoh-of-exodus', 'moses', 'enemy', 'Pharaoh who hardened his heart through ten plagues, losing his firstborn before finally releasing Israel', 'canon'],
  ['moses', 'pharaohs-daughter', 'child', 'Adoptive son rescued from the Nile — she named him "drawn out" and gave him an Egyptian prince\'s education', 'canon'],
  ['pharaohs-daughter', 'moses', 'parent', 'Adoptive mother whose compassion defied her father\'s genocide decree and shaped the future liberator of Israel', 'canon'],

  // ============================================================
  // MOSES AND HIS PROTEGES / ALLIES
  // ============================================================
  ['moses', 'joshua', 'mentor', 'Moses trained Joshua from youth as his aide-de-camp, eventually commissioning him as successor before all Israel', 'canon'],
  ['joshua', 'moses', 'protege', 'Faithful assistant who never left the tent of meeting, proved himself at the battle of Amalek, and inherited the mission', 'canon'],
  ['joshua', 'caleb', 'ally', 'The only two spies who trusted God\'s promise — together they stood against the terrified majority and survived the wilderness', 'canon'],
  ['caleb', 'joshua', 'ally', 'Fellow spy who brought back a good report and was rewarded with Hebron — forty-five years later he was still fighting', 'canon'],
  ['moses', 'caleb', 'ally', 'Moses honored Caleb\'s courage by promising him the very land he had scouted, a promise fulfilled decades later', 'canon'],

  // ============================================================
  // AARON'S PRIESTLY LINE
  // ============================================================
  ['aaron', 'nadab-son-of-aaron', 'parent', 'Father who watched his son consumed by divine fire for offering "strange fire" — priestly privilege met fatal presumption', 'canon'],
  ['aaron', 'abihu', 'parent', 'Father who lost his second son to the same divine judgment as Nadab, and was commanded not to mourn publicly', 'canon'],
  ['aaron', 'eleazar-son-of-aaron', 'parent', 'Father whose third son inherited the high priesthood after the deaths of Nadab and Abihu — continuity from tragedy', 'canon'],
  ['eleazar-son-of-aaron', 'phinehas', 'parent', 'Father of the zealous priest whose spear through the sinners at Peor earned his family an eternal covenant of peace', 'canon'],
  ['nadab-son-of-aaron', 'abihu', 'sibling', 'Brothers who died together offering unauthorized fire before the LORD — a warning that closeness to God demands obedience', 'canon'],
  ['nadab-son-of-aaron', 'eleazar-son-of-aaron', 'sibling', 'Brothers separated by death and divine judgment — Eleazar inherited the priesthood Nadab forfeited with his life', 'canon'],
  ['abihu', 'eleazar-son-of-aaron', 'sibling', 'The dead brother and the heir — Eleazar stepped into priestly service under the shadow of Abihu\'s fatal transgression', 'canon'],
  ['phinehas', 'aaron', 'grandchild', 'Grandson whose violent zeal at Peor secured the priestly covenant that began with Aaron\'s anointing', 'canon'],

  // ============================================================
  // EXODUS ERA — REBELLION AND OPPOSITION
  // ============================================================
  ['korah', 'moses', 'rival', 'Levite who led 250 leaders in challenging Moses\' authority — the earth swallowed him alive as judgment', 'canon'],
  ['korah', 'aaron', 'rival', 'Korah coveted the priesthood and challenged Aaron\'s exclusive right to offer incense before the LORD', 'canon'],
  ['dathan', 'moses', 'rival', 'Reubenite rebel who allied with Korah and accused Moses of bringing them out of Egypt only to lord over them', 'canon'],
  ['dathan', 'korah', 'ally', 'Co-conspirator whose challenge of Moses\' civil authority complemented Korah\'s challenge of Aaron\'s priestly authority', 'canon'],
  ['balaam', 'moses', 'rival', 'Pagan prophet hired to curse Israel — his donkey saw the angel before he did, and his curses turned to blessings', 'canon'],
  ['balaam', 'phinehas', 'enemy', 'Balaam\'s counsel led Israel into sin at Peor; Phinehas\'s spear-thrust was the violent answer to Balaam\'s seduction strategy', 'canon'],
  ['achan', 'joshua', 'subject', 'Soldier whose secret theft of devoted plunder caused Israel\'s defeat at Ai — Joshua exposed and executed him', 'canon'],

  // ============================================================
  // EXODUS ERA — MIDWIVES AND RAHAB
  // ============================================================
  ['shiphrah', 'puah', 'ally', 'Hebrew midwives who conspired to defy Pharaoh\'s infanticide decree, saving Moses\' generation with quiet courage', 'canon'],
  ['shiphrah', 'pharaoh-of-exodus', 'enemy', 'Midwife who lied to Pharaoh\'s face to protect Hebrew babies — civil disobedience rooted in fear of God over fear of kings', 'canon'],
  ['puah', 'pharaoh-of-exodus', 'enemy', 'Midwife who defied the royal death order, choosing God\'s authority over Pharaoh\'s — and was blessed with her own family', 'canon'],
  ['rahab', 'joshua', 'ally', 'Canaanite prostitute who hid Joshua\'s spies in Jericho and was spared — her faith earned her a place in Israel\'s lineage', 'canon'],

  // ============================================================
  // EXODUS ERA — CRAFTSMANSHIP AND SERVICE
  // ============================================================
  ['bezalel', 'moses', 'protege', 'Spirit-filled artisan whom God chose by name to build the Tabernacle — Moses entrusted him with making the sacred space', 'canon'],
  ['bezalel', 'aaron', 'ally', 'Craftsman who built the priestly vestments and sacred furnishings that Aaron and his sons would use in worship', 'canon'],

  // ============================================================
  // CROSS-ERA CONNECTIONS
  // ============================================================
  ['levi-son-of-jacob', 'moses', 'grandparent', 'Ancestor of Moses — the violent avenger of Dinah\'s honor produced the tribe from which Israel\'s lawgiver emerged', 'canon'],
  ['levi-son-of-jacob', 'aaron', 'grandparent', 'Ancestor of the priestly line — from Levi\'s tribal scattering came Aaron\'s consecration as first high priest', 'canon'],
  ['joseph-son-of-jacob', 'pharaoh-of-exodus', 'enemy', 'Joseph saved Egypt, but "a new king arose who did not know Joseph" and enslaved his descendants', 'canon'],
  ['joseph-son-of-jacob', 'moses', 'ally', 'Joseph\'s bones traveled with Moses through the wilderness — the exodus fulfilled Joseph\'s dying oath to leave Egypt', 'canon'],
  ['judah-son-of-jacob', 'caleb', 'grandparent', 'Ancestor of the courageous spy — Caleb the Kenizzite was grafted into Judah\'s tribe and given Hebron', 'scholarship'],
  ['aaron', 'moses', 'ally', 'Brothers who held each other up — Aaron held Moses\' arms aloft at Rephidim so Joshua could win the battle below', 'canon'],
  ['miriam', 'pharaohs-daughter', 'ally', 'The quick-thinking sister who offered to find a Hebrew nurse (Moses\' own mother) for the Egyptian princess\'s foundling', 'canon'],
  ['moses', 'og-king-of-bashan', 'enemy', 'Moses defeated this last giant-king of the Amorites east of the Jordan, whose iron bed was nine cubits long', 'canon'],
  ['joshua', 'og-king-of-bashan', 'enemy', 'God told Joshua not to fear Og — the giant king who fell in battle, opening the Transjordan for settlement', 'canon'],
  ['moses', 'dathan', 'enemy', 'Dathan accused Moses of dragging Israel out of a land of milk and honey to die in the wilderness', 'canon'],
  ['moses', 'korah', 'enemy', 'Moses told Korah to bring his censers tomorrow — God would show who was holy — and the ground opened beneath the rebels', 'canon'],
  ['jacob', 'abraham', 'grandchild', 'Grandson who inherited the covenant through deception rather than divine decree, yet God confirmed it at Bethel', 'canon'],
  ['jacob', 'isaac', 'child', 'Son who stole his father\'s blessing through disguise, then fled and spent twenty years in exile from the family', 'canon'],
  ['ishmael', 'abraham', 'child', 'Son of the slave woman, exiled from Abraham\'s household but promised to become a great nation in his own right', 'canon'],
];

batch(relationships);

const count = db.prepare('SELECT COUNT(*) as cnt FROM character_relationships').get();
console.log(`Inserted ${relationships.length} relationship records.`);
console.log(`Total in table: ${count.cnt}`);
db.close();
