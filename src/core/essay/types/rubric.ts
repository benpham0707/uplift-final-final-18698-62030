// @ts-nocheck - Legacy type file with declaration conflicts
/**
 * Rubric Type Definitions for Essay Analysis
 *
 * Defines the structure of rubric dimensions, anchors, interaction rules,
 * and scoring logic for the Essay Quality Index (EQI).
 */

import { z } from "zod";
import { RubricDimensionName, RubricDimensionNames } from "./essay";

// ============================================================================
// RUBRIC DIMENSION DEFINITION
// ============================================================================

export const AnchorExampleSchema = z.object({
  score: z.number().min(0).max(10),
  text: z.string(),
  explanation: z.string().optional(),
});

export type AnchorExample = z.infer<typeof AnchorExampleSchema>;

export const RubricDimensionDefinitionSchema = z.object({
  name: z.enum(RubricDimensionNames),
  display_name: z.string(),
  definition: z.string(),
  weight: z.number().min(0).max(1), // as decimal (e.g., 0.12 for 12%)

  // Anchors for scoring (typically at 0, 5, 10)
  anchors: z.array(AnchorExampleSchema),

  // Evaluator prompts (questions to ask when scoring)
  evaluator_prompts: z.array(z.string()),

  // Writer prompts (questions to help student improve)
  writer_prompts: z.array(z.string()),

  // Warning signs (red flags to watch for)
  warning_signs: z.array(z.string()),

  // Dependencies (other dimensions this depends on)
  dependencies: z.array(z.enum(RubricDimensionNames)).default([]),
});

export type RubricDimensionDefinition = z.infer<typeof RubricDimensionDefinitionSchema>;

// ============================================================================
// INTERACTION RULE
// ============================================================================

export const InteractionRuleSchema = z.object({
  rule_id: z.string(),
  name: z.string(),
  description: z.string(),

  // Conditions (when this rule applies)
  conditions: z.array(z.object({
    dimension: z.enum(RubricDimensionNames),
    operator: z.enum(['<', '<=', '>', '>=', '==']),
    threshold: z.number(),
  })),

  // Effects (what happens when conditions are met)
  effects: z.array(z.object({
    dimension: z.enum(RubricDimensionNames),
    action: z.enum(['cap_max', 'boost', 'reduce', 'require_minimum']),
    value: z.number(),
    reason: z.string(),
  })),

  // Priority (higher priority rules apply first)
  priority: z.number().default(0),
});

export type InteractionRule = z.infer<typeof InteractionRuleSchema>;

// ============================================================================
// RUBRIC VERSION
// ============================================================================

export const RubricSchema = z.object({
  version: z.string(), // e.g., "v1.0.0"
  name: z.string(),
  description: z.string(),

  // All dimensions
  dimensions: z.array(RubricDimensionDefinitionSchema),

  // Interaction rules between dimensions
  interaction_rules: z.array(InteractionRuleSchema),

  // Impression labels (holistic score bands)
  impression_labels: z.array(z.object({
    label: z.enum([
      'arresting_deeply_human',
      'compelling_clear_voice',
      'competent_needs_texture',
      'readable_but_generic',
      'template_like_rebuild'
    ]),
    eqi_min: z.number(),
    eqi_max: z.number(),
    description: z.string(),
  })),

  // Metadata
  created_at: z.string().datetime(),
  author: z.string().default('System'),
  changelog: z.string().optional(),
});

export type Rubric = z.infer<typeof RubricSchema>;

// ============================================================================
// SCORING CONTEXT
// ============================================================================

export const ScoringContextSchema = z.object({
  essay_type: z.string(),
  is_why_us: z.boolean().default(false),
  has_target_school: z.boolean().default(false),
  has_context_constraints: z.boolean().default(false),
  word_count: z.number().int(),
  max_words: z.number().int(),
});

export type ScoringContext = z.infer<typeof ScoringContextSchema>;

// ============================================================================
// WEIGHT MAP (convenience type)
// ============================================================================

export type WeightMap = Record<RubricDimensionName, number>;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get weight map from rubric dimensions
 */
export function getWeightMap(dimensions: RubricDimensionDefinition[]): WeightMap {
  return dimensions.reduce((acc, dim) => {
    acc[dim.name] = dim.weight;
    return acc;
  }, {} as WeightMap);
}

/**
 * Validate that weights sum to 1.0 (or close to it)
 */
export function validateWeights(dimensions: RubricDimensionDefinition[]): boolean {
  const sum = dimensions.reduce((acc, dim) => acc + dim.weight, 0);
  return Math.abs(sum - 1.0) < 0.001; // allow tiny floating point error
}

/**
 * Get applicable dimensions for a given essay type
 * (Some dimensions like "School/Program Fit" only apply to certain types)
 */
export function getApplicableDimensions(
  dimensions: RubricDimensionDefinition[],
  essay_type: string
): RubricDimensionDefinition[] {
  // For now, all dimensions apply to all types
  // Except "school_program_fit" which only applies to "why_us" essays
  if (essay_type !== 'why_us') {
    return dimensions.filter(d => d.name !== 'school_program_fit');
  }
  return dimensions;
}

/**
 * Normalize weights for applicable dimensions
 * (If a dimension is excluded, redistribute its weight proportionally)
 */
export function normalizeWeights(
  dimensions: RubricDimensionDefinition[],
  applicable_dimensions: RubricDimensionDefinition[]
): WeightMap {
  const excluded_weight = dimensions
    .filter(d => !applicable_dimensions.includes(d))
    .reduce((acc, d) => acc + d.weight, 0);

  const included_total = applicable_dimensions.reduce((acc, d) => acc + d.weight, 0);

  // Redistribute excluded weight proportionally
  return applicable_dimensions.reduce((acc, dim) => {
    const proportion = dim.weight / included_total;
    acc[dim.name] = dim.weight + (excluded_weight * proportion);
    return acc;
  }, {} as WeightMap);
}

/**
 * Calculate EQI from dimension scores and weights
 */
export function calculateEQI(
  scores: Record<RubricDimensionName, number>,
  weights: WeightMap
): number {
  let weighted_sum = 0;
  let total_weight = 0;

  for (const [dim, weight] of Object.entries(weights)) {
    const score = scores[dim as RubricDimensionName] || 0;
    weighted_sum += score * weight;
    total_weight += weight;
  }

  // EQI is weighted average × 10 (to scale 0-10 scores to 0-100)
  const eqi = (weighted_sum / total_weight) * 10;

  // Round to 1 decimal place
  return Math.round(eqi * 10) / 10;
}

/**
 * Get impression label from EQI score
 */
export function getImpressionLabel(eqi: number): string {
  if (eqi >= 90) return 'arresting_deeply_human';
  if (eqi >= 80) return 'compelling_clear_voice';
  if (eqi >= 70) return 'competent_needs_texture';
  if (eqi >= 60) return 'readable_but_generic';
  return 'template_like_rebuild';
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  RubricSchema,
  RubricDimensionDefinitionSchema,
  InteractionRuleSchema,
  AnchorExampleSchema,
  ScoringContextSchema,
};
