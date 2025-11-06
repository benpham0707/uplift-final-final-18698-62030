/**
 * Elite Pattern Detector
 *
 * Detects high-level structural patterns found in exemplar essays from
 * Harvard, Princeton, MIT, Yale, Duke, Berkeley, etc.
 *
 * KEY FINDINGS FROM EXEMPLAR ANALYSIS:
 * - 68% show vulnerability moments
 * - 42% quantify impact with specific numbers
 * - Extended narrative arcs show perseverance (6 years, 10 drafts)
 * - Micro→macro structure (specific moment → universal insight)
 * - Comfort with ambiguity signals maturity
 * - Unconventional topics work when executed well
 *
 * Detection Categories:
 * 1. Micro→Macro structure (scene → universal meaning)
 * 2. Quantification of impact (specific numbers vs vague claims)
 * 3. Extended narrative arcs (time spans, persistence)
 * 4. Philosophical depth (abstract concepts grounded in experience)
 * 5. Counter-narratives (subverting expectations)
 * 6. Vulnerability clusters (multiple moments building authentic voice)
 * 7. Unconventional topics (risk-taking)
 */

import { splitIntoParagraphs, splitIntoSentences } from '../utils/textProcessing';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface MicroMacroStructure {
  /** Is micro→macro present? */
  has_structure: boolean;

  /** Micro elements (specific scenes/moments) */
  micro_elements: {
    text: string;
    paragraph_index: number;
    type: 'scene' | 'anecdote' | 'specific_moment';
  }[];

  /** Macro elements (universal insights/meanings) */
  macro_elements: {
    text: string;
    paragraph_index: number;
    abstraction_level: 'moderate' | 'high' | 'philosophical';
  }[];

  /** Are they connected? */
  is_connected: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface QuantificationProfile {
  /** Total quantified claims */
  quantified_count: number;

  /** Specific numbers found (20,000 students, 19% → B, etc.) */
  numbers_found: Array<{
    number: string;
    context: string;
    sentence_index: number;
    type: 'count' | 'percentage' | 'measurement' | 'time_duration' | 'monetary';
  }>;

  /** Vague claims (many, some, a lot, etc.) */
  vague_count: number;

  /** Specificity ratio (quantified / total claims) */
  specificity_ratio: number;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface NarrativeArc {
  /** Time span mentioned (6 years, 3 months, etc.) */
  time_span: string | null;

  /** Duration in days (for sorting/comparison) */
  duration_days: number | null;

  /** Shows extended persistence? */
  shows_persistence: boolean;

  /** Narrative arc type */
  arc_type: 'moment_in_time' | 'short_journey' | 'extended_journey' | 'lifelong_pursuit';

  /** Temporal markers found */
  temporal_markers: string[];

  /** Quality score 0-10 */
  quality_score: number;
}

export interface PhilosophicalDepth {
  /** Abstract concepts mentioned */
  abstract_concepts: Array<{
    concept: string;
    sentence: string;
    sentence_index: number;
    is_grounded: boolean; // Grounded in concrete experience?
  }>;

  /** Depth level */
  depth_level: 'surface' | 'moderate' | 'deep' | 'profound';

  /** Balance between abstract and concrete */
  abstraction_balance: 'too_abstract' | 'balanced' | 'too_concrete';

  /** Quality score 0-10 */
  quality_score: number;
}

export interface CounterNarrative {
  /** Does essay subvert expectations? */
  has_counter_narrative: boolean;

  /** Type of subversion */
  subversion_type: 'topic' | 'perspective' | 'outcome' | 'values' | null;

  /** Examples of subversion */
  examples: Array<{
    text: string;
    sentence_index: number;
  }>;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface VulnerabilityCluster {
  /** Number of distinct vulnerability moments */
  moment_count: number;

  /** Are they distributed throughout essay? */
  well_distributed: boolean;

  /** Paragraph indices with vulnerability */
  paragraph_indices: number[];

  /** Do they build to authentic voice? */
  builds_authenticity: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface UnconventionalTopic {
  /** Is topic unconventional? */
  is_unconventional: boolean;

  /** Topic category */
  topic_category: 'conventional' | 'moderately_unconventional' | 'highly_unconventional' | null;

  /** Risk level */
  risk_level: 'safe' | 'moderate_risk' | 'high_risk';

  /** Is it executed well? */
  well_executed: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface ElitePatternProfile {
  /** Micro→macro structure */
  micro_macro: MicroMacroStructure;

  /** Quantification profile */
  quantification: QuantificationProfile;

  /** Narrative arc */
  narrative_arc: NarrativeArc;

  /** Philosophical depth */
  philosophical_depth: PhilosophicalDepth;

  /** Counter-narrative */
  counter_narrative: CounterNarrative;

  /** Vulnerability cluster */
  vulnerability_cluster: VulnerabilityCluster;

  /** Unconventional topic */
  unconventional_topic: UnconventionalTopic;

  /** Overall elite pattern score (0-100) */
  overall_elite_score: number;

  /** Pattern strengths (sorted by score) */
  pattern_strengths: Array<{
    pattern: string;
    score: number;
  }>;

  /** Recommendations */
  recommendations: string[];
}

// ============================================================================
// PATTERN DATABASES
// ============================================================================

/**
 * Abstract concept markers
 */
const ABSTRACT_CONCEPTS = [
  // Philosophical
  'meaning', 'purpose', 'identity', 'authenticity', 'truth', 'justice', 'beauty',
  'freedom', 'responsibility', 'morality', 'ethics', 'existence',

  // Psychological
  'belonging', 'connection', 'resilience', 'growth', 'transformation', 'awareness',
  'consciousness', 'perception', 'understanding', 'wisdom',

  // Social
  'community', 'humanity', 'society', 'culture', 'tradition', 'progress',
  'equality', 'diversity', 'inclusion', 'empathy',

  // Epistemic
  'knowledge', 'learning', 'discovery', 'curiosity', 'wonder', 'mystery',
  'complexity', 'nuance', 'ambiguity', 'paradox'
];

/**
 * Macro-level conclusion markers
 */
const MACRO_MARKERS = [
  // Universal insights
  /this taught me (that|about|how)/i,
  /i (now |finally )?(understand|realize|see|know) (that|how)/i,
  /(this|it) (reveals|shows|demonstrates|illuminates) (something|a truth)/i,

  // Philosophical turns
  /in the end/i,
  /ultimately/i,
  /what (really |truly )?matters/i,
  /the (real|true) (lesson|meaning|purpose)/i,

  // Generalization
  /we all/i,
  /everyone/i,
  /human nature/i,
  /the human (experience|condition)/i
];

/**
 * Vague claim markers (opposite of quantification)
 */
const VAGUE_MARKERS = [
  'many', 'some', 'several', 'numerous', 'countless', 'various',
  'a lot', 'a bunch', 'tons of', 'lots of',
  'significantly', 'substantially', 'considerably',
  'improved', 'helped', 'impacted', 'influenced' // Vague without numbers
];

/**
 * Time span patterns
 */
const TIME_SPAN_PATTERNS = [
  // Years
  { pattern: /(\d+)\s*years?/i, multiplier: 365 },
  // Months
  { pattern: /(\d+)\s*months?/i, multiplier: 30 },
  // Weeks
  { pattern: /(\d+)\s*weeks?/i, multiplier: 7 },
  // Days
  { pattern: /(\d+)\s*days?/i, multiplier: 1 },
  // Decades
  { pattern: /(\d+)\s*decades?/i, multiplier: 3650 },

  // Narrative arc phrases
  { pattern: /over (the course of|the past|the last) (\d+) (years?|months?)/i, multiplier: 0 },
  { pattern: /for (\d+) (years?|months?)/i, multiplier: 0 },
  { pattern: /since i was (\d+)/i, multiplier: 0 }
];

/**
 * Conventional topic markers
 */
const CONVENTIONAL_TOPICS = [
  // Very common
  'sports', 'team', 'game', 'championship', 'tournament', 'practice', 'coach',
  'volunteering', 'community service', 'helping others', 'giving back',
  'science fair', 'research project', 'experiment', 'hypothesis',
  'leadership', 'president', 'founded', 'started a club',
  'immigrant', 'immigration', 'my parents', 'heritage', 'culture',
  'death', 'grandparent', 'loss', 'grief'
];

/**
 * Counter-narrative markers
 */
const COUNTER_NARRATIVE_MARKERS = [
  // Perspective subversion
  /but (what|that's not|that wasn't)/i,
  /the (real|actual) (story|truth|lesson)/i,
  /it (wasn't|isn't) (about|what)/i,
  /i (used to|once) think .{1,100}but/i,

  // Expectation subversion
  /you('d| would) (think|expect|assume)/i,
  /most people (think|believe|assume)/i,
  /everyone (says|tells me|expects)/i,

  // Value subversion
  /(success|winning|achieving) (isn't|wasn't)/i,
  /failure (was|became|taught)/i,
  /losing (taught|showed|revealed)/i
];

// ============================================================================
// DETECTION FUNCTIONS
// ============================================================================

/**
 * Detect micro→macro structure
 */
function detectMicroMacro(paragraphs: string[]): MicroMacroStructure {
  const micro_elements: MicroMacroStructure['micro_elements'] = [];
  const macro_elements: MicroMacroStructure['macro_elements'] = [];

  paragraphs.forEach((para, idx) => {
    const sentences = splitIntoSentences(para);
    const lowerPara = para.toLowerCase();

    // Detect micro (scenes, specific moments)
    // Scenes have temporal/spatial anchors + sensory details
    const hasTemporal = /\b(when|as|after|before|during|while|at)\b/i.test(para);
    const hasSpatial = /\b(in the|at the|on the|inside|outside|room|table|door)\b/i.test(para);
    const hasSensory = /\b(saw|heard|felt|smelled|tasted|touch|sound|sight)\b/i.test(para);
    const hasAction = /\b(walked|ran|grabbed|opened|closed|turned|sat|stood)\b/i.test(para);

    if ((hasTemporal || hasSpatial) && (hasSensory || hasAction)) {
      micro_elements.push({
        text: para,
        paragraph_index: idx,
        type: 'scene'
      });
    }

    // Detect macro (universal insights, abstract concepts)
    const hasMacroMarker = MACRO_MARKERS.some(marker => marker.test(para));
    const hasAbstractConcept = ABSTRACT_CONCEPTS.some(concept => lowerPara.includes(concept));

    if (hasMacroMarker || hasAbstractConcept) {
      // Determine abstraction level
      const abstractConceptCount = ABSTRACT_CONCEPTS.filter(c => lowerPara.includes(c)).length;
      let abstraction_level: MicroMacroStructure['macro_elements'][0]['abstraction_level'] = 'moderate';

      if (abstractConceptCount >= 3 || lowerPara.match(/philosophy|existential|metaphysical/i)) {
        abstraction_level = 'philosophical';
      } else if (abstractConceptCount >= 2) {
        abstraction_level = 'high';
      }

      macro_elements.push({
        text: para,
        paragraph_index: idx,
        abstraction_level
      });
    }
  });

  // Check if connected (macro comes after micro)
  const is_connected = micro_elements.length > 0 &&
                       macro_elements.length > 0 &&
                       macro_elements.some(macro => micro_elements.some(micro => micro.paragraph_index < macro.paragraph_index));

  const has_structure = micro_elements.length > 0 && macro_elements.length > 0;

  // Score
  let quality_score = 0;
  if (has_structure) {
    quality_score += 4;
    if (is_connected) quality_score += 3;
    if (micro_elements.length >= 2) quality_score += 1;
    if (macro_elements.some(m => m.abstraction_level === 'philosophical')) quality_score += 2;
  }

  return {
    has_structure,
    micro_elements,
    macro_elements,
    is_connected,
    quality_score: Math.min(10, quality_score)
  };
}

/**
 * Detect quantification vs vagueness
 */
function detectQuantification(sentences: string[]): QuantificationProfile {
  const numbers_found: QuantificationProfile['numbers_found'] = [];
  let vague_count = 0;

  sentences.forEach((sentence, idx) => {
    // Find numbers
    const numberMatches = sentence.match(/\b\d+([,\.]\d+)?(%|k|K|thousand|million|hours?|days?|students?|people|dollars?|\$)?\b/g);

    if (numberMatches) {
      numberMatches.forEach(num => {
        // Determine type
        let type: QuantificationProfile['numbers_found'][0]['type'] = 'count';
        if (num.includes('%')) type = 'percentage';
        else if (num.includes('$') || num.includes('dollar')) type = 'monetary';
        else if (num.includes('hour') || num.includes('day') || num.includes('week')) type = 'time_duration';
        else if (num.match(/feet|inches|meters|miles|pounds|kg/)) type = 'measurement';

        numbers_found.push({
          number: num,
          context: sentence,
          sentence_index: idx,
          type
        });
      });
    }

    // Find vague markers
    const lowerSentence = sentence.toLowerCase();
    const vagueCount = VAGUE_MARKERS.filter(marker => lowerSentence.includes(marker)).length;
    vague_count += vagueCount;
  });

  const quantified_count = numbers_found.length;
  const total_claims = quantified_count + vague_count;
  const specificity_ratio = total_claims > 0 ? quantified_count / total_claims : 0;

  // Score (42% of exemplars quantify - this is the benchmark)
  let quality_score = 0;
  if (specificity_ratio >= 0.6) {
    quality_score = 10; // Exceptional specificity
  } else if (specificity_ratio >= 0.4) {
    quality_score = 8; // Strong specificity (matches exemplar benchmark)
  } else if (specificity_ratio >= 0.2) {
    quality_score = 6; // Moderate specificity
  } else if (quantified_count > 0) {
    quality_score = 4; // Some specificity
  } else {
    quality_score = 2; // All vague
  }

  return {
    quantified_count,
    numbers_found,
    vague_count,
    specificity_ratio,
    quality_score
  };
}

/**
 * Detect narrative arc
 */
function detectNarrativeArc(essayText: string): NarrativeArc {
  const lowerText = essayText.toLowerCase();
  const temporal_markers: string[] = [];
  let time_span: string | null = null;
  let duration_days: number | null = null;

  // Find time spans
  for (const { pattern, multiplier } of TIME_SPAN_PATTERNS) {
    const match = essayText.match(pattern);
    if (match) {
      temporal_markers.push(match[0]);

      // Calculate duration
      if (multiplier > 0) {
        const number = parseInt(match[1] || '1');
        const days = number * multiplier;

        if (!duration_days || days > duration_days) {
          duration_days = days;
          time_span = match[0];
        }
      } else {
        // Narrative arc phrase - extract duration manually
        const yearMatch = match[0].match(/(\d+)\s*years?/i);
        const monthMatch = match[0].match(/(\d+)\s*months?/i);

        if (yearMatch) {
          const days = parseInt(yearMatch[1]) * 365;
          if (!duration_days || days > duration_days) {
            duration_days = days;
            time_span = match[0];
          }
        } else if (monthMatch) {
          const days = parseInt(monthMatch[1]) * 30;
          if (!duration_days || days > duration_days) {
            duration_days = days;
            time_span = match[0];
          }
        }
      }
    }
  }

  // Determine persistence
  const persistenceMarkers = [
    'kept', 'continued', 'persisted', 'persevered', 'sustained', 'maintained',
    'didn\'t give up', 'never stopped', 'still', 'again and again', 'repeatedly'
  ];
  const shows_persistence = persistenceMarkers.some(marker => lowerText.includes(marker));

  // Determine arc type
  let arc_type: NarrativeArc['arc_type'] = 'moment_in_time';
  if (duration_days) {
    if (duration_days >= 1095) { // 3+ years
      arc_type = 'extended_journey';
    } else if (duration_days >= 180) { // 6+ months
      arc_type = 'short_journey';
    }
  } else if (lowerText.match(/my (whole |entire )?life|since i was (young|a child)/i)) {
    arc_type = 'lifelong_pursuit';
  }

  // Score
  let quality_score = 4; // Base
  if (arc_type === 'extended_journey') quality_score += 4;
  else if (arc_type === 'lifelong_pursuit') quality_score += 5;
  else if (arc_type === 'short_journey') quality_score += 2;

  if (shows_persistence) quality_score += 2;

  return {
    time_span,
    duration_days,
    shows_persistence,
    arc_type,
    temporal_markers,
    quality_score: Math.min(10, quality_score)
  };
}

/**
 * Detect philosophical depth
 */
function detectPhilosophicalDepth(sentences: string[]): PhilosophicalDepth {
  const abstract_concepts: PhilosophicalDepth['abstract_concepts'] = [];

  sentences.forEach((sentence, idx) => {
    const lowerSentence = sentence.toLowerCase();

    // Find abstract concepts
    for (const concept of ABSTRACT_CONCEPTS) {
      if (lowerSentence.includes(concept)) {
        // Check if grounded (concrete details in same sentence or previous sentence)
        const context = idx > 0 ? sentences[idx - 1] + ' ' + sentence : sentence;
        const is_grounded = /\b(when|where|at|in the|saw|heard|felt|moment|time|place)\b/i.test(context);

        abstract_concepts.push({
          concept,
          sentence,
          sentence_index: idx,
          is_grounded
        });
      }
    }
  });

  // Determine depth level
  let depth_level: PhilosophicalDepth['depth_level'] = 'surface';
  const conceptCount = abstract_concepts.length;
  const groundedCount = abstract_concepts.filter(c => c.is_grounded).length;

  if (conceptCount >= 5 && groundedCount >= 3) {
    depth_level = 'profound';
  } else if (conceptCount >= 3 && groundedCount >= 2) {
    depth_level = 'deep';
  } else if (conceptCount >= 2) {
    depth_level = 'moderate';
  }

  // Determine balance
  let abstraction_balance: PhilosophicalDepth['abstraction_balance'] = 'balanced';
  const groundedRatio = conceptCount > 0 ? groundedCount / conceptCount : 0;

  if (groundedRatio < 0.3) {
    abstraction_balance = 'too_abstract';
  } else if (groundedRatio > 0.8) {
    abstraction_balance = 'too_concrete';
  }

  // Score
  let quality_score = 0;
  if (depth_level === 'profound') quality_score += 5;
  else if (depth_level === 'deep') quality_score += 4;
  else if (depth_level === 'moderate') quality_score += 2;

  if (abstraction_balance === 'balanced') quality_score += 3;
  else if (abstraction_balance === 'too_concrete') quality_score += 1;

  if (groundedCount >= 2) quality_score += 2;

  return {
    abstract_concepts,
    depth_level,
    abstraction_balance,
    quality_score: Math.min(10, quality_score)
  };
}

/**
 * Detect counter-narrative
 */
function detectCounterNarrative(sentences: string[]): CounterNarrative {
  const examples: CounterNarrative['examples'] = [];
  let subversion_type: CounterNarrative['subversion_type'] = null;

  sentences.forEach((sentence, idx) => {
    for (const marker of COUNTER_NARRATIVE_MARKERS) {
      if (marker.test(sentence)) {
        examples.push({
          text: sentence,
          sentence_index: idx
        });

        // Determine subversion type
        const lowerSentence = sentence.toLowerCase();
        if (lowerSentence.match(/think|thought|expect|assume/)) {
          subversion_type = 'perspective';
        } else if (lowerSentence.match(/success|failure|winning|losing/)) {
          subversion_type = 'outcome';
        } else if (lowerSentence.match(/real|actual|truth|story/)) {
          subversion_type = 'topic';
        } else {
          subversion_type = 'values';
        }
      }
    }
  });

  const has_counter_narrative = examples.length > 0;

  // Score
  let quality_score = 0;
  if (has_counter_narrative) {
    quality_score = 6 + Math.min(4, examples.length * 2);
  }

  return {
    has_counter_narrative,
    subversion_type,
    examples,
    quality_score
  };
}

/**
 * Detect vulnerability cluster
 *
 * NOTE: Requires vulnerability data from interiorityDetector
 * For now, we'll detect distribution pattern only
 */
function detectVulnerabilityCluster(
  vulnerability_moments: Array<{ sentence_index: number; quality_score: number }>,
  total_paragraphs: number
): VulnerabilityCluster {
  const moment_count = vulnerability_moments.length;

  // Extract paragraph indices (assuming ~3 sentences per paragraph)
  const paragraph_indices = vulnerability_moments.map(v => Math.floor(v.sentence_index / 3));
  const unique_paragraphs = new Set(paragraph_indices);

  // Check distribution
  const well_distributed = unique_paragraphs.size >= Math.min(3, moment_count);

  // Check if builds authenticity (high-quality moments)
  const high_quality_count = vulnerability_moments.filter(v => v.quality_score >= 7).length;
  const builds_authenticity = high_quality_count >= 2 || (moment_count >= 3 && high_quality_count >= 1);

  // Score
  let quality_score = 0;
  if (moment_count >= 2) quality_score += 4;
  if (moment_count >= 3) quality_score += 2;
  if (well_distributed) quality_score += 2;
  if (builds_authenticity) quality_score += 2;

  return {
    moment_count,
    well_distributed,
    paragraph_indices: Array.from(unique_paragraphs),
    builds_authenticity,
    quality_score: Math.min(10, quality_score)
  };
}

/**
 * Detect unconventional topic
 */
function detectUnconventionalTopic(essayText: string): UnconventionalTopic {
  const lowerText = essayText.toLowerCase();

  // Count conventional topic markers
  const conventionalCount = CONVENTIONAL_TOPICS.filter(topic => lowerText.includes(topic)).length;

  // Unconventional topic examples from our corpus:
  // - Hot sauce (Berkeley)
  // - Jon Snow / Game of Thrones (Northwestern)
  // - Costco (accepted at many schools)
  // - Dumplings (common but executed uniquely)

  const unconventionalMarkers = [
    'hot sauce', 'game of thrones', 'jon snow', 'costco', 'ikea', 'target',
    'pickle', 'sandwich', 'pizza', 'coffee', 'subway', 'uber',
    'socks', 'shoes', 'backpack', 'pencil', 'eraser'
  ];

  const hasUnconventionalMarker = unconventionalMarkers.some(marker => lowerText.includes(marker));

  // Determine category
  let topic_category: UnconventionalTopic['topic_category'] = null;
  let risk_level: UnconventionalTopic['risk_level'] = 'safe';

  if (conventionalCount === 0 && hasUnconventionalMarker) {
    topic_category = 'highly_unconventional';
    risk_level = 'high_risk';
  } else if (conventionalCount <= 2 && (hasUnconventionalMarker || lowerText.match(/unexpected|unusual|strange|weird/))) {
    topic_category = 'moderately_unconventional';
    risk_level = 'moderate_risk';
  } else if (conventionalCount >= 3) {
    topic_category = 'conventional';
    risk_level = 'safe';
  } else {
    topic_category = 'conventional';
    risk_level = 'safe';
  }

  const is_unconventional = topic_category !== 'conventional';

  // Check execution (presence of scene, vulnerability, insight)
  const hasScene = /\b(saw|heard|felt|smelled|walked|grabbed|opened|turned)\b/i.test(essayText);
  const hasVulnerability = /\b(afraid|scared|failed|embarrassed|didn't know|was wrong)\b/i.test(essayText);
  const hasInsight = MACRO_MARKERS.some(marker => marker.test(essayText));

  const well_executed = hasScene && hasVulnerability && hasInsight;

  // Score
  let quality_score = 5; // Base
  if (is_unconventional && well_executed) {
    quality_score = 10; // High risk, high reward
  } else if (is_unconventional && !well_executed) {
    quality_score = 3; // High risk, poor execution
  } else if (!is_unconventional && well_executed) {
    quality_score = 7; // Conventional but well-done
  }

  return {
    is_unconventional,
    topic_category,
    risk_level,
    well_executed,
    quality_score
  };
}

/**
 * Calculate overall elite pattern score
 */
function calculateEliteScore(profile: Omit<ElitePatternProfile, 'overall_elite_score' | 'pattern_strengths' | 'recommendations'>): number {
  // Weighted components
  const weights = {
    micro_macro: 0.20,
    quantification: 0.15,
    narrative_arc: 0.15,
    philosophical_depth: 0.15,
    counter_narrative: 0.10,
    vulnerability_cluster: 0.15,
    unconventional_topic: 0.10
  };

  const score =
    profile.micro_macro.quality_score * weights.micro_macro +
    profile.quantification.quality_score * weights.quantification +
    profile.narrative_arc.quality_score * weights.narrative_arc +
    profile.philosophical_depth.quality_score * weights.philosophical_depth +
    profile.counter_narrative.quality_score * weights.counter_narrative +
    profile.vulnerability_cluster.quality_score * weights.vulnerability_cluster +
    profile.unconventional_topic.quality_score * weights.unconventional_topic;

  return Math.round(score * 10); // Convert to 0-100 scale
}

/**
 * Generate pattern strengths
 */
function generatePatternStrengths(profile: Omit<ElitePatternProfile, 'overall_elite_score' | 'pattern_strengths' | 'recommendations'>): ElitePatternProfile['pattern_strengths'] {
  const strengths = [
    { pattern: 'Micro→Macro Structure', score: profile.micro_macro.quality_score },
    { pattern: 'Quantification', score: profile.quantification.quality_score },
    { pattern: 'Narrative Arc', score: profile.narrative_arc.quality_score },
    { pattern: 'Philosophical Depth', score: profile.philosophical_depth.quality_score },
    { pattern: 'Counter-Narrative', score: profile.counter_narrative.quality_score },
    { pattern: 'Vulnerability Cluster', score: profile.vulnerability_cluster.quality_score },
    { pattern: 'Unconventional Topic', score: profile.unconventional_topic.quality_score }
  ];

  return strengths.sort((a, b) => b.score - a.score);
}

/**
 * Generate recommendations
 */
function generateRecommendations(profile: Omit<ElitePatternProfile, 'overall_elite_score' | 'pattern_strengths' | 'recommendations'>): string[] {
  const recommendations: string[] = [];

  // Micro→macro
  if (profile.micro_macro.quality_score < 7) {
    if (!profile.micro_macro.has_structure) {
      recommendations.push('Add micro→macro structure: start with specific scene, build to universal insight');
    } else if (!profile.micro_macro.is_connected) {
      recommendations.push('Connect your scene to meaning: make the link explicit between moment and insight');
    }
  }

  // Quantification
  if (profile.quantification.quality_score < 7) {
    recommendations.push('Quantify impact: replace vague claims with specific numbers (hours, people, percentages)');
  }

  // Narrative arc
  if (profile.narrative_arc.quality_score < 7 && profile.narrative_arc.arc_type === 'moment_in_time') {
    recommendations.push('Consider extended narrative arc: show persistence over time (months/years)');
  }

  // Philosophical depth
  if (profile.philosophical_depth.quality_score < 7) {
    if (profile.philosophical_depth.abstraction_balance === 'too_abstract') {
      recommendations.push('Ground abstract ideas: connect philosophical concepts to concrete experiences');
    } else if (profile.philosophical_depth.depth_level === 'surface') {
      recommendations.push('Deepen reflection: move from surface observations to philosophical insights');
    }
  }

  // Vulnerability cluster
  if (profile.vulnerability_cluster.quality_score < 7) {
    if (profile.vulnerability_cluster.moment_count < 2) {
      recommendations.push('Add vulnerability moments: MULTIPLE moments of authentic fear/failure/uncertainty (need 2+ for elite essays)');
    } else if (!profile.vulnerability_cluster.well_distributed) {
      recommendations.push('Distribute vulnerability: spread moments throughout essay rather than clustering');
    }
  }

  // Unconventional topic
  if (profile.unconventional_topic.is_unconventional && !profile.unconventional_topic.well_executed) {
    recommendations.push('Strengthen unconventional topic execution: risky topics need scene + vulnerability + insight');
  }

  return recommendations;
}

// ============================================================================
// MAIN DETECTOR
// ============================================================================

/**
 * Detect elite patterns in essay
 *
 * @param essayText - Full essay text
 * @param vulnerability_moments - (Optional) From interiorityDetector
 * @returns Complete elite pattern profile
 */
export function detectElitePatterns(
  essayText: string,
  vulnerability_moments?: Array<{ sentence_index: number; quality_score: number }>
): ElitePatternProfile {
  const paragraphs = splitIntoParagraphs(essayText);
  const allSentences = paragraphs.flatMap(p => splitIntoSentences(p));

  // Run all detectors
  const micro_macro = detectMicroMacro(paragraphs);
  const quantification = detectQuantification(allSentences);
  const narrative_arc = detectNarrativeArc(essayText);
  const philosophical_depth = detectPhilosophicalDepth(allSentences);
  const counter_narrative = detectCounterNarrative(allSentences);

  // Vulnerability cluster (use provided data or empty)
  const vulnerability_cluster = detectVulnerabilityCluster(
    vulnerability_moments || [],
    paragraphs.length
  );

  const unconventional_topic = detectUnconventionalTopic(essayText);

  // Build profile (without final scores)
  const profile: Omit<ElitePatternProfile, 'overall_elite_score' | 'pattern_strengths' | 'recommendations'> = {
    micro_macro,
    quantification,
    narrative_arc,
    philosophical_depth,
    counter_narrative,
    vulnerability_cluster,
    unconventional_topic
  };

  // Calculate final scores
  const overall_elite_score = calculateEliteScore(profile);
  const pattern_strengths = generatePatternStrengths(profile);
  const recommendations = generateRecommendations(profile);

  return {
    ...profile,
    overall_elite_score,
    pattern_strengths,
    recommendations
  };
}

/**
 * Get elite pattern summary for quick inspection
 */
export function getElitePatternSummary(profile: ElitePatternProfile): string {
  const lines: string[] = [];

  lines.push(`🏆 ELITE PATTERN ANALYSIS`);
  lines.push(`Overall Score: ${profile.overall_elite_score}/100`);
  lines.push(``);

  lines.push(`📊 PATTERN STRENGTHS (sorted by score):`);
  profile.pattern_strengths.forEach((strength, i) => {
    const emoji = strength.score >= 8 ? '✅' : strength.score >= 6 ? '⚠️' : '❌';
    lines.push(`  ${i + 1}. ${emoji} ${strength.pattern}: ${strength.score}/10`);
  });

  lines.push(``);
  lines.push(`💡 KEY FINDINGS:`);
  lines.push(`  Micro→Macro: ${profile.micro_macro.has_structure ? '✅ Present' : '❌ Missing'}`);
  lines.push(`  Quantified Impact: ${profile.quantification.quantified_count} numbers (${Math.round(profile.quantification.specificity_ratio * 100)}% specific)`);
  lines.push(`  Narrative Arc: ${profile.narrative_arc.arc_type} ${profile.narrative_arc.time_span ? `(${profile.narrative_arc.time_span})` : ''}`);
  lines.push(`  Vulnerability Moments: ${profile.vulnerability_cluster.moment_count} ${profile.vulnerability_cluster.moment_count >= 2 ? '✅' : '⚠️'}`);
  lines.push(`  Topic: ${profile.unconventional_topic.topic_category || 'conventional'} (${profile.unconventional_topic.well_executed ? 'well-executed' : 'needs work'})`);

  if (profile.recommendations.length > 0) {
    lines.push(``);
    lines.push(`🎯 RECOMMENDATIONS:`);
    profile.recommendations.forEach((rec, i) => {
      lines.push(`  ${i + 1}. ${rec}`);
    });
  }

  return lines.join('\n');
}
