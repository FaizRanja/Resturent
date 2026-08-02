import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaStar, FaArrowRight } from 'react-icons/fa';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';

const SearchModal = ({ isOpen, onClose, onSelectDish }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const filteredDishes = searchTerm.trim() === ''
    ? MENU_ITEMS.slice(0, 4)
    : MENU_ITEMS.filter(dish =>
        dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dish.category.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:pt-20 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl p-6"
        >
          {/* Header & input */}
          <div className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-dark-border pb-4">
            <div className="relative flex-1 flex items-center">
              <FaSearch className="absolute left-4 text-gray-400" size={18} />
              <input
                type="text"
                autoFocus
                placeholder="Search pizzas, burgers, pasta, desserts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl bg-gray-100 dark:bg-dark-paper pl-12 pr-4 py-3.5 text-sm text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-paper text-gray-500 hover:text-primary transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Results section */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            <div className="flex items-center justify-between text-xs text-customGray font-medium px-1">
              <span>{searchTerm.trim() ? `Search Results (${filteredDishes.length})` : 'Popular Recommendations'}</span>
            </div>

            {filteredDishes.length === 0 ? (
              <div className="py-12 text-center text-customGray">
                <p className="text-sm font-semibold">No dishes found matching "{searchTerm}"</p>
                <p className="text-xs mt-1">Try searching for 'truffle', 'burger', or 'cocktail'</p>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-dark-paper/60 hover:bg-gray-100 dark:hover:bg-dark-paper transition-all group"
                >
                  <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => { onSelectDish(dish); onClose(); }}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {dish.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-customGray">
                        <span className="capitalize font-medium text-primary">{dish.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-400">
                          <FaStar size={11} /> {dish.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-montserrat text-sm font-extrabold text-primary">
                      ${dish.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => addToCart(dish, 1)}
                      className="rounded-xl bg-primary text-white p-2.5 hover:bg-primary-dark transition-colors"
                      title="Add to Cart"
                    >
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
