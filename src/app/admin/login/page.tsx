'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2, Mail, CheckCircle, ShieldAlert } from 'lucide-react';

const ADMIN_EMAIL = 'bollavaramsandeep@gmail.com';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [errMsg, setErrMsg] = useState('');
  const [checking, setChecking] = useState(true);

  // If already logged in with the right email, go straight to admin
  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.email === ADMIN_EMAIL) router.replace('/admin');
      else setChecking(false);
    });
  }, [router]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setStatus('error');
      setErrMsg('Supabase is not configured. Add credentials to .env.local first.');
      return;
    }
    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setStatus('error');
      setErrMsg('Access restricted. Only the portfolio owner can log in.');
      return;
    }
    setStatus('loading');
    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/admin` },
    });
    if (error) {
      setStatus('error');
      setErrMsg(error.message);
    } else {
      setStatus('sent');
    }
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={24} style={{ color: '#22C55E', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {/* Subtle glow */}
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '400px', background: 'rgba(34,197,94,0.04)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldAlert size={24} style={{ color: '#22C55E' }} />
          </div>
          <h1 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#f8fafc', letterSpacing: '-0.03em', marginBottom: '4px' }}>
            Admin Access
          </h1>
          <p style={{ color: '#475569', fontSize: '0.85rem' }}>Portfolio dashboard — restricted access</p>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px', backdropFilter: 'blur(20px)' }}>
          {status === 'sent' ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <CheckCircle size={26} style={{ color: '#22C55E' }} />
              </div>
              <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, color: '#f1f5f9', fontSize: '1.1rem', marginBottom: '10px' }}>Check your inbox</h2>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.65 }}>
                A magic link has been sent to<br />
                <span style={{ color: '#e2e8f0' }}>{email}</span>.<br />
                Click the link to log in.
              </p>
              <button
                onClick={() => setStatus('idle')}
                style={{ marginTop: '24px', color: '#475569', fontSize: '0.8rem', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Send again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', color: '#475569', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={15} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#334155' }} />
                  <input
                    type="email"
                    required
                    suppressHydrationWarning
                    value={email}
                    onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrMsg(''); }}
                    placeholder="bollavaramsandeep@gmail.com"
                    style={{
                      width: '100%',
                      background: 'rgba(15,23,42,0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      padding: '12px 14px 12px 40px',
                      color: '#f1f5f9',
                      fontSize: '0.9rem',
                      fontFamily: 'Space Grotesk, sans-serif',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>
              </div>

              {status === 'error' && (
                <p style={{ color: '#f87171', fontSize: '0.82rem', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '10px 14px' }}>
                  {errMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                suppressHydrationWarning
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '13px 24px', borderRadius: '12px',
                  background: status === 'loading' ? 'rgba(34,197,94,0.6)' : '#22C55E',
                  color: '#030712', fontWeight: 700, fontSize: '0.9rem',
                  border: 'none', cursor: status === 'loading' ? 'default' : 'pointer',
                  fontFamily: 'Space Grotesk, sans-serif', transition: 'all 0.2s',
                }}
              >
                {status === 'loading' ? <><Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} /> Sending…</> : 'Send Magic Link →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
