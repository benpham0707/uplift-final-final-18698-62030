-- Ensure helper exists
CREATE OR REPLACE FUNCTION public.set_timestamp() RETURNS trigger AS $fn$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$fn$ LANGUAGE plpgsql;

-- Add updated_at to personal_information if missing
ALTER TABLE public.personal_information
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Recreate BEFORE UPDATE triggers to auto-bump updated_at
DROP TRIGGER IF EXISTS profiles_set_timestamp ON public.profiles;
CREATE TRIGGER profiles_set_timestamp
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS academic_journey_set_timestamp ON public.academic_journey;
CREATE TRIGGER academic_journey_set_timestamp
BEFORE UPDATE ON public.academic_journey
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS experiences_activities_set_timestamp ON public.experiences_activities;
CREATE TRIGGER experiences_activities_set_timestamp
BEFORE UPDATE ON public.experiences_activities
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS family_responsibilities_set_timestamp ON public.family_responsibilities;
CREATE TRIGGER family_responsibilities_set_timestamp
BEFORE UPDATE ON public.family_responsibilities
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS goals_aspirations_set_timestamp ON public.goals_aspirations;
CREATE TRIGGER goals_aspirations_set_timestamp
BEFORE UPDATE ON public.goals_aspirations
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS personal_growth_set_timestamp ON public.personal_growth;
CREATE TRIGGER personal_growth_set_timestamp
BEFORE UPDATE ON public.personal_growth
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS personal_information_set_timestamp ON public.personal_information;
CREATE TRIGGER personal_information_set_timestamp
BEFORE UPDATE ON public.personal_information
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

DROP TRIGGER IF EXISTS support_network_set_timestamp ON public.support_network;
CREATE TRIGGER support_network_set_timestamp
BEFORE UPDATE ON public.support_network
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

-- Snapshot table trigger (idempotent)
DROP TRIGGER IF EXISTS portfolio_analytics_set_timestamp ON public.portfolio_analytics;
CREATE TRIGGER portfolio_analytics_set_timestamp
BEFORE UPDATE ON public.portfolio_analytics
FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();

