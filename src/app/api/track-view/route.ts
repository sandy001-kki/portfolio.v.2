import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !url.startsWith('http') || !key || key === 'your_supabase_anon_key') {
    return NextResponse.json({ ok: false });
  }

  try {
    const { path } = await req.json();
    if (path?.startsWith('/admin')) return NextResponse.json({ ok: false });

    const sb = createClient(url, key);
    await sb.from('page_views').insert([{
      path: path || '/',
      referrer:    req.headers.get('referer')     ?? null,
      user_agent:  req.headers.get('user-agent')  ?? null,
      ip:          req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
    }]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
