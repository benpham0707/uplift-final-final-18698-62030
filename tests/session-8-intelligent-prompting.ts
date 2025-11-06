/**
 * Session 8: Intelligent Dynamic Prompting
 *
 * New Approach:
 * - Full holistic prompts (maintains coherence)
 * - Dynamically emphasizes critical gaps based on analysis
 * - Targets within context, not surgical edits
 *
 * Goal: Reach 85+/100 by intelligently focusing on what's missing
 * while maintaining essay coherence
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 8: INTELLIGENT DYNAMIC PROMPTING');
  console.log('Full Holistic Prompts + Smart Emphasis');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 NEW INTELLIGENT SYSTEM:');
  console.log('  ✅ Full prompts maintain coherence');
  console.log('  ✅ Analyzes gaps from previous iteration');
  console.log('  ✅ Dynamically emphasizes critical areas');
  console.log('  ✅ Targets within holistic context (not surgical)');
  console.log('  ✅ Prioritizes: Universal Insight → Community → Vulnerability → Structure\n');

  console.log('📊 SESSION COMPARISON:');
  console.log('  Session 4: Clean prompts → 70/100 (baseline)');
  console.log('  Session 5: Surgical targeted → 55/100 ❌');
  console.log('  Session 6: Hybrid complexity → 61/100 ❌');
  console.log('  Session 7: Session 4 + fixes → 56/100 ❌');
  console.log('  Session 8: Intelligent prompting → ? 🎯\n');

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
    15, // Max iterations
    85  // Target score - aiming high!
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 8 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 FINAL SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET REACHED!' : result.combinedScore >= 75 ? '🎯 Excellent Progress!' : result.combinedScore >= 70 ? '✅ Good' : '⚠️  Needs work'}`);
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

  // Compare to all previous sessions
  console.log('\n📊 COMPARISON TO ALL SESSIONS:');
  console.log(`  Session 4 (clean prompts): 70/100`);
  console.log(`  Session 5 (surgical): 55/100`);
  console.log(`  Session 6 (hybrid): 61/100`);
  console.log(`  Session 7 (clean + fixes): 56/100`);
  console.log(`  Session 8 (intelligent): ${result.combinedScore}/100`);

  const session4Baseline = 70;
  const improvement = result.combinedScore - session4Baseline;

  if (improvement >= 15) {
    console.log(`\n🎉 BREAKTHROUGH! +${improvement} points over Session 4!`);
    console.log(`   Intelligent prompting achieved the goal!`);
  } else if (improvement > 0) {
    console.log(`\n✅ IMPROVEMENT: +${improvement} points over Session 4`);
    console.log(`   Intelligent prompting is working!`);
  } else if (improvement === 0) {
    console.log(`\n⚠️  MATCHED Session 4 baseline`);
  } else {
    console.log(`\n⚠️  Still below Session 4 by ${Math.abs(improvement)} points`);
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
    console.log('🎉🎉🎉 SESSION 8 SUCCESS! REACHED 85+ TARGET! 🎉🎉🎉');
  } else if (result.combinedScore >= 75) {
    console.log('🎯 SESSION 8: EXCELLENT PROGRESS! Getting close to target!');
  } else if (result.combinedScore >= 70) {
    console.log('✅ SESSION 8: SOLID PERFORMANCE. Matched/exceeded baseline.');
  } else {
    console.log('📊 SESSION 8 COMPLETE. Analyzing results for next iteration...');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
