'use client';

import { useEffect, useRef, useState } from 'react';

/* ── Domain scores (avg of each skill group) ── */
const RADAR_DOMAINS = [
  { label: 'AI / ML',       score: 81, color: '#7C3AED', bg: 'rgba(124,58,237,0.12)'  },
  { label: 'Web Dev',       score: 85, color: '#0284C7', bg: 'rgba(2,132,199,0.12)'   },
  { label: 'Robotics',      score: 76, color: '#059669', bg: 'rgba(5,150,105,0.12)'   },
  { label: 'Data Science',  score: 71, color: '#C2410C', bg: 'rgba(194,65,12,0.12)'   },
  { label: 'DevOps / Cloud',score: 75, color: '#0891B2', bg: 'rgba(8,145,178,0.12)'   },
];

const N       = RADAR_DOMAINS.length;
const CX      = 200;
const CY      = 210;
const R       = 150;  // outer radius
const LEVELS  = 4;    // grid rings

/* angle for each axis — start from top (−90°) going clockwise */
const ANGLES = Array.from({ length: N }, (_, i) =>
  (i * (2 * Math.PI) / N) - Math.PI / 2
);

function polar(r: number, angle: number) {
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

function toPoints(scores: number[], radius: number, progress: number) {
  return ANGLES.map((a, i) => {
    const p = polar((scores[i] / 100) * radius * progress, a);
    return `${p.x},${p.y}`;
  }).join(' ');
}

function gridPolygon(frac: number) {
  return ANGLES.map(a => {
    const p = polar(frac * R, a);
    return `${p.x},${p.y}`;
  }).join(' ');
}

export default function SkillsRadar() {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered]   = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  /* animate in when scrolled into view */
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          obs.disconnect();
          const start = performance.now();
          const dur   = 1100;
          function step(now: number) {
            const t = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setProgress(ease);
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const scores = RADAR_DOMAINS.map(d => d.score);

  /* label positions — push outward beyond the axis tip */
  const labelPad = 26;
  const labelPoints = ANGLES.map(a => polar(R + labelPad, a));

  return (
    <div ref={ref} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>

      {/* ── SVG chart ── */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px' }}>
        <svg
          viewBox="0 0 400 430"
          style={{ width: '100%', height: 'auto', overflow: 'visible' }}
        >
          {/* Grid rings */}
          {Array.from({ length: LEVELS }, (_, i) => {
            const frac = (i + 1) / LEVELS;
            return (
              <polygon
                key={i}
                points={gridPolygon(frac)}
                fill="none"
                stroke="#E0DFE4"
                strokeWidth="1"
                strokeDasharray={i < LEVELS - 1 ? '4 4' : undefined}
              />
            );
          })}

          {/* Axis lines */}
          {ANGLES.map((a, i) => {
            const tip = polar(R, a);
            return (
              <line
                key={i}
                x1={CX} y1={CY}
                x2={tip.x} y2={tip.y}
                stroke="#E0DFE4"
                strokeWidth="1"
              />
            );
          })}

          {/* Filled polygon (animated) */}
          <polygon
            points={toPoints(scores, R, progress)}
            fill="rgba(99,102,241,0.10)"
            stroke="#6366F1"
            strokeWidth="2"
            strokeLinejoin="round"
            style={{ transition: 'none' }}
          />

          {/* Per-domain colored dots at axis tips */}
          {ANGLES.map((a, i) => {
            const tip = polar((scores[i] / 100) * R * progress, a);
            const dom = RADAR_DOMAINS[i];
            const isH = hovered === i;
            return (
              <circle
                key={i}
                cx={tip.x}
                cy={tip.y}
                r={isH ? 7 : 5}
                fill={dom.color}
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ cursor: 'pointer', transition: 'r 0.15s' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}

          {/* % rings label (25, 50, 75, 100) */}
          {Array.from({ length: LEVELS }, (_, i) => {
            const frac = (i + 1) / LEVELS;
            const lp   = polar(frac * R + 4, -Math.PI / 2);
            return (
              <text
                key={i}
                x={lp.x + 4}
                y={lp.y - 2}
                fontSize="9"
                fill="#C8C7CC"
                fontFamily="JetBrains Mono, monospace"
              >
                {(frac * 100).toFixed(0)}
              </text>
            );
          })}

          {/* Axis labels */}
          {labelPoints.map((lp, i) => {
            const dom = RADAR_DOMAINS[i];
            const isH = hovered === i;
            /* text-anchor: right side → end, left side → start, center → middle */
            const ax  = ANGLES[i];
            const anchor =
              Math.abs(ax) < 0.1 || Math.abs(ax - Math.PI) < 0.1
                ? 'middle'
                : ax > 0 && ax < Math.PI
                ? 'start'
                : 'end';

            return (
              <g key={i} style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <text
                  x={lp.x}
                  y={lp.y + 5}
                  textAnchor={anchor}
                  fontSize="11"
                  fontWeight={isH ? '700' : '600'}
                  fontFamily="Inter, sans-serif"
                  fill={isH ? dom.color : '#374151'}
                  style={{ transition: 'fill 0.15s' }}
                >
                  {dom.label}
                </text>
                <text
                  x={lp.x}
                  y={lp.y + 18}
                  textAnchor={anchor}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fill={isH ? dom.color : '#9CA3AF'}
                  style={{ transition: 'fill 0.15s' }}
                >
                  {dom.score}%
                </text>
              </g>
            );
          })}

          {/* Center dot */}
          <circle cx={CX} cy={CY} r="3" fill="#6366F1" opacity="0.5" />
        </svg>

        {/* Hover tooltip */}
        {hovered !== null && (
          <div style={{
            position: 'absolute',
            bottom: 8, left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFFFFF',
            border: `1px solid ${RADAR_DOMAINS[hovered].color}30`,
            borderRadius: '10px',
            padding: '8px 16px',
            boxShadow: `0 4px 20px ${RADAR_DOMAINS[hovered].color}18`,
            display: 'flex', alignItems: 'center', gap: '8px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: RADAR_DOMAINS[hovered].color,
              display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{ fontWeight: 700, color: '#0F0E14', fontSize: '0.82rem' }}>
              {RADAR_DOMAINS[hovered].label}
            </span>
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              color: RADAR_DOMAINS[hovered].color,
              fontSize: '0.82rem', fontWeight: 700,
            }}>
              {RADAR_DOMAINS[hovered].score}%
            </span>
          </div>
        )}
      </div>

      {/* ── Domain legend pills ── */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        gap: '8px', justifyContent: 'center',
      }}>
        {RADAR_DOMAINS.map((d, i) => (
          <div
            key={d.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '6px 14px', borderRadius: '9999px',
              background: hovered === i ? d.bg : '#F3F2EF',
              border: `1px solid ${hovered === i ? d.color + '40' : '#E0DFE4'}`,
              cursor: 'default',
              transition: 'all 0.18s',
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: d.color, display: 'inline-block', flexShrink: 0,
            }} />
            <span style={{
              fontSize: '0.75rem', fontWeight: 600,
              color: hovered === i ? d.color : '#374151',
              transition: 'color 0.18s',
            }}>
              {d.label}
            </span>
            <span style={{
              fontSize: '0.7rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: hovered === i ? d.color : '#9CA3AF',
              fontWeight: 700,
            }}>
              {d.score}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
