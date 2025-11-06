/**
 * Comprehensive Analysis Demo
 *
 * Demonstrates all three advanced detection systems working together:
 * 1. Authenticity Detection
 * 2. Elite Pattern Detection
 * 3. Literary Sophistication Detection
 *
 * Tests on "Umbra" essay (Dance + Robotics) - actual top admit
 */

import { analyzeAuthenticity } from '../src/core/analysis/features/authenticityDetector';
import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { analyzeLiterarySophistication } from '../src/core/analysis/features/literarySophisticationDetector';

// The famous "Umbra" essay from top university admit
const UMBRA_ESSAY = `Umbra: the innermost, darkest part of a shadow

The fifth set of chimes rings out and I press my hands against the dusty doors. My nose itches, but scratching would smudge the little black whiskers painted onto my face. I peer through the tiny crack between the cupboard doors, trying to glimpse the audience. The sixth set of chimes, my cue, begins, and I pop onto stage, the brilliant lights flooding my vision. Clara and Drosselmeyer stand to my left, and in front of me lies an endless ocean of audience. I pause a moment, taking it in, then do my best mouse scurry towards the wings. I love performing and dancing to connect with an audience. I dance to inspire others, to share my joy and passion, and because I love the rush of excitement while I'm surrounded by the stage lights.

My hands, covered in grease, hurt terribly as I help another girl with the wire crimper. We force the handles together, and our Anderson connector is finally ready. People scurry around us—several students are riveting metal, assisted by my father (for me, robotics is a family activity), while another pair, including my younger brother, works on assembling the drive train. The next room is filled with shouted Java commands and autonomous code. I'm working on a system that will focus on the reflective tape on our target, allowing the camera to align our shooting mechanism. I love the comradery in robotics, the way teams support each other even amid intense competitions. I love seeing the real world application of knowledge, and take pride in competing in front of hundreds of people. Most of all, I love spending time with my family, connecting with them in our own unique way. Back in the electrical room, I plug in my connector, and the room is filled with bright green light.`;

async function main() {
  console.log(`\n${'▓'.repeat(80)}`);
  console.log(`COMPREHENSIVE ANALYSIS DEMO: "UMBRA" ESSAY`);
  console.log(`${'▓'.repeat(80)}\n`);

  console.log(`Essay Length: ${UMBRA_ESSAY.length} characters\n`);
  console.log(`First 150 chars: "${UMBRA_ESSAY.substring(0, 150)}..."\n`);

  // =========================================================================
  // SYSTEM 1: AUTHENTICITY DETECTION
  // =========================================================================

  console.log(`${'='.repeat(80)}`);
  console.log(`SYSTEM 1: AUTHENTICITY ANALYSIS`);
  console.log(`${'='.repeat(80)}\n`);

  const authenticity = analyzeAuthenticity(UMBRA_ESSAY);

  console.log(`📊 AUTHENTICITY SCORE: ${authenticity.authenticity_score}/10`);
  console.log(`🎭 VOICE TYPE: ${authenticity.voice_type}\n`);

  console.log(`✅ AUTHENTIC SIGNALS (${authenticity.authentic_signals.length}):`);
  authenticity.authentic_signals.slice(0, 5).forEach(s => console.log(`  - ${s}`));
  if (authenticity.authentic_signals.length > 5) {
    console.log(`  ... and ${authenticity.authentic_signals.length - 5} more\n`);
  } else {
    console.log(``);
  }

  console.log(`❌ MANUFACTURED SIGNALS (${authenticity.manufactured_signals.length}):`);
  if (authenticity.manufactured_signals.length > 0) {
    authenticity.manufactured_signals.forEach(s => console.log(`  - ${s}`));
  } else {
    console.log(`  None detected ✓`);
  }

  console.log(`\n🚩 RED FLAGS: ${authenticity.red_flags.length > 0 ? authenticity.red_flags.join(', ') : 'None'}`);
  console.log(`🎯 GREEN FLAGS: ${authenticity.green_flags.length > 0 ? authenticity.green_flags.join(', ') : 'None'}\n`);

  // =========================================================================
  // SYSTEM 2: ELITE PATTERN DETECTION
  // =========================================================================

  console.log(`${'='.repeat(80)}`);
  console.log(`SYSTEM 2: ELITE PATTERN ANALYSIS`);
  console.log(`${'='.repeat(80)}\n`);

  const elitePatterns = analyzeElitePatterns(UMBRA_ESSAY);

  console.log(`🎯 TIER: ${elitePatterns.tier} (1=Harvard/Stanford, 2=Top UC, 3=UC-Competitive, 4=Weak)`);
  console.log(`📈 OVERALL SCORE: ${elitePatterns.overallScore}/100\n`);

  console.log(`📝 MICRO-TO-MACRO STRUCTURE (${elitePatterns.microToMacro.score}/10):`);
  console.log(`  ${elitePatterns.microToMacro.hasVividOpening ? '✅' : '❌'} Vivid Opening`);
  if (elitePatterns.microToMacro.openingExamples.length > 0) {
    console.log(`     Examples: ${elitePatterns.microToMacro.openingExamples.join(', ')}`);
  }
  console.log(`  ${elitePatterns.microToMacro.hasPersonalStakes ? '✅' : '❌'} Personal Stakes`);
  if (elitePatterns.microToMacro.stakeMarkers.length > 0) {
    console.log(`     Markers: ${elitePatterns.microToMacro.stakeMarkers.join(', ')}`);
  }
  console.log(`  ${elitePatterns.microToMacro.hasPhilosophicalInsight ? '✅' : '❌'} Philosophical Insight`);
  if (elitePatterns.microToMacro.insights.length > 0) {
    console.log(`     Insights: ${elitePatterns.microToMacro.insights.join(', ')}`);
  }

  console.log(`\n💔 VULNERABILITY (${elitePatterns.vulnerability.score}/10):`);
  console.log(`  Markers: ${elitePatterns.vulnerability.markers.join(', ') || 'None'}`);

  console.log(`\n💬 DIALOGUE:`);
  console.log(`  ${elitePatterns.dialogue.hasDialogue ? '✅' : '❌'} Has Dialogue (${elitePatterns.dialogue.quotes.length} quotes)`);
  console.log(`  ${elitePatterns.dialogue.hasConfrontation ? '✅' : '❌'} Has Confrontation`);

  console.log(`\n📊 QUANTIFIED IMPACT:`);
  console.log(`  ${elitePatterns.quantifiedImpact.hasMetrics ? '✅' : '❌'} Has Metrics (${elitePatterns.quantifiedImpact.metricsCount})`);
  console.log(`  ${elitePatterns.quantifiedImpact.hasHumanElement ? '✅' : '❌'} Has Human Element (${elitePatterns.quantifiedImpact.namedIndividuals.length} named)`);
  if (elitePatterns.quantifiedImpact.namedIndividuals.length > 0) {
    console.log(`     Named: ${elitePatterns.quantifiedImpact.namedIndividuals.join(', ')}`);
  }

  console.log(`\n🌍 COMMUNITY TRANSFORMATION:`);
  console.log(`  ${elitePatterns.communityTransformation.hasBeforeState ? '✅' : '❌'} Before State`);
  console.log(`  ${elitePatterns.communityTransformation.hasAfterState ? '✅' : '❌'} After State`);
  console.log(`  ${elitePatterns.communityTransformation.hasContrast ? '✅' : '❌'} Before/After Contrast`);

  console.log(`\n💪 STRENGTHS (${elitePatterns.strengths.length}):`);
  elitePatterns.strengths.forEach(s => console.log(`  ✓ ${s}`));

  console.log(`\n⚠️  GAPS (${elitePatterns.gaps.length}):`);
  elitePatterns.gaps.forEach(g => console.log(`  • ${g}`));

  // =========================================================================
  // SYSTEM 3: LITERARY SOPHISTICATION
  // =========================================================================

  console.log(`\n${'='.repeat(80)}`);
  console.log(`SYSTEM 3: LITERARY SOPHISTICATION ANALYSIS`);
  console.log(`${'='.repeat(80)}\n`);

  const literary = analyzeLiterarySophistication(UMBRA_ESSAY);

  console.log(`🎭 LITERARY TIER: ${literary.tier} (S=Elite 95-100, A=Strong 85-95, B=Good 70-85, C=Basic <70)`);
  console.log(`📈 LITERARY SCORE: ${literary.overallScore}/100\n`);

  console.log(`📖 EXTENDED METAPHOR (${literary.extendedMetaphor.score}/20):`);
  console.log(`  ${literary.extendedMetaphor.hasMetaphor ? '✅' : '❌'} Has Central Metaphor: ${literary.extendedMetaphor.centralImage || 'None'}`);
  console.log(`  ${literary.extendedMetaphor.sustained ? '✅' : '❌'} Sustained Throughout`);

  console.log(`\n🏗️  STRUCTURAL INNOVATION (${literary.structuralInnovation.score}/20):`);
  if (literary.structuralInnovation.innovations.length > 0) {
    console.log(`  Innovations: ${literary.structuralInnovation.innovations.join(', ')}`);
  } else {
    console.log(`  No innovations detected`);
  }

  console.log(`\n🎵 RHYTHMIC PROSE (${literary.rhythmicProse.score}/15):`);
  console.log(`  ${literary.rhythmicProse.hasVariety ? '✅' : '❌'} Sentence Variety`);
  console.log(`  Short sentences (≤4 words): ${literary.rhythmicProse.shortSentences}`);
  console.log(`  Long sentences (≥25 words): ${literary.rhythmicProse.longSentences}`);
  console.log(`  ${literary.rhythmicProse.hasParallelism ? '✅' : '❌'} Parallel Structure`);

  console.log(`\n👃 SENSORY IMMERSION (${literary.sensoryImmersion.score}/15):`);
  console.log(`  ${literary.sensoryImmersion.diverseSenses ? '✅' : '❌'} Diverse Senses (3+)`);
  console.log(`  Senses used:`);
  Object.entries(literary.sensoryImmersion.senses).forEach(([sense, count]) => {
    if (count > 0) {
      console.log(`    - ${sense}: ${count} references`);
    }
  });

  console.log(`\n🗣️  AUTHENTIC VOICE (${literary.authenticVoice.score}/15):`);
  console.log(`  ${literary.authenticVoice.hasParentheticals ? '✅' : '❌'} Parenthetical Asides`);
  console.log(`  ${literary.authenticVoice.hasGenZVernacular ? '✅' : '❌'} Contemporary Vernacular`);
  console.log(`  Markers: ${literary.authenticVoice.conversationalMarkers.join(', ') || 'None'}`);

  console.log(`\n🎭 PERSPECTIVE SHIFT (${literary.perspectiveShift.score}/10):`);
  console.log(`  ${literary.perspectiveShift.hasShift ? '✅' : '❌'} Has Shift: ${literary.perspectiveShift.shiftType || 'None'}`);

  console.log(`\n💔 STRATEGIC VULNERABILITY (${literary.strategicVulnerability.score}/15):`);
  console.log(`  ${literary.strategicVulnerability.placedAtEnd ? '✅' : '❌'} Placed at End for Impact`);
  console.log(`  ${literary.strategicVulnerability.subvertsExpectation ? '✅' : '❌'} Subverts Expectation`);

  console.log(`\n💪 LITERARY STRENGTHS (${literary.strengths.length}):`);
  literary.strengths.forEach(s => console.log(`  ✓ ${s}`));

  console.log(`\n📈 SUGGESTED IMPROVEMENTS (${literary.improvements.length}):`);
  literary.improvements.forEach(i => console.log(`  → ${i}`));

  // =========================================================================
  // COMBINED ASSESSMENT
  // =========================================================================

  console.log(`\n${'='.repeat(80)}`);
  console.log(`COMBINED ASSESSMENT`);
  console.log(`${'='.repeat(80)}\n`);

  const combinedScore = Math.round(
    (authenticity.authenticity_score / 10) * 20 +
    (elitePatterns.overallScore / 100) * 40 +
    (literary.overallScore / 100) * 40
  );

  console.log(`🎯 COMBINED EXCELLENCE SCORE: ${combinedScore}/100\n`);

  console.log(`BREAKDOWN:`);
  console.log(`  Authenticity:           ${authenticity.authenticity_score}/10  → ${Math.round((authenticity.authenticity_score / 10) * 20)}/20 points`);
  console.log(`  Elite Patterns:         ${elitePatterns.overallScore}/100 → ${Math.round((elitePatterns.overallScore / 100) * 40)}/40 points`);
  console.log(`  Literary Sophistication: ${literary.overallScore}/100 → ${Math.round((literary.overallScore / 100) * 40)}/40 points\n`);

  let finalTier: string;
  if (combinedScore >= 90) finalTier = 'TIER S - ELITE (Harvard/Stanford/MIT)';
  else if (combinedScore >= 80) finalTier = 'TIER A - EXCEPTIONAL (Top Ivy/UC Berkeley)';
  else if (combinedScore >= 70) finalTier = 'TIER B - STRONG (UCLA/Top UCs)';
  else if (combinedScore >= 60) finalTier = 'TIER C - GOOD (UC-Competitive)';
  else finalTier = 'TIER D - NEEDS IMPROVEMENT';

  console.log(`📊 FINAL ASSESSMENT: ${finalTier}\n`);

  console.log(`${'▓'.repeat(80)}\n`);
}

main().catch(console.error);
