import { createClient } from "@supabase/supabase-js";

/**
 * Server-only admin Supabase client with service role key.
 * Bypasses Row Level Security — use ONLY for server-side operations
 * that require elevated privileges (e.g., order price verification).
 *
 * NEVER import this file in client components.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL env vars"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
