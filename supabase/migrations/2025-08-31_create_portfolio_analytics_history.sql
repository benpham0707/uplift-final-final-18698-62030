-- Minimal append-only history for portfolio analytics
CREATE TABLE IF NOT EXISTS public.portfolio_analytics_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL,
  prev_overall numeric,
  new_overall numeric NOT NULL,
  prev_dimensions jsonb,
  new_dimensions jsonb NOT NULL,
  changed_fields jsonb,
  reason_summary text,
  model_used text,
  cost_cents integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT portfolio_analytics_history_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

