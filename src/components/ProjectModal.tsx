'use client';

import { useEffect } from 'react';
import { X, Github, ExternalLink, Star, CheckCircle2 } from 'lucide-react';
import type { Project, Category } from '@/lib/projects';

const CATEGORY_COLORS: Record<Category, { text: string; bg: string; border: string }> = {
  All:             { text: '#6366F1', bg: 'rgba(99,102,241,0.08)',   border: 'rgba(99,102,241,0.20)' },
  'AI / CV':       { text: '#7C3AED', bg: 'rgba(124,58,237,0.08)',   border: 'rgba(124,58,237,0.20)' },
  Robotics:        { text: '#059669', bg: 'rgba(5,150,105,0.08)',     border: 'rgba(5,150,105,0.20)' },
  'Web Dev':       { text: '#0284C7', bg: 'rgba(2,132,199,0.08)',     border: 'rgba(2,132,199,0.20)' },
  'Data Science':  { text: '#C2410C', bg: 'rgba(194,65,12,0.08)',     border: 'rgba(194,65,12,0.20)' },
  Academic:        { text: '#6B7280', bg: 'rgba(107,114,128,0.08)',   border: 'rgba(107,114,128,0.20)' },
  'DevOps / Cloud':{ text: '#0891B2', bg: 'rgba(8,145,178,0.08)',     border: 'rgba(8,145,178,0.20)' },
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  /* ESC to close */
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    /* lock scroll */
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const cat = CATEGORY_COLORS[project.category];

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(10, 8, 20, 0.52)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      {/* Modal panel */}
      <div
        onClick={e => e.stopPropagation()}
        className="modal-enter"
        style={{
          background: '#FFFFFF',
          border: '1px solid #EBEBEB',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
          position: 'relative',
          padding: '0',
        }}
      >
        {/* Header bar */}
        <div style={{
          padding: '24px 28px 0',
          position: 'sticky',
          top: 0,
          background: '#FFFFFF',
          zIndex: 10,
          borderBottom: '1px solid #F0EFF4',
          paddingBottom: '18px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            {/* Category badge */}
            <span style={{
              fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px',
              borderRadius: '9999px', color: cat.text,
              background: cat.bg, border: `1px solid ${cat.border}`,
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em',
            }}>
              {project.category}
            </span>
            {/* Featured badge */}
            {project.featured && (
              <span style={{
                fontSize: '0.68rem', fontWeight: 600, padding: '4px 10px',
                borderRadius: '9999px', color: '#B45309',
                background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.22)',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <Star size={9} fill="currentColor" /> Featured
              </span>
            )}
            {/* Profile badge */}
            <span style={{
              fontSize: '0.67rem', fontWeight: 600, padding: '4px 10px',
              borderRadius: '9999px',
              color: project.profile === 'personal' ? '#4F46E5' : '#0284C7',
              background: project.profile === 'personal' ? 'rgba(79,70,229,0.07)' : 'rgba(2,132,199,0.07)',
              border: `1px solid ${project.profile === 'personal' ? 'rgba(79,70,229,0.18)' : 'rgba(2,132,199,0.18)'}`,
            }}>
              {project.profile === 'personal' ? 'personal' : 'university'}
            </span>
            {/* Year */}
            <span style={{ color: '#9CA3AF', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
              {project.year}
            </span>
            {project.commits && (
              <span style={{ color: '#9CA3AF', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
                {project.commits} commits
              </span>
            )}
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              flexShrink: 0,
              width: 32, height: 32,
              borderRadius: '8px',
              border: '1px solid #EBEBEB',
              background: '#FAF9F6',
              color: '#6B7280',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#F3F2EF';
              (e.currentTarget as HTMLElement).style.color = '#0F0E14';
              (e.currentTarget as HTMLElement).style.borderColor = '#C8C7CC';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#FAF9F6';
              (e.currentTarget as HTMLElement).style.color = '#6B7280';
              (e.currentTarget as HTMLElement).style.borderColor = '#EBEBEB';
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px' }}>
          {/* Title */}
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
            fontWeight: 800,
            color: '#0F0E14',
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            {project.title}
          </h2>

          {/* Short description */}
          <p style={{
            color: '#4B5563',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #F0EFF4',
          }}>
            {project.description}
          </p>

          {/* Long description */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px',
            }}>
              About this project
            </h3>
            <p style={{ color: '#374151', fontSize: '0.92rem', lineHeight: 1.8 }}>
              {project.longDesc}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px',
              }}>
                Key Features
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.features.map((feat, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: '10px',
                    fontSize: '0.88rem', color: '#374151', lineHeight: 1.65,
                  }}>
                    <CheckCircle2 size={15} style={{ color: '#6366F1', flexShrink: 0, marginTop: '3px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px',
            }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map(tag => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    background: '#F3F2EF',
                    color: '#374151',
                    border: '1px solid #E0DFE4',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '10px',
                background: '#6366F1', color: '#FFFFFF',
                fontWeight: 700, fontSize: '0.88rem',
                textDecoration: 'none',
                border: '1px solid #6366F1',
                transition: 'background 0.18s, transform 0.15s',
                boxShadow: '0 2px 8px rgba(99,102,241,0.22)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#4F46E5';
                (e.currentTarget as HTMLElement).style.borderColor = '#4F46E5';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#6366F1';
                (e.currentTarget as HTMLElement).style.borderColor = '#6366F1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Github size={16} />
              Open on GitHub
            </a>

            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '10px',
                  background: '#FFFFFF', color: '#0F0E14',
                  fontWeight: 600, fontSize: '0.88rem',
                  textDecoration: 'none',
                  border: '1px solid #E0DFE4',
                  transition: 'border-color 0.18s, background 0.18s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)';
                  (e.currentTarget as HTMLElement).style.background = '#F8F7FF';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#E0DFE4';
                  (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
