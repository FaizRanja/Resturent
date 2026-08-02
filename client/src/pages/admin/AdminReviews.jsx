import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaCheck, FaTimes, FaTrash, FaSearch } from 'react-icons/fa';
import { REVIEWS_LIST } from '../../data/restaurantData';
import { useToast } from '../../context/ToastContext';

const AdminReviews = () => {
  const [reviews, setReviews] = useState(
    REVIEWS_LIST.map(r => ({ ...r, status: 'Approved' }))
  );
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();

  const handleStatusChange = (id, newStatus) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    addToast(`Review #${id} set to ${newStatus}`, 'info');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this review permanently?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
      addToast('Review deleted.', 'info');
    }
  };

  const filtered = reviews.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-montserrat text-2xl sm:text-3xl font-extrabold text-dark dark:text-white">
          Reviews Moderation
        </h1>
        <p className="text-xs text-customGray mt-0.5">Approve, reject, or feature guest dining feedback</p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl space-y-4">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by reviewer or comment text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-gray-100 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-dark-border text-customGray font-bold uppercase tracking-wider">
                <th className="pb-3">Reviewer</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3">Comment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40">
              {filtered.map((rev) => (
                <tr key={rev.id} className="hover:bg-gray-50 dark:hover:bg-dark-paper/50 transition-colors">
                  <td className="py-3.5 flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.name} className="h-10 w-10 rounded-full object-cover" />
                    <div>
                      <div className="font-bold text-dark dark:text-white">{rev.name}</div>
                      <div className="text-[10px] text-customGray">{rev.role}</div>
                    </div>
                  </td>
                  <td className="py-3.5 font-bold text-amber-400 flex items-center gap-1">
                    <FaStar size={12} /> {rev.rating} / 5
                  </td>
                  <td className="py-3.5 text-customGray max-w-xs truncate">{rev.comment}</td>
                  <td className="py-3.5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      rev.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {rev.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-customGray">{rev.date}</td>
                  <td className="py-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleStatusChange(rev.id, rev.status === 'Approved' ? 'Hidden' : 'Approved')}
                      className={`p-2 rounded-xl text-xs font-bold transition-colors ${
                        rev.status === 'Approved' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                      }`}
                      title="Toggle Status"
                    >
                      {rev.status === 'Approved' ? <FaTimes size={12} /> : <FaCheck size={12} />}
                    </button>
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      title="Delete Review"
                    >
                      <FaTrash size={12} />
                    </button>
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

export default AdminReviews;
