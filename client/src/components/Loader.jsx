import React from 'react';
import { motion } from 'framer-motion';
import ThinNationLogo from './ThinNationLogo';

const Loader = ({ fullScreen = true, message = 'Preparing Thin Nation Delights...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-8 p-8 text-center select-none">
      {/* Animated Glowing Official 3D Shield Logo */}
      <motion.div
        animate={{
          scale: [0.96, 1.04, 0.96],
          filter: [
            'drop-shadow(0px 0px 15px rgba(217, 4, 41, 0.4))',
            'drop-shadow(0px 0px 35px rgba(217, 4, 41, 0.9))',
            'drop-shadow(0px 0px 15px rgba(217, 4, 41, 0.4))',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center"
      >
        <ThinNationLogo size="xl" />

        {/* Pulsing Lightning Outer Ring Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-8 rounded-full border-2 border-transparent border-t-red-600 border-r-amber-400 pointer-events-none"
        />
      </motion.div>

      {/* Loading Status Tagline */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-red-500 animate-pulse">
          <span>⚡</span>
          <span>{message}</span>
          <span>⚡</span>
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Thin Crust, Big Flavor • Faisal Town, Lahore
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl">
        {content}
      </div>
    );
  }

  return content;
};

export const PageLoader = () => <Loader fullScreen={true} message="Loading Page..." />;

export default Loader;
