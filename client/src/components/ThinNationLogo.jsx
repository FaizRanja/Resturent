import React from 'react';
import { motion } from 'framer-motion';

const ThinNationLogo = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'h-9 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-20 w-auto',
    xl: 'h-28 w-auto',
  };

  const heightClass = sizeMap[size] || sizeMap.md;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      <svg
        viewBox="0 0 320 220"
        className={`${heightClass} drop-shadow-xl overflow-visible`}
      >
        <defs>
          {/* 3D Drop Shadow & Lighting Gradients */}
          <filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.8" />
          </filter>
          
          <linearGradient id="redLightning" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A2A" />
            <stop offset="100%" stopColor="#D90429" />
          </linearGradient>

          <linearGradient id="redNation" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF3B30" />
            <stop offset="100%" stopColor="#B30000" />
          </linearGradient>

          <linearGradient id="whiteThin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* Outer Dark Shield Frame & Red Accent Arc */}
        <g filter="url(#shadow3d)">
          {/* Main Shield Outline */}
          <path
            d="M 50 40 Q 160 10 270 40 Q 285 45 285 65 L 285 145 C 285 160 275 165 260 170 C 200 190 120 190 60 170 C 45 165 35 160 35 145 L 35 65 C 35 45 35 45 50 40 Z"
            fill="#121214"
            stroke="#2A2A2E"
            strokeWidth="5"
          />

          {/* Top Double Red Arch Lines */}
          <path
            d="M 60 48 Q 160 22 260 48"
            fill="none"
            stroke="#D90429"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M 75 58 Q 160 36 245 58"
            fill="none"
            stroke="#D90429"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Red Lightning Bolt Emblem at Top Center */}
          <path
            d="M 172 10 L 140 68 L 165 68 L 135 110 L 180 50 L 155 50 Z"
            fill="url(#redLightning)"
            stroke="#000000"
            strokeWidth="3"
            filter="drop-shadow(0px 4px 6px rgba(217,4,41,0.6))"
          />

          {/* Bold White 3D Text: THIN */}
          <text
            x="160"
            y="108"
            textAnchor="middle"
            fill="url(#whiteThin)"
            stroke="#000000"
            strokeWidth="4"
            paintOrder="stroke fill"
            fontFamily="Montserrat, Arial Black, sans-serif"
            fontWeight="900"
            fontSize="54"
            letterSpacing="3"
          >
            THIN
          </text>

          {/* Bold 3D Red Text: NATION */}
          <text
            x="160"
            y="160"
            textAnchor="middle"
            fill="url(#redNation)"
            stroke="#000000"
            strokeWidth="5"
            paintOrder="stroke fill"
            fontFamily="Montserrat, Arial Black, sans-serif"
            fontWeight="900"
            fontSize="58"
            letterSpacing="2"
          >
            NATION
          </text>

          {/* Bottom Curved Sub-Banner with Stars */}
          <path
            d="M 55 178 Q 160 196 265 178"
            fill="none"
            stroke="#D90429"
            strokeWidth="2"
          />

          {/* Bottom Tagline Text: ★ THIN CRUST, BIG FLAVOR. ★ */}
          <text
            x="160"
            y="192"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="Montserrat, sans-serif"
            fontWeight="800"
            fontSize="12"
            letterSpacing="2.5"
          >
            ★ THIN CRUST, BIG FLAVOR. ★
          </text>
        </g>
      </svg>
    </motion.div>
  );
};

export default ThinNationLogo;
