/**
 * PIQ Surgical Workshop Service
 *
 * Full integration of runSurgicalWorkshop() for PIQ essays.
 * NO quality compromises - uses complete narrative workshop pipeline.
 *
 * This service:
 * 1. Takes PIQ essay input
 * 2. Runs FULL surgical workshop analysis (100+ seconds)
 * 3. Returns ALL data: scores, fingerprints, workshop items
 * 4. Transforms to frontend-compatible format WITHOUT data loss
 */

import { runSurgicalWorkshop, SurgicalWorkshopResult } from './narrativeWorkshop/surgicalOrchestrator';
import { NarrativeEssayInput } from './narrativeWorkshop/types';

/**
 * Complete PIQ analysis using full surgical workshop backend
 */
export async function analyzePIQWithFullWorkshop(
  essayText: string,
  promptTitle: string,
  promptText: string,
  options?: {
    essayType?: 'personal_statement' | 'uc_piq' | 'why_us' | 'supplemental' | 'activity_essay';
  }
): Promise<SurgicalWorkshopResult> {
  console.log('='.repeat(80));
  console.log('PIQ SURGICAL WORKSHOP - FULL ANALYSIS');
  console.log('='.repeat(80));
  console.log(`Prompt: ${promptTitle}`);
  console.log(`Essay length: ${essayText.length} chars`);
  console.log(`Word count: ${essayText.trim().split(/\s+/).filter(Boolean).length}`);
  console.log('');

  // Prepare input for surgical workshop
  const input: NarrativeEssayInput = {
    essayText,
    essayType: options?.essayType || 'uc_piq',
    promptText,
    maxWords: 350, // UC PIQ limit
    targetSchools: ['UC System'], // Can be made configurable
    studentContext: {
      // Can be enhanced with user profile data later
      academicStrength: 'moderate', // Default, can be personalized
      voicePreference: 'concise', // PIQs tend to be concise
    }
  };

  console.log('🚀 Starting FULL surgical workshop pipeline...');
  console.log('   This will take 100-120 seconds for complete analysis.');
  console.log('');

  try {
    // Run the COMPLETE surgical workshop
    // This includes:
    // - Holistic understanding
    // - Voice fingerprint (4 dimensions)
    // - Experience fingerprint (6 uniqueness dimensions + anti-patterns)
    // - 12-dimension rubric scoring
    // - Locator analysis
    // - Surgical fix generation with 3 suggestion types
    const result = await runSurgicalWorkshop(input);

    console.log('');
    console.log('✅ SURGICAL WORKSHOP COMPLETE');
    console.log(`   EQI Score: ${result.overallScore}/100`);
    console.log(`   Workshop Items: ${result.workshopItems.length}`);
    console.log(`   Voice Fingerprint: ${result.voiceFingerprint ? 'Yes' : 'No'}`);
    console.log(`   Experience Fingerprint: ${result.experienceFingerprint ? 'Yes' : 'No'}`);
    console.log(`   Total Time: ${result.performanceMetrics.totalMs}ms`);
    console.log('='.repeat(80));
    console.log('');

    // Validate we got all expected data
    validateFullDataIntegrity(result);

    return result;

  } catch (error) {
    console.error('❌ SURGICAL WORKSHOP FAILED:', error);
    console.error('   Error details:', error instanceof Error ? error.message : String(error));
    throw new Error(`PIQ Surgical Workshop analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Validate that we received complete data from surgical workshop
 * Throws error if critical data is missing (fail fast)
 */
function validateFullDataIntegrity(result: SurgicalWorkshopResult): void {
  const errors: string[] = [];

  // Critical data checks
  if (!result.analysisId) {
    errors.push('Missing analysisId');
  }

  if (typeof result.overallScore !== 'number' || result.overallScore < 0 || result.overallScore > 100) {
    errors.push(`Invalid overallScore: ${result.overallScore}`);
  }

  if (!result.voiceFingerprint) {
    errors.push('Missing voiceFingerprint');
  }

  if (!result.rubricResult) {
    errors.push('Missing rubricResult');
  } else {
    if (!result.rubricResult.dimension_scores || result.rubricResult.dimension_scores.length !== 12) {
      errors.push(`Expected 12 dimension scores, got ${result.rubricResult.dimension_scores?.length || 0}`);
    }
  }

  if (!result.workshopItems) {
    errors.push('Missing workshopItems');
  }

  if (!result.performanceMetrics) {
    errors.push('Missing performanceMetrics');
  }

  // Warning for optional but expected data
  if (!result.experienceFingerprint) {
    console.warn('⚠️  Experience fingerprint not generated - this is optional but valuable');
  }

  if (errors.length > 0) {
    throw new Error(`Data integrity validation failed:\n  ${errors.join('\n  ')}`);
  }

  console.log('✅ Data integrity validated - all critical fields present');
}

/**
 * Helper to get target tier label from EQI score
 */
export function getTargetTier(score: number): string {
  if (score >= 90) return 'Elite (Stanford/MIT/Harvard)';
  if (score >= 80) return 'Strong (UC Berkeley/UCLA)';
  if (score >= 70) return 'Good (UC Davis/UCSD)';
  if (score >= 60) return 'Developing';
  return 'Needs Work';
}
