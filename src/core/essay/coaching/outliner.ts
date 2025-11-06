/**
 * Story Coach — Outliner
 *
 * Generates narrative outlines and structural suggestions for essays.
 *
 * ARCHITECTURE SEPARATION:
 * - Analysis Engine (temp 0.2-0.3): Objective scoring, JSON output
 * - Story Coach (temp 0.6-0.8): Creative suggestions, natural language
 *
 * OUTLINER FUNCTIONS:
 * 1. Generate narrative arc outline (3-5 act structure)
 * 2. Suggest scene placement (where to add concrete moments)
 * 3. Map micro→macro flow (specific → universal)
 * 4. Identify vulnerability insertion points
 * 5. Structure reflection moments
 *
 * CRITICAL CONSTRAINT:
 * - NEVER invents facts or achievements
 * - ONLY suggests structure and elicitation questions
 * - Respects existing content (fact-lock principle)
 */

import { AnalysisReport } from '../analysis/analysisEngine';
import { RUBRIC_V1_0_1 } from '../rubrics/v1.0.1';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface NarrativeOutline {
  /** Overall narrative structure type */
  structure_type: 'three_act' | 'journey' | 'moment_reflection' | 'problem_solution' | 'chronological';

  /** Act/section breakdown */
  acts: Array<{
    act_number: number;
    act_name: string;
    purpose: string;
    suggested_length: string; // e.g., "2-3 paragraphs"
    key_elements: string[];
    current_status: 'missing' | 'weak' | 'present' | 'strong';
  }>;

  /** Recommended flow */
  recommended_flow: string;

  /** Current structural gaps */
  structural_gaps: string[];
}

export interface ScenePlacementSuggestion {
  /** Where to add scenes */
  suggested_locations: Array<{
    paragraph_number: number | 'opening' | 'before_reflection' | 'climax';
    reason: string;
    scene_type: 'sensory_moment' | 'dialogue' | 'action_sequence' | 'turning_point';
    elicitation_questions: string[];
  }>;

  /** Current scene coverage */
  current_coverage: {
    has_opening_scene: boolean;
    has_climax_scene: boolean;
    has_reflection_grounded: boolean;
  };
}

export interface MicroMacroMap {
  /** Micro elements (specific moments) */
  micro_elements: Array<{
    description: string;
    current_location: string | null;
    is_concrete: boolean;
  }>;

  /** Macro elements (universal insights) */
  macro_elements: Array<{
    description: string;
    current_location: string | null;
    abstraction_level: 'moderate' | 'high' | 'philosophical';
  }>;

  /** Connection strength */
  connection_strength: 'disconnected' | 'weak' | 'moderate' | 'strong';

  /** Suggested connections */
  suggested_connections: Array<{
    micro: string;
    macro: string;
    bridge_suggestion: string;
  }>;
}

export interface VulnerabilityInsertionPlan {
  /** Current vulnerability moments */
  current_moments: number;

  /** Target moments (need 2+ for elite threshold) */
  target_moments: number;

  /** Suggested insertion points */
  insertion_points: Array<{
    location: string;
    vulnerability_type: 'failure_admission' | 'fear_naming' | 'uncertainty' | 'mistake_acknowledgment';
    elicitation_question: string;
    example_frame: string; // How to frame it
  }>;
}

export interface ReflectionStructurePlan {
  /** Current reflection depth */
  current_depth: 'surface' | 'moderate' | 'deep' | 'profound';

  /** Target depth */
  target_depth: 'deep' | 'profound';

  /** Reflection ladder (surface → deep) */
  reflection_ladder: Array<{
    level: string;
    current_statement: string | null;
    suggested_upgrade: string;
    elicitation_prompts: string[];
  }>;
}

export interface OutlinePackage {
  /** Narrative outline */
  narrative_outline: NarrativeOutline;

  /** Scene placement suggestions */
  scene_placement: ScenePlacementSuggestion;

  /** Micro→macro mapping */
  micro_macro_map: MicroMacroMap;

  /** Vulnerability insertion plan */
  vulnerability_plan: VulnerabilityInsertionPlan;

  /** Reflection structure plan */
  reflection_plan: ReflectionStructurePlan;

  /** Overall coaching strategy */
  coaching_strategy: string;

  /** Top 3 structural priorities */
  top_priorities: string[];
}

// ============================================================================
// OUTLINE GENERATORS
// ============================================================================

/**
 * Generate narrative outline based on essay structure
 */
function generateNarrativeOutline(report: AnalysisReport): NarrativeOutline {
  const { feature_detections } = report;
  const arcType = feature_detections.elite_patterns.narrative_arc.arc_type;
  const hasMicroMacro = feature_detections.elite_patterns.micro_macro.has_structure;

  // Determine structure type
  let structure_type: NarrativeOutline['structure_type'];

  if (hasMicroMacro && feature_detections.scenes.scene_count >= 1) {
    structure_type = 'moment_reflection';
  } else if (arcType === 'extended_journey' || arcType === 'lifelong_pursuit') {
    structure_type = 'journey';
  } else if (feature_detections.scenes.scene_count >= 2) {
    structure_type = 'three_act';
  } else {
    structure_type = 'problem_solution';
  }

  // Build acts based on structure type
  let acts: NarrativeOutline['acts'] = [];
  let recommended_flow = '';
  let structural_gaps: string[] = [];

  if (structure_type === 'moment_reflection') {
    acts = [
      {
        act_number: 1,
        act_name: 'Opening Scene',
        purpose: 'Drop reader into concrete moment with sensory detail',
        suggested_length: '1-2 paragraphs',
        key_elements: ['Temporal anchor', 'Spatial anchor', 'Sensory detail', 'Action/dialogue'],
        current_status: feature_detections.scenes.scene_count >= 1 ? 'present' : 'missing'
      },
      {
        act_number: 2,
        act_name: 'Development',
        purpose: 'Show what happened, reveal stakes and vulnerability',
        suggested_length: '2-3 paragraphs',
        key_elements: ['Tension/conflict', 'Vulnerability moment', 'Inner debate', 'Action taken'],
        current_status: feature_detections.interiority.vulnerability_count >= 1 ? 'present' : 'weak'
      },
      {
        act_number: 3,
        act_name: 'Reflection & Meaning',
        purpose: 'Connect specific moment to universal insight',
        suggested_length: '1-2 paragraphs',
        key_elements: ['What I learned', 'Why it matters beyond me', 'Ongoing growth'],
        current_status: feature_detections.elite_patterns.micro_macro.is_connected ? 'strong' : 'weak'
      }
    ];

    recommended_flow = 'Moment → Development → Meaning (Micro→Macro)';

    if (!feature_detections.scenes.has_scene) {
      structural_gaps.push('Missing opening scene (critical)');
    }
    if (feature_detections.interiority.vulnerability_count < 2) {
      structural_gaps.push('Need more vulnerability moments (currently: ' + feature_detections.interiority.vulnerability_count + ', target: 2+)');
    }
    if (!feature_detections.elite_patterns.micro_macro.is_connected) {
      structural_gaps.push('Reflection not connected to opening scene');
    }

  } else if (structure_type === 'journey') {
    acts = [
      {
        act_number: 1,
        act_name: 'Beginning State',
        purpose: 'Show who you were before this journey',
        suggested_length: '1 paragraph',
        key_elements: ['Initial belief/assumption', 'What you didn\'t know yet'],
        current_status: 'present' // Assume present
      },
      {
        act_number: 2,
        act_name: 'Inciting Incident',
        purpose: 'What disrupted your status quo?',
        suggested_length: '1-2 paragraphs',
        key_elements: ['Specific moment of change', 'Initial reaction', 'Stakes'],
        current_status: feature_detections.scenes.scene_count >= 1 ? 'present' : 'missing'
      },
      {
        act_number: 3,
        act_name: 'Struggle & Persistence',
        purpose: 'Show the work, failure, growth over time',
        suggested_length: '2-3 paragraphs',
        key_elements: ['Multiple attempts', 'Failures', 'What you learned', 'Persistence'],
        current_status: feature_detections.elite_patterns.narrative_arc.shows_persistence ? 'strong' : 'weak'
      },
      {
        act_number: 4,
        act_name: 'Transformation',
        purpose: 'Who are you now? What changed?',
        suggested_length: '1-2 paragraphs',
        key_elements: ['New understanding', 'Ongoing growth', 'What still challenges you'],
        current_status: feature_detections.interiority.limit_admissions.length > 0 ? 'present' : 'weak'
      }
    ];

    recommended_flow = 'Before → Catalyst → Struggle → After (with ongoing growth)';

    if (feature_detections.elite_patterns.narrative_arc.time_span === null) {
      structural_gaps.push('Time span unclear (show duration: 3 months, 2 years, etc.)');
    }
    if (!feature_detections.elite_patterns.narrative_arc.shows_persistence) {
      structural_gaps.push('Missing persistence markers (kept trying, continued, didn\'t give up)');
    }

  } else {
    // Default three-act or problem-solution
    acts = [
      {
        act_number: 1,
        act_name: 'Setup',
        purpose: 'Establish context and stakes',
        suggested_length: '1-2 paragraphs',
        key_elements: ['Opening hook', 'Context', 'Problem/question'],
        current_status: 'present'
      },
      {
        act_number: 2,
        act_name: 'Complication',
        purpose: 'Show what you tried, what failed, vulnerability',
        suggested_length: '2-3 paragraphs',
        key_elements: ['Action taken', 'Obstacles', 'Vulnerability', 'Learning'],
        current_status: feature_detections.interiority.vulnerability_count >= 1 ? 'present' : 'weak'
      },
      {
        act_number: 3,
        act_name: 'Resolution & Growth',
        purpose: 'What changed? What did you learn?',
        suggested_length: '1-2 paragraphs',
        key_elements: ['Outcome', 'Insight', 'Ongoing implications'],
        current_status: 'present'
      }
    ];

    recommended_flow = 'Problem → Complication → Resolution (with reflection)';
  }

  return {
    structure_type,
    acts,
    recommended_flow,
    structural_gaps
  };
}

/**
 * Generate scene placement suggestions
 */
function generateScenePlacement(report: AnalysisReport): ScenePlacementSuggestion {
  const { feature_detections, dimension_scores } = report;

  const current_coverage = {
    has_opening_scene: feature_detections.scenes.scenes.some(s => s.paragraph_index === 0),
    has_climax_scene: feature_detections.scenes.scene_count >= 2,
    has_reflection_grounded: feature_detections.elite_patterns.philosophical_depth.abstraction_balance === 'balanced'
  };

  const suggested_locations: ScenePlacementSuggestion['suggested_locations'] = [];

  // Suggest opening scene if missing
  if (!current_coverage.has_opening_scene) {
    suggested_locations.push({
      paragraph_number: 'opening',
      reason: 'Weak opening reduces reader engagement. Need concrete scene in first 2 sentences.',
      scene_type: 'sensory_moment',
      elicitation_questions: [
        'What exact moment are we in? (Time and place)',
        'What do you see, hear, smell, taste, or feel?',
        'What are you doing with your hands?',
        'What\'s the weather? What\'s on the table?'
      ]
    });
  }

  // Suggest scene before reflection if abstract
  const reflectionScore = dimension_scores.find(d => d.dimension_name === 'reflection_meaning_making')?.final_score || 0;
  if (reflectionScore < 7 && feature_detections.scenes.scene_count < 2) {
    suggested_locations.push({
      paragraph_number: 'before_reflection',
      reason: 'Reflection needs grounding in concrete moment. Add scene before insight.',
      scene_type: 'turning_point',
      elicitation_questions: [
        'What specific moment led to this realization?',
        'Where were you when it clicked?',
        'What were you doing when you understood this?',
        'Can you show the moment of change rather than tell it?'
      ]
    });
  }

  // Suggest dialogue if missing
  if (feature_detections.dialogue.dialogue_count === 0) {
    suggested_locations.push({
      paragraph_number: 'climax',
      reason: 'No dialogue present. Quoted speech adds voice and texture.',
      scene_type: 'dialogue',
      elicitation_questions: [
        'What did someone say to you that mattered?',
        'What did you say out loud (even to yourself)?',
        'Was there a conversation that changed things?',
        'What exact words do you remember?'
      ]
    });
  }

  // Suggest action sequence if low craft score
  const craftScore = dimension_scores.find(d => d.dimension_name === 'show_dont_tell_craft')?.final_score || 0;
  if (craftScore < 6 && feature_detections.scenes.scene_count < 2) {
    suggested_locations.push({
      paragraph_number: 2,
      reason: 'All tell, no show. Add action sequence with verbs (walked, grabbed, opened).',
      scene_type: 'action_sequence',
      elicitation_questions: [
        'What did you physically do?',
        'What actions did you take? (Use verbs)',
        'Can you walk me through the steps?',
        'What happened first, then next, then after that?'
      ]
    });
  }

  return {
    suggested_locations,
    current_coverage
  };
}

/**
 * Generate micro→macro map
 */
function generateMicroMacroMap(report: AnalysisReport): MicroMacroMap {
  const { feature_detections } = report;

  const micro_elements = feature_detections.elite_patterns.micro_macro.micro_elements.map(m => ({
    description: m.type === 'scene' ? 'Concrete scene detected' : m.type,
    current_location: `Paragraph ${m.paragraph_index + 1}`,
    is_concrete: true
  }));

  const macro_elements = feature_detections.elite_patterns.micro_macro.macro_elements.map(m => ({
    description: 'Universal insight/reflection',
    current_location: `Paragraph ${m.paragraph_index + 1}`,
    abstraction_level: m.abstraction_level
  }));

  const connection_strength = feature_detections.elite_patterns.micro_macro.is_connected
    ? (feature_detections.elite_patterns.micro_macro.quality_score >= 8 ? 'strong' : 'moderate')
    : (micro_elements.length > 0 && macro_elements.length > 0 ? 'weak' : 'disconnected');

  const suggested_connections: MicroMacroMap['suggested_connections'] = [];

  if (connection_strength === 'weak' || connection_strength === 'disconnected') {
    suggested_connections.push({
      micro: 'Your specific moment/scene',
      macro: 'Your broader insight',
      bridge_suggestion: 'Use transition: "This taught me..." or "Looking back, I realize..." to connect the dots explicitly.'
    });
  }

  return {
    micro_elements,
    macro_elements,
    connection_strength,
    suggested_connections
  };
}

/**
 * Generate vulnerability insertion plan
 */
function generateVulnerabilityPlan(report: AnalysisReport): VulnerabilityInsertionPlan {
  const current_moments = report.feature_detections.interiority.vulnerability_count;
  const target_moments = 2; // Elite threshold from rubric v1.0.1

  const insertion_points: VulnerabilityInsertionPlan['insertion_points'] = [];

  if (current_moments < target_moments) {
    const needed = target_moments - current_moments;

    // Suggest failure admission
    insertion_points.push({
      location: 'Early in complication section',
      vulnerability_type: 'failure_admission',
      elicitation_question: 'What did you try that didn\'t work? What did you fail at?',
      example_frame: 'Frame as honest admission: "I failed the quiz. My grade was 19%. I felt like a fraud."'
    });

    if (needed >= 2) {
      // Suggest fear/uncertainty
      insertion_points.push({
        location: 'Before turning point',
        vulnerability_type: 'uncertainty',
        elicitation_question: 'What didn\'t you know? What were you unsure about?',
        example_frame: 'Show uncertainty: "I didn\'t know if I could do this. I wasn\'t sure..."'
      });
    }
  }

  return {
    current_moments,
    target_moments,
    insertion_points
  };
}

/**
 * Generate reflection structure plan
 */
function generateReflectionPlan(report: AnalysisReport): ReflectionStructurePlan {
  const current_depth = report.feature_detections.interiority.introspection_segments.length > 0
    ? report.feature_detections.interiority.introspection_segments[0].depth
    : 'surface';

  const target_depth: ReflectionStructurePlan['target_depth'] = 'deep';

  const reflection_ladder: ReflectionStructurePlan['reflection_ladder'] = [
    {
      level: 'Surface (what happened)',
      current_statement: null,
      suggested_upgrade: 'Move beyond summary to analysis',
      elicitation_prompts: [
        'Not just "what" but "why did this matter?"',
        'What surprised you about this?'
      ]
    },
    {
      level: 'Moderate (what I learned)',
      current_statement: null,
      suggested_upgrade: 'Move from lesson to transformation',
      elicitation_prompts: [
        'How did this change how you see yourself?',
        'What assumption did this challenge?'
      ]
    },
    {
      level: 'Deep (what changed in me)',
      current_statement: null,
      suggested_upgrade: 'Connect to ongoing growth',
      elicitation_prompts: [
        'How does this show up in your life now?',
        'What are you still learning?',
        'What question does this leave you with?'
      ]
    }
  ];

  return {
    current_depth,
    target_depth,
    reflection_ladder
  };
}

/**
 * Generate overall coaching strategy
 */
function generateCoachingStrategy(outline: Omit<OutlinePackage, 'coaching_strategy' | 'top_priorities'>): string {
  const lines: string[] = [];

  lines.push('🎯 COACHING STRATEGY:');
  lines.push('');

  // Address structural gaps first
  if (outline.narrative_outline.structural_gaps.length > 0) {
    lines.push('1. STRUCTURAL FOUNDATION (Priority: CRITICAL)');
    outline.narrative_outline.structural_gaps.forEach(gap => {
      lines.push(`   - ${gap}`);
    });
    lines.push('');
  }

  // Scene placement
  if (outline.scene_placement.suggested_locations.length > 0) {
    lines.push('2. SCENE PLACEMENT (Priority: HIGH)');
    lines.push('   Concrete scenes are critical for "show don\'t tell."');
    lines.push(`   Currently: ${outline.scene_placement.current_coverage.has_opening_scene ? '✅' : '❌'} Opening scene, ${outline.scene_placement.current_coverage.has_climax_scene ? '✅' : '❌'} Climax scene`);
    lines.push('');
  }

  // Vulnerability
  if (outline.vulnerability_plan.current_moments < outline.vulnerability_plan.target_moments) {
    lines.push('3. VULNERABILITY (Priority: HIGH — 68% of elite essays have 2+)');
    lines.push(`   Current: ${outline.vulnerability_plan.current_moments} moments, Target: ${outline.vulnerability_plan.target_moments}+`);
    lines.push('   Add honest admissions of failure, fear, or uncertainty.');
    lines.push('');
  }

  // Micro→macro connection
  if (outline.micro_macro_map.connection_strength !== 'strong') {
    lines.push('4. MICRO→MACRO CONNECTION (Priority: MEDIUM)');
    lines.push(`   Connection: ${outline.micro_macro_map.connection_strength}`);
    lines.push('   Bridge specific moment to universal insight.');
    lines.push('');
  }

  // Reflection depth
  if (outline.reflection_plan.current_depth !== 'deep' && outline.reflection_plan.current_depth !== 'profound') {
    lines.push('5. REFLECTION DEPTH (Priority: MEDIUM)');
    lines.push(`   Current: ${outline.reflection_plan.current_depth}, Target: ${outline.reflection_plan.target_depth}`);
    lines.push('   Move from "what I learned" to "what changed in me."');
  }

  return lines.join('\n');
}

// ============================================================================
// MAIN OUTLINER
// ============================================================================

/**
 * Generate comprehensive outline package
 *
 * @param report - Analysis report from Analysis Engine
 * @returns Complete outline with structural suggestions
 */
export function generateOutline(report: AnalysisReport): OutlinePackage {
  // Generate all components
  const narrative_outline = generateNarrativeOutline(report);
  const scene_placement = generateScenePlacement(report);
  const micro_macro_map = generateMicroMacroMap(report);
  const vulnerability_plan = generateVulnerabilityPlan(report);
  const reflection_plan = generateReflectionPlan(report);

  // Build package (without strategy and priorities)
  const package_partial: Omit<OutlinePackage, 'coaching_strategy' | 'top_priorities'> = {
    narrative_outline,
    scene_placement,
    micro_macro_map,
    vulnerability_plan,
    reflection_plan
  };

  // Generate strategy
  const coaching_strategy = generateCoachingStrategy(package_partial);

  // Generate top priorities
  const top_priorities: string[] = [];

  if (narrative_outline.structural_gaps.length > 0) {
    top_priorities.push(narrative_outline.structural_gaps[0]);
  }

  if (scene_placement.suggested_locations.length > 0 && !scene_placement.current_coverage.has_opening_scene) {
    top_priorities.push('Add opening scene (first 2 sentences)');
  }

  if (vulnerability_plan.current_moments < vulnerability_plan.target_moments) {
    top_priorities.push(`Add ${vulnerability_plan.target_moments - vulnerability_plan.current_moments} more vulnerability moment(s)`);
  }

  return {
    ...package_partial,
    coaching_strategy,
    top_priorities: top_priorities.slice(0, 3)
  };
}

/**
 * Get outline summary for quick inspection
 */
export function getOutlineSummary(outline: OutlinePackage): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('  STORY COACH — NARRATIVE OUTLINE');
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('');

  lines.push(`📖 Structure: ${outline.narrative_outline.structure_type}`);
  lines.push(`📊 Flow: ${outline.narrative_outline.recommended_flow}`);
  lines.push('');

  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  NARRATIVE ACTS');
  lines.push('─────────────────────────────────────────────────────────────────');
  outline.narrative_outline.acts.forEach(act => {
    const statusEmoji = act.current_status === 'strong' ? '✅' :
                       act.current_status === 'present' ? '⚠️' :
                       act.current_status === 'weak' ? '⚠️' : '❌';
    lines.push(`${statusEmoji} Act ${act.act_number}: ${act.act_name} (${act.current_status})`);
    lines.push(`   Purpose: ${act.purpose}`);
    lines.push(`   Length: ${act.suggested_length}`);
  });

  if (outline.narrative_outline.structural_gaps.length > 0) {
    lines.push('');
    lines.push('🚨 STRUCTURAL GAPS:');
    outline.narrative_outline.structural_gaps.forEach(gap => {
      lines.push(`   - ${gap}`);
    });
  }

  lines.push('');
  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  TOP 3 PRIORITIES');
  lines.push('─────────────────────────────────────────────────────────────────');
  outline.top_priorities.forEach((priority, i) => {
    lines.push(`${i + 1}. ${priority}`);
  });

  lines.push('');
  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  COACHING STRATEGY');
  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push(outline.coaching_strategy);

  return lines.join('\n');
}
