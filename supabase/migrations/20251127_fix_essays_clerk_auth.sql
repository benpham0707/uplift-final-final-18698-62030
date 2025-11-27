-- Fix migration: Update essays and related tables to use Clerk Auth RLS policies
-- The essays table already has text user_id, but policies still use auth.uid()
-- We need to update them to use auth.jwt() ->> 'sub' for Clerk

-- ============================================
-- STEP 1: DROP OLD RLS POLICIES ON ESSAYS TABLES
-- ============================================

-- Essays table
DROP POLICY IF EXISTS "Users can view own essays" ON public.essays;
DROP POLICY IF EXISTS "Users can insert own essays" ON public.essays;
DROP POLICY IF EXISTS "Users can update own essays" ON public.essays;
DROP POLICY IF EXISTS "Users can delete own essays" ON public.essays;
DROP POLICY IF EXISTS "Clerk: Users can view own essays" ON public.essays;
DROP POLICY IF EXISTS "Clerk: Users can insert own essays" ON public.essays;
DROP POLICY IF EXISTS "Clerk: Users can update own essays" ON public.essays;
DROP POLICY IF EXISTS "Clerk: Users can delete own essays" ON public.essays;

-- Essay analysis reports
DROP POLICY IF EXISTS "Users can view own essay analyses" ON public.essay_analysis_reports;
DROP POLICY IF EXISTS "System can insert analysis reports" ON public.essay_analysis_reports;
DROP POLICY IF EXISTS "Clerk: Users can view own essay analyses" ON public.essay_analysis_reports;
DROP POLICY IF EXISTS "Clerk: Users can insert own essay analyses" ON public.essay_analysis_reports;

-- Essay coaching plans
DROP POLICY IF EXISTS "Users can view own coaching plans" ON public.essay_coaching_plans;
DROP POLICY IF EXISTS "System can insert coaching plans" ON public.essay_coaching_plans;
DROP POLICY IF EXISTS "Users can update own coaching plan feedback" ON public.essay_coaching_plans;
DROP POLICY IF EXISTS "Clerk: Users can view own coaching plans" ON public.essay_coaching_plans;
DROP POLICY IF EXISTS "Clerk: Users can insert own coaching plans" ON public.essay_coaching_plans;
DROP POLICY IF EXISTS "Clerk: Users can update own coaching plans" ON public.essay_coaching_plans;

-- Essay revision history
DROP POLICY IF EXISTS "Users can view own revision history" ON public.essay_revision_history;
DROP POLICY IF EXISTS "Clerk: Users can view own revision history" ON public.essay_revision_history;


-- ============================================
-- STEP 2: RECREATE POLICIES FOR CLERK
-- ============================================

-- Essays table - using Clerk JWT 'sub' claim
CREATE POLICY "Clerk: Users can view own essays" ON public.essays
    FOR SELECT TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub'));

CREATE POLICY "Clerk: Users can insert own essays" ON public.essays
    FOR INSERT TO authenticated
    WITH CHECK (user_id = (select auth.jwt() ->> 'sub'));

CREATE POLICY "Clerk: Users can update own essays" ON public.essays
    FOR UPDATE TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub') AND locked = FALSE);

CREATE POLICY "Clerk: Users can delete own essays" ON public.essays
    FOR DELETE TO authenticated
    USING (user_id = (select auth.jwt() ->> 'sub') AND locked = FALSE);

-- Essay analysis reports
CREATE POLICY "Clerk: Users can view own essay analyses" ON public.essay_analysis_reports
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: Users can insert own essay analyses" ON public.essay_analysis_reports
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- Essay coaching plans
CREATE POLICY "Clerk: Users can view own coaching plans" ON public.essay_coaching_plans
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: Users can insert own coaching plans" ON public.essay_coaching_plans
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

CREATE POLICY "Clerk: Users can update own coaching plans" ON public.essay_coaching_plans
    FOR UPDATE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- Essay revision history
CREATE POLICY "Clerk: Users can view own revision history" ON public.essay_revision_history
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- ============================================
-- END OF MIGRATION
-- ============================================
