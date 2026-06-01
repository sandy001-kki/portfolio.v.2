'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { FEATURED_HOME, type Project } from '@/lib/projects';

export default function FeaturedProjects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <section id="projects" style={{ padding: '112px 24px', background: '#FAF9F6' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{
                color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                Featured Projects
              </p>
              <h2 className="section-title" style={{ marginBottom: '14px' }}>
                Production systems, <span style={{ color: '#6366F1' }}>shipped</span>
              </h2>
              <p style={{ color: '#6B7280', maxWidth: '540px', margin: '0 auto', fontSize: '0.92rem' }}>
                Six builds that define how I work — platform engineering, AI infrastructure, and full-stack products.
              </p>
            </div>
          </AnimatedSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 330px), 1fr))',
            gap: '16px',
          }}>
            {FEATURED_HOME.map((p, i) => (
              <AnimatedSection key={p.id} delay={Math.min(i * 60, 280)}>
                <ProjectCard project={p} onOpen={setSelected} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={120}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '44px' }}>
              <a href="/projects" className="hero-cta hero-cta--primary">
                View all projects <ArrowRight size={16} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
