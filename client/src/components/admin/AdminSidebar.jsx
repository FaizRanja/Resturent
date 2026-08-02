import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaChartPie,
  FaShoppingBag,
  FaUsers,
  FaCalendarAlt,
  FaPizzaSlice,
  FaTags,
  FaStar,
  FaTicketAlt,
  FaChartLine,
  FaCog,
  FaChevronLeft,
  FaSignOutAlt,
  FaTimes
} from 'react-icons/fa';
import ThinNationLogo from '../ThinNationLogo';
import { useAuth } from '../../context/AuthContext';

const ADMIN_NAV = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: FaChartPie },
  { path: '/admin/orders', label: 'Orders', icon: FaShoppingBag },
  { path: '/admin/customers', label: 'Customers', icon: FaUsers },
  { path: '/admin/reservations', label: 'Reservations', icon: FaCalendarAlt },
  { path: '/admin/menu', label: 'Menu Items', icon: FaPizzaSlice },
  { path: '/admin/categories', label: 'Categories', icon: FaTags },
  { path: '/admin/reviews', label: 'Reviews', icon: FaStar },
  { path: '/admin/offers', label: 'Offers & Coupons', icon: FaTicketAlt },
  { path: '/admin/analytics', label: 'Analytics', icon: FaChartLine },
  { path: '/admin/settings', label: 'Settings', icon: FaCog },
];

const AdminSidebar = ({ isCollapsed, onToggleCollapse, isMobileOpen, onCloseMobile }) => {
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    logoutAdmin();
    if (onCloseMobile) onCloseMobile();
    navigate('/login');
  };

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Admin Sidebar Drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 flex flex-col justify-between bg-dark dark:bg-dark-paper border-r border-dark-border transition-all duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          isMobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header Logo & Close/Collapse controls */}
          <div className="flex items-center justify-between p-5 border-b border-dark-border">
            <ThinNationLogo size="sm" />

            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex h-7 w-7 items-center justify-center rounded-xl bg-dark-card text-gray-400 hover:text-white transition-colors"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              <FaChevronLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} size={12} />
            </button>

            {/* Mobile Drawer Close (X) Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
              title="Close Menu"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Admin Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'text-gray-400 hover:bg-dark-card hover:text-white'
                    }`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className={`${isCollapsed ? 'lg:hidden' : 'inline'} truncate`}>
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t border-dark-border">
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <FaSignOutAlt size={16} className="flex-shrink-0" />
            <span className={`${isCollapsed ? 'lg:hidden' : 'inline'}`}>Logout Panel</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
