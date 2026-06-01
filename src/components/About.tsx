'use client';

import Image from 'next/image';
import AnimatedSection from './AnimatedSection';
import { Github, MapPin, GraduationCap, Cpu, BrainCircuit, Boxes, Linkedin, Cloud, Download } from 'lucide-react';
import { GITHUB_PRIMARY, GITHUB_ACADEMIC } from '@/lib/projects';

const RESUME_PATH = '/Sandeep_Kumar_Bollavaram_Resume.pdf';

const HIGHLIGHTS = [
  {
    icon: Boxes,
    title: 'Platform Engineering',
    desc: 'Shukra — a production-grade Kubernetes operator in Go (Kubebuilder, CRDs, webhooks, Helm OCI, gRPC). One CRD provisions an entire app environment.',
    color: '#0891B2',
    bg: 'rgba(8,145,178,0.07)',
    border: 'rgba(8,145,178,0.18)',
  },
  {
    icon: BrainCircuit,
    title: 'AI Systems & LLM Infra',
    desc: 'Kairo — MCP-based persistent memory for AI coding agents. Local-first LLM systems with Ollama, embeddings, and vector retrieval.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.07)',
    border: 'rgba(124,58,237,0.18)',
  },
  {
    icon: Cloud,
    title: 'Full Stack & Cloud',
    desc: 'University ERP across web + Flutter, and OCI SentinelMesh — a FastAPI/React cloud compliance platform with a rule engine and CI.',
    color: '#0284C7',
    bg: 'rgba(2,132,199,0.07)',
    border: 'rgba(2,132,199,0.18)',
  },
  {
    icon: Cpu,
    title: 'Desktop & Robotics',
    desc: 'Vayu — an offline Windows AI assistant (WinUI 3, .NET, Ollama). Autonomous vehicles with Raspberry Pi, LiDAR, and SLAM.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.07)',
    border: 'rgba(5,150,105,0.18)',
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '112px 24px', background: '#F3F2EF', position: 'relative' }}>
      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '60px',
        background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), transparent)',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '56px',
          alignItems: 'start',
        }}>

          {/* Left: bio + photo */}
          <AnimatedSection direction="left">
            {/* Profile photo */}
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #FFFFFF',
                boxShadow: '0 4px 20px rgba(99,102,241,0.16)',
                flexShrink: 0,
              }}>
                <Image
                  src="/images/profile.jpg"
                  alt="Sandeep Kumar Bollavaram"
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#0F0E14', fontSize: '1.1rem', lineHeight: 1.2, marginBottom: '2px' }}>
                  Sandeep Kumar Bollavaram
                </p>
                <p style={{ color: '#9CA3AF', fontSize: '0.82rem' }}>AI Systems · Platform · Full Stack Engineer</p>
              </div>
            </div>

            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              About Me
            </p>
            <h2 className="section-title" style={{ marginBottom: '22px', color: '#0F0E14' }}>
              Engineer.<br />
              <span style={{ color: '#6366F1' }}>Systems builder.</span>
            </h2>
            <p style={{ color: '#4B5563', lineHeight: 1.8, marginBottom: '14px', fontSize: '0.97rem' }}>
              I&apos;m <span style={{ color: '#0F0E14', fontWeight: 600 }}>Sandeep Kumar Bollavaram</span> — an{' '}
              <span style={{ color: '#6366F1', fontWeight: 500 }}>AI Systems, LLM, and Platform Engineer</span>.
              I build production software end to end: Kubernetes operators in Go, AI agent memory systems,
              local-first LLM infrastructure, and full-stack platforms.
            </p>
            <p style={{ color: '#4B5563', lineHeight: 1.8, marginBottom: '28px', fontSize: '0.97rem' }}>
              I work across the stack and the system — from{' '}
              <span style={{ color: '#0F0E14', fontWeight: 500 }}>CRDs, webhooks, and gRPC control planes</span> to{' '}
              <span style={{ color: '#0F0E14', fontWeight: 500 }}>MCP-based agent infrastructure</span> and{' '}
              <span style={{ color: '#0F0E14', fontWeight: 500 }}>native Windows AI assistants</span>.
              I also build product at <span style={{ color: '#0F0E14', fontWeight: 500 }}>Flexdee Technologies</span>,
              owning AI platform features, backend systems, and CI/CD.
            </p>

            {/* Resume button */}
            <a href={RESUME_PATH} download className="hero-cta hero-cta--primary" style={{ marginBottom: '24px' }}>
              <Download size={16} /> Download Resume
            </a>

            {/* Meta info */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
              {[
                { icon: MapPin, text: 'Kanchipuram, Tamil Nadu' },
                { icon: GraduationCap, text: 'SCSVMV University, CSE' },
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: '#6B7280', fontSize: '0.83rem',
                }}>
                  <item.icon size={13} style={{ color: '#6366F1', flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: 'GitHub', href: GITHUB_PRIMARY, icon: Github },
                { label: 'Academic GitHub', href: GITHUB_ACADEMIC, icon: Github },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sandeepbollavaram', icon: Linkedin },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '9px 16px', borderRadius: '10px',
                    border: '1px solid #E0DFE4', color: '#6B7280',
                    background: '#FFFFFF',
                    fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6366F1';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.30)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(99,102,241,0.10)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6B7280';
                    (e.currentTarget as HTMLElement).style.borderColor = '#E0DFE4';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
                  }}
                >
                  <link.icon size={13} />
                  {link.label}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: highlight cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {HIGHLIGHTS.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 80} direction="right">
                <div
                  style={{
                    background: '#FFFFFF',
                    border: `1px solid ${h.border}`,
                    borderRadius: '14px',
                    padding: '20px 22px',
                    transition: 'all 0.25s',
                    cursor: 'default',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${h.border}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 38, height: 38, borderRadius: '9px',
                        background: h.bg, border: `1px solid ${h.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <h.icon size={17} style={{ color: h.color }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700, color: '#0F0E14',
                        fontSize: '0.97rem', marginBottom: '5px',
                        letterSpacing: '-0.02em',
                      }}>
                        {h.title}
                      </h3>
                      <p style={{ color: '#6B7280', fontSize: '0.875rem', lineHeight: 1.65 }}>
                        {h.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
