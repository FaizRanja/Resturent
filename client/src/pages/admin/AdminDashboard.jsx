import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { FaMoneyBillWave, FaShoppingBag, FaUsers, FaCalendarCheck, FaArrowUp, FaArrowDown, FaPlus } from 'react-icons/fa';
import { DASHBOARD_STATS, REVENUE_CHART_DATA, CATEGORY_PIE_DATA, ADMIN_ORDERS } from '../../data/adminData';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Thin Nation Executive Dashboard</h1>
          <p className="text-xs text-customGray mt-1">Real-time revenue monitoring, active orders, and sales performance analytics.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {DASHBOARD_STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-customGray uppercase tracking-wider">{stat.title}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                {idx === 0 ? <FaMoneyBillWave size={18} /> : idx === 1 ? <FaShoppingBag size={18} /> : idx === 2 ? <FaUsers size={18} /> : <FaCalendarCheck size={18} />}
              </div>
            </div>

            <div className="mt-4 font-montserrat text-2xl font-black text-dark dark:text-white">
              {stat.value}
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className={`flex items-center gap-1 font-extrabold ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.isPositive ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                {stat.change}
              </span>
              <span className="text-gray-400 font-normal">{stat.period}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue & Profit Area Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">Monthly Revenue & Profit Trajectory</h3>
              <p className="text-xs text-customGray mt-0.5">Gross revenue vs net profit margins in PKR (Rs.)</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC107" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FFC107" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.15} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(val) => `Rs. ${(val / 1000)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', borderRadius: '16px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`Rs. ${val.toLocaleString()}`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FF5722" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                <Area type="monotone" dataKey="profit" stroke="#FFC107" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Pie Chart (1 col) */}
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="font-montserrat font-bold text-dark dark:text-white text-base">Sales Share by Category</h3>
            <p className="text-xs text-customGray mt-0.5">Distribution of order volumes.</p>
          </div>

          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {CATEGORY_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {CATEGORY_PIE_DATA.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-customGray font-medium text-[11px] truncate">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table Overview */}
      <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl">
        <h3 className="font-montserrat font-bold text-dark dark:text-white text-base mb-4">Recent Live Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-dark-paper text-customGray uppercase font-bold border-b border-gray-100 dark:border-dark-border">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total (Rs.)</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border/40 text-dark dark:text-gray-200">
              {ADMIN_ORDERS.map((ord) => (
                <tr key={ord.id}>
                  <td className="py-3 px-4 font-bold text-primary font-montserrat">{ord.id}</td>
                  <td className="py-3 px-4 font-semibold">{ord.customer}</td>
                  <td className="py-3 px-4 font-bold font-montserrat">Rs. {ord.total.toLocaleString()}</td>
                  <td className="py-3 px-4">{ord.method}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                    }`}>
                      {ord.status}
                    </span>
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

export default AdminDashboard;
