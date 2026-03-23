'use client';

import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, ChevronDown, ArrowRight } from 'lucide-react';

const ROLES = [
  'AI Engineer',
  'Computer Vision Dev',
  'Startup Founder',
  'Robotics Builder',
  'Full-Stack Developer',
  'B.Tech CSE Student',
];

// Floating orbs config
const ORBS = [
  { size: 600, x: '55%', y: '30%', color: 'rgba(34,197,94,0.07)', blur: 120 },
  { size: 500, x: '10%', y: '60%', color: 'rgba(59,130,246,0.06)', blur: 100 },
  { size: 400, x: '80%', y: '70%', color: 'rgba(139,92,246,0.06)', blur: 90 },
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(34,197,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
            background: orb.color,
            borderRadius: '50%',
            filter: `blur(${orb.blur}px)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '860px',
          margin: '0 auto',
          textAlign: 'center',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            borderRadius: '9999px',
            border: '1px solid rgba(34,197,94,0.28)',
            background: 'rgba(34,197,94,0.08)',
            color: '#4ade80',
            fontSize: '0.82rem',
            fontWeight: 500,
            marginBottom: '32px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#22C55E',
              display: 'inline-block',
              boxShadow: '0 0 8px #22C55E',
            }}
            className="pulse-ring"
          />
          Open to Internships &amp; Collaborations
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: 'Archivo, sans-serif',
            fontSize: 'clamp(3.5rem, 9vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 1.0,
            marginBottom: '20px',
          }}
        >
          <span style={{ color: '#f8fafc' }}>Sandeep</span>
          <br />
          <span
            style={{
              background: 'linear-gradient(120deg, #22C55E 0%, #3B82F6 55%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Kumar
          </span>
        </h1>

        {/* Typewriter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            height: '38px',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '1.35rem', color: '#94a3b8', fontWeight: 400 }}>I&apos;m a </span>
          <span ref={roleRef} style={{ fontSize: '1.35rem', color: '#fff', fontWeight: 600 }} />
          <span className="cursor-blink" style={{ display: 'inline-block', width: '2px', height: '26px', background: '#22C55E', borderRadius: '2px', marginLeft: '2px' }} />
        </div>

        {/* Bio */}
        <p
          style={{
            color: '#64748b',
            fontSize: '1.1rem',
            maxWidth: '560px',
            margin: '0 auto 40px',
            lineHeight: 1.75,
          }}
        >
          B.Tech CSE student at <span style={{ color: '#94a3b8' }}>SCSVMV University</span> building{' '}
          <span style={{ color: '#4ade80' }}>AI systems</span>,{' '}
          <span style={{ color: '#60a5fa' }}>autonomous robots</span>, and{' '}
          <span style={{ color: '#c084fc' }}>full-stack web apps</span> that solve real problems.
        </p>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '40px',
            marginBottom: '48px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { value: '20+', label: 'Projects', color: '#22C55E' },
            { value: '1', label: 'Startup Founded', color: '#5B95FF' },
            { value: '5+', label: 'Tech Domains', color: '#8B5CF6' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Archivo, sans-serif',
                  fontWeight: 900,
                  fontSize: '2.25rem',
                  color: s.color,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>
              <div style={{ color: '#475569', fontSize: '0.8rem', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              background: '#22C55E',
              color: '#030712',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 0 24px rgba(34,197,94,0.3)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#16a34a';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#22C55E';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#e2e8f0',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              borderRadius: '12px',
              border: '1px solid rgba(139,92,246,0.3)',
              background: 'rgba(139,92,246,0.08)',
              color: '#c084fc',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.16)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.08)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <ExternalLink size={16} />
            Contact
          </a>
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
          color: '#334155',
          textDecoration: 'none',
          transition: 'color 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#334155')}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase' }}>Scroll</span>
        <ChevronDown size={20} className="float-anim" />
      </a>
    </section>
  );
}
