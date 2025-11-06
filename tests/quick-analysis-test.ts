/**
 * Quick test to see what analysis says about generated content
 */

import { analyzeAuthenticity } from '../src/core/analysis/features/authenticityDetector';
import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';

const GENERATED_ROBOTICS = `**The Orchestra Pit**

*Scene 1: When the Music Dies*

My hands wouldn't stop shaking. Three days before regionals, staring at 847 lines of code that should've been our robot's eyes—instead producing nothing but digital static. The vision system couldn't detect a single orange cone. I was terrified we'd built a $12,000 paperweight.

"So we're basically screwed?" Jake asked, one of my five mentees looking like I'd just told him Santa wasn't real.

"Not screwed. Just... temporarily tone-deaf," I muttered, but honestly? I had no clue how to fix this. Sarah, our mechanical lead, raised an eyebrow at my pathetic optimism. Before this disaster, we were 23 kids sharing lab space. Now we were a broken orchestra, and somehow I was holding the conductor's baton with zero idea which end was up.

*Scene 2: Finding the Lost Note*

72 hours. 18 energy drinks. One missing bracket buried in line 394 like a wrong note hiding in a symphony. At 4 AM, surrounded by circuit boards and my own desperation, I found it—the tiny typo that had silenced everything.

"You look like a caffeinated zombie," Dad said, finding me still hunched over my laptop.

"Zombies don't debug code!" I shot back, but my voice cracked. What if this didn't work?

It worked. At regionals, our robot scored 127 autonomous points across 8 matches, placing 3rd out of 47 teams. But the real victory? Those terrified mentees became confident programmers. My 23-page debugging guide (yes, I documented everything) helped 15 other teams at the next competition. Jake started calling error messages "sour notes." The twins created calibration protocols they named "tuning forks."

Sometimes the most beautiful music comes after silence nearly breaks you. Sometimes the conductor is just another musician learning that shaky hands can still make magic happen.`;

async function main() {
  console.log('\n=== AUTHENTICITY ANALYSIS ===\n');
  const auth = analyzeAuthenticity(GENERATED_ROBOTICS);
  console.log(`Score: ${auth.authenticity_score}/10`);
  console.log(`Voice Type: ${auth.voice_type}`);
  console.log(`\nGreen Flags (${auth.green_flags.length}):`);
  auth.green_flags.forEach(f => console.log(`  ✓ ${f}`));
  console.log(`\nRed Flags (${auth.red_flags.length}):`);
  auth.red_flags.forEach(f => console.log(`  ✗ ${f}`));

  console.log('\n\n=== ELITE PATTERNS ANALYSIS ===\n');
  const elite = analyzeElitePatterns(GENERATED_ROBOTICS);
  console.log(`Overall Score: ${elite.overallScore}/100`);
  console.log(`Tier: ${elite.tier}`);

  console.log(`\nVulnerability Score: ${elite.vulnerability.score}/10`);
  console.log(`Markers found:`, elite.vulnerability.markers);
  console.log(`Examples:`, elite.vulnerability.examples.slice(0, 3));

  console.log(`\nDialogue:`);
  console.log(`  Has quotes: ${elite.dialogue.hasQuotes}`);
  console.log(`  Count: ${elite.dialogue.quoteCount}`);
  console.log(`  Has confrontation: ${elite.dialogue.hasConfrontation}`);

  console.log(`\nStrengths (${elite.strengths.length}):`);
  elite.strengths.slice(0, 5).forEach(s => console.log(`  ✓ ${s}`));

  console.log(`\nGaps (${elite.gaps.length}):`);
  elite.gaps.slice(0, 5).forEach(g => console.log(`  • ${g}`));

  console.log('\n\n=== LITERARY SOPHISTICATION ANALYSIS ===\n');
  const lit = analyzeLiterarySophistication(GENERATED_ROBOTICS);
  console.log(`Overall Score: ${lit.overallScore}/100`);
  console.log(`Tier: ${lit.tier}`);

  console.log(`\nExtended Metaphor: ${lit.extendedMetaphor.score}/20`);
  console.log(`  Has central image: ${lit.extendedMetaphor.hasCentralImage}`);
  console.log(`  Sustained: ${lit.extendedMetaphor.sustainedThroughout}`);

  console.log(`\nStructural Innovation: ${lit.structuralInnovation.score}/20`);
  console.log(`  Techniques:`, lit.structuralInnovation.techniquesUsed);

  console.log(`\nSensory Immersion: ${lit.sensoryImmersion.score}/15`);
  console.log(`  Senses used: ${lit.sensoryImmersion.sensesUsed}`);

  console.log(`\nStrengths (${lit.strengths.length}):`);
  lit.strengths.slice(0, 5).forEach(s => console.log(`  ✓ ${s}`));

  console.log(`\nGaps (${lit.gaps.length}):`);
  lit.gaps.slice(0, 5).forEach(g => console.log(`  • ${g}`));
}

main().catch(console.error);
