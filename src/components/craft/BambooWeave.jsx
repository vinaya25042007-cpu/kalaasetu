import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Interlacing bamboo / cane strips.
 */
export default function BambooWeave({ className = '' }) {
  const reduceMotion = useReducedMotion();
  const strips = [18, 38, 58, 78, 98, 118, 138];

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 100" className="w-full h-full" fill="none">
        {strips.map((x, i) => (
          <motion.rect
            key={`v-${x}`}
            x={x}
            y="8"
            width="8"
            height="84"
            rx="2"
            fill={i % 2 === 0 ? '#E8A93C' : '#8C6A3F'}
            opacity="0.7"
            animate={reduceMotion ? undefined : { y: i % 2 === 0 ? [8, 14, 8] : [8, 2, 8] }}
            transition={{ duration: 5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        {[22, 46, 70].map((y, i) => (
          <motion.rect
            key={`h-${y}`}
            x="8"
            y={y}
            width="144"
            height="8"
            rx="2"
            fill="#BF5B3D"
            opacity="0.55"
            animate={
              reduceMotion
                ? undefined
                : { x: i % 2 === 0 ? [8, 14, 8] : [8, 2, 8] }
            }
            transition={{ duration: 6 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  );
}
