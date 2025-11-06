/**
 * ΔEQI Simulator
 *
 * Simulates projected EQI changes from improving individual dimensions.
 * Respects interaction rules and dependency caps.
 *
 * PURPOSE:
 * Help writers prioritize edits by showing which improvements yield highest EQI gains.
 *
 * ALGORITHM:
 * 1. For each dimension, simulate +2 improvement (or to max 10)
 * 2. Recalculate all affected dimensions via interaction rules
 * 3. Calculate new EQI
 * 4. Return ΔEQI (new - current)
 * 5. Sort by ΔEQI descending
 *
 * INTERACTION RULES:
 * - scene_reflection: Low scene caps reflection at 8
 * - scene_interiority: Low scene caps interiority at 8
 * - fit_ceiling: Low fit caps fit at 6
 * - context_originality: Low context caps originality at 8
 * - interiority_arc: High interiority + reflection boosts arc
 * - humility_eqi: Low humility reduces arc
 * - opening_engagement: Weak opening reduces structure
 *
 * These rules create DEPENDENCIES where improving one dimension can unlock others.
 */

import { RUBRIC_V1_0_1 } from '../rubrics/v1.0.1';
import { RubricDimensionScore, InteractionRule } from '../types/rubric';
import { DimensionScoreResult } from './features/rubricScorer';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EQISimulation {
  /** Dimension being improved */
  dimension_name: string;

  /** Display name */
  dimension_display_name: string;

  /** Current score (0-10) */
  current_score: number;

  /** Simulated new score (current + 2, capped at 10) */
  simulated_score: number;

  /** Current EQI (0-100) */
  current_eqi: number;

  /** Projected new EQI (0-100) */
  projected_eqi: number;

  /** ΔEQI (projected - current) */
  delta_eqi: number;

  /** Dimension weight (0-1) */
  weight: number;

  /** Was this improvement capped by dependency rules? */
  capped_by_dependency: boolean;

  /** Which dimensions were affected by rules? */
  cascading_effects: Array<{
    affected_dimension: string;
    rule_applied: string;
    score_change: number; // Negative if reduced, positive if boosted
  }>;

  /** Recommendation */
  recommendation: string;
}

export interface EQISimulationReport {
  /** Current overall EQI */
  current_eqi: number;

  /** All dimension simulations */
  simulations: EQISimulation[];

  /** Top 3 highest-impact improvements */
  top_improvements: EQISimulation[];

  /** Dependency unlock opportunities */
  dependency_unlocks: Array<{
    blocked_dimension: string;
    blocking_dimension: string;
    rule_name: string;
    potential_gain: number;
  }>;

  /** Overall strategy recommendation */
  strategy: string;
}

// ============================================================================
// SIMULATION HELPERS
// ============================================================================

/**
 * Calculate EQI from dimension scores
 */
function calculateEQI(scores: Map<string, number>): number {
  let weightedSum = 0;

  RUBRIC_V1_0_1.dimensions.forEach(dim => {
    const score = scores.get(dim.name) || 0;
    weightedSum += score * dim.weight;
  });

  return Math.round(weightedSum * 10 * 10) / 10; // 0-100 scale, 1 decimal
}

/**
 * Apply interaction rules to score map
 */
function applyInteractionRules(
  scores: Map<string, number>,
  rules: InteractionRule[]
): {
  finalScores: Map<string, number>;
  cascadingEffects: Map<string, Array<{ rule: string; score_change: number }>>;
} {
  const sortedRules = [...rules].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  const finalScores = new Map(scores);
  const cascadingEffects = new Map<string, Array<any>>();

  for (const rule of sortedRules) {
    // Check if rule conditions are met
    const conditionsMet = rule.conditions.every(condition => {
      const score = finalScores.get(condition.dimension) || 0;
      switch (condition.operator) {
        case '<': return score < condition.threshold;
        case '<=': return score <= condition.threshold;
        case '>': return score > condition.threshold;
        case '>=': return score >= condition.threshold;
        case '==': return score === condition.threshold;
        default: return false;
      }
    });

    if (conditionsMet) {
      for (const effect of rule.effects) {
        const currentScore = finalScores.get(effect.dimension) || 0;
        let newScore = currentScore;

        switch (effect.action) {
          case 'cap_max':
            newScore = Math.min(currentScore, effect.value);
            break;
          case 'boost':
            newScore = Math.min(10, currentScore + effect.value);
            break;
          case 'reduce':
            newScore = Math.max(0, currentScore - effect.value);
            break;
        }

        if (newScore !== currentScore) {
          finalScores.set(effect.dimension, newScore);

          if (!cascadingEffects.has(effect.dimension)) {
            cascadingEffects.set(effect.dimension, []);
          }

          cascadingEffects.get(effect.dimension)!.push({
            rule: rule.name,
            score_change: newScore - currentScore
          });
        }
      }
    }
  }

  return { finalScores, cascadingEffects };
}

/**
 * Simulate improving a dimension by +2 (or to max 10)
 */
function simulateDimensionImprovement(
  dimensionName: string,
  currentScores: Map<string, number>,
  rules: InteractionRule[]
): {
  projectedEQI: number;
  cascadingEffects: Array<{ affected_dimension: string; rule_applied: string; score_change: number }>;
  cappedByDependency: boolean;
} {
  // Create new score map with simulated improvement
  const currentScore = currentScores.get(dimensionName) || 0;
  const simulatedScore = Math.min(10, currentScore + 2);

  const simulatedScores = new Map(currentScores);
  simulatedScores.set(dimensionName, simulatedScore);

  // Apply interaction rules
  const { finalScores, cascadingEffects } = applyInteractionRules(simulatedScores, rules);

  // Check if improvement was capped by dependency
  const finalScore = finalScores.get(dimensionName) || 0;
  const cappedByDependency = finalScore < simulatedScore;

  // Build cascading effects array
  const cascadingEffectsArray: Array<{
    affected_dimension: string;
    rule_applied: string;
    score_change: number;
  }> = [];

  cascadingEffects.forEach((effects, dimName) => {
    effects.forEach(effect => {
      cascadingEffectsArray.push({
        affected_dimension: dimName,
        rule_applied: effect.rule,
        score_change: effect.score_change
      });
    });
  });

  // Calculate projected EQI
  const projectedEQI = calculateEQI(finalScores);

  return {
    projectedEQI,
    cascadingEffects: cascadingEffectsArray,
    cappedByDependency
  };
}

/**
 * Generate recommendation for dimension improvement
 */
function generateRecommendation(
  dimension: typeof RUBRIC_V1_0_1.dimensions[0],
  simulation: Omit<EQISimulation, 'recommendation'>
): string {
  const { delta_eqi, capped_by_dependency, cascading_effects } = simulation;

  if (capped_by_dependency) {
    const blockingRule = cascading_effects.find(e => e.score_change < 0);
    return `⚠️ Improvement CAPPED by dependency (${blockingRule?.rule_applied}). Fix blocking dimension first for full impact.`;
  }

  if (delta_eqi >= 3) {
    return `🔥 HIGH IMPACT: +${delta_eqi.toFixed(1)} EQI. Prioritize this dimension.`;
  } else if (delta_eqi >= 2) {
    return `✅ GOOD IMPACT: +${delta_eqi.toFixed(1)} EQI. Strong improvement opportunity.`;
  } else if (delta_eqi >= 1) {
    return `➡️ MODERATE IMPACT: +${delta_eqi.toFixed(1)} EQI. Worth addressing.`;
  } else {
    return `⬇️ LOW IMPACT: +${delta_eqi.toFixed(1)} EQI. Lower priority.`;
  }
}

/**
 * Detect dependency unlock opportunities
 */
function detectDependencyUnlocks(
  currentScores: Map<string, number>,
  rules: InteractionRule[]
): Array<{
  blocked_dimension: string;
  blocking_dimension: string;
  rule_name: string;
  potential_gain: number;
}> {
  const unlocks: Array<any> = [];

  // Check each rule for potential unlocks
  rules.forEach(rule => {
    const conditionsMet = rule.conditions.every(condition => {
      const score = currentScores.get(condition.dimension) || 0;
      switch (condition.operator) {
        case '<': return score < condition.threshold;
        case '<=': return score <= condition.threshold;
        case '>': return score > condition.threshold;
        case '>=': return score >= condition.threshold;
        case '==': return score === condition.threshold;
        default: return false;
      }
    });

    // If conditions ARE met, this rule is ACTIVE and blocking something
    if (conditionsMet) {
      rule.effects.forEach(effect => {
        if (effect.action === 'cap_max' || effect.action === 'reduce') {
          const blockedScore = currentScores.get(effect.dimension) || 0;
          const potentialScore = effect.action === 'cap_max' ? 10 : blockedScore + effect.value;
          const potential_gain = (potentialScore - blockedScore) * (RUBRIC_V1_0_1.dimensions.find(d => d.name === effect.dimension)?.weight || 0) * 10;

          if (potential_gain > 0.5) {
            rule.conditions.forEach(condition => {
              unlocks.push({
                blocked_dimension: effect.dimension,
                blocking_dimension: condition.dimension,
                rule_name: rule.name,
                potential_gain: Math.round(potential_gain * 10) / 10
              });
            });
          }
        }
      });
    }
  });

  return unlocks.sort((a, b) => b.potential_gain - a.potential_gain);
}

/**
 * Generate overall strategy recommendation
 */
function generateStrategy(report: Omit<EQISimulationReport, 'strategy'>): string {
  const lines: string[] = [];

  const topImprovements = report.top_improvements;
  const unlocks = report.dependency_unlocks;

  if (unlocks.length > 0) {
    lines.push(`🔓 UNLOCK STRATEGY:`);
    lines.push(`You have ${unlocks.length} dependency block(s). Improving these dimensions will unlock others:`);
    unlocks.slice(0, 3).forEach((unlock, i) => {
      lines.push(`  ${i + 1}. Improve "${unlock.blocking_dimension}" to unlock "${unlock.blocked_dimension}" (+${unlock.potential_gain} potential EQI)`);
    });
    lines.push(``);
  }

  lines.push(`📈 IMMEDIATE PRIORITIES:`);
  topImprovements.slice(0, 3).forEach((sim, i) => {
    lines.push(`  ${i + 1}. ${sim.dimension_display_name}: +${sim.delta_eqi.toFixed(1)} EQI (${Math.round(sim.weight * 100)}% weight)`);
  });

  return lines.join('\n');
}

// ============================================================================
// MAIN SIMULATOR
// ============================================================================

/**
 * Simulate ΔEQI for all dimension improvements
 *
 * @param currentDimensionScores - Current scores from AnalysisReport
 * @returns Complete simulation report with ranked improvements
 */
export function simulateEQIImprovements(
  currentDimensionScores: DimensionScoreResult[]
): EQISimulationReport {
  // Build current score map
  const currentScores = new Map(
    currentDimensionScores.map(d => [d.dimension_name, d.final_score])
  );

  // Calculate current EQI
  const current_eqi = calculateEQI(currentScores);

  // Run simulation for each dimension
  const simulations: EQISimulation[] = [];

  RUBRIC_V1_0_1.dimensions.forEach(dimension => {
    const current_score = currentScores.get(dimension.name) || 0;
    const simulated_score = Math.min(10, current_score + 2);

    // Skip if already at max
    if (current_score >= 10) {
      return;
    }

    // Run simulation
    const { projectedEQI, cascadingEffects, cappedByDependency } = simulateDimensionImprovement(
      dimension.name,
      currentScores,
      RUBRIC_V1_0_1.interaction_rules
    );

    const delta_eqi = projectedEQI - current_eqi;

    const simulation: Omit<EQISimulation, 'recommendation'> = {
      dimension_name: dimension.name,
      dimension_display_name: dimension.display_name,
      current_score,
      simulated_score,
      current_eqi,
      projected_eqi: projectedEQI,
      delta_eqi,
      weight: dimension.weight,
      capped_by_dependency: cappedByDependency,
      cascading_effects: cascadingEffects
    };

    const recommendation = generateRecommendation(dimension, simulation);

    simulations.push({
      ...simulation,
      recommendation
    });
  });

  // Sort by ΔEQI descending
  simulations.sort((a, b) => b.delta_eqi - a.delta_eqi);

  // Get top 3
  const top_improvements = simulations.slice(0, 3);

  // Detect dependency unlocks
  const dependency_unlocks = detectDependencyUnlocks(currentScores, RUBRIC_V1_0_1.interaction_rules);

  // Build report (without strategy)
  const report: Omit<EQISimulationReport, 'strategy'> = {
    current_eqi,
    simulations,
    top_improvements,
    dependency_unlocks
  };

  // Generate strategy
  const strategy = generateStrategy(report);

  return {
    ...report,
    strategy
  };
}

/**
 * Get simulation summary for quick inspection
 */
export function getSimulationSummary(report: EQISimulationReport): string {
  const lines: string[] = [];

  lines.push(`═══════════════════════════════════════════════════════════════════`);
  lines.push(`  ΔEQI SIMULATION REPORT`);
  lines.push(`═══════════════════════════════════════════════════════════════════`);
  lines.push(``);
  lines.push(`Current EQI: ${report.current_eqi}/100`);
  lines.push(``);

  lines.push(`─────────────────────────────────────────────────────────────────`);
  lines.push(`  TOP 3 IMPROVEMENT OPPORTUNITIES`);
  lines.push(`─────────────────────────────────────────────────────────────────`);
  report.top_improvements.forEach((sim, i) => {
    lines.push(`${i + 1}. ${sim.dimension_display_name}`);
    lines.push(`   Current: ${sim.current_score}/10 → Simulated: ${sim.simulated_score}/10`);
    lines.push(`   ΔEQI: +${sim.delta_eqi.toFixed(1)} (${sim.current_eqi.toFixed(1)} → ${sim.projected_eqi.toFixed(1)})`);
    lines.push(`   ${sim.recommendation}`);
    if (sim.cascading_effects.length > 0) {
      lines.push(`   Cascading effects:`);
      sim.cascading_effects.forEach(effect => {
        lines.push(`     - ${effect.affected_dimension}: ${effect.score_change > 0 ? '+' : ''}${effect.score_change} (${effect.rule_applied})`);
      });
    }
    lines.push(``);
  });

  if (report.dependency_unlocks.length > 0) {
    lines.push(`─────────────────────────────────────────────────────────────────`);
    lines.push(`  DEPENDENCY UNLOCK OPPORTUNITIES`);
    lines.push(`─────────────────────────────────────────────────────────────────`);
    report.dependency_unlocks.slice(0, 3).forEach((unlock, i) => {
      lines.push(`${i + 1}. Improve "${unlock.blocking_dimension}" to unlock "${unlock.blocked_dimension}"`);
      lines.push(`   Rule: ${unlock.rule_name}`);
      lines.push(`   Potential gain: +${unlock.potential_gain} EQI`);
      lines.push(``);
    });
  }

  lines.push(`─────────────────────────────────────────────────────────────────`);
  lines.push(`  STRATEGY RECOMMENDATION`);
  lines.push(`─────────────────────────────────────────────────────────────────`);
  lines.push(report.strategy);
  lines.push(``);

  lines.push(`═══════════════════════════════════════════════════════════════════`);
  lines.push(`  ALL SIMULATIONS (sorted by ΔEQI)`);
  lines.push(`═══════════════════════════════════════════════════════════════════`);
  report.simulations.forEach((sim, i) => {
    const emoji = sim.delta_eqi >= 3 ? '🔥' : sim.delta_eqi >= 2 ? '✅' : sim.delta_eqi >= 1 ? '➡️' : '⬇️';
    lines.push(`${emoji} ${i + 1}. ${sim.dimension_display_name}: +${sim.delta_eqi.toFixed(1)} EQI`);
  });

  return lines.join('\n');
}

/**
 * Helper: Get simulation for specific dimension
 */
export function getSimulationForDimension(
  report: EQISimulationReport,
  dimensionName: string
): EQISimulation | null {
  return report.simulations.find(s => s.dimension_name === dimensionName) || null;
}

/**
 * Helper: Get simulations above threshold
 */
export function getSimulationsAboveThreshold(
  report: EQISimulationReport,
  minDeltaEQI: number
): EQISimulation[] {
  return report.simulations.filter(s => s.delta_eqi >= minDeltaEQI);
}
