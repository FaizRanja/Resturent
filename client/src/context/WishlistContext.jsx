import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('savoria_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('savoria_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (dish) => {
    const exists = wishlistItems.some(item => item.id === dish.id);
    if (exists) {
      setWishlistItems(prev => prev.filter(item => item.id !== dish.id));
      addToast(`Removed "${dish.name}" from wishlist`, 'info');
    } else {
      setWishlistItems(prev => [...prev, dish]);
      addToast(`Added "${dish.name}" to your wishlist!`, 'success');
    }
  };

  const isInWishlist = (dishId) => {
    return wishlistItems.some(item => item.id === dishId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlistDrawer: () => setIsWishlistOpen(prev => !prev),
        wishlistCount: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
