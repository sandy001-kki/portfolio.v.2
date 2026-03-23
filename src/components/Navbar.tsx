'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#education', label: 'Education' },
  { href: '/startup', label: 'Startup' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: scrolled ? '12px' : '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 32px)',
    maxWidth: '1200px',
    zIndex: 1000,
    transition: 'all 0.35s ease',
    background: scrolled || open ? 'rgba(3,7,18,0.90)' : 'transparent',
    backdropFilter: scrolled || open ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: scrolled || open ? 'blur(20px)' : 'none',
    border: scrolled || open ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
    borderRadius: '16px',
    boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
  };

  return (
    <header style={navStyle} suppressHydrationWarning>
      <nav style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '1.15rem', textDecoration: 'none', color: 'white', letterSpacing: '-0.03em', flexShrink: 0 }}>
          Bollavaram<span style={{ color: '#22C55E' }}>.</span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', color: '#94a3b8', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              style={{ marginLeft: '4px', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', color: '#94a3b8', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#94a3b8'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Contact
            </Link>
            <Link
              href="/hire"
              style={{ marginLeft: '6px', padding: '9px 20px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', background: '#22C55E', color: '#030712', transition: 'background 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#16a34a')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#22C55E')}
            >
              Hire Me
            </Link>
          </div>
        )}

        {/* Mobile toggle */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{ padding: '8px', borderRadius: '8px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && open && (
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ padding: '12px 16px', borderRadius: '10px', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{ padding: '12px 16px', borderRadius: '10px', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none' }}
          >
            Contact
          </Link>
          <Link
            href="/hire"
            onClick={() => setOpen(false)}
            style={{ marginTop: '8px', padding: '13px 16px', borderRadius: '10px', background: '#22C55E', color: '#030712', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}
