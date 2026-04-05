const db = require('better-sqlite3')('data/selah.db');
const ins = db.prepare('INSERT INTO character_appearances (character_id,book_id,chapter,verse_start,verse_end,role,emotional_state,motivation,stakes,narrative_note,modern_parallel,source_tier) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)');
const batch = db.transaction((rows) => { for (const r of rows) ins.run(...r); });

batch([
  // ===== JOB (31 missing chapters) =====

  // JOB 2 — Satan tests Job's body; Job's wife tells him to curse God
  ['job','JOB',2,1,null,'protagonist','agonized-endurance',null,null,'Job sits in ashes scraping boils with pottery, his wife says curse God and die, he refuses',null,'scholarship'],
  ['god','JOB',2,1,null,'deuteragonist','sovereign-permission',null,null,'God permits Satan to strike Job\'s body but not take his life',null,'scholarship'],

  // JOB 5 — Eliphaz continues his first speech
  ['eliphaz','JOB',5,1,null,'protagonist','confident-counsel',null,null,'Eliphaz tells Job that God wounds but also binds up, urging him to accept divine discipline',null,'scholarship'],
  ['job','JOB',5,1,null,'deuteragonist','silent-listener',null,null,'Job listens as Eliphaz insists the righteous are never forsaken',null,'scholarship'],

  // JOB 6 — Job replies to Eliphaz
  ['job','JOB',6,1,null,'protagonist','raw-anguish',null,null,'Job wishes his grief could be weighed and says his friends are as unreliable as seasonal streams',null,'scholarship'],

  // JOB 7 — Job laments to God
  ['job','JOB',7,1,null,'protagonist','despairing-plea',null,null,'Job compares life to forced labor and asks God why He has made him a target',null,'scholarship'],

  // JOB 10 — Job questions God directly
  ['job','JOB',10,1,null,'protagonist','bitter-interrogation',null,null,'Job asks God whether it pleases Him to oppress the work of His own hands',null,'scholarship'],

  // JOB 12 — Job mocks his friends' wisdom
  ['job','JOB',12,1,null,'protagonist','sardonic-defiance',null,null,'Job says even animals know what his friends are telling him and that God tears down what cannot be rebuilt',null,'scholarship'],

  // JOB 13 — Job demands to speak directly to God
  ['job','JOB',13,1,null,'protagonist','bold-confrontation',null,null,'Job tells his friends they are worthless physicians and declares he will argue his case before God even if it kills him',null,'scholarship'],

  // JOB 14 — Job meditates on mortality
  ['job','JOB',14,1,null,'protagonist','melancholic-resignation',null,null,'Job says a tree has more hope than a man because at least a stump can sprout again',null,'scholarship'],

  // JOB 15 — Eliphaz's second speech
  ['eliphaz','JOB',15,1,null,'protagonist','indignant-rebuke',null,null,'Eliphaz accuses Job of undermining piety and says the wicked writhe in pain all their days',null,'scholarship'],
  ['job','JOB',15,1,null,'deuteragonist','weary-listener',null,null,'Job endures another round of accusation from his oldest friend',null,'scholarship'],

  // JOB 16 — Job's reply, the witness in heaven
  ['job','JOB',16,1,null,'protagonist','wounded-hope',null,null,'Job calls his friends miserable comforters and declares he has a witness in heaven who will vouch for him',null,'scholarship'],

  // JOB 17 — Job sees the grave ahead
  ['job','JOB',17,1,null,'protagonist','bleak-resignation',null,null,'Job says his spirit is broken, his days are extinct, and the grave is his only house',null,'scholarship'],

  // JOB 18 — Bildad's second speech
  ['bildad','JOB',18,1,null,'protagonist','dogmatic-warning',null,null,'Bildad describes the fate of the wicked in terrifying detail, implying it applies to Job',null,'scholarship'],
  ['job','JOB',18,1,null,'deuteragonist','silenced',null,null,'Job listens as Bildad paints a picture of doom meant for him',null,'scholarship'],

  // JOB 19 — I know that my Redeemer lives
  ['job','JOB',19,1,null,'protagonist','defiant-faith',null,null,'Job cries that his friends have tormented him ten times but declares I know that my Redeemer lives and in my flesh I shall see God',null,'scholarship'],

  // JOB 20 — Zophar's second speech
  ['zophar','JOB',20,1,null,'protagonist','self-righteous-certainty',null,null,'Zophar insists the triumph of the wicked is brief and their food turns to poison in their stomachs',null,'scholarship'],
  ['job','JOB',20,1,null,'deuteragonist','unpersuaded',null,null,'Job hears yet another retribution theology lecture',null,'scholarship'],

  // JOB 21 — Job challenges retribution theology
  ['job','JOB',21,1,null,'protagonist','frustrated-clarity',null,null,'Job asks why the wicked live on and grow old and mighty, demolishing the friends\' neat theology',null,'scholarship'],

  // JOB 22 — Eliphaz's third speech
  ['eliphaz','JOB',22,1,null,'protagonist','accusatory',null,null,'Eliphaz drops all subtlety and accuses Job of specific sins: stripping the naked, withholding bread from the hungry',null,'scholarship'],
  ['job','JOB',22,1,null,'deuteragonist','falsely-accused',null,null,'Job is charged with crimes he did not commit by a friend running out of arguments',null,'scholarship'],

  // JOB 23 — Job searches for God
  ['job','JOB',23,1,null,'protagonist','desperate-longing',null,null,'Job says if only he could find God he would lay his case before Him, but God hides and Job is terrified',null,'scholarship'],

  // JOB 24 — Job on injustice in the world
  ['job','JOB',24,1,null,'protagonist','prophetic-outrage',null,null,'Job catalogs the suffering of the poor and asks why God does not set times for judgment',null,'scholarship'],

  // JOB 25 — Bildad's brief third speech
  ['bildad','JOB',25,1,null,'protagonist','diminished-argument',null,null,'Bildad manages only six verses about human unworthiness before God, the shortest speech in the cycle',null,'scholarship'],
  ['job','JOB',25,1,null,'deuteragonist','unmoved',null,null,'Job waits as Bildad\'s arguments finally run dry',null,'scholarship'],

  // JOB 26 — Job on God's power
  ['job','JOB',26,1,null,'protagonist','awestruck-irony',null,null,'Job sarcastically thanks Bildad then describes God hanging the earth over nothing and stirring the sea with His power',null,'scholarship'],

  // JOB 27 — Job maintains his innocence
  ['job','JOB',27,1,null,'protagonist','unyielding-integrity',null,null,'Job swears by the living God that his lips will not speak falsehood and he will not deny his integrity till he dies',null,'scholarship'],

  // JOB 30 — Job's present misery
  ['job','JOB',30,1,null,'protagonist','humiliated-grief',null,null,'Job says those younger than him whose fathers he would have disdained now mock him, and God has thrown him into the mud',null,'scholarship'],

  // JOB 31 — Job's final oath of innocence
  ['job','JOB',31,1,null,'protagonist','solemn-self-examination',null,null,'Job takes a comprehensive oath listing every sin he might have committed and calling for God\'s verdict, then falls silent',null,'scholarship'],

  // JOB 33 — Elihu's first speech
  ['elihu','JOB',33,1,null,'protagonist','eager-conviction',null,null,'Elihu claims God speaks through dreams and pain to turn people back from the pit',null,'scholarship'],
  ['job','JOB',33,1,null,'deuteragonist','weary-silence',null,null,'Job listens to the young man who has been waiting to speak',null,'scholarship'],

  // JOB 34 — Elihu defends God's justice
  ['elihu','JOB',34,1,null,'protagonist','passionate-defense',null,null,'Elihu insists God does no wrong and governs the earth with perfect justice',null,'scholarship'],
  ['job','JOB',34,1,null,'deuteragonist','silent',null,null,'Job does not reply as Elihu addresses the crowd',null,'scholarship'],

  // JOB 35 — Elihu on human sin and God's transcendence
  ['elihu','JOB',35,1,null,'protagonist','theological-confidence',null,null,'Elihu argues that human righteousness or wickedness does not affect God, only other humans',null,'scholarship'],

  // JOB 36 — Elihu on God's greatness
  ['elihu','JOB',36,1,null,'protagonist','reverent-instruction',null,null,'Elihu says God is mighty but does not despise anyone and uses suffering to open ears to instruction',null,'scholarship'],

  // JOB 37 — Elihu on God in the storm
  ['elihu','JOB',37,1,null,'protagonist','thunderstruck-awe',null,null,'Elihu describes God\'s voice in thunder and lightning, then a literal storm begins rolling in, setting the stage for God\'s answer',null,'scholarship'],

  // JOB 39 — God continues: wild animals
  ['god','JOB',39,1,null,'protagonist','sovereign-wonder',null,null,'God asks Job about mountain goats, wild donkeys, the ostrich, and the war horse, none of which answer to humans',null,'scholarship'],
  ['job','JOB',39,1,null,'deuteragonist','speechless',null,null,'Job has no answers as God parades creation\'s untameable wildness',null,'scholarship'],

  // JOB 40 — Behemoth; Job's first response
  ['god','JOB',40,1,null,'protagonist','challenging-majesty',null,null,'God asks will you discredit my justice, then describes Behemoth whom only his Maker can approach with a sword',null,'scholarship'],
  ['job','JOB',40,1,null,'deuteragonist','humbled-silence',null,null,'Job puts his hand over his mouth and says he has spoken once but will not answer again',null,'scholarship'],

  // JOB 41 — Leviathan
  ['god','JOB',41,1,null,'protagonist','terrifying-glory',null,null,'God describes Leviathan whose breath sets coals ablaze, whom no one dares provoke, asking who then can stand before Me',null,'scholarship'],

  // ===== PSALMS (135 missing chapters) =====

  ['david','PSA',3,1,null,'protagonist','desperate-trust',null,null,null,null,'scholarship'],
  ['david','PSA',4,1,null,'protagonist','peaceful-confidence',null,null,null,null,'scholarship'],
  ['david','PSA',5,1,null,'protagonist','morning-plea',null,null,null,null,'scholarship'],
  ['david','PSA',6,1,null,'protagonist','tearful-supplication',null,null,null,null,'scholarship'],
  ['david','PSA',7,1,null,'protagonist','urgent-appeal',null,null,null,null,'scholarship'],
  ['david','PSA',9,1,null,'protagonist','victorious-praise',null,null,null,null,'scholarship'],
  ['david','PSA',10,1,null,'protagonist','frustrated-justice',null,null,null,null,'scholarship'],
  ['david','PSA',11,1,null,'protagonist','steadfast-refuge',null,null,null,null,'scholarship'],
  ['david','PSA',12,1,null,'protagonist','grieved-by-falsehood',null,null,null,null,'scholarship'],
  ['david','PSA',14,1,null,'protagonist','lament-over-folly',null,null,null,null,'scholarship'],
  ['david','PSA',15,1,null,'protagonist','reverent-inquiry',null,null,null,null,'scholarship'],
  ['david','PSA',16,1,null,'protagonist','joyful-security',null,null,null,null,'scholarship'],
  ['david','PSA',17,1,null,'protagonist','righteous-plea',null,null,null,null,'scholarship'],
  ['david','PSA',18,1,null,'protagonist','triumphant-gratitude',null,null,null,null,'scholarship'],
  ['david','PSA',19,1,null,'protagonist','wonder-at-creation',null,null,null,null,'scholarship'],
  ['david','PSA',20,1,null,'protagonist','intercessory-hope',null,null,null,null,'scholarship'],
  ['david','PSA',21,1,null,'protagonist','royal-thanksgiving',null,null,null,null,'scholarship'],
  ['david','PSA',24,1,null,'protagonist','processional-exaltation',null,null,null,null,'scholarship'],
  ['david','PSA',25,1,null,'protagonist','humble-petition',null,null,null,null,'scholarship'],
  ['david','PSA',26,1,null,'protagonist','plea-for-vindication',null,null,null,null,'scholarship'],
  ['david','PSA',27,1,null,'protagonist','fearless-longing',null,null,null,null,'scholarship'],
  ['david','PSA',28,1,null,'protagonist','anxious-entreaty',null,null,null,null,'scholarship'],
  ['david','PSA',29,1,null,'protagonist','thunderstruck-worship',null,null,null,null,'scholarship'],
  ['david','PSA',30,1,null,'protagonist','restored-joy',null,null,null,null,'scholarship'],
  ['david','PSA',31,1,null,'protagonist','besieged-trust',null,null,null,null,'scholarship'],
  ['david','PSA',32,1,null,'protagonist','forgiven-relief',null,null,null,null,'scholarship'],
  ['david','PSA',33,1,null,'protagonist','exuberant-praise',null,null,null,null,'scholarship'],
  ['david','PSA',34,1,null,'protagonist','grateful-testimony',null,null,null,null,'scholarship'],
  ['david','PSA',35,1,null,'protagonist','fierce-appeal',null,null,null,null,'scholarship'],
  ['david','PSA',36,1,null,'protagonist','contrasting-meditation',null,null,null,null,'scholarship'],
  ['david','PSA',37,1,null,'protagonist','patient-wisdom',null,null,null,null,'scholarship'],
  ['david','PSA',38,1,null,'protagonist','guilt-laden-groaning',null,null,null,null,'scholarship'],
  ['david','PSA',39,1,null,'protagonist','restrained-lament',null,null,null,null,'scholarship'],
  ['david','PSA',40,1,null,'protagonist','waiting-rewarded',null,null,null,null,'scholarship'],
  ['david','PSA',41,1,null,'protagonist','betrayed-but-blessed',null,null,null,null,'scholarship'],
  // Psalms 42-49: Sons of Korah
  ['david','PSA',42,1,null,'referenced','thirsting-soul',null,null,null,null,'scholarship'],
  ['david','PSA',43,1,null,'referenced','longing-for-vindication',null,null,null,null,'scholarship'],
  ['david','PSA',44,1,null,'referenced','communal-lament',null,null,null,null,'scholarship'],
  ['david','PSA',45,1,null,'referenced','royal-wedding-joy',null,null,null,null,'scholarship'],
  ['david','PSA',46,1,null,'referenced','unshakeable-refuge',null,null,null,null,'scholarship'],
  ['david','PSA',47,1,null,'referenced','triumphant-ascent',null,null,null,null,'scholarship'],
  ['david','PSA',48,1,null,'referenced','city-of-God-wonder',null,null,null,null,'scholarship'],
  ['david','PSA',49,1,null,'referenced','mortality-meditation',null,null,null,null,'scholarship'],
  // Psalm 50: Asaph
  ['david','PSA',50,1,null,'referenced','divine-courtroom',null,null,null,null,'scholarship'],
  ['david','PSA',52,1,null,'protagonist','righteous-scorn',null,null,null,null,'scholarship'],
  ['david','PSA',53,1,null,'protagonist','lament-over-corruption',null,null,null,null,'scholarship'],
  ['david','PSA',54,1,null,'protagonist','betrayed-appeal',null,null,null,null,'scholarship'],
  ['david','PSA',55,1,null,'protagonist','friend-turned-enemy',null,null,null,null,'scholarship'],
  ['david','PSA',56,1,null,'protagonist','fearful-trust',null,null,null,null,'scholarship'],
  ['david','PSA',57,1,null,'protagonist','cave-refuge',null,null,null,null,'scholarship'],
  ['david','PSA',58,1,null,'protagonist','cry-for-justice',null,null,null,null,'scholarship'],
  ['david','PSA',59,1,null,'protagonist','besieged-defiance',null,null,null,null,'scholarship'],
  ['david','PSA',60,1,null,'protagonist','battlefield-lament',null,null,null,null,'scholarship'],
  ['david','PSA',61,1,null,'protagonist','exile-longing',null,null,null,null,'scholarship'],
  ['david','PSA',62,1,null,'protagonist','silent-waiting',null,null,null,null,'scholarship'],
  ['david','PSA',63,1,null,'protagonist','desert-thirst',null,null,null,null,'scholarship'],
  ['david','PSA',64,1,null,'protagonist','hidden-enemy-fear',null,null,null,null,'scholarship'],
  ['david','PSA',65,1,null,'protagonist','harvest-gratitude',null,null,null,null,'scholarship'],
  ['david','PSA',66,1,null,'protagonist','corporate-thanksgiving',null,null,null,null,'scholarship'],
  ['david','PSA',67,1,null,'protagonist','missionary-blessing',null,null,null,null,'scholarship'],
  ['david','PSA',68,1,null,'protagonist','processional-triumph',null,null,null,null,'scholarship'],
  ['david','PSA',69,1,null,'protagonist','drowning-lament',null,null,null,null,'scholarship'],
  ['david','PSA',70,1,null,'protagonist','urgent-rescue',null,null,null,null,'scholarship'],
  ['david','PSA',71,1,null,'protagonist','aged-hope',null,null,null,null,'scholarship'],
  // Psalm 72: Solomon
  ['david','PSA',72,1,null,'referenced','royal-prayer',null,null,null,null,'scholarship'],
  // Psalms 74-83: Asaph collection
  ['david','PSA',74,1,null,'referenced','temple-destruction-grief',null,null,null,null,'scholarship'],
  ['david','PSA',75,1,null,'referenced','divine-judge-praise',null,null,null,null,'scholarship'],
  ['david','PSA',76,1,null,'referenced','warrior-God-awe',null,null,null,null,'scholarship'],
  ['david','PSA',77,1,null,'referenced','midnight-remembrance',null,null,null,null,'scholarship'],
  ['david','PSA',78,1,null,'referenced','historical-recital',null,null,null,null,'scholarship'],
  ['david','PSA',79,1,null,'referenced','national-lament',null,null,null,null,'scholarship'],
  ['david','PSA',80,1,null,'referenced','vine-restoration-plea',null,null,null,null,'scholarship'],
  ['david','PSA',81,1,null,'referenced','festival-exhortation',null,null,null,null,'scholarship'],
  ['david','PSA',82,1,null,'referenced','divine-council-judgment',null,null,null,null,'scholarship'],
  ['david','PSA',83,1,null,'referenced','coalition-threat',null,null,null,null,'scholarship'],
  // Psalms 84-85, 87: Sons of Korah
  ['david','PSA',84,1,null,'referenced','temple-longing',null,null,null,null,'scholarship'],
  ['david','PSA',85,1,null,'referenced','revival-prayer',null,null,null,null,'scholarship'],
  ['david','PSA',86,1,null,'protagonist','lowly-plea',null,null,null,null,'scholarship'],
  ['david','PSA',87,1,null,'referenced','zion-glory',null,null,null,null,'scholarship'],
  // Psalm 89: Ethan the Ezrahite
  ['david','PSA',89,1,null,'referenced','covenant-lament',null,null,null,null,'scholarship'],
  // Psalms 91-100: Book IV
  ['david','PSA',91,1,null,'protagonist','sheltered-trust',null,null,null,null,'scholarship'],
  ['david','PSA',92,1,null,'protagonist','sabbath-praise',null,null,null,null,'scholarship'],
  ['david','PSA',93,1,null,'protagonist','enthronement-awe',null,null,null,null,'scholarship'],
  ['david','PSA',94,1,null,'protagonist','vengeance-plea',null,null,null,null,'scholarship'],
  ['david','PSA',95,1,null,'protagonist','worship-call',null,null,null,null,'scholarship'],
  ['david','PSA',96,1,null,'protagonist','new-song-exultation',null,null,null,null,'scholarship'],
  ['david','PSA',97,1,null,'protagonist','theophany-joy',null,null,null,null,'scholarship'],
  ['david','PSA',98,1,null,'protagonist','salvation-celebration',null,null,null,null,'scholarship'],
  ['david','PSA',99,1,null,'protagonist','holy-king-trembling',null,null,null,null,'scholarship'],
  ['david','PSA',100,1,null,'protagonist','joyful-service',null,null,null,null,'scholarship'],
  ['david','PSA',101,1,null,'protagonist','royal-vow',null,null,null,null,'scholarship'],
  ['david','PSA',102,1,null,'protagonist','afflicted-prayer',null,null,null,null,'scholarship'],
  // Psalms 104-118: Book V starts
  ['david','PSA',104,1,null,'protagonist','creation-wonder',null,null,null,null,'scholarship'],
  ['david','PSA',105,1,null,'protagonist','covenant-history-praise',null,null,null,null,'scholarship'],
  ['david','PSA',106,1,null,'protagonist','confession-and-mercy',null,null,null,null,'scholarship'],
  ['david','PSA',107,1,null,'protagonist','deliverance-testimony',null,null,null,null,'scholarship'],
  ['david','PSA',108,1,null,'protagonist','morning-confidence',null,null,null,null,'scholarship'],
  ['david','PSA',109,1,null,'protagonist','imprecatory-anguish',null,null,null,null,'scholarship'],
  ['david','PSA',110,1,null,'protagonist','messianic-oracle',null,null,null,null,'scholarship'],
  ['david','PSA',111,1,null,'protagonist','alphabetic-praise',null,null,null,null,'scholarship'],
  ['david','PSA',112,1,null,'protagonist','righteous-flourishing',null,null,null,null,'scholarship'],
  ['david','PSA',113,1,null,'protagonist','servant-exaltation',null,null,null,null,'scholarship'],
  ['david','PSA',114,1,null,'protagonist','exodus-wonder',null,null,null,null,'scholarship'],
  ['david','PSA',115,1,null,'protagonist','idol-contrast-trust',null,null,null,null,'scholarship'],
  ['david','PSA',116,1,null,'protagonist','death-escaped-gratitude',null,null,null,null,'scholarship'],
  ['david','PSA',117,1,null,'protagonist','universal-praise',null,null,null,null,'scholarship'],
  ['david','PSA',118,1,null,'protagonist','gate-of-righteousness',null,null,null,null,'scholarship'],
  // Psalms 120-136: Songs of Ascents + Hallel
  ['david','PSA',120,1,null,'protagonist','exile-distress',null,null,null,null,'scholarship'],
  ['david','PSA',121,1,null,'protagonist','hill-gazing-trust',null,null,null,null,'scholarship'],
  ['david','PSA',122,1,null,'protagonist','jerusalem-joy',null,null,null,null,'scholarship'],
  ['david','PSA',123,1,null,'protagonist','servant-eyes-lifted',null,null,null,null,'scholarship'],
  ['david','PSA',124,1,null,'protagonist','narrow-escape-praise',null,null,null,null,'scholarship'],
  ['david','PSA',125,1,null,'protagonist','mountain-security',null,null,null,null,'scholarship'],
  ['david','PSA',126,1,null,'protagonist','tearful-sowing-hope',null,null,null,null,'scholarship'],
  ['david','PSA',127,1,null,'referenced','domestic-trust',null,null,null,null,'scholarship'],
  ['david','PSA',128,1,null,'protagonist','blessed-household',null,null,null,null,'scholarship'],
  ['david','PSA',129,1,null,'protagonist','persecuted-endurance',null,null,null,null,'scholarship'],
  ['david','PSA',130,1,null,'protagonist','depths-cry',null,null,null,null,'scholarship'],
  ['david','PSA',131,1,null,'protagonist','quieted-soul',null,null,null,null,'scholarship'],
  ['david','PSA',132,1,null,'protagonist','ark-oath-remembrance',null,null,null,null,'scholarship'],
  ['david','PSA',133,1,null,'protagonist','unity-delight',null,null,null,null,'scholarship'],
  ['david','PSA',134,1,null,'protagonist','night-watch-blessing',null,null,null,null,'scholarship'],
  ['david','PSA',135,1,null,'protagonist','hallelujah-recital',null,null,null,null,'scholarship'],
  ['david','PSA',136,1,null,'protagonist','steadfast-love-litany',null,null,null,null,'scholarship'],
  ['david','PSA',138,1,null,'protagonist','wholehearted-thanks',null,null,null,null,'scholarship'],
  ['david','PSA',140,1,null,'protagonist','violent-enemy-plea',null,null,null,null,'scholarship'],
  ['david','PSA',141,1,null,'protagonist','evening-incense',null,null,null,null,'scholarship'],
  ['david','PSA',142,1,null,'protagonist','cave-desperation',null,null,null,null,'scholarship'],
  ['david','PSA',143,1,null,'protagonist','crushed-spirit-plea',null,null,null,null,'scholarship'],
  ['david','PSA',144,1,null,'protagonist','warrior-praise',null,null,null,null,'scholarship'],
  // Psalms 146-150: Final Hallel
  ['david','PSA',146,1,null,'protagonist','trust-not-princes',null,null,null,null,'scholarship'],
  ['david','PSA',147,1,null,'protagonist','rebuilder-praise',null,null,null,null,'scholarship'],
  ['david','PSA',148,1,null,'protagonist','cosmic-praise',null,null,null,null,'scholarship'],
  ['david','PSA',149,1,null,'protagonist','new-song-victory',null,null,null,null,'scholarship'],
  ['david','PSA',150,1,null,'protagonist','everything-praise',null,null,null,null,'scholarship'],

  // ===== PROVERBS (24 missing chapters) =====

  ['solomon','PRO',2,1,null,'protagonist','instructive-urgency',null,null,null,null,'scholarship'],
  ['solomon','PRO',3,1,null,'protagonist','fatherly-tenderness',null,null,null,null,'scholarship'],
  ['solomon','PRO',4,1,null,'protagonist','generational-wisdom',null,null,null,null,'scholarship'],
  ['solomon','PRO',5,1,null,'protagonist','marital-warning',null,null,null,null,'scholarship'],
  ['solomon','PRO',7,1,null,'protagonist','streetwise-caution',null,null,null,null,'scholarship'],
  ['solomon','PRO',8,1,null,'protagonist','wisdom-personified-joy',null,null,null,null,'scholarship'],
  ['solomon','PRO',12,1,null,'protagonist','observational-clarity',null,null,null,null,'scholarship'],
  ['solomon','PRO',13,1,null,'protagonist','cause-and-effect',null,null,null,null,'scholarship'],
  ['solomon','PRO',14,1,null,'protagonist','practical-discernment',null,null,null,null,'scholarship'],
  ['solomon','PRO',15,1,null,'protagonist','gentle-answer-wisdom',null,null,null,null,'scholarship'],
  ['solomon','PRO',16,1,null,'protagonist','sovereign-trust',null,null,null,null,'scholarship'],
  ['solomon','PRO',18,1,null,'protagonist','relational-wisdom',null,null,null,null,'scholarship'],
  ['solomon','PRO',19,1,null,'protagonist','wealth-and-poverty',null,null,null,null,'scholarship'],
  ['solomon','PRO',20,1,null,'protagonist','kingly-insight',null,null,null,null,'scholarship'],
  ['solomon','PRO',21,1,null,'protagonist','divine-sovereignty',null,null,null,null,'scholarship'],
  ['solomon','PRO',22,1,null,'protagonist','reputation-and-training',null,null,null,null,'scholarship'],
  ['solomon','PRO',23,1,null,'protagonist','temperance-counsel',null,null,null,null,'scholarship'],
  ['solomon','PRO',24,1,null,'protagonist','moral-courage',null,null,null,null,'scholarship'],
  ['solomon','PRO',25,1,null,'protagonist','courtly-wisdom',null,null,null,null,'scholarship'],
  ['solomon','PRO',26,1,null,'protagonist','fool-anatomy',null,null,null,null,'scholarship'],
  ['solomon','PRO',27,1,null,'protagonist','friendship-tested',null,null,null,null,'scholarship'],
  ['solomon','PRO',28,1,null,'protagonist','justice-and-integrity',null,null,null,null,'scholarship'],
  ['solomon','PRO',29,1,null,'protagonist','ruler-and-people',null,null,null,null,'scholarship'],
  ['qohelet','PRO',30,1,null,'protagonist','humble-agnosticism',null,null,null,null,'scholarship'],

  // ===== ECCLESIASTES (6 missing chapters) =====

  ['qohelet','ECC',2,1,null,'protagonist','disillusioned-experimentation',null,null,null,null,'scholarship'],
  ['qohelet','ECC',6,1,null,'protagonist','existential-futility',null,null,null,null,'scholarship'],
  ['qohelet','ECC',7,1,null,'protagonist','proverbial-realism',null,null,null,null,'scholarship'],
  ['qohelet','ECC',8,1,null,'protagonist','resigned-perplexity',null,null,null,null,'scholarship'],
  ['qohelet','ECC',10,1,null,'protagonist','wry-observation',null,null,null,null,'scholarship'],
  ['qohelet','ECC',11,1,null,'protagonist','carpe-diem-urgency',null,null,null,null,'scholarship'],

  // ===== SONG OF SOLOMON (4 missing chapters) =====

  ['the-beloved','SNG',2,1,null,'protagonist','lovesick-delight',null,null,null,null,'scholarship'],
  ['the-lover','SNG',2,1,null,'deuteragonist','pursuing-desire',null,null,null,null,'scholarship'],

  ['the-beloved','SNG',5,1,null,'protagonist','longing-separation',null,null,null,null,'scholarship'],
  ['the-lover','SNG',5,1,null,'deuteragonist','absent-beloved',null,null,null,null,'scholarship'],

  ['the-beloved','SNG',6,1,null,'protagonist','radiant-reunion',null,null,null,null,'scholarship'],
  ['the-lover','SNG',6,1,null,'deuteragonist','captivated-admiration',null,null,null,null,'scholarship'],

  ['the-beloved','SNG',7,1,null,'protagonist','mutual-desire',null,null,null,null,'scholarship'],
  ['the-lover','SNG',7,1,null,'deuteragonist','enraptured-praise',null,null,null,null,'scholarship'],
]);

console.log('Done WISDOM gaps — inserted rows for JOB/PSA/PRO/ECC/SNG');
db.close();
