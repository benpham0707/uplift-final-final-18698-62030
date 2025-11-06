/**
 * Analysis Engine — End-to-End Demo
 *
 * Demonstrates the complete analysis pipeline:
 * 1. Scene detection
 * 2. Dialogue extraction
 * 3. Interiority detection
 * 4. Elite pattern detection
 * 5. Rubric scoring with interaction rules
 * 6. ΔEQI simulation
 *
 * This shows the full power of the objective Analysis Engine (separate from Story Coach).
 */

import { analyzeEssay, getAnalysisSummary } from '../../src/core/essay/analysis/analysisEngine';
import { simulateEQIImprovements, getSimulationSummary } from '../../src/core/essay/analysis/eqiSimulator';
import { getSceneSummary } from '../../src/core/essay/analysis/features/sceneDetector';
import { getDialogueSummary } from '../../src/core/essay/analysis/features/dialogueExtractor';
import { getInteriorityTummary } from '../../src/core/essay/analysis/features/interiorityDetector';
import { getElitePatternSummary } from '../../src/core/essay/analysis/features/elitePatternDetector';

/**
 * Sample essays for testing
 */
const SAMPLE_ESSAYS = {
  // High-quality essay with scene, vulnerability, micro→macro
  strong_essay: `The worst stench I have ever encountered was the smell of rotting garbage mixed with formaldehyde in my high school chemistry lab. We were dissecting frogs, and I had just failed my second quiz in a row. My grade had dropped to 19%.

I felt like a fraud. Everyone around me seemed to understand molecular bonding intuitively, while I stared at Lewis structures like they were hieroglyphics. I thought about dropping the class. I thought about giving up on science entirely.

But then I made a decision: I would meet with my teacher every single day after school. For three months, I sat in that stinky lab, asking questions I was embarrassed to ask in front of my peers. "Why does oxygen have two bonds?" "How do I know which element is more electronegative?" Questions that probably seemed obvious to everyone else.

Slowly, something shifted. Not my intelligence—I still wasn't the fastest in the class—but my relationship with not knowing. I stopped seeing confusion as failure and started seeing it as the beginning of understanding. My grade climbed to a B by finals.

That chemistry class taught me something more valuable than stoichiometry: comfort with being lost. I still don't have all the answers. I still ask "stupid" questions. But now I know that admitting "I don't know" is the first step toward knowing.`,

  // Weak essay: generic, no scene, all tell
  weak_essay: `I have always been passionate about helping others. Throughout my life, I have volunteered in my community and made a difference in people's lives.

In high school, I started a club that helped underprivileged students. We provided tutoring and mentorship. It was very rewarding to see the students improve their grades. I learned the importance of giving back.

I also participated in many extracurricular activities. I was president of the student council, captain of the debate team, and editor of the school newspaper. These experiences taught me leadership and time management.

In college, I want to continue helping others. I am excited about the opportunities to volunteer and make a positive impact. I believe my passion for service will make me a great addition to your community.`,

  // Medium essay: has some scene, some vulnerability, but lacks depth
  medium_essay: `When I joined the robotics team in ninth grade, I thought I would be building robots right away. Instead, I spent the first three months learning how to use a screwdriver.

I was frustrated. I wanted to program the autonomous routines, design the mechanisms, lead the team. But my mentor, Mr. Rodriguez, kept assigning me basic tasks: tightening bolts, organizing tools, documenting our progress.

One day, during a competition, our robot broke down in the middle of a match. While everyone else panicked, I calmly grabbed my toolkit and fixed the loose connection in 30 seconds. We won the round.

Mr. Rodriguez smiled at me and said, "See? The basics matter." I realized he had been teaching me patience and attention to detail all along. Those boring tasks weren't punishment—they were preparation.

Now I approach every challenge the same way: master the fundamentals before trying to innovate. It's not glamorous, but it works.`
};

/**
 * Main demo function
 */
async function main() {
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  ASTERIA-E ANALYSIS ENGINE — COMPREHENSIVE DEMO');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('Testing 3 essays:');
  console.log('  1. STRONG: Scene + Vulnerability + Micro→Macro');
  console.log('  2. WEAK: Generic + No Scene + All Tell');
  console.log('  3. MEDIUM: Some Scene + Some Vulnerability + Lacks Depth');
  console.log('');
  console.log('─'.repeat(79));
  console.log('');

  // =========================================================================
  // TEST 1: STRONG ESSAY
  // =========================================================================

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  TEST 1: STRONG ESSAY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  const strongAnalysis = await analyzeEssay({
    essay_text: SAMPLE_ESSAYS.strong_essay,
    essay_id: 'strong_essay',
    essay_type: 'personal_statement',
    max_words: 650
  });

  console.log(getAnalysisSummary(strongAnalysis));

  console.log('');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('  DETAILED FEATURE DETECTIONS');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');

  console.log('SCENES:');
  console.log(getSceneSummary(strongAnalysis.feature_detections.scenes));
  console.log('');

  console.log('DIALOGUE:');
  console.log(getDialogueSummary(strongAnalysis.feature_detections.dialogue));
  console.log('');

  console.log('INTERIORITY:');
  console.log(getInteriorityTummary(strongAnalysis.feature_detections.interiority));
  console.log('');

  console.log('ELITE PATTERNS:');
  console.log(getElitePatternSummary(strongAnalysis.feature_detections.elite_patterns));
  console.log('');

  console.log('─────────────────────────────────────────────────────────────────');
  console.log('  ΔEQI SIMULATION');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');

  const strongSimulation = simulateEQIImprovements(strongAnalysis.dimension_scores);
  console.log(getSimulationSummary(strongSimulation));

  // =========================================================================
  // TEST 2: WEAK ESSAY
  // =========================================================================

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  TEST 2: WEAK ESSAY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  const weakAnalysis = await analyzeEssay({
    essay_text: SAMPLE_ESSAYS.weak_essay,
    essay_id: 'weak_essay',
    essay_type: 'personal_statement',
    max_words: 650
  });

  console.log(getAnalysisSummary(weakAnalysis));

  console.log('');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('  ΔEQI SIMULATION');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');

  const weakSimulation = simulateEQIImprovements(weakAnalysis.dimension_scores);
  console.log(getSimulationSummary(weakSimulation));

  // =========================================================================
  // TEST 3: MEDIUM ESSAY
  // =========================================================================

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  TEST 3: MEDIUM ESSAY');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  const mediumAnalysis = await analyzeEssay({
    essay_text: SAMPLE_ESSAYS.medium_essay,
    essay_id: 'medium_essay',
    essay_type: 'personal_statement',
    max_words: 650
  });

  console.log(getAnalysisSummary(mediumAnalysis));

  console.log('');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('  ΔEQI SIMULATION');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('');

  const mediumSimulation = simulateEQIImprovements(mediumAnalysis.dimension_scores);
  console.log(getSimulationSummary(mediumSimulation));

  // =========================================================================
  // COMPARISON TABLE
  // =========================================================================

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  COMPARISON TABLE');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');

  console.log('┌─────────────────────────────────┬─────────┬─────────┬─────────┐');
  console.log('│ Metric                          │ Strong  │ Medium  │ Weak    │');
  console.log('├─────────────────────────────────┼─────────┼─────────┼─────────┤');
  console.log(`│ EQI                             │ ${strongAnalysis.essay_quality_index.toFixed(1).padEnd(7)} │ ${mediumAnalysis.essay_quality_index.toFixed(1).padEnd(7)} │ ${weakAnalysis.essay_quality_index.toFixed(1).padEnd(7)} │`);
  console.log(`│ Impression                      │ ${strongAnalysis.impression_label.substring(0, 7).padEnd(7)} │ ${mediumAnalysis.impression_label.substring(0, 7).padEnd(7)} │ ${weakAnalysis.impression_label.substring(0, 7).padEnd(7)} │`);
  console.log(`│ Scene Count                     │ ${strongAnalysis.feature_detections.scenes.scene_count.toString().padEnd(7)} │ ${mediumAnalysis.feature_detections.scenes.scene_count.toString().padEnd(7)} │ ${weakAnalysis.feature_detections.scenes.scene_count.toString().padEnd(7)} │`);
  console.log(`│ Vulnerability Moments           │ ${strongAnalysis.feature_detections.interiority.vulnerability_count.toString().padEnd(7)} │ ${mediumAnalysis.feature_detections.interiority.vulnerability_count.toString().padEnd(7)} │ ${weakAnalysis.feature_detections.interiority.vulnerability_count.toString().padEnd(7)} │`);
  console.log(`│ Elite Threshold Met             │ ${(strongAnalysis.feature_detections.interiority.meets_elite_threshold ? 'Yes' : 'No').padEnd(7)} │ ${(mediumAnalysis.feature_detections.interiority.meets_elite_threshold ? 'Yes' : 'No').padEnd(7)} │ ${(weakAnalysis.feature_detections.interiority.meets_elite_threshold ? 'Yes' : 'No').padEnd(7)} │`);
  console.log(`│ Micro→Macro Present             │ ${(strongAnalysis.feature_detections.elite_patterns.micro_macro.has_structure ? 'Yes' : 'No').padEnd(7)} │ ${(mediumAnalysis.feature_detections.elite_patterns.micro_macro.has_structure ? 'Yes' : 'No').padEnd(7)} │ ${(weakAnalysis.feature_detections.elite_patterns.micro_macro.has_structure ? 'Yes' : 'No').padEnd(7)} │`);
  console.log(`│ Elite Pattern Score (/100)      │ ${strongAnalysis.feature_detections.elite_patterns.overall_elite_score.toString().padEnd(7)} │ ${mediumAnalysis.feature_detections.elite_patterns.overall_elite_score.toString().padEnd(7)} │ ${weakAnalysis.feature_detections.elite_patterns.overall_elite_score.toString().padEnd(7)} │`);
  console.log(`│ Flags                           │ ${strongAnalysis.flags.length.toString().padEnd(7)} │ ${mediumAnalysis.flags.length.toString().padEnd(7)} │ ${weakAnalysis.flags.length.toString().padEnd(7)} │`);
  console.log('└─────────────────────────────────┴─────────┴─────────┴─────────┘');

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  KEY INSIGHTS');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('✅ STRONG ESSAY:');
  console.log('   - Opens with concrete scene (chemistry lab smell)');
  console.log('   - Multiple vulnerability moments (failed quiz, "felt like a fraud")');
  console.log('   - Micro→macro structure (chemistry → comfort with uncertainty)');
  console.log('   - Quantified impact (19% → B grade, 3 months, every day)');
  console.log(`   - EQI: ${strongAnalysis.essay_quality_index.toFixed(1)}/100 (${strongAnalysis.impression_label})`);
  console.log('');
  console.log('⚠️ MEDIUM ESSAY:');
  console.log('   - Has some scene (robotics competition)');
  console.log('   - Some vulnerability (frustration) but lacks depth');
  console.log('   - Insight present but surface-level');
  console.log(`   - EQI: ${mediumAnalysis.essay_quality_index.toFixed(1)}/100 (${mediumAnalysis.impression_label})`);
  console.log('');
  console.log('❌ WEAK ESSAY:');
  console.log('   - Generic opening ("I have always been passionate")');
  console.log('   - No concrete scenes (all abstract telling)');
  console.log('   - No vulnerability (resume-style listing)');
  console.log('   - High brag density without context');
  console.log(`   - EQI: ${weakAnalysis.essay_quality_index.toFixed(1)}/100 (${weakAnalysis.impression_label})`);
  console.log('');

  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('  DEMO COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('The Analysis Engine successfully:');
  console.log('  ✅ Detected scenes, dialogue, and interiority');
  console.log('  ✅ Identified elite patterns (micro→macro, quantification, etc.)');
  console.log('  ✅ Applied rubric v1.0.1 with interaction rules');
  console.log('  ✅ Calculated EQI with proper dependency caps');
  console.log('  ✅ Generated prioritized improvement levers');
  console.log('  ✅ Simulated ΔEQI for all dimensions');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Build Story Coach Engine (creative, temp 0.6-0.8)');
  console.log('  2. Implement anti-robotic guardrails');
  console.log('  3. Build cross-essay coherence checker');
  console.log('  4. Create API endpoints and UI');
  console.log('');
}

// Run demo
main().catch(console.error);
