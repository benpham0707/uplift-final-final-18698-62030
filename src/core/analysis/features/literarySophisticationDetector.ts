/**
 * Literary Sophistication Detector
 *
 * Detects advanced writing techniques from top admits:
 * - Extended metaphors
 * - Structural innovations
 * - Rhythmic prose
 * - Sensory immersion
 * - Strategic vulnerability placement
 * - Perspective shifts
 *
 * Based on analysis of Hugh Gallagher (NYU), Laptop Stickers (Ivy),
 * Symphony/Silence, Umbra (Dance/Robotics), and other elite essays.
 */

// ============================================================================
// TECHNIQUE 1: EXTENDED METAPHOR
// ============================================================================

function detectExtendedMetaphor(text: string): {
  hasMetaphor: boolean;
  centralImage: string | null;
  occurrences: number;
  sustained: boolean;
} {
  // Common metaphor domains
  const metaphorPatterns = [
    { domain: 'music', patterns: [/symphony/i, /melody/i, /rhythm/i, /crescendo/i, /silence/i, /note/i, /composition/i, /orchestra/i, /conductor/i] },
    { domain: 'light/shadow', patterns: [/light/i, /shadow/i, /umbra/i, /darkness/i, /illuminat/i, /glow/i, /lighthouse/i, /beacon/i] },
    { domain: 'journey', patterns: [/path/i, /journey/i, /road/i, /destination/i, /travel/i, /voyage/i] },
    { domain: 'nature', patterns: [/roots/i, /branches/i, /seeds/i, /garden/i, /grow/i, /bloom/i] },
    { domain: 'building', patterns: [/foundation/i, /construct/i, /build/i, /architect/i, /structure/i] },
    { domain: 'water', patterns: [/ocean/i, /wave/i, /current/i, /flow/i, /river/i, /tide/i] },
    { domain: 'medical/surgery', patterns: [/surgery/i, /surgeon/i, /patient/i, /diagnosis/i, /healing/i, /operation/i, /intensive care/i, /autopsy/i, /surgical/i, /tumor/i, /hemorrhaging/i] },
    { domain: 'battle/war', patterns: [/battle/i, /warrior/i, /combat/i, /soldier/i, /weapon/i, /armor/i, /strategy/i, /defeat/i, /victory/i] },
  ];

  let maxOccurrences = 0;
  let dominantDomain: string | null = null;

  for (const { domain, patterns } of metaphorPatterns) {
    let count = 0;
    for (const pattern of patterns) {
      const matches = text.match(new RegExp(pattern, 'gi'));
      if (matches) count += matches.length;
    }

    if (count > maxOccurrences) {
      maxOccurrences = count;
      dominantDomain = domain;
    }
  }

  // Sustained = appears in multiple sections (split by paragraphs)
  const paragraphs = text.split(/\n\n+/);
  let paragraphsWithMetaphor = 0;

  if (dominantDomain) {
    const domainData = metaphorPatterns.find(m => m.domain === dominantDomain);
    if (domainData) {
      for (const paragraph of paragraphs) {
        if (domainData.patterns.some(p => p.test(paragraph))) {
          paragraphsWithMetaphor++;
        }
      }
    }
  }

  return {
    hasMetaphor: maxOccurrences >= 3,
    centralImage: dominantDomain,
    occurrences: maxOccurrences,
    sustained: paragraphsWithMetaphor >= 2,
  };
}

// ============================================================================
// TECHNIQUE 2: STRUCTURAL INNOVATION
// ============================================================================

function detectStructuralInnovation(text: string): {
  innovations: string[];
  score: number; // 0-20
} {
  const innovations: string[] = [];
  let score = 0;

  // Montage structure (organized around object/list)
  const montageMarkers = [
    /^["'].*["'],\s*(top|bottom|left|right|middle)/im, // "Text", position
    /^(first|second|third|fourth|fifth|finally):/im,
    /^\d+\./m, // Numbered list
  ];

  if (montageMarkers.some(p => p.test(text))) {
    innovations.push('montage_structure');
    score += 8;
  }

  // Definition opening
  const definitionOpening = /^[A-Z][a-z]+:\s+[a-z\s,]+\./m;
  if (definitionOpening.test(text.substring(0, 200))) {
    innovations.push('definition_opening');
    score += 6;
  }

  // In medias res (starts with action/dialogue)
  const firstSentence = text.split(/[.!?]/)[0];
  const inMediasResPatterns = [
    /^"[^"]+"/,  // Starts with dialogue
    /^A scream|^The crash|^Blood|^Fire/i, // Dramatic opening
    /^\w+\sin\sthe\s(night|morning|distance)/i,
  ];

  if (inMediasResPatterns.some(p => p.test(firstSentence))) {
    innovations.push('in_medias_res');
    score += 7;
  }

  // Dual/parallel scenes
  // Accept both "Scene 1" and "Scene One" formats
  const sceneMarkers = text.match(/[\*_]*(Scene|Moment|Act)\s+(\d+|one|two|three|four|I|II|III|IV)[\*_:]/gim);
  const paragraphCount = text.split(/\n\n+/).length;

  // Check for explicit scene markers
  if (sceneMarkers && sceneMarkers.length >= 2) {
    innovations.push('dual_scene_parallelism');
    score += 8;
  } else if (paragraphCount >= 2 && paragraphCount <= 4) {
    // Check if two substantial paragraphs with contrasting content
    const paragraphs = text.split(/\n\n+/);
    if (paragraphs.length === 2 && paragraphs[0].length > 200 && paragraphs[1].length > 200) {
      // Look for contrasting keywords
      const contrastPatterns = [
        { p1: /stage|performance|audience/i, p2: /workshop|lab|technical/i },
        { p1: /summer|morning|light/i, p2: /winter|night|dark/i },
        { p1: /solo|alone|individual/i, p2: /team|together|group/i },
      ];

      for (const { p1, p2 } of contrastPatterns) {
        if (p1.test(paragraphs[0]) && p2.test(paragraphs[1])) {
          innovations.push('dual_scene_parallelism');
          score += 8;
          break;
        }
      }
    }
  }

  // Nonlinear time
  const timeShiftMarkers = [
    /there was a time/i,
    /years (ago|earlier|before)/i,
    /flash(back|forward)/i,
    /looking back/i,
    /(before|after) (this|that)/i,
  ];

  if (timeShiftMarkers.some(p => p.test(text))) {
    innovations.push('nonlinear_time');
    score += 5;
  }

  return { innovations, score };
}

// ============================================================================
// TECHNIQUE 3: RHYTHMIC PROSE
// ============================================================================

function analyzeRhythmicProse(text: string): {
  score: number; // 0-15
  hasVariety: boolean;
  shortSentences: number;
  longSentences: number;
  hasParallelism: boolean;
  hasAlliteration: boolean;
} {
  let score = 0;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceLengths = sentences.map(s => s.trim().split(/\s+/).length);

  // Count very short (1-2 words), short (3-5 words), and long (> 25 words) sentences
  const veryShortSentences = sentenceLengths.filter(len => len <= 2).length;
  const shortSentences = sentenceLengths.filter(len => len >= 3 && len <= 5).length;
  const longSentences = sentenceLengths.filter(len => len >= 25).length;

  // Excellent variety: very short + short + long (like elite essays)
  const hasExcellentVariety = veryShortSentences >= 1 && shortSentences >= 1 && longSentences >= 1;
  if (hasExcellentVariety) {
    score += 8; // Higher reward for excellent variety
  } else if ((veryShortSentences >= 1 || shortSentences >= 2) && longSentences >= 1) {
    // Good variety: some short and long
    score += 5;
  }

  // Bonus for multiple very short sentences (creates dramatic emphasis)
  if (veryShortSentences >= 2) {
    score += 2;
  }

  // Bonus for good short sentence usage
  if (shortSentences >= 2) {
    score += 1;
  }

  const hasVariety = hasExcellentVariety || (shortSentences >= 1 && longSentences >= 1);

  // Parallel structure detection
  const parallelPatterns = [
    /I\s+\w+,\s+I\s+\w+,\s+(and|or)\s+I\s+\w+/i,
    /(The|A)\s+\w+,\s+(the|a)\s+\w+,\s+(and|or)\s+(the|a)\s+\w+/i,
    /In\s+the\s+\w+\.\s+In\s+the\s+\w+\./i,
  ];

  const hasParallelism = parallelPatterns.some(p => p.test(text));
  if (hasParallelism) {
    score += 3;
  }

  // Alliteration detection (3+ words starting with same sound)
  const alliterationPattern = /\b([bcdfghjklmnpqrstvwxyz])\w+\s+\1\w+\s+\1\w+/gi;
  const hasAlliteration = alliterationPattern.test(text);
  if (hasAlliteration) {
    score += 3;
  }

  return {
    score: Math.min(score, 15),
    hasVariety,
    shortSentences,
    longSentences,
    hasParallelism,
    hasAlliteration,
  };
}

// ============================================================================
// TECHNIQUE 4: SENSORY IMMERSION
// ============================================================================

function analyzeSensoryImmersion(text: string): {
  score: number; // 0-15
  senses: Record<string, number>;
  diverseSenses: boolean;
} {
  const senses = {
    sight: 0,
    sound: 0,
    touch: 0,
    smell: 0,
    taste: 0,
  };

  // Sight
  const sightPatterns = [
    /\b(see|saw|look|watch|view|stare|gaze|glimpse|peer)\b/gi,
    /\b(bright|dark|color|light|shadow|glow|shimmer|flash)\b/gi,
    /\b(brilliant|dim|vivid|pale|radiant)\b/gi,
  ];

  sightPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) senses.sight += matches.length;
  });

  // Sound
  const soundPatterns = [
    /\b(hear|listen|sound|echo|ring|chime|shout|whisper)\b/gi,
    /\b(loud|quiet|silent|noisy|deafening|murmur)\b/gi,
    /\b(music|melody|rhythm|beat|tone)\b/gi,
    /(voice|voices).{0,15}(cut|cracked|broke|whispered|shouted|said)/gi,
    /\b(screamed|yelled|laughed|cried|sobbed)\b/gi,
  ];

  soundPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) senses.sound += matches.length;
  });

  // Touch
  const touchPatterns = [
    /\b(touch|feel|grip|grasp|press|hold|squeeze)\b/gi,
    /\b(rough|smooth|soft|hard|cold|warm|hot)\b/gi,
    /\b(texture|surface|grease|dust|pain|hurt|itch)\b/gi,
    /hands?.{0,10}(covered|hurt|cramped|trembling|shaking|trembled|shook)/gi,
    /(stomach|chest|throat|jaw).{0,10}(cramped|tightened|dropped|clenched)/gi,
    /\b(trembled|trembling|shaking|shook|shivering)\b/gi,
  ];

  touchPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) senses.touch += matches.length;
  });

  // Smell
  const smellPatterns = [
    /\b(smell|scent|aroma|odor|fragrance|stink|reek)\b/gi,
    /\b(smelled like|scent of)\b/gi,
  ];

  smellPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) senses.smell += matches.length;
  });

  // Taste
  const tastePatterns = [
    /\b(taste|flavor|sweet|bitter|sour|salty|savory)\b/gi,
    /\b(tasted like)\b/gi,
  ];

  tastePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) senses.taste += matches.length;
  });

  // Calculate score
  const totalSensory = Object.values(senses).reduce((a, b) => a + b, 0);
  const sensesUsed = Object.values(senses).filter(v => v > 0).length;
  const diverseSenses = sensesUsed >= 3;

  let score = Math.min(totalSensory * 1.5, 12); // Cap at 12
  if (diverseSenses) score += 3; // Bonus for using 3+ different senses

  return {
    score: Math.min(score, 15),
    senses,
    diverseSenses,
  };
}

// ============================================================================
// TECHNIQUE 5: AUTHENTIC VOICE MARKERS
// ============================================================================

function detectAuthenticVoice(text: string): {
  score: number; // 0-15
  hasParentheticals: boolean;
  hasGenZVernacular: boolean;
  hasEnthusiasm: boolean;
  conversationalMarkers: string[];
} {
  let score = 0;
  const conversationalMarkers: string[] = [];

  // Parenthetical asides
  const parentheticalPattern = /\([^)]{5,}\)/g;
  const parentheticals = text.match(parentheticalPattern);
  const hasParentheticals = (parentheticals?.length || 0) >= 1;

  if (hasParentheticals) {
    score += 5;
    conversationalMarkers.push('parenthetical_asides');
  }

  // Gen-Z / contemporary vernacular (expanded)
  const genZPatterns = [
    // Slang
    /lowkey|highkey/i,
    /\bfr\b|for real/i,
    /ngl|not gonna lie/i,
    /\bnope\b/i, // as standalone sentence starter
    /\bdope\b/i,
    /vibe|vibes/i,

    // Contractions & informal
    /gotta\s+\w+/i,
    /wanna\s+\w+/i,
    /gonna\s+\w+/i,
    /kinda\s+\w+/i,
    /sorta\s+\w+/i,

    // Modern expressions
    /dark academia/i,
    /main character energy/i,
    /\bhit different/i,
    /\bslaps\b/i, // "this slaps"
    /\bfacts\b/i, // "facts" as agreement

    // Informal intensifiers
    /\bdead\b.*serious/i, // "dead serious"
    /\bhella\s+\w+/i,
    /\bsuper\s+(cool|excited|nervous)/i,
    /\btotally\s+(lost|confused|freaked)/i,
  ];

  const hasGenZVernacular = genZPatterns.some(p => p.test(text));
  if (hasGenZVernacular) {
    score += 3;
    conversationalMarkers.push('gen_z_vernacular');
  }

  // Enthusiasm markers
  const enthusiasmPatterns = [
    /come on!/i,
    /I mean,/i,
    /honestly,/i,
    /literally/i,
    /\b(amazing|incredible|awesome|fantastic)\b/i,
  ];

  const hasEnthusiasm = enthusiasmPatterns.some(p => p.test(text));
  if (hasEnthusiasm) {
    score += 3;
    conversationalMarkers.push('enthusiasm');
  }

  // Rhetorical questions
  const questions = text.match(/\?/g);
  if ((questions?.length || 0) >= 2) {
    score += 2;
    conversationalMarkers.push('rhetorical_questions');
  }

  // Direct address to reader
  const directAddress = /(you know|you see|imagine|picture this)/i;
  if (directAddress.test(text)) {
    score += 2;
    conversationalMarkers.push('direct_address');
  }

  return {
    score: Math.min(score, 15),
    hasParentheticals,
    hasGenZVernacular,
    hasEnthusiasm,
    conversationalMarkers,
  };
}

// ============================================================================
// TECHNIQUE 6: PERSPECTIVE SHIFTS
// ============================================================================

function detectPerspectiveShift(text: string): {
  hasShift: boolean;
  shiftType: string | null;
  score: number;
} {
  let shiftType: string | null = null;
  let score = 0;

  // Third-person to first-person reveal
  const firstPara = text.split(/\n\n+/)[0];
  const hasThirdPerson = /\b(he|she|they|the \w+)\s+(was|were|walked|looked)/i.test(firstPara);
  const hasFirstPersonReveal = /\b(it was me|that was me|i was|i am)\b/i.test(text);

  if (hasThirdPerson && hasFirstPersonReveal) {
    shiftType = 'third_to_first_reveal';
    score = 10;
  }

  // Present to past tense shift
  const hasPresentTense = /\b(I\s+(am|do|go|see|feel|walk))\b/i.test(text);
  const hasPastTense = /\b(I\s+(was|did|went|saw|felt|walked))\b/i.test(text);

  if (hasPresentTense && hasPastTense) {
    if (!shiftType) {
      shiftType = 'tense_shift';
      score = 5;
    }
  }

  return {
    hasShift: shiftType !== null,
    shiftType,
    score,
  };
}

// ============================================================================
// TECHNIQUE 7: STRATEGIC VULNERABILITY
// ============================================================================

function analyzeStrategicVulnerability(text: string): {
  score: number; // 0-15
  placedAtEnd: boolean;
  subvertsExpectation: boolean;
  examples: string[];
} {
  let score = 0;
  const examples: string[] = [];

  // Vulnerability markers
  const vulnerabilityPatterns = [
    { pattern: /or at least (I|he|she)/gi, points: 5, type: 'admits_doubt' },
    { pattern: /(maybe|perhaps) (I'm|I was|he was|she was)/gi, points: 3, type: 'uncertainty' },
    { pattern: /I (worried|feared|doubted) (that|if)/gi, points: 4, type: 'named_fear' },
    { pattern: /wasn't sure (if|whether|how)/gi, points: 3, type: 'admits_ignorance' },
  ];

  for (const { pattern, points, type } of vulnerabilityPatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      score += points;
      examples.push(type);

      // Check if placed at end of paragraph
      const textAfterMatch = text.substring(match.index! + match[0].length);
      const nextParagraph = textAfterMatch.indexOf('\n\n');
      const nextSentence = textAfterMatch.indexOf('.');

      if (nextSentence < 50 && (nextParagraph === -1 || nextSentence < nextParagraph)) {
        score += 2; // Bonus for end placement
      }
    }
  }

  // Subverts expectation pattern: positive statement followed by vulnerability
  const subversionPattern = /(we|he|she|they).{10,50}(but|though|or at least)/i;
  const subvertsExpectation = subversionPattern.test(text);

  const lastParagraph = text.split(/\n\n+/).pop() || '';
  const placedAtEnd = vulnerabilityPatterns.some(({ pattern }) => pattern.test(lastParagraph));

  return {
    score: Math.min(score, 15),
    placedAtEnd,
    subvertsExpectation,
    examples: [...new Set(examples)],
  };
}

// ============================================================================
// MAIN LITERARY SOPHISTICATION ANALYSIS
// ============================================================================

export interface LiterarySophisticationAnalysis {
  overallScore: number; // 0-100
  tier: 'S' | 'A' | 'B' | 'C'; // S=Elite (95-100), A=Strong (85-95), B=Good (70-85), C=Basic (<70)

  extendedMetaphor: {
    hasMetaphor: boolean;
    centralImage: string | null;
    sustained: boolean;
    score: number;
  };

  structuralInnovation: {
    innovations: string[];
    score: number;
  };

  rhythmicProse: {
    hasVariety: boolean;
    shortSentences: number;
    longSentences: number;
    hasParallelism: boolean;
    score: number;
  };

  sensoryImmersion: {
    diverseSenses: boolean;
    senses: Record<string, number>;
    score: number;
  };

  authenticVoice: {
    hasParentheticals: boolean;
    hasGenZVernacular: boolean;
    conversationalMarkers: string[];
    score: number;
  };

  perspectiveShift: {
    hasShift: boolean;
    shiftType: string | null;
    score: number;
  };

  strategicVulnerability: {
    placedAtEnd: boolean;
    subvertsExpectation: boolean;
    score: number;
  };

  strengths: string[];
  improvements: string[];
}

export function analyzeLiterarySophistication(text: string): LiterarySophisticationAnalysis {
  // Run all analyses
  const metaphor = detectExtendedMetaphor(text);
  const structure = detectStructuralInnovation(text);
  const rhythm = analyzeRhythmicProse(text);
  const sensory = analyzeSensoryImmersion(text);
  const voice = detectAuthenticVoice(text);
  const perspective = detectPerspectiveShift(text);
  const vulnerability = analyzeStrategicVulnerability(text);

  // Calculate overall score
  const metaphorScore = metaphor.sustained ? 20 : (metaphor.hasMetaphor ? 10 : 0);
  const overallScore =
    metaphorScore +
    structure.score +
    rhythm.score +
    sensory.score +
    voice.score +
    perspective.score +
    vulnerability.score;

  // Determine tier
  let tier: 'S' | 'A' | 'B' | 'C';
  if (overallScore >= 95) tier = 'S';
  else if (overallScore >= 85) tier = 'A';
  else if (overallScore >= 70) tier = 'B';
  else tier = 'C';

  // Generate strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (metaphor.sustained) {
    strengths.push(`Sustained extended metaphor (${metaphor.centralImage})`);
  } else if (!metaphor.hasMetaphor) {
    improvements.push('Add extended metaphor to unify narrative');
  }

  if (structure.innovations.length > 0) {
    strengths.push(`Structural innovation: ${structure.innovations.join(', ')}`);
  } else {
    improvements.push('Consider nontraditional structure (montage, dual-scene, in medias res)');
  }

  if (rhythm.hasVariety) {
    strengths.push('Strong sentence variety creates rhythm');
  } else {
    improvements.push('Vary sentence length (add 1-2 short sentences for emphasis)');
  }

  if (sensory.diverseSenses) {
    strengths.push('Rich sensory immersion across multiple senses');
  } else {
    improvements.push('Add more sensory details (touch, sound, sight)');
  }

  if (voice.hasParentheticals) {
    strengths.push('Authentic voice with conversational asides');
  } else if (voice.score < 8) {
    improvements.push('Consider adding parenthetical asides for personality');
  }

  if (perspective.hasShift) {
    strengths.push(`Sophisticated perspective shift: ${perspective.shiftType}`);
  }

  if (vulnerability.subvertsExpectation) {
    strengths.push('Strategic vulnerability placement with emotional impact');
  } else if (vulnerability.score < 5) {
    improvements.push('Add moment of vulnerability or self-doubt');
  }

  return {
    overallScore,
    tier,
    extendedMetaphor: {
      ...metaphor,
      score: metaphorScore,
    },
    structuralInnovation: structure,
    rhythmicProse: rhythm,
    sensoryImmersion: sensory,
    authenticVoice: voice,
    perspectiveShift: perspective,
    strategicVulnerability: vulnerability,
    strengths,
    improvements,
  };
}
