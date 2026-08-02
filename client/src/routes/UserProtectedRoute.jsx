import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCookie } from '../utils/cookie';

const UserProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const token = getCookie('thin_nation_token');
  const location = useLocation();

  // 1. If not logged in, redirect to /login
  if (!user && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. If logged in as Admin, redirect directly to Executive Admin Dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 3. Normal customer user gets access to storefront pages
  return children;
};

export default UserProtectedRoute;
