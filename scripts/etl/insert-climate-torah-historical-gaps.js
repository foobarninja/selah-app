/**
 * Insert passage_climate rows for 244 missing Torah + Historical chapters.
 *
 * Torah (96 chapters): GEN, EXO, LEV, NUM, DEU
 * Historical (148 chapters): JOS, JDG, 1SA, 2SA, 1KI, 2KI, 1CH, 2CH, EZR, NEH, EST
 *
 * Climate context IDs by era:
 *   patriarchal  — GEN
 *   exodus       — EXO, LEV, NUM, DEU
 *   judges       — JOS, JDG
 *   united-monarchy — 1SA, 2SA, 1KI 1-11, 1CH
 *   divided-monarchy — 1KI 12-22, 2KI, 2CH
 *   climate-exile    — 2KI 25
 *   climate-post-exile — EZR, NEH, EST
 *
 * 1 row per chapter.  verse_start = 1, verse_end = null.
 * source_tier: 'ai_assisted'
 */
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', '..', 'data', 'selah.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Each entry: [context_id, book_id, chapter, verse_start, verse_end, context_note, source_tier]
const rows = [

  // ============================================================
  // GENESIS  (13 chapters) — context_id: 'patriarchal'
  // ============================================================

  // GEN 5 — Genealogy from Adam to Noah
  ['patriarchal', 'GEN', 5, 1, null,
    'A genealogical register spanning ten generations in the pre-flood world, where patriarchal households measured wealth in livestock and survival depended on kinship networks passing knowledge and blessing from father to firstborn.',
    'ai_assisted'],

  // GEN 7 — The flood begins
  ['patriarchal', 'GEN', 7, 1, null,
    'Noah\'s household enters the ark as catastrophic rainfall overwhelms a world of scattered settlements; the patriarchal family unit is the sole surviving social structure, sheltering together with their herds in a vessel built by family labor.',
    'ai_assisted'],

  // GEN 8 — The flood recedes
  ['patriarchal', 'GEN', 8, 1, null,
    'As floodwaters recede over months, Noah\'s family waits inside the ark — a microcosm of pastoral household life where seasons, animal husbandry, and altar-building define the rhythm of existence before any city or government exists.',
    'ai_assisted'],

  // GEN 10 — Table of Nations
  ['patriarchal', 'GEN', 10, 1, null,
    'The post-flood world branches into seventy nations across the Fertile Crescent, each clan claiming territory, language, and identity through its ancestor — a world of emerging city-states and pastoral groups that the later patriarchs will navigate.',
    'ai_assisted'],

  // GEN 19 — Destruction of Sodom and Gomorrah
  ['patriarchal', 'GEN', 19, 1, null,
    'Sodom sits in the well-watered Jordan plain, a walled city-state whose wealth comes from trade routes and irrigated agriculture; its destruction by fire resets the regional landscape that Lot chose for its prosperity.',
    'ai_assisted'],

  // GEN 20 — Abraham and Abimelech in Gerar
  ['patriarchal', 'GEN', 20, 1, null,
    'Abraham sojourns near Gerar in the western Negev, where a local king controls water sources and pastoralists must negotiate access through diplomacy — the vulnerability of a stateless nomad among settled city-state rulers.',
    'ai_assisted'],

  // GEN 31 — Jacob flees Laban
  ['patriarchal', 'GEN', 31, 1, null,
    'Jacob\'s flight from Haran to Canaan traces the upper arc of the Fertile Crescent; his accumulated flocks represent years of pastoral wealth-building under a kinship economy where labor, bride-price, and herd management are inseparable.',
    'ai_assisted'],

  // GEN 35 — Jacob returns to Bethel
  ['patriarchal', 'GEN', 35, 1, null,
    'Jacob\'s household moves through the central hill country of Canaan, burying foreign gods and building altars at open-air sacred sites — the patriarchal pattern of family-led worship without temple, priesthood, or fixed sanctuary.',
    'ai_assisted'],

  // GEN 36 — Esau\'s descendants in Edom
  ['patriarchal', 'GEN', 36, 1, null,
    'Esau\'s clans settle the rugged terrain of Seir southeast of the Dead Sea, establishing chieftaincies in a region of copper mining and trade routes — a parallel patriarchal society developing outside the chosen line.',
    'ai_assisted'],

  // GEN 41 — Joseph interprets Pharaoh\'s dreams
  ['patriarchal', 'GEN', 41, 1, null,
    'Egypt\'s centralized bureaucracy under Pharaoh manages Nile-dependent agriculture; Joseph rises from prison to vizier in a court system where dream interpretation carries political weight and grain storage is state policy.',
    'ai_assisted'],

  // GEN 44 — Joseph tests his brothers
  ['patriarchal', 'GEN', 44, 1, null,
    'Joseph\'s brothers navigate Egyptian court protocol as foreign pastoralists dependent on state-controlled grain distribution during famine — the power asymmetry between a settled empire and semi-nomadic herding families on full display.',
    'ai_assisted'],

  // GEN 47 — Jacob\'s family settles in Goshen
  ['patriarchal', 'GEN', 47, 1, null,
    'Pharaoh grants the Goshen delta to Jacob\'s pastoral household, a fertile region suited for herding that keeps the Hebrews both provisioned and socially separate from Egyptian agricultural society.',
    'ai_assisted'],

  // GEN 50 — Deaths of Jacob and Joseph
  ['patriarchal', 'GEN', 50, 1, null,
    'Jacob\'s embalming and elaborate funeral procession back to Canaan blend Egyptian mortuary customs with patriarchal burial traditions at the cave of Machpelah — two cultures meeting at the deathbed of a nomadic patriarch.',
    'ai_assisted'],

  // ============================================================
  // EXODUS  (23 chapters) — context_id: 'exodus'
  // ============================================================

  // EXO 4 — Moses\' signs and return to Egypt
  ['exodus', 'EXO', 4, 1, null,
    'Moses receives miraculous signs in the Midianite wilderness before returning to confront Pharaoh — a shepherd from the desert margins challenging the most centralized state in the ancient world.',
    'ai_assisted'],

  // EXO 6 — God reaffirms the covenant name
  ['exodus', 'EXO', 6, 1, null,
    'God reveals the name YHWH to Moses while Israel labors as state corvée workers building Egyptian store-cities — divine identity disclosed at the lowest point of Israel\'s political powerlessness.',
    'ai_assisted'],

  // EXO 8 — Plagues of frogs, gnats, and flies
  ['exodus', 'EXO', 8, 1, null,
    'Plagues target the Nile ecosystem and Egyptian agricultural life; frogs, gnats, and flies disrupt a civilization whose economy depends on river irrigation, exposing Pharaoh\'s inability to control the natural world he claims to govern.',
    'ai_assisted'],

  // EXO 9 — Plagues of livestock disease, boils, and hail
  ['exodus', 'EXO', 9, 1, null,
    'Livestock disease destroys Egyptian herds while Israel\'s animals in Goshen are spared; hail devastates flax and barley crops, striking at the agricultural calendar that feeds the empire.',
    'ai_assisted'],

  // EXO 10 — Plagues of locusts and darkness
  ['exodus', 'EXO', 10, 1, null,
    'Locusts consume every remaining crop and three days of darkness paralyze a society that worships the sun god Ra — the plagues systematically dismantle Egypt\'s religious and economic infrastructure.',
    'ai_assisted'],

  // EXO 11 — Announcement of the final plague
  ['exodus', 'EXO', 11, 1, null,
    'The final plague targets Egypt\'s firstborn, striking at the heart of the inheritance system and dynastic succession that structure Egyptian political and family life.',
    'ai_assisted'],

  // EXO 13 — Consecration of firstborn and departure
  ['exodus', 'EXO', 13, 1, null,
    'Israel departs Egypt as a massive refugee population, guided toward the wilderness rather than the coastal highway where Egyptian military garrisons are stationed — a route chosen to avoid the fortified border.',
    'ai_assisted'],

  // EXO 16 — Manna and quail in the wilderness
  ['exodus', 'EXO', 16, 1, null,
    'In the Sinai wilderness between Egypt and Canaan, a population accustomed to Nile-irrigated abundance must adapt to desert survival — manna provision reshapes daily economic life around trust rather than storage.',
    'ai_assisted'],

  // EXO 21 — Laws about servants and personal injury
  ['exodus', 'EXO', 21, 1, null,
    'Case law for a newly freed slave population addresses servitude, violence, and property damage — legal structures built for people transitioning from Egyptian state labor to self-governing tribal life.',
    'ai_assisted'],

  // EXO 22 — Laws about property and social responsibility
  ['exodus', 'EXO', 22, 1, null,
    'Property laws cover livestock, crops, and lending — the economic realities of a pastoral and agricultural community forming its own legal system in the wilderness before entering Canaan.',
    'ai_assisted'],

  // EXO 23 — Laws of justice, Sabbath, and festivals
  ['exodus', 'EXO', 23, 1, null,
    'Agricultural festival laws presuppose the grain harvest, grape vintage, and ingathering that Israel will practice in Canaan — legislation written for a future settled economy while the people still live as wilderness nomads.',
    'ai_assisted'],

  // EXO 26 — Design of the tabernacle curtains
  ['exodus', 'EXO', 26, 1, null,
    'Tabernacle construction uses goat-hair cloth, dyed ram skins, and acacia wood — materials available in the Sinai wilderness, creating a portable sanctuary suited to a nomadic people without permanent settlement.',
    'ai_assisted'],

  // EXO 27 — Altar of burnt offering and courtyard
  ['exodus', 'EXO', 27, 1, null,
    'The bronze altar and linen courtyard establish a worship infrastructure designed for desert conditions — lightweight, transportable, and constructed from materials the Israelites carried out of Egypt.',
    'ai_assisted'],

  // EXO 28 — Priestly garments
  ['exodus', 'EXO', 28, 1, null,
    'Elaborate priestly vestments require skilled textile work, gold smithing, and gemstone cutting — craftsmanship that reflects skills learned in Egypt now redirected toward worship of YHWH in the wilderness.',
    'ai_assisted'],

  // EXO 29 — Consecration of priests
  ['exodus', 'EXO', 29, 1, null,
    'Priestly ordination rituals establish a new religious office for a people who previously had no formal priesthood — a wilderness institution created to mediate between God and a recently enslaved nation.',
    'ai_assisted'],

  // EXO 30 — Incense altar, atonement money, anointing oil
  ['exodus', 'EXO', 30, 1, null,
    'The half-shekel census tax and aromatic incense recipes reflect trade goods — myrrh, cinnamon, cassia — available along ancient Near Eastern trade routes that connect Sinai to Arabia and beyond.',
    'ai_assisted'],

  // EXO 31 — Bezalel and Oholiab appointed; Sabbath sign
  ['exodus', 'EXO', 31, 1, null,
    'God appoints craftsmen skilled in metalwork, woodwork, and textile arts — trades learned during generations of Egyptian servitude now repurposed for building a sanctuary in the desert.',
    'ai_assisted'],

  // EXO 34 — Renewed covenant after the golden calf
  ['exodus', 'EXO', 34, 1, null,
    'Moses ascends Sinai again after the golden calf crisis; the covenant renewal includes agricultural festival laws for a people camped in wilderness who must prepare for settled life in a rain-dependent land.',
    'ai_assisted'],

  // EXO 36 — Tabernacle construction begins
  ['exodus', 'EXO', 36, 1, null,
    'Israel\'s freewill offerings of gold, silver, fabric, and leather — wealth carried from Egypt — fund a massive construction project in the desert, requiring communal economic sacrifice from a refugee population.',
    'ai_assisted'],

  // EXO 37 — Ark, table, lampstand, and incense altar built
  ['exodus', 'EXO', 37, 1, null,
    'Bezalel constructs sacred furnishings from acacia wood overlaid with gold — wilderness craftsmanship at the highest level, using techniques and materials that bridge Egyptian artisanship and Israelite worship.',
    'ai_assisted'],

  // EXO 38 — Bronze altar, basin, and courtyard built
  ['exodus', 'EXO', 38, 1, null,
    'The bronze altar and courtyard require enormous quantities of metal; the inventory lists over two tons of gold and nearly four tons of bronze — resources from Egyptian plunder repurposed for desert worship.',
    'ai_assisted'],

  // EXO 39 — Priestly garments completed
  ['exodus', 'EXO', 39, 1, null,
    'Skilled weavers and goldsmiths complete the priestly wardrobe exactly as specified; the textile work — blue, purple, and scarlet yarn with fine linen — represents luxury craft produced under tent-camp conditions.',
    'ai_assisted'],

  // EXO 40 — Tabernacle erected and glory fills it
  ['exodus', 'EXO', 40, 1, null,
    'The portable sanctuary is assembled at the foot of Sinai, establishing a mobile worship center for a nomadic nation — the cloud and fire that guide wilderness travel now rest on a physical structure.',
    'ai_assisted'],

  // ============================================================
  // LEVITICUS  (17 chapters) — context_id: 'exodus'
  // ============================================================

  // LEV 2 — Grain offerings
  ['exodus', 'LEV', 2, 1, null,
    'Grain offering regulations assume access to fine flour, olive oil, and frankincense — provisions available in the wilderness through manna processing and trade, foreshadowing the agricultural economy of Canaan.',
    'ai_assisted'],

  // LEV 3 — Peace offerings
  ['exodus', 'LEV', 3, 1, null,
    'Peace offerings from the herd and flock reflect the pastoral wealth Israel carried through the wilderness; the shared meal that follows is communal feasting in a tent-camp society.',
    'ai_assisted'],

  // LEV 4 — Sin offerings
  ['exodus', 'LEV', 4, 1, null,
    'Sin offering laws stratify by social status — priest, community, leader, common person — revealing a wilderness society already developing formal social hierarchy beyond the flat structure of slave labor.',
    'ai_assisted'],

  // LEV 5 — Guilt offerings
  ['exodus', 'LEV', 5, 1, null,
    'Guilt offerings include provisions for the poor to bring birds or flour instead of livestock, acknowledging economic inequality even within a refugee community traveling through the desert.',
    'ai_assisted'],

  // LEV 6 — Offering procedures for priests
  ['exodus', 'LEV', 6, 1, null,
    'Priestly duties at the tabernacle altar require perpetual fire and daily maintenance — a round-the-clock worship economy sustained by Levitical labor in the wilderness camp.',
    'ai_assisted'],

  // LEV 7 — Further offering regulations
  ['exodus', 'LEV', 7, 1, null,
    'Detailed rules for handling sacrificial meat address food safety in desert conditions — fat disposal, time limits on consumption, and contamination rules for a community without refrigeration.',
    'ai_assisted'],

  // LEV 9 — Aaron\'s first sacrifices
  ['exodus', 'LEV', 9, 1, null,
    'Aaron begins his priestly service at the tabernacle with the whole community watching; the new religious institution launches in the open desert before the assembled tribes.',
    'ai_assisted'],

  // LEV 12 — Purification after childbirth
  ['exodus', 'LEV', 12, 1, null,
    'Postpartum purification laws regulate a mother\'s reintegration into communal worship life, reflecting the close quarters and shared sacred space of a wilderness encampment.',
    'ai_assisted'],

  // LEV 13 — Skin disease diagnosis
  ['exodus', 'LEV', 13, 1, null,
    'Detailed diagnostic protocols for skin conditions address the public health realities of a dense tent-camp population in an arid climate where disease could spread rapidly through close-quarters living.',
    'ai_assisted'],

  // LEV 14 — Cleansing rituals for skin disease
  ['exodus', 'LEV', 14, 1, null,
    'Purification rituals use cedar wood, scarlet yarn, hyssop, and running water — materials sourced from the wilderness environment to restore the healed person to camp life and tabernacle access.',
    'ai_assisted'],

  // LEV 15 — Bodily discharge regulations
  ['exodus', 'LEV', 15, 1, null,
    'Hygiene laws for bodily discharges manage contamination risk in a tent community sharing limited water sources — practical health legislation disguised as ritual purity in desert conditions.',
    'ai_assisted'],

  // LEV 18 — Forbidden sexual relations
  ['exodus', 'LEV', 18, 1, null,
    'Sexual prohibitions explicitly contrast Israel with Egyptian customs left behind and Canaanite practices ahead — moral legislation for a transitional people between two cultures.',
    'ai_assisted'],

  // LEV 20 — Penalties for violations
  ['exodus', 'LEV', 20, 1, null,
    'Capital and social penalties for idolatry and sexual transgression establish community boundaries for a newly formed nation without prison infrastructure — exile from the camp is the primary enforcement mechanism.',
    'ai_assisted'],

  // LEV 21 — Priestly holiness requirements
  ['exodus', 'LEV', 21, 1, null,
    'Restrictions on priestly mourning practices and physical qualifications reflect a wilderness society where the priesthood is the sole mediating institution between a holy God and an encamped nation.',
    'ai_assisted'],

  // LEV 22 — Sacred offering regulations
  ['exodus', 'LEV', 22, 1, null,
    'Rules for acceptable sacrificial animals require unblemished livestock from the herds Israel maintains while traveling — quality control for worship in a pastoral, nomadic economy.',
    'ai_assisted'],

  // LEV 24 — Lampstand oil, showbread, and blasphemy case
  ['exodus', 'LEV', 24, 1, null,
    'The continuous supply of pure olive oil and weekly showbread requires ongoing resource management; the blasphemy case involving an Egyptian-Israelite mixed son reflects the mixed multitude traveling with Israel.',
    'ai_assisted'],

  // LEV 27 — Vows and dedications
  ['exodus', 'LEV', 27, 1, null,
    'Monetary valuations for vows and dedications use the sanctuary shekel standard, establishing a weight-based currency system for the wilderness economy before coinage exists.',
    'ai_assisted'],

  // ============================================================
  // NUMBERS  (22 chapters) — context_id: 'exodus'
  // ============================================================

  // NUM 2 — Camp arrangement by tribes
  ['exodus', 'NUM', 2, 1, null,
    'The twelve tribes arrange their tents in precise formation around the tabernacle — a military and liturgical camp layout for roughly two million people organized by clan in the Sinai wilderness.',
    'ai_assisted'],

  // NUM 3 — Levite census and duties
  ['exodus', 'NUM', 3, 1, null,
    'Levites are counted separately and assigned tabernacle duties by clan — a priestly labor force organized around the portable sanctuary that serves as the administrative and worship center of the camp.',
    'ai_assisted'],

  // NUM 4 — Service duties for Kohathites, Gershonites, Merarites
  ['exodus', 'NUM', 4, 1, null,
    'Each Levitical clan receives specific transport duties for tabernacle components — a logistics system for moving sacred furniture through desert terrain when the camp relocates.',
    'ai_assisted'],

  // NUM 5 — Purity laws and the jealousy test
  ['exodus', 'NUM', 5, 1, null,
    'Camp purity regulations and the ordeal for suspected adultery address social tensions within a confined wilderness community where suspicion and disease can destabilize tribal cohesion.',
    'ai_assisted'],

  // NUM 7 — Tribal leaders\' dedication offerings
  ['exodus', 'NUM', 7, 1, null,
    'Twelve tribal leaders bring identical lavish offerings over twelve days — silver plates, gold dishes, livestock — demonstrating the collective wealth Israel still possesses despite wilderness travel.',
    'ai_assisted'],

  // NUM 8 — Levite consecration
  ['exodus', 'NUM', 8, 1, null,
    'The Levites are ceremonially set apart before the whole assembly, shaved, sprinkled, and presented as a living offering — public ritual establishing religious authority in a camp with no built institutions.',
    'ai_assisted'],

  // NUM 9 — Second Passover and the cloud
  ['exodus', 'NUM', 9, 1, null,
    'Israel observes Passover in the wilderness one year after the exodus; the cloud over the tabernacle governs camp movement — daily life organized around visible divine guidance in an otherwise featureless desert.',
    'ai_assisted'],

  // NUM 14 — Rebellion after the spies\' report
  ['exodus', 'NUM', 14, 1, null,
    'The people reject entering Canaan after hearing about fortified cities and giant inhabitants; the contrast between wilderness vulnerability and Canaanite military strength paralyzes a nation of former slaves.',
    'ai_assisted'],

  // NUM 15 — Supplementary offering laws
  ['exodus', 'NUM', 15, 1, null,
    'Offering regulations include grain and wine amounts calibrated to Canaan\'s future agricultural output — wilderness legislation anticipating the transition from nomadic herding to settled farming.',
    'ai_assisted'],

  // NUM 18 — Priestly and Levitical portions
  ['exodus', 'NUM', 18, 1, null,
    'Tithes and firstfruit offerings establish the economic support system for Levites who receive no tribal land allotment — a religious tax structure designed for a people not yet settled.',
    'ai_assisted'],

  // NUM 19 — Red heifer purification
  ['exodus', 'NUM', 19, 1, null,
    'The red heifer ritual provides a mechanism for corpse contamination purification — essential hygiene legislation for a desert community where death from disease, snakebite, and conflict is common.',
    'ai_assisted'],

  // NUM 23 — Balaam\'s first and second oracles
  ['exodus', 'NUM', 23, 1, null,
    'Balaam blesses Israel from Moabite hilltops overlooking the Jordan valley; the surrounding nations view Israel\'s massive encampment as a military and economic threat to the settled Transjordanian kingdoms.',
    'ai_assisted'],

  // NUM 24 — Balaam\'s third and fourth oracles
  ['exodus', 'NUM', 24, 1, null,
    'Balaam prophesies Israel\'s future dominance from a vantage point above the wilderness camp; Moab and the regional powers recognize that this nomadic nation will soon reshape the Canaanite political landscape.',
    'ai_assisted'],

  // NUM 28 — Daily, Sabbath, and monthly offerings
  ['exodus', 'NUM', 28, 1, null,
    'The liturgical calendar prescribes daily lambs, weekly Sabbath additions, and monthly new moon sacrifices — a worship economy requiring continuous livestock supply from the herds traveling through the wilderness.',
    'ai_assisted'],

  // NUM 29 — Festival offerings for the seventh month
  ['exodus', 'NUM', 29, 1, null,
    'The seventh-month festival cycle — Trumpets, Atonement, Tabernacles — demands over 70 bulls, 30 rams, and 200 lambs across eight days, drawing deeply on Israel\'s pastoral wealth.',
    'ai_assisted'],

  // NUM 30 — Laws about vows
  ['exodus', 'NUM', 30, 1, null,
    'Vow regulations give fathers and husbands authority to annul women\'s vows, reflecting the patriarchal household economy where a woman\'s pledge could affect the whole family\'s resources in the wilderness.',
    'ai_assisted'],

  // NUM 31 — War against Midian
  ['exodus', 'NUM', 31, 1, null,
    'The Midianite campaign yields enormous plunder — livestock, gold, and captives — distributed between warriors, the community, and the Levites; wilderness warfare as an economic event for a pre-settled nation.',
    'ai_assisted'],

  // NUM 32 — Reuben and Gad settle east of the Jordan
  ['exodus', 'NUM', 32, 1, null,
    'Two tribes request the lush Transjordanian grazing lands for their large herds rather than crossing into Canaan — pastoral economics driving territorial decisions at the edge of the promised land.',
    'ai_assisted'],

  // NUM 33 — Summary of wilderness journey stages
  ['exodus', 'NUM', 33, 1, null,
    'Forty-two camp sites trace Israel\'s path from Rameses through Sinai desert oases, mountain passes, and arid plateaus — a travel log across terrain where water sources dictate every stop.',
    'ai_assisted'],

  // NUM 34 — Boundaries of the promised land
  ['exodus', 'NUM', 34, 1, null,
    'Canaan\'s borders are defined from the Mediterranean coast to the Jordan, the Negev desert to Lebanon — a geographic mandate for a people about to transition from wilderness nomadism to settled territorial life.',
    'ai_assisted'],

  // NUM 35 — Levitical cities and cities of refuge
  ['exodus', 'NUM', 35, 1, null,
    'Forty-eight Levitical cities with surrounding pasturelands and six cities of refuge are planned for Canaan — urban infrastructure legislation created while the nation still lives in tents.',
    'ai_assisted'],

  // NUM 36 — Inheritance for Zelophehad\'s daughters
  ['exodus', 'NUM', 36, 1, null,
    'Land inheritance rules requiring tribal endogamy ensure that property stays within tribal boundaries — real estate law for a people who do not yet own real estate but soon will.',
    'ai_assisted'],

  // ============================================================
  // DEUTERONOMY  (21 chapters) — context_id: 'exodus'
  // ============================================================

  // DEU 2 — Journey through Edom, Moab, and Ammon
  ['exodus', 'DEU', 2, 1, null,
    'Israel skirts the territories of Edom, Moab, and Ammon — established Transjordanian kingdoms with fortified borders that Israel must respect, purchasing food and water rather than taking them by force.',
    'ai_assisted'],

  // DEU 3 — Defeat of Og and Transjordanian settlement
  ['exodus', 'DEU', 3, 1, null,
    'King Og\'s Bashan is conquered — a fertile region of oak forests, rich pastureland, and fortified cities; the first taste of settled prosperity for tribes who have known only wilderness camp life.',
    'ai_assisted'],

  // DEU 7 — Command to destroy Canaanite nations
  ['exodus', 'DEU', 7, 1, null,
    'Seven Canaanite nations are named as targets for dispossession; their religious infrastructure of altars, sacred poles, and carved images represents the entrenched polytheistic culture Israel must replace.',
    'ai_assisted'],

  // DEU 11 — Blessings of obedience in the promised land
  ['exodus', 'DEU', 11, 1, null,
    'Canaan is described as a land of hills and valleys that drinks rain from heaven — unlike Egypt\'s irrigation-based farming, this land requires dependence on seasonal rainfall and therefore on God.',
    'ai_assisted'],

  // DEU 12 — Centralized worship
  ['exodus', 'DEU', 12, 1, null,
    'The command to worship at one chosen place anticipates the transition from scattered Canaanite high places to a single sanctuary — a revolutionary centralization for a people accustomed to altar-building wherever they camp.',
    'ai_assisted'],

  // DEU 13 — Against false prophets and idolatry
  ['exodus', 'DEU', 13, 1, null,
    'Laws against enticement to worship other gods address the religious diversity Israel will encounter in Canaan, where every city has its own patron deity and cultic traditions.',
    'ai_assisted'],

  // DEU 14 — Clean and unclean foods; tithes
  ['exodus', 'DEU', 14, 1, null,
    'Dietary laws distinguish Israel from surrounding cultures, while tithe regulations fund the Levitical system and provide for the poor — food as both cultural identity marker and economic redistribution.',
    'ai_assisted'],

  // DEU 15 — Sabbatical year and debt release
  ['exodus', 'DEU', 15, 1, null,
    'Every seventh year debts are cancelled and Hebrew servants freed — radical economic reset legislation for a future agricultural society, preventing permanent underclass formation in the promised land.',
    'ai_assisted'],

  // DEU 16 — Three pilgrimage festivals
  ['exodus', 'DEU', 16, 1, null,
    'Passover, Weeks, and Tabernacles structure the agricultural year around worship — spring barley harvest, summer wheat harvest, and autumn ingathering, each requiring pilgrimage to the central sanctuary.',
    'ai_assisted'],

  // DEU 17 — Laws for kings and judges
  ['exodus', 'DEU', 17, 1, null,
    'Future kingship is regulated before Israel has a king — the monarch must not accumulate horses from Egypt, multiply wives, or hoard silver and gold, limiting royal power in ways unprecedented in the ancient Near East.',
    'ai_assisted'],

  // DEU 18 — Levitical support and the prophet like Moses
  ['exodus', 'DEU', 18, 1, null,
    'Levites receive no land inheritance but live on sacrificial portions and tithes; the prohibition against divination distinguishes Israel from Canaanite religious practice that relies on omens and necromancy.',
    'ai_assisted'],

  // DEU 19 — Cities of refuge and witness laws
  ['exodus', 'DEU', 19, 1, null,
    'Cities of refuge with road access address the blood-vengeance culture of tribal society, creating an institutional alternative to clan retaliation in a land where kinship justice is the default.',
    'ai_assisted'],

  // DEU 20 — Rules of warfare
  ['exodus', 'DEU', 20, 1, null,
    'Military exemptions for new homeowners, vineyard planters, and the newly betrothed reflect an agrarian society where establishing a household is a higher priority than standing army service.',
    'ai_assisted'],

  // DEU 21 — Unsolved murder, captive women, rebellious sons
  ['exodus', 'DEU', 21, 1, null,
    'Case law for unsolved murders between towns, treatment of war captives, and rebellious sons addresses the social realities of a tribal society settling disputed territory with minimal centralized authority.',
    'ai_assisted'],

  // DEU 22 — Miscellaneous laws: property, clothing, sexual conduct
  ['exodus', 'DEU', 22, 1, null,
    'Laws about lost livestock, roof parapets, mixed seeds, and fabric blends reflect daily life in a future settled agricultural community — neighbor relations, construction standards, and farming practice.',
    'ai_assisted'],

  // DEU 23 — Assembly exclusions and camp hygiene
  ['exodus', 'DEU', 23, 1, null,
    'Camp sanitation rules and community membership criteria blend public health with social boundary-setting for a people transitioning from wilderness camp to permanent towns with shared civic space.',
    'ai_assisted'],

  // DEU 24 — Divorce, collateral, and worker rights
  ['exodus', 'DEU', 24, 1, null,
    'Regulations on divorce certificates, pledge-taking, and same-day wages protect vulnerable members of an agricultural economy — day laborers, debtors, widows, orphans, and resident aliens.',
    'ai_assisted'],

  // DEU 25 — Levirate marriage and fair weights
  ['exodus', 'DEU', 25, 1, null,
    'Levirate marriage preserves a dead man\'s name and land inheritance; honest weights and measures regulate marketplace commerce — family continuity and economic fairness as twin social foundations.',
    'ai_assisted'],

  // DEU 26 — Firstfruits and tithe declarations
  ['exodus', 'DEU', 26, 1, null,
    'The firstfruits liturgy recites Israel\'s journey from wandering Aramean to settled farmer — a worship ritual that anchors agricultural prosperity in the memory of wilderness dependence.',
    'ai_assisted'],

  // DEU 28 — Blessings and curses
  ['exodus', 'DEU', 28, 1, null,
    'Covenant blessings promise agricultural abundance, military victory, and commercial prosperity; curses threaten drought, plague, foreign invasion, and exile — the full spectrum of ancient Near Eastern national catastrophe.',
    'ai_assisted'],

  // DEU 29 — Covenant renewal in Moab
  ['exodus', 'DEU', 29, 1, null,
    'Moses addresses Israel on the plains of Moab overlooking the Jordan valley — the covenant renewed at the geographic threshold between forty years of wilderness wandering and the settled life ahead.',
    'ai_assisted'],

  // ============================================================
  // JOSHUA  (12 chapters) — context_id: 'judges'
  // ============================================================

  // JOS 4 — Memorial stones at Gilgal
  ['judges', 'JOS', 4, 1, null,
    'Twelve stones are set up at Gilgal in the Jordan valley after the miraculous crossing — a memorial cairn in the conquest-era landscape where Israel establishes its first Canaanite foothold.',
    'ai_assisted'],

  // JOS 6 — Fall of Jericho
  ['judges', 'JOS', 6, 1, null,
    'Jericho is a fortified Bronze Age city controlling the Jordan valley trade routes; its massive walls represent Canaanite urban military technology that Israel overcomes not by siege but by divine intervention.',
    'ai_assisted'],

  // JOS 8 — Conquest of Ai and covenant at Ebal
  ['judges', 'JOS', 8, 1, null,
    'Ai sits in the central hill country guarding the route from the Jordan valley to the highland ridge; its capture opens the strategic interior of Canaan for Israelite settlement.',
    'ai_assisted'],

  // JOS 11 — Northern campaign
  ['judges', 'JOS', 11, 1, null,
    'A coalition of northern Canaanite kings musters horses and chariots at the waters of Merom; Israel faces the full military technology of Late Bronze Age Canaan in the Galilee region.',
    'ai_assisted'],

  // JOS 12 — List of defeated kings
  ['judges', 'JOS', 12, 1, null,
    'Thirty-one defeated Canaanite kings represent the fragmented city-state political landscape — each controlling a small territory from a fortified tell, none strong enough alone to resist the Israelite confederation.',
    'ai_assisted'],

  // JOS 14 — Caleb claims Hebron
  ['judges', 'JOS', 14, 1, null,
    'Caleb requests the hill country around Hebron, a region inhabited by the Anakim and fortified since the Middle Bronze Age — veteran faith claiming the most militarily challenging allotment.',
    'ai_assisted'],

  // JOS 15 — Judah\'s territory
  ['judges', 'JOS', 15, 1, null,
    'Judah\'s allotment stretches from the Dead Sea to the Mediterranean, encompassing the Negev desert, Shephelah foothills, and central highlands — diverse terrain requiring different agricultural and pastoral strategies.',
    'ai_assisted'],

  // JOS 16 — Ephraim\'s territory
  ['judges', 'JOS', 16, 1, null,
    'Ephraim receives the fertile central hill country with its springs and terraced slopes — prime agricultural land requiring forest clearance before it can support the grain and olive economy.',
    'ai_assisted'],

  // JOS 17 — Manasseh\'s territory
  ['judges', 'JOS', 17, 1, null,
    'Manasseh\'s allotment spans both sides of the Jordan but includes Canaanite cities with iron chariots in the valley floors — the tribe must settle the forested highlands while enemies hold the plains.',
    'ai_assisted'],

  // JOS 18 — Remaining tribal allotments surveyed
  ['judges', 'JOS', 18, 1, null,
    'Joshua rebukes seven tribes for delay in occupying their land; surveyors map the remaining territory at Shiloh — the transition from military conquest to civilian land settlement requires active initiative.',
    'ai_assisted'],

  // JOS 19 — Remaining tribal territories
  ['judges', 'JOS', 19, 1, null,
    'Six tribes receive their allotments by lot at Shiloh — Simeon absorbed within Judah\'s territory, Dan squeezed into a narrow coastal strip by the Philistines, each reflecting the uneven realities of settlement.',
    'ai_assisted'],

  // JOS 21 — Levitical cities
  ['judges', 'JOS', 21, 1, null,
    'Forty-eight cities with surrounding pasturelands are distributed among the Levites across all tribal territories — a decentralized priestly infrastructure designed to bring Torah instruction within reach of every Israelite settlement.',
    'ai_assisted'],

  // ============================================================
  // JUDGES  (9 chapters) — context_id: 'judges'
  // ============================================================

  // JDG 5 — Song of Deborah
  ['judges', 'JDG', 5, 1, null,
    'Deborah\'s victory song names tribes by their geographic settings — Ephraim in the hill country, Zebulun and Naphtali on the heights, Dan lingering by ships — the fractured tribal landscape of pre-monarchic Israel.',
    'ai_assisted'],

  // JDG 8 — Gideon defeats Midian and declines kingship
  ['judges', 'JDG', 8, 1, null,
    'Gideon pursues Midianite camel-raiders across the Jordan into the Transjordanian steppe; the Midianite economy of seasonal raiding threatens Israel\'s fragile agricultural settlements in the Jezreel valley.',
    'ai_assisted'],

  // JDG 11 — Jephthah and the Ammonites
  ['judges', 'JDG', 11, 1, null,
    'Jephthah, an outcast from Gilead, negotiates with Ammon over Transjordanian territory; the dispute concerns land rights, trade routes, and borders — the political realities of tribal society east of the Jordan.',
    'ai_assisted'],

  // JDG 12 — Jephthah and the Ephraimites
  ['judges', 'JDG', 12, 1, null,
    'Inter-tribal warfare erupts between Gilead and Ephraim at the Jordan fords; the Shibboleth password test reveals dialect differences — linguistic evidence of regional isolation in a decentralized tribal confederation.',
    'ai_assisted'],

  // JDG 15 — Samson\'s conflict with the Philistines
  ['judges', 'JDG', 15, 1, null,
    'Samson burns Philistine grain fields during wheat harvest in the Shephelah lowlands — agricultural destruction as guerrilla warfare between Israel\'s hill-country settlers and Philistine coastal plain farmers.',
    'ai_assisted'],

  // JDG 16 — Samson and Delilah; his death
  ['judges', 'JDG', 16, 1, null,
    'Samson is captured and displayed in a Philistine temple at Gaza — a major coastal city with Mediterranean trade connections and advanced architectural construction, reflecting Philistine cultural sophistication.',
    'ai_assisted'],

  // JDG 18 — Dan migrates north
  ['judges', 'JDG', 18, 1, null,
    'The Danites abandon their coastal allotment under Philistine pressure and migrate to Laish in the far north — a peaceful, isolated city near the headwaters of the Jordan, easy prey for a displaced tribe.',
    'ai_assisted'],

  // JDG 20 — Civil war against Benjamin
  ['judges', 'JDG', 20, 1, null,
    'Eleven tribes muster against Benjamin at Gibeah in the central highlands; the mobilization of 400,000 swordsmen reveals the military potential — and the self-destructive fragility — of the tribal confederation.',
    'ai_assisted'],

  // JDG 21 — Wives for the surviving Benjaminites
  ['judges', 'JDG', 21, 1, null,
    'The tribes scramble to find wives for Benjamin\'s survivors without breaking their oath — a crisis of tribal survival and kinship obligation in a society where marriage alliances hold the confederation together.',
    'ai_assisted'],

  // ============================================================
  // 1 SAMUEL  (18 chapters) — context_id: 'united-monarchy'
  // ============================================================

  // 1SA 2 — Hannah\'s song and Eli\'s corrupt sons
  ['united-monarchy', '1SA', 2, 1, null,
    'The Shiloh sanctuary operates as Israel\'s central worship site, but priestly corruption — taking meat by force, sleeping with attendants — reveals an institution in economic and moral decay before the monarchy rises.',
    'ai_assisted'],

  // 1SA 5 — The ark among the Philistines
  ['united-monarchy', '1SA', 5, 1, null,
    'The captured ark moves between Philistine cities — Ashdod, Gath, Ekron — each a major fortified center in the coastal plain\'s pentapolis, where maritime trade and advanced metalworking define a rival culture.',
    'ai_assisted'],

  // 1SA 6 — Return of the ark
  ['united-monarchy', '1SA', 6, 1, null,
    'Philistine priests use divination and a cart-test to return the ark; the gold tumors and rats sent as guilt offerings reflect Philistine religious practice — a culture with its own sophisticated priestly class.',
    'ai_assisted'],

  // 1SA 7 — Samuel judges Israel at Mizpah
  ['united-monarchy', '1SA', 7, 1, null,
    'Samuel gathers Israel at Mizpah in the Benjamin highlands for national repentance; his circuit through Bethel, Gilgal, and Mizpah establishes a judicial system serving the central hill-country settlements.',
    'ai_assisted'],

  // 1SA 10 — Saul anointed and confirmed as king
  ['united-monarchy', '1SA', 10, 1, null,
    'Saul is anointed privately then chosen by lot at Mizpah; his family\'s donkey search reveals the small-farm economy of Benjamin — a tribe of modest agricultural holdings about to produce Israel\'s first king.',
    'ai_assisted'],

  // 1SA 11 — Saul defeats the Ammonites at Jabesh-gilead
  ['united-monarchy', '1SA', 11, 1, null,
    'Nahash besieges Jabesh-gilead in the Transjordan; Saul musters the tribes by sending pieces of slaughtered oxen through the territory — the emergency mobilization system of a tribal society without a standing army.',
    'ai_assisted'],

  // 1SA 12 — Samuel\'s farewell address
  ['united-monarchy', '1SA', 12, 1, null,
    'Samuel transitions authority to the new monarchy while warning against the economic costs of kingship — conscription, taxation, and land seizure — the price a tribal society pays for centralized government.',
    'ai_assisted'],

  // 1SA 14 — Jonathan\'s raid at Michmash
  ['united-monarchy', '1SA', 14, 1, null,
    'Jonathan climbs the rocky pass at Michmash to attack a Philistine garrison; the narrow wadi between two cliff faces is a natural defensive chokepoint in the Benjamin highlands that Israel\'s foot soldiers can exploit.',
    'ai_assisted'],

  // 1SA 15 — Saul\'s disobedience against the Amalekites
  ['united-monarchy', '1SA', 15, 1, null,
    'Saul spares the best Amalekite livestock and King Agag; the plunder from desert raiders includes sheep, cattle, and fattened calves — pastoral wealth that tempts a king whose army expects battlefield spoil.',
    'ai_assisted'],

  // 1SA 19 — Saul tries to kill David
  ['united-monarchy', '1SA', 19, 1, null,
    'David flees Saul\'s court and escapes through a window at night; the palace at Gibeah is a modest fortress compared to later royal architecture — the early monarchy\'s capital is still a small highland town.',
    'ai_assisted'],

  // 1SA 20 — David and Jonathan\'s covenant
  ['united-monarchy', '1SA', 20, 1, null,
    'The new moon feast at Saul\'s table is a regular royal banquet where attendance signals political loyalty; David\'s empty seat becomes a test of the court culture that is forming around the new monarchy.',
    'ai_assisted'],

  // 1SA 21 — David at Nob and Gath
  ['united-monarchy', '1SA', 21, 1, null,
    'David flees to the priestly town of Nob for bread and weapons, then to Philistine Gath — moving between Israel\'s religious infrastructure and enemy territory, surviving on the margins of two rival societies.',
    'ai_assisted'],

  // 1SA 22 — Saul massacres the priests of Nob
  ['united-monarchy', '1SA', 22, 1, null,
    'Saul slaughters eighty-five priests at Nob, destroying an entire priestly community; David gathers a band of four hundred debtors, discontented men, and outcasts at the cave of Adullam — a rival power base forming in the Judean wilderness.',
    'ai_assisted'],

  // 1SA 23 — David rescues Keilah and hides in Ziph
  ['united-monarchy', '1SA', 23, 1, null,
    'David defends Keilah from Philistine grain raiders then flees to the Wilderness of Ziph — the arid Judean wilderness south of Hebron, where caves and seasonal wadis provide refuge for fugitive bands.',
    'ai_assisted'],

  // 1SA 26 — David spares Saul again at Ziph
  ['united-monarchy', '1SA', 26, 1, null,
    'David infiltrates Saul\'s camp in the Wilderness of Ziph under cover of darkness; the encampment of three thousand soldiers with supply wagons reflects the early monarchy\'s field army logistics.',
    'ai_assisted'],

  // 1SA 27 — David among the Philistines at Ziklag
  ['united-monarchy', '1SA', 27, 1, null,
    'David serves as a Philistine vassal at Ziklag in the Negev, raiding Amalekite and Geshurite settlements while deceiving Achish — the complex political survival of a displaced warlord operating between two kingdoms.',
    'ai_assisted'],

  // 1SA 29 — Philistine lords reject David
  ['united-monarchy', '1SA', 29, 1, null,
    'The Philistine army musters at Aphek for war against Israel while David\'s loyalty is questioned; the five Philistine lords operate as a military council — a pentapolis confederacy unlike Israel\'s single monarchy.',
    'ai_assisted'],

  // 1SA 30 — David recovers Ziklag from Amalekite raiders
  ['united-monarchy', '1SA', 30, 1, null,
    'Amalekite raiders burn Ziklag and capture its inhabitants; David pursues across the Negev desert using an abandoned Egyptian slave as a guide — the harsh southern frontier where raiding is an economic way of life.',
    'ai_assisted'],

  // ============================================================
  // 2 SAMUEL  (11 chapters) — context_id: 'united-monarchy'
  // ============================================================

  // 2SA 3 — Abner defects to David; Joab murders Abner
  ['united-monarchy', '2SA', 3, 1, null,
    'Civil war between David\'s Hebron-based kingdom and Ish-bosheth\'s northern regime at Mahanaim; Abner\'s defection represents the political realignment of tribal commanders during the power transition.',
    'ai_assisted'],

  // 2SA 4 — Murder of Ish-bosheth
  ['united-monarchy', '2SA', 4, 1, null,
    'Two Benjaminite captains assassinate Ish-bosheth during his midday rest at Mahanaim — political violence in a society where succession is settled by force and the boundary between military service and murder is thin.',
    'ai_assisted'],

  // 2SA 8 — David\'s military victories and administration
  ['united-monarchy', '2SA', 8, 1, null,
    'David defeats Philistia, Moab, Zobah, Aram, and Edom, establishing an empire from the Euphrates to the Red Sea; tribute flows into Jerusalem and a formal bureaucracy of recorder, scribe, and army commander takes shape.',
    'ai_assisted'],

  // 2SA 10 — War with Ammon and Aram
  ['united-monarchy', '2SA', 10, 1, null,
    'A diplomatic insult from Ammon triggers a major war involving hired Aramean mercenaries from beyond the Euphrates; the battle at the gates of Rabbah reveals the international military alliances of the Transjordanian states.',
    'ai_assisted'],

  // 2SA 15 — Absalom\'s rebellion
  ['united-monarchy', '2SA', 15, 1, null,
    'Absalom steals the hearts of Israel at the Jerusalem gate where cases are judged, then declares himself king at Hebron — exploiting popular discontent with royal justice in a kingdom whose administrative reach has outpaced its institutions.',
    'ai_assisted'],

  // 2SA 16 — David flees Jerusalem
  ['united-monarchy', '2SA', 16, 1, null,
    'David crosses the Kidron valley and ascends the Mount of Olives barefoot as a mourner; Shimei pelts him with stones and curses — the humiliation of a deposed king on the road through the Judean wilderness.',
    'ai_assisted'],

  // 2SA 17 — Hushai defeats Ahithophel\'s counsel
  ['united-monarchy', '2SA', 17, 1, null,
    'Competing war councils in Jerusalem debate whether to pursue David immediately; the intelligence network of spies hiding at En Rogel and running to the Jordan valley reveals the covert infrastructure of a divided court.',
    'ai_assisted'],

  // 2SA 19 — David returns to Jerusalem
  ['united-monarchy', '2SA', 19, 1, null,
    'David crosses the Jordan at Gilgal and negotiates the return to power — Judah and Israel compete for the king\'s favor, exposing the north-south tribal rivalry that will eventually split the kingdom.',
    'ai_assisted'],

  // 2SA 20 — Sheba\'s revolt
  ['united-monarchy', '2SA', 20, 1, null,
    'A Benjaminite named Sheba rallies northern tribes against David with the cry "We have no share in David" — the fragile unity of the united monarchy already fracturing along tribal economic and political fault lines.',
    'ai_assisted'],

  // 2SA 22 — David\'s psalm of deliverance
  ['united-monarchy', '2SA', 22, 1, null,
    'David\'s victory hymn uses imagery of storms, earthquakes, and divine warrior theophany — a royal psalm from the court of a king who has unified the hill country, subdued coastal enemies, and built Jerusalem into a capital.',
    'ai_assisted'],

  // 2SA 23 — David\'s last words and mighty warriors
  ['united-monarchy', '2SA', 23, 1, null,
    'The roster of David\'s elite warriors names men from across the tribal territories — Judah, Benjamin, Ephraim, and even a Hittite — reflecting the cross-tribal military cohesion that made the united monarchy possible.',
    'ai_assisted'],

  // ============================================================
  // 1 KINGS 1-11  (8 chapters) — context_id: 'united-monarchy'
  // ============================================================

  // 1KI 1 — Adonijah\'s bid for the throne
  ['united-monarchy', '1KI', 1, 1, null,
    'Adonijah holds a coronation feast at En Rogel outside Jerusalem while David lies bedridden in the palace; the succession crisis reveals a court divided between military commanders and priestly factions.',
    'ai_assisted'],

  // 1KI 2 — David\'s charge to Solomon; consolidation of power
  ['united-monarchy', '1KI', 2, 1, null,
    'Solomon eliminates rivals — Adonijah, Joab, Shimei — and deposes the priest Abiathar to Anathoth; the kingdom consolidates through calculated political violence typical of ancient Near Eastern succession.',
    'ai_assisted'],

  // 1KI 4 — Solomon\'s administration and wealth
  ['united-monarchy', '1KI', 4, 1, null,
    'Solomon divides the kingdom into twelve administrative districts for taxation and provisioning, each supplying the royal court for one month — a centralized bureaucracy replacing the old tribal system with state infrastructure.',
    'ai_assisted'],

  // 1KI 6 — Building the Temple
  ['united-monarchy', '1KI', 6, 1, null,
    'The Temple is built from Lebanese cedar and Solomonic quarried stone over seven years, using Phoenician craftsmen and corvée labor — an international construction project reflecting the wealth and trade networks of the united monarchy.',
    'ai_assisted'],

  // 1KI 7 — Solomon\'s palace and Temple furnishings
  ['united-monarchy', '1KI', 7, 1, null,
    'Solomon\'s palace complex takes thirteen years to build; Hiram of Tyre casts massive bronze pillars and the molten sea — the royal court\'s architectural ambitions rivaling the great palaces of Egypt and Mesopotamia.',
    'ai_assisted'],

  // 1KI 8 — Dedication of the Temple
  ['united-monarchy', '1KI', 8, 1, null,
    'The entire nation gathers for the Temple dedication as the ark is installed in the Holy of Holies; the sacrifice of countless sheep and cattle represents the peak economic and religious expression of the united monarchy.',
    'ai_assisted'],

  // 1KI 9 — God\'s covenant with Solomon; building projects
  ['united-monarchy', '1KI', 9, 1, null,
    'Solomon\'s building projects include store-cities, chariot cities, and the fleet at Ezion-geber on the Red Sea; the conscripted labor force and international trade reveal an empire at its administrative and economic zenith.',
    'ai_assisted'],

  // 1KI 13 — Man of God from Judah
  ['divided-monarchy', '1KI', 13, 1, null,
    'A prophet from Judah confronts the altar at Bethel where Jeroboam has installed a rival cult — the religious infrastructure of the newly divided kingdom creating parallel worship systems to match the political split.',
    'ai_assisted'],

  // 1KI 14 — Decline of Jeroboam and Rehoboam
  ['divided-monarchy', '1KI', 14, 1, null,
    'Both kingdoms deteriorate simultaneously — Jeroboam\'s dynasty is condemned in the north while Shishak of Egypt plunders Jerusalem\'s Temple treasury in the south, exposing the military vulnerability of the divided states.',
    'ai_assisted'],

  // 1KI 15 — Abijam and Asa of Judah; Nadab and Baasha of Israel
  ['divided-monarchy', '1KI', 15, 1, null,
    'Rapid succession and border warfare between Judah and Israel define the early divided monarchy; Asa strips Temple and palace treasuries to buy an Aramean alliance — foreign policy funded by sacred wealth.',
    'ai_assisted'],

  // 1KI 16 — Northern dynasty changes: Baasha to Omri to Ahab
  ['divided-monarchy', '1KI', 16, 1, null,
    'Four northern kings rise and fall through assassination and civil war until Omri founds Samaria as a new capital on a strategically purchased hilltop — political instability giving way to a dynasty builder.',
    'ai_assisted'],

  // 1KI 20 — Ahab wars with Ben-hadad of Aram
  ['divided-monarchy', '1KI', 20, 1, null,
    'Ben-hadad of Damascus besieges Samaria and demands its silver, gold, and women; the Aramean-Israelite wars dominate the region\'s economy and military balance for decades along the trade routes of the northern Transjordan.',
    'ai_assisted'],

  // ============================================================
  // 2 KINGS  (15 chapters) — context_id varies
  // ============================================================

  // 2KI 1 — Ahaziah and Elijah
  ['divided-monarchy', '2KI', 1, 1, null,
    'King Ahaziah sends messengers to consult Baal-zebub at Ekron, a Philistine deity — the religious syncretism of the northern court reaching across national borders for healing power rather than consulting Israel\'s prophets.',
    'ai_assisted'],

  // 2KI 3 — Moab rebels; campaign with Judah and Edom
  ['divided-monarchy', '2KI', 3, 1, null,
    'Israel, Judah, and Edom march through the Negev to attack Moab; the coalition struggles with water supply in the wilderness — a joint military campaign exposing the logistical challenges of desert warfare between small kingdoms.',
    'ai_assisted'],

  // 2KI 4 — Elisha\'s miracles for ordinary people
  ['divided-monarchy', '2KI', 4, 1, null,
    'Elisha multiplies oil for a prophet\'s indebted widow and raises the Shunammite\'s son; these stories reveal the economic precarity of prophetic households and the agricultural prosperity of the Jezreel valley\'s landed gentry.',
    'ai_assisted'],

  // 2KI 7 — Siege of Samaria lifted
  ['divided-monarchy', '2KI', 7, 1, null,
    'Famine prices during the Aramean siege reach catastrophic levels — a donkey\'s head sells for eighty shekels; the sudden Aramean retreat floods the market with abandoned supplies, crashing prices overnight.',
    'ai_assisted'],

  // 2KI 8 — Elisha and Hazael; Jehoram and Ahaziah of Judah
  ['divided-monarchy', '2KI', 8, 1, null,
    'Elisha weeps knowing Hazael will devastate Israel; the Shunammite returns from a seven-year famine sojourn in Philistia — climate-driven displacement and the geopolitical consequences of Aramean regime change.',
    'ai_assisted'],

  // 2KI 10 — Jehu\'s purge of Baal worship
  ['divided-monarchy', '2KI', 10, 1, null,
    'Jehu massacres the house of Ahab and destroys the Baal temple in Samaria; the purge eliminates Phoenician religious influence that came through Jezebel\'s marriage alliance — political revolution disguised as religious reform.',
    'ai_assisted'],

  // 2KI 11 — Athaliah seizes Judah\'s throne; Joash crowned
  ['divided-monarchy', '2KI', 11, 1, null,
    'Athaliah, Ahab\'s daughter, rules Judah for six years while the infant Joash hides in the Temple compound — a northern-influenced queen on the southern throne, overthrown by a priestly coup centered on the Temple guard.',
    'ai_assisted'],

  // 2KI 13 — Jehoahaz and Jehoash of Israel; Elisha\'s death
  ['divided-monarchy', '2KI', 13, 1, null,
    'Aramean oppression reduces Israel\'s army to fifty horsemen and ten chariots — military devastation that reflects the economic drain of decades of border warfare on a small agricultural kingdom.',
    'ai_assisted'],

  // 2KI 14 — Amaziah of Judah and Jeroboam II of Israel
  ['divided-monarchy', '2KI', 14, 1, null,
    'Amaziah challenges Israel and is defeated; Jeroboam II expands Israel\'s borders to their greatest extent since Solomon — a period of northern prosperity fueled by trade along the King\'s Highway and Via Maris.',
    'ai_assisted'],

  // 2KI 15 — Last kings of Israel; Assyrian pressure builds
  ['divided-monarchy', '2KI', 15, 1, null,
    'Five northern kings in rapid succession as Assyria under Tiglath-pileser III begins extracting tribute; the political instability and economic drain of paying off a superpower accelerates the northern kingdom\'s collapse.',
    'ai_assisted'],

  // 2KI 16 — Ahaz of Judah submits to Assyria
  ['divided-monarchy', '2KI', 16, 1, null,
    'Ahaz strips Temple and palace treasuries to pay Assyrian tribute and installs an Assyrian-style altar in the Temple — vassal status reshaping Judah\'s religious architecture and depleting its economic reserves.',
    'ai_assisted'],

  // 2KI 19 — Hezekiah\'s prayer and Sennacherib\'s defeat
  ['divided-monarchy', '2KI', 19, 1, null,
    'Sennacherib\'s army besieges Jerusalem after conquering forty-six Judean cities; Hezekiah\'s tunnel provides water during the siege — the survival of a small vassal state against the Assyrian war machine.',
    'ai_assisted'],

  // 2KI 21 — Manasseh\'s long, idolatrous reign
  ['divided-monarchy', '2KI', 21, 1, null,
    'Manasseh\'s fifty-five-year reign as an Assyrian vassal fills Jerusalem with pagan altars, child sacrifice in the Hinnom valley, and cult prostitution — religious syncretism as the price of political survival under empire.',
    'ai_assisted'],

  // 2KI 23 — Josiah\'s reforms
  ['divided-monarchy', '2KI', 23, 1, null,
    'Josiah purges pagan shrines from Dan to Beersheba, centralizes worship in Jerusalem, and celebrates Passover on an unprecedented scale — religious reform as national renewal in the brief window between Assyrian collapse and Babylonian rise.',
    'ai_assisted'],

  // 2KI 25 — Fall of Jerusalem and exile
  ['climate-exile', '2KI', 25, 1, null,
    'Nebuchadnezzar\'s army breaches Jerusalem\'s walls after an eighteen-month siege, burns the Temple, and deports the ruling class to Babylon — the end of the Davidic monarchy and the beginning of stateless existence for Judah.',
    'ai_assisted'],

  // ============================================================
  // 1 CHRONICLES  (24 chapters) — context_id: 'united-monarchy'
  // ============================================================

  // 1CH 2 — Genealogy of Judah
  ['united-monarchy', '1CH', 2, 1, null,
    'Judah\'s genealogy traces the royal line through Perez to Jesse and David, anchoring the monarchy in tribal territory centered on Bethlehem and Hebron — the heartland of the united kingdom\'s southern power base.',
    'ai_assisted'],

  // 1CH 3 — David\'s descendants
  ['united-monarchy', '1CH', 3, 1, null,
    'David\'s sons born in Hebron and Jerusalem reflect the political marriages of a king consolidating power — each wife representing a tribal or diplomatic alliance in the growing empire.',
    'ai_assisted'],

  // 1CH 4 — Further Judah and Simeon genealogies
  ['united-monarchy', '1CH', 4, 1, null,
    'Clan lists include craftsmen, linen workers, and potters serving the king — specialized trades supporting the royal economy in settlements across the Shephelah and Negev.',
    'ai_assisted'],

  // 1CH 5 — Reuben, Gad, and half-Manasseh
  ['united-monarchy', '1CH', 5, 1, null,
    'The Transjordanian tribes occupy grazing lands east of the Jordan and fight Hagrite raiders; their eventual exile to Assyria is noted — pastoral economy on the vulnerable eastern frontier.',
    'ai_assisted'],

  // 1CH 6 — Levitical genealogies and cities
  ['united-monarchy', '1CH', 6, 1, null,
    'Levitical musicians appointed by David and forty-eight Levitical cities scattered across all tribal territories create a decentralized religious infrastructure serving the centralized Jerusalem worship.',
    'ai_assisted'],

  // 1CH 7 — Northern tribal genealogies
  ['united-monarchy', '1CH', 7, 1, null,
    'Issachar, Benjamin, Naphtali, Manasseh, Ephraim, and Asher genealogies include military census figures — tribal warrior counts reflecting the manpower base of the united monarchy\'s conscript army.',
    'ai_assisted'],

  // 1CH 8 — Benjamin\'s genealogy
  ['united-monarchy', '1CH', 8, 1, null,
    'Benjamin\'s clans settle around Gibeon, Aijalon, and Jerusalem — strategically located towns controlling the central ridge route between Judah and the northern tribes in the united kingdom.',
    'ai_assisted'],

  // 1CH 9 — Returnees and Temple gatekeepers
  ['united-monarchy', '1CH', 9, 1, null,
    'Temple gatekeepers, singers, and servants organized by David are listed alongside post-exilic returnees — the Chronicler linking monarchic worship institutions to their restoration after Babylon.',
    'ai_assisted'],

  // 1CH 11 — David becomes king; mighty warriors
  ['united-monarchy', '1CH', 11, 1, null,
    'David captures Jebus (Jerusalem) by exploiting its water shaft, then fortifies the city on its defensible ridge between two valleys — establishing a capital on the tribal boundary between Judah and Benjamin.',
    'ai_assisted'],

  // 1CH 12 — Warriors who joined David
  ['united-monarchy', '1CH', 12, 1, null,
    'Soldiers from every tribe defect to David at Ziklag and Hebron, bringing military specialties — Benjaminite ambidextrous archers, Gadite shield-bearers, Issachar men who understand the times — a cross-tribal coalition forming.',
    'ai_assisted'],

  // 1CH 14 — David defeats the Philistines
  ['united-monarchy', '1CH', 14, 1, null,
    'David twice defeats Philistine forces in the Rephaim valley southwest of Jerusalem; Hiram of Tyre sends cedar, carpenters, and masons — international recognition and building materials for the new capital.',
    'ai_assisted'],

  // 1CH 15 — Ark brought to Jerusalem
  ['united-monarchy', '1CH', 15, 1, null,
    'Levites carry the ark to Jerusalem with organized choirs and instrumentalists; the procession transforms the political capital into a religious center — David merging worship and governance in one city.',
    'ai_assisted'],

  // 1CH 16 — Worship established before the ark
  ['united-monarchy', '1CH', 16, 1, null,
    'David appoints Levitical musicians for daily worship before the ark in a tent on Zion while the tabernacle remains at Gibeon — a dual-sanctuary arrangement unique to the transitional period before the Temple.',
    'ai_assisted'],

  // 1CH 18 — David\'s military victories
  ['united-monarchy', '1CH', 18, 1, null,
    'David defeats Philistia, Moab, Zobah, and Aram-Damascus, collecting tribute of gold shields, bronze, and silver — imperial expansion transforming a highland kingdom into a regional power controlling major trade routes.',
    'ai_assisted'],

  // 1CH 19 — War with Ammon and Aram
  ['united-monarchy', '1CH', 19, 1, null,
    'The Ammonite-Aramean coalition hires mercenaries from Mesopotamia; Joab fights on two fronts outside the gates of Rabbah — the military costs of maintaining an empire against hostile Transjordanian and Syrian alliances.',
    'ai_assisted'],

  // 1CH 20 — Capture of Rabbah and Philistine battles
  ['united-monarchy', '1CH', 20, 1, null,
    'Joab captures Rabbah and its crown of gold and gems; Philistine giants fall in subsequent battles — the spoils of war funding the royal treasury and confirming military dominance over neighboring states.',
    'ai_assisted'],

  // 1CH 22 — David prepares materials for the Temple
  ['united-monarchy', '1CH', 22, 1, null,
    'David stockpiles iron, bronze, cedar, and dressed stone in vast quantities for the Temple; alien laborers are conscripted as stonecutters — imperial resources and forced labor directed toward sacred construction.',
    'ai_assisted'],

  // 1CH 23 — Levitical divisions organized
  ['united-monarchy', '1CH', 23, 1, null,
    'David organizes 38,000 Levites into divisions for Temple service, gate-keeping, and financial administration — a massive religious workforce institutionalized for the permanent sanctuary economy.',
    'ai_assisted'],

  // 1CH 24 — Priestly divisions
  ['united-monarchy', '1CH', 24, 1, null,
    'Twenty-four priestly courses are established by lot for rotating Temple service — a scheduling system that will govern worship logistics for centuries, including into the time of Zechariah, father of John the Baptist.',
    'ai_assisted'],

  // 1CH 25 — Musicians appointed
  ['united-monarchy', '1CH', 25, 1, null,
    'Two hundred eighty-eight trained musicians organized into twenty-four divisions provide continuous worship — a professional arts infrastructure funded by the united monarchy\'s Temple economy.',
    'ai_assisted'],

  // 1CH 26 — Gatekeepers and treasurers
  ['united-monarchy', '1CH', 26, 1, null,
    'Levitical gatekeepers guard the Temple storehouses of dedicated gifts, war plunder, and tithes — the security infrastructure for what functions as the national treasury and central bank of the united kingdom.',
    'ai_assisted'],

  // 1CH 27 — Military and civic administrators
  ['united-monarchy', '1CH', 27, 1, null,
    'Twelve monthly military divisions of 24,000 men each, tribal leaders, and royal estate managers for vineyards, olive groves, herds, and camels — the full administrative apparatus of the united monarchy.',
    'ai_assisted'],

  // 1CH 28 — David\'s charge to Solomon and Temple plans
  ['united-monarchy', '1CH', 28, 1, null,
    'David presents Temple blueprints with gold and silver weights specified for each furnishing — detailed architectural and material specifications for a construction project rivaling anything in the ancient Near East.',
    'ai_assisted'],

  // 1CH 29 — Freewill offerings and David\'s death
  ['united-monarchy', '1CH', 29, 1, null,
    'Leaders contribute tons of gold, silver, bronze, iron, and precious stones for the Temple; the national offering reflects the accumulated wealth of David\'s forty-year reign and his conquests.',
    'ai_assisted'],

  // ============================================================
  // 2 CHRONICLES  (29 chapters) — context_id: 'divided-monarchy'
  // ============================================================

  // 2CH 2 — Solomon requests Hiram\'s help
  ['divided-monarchy', '2CH', 2, 1, null,
    'Solomon negotiates with Tyre for cedar, cypress, and skilled craftsmen, paying in wheat, barley, wine, and olive oil — international trade financing the Temple with Canaan\'s agricultural surplus.',
    'ai_assisted'],

  // 2CH 3 — Temple construction on Mount Moriah
  ['divided-monarchy', '2CH', 3, 1, null,
    'The Temple rises on the threshing floor David purchased on Mount Moriah — an elevated site visible across Jerusalem, built with Lebanese cedar, gold overlay, and carved cherubim reflecting Phoenician architectural influence.',
    'ai_assisted'],

  // 2CH 4 — Temple furnishings
  ['divided-monarchy', '2CH', 4, 1, null,
    'Huram-abi casts the bronze sea, ten basins, and hundreds of implements; the sheer volume of bronze and gold reflects the mineral wealth flowing through Solomon\'s trade networks from Ophir, Tarshish, and Arabia.',
    'ai_assisted'],

  // 2CH 6 — Solomon\'s dedication prayer
  ['divided-monarchy', '2CH', 6, 1, null,
    'Solomon prays toward the Temple during drought, famine, plague, and military defeat — each scenario reflecting the real threats facing an agricultural kingdom dependent on seasonal rain in the Levantine climate.',
    'ai_assisted'],

  // 2CH 7 — Fire from heaven and God\'s covenant
  ['divided-monarchy', '2CH', 7, 1, null,
    'Fire consumes the sacrifices and glory fills the Temple; the fourteen-day celebration with enormous sacrificial feasts marks the peak of the united monarchy\'s religious and economic life.',
    'ai_assisted'],

  // 2CH 8 — Solomon\'s building and trade projects
  ['divided-monarchy', '2CH', 8, 1, null,
    'Solomon builds store-cities, chariot garrisons, and a Red Sea fleet at Ezion-geber; the conscripted non-Israelite labor force constructs the military and commercial infrastructure of the empire.',
    'ai_assisted'],

  // 2CH 11 — Rehoboam fortifies Judah
  ['divided-monarchy', '2CH', 11, 1, null,
    'Rehoboam fortifies fifteen cities across Judah with walls, gates, stores of food, oil, and wine — a defensive network protecting the southern kingdom after the traumatic split with the northern tribes.',
    'ai_assisted'],

  // 2CH 12 — Shishak invades Judah
  ['divided-monarchy', '2CH', 12, 1, null,
    'Pharaoh Shishak plunders Jerusalem\'s Temple treasuries with 1,200 chariots and 60,000 horsemen; Rehoboam replaces gold shields with bronze — a vivid marker of rapid economic decline after Solomon\'s death.',
    'ai_assisted'],

  // 2CH 13 — Abijah defeats Jeroboam
  ['divided-monarchy', '2CH', 13, 1, null,
    'Abijah addresses Jeroboam from Mount Zemaraim in the Ephraim hill country before a battle involving 800,000 northern and 400,000 southern troops — massive tribal mobilization along the contested border.',
    'ai_assisted'],

  // 2CH 14 — Asa\'s reforms and victory over Zerah
  ['divided-monarchy', '2CH', 14, 1, null,
    'Asa enjoys ten years of peace and builds fortified cities with walls and towers; he then defeats a massive Cushite army in the Shephelah — peace enabling economic development, followed by military crisis.',
    'ai_assisted'],

  // 2CH 15 — Asa\'s covenant renewal
  ['divided-monarchy', '2CH', 15, 1, null,
    'Asa gathers Judah, Benjamin, and northern defectors at Jerusalem for a covenant ceremony with the sacrifice of 700 oxen and 7,000 sheep from the war plunder — religious reform funded by military victory.',
    'ai_assisted'],

  // 2CH 16 — Asa\'s later years and Aramean alliance
  ['divided-monarchy', '2CH', 16, 1, null,
    'Asa sends Temple and palace silver and gold to Ben-hadad of Damascus to break Israel\'s border blockade at Ramah — sacred treasury depleted for a pragmatic military alliance with a pagan king.',
    'ai_assisted'],

  // 2CH 17 — Jehoshaphat\'s prosperity
  ['divided-monarchy', '2CH', 17, 1, null,
    'Jehoshaphat sends officials with Levites to teach the law in Judean cities; Philistines and Arabs bring tribute — religious education and military strength producing an era of prosperity and regional respect.',
    'ai_assisted'],

  // 2CH 18 — Jehoshaphat allies with Ahab at Ramoth-gilead
  ['divided-monarchy', '2CH', 18, 1, null,
    'Jehoshaphat joins Ahab to recapture Ramoth-gilead from Aram; four hundred court prophets guarantee victory while Micaiah alone dissents — the political pressure of military alliances overriding prophetic warning.',
    'ai_assisted'],

  // 2CH 19 — Jehoshaphat appoints judges
  ['divided-monarchy', '2CH', 19, 1, null,
    'Jehoshaphat establishes judges in every fortified city and a supreme court in Jerusalem with Levites, priests, and clan heads — a formal judicial system replacing ad hoc tribal justice across Judah.',
    'ai_assisted'],

  // 2CH 21 — Jehoram\'s wicked reign
  ['divided-monarchy', '2CH', 21, 1, null,
    'Jehoram murders his brothers, loses Edom and Libnah as vassals, and suffers a Philistine-Arab raid that carries off palace wealth and royal children — the rapid disintegration of a kingdom under a corrupt king.',
    'ai_assisted'],

  // 2CH 22 — Ahaziah and Athaliah
  ['divided-monarchy', '2CH', 22, 1, null,
    'Ahaziah rules one year under his mother Athaliah\'s influence before dying in Jehu\'s purge; Athaliah then seizes Judah\'s throne — northern court culture infiltrating the southern kingdom through royal marriage alliance.',
    'ai_assisted'],

  // 2CH 23 — Jehoiada\'s coup and Joash crowned
  ['divided-monarchy', '2CH', 23, 1, null,
    'The priest Jehoiada organizes Levites and military commanders to crown seven-year-old Joash in the Temple; Athaliah is executed at the palace gate — a Temple-based coup restoring the Davidic dynasty.',
    'ai_assisted'],

  // 2CH 24 — Joash repairs the Temple
  ['divided-monarchy', '2CH', 24, 1, null,
    'Joash collects a national tax to repair the Temple, which Athaliah\'s sons had stripped for Baal worship; craftsmen restore the building with stone, timber, iron, and bronze — sacred architecture rebuilt from neglect.',
    'ai_assisted'],

  // 2CH 25 — Amaziah\'s mixed reign
  ['divided-monarchy', '2CH', 25, 1, null,
    'Amaziah hires 100,000 northern mercenaries for 100 talents of silver, then dismisses them on prophetic advice; he defeats Edom but is crushed by Israel — the economic and military costs of inter-kingdom rivalry.',
    'ai_assisted'],

  // 2CH 26 — Uzziah\'s prosperity and downfall
  ['divided-monarchy', '2CH', 26, 1, null,
    'Uzziah builds towers, digs cisterns, develops agriculture in the Shephelah and desert, and fields a professional army with advanced weaponry — a king whose economic and military innovations are undone by priestly trespass.',
    'ai_assisted'],

  // 2CH 27 — Jotham\'s building and military success
  ['divided-monarchy', '2CH', 27, 1, null,
    'Jotham builds the upper gate of the Temple, fortifies the Ophel, and defeats Ammon, extracting massive tribute — a brief period of prosperity and building projects between his father\'s disgrace and his son\'s apostasy.',
    'ai_assisted'],

  // 2CH 28 — Ahaz\'s apostasy and Assyrian vassalage
  ['divided-monarchy', '2CH', 28, 1, null,
    'Ahaz suffers defeats from Aram, Israel, Edom, and Philistia, then submits to Assyria, stripping Temple furnishings for tribute — the cascading military and economic costs of a vassal relationship with a superpower.',
    'ai_assisted'],

  // 2CH 29 — Hezekiah reopens and purifies the Temple
  ['divided-monarchy', '2CH', 29, 1, null,
    'Hezekiah reopens the Temple on the first day of his reign; Levites spend sixteen days removing ritual defilement accumulated under Ahaz — religious restoration requiring physical labor and economic investment.',
    'ai_assisted'],

  // 2CH 30 — Hezekiah\'s Passover
  ['divided-monarchy', '2CH', 30, 1, null,
    'Hezekiah invites northern refugees and all Judah to a united Passover in Jerusalem; the celebration extends to fourteen days with thousands of sacrificial animals — national religious reunion after the north\'s fall to Assyria.',
    'ai_assisted'],

  // 2CH 31 — Tithes restored and Levitical support organized
  ['divided-monarchy', '2CH', 31, 1, null,
    'The people bring heaps of grain, wine, oil, and honey as tithes; storerooms are built to manage the surplus — the Temple economy revived with agricultural wealth flowing in from across Judah.',
    'ai_assisted'],

  // 2CH 32 — Sennacherib\'s invasion and Hezekiah\'s tunnel
  ['divided-monarchy', '2CH', 32, 1, null,
    'Hezekiah blocks springs outside Jerusalem and builds the Siloam tunnel to secure water during Sennacherib\'s siege — an engineering project reflecting the desperate hydraulic innovation required for a walled city under Assyrian assault.',
    'ai_assisted'],

  // 2CH 33 — Manasseh\'s captivity and repentance
  ['divided-monarchy', '2CH', 33, 1, null,
    'Manasseh is taken to Babylon in bronze chains by Assyrian commanders, then restored to his throne — a vassal king learning the physical cost of rebellion against the empire that controls the region\'s politics.',
    'ai_assisted'],

  // 2CH 35 — Josiah\'s Passover and death
  ['divided-monarchy', '2CH', 35, 1, null,
    'Josiah celebrates the greatest Passover since Samuel with 30,000 lambs and 3,000 bulls from the royal herds; he then dies at Megiddo confronting Pharaoh Neco — reform and tragedy compressed into one reign.',
    'ai_assisted'],

  // ============================================================
  // EZRA  (6 chapters) — context_id: 'climate-post-exile'
  // ============================================================

  // EZR 2 — List of returning exiles
  ['climate-post-exile', 'EZR', 2, 1, null,
    'Nearly 50,000 exiles return to Judah organized by family, town, and priestly division; the detailed registry includes livestock counts — a community reconstituting itself from Babylonian exile with whatever portable wealth they carry.',
    'ai_assisted'],

  // EZR 4 — Opposition to Temple rebuilding
  ['climate-post-exile', 'EZR', 4, 1, null,
    'Local officials and Samaritan settlers petition the Persian court to halt Temple reconstruction, citing Jerusalem\'s rebellious history — the political vulnerability of a tiny restoration community under imperial administration.',
    'ai_assisted'],

  // EZR 5 — Prophets encourage rebuilding; inquiry to Darius
  ['climate-post-exile', 'EZR', 5, 1, null,
    'Haggai and Zechariah prophesy while the provincial governor questions the Jews\' building authority and writes to Darius — every construction project in the Persian empire requires imperial permission.',
    'ai_assisted'],

  // EZR 6 — Temple completed and dedicated
  ['climate-post-exile', 'EZR', 6, 1, null,
    'Darius finds Cyrus\'s original decree in the Ecbatana archives and orders the Temple finished with provincial tax revenue; the dedication and Passover celebration mark the restored community\'s first institutional achievement.',
    'ai_assisted'],

  // EZR 8 — Ezra\'s caravan from Babylon
  ['climate-post-exile', 'EZR', 8, 1, null,
    'Ezra assembles families by the Ahava canal for the 900-mile journey to Jerusalem, carrying 25 tons of silver and gold donated by the Persian king — a vulnerable caravan crossing imperial territory without military escort.',
    'ai_assisted'],

  // EZR 10 — Public assembly and dissolution of mixed marriages
  ['climate-post-exile', 'EZR', 10, 1, null,
    'The community gathers in the rain at Jerusalem\'s Temple square to address intermarriage; the three-month investigation covers families across Judah — social crisis managed through public assembly in the small post-exilic settlement.',
    'ai_assisted'],

  // ============================================================
  // NEHEMIAH  (7 chapters) — context_id: 'climate-post-exile'
  // ============================================================

  // NEH 3 — Builders of the wall listed by section
  ['climate-post-exile', 'NEH', 3, 1, null,
    'Families, guilds, and district leaders each rebuild a section of Jerusalem\'s wall — goldsmiths, perfume-makers, and priests working alongside soldiers, revealing the occupational diversity of the small restoration community.',
    'ai_assisted'],

  // NEH 7 — Census of returned exiles
  ['climate-post-exile', 'NEH', 7, 1, null,
    'Nehemiah finds the original return registry listing families, servants, livestock, and donations; the population count reveals a community still small enough that every family\'s identity and contribution matters for survival.',
    'ai_assisted'],

  // NEH 9 — National confession and covenant renewal
  ['climate-post-exile', 'NEH', 9, 1, null,
    'The community fasts in sackcloth and recites salvation history from creation to the present crisis; the prayer acknowledges that they are "slaves in the land you gave our ancestors" — subjects of Persia on their own soil.',
    'ai_assisted'],

  // NEH 10 — Community covenant commitments
  ['climate-post-exile', 'NEH', 10, 1, null,
    'Leaders seal a written covenant pledging Sabbath observance, debt forgiveness, Temple tax, wood supply, and firstfruit offerings — the economic and religious infrastructure needed to sustain a tiny, vulnerable community.',
    'ai_assisted'],

  // NEH 11 — Resettlement of Jerusalem
  ['climate-post-exile', 'NEH', 11, 1, null,
    'One in ten families is chosen by lot to live inside Jerusalem\'s rebuilt walls; the city needs population to function economically and defensively — forced urban settlement to fill an underpopulated capital.',
    'ai_assisted'],

  // NEH 12 — Dedication of the wall
  ['climate-post-exile', 'NEH', 12, 1, null,
    'Two great choirs process in opposite directions atop the rebuilt wall, meeting at the Temple; the celebration is audible far away — a small community\'s architectural and spiritual achievement under Persian rule.',
    'ai_assisted'],

  // NEH 13 — Nehemiah\'s final reforms
  ['climate-post-exile', 'NEH', 13, 1, null,
    'Nehemiah returns from Persia to find Tobiah occupying a Temple storeroom, Levites unpaid and back farming, Sabbath commerce at the gates, and intermarriage resumed — the fragility of reform in a community surrounded by hostile neighbors.',
    'ai_assisted'],

  // ============================================================
  // ESTHER  (5 chapters) — context_id: 'climate-post-exile'
  // ============================================================

  // EST 4 — Mordecai urges Esther to act
  ['climate-post-exile', 'EST', 4, 1, null,
    'Mordecai sits in sackcloth at the king\'s gate in Susa while Esther is secluded in the harem; the Persian court\'s rigid protocol makes even approaching the king without summons a capital offense.',
    'ai_assisted'],

  // EST 6 — The king honors Mordecai
  ['climate-post-exile', 'EST', 6, 1, null,
    'The king\'s insomnia leads to reading the royal chronicles — Persia\'s meticulous record-keeping accidentally saves a Jewish courtier; Haman must lead Mordecai through Susa\'s streets in royal robes on a royal horse.',
    'ai_assisted'],

  // EST 7 — Haman\'s downfall
  ['climate-post-exile', 'EST', 7, 1, null,
    'Esther reveals Haman\'s genocide plot during a royal banquet; Haman is impaled on the stake he built for Mordecai — justice delivered through the Persian court\'s own culture of feasting and royal favor.',
    'ai_assisted'],

  // EST 9 — Jews defend themselves; Purim established
  ['climate-post-exile', 'EST', 9, 1, null,
    'Jews throughout the Persian empire\'s 127 provinces defend themselves on the thirteenth of Adar; the annual Purim festival is established with feasting, gifts, and charity — diaspora survival celebrated as communal holiday.',
    'ai_assisted'],

  // EST 10 — Mordecai\'s greatness
  ['climate-post-exile', 'EST', 10, 1, null,
    'Mordecai becomes second to King Ahasuerus, wielding imperial authority across the vast Persian administrative system — a Jewish exile at the pinnacle of the empire that governs the post-exilic world.',
    'ai_assisted'],
];

// --- Insert logic ---
const insert = db.prepare(`
  INSERT INTO passage_climate (context_id, book_id, chapter, verse_start, verse_end, context_note, source_tier)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((data) => {
  let count = 0;
  for (const r of data) {
    insert.run(...r);
    count++;
  }
  return count;
});

const count = insertMany(rows);
console.log(`Inserted ${count} passage_climate rows for Torah + Historical gaps.`);

// --- Verification ---
const books = [
  'GEN','EXO','LEV','NUM','DEU',
  'JOS','JDG',
  '1SA','2SA','1KI','2KI',
  '1CH','2CH',
  'EZR','NEH','EST'
];

const byBook = db.prepare(`
  SELECT book_id, COUNT(*) as c FROM passage_climate
  WHERE book_id IN (${books.map(() => '?').join(',')})
  GROUP BY book_id ORDER BY book_id
`).all(...books);
console.log('passage_climate by book:', JSON.stringify(byBook));

const totalChapters = db.prepare(`
  SELECT COUNT(DISTINCT book_id || ':' || chapter) as chapters FROM passage_climate
  WHERE book_id IN (${books.map(() => '?').join(',')})
`).get(...books);
console.log('Total distinct chapters covered:', totalChapters.chapters);

const byContext = db.prepare(`
  SELECT context_id, COUNT(*) as c FROM passage_climate
  WHERE book_id IN (${books.map(() => '?').join(',')})
  GROUP BY context_id ORDER BY context_id
`).all(...books);
console.log('By climate context:', JSON.stringify(byContext));

db.close();
