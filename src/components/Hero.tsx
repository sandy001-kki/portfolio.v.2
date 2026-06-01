'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, ChevronDown, ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { GITHUB_PRIMARY } from '@/lib/projects';
import { VisitorCountChip } from './VisitorEmailCapture';

const ROLES = [
  'AI Systems Engineer',
  'LLM Engineer',
  'Platform Engineer',
  'Open Source Maintainer',
  'Full Stack Engineer',
];

const RESUME_PATH = '/Sandeep_Kumar_Bollavaram_Resume.pdf';

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const [mounted, setMounted] = useState(false);

  // Move the color spotlight to follow the cursor over the photo.
  function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--x', `${x}%`);
    el.style.setProperty('--y', `${y}%`);
  }
  // Recenter on leave so the next hover starts cleanly.
  function resetSpotlight() {
    const el = innerRef.current;
    if (!el) return;
    el.style.setProperty('--x', '50%');
    el.style.setProperty('--y', '50%');
  }

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    const el = roleRef.current;
    if (!el) return () => cancelAnimationFrame(raf);
    let timer: ReturnType<typeof setTimeout>;

    function type() {
      const word = ROLES[idx.current];
      if (!deleting.current) {
        el!.textContent = word.slice(0, ++charIdx.current);
        if (charIdx.current === word.length) {
          deleting.current = true;
          timer = setTimeout(type, 2200);
          return;
        }
      } else {
        el!.textContent = word.slice(0, --charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % ROLES.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 42 : 85);
    }

    timer = setTimeout(type, 600);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
        background: '#FAF9F6',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1040px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '64px',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          flexWrap: 'wrap-reverse',
        }}
      >
        {/* ── LEFT: Text content ── */}
        <div style={{ flex: '1 1 360px', minWidth: 0 }}>
          <div style={{ marginBottom: '14px' }}>
            <VisitorCountChip />
          </div>

          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '9999px',
              border: '1px solid rgba(99,102,241,0.25)',
              background: 'rgba(99,102,241,0.06)',
              color: '#4F46E5', fontSize: '0.8rem', fontWeight: 500,
              marginBottom: '26px',
            }}
          >
            <span
              className="pulse-ring"
              style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#6366F1', display: 'inline-block',
                boxShadow: '0 0 8px rgba(99,102,241,0.6)',
              }}
            />
            Open to Engineering Roles &amp; Collaborations
          </div>

          {/* Name — full name */}
          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(2.6rem, 6.5vw, 4.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 1.02,
              marginBottom: '16px',
              color: '#0F0E14',
            }}
          >
            Sandeep Kumar<br />
            <span style={{ color: '#6366F1' }}>Bollavaram</span>
          </h1>

          {/* Title (static) + typewriter focus role */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.4vw, 1.2rem)',
              color: '#0F0E14', fontWeight: 700,
              letterSpacing: '-0.01em', marginBottom: '8px',
            }}
          >
            AI Systems Engineer{' '}
            <span style={{ color: '#C8C7CC', fontWeight: 400 }}>·</span> LLM Engineer{' '}
            <span style={{ color: '#C8C7CC', fontWeight: 400 }}>·</span> Platform Engineer
          </p>

          <div
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              height: '28px', marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '0.95rem', color: '#6B7280', fontWeight: 400 }}>Currently:&nbsp;</span>
            <span ref={roleRef} style={{ fontSize: '0.95rem', color: '#6366F1', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }} />
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block', width: '2px', height: '17px',
                background: '#6366F1', borderRadius: '2px', marginLeft: '2px',
              }}
            />
          </div>

          {/* Description */}
          <p
            style={{
              color: '#4B5563', fontSize: '1rem',
              maxWidth: '520px', marginBottom: '24px', lineHeight: 1.75,
            }}
          >
            I build production software across{' '}
            <span style={{ color: '#0F0E14', fontWeight: 600 }}>Kubernetes operators</span>,{' '}
            <span style={{ color: '#0F0E14', fontWeight: 600 }}>AI agent memory systems</span>,{' '}
            local-first <span style={{ color: '#0F0E14', fontWeight: 600 }}>LLM infrastructure</span>,
            cloud-native platforms, Windows AI assistants, and robotics systems.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#9CA3AF', fontSize: '0.82rem' }}>
              <MapPin size={13} /> Kanchipuram, Tamil Nadu, India
            </span>
          </div>

          {/* CTAs — View Projects / Download Resume / GitHub / Contact */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/projects" className="hero-cta hero-cta--primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href={RESUME_PATH} download className="hero-cta hero-cta--ghost">
              <Download size={16} /> Download Resume
            </a>
            <a href={GITHUB_PRIMARY} target="_blank" rel="noopener noreferrer" className="hero-cta hero-cta--ghost">
              <Github size={16} /> GitHub
            </a>
            <a href="/contact" className="hero-cta hero-cta--ghost">
              <Mail size={16} /> Contact
            </a>
          </div>
        </div>

        {/* ── RIGHT: Profile Photo with animated ring + cursor spotlight ── */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="profile-photo-ring"
            tabIndex={0}
            aria-label="Portrait of Sandeep Kumar Bollavaram"
            onMouseMove={handleSpotlight}
            onMouseLeave={resetSpotlight}
          >
            <div className="profile-photo-ring__inner" ref={innerRef}>
              {/* Bottom layer: grayscale */}
              <Image
                className="photo-gray"
                src="/images/profile.jpg"
                alt="Sandeep Kumar Bollavaram, AI Systems Engineer"
                width={240}
                height={240}
                sizes="240px"
                priority
              />
              {/* Top layer: full color, revealed by the cursor spotlight mask */}
              <Image
                className="photo-color"
                src="/images/profile.jpg"
                alt=""
                aria-hidden="true"
                width={240}
                height={240}
                sizes="240px"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#snapshot"
        aria-label="Scroll to quick snapshot"
        style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: '#C8C7CC', textDecoration: 'none', transition: 'color 0.2s', zIndex: 10,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#6366F1')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#C8C7CC')}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase' }}>
          Scroll
        </span>
        <ChevronDown size={18} className="float-anim" />
      </a>
    </section>
  );
}
