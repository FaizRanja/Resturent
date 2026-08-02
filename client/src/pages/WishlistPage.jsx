import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaArrowRight, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import DishCard from '../components/DishCard';

const WishlistPage = ({ onQuickView }) => {
  const { wishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-1.5">
              <FaHeart className="text-primary" /> Saved Favorites
            </span>
            <h1 className="font-montserrat text-3xl sm:text-5xl font-black text-dark dark:text-white mt-1">
              Your Favorite Thin Nation Dishes
            </h1>
            <p className="text-xs sm:text-sm text-customGray mt-2">
              All your bookmarked pizzas, pasta bombs, calzones, and drinks in one place.
            </p>
          </div>

          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 rounded-2xl bg-gray-100 dark:bg-dark-card text-xs font-bold text-gray-500 hover:text-red-500 px-4 py-2.5 transition-colors"
            >
              <FaTrash size={12} /> Clear All Favorites
            </button>
          )}
        </div>

        {/* Wishlist Items Content */}
        {wishlistItems.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-12 text-center max-w-lg mx-auto shadow-xl">
            <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <FaHeart size={30} />
            </div>
            <h3 className="font-montserrat font-bold text-dark dark:text-white text-xl">No Favorites Saved Yet</h3>
            <p className="text-xs text-customGray mt-1 mb-6">Explore Thin Nation menu and click the heart icon on any dish to save your favorites.</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-6 py-3.5 text-xs font-bold shadow-lg shadow-primary/25 transition-all"
            >
              <span>Explore Signature Menu</span>
              <FaArrowRight size={13} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((dish) => (
              <DishCard key={dish.id} dish={dish} onQuickView={onQuickView} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default WishlistPage;
