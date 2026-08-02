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
  FaSignOutAlt
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

const AdminSidebar = ({ isCollapsed, onToggle }) => {
  const { logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogout = () => {
    logoutAdmin();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-30 flex flex-col justify-between bg-dark dark:bg-dark-paper border-r border-dark-border transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div>
        {/* Header Logo */}
        <div className="flex items-center justify-between p-5 border-b border-dark-border">
          {!isCollapsed ? (
            <ThinNationLogo size="sm" />
          ) : (
            <ThinNationLogo size="sm" />
          )}

          <button
            onClick={onToggle}
            className="flex h-7 w-7 items-center justify-center rounded-xl bg-dark-card text-gray-400 hover:text-white transition-colors"
          >
            <FaChevronLeft className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} size={12} />
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
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-dark-border">
        <button
          onClick={handleAdminLogout}
          className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
        >
          <FaSignOutAlt size={16} className="flex-shrink-0" />
          {!isCollapsed && <span>Logout Panel</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
