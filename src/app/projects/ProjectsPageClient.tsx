'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowLeft, Github } from 'lucide-react';
import { CATEGORIES, type Category, type Project, GITHUB_PRIMARY } from '@/lib/projects';
import { useGitHub, mergeProjects } from '@/lib/useGitHub';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';

export default function ProjectsPageClient() {
  const { stats, loading } = useGitHub();
  const [active, setActive] = useState<Category>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Project | null>(null);

  const all = useMemo(() => mergeProjects(stats), [stats]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((p) => {
      const byCat = active === 'All' || p.category === active;
      if (!byCat) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [all, active, query]);

  return (
    <main style={{ minHeight: '100vh', background: '#FAF9F6', padding: '100px 24px 80px' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Back + header */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: '#6B7280', fontSize: '0.85rem', fontWeight: 500,
          textDecoration: 'none', marginBottom: '28px',
        }}>
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div style={{ marginBottom: '36px' }}>
          <p style={{
            color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            All Projects
          </p>
          <h1 className="section-title" style={{ marginBottom: '12px' }}>
            The full <span style={{ color: '#6366F1' }}>catalog</span>
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.95rem', maxWidth: '620px' }}>
            Curated engineering work plus every public repository — pulled live from GitHub and
            updated automatically as new repos ship.
          </p>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '440px', marginBottom: '20px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, tech, keywords…"
            aria-label="Search projects"
            style={{
              width: '100%', padding: '12px 16px 12px 40px', borderRadius: '12px',
              border: '1px solid #E0DFE4', background: '#FFFFFF', color: '#0F0E14',
              fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', outline: 'none',
            }}
          />
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '36px' }}>
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const count = cat === 'All' ? all.length : all.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: '8px 16px', borderRadius: '10px',
                  fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', transition: 'all 0.18s',
                  border: isActive ? '1px solid rgba(99,102,241,0.35)' : '1px solid #EBEBEB',
                  background: isActive ? 'rgba(99,102,241,0.08)' : '#FFFFFF',
                  color: isActive ? '#6366F1' : '#6B7280',
                }}
              >
                {cat}
                <span style={{ marginLeft: '6px', opacity: 0.55, fontSize: '0.72rem' }}>{count}</span>
              </button>
            );
          })}
        </div>

        {loading && (
          <p style={{ color: '#9CA3AF', fontSize: '0.85rem', marginBottom: '20px' }}>
            Loading live GitHub repositories…
          </p>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '16px',
          }}>
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={setSelected} />
            ))}
          </div>
        ) : (
          <p style={{ color: '#6B7280', textAlign: 'center', padding: '60px 0' }}>
            No projects match “{query}” in {active}.
          </p>
        )}

        {/* GitHub link */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '52px' }}>
          <a href={GITHUB_PRIMARY} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--ghost">
            <Github size={16} /> See everything on GitHub
          </a>
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
