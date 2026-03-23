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
    color: '#22C55E',
    type: 'Education',
    tags: ['AI/ML', 'Robotics', 'Web Dev', 'Data Science', 'Algorithms'],
  },
  {
    icon: Globe,
    year: '2026',
    title: 'SocialWorld 3D — Full Stack Release',
    org: 'Personal Project',
    desc: '3D city visualization where Facebook users become buildings. Three.js + React 18 + Node.js + Supabase. Full OAuth, live data, and WebGL fly/drive modes.',
    color: '#8B5CF6',
    type: 'Project',
    tags: ['Three.js', 'React', 'Node.js', 'Supabase', 'WebGL'],
  },
  {
    icon: Award,
    year: '2026',
    title: 'AI Attendance System — Production',
    org: 'University Project • 160+ commits',
    desc: 'Production-grade facial recognition attendance for university. Next.js + Firebase + TensorFlow.js + face-api.js. Role-based dashboards, Excel export, CI/CD.',
    color: '#3B82F6',
    type: 'Project',
    tags: ['Next.js', 'TensorFlow.js', 'Firebase', 'TypeScript'],
  },
  {
    icon: Cpu,
    year: '2026',
    title: 'AGV Autonomous Vehicle — v1.0 Release',
    org: 'Personal Project • APK Released',
    desc: 'Fully autonomous ground vehicle with LiDAR 360° mapping, line following, obstacle avoidance. Raspberry Pi + Arduino Mega + Flutter control app.',
    color: '#F59E0B',
    type: 'Project',
    tags: ['Raspberry Pi', 'Python', 'Flutter', 'LiDAR', 'Arduino'],
  },
  {
    icon: BookOpen,
    year: '2025 – 2026',
    title: 'Academic Lab Milestones',
    org: 'SCSVMV University',
    desc: 'Completed OOP Lab (39 C++ programs), DSA Lab, DAA Lab Sem 4, Python Lab, R Data Science projects. Multi-semester academic excellence.',
    color: '#EC4899',
    type: 'Academic',
    tags: ['C++', 'Python', 'R', 'Algorithms', 'DSA'],
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '112px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Journey
            </p>
            <h2 className="section-title" style={{ color: '#f8fafc' }}>
              Education &amp; <span className="gradient-text">Milestones</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #22C55E40, #3B82F620, #8B5CF610, transparent)', borderRadius: '2px' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {TIMELINE.map((item, i) => (
              <AnimatedSection key={i} delay={i * 100} direction="left">
                <div style={{ display: 'flex', gap: '24px' }}>
                  {/* Icon dot */}
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${item.color}14`,
                      border: `1px solid ${item.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      zIndex: 1,
                      marginTop: '6px',
                    }}
                  >
                    <item.icon size={17} style={{ color: item.color }} />
                  </div>

                  {/* Card */}
                  <div
                    className="glass-bright"
                    style={{ flex: 1, padding: '22px 24px', transition: 'all 0.3s', cursor: 'default' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}25`;
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#334155', fontSize: '0.78rem' }}>{item.year}</span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '2px 9px',
                          borderRadius: '9999px',
                          color: item.color,
                          background: `${item.color}12`,
                          border: `1px solid ${item.color}28`,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1.05rem', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ color: item.color, fontSize: '0.82rem', fontWeight: 500, marginBottom: '10px' }}>{item.org}</p>
                    <p style={{ color: '#64748b', fontSize: '0.93rem', lineHeight: 1.7, marginBottom: '14px' }}>{item.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {item.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(30,41,59,0.9)', color: '#64748b', border: '1px solid rgba(255,255,255,0.05)' }}>{tag}</span>
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
