/**
 * End-to-End Pipeline Test
 *
 * Tests the integrated essay generation pipeline with narrative angle generation.
 * Validates that the Session 18 findings are properly integrated.
 */

import { generateEssay, type GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('='.repeat(80));
  console.log('TESTING INTEGRATED PIPELINE WITH NARRATIVE ANGLE GENERATION');
  console.log('='.repeat(80));
  console.log();

  // Test profile (same robotics activity from Session 18)
  const testProfile: GenerationProfile = {
    studentVoice: 'conversational',
    riskTolerance: 'high',
    academicStrength: 'strong',
    activityType: 'academic',
    role: 'Robotics Team Lead',
    duration: 'Sep 2022 - Present',
    hoursPerWeek: 15,
    achievements: [
      'Built vision system for autonomous robot',
      'Robot qualified for regionals (top 5)',
    ],
    challenges: [
      'Robot failed completely 3 days before competition',
      'Team members worked in silos (mechanical, electrical, programming)',
    ],
    relationships: ['Dad (engineer, mentor)', 'Sarah (teammate, initially distant)'],
    impact: [
      'Created 23-page collaborative debugging guide',
      'Transformed team culture from territorial to collaborative',
      '5 new programmers learned methodology',
      '18 other teams adopted our approach at regionals',
    ],
    targetTier: 1,
    literaryTechniques: ['extendedMetaphor'],
    avoidClichés: true,
    generateAngle: true, // KEY: Enable automatic angle generation
  };

  console.log('📋 TEST CONFIGURATION:');
  console.log(`   Activity: ${testProfile.role}`);
  console.log(`   Voice: ${testProfile.studentVoice}`);
  console.log(`   Risk Tolerance: ${testProfile.riskTolerance}`);
  console.log(`   Auto-Generate Angle: ${testProfile.generateAngle ? 'YES' : 'NO'}`);
  console.log();

  console.log('🎯 EXPECTED BEHAVIOR:');
  console.log('   1. Generate 10 unique narrative angles');
  console.log('   2. Select moderate-risk (7/10 orig) grounded angle');
  console.log('   3. Generate essay with angle guidance');
  console.log('   4. Score ≥ 73/100 (Session 18 baseline)');
  console.log();

  console.log('─'.repeat(80));
  console.log('STARTING GENERATION...');
  console.log('─'.repeat(80));
  console.log();

  try {
    const result = await generateEssay(testProfile, 3);

    console.log();
    console.log('='.repeat(80));
    console.log('📊 FINAL RESULTS');
    console.log('='.repeat(80));
    console.log();

    console.log(`Combined Score: ${result.combinedScore}/100`);
    console.log(`  • Authenticity: ${result.authenticityScore.toFixed(1)}/10`);
    console.log(`  • Elite Patterns: ${result.elitePatternsScore}/100`);
    console.log(`  • Literary: ${result.literarySophisticationScore}/100`);
    console.log();

    if (result.narrativeAngle) {
      console.log(`🎨 NARRATIVE ANGLE USED:`);
      console.log(`   Title: "${result.narrativeAngle.title}"`);
      console.log(`   Originality: ${result.narrativeAngle.originality}/10`);
      console.log(`   Risk Level: ${result.narrativeAngle.riskLevel}`);
      console.log(`   Hook: "${result.narrativeAngle.hook}"`);
      console.log();
    }

    console.log(`📝 GENERATED ESSAY (${result.essay.length} chars):`);
    console.log('─'.repeat(80));
    console.log(result.essay);
    console.log('─'.repeat(80));
    console.log();

    // Validation
    console.log('✅ VALIDATION:');

    const passedScore = result.combinedScore >= 73;
    const passedAuth = result.authenticityScore >= 7.0;
    const hasAngle = !!result.narrativeAngle;
    const moderateRisk = result.narrativeAngle?.riskLevel === 'moderate';

    console.log(`   ${passedScore ? '✓' : '✗'} Score ≥ 73: ${result.combinedScore}/100`);
    console.log(`   ${passedAuth ? '✓' : '✗'} Authenticity ≥ 7.0: ${result.authenticityScore.toFixed(1)}/10`);
    console.log(`   ${hasAngle ? '✓' : '✗'} Narrative angle used: ${hasAngle ? 'YES' : 'NO'}`);
    console.log(`   ${moderateRisk ? '✓' : '✗'} Moderate risk angle: ${result.narrativeAngle?.riskLevel || 'N/A'}`);
    console.log();

    if (passedScore && passedAuth && hasAngle) {
      console.log('🎉 SUCCESS! Integrated pipeline working as expected.');
      console.log(`   Score improvement validated (≥73/100)`);
      console.log(`   Narrative angle integration successful`);
    } else {
      console.log('⚠️  PARTIAL SUCCESS - Some validations failed');
      if (!passedScore) console.log('   → Score below Session 18 baseline (73/100)');
      if (!passedAuth) console.log('   → Authenticity below threshold');
      if (!hasAngle) console.log('   → Angle generation not working');
    }
    console.log();

    console.log('='.repeat(80));
    console.log('TEST COMPLETE');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('❌ ERROR:', error);
    process.exit(1);
  }
}

main();
