/**
 * Portfolio Scanner Types
 *
 * Core TypeScript interfaces for the UC-focused portfolio analysis system
 */

// ============================================================================
// INPUT: Portfolio Data Structure
// ============================================================================

export interface PortfolioData {
  // Student Profile
  profile: {
    student_id: string;
    grade: 9 | 10 | 11 | 12;
    graduation_year: number;
    school_name: string;
    school_type: 'public' | 'private' | 'charter' | 'international';
    state: string;
    is_california_resident: boolean;  // UC-specific
  };

  // Academic Record
  academic: {
    // GPAs
    gpa_unweighted: number;  // 0-4.0 scale
    gpa_weighted: number;    // UC-weighted (capped at 8 semesters of honors/AP)
    gpa_fully_weighted: number;  // Uncapped weighted
    gpa_scale: 4.0 | 5.0;
    class_rank?: number;
    class_size?: number;

    // Coursework
    coursework_rigor: string;  // Description
    advanced_courses: Array<{
      name: string;
      type: 'AP' | 'IB' | 'Honors' | 'College' | 'DE';  // DE = Dual Enrollment
      grade_level: number;
      grade?: string;
      is_uc_honors_certified?: boolean;  // UC-specific
    }>;

    // a-g Requirements (UC-specific)
    ag_requirements: {
      completed: boolean;
      courses_beyond_minimum: number;  // UC tracks this
    };

    // Honors & Awards
    honors: string[];

    // Test Scores (not used by UCs but included for completeness)
    test_scores?: {
      sat?: { total: number; math: number; ebrw: number; };
      act?: { composite: number; };
      ap_exams?: Array<{ subject: string; score: number; }>;
    };
  };

  // Extracurricular Activities
  experiences: {
    activities: Array<{
      id: string;
      name: string;
      category: 'service' | 'leadership' | 'arts' | 'stem' | 'athletics' | 'work' | 'academic_prep' | 'other';
      role: string;
      description: string;
      impact: string;
      years_involved: number;
      hours_per_week: number;
      weeks_per_year: number;
      grade_levels: number[];  // [9, 10, 11, 12]
      leadership_positions?: string[];
      awards?: string[];
      is_paid_work?: boolean;  // UC values work experience
    }>;
  };

  // PIQ/Essay Analysis (from existing PIQ workshop system)
  writing_analysis: {
    piqs: Array<{
      prompt_number: number;  // 1-8 (UC PIQ prompts)
      prompt_title: string;
      essay_text: string;
      word_count: number;
      narrative_quality_index: number;  // 0-100 from PIQ analyzer
      reader_impression: string;
      top_strengths: string[];
      top_gaps: string[];
      authenticity_score: number;  // 0-10
      voice_type: 'conversational' | 'essay' | 'factual' | 'robotic';
    }>;
    overall_writing_quality: number;  // Averaged NQI
  };

  // Personal Context (heavily weighted at UCs)
  personal_context: {
    background: {
      first_gen: boolean;
      low_income: boolean;  // Based on family income
      english_learner: boolean;
      underrepresented_minority: boolean;
      geographic_diversity: boolean;  // Rural, underserved region
    };
    family_responsibilities: {
      has_responsibilities: boolean;
      description?: string;
      hours_per_week?: number;
    };
    challenges_overcome: string[];
    unique_circumstances: string;
    school_context: {
      total_aps_offered: number;
      counselor_ratio?: number;
      free_reduced_lunch_percentage?: number;
    };
  };

  // Goals & Aspirations
  goals: {
    intended_major: string;
    alternative_majors: string[];
    why_major: string;
    career_goals: string;
    target_uc_campuses: UCCampus[];  // UC-specific
  };

  // Timeline
  timeline: {
    created_at: string;
    last_updated: string;
  };
}

// ============================================================================
// UC-Specific Types
// ============================================================================

export type UCCampus =
  | 'UC Berkeley'
  | 'UCLA'
  | 'UC San Diego'
  | 'UC Irvine'
  | 'UC Davis'
  | 'UC Santa Barbara'
  | 'UC Santa Cruz'
  | 'UC Riverside'
  | 'UC Merced';

export type UCEvaluationMode =
  | 'berkeley'     // UC Berkeley-specific weights & calibration
  | 'ucla'         // UCLA-specific weights & calibration
  | 'general_uc';  // General UC system

// ============================================================================
// ANALYSIS OUTPUT: Dimension Analysis Structures
// ============================================================================

export interface DimensionAnalysis {
  score: number;  // 0-10 (one decimal)
  tier: 'exceptional' | 'strong' | 'developing' | 'foundational';

  reasoning: {
    [key: string]: string;  // Dimension-specific reasoning fields
  };

  tier_evaluation: {
    current_tier: string;
    next_tier: string;
    tier_reasoning: string;
  };

  strengths: Array<{
    strength: string;
    evidence: string[];
    rarity_factor: 'Top 1-5%' | 'Top 10-20%' | 'Top 25-40%' | 'Common';
  }>;

  growth_areas: Array<{
    gap: string;
    severity: 'critical' | 'important' | 'helpful';
    rationale: string;
  }>;

  strategic_pivot: string;  // The "Invisible Ceiling" recommendation

  comparative_context: {
    vs_typical_uc_applicant: string;
    vs_top_10_percent: string;
    uc_campus_alignment: string;  // Which UCs this matches
  };

  confidence: number;  // 0-1
}

// Specific dimension analyses
export interface AcademicExcellenceAnalysis extends DimensionAnalysis {
  reasoning: {
    rigor_analysis: string;
    performance_analysis: string;
    uc_gpa_analysis: string;  // UC-weighted GPA specific
    distinction_analysis: string;
    trajectory_analysis: string;
  };
}

export interface LeadershipInitiativeAnalysis extends DimensionAnalysis {
  reasoning: {
    initiative_analysis: string;
    leadership_progression: string;
    impact_analysis: string;
    scale_analysis: string;
  };
}

export interface IntellectualCuriosityAnalysis extends DimensionAnalysis {
  reasoning: {
    exploration_analysis: string;
    depth_analysis: string;
    independence_analysis: string;
    research_analysis: string;
  };
}

export interface CommunityImpactAnalysis extends DimensionAnalysis {
  reasoning: {
    service_analysis: string;
    impact_analysis: string;
    commitment_analysis: string;
    beneficiary_analysis: string;
  };
}

export interface AuthenticityVoiceAnalysis extends DimensionAnalysis {
  reasoning: {
    piq_quality_analysis: string;  // UC PIQs specific
    voice_consistency: string;
    passion_authenticity: string;
    uc_fit_demonstration: string;
  };
}

export interface FutureReadinessAnalysis extends DimensionAnalysis {
  reasoning: {
    goal_clarity: string;
    preparation: string;
    trajectory: string;
    uc_campus_fit: string;
  };
}

// ============================================================================
// Stage 1: Holistic Understanding
// ============================================================================

export interface HolisticPortfolioUnderstanding {
  // Central narrative thread
  central_thread: {
    narrative: string;
    signature_elements: string[];
    thematic_coherence: 'strong' | 'moderate' | 'weak';
  };

  // UC competitiveness assessment
  uc_competitiveness: {
    academic_standing: 'exceptional' | 'competitive' | 'below_benchmark';
    gpa_percentile: '75th+' | '50th-75th' | '25th-50th' | 'below_25th';
    course_rigor_assessment: string;
    piq_quality_preview: 'distinctive' | 'strong' | 'adequate' | 'weak';
    overall_fit: 'strong_match' | 'possible_match' | 'reach';
  };

  // Context factors (heavily weighted at UCs)
  context_factors: {
    first_generation: {
      applies: boolean;
      impact: string;
    };
    low_income: {
      applies: boolean;
      impact: string;
    };
    under_resourced_school: {
      applies: boolean;
      impact: string;
    };
    other_context: string;
  };

  // Hidden strengths (rare combinations admissions notices)
  hidden_strengths: Array<{
    strength: string;
    rarity: 'Top 1-5%' | 'Top 5-10%' | 'Top 10-20%';
    why_valuable: string;
    evidence: string;
  }>;

  // Red flags
  red_flags: Array<{
    concern: string;
    severity: 'critical' | 'moderate' | 'minor';
    explanation: string;
    mitigation: string;
  }>;

  // UC tier recommendation
  uc_tier_recommendation: {
    tier: 'top_ucs' | 'mid_tier_ucs' | 'all_ucs';
    target_campuses: string[];
    rationale: string;
    stretch_campuses: string[];
    safety_campuses: string[];
  };

  // Key insights for dimension analyzers
  key_insights: string[];

  // Legacy fields for backward compatibility
  overallFirstImpression?: string;
  centralThread?: string;
  signatureElements?: string[];
  redFlags?: string[];
  authenticityAssessment?: string;
  comparativeTier?: 'Top 5%' | 'Top 10-15%' | 'Top 25-30%' | 'Top 50%' | 'Below 50%';
  initialStrengthScore?: number;
  keyStrengths?: string[];
  keyGaps?: string[];

  ucSpecificAssessment?: {
    uc_gpa_competitiveness: string;
    piq_quality_preview: string;
    context_factors: string[];
    recommended_uc_tier: 'Top UCs (Berkeley/UCLA)' | 'Mid-tier UCs' | 'All UCs';
  };

  intellectualCoherence?: {
    score: number;
    explanation: string;
  };

  depthVsBreadth?: {
    assessment: 'Focused depth' | 'Balanced' | 'Scattered breadth';
    explanation: string;
  };

  impactOrientation?: {
    score: number;
    explanation: string;
  };

  confidence?: number;
}

// ============================================================================
// Stage 2: All Dimension Analyses
// ============================================================================

export interface DimensionAnalyses {
  academicExcellence: AcademicExcellenceAnalysis;
  leadershipInitiative: LeadershipInitiativeAnalysis;
  intellectualCuriosity: IntellectualCuriosityAnalysis;
  communityImpact: CommunityImpactAnalysis;
  authenticityVoice: AuthenticityVoiceAnalysis;
  futureReadiness: FutureReadinessAnalysis;

  metadata: {
    duration_ms: number;
    llm_calls: number;
  };
}

// ============================================================================
// Stage 3: Synthesis
// ============================================================================

export interface PortfolioSynthesis {
  overallScore: number;  // 0-10

  profileArchetype:
    | 'Scholar'           // High academics + intellectual curiosity (Berkeley fit)
    | 'Leader'            // High leadership + community (UCLA fit)
    | 'Well-Rounded'      // Balanced across dimensions (UCLA fit)
    | 'Specialist'        // Exceptional in 1-2, solid in others
    | 'Emerging';         // Still developing

  archetypeExplanation: string;
  narrativeSummary: string;  // 3-4 sentence holistic story

  hiddenStrengths: Array<{
    strength: string;
    evidence: string[];
    rarityFactor: 'Top 1-5%' | 'Top 5-10%' | 'Top 15-25%' | 'Common';
    whyItMatters: string;
  }>;

  dimensionalInteractions: {
    synergies: string[];    // Dimensions that reinforce each other
    tensions: string[];     // Dimensions that seem inconsistent
    overallCoherence: number;  // 0-10
  };

  comparativeBenchmarking: {
    vsTypicalUCApplicant: string;
    vsTop10PercentUC: string;
    competitiveAdvantages: string[];
    competitiveWeaknesses: string[];
    percentileEstimate: 'Top 1-5%' | 'Top 5-10%' | 'Top 10-20%' | 'Top 25-40%' | 'Top 50%';
  };

  ucCampusAlignment: {
    topTierUCs: {  // Berkeley, UCLA
      fitScore: number;  // 0-10
      rationale: string;
      specificCampuses: Array<{
        campus: UCCampus;
        fitScore: number;
        reasoning: string;
      }>;
    };
    midTierUCs: {  // UCSD, UCI, UCD, UCSB
      fitScore: number;
      rationale: string;
      campuses: UCCampus[];
    };
    allUCs: {
      likelyAdmits: UCCampus[];
      possibleAdmits: UCCampus[];
      reaches: UCCampus[];
    };
  };

  admissionsOfficerPerspective: {
    first10Seconds: string;      // Will UC reader keep reading?
    memorability: string;         // Will they remember in 2 hours?
    likelyReaction: string;       // Excited, interested, neutral, skeptical
    ucSpecificAppeal: string;     // What appeals to UC mission/values
  };

  // Enhanced transparency fields
  scoreBreakdownTransparency?: {
    formulaApplied: string;  // Shows the weighting formula used
    dimensionContributions: Array<{
      dimension: string;
      rawScore: number;      // The dimension's score (e.g., 8.5)
      weight: number;        // The weight applied (e.g., 0.35 for 35%)
      contribution: number;  // rawScore × weight
      rationale: string;     // Why this dimension got this score
    }>;
    overallCalculation: string;  // Step-by-step calculation
  };

  keyInsights?: string[];  // 3-5 critical takeaways

  evidenceToInsightTracing?: Array<{
    dataPoint: string;      // Specific data from portfolio
    analysis: string;       // How we interpreted it
    insight: string;        // What it means for UC admissions
    weightInDecision: 'critical' | 'important' | 'supplementary';
  }>;

  confidence: number;
}

// ============================================================================
// Stage 4: Strategic Guidance
// ============================================================================

export interface StrategicGuidance {
  prioritizedRecommendations: Array<{
    priority: 1 | 2 | 3;  // 1=Critical, 2=Important, 3=Helpful
    dimension: string;
    recommendation: string;
    rationale: string;
    timeline: string;       // When to do (grade-specific)
    estimatedImpact: string;  // e.g., "+1.5 points in Academic Excellence"
    difficultyLevel: 'easy' | 'moderate' | 'challenging';
    specificSteps: string[];
    successMetrics?: {
      measurableGoal: string;      // e.g., "Increase GPA to 3.9"
      verificationMethod: string;   // e.g., "Check transcript after semester"
      deadline: string;             // e.g., "End of fall semester (Dec 2024)"
    };
    ucRelevance: string;    // Why this matters for UCs specifically
  }>;

  gradeByGradeRoadmap?: {
    grade9?: { focus: string; keyActions: string[]; };
    grade10?: { focus: string; keyActions: string[]; };
    grade11?: { focus: string; keyActions: string[]; };
    grade12?: { focus: string; keyActions: string[]; };
  };

  targetOutcomes: {
    shortTerm: {
      timeline: string;  // "3-6 months"
      goals: string[];
      expectedScoreChange: string;
    };
    mediumTerm: {
      timeline: string;  // "6-12 months"
      goals: string[];
      expectedScoreChange: string;
    };
    longTerm: {
      timeline: string;  // "1-2 years"
      goals: string[];
      expectedScoreChange: string;
    };
  };

  criticalWarnings: string[];  // Things to avoid
  aspirationalTarget: string;  // Best-case scenario if all implemented
}

// ============================================================================
// COMPLETE OUTPUT: Portfolio Analysis Result
// ============================================================================

export interface PortfolioAnalysisResult {
  // Metadata
  analysis_id: string;
  portfolio_id: string;
  analysis_version: string;  // 'v1.0.0'
  created_at: string;
  uc_evaluation_mode: UCEvaluationMode;  // Which UC calibration used

  // Stage 1: Holistic Understanding
  holistic: HolisticPortfolioUnderstanding;

  // Stage 2: Dimension Deep Dive
  dimensions: DimensionAnalyses;

  // Stage 3: Synthesis
  synthesis: PortfolioSynthesis;

  // Stage 4: Strategic Guidance
  guidance: StrategicGuidance;

  // Performance Metrics
  performance: {
    total_duration_ms: number;
    stage_durations: {
      stage1_holistic_ms: number;
      stage2_dimensions_ms: number;
      stage3_synthesis_ms: number;
      stage4_guidance_ms: number;
    };
    llm_calls: number;
    total_tokens: number;
    cost_usd: number;
  };

  // Engine Info
  engine: 'sophisticated_multilayer_v1' | 'heuristic_fallback';
  confidence: number;  // Overall confidence (0-1)
}

// ============================================================================
// Analysis Options
// ============================================================================

export interface AnalysisOptions {
  depth: 'quick' | 'standard' | 'comprehensive';
  uc_mode: UCEvaluationMode;  // Which UC calibration to use
  include_synthesis: boolean;
  include_guidance: boolean;
  focus_dimensions?: string[];  // Optional: only analyze specific dimensions
}

// ============================================================================
// Dimension Weights (UC-Specific)
// ============================================================================

export interface DimensionWeights {
  academicExcellence: number;
  intellectualCuriosity: number;
  leadershipInitiative: number;
  communityImpact: number;
  authenticityVoice: number;
  futureReadiness: number;
}

// UC Berkeley weights
export const UC_BERKELEY_WEIGHTS: DimensionWeights = {
  academicExcellence: 0.35,
  intellectualCuriosity: 0.25,
  authenticityVoice: 0.20,
  leadershipInitiative: 0.15,
  communityImpact: 0.03,
  futureReadiness: 0.02,
};

// UCLA weights
export const UCLA_WEIGHTS: DimensionWeights = {
  authenticityVoice: 0.30,       // PIQs are huge
  academicExcellence: 0.30,      // Co-equal
  communityImpact: 0.20,         // "Bruin values"
  leadershipInitiative: 0.15,
  intellectualCuriosity: 0.03,
  futureReadiness: 0.02,
};

// General UC weights
export const GENERAL_UC_WEIGHTS: DimensionWeights = {
  academicExcellence: 0.40,
  authenticityVoice: 0.20,
  leadershipInitiative: 0.15,
  communityImpact: 0.10,
  intellectualCuriosity: 0.10,
  futureReadiness: 0.05,
};

// Helper to get weights for specific UC mode
export function getWeightsForMode(mode: UCEvaluationMode): DimensionWeights {
  switch (mode) {
    case 'berkeley':
      return UC_BERKELEY_WEIGHTS;
    case 'ucla':
      return UCLA_WEIGHTS;
    case 'general_uc':
      return GENERAL_UC_WEIGHTS;
    default:
      return GENERAL_UC_WEIGHTS;
  }
}
