// @ts-nocheck - Legacy generation file with type mismatches
/**
 * Targeted Revision System
 *
 * Instead of sending full prompts on every iteration, this system:
 * 1. Identifies specific gaps from analysis
 * 2. Sends ONLY targeted instructions for those gaps
 * 3. Reduces token usage by 60-80%
 * 4. Improves focus and quality of revisions
 */

import { GenerationProfile } from './essayGenerator';
import type {
  AuthenticityAnalysis
} from '../analysis/features/authenticityDetector';
import type {
  ElitePatternsAnalysis
} from '../analysis/features/elitePatternDetector';
import type {
  LiterarySophisticationAnalysis
} from '../analysis/features/literarySophisticationDetector';

export interface RevisionTarget {
  category: 'structural' | 'literary' | 'elite' | 'authenticity';
  priority: 'critical' | 'high' | 'medium';
  gapName: string;
  currentScore: number;
  targetScore: number;
  prompt: string;
  tokenEstimate: number;
}

/**
 * Analyze all gaps and prioritize revisions
 */
export function identifyRevisionTargets(
  authenticityResult: AuthenticityAnalysis,
  eliteResult: ElitePatternsAnalysis,
  literaryResult: LiterarySophisticationAnalysis,
  iteration: number
): RevisionTarget[] {
  const targets: RevisionTarget[] = [];

  // LITERARY GAPS (highest priority - biggest point potential)

  // Structural Innovation (0-5/15 is critical, 12/15 is target)
  // PRIORITY: Skip perspective shift (too difficult) - focus on achievable structures
  if (literaryResult.structuralInnovation.score < 10) {
    const hasNonlinear = literaryResult.structuralInnovation.innovations.includes('nonlinear_time');
    const hasDualScene = literaryResult.structuralInnovation.innovations.includes('dual_scene');

    // Dual scene is easier and scores well (8-10 points)
    if (!hasDualScene && literaryResult.structuralInnovation.score < 10) {
      targets.push({
        category: 'structural',
        priority: 'critical',
        gapName: 'dual_scene_missing',
        currentScore: literaryResult.structuralInnovation.score,
        targetScore: 10,
        prompt: DUAL_SCENE_FIX,
        tokenEstimate: 250
      });
    } else if (!hasNonlinear && literaryResult.structuralInnovation.score < 8) {
      targets.push({
        category: 'structural',
        priority: 'high',
        gapName: 'nonlinear_structure_missing',
        currentScore: literaryResult.structuralInnovation.score,
        targetScore: 8,
        prompt: NONLINEAR_TIME_FIX,
        tokenEstimate: 200
      });
    }
  }

  // Sentence Variety (< 12/15 is fixable)
  if (literaryResult.rhythmicProse.score < 12) {
    const veryShortCount = literaryResult.rhythmicProse.shortSentences;

    if (veryShortCount < 2) {
      targets.push({
        category: 'literary',
        priority: 'high',
        gapName: 'sentence_variety_very_short',
        currentScore: literaryResult.rhythmicProse.score,
        targetScore: 13,
        prompt: SENTENCE_VARIETY_FIX,
        tokenEstimate: 200
      });
    }
  }

  // Extended Metaphor (< 15/20 needs strengthening)
  if (literaryResult.extendedMetaphor.score < 15 && literaryResult.extendedMetaphor.hasMetaphor) {
    targets.push({
      category: 'literary',
      priority: 'medium',
      gapName: 'metaphor_inconsistent',
      currentScore: literaryResult.extendedMetaphor.score,
      targetScore: 20,
      prompt: METAPHOR_STRENGTHEN_FIX,
      tokenEstimate: 200
    });
  }

  // ELITE PATTERN GAPS

  // Universal Insight (microToMacro score)
  if (eliteResult.microToMacro.score < 15) {
    targets.push({
      category: 'elite',
      priority: 'critical',
      gapName: 'universal_insight_weak',
      currentScore: eliteResult.microToMacro.score,
      targetScore: 18,
      prompt: UNIVERSAL_INSIGHT_FIX,
      tokenEstimate: 300
    });
  }

  // Community Transformation (check if missing before/after)
  if (!eliteResult.communityTransformation.hasBeforeState ||
      !eliteResult.communityTransformation.hasAfterState ||
      !eliteResult.communityTransformation.hasContrast) {
    targets.push({
      category: 'elite',
      priority: 'high',
      gapName: 'community_transformation_shallow',
      currentScore: eliteResult.overallScore, // Use overall as proxy
      targetScore: 18,
      prompt: COMMUNITY_TRANSFORMATION_FIX,
      tokenEstimate: 250
    });
  }

  // Vulnerability (< 8/10 needs more)
  if (eliteResult.vulnerability.score < 8) {
    targets.push({
      category: 'elite',
      priority: 'high',
      gapName: 'vulnerability_insufficient',
      currentScore: eliteResult.vulnerability.score,
      targetScore: 9,
      prompt: VULNERABILITY_FIX,
      tokenEstimate: 200
    });
  }

  // Dialogue Quality (check if present and has confrontation)
  if (!eliteResult.dialogue.hasDialogue || !eliteResult.dialogue.hasConfrontation) {
    targets.push({
      category: 'elite',
      priority: 'medium',
      gapName: 'dialogue_weak',
      currentScore: eliteResult.dialogue.hasDialogue ? 5 : 0,
      targetScore: 9,
      prompt: DIALOGUE_FIX,
      tokenEstimate: 200
    });
  }

  // AUTHENTICITY GAPS (usually minor by this point)
  if (authenticityResult.overallScore < 8.0) {
    targets.push({
      category: 'authenticity',
      priority: 'high',
      gapName: 'voice_manufactured',
      currentScore: authenticityResult.overallScore,
      targetScore: 8.5,
      prompt: AUTHENTICITY_FIX,
      tokenEstimate: 250
    });
  }

  // Sort by priority: critical > high > medium
  return targets.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Build targeted revision prompt focusing ONLY on specific gap
 */
export function buildTargetedRevisionPrompt(
  target: RevisionTarget,
  previousEssay: string,
  profile: GenerationProfile,
  iteration: number
): string {
  return `You are revising a college admissions essay. This is iteration ${iteration}.

CURRENT ESSAY:
"""
${previousEssay}
"""

REVISION TASK: ${target.gapName.replace(/_/g, ' ').toUpperCase()}
Current Score: ${target.currentScore}/${target.category === 'authenticity' ? '10' : target.category === 'elite' ? '20' : '15'}
Target Score: ${target.targetScore}/${target.category === 'authenticity' ? '10' : target.category === 'elite' ? '20' : '15'}

${target.prompt}

IMPORTANT:
- Keep the CORE STORY and existing strengths
- Make SURGICAL changes to fix this specific gap
- Maintain the student's authentic voice (${profile.studentVoice})
- Keep essay length 800-1200 characters
- Return ONLY the revised essay, no commentary

Revised essay:`;
}

// ============================================================================
// TARGETED FIX PROMPTS (Focused & Efficient)
// ============================================================================

const PERSPECTIVE_SHIFT_FIX = `🚨 CRITICAL: Add perspective shift to opening

Your essay currently starts in first person. It needs to start in THIRD PERSON then reveal first person for structural innovation (worth 7 points).

REQUIRED CHANGES TO OPENING (2-3 sentences):

1. Rewrite first 2-3 sentences in THIRD PERSON:
   - Use "a student", "a teenager", "she/he" (NO "I", "my", "we")
   - Example: "In the robotics lab, a teenager stared at error logs. Three days until competition. Zero working solutions."

2. Build mini scene (20-40 words) showing situation

3. THEN REVEAL first person:
   - "How do I know? That was me."
   - "Yeah. Me."
   - "That teenager? Me."

4. Continue rest of essay in first person as normal

This creates intrigue + literary sophistication. The reader wonders "who?" then gets the reveal.

MAKE MINIMAL OTHER CHANGES - just fix the opening structure.`;

const SENTENCE_VARIETY_FIX = `🎯 Add 2-3 very short sentences (1-2 words)

Your essay needs more dramatic sentence variety for rhythm. Currently missing very short sentences.

REQUIRED: Insert 2-3 VERY SHORT sentences at emotional peaks:

Examples:
- "No."
- "Gone."
- "Me."
- "Wrong."
- "Bingo."
- "Perfect."
- "Failed."

WHERE TO ADD THEM:
- At moment of realization
- When problem discovered
- At emotional peak
- After dialogue for emphasis

EXAMPLE PLACEMENT:
Before: "My hands were shaking as I realized the error."
After: "My hands were shaking as I realized the error. Wrong. All wrong."

Or: "I found the bug buried in line 847."
After: "I found the bug. Line 847. One decimal point."

Keep everything else the same - just add these for rhythm and emphasis.`;

const METAPHOR_STRENGTHEN_FIX = `🎵 Strengthen extended metaphor consistency

Your essay has a metaphor but it needs 2-3 more references woven throughout.

CURRENT METAPHOR: ${''} (identify from essay)

ADD 2-3 MORE REFERENCES:
- Weave into different paragraphs
- Use in describing actions ("we harmonized solutions")
- Use in describing people ("she guarded her score like first chair")
- Use in reflection ("learned to play the same symphony")

Make them feel NATURAL, not forced. The metaphor should feel like how the student thinks about the experience.

Keep core story identical - just add metaphor language throughout.`;

const UNIVERSAL_INSIGHT_FIX = `💡 Deepen universal insight (ending)

Your ending needs a stronger philosophical insight that connects to UNIVERSAL human truth (not just activity-specific).

CURRENT ISSUE: Ending is too specific to robotics/activity

REQUIRED: Rewrite final 2-3 sentences to:

1. Start with specific ("In our workshop, I learned...")
2. Connect to UNIVERSAL ("But this revealed something deeper about...")
3. End with philosophical truth that applies beyond activity

EXAMPLES:
❌ Weak: "I learned that debugging requires teamwork and persistence."
✅ Strong: "The most elegant code I wrote wasn't for the robot. It was the language that taught specialists to translate their expertise into something everyone could understand."

❌ Weak: "This experience taught me leadership and collaboration."
✅ Strong: "We debugged more than code—we debugged fear itself. The smallest bugs create the biggest breakthroughs when you're willing to admit you're playing wrong notes."

Make the reader think: "Yes! This is true about life, not just robotics."

Only change the ending - keep everything else.`;

const COMMUNITY_TRANSFORMATION_FIX = `🌟 Quantify community transformation

Your essay shows community impact but needs MORE SPECIFIC BEFORE/AFTER evidence.

REQUIRED: Add/strengthen these elements:

BEFORE STATE (be specific):
- How many people involved?
- Describe toxic/siloed culture specifically
- What was the measurable problem? (e.g., "went from 15 collaborative sessions to 0")

AFTER STATE (add numbers):
- How many people changed?
- What new behaviors? (specific examples)
- What measurable impact? (e.g., "8 new programmers learned", "culture spread to 18 teams")

NUMBERS TO ADD:
- People trained/taught
- New behaviors quantified
- Ripple effects measured
- Time-based comparison (before vs after)

Example additions:
- "By season's end, 8 new programmers..."
- "We went from 3 collaborations per month to 23..."
- "5 incoming freshmen immediately embraced the culture..."

Add these quantifications WITHOUT changing core story.`;

const VULNERABILITY_FIX = `😰 Add specific vulnerability moment

Your essay needs 1-2 MORE moments showing authentic struggle/emotion.

REQUIRED: Add at least ONE of these:

1. PHYSICAL SYMPTOM:
   - "My hands were literally shaking"
   - "Stomach churned"
   - "Voice cracked"
   - "Jaw dropped"

2. NAMED EMOTION:
   - "I was terrified"
   - "felt dumbstruck"
   - "completely out of place"
   - "had no clue"

3. ADMITS LIMITS:
   - "I didn't know how to..."
   - "seemed impossible"
   - "no idea where to start"

WHERE TO ADD:
- At crisis moment
- When facing problem
- Before breakthrough

Example addition:
"My stomach literally churned as I stared at the broken code—terrified we'd fail in front of 2,000 people."

Add vulnerability WITHOUT changing the plot.`;

const DIALOGUE_FIX = `💬 Strengthen dialogue quality

Your essay has dialogue but needs MORE REVEALING/CONFRONTATIONAL conversations.

REQUIRED: Make dialogue show:
1. Character relationships
2. Tension/conflict
3. Personality/voice
4. Turning point

EXAMPLES:

❌ Weak: Dad told me to keep trying.
✅ Strong: "This is hopeless," I whispered. "Every bug is just discord," Dad said quietly. "You need to tune the whole orchestra."

❌ Weak: Sarah agreed to help.
✅ Strong: "Your code's trash," Sarah announced. "Thanks for the pep talk," I shot back. "Want to actually help or just critique?"

Add 1-2 exchanges that:
- Reveal relationship dynamics
- Show personality through word choice
- Move the story forward
- Feel like real conversation

Replace existing bland dialogue OR add new exchanges.`;

const DUAL_SCENE_FIX = `🎭 Add dual-scene structure

Create contrast by showing TWO parallel moments (before/after or two contrasting scenes).

STRUCTURE OPTIONS:

1. BEFORE/AFTER:
   - Scene 1: Workshop before (chaos, conflict)
   - Scene 2: Workshop after (collaboration, success)

2. TWO MOMENTS:
   - Moment 1: Failed test (3 days before)
   - Moment 2: Competition success (present)

Use CLEAR MARKERS:
- "Three days before..." vs "Competition day..."
- "Before this..." vs "After..."
- "The first time..." vs "Now..."

Keep the content but RESTRUCTURE into two distinct scenes that mirror each other.`;

const NONLINEAR_TIME_FIX = `⏰ Add nonlinear time structure

Make the timeline jump around instead of linear chronology.

CURRENT: Linear (start → middle → end)
NEEDED: Nonlinear (present → flashback → present OR future → past → present)

RESTRUCTURE OPTIONS:

1. START AT END:
   - Begin with competition success
   - Flash back to crisis
   - Return to present reflection

2. START AT CRISIS:
   - Begin 3 days before competition
   - Flash to earlier backstory
   - Return to crisis resolution

Use time markers:
- "Three months earlier..."
- "But rewind to September..."
- "Fast forward to competition day..."
- "Before this disaster..."

Rearrange paragraphs and add time transitions. Keep all content.`;

const AUTHENTICITY_FIX = `✨ Make voice more authentic

Your essay sounds slightly manufactured. Make it sound like YOU actually wrote it.

REMOVE:
- Essay clichés: "shaped who I am", "taught me", "made me realize"
- Forced sensory: "the air smelled like"
- Generic phrases: "I've always been passionate"

ADD:
- Parenthetical asides: "(honestly, who does that?)"
- Questions: "Want to know what broke?"
- Fragments: "No. Just... no."
- Casual language: "literally", "honestly", "basically"
- Self-aware humor: "(me, apparently)"

Make it sound like you're texting a friend about the experience, not writing for a teacher.

Keep story same - just adjust TONE to be more conversational/real.`;
