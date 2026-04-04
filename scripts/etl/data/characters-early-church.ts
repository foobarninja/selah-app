import type { CharacterRecord } from './character-types'

export const earlyChurchCharacters: CharacterRecord[] = [
  // 107. Paul
  {
    id: 'paul',
    name: 'Paul',
    aliases: '["Saul of Tarsus", "Saul"]',
    gender: 'male',
    tribeClan: 'Benjamin',
    occupation: 'Apostle, tentmaker, theologian',
    socialStatus: 'other',
    era: 'early-church',
    approximateDates: 'c. 5–64 AD',
    bioBrief:
      'A Pharisee who violently persecuted the early church, then became its most prolific missionary and theologian after a dramatic encounter with the risen Jesus on the road to Damascus.',
    bioFull:
      "Paul is the person who should never have ended up on the team. He was brilliant, credentialed, and deeply committed — to destroying the very movement he would eventually lead. Before Damascus, he wasn't some casual skeptic; he was holding coats at a stoning, filing paperwork to have believers arrested, and doing it all with the conviction that he was serving God. The reversal wasn't a gentle rethinking. It was a total systems crash.\n\nWhat makes Paul extraordinary isn't just the conversion — it's what he did with the wreckage. He took his Pharisaic training, his Roman citizenship, his intellectual rigor, and his sheer relentless energy, and poured all of it into building something entirely new. He walked into hostile cities, got beaten, shipwrecked, jailed, and snake-bitten, and kept going. His letters reveal someone who was simultaneously brilliant and insecure, tender and combative, absolutely certain of his calling and constantly defending it.\n\nPaul's inner life is more exposed than almost any other biblical figure because he wrote so much. You can see him wrestling with his past guilt, his physical ailments, his loneliness in prison, and his frustration with churches that kept sliding back into old patterns. He wasn't a serene mystic floating above it all. He was an organizer, a strategist, a pastor who lost sleep over people he'd never met, and a theologian who worked out his ideas in real time, on paper, under pressure.\n\nHe spent his final years in chains, writing letters that would shape Western civilization. He didn't get to see the outcome. He died under Nero's persecution, probably beheaded, still dictating instructions and encouragement to communities scattered across the Mediterranean.",
    modernParallel:
      "He's the former prosecutor who switches sides to become a public defender — not because he got soft, but because he saw something that shattered his framework. He brings the same intensity, the same 80-hour weeks, the same obsessive attention to detail, but now aimed in the opposite direction. Former colleagues think he's lost his mind. New allies aren't sure they can trust him. He spends the rest of his career proving himself to both sides while building something neither expected.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Persecution of the church',
        reference: 'Acts 8:1-3',
        emotional_state: 'Zealous certainty, righteous aggression',
        source_tier: 'canon',
      },
      {
        moment: 'Damascus road encounter',
        reference: 'Acts 9:1-9',
        emotional_state: 'Shattered identity, blindness as metaphor made literal, total disorientation',
        source_tier: 'canon',
      },
      {
        moment: 'Thorn in the flesh',
        reference: '2 Corinthians 12:7-10',
        emotional_state: 'Vulnerability, frustrated dependence, hard-won acceptance',
        source_tier: 'canon',
      },
      {
        moment: 'Abandoned by Demas and others',
        reference: '2 Timothy 4:9-16',
        emotional_state: 'Loneliness, quiet grief, unshaken resolve',
        source_tier: 'canon',
      },
      {
        moment: 'Final imprisonment and approaching death',
        reference: '2 Timothy 4:6-8',
        emotional_state: 'Exhausted peace, defiant hope, readiness',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Paul's faith didn't evolve in a straight line — it detonated and then rebuilt from the rubble. He started with absolute confidence in his religious system, and that confidence was demolished in a single afternoon outside Damascus. What replaced it wasn't softer or less intense; it was the same ferocity redirected. He went from enforcing the law to proclaiming grace, but he carried the weight of what he'd done to believers before that turn.\n\nOver decades of ministry, Paul's faith became less about arguments and more about endurance. His early letters crackle with theological combat; his later ones, written from prison, are warmer, more personal, more concerned with relationships than debates. He never stopped thinking, but he moved from a faith built on getting it right to a faith built on holding on. His final recorded words aren't a theological treatise — they're a man asking for his coat and his books, telling a young protege to come before winter.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Extensively documented across Acts 7-28 and 13 epistles. Conversion account in Acts 9, 22, 26. Autobiographical details in Galatians 1-2, 2 Corinthians 11-12, Philippians 3, 2 Timothy 4.',
    isNamed: true,
    prominence: 'major',
  },

  // 108. Barnabas
  {
    id: 'barnabas',
    name: 'Barnabas',
    aliases: '["Joseph", "Son of Encouragement"]',
    gender: 'male',
    tribeClan: 'Levi',
    occupation: 'Apostle, missionary, mentor',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Levite from Cyprus who sold his property to support the early church, vouched for the newly converted Paul when no one else would, and became a key leader in the Gentile mission.',
    bioFull:
      "Barnabas is the person in every organization who sees potential before anyone else does. When Paul showed up in Jerusalem claiming to be a changed man, the apostles wanted nothing to do with him — and honestly, who could blame them? This was the guy who'd been dragging believers to prison. Barnabas walked in, put his arm around Paul, and said, essentially, \"I'll vouch for him.\" Without that moment, the entire trajectory of early Christianity might look different.\n\nHis real name was Joseph, but the apostles nicknamed him Barnabas — \"Son of Encouragement\" — and it stuck because it was so accurate. He was the person who sold a field and laid the money at the apostles' feet without fanfare. He was the one sent to Antioch when the church there started growing in unexpected ways, and instead of clamping down, he celebrated what he saw and went to find Paul to help lead it. He had the rare combination of generosity, discernment, and the willingness to step aside when someone else was better suited to lead.\n\nThe painful part of his story is the split with Paul over John Mark. Barnabas wanted to give the young man a second chance; Paul didn't. They disagreed so sharply they went separate ways. It's telling that Barnabas — the encourager — chose the underdog. And it's worth noting that Paul later admitted Mark had become useful to him, which suggests Barnabas was right all along.",
    modernParallel:
      "He's the senior developer who sees a raw but talented junior get rejected from every team, personally sponsors their transfer, and spends months pairing with them until they're ready to lead their own project. When the junior eventually becomes the CTO and people praise the hire, almost no one remembers who made that first bet.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Selling his field for the community',
        reference: 'Acts 4:36-37',
        emotional_state: 'Generous conviction, quiet decisiveness',
        source_tier: 'canon',
      },
      {
        moment: 'Vouching for Paul before skeptical apostles',
        reference: 'Acts 9:26-27',
        emotional_state: 'Courageous trust, willingness to risk reputation',
        source_tier: 'canon',
      },
      {
        moment: 'Sent to investigate Antioch and rejoicing',
        reference: 'Acts 11:22-24',
        emotional_state: 'Joy, open-hearted affirmation',
        source_tier: 'canon',
      },
      {
        moment: 'Sharp disagreement with Paul over John Mark',
        reference: 'Acts 15:36-41',
        emotional_state: 'Frustrated loyalty, painful conviction, grief over broken partnership',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Barnabas's faith expressed itself primarily through people. He didn't write theology or deliver famous sermons — he invested in human beings others had written off. His earliest act of faith was financial: selling land and giving the proceeds to the community. But his most consequential acts of faith were relational: standing next to Paul when it was dangerous, celebrating Gentile believers when it was controversial, and insisting on giving John Mark another chance when it was inconvenient.\n\nThe disagreement with Paul reveals something important about Barnabas's spiritual posture. He consistently chose the person over the program. Where Paul saw a mission at risk, Barnabas saw a young man who needed another shot. Both perspectives had merit, but Barnabas's instinct was always toward restoration. His faith wasn't naive — it was stubbornly hopeful, and the historical record suggests it paid off.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Primary source: Acts 4:36-37, 9:26-27, 11:22-30, 13-15. Mentioned in 1 Corinthians 9:6, Galatians 2:1-13, Colossians 4:10.',
    isNamed: true,
    prominence: 'significant',
  },

  // 109. Stephen
  {
    id: 'stephen',
    name: 'Stephen',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Deacon, preacher',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. died 34–36 AD',
    bioBrief:
      'The first Christian martyr — a Greek-speaking Jewish believer chosen to serve tables who turned out to be a fearless theologian, stoned to death after delivering a searing speech to the Sanhedrin.',
    bioFull:
      "Stephen was selected for what was essentially an administrative role — distributing food to widows — and turned out to be one of the most theologically sophisticated voices in the early church. He was one of seven men chosen because the apostles needed help with logistics. Nobody expected him to end up in front of the Sanhedrin delivering a history lecture that reframed the entire Hebrew Bible around a single argument: God has never been containable, and you keep trying to contain him.\n\nHis speech in Acts 7 is the longest recorded address in the book, and it is not diplomatic. He walks through Abraham, Joseph, Moses, David, and Solomon, building a case that Israel's leaders have a pattern of rejecting the very people God sends. Then he looks at the most powerful religious court in the nation and tells them they're continuing that pattern. He knew what would happen. The speech isn't a defense — it's a prosecution.\n\nWhat happened next is brutal and fast. The crowd rushed him, dragged him out of the city, and stoned him. Luke records two details that have echoed through centuries: Stephen saw heaven opened and the Son of Man standing — not sitting — at God's right hand. And as the rocks hit, he asked that the sin not be held against his killers. Standing nearby, watching it all, was a young man named Saul.",
    modernParallel:
      "He's the junior analyst who gets hired to run spreadsheets and ends up delivering a presentation to the board that calls out two decades of institutional dysfunction. Everyone in the room knows he's right, and that's exactly why they destroy his career. His slide deck gets quietly circulated for years afterward.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Chosen as one of the seven deacons',
        reference: 'Acts 6:1-6',
        emotional_state: 'Humble readiness, sense of purpose',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Performing signs and wonders, debating opponents',
        reference: 'Acts 6:8-10',
        emotional_state: 'Bold confidence, intellectual fire',
        source_tier: 'canon',
      },
      {
        moment: 'Delivering his defense before the Sanhedrin',
        reference: 'Acts 7:1-53',
        emotional_state: 'Prophetic fury, controlled intensity, absolute conviction',
        source_tier: 'canon',
      },
      {
        moment: 'Vision of heaven and death by stoning',
        reference: 'Acts 7:54-60',
        emotional_state: 'Transcendent peace, compassion for his killers, surrender',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Stephen's faith journey is compressed into a few chapters, but it moves at incredible speed. He went from serving tables to performing miracles to debating scholars to standing before the highest court in the land, all in what appears to be a very short period. His faith wasn't the slow-burn kind — it was immediate, total, and costly.\n\nThe most revealing moment is his death. Asking forgiveness for the people killing you while they're killing you isn't a theological position — it's a spiritual reflex. Whatever Stephen believed, it had gotten deep enough into him that it shaped his final conscious moments. His faith wasn't performed for an audience; it was expressed in extremity, when there was nothing left to gain.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Entire narrative contained in Acts 6:1–8:2. His speech (Acts 7) is the longest in Acts. Connection to Saul/Paul noted in Acts 7:58, 8:1.',
    isNamed: true,
    prominence: 'significant',
  },

  // 110. Philip the Evangelist
  {
    id: 'philip-the-evangelist',
    name: 'Philip the Evangelist',
    aliases: '["Philip the Deacon"]',
    gender: 'male',
    tribeClan: null,
    occupation: 'Deacon, evangelist',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'One of the seven deacons who became an evangelist, preached in Samaria, baptized the Ethiopian eunuch on a desert road, and later settled in Caesarea with four prophesying daughters.',
    bioFull:
      "Philip is the person who keeps showing up in the right place at the right time, not by accident but because he's paying attention. After the persecution that followed Stephen's death scattered the Jerusalem believers, Philip didn't hunker down — he went to Samaria, a region most Jewish believers would have avoided, and started preaching. The response was enormous. Then, in the middle of a successful urban revival, an angel told him to leave it all and go stand on a desert road. He went.\n\nThe encounter with the Ethiopian eunuch is one of the most intimate conversion scenes in the Bible. Philip finds a powerful foreign official sitting in his chariot, reading Isaiah, and not understanding it. Philip doesn't lecture — he asks a question, gets invited in, and explains the passage. When they pass water, the eunuch asks, \"What prevents me from being baptized?\" Philip doesn't check a rulebook. He baptizes him on the spot. Then he disappears — literally, according to Acts — and the eunuch continues on his way, rejoicing.\n\nPhilip resurfaces in Caesarea years later, settled with four daughters who prophesy. Paul stays at his house on the way to Jerusalem. That's it — no fanfare, no title, just a man who raised prophets and hosted travelers. Philip's story is one of responsiveness: he went where he was sent, spoke to whoever was in front of him, and didn't seem to need the spotlight.",
    modernParallel:
      "He's the community organizer who builds a thriving program in one neighborhood, then gets reassigned to a completely different zip code and does it again without complaint. Years later you find him running a quiet household where his kids are all doing remarkable things, and he's making coffee for whoever walks through the door.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Preaching in Samaria with great success',
        reference: 'Acts 8:4-8',
        emotional_state: 'Energized purpose, joy at unexpected harvest',
        source_tier: 'canon',
      },
      {
        moment: 'Redirected from successful ministry to a desert road',
        reference: 'Acts 8:26',
        emotional_state: 'Obedient trust, possible bewilderment',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Intimate conversation and baptism of the Ethiopian eunuch',
        reference: 'Acts 8:27-38',
        emotional_state: 'Attentive compassion, shared wonder',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Philip's faith is defined by availability. He didn't seek out dramatic moments — they found him because he kept saying yes. His willingness to leave a thriving ministry in Samaria for an empty road suggests a faith that trusted process over outcome. He didn't need to understand the strategy; he just needed the next instruction.\n\nWhat's quietly remarkable is the long middle of his life. Between the dramatic episodes in Acts 8 and his brief reappearance in Acts 21, decades pass. Philip raised four daughters who became prophets in their own right, which tells you something about the spiritual environment he cultivated at home. His faith wasn't just public ministry — it was the daily, unglamorous work of forming the next generation.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 6:1-6 (chosen as deacon), Acts 8:4-40 (Samaria and Ethiopian eunuch), Acts 21:8-9 (Paul visits his household in Caesarea). Distinct from Philip the apostle.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 111. Timothy
  {
    id: 'timothy',
    name: 'Timothy',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Pastor, missionary companion',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 17–80 AD',
    bioBrief:
      'A young believer of mixed heritage — Jewish mother, Greek father — who became Paul\'s closest protege, co-authored several letters, and eventually led the church at Ephesus.',
    bioFull:
      "Timothy grew up between two worlds. His mother Eunice and grandmother Lois were Jewish believers; his father was Greek. In a culture that cared intensely about categories, Timothy didn't fit neatly into any of them. Paul saw something in him early, recruited him for missionary work, and then — in a move that still surprises readers — had him circumcised to smooth over tensions with Jewish audiences. Timothy's ministry began with a painful compromise for the sake of a larger mission.\n\nHe became Paul's most trusted co-worker, the person Paul sent into difficult situations when he couldn't go himself. Corinth was imploding? Send Timothy. Thessalonica needed encouragement? Timothy. Ephesus needed long-term pastoral leadership? Timothy again. Paul's letters to him reveal genuine affection — he calls Timothy his \"true child in the faith\" — but also concern. Paul repeatedly tells him not to let anyone look down on his youth, to guard his teaching, to stay strong. The implication is that Timothy was naturally cautious, possibly anxious, and needed reassurance.\n\nTimothy's significance is in his faithfulness, not his flash. He didn't write groundbreaking theology or perform dramatic miracles. He showed up, did the hard relational work of pastoring messy communities, and carried Paul's letters and legacy forward when Paul could no longer do it himself. He was the person who kept things running when the founder was in prison.",
    modernParallel:
      "He's the COO to a visionary CEO — the one who actually implements the ideas, manages the people, and flies to the problem offices when things go sideways. He's younger than everyone he manages, fights imposter syndrome daily, and has a stomach condition from the stress. But the organization survives because of him, even though the founder gets the biography.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Chosen by Paul and circumcised for the mission',
        reference: 'Acts 16:1-3',
        emotional_state: 'Mixed emotions — honored but physically marked by compromise',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Sent to troubled Corinth as Paul\'s representative',
        reference: '1 Corinthians 4:17',
        emotional_state: 'Anxiety, sense of inadequacy, determined obedience',
        source_tier: 'scholarship',
      },
      {
        moment: 'Paul\'s encouragement not to be timid',
        reference: '2 Timothy 1:6-7',
        emotional_state: 'Self-doubt met with fatherly reassurance',
        source_tier: 'canon',
      },
      {
        moment: 'Called to carry on after Paul\'s approaching death',
        reference: '2 Timothy 4:1-5',
        emotional_state: 'Grief, weight of succession, resolve',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Timothy's faith was inherited before it was chosen. He learned Scripture from his mother and grandmother, which means his earliest experience of God was domestic, relational, and tied to the voices of women who believed before the church even existed in their town. That foundation mattered — Paul explicitly credits it — but Timothy had to make it his own in the crucible of public ministry.\n\nHis growth was shaped by proximity to Paul, but also by absence. When Paul sent him alone into hostile or chaotic church situations, Timothy had to lead without the safety net of his mentor's presence. Paul's letters suggest Timothy struggled with fear and self-doubt, and that his faith was the kind that needed tending — not because it was weak, but because it was honest. He didn't pretend to be fearless. He showed up afraid and did the work anyway, which is its own kind of courage.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 16:1-3 (recruitment), Romans 16:21, 1-2 Corinthians, Philippians, Colossians, 1-2 Thessalonians (co-author). Two pastoral epistles addressed to him. Hebrews 13:23 mentions his release from prison.',
    isNamed: true,
    prominence: 'significant',
  },

  // 112. Silas
  {
    id: 'silas',
    name: 'Silas',
    aliases: '["Silvanus"]',
    gender: 'male',
    tribeClan: null,
    occupation: 'Prophet, missionary companion',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A leader in the Jerusalem church and Roman citizen who became Paul\'s traveling companion after the split with Barnabas, co-founded churches across Asia Minor and Greece, and co-authored several letters.',
    bioFull:
      "Silas is the replacement who turned out to be exactly the right person for the job. After Paul and Barnabas split over John Mark, Paul chose Silas for the second missionary journey — and Silas walked straight into some of the most intense experiences recorded in Acts. Within months, he and Paul were beaten with rods and thrown into a Philippian jail, feet locked in stocks, singing hymns at midnight. An earthquake shook the prison open. Silas didn't run. He stayed, and a jailer's entire household came to faith that night.\n\nHe was a Roman citizen — a detail that mattered enormously for legal protection — and a recognized prophet in the Jerusalem church. He carried the Jerusalem Council's official letter to Antioch, which means the apostles trusted him with one of the most sensitive diplomatic tasks in early church history. He wasn't just Paul's sidekick; he was a respected leader in his own right who chose to serve alongside someone else's vision.\n\nSilas appears as co-sender on both Thessalonian letters and is likely the \"Silvanus\" who helped Peter write his first epistle. Then he fades from the record. His ministry was collaborative, adaptive, and largely uncredited — the kind of work that holds movements together without generating headlines.",
    modernParallel:
      "He's the experienced consultant who joins a startup as the number two, knowing the founder will get all the press. He's been through enough to know that ego doesn't build anything, so he sings through the hard nights, leverages his credentials when they're useful, and never writes a tell-all memoir.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Chosen to replace Barnabas on the second journey',
        reference: 'Acts 15:40',
        emotional_state: 'Readiness, stepping into a fraught situation',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Beaten and imprisoned in Philippi, singing hymns',
        reference: 'Acts 16:22-25',
        emotional_state: 'Physical pain, defiant worship, solidarity with Paul',
        source_tier: 'canon',
      },
      {
        moment: 'Earthquake and conversion of the jailer',
        reference: 'Acts 16:26-34',
        emotional_state: 'Awe, compassion, choosing to stay when escape was possible',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Silas's faith was tested in the most concrete way possible: physical suffering. Being beaten and jailed in a foreign city for preaching is not an abstract theological exercise. The fact that he responded by singing rather than panicking or plotting escape tells you something about where his faith had gotten to before Philippi. That wasn't his first crisis — he'd already been a prophet and leader in Jerusalem through the church's most turbulent years.\n\nHis willingness to stay in the open jail after the earthquake is the detail that reveals the most. Freedom was right there. He could have walked out. Instead, he stayed, and that decision saved a man's life and transformed a household. Silas's faith was the kind that understood the moment — that sometimes the miracle isn't the open door, it's what happens when you don't walk through it.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 15:22-40, 16-18 (missionary journeys with Paul). Co-sender of 1-2 Thessalonians. Likely the Silvanus of 1 Peter 5:12.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 113. Luke
  {
    id: 'luke',
    name: 'Luke',
    aliases: '["the beloved physician"]',
    gender: 'male',
    tribeClan: null,
    occupation: 'Physician, historian, author',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Gentile physician and careful historian who traveled with Paul and authored both the Gospel of Luke and the book of Acts — the largest single contribution to the New Testament by word count.',
    bioFull:
      "Luke is the person who made sure the story got told properly. He was a physician by training, a Gentile by birth, and a historian by obsession. He didn't just collect stories — he investigated them, interviewed eyewitnesses, cross-referenced accounts, and organized everything into two volumes that together make up more than a quarter of the New Testament. His opening to the Gospel is practically a research methodology statement: he carefully investigated everything from the beginning so his reader could know the certainty of what they'd been taught.\n\nHe traveled with Paul — the \"we\" passages in Acts quietly reveal his presence on some of the most harrowing legs of the journey, including the shipwreck on the way to Rome. He was there for the storm, the snake on Malta, the final arrival in chains. But he writes himself into the narrative so subtly that you barely notice. He's the narrator, not the protagonist.\n\nWhat distinguishes Luke from the other Gospel writers is his attention to people on the margins. His Gospel contains more stories about women, the poor, the sick, and the socially excluded than any other. The parables of the Good Samaritan and the Prodigal Son exist in the canon because Luke recorded them. He noticed what others walked past, and he had the skill and the patience to write it down in a way that has lasted two thousand years.",
    modernParallel:
      "He's the documentary filmmaker who embeds with a movement for years, gains everyone's trust, and produces the definitive account — the one historians will cite for centuries. He's not the subject; he's the lens. And his editorial choices about who to feature and what to include end up shaping how everyone understands the story.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Joining Paul\'s mission (first "we" passage)',
        reference: 'Acts 16:10-17',
        emotional_state: 'Quiet commitment, curiosity, sense of calling',
        source_tier: 'scholarship',
      },
      {
        moment: 'Shipwreck voyage to Rome',
        reference: 'Acts 27:1-44',
        emotional_state: 'Fear, clinical observation amid chaos, steadfastness',
        source_tier: 'canon',
      },
      {
        moment: 'Remaining with Paul during final imprisonment',
        reference: '2 Timothy 4:11',
        emotional_state: 'Loyal grief, determination to stay present',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Luke's faith is most visible in what he chose to preserve. A physician and a Gentile, he had every reason to write a tidy, rational account that would appeal to Greek-educated readers. Instead, he filled his Gospel with angels, miracles, and the Holy Spirit, and he made the poor and the outcast central to the story. His faith wasn't despite his scientific training — it worked through it. He investigated and believed, which is a combination many people assume is impossible.\n\nHis loyalty to Paul through imprisonment and approaching execution reveals a faith that was personal, not just intellectual. When everyone else abandoned Paul, Luke stayed. That's not the act of a detached historian — it's the act of someone who had been changed by what he'd witnessed and recorded. His faith was expressed through presence and through pen, and both mattered enormously.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Identified in Colossians 4:14 as "the beloved physician," Philemon 24, 2 Timothy 4:11. Author of Luke-Acts by strong early tradition. "We" passages in Acts 16, 20-21, 27-28 indicate firsthand presence.',
    isNamed: true,
    prominence: 'significant',
  },

  // 114. Priscilla
  {
    id: 'priscilla',
    name: 'Priscilla',
    aliases: '["Prisca"]',
    gender: 'female',
    tribeClan: null,
    occupation: 'Tentmaker, church leader, teacher',
    socialStatus: 'merchant',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Jewish-Christian woman who, with her husband Aquila, hosted house churches, partnered with Paul in tentmaking and ministry, and privately corrected the eloquent Apollos\'s theology.',
    bioFull:
      "Priscilla is consistently named before her husband Aquila in the biblical text, which in the ancient world was a deliberate signal that she held prominence — either socially, intellectually, or in terms of her role in the church. The couple were expelled from Rome under Claudius's edict, landed in Corinth, and immediately connected with Paul through their shared trade of tentmaking. From that point, they became two of Paul's most trusted co-workers.\n\nThe scene with Apollos is the one that reveals Priscilla most clearly. Apollos was brilliant, eloquent, and theologically incomplete — he knew only the baptism of John. Rather than publicly correcting him (which would have been humiliating and counterproductive), Priscilla and Aquila pulled him aside and explained the full picture privately. The text doesn't present this as unusual or controversial. It simply reports that a woman helped a man understand his faith more accurately, and then he went on to become one of the early church's most powerful preachers.\n\nPriscilla and Aquila hosted churches in their home in at least three cities — Corinth, Ephesus, and Rome. Paul says they \"risked their necks\" for him, though the specific incident isn't recorded. They were the infrastructure of the early church: the people who opened their homes, funded the work, taught the teachers, and moved wherever the mission needed them.",
    modernParallel:
      "She's the co-founder who gets listed second on the website but runs the actual operation. When the company's star hire turns out to have a blind spot in their understanding, she takes them to coffee and walks them through what they're missing — not to show them up, but because the work matters more than the credit.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Expelled from Rome, starting over in Corinth',
        reference: 'Acts 18:1-3',
        emotional_state: 'Displacement, resilience, pragmatic faith',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Partnering with Paul in ministry and trade',
        reference: 'Acts 18:1-3',
        emotional_state: 'Purposeful collaboration, deep investment',
        source_tier: 'canon',
      },
      {
        moment: 'Correcting Apollos privately',
        reference: 'Acts 18:24-26',
        emotional_state: 'Confident discernment, generous teaching',
        source_tier: 'canon',
      },
      {
        moment: 'Risking their lives for Paul',
        reference: 'Romans 16:3-4',
        emotional_state: 'Sacrificial courage, deep loyalty',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Priscilla's faith was portable and practical. She and Aquila were uprooted from Rome by imperial decree, and instead of treating it as a disaster, they turned it into a platform for ministry in Corinth, then Ephesus, and eventually back in Rome. Her faith didn't require stability — it created stability wherever she landed. Every home she set up became a church.\n\nHer correction of Apollos reveals a faith that was theologically literate and confident enough to engage with a gifted public speaker. She wasn't intimidated by his eloquence or his reputation. She saw what was missing, addressed it with grace, and released him to be more effective than before. That's a faith that is secure enough to invest in others without needing recognition — and the early church was built on exactly that kind of quiet, rigorous commitment.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 18:1-3, 18-19, 24-26. Romans 16:3-5, 1 Corinthians 16:19, 2 Timothy 4:19. Named before Aquila in four of six NT references, unusual for the era.',
    isNamed: true,
    prominence: 'significant',
  },

  // 115. Aquila
  {
    id: 'aquila',
    name: 'Aquila',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Tentmaker, church leader',
    socialStatus: 'merchant',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Jewish tentmaker from Pontus who, with his wife Priscilla, became one of Paul\'s closest ministry partners, hosting house churches across the Roman Empire and risking his life for Paul.',
    bioFull:
      "Aquila is almost never mentioned without Priscilla, which tells you something important about how they operated: as a unit. He was originally from Pontus, on the Black Sea coast, and had settled in Rome before Claudius expelled all Jews from the city around 49 AD. He and Priscilla landed in Corinth, set up their tentmaking shop, and within weeks were housing and working alongside Paul. Their home became the first church in Corinth.\n\nWhat stands out about Aquila is his apparent comfort with shared leadership. In a culture where men were expected to be the sole public face of any enterprise, Aquila and Priscilla operated as genuine partners. When they corrected Apollos, both names appear. When Paul sends greetings, both names appear. When he says they risked their lives, both names appear. Aquila doesn't seem to have needed to be the singular hero of his own story.\n\nTheir mobility was remarkable — Pontus, Rome, Corinth, Ephesus, back to Rome. Each move involved rebuilding a business, establishing a household, and opening a church. Aquila was the kind of person who carried his faith and his livelihood with him like a tent — portable, functional, and always ready to be pitched wherever he found himself.",
    modernParallel:
      "He's the entrepreneur who keeps relocating for his partner's career, sets up shop in each new city, and within six months has turned the living room into a gathering place for the neighborhood. He's never the keynote speaker, but every keynote speaker has eaten at his table.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Expelled from Rome under Claudius',
        reference: 'Acts 18:1-2',
        emotional_state: 'Upheaval, determination to rebuild',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Working alongside Paul in Corinth',
        reference: 'Acts 18:1-3',
        emotional_state: 'Camaraderie, purposeful labor',
        source_tier: 'canon',
      },
      {
        moment: 'Risking his life for Paul',
        reference: 'Romans 16:3-4',
        emotional_state: 'Selfless courage, protective loyalty',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Aquila's faith was expressed through hospitality, partnership, and risk. He opened his home repeatedly — in Corinth, Ephesus, Rome — and each time, that home became a church. His faith wasn't a private spiritual practice; it was architectural, literally providing the space where the early church gathered, worshipped, and grew.\n\nThe detail that he and Priscilla \"risked their necks\" for Paul suggests a faith that had counted the cost and found it acceptable. We don't know the specific incident, but the language implies mortal danger accepted voluntarily. Aquila's faith was the kind that expressed itself in concrete, costly action rather than theological abstraction — and the early church needed exactly that kind of person to survive.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 18:1-3, 18-19, 24-26. Romans 16:3-5, 1 Corinthians 16:19, 2 Timothy 4:19. Originally from Pontus (Acts 18:2).',
    isNamed: true,
    prominence: 'secondary',
  },

  // 116. Apollos
  {
    id: 'apollos',
    name: 'Apollos',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Preacher, theologian',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A highly educated Alexandrian Jew who was an eloquent and powerful preacher, corrected by Priscilla and Aquila, and became so influential in Corinth that some believers preferred him over Paul.',
    bioFull:
      "Apollos arrived in Ephesus like a wave — eloquent, educated, passionate, and incomplete. He was from Alexandria, the intellectual capital of the ancient world, and he knew the Hebrew Scriptures inside out. He was already preaching about Jesus with accuracy and fervor, but he only knew the baptism of John. He had the right direction but was missing a significant piece of the map.\n\nPriscilla and Aquila heard him, recognized both his gifts and his gaps, and pulled him aside for a private tutorial. What's remarkable is that Apollos accepted the correction. An eloquent, educated Alexandrian could easily have bristled at being taught by tentmakers. Instead, he learned, and then he went to Corinth and became so effective that the church started splitting into factions — some claiming Paul, some claiming Apollos. Paul had to write an entire section of 1 Corinthians addressing the problem, insisting that he and Apollos were just workers in the same field.\n\nApollos seems to have been uncomfortable with the cult of personality forming around him. Paul mentions wanting Apollos to return to Corinth, but Apollos \"was not at all willing\" to go at that time. Whether he was avoiding the factional mess or had other reasons, the refusal suggests a person with his own judgment and boundaries, not someone content to be a celebrity preacher.",
    modernParallel:
      "He's the TED Talk speaker who goes viral, builds a massive following, and then realizes his audience is turning into a fan club that's causing division in his field. He steps back from the spotlight, not because he's failed but because he's self-aware enough to know that his charisma is becoming the problem.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Preaching powerfully but incompletely in Ephesus',
        reference: 'Acts 18:24-25',
        emotional_state: 'Passionate confidence, unknowing limitation',
        source_tier: 'canon',
      },
      {
        moment: 'Receiving correction from Priscilla and Aquila',
        reference: 'Acts 18:26',
        emotional_state: 'Humility, openness, recalibration',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Becoming a factional figurehead in Corinth',
        reference: '1 Corinthians 1:12, 3:4-6',
        emotional_state: 'Discomfort with celebrity, possible guilt',
        source_tier: 'scholarship',
      },
      {
        moment: 'Refusing to return to Corinth despite Paul\'s urging',
        reference: '1 Corinthians 16:12',
        emotional_state: 'Independent judgment, boundary-setting',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Apollos's faith journey has an unusual shape: he started fervent, got corrected, became more effective, and then pulled back. His initial preaching was sincere but incomplete, which is a relatable position — being deeply committed to something you don't fully understand yet. The fact that he accepted correction from people with less formal education than he had suggests a faith that valued truth over ego.\n\nHis later reluctance to return to Corinth hints at a maturing faith that recognized the dangers of influence. He didn't want to be the center of a faction. That kind of restraint — choosing not to wield influence you legitimately possess — is rare and usually comes from hard-won self-knowledge. Apollos's faith grew not just in what he believed but in how he handled the power that his gifts gave him.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 18:24-28, 19:1. 1 Corinthians 1:12, 3:4-6, 3:22, 4:6, 16:12. Titus 3:13. Some scholars have proposed Apollos as author of Hebrews (Martin Luther\'s suggestion).',
    isNamed: true,
    prominence: 'secondary',
  },

  // 117. James, brother of Jesus
  {
    id: 'james-brother-of-jesus',
    name: 'James, brother of Jesus',
    aliases: '["James the Just"]',
    gender: 'male',
    tribeClan: 'Judah',
    occupation: 'Church leader, elder of Jerusalem',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. died 62 AD',
    bioBrief:
      'The brother of Jesus who did not believe during Jesus\'s ministry but became the leader of the Jerusalem church after the resurrection, authored the epistle of James, and was martyred around 62 AD.',
    bioFull:
      "James grew up in the same house as Jesus, and he didn't believe. That detail is easy to skip past, but it's worth sitting with. Imagine watching your older brother perform miracles, draw crowds, and make claims that would get anyone else committed — and your response is skepticism. John's Gospel records that Jesus's brothers urged him to go to Judea with a tone that drips with dismissal: \"Show yourself to the world.\" They weren't followers. They were embarrassed family members.\n\nSomething changed after the resurrection. Paul records that Jesus appeared to James specifically, and whatever happened in that encounter transformed him from a skeptic into the leader of the Jerusalem church. Not Peter. Not John. James — the brother who hadn't believed — became the person who presided over the most important theological debate in church history: whether Gentile converts needed to follow Jewish law. His ruling at the Jerusalem Council essentially determined that Christianity would be a global faith rather than a Jewish sect.\n\nHis epistle is the most practical book in the New Testament. It reads like a manual for daily life: control your tongue, don't favor the rich over the poor, faith without action is dead. There's almost no theology in it — just relentless application. He earned the nickname \"James the Just\" and, according to Josephus, was thrown from the temple and stoned around 62 AD. The historian notes that even non-Christian Jews in Jerusalem were outraged by his execution, which tells you how deeply respected he was across the community.",
    modernParallel:
      "He's the younger sibling of a famous innovator who spent years rolling his eyes at the family business, then had a personal experience that changed everything. He ended up running the organization, made the pivotal decision that took it international, and wrote the company handbook that everyone still uses. He's less flashy than his brother, more practical, and the employees trust him precisely because he came to his convictions the hard way.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Skepticism during Jesus\'s ministry',
        reference: 'John 7:2-5, Mark 3:21',
        emotional_state: 'Embarrassment, disbelief, familial tension',
        source_tier: 'canon',
      },
      {
        moment: 'Post-resurrection appearance from Jesus',
        reference: '1 Corinthians 15:7',
        emotional_state: 'Shattered assumptions, awe, possible grief over lost years',
        source_tier: 'canon',
      },
      {
        moment: 'Leading the Jerusalem Council decision',
        reference: 'Acts 15:13-21',
        emotional_state: 'Measured authority, diplomatic conviction',
        source_tier: 'canon',
      },
      {
        moment: 'Martyrdom (thrown from temple, stoned)',
        reference: 'Josephus, Antiquities 20.9.1',
        emotional_state: 'Costly faithfulness, prophetic endurance',
        source_tier: 'scholarship',
      },
    ]),
    faithJourney:
      "James's faith journey is one of the most dramatic reversals in the New Testament, precisely because it's so quiet. Unlike Paul's blinding light on Damascus road, James's conversion happens off-stage. One moment he's a skeptical brother; the next, he's leading the church. Paul mentions a post-resurrection appearance to James, and whatever happened in that encounter was enough to undo years of familial doubt.\n\nWhat emerged was a faith that was deeply Jewish, intensely practical, and allergic to hypocrisy. His epistle doesn't soar into theological abstractions — it stays on the ground, asking whether your faith changes how you treat the poor person who walks into your meeting. James's faith was earned, not inherited, and it expressed itself in behavior rather than belief systems. He spent his life proving that the test of faith is what you do with your hands, not what you say with your mouth.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 12:17, 15:13-21, 21:18. Galatians 1:19, 2:9, 2:12. 1 Corinthians 15:7. Author of Epistle of James. Josephus (Antiquities 20.9.1) records his martyrdom c. 62 AD. Eusebius (Church History 2.23) preserves Hegesippus\'s account.',
    isNamed: true,
    prominence: 'significant',
  },

  // 118. Lydia
  {
    id: 'lydia',
    name: 'Lydia',
    aliases: null,
    gender: 'female',
    tribeClan: null,
    occupation: 'Merchant, dealer in purple cloth',
    socialStatus: 'merchant',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A wealthy merchant of purple cloth from Thyatira, living in Philippi, who became the first recorded European convert to Christianity and hosted the founding church community in her home.',
    bioFull:
      "Lydia was already a seeker before Paul ever showed up. Luke describes her as a \"worshiper of God,\" meaning she was a Gentile who had been drawn to Jewish monotheism and ethical teaching. She was at the river on the Sabbath because there was no synagogue in Philippi — the women who gathered there had to improvise their worship outside the city gate. Into that improvised prayer meeting walked Paul, and Lydia listened.\n\nThe text says God \"opened her heart\" to respond to Paul's message. She was baptized immediately — along with her entire household — and then did something that reveals both her character and her resources: she insisted that Paul and his team stay at her home. The word Luke uses implies she had to persuade them, which makes sense. Accepting hospitality from a single woman (or a woman whose husband is notably absent from the story) in a Roman colony would have raised eyebrows. Lydia pressed the point. Her home became the first church in Europe.\n\nShe was a dealer in purple cloth, which means she was connected to the luxury trade. Purple dye was extraordinarily expensive — extracted drop by drop from sea snails — and the people who sold it operated in elite circles. Lydia had money, social connections, and a house large enough to function as a church and a guest house. She put all of it at the service of a movement that had just arrived in her city.",
    modernParallel:
      "She's the successful business owner who's been attending various spiritual gatherings for years, never quite finding what she's looking for, until a visiting speaker's message clicks. By the end of the week, she's converted her conference room into a meeting space and is funding the entire local chapter out of her own pocket. She doesn't ask permission — she just starts building.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Worshiping by the river with other women',
        reference: 'Acts 16:13',
        emotional_state: 'Spiritual hunger, communal seeking',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Hearing Paul and having her heart opened',
        reference: 'Acts 16:14',
        emotional_state: 'Recognition, something falling into place, joy',
        source_tier: 'canon',
      },
      {
        moment: 'Insisting Paul and company stay at her home',
        reference: 'Acts 16:15',
        emotional_state: 'Determined generosity, assertive hospitality',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Lydia's faith didn't start from scratch — it completed a journey already in progress. She was already worshiping, already seeking, already gathering with other women at the river. When Paul's message arrived, it didn't create her faith so much as it gave it a name and a fuller shape. The speed of her response — baptism, household conversion, opening her home — suggests someone who had been ready for a long time and finally found what she was ready for.\n\nWhat's striking is how immediately her faith became structural. She didn't just believe privately — she reorganized her household, her resources, and her social standing around her new conviction. Her home became the birthplace of the Philippian church, the community Paul later called his \"joy and crown.\" Lydia's faith was the seed of one of the healthiest churches in the New Testament, and it started with a woman by a river who refused to let the missionaries leave town without a place to stay.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 16:11-15, 40. Thyatira was known for purple dye production. The Philippian church she helped found is the recipient of Paul\'s letter to the Philippians.',
    isNamed: true,
    prominence: 'significant',
  },

  // 119. Cornelius
  {
    id: 'cornelius',
    name: 'Cornelius',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Roman centurion',
    socialStatus: 'military',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Roman centurion in Caesarea, described as devout and God-fearing, whose conversion — complete with the Holy Spirit falling on his Gentile household — shattered the early church\'s assumption that the gospel was only for Jews.',
    bioFull:
      "Cornelius was a Roman military officer commanding about 80 soldiers in the Italian Regiment, stationed in Caesarea. He was also, impossibly, a man of prayer who gave generously to the Jewish poor and was known in his community for his devotion to the God of Israel. He occupied an impossible position: a Gentile who feared the Jewish God but could never fully belong to the Jewish community, and a Roman officer who served the empire that occupied the land of the people whose God he worshipped.\n\nThe story of his conversion in Acts 10 is told at unusual length — and then repeated in Acts 11 — because Luke understood it was a hinge moment. God sent Cornelius a vision telling him to summon Peter. Simultaneously, God sent Peter a vision about clean and unclean food, preparing him to enter a Gentile home, which Jewish purity laws prohibited. Peter arrived, preached, and — before he could even finish his sermon — the Holy Spirit fell on everyone in the room. The Jewish believers who'd come with Peter were stunned. Gentiles were receiving the same gift, without circumcision, without converting to Judaism, without following any of the expected steps.\n\nPeter's response was essentially, \"Who am I to argue with God?\" He baptized them. Then he went back to Jerusalem and got interrogated by the church leadership for eating with uncircumcised people. The Cornelius episode forced the early church to confront a question it had been avoiding: was this movement for everyone, or just for the already-religious? Cornelius's living room provided the answer.",
    modernParallel:
      "He's the career military officer who's been attending services at the base chapel for years, volunteering at local food banks, and quietly praying in ways his commanding officer would find strange. When the chaplain finally comes to his house for dinner, something happens that neither of them expected — and it forces the entire religious organization to rethink who's really in and who's really out.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Years of prayer and generosity as a God-fearing Gentile',
        reference: 'Acts 10:1-2',
        emotional_state: 'Devoted longing, spiritual limbo, persistent faith without full belonging',
        source_tier: 'canon',
      },
      {
        moment: 'Angelic vision telling him to send for Peter',
        reference: 'Acts 10:3-8',
        emotional_state: 'Awe, fearful hope, obedient urgency',
        source_tier: 'canon',
      },
      {
        moment: 'Holy Spirit falls on his household during Peter\'s sermon',
        reference: 'Acts 10:44-48',
        emotional_state: 'Overwhelming confirmation, belonging, joy',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Cornelius's faith existed in a theological no-man's-land for years. He believed in the God of Israel, prayed regularly, and gave generously to the Jewish community — but he couldn't fully join that community without converting, and the early church hadn't yet decided whether Gentiles were welcome at all. His faith was real, persistent, and without a home. He worshipped a God whose official people hadn't made room for him yet.\n\nThe moment the Spirit fell on his household was more than a personal breakthrough — it was a theological earthquake. Cornelius didn't earn inclusion through the right ritual or the right heritage. God simply showed up in his living room and made the debate irrelevant. His faith journey matters because it wasn't about what Cornelius did to qualify — it was about what God did that made qualification unnecessary. The early church had to catch up to what Cornelius's experience had already proven.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 10:1–11:18. The episode is narrated twice (Acts 10 and retold in Acts 11:1-18) to emphasize its importance. Referenced again at the Jerusalem Council in Acts 15:7-9.',
    isNamed: true,
    prominence: 'significant',
  },

  // 120. Titus
  {
    id: 'titus',
    name: 'Titus',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Pastor, missionary companion',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A Greek believer who became one of Paul\'s most trusted delegates, handled the crisis in Corinth, and was left to organize the churches on the island of Crete.',
    bioFull:
      "Titus was Greek — fully, uncircumcised, unapologetically Greek — and Paul brought him to the Jerusalem Council as a living test case. Would the church require Gentile believers to become Jewish first? They looked at Titus and decided: no. His body became the battleground for a theological argument, and the fact that Paul refused to have him circumcised even under pressure tells you something about both men's convictions.\n\nPaul trusted Titus with the jobs that required both backbone and diplomacy. When the Corinthian church was in open revolt against Paul's authority, Titus was the one sent in to deliver a harsh letter and negotiate reconciliation. He succeeded. Paul's relief when Titus returned with good news is palpable in 2 Corinthians — he couldn't rest until he knew how Corinth had responded. Titus was also tasked with organizing the collection for the Jerusalem poor, a complex multi-city financial operation that required trust, organizational skill, and cross-cultural sensitivity.\n\nHis final assignment was Crete, where Paul left him to appoint elders and bring order to churches that were, by Paul's own description, dealing with a culture of dishonesty and laziness. It wasn't a glamorous posting. Titus was the person you sent to clean up the hard situations, not to launch the exciting new ventures. His value was in his reliability, his toughness, and his ability to walk into a mess and leave behind something functional.",
    modernParallel:
      "He's the regional manager sent to the underperforming office — the one where morale is shot, the books are a mess, and the previous manager quit. He doesn't get a welcome party. He gets a stack of problems and a mandate to fix them. Two years later, the office is running, and he's already been reassigned to the next crisis.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Presented at Jerusalem Council as a test case for Gentile inclusion',
        reference: 'Galatians 2:1-3',
        emotional_state: 'Vulnerability, being a symbol in someone else\'s argument',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Sent to Corinth during the church crisis',
        reference: '2 Corinthians 7:5-7, 13-15',
        emotional_state: 'Determined courage, diplomatic resolve',
        source_tier: 'canon',
      },
      {
        moment: 'Left on Crete to organize difficult churches',
        reference: 'Titus 1:5',
        emotional_state: 'Steady determination, acceptance of unglamorous work',
        source_tier: 'ai_assisted',
      },
    ]),
    faithJourney:
      "Titus's faith was forged in controversy. His very existence as an uncircumcised believer was a theological statement before he ever opened his mouth. He stood in front of the Jerusalem church as proof that God's grace didn't require a cultural prerequisite, and the church agreed — but the fact that it was even debated means Titus lived with the awareness that his belonging was contested.\n\nOver time, his faith matured into the kind that expresses itself through competence and endurance. He didn't write theology; he implemented it. He took Paul's vision and made it work in specific, difficult, unglamorous settings. His faith was the organizational kind — the kind that believes enough to show up early, stay late, and do the work that nobody will write a hymn about.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Galatians 2:1-3 (Jerusalem Council). 2 Corinthians 2:13, 7:5-16, 8:6, 8:16-24, 12:18 (Corinth mission and collection). Titus 1:4-5 (Crete assignment). 2 Timothy 4:10 (went to Dalmatia).',
    isNamed: true,
    prominence: 'secondary',
  },

  // 121. Mark (John Mark)
  {
    id: 'mark-john-mark',
    name: 'Mark (John Mark)',
    aliases: '["John Mark", "Mark"]',
    gender: 'male',
    tribeClan: null,
    occupation: 'Missionary companion, author',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A young man from a prominent Jerusalem family who abandoned Paul\'s first missionary journey, caused a rift between Paul and Barnabas, but was later restored and authored the earliest Gospel.',
    bioFull:
      "Mark's story is a redemption arc disguised as a minor character note. He was young, well-connected — his mother Mary hosted one of the earliest house churches in Jerusalem — and he joined Paul and Barnabas on their first missionary journey with what was probably genuine enthusiasm. Then, partway through, he quit. Acts doesn't say why. Maybe he was homesick, scared, overwhelmed, or sick. Whatever the reason, he turned around and went home, and Paul never forgot it.\n\nThe fallout was severe. When Barnabas wanted to take Mark on the second journey, Paul refused so emphatically that the two senior missionaries split up. It's one of the most human moments in Acts: two godly leaders in a screaming match about a kid who couldn't hack it. Barnabas took Mark and went to Cyprus. Paul took Silas and went north. The church doubled its missionary output, but the personal cost was real.\n\nWhat happened next is the quiet triumph. Mark didn't disappear into obscurity. He resurfaced alongside Peter, who apparently mentored him and whose eyewitness testimony became the foundation of Mark's Gospel — the earliest written account of Jesus's life. And in one of the most moving reversals in the New Testament, Paul himself later wrote from prison: \"Get Mark and bring him with you, for he is useful to me for ministry.\" The person Paul once rejected as unreliable became someone he specifically requested in his final days.",
    modernParallel:
      "He's the intern who flames out spectacularly on his first big project, gets blacklisted by one executive, and is quietly taken under the wing of another. Ten years later he's produced the most important piece of work in the organization, and the executive who rejected him is now asking for his help. Everyone who bailed on something at 22 and had to rebuild their reputation knows exactly who Mark is.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Joining the first missionary journey',
        reference: 'Acts 13:5',
        emotional_state: 'Eager anticipation, youthful excitement',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Abandoning the mission and returning to Jerusalem',
        reference: 'Acts 13:13',
        emotional_state: 'Overwhelmed, possibly afraid, ashamed retreat',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Causing the split between Paul and Barnabas',
        reference: 'Acts 15:37-39',
        emotional_state: 'Guilt, gratitude for Barnabas\'s advocacy, awareness of failure',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Paul\'s request for Mark in his final imprisonment',
        reference: '2 Timothy 4:11',
        emotional_state: 'Vindication, restored trust, bittersweet reconciliation',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Mark's faith journey is the story of a second chance actually working. His early departure from the first missionary journey could have been the end of his contribution. In many organizations, one visible failure at a young age defines you permanently. But Barnabas believed in him, Peter invested in him, and over time Mark became someone whose work would outlast everyone who'd written him off.\n\nThe Gospel he wrote is notably the shortest and most action-oriented of the four — it moves fast, skips the birth narrative, and presents Jesus in constant motion. Some scholars have seen Mark's own personality in his Gospel: someone who learned that faithfulness isn't about eloquence or perfection, but about getting back up and telling the story as honestly and urgently as you can. His faith was rebuilt from the rubble of a public failure, and what he built on that foundation has endured longer than any of the criticism.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 12:12 (mother\'s house church), 12:25, 13:5, 13:13 (departure), 15:37-39 (Paul-Barnabas split). Colossians 4:10 (Barnabas\'s cousin), Philemon 24, 2 Timothy 4:11 (Paul\'s request). 1 Peter 5:13 ("my son Mark"). Papias tradition (via Eusebius) identifies Mark as Peter\'s interpreter.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 122. Ananias of Damascus
  {
    id: 'ananias-of-damascus',
    name: 'Ananias of Damascus',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Disciple, healer',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A disciple in Damascus who, despite justifiable terror, obeyed God\'s command to visit the blinded Saul, laid hands on him, restored his sight, and became the instrument of Paul\'s entry into the faith.',
    bioFull:
      "Ananias is one of the bravest people in the New Testament, and his entire story takes about ten verses. God told him to go to a specific street, find a man named Saul of Tarsus, and lay hands on him. Ananias's response was essentially: \"Lord, I've heard about this man. He has authorization to arrest everyone like me.\" It's one of the few times in Scripture where someone argues with God by citing current events. His fear wasn't hypothetical — Saul had been actively hunting believers, and Ananias was being asked to walk into the predator's room and touch him.\n\nHe went anyway. He walked into the house, found the feared persecutor sitting blind and helpless, and the first word out of his mouth was \"Brother.\" Not \"enemy,\" not \"sinner,\" not \"you monster.\" Brother. He laid hands on Saul, scales fell from his eyes, and the most significant conversion in church history was completed through the hands of a man whose name most people forget.\n\nAnanias disappears from the narrative immediately afterward. He delivered the message, healed the eyes, called the enemy \"brother,\" and walked off stage. There's no record of him in the rest of Acts. He did the one thing God asked him to do, and it changed the world. Then he went back to whatever his normal life was.",
    modernParallel:
      "He's the person who gets a call asking them to visit someone in the hospital — someone who hurt them or their community — and goes anyway. He walks into the room, sees the person broken and vulnerable, and instead of delivering a speech about accountability, just says, \"Hey. I'm here.\" That one visit changes everything, and nobody outside the room ever knows it happened.",
    emotionalArc: JSON.stringify([
      {
        moment: 'God\'s command to visit Saul',
        reference: 'Acts 9:10-12',
        emotional_state: 'Fear, disbelief, reluctant attention',
        source_tier: 'canon',
      },
      {
        moment: 'Arguing with God about Saul\'s danger',
        reference: 'Acts 9:13-14',
        emotional_state: 'Self-preservation warring with obedience, honest terror',
        source_tier: 'canon',
      },
      {
        moment: 'Laying hands on Saul and calling him "Brother"',
        reference: 'Acts 9:17-18',
        emotional_state: 'Courage overcoming fear, compassion replacing suspicion',
        source_tier: 'canon',
      },
    ]),
    faithJourney:
      "Ananias's faith was tested in the most direct way possible: God asked him to do something that could get him killed, and he had to decide in real time whether he believed God enough to obey. His argument with God wasn't a lack of faith — it was faith being honest about its limits. He trusted God enough to talk back, and then he trusted God enough to go anyway.\n\nThe moment he called Saul \"Brother\" is the spiritual climax of his story. That word required more faith than the physical act of healing. To call the person who has been persecuting your people \"brother\" — when he still has the authorization papers in his bag — is an act of faith so specific and costly that it defies easy explanation. Ananias believed that God could change a person, and he bet his life on it. He was right.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 9:10-19, referenced again in Acts 22:12-16 (Paul\'s retelling). Described by Paul as "a devout man according to the law, well spoken of by all the Jews" in Damascus.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 123. Dorcas (Tabitha)
  {
    id: 'dorcas-tabitha',
    name: 'Dorcas (Tabitha)',
    aliases: '["Dorcas", "Tabitha"]',
    gender: 'female',
    tribeClan: null,
    occupation: 'Seamstress, charitable worker',
    socialStatus: 'common',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A beloved disciple in Joppa known for her charitable work and sewing garments for the poor, who died and was raised back to life by Peter — one of only a handful of resurrections in the New Testament.',
    bioFull:
      "Dorcas — also called Tabitha, the Aramaic equivalent — is described as a disciple who was \"full of good works and acts of charity.\" Luke uses the feminine form of \"disciple,\" one of the few times it appears in the New Testament, and it signals that her status in the community was recognized and specific. She wasn't just a kind person; she was a follower with a defined role.\n\nWhen she died, the community's grief was immediate and specific. They sent urgently for Peter, and when he arrived, the widows gathered around him weeping and showing him the garments Dorcas had made for them. That detail is devastating in its concreteness. They didn't tell Peter about her theology or her spiritual gifts. They held up the clothes she had sewn with her own hands. Her legacy was measured in stitches.\n\nPeter sent everyone out, prayed, and said, \"Tabitha, arise.\" She opened her eyes, saw Peter, and sat up. The resurrection became known throughout Joppa, and many believed. But the story is really about what her community revealed while she was dead: that her absence left a hole shaped like all the practical, unglamorous work she had done. The widows didn't mourn a preacher — they mourned the person who had clothed them.",
    modernParallel:
      "She's the woman at the community center who has been quietly altering donated clothes, knitting blankets for NICU babies, and making sure every family that walks through the door leaves with something that fits. When she's suddenly hospitalized, the entire neighborhood realizes how much of their safety net was held together by one person with a sewing machine and a refusal to stop.",
    emotionalArc: JSON.stringify([
      {
        moment: 'A life of making garments and caring for the poor',
        reference: 'Acts 9:36',
        emotional_state: 'Steady compassion, quiet purpose',
        source_tier: 'canon',
      },
      {
        moment: 'Death and community grief',
        reference: 'Acts 9:37-39',
        emotional_state: 'Community devastation, tangible loss',
        source_tier: 'canon',
      },
      {
        moment: 'Raised to life by Peter',
        reference: 'Acts 9:40-42',
        emotional_state: 'Disorientation, wonder, restored purpose',
        source_tier: 'ai_assisted',
      },
    ]),
    faithJourney:
      "Dorcas's faith was expressed almost entirely through her hands. She didn't preach, prophesy, or write letters. She sewed garments for people who couldn't afford them. Her faith was textile — woven into fabric, cut to fit specific bodies, handed to specific widows who needed warmth. In a tradition that often elevates words over actions, Dorcas is the counterargument.\n\nHer resurrection adds an extraordinary dimension. God apparently considered her work important enough to reverse death for it. The widows' weeping wasn't just personal grief — it was a community confronting the loss of its most essential caretaker. Her faith mattered not because of its theological sophistication but because of its relentless practicality. She is the patron saint of everyone whose ministry happens at a sewing machine, a stove, or a folding table — the people without platforms whose absence is only understood when they're gone.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Acts 9:36-43. One of two people raised from the dead in Acts (the other is Eutychus in Acts 20). The feminine form of "disciple" (mathetria) is unique in the NT.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 124. Philemon
  {
    id: 'philemon',
    name: 'Philemon',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Slaveholder, church host',
    socialStatus: 'merchant',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A wealthy Christian in Colossae who hosted a house church and received Paul\'s letter asking him to welcome back his runaway slave Onesimus — not as property, but as a brother.',
    bioFull:
      "Philemon is the recipient of the most personally uncomfortable letter in the New Testament. He was a believer, a church leader, and a slaveholder — which was entirely normal in the Roman world and entirely in tension with the implications of the gospel he professed. Paul's letter to him is a masterpiece of persuasion, but underneath the rhetoric is a simple, radical request: take back the person who wronged you, and treat him as family.\n\nPaul could have commanded Philemon — he says so explicitly, which is itself a power move. Instead, he appeals. He plays every card: I'm old, I'm in chains, I converted your slave, I converted you, you owe me your own self. He even offers to cover any financial loss Onesimus caused. The letter is simultaneously affectionate and relentless. Paul isn't really giving Philemon a choice while insisting that he is.\n\nWhat makes Philemon's situation so uncomfortable is its specificity. This isn't an abstract discussion about social justice — it's one man being asked to give up his legal rights over another man, in front of his entire house church, because both of them now belong to a community that calls itself a family. The letter was read publicly, which means Philemon's response would be witnessed by everyone he worshipped with. Paul knew exactly what he was doing.",
    modernParallel:
      "He's the small business owner and church deacon who gets a letter — read aloud at the Sunday meeting — from a respected mentor asking him to rehire the employee who stole from him and skipped town, and not just rehire him but treat him as a partner. The whole congregation is watching to see what he does. His legal rights are clear, his emotional wounds are real, and the letter has made it impossible to say no without looking like a hypocrite.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Loss of a slave — property and possibly trust',
        reference: 'Philemon 15-16',
        emotional_state: 'Betrayal, financial loss, anger',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Receiving Paul\'s letter in front of the church',
        reference: 'Philemon 1-25',
        emotional_state: 'Conflicted obligation, public pressure, wrestling with grace',
        source_tier: 'scholarship',
      },
      {
        moment: 'Decision to receive Onesimus back',
        reference: 'Philemon 17-21',
        emotional_state: 'Costly surrender, possible resentment giving way to generosity',
        source_tier: 'ai_assisted',
      },
    ]),
    faithJourney:
      "Philemon's faith was about to be stress-tested in the most personal way possible. It's one thing to believe that all people are equal before God in the abstract; it's another to be told to treat the specific person who wronged you as your brother. Paul's letter forces Philemon to decide whether his faith is real enough to override his rights — legal, financial, and emotional.\n\nWe don't know what Philemon decided, but the fact that the letter survived and was circulated suggests he responded well. If he'd refused, the letter would likely have been suppressed. His faith journey is the one most of us actually face: not dramatic conversions or heroic martyrdoms, but the quiet, costly decision to extend grace to a specific person who doesn't deserve it, in front of people who are watching.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Entire letter of Philemon (25 verses). Colossians 4:9 mentions Onesimus as from Colossae. Philemon 2 mentions Apphia (possibly his wife) and Archippus. Church tradition holds that Philemon freed Onesimus.',
    isNamed: true,
    prominence: 'secondary',
  },

  // 125. Onesimus
  {
    id: 'onesimus',
    name: 'Onesimus',
    aliases: null,
    gender: 'male',
    tribeClan: null,
    occupation: 'Slave (later freedman and minister)',
    socialStatus: 'slave',
    era: 'early-church',
    approximateDates: 'c. 1st century AD',
    bioBrief:
      'A runaway slave from Colossae who encountered Paul in prison, became a believer, and was sent back to his master Philemon with a letter requesting that he be received as a brother rather than as property.',
    bioFull:
      "Onesimus's name means \"useful\" — a common slave name in the Roman world, chosen by owners, not parents. He ran away from Philemon, possibly stealing money in the process, and somehow ended up in the orbit of Paul, who was in prison. How a runaway slave from a small city in Asia Minor found a jailed apostle in Rome (or Ephesus, depending on the dating) is one of the small mysteries of the New Testament. However it happened, Onesimus encountered Paul, heard the gospel, and believed.\n\nPaul's affection for him is unmistakable. He calls Onesimus \"my child\" and \"my very heart.\" He makes a wordplay on the name: Onesimus was \"formerly useless to you, but now indeed useful both to you and to me.\" The pun is gentle, but underneath it is a radical claim — that a runaway slave had become valuable not as property but as a person, a brother, a co-worker in ministry. Paul wanted to keep him but sent him back because the reconciliation with Philemon needed to happen.\n\nBeing sent back was an act of extraordinary vulnerability. Under Roman law, a recaptured runaway slave could be beaten, branded, or killed. Onesimus walked back into Philemon's house carrying a letter that asked for mercy but couldn't guarantee it. His freedom, his body, and his life depended on whether one man's faith was stronger than his legal rights. Some church traditions hold that Onesimus was freed, became a minister, and may even be the Onesimus who later served as bishop of Ephesus.",
    modernParallel:
      "He's the undocumented worker who fled an exploitative employer, got connected to a legal aid organization through a chance encounter, and is now being sent back to negotiate face-to-face with a letter from a respected advocate — knowing that the law isn't on his side, the employer has every right to retaliate, and his only protection is a piece of paper asking for grace. Everything depends on whether the person he wronged sees him as a human being or a line item.",
    emotionalArc: JSON.stringify([
      {
        moment: 'Running away from Philemon',
        reference: 'Philemon 15-16',
        emotional_state: 'Desperation, survival instinct, fear of consequences',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Encountering Paul in prison and converting',
        reference: 'Philemon 10',
        emotional_state: 'Unexpected belonging, being seen as a person for possibly the first time',
        source_tier: 'ai_assisted',
      },
      {
        moment: 'Being sent back to Philemon with the letter',
        reference: 'Philemon 12, 17',
        emotional_state: 'Terror, fragile hope, trusting Paul\'s letter with his life',
        source_tier: 'ai_assisted',
      },
    ]),
    faithJourney:
      "Onesimus came to faith from the bottom of the social hierarchy. He was a slave, a runaway, and possibly a thief. He had no status, no rights, and no safety net. His conversion in Paul's prison wasn't an intellectual exercise — it was the first time someone with power looked at him and said, \"You are my child, my heart, my brother.\" For a person whose very name was chosen by an owner to describe his utility, being called family was revolutionary.\n\nHis willingness to go back to Philemon is the most concrete expression of his faith. He trusted that the gospel Paul preached was real enough to change the behavior of the man who owned him. He bet his body on theology. Whether Philemon freed him or not, the act of returning was itself an act of faith — the belief that the community he was walking back into had been transformed by the same message that had transformed him.",
    sourceTier: 'ai_assisted',
    sourceNotes:
      'Philemon 10-21 (primary narrative). Colossians 4:9 ("one of you" — from Colossae). Ignatius of Antioch (c. 110 AD, Epistle to the Ephesians 1:3) mentions a bishop named Onesimus in Ephesus, possibly the same person.',
    isNamed: true,
    prominence: 'secondary',
  },
]
