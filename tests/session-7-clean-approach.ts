/**
 * Session 7: Back to Session 4 Clean Approach + Bug Fixes
 *
 * Learnings from Sessions 5 & 6:
 * - Surgical targeted prompts fail (Session 5: 55/100)
 * - Complex hybrid prompts fail (Session 6: 61/100)
 * - Session 4 clean approach works best (70/100)
 *
 * Improvements:
 * ✅ Fixed dual-scene detector (+8-10 points potential)
 * ✅ Reverted to clean full prompts (no complexity)
 * ✅ Increased iterations to 15 (vs Session 4's 6-7)
 *
 * Goal: 75-80/100
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 7: CLEAN APPROACH + BUG FIXES + EXTENDED ITERATIONS');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SESSION COMPARISON:');
  console.log('  Session 4: Clean prompts, 6-7 iterations → 70/100 (baseline)');
  console.log('  Session 5: Targeted surgical → 55/100 ❌');
  console.log('  Session 6: Hybrid complexity → 61/100 ❌');
  console.log('  Session 7: Session 4 approach + fixes + 15 iterations → ? ✨\n');

  console.log('🔧 IMPROVEMENTS IN SESSION 7:');
  console.log('  ✅ Fixed dual-scene detector (now detects "SCENE ONE", "SCENE TWO")');
  console.log('  ✅ Removed hybrid complexity (back to clean prompts)');
  console.log('  ✅ Increased max iterations: 15 (vs 6-7 in Session 4)');
  console.log('  ✅ Same proven 40% compression prompts from Session 4\n');

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
    literaryTechniques: ['extendedMetaphor', 'dualScene'],
    avoidClichés: true,
  };

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    15, // INCREASED: 15 vs Session 4's 6-7
    85  // target score
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 7 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 FINAL SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET!' : result.combinedScore >= 75 ? '🎯 Excellent!' : result.combinedScore >= 70 ? '✅ Match Session 4' : '⚠️  Below Session 4'}`);
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

  const session4Baseline = 70;
  const improvement = result.combinedScore - session4Baseline;

  console.log('\n📊 COMPARISON TO SESSION 4:');
  console.log(`  Session 4 baseline: ${session4Baseline}/100`);
  console.log(`  Session 7 (with fixes): ${result.combinedScore}/100`);

  if (improvement > 0) {
    console.log(`\n🎉 IMPROVEMENT: +${improvement} points over Session 4!`);
    console.log(`   Bug fixes + extended iterations = SUCCESS!`);
  } else if (improvement === 0) {
    console.log(`\n✅ MATCHED Session 4 baseline`);
    console.log(`   Bug fixes maintained quality with cleaner code`);
  } else {
    console.log(`\n⚠️  REGRESSION: ${improvement} points vs Session 4`);
  }

  console.log('\n📝 FINAL ESSAY:\n');
  console.log(result.essay);

  console.log('\n\n✅ STRENGTHS:');
  result.strengths.slice(0, 10).forEach(s => console.log(`  ✓ ${s}`));

  if (result.gaps.length > 0) {
    console.log('\n⚠️  REMAINING GAPS:');
    result.gaps.slice(0, 5).forEach(g => console.log(`  • ${g}`));
  }

  console.log('\n' + '='.repeat(80));
  if (result.combinedScore >= 75) {
    console.log('🎉 SESSION 7 SUCCESS! Clean approach + bug fixes = quality improvement!');
  } else if (result.combinedScore >= 70) {
    console.log('✅ SESSION 7 COMPLETE: Maintained Session 4 quality with cleaner implementation');
  } else {
    console.log('📊 SESSION 7 COMPLETE: More analysis needed');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
