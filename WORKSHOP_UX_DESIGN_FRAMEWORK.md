# Extracurricular Narrative Workshop — UX Design Framework
## Version 1.1 | Integration-Ready Design Specification

**Purpose:** Define the complete user experience for teaching students to transform weak extracurricular narratives into authentic, admissions-ready entries through pedagogically sound, engaging, and efficient guided practice.

**Status:** Phase 0 Design Document
**Last Updated:** 2025-11-11

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [User Journey Overview](#2-user-journey-overview)
3. [Core UX Principles](#3-core-ux-principles)
4. [Issue-Specific Teaching Flows](#4-issue-specific-teaching-flows)
5. [Teaching Unit Structure](#5-teaching-unit-structure)
6. [UI Component Specifications](#6-ui-component-specifications)
7. [Interaction Patterns](#7-interaction-patterns)
8. [Feedback Mechanisms](#8-feedback-mechanisms)
9. [Progress Visualization](#9-progress-visualization)
10. [Example Walkthroughs](#10-example-walkthroughs)
11. [Implementation Priorities](#11-implementation-priorities)

---

## 1. Design Philosophy

### Core Values
1. **Teach, Don't Tell** - Every correction is a learning opportunity with transferable principles
2. **Show, Don't Lecture** - Use real before/after examples from admitted students
3. **Guide, Don't Dictate** - Offer multiple fix strategies; let students choose their voice
4. **Reflect, Don't Rush** - Use guided questions to help students dig deeper
5. **Iterate, Don't Perfect** - Focus on meaningful improvement, not perfection

### Pedagogical Approach
- **Scaffolded Learning:** Start with fundamentals, build to advanced techniques
- **Multiple Modalities:** Explain principle → Show example → Practice application
- **Active Learning:** Students write first, AI assists second
- **Immediate Feedback:** Real-time scoring after each revision attempt
- **Metacognition:** Help students understand *why* something works, not just *what* to do

### Tone & Voice
- **Mentor, not critic:** Encouraging, supportive, believes in student potential
- **Concise, not verbose:** Respect student time; no walls of text
- **Specific, not generic:** Point to exact spans, offer concrete suggestions
- **Authentic, not corporate:** Natural language, occasional humor, human warmth

---

## 2. User Journey Overview

### Entry Points
1. **From Portfolio:** Student clicks "Improve this entry" on existing extracurricular
2. **From Dashboard:** "Workshop an Entry" CTA card
3. **From Onboarding:** Suggested during initial profile setup
4. **From Smart Prompts:** System detects weak entry, offers workshop

### Complete Journey Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. WELCOME & CONTEXT                                        │
│    - Brief intro (30 seconds read)                          │
│    - What to expect: 3 issues, ~15-20 min                   │
│    - Can save & return anytime                              │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. DIAGNOSIS                                                │
│    - Show original entry in locked view                     │
│    - Run analysis (2-3 sec loading)                         │
│    - Display Current NQI score with visualization           │
│    - Reveal top 3 prioritized issues                        │
│    - Show potential gain: "Could reach NQI 78 (+15)"        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. TEACHING LOOP (repeat for each issue)                   │
│                                                             │
│    A. UNDERSTAND THE PROBLEM                                │
│       - Highlight problematic span in draft                 │
│       - Short explanation (1-2 sentences)                   │
│       - Why admissions officers care                        │
│                                                             │
│    B. LEARN THE PRINCIPLE                                   │
│       - Introduce principle name (e.g., "Anchor with Numbers")│
│       - 2-3 sentence description                            │
│       - When to use / when to skip                          │
│                                                             │
│    C. SEE IT IN ACTION                                      │
│       - Show 1-2 before/after examples                      │
│       - Annotation: what changed and why                    │
│       - Real example from admitted student                  │
│                                                             │
│    D. EXPLORE & REFLECT                                     │
│       - 2-3 adaptive guided questions                       │
│       - Open text inputs (100-300 chars)                    │
│       - AI reads responses, personalizes next step          │
│                                                             │
│    E. CHOOSE YOUR FIX STRATEGY                              │
│       - Present 2-3 different approaches                    │
│       - Examples of each approach                           │
│       - Student selects preferred strategy                  │
│                                                             │
│    F. REWRITE & PRACTICE                                    │
│       - Editor with original text pre-filled                │
│       - Inline hints for selected strategy                  │
│       - Character counter, real-time validation             │
│       - "Need help?" → AI suggestion button                 │
│                                                             │
│    G. REGRADE & COMPARE                                     │
│       - Run analysis on new version                         │
│       - Show delta: "+2.3 points in Specificity"            │
│       - Visual before/after comparison                      │
│       - Accept or iterate again                             │
│                                                             │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. FINAL REGRADE & SUMMARY                                  │
│    - Show overall NQI improvement                           │
│    - Category-by-category delta chart                       │
│    - Learning summary: principles practiced                 │
│    - Iteration count & time spent                           │
│    - Option to continue improving or save                   │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. SAVE & EXPORT                                            │
│    - Replace original entry OR save as new version          │
│    - Add to portfolio automatically                         │
│    - "Practice another entry" CTA                           │
└─────────────────────────────────────────────────────────────┘
```

### Time Budget
- **Quick Path (accept AI suggestions):** 10-12 minutes
- **Typical Path (student writes, iterates 1-2x per issue):** 15-20 minutes
- **Deep Path (multiple iterations, explores all options):** 25-30 minutes

---

## 3. Core UX Principles

### Principle 1: Progressive Disclosure
**Problem:** Showing all 11 rubric categories overwhelms students.
**Solution:** Focus on top 3 issues only. Hide complexity until needed.

**Implementation:**
- Show only critical/major issues upfront
- Collapsible "View full rubric breakdown" for curious students
- After fixing top 3, optionally reveal next tier of issues

---

### Principle 2: Transparent Grading
**Problem:** Black-box scoring feels arbitrary and frustrating.
**Solution:** Always explain score changes with evidence.

**Implementation:**
- Every score has a tooltip: "Based on: 3 concrete metrics, 1 before/after, strong reflection"
- Delta explanations: "+2.3 because you added specific numbers and timeframe"
- Link score components to highlighted text spans

---

### Principle 3: Multiple Entry Points (Student Choice)
**Problem:** Different students learn differently.
**Solution:** Always offer 2-3 fix strategies with different approaches.

**Example:**
Issue: "Missing quantified impact"

**Strategy A: Metric-Anchored** *(Best for data-driven students)*
"Add specific numbers that prove reach"
→ Example: "served 50+ students with 85% retention"

**Strategy B: Anecdote-Based** *(Best for storytellers)*
"Show impact through one person's transformation"
→ Example: "When Jake passed his first AP Calc exam, he called me crying—he'd never believed in himself before."

**Strategy C: Comparison-Based** *(Best for visual thinkers)*
"Use before/after contrast"
→ Example: "Before: 12 isolated programmers. After: 18-person community with mentorship pairs"

---

### Principle 4: Immediate, Actionable Feedback
**Problem:** Delayed feedback breaks learning momentum.
**Solution:** Real-time analysis after every rewrite attempt.

**Implementation:**
- No "save draft" button needed - auto-save every 3 seconds
- "Regrade Now" button always visible in editor
- Show estimated score impact while typing (debounced, 2sec delay)
- Visual cues: green checkmark when issue resolved

---

### Principle 5: Version History & Safety Net
**Problem:** Students fear "messing up" their original entry.
**Solution:** Never overwrite; always track versions.

**Implementation:**
- Original always preserved as "Version 0"
- Each iteration creates new version with timestamp
- "Restore to Version X" button
- Visual diff viewer between any two versions
- Final save: "Replace original" vs. "Save as new draft"

---

### Principle 6: Contextual Help (Just-in-Time)
**Problem:** Long tutorials upfront are ignored.
**Solution:** Provide help exactly when and where needed.

**Implementation:**
- Inline tooltips on hover
- "Why does this matter?" expandable cards
- "Show me an example" button in every teaching unit
- Contextual AI hints: "Having trouble? Try starting with a specific action verb"

---

## 4. Issue-Specific Teaching Flows

Each issue type follows a specialized flow optimized for that particular teaching moment.

---

### Issue 1: Missing Quantified Impact

**Severity:** Critical
**Category:** Specificity & Evidence (9% weight)
**Detection:** No numbers, metrics, or scale indicators

#### Flow Structure

**A. Problem Presentation**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ MISSING QUANTIFIED IMPACT                           │
│                                                         │
│ From your draft:                                        │
│ "I helped students learn programming through tutoring" │
│      └─ No scale: How many students? How often?        │
│                                                         │
│ Impact on score: -3 to -5 points in Specificity        │
│                                                         │
│ Why officers care:                                      │
│ Without numbers, they can't gauge depth of commitment  │
│ or effectiveness. Scale matters for leadership.        │
└─────────────────────────────────────────────────────────┘
```

**B. Principle Teaching**
```
┌─────────────────────────────────────────────────────────┐
│ 📊 PRINCIPLE: ANCHOR WITH NUMBERS                      │
│                                                         │
│ Admissions readers evaluate hundreds of "I helped      │
│ students" claims. Numbers cut through noise and prove  │
│ depth of engagement.                                    │
│                                                         │
│ What to quantify:                                       │
│ • Reach: How many people impacted?                      │
│ • Frequency: How often? (hours/week, sessions/month)   │
│ • Duration: Over what timespan?                         │
│ • Results: What measurable outcome?                     │
│                                                         │
│ When to skip: If your activity truly has no metrics,   │
│ use vivid anecdotes instead (we'll teach that next).   │
└─────────────────────────────────────────────────────────┘
```

**C. Elite Examples Carousel**
```
┌─────────────────────────────────────────────────────────┐
│ Example 1 of 2 — Harvard Admit (Community Service)     │
│                                                         │
│ ❌ BEFORE (Generic)                                     │
│ "I organized food drives for families in need"         │
│                                                         │
│ ✅ AFTER (Anchored)                                     │
│ "I coordinated weekly food drives serving 47 families  │
│  across 3 neighborhoods, delivering 2,800+ pounds of   │
│  groceries over 18 months"                             │
│                                                         │
│ What changed:                                           │
│ ✓ Added reach (47 families, 3 neighborhoods)           │
│ ✓ Added frequency (weekly)                             │
│ ✓ Added scale (2,800+ pounds)                          │
│ ✓ Added duration (18 months)                           │
│                                                         │
│ [← Previous] [Next →] [Skip Examples]                   │
└─────────────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│ Example 2 of 2 — MIT Admit (Research)                  │
│                                                         │
│ ❌ BEFORE (Vague)                                       │
│ "I analyzed datasets to find patterns"                 │
│                                                         │
│ ✅ AFTER (Precise)                                      │
│ "I processed 15,000+ data points over 6 months,        │
│  identifying 3 novel patterns that reduced prediction  │
│  error from 23% to 8%"                                 │
│                                                         │
│ What changed:                                           │
│ ✓ Quantified scope (15,000 data points)                │
│ ✓ Timeline (6 months)                                   │
│ ✓ Specific outcome (3 patterns)                        │
│ ✓ Measurable impact (23%→8% error reduction)           │
└─────────────────────────────────────────────────────────┘
```

**D. Reflection Prompts (Adaptive)**
```
┌─────────────────────────────────────────────────────────┐
│ 🤔 REFLECTION: Dig Deeper Into Your Impact             │
│                                                         │
│ Before you rewrite, answer these questions to unlock   │
│ specific details from your memory:                      │
│                                                         │
│ 1. How many people did you work with or serve?         │
│    Think about: students, teammates, community members │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: 100-300 chars]                     │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 2. What was your typical time commitment?              │
│    Example: "3 hours every Tuesday for 8 months"       │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: 100-300 chars]                     │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 3. What concrete outcome can you point to?             │
│    Think: products built, events run, people helped    │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: 100-300 chars]                     │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ [Continue →]                                            │
└─────────────────────────────────────────────────────────┘
```

**E. Fix Strategy Selection**
```
┌─────────────────────────────────────────────────────────┐
│ 🎯 CHOOSE YOUR FIX STRATEGY                            │
│                                                         │
│ Pick the approach that fits your voice:                │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy A: Metric-Focused (Recommended)         ││
│ │                                                      ││
│ │   Add specific numbers for reach, frequency, scale  ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "...serving 50+ students through 25 weekly        ││
│ │   Python workshops, with 85% returning for follow-up"│
│ │                                                      ││
│ │   Best for: Data-driven activities (research, STEM, ││
│ │   organizing large groups)                           ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy B: Before/After Transformation           ││
│ │                                                      ││
│ │   Show growth using comparative numbers              ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "...grew club membership from 12 to 73 over       ││
│ │   two years, launching 4 specialized tracks"        ││
│ │                                                      ││
│ │   Best for: Leadership roles, community building    ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy C: Outcome-Driven                        ││
│ │                                                      ││
│ │   Emphasize measurable results achieved             ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "...secured $3,200 in grants, enabling free       ││
│ │   materials for 61 low-income students"             ││
│ │                                                      ││
│ │   Best for: Advocacy, fundraising, resource work    ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ [Select Strategy →]                                     │
└─────────────────────────────────────────────────────────┘
```

**F. Editor with Contextual Hints**
```
┌─────────────────────────────────────────────────────────┐
│ ✏️ REWRITE: Add Quantified Impact                      │
│                                                         │
│ Strategy selected: Metric-Focused                       │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ I helped students learn programming through tutoring│ │
│ │ [Hint: Try adding: How many students? How often?]   │ │
│ │                                                      │ │
│ │                                                      │ │
│ │                                    287 / 700 chars  │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ Quick Hints for Strategy A:                            │
│ • Start with frequency: "Every Tuesday for..."         │
│ • Add reach: "serving 20+ freshmen..."                 │
│ • Include outcome: "with 90% retention rate"           │
│                                                         │
│ [Need Help? Get AI Suggestion] [Regrade Now]           │
└─────────────────────────────────────────────────────────┘
```

**G. Regrade with Delta Visualization**
```
┌─────────────────────────────────────────────────────────┐
│ 📊 REGRADE RESULTS                                     │
│                                                         │
│ Original version:                                       │
│ "I helped students learn programming through tutoring" │
│ ├─ Specificity Score: 3.2/10 ⚠️                        │
│ └─ NQI: 58                                              │
│                                                         │
│ Your rewrite:                                           │
│ "I tutored 15 freshmen weekly in Python for 2 years,  │
│  with 12 continuing to advanced courses"               │
│ ├─ Specificity Score: 7.8/10 ✅ (+4.6)                 │
│ └─ NQI: 65 (+7)                                         │
│                                                         │
│ What improved:                                          │
│ ✓ Added reach (15 freshmen)                            │
│ ✓ Added frequency (weekly)                             │
│ ✓ Added duration (2 years)                             │
│ ✓ Added outcome (12 continued to advanced)             │
│                                                         │
│ [✓ Accept This Version] [↻ Try Again] [< Back]         │
└─────────────────────────────────────────────────────────┘
```

---

### Issue 2: Missing Vulnerability/Authenticity

**Severity:** Major
**Category:** Voice Integrity (10% weight), Reflection & Meaning (12% weight)
**Detection:** No emotional markers, struggles, or personal growth shown

#### Flow Structure

**A. Problem Presentation**
```
┌─────────────────────────────────────────────────────────┐
│ 💭 MISSING VULNERABILITY                                │
│                                                         │
│ From your draft:                                        │
│ "I successfully led the robotics team to victory"      │
│      └─ Reads like a resume. Where's the human story?  │
│                                                         │
│ Impact on score: -2 to -4 points in Voice & Reflection │
│                                                         │
│ Why officers care:                                      │
│ Top schools want to see self-awareness and growth.     │
│ Showing struggle makes success more meaningful.        │
└─────────────────────────────────────────────────────────┘
```

**B. Principle Teaching**
```
┌─────────────────────────────────────────────────────────┐
│ 💙 PRINCIPLE: SHOW VULNERABILITY                       │
│                                                         │
│ Vulnerability ≠ Oversharing. It means:                  │
│ • Naming specific emotions (nervous, terrified, proud) │
│ • Physical symptoms (hands trembled, stomach churned)  │
│ • Honest struggles (didn't know, felt lost, failed)    │
│ • Before/after transformation (who you were → who now) │
│                                                         │
│ Red line: Don't write "I learned so much" (generic)    │
│ Green line: Write "I was terrified I'd fail him" (real)│
│                                                         │
│ Stanford research: Essays with named emotions + stakes │
│ score 40% higher in authenticity.                      │
└─────────────────────────────────────────────────────────┘
```

**C. Elite Examples Carousel**
```
┌─────────────────────────────────────────────────────────┐
│ Example 1 of 3 — Caltech Admit (Robotics)              │
│                                                         │
│ ❌ BEFORE (Resume-style)                                │
│ "I led the team through challenging builds"            │
│                                                         │
│ ✅ AFTER (Vulnerable)                                   │
│ "My hands trembled against cold aluminum—I was         │
│  terrified. Our robot had failed twice. I was          │
│  completely lost in algorithms I'd written myself."    │
│                                                         │
│ What changed:                                           │
│ ✓ Physical symptom (hands trembled)                    │
│ ✓ Named emotion (terrified)                            │
│ ✓ Honest struggle (completely lost)                    │
│ ✓ Stakes (failed twice)                                │
│                                                         │
│ [← Previous] [Next →]                                   │
└─────────────────────────────────────────────────────────┘
```

**D. Reflection Prompts (Deeper)**
```
┌─────────────────────────────────────────────────────────┐
│ 🤔 REFLECTION: Find Your Vulnerable Moment             │
│                                                         │
│ 1. What was the hardest part of this experience?       │
│    When did you feel uncertain, scared, or out of your │
│    depth? Describe that specific moment.               │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: Focus on ONE moment, not general]  │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 2. What physical sensations did you experience?        │
│    Examples: "my stomach dropped", "couldn't sleep",   │
│    "hands wouldn't stop shaking"                       │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: Be specific and honest]            │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 3. How did you feel BEFORE vs. AFTER this turned around?│
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Text input: Show transformation]               │ │
│    └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**E. Fix Strategy Selection**
```
┌─────────────────────────────────────────────────────────┐
│ 🎯 CHOOSE YOUR FIX STRATEGY                            │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy A: Emotional Honesty (Recommended)       ││
│ │                                                      ││
│ │   Name specific emotion + physical symptom          ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "I was terrified—completely out of my depth—when  ││
│ │   my hands shook through that first presentation"   ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy B: Before/After Transformation           ││
│ │                                                      ││
│ │   Show who you were then vs. who you are now        ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "Before: I'd never spoken to 200 people. After:   ││
│ │   I learned that fear means you care about getting  ││
│ │   it right"                                          ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy C: Struggle → Insight                    ││
│ │                                                      ││
│ │   Share specific challenge, then universal lesson   ││
│ │                                                      ││
│ │   Example:                                           ││
│ │   "Failing that prototype taught me: innovation     ││
│ │   isn't about perfect—it's about iterating fearlessly"│
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

### Issue 3: Vague Language (Buzzwords)

**Severity:** Major
**Category:** Specificity & Evidence (9% weight), Craft & Language (7% weight)
**Detection:** Generic adjectives ("passionate", "dedicated", "impactful")

#### Flow Structure

**A. Problem Presentation**
```
┌─────────────────────────────────────────────────────────┐
│ 🚫 VAGUE BUZZWORDS DETECTED                            │
│                                                         │
│ From your draft:                                        │
│ "I am passionate about helping underprivileged youth   │
│  through impactful mentorship"                         │
│   └─ "passionate", "impactful" = empty claims          │
│                                                         │
│ Impact on score: -2 to -3 points in Specificity & Craft│
│                                                         │
│ Why officers care:                                      │
│ Buzzwords signal lack of depth. Every applicant claims │
│ passion. Officers want EVIDENCE, not adjectives.       │
└─────────────────────────────────────────────────────────┘
```

**B. Principle Teaching**
```
┌─────────────────────────────────────────────────────────┐
│ 🎯 PRINCIPLE: REPLACE CLAIMS WITH EVIDENCE             │
│                                                         │
│ Delete these words on sight:                           │
│ ❌ passionate, dedicated, hardworking, impactful,       │
│    motivated, inspiring, transformative, meaningful    │
│                                                         │
│ Replace with:                                           │
│ ✅ Specific actions that PROVE the claim                │
│ ✅ Concrete results that SHOW the impact                │
│ ✅ Micro-anecdotes that DEMONSTRATE dedication          │
│                                                         │
│ The golden rule:                                        │
│ "Show me, don't tell me." Let actions speak.           │
└─────────────────────────────────────────────────────────┘
```

**C. Elite Examples**
```
┌─────────────────────────────────────────────────────────┐
│ Example 1 of 2 — Yale Admit (Debate)                   │
│                                                         │
│ ❌ BEFORE (Buzzword-heavy)                              │
│ "I passionately pursued debate, demonstrating           │
│  dedication and impactful leadership"                  │
│                                                         │
│ ✅ AFTER (Evidence-driven)                              │
│ "I woke at 5:30am every Saturday to coach novices,    │
│  watching Maya transform from terrified freshman to    │
│  state semifinalist"                                   │
│                                                         │
│ What changed:                                           │
│ ✗ Deleted: "passionately", "dedication", "impactful"   │
│ ✓ Added: Specific action (5:30am coaching)             │
│ ✓ Added: Concrete outcome (Maya → state semifinals)    │
│ ✓ Added: Personal detail (watched transformation)      │
└─────────────────────────────────────────────────────────┘
```

**D. Reflection Prompts**
```
┌─────────────────────────────────────────────────────────┐
│ 🤔 REFLECTION: Turn Claims Into Proof                  │
│                                                         │
│ 1. You wrote "passionate" or "dedicated" — what        │
│    ACTIONS prove this? What did you actually DO?       │
│    (Skip feelings, focus on verbs)                     │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ Example: "stayed after school 3 days/week"      │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 2. You wrote "impactful" — what SPECIFIC outcome       │
│    can you point to? Who changed and how?              │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ Example: "3 students passed who'd failed before"│ │
│    └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

### Issue 4: Unclear Leadership/Role

**Severity:** Major
**Category:** Role Clarity & Ownership (8% weight), Initiative & Leadership (10% weight)
**Detection:** No action verbs, no decision-making shown, passive voice

#### Flow Structure

**A. Problem Presentation**
```
┌─────────────────────────────────────────────────────────┐
│ 👤 UNCLEAR LEADERSHIP ROLE                             │
│                                                         │
│ From your draft:                                        │
│ "I was involved in organizing community events"        │
│      └─ "was involved" = passive. What did YOU do?     │
│                                                         │
│ Impact on score: -3 to -4 points in Role Clarity       │
│                                                         │
│ Why officers care:                                      │
│ They need to see YOUR specific contributions and       │
│ decisions. "Involvement" could mean anything.          │
└─────────────────────────────────────────────────────────┘
```

**B. Principle Teaching**
```
┌─────────────────────────────────────────────────────────┐
│ 💪 PRINCIPLE: DEMONSTRATE OWNERSHIP                    │
│                                                         │
│ Weak verbs that hide your role:                        │
│ ❌ involved in, participated in, helped with, part of  │
│                                                         │
│ Strong verbs that show agency:                         │
│ ✅ designed, organized, launched, recruited, taught,    │
│    negotiated, solved, built, led, created            │
│                                                         │
│ The ownership test:                                     │
│ Could this sentence apply to any team member? If yes,  │
│ you're not showing YOUR specific role.                 │
│                                                         │
│ Add decision moments: "When X failed, I chose to Y"    │
└─────────────────────────────────────────────────────────┘
```

**C. Elite Examples**
```
┌─────────────────────────────────────────────────────────┐
│ Example 1 of 2 — Stanford Admit (Service)              │
│                                                         │
│ ❌ BEFORE (Passive)                                     │
│ "I was part of a team that organized tutoring"         │
│                                                         │
│ ✅ AFTER (Active ownership)                             │
│ "I designed the intake system, matching 73 students    │
│  with tutors based on learning styles—cutting average  │
│  wait time from 18 to 9 minutes"                       │
│                                                         │
│ What changed:                                           │
│ ✓ Replaced "was part of" with "I designed"             │
│ ✓ Named specific system created                        │
│ ✓ Quantified outcome (18→9 min wait time)              │
│ ✓ Shows decision-making (matching by learning styles)  │
└─────────────────────────────────────────────────────────┘
```

**D. Fix Strategy Selection**
```
┌─────────────────────────────────────────────────────────┐
│ 🎯 CHOOSE YOUR FIX STRATEGY                            │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy A: Action Verb Replacement (Quickest)    ││
│ │                                                      ││
│ │   Replace passive phrases with strong action verbs  ││
│ │                                                      ││
│ │   "was involved in" → "organized and led"           ││
│ │   "helped with" → "built the system that"           ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy B: Decision Moment (Most powerful)       ││
│ │                                                      ││
│ │   Show a specific choice YOU made                   ││
│ │                                                      ││
│ │   "When attendance dropped, I redesigned..."        ││
│ │   "After the first failure, I chose to..."          ││
│ └─────────────────────────────────────────────────────┘│
│                                                         │
│ ┌─────────────────────────────────────────────────────┐│
│ │ ○ Strategy C: Before/After (Shows initiative)       ││
│ │                                                      ││
│ │   Contrast what existed vs. what YOU created        ││
│ │                                                      ││
│ │   "Before me: X. After: I built Y, resulting in Z"  ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

---

### Issue 5: Missing Reflection/Learning

**Severity:** Major
**Category:** Reflection & Meaning (12% weight - highest!)
**Detection:** No insight, learning, or connection to growth

#### Flow Structure

**A. Problem Presentation**
```
┌─────────────────────────────────────────────────────────┐
│ 💡 MISSING REFLECTION                                  │
│                                                         │
│ Your draft describes WHAT you did, but not what it     │
│ MEANT or how it changed you.                           │
│                                                         │
│ Impact on score: -4 to -6 points in Reflection (12%)   │
│                                                         │
│ Why officers care:                                      │
│ Maturity and self-awareness are TOP priorities.        │
│ They want students who reflect on experiences, not     │
│ just collect them.                                      │
└─────────────────────────────────────────────────────────┘
```

**B. Principle Teaching**
```
┌─────────────────────────────────────────────────────────┐
│ 🧠 PRINCIPLE: DEEPEN REFLECTION                        │
│                                                         │
│ Weak reflection (surface-level):                       │
│ ❌ "I learned a lot"                                    │
│ ❌ "This experience taught me the value of teamwork"    │
│ ❌ "I grew as a person"                                 │
│                                                         │
│ Deep reflection (transformation):                      │
│ ✅ Name SPECIFIC belief that changed                    │
│ ✅ Show HOW you think differently now                   │
│ ✅ Connect to broader human truth (universal insight)   │
│                                                         │
│ Formula for depth:                                      │
│ "I used to believe X. Through [specific moment],       │
│  I now understand Y. This matters because Z."          │
└─────────────────────────────────────────────────────────┘
```

**C. Elite Examples**
```
┌─────────────────────────────────────────────────────────┐
│ Example — Yale Admit (Mentorship)                      │
│                                                         │
│ ❌ BEFORE (Generic learning)                            │
│ "Through tutoring, I learned patience and the          │
│  importance of helping others"                         │
│                                                         │
│ ✅ AFTER (Deep reflection)                              │
│ "I used to think teaching meant having all the answers.│
│  When Jake asked 'Why does anyone care about parabolas?'│
│  I realized: real teaching isn't transferring facts—   │
│  it's helping someone discover why questions matter"   │
│                                                         │
│ What changed:                                           │
│ ✓ Named belief shift (having answers → asking questions)│
│ ✓ Specific trigger moment (Jake's question)            │
│ ✓ Universal insight (teaching = discovering meaning)   │
│ ✓ Shows maturity (meta-awareness about learning)       │
└─────────────────────────────────────────────────────────┘
```

**D. Reflection Prompts (Deepest)**
```
┌─────────────────────────────────────────────────────────┐
│ 🤔 REFLECTION: Uncover Your Transformation             │
│                                                         │
│ 1. What did you USED TO BELIEVE before this experience?│
│    (About yourself, others, the world, this topic)     │
│                                                         │
│    I used to believe...                                 │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Be specific - name the old assumption]         │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 2. What SPECIFIC MOMENT challenged that belief?        │
│                                                         │
│    But when [describe one moment]...                    │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [One scene, conversation, or failure]           │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 3. What do you NOW UNDERSTAND that you didn't before?  │
│                                                         │
│    Now I understand...                                  │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [The new insight - make it universal]           │ │
│    └─────────────────────────────────────────────────┘ │
│                                                         │
│ 4. How does this new understanding affect how you      │
│    approach OTHER areas of your life?                  │
│                                                         │
│    ┌─────────────────────────────────────────────────┐ │
│    │ [Show transfer beyond this one activity]        │ │
│    └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Teaching Unit Structure

### Standardized Template

Every teaching unit follows this structure for consistency and pedagogical soundness:

```typescript
interface TeachingUnit {
  // HEADER
  issue_id: string;
  priority: 1 | 2 | 3;
  status: 'locked' | 'active' | 'completed';

  // PROBLEM
  problem: {
    title: string;              // "Missing Quantified Impact"
    severity_badge: 'critical' | 'major' | 'minor';
    from_draft: {
      text: string;             // Highlighted problematic span
      start_pos: number;
      end_pos: number;
    };
    explanation: string;        // 1-2 sentences: what's wrong
    score_impact: string;       // "-3 to -5 points in Specificity"
    why_officers_care: string;  // Admissions reader perspective
  };

  // PRINCIPLE
  principle: {
    name: string;               // "ANCHOR WITH NUMBERS"
    icon: string;               // Emoji for visual recognition
    description: string;        // 2-3 sentences: the transferable concept
    when_to_use: string;        // Guidance on applicability
    when_to_skip: string;       // When this principle doesn't apply
    skill_level: 'fundamental' | 'intermediate' | 'advanced';
  };

  // EXAMPLES
  examples: Array<{
    id: string;
    school: string;             // "Harvard", "MIT", "Stanford"
    category: string;           // "Community Service", "Research"
    before: string;
    after: string;
    annotation: string[];       // Bullet points: what changed
    key_technique: string;
  }>;

  // REFLECTION
  reflection: {
    intro: string;              // "Before you rewrite, dig deeper..."
    prompts: Array<{
      question: string;
      placeholder: string;
      char_min: number;
      char_max: number;
      help_text?: string;
    }>;
  };

  // FIX STRATEGIES
  strategies: Array<{
    id: string;
    name: string;               // "Metric-Focused"
    description: string;
    example: string;
    best_for: string;           // "Data-driven activities"
    recommended: boolean;
  }>;

  // WORKSPACE
  workspace: {
    original_text: string;
    current_draft: string;
    selected_strategy: string | null;
    hints: string[];
    iterations: number;
  };

  // RESULTS
  results: {
    previous_score: number;
    current_score: number;
    delta: number;
    feedback: string;
    accepted: boolean;
  } | null;
}
```

### Visual Design Patterns

#### Color Coding
- **Critical issues:** Red accent (#DC2626)
- **Major issues:** Amber accent (#F59E0B)
- **Minor issues:** Blue accent (#3B82F6)
- **Completed:** Green accent (#10B981)
- **In progress:** Purple accent (#8B5CF6)

#### Typography
- **Principle names:** Bold, uppercase, 14px
- **Explanations:** Regular, 16px line-height 1.6
- **Examples:** Monospace font for before/after pairs
- **Student inputs:** Sans-serif, 16px (mobile-optimized)

#### Spacing
- **Unit sections:** 24px vertical padding between sections
- **Examples:** 16px padding, 8px border-radius
- **Inputs:** 48px min-height for text areas

---

## 6. UI Component Specifications

### Component 1: Issue Rail (Left Sidebar)

**Purpose:** Overview of all detected issues with quick navigation

**Layout:**
```
┌────────────────────────┐
│ YOUR ISSUES (3)        │
│                        │
│ Current NQI: 58        │
│ Target NQI: 75 (+17)   │
│ ━━━━━━━━━━━ 40%       │
│                        │
│ ┌────────────────────┐ │
│ │ 1. ⚠️ Quantified   │ │
│ │    Impact          │ │
│ │    [In Progress]   │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ 2. 💭 Vulnerability│ │
│ │                    │ │
│ │    [Not Started]   │ │
│ └────────────────────┘ │
│                        │
│ ┌────────────────────┐ │
│ │ 3. 🚫 Buzzwords    │ │
│ │                    │ │
│ │    [Not Started]   │ │
│ └────────────────────┘ │
│                        │
│ [View Full Rubric ▼]  │
└────────────────────────┘
```

**Interactions:**
- Click issue card → expand teaching unit in main panel
- Hover → show preview tooltip with score impact
- Completed issues show green checkmark + delta
- Can skip between issues non-linearly

**Responsive:**
- Desktop: 280px fixed width sidebar
- Tablet: Collapsible drawer
- Mobile: Top horizontal scroll cards

---

### Component 2: Teaching Unit Card (Main Panel)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Issue 1 of 3                             [Skip ›]  [× ] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ⚠️ PROBLEM: MISSING QUANTIFIED IMPACT                  │
│ Costing you: -3 to -5 points                           │
│                                                         │
│ [Problem details section - collapsible]                │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ 📊 PRINCIPLE: ANCHOR WITH NUMBERS                      │
│                                                         │
│ [Principle explanation - collapsible]                  │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ ✨ SEE IT IN ACTION                                    │
│                                                         │
│ [Example carousel - 2-3 examples]                      │
│                                                         │
│ ─────────────────────────────────────────────────────  │
│                                                         │
│ 🤔 REFLECT & EXPLORE                                   │
│                                                         │
│ [Reflection prompts - text inputs]                     │
│                                                         │
│ [Continue to Strategies →]                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Progressive States:**
1. **Problem View** (initial)
2. **Principle View** (after reading problem)
3. **Examples View** (after understanding principle)
4. **Reflection View** (after seeing examples)
5. **Strategy Selection** (after reflection)
6. **Editor View** (after selecting strategy)
7. **Results View** (after regrade)

**Transitions:** Smooth scroll between sections, not page reloads

---

### Component 3: Before/After Carousel

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ Example 1 of 2 — Harvard Admit (Community Service)     │
│                                           [‹] 1/2 [›]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ ❌ BEFORE                                               │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ "I organized food drives for families in need"      │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ✅ AFTER                                                │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ "I coordinated weekly food drives serving 47        │ │
│ │  families across 3 neighborhoods, delivering 2,800+ │ │
│ │  pounds of groceries over 18 months"                │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 💡 WHAT CHANGED                                        │
│ ✓ Added reach (47 families, 3 neighborhoods)           │
│ ✓ Added frequency (weekly)                             │
│ ✓ Added scale (2,800+ pounds)                          │
│ ✓ Added duration (18 months)                           │
│                                                         │
│ [Apply This Technique ›]                                │
└─────────────────────────────────────────────────────────┘
```

**Interactions:**
- Swipe left/right on mobile
- Arrow keys for desktop navigation
- "Apply This Technique" → pre-fills strategy selection
- Hover annotations highlight changed text with color coding

---

### Component 4: Strategy Selection Cards

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ 🎯 CHOOSE YOUR FIX STRATEGY                            │
│                                                         │
│ Pick the approach that fits your voice:                │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ⭐ Strategy A: Metric-Focused          [Select]     │ │
│ │                                                      │ │
│ │ Add specific numbers for reach, frequency, scale    │ │
│ │                                                      │ │
│ │ Example: "serving 50+ students through 25 weekly..." │ │
│ │                                                      │ │
│ │ Best for: Research, STEM, organizing large groups   │ │
│ │ Difficulty: ⚫⚫⚪⚪ Easy                              │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ [2 more strategy cards...]                             │
│                                                         │
│ Not sure? [Get Recommendation]                         │
└─────────────────────────────────────────────────────────┘
```

**Interactions:**
- Hover → expand to show more detailed example
- Click [Select] → proceed to editor with strategy loaded
- [Get Recommendation] → AI analyzes reflection responses, suggests best fit

---

### Component 5: Smart Editor with Inline Hints

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ ✏️ REWRITE: Add Quantified Impact                      │
│                                                         │
│ Strategy: Metric-Focused                                │
│ Original: "I helped students learn programming through │
│            tutoring"                                    │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ I helped students learn programming through tutoring│ │
│ │ │                                                    │ │
│ │ │ [Hint: Add "how many students?"]                  │ │
│ │ │                                                    │ │
│ │ │                                                    │ │
│ │ │                                                    │ │
│ │ │                                    287 / 700 chars│ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ 💡 Quick Hints for Metric-Focused:                     │
│ • Start with frequency: "Every Tuesday for..."         │
│ • Add reach: "serving 20+ freshmen..."                 │
│ • Include outcome: "with 90% retention rate"           │
│                                                         │
│ [💬 Need Help? Get AI Suggestion]  [📊 Regrade Now]    │
│                                                         │
│ ⚡ Real-time score estimate: Specificity 3.2 → ~7.5    │
└─────────────────────────────────────────────────────────┘
```

**Smart Features:**
1. **Contextual Hints:** Update based on what student has written
2. **Real-time Validation:** Check character count, detect if still using buzzwords
3. **Score Estimation:** Debounced analysis (2sec delay) shows predicted improvement
4. **Auto-save:** Every 3 seconds to version history

**Interactions:**
- [Get AI Suggestion] → Modal with 2-3 AI-generated alternatives
- [Regrade Now] → Full analysis, transition to results view
- Inline hints disappear once addressed (e.g., student adds a number)

---

### Component 6: Delta Visualization (Results)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ 📊 REGRADE RESULTS                                     │
│                                                         │
│ ┌─────────────────┬─────────────────────────────────┐  │
│ │ BEFORE          │ AFTER                           │  │
│ ├─────────────────┼─────────────────────────────────┤  │
│ │ NQI: 58         │ NQI: 65  ↑ +7                  │  │
│ │                 │                                 │  │
│ │ Specificity:    │ Specificity:                    │  │
│ │ 3.2/10 ⚠️       │ 7.8/10 ✅  ↑ +4.6               │  │
│ │ ▓▓▓░░░░░░░      │ ▓▓▓▓▓▓▓▓░░                     │  │
│ └─────────────────┴─────────────────────────────────┘  │
│                                                         │
│ 💡 WHAT IMPROVED                                       │
│ ✓ Added reach (15 freshmen)                            │
│ ✓ Added frequency (weekly)                             │
│ ✓ Added duration (2 years)                             │
│ ✓ Added outcome (12 continued to advanced)             │
│                                                         │
│ ⚠️ STILL NEEDS WORK                                    │
│ • Consider adding reflection on what you learned       │
│ • Could strengthen with one specific student anecdote  │
│                                                         │
│ [✓ Accept This Version]  [↻ Try Again]  [‹ Back]      │
└─────────────────────────────────────────────────────────┘
```

**Visualizations:**
- **Bar charts:** Category scores before/after
- **Delta badges:** Green +X or red -X with arrows
- **Progress rings:** Circular progress for NQI
- **Heatmap:** All 11 categories with color gradients

---

### Component 7: Progress Tracker (Sticky Header)

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [← Exit]  Extracurricular Workshop       [Save] [Help] │
├─────────────────────────────────────────────────────────┤
│ Issue 1 of 3 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 33%      │
│                                                         │
│ Current NQI: 65 (+7 from start)  Target: 75  [10 away] │
└─────────────────────────────────────────────────────────┘
```

**Always Visible:** Sticky at top, collapses on scroll to slim version

**Interactions:**
- Click progress bar → jump to specific issue
- [Exit] → "Save progress?" modal
- [Help] → Contextual help based on current section

---

## 7. Interaction Patterns

### Pattern 1: Adaptive Scaffolding (Support Levels)

The system adjusts support based on student progress:

**Level 1: Teach (Default)**
- Full explanations, examples, reflection prompts
- All hints visible
- Explicit guidance

**Level 2: Hint (After 1 successful iteration)**
- Shorter explanations
- Hints on hover only
- Student expected to apply principles independently

**Level 3: Assist (After 2+ successful iterations)**
- Minimal scaffolding
- Only AI suggestion button available
- Student drives improvement

**Trigger:** System detects successful pattern application → reduces scaffolding

---

### Pattern 2: Multi-Modal Feedback

Every action gets feedback in **3 channels**:

1. **Visual:** Color change, icon animation, progress bar update
2. **Textual:** Explanation of what changed and why
3. **Numerical:** Score delta with exact points

**Example:**
```
Student adds "15 freshmen weekly for 2 years"

Visual:    Green highlight on new text, checkmark animation
Textual:   "✓ Added reach (15 freshmen)"
Numerical: "Specificity: 3.2 → 7.8 (+4.6)"
```

---

### Pattern 3: Non-Linear Navigation

Students can:
- Skip issues and return later
- Jump between teaching unit sections
- Access version history at any time
- Exit and resume without losing progress

**Implementation:**
- Each teaching unit is self-contained
- State persisted to database every 3 seconds
- "Resume where you left off" on re-entry

---

### Pattern 4: Confidence-Based AI Suggestions

AI suggestions vary by confidence level:

**High Confidence (>0.8):**
```
"Try this: 'I tutored 20+ students weekly, with 85%
advancing to AP courses'"
[Apply This]
```

**Medium Confidence (0.5-0.8):**
```
"Here are 3 options:
1. Focus on reach: "serving 20+ students..."
2. Focus on frequency: "meeting weekly for 2 years..."
3. Focus on outcome: "with 15 continuing to advanced..."
[Show me more]
```

**Low Confidence (<0.5):**
```
"I need more context. Try answering these questions first:
• How many students did you work with?
• How often did you meet?
[Back to Reflection]
```

---

### Pattern 5: Micro-Commits (Save Often)

Every significant action auto-saves:
- Reflection prompt answered → saved
- Strategy selected → saved
- Draft edited (3sec debounce) → saved
- Regrade completed → saved as new version

**Benefit:** Students never lose work; can experiment freely

---

## 8. Feedback Mechanisms

### Feedback Loop 1: Immediate (Real-Time)

**Trigger:** Student types in editor
**Delay:** 2 seconds (debounced)
**Feedback:** Inline score estimation

```
"⚡ Real-time estimate: Specificity 3.2 → ~7.5"
```

**Limitations:** Only basic checks (character count, number detection, buzzword removal)

---

### Feedback Loop 2: On-Demand (Regrade)

**Trigger:** Student clicks [Regrade Now]
**Delay:** 2-3 seconds (full analysis)
**Feedback:** Complete delta report with visual comparison

**Includes:**
- All 11 category scores
- NQI change
- Specific improvements detected
- Remaining issues
- Next steps suggestion

---

### Feedback Loop 3: Checkpoint (After Each Issue)

**Trigger:** Student accepts rewrite for one issue
**Feedback:** Celebration moment + progress update

```
┌─────────────────────────────────────────────────────────┐
│ 🎉 ISSUE 1 COMPLETE!                                   │
│                                                         │
│ You improved Specificity by +4.6 points                │
│                                                         │
│ Principle learned: ANCHOR WITH NUMBERS                 │
│ You can now apply this to other entries!               │
│                                                         │
│ Progress: 1 of 3 issues complete  [Continue →]         │
└─────────────────────────────────────────────────────────┘
```

---

### Feedback Loop 4: Session Summary (Final)

**Trigger:** All 3 issues addressed
**Feedback:** Comprehensive learning report

```
┌─────────────────────────────────────────────────────────┐
│ 🏆 WORKSHOP COMPLETE!                                  │
│                                                         │
│ ┌───────────────────────────────────────────────────┐  │
│ │ Overall Improvement                               │  │
│ │ Starting NQI: 58                                  │  │
│ │ Final NQI: 72                                     │  │
│ │ Improvement: +14 points                           │  │
│ │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 93%                │  │
│ └───────────────────────────────────────────────────┘  │
│                                                         │
│ 📚 PRINCIPLES LEARNED                                  │
│ ✓ Anchor with Numbers                                  │
│ ✓ Show Vulnerability                                   │
│ ✓ Replace Claims with Evidence                         │
│                                                         │
│ ⏱️ SESSION STATS                                       │
│ Time spent: 18 minutes                                 │
│ Iterations: 4                                           │
│ AI assists used: 1                                      │
│                                                         │
│ 🎯 NEXT STEPS                                          │
│ • Practice these principles on your other entries      │
│ • Target NQI 75+ for top-tier schools                  │
│ • Consider adding dialogue for even more authenticity  │
│                                                         │
│ [Save Final Version] [Workshop Another Entry]          │
└─────────────────────────────────────────────────────────┘
```

---

## 9. Progress Visualization

### Visualization 1: NQI Progress Ring

**Purpose:** Show overall improvement at a glance

```
      ╭────────────╮
    ╱   72        ╲
   │               │
   │  ━━━━━━━◉─   │  Target: 75
   │   +14        │
    ╲  from 58    ╱
      ╰────────────╯
```

**Color Coding:**
- Red (0-40): Needs major work
- Amber (41-64): Needs improvement
- Blue (65-74): Good, close to target
- Green (75+): Excellent, ready

---

### Visualization 2: Category Heatmap

**Purpose:** Show which categories improved most

```
┌─────────────────────────────────────────────────────────┐
│ CATEGORY BREAKDOWN                                      │
│                                                         │
│ Voice Integrity       ▓▓▓▓▓▓░░░░  6.2  (+1.5)          │
│ Specificity           ▓▓▓▓▓▓▓▓░░  7.8  (+4.6) ⭐       │
│ Impact                ▓▓▓▓▓░░░░░  5.1  (+0.3)          │
│ Role Clarity          ▓▓▓▓▓▓▓░░░  7.2  (+2.1)          │
│ Narrative Arc         ▓▓▓▓░░░░░░  4.5  (+0.0)          │
│ Leadership            ▓▓▓▓▓▓░░░░  6.8  (+1.2)          │
│ Collaboration         ▓▓▓▓▓░░░░░  5.5  (+0.2)          │
│ Reflection            ▓▓▓▓░░░░░░  4.2  (-0.3) ⚠️       │
│ Craft                 ▓▓▓▓▓▓░░░░  6.5  (+1.8)          │
│ Fit & Trajectory      ▓▓▓▓▓▓░░░░  6.0  (+0.5)          │
│ Time Investment       ▓▓▓▓▓▓▓▓░░  8.1  (+3.2) ⭐       │
│                                                         │
│ ⭐ = Biggest gains    ⚠️ = Needs more work             │
└─────────────────────────────────────────────────────────┘
```

---

### Visualization 3: Version Timeline

**Purpose:** Track iteration history

```
┌─────────────────────────────────────────────────────────┐
│ VERSION HISTORY                                         │
│                                                         │
│ ● V0 (Original)       NQI: 58   [Restore] [View]       │
│ │                                                       │
│ ● V1 (Issue 1 fixed)  NQI: 63   [Restore] [View]       │
│ │  +5: Added metrics                                    │
│ │                                                       │
│ ● V2 (Issue 2 fixed)  NQI: 68   [Restore] [View]       │
│ │  +5: Added vulnerability                              │
│ │                                                       │
│ ● V3 (Issue 3 fixed)  NQI: 72   [Restore] [View]       │
│   +4: Removed buzzwords                                 │
│                                                         │
│ [Compare V0 ↔ V3]                                       │
└─────────────────────────────────────────────────────────┘
```

**Interactions:**
- Click [View] → see full text of that version
- Click [Restore] → revert to that version (with confirmation)
- Click [Compare] → side-by-side diff view

---

## 10. Example Walkthroughs

### Walkthrough 1: Complete Flow (Issue 1: Missing Metrics)

**Starting Entry:**
```
"I helped students learn programming through tutoring"
```

**Step 1: Diagnosis (3 seconds)**
- System detects: Missing metrics, vague language, unclear role
- Prioritizes: #1 Missing metrics (critical)
- Shows: "Current NQI: 58 | Potential: 75 (+17)"

**Step 2: Problem Presented**
```
⚠️ MISSING QUANTIFIED IMPACT
"I helped students learn programming through tutoring"
     └─ No scale: How many students? How often?

Impact: -3 to -5 points in Specificity
Why officers care: Can't gauge depth or effectiveness
```
Student reads (15 seconds)

**Step 3: Principle Taught**
```
📊 PRINCIPLE: ANCHOR WITH NUMBERS
Numbers cut through noise and prove depth.
Quantify: reach, frequency, duration, results.
```
Student reads (20 seconds)

**Step 4: Examples Shown**
```
❌ "I organized food drives for families in need"
✅ "I coordinated weekly food drives serving 47 families
   across 3 neighborhoods, delivering 2,800+ pounds over
   18 months"

What changed:
✓ Added reach (47 families)
✓ Added frequency (weekly)
✓ Added scale (2,800+ pounds)
```
Student reviews 2 examples (45 seconds)

**Step 5: Reflection Prompts**
```
1. How many people did you work with?
   → Student answers: "About 15 students over my junior/senior years"

2. What was your time commitment?
   → Student answers: "Every Wednesday after school, roughly 2 hours"

3. What outcome can you point to?
   → Student answers: "12 of them took more advanced CS courses"
```
Student reflects (2 minutes)

**Step 6: Strategy Selection**
```
Student selects: Strategy A (Metric-Focused)
Reads example: "serving 50+ students through 25 weekly workshops"
```
(30 seconds)

**Step 7: Rewrite**
Student edits:
```
Draft 1: "I helped students"
[Hint: Add how many students?]

Draft 2: "I tutored 15 students"
[Hint: Add frequency?]

Draft 3: "I tutored 15 freshmen weekly in Python"
[Hint: Add duration or outcome?]

Final: "I tutored 15 freshmen weekly in Python for 2 years,
        with 12 continuing to advanced CS courses"
```
(3-4 minutes)

**Step 8: Regrade**
```
📊 RESULTS
BEFORE: "I helped students learn programming through tutoring"
├─ Specificity: 3.2/10
└─ NQI: 58

AFTER: "I tutored 15 freshmen weekly in Python for 2 years,
        with 12 continuing to advanced CS courses"
├─ Specificity: 7.8/10 (+4.6) ✅
└─ NQI: 65 (+7)

What improved:
✓ Added reach (15 freshmen)
✓ Added frequency (weekly)
✓ Added duration (2 years)
✓ Added outcome (12 continued)
```
Student reviews (30 seconds)

**Step 9: Accept & Continue**
```
🎉 ISSUE 1 COMPLETE!
Principle learned: ANCHOR WITH NUMBERS
Progress: 1 of 3 issues

[Continue to Issue 2 →]
```

**Total Time for Issue 1: ~8 minutes**

---

### Walkthrough 2: Student Struggles, Uses AI Help

**Scenario:** Student can't think of specific details

**Step 1-6:** Same as Walkthrough 1

**Step 7: Rewrite (Struggle Point)**
```
Student types: "I helped students with programming"
[Real-time: Still too vague, no metrics detected]

Student stares at screen for 30 seconds...
Clicks [💬 Need Help? Get AI Suggestion]
```

**AI Modal Opens:**
```
┌─────────────────────────────────────────────────────────┐
│ 💡 AI SUGGESTIONS                                      │
│                                                         │
│ Based on your reflection answers, here are 3 options:  │
│                                                         │
│ Option 1 (Recommended):                                │
│ "I tutored 15 freshmen weekly in Python over 2 years, │
│  with 12 advancing to AP Computer Science"            │
│ [Use This] [Customize]                                 │
│                                                         │
│ Option 2:                                              │
│ "Leading weekly 2-hour Python sessions for 15 students│
│  across junior and senior year, 80% continued to      │
│  advanced coursework"                                  │
│ [Use This] [Customize]                                 │
│                                                         │
│ Option 3:                                              │
│ "Providing individualized Python tutoring to 15       │
│  freshmen (2 hours weekly, 2 years), enabling 12 to   │
│  pursue advanced CS"                                   │
│ [Use This] [Customize]                                 │
│                                                         │
│ [Close - I'll write my own]                            │
└─────────────────────────────────────────────────────────┘
```

**Student's Choice:**
- Click [Customize] on Option 1
- Edits to match their voice:
  "I tutored 15 freshmen every Wednesday in Python for 2 years, with 12 going on to take more advanced courses"

**Outcome:** Student learns from AI example but makes it their own

**Total Time: ~10 minutes** (2 min extra for AI help)

---

### Walkthrough 3: Student Rejects First Attempt, Iterates

**Step 8: First Regrade**
```
AFTER: "I tutored about 15 students in programming"
├─ Specificity: 5.2/10 (+2.0)
└─ NQI: 61 (+3)

⚠️ STILL NEEDS WORK
• "about" weakens precision - be exact
• Missing frequency (how often?)
• No duration or outcome

[Try Again] [Accept Anyway]
```

**Student Clicks [Try Again]**

**Step 9: Second Iteration**
```
Student revises: "I tutored 15 freshmen weekly in Python
for 2 years, with 12 advancing to AP CS"
```

**Step 10: Second Regrade**
```
AFTER (V2): "I tutored 15 freshmen weekly in Python for
             2 years, with 12 advancing to AP CS"
├─ Specificity: 7.9/10 (+4.7) ✅
└─ NQI: 65 (+7)

✅ ISSUE RESOLVED
All metrics present: reach, frequency, duration, outcome

[✓ Accept This Version]
```

**Learning:** Student sees iterative improvement, understands precision matters

**Total Time: ~11 minutes** (3 min extra for second iteration)

---

## 11. Implementation Priorities

### Phase 1: Core Teaching Flow (MVP)
**Timeline: 2 weeks**

**Must-Have:**
1. ✅ Issue detection (top 3 issues only)
2. ✅ Teaching unit structure (problem → principle → examples)
3. ✅ Basic editor with regrade button
4. ✅ Delta visualization (before/after scores)
5. ✅ Version history (simple list)
6. ✅ Progress tracker (issue count)

**Can Skip:**
- AI suggestions (use manual hints only)
- Advanced visualizations (simple text deltas OK)
- Adaptive scaffolding (default to "teach" level)
- Multiple strategy options (show 1 recommended strategy)

**Success Criteria:**
- Student can complete 1 issue end-to-end
- Regrade shows accurate delta
- Version history preserved

---

### Phase 2: Enhanced UX
**Timeline: 1 week**

**Add:**
1. ✅ Multiple fix strategies (2-3 per issue)
2. ✅ Example carousel (2-3 real examples per issue)
3. ✅ Reflection prompts (2-3 questions per issue)
4. ✅ Improved delta visualization (heatmap, progress ring)
5. ✅ Responsive design (mobile-friendly)

**Success Criteria:**
- All 5 issue types have complete teaching units
- Student can choose preferred strategy
- Mobile experience is usable

---

### Phase 3: AI Assistance
**Timeline: 1 week**

**Add:**
1. ✅ AI suggestion generator (3 options per request)
2. ✅ Real-time score estimation (debounced)
3. ✅ Contextual hints (adapt to student's draft)
4. ✅ Adaptive scaffolding (adjust support level)

**Success Criteria:**
- AI suggestions are contextually relevant (>80% acceptance rate)
- Real-time estimates within ±1 point of actual regrade
- Scaffolding adapts after 2 successful iterations

---

### Phase 4: Polish & Analytics
**Timeline: 1 week**

**Add:**
1. ✅ Session analytics (time spent, iterations, AI assists)
2. ✅ Learning summary (principles practiced)
3. ✅ Celebration moments (animations, encouragement)
4. ✅ Accessibility (WCAG AA compliance)
5. ✅ Performance optimization (<2sec regrade time)

**Success Criteria:**
- Session completion rate >70%
- Average NQI improvement >10 points
- Student satisfaction >4/5

---

## Appendix A: Copy Guidelines

### Tone Examples

**❌ Too Formal:**
"The admissions committee evaluates your submission based on eleven distinct categorical dimensions."

**✅ Just Right:**
"Admissions readers look at 11 different aspects of your entry."

---

**❌ Too Casual:**
"Yo, your essay is kinda weak rn. Let's fix it up!"

**✅ Just Right:**
"Your entry has strong potential. Let's make it admissions-ready."

---

**❌ Too Wordy:**
"In order to effectively communicate the depth and breadth of your involvement in this particular extracurricular activity, it is important to include specific quantitative metrics that demonstrate the scope and scale of your impact."

**✅ Just Right:**
"Add numbers that show how many people you reached and how often you worked."

---

### Encouragement Examples

**After first regrade (small improvement):**
"Nice! You improved by +3 points. Keep going—you're on the right track."

**After second regrade (good improvement):**
"Great work! That's +7 points total. You're learning the pattern."

**After accepting final version:**
"🎉 You've transformed this entry! Your NQI jumped from 58 to 72—that's a huge improvement. These principles work for all your other entries too."

**When student struggles:**
"This is hard work—and that's OK. Real improvement takes practice. Want to see an AI suggestion to get unstuck?"

---

## Appendix B: Error States & Edge Cases

### Edge Case 1: Student's Entry Already Strong (NQI >75)

**Handle:**
```
┌─────────────────────────────────────────────────────────┐
│ 🎉 YOUR ENTRY IS ALREADY STRONG!                       │
│                                                         │
│ Current NQI: 78 (Target for top schools: 75+)          │
│                                                         │
│ We found only minor improvement opportunities:         │
│ • Consider adding one dialogue exchange for authenticity│
│ • Could strengthen reflection slightly                 │
│                                                         │
│ Want to workshop it anyway, or move to another entry?  │
│                                                         │
│ [Polish This Entry] [Workshop Another Entry]           │
└─────────────────────────────────────────────────────────┘
```

---

### Edge Case 2: Entry Too Short (<50 chars)

**Handle:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ ENTRY TOO SHORT                                     │
│                                                         │
│ Your entry: "Helped with robotics club"               │
│                                                         │
│ Minimum length: 50 characters (you have 23)            │
│                                                         │
│ Before we can workshop, add more details:              │
│ • What was your specific role?                         │
│ • How often did you participate?                       │
│ • What did you accomplish?                             │
│                                                         │
│ [Add More Details] [Back]                              │
└─────────────────────────────────────────────────────────┘
```

---

### Edge Case 3: Entry Too Long (>700 chars)

**Handle:**
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ ENTRY TOO LONG                                      │
│                                                         │
│ Your entry: 847 characters                             │
│ Maximum: 700 characters (Common App limit)             │
│                                                         │
│ The workshop will help you make it more concise while  │
│ keeping the most impactful details.                    │
│                                                         │
│ [Start Workshop] [Trim Manually First]                 │
└─────────────────────────────────────────────────────────┘
```

---

### Edge Case 4: No Issues Detected (Rare)

**Handle:**
```
┌─────────────────────────────────────────────────────────┐
│ ✅ NO CRITICAL ISSUES DETECTED                         │
│                                                         │
│ Your entry scores well across all 11 categories!       │
│                                                         │
│ Current NQI: 74                                         │
│                                                         │
│ Optional improvements:                                  │
│ • Add literary technique for tier-1 schools (MIT, etc) │
│ • Consider perspective shift or extended metaphor      │
│                                                         │
│ [Advanced Workshop] [Done]                             │
└─────────────────────────────────────────────────────────┘
```

---

## Appendix C: Testing Scenarios

### Test Scenario 1: Generic Leadership Entry
**Input:**
"I was president of the debate club and helped members improve"

**Expected Flow:**
1. Detect 3 issues: unclear role, vague language, missing metrics
2. Prioritize: #1 unclear role, #2 missing metrics, #3 vague language
3. Guide through each teaching unit
4. Expected final NQI: 68-75 (from ~52)

---

### Test Scenario 2: Research Entry (Technical)
**Input:**
"I worked on machine learning research with my mentor"

**Expected Flow:**
1. Detect: missing specificity, unclear role
2. Teach: quantified impact principle (papers, datasets, results)
3. Expected final: Technical details + specific contributions + learning

---

### Test Scenario 3: Arts Entry (Subjective)
**Input:**
"I love painting and have been creating art for years"

**Expected Flow:**
1. Detect: vague language ("love"), no concrete achievements
2. Teach: replace claims with evidence (exhibitions, pieces, techniques)
3. Expected final: Specific works + artistic growth + unique perspective

---

### Test Scenario 4: Work Entry (Constrained)
**Input:**
"I work 20 hours/week at McDonald's to support my family"

**Expected Flow:**
1. Detect: good time commitment, but missing reflection + initiative
2. Teach: show initiative even in constrained role, reflection on work ethic
3. Expected final: Responsibilities + skills gained + family context + maturity

---

### Test Scenario 5: International Student (ESL)
**Input:**
"I participate volunteering activity every week at old people home"

**Expected Flow:**
1. Detect: grammar issues, vague language, missing metrics
2. Teach: same principles but adjust examples to international context
3. Expected final: Grammatically correct + specific + culturally authentic

---

## Document Status

**Version:** 1.1
**Status:** ✅ Complete - Ready for Implementation
**Next Step:** Phase 1 Development (Core Teaching Flow MVP)

**Approval Checklist:**
- [x] User journey mapped end-to-end
- [x] All 5 issue types have complete teaching flows
- [x] UI components specified with layouts
- [x] Interaction patterns defined
- [x] Feedback mechanisms designed
- [x] Example walkthroughs provided
- [x] Implementation priorities set
- [x] Edge cases handled
- [x] Testing scenarios defined

**Ready for:** Human checkpoint review & Phase 1 kickoff
