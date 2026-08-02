import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaTimes, FaExpand } from 'react-icons/fa';
import { GALLERY_ITEMS } from '../data/restaurantData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredGallery = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Visual Culinary Vibe</span>
          <h1 className="font-montserrat text-4xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Our Gallery & Atmosphere
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Immerse yourself in our open wood-fired kitchen, romantic ambient halls, and handcrafted signature dishes.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'food', label: 'Artisanal Food' },
              { id: 'interior', label: 'Interior & Vibe' },
              { id: 'kitchen', label: 'Woodfired Kitchen' },
              { id: 'events', label: 'Private Gala' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-customGray hover:text-dark dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-3xl bg-dark-paper aspect-[4/3] shadow-lg cursor-pointer"
                onClick={() => setLightboxImage(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                    {item.category}
                  </span>
                  <h3 className="font-montserrat text-base font-bold text-white mt-0.5">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <FaExpand size={12} /> <span>Click to Enlarge</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImage && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-dark-card border border-dark-border shadow-2xl"
              >
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-primary transition-colors"
                >
                  <FaTimes size={16} />
                </button>
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="max-h-[75vh] w-full object-contain bg-black"
                />
                <div className="p-6 bg-dark-card text-white flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-primary">{lightboxImage.category}</span>
                    <h3 className="font-montserrat text-lg font-bold">{lightboxImage.title}</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
