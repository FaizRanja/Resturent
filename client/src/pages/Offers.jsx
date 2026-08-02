import React from 'react';
import { motion } from 'framer-motion';
import { FaTag, FaCopy, FaClock, FaFire, FaPercentage } from 'react-icons/fa';
import { OFFERS } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';

const Offers = () => {
  const { addToast } = useToast();

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    addToast(`Promo code "${code}" copied to clipboard!`, 'success');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-primary flex items-center justify-center gap-1.5">
            <FaFire className="text-primary" /> Thin Nation Special Vouchers
          </span>
          <h1 className="font-montserrat text-3xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Exclusive Offers & Discounts
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Use promo codes at checkout to enjoy discounts on thin-crust pizzas, pasta bombs, and beverages.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OFFERS.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border overflow-hidden shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-primary text-white px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                  {offer.badge}
                </span>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-montserrat text-2xl font-black text-secondary">{offer.discount}</span>
                  <span className="flex items-center gap-1 text-[11px] bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
                    <FaClock size={10} /> Valid {offer.expiryDays} Days
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-customGray mt-1 leading-relaxed">
                    {offer.description}
                  </p>
                  <span className="text-[11px] font-semibold text-primary block mt-2">
                    Requirement: {offer.minOrder}
                  </span>
                </div>

                {/* Promo Code Box */}
                <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-dark-paper border border-dashed border-primary/40">
                  <div className="flex items-center gap-2">
                    <FaTag className="text-primary" size={14} />
                    <span className="font-montserrat text-sm font-black text-dark dark:text-white tracking-widest">
                      {offer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(offer.code)}
                    className="flex items-center gap-1 rounded-xl bg-primary text-white px-3.5 py-2 text-[11px] font-bold shadow-md hover:bg-primary-dark transition-colors"
                  >
                    <FaCopy size={11} /> Copy Code
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Offers;
