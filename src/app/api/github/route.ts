import { NextResponse } from 'next/server';
import { fetchGitHub } from '@/lib/github';

// Cache the GitHub API response for 1 hour at the route level. Combined
// with fetch-level revalidate this keeps us far under the rate limit and
// means a new public repo appears within ~1h with no code change.
export const revalidate = 3600;

export async function GET() {
  const stats = await fetchGitHub();
  return NextResponse.json(stats, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
