import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaTrash, FaShoppingBag, FaArrowRight, FaTag, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative flex h-full w-full max-w-md flex-col justify-between bg-white dark:bg-dark-card border-l border-gray-100 dark:border-dark-border shadow-2xl p-6 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FaShoppingBag size={16} />
              </div>
              <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white">
                Your Order ({cartItems.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-paper text-gray-500 hover:text-primary transition-colors"
            >
              <FaTimes size={16} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="my-4 flex-1 overflow-y-auto space-y-4 pr-1">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FaShoppingBag className="text-gray-300 dark:text-dark-paper text-5xl mb-3" />
                <p className="font-montserrat font-bold text-dark dark:text-white text-base">Your cart is empty</p>
                <p className="text-xs text-customGray mt-1 mb-4">Discover our Thin Nation signature dishes and treat yourself.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-dark transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-dark-paper/60 border border-gray-100 dark:border-dark-border/40"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-montserrat text-xs font-bold text-dark dark:text-white truncate">
                      {item.name}
                    </h4>
                    <span className="font-montserrat text-sm font-extrabold text-primary block mt-0.5">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>

                    {/* Qty Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1.5 bg-white dark:bg-dark-card px-2 py-0.5 rounded-lg border border-gray-200 dark:border-dark-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-xs font-bold text-gray-500 hover:text-primary px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-dark dark:text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-xs font-bold text-gray-500 hover:text-primary px-1"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    title="Remove Item"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 dark:border-dark-border pt-4">
              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="mb-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <FaTag className="absolute left-3.5 top-3 text-gray-400" size={12} />
                    <input
                      type="text"
                      placeholder="Promo Code (THINNATION25)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper pl-9 pr-3 py-2 text-xs text-dark dark:text-white uppercase focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 dark:bg-dark-paper text-white hover:bg-primary px-4 py-2 text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-emerald-500 font-medium mt-1.5 px-1">
                    <span className="flex items-center gap-1"><FaCheck size={10} /> Coupon ({appliedCoupon.code}) Applied</span>
                    <button type="button" onClick={removeCoupon} className="underline text-gray-400">Remove</button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-customGray mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-dark dark:text-white">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-medium">
                    <span>Discount</span>
                    <span>-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{shippingFee === 0 ? <strong className="text-emerald-500">FREE (Orders &gt; Rs. 2,000)</strong> : `Rs. ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax (5%)</span>
                  <span>Rs. {Math.round(taxAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 dark:border-dark-border pt-2 text-sm font-bold text-dark dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-primary font-montserrat text-base">Rs. {Math.round(grandTotal).toLocaleString()}</span>
                </div>
              </div>

              <Link
                to="/order"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white py-3.5 text-sm font-bold shadow-lg shadow-primary/25 transition-all"
              >
                <span>Proceed to Checkout</span>
                <FaArrowRight size={14} />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CartSidebar;
