export const DASHBOARD_STATS = [
  { title: 'Total Revenue', value: 'Rs. 1,485,200', change: '+18.4%', isPositive: true, period: 'vs last month', icon: 'FaMoneyBillWave' },
  { title: 'Total Orders', value: '1,842', change: '+12.6%', isPositive: true, period: 'vs last month', icon: 'FaShoppingBag' },
  { title: 'New Customers', value: '458', change: '+8.2%', isPositive: true, period: 'vs last month', icon: 'FaUsers' },
  { title: 'Table Bookings', value: '194', change: '-3.1%', isPositive: false, period: 'vs last month', icon: 'FaCalendarCheck' },
];

export const REVENUE_CHART_DATA = [
  { month: 'Jan', revenue: 850000, profit: 320000 },
  { month: 'Feb', revenue: 920000, profit: 360000 },
  { month: 'Mar', revenue: 1100000, profit: 450000 },
  { month: 'Apr', revenue: 1050000, profit: 410000 },
  { month: 'May', revenue: 1300000, profit: 520000 },
  { month: 'Jun', revenue: 1485200, profit: 610000 },
];

export const ORDERS_HOURLY_DATA = [
  { hour: '1 PM', orders: 24 },
  { hour: '3 PM', orders: 18 },
  { hour: '5 PM', orders: 32 },
  { hour: '7 PM', orders: 68 },
  { hour: '9 PM', orders: 95 },
  { hour: '11 PM', orders: 84 },
  { hour: '1 AM', orders: 42 },
];

export const CATEGORY_PIE_DATA = [
  { name: 'Signature Pizzas', value: 45, color: '#FF5722' },
  { name: 'Signature Favorites', value: 25, color: '#FFC107' },
  { name: 'Sides & Dips', value: 18, color: '#4CAF50' },
  { name: 'Drinks & Beverages', value: 12, color: '#2196F3' },
];

export const ADMIN_ORDERS = [
  { id: 'ORD-948271', customer: 'Rashid Khan', email: 'rashid@gmail.com', phone: '0301-8849201', total: 2050, items: 1, method: 'Card', status: 'Delivered', date: '2026-07-31 19:42' },
  { id: 'ORD-837192', customer: 'Satwat Butt', email: 'satwat@gmail.com', phone: '0321-9988112', total: 1649, items: 1, method: 'COD', status: 'Out for Delivery', date: '2026-07-31 20:10' },
  { id: 'ORD-771928', customer: 'Saira Amer', email: 'saira@gmail.com', phone: '0333-1122334', total: 950, items: 1, method: 'Card', status: 'Preparing', date: '2026-07-31 20:25' },
  { id: 'ORD-662910', customer: 'Daniyal Quddus', email: 'daniyal@gmail.com', phone: '0300-5544332', total: 775, items: 1, method: 'COD', status: 'Pending', date: '2026-07-31 20:30' },
];

export const ADMIN_CUSTOMERS = [
  { id: 1, name: 'Rashid Khan', email: 'rashid@gmail.com', phone: '0301-8849201', orders: 12, spent: 24500, status: 'Active', joined: '2025-11-10' },
  { id: 2, name: 'Satwat Butt', email: 'satwat@gmail.com', phone: '0321-9988112', orders: 8, spent: 16800, status: 'Active', joined: '2026-01-15' },
  { id: 3, name: 'Saira Amer', email: 'saira@gmail.com', phone: '0333-1122334', orders: 15, spent: 31200, status: 'VIP', joined: '2024-09-20' },
];

export const INITIAL_RESERVATIONS = [
  { id: 'RES-10492', name: 'Mian Moosa Faisal', email: 'moosa@gmail.com', phone: '0300-1234567', guests: 4, date: '2026-08-02', time: '08:00 PM', area: 'Main Hall', status: 'Confirmed' },
  { id: 'RES-10493', name: 'S Nadeem', email: 'snadeem@gmail.com', phone: '0321-7654321', guests: 2, date: '2026-08-02', time: '09:00 PM', area: 'Patio Terrace', status: 'Pending' },
];

export const ADMIN_RESERVATIONS = INITIAL_RESERVATIONS;

export const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'New Online Order #ORD-948271', time: '5 min ago', read: false },
  { id: 2, title: 'New 5-Star Review from Rashid Khan', time: '20 min ago', read: false },
  { id: 3, title: 'Table Reservation Confirmed (4 Guests)', time: '1 hour ago', read: true }
];
