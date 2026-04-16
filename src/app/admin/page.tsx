'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Loader2, LogOut, Users, Mail, Briefcase, TrendingUp,
  RefreshCw, ChevronDown, ChevronUp, Shield,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'bollavaramsandeep@gmail.com';

interface PageView { id: string; created_at: string; path: string; referrer?: string; user_agent?: string; ip?: string; }
interface VisitorEmail { id: string; email: string; source: string; user_agent?: string; referrer?: string; created_at: string; }
interface ContactMsg {
  id: string; created_at: string; first_name: string; last_name: string;
  email: string; organization: string; region: string; industry: string; message: string;
}
interface HireReq {
  id: string; created_at: string; name: string; email: string;
  company: string; role: string; project_type: string;
  timeline: string; budget: string; description: string;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function shortReferrer(referrer?: string) {
  if (!referrer) return 'Direct';
  try {
    return new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return referrer;
  }
}

function shortUserAgent(userAgent?: string) {
  if (!userAgent) return 'Unknown';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return userAgent.length > 28 ? `${userAgent.slice(0, 28)}...` : userAgent;
}

function todayCount(views: PageView[]) {
  const today = new Date().toDateString();
  return views.filter(v => new Date(v.created_at).toDateString() === today).length;
}

/* ── Expandable table row ── */
function ExpandRow({ children, extra }: { children: React.ReactNode; extra: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr
        onClick={() => setOpen(o => !o)}
        style={{ cursor: 'pointer', borderBottom: open ? 'none' : '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        {children}
        <td style={{ padding: '14px 12px', color: '#475569' }}>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </td>
      </tr>
      {open && (
        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <td colSpan={99} style={{ padding: '0 16px 16px', background: 'rgba(15,23,42,0.4)' }}>
            {extra}
          </td>
        </tr>
      )}
    </>
  );
}

/* ── Stat card ── */
function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: number | string; sub?: string; color: string }) {
  return (
    <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${color}14`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#f8fafc', lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</p>
        <p style={{ color: '#475569', fontSize: '0.82rem', marginTop: '4px' }}>{label}</p>
        {sub && <p style={{ color: color, fontSize: '0.75rem', marginTop: '2px', fontWeight: 600 }}>{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const [views, setViews] = useState<PageView[]>([]);
  const [visitorEmails, setVisitorEmails] = useState<VisitorEmail[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [hires, setHires] = useState<HireReq[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'contact' | 'hire' | 'emails'>('emails');

  /* ── Auth check ── */
  useEffect(() => {
    if (!supabase) { router.replace('/admin/login'); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user.email === ADMIN_EMAIL) setAuthed(true);
      else router.replace('/admin/login');
      setAuthChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session || session.user.email !== ADMIN_EMAIL) router.replace('/admin/login');
    });
    return () => subscription.unsubscribe();
  }, [router]);

  /* ── Fetch data ── */
  const fetchAll = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    setEmailError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const emailPromise = session?.access_token
        ? fetch('/api/admin/visitor-emails', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        }).then(async response => {
          const payload = await response.json();
          if (!response.ok || !payload.ok) {
            throw new Error(payload.error || 'Unable to load visitor emails.');
          }
          return payload.emails as VisitorEmail[];
        })
        : Promise.resolve<VisitorEmail[]>([]);

      const [vRes, cRes, hRes, veRes] = await Promise.all([
        supabase.from('page_views').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('hire_requests').select('*').order('created_at', { ascending: false }),
        emailPromise,
      ]);

      if (vRes.data) setViews(vRes.data as PageView[]);
      if (cRes.data) setContacts(cRes.data as ContactMsg[]);
      if (hRes.data) setHires(hRes.data as HireReq[]);
      setVisitorEmails(veRes);

      if (vRes.error || cRes.error || hRes.error) {
        console.error('Admin dashboard query error', {
          pageViews: vRes.error?.message,
          contacts: cRes.error?.message,
          hires: hRes.error?.message,
        });
      }

      if (!session?.access_token) {
        setEmailError('Admin session expired. Sign in again to view visitor emails.');
        setVisitorEmails([]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load visitor emails.';
      setEmailError(message);
      setVisitorEmails([]);
      console.error('Visitor email load error', message);
    } finally {
      setLoading(false);
      setLastRefresh(new Date());
    }
  }, []);

  useEffect(() => {
    if (authed) fetchAll();
  }, [authed, fetchAll]);

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  /* ── Path breakdown ── */
  const pathCounts = views.reduce<Record<string, number>>((acc, v) => {
    acc[v.path] = (acc[v.path] || 0) + 1;
    return acc;
  }, {});
  const topPaths = Object.entries(pathCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);

  if (authChecking) {
    return (
      <div style={{ minHeight: '100vh', background: '#030712', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={28} style={{ color: '#22C55E', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!authed) return null;

  const TH: React.CSSProperties = { padding: '10px 12px', color: '#334155', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.06)', whiteSpace: 'nowrap' };
  const TD: React.CSSProperties = { padding: '14px 12px', color: '#94a3b8', fontSize: '0.82rem', verticalAlign: 'top' };

  return (
    <div style={{ minHeight: '100vh', background: '#030712', color: '#f1f5f9', fontFamily: 'Space Grotesk, sans-serif' }}>

      {/* ── Top bar ── */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px clamp(20px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={15} style={{ color: '#22C55E' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 800, fontSize: '0.95rem', color: '#f8fafc', letterSpacing: '-0.02em' }}>
              Admin Dashboard
            </p>
            <p style={{ color: '#334155', fontSize: '0.72rem' }}>Bollavaram Portfolio</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {lastRefresh && (
            <span style={{ color: '#334155', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {loading ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite', color: '#22C55E' }} /> : null}
              {lastRefresh.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          <button
            onClick={fetchAll}
            disabled={loading}
            suppressHydrationWarning
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '9px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <RefreshCw size={12} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} /> Refresh
          </button>
          <button
            onClick={signOut}
            suppressHydrationWarning
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', borderRadius: '9px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.15)', color: '#f87171', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 4vw, 48px)' }}>

        {/* ── Stat cards ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '16px', marginBottom: '40px' }}>
          <StatCard icon={TrendingUp} label="Total Page Views" value={views.length} sub={`${todayCount(views)} today`} color="#22C55E" />
          <StatCard icon={Users} label="Unique Paths Hit" value={Object.keys(pathCounts).length} color="#3B82F6" />
          <StatCard icon={Mail} label="Visitor Emails" value={visitorEmails.length} sub="subscribed" color="#6366F1" />
          <StatCard icon={Mail} label="Contact Messages" value={contacts.length} color="#8B5CF6" />
          <StatCard icon={Briefcase} label="Hire Requests" value={hires.length} color="#F59E0B" />
        </div>

        {/* ── Page view breakdown ── */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#f1f5f9', marginBottom: '16px' }}>
            Traffic by Page
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {topPaths.length === 0 && <p style={{ color: '#334155', fontSize: '0.82rem' }}>No visits recorded yet.</p>}
            {topPaths.map(([path, count]) => {
              const pct = views.length ? Math.round((count / views.length) * 100) : 0;
              return (
                <div key={path} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.82rem', width: '120px', flexShrink: 0, fontFamily: 'monospace' }}>{path}</span>
                  <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #22C55E, #3B82F6)', borderRadius: '99px', transition: 'width 0.6s ease' }} />
                  </div>
                  <span style={{ color: '#475569', fontSize: '0.75rem', width: '60px', textAlign: 'right', flexShrink: 0 }}>{count} · {pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Forms tab ── */}
        <div style={{ background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Tab bar */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {([
              { key: 'emails', label: 'Visitor Emails', count: visitorEmails.length, color: '#6366F1' },
              { key: 'contact', label: 'Contact Messages', count: contacts.length, color: '#8B5CF6' },
              { key: 'hire', label: 'Hire Requests', count: hires.length, color: '#F59E0B' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                suppressHydrationWarning
                style={{
                  padding: '14px 24px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: 'none',
                  background: 'transparent',
                  color: activeTab === tab.key ? tab.color : '#475569',
                  borderBottom: activeTab === tab.key ? `2px solid ${tab.color}` : '2px solid transparent',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {tab.label}
                <span style={{ background: activeTab === tab.key ? `${tab.color}18` : 'rgba(255,255,255,0.04)', color: activeTab === tab.key ? tab.color : '#334155', fontSize: '0.7rem', padding: '1px 7px', borderRadius: '99px', fontWeight: 700 }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* ── Visitor emails table ── */}
          {activeTab === 'emails' && (
            <div style={{ overflowX: 'auto' }}>
              {emailError && (
                <div style={{ margin: '16px', padding: '12px 14px', borderRadius: '12px', background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', fontSize: '0.82rem' }}>
                  {emailError}
                </div>
              )}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={TH}>Email</th>
                    <th style={TH}>Source</th>
                    <th style={TH}>Referrer</th>
                    <th style={TH}>User Agent</th>
                    <th style={TH}>Captured</th>
                    <th style={{ ...TH, width: '32px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {visitorEmails.length === 0 && (
                    <tr><td colSpan={6} style={{ ...TD, textAlign: 'center', padding: '40px', color: '#334155' }}>{emailError ? 'Visitor emails could not be loaded.' : 'No visitor emails captured yet.'}</td></tr>
                  )}
                  {visitorEmails.map(email => (
                    <ExpandRow
                      key={email.id}
                      extra={(
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', padding: '16px', background: 'rgba(99,102,241,0.05)', borderRadius: '10px', marginTop: '4px' }}>
                          <div>
                            <p style={{ color: '#6366F1', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>Referrer URL</p>
                            <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6, wordBreak: 'break-word' }}>{email.referrer || 'Direct visit'}</p>
                          </div>
                          <div>
                            <p style={{ color: '#6366F1', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '6px' }}>User Agent</p>
                            <p style={{ color: '#cbd5e1', fontSize: '0.84rem', lineHeight: 1.6, wordBreak: 'break-word' }}>{email.user_agent || 'Unavailable'}</p>
                          </div>
                        </div>
                      )}
                    >
                      <td style={TD}>
                        <a href={`mailto:${email.email}`} style={{ color: '#818CF8', textDecoration: 'none', fontWeight: 600 }}>
                          {email.email}
                        </a>
                      </td>
                      <td style={TD}>
                        <span style={{ background: 'rgba(99,102,241,0.12)', color: '#A5B4FC', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '999px', fontWeight: 600 }}>
                          {email.source || 'banner'}
                        </span>
                      </td>
                      <td style={TD}>{shortReferrer(email.referrer)}</td>
                      <td style={TD}>{shortUserAgent(email.user_agent)}</td>
                      <td style={{ ...TD, whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmt(email.created_at)}</td>
                    </ExpandRow>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Contact table ── */}
          {activeTab === 'contact' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={TH}>Name</th>
                    <th style={TH}>Email</th>
                    <th style={TH}>Organization</th>
                    <th style={TH}>Region</th>
                    <th style={TH}>Industry</th>
                    <th style={TH}>Date</th>
                    <th style={{ ...TH, width: '32px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 && (
                    <tr><td colSpan={7} style={{ ...TD, textAlign: 'center', padding: '40px', color: '#334155' }}>No contact messages yet.</td></tr>
                  )}
                  {contacts.map(c => (
                    <ExpandRow
                      key={c.id}
                      extra={
                        <div style={{ padding: '16px', background: 'rgba(139,92,246,0.04)', borderRadius: '10px', marginTop: '4px' }}>
                          <p style={{ color: '#475569', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Message</p>
                          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{c.message || '—'}</p>
                        </div>
                      }
                    >
                      <td style={TD}><span style={{ color: '#e2e8f0', fontWeight: 600 }}>{c.first_name} {c.last_name}</span></td>
                      <td style={TD}><a href={`mailto:${c.email}`} style={{ color: '#8B5CF6', textDecoration: 'none' }}>{c.email}</a></td>
                      <td style={TD}>{c.organization || '—'}</td>
                      <td style={TD}>{c.region || '—'}</td>
                      <td style={TD}>{c.industry || '—'}</td>
                      <td style={{ ...TD, whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmtDate(c.created_at)}</td>
                    </ExpandRow>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Hire table ── */}
          {activeTab === 'hire' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={TH}>Name</th>
                    <th style={TH}>Email</th>
                    <th style={TH}>Company</th>
                    <th style={TH}>Project Type</th>
                    <th style={TH}>Timeline</th>
                    <th style={TH}>Budget</th>
                    <th style={TH}>Date</th>
                    <th style={{ ...TH, width: '32px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {hires.length === 0 && (
                    <tr><td colSpan={8} style={{ ...TD, textAlign: 'center', padding: '40px', color: '#334155' }}>No hire requests yet.</td></tr>
                  )}
                  {hires.map(h => (
                    <ExpandRow
                      key={h.id}
                      extra={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px', background: 'rgba(245,158,11,0.04)', borderRadius: '10px', marginTop: '4px' }}>
                          {h.role && (
                            <div>
                              <p style={{ color: '#475569', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px' }}>Role</p>
                              <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{h.role}</p>
                            </div>
                          )}
                          <div>
                            <p style={{ color: '#475569', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '4px' }}>Description</p>
                            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{h.description}</p>
                          </div>
                        </div>
                      }
                    >
                      <td style={TD}><span style={{ color: '#e2e8f0', fontWeight: 600 }}>{h.name}</span></td>
                      <td style={TD}><a href={`mailto:${h.email}`} style={{ color: '#F59E0B', textDecoration: 'none' }}>{h.email}</a></td>
                      <td style={TD}>{h.company || '—'}</td>
                      <td style={TD}><span style={{ background: 'rgba(34,197,94,0.08)', color: '#4ade80', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{h.project_type}</span></td>
                      <td style={TD}>{h.timeline}</td>
                      <td style={TD}><span style={{ background: 'rgba(245,158,11,0.08)', color: '#fbbf24', fontSize: '0.75rem', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>{h.budget}</span></td>
                      <td style={{ ...TD, whiteSpace: 'nowrap', fontSize: '0.75rem' }}>{fmtDate(h.created_at)}</td>
                    </ExpandRow>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <p style={{ color: '#1e293b', fontSize: '0.72rem', textAlign: 'center', marginTop: '32px' }}>
          Bollavaram Admin · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
