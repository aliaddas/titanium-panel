import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';

export function createSupabaseClient() {
  return createPagesBrowserClient(
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    },
  );
}