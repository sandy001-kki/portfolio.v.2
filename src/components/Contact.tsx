'use client';

import Link from 'next/link';
import AnimatedSection from './AnimatedSection';
import { Github, Mail, ArrowRight, ExternalLink } from 'lucide-react';

const LINKS = [
  { icon: Github, label: 'Personal GitHub', value: 'sandy001-kki', href: 'https://github.com/sandy001-kki', color: '#6366F1' },
  { icon: Github, label: 'University GitHub', value: '11249a040-sandeep', href: 'https://github.com/11249a040-sandeep', color: '#0284C7' },
  { icon: Mail, label: 'Email', value: 'Get in touch', href: '/contact', color: '#059669' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '112px 24px', background: '#FAF9F6', position: 'relative', overflow: 'hidden' }}>
      {/* Top divider */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '60px',
        background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), transparent)',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Contact
            </p>
            <h2 className="section-title" style={{ marginBottom: '14px' }}>
              Let&apos;s <span style={{ color: '#6366F1' }}>Build Together</span>
            </h2>
            <p style={{ color: '#6B7280', maxWidth: '480px', margin: '0 auto', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Open to internships, research collaborations, freelance, and interesting projects.
            </p>
          </div>
        </AnimatedSection>

        {/* Two CTA cards */}
        <AnimatedSection delay={80}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '14px',
            maxWidth: '680px',
            margin: '0 auto 48px',
          }}>
            {/* Contact card */}
            <Link
              href="/contact"
              style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '26px',
                borderRadius: '16px',
                background: '#FFFFFF',
                border: '1px solid rgba(99,102,241,0.18)',
                textDecoration: 'none',
                transition: 'all 0.22s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#F8F7FF';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(99,102,241,0.12)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.18)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '11px',
                background: 'rgba(99,102,241,0.08)',
                border: '1px solid rgba(99,102,241,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Mail size={18} style={{ color: '#6366F1' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  color: '#0F0E14', fontSize: '1rem', marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}>
                  Get in Touch
                </p>
                <p style={{ color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Collaborations, research opportunities, or just saying hi.
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                color: '#6366F1', fontSize: '0.82rem', fontWeight: 600, marginTop: 'auto',
              }}>
                Contact Me <ArrowRight size={14} />
              </div>
            </Link>

            {/* Hire card */}
            <Link
              href="/hire"
              style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                padding: '26px',
                borderRadius: '16px',
                background: '#FFFFFF',
                border: '1px solid rgba(7,89,133,0.18)',
                textDecoration: 'none',
                transition: 'all 0.22s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#F0FAFB';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(8,145,178,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 30px rgba(8,145,178,0.10)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(7,89,133,0.18)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
              }}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '11px',
                background: 'rgba(8,145,178,0.08)',
                border: '1px solid rgba(8,145,178,0.20)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ExternalLink size={18} style={{ color: '#0891B2' }} />
              </div>
              <div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontWeight: 700,
                  color: '#0F0E14', fontSize: '1rem', marginBottom: '4px',
                  letterSpacing: '-0.02em',
                }}>
                  Hire Me
                </p>
                <p style={{ color: '#6B7280', fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Projects, internships, or freelance — let&apos;s build something great.
                </p>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                color: '#0891B2', fontSize: '0.82rem', fontWeight: 600, marginTop: 'auto',
              }}>
                Work With Me <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </AnimatedSection>

        {/* Quick links */}
        <AnimatedSection delay={160}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '10px 18px', borderRadius: '11px',
                  border: '1px solid #E0DFE4',
                  background: '#FFFFFF',
                  color: '#6B7280',
                  fontSize: '0.82rem', fontWeight: 500,
                  textDecoration: 'none', transition: 'all 0.18s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = link.color;
                  (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                  (e.currentTarget as HTMLElement).style.background = `${link.color}06`;
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = '#6B7280';
                  (e.currentTarget as HTMLElement).style.borderColor = '#E0DFE4';
                  (e.currentTarget as HTMLElement).style.background = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
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
