'use client';

import AnimatedSection from './AnimatedSection';
import { SNAPSHOT } from '@/lib/skills';

export default function QuickSnapshot() {
  return (
    <section id="snapshot" style={{ padding: '88px 24px', background: '#FFFFFF', borderTop: '1px solid #EBEBEB' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <AnimatedSection>
          <p style={{
            color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px',
            fontFamily: 'JetBrains Mono, monospace', textAlign: 'center',
          }}>
            Quick Snapshot
          </p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '12px', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}>
            What I <span style={{ color: '#6366F1' }}>build</span>
          </h2>
          <p style={{ color: '#6B7280', textAlign: 'center', maxWidth: '560px', margin: '0 auto 44px', fontSize: '0.92rem' }}>
            A systems engineer who ships production software — across platforms, AI infrastructure, and full-stack products.
          </p>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '14px',
        }}>
          {SNAPSHOT.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 70}>
              <div style={{
                height: '100%',
                background: '#FAF9F6',
                border: '1px solid #EBEBEB',
                borderRadius: '14px',
                padding: '22px',
                borderTop: `3px solid ${s.color}`,
              }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  color: '#0F0E14', fontSize: '0.97rem', marginBottom: '8px',
                  letterSpacing: '-0.02em',
                }}>
                  {s.label}
                </h3>
                <p style={{
                  color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.6,
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {s.detail}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
