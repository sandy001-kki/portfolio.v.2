'use client';

import { Github, Star, GitFork, ArrowUpRight, RefreshCw, Tag } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useGitHub } from '@/lib/useGitHub';
import { GITHUB_PRIMARY } from '@/lib/projects';
import type { ContributionDay } from '@/lib/github';

function timeAgo(iso?: string) {
  if (!iso) return '';
  const d = Date.now() - new Date(iso).getTime();
  const days = Math.floor(d / 86_400_000);
  if (days < 1) return 'today';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// Heatmap square colors per intensity level (portfolio indigo, GitHub-style ramp).
const LEVEL_BG = ['#ECEBF4', '#C7CCF7', '#9AA3F2', '#6D78EC', '#4F46E5'];

function Heatmap({ weeks, total }: { weeks: ContributionDay[][]; total: number }) {
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, ci) => {
    const first = week[0];
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ label: new Date(first.date).toLocaleString('en', { month: 'short' }), col: ci });
      lastMonth = m;
    }
  });

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '6px' }}>
        <p style={{ color: '#0F0E14', fontSize: '0.92rem', fontWeight: 600 }}>
          <span style={{ color: '#6366F1', fontWeight: 800 }}>{total.toLocaleString()}</span> contributions in the last year
        </p>
        <span style={{ color: '#C8C7CC', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace' }}>
          live · GitHub GraphQL
        </span>
      </div>

      <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
        <div style={{ display: 'inline-block', minWidth: 'min-content' }}>
          {/* Month labels */}
          <div style={{ display: 'flex', gap: '3px', marginBottom: '4px', paddingLeft: '2px' }}>
            {weeks.map((_, ci) => {
              const lbl = monthLabels.find((m) => m.col === ci);
              return (
                <div key={ci} style={{ width: 11, fontSize: '0.6rem', color: '#9CA3AF', fontFamily: 'JetBrains Mono, monospace' }}>
                  {lbl ? lbl.label : ''}
                </div>
              );
            })}
          </div>
          {/* Grid: columns = weeks, rows = days */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {weeks.map((week, ci) => (
              <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {week.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    style={{ width: 11, height: 11, borderRadius: '2px', background: LEVEL_BG[day.level] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '10px', justifyContent: 'flex-end' }}>
        <span style={{ color: '#9CA3AF', fontSize: '0.66rem', marginRight: '2px' }}>Less</span>
        {LEVEL_BG.map((bg) => (
          <span key={bg} style={{ width: 10, height: 10, borderRadius: '2px', background: bg, display: 'inline-block' }} />
        ))}
        <span style={{ color: '#9CA3AF', fontSize: '0.66rem', marginLeft: '2px' }}>More</span>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const { stats, loading } = useGitHub();

  const stat = (value: string | number, label: string) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: '1.7rem', color: '#6366F1', letterSpacing: '-0.04em', lineHeight: 1 }}>
        {value}
      </div>
      <div style={{ color: '#9CA3AF', fontSize: '0.72rem', marginTop: '4px', fontWeight: 500 }}>{label}</div>
    </div>
  );

  return (
    <section id="github" style={{ padding: '112px 24px', background: '#FAF9F6' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              GitHub Activity
            </p>
            <h2 className="section-title" style={{ marginBottom: '12px' }}>
              Live from <span style={{ color: '#6366F1' }}>open source</span>
            </h2>
            <p style={{ color: '#6B7280', maxWidth: '520px', margin: '0 auto', fontSize: '0.92rem' }}>
              Pulled live from the GitHub API — new public repositories appear here automatically.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <div style={{
            background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '20px',
            padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            {/* Stats row */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around',
              gap: '24px', paddingBottom: '28px', borderBottom: '1px solid #F0EFF4', marginBottom: '28px',
            }}>
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#9CA3AF', fontSize: '0.85rem' }}>
                  <RefreshCw size={14} className="float-anim" /> Loading live GitHub data…
                </span>
              ) : (
                <>
                  {stat(stats?.totalRepos ?? '—', 'Public Repos')}
                  {stat(stats?.totalStars ?? '—', 'Total Stars')}
                  {stat(stats?.languages.length ?? '—', 'Languages')}
                  {stat(stats?.contributions?.totalContributions?.toLocaleString() ?? stats?.recent.length ?? '—', stats?.contributions ? 'Contributions' : 'Active Projects')}
                </>
              )}
            </div>

            {/* Contribution heatmap (GraphQL, token only) */}
            {stats?.ok && stats.contributions && stats.contributions.weeks.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <Heatmap weeks={stats.contributions.weeks} total={stats.contributions.totalContributions} />
              </div>
            )}

            {/* Languages */}
            {stats?.ok && stats.languages.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <p style={{
                  color: '#9CA3AF', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px',
                }}>
                  Languages
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {stats.languages.slice(0, 10).map((l) => (
                    <span key={l.name} style={{
                      fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace',
                      padding: '5px 12px', borderRadius: '8px',
                      background: '#F3F2EF', color: '#374151', border: '1px solid #E0DFE4',
                    }}>
                      {l.name} <span style={{ color: '#9CA3AF' }}>· {l.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Latest releases */}
            {stats?.ok && stats.releases.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <p style={{
                  color: '#9CA3AF', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px',
                }}>
                  Latest Releases
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {stats.releases.map((rel) => (
                    <a key={`${rel.repo}-${rel.tag}`} href={rel.url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '7px',
                        padding: '7px 13px', borderRadius: '9px',
                        background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.22)',
                        color: '#4F46E5', textDecoration: 'none', fontSize: '0.76rem', fontWeight: 600,
                      }}>
                      <Tag size={12} /> {rel.repo} <span style={{ color: '#6366F1', fontFamily: 'JetBrains Mono, monospace' }}>{rel.tag}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Recently updated repos */}
            {stats?.ok && stats.recent.length > 0 && (
              <div>
                <p style={{
                  color: '#9CA3AF', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px',
                }}>
                  Recently Updated
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))', gap: '10px' }}>
                  {stats.recent.map((r) => (
                    <a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer"
                      style={{
                        display: 'block', padding: '14px 16px', borderRadius: '12px',
                        border: '1px solid #EBEBEB', background: '#FAF9F6', textDecoration: 'none',
                        transition: 'all 0.18s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.30)'; (e.currentTarget as HTMLElement).style.background = '#F8F7FF'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB'; (e.currentTarget as HTMLElement).style.background = '#FAF9F6'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', marginBottom: '5px' }}>
                        <span style={{ fontWeight: 700, color: '#0F0E14', fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.name}
                        </span>
                        <ArrowUpRight size={13} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#9CA3AF', fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace' }}>
                        {r.language && <span>{r.language}</span>}
                        {r.stargazers_count > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><Star size={9} /> {r.stargazers_count}</span>}
                        {r.forks_count > 0 && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}><GitFork size={9} /> {r.forks_count}</span>}
                        <span style={{ marginLeft: 'auto' }}>{timeAgo(r.pushed_at)}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Fallback note when REST unavailable */}
            {!loading && !stats?.ok && (
              <p style={{ color: '#9CA3AF', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>
                Live GitHub data is momentarily unavailable. Visit the profile directly below.
              </p>
            )}

            {/* Note when running without token (no heatmap) */}
            {!loading && stats?.ok && !stats.contributions && (
              <p style={{ color: '#C8C7CC', fontSize: '0.72rem', textAlign: 'center', marginTop: '4px', fontFamily: 'JetBrains Mono, monospace' }}>
                Contribution graph enables when a GitHub token is configured.
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '28px' }}>
              <a href={GITHUB_PRIMARY} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--ghost">
                <Github size={16} /> @sandeepbollavaram on GitHub
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
