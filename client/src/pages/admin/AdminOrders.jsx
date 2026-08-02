import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEye, FaCheckCircle, FaClock, FaTruck, FaTimesCircle, FaFileInvoiceDollar } from 'react-icons/fa';
import { ADMIN_ORDERS } from '../../data/adminData';
import { useToast } from '../../context/ToastContext';

const AdminOrders = () => {
  const [orders, setOrders] = useState(ADMIN_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { addToast } = useToast();

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
    addToast(`Order ${orderId} status updated to "${newStatus}"`, 'success');
  };

  const filteredOrders = orders.filter(ord => {
    const matchSearch = ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.phone.includes(searchQuery);
    const matchStatus = statusFilter === 'all' || ord.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Orders Management</h1>
          <p className="text-xs text-customGray mt-1">View, manage, and update order statuses in real time.</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-dark-card p-4 rounded-3xl border border-gray-100 dark:border-dark-border shadow-md">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-3.5 text-gray-400" size={14} />
          <input
            type="text"
            placeholder="Search by Order ID, Name, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl bg-gray-50 dark:bg-dark-paper pl-10 pr-4 py-2.5 text-xs text-dark dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'pending', 'preparing', 'out for delivery', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all whitespace-nowrap capitalize ${
                statusFilter === status
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 dark:bg-dark-paper text-customGray hover:text-dark dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-dark-paper text-customGray uppercase font-bold border-b border-gray-100 dark:border-dark-border">
              <tr>
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-4">Customer</th>
                <th className="py-4 px-4">Phone</th>
                <th className="py-4 px-4">Total (Rs.)</th>
                <th className="py-4 px-4">Payment</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40 text-dark dark:text-gray-200">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50/50 dark:hover:bg-dark-paper/30 transition-colors">
                  <td className="py-3.5 px-6 font-bold font-montserrat text-primary">{ord.id}</td>
                  <td className="py-3.5 px-4 font-semibold">{ord.customer}</td>
                  <td className="py-3.5 px-4 text-customGray">{ord.phone}</td>
                  <td className="py-3.5 px-4 font-bold font-montserrat text-dark dark:text-white">Rs. {ord.total.toLocaleString()}</td>
                  <td className="py-3.5 px-4">{ord.method}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className={`rounded-xl px-2.5 py-1 text-[11px] font-extrabold focus:outline-none border border-transparent ${
                        ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' :
                        ord.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400' :
                        ord.status === 'Preparing' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' :
                        'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-2 rounded-xl bg-gray-100 dark:bg-dark-paper hover:bg-primary hover:text-white transition-colors"
                      title="View Receipt"
                    >
                      <FaEye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Receipt Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-2xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-dark-border pb-3">
              <div className="flex items-center gap-2">
                <FaFileInvoiceDollar className="text-primary" size={20} />
                <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">Receipt: {selectedOrder.id}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-dark dark:hover:text-white font-bold">✕</button>
            </div>

            <div className="space-y-2 text-xs text-customGray">
              <div className="flex justify-between"><span className="font-semibold">Customer:</span><span className="text-dark dark:text-white">{selectedOrder.customer}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Email:</span><span>{selectedOrder.email}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Phone:</span><span>{selectedOrder.phone}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Payment Method:</span><span>{selectedOrder.method}</span></div>
              <div className="flex justify-between"><span className="font-semibold">Order Date:</span><span>{selectedOrder.date}</span></div>
              <div className="flex justify-between border-t border-gray-100 dark:border-dark-border pt-2 text-sm font-bold text-dark dark:text-white">
                <span>Grand Total:</span><span className="text-primary font-montserrat">Rs. {selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full rounded-2xl bg-primary text-white py-2.5 text-xs font-bold shadow-md"
            >
              Close Receipt
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
