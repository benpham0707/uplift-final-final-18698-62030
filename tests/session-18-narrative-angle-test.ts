/**
 * Session 18: Narrative Angle Testing
 *
 * HYPOTHESIS: The content/angle matters MORE than the writing technique
 * - Session 15 baseline: ~70/100 with "debugging robots" angle
 * - Can we hit 75-80+ with a more unique angle on the SAME activity?
 *
 * APPROACH:
 * 1. Generate 10 unique narrative angles for the robotics activity
 * 2. Select the 3 most promising (different risk levels)
 * 3. Generate essays with each angle using Session 15 config
 * 4. Compare scores
 *
 * EXPECTED OUTCOME:
 * - Unique angle should add 5-10 points
 * - Target: 75-80/100 (vs Session 15's 70/100)
 */

import { generateNarrativeAngles, selectBestAngle } from '../src/core/generation/narrativeAngleGenerator';
import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('\n' + '='.repeat(80));
  console.log('SESSION 18: NARRATIVE ANGLE GENERATION TEST');
  console.log('Can a unique angle boost scores beyond 70/100?');
  console.log('='.repeat(80) + '\n');

  console.log('📊 BASELINE (Session 15):');
  console.log('  Mean: 70/100');
  console.log('  Angle: "Debugging robots taught me collaboration"');
  console.log('  Problem: GENERIC - every robotics essay sounds like this\n');

  console.log('💡 HYPOTHESIS:');
  console.log('  Content matters MORE than technique');
  console.log('  A unique angle can add 5-10 points');
  console.log('  Target: 75-80/100\n');

  // Same profile as Session 15
  const baseProfile: GenerationProfile = {
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

  console.log('='.repeat(80));
  console.log('STEP 1: GENERATE UNIQUE NARRATIVE ANGLES');
  console.log('='.repeat(80) + '\n');

  console.log('Generating 10 unique angles for this robotics activity...\n');

  try {
    const angles = await generateNarrativeAngles({
      profile: baseProfile,
      numAngles: 10,
      prioritize: 'originality',
      avoidAngles: [
        'learned teamwork',
        'overcame failure',
        'found my passion',
        'became a leader',
      ],
    });

    console.log(`✓ Generated ${angles.length} unique angles!\n`);

    // Display all angles
    console.log('='.repeat(80));
    console.log('GENERATED ANGLES (Ranked by Originality)');
    console.log('='.repeat(80) + '\n');

    angles
      .sort((a, b) => b.originality - a.originality)
      .forEach((angle, i) => {
        console.log(`${i + 1}. ${angle.title}`);
        console.log(`   Originality: ${angle.originality}/10 | Risk: ${angle.riskLevel} | Impact: ${angle.expectedImpact}`);
        console.log(`   Hook: "${angle.hook}"`);
        console.log(`   Throughline: ${angle.throughline}`);
        console.log(`   Connection: ${angle.unusualConnection}\n`);
      });

    // Select top 3 angles (different risk levels)
    const boldAngle = angles.find((a) => a.riskLevel === 'bold' && a.originality >= 8);
    const moderateAngle = angles.find((a) => a.riskLevel === 'moderate' && a.originality >= 7);
    const safeAngle = angles.find((a) => a.riskLevel === 'safe' && a.originality >= 6);

    const testAngles = [boldAngle, moderateAngle, safeAngle].filter(
      (a) => a !== undefined
    );

    if (testAngles.length === 0) {
      console.log('⚠️  No suitable angles found. Using baseline angle.');
      return;
    }

    console.log('='.repeat(80));
    console.log(`STEP 2: TEST TOP ${testAngles.length} ANGLES`);
    console.log('='.repeat(80) + '\n');

    const results = [];

    for (let i = 0; i < testAngles.length; i++) {
      const angle = testAngles[i];
      console.log(`\n${'─'.repeat(80)}`);
      console.log(`TEST ${i + 1}/${testAngles.length}: ${angle.title}`);
      console.log(`Risk: ${angle.riskLevel} | Originality: ${angle.originality}/10`);
      console.log(`${'─'.repeat(80)}\n`);

      console.log(`Hook: "${angle.hook}"`);
      console.log(`Throughline: ${angle.throughline}\n`);

      console.log('Generating essay with this angle...\n');

      // Create a profile with this angle embedded
      const profileWithAngle = {
        ...baseProfile,
        // Add angle guidance to achievements (hacky but works)
        achievements: [
          `[NARRATIVE ANGLE: ${angle.title}]`,
          `[HOOK: ${angle.hook}]`,
          `[THROUGHLINE: ${angle.throughline}]`,
          `[OPENING: ${angle.openingScene}]`,
          `[TURNING POINT: ${angle.turningPoint}]`,
          `[INSIGHT: ${angle.universalInsight}]`,
          ...baseProfile.achievements,
        ],
      };

      const startTime = Date.now();

      const result = await generateWithIterativeImprovement(
        profileWithAngle,
        10, // Max iterations
        85 // Target score
      );

      const duration = ((Date.now() - startTime) / 1000).toFixed(1);

      results.push({
        angle,
        result,
        duration,
      });

      console.log(`\n✓ Complete in ${duration}s\n`);
      console.log('📊 SCORES:');
      console.log(`  Combined: ${result.combinedScore}/100`);
      console.log(`  Elite Patterns: ${result.elitePatternsScore}/100`);
      console.log(`  Literary: ${result.literarySophisticationScore}/100`);
      console.log(`  Authenticity: ${result.authenticityScore}/10\n`);
    }

    console.log('\n' + '='.repeat(80));
    console.log('RESULTS COMPARISON');
    console.log('='.repeat(80) + '\n');

    console.log('BASELINE (Session 15 - Generic Angle):');
    console.log('  Mean: 70/100');
    console.log('  Angle: "Debugging robots taught me collaboration"\n');

    console.log('NEW ANGLES:\n');

    results
      .sort((a, b) => b.result.combinedScore - a.result.combinedScore)
      .forEach((r, i) => {
        const improvement = r.result.combinedScore - 70;
        const symbol = improvement > 0 ? '📈' : improvement === 0 ? '➡️' : '📉';

        console.log(`${i + 1}. ${r.angle.title}`);
        console.log(`   Score: ${r.result.combinedScore}/100 ${symbol} ${improvement >= 0 ? '+' : ''}${improvement} pts`);
        console.log(`   Originality: ${r.angle.originality}/10 | Risk: ${r.angle.riskLevel}`);
        console.log(
          `   Breakdown: Elite ${r.result.elitePatternsScore}, Literary ${r.result.literarySophisticationScore}, Auth ${r.result.authenticityScore}\n`
        );
      });

    const bestResult = results.reduce((best, curr) =>
      curr.result.combinedScore > best.result.combinedScore ? curr : best
    );

    console.log('='.repeat(80));
    if (bestResult.result.combinedScore >= 75) {
      console.log('🎉 HYPOTHESIS CONFIRMED!');
      console.log(
        `   Unique angle added ${bestResult.result.combinedScore - 70} points!`
      );
      console.log(`   ${bestResult.angle.title}: ${bestResult.result.combinedScore}/100`);
    } else if (bestResult.result.combinedScore > 70) {
      console.log('✅ PARTIAL SUCCESS');
      console.log(
        `   Best angle added ${bestResult.result.combinedScore - 70} points`
      );
      console.log('   More refinement needed');
    } else {
      console.log('📊 INCONCLUSIVE');
      console.log('   Angles did not improve scores');
      console.log('   May need angle generation refinement');
    }
    console.log('='.repeat(80));

    console.log('\n\n📝 BEST ESSAY:\n');
    console.log(bestResult.result.essay);

    console.log('\n\n💡 WINNING ANGLE:');
    console.log(`Title: ${bestResult.angle.title}`);
    console.log(`Hook: "${bestResult.angle.hook}"`);
    console.log(`Throughline: ${bestResult.angle.throughline}`);
    console.log(`Philosophical Depth: ${bestResult.angle.philosophicalDepth}`);
    console.log(`Unusual Connection: ${bestResult.angle.unusualConnection}`);
  } catch (error) {
    console.error('Error generating angles:', error);
    console.log('\n⚠️  Angle generation failed. This feature needs API integration.');
    console.log('   Skipping to baseline test...\n');

    // Fallback: Run baseline test
    console.log('Running baseline test with Session 15 config...\n');

    const result = await generateWithIterativeImprovement(baseProfile, 10, 85);

    console.log('📊 BASELINE RESULT:');
    console.log(`  Combined: ${result.combinedScore}/100`);
    console.log(`  Elite: ${result.elitePatternsScore}/100`);
    console.log(`  Literary: ${result.literarySophisticationScore}/100`);
    console.log(`  Authenticity: ${result.authenticityScore}/10\n`);
  }
}

main().catch(console.error);
