import { createClient } from '@supabase/supabase-js';
import { getEnv } from '@/utils/env';

export function getServerSupabaseClient() {
  const env = getEnv();
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
