import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHome, FaSearch, FaArrowRight } from 'react-icons/fa';

const NotFound = ({ onOpenSearch }) => {
  return (
    <div className="pt-28 pb-20 min-h-[85vh] flex items-center justify-center bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-flex items-center justify-center h-32 w-32 rounded-full bg-primary/10 text-primary mb-6"
        >
          <FaUtensils size={56} />
          <span className="absolute -top-2 -right-2 rounded-full bg-secondary text-dark text-xs font-black px-3 py-1 shadow-lg">
            404
          </span>
        </motion.div>

        <h1 className="font-montserrat text-4xl sm:text-6xl font-black text-dark dark:text-white">
          Recipe Not Found
        </h1>
        <p className="text-xs sm:text-sm text-customGray mt-3 leading-relaxed max-w-md mx-auto">
          Oops! The culinary page or secret recipe you are looking for has been moved or consumed by our guests.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 transition-all transform hover:scale-105"
          >
            <FaHome size={14} /> Back to Homepage
          </Link>

          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-dark dark:text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-lg hover:border-primary transition-all transform hover:scale-105"
          >
            <FaSearch size={14} /> Search Menu Catalog
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
