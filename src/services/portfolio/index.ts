/**
 * Portfolio Scanner Service - Main Export
 *
 * UC-focused holistic portfolio analysis system
 * Calibrated to UC Berkeley, UCLA, and general UC admissions standards
 *
 * Usage:
 * ```typescript
 * import { analyzePortfolio, analyzePortfolioQuick } from '@/services/portfolio';
 *
 * // Full analysis
 * const result = await analyzePortfolio(portfolioData, {
 *   uc_mode: 'berkeley',
 *   depth: 'comprehensive',
 *   include_synthesis: true,
 *   include_guidance: true,
 * });
 *
 * // Quick analysis (no guidance)
 * const quickResult = await analyzePortfolioQuick(portfolioData, 'ucla');
 * ```
 */

// Main service
export {
  analyzePortfolio,
  analyzePortfolioQuick,
} from './portfolioScannerService';

// Types
export type {
  PortfolioData,
  PortfolioAnalysisResult,
  UCEvaluationMode,
  AnalysisOptions,
  HolisticPortfolioUnderstanding,
  DimensionAnalyses,
  PortfolioSynthesis,
  StrategicGuidance,
  UCCampus,
  DimensionWeights,
  AcademicExcellenceAnalysis,
  LeadershipInitiativeAnalysis,
  IntellectualCuriosityAnalysis,
  CommunityImpactAnalysis,
  AuthenticityVoiceAnalysis,
  FutureReadinessAnalysis,
} from './types';

// Dimension weights helpers
export {
  UC_BERKELEY_WEIGHTS,
  UCLA_WEIGHTS,
  GENERAL_UC_WEIGHTS,
  getWeightsForMode,
} from './types';

// Calibration constants (for testing/reference)
export {
  UC_BERKELEY_GPA_BENCHMARKS,
  UCLA_GPA_BENCHMARKS,
  GENERAL_UC_GPA_BENCHMARKS,
  ACADEMIC_EXCELLENCE_TIERS,
  LEADERSHIP_TIERS,
  INTELLECTUAL_CURIOSITY_TIERS,
  COMMUNITY_IMPACT_TIERS,
  PIQ_AUTHENTICITY_TIERS,
  UC_CONTEXT_ADJUSTMENTS,
  UC_COMPREHENSIVE_REVIEW_FACTORS,
  UC_CAMPUS_PROFILES,
  getUCGPABenchmark,
  isCompetitiveGPA,
} from './constants/ucCalibration';

// Data transformation utilities
export {
  transformDatabaseToPortfolioData,
  fetchCompletePortfolioData,
  fetchAndTransformPortfolioData,
  listCollectedDataFields,
  type CompletePortfolioData,
  type DatabaseProfile,
  type DatabasePersonalInfo,
  type DatabaseAcademicJourney,
  type DatabaseExperiences,
  type DatabaseActivity,
  type DatabaseFamilyResponsibilities,
  type DatabaseGoalsAspirations,
  type DatabasePersonalGrowth,
  type DatabaseSupportNetwork,
} from './utils';

// Direct database analysis function
export { analyzePortfolioFromDatabase } from './portfolioScannerService';
