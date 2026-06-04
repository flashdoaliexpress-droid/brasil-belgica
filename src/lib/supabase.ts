import { createClient } from "@supabase/supabase-js";

// Fallback values are the public/publishable keys — safe to hardcode since
// Supabase anon keys are designed for client-side use and RLS handles auth.
const url =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://dozzoivnwhcdgtwgsool.supabase.co";
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "sb_publishable_FXtSNL_krgZtcfEYT1pgUg_qHDM4oh4";

export const supabase = createClient(url, key);
