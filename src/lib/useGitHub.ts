'use client';

import { useEffect, useState } from 'react';
import type { GitHubStats } from './github';
import { PROJECTS, type Project, type Category } from './projects';

/** Client hook: fetches the cached /api/github payload once on mount. */
export function useGitHub() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    fetch('/api/github')
      .then((r) => r.json())
      .then((d: GitHubStats) => { if (alive) setStats(d); })
      .catch(() => { /* curated fallback */ })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return { stats, loading };
}

/**
 * Merge curated PROJECTS with live GitHub repos:
 *  - curated entries are hydrated with live stars/language/updatedAt (override-first)
 *  - any public repo not already curated is appended to Archive / Labs automatically
 */
export function mergeProjects(stats: GitHubStats | null): Project[] {
  const curated = PROJECTS.map((p) => {
    if (!p.repo || !stats?.ok) return p;
    const live = stats.repos.find((r) => r.name.toLowerCase() === p.repo!.toLowerCase());
    if (!live) return p;
    return {
      ...p,
      stars: live.stargazers_count,
      language: live.language ?? undefined,
      updatedAt: live.pushed_at,
    };
  });

  if (!stats?.ok) return curated;

  const knownRepos = new Set(
    PROJECTS.filter((p) => p.repo).map((p) => p.repo!.toLowerCase())
  );

  const discovered: Project[] = stats.repos
    .filter((r) => !knownRepos.has(r.name.toLowerCase()))
    .map((r) => ({
      id: `gh-${r.name.toLowerCase()}`,
      title: r.name.replace(/[-_]/g, ' '),
      description: r.description ?? 'Public repository on GitHub.',
      longDesc: r.description ?? `Auto-discovered public repository: ${r.name}.`,
      category: 'Archive / Labs' as Category,
      status: 'Open Source' as const,
      tags: [r.language, ...(r.topics ?? [])].filter(Boolean).slice(0, 6) as string[],
      repo: r.name,
      github: r.html_url,
      demo: r.homepage || undefined,
      year: new Date(r.pushed_at).getFullYear(),
      stars: r.stargazers_count,
      language: r.language ?? undefined,
      updatedAt: r.pushed_at,
    }));

  return [...curated, ...discovered];
}
