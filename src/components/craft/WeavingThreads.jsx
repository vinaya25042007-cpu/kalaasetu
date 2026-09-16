import React from 'react';
import { motion } from 'framer-motion';

/**
 * WeavingThreads: Subtle, elegant animated SVG threads representing
 * the warp (vertical) and weft (horizontal) loom movement in Indian textiles.
 */
export default function WeavingThreads({ className = "", count = 7 }) {
  const threads = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`relative overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BF5B3D" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#E8A93C" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7A1F3D" stopOpacity="0.3" />
          </linearGradient>
          <filter id="threadGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Warp threads (vertical, waving gently) */}
        {threads.map((i) => {
          const xPercent = ((i + 1) / (count + 1)) * 100;
          return (
            <motion.path
              key={`warp-${i}`}
              d={`M ${xPercent} 0 Q ${xPercent + (i % 2 === 0 ? 3 : -3)} 50, ${xPercent} 100`}
              stroke="url(#threadGrad)"
              strokeWidth="1.2"
              fill="none"
              initial={{ pathOffset: 0 }}
              animate={{
                d: [
                  `M ${xPercent} 0 Q ${xPercent + (i % 2 === 0 ? 4 : -4)} 50, ${xPercent} 100`,
                  `M ${xPercent} 0 Q ${xPercent + (i % 2 === 0 ? -4 : 4)} 50, ${xPercent} 100`,
                  `M ${xPercent} 0 Q ${xPercent + (i % 2 === 0 ? 4 : -4)} 50, ${xPercent} 100`
                ]
              }}
              transition={{
                duration: 6 + (i * 0.8),
                repeat: Infinity,
                ease: "easeInOut"
              }}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {/* Weft shuttle lines moving across horizontally */}
        <motion.path
          d="M 0 30 Q 50 25, 100 30"
          stroke="#E8A93C"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          fill="none"
          animate={{
            strokeDashoffset: [0, -100]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
          vectorEffect="non-scaling-stroke"
          opacity="0.6"
        />
        <motion.path
          d="M 0 70 Q 50 75, 100 70"
          stroke="#BF5B3D"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          fill="none"
          animate={{
            strokeDashoffset: [-100, 0]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear"
          }}
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
