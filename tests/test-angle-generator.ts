/**
 * Quick test of the narrative angle generator
 */

import { generateNarrativeAngles } from '../src/core/generation/narrativeAngleGenerator';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';

async function main() {
  console.log('Testing narrative angle generator...\n');

  const testProfile: GenerationProfile = {
    studentVoice: 'quirky',
    riskTolerance: 'high',
    academicStrength: 'strong',
    activityType: 'academic',
    role: 'Robotics Team Lead',
    duration: 'Sep 2022 - Present',
    hoursPerWeek: 15,
    achievements: ['Built vision system', 'Robot qualified for regionals'],
    challenges: ['Robot failed before competition', 'Team was siloed'],
    relationships: ['Dad (mentor)', 'Sarah (teammate)'],
    impact: ['Created debugging guide', 'Transformed team culture'],
    targetTier: 1,
    literaryTechniques: ['extendedMetaphor'],
    avoidClichés: true,
  };

  try {
    console.log('Generating 3 unique angles...\n');

    const angles = await generateNarrativeAngles({
      profile: testProfile,
      numAngles: 3,
      prioritize: 'originality',
    });

    console.log(`✓ Generated ${angles.length} angles!\n`);

    angles.forEach((angle, i) => {
      console.log(`${i + 1}. ${angle.title}`);
      console.log(`   Hook: "${angle.hook}"`);
      console.log(`   Originality: ${angle.originality}/10\n`);
    });

    console.log('✅ Angle generator works!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
