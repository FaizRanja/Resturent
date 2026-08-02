import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { REVENUE_CHART_DATA, ORDERS_HOURLY_DATA, CATEGORY_PIE_DATA } from '../../data/adminData';

const AdminAnalytics = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-montserrat text-2xl font-black text-dark dark:text-white">Business Analytics & Metrics</h1>
        <p className="text-xs text-customGray mt-1">Deep dive performance breakdown of Thin Nation Lahore sales, revenue, and category orders.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Area Chart */}
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl">
          <h3 className="font-montserrat font-bold text-dark dark:text-white text-base mb-4">Gross Sales Growth (PKR)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.15} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} tickFormatter={(val) => `Rs. ${val/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '14px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => [`Rs. ${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FF5722" fill="#FF5722" fillOpacity={0.25} strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hourly Orders Bar Chart */}
        <div className="rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 shadow-xl">
          <h3 className="font-montserrat font-bold text-dark dark:text-white text-base mb-4">Peak Hourly Order Volume</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ORDERS_HOURLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.15} />
                <XAxis dataKey="hour" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1E293B', borderRadius: '14px', color: '#fff', fontSize: '12px' }} />
                <Bar dataKey="orders" fill="#FFC107" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
