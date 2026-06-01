'use client';

import { Github, Linkedin, Download } from 'lucide-react';
import { GITHUB_PRIMARY } from '@/lib/projects';

const RESUME_PATH = '/Sandeep_Kumar_Bollavaram_Resume.pdf';

export default function Footer() {
  const linkStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '5px',
    color: '#9CA3AF', textDecoration: 'none', transition: 'color 0.18s',
  };
  const hover = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = '#6366F1');
  const out = (e: React.MouseEvent) => ((e.currentTarget as HTMLElement).style.color = '#9CA3AF');

  return (
    <footer style={{ borderTop: '1px solid #EBEBEB', padding: '36px 24px', background: '#F3F2EF' }}>
      <div style={{
        maxWidth: '1120px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: '14px',
      }}>
        <div style={{ color: '#9CA3AF', fontSize: '0.84rem' }}>
          <span style={{ color: '#0F0E14', fontWeight: 700, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}>
            Sandeep Kumar Bollavaram
          </span>
          {' '}— AI Systems · Platform · Full Stack Engineer
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', color: '#9CA3AF', fontSize: '0.82rem' }}>
          <a href={GITHUB_PRIMARY} target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hover} onMouseLeave={out}>
            <Github size={14} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sandeepbollavaram" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={hover} onMouseLeave={out}>
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href={RESUME_PATH} download style={linkStyle} onMouseEnter={hover} onMouseLeave={out}>
            <Download size={14} /> Resume
          </a>
          <span style={{ color: '#E0DFE4' }}>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}
