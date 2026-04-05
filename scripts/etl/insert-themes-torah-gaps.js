const db = require('better-sqlite3')('data/selah.db');

const ins = db.prepare(
  'INSERT INTO passage_themes (theme_id,book_id,chapter,verse_start,verse_end,relevance,context_note,source_tier) VALUES (?,?,?,?,?,?,?,?)'
);

const batch = db.transaction((rows) => {
  for (const r of rows) ins.run(...r);
});

batch([
  // ============================================================
  // GENESIS
  // ============================================================

  // GEN 5 — Genealogy from Adam to Noah
  ['inheritance', 'GEN', 5, 1, 32, 'primary',
    'Ten generations traced from Adam to Noah, each entry recording how the line of promise survived through ordinary births and deaths — inheritance is biological continuity carrying theological weight.', 'ai_assisted'],
  ['name-and-naming', 'GEN', 5, 1, 32, 'secondary',
    'Each patriarch is named and his years counted, the genealogy functioning as a roll call of those who bore the image of God across the pre-flood world.', 'ai_assisted'],
  ['divine-plan', 'GEN', 5, 1, 32, 'illustrative',
    'Enoch walked with God and was taken, a single disruption in the rhythm of "and he died" — the genealogy quietly insists that death is not the last word.', 'ai_assisted'],

  // GEN 10 — Table of Nations
  ['name-and-naming', 'GEN', 10, 1, 32, 'primary',
    'Seventy nations descended from Shem, Ham, and Japheth are catalogued by family, language, and territory — naming the peoples of the earth locates all humanity within one family tree.', 'ai_assisted'],
  ['divine-plan', 'GEN', 10, 1, 32, 'primary',
    'The scattering of nations across the earth fulfills the creation mandate to fill the world, the diversity of peoples unfolding as part of God\'s design rather than as accident.', 'ai_assisted'],
  ['inheritance', 'GEN', 10, 1, 32, 'secondary',
    'Each clan inherits its territory and identity through its ancestor — land, language, and lineage are bound together as the post-flood world takes shape.', 'ai_assisted'],

  // GEN 20 — Abraham and Abimelech
  ['sovereignty', 'GEN', 20, 1, 18, 'primary',
    'God intervenes in a dream to prevent Abimelech from touching Sarah, protecting the covenant line even when Abraham\'s deception endangered it.', 'ai_assisted'],
  ['covenant', 'GEN', 20, 1, 18, 'secondary',
    'Abraham is identified as a prophet whose prayer can heal, yet he is the one who lied — the covenant calling persists despite the covenant-bearer\'s moral failure.', 'ai_assisted'],
  ['fear', 'GEN', 20, 11, 13, 'illustrative',
    'Abraham admits he assumed there was no fear of God in Gerar, so he resorted to deception — fear of human danger displaced trust in divine protection.', 'ai_assisted'],

  // GEN 35 — Jacob returns to Bethel
  ['covenant', 'GEN', 35, 1, 29, 'primary',
    'God reaffirms the Abrahamic promises to Jacob at Bethel, renaming him Israel — the covenant is renewed at the same place where Jacob first encountered God as a fugitive.', 'ai_assisted'],
  ['worship', 'GEN', 35, 1, 7, 'secondary',
    'Jacob commands his household to put away foreign gods and purify themselves before building an altar at Bethel — worship demands the removal of all rivals.', 'ai_assisted'],
  ['name-and-naming', 'GEN', 35, 10, 18, 'illustrative',
    'God renames Jacob to Israel, and Rachel names her dying son Ben-oni (son of my sorrow), but Jacob renames him Benjamin (son of the right hand) — naming carries the power to redefine destiny.', 'ai_assisted'],

  // GEN 36 — Esau's descendants
  ['inheritance', 'GEN', 36, 1, 44, 'primary',
    'Esau\'s descendants and the chiefs of Edom are catalogued in meticulous detail, showing that the rejected line also received land and nationhood — God\'s provision extends beyond the chosen line.', 'ai_assisted'],
  ['name-and-naming', 'GEN', 36, 1, 44, 'primary',
    'Dozens of clan names, place names, and chief titles are recorded for Edom, preserving the identity of a people who will remain Israel\'s neighbor and rival for centuries.', 'ai_assisted'],
  ['divine-plan', 'GEN', 36, 1, 44, 'secondary',
    'The genealogy of Esau is placed immediately before the Joseph narrative, closing one family branch before opening the next stage of the chosen line\'s story.', 'ai_assisted'],

  // ============================================================
  // EXODUS
  // ============================================================

  // EXO 4 — Moses' signs and return to Egypt
  ['calling', 'EXO', 4, 1, 31, 'primary',
    'God equips the reluctant Moses with three miraculous signs — staff-to-serpent, leprous hand, water-to-blood — answering every objection until only raw unwillingness remains.', 'ai_assisted'],
  ['obedience', 'EXO', 4, 18, 31, 'secondary',
    'Moses finally returns to Egypt and the elders of Israel believe when they see the signs, bowing in worship — obedience, however delayed, sets deliverance in motion.', 'ai_assisted'],
  ['sovereignty', 'EXO', 4, 21, 23, 'illustrative',
    'God declares He will harden Pharaoh\'s heart and that Israel is His firstborn son — the coming confrontation is framed as a contest over whose authority is ultimate.', 'ai_assisted'],

  // EXO 6 — God reaffirms the covenant with Moses
  ['covenant', 'EXO', 6, 1, 30, 'primary',
    'God reveals Himself by the name YHWH and recites the four "I will" promises — I will bring you out, free you, redeem you, take you as my people — anchoring the exodus in covenant commitment.', 'ai_assisted'],
  ['sovereignty', 'EXO', 6, 1, 8, 'secondary',
    'God declares He has heard the groaning of Israel and remembered His covenant, the language of sovereign initiative — redemption begins with God\'s memory, not Israel\'s merit.', 'ai_assisted'],
  ['inheritance', 'EXO', 6, 2, 8, 'illustrative',
    'The promise of land sworn to Abraham, Isaac, and Jacob is invoked again, tying the coming liberation to an inheritance that predates the slavery by centuries.', 'ai_assisted'],

  // EXO 8 — Plagues of frogs, gnats, and flies
  ['sovereignty', 'EXO', 8, 1, 32, 'primary',
    'Each plague targets an aspect of Egyptian life that Pharaoh claims to control — frogs from the Nile, gnats from the dust, swarms of flies — God demonstrating authority over the very elements Egypt worships.', 'ai_assisted'],
  ['judgment', 'EXO', 8, 1, 32, 'primary',
    'The distinction made between Goshen and the rest of Egypt during the plague of flies reveals that judgment is targeted, not arbitrary — God knows the difference between His people and their oppressors.', 'ai_assisted'],
  ['obedience', 'EXO', 8, 25, 32, 'illustrative',
    'Pharaoh bargains, offering partial release, but Moses insists on complete obedience to God\'s terms — compromise with oppression is not the same as freedom.', 'ai_assisted'],

  // EXO 10 — Plagues of locusts and darkness
  ['judgment', 'EXO', 10, 1, 29, 'primary',
    'Locusts devour every green thing and thick darkness blankets Egypt for three days — the created order itself turns against the nation that defied its Creator.', 'ai_assisted'],
  ['sovereignty', 'EXO', 10, 1, 2, 'secondary',
    'God states that He has hardened Pharaoh\'s heart so that these signs may be recounted to future generations — the plagues serve a pedagogical purpose beyond the immediate crisis.', 'ai_assisted'],
  ['fear', 'EXO', 10, 7, 11, 'illustrative',
    'Pharaoh\'s own servants beg him to let Israel go, recognizing what their king refuses to see — even the court knows Egypt is being destroyed.', 'ai_assisted'],

  // EXO 27 — Altar and court of the tabernacle
  ['worship', 'EXO', 27, 1, 21, 'primary',
    'The bronze altar\'s dimensions and the courtyard\'s linen curtains are specified in exact detail — the place of sacrifice is carefully bounded, worship requiring both access and reverence.', 'ai_assisted'],
  ['presence-of-god', 'EXO', 27, 20, 21, 'secondary',
    'Pure olive oil must keep the lamps burning from evening to morning before the LORD continually — the perpetual flame signifies unbroken divine presence in Israel\'s midst.', 'ai_assisted'],
  ['holiness', 'EXO', 27, 9, 19, 'illustrative',
    'The courtyard is demarcated by fine twisted linen supported by bronze pillars, creating a visible boundary between the sacred precinct and the camp — holiness requires separation.', 'ai_assisted'],

  // EXO 28 — Priestly garments
  ['holiness', 'EXO', 28, 1, 43, 'primary',
    'Aaron\'s garments are designed for glory and beauty, every detail — ephod, breastpiece, robe, turban — declaring that the one who approaches God on behalf of the people must be visibly set apart.', 'ai_assisted'],
  ['presence-of-god', 'EXO', 28, 29, 30, 'secondary',
    'Aaron bears the names of the twelve tribes on the breastpiece over his heart whenever he enters the Holy Place — the priest carries the people into God\'s presence bodily.', 'ai_assisted'],
  ['community', 'EXO', 28, 9, 21, 'illustrative',
    'The names of all twelve tribes are engraved on the onyx shoulder stones and the breastpiece gems — no tribe is omitted, the entire community represented before God.', 'ai_assisted'],

  // EXO 29 — Consecration of priests
  ['sacrifice', 'EXO', 29, 1, 46, 'primary',
    'A bull for sin offering, a ram for burnt offering, and a ram of ordination — three sacrifices required to consecrate the priests, because those who mediate holiness must first be made holy themselves.', 'ai_assisted'],
  ['holiness', 'EXO', 29, 1, 46, 'primary',
    'Blood is applied to the right ear, thumb, and big toe of Aaron and his sons — consecration touches hearing, doing, and going, sanctifying the whole person for service.', 'ai_assisted'],
  ['presence-of-god', 'EXO', 29, 43, 46, 'illustrative',
    'God promises to meet Israel at the tent of meeting and dwell among them — the entire elaborate consecration ritual exists to make this indwelling possible.', 'ai_assisted'],

  // EXO 30 — Incense altar, census tax, anointing oil
  ['worship', 'EXO', 30, 1, 38, 'primary',
    'The incense altar stands before the veil, its fragrant smoke ascending perpetually — prayer made visible, a sensory declaration that communication between God and people never ceases.', 'ai_assisted'],
  ['atonement', 'EXO', 30, 11, 16, 'secondary',
    'Every Israelite counted in the census must pay a half-shekel ransom, rich and poor alike — atonement has a cost, and that cost is equal for all.', 'ai_assisted'],
  ['holiness', 'EXO', 30, 22, 33, 'illustrative',
    'The anointing oil\'s recipe is sacred and may not be replicated for common use — holiness is not available for imitation or private appropriation.', 'ai_assisted'],

  // EXO 37 — Construction of the ark, table, lampstand, incense altar
  ['obedience', 'EXO', 37, 1, 29, 'primary',
    'Bezalel constructs the ark, the table, the lampstand, and the incense altar exactly as God commanded — craftsmanship becomes obedience when the blueprint is divine.', 'ai_assisted'],
  ['presence-of-god', 'EXO', 37, 1, 9, 'secondary',
    'The mercy seat with its two cherubim is fashioned from pure gold, the place where God will speak — the most sacred object in Israel is built by human hands according to heavenly specification.', 'ai_assisted'],
  ['worship', 'EXO', 37, 17, 24, 'illustrative',
    'The lampstand is hammered from a single talent of pure gold, its almond-blossom design echoing the tree of life — light in God\'s house is crafted beauty, not mere utility.', 'ai_assisted'],

  // EXO 38 — Bronze altar and court construction
  ['sacrifice', 'EXO', 38, 1, 31, 'primary',
    'The bronze altar of burnt offering is constructed as the first thing encountered in the courtyard — before anything else, there must be a place where life is offered.', 'ai_assisted'],
  ['generosity', 'EXO', 38, 21, 31, 'secondary',
    'The inventory tallies a ton of gold, nearly four tons of silver, and two and a half tons of bronze — the sheer volume of materials donated reveals a people giving extravagantly for God\'s dwelling.', 'ai_assisted'],
  ['community', 'EXO', 38, 21, 31, 'illustrative',
    'The materials are accounted for by the Levites under Ithamar\'s direction, every contribution tracked — communal generosity requires communal accountability.', 'ai_assisted'],

  // EXO 39 — Priestly garments completed
  ['obedience', 'EXO', 39, 1, 43, 'primary',
    'The refrain "as the LORD commanded Moses" appears seven times in this chapter — the garments are not designed by human taste but executed according to divine instruction.', 'ai_assisted'],
  ['holiness', 'EXO', 39, 1, 31, 'secondary',
    'Blue, purple, and scarlet yarns are woven into the ephod and breastpiece, with "Holy to the LORD" engraved on the turban plate — every thread and gem declares consecration.', 'ai_assisted'],
  ['blessing', 'EXO', 39, 42, 43, 'illustrative',
    'Moses inspects the completed work, sees it done as commanded, and blesses the people — faithful completion of sacred work invites blessing, echoing God\'s approval of creation.', 'ai_assisted'],

  // ============================================================
  // LEVITICUS
  // ============================================================

  // LEV 2 — Grain offering
  ['sacrifice', 'LEV', 2, 1, 16, 'primary',
    'The grain offering brings the fruit of daily labor — fine flour, oil, frankincense — into the sacrificial system, declaring that ordinary provision belongs to God before it belongs to the one who grew it.', 'ai_assisted'],
  ['worship', 'LEV', 2, 1, 16, 'secondary',
    'A memorial portion is burned on the altar while the rest goes to the priests — worship and provision intertwine, the offering sustaining both the divine relationship and the human mediators.', 'ai_assisted'],
  ['holiness', 'LEV', 2, 11, 13, 'illustrative',
    'No leaven or honey may be included, but salt must never be absent — the covenant of salt signifies permanence, and the exclusions guard against corruption in what is presented to God.', 'ai_assisted'],

  // LEV 3 — Peace offering
  ['sacrifice', 'LEV', 3, 1, 17, 'primary',
    'The peace offering is the only sacrifice where the worshiper eats a portion alongside God and the priest — communion, not just atonement, is the goal of this rite.', 'ai_assisted'],
  ['community', 'LEV', 3, 1, 17, 'secondary',
    'The shared meal created by the peace offering enacts fellowship between God, priest, and worshiper — the sacrificial system builds community around a common table.', 'ai_assisted'],
  ['worship', 'LEV', 3, 1, 5, 'illustrative',
    'The offerer lays hands on the animal\'s head and slaughters it at the entrance of the tent of meeting — worship requires personal participation, not passive observation.', 'ai_assisted'],

  // LEV 5 — Guilt offering
  ['sin', 'LEV', 5, 1, 26, 'primary',
    'Guilt offerings address specific violations — failing to testify, touching unclean things, rash oaths — the law names concrete sins rather than abstract guilt, making repentance tangible.', 'ai_assisted'],
  ['sacrifice', 'LEV', 5, 1, 26, 'secondary',
    'If the offender cannot afford a lamb, two turtledoves suffice; if not even those, fine flour — the sacrificial system scales to the worshiper\'s means, ensuring no one is excluded from atonement.', 'ai_assisted'],
  ['justice', 'LEV', 5, 14, 26, 'illustrative',
    'Restitution of the principal plus a fifth is required alongside the guilt offering — forgiveness does not erase the obligation to make the injured party whole.', 'ai_assisted'],

  // LEV 9 — Aaron's first sacrifices
  ['presence-of-god', 'LEV', 9, 1, 24, 'primary',
    'Fire comes out from before the LORD and consumes the burnt offering on the altar — God\'s glory appears as the sacrificial system becomes operational, divine fire validating human obedience.', 'ai_assisted'],
  ['sacrifice', 'LEV', 9, 1, 24, 'primary',
    'Aaron offers sin offering, burnt offering, grain offering, and peace offering in sequence on his first day — the full spectrum of sacrifice enacted in a single inaugural moment.', 'ai_assisted'],
  ['worship', 'LEV', 9, 22, 24, 'illustrative',
    'Aaron lifts his hands and blesses the people, then the glory of the LORD appears and the people shout and fall on their faces — worship reaches its climax when blessing and divine presence converge.', 'ai_assisted'],

  // LEV 13 — Laws for diagnosing skin diseases
  ['ceremonial-law', 'LEV', 13, 1, 59, 'primary',
    'Detailed criteria distinguish infectious skin diseases from harmless conditions — the priest functions as public health guardian, the diagnostic process protecting the community from contagion.', 'ai_assisted'],
  ['holiness', 'LEV', 13, 1, 59, 'secondary',
    'The afflicted person must live outside the camp and cry "Unclean, unclean" — the separation is painful but serves the holiness of the community, the individual bearing the cost of communal protection.', 'ai_assisted'],
  ['community', 'LEV', 13, 45, 46, 'illustrative',
    'Exclusion from the camp is not punishment but quarantine; the priest re-examines regularly, watching for healing — the community\'s boundary is firm but not permanent.', 'ai_assisted'],

  // LEV 14 — Cleansing from skin diseases
  ['ceremonial-law', 'LEV', 14, 1, 57, 'primary',
    'The cleansing ritual uses two birds — one slaughtered over running water, the other dipped in its blood and released alive — a vivid enactment of impurity carried away, restoration made visible.', 'ai_assisted'],
  ['sacrifice', 'LEV', 14, 10, 32, 'secondary',
    'The healed person brings guilt offering, sin offering, and burnt offering, with blood applied to right ear, thumb, and toe — reentry into the community requires the same consecration pattern as priestly ordination.', 'ai_assisted'],
  ['community', 'LEV', 14, 1, 9, 'illustrative',
    'The priest goes outside the camp to examine the healed person and then oversees a seven-day process of reintegration — restoration to community is not instant but gradual and supervised.', 'ai_assisted'],

  // LEV 17 — Centralization of sacrifice and blood prohibition
  ['sacrifice', 'LEV', 17, 1, 16, 'primary',
    'All slaughter for sacrifice must occur at the entrance of the tent of meeting — centralization prevents idolatrous freelancing and ensures that every offering passes through authorized mediation.', 'ai_assisted'],
  ['holiness', 'LEV', 17, 10, 16, 'primary',
    'The blood is the life, and God has given it for atonement on the altar — the prohibition against eating blood encodes the theology that life belongs to God alone and cannot be consumed casually.', 'ai_assisted'],
  ['ceremonial-law', 'LEV', 17, 1, 16, 'illustrative',
    'Hunters must drain and cover the blood of wild game, extending the blood prohibition beyond the altar to everyday life — ceremonial law shapes daily habits.', 'ai_assisted'],

  // LEV 20 — Penalties for violations of holiness code
  ['justice', 'LEV', 20, 1, 27, 'primary',
    'Severe penalties are prescribed for Molech worship, mediums, and sexual violations — the sanctions protect the community by treating breaches of holiness as threats to collective survival.', 'ai_assisted'],
  ['holiness', 'LEV', 20, 7, 8, 'primary',
    'God commands "Consecrate yourselves and be holy, for I am the LORD your God" — holiness is not optional aspiration but commanded identity, grounded in who God is.', 'ai_assisted'],
  ['community', 'LEV', 20, 1, 6, 'illustrative',
    'The whole community participates in enforcing the penalties — communal responsibility means individual sin is never merely a private matter.', 'ai_assisted'],

  // LEV 21 — Holiness rules for priests
  ['holiness', 'LEV', 21, 1, 24, 'primary',
    'Priests face stricter purity requirements than laypeople — no contact with the dead except closest kin, no torn garments, no shaved heads — the higher the calling, the more demanding the consecration.', 'ai_assisted'],
  ['ceremonial-law', 'LEV', 21, 1, 24, 'secondary',
    'Physical blemishes disqualify a priest from offering food at the altar, though he may still eat of it — the ceremonial law distinguishes between presence and function in sacred service.', 'ai_assisted'],
  ['law', 'LEV', 21, 1, 15, 'illustrative',
    'The high priest may not approach any dead body, not even for his own parents — the demand of purity at the highest level of mediation overrides even the deepest natural attachments.', 'ai_assisted'],

  // LEV 22 — Rules for eating sacred offerings
  ['law', 'LEV', 22, 1, 33, 'primary',
    'Priests who are unclean must not eat the sacred donations until they are purified — access to holy food requires holy condition, the meal enforcing the boundary between clean and unclean.', 'ai_assisted'],
  ['holiness', 'LEV', 22, 17, 33, 'secondary',
    'Offerings must be without blemish to be acceptable — a blind, injured, or diseased animal profanes the sanctuary, because what is given to God must reflect His perfection.', 'ai_assisted'],
  ['ceremonial-law', 'LEV', 22, 10, 16, 'illustrative',
    'A priest\'s household may eat the sacred food, but a hired worker or guest may not — the ceremonial law draws precise lines around who participates in the benefits of sacred service.', 'ai_assisted'],

  // LEV 24 — Lamp oil, showbread, and the blasphemer
  ['worship', 'LEV', 24, 1, 9, 'primary',
    'Pure oil for the perpetual lamp and twelve loaves of showbread arranged each Sabbath — the twin symbols of light and bread declare that God\'s presence is sustained by continual worship.', 'ai_assisted'],
  ['justice', 'LEV', 24, 10, 23, 'primary',
    'The blasphemer is stoned and the principle of lex talionis — eye for eye, fracture for fracture — is stated, establishing proportional justice as the standard that protects both the divine name and human dignity.', 'ai_assisted'],
  ['community', 'LEV', 24, 22, 22, 'illustrative',
    'One standard of justice applies to the sojourner and the native alike — the law refuses to create a two-tier system, binding the stranger into the same covenant expectations.', 'ai_assisted'],

  // LEV 27 — Vows and dedications
  ['generosity', 'LEV', 27, 1, 34, 'primary',
    'Voluntary vows dedicating persons, animals, houses, or land to the LORD are regulated with specific valuations — generosity toward God is encouraged but must be fulfilled, not casually promised.', 'ai_assisted'],
  ['holiness', 'LEV', 27, 28, 29, 'secondary',
    'Anything devoted to the LORD under the ban cannot be redeemed or sold — the most extreme form of dedication is irreversible, a permanent transfer from human to divine ownership.', 'ai_assisted'],
  ['ceremonial-law', 'LEV', 27, 1, 34, 'illustrative',
    'Tithe of the land and herd belongs to the LORD automatically, every tenth animal passing under the rod — the closing chapter frames all of Leviticus within a system of sacred obligation.', 'ai_assisted'],

  // ============================================================
  // NUMBERS
  // ============================================================

  // NUM 4 — Levitical duties for transporting the tabernacle
  ['holiness', 'NUM', 4, 1, 49, 'primary',
    'The Kohathites carry the most sacred objects but must not touch or look at them uncovered — proximity to holiness increases both privilege and danger.', 'ai_assisted'],
  ['community', 'NUM', 4, 1, 49, 'secondary',
    'Kohathites, Gershonites, and Merarites each receive distinct transport duties — the tabernacle moves only when every clan fulfills its specific role, communal responsibility divided by skill and assignment.', 'ai_assisted'],
  ['obedience', 'NUM', 4, 17, 20, 'illustrative',
    'Aaron and his sons must cover the holy objects before the Kohathites enter, lest they die — exact obedience to the protocol is the difference between service and catastrophe.', 'ai_assisted'],

  // NUM 5 — Uncleanness, restitution, and the jealousy ordeal
  ['ceremonial-law', 'NUM', 5, 1, 31, 'primary',
    'Those with skin diseases, discharges, or corpse contamination are sent outside the camp — the camp\'s purity mirrors the holiness of the God who dwells at its center.', 'ai_assisted'],
  ['justice', 'NUM', 5, 5, 10, 'secondary',
    'Confession and full restitution plus a fifth are required for wrongs committed — justice in the covenant community demands both verbal acknowledgment and material repair.', 'ai_assisted'],
  ['community', 'NUM', 5, 11, 31, 'illustrative',
    'The jealousy ordeal provides a ritual resolution when suspicion threatens a marriage — the community cannot function when trust is broken, so the law provides a mechanism for adjudication rather than vigilante justice.', 'ai_assisted'],

  // NUM 7 — Tribal leaders' offerings at the altar dedication
  ['generosity', 'NUM', 7, 1, 89, 'primary',
    'Each tribal leader brings identical offerings over twelve days — silver plates, gold dishes, animals — the repetition emphasizing that every tribe contributes equally to the inauguration of worship.', 'ai_assisted'],
  ['worship', 'NUM', 7, 1, 89, 'primary',
    'The altar is anointed and dedicated, then each tribe presents its offering in turn over twelve consecutive days — worship as ordered sequence rather than spontaneous chaos.', 'ai_assisted'],
  ['community', 'NUM', 7, 1, 89, 'illustrative',
    'No tribe is omitted or given precedence; each brings the same gifts on its appointed day — equality in worship expresses unity in the covenant community.', 'ai_assisted'],

  // NUM 8 — Consecration of the Levites
  ['holiness', 'NUM', 8, 1, 26, 'primary',
    'The Levites are sprinkled with purification water, shaved, and washed before being presented as a wave offering — consecration for service requires thorough cleansing, the whole body made ready.', 'ai_assisted'],
  ['sacrifice', 'NUM', 8, 5, 22, 'secondary',
    'The Israelites lay hands on the Levites, who then lay hands on the bulls for sin and burnt offerings — a chain of substitution, the Levites standing in for the firstborn of all Israel.', 'ai_assisted'],
  ['calling', 'NUM', 8, 14, 19, 'illustrative',
    'The Levites are taken from among the people and given to Aaron for tabernacle service — calling is both separation from the ordinary and assignment to the sacred.', 'ai_assisted'],

  // NUM 9 — Second Passover and the cloud
  ['presence-of-god', 'NUM', 9, 15, 23, 'primary',
    'The cloud covers the tabernacle by day and fire by night, and Israel moves or stays according to its movement — God\'s presence is not abstract but visibly directs every stage of the journey.', 'ai_assisted'],
  ['obedience', 'NUM', 9, 15, 23, 'secondary',
    'Whether the cloud stayed two days, a month, or a year, the people waited and moved only at the LORD\'s command — obedience means matching your timetable to God\'s.', 'ai_assisted'],
  ['mercy', 'NUM', 9, 6, 14, 'illustrative',
    'Those who missed Passover due to corpse contamination receive a second chance to observe it one month later — the law accommodates unavoidable impurity rather than permanently excluding the willing.', 'ai_assisted'],

  // NUM 15 — Supplementary offering laws and the Sabbath-breaker
  ['ceremonial-law', 'NUM', 15, 1, 41, 'primary',
    'Grain and drink offerings must accompany every animal sacrifice in specified proportions — the law integrates agricultural produce with animal offerings, making worship a whole-life act.', 'ai_assisted'],
  ['justice', 'NUM', 15, 32, 36, 'secondary',
    'A man found gathering sticks on the Sabbath is executed by the congregation — the severity signals that Sabbath-breaking is not a minor infraction but a rejection of God\'s created order.', 'ai_assisted'],
  ['holiness', 'NUM', 15, 37, 41, 'illustrative',
    'Tassels with a blue cord on garment corners serve as constant reminders to obey all of God\'s commands — holiness is woven into clothing, making every glance a call to faithfulness.', 'ai_assisted'],

  // NUM 18 — Duties and portions for priests and Levites
  ['calling', 'NUM', 18, 1, 32, 'primary',
    'Aaron\'s family bears the iniquity connected with the sanctuary — priesthood is not privilege alone but liability, the priests absorbing the risk of Israel\'s approach to the Holy.', 'ai_assisted'],
  ['providence', 'NUM', 18, 8, 32, 'primary',
    'Priests receive portions of the offerings and Levites receive the tithe as their inheritance instead of land — God provides for His servants through the generosity of His people.', 'ai_assisted'],
  ['community', 'NUM', 18, 21, 24, 'illustrative',
    'The Levites\' tithe is both their wage and their share of community life — economic provision is structured so that those who serve the sanctuary are sustained by the whole nation.', 'ai_assisted'],

  // NUM 19 — Red heifer and purification water
  ['law', 'NUM', 19, 1, 22, 'primary',
    'An unblemished red heifer is burned entirely — skin, flesh, blood, dung — and its ashes mixed with water create the purification solution for corpse contamination, the most potent impurity requiring the most elaborate remedy.', 'ai_assisted'],
  ['ceremonial-law', 'NUM', 19, 1, 22, 'secondary',
    'The paradox of the red heifer: the one who prepares the purification water becomes unclean in the process — the ritual itself generates the impurity it is designed to resolve.', 'ai_assisted'],
  ['holiness', 'NUM', 19, 11, 22, 'illustrative',
    'Anyone who touches a corpse is unclean for seven days and must be sprinkled on the third and seventh days — death and holiness are incompatible, and the journey back to cleanness takes time.', 'ai_assisted'],

  // NUM 28 — Daily, Sabbath, and monthly offerings
  ['worship', 'NUM', 28, 1, 31, 'primary',
    'The daily tamid offering of two lambs, one at morning and one at twilight, frames every day with sacrifice — Israel\'s worship is not occasional but continual, structuring time itself around God.', 'ai_assisted'],
  ['sacrifice', 'NUM', 28, 1, 31, 'primary',
    'Sabbath offerings double the daily portion, and new moon festivals add bulls, rams, and lambs — the sacrificial calendar escalates at each marker of sacred time.', 'ai_assisted'],
  ['ceremonial-law', 'NUM', 28, 1, 31, 'illustrative',
    'Precise quantities of flour, oil, and wine accompany each animal — the ceremonial system leaves nothing to improvisation, every element measured and specified.', 'ai_assisted'],

  // NUM 29 — Festival offerings: Trumpets, Atonement, Booths
  ['worship', 'NUM', 29, 1, 40, 'primary',
    'The seventh month concentrates three major observances — Feast of Trumpets, Day of Atonement, Feast of Booths — making it the most sacred month in Israel\'s liturgical calendar.', 'ai_assisted'],
  ['sacrifice', 'NUM', 29, 12, 38, 'secondary',
    'During Booths, the number of bulls decreases daily from thirteen to seven over seven days, totaling seventy — a number traditionally linked to the seventy nations, the offerings radiating outward beyond Israel.', 'ai_assisted'],
  ['ceremonial-law', 'NUM', 29, 1, 40, 'illustrative',
    'Each festival day specifies exact animal counts, grain measures, and drink offerings — the ceremonial calendar encodes theology in quantities, each number carrying significance.', 'ai_assisted'],

  // NUM 30 — Laws about vows
  ['obedience', 'NUM', 30, 1, 17, 'primary',
    'A man who makes a vow to the LORD must not break his word but must do everything he said — the mouth binds the will, and God holds the speaker accountable for every pledge.', 'ai_assisted'],
  ['community', 'NUM', 30, 1, 17, 'secondary',
    'A father may annul his daughter\'s vow and a husband his wife\'s on the day he hears it — the law recognizes that individual vows affect the household, embedding personal piety within communal structures.', 'ai_assisted'],
  ['justice', 'NUM', 30, 15, 15, 'illustrative',
    'If a husband waits and then later annuls a vow, he bears the woman\'s iniquity — the responsibility for broken promises transfers to the one who caused the breach, not the one who made the vow.', 'ai_assisted'],

  // NUM 31 — War against Midian
  ['judgment', 'NUM', 31, 1, 54, 'primary',
    'The LORD commands vengeance against Midian for the Baal-Peor seduction — the war is framed as divine judgment executed through human agency, not mere territorial expansion.', 'ai_assisted'],
  ['holiness', 'NUM', 31, 19, 24, 'secondary',
    'Warriors must purify themselves and their captives outside the camp for seven days, and all plunder must pass through fire or water — even justified warfare creates impurity that must be cleansed.', 'ai_assisted'],
  ['generosity', 'NUM', 31, 25, 54, 'illustrative',
    'The plunder is divided equally between soldiers and the congregation, with portions set aside for the LORD and the Levites — war\'s gains are distributed according to covenant justice, not winner-take-all.', 'ai_assisted'],

  // NUM 32 — Reuben and Gad settle east of the Jordan
  ['inheritance', 'NUM', 32, 1, 42, 'primary',
    'Reuben, Gad, and half of Manasseh request the Transjordan for their livestock-rich clans — the question of inheritance expands beyond the original promise boundaries, testing the flexibility of divine provision.', 'ai_assisted'],
  ['community', 'NUM', 32, 6, 32, 'secondary',
    'Moses rebukes them for potentially discouraging the other tribes, and they pledge to cross the Jordan armed and fight until every tribe receives its inheritance — individual benefit must not come at communal cost.', 'ai_assisted'],
  ['obedience', 'NUM', 32, 20, 24, 'illustrative',
    'The agreement is conditional: if they fight alongside their brothers, the land is theirs; if not, their sin will find them out — the covenant community enforces shared obligation.', 'ai_assisted'],

  // NUM 33 — Itinerary of Israel's wilderness journeys
  ['pilgrimage', 'NUM', 33, 1, 56, 'primary',
    'Forty-two stages of the journey from Rameses to the plains of Moab are recorded — the comprehensive itinerary transforms wandering into purposeful pilgrimage, every stop a waypoint in God\'s plan.', 'ai_assisted'],
  ['divine-plan', 'NUM', 33, 1, 56, 'secondary',
    'Moses recorded the starting points of their journeys at the LORD\'s command — the wilderness route was not random but divinely directed, each departure and arrival part of a larger design.', 'ai_assisted'],
  ['inheritance', 'NUM', 33, 50, 56, 'illustrative',
    'God commands Israel to drive out all inhabitants and destroy their images when they cross the Jordan — the inheritance of the land requires the complete removal of idolatrous influences.', 'ai_assisted'],

  // NUM 34 — Boundaries of the promised land
  ['inheritance', 'NUM', 34, 1, 29, 'primary',
    'God specifies the exact borders of Canaan — southern desert, western sea, northern mountains, eastern Jordan — the inheritance is not vague promise but surveyed territory with defined boundaries.', 'ai_assisted'],
  ['divine-plan', 'NUM', 34, 1, 15, 'secondary',
    'The boundaries are declared before the conquest begins, God describing the land as already given — the divine plan precedes human action, the map drawn before the first battle.', 'ai_assisted'],
  ['community', 'NUM', 34, 16, 29, 'illustrative',
    'Named leaders from each tribe are appointed to oversee the distribution — the allocation of inheritance is a communal act requiring recognized authority, not a land grab by the strongest.', 'ai_assisted'],

  // NUM 35 — Levitical cities and cities of refuge
  ['justice', 'NUM', 35, 1, 34, 'primary',
    'Six cities of refuge protect the manslayer from blood vengeance until trial — the system distinguishes murder from accidental killing, embedding due process into the legal framework.', 'ai_assisted'],
  ['mercy', 'NUM', 35, 9, 28, 'secondary',
    'The accidental killer finds asylum in the city of refuge until the high priest\'s death, after which he may return home — mercy provides a temporal boundary to the consequences of unintentional harm.', 'ai_assisted'],
  ['community', 'NUM', 35, 1, 8, 'illustrative',
    'Forty-eight cities with surrounding pasturelands are given to the Levites from each tribe\'s inheritance — the priestly tribe is distributed throughout the nation rather than concentrated, embedding sacred presence in every region.', 'ai_assisted'],

  // NUM 36 — Inheritance of Zelophehad's daughters
  ['inheritance', 'NUM', 36, 1, 13, 'primary',
    'Zelophehad\'s daughters must marry within their father\'s tribe so that tribal inheritance does not transfer — the ruling balances women\'s right to inherit with the stability of tribal land allotments.', 'ai_assisted'],
  ['justice', 'NUM', 36, 1, 13, 'secondary',
    'The tribal leaders raise the concern and Moses adjudicates with divine authority — justice is refined through community dialogue, earlier rulings adjusted when unforeseen consequences emerge.', 'ai_assisted'],
  ['community', 'NUM', 36, 1, 13, 'illustrative',
    'The book of Numbers closes with a legal ruling that preserves each tribe\'s territorial integrity — communal identity is tied to land, and the law protects that bond across generations.', 'ai_assisted'],

  // ============================================================
  // DEUTERONOMY
  // ============================================================

  // DEU 2 — Journey through Edom, Moab, and Ammon
  ['sovereignty', 'DEU', 2, 1, 37, 'primary',
    'God declares that He gave Seir to Esau, Ar to Moab, and Ammon to Lot\'s descendants — Israel\'s God is sovereign over all nations\' land allotments, not just Israel\'s.', 'ai_assisted'],
  ['divine-plan', 'DEU', 2, 1, 37, 'secondary',
    'Thirty-eight years of wilderness wandering are summarized in a single verse, the old generation dying off as God had sworn — the plan unfolds on God\'s timeline, not Israel\'s.', 'ai_assisted'],
  ['pilgrimage', 'DEU', 2, 1, 8, 'illustrative',
    'Israel circles Mount Seir for many days before God finally says "You have been going around this mountain long enough; turn northward" — the wilderness detour had a purpose, but it also had an endpoint.', 'ai_assisted'],

  // DEU 7 — Command to destroy Canaanite nations
  ['chosen-people', 'DEU', 7, 1, 26, 'primary',
    'Israel is chosen not because of its size or merit but because the LORD loved them and kept His oath to the fathers — election is grounded in divine love and faithfulness, not human deservedness.', 'ai_assisted'],
  ['holiness', 'DEU', 7, 1, 6, 'secondary',
    'No covenants, no intermarriage, no mercy toward the idolatrous nations — the severity of separation protects the holiness of a people set apart for God\'s exclusive worship.', 'ai_assisted'],
  ['covenant', 'DEU', 7, 7, 15, 'illustrative',
    'God promises to love, bless, and multiply those who keep His commandments, extending the covenant blessings to the next generation — faithfulness begets blessing across time.', 'ai_assisted'],

  // DEU 11 — Love and obey for blessing
  ['obedience', 'DEU', 11, 1, 32, 'primary',
    'Moses urges Israel to love the LORD and keep His commandments always, tying the command to vivid memories of Egypt, the Red Sea, and the wilderness — obedience is fueled by remembrance.', 'ai_assisted'],
  ['blessing', 'DEU', 11, 8, 21, 'secondary',
    'The land of promise depends on rain from heaven, not irrigation like Egypt — blessing is tied to dependence on God, the geography itself requiring faith rather than self-sufficiency.', 'ai_assisted'],
  ['covenant', 'DEU', 11, 26, 32, 'illustrative',
    'Blessing and curse are set before Israel, to be proclaimed on Mount Gerizim and Mount Ebal — the covenant demands a choice, and the landscape will bear witness to the decision.', 'ai_assisted'],

  // DEU 12 — Centralized worship
  ['worship', 'DEU', 12, 1, 32, 'primary',
    'Israel must destroy every Canaanite worship site and seek the place the LORD will choose to put His name — worship is not wherever you please but where God designates, centralization preventing syncretism.', 'ai_assisted'],
  ['holiness', 'DEU', 12, 1, 4, 'secondary',
    'High places, pillars, Asherah poles, and carved images must be demolished and their names obliterated — holiness begins with the destruction of every alternative object of worship.', 'ai_assisted'],
  ['community', 'DEU', 12, 5, 14, 'illustrative',
    'Families are to eat their tithes and offerings together at the central sanctuary, rejoicing before the LORD — centralized worship creates communal celebration, pilgrimage binding scattered families into one people.', 'ai_assisted'],

  // DEU 13 — Warnings against idolatry
  ['holiness', 'DEU', 13, 1, 19, 'primary',
    'Even a prophet who performs signs must be rejected if he leads toward other gods — the test of truth is not miracles but fidelity to the LORD, holiness of worship trumping spectacle.', 'ai_assisted'],
  ['justice', 'DEU', 13, 12, 18, 'secondary',
    'A city that turns to idolatry must be placed under the ban and burned entirely — the severity of the penalty reflects the existential threat that apostasy poses to the covenant community.', 'ai_assisted'],
  ['obedience', 'DEU', 13, 1, 5, 'illustrative',
    'False prophets are tests from God to see whether Israel loves the LORD with all their heart — obedience is proven not in easy times but when compelling alternatives present themselves.', 'ai_assisted'],

  // DEU 14 — Clean and unclean foods, tithes
  ['ceremonial-law', 'DEU', 14, 1, 29, 'primary',
    'Detailed lists of clean and unclean animals echo Leviticus 11, the dietary laws making every meal a decision about holiness — you are what you eat becomes a theological statement.', 'ai_assisted'],
  ['holiness', 'DEU', 14, 1, 2, 'secondary',
    'Israel must not cut themselves or shave their foreheads for the dead, because they are a holy people — bodily practices distinguish God\'s people from their neighbors\' mourning rituals.', 'ai_assisted'],
  ['generosity', 'DEU', 14, 22, 29, 'illustrative',
    'Every third year the tithe is stored locally for the Levite, the sojourner, the orphan, and the widow — the tithe system funds both worship and social welfare, generosity structured into the calendar.', 'ai_assisted'],

  // DEU 15 — Sabbatical year and generosity to the poor
  ['justice', 'DEU', 15, 1, 23, 'primary',
    'Every seventh year all debts are released and Hebrew slaves freed — the sabbatical principle prevents permanent poverty and permanent servitude, resetting economic inequality periodically.', 'ai_assisted'],
  ['generosity', 'DEU', 15, 7, 11, 'primary',
    'Moses commands open-handedness toward the poor brother, warning against the grudging thought that the year of release is near — generosity must overcome economic calculation.', 'ai_assisted'],
  ['community', 'DEU', 15, 12, 18, 'illustrative',
    'A freed slave must be sent away furnished liberally from flock, threshing floor, and wine press — freedom without resources is hollow, the community ensuring that liberation includes provision.', 'ai_assisted'],

  // DEU 16 — Three pilgrimage festivals
  ['worship', 'DEU', 16, 1, 22, 'primary',
    'Passover, Weeks, and Booths require all males to appear at the central sanctuary — the three annual pilgrimages create rhythms of national gathering that reinforce shared identity and shared story.', 'ai_assisted'],
  ['community', 'DEU', 16, 11, 14, 'secondary',
    'Sons, daughters, servants, Levites, sojourners, orphans, and widows are all included in the celebration — the festivals are not exclusive but radically inclusive, joy shared across every social boundary.', 'ai_assisted'],
  ['justice', 'DEU', 16, 18, 20, 'illustrative',
    'Judges and officers are appointed in every town to render just judgment — the transition from festival laws to judicial appointment links worship and justice as twin pillars of communal life.', 'ai_assisted'],

  // DEU 17 — The king and the court
  ['justice', 'DEU', 17, 1, 20, 'primary',
    'Difficult cases are referred to the Levitical priests and the judge at the central sanctuary, whose verdict is binding on pain of death — the legal system establishes a supreme court for cases beyond local competence.', 'ai_assisted'],
  ['obedience', 'DEU', 17, 14, 20, 'secondary',
    'The future king must write his own copy of the law and read it daily — royal power is constrained by Torah, the king a student of God\'s word rather than a source of it.', 'ai_assisted'],
  ['holiness', 'DEU', 17, 14, 17, 'illustrative',
    'The king must not multiply horses, wives, or silver — the limits on royal accumulation guard against the pride that turns a servant-leader into a tyrant.', 'ai_assisted'],

  // DEU 18 — Levitical provision and the prophet like Moses
  ['providence', 'DEU', 18, 1, 22, 'primary',
    'The Levites have no territorial inheritance — the LORD is their inheritance — and they live on the offerings brought by the other tribes.', 'ai_assisted'],
  ['prophecy', 'DEU', 18, 15, 22, 'primary',
    'God promises to raise a prophet like Moses from among their brothers — the future mediator will speak God\'s words directly, and the test of authenticity is whether the prophecy comes true.', 'ai_assisted'],
  ['holiness', 'DEU', 18, 9, 14, 'illustrative',
    'Divination, sorcery, mediums, and necromancy are abominations — seeking knowledge from any source other than God\'s appointed channels violates the boundary between the holy and the forbidden.', 'ai_assisted'],

  // DEU 19 — Cities of refuge and legal witnesses
  ['justice', 'DEU', 19, 1, 21, 'primary',
    'Three cities of refuge are designated to protect the accidental manslayer, with provision to add three more if the territory expands — justice scales with the size of the community it serves.', 'ai_assisted'],
  ['mercy', 'DEU', 19, 1, 10, 'secondary',
    'The roads to the cities of refuge must be maintained and the distances kept manageable — mercy is not merely declared but infrastructurally supported, the physical landscape shaped by compassion.', 'ai_assisted'],
  ['community', 'DEU', 19, 15, 21, 'illustrative',
    'A single witness cannot convict; two or three are required, and false witnesses receive the punishment they sought to impose — the legal system protects against both injustice and perjury.', 'ai_assisted'],

  // DEU 20 — Rules of warfare
  ['justice', 'DEU', 20, 1, 20, 'primary',
    'Before battle the priest speaks and the officers exempt the fearful, the newly betrothed, and those with new houses or vineyards — warfare is constrained by humanitarian and religious principles.', 'ai_assisted'],
  ['sovereignty', 'DEU', 20, 1, 4, 'secondary',
    'Israel must not fear large armies because the LORD their God, who brought them out of Egypt, goes with them — military confidence rests on divine sovereignty, not numerical advantage.', 'ai_assisted'],
  ['community', 'DEU', 20, 5, 9, 'illustrative',
    'Exemptions for new houses, new vineyards, and new marriages protect the fabric of civilian life even in wartime — the community\'s future matters as much as the current battle.', 'ai_assisted'],

  // DEU 21 — Unsolved murder, captive wives, rebellious sons, burial
  ['justice', 'DEU', 21, 1, 23, 'primary',
    'When a murder victim is found in open country, the nearest city\'s elders must perform a heifer ritual and declare their innocence — unsolved bloodshed pollutes the land, and the community must formally address it.', 'ai_assisted'],
  ['community', 'DEU', 21, 18, 21, 'secondary',
    'A rebellious son is brought before the elders by both parents and stoned by the community — parental authority is backed by communal enforcement, the family unit embedded in the larger social order.', 'ai_assisted'],
  ['ceremonial-law', 'DEU', 21, 22, 23, 'illustrative',
    'A hanged man\'s body must not remain on the tree overnight because it defiles the land — even the executed criminal retains enough dignity to require prompt burial.', 'ai_assisted'],

  // DEU 22 — Miscellaneous laws on property, purity, and sexuality
  ['community', 'DEU', 22, 1, 30, 'primary',
    'Lost animals and fallen donkeys must be helped, not ignored — the law mandates active neighborliness, turning indifference into a punishable offense.', 'ai_assisted'],
  ['holiness', 'DEU', 22, 5, 12, 'secondary',
    'Prohibitions against cross-dressing, mixed seeds, mixed fabrics, and yoking ox with donkey enforce distinctions that mirror the broader command to maintain boundaries between categories God has separated.', 'ai_assisted'],
  ['justice', 'DEU', 22, 13, 30, 'illustrative',
    'Laws governing accusations of premarital unchastity, adultery, and sexual assault include specific evidentiary requirements and penalties — the legal system protects both honor and the accused\'s right to defense.', 'ai_assisted'],

  // DEU 23 — Exclusions from the assembly and camp purity
  ['holiness', 'DEU', 23, 1, 26, 'primary',
    'Certain persons are excluded from the assembly of the LORD, while Edomites and Egyptians may enter in the third generation — the boundary of holiness is permeable in specific directions, exclusion tempered by gradual inclusion.', 'ai_assisted'],
  ['ceremonial-law', 'DEU', 23, 9, 14, 'secondary',
    'The military camp must be kept clean because the LORD walks in its midst — even the latrine regulations carry theological weight, bodily hygiene reflecting divine presence.', 'ai_assisted'],
  ['justice', 'DEU', 23, 15, 26, 'illustrative',
    'A runaway slave must not be returned to his master but allowed to live freely in any town he chooses — the law subverts the property logic of slavery with the priority of human dignity.', 'ai_assisted'],

  // DEU 24 — Marriage, labor, and social justice laws
  ['justice', 'DEU', 24, 1, 24, 'primary',
    'Wages must be paid the same day, millstones must not be taken as pledges, and gleanings must be left for the sojourner, orphan, and widow — justice is encoded in economic practices that protect the vulnerable.', 'ai_assisted'],
  ['community', 'DEU', 24, 1, 5, 'secondary',
    'A newly married man is exempt from military service for one year to bring happiness to his wife — the community values domestic stability enough to legislate protection for it.', 'ai_assisted'],
  ['mercy', 'DEU', 24, 17, 22, 'illustrative',
    'Israel must remember they were slaves in Egypt as the motivation for treating the vulnerable justly — mercy is rooted in memory, the experience of suffering becoming the foundation of compassion.', 'ai_assisted'],

  // DEU 25 — Levirate marriage, fair weights, and Amalek
  ['justice', 'DEU', 25, 1, 19, 'primary',
    'Punishment is limited to forty lashes, the ox must not be muzzled while treading grain, and merchants must use honest weights — justice operates in the details of daily life, not just in courts.', 'ai_assisted'],
  ['community', 'DEU', 25, 5, 10, 'secondary',
    'Levirate marriage obligates a brother to raise children for his deceased brother, preserving the dead man\'s name and inheritance — the community\'s memory of its members extends beyond death.', 'ai_assisted'],
  ['inheritance', 'DEU', 25, 5, 10, 'illustrative',
    'The refusal to perform levirate duty brings public shaming at the gate — inheritance rights are so important that social pressure enforces the obligation when legal compulsion cannot.', 'ai_assisted'],

  // DEU 26 — Firstfruits confession and tithe declaration
  ['worship', 'DEU', 26, 1, 19, 'primary',
    'The worshiper recites the creedal narrative — "A wandering Aramean was my father" — while presenting firstfruits, embedding personal gratitude within the national story of deliverance.', 'ai_assisted'],
  ['generosity', 'DEU', 26, 12, 15, 'secondary',
    'The tithe declaration affirms that the giver has not withheld from the Levite, sojourner, orphan, or widow — generosity is accountable, the worshiper making a sworn statement before God.', 'ai_assisted'],
  ['covenant', 'DEU', 26, 16, 19, 'illustrative',
    'Israel declares the LORD is their God and the LORD declares Israel is His treasured people — the covenant is a mutual avowal, both parties publicly claiming the other.', 'ai_assisted'],

  // DEU 29 — Covenant renewal in Moab
  ['covenant', 'DEU', 29, 1, 29, 'primary',
    'Moses renews the covenant with the generation born in the wilderness, making it explicitly with those who stand here today and those who are not yet present — the covenant binds future generations.', 'ai_assisted'],
  ['obedience', 'DEU', 29, 1, 29, 'secondary',
    'The warnings against secret idolatry and presumptuous sin make clear that the covenant demands wholehearted commitment — partial obedience is treated as full disobedience.', 'ai_assisted'],
  ['judgment', 'DEU', 29, 22, 28, 'illustrative',
    'Future generations and foreigners will ask why the land was devastated, and the answer will be: because they abandoned the covenant — the ruined land itself becomes a witness to broken faith.', 'ai_assisted'],
]);

console.log('Done Torah themes');
db.close();
