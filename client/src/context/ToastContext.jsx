import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaShoppingBag, FaTimes } from 'react-icons/fa';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* TOP Positioned Toaster Notification Stack */}
      <div className="fixed top-6 right-4 sm:right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl border shadow-2xl backdrop-blur-xl ${
                toast.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-900/30'
                  : toast.type === 'error'
                  ? 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-900/30'
                  : toast.type === 'warning'
                  ? 'bg-amber-950/90 border-amber-500/40 text-amber-100 shadow-amber-900/30'
                  : toast.type === 'cart'
                  ? 'bg-slate-950/90 border-primary/50 text-white shadow-primary/30'
                  : 'bg-slate-900/90 border-slate-700 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {toast.type === 'success' && <FaCheckCircle className="text-emerald-400 text-xl" />}
                  {toast.type === 'error' && <FaExclamationCircle className="text-rose-400 text-xl" />}
                  {toast.type === 'warning' && <FaExclamationCircle className="text-amber-400 text-xl" />}
                  {toast.type === 'cart' && <FaShoppingBag className="text-primary text-xl animate-bounce" />}
                  {toast.type === 'info' && <FaInfoCircle className="text-blue-400 text-xl" />}
                </div>

                <p className="text-xs font-bold font-montserrat leading-snug">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <FaTimes size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
