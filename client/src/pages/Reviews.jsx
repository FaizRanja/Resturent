import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaPen, FaTimes, FaCheck, FaQuoteLeft, FaThumbsUp } from 'react-icons/fa';
import { REVIEWS_LIST } from '../data/restaurantData';
import { mockSubmitReview } from '../services/api';
import { useToast } from '../context/ToastContext';

const Reviews = () => {
  const [reviews, setReviews] = useState(REVIEWS_LIST);
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) return;
    setIsSubmitting(true);
    try {
      const reviewPayload = {
        id: Date.now(),
        name,
        role: role || 'Gourmet Lover',
        rating: newRating,
        date: 'Just now',
        comment,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      };
      await mockSubmitReview(reviewPayload);
      setReviews(prev => [reviewPayload, ...prev]);
      addToast('Thank you! Your review has been published.', 'success');
      setIsWriteOpen(false);
      setName('');
      setRole('');
      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Unfiltered Guest Feedback</span>
          <h1 className="font-montserrat text-4xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Read what food critics, celebrities, and valued guests say about their dining journeys at Savoria.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsWriteOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white px-8 py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/25 transition-all transform hover:scale-105"
            >
              <FaPen /> Write A Customer Review
            </button>
          </div>
        </div>

        {/* Rating Overview Summary */}
        <div className="mb-14 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-gray-100 dark:border-dark-border pb-6 md:pb-0 md:pr-6">
            <div className="font-montserrat text-6xl font-black text-dark dark:text-white">4.9</div>
            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 my-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} size={18} />
              ))}
            </div>
            <p className="text-xs text-customGray font-medium">Based on 1,420+ verified dining reviews</p>
          </div>

          <div className="md:col-span-2 space-y-2">
            {[
              { stars: 5, pct: 92 },
              { stars: 4, pct: 6 },
              { stars: 3, pct: 1 },
              { stars: 2, pct: 1 },
              { stars: 1, pct: 0 },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs font-bold text-dark dark:text-white">
                <span className="w-12 flex items-center gap-1">{row.stars} <FaStar className="text-amber-400" size={12} /></span>
                <div className="flex-1 h-2.5 rounded-full bg-gray-100 dark:bg-dark-paper overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${row.pct}%` }} />
                </div>
                <span className="w-10 text-right text-customGray">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-between rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-7 shadow-lg relative"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/20" />
                    <div>
                      <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white">{rev.name}</h4>
                      <span className="text-[11px] text-customGray font-medium">{rev.role}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-customGray">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-customGray leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.dishPhoto && (
                  <img
                    src={rev.dishPhoto}
                    alt="Review Dish"
                    className="mt-4 h-32 w-full rounded-2xl object-cover"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Write Review Modal */}
        <AnimatePresence>
          {isWriteOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-2xl p-6 sm:p-8"
              >
                <button
                  onClick={() => setIsWriteOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-dark dark:hover:text-white"
                >
                  <FaTimes size={18} />
                </button>

                <h3 className="font-montserrat text-xl font-bold text-dark dark:text-white">Share Your Dining Experience</h3>
                <p className="text-xs text-customGray mt-1 mb-6">Your honest feedback helps us maintain Michelin standards.</p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Star selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-2">Overall Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="text-amber-400 p-1 hover:scale-110 transition-transform"
                        >
                          <FaStar size={24} className={star <= newRating ? 'text-amber-400' : 'text-gray-300 dark:text-gray-600'} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Profession / Title (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Food Blogger / Local Resident"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Review Comments</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe the ambiance, dish flavors, and staff service..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25 transition-all"
                  >
                    {isSubmitting ? 'Publishing...' : 'Submit Official Review'}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
