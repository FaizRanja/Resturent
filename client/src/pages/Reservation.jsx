import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUsers, FaCheckCircle, FaUtensils, FaConciergeBell, FaChair } from 'react-icons/fa';
import { mockSubmitReservation } from '../services/api';
import { useToast } from '../context/ToastContext';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    area: 'Main Dining Hall',
    specialNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const { addToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await mockSubmitReservation(formData);
      setBookingSuccess(res);
      addToast(res.message, 'success');
    } catch (err) {
      addToast('Failed to process reservation. Please check info.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Table Booking & VIP Dining</span>
          <h1 className="font-montserrat text-4xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Reserve Your Experience
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Guarantee your seating in our main hall, rooftop glasshouse, or private culinary lounge.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {bookingSuccess ? (
            /* Booking Confirmation Receipt Screen */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mx-auto max-w-2xl rounded-3xl bg-white dark:bg-dark-card border border-emerald-500/30 p-8 sm:p-12 shadow-2xl text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-6">
                <FaCheckCircle size={44} />
              </div>
              <h2 className="font-montserrat text-2xl sm:text-3xl font-black text-dark dark:text-white">
                Reservation Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-customGray mt-2">
                We look forward to serving you at Savoria Gourmet Dining.
              </p>

              <div className="mt-8 rounded-2xl bg-gray-50 dark:bg-dark-paper border border-gray-100 dark:border-dark-border p-6 text-left space-y-3 text-xs text-dark dark:text-white">
                <div className="flex justify-between border-b border-gray-200 dark:border-dark-border pb-2">
                  <span className="text-customGray">Booking Reference:</span>
                  <span className="font-bold text-primary font-montserrat">{bookingSuccess.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-customGray">Guest Name:</span>
                  <span className="font-bold">{bookingSuccess.data.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-customGray">Date & Time:</span>
                  <span className="font-bold">{bookingSuccess.data.date} at {bookingSuccess.data.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-customGray">Party Size:</span>
                  <span className="font-bold">{bookingSuccess.data.guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-customGray">Seating Zone:</span>
                  <span className="font-bold text-emerald-500">{bookingSuccess.data.area}</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setBookingSuccess(null)}
                  className="rounded-xl bg-primary text-white px-6 py-3 text-xs font-bold shadow-md hover:bg-primary-dark transition-colors"
                >
                  Make Another Reservation
                </button>
              </div>
            </motion.div>
          ) : (
            /* Reservation Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-10 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      placeholder="e.g. Jonathan Mercer"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      placeholder="jonathan@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      placeholder="+1 (555) 000-1234"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Guests Count *
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Seating Zone
                    </label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Main Dining Hall">Main Dining Hall</option>
                      <option value="Rooftop Glasshouse">Rooftop Glasshouse</option>
                      <option value="Private VIP Suite">Private VIP Suite</option>
                      <option value="Outdoor Garden Terrace">Outdoor Garden Terrace</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Reservation Date *
                    </label>
                    <input
                      type="date"
                      required
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                      Preferred Time *
                    </label>
                    <input
                      type="time"
                      required
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={3}
                    name="specialNotes"
                    placeholder="e.g. Anniversary celebration, high chair needed, dietary restrictions..."
                    value={formData.specialNotes}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 transition-all disabled:opacity-50"
                >
                  <FaConciergeBell size={16} />
                  <span>{isSubmitting ? 'Confirming Reservation...' : 'Confirm Table Booking'}</span>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reservation;
