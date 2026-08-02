import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (stagger = 0.08) => ({
    opacity: 1,
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 35, rotateX: -45 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 120,
    },
  },
};

const TextReveal = ({ text, className = '', stagger = 0.06 }) => {
  const words = text.split(' ');

  return (
    <motion.span
      variants={containerVariants}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] ${className}`}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={wordVariants} className="inline-block transform-gpu">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
