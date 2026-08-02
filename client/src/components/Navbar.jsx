import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaShoppingBag,
  FaHeart,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
  FaShieldAlt
} from 'react-icons/fa';

import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ThinNationLogo from './ThinNationLogo';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/menu', label: 'Menu' },
  { path: '/about', label: 'About' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/reviews', label: 'Reviews' },
  { path: '/reservation', label: 'Book Table' },
  { path: '/offers', label: 'Offers' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = ({ onOpenSearch, onSelectDish }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useTheme();
  const { totalItemsCount, toggleCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-xl'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Thin Nation Vector Logo */}
          <Link to="/" className="flex-shrink-0">
            <ThinNationLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/80 dark:bg-dark-card/80 px-3 py-1.5 rounded-full border border-gray-200/50 dark:border-dark-border/50 backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-bold transition-all rounded-full whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-dark/90 dark:text-white/90 hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-primary rounded-full shadow-md -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth Profile Buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Trigger - Always Visible */}
            <button
              onClick={onOpenSearch}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-card text-dark dark:text-white hover:bg-primary hover:text-white transition-colors"
              title="Search Menu"
            >
              <FaSearch size={14} />
            </button>

            {/* Wishlist Link - Desktop Only */}
            <Link
              to="/wishlist"
              className="hidden xl:flex relative h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-card text-dark dark:text-white hover:bg-primary hover:text-white transition-colors"
              title="Favorite Dishes"
            >
              <FaHeart size={14} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-white shadow-md animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger - Always Visible */}
            <button
              onClick={toggleCart}
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-dark transition-all transform hover:scale-105"
              title="Shopping Cart"
            >
              <FaShoppingBag size={14} />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-dark text-[10px] font-extrabold text-secondary shadow-md">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Theme Toggle - Desktop Only */}
            <button
              onClick={toggleTheme}
              className="hidden xl:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-card text-dark dark:text-white hover:text-secondary transition-colors"
              title={isDarkMode ? 'Switch Light Mode' : 'Switch Dark Mode'}
            >
              {isDarkMode ? <FaSun size={15} className="text-secondary" /> : <FaMoon size={14} />}
            </button>

            {/* User Profile Badge or Login - Desktop Only */}
            {user ? (
              <div className="hidden xl:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-dark-card p-1 pr-3 text-xs font-bold text-dark dark:text-white hover:bg-gray-200 dark:hover:bg-dark-paper transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-2 shadow-2xl z-50">
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-dark-border">
                      <p className="text-xs font-bold text-dark dark:text-white truncate">{user.name}</p>
                      <p className="text-[10px] text-customGray truncate">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-extrabold uppercase">
                        {user.role}
                      </span>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors mt-1"
                      >
                        <FaShieldAlt size={13} /> Executive Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full mt-1 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <FaSignOutAlt size={13} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden xl:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-2xl text-xs font-bold text-dark dark:text-white hover:text-primary transition-colors whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl bg-primary hover:bg-primary-dark text-white px-4 py-2 text-xs font-bold shadow-md shadow-primary/20 transition-all whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
              className="xl:hidden flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-card text-dark dark:text-white"
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white/95 dark:bg-dark/95 backdrop-blur-2xl border-b border-gray-200 dark:border-dark-border px-4 py-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                    location.pathname === link.path
                      ? 'bg-primary text-white shadow-md'
                      : 'text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Saved Favorites in Drawer */}
              <Link
                to="/wishlist"
                className="px-4 py-3 rounded-2xl text-sm font-bold text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-dark-card flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <FaHeart className="text-primary" size={14} /> Saved Favorites
                </span>
                {wishlistCount > 0 && <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">{wishlistCount}</span>}
              </Link>

              {/* Dark Mode Toggle in Drawer */}
              <button
                onClick={toggleTheme}
                className="px-4 py-3 rounded-2xl text-sm font-bold text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-dark-card flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  {isDarkMode ? <FaSun size={15} className="text-secondary" /> : <FaMoon size={15} />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">Switch theme</span>
              </button>

              <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex flex-col gap-2">
                {!user ? (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-dark-card text-dark dark:text-white py-3 text-xs font-bold"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-2xl bg-primary text-white py-3 text-xs font-bold shadow-md"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {user.role === 'admin' && (
                      <Link
                        to="/admin/dashboard"
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-500 text-white py-3 text-xs font-bold shadow-md"
                      >
                        <FaShieldAlt size={13} /> Executive Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-rose-500 text-white py-3 text-xs font-bold shadow-md"
                    >
                      <FaSignOutAlt /> Sign Out ({user.name})
                    </button>
                  </div>
                )}

                <Link
                  to="/order"
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-dark text-white py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-lg"
                >
                  Order Online Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
