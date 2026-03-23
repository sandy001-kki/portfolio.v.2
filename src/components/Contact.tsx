'use client';

import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { Github, Mail, ArrowRight, ExternalLink } from 'lucide-react';

const LINKS = [
  { icon: Github, label: 'Personal GitHub', value: 'sandy001-kki', href: 'https://github.com/sandy001-kki', color: '#22C55E' },
  { icon: Github, label: 'University GitHub', value: '11249a040-sandeep', href: 'https://github.com/11249a040-sandeep', color: '#3B82F6' },
  { icon: Mail, label: 'Email', value: 'Available on request', href: '/contact', color: '#F59E0B' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '112px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Top gradient line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.2), transparent)' }} />

      {/* Glow */}
      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'rgba(34,197,94,0.04)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Contact
            </p>
            <h2 className="section-title" style={{ color: '#f8fafc', marginBottom: '16px' }}>
              Let&apos;s <span className="gradient-text">Build Together</span>
            </h2>
            <p style={{ color: '#475569', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Open to internships, research collaborations, freelance, and interesting projects.
            </p>
          </div>
        </AnimatedSection>

        {/* Two CTA cards */}
        <AnimatedSection delay={80}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px', maxWidth: '720px', margin: '0 auto 56px' }}>
            {/* Contact */}
            <Link
              href="/contact"
              style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '28px 28px',
                borderRadius: '20px',
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.18)',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(34,197,94,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,197,94,0.18)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={18} style={{ color: '#22C55E' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1.05rem', marginBottom: '4px' }}>Get in Touch</p>
                <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.55 }}>Collaborations, research opportunities, or just saying hi.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#22C55E', fontSize: '0.82rem', fontWeight: 600, marginTop: 'auto' }}>
                Contact Me <ArrowRight size={14} />
              </div>
            </Link>

            {/* Hire */}
            <Link
              href="/hire"
              style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '28px 28px',
                borderRadius: '20px',
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid rgba(139,92,246,0.18)',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.1)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.06)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.18)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ExternalLink size={18} style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1.05rem', marginBottom: '4px' }}>Hire Me</p>
                <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.55 }}>Projects, internships, or freelance — let&apos;s build something great.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8B5CF6', fontSize: '0.82rem', fontWeight: 600, marginTop: 'auto' }}>
                Work With Me <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </AnimatedSection>

        {/* Quick links */}
        <AnimatedSection delay={160}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  color: '#64748b',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = link.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                  (e.currentTarget as HTMLElement).style.background = `${link.color}08`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#64748b';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                }}
              >
                <link.icon size={14} style={{ color: 'inherit' }} />
                {link.value}
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
