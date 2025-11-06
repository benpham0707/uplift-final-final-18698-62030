/**
 * Demo: Testing Authentic Examples
 *
 * Tests the system with REAL successful admissions essays to verify
 * that authentic voice is rewarded over manufactured essay voice.
 */

import { analyzeEntry } from '../src/core/analysis/engine';
import { AUTHENTIC_EXAMPLES } from './fixtures/authentic-examples';
import * as dotenv from 'dotenv';

dotenv.config();

async function testAuthenticExample(entry: any, index: number) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`AUTHENTIC EXAMPLE ${index + 1}: ${entry.title}`);
  console.log(`${'='.repeat(80)}\n`);

  console.log(`Category: ${entry.category}`);
  console.log(`Time: ${entry.time_span}`);
  console.log(`\nDescription (${entry.description_original.length} chars):`);
  console.log(`"${entry.description_original.substring(0, 150)}..."\n`);

  try {
    const result = await analyzeEntry(entry);

    console.log(`\n${'='.repeat(80)}`);
    console.log(`RESULTS:`);
    console.log(`${'='.repeat(80)}\n`);

    console.log(`✨ Authenticity Score: ${result.authenticity.authenticity_score}/10 (${result.authenticity.voice_type} voice)`);
    console.log(`   - Manufactured signals: ${result.authenticity.manufactured_signals.length}`);
    console.log(`   - Authentic signals: ${result.authenticity.authentic_signals.length}`);
    console.log(`   - Red flags: ${result.authenticity.red_flags.join(', ') || 'None'}`);
    console.log(`   - Green flags: ${result.authenticity.green_flags.join(', ') || 'None'}\n`);

    console.log(`📊 Voice Integrity Score: ${result.report.categories.find(c => c.name === 'voice_integrity' || c.name === 'Voice Integrity')?.score_0_to_10 || 'N/A'}/10`);
    console.log(`📈 Overall NQI: ${result.report.narrative_quality_index}/100`);
    console.log(`📑 Reader Impression: ${result.report.reader_impression_label}\n`);

    console.log(`⏱️  Analysis Time: ${result.performance.total_ms}ms\n`);

    return result;
  } catch (error) {
    console.error(`\n❌ ERROR: ${error}\n`);
    return null;
  }
}

async function main() {
  console.log(`\n${'▓'.repeat(80)}`);
  console.log(`TESTING AUTHENTIC EXAMPLES FROM REAL SUCCESSFUL ADMISSIONS`);
  console.log(`${'▓'.repeat(80)}\n`);

  console.log(`Testing ${AUTHENTIC_EXAMPLES.length} authentic examples...\n`);

  // Test first 2 examples for now (to save time/tokens)
  const exampleIndexes = [0, 1]; // Jimmy's Hot Dogs and Santur

  const results = [];

  for (const index of exampleIndexes) {
    const entry = AUTHENTIC_EXAMPLES[index];
    const result = await testAuthenticExample(entry, index);
    results.push(result);

    // Wait a bit between tests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log(`SUMMARY: AUTHENTIC EXAMPLES`);
  console.log(`${'='.repeat(80)}\n`);

  results.forEach((result, i) => {
    if (result) {
      const voiceScore = result.report.categories.find(c => c.name === 'voice_integrity' || c.name === 'Voice Integrity')?.score_0_to_10;
      console.log(`Example ${exampleIndexes[i] + 1}: NQI ${result.report.narrative_quality_index}/100, Voice ${voiceScore}/10, Auth ${result.authenticity.authenticity_score}/10`);
    }
  });

  console.log(`\n${'▓'.repeat(80)}\n`);
}

main().catch(console.error);
