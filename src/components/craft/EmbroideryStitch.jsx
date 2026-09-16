import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Needle and thread tracing a slow phulkari-like stitch.
 */
export default function EmbroideryStitch({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        <rect x="8" y="12" width="144" height="76" rx="6" fill="#FBF6EE" opacity="0.15" />
        {[18, 34, 50, 66, 82].map((y) => (
          <line key={y} x1="16" y1={y} x2="144" y2={y} stroke="#E8A93C" strokeOpacity="0.18" />
        ))}

        <motion.path
          d="M20 70 L 40 30 L 60 70 L 80 30 L 100 70 L 120 30 L 140 62"
          stroke="#7A1F3D"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.15, 1, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M28 62 L 48 38 L 68 62 L 88 38 L 108 62 L 128 40"
          stroke="#BF5B3D"
          strokeWidth="1.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0, 1, 0.35] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        <motion.g
          animate={reduceMotion ? undefined : { x: [0, 110, 0], y: [18, -28, 10] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <line x1="22" y1="58" x2="34" y2="42" stroke="#232C4D" strokeWidth="1.4" />
          <polygon points="34,42 40,36 36,46" fill="#E8A93C" />
        </motion.g>
      </svg>
    </div>
  );
}
