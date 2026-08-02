import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('savoria_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('savoria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (dish, quantity = 1, specialNotes = '') => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        if (specialNotes) updated[existingIndex].specialNotes = specialNotes;
        return updated;
      } else {
        return [...prevItems, { ...dish, quantity, specialNotes }];
      }
    });

    addToast(`Added "${dish.name}" to your cart!`, 'cart');
  };

  const removeFromCart = (dishId) => {
    const itemToRemove = cartItems.find(item => item.id === dishId);
    setCartItems(prev => prev.filter(item => item.id !== dishId));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(dishId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === dishId ? { ...item, quantity: newQty } : item)
    );
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'THINNATION25' || cleanCode === 'SAVORIA25') {
      setAppliedCoupon({ code: cleanCode, discountPercent: 25 });
      addToast(`Coupon ${cleanCode} applied! (25% OFF)`, 'success');
      return true;
    } else if (cleanCode === 'CHOCOLOVE') {
      setAppliedCoupon({ code: 'CHOCOLOVE', discountPercent: 15 });
      addToast('Coupon CHOCOLOVE applied! (15% OFF)', 'success');
      return true;
    } else {
      addToast('Invalid promo code. Try THINNATION25', 'warning');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const shippingFee = subtotal > 0 ? (subtotal >= 2000 ? 0 : 150) : 0;
  const taxAmount = (subtotal - discountAmount) * 0.05; // 5% GST tax
  const grandTotal = subtotal > 0 ? Math.max(0, subtotal - discountAmount + shippingFee + taxAmount) : 0;
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart: () => setIsCartOpen(prev => !prev),
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        grandTotal,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
