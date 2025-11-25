-- =============================================================================
-- PIQ Workshop: Add Analysis Fields Migration
-- Created: 2025-11-25
-- Purpose: Add columns to support full PIQ analysis storage including
--          voice fingerprint, experience fingerprint, and workshop items
-- =============================================================================

-- 1. ADD NEW COLUMNS TO essay_analysis_reports
-- These columns store the complete analysis output from the surgical workshop backend

ALTER TABLE essay_analysis_reports
ADD COLUMN IF NOT EXISTS voice_fingerprint JSONB,
ADD COLUMN IF NOT EXISTS experience_fingerprint JSONB,
ADD COLUMN IF NOT EXISTS workshop_items JSONB,
ADD COLUMN IF NOT EXISTS full_analysis_result JSONB;

-- 2. ADD COMMENTS FOR DOCUMENTATION

COMMENT ON COLUMN essay_analysis_reports.voice_fingerprint IS
'Voice Fingerprint data: sentence structure, vocabulary, pacing, and tone analysis from surgical workshop';

COMMENT ON COLUMN essay_analysis_reports.experience_fingerprint IS
'Experience Fingerprint data: uniqueness dimensions, anti-pattern detection, divergence requirements, and quality anchors';

COMMENT ON COLUMN essay_analysis_reports.workshop_items IS
'Array of surgical workshop items with problems, suggestions (polished_original, voice_amplifier, divergent_strategy), and rationales';

COMMENT ON COLUMN essay_analysis_reports.full_analysis_result IS
'Complete AnalysisResult object from backend for archival and debugging purposes';

-- 3. CREATE INDEXES FOR JSONB QUERIES (if needed for performance)

-- Index for checking if voice fingerprint exists
CREATE INDEX IF NOT EXISTS idx_analysis_has_voice_fingerprint
ON essay_analysis_reports ((voice_fingerprint IS NOT NULL));

-- Index for checking if experience fingerprint exists
CREATE INDEX IF NOT EXISTS idx_analysis_has_experience_fingerprint
ON essay_analysis_reports ((experience_fingerprint IS NOT NULL));

-- GIN index for JSONB queries (allows querying nested JSON fields)
CREATE INDEX IF NOT EXISTS idx_analysis_voice_fingerprint_gin
ON essay_analysis_reports USING gin(voice_fingerprint);

CREATE INDEX IF NOT EXISTS idx_analysis_experience_fingerprint_gin
ON essay_analysis_reports USING gin(experience_fingerprint);

CREATE INDEX IF NOT EXISTS idx_analysis_workshop_items_gin
ON essay_analysis_reports USING gin(workshop_items);

-- 4. UPDATE RLS POLICIES FOR ESSAYS TABLE TO SUPPORT CLERK AUTH
-- The essays table currently uses UUID user_id (Supabase auth)
-- We need to update it to use TEXT and Clerk JWT

-- First, check if essays table needs Clerk migration
-- Drop existing policies if they reference auth.uid()

DROP POLICY IF EXISTS "Users can view own essays" ON essays;
DROP POLICY IF EXISTS "Users can insert own essays" ON essays;
DROP POLICY IF EXISTS "Users can update own essays" ON essays;
DROP POLICY IF EXISTS "Users can delete own essays" ON essays;

-- Convert user_id to TEXT for Clerk compatibility
ALTER TABLE essays DROP CONSTRAINT IF EXISTS essays_user_id_fkey;
ALTER TABLE essays ALTER COLUMN user_id TYPE text USING user_id::text;

-- Recreate index
CREATE INDEX IF NOT EXISTS idx_essays_user_id ON essays(user_id);

-- Recreate policies using Clerk JWT
CREATE POLICY "Clerk: Users can view own essays" ON essays
    FOR SELECT TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub'));

CREATE POLICY "Clerk: Users can insert own essays" ON essays
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (select auth.jwt() ->> 'sub'));

CREATE POLICY "Clerk: Users can update own essays" ON essays
    FOR UPDATE TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub') AND locked = FALSE);

CREATE POLICY "Clerk: Users can delete own essays" ON essays
    FOR DELETE TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub') AND locked = FALSE);

-- 5. UPDATE essay_analysis_reports RLS POLICIES
-- These need to check ownership via essays table

DROP POLICY IF EXISTS "Users can view own essay analyses" ON essay_analysis_reports;
DROP POLICY IF EXISTS "System can insert analysis reports" ON essay_analysis_reports;

CREATE POLICY "Clerk: Users can view own essay analyses" ON essay_analysis_reports
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_analysis_reports.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: System can insert analysis reports" ON essay_analysis_reports
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_analysis_reports.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: Users can update own essay analyses" ON essay_analysis_reports
    FOR UPDATE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_analysis_reports.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- 6. UPDATE essay_revision_history RLS POLICIES

DROP POLICY IF EXISTS "Users can view own revision history" ON essay_revision_history;

CREATE POLICY "Clerk: Users can view own revision history" ON essay_revision_history
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_revision_history.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: System can insert revision history" ON essay_revision_history
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_revision_history.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- 7. UPDATE essay_coaching_plans RLS POLICIES

DROP POLICY IF EXISTS "Users can view own coaching plans" ON essay_coaching_plans;
DROP POLICY IF EXISTS "System can insert coaching plans" ON essay_coaching_plans;
DROP POLICY IF EXISTS "Users can update own coaching plan feedback" ON essay_coaching_plans;

CREATE POLICY "Clerk: Users can view own coaching plans" ON essay_coaching_plans
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_coaching_plans.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: System can insert coaching plans" ON essay_coaching_plans
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_coaching_plans.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: Users can update own coaching plan feedback" ON essay_coaching_plans
    FOR UPDATE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM essays
        WHERE essays.id = essay_coaching_plans.essay_id
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- 8. ADD HELPER FUNCTION FOR GETTING CLERK USER ID
-- This makes it easier to get the current user ID in application code

CREATE OR REPLACE FUNCTION current_clerk_user_id()
RETURNS text AS $$
BEGIN
    RETURN (select auth.jwt() ->> 'sub');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION current_clerk_user_id() IS
'Helper function to get the current Clerk user ID from JWT. Use this in application code instead of repeatedly calling auth.jwt() ->> ''sub''';

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION current_clerk_user_id() TO authenticated;

-- =============================================================================
-- VERIFICATION QUERIES (Run these to verify migration success)
-- =============================================================================

-- Check that new columns were added
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'essay_analysis_reports'
-- AND column_name IN ('voice_fingerprint', 'experience_fingerprint', 'workshop_items', 'full_analysis_result');

-- Check that indexes were created
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'essay_analysis_reports'
-- AND indexname LIKE '%fingerprint%' OR indexname LIKE '%workshop%';

-- Check RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
-- FROM pg_policies
-- WHERE tablename IN ('essays', 'essay_analysis_reports', 'essay_revision_history', 'essay_coaching_plans')
-- ORDER BY tablename, policyname;

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
