/**
 * Strategic Constraints Analysis - Comprehensive Test Suite
 *
 * Tests Stage 5 Strategic Constraints Analyzer for:
 * 1. Word efficiency analysis (bloat detection, compression)
 * 2. Strategic balance (imagery vs depth vs achievements vs insights)
 * 3. Topic viability (substantiveness, academic potential)
 * 4. Workshop item enhancement (word delta, implementability)
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// TEST CASES
// ============================================================================

/**
 * Test Case 1: Flowery, Word-Inefficient Essay (300+ words)
 * Expected: Low efficiency score, compression recommendations, many bloat areas
 */
const FLOWERY_ESSAY = {
  text: `As I stood there in the absolutely magnificent laboratory, surrounded by the truly incredible equipment that sparkled magnificently under the bright fluorescent lights, I felt a deep, profound sense of wonder and amazement wash over me like a gentle wave on a pristine beach. The experience was nothing short of extraordinary.

I had always been incredibly passionate about science, ever since I was a young child. I remember very clearly the first time I looked through a microscope and saw the amazing, beautiful cells dancing before my very eyes. It was truly a transformative moment that changed my life forever.

Throughout my time working in the laboratory, I learned so many valuable lessons and discovered countless new things about myself and the world around me. I realized and understood that science isn't just about facts and figures, but rather about asking deep questions and seeking meaningful answers to life's mysteries.

Furthermore, I also came to understand and appreciate that working with my team members and collaborating together with them was absolutely essential to our collective success. We worked diligently and tirelessly together, supporting each other through challenges and celebrating our achievements, both big and small.

Looking back on this incredible journey, I can honestly say that this experience has profoundly shaped who I am today. It taught me invaluable lessons about perseverance, dedication, and the importance of never giving up on your dreams, no matter how difficult the path may seem.`,
  wordCount: 250,
  prompt: 'Describe an experience where you demonstrated leadership.',
  workshopItems: [
    {
      section: 'Opening',
      issue: 'Too many flowery adjectives',
      severity: 'high',
      rationale: 'Reduces clarity and eats word budget',
      suggestions: {
        polished_original: {
          text: 'In the laboratory, surrounded by equipment that sparkled under fluorescent lights, I felt a profound sense of wonder.',
          why: 'Removes excessive adjectives while preserving core meaning'
        },
        voice_amplifier: {
          text: 'The lab\'s gleaming equipment caught the light. I felt wonder—the kind that makes you forget time.',
          why: 'More concise, maintains emotional impact'
        },
        divergent_strategy: {
          text: 'Cell cultures lined the bench. Three months of failed experiments behind me. One more try.',
          why: 'Cuts to action, shows stakes'
        }
      }
    }
  ]
};

/**
 * Test Case 2: Over-Storytelling Essay (Heavy Imagery, Light on Achievements)
 * Expected: High imagery density, low achievement presence, "increase_achievements" recommendation
 */
const OVERLY_NARRATIVE_ESSAY = {
  text: `The sunset painted the basketball court in shades of amber and gold. Sweat dripped down my forehead, each drop catching the fading light like a tiny prism. The ball felt rough under my fingertips, its leather surface warm from hours in the sun.

I could hear my heartbeat in my ears, a steady rhythm that matched the bounce of the ball. The chain net clinked softly in the evening breeze, a sound I'd come to love over countless afternoons just like this one.

As I stood at the free throw line, I closed my eyes and felt the rough concrete beneath my worn sneakers. The smell of cut grass wafted from the nearby field, mixing with the scent of pine from the surrounding trees. Time seemed to slow down.

I thought about all the hours I'd spent here, alone with my thoughts and the ball. The court had become my sanctuary, a place where I could escape the noise of daily life and find peace in the simple act of shooting hoops.`,
  wordCount: 180,
  prompt: 'Tell us about a talent or skill you have developed.',
  workshopItems: [
    {
      section: 'Body',
      issue: 'Missing concrete achievements',
      severity: 'critical',
      rationale: 'Too much description, not enough substance',
      suggestions: {
        polished_original: {
          text: 'Through dedicated practice, I improved my free throw percentage from 45% to 87% over two years.',
          why: 'Adds measurable achievement'
        },
        voice_amplifier: {
          text: 'The court became my laboratory. Variables: arc angle, wrist snap, follow-through. Result: 87% accuracy.',
          why: 'Intellectual framing + concrete metrics'
        },
        divergent_strategy: {
          text: 'I filmed each shot, analyzed the physics, built a training program. Taught 12 teammates who raised their average 23%.',
          why: 'Shows initiative, leadership, impact'
        }
      }
    }
  ]
};

/**
 * Test Case 3: Shallow Topic Essay
 * Expected: Low substantiveness score, "weak" or "reconsider" verdict, alternative angles suggested
 */
const SHALLOW_TOPIC_ESSAY = {
  text: `I really enjoy playing video games in my free time. They're fun and relaxing, and I've been playing them since I was little. My favorite games are adventure games where you explore different worlds and complete quests.

Last summer, I played a new game that came out and I really liked it. The graphics were amazing and the story was interesting. I spent many hours playing it with my friends online, and we had a great time together.

Playing video games has taught me about teamwork because you have to work with other players to win. It's also taught me problem-solving skills because some of the puzzles are really hard and you have to think creatively to solve them.

I think video games are a good hobby and they've made me better at thinking quickly and working with others.`,
  wordCount: 145,
  prompt: 'What would you say is your greatest talent or skill?',
  workshopItems: []
};

/**
 * Test Case 4: Well-Balanced Essay (Control)
 * Expected: Balanced recommendation, adequate topic viability, good efficiency
 */
const BALANCED_ESSAY = {
  text: `"Can you prove it works?" Dr. Chen's question hung in the air. Three months of coding, and I had no empirical data.

I'd built an algorithm to predict protein folding patterns—theoretically sound, practically untested. My team at the biotech lab had relied on my confidence, but science demands evidence, not enthusiasm.

That night, I redesigned the testing framework. Instead of simulating ideal conditions, I fed it messy real-world data: incomplete sequences, contaminated samples, the chaos of actual research. The algorithm failed spectacularly. But in each failure, I saw the pattern of my assumptions.

Two weeks later, I presented again. "It works on 73% of novel proteins," I said, showing the validation data. "The other 27% revealed three structural families we hadn't considered." Dr. Chen nodded. My algorithm made it into the lab's standard toolkit.

I learned that intellectual honesty beats intellectual pride. The best leaders admit what they don't know, then build systems to find out.`,
  wordCount: 165,
  prompt: 'Describe a time you demonstrated leadership.',
  workshopItems: [
    {
      section: 'Reflection',
      issue: 'Could deepen the intellectual insight',
      severity: 'medium',
      rationale: 'Good foundation, could be more sophisticated',
      suggestions: {
        polished_original: {
          text: 'I learned that intellectual honesty beats intellectual pride. The best leaders create environments where failure illuminates truth.',
          why: 'Slightly more sophisticated framing'
        },
        voice_amplifier: {
          text: 'Failure became data. My pride became curiosity. Leadership, I realized, is the courage to be proven wrong.',
          why: 'More distinctive voice'
        },
        divergent_strategy: {
          text: 'Now I seek the 27%. Where my models break is where understanding begins.',
          why: 'Unexpected angle on learning'
        }
      }
    }
  ]
};

/**
 * Test Case 5: Near Word Limit Essay (330+ words)
 * Expected: Very low available budget, prioritize compression, flag expanding suggestions
 */
const NEAR_LIMIT_ESSAY = {
  text: `The emergency room at 3 AM taught me more about leadership than any textbook ever could. As a volunteer coordinator for the teen health initiative, I wasn't supposed to be making decisions about patient flow or resource allocation, but on that understaffed night shift, someone had to step up, and I did.

When the ambulance arrived with three critical patients simultaneously, the lone triage nurse looked at me with exhausted eyes and said, "I need you to make some judgment calls." I'd shadowed her for months, absorbing protocols and decision trees, but this was different. This was real.

I prioritized based on what I'd learned: airways, breathing, circulation. I directed the first patient to trauma bay one, called for the attending physician for the second, and kept the third stable while we waited. My hands shook, but my voice stayed steady. The patients survived. The nurse later told me I'd made the right calls.

That night crystallized something I'd been learning gradually: leadership isn't about having all the answers or the most impressive title. It's about taking responsibility when it matters most, trusting your training while staying humble enough to recognize the limits of your knowledge, and understanding that sometimes the best leadership means empowering others rather than trying to do everything yourself.

The experience transformed how I approached my coordinator role. I started training junior volunteers more seriously, creating decision frameworks for common scenarios, and building systems that didn't depend on any single person having all the expertise. I realized that sustainable leadership means making yourself replaceable by making everyone around you more capable.

Six months later, we had 15 trained volunteers who could handle triage support. I'd built something bigger than myself, and that felt more meaningful than any individual heroic moment ever could.`,
  wordCount: 330,
  prompt: 'Describe a time you demonstrated leadership.',
  workshopItems: [
    {
      section: 'Reflection',
      issue: 'Slightly wordy conclusion',
      severity: 'low',
      rationale: 'Good content, could be tightened',
      suggestions: {
        polished_original: {
          text: 'The experience transformed my coordinator role. I trained 15 volunteers in triage support, building systems that made everyone more capable.',
          why: 'More concise while preserving key points'
        },
        voice_amplifier: {
          text: 'I built systems to replace me. Fifteen volunteers later, the program ran without heroics. That was the point.',
          why: 'Sharper, more distinctive voice'
        },
        divergent_strategy: {
          text: 'True leadership: making yourself obsolete. I trained my replacements, then trained theirs.',
          why: 'Paradoxical insight, memorable'
        }
      }
    }
  ]
};

// ============================================================================
// TEST EXECUTION
// ============================================================================

async function runTest(testName: string, essayData: any, expectedOutcomes: any) {
  console.log('\n' + '='.repeat(80));
  console.log(`TEST: ${testName}`);
  console.log('='.repeat(80));

  try {
    const startTime = Date.now();

    // Prepare mock analysis data
    const mockAnalysis = {
      essayText: essayData.text,
      currentWordCount: essayData.wordCount,
      targetWordCount: 350,
      promptText: essayData.prompt,
      promptTitle: essayData.prompt,
      workshopItems: essayData.workshopItems,
      rubricDimensionDetails: [],
      voiceFingerprint: {},
      experienceFingerprint: {},
      analysis: {
        narrative_quality_index: 70,
        overall_strengths: [],
        overall_weaknesses: []
      }
    };

    console.log(`📤 Calling strategic-constraints edge function...`);
    console.log(`   Essay length: ${essayData.wordCount} words`);
    console.log(`   Workshop items: ${essayData.workshopItems.length}`);

    const { data, error } = await supabase.functions.invoke('strategic-constraints', {
      body: mockAnalysis
    });

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    if (error) {
      console.error(`❌ Test failed with error (${duration}s):`, error);
      return false;
    }

    if (!data || !data.success) {
      console.error(`❌ Test failed with unsuccessful result (${duration}s):`, data?.error);
      return false;
    }

    console.log(`✅ Strategic analysis complete in ${duration}s`);
    console.log('');

    // Verify expected outcomes
    let allPassed = true;

    console.log('📊 VERIFICATION RESULTS:');
    console.log('');

    // 1. Word Count Analysis
    console.log('1️⃣  WORD COUNT ANALYSIS:');
    console.log(`   Efficiency Score: ${data.wordCountAnalysis.efficiency_score}/10`);
    console.log(`   Available Budget: ${data.wordCountAnalysis.available_budget} words`);
    console.log(`   Bloat Areas: ${data.wordCountAnalysis.bloat_areas.length}`);
    console.log(`   Compression Opportunities: ${data.wordCountAnalysis.compression_opportunities.length}`);

    if (expectedOutcomes.efficiencyScore) {
      const effMatch = Math.abs(data.wordCountAnalysis.efficiency_score - expectedOutcomes.efficiencyScore) <= 2;
      console.log(`   ${effMatch ? '✅' : '❌'} Efficiency score ${effMatch ? 'matches' : 'does not match'} expected (~${expectedOutcomes.efficiencyScore})`);
      allPassed = allPassed && effMatch;
    }

    if (expectedOutcomes.minBloatAreas) {
      const bloatMatch = data.wordCountAnalysis.bloat_areas.length >= expectedOutcomes.minBloatAreas;
      console.log(`   ${bloatMatch ? '✅' : '❌'} Bloat areas ${bloatMatch ? 'sufficient' : 'insufficient'} (expected ≥${expectedOutcomes.minBloatAreas})`);
      allPassed = allPassed && bloatMatch;
    }

    console.log('');

    // 2. Strategic Balance
    console.log('2️⃣  STRATEGIC BALANCE:');
    console.log(`   Imagery Density: ${data.strategicBalance.imagery_density}/10`);
    console.log(`   Intellectual Depth: ${data.strategicBalance.intellectual_depth}/10`);
    console.log(`   Achievement Presence: ${data.strategicBalance.achievement_presence}/10`);
    console.log(`   Insight Quality: ${data.strategicBalance.insight_quality}/10`);
    console.log(`   Recommendation: ${data.strategicBalance.recommendation}`);
    console.log(`   Imbalance Severity: ${data.strategicBalance.imbalance_severity}`);

    if (expectedOutcomes.balanceRecommendation) {
      const balanceMatch = data.strategicBalance.recommendation === expectedOutcomes.balanceRecommendation;
      console.log(`   ${balanceMatch ? '✅' : '❌'} Balance recommendation ${balanceMatch ? 'matches' : 'does not match'} expected (${expectedOutcomes.balanceRecommendation})`);
      allPassed = allPassed && balanceMatch;
    }

    console.log('');

    // 3. Topic Viability
    console.log('3️⃣  TOPIC VIABILITY:');
    console.log(`   Substantiveness: ${data.topicViability.substantiveness_score}/10`);
    console.log(`   Academic Potential: ${data.topicViability.academic_potential_score}/10`);
    console.log(`   Differentiation: ${data.topicViability.differentiation_score}/10`);
    console.log(`   Verdict: ${data.topicViability.verdict}`);
    console.log(`   Concerns: ${data.topicViability.concerns.length}`);
    console.log(`   Alternative Angles: ${data.topicViability.alternative_angles.length}`);

    if (expectedOutcomes.topicVerdict) {
      const verdictMatch = data.topicViability.verdict === expectedOutcomes.topicVerdict;
      console.log(`   ${verdictMatch ? '✅' : '❌'} Topic verdict ${verdictMatch ? 'matches' : 'does not match'} expected (${expectedOutcomes.topicVerdict})`);
      allPassed = allPassed && verdictMatch;
    }

    console.log('');

    // 4. Enhanced Workshop Items
    console.log('4️⃣  ENHANCED WORKSHOP ITEMS:');
    console.log(`   Items Enhanced: ${data.enhancedWorkshopItems.length}`);

    if (data.enhancedWorkshopItems.length > 0) {
      const item = data.enhancedWorkshopItems[0];
      console.log(`   Sample Item:`);
      console.log(`     - Word Delta: ${item.efficiency_assessment.word_delta}`);
      console.log(`     - Rating: ${item.efficiency_assessment.efficiency_rating}`);
      console.log(`     - Implementable: ${item.efficiency_assessment.implementable_with_budget}`);
      console.log(`     - Adds Depth: ${item.strategic_value.adds_depth}`);
      console.log(`     - Priority Adjustment: ${item.strategic_value.priority_adjustment}`);
    }

    console.log('');

    // 5. Strategic Recommendations
    console.log('5️⃣  STRATEGIC RECOMMENDATIONS:');
    console.log(`   Total Recommendations: ${data.strategicRecommendations.length}`);

    if (expectedOutcomes.minRecommendations) {
      const recMatch = data.strategicRecommendations.length >= expectedOutcomes.minRecommendations;
      console.log(`   ${recMatch ? '✅' : '❌'} Recommendation count ${recMatch ? 'sufficient' : 'insufficient'} (expected ≥${expectedOutcomes.minRecommendations})`);
      allPassed = allPassed && recMatch;
    }

    if (data.strategicRecommendations.length > 0) {
      console.log(`   Top Recommendations:`);
      data.strategicRecommendations.slice(0, 3).forEach((rec, idx) => {
        console.log(`     ${idx + 1}. [${rec.priority}] ${rec.type}: ${rec.title}`);
      });
    }

    console.log('');
    console.log('='.repeat(80));
    console.log(`RESULT: ${allPassed ? '✅ PASS' : '❌ FAIL'}`);
    console.log('='.repeat(80));

    return allPassed;

  } catch (error) {
    console.error('❌ Test exception:', error);
    return false;
  }
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

async function runAllTests() {
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║         STRATEGIC CONSTRAINTS ANALYSIS - COMPREHENSIVE TEST SUITE        ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝');

  const results = [];

  // Test 1: Flowery Essay
  results.push(await runTest(
    'Test 1: Flowery, Word-Inefficient Essay',
    FLOWERY_ESSAY,
    {
      efficiencyScore: 4, // Low efficiency (target 3-5)
      minBloatAreas: 2,
      balanceRecommendation: null, // Don't care for this test
      topicVerdict: null,
      minRecommendations: 2
    }
  ));

  // Test 2: Over-Storytelling
  results.push(await runTest(
    'Test 2: Over-Storytelling Essay (Heavy Imagery, Light Achievements)',
    OVERLY_NARRATIVE_ESSAY,
    {
      efficiencyScore: null,
      minBloatAreas: null,
      balanceRecommendation: 'increase_achievements', // Key expectation
      topicVerdict: null,
      minRecommendations: 1
    }
  ));

  // Test 3: Shallow Topic
  results.push(await runTest(
    'Test 3: Shallow Topic Essay',
    SHALLOW_TOPIC_ESSAY,
    {
      efficiencyScore: null,
      minBloatAreas: null,
      balanceRecommendation: null,
      topicVerdict: 'weak', // Key expectation (weak or reconsider)
      minRecommendations: 1
    }
  ));

  // Test 4: Balanced Essay
  results.push(await runTest(
    'Test 4: Well-Balanced Essay (Control)',
    BALANCED_ESSAY,
    {
      efficiencyScore: 7, // Good efficiency (target 6-8)
      minBloatAreas: null,
      balanceRecommendation: 'balanced', // Key expectation
      topicVerdict: 'adequate', // Key expectation (adequate or strong)
      minRecommendations: 1
    }
  ));

  // Test 5: Near Word Limit
  results.push(await runTest(
    'Test 5: Near Word Limit Essay (330+ words)',
    NEAR_LIMIT_ESSAY,
    {
      efficiencyScore: null,
      minBloatAreas: null,
      balanceRecommendation: null,
      topicVerdict: null,
      minRecommendations: 2 // Should prioritize compression recommendations
    }
  ));

  // Summary
  console.log('\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════╗');
  console.log('║                            TEST SUMMARY                                   ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════╝');
  console.log('');

  const passCount = results.filter(r => r).length;
  const totalCount = results.length;

  results.forEach((passed, idx) => {
    console.log(`Test ${idx + 1}: ${passed ? '✅ PASS' : '❌ FAIL'}`);
  });

  console.log('');
  console.log(`Results: ${passCount}/${totalCount} tests passed`);
  console.log('');

  if (passCount === totalCount) {
    console.log('🎉 ALL TESTS PASSED! Strategic Constraints Analyzer is production-ready.');
  } else {
    console.log('⚠️  Some tests failed. Review output above for details.');
  }

  console.log('');
}

// Run tests
runAllTests().catch(console.error);
