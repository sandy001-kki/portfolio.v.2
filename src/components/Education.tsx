'use client';

import AnimatedSection from './AnimatedSection';
import { GraduationCap, Award, BookOpen, Cpu, Globe } from 'lucide-react';

const TIMELINE = [
  {
    icon: GraduationCap,
    year: '2024 – 2028',
    title: 'B.Tech — Computer Science & Engineering',
    org: 'SCSVMV University, Kanchipuram',
    desc: 'Specializing in AI, Machine Learning, and Software Engineering. Active in lab projects across AI, robotics, data science, and full-stack development.',
    color: '#6366F1',
    type: 'Education',
    tags: ['AI/ML', 'Robotics', 'Web Dev', 'Data Science', 'Algorithms'],
  },
  {
    icon: Globe,
    year: '2026',
    title: 'Shukra — Kubernetes Operator',
    org: 'Personal Project',
    desc: 'Production-grade Kubernetes operator in Go. One AppEnvironment YAML creates Deployments, Services, Ingress, HPA, and security resources. AI-assisted CLI.',
    color: '#0891B2',
    type: 'Project',
    tags: ['Go', 'Kubernetes', 'Helm', 'DevOps', 'AI CLI'],
  },
  {
    icon: Award,
    year: '2026',
    title: 'AI Attendance System — Production',
    org: 'University Project · 160+ commits',
    desc: 'Production-grade facial recognition attendance for university. Next.js + Firebase + TensorFlow.js + face-api.js. Role-based dashboards, Excel export.',
    color: '#7C3AED',
    type: 'Project',
    tags: ['Next.js', 'TensorFlow.js', 'Firebase', 'TypeScript'],
  },
  {
    icon: Cpu,
    year: '2026',
    title: 'AGV Autonomous Vehicle — v1.0',
    org: 'Personal Project · APK Released',
    desc: 'Fully autonomous ground vehicle with LiDAR 360° mapping, line following, obstacle avoidance. Raspberry Pi + Arduino Mega + Flutter control app.',
    color: '#059669',
    type: 'Project',
    tags: ['Raspberry Pi', 'Python', 'Flutter', 'LiDAR', 'Arduino'],
  },
  {
    icon: BookOpen,
    year: '2025 – 2026',
    title: 'Academic Lab Milestones',
    org: 'SCSVMV University',
    desc: 'Completed OOP Lab (39 C++ programs), DSA Lab, DAA Lab Sem 4, Python Lab, R Data Science projects. Multi-semester academic excellence.',
    color: '#C2410C',
    type: 'Academic',
    tags: ['C++', 'Python', 'R', 'Algorithms', 'DSA'],
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '112px 24px', background: '#F3F2EF', position: 'relative' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Journey
            </p>
            <h2 className="section-title">
              Education &amp; <span style={{ color: '#6366F1' }}>Milestones</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '19px', top: '24px', bottom: '24px',
            width: '2px',
            background: '#E0DFE4',
            borderRadius: '2px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {TIMELINE.map((item, i) => (
              <AnimatedSection key={i} delay={i * 90} direction="left">
                <div style={{ display: 'flex', gap: '22px' }}>
                  {/* Icon dot */}
                  <div style={{
                    width: '40px', height: '40px',
                    borderRadius: '12px',
                    background: `${item.color}10`,
                    border: `1px solid ${item.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, zIndex: 1, marginTop: '6px',
                  }}>
                    <item.icon size={17} style={{ color: item.color }} />
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1, padding: '22px 24px',
                      background: '#FFFFFF',
                      border: `1px solid ${item.color}20`,
                      borderRadius: '14px',
                      transition: 'all 0.25s',
                      cursor: 'default',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}40`;
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${item.color}12`;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}20`;
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                    }}
                  >
                    {/* Year + type */}
                    <div style={{
                      display: 'flex', flexWrap: 'wrap',
                      alignItems: 'center', justifyContent: 'space-between',
                      gap: '8px', marginBottom: '8px',
                    }}>
                      <span style={{
                        color: '#9CA3AF', fontSize: '0.75rem',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {item.year}
                      </span>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700,
                        padding: '2px 9px', borderRadius: '9999px',
                        color: item.color,
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}25`,
                        letterSpacing: '0.05em',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {item.type}
                      </span>
                    </div>

                    <h3 style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700, color: '#0F0E14',
                      fontSize: '1rem', marginBottom: '4px',
                      letterSpacing: '-0.02em',
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      color: item.color, fontSize: '0.8rem',
                      fontWeight: 600, marginBottom: '10px',
                    }}>
                      {item.org}
                    </p>
                    <p style={{
                      color: '#6B7280', fontSize: '0.9rem',
                      lineHeight: 1.7, marginBottom: '14px',
                    }}>
                      {item.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: '0.7rem', padding: '3px 8px', borderRadius: '6px',
                          background: '#F3F2EF', color: '#4B5563',
                          border: '1px solid #E0DFE4',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}>
                          {tag}
                        </span>
                      ))}
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
