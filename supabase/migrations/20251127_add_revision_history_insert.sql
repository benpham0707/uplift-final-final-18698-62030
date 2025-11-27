-- Add INSERT permission for essay_revision_history table
-- This allows users to save version history entries

-- Grant INSERT permission
GRANT INSERT ON public.essay_revision_history TO authenticated;

-- Ensure the insert policy exists (may already exist from previous migration)
DROP POLICY IF EXISTS "Clerk: Users can insert own revision history" ON public.essay_revision_history;

CREATE POLICY "Clerk: Users can insert own revision history" ON public.essay_revision_history
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));
