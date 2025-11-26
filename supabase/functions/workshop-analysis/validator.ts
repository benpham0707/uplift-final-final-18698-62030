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
 * Generate a batch of workshop items (4 items)
 * This is the GENERATION step only - validation happens separately
 */
export async function generateWorkshopBatch(
  essayText: string,
  promptText: string,
  rubricAnalysis: any,
  voiceFingerprint: any,
  anthropicApiKey: string,
  baseSystemPrompt: string,
  batchNumber: number
): Promise<any[]> {

  console.log(`   🔄 Generating batch ${batchNumber} (4 items)...`);

  // Generate 4 items in one call for efficiency
  const userPrompt = `Identify the 4 most critical workshop items for this essay:\n\nPrompt: ${promptText}\n\nEssay:\n${essayText}\n\nRubric Analysis:\n${JSON.stringify(rubricAnalysis, null, 2)}\n\n**CRITICAL REQUIREMENTS:**\n- Return EXACTLY 4 distinct workshop items\n- Each item must have 3 suggestions (polished_original, voice_amplifier, divergent_strategy)\n- Focus on the most impactful improvements\n- Ensure each suggestion preserves the student's authentic voice`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000, // More tokens for 4 items
      temperature: 0.8,
      system: baseSystemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });

  if (!response.ok) {
    console.error(`   ❌ Batch ${batchNumber} generation failed`);
    return [];
  }

  const result = await response.json();
  const content = result.content[0].text;

  // Parse workshop items
  try {
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const jsonString = jsonMatch ? jsonMatch[1].trim() : content.trim();
    const parsed = JSON.parse(jsonString);
    const items = parsed.workshopItems || [];

    console.log(`   ✅ Batch ${batchNumber}: Generated ${items.length} items`);
    return items;
  } catch (e) {
    console.error(`   ❌ Failed to parse batch ${batchNumber}`);
    return [];
  }
}

/**
 * Validate and refine a single suggestion with retry
 * This matches the flow in surgicalEditor_v2.ts
 */
export async function validateAndRefineSuggestion(
  suggestion: any,
  workshopItem: any,
  voiceFingerprint: any,
  anthropicApiKey: string,
  maxAttempts: number = 3
): Promise<any | null> {

  let attemptNumber = 1;
  let currentSuggestion = suggestion;
  let lastRetryGuidance = '';

  while (attemptNumber <= maxAttempts) {
    // Validate the suggestion
    const validation = await validateSuggestion(
      currentSuggestion.text,
      currentSuggestion.rationale,
      workshopItem.quote || '',
      voiceFingerprint?.tone?.primary || 'authentic',
      anthropicApiKey,
      attemptNumber
    );

    if (validation.isValid && validation.qualityScore >= 70) {
      console.log(`      ✅ Suggestion validated (score: ${validation.qualityScore})`);
      return currentSuggestion;
    }

    console.log(`      ⚠️ Validation failed (score: ${validation.qualityScore}, attempt ${attemptNumber}/${maxAttempts})`);

    if (attemptNumber >= maxAttempts) {
      console.log(`      ❌ Max attempts reached, skipping suggestion`);
      return null;
    }

    // Retry with specific guidance
    if (validation.retryGuidance) {
      lastRetryGuidance = validation.retryGuidance;
    }

    // Regenerate the suggestion with feedback
    const retryPrompt = `**VALIDATION FEEDBACK:**\n${lastRetryGuidance}\n\n---\n\n**Original Text:** "${workshopItem.quote}"\n\n**Suggestion Type:** ${suggestion.type}\n\n**Student Voice:** ${voiceFingerprint?.tone?.primary || 'authentic'}\n\n**Task:** Regenerate this suggestion fixing ALL the issues mentioned above. Return ONLY JSON:\n{\n  "text": "improved suggestion text",\n  "rationale": "educational rationale (30+ words)"\n}`;

    try {
      const retryResponse = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 800,
          temperature: 0.7,
          system: VALIDATION_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: retryPrompt }]
        })
      });

      if (retryResponse.ok) {
        const retryResult = await retryResponse.json();
        const retryContent = retryResult.content[0].text;
        const jsonMatch = retryContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1].trim() : retryContent.trim();
        const refined = JSON.parse(jsonString);

        currentSuggestion = {
          type: suggestion.type,
          text: refined.text,
          rationale: refined.rationale
        };

        console.log(`      🔄 Retry ${attemptNumber}: Regenerated suggestion`);
      }
    } catch (error) {
      console.error(`      ❌ Retry ${attemptNumber} failed:`, error);
    }

    attemptNumber++;
  }

  return null;
}
