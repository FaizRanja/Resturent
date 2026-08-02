import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCheck, FaTimes, FaCalendarAlt, FaClock, FaUsers, FaChair } from 'react-icons/fa';
import { INITIAL_RESERVATIONS } from '../../data/adminData';
import { useToast } from '../../context/ToastContext';

const AdminReservations = () => {
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [activeStatus, setActiveStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();

  const handleStatusChange = (id, newStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    addToast(`Reservation ${id} set to "${newStatus}"`, 'success');
  };

  const filtered = reservations.filter(r => {
    const matchesStatus = activeStatus === 'All' || r.status === activeStatus;
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-dark dark:text-white">
            Table Reservations
          </h1>
          <p className="text-xs text-customGray mt-0.5">Manage dining table bookings and seating schedules</p>
        </div>

        <div className="flex items-center gap-2 bg-white dark:bg-dark-card p-1.5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeStatus === status ? 'bg-primary text-white shadow-sm' : 'text-customGray hover:text-dark dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl space-y-4">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by reservation ID or guest name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border text-customGray font-bold uppercase tracking-wider">
                <th className="pb-3">Ref ID</th>
                <th className="pb-3">Guest Name</th>
                <th className="pb-3">Party Size</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Seating Zone</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40">
              {filtered.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50 dark:hover:bg-dark-paper/50 transition-colors">
                  <td className="py-3.5 font-bold font-montserrat text-primary">{res.id}</td>
                  <td className="py-3.5">
                    <div className="font-semibold text-dark dark:text-white">{res.name}</div>
                    <div className="text-[10px] text-customGray">{res.phone}</div>
                  </td>
                  <td className="py-3.5 font-bold">{res.guests} Guests</td>
                  <td className="py-3.5 font-medium text-dark dark:text-white">{res.date} at {res.time}</td>
                  <td className="py-3.5 text-emerald-500 font-bold">{res.area}</td>
                  <td className="py-3.5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      res.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-500' :
                      res.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right flex items-center justify-end gap-2">
                    {res.status !== 'Confirmed' && (
                      <button
                        onClick={() => handleStatusChange(res.id, 'Confirmed')}
                        className="rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white p-2 transition-colors"
                        title="Approve Reservation"
                      >
                        <FaCheck size={12} />
                      </button>
                    )}
                    {res.status !== 'Cancelled' && (
                      <button
                        onClick={() => handleStatusChange(res.id, 'Cancelled')}
                        className="rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-2 transition-colors"
                        title="Cancel Reservation"
                      >
                        <FaTimes size={12} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
