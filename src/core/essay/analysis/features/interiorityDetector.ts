/**
 * Interiority Detector
 *
 * Detects character interiority and vulnerability markers in essays.
 *
 * CRITICAL FINDING from Exemplar Analysis:
 * - 68% of elite essays show vulnerability
 * - Rubric v1.0.1 requires MULTIPLE vulnerability moments for 10/10
 *
 * Detection Categories:
 * 1. Emotion naming (specific vs generic)
 * 2. Inner debate and contradictions
 * 3. Vulnerability moments (failure, fear, uncertainty)
 * 4. Admission of limits
 * 5. Introspection depth
 */

import { splitIntoParagraphs, splitIntoSentences, findMatches } from '../utils/textProcessing';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface EmotionInstance {
  /** The emotion word or phrase detected */
  emotion: string;

  /** Specificity level: 'generic' | 'specific' | 'highly_specific' */
  specificity: 'generic' | 'specific' | 'highly_specific';

  /** Sentence containing the emotion */
  sentence: string;

  /** Sentence index in essay */
  sentence_index: number;

  /** Is it named explicitly vs implied? */
  explicitly_named: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface InnerDebateInstance {
  /** The contradictory thought pattern detected */
  contradiction_type: 'thought_reversal' | 'internal_conflict' | 'perspective_shift' | 'realization';

  /** The contrasting elements */
  element_a: string;
  element_b: string;

  /** Full context (sentence or pair) */
  context: string;

  /** Sentence indices involved */
  sentence_indices: number[];

  /** Quality score 0-10 */
  quality_score: number;
}

export interface VulnerabilityMoment {
  /** Type of vulnerability shown */
  type: 'failure_admission' | 'fear_naming' | 'embarrassment' | 'uncertainty' | 'inadequacy' | 'mistake_acknowledgment';

  /** The vulnerable statement */
  statement: string;

  /** Sentence index */
  sentence_index: number;

  /** Depth: 'surface' | 'moderate' | 'deep' */
  depth: 'surface' | 'moderate' | 'deep';

  /** Does it lead to growth/insight? */
  has_growth_arc: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface LimitAdmission {
  /** What limit is being admitted? */
  limit_type: 'knowledge_gap' | 'skill_limitation' | 'unresolved_question' | 'ongoing_struggle';

  /** The admission statement */
  statement: string;

  /** Sentence index */
  sentence_index: number;

  /** Is this comfortable with ambiguity? (signals maturity) */
  comfortable_with_ambiguity: boolean;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface IntrospectionSegment {
  /** Text of introspective segment */
  text: string;

  /** Paragraph index */
  paragraph_index: number;

  /** Sentence indices */
  sentence_indices: number[];

  /** Depth level */
  depth: 'surface' | 'moderate' | 'deep' | 'profound';

  /** Length in words */
  word_count: number;

  /** Quality score 0-10 */
  quality_score: number;
}

export interface InteriorityDetection {
  /** Overall interiority present? */
  has_interiority: boolean;

  /** Emotion instances found */
  emotions: EmotionInstance[];

  /** Inner debate/contradiction instances */
  inner_debates: InnerDebateInstance[];

  /** Vulnerability moments (CRITICAL: need 2+ for 10/10) */
  vulnerability_moments: VulnerabilityMoment[];

  /** Limit admissions */
  limit_admissions: LimitAdmission[];

  /** Introspection segments */
  introspection_segments: IntrospectionSegment[];

  /** Overall interiority score (0-10) */
  overall_interiority_score: number;

  /** Vulnerability count (critical metric) */
  vulnerability_count: number;

  /** Does essay meet 10/10 threshold? (requires 2+ vulnerability moments + sustained introspection) */
  meets_elite_threshold: boolean;
}

// ============================================================================
// PATTERN DATABASES
// ============================================================================

/**
 * Emotion words by specificity level
 *
 * Generic: happy, sad, good, bad (LOW quality)
 * Specific: anxious, frustrated, embarrassed, proud (MEDIUM quality)
 * Highly Specific: mortified, exhilarated, vindicated, disillusioned (HIGH quality)
 */
const EMOTION_WORDS = {
  generic: [
    'happy', 'sad', 'good', 'bad', 'nice', 'fine', 'okay', 'great', 'terrible',
    'excited', 'nervous', 'scared', 'angry', 'upset', 'proud', 'ashamed'
  ],
  specific: [
    'anxious', 'frustrated', 'embarrassed', 'overwhelmed', 'relieved', 'disappointed',
    'guilty', 'jealous', 'resentful', 'defensive', 'vulnerable', 'inadequate',
    'conflicted', 'uncertain', 'apprehensive', 'hesitant', 'reluctant', 'ambivalent'
  ],
  highly_specific: [
    'mortified', 'exhilarated', 'vindicated', 'disillusioned', 'humbled', 'chastened',
    'emboldened', 'unmoored', 'disoriented', 'paralyzed', 'electrified', 'hollowed',
    'steeled', 'shaken', 'galvanized', 'haunted', 'liberated', 'shattered'
  ]
};

/**
 * Contradiction/inner debate markers
 *
 * These signal authentic internal conflict or thought reversal
 */
const INNER_DEBATE_PATTERNS = [
  // Thought reversal
  { pattern: /but (then |now )?i (realized|understood|saw|recognized|learned)/i, type: 'thought_reversal' as const },
  { pattern: /i (thought|believed|assumed) .{1,100}(but|yet|however)/i, type: 'thought_reversal' as const },
  { pattern: /at first .{1,100}(but |yet |however )/i, type: 'thought_reversal' as const },

  // Internal conflict
  { pattern: /part of me .{1,100}(but|while|yet) (another part|the other)/i, type: 'internal_conflict' as const },
  { pattern: /i wanted to .{1,100}but i (also |couldn't|shouldn't)/i, type: 'internal_conflict' as const },
  { pattern: /(although|while|even as) i .{1,100}i (also |still |couldn't)/i, type: 'internal_conflict' as const },

  // Perspective shift
  { pattern: /looking back/i, type: 'perspective_shift' as const },
  { pattern: /in retrospect/i, type: 'perspective_shift' as const },
  { pattern: /i (now |finally )?(understand|realize|see|know)/i, type: 'perspective_shift' as const },

  // Realization
  { pattern: /it (hit me|dawned on me|struck me)/i, type: 'realization' as const },
  { pattern: /(suddenly|finally) (i |it )(realized|understood|clicked)/i, type: 'realization' as const }
];

/**
 * Vulnerability markers
 *
 * CRITICAL: Rubric v1.0.1 requires MULTIPLE moments for 10/10
 */
const VULNERABILITY_PATTERNS = [
  // Failure admission
  { pattern: /i (failed|messed up|screwed up|couldn't)/i, type: 'failure_admission' as const },
  { pattern: /(my|the) (failure|mistake|error)/i, type: 'failure_admission' as const },
  { pattern: /i (wasn't|didn't) (good|smart|strong|ready) enough/i, type: 'failure_admission' as const },

  // Fear naming
  { pattern: /i (was |felt )?(afraid|scared|terrified|fearful)/i, type: 'fear_naming' as const },
  { pattern: /(my |the )?fear (of|that|was)/i, type: 'fear_naming' as const },
  { pattern: /i (worried|panicked|dreaded)/i, type: 'fear_naming' as const },

  // Embarrassment
  { pattern: /i (was |felt )?(embarrassed|mortified|humiliated|ashamed)/i, type: 'embarrassment' as const },
  { pattern: /(my |the )?(embarrassment|shame)/i, type: 'embarrassment' as const },

  // Uncertainty
  { pattern: /i (didn't|don't) know/i, type: 'uncertainty' as const },
  { pattern: /i (wasn't|am not|'m not) sure/i, type: 'uncertainty' as const },
  { pattern: /i (had no idea|couldn't tell|couldn't figure out)/i, type: 'uncertainty' as const },

  // Inadequacy
  { pattern: /i (felt|was) (inadequate|insufficient|not enough|out of place)/i, type: 'inadequacy' as const },
  { pattern: /i (didn't|couldn't) (measure up|belong|fit in)/i, type: 'inadequacy' as const },

  // Mistake acknowledgment
  { pattern: /i was wrong/i, type: 'mistake_acknowledgment' as const },
  { pattern: /i (made a|my) mistake/i, type: 'mistake_acknowledgment' as const },
  { pattern: /i (misunderstood|misjudged|miscalculated)/i, type: 'mistake_acknowledgment' as const }
];

/**
 * Limit admission patterns
 *
 * Signals comfort with ambiguity and ongoing growth (maturity marker)
 */
const LIMIT_ADMISSION_PATTERNS = [
  // Knowledge gaps
  { pattern: /i still don't (know|understand)/i, type: 'knowledge_gap' as const },
  { pattern: /i (haven't|have yet to) (figured out|learned|mastered)/i, type: 'knowledge_gap' as const },
  { pattern: /there's still (so much|a lot) i don't know/i, type: 'knowledge_gap' as const },

  // Skill limitations
  { pattern: /i (still |can't yet )(can't|couldn't)/i, type: 'skill_limitation' as const },
  { pattern: /i'm still (learning|working on|trying to)/i, type: 'skill_limitation' as const },

  // Unresolved questions
  { pattern: /i (still |don't )(wonder|question|ask myself)/i, type: 'unresolved_question' as const },
  { pattern: /(the |this )question (remains|persists|lingers)/i, type: 'unresolved_question' as const },
  { pattern: /i'm not sure (if|whether|how|why)/i, type: 'unresolved_question' as const },

  // Ongoing struggle
  { pattern: /i (still |continue to )struggle/i, type: 'ongoing_struggle' as const },
  { pattern: /it's still (hard|difficult|challenging)/i, type: 'ongoing_struggle' as const }
];

/**
 * Introspection depth markers
 */
const INTROSPECTION_MARKERS = {
  surface: [
    'i thought', 'i felt', 'i wanted', 'i hoped', 'i wished', 'i liked', 'i enjoyed'
  ],
  moderate: [
    'i realized', 'i understood', 'i wondered', 'i questioned', 'i considered',
    'i reflected', 'i contemplated', 'i noticed', 'i recognized'
  ],
  deep: [
    'i grappled with', 'i wrestled with', 'i confronted', 'i examined',
    'this forced me to', 'this made me question', 'this challenged my'
  ],
  profound: [
    'this fundamentally changed', 'this reshaped my understanding',
    'this revealed something essential', 'this exposed', 'this illuminated'
  ]
};

// ============================================================================
// CORE DETECTION FUNCTIONS
// ============================================================================

/**
 * Detect emotion instances in essay
 */
function detectEmotions(sentences: string[]): EmotionInstance[] {
  const emotions: EmotionInstance[] = [];

  sentences.forEach((sentence, idx) => {
    const lowerSentence = sentence.toLowerCase();

    // Check highly specific first (highest quality)
    for (const emotion of EMOTION_WORDS.highly_specific) {
      if (lowerSentence.includes(emotion)) {
        emotions.push({
          emotion,
          specificity: 'highly_specific',
          sentence,
          sentence_index: idx,
          explicitly_named: true,
          quality_score: 9 // Highly specific = high quality
        });
      }
    }

    // Check specific
    for (const emotion of EMOTION_WORDS.specific) {
      if (lowerSentence.includes(emotion)) {
        emotions.push({
          emotion,
          specificity: 'specific',
          sentence,
          sentence_index: idx,
          explicitly_named: true,
          quality_score: 7 // Specific = good quality
        });
      }
    }

    // Check generic (lower quality)
    for (const emotion of EMOTION_WORDS.generic) {
      if (lowerSentence.includes(emotion)) {
        emotions.push({
          emotion,
          specificity: 'generic',
          sentence,
          sentence_index: idx,
          explicitly_named: true,
          quality_score: 4 // Generic = mediocre quality
        });
      }
    }
  });

  return emotions;
}

/**
 * Detect inner debate and contradictions
 */
function detectInnerDebates(sentences: string[]): InnerDebateInstance[] {
  const debates: InnerDebateInstance[] = [];

  sentences.forEach((sentence, idx) => {
    for (const { pattern, type } of INNER_DEBATE_PATTERNS) {
      const match = sentence.match(pattern);
      if (match) {
        // Extract contrasting elements (simplified - could be more sophisticated)
        const parts = sentence.split(/but|yet|however|while|although/i);

        debates.push({
          contradiction_type: type,
          element_a: parts[0]?.trim() || '',
          element_b: parts[1]?.trim() || '',
          context: sentence,
          sentence_indices: [idx],
          quality_score: scoreInnerDebate(sentence, type)
        });
      }
    }
  });

  return debates;
}

/**
 * Score inner debate quality
 */
function scoreInnerDebate(sentence: string, type: InnerDebateInstance['contradiction_type']): number {
  let score = 6; // Base score

  // Thought reversal and realization = higher quality
  if (type === 'thought_reversal' || type === 'realization') {
    score += 2;
  }

  // Internal conflict = authentic
  if (type === 'internal_conflict') {
    score += 1;
  }

  // Bonus for specific emotion words
  const lowerSentence = sentence.toLowerCase();
  const hasSpecificEmotion = EMOTION_WORDS.specific.some(e => lowerSentence.includes(e)) ||
                             EMOTION_WORDS.highly_specific.some(e => lowerSentence.includes(e));
  if (hasSpecificEmotion) {
    score += 1;
  }

  return Math.min(10, score);
}

/**
 * Detect vulnerability moments (CRITICAL METRIC)
 */
function detectVulnerabilityMoments(sentences: string[]): VulnerabilityMoment[] {
  const moments: VulnerabilityMoment[] = [];

  sentences.forEach((sentence, idx) => {
    for (const { pattern, type } of VULNERABILITY_PATTERNS) {
      const match = sentence.match(pattern);
      if (match) {
        // Determine depth
        const depth = determineVulnerabilityDepth(sentence, sentences, idx);

        // Check for growth arc (does this lead to insight/change?)
        const has_growth_arc = checkForGrowthArc(sentences, idx);

        moments.push({
          type,
          statement: sentence,
          sentence_index: idx,
          depth,
          has_growth_arc,
          quality_score: scoreVulnerability(type, depth, has_growth_arc)
        });
      }
    }
  });

  return moments;
}

/**
 * Determine vulnerability depth
 */
function determineVulnerabilityDepth(
  sentence: string,
  allSentences: string[],
  idx: number
): VulnerabilityMoment['depth'] {
  const lowerSentence = sentence.toLowerCase();

  // Deep: Highly specific emotion + concrete detail
  const hasHighlySpecificEmotion = EMOTION_WORDS.highly_specific.some(e => lowerSentence.includes(e));
  const hasConcreteDetail = /\d+|specific|particular|exact/.test(lowerSentence);

  if (hasHighlySpecificEmotion && hasConcreteDetail) {
    return 'deep';
  }

  // Moderate: Specific emotion OR leads to reflection
  const hasSpecificEmotion = EMOTION_WORDS.specific.some(e => lowerSentence.includes(e));
  const nextSentenceIsReflection = idx < allSentences.length - 1 &&
    INTROSPECTION_MARKERS.moderate.some(m => allSentences[idx + 1].toLowerCase().includes(m));

  if (hasSpecificEmotion || nextSentenceIsReflection) {
    return 'moderate';
  }

  // Surface: Generic emotion or simple admission
  return 'surface';
}

/**
 * Check if vulnerability leads to growth/insight
 */
function checkForGrowthArc(sentences: string[], vulnerabilityIdx: number): boolean {
  // Look at next 3 sentences for growth indicators
  const windowEnd = Math.min(vulnerabilityIdx + 4, sentences.length);
  const window = sentences.slice(vulnerabilityIdx + 1, windowEnd).join(' ').toLowerCase();

  const growthIndicators = [
    'learned', 'realized', 'understood', 'discovered', 'grew', 'changed',
    'now i', 'this taught', 'this showed', 'i came to', 'i began to'
  ];

  return growthIndicators.some(indicator => window.includes(indicator));
}

/**
 * Score vulnerability quality
 */
function scoreVulnerability(
  type: VulnerabilityMoment['type'],
  depth: VulnerabilityMoment['depth'],
  has_growth_arc: boolean
): number {
  let score = 5; // Base

  // Type bonuses
  if (type === 'failure_admission' || type === 'mistake_acknowledgment') {
    score += 2; // Most valuable
  } else if (type === 'fear_naming' || type === 'embarrassment') {
    score += 1.5;
  }

  // Depth bonuses
  if (depth === 'deep') {
    score += 2;
  } else if (depth === 'moderate') {
    score += 1;
  }

  // Growth arc bonus
  if (has_growth_arc) {
    score += 1;
  }

  return Math.min(10, Math.round(score));
}

/**
 * Detect limit admissions
 */
function detectLimitAdmissions(sentences: string[]): LimitAdmission[] {
  const admissions: LimitAdmission[] = [];

  sentences.forEach((sentence, idx) => {
    for (const { pattern, type } of LIMIT_ADMISSION_PATTERNS) {
      const match = sentence.match(pattern);
      if (match) {
        // Check for comfort with ambiguity (maturity signal)
        const comfortable_with_ambiguity = checkComfortWithAmbiguity(sentence);

        admissions.push({
          limit_type: type,
          statement: sentence,
          sentence_index: idx,
          comfortable_with_ambiguity,
          quality_score: comfortable_with_ambiguity ? 8 : 6
        });
      }
    }
  });

  return admissions;
}

/**
 * Check if limit admission shows comfort with ambiguity
 */
function checkComfortWithAmbiguity(sentence: string): boolean {
  const lowerSentence = sentence.toLowerCase();

  const comfortIndicators = [
    'still learning', 'continue to', 'work in progress', 'journey',
    'process', 'evolving', 'growing', 'exploring', 'discovering'
  ];

  return comfortIndicators.some(indicator => lowerSentence.includes(indicator));
}

/**
 * Detect introspection segments
 */
function detectIntrospection(paragraphs: string[]): IntrospectionSegment[] {
  const segments: IntrospectionSegment[] = [];

  paragraphs.forEach((para, paraIdx) => {
    const sentences = splitIntoSentences(para);
    let introspectiveSentenceIndices: number[] = [];
    let maxDepth: IntrospectionSegment['depth'] = 'surface';

    sentences.forEach((sentence, sentIdx) => {
      const lowerSentence = sentence.toLowerCase();

      // Check depth markers
      let sentenceDepth: IntrospectionSegment['depth'] = 'surface';

      if (INTROSPECTION_MARKERS.profound.some(m => lowerSentence.includes(m))) {
        sentenceDepth = 'profound';
      } else if (INTROSPECTION_MARKERS.deep.some(m => lowerSentence.includes(m))) {
        sentenceDepth = 'deep';
      } else if (INTROSPECTION_MARKERS.moderate.some(m => lowerSentence.includes(m))) {
        sentenceDepth = 'moderate';
      } else if (INTROSPECTION_MARKERS.surface.some(m => lowerSentence.includes(m))) {
        sentenceDepth = 'surface';
      }

      // Track introspective sentences
      if (sentenceDepth !== 'surface' || lowerSentence.match(/\bi\b.{1,50}(think|feel|believe|wonder|question)/i)) {
        introspectiveSentenceIndices.push(sentIdx);

        // Update max depth
        const depthRank = { surface: 0, moderate: 1, deep: 2, profound: 3 };
        if (depthRank[sentenceDepth] > depthRank[maxDepth]) {
          maxDepth = sentenceDepth;
        }
      }
    });

    // If paragraph has introspection, add segment
    if (introspectiveSentenceIndices.length > 0) {
      const wordCount = para.split(/\s+/).length;

      segments.push({
        text: para,
        paragraph_index: paraIdx,
        sentence_indices: introspectiveSentenceIndices,
        depth: maxDepth,
        word_count: wordCount,
        quality_score: scoreIntrospection(maxDepth, introspectiveSentenceIndices.length, wordCount)
      });
    }
  });

  return segments;
}

/**
 * Score introspection quality
 */
function scoreIntrospection(
  depth: IntrospectionSegment['depth'],
  introspectiveSentenceCount: number,
  wordCount: number
): number {
  let score = 3; // Base

  // Depth bonuses
  const depthScores = { surface: 0, moderate: 2, deep: 4, profound: 6 };
  score += depthScores[depth];

  // Length bonus (sustained introspection)
  if (introspectiveSentenceCount >= 3) {
    score += 2;
  } else if (introspectiveSentenceCount >= 2) {
    score += 1;
  }

  // Word count bonus (detailed introspection)
  if (wordCount >= 100) {
    score += 1;
  }

  return Math.min(10, score);
}

/**
 * Calculate overall interiority score
 */
function calculateInteriorityScore(detection: Omit<InteriorityDetection, 'overall_interiority_score' | 'meets_elite_threshold'>): number {
  let score = 0;
  let components = 0;

  // Emotions (weight: 15%)
  if (detection.emotions.length > 0) {
    const avgEmotionScore = detection.emotions.reduce((sum, e) => sum + e.quality_score, 0) / detection.emotions.length;
    score += avgEmotionScore * 0.15;
    components++;
  }

  // Inner debates (weight: 20%)
  if (detection.inner_debates.length > 0) {
    const avgDebateScore = detection.inner_debates.reduce((sum, d) => sum + d.quality_score, 0) / detection.inner_debates.length;
    score += avgDebateScore * 0.20;
    components++;
  }

  // Vulnerability moments (weight: 35% - MOST IMPORTANT)
  if (detection.vulnerability_moments.length > 0) {
    const avgVulnScore = detection.vulnerability_moments.reduce((sum, v) => sum + v.quality_score, 0) / detection.vulnerability_moments.length;
    score += avgVulnScore * 0.35;
    components++;
  }

  // Limit admissions (weight: 15%)
  if (detection.limit_admissions.length > 0) {
    const avgLimitScore = detection.limit_admissions.reduce((sum, l) => sum + l.quality_score, 0) / detection.limit_admissions.length;
    score += avgLimitScore * 0.15;
    components++;
  }

  // Introspection (weight: 15%)
  if (detection.introspection_segments.length > 0) {
    const avgIntroScore = detection.introspection_segments.reduce((sum, i) => sum + i.quality_score, 0) / detection.introspection_segments.length;
    score += avgIntroScore * 0.15;
    components++;
  }

  // Penalty if missing components
  if (components < 3) {
    score *= 0.8; // 20% penalty for thin interiority
  }

  return Math.round(score * 10) / 10; // Round to 1 decimal
}

/**
 * Check if essay meets elite threshold
 *
 * CRITICAL: Rubric v1.0.1 requires MULTIPLE vulnerability moments + sustained introspection
 */
function meetsEliteThreshold(detection: Omit<InteriorityDetection, 'overall_interiority_score' | 'meets_elite_threshold'>): boolean {
  // Requirement 1: At least 2 vulnerability moments
  if (detection.vulnerability_count < 2) {
    return false;
  }

  // Requirement 2: At least one deep or profound introspection segment
  const hasDeepIntrospection = detection.introspection_segments.some(
    seg => seg.depth === 'deep' || seg.depth === 'profound'
  );
  if (!hasDeepIntrospection) {
    return false;
  }

  // Requirement 3: At least one high-quality vulnerability (score >= 8)
  const hasHighQualityVuln = detection.vulnerability_moments.some(v => v.quality_score >= 8);
  if (!hasHighQualityVuln) {
    return false;
  }

  return true;
}

// ============================================================================
// MAIN DETECTOR
// ============================================================================

/**
 * Detect interiority in essay
 *
 * @param essayText - Full essay text
 * @returns Complete interiority analysis
 */
export function detectInteriority(essayText: string): InteriorityDetection {
  const paragraphs = splitIntoParagraphs(essayText);
  const allSentences = paragraphs.flatMap(p => splitIntoSentences(p));

  // Run all detectors
  const emotions = detectEmotions(allSentences);
  const inner_debates = detectInnerDebates(allSentences);
  const vulnerability_moments = detectVulnerabilityMoments(allSentences);
  const limit_admissions = detectLimitAdmissions(allSentences);
  const introspection_segments = detectIntrospection(paragraphs);

  // Build detection object (without final scores)
  const detection: Omit<InteriorityDetection, 'overall_interiority_score' | 'meets_elite_threshold'> = {
    has_interiority: emotions.length > 0 || inner_debates.length > 0 ||
                     vulnerability_moments.length > 0 || introspection_segments.length > 0,
    emotions,
    inner_debates,
    vulnerability_moments,
    limit_admissions,
    introspection_segments,
    vulnerability_count: vulnerability_moments.length
  };

  // Calculate final scores
  const overall_interiority_score = calculateInteriorityScore(detection);
  const meets_elite_threshold = meetsEliteThreshold(detection);

  return {
    ...detection,
    overall_interiority_score,
    meets_elite_threshold
  };
}

/**
 * Get interiority summary for quick inspection
 */
export function getInteriorityTummary(detection: InteriorityDetection): string {
  const lines: string[] = [];

  lines.push(`📊 INTERIORITY ANALYSIS`);
  lines.push(`Overall Score: ${detection.overall_interiority_score}/10`);
  lines.push(`Elite Threshold: ${detection.meets_elite_threshold ? '✅ MET' : '❌ NOT MET'}`);
  lines.push(``);

  lines.push(`🎭 Vulnerability Moments: ${detection.vulnerability_count} ${detection.vulnerability_count >= 2 ? '✅' : '⚠️'}`);
  detection.vulnerability_moments.forEach((v, i) => {
    lines.push(`  ${i + 1}. [${v.type}] ${v.depth} (score: ${v.quality_score})`);
    lines.push(`     "${v.statement.substring(0, 80)}${v.statement.length > 80 ? '...' : ''}"`);
  });

  lines.push(``);
  lines.push(`💭 Introspection: ${detection.introspection_segments.length} segments`);
  const deepSegs = detection.introspection_segments.filter(s => s.depth === 'deep' || s.depth === 'profound');
  lines.push(`  Deep/Profound: ${deepSegs.length} ${deepSegs.length > 0 ? '✅' : '⚠️'}`);

  lines.push(``);
  lines.push(`🧠 Inner Debates: ${detection.inner_debates.length}`);
  lines.push(`❤️ Emotions: ${detection.emotions.length} (Specific: ${detection.emotions.filter(e => e.specificity !== 'generic').length})`);
  lines.push(`🚧 Limit Admissions: ${detection.limit_admissions.length}`);

  return lines.join('\n');
}
