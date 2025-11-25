/**
 * Suggestion Quality Validator
 *
 * Validates each workshop suggestion for:
 * - Authentic voice (not AI-generated feel)
 * - No banned clichés
 * - Specific, concrete language
 * - Educational rationale quality
 */

const VALIDATION_SYSTEM_PROMPT = `You are a Quality Assurance Specialist ensuring college essay suggestions sound AUTHENTICALLY HUMAN.

**CORE PRINCIPLE:**
The writing should sound like a REAL PERSON processed their own experience and wrote about it themselves.
It should be authentic to THEM - their insights, their character, their unique perspective on what happened.

**THE AUTHENTICITY TEST:**
Ask yourself: "Could this have ONLY been written by this specific person?"
- If yes → authentic
- If anyone could have written it → not authentic

**WHAT MAKES WRITING FEEL AI-GENERATED OR INAUTHENTIC:**

1. **Overused/Cliché Language** - Language that feels templated, AI-generated, or like it came from a "how to write essays" guide:
   - Banned terms: tapestry, realm, testament, showcase, delve, underscore, journey (unless literal)
   - Flowery/grandiose words that real teenagers don't use naturally
   - Phrases that sound impressive but say nothing specific

2. **Generic Insights** - Realizations that anyone could have:
   - "I learned the value of hard work"
   - "I discovered how to persevere"
   - "This taught me about teamwork"
   - Ask: What did THIS person specifically learn that's unique to their experience?

3. **Passive Voice** - Weakens agency:
   - "was training", "were doing", "was discovered"
   - The student should be the active subject

4. **Summary Language** - Telling instead of showing:
   - "This taught me that..."
   - "I learned that..."
   - "From this experience, I realized..."

5. **Rationale Quality Issues:**
   - Uses editor voice ("I changed X to Y") instead of teaching voice
   - Too short (< 30 words)
   - Doesn't explain the writing principle
   - Just describes changes instead of teaching why it works

**WHAT MAKES WRITING FEEL AUTHENTICALLY HUMAN:**

1. **Specific Details Only They Would Know** - Not just "specific" but revealing of character
2. **Unique Angle/Perspective** - A way of seeing the experience that's distinctly theirs
3. **Genuine Reflection** - Not "I learned X" but actual processing of meaning
4. **Active Voice** - Student as the doer
5. **Concrete Language** - Specific nouns and verbs, not abstractions

**RATIONALE QUALITY STANDARDS:**
- Should teach a WRITING PRINCIPLE, not just describe what changed
- Should use collaborative language ("By doing X, we achieve Y") not editor language ("I changed X")
- Should be 30+ words to be educational
- Should explain WHY this specific approach works psychologically

**Output Format:**
{
  "isValid": boolean,
  "qualityScore": number (0-100),
  "failures": [
    {
      "category": "ai_language" | "generic_insight" | "passive_voice" | "summary_language" | "rationale_quality" | "inauthenticity",
      "severity": "critical" | "warning",
      "message": "Clear explanation of the issue",
      "evidence": "The specific problematic text",
      "suggestion": "How to fix it"
    }
  ],
  "strengths": ["What feels genuinely human about this"],
  "retryGuidance": "Specific instructions for improvement (if needed)"
}

**Your job: Protect authenticity. If it doesn't sound like a real person wrote it, flag it.**`;

export interface ValidationResult {
  isValid: boolean;
  qualityScore: number;
  failures: Array<{
    category: string;
    severity: 'critical' | 'warning';
    message: string;
    evidence: string;
    suggestion: string;
  }>;
  strengths: string[];
  retryGuidance: string;
}

/**
 * Validate a single suggestion using Claude
 */
export async function validateSuggestion(
  suggestionText: string,
  rationale: string,
  originalText: string,
  voiceTone: string,
  anthropicApiKey: string,
  attemptNumber: number = 1
): Promise<ValidationResult> {

  const validationPrompt = `# VALIDATION REQUEST

## Suggested Text:
"${suggestionText}"

## Rationale:
"${rationale}"

## Context:
- **Original Text:** "${originalText}"
- **Student Voice Tone:** ${voiceTone}
- **Attempt Number:** ${attemptNumber}

---

**Task:** Validate this suggestion against world-class standards. Be strict but fair.

**Focus Areas:**
1. Does the text sound authentic (like a real student, not AI)?
2. Does it avoid banned clichés (tapestry, realm, testament, showcase, delve)?
3. Is it specific (concrete nouns, active verbs)?
4. Is it in active voice (student as doer)?
5. Does the rationale teach a principle (not just describe the change)?
6. Is the rationale 30+ words and educational?

**Return:** JSON with validation result.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 800,
        temperature: 0.1, // Low temp for consistent validation
        system: VALIDATION_SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: validationPrompt
        }]
      })
    });

    if (!response.ok) {
      console.warn('⚠️ Validation API call failed, assuming valid');
      return {
        isValid: true,
        qualityScore: 70,
        failures: [],
        strengths: ['Validation failed - assuming acceptable'],
        retryGuidance: ''
      };
    }

    const result = await response.json();
    const content = result.content[0].text;

    // Parse JSON from response
    let validationData;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();
      validationData = JSON.parse(jsonString);
    } catch (e) {
      console.warn('⚠️ Failed to parse validation JSON, assuming valid');
      return {
        isValid: true,
        qualityScore: 70,
        failures: [],
        strengths: ['Parse error - assuming acceptable'],
        retryGuidance: ''
      };
    }

    return {
      isValid: validationData.isValid ?? true,
      qualityScore: validationData.qualityScore ?? 70,
      failures: validationData.failures ?? [],
      strengths: validationData.strengths ?? [],
      retryGuidance: validationData.retryGuidance ?? ''
    };

  } catch (error) {
    console.error('❌ Validation error:', error);
    // Fail open - don't block on validation errors
    return {
      isValid: true,
      qualityScore: 60,
      failures: [],
      strengths: ['Validation error - assuming acceptable'],
      retryGuidance: ''
    };
  }
}

/**
 * Generate a workshop item with validation and retry
 */
export async function generateWorkshopItemWithValidation(
  essayText: string,
  promptText: string,
  rubricAnalysis: any,
  voiceFingerprint: any,
  anthropicApiKey: string,
  baseSystemPrompt: string
): Promise<any> {

  const maxAttempts = 3;
  let attemptNumber = 1;
  let lastRetryGuidance = '';

  while (attemptNumber <= maxAttempts) {
    console.log(`   🔄 Generation attempt ${attemptNumber}/${maxAttempts}`);

    // Build prompt with retry guidance if this is a retry
    let userPrompt = `Identify 1 critical workshop item for this essay:\n\nPrompt: ${promptText}\n\nEssay:\n${essayText}\n\nRubric Analysis:\n${JSON.stringify(rubricAnalysis, null, 2)}`;

    if (lastRetryGuidance && attemptNumber > 1) {
      userPrompt = `**PREVIOUS ATTEMPT FAILED VALIDATION:**\n\n${lastRetryGuidance}\n\n---\n\n${userPrompt}\n\n---\n\n**CRITICAL:** Fix all issues mentioned in the validation feedback above.`;
    }

    // Generate workshop item
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 3000,
        temperature: attemptNumber > 1 ? 0.7 : 0.8,
        system: baseSystemPrompt,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });

    if (!response.ok) {
      console.error(`   ❌ Generation attempt ${attemptNumber} failed`);
      attemptNumber++;
      continue;
    }

    const result = await response.json();
    const content = result.content[0].text;

    // Parse workshop item
    let workshopItem;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();
      const parsed = JSON.parse(jsonString);
      workshopItem = parsed.workshopItems?.[0] || parsed;
    } catch (e) {
      console.error(`   ❌ Failed to parse attempt ${attemptNumber}`);
      attemptNumber++;
      continue;
    }

    if (!workshopItem || !workshopItem.suggestions) {
      console.error(`   ❌ No suggestions in attempt ${attemptNumber}`);
      attemptNumber++;
      continue;
    }

    // Validate each suggestion
    const validatedSuggestions = [];
    for (const suggestion of workshopItem.suggestions) {
      const validation = await validateSuggestion(
        suggestion.text,
        suggestion.rationale,
        workshopItem.quote || essayText.substring(0, 200),
        voiceFingerprint?.tone?.primary || 'authentic',
        anthropicApiKey,
        attemptNumber
      );

      if (validation.isValid && validation.qualityScore >= 70) {
        console.log(`   ✅ Suggestion validated (score: ${validation.qualityScore})`);
        validatedSuggestions.push(suggestion);
      } else {
        console.log(`   ⚠️ Suggestion failed validation (score: ${validation.qualityScore}, ${validation.failures.length} issues)`);

        // Store retry guidance
        if (validation.retryGuidance) {
          lastRetryGuidance = validation.retryGuidance;
        }
      }
    }

    // If we have at least one valid suggestion, return the item
    if (validatedSuggestions.length > 0) {
      return {
        ...workshopItem,
        suggestions: validatedSuggestions
      };
    }

    // Otherwise retry
    attemptNumber++;
  }

  // All attempts failed - return null to skip this item
  console.warn('   ⚠️ All validation attempts failed for this item');
  return null;
}
