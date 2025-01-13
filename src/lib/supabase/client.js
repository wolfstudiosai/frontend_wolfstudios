import { createBrowserClient } from '@supabase/ssr';

import { config } from '/src/config';

export function createClient() {
  return createBrowserClient(config.supabase.url, config.supabase.anonKey);
}
