/**
 * Comprehensive Insights System - Main Export
 *
 * This is the primary entry point for the insights system.
 * Import from here to access all insights functionality.
 *
 * Example usage:
 * ```typescript
 * import { generateCompleteInsights } from '@/services/workshop/insights';
 *
 * const insights = generateCompleteInsights(coachingOutput, draftText);
 * ```
 */

// Main orchestrator
export { generateCompleteInsights } from '../insightsAggregator';

// Type definitions
export type {
  InsightCard,
  DraftQuote,
  PointImpact,
  PatternAnalysis,
  ComparativeExample,
  Annotation,
  SolutionApproach,
  FocusModeContext,
  DimensionSummary,
  StrengthInsight,
  OpportunityInsight,
  PortfolioContributionInsights,
  InsightsState,
  SeverityCalculation,
  ExampleMatchCriteria,
  ChatPromptOptions,
} from '../insightTypes';

// Pattern detection
export { PATTERN_GROUPS, getPatternsForDimension, getPatternById } from '../issuePatterns';
export type { IssuePattern, PatternGroup } from '../issuePatterns';

// Comment out all exports - these functions are used internally only
// export {
//   extractQuotesFromDraft,
//   generatePatternAnalysis,
//   calculateDynamicSeverity,
//   calculatePointImpact,
//   matchComparativeExamples,
//   generateSolutionApproaches,
//   generateChatPrompt,
// };

// Strength & opportunity detection
export { detectStrengths, detectOpportunities } from '../strengthOpportunityDetector';

// Comment out unused exports - these functions are used internally only
// export {
//   groupInsightsByDimension,
//   generatePortfolioContributionInsights,
//   calculateTargetNQI,
//   calculatePotentialGain,
// } from '../insightsAggregator';
