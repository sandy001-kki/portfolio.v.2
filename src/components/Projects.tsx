'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Star, ArrowUpRight } from 'lucide-react';
import { PROJECTS, CATEGORIES, type Category, type Project } from '@/lib/projects';
import ProjectModal from './ProjectModal';

const CATEGORY_COLORS: Record<Category, { text: string; bg: string; border: string }> = {
  All:             { text: '#6366F1', bg: 'rgba(99,102,241,0.08)',   border: 'rgba(99,102,241,0.20)' },
  'AI / CV':       { text: '#7C3AED', bg: 'rgba(124,58,237,0.08)',   border: 'rgba(124,58,237,0.20)' },
  Robotics:        { text: '#059669', bg: 'rgba(5,150,105,0.08)',     border: 'rgba(5,150,105,0.20)' },
  'Web Dev':       { text: '#0284C7', bg: 'rgba(2,132,199,0.08)',     border: 'rgba(2,132,199,0.20)' },
  'Data Science':  { text: '#C2410C', bg: 'rgba(194,65,12,0.08)',     border: 'rgba(194,65,12,0.20)' },
  Academic:        { text: '#6B7280', bg: 'rgba(107,114,128,0.08)',   border: 'rgba(107,114,128,0.20)' },
  'DevOps / Cloud':{ text: '#0891B2', bg: 'rgba(8,145,178,0.08)',     border: 'rgba(8,145,178,0.20)' },
};

/* ── Fade-in on scroll ── */
function FadeIn({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties;
}) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVis(true), delay); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(18px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── Project Card ── */
function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_COLORS[project.category];
  const delay = Math.min(index * 50, 300);

  return (
    <FadeIn delay={delay} style={{ height: '100%' }}>
      <div
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? '#F8F7FF' : '#FFFFFF',
          border: hovered ? `1px solid ${cat.border}` : '1px solid #EBEBEB',
          borderRadius: '14px',
          padding: '22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '13px',
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 12px 32px rgba(99,102,241,0.12), 0 0 0 1px ${cat.border}`
            : '0 1px 4px rgba(0,0,0,0.06)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top row */}
        <div style={{
          display: 'flex', alignItems: 'flex-start',
          justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px',
              borderRadius: '9999px', color: cat.text,
              background: cat.bg, border: `1px solid ${cat.border}`,
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em',
            }}>
              {project.category}
            </span>
            {project.featured && (
              <span style={{
                fontSize: '0.65rem', fontWeight: 600, padding: '3px 8px',
                borderRadius: '9999px', color: '#B45309',
                background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.22)',
                display: 'flex', alignItems: 'center', gap: '3px',
              }}>
                <Star size={9} fill="currentColor" /> Featured
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              color: '#9CA3AF', fontSize: '0.68rem',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {project.year}
            </span>
            {/* Details hint on hover */}
            <span style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              fontSize: '0.68rem', fontWeight: 600,
              color: hovered ? cat.text : 'transparent',
              transition: 'color 0.2s',
            }}>
              Details <ArrowUpRight size={11} />
            </span>
          </div>
        </div>

        {/* Title + description */}
        <div>
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: hovered ? cat.text : '#0F0E14',
            fontSize: '1rem',
            lineHeight: 1.3,
            marginBottom: '7px',
            transition: 'color 0.22s',
            letterSpacing: '-0.02em',
          }}>
            {project.title}
          </h3>
          <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.65 }}>
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '5px',
          marginTop: 'auto',
        }}>
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} style={{
              fontSize: '0.68rem',
              fontFamily: 'JetBrains Mono, monospace',
              padding: '3px 8px', borderRadius: '6px',
              background: '#F3F2EF', color: '#4B5563',
              border: '1px solid #E0DFE4',
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span style={{
              fontSize: '0.68rem', padding: '3px 8px', borderRadius: '6px',
              background: '#F3F2EF', color: '#9CA3AF', border: '1px solid #E0DFE4',
            }}>
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* Footer links */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          paddingTop: '12px',
          borderTop: '1px solid #F0EFF4',
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              color: '#9CA3AF', fontSize: '0.78rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.18s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#6366F1')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF')}
          >
            <Github size={13} /> GitHub
          </a>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                color: '#9CA3AF', fontSize: '0.78rem', fontWeight: 500,
                textDecoration: 'none', transition: 'color 0.18s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#0284C7')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF')}
            >
              <ExternalLink size={13} /> Live
            </a>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {project.commits && (
              <span style={{
                color: '#C8C7CC', fontSize: '0.68rem',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {project.commits} commits
              </span>
            )}
            <span style={{
              fontSize: '0.65rem', padding: '2px 7px', borderRadius: '9999px', fontWeight: 600,
              color: project.profile === 'personal' ? '#4F46E5' : '#0284C7',
              background: project.profile === 'personal'
                ? 'rgba(79,70,229,0.07)' : 'rgba(2,132,199,0.07)',
              border: `1px solid ${project.profile === 'personal'
                ? 'rgba(79,70,229,0.18)' : 'rgba(2,132,199,0.18)'}`,
            }}>
              {project.profile}
            </span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Filter Bar ── */
function FilterBar({ active, onChange }: { active: Category; onChange: (c: Category) => void }) {
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
      gap: '6px', marginBottom: '48px',
    }}>
      {CATEGORIES.map(cat => {
        const isActive = active === cat;
        const c = CATEGORY_COLORS[cat];
        const count = cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            suppressHydrationWarning
            style={{
              padding: '8px 18px', borderRadius: '10px',
              fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
              outline: 'none', fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s ease',
              border: isActive ? `1px solid ${c.border}` : '1px solid #EBEBEB',
              background: isActive ? c.bg : '#FFFFFF',
              color: isActive ? c.text : '#6B7280',
              transform: isActive ? 'scale(1.04)' : 'scale(1)',
              boxShadow: isActive ? `0 0 0 3px ${c.bg}` : '0 1px 3px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = '#0F0E14';
                (e.currentTarget as HTMLElement).style.borderColor = '#C8C7CC';
                (e.currentTarget as HTMLElement).style.background = '#F3F2EF';
              }
            }}
            onMouseLeave={e => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.color = '#6B7280';
                (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB';
                (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
              }
            }}
          >
            {cat}
            <span style={{ marginLeft: '6px', opacity: 0.55, fontSize: '0.7rem' }}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Main ── */
export default function Projects() {
  const [active, setActive] = useState<Category>('All');
  const [key, setKey] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  function handleFilter(cat: Category) {
    setActive(cat);
    setKey(k => k + 1);
  }

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <section id="projects" style={{ padding: '112px 24px', background: '#FAF9F6', position: 'relative' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

          {/* Section header */}
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{
                color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                marginBottom: '14px', fontFamily: 'JetBrains Mono, monospace',
              }}>
                Work
              </p>
              <h2 className="section-title" style={{ marginBottom: '14px' }}>
                Projects &amp; <span style={{ color: '#6366F1' }}>Builds</span>
              </h2>
              <p style={{ color: '#6B7280', maxWidth: '500px', margin: '0 auto', fontSize: '0.9rem' }}>
                {PROJECTS.length} projects across two GitHub profiles — personal and university.
                Click any card to explore details.
              </p>
            </div>
          </FadeIn>

          {/* Filter */}
          <FadeIn delay={80}>
            <FilterBar active={active} onChange={handleFilter} />
          </FadeIn>

          {/* Grid */}
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
              gap: '16px',
            }}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setSelectedProject}
              />
            ))}
          </div>

          {/* GitHub profile links */}
          <FadeIn delay={100}>
            <div style={{
              marginTop: '56px',
              display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px',
            }}>
              {[
                { label: 'sandy001-kki', href: 'https://github.com/sandy001-kki', color: '#6366F1' },
                { label: '11249a040-sandeep', href: 'https://github.com/11249a040-sandeep', color: '#0284C7' },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '11px 22px', borderRadius: '12px',
                    border: '1px solid #EBEBEB', color: '#6B7280',
                    background: '#FFFFFF',
                    fontSize: '0.84rem', fontWeight: 500, textDecoration: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = l.color;
                    (e.currentTarget as HTMLElement).style.borderColor = `${l.color}35`;
                    (e.currentTarget as HTMLElement).style.background = `${l.color}06`;
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${l.color}14`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6B7280';
                    (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB';
                    (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  }}
                >
                  <Github size={15} /> {l.label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
