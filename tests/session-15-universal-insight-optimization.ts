/**
 * Session 15: Universal Insight Optimization Test
 *
 * Session 14 Results: 71/100 (Elite 84, Literary 62)
 * - Structural Innovation wrapper worked! (+10 pts to Literary)
 * - Universal Insight identified as next target (10/20 → need 18+)
 *
 * This session tests the optimized Universal Insight wrapper
 * Expected: Elite Patterns should improve from 84 → 90+
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 15: UNIVERSAL INSIGHT OPTIMIZATION TEST');
  console.log('Testing improved wrapper guidance for philosophical depth');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SESSION 14 BASELINE:');
  console.log('  Combined: 71/100');
  console.log('  Elite: 84/100');
  console.log('  Literary: 62/100');
  console.log('  Universal Insight: ~10/20 ⚠️\n');

  console.log('✅ WRAPPER IMPROVEMENTS:');
  console.log('  1. Added TEST: "Is this true about LIFE or just my activity?"');
  console.log('  2. Concrete examples: Activity-specific (10/20) vs Universal (18/20)');
  console.log('  3. Pattern recognition: "Now I see this everywhere..."');
  console.log('  4. Philosophy emphasis: "The truth is Y" not "I learned X"\n');

  console.log('🎯 EXPECTED RESULTS:');
  console.log('  Universal Insight: 10 → 15-18 (+5-8 pts)');
  console.log('  Elite Patterns: 84 → 90-92 (+6-8 pts)');
  console.log('  Combined: 71 → 74-76 (+3-5 pts)\n');

  console.log('🔄 TESTING STRATEGY:');
  console.log('  • Same profile as Session 14 (for comparison)');
  console.log('  • Universal Insight wrapper should activate');
  console.log('  • Look for philosophical depth in final paragraphs');
  console.log('  • Validate that other scores remain stable\n');

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
    literaryTechniques: ['extendedMetaphor'], // Focused approach
    avoidClichés: true,
  };

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    15,
    85
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 15 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 75 ? '🎯 Excellent!' : result.combinedScore >= 72 ? '✅ Great!' : result.combinedScore >= 71 ? '📈 Progress' : '📊 Testing'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100 ${result.elitePatternsScore >= 90 ? '🎉 TARGET!' : result.elitePatternsScore >= 85 ? '✅' : '📊'}`);
  console.log(`  Literary: ${result.literarySophisticationScore}/100\n`);

  console.log(`⏱️  TIME: ${duration}s`);
  console.log(`🔄 ITERATIONS: ${result.iterationHistory.length}`);
  console.log(`💰 COST: $${(result.iterationHistory.length * 0.011).toFixed(3)}\n`);

  console.log('📈 ITERATION TRAJECTORY:');
  result.iterationHistory.forEach((iter, i) => {
    const change = i > 0 ? iter.combinedScore - result.iterationHistory[i - 1].combinedScore : 0;
    const marker = iter.combinedScore === result.combinedScore ? ' ← FINAL' : '';
    console.log(`  ${i + 1}. ${iter.combinedScore}/100 ${i > 0 ? (change >= 0 ? `(+${change})` : `(${change})`) : '(initial)'}${marker}`);
  });

  console.log('\n📊 vs SESSION 14:');
  const session14 = { combined: 71, elite: 84, literary: 62 };
  console.log(`  Session 14: ${session14.combined}/100 (Elite ${session14.elite}, Literary ${session14.literary})`);
  console.log(`  Session 15: ${result.combinedScore}/100 (Elite ${result.elitePatternsScore}, Literary ${result.literarySophisticationScore})`);

  const combinedDiff = result.combinedScore - session14.combined;
  const eliteDiff = result.elitePatternsScore - session14.elite;
  const literaryDiff = result.literarySophisticationScore - session14.literary;

  console.log('\n📊 CHANGES:');
  console.log(`  Combined: ${combinedDiff >= 0 ? '+' : ''}${combinedDiff} points ${combinedDiff >= 3 ? '✅ Significant!' : combinedDiff > 0 ? '📈 Improved' : combinedDiff === 0 ? '📊 Stable' : '⚠️ Regressed'}`);
  console.log(`  Elite: ${eliteDiff >= 0 ? '+' : ''}${eliteDiff} points ${eliteDiff >= 6 ? '🎉 SUCCESS!' : eliteDiff >= 3 ? '✅ Good!' : eliteDiff > 0 ? '📈 Progress' : eliteDiff === 0 ? '📊 Stable' : '⚠️ Down'}`);
  console.log(`  Literary: ${literaryDiff >= 0 ? '+' : ''}${literaryDiff} points ${literaryDiff > 0 ? '✅' : literaryDiff === 0 ? '📊 Stable' : '⚠️ Down'}`);

  if (eliteDiff >= 6) {
    console.log('\n🎉 UNIVERSAL INSIGHT WRAPPER WORKING!');
    console.log('   Elite Patterns improved significantly');
  } else if (eliteDiff >= 3) {
    console.log('\n✅ Universal Insight wrapper showing improvement');
  } else if (eliteDiff < 0) {
    console.log('\n⚠️  Elite Patterns regressed - needs debugging');
  } else {
    console.log('\n📊 Stable scores - may need more emphasis or different approach');
  }

  console.log('\n📝 FINAL ESSAY:\n');
  console.log(result.essay);

  console.log('\n\n✅ STRENGTHS:');
  result.strengths.slice(0, 10).forEach(s => console.log(`  ✓ ${s}`));

  if (result.gaps.length > 0) {
    console.log('\n⚠️  REMAINING GAPS:');
    result.gaps.slice(0, 6).forEach(g => console.log(`  • ${g}`));
  }

  console.log('\n' + '='.repeat(80));
  if (result.combinedScore >= 85) {
    console.log('🎉 SESSION 15 SUCCESS! REACHED 85+ TARGET!');
  } else if (result.combinedScore >= 75) {
    console.log('🎯 SESSION 15: EXCELLENT PROGRESS!');
  } else if (result.combinedScore > session14.combined) {
    console.log('✅ SESSION 15: IMPROVED OVER SESSION 14');
  } else if (result.combinedScore === session14.combined) {
    console.log('📊 SESSION 15: STABLE (Same as Session 14)');
  } else {
    console.log('📊 SESSION 15 COMPLETE');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
