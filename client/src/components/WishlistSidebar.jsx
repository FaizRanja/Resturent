import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistSidebar = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (dish) => {
    addToCart(dish, 1);
    toggleWishlist(dish); // remove from wishlist after moving
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative flex h-full w-full max-w-md flex-col justify-between bg-white dark:bg-dark-card border-l border-gray-100 dark:border-dark-border shadow-2xl p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <FaHeart size={16} />
              </div>
              <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white">
                Saved Favorites ({wishlistItems.length})
              </h3>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-paper text-gray-500 hover:text-primary transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="my-4 flex-1 overflow-y-auto space-y-4 pr-1">
            {wishlistItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FaHeart className="text-gray-300 dark:text-dark-paper text-5xl mb-3" />
                <p className="font-montserrat font-bold text-dark dark:text-white text-base">Your wishlist is empty</p>
                <p className="text-xs text-customGray mt-1 mb-4">Tap the heart icon on any dish to save it for later.</p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-dark-paper/60 border border-gray-100 dark:border-dark-border/40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-montserrat text-xs font-bold text-dark dark:text-white truncate">
                      {item.name}
                    </h4>
                    <span className="font-montserrat text-sm font-extrabold text-primary block mt-0.5">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-1 rounded-xl bg-primary text-white px-3 py-2 text-xs font-bold shadow-md hover:bg-primary-dark transition-colors"
                    >
                      <FaShoppingCart size={11} /> Move
                    </button>
                    <button
                      onClick={() => toggleWishlist(item)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                      title="Remove"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 dark:border-dark-border pt-4">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper text-dark dark:text-white py-3 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WishlistSidebar;
