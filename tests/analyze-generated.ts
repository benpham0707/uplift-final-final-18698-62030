/**
 * Analyze the latest generated essay to understand low literary score
 */

import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';

const GENERATED_ESSAY = `**The Art of Digital Surgery**

*Scene 1: Three nights before regionals*

My stomach cramped as our robot wandered the field like a patient hemorrhaging on an operating table. "It's having hallucinations," I whispered to Dad, watching six months of vision training dissolve into digital dementia. Our 120-pound mechanical body couldn't recognize yellow targets—like a surgeon who'd suddenly forgotten how to see tumors.

"Maybe we should go manual?" Sarah's voice cut through my panic.

"Hell no!" My hands trembled. "I can fix this."

But I was terrified. Completely, utterly terrified that I'd lobotomized our patient.

*Scene 2: Competition day*

The same robot that had wandered blind now moved with surgical precision, achieving 94% target detection across 47 autonomous runs—highest accuracy in our 23-team division. Like a successful operation, the transformation seemed miraculous to outside observers, but I knew the brutal truth: healing requires admitting your patient is dying.

Before that crisis week, our team operated like competing surgeons guarding secret techniques, each specialist protecting their domain. Territory wars. Blame games. After watching me spend 72 sleepless hours performing emergency code surgery—admitting I'd nearly killed our mechanical patient—everything changed.

"Dude, I'm totally lost on drive systems," Jake confessed during our next meeting.

"Thank God, because I have no clue what your gear ratios even mean!" Sarah laughed.

Our workshop transformed from isolated operating rooms into a collaborative surgical suite where 5 new programmers learned that debugging isn't autopsy—it's intensive care.

The decimal point buried in my HSV filtering code (0.85 instead of 0.085) had been like a microscopic tumor, invisible until it metastasized through our entire autonomous system. Finding it required the same methodical precision as a surgeon hunting cancer cells: examine every line, question every assumption, cut away the diseased logic until healthy vision returned.

Now my 23-page debugging guide sits in our team folder like a surgical manual, teaching future programmers that the most dangerous assumption in competitive robotics isn't technical failure—it's believing that admitting your robot is broken shows weakness. Truth is, the best digital surgeons know their mechanical patients intimately, including when they're hallucinating ghosts instead of seeing targets.

Sometimes you have to diagnose the blindness before you can restore sight.`;

async function main() {
  console.log('=== LITERARY SOPHISTICATION ANALYSIS ===\n');

  const lit = analyzeLiterarySophistication(GENERATED_ESSAY);

  console.log(`Overall Score: ${lit.overallScore}/100`);
  console.log(`Tier: ${lit.tier}\n`);

  console.log('BREAKDOWN:');
  console.log(`  Extended Metaphor: ${lit.extendedMetaphor.score}/20`);
  console.log(`    - Has metaphor: ${lit.extendedMetaphor.hasMetaphor}`);
  console.log(`    - Sustained: ${lit.extendedMetaphor.sustained}`);
  console.log(`    - Central image: ${lit.extendedMetaphor.centralImage}\n`);

  console.log(`  Structural Innovation: ${lit.structuralInnovation.score}/20`);
  console.log(`    - Innovations: ${lit.structuralInnovation.innovations.join(', ')}\n`);

  console.log(`  Rhythmic Prose: ${lit.rhythmicProse.score}/15`);
  console.log(`    - Has variety: ${lit.rhythmicProse.hasVariety}`);
  console.log(`    - Short sentences: ${lit.rhythmicProse.shortSentences}`);
  console.log(`    - Long sentences: ${lit.rhythmicProse.longSentences}`);
  console.log(`    - Parallelism: ${lit.rhythmicProse.hasParallelism}`);
  console.log(`    - Alliteration: ${lit.rhythmicProse.hasAlliteration}\n`);

  console.log(`  Sensory Immersion: ${lit.sensoryImmersion.score}/15`);
  console.log(`    - Diverse senses: ${lit.sensoryImmersion.diverseSenses}`);
  console.log(`    - Senses used:`, lit.sensoryImmersion.senses);
  console.log('');

  console.log(`  Authentic Voice: ${lit.authenticVoice.score}/10`);
  console.log(`    - Has parentheticals: ${lit.authenticVoice.hasParentheticals}`);
  console.log(`    - Has Gen-Z vernacular: ${lit.authenticVoice.hasGenZVernacular}`);
  console.log(`    - Markers: ${lit.authenticVoice.conversationalMarkers.join(', ')}\n`);

  console.log(`  Perspective Shift: ${lit.perspectiveShift.score}/10`);
  console.log(`    - Has shift: ${lit.perspectiveShift.hasShift}`);
  console.log(`    - Shift type: ${lit.perspectiveShift.shiftType}\n`);

  console.log(`  Strategic Vulnerability: ${lit.strategicVulnerability.score}/10`);
  console.log(`    - Placed at end: ${lit.strategicVulnerability.placedAtEnd}`);
  console.log(`    - Subverts expectation: ${lit.strategicVulnerability.subvertsExpectation}\n`);

  console.log('STRENGTHS:');
  lit.strengths.forEach(s => console.log(`  ✓ ${s}`));

  console.log('\nIMPROVEMENTS NEEDED:');
  lit.improvements.forEach(i => console.log(`  • ${i}`));

  // Manual check: Count sentence lengths
  console.log('\n\n=== SENTENCE LENGTH ANALYSIS ===\n');
  const sentences = GENERATED_ESSAY.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const lengths = sentences.map(s => {
    const words = s.trim().split(/\s+/).length;
    const preview = s.trim().substring(0, 60);
    return { words, preview };
  });

  console.log('Sentence lengths:');
  lengths.forEach((l, i) => {
    const marker = l.words <= 2 ? '*** VERY SHORT ***' : l.words <= 5 ? '** SHORT **' : l.words >= 25 ? '** LONG **' : '';
    console.log(`  ${i + 1}. ${l.words} words ${marker}`);
    if (marker) console.log(`     "${l.preview}..."`);
  });

  const veryShort = lengths.filter(l => l.words <= 2).length;
  const short = lengths.filter(l => l.words >= 3 && l.words <= 5).length;
  const long = lengths.filter(l => l.words >= 25).length;

  console.log(`\nSummary:`);
  console.log(`  Very short (1-2 words): ${veryShort}`);
  console.log(`  Short (3-5 words): ${short}`);
  console.log(`  Long (25+ words): ${long}`);
}

main().catch(console.error);
