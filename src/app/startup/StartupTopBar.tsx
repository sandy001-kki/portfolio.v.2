'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function StartupTopBar() {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px clamp(20px,5vw,64px)', background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link
        href="/"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'Space Grotesk, sans-serif' }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#475569')}
      >
        <ArrowLeft size={14} /> Portfolio
      </Link>
      <Link
        href="/"
        style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.03em' }}
      >
        Bollavaram<span style={{ color: '#22C55E' }}>.</span>
      </Link>
    </div>
  );
}
