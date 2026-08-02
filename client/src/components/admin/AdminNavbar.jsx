import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaBell,
  FaSun,
  FaMoon,
  FaBars,
  FaCheck,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_NOTIFICATIONS } from '../../data/adminData';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ({ onToggleMobileSidebar, isMobileSidebarOpen }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border px-4 sm:px-6 shadow-sm">
      {/* Left side: Mobile Toggle & Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-paper text-dark dark:text-white hover:bg-primary hover:text-white transition-colors"
          title="Toggle Navigation Drawer"
        >
          {isMobileSidebarOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
        </button>

        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-3 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search orders, customers, dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper pl-10 pr-4 py-2 text-xs text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-paper text-dark dark:text-white hover:text-secondary transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {isDarkMode ? <FaSun className="text-secondary" size={16} /> : <FaMoon className="text-slate-700" size={16} />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-dark-paper text-dark dark:text-white hover:text-primary transition-colors"
            title="Notifications"
          >
            <FaBell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl p-4 z-50"
              >
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="rounded-full bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <button onClick={markAllRead} className="text-[11px] text-primary font-semibold hover:underline">
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 rounded-2xl border text-xs transition-colors ${
                        n.read
                          ? 'bg-gray-50 dark:bg-dark-paper/40 border-gray-100 dark:border-dark-border/40 text-customGray'
                          : 'bg-primary/5 dark:bg-primary/10 border-primary/20 text-dark dark:text-white font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">{n.title}</span>
                        <span className="text-[10px] text-customGray">{n.time}</span>
                      </div>
                      <p className="text-[11px] mt-1 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-paper transition-colors"
          >
            <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm uppercase ring-2 ring-primary/40">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-montserrat text-xs font-bold text-dark dark:text-white truncate">
                {user?.name || 'Executive Admin'}
              </span>
              <span className="text-[9px] text-primary font-bold uppercase">Executive Administrator</span>
            </div>
          </button>

          {/* User Dropdown */}
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl p-2 z-50"
              >
                <Link
                  to="/admin/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-dark dark:text-white hover:bg-gray-100 dark:hover:bg-dark-paper transition-colors"
                >
                  <FaCog className="text-gray-400" /> Account Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <FaSignOutAlt /> Log Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
