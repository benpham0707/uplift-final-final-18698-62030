/**
 * Session 17: Conservative Parentheticals Optimization
 *
 * Session 15 Results: 79/100 (Elite 88, Literary 70, Auth 7.8)
 * Session 16 Results: 71/100 (REGRESSED - too aggressive)
 *
 * Learning: Return to S15 baseline, add LOW-RISK parentheticals only
 * Expected: Authenticity 7.8 → 8.2-8.5, Combined 79 → 80-82
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 17: CONSERVATIVE PARENTHETICALS OPTIMIZATION');
  console.log('Low-risk personality boost after Session 16 regression');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SESSION HISTORY:');
  console.log('  Session 15: 79/100 (Elite 88, Literary 70, Auth 7.8) ✅ BASELINE');
  console.log('  Session 16: 71/100 (Elite 63, Literary 72) ❌ REGRESSED\n');

  console.log('💡 LESSON LEARNED:');
  console.log('  - Community Transformation wrapper was too aggressive');
  console.log('  - Caused Elite Patterns to crash (-25 points)');
  console.log('  - Need CONSERVATIVE approach\n');

  console.log('✅ SESSION 17 STRATEGY:');
  console.log('  1. Return to Session 15 configuration');
  console.log('  2. Add ONLY parentheticals wrapper (low-risk)');
  console.log('  3. Wrapper activates if Auth 7.5-8.5 and no parentheticals');
  console.log('  4. Simple guidance: Add 2-3 parenthetical asides\n');

  console.log('🎯 EXPECTED RESULTS:');
  console.log('  Authenticity: 7.8 → 8.2-8.5 (+0.4-0.7)');
  console.log('  Combined: 79 → 80-82 (+1-3 pts)');
  console.log('  Risk: VERY LOW (doesn\'t touch Elite/Literary)');
  console.log('  Goal: Safe incremental progress toward 85/100\n');

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
    literaryTechniques: ['extendedMetaphor'],
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
  console.log('SESSION 17 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET!' : result.combinedScore >= 80 ? '🎯 Excellent!' : result.combinedScore >= 79 ? '✅ Progress' : result.combinedScore >= 75 ? '📈 Good' : '📊 Testing'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10 ${result.authenticityScore >= 8.2 ? '✅' : '📊'}`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100 ${result.elitePatternsScore >= 88 ? '✅ Stable!' : result.elitePatternsScore >= 85 ? '📊' : '⚠️'}`);
  console.log(`  Literary: ${result.literarySophisticationScore}/100 ${result.literarySophisticationScore >= 70 ? '✅ Stable!' : '📊'}\n`);

  console.log(`⏱️  TIME: ${duration}s`);
  console.log(`🔄 ITERATIONS: ${result.iterationHistory.length}`);
  console.log(`💰 COST: $${(result.iterationHistory.length * 0.011).toFixed(3)}\n`);

  console.log('📈 ITERATION TRAJECTORY:');
  result.iterationHistory.forEach((iter, i) => {
    const change = i > 0 ? iter.combinedScore - result.iterationHistory[i - 1].combinedScore : 0;
    const marker = iter.combinedScore === result.combinedScore ? ' ← FINAL' : '';
    console.log(`  ${i + 1}. ${iter.combinedScore}/100 ${i > 0 ? (change >= 0 ? `(+${change})` : `(${change})`) : '(initial)'}${marker}`);
  });

  console.log('\n📊 vs BASELINES:');
  const session15 = { combined: 79, elite: 88, literary: 70, auth: 7.8 };
  const session16 = { combined: 71, elite: 63, literary: 72, auth: 8.3 };
  console.log(`  Session 15: ${session15.combined}/100 (Elite ${session15.elite}, Literary ${session15.literary}, Auth ${session15.auth}) ← TARGET BASELINE`);
  console.log(`  Session 16: ${session16.combined}/100 (Elite ${session16.elite}, Literary ${session16.literary}, Auth ${session16.auth}) ← REGRESSED`);
  console.log(`  Session 17: ${result.combinedScore}/100 (Elite ${result.elitePatternsScore}, Literary ${result.literarySophisticationScore}, Auth ${result.authenticityScore})`);

  const combinedDiff = result.combinedScore - session15.combined;
  const eliteDiff = result.elitePatternsScore - session15.elite;
  const literaryDiff = result.literarySophisticationScore - session15.literary;
  const authDiff = result.authenticityScore - session15.auth;

  console.log('\n📊 CHANGES vs SESSION 15:');
  console.log(`  Combined: ${combinedDiff >= 0 ? '+' : ''}${combinedDiff} points ${combinedDiff >= 3 ? '🎉 Excellent!' : combinedDiff >= 1 ? '✅ Good!' : combinedDiff === 0 ? '📊 Stable' : '⚠️ Regressed'}`);
  console.log(`  Elite: ${eliteDiff >= 0 ? '+' : ''}${eliteDiff} points ${Math.abs(eliteDiff) <= 2 ? '✅ STABLE!' : eliteDiff > 0 ? '📈' : '⚠️ Down'}`);
  console.log(`  Literary: ${literaryDiff >= 0 ? '+' : ''}${literaryDiff} points ${Math.abs(literaryDiff) <= 2 ? '✅ STABLE!' : literaryDiff > 0 ? '📈' : '⚠️ Down'}`);
  console.log(`  Authenticity: ${authDiff >= 0 ? '+' : ''}${authDiff.toFixed(1)} points ${authDiff >= 0.4 ? '✅ Improved!' : authDiff > 0 ? '📈' : '📊'}`);

  if (result.combinedScore >= 85) {
    console.log('\n🎉🎉🎉 TARGET REACHED! 85/100 ACHIEVED! 🎉🎉🎉');
  } else if (result.combinedScore >= 80 && combinedDiff >= 0) {
    console.log('\n🎯 CONSERVATIVE STRATEGY WORKED! Safe progress!');
  } else if (combinedDiff >= 0 && Math.abs(eliteDiff) <= 2) {
    console.log('\n✅ SUCCESS! Improved without breaking existing scores!');
  } else if (combinedDiff < 0) {
    console.log('\n⚠️  Still regressed - may need to test variance');
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
  console.log('📊 OPTIMIZATION LOOP SUMMARY');
  console.log('='.repeat(80) + '\n');

  console.log('FULL PROGRESSION:');
  console.log('  Session 11: 63.3/100 (baseline, σ=1.2)');
  console.log('  Session 12: 67/100 (+4)');
  console.log('  Session 13: 57/100 (-10) ❌');
  console.log('  Session 14: 71/100 (+4) - Fixed structural ✅');
  console.log('  Session 15: 79/100 (+8) - Universal insight ✅');
  console.log('  Session 16: 71/100 (-8) - Too aggressive ❌');
  console.log(`  Session 17: ${result.combinedScore}/100 (${combinedDiff >= 0 ? '+' : ''}${combinedDiff}) - Conservative ${combinedDiff >= 1 ? '✅' : combinedDiff === 0 ? '📊' : '⚠️'}\n`);

  if (combinedDiff >= 0) {
    console.log('TOTAL IMPROVEMENT: 63.3 → ' + result.combinedScore + ' = +' + (result.combinedScore - 63.3).toFixed(1) + ' points\n');
  }

  console.log('KEY LEARNINGS:');
  console.log('  ✅ Structural Innovation wrapper works');
  console.log('  ✅ Universal Insight wrapper works');
  console.log('  ❌ Community Transformation too aggressive');
  console.log(`  ${combinedDiff >= 0 ? '✅' : '📊'} Parentheticals wrapper ${combinedDiff >= 1 ? 'works!' : 'testing...'}\n`);

  console.log('=' .repeat(80));
  if (result.combinedScore >= 85) {
    console.log('🎉 SESSION 17: TARGET REACHED! 85/100!');
  } else if (result.combinedScore >= 80) {
    console.log('🎯 SESSION 17: EXCELLENT! Almost at target!');
  } else if (combinedDiff >= 1) {
    console.log('✅ SESSION 17: SAFE PROGRESS! Loop working!');
  } else if (combinedDiff === 0) {
    console.log('📊 SESSION 17: STABLE (may need variance test)');
  } else {
    console.log('📊 SESSION 17 COMPLETE');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
