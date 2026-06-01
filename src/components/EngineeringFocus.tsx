'use client';

import AnimatedSection from './AnimatedSection';
import { Boxes, BrainCircuit, Layers, MonitorSmartphone } from 'lucide-react';

const FOCUS = [
  {
    icon: Boxes,
    title: 'Platform Engineering',
    desc: 'Kubernetes operators in Go with Kubebuilder, CRDs, admission webhooks, Helm OCI distribution, and gRPC control surfaces.',
    tags: ['Go', 'Kubernetes', 'Operators', 'Helm', 'gRPC'],
    color: '#0891B2',
  },
  {
    icon: BrainCircuit,
    title: 'AI Systems & LLM Infrastructure',
    desc: 'MCP servers, agent memory, RAG, local-first LLMs via Ollama, embeddings and vector retrieval — durable, private AI.',
    tags: ['MCP', 'RAG', 'AI Agents', 'Ollama', 'Vector Memory'],
    color: '#7C3AED',
  },
  {
    icon: Layers,
    title: 'Full Stack Engineering',
    desc: 'Production platforms with Next.js, FastAPI, Flutter, PostgreSQL and Firebase — shared backends across web and mobile.',
    tags: ['Next.js', 'FastAPI', 'Flutter', 'PostgreSQL'],
    color: '#0284C7',
  },
  {
    icon: MonitorSmartphone,
    title: 'Desktop & Developer Tools',
    desc: 'Native Windows apps in WinUI 3 + .NET, local AI assistants, and tools with real release pipelines and installers.',
    tags: ['WinUI 3', '.NET', 'Local AI', 'Dev Tools'],
    color: '#D97706',
  },
];

export default function EngineeringFocus() {
  return (
    <section id="focus" style={{ padding: '112px 24px', background: '#F3F2EF' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Engineering Focus Areas
            </p>
            <h2 className="section-title">
              Where I go <span style={{ color: '#6366F1' }}>deep</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '16px',
        }}>
          {FOCUS.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 80}>
              <div style={{
                height: '100%', background: '#FFFFFF', border: '1px solid #EBEBEB',
                borderRadius: '16px', padding: '26px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '11px',
                  background: `${f.color}12`, border: `1px solid ${f.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, color: '#0F0E14',
                  fontSize: '1.05rem', marginBottom: '8px', letterSpacing: '-0.02em',
                }}>
                  {f.title}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: '16px' }}>
                  {f.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {f.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: '0.66rem', fontFamily: 'JetBrains Mono, monospace',
                      padding: '3px 8px', borderRadius: '6px',
                      background: `${f.color}0D`, color: f.color, border: `1px solid ${f.color}26`,
                    }}>
                      {t}
                    </span>
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
