/**
 * Elite Pattern Detector Test
 *
 * Tests the enhanced pattern detection against actual Harvard/UC admits
 */

import { analyzeElitePatterns } from '../src/core/analysis/features/elitePatternDetector';
import { ELITE_EXAMPLES_2025, EXPECTED_TIERS } from './fixtures/elite-examples-2025';
import * as dotenv from 'dotenv';

dotenv.config();

function testEliteExample(entry: any, index: number) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`TEST ${index + 1}: ${entry.title}`);
  console.log(`Expected Tier: ${EXPECTED_TIERS[entry.id]}`);
  console.log(`${'='.repeat(80)}\n`);

  const analysis = analyzeElitePatterns(entry.description_original);

  console.log(`📊 ELITE PATTERN ANALYSIS:\n`);
  console.log(`  🎯 Tier: ${analysis.tier} ${analysis.tier === EXPECTED_TIERS[entry.id] ? '✅' : '❌'}`);
  console.log(`  📈 Overall Score: ${analysis.overallScore}/100\n`);

  console.log(`📝 MICRO-TO-MACRO STRUCTURE (${analysis.microToMacro.score}/10):`);
  console.log(`  ${analysis.microToMacro.hasVividOpening ? '✅' : '❌'} Vivid Opening: ${analysis.microToMacro.openingExamples.join(', ') || 'none'}`);
  console.log(`  ${analysis.microToMacro.hasPersonalStakes ? '✅' : '❌'} Personal Stakes: ${analysis.microToMacro.stakeMarkers.join(', ') || 'none'}`);
  console.log(`  ${analysis.microToMacro.hasPhilosophicalInsight ? '✅' : '❌'} Philosophical Insight: ${analysis.microToMacro.insights.join(', ') || 'none'}\n`);

  console.log(`💔 VULNERABILITY & EMOTION (${analysis.vulnerability.score}/10):`);
  console.log(`  Markers: ${analysis.vulnerability.markers.join(', ') || 'none'}`);
  if (analysis.vulnerability.examples.length > 0) {
    console.log(`  Examples: ${analysis.vulnerability.examples.slice(0, 2).join('; ')}\n`);
  } else {
    console.log(``);
  }

  console.log(`💬 DIALOGUE & CONFRONTATION:`);
  console.log(`  ${analysis.dialogue.hasDialogue ? '✅' : '❌'} Has Dialogue: ${analysis.dialogue.quotes.length} quotes`);
  console.log(`  ${analysis.dialogue.hasConfrontation ? '✅' : '❌'} Has Confrontation: ${analysis.dialogue.confrontationType || 'none'}`);
  if (analysis.dialogue.quotes.length > 0) {
    console.log(`  Quote: "${analysis.dialogue.quotes[0].substring(0, 60)}..."\n`);
  } else {
    console.log(``);
  }

  console.log(`📊 QUANTIFIED IMPACT:`);
  console.log(`  ${analysis.quantifiedImpact.hasMetrics ? '✅' : '❌'} Has Metrics: ${analysis.quantifiedImpact.metricsCount} found`);
  console.log(`  ${analysis.quantifiedImpact.hasHumanElement ? '✅' : '❌'} Has Human Element: ${analysis.quantifiedImpact.namedIndividuals.length} named individuals`);
  console.log(`  ${analysis.quantifiedImpact.scaleAppropriate ? '✅' : '❌'} Scale Appropriate for high schooler`);
  if (analysis.quantifiedImpact.metrics.length > 0) {
    console.log(`  Metrics: ${analysis.quantifiedImpact.metrics.slice(0, 3).map(m => m.value).join(', ')}`);
  }
  if (analysis.quantifiedImpact.namedIndividuals.length > 0) {
    console.log(`  Named: ${analysis.quantifiedImpact.namedIndividuals.join(', ')}\n`);
  } else {
    console.log(``);
  }

  console.log(`🌍 COMMUNITY TRANSFORMATION:`);
  console.log(`  ${analysis.communityTransformation.hasBeforeState ? '✅' : '❌'} Before State`);
  console.log(`  ${analysis.communityTransformation.hasAfterState ? '✅' : '❌'} After State`);
  console.log(`  ${analysis.communityTransformation.hasContrast ? '✅' : '❌'} Before/After Contrast`);
  console.log(`  Types: ${analysis.communityTransformation.transformationType.join(', ') || 'none'}\n`);

  console.log(`💪 STRENGTHS (${analysis.strengths.length}):`);
  analysis.strengths.forEach(s => console.log(`  ✓ ${s}`));

  console.log(`\n⚠️  GAPS (${analysis.gaps.length}):`);
  analysis.gaps.forEach(g => console.log(`  • ${g}`));

  console.log(`\n💡 RECOMMENDATIONS (${analysis.recommendations.length}):`);
  analysis.recommendations.forEach(r => console.log(`  → ${r}`));

  return analysis;
}

async function main() {
  console.log(`\n${'▓'.repeat(80)}`);
  console.log(`ELITE PATTERN DETECTOR TEST: 2024-2025 ADMITS`);
  console.log(`${'▓'.repeat(80)}\n`);

  console.log(`Testing ${ELITE_EXAMPLES_2025.length} examples from Harvard, UCLA, UC Berkeley...\n`);

  const results: any[] = [];

  for (let i = 0; i < ELITE_EXAMPLES_2025.length; i++) {
    const entry = ELITE_EXAMPLES_2025[i];
    const result = testEliteExample(entry, i);
    results.push({
      id: entry.id,
      title: entry.title,
      expectedTier: EXPECTED_TIERS[entry.id],
      actualTier: result.tier,
      score: result.overallScore,
      correct: result.tier === EXPECTED_TIERS[entry.id],
    });
  }

  console.log(`\n\n${'='.repeat(80)}`);
  console.log(`SUMMARY: ELITE PATTERN DETECTION ACCURACY`);
  console.log(`${'='.repeat(80)}\n`);

  const correct = results.filter(r => r.correct).length;
  const total = results.length;
  const accuracy = (correct / total * 100).toFixed(1);

  console.log(`Accuracy: ${correct}/${total} (${accuracy}%)\n`);

  console.log(`TIER ASSIGNMENTS:\n`);
  results.forEach(r => {
    const status = r.correct ? '✅' : '❌';
    console.log(`${status} ${r.title}`);
    console.log(`   Expected: Tier ${r.expectedTier}, Got: Tier ${r.actualTier}, Score: ${r.score}/100\n`);
  });

  console.log(`\nTIER DISTRIBUTION:\n`);
  const tier1 = results.filter(r => r.actualTier === 1).length;
  const tier2 = results.filter(r => r.actualTier === 2).length;
  const tier3 = results.filter(r => r.actualTier === 3).length;
  const tier4 = results.filter(r => r.actualTier === 4).length;

  console.log(`  Tier 1 (Harvard/Stanford/MIT): ${tier1} entries`);
  console.log(`  Tier 2 (Top UC/Ivy-Competitive): ${tier2} entries`);
  console.log(`  Tier 3 (UC-Competitive): ${tier3} entries`);
  console.log(`  Tier 4 (Needs Revision): ${tier4} entries\n`);

  console.log(`${'▓'.repeat(80)}\n`);
}

main().catch(console.error);
