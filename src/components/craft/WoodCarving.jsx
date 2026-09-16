import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Slow chisel pass across carved wood grain.
 */
export default function WoodCarving({ className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        <rect x="10" y="22" width="140" height="58" rx="8" fill="#8C6A3F" />
        <rect x="14" y="26" width="132" height="50" rx="6" fill="#BF5B3D" opacity="0.55" />
        {[36, 48, 60, 72].map((y) => (
          <path
            key={y}
            d={`M22 ${y} Q 50 ${y - 4}, 80 ${y} T 138 ${y}`}
            stroke="#F3C978"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            fill="none"
          />
        ))}
        <motion.path
          d="M28 70 C 48 40, 72 78, 96 44 C 112 24, 128 62, 142 48"
          stroke="#FBF6EE"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.1, 1, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.g
          animate={reduceMotion ? undefined : { x: [0, 90, 8], y: [0, -18, 6], rotate: [12, -8, 10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect x="24" y="28" width="6" height="28" rx="1" fill="#232C4D" />
          <polygon points="24,56 30,56 27,68" fill="#E8A93C" />
        </motion.g>
      </svg>
    </div>
  );
}
