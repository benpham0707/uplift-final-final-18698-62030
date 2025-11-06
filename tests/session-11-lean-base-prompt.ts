/**
 * Session 11: Lean Base Prompt Test
 *
 * HYPOTHESIS: Adding authenticity details to base prompt added cognitive load
 * that hurt Elite Patterns (Session 10: Elite dropped from 94 to 62).
 *
 * NEW APPROACH: Keep base prompt LEAN and minimal. Only add detailed guidance
 * as a "wrapper" when specific gaps are detected in iterations.
 *
 * Expected Result: Should match or beat Session 9's best (74/100 outlier, 61/100 typical)
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 11: LEAN BASE PROMPT TEST');
  console.log('Minimal Cognitive Load + Gap-Specific Wrappers');
  console.log('='.repeat(80) + '\n');

  console.log('🎯 HYPOTHESIS:');
  console.log('  Session 10 regression was due to authenticity details in BASE prompt');
  console.log('  Adding guidance upfront = cognitive overload');
  console.log('  Solution: Lean base, detailed wrappers only when needed\n');

  console.log('📊 PREVIOUS RESULTS:');
  console.log('  Session 9 Run 1: 74/100 (Elite 94/100) - Lucky outlier');
  console.log('  Session 9 Run 2: 61/100 (Elite 69/100) - Typical');
  console.log('  Session 10: 62/100 (Elite 62/100) - Heavy base prompt\n');

  console.log('🔧 WHAT CHANGED:');
  console.log('  ❌ OLD: Detailed authenticity in base prompt (Session 10)');
  console.log('  ✅ NEW: Minimal base prompt, details only in gap wrappers');
  console.log('  Expected: Less cognitive load on initial generation\n');

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
    literaryTechniques: ['extendedMetaphor'], // Stay focused!
    avoidClichés: true,
  };

  console.log('🏃 Running 3 times to measure variance:\n');

  const runs = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`\n${'▓'.repeat(80)}`);
    console.log(`RUN ${i}/3`);
    console.log('▓'.repeat(80) + '\n');

    const startTime = Date.now();

    const result = await generateWithIterativeImprovement(
      profile,
      15,
      85
    );

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(1);

    runs.push({
      score: result.combinedScore,
      auth: result.authenticityScore,
      elite: result.elitePatternsScore,
      literary: result.literarySophisticationScore,
      iterations: result.iterationHistory.length,
      duration,
      cost: (result.iterationHistory.length * 0.011).toFixed(3)
    });

    console.log(`\n✅ RUN ${i} COMPLETE:`);
    console.log(`  Score: ${result.combinedScore}/100`);
    console.log(`  Auth: ${result.authenticityScore}/10, Elite: ${result.elitePatternsScore}/100, Literary: ${result.literarySophisticationScore}/100`);
    console.log(`  Iterations: ${result.iterationHistory.length}, Time: ${duration}s, Cost: $${(result.iterationHistory.length * 0.011).toFixed(3)}`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 11 VARIANCE ANALYSIS');
  console.log('='.repeat(80) + '\n');

  const scores = runs.map(r => r.score);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);
  const min = Math.min(...scores);
  const max = Math.max(...scores);

  console.log('📊 STATISTICS (3 runs):');
  console.log(`  Mean (μ): ${mean.toFixed(1)}/100`);
  console.log(`  Std Dev (σ): ${stdDev.toFixed(1)} points`);
  console.log(`  Range: ${min}-${max}/100`);
  console.log(`  Variance: ${(max - min)} points\n`);

  console.log('📋 DETAILED RESULTS:');
  runs.forEach((run, i) => {
    console.log(`  Run ${i + 1}: ${run.score}/100 (Auth ${run.auth}/10, Elite ${run.elite}/100, Literary ${run.literary}/100)`);
  });

  const avgAuth = (runs.reduce((sum, r) => sum + r.auth, 0) / runs.length).toFixed(1);
  const avgElite = Math.round(runs.reduce((sum, r) => sum + r.elite, 0) / runs.length);
  const avgLiterary = Math.round(runs.reduce((sum, r) => sum + r.literary, 0) / runs.length);

  console.log(`\n  Average: ${mean.toFixed(1)}/100 (Auth ${avgAuth}/10, Elite ${avgElite}/100, Literary ${avgLiterary}/100)\n`);

  console.log('💰 COST ANALYSIS:');
  const totalCost = runs.reduce((sum, r) => sum + parseFloat(r.cost), 0);
  const avgCost = totalCost / runs.length;
  console.log(`  Total: $${totalCost.toFixed(3)}`);
  console.log(`  Average per run: $${avgCost.toFixed(3)}\n`);

  console.log('🔍 COMPARISON TO PREVIOUS SESSIONS:');
  console.log(`  Session 9 Run 1: 74/100 (outlier)`);
  console.log(`  Session 9 Run 2: 61/100 (typical)`);
  console.log(`  Session 10: 62/100 (heavy prompt)`);
  console.log(`  Session 11: ${mean.toFixed(1)}/100 (lean prompt)\n`);

  if (mean >= 65) {
    console.log('✅ SUCCESS! Lean base prompt performs BETTER than heavy prompt');
  } else if (mean >= 60) {
    console.log('📊 CONSISTENT: Lean prompt matches typical performance (60-62/100)');
  } else {
    console.log('⚠️  REGRESSION: Lean prompt underperforms');
  }

  if (stdDev < 5) {
    console.log('✅ LOW VARIANCE: System is consistent (σ < 5)\n');
  } else if (stdDev < 7) {
    console.log('⚠️  MODERATE VARIANCE: σ = ${stdDev.toFixed(1)} points\n');
  } else {
    console.log('🚨 HIGH VARIANCE: σ = ${stdDev.toFixed(1)} points (unstable)\n');
  }

  console.log('='.repeat(80));
  console.log('SESSION 11 COMPLETE');
  console.log('='.repeat(80));
}

main().catch(console.error);
