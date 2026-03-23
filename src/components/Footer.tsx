'use client';
import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ color: '#334155', fontSize: '0.85rem' }}>
          <span style={{ color: '#f1f5f9', fontWeight: 600, fontFamily: 'Archivo, sans-serif' }}>Sandeep Kumar Bollavaram</span>
          {' '}— B.Tech CSE @ SCSVMV University
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#334155', fontSize: '0.82rem' }}>
          <a href="https://github.com/sandy001-kki" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#334155', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#22C55E')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
          >
            <Github size={14} /> GitHub
          </a>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
