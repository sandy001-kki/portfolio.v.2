'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import AnimatedSection from './AnimatedSection';
import { SKILL_GROUPS, TECH_STACK } from '@/lib/skills';
import SkillsRadar from './SkillsRadar';

/* ── Counter hook ── */
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

/* ── Skill row ── */
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
        <span style={{ color: '#374151', fontSize: '0.88rem', fontWeight: 500 }}>{name}</span>
        <span style={{
          color: visible ? color : '#D1D5DB',
          fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700, transition: 'color 0.5s',
        }}>
          {counted}%
        </span>
      </div>
      <div style={{
        height: '4px', background: '#F3F2EF',
        borderRadius: '99px', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          width: barOn ? `${level}%` : '0%',
          background: color,
          transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1)',
          position: 'relative',
        }}>
          {barOn && (
            <div style={{
              position: 'absolute', right: 0, top: '50%',
              transform: 'translateY(-50%)',
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#FFFFFF',
              border: `2px solid ${color}`,
              boxShadow: `0 0 4px ${color}60`,
            }} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Skill card ── */
function SkillCard({ group, index, visible }: { group: typeof SKILL_GROUPS[0]; index: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);
  const dirs = ['up', 'left', 'right', 'up'] as const;

  return (
    <AnimatedSection delay={index * 110} direction={dirs[index % 4]}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '24px',
          height: '100%',
          background: hovered ? '#F8F7FF' : '#FFFFFF',
          border: hovered ? `1px solid ${group.color}35` : '1px solid #EBEBEB',
          borderRadius: '14px',
          transition: 'all 0.28s ease',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered
            ? `0 16px 40px rgba(0,0,0,0.08), 0 0 0 1px ${group.color}20`
            : '0 1px 4px rgba(0,0,0,0.05)',
          cursor: 'default',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '10px', height: '10px', borderRadius: '50%',
            background: group.color,
            flexShrink: 0,
          }} />
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            color: hovered ? group.color : '#0F0E14',
            fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'color 0.25s',
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

/* ── Tech cloud item ── */
function TechItem({ tech, index }: { tech: string; index: number }) {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setShow(true), index * 20); observer.disconnect(); } },
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
        padding: '6px 13px', borderRadius: '8px',
        background: hovered ? 'rgba(99,102,241,0.08)' : '#F3F2EF',
        border: hovered ? '1px solid rgba(99,102,241,0.28)' : '1px solid #E0DFE4',
        color: hovered ? '#6366F1' : '#4B5563',
        fontSize: '0.8rem', fontWeight: 500,
        fontFamily: 'JetBrains Mono, monospace',
        transition: 'all 0.18s ease',
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

/* ── Tech typewriter ── */
const TECH_PHRASES = [
  'Python • OpenCV • YOLOv8',
  'Next.js • TypeScript • Tailwind',
  'Raspberry Pi • Arduino • ESP32',
  'TensorFlow.js • face-api.js',
  'R • Shiny • Random Forest',
  'Flutter • Dart • Firebase',
  'Three.js • WebGL • React',
  'Go • Kubernetes • Helm',
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
        textAlign: 'center', marginBottom: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '6px', minHeight: '32px',
      }}
    >
      <span style={{ color: '#6B7280', fontSize: '0.88rem', fontWeight: 500 }}>I work with</span>
      <span
        ref={spanRef}
        style={{
          color: '#6366F1',
          fontSize: '0.9rem', fontWeight: 700,
          fontFamily: 'JetBrains Mono, monospace',
          letterSpacing: '0.02em', minWidth: '4px',
        }}
      />
      <span
        style={{
          display: 'inline-block', width: '2px', height: '16px',
          background: '#6366F1', borderRadius: '2px', flexShrink: 0,
        }}
        className="cursor-blink"
      />
    </div>
  );
}

/* ── Main ── */
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
    <section id="skills" style={{ padding: '112px 24px', background: '#FAF9F6', position: 'relative' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{
              color: '#6366F1', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '14px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Skills
            </p>
            <h2 className="section-title">
              Tech Stack &amp; <span style={{ color: '#6366F1' }}>Expertise</span>
            </h2>
          </div>
        </AnimatedSection>

        {/* ── Radar chart ── */}
        <AnimatedSection delay={80}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EBEBEB',
            borderRadius: '20px',
            padding: '40px 32px 32px',
            marginBottom: '32px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <p style={{
                color: '#9CA3AF', fontSize: '0.7rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                fontFamily: 'JetBrains Mono, monospace', marginBottom: '6px',
              }}>
                Domain Proficiency
              </p>
              <h3 style={{
                fontFamily: 'Inter, sans-serif', fontWeight: 700,
                fontSize: '1.05rem', color: '#0F0E14', letterSpacing: '-0.02em',
              }}>
                Skills Radar
              </h3>
            </div>
            <SkillsRadar />
          </div>
        </AnimatedSection>

        {/* Skill cards */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {SKILL_GROUPS.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} visible={visible} />
          ))}
        </div>

        {/* Tech cloud */}
        <AnimatedSection delay={300}>
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #EBEBEB',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <TechTypewriter />
            <p style={{
              color: '#C8C7CC', fontSize: '0.7rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: '20px', textAlign: 'center',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              All Technologies
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', justifyContent: 'center' }}>
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
