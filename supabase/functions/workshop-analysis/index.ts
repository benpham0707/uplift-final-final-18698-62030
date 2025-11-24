import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Anthropic from "npm:@anthropic-ai/sdk@0.68.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { entry, options } = await req.json();
    
    console.log('[Workshop Analysis] Starting analysis...');
    console.log('  Entry:', entry.title);
    console.log('  Depth:', options?.depth || 'standard');

    // Get API key from environment
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      throw new Error("ANTHROPIC_API_KEY not configured");
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: ANTHROPIC_API_KEY,
    });

    // Build comprehensive analysis prompt
    const analysisPrompt = buildAnalysisPrompt(entry, options);

    // Call Claude for analysis
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: analysisPrompt,
        },
      ],
    });

    // Parse response
    const content = response.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type");
    }

    // Extract JSON from response
    let analysisData;
    try {
      const jsonMatch = content.text.match(/```json\s*([\s\S]*?)\s*```/) ||
                       content.text.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content.text;
      analysisData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse JSON:', content.text.substring(0, 200));
      throw new Error('Failed to parse analysis response');
    }

    // Build result in expected format
    const result = {
      success: true,
      result: {
        report: {
          id: crypto.randomUUID(),
          narrative_quality_index: analysisData.narrative_quality_index || 70,
          reader_impression_label: analysisData.reader_impression_label || "solid",
          categories: analysisData.categories || [],
          weights: analysisData.weights || {},
          flags: analysisData.flags || [],
          suggested_fixes_ranked: analysisData.suggested_fixes_ranked || [],
          analysis_depth: options?.depth || 'standard',
          created_at: new Date().toISOString(),
          rubric_version: "v2.0",
        },
        authenticity: {
          authenticity_score: analysisData.authenticity?.authenticity_score || 75,
          voice_type: analysisData.authenticity?.voice_type || "authentic",
          red_flags: analysisData.authenticity?.red_flags || [],
          green_flags: analysisData.authenticity?.green_flags || [],
        },
        coaching: analysisData.coaching || null,
        performance: {
          total_ms: 0,
        },
      },
    };

    console.log('[Workshop Analysis] Complete! NQI:', result.result.report.narrative_quality_index);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Workshop Analysis] Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

function buildAnalysisPrompt(entry: any, options: any): string {
  return `You are an expert college admissions essay analyst. Analyze this extracurricular/PIQ narrative and provide a comprehensive evaluation.

**Entry Details:**
- Title: ${entry.title}
- Category: ${entry.category}
- Description: ${entry.description_original}

**Analysis Requirements:**

Return a JSON object with this EXACT structure:

{
  "narrative_quality_index": <number 0-100>,
  "reader_impression_label": "<outstanding|strong|solid|needs_work>",
  "categories": [
    {
      "name": "Voice Integrity",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Specificity & Evidence",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Transformative Impact",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Role Clarity & Ownership",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Narrative Arc & Stakes",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Initiative & Leadership",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Community & Collaboration",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Reflection & Meaning",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Craft & Language Quality",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Fit & Trajectory",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    },
    {
      "name": "Time Investment & Consistency",
      "score_0_to_10": <number>,
      "evidence_snippets": ["<quote from text>"],
      "evaluator_notes": "<detailed feedback>"
    }
  ],
  "weights": {
    "voice_integrity": 0.15,
    "specificity_evidence": 0.12,
    "transformative_impact": 0.15,
    "role_clarity_ownership": 0.10,
    "narrative_arc_stakes": 0.10,
    "initiative_leadership": 0.10,
    "community_collaboration": 0.08,
    "reflection_meaning": 0.08,
    "craft_language_quality": 0.06,
    "fit_trajectory": 0.04,
    "time_investment_consistency": 0.02
  },
  "flags": ["<critical issues if any>"],
  "suggested_fixes_ranked": [
    {
      "category": "<category_name>",
      "fix_text": "<specific actionable suggestion>",
      "impact": "<high|medium|low>"
    }
  ],
  "authenticity": {
    "authenticity_score": <number 0-100>,
    "voice_type": "<authentic|coached|manufactured>",
    "red_flags": ["<signs of inauthenticity>"],
    "green_flags": ["<signs of authenticity>"]
  },
  "coaching": {
    "categories": [
      {
        "category_key": "<category_name>",
        "detected_issues": [
          {
            "id": "<unique_id>",
            "category": "<category_name>",
            "severity": "<critical|major|minor>",
            "title": "<issue title>",
            "problem": "<what's wrong>",
            "why_matters": "<impact explanation>",
            "suggested_fixes": [
              {
                "fix_text": "<specific edit>",
                "why_this_works": "<rationale>",
                "apply_type": "<replace|add|reframe>"
              }
            ]
          }
        ]
      }
    ],
    "top_priorities": [
      {
        "category": "<category_name>",
        "impact": "<estimated NQI gain>"
      }
    ]
  }
}

**Important:**
- Provide honest, constructive feedback
- All 11 categories must be evaluated
- Scores should reflect actual quality
- Evidence snippets must be direct quotes
- Suggestions must be specific and actionable

Return ONLY the JSON object, wrapped in markdown code fence.`;
}
