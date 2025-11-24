// @ts-nocheck - PIQ analysis service
/**
 * PIQ Workshop Analysis Service
 *
 * Adapts the extracurricular analysis service for UC Personal Insight Questions
 * Reuses the same backend infrastructure but provides PIQ-specific context
 */

import type { AnalysisResult } from '@/components/portfolio/extracurricular/workshop/backendTypes';
import { analyzeElitePatterns } from '@/core/analysis/features/elitePatternDetector';
import { analyzeLiterarySophistication } from '@/core/analysis/features/literarySophisticationDetector';

/**
 * Analyze PIQ entry using the full backend system
 */
export async function analyzePIQEntry(
  essayText: string,
  promptTitle: string,
  promptText: string,
  options: {
    depth?: 'quick' | 'standard' | 'comprehensive';
    skip_coaching?: boolean;
  } = {}
): Promise<AnalysisResult> {
  console.log('='.repeat(80));
  console.log('PIQ WORKSHOP ANALYSIS SERVICE');
  console.log('='.repeat(80));
  console.log(`Prompt: ${promptTitle}`);
  console.log(`Essay length: ${essayText.length} chars`);
  console.log(`Depth: ${options.depth || 'standard'}`);
  console.log('');

  try {
    // Health check
    let healthCheckPassed = false;
    const healthPaths = ['/api/v1/health', '/api/health'];

    for (const path of healthPaths) {
      try {
        console.log(`[Health Check] Trying ${path}...`);
        const healthRes = await fetch(path, { signal: AbortSignal.timeout(10000) });
        if (healthRes.ok) {
          console.log(`[Health Check] ✅ Success via ${path}`);
          healthCheckPassed = true;
          break;
        }
      } catch (err) {
        console.log(`[Health Check] ❌ Failed via ${path}:`, err);
      }
    }

    if (!healthCheckPassed) {
      console.warn('[PIQ Analysis] Health check failed, using client-side heuristic fallback');
      // Return a heuristic-based analysis when server is not available
      return generateHeuristicFallback(essayText, promptTitle);
    }

    // Transform PIQ essay to analysis entry format
    // The backend analyzeEntry API is universal - works for any essay type
    const entry = {
      id: 'piq-' + Date.now(),
      title: promptTitle,
      category: 'personal_insight', // PIQ-specific category
      description_original: essayText,
      role: 'Student',
      organization: promptTitle,
      hours_per_week: 0,
      weeks_per_year: 0,
      tags: ['piq', 'uc_application'],
    };

    // Add PIQ-specific context to the entry
    const entryWithContext = {
      ...entry,
      piq_prompt: promptText,
      piq_title: promptTitle,
      essay_type: 'piq',
    };

    // Call the backend API
    console.log('Calling backend API for PIQ analysis...');
    const response = await fetch('/api/analyze-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entry: entryWithContext,
        options: {
          depth: options.depth || 'standard',
          skip_coaching: options.skip_coaching || false,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Analysis failed');
    }

    console.log('✅ Backend API call successful');
    console.log('  NQI:', result.result.report.narrative_quality_index);
    console.log('  Categories:', result.result.report.categories.length);

    // Run elite pattern detection (client-side)
    console.log('Running elite pattern detection...');
    const elitePatterns = analyzeElitePatterns(essayText);

    // Run literary sophistication detection (client-side)
    console.log('Running literary sophistication detection...');
    const literarySophistication = analyzeLiterarySophistication(essayText);

    // Transform backend result to AnalysisResult format
    const analysisResult: AnalysisResult = {
      analysis: {
        id: result.result.report.id,
        entry_id: entry.id,
        rubric_version: result.result.report.rubric_version,
        created_at: result.result.report.created_at,

        categories: result.result.report.categories.map(cat => ({
          category: mapCategoryNameToKey(cat.name),
          score: cat.score_0_to_10,
          maxScore: 10,
          comments: [cat.evaluator_notes],
          evidence: cat.evidence_snippets,
          suggestions: extractSuggestions(cat.evaluator_notes),
        })),

        weights: result.result.report.weights as Record<string, number>,
        narrative_quality_index: result.result.report.narrative_quality_index,
        reader_impression_label: result.result.report.reader_impression_label,
        flags: result.result.report.flags,
        suggested_fixes_ranked: result.result.report.suggested_fixes_ranked,
        analysis_depth: result.result.report.analysis_depth,
      },

      authenticity: {
        authenticity_score: result.result.authenticity.authenticity_score,
        voice_type: result.result.authenticity.voice_type as any,
        red_flags: result.result.authenticity.red_flags || [],
        green_flags: result.result.authenticity.green_flags || [],
        manufactured_signals: (result.result as any).authenticity?.manufactured_signals || [],
        authenticity_markers: (result.result as any).authenticity?.authenticity_markers || [],
        assessment: (result.result as any).authenticity?.assessment || '',
      },

      elite_patterns: {
        overallScore: elitePatterns.overallScore,
        tier: elitePatterns.tier,

        vulnerability: {
          score: elitePatterns.vulnerability.score,
          hasPhysicalSymptoms: elitePatterns.vulnerability.markers.some(m => m.includes('physical')),
          hasNamedEmotions: elitePatterns.vulnerability.markers.some(m => m.includes('emotion')),
          hasBeforeAfter: elitePatterns.vulnerability.markers.length > 0,
          examples: elitePatterns.vulnerability.examples,
        },

        dialogue: {
          score: elitePatterns.dialogue.hasDialogue ? 8 : 0,
          hasDialogue: elitePatterns.dialogue.hasDialogue,
          isConversational: elitePatterns.dialogue.hasDialogue,
          revealsCharacter: elitePatterns.dialogue.hasConfrontation,
          examples: elitePatterns.dialogue.quotes,
        },

        communityTransformation: {
          score: elitePatterns.communityTransformation.hasContrast ? 8 : 4,
          hasContrast: elitePatterns.communityTransformation.hasContrast,
          hasBefore: elitePatterns.communityTransformation.hasBeforeState,
          hasAfter: elitePatterns.communityTransformation.hasAfterState,
        },

        quantifiedImpact: {
          score: elitePatterns.quantifiedImpact.hasMetrics ? 8 : 0,
          hasMetrics: elitePatterns.quantifiedImpact.hasMetrics,
          metrics: elitePatterns.quantifiedImpact.metrics.map(m => m.value),
          plausibilityScore: elitePatterns.quantifiedImpact.scaleAppropriate ? 8 : 5,
        },

        microToMacro: {
          score: elitePatterns.microToMacro.score,
          hasUniversalInsight: elitePatterns.microToMacro.hasPhilosophicalInsight,
          transcendsActivity: elitePatterns.microToMacro.hasPhilosophicalInsight,
        },

        strengths: elitePatterns.strengths,
        gaps: elitePatterns.gaps,
      },

      literary_sophistication: {
        overallScore: literarySophistication.overallScore,

        extendedMetaphor: {
          score: literarySophistication.extendedMetaphor.score,
          hasMetaphor: literarySophistication.extendedMetaphor.hasMetaphor,
          isExtended: literarySophistication.extendedMetaphor.sustained,
          examples: literarySophistication.extendedMetaphor.centralImage ? [literarySophistication.extendedMetaphor.centralImage] : [],
        },

        structuralInnovation: {
          score: literarySophistication.structuralInnovation.score,
          structure: literarySophistication.structuralInnovation.innovations.join(', ') || 'standard',
          isInnovative: literarySophistication.structuralInnovation.innovations.length > 0,
        },

        sentenceRhythm: {
          score: literarySophistication.rhythmicProse.score,
          hasVariation: literarySophistication.rhythmicProse.hasVariety,
          examples: literarySophistication.rhythmicProse.hasParallelism ? ['Contains parallelism'] : [],
        },

        sensoryImmersion: {
          score: literarySophistication.sensoryImmersion.score,
          hasSensoryDetails: literarySophistication.sensoryImmersion.diverseSenses,
          examples: Object.entries(literarySophistication.sensoryImmersion.senses)
            .filter(([_, count]) => count > 0)
            .map(([sense, count]) => `${sense}: ${count}`),
        },

        activeVoice: {
          score: literarySophistication.authenticVoice.score,
          percentage: literarySophistication.authenticVoice.conversationalMarkers.length * 10,
          passiveExamples: [],
        },
      },

      coaching: result.result.coaching ? {
        prioritized_issues: (result.result.coaching.categories || []).flatMap(cat =>
          (cat.detected_issues || []).map(issue => ({
            issue_id: issue.id,
            category: mapCategoryNameToKey(cat.category_key || issue.category),
            severity: issue.severity as 'critical' | 'major' | 'minor',
            title: issue.title,
            problem: issue.problem,
            impact: issue.why_matters || issue.impact || '',
            suggestions: (issue.suggested_fixes || []).map(fix => fix.fix_text || fix),
          }))
        ),

        quick_wins: (result.result.coaching.top_priorities || []).slice(0, 3).map((priority, idx) => ({
          issue_id: `quick-win-${idx}`,
          estimated_minutes: 10,
          potential_gain: priority.impact || '+2-3 NQI',
        })),

        strategic_guidance: {
          focus_areas: (result.result.coaching.top_priorities || []).map(p => mapCategoryNameToKey(p.category)),
          estimated_time_minutes: result.result.coaching.overall?.total_issues ? result.result.coaching.overall.total_issues * 15 : 45,
          potential_nqi_gain: 10,
        },
      } : undefined,
    };

    console.log('');
    console.log('✓ PIQ Analysis complete');
    console.log(`  NQI: ${analysisResult.analysis.narrative_quality_index}/100`);
    console.log(`  Categories returned: ${analysisResult.analysis.categories.length}`);
    console.log(`  Elite patterns: ${analysisResult.elite_patterns.overallScore}/100 (Tier ${analysisResult.elite_patterns.tier})`);
    console.log(`  Literary sophistication: ${analysisResult.literary_sophistication.overallScore}/100`);
    console.log(`  Coaching issues: ${analysisResult.coaching?.prioritized_issues.length || 0}`);
    console.log('='.repeat(80));
    console.log('');

    return analysisResult;
  } catch (error) {
    console.error('❌ [piqWorkshopAnalysisService] Analysis failed:', error);
    console.error('❌ [piqWorkshopAnalysisService] Error details:', error instanceof Error ? error.message : String(error));

    // Instead of throwing, use the heuristic fallback for a better user experience
    console.warn('[PIQ Analysis] Falling back to heuristic analysis due to error');
    return generateHeuristicFallback(essayText, promptTitle);
  }
}

// Helper functions (same as workshopAnalysisService)

function mapCategoryNameToKey(name: string): any {
  const base = name.replace(/\s*\([^)]*\)\s*$/,'').trim();
  const mapping: Record<string, string> = {
    'Voice Integrity': 'voice_integrity',
    'Specificity & Evidence': 'specificity_evidence',
    'Transformative Impact': 'transformative_impact',
    'Role Clarity & Ownership': 'role_clarity_ownership',
    'Narrative Arc & Stakes': 'narrative_arc_stakes',
    'Initiative & Leadership': 'initiative_leadership',
    'Community & Collaboration': 'community_collaboration',
    'Reflection & Meaning': 'reflection_meaning',
    'Craft & Language Quality': 'craft_language_quality',
    'Fit & Trajectory': 'fit_trajectory',
    'Time in Investment & Consistency': 'time_investment_consistency',
    'Transformative Impact: Self & Others': 'transformative_impact',
  };

  if (mapping[base]) {
    return mapping[base];
  }

  const snakeBase = base
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s*&\s*/g, '_')
    .replace(/\s+/g, '_');
  if ((mapping as any)[snakeBase]) {
    return (mapping as any)[snakeBase];
  }

  return snakeBase;
}

function extractSuggestions(notes: string): string[] {
  const suggestions: string[] = [];
  const sentences = notes.split(/[.!?]+/).filter(s => s.trim().length > 10);

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (
      trimmed.match(/^(add|include|show|demonstrate|specify|clarify|improve|strengthen|deepen)/i) ||
      trimmed.includes('should') ||
      trimmed.includes('could') ||
      trimmed.includes('consider')
    ) {
      suggestions.push(trimmed);
    }
  }

  if (suggestions.length === 0) {
    suggestions.push('Review this category and consider how you can strengthen it');
  }

  return suggestions.slice(0, 3);
}

/**
 * Generate a heuristic-based fallback analysis when the backend is unavailable
 * This provides basic analysis without requiring the server
 */
function generateHeuristicFallback(essayText: string, promptTitle: string): AnalysisResult {
  const text = essayText;
  const wc = text.trim().split(/\s+/).filter(Boolean).length;

  // Apply LENGTH PENALTIES
  let maxScore = 10;
  if (wc < 25) maxScore = 1;
  else if (wc < 50) maxScore = 2;
  else if (wc < 100) maxScore = 4;
  else if (wc < 150) maxScore = 6;

  // Detect quality markers
  const hasStory = text.match(/\b(felt|realized|learned|discovered|struggled|wondered)\b/i);
  const hasEmotion = text.match(/\b(nervous|excited|frustrated|proud|afraid|confused|anxious|happy|sad)\b/i);
  const hasDialogue = text.includes('"') || text.includes("'");
  const hasReflection = text.match(/\b(I (learned|realized|understood|discovered))\b/i);
  const hasNumbers = text.match(/\d+/g)?.length || 0;
  const hasLeadership = text.match(/\b(led|founded|created|organized|initiated|coordinated|managed)\b/i);
  const hasCommunity = text.match(/\b(we|team|group|community|others|together|collaborative)\b/i);
  const hasImpact = text.match(/\b(changed|improved|increased|helped|taught|built|achieved)\b/i);
  const hasOwnership = text.match(/\b(I|my)\b/g)?.length || 0;
  const hasStakes = text.match(/\b(challenge|problem|struggled|difficult|failed|overcome)\b/i);

  // Calculate base score
  let base = 2; // Start a bit higher than resume bullet
  if (hasStory) base += 1;
  if (hasEmotion) base += 1.5;
  if (hasDialogue) base += 1;
  if (hasReflection) base += 1;
  if (hasNumbers > 0) base += 0.5;
  if (hasImpact) base += 0.5;
  base = Math.min(base, maxScore);

  const nqi = Math.round(base * 10);

  // Build categories
  const categories = [
    {
      category: 'voice_integrity' as any,
      score: +base.toFixed(1),
      maxScore: 10,
      comments: ['Heuristic analysis: Focus on using your authentic voice with specific sensory details.'],
      evidence: [text.slice(0, 80)],
      suggestions: ['Add sensory details and personal voice markers'],
    },
    {
      category: 'specificity_evidence' as any,
      score: +(Math.max(1, base - 0.5 + (hasNumbers > 2 ? 1 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasNumbers > 0 ? 'Has some metrics, needs more specific evidence.' : 'Needs concrete metrics and specific examples.'],
      evidence: [],
      suggestions: ['Add specific numbers and concrete examples'],
    },
    {
      category: 'transformative_impact' as any,
      score: +(Math.max(1, base - 0.5 + (hasImpact ? 1 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasImpact ? 'Shows some impact, needs before/after contrast.' : 'Needs clear transformative impact.'],
      evidence: [],
      suggestions: ['Show how you or others changed as a result'],
    },
    {
      category: 'role_clarity_ownership' as any,
      score: +(Math.max(1, base - 0.3 + (hasOwnership > 3 ? 0.5 : 0))).toFixed(1),
      maxScore: 10,
      comments: ['Clarify your specific role and ownership of actions.'],
      evidence: [],
      suggestions: ['Be specific about what YOU personally did'],
    },
    {
      category: 'narrative_arc_stakes' as any,
      score: +(Math.max(1, base - 1 + (hasStakes ? 1.5 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasStakes ? 'Has some tension, needs fuller narrative arc.' : 'Needs clear stakes and narrative progression.'],
      evidence: [],
      suggestions: ['Add a challenge, conflict, or turning point'],
    },
    {
      category: 'initiative_leadership' as any,
      score: +(Math.max(1, base - 0.5 + (hasLeadership ? 1 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasLeadership ? 'Shows initiative, add specific leadership moments.' : 'Needs clear initiative examples.'],
      evidence: [],
      suggestions: ['Show where you took initiative or led others'],
    },
    {
      category: 'community_collaboration' as any,
      score: +(Math.max(1, base - 0.5 + (hasCommunity ? 0.5 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasCommunity ? 'Mentions collaboration, needs more depth.' : 'Add community or collaborative elements.'],
      evidence: [],
      suggestions: ['Describe how you worked with others'],
    },
    {
      category: 'reflection_meaning' as any,
      score: +(Math.max(0, base - 1 + (hasReflection ? 1 : 0))).toFixed(1),
      maxScore: 10,
      comments: [hasReflection ? 'Has basic reflection, deepen with transferable insights.' : 'Add deeper reflection on meaning.'],
      evidence: [],
      suggestions: ['Reflect on what this experience taught you'],
    },
    {
      category: 'craft_language_quality' as any,
      score: +(Math.max(1, base - 0.5 + (hasDialogue ? 1 : 0) + (wc > 200 ? 0.5 : 0))).toFixed(1),
      maxScore: 10,
      comments: ['Focus on varied sentence structure and vivid language.'],
      evidence: [],
      suggestions: ['Use varied sentences and vivid descriptions'],
    },
    {
      category: 'fit_trajectory' as any,
      score: +(Math.max(1, base - 0.5)).toFixed(1),
      maxScore: 10,
      comments: ['Connect this experience to your broader interests and goals.'],
      evidence: [],
      suggestions: ['Show how this connects to your future'],
    },
    {
      category: 'time_investment_consistency' as any,
      score: +(Math.max(1, base - 0.3)).toFixed(1),
      maxScore: 10,
      comments: ['Show sustained commitment over time.'],
      evidence: [],
      suggestions: ['Mention duration and consistency of involvement'],
    },
  ];

  return {
    analysis: {
      id: 'heuristic-' + Date.now(),
      entry_id: 'piq-' + Date.now(),
      rubric_version: '1.0.0',
      created_at: new Date().toISOString(),
      categories,
      weights: {
        voice_integrity: 0.10,
        specificity_evidence: 0.09,
        transformative_impact: 0.12,
        role_clarity_ownership: 0.08,
        narrative_arc_stakes: 0.10,
        initiative_leadership: 0.10,
        community_collaboration: 0.08,
        reflection_meaning: 0.12,
        craft_language_quality: 0.07,
        fit_trajectory: 0.07,
        time_investment_consistency: 0.07,
      },
      narrative_quality_index: nqi,
      reader_impression_label: nqi >= 70 ? 'solid_needs_polish' : nqi >= 40 ? 'patchy_narrative' : 'generic_unclear',
      flags: ['heuristic_fallback', ...(wc < 100 ? ['too_short'] : []), ...(wc < 50 ? ['critically_short'] : [])],
      suggested_fixes_ranked: [
        'Add story elements (emotion, dialogue, reflection)',
        'Add concrete numbers and outcomes',
        'Deepen your reflection with transferable insights'
      ],
      analysis_depth: 'quick' as const,
    },
    authenticity: {
      authenticity_score: Math.max(3, Math.min(7, base)),
      voice_type: wc < 50 ? 'robotic' : (hasStory || hasEmotion ? 'conversational' : 'essay') as any,
      red_flags: [...(wc < 80 ? ['too_short'] : []), ...(!hasReflection ? ['no_reflection'] : [])],
      green_flags: [...(hasStory ? ['story_elements'] : []), ...(hasEmotion ? ['emotional_depth'] : [])],
      manufactured_signals: [],
      authenticity_markers: [],
      assessment: 'Heuristic analysis - server unavailable',
    },
    elite_patterns: {
      overallScore: Math.round(base * 8),
      tier: nqi >= 70 ? 2 : 3,
      vulnerability: {
        score: hasEmotion ? 5 : 2,
        hasPhysicalSymptoms: false,
        hasNamedEmotions: !!hasEmotion,
        hasBeforeAfter: false,
        examples: [],
      },
      dialogue: {
        score: hasDialogue ? 6 : 0,
        hasDialogue,
        isConversational: hasDialogue,
        revealsCharacter: false,
        examples: [],
      },
      communityTransformation: {
        score: hasImpact ? 5 : 2,
        hasContrast: false,
        hasBefore: false,
        hasAfter: !!hasImpact,
      },
      quantifiedImpact: {
        score: hasNumbers > 0 ? 5 : 0,
        hasMetrics: hasNumbers > 0,
        metrics: [],
        plausibilityScore: 5,
      },
      microToMacro: {
        score: hasReflection ? 5 : 2,
        hasUniversalInsight: false,
        transcendsActivity: false,
      },
      strengths: [],
      gaps: ['Add vulnerability', 'Include dialogue', 'Show transformation'],
    },
    literary_sophistication: {
      overallScore: Math.round(base * 7),
      extendedMetaphor: {
        score: 2,
        hasMetaphor: false,
        isExtended: false,
        examples: [],
      },
      structuralInnovation: {
        score: 3,
        structure: 'standard',
        isInnovative: false,
      },
      sentenceRhythm: {
        score: 4,
        hasVariation: true,
        examples: [],
      },
      sensoryImmersion: {
        score: hasEmotion ? 4 : 2,
        hasSensoryDetails: !!hasEmotion,
        examples: [],
      },
      activeVoice: {
        score: 5,
        percentage: 60,
        passiveExamples: [],
      },
    },
    coaching: {
      prioritized_issues: categories.slice(0, 3).map((cat, idx) => ({
        issue_id: `heuristic-${cat.category}-${idx}`,
        category: cat.category,
        severity: cat.score < 3 ? 'critical' as const : 'major' as const,
        title: cat.comments[0] || 'Needs improvement',
        problem: cat.comments[0] || '',
        impact: '+5-10 NQI potential',
        suggestions: cat.suggestions,
      })),
      quick_wins: [
        { issue_id: 'quick-1', estimated_minutes: 10, potential_gain: '+5-8 NQI' },
        { issue_id: 'quick-2', estimated_minutes: 10, potential_gain: '+3-5 NQI' },
      ],
      strategic_guidance: {
        focus_areas: ['voice_integrity', 'reflection_meaning', 'narrative_arc_stakes'],
        estimated_time_minutes: 45,
        potential_nqi_gain: 20,
      },
    },
  };
}
