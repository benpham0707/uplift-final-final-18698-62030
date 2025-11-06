/**
 * Story Coach — Micro-Editor
 *
 * Generates sentence-level improvements and rewrites for specific passages.
 *
 * CRITICAL CONSTRAINTS:
 * 1. NEVER invents facts, achievements, or experiences
 * 2. ONLY improves craft: show→tell, passive→active, generic→specific
 * 3. Preserves voice and authenticity
 * 4. Marks all suggestions as "[SUGGESTION]" not commands
 *
 * MICRO-EDIT TYPES:
 * 1. Show Don't Tell conversions
 * 2. Passive→Active voice
 * 3. Generic→Specific emotion/detail
 * 4. Sentence variety (rhythm, length)
 * 5. Sensory detail additions
 * 6. Dialogue integration
 * 7. Opening hook strengthening
 */

import { AnalysisReport } from '../analysis/analysisEngine';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MicroEdit {
  /** Location of edit */
  location: {
    paragraph_number: number;
    sentence_number: number | null;
    original_text: string;
  };

  /** Edit type */
  edit_type: 'show_dont_tell' | 'passive_to_active' | 'generic_to_specific' |
             'sentence_variety' | 'sensory_detail' | 'dialogue' | 'opening_hook';

  /** Why this needs editing */
  issue: string;

  /** Suggested rewrite */
  suggested_rewrite: string;

  /** Elicitation questions (if facts needed) */
  elicitation_questions: string[];

  /** Impact priority */
  priority: 'critical' | 'high' | 'medium' | 'low';

  /** Expected ΔEQI from this edit */
  expected_delta_eqi: number;
}

export interface MicroEditPackage {
  /** All suggested micro-edits */
  edits: MicroEdit[];

  /** Edits grouped by type */
  edits_by_type: Record<MicroEdit['edit_type'], MicroEdit[]>;

  /** Top priority edits (highest impact) */
  top_priority_edits: MicroEdit[];

  /** Overall micro-editing strategy */
  strategy: string;
}

// ============================================================================
// EDIT GENERATORS
// ============================================================================

/**
 * Generate show-don't-tell edits
 */
function generateShowDontTellEdits(essayText: string, report: AnalysisReport): MicroEdit[] {
  const edits: MicroEdit[] = [];
  const paragraphs = essayText.split('\n\n');

  // Find "tell" patterns
  const tellPatterns = [
    { pattern: /i (was|felt|am) (happy|sad|excited|nervous|proud)/i, replacement: 'Show the feeling through action/sensation' },
    { pattern: /it (was|is) (very|really|extremely) (\w+)/i, replacement: 'Show the quality with concrete detail' },
    { pattern: /i (learned|realized|understood) (that|how)/i, replacement: 'Show the moment of realization' }
  ];

  paragraphs.forEach((para, paraIdx) => {
    tellPatterns.forEach(({ pattern, replacement }) => {
      const match = para.match(pattern);
      if (match) {
        edits.push({
          location: {
            paragraph_number: paraIdx + 1,
            sentence_number: null,
            original_text: match[0]
          },
          edit_type: 'show_dont_tell',
          issue: `"${match[0]}" tells rather than shows`,
          suggested_rewrite: `[ASK: What did you see/hear/do that showed this? ${replacement}]`,
          elicitation_questions: [
            'What did your body do? (hands shaking, heart racing, etc.)',
            'What did you see or hear in that moment?',
            'What action did you take that showed this feeling?'
          ],
          priority: 'high',
          expected_delta_eqi: 2.5
        });
      }
    });
  });

  return edits;
}

/**
 * Generate passive-to-active voice edits
 */
function generatePassiveToActiveEdits(essayText: string): MicroEdit[] {
  const edits: MicroEdit[] = [];
  const sentences = essayText.split(/[.!?]+/).filter(s => s.trim().length > 0);

  const passivePattern = /\b(was|were|been|being) (\w+ed)\b/gi;

  sentences.forEach((sentence, sentIdx) => {
    const matches = sentence.matchAll(passivePattern);
    for (const match of matches) {
      edits.push({
        location: {
          paragraph_number: Math.floor(sentIdx / 3) + 1, // Rough estimate
          sentence_number: sentIdx + 1,
          original_text: match[0]
        },
        edit_type: 'passive_to_active',
        issue: `Passive voice: "${match[0]}"`,
        suggested_rewrite: `[REWRITE ACTIVE: Who did the action? Put them as the subject]`,
        elicitation_questions: [
          'Who actually did this action?',
          'Can you flip this to: "[Subject] [verb] [object]"?'
        ],
        priority: 'medium',
        expected_delta_eqi: 1.0
      });
    }
  });

  return edits.slice(0, 5); // Limit to top 5
}

/**
 * Generate generic-to-specific edits
 */
function generateGenericToSpecificEdits(essayText: string, report: AnalysisReport): MicroEdit[] {
  const edits: MicroEdit[] = [];
  const paragraphs = essayText.split('\n\n');

  // Generic emotion words
  const genericEmotions = [
    'happy', 'sad', 'nervous', 'excited', 'angry', 'proud', 'good', 'bad'
  ];

  paragraphs.forEach((para, paraIdx) => {
    genericEmotions.forEach(emotion => {
      if (para.toLowerCase().includes(emotion)) {
        edits.push({
          location: {
            paragraph_number: paraIdx + 1,
            sentence_number: null,
            original_text: `[contains "${emotion}"]`
          },
          edit_type: 'generic_to_specific',
          issue: `Generic emotion: "${emotion}"`,
          suggested_rewrite: `[REPLACE with specific emotion: anxious, frustrated, embarrassed, mortified, exhilarated, etc.]`,
          elicitation_questions: [
            `What's the precise emotion beyond "${emotion}"?`,
            'Can you name the exact shade of this feeling?'
          ],
          priority: 'medium',
          expected_delta_eqi: 1.5
        });
      }
    });
  });

  return edits.slice(0, 3); // Top 3
}

/**
 * Generate sentence variety edits
 */
function generateSentenceVarietyEdits(essayText: string): MicroEdit[] {
  const edits: MicroEdit[] = [];
  const sentences = essayText.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Check for monotonous sentence length
  const lengths = sentences.map(s => s.split(/\s+/).length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;

  if (variance < 10) { // Low variance = monotonous
    edits.push({
      location: {
        paragraph_number: 1,
        sentence_number: null,
        original_text: '[Throughout essay]'
      },
      edit_type: 'sentence_variety',
      issue: 'Monotonous sentence rhythm (all similar length)',
      suggested_rewrite: `[ADD VARIETY: Mix short punchy sentences (5-8 words) with longer flowing ones (20-25 words)]`,
      elicitation_questions: [
        'Where can you add a short, punchy sentence for impact?',
        'Which sentence can you expand with more detail?'
      ],
      priority: 'medium',
      expected_delta_eqi: 1.0
    });
  }

  // Check for repetitive sentence starts
  const starts = sentences.map(s => s.trim().split(/\s+/)[0]?.toLowerCase());
  const startCounts = starts.reduce((acc, start) => {
    acc[start] = (acc[start] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(startCounts).forEach(([start, count]) => {
    if (count >= 3 && start === 'i') {
      edits.push({
        location: {
          paragraph_number: 1,
          sentence_number: null,
          original_text: '[Multiple sentences start with "I"]'
        },
        edit_type: 'sentence_variety',
        issue: `${count} sentences start with "${start}"`,
        suggested_rewrite: `[VARY STARTS: Use dependent clauses, time markers, or -ing verbs to open some sentences]`,
        elicitation_questions: [
          'Can you start with: "When...", "After...", "Despite..."?',
          'Can you invert: "I walked to the lab" → "To the lab I walked"?'
        ],
        priority: 'low',
        expected_delta_eqi: 0.5
      });
    }
  });

  return edits;
}

/**
 * Generate sensory detail edits
 */
function generateSensoryDetailEdits(essayText: string, report: AnalysisReport): MicroEdit[] {
  const edits: MicroEdit[] = [];
  const sceneCount = report.feature_detections.scenes.scene_count;

  if (sceneCount < 2) {
    const paragraphs = essayText.split('\n\n');

    paragraphs.slice(0, 2).forEach((para, paraIdx) => {
      // Check if paragraph has sensory detail
      const sensoryWords = ['saw', 'heard', 'felt', 'smelled', 'tasted', 'touch', 'sound', 'sight', 'smell'];
      const hasSensory = sensoryWords.some(word => para.toLowerCase().includes(word));

      if (!hasSensory) {
        edits.push({
          location: {
            paragraph_number: paraIdx + 1,
            sentence_number: null,
            original_text: para.substring(0, 100) + '...'
          },
          edit_type: 'sensory_detail',
          issue: 'Missing sensory detail (no sight, sound, smell, touch, taste)',
          suggested_rewrite: `[ADD SENSORY: What did you see/hear/smell/feel in this moment?]`,
          elicitation_questions: [
            'What did the space look like?',
            'What sounds were in the background?',
            'What did it smell like?',
            'What texture did you touch?',
            'What temperature was it?'
          ],
          priority: 'high',
          expected_delta_eqi: 2.0
        });
      }
    });
  }

  return edits;
}

/**
 * Generate dialogue integration edits
 */
function generateDialogueEdits(essayText: string, report: AnalysisReport): MicroEdit[] {
  const edits: MicroEdit[] = [];

  if (report.feature_detections.dialogue.dialogue_count === 0) {
    edits.push({
      location: {
        paragraph_number: 2,
        sentence_number: null,
        original_text: '[No dialogue in essay]'
      },
      edit_type: 'dialogue',
      issue: 'No quoted speech (dialogue adds voice and texture)',
      suggested_rewrite: `[ADD DIALOGUE: What did someone say? What did you say?]`,
      elicitation_questions: [
        'What did your teacher/mentor/friend say to you?',
        'What exact words do you remember?',
        'Did you say anything out loud (even to yourself)?',
        'Was there a conversation that mattered?'
      ],
      priority: 'medium',
      expected_delta_eqi: 1.5
    });
  }

  return edits;
}

/**
 * Generate opening hook edits
 */
function generateOpeningHookEdits(essayText: string, report: AnalysisReport): MicroEdit[] {
  const edits: MicroEdit[] = [];

  const openingScore = report.dimension_scores.find(d => d.dimension_name === 'opening_power_scene_entry')?.final_score || 0;

  if (openingScore < 7) {
    const firstSentence = essayText.split(/[.!?]/)[0];

    // Check for generic openings
    const genericOpenings = [
      'ever since i was', 'since i was young', 'i have always', 'throughout my life',
      'growing up', 'from a young age', 'the dictionary defines'
    ];

    const isGeneric = genericOpenings.some(pattern => firstSentence.toLowerCase().includes(pattern));

    if (isGeneric) {
      edits.push({
        location: {
          paragraph_number: 1,
          sentence_number: 1,
          original_text: firstSentence
        },
        edit_type: 'opening_hook',
        issue: 'Generic opening (reduces reader engagement)',
        suggested_rewrite: `[REWRITE: Drop into a specific moment with sensory detail OR make a provocative claim]`,
        elicitation_questions: [
          'What\'s the most surprising/unusual entry point to this story?',
          'What exact moment can you drop us into?',
          'What\'s the worst/best/strangest thing related to this?',
          'Can you start with dialogue or a vivid image?'
        ],
        priority: 'critical',
        expected_delta_eqi: 3.0
      });
    } else if (!report.feature_detections.scenes.scenes.some(s => s.paragraph_index === 0)) {
      edits.push({
        location: {
          paragraph_number: 1,
          sentence_number: 1,
          original_text: firstSentence
        },
        edit_type: 'opening_hook',
        issue: 'Opening lacks scene (no time/place/sensory anchor)',
        suggested_rewrite: `[ADD SCENE: When and where are we? What do you see/hear/smell?]`,
        elicitation_questions: [
          'What exact moment are we in?',
          'What time of day? What season?',
          'What room/space are we in?',
          'What\'s the first sensory detail you remember?'
        ],
        priority: 'critical',
        expected_delta_eqi: 2.5
      });
    }
  }

  return edits;
}

// ============================================================================
// MAIN MICRO-EDITOR
// ============================================================================

/**
 * Generate comprehensive micro-edit package
 *
 * @param essayText - Full essay text
 * @param report - Analysis report
 * @returns Complete micro-edit package with prioritized suggestions
 */
export function generateMicroEdits(essayText: string, report: AnalysisReport): MicroEditPackage {
  // Generate all edit types
  const showDontTell = generateShowDontTellEdits(essayText, report);
  const passiveToActive = generatePassiveToActiveEdits(essayText);
  const genericToSpecific = generateGenericToSpecificEdits(essayText, report);
  const sentenceVariety = generateSentenceVarietyEdits(essayText);
  const sensoryDetail = generateSensoryDetailEdits(essayText, report);
  const dialogue = generateDialogueEdits(essayText, report);
  const openingHook = generateOpeningHookEdits(essayText, report);

  // Combine all edits
  const edits = [
    ...openingHook,
    ...showDontTell,
    ...sensoryDetail,
    ...dialogue,
    ...genericToSpecific,
    ...passiveToActive,
    ...sentenceVariety
  ];

  // Group by type
  const edits_by_type: MicroEditPackage['edits_by_type'] = {
    show_dont_tell: showDontTell,
    passive_to_active: passiveToActive,
    generic_to_specific: genericToSpecific,
    sentence_variety: sentenceVariety,
    sensory_detail: sensoryDetail,
    dialogue: dialogue,
    opening_hook: openingHook
  };

  // Sort by priority and expected impact
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  const sortedEdits = [...edits].sort((a, b) => {
    const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.expected_delta_eqi - a.expected_delta_eqi;
  });

  // Get top 5
  const top_priority_edits = sortedEdits.slice(0, 5);

  // Generate strategy
  const strategy = generateMicroEditStrategy(edits, top_priority_edits);

  return {
    edits,
    edits_by_type,
    top_priority_edits,
    strategy
  };
}

/**
 * Generate micro-editing strategy
 */
function generateMicroEditStrategy(allEdits: MicroEdit[], topEdits: MicroEdit[]): string {
  const lines: string[] = [];

  lines.push('🎨 MICRO-EDITING STRATEGY:');
  lines.push('');
  lines.push(`Total edits identified: ${allEdits.length}`);
  lines.push('');

  lines.push('PRIORITY ORDER:');
  topEdits.forEach((edit, i) => {
    lines.push(`${i + 1}. [${edit.priority.toUpperCase()}] ${edit.edit_type.replace(/_/g, ' ')}`);
    lines.push(`   Issue: ${edit.issue}`);
    lines.push(`   Expected ΔEQI: +${edit.expected_delta_eqi.toFixed(1)}`);
    lines.push('');
  });

  lines.push('APPROACH:');
  lines.push('1. Start with CRITICAL priority edits (highest impact)');
  lines.push('2. Use elicitation questions to gather missing details');
  lines.push('3. Never invent facts - only improve craft');
  lines.push('4. Preserve authentic voice');

  return lines.join('\n');
}

/**
 * Get micro-edit summary for quick inspection
 */
export function getMicroEditSummary(package_: MicroEditPackage): string {
  const lines: string[] = [];

  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('  STORY COACH — MICRO-EDITS');
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('');

  lines.push(`📝 Total Edits: ${package_.edits.length}`);
  lines.push('');

  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  EDITS BY TYPE');
  lines.push('─────────────────────────────────────────────────────────────────');
  Object.entries(package_.edits_by_type).forEach(([type, edits]) => {
    if (edits.length > 0) {
      lines.push(`${type.replace(/_/g, ' ').toUpperCase()}: ${edits.length} edit(s)`);
    }
  });

  lines.push('');
  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  TOP 5 PRIORITY EDITS');
  lines.push('─────────────────────────────────────────────────────────────────');
  package_.top_priority_edits.forEach((edit, i) => {
    const priorityEmoji = edit.priority === 'critical' ? '🚨' :
                         edit.priority === 'high' ? '⚠️' :
                         edit.priority === 'medium' ? '📝' : '💡';
    lines.push(`${priorityEmoji} ${i + 1}. [${edit.priority.toUpperCase()}] ${edit.edit_type.replace(/_/g, ' ')}`);
    lines.push(`   Location: Paragraph ${edit.location.paragraph_number}`);
    lines.push(`   Issue: ${edit.issue}`);
    lines.push(`   Expected ΔEQI: +${edit.expected_delta_eqi.toFixed(1)}`);
    lines.push('');
  });

  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push('  STRATEGY');
  lines.push('─────────────────────────────────────────────────────────────────');
  lines.push(package_.strategy);

  return lines.join('\n');
}
