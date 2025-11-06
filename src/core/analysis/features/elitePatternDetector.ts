/**
 * Elite Pattern Detector (2025)
 *
 * Detects advanced narrative techniques from Harvard, Stanford, MIT,
 * UC Berkeley, and UCLA Class of 2029 admits.
 *
 * Based on analysis of actual admitted student essays and extracurricular
 * descriptions from the 2024-2025 admissions cycle.
 */

// ============================================================================
// PATTERN 1: MICRO-TO-MACRO STRUCTURE
// ============================================================================

/**
 * Detect vivid, specific opening (not generic)
 */
function hasVividOpening(text: string): { has: boolean; examples: string[] } {
  const firstSentences = text.split(/[.!?]/).slice(0, 2).join('. ');
  const examples: string[] = [];

  // Sensory details
  const sensoryPatterns = [
    /smelled like/i,
    /tasted like/i,
    /sounded like/i,
    /felt like \w+/i, // "felt like sandpaper" but not "felt like I"
    /\b(warm|cold|bright|dark|loud|quiet|rough|smooth)\b/i,
  ];

  // Specific time/place
  const specificityPatterns = [
    /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
    /\b\d+:\d+\s*(am|pm)\b/i,
    /\b(january|february|march|april|may|june|july|august|september|october|november|december)\b/i,
    /three days before/i,
    /the first day/i,
  ];

  // Direct objects/prices
  const concretePatterns = [
    /\$\d+\.?\d*/,  // Prices like $1.49
    /\d+\s*(people|students|hours|days|weeks)/i,
  ];

  // Dialogue/quotes
  const dialoguePattern = /["'].*["']/;

  let hasVivid = false;

  if (sensoryPatterns.some(p => p.test(firstSentences))) {
    hasVivid = true;
    examples.push('sensory_detail');
  }

  if (specificityPatterns.some(p => p.test(firstSentences))) {
    hasVivid = true;
    examples.push('specific_time_place');
  }

  if (concretePatterns.some(p => p.test(firstSentences))) {
    hasVivid = true;
    examples.push('concrete_objects');
  }

  if (dialoguePattern.test(firstSentences)) {
    hasVivid = true;
    examples.push('dialogue_opening');
  }

  return { has: hasVivid, examples };
}

/**
 * Detect personal stakes/tension
 */
function hasPersonalStakes(text: string): { has: boolean; markers: string[] } {
  const markers: string[] = [];

  // Emotional stakes
  const emotionPatterns = [
    /\bafraid\b/i,
    /\bfear(ed|ful)?\b/i,
    /\bworr(y|ied)\b/i,
    /\bdumbstruck\b/i,
    /\bawkward\b/i,
    /\bout of place\b/i,
    /\bnervous\b/i,
    /\banxious\b/i,
  ];

  // Physical stakes
  const physicalPatterns = [
    /health\s+(risk|crisis|problem)/i,
    /\b(cancer|disease|illness)\b/i,
    /\bulcers?\b/i,
    /\bpain(ful)?\b/i,
  ];

  // Time pressure
  const urgencyPatterns = [
    /\d+\s*(hour|day|week)s?\s*(before|deadline|left)/i,
    /\blast minute/i,
    /\bquickly\b/i,
  ];

  // Family/community at risk
  const communityStakePatterns = [
    /my\s+(family|community|friend)/i,
    /our\s+(neighborhood|school|town)/i,
  ];

  emotionPatterns.forEach(p => {
    if (p.test(text)) markers.push('emotional_stakes');
  });

  physicalPatterns.forEach(p => {
    if (p.test(text)) markers.push('physical_stakes');
  });

  urgencyPatterns.forEach(p => {
    if (p.test(text)) markers.push('time_pressure');
  });

  communityStakePatterns.forEach(p => {
    if (p.test(text)) markers.push('community_at_risk');
  });

  const uniqueMarkers = [...new Set(markers)];
  return { has: uniqueMarkers.length > 0, markers: uniqueMarkers };
}

/**
 * Detect philosophical/universal insight
 */
function hasPhilosophicalInsight(text: string): { has: boolean; insights: string[] } {
  const insights: string[] = [];

  // Universal statements
  const universalPatterns = [
    /the\s+(lesson|insight|truth|reality)\s+(is|that|which)/i,
    /(everyone|people|we|humans)\s+(need|deserve|should)/i,
    /what\s+(really\s+)?matters\s+is/i,
    /\blife\s+is\b/i,
  ];

  // Academic/philosophical references
  const academicPatterns = [
    /\b(hobbes|locke|rousseau|kant|plato|aristotle)\b/i,
    /(natural\s+rights|social\s+contract|justice|ethics|philosophy)/i,
    /(power\s+of|nature\s+of|meaning\s+of)/i,
  ];

  // Counter-cultural statements
  const counterNarrativePatterns = [
    /\bisn't\s+(just|some|about)/i,
    /(however|but|yet|though).{0,20}(stronger|more|better|real)/i,
    /the\s+real\s+\w+\s+is/i,
  ];

  // Growth/transformation language (sophisticated, not cliché)
  const transformationPatterns = [
    /understood\s+that\s+\w+/i,
    /realized\s+\w+\s+(only|takes|requires)/i,
    /\bseems?\s+like\s+\w+\s+but\s+(actually|really)/i,
  ];

  universalPatterns.forEach(p => {
    if (p.test(text)) insights.push('universal_statement');
  });

  academicPatterns.forEach(p => {
    if (p.test(text)) insights.push('academic_integration');
  });

  counterNarrativePatterns.forEach(p => {
    if (p.test(text)) insights.push('counter_narrative');
  });

  transformationPatterns.forEach(p => {
    if (p.test(text)) insights.push('sophisticated_transformation');
  });

  const uniqueInsights = [...new Set(insights)];
  return { has: uniqueInsights.length > 0, insights: uniqueInsights };
}

// ============================================================================
// PATTERN 2: VULNERABILITY & EMOTIONAL AUTHENTICITY
// ============================================================================

/**
 * Detect specific vulnerability (not generic "challenges")
 */
function detectVulnerability(text: string): {
  score: number; // 0-10
  markers: string[];
  examples: string[];
} {
  const markers: string[] = [];
  const examples: string[] = [];
  let score = 0;

  // Physical symptoms (highest authenticity)
  const physicalPatterns = [
    { pattern: /stomach ulcers/i, marker: 'physical_symptom', points: 3 },
    { pattern: /(picked|dropped)\s+my\s+jaw/i, marker: 'physical_reaction', points: 2 },
    { pattern: /\b(cried|tears|crying)\b/i, marker: 'emotional_release', points: 2 },
    { pattern: /couldn't\s+(sleep|eat|breathe)/i, marker: 'physical_impact', points: 2 },
    { pattern: /hands.{0,30}(shaking|shook|trembling|trembled)/i, marker: 'physical_symptom', points: 2 },
    { pattern: /\b(shaking|trembling|shivering)\b/i, marker: 'physical_symptom', points: 1 },
  ];

  // Named emotions (specific, not generic)
  const emotionPatterns = [
    { pattern: /\bafraid\b/i, marker: 'named_fear', points: 2 },
    { pattern: /\bterrified\b/i, marker: 'named_fear', points: 2 },
    { pattern: /\bscared\b/i, marker: 'named_fear', points: 1 },
    { pattern: /\bdumbstruck\b/i, marker: 'named_shock', points: 2 },
    { pattern: /\bawkward\b/i, marker: 'named_discomfort', points: 1 },
    { pattern: /\bout of place\b/i, marker: 'named_alienation', points: 2 },
    { pattern: /\bembarrassed\b/i, marker: 'named_shame', points: 2 },
    { pattern: /\blost\b/i, marker: 'named_confusion', points: 1 },
    { pattern: /\bdesperation\b/i, marker: 'named_desperation', points: 2 },
    { pattern: /\bpanic/i, marker: 'named_panic', points: 2 },
  ];

  // Admits limits/uncertainty
  const limitPatterns = [
    { pattern: /\bdidn't know\b/i, marker: 'admits_ignorance', points: 1 },
    { pattern: /\bno (clue|idea)\b/i, marker: 'admits_ignorance', points: 2 },
    { pattern: /\bhad no clue\b/i, marker: 'admits_ignorance', points: 2 },
    { pattern: /(seemed|felt)\s+like\s+\w+\s+(distant|impossible|overwhelming)/i, marker: 'admits_limits', points: 2 },
    { pattern: /\bstruggled\s+with\b/i, marker: 'admits_difficulty', points: 1 },
    { pattern: /have\s+i\s+(completely\s+)?lost\s+it/i, marker: 'self_doubt', points: 3 },
    { pattern: /\b(failed|failing|failure)\b/i, marker: 'admits_failure', points: 1 },
  ];

  // Before/after contrast
  const contrastPatterns = [
    /the first (few )?days? (were|was) not/i,
    /(before|initially).{0,50}(however|but|then)/i,
    /used to.{0,20}but (now|learned)/i,
  ];

  physicalPatterns.forEach(({ pattern, marker, points }) => {
    if (pattern.test(text)) {
      markers.push(marker);
      score += points;
      const match = text.match(pattern);
      if (match) examples.push(match[0]);
    }
  });

  emotionPatterns.forEach(({ pattern, marker, points }) => {
    if (pattern.test(text)) {
      markers.push(marker);
      score += points;
    }
  });

  limitPatterns.forEach(({ pattern, marker, points }) => {
    if (pattern.test(text)) {
      markers.push(marker);
      score += points;
    }
  });

  if (contrastPatterns.some(p => p.test(text))) {
    markers.push('before_after_contrast');
    score += 2;
  }

  // Cap at 10
  score = Math.min(10, score);

  return { score, markers: [...new Set(markers)], examples };
}

// ============================================================================
// PATTERN 3: DIALOGUE & CONFRONTATION
// ============================================================================

function detectDialogue(text: string): {
  hasDialogue: boolean;
  hasConfrontation: boolean;
  quotes: string[];
  confrontationType: string | null;
} {
  const quotes: string[] = [];
  let hasConfrontation = false;
  let confrontationType: string | null = null;

  // Extract all quotes
  const quotePattern = /["']([^"']{10,})["']/g;
  const matches = text.matchAll(quotePattern);

  for (const match of matches) {
    quotes.push(match[1]);
  }

  // Detect confrontational language
  const confrontationPatterns = [
    { pattern: /\bisn't\s+(some|just|about)/i, type: 'direct_challenge' },
    { pattern: /\bno\.\s+/i, type: 'direct_refusal' },
    { pattern: /(replied|responded|said).{0,20}["'].*\bisn't/i, type: 'verbal_confrontation' },
    { pattern: /who-?the-?what/i, type: 'disbelief_exclamation' },
  ];

  confrontationPatterns.forEach(({ pattern, type }) => {
    if (pattern.test(text)) {
      hasConfrontation = true;
      confrontationType = type;
    }
  });

  return {
    hasDialogue: quotes.length > 0,
    hasConfrontation,
    quotes,
    confrontationType,
  };
}

// ============================================================================
// PATTERN 4: QUANTIFIED IMPACT + HUMAN STORY
// ============================================================================

function detectQuantifiedImpact(text: string): {
  hasMetrics: boolean;
  hasHumanElement: boolean;
  metricsCount: number;
  namedIndividuals: string[];
  scaleAppropriate: boolean;
  metrics: Array<{ value: string; context: string }>;
} {
  const metrics: Array<{ value: string; context: string }> = [];
  const namedIndividuals: string[] = [];

  // Extract metrics
  const metricPatterns = [
    /\$[\d,]+/g, // Money
    /\d+\+?\s*(people|students|participants|members|attendees|individuals)/gi,
    /\d+\s*%/g, // Percentages
    /\d+\s*(hours|days|weeks|months|years)/gi,
    /\d+\s*→\s*\d+/g, // Before → After
    /from\s+\d+\s+to\s+\d+/gi,
    /\d+\s*(countries|states|cities|chapters|schools)/gi,
  ];

  metricPatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const context = text.substring(Math.max(0, match.index! - 50), Math.min(text.length, match.index! + match[0].length + 50));
      metrics.push({ value: match[0], context });
    }
  });

  // Extract named individuals (indicates human element)
  // Look for patterns like "with [Name]", "my friend [Name]", "[Name] told me"
  const namePatterns = [
    /\b(?:with|friend|supervisor|teacher|neighbor|classmate|patient|student)\s+([A-Z][a-z]+)/g,
    /\b([A-Z][a-z]+)\s+(?:told|said|asked|showed)/g,
    /\[([A-Z][a-z]+(?:'s)?)\]/g, // UC essays use [Name] for privacy
  ];

  namePatterns.forEach(pattern => {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      namedIndividuals.push(match[1]);
    }
  });

  // Check if scale is appropriate for high schooler
  let scaleAppropriate = true;
  const inappropriateScales = [
    /\$[\d,]*[5-9]\d{5,}/,  // > $500,000
    /\d{5,}\+?\s*people/i,  // > 10,000 people
  ];

  if (inappropriateScales.some(p => p.test(text))) {
    scaleAppropriate = false;
  }

  return {
    hasMetrics: metrics.length > 0,
    hasHumanElement: namedIndividuals.length > 0,
    metricsCount: metrics.length,
    namedIndividuals: [...new Set(namedIndividuals)],
    scaleAppropriate,
    metrics,
  };
}

// ============================================================================
// PATTERN 5: COMMUNITY TRANSFORMATION
// ============================================================================

function detectCommunityTransformation(text: string): {
  hasBeforeState: boolean;
  hasAfterState: boolean;
  hasContrast: boolean;
  transformationType: string[];
} {
  const transformationType: string[] = [];

  // Before state indicators
  const beforePatterns = [
    /before\s+(this|that|i)/i,
    /(initially|originally|at first)/i,
    /(used to|would)\s+\w+/i,
    /people\s+(stared|whispered|smirked|ignored)/i,
    /neighbors\s+who\s+(bickered|fought|argued)/i,
  ];

  // After state indicators
  const afterPatterns = [
    /(now|today|currently)\s+\w+/i,
    /\b(still|continue to)\s+\w+\s+(but|however)/i,
    /classmates\s+(now|still)\s+stare.{0,20}(with|in)\s+(admiration|respect)/i,
    /put\s+(their|our)\s+differences\s+aside/i,
  ];

  // Transformation types
  const behaviorChange = /(changed|shifted|transformed|became).{0,30}(more|less|different)/i;
  const culturalShift = /(community|culture|environment|atmosphere)\s+(changed|shifted|transformed)/i;
  const sustainableSystems = /(training|teaching|leading)\s+(others|new|next)/i;

  const hasBeforeState = beforePatterns.some(p => p.test(text));
  const hasAfterState = afterPatterns.some(p => p.test(text));

  if (behaviorChange.test(text)) transformationType.push('behavior_change');
  if (culturalShift.test(text)) transformationType.push('cultural_shift');
  if (sustainableSystems.test(text)) transformationType.push('sustainable_systems');

  return {
    hasBeforeState,
    hasAfterState,
    hasContrast: hasBeforeState && hasAfterState,
    transformationType,
  };
}

// ============================================================================
// MAIN ELITE PATTERN ANALYSIS
// ============================================================================

export interface ElitePatternAnalysis {
  tier: 1 | 2 | 3 | 4;  // 1 = Harvard/Stanford, 2 = Top UC, 3 = UC-Competitive, 4 = Weak
  overallScore: number; // 0-100

  microToMacro: {
    score: number;
    hasVividOpening: boolean;
    hasPersonalStakes: boolean;
    hasPhilosophicalInsight: boolean;
    openingExamples: string[];
    stakeMarkers: string[];
    insights: string[];
  };

  vulnerability: {
    score: number; // 0-10
    markers: string[];
    examples: string[];
  };

  dialogue: {
    hasDialogue: boolean;
    hasConfrontation: boolean;
    quotes: string[];
    confrontationType: string | null;
  };

  quantifiedImpact: {
    hasMetrics: boolean;
    hasHumanElement: boolean;
    metricsCount: number;
    namedIndividuals: string[];
    scaleAppropriate: boolean;
    metrics: Array<{ value: string; context: string }>;
  };

  communityTransformation: {
    hasBeforeState: boolean;
    hasAfterState: boolean;
    hasContrast: boolean;
    transformationType: string[];
  };

  strengths: string[];
  gaps: string[];
  recommendations: string[];
}

export function analyzeElitePatterns(text: string): ElitePatternAnalysis {
  // Run all detections
  const vividOpening = hasVividOpening(text);
  const personalStakes = hasPersonalStakes(text);
  const philosophicalInsight = hasPhilosophicalInsight(text);
  const vulnerability = detectVulnerability(text);
  const dialogue = detectDialogue(text);
  const quantifiedImpact = detectQuantifiedImpact(text);
  const communityTransformation = detectCommunityTransformation(text);

  // Calculate Micro-to-Macro score
  let microToMacroScore = 0;
  if (vividOpening.has) microToMacroScore += 3;
  if (personalStakes.has) microToMacroScore += 3;
  if (philosophicalInsight.has) microToMacroScore += 4;

  // Calculate overall score (0-100)
  let overallScore = 0;

  // Micro-to-Macro structure (30 points)
  overallScore += microToMacroScore * 3;

  // Vulnerability (20 points)
  overallScore += vulnerability.score * 2;

  // Dialogue (15 points)
  if (dialogue.hasDialogue) overallScore += 8;
  if (dialogue.hasConfrontation) overallScore += 7;

  // Quantified Impact (20 points)
  if (quantifiedImpact.hasMetrics) overallScore += 10;
  if (quantifiedImpact.hasHumanElement) overallScore += 10;

  // Community Transformation (15 points)
  if (communityTransformation.hasContrast) overallScore += 15;
  else if (communityTransformation.hasBeforeState || communityTransformation.hasAfterState) overallScore += 7;

  // Determine tier
  let tier: 1 | 2 | 3 | 4;
  if (overallScore >= 75 && microToMacroScore >= 8 && vulnerability.score >= 6) {
    tier = 1; // Harvard/Stanford/MIT level
  } else if (overallScore >= 60 && microToMacroScore >= 6) {
    tier = 2; // Top UC/Ivy-competitive
  } else if (overallScore >= 40) {
    tier = 3; // UC-competitive
  } else {
    tier = 4; // Needs major revision
  }

  // Generate strengths and gaps
  const strengths: string[] = [];
  const gaps: string[] = [];
  const recommendations: string[] = [];

  if (vividOpening.has) {
    strengths.push(`Strong vivid opening (${vividOpening.examples.join(', ')})`);
  } else {
    gaps.push('Missing vivid, specific opening');
    recommendations.push('Start with a specific moment: dialogue, sensory detail, or concrete time/place');
  }

  if (vulnerability.score >= 6) {
    strengths.push(`Authentic vulnerability (${vulnerability.markers.length} markers)`);
  } else if (vulnerability.score >= 3) {
    gaps.push('Limited vulnerability or emotional depth');
    recommendations.push('Add specific moments of doubt, fear, or failure before showing growth');
  } else {
    gaps.push('No vulnerability or emotional stakes');
    recommendations.push('Show a specific moment where you felt afraid, out of place, or uncertain');
  }

  if (dialogue.hasDialogue) {
    strengths.push('Uses dialogue to create immediacy');
  } else {
    gaps.push('No quoted dialogue');
    recommendations.push('Include actual dialogue or quotes to prove the moment happened');
  }

  if (quantifiedImpact.hasMetrics && quantifiedImpact.hasHumanElement) {
    strengths.push('Balances quantified impact with human story');
  } else if (quantifiedImpact.hasMetrics) {
    gaps.push('Has metrics but missing human element');
    recommendations.push('Name specific individuals affected by your work');
  } else {
    gaps.push('No specific metrics or outcomes');
    recommendations.push('Add concrete numbers: people reached, money raised, time invested');
  }

  if (communityTransformation.hasContrast) {
    strengths.push('Shows community transformation with before/after');
  } else {
    gaps.push('Missing community transformation or before/after contrast');
    recommendations.push('Show how the community changed because of your action, not just how you grew');
  }

  if (philosophicalInsight.has) {
    strengths.push(`Philosophical depth (${philosophicalInsight.insights.join(', ')})`);
  } else {
    gaps.push('Missing universal insight or philosophical depth');
    recommendations.push('End with a universal truth or insight that extends beyond your specific experience');
  }

  return {
    tier,
    overallScore,
    microToMacro: {
      score: microToMacroScore,
      hasVividOpening: vividOpening.has,
      hasPersonalStakes: personalStakes.has,
      hasPhilosophicalInsight: philosophicalInsight.has,
      openingExamples: vividOpening.examples,
      stakeMarkers: personalStakes.markers,
      insights: philosophicalInsight.insights,
    },
    vulnerability,
    dialogue,
    quantifiedImpact,
    communityTransformation,
    strengths,
    gaps,
    recommendations,
  };
}
