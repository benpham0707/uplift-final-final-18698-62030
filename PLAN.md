# PLAN: PIQ Workshop Quality Enhancement - Strategic Constraints System

## Executive Summary

**Goal**: Address 3 critical UX issues discovered through extensive user testing while maintaining current quality and system performance.

**Approach**: Add a new **Strategic Constraints Analyzer** as Stage 5 - a separate, lightweight API call that enhances workshop suggestions with word-count awareness, intellectual depth assessment, and topic viability evaluation.

**Key Principle**: **NEVER COMPROMISE QUALITY**. Add intelligence on top of existing system without modifying proven Stages 1-4.

---

## Problem Analysis

### Problem 1: Word Count Inefficiency ⚠️
**Issue**: System suggests flowery, longer replacements ignoring 350-word PIQ limit
- Suggestions often expand text rather than compress (e.g., 50-word passage → 80-word suggestion)
- Doesn't recognize opportunities for concise, efficient writing
- Students can't implement suggestions without exceeding word limit

**Example**:
```
Original (15 words): "I started a club to help the environment. We did beach cleanups every month."

Suggestion (28 words): "When I founded the Environmental Action Club, I felt a deep calling to protect our coastal ecosystems. Our monthly beach cleanups became a ritual of community stewardship and ecological responsibility."

Problem: +13 words of flowery language that eats into precious word budget
```

**Root Cause**: Workshop stage doesn't consider word budget or efficiency trade-offs

**Impact**: High-quality suggestions that are impractical to implement

### Problem 2: Over-emphasis on Storytelling/Imagery ⚠️
**Issue**: Heavy focus on sensory details and narrative imagery everywhere
- Not all sections need deep imagery
- Missing opportunities for intellectual depth, achievements, insights
- Doesn't recognize when to trade description for accomplishment mentions
- Essays become overly descriptive but miss showcasing academic/intellectual potential

**Example**:
```
Original: "Through this project, I learned how to analyze water quality data and present findings to policymakers."

Suggestion: "The cool glass beakers clinked as I carefully measured pH levels. The fluorescent lab lights hummed above as I meticulously recorded each data point in my weathered notebook..."

Problem: Trades intellectual demonstration for sensory description. Admissions wants to see analytical skills, not lab aesthetics.
```

**Root Cause**: Rubric dimensions weight narrative/emotional elements heavily across all sections

**Impact**: Essays showcase storytelling ability but not academic/intellectual capability

### Problem 3: No Topic Viability Assessment ⚠️
**Issue**: System doesn't evaluate if essay topic is substantive enough
- Can produce well-written essays about shallow/trivial topics
- No guidance on whether topic demonstrates academic potential
- Missing suggestions for better topic alternatives

**Example**:
```
Topic: "I learned organization by organizing my desk"

System produces: Well-written, vivid essay about desk organization with great imagery and narrative flow.

Problem: Topic is too shallow/trivial to differentiate student or showcase capabilities. System doesn't catch this.
```

**Root Cause**: No stage evaluates topic merit or college admissions value

**Impact**: Polished essays that don't showcase student capabilities

---

## Solution Architecture

### Core Principle: Additive Enhancement
- ✅ **Keep existing 4-stage pipeline intact** (Voice, Experience, Rubric, Workshop)
- ✅ **Add new Stage 5: Strategic Constraints Analyzer**
- ✅ Run as **separate, non-blocking API call** (like narrative-overview)
- ✅ Post-processes workshop items with constraints awareness
- ✅ **NO CHANGES** to proven Stages 1-4

### System Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXISTING PIPELINE (PROVEN)                     │
├──────────────────────────────────────────────────────────────────┤
│ Stage 1: Voice Fingerprint (15s)                    │
│ Stage 2: Experience Fingerprint (15s)  [PARALLEL]  │ 30s total
│ Stage 3: Rubric Analysis (40s)                                   │
│ Stage 4: Workshop Items × 12 (54s)                               │
├──────────────────────────────────────────────────────────────────┤
│                  Total: ~124s (PROVEN QUALITY)                    │
└──────────────────────────────────────────────────────────────────┘
                              ↓
┌──────────────────────────────────────────────────────────────────┐
│                 Stage 5: Strategic Constraints                    │
│                  (NEW - Additive Enhancement)                     │
├──────────────────────────────────────────────────────────────────┤
│ • Word efficiency analysis                                        │
│ • Intellectual depth vs imagery balance                           │
│ • Topic viability assessment                                      │
│ • Strategic replacement recommendations                           │
├──────────────────────────────────────────────────────────────────┤
│                       Time: ~20-25s                               │
│                   Cost: ~$0.020 per essay                         │
└──────────────────────────────────────────────────────────────────┘
```

---

## Detailed Design

### Stage 5: Strategic Constraints Analyzer

**Purpose**: Enhance workshop suggestions with strategic constraints awareness

**Input**:
```typescript
interface StrategicAnalysisRequest {
  essayText: string;
  currentWordCount: number;
  targetWordCount: 350; // UC PIQ limit
  promptText: string;
  promptTitle: string;
  workshopItems: WorkshopItem[]; // All 12 items from Stage 4
  rubricDimensionDetails: RubricDimension[];
  voiceFingerprint: any;
  experienceFingerprint: any;
  analysis: {
    narrative_quality_index: number;
    overall_strengths: string[];
    overall_weaknesses: string[];
  };
}
```

**Output**:
```typescript
interface StrategicAnalysisResult {
  success: boolean;

  // 1. Word Count Analysis
  wordCountAnalysis: {
    current: number;
    target: 350;
    available_budget: number; // Words remaining
    efficiency_score: number; // 0-10 (how efficiently essay uses words)
    bloat_areas: Array<{
      section: string; // Which part of essay
      word_count: number;
      potential_savings: number; // Words that could be cut
      why_bloated: string;
    }>;
    compression_opportunities: Array<{
      technique: "remove_redundancy" | "condense_imagery" | "tighten_transitions";
      where: string;
      estimated_savings: number;
      example: string;
    }>;
  };

  // 2. Strategic Balance Assessment
  strategicBalance: {
    imagery_density: number; // 0-10 (how much sensory/narrative detail)
    intellectual_depth: number; // 0-10 (analytical/conceptual content)
    achievement_presence: number; // 0-10 (concrete accomplishments mentioned)
    insight_quality: number; // 0-10 (depth of reflections)
    recommendation: "increase_depth" | "increase_achievements" | "reduce_imagery" | "balanced";
    imbalance_severity: "critical" | "moderate" | "minor" | "none";
    specific_gaps: Array<{
      type: "missing_achievements" | "excessive_description" | "shallow_insights";
      where: string;
      impact: string;
      suggestion: string;
    }>;
  };

  // 3. Topic Viability Evaluation
  topicViability: {
    substantiveness_score: number; // 0-10
    academic_potential_score: number; // 0-10 (showcases intellectual ability)
    differentiation_score: number; // 0-10 (unique/memorable)
    verdict: "strong" | "adequate" | "weak" | "reconsider";
    concerns: string[]; // If topic is problematic
    strengths: string[]; // What works about topic
    alternative_angles: Array<{
      suggestion: string;
      why_better: string;
      example: string;
    }>;
  };

  // 4. Enhanced Workshop Items (Metadata added to each item)
  enhancedWorkshopItems: Array<{
    original_item_id: string;
    efficiency_assessment: {
      word_delta: number; // Net word change (+/- words)
      efficiency_rating: "expands" | "neutral" | "compresses";
      implementable_with_budget: boolean; // Can user afford this change?
      alternative_if_too_long?: string; // More concise version if needed
    };
    strategic_value: {
      adds_depth: boolean; // Does this increase intellectual depth?
      adds_achievements: boolean; // Does this showcase accomplishments?
      reduces_fluff: boolean; // Does this cut unnecessary words?
      priority_adjustment: number; // -2 to +2 (adjust item priority)
      strategic_note: string; // Context for why priority changed
    };
  }>;

  // 5. Overarching Strategic Recommendations
  strategicRecommendations: Array<{
    type: "compression" | "depth_over_imagery" | "add_achievements" | "topic_reframe";
    priority: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
    where_to_apply: string; // Which section of essay
    why_matters: string;
    estimated_word_impact: number; // +/- words
    example_implementation?: string;
  }>;

  meta: {
    analysis_time_ms: number;
    model_used: string;
    version: "1.0";
  };
}
```

---

## Prompt Engineering

### System Prompt for Strategic Analyzer

```typescript
const STRATEGIC_ANALYZER_PROMPT = `You are a strategic college admissions essay consultant specializing in UC Personal Insight Question (PIQ) optimization.

CONTEXT:
- Word Limit: 350 words (STRICT - cannot exceed)
- Genre: UC Personal Insight Questions
- Purpose: Demonstrate academic potential, achievements, intellectual depth, and personal qualities
- Audience: UC admissions officers reading 80+ essays per day

CRITICAL UNDERSTANDING:
UC PIQs are NOT creative writing exercises. They are strategic demonstrations of:
1. Academic capability and intellectual curiosity
2. Concrete achievements and measurable impact
3. Personal qualities relevant to college success
4. Unique perspectives and experiences

CONSTRAINTS TO EVALUATE:

═══════════════════════════════════════════════════════════════
1. WORD EFFICIENCY ANALYSIS
═══════════════════════════════════════════════════════════════

Analyze how efficiently the essay uses its 350-word budget:

A) Identify BLOAT (words not earning their space):
   - Flowery adjectives that don't add meaning ("truly magnificent")
   - Redundant phrases ("I learned and discovered")
   - Excessive transitions ("Furthermore, moreover, additionally")
   - Over-description of mundane details
   - Vague generalities that could be cut

B) Calculate WORD BUDGET for implementing suggestions:
   - Current word count vs 350-word limit
   - For EACH workshop item, estimate net word delta
   - Flag items that would push essay over limit
   - Prioritize compression suggestions when budget is tight

C) Identify COMPRESSION OPPORTUNITIES:
   - Where could 3 sentences become 1 without losing impact?
   - Which sensory details could be implied rather than stated?
   - What background context is unnecessary?

CRITICAL RULE: If essay is 300+ words, prioritize COMPRESSION over expansion suggestions.

═══════════════════════════════════════════════════════════════
2. STRATEGIC BALANCE ASSESSMENT
═══════════════════════════════════════════════════════════════

Evaluate the essay's strategic balance across four dimensions:

A) IMAGERY DENSITY (0-10)
   - How much space devoted to sensory description?
   - Is imagery adding depth or just taking space?
   - Where is imagery essential vs unnecessary?

B) INTELLECTUAL DEPTH (0-10)
   - Does essay showcase analytical thinking?
   - Are there conceptual insights or just surface observations?
   - Does it demonstrate academic curiosity/capability?

C) ACHIEVEMENT PRESENCE (0-10)
   - Are concrete accomplishments quantified? (numbers, metrics, outcomes)
   - Does essay demonstrate impact and leadership?
   - Are achievements specific and verifiable?

D) INSIGHT QUALITY (0-10)
   - Are reflections substantive or generic?
   - Do insights show maturity and self-awareness?
   - Are conclusions earned through narrative?

IDENTIFY IMBALANCES:
- If imagery > 7 but intellectual_depth < 5: "excessive_description"
- If achievement_presence < 4: "missing_accomplishments"
- If insight_quality < 5: "shallow_reflections"

RECOMMENDATION FRAMEWORK:
- Imagery 8+ but Depth 5-: Trade description for analysis
- Achievement 4- but Imagery 7+: Trade story for impact metrics
- Insight 5- in any essay: Deepen reflections, avoid clichés

═══════════════════════════════════════════════════════════════
3. TOPIC VIABILITY EVALUATION
═══════════════════════════════════════════════════════════════

Assess whether the essay topic is substantive enough for UC admissions:

A) SUBSTANTIVENESS (0-10)
   - Is topic meaningful and significant?
   - Does it demonstrate genuine challenges or growth?
   - Or is it trivial/superficial? (e.g., "organizing my desk")

B) ACADEMIC POTENTIAL (0-10)
   - Does topic showcase intellectual capability?
   - Can student demonstrate analytical thinking through this topic?
   - Does it reveal academic interests or curiosity?

C) DIFFERENTIATION (0-10)
   - Is topic unique or overdone?
   - Will it stand out among thousands of essays?
   - Does it reveal something memorable about student?

VERDICTS:
- "strong" (8+ across all): Topic is excellent, proceed
- "adequate" (6-7 average): Topic works, minor reframing suggested
- "weak" (4-5 average): Topic needs significant reframing
- "reconsider" (<4 average): Topic is too shallow, suggest pivot

RED FLAGS (auto "weak" or "reconsider"):
- Topic is about routine task (organizing, studying, etc.)
- Topic lacks genuine challenge or stakes
- Topic doesn't showcase any academic/intellectual capability
- Topic is pure description with no analysis or insight
- Topic is cliché (sports injury, immigrant story without depth)

ALTERNATIVE ANGLES:
If topic is weak, suggest how to reframe or pivot:
- Add intellectual dimension (what complex problem did this help you solve?)
- Connect to academic interests (how did this spark curiosity?)
- Focus on unique aspect (what unusual angle exists?)
- Scale up impact (what systemic change resulted?)

═══════════════════════════════════════════════════════════════
4. WORKSHOP ITEM ENHANCEMENT
═══════════════════════════════════════════════════════════════

For EACH of the 12 workshop items from Stage 4, provide strategic metadata:

A) EFFICIENCY ASSESSMENT:
   - Estimate net word delta for implementing suggestion
   - Flag if implementable within remaining word budget
   - If too long, provide more concise alternative

B) STRATEGIC VALUE:
   - Does suggestion add intellectual depth? (yes/no)
   - Does suggestion showcase achievements? (yes/no)
   - Does suggestion reduce unnecessary words? (yes/no)
   - Should priority be adjusted based on constraints? (-2 to +2)

C) PRIORITY ADJUSTMENTS:
   +2: Critical for constraints (compression when budget tight, depth when imagery heavy)
   +1: Helpful for balance
    0: Neutral
   -1: Less urgent given constraints
   -2: Deprioritize (expansion when budget tight, more imagery when already heavy)

═══════════════════════════════════════════════════════════════
5. STRATEGIC RECOMMENDATIONS
═══════════════════════════════════════════════════════════════

Provide 3-5 overarching strategic recommendations:

TYPES:
- "compression": Where to cut words while maintaining impact
- "depth_over_imagery": Where to trade sensory detail for intellectual content
- "add_achievements": Where to quantify impact and showcase accomplishments
- "topic_reframe": How to reframe topic to be more substantial

PRIORITIZATION:
- "critical": Must address (topic too shallow, way over word count, missing achievements entirely)
- "high": Strongly recommended (significant imbalance, efficiency issues)
- "medium": Helpful improvement
- "low": Nice-to-have refinement

FORMAT:
Each recommendation must include:
- Where to apply (specific section)
- Why it matters (impact on admissions value)
- Estimated word impact (+/- X words)
- Concrete example of implementation

═══════════════════════════════════════════════════════════════
CRITICAL RULES
═══════════════════════════════════════════════════════════════

1. UC PIQs are demonstrations of FIT and POTENTIAL, not creative writing
2. Every word must earn its place - no flowery filler allowed
3. Achievements > Descriptions when word budget is tight
4. Intellectual insights > Sensory details for academic positioning
5. Topic must be substantive enough to showcase meaningful capabilities
6. When essay is 300+ words, PRIORITIZE compression over expansion
7. Balance imagery, depth, achievements, and insights strategically
8. Catch shallow topics before student submits

Return comprehensive JSON analysis with actionable strategic guidance that respects the 350-word constraint while maximizing essay impact.`;
```

---

## Implementation Plan

### Phase 1: Create Strategic Analyzer Edge Function

**File**: `supabase/functions/strategic-constraints/index.ts`

**Responsibilities**:
1. Accept full workshop analysis context
2. Evaluate word efficiency of each workshop suggestion
3. Assess imagery/depth/achievement balance
4. Evaluate topic viability
5. Return enhanced metadata + strategic recommendations

**API Specification**:
- **Endpoint**: `strategic-constraints`
- **Method**: POST
- **Timeout**: 60 seconds
- **Model**: Claude Sonnet 4
- **Max Tokens**: 6144 (need room for comprehensive analysis)
- **Temperature**: 0.7

**Request Body**:
```json
{
  "essayText": "string",
  "currentWordCount": 347,
  "targetWordCount": 350,
  "promptText": "string",
  "promptTitle": "string",
  "workshopItems": [],
  "rubricDimensionDetails": [],
  "voiceFingerprint": {},
  "experienceFingerprint": {},
  "analysis": {}
}
```

**Response**:
```json
{
  "success": true,
  "wordCountAnalysis": {},
  "strategicBalance": {},
  "topicViability": {},
  "enhancedWorkshopItems": [],
  "strategicRecommendations": [],
  "meta": {
    "analysis_time_ms": 21450,
    "model_used": "claude-sonnet-4-20250514",
    "version": "1.0"
  }
}
```

### Phase 2: Integrate Into Workshop Pipeline

**Modify**: `src/services/piqWorkshopAnalysisService.ts`

```typescript
export async function analyzePIQEntry(
  essayText: string,
  promptTitle: string,
  promptText: string,
  options: AnalysisOptions = {}
): Promise<AnalysisResult> {
  // Stage 1-4: Existing analysis (UNCHANGED)
  const result = await callWorkshopAnalysisEdgeFunction({
    essayText,
    promptText,
    promptTitle,
    essayType: options.essayType || 'uc_piq'
  });

  // Stage 5: Strategic Constraints (NEW - NON-BLOCKING)
  const strategicAnalysis = await fetchStrategicConstraints({
    essayText,
    currentWordCount: essayText.trim().split(/\s+/).length,
    targetWordCount: 350,
    promptText,
    promptTitle,
    workshopItems: result.workshopItems,
    rubricDimensionDetails: result.rubricDimensionDetails,
    voiceFingerprint: result.voiceFingerprint,
    experienceFingerprint: result.experienceFingerprint,
    analysis: result.analysis
  }).catch(err => {
    console.warn('⚠️  Strategic analysis failed, using basic fallback:', err);
    return null; // Graceful degradation
  });

  // Merge strategic metadata into workshop items
  const enhancedItems = strategicAnalysis
    ? mergeStrategicGuidance(result.workshopItems, strategicAnalysis.enhancedWorkshopItems)
    : result.workshopItems;

  return {
    ...result,
    workshopItems: enhancedItems,
    strategicAnalysis: strategicAnalysis || undefined,
  };
}

async function fetchStrategicConstraints(request: StrategicAnalysisRequest): Promise<StrategicAnalysisResult | null> {
  const SUPABASE_URL = 'https://zclaplpkuvxkrdwsgrul.supabase.co';
  const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const response = await fetch(`${SUPABASE_URL}/functions/v1/strategic-constraints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ANON_KEY}`,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Strategic analysis failed: ${response.status}`);
  }

  const result = await response.json();
  return result.success ? result : null;
}

function mergeStrategicGuidance(
  originalItems: WorkshopItem[],
  enhancedMetadata: EnhancedWorkshopItem[]
): WorkshopItem[] {
  return originalItems.map((item, idx) => ({
    ...item,
    strategicMeta: enhancedMetadata[idx] || null,
  }));
}
```

### Phase 3: Update UI to Display Strategic Guidance

#### 3.1: Word-Delta Badges on Workshop Items

**File**: `src/components/portfolio/extracurricular/workshop/AccordionWorkshop.tsx`

```tsx
{item.strategicMeta?.efficiency_assessment && (
  <Badge
    variant={
      item.strategicMeta.efficiency_assessment.efficiency_rating === 'compresses'
        ? 'success'
        : item.strategicMeta.efficiency_assessment.efficiency_rating === 'expands'
        ? 'warning'
        : 'secondary'
    }
    className="ml-2"
  >
    {item.strategicMeta.efficiency_assessment.word_delta > 0 ? '+' : ''}
    {item.strategicMeta.efficiency_assessment.word_delta} words
  </Badge>
)}

{item.strategicMeta?.efficiency_assessment?.implementable_with_budget === false && (
  <Tooltip>
    <TooltipTrigger>
      <AlertCircle className="w-4 h-4 text-amber-500 ml-1" />
    </TooltipTrigger>
    <TooltipContent>
      <p>May exceed word limit. See alternative below.</p>
    </TooltipContent>
  </Tooltip>
)}
```

#### 3.2: Topic Viability Alert

**File**: `src/pages/PIQWorkshop.tsx`

```tsx
{strategicAnalysis?.topicViability && (
  strategicAnalysis.topicViability.verdict === 'weak' ||
  strategicAnalysis.topicViability.verdict === 'reconsider'
) && (
  <Alert variant="warning" className="mb-6">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Topic Concern</AlertTitle>
    <AlertDescription>
      <p className="mb-2">{strategicAnalysis.topicViability.concerns.join(' ')}</p>
      {strategicAnalysis.topicViability.alternative_angles.length > 0 && (
        <div className="mt-3">
          <p className="font-semibold mb-1">Consider reframing:</p>
          <ul className="list-disc pl-5 space-y-1">
            {strategicAnalysis.topicViability.alternative_angles.map((alt, idx) => (
              <li key={idx}>
                <strong>{alt.suggestion}</strong>: {alt.why_better}
              </li>
            ))}
          </ul>
        </div>
      )}
    </AlertDescription>
  </Alert>
)}
```

#### 3.3: Strategic Guidance Panel (NEW Component)

**File**: `src/components/portfolio/piq/workshop/StrategicGuidancePanel.tsx`

```tsx
interface StrategicGuidancePanelProps {
  wordCountAnalysis: WordCountAnalysis;
  strategicBalance: StrategicBalance;
  strategicRecommendations: StrategicRecommendation[];
  wordBudget: number;
}

export function StrategicGuidancePanel({
  wordCountAnalysis,
  strategicBalance,
  strategicRecommendations,
  wordBudget
}: StrategicGuidancePanelProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        Strategic Guidance
      </h3>

      {/* Word Budget Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Word Budget</span>
          <Badge variant={wordBudget < 20 ? 'destructive' : wordBudget < 50 ? 'warning' : 'success'}>
            {wordBudget} words remaining
          </Badge>
        </div>
        <Progress value={(wordCountAnalysis.current / 350) * 100} className="h-2" />
        {wordBudget < 20 && (
          <p className="text-xs text-amber-600 mt-1">
            Word budget is tight. Prioritize compression suggestions.
          </p>
        )}
      </div>

      {/* Strategic Balance */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-3">Balance Assessment</h4>
        <div className="space-y-2">
          <BalanceBar label="Imagery/Description" value={strategicBalance.imagery_density} />
          <BalanceBar label="Intellectual Depth" value={strategicBalance.intellectual_depth} />
          <BalanceBar label="Achievements" value={strategicBalance.achievement_presence} />
          <BalanceBar label="Insight Quality" value={strategicBalance.insight_quality} />
        </div>
        {strategicBalance.imbalance_severity !== 'none' && (
          <Alert variant="default" className="mt-3">
            <AlertDescription className="text-sm">
              {strategicBalance.recommendation === 'increase_depth' && (
                'Consider trading some descriptive imagery for intellectual analysis.'
              )}
              {strategicBalance.recommendation === 'increase_achievements' && (
                'Add concrete accomplishments and measurable impact to strengthen essay.'
              )}
              {strategicBalance.recommendation === 'reduce_imagery' && (
                'Essay is heavy on description. Consider more concise, efficient writing.'
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Strategic Recommendations */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Top Recommendations</h4>
        <div className="space-y-3">
          {strategicRecommendations.slice(0, 3).map((rec, idx) => (
            <div key={idx} className="border-l-2 border-blue-500 pl-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={rec.priority === 'critical' ? 'destructive' : 'default'} size="sm">
                  {rec.priority}
                </Badge>
                <span className="text-sm font-medium">{rec.title}</span>
                {rec.estimated_word_impact !== 0 && (
                  <span className="text-xs text-muted-foreground">
                    ({rec.estimated_word_impact > 0 ? '+' : ''}{rec.estimated_word_impact} words)
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Where:</strong> {rec.where_to_apply}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function BalanceBar({ label, value }: { label: string; value: number }) {
  const getColor = (val: number) => {
    if (val >= 7) return 'bg-green-500';
    if (val >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span>{label}</span>
        <span className="font-medium">{value}/10</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor(value)} transition-all`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}
```

#### 3.4: Update Workshop Item Priority

**Automatically adjust item order based on strategic priority adjustments:**

```typescript
// Sort workshop items by adjusted priority
const sortedItems = [...workshopItems].sort((a, b) => {
  const priorityA = (a.strategicMeta?.strategic_value?.priority_adjustment || 0);
  const priorityB = (b.strategicMeta?.strategic_value?.priority_adjustment || 0);

  // Higher adjustment = higher priority
  return priorityB - priorityA;
});
```

---

## Testing Strategy

### Test Suite: Strategic Constraints Analyzer

**File**: `tests/test-strategic-constraints.ts`

```typescript
/**
 * Test 1: Word Efficiency - Tight Budget
 */
const TEST_TIGHT_BUDGET = {
  essayText: generateEssay(340), // 340 words (only 10 remaining)
  expectedBehavior: {
    compression_suggestions: '>= 3',
    expansion_items_flagged: true,
    word_budget_warnings: true,
    priority_adjustments: 'boost compression, lower expansion'
  }
};

/**
 * Test 2: Imagery Overload
 */
const TEST_IMAGERY_HEAVY = {
  essayText: `The sun glinted off the microscope as I peered through the eyepiece.
              The cool metal felt smooth under my fingertips. The lab smelled of
              chemicals and possibility...`, // Excessive sensory detail
  expectedBehavior: {
    imagery_density: '>= 8',
    intellectual_depth: '<= 4',
    balance_recommendation: 'depth_over_imagery',
    specific_gaps: 'includes excessive_description'
  }
};

/**
 * Test 3: Shallow Topic
 */
const TEST_SHALLOW_TOPIC = {
  essayText: `I learned organization by organizing my desk. First, I sorted my
              papers by color. Then I arranged my pens. This taught me that
              organization is important.`,
  expectedBehavior: {
    substantiveness_score: '<= 3',
    academic_potential_score: '<= 2',
    verdict: 'reconsider',
    concerns: 'includes "too trivial"',
    alternative_angles: '>= 2 suggestions'
  }
};

/**
 * Test 4: Ideal Balanced Essay
 */
const TEST_BALANCED = {
  essayText: generateBalancedEssay(300), // Well-balanced, 300 words
  expectedBehavior: {
    imagery_density: '5-7',
    intellectual_depth: '6-8',
    achievement_presence: '6-8',
    substantiveness_score: '>= 7',
    verdict: 'strong',
    imbalance_severity: 'none' | 'minor'
  }
};

/**
 * Test 5: Missing Achievements
 */
const TEST_NO_ACHIEVEMENTS = {
  essayText: `I started a club. We met every week. We discussed environmental
              issues. It was meaningful. I grew as a person.`, // All vague, no concrete impact
  expectedBehavior: {
    achievement_presence: '<= 3',
    specific_gaps: 'includes missing_achievements',
    strategic_recommendations: 'includes add_achievements'
  }
};
```

### Performance Testing

```typescript
/**
 * Test 6: Latency Under 30s
 */
test('Strategic analysis completes within 30 seconds', async () => {
  const startTime = Date.now();
  const result = await fetchStrategicConstraints(TEST_ESSAY);
  const elapsed = Date.now() - startTime;

  expect(elapsed).toBeLessThan(30000); // 30 seconds
  expect(result.success).toBe(true);
});

/**
 * Test 7: Graceful Degradation
 */
test('Main workshop continues if strategic analysis fails', async () => {
  // Mock strategic analyzer to fail
  mockStrategicAnalyzerFailure();

  const result = await analyzePIQEntry(essayText, promptTitle, promptText);

  // Main analysis should succeed
  expect(result.workshopItems.length).toBe(12);
  expect(result.strategicAnalysis).toBeUndefined();

  // UI should show workshop items without strategic enhancements
});
```

---

## Cost Analysis

### Per-Essay Cost Breakdown

| Component | Current | With Strategic | Change |
|-----------|---------|----------------|--------|
| Voice Fingerprint | $0.015 | $0.015 | - |
| Experience Fingerprint | $0.018 | $0.018 | - |
| Rubric Analysis | $0.024 | $0.024 | - |
| Workshop Items (12) | $0.085 | $0.085 | - |
| Narrative Overview | $0.012 | $0.012 | - |
| **Strategic Constraints** | - | **$0.020** | **+new** |
| **Total** | **$0.154** | **$0.174** | **+13%** |

### Value Analysis

**Cost increase**: +$0.020 per essay (13% increase)

**Benefits delivered**:
1. ✅ Word efficiency analysis (prevents unusable suggestions)
2. ✅ Strategic balance assessment (optimizes content mix)
3. ✅ Topic viability evaluation (catches weak topics early)
4. ✅ Enhanced workshop items (practical, implementable suggestions)

**ROI**:
- Modest cost increase (13%) for significant UX improvement
- Addresses 3 major pain points discovered in user testing
- Maintains 97% gross margin at $5/analysis pricing
- Creates premium upsell potential ($7-10 for strategic tier)

---

## Risk Mitigation

### Risk 1: Increased Latency ⚠️
**Concern**: Strategic analysis adds 20-25s to total time

**Mitigation**:
- Run in parallel with narrative-overview (both post-processing)
- Non-blocking: UI shows workshop items immediately
- Strategic guidance loads progressively
- Total time: ~145s (still under 150s timeout)

### Risk 2: Conflicting Guidance ⚠️
**Concern**: Strategic analysis contradicts Stage 4 suggestions

**Mitigation**:
- Strategic analyzer only adds metadata, doesn't regenerate
- Original suggestions remain intact
- Strategic notes are additive ("Also consider...")
- UI clearly separates original from strategic enhancement

### Risk 3: Over-complicating UX ⚠️
**Concern**: Too much information overwhelms users

**Mitigation**:
- Strategic panel is collapsible/expandable
- Word-delta badges are subtle indicators
- Topic viability only shows if verdict is "weak"/"reconsider"
- Default view shows original workshop unchanged

### Risk 4: Quality Degradation ⚠️
**Concern**: Adding new stage affects core quality

**Mitigation**:
- **ZERO CHANGES** to proven Stages 1-4
- Strategic analyzer is pure enhancement layer
- Extensive A/B testing before full rollout
- Easy rollback: remove strategic UI, keep original
- Feature flag for gradual rollout

---

## Success Metrics

### Primary Metrics
1. **Implementability**: 80%+ of suggestions implementable within word limit
2. **Balance Score**: Intellectual depth increases by avg 1.5 points
3. **Topic Quality**: <5% essays flagged as "weak" (catching edge cases)
4. **User Satisfaction**: 85%+ find strategic guidance helpful (survey)

### Secondary Metrics
1. **Compression Identified**: Average 30-50 words of potential savings
2. **Achievement Gaps**: 60%+ of low-achievement essays flagged
3. **Recommendation Quality**: Users implement 60%+ of strategic suggestions
4. **Performance**: <30s latency for strategic analysis

---

## Rollout Plan

### Week 1: Development
- [ ] Create `strategic-constraints` edge function
- [ ] Comprehensive prompt engineering with examples
- [ ] Build test suite (5+ test cases)
- [ ] Integrate into workshop pipeline

### Week 2: Testing & Iteration
- [ ] Test with 20+ real essay samples
- [ ] Verify latency <30s consistently
- [ ] Validate accuracy of word-delta calculations
- [ ] A/B test topic viability assessments
- [ ] Refine prompts based on results

### Week 3: UI Integration
- [ ] Word-delta badges on workshop items
- [ ] Topic viability alerts
- [ ] Strategic guidance panel component
- [ ] Balance assessment visualization
- [ ] Polish UX for discoverability

### Week 4: Pilot Launch
- [ ] Deploy to 10% of users
- [ ] Monitor engagement metrics
- [ ] Collect user feedback (surveys/interviews)
- [ ] Fix bugs, iterate on prompts
- [ ] Measure impact on essay quality

### Week 5: Full Launch
- [ ] Roll out to 100% of users
- [ ] Monitor performance and costs
- [ ] Track success metrics
- [ ] Continuous improvement based on data

---

## Approval Checklist

**Before proceeding to implementation, confirm:**

- [ ] ✅ Architecture approved (Stage 5 as additive layer)
- [ ] ✅ NO modifications to existing Stages 1-4
- [ ] ✅ Strategic analyzer runs as separate, non-blocking call
- [ ] ✅ Latency budget acceptable (<30s, total <150s)
- [ ] ✅ Cost increase acceptable (+$0.020 = 13%)
- [ ] ✅ UI approach approved (badges + panel + alerts)
- [ ] ✅ Test strategy comprehensive
- [ ] ✅ Rollout plan (5 weeks to full launch)
- [ ] ✅ Risk mitigation strategies in place
- [ ] ✅ Success metrics defined and measurable

---

## Next Steps After Approval

1. **Create edge function**: `supabase/functions/strategic-constraints/index.ts`
2. **Prompt engineering**: Write comprehensive system prompt with examples
3. **Test suite**: Build 5+ test cases covering all scenarios
4. **Backend integration**: Update `piqWorkshopAnalysisService.ts`
5. **UI components**: Build 3 new components (panel, badges, alerts)
6. **End-to-end testing**: Verify full pipeline works
7. **Deploy & monitor**: Gradual rollout with metrics tracking

**Estimated Timeline**: 5 weeks to production
**Risk Level**: Low (additive, proven architecture pattern)
**Expected Impact**: High (addresses all 3 critical UX issues)

---

## Conclusion

This plan comprehensively addresses all three user-reported issues:

1. ✅ **Word efficiency**: Tracks delta, identifies bloat, prioritizes compression
2. ✅ **Strategic balance**: Assesses imagery vs depth, recommends optimal mix
3. ✅ **Topic viability**: Evaluates substantiveness, suggests better angles

The solution is **additive-only** (no changes to proven system), **cost-effective** (+13% cost), **performant** (<30s), and **scalable**. The architecture follows the proven pattern of narrative-overview (separate, non-blocking, lightweight).

**Ready for approval to proceed with implementation.**
