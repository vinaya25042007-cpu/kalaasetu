import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import PotteryShaping from './PotteryShaping.jsx';
import WeavingThreads from './WeavingThreads.jsx';
import BrushStroke from './BrushStroke.jsx';
import EmbroideryStitch from './EmbroideryStitch.jsx';
import WoodCarving from './WoodCarving.jsx';
import BambooWeave from './BambooWeave.jsx';

const SCENES = [
  { id: 'clay', overlays: ['pottery', 'loom'], caption: 'Clay shaped by patient hands' },
  { id: 'needle', overlays: ['embroidery', 'painting'], caption: 'Thread and pigment, one stitch at a time' },
  { id: 'grain', overlays: ['wood', 'bamboo'], caption: 'Wood, cane, and the maker’s chisel' },
];

function Overlay({ kind }) {
  if (kind === 'pottery') return <PotteryShaping size={96} />;
  if (kind === 'loom') return <WeavingThreads className="w-full h-full" count={7} />;
  if (kind === 'embroidery') return <EmbroideryStitch className="w-full h-full" />;
  if (kind === 'painting') {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <BrushStroke>
          <span className="font-display text-lg font-semibold text-madder">Natural pigment</span>
        </BrushStroke>
        <svg viewBox="0 0 120 80" className="w-40 h-24" fill="none" aria-hidden="true">
          <motion.path
            d="M8 62 C 28 18, 48 70, 68 28 C 82 8, 96 42, 114 22"
            stroke="#BF5B3D"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M12 70 C 36 40, 52 78, 88 36"
            stroke="#E8A93C"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0.2, 1, 0, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </div>
    );
  }
  if (kind === 'wood') return <WoodCarving className="w-full h-full" />;
  if (kind === 'bamboo') return <BambooWeave className="w-full h-full" />;
  return null;
}

export default function HeroArtisanScene({ className = '' }) {
  const reduceMotion = useReducedMotion();
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      setSceneIndex((i) => (i + 1) % SCENES.length);
    }, 9000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const scene = SCENES[sceneIndex];

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-terracotta/20 bg-gradient-to-br from-indigonight via-[#2c3658] to-madder-dark shadow-glow ${className}`}
    >
      <div className="absolute inset-0 opacity-40" aria-hidden="true">
        <WeavingThreads className="w-full h-full" count={6} />
      </div>
      <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-terracotta/30 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-10 bottom-6 h-48 w-48 rounded-full bg-turmeric/25 blur-3xl" aria-hidden="true" />

      <svg
        viewBox="0 0 420 360"
        className="relative z-10 w-full h-auto"
        role="img"
        aria-label="Artisan hands shaping clay on a potter’s wheel"
      >
        <defs>
          <linearGradient id="claySkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C4A8" />
            <stop offset="100%" stopColor="#C48A68" />
          </linearGradient>
          <linearGradient id="clayBody" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#D98A6B" />
            <stop offset="50%" stopColor="#BF5B3D" />
            <stop offset="100%" stopColor="#8C3E28" />
          </linearGradient>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8A93C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#232C4D" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="210" cy="300" rx="150" ry="28" fill="url(#wheelGlow)" />
        <ellipse cx="210" cy="292" rx="118" ry="18" fill="#3B2A22" />
        <motion.ellipse
          cx="210"
          cy="286"
          rx="98"
          ry="12"
          fill="#5C4033"
          stroke="#E8A93C"
          strokeWidth="1.2"
          strokeDasharray="6 7"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          style={{ transformOrigin: '210px 286px' }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />

        <motion.path
          d="M168 250 C 160 210, 170 168, 210 158 C 250 168, 260 210, 252 250 C 240 268, 180 268, 168 250 Z"
          fill="url(#clayBody)"
          animate={
            reduceMotion
              ? undefined
              : {
                  d: [
                    'M168 250 C 160 210, 170 168, 210 158 C 250 168, 260 210, 252 250 C 240 268, 180 268, 168 250 Z',
                    'M174 248 C 154 200, 168 150, 210 142 C 252 150, 266 200, 246 248 C 236 270, 184 270, 174 248 Z',
                    'M168 250 C 160 210, 170 168, 210 158 C 250 168, 260 210, 252 250 C 240 268, 180 268, 168 250 Z',
                  ],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Left hand */}
        <path
          d="M92 168 C 118 140, 150 148, 172 176 C 182 190, 176 210, 158 218 C 136 228, 108 214, 96 196 C 88 184, 84 176, 92 168 Z"
          fill="url(#claySkin)"
          stroke="#8C3E28"
          strokeWidth="1.2"
        />
        <path d="M118 176 C 132 168, 148 178, 156 192" stroke="#8C6A3F" strokeWidth="1" opacity="0.5" fill="none" />

        {/* Right hand */}
        <path
          d="M328 168 C 302 140, 270 148, 248 176 C 238 190, 244 210, 262 218 C 284 228, 312 214, 324 196 C 332 184, 336 176, 328 168 Z"
          fill="url(#claySkin)"
          stroke="#8C3E28"
          strokeWidth="1.2"
        />
        <path d="M302 176 C 288 168, 272 178, 264 192" stroke="#8C6A3F" strokeWidth="1" opacity="0.5" fill="none" />

        <ellipse cx="210" cy="156" rx="22" ry="7" fill="#D98A6B" stroke="#8C3E28" strokeWidth="1" />
      </svg>

      <div className="absolute inset-x-4 bottom-4 z-20 grid grid-cols-2 gap-3">
        <AnimatePresence>
          {scene.overlays.map((kind) => (
            <motion.div
              key={`${scene.id}-${kind}`}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6 }}
              className="h-28 rounded-2xl bg-ivory/12 backdrop-blur-md border border-white/10 overflow-hidden flex items-center justify-center"
            >
              <Overlay kind={kind} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="absolute left-5 top-5 z-20 max-w-[70%] text-[11px] font-semibold tracking-wide uppercase text-ivory/80">
        {scene.caption}
      </p>
    </div>
  );
}
