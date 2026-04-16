import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'bollavaramsandeep@gmail.com';

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!url || !anonKey || !serviceRoleKey) {
    return NextResponse.json(
      { ok: false, error: 'Supabase admin credentials are not configured.' },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing access token.' }, { status: 401 });
  }

  const authClient = createClient(url, anonKey);
  const { data: userData, error: authError } = await authClient.auth.getUser(token);

  if (authError || userData.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const adminClient = createClient(url, serviceRoleKey);
  const { data, error } = await adminClient
    .from('visitor_emails')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, emails: data ?? [] });
}
