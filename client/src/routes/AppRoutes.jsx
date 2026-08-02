import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { PageLoader } from '../components/Loader';
import ProtectedRoute from './ProtectedRoute';
import UserProtectedRoute from './UserProtectedRoute';
import { useAuth } from '../context/AuthContext';

// Lazy Loaded Customer Pages
const Home = lazy(() => import('../pages/Home'));
const Menu = lazy(() => import('../pages/Menu'));
const AboutUs = lazy(() => import('../pages/AboutUs'));
const Gallery = lazy(() => import('../pages/Gallery'));
const Reviews = lazy(() => import('../pages/Reviews'));
const Reservation = lazy(() => import('../pages/Reservation'));
const Contact = lazy(() => import('../pages/Contact'));
const OrderOnline = lazy(() => import('../pages/OrderOnline'));
const Offers = lazy(() => import('../pages/Offers'));
const WishlistPage = lazy(() => import('../pages/WishlistPage'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Lazy Loaded Admin Pages
const AdminLogin = lazy(() => import('../pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
const AdminReservations = lazy(() => import('../pages/admin/AdminReservations'));
const AdminMenuManagement = lazy(() => import('../pages/admin/AdminMenuManagement'));
const AdminCategories = lazy(() => import('../pages/admin/AdminCategories'));
const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));
const AdminOffers = lazy(() => import('../pages/admin/AdminOffers'));
const AdminAnalytics = lazy(() => import('../pages/admin/AdminAnalytics'));
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));

const AppRoutes = ({ onQuickView, onOpenSearch }) => {
  const { user } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Login & Register Routes (Redirects based on role) */}
        <Route
          path="/login"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <PageWrapper><Login /></PageWrapper>
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <PageWrapper><Register /></PageWrapper>
            )
          }
        />

        {/* Customer Storefront Protected Routes */}
        <Route path="/" element={<UserProtectedRoute><PageWrapper><Home onQuickView={onQuickView} /></PageWrapper></UserProtectedRoute>} />
        <Route path="/menu" element={<UserProtectedRoute><PageWrapper><Menu onQuickView={onQuickView} onOpenSearch={onOpenSearch} /></PageWrapper></UserProtectedRoute>} />
        <Route path="/about" element={<UserProtectedRoute><PageWrapper><AboutUs /></PageWrapper></UserProtectedRoute>} />
        <Route path="/gallery" element={<UserProtectedRoute><PageWrapper><Gallery /></PageWrapper></UserProtectedRoute>} />
        <Route path="/reviews" element={<UserProtectedRoute><PageWrapper><Reviews /></PageWrapper></UserProtectedRoute>} />
        <Route path="/reservation" element={<UserProtectedRoute><PageWrapper><Reservation /></PageWrapper></UserProtectedRoute>} />
        <Route path="/contact" element={<UserProtectedRoute><PageWrapper><Contact /></PageWrapper></UserProtectedRoute>} />
        <Route path="/order" element={<UserProtectedRoute><PageWrapper><OrderOnline /></PageWrapper></UserProtectedRoute>} />
        <Route path="/offers" element={<UserProtectedRoute><PageWrapper><Offers /></PageWrapper></UserProtectedRoute>} />
        <Route path="/wishlist" element={<UserProtectedRoute><PageWrapper><WishlistPage onQuickView={onQuickView} /></PageWrapper></UserProtectedRoute>} />

        {/* Admin Portal Routes */}
        <Route path="/admin/login" element={<Navigate to="/login" replace />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="menu" element={<AdminMenuManagement />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="offers" element={<AdminOffers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<PageWrapper><NotFound onOpenSearch={onOpenSearch} /></PageWrapper>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
