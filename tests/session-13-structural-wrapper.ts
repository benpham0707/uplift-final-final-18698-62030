/**
 * Session 13: Structural Innovation Wrapper Test
 *
 * Changes:
 * - Moved Structural Innovation to Priority 1 (when critically low < 5)
 * - Created simpler, clearer wrapper for adding time markers
 * - Should activate on iteration 2 since Session 12 had 0/15 structural
 *
 * Expected: Literary should improve from ~52 to ~62-65 (+10-13 pts)
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 13: STRUCTURAL INNOVATION WRAPPER TEST');
  console.log('Priority 1 Wrapper for Biggest Literary Gap');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 HYPOTHESIS:');
  console.log('  Structural Innovation wrapper will activate (score was 0/15)');
  console.log('  Adding time markers should boost Literary by +5-10 points');
  console.log('  This addresses the BIGGEST gap in Literary scoring\n');

  console.log('📊 SESSION 12 BASELINE:');
  console.log('  Combined: 67/100');
  console.log('  Elite: 76/100');
  console.log('  Literary: 52/100 ⚠️');
  console.log('    - Extended Metaphor: 20/20 ✅');
  console.log('    - Structural Innovation: 0/15 ❌ (BIGGEST GAP)');
  console.log('    - Rhythmic Prose: 12/15 ✅');
  console.log('    - Sensory: 13.5/15 ✅\n');

  console.log('🎯 EXPECTED RESULT:');
  console.log('  Wrapper activates on iteration 2');
  console.log('  Adds nonlinear time markers');
  console.log('  Literary: 52 → 60-65 (+8-13 pts)');
  console.log('  Combined: 67 → 72-75 (+5-8 pts)\n');

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
  console.log('SESSION 13 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 75 ? '🎯 Excellent!' : result.combinedScore >= 70 ? '✅ Good!' : result.combinedScore >= 67 ? '📈 Progress' : '📊 Typical'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100`);
  console.log(`  Literary: ${result.literarySophisticationScore}/100 ${result.literarySophisticationScore >= 60 ? '✅' : '⚠️'}\n`);

  console.log(`⏱️  TIME: ${duration}s`);
  console.log(`🔄 ITERATIONS: ${result.iterationHistory.length}`);
  console.log(`💰 COST: $${(result.iterationHistory.length * 0.011).toFixed(3)}\n`);

  console.log('📈 ITERATION TRAJECTORY:');
  result.iterationHistory.forEach((iter, i) => {
    const change = i > 0 ? iter.combinedScore - result.iterationHistory[i - 1].combinedScore : 0;
    const marker = iter.combinedScore === result.combinedScore ? ' ← FINAL' : '';
    console.log(`  ${i + 1}. ${iter.combinedScore}/100 ${i > 0 ? (change >= 0 ? `(+${change})` : `(${change})`) : '(initial)'}${marker}`);
  });

  console.log('\n📊 vs SESSION 12:');
  const session12 = { combined: 67, elite: 76, literary: 52 };
  console.log(`  Session 12: ${session12.combined}/100 (Elite ${session12.elite}, Literary ${session12.literary})`);
  console.log(`  Session 13: ${result.combinedScore}/100 (Elite ${result.elitePatternsScore}, Literary ${result.literarySophisticationScore})`);

  const combinedDiff = result.combinedScore - session12.combined;
  const literaryDiff = result.literarySophisticationScore - session12.literary;

  if (literaryDiff >= 8) {
    console.log(`\n🎉 MAJOR LITERARY IMPROVEMENT! +${literaryDiff} points`);
  } else if (literaryDiff >= 5) {
    console.log(`\n✅ SIGNIFICANT LITERARY IMPROVEMENT! +${literaryDiff} points`);
  } else if (literaryDiff > 0) {
    console.log(`\n📈 Literary improved: +${literaryDiff} points`);
  } else {
    console.log(`\n⚠️  Literary: ${literaryDiff} points (wrapper may not have activated)`);
  }

  if (combinedDiff >= 5) {
    console.log(`   Combined: +${combinedDiff} points overall ✅`);
  } else if (combinedDiff > 0) {
    console.log(`   Combined: +${combinedDiff} points overall`);
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
    console.log('🎉 SESSION 13 SUCCESS! REACHED TARGET!');
  } else if (result.combinedScore >= 75) {
    console.log('🎯 SESSION 13: EXCELLENT! Structural wrapper working!');
  } else if (result.combinedScore >= 70) {
    console.log('✅ SESSION 13: SOLID PROGRESS!');
  } else if (result.combinedScore > session12.combined) {
    console.log('📈 SESSION 13: IMPROVED OVER SESSION 12');
  } else {
    console.log('📊 SESSION 13 COMPLETE');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
