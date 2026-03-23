'use client';

import AnimatedSection from './AnimatedSection';
import { Github, MapPin, GraduationCap, Cpu, Brain, Code2, Linkedin } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Brain,
    title: 'AI & Computer Vision',
    desc: 'YOLOv8 weapon detection, MediaPipe gesture recognition, TensorFlow.js facial attendance — real production AI systems.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
  },
  {
    icon: Cpu,
    title: 'Robotics & Hardware',
    desc: 'Autonomous robots with Raspberry Pi, ESP32, YDLIDAR sensors, Arduino. Flutter control apps from scratch.',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
  },
  {
    icon: Code2,
    title: 'Full-Stack Web',
    desc: 'Next.js + Firebase production apps. Most ambitious: SocialWorld — a living 3D city of Facebook users in Three.js/WebGL.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
  },
];

export default function About() {
  return (
    <section id="about" style={{ padding: '112px 24px', position: 'relative' }}>
      {/* Subtle divider */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(34,197,94,0.3), transparent)' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '48px', alignItems: 'center' }}>

          {/* Left */}
          <AnimatedSection direction="left">
            <p style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              About Me
            </p>
            <h2 className="section-title" style={{ color: '#f8fafc', marginBottom: '24px' }}>
              Building at the edge of<br />
              <span className="gradient-text">AI &amp; hardware.</span>
            </h2>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '16px', fontSize: '1.05rem' }}>
              I&apos;m <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Sandeep Kumar Bollavaram</span> — a B.Tech CSE student at{' '}
              <span style={{ color: '#4ade80', fontWeight: 500 }}>SCSVMV University</span>, Kanchipuram.
              I build things at the intersection of artificial intelligence, robotics, and the web.
            </p>
            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '32px', fontSize: '1.05rem' }}>
              From <span style={{ color: '#e2e8f0' }}>autonomous robots with LiDAR</span> to{' '}
              <span style={{ color: '#e2e8f0' }}>real-time AI security cameras</span> and creative{' '}
              <span style={{ color: '#e2e8f0' }}>3D social visualizations</span> in WebGL —
              every project pushes further than the last.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: MapPin, text: 'Kanchipuram, Tamil Nadu' },
                { icon: GraduationCap, text: 'SCSVMV University, CSE' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.85rem' }}>
                  <item.icon size={14} style={{ color: '#22C55E', flexShrink: 0 }} />
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { label: 'Personal GitHub', href: 'https://github.com/sandy001-kki', icon: Github },
                { label: 'University GitHub', href: 'https://github.com/11249a040-sandeep', icon: Github },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sandeepbollavaram', icon: Linkedin },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.09)',
                    color: '#94a3b8',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#94a3b8';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)';
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <link.icon size={14} />
                  {link.label}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {HIGHLIGHTS.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 100} direction="right">
                <div
                  className="glass-bright"
                  style={{ padding: '22px 24px', transition: 'all 0.3s', cursor: 'default' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(6px)';
                    (e.currentTarget as HTMLElement).style.borderColor = `${h.color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                  }}
                >
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: h.bg,
                        border: `1px solid ${h.color}25`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <h.icon size={18} style={{ color: h.color }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1rem', marginBottom: '6px' }}>{h.title}</h3>
                      <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.65 }}>{h.desc}</p>
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
