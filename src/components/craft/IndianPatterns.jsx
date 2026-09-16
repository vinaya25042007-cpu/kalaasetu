import React from 'react';
import { motion } from 'framer-motion';

/**
 * KolamMotif: Sacred geometric threshold mandala with subtle pulse/rotation.
 */
export function KolamMotif({ size = 70, className = "" }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`text-terracotta/40 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {/* Central 8-petal lotus Kolam */}
      <circle cx="50" cy="50" r="8" fill="currentColor" fillOpacity="0.15" />
      <path d="M 50 20 C 42 35, 42 45, 50 50 C 58 45, 58 35, 50 20 Z" />
      <path d="M 50 80 C 42 65, 42 55, 50 50 C 58 55, 58 65, 50 80 Z" />
      <path d="M 20 50 C 35 42, 45 42, 50 50 C 45 58, 35 58, 20 50 Z" />
      <path d="M 80 50 C 65 42, 55 42, 50 50 C 55 58, 65 58, 80 50 Z" />
      
      {/* Diagonals */}
      <path d="M 29 29 C 40 37, 47 43, 50 50 C 43 47, 37 40, 29 29 Z" />
      <path d="M 71 29 C 60 37, 53 43, 50 50 C 57 47, 63 40, 71 29 Z" />
      <path d="M 29 71 C 40 63, 47 57, 50 50 C 43 53, 37 60, 29 71 Z" />
      <path d="M 71 71 C 60 63, 53 57, 50 50 C 57 53, 63 60, 71 71 Z" />

      {/* Outer dots */}
      <circle cx="50" cy="12" r="2.5" fill="currentColor" />
      <circle cx="50" cy="88" r="2.5" fill="currentColor" />
      <circle cx="12" cy="50" r="2.5" fill="currentColor" />
      <circle cx="88" cy="50" r="2.5" fill="currentColor" />
    </motion.svg>
  );
}

/**
 * JaaliDivider: Traditional Indian carved stone/wood lattice screen band.
 */
export function JaaliDivider({ className = "" }) {
  return (
    <div className={`w-full overflow-hidden flex items-center justify-center opacity-30 select-none ${className}`}>
      <svg width="100%" height="24" xmlns="http://www.w3.org/2000/svg">
        <pattern id="jaali" width="36" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 18 0 L 36 12 L 18 24 L 0 12 Z M 18 4 L 30 12 L 18 20 L 6 12 Z"
            fill="none"
            stroke="#BF5B3D"
            strokeWidth="1"
          />
          <circle cx="18" cy="12" r="2" fill="#E8A93C" />
        </pattern>
        <rect width="100%" height="24" fill="url(#jaali)" />
      </svg>
    </div>
  );
}

/**
 * WarliChain: Traditional Warli human chain celebrating community harvesting/weaving.
 */
export function WarliChain({ count = 8, className = "" }) {
  return (
    <div className={`flex items-center gap-4 opacity-35 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="22" height="28" viewBox="0 0 24 30" fill="currentColor" className="text-terracotta">
          {/* Head */}
          <circle cx="12" cy="4" r="3" />
          {/* Upper & Lower body interlocking triangles */}
          <polygon points="12,7 6,17 18,17" />
          <polygon points="12,23 7,17 17,17" />
          {/* Arms holding hands */}
          <line x1="6" y1="12" x2="0" y2="10" stroke="currentColor" strokeWidth="1.8" />
          <line x1="18" y1="12" x2="24" y2="10" stroke="currentColor" strokeWidth="1.8" />
          {/* Legs */}
          <line x1="9" y1="23" x2="6" y2="30" stroke="currentColor" strokeWidth="1.8" />
          <line x1="15" y1="23" x2="18" y2="30" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ))}
    </div>
  );
}

/**
 * PaisleyKalkaMotif: Sacred Indian Kalka / Paisley motif representing fertility & living nature.
 */
export function PaisleyKalkaMotif({ size = 50, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 70" fill="currentColor" className={`text-terracotta/30 ${className}`}>
      <path d="M 30 5 C 45 10, 55 25, 52 42 C 49 55, 38 65, 25 64 C 12 63, 5 52, 6 40 C 7 26, 18 18, 26 12 C 30 9, 32 4, 30 5 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="28" cy="40" r="7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <path d="M 28 35 C 32 37, 32 43, 28 45" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="28" cy="40" r="2.5" fill="#E8A93C" />
    </svg>
  );
}

/**
 * MarigoldToran: Auspicious Indian marigold garland decoration for thresholds & banners.
 */
export function MarigoldToran({ count = 11, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-2 select-none pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => {
        const isOrange = i % 2 === 0;
        const color = isOrange ? '#E8A93C' : '#BF5B3D';
        return (
          <div key={i} className="flex flex-col items-center">
            <div className="w-0.5 h-3 bg-amber-800/30" />
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shadow-xs text-[9px]"
              style={{ backgroundColor: color }}
            >
              🌼
            </div>
            {i % 3 === 0 && (
              <div className="w-1.5 h-3 bg-emerald-700/60 rounded-b-full mt-0.5" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * DiyaLamp: Traditional Indian brass oil lamp radiating warm golden light.
 */
export function DiyaLamp({ size = 32, className = "" }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flame glow */}
        <circle cx="20" cy="14" r="8" fill="#E8A93C" fillOpacity="0.25" className="animate-pulse" />
        {/* Flame */}
        <path d="M 20 6 C 18 10, 17 14, 20 18 C 23 14, 22 10, 20 6 Z" fill="#E8A93C" />
        <path d="M 20 9 C 19 12, 18.5 14, 20 16 C 21.5 14, 21 12, 20 9 Z" fill="#FFED4A" />
        {/* Brass Diya Bowl */}
        <path d="M 8 20 C 12 28, 28 28, 32 20 C 32 24, 28 30, 20 30 C 12 30, 8 24, 8 20 Z" fill="#8C6A3F" stroke="#E8A93C" strokeWidth="1" />
        {/* Base */}
        <path d="M 16 30 L 14 34 L 26 34 L 24 30 Z" fill="#7A1F3D" />
      </svg>
    </div>
  );
}

/**
 * MayurMotif: Traditional Indian Peacock motif representing royal beauty and textile heritage.
 */
export function MayurMotif({ size = 42, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="currentColor" className={`text-terracotta/40 ${className}`}>
      {/* Crown / Crest */}
      <path d="M 16 12 L 14 6 M 18 11 L 18 5 M 20 12 L 22 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14" cy="5" r="1.5" fill="#E8A93C" />
      <circle cx="18" cy="4" r="1.5" fill="#E8A93C" />
      <circle cx="22" cy="5" r="1.5" fill="#E8A93C" />
      {/* Head & Arching Neck */}
      <path d="M 16 14 C 20 12, 23 15, 23 20 C 23 26, 17 28, 17 34 C 17 40, 22 44, 28 44 C 36 44, 44 38, 48 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eye */}
      <circle cx="18" cy="16" r="1" fill="#232C4D" />
      {/* Beak */}
      <path d="M 15 15 L 10 17 L 15 19 Z" fill="currentColor" />
      {/* Fan Plumes / Feathers */}
      <path d="M 30 42 C 40 42, 52 35, 54 22 C 55 14, 48 10, 42 16 C 36 22, 38 32, 28 42 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="46" cy="20" r="3" fill="#E8A93C" fillOpacity="0.8" />
      <circle cx="38" cy="26" r="2.5" fill="#BF5B3D" fillOpacity="0.8" />
    </svg>
  );
}

/**
 * PurnaKalash: Auspicious sacred pot with coconut and mango leaves.
 */
export function PurnaKalash({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" className={className}>
      {/* Coconut */}
      <circle cx="25" cy="13" r="7" fill="#8C6A3F" stroke="#BF5B3D" strokeWidth="1" />
      <path d="M 23 7 L 25 3 L 27 7 Z" fill="#8C6A3F" />
      {/* Mango Leaves */}
      <path d="M 25 15 C 18 13, 13 8, 11 12 C 10 16, 17 17, 21 17 Z" fill="#2E7D32" />
      <path d="M 25 15 C 32 13, 37 8, 39 12 C 40 16, 33 17, 29 17 Z" fill="#2E7D32" />
      <path d="M 25 14 C 20 8, 23 2, 25 4 C 27 2, 30 8, 25 14 Z" fill="#388E3C" />
      {/* Kalash Pot */}
      <path d="M 18 19 L 32 19 L 34 22 L 36 28 C 37 36, 13 36, 14 28 L 16 22 Z" fill="#E8A93C" stroke="#BF5B3D" strokeWidth="1.5" />
      {/* Red Sacred Thread / Mauli */}
      <line x1="16" y1="23" x2="34" y2="23" stroke="#7A1F3D" strokeWidth="2" />
      {/* Base */}
      <rect x="19" y="36" width="12" height="3" rx="1.5" fill="#BF5B3D" />
    </svg>
  );
}

/**
 * RangoliCorner: Filigree ornamental corner bracket for framing cards and containers.
 */
export function RangoliCorner({ size = 44, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50" fill="none" className={`text-terracotta/45 ${className}`}>
      {/* Outer corner border */}
      <path d="M 2 48 L 2 12 C 2 6, 6 2, 12 2 L 48 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Inner floral scroll */}
      <path d="M 6 36 L 6 16 C 6 10, 10 6, 16 6 L 36 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Rosette in corner */}
      <circle cx="16" cy="16" r="4" fill="#E8A93C" fillOpacity="0.6" stroke="currentColor" strokeWidth="1" />
      <circle cx="2" cy="2" r="2" fill="currentColor" />
      <circle cx="28" cy="6" r="1.5" fill="currentColor" />
      <circle cx="6" cy="28" r="1.5" fill="currentColor" />
    </svg>
  );
}

/**
 * TempleBell: Sacred Indian brass bell with gentle chime swing animation.
 */
export function TempleBell({ size = 30, className = "" }) {
  return (
    <motion.div
      animate={{ rotate: [-4, 4, -4] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={`inline-block origin-top ${className}`}
    >
      <svg width={size} height={size * 1.3} viewBox="0 0 30 40" fill="none">
        {/* Chain links */}
        <line x1="15" y1="0" x2="15" y2="12" stroke="#8C6A3F" strokeWidth="2" strokeDasharray="2 2" />
        <circle cx="15" cy="13" r="2" fill="#E8A93C" />
        {/* Bell Body */}
        <path d="M 15 14 C 11 16, 9 20, 8 26 C 7 30, 5 32, 4 33 L 26 33 C 25 32, 23 30, 22 26 C 21 20, 19 16, 15 14 Z" fill="#E8A93C" stroke="#8C6A3F" strokeWidth="1.5" />
        <rect x="4" y="32" width="22" height="3" rx="1" fill="#BF5B3D" />
        {/* Clapper */}
        <circle cx="15" cy="36" r="2.5" fill="#7A1F3D" />
      </svg>
    </motion.div>
  );
}

/**
 * AjrakhBand: Geometrical Sindhi/Kutch block-print star band with terracotta and indigo accents.
 */
export function AjrakhBand({ className = "" }) {
  return (
    <div className={`w-full overflow-hidden select-none opacity-40 ${className}`}>
      <svg width="100%" height="22" xmlns="http://www.w3.org/2000/svg">
        <pattern id="ajrakh" width="40" height="22" patternUnits="userSpaceOnUse">
          {/* Outer star */}
          <polygon points="20,1 25,7 33,7 27,12 29,20 20,15 11,20 13,12 7,7 15,7" fill="#BF5B3D" fillOpacity="0.25" stroke="#BF5B3D" strokeWidth="1" />
          {/* Center floral ring */}
          <circle cx="20" cy="11" r="3" fill="#E8A93C" />
          <circle cx="0" cy="11" r="2" fill="#232C4D" />
          <circle cx="40" cy="11" r="2" fill="#232C4D" />
        </pattern>
        <rect width="100%" height="22" fill="url(#ajrakh)" />
      </svg>
    </div>
  );
}

