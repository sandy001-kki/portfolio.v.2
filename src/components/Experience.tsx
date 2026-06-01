'use client';

import AnimatedSection from './AnimatedSection';
import { Download } from 'lucide-react';

const RESUME_PATH = '/Sandeep_Kumar_Bollavaram_Resume.pdf';

const HIGHLIGHTS = [
  {
    role: 'AI & Platform Engineering',
    org: 'Flexdee Technologies',
    period: '2025 — Present',
    points: [
      'Architect and build AI platform features and backend systems end to end.',
      'Design full-stack architecture across web and mobile with shared backends.',
      'Own CI/CD pipelines and product engineering from prototype to release.',
    ],
  },
  {
    role: 'Open Source Engineering',
    org: 'Independent',
    period: 'Ongoing',
    points: [
      'Maintain public projects spanning Kubernetes operators, AI agent infrastructure, and developer tools.',
      'Ship production-grade software with releases, CI, and documentation.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '112px 24px', background: '#F3F2EF' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Experience Highlights
            </p>
            <h2 className="section-title">
              Building real <span style={{ color: '#6366F1' }}>products</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {HIGHLIGHTS.map((h, i) => (
            <AnimatedSection key={h.role} delay={i * 90}>
              <div style={{
                background: '#FFFFFF', border: '1px solid #EBEBEB', borderRadius: '16px',
                padding: '26px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0F0E14', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                      {h.role}
                    </h3>
                    <p style={{ color: '#6366F1', fontSize: '0.85rem', fontWeight: 600 }}>{h.org}</p>
                  </div>
                  <span style={{ color: '#9CA3AF', fontSize: '0.78rem', fontFamily: 'JetBrains Mono, monospace' }}>
                    {h.period}
                  </span>
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {h.points.map((p, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', color: '#4B5563', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      <span style={{ color: '#6366F1', flexShrink: 0 }}>—</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={120}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <a href={RESUME_PATH} download className="hero-cta hero-cta--primary">
              <Download size={16} /> Download Full Resume
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
