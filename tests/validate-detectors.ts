/**
 * Detector Validation Test
 *
 * Tests our detectors against known high-quality essays to ensure
 * they're scoring accurately and not too strict.
 */

import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';
import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { analyzeAuthenticity } from '../src/core/analysis/features/authenticityDetector';

// ============================================================================
// REFERENCE ESSAY 1: "The Decimal Point Mutiny" (from Session 6)
// This scored 61/100 - let's see what it gets now
// ============================================================================

const decimalPointEssay = `**SCENE ONE: The Breakdown**
Three days before regionals, our robot stared at targets like a confused tourist reading street signs—missing every single one. The workshop had become a cacophony of frustrated voices, twelve programmers playing different songs while our mechanical and electrical teams guarded their domains like territorial musicians protecting sheet music. "This is hopeless," I whispered to Dad, watching another failed test run. My hands trembled against the cold aluminum frame. "Every bug you fix creates harmony somewhere else in the system," he said quietly, adjusting his glasses. "But right now, you're all playing solo." He was right—our vision system had a decimal point error that turned precision into chaos, Sarah wouldn't make eye contact when I asked about mechanical specs, and Jake sat isolated in the corner, afraid to touch code he didn't write. The air buzzed with tension, keyboards clicking discordantly, motors whirring in broken rhythms. Silence.

**SCENE TWO: The Symphony**
Fast-forward: two hours before competition, same workshop, different music. Instead of debugging alone, I started narrating my process aloud: "Decimal error in line 847 is throwing off calibration by factor of ten." Jake's head snapped up. "Wait, could that explain the servo jitter?" Suddenly Sarah was leaning over my shoulder, pointing at the screen. "If vision is off by ten, no wonder my mechanical adjustments felt wrong." The conversation became a symphony—each specialist adding their instrument to a collaborative melody. Our robot nailed every target that morning. Perfect harmony. The same grease-stained hands that had shaken with frustration now moved with confident precision, the same voices that had clashed now harmonized across disciplines.

The real transformation echoed beyond our team. Before: our regional hosted forty-seven teams working in traditional silos, mechanical specialists hoarding knowledge like sheet music locked in vaults, programmers speaking only in code while vision experts played solo concerts to empty halls. After our methodology spread: eighteen teams adopted collaborative debugging workshops, transforming the regional competition into an unprecedented symphony of cross-discipline knowledge sharing, and Jake now confidently conducts vision sessions where mechanical students learn our language while teaching us theirs. That 23-page debugging guide became our conductor's score, teaching eight new programmers to narrate their thinking across disciplines, turning territorial workshops into collaborative orchestras. The breakthrough wasn't technical—it was profoundly human. Every field has brilliant soloists playing sophisticated melodies, but expertise without translation becomes mere noise echoing in empty concert halls. True progress isn't about individual genius; it's about someone willing to step up as conductor, building bridges between different forms of brilliance, transforming isolated excellence into collective symphony that everyone can finally hear.`;

// ============================================================================
// REFERENCE ESSAY 2: Hand-crafted "ideal" essay for testing
// Should score 85+/100 if detectors are calibrated correctly
// ============================================================================

const idealEssay = `In the robotics lab, a teenager stared at broken code scrolling endlessly across cracked screens. Three days until competition. Zero working solutions. My hands literally trembled against cold aluminum as the vision system threw its 847th consecutive error.

That teenager? Me.

"This is hopeless," I whispered, voice cracking as another test failed spectacularly. Our workshop had devolved into twelve territorial islands—Sarah clutching mechanical specs like state secrets, Jake coding in terrified isolation, each specialist treating collaboration like a communicable disease. The acrid smell of overheated motors filled the stale air while keyboards clicked in hostile discord. My stomach churned watching months of work dissolve into digital chaos.

Gone. All of it.

Dad knelt beside my grease-stained setup, studying the cascading failures with quiet intensity. "Every bug creates harmony somewhere else," he said softly. "But right now, you're all playing different songs." His words hit like a tuning fork striking metal. Wrong approach entirely.

The decimal point hiding in line 847 felt microscopic yet devastating—0.01 instead of 0.1, conducting pandemonium through thousands of lines like a single musician playing the wrong key, throwing off the entire ensemble. But fixing code wasn't enough. Real transformation required something terrifying: vulnerability.

I gathered everyone around my monitor not to showcase brilliance, but to expose catastrophic failure. "Look at this mess," I said, jaw tight with embarrassment as I traced the decimal point disaster across subsystems, showing how my vision failures cascaded through motor control like missed cues destroying entire movements. Sarah's shoulders relaxed immediately. "So when I change specs, I should signal you instead of assuming you'll adapt?" Jake stopped his frantic typing. "And my optimizations—I should explain the tempo changes?"

Bingo.

The workshop's rhythm shifted from isolated clicking to synchronized harmony. Not unison—true ensemble where different instruments enhance each other. Competition morning brought our symphony to life: 94% target detection, perfect mechanical precision, third place out of 47 teams. But the real crescendo happened afterward—eight new programmers learning collaborative debugging instead of isolated struggle, our territorial culture transforming into cooperative chamber music, eighteen regional teams adopting our methodology like musicians sharing arrangements across orchestras.

Before this transformation: our workshop operated like twelve medieval fiefdoms, programmers hoarding knowledge like dragons guarding treasure, newcomers too intimidated to ask basic questions, mechanical and electrical teams communicating through suspicious glares, collaborative sessions dropping from 15 per month to zero as pride replaced curiosity. After: seventeen programmers (five brave souls drawn by our chaotic debugging energy) actively teaching each other, problem-solving sessions sounding like friendly riots, knowledge flowing freely between previously warring factions, that 23-page debugging guide becoming our team's bible for future competitions.

Months later, watching Jake confidently conduct vision workshops for newcomers who once would have coded in terrified silence, I understood something deeper than algorithms. We'd debugged more than code—we'd debugged fear itself, the kind that makes brilliant people retreat to solo performance rather than risk collaborative imperfection. Technical brilliance without translation becomes sophisticated noise. The most elegant solution means nothing if your orchestra can't hear the music you're trying to conduct together. Sometimes the smallest bugs—a misplaced decimal, a hoarded insight, a voice too proud to admit confusion—create the biggest breakthroughs when you're willing to expose them, learn from them, and build something better than any solo performance could ever achieve.`;

// ============================================================================
// TEST FUNCTION
// ============================================================================

function testEssay(name: string, essay: string, expectedScore: number) {
  console.log('\n' + '='.repeat(80));
  console.log(`TESTING: ${name}`);
  console.log(`Expected Score: ~${expectedScore}/100`);
  console.log('='.repeat(80) + '\n');

  const literary = analyzeLiterarySophistication(essay);
  const elite = analyzeElitePatterns(essay);
  const auth = analyzeAuthenticity(essay);

  // Calculate combined score (same weights as system)
  const combined = Math.round(
    auth.authenticity_score * 10 * 0.2 +
    elite.overallScore * 0.4 +
    literary.overallScore * 0.4
  );

  console.log('📊 ACTUAL SCORES:');
  console.log(`  Combined: ${combined}/100 ${combined >= expectedScore ? '✅' : '⚠️  Below expected'}`);
  console.log(`  Authenticity: ${auth.authenticity_score.toFixed(1)}/10`);
  console.log(`  Elite Patterns: ${elite.overallScore}/100`);
  console.log(`  Literary: ${literary.overallScore}/100\n`);

  console.log('📖 LITERARY BREAKDOWN:');
  console.log(`  Extended Metaphor: ${literary.extendedMetaphor.score}/20`);
  console.log(`  Sensory Immersion: ${literary.sensoryImmersion.score}/15`);
  console.log(`  Sentence Variety: ${literary.rhythmicProse.score}/15`);
  console.log(`  Structural Innovation: ${literary.structuralInnovation.score}/15`);
  console.log(`    Innovations: ${literary.structuralInnovation.innovations.join(', ') || 'none'}\n`);

  console.log('🎯 ELITE PATTERNS BREAKDOWN:');
  console.log(`  Vulnerability: ${elite.vulnerability.score}/10`);
  console.log(`  Dialogue: ${elite.dialogue.hasDialogue ? 'Yes' : 'No'} (Confrontation: ${elite.dialogue.hasConfrontation ? 'Yes' : 'No'})`);
  console.log(`  Quantified Impact: ${elite.quantifiedImpact?.hasMetrics ? 'Yes' : 'No'}`);
  console.log(`  Community Transformation: Before=${elite.communityTransformation?.hasBeforeState}, After=${elite.communityTransformation?.hasAfterState}`);
  console.log(`  Universal Insight: ${elite.microToMacro.score}/20\n`);

  console.log('✅ STRENGTHS:');
  [...literary.strengths, ...elite.strengths, ...auth.authentic_signals]
    .slice(0, 10)
    .forEach(s => console.log(`  ✓ ${s}`));

  console.log('\n⚠️  GAPS:');
  const allGaps = [
    ...(literary.gaps || []),
    ...(elite.gaps || []),
    ...(auth.red_flags || [])
  ];
  allGaps.slice(0, 10).forEach(g => console.log(`  • ${g}`));

  const gap = expectedScore - combined;
  if (gap > 10) {
    console.log(`\n🚨 SIGNIFICANT GAP: ${gap} points below expected!`);
    console.log('   Possible issues:');
    console.log('   - Detectors are too strict');
    console.log('   - Detector bugs (false negatives)');
    console.log('   - Expected score was too optimistic');
  } else if (gap > 0) {
    console.log(`\n⚠️  Minor gap: ${gap} points below expected`);
  } else {
    console.log(`\n✅ Scoring as expected or better!`);
  }

  return { combined, gap };
}

// ============================================================================
// RUN TESTS
// ============================================================================

async function main() {
  console.log('\n' + '█'.repeat(80));
  console.log('DETECTOR VALIDATION TEST');
  console.log('Testing detectors against reference essays');
  console.log('█'.repeat(80));

  const results = [];

  // Test 1: Session 6 essay (known to score 61/100)
  results.push(testEssay(
    'Reference Essay 1: "The Decimal Point Mutiny" (Session 6)',
    decimalPointEssay,
    61
  ));

  // Test 2: Hand-crafted ideal essay
  results.push(testEssay(
    'Reference Essay 2: Hand-crafted "Ideal" Essay',
    idealEssay,
    85
  ));

  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('VALIDATION SUMMARY');
  console.log('='.repeat(80) + '\n');

  const avgGap = results.reduce((sum, r) => sum + r.gap, 0) / results.length;

  console.log('📊 Results:');
  results.forEach((r, i) => {
    console.log(`  Essay ${i + 1}: ${r.combined}/100 (gap: ${r.gap > 0 ? '-' : '+'}${Math.abs(r.gap)})`);
  });

  console.log(`\nAverage gap: ${avgGap.toFixed(1)} points\n`);

  if (avgGap > 10) {
    console.log('🚨 DETECTORS ARE TOO STRICT');
    console.log('   High-quality essays scoring 10+ points below expected');
    console.log('   Recommendation: Audit detectors for bugs or overly strict thresholds\n');
  } else if (avgGap > 5) {
    console.log('⚠️  DETECTORS MAY BE SLIGHTLY STRICT');
    console.log('   Essays scoring 5-10 points below expected');
    console.log('   Recommendation: Review detector thresholds\n');
  } else {
    console.log('✅ DETECTORS APPEAR WELL-CALIBRATED');
    console.log('   Essays scoring within expected ranges\n');
  }

  console.log('='.repeat(80));
}

main().catch(console.error);
