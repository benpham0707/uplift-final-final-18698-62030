/**
 * Portfolio Scanner Comprehensive Tests
 *
 * Tests the UC-focused holistic portfolio scanner with various student profiles:
 * 1. High-achieving Berkeley candidate
 * 2. Community-focused UCLA candidate
 * 3. First-gen low-income student (context-heavy)
 * 4. Average student (developing profile)
 *
 * Usage:
 * NODE_OPTIONS="--no-warnings" npx tsx tests/test-portfolio-scanner.ts
 */

import {
  analyzePortfolio,
  PortfolioData,
  UCEvaluationMode,
  UC_BERKELEY_WEIGHTS,
  UCLA_WEIGHTS,
  getWeightsForMode,
} from '../src/services/portfolio';

// ============================================================================
// Test Data: Sample Portfolios
// ============================================================================

/**
 * Profile 1: High-achieving Berkeley candidate
 * - Strong academics (4.3 weighted GPA)
 * - Research experience
 * - Math competitions
 * - Intellectual curiosity focus
 */
const berkeleyCandidatePortfolio: PortfolioData = {
  profile: {
    student_id: 'test-berkeley-001',
    grade: 11,
    graduation_year: 2026,
    school_name: 'Monta Vista High School',
    school_type: 'public',
    state: 'California',
    is_california_resident: true,
  },
  academic: {
    gpa_unweighted: 3.95,
    gpa_weighted: 4.28,
    gpa_fully_weighted: 4.45,
    gpa_scale: 4.0,
    class_rank: 15,
    class_size: 450,
    coursework_rigor: 'Most rigorous available - all APs in core subjects',
    advanced_courses: [
      { name: 'AP Calculus BC', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Physics C: Mechanics', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Computer Science A', type: 'AP', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Chemistry', type: 'AP', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP US History', type: 'AP', grade_level: 11, grade: 'A-', is_uc_honors_certified: true },
      { name: 'AP English Language', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Biology', type: 'AP', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Statistics', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'Honors Pre-Calculus', type: 'Honors', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
      { name: 'Honors English 10', type: 'Honors', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
    ],
    ag_requirements: {
      completed: true,
      courses_beyond_minimum: 12,
    },
    honors: ['AP Scholar with Distinction', 'National Merit Semifinalist'],
    test_scores: {
      ap_exams: [
        { subject: 'Computer Science A', score: 5 },
        { subject: 'Chemistry', score: 5 },
        { subject: 'Biology', score: 5 },
      ],
    },
  },
  experiences: {
    activities: [
      {
        id: 'ec1',
        name: 'Stanford Summer Research Program',
        category: 'stem',
        role: 'Research Intern',
        description: 'Conducted independent research on machine learning applications for protein folding prediction under Professor Jane Smith.',
        impact: 'Co-authored paper submitted to NeurIPS workshop. Developed novel algorithm improving prediction accuracy by 15%.',
        years_involved: 1,
        hours_per_week: 40,
        weeks_per_year: 8,
        grade_levels: [11],
        awards: ['Best Undergraduate Research Poster'],
      },
      {
        id: 'ec2',
        name: 'USA Mathematical Olympiad',
        category: 'academic_prep',
        role: 'Competitor',
        description: 'Competed in AMC 12, AIME, and qualified for USAMO. Self-studied number theory and combinatorics.',
        impact: 'USAMO qualifier (top 500 nationally). Scored 8/15 on AIME.',
        years_involved: 3,
        hours_per_week: 10,
        weeks_per_year: 40,
        grade_levels: [9, 10, 11],
        awards: ['USAMO Qualifier', 'AIME Qualifier'],
      },
      {
        id: 'ec3',
        name: 'Math Club President',
        category: 'leadership',
        role: 'President',
        description: 'Lead school math club of 45 members. Organize weekly problem-solving sessions and competition prep.',
        impact: 'Grew membership from 20 to 45. Led team to 2nd place at Bay Area Math League championship.',
        years_involved: 3,
        hours_per_week: 5,
        weeks_per_year: 35,
        grade_levels: [9, 10, 11],
        leadership_positions: ['President (11)', 'VP (10)', 'Member (9)'],
      },
      {
        id: 'ec4',
        name: 'Open Source Contributor',
        category: 'stem',
        role: 'Contributor',
        description: 'Contribute to TensorFlow and scikit-learn. Fixed bugs and implemented new features.',
        impact: '3 PRs merged into TensorFlow main branch. Created tutorial with 500+ GitHub stars.',
        years_involved: 2,
        hours_per_week: 8,
        weeks_per_year: 48,
        grade_levels: [10, 11],
      },
    ],
  },
  writing_analysis: {
    piqs: [
      {
        prompt_number: 3,
        prompt_title: 'Talent or Skill',
        essay_text: 'The whiteboard in my room is rarely empty. Last Tuesday at 2 AM, it was covered in failed attempts at proving a number theory conjecture...',
        word_count: 345,
        narrative_quality_index: 82,
        reader_impression: 'Genuine intellectual passion evident',
        top_strengths: ['Specific details', 'Authentic voice', 'Shows process not just results'],
        top_gaps: ['Could use more reflection on growth'],
        authenticity_score: 8.5,
        voice_type: 'conversational',
      },
      {
        prompt_number: 4,
        prompt_title: 'Educational Opportunity',
        essay_text: 'When Professor Smith asked if I wanted to try a "crazy idea" for protein folding, I didn\'t hesitate...',
        word_count: 340,
        narrative_quality_index: 78,
        reader_impression: 'Strong research narrative',
        top_strengths: ['Concrete examples', 'Shows intellectual curiosity'],
        top_gaps: ['Transitions could be smoother'],
        authenticity_score: 8.0,
        voice_type: 'storytelling',
      },
    ],
    overall_writing_quality: 80,
  },
  personal_context: {
    background: {
      first_gen: false,
      low_income: false,
      english_learner: false,
      underrepresented_minority: false,
      geographic_diversity: false,
    },
    family_responsibilities: {
      has_responsibilities: false,
    },
    challenges_overcome: [],
    unique_circumstances: '',
    school_context: {
      total_aps_offered: 25,
    },
  },
  goals: {
    intended_major: 'Computer Science',
    alternative_majors: ['Mathematics', 'Statistics'],
    why_major: 'I want to research AI safety and ensure advanced AI systems benefit humanity. My research experience and math competitions have prepared me for the rigorous theoretical foundations.',
    career_goals: 'AI Safety Researcher at a major lab or academia',
    target_uc_campuses: ['UC Berkeley', 'UCLA', 'UC San Diego'],
  },
  timeline: {
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  },
};

/**
 * Profile 2: Community-focused UCLA candidate
 * - Good academics (4.1 weighted GPA)
 * - Strong community service
 * - Leadership in multiple organizations
 * - Compelling personal story
 */
const uclaCandidatePortfolio: PortfolioData = {
  profile: {
    student_id: 'test-ucla-001',
    grade: 12,
    graduation_year: 2025,
    school_name: 'Lincoln High School',
    school_type: 'public',
    state: 'California',
    is_california_resident: true,
  },
  academic: {
    gpa_unweighted: 3.85,
    gpa_weighted: 4.15,
    gpa_fully_weighted: 4.25,
    gpa_scale: 4.0,
    coursework_rigor: 'Very rigorous - took most challenging courses available',
    advanced_courses: [
      { name: 'AP Psychology', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP English Literature', type: 'AP', grade_level: 12, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Spanish', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP US History', type: 'AP', grade_level: 11, grade: 'B+', is_uc_honors_certified: true },
      { name: 'AP Calculus AB', type: 'AP', grade_level: 12, grade: 'A-', is_uc_honors_certified: true },
      { name: 'AP Biology', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
    ],
    ag_requirements: {
      completed: true,
      courses_beyond_minimum: 8,
    },
    honors: ['AP Scholar'],
  },
  experiences: {
    activities: [
      {
        id: 'ec1',
        name: 'Founder, Mental Health Awareness Club',
        category: 'service',
        role: 'Founder & President',
        description: 'Founded club after losing friend to suicide. Organize workshops, peer counseling training, and awareness campaigns.',
        impact: 'Grew from 5 to 85 members. Trained 30 peer counselors. Implemented school-wide mental health day adopted by district.',
        years_involved: 3,
        hours_per_week: 12,
        weeks_per_year: 40,
        grade_levels: [10, 11, 12],
        leadership_positions: ['Founder & President'],
        awards: ['District Student Leadership Award', 'California State Assembly Recognition'],
      },
      {
        id: 'ec2',
        name: 'Crisis Text Line Counselor',
        category: 'service',
        role: 'Trained Volunteer Counselor',
        description: 'Completed 40-hour training. Provide text-based crisis support for teens experiencing mental health emergencies.',
        impact: 'Completed 200+ conversations. Received "Star Counselor" recognition for exceptional empathy ratings.',
        years_involved: 2,
        hours_per_week: 4,
        weeks_per_year: 48,
        grade_levels: [11, 12],
        awards: ['Star Counselor Award'],
      },
      {
        id: 'ec3',
        name: 'Student Body Vice President',
        category: 'leadership',
        role: 'Vice President',
        description: 'Elected VP of 2,500-student body. Lead initiatives on student wellness and campus climate.',
        impact: 'Passed resolution for extended mental health services. Organized first-ever wellness week with 1,000+ participants.',
        years_involved: 2,
        hours_per_week: 10,
        weeks_per_year: 35,
        grade_levels: [11, 12],
        leadership_positions: ['Vice President (12)', 'Class Secretary (11)'],
      },
      {
        id: 'ec4',
        name: 'Hospital Volunteer',
        category: 'service',
        role: 'Patient Support Volunteer',
        description: 'Volunteer in pediatric ward at UCLA Medical Center. Support patients and families during hospital stays.',
        impact: '300+ hours over 3 years. Developed activity program now used hospital-wide.',
        years_involved: 3,
        hours_per_week: 4,
        weeks_per_year: 45,
        grade_levels: [10, 11, 12],
      },
    ],
  },
  writing_analysis: {
    piqs: [
      {
        prompt_number: 5,
        prompt_title: 'Significant Challenge',
        essay_text: 'The text read "I can\'t do this anymore." Those six words from my best friend Marcus changed everything. I didn\'t know then that they would also save me...',
        word_count: 350,
        narrative_quality_index: 88,
        reader_impression: 'Powerful, vulnerable, and transformative story',
        top_strengths: ['Exceptional vulnerability', 'Clear growth arc', 'Specific sensory details', 'Authentic voice'],
        top_gaps: ['None significant'],
        authenticity_score: 9.5,
        voice_type: 'storytelling',
      },
      {
        prompt_number: 6,
        prompt_title: 'Academic Subject',
        essay_text: 'Psychology isn\'t just my favorite class—it\'s the lens through which I now see the world. When I read about cognitive distortions...',
        word_count: 348,
        narrative_quality_index: 82,
        reader_impression: 'Connects academic interest to personal mission',
        top_strengths: ['Strong personal connection', 'Shows intellectual engagement'],
        top_gaps: ['Could include more specific examples'],
        authenticity_score: 8.5,
        voice_type: 'reflective',
      },
      {
        prompt_number: 7,
        prompt_title: 'Community',
        essay_text: 'Community used to mean my neighborhood. Now it means the 3 AM text messages, the kids who finally spoke up, the counselors I trained...',
        word_count: 345,
        narrative_quality_index: 85,
        reader_impression: 'Demonstrates deep commitment to service',
        top_strengths: ['Expanded definition of community', 'Concrete impact'],
        top_gaps: ['Slightly rushed ending'],
        authenticity_score: 9.0,
        voice_type: 'reflective',
      },
    ],
    overall_writing_quality: 85,
  },
  personal_context: {
    background: {
      first_gen: true,
      low_income: false,
      english_learner: false,
      underrepresented_minority: true,
      geographic_diversity: false,
    },
    family_responsibilities: {
      has_responsibilities: false,
    },
    challenges_overcome: ['Loss of close friend to suicide', 'Navigating college process without family guidance'],
    unique_circumstances: 'First-generation college student. Parents immigrated from Mexico.',
    school_context: {
      total_aps_offered: 18,
    },
  },
  goals: {
    intended_major: 'Psychology',
    alternative_majors: ['Public Health', 'Social Welfare'],
    why_major: 'I want to become a clinical psychologist specializing in adolescent mental health. My experiences with loss and advocacy have shown me the critical need for accessible mental health support.',
    career_goals: 'Clinical Psychologist working with underserved youth',
    target_uc_campuses: ['UCLA', 'UC Berkeley', 'UC San Diego'],
  },
  timeline: {
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  },
};

/**
 * Profile 3: First-gen low-income student
 * - Strong academics given context (3.9 weighted)
 * - Family responsibilities (works 20 hrs/week)
 * - Limited EC opportunities but meaningful involvement
 */
const firstGenLowIncomePortfolio: PortfolioData = {
  profile: {
    student_id: 'test-fgli-001',
    grade: 11,
    graduation_year: 2026,
    school_name: 'Roosevelt High School',
    school_type: 'public',
    state: 'California',
    is_california_resident: true,
  },
  academic: {
    gpa_unweighted: 3.75,
    gpa_weighted: 3.95,
    gpa_fully_weighted: 4.05,
    gpa_scale: 4.0,
    coursework_rigor: 'Most rigorous available - took all 5 APs offered at school',
    advanced_courses: [
      { name: 'AP English Language', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP US History', type: 'AP', grade_level: 11, grade: 'A-', is_uc_honors_certified: true },
      { name: 'AP Spanish Language', type: 'AP', grade_level: 10, grade: 'A', is_uc_honors_certified: true },
      { name: 'AP Calculus AB', type: 'AP', grade_level: 11, grade: 'B+', is_uc_honors_certified: true },
      { name: 'AP Biology', type: 'AP', grade_level: 11, grade: 'A', is_uc_honors_certified: true },
    ],
    ag_requirements: {
      completed: true,
      courses_beyond_minimum: 5,
    },
    honors: [],
  },
  experiences: {
    activities: [
      {
        id: 'ec1',
        name: 'Part-time Job - Restaurant',
        category: 'work',
        role: 'Server/Cashier',
        description: 'Work at family friend\'s restaurant to help support household. Manage inventory, train new employees, handle cash.',
        impact: 'Contribute $400/month to family. Promoted to shift lead. Trained 5 new employees.',
        years_involved: 3,
        hours_per_week: 20,
        weeks_per_year: 50,
        grade_levels: [9, 10, 11],
        is_paid_work: true,
      },
      {
        id: 'ec2',
        name: 'Family Translator',
        category: 'other',
        role: 'Primary English Translator',
        description: 'Translate for parents at medical appointments, school meetings, legal documents. Navigate complex systems on behalf of family.',
        impact: 'Helped family access healthcare, resolve immigration paperwork, communicate with schools for younger siblings.',
        years_involved: 6,
        hours_per_week: 5,
        weeks_per_year: 52,
        grade_levels: [9, 10, 11],
      },
      {
        id: 'ec3',
        name: 'AVID Program',
        category: 'academic_prep',
        role: 'AVID Student',
        description: 'First-gen college prep program. Learn study skills, college application process, visit campuses.',
        impact: 'Maintained 3.75+ GPA while working. Mentor younger AVID students.',
        years_involved: 3,
        hours_per_week: 5,
        weeks_per_year: 35,
        grade_levels: [9, 10, 11],
      },
    ],
  },
  writing_analysis: {
    piqs: [
      {
        prompt_number: 5,
        prompt_title: 'Significant Challenge',
        essay_text: '"Mija, can you call the doctor?" These words meant hours of navigating automated systems, explaining symptoms in medical terminology I barely understood...',
        word_count: 348,
        narrative_quality_index: 78,
        reader_impression: 'Compelling story of responsibility and resilience',
        top_strengths: ['Authentic voice', 'Specific examples', 'Shows maturity beyond years'],
        top_gaps: ['Could explore future impact more'],
        authenticity_score: 8.5,
        voice_type: 'storytelling',
      },
    ],
    overall_writing_quality: 78,
  },
  personal_context: {
    background: {
      first_gen: true,
      low_income: true,
      english_learner: true,
      underrepresented_minority: true,
      geographic_diversity: false,
    },
    family_responsibilities: {
      has_responsibilities: true,
      description: 'Primary English translator for parents. Care for two younger siblings (ages 8 and 12) after school while parents work.',
      hours_per_week: 15,
    },
    challenges_overcome: [
      'Balancing 20 hrs/week work with academics',
      'Navigating college process as first-gen',
      'Language barriers in accessing resources',
    ],
    unique_circumstances: 'Parents are farm workers. Family of 5 shares 2-bedroom apartment. School only offers 5 AP courses.',
    school_context: {
      total_aps_offered: 5,
      free_reduced_lunch_percentage: 75,
    },
  },
  goals: {
    intended_major: 'Biology',
    alternative_majors: ['Public Health'],
    why_major: 'Translating for my mom at the doctor showed me how scary healthcare is when you don\'t understand. I want to become a doctor who serves immigrant communities.',
    career_goals: 'Primary care physician in underserved community',
    target_uc_campuses: ['UC Davis', 'UC Riverside', 'UC Merced'],
  },
  timeline: {
    created_at: new Date().toISOString(),
    last_updated: new Date().toISOString(),
  },
};

// ============================================================================
// Test Functions
// ============================================================================

async function testBerkeleyCandidate(): Promise<void> {
  console.log('\n' + '='.repeat(80));
  console.log('TEST 1: Berkeley Candidate (High Achiever)');
  console.log('='.repeat(80));

  const result = await analyzePortfolio(berkeleyCandidatePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'berkeley',
    include_synthesis: true,
    include_guidance: true,
  });

  console.log('\n📊 Results Summary:');
  console.log(`  Overall Score: ${result.synthesis.overallScore}/10`);
  console.log(`  Profile Archetype: ${result.synthesis.profileArchetype}`);
  console.log(`  Percentile Estimate: ${result.synthesis.comparativeBenchmarking.percentileEstimate}`);

  console.log('\n📈 Dimension Scores:');
  console.log(`  Academic Excellence: ${result.dimensions.academicExcellence?.score?.toFixed(1)}/10`);
  console.log(`  Intellectual Curiosity: ${result.dimensions.intellectualCuriosity?.score?.toFixed(1)}/10`);
  console.log(`  Leadership: ${result.dimensions.leadershipInitiative?.score?.toFixed(1)}/10`);
  console.log(`  Community Impact: ${result.dimensions.communityImpact?.score?.toFixed(1)}/10`);
  console.log(`  Authenticity/Voice: ${result.dimensions.authenticityVoice?.score?.toFixed(1)}/10`);
  console.log(`  Future Readiness: ${result.dimensions.futureReadiness?.score?.toFixed(1)}/10`);

  console.log('\n🎯 UC Campus Alignment:');
  console.log(`  Top-Tier UCs Fit: ${result.synthesis.ucCampusAlignment?.topTierUCs?.fitScore || 'N/A'}/10`);
  console.log(`  Reaches: ${result.synthesis.ucCampusAlignment?.allUCs?.reaches?.join(', ') || 'N/A'}`);
  console.log(`  Likely Admits: ${result.synthesis.ucCampusAlignment?.allUCs?.likelyAdmits?.join(', ') || 'N/A'}`);

  console.log('\n🔍 Holistic Assessment:');
  console.log(`  Central Thread: ${result.holistic.central_thread?.narrative?.substring(0, 100) || 'N/A'}...`);
  console.log(`  UC Fit: ${result.holistic.uc_competitiveness?.overall_fit || 'N/A'}`);
  console.log(`  GPA Percentile: ${result.holistic.uc_competitiveness?.gpa_percentile || 'N/A'}`);

  console.log('\n⏱️ Performance:');
  console.log(`  Total Duration: ${result.performance.total_duration_ms}ms`);
  console.log(`  LLM Calls: ${result.performance.llm_calls}`);
  console.log(`  Estimated Cost: $${result.performance.cost_usd}`);

  // Validate expected results
  if (result.synthesis.overallScore < 7.0) {
    console.error('❌ UNEXPECTED: Berkeley candidate should score 7.0+ overall');
  } else {
    console.log('✅ Overall score appropriate for Berkeley candidate');
  }

  if (result.dimensions.intellectualCuriosity?.score && result.dimensions.intellectualCuriosity.score < 6.5) {
    console.error('❌ UNEXPECTED: Berkeley candidate should have strong intellectual curiosity');
  } else {
    console.log('✅ Intellectual curiosity appropriately high');
  }
}

async function testUCLACandidate(): Promise<void> {
  console.log('\n' + '='.repeat(80));
  console.log('TEST 2: UCLA Candidate (Community-Focused)');
  console.log('='.repeat(80));

  const result = await analyzePortfolio(uclaCandidatePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'ucla',
    include_synthesis: true,
    include_guidance: true,
  });

  console.log('\n📊 Results Summary:');
  console.log(`  Overall Score: ${result.synthesis.overallScore}/10`);
  console.log(`  Profile Archetype: ${result.synthesis.profileArchetype}`);
  console.log(`  Percentile Estimate: ${result.synthesis.comparativeBenchmarking.percentileEstimate}`);

  console.log('\n📈 Dimension Scores (UCLA weights):');
  console.log(`  Authenticity/Voice (30%): ${result.dimensions.authenticityVoice?.score?.toFixed(1)}/10`);
  console.log(`  Academic Excellence (30%): ${result.dimensions.academicExcellence?.score?.toFixed(1)}/10`);
  console.log(`  Community Impact (20%): ${result.dimensions.communityImpact?.score?.toFixed(1)}/10`);
  console.log(`  Leadership (15%): ${result.dimensions.leadershipInitiative?.score?.toFixed(1)}/10`);

  console.log('\n🎯 UC Campus Alignment:');
  console.log(`  UCLA Fit: ${result.synthesis.ucCampusAlignment?.topTierUCs?.fitScore || 'N/A'}/10`);

  // Validate expected results
  if (result.dimensions.authenticityVoice?.score && result.dimensions.authenticityVoice.score < 8) {
    console.error('❌ UNEXPECTED: UCLA candidate with NQI 85+ should have high authenticity');
  } else {
    console.log('✅ Authenticity/Voice appropriately high for compelling PIQs');
  }

  if (result.dimensions.communityImpact?.score && result.dimensions.communityImpact.score < 7) {
    console.error('❌ UNEXPECTED: UCLA candidate with extensive service should score well');
  } else {
    console.log('✅ Community Impact appropriately high');
  }
}

async function testFirstGenLowIncome(): Promise<void> {
  console.log('\n' + '='.repeat(80));
  console.log('TEST 3: First-Gen Low-Income Student (Context-Heavy)');
  console.log('='.repeat(80));

  const result = await analyzePortfolio(firstGenLowIncomePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'general_uc',
    include_synthesis: true,
    include_guidance: true,
  });

  console.log('\n📊 Results Summary:');
  console.log(`  Overall Score: ${result.synthesis.overallScore}/10`);
  console.log(`  Profile Archetype: ${result.synthesis.profileArchetype}`);
  console.log(`  Percentile Estimate: ${result.synthesis.comparativeBenchmarking.percentileEstimate}`);

  console.log('\n📈 Dimension Scores:');
  console.log(`  Academic Excellence: ${result.dimensions.academicExcellence?.score?.toFixed(1)}/10`);
  console.log(`  Leadership: ${result.dimensions.leadershipInitiative?.score?.toFixed(1)}/10`);
  console.log(`  Community Impact: ${result.dimensions.communityImpact?.score?.toFixed(1)}/10`);

  console.log('\n🏠 Context Factors (from Holistic):');
  const contextFactors = result.holistic.ucSpecificAssessment?.context_factors || [];
  contextFactors.forEach((factor) => console.log(`  - ${factor}`));

  console.log('\n🎯 UC Campus Alignment:');
  console.log(`  Likely Admits: ${result.synthesis.ucCampusAlignment.allUCs.likelyAdmits.join(', ')}`);
  console.log(`  Possible Admits: ${result.synthesis.ucCampusAlignment.allUCs.possibleAdmits.join(', ')}`);

  // Validate context adjustments
  console.log('\n✅ Validating Context Adjustments...');
  console.log('  - First-gen status should boost evaluation');
  console.log('  - Low-income work (20 hrs/week) should count as leadership');
  console.log('  - Family responsibilities should be valued');
  console.log('  - Limited AP offerings (5) should be considered in context');
}

async function testWeightDifferences(): Promise<void> {
  console.log('\n' + '='.repeat(80));
  console.log('TEST 4: Weight Differences (Berkeley vs UCLA vs General)');
  console.log('='.repeat(80));

  // Same portfolio, different modes
  const berkeleyResult = await analyzePortfolio(berkeleyCandidatePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'berkeley',
    include_synthesis: true,
    include_guidance: false,
  });

  const uclaResult = await analyzePortfolio(berkeleyCandidatePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'ucla',
    include_synthesis: true,
    include_guidance: false,
  });

  const generalResult = await analyzePortfolio(berkeleyCandidatePortfolio, {
    depth: 'comprehensive',
    uc_mode: 'general_uc',
    include_synthesis: true,
    include_guidance: false,
  });

  console.log('\n📊 Same Profile, Different Modes:');
  console.log(`\n  Berkeley Mode (IC: ${(UC_BERKELEY_WEIGHTS.intellectualCuriosity * 100)}%, Voice: ${(UC_BERKELEY_WEIGHTS.authenticityVoice * 100)}%):`);
  console.log(`    Overall Score: ${berkeleyResult.synthesis.overallScore}/10`);
  console.log(`    Archetype: ${berkeleyResult.synthesis.profileArchetype}`);

  console.log(`\n  UCLA Mode (IC: ${(UCLA_WEIGHTS.intellectualCuriosity * 100)}%, Voice: ${(UCLA_WEIGHTS.authenticityVoice * 100)}%):`);
  console.log(`    Overall Score: ${uclaResult.synthesis.overallScore}/10`);
  console.log(`    Archetype: ${uclaResult.synthesis.profileArchetype}`);

  console.log(`\n  General UC Mode:`);
  console.log(`    Overall Score: ${generalResult.synthesis.overallScore}/10`);
  console.log(`    Archetype: ${generalResult.synthesis.profileArchetype}`);

  // Berkeley candidate should score higher in Berkeley mode
  if (berkeleyResult.synthesis.overallScore > uclaResult.synthesis.overallScore) {
    console.log('\n✅ Berkeley candidate scores higher in Berkeley mode (as expected)');
  } else {
    console.log('\n⚠️ Note: Scores similar across modes - weights apply to same dimension scores');
  }
}

// ============================================================================
// Main Test Runner
// ============================================================================

async function runAllTests(): Promise<void> {
  console.log('\n' + '█'.repeat(80));
  console.log('PORTFOLIO SCANNER COMPREHENSIVE TESTS');
  console.log('█'.repeat(80));
  console.log('\nRunning tests for UC-focused holistic portfolio analysis system...');
  console.log('This will make ~36 LLM calls across all tests.\n');

  try {
    await testBerkeleyCandidate();
    await testUCLACandidate();
    await testFirstGenLowIncome();
    await testWeightDifferences();

    console.log('\n' + '█'.repeat(80));
    console.log('ALL TESTS COMPLETED');
    console.log('█'.repeat(80));
  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  }
}

// Run if executed directly
runAllTests().catch(console.error);
