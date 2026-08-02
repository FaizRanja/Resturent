import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart, FaEye, FaPepperHot, FaClock } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const DishCard = ({ dish, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(dish.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border/60 shadow-lg hover:shadow-2xl hover:shadow-primary/10 overflow-hidden transition-all"
    >
      {/* Image Header with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-dark-paper">
        <img
          src={dish.image}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={() => onQuickView(dish)}
            className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-dark-card/90 text-dark dark:text-white px-4 py-2.5 text-xs font-semibold shadow-lg backdrop-blur-md hover:bg-primary hover:text-white transition-all transform hover:scale-105"
          >
            <FaEye size={14} /> Quick View
          </button>
        </div>

        {/* Badges top left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {dish.isChefSpecial && (
            <span className="rounded-full bg-gradient-to-r from-primary to-orange-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
              Chef Special
            </span>
          )}
          {dish.isNew && (
            <span className="rounded-full bg-secondary text-dark px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-md">
              New Arrival
            </span>
          )}
          {dish.isPopular && !dish.isChefSpecial && (
            <span className="rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30 shadow-md">
              Popular
            </span>
          )}
        </div>

        {/* Wishlist Button top right */}
        <button
          onClick={() => toggleWishlist(dish)}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 dark:bg-dark-card/80 backdrop-blur-md text-gray-700 dark:text-gray-200 shadow-md transition-all hover:scale-110 hover:bg-white dark:hover:bg-dark-card"
        >
          {isFav ? (
            <FaHeart className="text-primary" size={16} />
          ) : (
            <FaRegHeart className="hover:text-primary transition-colors" size={16} />
          )}
        </button>
      </div>

      {/* Card Details Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
            <FaStar size={13} />
            <span>{dish.rating.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({dish.reviewsCount})</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-customGray">
            <span className="flex items-center gap-1">
              <FaClock size={11} /> {dish.prepTime}
            </span>
            {dish.spicyLevel > 0 && (
              <span className="flex items-center text-red-500 font-medium">
                <FaPepperHot size={11} className="mr-0.5" />
                {dish.spicyLevel > 1 ? 'Spicy' : 'Mild'}
              </span>
            )}
          </div>
        </div>

        <h3 className="font-montserrat text-base font-bold text-dark dark:text-white line-clamp-1 group-hover:text-primary transition-colors">
          {dish.name}
        </h3>

        <p className="mt-1.5 text-xs text-customGray line-clamp-2 leading-relaxed flex-1">
          {dish.description}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-dark-border/40 pt-3.5">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-customGray font-medium">Price</span>
            <span className="font-montserrat text-base font-extrabold text-primary">
              Rs. {dish.price.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => addToCart(dish, 1)}
            className="flex items-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-primary/20 hover:shadow-lg transition-all active:scale-95"
          >
            <FaShoppingCart size={13} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DishCard;
