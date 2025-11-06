/**
 * Session 16: Quantified Impact + Human Element Optimization
 *
 * Session 15 Results: 79/100 (Elite 88, Literary 70)
 * - Universal Insight improved (+8 combined)
 * - Gap identified: "Has metrics but missing human element"
 *
 * This session tests the enhanced Community Transformation wrapper
 * Expected: Elite Patterns 88 → 92-94, Combined 79 → 82-85 (TARGET!)
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 16: QUANTIFIED IMPACT + HUMAN ELEMENT OPTIMIZATION');
  console.log('Adding full names + personal stories to reach 85/100 target');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SESSION 15 BASELINE:');
  console.log('  Combined: 79/100');
  console.log('  Elite: 88/100');
  console.log('  Literary: 70/100');
  console.log('  Gap: "Has metrics but missing human element" ⚠️\n');

  console.log('✅ WRAPPER IMPROVEMENTS:');
  console.log('  1. CRITICAL: USE FULL NAMES (First + Last)');
  console.log('  2. Each person needs: Name + Context + Transformation');
  console.log('  3. FORMULA: Numbers + Names + Personal Stakes');
  console.log('  4. Example: "Sarah Chen, senior mechanical lead..."');
  console.log('  5. Example: "Jake Martinez, overwhelmed freshman..."\n');

  console.log('🎯 EXPECTED RESULTS:');
  console.log('  Quantified Impact: Add "Human Element" component');
  console.log('  Elite Patterns: 88 → 92-94 (+4-6 pts)');
  console.log('  Combined: 79 → 82-85 (+3-6 pts)');
  console.log('  🎯 REACHES 85/100 TARGET!\n');

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
  console.log('SESSION 16 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET REACHED!' : result.combinedScore >= 82 ? '🎯 Almost there!' : result.combinedScore >= 79 ? '📈 Progress' : '📊 Testing'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100 ${result.elitePatternsScore >= 92 ? '🎉 Excellent!' : result.elitePatternsScore >= 88 ? '✅ Good' : '📊'}`);
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

  console.log('\n📊 vs SESSION 15:');
  const session15 = { combined: 79, elite: 88, literary: 70 };
  console.log(`  Session 15: ${session15.combined}/100 (Elite ${session15.elite}, Literary ${session15.literary})`);
  console.log(`  Session 16: ${result.combinedScore}/100 (Elite ${result.elitePatternsScore}, Literary ${result.literarySophisticationScore})`);

  const combinedDiff = result.combinedScore - session15.combined;
  const eliteDiff = result.elitePatternsScore - session15.elite;
  const literaryDiff = result.literarySophisticationScore - session15.literary;

  console.log('\n📊 CHANGES:');
  console.log(`  Combined: ${combinedDiff >= 0 ? '+' : ''}${combinedDiff} points ${combinedDiff >= 6 ? '🎉 TARGET!' : combinedDiff >= 3 ? '✅ Significant!' : combinedDiff > 0 ? '📈 Improved' : combinedDiff === 0 ? '📊 Stable' : '⚠️ Regressed'}`);
  console.log(`  Elite: ${eliteDiff >= 0 ? '+' : ''}${eliteDiff} points ${eliteDiff >= 4 ? '🎉 Excellent!' : eliteDiff >= 2 ? '✅ Good!' : eliteDiff > 0 ? '📈 Progress' : eliteDiff === 0 ? '📊 Stable' : '⚠️ Down'}`);
  console.log(`  Literary: ${literaryDiff >= 0 ? '+' : ''}${literaryDiff} points ${literaryDiff > 0 ? '✅' : literaryDiff === 0 ? '📊 Stable' : '⚠️ Down'}`);

  if (result.combinedScore >= 85) {
    console.log('\n🎉🎉🎉 TARGET REACHED! 85/100 ACHIEVED! 🎉🎉🎉');
    console.log('   Human Element wrapper successfully added the missing piece!');
  } else if (combinedDiff >= 3) {
    console.log('\n✅ Significant improvement! Human Element wrapper working!');
  } else if (combinedDiff < 0) {
    console.log('\n⚠️  Regressed - needs debugging');
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

  console.log('PROGRESSION:');
  console.log('  Session 11: 63.3/100 (baseline, lean prompt, σ=1.2)');
  console.log('  Session 12: 67/100 (+4) - Optimized priority');
  console.log('  Session 13: 57/100 (-10) - Failed structural wrapper');
  console.log('  Session 14: 71/100 (+4) - Fixed structural wrapper ✅');
  console.log('  Session 15: 79/100 (+8) - Universal insight wrapper ✅');
  console.log(`  Session 16: ${result.combinedScore}/100 (${combinedDiff >= 0 ? '+' : ''}${combinedDiff}) - Human element wrapper ${result.combinedScore >= 85 ? '🎯 TARGET!' : combinedDiff >= 3 ? '✅' : '📊'}\n`);

  console.log('TOTAL IMPROVEMENT: 63.3 → ' + result.combinedScore + ' = +' + (result.combinedScore - 63.3).toFixed(1) + ' points\n');

  console.log('=' .repeat(80));
  if (result.combinedScore >= 85) {
    console.log('🎉🎉🎉 SESSION 16: TARGET REACHED! 85/100 ACHIEVED! 🎉🎉🎉');
  } else if (result.combinedScore >= 82) {
    console.log('🎯 SESSION 16: ALMOST THERE! One more optimization!');
  } else if (result.combinedScore > session15.combined) {
    console.log('✅ SESSION 16: IMPROVED! Optimization loop working!');
  } else {
    console.log('📊 SESSION 16 COMPLETE');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
