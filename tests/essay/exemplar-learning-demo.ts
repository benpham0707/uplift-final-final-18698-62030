/**
 * Exemplar Learning System Demo
 *
 * Runs the continuous learning loop on our curated corpus of
 * exemplar essays from Harvard, Stanford, Yale, Berkeley, etc.
 *
 * This demonstrates the self-improvement loop in action.
 */

import {
  EXEMPLAR_CORPUS,
  runContinuousLearning,
  generateLearningReport
} from '../../src/core/essay/analysis/features/exemplarLearningSystem';

/**
 * Main demo
 */
async function main() {
  console.log('🎓 EXEMPLAR LEARNING SYSTEM — DEMO\n');
  console.log(`📚 Corpus size: ${EXEMPLAR_CORPUS.length} exemplar essays`);
  console.log(`🏫 Schools: Harvard, Yale, Stanford, Duke, Berkeley, Dartmouth, UNC, Northwestern\n`);
  console.log('─'.repeat(80));
  console.log('');

  // Run continuous learning loop
  const iterations = await runContinuousLearning(
    EXEMPLAR_CORPUS,
    10 // convergence threshold
  );

  console.log('');
  console.log('─'.repeat(80));
  console.log('');

  // Generate and display report
  const report = generateLearningReport(iterations);
  console.log(report);

  // Save report to file
  const fs = await import('fs/promises');
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `docs/essay/quality-reports/exemplar-learning-${timestamp}.md`;

  await fs.writeFile(filename, report, 'utf-8');
  console.log(`\n💾 Report saved to: ${filename}`);
}

// Run demo
main().catch(console.error);
