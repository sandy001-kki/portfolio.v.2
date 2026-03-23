'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import AnimatedSection from './AnimatedSection';
import { SKILL_GROUPS, TECH_STACK } from '@/lib/skills';

/* ── Counter hook ─────────────────────────────────── */
function useCounter(target: number, active: boolean, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const start = performance.now();
      const duration = 900;
      function step(now: number) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(eased * target));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [active, target, delay]);
  return val;
}

/* ── Skill row (each skill has its own counter) ───── */
function SkillItem({ name, level, color, visible, delay }: {
  name: string; level: number; color: string; visible: boolean; delay: number;
}) {
  const [barOn, setBarOn] = useState(false);
  const counted = useCounter(level, visible, delay);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setBarOn(true), delay);
    return () => clearTimeout(t);
  }, [visible, delay]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px', alignItems: 'center' }}>
        <span style={{ color: '#cbd5e1', fontSize: '0.92rem', fontWeight: 500 }}>{name}</span>
        <span style={{ color: visible ? color : '#475569', fontSize: '0.72rem', fontFamily: 'monospace', fontWeight: 700, transition: 'color 0.5s' }}>
          {counted}%
        </span>
      </div>
      {/* Bar */}
      <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '99px', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          width: barOn ? `${level}%` : '0%',
          background: `linear-gradient(90deg, ${color}bb, ${color})`,
          transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: barOn ? `0 0 10px ${color}80` : 'none',
          position: 'relative',
        }}>
          {barOn && (
            <div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '7px', height: '7px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Skill card ───────────────────────────────────── */
function SkillCard({ group, index, visible }: { group: typeof SKILL_GROUPS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const dirs = ['up', 'left', 'right', 'up'] as const;

  return (
    <AnimatedSection delay={index * 110} direction={dirs[index % 4]}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '24px', height: '100%',
          background: hovered ? 'rgba(30,41,59,0.8)' : 'rgba(15,23,42,0.65)',
          backdropFilter: 'blur(20px)',
          border: hovered ? `1px solid ${group.color}35` : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '18px',
          transition: 'all 0.35s ease',
          transform: hovered ? 'translateY(-6px) scale(1.01)' : 'translateY(0) scale(1)',
          boxShadow: hovered ? `0 24px 48px rgba(0,0,0,0.3), 0 0 30px ${group.color}14` : 'none',
          cursor: 'default',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: group.color,
            boxShadow: `0 0 ${hovered ? '16px' : '8px'} ${group.color}`,
            transition: 'box-shadow 0.3s',
            flexShrink: 0,
          }} />
          <h3 style={{
            fontFamily: 'Archivo, sans-serif', fontWeight: 800,
            color: hovered ? group.color : '#f1f5f9',
            fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'color 0.3s',
          }}>
            {group.category}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {group.skills.map((skill, si) => (
            <SkillItem
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={group.color}
              visible={visible}
              delay={index * 120 + si * 70}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ── Tech cloud item ──────────────────────────────── */
function TechItem({ tech, index }: { tech: string; index: number }) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setShow(true), index * 22); observer.disconnect(); } },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '7px 14px', borderRadius: '8px',
        background: hovered ? 'rgba(34,197,94,0.09)' : 'rgba(30,41,59,0.7)',
        border: hovered ? '1px solid rgba(34,197,94,0.35)' : '1px solid rgba(255,255,255,0.06)',
        color: hovered ? '#fff' : '#94a3b8',
        fontSize: '0.82rem', fontWeight: 500,
        transition: 'all 0.2s ease',
        cursor: 'default',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.92)',
        display: 'inline-block',
      }}
    >
      {tech}
    </span>
  );
}

/* ── Tech typewriter ─────────────────────────────── */
const TECH_PHRASES = [
  'Python • OpenCV • YOLOv8',
  'Next.js • TypeScript • Tailwind',
  'Raspberry Pi • Arduino • ESP32',
  'TensorFlow.js • face-api.js',
  'R • Shiny • Random Forest',
  'Flutter • Dart • Firebase',
  'Three.js • WebGL • React',
  'Docker • Kubernetes (K8s) • Linux',
  'Supabase • PostgreSQL • Node.js',
  'MediaPipe • OpenCV • NumPy',
];

function TechTypewriter() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const idx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const [active, setActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Start only when visible
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = spanRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;

    function type() {
      const word = TECH_PHRASES[idx.current];
      if (!deleting.current) {
        el!.textContent = word.slice(0, ++charIdx.current);
        if (charIdx.current === word.length) {
          deleting.current = true;
          timer = setTimeout(type, 2000);
          return;
        }
      } else {
        el!.textContent = word.slice(0, --charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          idx.current = (idx.current + 1) % TECH_PHRASES.length;
        }
      }
      timer = setTimeout(type, deleting.current ? 38 : 72);
    }

    timer = setTimeout(type, 400);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div
      ref={sectionRef}
      style={{
        textAlign: 'center',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        minHeight: '32px',
      }}
    >
      <span style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}>I work with</span>
      <span
        ref={spanRef}
        style={{
          color: '#22C55E',
          fontSize: '0.95rem',
          fontWeight: 600,
          fontFamily: 'Space Grotesk, monospace',
          letterSpacing: '0.02em',
          minWidth: '4px',
        }}
      />
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '16px',
          background: '#22C55E',
          borderRadius: '2px',
          boxShadow: '0 0 6px #22C55E',
          flexShrink: 0,
        }}
        className="cursor-blink"
      />
    </div>
  );
}

/* ── Main section ─────────────────────────────────── */
export default function Skills() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setup = useCallback(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return obs;
  }, []);

  useEffect(() => {
    const obs = setup();
    return () => obs.disconnect();
  }, [setup]);

  return (
    <section id="skills" style={{ padding: '112px 24px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', right: 0, width: '400px', height: '400px', background: 'rgba(59,130,246,0.03)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', transform: 'translateY(-50%)' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ color: '#22C55E', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Skills</p>
            <h2 className="section-title" style={{ color: '#f8fafc' }}>
              Tech Stack &amp; <span className="gradient-text">Expertise</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* Skill cards */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '20px', marginBottom: '28px' }}>
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} visible={visible} />
          ))}
        </div>

        {/* Tech cloud */}
        <AnimatedSection delay={300}>
          <div style={{ background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '32px' }}>
            <TechTypewriter />
            <p style={{ color: '#334155', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>
              All Technologies
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {TECH_STACK.map((tech, i) => (
                <TechItem key={tech} tech={tech} index={i} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
