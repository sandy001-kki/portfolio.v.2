import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !url.startsWith('http') || !key || key === 'your_supabase_anon_key') {
    return NextResponse.json({ total: 0, week: 0, today: 0 });
  }

  try {
    const sb = createClient(url, key);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

    const [totalRes, weekRes, todayRes] = await Promise.all([
      sb.from('page_views').select('id', { count: 'exact', head: true }),
      sb.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', weekAgo),
      sb.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', todayStart),
    ]);

    return NextResponse.json({
      total: totalRes.count ?? 0,
      week:  weekRes.count  ?? 0,
      today: todayRes.count ?? 0,
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return NextResponse.json({ total: 0, week: 0, today: 0 });
  }
}
