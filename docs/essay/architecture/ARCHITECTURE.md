# Asteria-E: Essay Analysis & Coaching System Architecture

## Version: 1.0.0
## Last Updated: 2025-11-05

---

## Executive Summary

**Asteria-E** is a production-quality, test-driven college essay grading and coaching system powered by Claude AI. It operates under strict quality governance defined by the Master Quality Framework, prioritizing depth, human-centered design, and iterative refinement over speed.

### Core Principles

1. **Depth Over Speed** — Every component is built as permanent infrastructure
2. **Human-Centered Design** — Essays represent identity; system must preserve voice and authenticity
3. **Separation of Concerns** — Analysis (objective) and Coaching (creative) are distinct engines
4. **Test-First Development** — No feature without ≥85% test coverage
5. **Iterative Refinement** — Continuous improvement loop with metrics tracking
6. **Explainability** — Every score linked to evidence; every suggestion justified

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  • Next.js Student UI                                           │
│  • Counselor Dashboard                                          │
│  • Review Sandbox                                               │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│  • AuthN/Z (Supabase)                                           │
│  • Rate Limiting & Quotas                                       │
│  • Request Validation & Shaping                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR (Conductor)                      │
│  • Route requests to appropriate engines                        │
│  • Fan-out parallel Claude calls                                │
│  • Merge artifacts (Analysis + Coaching)                        │
│  • Apply cross-essay coherence checks                           │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌───────────────────┐ ┌──────────────┐ ┌──────────────────┐
│  ANALYSIS ENGINE  │ │ COACH ENGINE │ │ COHERENCE ENGINE │
│                   │ │              │ │                  │
│ • Rubric Scoring  │ │ • Outlines   │ │ • Voice Print    │
│ • Scene Detection │ │ • Micro-Edits│ │ • Fact Graph     │
│ • Elite Patterns  │ │ • Rewrites   │ │ • Motif Map      │
│ • ΔEQI Simulation │ │ • Elicitation│ │ • Anti-Ghostwrite│
│                   │ │              │ │                  │
│ Temp: 0.2-0.3     │ │ Temp: 0.6-0.8│ │ Temp: 0.3        │
│ JSON Mode: ON     │ │ Creative Mode│ │ JSON Mode: ON    │
└───────────────────┘ └──────────────┘ └──────────────────┘
            │                 │                 │
            └─────────────────┼─────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PERSISTENCE LAYER                           │
│  • Postgres (Supabase): Essays, Reports, Plans, Users           │
│  • S3/R2: Draft versions, diffs, model I/O logs                 │
│  • Redis (optional): Prompt cache, ΔEQI memo                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   OBSERVABILITY & MONITORING                     │
│  • OpenTelemetry traces                                         │
│  • Structured logs (Winston/Pino)                               │
│  • Metrics: cost, latency, score drift, accept rate             │
│  • Prompt/rubric version lineage                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Analysis Engine (`src/core/essay/analysis/`)

**Purpose**: Objective, deterministic essay evaluation using the Essay Rubric v1.0.0

**Key Modules**:
- `engine.ts` — Main analysis orchestrator
- `features/sceneDetector.ts` — Detects concrete scenes, dialogue, sensory detail
- `features/dialogueExtractor.ts` — Extracts quoted speech
- `features/interiorityDetector.ts` — Identifies emotion naming, inner debate
- `features/elitePatternDetector.ts` — Essay-specific elite patterns (micro→macro, vulnerability, etc.)
- `scoring/rubricScorer.ts` — Scores all 12 rubric dimensions
- `scoring/interactionRules.ts` — Applies dependency caps (e.g., no scene → reflection max 8)

**Input**: `Essay` object
**Output**: `AnalysisReport` (scores, EQI, flags, levers, elite profile)

**Constraints**:
- Temperature: 0.2–0.3
- JSON mode: ON
- Max tokens: ~1200
- No coaching suggestions

---

### 2. Story Coach Engine (`src/core/essay/coaching/`)

**Purpose**: Creative, voice-preserving coaching that never invents facts

**Key Modules**:
- `engine.ts` — Main coaching orchestrator
- `strategies/outliner.ts` — Generates 2–3 distinct outlines (chronological, hinge, braid)
- `strategies/microEditor.ts` — Produces targeted X→Y edits with rationales
- `strategies/rewriter.ts` — Creates 2–3 rewrites in different voice registers
- `strategies/elicitationBuilder.ts` — Builds question sets for missing evidence
- `strategies/guardRails.ts` — Anti-robotic phrase detection, voice-drift checking

**Input**: `Essay` + `AnalysisReport`
**Output**: `CoachingPlan` (outlines, micro-edits, rewrites, elicitation prompts)

**Constraints**:
- Temperature: 0.6–0.8
- Creative mode
- Max tokens: ~3000 (distributed across variants)
- **Never add achievements, numbers, or affiliations**
- Must preserve writer's voice fingerprint

---

### 3. Coherence Engine (`src/core/essay/coherence/`)

**Purpose**: Cross-essay consistency and anti-ghostwriting detection

**Key Modules**:
- `voiceFingerprint.ts` — Sentence rhythm, function word ratios, idioms
- `factGraph.ts` — Named entities, dates, roles, organizations (consistency checker)
- `motifMapper.ts` — Recurring images/ideas across essay set
- `antiGhostwrite.ts` — Detects voice drift, template overlap, AI clichés

**Input**: `ApplicationSet` (multiple essays from same user)
**Output**: `CoherenceReport` (voice profile, fact conflicts, motif map, alerts)

---

### 4. ΔEQI Simulator (`src/core/essay/simulator/`)

**Purpose**: Predict impact of improving each dimension

**Logic**:
```typescript
ΔEQI_d = (min(10, score_d + 2) - score_d) * weight_d * 10
// Apply dependency caps (e.g., without scene, Reflection max 8)
```

**Output**: Ranked list of 2–3 highest-leverage improvements

---

### 5. Essay Rubric v1.0.0 (`src/core/essay/rubrics/`)

**12 Dimensions** (see full spec in design doc):

1. Opening Power & Scene Entry (10%)
2. Narrative Arc, Stakes & Turn (12%)
3. Character Interiority & Vulnerability (12%)
4. Show-Don't-Tell Craft (10%)
5. Reflection & Meaning-Making (12%)
6. Intellectual Vitality & Curiosity (8%)
7. Originality & Specificity of Voice (8%)
8. Structure, Pacing & Coherence (6%)
9. Word Economy & Line-level Craft (6%)
10. Context & Constraints Disclosure (8%)
11. School/Program Fit (6%, conditional)
12. Ethical Awareness & Humility (6%)

**Interaction Rules**:
- Scene power amplifies reflection (no scene → Reflection max 8)
- Specific fit unlocks "Why us" ceiling
- Context disclosure prevents prestige illusions
- Interiority can redeem modest outcomes
- Humility moderates impact claims

---

## Data Models (TypeScript/Zod Schemas)

### Essay
```typescript
interface Essay {
  id: string;
  user_id: string;
  essay_type: 'personal_statement' | 'uc_piq' | 'why_us' | ...;
  prompt_text: string;
  max_words: number;
  draft_original: string;
  context_constraints?: string;
  intended_major?: string;
  target_school?: string;
  version: number;
  submitted_at?: Date;
}
```

### AnalysisReport
```typescript
interface AnalysisReport {
  essay_id: string;
  rubric_version: string;
  dims: RubricDimScore[];
  weights: Record<string, number>;
  essay_quality_index: number; // 0-100
  impression_label: 'arresting_deeply_human' | 'compelling_clear_voice' | ...;
  flags: string[];
  elite_pattern_profile: ElitePatternProfile;
  prioritized_levers: string[];
}
```

### CoachingPlan
```typescript
interface CoachingPlan {
  essay_id: string;
  outline_variants: string[];
  micro_edits: MicroEdit[];
  rewrites_by_style: Record<VoiceStyle, string>;
  elicitation_prompts: Record<string, string[]>;
  guardrails: string[];
  word_budget_guidance: string;
  school_alignment_todo?: string[];
}
```

### ApplicationSet
```typescript
interface ApplicationSet {
  user_id: string;
  essays: Essay[];
  voice_fingerprint: VoiceFingerprint;
  fact_graph: FactGraph;
  motif_map: Record<string, string[]>;
}
```

---

## API Endpoints

### Core Operations

```
POST   /api/essays                     Create/update essay
POST   /api/essays/:id/analyze         Run Analysis Engine
POST   /api/essays/:id/coach           Run Story Coach Engine
POST   /api/essays/:id/simulate-eqi    Run ΔEQI simulator
GET    /api/essays/:id/report          Get latest analysis report

POST   /api/applications/:user_id/coherence   Cross-essay coherence check
GET    /api/applications/:user_id/essays      Get all essays for user

GET    /api/rubrics                    List rubric versions
GET    /api/rubrics/:version           Get specific rubric definition
```

### Sequence: Analyze → Coach

1. **Validate** input, redact PII, attach rubric version
2. **Call Analysis Engine** (Claude JSON mode, temp 0.2–0.3)
3. **Post-process**: compute EQI, apply interaction rules, rank levers
4. **Call Story Coach Engine** (optional, Claude creative mode, temp 0.6–0.8)
5. **Persist** artifacts, return response

---

## Prompting Strategy

### Analysis Prompt (Strict JSON)

**System**:
> You are a senior admissions reader and narrative analyst. Score only by the Essay Rubric. Quote exact text to justify each dimension. Apply interaction rules and caps. Do not coach. Return strict JSON.

**User content**:
- Rubric dims + weight map + interaction rules + band labels
- Elite Pattern definitions (with miniature examples)
- Essay object (prompt, type, max words, draft)
- Context about whether "Why us" applies

**Constraints**:
- JSON mode ON
- Temperature 0.2–0.3
- Max output ~1200 tokens
- No suggestions

---

### Coaching Prompt (Creative with Content-Lock)

**System**:
> You are a story coach and editor. Preserve facts; never invent achievements. Offer 2–3 distinct outlines, targeted micro-edits with rationales, and 2–3 rewrites in different voice registers that retain the writer's fingerprint. Use elicitation prompts where evidence is missing. Respect word budget.

**User content**:
- Original essay + AnalysisReport (scores, flags, levers, elite profile)
- Guardrail list (banned phrases, anti-saviorism, anti-brochure)
- Word budget + essay type + target school (if any)

**Constraints**:
- Temperature 0.6–0.8
- Creative mode
- Max output ~3000 tokens
- **Fact-lock middleware**: Rewrites cannot add awards, titles, or affiliations

---

## Anti-Robotic Guardrails

### Banned/Penalized Phrases
- "passionate about"
- "I have always"
- Dictionary definitions as openings
- Famous quotations as hooks
- Brochure copy in "Why us" essays

### Detection Systems
- **Buzzword density**: Flag essays with >5 clichés per 100 words
- **Passive→Active**: Suggest replacements with examples
- **Cadence variance**: Measure sentence length distribution
- **Voice drift**: Compare rewrites to original voice fingerprint
- **Fact-lock middleware**: Block addition of unverified claims

### Plagiarism & AI-Template Sentinel
- N-gram overlap vs. internal template corpus
- Alert on "essay voice" clichés
- Flag if voice-drift exceeds threshold (cosine distance >0.3)

---

## Testing Strategy

### Unit Tests (≥90% coverage for logic-heavy modules)
- Scene parser, dialogue extractor, interiority detector
- Voice fingerprint, fact graph, ΔEQI simulator
- Interaction rules, dependency caps
- Guardrail detection (banned phrases, voice drift)

### Integration Tests
- Analysis API on synthetic set (≥150 essays spanning all types)
- Coaching API with fact-lock verification
- Cross-essay coherence with known conflicts

### End-to-End Tests
- Full pipeline: essay → analysis → coaching → ΔEQI
- Batch run on 100-essay validation set
- Freeze golden JSON outputs for regression testing

### Property-Based/Fuzz Tests
- Malformed paragraphs, emoji, code-switching
- Very long sentences (>100 words)
- Essays with missing fields

### Human-in-Loop Validation
- Nightly 10-essay sample
- Reader scores vs. system scores (track agreement)
- Accept/modify/reject rates for coaching suggestions

---

## Self-Improvement Loop

```python
loop:
  run linters + unit tests
  if fail: propose fixes → apply → re-run; else open PR and pause
  run integration + E2E on seeded sets
  compute metrics: MAE per dim, scene recall, dialogue F1, drift rate
  identify gaps vs thresholds
  rank patches by (severity * frequency)
  for each low-risk patch:
      apply; re-run tests & metrics; keep if net-positive
  for high-risk (rubric changes/guardrails/privacy):
      open PR, wait human sign-off
  if all thresholds met → emit summary & stop
  else iterate or await guidance
```

**CLI**: `npm run self-improve -- --max-iterations 10`

---

## Quality Gates & Acceptance Criteria

### Code Quality
- ✅ 95% linter/type pass
- ✅ ≥85% test coverage for core modules
- ✅ 0 critical security violations (PII leakage, fabrication)

### Functional Accuracy
- ✅ MAE per dimension ≤ 1.0 vs. human mean (gold set)
- ✅ Scene detection recall ≥ 0.9
- ✅ Dialogue extraction F1 ≥ 0.85
- ✅ Voice-drift distance < 0.3 (cosine) for rewrites

### Guardrails
- ✅ 0 fabricated facts in coaching outputs
- ✅ Banned phrase detection precision ≥ 0.95
- ✅ PII redaction 100% effective (verified via test suite)

### Human Artifacts
- ✅ Each run yields 5-sentence summary + top 5 actions
- ✅ Explainable: every score linked to verbatim quotes

**If unmet**: produce remediation plan; halt at human checkpoint

---

## Observability & Monitoring

### Metrics Tracked
- **Cost**: Token usage (input, output, cache), dollar cost per essay
- **Latency**: P50, P95, P99 for analysis, coaching, E2E
- **Quality**: MAE per dimension, EQI distribution, accept rate
- **Drift**: Score variance week-over-week, prompt/rubric version impact

### Logging
- Structured logs (JSON) with trace IDs
- Every Claude call logged with: prompt hash, model, temperature, usage
- Errors tagged with: essay_id, rubric_version, failure_mode

### Alerting
- Score drift >10% from baseline → notify team
- PII leak detected → block deployment, page on-call
- Cost spike >2x average → throttle, alert billing

---

## Roadmap

### v1.0 (Phase 1, weeks 1–6)
- ✅ Analysis Engine w/ full essay rubric (12 dims)
- ✅ Story Coach w/ 2 voice styles + micro-edits
- ✅ ΔEQI simulator
- ✅ Coherence v0 (voice/facts)
- ✅ Unit + integration tests (≥85% coverage)

### v1.1 (Phase 2, weeks 7–9)
- School-fit mapper w/ curated resource bank
- Multilingual/dialect support
- Adaptive weights by essay type
- Enhanced elite pattern detector

### v1.2 (Phase 3, weeks 10–12)
- Conversational Ask-3-Write-1 elicitation loop
- Motif mapper across essays
- Counter-narrative coaching
- Reviewer training kit

### v2.0 (Phase 4, months 4–6)
- Learned caps from human overrides
- A/B testing framework for rubric variants
- Real-time collaboration (counselor ↔ student)
- Mobile-optimized UI

---

## Human Checkpoint Template

```markdown
# PHASE {N} CHECKPOINT — SUMMARY

**Design Doc**: v{X}
**Test Coverage**: {YY%}
**Tests Pass**: {Yes/No}

## Top Metrics
- MAE (avg across dims): {X.XX}
- Scene Recall: {0.XX}
- Dialogue F1: {0.XX}
- Voice Drift Rate: {0.XX}
- Cost per Essay: ${X.XX}

## Top 5 Issues / Actions
1. ...
2. ...
3. ...
4. ...
5. ...

## Proceed to Phase {N+1}?
[ ] YES — All gates passed
[ ] REQUEST CHANGES — See notes above
```

---

## Security & Privacy

### PII Handling
- **Redaction by default**: Names, addresses, phone numbers
- **Separate KMS**: PII vault with encryption at rest
- **Anonymization**: Test sets use synthetic data only

### Data Retention
- Drafts/diffs: 12 months
- Hard delete on user request (GDPR/CCPA compliant)
- Logs: 90 days, aggregated metrics indefinitely

### Ethical Safeguards
- No fabrication of achievements
- Bias monitoring: score distribution by resource constraints
- Avoid saviorism narratives (auto-flag + manual review)
- Respect for dialect and code-switching

---

## Directory Structure

```
src/core/essay/
├── types/
│   ├── essay.ts              # Essay, AnalysisReport, CoachingPlan schemas
│   ├── rubric.ts             # RubricDimScore, weights, interaction rules
│   └── coherence.ts          # VoiceFingerprint, FactGraph, MotifMap
├── rubrics/
│   ├── v1.0.0.ts             # Essay Rubric v1.0.0 (12 dimensions)
│   └── README.md             # Rubric versioning policy
├── analysis/
│   ├── engine.ts             # Main analysis orchestrator
│   ├── features/
│   │   ├── sceneDetector.ts
│   │   ├── dialogueExtractor.ts
│   │   ├── interiorityDetector.ts
│   │   └── elitePatternDetector.ts
│   └── scoring/
│       ├── rubricScorer.ts
│       └── interactionRules.ts
├── coaching/
│   ├── engine.ts             # Main coaching orchestrator
│   └── strategies/
│       ├── outliner.ts
│       ├── microEditor.ts
│       ├── rewriter.ts
│       ├── elicitationBuilder.ts
│       └── guardRails.ts
├── coherence/
│   ├── voiceFingerprint.ts
│   ├── factGraph.ts
│   ├── motifMapper.ts
│   └── antiGhostwrite.ts
├── simulator/
│   └── deltaEQI.ts
└── utils/
    ├── piiRedactor.ts
    └── tokenEstimator.ts

tests/essay/
├── unit/
│   ├── sceneDetector.test.ts
│   ├── dialogueExtractor.test.ts
│   ├── rubricScorer.test.ts
│   └── ...
├── integration/
│   ├── analysisEngine.test.ts
│   ├── coachingEngine.test.ts
│   └── coherence.test.ts
├── e2e/
│   └── fullPipeline.test.ts
└── fixtures/
    ├── sample-essays/
    └── golden-outputs/

docs/essay/
├── architecture/
│   └── ARCHITECTURE.md       # This file
├── rubrics/
│   └── rubric-v1.0.0.md      # Full rubric specification
├── prompts/
│   ├── analysis-prompt.md
│   └── coaching-prompt.md
└── quality-reports/
    └── phase-{N}-checkpoint.md
```

---

## Revision History

| Version | Date       | Changes                                      | Author |
|---------|------------|----------------------------------------------|--------|
| 1.0.0   | 2025-11-05 | Initial architecture document                | System |

---

**End of Architecture Document**
