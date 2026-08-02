import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaThLarge, FaList, FaPepperHot, FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import DishCard from '../components/DishCard';
import { useCart } from '../context/CartContext';

const Menu = ({ onQuickView, onOpenSearch }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpenMobile, setIsFilterOpenMobile] = useState(false);

  const { addToCart } = useCart();

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const filteredDishes = useMemo(() => {
    return MENU_ITEMS.filter((dish) => {
      const matchCategory = selectedCategory === 'all' || dish.category === selectedCategory;
      const matchSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = dish.price <= maxPrice;

      return matchCategory && matchSearch && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [selectedCategory, searchQuery, maxPrice, sortBy]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Thin Nation Menu</span>
          <h1 className="font-montserrat text-3xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Our Signature Menu Catalog
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Explore Thin Nation famous thin-crust pizzas, Alfredo pasta bombs, loaded calzones, and specialty drinks.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-card p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-md">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpenMobile(prev => !prev)}
              className="flex md:hidden items-center gap-2 rounded-2xl bg-gray-100 dark:bg-dark-paper px-4 py-2.5 text-xs font-bold text-dark dark:text-white"
            >
              <FaFilter className="text-primary" /> Filter
            </button>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs font-bold text-dark dark:text-white focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            {/* Grid / List Switcher */}
            <div className="flex items-center bg-gray-100 dark:bg-dark-paper p-1 rounded-2xl border border-gray-200 dark:border-dark-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-xl text-xs transition-colors ${viewMode === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-gray-400'}`}
              >
                <FaThLarge size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-xl text-xs transition-colors ${viewMode === 'list' ? 'bg-primary text-white shadow-sm' : 'text-gray-400'}`}
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Filters */}
          <div className={`lg:block ${isFilterOpenMobile ? 'block' : 'hidden'} space-y-6`}>
            <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-md">
              <h3 className="font-montserrat text-sm font-bold text-dark dark:text-white mb-4 flex items-center justify-between">
                <span>Categories</span>
                <span className="text-[10px] text-primary font-bold">({CATEGORIES.length})</span>
              </h3>

              <div className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-md'
                          : 'text-customGray hover:bg-gray-50 dark:hover:bg-dark-paper hover:text-dark dark:hover:text-white'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 dark:bg-dark-paper text-gray-500'}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Price Filter Slider */}
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border">
                <div className="flex items-center justify-between text-xs font-bold text-dark dark:text-white mb-2">
                  <span>Max Price:</span>
                  <span className="text-primary font-montserrat">Rs. {maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="2500"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary bg-gray-200 dark:bg-dark-paper rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-customGray mt-1">
                  <span>Rs. 80</span>
                  <span>Rs. 2,500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Menu Dishes Container */}
          <div className="lg:col-span-3">
            {filteredDishes.length === 0 ? (
              <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-12 text-center">
                <FaFilter className="text-gray-300 text-5xl mx-auto mb-3" />
                <h3 className="font-montserrat font-bold text-dark dark:text-white text-lg">No dishes found</h3>
                <p className="text-xs text-customGray mt-1">Try adjusting your category filter, price limit or search query.</p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setMaxPrice(2500); }}
                  className="mt-4 rounded-xl bg-primary text-white px-5 py-2.5 text-xs font-bold shadow-md"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard key={dish.id} dish={dish} onQuickView={onQuickView} />
                ))}
              </div>
            ) : (
              /* List View Layout */
              <div className="space-y-4">
                {filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-md hover:shadow-xl transition-all"
                  >
                    <img src={dish.image} alt={dish.name} className="h-32 w-full sm:w-36 rounded-2xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase text-primary tracking-widest">{dish.category}</span>
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                          <FaStar size={12} /> <span>{dish.rating}</span>
                        </div>
                      </div>
                      <h3 className="font-montserrat text-base font-bold text-dark dark:text-white truncate">{dish.name}</h3>
                      <p className="text-xs text-customGray line-clamp-2 mt-1">{dish.description}</p>
                      <div className="mt-2 font-montserrat text-lg font-extrabold text-primary">Rs. {dish.price.toLocaleString()}</div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onQuickView(dish)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-gray-100 dark:bg-dark-paper px-4 py-2.5 text-xs font-bold text-dark dark:text-white hover:bg-primary hover:text-white transition-colors"
                      >
                        <FaEye /> Quick View
                      </button>
                      <button
                        onClick={() => addToCart(dish, 1)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-primary-dark text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-primary/20 transition-all"
                      >
                        <FaShoppingCart /> Add Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Menu;
