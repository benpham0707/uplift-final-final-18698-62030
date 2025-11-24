// @ts-nocheck - Service file with type mismatches
/**
 * Extracurricular Analysis API Service
 *
 * Calls the backend analysis engine for extracurricular narratives
 */

import { ExperienceEntry } from '@/core/types/experience';

// Use Supabase edge function for analysis
const API_BASE_URL = import.meta.env.VITE_SUPABASE_URL || '';

/**
 * Analyze an extracurricular entry and get coaching feedback
 */
export async function analyzeExtracurricular(
  entry: ExperienceEntry,
  options: {
    depth?: 'quick' | 'standard' | 'comprehensive';
    skip_coaching?: boolean;
  } = {}
): Promise<AnalysisResponse> {
  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout to avoid long UI hangs

  console.log('[extracurricularAnalysis] Starting API call to backend...');
  console.log('[extracurricularAnalysis] Timeout set to 30 seconds');

  try {
    const response = await fetch(`${API_BASE_URL}/functions/v1/workshop-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        entry,
        options: {
          depth: options.depth || 'comprehensive',
          skip_coaching: options.skip_coaching || false,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('[extracurricularAnalysis] Response received!', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Analysis failed' }));
      console.error('[extracurricularAnalysis] API error:', error);
      throw new Error(error.message || `Analysis failed with status ${response.status}`);
    }

    const result = await response.json();

    // Backend returns {success: true, result: {report, authenticity, coaching}}
    // Unwrap the nested structure
    const unwrapped = result.success ? result.result : result;

    console.log('[extracurricularAnalysis] SUCCESS! NQI:', unwrapped.report.narrative_quality_index);
    return unwrapped;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[extracurricularAnalysis] TIMEOUT after 30 seconds');
      throw new Error('Analysis timed out. Please try again.');
    }
    console.error('[extracurricularAnalysis] Error:', error);
    throw error;
  }
}

/**
 * Mock analysis for development (calls backend directly via TypeScript import)
 *
 * This is a temporary solution until we have a proper API endpoint
 */
export async function analyzeExtracurricularDirect(
  entry: ExperienceEntry,
  options: {
    depth?: 'quick' | 'standard' | 'comprehensive';
    skip_coaching?: boolean;
  } = {}
): Promise<AnalysisResponse> {
  // Dynamic import to avoid bundling backend code in frontend
  const { analyzeEntry } = await import('@/core/analysis/engine');

  const result = await analyzeEntry(entry, {
    depth: options.depth || 'quick',
    skip_coaching: options.skip_coaching || false,
  });

  // Map backend result to frontend API response format
  return {
    report: {
      narrative_quality_index: result.report.narrative_quality_index,
      reader_impression_label: result.report.reader_impression_label,
      categories: result.report.categories.map(cat => ({
        name: cat.name,
        score_0_to_10: cat.score_0_to_10,
        evidence_snippets: cat.evidence_snippets,
        evaluator_notes: cat.evaluator_notes,
      })),
      flags: result.report.flags,
      suggested_fixes_ranked: result.report.suggested_fixes_ranked,
    },
    authenticity: {
      authenticity_score: result.authenticity.authenticity_score,
      voice_type: result.authenticity.voice_type,
      red_flags: result.authenticity.red_flags,
      green_flags: result.authenticity.green_flags,
    },
    coaching: result.coaching,
    performance: {
      total_ms: result.performance.total_ms,
    },
  };
}

/**
 * Choose which analysis method to use based on environment
 */
// Only use direct import when running on the server in development.
// In the browser, always use the API to avoid bundling backend code and env usage.
const IS_BROWSER = typeof window !== 'undefined';
const IS_DEV = (import.meta as any)?.env?.DEV === true;

export const analyzeExtracurricularEntry =
  !IS_BROWSER && IS_DEV
    ? analyzeExtracurricularDirect
    : analyzeExtracurricular;
