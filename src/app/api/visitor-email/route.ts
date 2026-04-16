import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !url.startsWith('http') || !key || key === 'your_supabase_anon_key') {
    return NextResponse.json({ ok: false, error: 'Supabase not configured' });
  }

  try {
    const body = await req.json();
    const email: string = (body.email ?? '').trim().toLowerCase();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Invalid email' }, { status: 400 });
    }

    const sb = createClient(url, key);
    const { error } = await sb.from('visitor_emails').upsert(
      [{
        email,
        source: body.source ?? 'banner',
        user_agent: req.headers.get('user-agent') ?? null,
        referrer: req.headers.get('referer') ?? null,
      }],
      { onConflict: 'email', ignoreDuplicates: true }
    );

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
