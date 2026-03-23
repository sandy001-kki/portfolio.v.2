import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create client when real credentials are present
export const supabase: SupabaseClient | null =
  url && url.startsWith('http') && key && key !== 'your_supabase_anon_key'
    ? createClient(url, key)
    : null;

export const supabaseReady = !!supabase;

export interface ContactMessage {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  organization: string;
  region: string;
  industry: string;
  message: string;
  type: 'contact' | 'hire';
  created_at?: string;
}

export interface HireRequest {
  id?: string;
  name: string;
  email: string;
  company: string;
  role: string;
  project_type: string;
  timeline: string;
  budget: string;
  description: string;
  created_at?: string;
}
