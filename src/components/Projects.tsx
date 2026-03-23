'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { PROJECTS, CATEGORIES, type Category, type Project } from '@/lib/projects';

const CATEGORY_COLORS: Record<Category, string> = {
  All: '#22C55E',
  'AI / CV': '#22C55E',
  Robotics: '#F59E0B',
  'Web Dev': '#3B82F6',
  'Data Science': '#8B5CF6',
  Academic: '#EC4899',
};

/* ── Animated section (inline, no extra file needed) */
function FadeIn({ children, delay = 0, style = {} }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.55s ease, transform 0.55s ease', ...style }}>
      {children}
    </div>
  );
}

/* ── Project card ────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const color = CATEGORY_COLORS[project.category];
  // cap delay so last cards don't appear too late
  const delay = Math.min(index * 55, 350);

  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'rgba(15,23,42,0.9)' : 'rgba(15,23,42,0.55)',
          backdropFilter: 'blur(20px)',
          border: hovered ? `1px solid ${color}35` : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '18px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          height: '100%',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 24px 48px rgba(0,0,0,0.35), 0 0 0 1px ${color}18, 0 0 30px ${color}10`
            : 'none',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer overlay on hover */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '18px', pointerEvents: 'none',
          background: hovered ? `linear-gradient(135deg, ${color}06, transparent 60%)` : 'transparent',
          transition: 'background 0.4s',
        }} />

        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px',
              borderRadius: '9999px', color, background: `${color}14`,
              border: `1px solid ${color}28`, letterSpacing: '0.05em',
            }}>
              {project.category}
            </span>
            {project.featured && (
              <span style={{
                fontSize: '0.68rem', fontWeight: 600, padding: '3px 8px',
                borderRadius: '9999px', color: '#fbbf24',
                background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.22)',
                display: 'flex', alignItems: 'center', gap: '3px',
                animation: hovered ? 'none' : undefined,
              }}>
                <Star size={9} fill="currentColor" /> Featured
              </span>
            )}
          </div>
          <span style={{ color: '#1e293b', fontSize: '0.7rem', fontFamily: 'monospace', flexShrink: 0 }}>{project.year}</span>
        </div>

        {/* Title + desc */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'Archivo, sans-serif', fontWeight: 700,
            color: hovered ? color : '#f1f5f9',
            fontSize: '1.05rem', lineHeight: 1.3, marginBottom: '8px',
            transition: 'color 0.25s',
          }}>
            {project.title}
          </h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.65 }}>{project.description}</p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto', position: 'relative', zIndex: 1 }}>
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} style={{
              fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px',
              background: 'rgba(30,41,59,0.9)', color: '#64748b',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.2s',
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span style={{ fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(30,41,59,0.9)', color: '#475569', border: '1px solid rgba(255,255,255,0.05)' }}>
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#475569', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#e2e8f0')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#475569')}
          >
            <Github size={13} /> Source
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#475569', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = color)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#475569')}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {project.commits && (
              <span style={{ color: '#1e293b', fontSize: '0.7rem' }}>{project.commits} commits</span>
            )}
            <span style={{
              fontSize: '0.67rem', padding: '2px 7px', borderRadius: '9999px', fontWeight: 600,
              color: project.profile === 'personal' ? '#22C55E' : '#60a5fa',
              background: project.profile === 'personal' ? 'rgba(34,197,94,0.08)' : 'rgba(96,165,250,0.08)',
              border: `1px solid ${project.profile === 'personal' ? 'rgba(34,197,94,0.2)' : 'rgba(96,165,250,0.2)'}`,
            }}>
              {project.profile}
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Filter bar ──────────────────────────────────── */
function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px', marginBottom: '48px' }}>
      {CATEGORIES.map(cat => {
        const isActive = active === cat;
        const color = CATEGORY_COLORS[cat];
        const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            suppressHydrationWarning
            style={{
              padding: '8px 18px', borderRadius: '10px',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
              outline: 'none', fontFamily: 'Space Grotesk, sans-serif',
              transition: 'all 0.22s ease',
              border: isActive ? `1px solid ${color}50` : '1px solid rgba(255,255,255,0.07)',
              background: isActive ? `${color}18` : 'rgba(15,23,42,0.5)',
              color: isActive ? color : '#64748b',
              transform: isActive ? 'scale(1.04)' : 'scale(1)',
              boxShadow: isActive ? `0 0 16px ${color}20` : 'none',
            }}
            onMouseEnter={e => {
              if (!isActive) (e.currentTarget as HTMLElement).style.color = '#94a3b8';
            }}
            onMouseLeave={e => {
              if (!isActive) (e.currentTarget as HTMLElement).style.color = '#64748b';
            }}
          >
            {cat}
            <span style={{ marginLeft: '6px', opacity: 0.55, fontSize: '0.7rem' }}>{count}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Main ────────────────────────────────────────── */
export default function Projects() {
  const [active, setActive] = useState<Category>('All');
  const [key, setKey] = useState(0); // forces remount of grid on filter change

  function handleFilter(cat: Category) {
    setActive(cat);
    setKey(k => k + 1);
  }

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section id="projects" style={{ padding: '112px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '30%', left: 0, width: '350px', height: '350px', background: 'rgba(34,197,94,0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        {/* Header */}
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Work</p>
            <h2 className="section-title" style={{ color: '#f8fafc', marginBottom: '16px' }}>
              Projects &amp; <span className="gradient-text">Builds</span>
            </h2>
            <p style={{ color: '#475569', maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem' }}>
              {PROJECTS.length} projects across two GitHub profiles — personal and university.
            </p>
          </div>
        </FadeIn>

        {/* Filter */}
        <FadeIn delay={100}>
          <FilterBar active={active} onChange={handleFilter} />
        </FadeIn>

        {/* Grid — key changes force re-animation on filter switch */}
        <div
          key={key}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: '18px' }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub links */}
        <FadeIn delay={100}>
          <div style={{ marginTop: '56px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            {[
              { label: 'sandy001-kki', href: 'https://github.com/sandy001-kki', color: '#22C55E' },
              { label: '11249a040-sandeep', href: 'https://github.com/11249a040-sandeep', color: '#3B82F6' },
            ].map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '11px 24px', borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8',
                  fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = l.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${l.color}35`;
                  (e.currentTarget as HTMLElement).style.background = `${l.color}08`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <Github size={15} /> {l.label}
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
