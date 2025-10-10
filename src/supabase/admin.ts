import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Accept multiple env names found in hosting dashboards
const url = (process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_PROJECT_URL) as string;
const serviceKey = (
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY
) as string;

if (!url) {
  throw new Error("Missing Supabase URL. Set VITE_SUPABASE_URL or SUPABASE_URL in your environment.");
}
if (!serviceKey) {
  throw new Error("Missing Supabase service key. Set SUPABASE_SERVICE_ROLE_KEY (preferred) or SUPABASE_SERVICE_KEY.");
}

export const supabaseAdmin = createClient<Database>(url, serviceKey, {
  auth: { persistSession: false }
});


