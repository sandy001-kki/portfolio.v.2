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
    top: scrolled ? '10px' : '18px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 32px)',
    maxWidth: '1200px',
    zIndex: 1000,
    transition: 'all 0.3s ease',
    background: scrolled || open
      ? 'rgba(255, 255, 255, 0.92)'
      : 'rgba(255, 255, 255, 0.70)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: scrolled || open
      ? '1px solid #E0DFE4'
      : '1px solid rgba(255,255,255,0.60)',
    borderRadius: '16px',
    boxShadow: scrolled
      ? '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)'
      : '0 1px 4px rgba(0,0,0,0.04)',
  };

  return (
    <header style={navStyle} suppressHydrationWarning>
      <nav style={{
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: '1.1rem',
            textDecoration: 'none',
            color: '#0F0E14',
            letterSpacing: '-0.04em',
            flexShrink: 0,
          }}
        >
          Bollavaram<span style={{ color: '#6366F1' }}>.</span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '7px 13px', borderRadius: '9px',
                  fontSize: '0.84rem', fontWeight: 500,
                  textDecoration: 'none', color: '#4B5563',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#0F0E14';
                  (e.currentTarget as HTMLElement).style.background = '#F3F2EF';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#4B5563';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              style={{
                padding: '7px 13px', borderRadius: '9px',
                fontSize: '0.84rem', fontWeight: 500,
                textDecoration: 'none', color: '#4B5563',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#0F0E14';
                (e.currentTarget as HTMLElement).style.background = '#F3F2EF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#4B5563';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              Contact
            </Link>
            <Link
              href="/hire"
              style={{
                marginLeft: '6px',
                padding: '8px 18px', borderRadius: '9px',
                fontSize: '0.84rem', fontWeight: 700,
                textDecoration: 'none',
                background: '#6366F1', color: '#FFFFFF',
                border: '1px solid #6366F1',
                transition: 'all 0.18s',
                boxShadow: '0 2px 8px rgba(99,102,241,0.22)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#4F46E5';
                (e.currentTarget as HTMLElement).style.borderColor = '#4F46E5';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#6366F1';
                (e.currentTarget as HTMLElement).style.borderColor = '#6366F1';
              }}
            >
              Hire Me
            </Link>
          </div>
        )}

        {/* Mobile toggle */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{
              padding: '8px', borderRadius: '8px',
              background: 'transparent', border: '1px solid #E0DFE4',
              color: '#4B5563', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s',
            }}
            aria-label="Toggle menu"
            suppressHydrationWarning
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && open && (
        <div style={{
          borderTop: '1px solid #E0DFE4',
          padding: '12px 16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                padding: '11px 14px', borderRadius: '9px',
                color: '#4B5563', fontSize: '0.9rem',
                fontWeight: 500, textDecoration: 'none',
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#0F0E14';
                (e.currentTarget as HTMLElement).style.background = '#F3F2EF';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#4B5563';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              padding: '11px 14px', borderRadius: '9px',
              color: '#4B5563', fontSize: '0.9rem',
              fontWeight: 500, textDecoration: 'none',
            }}
          >
            Contact
          </Link>
          <Link
            href="/hire"
            onClick={() => setOpen(false)}
            style={{
              marginTop: '6px', padding: '12px 14px', borderRadius: '10px',
              background: '#6366F1', color: '#FFFFFF',
              fontSize: '0.9rem', fontWeight: 700,
              textDecoration: 'none', textAlign: 'center',
            }}
          >
            Hire Me
          </Link>
        </div>
      )}
    </header>
  );
}
