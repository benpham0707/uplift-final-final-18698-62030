/**
 * UC System Calibration Constants
 *
 * All tier definitions, benchmarks, and rubrics calibrated to actual UC admissions data (2024-2025)
 */

// ============================================================================
// UC GPA Benchmarks (Real Data from Common Data Sets)
// ============================================================================

export const UC_BERKELEY_GPA_BENCHMARKS = {
  percentile_75th: {
    weighted: 4.29,
    unweighted: 3.96,
    aps: 12,
    description: 'Very competitive - top quartile'
  },
  percentile_50th: {
    weighted: 4.22,  // Middle of 4.15-4.29 range
    unweighted: 3.94,
    aps: 10,
    description: 'Competitive - median admit'
  },
  percentile_25th: {
    weighted: 4.15,
    unweighted: 3.92,
    aps: 8,
    description: 'Minimum competitive with strong PIQs/context'
  },
  acceptance_rate: 0.113  // 11.3% (2024)
};

export const UCLA_GPA_BENCHMARKS = {
  percentile_75th: {
    weighted: 4.34,
    unweighted: 3.96,
    aps: 12,
    description: 'Very competitive - top quartile'
  },
  percentile_50th: {
    weighted: 4.27,  // Middle of 4.20-4.34 range
    unweighted: 3.94,
    aps: 11,
    description: 'Competitive - median admit'
  },
  percentile_25th: {
    weighted: 4.20,
    unweighted: 3.92,
    aps: 8,
    description: 'Minimum competitive with exceptional PIQs'
  },
  acceptance_rate: 0.09  // 9% (2024)
};

export const GENERAL_UC_GPA_BENCHMARKS = {
  percentile_75th: {
    weighted: 4.20,
    unweighted: 3.90,
    aps: 10,
    description: 'Very competitive'
  },
  percentile_50th: {
    weighted: 4.10,
    unweighted: 3.85,
    aps: 8,
    description: 'Competitive'
  },
  percentile_25th: {
    weighted: 4.00,
    unweighted: 3.75,
    aps: 6,
    description: 'Possible with strong application'
  },
  acceptance_rate: 0.30  // Average ~30% for mid-tier UCs
};

// ============================================================================
// Academic Excellence Tiers (UC-Calibrated)
// ============================================================================

export const ACADEMIC_EXCELLENCE_TIERS = {
  exceptional: {
    score_range: [9.0, 10.0],
    name: 'Exceptional',
    uc_berkeley: {
      weighted_gpa: 4.25,
      unweighted_gpa: 3.95,
      aps: 12,
      description: 'Top quartile for Berkeley - competitive for admission'
    },
    ucla: {
      weighted_gpa: 4.30,
      unweighted_gpa: 3.95,
      aps: 12,
      description: 'Top quartile for UCLA - very competitive'
    },
    general_uc: {
      weighted_gpa: 4.20,
      unweighted_gpa: 3.90,
      aps: 10,
      description: 'Excellent for any UC'
    },
    indicators: [
      'Weighted GPA 4.2+ (UC-weighted)',
      '10-15+ AP/IB courses across subjects',
      'Near-perfect or perfect GPA trend',
      'Academic awards (AP Scholar, National Merit, etc.)',
      '"Most rigorous" curriculum checkbox',
      'Advanced coursework beyond school offerings (college courses)'
    ]
  },

  strong: {
    score_range: [7.0, 8.9],
    name: 'Strong',
    uc_berkeley: {
      weighted_gpa: 4.15,
      unweighted_gpa: 3.85,
      aps: 8,
      description: 'Minimum competitive - need strong PIQs/ECs'
    },
    ucla: {
      weighted_gpa: 4.20,
      unweighted_gpa: 3.85,
      aps: 8,
      description: 'Below median but possible with exceptional PIQs'
    },
    general_uc: {
      weighted_gpa: 4.00,
      unweighted_gpa: 3.80,
      aps: 7,
      description: 'Competitive for mid-tier UCs'
    },
    indicators: [
      'Weighted GPA 4.0-4.2',
      '6-10 AP/IB courses',
      'Mostly As with some Bs in rigorous courses',
      'Strong rigor relative to school offerings',
      'Some academic recognition (school/regional level)'
    ]
  },

  developing: {
    score_range: [4.0, 6.9],
    name: 'Developing',
    description: 'Solid academic foundation but below UC competitive range',
    indicators: [
      'Weighted GPA 3.7-4.0',
      '3-6 AP/IB courses',
      'Mix of As and Bs',
      'Moderate rigor',
      'May be competitive for lower-tier UCs with context'
    ]
  },

  foundational: {
    score_range: [0, 3.9],
    name: 'Foundational',
    description: 'Not competitive for UCs without exceptional circumstances',
    indicators: [
      'Weighted GPA below 3.7',
      'Few or no AP/IB courses',
      'Significant grade challenges',
      'Would need exceptional context story'
    ]
  }
};

// ============================================================================
// Leadership & Initiative Tiers (UC-Calibrated)
// ============================================================================

export const LEADERSHIP_TIERS = {
  transformational: {
    score_range: [9.0, 10.0],
    name: 'Transformational',
    description: 'Changed systems, built lasting institutions (Tier 1 EC)',
    examples: [
      'Founded nonprofit serving 500+ people, 3+ years operating',
      'Started program adopted school-wide or district-wide',
      'State/national recognition for leadership',
      'Built organization from 0 to 50+ members with measurable impact'
    ],
    uc_value: 'Highly valued at Berkeley/UCLA - rare achievement'
  },

  organizational: {
    score_range: [7.0, 8.9],
    name: 'Organizational',
    description: 'Led teams, drove significant growth (Tier 2 EC)',
    examples: [
      'Club president: grew membership 2x+, organized major events',
      'Team captain: led team to regional/state competition',
      'Started club/initiative with 20+ members, 2+ years',
      'Community service project affecting 100+ people'
    ],
    uc_value: 'Competitive for top UCs - shows initiative and impact'
  },

  positional: {
    score_range: [5.0, 6.9],
    name: 'Positional',
    description: 'Held leadership roles, executed responsibilities (Tier 3 EC)',
    examples: [
      'Club officer (VP, secretary, treasurer)',
      'Section leader in band/orchestra',
      'Organized school events',
      'Varsity team member (not captain)'
    ],
    uc_value: 'Solid for mid-tier UCs - shows involvement'
  },

  participant: {
    score_range: [0, 4.9],
    name: 'Participant',
    description: 'Member of activities without leadership (Tier 4 EC)',
    examples: [
      'Club member only',
      'Generic volunteering',
      'Short-term involvement (<1 year)'
    ],
    uc_value: 'Common - not differentiating'
  }
};

// ============================================================================
// Intellectual Curiosity Tiers (UC-Calibrated, Berkeley-Focused)
// ============================================================================

export const INTELLECTUAL_CURIOSITY_TIERS = {
  scholar: {
    score_range: [9.0, 10.0],
    name: 'Scholar',
    description: 'Original research, publications, independent intellectual work',
    examples: [
      'Published paper in peer-reviewed journal or presented at conference',
      'Independent research project with university professor',
      'Created significant open-source project (1000+ users/stars)',
      'Self-studied college-level math/CS and applied it (created something)',
      'Intel/Regeneron Science Fair finalist',
      'Significant intellectual competition success (USAMO, USACO Platinum)'
    ],
    uc_value: 'HUGE at Berkeley - seeks future researchers and scholars'
  },

  explorer: {
    score_range: [7.0, 8.9],
    name: 'Explorer',
    description: 'Self-directed learning, independent projects, deep exploration',
    examples: [
      'Completed selective summer research program (COSMOS, SETI, etc.)',
      'Built multiple coding projects, contributed to open source',
      'Self-taught advanced topic and created project (ML, robotics, etc.)',
      'Independent science fair project (regional/state level)',
      'Created blog/YouTube channel with educational content'
    ],
    uc_value: 'Strong for Berkeley/UCLA - shows genuine curiosity'
  },

  learner: {
    score_range: [4.0, 6.9],
    name: 'Learner',
    description: 'Shows interest, explores beyond classroom',
    examples: [
      'Completed online courses (Coursera, edX) with certificates',
      'Attended workshops or non-selective summer programs',
      'Read extensively in area of interest',
      'Basic independent projects'
    ],
    uc_value: 'Acceptable for general UCs - shows interest'
  },

  student: {
    score_range: [0, 3.9],
    name: 'Student',
    description: 'Learning is assigned, minimal exploration beyond requirements',
    uc_value: 'Weak for competitive UCs'
  }
};

// ============================================================================
// Community Impact Tiers (UC-Calibrated, UCLA-Focused)
// ============================================================================

export const COMMUNITY_IMPACT_TIERS = {
  changemaker: {
    score_range: [9.0, 10.0],
    name: 'Changemaker',
    description: 'Changed systems, created lasting infrastructure',
    examples: [
      'Created program adopted by school/district (now permanent)',
      'Founded organization serving 200+ families, 2+ years',
      'Led initiative that solved root cause problem',
      'Service leadership with measurable population-level outcomes'
    ],
    uc_value: 'Excellent for UCLA - aligns with "Bruin values"'
  },

  leader: {
    score_range: [7.0, 8.9],
    name: 'Leader',
    description: 'Organized service projects, mobilized others',
    examples: [
      'Led service project affecting 50+ people',
      'Organized volunteer program (coordinated 10+ volunteers)',
      'Tutoring program with measurable student improvement',
      '200+ hours with clear beneficiary and impact'
    ],
    uc_value: 'Strong for all UCs - demonstrates commitment'
  },

  contributor: {
    score_range: [4.0, 6.9],
    name: 'Contributor',
    description: 'Direct service, clear beneficiaries',
    examples: [
      'Regular volunteering at specific org (6+ months)',
      'Tutored 5-10 students',
      'Participated in service trips with follow-up',
      'Can name specific people/groups helped'
    ],
    uc_value: 'Acceptable - shows good citizenship'
  },

  volunteer: {
    score_range: [0, 3.9],
    name: 'Volunteer',
    description: 'Logs hours, passive participation',
    uc_value: 'Common - not differentiating'
  }
};

// ============================================================================
// PIQ/Authenticity Tiers (UC-Calibrated, Critical for UCLA)
// ============================================================================

export const PIQ_AUTHENTICITY_TIERS = {
  distinctive: {
    score_range: [9.0, 10.0],
    name: 'Distinctive',
    description: 'Exceptional PIQs - authentic voice, compelling narratives',
    indicators: [
      'All 4 PIQs have specific, detailed stories (not generic)',
      'Unique voice evident throughout',
      'Shows vulnerability and growth',
      'Demonstrates UC values clearly',
      'Memorable narratives',
      'NQI 80-100 on PIQ workshop analysis'
    ],
    uc_value: 'HUGE at UCLA - can make/break admission'
  },

  authentic: {
    score_range: [7.0, 8.9],
    name: 'Authentic',
    description: 'Strong PIQs - genuine voice, clear communication',
    indicators: [
      'PIQs tell real stories with specifics',
      'Clear personality comes through',
      'Addresses prompts directly',
      'Shows genuine passion',
      'NQI 70-79 on PIQ workshop analysis'
    ],
    uc_value: 'Strong for all UCs - competitive essays'
  },

  emerging: {
    score_range: [4.0, 6.9],
    name: 'Emerging',
    description: 'Adequate PIQs - clear but generic',
    indicators: [
      'Answers prompts but lacks depth',
      'Some generic language',
      'Resume rehash in places',
      'NQI 60-69'
    ],
    uc_value: 'Acceptable but not differentiating'
  },

  manufactured: {
    score_range: [0, 3.9],
    name: 'Manufactured',
    description: 'Weak PIQs - generic, robotic, unclear',
    uc_value: 'Hurts chances at competitive UCs'
  }
};

// ============================================================================
// Context Adjustment Factors (UC Public Mission)
// ============================================================================

export const UC_CONTEXT_ADJUSTMENTS = {
  first_generation: {
    academic_boost: 0.5,  // +0.5 to academic score
    description: 'First-gen students navigating college process without family guidance',
    uc_value: 'Heavily valued - UCs prioritize first-gen admits'
  },

  low_income: {
    ec_equivalence: 'Work for family = Tier 2-3 EC',
    description: 'Working 15+ hrs/week for family counts as significant leadership',
    uc_value: 'Context considered - economic diversity valued'
  },

  under_resourced_school: {
    rigor_adjustment: 'Taking ALL APs offered = "most rigorous" even if only 3-4',
    description: 'School offers limited AP courses',
    uc_value: 'Major context factor - achievement relative to opportunities'
  },

  family_responsibilities: {
    ec_equivalence: 'Caring for siblings 15+ hrs/week = Tier 2-3 EC',
    description: 'Family responsibilities count as significant time commitment',
    uc_value: 'Shows maturity and responsibility'
  },

  english_learner: {
    writing_consideration: 'PIQ quality judged with language learning context',
    description: 'English not first language',
    uc_value: 'Context considered in essay evaluation'
  }
};

// ============================================================================
// UC Comprehensive Review Factors (14 Official Factors)
// ============================================================================

export const UC_COMPREHENSIVE_REVIEW_FACTORS = [
  {
    factor: 'Academic GPA (UC-weighted)',
    weight: 'Very High',
    category: 'Academic'
  },
  {
    factor: 'Courses beyond minimum a-g requirements',
    weight: 'High',
    category: 'Academic'
  },
  {
    factor: 'Number of UC-approved honors/AP/IB courses',
    weight: 'High',
    category: 'Academic'
  },
  {
    factor: 'Quality of senior year program',
    weight: 'Medium',
    category: 'Academic'
  },
  {
    factor: 'Quality of Personal Insight Questions (PIQs)',
    weight: 'Very High',
    category: 'Personal'
  },
  {
    factor: 'Special talents, achievements, awards',
    weight: 'Medium-High',
    category: 'Personal'
  },
  {
    factor: 'Participation in academic preparation programs',
    weight: 'Medium',
    category: 'Personal'
  },
  {
    factor: 'Academic accomplishments in light of life experiences',
    weight: 'High',
    category: 'Context'
  },
  {
    factor: 'Location of residence and secondary school',
    weight: 'Medium',
    category: 'Context'
  },
  {
    factor: 'Improvement in academic performance',
    weight: 'Medium',
    category: 'Academic'
  },
  {
    factor: 'Special projects (research, creative work)',
    weight: 'Medium-High',
    category: 'Personal'
  },
  {
    factor: 'Leadership in school or community',
    weight: 'Medium-High',
    category: 'Personal'
  },
  {
    factor: 'Community service and volunteer work',
    weight: 'Medium',
    category: 'Personal'
  },
  {
    factor: 'Employment during high school',
    weight: 'Medium',
    category: 'Personal'
  }
];

// ============================================================================
// UC Campus Characteristics (for fit analysis)
// ============================================================================

export const UC_CAMPUS_PROFILES = {
  'UC Berkeley': {
    priorities: ['Academic rigor', 'Research', 'Innovation', 'Intellectual curiosity'],
    strengths_valued: ['STEM excellence', 'Independent research', 'Academic competitions'],
    culture: 'Research-focused, activist, competitive',
    ideal_profile: 'Scholar archetype - high academics + intellectual curiosity'
  },

  'UCLA': {
    priorities: ['Holistic excellence', 'Community engagement', 'Diversity', 'Balance'],
    strengths_valued: ['Well-rounded profile', 'Service leadership', 'Exceptional PIQs'],
    culture: 'Collaborative, service-oriented, "Bruin spirit"',
    ideal_profile: 'Well-Rounded or Leader archetype - balance + community focus'
  },

  'UC San Diego': {
    priorities: ['STEM strength', 'Research', 'Innovation'],
    strengths_valued: ['Science/engineering aptitude', 'Research experience'],
    culture: 'STEM-focused, research university',
    ideal_profile: 'Scholar (STEM) archetype'
  },

  'UC Irvine': {
    priorities: ['Academic strength', 'Diversity', 'Innovation'],
    strengths_valued: ['Strong academics', 'Well-rounded activities'],
    culture: 'Diverse, growing research university',
    ideal_profile: 'Balanced academic + activities'
  },

  'UC Davis': {
    priorities: ['Agricultural sciences', 'Sustainability', 'Community'],
    strengths_valued: ['Environmental focus', 'Community service'],
    culture: 'Collaborative, agricultural roots, sustainability-focused',
    ideal_profile: 'Community-oriented, environmental interests'
  },

  'UC Santa Barbara': {
    priorities: ['Academic excellence', 'Research', 'Balance'],
    strengths_valued: ['Strong academics', 'Research (especially sciences)'],
    culture: 'Research university with beach culture',
    ideal_profile: 'Academic focus + well-rounded'
  }
};

// ============================================================================
// Helper Functions
// ============================================================================

export function getUCGPABenchmark(mode: 'berkeley' | 'ucla' | 'general_uc') {
  switch (mode) {
    case 'berkeley':
      return UC_BERKELEY_GPA_BENCHMARKS;
    case 'ucla':
      return UCLA_GPA_BENCHMARKS;
    case 'general_uc':
      return GENERAL_UC_GPA_BENCHMARKS;
  }
}

export function isCompetitiveGPA(
  weighted_gpa: number,
  mode: 'berkeley' | 'ucla' | 'general_uc'
): { competitive: boolean; percentile: string; explanation: string } {
  const benchmark = getUCGPABenchmark(mode);

  if (weighted_gpa >= benchmark.percentile_75th.weighted) {
    return {
      competitive: true,
      percentile: 'Top 25%',
      explanation: `Your ${weighted_gpa.toFixed(2)} weighted GPA exceeds the 75th percentile (${benchmark.percentile_75th.weighted}) for ${mode === 'berkeley' ? 'UC Berkeley' : mode === 'ucla' ? 'UCLA' : 'UCs'}. Very competitive.`
    };
  } else if (weighted_gpa >= benchmark.percentile_50th.weighted) {
    return {
      competitive: true,
      percentile: '25th-75th percentile',
      explanation: `Your ${weighted_gpa.toFixed(2)} weighted GPA falls in the middle 50% (${benchmark.percentile_25th.weighted}-${benchmark.percentile_75th.weighted}) for ${mode === 'berkeley' ? 'UC Berkeley' : mode === 'ucla' ? 'UCLA' : 'UCs'}. Competitive.`
    };
  } else if (weighted_gpa >= benchmark.percentile_25th.weighted) {
    return {
      competitive: true,
      percentile: 'Bottom 25%',
      explanation: `Your ${weighted_gpa.toFixed(2)} weighted GPA is at/near the 25th percentile (${benchmark.percentile_25th.weighted}) for ${mode === 'berkeley' ? 'UC Berkeley' : mode === 'ucla' ? 'UCLA' : 'UCs'}. Will need strong PIQs and ECs.`
    };
  } else {
    return {
      competitive: false,
      percentile: 'Below 25th percentile',
      explanation: `Your ${weighted_gpa.toFixed(2)} weighted GPA is below the 25th percentile (${benchmark.percentile_25th.weighted}) for ${mode === 'berkeley' ? 'UC Berkeley' : mode === 'ucla' ? 'UCLA' : 'UCs'}. Would need exceptional circumstances or context.`
    };
  }
}
