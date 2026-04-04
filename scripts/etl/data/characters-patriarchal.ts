import { CharacterRecord } from './character-types'

export const patriarchalCharacters: CharacterRecord[] = [
  // ─────────────────────────── 1. ADAM ───────────────────────────
  {
    id: 'adam',
    name: 'Adam',
    aliases: JSON.stringify(['Ha-Adam', 'The Man']),
    gender: 'male',
    tribeClan: null,
    occupation: 'Gardener / caretaker of Eden',
    socialStatus: 'other',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'The first human in the biblical narrative, Adam is less a hero and more a mirror — the person who had everything, lost it, and then had to figure out how to keep going anyway.',
    bioFull:
      'Adam gets introduced with a level of intimacy that most biblical characters never receive: God forms him from dirt and breathes life directly into him. That detail matters. Before Adam is anything else — husband, father, gardener — he is someone who exists because of an uncomfortably close relationship with the divine. He does not earn his place. He is simply placed.\n\n' +
      'The garden narrative is often read as a morality tale about obedience, but Adam\'s experience looks a lot more like the story of someone who had a life handed to him and didn\'t fully appreciate it until it was gone. He names animals, tends the ground, lives in what reads like effortless abundance. When Eve offers the fruit, the text doesn\'t describe a dramatic internal struggle — it says he was "with her" and he ate. The most consequential decision in the story reads almost casual. That is painfully human.\n\n' +
      'After the fall, Adam\'s first instinct is to hide, and his second is to deflect blame. "The woman you gave me" — not even "my wife" but "the woman you gave me," as though God is the one who made the mistake. It is the earliest recorded example of someone refusing to own a decision. What follows is not dramatic punishment so much as a shift in the terms of existence: work will now be hard, relationships will now be complicated, and death is now part of the deal.\n\n' +
      'Think of Adam as the person who grew up with every advantage and then had to rebuild from scratch after a single catastrophic choice — like someone who torched a career or a marriage through one act of passivity and spent the rest of their life learning what it means to actually work for something.',
    modernParallel:
      'Adam is the person who inherited a thriving family business and let it collapse through inattention rather than malice. He is the guy at the reunion who everyone remembers as "most likely to succeed" — and who quietly moved to another city after things fell apart. His tragedy is not dramatic villainy; it is the slow-motion consequence of not showing up when it mattered most. He is every person who has ever looked back at a pivotal moment and thought, "Why didn\'t I just say something?"',
    emotionalArc: JSON.stringify([
      { moment: 'Placed in the garden with purpose and intimacy', reference: 'Genesis 2:7-8', emotional_state: 'Wholeness, unearned belonging', source_tier: 'ai_assisted' },
      { moment: 'Naming the animals — searching for a counterpart', reference: 'Genesis 2:19-20', emotional_state: 'Curiosity tinged with loneliness', source_tier: 'scholarship' },
      { moment: 'Eating the fruit without protest', reference: 'Genesis 3:6', emotional_state: 'Passive compliance, possible numbness', source_tier: 'ai_assisted' },
      { moment: 'Hiding from God among the trees', reference: 'Genesis 3:8', emotional_state: 'Shame and fear', source_tier: 'canon' },
      { moment: 'Blaming Eve and indirectly blaming God', reference: 'Genesis 3:12', emotional_state: 'Defensiveness, inability to accept responsibility', source_tier: 'scholarship' }
    ]),
    faithJourney:
      'Adam\'s relationship with the divine starts at zero distance — literally formed by God\'s hands, breathing God\'s breath — and then stretches to an agonizing gap almost immediately. The story does not describe a gradual falling away; it describes a single moment of disconnection followed by a lifetime of living with the consequences. What makes Adam\'s faith journey interesting is that it does not end at the expulsion. He goes on. He has children. He works the ground. The text does not say he stopped believing; it says the terms of the relationship changed permanently.\n\n' +
      'There is something worth sitting with in the fact that Adam never gets a redemption arc in the traditional sense. He does not circle back to a triumphant moment of restored intimacy with God. He just lives. He does the next thing. For anyone who has experienced a permanent shift in their spiritual life — a loss of innocence, a theological crisis, a moment where the old certainties stopped working — Adam\'s story is uncomfortably familiar. Faith after Eden is not faith restored; it is faith rebuilt on harder ground.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 2-5. Emotional inferences draw on the narrative\'s silence and scholarly discussion of the Yahwist source.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 2. EVE ───────────────────────────
  {
    id: 'eve',
    name: 'Eve',
    aliases: JSON.stringify(['Havvah', 'Chavvah', 'The Woman', 'Mother of all living']),
    gender: 'female',
    tribeClan: null,
    occupation: 'Co-caretaker of Eden',
    socialStatus: 'other',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'The first woman in Scripture, Eve is far more than the person who ate the fruit — she is someone who made a decision out of curiosity and desire, lived with devastating consequences, and then kept building a life anyway.',
    bioFull:
      'Eve is almost always introduced through the lens of what she did wrong, which is a disservice to how the text actually presents her. She is the only being in the creation narrative who is formed from something already living — not from dirt but from the side of another person. The intimacy of that origin gets overshadowed by what comes later, but it matters: Eve\'s existence is relational from the first breath.\n\n' +
      'When the serpent approaches her, the conversation is remarkably sophisticated. Eve does not stumble into temptation like someone tripping over a curb. She engages. She debates. She quotes the command — and slightly embellishes it, adding "neither shall you touch it." The tree is described through her eyes as good for food, pleasant to look at, and desirable for gaining wisdom. Those are not the observations of someone being reckless. They are the observations of someone who wants more than what she has been given, and that wanting is presented without editorial comment from the narrator.\n\n' +
      'After the fall, Eve bears a particular kind of weight. The consequences assigned to her — pain in childbirth, a complicated dynamic with her husband — land directly on the most intimate parts of her life. And then she becomes a mother, and names her first son Cain with a statement that is either triumphant or heartbroken depending on how you read it: "I have acquired a man with the help of the LORD." She still references God. She still sees her life as connected to the divine story.\n\n' +
      'When Cain kills Abel, the text records no words from Eve. That silence is louder than any speech. She loses one son to murder and another to exile, and the narrative gives her no grief scene, no lament. She simply appears again later, bearing Seth, and naming him with the quiet observation that God has "appointed" another child in place of Abel. The resilience in that naming is staggering.',
    modernParallel:
      'Eve is the woman who left a safe, predictable life because she wanted something more — and then spent the rest of her years navigating consequences she could never have fully imagined. She is the mother who buries one child, watches another self-destruct, and still shows up the next morning to hold a newborn. She is the person at the kitchen table at midnight, staring at the wall, carrying grief that no one in her life fully understands because no one has ever lived through exactly what she has lived through.',
    emotionalArc: JSON.stringify([
      { moment: 'Created and presented to Adam — mutual recognition', reference: 'Genesis 2:22-23', emotional_state: 'Belonging, being seen', source_tier: 'ai_assisted' },
      { moment: 'Conversation with the serpent — deliberation', reference: 'Genesis 3:1-5', emotional_state: 'Curiosity, intellectual engagement, desire', source_tier: 'scholarship' },
      { moment: 'Eating the fruit and giving it to Adam', reference: 'Genesis 3:6', emotional_state: 'Decisive action, possible exhilaration', source_tier: 'ai_assisted' },
      { moment: 'God pronounces consequences specifically for her', reference: 'Genesis 3:16', emotional_state: 'Grief, dread of a fundamentally altered life', source_tier: 'ai_assisted' },
      { moment: 'Naming Seth after the loss of Abel and Cain', reference: 'Genesis 4:25', emotional_state: 'Quiet resilience, grief threaded with hope', source_tier: 'scholarship' }
    ]),
    faithJourney:
      'Eve\'s faith is harder to trace than Adam\'s because the text gives her fewer words, but the words she does speak are remarkable. Both times she names a child, she references God. After everything — the fruit, the exile, the murdered son — she still frames her life in terms of what God is doing. That is not naive optimism. That is someone who has been through the worst thing imaginable and still sees the divine as part of the story rather than the enemy of it.\n\n' +
      'What makes Eve\'s spiritual trajectory distinctive is that she never gets to go back to the way things were, and the text never pretends she can. Her faith is not restoration; it is continuation. She does not regain Eden. She builds something else entirely — a family, a lineage, a future — on ground that is harder than anything she was made for. That is a kind of faith that does not get celebrated enough: the faith of keeping going when the original plan is irretrievably gone.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 2-4. Draws on feminist biblical scholarship (Phyllis Trible, Carol Meyers) for re-reading Eve\'s agency.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 3. CAIN ───────────────────────────
  {
    id: 'cain',
    name: 'Cain',
    aliases: JSON.stringify(['Qayin']),
    gender: 'male',
    tribeClan: null,
    occupation: 'Farmer, later city builder',
    socialStatus: 'outcast',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'The firstborn human in the biblical story, Cain is defined by a single act of violence — but his real story is about what it feels like when your best effort is not enough and you do not know how to handle that.',
    bioFull:
      'Cain brings the first offering recorded in Scripture. He works the ground — the same ground his father was cursed to toil — and brings its produce to God. The text does not say Cain\'s offering was lazy or half-hearted. It says God "had no regard" for it, and the narrative offers no clear explanation why. Centuries of interpretation have tried to fill that gap: Abel brought the firstborn and the fat portions, maybe Cain brought leftovers. But the text itself is stubbornly ambiguous, and that ambiguity matters. Cain\'s experience is the experience of doing what you thought was right and watching someone else get the approval you wanted.\n\n' +
      'God\'s response to Cain\'s anger is one of the most psychologically acute passages in Genesis: "If you do well, will you not be accepted? And if you do not do well, sin is crouching at the door. Its desire is contrary to you, but you must rule over it." This is not a command barked from a distance. It is a warning delivered with something that sounds like concern. God sees the anger building and names it. Cain hears the warning and ignores it.\n\n' +
      'The murder of Abel happens in a single verse, almost without narration. "Cain spoke to Abel his brother. And when they were in the field, Cain rose up against his brother and killed him." The brevity is devastating. And then comes the question — "Where is your brother?" — which Cain answers with what might be the most famous deflection in literature: "Am I my brother\'s keeper?" He knows exactly where his brother is.\n\n' +
      'What follows is not annihilation but exile. Cain is sent away but marked for protection. He builds a city. He has descendants. The story does not end with the murder; it continues into a complicated life defined by the thing he cannot undo.',
    modernParallel:
      'Cain is the older sibling who did everything he was supposed to do and watched the younger one get the praise. He is the employee who hits every metric and gets passed over for the promotion that goes to someone who seems to do it effortlessly. His violence is not random — it is the explosion that happens when someone who has been swallowing resentment finally stops swallowing. He is the cautionary example of what happens when you let a grievance become your entire identity: you end up destroying the thing closest to you.',
    emotionalArc: JSON.stringify([
      { moment: 'Bringing an offering from the ground', reference: 'Genesis 4:3', emotional_state: 'Effort, expectation of approval', source_tier: 'ai_assisted' },
      { moment: 'God disregards his offering but accepts Abel\'s', reference: 'Genesis 4:4-5', emotional_state: 'Rejection, anger, humiliation', source_tier: 'canon' },
      { moment: 'God warns him about sin crouching at the door', reference: 'Genesis 4:6-7', emotional_state: 'Simmering rage, refusal to listen', source_tier: 'scholarship' },
      { moment: 'Killing Abel in the field', reference: 'Genesis 4:8', emotional_state: 'Explosive violence, loss of control', source_tier: 'ai_assisted' },
      { moment: '"My punishment is greater than I can bear"', reference: 'Genesis 4:13', emotional_state: 'Despair, self-pity, fear', source_tier: 'canon' }
    ]),
    faithJourney:
      'Cain starts as a worshiper. That is easy to forget. He brings an offering to God, which means he recognizes God, wants to engage with God, sees offering as a meaningful act. His faith does not begin as hostility — it begins as participation. The rejection of his offering does not destroy his faith so much as curdle it. He goes from someone who approaches God willingly to someone who answers God\'s questions with contempt.\n\n' +
      'After the murder, Cain\'s interaction with God has a strange intimacy. He protests his punishment, and God responds by protecting him — marking him so no one will kill him. Cain walks away from God\'s presence, but God does not walk away from Cain. The text does not describe Cain as an atheist or an apostate. It describes him as someone who left. Whether he ever looked back is one of the silences the Bible leaves unfilled.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 4. Emotional arc draws on the narrative structure and scholarly readings of the Cain-Abel rivalry (e.g., James Kugel).',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────── 4. ABEL ───────────────────────────
  {
    id: 'abel',
    name: 'Abel',
    aliases: JSON.stringify(['Hevel']),
    gender: 'male',
    tribeClan: null,
    occupation: 'Shepherd',
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'Abel barely speaks in the text and dies before the story really begins — yet he becomes the Bible\'s first symbol of innocent suffering and the cost of someone else\'s unmanaged pain.',
    bioFull:
      'Abel is one of the most important characters in Scripture who gets almost no narrative space. He is born, he keeps sheep, he brings an offering, God accepts it, and his brother kills him. That is the entire arc. His name in Hebrew — hevel — means "breath" or "vapor," the same word the book of Ecclesiastes uses to describe the futility of life. Whether that naming is prophetic or ironic, it sets the tone: Abel is transient. He passes through the story like a breath.\n\n' +
      'What the text tells us about Abel\'s offering is significant: he brings the firstborn of his flock and their fat portions. This is not accidental detail. He brings the best, the first, the richest. Whatever standard is being applied, Abel meets it. And then he dies for it — not because of anything he did wrong, but because his brother could not handle the comparison.\n\n' +
      'Abel never gets to respond to what happens to him. He has no last words, no dying speech, no final prayer. The only thing that "speaks" after his death is his blood, which God says is crying out from the ground. That image — blood with a voice, earth as a witness — has echoed through millennia of theology, literature, and justice movements. Abel becomes the archetype of the person whose life is cut short by someone else\'s rage, whose story is told not by themselves but by the aftermath they leave behind.\n\n' +
      'The New Testament references Abel as righteous (Hebrews 11:4), but the Genesis text itself does not use that word. It simply shows a person who did what was right and was destroyed for it. That absence of explicit moral commentary makes the story hit harder, not softer.',
    modernParallel:
      'Abel is the person in the family who never got the chance to become who they might have been. He is the sibling whose photo sits on the mantle, the colleague whose empty desk nobody wants to reassign, the friend whose potential everyone talks about in the past tense. His story is carried by other people because he was not given enough time to carry it himself. He is every person whose life became a cautionary tale about someone else\'s failure rather than a story about their own choices.',
    emotionalArc: JSON.stringify([
      { moment: 'Living as a shepherd — a quiet, solitary life', reference: 'Genesis 4:2', emotional_state: 'Contentment in simple work', source_tier: 'conjecture' },
      { moment: 'Bringing the firstborn of his flock as an offering', reference: 'Genesis 4:4', emotional_state: 'Generosity, devotion', source_tier: 'ai_assisted' },
      { moment: 'God accepts his offering', reference: 'Genesis 4:4', emotional_state: 'Approval, perhaps unaware of the danger this creates', source_tier: 'ai_assisted' },
      { moment: 'Murdered by Cain in the field', reference: 'Genesis 4:8', emotional_state: 'Unknown — the text gives him no final moment of awareness', source_tier: 'conjecture' }
    ]),
    faithJourney:
      'Abel\'s faith journey is almost entirely implied. The text gives us a single act — bringing the firstborn and fat portions of his flock — and from that single act, an entire tradition of interpretation has built a portrait of a righteous person. Hebrews 11:4 says Abel offered "a more excellent sacrifice" by faith, but Genesis itself does not explain his inner life. What we can say is that Abel gave his best, and that giving was accepted.\n\n' +
      'The unsettling part of Abel\'s story is that his faithfulness does not protect him. He does the right thing and dies for it, not in a redemptive martyrdom but in a field, at the hands of his own brother. His faith journey ends abruptly and without resolution. For anyone who has watched a good person suffer meaningless violence, Abel\'s story is not comforting — it is honest. Sometimes faithfulness and safety are not the same thing.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 4 and Hebrews 11:4. The Hebrew meaning of "hevel" draws on standard lexical resources.',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────── 5. NOAH ───────────────────────────
  {
    id: 'noah',
    name: 'Noah',
    aliases: JSON.stringify(['Noach']),
    gender: 'male',
    tribeClan: 'Descendant of Seth',
    occupation: 'Farmer, shipbuilder',
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'Noah is remembered for the ark, but his real story is about being the one person willing to do something absurd because he trusted the voice telling him to — and then dealing with a profoundly changed world on the other side.',
    bioFull:
      'Noah is introduced with a moral summary that no other character in Genesis receives: "Noah was a righteous man, blameless in his generation. Noah walked with God." That phrase — "in his generation" — has sparked centuries of rabbinic debate. Was he righteous by the low standards of a corrupt age, or was he genuinely exceptional? The ambiguity is the point. Noah is not presented as perfect; he is presented as the best available option in a world that had gone catastrophically wrong.\n\n' +
      'The building of the ark is an act of sustained, absurd obedience. The text gives no indication that anyone else understood or supported what Noah was doing. He builds a massive vessel on dry land, presumably over years, with no evidence that the flood is coming beyond a voice that only he seems to hear. That is not the glamorous faith of a battlefield hero. That is the grinding faith of someone who looks foolish to everyone around them and keeps going anyway.\n\n' +
      'The flood narrative itself is often softened into a children\'s story, but the text is describing an extinction event. Everyone Noah has ever known outside his immediate family dies. Every neighbor, every acquaintance, every person who laughed at his construction project. Noah survives, but he survives into a world that is essentially empty. The psychological weight of that is almost impossible to overstate.\n\n' +
      'After the flood, Noah plants a vineyard and gets drunk — so drunk that he passes out naked in his tent. This is often treated as a footnote or an embarrassment, but it reads like the behavior of someone carrying unbearable weight. The man who saved the world through obedience copes with the aftermath through alcohol. The Bible does not editorialize. It simply reports. Noah\'s post-flood life is a story about what survival costs.',
    modernParallel:
      'Noah is the first responder who saves lives during the disaster and then falls apart afterward. He is the veteran who did everything right in the field and cannot sleep when he gets home. He is the parent who holds the family together through the crisis and then quietly unravels when the crisis is over. His story is a reminder that the people who endure the hardest things are not necessarily equipped to process them, and that obedience and wholeness are not always the same thing.',
    emotionalArc: JSON.stringify([
      { moment: 'Called righteous in a corrupt generation', reference: 'Genesis 6:9', emotional_state: 'Isolation, moral loneliness', source_tier: 'ai_assisted' },
      { moment: 'Building the ark over an extended period', reference: 'Genesis 6:14-22', emotional_state: 'Determined obedience, likely social ridicule', source_tier: 'ai_assisted' },
      { moment: 'The floodwaters rise — everyone outside the ark perishes', reference: 'Genesis 7:17-23', emotional_state: 'Horror, survivor guilt, grief', source_tier: 'ai_assisted' },
      { moment: 'Sending out the dove and receiving the olive branch', reference: 'Genesis 8:10-11', emotional_state: 'Desperate hope, relief', source_tier: 'scholarship' },
      { moment: 'Drunk and exposed in his tent', reference: 'Genesis 9:21', emotional_state: 'Numbness, self-medication, collapse', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Noah\'s faith is defined by an almost inhuman capacity to obey without explanation. God tells him to build, and he builds. God tells him to enter, and he enters. The text records no bargaining, no questioning, no negotiating — just compliance. Compare this to Abraham, who argues with God over Sodom, or Moses, who pushes back at the burning bush. Noah says nothing. Whether that silence represents perfect trust or stunned submission is one of the great interpretive questions of Genesis.\n\n' +
      'After the flood, God makes a covenant with Noah — the rainbow, the promise never to destroy the earth by water again. But the covenant comes after the destruction, not instead of it. Noah\'s faith carried him through the catastrophe but did not prevent it. He lives the rest of his life in a world that bears the scars of divine judgment, tending a vineyard, dealing with family dysfunction, carrying the memory of what the water took. His faith did not deliver him into paradise. It delivered him into a second chance on harder terms.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 6-9. Rabbinic debate about "in his generation" from Sanhedrin 108a. Psychological readings of the drunkenness draw on narrative theology approaches.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 6. ABRAHAM ───────────────────────────
  {
    id: 'abraham',
    name: 'Abraham',
    aliases: JSON.stringify(['Abram', 'Father Abraham', 'Avraham']),
    gender: 'male',
    tribeClan: 'Father of the Hebrew people',
    occupation: 'Semi-nomadic herder, clan leader',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 2000-1800 BCE (traditional)',
    bioBrief:
      'Abraham is the person who left everything familiar on nothing more than a promise — and then spent decades watching that promise take its time arriving, making catastrophic mistakes along the way.',
    bioFull:
      'Abraham\'s story begins with a command that has no precedent in the narrative: "Go from your country and your kindred and your father\'s house to the land that I will show you." No map. No timeline. No proof. Just a voice and a direction. He is seventy-five years old. He packs up his household and leaves Ur. That is either the most courageous or the most reckless decision in the Bible, and the text does not distinguish between the two.\n\n' +
      'What follows is not a linear march toward blessing but a stumbling, contradictory, deeply human journey. Almost immediately after arriving in Canaan, Abraham goes to Egypt because of a famine and lies about Sarah being his sister — twice, in two different countries, with two different kings. He is terrified that powerful men will kill him to take his wife. The "father of faith" is also a man whose first instinct in danger is deception. The text does not smooth this over or explain it away. It just lets him be complicated.\n\n' +
      'The promise of a son drags on for twenty-five years. During that time, Abraham tries to solve the problem himself — first by designating his servant Eliezer as heir, then by having a child with Hagar at Sarah\'s suggestion. Both solutions create more complications than they resolve. Ishmael is born, loved, and eventually sent away. The domestic fallout is enormous. Abraham is not just waiting for a promise; he is living inside the wreckage of his attempts to accelerate it.\n\n' +
      'The binding of Isaac is the climax of the Abraham cycle, and it remains one of the most disturbing passages in all of Scripture. God asks Abraham to sacrifice the son he waited twenty-five years for — the son who is the physical embodiment of every promise God has made. Abraham does not argue. He gets up early, saddles his donkey, and goes. Whether that silence represents the pinnacle of faith or the breaking point of a man who has stopped questioning a God he cannot understand is a question the text deliberately refuses to answer.',
    modernParallel:
      'Abraham is the person who quit a stable career to start something no one else could see yet — and then spent decades living in the gap between the vision and the reality. He is the immigrant who left everything familiar for a country where he does not speak the language, carrying nothing but a promise that things will eventually work out. He is also the person who, under pressure, makes choices that hurt the people closest to him and then has to live inside the consequences. His faith is not clean. It is the faith of someone who keeps walking even when the road makes no sense and his own footprints are full of wrong turns.',
    emotionalArc: JSON.stringify([
      { moment: 'Called to leave Ur — everything familiar', reference: 'Genesis 12:1-4', emotional_state: 'Courage laced with uncertainty', source_tier: 'ai_assisted' },
      { moment: 'Lying about Sarah in Egypt out of fear', reference: 'Genesis 12:10-13', emotional_state: 'Survival-mode terror, self-preservation', source_tier: 'scholarship' },
      { moment: 'God promises descendants like the stars — Abraham believes', reference: 'Genesis 15:5-6', emotional_state: 'Trust against the evidence, awe', source_tier: 'canon' },
      { moment: 'Sending Hagar and Ishmael away', reference: 'Genesis 21:10-14', emotional_state: 'Grief, torn loyalty, distress', source_tier: 'canon' },
      { moment: 'Binding Isaac on Mount Moriah', reference: 'Genesis 22:1-10', emotional_state: 'Dread, obedience beyond comprehension, possible numbness', source_tier: 'scholarship' }
    ]),
    faithJourney:
      'Abraham\'s faith is not a straight line. It is a series of extraordinary moments of trust interrupted by episodes of panic and self-reliance. He believes God\'s promise about descendants and it is "credited to him as righteousness" — but he also takes a concubine because the promise is taking too long. He argues with God over the fate of Sodom with the boldness of a courtroom lawyer — but he says nothing when asked to sacrifice Isaac. His faith contains multitudes, and the Bible seems perfectly comfortable with that.\n\n' +
      'What makes Abraham\'s faith journey distinctive is that it deepens through failure, not despite it. Every time he stumbles — lying about Sarah, trying to manufacture an heir, banishing Hagar — the story returns to the covenant. God does not withdraw the promise when Abraham acts badly. The relationship absorbs the failures and continues. For anyone whose spiritual life has included spectacular wrong turns, Abraham is the most important character in the Bible: proof that faith does not require perfection, and that the story is not over when you mess up.\n\n' +
      'By the end of his life, Abraham is buying a burial plot for Sarah in the land God promised him. He does not own the land. He is purchasing a grave in his own inheritance. That is the final image of Abrahamic faith: a man who trusts a promise he will not live to see fulfilled, burying his wife in soil that belongs to someone else, believing it will one day belong to his children.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 12-25. Draws on Jon Levenson\'s work on the Aqedah and Walter Brueggemann\'s commentary on the Abraham cycle.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 7. SARAH ───────────────────────────
  {
    id: 'sarah',
    name: 'Sarah',
    aliases: JSON.stringify(['Sarai', 'Princess']),
    gender: 'female',
    tribeClan: null,
    occupation: 'Matriarch, household manager',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 2000-1800 BCE (traditional)',
    bioBrief:
      'Sarah waited decades for a promise she did not ask for, laughed when it finally arrived, and navigated the impossible emotional terrain of being both the chosen matriarch and a deeply wounded woman.',
    bioFull:
      'Sarah\'s story is inseparable from Abraham\'s, but her experience of it is profoundly different. She follows her husband out of Ur into an unknown future, and then twice — twice — he tells foreign kings that she is his sister, essentially handing her over to protect himself. The text does not record her reaction either time. That silence is deafening. She is treated as a bargaining chip by the man who is supposed to be her partner, and the narrative moves on as though this is just something that happened.\n\n' +
      'The barrenness is the defining struggle of Sarah\'s life. In the ancient Near East, a woman\'s worth was almost entirely tied to her ability to produce heirs. Sarah lives under that pressure for decades, watching the promise of descendants remain unfulfilled while her body ages past the point of possibility. When she suggests that Abraham take Hagar, it is not generosity — it is desperation wearing the mask of pragmatism. She is trying to solve a problem that is destroying her.\n\n' +
      'When Hagar conceives, the text says Sarah is "dealt with harshly" — or, in some translations, that Hagar "looked at her with contempt." The power dynamic flips. The servant who was supposed to solve the problem now embodies everything Sarah cannot do. Sarah\'s response is cruel: she treats Hagar so harshly that Hagar runs away. This is not Sarah\'s finest moment, and the text does not pretend it is. But it is painfully understandable. She is watching another woman carry what she was promised.\n\n' +
      'When God finally announces that Sarah herself will bear a son, she laughs. Not a joyful laugh — a bitter one. "After I am worn out, and my lord is old, shall I have pleasure?" It is the laugh of someone who has heard the promise too many times to believe it anymore. And yet Isaac comes. His name means "he laughs." The child of the promise carries the sound of his mother\'s disbelief in his very name.',
    modernParallel:
      'Sarah is the woman who followed her partner into his dream and then spent years dealing with consequences she never chose. She is the person at the fertility clinic who has heard "maybe next time" so many times that she has stopped hoping and started planning around the absence. She is the wife who handles the household, manages the crises, absorbs the betrayals, and is then remembered primarily as someone else\'s wife. Her laugh at the promise is the laugh of every person who has been told "it\'ll work out" by someone who is not the one waiting.',
    emotionalArc: JSON.stringify([
      { moment: 'Following Abraham out of Ur into the unknown', reference: 'Genesis 12:4-5', emotional_state: 'Trust, anxiety, displacement', source_tier: 'ai_assisted' },
      { moment: 'Abraham passes her off as his sister to Pharaoh', reference: 'Genesis 12:11-15', emotional_state: 'Betrayal, powerlessness, fear', source_tier: 'ai_assisted' },
      { moment: 'Offering Hagar to Abraham as a surrogate', reference: 'Genesis 16:2', emotional_state: 'Desperation, pragmatic grief', source_tier: 'scholarship' },
      { moment: 'Laughing at the promise of a son', reference: 'Genesis 18:12', emotional_state: 'Bitter disbelief, self-protective cynicism', source_tier: 'canon' },
      { moment: 'Demanding Hagar and Ishmael be sent away', reference: 'Genesis 21:10', emotional_state: 'Protectiveness, jealousy, ruthless resolve', source_tier: 'scholarship' }
    ]),
    faithJourney:
      'Sarah\'s faith is tested primarily through waiting — not the active, heroic waiting of someone on a quest, but the passive, grinding waiting of someone whose body is the battleground of the promise. She does not get to go build an ark or climb a mountain. She gets to grow old. Her faith erodes visibly over the narrative: from following Abraham without question, to engineering a solution with Hagar, to laughing at angels. By the time the promise is fulfilled, she has passed through hope, desperation, bitterness, and disbelief.\n\n' +
      'What is remarkable is that the fulfillment comes after the laughter, not before it. God does not wait for Sarah to believe again before delivering. Isaac arrives at the other end of Sarah\'s cynicism, not as a reward for faith but almost in spite of its absence. For anyone whose belief has been worn thin by years of waiting, Sarah\'s story is not a rebuke — it is permission. The promise does not depend on the quality of your faith. Sometimes it shows up after you have already stopped setting a place for it at the table.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 11-23. Draws on Tikva Frymer-Kensky\'s work on women in the biblical narrative and Tammi Schneider\'s analysis of Sarah.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 8. HAGAR ───────────────────────────
  {
    id: 'hagar',
    name: 'Hagar',
    aliases: JSON.stringify(['Hagar the Egyptian']),
    gender: 'female',
    tribeClan: null,
    occupation: 'Servant / slave',
    socialStatus: 'slave',
    era: 'patriarchal',
    approximateDates: 'c. 2000-1800 BCE (traditional)',
    bioBrief:
      'Hagar is the woman used by the people of the promise and then discarded — and the first person in Scripture to give God a name, because she recognized that God saw her when no one else did.',
    bioFull:
      'Hagar enters the story as property. She is an Egyptian servant — likely acquired during Abraham and Sarah\'s time in Egypt — and she has no voice in the decision that changes her life. Sarah offers her to Abraham as a surrogate, and the text records no consent, no conversation with Hagar herself. She is handed over to solve someone else\'s problem. In the ancient world, this was legally and socially acceptable. That does not make it less devastating to read.\n\n' +
      'When Hagar conceives, she gains something she has never had: status. She is carrying the heir. The text says she looked at Sarah differently — whether with contempt or simply with the quiet confidence of a woman who has accomplished what her mistress could not. Sarah responds with cruelty, and Abraham responds with indifference: "Your slave is in your hands. Do with her as you please." Hagar runs.\n\n' +
      'What happens next is one of the most theologically significant moments in Genesis. An angel finds Hagar at a spring in the wilderness and speaks to her directly. God does not relay the message through Abraham or Sarah. God comes to the runaway slave. And Hagar responds with something no other character in Scripture does at this point: she gives God a name. "El Roi" — the God who sees me. The woman with the least power in the story becomes the first theologian.\n\n' +
      'Years later, after Isaac is born, Sarah demands that Hagar and Ishmael be expelled. Abraham is distressed but complies. Hagar wanders in the desert with her son, runs out of water, and places Ishmael under a bush because she cannot watch him die. She sits a bowshot away and weeps. God hears — the name Ishmael means "God hears" — and provides water. Hagar survives, raises her son, and finds him a wife from Egypt. She builds a life out of nothing, twice.',
    modernParallel:
      'Hagar is the woman who was used to solve a problem in someone else\'s marriage and then blamed when the solution created complications. She is the nanny who is treated as family until she becomes inconvenient, the surrogate mother whose contract does not account for the emotional reality of carrying a child. She is the single mother in the desert — figuratively and literally — making a way where there is no way, crying where no one can see her, and discovering that God shows up in the places where the system has failed. She is every person who has been told "you are part of the family" right up until the moment it is no longer convenient.',
    emotionalArc: JSON.stringify([
      { moment: 'Given to Abraham as a surrogate without her consent', reference: 'Genesis 16:3', emotional_state: 'Powerlessness, objectification', source_tier: 'scholarship' },
      { moment: 'Conceiving and gaining a shift in status', reference: 'Genesis 16:4', emotional_state: 'Pride, defiance, fragile confidence', source_tier: 'ai_assisted' },
      { moment: 'Fleeing Sarah\'s abuse into the wilderness', reference: 'Genesis 16:6', emotional_state: 'Desperation, fear, rage', source_tier: 'ai_assisted' },
      { moment: 'Naming God "El Roi" — the God who sees', reference: 'Genesis 16:13', emotional_state: 'Stunned recognition, being truly seen for the first time', source_tier: 'canon' },
      { moment: 'Placing Ishmael under a bush, unable to watch him die', reference: 'Genesis 21:15-16', emotional_state: 'Absolute despair, maternal anguish', source_tier: 'canon' }
    ]),
    faithJourney:
      'Hagar\'s faith does not develop inside a covenant community or a tradition of worship. It develops in the wilderness, alone, with a child she cannot feed. She is not part of the promise. She is collateral damage from the promise. And yet God comes to her — not once but twice — and speaks to her directly, makes promises about her son, provides water in the desert. Hagar\'s faith is forged in abandonment, not in belonging.\n\n' +
      'What makes Hagar\'s spiritual experience unique is that she names God. In a narrative world where God reveals names to people, Hagar flips the script. She encounters the divine and responds not with submission but with theological creativity: "You are the God who sees me." That is not the statement of someone who has been taught the right religious vocabulary. It is the raw declaration of a person who has just discovered that the universe is paying attention to her suffering. Hagar\'s faith is the faith of the margins — outside the covenant, outside the household, outside the plan — and it is recognized by God as valid.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 16 and 21. Draws on womanist biblical scholarship (Delores Williams, "Sisters in the Wilderness") and Phyllis Trible\'s "Texts of Terror."',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 9. ISHMAEL ───────────────────────────
  {
    id: 'ishmael',
    name: 'Ishmael',
    aliases: JSON.stringify(['Yishmael']),
    gender: 'male',
    tribeClan: 'Father of the Ishmaelites',
    occupation: 'Archer, desert dweller',
    socialStatus: 'foreigner',
    era: 'patriarchal',
    approximateDates: 'c. 1900-1800 BCE (traditional)',
    bioBrief:
      'Ishmael is the son who was wanted, then replaced, then exiled — a child born into a promise that turned out to belong to someone else, who built a life anyway in the wilderness.',
    bioFull:
      'Ishmael is born into the complicated space between a desperate plan and a divine promise. He is the son Abraham waited for — or at least the son Abraham thought he was waiting for. For thirteen years, Ishmael is the heir, the firstborn, the center of Abraham\'s paternal affection. The text says Abraham loved him. When God announces that Isaac will be the child of the covenant, Abraham\'s immediate response is: "Oh that Ishmael might live before you!" That is not a theological argument. That is a father begging God not to forget his son.\n\n' +
      'The expulsion scene is gut-wrenching. Abraham gives Hagar bread and a skin of water and sends them away. That is it. Bread and water for a woman and a teenager walking into the desert. When the water runs out, Hagar puts Ishmael under a bush and sits down to cry. The boy is dying. God hears his voice — because that is what his name means, "God hears" — and provides a well. Ishmael survives, not because the covenant protects him but because God responds to his suffering outside the covenant.\n\n' +
      'The rest of Ishmael\'s story is told in lists and genealogies: twelve sons, a settlement in the wilderness of Paran, an Egyptian wife chosen by his mother. He becomes a skilled archer. He becomes the father of nations. When Abraham dies, Ishmael returns to bury him alongside Isaac. That detail is easy to miss and hard to overstate. The exiled son comes back for the funeral. Whatever happened between them, whatever resentment the expulsion might have created, Ishmael shows up to bury his father.\n\n' +
      'Ishmael is the biblical reminder that God\'s plans have collateral damage, and that the people caught in the margins of someone else\'s story are still seen.',
    modernParallel:
      'Ishmael is the child from the first marriage who watches his father build a new family and wonders where he fits. He is the kid who grew up hearing he was special and then learned that someone else was the real heir. He is the one who built his life far from home because home made it clear there was not room for him — and then drove back for the funeral because, despite everything, it was still his father. He is every person who has had to make peace with being a footnote in someone else\'s destiny.',
    emotionalArc: JSON.stringify([
      { moment: 'Born as the hoped-for heir — thirteen years as the firstborn', reference: 'Genesis 16:15-16', emotional_state: 'Belonging, security, being wanted', source_tier: 'ai_assisted' },
      { moment: 'Isaac is born — Ishmael is no longer the center', reference: 'Genesis 21:1-3', emotional_state: 'Displacement, confusion', source_tier: 'ai_assisted' },
      { moment: 'Expelled into the wilderness with his mother', reference: 'Genesis 21:14', emotional_state: 'Betrayal, abandonment, fear', source_tier: 'scholarship' },
      { moment: 'Nearly dying of thirst — God provides water', reference: 'Genesis 21:17-19', emotional_state: 'Desperation giving way to relief', source_tier: 'canon' },
      { moment: 'Returning to bury Abraham alongside Isaac', reference: 'Genesis 25:9', emotional_state: 'Grief, complicated reconciliation', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Ishmael\'s relationship with God is defined by a paradox: God makes promises about him but not to him, at least not directly in the Genesis text. The promises about Ishmael — twelve princes, a great nation — are spoken to Abraham and Hagar. Ishmael\'s own experience of the divine is mediated through his parents and through crisis. God hears him crying in the desert. God provides water. But the text does not describe Ishmael building altars or receiving visions. His faith, if it exists, is the faith of someone who was saved without being chosen.\n\n' +
      'There is a particular kind of spiritual experience that belongs to people who grow up adjacent to a faith tradition without being fully inside it — people who know the language and the stories but feel like outsiders at the table. Ishmael\'s spiritual life occupies that space. He is circumcised into the covenant at thirteen but expelled from the household soon after. He is blessed but not chosen. His relationship with the divine is real — God hears him, God provides for him — but it operates outside the main storyline. For anyone who has felt like they are on the edge of a community they were once part of, Ishmael\'s journey resonates.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 16-17, 21, 25. Islamic tradition (which reveres Ishmael) is acknowledged but not incorporated to maintain biblical-text focus.',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────── 10. ISAAC ───────────────────────────
  {
    id: 'isaac',
    name: 'Isaac',
    aliases: JSON.stringify(['Yitzhak', 'Yitzchak']),
    gender: 'male',
    tribeClan: 'Father of Israel through Jacob',
    occupation: 'Herder, well-digger',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 1900-1700 BCE (traditional)',
    bioBrief:
      'Isaac is the child of the promise who spent his life in the shadow of his father\'s dramatic faith — a quieter patriarch whose story is defined more by what was done to him than by what he chose.',
    bioFull:
      'Isaac\'s life begins as a miracle and nearly ends as a sacrifice. He is born to parents who are biologically past the point of having children, and his name — "he laughs" — commemorates his mother\'s disbelief. Before he can form his own identity, he is already a symbol: proof that God keeps promises, even absurdly late ones.\n\n' +
      'The binding on Mount Moriah is the defining event of Isaac\'s life, and he is not the protagonist of it. Abraham is the one being tested. Isaac is the one being carried up the mountain. The text says Isaac asked about the lamb — "Here is the fire and the wood, but where is the lamb?" — and Abraham answered with terrifying ambiguity: "God will provide." Isaac walked the rest of the way in that silence. Whatever he understood or did not understand, the experience left a mark that the text never directly addresses but that shadows everything that follows.\n\n' +
      'As an adult, Isaac is the most passive of the patriarchs. He does not journey to a new land; he stays where he is. He re-digs wells that his father dug. He is deceived by his wife and his younger son in the blessing scene — a moment that suggests either failing eyesight, failing judgment, or a willingness to be deceived that runs deeper than physical blindness. Isaac\'s story is the story of the person who inherits a legacy and carries it, not with innovation but with endurance.\n\n' +
      'His love story with Rebekah is one of the few genuinely tender moments in Genesis: "Isaac brought her into the tent of Sarah his mother and took Rebekah, and she became his wife, and he loved her. So Isaac was comforted after his mother\'s death." He is a man who finds comfort in love, not in conquest or vision. That is not weakness. It is a different kind of strength — the strength of the person who does not need to be the hero of every story.',
    modernParallel:
      'Isaac is the child of famous parents who never quite steps out from their shadow. He is the second-generation business owner who keeps the company running without the founder\'s charisma. He is the PK — the preacher\'s kid — who knows the faith intimately but experiences it as something that was handed to him rather than something he seized. He is the person who carries trauma from childhood that everyone knows about but no one talks about, and who builds a quiet, steady life without ever fully processing what happened on that mountain.',
    emotionalArc: JSON.stringify([
      { moment: 'Carried up Mount Moriah by his father', reference: 'Genesis 22:6-9', emotional_state: 'Confusion, trust, dawning terror', source_tier: 'scholarship' },
      { moment: 'Brought Rebekah into his mother\'s tent — comforted', reference: 'Genesis 24:67', emotional_state: 'Tenderness, grief resolved through love', source_tier: 'canon' },
      { moment: 'Praying for Rebekah\'s barrenness', reference: 'Genesis 25:21', emotional_state: 'Pleading, echoes of his own miraculous birth', source_tier: 'ai_assisted' },
      { moment: 'Deceived by Jacob — gives the blessing to the wrong son', reference: 'Genesis 27:33', emotional_state: 'Shock, trembling, realization of being manipulated', source_tier: 'canon' },
      { moment: 'Blessing Esau with what remains', reference: 'Genesis 27:38-40', emotional_state: 'Sorrow, powerlessness, attempting to make amends', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Isaac\'s faith is inherited, and the Bible seems aware of the difference between inherited faith and discovered faith. Abraham encountered God directly — in visions, at altars, in arguments. Isaac encounters God, but the encounters are briefer, fewer, and often echo his father\'s experiences. God appears to him at Gerar and reaffirms the Abrahamic covenant: "I will be with you and bless you, for to Abraham\'s servant I will give all these lands." Even God\'s promise to Isaac is framed in terms of Abraham. Isaac builds altars and digs wells. He does what his father did. Whether that is faithful repetition or a man who never found his own voice depends on how you read it.\n\n' +
      'The deepest question of Isaac\'s spiritual life is whether he ever processed Mount Moriah. The text never revisits it. Isaac never speaks about it. He goes on to live a long life, and the binding never comes up again in his story. For anyone who carries a formative spiritual experience — terrifying, beautiful, or both — that they cannot fully articulate, Isaac is a companion. His faith is real, but it is the faith of someone who survived something that no one else fully understands, carried forward in quiet persistence rather than dramatic testimony.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 21-28, 35. Draws on scholarship about the Aqedah\'s psychological impact (Jon Levenson, Shalom Spiegel).',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 11. REBEKAH ───────────────────────────
  {
    id: 'rebekah',
    name: 'Rebekah',
    aliases: JSON.stringify(['Rivkah', 'Rebecca']),
    gender: 'female',
    tribeClan: 'Daughter of Bethuel, from Aram-naharaim',
    occupation: 'Matriarch',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 1900-1700 BCE (traditional)',
    bioBrief:
      'Rebekah starts as one of the most decisive women in Genesis — a person who makes bold choices quickly — and ends as someone whose decisiveness crosses into manipulation, with consequences that fracture her family.',
    bioFull:
      'Rebekah\'s introduction is extraordinary. Abraham\'s servant arrives at a well looking for a wife for Isaac, prays for a specific sign, and Rebekah appears and fulfills it exactly — not only offering water to the servant but volunteering to water all ten of his camels. That is not a polite gesture. That is hours of physical labor for a stranger. Rebekah is generous, capable, and unhesitating. When asked if she will go to Canaan to marry a man she has never met, she answers in a single word: "I will go." She makes a life-altering decision in the time it takes most people to order coffee.\n\n' +
      'Her pregnancy with the twins is agonizing — the children struggle within her so violently that she goes to inquire of God directly. She does not ask Abraham. She does not ask Isaac. She asks God herself. The answer she receives is a prophecy: "Two nations are in your womb... the older shall serve the younger." That prophecy becomes the lens through which Rebekah views her entire family, and it drives everything she does afterward.\n\n' +
      'The favoritism is explicit: "Isaac loved Esau... but Rebekah loved Jacob." When Isaac prepares to bless Esau, Rebekah orchestrates an elaborate deception — goat skins on Jacob\'s arms, Esau\'s clothes, a meal prepared to fool a blind man. She is not passively hoping things work out. She is actively engineering the fulfillment of the prophecy she received decades earlier. Whether this makes her a woman of faith or a manipulative mother depends entirely on your interpretive framework. The text, characteristically, does not judge.\n\n' +
      'The cost is total. After the deception, Esau plans to kill Jacob, and Rebekah sends Jacob away. She tells him it will be "a few days" until Esau\'s anger subsides. It will be twenty years. The text never records Rebekah seeing Jacob again. Her last act in the narrative is sending away the son she loves most, and the silence that follows is devastating.',
    modernParallel:
      'Rebekah is the mother who sees which of her children is destined for something and rearranges the world to make it happen — even when "rearranging" means lying, scheming, and breaking the other child\'s heart. She is the parent who plays favorites and justifies it with a higher purpose. She is the woman who married into a family with enormous expectations and decided that if the system would not produce the right outcome, she would produce it herself. Her tragedy is that she got exactly what she wanted and lost everything that mattered in the process.',
    emotionalArc: JSON.stringify([
      { moment: 'Volunteering to water ten camels — immediate decisive action', reference: 'Genesis 24:18-20', emotional_state: 'Confident generosity, energy', source_tier: 'ai_assisted' },
      { moment: '"I will go" — choosing to leave for a stranger', reference: 'Genesis 24:58', emotional_state: 'Bold resolve, adventurousness', source_tier: 'canon' },
      { moment: 'Twins struggling in her womb — inquiring of God', reference: 'Genesis 25:22', emotional_state: 'Physical agony, desperation for meaning', source_tier: 'canon' },
      { moment: 'Orchestrating the stolen blessing', reference: 'Genesis 27:5-17', emotional_state: 'Calculating determination, conviction she is fulfilling prophecy', source_tier: 'scholarship' },
      { moment: 'Sending Jacob away — "a few days" that become twenty years', reference: 'Genesis 27:43-45', emotional_state: 'Heartbreak disguised as pragmatism', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Rebekah\'s faith is active, almost aggressive. She does not wait for God to work things out. She receives a prophecy and then spends the rest of her life making sure it happens. There is a theological question buried in her story that the text never resolves: if God told her the older would serve the younger, was the deception necessary? Would the prophecy have fulfilled itself without her intervention? Rebekah does not seem interested in finding out. She takes the word she received and acts on it with the same decisiveness she showed at the well. Her faith is not passive trust. It is active participation — bordering on taking over.\n\n' +
      'The cost of Rebekah\'s approach to faith is relational devastation. Her husband is humiliated. Her older son is heartbroken. Her younger son is exiled. She dies offstage, mentioned only in a burial notice. For anyone who has ever confused "trusting God\'s plan" with "making God\'s plan happen," Rebekah\'s story is a sobering mirror. Her faith was real. Her prophecy was accurate. And the methods she used to fulfill it left wreckage in every direction.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 24-27. Draws on Tammi Schneider\'s "Mothers of Promise" for analysis of Rebekah\'s agency.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 12. JACOB ───────────────────────────
  {
    id: 'jacob',
    name: 'Jacob',
    aliases: JSON.stringify(['Ya\'akov', 'Israel', 'Yisrael', 'The Supplanter']),
    gender: 'male',
    tribeClan: 'Father of the twelve tribes of Israel',
    occupation: 'Herder, patriarch',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 1850-1700 BCE (traditional)',
    bioBrief:
      'Jacob is the schemer who became Israel — a man who spent the first half of his life getting what he wanted through manipulation and the second half learning that the things he grasped most tightly were the things that hurt him most.',
    bioFull:
      'Jacob enters the world grabbing his brother\'s heel. The name "Jacob" — ya\'akov — sounds like the Hebrew word for "heel" and by extension "supplanter" or "deceiver." His identity is coded into his name from birth. He is the second twin, the quiet one, the one who stays near the tents while Esau hunts. But his quietness is not passivity — it is strategy. When the opportunity comes to buy Esau\'s birthright for a bowl of stew, Jacob takes it without hesitation. When his mother offers him a plan to steal the blessing, he objects not on moral grounds but on practical ones: "What if my father touches me and I seem to be mocking him?"\n\n' +
      'The stolen blessing sends Jacob running, and on his first night as a fugitive, sleeping on a rock in the desert, he has the dream of his life: a ladder stretching to heaven with angels ascending and descending, and God standing above it reaffirming the Abrahamic covenant. Jacob\'s response is transactional: "If God will be with me and will keep me in this way... then the LORD shall be my God." Even his vow is conditional. This is a man who negotiates with the divine.\n\n' +
      'In Paddan-aram, Jacob meets his match in Laban — a man who is every bit as manipulative as Jacob himself. He works seven years for Rachel and gets Leah. He works seven more. He is cheated on wages ten times. For twenty years, the deceiver is systematically deceived. The poetic justice is almost heavy-handed: the man who tricked his blind father is himself tricked in the darkness of a wedding tent.\n\n' +
      'The transformation comes at the Jabbok River, where Jacob wrestles a mysterious figure through the night. He will not let go until he receives a blessing. The figure dislocates his hip and gives him a new name: Israel, "one who struggles with God." Jacob limps away from that encounter permanently changed — literally, physically altered. He walks differently for the rest of his life. The con artist has become a person marked by divine encounter, and the mark is a wound.',
    modernParallel:
      'Jacob is the person who clawed his way to the top through charm, timing, and a willingness to cut corners — and then spent the second half of his life dealing with the relational wreckage. He is the entrepreneur who built the company by undercutting partners and then wonders why his own children are tearing each other apart. He is the person who finally stopped running, not because he became virtuous but because he ran into something that would not let him go, and he walked away limping. His transformation is not clean. It is the transformation of someone who got broken enough to become honest.',
    emotionalArc: JSON.stringify([
      { moment: 'Stealing the blessing from his blind father', reference: 'Genesis 27:18-29', emotional_state: 'Calculating nerve, fear of discovery', source_tier: 'ai_assisted' },
      { moment: 'Dream at Bethel — the ladder to heaven', reference: 'Genesis 28:12-15', emotional_state: 'Awe, but still transactional', source_tier: 'scholarship' },
      { moment: 'Deceived by Laban on his wedding night — gets Leah instead of Rachel', reference: 'Genesis 29:25', emotional_state: 'Shock, fury, the taste of his own medicine', source_tier: 'ai_assisted' },
      { moment: 'Wrestling at the Jabbok — hip dislocated, name changed', reference: 'Genesis 32:24-30', emotional_state: 'Desperation, refusal to let go, transformation through struggle', source_tier: 'canon' },
      { moment: 'Receiving Joseph\'s bloodied coat — believing his son is dead', reference: 'Genesis 37:33-35', emotional_state: 'Shattering grief, refusal to be comforted', source_tier: 'canon' }
    ]),
    faithJourney:
      'Jacob\'s relationship with God evolves from transaction to surrender, but the evolution is painfully slow. At Bethel, he makes a conditional vow — if God provides, then God will be his God. At Peniel, twenty years later, he clings to a divine figure and demands a blessing with the tenacity of someone who has spent his entire life grabbing for things. But this time the grabbing costs him something. He walks away with a limp. The transformation is not that Jacob stops wanting things; it is that he starts paying the real price for them.\n\n' +
      'In his later years, Jacob\'s faith becomes something quieter and more grief-shaped. He loses Rachel in childbirth. He believes Joseph is dead. He watches his sons descend into violence and deception — the same patterns he modeled for them. When he finally meets Pharaoh in Egypt, the old man summarizes his life in a single devastating line: "Few and evil have been the days of the years of my life." This is not false humility. It is the honest assessment of a man who got everything he schemed for and found it insufficient. Jacob\'s faith at the end is the faith of someone who has been emptied out by life and has nothing left to offer God except honesty.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 25-50. The Jabbok wrestling draws on extensive scholarship (Robert Alter, Avivah Zornberg). Jacob\'s speech to Pharaoh from Genesis 47:9.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 13. ESAU ───────────────────────────
  {
    id: 'esau',
    name: 'Esau',
    aliases: JSON.stringify(['Edom', 'Esaw', 'The Hairy One']),
    gender: 'male',
    tribeClan: 'Father of the Edomites',
    occupation: 'Hunter',
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: 'c. 1850-1700 BCE (traditional)',
    bioBrief:
      'Esau is the brother who got cheated — twice — and is usually cast as the cautionary tale, but his real story is about someone who was impulsive, got betrayed by his own family, and eventually chose forgiveness over revenge.',
    bioFull:
      'Esau comes out of the womb red and hairy, and his father loves him for exactly who he is: a man of the field, a hunter, someone who brings back wild game. Esau is physical, immediate, and uncomplicated. When he comes in hungry from the field and sells his birthright for stew, the text says he "despised" his birthright — but what it looks like in real time is a person who lives in the present and does not think in abstractions. The birthright is a future inheritance. The stew is right now. Esau chooses now.\n\n' +
      'The stolen blessing is the wound that defines Esau\'s life. His brother impersonates him, his mother orchestrates the deception, and his blind father gives away the blessing meant for him. When Isaac realizes what has happened, "he trembled very violently." When Esau realizes it, he lets out what the text calls "a great and exceedingly bitter cry." That phrase in Hebrew is one of the most emotionally raw expressions in the entire Old Testament. This is not a man who lost a business deal. This is a man who has been betrayed by every person in his family simultaneously.\n\n' +
      'Esau plans to kill Jacob, which is understandable if not admirable. Jacob flees. Twenty years pass. And then Jacob returns, terrified, expecting war — and Esau runs to meet him, embraces him, falls on his neck, and weeps. The reunion is one of the most gracious moments in Genesis. Esau has had twenty years to nurse his grievance, and instead he shows up with open arms. No conditions, no demands, no score-settling. Just a brother who decided that the relationship mattered more than the injustice.\n\n' +
      'The biblical tradition is not always kind to Esau. Malachi says "Esau I have hated." The New Testament calls him "profane." But the Genesis narrative itself presents a more complicated figure: impulsive, yes, but also warm, generous, and ultimately forgiving in ways that his more "spiritual" brother never manages to be.',
    modernParallel:
      'Esau is the brother who was always the favorite for who he was — physical, present, uncomplicated — and then learned that being loved for who you are does not protect you from being cheated by the people who love you. He is the kid who got cut from the will, the sibling who was written out of the family narrative. And then, improbably, he is also the person at the reunion who hugs first and asks questions later. Esau is the proof that the person the tradition calls "lesser" is sometimes the one with the bigger heart.',
    emotionalArc: JSON.stringify([
      { moment: 'Selling his birthright for stew', reference: 'Genesis 25:30-34', emotional_state: 'Impulsive present-focus, indifference to abstraction', source_tier: 'scholarship' },
      { moment: 'The great and bitter cry when the blessing is stolen', reference: 'Genesis 27:34', emotional_state: 'Devastation, rage, betrayal', source_tier: 'canon' },
      { moment: 'Planning to kill Jacob after Isaac\'s death', reference: 'Genesis 27:41', emotional_state: 'Murderous fury, grief channeled into vengeance', source_tier: 'canon' },
      { moment: 'Running to embrace Jacob after twenty years', reference: 'Genesis 33:4', emotional_state: 'Forgiveness, release, overwhelming emotion', source_tier: 'canon' },
      { moment: 'Burying Isaac alongside Jacob', reference: 'Genesis 35:29', emotional_state: 'Shared grief, quiet reconciliation', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Esau\'s spiritual life is almost entirely invisible in the text. He does not build altars. He does not receive visions. He marries Hittite women, which grieves his parents, and later marries a daughter of Ishmael — perhaps trying to please them, perhaps building his own alliances. The tradition has generally read Esau as spiritually insensitive, the man who "despised his birthright." But the Genesis narrative shows someone whose primary mode of relating to the world is physical and relational rather than spiritual and abstract.\n\n' +
      'The most theologically interesting thing Esau does is forgive. When he embraces Jacob at the Jabbok, he enacts something that looks a lot like grace — undeserved, unexpected, and given without conditions. The text does not frame it in spiritual language, but the action itself is more merciful than anything Jacob has done to that point. Esau\'s faith, if he has one, is expressed through relationship rather than ritual, through the body rather than the altar. Whether that counts in the economy of the divine is a question the text leaves conspicuously open.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 25-36. The "great and bitter cry" is discussed extensively in midrashic and scholarly literature.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 14. RACHEL ───────────────────────────
  {
    id: 'rachel',
    name: 'Rachel',
    aliases: JSON.stringify(['Rahel']),
    gender: 'female',
    tribeClan: 'Daughter of Laban, mother of Joseph and Benjamin',
    occupation: 'Shepherdess, matriarch',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 1800-1700 BCE (traditional)',
    bioBrief:
      'Rachel is the woman Jacob loved at first sight and worked fourteen years to marry — and who spent her married life in a bitter fertility competition with her sister, dying in childbirth on the road, with her last breath naming her son "son of my sorrow."',
    bioFull:
      'Rachel\'s entrance is cinematic. Jacob arrives at a well, sees her approaching with her father\'s sheep, and rolls away a stone that usually takes multiple shepherds to move. He kisses her and weeps. It is one of the few love-at-first-sight moments in the Bible, and it is genuinely beautiful. Jacob agrees to work seven years for her, "and they seemed to him but a few days because of the love he had for her." That line is one of the most romantic sentences in ancient literature.\n\n' +
      'Then Laban switches the brides on the wedding night, and Rachel watches her sister walk into the tent first. Whatever Rachel felt that night — fury, humiliation, helplessness — the text does not say. She waits seven more years. She becomes the second wife. And then she discovers that being loved is not the same as being fulfilled: Leah has children, and Rachel does not.\n\n' +
      'The rivalry between Rachel and Leah is one of the rawest depictions of sibling pain in the Bible. Rachel has Jacob\'s love. Leah has children. Each wants what the other has. Rachel\'s desperation reaches a breaking point when she cries to Jacob: "Give me children, or I shall die!" — and Jacob snaps back with rare anger: "Am I in the place of God, who has withheld from you the fruit of the womb?" It is the sound of two people in pain colliding.\n\n' +
      'When Joseph is finally born, Rachel names him with the words "May the LORD add to me another son." Even in the moment of receiving what she has begged for, she is already asking for more. And that request is fulfilled — but the fulfillment kills her. She dies giving birth to Benjamin on the road to Bethlehem, and with her last breath names him "Ben-Oni" — "son of my sorrow." Jacob renames him Benjamin, "son of the right hand." Rachel\'s name for her child is overwritten by her husband. Even in death, her voice is revised.',
    modernParallel:
      'Rachel is the woman who was loved deeply and still felt incomplete because the one thing she wanted most was the one thing she could not have. She is the person at the baby shower putting on a brave face, the woman who has the relationship everyone envies and goes home to cry because it is not enough. She is the sister who got the love and watched the other sister get the children, and who could never stop comparing. Her death on the roadside, naming her son after her pain, is the story of every person whose greatest desire arrived at a cost they did not survive.',
    emotionalArc: JSON.stringify([
      { moment: 'Meeting Jacob at the well — love at first sight', reference: 'Genesis 29:10-12', emotional_state: 'Wonder, being chosen', source_tier: 'ai_assisted' },
      { moment: 'Laban substitutes Leah on the wedding night', reference: 'Genesis 29:23-25', emotional_state: 'Humiliation, betrayal, powerlessness', source_tier: 'ai_assisted' },
      { moment: '"Give me children or I shall die!"', reference: 'Genesis 30:1', emotional_state: 'Desperate anguish, existential crisis', source_tier: 'canon' },
      { moment: 'Joseph is born — relief and immediate wanting more', reference: 'Genesis 30:22-24', emotional_state: 'Joy laced with insatiability', source_tier: 'scholarship' },
      { moment: 'Dying in childbirth, naming her son "son of my sorrow"', reference: 'Genesis 35:18', emotional_state: 'Agony, naming her suffering with her last breath', source_tier: 'canon' }
    ]),
    faithJourney:
      'Rachel\'s relationship with the divine is marked by frustration. When she finally conceives Joseph, the text says "God remembered Rachel" and "opened her womb" — language that implies God had been withholding. Rachel lives in the tension between being loved by her husband and feeling forgotten by her God. Her theft of Laban\'s household gods when they flee is one of the most puzzling moments in her story: is she hedging her bets, clinging to her father\'s religion, or simply taking what she can? The text does not explain, and Rachel sits on the stolen idols and lies about them.\n\n' +
      'Rachel\'s faith is the faith of someone who cannot stop wanting. She wants children. She gets a child and immediately wants another. Her desire is bottomless, and it drives her to desperation, manipulation, and eventually to the road where she dies. There is no resolution to Rachel\'s spiritual story, no moment where she arrives at peace. She dies reaching for more. For anyone who knows what it feels like to receive a blessing and immediately feel the absence of the next one, Rachel is an uncomfortably honest companion.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 29-35. Jeremiah 31:15 ("Rachel weeping for her children") extends her symbolic role but is not included here to maintain Genesis focus.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 15. LEAH ───────────────────────────
  {
    id: 'leah',
    name: 'Leah',
    aliases: JSON.stringify(['Le\'ah']),
    gender: 'female',
    tribeClan: 'Daughter of Laban, mother of Judah and five other tribes',
    occupation: 'Matriarch',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: 'c. 1800-1700 BCE (traditional)',
    bioBrief:
      'Leah is the unwanted wife — the woman who was substituted into a marriage meant for her sister and spent her life trying to earn the love of a man who never chose her.',
    bioFull:
      'Leah is introduced with a single physical detail: her eyes were "weak" or "tender" — the Hebrew word is ambiguous, and translations vary. What is unambiguous is the contrast: Rachel is described as "beautiful in form and appearance." Leah gets one possibly unflattering adjective. That comparison follows her for the rest of her life.\n\n' +
      'She enters her marriage through deception — not her own deception but her father\'s. Laban substitutes her for Rachel on the wedding night, and Jacob does not discover the switch until morning. The text gives no indication that Leah had a choice in this. She is used as a pawn in her father\'s scheme, and she wakes up married to a man who wanted someone else. That is her starting position for the rest of the story.\n\n' +
      'What follows is a devastating pattern in the naming of her children. Reuben: "The LORD has looked upon my affliction; now my husband will love me." Simeon: "The LORD has heard that I am hated." Levi: "Now this time my husband will be attached to me." Each child is named with a prayer that is really a plea: maybe this one will make him love me. Maybe this time will be enough. It never is.\n\n' +
      'But something shifts with the fourth son. Judah: "This time I will praise the LORD." No mention of Jacob. No plea for love. Just praise. Whether this represents a genuine spiritual breakthrough or simply exhaustion, the naming pattern breaks. Leah stops reaching for Jacob\'s love and names her son after gratitude rather than longing. It is one of the quietest and most powerful character developments in Genesis. And Judah — the son she named in praise rather than desperation — becomes the ancestor of David and, in Christian tradition, of Jesus.',
    modernParallel:
      'Leah is the woman who knows she is the second choice. She is the spouse who watches her partner\'s eyes light up for someone else at every family gathering. She is the person who keeps performing — another achievement, another child, another effort — hoping that eventually the quantity of devotion will compensate for the quality of love she is not receiving. Her story is the story of every person who has been in a relationship with someone whose heart belongs elsewhere, and who has had to find a reason to keep going that does not depend on being chosen.',
    emotionalArc: JSON.stringify([
      { moment: 'Substituted for Rachel on the wedding night', reference: 'Genesis 29:23-25', emotional_state: 'Complicity or powerlessness — likely both', source_tier: 'ai_assisted' },
      { moment: 'Naming Reuben — "Now my husband will love me"', reference: 'Genesis 29:32', emotional_state: 'Desperate hope, longing for acceptance', source_tier: 'canon' },
      { moment: 'Naming Simeon — "The LORD heard I am hated"', reference: 'Genesis 29:33', emotional_state: 'Acknowledged rejection, grief', source_tier: 'canon' },
      { moment: 'Naming Judah — "This time I will praise the LORD"', reference: 'Genesis 29:35', emotional_state: 'Breakthrough, redirected focus, possible peace', source_tier: 'scholarship' },
      { moment: 'Buried in the cave of Machpelah with the patriarchs', reference: 'Genesis 49:31', emotional_state: 'Honored in death in ways she was not in life', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Leah\'s faith develops in the space between what she wants and what she has. She wants Jacob\'s love. She has God\'s attention. The text repeatedly says "the LORD saw that Leah was unloved" and opened her womb — as though God is specifically compensating for what Jacob withholds. Leah\'s experience of the divine is deeply tied to her pain: God shows up most visibly in the moments when she is most rejected. That is a complicated gift.\n\n' +
      'The shift from Reuben to Judah traces a spiritual journey in miniature. Leah begins by using God as a means to an end — if God gives her children, Jacob will love her. By the fourth son, she has arrived at something that looks like worship disconnected from outcomes. "This time I will praise the LORD." Not "this time he will love me." Just praise. It is not clear whether Leah ever stops wanting Jacob\'s love, but at some point she stops making it the condition of her relationship with God. That is a profound spiritual maturation, and the text presents it without fanfare — just a name, and the reason for the name.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 29-35, 49. The Hebrew word for Leah\'s eyes (rakkot) is discussed in commentaries by Robert Alter and Nahum Sarna.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 16. JOSEPH (SON OF JACOB) ───────────────────────────
  {
    id: 'joseph-son-of-jacob',
    name: 'Joseph',
    aliases: JSON.stringify(['Yosef', 'Zaphenath-Paneah']),
    gender: 'male',
    tribeClan: 'Tribe of Joseph (Ephraim and Manasseh)',
    occupation: 'Shepherd, slave, prisoner, vizier of Egypt',
    socialStatus: 'royalty',
    era: 'patriarchal',
    approximateDates: 'c. 1750-1650 BCE (traditional)',
    bioBrief:
      'Joseph is the favored son who was sold into slavery by his own brothers and rose to become the second most powerful person in Egypt — a story about what happens when you survive the worst thing your family can do to you and then have to decide whether to forgive them.',
    bioFull:
      'Joseph is introduced as the beloved son of the beloved wife, and he is immediately insufferable. He brings bad reports about his brothers. He wears a special coat. He tells them about dreams in which they all bow down to him. Whether this is innocent excitement or adolescent arrogance, the effect is the same: his brothers hate him. The text uses that word — "hate" — and it is not subtle.\n\n' +
      'The brothers throw him into a pit and sell him to traders heading for Egypt. They dip his coat in goat blood and bring it to Jacob. The father who deceived his own father with goat skins is now deceived by his sons with goat blood. Joseph, seventeen years old, is carried to a foreign country as a commodity. Whatever confidence the coat and the dreams gave him is now irrelevant. He is a slave.\n\n' +
      'What follows is a story of almost absurd resilience. Joseph rises in Potiphar\'s house, is falsely accused by Potiphar\'s wife, and ends up in prison. He rises in prison. He interprets dreams. He is forgotten by the cupbearer for two full years — a detail that is easy to skim over but devastating to sit with. Joseph does everything right, helps someone who promises to help him, and then waits in a cell for 730 days. The silence of those years is immense.\n\n' +
      'When Joseph finally stands before Pharaoh, he is thirty years old. Thirteen years have passed since the pit. He interprets the dreams, proposes a plan, and is elevated to second-in-command of Egypt. The reversal is so complete it reads like fiction. But the emotional climax comes later, when his brothers arrive seeking grain during the famine and do not recognize him. Joseph recognizes them immediately. He has the power to destroy them and instead orchestrates an elaborate series of tests before finally breaking down in tears so loud that the Egyptians outside the room can hear. "I am Joseph," he says. "Is my father still alive?" The most powerful man in the room becomes a seventeen-year-old boy asking about his dad.',
    modernParallel:
      'Joseph is the person who was thrown out by his family, survived, built something extraordinary from nothing, and then had to face the people who threw him out — not as a victim but as their only hope. He is the CEO who started in the mailroom, the immigrant who became essential to the country that initially exploited him. His forgiveness of his brothers is not saintly detachment. It is the agonizing choice of someone who has every reason for revenge and chooses relationship instead. He is the proof that success does not erase the wound and that reconciliation requires more strength than vengeance.',
    emotionalArc: JSON.stringify([
      { moment: 'Sharing his dreams with his brothers — naive or arrogant', reference: 'Genesis 37:5-10', emotional_state: 'Youthful confidence, obliviousness to danger', source_tier: 'ai_assisted' },
      { moment: 'Thrown into the pit, sold to traders', reference: 'Genesis 37:23-28', emotional_state: 'Terror, betrayal, helplessness', source_tier: 'scholarship' },
      { moment: 'Falsely accused by Potiphar\'s wife, imprisoned', reference: 'Genesis 39:19-20', emotional_state: 'Injustice, powerlessness despite innocence', source_tier: 'ai_assisted' },
      { moment: 'Weeping when he reveals himself to his brothers', reference: 'Genesis 45:1-3', emotional_state: 'Overwhelming grief, love, release of years of hidden pain', source_tier: 'canon' },
      { moment: '"You meant it for evil, but God meant it for good"', reference: 'Genesis 50:20', emotional_state: 'Hard-won perspective, integration of suffering into meaning', source_tier: 'canon' }
    ]),
    faithJourney:
      'Joseph\'s faith is distinctive because it operates almost entirely without direct divine speech. Unlike Abraham, Jacob, or Moses, Joseph never has a recorded conversation with God. Instead, the narrative repeats a single refrain: "The LORD was with Joseph." In Potiphar\'s house, in prison, in the palace — the LORD was with Joseph. His faith is not built on visions or covenants but on a persistent divine presence that he seems to recognize even when his circumstances are terrible.\n\n' +
      'The theological climax of Joseph\'s story is Genesis 50:20: "You meant it for evil, but God meant it for good, to bring it about that many people should be kept alive." This is not a glib platitude. It is a statement made by a man who was betrayed, enslaved, falsely accused, imprisoned, and forgotten — and who, after all of that, still sees the hand of God in the pattern. It is not "everything happens for a reason" spoken by someone who has not suffered. It is "I see the reason" spoken by someone who has suffered everything. Joseph\'s faith is the faith of retrospective meaning — the belief that what happened to him was not random, even when it felt random for thirteen years.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 37-50. The Joseph narrative\'s literary sophistication is discussed by Robert Alter and Meir Sternberg.',
    isNamed: true,
    prominence: 'major',
  },

  // ─────────────────────────── 17. JUDAH (SON OF JACOB) ───────────────────────────
  {
    id: 'judah-son-of-jacob',
    name: 'Judah',
    aliases: JSON.stringify(['Yehudah']),
    gender: 'male',
    tribeClan: 'Tribe of Judah',
    occupation: 'Herder, tribal leader',
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: 'c. 1800-1700 BCE (traditional)',
    bioBrief:
      'Judah is the brother who sold Joseph into slavery, abandoned his responsibilities to Tamar, and then — in one of the Bible\'s sharpest character turns — became the person willing to sacrifice himself for someone else.',
    bioFull:
      'Judah occupies a strange position among Jacob\'s sons. He is the fourth-born, Leah\'s child, named in a moment of praise rather than desperation. But his early actions in the narrative are not praiseworthy. When the brothers are debating what to do with Joseph, it is Judah who proposes selling him to the traders. "What profit is it if we kill our brother?" he asks. The reasoning is practical, not moral. He frames mercy as a business decision. Joseph lives, but Judah\'s motivation is gain, not compassion.\n\n' +
      'Genesis 38 interrupts the Joseph narrative with Judah\'s detour, and the interruption is deliberate. Judah leaves his brothers, marries a Canaanite woman, and has three sons. The first two marry Tamar and die. Judah promises Tamar his third son and then fails to deliver, effectively abandoning her. When Tamar disguises herself as a prostitute and Judah sleeps with her, he does not recognize his own daughter-in-law. When she turns up pregnant and Judah condemns her to death, she produces his own staff and seal. His response is one of the most honest sentences in Genesis: "She is more righteous than I."\n\n' +
      'That moment of honest self-assessment begins a transformation. By the time Joseph — unrecognized — threatens to enslave Benjamin, Judah steps forward with a speech that is the moral climax of the entire patriarchal narrative. He offers himself in Benjamin\'s place. He describes what the loss would do to his father. He does not defend himself or bargain. He simply offers his own freedom for his brother\'s. The man who sold one brother now offers to become a slave for another.\n\n' +
      'This is why the royal line runs through Judah, not through any of his more outwardly righteous brothers. The Bible consistently chooses people whose transformation is visible and costly, not people who were always good.',
    modernParallel:
      'Judah is the person who made the worst decision of his life in his twenties — the one that hurt someone innocent and benefited him — and then spent decades being slowly broken by the consequences until he became someone capable of genuine sacrifice. He is the recovering addict who sponsors newcomers. He is the former bully who now runs the anti-bullying program. His authority comes not from always being right but from having been catastrophically wrong and choosing to change. He is the proof that the person you were at your worst does not have to be the person you are at the end.',
    emotionalArc: JSON.stringify([
      { moment: 'Proposing to sell Joseph rather than kill him', reference: 'Genesis 37:26-27', emotional_state: 'Cold pragmatism, rationalized cruelty', source_tier: 'scholarship' },
      { moment: 'Failing to give Shelah to Tamar — breaking his promise', reference: 'Genesis 38:14', emotional_state: 'Fear, avoidance, self-protective dishonesty', source_tier: 'ai_assisted' },
      { moment: '"She is more righteous than I"', reference: 'Genesis 38:26', emotional_state: 'Shame, honest self-reckoning', source_tier: 'canon' },
      { moment: 'Offering himself as a slave in Benjamin\'s place', reference: 'Genesis 44:33', emotional_state: 'Self-sacrificial resolve, complete reversal', source_tier: 'canon' }
    ]),
    faithJourney:
      'Judah\'s faith journey is not described in explicitly spiritual terms — he does not build altars or receive visions. His transformation is moral rather than mystical. The man who sold his brother and abandoned his daughter-in-law becomes the man who offers himself as a substitute for his youngest brother. That arc is not attributed to a divine encounter or a moment of revelation. It simply happens, slowly, through failure and consequence and the accumulated weight of having been wrong.\n\n' +
      'What makes Judah\'s journey significant is that it is a conversion story told entirely through action. He does not confess or repent in a formal sense. He simply starts doing the opposite of what he did before. He moves from exploiting the vulnerable to protecting them, from self-preservation to self-sacrifice. For anyone whose spiritual growth has come not through dramatic revelation but through the slow, humbling process of learning from their own failures, Judah is the most relatable patriarch in the Bible.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 37-38, 43-44. The structural parallel between Judah selling Joseph and offering himself for Benjamin is a recognized literary feature (Robert Alter).',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 18. TAMAR (GENESIS) ───────────────────────────
  {
    id: 'tamar-genesis',
    name: 'Tamar',
    aliases: JSON.stringify(['Tamar daughter-in-law of Judah']),
    gender: 'female',
    tribeClan: 'Married into the tribe of Judah',
    occupation: null,
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: 'c. 1800-1700 BCE (traditional)',
    bioBrief:
      'Tamar is the woman who was denied her rights by the family that owed them to her — and who used the only tools available to her to force justice from a system that had discarded her.',
    bioFull:
      'Tamar marries Er, Judah\'s firstborn. Er dies. By the custom of levirate marriage, she is given to the second son, Onan, whose duty is to produce an heir for his dead brother. Onan refuses — he sleeps with Tamar but deliberately prevents conception, using her body without fulfilling his obligation. He dies too. Judah promises Tamar his third son, Shelah, and sends her home to wait. He never follows through.\n\n' +
      'Tamar sits in her father\'s house as a widow, bound to a family that will not honor its commitment to her. She cannot remarry — she is technically pledged to Shelah. She cannot have children. She cannot move on. She is frozen in place by a broken promise, and the man who broke it shows no sign of making it right. Her situation is not just unfair; it is a legal and social prison.\n\n' +
      'So Tamar takes matters into her own hands. She removes her widow\'s garments, covers her face, and sits at the entrance to Enaim — a place she knows Judah will pass. He sees her, assumes she is a prostitute, and sleeps with her. She asks for his staff, cord, and seal as a pledge. These are not random objects. They are his identification — the ancient equivalent of his driver\'s license. Tamar is collecting evidence.\n\n' +
      'When she turns up pregnant and Judah condemns her to death for prostitution, she sends him his own belongings with a message: "The man to whom these belong is the one who made me pregnant." The hypocrisy is exposed publicly. Judah\'s response — "She is more righteous than I" — is the only acquittal Tamar needs. She bears twins, and through one of them, Perez, she enters the genealogy of David and, in Matthew\'s gospel, the genealogy of Jesus. The discarded daughter-in-law becomes an ancestor of the king.',
    modernParallel:
      'Tamar is the whistleblower. She is the woman who was wronged by a powerful man, had no institutional recourse, and used the only leverage she could find to force accountability. She is the employee who kept the receipts, the ex-wife who showed up to the hearing with documentation, the person who was told to sit quietly and instead made the truth impossible to ignore. Her methods are uncomfortable. Her cause is undeniable. She is every person who has been told "just wait, it\'ll work out" by the people who benefit from their waiting.',
    emotionalArc: JSON.stringify([
      { moment: 'Widowed twice, sent home with a broken promise', reference: 'Genesis 38:11', emotional_state: 'Trapped, erased, growing fury', source_tier: 'ai_assisted' },
      { moment: 'Removing her widow\'s garments and disguising herself', reference: 'Genesis 38:14', emotional_state: 'Calculated resolve, desperate courage', source_tier: 'scholarship' },
      { moment: 'Collecting Judah\'s seal, cord, and staff as evidence', reference: 'Genesis 38:18', emotional_state: 'Strategic precision under extreme pressure', source_tier: 'ai_assisted' },
      { moment: 'Producing the evidence when sentenced to death', reference: 'Genesis 38:25', emotional_state: 'Controlled revelation, life on the line', source_tier: 'ai_assisted' },
      { moment: 'Vindicated by Judah: "She is more righteous than I"', reference: 'Genesis 38:26', emotional_state: 'Relief, vindication, survival', source_tier: 'canon' }
    ]),
    faithJourney:
      'Tamar\'s story contains no direct reference to God, no prayer, no altar, no divine encounter. Her faith — if that is the right word — is expressed entirely through her refusal to accept injustice. She believes the levirate obligation is real, that she is owed something, and that the system\'s failure to deliver does not erase the obligation. In a world where women had almost no legal agency, Tamar acts as her own advocate, her own attorney, her own judge.\n\n' +
      'The inclusion of Tamar in the genealogy of David (Ruth 4:12) and Jesus (Matthew 1:3) is one of the most provocative choices in biblical literature. It says that the messianic line runs through a woman who disguised herself as a prostitute to confront a patriarch who had wronged her. Whatever that implies about God\'s view of rule-breaking in the service of justice, it complicates any simple reading of biblical morality. Tamar\'s spiritual legacy is not about obedience. It is about the refusal to be erased.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 38. Draws on Tikva Frymer-Kensky and Phyllis Bird for analysis of Tamar\'s agency within patriarchal structures.',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────── 19. LOT ───────────────────────────
  {
    id: 'lot',
    name: 'Lot',
    aliases: JSON.stringify(['Nephew of Abraham']),
    gender: 'male',
    tribeClan: 'Nephew of Abraham, father of Moab and Ammon',
    occupation: 'Herder, city dweller',
    socialStatus: 'common',
    era: 'patriarchal',
    approximateDates: 'c. 2000-1800 BCE (traditional)',
    bioBrief:
      'Lot is the nephew who chose the prosperous valley, ended up in Sodom, and watched his world burn — a man whose story is about what happens when you optimize for comfort and end up in a place you were never meant to stay.',
    bioFull:
      'Lot travels with Abraham from Ur and benefits from his uncle\'s wealth and divine favor. When their flocks grow too large to share the land, Abraham offers Lot first choice of territory. Lot looks at the Jordan valley — well-watered, lush, like "the garden of the LORD" — and chooses it. The comparison to Eden is deliberate and ominous. Lot picks the place that looks like paradise and moves toward Sodom.\n\n' +
      'The text traces a geographic trajectory that doubles as a moral one. Lot first pitches his tent "near Sodom." Then he is living "in Sodom." Then he is sitting "in the gate of Sodom" — which means he has become a civic leader, integrated into the city\'s power structure. The drift is gradual, and that is the point. Nobody wakes up one morning and decides to live in Sodom. You move toward it one campsite at a time.\n\n' +
      'When the angels arrive to destroy the city, Lot shows genuine hospitality — insisting the visitors stay with him, baking bread for them. But when the mob surrounds his house demanding the visitors, Lot offers his daughters instead. The offer is horrifying, and the text does not soften it. Whatever hospitality ethic Lot is operating under, the cost he is willing to pay reveals how deeply Sodom has shaped his moral calculations. He has internalized something of the city he chose.\n\n' +
      'The escape is chaotic: angels literally dragging Lot and his family out while he "lingered." His wife looks back and becomes a pillar of salt. Lot ends up in a cave with his daughters, and the final scene — the daughters getting him drunk and conceiving children by him — is as dark as anything in the Bible. Lot\'s story ends not with a redemption but with a collapse. The man who chose the good land loses everything and ends up in a hole in the ground.',
    modernParallel:
      'Lot is the person who took the job in the city because the salary was better and then spent twenty years becoming someone he would not have recognized at the start. He is the family member who drifted into a social circle that eroded his values so slowly he did not notice until the crisis hit. He is the person who, when the fire alarm goes off, hesitates — because leaving means admitting that everything he built in that place was a mistake. Lot is the cautionary tale of proximity: you become like the place you choose, and choosing based on what looks good from a distance is not the same as choosing well.',
    emotionalArc: JSON.stringify([
      { moment: 'Choosing the well-watered Jordan valley over the hill country', reference: 'Genesis 13:10-11', emotional_state: 'Calculated self-interest, optimism', source_tier: 'ai_assisted' },
      { moment: 'Sitting in the gate of Sodom — fully assimilated', reference: 'Genesis 19:1', emotional_state: 'Settled comfort, identity merged with the city', source_tier: 'scholarship' },
      { moment: 'Offering his daughters to the mob', reference: 'Genesis 19:8', emotional_state: 'Panic, moral compromise under extreme pressure', source_tier: 'scholarship' },
      { moment: 'Lingering while angels drag him out', reference: 'Genesis 19:16', emotional_state: 'Paralysis, inability to let go', source_tier: 'canon' },
      { moment: 'In the cave after losing everything', reference: 'Genesis 19:30', emotional_state: 'Total collapse, broken resignation', source_tier: 'ai_assisted' }
    ]),
    faithJourney:
      'Lot\'s faith is the faith of someone who stays adjacent to the covenant community without ever fully belonging to it. He benefits from Abraham\'s blessing, is rescued by Abraham\'s military intervention, and is saved from Sodom because of Abraham\'s intercession. But Lot never builds an altar. He never receives a direct promise from God. His spiritual life is derivative — connected to the divine through his uncle rather than through his own encounter.\n\n' +
      'The New Testament calls Lot "righteous" (2 Peter 2:7-8) and says his soul was "tormented" by the wickedness around him. That description suggests an internal spiritual life the Genesis text does not make explicit — a man who knew the difference between right and wrong but lived in a place that made it increasingly hard to act on that knowledge. Lot\'s faith is the faith of the person who knows better but stays anyway, whose spiritual instincts are real but whose circumstances have slowly eroded their ability to act on them. His story asks an uncomfortable question: how long can you live somewhere that contradicts your convictions before your convictions start to bend?',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 13-14, 19. 2 Peter 2:7-8 provides the "righteous Lot" characterization. Geographic trajectory analysis from Gordon Wenham\'s commentary.',
    isNamed: true,
    prominence: 'significant',
  },

  // ─────────────────────────── 20. MELCHIZEDEK ───────────────────────────
  {
    id: 'melchizedek',
    name: 'Melchizedek',
    aliases: JSON.stringify(['Malki-Tzedek', 'King of Salem', 'Priest of God Most High']),
    gender: 'male',
    tribeClan: null,
    occupation: 'King and priest',
    socialStatus: 'priest',
    era: 'patriarchal',
    approximateDates: 'c. 2000 BCE (traditional)',
    bioBrief:
      'Melchizedek appears for three verses in Genesis and becomes one of the most mysterious figures in Scripture — a king-priest with no genealogy who blesses Abraham and then vanishes, leaving centuries of interpretation in his wake.',
    bioFull:
      'Melchizedek arrives in the narrative without introduction and leaves without explanation. After Abraham defeats the kings who captured Lot, Melchizedek — king of Salem, priest of God Most High — appears with bread and wine, blesses Abraham, and receives a tithe from him. That is it. Three verses. No origin story, no family tree, no further appearances in the historical narrative. He walks into the story, changes the theological landscape, and walks out.\n\n' +
      'What makes Melchizedek significant is precisely what is missing. In a narrative world obsessed with genealogy — who begat whom — Melchizedek has none. He is a priest, but he is not a Levite; the Levitical priesthood will not exist for centuries. He worships "God Most High" (El Elyon), which is either a reference to the God of Abraham by another name or evidence of a broader ancient Near Eastern monotheistic tradition. His city, Salem, is traditionally identified with Jerusalem, which means the future holy city already has a priest-king before Israel even exists as a nation.\n\n' +
      'The fact that Abraham — the recipient of God\'s covenant, the father of the chosen people — gives a tithe to Melchizedek is theologically explosive. It implies that Melchizedek\'s priesthood has authority that precedes and transcends the Abrahamic covenant. The author of Hebrews will later build an entire theological argument on this point, claiming that Jesus is a priest "after the order of Melchizedek" — an order that predates, and therefore supersedes, the Levitical system.\n\n' +
      'Melchizedek is one of those figures the Bible seems to include specifically to resist neat categorization. He does not fit the system. He exists outside the lineages, outside the tribes, outside the covenants. And yet Abraham recognizes his authority without question.',
    modernParallel:
      'Melchizedek is the person who shows up at exactly the right moment with exactly the right thing and then disappears before you can ask who sent them. He is the stranger at the hospital who prays with you in the waiting room and is gone when you turn around. He is the mentor who appeared for one conversation that changed the trajectory of your life and whom you never saw again. He represents the reality that God\'s work is not limited to the people and institutions you expect — that sometimes the most significant spiritual encounter comes from someone who is not part of your tradition, your community, or your story.',
    emotionalArc: JSON.stringify([
      { moment: 'Appearing after Abraham\'s battle with bread and wine', reference: 'Genesis 14:18', emotional_state: 'Composure, priestly authority, generosity', source_tier: 'ai_assisted' },
      { moment: 'Blessing Abraham in the name of God Most High', reference: 'Genesis 14:19-20', emotional_state: 'Spiritual authority, serenity', source_tier: 'ai_assisted' },
      { moment: 'Receiving Abraham\'s tithe', reference: 'Genesis 14:20', emotional_state: 'Accepted authority — Abraham defers to him without explanation', source_tier: 'scholarship' }
    ]),
    faithJourney:
      'Melchizedek\'s faith is presented as fully formed and unquestioned. There is no journey to speak of — no struggle, no crisis, no doubt. He simply appears as a worshiper and priest of "God Most High," and neither the narrative nor Abraham challenges his credentials. In a story full of people who wrestle with faith, Melchizedek stands as someone for whom faith appears effortless, or at least settled. Whether that makes him a historical figure, a literary symbol, or a theological archetype depends on your tradition.\n\n' +
      'What Melchizedek\'s presence does to the larger narrative is important: it establishes that authentic worship of the true God existed outside of the Abrahamic line. Before there was a covenant people, there was a priest of God Most High in Salem. That fact resists any reading of the Bible that limits God\'s activity to a single lineage or tradition. Melchizedek is the reminder, dropped casually into the narrative and never explained, that God has always been bigger than any one family\'s story.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from Genesis 14:18-20, Psalm 110:4, and Hebrews 5-7. The "El Elyon" identification draws on Frank Moore Cross\'s work on Canaanite religion.',
    isNamed: true,
    prominence: 'secondary',
  },

  // ─────────────────────────── 21. JOB ───────────────────────────
  {
    id: 'job',
    name: 'Job',
    aliases: JSON.stringify(['Iyyov']),
    gender: 'male',
    tribeClan: 'Land of Uz',
    occupation: 'Wealthy landowner, livestock herder',
    socialStatus: 'merchant',
    era: 'patriarchal',
    approximateDates: null,
    bioBrief:
      'Job is the righteous man who lost everything — children, wealth, health — not because he did anything wrong but because the universe operates on terms that do not revolve around human merit, and his story is the Bible\'s most unflinching exploration of what faith looks like when nothing makes sense.',
    bioFull:
      'The book opens with a scene Job never sees: a conversation in heaven where God holds Job up as a model of righteousness and the Adversary (ha-Satan) proposes a test. Strip away the blessings, the Adversary argues, and Job will curse God. It is a wager, and Job is the collateral. He never learns about this conversation. He never receives an explanation for what is about to happen. That absence of explanation is the entire point of the book.\n\n' +
      'The losses come in waves, each messenger arriving before the last one finishes speaking. Livestock stolen. Servants killed. Children crushed in a collapsed house. Job tears his robe, shaves his head, falls to the ground, and says: "The LORD gave, and the LORD has taken away; blessed be the name of the LORD." That response is superhuman in its composure, and the text explicitly says Job "did not sin or charge God with wrong." But it is not the end of the story — it is the beginning. The real struggle has not started yet.\n\n' +
      'When the sores cover his body, when his wife tells him to curse God and die, when his three friends arrive and sit with him in silence for seven days before opening their mouths — that is when Job begins to break open. The speeches that follow are not patient resignation. They are furious, anguished, theologically sophisticated protests against a universe that punishes the innocent. Job does not gently question God. He demands a hearing. He wants a court date. He insists on his innocence with the passion of a defendant who knows the jury has already decided.\n\n' +
      'God\'s response from the whirlwind is not an explanation. "Where were you when I laid the foundation of the earth?" is not an answer to "Why am I suffering?" It is a redirection — a massive, overwhelming tour of the cosmos that reframes the question. God never says Job deserved it. God never says Job did anything wrong. God says: "You are looking at a small piece of a picture that is larger than you can comprehend." Whether that is satisfying depends on what you think you are owed.',
    modernParallel:
      'Job is the person in the hospital room who has done everything right — exercised, ate well, never smoked — and is now hearing the worst possible diagnosis. He is the parent who raised their children with devotion and is sitting in a funeral home. He is the person whose life has been demolished not by their own choices but by forces they cannot see, understand, or control. His friends are the well-meaning people in the waiting room who keep saying "everything happens for a reason" and "God has a plan" — and Job is the person who finally snaps and says, "Stop. You do not know what you are talking about." He is the patron saint of everyone who has been told their suffering makes sense when it does not.',
    emotionalArc: JSON.stringify([
      { moment: 'Receiving wave after wave of catastrophic loss', reference: 'Job 1:13-19', emotional_state: 'Escalating shock, composure under impossible weight', source_tier: 'canon' },
      { moment: '"The LORD gave, and the LORD has taken away"', reference: 'Job 1:21', emotional_state: 'Superhuman resignation, faith at the edge of comprehension', source_tier: 'canon' },
      { moment: 'Cursing the day of his birth', reference: 'Job 3:1-3', emotional_state: 'Despair so deep it retroactively rejects his own existence', source_tier: 'canon' },
      { moment: 'Demanding a hearing with God — insisting on his innocence', reference: 'Job 23:3-7', emotional_state: 'Righteous fury, insistence on justice', source_tier: 'canon' },
      { moment: 'God answers from the whirlwind', reference: 'Job 38:1-4', emotional_state: 'Overwhelmed, silenced, awestruck', source_tier: 'canon' }
    ]),
    faithJourney:
      'Job\'s faith goes through stages that the neat categories of "doubt" and "trust" cannot contain. He begins with a faith that is robust enough to survive total loss — "Blessed be the name of the LORD." But as the suffering continues and his friends insist that he must have done something to deserve it, Job\'s faith transforms from acceptance into confrontation. He does not stop believing in God. He starts fighting with God. He demands an audience. He insists that the system of rewards and punishments is broken, and he refuses to accept a theology that requires him to be guilty in order for God to be just.\n\n' +
      'The resolution — if it can be called that — comes not through explanation but through encounter. God shows up. Not with answers but with presence, and with a display of creative power so vast that Job\'s questions, while not answered, are recontextualized. Job\'s final response — "I had heard of you by the hearing of the ear, but now my eye sees you" — suggests that the experience of divine presence does something that theological argument cannot. It does not resolve the question of suffering. It makes the question bearable.\n\n' +
      'For anyone who has lived through inexplicable pain and found that the only honest spiritual response is to keep showing up angry, Job is the most important book in the Bible. It gives permission to be furious with God without abandoning God, to insist that the system is broken without concluding that the System-maker is absent. Job\'s faith is not the faith of answers. It is the faith of refusing to walk away from a God you cannot understand.',
    sourceTier: 'ai_assisted',
    sourceNotes: 'Synthesized from the book of Job. Draws on scholarship by Carol Newsom ("The Book of Job: A Contest of Moral Imaginations") and David Clines\'s commentary. Placement in the patriarchal era follows the traditional reading of Job\'s cultural setting (land of Uz, non-Israelite context, pre-Mosaic world).',
    isNamed: true,
    prominence: 'major',
  },
]
