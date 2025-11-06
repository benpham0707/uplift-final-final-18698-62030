-- =============================================================================
-- ASTERIA-E: Essay Analysis & Coaching System Database Schema
-- Version: 1.0.0
-- Created: 2025-11-05
-- =============================================================================

-- Create custom ENUM types for essays
-- =============================================================================

CREATE TYPE essay_type AS ENUM (
  'personal_statement',
  'uc_piq',
  'why_us',
  'community',
  'challenge_adversity',
  'intellectual_vitality',
  'activity_to_essay',
  'identity_background',
  'other'
);

CREATE TYPE impression_label AS ENUM (
  'arresting_deeply_human',     -- 90-100
  'compelling_clear_voice',     -- 80-89
  'competent_needs_texture',    -- 70-79
  'readable_but_generic',       -- 60-69
  'template_like_rebuild'       -- <60
);

CREATE TYPE voice_style AS ENUM (
  'concise_operator',
  'warm_reflective',
  'understated'
);

CREATE TYPE analysis_depth AS ENUM (
  'quick',
  'standard',
  'comprehensive'
);

-- =============================================================================
-- TABLE: essays
-- Core essay storage with versioning support
-- =============================================================================

CREATE TABLE essays (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Essay metadata
  essay_type essay_type NOT NULL,
  prompt_text TEXT,
  max_words INTEGER NOT NULL DEFAULT 650,
  target_school TEXT,

  -- Essay content
  draft_original TEXT NOT NULL,
  draft_current TEXT,
  version INTEGER NOT NULL DEFAULT 1,

  -- Context information
  context_constraints TEXT,
  intended_major TEXT,

  -- Status tracking
  submitted_at TIMESTAMPTZ,
  locked BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT max_words_positive CHECK (max_words > 0),
  CONSTRAINT version_positive CHECK (version > 0)
);

-- Add indexes for common queries
CREATE INDEX idx_essays_user_id ON essays(user_id);
CREATE INDEX idx_essays_profile_id ON essays(profile_id);
CREATE INDEX idx_essays_type ON essays(essay_type);
CREATE INDEX idx_essays_created_at ON essays(created_at DESC);

-- Add full-text search on essay content
CREATE INDEX idx_essays_draft_search ON essays USING gin(to_tsvector('english', draft_original));

-- Add RLS policies
ALTER TABLE essays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own essays"
  ON essays FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own essays"
  ON essays FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own essays"
  ON essays FOR UPDATE
  USING (auth.uid() = user_id AND locked = FALSE);

CREATE POLICY "Users can delete own essays"
  ON essays FOR DELETE
  USING (auth.uid() = user_id AND locked = FALSE);

-- =============================================================================
-- TABLE: essay_analysis_reports
-- Stores analysis results from Analysis Engine
-- =============================================================================

CREATE TABLE essay_analysis_reports (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,

  -- Metadata
  rubric_version TEXT NOT NULL DEFAULT 'v1.0.0',
  analysis_depth analysis_depth NOT NULL DEFAULT 'standard',

  -- Overall scores
  essay_quality_index NUMERIC(5,2) NOT NULL CHECK (essay_quality_index >= 0 AND essay_quality_index <= 100),
  impression_label impression_label NOT NULL,

  -- Detailed scores (JSONB for all 12 dimensions)
  dimension_scores JSONB NOT NULL,
  weights JSONB NOT NULL,

  -- Diagnostics
  flags TEXT[] DEFAULT '{}',
  prioritized_levers TEXT[] DEFAULT '{}',

  -- Elite pattern analysis
  elite_pattern_profile JSONB,

  -- Token usage tracking
  token_usage JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT dimension_scores_valid CHECK (jsonb_typeof(dimension_scores) = 'array'),
  CONSTRAINT weights_valid CHECK (jsonb_typeof(weights) = 'object')
);

-- Add indexes
CREATE INDEX idx_analysis_essay_id ON essay_analysis_reports(essay_id);
CREATE INDEX idx_analysis_eqi ON essay_analysis_reports(essay_quality_index DESC);
CREATE INDEX idx_analysis_created_at ON essay_analysis_reports(created_at DESC);
CREATE INDEX idx_analysis_impression ON essay_analysis_reports(impression_label);

-- Add RLS policies
ALTER TABLE essay_analysis_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own essay analyses"
  ON essay_analysis_reports FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

CREATE POLICY "System can insert analysis reports"
  ON essay_analysis_reports FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

-- =============================================================================
-- TABLE: essay_coaching_plans
-- Stores coaching outputs from Story Coach Engine
-- =============================================================================

CREATE TABLE essay_coaching_plans (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  analysis_report_id UUID REFERENCES essay_analysis_reports(id) ON DELETE SET NULL,

  -- Goal and context
  goal_statement TEXT NOT NULL,
  coaching_depth analysis_depth NOT NULL DEFAULT 'standard',

  -- Coaching content (all JSONB for flexibility)
  outline_variants JSONB NOT NULL DEFAULT '[]',
  micro_edits JSONB NOT NULL DEFAULT '[]',
  rewrites_by_style JSONB NOT NULL DEFAULT '{}',

  -- Elicitation prompts (grouped by type)
  elicitation_prompts JSONB NOT NULL DEFAULT '{}',

  -- Guardrails and guidance
  guardrails TEXT[] DEFAULT '{}',
  word_budget_guidance TEXT,
  school_alignment_todo TEXT[],

  -- Token usage tracking
  token_usage JSONB,

  -- Acceptance tracking
  accepted BOOLEAN DEFAULT FALSE,
  student_feedback TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT outline_variants_valid CHECK (jsonb_typeof(outline_variants) = 'array'),
  CONSTRAINT micro_edits_valid CHECK (jsonb_typeof(micro_edits) = 'array'),
  CONSTRAINT rewrites_valid CHECK (jsonb_typeof(rewrites_by_style) = 'object'),
  CONSTRAINT elicitation_valid CHECK (jsonb_typeof(elicitation_prompts) = 'object')
);

-- Add indexes
CREATE INDEX idx_coaching_essay_id ON essay_coaching_plans(essay_id);
CREATE INDEX idx_coaching_analysis_id ON essay_coaching_plans(analysis_report_id);
CREATE INDEX idx_coaching_created_at ON essay_coaching_plans(created_at DESC);
CREATE INDEX idx_coaching_accepted ON essay_coaching_plans(accepted);

-- Add RLS policies
ALTER TABLE essay_coaching_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own coaching plans"
  ON essay_coaching_plans FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

CREATE POLICY "System can insert coaching plans"
  ON essay_coaching_plans FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own coaching plan feedback"
  ON essay_coaching_plans FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

-- =============================================================================
-- TABLE: application_sets
-- Groups essays belonging to same application (for coherence checking)
-- =============================================================================

CREATE TABLE application_sets (
  -- Primary keys
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Set metadata
  name TEXT NOT NULL, -- e.g., "Common App 2025"
  target_schools TEXT[] DEFAULT '{}',

  -- Coherence analysis results
  voice_fingerprint JSONB,
  fact_graph JSONB,
  motif_map JSONB,

  -- Anti-ghostwriting signals
  coherence_score NUMERIC(5,2) CHECK (coherence_score >= 0 AND coherence_score <= 100),
  voice_drift_alerts TEXT[] DEFAULT '{}',
  fact_conflicts TEXT[] DEFAULT '{}',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_coherence_check TIMESTAMPTZ
);

-- Add indexes
CREATE INDEX idx_app_sets_user_id ON application_sets(user_id);
CREATE INDEX idx_app_sets_profile_id ON application_sets(profile_id);

-- Add RLS policies
ALTER TABLE application_sets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own application sets"
  ON application_sets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own application sets"
  ON application_sets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own application sets"
  ON application_sets FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================================================
-- TABLE: essay_set_membership
-- Junction table linking essays to application sets
-- =============================================================================

CREATE TABLE essay_set_membership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
  application_set_id UUID NOT NULL REFERENCES application_sets(id) ON DELETE CASCADE,

  -- Ordering within set
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique membership
  UNIQUE(essay_id, application_set_id)
);

-- Add indexes
CREATE INDEX idx_membership_essay ON essay_set_membership(essay_id);
CREATE INDEX idx_membership_set ON essay_set_membership(application_set_id);

-- Add RLS policies
ALTER TABLE essay_set_membership ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own essay memberships"
  ON essay_set_membership FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own essay memberships"
  ON essay_set_membership FOR ALL
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

-- =============================================================================
-- TABLE: essay_revision_history
-- Tracks all revisions to essays for audit trail
-- =============================================================================

CREATE TABLE essay_revision_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  essay_id UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,

  -- Revision metadata
  version INTEGER NOT NULL,
  draft_content TEXT NOT NULL,

  -- What changed
  change_summary TEXT,
  source TEXT, -- 'student', 'coach_suggestion', 'system_auto'
  coaching_plan_id UUID REFERENCES essay_coaching_plans(id) ON DELETE SET NULL,

  -- Word count tracking
  word_count INTEGER,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT version_positive CHECK (version > 0)
);

-- Add indexes
CREATE INDEX idx_revision_essay_id ON essay_revision_history(essay_id);
CREATE INDEX idx_revision_version ON essay_revision_history(essay_id, version DESC);

-- Add RLS policies
ALTER TABLE essay_revision_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own revision history"
  ON essay_revision_history FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM essays WHERE essays.id = essay_id AND essays.user_id = auth.uid()
  ));

-- =============================================================================
-- TRIGGERS
-- Automatic timestamp updates and maintenance
-- =============================================================================

-- Update updated_at on essays
CREATE OR REPLACE FUNCTION update_essays_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER essays_updated_at
  BEFORE UPDATE ON essays
  FOR EACH ROW
  EXECUTE FUNCTION update_essays_updated_at();

-- Auto-increment version on essay update
CREATE OR REPLACE FUNCTION increment_essay_version()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.draft_current IS DISTINCT FROM OLD.draft_current THEN
    NEW.version = OLD.version + 1;

    -- Also create revision history entry
    INSERT INTO essay_revision_history (essay_id, version, draft_content, source, word_count)
    VALUES (
      NEW.id,
      NEW.version,
      NEW.draft_current,
      'student',
      array_length(regexp_split_to_array(trim(NEW.draft_current), '\s+'), 1)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER essay_version_increment
  BEFORE UPDATE ON essays
  FOR EACH ROW
  EXECUTE FUNCTION increment_essay_version();

-- Update application_sets updated_at
CREATE OR REPLACE FUNCTION update_app_sets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER app_sets_updated_at
  BEFORE UPDATE ON application_sets
  FOR EACH ROW
  EXECUTE FUNCTION update_app_sets_updated_at();

-- =============================================================================
-- VIEWS
-- Convenient queries for common operations
-- =============================================================================

-- View: Latest analysis report per essay
CREATE OR REPLACE VIEW essay_latest_analysis AS
SELECT DISTINCT ON (essay_id)
  ear.*
FROM essay_analysis_reports ear
ORDER BY essay_id, created_at DESC;

-- View: Latest coaching plan per essay
CREATE OR REPLACE VIEW essay_latest_coaching AS
SELECT DISTINCT ON (essay_id)
  ecp.*
FROM essay_coaching_plans ecp
ORDER BY essay_id, created_at DESC;

-- View: Essay with latest analysis and coaching
CREATE OR REPLACE VIEW essays_with_latest_reports AS
SELECT
  e.*,
  ela.id as analysis_id,
  ela.essay_quality_index,
  ela.impression_label,
  ela.dimension_scores,
  ela.flags,
  ela.prioritized_levers,
  elc.id as coaching_id,
  elc.goal_statement,
  elc.outline_variants,
  elc.accepted as coaching_accepted
FROM essays e
LEFT JOIN essay_latest_analysis ela ON e.id = ela.essay_id
LEFT JOIN essay_latest_coaching elc ON e.id = elc.essay_id;

-- =============================================================================
-- GRANT PERMISSIONS
-- =============================================================================

-- Grant access to authenticated users
GRANT SELECT, INSERT, UPDATE, DELETE ON essays TO authenticated;
GRANT SELECT, INSERT ON essay_analysis_reports TO authenticated;
GRANT SELECT, INSERT, UPDATE ON essay_coaching_plans TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON application_sets TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON essay_set_membership TO authenticated;
GRANT SELECT ON essay_revision_history TO authenticated;

-- Grant access to views
GRANT SELECT ON essay_latest_analysis TO authenticated;
GRANT SELECT ON essay_latest_coaching TO authenticated;
GRANT SELECT ON essays_with_latest_reports TO authenticated;

-- =============================================================================
-- COMMENTS FOR DOCUMENTATION
-- =============================================================================

COMMENT ON TABLE essays IS 'Core essay storage with versioning and context information';
COMMENT ON TABLE essay_analysis_reports IS 'Analysis Engine outputs: rubric scores, EQI, diagnostics';
COMMENT ON TABLE essay_coaching_plans IS 'Story Coach Engine outputs: outlines, edits, rewrites, elicitation';
COMMENT ON TABLE application_sets IS 'Groups essays for coherence checking across application';
COMMENT ON TABLE essay_set_membership IS 'Junction table linking essays to application sets';
COMMENT ON TABLE essay_revision_history IS 'Complete audit trail of all essay revisions';

COMMENT ON COLUMN essays.draft_original IS 'Original student draft (never modified)';
COMMENT ON COLUMN essays.draft_current IS 'Current working draft (may be edited)';
COMMENT ON COLUMN essays.locked IS 'Prevent edits when essay is submitted/final';
COMMENT ON COLUMN essay_analysis_reports.dimension_scores IS 'Array of 12 rubric dimension scores with evidence';
COMMENT ON COLUMN essay_analysis_reports.elite_pattern_profile IS 'Elite pattern detector results (micro→macro, vulnerability, etc.)';
COMMENT ON COLUMN essay_coaching_plans.outline_variants IS 'Array of 2-3 different narrative structures';
COMMENT ON COLUMN essay_coaching_plans.rewrites_by_style IS 'Object with rewrites in different voice styles';
COMMENT ON COLUMN application_sets.voice_fingerprint IS 'Cross-essay voice consistency profile';
COMMENT ON COLUMN application_sets.fact_graph IS 'Named entities, dates, roles for consistency checking';

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
