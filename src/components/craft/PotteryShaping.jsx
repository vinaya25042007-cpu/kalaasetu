import React from 'react';
import { motion } from 'framer-motion';

/**
 * PotteryShaping: Elegant animated illustration of raw clay being sculpted
 * on a traditional Indian potter's wheel (Chakra).
 */
export default function PotteryShaping({ className = "", size = 180 }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Potter's Wheel Base (rotating concentric ellipses) */}
      <div className="absolute bottom-2 w-4/5 h-8">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border-2 border-dashed border-bronze/40 bg-gradient-to-r from-terracotta/20 via-turmeric/20 to-terracotta/20 shadow-inner flex items-center justify-center"
        >
          <div className="w-1/2 h-1/2 rounded-full border border-terracotta/30" />
        </motion.div>
      </div>

      {/* Morphing Terracotta Pot Shape */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="potteryClay" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D98A6B" />
            <stop offset="40%" stopColor="#BF5B3D" />
            <stop offset="100%" stopColor="#8C3E28" />
          </linearGradient>
          <linearGradient id="clayHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#F3C978" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#BF5B3D" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Sculpted pot body with animated path morph */}
        <motion.path
          animate={{
            d: [
              // State 1: Rising clay mound
              "M 35 80 C 30 75, 25 60, 32 45 C 38 35, 42 30, 50 30 C 58 30, 62 35, 68 45 C 75 60, 70 75, 65 80 Z",
              // State 2: Rounded matka shape
              "M 32 80 C 22 70, 18 55, 28 40 C 35 30, 42 24, 50 24 C 58 24, 65 30, 72 40 C 82 55, 78 70, 68 80 Z",
              // State 3: Slender neck kalash vase
              "M 36 80 C 26 68, 24 50, 36 38 C 42 32, 44 20, 50 20 C 56 20, 58 32, 64 38 C 76 50, 74 68, 64 80 Z",
              // Back to State 1
              "M 35 80 C 30 75, 25 60, 32 45 C 38 35, 42 30, 50 30 C 58 30, 62 35, 68 45 C 75 60, 70 75, 65 80 Z"
            ]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="url(#potteryClay)"
          stroke="#7A1F3D"
          strokeWidth="1"
        />

        {/* Shading / clay groove lines moving up like on a wheel */}
        <motion.path
          d="M 36 50 Q 50 54, 64 50"
          stroke="url(#clayHighlight)"
          strokeWidth="1.8"
          strokeLinecap="round"
          animate={{
            d: [
              "M 36 65 Q 50 69, 64 65",
              "M 32 48 Q 50 52, 68 48",
              "M 38 32 Q 50 35, 62 32",
              "M 36 65 Q 50 69, 64 65"
            ],
            opacity: [0.3, 0.9, 0.4, 0.3]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Rim of the pot */}
        <motion.ellipse
          cx="50"
          animate={{
            cy: [30, 24, 20, 30],
            rx: [12, 10, 8, 12],
            ry: [3, 2.5, 2, 3]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          fill="#D98A6B"
          stroke="#8C3E28"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}
