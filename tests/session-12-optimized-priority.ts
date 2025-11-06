/**
 * Session 12: Optimized Priority Test
 *
 * Changes from Session 11:
 * - Reordered prompt by actual impact (Elite Patterns first)
 * - Clearer emphasis on highest-impact factors
 * - Streamlined language for clarity
 *
 * Expected: Should maintain 63-65/100 performance or improve
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 12: OPTIMIZED PRIORITY PROMPTING');
  console.log('Emphasis Aligned to Actual Impact');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 WHAT CHANGED:');
  console.log('  ✅ Reordered by impact: Elite Patterns → Literary → Voice');
  console.log('  ✅ Clearer emphasis on Universal Insight (20pts)');
  console.log('  ✅ Streamlined language, removed redundancy');
  console.log('  ✅ Priority checklist at end\n');

  console.log('📊 SESSION 11 BASELINE:');
  console.log('  Mean: 63.3/100');
  console.log('  Variance: σ=1.2 (very stable)');
  console.log('  Elite: 71/100, Literary: 51/100, Auth: 7.3/10\n');

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
  console.log('SESSION 12 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET!' : result.combinedScore >= 70 ? '🎯 Excellent!' : result.combinedScore >= 65 ? '✅ Good' : '📊 Typical'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100`);
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

  console.log('\n📊 vs SESSION 11:');
  const session11Mean = 63.3;
  console.log(`  Session 11: ${session11Mean}/100 (Elite 71/100, Literary 51/100)`);
  console.log(`  Session 12: ${result.combinedScore}/100 (Elite ${result.elitePatternsScore}/100, Literary ${result.literarySophisticationScore}/100)`);

  const improvement = result.combinedScore - session11Mean;
  if (improvement >= 5) {
    console.log(`\n✅ IMPROVED! +${improvement.toFixed(1)} points`);
  } else if (improvement >= 0) {
    console.log(`\n📈 Slight improvement: +${improvement.toFixed(1)} points`);
  } else if (improvement >= -2) {
    console.log(`\n📊 Maintained performance (${improvement.toFixed(1)} pts)`);
  } else {
    console.log(`\n⚠️  Regression: ${improvement.toFixed(1)} points`);
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
    console.log('🎉 SESSION 12 SUCCESS! REACHED TARGET!');
  } else if (result.combinedScore >= 70) {
    console.log('🎯 SESSION 12: EXCELLENT PERFORMANCE!');
  } else if (result.combinedScore >= session11Mean) {
    console.log('✅ SESSION 12: MAINTAINED/IMPROVED BASELINE');
  } else {
    console.log('📊 SESSION 12 COMPLETE');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
