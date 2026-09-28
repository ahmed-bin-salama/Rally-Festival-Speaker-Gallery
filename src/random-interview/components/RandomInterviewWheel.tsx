import React, { useMemo } from 'react';
import { ALL_RANDOM_QUESTIONS } from '../data';

interface RandomInterviewWheelProps {
  drawnQuestionIds: string[];
  currentQuestionId: string | null;
  wheelRotation: number;
  isSpinning: boolean;
  onSpinClick: () => void;
  disabled: boolean;
}

// 6 Segment base color palettes (Dark/Rich shades for high contrast and elegance)
const SEGMENT_PALETTES = [
  // SEG-01: Blue family
  { baseH: 215, baseS: 70, baseL: 28 },
  // SEG-02: Teal family
  { baseH: 175, baseS: 70, baseL: 25 },
  // SEG-03: Purple family
  { baseH: 270, baseS: 65, baseL: 30 },
  // SEG-04: Orange family
  { baseH: 25, baseS: 75, baseL: 30 },
  // SEG-05: Green family
  { baseH: 145, baseS: 65, baseL: 25 },
  // SEG-06: Coral/Rose family
  { baseH: 340, baseS: 70, baseL: 30 },
];

/**
 * Generate 10 deterministic shades for a segment based on local index (0 to 9)
 */
function getWedgeColor(segmentIndex: number, localIndex: number): string {
  const palette = SEGMENT_PALETTES[segmentIndex % SEGMENT_PALETTES.length];
  // Alternating light/dark step to ensure high visual distinction between adjacent 6° wedges
  const lightnessOffset = (localIndex % 2 === 0 ? 0 : 8) + (localIndex * 1.5);
  const l = Math.min( palette.baseL + lightnessOffset, 55 );
  return `hsl(${palette.baseH}, ${palette.baseS}%, ${l}%)`;
}

/**
 * Helper to compute SVG arc wedge path given radius and angles in degrees
 */
function describeArcWedge(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;

  const x1Outer = cx + outerR * Math.cos(startRad);
  const y1Outer = cy + outerR * Math.sin(startRad);
  const x2Outer = cx + outerR * Math.cos(endRad);
  const y2Outer = cy + outerR * Math.sin(endRad);

  const x1Inner = cx + innerR * Math.cos(endRad);
  const y1Inner = cy + innerR * Math.sin(endRad);
  const x2Inner = cx + innerR * Math.cos(startRad);
  const y2Inner = cy + innerR * Math.sin(startRad);

  const largeArcFlag = endAngleDeg - startAngleDeg <= 180 ? 0 : 1;

  return [
    `M ${x1Outer} ${y1Outer}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${x2Outer} ${y2Outer}`,
    `L ${x1Inner} ${y1Inner}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${x2Inner} ${y2Inner}`,
    'Z',
  ].join(' ');
}

export const RandomInterviewWheel: React.FC<RandomInterviewWheelProps> = ({
  drawnQuestionIds,
  currentQuestionId,
  wheelRotation,
  isSpinning,
  onSpinClick,
  disabled,
}) => {
  const drawnSet = useMemo(() => new Set(drawnQuestionIds), [drawnQuestionIds]);

  // Center & Radius for 800x800 viewBox
  const SIZE = 800;
  const CENTER = SIZE / 2;
  const OUTER_RADIUS = 380;
  const INNER_RADIUS = 110;
  const LABEL_RADIUS = 365; // Position near outer edge

  // Pre-calculate 60 wedges metadata
  const wedges = useMemo(() => {
    return ALL_RANDOM_QUESTIONS.map((question, i) => {
      const startAngle = i * 6;
      const endAngle = (i + 1) * 6;
      const centerAngle = startAngle + 3;
      const segmentIndex = Math.floor(i / 10);
      const localIndex = i % 10;
      const path = describeArcWedge(CENTER, CENTER, INNER_RADIUS, OUTER_RADIUS, startAngle, endAngle);
      const color = getWedgeColor(segmentIndex, localIndex);

      // Determine label flip to prevent upside-down text
      const normalizedAngle = (centerAngle % 360 + 360) % 360;
      const isLeftHalf = normalizedAngle > 90 && normalizedAngle < 270;

      return {
        question,
        globalIndex: i,
        segmentIndex,
        localIndex,
        startAngle,
        endAngle,
        centerAngle,
        path,
        color,
        isLeftHalf,
      };
    });
  }, [CENTER, INNER_RADIUS, OUTER_RADIUS]);

  // Segment outer ring markers (every 60 degrees)
  const segmentDividers = useMemo(() => {
    return [0, 60, 120, 180, 240, 300].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return {
        deg,
        x1: CENTER + INNER_RADIUS * Math.cos(rad),
        y1: CENTER + INNER_RADIUS * Math.sin(rad),
        x2: CENTER + (OUTER_RADIUS + 4) * Math.cos(rad),
        y2: CENTER + (OUTER_RADIUS + 4) * Math.sin(rad),
      };
    });
  }, [CENTER, INNER_RADIUS, OUTER_RADIUS]);

  return (
    <div className="relative w-full max-w-[760px] aspect-square mx-auto flex items-center justify-center p-2 sm:p-4 select-none">

      {/* FIXED TOP POINTER */}
      <div
        className="absolute top-0 z-30 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <svg width="40" height="42" viewBox="0 0 40 42" fill="none" className="filter drop-shadow-md">
          <path
            d="M20 42L2 6C0.5 3.5 2.3 0 5.2 0H34.8C37.7 0 39.5 3.5 38 6L20 42Z"
            fill="url(#goldPointerGradient)"
            stroke="#FFF8DC"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="goldPointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF1B8" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8A6D1C" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ROTATING SVG WHEEL CONTAINER */}
      <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)] border-4 border-[#222634] bg-[#0b0c10]">
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="w-full h-full transform-gpu"
          style={{
            transform: `rotate(${wheelRotation}deg)`,
            transition: isSpinning
              ? 'transform 4s cubic-bezier(0.15, 0.85, 0.35, 1.0)'
              : 'none',
          }}
        >
          <defs>
            {/* Outer Glow filter for current active wedge */}
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 60 QUESTION WEDGES */}
          <g id="wheel-wedges">
            {wedges.map((w) => {
              const isUsed = drawnSet.has(w.question.id);
              const isCurrent = currentQuestionId === w.question.id;

              return (
                <g key={w.question.id} className="transition-opacity duration-300">
                  <path
                    d={w.path}
                    fill={w.color}
                    opacity={isCurrent ? 1 : isUsed ? 0.22 : 0.92}
                    stroke={isCurrent ? '#FFE082' : '#0d0e12'}
                    strokeWidth={isCurrent ? 3 : 1}
                    filter={isCurrent ? 'url(#goldGlow)' : undefined}
                    className="cursor-pointer hover:opacity-100 transition-all"
                  />
                  {/* Used hatching overlay */}
                  {isUsed && !isCurrent && (
                    <path
                      d={w.path}
                      fill="#000000"
                      opacity="0.35"
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* MAJOR SEGMENT DIVIDER LINES (60 DEG APART) */}
          <g id="segment-dividers">
            {segmentDividers.map((d, idx) => (
              <line
                key={idx}
                x1={d.x1}
                y1={d.y1}
                x2={d.x2}
                y2={d.y2}
                stroke="#D4AF37"
                strokeWidth="2.5"
                opacity="0.75"
              />
            ))}
          </g>

          {/* RADIAL WHEEL LABELS */}
          <g id="wheel-labels">
            {wedges.map((w) => {
              const isUsed = drawnSet.has(w.question.id);
              const isCurrent = currentQuestionId === w.question.id;

              // Angle for text orientation
              const angleRad = (w.centerAngle * Math.PI) / 180;
              const textX = CENTER + LABEL_RADIUS * Math.cos(angleRad);
              const textY = CENTER + LABEL_RADIUS * Math.sin(angleRad);

              // Rotation angle for text element
              let textRotate = w.centerAngle;
              if (w.isLeftHalf) {
                textRotate += 180;
              }

              return (
                <text
                  key={`label-${w.question.id}`}
                  x={textX}
                  y={textY}
                  transform={`rotate(${textRotate}, ${textX}, ${textY})`}
                  textAnchor={w.isLeftHalf ? 'start' : 'end'}
                  dominantBaseline="central"
                  fill={isCurrent ? '#FFE885' : isUsed ? '#888899' : '#FFFFFF'}
                  fontSize={w.question.wheelLabel.length > 22 ? "7.2" : "8.2"}
                  fontWeight={isCurrent ? "800" : "600"}
                  className="pointer-events-none select-none tracking-tight font-sans"
                  style={{
                    textShadow: isCurrent ? '0 0 6px rgba(0,0,0,0.9)' : '0 1px 3px rgba(0,0,0,0.95)',
                    opacity: isUsed && !isCurrent ? 0.6 : 1,
                  }}
                >
                  {w.question.wheelLabel}
                </text>
              );
            })}
          </g>

          {/* OUTER GOLDEN RIM */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER_RADIUS + 2}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            opacity="0.8"
          />

          {/* INNER HUB BORDER */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={INNER_RADIUS}
            fill="#11131a"
            stroke="#D4AF37"
            strokeWidth="4"
          />
        </svg>

        {/* CENTER CONTROL HUB (BUTTON SURFACE) */}
        <div
          className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full flex flex-col items-center justify-center cursor-pointer group"
          style={{
            width: `${(INNER_RADIUS * 2 / SIZE) * 100}%`,
            height: `${(INNER_RADIUS * 2 / SIZE) * 100}%`,
          }}
          onClick={() => {
            if (!disabled && !isSpinning) {
              onSpinClick();
            }
          }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#1c1e28] to-[#0f1016] p-1 flex flex-col items-center justify-center border-2 border-[#333748] group-hover:border-[#D4AF37] transition-all shadow-inner text-center">
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#D4AF37] uppercase">
              RALLY
            </span>
            <span className={`mt-0.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider ${disabled || isSpinning ? 'text-gray-500' : 'text-white group-hover:text-[#FFF1B8]'}`}>
              {isSpinning ? 'SPINNING...' : 'SPIN'}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
