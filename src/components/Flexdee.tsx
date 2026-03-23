'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedSection from './AnimatedSection';
import {
  Code2, GraduationCap, Users, ShoppingBag, FlaskConical,
  ExternalLink, CheckCircle, Clock, Rocket, MapPin, Calendar,
  Shield, CreditCard, Layers,
} from 'lucide-react';

/* ── Brand token for Flexdee ── */
const BLUE = '#5B95FF';
const ORANGE = '#FF8C00';

const PILLARS = [
  {
    icon: Code2,
    title: 'Tech Services',
    desc: '6 service categories — Web, Software, AI, Cloud, Cybersecurity, UI/UX.',
    status: 'live' as const,
    color: BLUE,
  },
  {
    icon: GraduationCap,
    title: 'Flexdee Learn',
    desc: 'Free programming education — 50+ languages, interactive editors, quizzes, XP system.',
    status: 'live' as const,
    color: '#22C55E',
  },
  {
    icon: Users,
    title: 'Marketplace',
    desc: 'Hire verified IoT / Robotics / AI hardware freelancers with escrow & milestone payments.',
    status: 'built' as const,
    color: ORANGE,
  },
  {
    icon: ShoppingBag,
    title: 'Store',
    desc: 'Dev tools, templates, IoT kits, SDKs — starting ₹499.',
    status: 'built' as const,
    color: '#8B5CF6',
  },
  {
    icon: FlaskConical,
    title: 'FlexResearch',
    desc: 'Publish and read academic research papers — subscription-based, India-focused.',
    status: 'soon' as const,
    color: '#EC4899',
  },
];

const HIGHLIGHTS = [
  { icon: Rocket, text: 'Built solo — design, frontend, backend & DB', color: BLUE },
  { icon: GraduationCap, text: '50+ languages with live code editors', color: '#22C55E' },
  { icon: Users, text: 'First hardware-first freelancer marketplace in India', color: ORANGE },
  { icon: Shield, text: 'KYC verification + role-based access control', color: '#8B5CF6' },
  { icon: CreditCard, text: 'Razorpay escrow & milestone payments', color: '#EC4899' },
  { icon: Layers, text: '40+ shadcn/ui components, Framer Motion animations', color: BLUE },
];

const STACK = ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'Framer Motion', 'Razorpay', 'Vercel'];

function StatusBadge({ status }: { status: 'live' | 'built' | 'soon' }) {
  const map = {
    live:  { label: 'Live (not deployed)', color: '#22C55E', bg: 'rgba(34,197,94,0.1)',   icon: CheckCircle },
    built: { label: 'Built (not deployed)', color: BLUE,     bg: 'rgba(91,149,255,0.1)',  icon: CheckCircle },
    soon:  { label: 'Launching Soon',       color: ORANGE,   bg: 'rgba(255,140,0,0.1)',   icon: Clock },
  };
  const s = map[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', color: s.color, background: s.bg, letterSpacing: '0.03em' }}>
      <s.icon size={10} /> {s.label}
    </span>
  );
}

/* ── Counter hook ── */
function useCounter(target: number, active: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

function StatNum({ n, suffix = '', active }: { n: number; suffix?: string; active: boolean }) {
  const v = useCounter(n, active);
  return <>{v}{suffix}</>;
}

export default function Flexdee() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="startup" style={{ padding: '112px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '600px', height: '600px', background: `${BLUE}06`, borderRadius: '50%', filter: 'blur(120px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '400px', height: '400px', background: `${ORANGE}05`, borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      {/* Top divider */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: `linear-gradient(to bottom, transparent, ${BLUE}40, transparent)` }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Section eyebrow */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${BLUE}10`, border: `1px solid ${BLUE}28`, borderRadius: '99px', padding: '5px 16px 5px 10px', marginBottom: '20px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: `${BLUE}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Rocket size={11} style={{ color: BLUE }} />
              </div>
              <span style={{ color: BLUE, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Startup Founder</span>
            </div>
            <h2 className="section-title" style={{ color: '#f8fafc', marginBottom: '8px' }}>
              Flexdee{' '}
              <span style={{ background: `linear-gradient(120deg, ${BLUE}, ${ORANGE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Technologies
              </span>
            </h2>
            <p style={{ color: '#475569', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.75 }}>
              Build, Manage, and Research with Flexdee — your all-in-one technology platform for software, learning, talent, and research.
            </p>
          </div>
        </AnimatedSection>

        {/* ── Top split: story + stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))', gap: '40px', marginBottom: '56px', alignItems: 'start' }}>

          {/* Left — story */}
          <AnimatedSection direction="left">
            <div style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${BLUE}18`, borderRadius: '20px', padding: '32px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                {[
                  { icon: Calendar,  text: 'Founded 2025',     color: BLUE },
                  { icon: MapPin,    text: 'India 🇮🇳',         color: ORANGE },
                ].map(t => (
                  <div key={t.text} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: t.color, fontSize: '0.78rem', fontWeight: 600, background: `${t.color}10`, border: `1px solid ${t.color}25`, borderRadius: '8px', padding: '4px 10px' }}>
                    <t.icon size={12} /> {t.text}
                  </div>
                ))}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 600, background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '8px', padding: '4px 10px' }}>
                   In Development / Beta
                </div>
              </div>

              <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '20px' }}>
                Flexdee Technologies is a comprehensive digital solutions umbrella platform built solo by a 20-year-old founder. It combines{' '}
                <span style={{ color: '#e2e8f0' }}>professional tech services</span>,{' '}
                <span style={{ color: '#e2e8f0' }}>free programming education</span>, a{' '}
                <span style={{ color: '#e2e8f0' }}>hardware-focused freelancer marketplace</span>, a{' '}
                <span style={{ color: '#e2e8f0' }}>branded product store</span>, and a{' '}
                <span style={{ color: '#e2e8f0' }}>research paper publishing platform</span> — all under one roof.
              </p>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '28px' }}>
                Built for India&apos;s growing developer ecosystem. One account, five platforms, zero juggling.
              </p>

              <a
                href="https://flexdee.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '11px 22px', borderRadius: '12px', background: `${BLUE}18`, border: `1px solid ${BLUE}35`, color: BLUE, fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', fontFamily: 'Space Grotesk, sans-serif' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${BLUE}28`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${BLUE}18`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <ExternalLink size={14} /> flexdee.com
              </a>
            </div>
          </AnimatedSection>

          {/* Right — stats */}
          <AnimatedSection direction="right" delay={100}>
            <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { n: 5,   suffix: '',  label: 'Platform pillars',         color: BLUE },
                { n: 50,  suffix: '+', label: 'Languages on Flexdee Learn', color: '#22C55E' },
                { n: 40,  suffix: '+', label: 'UI components built',       color: ORANGE },
                { n: 1,   suffix: '',  label: 'Solo founder, age 20',      color: '#8B5CF6' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '22px 18px' }}>
                  <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: s.color, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '6px' }}>
                    <StatNum n={s.n} suffix={s.suffix} active={visible} />
                  </p>
                  <p style={{ color: '#475569', fontSize: '0.75rem', lineHeight: 1.5 }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Stack pills */}
            <div style={{ marginTop: '16px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 20px' }}>
              <p style={{ color: '#334155', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>Tech Stack</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                {STACK.map(t => (
                  <span key={t} style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: '7px', background: `${BLUE}0a`, color: BLUE, border: `1px solid ${BLUE}20`, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* ── 5 Pillars ── */}
        <AnimatedSection>
          <p style={{ color: '#334155', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>
            The 5 Pillars
          </p>
        </AnimatedSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))', gap: '14px', marginBottom: '56px', alignItems: 'stretch' }}>
          {PILLARS.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 80} style={{ height: '100%' }}>
              <div
                style={{ background: 'rgba(15,23,42,0.5)', border: `1px solid ${p.color}18`, borderRadius: '16px', padding: '22px 20px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.25s', cursor: 'default', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}40`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.background = `rgba(15,23,42,0.8)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${p.color}18`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.background = 'rgba(15,23,42,0.5)'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${p.color}12`, border: `1px solid ${p.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', flexShrink: 0 }}>
                  <p.icon size={18} style={{ color: p.color }} />
                </div>
                <h3 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9', marginBottom: '6px' }}>{p.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.65, marginBottom: '16px', flex: 1 }}>{p.desc}</p>
                <StatusBadge status={p.status} />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* ── What makes Flexdee different ── */}
        <AnimatedSection delay={60}>
          <div style={{ background: `linear-gradient(135deg, rgba(91,149,255,0.05) 0%, rgba(255,140,0,0.04) 100%)`, border: `1px solid ${BLUE}15`, borderRadius: '20px', padding: 'clamp(28px,5vw,48px)' }}>
            <p style={{ color: BLUE, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
              Why Flexdee Is Different
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: '780px', marginBottom: '32px' }}>
              Most platforms specialize in one thing — Fiverr for freelancing, Udemy for learning, Upwork for hiring.{' '}
              <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Flexdee is an umbrella</span> — a single ecosystem where a developer can learn, get hired, sell tools, read research, and build software, all from one account.
              The hardware/IoT freelancer niche is particularly <span style={{ color: ORANGE, fontWeight: 600 }}>underserved by existing platforms</span>.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: '12px' }}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${h.color}12`, border: `1px solid ${h.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                    <h.icon size={13} style={{ color: h.color }} />
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6 }}>{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
