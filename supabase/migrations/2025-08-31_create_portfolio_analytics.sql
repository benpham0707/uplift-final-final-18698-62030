-- Portfolio analytics persistent cache
CREATE TABLE IF NOT EXISTS public.portfolio_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid NOT NULL UNIQUE,
  input_signature text NOT NULL,
  overall numeric NOT NULL,
  dimensions jsonb NOT NULL,
  detailed jsonb NOT NULL,
  cached_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT portfolio_analytics_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

-- Helper trigger to auto-update updated_at on changes
-- Create/replace the helper function (safe to run repeatedly)
CREATE OR REPLACE FUNCTION public.set_timestamp() RETURNS trigger AS $fn$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS portfolio_analytics_set_timestamp ON public.portfolio_analytics;
CREATE TRIGGER portfolio_analytics_set_timestamp
BEFORE UPDATE ON public.portfolio_analytics
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

