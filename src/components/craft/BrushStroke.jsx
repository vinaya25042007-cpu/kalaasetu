import React from 'react';
import { motion } from 'framer-motion';

/**
 * BrushStroke: Authentic natural-pigment brush stroke flourish,
 * inspired by Madhubani & Pattachitra hand-painted strokes.
 */
export default function BrushStroke({
  children,
  className = "",
  delay = 0.2
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* Background Animated Brush Stroke */}
      <motion.svg
        className="absolute -bottom-1 left-0 right-0 -z-10 w-full h-4 overflow-visible"
        viewBox="0 0 160 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 2 12 Q 40 4, 80 10 T 158 8"
          stroke="#BF5B3D"
          strokeWidth="11"
          strokeLinecap="round"
          opacity="0.32"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
        <motion.path
          d="M 6 10 Q 50 6, 95 12 T 154 9"
          stroke="#E8A93C"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.45"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeOut" }}
        />
      </motion.svg>
      {children}
    </span>
  );
}
