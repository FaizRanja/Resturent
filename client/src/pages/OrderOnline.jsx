import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaCheckCircle, FaTrash, FaTag, FaCreditCard, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { mockCreateOrder } from '../services/api';

const OrderOnline = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { addToast } = useToast();

  const [billing, setBilling] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    zip: '54770',
    paymentMethod: 'card',
  });

  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      addToast('Your cart is empty!', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderPayload = {
        items: cartItems,
        billing,
        pricing: {
          subtotal,
          discountAmount,
          shippingFee,
          taxAmount,
          grandTotal
        }
      };

      const res = await mockCreateOrder(orderPayload);
      setOrderSuccess(res);
      clearCart();
      addToast('Order placed successfully!', 'success');
    } catch (err) {
      addToast('Failed to process order. Try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 text-center shadow-2xl"
        >
          <FaCheckCircle className="text-emerald-500 text-6xl mx-auto mb-4" />
          <h2 className="font-montserrat text-2xl font-black text-dark dark:text-white">Order Confirmed!</h2>
          <p className="text-xs text-customGray mt-2">Thank you for ordering with Thin Nation. Your delicious thin-crust meal is being prepared.</p>

          <div className="my-6 rounded-2xl bg-gray-50 dark:bg-dark-paper p-4 text-left space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-customGray">Order Number:</span>
              <strong className="text-dark dark:text-white">{orderSuccess.data.orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-customGray">Total Amount:</span>
              <span className="text-primary font-montserrat font-bold">Rs. {Math.round(orderSuccess.data.pricing.grandTotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-customGray">Delivery Address:</span>
              <span className="text-dark dark:text-white">{orderSuccess.data.billing.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-customGray">Estimated Delivery:</span>
              <strong className="text-emerald-500">25 - 35 Mins</strong>
            </div>
          </div>

          <button
            onClick={() => setOrderSuccess(null)}
            className="w-full rounded-2xl bg-primary text-white py-3 text-xs font-bold shadow-lg shadow-primary/30"
          >
            Order More Food
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Thin Nation Online Ordering</span>
          <h1 className="font-montserrat text-3xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Complete Your Checkout
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Fast delivery directly from 14-A Usmani Rd, Faisal Town, Lahore.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-12 text-center max-w-lg mx-auto">
            <FaShoppingBag className="text-gray-300 dark:text-dark-paper text-6xl mx-auto mb-4" />
            <h3 className="font-montserrat font-bold text-dark dark:text-white text-xl">Your cart is currently empty</h3>
            <p className="text-xs text-customGray mt-1 mb-6">Add Thin Nation famous pizzas, pasta bombs, or desserts to proceed.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 7 Columns - Billing Information */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-md">
                <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white mb-6">
                  1. Delivery Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-customGray mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Rashid Khan"
                      value={billing.name}
                      onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                      className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-customGray mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="rashid@gmail.com"
                      value={billing.email}
                      onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                      className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-customGray mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={billing.phone}
                      onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                      className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-customGray mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={billing.city}
                      onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                      className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-customGray mb-1">Full Street Address</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="House #, Street #, Sector / Block, Faisal Town, Lahore"
                      value={billing.address}
                      onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                      className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-md">
                <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white mb-6">
                  2. Payment Method
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setBilling({ ...billing, paymentMethod: 'card' })}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border text-xs font-bold transition-all ${
                      billing.paymentMethod === 'card'
                        ? 'border-primary bg-primary/10 text-primary shadow-md'
                        : 'border-gray-200 dark:border-dark-border text-customGray hover:text-dark dark:hover:text-white'
                    }`}
                  >
                    <FaCreditCard size={18} />
                    <span>Credit / Debit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBilling({ ...billing, paymentMethod: 'cod' })}
                    className={`flex items-center justify-center gap-2 p-4 rounded-2xl border text-xs font-bold transition-all ${
                      billing.paymentMethod === 'cod'
                        ? 'border-primary bg-primary/10 text-primary shadow-md'
                        : 'border-gray-200 dark:border-dark-border text-customGray hover:text-dark dark:hover:text-white'
                    }`}
                  >
                    <FaMoneyBillWave size={18} />
                    <span>Cash on Delivery</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns - Order Items & Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-md">
                <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white mb-6">
                  Order Summary ({cartItems.length} items)
                </h3>

                {/* Items list */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-dark-border/40">
                      <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-montserrat text-xs font-bold text-dark dark:text-white truncate">{item.name}</h4>
                        <span className="text-xs text-primary font-bold block mt-0.5">Rs. {item.price.toLocaleString()} each</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-dark dark:text-white font-montserrat">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        <span className="text-[10px] text-customGray block">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="mt-6 space-y-2 border-t border-gray-100 dark:border-dark-border pt-4 text-xs text-customGray">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-dark dark:text-white">Rs. {subtotal.toLocaleString()}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-Rs. {discountAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>{shippingFee === 0 ? <strong className="text-emerald-500">FREE</strong> : `Rs. ${shippingFee}`}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST Tax (5%)</span>
                    <span>Rs. {Math.round(taxAmount).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between border-t border-gray-100 dark:border-dark-border pt-3 text-base font-black text-dark dark:text-white">
                    <span>Grand Total</span>
                    <span className="text-primary font-montserrat text-xl font-extrabold">Rs. {Math.round(grandTotal).toLocaleString()}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 w-full rounded-2xl bg-primary hover:bg-primary-dark text-white py-4 text-xs font-extrabold tracking-wider uppercase shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
                >
                  {isSubmitting ? 'Processing Order...' : `Place Order (Rs. ${Math.round(grandTotal).toLocaleString()})`}
                </button>
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default OrderOnline;
