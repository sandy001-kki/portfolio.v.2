'use client';

import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #EBEBEB',
      padding: '36px 24px',
      background: '#F3F2EF',
    }}>
      <div style={{
        maxWidth: '1120px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: '14px',
      }}>
        <div style={{ color: '#9CA3AF', fontSize: '0.84rem' }}>
          <span style={{
            color: '#0F0E14', fontWeight: 700,
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.02em',
          }}>
            Sandeep Kumar Bollavaram
          </span>
          {' '}— B.Tech CSE @ SCSVMV University
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '18px',
          color: '#9CA3AF', fontSize: '0.82rem',
        }}>
          <a
            href="https://github.com/sandy001-kki"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.18s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#6366F1')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF')}
          >
            <Github size={14} /> GitHub
          </a>
          <span style={{ color: '#E0DFE4' }}>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
