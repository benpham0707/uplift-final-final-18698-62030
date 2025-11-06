/**
 * Test optimized generation system with perspective shift
 * Goal: Reach 85+ while tracking cost savings
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('OPTIMIZED GENERATION TEST - TARGET: 85+/100');
  console.log('='.repeat(80) + '\n');

  // Profile with perspective shift technique
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

    targetTier: 1, // Harvard/Stanford/MIT
    literaryTechniques: ['perspectiveShift', 'extendedMetaphor'], // KEY: Using perspective shift
    avoidClichés: true,
  };

  console.log('📋 PROFILE:');
  console.log(`  Role: ${profile.role}`);
  console.log(`  Voice: ${profile.studentVoice}`);
  console.log(`  Target: Tier 1 (Harvard/Stanford)`);
  console.log(`  Techniques: ${profile.literaryTechniques.join(', ')}`);
  console.log(`  Risk: ${profile.riskTolerance}\n`);

  console.log('🎯 OPTIMIZATIONS ENABLED:');
  console.log('  ✅ Compressed prompts (60% token reduction)');
  console.log('  ✅ Early exit logic (stops when plateaued or close to target)');
  console.log('  ✅ Enhanced Gen-Z vernacular detection');
  console.log('  ✅ Perspective shift technique');
  console.log('  ✅ All detector improvements (metaphor, sensory, vulnerability)\n');

  const startTime = Date.now();

  const result = await generateWithIterativeImprovement(
    profile,
    10, // max iterations (increased for smart uncompression test)
    85  // target score
  );

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);

  console.log('\n' + '='.repeat(80));
  console.log('FINAL RESULTS');
  console.log('='.repeat(80) + '\n');

  console.log(`📊 SCORES:`);
  console.log(`  Combined: ${result.combinedScore}/100 ${result.combinedScore >= 85 ? '🎉 TARGET REACHED!' : result.combinedScore >= 82 ? '🎯 Very Close!' : '⚠️  Below target'}`);
  console.log(`  Authenticity: ${result.authenticityScore}/10`);
  console.log(`  Elite Patterns: ${result.elitePatternsScore}/100`);
  console.log(`  Literary: ${result.literarySophisticationScore}/100\n`);

  console.log(`⏱️  TIME: ${duration}s`);
  console.log(`🔄 ITERATIONS: ${result.iterationHistory.length}`);
  console.log(`💰 ESTIMATED COST: $${(result.iterationHistory.length * 0.011).toFixed(3)}\n`);

  console.log('📈 ITERATION TRAJECTORY:');
  result.iterationHistory.forEach((iter, i) => {
    const change = i > 0 ? iter.combinedScore - result.iterationHistory[i - 1].combinedScore : 0;
    console.log(`  ${i + 1}. ${iter.combinedScore}/100 ${i > 0 ? (change >= 0 ? `(+${change})` : `(${change})`) : '(initial)'}`);
  });

  if (result.combinedScore >= 85) {
    console.log('\n' + '🎉'.repeat(40));
    console.log('SUCCESS! System reached 85+ target!');
    console.log('🎉'.repeat(40));
  } else {
    console.log(`\n⚠️  Gap to target: ${85 - result.combinedScore} points`);
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
  console.log('TEST COMPLETE');
  console.log('='.repeat(80));
}

main().catch(console.error);
