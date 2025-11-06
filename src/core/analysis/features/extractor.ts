/**
 * Feature Extraction System
 *
 * Extracts structural and linguistic features from experience descriptions
 * to inform rubric scoring. This is Stage 1 of the analysis pipeline.
 *
 * Features extracted:
 * - Voice markers (passive/active verbs, buzzwords, sentence variety)
 * - Evidence markers (numbers, outcomes, before/after comparisons)
 * - Arc markers (stakes, turning points, temporal structure)
 * - Collaboration markers ("we" usage, credit-giving, named partners)
 * - Reflection markers (insight depth, learning statements, belief shifts)
 */

import { ExperienceEntry, ExtractedFeatures } from '../../types/experience';

// ============================================================================
// PATTERN LIBRARIES
// ============================================================================

const BUZZWORDS = [
  'passionate about',
  'thrilled to',
  'excited to',
  'leveraged',
  'synergy',
  'synergies',
  'responsible for',
  'in charge of',
  'tasked with',
  'stakeholder',
  'utilize',
  'optimize',
  'streamline',
  'enhance',
  'robust',
  'cutting-edge',
  'state-of-the-art',
  'world-class',
  'best-in-class',
  'game-changing',
  'impactful',
];

const PASSIVE_VERB_PATTERNS = [
  /was (\w+ed)\b/gi,
  /were (\w+ed)\b/gi,
  /been (\w+ed)\b/gi,
  /being (\w+ed)\b/gi,
];

const ACTIVE_LEADERSHIP_VERBS = [
  'built', 'created', 'designed', 'developed', 'launched', 'initiated',
  'led', 'managed', 'organized', 'coordinated', 'facilitated',
  'negotiated', 'persuaded', 'mobilized', 'recruited', 'trained',
  'redesigned', 'restructured', 'improved', 'optimized',
  'solved', 'resolved', 'addressed', 'tackled',
];

const COLLABORATION_VERBS = [
  'collaborated', 'partnered', 'worked with', 'teamed up',
  'consulted', 'coordinated with', 'engaged with',
];

const STAKES_INDICATORS = [
  'deadline', 'pressure', 'challenge', 'obstacle', 'constraint',
  'limited', 'shortage', 'crisis', 'emergency', 'urgent',
  'at risk', 'threatened', 'jeopardized',
  'depend', 'critical', 'essential', 'crucial',
];

const TURNING_POINT_PHRASES = [
  'until', 'when', 'then', 'suddenly', 'realized', 'discovered',
  'pivoted', 'shifted', 'changed course', 'adapted',
  'breakthrough', 'turning point', 'moment',
];

const TEMPORAL_MARKERS = [
  'first', 'initially', 'at first', 'began',
  'then', 'next', 'later', 'eventually', 'over time',
  'finally', 'ultimately', 'by the end',
  'month', 'week', 'year', 'semester', 'season',
];

const LEARNING_INDICATORS = [
  'learned', 'discovered', 'realized', 'understood',
  'recognized', 'noticed', 'observed', 'found',
  'insight', 'lesson', 'takeaway',
];

const BELIEF_SHIFT_INDICATORS = [
  'used to think', 'previously believed', 'once thought',
  'changed my mind', 'now understand', 'now see',
  'differently', 'shift', 'transform', 'evolve',
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function countMatches(text: string, patterns: RegExp[]): number {
  return patterns.reduce((count, pattern) => {
    const matches = text.match(pattern);
    return count + (matches ? matches.length : 0);
  }, 0);
}

function findMatches(text: string, keywords: string[]): string[] {
  const found: string[] = [];
  const lowerText = text.toLowerCase();

  for (const keyword of keywords) {
    if (lowerText.includes(keyword.toLowerCase())) {
      found.push(keyword);
    }
  }

  return found;
}

function extractNumbers(text: string): string[] {
  const numberPattern = /\b\d+(?:,\d{3})*(?:\.\d+)?\s*(?:%|percent|hours?|days?|weeks?|months?|years?|students?|people|participants|dollars?|\$|members?)?\b/gi;
  const matches = text.match(numberPattern);
  return matches ? [...new Set(matches)] : [];
}

function extractSentences(text: string): string[] {
  // Simple sentence splitter
  return text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
}

function calculateSentenceVariety(sentences: string[]): number {
  if (sentences.length === 0) return 0;
  if (sentences.length === 1) return 5; // Single sentence, moderate variety

  const lengths = sentences.map(s => s.split(/\s+/).length);
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);

  // Normalize to 0-10 scale (higher variance = more variety)
  // Typical std dev for good variety is 3-7 words
  const varietyScore = Math.min(10, (stdDev / 7) * 10);
  return Math.round(varietyScore * 10) / 10;
}

function detectOutcomeStatements(text: string): string[] {
  const outcomes: string[] = [];
  const sentences = extractSentences(text);

  const outcomePatterns = [
    /(?:resulted in|led to|achieved|accomplished|increased|decreased|improved|reduced)\s+[^.!?]+/gi,
    /\d+%?\s+(?:increase|decrease|improvement|reduction|growth)/gi,
  ];

  for (const sentence of sentences) {
    for (const pattern of outcomePatterns) {
      const matches = sentence.match(pattern);
      if (matches) {
        outcomes.push(...matches);
      }
    }
  }

  return outcomes;
}

function detectBeforeAfterComparison(text: string): boolean {
  const comparisonPatterns = [
    /(?:from|went from)\s+\d+.*?(?:to|→)\s+\d+/i,
    /before.*after/i,
    /initially.*(?:now|currently|today)/i,
    /used to.*now/i,
  ];

  return comparisonPatterns.some(pattern => pattern.test(text));
}

function extractNamedPartners(text: string): string[] {
  // Look for proper nouns that might be names (capitalized words that aren't at sentence start)
  const namePattern = /\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g;
  const matches = text.match(namePattern);

  if (!matches) return [];

  // Filter out common false positives (e.g., months, organizations)
  const commonFalsePositives = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    'I', 'We', 'Our', 'The', 'My'];

  return [...new Set(matches.filter(name => !commonFalsePositives.includes(name)))];
}

function assessReflectionQuality(text: string, learningCount: number, beliefShiftCount: number): 'none' | 'superficial' | 'moderate' | 'deep' {
  if (learningCount === 0 && beliefShiftCount === 0) return 'none';
  if (learningCount === 1 && beliefShiftCount === 0) return 'superficial';
  if (learningCount >= 2 || beliefShiftCount === 1) return 'moderate';
  if (learningCount >= 3 && beliefShiftCount >= 1) return 'deep';
  return 'moderate';
}

// ============================================================================
// MAIN EXTRACTION FUNCTION
// ============================================================================

export async function extractFeatures(entry: ExperienceEntry): Promise<ExtractedFeatures> {
  const text = entry.description_original;
  const sentences = extractSentences(text);

  // ==========================================================================
  // VOICE MARKERS
  // ==========================================================================

  const passiveVerbCount = countMatches(text, PASSIVE_VERB_PATTERNS);
  const activeVerbCount = ACTIVE_LEADERSHIP_VERBS.filter(verb =>
    new RegExp(`\\b${verb}\\b`, 'i').test(text)
  ).length;

  const buzzwordsFound = findMatches(text, BUZZWORDS);
  const buzzwordCount = buzzwordsFound.length;

  const sentenceVarietyScore = calculateSentenceVariety(sentences);

  const firstPersonCount = (text.match(/\bI\b/g) || []).length;

  const totalWords = text.split(/\s+/).length;
  const avgSentenceLength = totalWords / Math.max(sentences.length, 1);

  const passiveRatio = passiveVerbCount / Math.max(passiveVerbCount + activeVerbCount, 1);

  // ==========================================================================
  // EVIDENCE MARKERS
  // ==========================================================================

  const numbersFound = extractNumbers(text);
  const numberCount = numbersFound.length;
  const hasConcreteNumbers = numberCount > 0;

  const outcomeStatements = detectOutcomeStatements(text);
  const beforeAfterComparison = detectBeforeAfterComparison(text);

  // Metric specificity: 0-10 scale based on number and quality of metrics
  let metricSpecificityScore = 0;
  if (numberCount >= 3) metricSpecificityScore += 4;
  else if (numberCount >= 2) metricSpecificityScore += 3;
  else if (numberCount >= 1) metricSpecificityScore += 2;

  if (outcomeStatements.length > 0) metricSpecificityScore += 3;
  if (beforeAfterComparison) metricSpecificityScore += 3;

  metricSpecificityScore = Math.min(10, metricSpecificityScore);

  // ==========================================================================
  // ARC MARKERS
  // ==========================================================================

  const stakesIndicators = findMatches(text, STAKES_INDICATORS);
  const hasStakes = stakesIndicators.length > 0;

  const turningPointPhrases = findMatches(text, TURNING_POINT_PHRASES);
  const hasTurningPoint = turningPointPhrases.length > 0;

  const temporalMarkers = findMatches(text, TEMPORAL_MARKERS);

  // Narrative structure score: temporal markers + stakes + turning point
  let narrativeStructureScore = 0;
  if (temporalMarkers.length >= 3) narrativeStructureScore += 4;
  else if (temporalMarkers.length >= 2) narrativeStructureScore += 3;
  else if (temporalMarkers.length >= 1) narrativeStructureScore += 2;

  if (hasStakes) narrativeStructureScore += 3;
  if (hasTurningPoint) narrativeStructureScore += 3;

  narrativeStructureScore = Math.min(10, narrativeStructureScore);

  // ==========================================================================
  // COLLABORATION MARKERS
  // ==========================================================================

  const weUsageCount = (text.match(/\bwe\b/gi) || []).length;

  const collaborationVerbs = findMatches(text, COLLABORATION_VERBS);

  const namedPartners = extractNamedPartners(text);
  const creditGiven = namedPartners.length > 0 || collaborationVerbs.length > 0;

  // Team orientation score: balance of "we" vs "I" + collaboration verbs + named partners
  let teamOrientationScore = 0;
  const weToIRatio = weUsageCount / Math.max(firstPersonCount, 1);
  if (weToIRatio >= 0.5) teamOrientationScore += 4;
  else if (weToIRatio >= 0.3) teamOrientationScore += 3;
  else if (weToIRatio >= 0.1) teamOrientationScore += 2;

  teamOrientationScore += Math.min(3, collaborationVerbs.length);
  teamOrientationScore += Math.min(3, namedPartners.length);

  teamOrientationScore = Math.min(10, teamOrientationScore);

  // ==========================================================================
  // REFLECTION MARKERS
  // ==========================================================================

  const learningStatements = findMatches(text, LEARNING_INDICATORS);
  const beliefShiftIndicators = findMatches(text, BELIEF_SHIFT_INDICATORS);

  const reflectionQuality = assessReflectionQuality(text, learningStatements.length, beliefShiftIndicators.length);

  // Check for transferable learning (mentions of applying lessons elsewhere)
  const transferablePatterns = [
    /(?:apply|use|bring|carry)\s+(?:this|these|what I learned)/i,
    /helped me (?:in|with|understand)/i,
    /now (?:approach|handle|see)/i,
  ];
  const transferableLearning = transferablePatterns.some(pattern => pattern.test(text));

  // Insight depth score: based on reflection quality and transferability
  let insightDepthScore = 0;
  if (reflectionQuality === 'deep') insightDepthScore = 9;
  else if (reflectionQuality === 'moderate') insightDepthScore = 6;
  else if (reflectionQuality === 'superficial') insightDepthScore = 3;
  else insightDepthScore = 0;

  if (transferableLearning) insightDepthScore = Math.min(10, insightDepthScore + 2);

  // ==========================================================================
  // OVERALL METRICS
  // ==========================================================================

  const wordCount = totalWords;
  const characterCount = text.length;

  // ==========================================================================
  // ASSEMBLE FEATURES
  // ==========================================================================

  return {
    entry_id: entry.id,

    voice: {
      passive_verb_count: passiveVerbCount,
      active_verb_count: activeVerbCount,
      passive_ratio: Math.round(passiveRatio * 100) / 100,
      buzzword_count: buzzwordCount,
      buzzwords_found: buzzwordsFound,
      sentence_variety_score: sentenceVarietyScore,
      first_person_count: firstPersonCount,
      avg_sentence_length: Math.round(avgSentenceLength * 10) / 10,
    },

    evidence: {
      has_concrete_numbers: hasConcreteNumbers,
      number_count: numberCount,
      numbers_found: numbersFound,
      outcome_statements: outcomeStatements,
      before_after_comparison: beforeAfterComparison,
      metric_specificity_score: metricSpecificityScore,
    },

    arc: {
      has_stakes: hasStakes,
      stakes_indicators: stakesIndicators,
      has_turning_point: hasTurningPoint,
      turning_point_phrases: turningPointPhrases,
      temporal_markers: temporalMarkers,
      narrative_structure_score: narrativeStructureScore,
    },

    collaboration: {
      we_usage_count: weUsageCount,
      credit_given: creditGiven,
      named_partners: namedPartners,
      collaboration_verbs: collaborationVerbs,
      team_orientation_score: teamOrientationScore,
    },

    reflection: {
      insight_depth_score: insightDepthScore,
      learning_statements: learningStatements,
      belief_shift_indicators: beliefShiftIndicators,
      transferable_learning: transferableLearning,
      reflection_quality: reflectionQuality,
    },

    word_count: wordCount,
    character_count: characterCount,
    extraction_timestamp: new Date().toISOString(),
  };
}

/**
 * Validate extracted features for debugging
 */
export function validateFeatures(features: ExtractedFeatures): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check score ranges
  if (features.voice.sentence_variety_score < 0 || features.voice.sentence_variety_score > 10) {
    errors.push('sentence_variety_score out of range');
  }
  if (features.evidence.metric_specificity_score < 0 || features.evidence.metric_specificity_score > 10) {
    errors.push('metric_specificity_score out of range');
  }
  if (features.arc.narrative_structure_score < 0 || features.arc.narrative_structure_score > 10) {
    errors.push('narrative_structure_score out of range');
  }
  if (features.collaboration.team_orientation_score < 0 || features.collaboration.team_orientation_score > 10) {
    errors.push('team_orientation_score out of range');
  }
  if (features.reflection.insight_depth_score < 0 || features.reflection.insight_depth_score > 10) {
    errors.push('insight_depth_score out of range');
  }

  // Check passive ratio
  if (features.voice.passive_ratio < 0 || features.voice.passive_ratio > 1) {
    errors.push('passive_ratio out of range');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
