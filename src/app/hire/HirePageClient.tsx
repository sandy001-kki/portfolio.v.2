'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { supabase, type HireRequest } from '@/lib/supabase';

const PROJECT_TYPES = [
  'AI / Machine Learning System',
  'Computer Vision Application',
  'Robotics / Embedded System',
  'Full-Stack Web App (Next.js)',
  'Data Science / Dashboard (R/Python)',
  'Flutter Mobile App',
  'Research & Prototyping',
  'Other',
];

const TIMELINES = [
  'Less than 1 month',
  '1 – 3 months',
  '3 – 6 months',
  '6+ months',
  'Ongoing / Part-time',
  'Flexible',
];

const BUDGETS = [
  'Unpaid / Academic',
  '< ₹10,000',
  '₹10,000 – ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000+',
  'Equity / Revenue share',
  'Discuss later',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

const UNDERLINE_INPUT = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.12)',
  padding: '10px 0',
  color: '#f1f5f9',
  fontSize: '0.95rem',
  fontFamily: 'Space Grotesk, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box' as const,
};

export default function HirePageClient() {
  const [form, setForm] = useState<Omit<HireRequest, 'id' | 'created_at'>>({
    name: '', email: '', company: '',
    role: '', project_type: '', timeline: '', budget: '', description: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  function getInputStyle(field: string) {
    return {
      ...UNDERLINE_INPUT,
      borderBottomColor: focused === field ? '#22C55E' : 'rgba(255,255,255,0.12)',
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.project_type || !form.timeline || !form.budget) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStatus('loading');

    try {
      if (supabase) {
        const { error: sbError } = await supabase.from('hire_requests').insert([form]);
        if (sbError) throw sbError;
      } else {
        const subject = encodeURIComponent(`Hire Request from ${form.name}`);
        const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nRole: ${form.role}\nProject: ${form.project_type}\nTimeline: ${form.timeline}\nBudget: ${form.budget}\n\n${form.description}`);
        window.open(`mailto:sandeepkumarbollavaram@gmail.com?subject=${subject}&body=${body}`);
      }
      setStatus('success');
    } catch (err: unknown) {
      console.error(err);
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={32} style={{ color: '#22C55E' }} />
          </div>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f8fafc', marginBottom: '12px', letterSpacing: '-0.03em' }}>Request Received!</h2>
          <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '32px' }}>
            Thanks <span style={{ color: '#e2e8f0' }}>{form.name}</span>! I&apos;ll review your project and get back to you within 48 hours.
          </p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', borderRadius: '12px', background: '#22C55E', color: '#030712', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712' }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px clamp(24px, 6vw, 80px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#fff', textDecoration: 'none', letterSpacing: '-0.03em' }}>
            Bollavaram<span style={{ color: '#22C55E' }}>.</span>
          </Link>
          <Link href="/contact" style={{ fontSize: '0.82rem', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#64748b')}
          >
            General Contact →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: isMobile ? '40px' : '80px', alignItems: 'start' }}>

        {/* Left — info */}
        <div style={{ position: 'sticky', top: '40px' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#475569', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '40px', transition: 'color 0.2s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#94a3b8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#475569')}
          >
            <ArrowLeft size={14} /> Portfolio
          </Link>

          <p style={{ color: '#22C55E', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Hire Me</p>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem, 4vw, 3rem)', letterSpacing: '-0.04em', color: '#f8fafc', lineHeight: 1.1, marginBottom: '20px' }}>
            Let&apos;s work on<br />
            <span style={{ background: 'linear-gradient(120deg, #22C55E, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              your project.
            </span>
          </h1>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '40px' }}>
            I&apos;m available for internships, freelance projects, research collaborations, and part-time work. Fill out the form and I&apos;ll respond within 48 hours.
          </p>

          {/* What I do — hidden on mobile */}
          <div style={{ display: isMobile ? 'none' : 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'AI / Computer Vision', color: '#22C55E', desc: 'YOLOv8, MediaPipe, TensorFlow.js, OpenCV' },
              { label: 'Robotics / Embedded', color: '#F59E0B', desc: 'Raspberry Pi, ESP32, Arduino, Flutter' },
              { label: 'Full-Stack Web', color: '#3B82F6', desc: 'Next.js, TypeScript, Firebase, Supabase' },
              { label: 'Data Science', color: '#8B5CF6', desc: 'Python, R, Jupyter, Random Forest, ARIMA' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, marginTop: '6px', flexShrink: 0, boxShadow: `0 0 6px ${item.color}` }} />
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600, marginBottom: '2px' }}>{item.label}</p>
                  <p style={{ color: '#475569', fontSize: '0.78rem' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Name + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Full Name <span style={{ color: '#22C55E' }}>*</span>
              </label>
              <input type="text" required suppressHydrationWarning value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} style={getInputStyle('name')} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Email <span style={{ color: '#22C55E' }}>*</span>
              </label>
              <input type="email" required suppressHydrationWarning value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} style={getInputStyle('email')} />
            </div>
          </div>

          {/* Company + Role */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Company / Org</label>
              <input type="text" suppressHydrationWarning value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} onFocus={() => setFocused('company')} onBlur={() => setFocused(null)} style={getInputStyle('company')} placeholder="Optional" />
            </div>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Your Role</label>
              <input type="text" suppressHydrationWarning value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} onFocus={() => setFocused('role')} onBlur={() => setFocused(null)} style={getInputStyle('role')} placeholder="e.g. Startup founder, Researcher…" />
            </div>
          </div>

          {/* Project type */}
          <div>
            <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Project Type <span style={{ color: '#22C55E' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <select required value={form.project_type} onChange={e => setForm(f => ({ ...f, project_type: e.target.value }))} onFocus={() => setFocused('project_type')} onBlur={() => setFocused(null)}
                style={{ ...getInputStyle('project_type'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: '28px', color: form.project_type ? '#f1f5f9' : '#334155' }}>
                <option value="" disabled style={{ background: '#0f172a' }}>Select type</option>
                {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: '#0f172a' }}>{t}</option>)}
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Timeline + Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Timeline <span style={{ color: '#22C55E' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select required value={form.timeline} onChange={e => setForm(f => ({ ...f, timeline: e.target.value }))} onFocus={() => setFocused('timeline')} onBlur={() => setFocused(null)}
                  style={{ ...getInputStyle('timeline'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: '28px', color: form.timeline ? '#f1f5f9' : '#334155' }}>
                  <option value="" disabled style={{ background: '#0f172a' }}>Select</option>
                  {TIMELINES.map(t => <option key={t} value={t} style={{ background: '#0f172a' }}>{t}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                Budget <span style={{ color: '#22C55E' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <select required value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)}
                  style={{ ...getInputStyle('budget'), appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer', paddingRight: '28px', color: form.budget ? '#f1f5f9' : '#334155' }}>
                  <option value="" disabled style={{ background: '#0f172a' }}>Select</option>
                  {BUDGETS.map(b => <option key={b} value={b} style={{ background: '#0f172a' }}>{b}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
              Project Description <span style={{ color: '#22C55E' }}>*</span>
            </label>
            <textarea required rows={6} maxLength={2000} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} onFocus={() => setFocused('description')} onBlur={() => setFocused(null)}
              style={{ ...getInputStyle('description'), resize: 'none' }} placeholder="Describe what you need, the problem you want solved, and any specific requirements…" />
            <div style={{ textAlign: 'right', color: '#334155', fontSize: '0.7rem', marginTop: '4px' }}>{form.description.length}/2000</div>
          </div>

          {error && (
            <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '10px 14px' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            suppressHydrationWarning
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '14px 40px', borderRadius: '12px', alignSelf: 'flex-start',
              background: status === 'loading' ? 'rgba(34,197,94,0.6)' : '#22C55E',
              color: '#030712', fontWeight: 700, fontSize: '0.9rem', border: 'none',
              cursor: status === 'loading' ? 'default' : 'pointer', transition: 'all 0.2s',
              boxShadow: '0 0 24px rgba(34,197,94,0.2)', fontFamily: 'Space Grotesk, sans-serif',
            }}
          >
            {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : 'Submit Request →'}
          </button>
        </form>
      </div>
    </div>
  );
}
