import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserCheck, FaEnvelope, FaPhone, FaShoppingBag, FaStar } from 'react-icons/fa';
import { ADMIN_CUSTOMERS } from '../../data/adminData';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState(ADMIN_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCust, setSelectedCust] = useState(null);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Customer Directory</h1>
          <p className="text-xs text-customGray mt-1">Manage guest accounts, order history, and lifetime spending values.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-dark-card p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-md">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-dark-paper text-customGray uppercase font-bold border-b border-gray-100 dark:border-dark-border">
              <tr>
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-4">Contact Info</th>
                <th className="py-4 px-4">Orders Count</th>
                <th className="py-4 px-4">Total Spent (Rs.)</th>
                <th className="py-4 px-4">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40 text-dark dark:text-gray-200">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-paper/30 transition-colors">
                  <td className="py-3.5 px-6 font-bold flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {cust.name.charAt(0)}
                    </div>
                    <span>{cust.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-customGray">
                    <div>{cust.email}</div>
                    <div className="text-[11px]">{cust.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold">{cust.orders} Orders</td>
                  <td className="py-3.5 font-bold font-montserrat text-primary">Rs. {cust.spent.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      cust.status === 'VIP' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                    }`}>
                      {cust.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setSelectedCust(cust)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-dark-paper text-xs font-bold hover:bg-primary hover:text-white transition-colors"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {selectedCust && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-dark-border pb-3">
              <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">Customer Profile</h3>
              <button onClick={() => setSelectedCust(null)} className="text-gray-400 font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-customGray">Name:</span><strong className="text-dark dark:text-white">{selectedCust.name}</strong></div>
              <div className="flex justify-between"><span className="text-customGray">Email:</span><span>{selectedCust.email}</span></div>
              <div className="flex justify-between"><span className="text-customGray">Phone:</span><span>{selectedCust.phone}</span></div>
              <div className="flex justify-between"><span className="text-customGray">Member Since:</span><span>{selectedCust.joined}</span></div>
              <div className="flex justify-between"><span className="text-customGray">Total Orders:</span><span className="font-bold">{selectedCust.orders}</span></div>
              <div className="flex justify-between"><span className="text-customGray">Lifetime Value:</span><span className="font-bold text-primary font-montserrat">Rs. {selectedCust.spent.toLocaleString()}</span></div>
            </div>

            <button onClick={() => setSelectedCust(null)} className="w-full rounded-2xl bg-primary text-white py-2.5 text-xs font-bold">
              Close Profile
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
