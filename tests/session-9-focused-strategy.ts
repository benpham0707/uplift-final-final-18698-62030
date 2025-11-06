/**
 * Session 9: Focused Strategy Test
 *
 * NEW HYPOTHESIS: We're getting low scores because we're trying to implement
 * too many things at once (dual-scene + extended metaphor + perspective shift + etc.)
 *
 * NEW APPROACH: Focus on 1-2 CORE high-impact strategies and do them REALLY well.
 *
 * Based on validation findings:
 * - Extended Metaphor: Consistently scores 20/20 ✅ (HIGH IMPACT)
 * - Sensory Immersion: Consistently scores 15/15 ✅ (HIGH IMPACT)
 * - Universal Insight: Critical but hard (CORE CHALLENGE)
 * - Perspective Shift: 0% success rate ❌ (DROP THIS)
 *
 * Goal: Test if focusing on ONE core technique + essential elements
 * achieves better results than spreading across multiple techniques.
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 9: FOCUSED STRATEGY TEST');
  console.log('One Core Technique Done Excellently > Many Done Poorly');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 STRATEGIC SHIFT:');
  console.log('  ❌ OLD: Try to implement everything (dual-scene + metaphor + perspective shift)');
  console.log('  ✅ NEW: Focus on ONE core technique + essential elements');
  console.log('  📊 HYPOTHESIS: Focused approach breaks through 62-65/100 ceiling\n');

  console.log('🎨 CORE TECHNIQUE SELECTED: Extended Metaphor');
  console.log('  WHY: Consistently scores 20/20 across all sessions');
  console.log('  HOW: Weave throughout entire essay, not forced');
  console.log('  PLUS: Vulnerability, Universal Insight, Community Impact\n');

  console.log('🚫 TECHNIQUES DROPPED:');
  console.log('  ✗ Perspective shift (0% success rate across 20+ attempts)');
  console.log('  ✗ Dual-scene (sometimes works but adds complexity)');
  console.log('  ✗ Nonlinear time (moderate success but not core impact)\n');

  console.log('📊 COMPARISON TO SESSION 8:');
  console.log('  Session 8 (intelligent prompting): 62/100');
  console.log('  Session 9 (focused strategy): ? 🎯\n');

  const profile: GenerationProfile = {
    studentVoice: 'quirky',
    riskTolerance: 'high',
    academicStrength: 'strong',

    activityType: 'academic',
    role: 'Robotics Team Lead - Vision Systems',
    duration: 'September 2022 – Present',
    hoursPerWeek: 15,

    achievements: [
      'Developed autonomous vision system from scratch',
      'Robot qualified for regionals with 94% target detection',
      'Team placed 3rd out of 47 teams',
    ],

    challenges: [
      'Robot failed all tests 3 days before competition',
      'Vision system had critical bug (decimal point error)',
      'Team was siloed - specialists guarding their domains',
    ],

    relationships: ['Dad (mentor)', 'Sarah (mechanical lead)', 'Jake (new programmer)'],

    impact: [
      'Robot performed perfectly at competition',
      'Created 23-page debugging guide for future years',
      '8 new programmers learned collaborative debugging',
      'Workshop culture transformed from territorial to collaborative',
      'Methodology spread to 18 other teams at regionals',
    ],

    targetTier: 1,
    literaryTechniques: ['extendedMetaphor'], // ONLY ONE! Focus on doing it excellently
    avoidClichés: true,
  };

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    15, // Max iterations
    85  // Target score - keep high goals!
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 9 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 FINAL SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET REACHED!' : result.combinedScore >= 75 ? '🎯 Excellent!' : result.combinedScore >= 65 ? '✅ Good progress' : '⚠️  Needs work'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100`);
  console.log(`  Literary: ${result.literarySophisticationScore}/100\n`);

  console.log(`⏱️  TIME: ${duration}s`);
  console.log(`🔄 ITERATIONS: ${result.iterationHistory.length}`);
  console.log(`💰 ESTIMATED COST: $${(result.iterationHistory.length * 0.011).toFixed(3)}\n`);

  console.log('📈 ITERATION TRAJECTORY:');
  result.iterationHistory.forEach((iter, i) => {
    const change = i > 0 ? iter.combinedScore - result.iterationHistory[i - 1].combinedScore : 0;
    const marker = iter.combinedScore === result.combinedScore ? ' ← FINAL' : '';
    console.log(`  ${i + 1}. ${iter.combinedScore}/100 ${i > 0 ? (change >= 0 ? `(+${change})` : `(${change})`) : '(initial)'}${marker}`);
  });

  // Compare to all previous approaches
  console.log('\n📊 FOCUSED vs SPREAD-THIN COMPARISON:');
  console.log(`  Session 4 (clean prompts): 70/100`);
  console.log(`  Session 5 (surgical): 55/100`);
  console.log(`  Session 6 (hybrid): 61/100`);
  console.log(`  Session 7 (clean + fixes): 56/100`);
  console.log(`  Session 8 (intelligent): 62/100`);
  console.log(`  Session 9 (focused strategy): ${result.combinedScore}/100`);

  const session8Score = 62;
  const improvement = result.combinedScore - session8Score;

  if (improvement >= 10) {
    console.log(`\n🎉 BREAKTHROUGH! +${improvement} points over Session 8!`);
    console.log(`   Focused strategy validated: doing ONE thing excellently > many things poorly`);
  } else if (improvement >= 5) {
    console.log(`\n✅ SIGNIFICANT IMPROVEMENT: +${improvement} points over Session 8`);
    console.log(`   Focused strategy shows promise!`);
  } else if (improvement > 0) {
    console.log(`\n📈 Slight improvement: +${improvement} points over Session 8`);
  } else if (improvement === 0) {
    console.log(`\n⚠️  Same score as Session 8 (${session8Score}/100)`);
  } else {
    console.log(`\n⚠️  Regression: ${improvement} points vs Session 8`);
  }

  console.log('\n📝 FINAL ESSAY:\n');
  console.log(result.essay);

  console.log('\n\n✅ STRENGTHS:');
  result.strengths.slice(0, 12).forEach(s => console.log(`  ✓ ${s}`));

  if (result.gaps.length > 0) {
    console.log('\n⚠️  REMAINING GAPS:');
    result.gaps.slice(0, 8).forEach(g => console.log(`  • ${g}`));
  }

  console.log('\n' + '='.repeat(80));
  if (result.combinedScore >= 85) {
    console.log('🎉🎉🎉 SESSION 9 SUCCESS! REACHED 85+ TARGET! 🎉🎉🎉');
  } else if (result.combinedScore >= 75) {
    console.log('🎯 SESSION 9: EXCELLENT PROGRESS! Focused strategy working!');
  } else if (result.combinedScore >= 70) {
    console.log('✅ SESSION 9: SOLID IMPROVEMENT. Focused approach shows merit.');
  } else if (result.combinedScore > session8Score) {
    console.log('📈 SESSION 9: INCREMENTAL PROGRESS. Strategy has potential.');
  } else {
    console.log('📊 SESSION 9 COMPLETE. Analyzing focused strategy results...');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
