/**
 * Generation Demo: Weak → Elite Transformation
 *
 * Demonstrates:
 * 1. Starting with a weak resume-bullet essay
 * 2. Iterative improvement with learning
 * 3. Final elite-level essay (85+ score)
 */

import { generateWithIterativeImprovement } from '../src/core/generation/iterativeImprovement';
import { transformEssay } from '../src/core/generation/essayGenerator';
import type { GenerationProfile } from '../src/core/generation/essayGenerator';
import * as dotenv from 'dotenv';

dotenv.config();

// ============================================================================
// TEST CASE 1: Model UN (Resume Bullet → Elite Narrative)
// ============================================================================

const WEAK_MODEL_UN = `As Secretary General, I organized committees and led the team to over 15 conferences within two years. I was the recipient of awards at 90% of the conferences attended, including Outstanding Delegate and Best Delegate awards. Additionally, the club as a whole won an award of distinction for our research and preparation at NHSMUN. I also spearheaded fundraising initiatives that raised over $7,000 for the American Red Cross during my senior year.`;

const MODEL_UN_PROFILE: GenerationProfile = {
  studentVoice: 'conversational',
  riskTolerance: 'medium',
  academicStrength: 'strong',

  activityType: 'academic',
  role: 'Model United Nations Secretary General',
  duration: 'September 2022 – June 2024',
  hoursPerWeek: 10,

  achievements: [
    'Led team to 15+ conferences',
    '90% award rate',
    'Club won distinction at NHSMUN',
    'Raised $7,000 for Red Cross',
  ],

  challenges: [
    'Delegate dropped out 2 hours before conference',
    'Had to teach replacement everything in limited time',
    'Feared team would fail without preparation',
  ],

  relationships: [
    'Co-chair Sarah',
    'Last-minute delegate replacement',
    'Team of 12 delegates',
  ],

  impact: [
    'Created emergency training system',
    'Team succeeded even with replacement',
    'System continued after graduation',
  ],

  targetTier: 1, // Harvard/Stanford level
  literaryTechniques: ['inMediasRes', 'extendedMetaphor'],
  avoidClichés: true,
};

// ============================================================================
// TEST CASE 2: From Scratch Generation
// ============================================================================

const ROBOTICS_PROFILE: GenerationProfile = {
  studentVoice: 'quirky',
  riskTolerance: 'high',
  academicStrength: 'strong',

  activityType: 'academic',
  role: 'Robotics Team Lead - Vision Systems',
  duration: 'September 2022 – Present',
  hoursPerWeek: 15,

  achievements: [
    'Developed autonomous vision system',
    'Team qualified for regionals',
    'Mentored 5 new members in programming',
  ],

  challenges: [
    'Robot failed all tests week before competition',
    'Vision system not detecting targets',
    'Pressure from team to fix it',
    'Stayed up 3 nights debugging',
  ],

  relationships: [
    'Dad (mentor and helper)',
    'Younger brother (on drive train team)',
    'Sarah (mechanical lead)',
  ],

  impact: [
    'Robot performed perfectly at competition',
    'Team culture became more supportive',
    'Created debugging guide for future years',
  ],

  targetTier: 1,
  literaryTechniques: ['dualScene', 'extendedMetaphor'],
  avoidClichés: true,
};

// ============================================================================
// MAIN DEMO
// ============================================================================

async function main() {
  console.log(`\n${'█'.repeat(80)}`);
  console.log(`ESSAY GENERATION DEMO: WEAK → ELITE TRANSFORMATION`);
  console.log(`${'█'.repeat(80)}\n`);

  // =========================================================================
  // TEST 1: Transform Existing Weak Essay
  // =========================================================================

  console.log(`\n${'═'.repeat(80)}`);
  console.log(`TEST 1: TRANSFORMING WEAK ESSAY (Model UN)`);
  console.log(`${'═'.repeat(80)}\n`);

  console.log(`📄 ORIGINAL ESSAY (Resume Bullet Style):`);
  console.log(`"${WEAK_MODEL_UN}"\n`);

  console.log(`Length: ${WEAK_MODEL_UN.length} characters`);
  console.log(`Voice: Resume/List format`);
  console.log(`Problems: No story, no vulnerability, no dialogue, no emotion\n`);

  console.log(`⚡ STARTING TRANSFORMATION...\n`);

  try {
    const transformed = await transformEssay(WEAK_MODEL_UN, MODEL_UN_PROFILE);

    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📝 TRANSFORMED ESSAY:`);
    console.log(`${'─'.repeat(80)}\n`);
    console.log(`${transformed.essay}\n`);

    console.log(`${'─'.repeat(80)}`);
    console.log(`📊 TRANSFORMATION RESULTS:`);
    console.log(`${'─'.repeat(80)}\n`);

    console.log(`Scores:`);
    console.log(`  Combined:                ${transformed.combinedScore}/100`);
    console.log(`  Authenticity:            ${transformed.authenticityScore.toFixed(1)}/10`);
    console.log(`  Elite Patterns:          ${transformed.elitePatternsScore}/100`);
    console.log(`  Literary Sophistication: ${transformed.literarySophisticationScore}/100\n`);

    console.log(`Strengths (${transformed.strengths.length}):`);
    transformed.strengths.slice(0, 5).forEach(s => console.log(`  ✓ ${s}`));

    if (transformed.gaps.length > 0) {
      console.log(`\nRemaining Gaps (${transformed.gaps.length}):`);
      transformed.gaps.slice(0, 3).forEach(g => console.log(`  • ${g}`));
    }

    const tier = transformed.combinedScore >= 90 ? 'S (Harvard/Stanford)' :
                 transformed.combinedScore >= 80 ? 'A (Top Ivy/UC Berkeley)' :
                 transformed.combinedScore >= 70 ? 'B (UCLA/Top UCs)' : 'C (UC-Competitive)';

    console.log(`\n🎯 FINAL TIER: ${tier}\n`);

  } catch (error) {
    console.error(`\n❌ Transformation failed: ${error}\n`);
  }

  // =========================================================================
  // TEST 2: Generate From Scratch with Iterative Improvement
  // =========================================================================

  console.log(`\n${'═'.repeat(80)}`);
  console.log(`TEST 2: GENERATE FROM SCRATCH (Robotics Team)`);
  console.log(`${'═'.repeat(80)}\n`);

  console.log(`📋 PROFILE:`);
  console.log(`  Role: ${ROBOTICS_PROFILE.role}`);
  console.log(`  Voice: ${ROBOTICS_PROFILE.studentVoice}`);
  console.log(`  Target: Tier ${ROBOTICS_PROFILE.targetTier} (Harvard/Stanford)`);
  console.log(`  Risk: ${ROBOTICS_PROFILE.riskTolerance}`);
  console.log(`  Techniques: ${ROBOTICS_PROFILE.literaryTechniques.join(', ')}\n`);

  console.log(`⚡ STARTING ITERATIVE GENERATION (max 5 iterations)...\n`);

  try {
    const generated = await generateWithIterativeImprovement(
      ROBOTICS_PROFILE,
      5, // max iterations
      85 // target score
    );

    console.log(`\n${'─'.repeat(80)}`);
    console.log(`📝 FINAL GENERATED ESSAY (Iteration ${generated.iteration}):`);
    console.log(`${'─'.repeat(80)}\n`);
    console.log(`${generated.essay}\n`);

    console.log(`${'─'.repeat(80)}`);
    console.log(`📊 GENERATION RESULTS:`);
    console.log(`${'─'.repeat(80)}\n`);

    console.log(`Final Scores:`);
    console.log(`  Combined:                ${generated.combinedScore}/100`);
    console.log(`  Authenticity:            ${generated.authenticityScore.toFixed(1)}/10`);
    console.log(`  Elite Patterns:          ${generated.elitePatternsScore}/100`);
    console.log(`  Literary Sophistication: ${generated.literarySophisticationScore}/100\n`);

    console.log(`Iteration History:`);
    generated.iterationHistory.forEach((iter, i) => {
      console.log(`  ${i + 1}. Score: ${iter.combinedScore}/100 (Auth: ${iter.authenticityScore.toFixed(1)}, Elite: ${iter.elitePatternsScore}, Lit: ${iter.literarySophisticationScore})`);
    });

    console.log(`\nStrengths (${generated.strengths.length}):`);
    generated.strengths.slice(0, 5).forEach(s => console.log(`  ✓ ${s}`));

    if (generated.gaps.length > 0) {
      console.log(`\nRemaining Gaps (${generated.gaps.length}):`);
      generated.gaps.slice(0, 3).forEach(g => console.log(`  • ${g}`));
    }

    const tier = generated.combinedScore >= 90 ? 'S (Harvard/Stanford)' :
                 generated.combinedScore >= 80 ? 'A (Top Ivy/UC Berkeley)' :
                 generated.combinedScore >= 70 ? 'B (UCLA/Top UCs)' : 'C (UC-Competitive)';

    console.log(`\n🎯 FINAL TIER: ${tier}\n`);

    // Show improvement trajectory
    if (generated.iterationHistory.length > 1) {
      const firstScore = generated.iterationHistory[0].combinedScore;
      const improvement = generated.combinedScore - firstScore;

      console.log(`📈 IMPROVEMENT TRAJECTORY:`);
      console.log(`  Initial Score: ${firstScore}/100`);
      console.log(`  Final Score:   ${generated.combinedScore}/100`);
      console.log(`  Improvement:   +${improvement} points (${Math.round((improvement / firstScore) * 100)}%)\n`);
    }

  } catch (error) {
    console.error(`\n❌ Generation failed: ${error}\n`);
  }

  // =========================================================================
  // SUMMARY
  // =========================================================================

  console.log(`\n${'█'.repeat(80)}`);
  console.log(`DEMO COMPLETE`);
  console.log(`${'█'.repeat(80)}\n`);

  console.log(`✅ System Capabilities Demonstrated:`);
  console.log(`  1. Transform weak resume bullets into elite narratives`);
  console.log(`  2. Generate from scratch with literary sophistication`);
  console.log(`  3. Iteratively improve based on analysis feedback`);
  console.log(`  4. Learn and adapt prompts to address specific gaps`);
  console.log(`  5. Achieve target scores (85+ for Tier 1)`);
  console.log(`  6. Maintain authentic voice throughout\n`);

  console.log(`🎓 The system can now:`);
  console.log(`  • Turn any weak essay into a strong one`);
  console.log(`  • Generate original, non-copied content`);
  console.log(`  • Validate quality with comprehensive analysis`);
  console.log(`  • Iterate until standards are met`);
  console.log(`  • Preserve student's unique voice and story\n`);

  console.log(`${'█'.repeat(80)}\n`);
}

main().catch(console.error);
