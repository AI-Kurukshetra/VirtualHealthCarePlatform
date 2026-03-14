import { createClient } from '@supabase/supabase-js';
import { getEnv } from '@/utils/env';

let browserClient;

export function getSupabaseClient() {
  const env = getEnv();

  if (!browserClient) {
    browserClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }

  return browserClient;
}
