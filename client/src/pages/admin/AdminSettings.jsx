import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaClock, FaPercent, FaBell, FaLock, FaSave } from 'react-icons/fa';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [info, setInfo] = useState({ ...RESTAURANT_INFO });
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });

  const { addToast } = useToast();

  const handleSaveInfo = (e) => {
    e.preventDefault();
    addToast('Restaurant profile settings saved successfully!', 'success');
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (passwordForm.newPass !== passwordForm.confirm) {
      addToast('New passwords do not match.', 'warning');
      return;
    }
    addToast('Admin security password updated.', 'success');
    setPasswordForm({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-dark dark:text-white">
          System & Portal Settings
        </h1>
        <p className="text-xs text-customGray mt-0.5">Configure restaurant metadata, delivery fees, and security credentials</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 dark:border-dark-border pb-3">
        {[
          { id: 'general', label: 'Restaurant Profile', icon: FaStore },
          { id: 'hours', label: 'Opening Hours', icon: FaClock },
          { id: 'security', label: 'Security & Password', icon: FaLock },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border text-customGray hover:text-dark dark:hover:text-white'
              }`}
            >
              <Icon size={13} /> <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'general' && (
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-xl max-w-2xl">
          <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white mb-4">General Restaurant Information</h3>
          <form onSubmit={handleSaveInfo} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Restaurant Name</label>
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={info.phone}
                  onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Email Contact</label>
                <input
                  type="email"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                  className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Physical Address</label>
              <input
                type="text"
                value={info.address}
                onChange={(e) => setInfo({ ...info, address: e.target.value })}
                className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button type="submit" className="flex items-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-xs font-bold shadow-lg shadow-primary/25">
              <FaSave /> Save Changes
            </button>
          </form>
        </div>
      )}

      {activeTab === 'hours' && (
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-xl max-w-2xl space-y-4">
          <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white">Operating Hours & Schedule</h3>
          <div className="space-y-3 text-xs text-dark dark:text-white">
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-dark-paper">
              <span className="font-bold">Weekdays (Mon - Fri)</span>
              <span>11:00 AM - 11:00 PM</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-dark-paper">
              <span className="font-bold">Weekends (Sat - Sun)</span>
              <span>10:00 AM - 12:00 AM</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 shadow-xl max-w-md">
          <h3 className="font-montserrat text-lg font-bold text-dark dark:text-white mb-4">Security Credentials</h3>
          <form onSubmit={handleSavePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordForm.current}
                onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPass: e.target.value })}
                className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-dark dark:text-gray-300 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                className="w-full rounded-xl bg-gray-50 dark:bg-dark-paper border border-gray-200 dark:border-dark-border px-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button type="submit" className="w-full rounded-xl bg-primary text-white py-3 text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
