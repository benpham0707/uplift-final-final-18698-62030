/**
 * Session 10: Authenticity Boost
 *
 * Building on Session 9's breakthrough (74/100), now adding authenticity
 * enhancements while maintaining the focused strategy.
 *
 * Session 9 Results:
 * - Score: 74/100
 * - Authenticity: 6.5/10
 * - Elite Patterns: 94/100 ⭐
 * - Literary: 59/100
 *
 * Goal: Boost authenticity from 6.5/10 to 8.5/10 for +4-6 points overall
 * Target: 78-82/100 (within striking distance of 85!)
 *
 * Strategy: Keep focused approach (extended metaphor only) + enhance authentic voice
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 10: AUTHENTICITY BOOST');
  console.log('Focused Strategy + Genuine Authentic Voice');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 SESSION 10 GOAL:');
  console.log('  📊 Session 9: 74/100 (Authenticity 6.5/10)');
  console.log('  🎯 Session 10: 78-82/100 (Authenticity 8.5/10)');
  console.log('  🚀 Final Goal: 85+/100\n');

  console.log('🔑 STRATEGY:');
  console.log('  ✅ KEEP: Focused approach (extended metaphor only)');
  console.log('  ✅ KEEP: Elite Patterns strength (94/100)');
  console.log('  ✅ ADD: Enhanced authenticity guidance');
  console.log('    - More parentheticals for personality');
  console.log('    - Questions for genuine voice');
  console.log('    - Conversational asides');
  console.log('    - Honest, vulnerable moments');
  console.log('    - Authentic teenage voice (not forced Gen-Z)\n');

  console.log('📊 HYPOTHESIS:');
  console.log('  Authenticity 6.5 → 8.5/10 = +2 points authenticity');
  console.log('  +2 authenticity × 20% weight = +4 points overall');
  console.log('  Expected: 74 + 4 = 78/100 minimum');
  console.log('  Optimistic: Could reach 80-82/100 if other areas improve too\n');

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
    literaryTechniques: ['extendedMetaphor'], // STAY FOCUSED!
    avoidClichés: true,
  };

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    15, // Max iterations
    85  // Target score
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 10 RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 FINAL SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET REACHED!' : result.combinedScore >= 82 ? '🎯 SO CLOSE!' : result.combinedScore >= 78 ? '✅ Excellent!' : result.combinedScore >= 74 ? '📈 Progress' : '⚠️  Below Session 9'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10 ${result.authenticityScore >= 8.5 ? '⭐' : result.authenticityScore >= 7.5 ? '✅' : ''}`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100 ${result.elitePatternsScore >= 90 ? '⭐' : ''}`);
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

  // Compare to Session 9
  console.log('\n📊 SESSION 10 vs SESSION 9:');
  const session9Score = 74;
  const session9Auth = 6.5;
  const session9Elite = 94;

  console.log(`  Session 9: ${session9Score}/100 (Auth ${session9Auth}/10, Elite ${session9Elite}/100)`);
  console.log(`  Session 10: ${result.combinedScore}/100 (Auth ${result.authenticityScore}/10, Elite ${result.elitePatternsScore}/100)`);

  const improvement = result.combinedScore - session9Score;
  const authImprovement = result.authenticityScore - session9Auth;

  if (improvement >= 8) {
    console.log(`\n🎉 MAJOR SUCCESS! +${improvement} points over Session 9!`);
    console.log(`   Authenticity boost worked: ${session9Auth} → ${result.authenticityScore}/10`);
  } else if (improvement >= 4) {
    console.log(`\n✅ SUCCESS! +${improvement} points over Session 9`);
    console.log(`   Authenticity: ${session9Auth} → ${result.authenticityScore}/10 (${authImprovement >= 0 ? '+' : ''}${authImprovement.toFixed(1)})`);
  } else if (improvement > 0) {
    console.log(`\n📈 Slight improvement: +${improvement} points`);
    console.log(`   Authenticity: ${session9Auth} → ${result.authenticityScore}/10 (${authImprovement >= 0 ? '+' : ''}${authImprovement.toFixed(1)})`);
  } else if (improvement === 0) {
    console.log(`\n⚠️  Same score as Session 9 (${session9Score}/100)`);
  } else {
    console.log(`\n⚠️  Regression: ${improvement} points vs Session 9`);
  }

  // Path to 85+
  console.log('\n🎯 PATH TO 85+:');
  const gapTo85 = 85 - result.combinedScore;
  if (gapTo85 <= 0) {
    console.log('  🎉 TARGET REACHED!');
  } else if (gapTo85 <= 5) {
    console.log(`  Only ${gapTo85} points away! Next: Universal Insight enhancement`);
  } else if (gapTo85 <= 10) {
    console.log(`  ${gapTo85} points away. Need: Universal Insight boost (+4-8 pts)`);
  } else {
    console.log(`  ${gapTo85} points away. Need combination of improvements`);
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
    console.log('🎉🎉🎉 SESSION 10 SUCCESS! REACHED 85+ TARGET! 🎉🎉🎉');
  } else if (result.combinedScore >= 82) {
    console.log('🎯 SESSION 10: SO CLOSE! Within 3 points of target!');
  } else if (result.combinedScore >= 78) {
    console.log('✅ SESSION 10: EXCELLENT! Authenticity boost working!');
  } else if (result.combinedScore > session9Score) {
    console.log('📈 SESSION 10: PROGRESS! Moving in right direction!');
  } else {
    console.log('📊 SESSION 10 COMPLETE. Analyzing authenticity approach...');
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
