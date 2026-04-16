'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ChevronDown, ArrowRight, MapPin, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import { VisitorCountChip } from './VisitorEmailCapture';

const ROLES = [
  'AI Engineer',
  'Computer Vision Dev',
  'Startup Founder',
  'Robotics Builder',
  'Full-Stack Developer',
  'B.Tech CSE Student',
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const el = roleRef.current;
    if (!el) return;
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
    return () => clearTimeout(timer);
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
      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1000px',
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
        <div style={{ flex: '1 1 340px', minWidth: 0 }}>
          {/* Visitor count chip */}
          <div style={{ marginBottom: '14px' }}>
            <VisitorCountChip />
          </div>

          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '9999px',
              border: '1px solid rgba(99,102,241,0.25)',
              background: 'rgba(99,102,241,0.06)',
              color: '#4F46E5',
              fontSize: '0.8rem',
              fontWeight: 500,
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#6366F1',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(99,102,241,0.6)',
              }}
              className="pulse-ring"
            />
            Open to Internships &amp; Collaborations
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 1.0,
              marginBottom: '20px',
              color: '#0F0E14',
            }}
          >
            Sandeep<br />
            <span style={{ color: '#6366F1' }}>Kumar</span>
          </h1>

          {/* Typewriter role */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              height: '36px',
              marginBottom: '22px',
            }}
          >
            <span style={{ fontSize: '1.2rem', color: '#6B7280', fontWeight: 400 }}>I&apos;m a </span>
            <span ref={roleRef} style={{ fontSize: '1.2rem', color: '#0F0E14', fontWeight: 700 }} />
            <span
              className="cursor-blink"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '22px',
                background: '#6366F1',
                borderRadius: '2px',
                marginLeft: '2px',
              }}
            />
          </div>

          {/* Bio */}
          <p
            style={{
              color: '#6B7280',
              fontSize: '1rem',
              maxWidth: '480px',
              marginBottom: '20px',
              lineHeight: 1.75,
            }}
          >
            B.Tech CSE student at{' '}
            <span style={{ color: '#0F0E14', fontWeight: 500 }}>SCSVMV University</span>{' '}
            building{' '}
            <span style={{ color: '#7C3AED', fontWeight: 500 }}>AI systems</span>,{' '}
            <span style={{ color: '#059669', fontWeight: 500 }}>autonomous robots</span>, and{' '}
            <span style={{ color: '#0284C7', fontWeight: 500 }}>full-stack web apps</span>.
          </p>

          {/* Location + University */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              color: '#9CA3AF', fontSize: '0.82rem',
            }}>
              <MapPin size={13} /> Kanchipuram, Tamil Nadu
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              color: '#9CA3AF', fontSize: '0.82rem',
            }}>
              <GraduationCap size={13} /> SCSVMV University · Batch 2028
            </span>
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '21+', label: 'Projects', color: '#6366F1' },
              { value: '1', label: 'Startup', color: '#D97706' },
              { value: '5+', label: 'Domains', color: '#059669' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 900,
                    fontSize: '2rem',
                    color: s.color,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '0.78rem', marginTop: '3px', fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                background: '#6366F1', color: '#FFFFFF',
                fontWeight: 700, fontSize: '0.88rem',
                textDecoration: 'none',
                border: '1px solid #6366F1',
                transition: 'all 0.2s',
                boxShadow: '0 2px 10px rgba(99,102,241,0.25)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#4F46E5';
                (e.currentTarget as HTMLElement).style.borderColor = '#4F46E5';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(99,102,241,0.30)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#6366F1';
                (e.currentTarget as HTMLElement).style.borderColor = '#6366F1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 10px rgba(99,102,241,0.25)';
              }}
            >
              View Projects
              <ArrowRight size={16} />
            </a>

            <a
              href="https://github.com/sandy001-kki"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                border: '1px solid #E0DFE4', color: '#374151',
                fontWeight: 600, fontSize: '0.88rem',
                textDecoration: 'none', background: '#FFFFFF',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)';
                (e.currentTarget as HTMLElement).style.color = '#6366F1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E0DFE4';
                (e.currentTarget as HTMLElement).style.color = '#374151';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
              }}
            >
              <Github size={16} />
              GitHub
            </a>

            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                border: '1px solid #E0DFE4', color: '#374151',
                fontWeight: 600, fontSize: '0.88rem',
                textDecoration: 'none', background: '#FFFFFF',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)';
                (e.currentTarget as HTMLElement).style.color = '#6366F1';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E0DFE4';
                (e.currentTarget as HTMLElement).style.color = '#374151';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <ExternalLink size={16} />
              Contact
            </a>
          </div>
        </div>

        {/* ── RIGHT: Profile Photo ── */}
        <div
          style={{
            flex: '0 0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 240,
              height: 240,
            }}
          >
            {/* Outer ring */}
            <div
              style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                border: '2px solid rgba(99,102,241,0.20)',
              }}
            />
            {/* Second ring */}
            <div
              style={{
                position: 'absolute',
                inset: -12,
                borderRadius: '50%',
                border: '1px dashed rgba(99,102,241,0.10)',
              }}
            />

            {/* Photo circle */}
            <div
              style={{
                width: 240,
                height: 240,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                boxShadow: '0 8px 40px rgba(99,102,241,0.18), 0 2px 12px rgba(0,0,0,0.10)',
                position: 'relative',
              }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Sandeep Kumar Bollavaram"
                width={240}
                height={240}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                onError={(e) => {
                  /* fallback to GitHub avatar */
                  (e.currentTarget as HTMLImageElement).src = 'https://github.com/sandy001-kki.png';
                }}
                priority
              />
            </div>

            {/* Floating badge — available */}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                right: -8,
                background: '#FFFFFF',
                border: '1px solid #EBEBEB',
                borderRadius: '12px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#059669',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: '#10B981',
                  display: 'inline-block',
                }}
              />
              Available
            </div>

            {/* Floating badge — batch */}
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: -16,
                background: '#FFFFFF',
                border: '1px solid #EBEBEB',
                borderRadius: '12px',
                padding: '6px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#6366F1',
                whiteSpace: 'nowrap',
              }}
            >
              Batch&nbsp;2028
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#C8C7CC',
          textDecoration: 'none',
          transition: 'color 0.2s',
          zIndex: 10,
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
