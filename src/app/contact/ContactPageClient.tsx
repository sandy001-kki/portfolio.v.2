'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, ChevronDown, Building2 } from 'lucide-react';
import { supabase, type ContactMessage } from '@/lib/supabase';

const REGIONS = [
  'India', 'North America', 'Europe', 'Asia Pacific',
  'Middle East & Africa', 'Latin America', 'Other',
];

const INDUSTRIES = [
  'Software / Technology', 'Education', 'Healthcare',
  'Finance & Banking', 'Manufacturing', 'Retail & E-commerce',
  'Media & Entertainment', 'Government & Public Sector',
  'Research & Academia', 'Startup', 'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const UNDERLINE_INPUT = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.15)',
  padding: '12px 0',
  color: '#f1f5f9',
  fontSize: '1rem',
  fontFamily: 'Space Grotesk, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box' as const,
};

export default function ContactPageClient() {
  const [form, setForm] = useState<Omit<ContactMessage, 'id' | 'created_at' | 'type'>>({
    first_name: '', last_name: '', email: '',
    organization: '', region: '', industry: '', message: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const charLimit = 1500;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  function getInputStyle(field: string) {
    return {
      ...UNDERLINE_INPUT,
      borderBottomColor: focused === field ? '#22C55E' : 'rgba(255,255,255,0.15)',
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.region || !form.industry) { setError('Please select a Region and Industry.'); return; }
    setError('');
    setStatus('loading');
    try {
      if (supabase) {
        const { error: sbError } = await supabase
          .from('contact_messages')
          .insert([{ ...form, type: 'contact' }]);
        if (sbError) throw sbError;
      } else {
        const subject = encodeURIComponent(`Portfolio Contact from ${form.first_name} ${form.last_name}`);
        const body = encodeURIComponent(`Name: ${form.first_name} ${form.last_name}\nEmail: ${form.email}\nOrg: ${form.organization}\nRegion: ${form.region}\nIndustry: ${form.industry}\n\n${form.message}`);
        window.open(`mailto:sandeepkumarbollavaram@gmail.com?subject=${subject}&body=${body}`);
      }
      setStatus('success');
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setError('Something went wrong. Please try again or email directly.');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={32} style={{ color: '#22C55E' }} />
          </div>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f8fafc', marginBottom: '12px', letterSpacing: '-0.03em' }}>
            Message Sent!
          </h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
            Thanks for reaching out, <span style={{ color: '#e2e8f0' }}>{form.first_name}</span>. I&apos;ll get back to you soon.
          </p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '12px', background: '#22C55E', color: '#030712', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  /* ── LABEL style ── */
  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#475569',
    fontSize: isMobile ? '0.78rem' : '0.75rem',
    fontWeight: 600,
    letterSpacing: isMobile ? '0.04em' : '0.06em',
    textTransform: 'uppercase',
    marginBottom: '2px',
  };

  /* ── FORM content (shared between mobile & desktop) ── */
  const formContent = (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '28px' : '32px', maxWidth: isMobile ? '100%' : '580px' }}>

      {/* Row 1: First + Last — single col on mobile */}
      {isMobile ? (
        <>
          <div>
            <label style={labelStyle}>First name <span style={{ color: '#22C55E' }}>*</span></label>
            <input type="text" required suppressHydrationWarning value={form.first_name}
              onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
              onFocus={() => setFocused('first_name')} onBlur={() => setFocused(null)}
              style={getInputStyle('first_name')} />
          </div>
          <div>
            <label style={labelStyle}>Last name <span style={{ color: '#22C55E' }}>*</span></label>
            <input type="text" required suppressHydrationWarning value={form.last_name}
              onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
              onFocus={() => setFocused('last_name')} onBlur={() => setFocused(null)}
              style={getInputStyle('last_name')} />
          </div>
          <div>
            <label style={labelStyle}>Email <span style={{ color: '#22C55E' }}>*</span></label>
            <input type="email" required suppressHydrationWarning value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
              style={getInputStyle('email')} />
          </div>
          <div>
            <label style={labelStyle}>Organization <span style={{ color: '#22C55E' }}>*</span></label>
            <input type="text" required suppressHydrationWarning value={form.organization}
              onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
              onFocus={() => setFocused('organization')} onBlur={() => setFocused(null)}
              style={getInputStyle('organization')} />
          </div>
        </>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={labelStyle}>First name <span style={{ color: '#22C55E' }}>*</span></label>
              <input type="text" required suppressHydrationWarning value={form.first_name}
                onChange={e => setForm(f => ({ ...f, first_name: e.target.value }))}
                onFocus={() => setFocused('first_name')} onBlur={() => setFocused(null)}
                style={getInputStyle('first_name')} />
            </div>
            <div>
              <label style={labelStyle}>Last name <span style={{ color: '#22C55E' }}>*</span></label>
              <input type="text" required suppressHydrationWarning value={form.last_name}
                onChange={e => setForm(f => ({ ...f, last_name: e.target.value }))}
                onFocus={() => setFocused('last_name')} onBlur={() => setFocused(null)}
                style={getInputStyle('last_name')} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Email <span style={{ color: '#22C55E' }}>*</span></label>
              <input type="email" required suppressHydrationWarning value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                style={getInputStyle('email')} />
            </div>
            <div>
              <label style={labelStyle}>Organization <span style={{ color: '#22C55E' }}>*</span></label>
              <input type="text" required suppressHydrationWarning value={form.organization}
                onChange={e => setForm(f => ({ ...f, organization: e.target.value }))}
                onFocus={() => setFocused('organization')} onBlur={() => setFocused(null)}
                style={getInputStyle('organization')} />
            </div>
          </div>
        </>
      )}

      {/* Region */}
      <div>
        <label style={labelStyle}>Region <span style={{ color: '#22C55E' }}>*</span></label>
        <div style={{ position: 'relative' }}>
          <select required value={form.region} onChange={e => setForm(f => ({ ...f, region: e.target.value }))}
            onFocus={() => setFocused('region')} onBlur={() => setFocused(null)}
            style={{ ...getInputStyle('region'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: '28px', color: form.region ? '#f1f5f9' : '#334155' }}>
            <option value="" disabled style={{ background: '#0f172a' }}>Select region</option>
            {REGIONS.map(r => <option key={r} value={r} style={{ background: '#0f172a' }}>{r}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label style={labelStyle}>Industry <span style={{ color: '#22C55E' }}>*</span></label>
        <div style={{ position: 'relative' }}>
          <select required value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
            onFocus={() => setFocused('industry')} onBlur={() => setFocused(null)}
            style={{ ...getInputStyle('industry'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: '28px', color: form.industry ? '#f1f5f9' : '#334155' }}>
            <option value="" disabled style={{ background: '#0f172a' }}>Select industry</option>
            {INDUSTRIES.map(i => <option key={i} value={i} style={{ background: '#0f172a' }}>{i}</option>)}
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>How can I help? <span style={{ color: '#22C55E' }}>*</span></label>
        <textarea required rows={5} maxLength={charLimit} value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
          style={{ ...getInputStyle('message'), resize: 'none' }} />
        <div style={{ textAlign: 'right', color: '#334155', fontSize: '0.72rem', marginTop: '4px' }}>
          {form.message.length}/{charLimit}
        </div>
      </div>

      {error && (
        <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        suppressHydrationWarning
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          padding: '14px 40px', borderRadius: '12px',
          background: status === 'loading' ? 'rgba(34,197,94,0.6)' : '#22C55E',
          color: '#030712', fontWeight: 700, fontSize: '0.9rem', border: 'none',
          cursor: status === 'loading' ? 'default' : 'pointer', transition: 'all 0.2s',
          alignSelf: 'flex-start', boxShadow: '0 0 24px rgba(34,197,94,0.2)',
          fontFamily: 'Space Grotesk, sans-serif', width: isMobile ? '100%' : 'auto',
        }}
      >
        {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Send Message →'}
      </button>
    </form>
  );

  /* ══ MOBILE LAYOUT ══════════════════════════════════ */
  if (isMobile) {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', padding: '0' }}>
        {/* Top bar */}
        <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <ArrowLeft size={13} /> Back
          </Link>
        </div>

        {/* Mobile header block */}
        <div style={{ padding: '32px 24px 36px' }}>
          {/* Icon + label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={17} style={{ color: '#22C55E' }} />
            </div>
            <p style={{ color: '#22C55E', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              Request for Services
            </p>
          </div>

          {/* Description — visible on mobile instead of big heading */}
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.75, maxWidth: '340px' }}>
            Interested in a collaboration, research opportunity, or internship?
            Tell me a bit about yourself so we can get the ball rolling.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginBottom: '32px' }} />

        {/* Form */}
        <div style={{ padding: '0 24px 64px' }}>
          {formContent}
        </div>
      </div>
    );
  }

  /* ══ DESKTOP LAYOUT ══════════════════════════════════ */
  return (
    <div style={{ background: '#030712', position: 'relative' }}>

      {/* Left — scrollable form, right half reserved */}
      <div style={{ width: '50%', minHeight: '100vh', padding: 'clamp(48px, 8vw, 96px) clamp(32px, 5vw, 72px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '48px', transition: 'color 0.2s' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#475569')}
        >
          <ArrowLeft size={14} /> Portfolio
        </Link>

        {/* Desktop heading — shown only on desktop */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{ color: '#22C55E', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Get in Touch
          </p>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.04em', color: '#f8fafc', lineHeight: 1.1, marginBottom: '16px' }}>
            Let&apos;s build something<br />
            <span style={{ background: 'linear-gradient(120deg, #22C55E, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              great together.
            </span>
          </h1>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '480px' }}>
            Interested in a collaboration, research opportunity, or internship?
            Tell me a bit about yourself so we can get the ball rolling.
          </p>
        </div>

        {formContent}
      </div>

      {/* Right — fixed panel, always visible */}
      <div style={{ position: 'fixed', top: 0, right: 0, width: '50%', height: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0d1829 40%, #061018 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 64px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(34,197,94,0.15) 1px, transparent 1px)', backgroundSize: '36px 36px', maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '30%', width: 400, height: 400, background: 'rgba(34,197,94,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 300, height: 300, background: 'rgba(59,130,246,0.06)', borderRadius: '50%', filter: 'blur(70px)' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ color: '#22C55E', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>Sandeep Kumar Bollavaram</p>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.05em', color: '#f8fafc', lineHeight: 1.05, marginBottom: '24px' }}>
            AI. Robotics.<br />
            <span style={{ background: 'linear-gradient(120deg, #22C55E, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Web.</span>
          </h2>
          <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '360px', marginBottom: '48px' }}>
            B.Tech CSE student building production-grade AI systems, autonomous robots, and full-stack applications.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { value: '20+', label: 'Projects shipped', color: '#22C55E' },
              { value: '5+', label: 'Tech domains', color: '#3B82F6' },
              { value: '160+', label: 'Commits on single project', color: '#8B5CF6' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: s.color, letterSpacing: '-0.04em', minWidth: '64px' }}>{s.value}</span>
                <span style={{ color: '#334155', fontSize: '0.82rem', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '56px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/hire" style={{ padding: '10px 20px', borderRadius: '10px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none' }}>Hire Me →</Link>
            <Link href="/" style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none' }}>← Portfolio</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
