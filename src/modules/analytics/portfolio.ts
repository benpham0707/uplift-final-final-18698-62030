import type { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import { supabaseAdmin } from "@/supabase/admin";

const OPENAI_KEY = process.env["uplift-openai-key"] || process.env["UPLIFT_OPENAI_KEY"] || process.env["OPENAI_API_KEY"];

function buildPrompt(userData: any): string {
	return `You are an expert college admissions evaluator with deep understanding of holistic application review. You specialize in recognizing potential in students from diverse backgrounds, including first-generation, low-income, and underrepresented students.

## EVALUATION CONTEXT
You are evaluating a ${userData.current_grade || 'high school'} student's portfolio for college readiness and competitive positioning. This student has the following contextual factors that should inform your evaluation:
- First-generation college student: ${userData.first_gen === true ? 'Yes' : userData.first_gen === false ? 'No' : 'Unknown'}
- Financial constraints: ${userData.household_income ? `Household income range: ${userData.household_income}` : 'Not specified'}
- Family responsibilities: ${userData.hours_per_week ? `${userData.hours_per_week} hours/week on family duties` : 'Not specified'}
- Challenging circumstances: ${userData.challenging_circumstances ? 'Yes - affecting educational opportunities' : 'No/Not specified'}

## SCORING PHILOSOPHY
- Use a 0.0-10.0 scale for each dimension
- Apply CONTEXTUAL EXCELLENCE: Judge achievements relative to available opportunities
- Recognize NON-TRADITIONAL STRENGTHS: Value family responsibilities, work experience, and cultural contributions
- Reward AUTHENTICITY & GROWTH over mere accumulation of activities
- Consider TRAJECTORY: Improvement and resilience matter more than starting point

## STUDENT DATA TO EVALUATE

### ACADEMIC JOURNEY
- Current Grade Level: ${userData.current_grade || 'Not specified'}
- GPA: ${userData.gpa || 'Not provided'} (Scale: ${userData.gpa_scale || '4.0'}, Type: ${userData.gpa_type || 'unknown'})
- Class Rank: ${userData.class_rank || 'Not provided'} of ${userData.class_size || 'unknown'}
- School Type: ${userData.current_school?.type || 'Not specified'}
- Course Rigor: ${JSON.stringify(userData.course_history || 'Not provided')}
- Standardized Tests: ${userData.report_test_scores ? JSON.stringify(userData.standardized_tests) : 'Not reporting'}
- AP/IB Exams: ${userData.taking_ap_exams ? JSON.stringify(userData.ap_exams) : 'None'} ${userData.in_ib_programme ? JSON.stringify(userData.ib_exams) : ''}
- College Courses: ${userData.college_courses?.length > 0 ? JSON.stringify(userData.college_courses) : 'None'}

### EXPERIENCES & ACTIVITIES
Work Experience: ${JSON.stringify(userData.work_experiences || [])}
Volunteer Service: ${JSON.stringify(userData.volunteer_service || [])}
Extracurriculars: ${JSON.stringify(userData.extracurriculars || [])}
Personal Projects: ${JSON.stringify(userData.personal_projects || [])}
Leadership Roles: ${JSON.stringify(userData.leadership_roles || [])}
Academic Honors: ${JSON.stringify(userData.academic_honors || [])}
Formal Recognition: ${JSON.stringify(userData.formal_recognition || [])}

### PERSONAL CONTEXT
- Living Situation: ${userData.living_situation || 'Not specified'}
- Parent/Guardian Education: ${JSON.stringify(userData.parent_guardians || 'Not specified')}
- Hispanic/Latino: ${userData.hispanic_latino || 'Not specified'}
- Race/Ethnicity: ${Array.isArray(userData.race_ethnicity) ? userData.race_ethnicity.join(', ') : 'Not specified'}
- Primary Language: ${userData.primary_language || 'Not specified'}
- Other Languages: ${JSON.stringify(userData.other_languages || [])}

### FAMILY RESPONSIBILITIES & CIRCUMSTANCES
- Weekly Hours on Family Duties: ${userData.hours_per_week || 0}
- Responsibilities: ${JSON.stringify(userData.responsibilities || [])}
- Challenging Circumstances: ${JSON.stringify(userData.circumstances || [])}
- Additional Context: ${userData.other_responsibilities || ''} ${userData.other_circumstances || ''}

### GOALS & ASPIRATIONS
- Intended Major: ${userData.intended_major || 'Undecided'}
- Career Interests: ${Array.isArray(userData.career_interests) ? userData.career_interests.join(', ') : 'Not specified'}
- Highest Degree Goal: ${userData.highest_degree || 'Not specified'}
- College Plans: ${JSON.stringify(userData.college_plans || 'Not specified')}

### PERSONAL GROWTH & STORIES
Meaningful Experiences: ${JSON.stringify(userData.meaningful_experiences || {})}
Additional Context: ${JSON.stringify(userData.additional_context || {})}

### SUPPORT NETWORK
- Counselor: ${JSON.stringify(userData.counselor || 'Not specified')}
- Teachers for Recommendations: ${JSON.stringify(userData.teachers || [])}
- Community Organizations: ${JSON.stringify(userData.community_organizations || [])}

## EVALUATION RUBRIC

### 1. ACADEMIC EXCELLENCE (0.0-10.0)
Evaluate based on:
- GPA relative to school context and personal challenges
- Course rigor and intellectual curiosity
- Improvement trajectory over time
- Academic achievements despite constraints
- Love of learning demonstrated through projects/research

CONTEXTUAL ADJUSTMENTS:
- If working 15+ hours/week: Add +0.5-1.0 for maintaining B+ or higher
- If first-gen: Add +0.3-0.5 for navigating academic system independently
- If English second language: Add +0.3-0.5 for academic success
- If frequent school changes: Add +0.2-0.4 for maintaining progress

### 2. LEADERSHIP POTENTIAL (0.0-10.0)
Evaluate based on:
- Formal leadership roles (student government, club officer, team captain)
- Informal leadership (family coordination, workplace responsibility, peer mentoring)
- Initiative and problem-solving
- Influence and impact on others
- Responsibility level relative to age

CONTEXTUAL ADJUSTMENTS:
- Family leadership (managing household, caring for siblings): Count as HIGH-VALUE leadership
- Work leadership (training others, shift lead): Add +1.0-2.0
- Cultural bridge/translator role: Add +0.5-1.0
- Self-directed projects: Add +0.3-0.5

### 3. PERSONAL GROWTH (0.0-10.0)
Evaluate based on:
- Challenges overcome and resilience demonstrated
- Self-awareness and reflection quality
- Improvement trajectory
- Adaptability and learning from failure
- Character development

CONTEXTUAL ADJUSTMENTS:
- Overcoming significant adversity: Add +1.0-2.0
- First in family navigating system: Add +0.5-1.0
- Managing mental health challenges: Add +0.3-0.5
- Supporting family through crisis: Add +0.5-1.0

### 4. COMMUNITY IMPACT (0.0-10.0)
Evaluate based on:
- Volunteer service depth and consistency
- Impact on local community
- Cultural contributions
- Helping family business/household
- Peer support and mentoring

CONTEXTUAL ADJUSTMENTS:
- Unpaid family business work: Count as community service
- Cultural preservation activities: Add +0.5-1.0
- Translating for community: Add +0.3-0.5
- Limited opportunities but consistent effort: Add +0.5

### 5. UNIQUENESS (0.0-10.0)
Evaluate based on:
- Distinctive combination of experiences
- Unique perspective or background
- Special talents or achievements
- Unusual interests deeply pursued
- Creative problem-solving

CONTEXTUAL ADJUSTMENTS:
- Multilingual abilities: Add +0.5-1.0
- Cross-cultural perspective: Add +0.5-1.0
- Non-traditional path to achievement: Add +1.0
- Self-taught skills: Add +0.3-0.5

### 6. FUTURE READINESS (0.0-10.0)
Evaluate based on:
- Clear goals and planning
- Steps taken toward goals
- Understanding of requirements
- Realistic timeline
- Backup plans and flexibility

CONTEXTUAL ADJUSTMENTS:
- First-gen navigating independently: Add +0.5-1.0
- Clear goals despite limited exposure: Add +0.3-0.5
- Professional skills from work: Add +0.3-0.5
- Financial planning awareness: Add +0.2-0.3

## OUTPUT REQUIREMENTS

Provide your evaluation in the following JSON format. Be specific with evidence and generous with recognition of non-traditional strengths:

{
  "overallScore": [weighted average of all dimensions, 0.0-10.0],
  "dimensions": {
    "academicExcellence": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    },
    "leadershipPotential": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    },
    "personalGrowth": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    },
    "communityImpact": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    },
    "uniqueValue": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    },
    "futureReadiness": {
      "score": [0.0-10.0],
      "evidence": ["specific example 1", "specific example 2", "specific example 3"],
      "feedback": "Constructive, specific feedback acknowledging context",
      "strengths": ["key strength 1", "key strength 2"],
      "growthAreas": ["specific area 1", "specific area 2"]
    }
  },
  "hiddenStrengths": [
    "List 3-5 strengths that might not be obvious but are valuable"
  ],
  "narrativeSummary": "A 2-3 sentence summary of the student's unique value proposition, emphasizing their potential and acknowledging their journey",
  "prioritizedRecommendations": [
    {"priority": 1, "action": "Specific action", "impact": "Expected impact on scores", "timeline": "Realistic timeline"},
    {"priority": 2, "action": "Specific action", "impact": "Expected impact on scores", "timeline": "Realistic timeline"},
    {"priority": 3, "action": "Specific action", "impact": "Expected impact on scores", "timeline": "Realistic timeline"}
  ]
}

IMPORTANT REMINDERS:
1. Be generous in recognizing non-traditional achievements
2. Value depth over breadth of experiences
3. Recognize that working students and those with family responsibilities demonstrate exceptional time management
4. Consider cultural contributions and bilingual abilities as significant strengths
5. Score based on POTENTIAL and TRAJECTORY, not just current achievement
6. Provide specific, actionable feedback that acknowledges constraints
7. Celebrate authenticity and genuine passion over resume padding`;
}

function signatureFromBundle(bundle: any): string {
	const parts = [
		bundle.profile?.updated_at,
		bundle.academic?.updated_at,
		bundle.experiences?.updated_at,
		bundle.personalInfo?.updated_at,
		bundle.family?.updated_at,
		bundle.goalsAsp?.updated_at,
		bundle.personalGrowth?.updated_at,
		bundle.support?.updated_at,
	].map(v => v ? String(v) : "-");
	return parts.join("|");
}

async function loadBundle(userId: string) {
	const { data: profile, error: pErr } = await supabaseAdmin
		.from("profiles")
		.select("*")
		.eq("user_id", userId)
		.maybeSingle();
	if (pErr) throw pErr;
	const profileId = profile?.id as string | undefined;
	if (!profileId) return { profile: null } as any;

	const [academic, experiences, personalInfo, family, goalsAsp, personalGrowth, support] = await Promise.all([
		supabaseAdmin.from("academic_journey").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("experiences_activities").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("personal_information").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("family_responsibilities").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("goals_aspirations").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("personal_growth").select("*").eq("profile_id", profileId).maybeSingle(),
		supabaseAdmin.from("support_network").select("*").eq("profile_id", profileId).maybeSingle(),
	]);

	function unwrap<T>(r: { data: T; error: any }) {
		if (r.error) throw r.error;
		return r.data as any;
	}

	return {
		profile,
		academic: unwrap(academic),
		experiences: unwrap(experiences),
		personalInfo: unwrap(personalInfo),
		family: unwrap(family),
		goalsAsp: unwrap(goalsAsp),
		personalGrowth: unwrap(personalGrowth),
		support: unwrap(support),
	};
}

export async function computePortfolioStrength(req: Request, res: Response, next: NextFunction) {
	try {
		const userId = (req as any).auth?.userId as string | undefined;
		if (!userId) return res.status(401).json({ error: "Unauthorized" });
		if (!OPENAI_KEY) return res.status(500).json({ error: "Missing OpenAI key (uplift-openai-key)" });

		const bundle = await loadBundle(userId);
		const profile = bundle.profile as any;
		const profileId = profile?.id as string | undefined;
		if (!profileId) return res.status(404).json({ error: "Profile not found" });

		const inputSignature = signatureFromBundle(bundle);
		const force = String((req.query as any)?.force || "") === "1";

		// 1) Check portfolio_analytics cache table
		const { data: existing } = await (supabaseAdmin as any)
			.from("portfolio_analytics" as any)
			.select("id, input_signature, overall, dimensions, detailed")
			.eq("profile_id", profileId)
			.maybeSingle();
		if (!force && existing && existing.input_signature === inputSignature) {
			return res.json({ overall: existing.overall, dimensions: existing.dimensions, detailed: existing.detailed, cached: true });
		}

		// 2) Compose and call OpenAI
		const userData = { ...(bundle.profile || {}), ...(bundle.academic || {}), ...(bundle.experiences || {}), ...(bundle.personalInfo || {}), ...(bundle.family || {}), ...(bundle.goalsAsp || {}), ...(bundle.personalGrowth || {}), ...(bundle.support || {}) };
		const prompt = buildPrompt(userData);
		const client = new OpenAI({ apiKey: OPENAI_KEY });

		const cc = await (client as any).chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: "You are Uplift's Portfolio Analyst. Return only valid JSON." },
				{ role: "user", content: prompt }
			],
			response_format: { type: "json_object" }
		});
		const content = cc?.choices?.[0]?.message?.content || "{}";
		let detailed: any = {};
		try { detailed = JSON.parse(content); } catch {}
		if (!detailed || typeof detailed !== "object") {
			return res.status(502).json({ error: "Invalid AI response" });
		}

		const dims = detailed?.dimensions || {};
		const numeric = {
			academic: Number(dims?.academicExcellence?.score ?? 0) || 0,
			leadership: Number(dims?.leadershipPotential?.score ?? 0) || 0,
			growth: Number(dims?.personalGrowth?.score ?? 0) || 0,
			community: Number(dims?.communityImpact?.score ?? 0) || 0,
			uniqueness: Number(dims?.uniqueValue?.score ?? 0) || 0,
			readiness: Number(dims?.futureReadiness?.score ?? 0) || 0,
		};
		const overall = Number(detailed?.overallScore ?? (Object.values(numeric).reduce((a, b) => a + Number(b || 0), 0) / 6));

		// 3) Upsert cache
		if (existing?.id) {
			await (supabaseAdmin as any)
				.from("portfolio_analytics" as any)
				.update({ input_signature: inputSignature, overall, dimensions: numeric as any, detailed: detailed as any })
				.eq("id", existing.id);
		} else {
			await (supabaseAdmin as any)
				.from("portfolio_analytics" as any)
				.insert({ profile_id: profileId, input_signature: inputSignature, overall, dimensions: numeric as any, detailed: detailed as any });
		}

		return res.json({ overall, dimensions: numeric, detailed, cached: false });
	} catch (e) {
		return next(e);
	}
}

export async function reconcilePortfolioStrength(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).auth?.userId as string | undefined;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    if (!OPENAI_KEY) return res.status(500).json({ error: "Missing OpenAI key (uplift-openai-key)" });

    const bundle = await loadBundle(userId);
    const profile = bundle.profile as any;
    const profileId = profile?.id as string | undefined;
    if (!profileId) return res.status(404).json({ error: "Profile not found" });

    const inputSignature = signatureFromBundle(bundle);
    const { data: snap } = await (supabaseAdmin as any)
      .from("portfolio_analytics" as any)
      .select("id, profile_id, input_signature, overall, dimensions")
      .eq("profile_id", profileId)
      .maybeSingle();

    if (snap && snap.input_signature === inputSignature) {
      return res.json({ updated: false, cached: true, overall: snap.overall, dimensions: snap.dimensions });
    }

    // Full recompute (MVP)
    const userData = { ...(bundle.profile || {}), ...(bundle.academic || {}), ...(bundle.experiences || {}), ...(bundle.personalInfo || {}), ...(bundle.family || {}), ...(bundle.goalsAsp || {}), ...(bundle.personalGrowth || {}), ...(bundle.support || {}) };
    const prompt = buildPrompt(userData);
    const client = new OpenAI({ apiKey: OPENAI_KEY });
    const cc = await (client as any).chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are Uplift's Portfolio Analyst. Return only valid JSON." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });
    const content = cc?.choices?.[0]?.message?.content || "{}";
    let detailed: any = {};
    try { detailed = JSON.parse(content); } catch {}
    if (!detailed || typeof detailed !== "object") {
      return res.status(502).json({ error: "Invalid AI response" });
    }
    const dims = detailed?.dimensions || {};
    const numeric = {
      academic: Number(dims?.academicExcellence?.score ?? 0) || 0,
      leadership: Number(dims?.leadershipPotential?.score ?? 0) || 0,
      growth: Number(dims?.personalGrowth?.score ?? 0) || 0,
      community: Number(dims?.communityImpact?.score ?? 0) || 0,
      uniqueness: Number(dims?.uniqueValue?.score ?? 0) || 0,
      readiness: Number(dims?.futureReadiness?.score ?? 0) || 0,
    };
    const overall = Number(detailed?.overallScore ?? (Object.values(numeric).reduce((a, b) => a + Number(b || 0), 0) / 6));

    // Upsert snapshot
    if (snap?.id) {
      await (supabaseAdmin as any)
        .from("portfolio_analytics" as any)
        .update({ input_signature: inputSignature, overall, dimensions: numeric as any, detailed: detailed as any })
        .eq("id", snap.id);
    } else {
      await (supabaseAdmin as any)
        .from("portfolio_analytics" as any)
        .insert({ profile_id: profileId, input_signature: inputSignature, overall, dimensions: numeric as any, detailed: detailed as any });
    }

    // Insert history row (minimal)
    await (supabaseAdmin as any)
      .from("portfolio_analytics_history" as any)
      .insert({
        profile_id: profileId,
        prev_overall: snap?.overall ?? null,
        new_overall: overall,
        prev_dimensions: snap?.dimensions ?? null,
        new_dimensions: numeric as any,
        changed_fields: { source: "signature", previous: snap?.input_signature ?? null, current: inputSignature },
        reason_summary: (detailed?.narrativeSummary as string) || null,
        model_used: "gpt-4o-mini"
      });

    return res.json({ updated: true, cached: false, overall, dimensions: numeric });
  } catch (e) {
    return next(e);
  }
}
