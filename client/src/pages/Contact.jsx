import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useToast } from '../context/ToastContext';

const Contact = () => {
  const [contactData, setContactData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      addToast('Thank you! Your message has been sent to our concierge team.', 'success');
      setContactData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-light-bg dark:bg-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-primary">Get In Touch</span>
          <h1 className="font-montserrat text-4xl sm:text-5xl font-black text-dark dark:text-white mt-1">
            Contact & Location
          </h1>
          <p className="text-xs sm:text-sm text-customGray mt-2">
            Have a question about our menu, catering services, or private room bookings? Reach out to us.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {[
            { title: 'Call Concierge', desc: RESTAURANT_INFO.phone, icon: <FaPhoneAlt className="text-primary" size={20} />, action: `tel:${RESTAURANT_INFO.phone}` },
            { title: 'WhatsApp Direct', desc: RESTAURANT_INFO.whatsapp, icon: <FaWhatsapp className="text-emerald-500" size={22} />, action: `https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/\D/g, '')}` },
            { title: 'Email Enquiries', desc: RESTAURANT_INFO.email, icon: <FaEnvelope className="text-amber-400" size={20} />, action: `mailto:${RESTAURANT_INFO.email}` },
            { title: 'Location', desc: RESTAURANT_INFO.address, icon: <FaMapMarkerAlt className="text-red-500" size={22} />, action: '#' },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.action}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-lg hover:shadow-2xl transition-all group"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 dark:bg-dark-paper group-hover:scale-110 transition-transform mb-4">
                {item.icon}
              </div>
              <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white">{item.title}</h4>
              <p className="text-xs text-customGray mt-1 leading-relaxed">{item.desc}</p>
            </motion.a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Message Form */}
          <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-8 shadow-2xl">
            <h3 className="font-montserrat text-2xl font-bold text-dark dark:text-white mb-2">Send Us A Message</h3>
            <p className="text-xs text-customGray mb-6">We typically respond to inquiries within 2 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={contactData.name}
                  onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@example.com"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Private Party Inquiry"
                  value={contactData.subject}
                  onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your message details here..."
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-3 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary hover:bg-primary-dark text-white py-4 text-xs font-extrabold uppercase tracking-wider shadow-xl shadow-primary/30 transition-all"
              >
                <FaPaperPlane size={14} />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Embedded Google Map */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-gray-100 dark:border-dark-border shadow-2xl h-[420px]">
              <iframe
                title="Savoria Gourmet Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976373946229!3d40.697670109633655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-lg">
              <h4 className="font-montserrat text-sm font-bold text-dark dark:text-white flex items-center gap-2 mb-2">
                <FaClock className="text-secondary" /> Opening Hours Summary
              </h4>
              <p className="text-xs text-customGray">Weekdays (Mon-Fri): {RESTAURANT_INFO.hours.weekdays}</p>
              <p className="text-xs text-customGray">Weekends (Sat-Sun): {RESTAURANT_INFO.hours.weekends}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
