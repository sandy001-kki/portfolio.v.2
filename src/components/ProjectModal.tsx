'use client';

import { useEffect } from 'react';
import { X, Github, ExternalLink, CheckCircle2, Lock, Star } from 'lucide-react';
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

interface Props {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  const status = STATUS_COLORS[project.status] ?? STATUS_COLORS['Open Source'];
  const isPrivate = project.private || !project.github;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(10, 8, 20, 0.52)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-enter"
        style={{
          background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '20px',
          width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px 18px', position: 'sticky', top: 0, background: '#FFFFFF',
          zIndex: 10, borderBottom: '1px solid #F0EFF4',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, padding: '4px 12px', borderRadius: '9999px',
              color: status.text, background: status.bg, border: `1px solid ${status.border}`,
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
            }}>
              {isPrivate && <Lock size={10} />} {project.status}
            </span>
            <span style={{
              fontSize: '0.66rem', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px',
              color: '#6B7280', background: '#F3F2EF', border: '1px solid #E0DFE4',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              {project.category}
            </span>
            <span style={{ color: '#9CA3AF', fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace' }}>
              {project.year}
            </span>
            {typeof project.stars === 'number' && project.stars > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#9CA3AF', fontSize: '0.74rem', fontFamily: 'JetBrains Mono, monospace' }}>
                <Star size={11} /> {project.stars}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: '8px',
              border: '1px solid #EBEBEB', background: '#FAF9F6', color: '#6B7280',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px 28px 28px' }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
            fontWeight: 800, color: '#0F0E14', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '14px',
          }}>
            {project.title}
          </h2>

          {project.impact && (
            <p style={{
              color: '#4B5563', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '18px',
              paddingLeft: '12px', borderLeft: '3px solid rgba(99,102,241,0.4)',
            }}>
              {project.impact}
            </p>
          )}

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase',
              letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px',
            }}>
              About this project
            </h3>
            <p style={{ color: '#374151', fontSize: '0.92rem', lineHeight: 1.8 }}>
              {project.longDesc}
            </p>
          </div>

          {project.features && project.features.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase',
                letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', marginBottom: '12px',
              }}>
                Key Features
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {project.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#374151', lineHeight: 1.65 }}>
                    <CheckCircle2 size={15} style={{ color: '#6366F1', flexShrink: 0, marginTop: '3px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginBottom: '28px' }}>
            <h3 style={{
              fontSize: '0.72rem', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase',
              letterSpacing: '0.1em', fontFamily: 'JetBrains Mono, monospace', marginBottom: '10px',
            }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace',
                  padding: '5px 12px', borderRadius: '8px',
                  background: '#F3F2EF', color: '#374151', border: '1px solid #E0DFE4', fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {isPrivate ? (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 24px', borderRadius: '10px',
                background: '#F3F2EF', color: '#6B7280', fontWeight: 600, fontSize: '0.88rem',
                border: '1px solid #E0DFE4',
              }}>
                <Lock size={15} /> {project.status === 'Production System' ? 'Production System — private' : 'Private Repository'}
              </span>
            ) : (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--primary">
                <Github size={16} /> Open on GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--ghost">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
