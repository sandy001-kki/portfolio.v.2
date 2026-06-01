'use client';

import { useRef, useEffect, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { SKILL_GROUPS } from '@/lib/skills';

/* ── Pill that fades in on scroll ── */
function Pill({ label, color, index }: { label: string; color: string; index: number }) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setShow(true), index * 18); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '6px 13px', borderRadius: '8px',
        background: hovered ? `${color}12` : '#F3F2EF',
        border: hovered ? `1px solid ${color}45` : '1px solid #E0DFE4',
        color: hovered ? color : '#374151',
        fontSize: '0.8rem', fontWeight: 500,
        fontFamily: 'JetBrains Mono, monospace',
        transition: 'all 0.18s ease',
        cursor: 'default', display: 'inline-block',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(8px)',
      }}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '112px 24px', background: '#FFFFFF', borderTop: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Skills
            </p>
            <h2 className="section-title">
              Tech stack &amp; <span style={{ color: '#6366F1' }}>tooling</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '16px',
        }}>
          {SKILL_GROUPS.map((group, gi) => (
            <AnimatedSection key={group.category} delay={gi * 70}>
              <div style={{
                height: '100%', background: '#FAF9F6', border: '1px solid #EBEBEB',
                borderRadius: '16px', padding: '24px',
                borderLeft: `3px solid ${group.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', background: group.color, flexShrink: 0 }} />
                  <h3 style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0F0E14',
                    fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>
                    {group.category}
                  </h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {group.skills.map((s, si) => (
                    <Pill key={s} label={s} color={group.color} index={si} />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
