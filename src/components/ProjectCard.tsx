'use client';

import { useState } from 'react';
import { Github, ExternalLink, ArrowUpRight, Lock, Star } from 'lucide-react';
import type { Project } from '@/lib/projects';

const STATUS_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  'Open Source':       { text: '#0891B2', bg: 'rgba(8,145,178,0.08)',  border: 'rgba(8,145,178,0.22)' },
  Released:            { text: '#059669', bg: 'rgba(5,150,105,0.08)',  border: 'rgba(5,150,105,0.22)' },
  Deployed:            { text: '#059669', bg: 'rgba(5,150,105,0.08)',  border: 'rgba(5,150,105,0.22)' },
  'In Progress':       { text: '#D97706', bg: 'rgba(217,119,6,0.08)',  border: 'rgba(217,119,6,0.22)' },
  'Private Repository':{ text: '#6B7280', bg: 'rgba(107,114,128,0.08)',border: 'rgba(107,114,128,0.22)' },
  'Internal Project':  { text: '#6B7280', bg: 'rgba(107,114,128,0.08)',border: 'rgba(107,114,128,0.22)' },
  'Production System': { text: '#4F46E5', bg: 'rgba(79,70,229,0.08)',  border: 'rgba(79,70,229,0.22)' },
};

export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const status = STATUS_COLORS[project.status] ?? STATUS_COLORS['Open Source'];
  const isPrivate = project.private || !project.github;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(project); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#F8F7FF' : '#FFFFFF',
        border: hovered ? '1px solid rgba(99,102,241,0.30)' : '1px solid #EBEBEB',
        borderRadius: '14px',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        gap: '13px',
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 32px rgba(99,102,241,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Top row: status + category */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
          fontSize: '0.66rem', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px',
          color: status.text, background: status.bg, border: `1px solid ${status.border}`,
          fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.03em',
          display: 'inline-flex', alignItems: 'center', gap: '4px',
        }}>
          {isPrivate && <Lock size={9} />} {project.status}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {typeof project.stars === 'number' && project.stars > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#9CA3AF', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace' }}>
              <Star size={10} /> {project.stars}
            </span>
          )}
          <span style={{
            display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.68rem', fontWeight: 600,
            color: hovered ? '#6366F1' : 'transparent', transition: 'color 0.2s',
          }}>
            Details <ArrowUpRight size={11} />
          </span>
        </span>
      </div>

      {/* Title + description */}
      <div>
        <h3 style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 700,
          color: hovered ? '#6366F1' : '#0F0E14', fontSize: '1.02rem',
          lineHeight: 1.3, marginBottom: '7px', transition: 'color 0.22s', letterSpacing: '-0.02em',
        }}>
          {project.title}
        </h3>
        <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.6 }}>
          {project.description}
        </p>
      </div>

      {/* Impact line */}
      {project.impact && (
        <p style={{
          color: '#4B5563', fontSize: '0.8rem', lineHeight: 1.55,
          paddingLeft: '10px', borderLeft: '2px solid rgba(99,102,241,0.35)',
        }}>
          {project.impact}
        </p>
      )}

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
        {project.tags.slice(0, 5).map((tag) => (
          <span key={tag} style={{
            fontSize: '0.66rem', fontFamily: 'JetBrains Mono, monospace',
            padding: '3px 8px', borderRadius: '6px',
            background: '#F3F2EF', color: '#4B5563', border: '1px solid #E0DFE4',
          }}>
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span style={{
            fontSize: '0.66rem', padding: '3px 8px', borderRadius: '6px',
            background: '#F3F2EF', color: '#9CA3AF', border: '1px solid #E0DFE4',
          }}>
            +{project.tags.length - 5}
          </span>
        )}
      </div>

      {/* Footer links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '12px', borderTop: '1px solid #F0EFF4' }}>
        {isPrivate ? (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '0.76rem', fontWeight: 500 }}>
            <Lock size={12} /> {project.status === 'Production System' ? 'Production System' : 'Private Repository'}
          </span>
        ) : (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#6366F1')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF')}
          >
            <Github size={13} /> GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none' }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#0284C7')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF')}
          >
            <ExternalLink size={13} /> Live
          </a>
        )}
        <span style={{ marginLeft: 'auto', color: '#C8C7CC', fontSize: '0.68rem', fontFamily: 'JetBrains Mono, monospace' }}>
          {project.language || project.category}
        </span>
      </div>
    </div>
  );
}
