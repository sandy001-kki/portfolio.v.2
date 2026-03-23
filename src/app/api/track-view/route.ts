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
    // Skip admin pages from tracking
    if (path?.startsWith('/admin')) return NextResponse.json({ ok: false });

    const sb = createClient(url, key);
    await sb.from('page_views').insert([{ path: path || '/' }]);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
