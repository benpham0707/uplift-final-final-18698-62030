/**
 * Session 6: Hybrid Approach Test
 * Full prompts with gap-priority sections
 * Goal: Beat Session 4's 70/100 and reach 75-80/100
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 6: HYBRID APPROACH TEST');
  console.log('Full Prompts + Gap-Priority Sections');
  console.log('='.repeat(80) + '\n');

  console.log('📊 COMPARISON:');
  console.log('  Session 4: Full prompts only → 70/100 (baseline)');
  console.log('  Session 5: Targeted surgical → 55/100 (failed)');
  console.log('  Session 6: Hybrid approach → ? (testing now)\n');

  // Same robotics profile from Session 4-5
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
      '5 new programmers learned collaborative debugging',
      'Workshop culture transformed from territorial to collaborative',
    ],

    targetTier: 1,
    literaryTechniques: ['extendedMetaphor', 'dualScene'], // Focus on achievable techniques
    avoidClichés: true,
  };

  console.log('🎯 HYBRID APPROACH:');
  console.log('  ✅ Full prompts (maintains quality)');
  console.log('  ✅ Gap-priority sections (focuses improvements)');
  console.log('  ✅ Top 3 gaps highlighted each iteration');
  console.log('  ✅ Token cost: ~1,200-1,400 per iteration (vs 1,400 full, 250 targeted)\n');

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    10, // max iterations
    85  // target score
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 6 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 FINAL SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET!' : result.combinedScore >= 75 ? '🎯 Excellent!' : result.combinedScore >= 70 ? '✅ Good' : '⚠️  Below Session 4'}`);
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

  console.log('\n📊 COMPARISON TO PREVIOUS SESSIONS:');
  console.log(`  Session 4 (full prompts): 70/100`);
  console.log(`  Session 5 (targeted): 55/100`);
  console.log(`  Session 6 (hybrid): ${result.combinedScore}/100`);

  const improvement = result.combinedScore - 70;
  if (improvement > 0) {
    console.log(`\n🎉 IMPROVEMENT: +${improvement} points over Session 4!`);
  } else if (improvement === 0) {
    console.log(`\n✅ MATCHED Session 4 baseline (70/100)`);
  } else {
    console.log(`\n⚠️  REGRESSION: ${improvement} points vs Session 4`);
  }

  console.log('\n📝 FINAL ESSAY:\n');
  console.log(result.essay);

  console.log('\n\n✅ STRENGTHS:');
  result.strengths.slice(0, 8).forEach(s => console.log(`  ✓ ${s}`));

  if (result.gaps.length > 0) {
    console.log('\n⚠️  REMAINING GAPS:');
    result.gaps.slice(0, 5).forEach(g => console.log(`  • ${g}`));
  }

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 6 TEST COMPLETE');
  console.log('='.repeat(80));
}

main().catch(console.error);
