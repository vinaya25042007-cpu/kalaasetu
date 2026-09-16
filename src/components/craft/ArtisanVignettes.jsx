import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * 1. POTTER ON WHEEL (Mitti & Chakra / Kumbhakar)
 * Ultra-animated, fun & colorful: Spinning clay wheel, morphing pots, bouncing clay splashes,
 * golden halo, potter hands gently sculpting, and shimmering earthen sparkle dust.
 */
export function PotterArtisanSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="potterClayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3A882" />
            <stop offset="35%" stopColor="#D96B43" />
            <stop offset="70%" stopColor="#BF5B3D" />
            <stop offset="100%" stopColor="#7A1F3D" />
          </linearGradient>
          <linearGradient id="terracottaBaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#663A24" />
            <stop offset="50%" stopColor="#9C5A35" />
            <stop offset="100%" stopColor="#522C1A" />
          </linearGradient>
          <radialGradient id="potterWheelAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F3C978" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#E8A93C" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#BF5B3D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="potterTurban" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A45" />
            <stop offset="100%" stopColor="#BF5B3D" />
          </linearGradient>
        </defs>

        {/* Ambient warm wheel aura glow */}
        <motion.ellipse
          cx="100"
          cy="134"
          rx="72"
          ry="22"
          fill="url(#potterWheelAura)"
          animate={reduceMotion ? undefined : { rx: [68, 76, 68], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Rotating Potter's Wheel Base Disc */}
        <ellipse cx="100" cy="138" rx="64" ry="14" fill="url(#terracottaBaseGrad)" stroke="#E8A93C" strokeWidth="1.5" />
        
        {/* Dynamic Spinning Upper Wheel Plate */}
        <motion.ellipse
          cx="100"
          cy="133"
          rx="56"
          ry="10"
          fill="#3D2012"
          stroke="#F3C978"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          style={{ transformOrigin: '100px 133px' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        {/* Spinning Wheel Concentric Spoke Rings */}
        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          style={{ transformOrigin: '100px 133px' }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <ellipse cx="100" cy="133" rx="38" ry="6.5" stroke="#E8A93C" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="62" y1="133" x2="138" y2="133" stroke="#F3A882" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="100" y1="124" x2="100" y2="142" stroke="#F3A882" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="74" y1="127" x2="126" y2="139" stroke="#E8A93C" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="74" y1="139" x2="126" y2="127" stroke="#E8A93C" strokeWidth="1" strokeDasharray="2 2" />
        </motion.g>

        {/* Earthen Potter Figure Seated Rhythmic */}
        <g>
          {/* Head & Face */}
          <circle cx="50" cy="46" r="11" fill="#E8C4A8" stroke="#7A1F3D" strokeWidth="1.5" />
          {/* Saffron/Terracotta Pagri / Turban with Golden Band */}
          <path d="M 39 44 C 38 31, 62 31, 61 44 C 61 50, 39 50, 39 44 Z" fill="url(#potterTurban)" stroke="#7A1F3D" strokeWidth="1.4" />
          <path d="M 41 39 Q 50 32, 59 39" stroke="#FFED4A" strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="35" r="2" fill="#FFED4A" />

          {/* Friendly artisan smile & tilak */}
          <path d="M 50 42 L 50 45" stroke="#BF5B3D" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="54" cy="46" r="1" fill="#232C4D" />
          <path d="M 52 50 Q 55 52, 57 49" stroke="#7A1F3D" strokeWidth="1" strokeLinecap="round" />

          {/* Torso & Traditional Dhoti */}
          <path d="M 45 56 C 34 70, 38 96, 52 110" stroke="#7A1F3D" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 45 56 C 54 64, 62 76, 68 92" stroke="#BF5B3D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 38 110 C 46 126, 75 128, 85 118" stroke="#8C6A3F" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 42 114 Q 60 128, 78 120" stroke="#F3C978" strokeWidth="1.6" />
        </g>

        {/* Potter's Sculpting Hands with Dynamic Movement */}
        <motion.path
          d="M 54 74 C 68 84, 82 98, 92 102"
          stroke="#D49A78"
          strokeWidth="3.2"
          strokeLinecap="round"
          animate={reduceMotion ? undefined : {
            d: [
              'M 54 74 C 68 84, 82 98, 92 102',
              'M 54 74 C 70 78, 86 90, 95 94',
              'M 54 74 C 68 84, 82 98, 92 102'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 58 82 C 74 90, 92 102, 104 104"
          stroke="#D49A78"
          strokeWidth="3.2"
          strokeLinecap="round"
          animate={reduceMotion ? undefined : {
            d: [
              'M 58 82 C 74 90, 92 102, 104 104',
              'M 58 82 C 76 84, 94 92, 106 96',
              'M 58 82 C 74 90, 92 102, 104 104'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* Morphing Terracotta Clay Pot Body (Grows, shapes and transforms) */}
        <motion.path
          animate={reduceMotion ? undefined : {
            d: [
              'M 86 128 C 76 112, 80 92, 98 84 C 116 92, 120 112, 110 128 Z',
              'M 80 128 C 70 102, 82 74, 98 68 C 114 74, 126 102, 116 128 Z',
              'M 88 128 C 78 116, 82 96, 98 90 C 114 96, 118 116, 108 128 Z',
              'M 86 128 C 76 112, 80 92, 98 84 C 116 92, 120 112, 110 128 Z'
            ]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          fill="url(#potterClayGradient)"
          stroke="#7A1F3D"
          strokeWidth="1.6"
        />

        {/* Shiny Golden Swirling Clay Glaze Band */}
        <motion.path
          d="M 88 106 Q 98 112, 108 106"
          stroke="#FFED4A"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={reduceMotion ? undefined : {
            d: [
              'M 88 116 Q 98 122, 108 116',
              'M 82 96 Q 98 102, 114 96',
              'M 90 82 Q 98 86, 106 82',
              'M 88 116 Q 98 122, 108 116'
            ],
            opacity: [0.4, 1, 0.5, 0.4]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Pot Rim Glowing Lip */}
        <motion.ellipse
          cx="98"
          animate={reduceMotion ? undefined : {
            cy: [84, 68, 90, 84],
            rx: [10, 8, 9, 10],
            ry: [3, 2.4, 2.8, 3]
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          fill="#FFED4A"
          stroke="#BF5B3D"
          strokeWidth="1.5"
        />

        {/* Playful Colorful Clay Droplets Popping from the spinning wheel */}
        <motion.circle
          cx="132"
          cy="124"
          r="3"
          fill="#FF7A45"
          animate={reduceMotion ? undefined : {
            x: [0, 22, 32],
            y: [0, -20, 8],
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.circle
          cx="68"
          cy="126"
          r="2.5"
          fill="#E8A93C"
          animate={reduceMotion ? undefined : {
            x: [0, -20, -28],
            y: [0, -16, 6],
            scale: [0, 1.4, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: 0.7 }}
        />
        <motion.circle
          cx="120"
          cy="100"
          r="2.2"
          fill="#F3C978"
          animate={reduceMotion ? undefined : {
            x: [0, 16, 24],
            y: [0, -18, -2],
            scale: [0, 1.3, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.7, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
        />
        <motion.circle
          cx="78"
          cy="104"
          r="2"
          fill="#BF5B3D"
          animate={reduceMotion ? undefined : {
            x: [0, -14, -20],
            y: [0, -22, -6],
            scale: [0, 1.2, 0],
            opacity: [0, 0.9, 0]
          }}
          transition={{ duration: 2.3, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}
        />

        {/* Twinkling Golden Star crowning the handcrafted clay pot */}
        <motion.g
          animate={reduceMotion ? undefined : {
            scale: [0.7, 1.4, 0.7],
            rotate: [0, 180, 360],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '98px 52px' }}
        >
          <polygon points="98,46 101,50 106,52 101,54 98,58 95,54 90,52 95,50" fill="#FFED4A" stroke="#E8A93C" strokeWidth="0.8" />
        </motion.g>

        {/* Mini floating sparkle dust */}
        <motion.circle
          cx="112"
          cy="60"
          r="1.5"
          fill="#FFED4A"
          animate={reduceMotion ? undefined : { scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: 0.4 }}
        />
        <motion.circle
          cx="84"
          cy="64"
          r="1.5"
          fill="#F3C978"
          animate={reduceMotion ? undefined : { scale: [0, 1.3, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1.1 }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-terracotta mt-1 bg-terracotta/15 px-3 py-1 rounded-full border border-terracotta/30 shadow-xs group-hover:bg-terracotta group-hover:text-white transition-all transform group-hover:scale-105">
          🏺 Mitti Chakra • Pottery
        </span>
      )}
    </div>
  );
}

/**
 * 2. WEAVER ON HANDLOOM (Tana-Bana / Saree Weaver)
 * Lively, colorful: Vibrant rainbow silk warp strings (Crimson, Zari Gold, Emerald, Indigo),
 * fast energetic golden flying shuttle with dancing silk ribbon, rhythmically tapping loom reed, and glittering zari stars.
 */
export function WeaverLoomSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  const silkColors = ['#E8A93C', '#BF5B3D', '#7A1F3D', '#2E7D32', '#232C4D', '#E8A93C', '#BF5B3D', '#7A1F3D', '#FF7A45'];

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="loomTeakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C48A68" />
            <stop offset="30%" stopColor="#8C5A32" />
            <stop offset="70%" stopColor="#5E381C" />
            <stop offset="100%" stopColor="#3B200E" />
          </linearGradient>
          <linearGradient id="sareeClothGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9C274E" />
            <stop offset="50%" stopColor="#7A1F3D" />
            <stop offset="100%" stopColor="#4A1024" />
          </linearGradient>
          <linearGradient id="goldShuttleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFED4A" />
            <stop offset="50%" stopColor="#E8A93C" />
            <stop offset="100%" stopColor="#BF7F18" />
          </linearGradient>
        </defs>

        {/* Handloom Wooden Frame Sturdy Pillars */}
        <rect x="22" y="16" width="156" height="8" rx="2.5" fill="url(#loomTeakGrad)" stroke="#2C180C" strokeWidth="1.2" />
        <rect x="22" y="136" width="156" height="8" rx="2.5" fill="url(#loomTeakGrad)" stroke="#2C180C" strokeWidth="1.2" />
        <rect x="24" y="16" width="7.5" height="128" rx="2" fill="url(#loomTeakGrad)" stroke="#2C180C" strokeWidth="1.2" />
        <rect x="168" y="16" width="7.5" height="128" rx="2" fill="url(#loomTeakGrad)" stroke="#2C180C" strokeWidth="1.2" />

        {/* Vibrant Multi-Color Silk Warp Threads (Animated vibrating strings like a harp) */}
        {[42, 56, 70, 84, 98, 112, 126, 140, 154].map((x, i) => (
          <motion.path
            key={x}
            d={`M ${x} 24 L ${x} 136`}
            stroke={silkColors[i % silkColors.length]}
            strokeWidth="1.8"
            opacity="0.85"
            animate={reduceMotion ? undefined : {
              d: [
                `M ${x} 24 Q ${x + (i % 2 === 0 ? 5 : -5)} 75, ${x} 136`,
                `M ${x} 24 Q ${x + (i % 2 === 0 ? -5 : 5)} 75, ${x} 136`,
                `M ${x} 24 Q ${x + (i % 2 === 0 ? 5 : -5)} 75, ${x} 136`
              ]
            }}
            transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Woven Rich Brocade Fabric Section at Bottom */}
        <rect x="32" y="104" width="136" height="34" rx="3" fill="url(#sareeClothGrad)" stroke="#E8A93C" strokeWidth="1.5" />
        
        {/* Shimmering Golden Zari Brocade Rows on the woven cloth */}
        {[110, 117, 124, 131].map((y, idx) => (
          <motion.line
            key={y}
            x1="36"
            y1={y}
            x2="164"
            y2={y}
            stroke="#FFED4A"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            animate={reduceMotion ? undefined : {
              opacity: [0.6, 1, 0.6],
              strokeDashoffset: [0, 16]
            }}
            transition={{ duration: 1.8 + idx * 0.25, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Little Golden Paisley Motifs on Fabric */}
        <circle cx="55" cy="120" r="3" fill="#FFED4A" />
        <circle cx="85" cy="120" r="3" fill="#FFED4A" />
        <circle cx="115" cy="120" r="3" fill="#FFED4A" />
        <circle cx="145" cy="120" r="3" fill="#FFED4A" />

        {/* Loom Reed Beater (Tapping motion up and down packing weft) */}
        <motion.rect
          x="32"
          y="68"
          width="136"
          height="5.5"
          rx="1.5"
          fill="#3B200E"
          stroke="#FFED4A"
          strokeWidth="1.2"
          animate={reduceMotion ? undefined : {
            y: [68, 98, 68]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Animated Flying Golden Boat Shuttle Whooshing Back and Forth */}
        <motion.g
          animate={reduceMotion ? undefined : {
            x: [36, 150, 36]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Wood/Gold Boat Shuttle */}
          <path d="M -16 75 C -8 69, 8 69, 16 75 C 8 81, -8 81, -16 75 Z" fill="url(#goldShuttleGrad)" stroke="#4A2508" strokeWidth="1.4" />
          <circle cx="0" cy="75" r="3.2" fill="#7A1F3D" />
          <circle cx="0" cy="75" r="1.5" fill="#FFED4A" />
          
          {/* Long Flowing Golden Silk Ribbon Trail behind the shuttle */}
          <motion.path
            d="M 0 75 Q -22 66, -38 78 T -56 72"
            stroke="#FFED4A"
            strokeWidth="2.2"
            fill="none"
            strokeDasharray="4 2"
            animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Weaver Profile Silhouette on Side */}
        <g>
          <circle cx="15" cy="50" r="8" fill="#E8C4A8" stroke="#7A1F3D" strokeWidth="1.3" />
          <path d="M 10 47 Q 15 38, 20 47" stroke="#BF5B3D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 14 58 C 10 72, 14 88, 22 96" stroke="#7A1F3D" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Twinkling Zari Sparkles */}
        <motion.polygon
          points="70,118 72,121 75,122 72,123 70,126 68,123 65,122 68,121"
          fill="#FFED4A"
          animate={reduceMotion ? undefined : { scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          style={{ transformOrigin: '70px 122px' }}
        />
        <motion.polygon
          points="130,118 132,121 135,122 132,123 130,126 128,123 125,122 128,121"
          fill="#FFED4A"
          animate={reduceMotion ? undefined : { scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          style={{ transformOrigin: '130px 122px' }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-turmeric-dark mt-1 bg-turmeric/15 px-3 py-1 rounded-full border border-turmeric/35 shadow-xs group-hover:bg-turmeric group-hover:text-indigonight transition-all transform group-hover:scale-105">
          🧵 Tana-Bana • Handloom
        </span>
      )}
    </div>
  );
}

/**
 * 3. EMBROIDERY / NEEDLE ARTISAN (Sui-Dhaga / Kashidakari & Kantha)
 * Ultra-animated, colorful: Polished wooden hoop, blooming multi-layer Phulkari lotus,
 * shiny silver needle swooping in graceful arcs pulling golden thread, popping floral buds and flying butterflies.
 */
export function EmbroideryNeedleSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hoopWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C48A68" />
            <stop offset="50%" stopColor="#8C5A32" />
            <stop offset="100%" stopColor="#5E381C" />
          </linearGradient>
          <radialGradient id="khadiClothBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF9" />
            <stop offset="70%" stopColor="#FAF2E4" />
            <stop offset="100%" stopColor="#EFE3CF" />
          </radialGradient>
        </defs>

        {/* Polished Embroidery Hoop Outer Wood Ring */}
        <circle cx="100" cy="84" r="64" stroke="url(#hoopWoodGrad)" strokeWidth="7" fill="url(#khadiClothBg)" />
        <circle cx="100" cy="84" r="59" stroke="#3D2012" strokeWidth="1.6" />
        
        {/* Brass Tightening Screw Top */}
        <rect x="94" y="14" width="12" height="7.5" rx="2" fill="#E8A93C" stroke="#7A4F27" strokeWidth="1.2" />
        <line x1="100" y1="10" x2="100" y2="21" stroke="#3D2012" strokeWidth="2" />
        <circle cx="100" cy="9" r="2.5" fill="#FFED4A" />

        {/* Fine Khadi Weave Crosshatch Pattern */}
        {[48, 64, 80, 96, 112, 128, 144].map((pos) => (
          <g key={pos} opacity="0.18">
            <line x1="44" y1={pos} x2="156" y2={pos} stroke="#BF5B3D" strokeWidth="0.9" />
            <line x1={pos} y1="32" x2={pos} y2="136" stroke="#BF5B3D" strokeWidth="0.9" />
          </g>
        ))}

        {/* Blooming Outer Magenta & Crimson Phulkari Lotus Petals */}
        <motion.g
          animate={reduceMotion ? undefined : {
            scale: [0.94, 1.06, 0.94],
            rotate: [0, 4, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 84px' }}
        >
          {/* 6 Radiant Embroidered Petals */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <motion.path
              key={deg}
              d="M 100 84 C 90 60, 92 46, 100 40 C 108 46, 110 60, 100 84 Z"
              fill="#BF5B3D"
              fillOpacity="0.7"
              stroke="#7A1F3D"
              strokeWidth="1.6"
              strokeDasharray="4 2"
              transform={`rotate(${deg} 100 84)`}
            />
          ))}
        </motion.g>

        {/* Inner Golden Saffron Satin Stitch Flower */}
        <motion.g
          animate={reduceMotion ? undefined : {
            scale: [0.92, 1.08, 0.92],
            rotate: [0, -6, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          style={{ transformOrigin: '100px 84px' }}
        >
          {[30, 90, 150, 210, 270, 330].map((deg) => (
            <path
              key={deg}
              d="M 100 84 C 94 68, 95 56, 100 52 C 105 56, 106 68, 100 84 Z"
              fill="#FFC107"
              fillOpacity="0.85"
              stroke="#E8A93C"
              strokeWidth="1.4"
              transform={`rotate(${deg} 100 84)`}
            />
          ))}
          {/* Emerald Center Core */}
          <circle cx="100" cy="84" r="7" fill="#2E7D32" stroke="#FFED4A" strokeWidth="1.5" />
          <circle cx="100" cy="84" r="3" fill="#FFED4A" />
        </motion.g>

        {/* Animated Kantha Stitches dynamically tracing an ornate vine */}
        <motion.path
          d="M 72 102 Q 88 124, 116 118 T 136 90 Q 128 66, 108 52"
          stroke="#7A1F3D"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="7 4"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.15, 1, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Golden Silk Stitches growing */}
        <motion.path
          d="M 78 84 C 90 70, 108 64, 124 76"
          stroke="#FFED4A"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="5 3"
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.2, 1, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Shiny Silver Needle Swooping & Dipping in graceful arcs */}
        <motion.g
          animate={reduceMotion ? undefined : {
            x: [0, 30, -20, 0],
            y: [0, -26, 16, 0],
            rotate: [0, 24, -18, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '124px 68px' }}
        >
          {/* Steel Needle with Shimmer Highlight */}
          <line x1="124" y1="68" x2="152" y2="40" stroke="#1E293B" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="124" y1="68" x2="118" y2="74" stroke="#7A1F3D" strokeWidth="1.6" />
          {/* Needle Eye */}
          <ellipse cx="150" cy="42" rx="1.8" ry="3.5" transform="rotate(45 150 42)" stroke="#FF7A45" strokeWidth="1.2" />
          
          {/* Flowing Loop of Golden Silk Thread */}
          <motion.path
            d="M 152 40 Q 174 26, 182 46 T 190 62"
            stroke="#FFC107"
            strokeWidth="1.8"
            fill="none"
            strokeDasharray="4 2"
            animate={reduceMotion ? undefined : {
              d: [
                'M 152 40 Q 174 26, 182 46 T 190 62',
                'M 152 40 Q 178 30, 180 52 T 195 70',
                'M 152 40 Q 174 26, 182 46 T 190 62'
              ]
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* Popping Floral Buds & Floating Sparkles */}
        <motion.circle
          cx="72"
          cy="102"
          r="3"
          fill="#E91E63"
          animate={reduceMotion ? undefined : { scale: [0, 1.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.circle
          cx="136"
          cy="90"
          r="3"
          fill="#FFC107"
          animate={reduceMotion ? undefined : { scale: [0, 1.8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        />
        <motion.polygon
          points="100,32 102,35 105,36 102,37 100,40 98,37 95,36 98,35"
          fill="#FFED4A"
          animate={reduceMotion ? undefined : { scale: [0.6, 1.4, 0.6], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '100px 36px' }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-madder mt-1 bg-madder/15 px-3 py-1 rounded-full border border-madder/30 shadow-xs group-hover:bg-madder group-hover:text-white transition-all transform group-hover:scale-105">
          🪡 Sui-Dhaga • Embroidery
        </span>
      )}
    </div>
  );
}

/**
 * 4. FOLK PAINTER (Kalamkari, Madhubani & Pattachitra)
 * Ultra-animated, colorful: Radiant Madhubani sacred fish with winking sparkly eye,
 * dancing bamboo kalam (quill) brush dipping indigo ink, vibrant splashes of Indigo, Saffron, Madder & Forest Green!
 */
export function FolkPainterSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="canvasParchment" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="60%" stopColor="#FAF2E1" />
            <stop offset="100%" stopColor="#F2E3C6" />
          </linearGradient>
          <linearGradient id="fishIndigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B4A7A" />
            <stop offset="60%" stopColor="#232C4D" />
            <stop offset="100%" stopColor="#141B33" />
          </linearGradient>
        </defs>

        {/* Handmade Cotton/Parchment Canvas with Terracotta Border */}
        <rect x="22" y="16" width="156" height="128" rx="10" fill="url(#canvasParchment)" stroke="#8C5A32" strokeWidth="1.8" />
        <rect x="28" y="22" width="144" height="116" rx="7" stroke="#BF5B3D" strokeWidth="1.4" strokeDasharray="5 3" />

        {/* Traditional Madhubani Sacred Fish (Matsya) Motif */}
        <motion.g
          animate={reduceMotion ? undefined : {
            scale: [0.97, 1.03, 0.97],
            y: [0, -2, 0]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '95px 82px' }}
        >
          {/* Fish Body with Golden Saffron Glow */}
          <path
            d="M 52 82 C 70 54, 110 54, 134 82 C 110 110, 70 110, 52 82 Z"
            fill="#FFC107"
            fillOpacity="0.45"
            stroke="#232C4D"
            strokeWidth="2.2"
          />
          {/* Fish Double Tail with Madder Crimson and Saffron */}
          <path d="M 52 82 L 32 60 C 40 74, 40 90, 32 104 Z" fill="#BF5B3D" stroke="#232C4D" strokeWidth="1.6" />
          <circle cx="40" cy="82" r="3" fill="#FFED4A" />

          {/* Fish Intricate Scales / Hatching in Indigo & Crimson */}
          {[74, 86, 98, 110].map((x) => (
            <g key={x}>
              <line x1={x} y1="64" x2={x - 8} y2="100" stroke="#7A1F3D" strokeWidth="1.3" />
              <circle cx={x - 4} cy="82" r="2" fill="#232C4D" />
            </g>
          ))}

          {/* Playful Winking Eye of the Sacred Fish */}
          <circle cx="120" cy="78" r="5.5" fill="#FFFFFF" stroke="#232C4D" strokeWidth="1.6" />
          <motion.circle
            cx="121"
            cy="78"
            r="2.8"
            fill="#232C4D"
            animate={reduceMotion ? undefined : {
              scaleY: [1, 0.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
          <circle cx="122" cy="76" r="1" fill="#FFFFFF" />
        </motion.g>

        {/* Natural Dye Lotus Vine Growing Across Top */}
        <motion.path
          d="M 38 38 Q 74 30, 110 40 T 160 34"
          stroke="#2E7D32"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.25, 1, 0.35] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Vine Flower Bud */}
        <circle cx="110" cy="40" r="3.5" fill="#BF5B3D" stroke="#FFED4A" strokeWidth="1" />

        {/* Dancing Bamboo Kalam (Quill) Brush dipping & painting */}
        <motion.g
          animate={reduceMotion ? undefined : {
            x: [0, 30, -18, 0],
            y: [0, -22, 16, 0],
            rotate: [0, 24, -16, 0]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '136px 82px' }}
        >
          {/* Bamboo Reed Handle */}
          <line x1="136" y1="82" x2="174" y2="38" stroke="#8C5A32" strokeWidth="3.8" strokeLinecap="round" />
          <rect x="140" y="72" width="7" height="6" rx="1.5" fill="#BF5B3D" />
          {/* Bamboo Nib with Indigo Ink */}
          <polygon points="136,82 132,88 139,86" fill="#232C4D" />
          <circle cx="132" cy="89" r="2" fill="#232C4D" />
        </motion.g>

        {/* Vibrant Natural Pigment Splashes popping onto the canvas */}
        <motion.circle
          cx="150"
          cy="86"
          r="3"
          fill="#232C4D"
          animate={reduceMotion ? undefined : {
            scale: [0, 1.6, 0],
            x: [0, 12, 18],
            y: [0, -10, 4],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
        />
        <motion.circle
          cx="56"
          cy="46"
          r="2.6"
          fill="#FF7A45"
          animate={reduceMotion ? undefined : {
            scale: [0, 1.5, 0],
            x: [0, -8, -14],
            y: [0, -8, 6],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2.1, repeat: Infinity, ease: 'easeOut', delay: 0.9 }}
        />
        <motion.circle
          cx="88"
          cy="120"
          r="2.8"
          fill="#FFC107"
          animate={reduceMotion ? undefined : {
            scale: [0, 1.7, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
        />
        <motion.circle
          cx="140"
          cy="114"
          r="2.4"
          fill="#2E7D32"
          animate={reduceMotion ? undefined : {
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut', delay: 1.7 }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-indigonight mt-1 bg-indigonight/15 px-3 py-1 rounded-full border border-indigonight/30 shadow-xs group-hover:bg-indigonight group-hover:text-white transition-all transform group-hover:scale-105">
          🎨 Kalamkari • Folk Painting
        </span>
      )}
    </div>
  );
}

/**
 * 5. WOOD CARVING ARTISAN (Kashtha Shilp / Saharanpur Teak & Rosewood)
 * Ultra-animated, colorful: Polished teak wood with golden grain, glowing carved jaali rosette,
 * steel chisel tapping with bouncing mallet, and flying curled golden wood shavings twirling in air.
 */
export function WoodCarverSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="teakWoodBlock" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B37D4E" />
            <stop offset="45%" stopColor="#7A4E29" />
            <stop offset="85%" stopColor="#4D2E16" />
            <stop offset="100%" stopColor="#301A0B" />
          </linearGradient>
          <radialGradient id="carvedReliefGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFED4A" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#E8A93C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#4D2E16" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Seasoned Polished Teak Wood Plank */}
        <rect x="22" y="20" width="156" height="120" rx="10" fill="url(#teakWoodBlock)" stroke="#261408" strokeWidth="2" />
        <rect x="28" y="26" width="144" height="108" rx="8" fill="#BF5B3D" fillOpacity="0.2" />

        {/* Natural Flowing Golden Wood Grains */}
        {[42, 60, 78, 96, 114].map((y) => (
          <path
            key={y}
            d={`M 32 ${y} Q 78 ${y - 6}, 120 ${y + 2} T 168 ${y}`}
            stroke="#F3C978"
            strokeOpacity="0.38"
            strokeWidth="1.4"
            fill="none"
          />
        ))}

        {/* Carved Jaali Rosette Mandala Relief with Golden Radiance */}
        <circle cx="100" cy="80" r="32" fill="url(#carvedReliefGlow)" stroke="#FFED4A" strokeWidth="1.8" strokeDasharray="5 3" />
        
        {/* 4 Deep Carved Floral Petals with Rich Depth */}
        <path d="M 100 52 C 92 68, 92 74, 100 80 C 108 74, 108 68, 100 52 Z" fill="#FFED4A" fillOpacity="0.85" stroke="#3D2012" strokeWidth="1.2" />
        <path d="M 100 108 C 92 92, 92 86, 100 80 C 108 86, 108 92, 100 108 Z" fill="#FFED4A" fillOpacity="0.85" stroke="#3D2012" strokeWidth="1.2" />
        <path d="M 72 80 C 88 85, 92 85, 100 80 C 92 75, 88 75, 72 80 Z" fill="#FFED4A" fillOpacity="0.85" stroke="#3D2012" strokeWidth="1.2" />
        <path d="M 128 80 C 112 85, 108 85, 100 80 C 108 75, 112 75, 128 80 Z" fill="#FFED4A" fillOpacity="0.85" stroke="#3D2012" strokeWidth="1.2" />
        <circle cx="100" cy="80" r="5" fill="#BF5B3D" stroke="#FFED4A" strokeWidth="1.2" />

        {/* Dynamic Carving Path Traced by Chisel */}
        <motion.path
          d="M 54 100 Q 82 62, 120 72 T 150 110"
          stroke="#FFFDF9"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          initial={{ pathLength: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.15, 1, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Steel Chisel Tool Tapping & Carving */}
        <motion.g
          animate={reduceMotion ? undefined : {
            x: [0, 52, -12, 0],
            y: [0, -24, 12, 0],
            rotate: [14, -10, 12, 14]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '72px 76px' }}
        >
          {/* Steel Chisel Blade */}
          <polygon points="62,72 72,67 86,90 76,95" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.4" />
          <polygon points="76,95 86,90 90,97 80,102" fill="#FFED4A" stroke="#3D2012" strokeWidth="1.2" />
          {/* Wooden Chisel Handle */}
          <rect x="46" y="44" width="18" height="32" rx="3.5" fill="#8C5A32" stroke="#3D2012" strokeWidth="1.4" transform="rotate(-32 46 44)" />
        </motion.g>

        {/* Flying Curled Golden Wood Shavings twirling through the air */}
        <motion.path
          d="M 122 74 C 132 64, 144 66, 138 78 C 134 88, 148 90, 154 80"
          stroke="#FFED4A"
          strokeWidth="2"
          fill="none"
          animate={reduceMotion ? undefined : {
            x: [0, 18, 32],
            y: [0, -16, 12],
            rotate: [0, 60, 120],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.3 }}
        />
        <motion.path
          d="M 108 58 C 118 48, 130 52, 126 62 C 122 72, 136 74, 140 64"
          stroke="#E8A93C"
          strokeWidth="1.8"
          fill="none"
          animate={reduceMotion ? undefined : {
            x: [0, 20, 36],
            y: [0, -20, 8],
            rotate: [0, -50, -100],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: 1.1 }}
        />

        {/* Carving Sparkles */}
        <motion.polygon
          points="100,40 102,43 105,44 102,45 100,48 98,45 95,44 98,43"
          fill="#FFED4A"
          animate={reduceMotion ? undefined : { scale: [0.5, 1.5, 0.5], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ transformOrigin: '100px 44px' }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-bronze mt-1 bg-bronze/15 px-3 py-1 rounded-full border border-bronze/35 shadow-xs group-hover:bg-bronze group-hover:text-white transition-all transform group-hover:scale-105">
          🪵 Kashtha Shilp • Wood Carving
        </span>
      )}
    </div>
  );
}

/**
 * 6. BAMBOO & CANE WEAVING (Venu Shilp / Assam & Tripura Bamboo)
 * Ultra-animated, colorful: Interlacing natural bamboo ribs, flexing cane strips with snappy motion,
 * fresh green sprouting leaf shoot with dewdrop, and jaunty woven basket rim.
 */
export function BambooBasketSketch({ size = 150, className = '', showLabel = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center select-none group ${className}`} style={{ width: size }}>
      <svg viewBox="0 0 200 165" className="w-full h-auto drop-shadow-md overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bambooCaneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#C48A68" />
          </linearGradient>
        </defs>

        {/* Strong Bamboo Basket Rim */}
        <ellipse cx="100" cy="42" rx="62" ry="16" fill="url(#bambooCaneGrad)" fillOpacity="0.4" stroke="#8C5A32" strokeWidth="2.8" />
        <ellipse cx="100" cy="42" rx="55" ry="12" stroke="#BF5B3D" strokeWidth="1.5" strokeDasharray="5 3" />

        {/* Vertical Bamboo Ribs flexing with lively spring motion */}
        {[52, 68, 84, 100, 116, 132, 148].map((x, i) => (
          <motion.path
            key={x}
            d={`M ${x} 42 C ${x - 8} 78, ${x - 4} 110, ${100 + (i - 3) * 13} 128`}
            stroke={i % 2 === 0 ? '#FFC107' : '#8C5A32'}
            strokeWidth="2.6"
            strokeLinecap="round"
            animate={reduceMotion ? undefined : {
              d: [
                `M ${x} 42 C ${x - 9} 78, ${x - 5} 110, ${100 + (i - 3) * 13} 128`,
                `M ${x} 42 C ${x - 4} 78, ${x} 110, ${100 + (i - 3) * 13} 128`,
                `M ${x} 42 C ${x - 9} 78, ${x - 5} 110, ${100 + (i - 3) * 13} 128`
              ]
            }}
            transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}

        {/* Horizontal Cane Weaving Ribbons (Energetic wave animation) */}
        {[64, 82, 100, 116].map((y, i) => (
          <motion.path
            key={y}
            d={`M ${48 + i * 2.5} ${y} Q 100 ${y + 12}, ${152 - i * 2.5} ${y}`}
            stroke={i % 2 === 0 ? '#BF5B3D' : '#FFC107'}
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeDasharray="9 6"
            animate={reduceMotion ? undefined : {
              strokeDashoffset: i % 2 === 0 ? [0, 30] : [30, 0]
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
          />
        ))}

        {/* Solid Woven Basket Base */}
        <ellipse cx="100" cy="128" rx="40" ry="10" fill="#8C5A32" stroke="#523218" strokeWidth="2.2" />
        <circle cx="100" cy="128" r="4" fill="#FFED4A" />

        {/* Dynamic Flexible Cane Strand whipping into the basket rim */}
        <motion.path
          d="M 148 74 Q 122 88, 94 84"
          stroke="#FFED4A"
          strokeWidth="2.8"
          strokeLinecap="round"
          animate={reduceMotion ? undefined : {
            d: [
              'M 148 74 Q 122 88, 94 84',
              'M 150 80 Q 126 96, 102 88',
              'M 148 74 Q 122 88, 94 84'
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Fresh Green Sprouting Bamboo Leaf Shoot with playful sway */}
        <motion.g
          animate={reduceMotion ? undefined : {
            scale: [0.85, 1.25, 0.85],
            rotate: [-8, 8, -8]
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '154px 40px' }}
        >
          <path d="M 154 40 C 166 32, 176 38, 172 48 C 164 46, 156 44, 154 40 Z" fill="#2E7D32" stroke="#1B5E20" strokeWidth="1" />
          <path d="M 154 40 C 158 26, 168 28, 166 38 Z" fill="#4CAF50" />
          {/* Dewdrop on leaf */}
          <circle cx="166" cy="36" r="1.5" fill="#E0F2FE" />
        </motion.g>

        {/* Bamboo Cane Sparkle */}
        <motion.polygon
          points="100,24 102,27 105,28 102,29 100,32 98,29 95,28 98,27"
          fill="#4CAF50"
          animate={reduceMotion ? undefined : { scale: [0.6, 1.4, 0.6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          style={{ transformOrigin: '100px 28px' }}
        />
      </svg>
      {showLabel && (
        <span className="text-[10px] font-extrabold tracking-wider uppercase text-emerald-800 mt-1 bg-emerald-700/15 px-3 py-1 rounded-full border border-emerald-700/30 shadow-xs group-hover:bg-emerald-700 group-hover:text-white transition-all transform group-hover:scale-105">
          🎋 Venu Shilp • Bamboo & Cane
        </span>
      )}
    </div>
  );
}

/**
 * 7. ARTISAN MARGIN SHOWCASE STRIP (Left / Right Margins on ultra-wide screens)
 */
export function ArtisanMarginShowcase({ side = 'left' }) {
  return (
    <div
      className={`hidden 2xl:flex flex-col items-center fixed ${
        side === 'left' ? 'left-3' : 'right-3'
      } top-20 bottom-6 z-0 pointer-events-auto select-none space-y-4 max-h-[88vh] overflow-y-auto no-scrollbar py-2 opacity-95 hover:opacity-100 transition-opacity`}
    >
      {side === 'left' ? (
        <>
          <motion.div whileHover={{ scale: 1.08, rotate: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-amber-50/90 to-orange-50/80 border border-terracotta/30 shadow-sm">
              <PotterArtisanSketch size={135} />
            </div>
          </motion.div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <motion.div whileHover={{ scale: 1.08, rotate: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-amber-50/90 to-yellow-50/80 border border-turmeric/35 shadow-sm">
              <WeaverLoomSketch size={135} />
            </div>
          </motion.div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <motion.div whileHover={{ scale: 1.08, rotate: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-rose-50/90 to-pink-50/80 border border-madder/30 shadow-sm">
              <EmbroideryNeedleSketch size={135} />
            </div>
          </motion.div>
        </>
      ) : (
        <>
          <motion.div whileHover={{ scale: 1.08, rotate: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-indigo-50/90 to-sky-50/80 border border-indigonight/30 shadow-sm">
              <FolkPainterSketch size={135} />
            </div>
          </motion.div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <motion.div whileHover={{ scale: 1.08, rotate: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-orange-50/90 to-amber-50/80 border border-bronze/35 shadow-sm">
              <WoodCarverSketch size={135} />
            </div>
          </motion.div>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />
          <motion.div whileHover={{ scale: 1.08, rotate: 2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <div className="p-2 rounded-2xl bg-gradient-to-b from-emerald-50/90 to-green-50/80 border border-emerald-700/30 shadow-sm">
              <BambooBasketSketch size={135} />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
