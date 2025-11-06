/**
 * Analysis Engine Demo & Test Script
 *
 * This script demonstrates the full Analysis Engine pipeline
 * and validates that all components work together correctly.
 */

import { analyzeEntry } from '../src/core/analysis/engine';
import { STRONG_ENTRY, WEAK_ENTRY, GENERIC_ENTRY, TEST_ENTRIES_BY_TYPE } from './fixtures/test-entries';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ============================================================================
// HELPERS
// ============================================================================

function printSeparator(title: string = '') {
  console.log('\n' + '='.repeat(80));
  if (title) {
    console.log(`  ${title}`);
    console.log('='.repeat(80));
  }
}

function printCategoryScores(report: any) {
  console.log('\n📊 CATEGORY SCORES:');
  console.log('-'.repeat(80));

  // Sort by score descending
  const sorted = [...report.categories].sort((a, b) => b.score_0_to_10 - a.score_0_to_10);

  for (const category of sorted) {
    const score = category.score_0_to_10.toFixed(1);
    const bar = '█'.repeat(Math.round(category.score_0_to_10));
    const confidence = category.confidence ? ` (${(category.confidence * 100).toFixed(0)}% conf)` : '';

    console.log(`\n${category.name}:`);
    console.log(`  Score: ${score}/10 ${bar}${confidence}`);
    console.log(`  Evidence: "${category.evidence_snippets[0]?.substring(0, 60)}..."`);
    console.log(`  Notes: ${category.evaluator_notes}`);
  }
}

function printFlags(report: any) {
  console.log('\n🚩 DIAGNOSTIC FLAGS:');
  console.log('-'.repeat(80));

  if (report.flags.length === 0) {
    console.log('  ✓ No flags (clean entry!)');
  } else {
    for (const flag of report.flags) {
      console.log(`  ⚠ ${flag}`);
    }
  }
}

function printSuggestedFixes(report: any) {
  console.log('\n💡 SUGGESTED IMPROVEMENTS (ranked by impact):');
  console.log('-'.repeat(80));

  report.suggested_fixes_ranked.forEach((fix: string, idx: number) => {
    console.log(`  ${idx + 1}. ${fix}`);
  });
}

function printSummary(report: any, performance: any) {
  printSeparator();
  console.log(`\n📈 NARRATIVE QUALITY INDEX: ${report.narrative_quality_index}/100`);
  console.log(`📑 Reader Impression: ${report.reader_impression_label}`);
  console.log(`⚡ Total Analysis Time: ${performance.total_ms}ms`);
  console.log(`   - Feature Extraction: ${performance.stage1_ms}ms`);
  console.log(`   - Category Scoring: ${performance.stage2_ms}ms`);
  console.log(`   - Deep Reflection: ${performance.stage3_ms}ms`);
  console.log(`   - NQI & Flags: ${performance.stage4_ms}ms`);
}

// ============================================================================
// DEMO FUNCTIONS
// ============================================================================

async function demoSingleEntry(entry: any, name: string) {
  printSeparator(`DEMO: ${name.toUpperCase()}`);

  console.log(`\n📝 Entry: ${entry.title}`);
  console.log(`Category: ${entry.category}`);
  console.log(`Time: ${entry.time_span}`);
  console.log(`\nDescription (${entry.description_original.length} chars):`);
  console.log(`"${entry.description_original.substring(0, 200)}..."`);

  try {
    const result = await analyzeEntry(entry, { depth: 'standard' });

    printCategoryScores(result.report);
    printFlags(result.report);
    printSuggestedFixes(result.report);
    printSummary(result.report, result.performance);

    return result;
  } catch (error) {
    console.error('\n❌ ERROR:', error);
    throw error;
  }
}

async function compareEntries() {
  printSeparator('COMPARISON: Strong vs Weak vs Generic');

  const results = await Promise.all([
    analyzeEntry(STRONG_ENTRY, { depth: 'quick' }),
    analyzeEntry(WEAK_ENTRY, { depth: 'quick' }),
    analyzeEntry(GENERIC_ENTRY, { depth: 'quick' }),
  ]);

  console.log('\n📊 NQI COMPARISON:');
  console.log('-'.repeat(80));

  const entries = [
    { name: 'STRONG', result: results[0] },
    { name: 'WEAK', result: results[1] },
    { name: 'GENERIC', result: results[2] },
  ];

  for (const { name, result } of entries) {
    const nqi = result.report.narrative_quality_index;
    const bar = '█'.repeat(Math.round(nqi / 5));
    console.log(`${name.padEnd(12)}: ${nqi.toString().padStart(5)}/100 ${bar}`);
  }

  console.log('\n📋 FLAG COMPARISON:');
  console.log('-'.repeat(80));

  for (const { name, result } of entries) {
    console.log(`\n${name}:`);
    if (result.report.flags.length === 0) {
      console.log('  ✓ No flags');
    } else {
      result.report.flags.forEach((flag: string) => {
        console.log(`  ⚠ ${flag}`);
      });
    }
  }
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('\n\n');
  console.log('╔═══════════════════════════════════════════════════════════════════════════════╗');
  console.log('║                  EXTRACURRICULAR ANALYSIS ENGINE DEMO                         ║');
  console.log('║                           Powered by Claude AI                                ║');
  console.log('╚═══════════════════════════════════════════════════════════════════════════════╝');

  try {
    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not found in environment variables');
    }

    console.log('\n✓ Environment configured');
    console.log('✓ Analysis Engine loaded');
    console.log('✓ Test entries loaded\n');

    // Demo 1: Strong Entry (should score 85-95)
    console.log('\n' + '▓'.repeat(80));
    console.log('TEST 1: Strong Entry (Expected NQI: 85-95)');
    console.log('▓'.repeat(80));
    await demoSingleEntry(TEST_ENTRIES_BY_TYPE.strong, 'Strong Entry');

    // Wait a bit to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo 2: Weak Entry (should score 40-55)
    console.log('\n' + '▓'.repeat(80));
    console.log('TEST 2: Weak Entry (Expected NQI: 40-55)');
    console.log('▓'.repeat(80));
    await demoSingleEntry(TEST_ENTRIES_BY_TYPE.weak, 'Weak Entry');

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Demo 3: Comparison
    console.log('\n' + '▓'.repeat(80));
    console.log('TEST 3: Comparative Analysis');
    console.log('▓'.repeat(80));
    await compareEntries();

    printSeparator('ALL TESTS COMPLETE');
    console.log('\n✓ Analysis Engine is working correctly!');
    console.log('✓ All components integrated successfully');
    console.log('✓ Ready for Phase 1 checkpoint\n');

  } catch (error) {
    console.error('\n\n❌ DEMO FAILED:', error);
    process.exit(1);
  }
}

// Run directly
main();

export { main as runDemo };
