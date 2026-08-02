import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaStar, FaShoppingCart, FaHeart, FaRegHeart, FaClock, FaFire } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = ({ dish, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!dish) return null;
  const isFav = isInWishlist(dish.id);

  const handleAddToCart = () => {
    addToCart(dish, quantity, specialNotes);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-primary transition-colors backdrop-blur-md"
          >
            <FaTimes size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image section */}
            <div className="relative h-64 md:h-full min-h-[280px] bg-gray-900">
              <img
                src={dish.image}
                alt={dish.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">
                  {dish.category}
                </span>
                <h3 className="text-xl font-bold font-montserrat text-white mt-1">
                  {dish.name}
                </h3>
              </div>
            </div>

            {/* Details section */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1 text-amber-400 font-semibold text-sm">
                    <FaStar />
                    <span>{dish.rating}</span>
                    <span className="text-gray-400 font-normal">({dish.reviewsCount} reviews)</span>
                  </div>
                  <button
                    onClick={() => toggleWishlist(dish)}
                    className="flex items-center gap-1.5 text-xs text-customGray hover:text-primary transition-colors"
                  >
                    {isFav ? <FaHeart className="text-primary" /> : <FaRegHeart />}
                    <span>{isFav ? 'In Wishlist' : 'Add Wishlist'}</span>
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-4 text-xs text-customGray">
                  <span className="flex items-center gap-1"><FaClock className="text-primary" /> {dish.prepTime}</span>
                  <span className="flex items-center gap-1"><FaFire className="text-amber-500" /> {dish.calories}</span>
                </div>

                <p className="mt-4 text-sm text-customGray leading-relaxed">
                  {dish.description}
                </p>

                {/* Ingredients tags */}
                {dish.ingredients && (
                  <div className="mt-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300">
                      Key Ingredients
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {dish.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gray-100 dark:bg-dark-paper text-gray-700 dark:text-gray-300 px-3 py-1 text-[11px] font-medium"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special instructions */}
                <div className="mt-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Extra garlic sauce, no olives, pan crust"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-3.5 py-2 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Quantity and Add to Cart action */}
              <div className="mt-6 border-t border-gray-100 dark:border-dark-border pt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 bg-gray-100 dark:bg-dark-paper p-1.5 rounded-xl border border-gray-200 dark:border-dark-border">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-dark-card flex items-center justify-center font-bold text-dark dark:text-white shadow-sm hover:text-primary"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-sm text-dark dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="h-8 w-8 rounded-lg bg-white dark:bg-dark-card flex items-center justify-center font-bold text-dark dark:text-white shadow-sm hover:text-primary"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase text-customGray font-medium block">Total Price</span>
                    <span className="font-montserrat text-xl font-extrabold text-primary">
                      Rs. {(dish.price * quantity).toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white py-3.5 text-sm font-bold shadow-lg shadow-primary/25 transition-all"
                >
                  <FaShoppingCart /> Add to Cart (Rs. {(dish.price * quantity).toLocaleString()})
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
