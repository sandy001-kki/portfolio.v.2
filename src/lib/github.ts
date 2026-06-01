// ─────────────────────────────────────────────────────────────
// LIVE GITHUB INTEGRATION
//
// Fetches public repositories for github.com/sandeepbollavaram via the
// GitHub REST API (server-side only), aggregates stats, optionally pulls
// the contribution calendar via GraphQL, and merges everything with the
// curated PROJECTS overrides. New public repos auto-appear; no code edit
// needed. Private repos are never fetched or linked.
//
// TOKEN: read from GITHUB_API (primary) or GITHUB_TOKEN (alias), server-
// side only — never shipped to the browser, never logged. Without it we
// run on the unauthenticated REST API (60 req/hr) and skip the GraphQL
// contribution calendar. With it: 5000 req/hr + live contribution graph.
//
// Caching/rate-limit protection: callers wrap this in route-segment
// revalidate so the GitHub API is hit ~once per hour.
// ─────────────────────────────────────────────────────────────

import { GITHUB_USER, PRIVATE_REPOS } from './projects';

/** Server-only token resolution. Both env names supported. */
function getToken(): string | undefined {
  return process.env.GITHUB_API || process.env.GITHUB_TOKEN || undefined;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  homepage: string | null;
}

export interface GitHubRelease {
  repo: string;
  name: string;
  tag: string;
  url: string;
  publishedAt: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // intensity buckets, like the GitHub heatmap
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionDay[][]; // each week is a column of up to 7 days
}

export interface GitHubStats {
  user: string;
  profileUrl: string;
  totalRepos: number;
  totalStars: number;
  languages: { name: string; count: number }[];
  recent: GitHubRepo[]; // most-recently-pushed public repos
  repos: GitHubRepo[]; // all eligible public repos
  releases: GitHubRelease[]; // latest releases across repos (best-effort)
  contributions: ContributionCalendar | null; // GraphQL only; null on fallback
  authenticated: boolean; // true when a token was used
  fetchedAt: string;
  ok: boolean; // false when REST failed / rate-limited (use curated fallback)
}

const PROFILE_URL = `https://github.com/${GITHUB_USER}`;

const EMPTY: GitHubStats = {
  user: GITHUB_USER,
  profileUrl: PROFILE_URL,
  totalRepos: 0,
  totalStars: 0,
  languages: [],
  recent: [],
  repos: [],
  releases: [],
  contributions: null,
  authenticated: false,
  fetchedAt: new Date(0).toISOString(),
  ok: false,
};

const PRIVATE = new Set(PRIVATE_REPOS.map((r) => r.toLowerCase()));

/**
 * GraphQL contribution calendar. Requires a token. Returns null on any
 * failure so the UI falls back to repos/stars/languages cleanly.
 */
async function fetchContributions(token: string): Promise<ContributionCalendar | null> {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }`;
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'sandeepbollavaram-portfolio',
      },
      body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    // Bucket counts into 0–4 levels relative to the busiest day.
    const allDays: { date: string; count: number }[] = [];
    for (const w of cal.weeks) {
      for (const d of w.contributionDays) {
        allDays.push({ date: d.date, count: d.contributionCount });
      }
    }
    const max = allDays.reduce((m, d) => Math.max(m, d.count), 0) || 1;
    const level = (c: number): 0 | 1 | 2 | 3 | 4 => {
      if (c === 0) return 0;
      const r = c / max;
      if (r > 0.66) return 4;
      if (r > 0.33) return 3;
      if (r > 0.1) return 2;
      return 1;
    };

    const weeks: ContributionDay[][] = cal.weeks.map(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: level(d.contributionCount) }))
    );

    return { totalContributions: cal.totalContributions, weeks };
  } catch {
    return null;
  }
}

/**
 * Best-effort latest releases for the most-recently-pushed repos. Uses the
 * cheap `/releases/latest` endpoint and ignores repos without releases.
 */
async function fetchReleases(repos: GitHubRepo[], headers: Record<string, string>): Promise<GitHubRelease[]> {
  const candidates = repos.slice(0, 8); // cap requests to stay well under rate limit
  const results = await Promise.all(
    candidates.map(async (r) => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_USER}/${r.name}/releases/latest`,
          { headers, next: { revalidate: 3600 } }
        );
        if (!res.ok) return null;
        const rel = await res.json();
        if (!rel?.tag_name) return null;
        return {
          repo: r.name,
          name: rel.name || rel.tag_name,
          tag: rel.tag_name,
          url: rel.html_url,
          publishedAt: rel.published_at,
        } as GitHubRelease;
      } catch {
        return null;
      }
    })
  );
  return results
    .filter((x): x is GitHubRelease => x !== null)
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 4);
}

/**
 * Fetch all public, non-fork repos for the configured user, excluding the
 * private/internal list. Adds releases and (if a token exists) the
 * contribution calendar. Returns a graceful empty result on REST failure.
 */
export async function fetchGitHub(): Promise<GitHubStats> {
  const token = getToken();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'sandeepbollavaram-portfolio',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const repos: GitHubRepo[] = [];
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=pushed&type=owner`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) return EMPTY; // 403 rate-limit or other — fall back
      const batch: GitHubRepo[] = await res.json();
      repos.push(...batch);
      if (batch.length < 100) break;
    }

    const eligible = repos.filter((r) => !r.fork && !PRIVATE.has(r.name.toLowerCase()));

    const langCounts = new Map<string, number>();
    let totalStars = 0;
    for (const r of eligible) {
      totalStars += r.stargazers_count;
      if (r.language) langCounts.set(r.language, (langCounts.get(r.language) ?? 0) + 1);
    }
    const languages = [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const byPushed = [...eligible].sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));

    // Releases + contributions run in parallel; both degrade gracefully.
    const [releases, contributions] = await Promise.all([
      fetchReleases(byPushed, headers),
      token ? fetchContributions(token) : Promise.resolve(null),
    ]);

    return {
      user: GITHUB_USER,
      profileUrl: PROFILE_URL,
      totalRepos: eligible.length,
      totalStars,
      languages,
      recent: byPushed.slice(0, 6),
      repos: byPushed,
      releases,
      contributions,
      authenticated: Boolean(token),
      fetchedAt: new Date().toISOString(),
      ok: true,
    };
  } catch {
    return EMPTY;
  }
}
