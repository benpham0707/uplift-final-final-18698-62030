-- Add chat messages table for persisting AI Essay Coach conversations
-- Each essay can have multiple chat messages

-- ============================================
-- CREATE TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS public.essay_chat_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  essay_id uuid NOT NULL REFERENCES public.essays(id) ON DELETE CASCADE,
  
  -- Message content
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  
  -- Timestamps
  message_timestamp bigint NOT NULL, -- Original timestamp from client
  created_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT essay_chat_messages_pkey PRIMARY KEY (id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_chat_messages_essay_id ON public.essay_chat_messages(essay_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_timestamp ON public.essay_chat_messages(essay_id, message_timestamp ASC);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.essay_chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can view chat messages for their own essays
CREATE POLICY "Clerk: Users can view own chat messages" ON public.essay_chat_messages
    FOR SELECT TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- Users can insert chat messages for their own essays
CREATE POLICY "Clerk: Users can insert own chat messages" ON public.essay_chat_messages
    FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- Users can delete their own chat messages (for clearing history)
CREATE POLICY "Clerk: Users can delete own chat messages" ON public.essay_chat_messages
    FOR DELETE TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.essays 
        WHERE essays.id = essay_id 
        AND essays.user_id = (select auth.jwt() ->> 'sub')
    ));

-- ============================================
-- GRANTS
-- ============================================

GRANT SELECT, INSERT, DELETE ON public.essay_chat_messages TO authenticated;

-- ============================================
-- END OF MIGRATION
-- ============================================
