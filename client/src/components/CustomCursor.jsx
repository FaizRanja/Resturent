import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  const ringX = useSpring(0, { stiffness: 200, damping: 20 });
  const ringY = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/laptop)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      // Check if target is interactive (button, link, input)
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center Precision Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full bg-primary shadow-glow"
        style={{
          x: cursorX,
          y: cursorY,
          width: 8,
          height: 8,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none rounded-full border-2 border-primary/60 dark:border-primary/80 backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? 'rgba(255, 87, 34, 0.15)' : 'rgba(255, 87, 34, 0)',
          borderColor: isHovered ? 'rgba(255, 87, 34, 1)' : 'rgba(255, 87, 34, 0.5)',
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
