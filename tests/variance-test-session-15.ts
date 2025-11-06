/**
 * Variance Test: Session 15 Configuration (3 runs)
 *
 * Session 15 scored 79/100 but Sessions 16-17 regressed
 * Question: Was Session 15 lucky variance or repeatable?
 *
 * This test runs Session 15's exact configuration 3 times
 * to measure: mean, std dev, min, max, consistency
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('VARIANCE TEST: SESSION 15 CONFIGURATION (3 RUNS)');
  console.log('Testing consistency of our best configuration');
  console.log('='.repeat(80) + '\n');

  console.log('📊 SESSION 15 ORIGINAL:');
  console.log('  Run 1: 79/100 (Elite 88, Literary 70)');
  console.log('  - Universal Insight wrapper working');
  console.log('  - Structural Innovation wrapper working');
  console.log('  - Extended metaphor sustained\n');

  console.log('❓ QUESTION:');
  console.log('  Is 79/100 repeatable or was it variance?');
  console.log('  Sessions 16-17 both scored lower (71, 74)');
  console.log('  Need to know: What\'s the true baseline?\n');

  console.log('🎯 RUNNING 3 TESTS...\n');

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

  const runs: Array<{
    combined: number;
    elite: number;
    literary: number;
    auth: number;
    iterations: number;
  }> = [];

  for (let i = 1; i <= 3; i++) {
    console.log('─'.repeat(80));
    console.log(`RUN ${i}/3`);
    console.log('─'.repeat(80));

    const startTime = Date.now();
    const result = await generateWithIterativeImprovement(profile, 15, 85);
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log(`\n✓ Run ${i} Complete: ${result.combinedScore}/100 (${duration}s, ${result.iterationHistory.length} iterations)`);
    console.log(`  Elite: ${result.elitePatternsScore}/100`);
    console.log(`  Literary: ${result.literarySophisticationScore}/100`);
    console.log(`  Authenticity: ${result.authenticityScore}/10\n`);

    runs.push({
      combined: result.combinedScore,
      elite: result.elitePatternsScore,
      literary: result.literarySophisticationScore,
      auth: result.authenticityScore,
      iterations: result.iterationHistory.length,
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('SESSION 15 VARIANCE TEST RESULTS');
  console.log('='.repeat(80) + '\n');

  // Calculate statistics
  const combined = runs.map(r => r.combined);
  const elite = runs.map(r => r.elite);
  const literary = runs.map(r => r.literary);
  const auth = runs.map(r => r.auth);

  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const stdDev = (arr: number[]) => {
    const avg = mean(arr);
    return Math.sqrt(arr.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / arr.length);
  };

  const combinedMean = mean(combined);
  const combinedStdDev = stdDev(combined);
  const combinedMin = Math.min(...combined);
  const combinedMax = Math.max(...combined);

  console.log('📊 COMBINED SCORE:');
  console.log(`  Run 1: ${combined[0]}/100`);
  console.log(`  Run 2: ${combined[1]}/100`);
  console.log(`  Run 3: ${combined[2]}/100`);
  console.log(`  ────────────────`);
  console.log(`  Mean: ${combinedMean.toFixed(1)}/100`);
  console.log(`  Std Dev: ${combinedStdDev.toFixed(2)} points`);
  console.log(`  Range: ${combinedMin} - ${combinedMax} (${combinedMax - combinedMin} point spread)`);
  console.log(`  Original Session 15: 79/100\n`);

  console.log('📊 ELITE PATTERNS:');
  console.log(`  Mean: ${mean(elite).toFixed(1)}/100`);
  console.log(`  Std Dev: ${stdDev(elite).toFixed(2)}`);
  console.log(`  Range: ${Math.min(...elite)} - ${Math.max(...elite)}\n`);

  console.log('📊 LITERARY:');
  console.log(`  Mean: ${mean(literary).toFixed(1)}/100`);
  console.log(`  Std Dev: ${stdDev(literary).toFixed(2)}`);
  console.log(`  Range: ${Math.min(...literary)} - ${Math.max(...literary)}\n`);

  console.log('📊 AUTHENTICITY:');
  console.log(`  Mean: ${mean(auth).toFixed(2)}/10`);
  console.log(`  Std Dev: ${stdDev(auth).toFixed(2)}\n`);

  console.log('=' .repeat(80));
  console.log('💡 INTERPRETATION');
  console.log('='.repeat(80) + '\n');

  if (combinedStdDev < 2) {
    console.log('✅ LOW VARIANCE (σ < 2): Very consistent!');
    console.log(`   Session 15 config reliably produces ${combinedMean.toFixed(1)} ± ${combinedStdDev.toFixed(1)} points`);
  } else if (combinedStdDev < 4) {
    console.log('📊 MODERATE VARIANCE (σ < 4): Reasonably consistent');
    console.log(`   Session 15 config typically produces ${combinedMean.toFixed(1)} ± ${combinedStdDev.toFixed(1)} points`);
  } else {
    console.log('⚠️  HIGH VARIANCE (σ ≥ 4): Inconsistent results');
    console.log(`   Session 15 config has high variance (σ = ${combinedStdDev.toFixed(2)})`);
  }

  if (combinedMax >= 79) {
    console.log(`\n🎯 Original 79/100 WAS achievable (max: ${combinedMax}/100)`);
  } else {
    console.log(`\n⚠️  Original 79/100 was likely variance (max: ${combinedMax}/100)`);
    console.log(`   True baseline appears to be ${combinedMean.toFixed(1)}/100`);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ SESSION 15 VARIANCE TEST COMPLETE');
  console.log('='.repeat(80));
  console.log(`Mean: ${combinedMean.toFixed(1)}/100, σ = ${combinedStdDev.toFixed(2)}`);
  console.log('Next: Run Session 17 variance test for comparison');
  console.log('='.repeat(80));
}

main().catch(console.error);
