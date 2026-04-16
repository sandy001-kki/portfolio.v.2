'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Mail, Users, CheckCircle2, Loader2 } from 'lucide-react';

interface VisitorStats { week: number; today: number; total: number; }

/* ── Small floating counter chip shown in Hero ── */
export function VisitorCountChip() {
  const [stats, setStats] = useState<VisitorStats | null>(null);

  useEffect(() => {
    fetch('/api/visitor-count')
      .then(r => r.json())
      .then((d: VisitorStats) => setStats(d))
      .catch(() => {});
  }, []);

  if (!stats || stats.week === 0) return null;

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '7px',
      padding: '5px 14px', borderRadius: '9999px',
      background: '#FFFFFF',
      border: '1px solid #E0DFE4',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
      fontSize: '0.78rem', color: '#4B5563',
      fontWeight: 500,
    }}>
      <Users size={13} style={{ color: '#6366F1' }} />
      <span>
        <strong style={{ color: '#6366F1' }}>{stats.week.toLocaleString()}</strong>
        {' '}developers visited this week
      </span>
    </div>
  );
}

/* ── Bottom-right email capture banner ── */
export default function VisitorEmailCapture() {
  const [show, setShow]         = useState(false);
  const [dismissed, setDismiss] = useState(false);
  const [email, setEmail]       = useState('');
  const [state, setState]       = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [stats, setStats]       = useState<VisitorStats | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* show after 20 seconds, only once per session */
  useEffect(() => {
    if (sessionStorage.getItem('ve_dismissed')) return;
    const t = setTimeout(() => setShow(true), 20000);
    return () => clearTimeout(t);
  }, []);

  /* fetch stats */
  useEffect(() => {
    fetch('/api/visitor-count')
      .then(r => r.json())
      .then((d: VisitorStats) => setStats(d))
      .catch(() => {});
  }, []);

  function dismiss() {
    setDismiss(true);
    sessionStorage.setItem('ve_dismissed', '1');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState('loading');
    try {
      const res = await fetch('/api/visitor-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'banner' }),
      });
      const data = await res.json();
      if (data.ok) {
        setState('done');
        sessionStorage.setItem('ve_dismissed', '1');
        setTimeout(dismiss, 2800);
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  }

  if (!show || dismissed) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 500,
        width: 'min(340px, calc(100vw - 48px))',
        background: '#FFFFFF',
        border: '1px solid #E0DFE4',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
        animation: 'modalIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
      }}
    >
      {/* Close */}
      <button
        onClick={dismiss}
        style={{
          position: 'absolute', top: 12, right: 12,
          width: 26, height: 26, borderRadius: '7px',
          border: '1px solid #E0DFE4', background: '#FAF9F6',
          color: '#9CA3AF', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#F3F2EF')}
        onMouseLeave={e => (e.currentTarget.style.background = '#FAF9F6')}
      >
        <X size={13} />
      </button>

      {state === 'done' ? (
        /* Success state */
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <CheckCircle2 size={32} style={{ color: '#059669', margin: '0 auto 10px', display: 'block' }} />
          <p style={{ fontWeight: 700, color: '#0F0E14', fontSize: '0.92rem', marginBottom: '4px' }}>
            You&apos;re on the list!
          </p>
          <p style={{ color: '#6B7280', fontSize: '0.8rem' }}>
            I&apos;ll keep you updated on new projects.
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px', paddingRight: '20px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px', flexShrink: 0,
              background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Mail size={16} style={{ color: '#6366F1' }} />
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#0F0E14', fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '3px' }}>
                Stay in the loop
              </p>
              <p style={{ color: '#6B7280', fontSize: '0.78rem', lineHeight: 1.5 }}>
                Get notified when I ship new projects or open to work.
              </p>
            </div>
          </div>

          {/* Stats badge */}
          {stats && stats.week > 0 && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '9999px', padding: '3px 10px',
              fontSize: '0.72rem', color: '#6366F1', fontWeight: 600,
              marginBottom: '14px',
            }}>
              <Users size={11} />
              {stats.week.toLocaleString()} developers this week
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              ref={inputRef}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '9px',
                border: state === 'error' ? '1px solid rgba(220,38,38,0.5)' : '1px solid #E0DFE4',
                background: '#FAF9F6',
                fontSize: '0.85rem',
                color: '#0F0E14',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                boxSizing: 'border-box',
                transition: 'border-color 0.18s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.40)')}
              onBlur={e => (e.currentTarget.style.borderColor = state === 'error' ? 'rgba(220,38,38,0.5)' : '#E0DFE4')}
            />
            {state === 'error' && (
              <p style={{ color: '#DC2626', fontSize: '0.72rem', margin: '-4px 0 0 2px' }}>
                Something went wrong. Try again.
              </p>
            )}
            <button
              type="submit"
              disabled={state === 'loading'}
              style={{
                padding: '10px',
                borderRadius: '9px',
                background: '#6366F1',
                border: '1px solid #6366F1',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: state === 'loading' ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                opacity: state === 'loading' ? 0.75 : 1,
                transition: 'background 0.18s',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => { if (state !== 'loading') (e.currentTarget.style.background = '#4F46E5'); }}
              onMouseLeave={e => { (e.currentTarget.style.background = '#6366F1'); }}
            >
              {state === 'loading'
                ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Saving…</>
                : 'Notify Me'}
            </button>
          </form>

          <p style={{ color: '#C8C7CC', fontSize: '0.68rem', textAlign: 'center', marginTop: '8px' }}>
            No spam. Unsubscribe any time.
          </p>
        </>
      )}
    </div>
  );
}
