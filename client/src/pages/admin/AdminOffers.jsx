import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaPlus, FaTrash, FaCheck, FaPercentage } from 'react-icons/fa';
import { OFFERS } from '../../data/restaurantData';
import { useToast } from '../../context/ToastContext';

const AdminOffers = () => {
  const [offersList, setOffersList] = useState(OFFERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOffer, setNewOffer] = useState({
    code: '',
    title: '',
    discount: '20% OFF',
    minOrder: 'Orders above Rs. 1,500',
    expiryDays: 7,
    description: '',
    badge: 'Limited',
  });

  const { addToast } = useToast();

  const handleCreateOffer = (e) => {
    e.preventDefault();
    if (!newOffer.code || !newOffer.title) return;

    const offerObj = {
      id: 'off-' + Date.now(),
      ...newOffer,
      code: newOffer.code.toUpperCase(),
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    };

    setOffersList([offerObj, ...offersList]);
    setIsModalOpen(false);
    addToast(`Offer voucher "${offerObj.code}" created!`, 'success');
  };

  const handleDeleteOffer = (id) => {
    setOffersList(prev => prev.filter(o => o.id !== id));
    addToast('Promo offer deleted', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Offers & Coupon Management</h1>
          <p className="text-xs text-customGray mt-1">Create and manage active promo discount vouchers for Thin Nation customers.</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-5 py-3 text-xs font-bold shadow-lg shadow-primary/25 transition-all"
        >
          <FaPlus /> Create New Voucher
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offersList.map((off) => (
          <div key={off.id} className="relative flex flex-col justify-between rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-montserrat font-black text-lg text-primary tracking-widest">{off.code}</span>
                <button onClick={() => handleDeleteOffer(off.id)} className="text-gray-400 hover:text-red-500 p-1">
                  <FaTrash size={14} />
                </button>
              </div>

              <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white">{off.title}</h4>
              <p className="text-xs text-customGray mt-1">{off.description}</p>
              <span className="text-[11px] font-semibold text-emerald-500 block mt-2">{off.minOrder}</span>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-dark-border flex justify-between text-xs text-customGray">
              <span>Expiry: {off.expiryDays} Days</span>
              <strong className="text-primary font-montserrat">{off.discount}</strong>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <form onSubmit={handleCreateOffer} className="relative w-full max-w-md rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-2xl space-y-4">
            <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">New Coupon Voucher</h3>
            
            <input
              type="text"
              required
              placeholder="Voucher Code (e.g. THIN50)"
              value={newOffer.code}
              onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
              className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none uppercase"
            />
            
            <input
              type="text"
              required
              placeholder="Title (e.g. 20% Off Thin Crust Pizzas)"
              value={newOffer.title}
              onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
              className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
            />

            <input
              type="text"
              placeholder="Requirement (e.g. Orders above Rs. 1,500)"
              value={newOffer.minOrder}
              onChange={(e) => setNewOffer({ ...newOffer, minOrder: e.target.value })}
              className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none"
            />

            <div className="flex gap-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-2xl bg-gray-100 text-dark dark:text-white py-2.5 text-xs font-bold">Cancel</button>
              <button type="submit" className="flex-1 rounded-2xl bg-primary text-white py-2.5 text-xs font-bold">Create Offer</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminOffers;
