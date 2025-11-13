// @ts-nocheck - Legacy workshop file with type mismatches
/**
 * Workshop API Mock Implementation
 *
 * Provides realistic mock data for development until backend is connected.
 * Returns properly structured AnalysisResult matching the backend types.
 */

import type {
  AnalysisResult,
  AnalysisReport,
  RubricCategoryScore,
  RubricCategory,
  AuthenticityAnalysis,
  ElitePatternAnalysis,
  LiterarySophisticationAnalysis,
  CoachingOutput,
} from './backendTypes';
import type { ExtracurricularItem } from '../ExtracurricularCard';

// Helper to generate realistic scores
function generateCategoryScore(
  category: RubricCategory,
  baseScore: number
): RubricCategoryScore {
  const score = baseScore + (Math.random() * 2 - 1); // Add some variance
  const maxScore = 10;

  return {
    name: category,
    category, // Backwards compatibility
    score_0_to_10: Math.max(0, Math.min(maxScore, score)),
    score: Math.max(0, Math.min(maxScore, score)), // Backwards compatibility
    maxScore, // Backwards compatibility
    weight: 0.09,
    evaluator_notes: `This ${category.split('_').join(' ')} shows promise but has room for improvement.`,
    comments: `This ${category.split('_').join(' ')} shows promise but has room for improvement.`, // Backwards compatibility
    evidence: ['Example excerpt from your essay...'], // Backwards compatibility
    strengths: ['The foundation is solid'],
    weaknesses: ['More specificity would strengthen it'],
    suggestions: [ // Backwards compatibility
      `Add more concrete details to strengthen your ${category.split('_').join(' ')}.`,
      'Consider adding specific examples or metrics.',
      'Show more depth in this dimension.'
    ]
  };
}

export async function analyzeEntryMock(
  description: string,
  activity: ExtracurricularItem
): Promise<AnalysisResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const wordCount = description.split(/\s+/).length;
  const baseScore = Math.min(8, 5 + (wordCount / 100)); // Score based on length

  // Generate 11 category scores
  const categories: RubricCategoryScore[] = [
    generateCategoryScore('voice_integrity', baseScore + 1),
    generateCategoryScore('specificity_evidence', baseScore - 1),
    generateCategoryScore('transformative_impact', baseScore - 0.5),
    generateCategoryScore('role_clarity_ownership', baseScore + 0.5),
    generateCategoryScore('narrative_arc_stakes', baseScore),
    generateCategoryScore('initiative_leadership', baseScore + 0.5),
    generateCategoryScore('community_collaboration', baseScore - 0.5),
    generateCategoryScore('reflection_meaning', baseScore - 1),
    generateCategoryScore('craft_language_quality', baseScore + 0.5),
    generateCategoryScore('fit_trajectory', baseScore),
    generateCategoryScore('time_investment_consistency', baseScore + 1),
  ];

  // Calculate NQI (weighted average)
  const weights: Record<string, number> = {
    voice_integrity: 0.10,
    specificity_evidence: 0.09,
    transformative_impact: 0.12,
    role_clarity_ownership: 0.08,
    narrative_arc_stakes: 0.10,
    initiative_leadership: 0.10,
    community_collaboration: 0.08,
    reflection_meaning: 0.12,
    craft_language_quality: 0.07,
    fit_trajectory: 0.07,
    time_investment_consistency: 0.07,
  };

  let nqi = 0;
  categories.forEach((cat) => {
    nqi += (cat.score / cat.maxScore) * 100 * (weights[cat.category] || 0.09);
  });

  const analysis: AnalysisReport = {
    id: `analysis-${Date.now()}`,
    entry_id: activity.id,
    rubric_version: '1.0.0',
    created_at: new Date().toISOString(),
    categories,
    weights,
    narrative_quality_index: Math.round(nqi),
    reader_impression_label: nqi >= 85 ? 'captivating_grounded' : nqi >= 75 ? 'strong_distinct_voice' : nqi >= 65 ? 'solid_needs_polish' : 'generic_unclear',
    flags: nqi < 70 ? ['Needs more specificity', 'Add concrete examples'] : [],
    suggested_fixes_ranked: [
      'Add specific metrics and numbers',
      'Show vulnerability or challenges faced',
      'Include dialogue or direct quotes',
      'Demonstrate community transformation',
      'Deepen your reflection on meaning'
    ],
    analysis_depth: 'comprehensive',
  };

  const authenticity: AuthenticityAnalysis = {
    authenticity_score: Math.max(6, Math.min(10, baseScore + 1)),
    voice_type: 'conversational',
    red_flags: wordCount < 100 ? ['Essay may be too brief'] : [],
    green_flags: ['Natural voice', 'Authentic tone'],
    manufactured_signals: [],
    authenticity_markers: ['Personal perspective', 'Genuine experience'],
    assessment: 'Voice feels authentic and personal',
  };

  const elitePatterns: ElitePatternAnalysis = {
    overallScore: Math.round(nqi * 0.8), // Elite patterns slightly lower than NQI
    tier: nqi >= 85 ? 1 : nqi >= 75 ? 2 : 3,
    vulnerability: {
      score: Math.max(0, Math.min(10, baseScore - 1)),
      hasPhysicalSymptoms: false,
      hasNamedEmotions: false,
      hasBeforeAfter: false,
      examples: [],
    },
    dialogue: {
      score: Math.max(0, Math.min(10, baseScore - 2)),
      hasDialogue: false,
      isConversational: true,
      revealsCharacter: false,
      examples: [],
    },
    communityTransformation: {
      score: Math.max(0, Math.min(10, baseScore - 1)),
      hasContrast: false,
      hasBefore: false,
      hasAfter: false,
    },
    quantifiedImpact: {
      score: Math.max(0, Math.min(10, baseScore)),
      hasMetrics: wordCount > 150,
      metrics: [],
      plausibilityScore: 7,
    },
    microToMacro: {
      score: Math.max(0, Math.min(10, baseScore - 2)),
      hasUniversalInsight: false,
      transcendsActivity: false,
    },
    strengths: ['Authentic voice', 'Clear activity description'],
    gaps: ['Add specific metrics', 'Show vulnerability', 'Demonstrate transformation'],
  };

  const literarySophistication: LiterarySophisticationAnalysis = {
    overallScore: Math.round(nqi * 0.7),
    tier: nqi >= 85 ? 1 : nqi >= 70 ? 2 : 3,
    extendedMetaphor: {
      score: Math.max(0, Math.min(20, baseScore * 2 - 4)),
      hasMetaphor: false,
      consistency: 0,
      references: [],
    },
    structuralInnovation: {
      score: Math.max(0, Math.min(15, baseScore * 1.5 - 2)),
      innovations: [],
      techniques: [],
    },
    sentenceRhythm: {
      score: Math.max(0, Math.min(15, baseScore * 1.5)),
      hasVariety: true,
      veryShortCount: 0,
      shortCount: 0,
      longCount: 0,
    },
    sensoryImmersion: {
      score: Math.max(0, Math.min(15, baseScore * 1.5 - 2)),
      senseCount: 2,
      senses: ['sight', 'sound'],
      examples: [],
    },
    activeVoice: {
      score: Math.max(0, Math.min(10, baseScore + 1)),
      dominance: 0.75,
      passiveCount: 5,
      activeCount: 20,
    },
    strengths: [],
    improvements: [],
  };

  const coaching: CoachingOutput = {
    overall: {
      current_nqi: Math.round(nqi),
      target_nqi: 85,
      potential_gain: 85 - Math.round(nqi),
      total_issues: 2,
    },
    prioritized_issues: [
      {
        id: 'issue-1',
        category: 'specificity_evidence',
        severity: 'critical',
        title: 'Add Quantified Impact',
        problem: 'Missing specific metrics',
        why_it_matters: 'Costing you 3-5 points',
        suggested_fixes: [
          {
            text: 'Add specific numbers',
            rationale: 'Makes impact concrete',
            type: 'insert_after',
            impact_estimate: '+3-5 points',
          }
        ],
        examples: [],
        priority_rank: 1,
      },
      {
        id: 'issue-2',
        category: 'reflection_meaning',
        severity: 'major',
        title: 'Deepen Reflection',
        problem: 'Surface-level meaning',
        why_it_matters: 'Costing you 2-4 points',
        suggested_fixes: [
          {
            text: 'Show what you learned',
            rationale: 'Reveals growth',
            type: 'insert_after',
            impact_estimate: '+2-4 points',
          }
        ],
        examples: [],
        priority_rank: 2,
      },
    ],
    quick_wins: [
      {
        action: 'Add specific numbers',
        impact: '+3-5 points',
        effort: 'low',
      },
    ],
    strategic_guidance: {
      strengths_to_maintain: ['Clear role description'],
      critical_gaps: ['specificity_evidence', 'reflection_meaning'],
      next_steps: ['Add metrics', 'Deepen reflection'],
    },
  };

  return {
    report: analysis,
    analysis, // Backwards compatibility
    features: {
      word_count: wordCount,
      voice: {
        active_verb_count: 20,
        passive_verb_count: 5,
        first_person_count: 10,
        buzzword_count: 2,
        passive_ratio: 0.2,
        sentence_variety_score: 0.7,
      },
      evidence: {
        number_count: 3,
        has_concrete_numbers: true,
        metric_specificity_score: 0.6,
      },
      arc: {
        has_stakes: false,
        has_turning_point: false,
        temporal_markers: [],
      },
      collaboration: {
        we_usage_count: 5,
        credit_given: true,
      },
      reflection: {
        reflection_quality: 'superficial',
      },
    },
    coaching,
    authenticity,
    performance: {
      stage1_ms: 100,
      stage2_ms: 150,
      stage3_ms: 200,
      stage4_ms: 50,
      total_ms: 500,
    },
  };
}
