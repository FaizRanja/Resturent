import React, { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import WishlistSidebar from './components/WishlistSidebar';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import BackToTop from './components/BackToTop';
import CustomCursor from './components/CustomCursor';
import AppRoutes from './routes/AppRoutes';

const AppContent = () => {
  const [selectedQuickViewDish, setSelectedQuickViewDish] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/register';
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideHeaderFooter = isAuthRoute || isAdminRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Interactive Custom Pointer Cursor */}
      <CustomCursor />

      {/* Show Customer Navbar only on standard storefront routes */}
      {!hideHeaderFooter && (
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onSelectDish={(dish) => setSelectedQuickViewDish(dish)}
        />
      )}

      {/* Main Route Views */}
      <main className="flex-1">
        <AppRoutes
          onQuickView={(dish) => setSelectedQuickViewDish(dish)}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      </main>

      {/* Storefront Overlays and Footer */}
      {!hideHeaderFooter && (
        <>
          <CartSidebar />
          <WishlistSidebar />
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectDish={(dish) => setSelectedQuickViewDish(dish)}
          />
          <QuickViewModal
            dish={selectedQuickViewDish}
            onClose={() => setSelectedQuickViewDish(null)}
          />
          <BackToTop />
          <Footer />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <BrowserRouter>
                  <Helmet>
                    <title>Thin Nation | Thin Crust, Big Flavor Lahore</title>
                    <meta name="description" content="Thin Nation Gourmet Pizza & Management Portal in Faisal Town, Lahore." />
                  </Helmet>
                  <AppContent />
                </BrowserRouter>
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
